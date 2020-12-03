<template>
	<view class="container">
		<view class="topImg" v-if="type">
			<img class="swiper_img" :src="Certificate" alt="" />
			<view class="name">{{CertificateName}}</view>
		</view>
		<scroll-view scroll-x='true' class="articalD" v-else>
			<view class="title">
				{{detail.title}}
			</view>
			<view class="date">
				日期: {{detail.updateTime}}
			</view>
			<view class="from">
				来源: {{detail.addUser}}
			</view>
			
			<rich-text class="rich" :nodes="detail.context"></rich-text>
		</scroll-view>
	</view>
</template>

<script>
	import api from '@/pages/api/api.js'
	export default {
		onLoad:function(e){
			if (e.id) {
				this.type = false
				this.itemId = e.id;
				this.getDetail();
			} else {
				this.type = true
				this.CertificateName = e.name
				this.getCertificateImg()
			}
		},
		data() {
			return {
				itemId: '',
				detail: '',
				type:'img',
				nodes: [{
					name: 'p',
					attrs: {
						class: 'p-class',
						style: 'margin:10px 0;'
					},
					
				}],
				Certificate: '',
				CertificateName: ''
			}
		},
		methods: {
			getDetail() {
				this.$request
				    .get(api.articalDetail, {
				        id: this.itemId
				    })
				    .then((res) => {
				        if (res.errno == 0) {
				          this.detail = res.data.article
				        } else {
				            uni.showToast({
				                title: `${res.errmsg}`,
				                icon: "none",
				                duration: 1500,
				            });
				        }
				    });
			},
			getCertificateImg() {
				this.Certificate = uni.getStorageSync("certificateImg")
			}
		}
	}
	
	
</script>

<style scoped>
	.title {
		text-align: center;
		font-weight: bold;
	}
	.date,.from {
		text-align: center;
		margin: 10px 0;
	}
	.rich {
		margin-top: 20px;
	}
	.topImg {
		/* height: 375px; */
		padding: 5% 2%;
	}
	.name {
		text-align: center;
		margin-top: 5%;
	}
	.swiper_img {
		width: 100%;
		height: 100%;
	}
	/deep/ .articalD p {
		margin: 10px 0;
	}
	/deep/ .articalD img {
		 width: 100%;
	 }
	.articalD {
		padding: 20rpx;
		width: 96%;
	}
</style>
