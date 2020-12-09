<template>
<view class="container">
    <view class="content">
        <view class="top_swiper">
            <view class="uni-padding-wrap">
                <view class="page-section swiper">
                    <view class="page-section-spacing">
                        <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
                            <swiper-item v-for="(image, index) in goods.info.gallery" :key="index">
                                <view class="swiper-item uni-bg-red">
                                    <img class="swiper_img" :src="image" alt="" />
                                </view>
                            </swiper-item>
                        </swiper>
                    </view>
                </view>
            </view>
        </view>
		
        <view class="con_goods_name" v-if="goods">
            {{ goods.info.name }}
        </view>
        <!-- #ifdef H5 -->
        <button class="btn" open-type="share">分享</button>
        <!-- #endif -->
        <!-- #ifdef APP-PLUS -->
        <button class="btn" @click="friendC" open-type="share">分享</button>
        <!-- #endif -->
        <!-- #ifdef MP-WEIXIN -->
        <button size="mini" @click="open" class="btn">分享</button>
        <!-- #endif -->
        <uni-popup ref="friend" type="center">
            <view class="box">
                <!-- <view class="model" style="position: absolute;z-index: 999;"> -->
                <view class="" style="
              display: flex;
              justify-content: space-between;
              text-align: center;
              background-color: #fff;
              padding: 1rem;
              border-radius: 15px;
            ">
                    <view class="" style="margin-left: 0rem">
                        <button class="share-btn" style="
                  background-color: #fff;
                  border: 0px solid rgba(0, 0, 0, 0.2) !important;
                " open-type="share">
                            <image style="width: 40px; height: 40px" src="../../static/images/wechat.png" mode=""></image>
                            <view class="" style="color: #000"> 分享到朋友 </view>
                        </button>
                    </view>
                    <view class="" style="margin-left: 6rem">
                        <button @click="upload" class="share-btn" style="
                  background-color: #fff;
                  border: 0px solid rgba(0, 0, 0, 0.2) !important;
                ">
                            <image style="width: 40px; height: 40px" src="../../static/images/friend.png" mode=""></image>
                            <view class="" style="color: #000"> 生成海报 </view>
                        </button>
                    </view>
                </view>

             
            </view>
        </uni-popup>
		
        <view class="con_goods_brief" v-if="goods">
            {{ goods.info.brief }}
        </view>
        <view class="con_goods_price" v-if="goods">
            <span class="new_price">¥{{ goods.info.retailPrice }}</span>
            <span class="old_price">¥{{ goods.info.counterPrice }}</span>
        </view>
		<view class="name" v-if="countDown">
			<view class="name_right">
				距离秒杀结束：<text>{{d}}</text>天 <text>{{h}}</text>：<text>{{m}}</text>：<text>{{s}}</text>
			</view>
		</view>
        <view class="middle_size" @click="openDialog">
            <span v-if="goods.productList">{{goods.productList[0].specifications[0]}}</span>
            <uni-icons type="forward" size="20"></uni-icons>
        </view>
        <view class="parameter" v-if="goods.attribute && goods.attribute.length > 0">
            <view style="margin-bottom: 10px" class="par_title">商品参数</view>
            <view class="parameter_info" v-for="(item, index) in goods.attribute" :key="index" :class="[index == goods.attribute.length - 1 ? 'last_par' : '']">
                <span class="left_name">{{ item.attribute }}</span>
                <span class="right_value">{{ item.value }}</span>
            </view>
        </view>
        <view class="details">
            <view style="margin-bottom: 10px">商品详情</view>
            <view v-if="goods.info.detail">
                <!-- <editor style="width: 100%;" id="editor" mode="aspectFill" class="ql-container" :read-only="true"></editor> -->
                <rich-text :nodes="nodes"></rich-text>
            </view>
            <view v-else style="border-top: 1px solid #e5e5e5; padding-top: 10px">
                暂无详情
            </view>
            <!-- 		<img class="details_img" src="https://snsmall.oss-cn-zhangjiakou.aliyuncs.com/unkttuat3mj5779jhxsx.jpg" alt="">

<img class="details_img" src="https://snsmall.oss-cn-zhangjiakou.aliyuncs.com/unkttuat3mj5779jhxsx.jpg" alt="">

