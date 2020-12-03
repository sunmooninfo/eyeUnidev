<template>
<view class="container">
    <view class="search">
        <input type="text" class="search" @click="linkTo" :placeholder="goodsCounts" />
    </view>
    <view class="uni-padding-wrap">
        <view class="page-section swiper">
            <view class="page-section-spacing">
                <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
                    <swiper-item v-for="(banner, index) in shopInfos.banner" :key="index">
                        <navigator :url="banner.link" open-type="navigate">
                            <view class="swiper_img">
                                <img :src="banner.url" alt="" />
                            </view>
                        </navigator>
                    </swiper-item>
                </swiper>
            </view>
        </view>
    </view>
    <view class="icon_img">
        <view class="icon_p" v-for="(channel, index) in shopInfos.channel" :key="index">
            <navigator :url="`../item/category/category?itemClass=` + channel.id" open-type="navigate">
                <img :src="channel.iconUrl" alt="" />
                <view>{{ channel.name }}</view>
            </navigator>
        </view>
    </view>
    <view class="imageList">
        <view class="_box1" v-for="(newGood, index) in shopInfos.newGoodsList" :key="index">
            <navigator :url="`../details/details?id=${newGood.id}`" open-type="navigate">
                <img :src="newGood.picUrl" alt="" />
                <view class="txtname1">{{ newGood.name }}</view>
                <view class="dprice">折扣价：￥{{ newGood.retailPrice }}</view>
                <view class="cprice">原价：￥{{ newGood.counterPrice }}</view>
            </navigator>
        </view>
    </view>
    <view class="van-coupon-item" v-for="(coupon, index) in shopInfos.couponList" :key="index" @click="getCoupon(coupon.id)">
        <view class="van-coupon-item__content">
            <view class="van-coupon-item__head">
                <h2>
                    <span>¥</span>
                    {{ coupon.discount }} 元
                </h2>
                <p>{{ coupon.desc }} - {{ coupon.tag }}</p>
            </view>
            <view class="van-coupon-item__body">
                <h2>{{ coupon.name }}</h2>
                <p>有效期：{{ coupon.days }} 天</p>
            </view>
            <view class="receive">点击领取</view>
        </view>
    </view>

    <view class="a-section a-groupon" v-if="shopInfos.grouponList && shopInfos.grouponList.length > 0">
        <view class="h">
            <view class="title">
                <view>
                    <navigator url="/pages/userGroupon/grouponList">
                        <text class="txt">团购专区</text>
                    </navigator>
                </view>
            </view>
        </view>
        <view class="b">
            <view class="item" v-for="(item, index) in shopInfos.grouponList" :key="index">
                <navigator :url="'/pages/details/details?id=' + item.id">
                    <image class="img" :src="item.picUrl" background-size="cover"></image>
                    <view class="right">
                        <view class="text">
                            <view class="header">
                                <text class="name">{{ item.name }}</text>
                                <span class="peopleNum">{{ item.grouponMember }}人成团</span>
                                <!-- <van-tag type="primary">{{item.grouponMember}}人成团</van-tag> -->
                            </view>
                            <view class="expire">
                                <span class="lastTime">截止时间 {{ item.expireTime }}</span>
                                <!-- <van-tag round type="warning">有效期至 {{item.expireTime}}</van-tag> -->
                            </view>
                            <text class="desc">{{ item.brief }}</text>
                            <view class="price">
                                <view class="counterPrice">现价：￥{{ item.retailPrice }}</view>
                                <view class="retailPrice">团购价：￥{{ item.grouponPrice }}</view>
                            </view>
                        </view>
                    </view>
                </navigator>
            </view>
        </view>
    </view>

    <view>
        <view class="title">秒杀商品</view>
        <view class="card_img">
            <view class="card_child" v-for="(killGoods, index) in shopInfos.killGoodsList" :key="index" :class="[index % 2 == 1 ? 'noR' : 'marR']">
                <navigator :url="`../details/details?id=${killGoods.id}`" open-type="navigate">
                    <view style="border: 1px solid #eee; padding: 3%">
                        <img :src="killGoods.picUrl" alt="" />
                        <view class="card_name">{{ killGoods.name }}</view>
                        <view class="card_zprice">秒杀价：￥{{ killGoods.retailPrice }}</view>
                        <view class="card_yprice">原价：￥{{ killGoods.counterPrice }}</view>
                    </view>
                </navigator>
            </view>
        </view>
    </view>
	<view>
	    <view class="title">爆卖热品</view>
	    <view class="card_img">
	        <view class="card_child" v-for="(groupGood, index) in shopInfos.hotGoodsList" :key="index" :class="[index % 2 == 1 ? 'noR' : 'marR']">
	            <navigator :url="`../details/details?id=${groupGood.id}`" open-type="navigate">
	                <view style="border: 1px solid #eee; padding: 3%">
	                    <img :src="groupGood.picUrl" alt="" />
	                    <view class="card_name">{{ groupGood.name }}</view>
	                    <view class="card_zprice">折扣价：￥{{ groupGood.retailPrice }}</view>
	                    <view class="card_yprice">原价：￥{{ groupGood.counterPrice }}</view>
	                </view>
	            </navigator>
	        </view>
	    </view>
	</view>
    <view class="txt" style="margin-bottom: 15px">
        <view>专题文章</view>
    </view>
    <view class="imageList-2">
        <view class="_box" v-for="(topic, index) in shopInfos.topicList" :key="index">
            <navigator :url="`../topic/topic?id=${topic.id}`" open-type="navigate">
                <img :src="topic.picUrl" alt="" />
                <view class="txtname">{{ topic.title }}
                    <span style="color: #ff1497">￥{{ topic.price }}元起</span>
                </view>
                <view class="txttitle"> {{ topic.subtitle }}</view>
            </navigator>
        </view>
    </view>
