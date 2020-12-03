<template>
<view class="container">
    <view class="avatar">
        <image src="../../static/img/avatar_default.png" mode=""></image>
        <view style="font-size: 16px"> 请登录 </view>
    </view>
    <view class="pinput">
        <view>
            <input class="uni-input" style="margin-bottom: 5px" :value="username" @input="inputChange1" focus placeholder="请输入账号" />
        </view>
        <view>
            <input class="uni-input" :value="password" @input="inputChange2" type="password" focus placeholder="请输入密码" />
        </view>
        <view class="reg">
            <view @click="goReg"> 免费注册 </view>
            <view @click="goReset"> 忘记密码 </view>
        </view>
        <!-- 		<view style=";word-break: break-word;" @click="copy(loginInfo)">

{{loginInfo}}

</view> -->
        <!-- <view style="word-break: break-word;">

{{list}}

</view> -->
    </view>
    <button @click="login" class="btn" type="default">登录</button>
    <!-- 除了 H5 平台，其它平台均存在的代码 -->
	<!-- #ifndef H5 -->
	<button open-type="getUserInfo" type="primary" class="btn_lg" withCredentials="true" @click="register">微信授权登录</button>
	<!-- #endif -->
</view>
</template>

<script>
	import api from '@/pages/api/api.js'
