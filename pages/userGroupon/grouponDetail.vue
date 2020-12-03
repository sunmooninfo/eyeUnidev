<template>
<view class="container">
    <view class="progress">
        <view class="item-a">
            <uni-steps :options="[
            { title: '已开团' },
            { title: '开团中' },
            { title: '开团成功' },
          ]" :active="active"></uni-steps>
            <!-- <van-steps steps="{{ steps }}" active="{{ active }}" active-icon="{{ activeIcon }}"

  active-color="{{ activeColor }}" /> -->
        </view>
        <view class="item-c" v-if="groupon.status === 1">
            <view class="l">
                开团还缺
                <span class="dan">{{ rules.discountMember - joiners.length }}</span>
                人
            </view>
            <!-- #ifdef MP-WEIXIN -->
            <view class="r">
                <button class="btn active" open-type="share">邀请参团</button>
            </view>
            <!-- <button size="mini"   @click="open" class="btn">分享</button> -->
            <!-- #endif -->
            <!-- #ifdef APP-PLUS -->
            <view class="r">
                <button @click="friendC" class="btn active" open-type="share">
                    邀请参团
                </button>
            </view>
            <!-- <button class="btn" @click="friendC" open-type="share">分享</button> -->
            <!-- #endif -->
        </view>
    </view>

    <view class="menu-list-pro">
        <view class="h">
            <view class="label">参与团购 ( {{ joiners.length }}人)</view>
            <view class="status">查看全部</view>
        </view>
        <view class="menu-list-item" v-for="(item, index) in joiners" :key="index">
            <image class="icon" :src="item.avatar"></image>
            <text class="txt">{{ item.nickname }}</text>
        </view>
    </view>

    <view class="order-goods">
        <view class="h">
            <view class="label">商品信息</view>
        </view>
        <view class="goods">
            <view class="item" v-for="(item, index) in orderGoods" :key="index">
                <view class="img">
                    <image :src="item.picUrl"></image>
                </view>
                <view class="info">
                    <view class="t">
                        <text class="name">{{ item.goodsName }}</text>
                        <text class="number">x{{ item.number }}</text>
                    </view>
                    <view class="attr">{{ item.goodsSpecificationValues[0] }}</view>
                    <view class="price">￥{{ item.retailPrice }}</view>
                </view>
            </view>
        </view>

        <view class="order-bottom">
            <view class="total">
                <view class="t">
                    <text class="label">商品合计：</text>
                    <text class="txt">￥{{ orderInfo.goodsPrice }}</text>
                </view>
                <view class="t">
                    <text class="label">商品运费：</text>
                    <text class="txt">￥{{ orderInfo.freightPrice }}</text>
                </view>
            </view>
            <view class="pay-fee">
                <text class="label">商品实付：</text>
                <text class="txt">￥{{ orderInfo.actualPrice }}</text>
            </view>
        </view>
    </view>

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
                <!-- 		<view class="" style="margin-left: 6rem;">

<button @click="upload" class="share-btn" style="background-color: #fff;border: 0px solid rgba(0,0,0,.2) !important;">

<image style="width: 40px;height: 40px;" src="../../static/images/friend.png" mode=""></image>

<view class="" style="color: #000;">

生成海报

</view>

</button>

</view> -->
            </view>
        </view>
    </uni-popup>
</view>
</template>

<script>
	import api from '@/pages/api/api.js'
