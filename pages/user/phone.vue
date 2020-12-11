<template>
<view class="container">
    <view class="avatar">
        <image src="../../static/images/avatar_default.png" mode=""></image>
        <view style="font-size: 16px"> 绑定手机 </view>
    </view>
    <view class="pinput">
        <view class="info">
            <view style="font-size: 14px; width: 70px">手机号码：</view>
            <input class="uni-input" :value="phone" @input="inputChange4" placeholder="请输入手机号码" />
        </view>
        <view class="info">
            <view style="font-size: 14px; width: 70px">验证码：</view>
            <input class="uni-input codeInput" :value="code" @input="inputChange5" placeholder="请输入验证码" />
            <button class="codeBtn" type="primary" size="mini" :disabled="disabled" @click="getCode">
                {{ text }}
            </button>
        </view>
    </view>
    <button @click="login" class="btn" type="default">立即绑定</button>
</view>
</template>

<script>
	import api from '@/pages/api/api.js'
export default {
    data() {
        return {
            phone: "",
            code: "",
            disabled: false,
            text: "获取验证码",
            num: 60,
        };
    },
    methods: {
        inputChange4(e) {
            this.phone = e.detail.value;
        },
        inputChange5(e) {
            this.code = e.detail.value;
        },
        login() {
            var reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if (!reg.test(this.phone)) {
                uni.showToast({
                    icon: "none",
                    title: "手机号码输入有误",
                    duration: 1500,
                });
                return false;
            }
            if (!this.code) {
                uni.showToast({
                    icon: "none",
                    title: "请输入验证码",
                    duration: 1500,
                });
                return;
            }
            let data = {
                mobile: this.phone,
                code: this.code,
            };
            uni.showLoading({
                title: "请稍后",
            });
            this.$request.post(api.bindMobile, data).then((res) => {
                // console.log(res)
                if (res.errno == 0) {
                    uni.showToast({
                        title: "绑定手机成功",
                        duration: 1500,
                    });
                    setTimeout(() => {
                        uni.hideLoading();
                        uni.switchTab({
                            url: "/pages/index/index",
                        });
                    }, 1500);
                } else {
                    uni.hideLoading();
                    uni.showToast({
                        title: `${res.errmsg}`,
                        icon: "none",
                        duration: 1500,
                    });
                }
            });
        },
        getCode() {
            var reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if (!reg.test(this.phone)) {
                uni.showToast({
                    icon: "none",
                    title: "手机号码输入有误",
                    duration: 1500,
                });
                return false;
            }
            this.$request
                .post(api.regCaptcha, {
                    mobile: this.phone
                })
                .then((res) => {
                    // console.log(res)
                    if (res.errno == 0) {
                        uni.showToast({
                            title: "发送成功",
                            duration: 1500,
                        });
                        this.disabled = true;
                        this.getSecond();
                    } else {
                        uni.showToast({
                            title: `${res.errmsg}`,
                            icon: "none",
                            duration: 1500,
                        });
                    }
                });
        },
        getSecond() {
            var that = this;
            setTimeout(function () {
                if (that.num <= 0) {
                    that.disabled = false;
                    that.text = "获取验证码";
                    that.num = 60;
                } else {
                    console.log(that.num);
                    that.num = that.num - 1;
                    that.text = that.num + "s后获取";
                    that.getSecond();
                }
            }, 1000);
        },
    },
};
</script>

<style scoped>
.btn {
    background-color: #ff1497;
    color: #fff;
    max-width: 650rpx;
    margin-top: 20px;
}

.container {
    padding: 0.5rem;
}

.uni-input {
    border: 0.1rpx solid #e5e5e5;
    padding: 10rpx;
    /* margin-top: 15rpx; */
    border-radius: 10rpx;
    width: 240px;
}

.codeInput.uni-input {
    width: 130px;
}

.codeBtn {
    margin: 0px 5px 0;
}

.avatar {
    text-align: center;
    margin-top: 90rpx;
}

.avatar>image {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
}

.pinput {
    padding: 0.5rem;
}

.reg {
    display: flex;
    justify-content: space-between;
    /* margin-top: 20rpx; */
    font-size: 32rpx;
    padding: 0.5rem;
}

.info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
</style>
