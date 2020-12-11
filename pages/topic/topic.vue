<template>
<view>
    <view v-for="(item, i) in goods" :key="i" class="header">
        <view class="title">优品推荐</view>
        <view>
            <view class="card">
                <image :src="item.picUrl" mode=""></image>
                <view class="contain">
                    <view class="title_2">{{ item.name }}</view>
                    <view class="price">￥{{ item.retailPrice.toFixed(2) }}</view>
                </view>
            </view>
        </view>
        <view>
            <button class="btn" @click="toDetails">查看详细</button>
        </view>
    </view>
    <view class="body">
        <view class="contain_2">
            <view>精选留言</view>
            <view>
                <image @click="score" :src="imgList.img1" mode=""></image>
            </view>
        </view>
        <view v-if="isdisplay">
            <view v-for="(item, i) in commentList" :key="i">
                <view class="contain_3">
                    <view class="head">
                        <view>{{ item.userInfo.nickName }}</view>
                    </view>
                    <view class="time">{{ item.addTime }}</view>
                </view>
                <view class="contxt">{{ item.content }}</view>
            </view>
        </view>
        <view v-if="!isdisplay" class="box-floor-2">
            <image :src="imgList.img2" mode=""></image>
            <view>等你来留言</view>
        </view>
        <navigator :url="`./more/more?id=` + id">
            <view class="more">查看更多</view>
        </navigator>
    </view>
    <view>
        <rich-text :nodes="nodes"></rich-text>
    </view>
    <view>
        <view class="moretitle_1">更多相关</view>
        <view class="morebox">
            <view class="morebox-1" v-for="(item, i) in topicRelated" :key="i">
                <navigator :url="`../topic/topic?id=${item.id}`" open-type="navigate">
                    <!-- <img  class="moreimg" :src="item.picUrl" alt=""> -->
                    <image class="moreimg" :src="item.picUrl" mode=""></image>
                    <view class="moretitle">{{ item.title }}</view>
                </navigator>
            </view>
        </view>
    </view>
</view>
</template>

<script>
	import api from '@/pages/api/api.js'
export default {
    data() {
        return {
            imgList: {
                img1: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAAAAAA7VNdtAAAA5klEQVRIx+3WuQrCQBAGYJ92ErUS8gqKR7ytrKzs7CyDIsaDiOKFL2FtdF10nAQCRonuIFjlr37Y/WC2GTaB7CRiohZpCSaRLSgLFpFNAO0QIhmISlt6okFiEB4sUnRudHqtkxiiGuneAzHCdxL5DlEjMUYGEVUSNjKIqADoE2QQYZKYes1RJJcSiZnXxroa8cXca5YGSsQXzsuFj+RcJLFABjkXAJJLZBCXRCoQSsTNk1ghg7g5EmtkkFOWxAYZxBdb5JCeBqkdsogJ6T3ySN8+IpO8JyYxUdr8T/mdGN+FEf8u/kceO7+9RChCn34AAAAASUVORK5CYII=",
                img2: "data:image/png;base64,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",
            },
            img: "",
            goods: [],
            id: 0,
            nodes: "",
            detailsId: 0,
            commentList: [],
            content: "",
            topicRelated: [],
            isdisplay: false,
            topic: {},
        };
    },
    onLoad: function (option) {
        this.id = option.id;
        this.getGoods();
        this.getComment();
        this.getTopicRelated();
    },
    methods: {
        toDetails() {
            uni.navigateTo({
                url: `../details/details?id=${this.detailsId}`,
            });
        },
        getGoods() {
            let data = {
                id: this.id
            };
            this.$request.get(api.topicDetail, data).then((res) => {
                this.topic = res.data.topic;
                if (res.data.goods[0]) {
                    this.detailsId = res.data.goods[0].id;
                }
                let that = this;
                // console.log(res)
                that.nodes = res.data.topic.content
                    .replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/gi, "<p")
                    .replace(/<p>/gi, '<p  style="font-size:  15px; line-height: 25px;">')
                    .replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/gi, "<img$1")
                    .replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/gi, "<img$1")
                    .replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/gi, "<img$1")
                    .replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/gi, "<img$1")
                    .replace(
                        /<img([\s\w"-=\/\.:;]+)/gi,
                        '<img style="width: 100%; height:auto;" $1'
                    );
                // this.content = res.data.topic.content
                this.goods = res.data.goods;
                // setTimeout(function(){ that.onEditorReady()}, 1000);
            });
        },
        getComment() {
            let data = this.getUserComment();
            this.$request.get(api.commentList, data).then((res) => {
                if (res.data.list.length > 0) {
                    this.commentList = res.data.list;
                    this.isdisplay = true;
                }
            });
        },
        getTopicRelated() {
            let data = {
                id: this.id
            };
            this.$request.get(api.topicRelated, data).then((res) => {
                this.topicRelated = res.data.list;
            });
        },
        score() {
            uni.navigateTo({
                url: `./score/score?id=${this.id}`,
            });
        },
        getUserComment() {
            let type = 1;
            let valueId = this.id;
            let showType = 0;
            let limit = 2;
            let page = 1;
            return {
                type: type,
                valueId: valueId,
                showType: showType,
                limit: limit,
                page: page,
            };
        },
        // onEditorReady() {
        //   uni.createSelectorQuery().select('#editor').context((res) => {
        // 	this.editorCtx = res.context
        // 		 this.editorCtx.setContents({
        // 		html:this.content
        // 		})
        // 	  // this.editorCtx = this.goods.info.detail
        //   }).exec()
        // },
    },
};
</script>

