<template>
<view class="container">
    <uni-search-bar @input="inputSearch" @confirm="confirmSearch" placeholder="商品搜索" :cancelButton="'none'"></uni-search-bar>
    <view class="search_text">
        <view class="left_btn">历史搜索</view>
        <view class="right_btn" @click="clearHistory">清空历史记录</view>
    </view>
    <view>
        <ul class="list_ul">
            <li v-for="(item, i) in list" :key="i" @click="toDetail(item.id)">
                <img class="list_img" :src="item.picUrl" alt="" />
                <view class="right_text">
                    <view class="top_title">{{ item.name }}</view>
                    <view class="top_other">{{ item.brief }}</view>
                    <view class="bottom_text">
                        <view class="retailPrice">¥{{ item.retailPrice }}</view>
                        <view class="counterPrice">¥{{ item.counterPrice }}</view>
                    </view>
                </view>
            </li>
        </ul>
    </view>
</view>
</template>

<script>
	import api from '@/pages/api/api.js'
import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue";
import uniCard from "@/components/uni-card/uni-card.vue";
export default {
    data() {
        return {
            keyword: "",
            focusStatus: true,
            wordHistory: [],
            list: [],
            page: 1,
            limit: 10,
            pages: 0,
        };
    },
    created() {},
    onReachBottom() {
        if (this.pages <= this.page) {
            return false;
        }
        this.page += 1;
        this.searchGoods();
    },
    methods: {
        inputSearch(e) {
            console.log(e.value);
        },
        // confirmSearch(e) {
        // 	console.log(e.value)
        // },
        confirmSearch(e) {
            this.keyword = e.value.trim();
            this.reset();
            this.searchGoods();
        },
        reset() {
            this.list = [];
            this.page = 1;
            this.limit = 10;
            this.total = 0;
        },
        searchGoods() {
            let data = {
                keyword: this.keyword,
                page: this.page,
                limit: this.limit,
                categoryId: 0,
				// #ifdef MP-WEIXIN
				isShown: true,
				// #endif
            };
            this.$request.get(api.goodsList, data).then((res) => {
                if (res.errno == 0) {
                    var data = res.data;
                    this.list.push(...data.list);
                    this.page = data.page;
                    this.limit = data.limit;
                    this.pages = data.pages;
                } else {
                    uni.showToast({
                        title: `${res.errmsg}`,
                        duration: 1500,
                        icon: "none",
                    });
                }
            });
        },
        clearHistory() {
            uni.showModal({
                title: "是否清空历史记录",
                confirmColor: "#ff1497",
                success: function (res) {
                    if (res.confirm) {
                        window.localStorage.setItem("keyword", "");
                        this.wordHistory = [];
                    } else if (res.cancel) {
                        console.log("用户点击取消");
                    }
                },
            });
        },
        toDetail(id) {
            console.log(id);
            uni.navigateTo({
                url: "/pages/details/details?id=" + id,
            });
        },
    },
    components: {
        uniSearchBar,
        uniCard
    },
};
</script>

<style scoped>
.search_text {
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    padding: 0 10px;
    color: #999;
}

.left_btn,
.right_btn {
    display: inline-block;
}

.right_btn {
    float: right;
    cursor: pointer;
}

.list_ul {
    padding: 10px;
}

.list_ul li {
    list-style: none;
    margin-bottom: 5px;
}

.list_img {
    display: inline-block;
    width: 88px;
    border-radius: 8px;
    height: 88px;
    margin-right: 10px;
}

.right_text {
    display: inline-block;
    vertical-align: top;
    width: calc(100% - 100px);
    height: 88px;
    position: relative;
}

.top_title,
.top_other,
.bottom_text {
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.top_other {
    color: #646566;
}

.bottom_text {
    position: absolute;
    bottom: 0;
}

.retailPrice,
.counterPrice {
    display: inline-block;
}

.counterPrice {
    text-decoration: line-through;
    font-size: 13px;
    color: #969799;
    margin-left: 3px;
}
</style>
