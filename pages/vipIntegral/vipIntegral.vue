<template>
<view class="vip-room">
    <view class="content">
        <!-- 头部积分与购买记录 -->
        <view class="vip-title">
            <view>
                <text>现有积分{{ integration }}</text>
            </view>
            <view>
                <navigator url="/pages/vipIntegral/Record">
                    <text>会员购买记录</text>
                </navigator>
            </view>
        </view>
        <!-- 手风琴效果 -->
        <uni-collapse accordion="false" showAnimation="true">
            <uni-collapse-item :title="vipTime">
                <!-- 会员套餐 -->
                <view class="vip">
                    <view v-for="(item, index) in vipList" :key="index">
                        <view class="vip-box">
                            <view>
                                <text>{{ item.name }}</text>
                                <text>价格:￥{{ item.price }}</text>
                            </view>

                            <view>
                                <text>有效期:{{ item.months }}月</text>
                                <button @click="payvip(index)" size="mini">购买</button>
                            </view>
                        </view>
                    </view>
                </view>
            </uni-collapse-item>
        </uni-collapse>
    </view>

    <!-- Tabs 标签页 -->
    <view style="margin-top: 20upx">
        <zzx-tabs :items="items" :current="current" @clickItem="onClickItem" ref="mytabs"></zzx-tabs>
    </view>
    <view style="
        margin-top: 20upx;
        color: #999999;
        font-size: 24upx;
        height: 260upx;
      ">
        <!-- 会员商品 -->
        <view v-show="current === 0">
            <view class="commodity">
                <view class="parent-box" v-for="(item, index) in vipCommodity" :key="index">
                    <navigator :url="
                '/pages/vipIntegral/commodity-list?itemid=' +
                encodeURIComponent(JSON.stringify(item.id))
              ">
                        <view class="commodity-list">
                            <!-- 跳转页面传递会员商品id -->
                            <view class="img" :style="{ backgroundImage: 'url(' + item.picUrl + ')' }">
                                <!-- <image id="image" mode="widthFix" :src="item.picUrl"></image> -->
                            </view>
                            <view class="pri">
                                <view>{{ item.name }}</view>
                                <view><text style="text-decoration: line-through">原价￥{{ item.counterPrice }}</text></view>
                                <view style="color: #ff1497">会员价￥{{ item.memberPrice }}</view>
                            </view>
                        </view>
                    </navigator>
                </view>
            </view>
        </view>
        <!-- 积分商品 -->
        <view v-show="current === 1">
            <view class="commodity">
                <view class="parent-box" v-for="(item, index) in Integral" :key="index">
                    <navigator :url="
                '/pages/vipIntegral/integral-list?itemid=' +
                encodeURIComponent(JSON.stringify(item.id))
              ">
                        <view class="commodity-list">
                            <view class="img" :style="{ backgroundImage: 'url(' + item.picUrl + ')' }">
                                <!-- <image :src="item.picUrl"></image> -->
                            </view>
                            <view class="pri">
                                <view>{{ item.goodsName }}</view>

                                <view style="color: #ff1497">积分{{ item.integration }}</view>
                            </view>
                        </view>
                    </navigator>
                </view>
            </view>
        </view>
    </view>
</view>
</template>

