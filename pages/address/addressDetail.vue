<template>
<view class="container">
    <form @submit="formSubmit" class="detail_form">
        <view class="uni-form-item uni-column">
            <view class="title">姓名</view>
            <view class="title_right">
                <input class="uni-input" :value="form.name" @input="onKeyName" placeholder="收货人姓名" />
            </view>
        </view>
        <view class="uni-form-item uni-column">
            <view class="title">电话</view>
            <view class="title_right">
                <input class="uni-input" :value="form.tel" type="number" @input="onKeyTel" placeholder="收货人手机号" />
            </view>
        </view>
        <view class="uni-form-item uni-column">
            <view class="title">地区</view>
            <view class="title_right">
                <input class="uni-input" @click="showPicker" :value="areaChoose" disabled placeholder="请选择地区" />
                <w-picker :visible.sync="visible" mode="linkage" :value="defaultRegion" :options="areaList" :level="3" @confirm="onConfirm($event, 'linkage')" @cancel="onCancel" ref="linkage"></w-picker>
            </view>
        </view>
        <view class="uni-form-item uni-column">
            <view class="title">详细地址</view>
            <view class="title_right">
                <input class="uni-input" :value="form.addressDetail" @input="onKeyDetail" placeholder="收货人详细地址" />
            </view>
        </view>
        <view class="uni-form-item uni-column">
            <view class="title normal">设为默认收货地址</view>
            <view class="title_right normal">
                <switch style="transform: scale(0.8)" :checked="form.isDefault" @change="switchChange" />
            </view>
        </view>
        <view class="uni-btn-v">
            <button form-type="submit" class="submit">保存</button>
            <button v-if="this.addressId != '-1'" plain="true" class="delete" type="default" @click="showDialog">
                删除
            </button>
        </view>
    </form>
    <view>
        <uni-popup ref="popup" type="center">
            <uni-popup-dialog type="warn" content="确定要删除吗" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
        </uni-popup>
    </view>
</view>
</template>

<script>
	import api from '@/pages/api/api.js'
