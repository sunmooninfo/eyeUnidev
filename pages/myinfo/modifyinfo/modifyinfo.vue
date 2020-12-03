<template>
<view class="container">
    <view class="item">
        <view>头像</view>
        <view>
            <img width="30px" src="../../../static/images/no.png" alt="" />
        </view>
    </view>
    <view class="item">
        <view>昵称:</view>
        <input class="uni-input" :value="nickName" @input="inputChange" focus :placeholder="name" />
        <!-- <input class="name" :placeholder="name" type="text"> -->
    </view>
    <view class="item">
        <view>性别:</view>
        <evan-radio v-model="baseValue" label="1">男</evan-radio>
        <evan-radio v-model="baseValue" label="0">女</evan-radio>
        <evan-radio v-model="baseValue" label="2">保密</evan-radio>
    </view>

    <button class="btn" @click="Jump">确认修改</button>
</view>
</template>

<script>
	import api from '@/pages/api/api.js'
export default {
    data() {
        return {
            baseValue: "1",
            nickName: "",
        };
    },
    created() {
        this.name = uni.getStorageSync("nickName");
    },
    methods: {
        inputChange(e) {
            this.nickName = e.detail.value;
        },
        Jump() {
            console.log(this.nickName);
            let data = {
                nickName: this.data
            };
            // console.log(this.baseValue)
            this.$request.post(api.profile, data).then((res) => {
                uni.setStorageSync("nickName", this.nickName);
            });
            uni.showToast({
                title: `修改成功`,
                duration: 1500,
            });
            setTimeout(() => {
                uni.switchTab({
                    url: "/pages/my/my",
                });
            }, 1500);
        },
    },
};
</script>

<style scoped>
.btn {
    margin-top: 2rem;
    background: #ff1497;
    color: #fff;
}

.name {
    border-radius: 2px;
    border: 1px solid #eee;
}

.item {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    border-bottom: 0.5px solid #eee;
}

.container {
    margin-top: 1.5rem;
    padding: 1rem;
}
</style>
