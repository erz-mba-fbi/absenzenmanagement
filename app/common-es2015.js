(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"4vbw":function(t,e,n){"use strict";n.d(e,"a",function(){return c});var i=n("Xr/R"),a=n("dlU5"),r=n("j+Kt");const s=r.p({Id:r.k,Number:r.n});var o=n("fXoL"),u=n("tk/3");let c=(()=>{class t extends a.a{constructor(t,e){super(t,e,s,"StudyClasses","Number")}}return t.\u0275fac=function(e){return new(e||t)(o.Zb(u.b),o.Zb(i.a))},t.\u0275prov=o.Ib({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},NPit:function(t,e,n){"use strict";n.d(e,"a",function(){return a});var i=n("sWYD");function a(t){return Object.keys(t).reduce((e,n)=>{const a=function(t){return t?t instanceof Date?Object(i.a)(t,"yyyy-MM-dd"):String(t):t}(t[n]);return a?Object.assign(Object.assign({},e),{[n]:a}):e},{})}},"U+jE":function(t,e,n){"use strict";n.d(e,"a",function(){return s});var i=n("fXoL"),a=n("ofXK");function r(t,e){if(1&t){const t=i.Tb();i.Sb(0,"button",6),i.dc("click",function(){return i.vc(t),i.fc().valueChange.emit("")}),i.Sb(1,"i",3),i.Dc(2,"clear"),i.Rb(),i.Rb()}}let s=(()=>{class t{constructor(){this.value="",this.disabled=!1,this.valueChange=new i.n}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=i.Gb({type:t,selectors:[["erz-resettable-input"]],inputs:{value:"value",disabled:"disabled",placeholder:"placeholder",label:"label"},outputs:{valueChange:"valueChange"},decls:7,vars:5,consts:[[1,"input-group"],[1,"input-group-prepend"],["id","resettable-input",1,"input-group-text"],[1,"material-icons"],["type","text","aria-describedby","resettable-input",1,"form-control",3,"value","disabled","keyup"],["class","btn btn-link text-decoration-none","type","button",3,"click",4,"ngIf"],["type","button",1,"btn","btn-link","text-decoration-none",3,"click"]],template:function(t,e){1&t&&(i.Sb(0,"div",0),i.Sb(1,"div",1),i.Sb(2,"span",2),i.Sb(3,"i",3),i.Dc(4,"search"),i.Rb(),i.Rb(),i.Rb(),i.Sb(5,"input",4),i.dc("keyup",function(t){return e.valueChange.emit(t.target.value)}),i.Rb(),i.Bc(6,r,3,0,"button",5),i.Rb()),2&t&&(i.zb(5),i.lc("value",e.value)("disabled",e.disabled),i.Ab("placeholder",e.placeholder)("aria-label",e.label),i.zb(1),i.lc("ngIf",e.value))},directives:[a.m],styles:["input[_ngcontent-%COMP%]{padding-right:2.5em}button[_ngcontent-%COMP%]{position:absolute;right:0;z-index:3}"]}),t})()},Ug8t:function(t,e,n){"use strict";n.d(e,"a",function(){return v});var i=n("XNiG"),a=n("jtHE"),r=n("UXun"),s=n("lJxs"),o=n("JX91"),u=n("/uUt"),c=n("pLZG"),l=n("eIep"),d=n("oB13"),b=n("Xr/R"),p=n("fbMX"),f=n("K+0v"),h=n("fXoL"),g=n("tk/3");let v=(()=>{class t{constructor(t,e,n){var a;this.settings=t,this.storageService=e,this.http=n,this.studentConfirmationAvailabilityRecordIds$=new i.a,this.personMasterDataAvailability$=this.loadReportAvailability("Person",this.settings.personMasterDataReportId,[Number(null===(a=this.storageService.getPayload())||void 0===a?void 0:a.id_person)]).pipe(Object(r.a)(1)),this.studentConfirmationAvailability$=this.loadReportAvailabilityByAsyncRecordIds("Praesenzinformation",this.settings.studentConfirmationReportId,this.studentConfirmationAvailabilityRecordIds$),this.studentConfirmationAvailabilitySub=this.studentConfirmationAvailability$.connect()}ngOnDestroy(){this.studentConfirmationAvailabilitySub.unsubscribe()}getPersonMasterDataUrl(t){return this.getReportUrl("Person",this.settings.personMasterDataReportId,[t])}getStudentConfirmationUrl(t){return this.getReportUrl("Praesenzinformation",this.settings.studentConfirmationReportId,t)}setStudentConfirmationAvailabilityRecordIds(t){this.studentConfirmationAvailabilityRecordIds$.next(t)}getReportUrl(t,e,n){return`${this.settings.apiUrl}/Files/CrystalReports/${t}/${e}?ids=${n.join(",")}&token=${this.storageService.getAccessToken()}`}loadReportAvailability(t,e,n){return this.http.get(`${this.settings.apiUrl}/CrystalReports/AvailableReports/${t}?ids=${e}&keys=${n.join(",")}`).pipe(Object(s.a)(f.e),Object(o.a)(!1),Object(u.a)())}loadReportAvailabilityByAsyncRecordIds(t,e,n){return n.pipe(Object(c.a)((t,e)=>0===e),Object(l.a)(n=>this.loadReportAvailability(t,e,n)),Object(d.a)(()=>new a.a(1)))}}return t.\u0275fac=function(e){return new(e||t)(h.Zb(b.a),h.Zb(p.a),h.Zb(g.b))},t.\u0275prov=h.Ib({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},jiSq:function(t,e,n){"use strict";n.d(e,"a",function(){return u});var i,a=(i={"\xc0":"A","\xc1":"A","\xc2":"A","\xc3":"A","\xc4":"A","\xc5":"A","\xe0":"a","\xe1":"a","\xe2":"a","\xe3":"a","\xe4":"a","\xe5":"a","\xc7":"C","\xe7":"c","\xd0":"D","\xf0":"d","\xc8":"E","\xc9":"E","\xca":"E","\xcb":"E","\xe8":"e","\xe9":"e","\xea":"e","\xeb":"e","\xcc":"I","\xcd":"I","\xce":"I","\xcf":"I","\xec":"i","\xed":"i","\xee":"i","\xef":"i","\xd1":"N","\xf1":"n","\xd2":"O","\xd3":"O","\xd4":"O","\xd5":"O","\xd6":"O","\xd8":"O","\xf2":"o","\xf3":"o","\xf4":"o","\xf5":"o","\xf6":"o","\xf8":"o","\xd9":"U","\xda":"U","\xdb":"U","\xdc":"U","\xf9":"u","\xfa":"u","\xfb":"u","\xfc":"u","\xdd":"Y","\xfd":"y","\xff":"y","\xc6":"Ae","\xe6":"ae","\xde":"Th","\xfe":"th","\xdf":"ss","\u0100":"A","\u0102":"A","\u0104":"A","\u0101":"a","\u0103":"a","\u0105":"a","\u0106":"C","\u0108":"C","\u010a":"C","\u010c":"C","\u0107":"c","\u0109":"c","\u010b":"c","\u010d":"c","\u010e":"D","\u0110":"D","\u010f":"d","\u0111":"d","\u0112":"E","\u0114":"E","\u0116":"E","\u0118":"E","\u011a":"E","\u0113":"e","\u0115":"e","\u0117":"e","\u0119":"e","\u011b":"e","\u011c":"G","\u011e":"G","\u0120":"G","\u0122":"G","\u011d":"g","\u011f":"g","\u0121":"g","\u0123":"g","\u0124":"H","\u0126":"H","\u0125":"h","\u0127":"h","\u0128":"I","\u012a":"I","\u012c":"I","\u012e":"I","\u0130":"I","\u0129":"i","\u012b":"i","\u012d":"i","\u012f":"i","\u0131":"i","\u0134":"J","\u0135":"j","\u0136":"K","\u0137":"k","\u0138":"k","\u0139":"L","\u013b":"L","\u013d":"L","\u013f":"L","\u0141":"L","\u013a":"l","\u013c":"l","\u013e":"l","\u0140":"l","\u0142":"l","\u0143":"N","\u0145":"N","\u0147":"N","\u014a":"N","\u0144":"n","\u0146":"n","\u0148":"n","\u014b":"n","\u014c":"O","\u014e":"O","\u0150":"O","\u014d":"o","\u014f":"o","\u0151":"o","\u0154":"R","\u0156":"R","\u0158":"R","\u0155":"r","\u0157":"r","\u0159":"r","\u015a":"S","\u015c":"S","\u015e":"S","\u0160":"S","\u015b":"s","\u015d":"s","\u015f":"s","\u0161":"s","\u0162":"T","\u0164":"T","\u0166":"T","\u0163":"t","\u0165":"t","\u0167":"t","\u0168":"U","\u016a":"U","\u016c":"U","\u016e":"U","\u0170":"U","\u0172":"U","\u0169":"u","\u016b":"u","\u016d":"u","\u016f":"u","\u0171":"u","\u0173":"u","\u0174":"W","\u0175":"w","\u0176":"Y","\u0177":"y","\u0178":"Y","\u0179":"Z","\u017b":"Z","\u017d":"Z","\u017a":"z","\u017c":"z","\u017e":"z","\u0132":"IJ","\u0133":"ij","\u0152":"Oe","\u0153":"oe","\u0149":"'n","\u017f":"s"},function(t){return null==i?void 0:i[t]}),r=n("efZk"),s=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,o=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]","g");function u(t,e){return e?t.filter(function(t){const e=c(t);return t=>c(t.studentFullName).includes(e)||!!t.studyClassNumber&&c(t.studyClassNumber).includes(e)}(e)):t}function c(t){return e=t.toLowerCase(),(e=Object(r.a)(e))&&e.replace(s,a).replace(o,"");var e}},vjgy:function(t,e,n){"use strict";n.d(e,"a",function(){return v});var i=n("Xr/R"),a=n("j+Kt");const r=a.p({Id:a.k,Designation:a.n,Number:a.n});var s=n("eIep"),o=n("lJxs"),u=n("t0ae"),c=n("EY2u"),l=n("LRne"),d=n("RJ6/"),b=n("mbak"),p=n("fXoL"),f=n("tk/3"),h=n("sYmb"),g=n("5eHb");let v=(()=>{class t extends b.a{constructor(t,e,n,i){super(t,e,r,"EducationalEvents"),this.translate=n,this.toastr=i,this.typeaheadCodec=a.p(Object(d.a)(this.codec.props,["Id","Designation","Number"]))}getTypeaheadItems(t){return this.http.get(`${this.baseUrl}/CurrentSemester`,{params:{fields:["Id","Designation","Number"].join(","),"filter.Designation":`~*${t}*`}}).pipe(Object(s.a)(Object(u.b)(this.typeaheadCodec)),Object(o.a)(t=>t.map(t=>({Key:t.Id,Value:`${t.Designation} (${t.Number})`}))))}getTypeaheadItemById(t){return this.http.get(`${this.baseUrl}/CurrentSemester`,{params:{fields:["Id","Designation","Number"].join(","),"filter.Id":`=${t}`}}).pipe(Object(s.a)(Object(u.b)(this.typeaheadCodec)),Object(s.a)(t=>0===t.length?(this.toastr.error(this.translate.instant("global.rest-errors.notfound-message"),this.translate.instant("global.rest-errors.notfound-title")),c.a):Object(l.a)({Key:t[0].Id,Value:`${t[0].Designation} (${t[0].Number})`})))}}return t.\u0275fac=function(e){return new(e||t)(p.Zb(f.b),p.Zb(i.a),p.Zb(h.d),p.Zb(g.b))},t.\u0275prov=p.Ib({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);