<template>
<view class="container">
    <!-- 		<view class="shezhi">

<image  @click="Jump" src="../../static/images/shezhi.png" alt="">

</view> -->
    <view class="header_img" @click="toLogin">
        <view class="var_img">
            <image v-if="!avatarUrl" src="../../static/images/no.png" alt="">
                <image v-else :src="avatarUrl" mode=""></image>
        </view>
        <view>{{userName}}</view>
    </view>
    <view style="background: #fff;margin-top:1rem">
        <view class="order">
            <view style="font-size: .75rem">我的订单</view>
            <navigator url="../order/order?type=0" open-type="navigate">
                <view style="font-size: .7rem;color:#999">全部订单></view>
            </navigator>
        </view>
        <view class="picon">
            <view v-for="(item, index) in icon" :key="index">
                <navigator :url="item.Url" open-type="navigate">
                    <image :src="item.imgUrl" alt="">
                        <view class="name">{{item.name}}</view>
                </navigator>
            </view>
        </view>
    </view>
    <view style="background: #fff;margin-top:.2rem">
        <view class="order">
            <view style="font-size: .75rem">核心服务</view>
            <view style="font-size: .7rem;color:#999">></view>
        </view>
        <view class="picon">
            <view v-for="(item, index) in icon2" :key="index">
                <navigator :url="item.Url" open-type="navigate">
                    <image :src="item.imgUrl" alt="">
                        <view class="name">{{item.name}}</view>
                </navigator>
            </view>
        </view>
    </view>
    <view style="background: #fff;margin-top:.2rem">
        <view class="order">
            <view style="font-size: .75rem">必备工具</view>
            <view style="font-size: .7rem;color:#999">></view>
        </view>
        <view class="picon">
            <view v-for="(item, index) in icon1" :key="index">
                <view v-if="index == 3" @click="bind_wx">
                    <!-- <uni-icons class="binWX" :type="item.icon"></uni-icons> -->
                    <image :src="item.imgUrl" alt="">
                        <view class="name">{{item.name}}</view>
                </view>
                <view v-else-if="index == 0" @click="bind_phone">
                    <image :src="item.imgUrl" alt="">
                        <view class="name">{{item.name}}</view>
                </view>
                <navigator v-else :url="item.Url" open-type="navigate">
                    <image :src="item.imgUrl" alt="">
                        <view class="name">{{item.name}}</view>
                </navigator>
            </view>

        </view>
    </view>
    <view>
        <uni-popup ref="popup" type="center">
            <uni-popup-dialog type="warn" :content="dialogContent" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
        </uni-popup>
    </view>
    <!-- 		<view>

{{list}}

</view> -->
</view>
</template>

<script>
	import api from '@/pages/api/api.js'
