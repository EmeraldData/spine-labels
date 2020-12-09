import {ElementRef, Component, Input, Output, OnInit, OnDestroy,
    ViewChild, EventEmitter, AfterViewInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {MarcRecord, MarcField, MarcSubfield} from './marcrecord';
import {MarcEditContext, FieldFocusRequest, MARC_EDITABLE_FIELD_TYPE,
    TextUndoRedoAction} from './editor-context';
import {ContextMenuEntry} from '@eg/share/context-menu/context-menu.service';
import {StringComponent} from '@eg/share/string/string.component';
import {TagTable} from './tagtable.service';

/**
 * MARC Editable Content Component
 */

@Component({
  selector: 'eg-marc-editable-content',
  templateUrl: './editable-content.component.html',
  styleUrls: ['./editable-content.component.css']
})

export class EditableContentComponent
    implements OnInit, AfterViewInit, OnDestroy {

    static idGen = 0;

    @Input() context: MarcEditContext;
    @Input() field: MarcField;
    @Input() fieldType: MARC_EDITABLE_FIELD_TYPE = null;

    // read-only field text.  E.g. 'LDR'
    @Input() fieldText: string = null;

    // array of subfield code and subfield value
    @Input() subfield: MarcSubfield;

    @Input() fixedFieldCode: string;

    // space-separated list of additional CSS classes to append
    @Input() moreClasses: string;

    // aria-label text.  This will not be visible in the UI.
    @Input() ariaLabel: string;

    get record(): MarcRecord { return this.context.record; }

    bigText = false;
    randId = 'editable-content-' + EditableContentComponent.idGen++;
    editInput: any; // <input/> or <div contenteditable/>
    maxLength: number = null;

    // Track the load-time content so we know what text value to
    // track on our undo stack.
    undoBackToText: string;

    focusSub: Subscription;
    undoRedoSub: Subscription;
    isLeader: boolean; // convenience

    // Cache of fixed field menu options
    ffValues: ContextMenuEntry[] = [];

    // Cache of tag context menu entries
    tagMenuEntries: ContextMenuEntry[] = [];

    // Track the fixed field value locally since extracting the value
    // in real time from the record, which adds padding to the text,
    // causes usability problems.
    ffValue: string;

    @ViewChild('add006', {static: false}) add006Str: StringComponent;
    @ViewChild('add007', {static: false}) add007Str: StringComponent;
    @ViewChild('add008', {static: false}) add008Str: StringComponent;
    @ViewChild('insertBefore', {static: false}) insertBeforeStr: StringComponent;
    @ViewChild('insertAfter', {static: false}) insertAfterStr: StringComponent;
    @ViewChild('deleteField', {static: false}) deleteFieldStr: StringComponent;

    tt(): TagTable { // for brevity
        return this.context.tagTable;
    }

    ngOnInit() {
        this.setupFieldType();
    }

    ngOnDestroy() {
        if (this.focusSub) { this.focusSub.unsubscribe(); }
        if (this.undoRedoSub) { this.undoRedoSub.unsubscribe(); }
    }

    watchForFocusRequests() {
        this.focusSub = this.context.fieldFocusRequest.pipe(
            filter((req: FieldFocusRequest) => this.focusRequestIsMe(req)))
        .subscribe((req: FieldFocusRequest) => this.selectText(req));
    }

    watchForUndoRedoRequests() {
        this.undoRedoSub = this.context.textUndoRedoRequest.pipe(
            filter((action: TextUndoRedoAction) => this.focusRequestIsMe(action.position)))
        .subscribe((action: TextUndoRedoAction) => this.processUndoRedo(action));
    }

    focusRequestIsMe(req: FieldFocusRequest): boolean {
        if (req.target !== this.fieldType) { return false; }

        if (this.field) {
            if (req.fieldId !== this.field.fieldId) { return false; }
        } else if (req.target === 'ldr') {
            return this.isLeader;
        } else if (req.target === 'ffld' &&
            req.ffCode !== this.fixedFieldCode) {
            return false;
        }

        if (req.sfOffset !== undefined &&
            req.sfOffset !== this.subfield[2]) {
            // this is not the subfield you are looking for.
            return false;
        }

        return true;
    }

    selectText(req?: FieldFocusRequest) {
        if (this.bigText) {
            this.focusBigText();
        } else {
            this.editInput.select();
        }

        if (req) {
            if (req.newText) {
                this.setContent(req.newText);
            }
        } else {

            // Focus request may have come from keyboard navigation,
            // clicking, etc.  Model the event as a focus request
            // so it can be tracked the same.
            req = {
                fieldId: this.field ? this.field.fieldId : -1,
                target: this.fieldType,
                sfOffset: this.subfield ? this.subfield[2] : undefined,
                ffCode: this.fixedFieldCode
            };
        }

        this.context.lastFocused = req;
    }

    setupFieldType() {
        const content = this.getContent();
        this.undoBackToText = content;

        switch (this.fieldType) {
            case 'ldr':
                this.isLeader = true;
                if (content) { this.maxLength = content.length; }
                this.watchForFocusRequests();
                this.watchForUndoRedoRequests();
                break;

            case 'tag':
                this.maxLength = 3;
                this.watchForFocusRequests();
                this.watchForUndoRedoRequests();
                break;

            case 'cfld':
                this.watchForFocusRequests();
                this.watchForUndoRedoRequests();
                break;

            case 'ffld':
                this.applyFFOptions();
                this.watchForFocusRequests();
                this.watchForUndoRedoRequests();
                break;

            case 'ind1':
            case 'ind2':
                this.maxLength = 1;
                this.watchForFocusRequests();
                this.watchForUndoRedoRequests();
                break;

            case 'sfc':
                this.maxLength = 1;
                this.watchForFocusRequests();
                this.watchForUndoRedoRequests();
                break;

            case 'sfv':
                this.bigText = true;
                this.watchForFocusRequests();
                this.watchForUndoRedoRequests();
                break;

            default:
                if (this.fieldText) {
                    this.maxLength = this.fieldText.length;
                }
        }
    }

    applyFFOptions() {
        return this.tt().getFfFieldMeta(this.fixedFieldCode)
        .then(fieldMeta => {
            if (fieldMeta) {
                this.maxLength = fieldMeta.length || 1;
            }
        });
    }

    // These are served dynamically to handle cases where a tag or
    // subfield is modified in place.
    contextMenuEntries(): ContextMenuEntry[] {
        if (this.isLeader) { return; }

        switch (this.fieldType) {
            case 'tag':
                return this.tagContextMenuEntries();

            case 'sfc':
                return this.tt().getSubfieldCodes(this.field.tag);

            case 'sfv':
                return this.tt().getSubfieldValues(
                    this.field.tag, this.subfield[0]);

            case 'ind1':
            case 'ind2':
                return this.tt().getIndicatorValues(
                    this.field.tag, this.fieldType);

            case 'ffld':
                return this.tt().getFfValues(this.fixedFieldCode);
        }

        return null;
    }

    tagContextMenuEntries(): ContextMenuEntry[] {

        // string components may not yet be loaded.
        if (this.tagMenuEntries.length > 0 || !this.add006Str) {
            return this.tagMenuEntries;
        }

        this.tagMenuEntries.push(
            {label: this.add006Str.text, value: '_add006'},
            {label: this.add007Str.text, value: '_add007'},
            {label: this.add008Str.text, value: '_add008'}
        );

        if (!this.field.isCtrlField) {
            // Only data field tags get these.
            this.tagMenuEntries.push(
                {label: this.insertAfterStr.text,  value: '_insertAfter'},
                {label: this.insertBeforeStr.text, value: '_insertBefore'}
            );
        }

        this.tagMenuEntries.push(
            {label: this.deleteFieldStr.text,  value: '_deleteField'},
            {divider: true}
        );

        this.tt().getFieldTags().forEach(e => this.tagMenuEntries.push(e));

        return this.tagMenuEntries;
    }

    getContent(): string {
        if (this.fieldText) { return this.fieldText; } // read-only

        switch (this.fieldType) {
            case 'ldr': return this.record.leader;
            case 'cfld': return this.field.data;
            case 'tag': return this.field.tag;
            case 'sfc': return this.subfield[0];
            case 'sfv': return this.subfield[1];
            case 'ind1': return this.field.ind1;
            case 'ind2': return this.field.ind2;

            case 'ffld':
                // When actively editing a fixed field, track its value
                // in a local variable instead of pulling the value
                // from record.extractFixedField(), which applies
                // additional formattting, causing usability problems
                // (e.g. unexpected spaces).  Once focus is gone, the
                // view will be updated with the correctly formatted
                // value.

                if ( this.ffValue === undefined ||
                    !this.context.lastFocused ||
                    !this.focusRequestIsMe(this.context.lastFocused)) {

                    this.ffValue =
                        this.record.extractFixedField(this.fixedFieldCode);
                }
                return this.ffValue;
        }
        return 'X';
    }

    setContent(value: string, propagatBigText?: boolean, skipUndoTrack?: boolean) {

        if (this.fieldText) { return; } // read-only text

        switch (this.fieldType) {
            case 'ldr': this.record.leader = value; break;
            case 'cfld': this.field.data = value; break;
            case 'tag': this.field.tag = value; break;
            case 'sfc': this.subfield[0] = value; break;
            case 'sfv': this.subfield[1] = value; break;
            case 'ind1': this.field.ind1 = value; break;
            case 'ind2': this.field.ind2 = value; break;
            case 'ffld':
                // Track locally and propagate to the record.
                this.ffValue = value;
                this.record.setFixedField(this.fixedFieldCode, value);
                break;
        }

        if (propagatBigText && this.bigText) {
            // Propagate new content to the bigtext div.
            // Should only be used when a content change occurrs via
            // external means (i.e. not from a direct edit of the div).
            this.editInput.innerText = value;
        }

        if (!skipUndoTrack) {
            this.trackTextChangeForUndo(value);
        }
    }

    trackTextChangeForUndo(value: string) {

        // Human-driven changes invalidate the redo stack.
        this.context.redoStack = [];

        const lastUndo = this.context.undoStack[0];

        if (lastUndo
            && lastUndo instanceof TextUndoRedoAction
            && lastUndo.textContent === this.undoBackToText
            && this.focusRequestIsMe(lastUndo.position)) {
            // Most recent undo entry was a text change event within the
            // current atomic editing (focused) session for the input.
            // Nothing else to track.
            return;
        }

        const undo = new TextUndoRedoAction();
        undo.position = this.context.lastFocused;
        undo.textContent =  this.undoBackToText;

        this.context.addToUndoStack(undo);
    }

    // Apply the undo or redo action and track its opposite
    // action on the necessary stack
    processUndoRedo(action: TextUndoRedoAction) {

        // Undoing a text change
        const recoverContent = this.getContent();
        this.setContent(action.textContent, true, true);

        action.textContent = recoverContent;
        const moveTo = action.isRedo ?
            this.context.undoStack : this.context.redoStack;

        moveTo.unshift(action);
    }

    inputBlurred() {
        // If the text content changed during this focus session,
        // track the new value as the value the next session of
        // text edits should return to upon undo.
        this.undoBackToText = this.getContent();
    }

    // Propagate editable div content into our record
    bigTextValueChange() {
        this.setContent(this.editInput.innerText);
    }

    ngAfterViewInit() {
        this.editInput = document.getElementById(this.randId + '');

        // Initialize the editable div
        this.editInput.innerText = this.getContent();
    }

    inputSize(): number {
        if (this.maxLength) {
            return this.maxLength + 1;
        }
        // give at least 2+ chars space and grow with the content
        return Math.max(2, (this.getContent() || '').length) * 1.1;
    }

    focusBigText() {
        const targetNode = this.editInput.firstChild;

        if (!targetNode) {
            // Div contains no text content, nothing to select
            return;
        }

        const range = document.createRange();
        range.setStart(targetNode, 0);
        range.setEnd(targetNode, targetNode.length);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }

    // Route keydown events to the appropriate handler
    inputKeyDown(evt: KeyboardEvent) {

        switch (evt.key) {
            case 'y':
                if (evt.ctrlKey) { // redo
                    this.context.requestRedo();
                    evt.preventDefault();
                }
                return;

            case 'z':
                if (evt.ctrlKey) { // undo
                    this.context.requestUndo();
                    evt.preventDefault();
                }
                return;

            case 'F6':
                if (evt.shiftKey) {
                    // shift+F6 => add 006
                    this.context.add00X('006');
                    evt.preventDefault();
                    evt.stopPropagation();
                }
                return;

            case 'F7':
                if (evt.shiftKey) {
                    // shift+F7 => add 007
                    this.context.add00X('007');
                    evt.preventDefault();
                    evt.stopPropagation();
                }
                return;

            case 'F8':
                if (evt.shiftKey) {
                    // shift+F8 => add/replace 008
                    this.context.insertReplace008();
                    evt.preventDefault();
                    evt.stopPropagation();
                }
                return;
        }

        // None of the remaining key combos are supported by the LDR
        // or fixed field editor.
        if (this.fieldType === 'ldr' || this.fieldType === 'ffld') { return; }

        switch (evt.key) {

            case 'Enter':
                if (evt.ctrlKey) {
                    // ctrl+enter == insert stub field after focused field
                    // ctrl+shift+enter == insert stub field before focused field
                    this.context.insertStubField(this.field, evt.shiftKey);
                }

                evt.preventDefault(); // Bare newlines not allowed.
                break;

            case 'Delete':

                if (evt.ctrlKey) {
                    // ctrl+delete == delete whole field
                    this.context.deleteField(this.field);
                    evt.preventDefault();

                } else if (evt.shiftKey) {

                    if (this.subfield) {
                        // shift+delete == delete subfield

                        this.context.deleteSubfield(this.field, this.subfield);
                    }
                    // prevent any shift-delete from bubbling up becuase
                    // unexpected stuff will be deleted.
                    evt.preventDefault();
                }

                break;

            case 'ArrowDown':

                if (evt.ctrlKey) {
                    // ctrl+down == copy current field down one
                    this.context.insertField(
                        this.field, this.record.cloneField(this.field));
                } else {
                    // avoid dupe focus requests
                    this.context.focusNextTag(this.field);
                }

                evt.preventDefault();
                break;

            case 'ArrowUp':

                if (evt.ctrlKey) {
                    // ctrl+up == copy current field up one
                    this.context.insertField(
                        this.field, this.record.cloneField(this.field), true);
                } else {
                    // avoid dupe focus requests
                    this.context.focusPreviousTag(this.field);
                }

                // up == move focus to tag of previous field
                evt.preventDefault();
                break;

            case 'd': // thunk
            case 'i':
                if (evt.ctrlKey) {
                    // ctrl+i / ctrl+d == insert subfield
                    const pos = this.subfield ? this.subfield[2] + 1 : 0;
                    this.context.insertStubSubfield(this.field, pos);
                    evt.preventDefault();
                }
                break;
        }
    }

    insertField(before: boolean) {

        const newField = this.record.newField(
            {tag: '999', subfields: [[' ', '', 0]]});

        if (before) {
            this.record.insertFieldsBefore(this.field, newField);
        } else {
            this.record.insertFieldsAfter(this.field, newField);
        }

        this.context.requestFieldFocus(
            {fieldId: newField.fieldId, target: 'tag'});
    }

    deleteField() {
        if (!this.context.focusNextTag(this.field)) {
            this.context.focusPreviousTag(this.field);
        }

        this.record.deleteFields(this.field);
    }

    deleteSubfield() {
        // If subfields remain, focus the previous subfield.
        // otherwise focus our tag.
        const sfpos = this.subfield[2] - 1;

        this.field.deleteExactSubfields(this.subfield);

        const focus: FieldFocusRequest = {
            fieldId: this.field.fieldId, target: 'tag'};

        if (sfpos >= 0) {
            focus.target = 'sfv';
            focus.sfOffset = sfpos;
        }

        this.context.requestFieldFocus(focus);
    }

    contextMenuChange(value: string) {

        switch (value) {
            case '_add006': return this.context.add00X('006');
            case '_add007': return this.context.add00X('007');
            case '_add008': return this.context.insertReplace008();
            case '_insertBefore':
                return this.context.insertStubField(this.field, true);
            case '_insertAfter':
                return this.context.insertStubField(this.field);
            case '_deleteField': return this.context.deleteField(this.field);
        }

        this.setContent(value, true);

        // Context menus can steal focus.
        this.context.requestFieldFocus(this.context.lastFocused);
    }

    isAuthInvalid(): boolean {
        return (
            this.fieldType === 'sfv' &&
            this.field.authChecked &&
            !this.field.authValid
        );
    }

    isAuthValid(): boolean {
        return (
            this.fieldType === 'sfv' &&
            this.field.authChecked &&
            this.field.authValid
        );
    }

    isLastSubfieldValue(): boolean {
        if (this.fieldType === 'sfv') {
            const myIdx = this.subfield[2];
            for (let idx = 0; idx < this.field.subfields.length; idx++) {
                if (idx > myIdx) {
                    return false;
                }
            }
            return true;
        }

        return false;
    }
}


