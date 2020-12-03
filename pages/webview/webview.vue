<template>
	<view>
		<web-view :src="load"></web-view>
	</view>
</template>

<script>
	export default {
		onLoad:function(e){
			this.load = e.src
		},
		data() {
		    return {
		        load: ''
		    };
		},
	}
</script>

<style>
	
</style>
