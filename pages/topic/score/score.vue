<template>
<view class="container">
    <view class="card">
        <img :src="topic.picUrl" alt="" />
        <view class="con">
            <view class="title">{{ topic.title }}</view>
            <view class="txt">{{ topic.subtitle }}</view>
        </view>
    </view>
    <view class="rate_1">
        <view>评分</view>
        <uni-rate class="rate_2" v-on:change="getValue" max="5" :value="value"></uni-rate>
        <view class="value">{{ Satisfaction }}</view>
    </view>
    <view class="rate_3">
        <view style="white-space: nowrap">评论</view>
        <textarea class="text" :value="content" @input="inputChange" type="text" placeholder="留言经过筛选后，对所有人可见"></textarea>
    </view>
    <view class="pbtn">
        <button class="small_btn" @click="cancel">取消</button>
        <button class="small_btn col" @click="publish">发表</button>
    </view>
</view>
</template>

<script>
	import api from '@/pages/api/api.js'
import uniRate from "@/components/uni-rate/uni-rate.vue";
export default {
    components: {
        uniRate
    },
    data() {
        return {
            value: 5,
            topic: {},
            Satisfaction: "非常满意",
            content: "",
        };
    },
    created() {
        this.getGoods();
    },
    onLoad: function (option) {
        let data = {
            id: option.id
        };
        this.$request.get(api.topicDetail, data).then((res) => {
            // this.topicRelated = res.data.list
            this.topic = res.data.topic;
            // console.log(res.data.topic)
        });
    },
    methods: {
        inputChange(e) {
            this.content = e.detail.value;
        },
        cancel() {
            uni.showModal({
                title: "提示",
                content: "是否要取消发布",
                success: function (res) {
                    if (res.confirm) {
                        uni.navigateBack({
                            delta: 1,
                        });
                    } else if (res.cancel) {}
                },
            });
        },
        publish() {
            if (this.content == "" || this.Satisfaction == "") {
                uni.showToast({
                    title: "请填写评论内容",
                    duration: 1500,
                    icon: "none",
                });
                return;
            } else {
                let data = this.getContent();
                this.$request
                    .post("comment/post", data)
                    .then((res) => {
                        uni.showToast({
                            title: "发表成功",
                            duration: 1500,
                        });
                        setTimeout(() => {
                            uni.navigateBack({
                                delta: 1,
                            });
                        }, 1500);
                    })
                    .catch((errno) => {
                        throw errno;
                    });
            }
        },
        getContent() {
            let id = this.topic.id;
            let star = this.value;
            let content = this.content;
            return {
                type: 1,
                valueId: id,
                star: star,
                content: content,
            };
        },
        getGoods() {
            // this.topic = JSON.parse(this.$route.query.goods)
        },
        getValue(data) {
            this.value = data.values;
            if (data.value == 1) {
                // Toast("非常不满意");
                this.Satisfaction = "非常不满意";
            } else if (data.value == 2) {
                // Toast("不满意")
                this.Satisfaction = "不满意";
            } else if (data.value == 3) {
                // Toast("一般")
                this.Satisfaction = "一般";
            } else if (data.value == 4) {
                // Toast("满意")
                this.Satisfaction = "满意";
            } else if (data.value == 5) {
                // Toast("非常满意")
                this.Satisfaction = "非常满意";
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.pbtn {
    display: flex;
    justify-content: space-between;
}

.small_btn {
    position: relative;
    display: block;
    margin-left: 0;
    margin-right: 0;
    padding-left: 14px;
    padding-right: 14px;
    box-sizing: border-box;
    font-size: 12px;
    text-align: center;
    text-decoration: none;
    line-height: 2.55555556;
    border-radius: 5px;
    -webkit-tap-highlight-color: transparent;
    overflow: hidden;
    color: #000;
    background-color: #f8f8f8;
    cursor: pointer;
}

.col {
    background-color: #ff1497;
    color: #fff;
}

.text {
    margin-left: 1rem;
    padding-right: 1rem;
}

.rate_3 {
    margin-top: 0.8rem;
    display: flex;
    // border-bottom: 1px solid #d9d9d9;
}

.value {
    margin-left: 1rem;
}

.rate_2 {
    margin-top: 0.6rem;
    margin-left: 1rem;
}

.rate_1 {
    margin-top: 1.5rem;
    display: flex;
}

.con {
    margin-left: 1rem;
}

.title {
    font-size: 14px;
}

.txt {
    color: rgb(51, 51, 51);
    font-size: 12px;
}

.card {
    display: flex;
    align-items: center;
}

.card img {
    width: 135px;
    height: 75px;
}

.container {
    padding: 1rem;
    border-top: 1px solid #d9d9d9;
}
</style>
