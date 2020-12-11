<template>
<view class="container">
    <view style="background-color: #fff">
        <view class="top_flex">
            <span class="nav_span" v-for="(list, index) in navList" :key="index" @click="changeTag(index)">
                <span class="inner_span" :class="[tagChoose == index ? 'chooseTag' : '']">
                    {{ list }}
                </span>
            </span>
        </view>
    </view>
    <view class="bottom_content" v-if="orderList && orderList.length == 0">
        <img src="/static/images/cart_1.png" alt="" />
        <view>尚未参加任何团购</view>
    </view>
    <view class="orders" v-else>
        <navigator v-for="(item, index) in orderList" :key="index" :url="'/pages/userGroupon/grouponDetail?id=' + item.id" class="order" open-type="navigate">
            <view class="h">
                <span class="pri" v-if="item.groupon.status === 1">开团中</span>
                <span class="suc" v-else-if="item.groupon.status === 2">开团成功</span>
                <span class="dan" v-else-if="item.groupon.status === 3">开团失败</span>
                <span class="war" v-else-if="!item.isCreator">{{ item.creator }}发起</span>
            </view>
            <!-- <view class="h">

        <van-tag type="primary" v-if="item.groupon.status === 1">开团中</van-tag>

        <van-tag type="success" v-else-if="item.groupon.status === 2">开团成功</van-tag>

        <van-tag type="danger" v-else-if="item.groupon.status === 3">开团失败</van-tag>

        <van-tag round type="warning" wx:if="{{!item.isCreator}}">{{item.creator}}发起</van-tag>

      </view> -->
            <view class="h">
                <view class="l">订单编号：{{ item.orderSn }}</view>
                <view class="r">{{ item.orderStatusText }}</view>
            </view>
            <view class="j">
                <view class="l">团购立减：￥{{ item.rules.discount }}</view>
                <view class="r">参与时间：{{ item.groupon.addTime }}</view>
            </view>
            <view class="i">
                <view class="l">团购要求：{{ item.rules.discountMember }}人</view>
                <view class="r">当前参团：{{ item.joinerCount }}人</view>
            </view>
            <view class="goods" v-for="(gitem, key) in item.goodsList" :key="key">
                <view class="img">
                    <image :src="gitem.picUrl"></image>
                </view>
                <view class="info">
                    <text class="name">{{ gitem.goodsName }}</text>
                    <text class="number">共{{ gitem.number }}件商品</text>
                </view>
                <view class="status"></view>
            </view>
            <view class="b">
                <view class="l">实付：￥{{ item.actualPrice }}</view>
            </view>
        </navigator>
    </view>
</view>
</template>

