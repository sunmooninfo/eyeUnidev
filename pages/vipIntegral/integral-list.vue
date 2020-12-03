<template>
<view class="integral">
    <view class="content">
        <!-- 轮播图 -->
        <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
            <swiper-item v-for="(item, index) in goods.eyeGoods.gallery" :key="index">
                <view class="swiper-item">
                    <image :src="item"></image>
                </view>
            </swiper-item>
        </swiper>
        <!-- 商品介绍 -->
        <view class="con_goods_name" v-if="goods">
            {{ goods.uloveIntegralGoods.goodsName }}
        </view>
        <view class="con_goods_price" v-if="goods">
            <span class="new_price">积分{{ goods.uloveIntegralGoods.integration }}</span>
            <!-- <span class="old_price">¥{{(goods.uloveIntegralGoods.retailPrice)}}</span> -->
        </view>
        <!-- 商品规格 -->
        <!-- <view class="middle_size" @click="openDialog">

<span>标准</span>

<uni-icons type="forward" size="20"></uni-icons>

</view> -->
        <!-- 商品详情 -->
        <view class="details">
            <view style="margin-bottom: 10px">商品详情</view>
            <view v-if="goods.eyeGoods.detail">
                <editor id="editor" class="ql-container" :read-only="true"></editor>
            </view>
            <view v-else style="border-top: 1px solid #e5e5e5; padding-top: 10px">
                暂无详情
            </view>
        </view>
        <!-- 常见问题 -->
        <view class="normal_prob">
            <span class="normal_prob_span">常见问题</span>
            <view class="line"></view>
        </view>
        <view class="problem_content">
            <ul>
                <li class="pro_li" v-for="(iss, i) in issue" :key="i">
                    <span class="problem_title">{{ iss.question }}</span>
                    <view class="problem_text">
                        {{ iss.answer }}
                    </view>
                </li>
            </ul>
        </view>
    </view>
    <!-- 底部购物车组件 -->
    <view class="bottom_nav">
        <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @buttonClick="buttonClick" />
    </view>
    <!-- 弹框 -->
    <view class="b_dialog">
        <uni-popup ref="popup" type="bottom">
            <view class="info">
                <view class="info_top">
                    <img class="dialog_img" :src="skuGoods.picture" alt="" />
                    <view class="right_message">
                        <span class="close_dialog" @click="close">×</span>
                        <view class="price">
                            积分 <span class="price_num">{{ chooseGoodsInfo.price }}</span>
                        </view>
                        <view class="choose_goods">
                            已选 <span class="choose_name">{{ chooseGoodsInfo.name }}</span>
                        </view>
                    </view>
                </view>

                <view class="info_middle">
                    <view class="goods_tagName">净含量</view>
                    <view class="goods_list" v-if="sku.tree[0] && sku.tree[0].v">
                        <span class="detail_tag" @click="chooseTag(item, index)" v-for="(item, index) in sku.tree[0].v" :key="index" :class="[chooseT == index ? 'tagColor' : '']">{{ item.name }}</span>
                    </view>
                </view>

                <view class="info_bottom">
                    <span>兑换数量</span>
                    <view class="num_box">
                        <uni-number-box :min="1" :max="maxNum" @change="changeNum"></uni-number-box>
                    </view>
                </view>
                <!-- 弹出框 购物车组件 -->
                <uni-goods-nav :fill="true" :options="options_dialog" :buttonGroup="buttonGroup_dialog" @click="onClickDialog" @buttonClick="buttonClickDialog" />
            </view>
        </uni-popup>
    </view>
</view>
</template>

