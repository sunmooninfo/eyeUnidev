(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-popup/uni-popup-message"],{"05d2":function(t,e,n){"use strict";n.r(e);var u=n("e817"),i=n.n(u);for(var o in u)"default"!==o&&function(t){n.d(e,t,(function(){return u[t]}))}(o);e["default"]=i.a},"3b60":function(t,e,n){"use strict";var u=n("d693"),i=n.n(u);i.a},"64b5":function(t,e,n){"use strict";var u,i=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return u}))},d693:function(t,e,n){},dae9:function(t,e,n){"use strict";n.r(e);var u=n("64b5"),i=n("05d2");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("3b60");var r,a=n("f0c5"),c=Object(a["a"])(i["default"],u["b"],u["c"],!1,null,"319d6a3f",null,!1,u["a"],r);e["default"]=c.exports},e817:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"UniPopupMessage",props:{type:{type:String,default:"success"},message:{type:String,default:""},duration:{type:Number,default:3e3}},inject:["popup"],data:function(){return{}},created:function(){this.popup.childrenMsg=this},methods:{open:function(){var t=this;0!==this.duration&&(clearTimeout(this.popuptimer),this.popuptimer=setTimeout((function(){t.popup.close()}),this.duration))},close:function(){clearTimeout(this.popuptimer)}}};e.default=u}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-popup/uni-popup-message-create-component',
    {
        'components/uni-popup/uni-popup-message-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("dae9"))
        })
    },
    [['components/uni-popup/uni-popup-message-create-component']]
]);