<script>
import api from '@/pages/api/api.js'
import zzxTabs from "@/components/zzx-tabs/zzx-tabs.vue";
import uniCollapse from "@/components/uni-collapse/uni-collapse.vue";
import uniCollapseItem from "@/components/uni-collapse-item/uni-collapse-item.vue";
export default {
    data() {
        return {
            data: {
                limit: 10,
                page: 1,
                sort: "add_time",
                order: "desc",
            },
            pages: 0,

            vipTime: "会员卡", //会员到期时间
            integration: 0, //会员初始积分
            // Tabs 标签页
            items: ["会员商品", "积分商品"],
            current: 0,
            vipList: [], // 会员套餐数组
            vipCommodity: [], // 会员商品数组
            Integral: [], // 积分商品数组
            providerList: [], // 微信支付标识符
        };
    },
    onLoad() {
        this.init();
        this.vipTimeFun();
    },
    onReachBottom() {
        this.data.page++;
        if (this.data.page > this.pages) {
            return;
        }
        this.init();
    },
    onShow() {
        setTimeout(function () {
            uni.hideLoading();
        }, 1500);
    },
    methods: {
        init: function () {
            //会员商品请求
            this.$request.get(api.vipCommodityList, this.data).then((res) => {
                    // console.log(res)
                    if (res.errno == 0) {
                        (this.pages = res.data.pages),
                        this.vipCommodity.push(...res.data.list);
                    } else {
                        uni.showToast({
                            icon: "none",
                            title: `${res.errmsg}`,
                            duration: 1000,
                        });
                    }
                }),
                //会员套餐请求"member/package/list"
                this.$request.get(api.membershipCard).then((res) => {
                    // console.log(res)
                    this.vipList = res.data.list;
                    //查询赋值积分
                    if (res.data.integral) {
                        this.integration = res.data.integral.integration;
                    } else {
                        this.integration = 0;
                    }
                }),
                //积分商品请求
                this.$request.get(api.integralCommodityList, this.data).then((res) => {
                    if (res.errno == 0) {
                        (this.pages = res.data.pages), this.Integral.push(...res.data.list);
                    } else {
                        uni.showToast({
                            icon: "none",
                            title: `${res.errmsg}`,
                            duration: 1000,
                        });
                    }
                });
        },
        // 会员卡到期时间
        vipTimeFun: function () {
            this.$request.get(api.membershipTime).then((res) => {
                console.log(res);
                if (res.data.page == 1) {
                    let Time = "会员到期时间:" + res.data.list[0].endTime;
                    this.vipTime = Time.substring(0, 17);
                }
            });
        },
        //点击会员商品
        commodity: function () {},
        //Tabs点击函数
        onClickItem(e) {
            if (this.current !== e.currentIndex) {
                this.current = e.currentIndex;
            }
        },
        payvip: function (index) {
            // #ifdef APP-PLUS
            this.appPayment(index);
            // #endif
            // #ifdef MP-WEIXIN
            this.wxPayment(index);
            // #endif
			// #ifdef H5
			this.H5Payment(index);
			// #endif
        },
        //小程序会员卡购买
        wxPayment: function (index) {
            let that = this;
            uni.showModal({
                content: "确定购买会员么",
                success: function (res) {
                    if (res.confirm) {
                        that.$request.post(api.submitMembership, {
                            memberPackageId: that.vipList[index].id,})
                        .then((res) => {
                                console.log(res);
                                const temporary = res;
                                that.$request
                                    .post(api.vipPrepayment, {
                                        memberOrderId: temporary,
                                    })
                                    .then((res) => {
                                        if (res.errno == 0) {
                                            uni.requestPayment({
                                                provider: "wxpay",
                                                timeStamp: res.data.timeStamp,
                                                nonceStr: res.data.nonceStr,
                                                package: res.data.packageValue,
                                                signType: res.data.signType,
                                                paySign: res.data.paySign,
                                                success(ress) {
                                                    that.vipTimeFun();
                                                    uni.showLoading({
                                                        title: "购买成功",
                                                    });
                                                    setTimeout(function () {
                                                        uni.hideLoading();
                                                    }, 2000);
                                                    // console.log('success:' + JSON.stringify(ress));
                                                },
                                                fail(err) {
                                                    uni.showLoading({
                                                        title: "购买失败",
                                                    });
                                                    setTimeout(function () {
                                                        uni.hideLoading();
                                                    }, 2000);
                                                    // console.log('fail:' + JSON.stringify(err));
                                                },
                                            });
                                        }
                                    });
                            });
                    } else if (res.cancel) {}
                },
            });
        },
        // app 点击购买
        appPayment: function (index) {
            let that = this;
            uni.showLoading({
                title: "请稍后",
            });
            that.$request.post(api.submitMembership,{memberPackageId: that.vipList[index].id,})
                .then((res) => {
                    console.log(res)
                    const temporary = res;
                    if (temporary) {
                        that.$request.post(api.vipPrepayment,{memberOrderId: temporary})
                        .then((res) => {
						console.log(res)
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
										success: function (res) {
											that.vipTimeFun(); // 请求会员卡时间
											uni.showToast({
												title: "付款成功",
												duration: 1500,
											});
											setTimeout(function () {
												uni.hideLoading();
											}, 2000);
											// console.log('success:' + JSON.stringify(res));
										},
										fail: function (res) {
											uni.showToast({
												icon: "none",
												title: "付款失败",
												duration: 1500,
											});
											setTimeout(function () {
												uni.hideLoading();
											}, 2000);
											// console.log('success:' + JSON.stringify(res));
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
		H5Payment: function (index) {
		    let that = this;
		    uni.showLoading({
		        title: "请稍后",
		    });
		    that.$request.post(api.submitMembership, { memberPackageId: that.vipList[index].id,}).then((res) => {
		            const temporary = res;
		            if (temporary) {
		                that.$request.post(api.H5prepayment, {memberOrderId: temporary})
		                .then((res) => {
		                        console.log(res)
		                        if (res.errno == 0) {
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
		                    });
		            } else {
		                uni.showToast({
		                    icon: "none",
		                    title: `${res.errmsg}`,
		                    duration: 1000,
		                });
		            }
		        });
		}
    },
    components: {
        zzxTabs,
        uniCollapse,
        uniCollapseItem,
    },
};
</script>

<style scoped>
/* 适应微信小程序的通配符 */
:not(not) {
    box-sizing: border-box;
}

* {
    box-sizing: border-box;
}

.content {
    padding: 0 20rpx;
}

/* 头部积分与购买记录 */
.vip-title {
    height: 80rpx;
    border: 1rpx solid #ff1497;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.vip-title>view {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 100%;
}

.vip-title>view:nth-child(even) {
    background-color: #ff1497;
    color: #ffffff;
}

/* 会员套餐 */
.vip-box {
    height: 150rpx;
    border-radius: 10rpx;
    margin: 20rpx 0;
    background-image: url(../../static/images/vip-back.jpg);
    /* background-size: cover; */
    background-size: 100% 100%;
    display: flex;
}

.vip-box>view {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    flex-basis: 100%;
    font-size: 30rpx;
}

.vip {
    background-color: #ffffff;
}

/* 会员商品 */
.commodity {
    padding: 2%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    background-color: #e7eaed;
}

.parent-box {
    width: 50%;
    padding: 20rpx;
}

.commodity-list {
    height: 400rpx;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    text-align: center;
}

.img {
    height: 75%;
    background-size: 100% 100%;
    border-radius: 10rpx;
}

.pri {
    height: 30%;
    color: #000000;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.pri view {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
