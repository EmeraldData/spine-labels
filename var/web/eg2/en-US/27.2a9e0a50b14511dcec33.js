(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{FN4W:function(e,t,a){"use strict";a.r(t),a.d(t,"FloatingGroupModule",(function(){return k}));var i=a("GLCv"),r=a("tyNb"),o=a("MWGh"),c=a("iA0r"),n=a("wBwE"),d=a("fXoL"),b=a("ayJW"),l=a("ufrD"),s=a("UUQ6"),f=a("RAh1");const g=["prefix",$localize`:␟e2863241e8dcbab6351bd6e04afe7f015eaeb424␟5630337722341848189:Edit Floating Group`],u=["bannerText",$localize`:␟e2863241e8dcbab6351bd6e04afe7f015eaeb424␟5630337722341848189:Edit Floating Group`];var p;p=$localize`:␟14c83cdf1dd2dfe3783af66e028b5fc5c6741983␟7087787479462208294:Return to Floating Groups List`;const h=["bannerText",$localize`:␟74deca4ad68e1663db754cea126098700133d636␟2189511514416186710:Edit Floating Group Members`];let m=(()=>{class e{constructor(e,t,a){this.route=e,this.pcrud=t,this.idl=a}ngOnInit(){this.currentId=parseInt(this.route.snapshot.paramMap.get("id"),10),this.defaultNewRecord=this.idl.create("cfgm"),this.defaultNewRecord.floating_group(this.currentId),this.dataSource=new o.c,this.dataSource.getRows=(e,t)=>{const a={};return t.length&&(a.cfgm=t[0].name+" "+t[0].dir),this.pcrud.search("cfgm",{floating_group:this.currentId},{offset:e.offset,limit:e.limit,order_by:a})}}}return e.\u0275fac=function(t){return new(t||e)(d.Lb(r.a),d.Lb(c.a),d.Lb(n.a))},e.\u0275cmp=d.Fb({type:e,selectors:[["ng-component"]],decls:16,vars:3,consts:[[6,"prefix"],[6,"bannerText"],[1,"row"],[1,"col","text-right"],["routerLink","/staff/admin/server/config/floating_group",1,"btn","btn-warning","ml-3"],[1,"material-icons","align-middle"],[1,"align-middle"],[1,"col-lg-6","offset-lg-3"],["displayMode","inline","idlClass","cfg","mode","update",3,"recordId"],["idlClass","cfgm","disableOrgFilter","true","hideGridFields","id,floating_group","readonlyFields","floating_group",3,"dataSource","defaultNewRecord"]],template:function(e,t){1&e&&(d.Rb(0,"eg-title",0),d.Xb(1,g),d.Qb(),d.Rb(2,"eg-staff-banner",1),d.Xb(3,u),d.Qb(),d.Rb(4,"div",2),d.Rb(5,"div",3),d.Rb(6,"a",4),d.Rb(7,"span",5),d.Mc(8,"keyboard_return"),d.Qb(),d.Rb(9,"span",6),d.Vb(10,p),d.Qb(),d.Qb(),d.Qb(),d.Qb(),d.Rb(11,"div",7),d.Mb(12,"eg-fm-record-editor",8),d.Qb(),d.Rb(13,"eg-staff-banner",1),d.Xb(14,h),d.Qb(),d.Mb(15,"eg-admin-page",9)),2&e&&(d.xb(12),d.pc("recordId",t.currentId),d.xb(3),d.oc("dataSource",t.dataSource)("defaultNewRecord",t.defaultNewRecord))},directives:[b.a,l.a,r.f,s.a,f.a],encapsulation:2}),e})();var w=a("ZvpF"),R=a("9Zsr"),v=a("YRS1"),S=a("cm5s"),Q=a("wN9v"),F=a("8PDw"),x=a("ofXK"),L=a("tNQm"),y=a("eXX1"),G=a("QGNW");const X=["grid"],N=["bannerText",$localize`:␟dbd61d4ec7c6698e55c11fa5c2e6e37f7d89d1f2␟419439977084700932:Floating Group Administration`],I=["text",$localize`:␟c5651bbe59def63687b66f18ee0486f54b5d9c49␟8541057692848372983:New Floating Group Added`],z=["text",$localize`:␟f57df05ddfc030e9ba46723eb57559841f679324␟6078662925265916018:Failed to Create New Floating Group`],$=["text",$localize`:␟7577e653dc37055f97377842fdbccaf5bbfde9c3␟7713184772542442873:Delete of Floating Group failed or was not allowed`],C=["text",$localize`:␟7071f98812e4b262df6fb37051946867cc584ce0␟1359957205674989257:Delete of Floating Group succeeded`],D=["label",$localize`:␟db2234a0251bdbf4d8fde59d291b8625584fb854␟6089771642871945619:New Floating Group`],E=["label",$localize`:␟c525cbf6c3ff841184f81b04f0303bce644b1c51␟2886653045266158715:Edit Selected`],M=["label",$localize`:␟96e678d5f4bfe1a041ecfcd34804efa5e100d5e8␟5167284364083276913:Delete Selected`],_=[{path:":id",component:m},{path:"",component:(()=>{class e extends f.a{constructor(e,t,a,i,r,c,n,d,b,l){super(e,t,a,i,r,c,n,d,b),this.router=l,this.idlClass="cfg",this.gridDataSource=new o.c,this.editSelected=e=>{const t=e[0].id();this.navigateToEditPage(t)},this.deleteSelected=e=>{super.deleteSelected(e)}}ngOnInit(){super.ngOnInit(),this.gridDataSource.getRows=(e,t)=>{const a={};return t.length&&(a.cfg=t[0].name+" "+t[0].dir),this.pcrud.retrieveAll("cfg",{offset:e.offset,limit:e.limit,order_by:a})},this.grid.onRowActivate.subscribe(e=>{const t=e.id();this.navigateToEditPage(t)})}navigateToEditPage(e){this.router.navigate(["/staff/admin/server/config/floating_group/"+e])}showEditDialog(e){}}return e.\u0275fac=function(t){return new(t||e)(d.Lb(r.a),d.Lb(x.p),d.Lb(w.a),d.Lb(n.a),d.Lb(S.a),d.Lb(F.a),d.Lb(c.a),d.Lb(Q.a),d.Lb(v.a),d.Lb(r.c))},e.\u0275cmp=d.Fb({type:e,selectors:[["ng-component"]],viewQuery:function(e,t){var a;1&e&&d.Ic(X,!0),2&e&&d.yc(a=d.gc())&&(t.grid=a.first)},features:[d.ub],decls:24,vars:4,consts:[[6,"bannerText"],[6,"text"],["createString",""],["createErrString",""],["deleteFailedString",""],["deleteSuccessString",""],["idlClass","cfg",3,"dataSource","sortable"],["grid",""],[3,"onClick",6,"label"],[3,"action",6,"label"],["idlClass","cfg"],["editDialog",""]],template:function(e,t){1&e&&(d.Rb(0,"eg-staff-banner",0),d.Xb(1,N),d.Qb(),d.Rb(2,"eg-string",1,2),d.Xb(4,I),d.Qb(),d.Rb(5,"eg-string",1,3),d.Xb(7,z),d.Qb(),d.Rb(8,"eg-string",1,4),d.Xb(10,$),d.Qb(),d.Rb(11,"eg-string",1,5),d.Xb(13,C),d.Qb(),d.Rb(14,"eg-grid",6,7),d.Rb(16,"eg-grid-toolbar-button",8),d.Xb(17,D),d.fc("onClick",(function(){return t.createNew()})),d.Qb(),d.Rb(18,"eg-grid-toolbar-action",9),d.Xb(19,E),d.Qb(),d.Rb(20,"eg-grid-toolbar-action",9),d.Xb(21,M),d.Qb(),d.Qb(),d.Mb(22,"eg-fm-record-editor",10,11)),2&e&&(d.xb(14),d.oc("dataSource",t.gridDataSource)("sortable",!0),d.xb(4),d.oc("action",t.editSelected),d.xb(2),d.oc("action",t.deleteSelected))},directives:[l.a,L.a,R.a,y.a,G.a,s.a],encapsulation:2}),e})()}];let T=(()=>{class e{}return e.\u0275mod=d.Jb({type:e}),e.\u0275inj=d.Ib({factory:function(t){return new(t||e)},imports:[[r.g.forChild(_)],r.g]}),e})(),k=(()=>{class e{}return e.\u0275mod=d.Jb({type:e}),e.\u0275inj=d.Ib({factory:function(t){return new(t||e)},providers:[],imports:[[i.a,T]]}),e})()}}]);