<template>
<view class="Orders-room">
    <!-- 地址条 -->
    <view class="addres-box"></view>
    <!-- 地址 -->
    <view class="head_box" @click="Address">
        <view class="site" v-if="checkedAddress.name">
            <view class="site-top">
                <text class="site-name">{{ checkedAddress.name }}</text>
                <text class="site-tel">{{ checkedAddress.tel }}</text>
                <text class="iconfont">&#xe658;</text>
            </view>
            <view class="site-bottom">
                {{ checkedAddress.addressDetail }}
            </view>
        </view>
        <view class="site site-null" v-else>
            <text>您还没有收货地址，去添加</text>
            <image src="../../../static/images/address_right.png" class="rightimg" mode=""></image>
            <text class="site-next"></text>
        </view>
    </view>

    <view class="content">
        <!-- 优惠券弹出层 -->
        <view class="discounts" @tap="show">
            <text>优惠券</text>
            <text>
                <text class="scroll" v-if="couponList.length == 0">没有可用优惠券</text>
                <text class="scroll" v-else>有{{ couponList.length }}张优惠券</text>
                <text class="iconfont">&#xe658;</text>
            </text>
        </view>
        <!-- 会员积分 -->
        <view class="remark">
            <text>使用{{ Pay.integralPrice }}积分兑换</text>
            <evan-switch v-model="checked"></evan-switch>
        </view>
        <!-- 备注 -->
        <view class="remark">
            <text>订单备注 </text>
            <input v-model="Pay.message" maxlength="30" confirm-type="done" type="text" placeholder="请输入备注" />
        </view>
        <!-- 		<view>

{{test}}

</view> -->
        <!-- 商品合计 -->
        <view>
            <text>商品合计</text>
            <text>￥{{ Pay.actualPrice == 0 ? "0.00" : Pay.actualPrice }}</text>
        </view>
        <!-- 运费 -->
        <view>
            <text>运费</text>
            <text>￥{{ Pay.freightPrice == 0 ? "0.00" : Pay.freightPrice }}</text>
        </view>
        <!-- 优惠券 -->
        <view>
            <text>优惠券</text>
            <text>￥{{ Pay.couponPrice == 0 ? "0.00" : Pay.couponPrice }}</text>
        </view>
    </view>
    <view class="commodity">
        <view class="commodity-list" v-for="(item, index) in checkedGoodsList" :key="index">
            <view class="">
                <image :src="item.picUrl" mode=""></image>
            </view>
            <view class="detail">
                <view class="">{{ item.goodsName }}</view>
                <view class=""><text>{{ item.specifications[0] }}</text></view>
                <view class="">￥{{ item.price }}</view>
                <text>x{{ item.number }}</text>
            </view>
        </view>
    </view>
    <!-- 		<view>

{{list}}

</view> -->

    <!-- 结算台 -->
    <view class="desk">
        <view class="">
            <text>总计:￥{{ Pay.actualPrice }}</text>
            <!-- <button @click="payment" size="mini">提交订单</button> -->
            <button @click="payOrder" size="mini">去付款</button>
        </view>
    </view>

    <!-- 弹出层组件 -->
    <popup-layer ref="popupRef" :direction="'top'">
        <view class="popup-box">
            <scroll-view scroll-y="true" class="scroll-Y">
                <view class="couponBox" v-for="(item, index) in couponList" :key="index" @click="coupon(item)">
                    <view class="coponOne">
                        <p class="coponTitle">{{ item.tag }}</p>
                        <view class="OneDetail">
                            <view class="right_view_one">
                                <p> <span class="couponFont">{{ item.discount }}</span>元</p>
                                <p>满{{ item.min }}使用</p>
                            </view>
                            <view class="right_view_two">
                                <h4>{{ item.name }}</h4>
                                <p>限时{{ item.endTime }}</p>
                            </view>
                        </view>
                    </view>
                    <view class="coponTwo">
                        <p>{{ item.desc }}</p>
                    </view>
                </view>
            </scroll-view>

            <view class="btm_btn">
                <button type="primary" @tap="close">不使用优惠券</button>
            </view>
        </view>
    </popup-layer>