<script>
import api from '@/pages/api/api.js'
import uniGoodsNav from "@/components/uni-goods-nav/uni-goods-nav.vue";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import uniPopupDialog from "@/components/uni-popup/uni-popup-dialog.vue";
import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue";
import _ from "lodash";
export default {
    components: {
        uniPopup,
        uniPopupDialog,
        uniGoodsNav,
        uniNumberBox
    },
    onLoad: function (option) {
        //接收传递的会员商品id
        // console.log(option)
        this.itemId = JSON.parse(decodeURIComponent(option.itemid));
        this.getInit();
    },
    data() {
        return {
            // 轮播图swiper自定义的属性
            indicatorDots: true,
            autoplay: true,
            interval: 2000,
            duration: 500,
            issue: [], //常见问题数组
            goods: {
                //请求的全部数据
                // userHasCollect: 0,
                eyeGoods: {
                    gallery: [],
                },
                uloveIntegralGoods: {},
                level: false,
            },
            skuGoods: {
                title: "", // 商品标题
                picture: "", // 默认商品 sku 缩略图
            },

            sku: {
                tree: [],
                list: [],
                price: "1.00", // 默认价格（单位元）
            },
            chooseT: -1,
            propsPopup: false,
            showSku: false,
            chooseGoodsInfo: {
                name: "",
                price: "",
                stock_num: "",
                id: "",
            },
            maxNum: 1,
            inputNum: 1,
            itemId: "",
            // 弹窗购物车组件数据
            options_dialog: [],
            buttonGroup_dialog: [{
                text: "确认兑换",
                backgroundColor: "#ff1497",
                color: "#fff",
            }, ],
            // 购物车组件数据
            buttonGroup: [{
                text: "立即兑换",
                backgroundColor: "#ff1497",
                color: "#fff",
            }, ],
            options: [],
        };
    },

    methods: {
        getInit() {
            this.$request.get(api.integralDetails, {
                    id: this.itemId
                })
                .then((res) => {
                    console.log(res);
                    this.goods = res.data;
                    this.issue = res.data.issue;
                    let that = this;
                    setTimeout(function () {
                        that.onEditorReady();
                    }, 1000);
                    this.skuAdapter();
                });
        },
        //渲染商品详情
        onEditorReady() {
            uni
                .createSelectorQuery()
                .select("#editor")
                .context((res) => {
                    this.editorCtx = res.context;
                    this.editorCtx.setContents({
                        html: this.goods.eyeGoods.detail,
                    });
                    // this.editorCtx = this.goods.eyeGoods.detail
                })
                .exec();
        },
        openDialog() {
            this.$refs.popup.open();
        },
        // 关闭弹框
        close() {
            this.$refs.popup.close();
        },

        changeNum(e) {
            console.log(e);
            this.inputNum = e;
        },
        onClickDialog(e) {
            console.log(e);
        },
        //点击立即兑换
        buttonClick(e) {
            if (e.index == 0) {
                if (this.goods.level && this.goods.adequate) {
                    console.log("立即兑换");
                    this.$refs.popup.open();
                } else {
                    uni.showToast({
                        title: "积分不足或需要购买会员!!!",
                        icon: "none",
                    });
                }
            }
        },
        chooseTag(item, index) {
            console.log(item);
            this.chooseT = index;
            this.chooseGoodsInfo.name = item.name;
            this.chooseGoodsInfo.id = item.id;
        },

        buttonClickDialog(e) {
            if (e.index == 0) {
                this.buyGoods();
            }
        },
        // 立即兑换函数
        buyGoods() {
            let data = this.chooseGoodsInfo;
            let buy = {
                productId: this.chooseGoodsInfo.id,
                addressId: 0,
                integralGoodsId: this.goods.uloveIntegralGoods.id,
                number: this.inputNum,
            };
            console.log(buy);
            if (!buy.productId) {
                uni.showToast({
                    title: "选择分类",
                    icon: "none",
                    duration: 1500,
                });
                return;
            } else if (data.stock_num == 0) {
                uni.showToast({
                    title: "库存不足",
                    icon: "none",
                    duration: 1500,
                });
                return;
            } else {
                uni.navigateTo({
                    url: "/pages/cart/Orders/Orders-integral?buy=" +
                        encodeURIComponent(JSON.stringify(buy)),
                });
            }
        },
        getProductId(s1, s2) {
            var productId;
            var s1_name;
            var s2_name;
            _.each(this.goods.specificationList, (specification) => {
                _.each(specification.valueList, (specValue) => {
                    if (specValue.id === s1) {
                        s1_name = specValue.value;
                    } else if (specValue.id === s2) {
                        s2_name = specValue.value;
                    }
                });
            });
            _.each(this.goods.productList, (v) => {
                let result = _.without(v.specifications, s1_name, s2_name);
                if (result.length === 0) {
                    productId = v.id;
                }
            });
            return productId;
        },
        getProductIdByOne(s1) {
            var productId;
            var s1_name;
            _.each(this.goods.specificationList, (specification) => {
                _.each(specification.valueList, (specValue) => {
                    if (specValue.id === s1) {
                        s1_name = specValue.value;
                        return;
                    }
                });
            });

            _.each(this.goods.specificationList, (v) => {
                let result = _.without(v.specifications, s1_name);
                if (result.length === 0) {
                    productId = v.id;
                }
            });
            return productId;
        },
        skuAdapter() {
            const tree = this.setSkuTree();
            const list = this.setSkuList();
            const skuInfo = {
                price: parseInt(this.goods.uloveIntegralGoods.integration), // 未选择规格时的价格
                stock_num: list[0].stock_num, // TODO 总库存
                collection_id: "", // 无规格商品skuId取collection_id，否则取所选sku组合对应的id
                none_sku: false, // 是否无规格商品
                hide_stock: true,
            };
            this.sku = {
                tree,
                list,
                ...skuInfo,
            };
            this.skuGoods = {
                title: this.goods.eyeGoods.name,
                picture: this.goods.eyeGoods.picUrl,
            };
            this.chooseGoodsInfo.name = this.sku.tree[0].k;
            this.chooseGoodsInfo.price = this.sku.price;
            this.chooseGoodsInfo.stock_num = this.sku.stock_num;
            console.log(this.sku);
        },
        setSkuTree() {
            let that = this;
            let specifications = [];
            _.each(this.goods.productList, (v, k) => {
                let values = [];
                _.each(v.specifications, (vv) => {
                    values.push({
                        name: vv,
                        id: v.id,
                        imUrl: v.url,
                    });
                });

                specifications.push({
                    k: v.name,
                    v: values,
                    k_s: "s" + (~~k + 1),
                });
            });

            return specifications;
        },
        setSkuList() {
            var sku_list = [];
            _.each(this.goods.productList, (v) => {
                var sku_list_obj = {};
                _.each(v.specifications, (specificationName, index) => {
                    sku_list_obj["s" + (~~index + 1)] = this.findSpecValueIdByName(
                        specificationName
                    );
                });

                sku_list_obj.price = v.price * 100;
                sku_list_obj.stock_num = v.number;
                sku_list.push(sku_list_obj);
            });
            return sku_list;
        },
        findSpecValueIdByName(name) {
            let id = 0;
            _.each(this.goods.specificationList, (specification) => {
                _.each(specification.valueList, (specValue) => {
                    if (specValue.value === name) {
                        id = specValue.id;
                        return;
                    }
                });
                if (id !== 0) {
                    return;
                }
            });
            return id;
        },
    },
};
</script>

