<template>
<view class="container">
    <view class="top_content" v-if="orderInfo">
        <view class="top_info" v-for="(item, index) in orderGoods" :key="item.id">
            <view class="top_left">
                <img :src="item.picUrl" alt="" />
            </view>
            <view class="top_right">
                <view class="right_top">
                    {{ item.goodsName }}
                </view>
                <view class="right_middle">
                    <span>暂无描述</span>
                </view>
                <view class="right_bottom">
                    <span class="price">¥{{ Number(item.price).toFixed(2) }}</span>
                    <span class="num">× {{ item.number }}</span>
                </view>
            </view>
            <view class="click_wPan" v-if="item.uloveAccessory && index == 0 && showBtn">
                <view class="click_pan_url">
                    <span class="click_left_title">网盘链接:</span>
                    <button size="mini" @click="showPan(orderInfo.id)" class="show_btn" type="primary">
                        查看
                    </button>
                </view>
            </view>
            <view class="wPan" v-if="item.uloveAccessory && !showBtn">
                <view class="pan_url">
                    <span class="left_title">网盘链接:</span>
                    <span class="right_text" @click="copy(item.uloveAccessory.accessoryLink)">{{ item.uloveAccessory.accessoryLink }}</span>
                </view>
                <view class="pan_code">
                    <span class="left_title">提取码:</span>
                    <span class="right_text" @click="copy(item.uloveAccessory.accessoryCode)">{{ item.uloveAccessory.accessoryCode }}</span>
                </view>
            </view>
        </view>
        <view class="top_price">
            <view class="good_price">
                <span class="left">商品金额</span>
                <span class="right">¥{{ Number(orderInfo.goodsPrice).toFixed(2) }}</span>
            </view>
            <view class="fast_price">
                <span class="left">快递费用</span>
                <span class="right">¥{{ Number(orderInfo.freightPrice).toFixed(2) }}</span>
            </view>
        </view>
    </view>
    <view class="middle_content">
        <view class="user_msg">
            {{ orderInfo.consignee }} {{ orderInfo.mobile }}
        </view>
        <view class="user_address">
            {{ orderInfo.address }}
        </view>
    </view>
    <view class="bottom_list">
        <ul>
            <li>
                <span class="li_left">下单时间:</span>
                <span class="li_right">{{ orderInfo.addTime }}</span>
            </li>
            <li>
                <span class="li_left">订单编号:</span>
                <span class="li_right">{{ orderInfo.orderSn }}</span>
            </li>
            <li>
                <span class="li_left">订单备注:</span>
                <span class="li_right">{{ orderInfo.remark }}</span>
            </li>
            <li>
                <span class="li_left">实付款：</span>
                <span class="li_right li_color">¥{{ Number(orderInfo.actualPrice).toFixed(2) }}</span>
            </li>
        </ul>
    </view>
    <view class="list_btn">
        <button v-if="handleOption.cancel" type="default" plain="true" size="mini" class="cancel_btn color_btn" @click.stop="showDialog(orderInfo.id, 1)">
            取消订单
        </button>
        <button v-if="handleOption.pay" type="default" plain="true" size="mini" class="pay_btn color_btn" @click.stop="pay(orderInfo.id)">
            去支付
        </button>
        <button v-if="handleOption.delete" type="default" plain="true" size="mini" class="evaluate_btn color_btn" @click.stop="showDialog(orderInfo.id, 2)">
            删除订单
        </button>
        <button v-if="handleOption.confirm" type="default" plain="true" size="mini" class="confirm_btn color_btn" @click.stop="showDialog(orderInfo.id, 3)">
            确认收货
        </button>
        <button v-if="handleOption.refund" type="default" plain="true" size="mini" class="refund_btn color_btn" @click.stop="showDialog(orderInfo.id, 4)">
            退款
        </button>
    </view>
    <view>
        <uni-popup ref="popup" type="center">
            <uni-popup-dialog type="warn" :content="dialogContent" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
        </uni-popup>
    </view>
</view>
</template>

