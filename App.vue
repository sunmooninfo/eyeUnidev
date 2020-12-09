<script>
export default {
	onLaunch: function() {
		// console.log('App Launch');
	},
	onShow: function() {
		// console.log('App Show');
	},
	onHide: function() {
		// console.log('App Hide');
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */

html,body{overflow-x:hidden;overflow-y:auto;}
/* #endif */


/* #ifdef APP-PLUS || MP-WEIXIN */
/* checkbox .wx-checkbox-input{
	border-radius: 50%;
}
checkbox .wx-checkbox-input.wx-checkbox-input-checked{
	border: 1px solid #8B8682;
	background:  #FF0000;
	color: #fff !important;
}
checkbox .wx-checkbox-input .wx-checkbox-input-checked::before{
	font-size: 18px;
} */
/* #endif */
checkbox .uni-checkbox-input{
	border-radius: 50%;
	color: #FF0000;
}
checkbox .uni-checkbox-input.uni-checkbox-input-checked{
	border: 1px solid #8B8682;
	background: #FF0000;
	color: #fff !important;
}
checkbox .uni-checkbox-input.uni-checkbox-input-checked::before{
	font-size: 18px;
}
checkbox .uni-checkbox-input.uni-checkbox-input:hover{
	border-color: #8B8682;
}
</style>