import wPicker from "@/components/w-picker/w-picker.vue";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import uniPopupMessage from "@/components/uni-popup/uni-popup-message.vue";
import uniPopupDialog from "@/components/uni-popup/uni-popup-dialog.vue";
export default {
    onLoad: function (e) {
        this.addressId = e.addressId;
        this.getArea();
        console.log(e);
        if (e.addressId != "-1") {
            this.getDetail();
        }
    },
    components: {
        wPicker,
        uniPopup,
        uniPopupDialog,
        uniPopupMessage
    },
    data() {
        return {
            form: {
                name: "",
                tel: "",
                addressDetail: "",
                isDefault: false,
                city: "",
                county: "",
                province: "",
                areaCode: "",
                country: "",
                postalCode: "",
            },
            visible: false,
            areaList: [],
            defaultRegion: [],
            areaChoose: "",
            addressId: "",
        };
    },

    methods: {
        getDetail() {
            this.$request
                .get(api.addDetail, {
                    id: this.addressId
                })
                .then((res) => {
                    if (res.errno == 0) {
                        this.form = res.data;
                        console.log(this.form);
                        this.areaChoose =
                            res.data.province + "/" + res.data.city + "/" + res.data.county;
                        this.defaultRegion.push(
                            res.data.province,
                            res.data.city,
                            res.data.county
                        );
                    } else {
                        uni.showToast({
                            title: `${res.errmsg}`,
                            duration: 1500,
                            icon: "none",
                        });
                    }
                });
        },
        formSubmit: function (e) {
            const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
            if (!this.form.name) {
                uni.showToast({
                    title: "请填写收货人姓名",
                    duration: 1500,
                    icon: "none",
                });
                return;
            } else if (!this.form.tel) {
                uni.showToast({
                    title: "请填写收货人手机号码",
                    duration: 1500,
                    icon: "none",
                });
                return;
            } else if (!reg.test(this.form.tel)) {
                uni.showToast({
                    title: "请填写正确的手机号码",
                    duration: 1500,
                    icon: "none",
                });
                return;
            } else if (!this.areaChoose) {
                uni.showToast({
                    title: "请选择地区",
                    duration: 1500,
                    icon: "none",
                });
                return;
            } else if (!this.form.addressDetail) {
                uni.showToast({
                    title: "请填写详细地址",
                    duration: 1500,
                    icon: "none",
                });
                return;
            } else {
                this.$request.post(api.addSave, this.form).then((res) => {
                    if (res.errno == 0) {
                        uni.showToast({
                            title: "保存成功",
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
            }
            // console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
            // var formdata = e.detail.value
            // uni.showModal({
            //     content: '表单数据内容：' + JSON.stringify(formdata),
            //     showCancel: false
            // });
        },
        // formReset: function(e) {
        // 	console.log('清空数据')
        // },
        onConfirm(e) {
            console.log(e);
            this.defaultRegion = [];
            this.areaChoose = e.value[0] + "/" + e.value[1] + "/" + e.value[2];
            this.defaultRegion.push(e.value[0], e.value[1], e.value[2]);
            this.form.province = e.value[0];
            this.form.city = e.value[1];
            this.form.county = e.value[2];
            if (e.obj.col3) {
                this.form.areaCode = e.obj.col3.code;
            } else {
                this.form.areaCode = e.obj.col2.code;
            }
            console.log(this.form);
        },
        onKeyName(e) {
            this.form.name = e.target.value;
        },
        onKeyTel(e) {
            this.form.tel = e.target.value;
        },
        onKeyDetail(e) {
            this.form.addressDetail = e.target.value;
        },
        switchChange(e) {
            this.form.isDefault = e.target.value;
            console.log("switch1 发生 change 事件，携带值为", e.target.value);
        },
        showPicker() {
            // this.$refs.picker.show()
            this.visible = true;
        },
        // 获取地区接口
        getArea() {
            this.$request.get(api.regionList, {}).then((res) => {
                if (res.errno == 0) {
                    this.areaList = res.data.list;
                    this.changeData();
                    // let data = res.data;
                    // this.currentCategory = data.currentCategory;
                    // this.currentSubCategoryList = data.currentSubCategory;
                } else {
                    uni.showToast({
                        title: `${res.errmsg}`,
                        duration: 1500,
                        icon: "none",
                    });
                }
            });
        },
        // 转换城市接口字段
        changeData() {
            for (var key in this.areaList) {
                this.areaList[key].label = this.areaList[key].name;
                this.areaList[key].value = this.areaList[key].name;
                if (
                    this.areaList[key].children &&
                    this.areaList[key].children.length > 0
                ) {
                    for (var index in this.areaList[key].children) {
                        this.areaList[key].children[index].label = this.areaList[
                            key
                        ].children[index].name;
                        this.areaList[key].children[index].value = this.areaList[
                            key
                        ].children[index].name;
                        if (
                            this.areaList[key].children[index].children &&
                            this.areaList[key].children[index].children.length > 0
                        ) {
                            for (var eq in this.areaList[key].children[index].children) {
                                this.areaList[key].children[index].children[
                                    eq
                                ].label = this.areaList[key].children[index].children[eq].name;
                                this.areaList[key].children[index].children[
                                    eq
                                ].value = this.areaList[key].children[index].children[eq].name;
                            }
                        }
                    }
                }
            }
            console.log(this.areaList);
        },
        showDialog() {
            this.$refs.popup.open();
        },
        close(done) {
            console.log(done);
            this.$refs.popup.close();
        },
        confirm() {
            this.deleteAdr();
        },
        deleteAdr() {
            this.$request
                .post(api.addDelete, {
                    id: this.addressId
                })
                .then((res) => {
                    if (res.errno == 0) {
                        uni.showToast({
                            title: "删除成功",
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

.detail_form {
    display: block;
    background-color: #fff;
    padding: 15px;
}

.uni-column {
    padding: 15px;
    border-bottom: 1px solid #ebedf0;
}

.title,
.title_right {
    display: inline-block;
    vertical-align: middle;
}

.title {
    font-size: 14px;
    width: 90px;
}

.title.normal {
    width: 160px;
}

.title_right.normal {
    width: calc(100% - 160px);
    text-align: right;
}

.title_right {
    width: calc(100% - 100px);
}

.uni-input {
    font-size: 14px;
}

.uni-btn-v {
    padding: 30px 0;
}

.submit,
.delete {
    height: 44px;
    line-height: 44px;
}

.submit {
    background-color: #ff1497;
    color: #fff;
    border-radius: 25px;
    margin-bottom: 10px;
}

.delete {
    color: #fff;
    border-radius: 25px;
    border-color: #ebedf0 !important;
}
</style>
