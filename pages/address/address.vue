<template>
<view class="container">
    <view class="addressList">
        <radio-group @change="radioChange">
            <label class="uni-list-cell uni-list-cell-pd addressLabel" @click="checkAddress(item.value)" v-for="(item, index) in addressList" :key="index">
                <view class="addRadio" @click="labels">
                    <radio :value="item.value" :checked="item.isDefault" />
                </view>
                <view class="addInfo">
                    <view class="left">
                        <view class="content_top"> {{ item.name }} {{ item.tel }} </view>
                        <view class="content_bottom">
                            {{ item.address }}
                        </view>
                    </view>
                    <view class="right" @click.stop="edit(item.value)">
                        <uni-icons color="#969799" type="gear-filled" size="20"></uni-icons>
                    </view>
                </view>
            </label>
        </radio-group>
    </view>
    <view class="bottom_fixed">
        <button type="primary" class="addNew" @click="add">新增地址</button>
    </view>
</view>
</template>

<script>
import api from '@/pages/api/api.js'
export default {
    // onLoad:function(e){
    // 	this.loadAddress()
    // },
    onShow() {
        this.loadAddress();
    },
    components: {},
    data() {
        return {
            chosenAddressId: -1,
            addressList: [],
            current: 0,
            data: "",
        };
    },
    methods: {
        radioChange: function (evt) {
            for (let i = 0; i < this.addressList.length; i++) {
                if (this.addressList[i].value === evt.target.value) {
                    this.current = i;
                    break;
                }
            }
        },
        labels: function () {
            // console.log('112233')
        },
        loadAddress() {
            this.addressList = [];
            this.$request.get(api.addList, {}).then((res) => { 
                console.log(res);
                var list = res.data.list;
                for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    this.addressList.push({
                        value: item.id.toString(),
                        name: item.name,
                        tel: item.tel,
                        isDefault: item.isDefault,
                        address: item.province +
                            item.city +
                            item.county +
                            " " +
                            item.addressDetail,
                    });
                }
            });
        },
        edit(id) {
            // console.log(id)
            uni.navigateTo({
                url: "/pages/address/addressDetail?addressId=" + id,
            });
        },
        add() {
            uni.navigateTo({
                url: "/pages/address/addressDetail?addressId=-1",
            });
        },
        checkAddress(id) {
            console.log(id);
            let pages = getCurrentPages();
            let beforePage = pages[pages.length - 2]; // 前一个页面
            if (beforePage.route == "pages/cart/Orders/Orders") {
                uni.setStorageSync("addressId", id);
                uni.navigateBack({
                    delta: 1,
                });
                // uni.redirectTo({
                //     url: '/pages/cart/Orders/Orders'
                // });
            } else if (beforePage.route == "pages/cart/Orders/Orders-integral") {
                uni.setStorageSync("addressId", id);
                uni.navigateBack({
                    delta: 1,
                });
            } else {
                window.localStorage.setItem("AddressId", id);
                this.$request.get(api.addDetail, {
                    id: id
                }).then((res) => {
                    if (res.errno == 0) {
                        this.data = res.data;
                        console.log(this.form);
                        this.saveAd();
                    } else {
                        uni.showToast({
                            title: `${res.errmsg}`,
                            duration: 1500,
                            icon: "none",
                        });
                    }
                });
            }
        },
        saveAd() {
            this.data.isDefault = true;
            this.$request.post(api.addSave, this.data).then((res) => {
                if (res.errno == 0) {
                    uni.showToast({
                        title: "设置成功",
                        duration: 1500,
                        icon: "none",
                    });
                    setTimeout(function () {
                        uni.navigateBack({
                            delta: 1,
                        });
                    }, 1000);
                } else {
                    uni.showToast({
                        title: `${res.errmsg}`,
                        duration: 1500,
                        icon: "none",
                    });
                }
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

.addressList {
    padding: 15px;
    margin-bottom: 40px;
}

.addressLabel {
    display: block;
    background-color: #fff;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 5px;
}

.addRadio {
    display: inline-block;
    width: 40px;
    vertical-align: middle;
}

.addInfo {
    display: inline-block;
    width: calc(100% - 40px);
    vertical-align: middle;
    color: #323233;
}

.right,
.left {
    display: inline-block;
    vertical-align: middle;
}

.left {
    width: calc(100% - 25px);
    margin-right: 4px;
}

.content_top {
    word-wrap: break-word;
    word-break: break-all;
    font-size: 16px;
}

.content_bottom {
    font-size: 14px;
    word-wrap: break-word;
    word-break: break-all;
}

.content_bottom {
    margin-top: 5px;
}

.bottom_fixed {
    position: fixed;
    width: 100%;
    bottom: 0;
    background-color: #fff;
    padding: 5px 0;
}

.addNew {
    background-color: #ff1497;
    width: 90%;
    margin: 0 auto;
    border-radius: 24px;
    height: 40px;
    line-height: 40px;
}
</style>
