(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"9emE":function(e,t,a){"use strict";a.d(t,"a",(function(){return d}));var c=a("fXoL"),r=a("1kSV"),i=a("ofXK");const o=["aria-label",$localize`:␟498a88d953342beb9fc3e574107b2f1b6a71132b␟656720496971960532:Show help`],b=["aria-label",$localize`:␟498a88d953342beb9fc3e574107b2f1b6a71132b␟656720496971960532:Show help`];function n(e,t){if(1&e&&(c.Rb(0,"a",5),c.Mc(1),c.Qb()),2&e){const e=c.hc(2);c.pc("href",e.helpLink,c.Ec),c.xb(1),c.Nc(e.helpText)}}function l(e,t){if(1&e&&(c.Rb(0,"span"),c.Mc(1),c.Qb()),2&e){const e=c.hc(2);c.xb(1),c.Nc(e.helpText)}}function s(e,t){if(1&e&&(c.Kc(0,n,2,2,"a",3),c.Kc(1,l,2,1,"span",4)),2&e){const e=c.hc();c.oc("ngIf",e.helpLink.length>=1),c.xb(1),c.oc("ngIf",e.helpLink.length<1)}}let d=(()=>{class e{constructor(){this.helpText="",this.helpLink="",this.placement=""}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c.Fb({type:e,selectors:[["eg-help-popover"]],inputs:{helpText:"helpText",helpLink:"helpLink",placement:"placement"},decls:7,vars:2,consts:[["popContent",""],["triggers","click","i","","aria-haspopup","true",1,"btn","btn-sm",3,"placement","ngbPopover",6,"aria-label"],[1,"material-icons",6,"aria-label"],["target","_blank",3,"href",4,"ngIf"],[4,"ngIf"],["target","_blank",3,"href"]],template:function(e,t){if(1&e&&(c.Kc(0,s,2,2,"ng-template",null,0,c.Lc),c.Rb(2,"button",1),c.Xb(3,o),c.Rb(4,"span",2),c.Xb(5,b),c.Mc(6,"live_help"),c.Qb(),c.Qb()),2&e){const e=c.zc(1);c.xb(2),c.pc("placement",t.placement),c.oc("ngbPopover",e)}},directives:[r.M,i.v],styles:[""]}),e})()},"h/j0":function(e,t,a){"use strict";a.r(t),a.d(t,"AuthorityModule",(function(){return Ze}));var c=a("MZHd"),r=a("r2N+"),i=a("tyNb"),o=a("fXoL"),b=a("ofXK"),n=a("ufrD"),l=a("3Pt+"),s=a("1kwX");const d=["bannerText",$localize`:␟d04f0f05bdfdd4d328bb94fcd66c5dbc5ff331a2␟2738349014431663333:Find Authority Record By ID`];var u;u=$localize`:␟51de361a3cf067f49dd11d5353fb7c5bf6581d2e␟4946531183271650005:Authorty Record Id`;const h=["placeholder",$localize`:␟51de361a3cf067f49dd11d5353fb7c5bf6581d2e␟4946531183271650005:Authorty Record Id`,"aria-label",$localize`:␟51de361a3cf067f49dd11d5353fb7c5bf6581d2e␟4946531183271650005:Authorty Record Id`];var f;function g(e,t){if(1&e){const e=o.Sb();o.Pb(0),o.Rb(1,"eg-staff-banner",1),o.Xb(2,d),o.Qb(),o.Rb(3,"div",2),o.Rb(4,"div",3),o.Rb(5,"div",4),o.Rb(6,"div",5),o.Rb(7,"span",6),o.Vb(8,u),o.Qb(),o.Qb(),o.Rb(9,"input",7),o.Xb(10,h),o.fc("keyup.enter",(function(){return o.Bc(e),o.hc().goToAuthority()}))("ngModelChange",(function(t){return o.Bc(e),o.hc().loadId=t})),o.Qb(),o.Rb(11,"button",8),o.fc("click",(function(){return o.Bc(e),o.hc().goToAuthority()})),o.Vb(12,f),o.Qb(),o.Qb(),o.Qb(),o.Qb(),o.Ob()}if(2&e){const e=o.hc();o.xb(9),o.oc("ngModel",e.loadId)}}f=$localize`:␟71c77bb8cecdf11ec3eead24dd1ba506573fa9cd␟935187492052582731:Submit`;const p=["bannerText",$localize`:␟4c410ef78702fc10d3bd1891d330718240d0d692␟8308285965745140463:Edit Authority Record #${"\ufffd0\ufffd"}:INTERPOLATION:`];function m(e,t){if(1&e&&(o.Pb(0),o.Rb(1,"eg-staff-banner",1),o.Xb(2,p),o.Qb(),o.Mb(3,"eg-marc-editor",9,10),o.Ob()),2&e){const e=o.hc();o.xb(1),o.Zb(e.authorityId),o.Wb(2),o.xb(2),o.oc("recordId",e.authorityId)}}let y=(()=>{class e{constructor(e,t,a){this.router=e,this.route=t,this.renderer=a,this.authorityId=+this.route.snapshot.paramMap.get("id")}ngAfterViewInit(){this.authorityId||this.renderer.selectRootElement("#auth-id-input").focus()}goToAuthority(){this.loadId&&this.router.navigate(["/staff/cat/authority/edit/"+this.loadId])}}return e.\u0275fac=function(t){return new(t||e)(o.Lb(i.c),o.Lb(i.a),o.Lb(o.D))},e.\u0275cmp=o.Fb({type:e,selectors:[["ng-component"]],decls:2,vars:2,consts:[[4,"ngIf"],[6,"bannerText"],[1,"row"],[1,"col-lg-6","form-inline"],[1,"input-group"],[1,"input-group-prepend"],[1,"input-group-text"],["type","text","id","auth-id-input",1,"form-control",3,"ngModel","keyup.enter","ngModelChange",6,"placeholder","aria-label"],[1,"btn","btn-success",3,"click"],["recordType","authority",3,"recordId"],["marcEditor",""]],template:function(e,t){1&e&&(o.Kc(0,g,13,1,"ng-container",0),o.Kc(1,m,5,2,"ng-container",0)),2&e&&(o.oc("ngIf",!t.authorityId),o.xb(1),o.oc("ngIf",t.authorityId))},directives:[b.v,n.a,l.c,l.t,l.w,s.a],encapsulation:2}),e})();var R=a("EY2u"),x=a("Osig"),Q=a("iA0r"),v=a("cm5s"),M=a("9Zsr"),w=a("MWGh"),I=a("9rfo"),k=a("lJxs"),T=a("eIep");let $=(()=>{class e{constructor(e,t,a){this.net=e,this.org=t,this.pcrud=a,this.pageSize=15,this.searchOffset=0,this.markedForMerge={}}fetchAxes(){if(this.authorityAxes)return Promise.resolve(this.authorityAxes);this.pcrud.retrieveAll("aba",{},{atomic:!0}).pipe(Object(k.a)(e=>{this.authorityAxes=e.map(e=>({id:e.code(),label:e.name()})).sort((e,t)=>e.label<t.label?-1:1)})).toPromise()}loadAuthorities(){return this.searchTerm&&this.authorityAxis?this.net.request("open-ils.supercat","open-ils.supercat.authority.browse.by_axis",this.authorityAxis,this.searchTerm,this.pageSize,this.searchOffset).pipe(Object(T.a)(e=>this.net.request("open-ils.search","open-ils.search.authority.main_entry",e))).pipe(Object(k.a)(e=>{const t=this.org.get(e.authority.owner());return{authority:e.authority,link_count:e.linked_bib_count,heading:e.heading,thesaurus:e.thesaurus,thesaurus_code:e.thesaurus_code,owner:t?t.shortname():""}})):Object(R.b)()}}return e.\u0275fac=function(t){return new(t||e)(o.cc(x.b),o.cc(v.a),o.cc(Q.a))},e.\u0275prov=o.Hb({token:e,factory:e.\u0275fac}),e})();var z=a("tNQm"),S=a("EQDH"),L=a("YRS1"),O=a("8PDw"),C=a("rRT/"),A=a("1kSV");const X=["successMsg"],_=["errorMsg"],D=["text",$localize`:␟d74c918113d9c7598b6a28123a78d81e1fb7a3c1␟4512976061326447246:Successfully Merged Authority Records`],F=["text",$localize`:␟5a8209883c848733c8a05c8e931561e458edd108␟7903741612816759171:Failed To Merge Authority Records`];var P;P=$localize`:␟e1f7373d34636fbecdb37826b775977a97206997␟1947053170227291146:Merge Authority Records`;const K=["aria-label",$localize`:␟f4e529ae5ffd73001d1ff4bbdeeb0a72e342e5c8␟7819314041543176992:Close`];var E,N,j;function B(e,t){if(1&e){const e=o.Sb();o.Rb(0,"div",10),o.Rb(1,"div",11),o.Rb(2,"input",15),o.fc("ngModelChange",(function(t){return o.Bc(e),o.hc(2).leadRecord=t})),o.Qb(),o.Qb(),o.Rb(3,"div",16),o.Mc(4),o.Qb(),o.Rb(5,"div",17),o.Mc(6),o.Qb(),o.Qb()}if(2&e){const e=t.$implicit,a=o.hc(2);o.xb(2),o.oc("value",e.authority.id())("ngModel",a.leadRecord),o.xb(2),o.Oc("#",e.authority.id(),""),o.xb(2),o.Nc(e.heading)}}function V(e,t){if(1&e){const e=o.Sb();o.Pb(0),o.Rb(1,"button",18),o.fc("click",(function(){return o.Bc(e),o.hc(2).close()})),o.Vb(2,N),o.Qb(),o.Rb(3,"button",19),o.fc("click",(function(){return o.Bc(e),o.hc(2).merge()})),o.Vb(4,j),o.Qb(),o.Ob()}}function G(e,t){if(1&e){const e=o.Sb();o.Rb(0,"div",4),o.Rb(1,"h4",5),o.Rb(2,"span"),o.Vb(3,P),o.Qb(),o.Qb(),o.Rb(4,"button",6),o.Xb(5,K),o.fc("click",(function(){return o.Bc(e),o.hc().close()})),o.Rb(6,"span",7),o.Mc(7,"\xd7"),o.Qb(),o.Qb(),o.Qb(),o.Rb(8,"div",8),o.Rb(9,"div",9),o.Rb(10,"h5"),o.Mc(11),o.Qb(),o.Qb(),o.Rb(12,"div",10),o.Rb(13,"div",11),o.Vb(14,E),o.Qb(),o.Qb(),o.Kc(15,B,7,4,"div",12),o.Qb(),o.Rb(16,"div",13),o.Kc(17,V,5,0,"ng-container",14),o.Qb()}if(2&e){const e=o.hc();o.xb(11),o.Oc("Merge ",e.authData.length," Records?"),o.xb(4),o.oc("ngForOf",e.authData),o.xb(2),o.oc("ngIf",!e.chargeResponse)}}E=$localize`:␟c4b3dbfe02e5b48292421c92dae6e2fd852c843c␟6700720359219385686:Lead Record`,N=$localize`:␟d7b35c384aecd25a516200d6921836374613dfe7␟2159130950882492111:Cancel`,j=$localize`:␟27a0be3f2075db3d4e887aa08aad69edc3d72ad3␟6452845999276583763:Merge Records`;let W=(()=>{class e extends C.a{constructor(e,t,a,c,r){super(e),this.modal=e,this.toast=t,this.net=a,this.evt=c,this.auth=r,this.authData=[]}ngOnInit(){this.onOpen$.subscribe(e=>{this.authData.length>0&&(this.leadRecord=this.authData[0].authority.id())})}merge(){const e=this.authData.map(e=>e.authority.id()).filter(e=>e!==this.leadRecord);this.net.request("open-ils.cat","open-ils.cat.authority.records.merge",this.auth.token(),this.leadRecord,e).subscribe(e=>{this.evt.parse(e)?(this.errorMsg.current().then(e=>this.toast.warning(e)),this.close(!1)):(this.successMsg.current().then(e=>this.toast.success(e)),this.close(!0))})}}return e.\u0275fac=function(t){return new(t||e)(o.Lb(A.s),o.Lb(L.a),o.Lb(x.b),o.Lb(S.a),o.Lb(O.a))},e.\u0275cmp=o.Fb({type:e,selectors:[["eg-authority-merge-dialog"]],viewQuery:function(e,t){var a;1&e&&(o.Ic(X,!0),o.Ic(_,!0)),2&e&&(o.yc(a=o.gc())&&(t.successMsg=a.first),o.yc(a=o.gc())&&(t.errorMsg=a.first))},inputs:{authData:"authData"},features:[o.ub],decls:8,vars:0,consts:[[6,"text"],["successMsg",""],["errorMsg",""],["dialogContent",""],[1,"modal-header","bg-info"],[1,"modal-title"],["type","button",1,"close",3,"click",6,"aria-label"],["aria-hidden","true"],[1,"modal-body"],[1,"row","d-flex","justify-content-center"],[1,"row"],[1,"col-lg-2"],["class","row",4,"ngFor","ngForOf"],[1,"modal-footer"],[4,"ngIf"],["type","radio","name","leadRecord",3,"value","ngModel","ngModelChange"],[1,"col-lg-1"],[1,"col-lg-6"],["type","button",1,"btn","btn-warning",3,"click"],["type","button",1,"btn","btn-success",3,"click"]],template:function(e,t){1&e&&(o.Rb(0,"eg-string",0,1),o.Xb(2,D),o.Qb(),o.Rb(3,"eg-string",0,2),o.Xb(5,F),o.Qb(),o.Kc(6,G,18,3,"ng-template",null,3,o.Lc))},directives:[z.a,b.u,b.v,l.B,l.c,l.t,l.w],encapsulation:2}),e})();var q=a("QGNW"),J=a("t7hH");const Z=["grid"],H=["axisCbox"],U=["rowSelected"],Y=["mergeDialog"],ee=["bannerText",$localize`:␟8a1ba87f3368d55b4fce2af63bf08d8da0cfe0b8␟2539264544123386917:Manage Authority Records`],te=["text",$localize`:␟143199f0772ed9a8a3864480deaf75d261e958f0␟835486735144707137:Row Selected for Merge`];var ae;ae=$localize`:␟547c4bd54407c9f6fe64d2b4f7cbafe401d34cc6␟702901588200225505:Search Term`;const ce=["placeholder",$localize`:␟547c4bd54407c9f6fe64d2b4f7cbafe401d34cc6␟702901588200225505:Search Term`];var re,ie,oe,be;re=$localize`:␟a48730fbcefe61d30886bb6004479a67a1a9c90d␟6142114939769077235:Authority Type`,ie=$localize`:␟680d5c75b7fd8d37961083608b9fcdc4167b4c43␟4452427314943113135:Previous`,oe=$localize`:␟8380d9eff8613c0bc58edc7cebc2aa72e17b11e3␟1407560924967345762:Page`,be=$localize`:␟f732c304c7433e5a83ffcd862c3dce709a0f4982␟3885497195825665706:Next`;const ne=["label",$localize`:␟91c24078f5148ffde15beaad013f7471c6857e7d␟4140253780824325725:Mark for Merge`],le=["label",$localize`:␟dcb277f238f5f2aae169b461db07103850febad2␟2171102684472056441:Un-Mark for Merge`],se=["label",$localize`:␟f37459647fc66eaccc1d916d01051dc2602ee143␟867916197875659423:Clear All Merge Marks`],de=["label",$localize`:␟499c1aa7a1b0df626e6dcbf6dbd98fef0a54dbc2␟1762041733505574243:Merge Marked Records`],ue=["label",$localize`:␟45cc8ca94b5a50842a9a8ef804a5ab089a38ae5c␟8040881171107393560:ID`],he=["label",$localize`:␟ec9c073ac67932dc27d49225d91cd0bf80c904af␟6021942807893129814:Linked Bibs`],fe=["label",$localize`:␟d2f99caf769460275d5bc462978c2761fedefec6␟6317126528752584322:Heading`],ge=["label",$localize`:␟995e202504fde3a1b92514ec813a1f57a340a498␟7279516001752477719:Control Set`],pe=["label",$localize`:␟f5b6f58b2bbfefbce478a2e6ba4172b2c1aab1f5␟1006553977463687257:Thesaurus (Short Code)`],me=["label",$localize`:␟ca5a9e437f1b7a4cf3dbd7093e3148af6b2b1bef␟5019752458710398316:Thesaurus`],ye=["label",$localize`:␟a20424156b8816671f61879f0574a4f27d7b16b9␟1043390381565182083:Creator`],Re=["label",$localize`:␟cd3d7a06941c95922503ba1840df687ba08a1bfe␟1793697473153040314:Create Date`],xe=["label",$localize`:␟f42381c8acecc5884b77363ce533535cae614d8f␟8633314934880892066:Edit Date`],Qe=["label",$localize`:␟6834fa6b43d1ecbdf147c48dd9c4d72f1484571d␟9155608366859514313:Source`],ve=["label",$localize`:␟0ee5132a8da30e0b7f9f5c70dbc91928d17dd909␟3715596725146409911:Owner`],Me=["title",$localize`:␟0499fdcad11a6c93656e97642f09211d2dae92e7␟9108361196362783403:Manage Authority ${"\ufffd0\ufffd"}:INTERPOLATION:`];function we(e,t){if(1&e&&(o.Rb(0,"a",35),o.Xb(1,Me),o.Mc(2),o.Qb()),2&e){const e=t.row;o.Zb(e.authority.id()),o.Wb(1),o.qc("routerLink","/staff/cat/authority/manage/",e.authority.id(),"/bibs"),o.xb(2),o.Oc(" ",e.heading," ")}}let Ie=(()=>{class e{constructor(e,t,a,c){this.net=e,this.org=t,this.pcrud=a,this.browse=c}ngOnInit(){this.browse.fetchAxes(),this.setupGrid()}setupGrid(){this.dataSource=new w.c,this.dataSource.getRows=(e,t)=>{if(this.authorityAxis)this.browse.authorityAxis=this.authorityAxis.id;else{if(!this.browse.authorityAxis)return Object(R.b)();this.axisCbox.selectedId=this.browse.authorityAxis,this.authorityAxis=this.axisCbox.selected}return this.browse.loadAuthorities()},this.cellTextGenerator={heading:e=>e.heading},this.rowFlairCallback=e=>{const t={icon:null,title:null};return this.browse.markedForMerge[e.authority.id()]&&(t.icon="merge_type",t.title=this.rowSelected.text),t}}markForMerge(e){e.forEach(e=>this.browse.markedForMerge[e.authority.id()]=e)}unMarkForMerge(e){e.forEach(e=>delete this.browse.markedForMerge[e.authority.id()])}clearMergeSelection(){this.browse.markedForMerge={}}search(e,t){e?this.browse.searchOffset+=e:t&&(this.browse.searchOffset=0),this.grid.reload()}openMergeDialog(){const e=Object.values(this.browse.markedForMerge);e.length>0&&(this.mergeDialog.authData=e,this.mergeDialog.open({size:"lg"}).subscribe(e=>{e&&(this.clearMergeSelection(),this.search())}))}}return e.\u0275fac=function(t){return new(t||e)(o.Lb(x.b),o.Lb(v.a),o.Lb(Q.a),o.Lb($))},e.\u0275cmp=o.Fb({type:e,selectors:[["ng-component"]],viewQuery:function(e,t){var a;1&e&&(o.Sc(Z,!0),o.Sc(H,!0),o.Sc(U,!0),o.Sc(Y,!0)),2&e&&(o.yc(a=o.gc())&&(t.grid=a.first),o.yc(a=o.gc())&&(t.axisCbox=a.first),o.yc(a=o.gc())&&(t.rowSelected=a.first),o.yc(a=o.gc())&&(t.mergeDialog=a.first))},decls:66,vars:13,consts:[[6,"bannerText"],[6,"text"],["rowSelected",""],["mergeDialog",""],[1,"row","form-inline","mb-3"],[1,"col-lg-3"],[1,"input-group"],[1,"input-group-prepend"],["id","search-term",1,"input-group-text"],["type","text","aria-describedby","search-term",1,"form-control",3,"ngModel","change","keyup.enter","ngModelChange",6,"placeholder"],[1,"col-lg-5"],["id","auth-axis",1,"input-group-text"],[3,"ngModel","entries","ngModelChange","onChange"],["axisCbox",""],[1,"col-lg-4","d-flex"],[1,"flex-1"],[1,"form-inline"],[1,"btn","btn-outline-dark","ml-2",3,"click"],["for","offset-input",1,"form-control","ml-2"],["type","number","id","offset-input",1,"form-control",3,"ngModel","ngModelChange","change"],["headingTemplate",""],["persistKey","cat.authority.browse",3,"dataSource","disablePaging","rowFlairIsEnabled","rowFlairCallback","cellTextGenerator"],["grid",""],[3,"onClick",6,"label"],["name","id","path","authority.id","flex","1",3,"index",6,"label"],["name","link_count","flex","1",6,"label"],["name","heading","flex","3",3,"cellTemplate",6,"label"],["name","control_set","path","authority.control_set.name","flex","1",6,"label"],["name","thesaurus","flex","1",6,"label"],["name","thesaurus_code","flex","1",6,"label"],["name","creator","path","authority.creator.usrname","flex","1",6,"label"],["name","create_date","path","authority.create_date","flex","1","datatype","timestamp",6,"label"],["name","edit_date","path","authority.edit_date","flex","1","datatype","timestamp",6,"label"],["name","source","path","authority.source","flex","1",3,"hidden",6,"label"],["name","owner","path","owner","flex","1",3,"hidden",6,"label"],[3,"routerLink",6,"title"]],template:function(e,t){if(1&e&&(o.Rb(0,"eg-staff-banner",0),o.Xb(1,ee),o.Qb(),o.Rb(2,"eg-string",1,2),o.Xb(4,te),o.Qb(),o.Mb(5,"eg-authority-merge-dialog",null,3),o.Rb(7,"div",4),o.Rb(8,"div",5),o.Rb(9,"div",6),o.Rb(10,"div",7),o.Rb(11,"span",8),o.Vb(12,ae),o.Qb(),o.Qb(),o.Rb(13,"input",9),o.Xb(14,ce),o.fc("change",(function(){return t.search(null,!0)}))("keyup.enter",(function(){return t.search(null,!0)}))("ngModelChange",(function(e){return t.browse.searchTerm=e})),o.Qb(),o.Qb(),o.Qb(),o.Rb(15,"div",10),o.Rb(16,"div",6),o.Rb(17,"div",7),o.Rb(18,"span",11),o.Vb(19,re),o.Qb(),o.Qb(),o.Rb(20,"eg-combobox",12,13),o.fc("ngModelChange",(function(e){return t.authorityAxis=e}))("onChange",(function(){return t.search(null,!0)})),o.Qb(),o.Qb(),o.Qb(),o.Rb(22,"div",14),o.Mb(23,"div",15),o.Rb(24,"div",16),o.Rb(25,"button",17),o.fc("click",(function(){return t.search(-1)})),o.Vb(26,ie),o.Qb(),o.Rb(27,"label",18),o.Vb(28,oe),o.Qb(),o.Rb(29,"input",19),o.fc("ngModelChange",(function(e){return t.browse.searchOffset=e}))("change",(function(){return t.search()})),o.Qb(),o.Rb(30,"button",17),o.fc("click",(function(){return t.search(1)})),o.Vb(31,be),o.Qb(),o.Qb(),o.Qb(),o.Qb(),o.Kc(32,we,3,3,"ng-template",null,20,o.Lc),o.Rb(34,"eg-grid",21,22),o.Rb(36,"eg-grid-toolbar-action",23),o.Xb(37,ne),o.fc("onClick",(function(e){return t.markForMerge(e)})),o.Qb(),o.Rb(38,"eg-grid-toolbar-action",23),o.Xb(39,le),o.fc("onClick",(function(e){return t.unMarkForMerge(e)})),o.Qb(),o.Rb(40,"eg-grid-toolbar-action",23),o.Xb(41,se),o.fc("onClick",(function(){return t.clearMergeSelection()})),o.Qb(),o.Rb(42,"eg-grid-toolbar-action",23),o.Xb(43,de),o.fc("onClick",(function(){return t.openMergeDialog()})),o.Qb(),o.Rb(44,"eg-grid-column",24),o.Xb(45,ue),o.Qb(),o.Rb(46,"eg-grid-column",25),o.Xb(47,he),o.Qb(),o.Rb(48,"eg-grid-column",26),o.Xb(49,fe),o.Qb(),o.Rb(50,"eg-grid-column",27),o.Xb(51,ge),o.Qb(),o.Rb(52,"eg-grid-column",28),o.Xb(53,pe),o.Qb(),o.Rb(54,"eg-grid-column",29),o.Xb(55,me),o.Qb(),o.Rb(56,"eg-grid-column",30),o.Xb(57,ye),o.Qb(),o.Rb(58,"eg-grid-column",31),o.Xb(59,Re),o.Qb(),o.Rb(60,"eg-grid-column",32),o.Xb(61,xe),o.Qb(),o.Rb(62,"eg-grid-column",33),o.Xb(63,Qe),o.Qb(),o.Rb(64,"eg-grid-column",34),o.Xb(65,ve),o.Qb(),o.Qb()),2&e){const e=o.zc(33);o.xb(13),o.oc("ngModel",t.browse.searchTerm),o.xb(7),o.oc("ngModel",t.authorityAxis)("entries",t.browse.authorityAxes),o.xb(9),o.oc("ngModel",t.browse.searchOffset),o.xb(5),o.oc("dataSource",t.dataSource)("disablePaging",!0)("rowFlairIsEnabled",!0)("rowFlairCallback",t.rowFlairCallback)("cellTextGenerator",t.cellTextGenerator),o.xb(10),o.oc("index",!0),o.xb(4),o.oc("cellTemplate",e),o.xb(14),o.oc("hidden",!0),o.xb(2),o.oc("hidden",!0)}},directives:[n.a,z.a,W,l.c,l.t,l.w,I.a,l.z,M.a,q.a,J.a,i.f],styles:["#offset-input[_ngcontent-%COMP%] { width: 4em; }"]}),e})();var ke=a("Cfvw");const Te=["grid"],$e=["label",$localize`:␟45cc8ca94b5a50842a9a8ef804a5ab089a38ae5c␟8040881171107393560:ID`],ze=["label",$localize`:␟fdf7cbdc140d0aab0f0b6c06065a0fd448ed6a2e␟5701618810648052610:Title`],Se=["label",$localize`:␟d7293b61e9088c66421df2e367e0ccc00346cf9f␟7071470734400948493:Author`],Le=["label",$localize`:␟a20424156b8816671f61879f0574a4f27d7b16b9␟1043390381565182083:Creator`],Oe=["label",$localize`:␟cd3d7a06941c95922503ba1840df687ba08a1bfe␟1793697473153040314:Create Date`],Ce=["label",$localize`:␟91444811128782dee281d41b12cd7e8f60df4673␟3742657416068781599:Editor`],Ae=["label",$localize`:␟f42381c8acecc5884b77363ce533535cae614d8f␟8633314934880892066:Edit Date`],Xe=["title",$localize`:␟986c84e778ed15dbcd27e46cff10121d14375c3c␟7007378492251742745:View Record ${"\ufffd0\ufffd"}:INTERPOLATION:`];function _e(e,t){if(1&e&&(o.Rb(0,"a",10),o.Xb(1,Xe),o.Mc(2),o.Qb()),2&e){const e=t.row;o.Zb(e.id()),o.Wb(1),o.qc("routerLink","/staff/catalog/record/",e.id(),""),o.xb(2),o.Oc(" ",e.title()," ")}}let De=(()=>{class e{constructor(e,t,a){this.net=e,this.org=t,this.pcrud=a}ngOnInit(){this.dataSource=new w.c,this.dataSource.getRows=(e,t)=>this.bibIds||this.bibIdSource?this.loadIds(e,t):Object(R.b)(),this.cellTextGenerator={title:e=>e.title}}loadIds(e,t){let a;if(this.bibIdSource)a=this.bibIdSource(e,t);else{if(!(this.bibIds&&this.bibIds.length>0))return Object(R.b)();a=Promise.resolve(this.bibIds.slice(e.offset,e.offset+e.limit))}const c={rmsr:"id"};return t.length&&"id"===t[0].name&&(c.rmsr=c.rmsr+" "+t[0].dir),Object(ke.a)(a).pipe(Object(T.a)(e=>0===e.length?Object(R.b)():this.pcrud.search("rmsr",{id:e},{order_by:c,flesh:2,flesh_fields:{rmsr:["biblio_record"],bre:["creator","editor"]}})))}}return e.\u0275fac=function(t){return new(t||e)(o.Lb(x.b),o.Lb(v.a),o.Lb(Q.a))},e.\u0275cmp=o.Fb({type:e,selectors:[["eg-bib-list"]],viewQuery:function(e,t){var a;1&e&&o.Sc(Te,!0),2&e&&o.yc(a=o.gc())&&(t.grid=a.first)},inputs:{bibIds:"bibIds",bibIdSource:"bibIdSource",gridPersistKey:"gridPersistKey"},decls:18,vars:11,consts:[["titleTemplate",""],["idlClass","rmsr",3,"dataSource","sortable","cellTextGenerator","persistKey","showDeclaredFieldsOnly"],["grid",""],["name","id","flex","1",3,"sortable",6,"label"],["name","title","flex","3",3,"cellTemplate",6,"label"],["name","author",6,"label"],["name","creator","path","biblio_record.creator.usrname","flex","1",3,"sortable",6,"label"],["name","create_date","path","biblio_record.create_date","flex","1",3,"sortable",6,"label"],["name","editor","path","biblio_record.editor.usrname","flex","1",3,"sortable",6,"label"],["name","edit_date","path","biblio_record.edit_date","flex","1",3,"sortable",6,"label"],[3,"routerLink",6,"title"]],template:function(e,t){if(1&e&&(o.Kc(0,_e,3,3,"ng-template",null,0,o.Lc),o.Rb(2,"eg-grid",1,2),o.Rb(4,"eg-grid-column",3),o.Xb(5,$e),o.Qb(),o.Rb(6,"eg-grid-column",4),o.Xb(7,ze),o.Qb(),o.Rb(8,"eg-grid-column",5),o.Xb(9,Se),o.Qb(),o.Rb(10,"eg-grid-column",6),o.Xb(11,Le),o.Qb(),o.Rb(12,"eg-grid-column",7),o.Xb(13,Oe),o.Qb(),o.Rb(14,"eg-grid-column",8),o.Xb(15,Ce),o.Qb(),o.Rb(16,"eg-grid-column",9),o.Xb(17,Ae),o.Qb(),o.Qb()),2&e){const e=o.zc(1);o.xb(2),o.oc("dataSource",t.dataSource)("sortable",!1)("cellTextGenerator",t.cellTextGenerator)("persistKey",t.gridPersistKey)("showDeclaredFieldsOnly",!0),o.xb(2),o.oc("sortable",!0),o.xb(2),o.oc("cellTemplate",e),o.xb(4),o.oc("sortable",!1),o.xb(2),o.oc("sortable",!1),o.xb(2),o.oc("sortable",!1),o.xb(2),o.oc("sortable",!1)}},directives:[M.a,J.a,i.f],encapsulation:2}),e})();const Fe=["bannerText",$localize`:␟024135edae04668299930217fcdc907883c063d2␟7998995302472636333:#${"\ufffd0\ufffd"}:INTERPOLATION: ${"\ufffd1\ufffd"}:INTERPOLATION_1:`];var Pe;Pe=$localize`:␟5ec7fb5065b85fe9aaf35eb94764f90457733f3c␟2190684654571143363:Return to Browse`;const Ke=["title",$localize`:␟ec9c073ac67932dc27d49225d91cd0bf80c904af␟6021942807893129814:Linked Bibs`],Ee=["title",$localize`:␟28f86ffd419b869711aa13f5e5ff54be6d70731c␟7585826646011739428:Edit`];function Ne(e,t){if(1&e&&(o.Rb(0,"div",13),o.Mb(1,"eg-bib-list",14,15),o.Qb()),2&e){const e=o.hc(2);o.xb(1),o.oc("bibIdSource",e.linkedBibIdSource)}}function je(e,t){if(1&e&&o.Kc(0,Ne,3,1,"div",12),2&e){const e=o.hc();o.oc("ngIf",e.authMeta)}}function Be(e,t){if(1&e&&(o.Rb(0,"div",13),o.Mb(1,"eg-marc-editor",16,17),o.Qb()),2&e){const e=o.hc();o.xb(1),o.oc("recordId",e.authId)}}let Ve=(()=>{class e{constructor(e,t,a,c,r){this.router=e,this.route=t,this.net=a,this.org=c,this.pcrud=r,this.authTab="bibs"}ngOnInit(){this.route.paramMap.subscribe(e=>{this.authTab=e.get("tab")||"bibs";const t=+e.get("id");t!==this.authId&&(this.authId=t,this.net.request("open-ils.search","open-ils.search.authority.main_entry",this.authId).subscribe(e=>this.authMeta=e))}),this.linkedBibIdSource=(e,t)=>this.getLinkedBibIds(e,t)}getLinkedBibIds(e,t){const a={};return t.length&&"id"===t[0].name&&(a.abl="bib "+t[0].dir),this.pcrud.search("abl",{authority:this.authId},{limit:e.limit,offset:e.offset,order_by:a},{atomic:!0}).pipe(Object(k.a)(e=>e.map(e=>e.bib()))).toPromise()}beforeTabChange(e){e.preventDefault(),this.authTab=e.nextId,this.routeToTab()}routeToTab(){this.router.navigate([`/staff/cat/authority/manage/${this.authId}/${this.authTab}`])}}return e.\u0275fac=function(t){return new(t||e)(o.Lb(i.c),o.Lb(i.a),o.Lb(x.b),o.Lb(v.a),o.Lb(Q.a))},e.\u0275cmp=o.Fb({type:e,selectors:[["ng-component"]],decls:18,vars:3,consts:[[6,"bannerText"],[1,"row","mb-2"],[1,"col-lg-3"],["routerLink","/staff/cat/authority/browse"],[1,"btn","btn-outline-dark"],[1,"material-icons","material-mat-icon-shrunk-in-button"],[1,"pl-1"],[3,"activeId","tabChange"],["authTabs",""],["id","bibs",6,"title"],["ngbTabContent",""],["id","edit",6,"title"],["class","mt-3",4,"ngIf"],[1,"mt-3"],["gridPersistKey","cat.authority.manage.bibs",3,"bibIdSource"],["bibList",""],["recordType","authority",3,"recordId"],["marcEditor",""]],template:function(e,t){1&e&&(o.Rb(0,"eg-staff-banner",0),o.Xb(1,Fe),o.Qb(),o.Rb(2,"div",1),o.Rb(3,"div",2),o.Rb(4,"a",3),o.Rb(5,"button",4),o.Rb(6,"span",5),o.Mc(7,"arrow_back"),o.Qb(),o.Rb(8,"span",6),o.Vb(9,Pe),o.Qb(),o.Qb(),o.Qb(),o.Qb(),o.Qb(),o.Rb(10,"ngb-tabset",7,8),o.fc("tabChange",(function(e){return t.beforeTabChange(e)})),o.Rb(12,"ngb-tab",9),o.Xb(13,Ke),o.Kc(14,je,1,1,"ng-template",10),o.Qb(),o.Rb(15,"ngb-tab",11),o.Xb(16,Ee),o.Kc(17,Be,3,1,"ng-template",10),o.Qb(),o.Qb()),2&e&&(o.Zb(t.authId)(t.authMeta?t.authMeta.heading:""),o.Wb(1),o.xb(10),o.oc("activeId",t.authTab))},directives:[n.a,i.f,A.W,A.T,A.U,b.v,De,s.a],encapsulation:2}),e})();const Ge=[{path:"edit",component:y},{path:"edit/:id",component:y},{path:"browse",component:Ie},{path:"manage/:id/:tab",component:Ve},{path:"manage/:id/:tab",component:Ve}];let We=(()=>{class e{}return e.\u0275mod=o.Jb({type:e}),e.\u0275inj=o.Ib({factory:function(t){return new(t||e)},providers:[],imports:[[i.g.forChild(Ge)],i.g]}),e})();var qe=a("9u+K");let Je=(()=>{class e{}return e.\u0275mod=o.Jb({type:e}),e.\u0275inj=o.Ib({factory:function(t){return new(t||e)},providers:[],imports:[[c.a]]}),e})(),Ze=(()=>{class e{}return e.\u0275mod=o.Jb({type:e}),e.\u0275inj=o.Ib({factory:function(t){return new(t||e)},providers:[$],imports:[[c.a,r.a,qe.a,We,Je]]}),e})()}}]);