</view>
</template>
<script>
import api from '@/pages/api/api.js'
import EvanSwitch from "@/components/evan-switch/evan-switch.vue";
export default {
    data() {
        return {
            checked: false, //会员积分开关
            boolShow: false, // 弹出层
            checkedGoodsList: [], //下单商品数组
            checkedAddress: {}, //下单地址对象
            couponList: [], // 优惠券数组
            Pay: {
                cartId: 0,
                addressId: 0,
                couponId: 0,
                userCouponId: 0,
                goodsTotalPrice: 0, //商品总价
                freightPrice: 0, //快递费
                couponPrice: 0, //优惠券的价格
                actualPrice: 0, //实际需要支付的总价
                grouponRulesId: 0, //获取优惠券函数的参数
                message: "", //用户订单留言
                grouponLinkId: 0, //参与的团购
                integralId: null, //会员积分
            },
            buy: {
                addressId: 0,
                cartId: 0,
                couponId: 0,
                userCouponId: 0,
                grouponRulesId: 0,
                grouponLinkId: 0,
                memberGoodsId: 0,
                integralId: 0,
            },
            ifApp: "",
            list: "",
            grouponLinkId: 0,
            test: "",
        };
    },
    onLoad(option) {
        this.ifApp = uni.getStorageSync("avatarUrl");
        // console.log(this.ifApp);
    },
    onReady() {
        uni.showLoading({
            title: "加载中",
        });
        //this.init()//初始化购物车
		this.prop(); // 获取优惠券
    },
    onShow() {
        try {
            const cartId = uni.getStorageSync("cartId");
            if (!cartId == "") {
                this.buy.cartId = cartId;
            }
            const addressId = uni.getStorageSync("addressId");
            if (!addressId == "") {
                this.buy.addressId = addressId;
            }
            const couponId = uni.getStorageSync("couponId");
            if (!couponId == "") {
                this.buy.couponId = couponId;
            }
            const userCouponId = uni.getStorageSync("userCouponId");
            if (!userCouponId == "") {
                this.buy.userCouponId = userCouponId;
            }
            const grouponRulesId = uni.getStorageSync("grouponRulesId");
            if (!grouponRulesId == "") {
                this.buy.grouponRulesId = grouponRulesId;
            }
            const memberGoodsId = uni.getStorageSync("memberGoodsId");
            if (!memberGoodsId == "") {
                this.buy.memberGoodsId = memberGoodsId;
            }
            const grouponLinkId = uni.getStorageSync("grouponLinkId");
            if (!grouponLinkId == "") {
                this.grouponLinkId = grouponLinkId;
            }
            this.test = this.grouponLinkId;
            if (this.buy.grouponRulesId) {
                this.initGroup();
            } else {
                this.init();
            }
        } catch (e) {
            console.log(e);
        }
        setTimeout(function () {
            uni.hideLoading();
        }, 1500);  
    },
    // 退出本页面
    onUnload() {
        uni.removeStorageSync("cartId");
        uni.removeStorageSync("addressId");
        uni.removeStorageSync("memberGoodsId");
        uni.removeStorageSync("grouponRulesId");
        uni.removeStorageSync("grouponLinkId");
    },
	
    methods: {
        // 初始化获取购物车商品的数据
        init: function () {
            this.$request.get(api.cartx, this.buy).then((res) => {
                if (res.errno == 0) {
                    console.log(res.data);
                    this.Pay = res.data;
                    this.checkedGoodsList = res.data.checkedGoodsList;
                    this.checkedAddress = res.data.checkedAddress;
                } else {
                    uni.showToast({
                        icon: "none",
                        title: `${res.errmsg}`,
                        duration: 1500,
                    });
                }
            });
        },
        // 初始化获取团购购物车的值
        initGroup() {
            this.$request.get(api.groupon, this.buy).then((res) => {
                if (res.errno == 0) {
                    console.log(res.data);
                    this.Pay = res.data;
                    this.checkedGoodsList = res.data.checkedGoodsList;
                    this.checkedAddress = res.data.checkedAddress;
                } else {
                    uni.showToast({
                        icon: "none",
                        title: `${res.errmsg}`,
                        duration: 1500,
                    });
                }
            });
        },
        // 获取优惠券函数
        prop: function () {
            this.$request.get(api.couponList, {
                    cartId: this.buy.couponId,
                    grouponRulesId: this.Pay.grouponRulesId,
                })
                .then((res) => {
                    // console.log(res)
                    if (res.errno == 0) {
                        for (var i = 0; i < res.data.list.length; i++) {
                            if (res.data.list[i].available) {
                                this.couponList.push(res.data.list[i]);
								
                            }
                        }
                    }
                });
        },
        //点击地址
        Address: function () {
            // console.log("点击地址")
            uni.navigateTo({
                url: "/pages/address/address",
            });
        },
        // 优惠券点击事件
        coupon: function (e) {
            // console.log(e)
            // 优惠券限额 必须小于商品总价
            if (e.min <= this.Pay.goodsTotalPrice) {
                this.buy.couponId = e.cid;
                this.buy.UserCouponId = e.id;
                this.init();
            }else{
				uni.showToast({
					icon:'none',
				    title: '金额不适用',
				    duration: 500
				});
			}
            this.$refs.popupRef.close();
        },
        // 不使用优惠券
        close() {
            this.buy.couponId = -1;
            this.init();
            this.$refs.popupRef.close(); // 或者 boolShow = false
        },
        //点击遮罩层
        show() {
            this.$refs.popupRef.show(); // 或者 boolShow = rue
        },
        //各端支付函数
        paymentApp: function () {
            let _that = this;
            uni.showLoading({
                title: "请稍后",
            });
			if (!this.Pay.addressId) {
				uni.showToast({
				    icon: "none",
				    title: '请选择收获地址',
				    duration: 1000,
				});
				uni.hideLoading();
				return
			}
            this.$request
                .post(api.buy, {
                    cartId: this.Pay.cartId,
                    addressId: this.Pay.addressId,
                    couponId: this.Pay.couponId,
                    message: this.Pay.message,
                    grouponRulesId: this.Pay.grouponRulesId,
                    grouponLinkId: this.Pay.grouponLinkId,
                    userCouponId: this.Pay.userCouponId,
                    memberGoodsId: this.Pay.memberGoodsId,
                    integralId: this.Pay.integralId,
                })
                .then((res) => {
                    console.log(res);
                    if (res.errno == 0) {
                        const orderId = res.data.orderId;
                        const grouponLinkId = res.data.grouponLinkId;
                        this.$request
                            .post(api.prepaymentApp, {
                                orderId: orderId,
                            })
                            .then((res) => {
                                console.log(res);
                                if (res.errno == 0) {
                                    let orderInfo = {
                                        appid: res.data.appId,
                                        noncestr: res.data.nonceStr,
                                        package: res.data.packageValue,
                                        partnerid: res.data.partnerId,
                                        prepayid: res.data.prepayId,
                                        timestamp: res.data.timeStamp,
                                        sign: res.data.sign,
                                    };
                                    // _that.list = JSON.stringify( orderInfo)
                                    uni.requestPayment({
                                        provider: "wxpay",
                                        orderInfo: orderInfo,
                                        success(res) {
                                            uni.showToast({
                                                title: "付款成功",
                                                duration: 1500,
                                            });
                                            const grouponRulesId = uni.getStorageSync(
                                                "grouponRulesId"
                                            );
                                            setTimeout(function () {
                                                uni.hideLoading();
                                                if (_that.buy.grouponRulesId || _that.grouponLinkId) {
                                                    uni.redirectTo({
                                                        // url: '/pages/index/index'
                                                        url: "/pages/userGroupon/userGroupon",
                                                    });
                                                } else {
                                                    uni.redirectTo({
                                                        // url: '/pages/index/index'
                                                        url: "/pages/order/order?type=0",
                                                    });
                                                }
                                            }, 2000);
                                            // console.log('success:' + JSON.stringify(ress));
                                        },
                                        fail(res) {
                                            // _that.list = res
                                            uni.showToast({
                                                icon: "none",
                                                title: "付款失败",
                                                duration: 1500,
                                            });
                                            setTimeout(function () {
                                                uni.hideLoading();
                                                uni.redirectTo({
                                                    url: "/pages/order/order?type=0",
                                                });
                                            }, 2000);
                                            // console.log('fail:' + JSON.stringify(err));
                                        },
                                    });
                                } else {
                                    uni.showToast({
                                        icon: "none",
                                        title: `${res.errmsg}`,
                                        duration: 1000,
                                    });
                                }
                            });
                    } else {
                        uni.showToast({
                            icon: "none",
                            title: `${res.errmsg}`,
                            duration: 1000,
                        });
                    }
                });
        },
        paymentWx: function () {
            let _that = this;
            uni.showLoading({
                title: "请稍后",
            });
			if (!this.Pay.addressId) {
				uni.showToast({
				    icon: "none",
				    title: '请选择收获地址',
				    duration: 1000,
				});
				uni.hideLoading();
				return
			}
            this.$request
                .post(api.buy, {
                    cartId: this.Pay.cartId,
                    addressId: this.Pay.addressId,
                    couponId: this.Pay.couponId,
                    message: this.Pay.message,
                    grouponRulesId: this.Pay.grouponRulesId,
                    grouponLinkId: this.Pay.grouponLinkId,
                    userCouponId: this.Pay.userCouponId,
                    memberGoodsId: this.Pay.memberGoodsId,
                    integralId: this.Pay.integralId,
                })
                .then((res) => {
                    console.log(res);
                    if (res.errno == 0) {
                        const orderId = res.data.orderId;
                        const grouponLinkId = res.data.grouponLinkId;
                        this.$request
                            .post(api.prepaymentWx, {
                                orderId: orderId,
                            })
                            .then((res) => {
                                console.log(res);
                                if (res.errno == 0) {
                                    uni.requestPayment({
                                        provider: "wxpay",
                                        timeStamp: res.data.timeStamp,
                                        nonceStr: res.data.nonceStr,
                                        package: res.data.packageValue,
                                        signType: res.data.signType,
                                        paySign: res.data.paySign,
                                        success(ress) {
                                            uni.showToast({
                                                title: "付款成功",
                                                duration: 1500,
                                            });
                                            setTimeout(function () {
                                                uni.hideLoading();
                                                if (_that.buy.grouponRulesId || _that.grouponLinkId) {
                                                    uni.redirectTo({
                                                        // url: '/pages/index/index'
                                                        url: "/pages/userGroupon/userGroupon",
                                                    });
                                                } else {
                                                    uni.redirectTo({
                                                        // url: '/pages/index/index'
                                                        url: "/pages/order/order?type=0",
                                                    });
                                                }
                                            }, 2000);
                                            // console.log('success:' + JSON.stringify(ress));
                                        },
                                        fail() {
                                            uni.showToast({
                                                icon: "none",
                                                title: "付款失败",
                                                duration: 1500,
                                            });
                                            setTimeout(function () {
                                                uni.hideLoading();
                                                uni.redirectTo({
                                                    url: "/pages/order/order?type=0",
                                                });
                                            }, 2000);
                                            // console.log('fail:' + JSON.stringify(err));
                                        },
                                    });
                                } else {
                                    uni.showToast({
                                        icon: "none",
                                        title: `${res.errmsg}`,
                                        duration: 1000,
                                    });
                                }
                            });
                    } else {
                        uni.showToast({
                            icon: "none",
                            title: `${res.errmsg}`,
                            duration: 1000,
                        });
                    }
                });
        },
		paymentH5:function(){
			let _that = this;
			uni.showLoading({
			    title: "请稍后",
			});
			if (!this.Pay.addressId) {
				uni.showToast({
				    icon: "none",
				    title: '请选择收获地址',
				    duration: 1000,
				});
				uni.hideLoading();
				return
			}
			this.$request.post(api.buy,{
				cartId: this.Pay.cartId,
				addressId: this.Pay.addressId,
				couponId: this.Pay.couponId,
				message: this.Pay.message,
				grouponRulesId: this.Pay.grouponRulesId,
				grouponLinkId: this.Pay.grouponLinkId,
				userCouponId: this.Pay.userCouponId,
				memberGoodsId: this.Pay.memberGoodsId,
				integralId: this.Pay.integralId,
			}).then((res)=>{
				console.log(res)
				if (res.errno == 0){
					const orderId = res.data.orderId;
					const grouponLinkId = res.data.grouponLinkId;
					this.$request.post(api.prepaymentH5,{orderId: orderId}).then((res)=>{
						//console.log(res);
						if (res.errno == 0) {
							//console.log(res.data.result.mwebUrl) // 微信外部url链接
							if(res.data.result.mwebUrl.includes('https://')||res.data.result.mwebUrl.includes('http://')){
								location.href = res.data.result.mwebUrl
							}else{
								location.href = `https://${res.data.result.mwebUrl}`
							}
						} else {
						    uni.showToast({
						        icon: "none",
						        title: `${res.errmsg}`,
						        duration: 1000,  
						    });
						}
					})
				}
				
				
			})
		},
        payOrder() {
			// #ifdef H5
			this.paymentH5();
			// #endif
            // #ifdef APP-PLUS
            this.paymentApp();
            // #endif
            // #ifdef MP-WEIXIN
            this.paymentWx();
            // #endif
        },
    },
    components: {
        EvanSwitch,
    },
    watch: {
        checked: function (newQuestion, oldQuestion) {
            // console.log(newQuestion)
            if (newQuestion == true) {
                uni.showToast({
                    icon: "none",
                    title: "积分使用规则：优先使用全部积分抵用，最多将价格减到0.01元",
                    duration: 2000,
                });
                this.buy.integralId = 1;
                this.init();
            } else {
                this.buy.integralId = 0;
                this.init();
            }
        },
    },
};
</script>

