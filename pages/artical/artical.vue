<template>
<view class="container">
<!--    <view class="searchInput_view">
        <input type="text" @click="linkTo" class="searchInput" disabled="disabled" placeholder="商品搜索" />
    </view> -->
    <!-- <uni-search-bar @click="linkTo()" @input="input" placeholder="商品搜索" :cancelButton="'none'"></uni-search-bar> -->
    <view class="content">
        <view class="left">
            <ul>
                <li v-for="(item, index) in categoryList" :key="index" :class="{ active_nav: currentID == item.value }" @click="changeCatalog(item)">
					<span>{{ item.label }}</span>
                </li>
            </ul>
        </view>
        <view class="right">
            <view class="img_top_view">
                <img class="top_img" :src="leavePic" />
            </view>
            <view class="middle_view"> —— {{ leaveText }} —— </view>
			<view v-if='leaveText == "证书列表"'>
				<view @click="toItemList(item,'img')" class="bottom_view" :key="i" v-for="(item, i) in articalList">
				    <img :src="item.url" :alt="item.name" />
					<view class="bottom_goodsName">
					    {{ item.name }}
					</view>
				</view>
			</view>
			<view v-else>
				<view @click="toItemList(item)" class="bottom_view" :key="i" v-for="(item, i) in articalList">
				    <img :src="item.picUrl" :alt="item.label" />
				    <view class="bottom_goodsName" v-if="item.level">
				        {{ item.name }}
				    </view>
					<view class="bottom_goodsName" v-else-if>
					    {{ item.title }}
					</view>
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
			currentID: '',
			articalList: '',
			leaveText: '文章',
			leavePic: ''
        };
    },
    created() {
        this.getList();
    },
    methods: {
        // 获取一级类目列表
        getList() {
            this.$request.get(api.articalIndex).then((res) => {
                if (res.errno == 0) {
                    let data = res.data;
					console.log(data)
					for (var key in data) {
						if ((data[key].linkValue == 0 && data[key].inLink == '/') || (data[key].linkValue == 0 && data[key].inLink == '/contactus')) {
							data.splice(Number(key), 1)
						}  
					}
					this.categoryList = data
					console.log(this.categoryList)
                    // this.currentID = this.currentID ? this.currentID : this.categoryList[0].value
					for (var key in this.categoryList) {
						if (this.categoryList[key].linkValue == 0) {
							this.changeCatalog(this.categoryList[key])
							break
						}
					}
				} else {
                    uni.showToast({
                        title: `${res.errmsg}`,
                        duration: 1500,
                        icon: "none",
                    });
                }
            });
        },
        changeCatalog(item) {
			// location.href = 'https://www.baidu.com'
			if (item.linkValue == 1) {
				uni.navigateTo({
				    url: "/pages/webview/webview?src=" + item.outLink,
				});
			} else {
				if (item.inLink == '/news' || item.inLink == '/about') {
					this.articalList = item.articleList
					this.leaveText = '文章列表'
				} else if (item.inLink == '/credential') {
					this.leaveText = '证书列表'
					this.getCertificate()
					
				} else {
					// this.articalList = item.children
					this.leaveText = '文章分类'
				}
				this.currentID = item.value
				this.$request.get(api.articalCurrent, {
				    id: item.value
				}).then((res) => { 
				    if (res.errno == 0) {
				        let data = res.data;
						if(item.inLink == '/product') {
							this.articalList = data.categoryList
						}
						this.leavePic = data.category.iconUrl
						
				    //     this.currentCategory = data.currentCategory;
				    //     this.currentSubCategoryList = data.currentSubCategory;
				    } else {
				        uni.showToast({
				            title: `${res.errmsg}`,
				            duration: 1500,
				            icon: "none",
				        });
				    }
				});
			}
			
        },
        // 获取证书列表
		getCertificate() {
			this.$request.get(api.articalCertificate).then((res) => {
			    if (res.errno == 0) {
			        let data = res.data;
					this.articalList = JSON.parse(res.data.certificate) 
					
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
        toItemList(item,url) {
			if (url == 'img') {
				uni.setStorageSync("certificateImg", item.url);
				uni.navigateTo({
				    url: "/pages/artical/artDetail?name=" + item.name,
				});
			} else {
				if (item.level) {
					uni.navigateTo({
					    url: "/pages/artical/artClassify?id=" + item.id + '&levelId=' + this.currentID,
					});
				} else {
					uni.navigateTo({
					    url: "/pages/artical/artDetail?id=" + item.id,
					});
				}
				
			}
            
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
    width: 49%;
    height: 140px;
    text-align: center;
    display: inline-block;
    margin-bottom: 10px;
}

.bottom_view img {
    width: 120px;
    height: 120px;
}

.bottom_view .bottom_goodsName {
    font-size: 14px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	padding: 0 5px; 
}
</style>