import uniSteps from "@/components/uni-steps/uni-steps.vue";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import uniPopupDialog from "@/components/uni-popup/uni-popup-dialog.vue";
export default {
    onShareAppMessage(res) {
        return {
            title: "邀请团购",
            path: "pages/details/details?grouponId=" + this.grouponId,
        };
    },
    onLoad: function (e) {
        this.grouponId = e.id;
        console.log(this.grouponId);
        this.getInfo();
    },
    onShow() {
        // 测试
        // this.getDetail()
    },
    components: {
        uniSteps,
        uniPopupDialog,
        uniPopup,
    },
    data() {
        return {
            grouponId: "",
            groupon: {},
            joiners: [],
            orderInfo: {},
            orderGoods: [],
            rules: {},
            active: 0,
            steps: [],
            activeIcon: "",
            activeColor: "",
            dataTest: {
                creator: {
                    avatar: "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK3UIZksf3Ek8StTknlmiccNfho8XcPV3vjVVQfbqicreIqnYLpyLmlmT8CSrvYw1ibR1wuicicTKCU5Dw/132",
                    nickname: "胖子没有肉",
                },
                groupon: {
                    addTime: "2020-09-22 11:35:54",
                    creatorUserId: 33,
                    creatorUserTime: "2020-09-22 11:35:54",
                    deleted: false,
                    grouponId: 0,
                    id: 7,
                    orderId: 316,
                    rulesId: 4,
                    shareUrl: "https://devapis.oss-cn-zhangjiakou.aliyuncs.com/tpft4lszf5doxmg7jnkq.jpg",
                    status: 1,
                    updateTime: "2020-09-22 11:36:18",
                    userId: 33,
                },
                joiners: [{
                    avatar: "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK3UIZksf3Ek8StTknlmiccNfho8XcPV3vjVVQfbqicreIqnYLpyLmlmT8CSrvYw1ibR1wuicicTKCU5Dw/132",
                    nickname: "胖子没有肉",
                }, ],
                linkGrouponId: 7,
                orderGoods: [{
                    goodsId: 1811093,
                    goodsName: "python好玩又好做的三个小案例",
                    goodsSpecificationValues: ["标准"],
                    id: 311,
                    number: 1,
                    orderId: 316,
                    picUrl: "https://devapis.oss-cn-zhangjiakou.aliyuncs.com/gyde96t49v3aa2huiux2.jpg",
                    retailPrice: 1.01,
                }, ],
                orderInfo: {
                    actualPrice: 0.01,
                    addTime: "2020-09-22 11:35:54",
                    address: "北京市市辖区东城区 asd",
                    consignee: "shang",
                    freightPrice: 0,
                    goodsPrice: 0.01,
                    handleOption: {
                        cancel: false,
                        delete: false,
                        pay: false,
                        comment: false,
                        confirm: false,
                        refund: true,
                        rebuy: false,
                    },
                    id: 316,
                    mobile: "13333333333",
                    orderSn: "20200922435483",
                    orderStatusText: "已付款",
                },
                rules: {
                    addTime: "2020-09-21 16:19:21",
                    deleted: false,
                    discount: 1,
                    discountMember: 2,
                    expireTime: "2020-09-30 00:00:00",
                    goodsId: 1811093,
                    goodsName: "python好玩又好做的三个小案例",
                    id: 4,
                    picUrl: "https://devapis.oss-cn-zhangjiakou.aliyuncs.com/gyde96t49v3aa2huiux2.jpg",
                    status: 0,
                    updateTime: "2020-09-22 11:35:20",
                },
            },
        };
    },

    methods: {
        changeTag(index) {
            this.tagChoose = index;
        },
        getInfo() {
            this.$request
                .get(api.grouponDetail, {
                    grouponId: this.grouponId,
                })
                .then((res) => {
                    if (res.errno == 0) {
                        let _steps = [{
                                text: "已开团",
                            },
                            {
                                text: "开团中",
                            },
                            {
                                text: "开团成功",
                            },
                        ];
                        let _active = res.data.groupon.status;
                        let _activeIcon = "success";
                        let _activeColor = "#07c160";
                        if (res.data.groupon.status === 3) {
                            _steps = [{
                                    text: "已开团",
                                },
                                {
                                    text: "开团中",
                                },
                                {
                                    text: "开团失败",
                                },
                            ];
                            _active = 2;
                            _activeIcon = "fail";
                            _activeColor = "#EE0A24";
                        }
                        this.joiners = res.data.joiners;
                        this.groupon = res.data.groupon;
                        this.orderInfo = res.data.orderInfo;
                        this.orderGoods = res.data.orderGoods;
                        this.rules = res.data.rules;
                        this.active = _active;
                        this.steps = _steps;
                        this.activeIcon = _activeIcon;
                        this.activeColor = _activeColor;
                    } else {
                        uni.showToast({
                            title: `${res.errmsg}`,
                            icon: "none",
                            duration: 1500,
                        });
                    }
                });
        },
        getDetail() {
            let _steps = [{
                    text: "已开团",
                },
                {
                    text: "开团中",
                },
                {
                    text: "开团成功",
                },
            ];
            let _active = this.dataTest.groupon.status;
            let _activeIcon = "success";
            let _activeColor = "#07c160";
            if (this.dataTest.groupon.status === 3) {
                _steps = [{
                        text: "已开团",
                    },
                    {
                        text: "开团中",
                    },
                    {
                        text: "开团失败",
                    },
                ];
                _active = 2;
                _activeIcon = "fail";
                _activeColor = "#EE0A24";
            }
            this.joiners = this.dataTest.joiners;
            this.groupon = this.dataTest.groupon;
            this.orderInfo = this.dataTest.orderInfo;
            this.orderGoods = this.dataTest.orderGoods;
            this.rules = this.dataTest.rules;
            this.active = _active;
            this.steps = _steps;
            this.activeIcon = _activeIcon;
            this.activeColor = _activeColor;
        },
        open() {
            this.$refs.friend.open();
        },
        close2() {
            this.$refs.friend.close();
        },
        friendC() {
            let that = this;
            uni.share({
                provider: "weixin",
                scene: "WXSceneSession",
                type: 5,
                imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png",
                title: "拼团邀请",
                miniProgram: {
                    id: "gh_4103648cf275",
                    path: "pages/details/details?grouponId=" + that.grouponId,
                    type: 2,
                    webUrl: "http://uniapp.dcloud.io",
                },
                success: (ret) => {
                    console.log(JSON.stringify(ret));
                },
            });
        },
    },
};
</script>