<script>
export default {
    onShow() {
        this.getInfo();
    },
    components: {},
    data() {
        return {
            navList: ["发起的团购", "参加的团购"],
            tagChoose: 0,
            orderList: [],
            orderTest: [{
                    actualPrice: 0.01,
                    creator: "胖子没有肉",
                    goodsList: [{
                        goodsName: "python好玩又好做的三个小案例",
                        id: 311,
                        number: 1,
                        picUrl: "https://devapis.oss-cn-zhangjiakou.aliyuncs.com/gyde96t49v3aa2huiux2.jpg",
                    }, ],
                    groupon: {
                        addTime: "2020-09-22 11:35:54",
                        creatorUserId: 33,
                        creatorUserTime: "2020-09-22 11:35:54",
                        deleted: false,
                        grouponId: 0,
                        id: 7,
                        orderId: 316,
                        rulesId: 4,
                        shareUrl: "https://devapis.oss-cn-zhangjiakou.aliyuncs.com/tpft4lszf5doxmg7jnkq.jpg",
                        status: 1,
                        updateTime: "2020-09-22 11:36:18",
                        userId: 33,
                    },
                    id: 7,
                    isCreator: true,
                    joinerCount: 1,
                    orderId: 316,
                    orderSn: "20200922435483",
                    orderStatusText: "已付款",
                    rules: {
                        addTime: "2020-09-21 16:19:21",
                        deleted: false,
                        discount: 1,
                        discountMember: 2,
                        expireTime: "2020-09-30 00:00:00",
                        goodsId: 1811093,
                        goodsName: "python好玩又好做的三个小案例",
                        id: 4,
                        picUrl: "https://devapis.oss-cn-zhangjiakou.aliyuncs.com/gyde96t49v3aa2huiux2.jpg",
                        status: 0,
                        updateTime: "2020-09-22 11:35:20",
                    },
                },
                {
                    actualPrice: 0.01,
                    creator: "胖子没有肉",
                    goodsList: [{
                        goodsName: "python好玩又好做的三个小案例",
                        id: 311,
                        number: 1,
                        picUrl: "https://devapis.oss-cn-zhangjiakou.aliyuncs.com/gyde96t49v3aa2huiux2.jpg",
                    }, ],
                    groupon: {
                        addTime: "2020-09-22 11:35:54",
                        creatorUserId: 33,
                        creatorUserTime: "2020-09-22 11:35:54",
                        deleted: false,
                        grouponId: 0,
                        id: 7,
                        orderId: 316,
                        rulesId: 4,
                        shareUrl: "https://devapis.oss-cn-zhangjiakou.aliyuncs.com/tpft4lszf5doxmg7jnkq.jpg",
                        status: 1,
                        updateTime: "2020-09-22 11:36:18",
                        userId: 33,
                    },
                    id: 7,
                    isCreator: true,
                    joinerCount: 1,
                    orderId: 316,
                    orderSn: "20200922435483",
                    orderStatusText: "已付款",
                    rules: {
                        addTime: "2020-09-21 16:19:21",
                        deleted: false,
                        discount: 1,
                        discountMember: 2,
                        expireTime: "2020-09-30 00:00:00",
                        goodsId: 1811093,
                        goodsName: "python好玩又好做的三个小案例",
                        id: 4,
                        picUrl: "https://devapis.oss-cn-zhangjiakou.aliyuncs.com/gyde96t49v3aa2huiux2.jpg",
                        status: 0,
                        updateTime: "2020-09-22 11:35:20",
                    },
                },
                {
                    actualPrice: 0.01,
                    creator: "胖子没有肉",
                    goodsList: [{
                        goodsName: "python好玩又好做的三个小案例",
                        id: 311,
                        number: 1,
                        picUrl: "https://devapis.oss-cn-zhangjiakou.aliyuncs.com/gyde96t49v3aa2huiux2.jpg",
                    }, ],
                    groupon: {
                        addTime: "2020-09-22 11:35:54",
                        creatorUserId: 33,
                        creatorUserTime: "2020-09-22 11:35:54",
                        deleted: false,
                        grouponId: 0,
                        id: 7,
                        orderId: 316,
                        rulesId: 4,
                        shareUrl: "https://devapis.oss-cn-zhangjiakou.aliyuncs.com/tpft4lszf5doxmg7jnkq.jpg",
                        status: 1,
                        updateTime: "2020-09-22 11:36:18",
                        userId: 33,
                    },
                    id: 7,
                    isCreator: true,
                    joinerCount: 1,
                    orderId: 316,
                    orderSn: "20200922435483",
                    orderStatusText: "已付款",
                    rules: {
                        addTime: "2020-09-21 16:19:21",
                        deleted: false,
                        discount: 1,
                        discountMember: 2,
                        expireTime: "2020-09-30 00:00:00",
                        goodsId: 1811093,
                        goodsName: "python好玩又好做的三个小案例",
                        id: 4,
                        picUrl: "https://devapis.oss-cn-zhangjiakou.aliyuncs.com/gyde96t49v3aa2huiux2.jpg",
                        status: 0,
                        updateTime: "2020-09-22 11:35:20",
                    },
                },
            ],
        };
    },

    methods: {
        changeTag(index) {
            this.tagChoose = index;
            this.getInfo();
        },
        getInfo() {
            this.$request
                .get(api.grouponMy, {
                    showType: this.tagChoose
                })
                .then((res) => {
                    if (res.errno == 0) {
                        this.orderList = res.data.list;
                    } else {
                        uni.showToast({
                            title: `${res.errmsg}`,
                            icon: "none",
                            duration: 1500,
                        });
                    }
                });
        },
    },
};
</script>