<img class="details_img" src="https://snsmall.oss-cn-zhangjiakou.aliyuncs.com/unkttuat3mj5779jhxsx.jpg" alt=""> -->
        </view>
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
        <view class="normal_prob">
            <span class="normal_prob_span">相关推荐</span>
            <view class="line"></view>
        </view>
        <view class="recommend_list">
            <view class="recommend_detail" v-for="(item, i) in relateList" :key="i" :class="[i % 2 == 0 ? 'leftD' : 'rightD']" @click="linkTo(item)">
                <view>
                    <img class="recommend_img" :src="item.picUrl" alt="" />
                    <view class="recommend_name">
                        {{ item.name }}
                    </view>
                    <view class="recommend_price"> ¥ {{ item.retailPrice }} </view>
                </view>
            </view>
        </view>
    </view>
    <!-- 弹框 -->
    <view class="bottom_nav" v-if="groupon.length > 0">
        <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup_booking" @click="onClick" @buttonClick="buttonClick" />
    </view>
    <view class="bottom_nav" v-else>
        <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
    </view>
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
                    <scroll-view scroll-y="true" class="goods_list" v-if="sku.tree[0] && sku.tree[0].v">
                        <span class="detail_tag" @click="chooseTag(item, index)" v-for="(item, index) in sku.tree[0].v" :key="index" :class="[chooseT == index ? 'tagColor' : '']">{{ item.name }}</span>
                    </scroll-view>
                </view>
                <view class="info_middle" v-if="groupon && groupon.length > 0">
                    <view class="goods_tagName">团购立减</view>
                    <scroll-view scroll-y="true" class="goods_list">
                        <span class="detail_tag" @click="clickGroupon(vitem, index)" v-for="(vitem, index) in groupon" :key="index" :class="[chooseGroup == index ? 'tagColor' : '']">￥{{ vitem.discount }} ({{ vitem.discountMember }}人)</span>
                    </scroll-view>
                </view>
                <view class="info_bottom">
                    <span>购买数量</span>
                    <view class="num_box">
                        <uni-number-box :min="1" :max="maxNum" @change="changeNum"></uni-number-box>
                    </view>
                </view>
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
    onShareAppMessage(res) {
        return {
            title: "分享给朋友",
            path: "pages/details/details",
        };
    },
    onShareTimeline: function () {
        return {
            title: "hahah",
            query: {
                key: "",
            },
            imageUrl: "",
        };
    },
    components: {
        uniGoodsNav,
        uniPopupDialog,
        uniPopup,
        uniNumberBox,
    },
    onLoad: function (e) {
        console.log(e);
        if (e.id) {
            this.itemId = e.id;
            this.getDetail();
        }
        if (e.grouponId) {
            (this.isGroupon = true), this.getGrouponInfo(e.grouponId);
        }
        this.$request
            .get(api.related, {
                id: this.itemId,
				// #ifdef MP-WEIXIN
				isShown: true,
				// #endif
            })
            .then((res) => {
                this.relateList = res.data.list;
            });
    },
    onReady: function () {
        // this.onEditorReady()
    },
    data() {
        return {
            itemId: "",
            nodes: "",
            shareImage: "",
			countDown: undefined,
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
            options_dialog: [],
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
            buttonGroup_booking: [{
                text: "立即购买",
                backgroundColor: "rgb(180, 40, 45)",
                color: "#fff",
            }, ],
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
            buttonGroup_dialog_method: [{
                text: "确认",
                backgroundColor: "rgb(180, 40, 45)",
                color: "#fff",
            }, ],
            chooseT: -1,
            chooseGroup: -1,
            chooseGroupID: "",
            // 主体
            background: ["color1", "color2", "color3"],
            indicatorDots: true,
            autoplay: true,
            interval: 2000,
            duration: 500,
            issue: [],
            goods: {
                userHasCollect: 0,
                info: {
                    gallery: [],
                },
            },
            sku: {
                tree: [],
                list: [],
                price: "1.00", // 默认价格（单位元）
            },
            relateList: [],
            skuGoods: {
                // 商品标题
                title: "",
                // 默认商品 sku 缩略图
                picture: "",
            },
            cartInfo: 0,
            selectSku: {
                selectedNum: 1,
                selectedSkuComb: {
                    sku_str: "aa",
                },
            },
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
            showMethod: "",
            buyMethods: "",
            groupon: [], //该商品支持的团购规格
            grouponLink: {}, //参与的团购
            isGroupon: false, //标识是否是一个参团购买
			d: 0,
			h: 0,
			m: 0,
			s: 0,
			timer: null
        };
    },
    methods: {
        open() {
            this.$refs.friend.open();
        },
        close2() {
            this.$refs.friend.close();
        },
        friend() {
            if (this.showFriend === false) {
                this.showFriend = true;
            } else {
                this.showFriend = false;
            }
        },
		countTime: function () {
			//获取当前时间
			var date = new Date();
			var now = date.getTime();
			//设置截止时间
			var endDate = new Date(this.endTime);
			var end = endDate.getTime();
			//时间差
			var leftTime = end - now;
			//定义变量 d,h,m,s保存倒计时的时间
			if (leftTime >= 0) {
				this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
				this.h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
				this.m = Math.floor(leftTime / 1000 / 60 % 60);
				this.s = Math.floor(leftTime / 1000 % 60);
			}
			console.log(this.s);
			//递归每秒调用countTime方法，显示动态时间效果
		},
		onUnload:function(){  
		    if(this.timer) {  
		        clearInterval(this.timer);  
		        this.timer = null;  
		    }  
		},
        onClick(e) {
            console.log(e);
            // debugger
            if (e.content.text == "收藏") {
                this.addCollect();
            } else if (e.content.text == "购物车") {
                console.log("111");
                uni.switchTab({
                    url: "/pages/cart/cart",
                });
            }
            // uni.showToast({
            //   title: `点击${e.content.text}`,
            //   icon: 'none'
            // })
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
        upload() {
            // debugger
            let that = this;
            uni.downloadFile({
                url: that.shareImage,
                success: (res) => {
                    if (res.statusCode === 200) {
                        uni.saveImageToPhotosAlbum({
                            filePath: res.tempFilePath,
                            success: function () {
                                uni.showToast({
                                    title: "保存成功",
                                    icon: "none",
                                });
                            },
                            fail: function () {
                                uni.showToast({
                                    title: "保存失败，请稍后重试",
                                    icon: "none",
                                });
                            },
                        });
                    }
                },
            });
        },
        friendC() {
            let that = this;
            uni.share({
                provider: "weixin",
                scene: "WXSceneSession",
                type: 0,
                href: "https://www.baidu.com",
                title: that.goods.info.name,
                summary: "付费知识平台",
                imageUrl: that.shareImage,
                success: function (res) {
                    console.log(JSON.stringify(res));
                    uni.showToast({
                        title: "已分享",
                        duration: 2000,
                    });
                },

                fail: function (err) {
                    // var errrr = JSON.stringify(err);
                    // if(errrr){
                    //     uni.showModal({
                    //     title: '表单不能留空',
                    //     content: '请完善所有信息再发起分享',
                    //     success: function (res) {
                    //         if (res.confirm) {
                    //                 console.log('用户点击确定');
                    //             } else if (res.cancel) {
                    //                 console.log('用户点击取消');
                    //             }
                    //         }
                    //     });
                    // }
                },
            });
        },
        onClickDialog(e) {
            console.log(e);
        },
        openDialog() {
            if (this.groupon.length == 0) {
                this.showMethod = true;
            }
            this.$refs.popup.open();
        },
        buttonClick(e) {
            console.log(e);
            this.showMethod = false;
            // this.options[1].info++
            if (e.content.text == "加入购物车") {
                this.buyMethods = "cart";
                console.log("加入购物车");
                this.$refs.popup.open();
            } else {
                console.log("立即购买");
                this.buyMethods = "pay";
                this.$refs.popup.open();
            }
        },
        buttonClickDialog(e) {
            console.log(e);
            console.log("22");
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
            console.log("1111");
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
                .post(api.addOrdelete, {
                    valueId: this.itemId,
                    type: 0,
                })
                .then((res) => {
                    if (res.errno == 0) {
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
                            });
                            this.ifCollect();
                        }
                    } else {
                        uni.showToast({
                            icon: "none",
                            title: `${res.errmsg}`,
                            duration: 1500,
                        });
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
                }
                if (this.sku.list[key].s2) {
                    if (this.sku.list[key].s2 === item.id) {
                        this.chooseGoodsInfo.price = (
                            this.sku.list[key].price / 100
                        ).toFixed(2);
                        this.chooseGoodsInfo.stock_num = this.sku.list[key].stock_num;
                        this.chooseGoodsInfo.s2 = item.id;
                        this.maxNum = this.chooseGoodsInfo.stock_num;
                        return;
                    }
                }
                if (this.sku.list[key].s3) {
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
            // this.chooseGoodsInfo.price = item.price
            console.log(this.maxNum);
        },
        changeNum(e) {
            console.log(e);
            this.inputNum = e;
        },
        // 获取详情
        getDetail() {
            this.$request
                .get(api.goodsDetail, {
                    id: this.itemId,
                })
                .then((res) => {
                    console.log(res);
                    if (res.errno == 0) {
                        if (res.data.info.detail) {
                            this.nodes = res.data.info.detail
                                .replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/gi, "<p")
                                .replace(
                                    /<p>/gi,
                                    '<p  style="font-size:  15px; line-height: 25px;">'
                                )
                                .replace(
                                    /<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/gi,
                                    "<img$1"
                                )
                                .replace(
                                    /<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/gi,
                                    "<img$1"
                                )
                                .replace(
                                    /<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/gi,
                                    "<img$1"
                                )
                                .replace(
                                    /<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/gi,
                                    "<img$1"
                                )
                                .replace(
                                    /<img([\s\w"-=\/\.:;]+)/gi,
                                    '<img style="width: 100%; height:auto;" $1'
                                );
                        }
                        this.goods = res.data;
                        this.groupon = res.data.groupon;
                        console.log(this.groupon);
                        this.issue = res.data.issue;
                        this.shareImage = res.data.shareImage;
						if(res.data.goodskill[0].isKill){
							this.endTime = res.data.goodskill[0].endDate,
							this.goodskill = res.data.goodskill[0]
							this.countDown = true
						  this.timer = setInterval(this.countTime, 1000);
						} else {
							this.countDown = false
						}
                        let that = this;
                        setTimeout(function () {
                            that.autoHeight();
                            that.ifCollect();
                        }, 1000);
                        // setTimeout(function(){ that.onEditorReady();that.ifCollect()}, 1000);
                        this.skuAdapter();
                        //如果是通过分享的团购参加团购，则团购项目应该与分享的一致并且不可更改
                        if (that.isGroupon) {
                            let groupons = that.groupon;
                            for (var i = 0; i < groupons.length; i++) {
                                if (groupons[i].id != that.grouponLink.rulesId) {
                                    groupons.splice(i, 1);
                                }
                            }
                            that.chooseGroupID = groupons[0].id;
                            //重设团购规格
                            that.groupon = groupons;
                            that.chooseGroup = 0;
                            that.$refs.popup.open();
                        }
                    } else {
                        uni.showToast({
                            icon: "none",
                            title: `${res.errmsg}`,
                            duration: 1000,
                        });
                    }
                });
            this.getCartInfo();
        },
        // 获取购物车商品数量
        getCartInfo() {
            this.$request.get(api.cartNumber, {}).then((res) => {
                this.cartInfo = res.data;
                this.options[1].info = res.data;
            });
        },
        // 相关推荐左右自适应
        autoHeight() {
            var right = document.getElementsByClassName("rightD");
            for (var key = 0; key < right.length; key++) {
                if (
                    right[key].clientHeight <
                    right[key].previousElementSibling.clientHeight
                ) {
                    right[key].style.height =
                        right[key].previousElementSibling.clientHeight - 20 + "px";
                } else {
                    // right[key].previousElementSibling.style.height=right[key].offsetHeight+"px";
                }
            }
        },
        // 跳转
        linkTo(item) {
            console.log(item);
            uni.navigateTo({
                url: "/pages/details/details?id=" + item.id,
            });
        },
        addCart() {
            let data = this.chooseGoodsInfo;
            console.log(data);
            let that = this;
            let params = {
                goodsId: this.itemId,
                number: this.inputNum,
                productId: 0,
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
                    title: "请选择完整规格",
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
        buyGoods() {
            let data = this.chooseGoodsInfo;
            console.log(data);
            let that = this;
            let params = {
                goodsId: this.itemId,
                number: this.inputNum,
                productId: 0,
            };
            // this.test =  that.grouponLink.id
            // return
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
                    title: "请选择完整规格",
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
                //验证团购是否有效
                let checkedGroupon = this.getCheckedGrouponValue();
                if (this.groupon.length > 0) {
                    this.$request.post(api.goodsCartBuy, params).then((res) => {
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
                            uni.setStorageSync("grouponRulesId", that.chooseGroupID);
                            uni.setStorageSync("grouponLinkId", that.grouponLink.id);
                            uni.navigateTo({
                                url: "/pages/cart/Orders/Orders",
                            });
                        }
                    });
                } else {
                    this.$request.post(api.fastAdd, params).then((res) => {
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
                            uni.navigateTo({
                                url: "/pages/cart/Orders/Orders",
                            });
                        }
                    });
                }
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
                // price: parseInt(this.goods.info.retailPrice), // 未选择规格时的价格
                price: this.goods.info.retailPrice, // 未选择规格时的价格
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
        // 团购选择
        clickGroupon(item, index) {
            let that = this;
            //参与团购，不可更改选择
            if (this.isGroupon) {
                return;
            }
            // 正反选
            if (this.chooseGroup != index) {
                this.chooseGroup = index;
                this.chooseGroupID = item.id;
            } else {
                this.chooseGroup = -1;
                this.chooseGroupID = "";
            }
            console.log(item);
        },
        //获取选中的团购信息
        getCheckedGrouponValue() {
            if (this.chooseGroupID) {
                return this.chooseGroupID;
            } else {
                return "";
            }
        },
        //从分享的团购进入
        getGrouponInfo(grouponId) {
            let _that = this;
            this.$request
                .get(api.grouponJoin, {
                    grouponId: grouponId,
                })
                .then((res) => {
                    if (res.errno == 0) {
                        _that.grouponLink = res.data.groupon;
                        _that.itemId = res.data.goods.id;
                        _that.getDetail();
                    } else {
                        uni.showToast({
                            icon: "none",
                            title: `${res.errmsg}`,
                            duration: 1000,
                        });
                    }
                });
        },
    },
};
</script>

<style scoped>
.name{
  margin-top: 1rem;
}
.name_right{
  /* width:400rpx; */
  font-size:32rpx;
  color:#FF1497;
  text-align:center;
  margin-top: 12rpx;
}
.name_right text{
  font-size: 32rpx;
  background:#FF1497;
  border-radius:6rpx;
  color:#fff;
  padding:2rpx 6rpx;
}
uni-button:after {
    content: " ";
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid rgba(0, 0, 0, 0);
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    box-sizing: border-box;
    border-radius: 10px;
}

button::after {
    /* user agent stylesheetcontent: " "; */
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid rgba(0, 0, 0, 0);
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    box-sizing: border-box;
    border-radius: 10px;
}

.btn {
    /* float: right;		font-size: 16px;

background: (to right, #FF1493, #ffe3f2);

color: #FFFDEF;

line-height: 2; */
    float: right;
    font-weight: 550;
    margin-top: 28rpx;
    width: 140rpx;
    height: 80rpx;
    line-height: 82rpx;
    padding: 0;
    margin: 0;
    margin-right: 0rpx;
    text-align: center;
    font-size: 25rpx;
    color: #f4f4f4;
    border-top-left-radius: 50rpx;
    border-bottom-left-radius: 50rpx;
    border-top-right-radius: 0rpx;
    border-bottom-right-radius: 0rpx;
    letter-spacing: 3rpx;
    background-image: linear-gradient(to right, #ff1497 0%, #fff 100%);
}

.container {
    background-color: #f2f2f2;
}

.content {
    margin-bottom: 50px;
}

.bottom_nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 500;
}

.b_dialog .uni-popup {
    z-index: 500;
}

.dialog_img {
    width: 96px;
    height: 96px;
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
	max-height: 200px;
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

.swiper_img {
    width: 100%;
    height: 100%;
}

.con_goods_name {
    font-size: 14px;
    padding: 5px 15px;
    background-color: #fff;
}

.con_goods_brief {
    background-color: #fff;
    font-size: 12px;
    color: #999;
    padding: 5px 15px;
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

.details {
    background-color: #fff;
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
    padding: 10px;
}

.details_img {
    width: 100%;
}

.parameter {
    background-color: #fff;
    margin-top: 20px;
    padding: 10px;
}

.par_title {
    text-align: center;
    font-size: 14px;
}

.parameter_info {
    font-size: 14px;
    border: 1px solid #e5e5e5;
    border-bottom: none;
    display: flex;
}

.left_name,
.right_value {
    padding: 8px 0;
}

.left_name {
    padding-left: 10px;
    width: 30%;
    word-break: break-all;
    border-right: 1px solid #e5e5e5;
    width: 30%;
}

.right_value {
    padding-left: 10px;
    word-break: break-all;
    width: 70%;
}

.last_par {
    border-bottom: 1px solid #e5e5e5;
}

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

.recommend_detail {
    display: inline-block;
    width: 44%;
    padding: 10px 2%;
    margin: 5px 1%;
    background-color: #fff;
    vertical-align: top;
}

.recommend_img {
    width: 100%;
    height: 45vw;
}

.recommend_name {
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
}

.recommend_price {
    text-align: center;
    font-size: 14px;
    color: rgb(255, 20, 151);
}

/deep/ #editor.ql-container,
/deep/ #editor.ql-container img {
    height: auto;
    display: block;
    max-width: 100%;
}

/* /deep/ .ql-container image {

    display: inline-block;

} */
/deep/ .b_dialog .uni-popup {
    z-index: 600;
}

.swiper-item {
    height: 100%;
}
</style>
