<template>
<view class="container">
    <view style="background-color: #fff">
        <view class="top_flex">
            <span class="nav_span" v-for="(list, index) in navList" :key="index" :class="[tagChoose == index ? 'chooseTag' : '']" @click="changeTag(index)">{{ list }}</span>
        </view>
    </view>
    <view class="content_list">
        <view class="bottom_content" v-for="(coupon, index) in couponList" :key="index">
            <view class="left">
                <view class="price">
                    ¥ <span>{{ coupon.discount }} 元</span>
                </view>
                <view class="info"> {{ coupon.desc }} - {{ coupon.tag }} </view>
            </view>
            <view class="right">
                <view class="text">
                    {{ coupon.name }}
                </view>
                <view class="info"> 有效期至:{{ coupon.endTime }} </view>
            </view>
        </view>
    </view>
    <view class="no_more" v-if="show_noMore"> 没有更多了 </view>
</view>
</template>

<script>
	import api from '@/pages/api/api.js'	
export default {
    components: {},
    onLoad: function (e) {
        console.log(e);
        this.init();
    },
    data() {
        return {
            navList: ["未使用", "已使用", "已过期"],
            show_noMore: false,
            tagChoose: 0,
            couponList: [],
            page: 1,
            limit: 10,
            pages: "",
        };
    },
    onReachBottom() {
        if (this.pages <= this.page) {
            this.show_noMore = true;
            return false;
        }
        this.page += 1;
        this.getCouponList();
    },
    methods: {
        changeTag(index) {
            this.tagChoose = index;
            this.page = 1;
            this.couponList = [];
            this.show_noMore = false;
            this.getCouponList();
        },
        init() {
            this.page = 1;
            this.couponList = [];
            this.getCouponList();
        },
        getCouponList() {
            this.$request
                .get(api.couponMy, {
                    status: this.tagChoose,
                    page: this.page,
                    limit: this.limit,
                })
                .then((res) => {
                    this.couponList.push(...res.data.list);
                    this.pages = res.data.pages;
                    if (this.pages <= this.page) {
                        this.show_noMore = true;
                        // return false
                    }
                });
        },
    },
};
</script>

<style scoped>
.container {
    background-color: #f2f2f2;
    min-height: calc(100vh - 40px);
}

.top_flex {
    display: flex;
    background-color: #fff;
    height: 30px;
    line-height: 30px;
    border: 1px solid rgb(255, 20, 151);
    width: calc(100% - 30px);
    margin: 0 auto;
}

.nav_span {
    flex-grow: 1;
    text-align: center;
    font-size: 14px;
    border-left: 1px solid rgb(255, 20, 151);
    color: rgb(255, 20, 151);
}

.nav_span:nth-child(1) {
    border: none;
}

.chooseTag {
    color: #fff;
    background-color: rgb(255, 20, 151);
}

.content_list {
    background-color: #fff;
    padding: 15px;
}

.bottom_content {
    border: 1px solid rgb(255, 20, 151);
    padding: 20px 0 20px 15px;
    display: flex;
    border-radius: 5px;
    margin-bottom: 15px;
}

/* .bottom_content {
    width: 160px;
    height: 160px;
} */

.left,
.right {
    flex-grow: 1;
}

.left {
    min-width: 90px;
}

.left .price {
    font-size: 14px;
    color: rgb(255, 20, 151);
    height: 30px;
    line-height: 30px;
}

.price span {
    font-size: 22px;
    margin-left: 5px;
}

.left .info {
    font-size: 12px;
    color: #969799;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.right .text {
    font-size: 16px;
    height: 30px;
    line-height: 30px;
}

.right .info {
    font-size: 12px;
    color: #969799;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.no_more {
    text-align: center;
    font-size: 14px;
    padding: 15px 0 30px 0;
}
</style>
