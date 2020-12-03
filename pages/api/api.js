export default {
	membershipCard: 'common/member/package/list', // 获取会员卡列表
	vipCommodityList: 'common/member/goods/list', //获取会员商品列表
	integralCommodityList: 'common/integral/goods/list',//积分商品商品列表
	membershipTime: 'common/member/user/mylist', // 会员卡到期时间
	submitMembership:'common/member/order/submit', //用户购买会员套餐提交会员套餐的订单
	vipPrepayment: 'common/member/order/apppay', //付款订单的预支付会话标识
	H5prepayment: 'common/member/order/h5pay', //H5付款订单的预支付会话标识
	historyCard: 'common/member/order/list', // 获取会员卡购买记录列表
	historyDelete:'common/member/order/delete', //会员卡购买记录删除
	integralDetails:'common/integral/goods/detail', //积分商品详情
	vipDetails: 'common/member/goods/detail',//会员商品详情
	cartNumber: 'common/cart/goodscount', //获取购物车商品数量
	addCart:'common/cart/add', //添加购物车
	fastadd:'common/cart/fastadd',  
	
	checked:'common/cart/checked', //选中商品
	cart:'common/cart/index', // 购物车列表
	Upcart: 'common/cart/update', // 购物车更新
	cartDelete: 'common/cart/delete', //购物车商品删除
	cartx:'common/cart/checkout',//获取购物车商品的数据
	Integral:'common/cart/checkIntegral',//获取积分订单详情
	groupon:'common/groupon/cart/checkout',//初始化获取团购购物车的值
	couponList:'common/coupon/selectlist',//获取优惠券
	buy:'common/order/submit' ,//用户购买订单
	IntegralBuy:'common/order/submitIntegral',//用户积分购买订单
	prepaymentApp:'common/order/apppay',//app付款订单的预支付会话标识
	prepaymentcommon:'common/order/prepay',//common付款订单的预支付会话标识
	prepaymentH5:'common/order/h5pay',//h5付款订单的预支付会话标识
	
	homeIndex: 'common/home/index', // 获取首页信息
	couponRecrive: 'common/coupon/receive', // 领取优惠券
	goodsCount: 'common/goods/count', // 商品搜索数量
	addList: 'common/address/list', // 地址列表
	addDetail: 'common/address/detail', // 地址详情
	addSave: 'common/address/save', // 保存地址
	addDelete: 'common/address/delete', // 删除地址
	regionList: 'common/region/list', // 获取地区接口
	couponMy: 'common/coupon/mylist', // 获取我的购物券
	
	related: 'common/goods/related', // 相关推荐
	addOrdelete: 'common/collect/addordelete', // 商品收藏
	goodsDetail: 'common/goods/detail', // 商品详情 
	goodsCartBuy: 'common/groupon/cart/buying', //  获取团购
	grouponJoin: 'common/groupon/join', //  加入团购
	fastAdd: 'common/cart/fastadd', //  快速加入购物车
	
	collectList: 'common/collect/list', //  收藏列表
	collectDelete: 'common/collect/addordelete', //  取消收藏
	
	feedbackSubmit: 'common/feedback/submit', //  意见反馈
	footprintList: 'common/footprint/list', //  浏览足迹
	footprintDelete: 'common/footprint/delete', //  删除足迹
	
	goodsCategory: 'common/goods/category', //  商品分类
	goodsList: 'common/goods/list', //  商品分类
	
	catalogIndex: 'common/catalog/index', //  商品列表
	catalogCurrent: 'common/catalog/current', //  商品当前类目
	
	authLogin: 'common/auth/login', //  账号密码登录
	loginWX: 'common/auth/login_by_weixin', //  小程序登录
	appLoginWX: 'common/auth/app_login_by_weixin', //  APP微信登录
	
	checkMo: 'common/auth/checkIsBindMobile', //  是否绑定手机
	profile: 'common/auth/profile', //  获取用户信息
	
	logout: 'common/auth/logout', //  退出登录
	
	orderList: 'common/order/list', //  订单列表
	orderDetail: 'common/order/detail', //  订单详情
	orderCancel: 'common/order/cancel', //  取消订单
	orderRefund: 'common/order/refund', //  退款
	orderConfirm: 'common/order/confirm', //  确认收货
	orderDelete: 'common/order/delete', //  删除订单
	orderShowLink: 'common/order/showLink', //  订单链接
	
	register: 'common/auth/register', //  注册
	regCaptcha: 'common/auth/regCaptcha', //  发送验证码
	reset: 'common/auth/reset', //  重置密码
	
	commentList: 'common/comment/list', //  商品列表
	topicDetail: 'common/topic/detail', //  留言
	topicRelated: 'common/topic/related', //  推荐
	
	bindMobile: 'common/auth/bindMobile', //  绑定手机
	unbindMobile: 'common/auth/unbindMobile', //  解绑手机
	
	grouponDetail: 'common/groupon/detail', //  团购详情
	grouponList: 'common/groupon/list', //  团购列表
	grouponMy: 'common/groupon/my', // 我的团购
	
	articalIndex: 'cms/category/all', // 获取文章一级类目
	articalCurrent: 'cms/category/current', // 获取当前分类详情
	articalDetail: 'cms/article/detail', // 获取详情
	articalCertificate: 'cms/article/certificate', // 获取证书
	articalList: 'cms/article/list', // 获取文章列表
}