<style scoped>
.container {
    background-color: #f2f2f2;
    min-height: calc(100vh - 45px);
}

.top_flex {
    display: flex;
    background-color: #fff;
    height: 40px;
    line-height: 40px;
}

.nav_span {
    flex-grow: 1;
    text-align: center;
    font-size: 14px;
}

.nav_span:nth-child(1) {
    border: none;
}

.inner_span {
    height: calc(100% - 3px);
    display: inline-block;
}

.chooseTag {
    color: rgb(255, 20, 151);
    border-bottom: 3px solid rgb(255, 20, 151);
}

.bottom_content {
    text-align: center;
    margin-top: 5rem;
    color: rgb(153, 153, 153);
    font-size: 14px;
}

.bottom_content img {
    width: 160px;
}

.orders {
    height: auto;
    width: 100%;
    overflow: hidden;
}

.order {
    margin-top: 20rpx;
    background: #fff;
}

.pri,
.suc,
.dan,
.war {
    font-size: 12px;
    color: #fff;
    padding: 3px 5px;
    border-radius: 3px;
}

.pri {
    background-color: rgb(0, 122, 255);
}

.suc {
    background-color: rgb(103, 194, 58);
}

.dan {
    background-color: rgb(230, 67, 64);
}

.war {
    background-color: rgb(230, 162, 60);
}

.order .h {
    height: 83.3rpx;
    line-height: 83.3rpx;
    margin-left: 31.25rpx;
    padding-right: 31.25rpx;
    border-bottom: 1px solid #f4f4f4;
}

.order .h .l {
    float: left;
    color: rgb(255, 20, 151);
    font-size: 26rpx;
}

.order .h .r {
    float: right;
    color: rgb(255, 20, 151);
    font-size: 26rpx;
}

.order .i {
    height: 56rpx;
    line-height: 56rpx;
    margin-left: 31.25rpx;
    padding-right: 31.25rpx;
    border-bottom: 1px solid #f4f4f4;
}

.order .i .l {
    float: left;
    color: rgb(255, 20, 151);
    font-size: 26rpx;
}

.order .i .r {
    float: right;
    color: rgb(255, 20, 151);
    font-size: 26rpx;
}

.order .j {
    height: 56rpx;
    line-height: 56rpx;
    margin-left: 31.25rpx;
    padding-right: 31.25rpx;
}

.order .j .l {
    float: left;
    font-size: 26rpx;
    color: rgb(255, 20, 151);
}

.order .j .r {
    float: right;
    color: rgb(255, 20, 151);
    font-size: 26rpx;
}

.order .goods {
    display: flex;
    align-items: center;
    height: 199rpx;
    margin-left: 31.25rpx;
}

.order .goods .img {
    height: 145.83rpx;
    width: 145.83rpx;
    background: #f4f4f4;
}

.order .goods .img image {
    height: 145.83rpx;
    width: 145.83rpx;
}

.order .goods .info {
    height: 145.83rpx;
    flex: 1;
    padding-left: 20rpx;
}

.order .goods .name {
    margin-top: 30rpx;
    display: block;
    height: 44rpx;
    line-height: 44rpx;
    color: #333;
    font-size: 30rpx;
}

.order .goods .number {
    display: block;
    height: 37rpx;
    line-height: 37rpx;
    color: #666;
    font-size: 25rpx;
}

.order .goods .status {
    width: 105rpx;
    color: rgb(255, 20, 151);
    font-size: 25rpx;
}

.order .b {
    height: 103rpx;
    line-height: 103rpx;
    margin-left: 31.25rpx;
    padding-right: 31.25rpx;
    border-top: 1px solid #f4f4f4;
    font-size: 30rpx;
    color: #333;
}

.order .b .l {
    float: left;
}

.order .b .r {
    float: right;
}

.order .b .btn {
    margin-top: 19rpx;
    height: 64.5rpx;
    line-height: 64.5rpx;
    text-align: center;
    padding: 0 20rpx;
    border-radius: 5rpx;
    font-size: 28rpx;
    color: #fff;
    background: rgb(255, 20, 151);
}
</style>
