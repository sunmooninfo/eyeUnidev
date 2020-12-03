<template>
<view class="container">
    <scroll-view class="groupon-list" scroll-y="true" :scroll-top="scrollTop">
        <view class="item" v-for="(item, index) in grouponList" :key="index">
            <navigator :url="'/pages/details/details?id=' + item.id">
                <image class="img" :src="item.picUrl" background-size="cover"></image>
                <view class="right">
                    <view class="text">
                        <view class="header">
                            <text class="name">{{ item.name }}</text>
                            <span class="peopleNum">{{ item.grouponMember }}人成团</span>
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

        <!-- <view class="page" wx:if="{{showPage}}">

  <view class="prev {{ page <= 1 ? 'disabled' : ''}}" bindtap="prevPage">上一页</view>

  <view class="next {{ (count / limit) < page ? 'disabled' : ''}}" bindtap="nextPage">下一页</view>

</view> -->
        <uni-pagination @change="changePage" v-if="count && count > 0" title="标题文字" :total="count"></uni-pagination>
    </scroll-view>
</view>
</template>

<script>
	import api from '@/pages/api/api.js'
import uniPagination from "@/components/uni-pagination/uni-pagination.vue";
export default {
    onShow() {
        uni.showLoading({
            title: "请稍后",
        });
        this.getInfo();
    },
    components: {
        uniPagination
    },
    data() {
        return {
            page: 1,
            limit: 10,
            grouponList: [],
            count: 0,
            scrollTop: 0,
        };
    },

    methods: {
        changeTag(index) {
            this.tagChoose = index;
        },
        getInfo() {
            this.$request
                .get(api.grouponList, {
                    page: this.page,
                    limit: this.limit
                })
                .then((res) => {
                    if (res.errno == 0) {
                        uni.hideLoading();
                        this.grouponList = res.data.list;
                        this.count = res.data.total;
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
        changePage(e) {
            console.log(e);
            this.page = e.current;
            this.getInfo();
        },
    },
};
</script>

<style scoped>
.container {
    background-color: #f2f2f2;
    min-height: calc(100vh - 45px);
}

.groupon-list {
    width: 750rpx;
    height: 100%;
    overflow: hidden;
    background: #f4f4f4;
}

.groupon-list .item {
    height: 244rpx;
    width: 100%;
    background: #fff;
    margin-bottom: 20rpx;
}

.groupon-list .img {
    margin-top: 12rpx;
    margin-right: 12rpx;
    float: left;
    width: 220rpx;
    height: 220rpx;
}

.groupon-list .right {
    float: left;
    height: 244rpx;
    width: 476rpx;
    display: flex;
    flex-flow: row nowrap;
}

.groupon-list .text {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    height: 244rpx;
    width: 476rpx;
}

.groupon-list .name {
    /* float: left; */
    display: block;
    color: #333;
    line-height: 50rpx;
    font-size: 30rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.groupon-list .desc {
    width: 476rpx;
    display: block;
    color: #999;
    line-height: 50rpx;
    font-size: 25rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.groupon-list .price {
    width: 476rpx;
    display: flex;
    color: #ab956d;
    line-height: 50rpx;
    font-size: 33rpx;
}

.groupon-list .counterPrice {
    text-decoration: line-through;
    font-size: 28rpx;
    color: #999;
}

.groupon-list .retailPrice {
    margin-left: 30rpx;
    font-size: 28rpx;
    color: #a78845;
}

.page {
    width: 750rpx;
    height: 108rpx;
    background: #fff;
    margin-bottom: 20rpx;
}

.page view {
    height: 108rpx;
    width: 50%;
    float: left;
    font-size: 29rpx;
    color: #333;
    text-align: center;
    line-height: 108rpx;
}

.page .prev {
    border-right: 1px solid #d9d9d9;
}

.page .disabled {
    color: #ccc;
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
