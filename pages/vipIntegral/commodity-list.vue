<template>
<view class="container">
    <view class="content">
        <!-- 轮播图 -->
        <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
            <swiper-item v-for="(item, index) in goods.info.gallery" :key="index">
                <view class="swiper-item">
                    <image :src="item"></image>
                </view>
            </swiper-item>
        </swiper>
        <!-- 商品介绍 -->
        <view class="con_goods_name" v-if="goods">
            {{ goods.info.name }}
        </view>
        <view class="con_goods_price" v-if="goods">
            <span class="new_price">¥{{ goods.memberGoods.discountPrice }}</span>
            <span class="old_price">¥{{ goods.memberGoods.retailPrice }}</span>
        </view>
        <!-- 商品规格 -->
        <view class="middle_size" @click="openDialog">
			<span v-if="goods.productList">{{goods.productList[0].specifications[0]}}</span>
            <uni-icons type="forward" size="20"></uni-icons>
        </view>
        <!-- 商品详情 -->
        <view class="details">
            <view style="margin-bottom: 10px">商品详情</view>
            <view v-if="goods.info.detail">
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
        <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
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
                            ¥ <span class="price_num">{{ chooseGoodsInfo.price }}</span>
                        </view>
                        <view class="choose_goods">
                            已选 <span class="choose_name">{{ chooseGoodsInfo.name }}</span>
                        </view>
                    </view>
                </view>
                <view class="info_middle">
                    <view class="goods_tagName">规格</view>
                    <view class="goods_list" v-if="sku.tree[0] && sku.tree[0].v">
                        <span class="detail_tag" @click="chooseTag(item, index)" v-for="(item, index) in sku.tree[0].v" :key="index" :class="[chooseT == index ? 'tagColor' : '']">{{ item.name }}</span>
                    </view>
                </view>
                <view class="info_bottom">
                    <span>购买数量</span>
                    <view class="num_box">
                        <uni-number-box :min="1" :max="maxNum" @change="changeNum"></uni-number-box>
                    </view>
                </view>
                <!-- 弹出框 购物车组件 -->
                <uni-goods-nav :fill="true" :options="options_dialog" :buttonGroup="
              showMethod ? buttonGroup_dialog : buttonGroup_dialog_method
            " @click="onClickDialog" @buttonClick="buttonClickDialog" />
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
        this.itemId = JSON.parse(decodeURIComponent(option.itemid));
        console.log(this.itemId);
        this.getDetail();
    },
    data() {
        return {
            Property: [],
            chooseT: -1,
            // 主体
            background: ["color1", "color2", "color3"],
            // 轮播图swiper自定义的属性
            indicatorDots: true,
            autoplay: true,
            interval: 2000,
            duration: 500,
            issue: [], //常见问题数组
            goods: {
                //请求的全部数据
                userHasCollect: 0,
                info: {
                    gallery: [],
                    id: 0
                },
                memberGoods: {
                    id: 0
                },
                level: false,
                id: 0,
            },
            sku: {
                tree: [],
                list: [],
                price: "1.00", // 默认价格（单位元）
            },
            relateList: [],
            skuGoods: {
                title: "", // 商品标题
                picture: "", // 默认商品 sku 缩略图
            },
            cartInfo: 0,
            selectSku: {
                selectedNum: 1,
                selectedSkuComb: {
                    sku_str: "aa",
                },
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
            maxNum: 10,
            inputNum: 1,
            itemId: "",
            // 弹窗购物车组件数据
            options_dialog: [],
            buttonGroup_dialog: [{
                    text: "加入购物车",
                    backgroundColor: "rgb(255, 20, 151)",
                    color: "#fff",
                },
                {
                    text: "立即购买",
                    backgroundColor: "rgb(180, 40, 45)",
                    color: "#fff",
                },
            ],
            // 购物车组件数据
            buttonGroup: [{
                    text: "加入购物车",
                    backgroundColor: "rgb(255, 20, 151)",
                    color: "#fff",
                },
                {
                    text: "立即购买",
                    backgroundColor: "rgb(180, 40, 45)",
                    color: "#fff",
                },
            ],
            buttonGroup_dialog_method: [{
                text: "确认",
                backgroundColor: "rgb(180, 40, 45)",
                color: "#fff",
            }, ],
            showMethod: "",
            buyMethods: "",
            options: [{
                    icon: "star",
                    text: "收藏",
                    info: 0,
                    infoBackgroundColor: "#007aff",
                    infoColor: "red",
                    color: "",
                },
                {
                    icon: "cart",
                    text: "购物车",
                    info: 0,
                    color: "",
                },
            ],
        };
    },

    methods: {
        //点击收藏
        onClick(e) {
            if (e.content.text == "收藏") {
                this.addCollect();
            } else if (e.content.text == "购物车") {
                uni.switchTab({
                    url: "/pages/cart/cart",
                });
            }
        },
        // 获取该商品是否已被收藏
        ifCollect() {
            // var i = document.getElementsByClassName("uni-icons")
            if (this.goods.userHasCollect == 1) {
                // i[1].style.color = '#ff1497'
                this.options[0].color = "#ff1497";
            } else {
                // i[1].style.color = 'rgb(100, 101, 102)'
                this.options[0].color = "rgb(100, 101, 102)";
            }
        },
        onClickDialog(e) {
            console.log(e);
        },
        openDialog() {
            if (this.goods.level) {
                this.showMethod = true;
                this.$refs.popup.open();
            } else {
                uni.showToast({
                    title: "请先购买会员",
                    icon: "none",
                });
            }
        },
        //点击购物车
        buttonClick(e) {
            console.log(e);
            this.showMethod = false;
            // this.options[1].info++
            if (e.index == 0) {
                if (this.goods.level) {
                    this.buyMethods = "cart";
                    console.log("加入购物车");
                    this.$refs.popup.open();
                } else {
                    uni.showToast({
                        title: "请先购买会员",
                        icon: "none",
                    });
                }
            } else {
                if (this.goods.level) {
                    this.buyMethods = "pay";
                    console.log("立即购买");
                    this.$refs.popup.open();
                } else {
                    uni.showToast({
                        title: "请先购买会员",
                        icon: "none",
                    });
                }
            }
        },
        buttonClickDialog(e) {
            if (this.showMethod) {
                if (e.index == 0) {
                    console.log("加入购物车");
                    this.addCart();
                } else {
                    console.log("立即购买");
                    this.buyGoods();
                }
            } else {
                this.buttonClickDialogMethod();
            }
        },
        buttonClickDialogMethod() {
            if (this.buyMethods == "cart") {
                console.log("加入购物车");
                this.addCart();
            } else {
                console.log("立即购买");
                this.buyGoods();
            }
        },
        // 收藏
        addCollect() {
            this.$request
                .post(api.collectDelete, {
                    valueId: this.goods.info.id,
                    type: 0
                })
                .then((res) => {
                    if (this.goods.userHasCollect === 1) {
                        this.goods.userHasCollect = 0;
                        uni.showToast({
                            title: "取消收藏成功",
                        });
                        this.ifCollect();
                    } else {
                        this.goods.userHasCollect = 1;
                        uni.showToast({
                            title: "收藏成功",
                            icon: "none",
                        });
                        this.ifCollect();
                    }
                });
        },
        // 关闭弹框
        close() {
            this.$refs.popup.close();
        },
        chooseTag(item, index) {
            console.log(item);
            this.chooseT = index;
            this.chooseGoodsInfo.name = item.name;
            this.chooseGoodsInfo.id = item.id;
            for (var key in this.sku.list) {
                if (this.sku.list[key].s1) {
                    if (this.sku.list[key].s1 === item.id) {
                        this.chooseGoodsInfo.price = (
                            this.sku.list[key].price / 100
                        ).toFixed(2);
                        this.chooseGoodsInfo.stock_num = this.sku.list[key].stock_num;
                        this.chooseGoodsInfo.s1 = item.id;
                        this.maxNum = this.chooseGoodsInfo.stock_num;
                        return;
                    }
                } else if (this.sku.list[key].s2) {
                    if (this.sku.list[key].s2 === item.id) {
                        this.chooseGoodsInfo.price = (
                            this.sku.list[key].price / 100
                        ).toFixed(2);
                        this.chooseGoodsInfo.stock_num = this.sku.list[key].stock_num;
                        this.chooseGoodsInfo.s2 = item.id;
                        this.maxNum = this.chooseGoodsInfo.stock_num;
                        return;
                    }
                } else if (this.sku.list[key].s3) {
                    if (this.sku.list[key].s3 === item.id) {
                        this.chooseGoodsInfo.price = (
                            this.sku.list[key].price / 100
                        ).toFixed(2);
                        this.chooseGoodsInfo.stock_num = this.sku.list[key].stock_num;
                        this.chooseGoodsInfo.s3 = item.id;
                        this.maxNum = this.chooseGoodsInfo.stock_num;
                        return;
                    }
                }
            }
        },
        changeNum(e) {
            // console.log(e)
            this.inputNum = e;
        },
        // 获取详情
        getDetail() {
            //请求会员商品详情
            this.$request.get(api.vipDetails, {
                    id: this.itemId
                })
                .then((res) => {
                    console.log(res);
                    this.goods = res.data;
                    this.issue = res.data.issue;
                    this.memberGoods = res.data.memberGoods.id;
                    let that = this;
                    setTimeout(function () {
						that.ifCollect()
                        that.onEditorReady();
                    }, 1000);
                    this.skuAdapter();
                });
            this.getCartInfo();
        },
        // 获取购物车商品数量
        getCartInfo() {
            this.$request.get(api.cartNumber,{}).then((res) => {
                this.cartInfo = res.data;
                this.options[1].info = res.data;
            });
        },
        //渲染商品详情
        onEditorReady() {
            uni.createSelectorQuery().select("#editor").context((res) => {
                    this.editorCtx = res.context;
                    this.editorCtx.setContents({
                        html: this.goods.info.detail,
                    });
                    // this.editorCtx = this.goods.info.detail
                })
                .exec();
        },
        // 相关推荐左右自适应
        // autoHeight() {
        // 	var right = document.getElementsByClassName("rightD")
        // 	for (var key = 0; key<right.length;key++) {
        // 		if(right[key].clientHeight<right[key].previousElementSibling.clientHeight){
        // 		right[key].style.height=(right[key].previousElementSibling.clientHeight-20)+"px";
        // 		}
        // 		else{
        // 		// right[key].previousElementSibling.style.height=right[key].offsetHeight+"px";
        // 		}
        // 	}
        // },

        addCart() {
            let data = this.chooseGoodsInfo;
            console.log(data);
            let that = this;
            let params = {
                goodsId: this.goods.memberGoods.goodsId,
                number: this.inputNum,
                productId: 0,
                // memberGoodsId:
            };

            if (_.has(data, "s3")) {
                uni.showToast({
                    title: "目前仅支持两规格",
                    icon: "none",
                });
                return;
            } else if (_.has(data, "s2")) {
                params.productId = this.getProductId(data.s1, data.s2);
            } else {
                params.productId = this.getProductIdByOne(data.s1);
            }
            console.log(params);
            if (!params.productId) {
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
                this.$request.post(api.addCart, params).then((res) => {
                    console.log(res);
                    if (res.errmsg === "请登录") {
                        uni.showToast({
                            title: "请登录",
                            icon: "none",
                            duration: 1500,
                        });
                        return;
                    } else {
                        this.cartInfo = Number(this.cartInfo) + Number(this.inputNum);
                        this.options[1].info = this.cartInfo;
                        uni.showToast({
                            title: "已添加至购物车",
                            icon: "none",
                            duration: 1500,
                        });
                        this.$refs.popup.close();
                    }
                });
            }
        },
        // 立即购买函数
        buyGoods() {
            let data = this.chooseGoodsInfo;
            console.log(data.stock_num);
            let that = this;
            let params = {
                goodsId: this.goods.info.id,
                number: this.inputNum,
                productId: 0,
                // memberGoodsId:this.goods.memberGoodsId.id
            };
            if (_.has(data, "s3")) {
                uni.showToast({
                    title: "目前仅支持两规格",
                    icon: "none",
                });
                return;
            } else if (_.has(data, "s2")) {
                params.productId = this.getProductId(data.s1, data.s2);
            } else {
                params.productId = this.getProductIdByOne(data.s1);
            }
            if (!params.productId) {
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
                this.$request.post(api.fastadd, params).then((res) => {
                    console.log(res);
                    if (res.errmsg === "请登录") {
                        uni.showToast({
                            title: "请登录",
                            icon: "none",
                            duration: 1500,
                        });
                        return;
                    } else {
                        uni.setStorageSync("cartId", res.data);
                        uni.setStorageSync("memberGoodsId", this.goods.memberGoods.id);
                        uni.navigateTo({
                            url: "/pages/cart/Orders/Orders",
                        });
                    }
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

            _.each(this.goods.productList, (v) => {
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
                price: this.goods.memberGoods.discountPrice, // 未选择规格时的价格
                stock_num: 0, // TODO 总库存
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
                title: this.goods.info.name,
                picture: this.goods.info.picUrl,
            };
            this.chooseGoodsInfo.name = this.sku.tree[0].k;
            this.chooseGoodsInfo.price = this.sku.price;
            console.log(this.sku);
            // console.log(this.skuGoods)
        },
        setSkuTree() {
            let that = this;
            let specifications = [];
            _.each(this.goods.specificationList, (v, k) => {
                let values = [];
                _.each(v.valueList, (vv) => {
                    vv.name = vv.value;
                    values.push({
                        id: vv.id,
                        name: vv.value,
                        imUrl: vv.picUrl,
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
            console.log();
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

<style scoped>
/deep/ .num_box .uni-numbox__minus,
/deep/ .num_box .uni-numbox__plus {
    width: 30px;
    height: 30px;
}

/deep/ .num_box .uni-numbox__value {
    width: 35px;
    height: 30px;
}

/deep/ .swiper {
    height: 375px !important;
}

.container {
    background-color: #f2f2f2;
}

.content {
    margin-bottom: 50px;
}

/* 轮播图 */
.swiper {
    height: 700rpx;
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
    z-index: 500;
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
</style>
