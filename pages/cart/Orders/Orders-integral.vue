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
				<uni-icons type="forward" size="20" class="rightIcon"></uni-icons>
            </view>
            <view class="site-bottom">
                {{ checkedAddress.addressDetail }}
            </view>
        </view>
        <view class="site site-null" v-else>
            <text>请先添加收货地址</text>
            <text class="site-next"></text>
        </view>
    </view>

    <view class="content">
 
        <!-- 备注 -->
        <view class="remark">
            <text>订单备注 </text>
            <input v-model="Pay.message" maxlength="30" confirm-type="done" type="text" placeholder="请输入备注" />
        </view>
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
            <text>积分</text>
            <text>-{{ Pay.integration == 0 ? "0.00" : Pay.integration }}</text>
        </view>
    </view>
    <view class="commodity">
        <view class="commodity-list" v-for="(item, index) in checkedGoodsList" :key="index">
            <view class="">
                <image :src="item.picUrl" mode=""></image>
            </view>
            <view class="detail">
                <view class="">{{ item.goodsName }}</view>
                <view class=""><text>{{ item.brief }}</text></view>
                <view class="">积分：-{{ item.integration }}</view>
                <text>x1</text>
            </view>
        </view>
    </view>

    <!-- 结算台 -->
    <view class="desk">
        <view class="">
            <text>总计:￥{{ Pay.actualPrice }}</text>
            <button @click="payment" size="mini">提交订单</button>
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
                            <view>
                                <p>
                                    <span class="couponFont">{{ item.discount }}</span>元
                                </p>
                                <p>满{{ item.min }}使用</p>
                            </view>
                            <view>
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

            <button type="primary" @tap="close">不使用优惠券</button>
        </view>
    </popup-layer>
</view>
</template>

<script>
import api from '@/pages/api/api.js'
import uniIcons from "@/components/uni-icons/uni-icons.vue"
export default {
    data() {
        return {
            boolShow: false, // 弹出层
            checkedGoodsList: [], //下单商品数组
            checkedAddress: {}, //下单地址对象
            couponList: [], // 优惠券数组
            Pay: {
                cartId: 0,
                actualPrice: 0, //商品总价
                freightPrice: 0, //快递费
                integration: 0, //积分
                actualPrice: 0, //实际需要支付的总价
                message: "", //用户订单留言
                number: 1, //商品数量,
                addressId: 0, //地址id
                productId: 0, //商品货品表id
                integralGoodsId: 0, //| 积分商品id
            },
            buy: {
                addressId: 0,
                integralGoodsId: 0,
                productId: 0,
                number: 0
            },
        };
    },
    onLoad(option) {
        this.buy = JSON.parse(decodeURIComponent(option.buy));
    },
	components: {
		uniIcons
	},
    onReady() {
        uni.showLoading({
            title: "加载中",
        });
        // 获取优惠券
        // this.prop()
    },
    onShow() {
        try {
            const addressId = uni.getStorageSync("addressId");
            if (!addressId == "") {
                this.buy.addressId = addressId;
            }
            this.init();
        } catch (e) {
            console.log(e);
        }
        setTimeout(function () {
            uni.hideLoading();
        }, 1500);
    },
    // 退出本页面
    onUnload() {
        uni.removeStorageSync("addressId");
    },
    methods: {
        // 初始化获取购物车的值
        init: function () {
            this.$request.get(api.Integral, this.buy).then((res) => {
                if (res.errno == 0) {
                    console.log(res.data);
                    this.Pay = res.data;
                    this.checkedGoodsList = res.data.list;
                    this.checkedAddress = res.data.checkedAddress;
                }
            });
        },
        // 获取优惠券函数
        prop: function () {
            // console.log(CartId)
            // console.log(this.grouponRulesId)
            this.$request
                .get(api.couponList, {
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
        //点击支付
        payment: function () {
            this.$request
                .post(api.IntegralBuy, {
                    addressId: this.Pay.addressId,
                    integralGoodsId: this.Pay.integralGoodsId,
                    message: this.Pay.message,
                    productId: this.Pay.productId,
                    number: this.Pay.number,
                })
                .then((res) => {
                    console.log(res);
                    if (res.errno == 0) {
                        const orderId = res.data.orderId;
                        console.log(this.Pay.actualPrice);
                        if (this.Pay.actualPrice <= 0) {
                            uni.showLoading({
                                title: "购买成功",
                            });
                            setTimeout(function () {
                                uni.hideLoading();
                                uni.switchTab({
                                    url: "/pages/index/index",
                                });
                            }, 2000);
                        } else {
                            this.$request.post(api.prepaymentWx, {
                                    orderId: orderId
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
                                                uni.showLoading({
                                                    title: "购买成功",
                                                });
                                                setTimeout(function () {
                                                    uni.hideLoading();
                                                    uni.switchTab({
                                                        url: "/pages/order/order",
                                                    });
                                                }, 2000);
                                                // console.log('success:' + JSON.stringify(ress));
                                            },
                                            fail() {
                                                uni.showLoading({
                                                    title: "购买失败",
                                                });
                                                setTimeout(function () {
                                                    uni.hideLoading();
                                                    uni.switchTab({
                                                        url: "/pages/cart/cart",
                                                    });
                                                }, 2000);
                                            },
                                        });
                                    }
                                });
                        }
                    }
                });
        },
    },
    computed: {},
    watch: {},
};
</script>

<style scoped>
.rightIcon {
	float: right;
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

    width: 100vw;
    position: relative;
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

.popup-box button {
    position: fixed;
    bottom: 0;
    width: 100vw;
    border-radius: 50rpx;
}

.scroll-Y {
    height: 100%;
}

/* 优惠样式 */
.couponBox {
    width: 700rpx;
    height: 300rpx;
    margin: 20rpx auto;
    background: linear-gradient(to right, #b8860b, #daa520);
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
    padding: 10rpx;
    flex-grow: 1.5;
    background-color: rgba(0, 0, 0, 0.2);
}

.OneDetail {
    display: flex;
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

.coponTitle {
    display: inline-block;
    font-size: 30rpx;
    padding: 0 20rpx;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 5rpx;
}
</style>