<script>
import api from '@/pages/api/api.js'
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import uniPopupMessage from "@/components/uni-popup/uni-popup-message.vue";
import uniPopupDialog from "@/components/uni-popup/uni-popup-dialog.vue";
export default {
    onLoad: function (e) {
        console.log(e);
        this.orderId = e.id;
        this.init();
    },
    components: {
        uniPopup,
        uniPopupDialog,
        uniPopupMessage
    },
    data() {
        return {
            isSubmit: false,
            isDisabled: false,
            orderInfo: {},
            orderGoods: [],
            handleOption: {},
            expressInfo: {},
            orderId: "",
            dialogContent: "",
            chooseType: "",
            chooseID: "",
            showBtn: true,
        };
    },
    methods: {
        init() {
            this.$request
                .get(api.orderDetail, {
                    orderId: this.orderId
                })
                .then((res) => {
                    if (res.errno == 0) {
                        var data = res.data;
                        this.orderInfo = data.orderInfo;
                        this.orderGoods = data.orderGoods;
                        this.handleOption = data.orderInfo.handleOption;
                        this.expressInfo = data.expressInfo;
                        if (data.orderInfo.orderStatusText == "已付款已查看") {
                            this.showBtn = false;
                        } else {
                            this.showBtn = true;
                        }
                    } else {
                        uni.showToast({
                            title: `${res.errmsg}`,
                            icon: "none",
                            duration: 1500,
                        });
                    }
                });
        },
        showDialog(id, type) {
            console.log(id);
            this.chooseID = id;
            this.chooseType = type;
            if (type == 1) {
                this.dialogContent = "确定取消该订单吗？";
            } else if (type == 4) {
                this.dialogContent = "确定要申请退款吗？";
            } else if (type == 3) {
                this.dialogContent = "请确认收到货物, 确认收货后无法撤销!";
            } else if (type == 2) {
                this.dialogContent = "确定删除该订单吗？";
            }
            this.$refs.popup.open();
        },
        close(done) {
            console.log(done);
            this.$refs.popup.close();
        },
        confirm(done, value) {
            if (this.chooseType == 1) {
                this.$request
                    .post(api.orderCancel, {
                        orderId: this.chooseID
                    })
                    .then(() => {
                        this.init();
                        this.$refs.popup.close();
                        uni.showToast({
                            title: "已取消该订单",
                            icon: "none",
                            duration: 1500,
                        });
                        setTimeout(function () {
                            uni.redirectTo({
                                url: "/pages/order/order",
                            });
                        }, 1500);
                    });
            } else if (this.chooseType == 4) {
                this.$request
                    .post(api.orderRefund, {
                        orderId: this.chooseID
                    })
                    .then(() => {
                        this.init();
                        this.$refs.popup.close();
                        uni.showToast({
                            title: "已申请订单退款",
                            icon: "none",
                            duration: 1500,
                        });
                        setTimeout(function () {
                            uni.redirectTo({
                                url: "/pages/order/order",
                            });
                        }, 1500);
                    });
            } else if (this.chooseType == 3) {
                this.$request
                    .post(api.orderConfirm, {
                        orderId: this.chooseID
                    })
                    .then(() => {
                        this.init();
                        this.$refs.popup.close();
                        uni.showToast({
                            title: "已确认收货",
                            icon: "none",
                            duration: 1500,
                        });
                        setTimeout(function () {
                            uni.redirectTo({
                                url: "/pages/order/order?type=0",
                            });
                        }, 1500);
                    });
            } else if (this.chooseType == 2) {
                this.$request
                    .post(api.orderDelete, {
                        orderId: this.chooseID
                    })
                    .then(() => {
                        this.$refs.popup.close();
                        uni.showToast({
                            title: "已删除订单",
                            icon: "none",
                            duration: 1500,
                        });
                        setTimeout(function () {
                            uni.redirectTo({
                                url: "/pages/order/order?type=0",
                            });
                        }, 1500);
                    });
            } else if (this.chooseType == 5) {
                this.$request
                    .get(api.orderShowLink, {
                        orderId: this.chooseID
                    })
                    .then((res) => {
                        this.$refs.popup.close();
                        if (res.errno == 0) {
                            uni.showToast({
                                title: "操作成功",
                                icon: "none",
                                duration: 1500,
                            });
                            this.init();
                        } else {
                            uni.showToast({
                                title: `${res.errmsg}`,
                                icon: "none",
                                duration: 1500,
                            });
                        }
                    });
            }
        },
        pay(id) {
            this.chooseID = id;
            // #ifdef APP-PLUS
            this.paymentApp();
            // #endif
            // #ifdef MP-WEIXIN
            this.paymentWx();
            // #endif
			// #ifdef H5
			this.paymentH5();
			// #endif
        },
        //点击支付
        paymentApp: function () {
            let _that = this;
            uni.showLoading({
                title: "请稍后",
            });
            this.$request
                .post(api.prepaymentApp, {
                    orderId: _that.chooseID,
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
                        uni.requestPayment({
                            provider: "wxpay",
                            orderInfo: orderInfo,
                            success(res) {
                                uni.showToast({
                                    title: "付款成功",
                                    duration: 1500,
                                });
                                setTimeout(function () {
                                    uni.hideLoading();
                                    uni.redirectTo({
                                        url: "/pages/order/order?type=0",
                                    });
                                }, 2000);
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
        },
        paymentWx: function () {
            let _that = this;
            uni.showLoading({
                title: "请稍后",
            });
            this.$request
                .post(api.prepaymentWx, {
                    orderId: _that.chooseID,
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
                                    uni.redirectTo({
                                        url: "/pages/order/order",
                                    });
                                }, 1500);
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
                                        url: "/pages/order/order",
                                    });
                                }, 1500);
                            },
                        });
                    } else {
                        uni.showToast({
                            icon: "none",
                            title: `${res.errmsg}`,
                            duration: 1500,
                        });
                    }
                });
        },
        paymentH5:function(){
        	let _that = this;
        	uni.showLoading({
        	    title: "请稍后",
        	});
        	this.$request.post(api.prepaymentH5,{orderId: _that.chooseID}).then((res)=>{
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
        },
		copy(value) {
            uni.setClipboardData({
                data: value,
                success: function () {
                    uni.showToast({
                        //提示
                        title: "复制成功",
                    });
                },
            });
        },
        showPan(id) { 
            this.chooseID = id;
            this.chooseType = 5;
            this.dialogContent = "查看后将无法退款,是否继续?";
            console.log(this.chooseID);
            this.$refs.popup.open();
        },
        close(done) {
            console.log(done);
            this.$refs.popup.close();
        },
    },
};
</script>

