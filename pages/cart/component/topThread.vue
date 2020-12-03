<template>
<view class="topThread">
    <uni-notice-bar showIcon="true" scrollable="true" single="true" :text="text" moreText="查看更多" :showGetMore="true" @getmore="getMore"></uni-notice-bar>
    <!-- 判断请求的数据是否有值  -->
    <template v-if="commodity.length <= 0 ? true : false">
        <view class="empty">
            <view class="back-img">
                <image mode="widthFix" src="/static/images/cart.png" alt="空购物车"></image>
                <view>呜呜呜~主人快来填 <br />
                    满我吧(；´д｀)ゞ</view>
            </view>
        </view>
    </template>
    <template v-else>
        <view class="buy">
            <!-- 商品list -->

            <view class="buy-list" v-for="(item, index) in commodity" :key="index">
                <view class="list">
                    <checkbox-group @change="checkboxChange(item)">
                        <checkbox :value="'' + item.productId" :checked="item.checked" />
                    </checkbox-group>
                    <view class="list-bottom">
                        <image mode="widthFix" :src="item.picUrl" alt=""></image>
                        <view class="clear"></view>
                        <view class="definite">
                            <view class="goods">
                                <text>{{ item.goodsName }}</text>
                            </view>
                            <view v-if="compileText">
                                <text>{{ item.specifications[0] }}</text>
                                <text>￥{{ item.price }}</text>
                                <text>x{{ item.number }}</text>
                            </view>
                            <view v-else style="margin-top: 15px">
                                <!-- 购物车数字输入框 -->
                                <wm-numberBox @change="stepperEvent" :value="item.number" :ID="item.id" :goodsId="item.goodsId" :productId="item.productId"></wm-numberBox>
                                <!-- 删除按钮 -->
                                <button hover-class="none" size="mini" @click="remove(item)" class="deleteBtn" type="warn">
                                    删除
                                </button>
                            </view>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 占位div -->
            <view style="height: 50px; background-color: #ffffff"></view>
            <!-- 商品结算台counter -->
            <view class="counter">
                <view class="money">
                    <!-- 全选 -->
                    <checkbox-group @change="changeBook">
                        <checkbox :checked="allFlag" /><text>全选({{counter.checkedGoodsCount.length <= 0 ? counter.goodsCount: counter.checkedGoodsCount}})</text>
                    </checkbox-group>
                    <text>￥{{counter.checkedGoodsAmount.length <= 0? counter.goodsAmount: counter.checkedGoodsAmount}}</text>
                </view>
                <view class="btn">
                    <button @click="compile" size="mini" type="primary" plain="true">
                        {{ compileText ? "编辑" : "完成" }}
                    </button>
                    <button @click="decision" size="mini" type="primary" plain="true">
                        {{ compileText ? "下单" : "删除" }}
                    </button>
                </view>
            </view>
        </view>
    </template>
</view>
</template>