<style scoped>
.container {
    background-color: #f2f2f2;
    min-height: calc(100vh - 45px);
}

view,
text {
    font-size: 29rpx;
    color: #333;
}

.dan {
    font-size: 12px;
    color: #fff;
    padding: 3px 5px;
    border-radius: 3px;
    background-color: rgb(230, 67, 64);
    margin: 0 3px;
}

.progress {
    padding-top: 25rpx;
    background: #fff;
    height: auto;
    overflow: hidden;
}

.item-a {
    padding: 0 21.25rpx;
}

.item-c {
    margin-left: 31.25rpx;
    height: 103rpx;
    line-height: 103rpx;
    margin-top: 5px;
}

.item-c .l {
    float: left;
}

.item-c .r {
    height: 103rpx;
    float: right;
    display: flex;
    align-items: center;
    padding-right: 16rpx;
}

.item-c .btn {
    float: right;
    line-height: 66rpx;
    font-size: 30rpx;
    border-radius: 5rpx;
    text-align: center;
    margin: 0 15rpx;
    padding: 0 20rpx;
    height: 66rpx;
}

.item-c .btn.active {
    background: #a78845;
    color: #fff;
}

.order-goods {
    margin-top: 20rpx;
    background: #fff;
}

.order-goods .h {
    height: 93.75rpx;
    line-height: 93.75rpx;
    margin-left: 31.25rpx;
    border-bottom: 1px solid #f4f4f4;
    padding-right: 31.25rpx;
}

.order-goods .h .label {
    float: left;
    font-size: 30rpx;
    color: #333;
}

.order-goods .h .status {
    float: right;
    font-size: 30rpx;
    color: #b4282d;
}

.order-goods .item {
    display: flex;
    align-items: center;
    height: 192rpx;
    margin-left: 31.25rpx;
    padding-right: 31.25rpx;
    border-bottom: 1px solid #f4f4f4;
}

.order-goods .item:last-child {
    border-bottom: none;
}

.order-goods .item .img {
    height: 145.83rpx;
    width: 145.83rpx;
    background: #f4f4f4;
}

.order-goods .item .img image {
    height: 145.83rpx;
    width: 145.83rpx;
}

.order-goods .item .info {
    flex: 1;
    height: 145.83rpx;
    margin-left: 20rpx;
}

.order-goods .item .t {
    margin-top: 8rpx;
    height: 33rpx;
    line-height: 33rpx;
    margin-bottom: 10.5rpx;
}