<style scoped>
.container {
    background-color: #f2f2f2;
    min-height: calc(100vh - 40px);
}

.top_content {}

.top_info,
.top_price {
    background-color: #fff;
    padding: 10px 15px 0 15px;
}

.top_info {
    margin-bottom: 8px;
    padding-bottom: 10px;
}

.top_left,
.top_right {
    display: inline-block;
}

.top_left img {
    width: 88px;
    height: 88px;
}

.top_right {
    height: 90px;
    vertical-align: top;
    position: relative;
}

.top_right {
    width: calc(100% - 93px);
    margin-left: 5px;
}

.right_top,
.right_middle,
.right_bottom {
    font-size: 14px;
}

.right_bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
}

.right_bottom .num {
    float: right;
    color: #969799;
}

.wPan,
.click_wPan {
    margin-top: 10px;
}

.pan_url,
.pan_code,
.click_pan_url {
    font-size: 14px;
}

.pan_url {
    margin-bottom: 5px;
}

.left_title,
.click_left_title {
    width: 20%;
    display: inline-block;
}

.pan_url .left_title {
    min-height: 40px;
}

.right_text {
    width: 75%;
    margin-left: 3%;
    float: right;
    word-break: break-all;
}

.click_pan_url {
    height: 30px;
    line-height: 30px;
}

.show_btn {
    float: right;
}

.good_price,
.fast_price {
    font-size: 14px;
    height: 40px;
    line-height: 40px;
}

.good_price {
    border-bottom: 1px solid #ebedf0;
}

.good_price .right,
.fast_price .right {
    float: right;
    color: #ff1497;
}

.middle_content {
    background-color: #fff;
    margin-top: 15px;
    padding: 10px 20px;
}

.user_msg {
    font-size: 14px;
}

.user_address {
    font-size: 12px;
    color: #969799;
    margin-top: 5px;
}

.bottom_list {
    background-color: #fff;
    padding: 10px 15px;
    margin-top: 15px;
}

.bottom_list ul {
    padding: 0;
}

.bottom_list ul li {
    list-style: none;
    padding: 10px 0;
    font-size: 14px;
    border-bottom: 1px solid #ebedf0;
}

.li_left,
.li_right {
    width: 50%;
    display: inline-block;
    vertical-align: top;
}

.li_right {
    text-align: right;
    word-break: break-all;
}

.li_color {
    color: #ff1497;
}

.list_btn {
    text-align: right;
    padding: 0 10px;
    background-color: #fff;
    margin-bottom: 20px;
}

.list_btn uni-button {
    margin-left: 10px;
}

.color_btn {
    border-color: #ff1497 !important;
    background-color: #ff1497 !important;
    color: #fff !important;
}
</style>