<style scoped>
/*导入阿里巴巴字体图标*/
@font-face {
    font-family: "iconfont";
    src: url("~@/static/img/font_icon/iconfont.ttf") format("truetype");
}

/*设置字体图标*/
.iconfont {
    font-family: "iconfont" !important;
    font-size: 1em;
    font-style: normal;
}

.Orders-room {
    background-color: #f2f2f2;
    /* height: 100vh; */
}

.addres-box {
    height: 4px;
    background: url("http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-bd30f2bfeb.png") 0 0 repeat-x;
}

/* 地址 */
.head_box {
    padding: 10px 16px;
    height: 150rpx;
    background-color: #ffffff;
}

.site {}

.site .site-top {
    font-size: 35rpx;
}

.site-top text:nth-of-type(1) {
    display: inline-block;
    width: 160rpx;
    height: 75rpx;
    white-space: normal;
}

.site-top text:nth-of-type(2) {
    margin-left: 30rpx;
}

.site-top text:nth-of-type(3) {
    float: right;
    font-size: 38rpx;
}

.site .site-bottom {
    font-size: 30rpx;
}

/* 收货地址为空 */
.site-null {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.site-null .site-next {}

/* 订单详情样式*/
.content {
    background-color: #ffffff;
    padding: 0px 16px;
}

.content .discounts {
    margin-top: 20rpx;
}

.content>view {
    line-height: 80rpx;
    height: 80rpx;
    display: flex;
    justify-content: space-between;
    border-bottom: 1rpx solid #eeeeee;
    font-size: 30rpx;
}

.content>view>text:nth-of-type(2) {
    color: #ff1497;
}

.remark {
    display: flex;
    align-items: center;
}

.remark input {
    width: 500rpx;
}

.discounts .scroll {
    color: #969799;
    margin-right: 30rpx;
}

/* 商品列表 */
.commodity {
    padding: 0 16px;
    background-color: #ffffff;
    margin-bottom: 100rpx;
}

.commodity-list {
    height: 200rpx;
    display: flex;
    align-items: center;
}

.commodity-list>view {
    height: 150rpx;
}

.commodity-list>view:nth-child(2) {
    margin-left: 20rpx;

    /* width: 100vw; */
    position: relative;
}

.rightimg {
    width: 30px;
    height: 30px;
}

.commodity-list image {
    width: 150rpx;
    height: 150rpx;
    /* display: block; */
    border-radius: 20rpx;
}

.detail {
    font-size: 30rpx;
}

.detail>view:nth-of-type(2)>text {
    display: inline-block;
    width: 500rpx;
    font-size: 20rpx;
    padding: 2rpx;
    /* border: 1px solid #969799; */
    color: #969799;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.detail>view:nth-of-type(3) {
    position: absolute;
    bottom: 0;
    left: 0;
}

.detail>text {
    position: absolute;
    right: 0;
    bottom: 0;
}

/* 结算台 */
.desk {
    background-color: #ffffff;
    width: 100%;
    height: 100rpx;
    /* padding: 0 16px; */
    position: fixed;
    bottom: 0;
    left: 0;
}

.desk>view {
    box-sizing: border-box;

    height: 100%;
    width: 95%;
    margin: 0 auto;

    text-align: right;
}

.desk text {
    position: relative;
    bottom: 8rpx;
    margin-right: 20rpx;
}

.desk button {
    position: relative;
    top: 12rpx;
    border-radius: 50rpx;
    padding: 10rpx 50rpx;
    color: #ffffff;
    background-color: #ff1497;
}

/* 弹出层 */
.popup-box {
    height: 90vh;
}

.btm_btn {
    position: fixed;
    bottom: 10px;
    width: 100vw;
    text-align: center;
}

.popup-box button {
    /* 		position: fixed;

bottom: 0;

width: 100vw;

border-radius: 50rpx; */
    border-radius: 50rpx;
    width: 90%;
    height: 6vh;
    line-height: 6vh;
}

.scroll-Y {
    height: 100%;
}

/* 优惠样式 */
.couponBox {
    width: 700rpx;
    height: 300rpx;
    margin: 20rpx auto;
    /* background: linear-gradient(to right, #B8860B, #DAA520); */
    background: linear-gradient(to right, #ff1493, #ffe3f2);
    border-radius: 10rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #ffffff;
}

.couponBox:last-child {
    margin-bottom: 50px;
}

.coponOne {
    padding: 10rpx;
    flex-grow: 8;
    width: 100%;
}

.coponTwo {
    padding: 10rpx 20rpx;
    flex-grow: 1.5;
    background-color: rgba(0, 0, 0, 0.2);
}

.coponTwo p {
    font-size: 14px;
}

.OneDetail {
    display: flex;
    margin-top: 20rpx;
}

.OneDetail view:nth-of-type(1) {
    flex-grow: 3;
    text-align: center;
}

.OneDetail view:nth-of-type(1)>p:nth-of-type(1) {
    font-size: 50rpx;
}

.couponFont {
    color: #b22222;
    margin-right: 10rpx;
}

.OneDetail view:nth-of-type(2) {
    flex-grow: 7;
}

.right_view_one p:nth-child(1) {
    height: 60rpx;
    line-height: 60rpx;
}

.right_view_one p:nth-child(2) {
    height: 50rpx;
    line-height: 50rpx;
}

.right_view_two {
    margin-left: 30rpx;
}

.right_view_two h4 {
    height: 60rpx;
    line-height: 60rpx;
}

.right_view_two p:nth-child(2) {
    height: 50rpx;
    line-height: 50rpx;
    font-size: 16px;
}

.coponTitle {
    display: inline-block;
    font-size: 30rpx;
    padding: 0 20rpx;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 5rpx;
}
</style>
