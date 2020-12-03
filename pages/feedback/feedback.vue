<template>
<view class="container">
    <view class="content">
        <view class="topSelect">
            <view class="title"> 反馈类型 </view>
            <xfl-select :list="list" :clearable="false" :showItemNum="5" :listShow="false" @change="changeSelect" :style_Container="'height: 40px; font-size: 16px;'" :placeholder="'选择反馈类型'" :initValue="'商品相关'" :selectHideType="'hideAll'">
            </xfl-select>
        </view>
        <view class="middle_content">
            <view class="title"> 反馈内容 </view>
            <view class="text">
                <textarea @blur="bindTextAreaBlur" maxlength="-1" placeholder="对我们网站、商品、服务，你还有什么建议吗？你还希望在商城上买到什么？请告诉我们..." />
            </view>
        </view>
        <view class="bottom_content">
            <view class="title"> 联系方式 </view>
            <view class="telephone">
                <input @input="onKeyInput" class="uni-input" type="number" placeholder="请输入联系方式" />
            </view>
        </view>
        <view class="bottom_btn">
            <button class="btn" type="primary" @click="submit">提交</button>
        </view>
    </view>
</view>
</template>

<script>
	import api from '@/pages/api/api.js'
import xflSelect from "@/components/xfl-select/xfl-select.vue";
export default {
    components: {
        xflSelect
    },
    data() {
        return {
            list: [
                //要展示的数据
                "商品相关",
                "功能异常",
                "优化建议",
                "其他",
            ],
            mobile: "",
            feedType: "商品相关",
            content: "",
        };
    },
    methods: {
        changeSelect(e) {
            console.log(e);
            this.feedType = e.newVal;
        },
        bindTextAreaBlur: function (e) {
            console.log(e.detail.value);
            this.content = e.detail.value;
        },
        onKeyInput(e) {
            this.mobile = e.target.value;
        },
        submit() {
            const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
            if (!this.feedType) {
                uni.showToast({
                    title: "请选择反馈类型",
                    duration: 1500,
                    icon: "none",
                });
                return;
            } else if (!this.content) {
                uni.showToast({
                    title: "请输入反馈内容",
                    duration: 1500,
                    icon: "none",
                });
                return;
            } else if (!this.mobile) {
                uni.showToast({
                    title: "请输入联系方式",
                    duration: 1500,
                    icon: "none",
                });
                return;
            } else if (!reg.test(this.mobile)) {
                uni.showToast({
                    title: "请输入正确的手机号码",
                    duration: 1500,
                    icon: "none",
                });
                return;
            } else {
                this.$request
                    .post(api.feedbackSubmit, {
                        mobile: this.mobile,
                        feedType: this.feedType,
                        content: this.content,
                    })
                    .then((res) => {
                        uni.showToast({
                            title: "感谢您的宝贵意见！",
                            icon: "none",
                        });
                        setTimeout(function () {
                            uni.navigateBack({
                                delta: 1,
                            });
                        }, 1000);
                    });
            }
        },
    },
};
</script>

<style scoped>
.container {
    background-color: #f2f2f2;
    min-height: calc(100vh - 45px);
}

.content {
    padding: 15px;
}

.title {
    font-size: 14px;
    padding: 15px 0;
    color: #969799;
}

.text {
    min-height: 30vh;
    background-color: #fff;
    padding: 15px;
}

uni-textarea {
    width: 100%;
    min-height: 29vh;
}

.uni-textarea-placeholder {
    overflow: inherit;
}

.uni-input {
    background-color: #fff;
    padding: 10px;
}

.btn {
    color: rgb(255, 255, 255);
    background: rgb(255, 20, 151);
    border-color: rgb(255, 20, 151);
    margin-top: 30px;
}

textarea {
    z-index: 99;
}
</style>
