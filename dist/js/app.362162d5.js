(function(e){function t(t){for(var o,a,l=t[0],u=t[1],s=t[2],p=0,f=[];p<l.length;p++)a=l[p],i[a]&&f.push(i[a][0]),i[a]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(e[o]=u[o]);c&&c(t);while(f.length)f.shift()();return r.push.apply(r,s||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,l=1;l<n.length;l++){var u=n[l];0!==i[u]&&(o=!1)}o&&(r.splice(t--,1),e=a(a.s=n[0]))}return e}var o={},i={app:0},r=[];function a(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=o,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(n,o,function(t){return e[t]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/filtered-google-maps/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var s=0;s<l.length;s++)t(l[s]);var c=u;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var o=n("64a9"),i=n.n(o);i.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var o=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("b-row",[n("b-col",{attrs:{cols:"4"}},[n("input-component"),n("br"),n("h5",[e._v("You may select a minimum and maximum price.")]),n("h5",[e._v("Double click the group pin to zoom and expose individual pins.")]),n("h5",[e._v("Double click individual pins to see address")]),n("br"),n("b-row",[n("b-col",{attrs:{cols:"4"}},[e._v("Minimum")]),n("b-col",{attrs:{cols:"8"}},[n("b-input-group",{attrs:{size:"md",prepend:"$",append:".00",label:"Minimum"}},[n("b-form-input",{model:{value:e.minimumPrice,callback:function(t){e.minimumPrice=t},expression:"minimumPrice"}})],1)],1),n("b-col",{attrs:{cols:"4"}},[e._v("Maximum")]),n("b-col",{attrs:{cols:"8"}},[n("b-input-group",{attrs:{size:"md",prepend:"$",append:".00",label:"Maximum"}},[n("b-form-input",{model:{value:e.maximumPrice,callback:function(t){e.maximumPrice=t},expression:"maximumPrice"}})],1)],1)],1)],1),n("b-col",{attrs:{cols:"8"}},[n("GmapMap",{staticStyle:{width:"100%",height:"80vh"},attrs:{center:{lat:41.9,lng:-87.7},zoom:11,"map-type-id":"terrain"}},[n("gmap-cluster",[n("gmap-info-window",{attrs:{options:e.infoOptions,position:e.infoPosition,opened:e.infoOpened},on:{closeclick:function(t){e.infoOpened=!1}}},[e._v("\n                            "+e._s(e.infoContent)+"\n                            ")]),e._l(e.markers,function(t,o){return n("GmapMarker",{key:o,attrs:{position:t.position,clickable:!0,draggable:!0},on:{click:function(n){return e.toggleInfo(t,o)}}})})],2)],1)],1)],1)],1)},r=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("b-form-file",{attrs:{state:Boolean(e.$store.state.file),placeholder:"Select CSV file","drop-placeholder":"Drop file here..."},on:{change:e.onFileChange}}),e._l(e.$store.state.file,function(t){return n("div",{key:t[0]},[e._v("\n            "+e._s(t["Longitude"])+"  "+e._s(t["Latitude"])+"\n    ")])})],2)},l=[],u=(n("ac6a"),n("369b")),s=n.n(u),c={name:"input-component",data:function(){return{}},methods:{onFileChange:function(e){var t=this,n=event.target.files[0],o=new FileReader;o.onload=function(e){s.a.parse(e.target.result,{header:!0,complete:function(e){var n=new Array;e.data.forEach(function(e){var t=parseFloat(e["Latitude"]),o=parseFloat(e["Longitude"]),i={position:{lat:t,lng:o},data:e};n.push(i)}),t.$store.dispatch("setFile",n)},error:function(e){console.log("error",e)}})},o.readAsText(n)}}},p=c,f=n("2877"),m=Object(f["a"])(p,a,l,!1,null,"21bba494",null),d=m.exports,h=n("755e"),g={name:"app",data:function(){return{infoPosition:null,infoContent:null,infoOpened:!1,infoCurrentKey:null,infoOptions:{pixelOffset:{width:0,height:-35}},price:!0,minimumPrice:null,maximumPrice:null,filterResults:null}},methods:{getPosition:function(e){return console.log("THE MARKER: "+e),{lat:parseFloat(e.lat),lng:parseFloat(e.lng)}},toggleInfo:function(e,t){this.infoPosition=this.getPosition(e.position),this.infoContent=e.data["Full Address"],this.infoCurrentKey==t?this.infoOpened=!this.infoOpened:(this.infoOpened=!0,this.infoCurrentKey=t)}},components:{InputComponent:d},computed:{markers:function(){var e=this;if(this.minimumPrice){var t=this.$store.state.file.filter(function(t){return t.data.ESTIMATED_MARKET_VALUE>=e.minimumPrice&&t.data.ESTIMATED_MARKET_VALUE<=e.maximumPrice});return t}return this.$store.state.file},google:h["gmapApi"]},mounted:function(){console.log("production")}},b=g,v=(n("034f"),Object(f["a"])(b,i,r,!1,null,null,null)),y=v.exports,_=n("5f5b"),P=(n("f9e3"),n("2dd8"),n("2f62"));o["default"].use(P["a"]);var x=new P["a"].Store({state:function(){return{file:null}},getters:{isFile:function(e){return!!e.file}},mutations:{setFile:function(e,t){e.file=t}},actions:{setFile:function(e,t){e.commit("setFile",t)}}}),w=n("1557"),O=n("ae66"),k=n.n(O);o["default"].use(h,{load:{region:"US",language:"en",key:"AIzaSyByNrtjh_Nl0Cyi8TiWnb-9Gw5ZaapgomY"},installComponents:!0}),o["default"].use(_["a"]),o["default"].config.productionTip=!1,o["default"].component("GmapMarker",w["GmapMarker"]),o["default"].component("GmapCluster",k.a),new o["default"]({render:function(e){return e(y)},store:x}).$mount("#app")},"64a9":function(e,t,n){}});
//# sourceMappingURL=app.362162d5.js.map