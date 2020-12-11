<template>
<view class="">
    <!-- <view v-if="isdisplay"> -->
    <view v-for="(item, i) in commentList" :key="i">
        <view class="contain_3">
            <view class="head">
                <view>{{ item.userInfo.nickName }}</view>
            </view>
            <view class="time">{{ item.addTime }}</view>
        </view>
        <view class="contxt">{{ item.content }}</view>
    </view>
    <view class="" style="text-align: center; font-size: 16px; margin-top: 1rem">
        没有更多了
    </view>
    <!-- </view> -->
</view>
</template>

<script>
	import api from '@/pages/api/api.js'
export default {
    onLoad(e) {
        this.listQuery.valueId = e.id;
    },
    data() {
        return {
            listQuery: {
                type: 1,
                valueId: 0,
                showType: 0,
                limit: 10,
                page: 1,
            },
            pages: "",
            // valueId: 0,
            commentList: [],
        };
    },
    mounted() {
        this.getCommentList();
    },
    onReachBottom() {
        if (this.pages <= this.listQuery.page) {
            return false;
        }
        this.listQuery.page += 1;
        this.getCommentList();
    },
    methods: {
        getCommentList() {
            let data = this.listQuery;
            this.$request.get(api.commentList, data).then((res) => {
                //   if(res.data.list.length > 0){
                // for(let i = 0; i , res.data.list.length; i++){
                // 	this.commentList.push(res.data.list[i])
                // }
                //     this.commentList.push(res.data.list)
                this.commentList.push(...res.data.list);
                this.isdisplay = true;
                this.pages = res.data.pages;
            });
        },
    },
};
</script>

<style scoped>
.contain_3 {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
}

.head {
    display: flex;
}

.head view {
    font-size: 16px;
    color: #333;
    margin-top: 0.2rem;
    margin-left: 0.5rem;
}

.head img,
.head image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.time {
    font-size: 12px;
}

.contxt {
    font-size: 16px;
    padding-left: 1.8rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #d9d9d9;
}
</style>