</view>
</template>

<script>
	import api from '@/pages/api/api.js'
export default {
    onShareAppMessage(res) {
        return {
            title: "分享给朋友",
            path: "pages/index/index",
        };
    },
    data() {
        return {
            indicatorDots: true,
            autoplay: true,
            interval: 2000,
            duration: 500,
            shopInfos: [],
            goodsCounts: "",
        };
    },
    created() {
        this.getHome();
        this.goodsCount();
    },
    onShow() {
        this.getHome();
        this.goodsCount();
    },
    methods: {
        getCoupon(id) {
            let data = {
                couponId: id,
            };
            let that = this;
            this.$request.post(api.couponRecrive, data).then((res) => {
                if (res.errno == 0) {
                    uni.showToast({
                        title: `领取成功`,
                        duration: 1500,
                    });
                }
                setTimeout(function () {
                    that.getHome();
                }, 1500);
                // if(res.errno == 740){
                // 	uni.showToast({
                // 		title: `您已经领取`,
                // 		duration: 1500
                // 	})
                // }
            });
        },
        getHome() {
			// #ifdef MP-WEIXIN
            this.$request.get(api.homeIndex,{isShown:true}).then((res) => {
                this.shopInfos = res.data;
            });
			// #endif
			// #ifndef MP-WEIXIN
			this.$request.get(api.homeIndex).then((res) => {
			    this.shopInfos = res.data;
			});
			// #endif
        },
        goodsCount() {
            this.$request.get(api.goodsCount).then((res) => {
                this.goodsCounts = `商品搜索，共有${res.data}件优品`;
            });
        },
        // 搜索跳转
        linkTo() {
            console.log("111");
            uni.navigateTo({
                url: "/pages/item/search/search",
            });
        },
    },
};
</script>

<style scoped>
.imageList-2 {
    overflow-x: auto;
    overflow-y: hidden;
    height: 200px;
    /* width: 100%; */
    padding: 20upx;
    white-space: nowrap;
    margin-bottom: 15px;
    background: #fff;
    /* width: 95%; */
    /* margin-left: 2.5%; */
}

.imageList-2 img {
    width: 250px;
    height: 150px;
    margin-right: 10px;
}

.card_yprice {
    font-size: 12px;
    color: #999;
    text-decoration: line-through;
}

