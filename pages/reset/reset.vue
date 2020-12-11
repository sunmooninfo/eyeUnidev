<template>
<view class="container">
    <view class="avatar">
        <image src="../../static/images/avatar_default.png" mode=""></image>
        <view style="font-size: 16px"> 找回密码 </view>
    </view>
    <view class="pinput">
        <view class="info">
            <view style="font-size: 28rpx; width: 70px">手机号码：</view>
            <input class="uni-input" :value="phone" @input="inputChange4" placeholder="请输入手机号码" />
        </view>
        <view class="info">
            <view style="font-size: 28rpx; width: 70px">验证码：</view>
            <input class="uni-input codeInput" :value="code" @input="inputChange5" placeholder="请输入验证码" />
            <button class="codeBtn" type="primary" size="mini" :disabled="disabled" @click="getCode">
                {{ text }}
            </button>
        </view>
        <view class="info">
            <view style="font-size: 28rpx; width: 70px">新密码：</view>
            <input class="uni-input" :value="password1" @input="inputChange2" type="password" placeholder="请输入密码" />
        </view>
        <view class="info">
            <view style="font-size: 28rpx; width: 70px">确认密码：</view>
            <input class="uni-input" :value="password2" @input="inputChange3" type="password" placeholder="请确认密码" />
        </view>
    </view>
    <button @click="login" class="btn" type="default">重置密码</button>
</view>
</template>

<script>
	import api from '@/pages/api/api.js'
export default {
    data() {
        return {
            password1: "",
            password2: "",
            phone: "",
            code: "",
            disabled: false,
            text: "获取验证码",
            num: 60,
        };
    },
    methods: {
        inputChange1(e) {
            this.username = e.detail.value;
        },
        inputChange2(e) {
            this.password1 = e.detail.value;
        },
        inputChange3(e) {
            this.password2 = e.detail.value;
        },
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
            if (this.password1 == "") {
                uni.showToast({
                    icon: "none",
                    title: "密码不能为空",
                    duration: 1500,
                });
                return;
            }
            if (this.password2 == "") {
                uni.showToast({
                    icon: "none",
                    title: "请确认密码",
                    duration: 1500,
                });
                return;
            }
            if (this.password1 != this.password2) {
                uni.showToast({
                    icon: "none",
                    title: "两次密码不一致",
                    duration: 1500,
                });
                return;
            }

            let data = {
                password: this.password1,
                mobile: this.phone,
                code: this.code,
            };

            this.$request.post(api.reset, data).then((res) => {
                // console.log(res)
                if (res.errno == 0) {
                    uni.showToast({
                        title: "重置密码成功",
                        duration: 1500,
                    });
                    setTimeout(() => {
                        uni.redirectTo({
                            url: "/pages/login/login",
                        });
                    }, 1000);
                } else {
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
                            icon: "none",
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
    width: 30vw;
}

.codeBtn {
    width: 100px;
    margin-left: 20rpx;
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

.info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.reg {
    display: flex;
    justify-content: space-between;
    /* margin-top: 20rpx; */
    font-size: 32rpx;
    padding: 0.5rem;
}
</style>