import uniIcons from "@/components/uni-icons/uni-icons.vue";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import uniPopupMessage from "@/components/uni-popup/uni-popup-message.vue";
import uniPopupDialog from "@/components/uni-popup/uni-popup-dialog.vue";
export default {
    data() {
        return {
            userName: "请登录",
            avatarUrl: "",
            icon: [{
                    imgUrl: "../../static/images/pendpay.png",
                    name: "待付款",
                    Url: `../order/order?type=1`,
                },
                {
                    imgUrl: "../../static/images/send.png",
                    name: "待发货",
                    Url: `../order/order?type=2`,
                },
                {
                    imgUrl: "../../static/images/receive.png",
                    name: "待收货",
                    Url: `../order/order?type=3`,
                },
                {
                    imgUrl: "../../static/images/comment.png",
                    name: "待评价",
                    Url: `../order/order?type=4`,
                },
                {
                    imgUrl: "../../static/images/aftersale1.png",
                    name: "会员中心",
                    Url: "../vipIntegral/vipIntegral",
                },
            ],
            icon2: [{
                    imgUrl: "../../static/images/coupon.png",
                    name: "优惠券",
                    Url: "../coupon/coupon",
                },
                {
                    imgUrl: "../../static/images/icon_collect.png",
                    name: "商品收藏",
                    Url: "../favorite/favorite",
                },
                {
                    imgUrl: "../../static/images/footprint.png",
                    name: "浏览足迹",
                    Url: "../footprint/footprint",
                },
                {
                    imgUrl: "../../static/images/group.png",
                    name: "我的拼团",
                    Url: "../userGroupon/userGroupon",
                },
                {
                    imgUrl: "../../static/images/address.png",
                    name: "地址管理",
                    Url: "../address/address",
                },
            ],
            icon1: [{
                    imgUrl: "../../static/images/mobile.png",
                    name: "绑定手机",
                    Url: "../user/phone",
                },
                {
                    imgUrl: "../../static/images/ic_menu_topic_nor.png",
                    name: "帮助中心",
                    Url: "../user/help",
                },
                {
                    imgUrl: "../../static/images/feedback.png",
                    name: "意见反馈",
                    Url: "../feedback/feedback",
                },
                // {
                // 	imgUrl: '../../static/images/customer.png',
                // 	name: '联系客服',
                // },
                {
                    icon: "weixin",
                    name: "绑定微信",
                    imgUrl: "../../static/images/wx.jpg",
                },
                {
                    imgUrl: "../../static/images/about_us.png",
                    name: "关于我们",
                    Url: "../user/about",
                },
            ],
            list: "",
            dialogContent: "您已绑定手机,是否解除绑定?",
        };
    },
    components: {
        uniIcons,
        uniPopup,
        uniPopupDialog,
        uniPopupMessage
    },
    created() {
        // uni.getStorageSync('nickName') && this.setUserName()
    },
    onShow() {
        this.avatarUrl = uni.getStorageSync("avatarUrl");
        if (uni.getStorageSync("nickName")) {
            uni.getStorageSync("nickName") && this.setUserName();
        } else {
            this.userName = "请登录";
        }
        this.$refs.popup.close();
    },
    methods: {
        setUserName() {
            this.userName = uni.getStorageSync("nickName");
        },
        Jump() {
            uni.navigateTo({
                url: "../myinfo/myinfo",
            });
        },
        close(done) {
            console.log(done);
            this.$refs.popup.close();
        },
        confirm(done, value) {
            uni.navigateTo({
                url: "../user/unbind",
            });
        },
        toLogin() {
            if (this.userName == "请登录") {
                uni.navigateTo({
                    url: "../login/login",
                });
            } else {
                uni.navigateTo({
                    url: "../myinfo/myinfo",
                });
            }
        },
        bind_phone() {
            let _that = this;
            if (this.userName == "请登录") {
                uni.showToast({
                    icon: "none",
                    title: "请登录",
                    duration: 1500,
                });
                setTimeout(function () {
                    uni.redirectTo({
                        url: "../login/login",
                    });
                }, 1500);
            } else {
                if (!this.avatarUrl) {
                    this.$refs.popup.open();
                } else {
                    this.$request.get(api.checkMo, {}).then((res) => {
                        if (!res) {
                            uni.navigateTo({
                                url: "../user/phone",
                            });
                        } else {
                            _that.$refs.popup.open();
                        }
                        // this.list = res
                    });
                }
            }
        },
        bind_wx() {
            if (this.userName == "请登录") {
                uni.showToast({
                    icon: "none",
                    title: "请登录",
                    duration: 1500,
                });
                setTimeout(function () {
                    uni.redirectTo({
                        url: "../login/login",
                    });
                }, 1500);
            } else {
                if (this.avatarUrl) {
                    uni.showToast({
                        icon: "none",
                        title: "已使用微信登录",
                        duration: 1500,
                    });
                } else {
                    this.$request.get("auth/checkIsBindWx", {}).then((res) => {
                        if (!res) {
                            this.login_wx();
                        } else {
                            uni.showToast({
                                icon: "none",
                                title: "您已绑定过微信",
                                duration: 1500,
                            });
                        }
                    });
                }
            }
        },
        login_wx() {
            let self = this;
            uni.showLoading({
                mask: true,
                title: "请稍后...",
                complete: () => {},
            });
            uni.login({
                provider: "weixin",
                success: function (loginRes) {
                    let js_code = loginRes.code;
                    // let js_code = loginRes;
                    let loginInfo_VX = loginRes;
                    uni.getUserInfo({
                        provider: "weixin",
                        success: function (infoRes) {
                            // console.log(infoRes)
                            let nickName = infoRes.userInfo.nickName;
                            let gender = infoRes.userInfo.gender;
                            let language = infoRes.userInfo.language;
                            let avatarUrl = infoRes.userInfo.avatarUrl;
                            let province = infoRes.userInfo.province;
                            let country = infoRes.userInfo.country;
                            let city = infoRes.userInfo.city;
                            let openId = infoRes.userInfo.openId;
                            let userInfo = {
                                nickName: nickName,
                                gender: gender,
                                language: language,
                                avatarUrl: avatarUrl,
                                province: province,
                                country: country,
                                city: city,
                                openId: openId,
                            };
                            if (js_code) {
                                self.$request
                                    .post("auth/bindWeiXin", {
                                        code: js_code,
                                        userInfo: userInfo,
                                    })
                                    .then((res) => {
                                        if (res.errno == 0) {
                                            console.log(res);
                                            uni.showToast({
                                                title: "绑定成功",
                                                duration: 1500,
                                            });
                                            setTimeout(() => {
                                                uni.hideLoading();
                                                uni.switchTab({
                                                    url: "/pages/index/index",
                                                });
                                            }, 1800);
                                        } else {
                                            uni.hideLoading();
                                            uni.showToast({
                                                icon: "none",
                                                title: "绑定失败",
                                                duration: 1500,
                                            });
                                        }
                                    });
                            } else {
                                self.$request
                                    .post("auth/bindWeiXin", {
                                        userInfo: userInfo,
                                    })
                                    .then((res) => {
                                        if (res.errno == 0) {
                                            console.log(res);
                                            uni.showToast({
                                                title: "绑定成功",
                                                duration: 1500,
                                            });
                                            // self.getNewToken()
                                            setTimeout(() => {
                                                uni.hideLoading();
                                                uni.switchTab({
                                                    url: "/pages/index/index",
                                                });
                                            }, 1800);
                                        } else {
                                            uni.hideLoading();
                                            uni.showToast({
                                                icon: "none",
                                                title: "绑定失败",
                                                duration: 1500,
                                            });
                                        }
                                    });
                            }
                        },
                        fail: function (res) {
                            console.log(res);
                        },
                    });
                },
                fail: function (res) {
                    console.log(res);
                },
            });
        },
    },
};
</script>

<style>
.name {
    text-align: center;
    font-size: 0.65rem;
}

.picon {
    display: flex;
    justify-content: space-between;
    /* padding: .8rem; */
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    text-align: center;
}

.picon image {
    width: 1.4rem;
    height: 1.4rem;
}

.order {
    display: flex;
    justify-content: space-between;
    background: #fff;
    padding: 0.7rem;
}

.var_img image {
    margin-top: 0.5rem;
}

.header_img {
    text-align: center;
    padding-top: 20px;
}

.header_img image {
    width: 3.8rem;
    height: 3.8rem;
}

.shezhi {
    padding-top: 1rem;
    margin-left: 17rem;
}

.shezhi image {
    width: 1rem;
    height: 1rem;
}

.container {
    /* padding: .7rem; */
    font-size: 14px;
    line-height: 24px;
    background: #f2f2f2;
}

/deep/ .binWX {
    font-size: 1.6rem !important;
    color: rgb(255, 55, 156) !important;
}
</style>
