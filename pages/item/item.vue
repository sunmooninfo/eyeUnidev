<template>
<view class="container">
    <view class="searchInput_view">
        <input type="text" @click="linkTo" class="searchInput" disabled="disabled" placeholder="商品搜索" />
    </view>
    <!-- <uni-search-bar @click="linkTo()" @input="input" placeholder="商品搜索" :cancelButton="'none'"></uni-search-bar> -->
    <view class="content">
        <view class="left">
            <ul>
                <li v-for="(item, index) in categoryList" :key="index" :class="{ active_nav: currentCategory.id == item.id }" @click="changeCatalog(item.id)">
                    {{ item.name }}
                </li>
            </ul>
        </view>
        <view class="right">
            <view class="img_top_view">
                <img class="top_img" :src="currentCategory.picUrl" />
            </view>
            <view class="middle_view"> ——{{ currentCategory.desc }}分类—— </view>
            <view @click="toItemList(item.id)" class="bottom_view" :key="i" v-for="(item, i) in currentSubCategoryList">
                <img :src="item.picUrl" :alt="item.name" />
                <view class="bottom_goodsName">
                    {{ item.name }}
                </view>
            </view>
        </view>
    </view>
</view>
</template>

<script>
	import api from '@/pages/api/api.js'
import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue";
export default {
    data() {
        return {
            categoryList: [],
            currentCategory: {},
            currentSubCategoryList: [],
        };
    },
    created() {
        this.getList();
    },
    methods: {
        // 获取商品列表
        getList() {
            this.$request.get(api.catalogIndex,{
				// #ifdef MP-WEIXIN
				isShown: true,
				// #endif
			}).then((res) => {
                if (res.errno == 0) {
                    let data = res.data;
                    this.categoryList = data.categoryList;
                    this.currentCategory = data.currentCategory;
                    this.currentSubCategoryList = data.currentSubCategory;
                } else {
                    uni.showToast({
                        title: `${res.errmsg}`,
                        duration: 1500,
                        icon: "none",
                    });
                }
            });
        },
        changeCatalog(id) {
            this.$request.get(api.catalogCurrent, {
                id: id,
				// #ifdef MP-WEIXIN
				isShown: true,
				// #endif
            }).then((res) => {
                if (res.errno == 0) {
                    let data = res.data;
                    this.currentCategory = data.currentCategory;
                    this.currentSubCategoryList = data.currentSubCategory;
                } else {
                    uni.showToast({
                        title: `${res.errmsg}`,
                        duration: 1500,
                        icon: "none",
                    });
                }
            });
        },
        // 搜索跳转
        linkTo() {
            console.log("111");
            uni.navigateTo({
                url: "/pages/item/search/search",
            });
        },
        toItemList(id) {
            uni.navigateTo({
                url: "/pages/item/category/category?keyword=&itemClass=" + id,
            });
        },
    },
    components: {
        uniSearchBar
    },
};
</script>

<style scoped>
.searchInput_view {
    padding: 0 10px;
    margin: 5px 0;
}

.searchInput_view .searchInput {
    background-color: #f7f8fa;
    height: 30px;
    border-radius: 2px;
    text-align: center;
    font-size: 14px;
}

.content {
    padding: 10px 0;
}

ul {
    padding: 0;
}

.left {
    display: inline-block;
    width: 100px;
    vertical-align: top;
}

.left ul li {
    list-style: none;
    text-align: center;
    height: 40px;
    line-height: 40px;
    color: #666;
    border-bottom: 1px solid #e5e5e5;
    font-size: 14px;
}

.left ul li.active_nav {
    color: #ff1493;
    font-size: 16px;
    border-left: 3px solid #ff1497;
    border-left-style: solid;
}

.right {
    display: inline-block;
    width: calc(100% - 100px);
}

.img_top_view {
    text-align: center;
}

.img_top_view img {
    display: inline-block;
    width: 250px;
    max-width: 250px;
    height: 88px;
}

.middle_view {
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
}

.bottom_view {
    width: 33%;
    height: 100px;
    text-align: center;
    display: inline-block;
    margin-bottom: 10px;
}

.bottom_view img {
    width: 70px;
    height: 70px;
}

.bottom_view .bottom_goodsName {
    font-size: 14px;
}
</style>