<script>
import api from '@/pages/api/api.js'
import wmNumberBox from "@/components/wm-numberBox/wm-number-box.vue";
//广播跑马灯插件
import uniNoticeBar from "@/components/uni-notice-bar/uni-notice-bar.vue";
export default {
    data() {
        return {
            buy: null,
            allFlag: true, //全选值
            compileText: true,
            text: "○ 专为18-27定制 ○ 你提要求,我来满足 ○ 多快好省有好玩", // 通告栏文字
        };
    },
    props: ["commodity", "counter"],
    onLoad() {},
    components: {
        wmNumberBox,
        uniNoticeBar
    },
    methods: {
        //单选
        checkboxChange: function (item) {
            item.checked = !item.checked;
            //获取到checked 为false的数组
            let arr1 = [];
            //获取到checked 为true的数组
            let arr2 = [];
            this.commodity.forEach((item) => {
                if (item.checked == false) {
                    arr1.push(item.productId);
                } else {
                    arr2.push(item.productId);
                }
            });
            if (!item.checked) {
                this.allFlag = false;
                this.$request.post(api.checked, {
                        productIds: arr1,
                        isChecked: 0
                    })
                    .then((res) => {
                        this.$emit("initx");
                    });
            } else {
                this.$request
                    .post(api.checked, {
                        productIds: arr2,
                        isChecked: 1
                    })
                    .then((res) => {
                        //调用父组件方法更新数据
                        this.$emit("initx");
                    });
                const test = this.commodity.every((item) => {
                    return item.checked === true;
                });
                if (test) {
                    this.allFlag = true;
                } else {
                    this.allFlag = false;
                }
            }
        },
        //全选
        changeBook: function (e) {
            this.allFlag = !this.allFlag;
            let arr = [];
            let items = this.commodity;
            for (let i = 0; i < items.length; i++) {
                const element = items[i].productId;
                arr.push(element);
            }

            if (this.allFlag) {
                this.commodity.map((item) => {
                    item.checked = true;
                });
                this.$request
                    .post(api.checked, {
                        productIds: arr,
                        isChecked: 1
                    })
                    .then((res) => {
                        this.$emit("initx");
                    });
            } else {
                this.commodity.map((item) => {
                    item.checked = false;
                });
                this.$request
                    .post(api.checked, {
                        productIds: arr,
                        isChecked: 0
                    })
                    .then((res) => {
                        this.$emit("initx");
                    });
            }
        },
        //编辑
        compile: function () {
            this.compileText = !this.compileText;
            if (!this.compileText) {
                // console.log("false")
            }
        },
        //自定义数字输入框
        stepperEvent: function (item) {
            console.log(item);
            this.$request
                .post(api.Upcart, {
                    number: item.value,
                    id: item.id,
                    productId: item.productId,
                    goodsId: item.goodsId,
                })
                .then((res) => {
                    // console.log(res)
                    this.$emit("initx");
                });
        },
        //删除按钮
        remove: function (item) {
            let productId = [];
            productId.push(item.productId);

            // console.log(productId)
            let _that = this;
            uni.showModal({
                title: "温馨提示",
                content: "确定要删除么?",
                success: function (res) {
                    if (res.confirm) {
                        // console.log('用户点击确定');
                        _that.$request.post(api.cartDelete, {
                                productIds: productId
                            })
                            .then((res) => {
                                // console.log(res)
                                _that.$emit("initx");
                            });
                    } else if (res.cancel) {
                        // console.log('用户点击取消');
                    }
                },
            });
            // this.$request.post('cart/delete',{productIds:productId})
            // .then(res=>{
            // 	// console.log(res)
            // 	this.$emit("initx")
            // })
        },
        //下单/删除
        decision: function () {
            //点击删除函数
            if (!this.compileText) {
                // console.log(this.commodity)
                //获取到checked 为true的数组
                let arr2 = [];
                this.commodity.forEach((item) => {
                    if (item.checked == true) {
                        arr2.push(item.productId);
                    }
                });
                let _that = this;
                uni.showModal({
                    title: "温馨提示",
                    content: "确定要全部删除么?",
                    success: function (res) {
                        if (res.confirm) {
                            // console.log('用户点击确定');
                            _that.$request
                                .post(api.cartDelete, {
                                    productIds: arr2
                                })
                                .then((res) => {
                                    // console.log(res)
                                    _that.$emit("initx");
                                });
                        } else if (res.cancel) {
                            // console.log('用户点击取消');
                        }
                    },
                });
            } else {
                //点击下单函数
                uni.navigateTo({
                    url: "/pages/cart/Orders/Orders",
                });
                //设置确认订单请求参数
                // uni.$emit('update',{msg:'页面更新'})
            }
        },
        //点击了通告栏查看
        getMore: function () {
            console.log("点击了查看更多");
        },
    },
    computed: {},
    watch: {},
};
</script>

<style scoped>
/* :not(not) {  

  font-size: 0px; 

} */
/* 清除浮动 */
.clear {
    clear: both;
    height: 0;
    height: 0;
    overflow: hidden;
    display: inline;
}

.empty {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 20px;
}

.empty .back-img image {
    width: 100px;
}

/* 商品list */
.buy .buy-list {
    /* width: 100vw; */
    /* height: 200px; */
    background-color: #ffffff;
    padding-left: 10px;
}

.buy .buy-list .list {
    padding: 10px;
    display: flex;
    position: relative;
    align-items: center;
}

.buy .buy-list .list .list-bottom {
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
    width: 100%;
    margin: auto 0;
}

.buy .buy-list:last-of-type .list-bottom {
    overflow: hidden;
}

.buy .buy-list .list .list-bottom image {
    width: 70px;
    height: 70px;
    float: left;
    margin-right: 5px;
}

.buy .buy-list .list .list-bottom>view>view {
    display: flex;
    flex-direction: column;
}

.buy .buy-list .list .list-bottom>.definite {
    display: inline;
}

.goods {
    width: 180px;
    font-size: 12px;
}

.goods text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.buy .buy-list .list .list-bottom>.definite .deleteBtn {
    position: absolute;
    height: 70px;
    width: 35px;
    top: calc(50% - 45px);
    right: 20px;
    line-height: 70px;
    padding: 0;
}

.definite>view:nth-of-type(2)>text:nth-of-type(1) {
    color: #999999;
}

.definite>view:nth-of-type(2)>text:nth-of-type(2) {
    margin-top: 5px;
}

.definite>view:nth-of-type(2)>text:nth-of-type(3) {
    position: absolute;
    top: 0px;
    right: 20px;
}

/* 商品结算台counter */
.counter {
    background-color: #eeeeee;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 50px;
}

/* #ifdef MP-WEIXIN || APP-PLUS  */
.counter {
    position: fixed;
    bottom: 0;
}

/* #endif */

.counter button {
    width: 70px;
    height: 40px;
    color: #ffffff;
    line-height: 40px;
    border-radius: 18px;
    border: none;
}

.counter .btn {
    margin-right: 10px;
}

.counter .btn button:nth-of-type(1) {
    background: #007aff;
    margin-right: 2px;
}

.counter .btn button:nth-of-type(2) {
    background: #ff1493;
}

.money checkbox-group {
    display: inline;
    margin-left: 10px;
}

.money text {
    position: relative;
    top: 5px;
    font-size: 15px;
    color: #000000;
}
</style>
