(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-collapse/uni-collapse"],{"3d56":function(n,t,e){"use strict";e.r(t);var c=e("a4dd"),a=e("c0e8");for(var u in a)"default"!==u&&function(n){e.d(t,n,(function(){return a[n]}))}(u);e("75b1");var r,o=e("f0c5"),i=Object(o["a"])(a["default"],c["b"],c["c"],!1,null,"506c0e2e",null,!1,c["a"],r);t["default"]=i.exports},"4cf4":function(n,t,e){},"75b1":function(n,t,e){"use strict";var c=e("4cf4"),a=e.n(c);a.a},a4dd:function(n,t,e){"use strict";var c,a=function(){var n=this,t=n.$createElement;n._self._c},u=[];e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return u})),e.d(t,"a",(function(){return c}))},c0e8:function(n,t,e){"use strict";e.r(t);var c=e("cfae"),a=e.n(c);for(var u in c)"default"!==u&&function(n){e.d(t,n,(function(){return c[n]}))}(u);t["default"]=a.a},cfae:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c={name:"UniCollapse",props:{accordion:{type:[Boolean,String],default:!1}},data:function(){return{}},provide:function(){return{collapse:this}},created:function(){this.childrens=[]},methods:{onChange:function(){var n=[];this.childrens.forEach((function(t,e){t.isOpen&&n.push(t.nameSync)})),this.$emit("change",n)}}};t.default=c}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-collapse/uni-collapse-create-component',
    {
        'components/uni-collapse/uni-collapse-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3d56"))
        })
    },
    [['components/uni-collapse/uni-collapse-create-component']]
]);
