<template>
<view>
    <view>
        <view>我的积分：{{vipIntegral}}</view>
    </view>
    <view>会员套餐列表</view>
    <view>会员套餐详细</view>
    <view>
        <view class="title">积分商品</view>
        <view class="card_img">
            <view class="card_child" v-for="(item, index) in vipList" :key="index">
                <navigator :url="`../details/details?id=${item.goodsId}`" open-type="navigate">
                    <view>
                        <img :src="item.picUrl" alt="" />
                        <view class="card_name">{{ item.goodsName }}</view>
                        <view class="card_zprice">积分兑换：{{ item.integration }}积分</view>
                        <!-- <view class="card_yprice">原价：￥{{ item.counterPrice}}</view> -->
                    </view>
                </navigator>
                <view @click="Exchange(item.integration)">我要兑换</view>
            </view>
        </view>
    </view>
    <view>查看会员商品</view>
</view>
</template>

<script>
export default {
    data() {
        return {
            vipList: [],
            vipIntegral: 0,
        };
    },
    created() {
        this.$request.get("integral/goods/list", {}).then((res) => {
            this.vipList = res.data.list;
        });
        this.$request.get("integral/myintegral", {}).then((res) => {
            this.vipIntegral = res.data.integration;
        });
    },
    methods: {
        Exchange(integration) {
            if (this.vipIntegral >= integration) {
                uni.navigateTo({
                    url: "..//myinfo",
                });
            } else {
                uni.showToast({
                    icon: "none",
                    title: "你的积分不足",
                    duration: 1000,
                });
            }
        },
    },
};
</script>

<style scoped>
.card_child img {
    width: 300upx;
    height: 300upx;
}

.card_name {
    font-size: 13px;
    color: #000;
    /* width:160px; */
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.card_zprice {
    font-size: 14px;
    color: #ff1497;
}

.card_yprice {
    font-size: 12px;
    color: #999;
    text-decoration: line-through;
}

.title {
    color: #ff1497;
    text-align: center;
    font-size: 32upx;
    margin-bottom: 15px;
}

.card_img {
    padding: 20upx;
    background: #fff;
    text-align: center;
}

.card_child {
    display: inline-block;
    width: 50%;
}
</style>