.card_zprice {
    font-size: 14px;
    color: #ff1497;
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

.card_child {
    display: inline-block;
    width: 49%;
    /* margin: 0 2% 2% 0; */
    background-color: #fff;
}

.card_child img {
    width: 300upx;
    height: 300upx;
}

.card_img {
    padding: 20upx;
    /* background: #fff; */
    text-align: center;
}

.title {
    color: #ff1497;
    text-align: center;
    font-size: 32upx;
    margin-bottom: 15px;
}

.van-coupon-item {
    margin-top: 30upx;
    overflow: hidden;
    margin: 0 15px 15px;
    background-color: #fff;
    -webkit-box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}

.van-coupon-item:active {
    background-color: #e8e8e8;
}

.van-coupon-item__content {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 100px;
    padding: 24px 0 0 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: linear-gradient(to right, #ff1493, #ffe3f2);
}

.receive {
    margin-top: 30upx;
    margin-left: 30upx;
    font-size: 32upx;
    color: #ff1497;
}

.van-coupon-item h2,
.van-coupon-item p {
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #fff;
}

.van-coupon-item h2 {
    height: 34px;
    font-weight: 500;
    line-height: 34px;
}

.van-coupon-item p {
    font-size: 12px;
    line-height: 16px;
    color: #fff;
}

.imageList {
    padding: 10upx;
    overflow-x: auto;
    overflow-y: hidden;
    /* height:300upx; */
    /* width: 100%; */
    white-space: nowrap;
    margin-bottom: 40upx;
    background: #fff;
    margin-top: 10upx;
}

.txtname1 {
    margin-top: 10px;
    font-size: 12px;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

._box {
    display: inline-block;
    height: 150px;
}

.txtname {
    margin-top: 10px;
    font-size: 12px;
    overflow: hidden;
}

.txt {
    text-align: center;
    margin-top: 1rem;
}

.txttitle {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 250px;
}

._box1 {
    border-right: 1.5px solid #f2f2f2;
    border-bottom: 1.5px solid #f2f2f2;
    display: inline-block;
    /* height: 150upx; */
    text-align: center;
    margin-left: 3px;
}

._box1 img {
    height: 200upx;
    width: 200upx;
}

.cprice {
    font-size: 12px;
    color: rgb(153, 153, 153);
    text-decoration: line-through;
}

.hotgoodsimg {
    width: 90%;
    max-height: 150upx;
}

.dprice {
    color: #ff1497;
    font-size: 32upx;
}

.icon_p {
    width: 25%;
    flex-grow: 1;
    /* word-break: break-word; */
    margin-top: 10px;
}

.icon_p view {
    font-size: 24upx;
}

.icon_p img {
    width: 60upx;
    height: 60upx;
}

.icon_img {
    padding: 20upx;
    display: flex;
    justify-content: space-between;
    background: #fff;
    text-align: center;
    flex-wrap: wrap;
}

.swiper_img img {
    width: 100%;
    /* height: 100%; */
}

.swiper {
    height: 420upx;
}

.search input {
    border: 3rpx solid #eee;
    border-radius: 10rpx;
    background: #fff;
    padding: 10rpx;
}

.container {
    background: #f2f2f2;
}

.search {
    padding: 20rpx;
}

.noR {
    margin: 0 0 2% 0;
}

.marR {
    margin: 0 2% 2% 0;
}

/* 团购 */
.a-section {
    width: 750rpx;
    height: auto;
    overflow: hidden;
    background: #fff;
    color: #333;
    margin-top: 20rpx;
}

.a-section .h {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    height: 130rpx;
}

.a-section .h .txt {
    padding-right: 30rpx;
    background-size: 16.656rpx 27rpx;
    display: inline-block;
    height: 36rpx;
    font-size: 33rpx;
    line-height: 36rpx;
}

.a-brand .b {
    width: 750rpx;
    height: auto;
    overflow: hidden;
    position: relative;
}

.a-groupon {
    width: 750rpx;
    height: auto;
    overflow: hidden;
    margin-bottom: 10px;
}

.a-groupon .b .item {
    border-top: 1px solid #d9d9d9;
    margin: 0 20rpx;
    height: 260rpx;
    width: 710rpx;
}

.a-groupon .b .img {
    margin-top: 12rpx;
    margin-right: 12rpx;
    float: left;
    width: 220rpx;
    height: 220rpx;
}

.a-groupon .b .right {
    float: left;
    height: 244rpx;
    width: 476rpx;
    display: flex;
    flex-flow: row nowrap;
}

.a-groupon .b .text {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    height: 244rpx;
    width: 476rpx;
}

.a-groupon .b .name {
    /* float: left; */
    display: block;
    color: #333;
    line-height: 50rpx;
    font-size: 30rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.a-groupon .b .desc {
    width: 476rpx;
    display: block;
    color: #999;
    line-height: 50rpx;
    font-size: 25rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.a-groupon .b .price {
    width: 476rpx;
    display: flex;
    color: #ab956d;
    line-height: 40rpx;
    font-size: 33rpx;
}

.a-groupon .b .counterPrice {
    text-decoration: line-through;
    font-size: 28rpx;
    color: #999;
}

.a-groupon .b .retailPrice {
    margin-left: 30rpx;
    font-size: 28rpx;
    color: #a78845;
}

.peopleNum {
    display: inline-block;
    font-size: 12px;
    vertical-align: middle;
    background: rgb(25, 137, 250);
    color: #fff;
    padding: 2px 5px;
    border-radius: 3px;
}

.lastTime {
    color: #fff;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 12px;
    background-color: rgb(255, 151, 106);
}
</style>