<style lang="scss" scoped>
.card img {
    width: 88px;
    height: 88px;
}

.card image {
    width: 88px;
    height: 88px;
}

.box-floor-2 {
    margin-top: 1rem;
    height: 8rem;
}

.box-floor-2 img,
.box-floor-2 image {
    width: 4rem;
    height: 4rem;
    margin: 0 auto;
    display: block;
    text-align: center;
}

.box-floor-2 view {
    text-align: center;
    color: #7f7f7f;
}

.moretitle_1 {
    margin-top: 1rem;
    padding-top: 1rem;
    text-align: center;
    border-top: 1px solid #d9d9d9;
}

.moreimg {
    width: 100%;
    height: 200px;
}

.moretitle {
    color: #333;
    margin-top: 0.5rem;
    font-size: 14px;
}

.morebox-1 {
    background: #fff;
    margin-top: 1rem;
    padding: 1rem;
}

.morebox {
    padding: 0 1rem 1rem 1rem;
}

.more {
    text-align: center;
    padding: 0.5rem;
    border-bottom: 1px solid #eee;
}

.topic-detail {
    margin-top: 10px;

    /deep/ p {
        margin-block-start: 0 !important;
        margin-block-end: 0 !important;
    }

    /deep/ img,
    /deep/ image {
        max-width: 100%;
        width: 100% !important;
        height: 100% !important;
        display: block;
    }
}

rich-text {
    margin-top: 10px;

    /deep/ p {
        margin-block-start: 0 !important;
        margin-block-end: 0 !important;
    }

    /deep/ img,
    /deep/ image {
        max-width: 100%;
        width: 100% !important;
        height: 100% !important;
        display: block;
    }
}

.body {
    padding-left: 1%;
    padding-right: 1%;
}

.head {
    display: flex;
}

.contxt {
    font-size: 16px;
    padding-left: 1.8rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #d9d9d9;
}

.time {
    font-size: 12px;
}

.contain_3 {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
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

.contain_2 {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    padding: 0.6rem;
    border-bottom: 1px solid #d9d9d9;
}

.contain_2 img,
.contain_2 image {
    width: 1.5rem;
    height: 1.5rem;
}

.card {
    display: flex;
}

.header {
    font-size: 16px;
    border-bottom: 1px solid #eee;
}

.title {
    padding: 0.6rem;
    border-bottom: 1px solid #eee;
}

.card {
    padding: 0.6rem;
}

.card img,
.card image {
    border-radius: 0.5rem;
}

.title_2 {
    font-size: 14px;
    color: #323233;
}

.price {
    font-size: 12px;
    color: #323233;
}

.contain {
    margin-top: 1rem;
    margin-left: 0.7rem;
}

.btn {
    float: right;
    width: 5rem;
    font-size: 12px;
    margin-right: 1rem;
    margin-top: -2.2rem;
}

/deep/ #editor.ql-container,
/deep/ #editor.ql-container img {
    height: auto;
    display: block;
}
</style>
