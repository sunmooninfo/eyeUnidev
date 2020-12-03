<template>
<view class="container">
    <uni-collapse accordion="true">
        <uni-collapse-item title="使用什么快递发货？">
            <view style="padding: 30rpx">
                严选默认使用顺丰快递发货（个别商品使用其他快递），配送范围覆盖全国大部分地区（港澳台地区除
            </view>
        </uni-collapse-item>
        <uni-collapse-item title="如何申请退货？">
            <view style="padding: 30rpx">
                1.自收到商品之日起30日内，顾客可申请无忧退货，退款将原路返还，不同的银行处理时间不同
            </view>
        </uni-collapse-item>
        <uni-collapse-item title="如何开具发票？">
            <view style="padding: 30rpx">
                1.如需开具普通发票，请在下单时选择“我要开发票”并填写相关信息（APP仅限2.4.0及以
            </view>
        </uni-collapse-item>
    </uni-collapse>
</view>
</template>

<script>
import uniCollapse from "@/components/uni-collapse/uni-collapse.vue";
import uniCollapseItem from "@/components/uni-collapse-item/uni-collapse-item.vue";
export default {
    components: {
        uniCollapse,
        uniCollapseItem
    },
    data() {
        return {};
    },
    created() {},
    methods: {},
};
</script>

<style scoped>
.container {
    padding: 0.5rem;
}
</style>
