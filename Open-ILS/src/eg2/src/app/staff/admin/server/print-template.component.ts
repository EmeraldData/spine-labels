import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {IdlService, IdlObject} from '@eg/core/idl.service';
import {PcrudService} from '@eg/core/pcrud.service';
import {AuthService} from '@eg/core/auth.service';
import {OrgService} from '@eg/core/org.service';
import {ServerStoreService} from '@eg/core/server-store.service';
import {ComboboxComponent, ComboboxEntry
    } from '@eg/share/combobox/combobox.component';
import {PrintService} from '@eg/share/print/print.service';
import {LocaleService} from '@eg/core/locale.service';
import {NgbTabset, NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {FmRecordEditorComponent} from '@eg/share/fm-editor/fm-editor.component';
import {SampleDataService} from '@eg/share/util/sample-data.service';
import {OrgFamily} from '@eg/share/org-family-select/org-family-select.component';
import {ConfirmDialogComponent} from '@eg/share/dialog/confirm.component';

/**
 * Print Template Admin Page
 */

@Component({
    templateUrl: 'print-template.component.html'
})

export class PrintTemplateComponent implements OnInit {

    entries: ComboboxEntry[];
    template: IdlObject;
    sampleJson: string;
    invalidJson = false;
    localeCode: string;
    localeEntries: ComboboxEntry[];
    compiledContent: string;
    templateCache: {[id: number]: IdlObject} = {};
    initialOrg: number;
    selectedOrgs: number[];

    @ViewChild('templateSelector', { static: true }) templateSelector: ComboboxComponent;
    @ViewChild('tabs', { static: false }) tabs: NgbTabset;
    @ViewChild('editDialog', { static: true }) editDialog: FmRecordEditorComponent;
    @ViewChild('confirmDelete', { static: true }) confirmDelete: ConfirmDialogComponent;
    @ViewChild('printContextCbox', {static: false}) printContextCbox: ComboboxComponent;

    // Define some sample data that can be used for various templates
    // Data will be filled out via the sample data service.
    // Keys map to print template names
    sampleData: any = {
        patron_address: {},
        holds_for_bib: {}
    };

    constructor(
        private route: ActivatedRoute,
        private idl: IdlService,
        private org: OrgService,
        private pcrud: PcrudService,
        private auth: AuthService,
        private store: ServerStoreService,
        private locale: LocaleService,
        private printer: PrintService,
        private samples: SampleDataService
    ) {
        this.entries = [];
        this.localeEntries = [];
    }

    ngOnInit() {
        this.initialOrg = this.auth.user().ws_ou();
        this.selectedOrgs = [this.initialOrg];
        this.localeCode = this.locale.currentLocaleCode();
        this.locale.supportedLocales().subscribe(
            l => this.localeEntries.push({id: l.code(), label: l.name()}));
        this.setTemplateInfo().subscribe();
        this.fleshSampleData();
    }

    fleshSampleData() {

        // NOTE: server templates work fine with IDL objects, but
        // vanilla hashes are easier to work with in the admin UI.

        // Classes for which sample data exists
        const classes = ['au', 'ac', 'aua', 'ahr', 'acp', 'mwde'];
        const samples: any = {};
        classes.forEach(class_ => samples[class_] =
            this.idl.toHash(this.samples.listOfThings(class_, 10)));

        // Wide holds are hashes instead of IDL objects.
        // Add fields as needed.
        const wide_holds = [{
            request_time: this.samples.randomDate().toISOString(),
            ucard_barcode: samples.ac[0].barcode,
            usr_family_name: samples.au[0].family_name,
            usr_alias: samples.au[0].alias,
            cp_barcode: samples.acp[0].barcode
        }, {
            request_time: this.samples.randomDate().toISOString(),
            ucard_barcode: samples.ac[1].barcode,
            usr_family_name: samples.au[1].family_name,
            usr_alias: samples.au[1].alias,
            cp_barcode: samples.acp[1].barcode
        }];

        this.sampleData.patron_address = {
            patron:  samples.au[0],
            address: samples.aua[0]
        };

        this.sampleData.holds_for_bib = wide_holds;
    }

    onTabChange(evt: NgbTabChangeEvent) {
        if (evt.nextId === 'template') {
            this.refreshPreview();
        }
    }

    container(): any {
        // Only present when its tab is visible
        return document.getElementById('template-preview-pane');
    }

    // TODO should the ngModelChange handler fire for org-family-select
    // even when the values don't change?
    orgOnChange(family: OrgFamily) {
        // Avoid reundant server calls.
        if (!this.sameIds(this.selectedOrgs, family.orgIds)) {
            this.selectedOrgs = family.orgIds;
            this.setTemplateInfo().subscribe();
        }
    }

    // True if the 2 arrays contain the same contents,
    // regardless of the order.
    sameIds(arr1: any[], arr2: any[]): boolean {
        if (arr1.length !== arr2.length) {
            return false;
        }
        for (let i = 0; i < arr1.length; i++) {
            if (!arr2.includes(arr1[i])) {
                return false;
            }
        }
        return true;
    }

    localeOnChange(code: string) {
        if (code) {
            this.localeCode = code;
            this.setTemplateInfo().subscribe();
        }
    }

    // Fetch name/id for all templates in range.
    // Avoid fetching the template content until needed.
    setTemplateInfo(): Observable<IdlObject> {
        this.entries = [];
        this.template = null;
        this.templateSelector.applyEntryId(null);
        this.compiledContent = '';

        return this.pcrud.search('cpt',
            {
                owner: this.selectedOrgs,
                locale: this.localeCode
            }, {
                select: {cpt: ['id', 'label', 'owner']},
                order_by: {cpt: 'label'}
            }
        ).pipe(map(tmpl => {
            this.templateCache[tmpl.id()] = tmpl;
            this.entries.push({id: tmpl.id(), label: tmpl.label()});
            return tmpl;
        }));
    }

    getOwnerName(id: number): string {
        if (this.templateCache[id]) {
            return this.org.get(this.templateCache[id].owner()).shortname();
        }
        return '';
    }

    // If the selected template changes through means other than the
    // template selecdtor, setting updateSelector=true will force the
    // template to appear in the selector and get selected, regardless
    // of whether it would have been fetched with current filters.
    selectTemplate(id: number, updateSelector?: boolean) {

        if (id === null) {
            this.template = null;
            this.compiledContent = '';
            return;
        }

        this.pcrud.retrieve('cpt', id).subscribe(t => {
            this.template = this.templateCache[id] = t;

            if (updateSelector) {
                if (!this.templateSelector.hasEntry(id)) {
                    this.templateSelector.addEntry({id: id, label: t.label()});
                }
                this.templateSelector.applyEntryId(id);
            }

            const data = this.sampleData[t.name()];
            if (data) {
                this.sampleJson = JSON.stringify(data, null, 2);
                this.refreshPreview();
            }

            this.store.getItem('eg.print.template_context.' + this.template.name())
            .then(setting => {
                this.printContextCbox.applyEntryId(setting || 'unset');
            });
        });
    }

    // Allow the template editor textarea to expand vertically as
    // content is added, with a sane minimum row count
    templateRowCount(): number {
        const def = 25;
        if (this.template && this.template.template()) {
            return Math.max(def,
                this.template.template().split(/\n/).length + 2);
        }
        return def;
    }

    refreshPreview() {
        if (!this.sampleJson) { return; }
        this.compiledContent = '';

        let data;
        try {
            data = JSON.parse(this.sampleJson);
            this.invalidJson = false;
        } catch (E) {
            this.invalidJson = true;
        }

        this.printer.compileRemoteTemplate({
            templateId: this.template.id(),
            contextData: data,
            printContext: 'default' // required, has no impact here

        }).then(response => {

            this.compiledContent = response.content;
            if (this.container()) { // null if on alternate tab
                if (response.contentType === 'text/html') {
                    this.container().innerHTML = response.content;
                } else {
                    // Assumes text/plain or similar
                    this.container().innerHTML = '<pre>' + response.content + '</pre>';
                }
            }
        });
    }

    applyChanges() {
        this.container().innerHTML = '';
        this.pcrud.update(this.template).toPromise()
            .then(() => this.refreshPreview());
    }

    openEditDialog() {
        this.editDialog.setRecord(this.template);
        this.editDialog.mode = 'update';
        this.editDialog.open({size: 'lg'}).toPromise().then(id => {
            if (id !== undefined) {
                const selectedId = this.template.id();
                this.setTemplateInfo().toPromise().then(
                    _ => this.selectTemplate(selectedId)
                );
            }
        });
    }

    cloneTemplate() {
        const tmpl = this.idl.clone(this.template);
        tmpl.id(null);
        tmpl.active(false); // Cloning requires manual activation
        tmpl.owner(null);
        this.editDialog.setRecord(tmpl);
        this.editDialog.mode = 'create';
        this.editDialog.open({size: 'lg'}).toPromise().then(newTmpl => {
            if (newTmpl !== undefined) {
                this.setTemplateInfo().toPromise()
                    .then(_ => this.selectTemplate(newTmpl.id(), true));
            }
        });
    }

    deleteTemplate() {
        this.confirmDelete.open().subscribe(confirmed => {
            if (!confirmed) { return; }
            this.pcrud.remove(this.template).toPromise().then(_ => {
                this.setTemplateInfo().toPromise()
                    .then(x => this.selectTemplate(null));
            });
        });
    }

    forceContextChange(entry: ComboboxEntry) {
        if (entry && entry.id !== 'unset') {

            this.store.setItem(
                'eg.print.template_context.' + this.template.name(), entry.id);

        } else {

            this.store.removeItem(
                'eg.print.template_context.' + this.template.name());
        }
    }
}


