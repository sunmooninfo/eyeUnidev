<template>
<view class="contanier">
    <view class="container1" v-for="(item, i) in list" :key="i">
        <view class="card">
            <view><img width="90px" :src="item.picUrl" alt="" /></view>
            <view class="con">
                <view>{{ item.name }}</view>
                <view>￥{{ item.retailPrice.toFixed(2) }}</view>
            </view>
        </view>
        <view class="pbtn">
            <button class="mini-btn" type="warn" @click="deletePrint(item, i)" size="mini">
                取消收藏
            </button>
            <button class="mini-btn btn" type="primary" size="mini" @click="toDetail(item.valueId)">
                查看详细
            </button>
        </view>
    </view>
</view>
</template>

<script>
	import api from '@/pages/api/api.js'
export default {
    data() {
        return {
            list: [],
            data: {
                limit: 10,
                page: 1,
                type: 0,
            },
            pages: 1,
        };
    },
    created() {
        this.getFavorite();
    },
    onReachBottom() {
        this.data.page++;
        if (this.data.page > this.pages) {
            return;
        }

        this.getFavorite();
    },
    methods: {
        getFavorite() {
            this.$request.get(api.collectList, this.data).then((res) => {
                if (res.errno == 0) {
                    console.log(res);
                    this.pages = res.data.pages;
                    this.list.push(...res.data.list);
                } else {
                    uni.showToast({
                        icon: "none",
                        title: `${res.errmsg}`,
                        duration: 1000,
                    });
                }
            });
        },
        deletePrint(item, i) {
            let data = {
                type: 0,
                valueId: item.valueId
            };
            this.$request.post(api.collectDelete, data).then((res) => {
                if (res.errno == 0) {
                    this.list.splice(i, 1);
                    uni.showToast({
                        title: "取消成功",
                        duration: 1500,
                    });
                } else {
                    uni.showToast({
                        icon: "none",
                        title: "取消失败",
                        duration: 1500,
                    });
                }
            });
        },
        toDetail(id) {
            uni.redirectTo({
                url: "/pages/details/details?id=" + id,
            });
        },
    },
};
</script>

<style scoped>
uni-button {
    position: relative;
    display: block;
    margin-left: 0;
    margin-right: 0;
    padding-left: 14px;
    padding-right: 14px;
    width: 4.4rem;
    box-sizing: border-box;
    font-size: 12px;
    text-align: center;
    text-decoration: none;
    line-height: 2.55555556;
    border-radius: 5px;
    -webkit-tap-highlight-color: transparent;
    overflow: hidden;
    /* color: #000; */
    /* background-color: #f8f8f8; */
    cursor: pointer;
}

.contanier {
    background: #eee;
    margin-left: 0;
    margin-right: 0;
}

.container1 {
    padding: 0.3rem;
    background: #fff;
    border: 1px solid #d9d9d9;
}

.pbtn {
    display: flex;
    margin-left: 10rem;
}

.btn {
    margin-left: 0.5rem;
}

.con {
    margin-left: 1rem;
}

.card {
    display: flex;
    align-items: center;
}

.card view {
    font-size: 14px;
    color: #646566;
}
</style>
