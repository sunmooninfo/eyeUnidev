<template>
<view class="root">
    <!-- 已登录 -->
    <view class="" v-if="token">
        <topThread :counter="counter" :commodity="commodity" v-on:initx="init"></topThread>
    </view>

    <!-- 没登录 -->
    <view class="notLog-box" v-else>
        <view class="notLog">
            <image mode="widthFix" class="notLog-img" src="/static/images/cart_1.png" alt="" />
            <view>还没有登录</view>
            <button plain="true" @click="btn">去登录</button>
        </view>
    </view>
</view>
</template>

<script>
import api from '@/pages/api/api.js'
import topThread from "./component/topThread.vue";
export default {
    data() {
        return {
            token: false,
            commodity: [],
            counter: {},
            isxian: false,
            checkbox: [],
        };
    },
    methods: {
        btn() {
            uni.navigateTo({
                url: "/pages/login/login",
            });
        },
        init: function () {
            try {
                const token = uni.getStorageSync("token");
                if (token) {
                    // console.log(token);
                    this.token = true;
                    this.$request.get(api.cart).then((res) => {
                        this.commodity = res.data.cartList.reverse();
                        this.counter = res.data.cartTotal;
                        // console.log(res.data)
                    });
                } else {
                    // console.log("没有了")
                    this.token = false;
                }
            } catch (e) {
                // error
                console.log(e);
            }
        },
    },
    onShow() {
        this.init();
    },
    components: {
        topThread,
    },
    watch: {},
};
</script>

<style>
.root {
    font-size: 12px;
    background-color: #f4f4f4;
}

/* 没登录样式 */
.notLog-box {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.notLog {
    text-align: center;
}

.notLog view {
    margin: 10px 0 20px 0;
}

.notLog button {
    width: 250px;
    border: 1px solid #0062cc;
    color: #0062cc;
    border-radius: 40px;
}

.notLog image {
    width: 150px;
}

/* 已登录样式 */
</style>