.order-goods .item .t .name {
    display: block;
    float: left;
    height: 33rpx;
    line-height: 33rpx;
    color: #333;
    font-size: 30rpx;
}

.order-goods .item .t .number {
    display: block;
    float: right;
    height: 33rpx;
    text-align: right;
    line-height: 33rpx;
    color: #333;
    font-size: 30rpx;
}

.order-goods .item .attr {
    height: 29rpx;
    line-height: 29rpx;
    color: #666;
    margin-bottom: 25rpx;
    font-size: 25rpx;
}

.order-goods .item .price {
    display: block;
    float: left;
    height: 30rpx;
    line-height: 30rpx;
    color: #333;
    font-size: 30rpx;
}

.order-goods .item .btn {
    height: 50rpx;
    line-height: 50rpx;
    border-radius: 5rpx;
    text-align: center;
    display: block;
    float: right;
    margin: 0 15rpx;
    padding: 0 20rpx;
}

.order-goods .item .btn.active {
    background: #b4282d;
    color: #fff;
}

.order-bottom {
    margin-top: 20rpx;
    padding-left: 31.25rpx;
    height: auto;
    overflow: hidden;
    background: #fff;
}

.order-bottom .address {
    height: 128rpx;
    padding-top: 25rpx;
    border-bottom: 1px solid #f4f4f4;
}

.order-bottom .address .t {
    height: 35rpx;
    line-height: 35rpx;
    margin-bottom: 7.5rpx;
}

.order-bottom .address .name {
    display: inline-block;
    height: 35rpx;
    width: 140rpx;
    line-height: 35rpx;
    font-size: 30rpx;
}

.order-bottom .address .mobile {
    display: inline-block;
    height: 35rpx;
    line-height: 35rpx;
    font-size: 30rpx;
}

.order-bottom .address .b {
    height: 35rpx;
    line-height: 35rpx;
    font-size: 30rpx;
}

.order-bottom .total {
    height: 106rpx;
    padding-top: 20rpx;
    border-bottom: 1px solid #f4f4f4;
}

.order-bottom .total .t {
    height: 30rpx;
    line-height: 30rpx;
    margin-bottom: 7.5rpx;
}

.order-bottom .total .t .label {
    width: 150rpx;
    height: 35rpx;
    line-height: 35rpx;
    font-size: 30rpx;
}

.order-bottom .total .t .txt {
    float: right;
    height: 35rpx;
    line-height: 35rpx;
    font-size: 30rpx;
    padding-right: 31.25rpx;
}

.order-bottom .pay-fee {
    height: 81rpx;
    line-height: 81rpx;
}

.order-bottom .pay-fee .label {
    width: 140rpx;
}

.order-bottom .pay-fee .txt {
    float: right;
    padding-right: 31.25rpx;
}

.menu-list-pro {
    margin-top: 20rpx;
    overflow-x: scroll;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 260rpx;
    width: 100%;
    overflow: hidden;
    border-bottom: 1rpx #cfc9ca;
    background-color: #fff;
}

.menu-list-pro .h {
    height: 93.75rpx;
    line-height: 93.75rpx;
    margin-left: 31.25rpx;
    border-bottom: 1px solid #f4f4f4;
    padding-right: 31.25rpx;
}

.menu-list-pro .h .label {
    float: left;
    font-size: 30rpx;
    color: #333;
}

.menu-list-pro .h .status {
    float: right;
    font-size: 30rpx;
    color: #a78845;
}

.menu-list-pro .menu-list-item {
    display: block;
    float: left;
    height: 110rpx;
    /* width: 80rpx; */
    margin-top: 30rpx;
    margin-bottom: 30rpx;
    margin-left: 40rpx;
    text-align: center;
}

.menu-list-pro .icon {
    height: 80rpx;
    width: 80rpx;
    border-radius: 12rpx;
    box-shadow: 0px 4rpx 4rpx 0px #cfc9ca;
}

.menu-list-pro .txt {
    display: block;
    /* float: left; */
    /* width: 80rpx; */
    margin-top: 5rpx;
    font-size: 22rpx;
    color: #a78845;
}
</style>