<style>
.integral {
    background-color: #f2f2f2;
}

.content {
    margin-bottom: 50px;
}

/* 轮播图 */
.swiper {
    /* height: 700rpx; */
}

.swiper-item image {
    height: 375px;
    width: 100%;
}

/* 商品介绍 */
.con_goods_name {
    font-size: 14px;
    padding: 10px 15px;
    background-color: #fff;
}

.con_goods_price {
    height: 30px;
    line-height: 30px;
    padding: 0 15px;
    background-color: #fff;
}

.new_price {
    font-size: 20px;
    color: #ff1497;
    margin-right: 10px;
}

.old_price {
    font-size: 12px;
    color: #999;
    text-decoration: line-through;
}

/* 商品规格 */
.middle_size {
    margin-top: 20px;
    height: 40px;
    line-height: 40px;
    background: #fff;
    font-size: 14px;
    padding: 0 20px;
    text-align: right;
}

.middle_size>span {
    float: left;
}

/* 商品详情 */
.details {
    background-color: #fff;
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
    padding: 10px;
}

/* 商品常见问题 */
.normal_prob {
    margin-top: 10px;
    text-align: center;
    font-size: 14px;
    padding: 10px;
    position: relative;
}

.normal_prob_span {
    z-index: 10;
    position: relative;
    width: 80px;
    display: inline-block;
    background: #f2f2f2;
}

.line {
    width: calc(100% - 20px);
    border: 1px solid #e5e5e5;
    position: absolute;
    top: 19px;
    z-index: 0;
}

.problem_content {
    background-color: #fff;
    padding: 10px 0;
}

.pro_li {
    font-size: 14px;
    margin-bottom: 10px;
}

.problem_text {
    margin-top: 5px;
    color: rgb(120, 120, 120);
    padding: 0 10px;
}

/* 购物车组件 */
.bottom_nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 10;
}

/* 弹窗 */
.b_dialog .uni-popup {
    z-index: 500;
}

.info {
    background: #fff;
    padding-bottom: 10px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding: 10px;
}

.info_top,
.info_middle {
    border-bottom: 1px solid #e5e5e5;
}

.dialog_img {
    width: 96px;
    height: 96px;
}

.right_message {
    display: inline-block;
    vertical-align: top;
    padding: 20px;
    position: relative;
    width: calc(100% - 140px);
}

.close_dialog {
    position: absolute;
    right: 0;
    top: -4px;
    font-size: 28px;
    color: #c8c9cc;
}

.price {
    color: #ee0a24;
    font-size: 18px;
}

.price .price_num {
    font-size: 22px;
    margin-left: 10px;
}

.choose_goods {
    color: #969799;
    font-size: 12px;
}

.choose_name {
    margin-left: 5px;
}

.goods_tagName {
    font-size: 14px;
    padding: 5px 10px;
    margin-bottom: 10px;
}

.goods_list {
    margin-bottom: 15px;
}

.goods_list .detail_tag {
    display: inline-block;
    font-size: 13px;
    padding: 7px;
    background-color: #f7f8fa;
    color: #323233;
    margin-left: 14px;
    border-radius: 3px;
    margin-bottom: 10px;
}

.goods_list .tagColor {
    color: #ee0a24;
    background-color: rgb(253, 231, 234);
}

.info_bottom {
    padding: 10px;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    padding-bottom: 20px;
}

.num_box {
    display: inline-block;
    float: right;
}

/deep/ #editor.ql-container,
/deep/ #editor.ql-container img {
    height: auto;
}

/deep/ .num_box .uni-numbox__value {
    width: 35px;
    height: 30px;
}

/deep/ .swiper {
    height: 375px !important;
}

/deep/ #editor.ql-container,
/deep/ #editor.ql-container img {
    height: auto;
    display: block;
}

/deep/ .b_dialog .uni-popup {
    z-index: 600;
}

/deep/ .num_box .uni-numbox__minus,
/deep/ .num_box .uni-numbox__plus {
    width: 30px;
    height: 30px;
}

/deep/ .num_box .uni-numbox__value {
    width: 35px;
    height: 30px;
}
</style>
