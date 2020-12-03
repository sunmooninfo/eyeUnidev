<template>
<view class="Record">
    <view class="RecordBox" v-for="(item, index) in RecordList" :key="index">
        <view class="vip-box">
            <view>
                <text>{{ item.name }}</text>
                <text>价格:￥{{ item.price }}</text>
                <text>状态:{{ item.orderStatusText }}</text>
            </view>

            <view>
                <text>有效期:{{ item.months }}月</text>
                <button @click="Delete(item.id)" size="mini">删除</button>
            </view>
        </view>
    </view>
</view>
</template>

<script>
import api from '@/pages/api/api.js'
export default {
    data() {
        return {
            RecordList: [],
        };
    },
    onLoad: function () {
        this.orderL();
    },
    methods: {
        //init 初始值
        orderL: function () {
            this.$request.get(api.historyCard).then((res) => {
                console.log(res);
                if (res.errno == 0) {
                    this.RecordList = res.data.list;
                } else {
                    uni.showLoading({
                        title: "初始化失败",
                    });
                    setTimeout(function () {
                        uni.hideLoading();
                    }, 2000);
                }
            });
        },
        // 删除按钮
        Delete: function (event) {
            let that = this;
            uni.showModal({
                content: "确认删除购买记录么",
                success: function (res) {
                    console.log(res);
                    console.log(event);
                    if (res.confirm) {
                        //确定按钮
                        that.$request.post(api.historyDelete, {
                                memberOrderId: event
                            })
                            .then((res) => {
                                if (res.errno == 0) {
                                    that.orderL();
                                } else {
                                    uni.showLoading({
                                        title: "删除失败",
                                    });
                                    setTimeout(function () {
                                        uni.hideLoading();
                                    }, 2000);
                                }
                            });
                    } else if (res.cancel) {} //取消按钮
                },
            });
        },
    },
};
</script>

<style>
.RecordBox {
    width: 95%;
    height: 180rpx;
    margin: 20rpx auto;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.vip-box {
    height: 180rpx;
    border-radius: 10rpx;
    margin: 20rpx 0;
    background: linear-gradient(45deg, #ffffff, #d3d3d3, #808080);
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
</style>
