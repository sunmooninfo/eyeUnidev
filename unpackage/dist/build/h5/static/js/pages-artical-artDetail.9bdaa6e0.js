(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-artical-artDetail"],{1070:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={membershipCard:"common/member/package/list",vipCommodityList:"common/member/goods/list",integralCommodityList:"common/integral/goods/list",membershipTime:"common/member/user/mylist",submitMembership:"common/member/order/submit",vipPrepayment:"common/member/order/apppay",H5prepayment:"common/member/order/h5pay",historyCard:"common/member/order/list",historyDelete:"common/member/order/delete",integralDetails:"common/integral/goods/detail",vipDetails:"common/member/goods/detail",cartNumber:"common/cart/goodscount",addCart:"common/cart/add",fastadd:"common/cart/fastadd",checked:"common/cart/checked",cart:"common/cart/index",Upcart:"common/cart/update",cartDelete:"common/cart/delete",cartx:"common/cart/checkout",Integral:"common/cart/checkIntegral",groupon:"common/groupon/cart/checkout",couponList:"common/coupon/selectlist",buy:"common/order/submit",IntegralBuy:"common/order/submitIntegral",prepaymentApp:"common/order/apppay",prepaymentcommon:"common/order/prepay",prepaymentH5:"common/order/h5pay",homeIndex:"common/home/index",couponRecrive:"common/coupon/receive",goodsCount:"common/goods/count",addList:"common/address/list",addDetail:"common/address/detail",addSave:"common/address/save",addDelete:"common/address/delete",regionList:"common/region/list",couponMy:"common/coupon/mylist",related:"common/goods/related",addOrdelete:"common/collect/addordelete",goodsDetail:"common/goods/detail",goodsCartBuy:"common/groupon/cart/buying",grouponJoin:"common/groupon/join",fastAdd:"common/cart/fastadd",collectList:"common/collect/list",collectDelete:"common/collect/addordelete",feedbackSubmit:"common/feedback/submit",footprintList:"common/footprint/list",footprintDelete:"common/footprint/delete",goodsCategory:"common/goods/category",goodsList:"common/goods/list",catalogIndex:"common/catalog/index",catalogCurrent:"common/catalog/current",authLogin:"common/auth/login",logincommon:"common/auth/login_by_weixin",appLogincommon:"common/auth/app_login_by_weixin",checkMo:"common/auth/checkIsBindMobile",profile:"common/auth/profile",logout:"common/auth/logout",orderList:"common/order/list",orderDetail:"common/order/detail",orderCancel:"common/order/cancel",orderRefund:"common/order/refund",orderConfirm:"common/order/confirm",orderDelete:"common/order/delete",orderShowLink:"common/order/showLink",register:"common/auth/register",regCaptcha:"common/auth/regCaptcha",reset:"common/auth/reset",commentList:"common/comment/list",topicDetail:"common/topic/detail",topicRelated:"common/topic/related",bindMobile:"common/auth/bindMobile",unbindMobile:"common/auth/unbindMobile",grouponDetail:"common/groupon/detail",grouponList:"common/groupon/list",grouponMy:"common/groupon/my",articalIndex:"cms/category/all",articalCurrent:"cms/category/current",articalDetail:"cms/article/detail",articalCertificate:"cms/article/certificate",articalList:"cms/article/list"};e.default=a},"28f0":function(t,e,o){var a=o("b543");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=o("4f06").default;i("5c5019c1",a,!0,{sourceMap:!1,shadowMode:!1})},"404c":function(t,e,o){"use strict";var a;o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return r})),o.d(e,"a",(function(){return a}));var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-uni-view",{staticClass:"container"},[t.type?o("v-uni-view",{staticClass:"topImg"},[o("img",{staticClass:"swiper_img",attrs:{src:t.Certificate,alt:""}}),o("v-uni-view",{staticClass:"name"},[t._v(t._s(t.CertificateName))])],1):o("v-uni-scroll-view",{staticClass:"articalD",attrs:{"scroll-x":"true"}},[o("v-uni-view",{staticClass:"title"},[t._v(t._s(t.detail.title))]),o("v-uni-view",{staticClass:"date"},[t._v("日期: "+t._s(t.detail.updateTime))]),o("v-uni-view",{staticClass:"from"},[t._v("来源: "+t._s(t.detail.addUser))]),o("v-uni-rich-text",{staticClass:"rich",attrs:{nodes:t.detail.context}})],1)],1)},r=[]},"77d4":function(t,e,o){"use strict";var a=o("28f0"),i=o.n(a);i.a},"7b03":function(t,e,o){"use strict";var a=o("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(o("1070")),r={onLoad:function(t){t.id?(this.type=!1,this.itemId=t.id,this.getDetail()):(this.type=!0,this.CertificateName=t.name,this.getCertificateImg())},data:function(){return{itemId:"",detail:"",type:"img",nodes:[{name:"p",attrs:{class:"p-class",style:"margin:10px 0;"}}],Certificate:"",CertificateName:""}},methods:{getDetail:function(){var t=this;this.$request.get(i.default.articalDetail,{id:this.itemId}).then((function(e){0==e.errno?t.detail=e.data.article:uni.showToast({title:"".concat(e.errmsg),icon:"none",duration:1500})}))},getCertificateImg:function(){this.Certificate=uni.getStorageSync("certificateImg")}}};e.default=r},"87a1":function(t,e,o){"use strict";o.r(e);var a=o("404c"),i=o("a6d6");for(var r in i)"default"!==r&&function(t){o.d(e,t,(function(){return i[t]}))}(r);o("77d4");var n,c=o("f0c5"),m=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,"2a2e9b04",null,!1,a["a"],n);e["default"]=m.exports},a6d6:function(t,e,o){"use strict";o.r(e);var a=o("7b03"),i=o.n(a);for(var r in a)"default"!==r&&function(t){o.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},b543:function(t,e,o){var a=o("24fb");e=a(!1),e.push([t.i,".title[data-v-2a2e9b04]{text-align:center;font-weight:700}.date[data-v-2a2e9b04],.from[data-v-2a2e9b04]{text-align:center;margin:10px 0}.rich[data-v-2a2e9b04]{margin-top:20px}.topImg[data-v-2a2e9b04]{\n\t/* height: 375px; */padding:5% 2%}.name[data-v-2a2e9b04]{text-align:center;margin-top:5%}.swiper_img[data-v-2a2e9b04]{width:100%;height:100%}[data-v-2a2e9b04] .articalD p{margin:10px 0}[data-v-2a2e9b04] .articalD img{width:100%}.articalD[data-v-2a2e9b04]{padding:%?20?%;width:96%}",""]),t.exports=e}}]);