export default { 
    data() {
        return {
            username: "",
            password: "",
            list: "",
            loginInfo: "",
            isCanUse: uni.getStorageSync("isCanUse") || true, //默认为true
        };
    },
    methods: {
        inputChange1(e) {
            this.username = e.detail.value;
        },
        inputChange2(e) {
            this.password = e.detail.value;
        },
        goReg() {
            uni.navigateTo({
                url: "../reg/reg",
            });
        },
        goReset() {
            uni.navigateTo({
                url: "../reset/reset",
            });
        },
        login() {
            if (this.username == "") {
                uni.showToast({
                    icon: "none",
                    title: "用户名不能为空",
                    duration: 2000,
                });
                return;
            }
            if (this.password == "") {
                uni.showToast({
                    icon: "none",
                    title: "密码不能为空",
                    duration: 1500,
                });
                return;
            }
            let data = {
                username: this.username,
                password: this.password,
            };

            this.$request.post(api.authLogin, data).then((res) => {
                if (res.errno == 700) {
                    uni.showToast({
                        title: `${res.errmsg}`,
                        duration: 1500,
                    });
                } else {
                    uni.setStorageSync("token", res.data.token);
                    uni.setStorageSync("refresh_token", res.data.refreshToken);
                    uni.setStorageSync("nickName", res.data.userInfo.nickName);
                    uni.showToast({
                        title: `登录${res.errmsg}`,
                        duration: 1500,
                    });
                    setTimeout(() => {
                        // uni.switchTab({
                        // 	url: '/pages/index/index'
                        // });
                        uni.navigateBack({
                            delta: 1,
                        });
                    }, 1800);
                }
            });
        },
        register() {
			//#ifndef H5
			let self = this;
			uni.showLoading({
			    mask: true,
			    title: "正在登录...",
			    complete: () => {},
			});
			uni.login({
			    provider: "weixin",
			    success: function (loginRes) {
			        console.log(loginRes);
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
			                let unionId = infoRes.userInfo.unionId;
			                let userInfo = {
			                    nickName: nickName,
			                    gender: gender,
			                    language: language,
			                    avatarUrl: avatarUrl,
			                    unionId: "",
			                    // province: province,
			                    // country: country,
			                    // city: city,
			                };
			                // console.log(infoRes)
			                // self.loginInfo = loginInfo_VX
			                self.list = infoRes;
			                // return
			                if (js_code) {
			                    // self.getUnionID(js_code, userInfo);
			                    // return
			                    self.$request.post(api.loginWX, {
			                    	code: js_code,
			                    	userInfo: userInfo
			                    }).then(res => {
			                    	if (res.errno == 0) {
			                    		console.log(res)
			                    		uni.setStorageSync('token', res.data.token);
			                    		uni.setStorageSync("refresh_token", res.data.refreshToken);
										uni.setStorageSync('nickName', res.data.userInfo.nickName)
			                    		uni.setStorageSync('avatarUrl', avatarUrl)
			                    		setTimeout(() => {
			                    		uni.hideLoading();
			                    		// uni.switchTab({
			                    		// 	url: '/pages/index/index'
			                    		// });
										uni.showToast({
										    //提示
										    title: "登录成功",
										});
			                    		uni.navigateBack({
			                    		    delta: 1
			                    		});
			                    		}, 1800);
			                    	} else {
			                    		uni.showLoading({
			                    		mask: true,
			                    		title: '登录失败...',
			                    		complete: () => {}
			                    		});
			                    		setTimeout(function() {
			                    		uni.hideLoading();
			                    		}, 2000);
			                    	}
			                    })
			                } else {
			                    uni.setStorageSync("token", self.loginInfo.access_token);
			                    uni.setStorageSync("nickName", userInfo.nickName);
			                    uni.setStorageSync("avatarUrl", avatarUrl);
			                    // self.list = uni.getStorageSync('token')
			                    // setTimeout(() => {
			                    // 	uni.hideLoading();
			                    // 	uni.switchTab({
			                    // 		url: '/pages/index/index'
			                    // 	});
			                    // }, 1800);
			                    userInfo.province = province;
			                    userInfo.country = country;
			                    userInfo.city = city;
			                    userInfo.openId = openId;
			                    userInfo.unionId = unionId;
			                    self.$request
			                        .post(api.appLoginWX, {
			                            userInfo: userInfo,
			                        })
			                        .then((res) => {
			                            if (res.errno == 0) {
			                                // console.log(res)
			                                uni.setStorageSync("token", res.data.token);
			                                uni.setStorageSync(
			                                    "refresh_token",
			                                    res.data.refreshToken
			                                );
			                                uni.setStorageSync(
			                                    "nickName",
			                                    res.data.userInfo.nickName
			                                );
			                                uni.showToast({
			                                    title: "登录成功",
			                                    duration: 1500,
			                                });
			                                // self.getNewToken()
			                                setTimeout(() => {
			                                    uni.hideLoading();
			                                    // uni.switchTab({
			                                    // 	url: '/pages/index/index'
			                                    // });
			                                    uni.navigateBack({
			                                        delta: 1,
			                                    });
			                                }, 1800);
			                            } else {
			                                uni.showLoading({
			                                    mask: true,
			                                    title: "登录失败...",
			                                    complete: () => {},
			                                });
			                                setTimeout(function () {
			                                    uni.hideLoading();
			                                }, 2000);
			                            }
			                        });
			                }
			            },
			            fail: function (res) {
			                // console.log(res)
			            },
			        });
			    },
			    fail: function (res) {
			        // console.log(res)
			    },
			});
			//#endif

        },
        wxLoginAgain(userInfo) {
            let userInfoAging = userInfo;
            console.log(userInfoAging);
            let _that = this;
            uni.login({
                provider: "weixin",
                success: function (loginRes) {
                    console.log(loginRes);
                    let js_code = loginRes.code;
                    _that.$request
                        .post(api.loginWX, {
                            code: js_code,
                            userInfo: userInfoAging,
                        })
                        .then((res) => {
                            if (res.errno == 0) {
                                console.log(res);
                                uni.setStorageSync("token", res.data.token);
                                uni.setStorageSync("refresh_token", res.data.refreshToken);
                                uni.setStorageSync("nickName", res.data.userInfo.nickName);
                                uni.setStorageSync("avatarUrl", userInfoAging.avatarUrl);
                                setTimeout(() => {
                                    uni.hideLoading();
                                    // uni.switchTab({
                                    // 	url: '/pages/index/index'
                                    // });
                                    uni.showToast({
                                        //提示
                                        title: "登录成功",
                                    });
                                    uni.navigateBack({
                                        delta: 1,
                                    });
                                }, 1800);
                            } else {
                                uni.showLoading({
                                    mask: true,
                                    title: "登录失败...",
                                    complete: () => {},
                                });
                                setTimeout(function () {
                                    uni.hideLoading();
                                }, 2000);
                            }
                        });
                },
                fail: function (res) {
                    // console.log(res)
                },
            });
        },
        copy(loginInfo) {
            uni.setClipboardData({
                data: loginInfo,
                success: function () {
                    uni.showToast({
                        //提示
                        title: "复制成功",
                    });
                },
            });
        },
        getNewToken() {
            setTimeout(function () {
                uni.showToast({
                    //提示
                    title: "复制成功",
                });
            }, 3000);
        },
        getUnionID(jscode, userInfo) {
            let jscodeLogin = jscode;
            uni.request({
                url: "https://api.weixin.qq.com/sns/jscode2session?appid=wxf4dfbb9a60a8ad14&secret=7406cb935c3660f7293cfc46bcaa0bc5&js_code=" +
                    jscode +
                    "&grant_type=authorization_code",
                data: {
                    text: "uni.request",
                },
                header: {
                    "Content-Type": "application/json",
                    //自定义请求头信息
                },
                success: (res) => {
                    console.log(res.data);
                    userInfo.unionId = res.data.unionid;
                    console.log(userInfo);
                    // return
                    this.wxLoginAgain(userInfo);
                },
            });
        },
    },
};
</script>

<style scoped>
.btn {
    background-color: #ff1497;
    color: #fff;
    width: 650rpx;
}

.btn_lg {
    width: 650rpx;
    margin-top: 15px;
}

.container {
    padding: 0.5rem;
}

.uni-input {
    border: 0.1rpx solid #e5e5e5;
    padding: 10rpx;
    /* margin-top: 15rpx; */
    border-radius: 10rpx;
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
</style>
