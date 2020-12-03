<template>
<view class="container">
    <view class="top_flex">
        <span class="nav_span" v-for="(list, index) in navList" :key="index" :class="[tagChoose == index ? 'chooseTag' : '']" @click="changeTag(index)">{{ list }}</span>
    </view>
    <view class="bottom_content" v-for="(el, i) in orderList" :key="i" @click="toDetail(el.id)">
        <view class="content_top">
            <view class="top_left">
                <span>订单编号:</span>
                <span class="order_num">{{ el.orderSn }}</span>
            </view>
            <view class="top_right">
                {{ el.orderStatusText }}
            </view>
        </view>
        <view class="content_middle" v-for="(goods, goodsI) in el.goodsList" :key="goodsI">
            <view class="middle_left">
                <img :src="goods.picUrl" alt="" />
            </view>
            <view class="middle_right">
                <view class="right_top">
                    {{ goods.goodsName }}
                </view>
                <view class="right_middle">
                    <span v-for="(spec, index) in goods.specifications" :key="index">{{   spec    }}</span>
                </view>
                <view class="right_bottom"> ×{{ goods.number }} </view>
            </view>
        </view>
        <view class="content_bottom">
            合计: ¥{{ el.actualPrice.toFixed(2) }} (含运费
            <span v-if="el.post_fee">{{ el.post_fee.toFixed(2) }}</span> )
        </view>
        <view class="btn_list">
            <button v-if="el.handleOption.cancel" type="default" plain="true" size="mini" class="cancel_btn" @click.stop="showDialog(el.id, 1)">
                取消订单
            </button>
            <button v-if="el.handleOption.pay" type="default" plain="true" size="mini" class="pay_btn color_btn" @click.stop="pay(el.id)">
                去支付
            </button>
            <button v-if="el.handleOption.refund" type="default" plain="true" size="mini" class="refund_btn color_btn" @click.stop="showDialog(el.id, 2)">
                退款
            </button>
            <button v-if="el.handleOption.confirm" type="default" plain="true" size="mini" class="confirm_btn color_btn" @click.stop="showDialog(el.id, 3)">
                确认收货
            </button>
            <button v-if="el.handleOption.comment" type="default" plain="true" size="mini" class="evaluate_btn">
                去评价
            </button>
        </view>
    </view>
    <view class="no_more" v-if="show_noMore"> 没有更多了 </view>
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
        // console.log(e)
        this.tagChoose = e.type;
        // // this.categoryId = e.itemClass
        // // this.nav_click = e.itemClass
        // this.init()
    },
    onShow() {
        // this.tagChoose = e.type
        this.init();
    },
    components: {
        uniPopup,
        uniPopupDialog,
        uniPopupMessage,
    },
    data() {
        return {
            navList: ["全部", "待付款", "待发货", "待收货", "待评价"],
            tagChoose: 0,
            orderList: [],
            page: 1,
            limit: 10,
            finished: false,
            pages: "",
            show_noMore: false,
            dialogContent: "",
            chooseID: "",
            chooseType: "",
        };
    },
    onReachBottom() {
        if (this.pages <= this.page) {
            this.show_noMore = true;
            return false;
        }
        this.page += 1;
        this.getOrderList();
    },
    methods: {
        changeTag(index) {
            this.tagChoose = index;
            this.page = 1;
            this.orderList = [];
            this.show_noMore = false;
            this.getOrderList();
        },
        init() {
            this.page = 1;
            this.orderList = [];
            this.getOrderList();
        },
        getOrderList() {
            this.$request
                .get(api.orderList, {
                    showType: this.tagChoose,
                    page: this.page,
                    limit: this.limit,
                })
                .then((res) => {
                    if (res.errno == 0) {
                        this.orderList.push(...res.data.list);
                        this.pages = res.data.pages;
                        if (this.pages <= this.page) {
                            this.show_noMore = true;
                            // return false
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
            } else if (type == 2) {
                this.dialogContent = "确定要申请退款吗？";
            } else if (type == 3) {
                this.dialogContent = "请确认收到货物, 确认收货后无法撤销!";
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
                    });
            } else if (this.chooseType == 2) {
                this.$request
                    .post(api.orderRefund, {
                        orderId: this.chooseID
                    })
                    .then((res) => {
                        if (res.errno == 0) {
                            this.init();
                            this.$refs.popup.close();
                            uni.showToast({
                                title: "已申请订单退款",
                                icon: "none",
                                duration: 1500,
                            });
                        } else {
                            uni.showToast({
                                title: `${res.errmsg}`,
                                icon: "none",
                                duration: 1500,
                            });
                        }
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
                    });
            }
        },
        // 付款
        pay(id) {
            this.chooseID = id;
            // uni.navigateTo({
            // 	url: '/pages/details/details?id='+id
            // });
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
                                        url: "/pages/order/order?type=0",
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
                                        url: "/pages/order/order?type=0",
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
		
        toDetail(id) {
            uni.navigateTo({
                url: "/pages/order/orderDetail?id=" + id,
            });
        },
    },
};
</script>

<style scoped>
.container {
    background-color: #f2f2f2;
    min-height: calc(100vh - 40px);
}

.top_flex {
    display: flex;
    background-color: #fff;
    height: 40px;
    line-height: 40px;
}

.nav_span {
    flex-grow: 1;
    text-align: center;
    font-size: 14px;
    margin: 0 10px;
}

.chooseTag {
    color: rgb(255, 20, 151);
    border-bottom: 2px solid rgb(255, 20, 151);
}

.bottom_content {
    background-color: #fff;
    margin-bottom: 10px;
}

.content_top {
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    display: flex;
}

.top_left,
.top_right {
    flex-grow: 1;
}

.top_right {
    text-align: right;
    color: #ee0a24;
}

.order_num {
    margin-left: 5px;
}

.content_middle {
    padding: 0 10px;
}

.middle_left,
.middle_right {
    display: inline-block;
    height: 90px;
    vertical-align: top;
}

.middle_left img {
    width: 88px;
    max-height: 88px;
}

.middle_right {
    margin-left: 5px;
    position: relative;
    width: calc(100% - 100px);
}

.right_top {
    font-size: 14px;
}

.right_middle span {
    font-size: 13px;
    border: 1px solid #e5e5e5;
    color: #969799;
    padding: 2px;
    margin-right: 5px;
}

.right_bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: right;
    font-size: 13px;
    color: #969799;
}

.content_bottom {
    height: 40px;
    line-height: 40px;
    text-align: right;
    font-size: 14px;
    padding: 0 10px;
}

.btn_list {
    text-align: right;
    padding: 0 10px;
}

.cancel_btn,
.evaluate_btn {
    border-color: #e5e5e5 !important;
}

.btn_list uni-button {
    margin-left: 10px;
}

.color_btn {
    border-color: #ff1497 !important;
    background-color: #ff1497 !important;
    color: #fff !important;
}

.no_more {
    text-align: center;
    font-size: 14px;
    padding: 15px 0 30px 0;
}
</style>
