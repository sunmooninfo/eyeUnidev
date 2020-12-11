<template>
<view class="container">
    <view class="item">
        <view>头像</view>
        <view v-if="!avatarUrl">
            <image style="width: 25px; height: 25px" src="/static/images/no.png" mode=""></image>
        </view>
        <view v-else>
            <img style="width: 25px; height: 25px" width="30px" :src="avatarUrl" alt="" />
        </view>
    </view>
    <view class="item">
        <view>昵称</view>
        <view>{{ username }}</view>
    </view>
    <view class="item">
        <view>性别</view>
        <view>男</view>
    </view>
  
    <button class="btn" @click="LoginOut">退出当前账号</button>
</view>
</template>

<script>
	import api from '@/pages/api/api.js'
export default {
    data() {
        return {
            username: "",
            avatarUrl: "",
        };
    },
    created() {
        //    this.username = uni.getStorageSync('nickName')
        //    this.avatarUrl = uni.getStorageSync('avatarUrl')
        // console.log(this.username)
        // console.log(this.avatarUrl)
    },
    onShow() {
        this.username = uni.getStorageSync("nickName");
        this.avatarUrl = uni.getStorageSync("avatarUrl");
    },
    methods: {
        Jump() {
            uni.navigateTo({
                url: "./modifyinfo/modifyinfo",
            });
        },
        LoginOut() {
            this.$request.post(api.logout, {}).then((res) => {
                try {
                    uni.removeStorageSync("token");
                    uni.removeStorageSync("refresh_token");
                    uni.removeStorageSync("nickName");
                    uni.removeStorageSync("avatarUrl");
                } catch (e) {
                    // error
                }
                if (res.errno == 0) {
                    uni.showToast({
                        title: "退出成功",
                        duration: 1500,
                    });
                    setTimeout(() => {
                        uni.switchTab({
                            url: "../index/index",
                        });
                    }, 1500);
                } else {
                    uni.showToast({
                        icon: "none",
                        title: "退出失败",
                        duration: 1500,
                    });
                }
            });
        },
    },
};
</script>

<style scoped>
.btn {
    margin-top: 1rem;
}

.item {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    border-bottom: 0.5px solid #eee;
}

.container {
    padding: 1rem;
    margin-top: 1.5rem;
}
</style>
