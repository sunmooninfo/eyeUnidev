<template>
<view class="container">
    <view class="top">
        <scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
            <view @click="navClick(nav, index)" v-for="(nav, index) in navList" :key="index" class="scroll-view-item_H">
                <view class="nav_inner" :class="[nav_click == nav.id ? 'active_nav' : '']">
                    {{ nav.name }}
                </view>
            </view>
        </scroll-view>
    </view>
    <view class="middle">
        <view class="blod_text">{{ currentCategory.name }}</view>
        <view class="normal_text">{{ currentCategory.desc }}</view>
    </view>
    <view class="bottom">
        <view class="goods_item" v-for="(item, i) in goodsList" :key="i" @click="routerTo(item.id)" :class="[i % 2 == 1 ? 'noR' : 'marR']">
            <img :src="item.picUrl" alt="" />
            <view class="goods_name">{{ item.name }}</view>
            <view class="old_pay">折扣价: ¥ {{ item.retailPrice }}</view>
            <view class="new_pay">原价: ¥ {{ item.counterPrice }}</view>
        </view>
    </view>
</view>
</template>

<script>
	import api from '@/pages/api/api.js'
export default {
    onLoad: function (e) {
        console.log(e);
        if (e.itemClass) {
            this.categoryId = e.itemClass;
            this.nav_click = e.itemClass;
        }

        this.init();
    },
    created() {
        // this.init()
    },
    onReachBottom() {
        if (this.pages <= this.page) {
            return false;
        }
        this.page += 1;
        this.getGoodsList();
    },
    data() {
        return {
            categoryId: "",
            goodsList: [],
            page: 1,
            limit: 10,
            pages: 1,
            currentCategory: {},
            navList: [],
            navActive: 0,
            nav_click: 0,
        };
    },
    methods: {
        // 横向滚动
        scroll: function (e) {
            console.log(e);
            this.old.scrollTop = e.detail.scrollTop;
        },
        changeNav(index) {
            this.categoryId = this.navList[index].id;
            // uni.redirectTo({
            // 	url: '/pages/item/category?keyword=&itemClass='+ this.categoryId
            // });
            this.init();
        },
        init() {
            (this.page = 1),
            (this.limit = 10),
            (this.pages = 1),
            this.$request
                .get(api.goodsCategory, {
                    id: this.categoryId,
					// #ifdef MP-WEIXIN
					isShown: true,
					// #endif
                })
                .then((res) => {
                    this.navList = res.data.brotherCategory;
                    this.currentCategory = res.data.currentCategory;

                    // 当id是L1分类id时，这里需要重新设置成L1分类的一个子分类的id
                    if (res.data.parentCategory.id == this.categoryId) {
                        this.categoryId = res.data.currentCategory.id;
                    }

                    for (let i = 0; i < this.navList.length; i++) {
                        if (this.navList[i].id == this.categoryId) {
                            this.navActive = this.navList[i].id;
                            break;
                        }
                    }
                    if (this.nav_click != this.navActive) {
                        this.nav_click = this.navList[0].id;
                    }
                    this.page = 1;
                    this.goodsList = [];
                    this.getGoodsList();
                });
        },
        getGoodsList() {
            this.$request
                .get(api.goodsList, {
                    categoryId: this.categoryId,
                    page: this.page,
                    limit: this.limit,
					// #ifdef MP-WEIXIN
					isShown: true,
					// #endif
                })
                .then((res) => {
                    this.goodsList.push(...res.data.list);
                    this.pages = res.data.pages;
                });
        },
        navClick(nav, index) {
            this.nav_click = nav.id;
            this.categoryId = this.navList[index].id;
            this.init();
        },
        routerTo(id) {
            console.log(id);
            uni.navigateTo({
                url: "/pages/details/details?id=" + id,
            });
        },
    },
};
</script>

<style scoped>
.top {
    height: 50px;
    line-height: 50px;
}

.scroll-view_H {
    white-space: nowrap;
    /* width: 100%; */
    /* padding: 0 10px; */
}

.scroll-view-item_H {
    display: inline-block;
    width: auto;
    /* width: 80px; */
    font-size: 15px;
    text-align: center;
    margin-right: 10px;
}

.scroll-view-item_H .nav_inner {
    width: auto;
    padding: 0 5px;
    display: inline-block;
    height: 44px;
}

.active_nav {
    color: rgb(255, 20, 151);
    border-bottom: 2px solid rgb(255, 20, 151);
}

.middle {
    text-align: center;
    background: #eee;
    padding-bottom: 10px;
}

.blod_text {
    height: 40px;
    line-height: 40px;
    font-size: 22px;
}

.normal_text {
    color: #999;
    font-size: 16px;
}

.bottom {
    padding-top: 2rem;
    padding: 0 1%;
    background-color: #eee;
}

.goods_item {
    display: inline-block;
    width: 45%;
    text-align: center;
    padding: 2%;
    vertical-align: top;
    background-color: #fff;
}

.goods_item.marR {
    margin: 0 2% 3% 0;
}

.goods_item.noR {
    margin: 0 0 3% 0;
}

.goods_item img {
    display: inline-block;
    width: 100%;
    height: 45vw;
}

.goods_name {
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.old_pay {
    font-size: 14px;
    color: #ff1497;
}

.new_pay {
    font-size: 14px;
    color: #999;
    text-decoration: line-through;
}
</style>
