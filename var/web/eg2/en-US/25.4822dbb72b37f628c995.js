(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{mUiT:function(e,n,l){"use strict";l.r(n),l.d(n,"AdminRoutingModule",(function(){return d}));var o=l("tyNb"),i=l("fXoL");const t=[{path:"",children:[{path:"workstation",loadChildren:()=>l.e(29).then(l.bind(null,"5h2/")).then(e=>e.AdminWsRoutingModule)},{path:"server",loadChildren:()=>Promise.all([l.e(1),l.e(2),l.e(0),l.e(26)]).then(l.bind(null,"jGaZ")).then(e=>e.AdminServerModule)},{path:"local",loadChildren:()=>Promise.all([l.e(1),l.e(2),l.e(0),l.e(17)]).then(l.bind(null,"L0vE")).then(e=>e.AdminLocalModule)},{path:"acq",loadChildren:()=>Promise.all([l.e(1),l.e(2),l.e(0),l.e(22)]).then(l.bind(null,"K/hM")).then(e=>e.AdminAcqModule)},{path:"booking",loadChildren:()=>Promise.all([l.e(1),l.e(2),l.e(0),l.e(23)]).then(l.bind(null,"aI03")).then(e=>e.AdminBookingModule)}]}];let d=(()=>{class e{}return e.\u0275mod=i.Jb({type:e}),e.\u0275inj=i.Ib({factory:function(n){return new(n||e)},imports:[[o.g.forChild(t)],o.g]}),e})()}}]);