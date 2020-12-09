## 项目实例

### 微信小程序实例

* uni-app模块实例

![](./static/img/ulovemall_wx_demo.jpg)

> 由于第一次加载数据量较大，建议wifi网络访问，且耐心等待数秒。  

### 移动app实例

* uni-app模块实例

1. 下载链接 [下载链接]()

### 移动浏览器实例

* uni-app模块实例

1. 手机浏览器打开: [https://wwwdev.6eye9.com/](https://wwwdev.6eye9.com/)

### 功能简介

* 首页
* 专题列表、专题详情
* 分类列表、分类详情
* 品牌列表、品牌详情
* 新品首发、人气推荐
* 优惠券列表、优惠券选择
* 团购、秒杀、会员
* 搜索
* 商品详情、商品评价、商品分享
* 购物车
* 下单
* 订单列表、订单详情、订单售后
* 地址、收藏、足迹、意见反馈
* 客服

# uni-app多终端框架项目简介  
**一、uni-app是什么**  

uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/头条/QQ/钉钉/淘宝）、快应用等多个平台。  
	  
	  
**二、为什么要选用uni-app** 
- 开发者和案例更多：HBuilder装机量500万台，开发者社区月活百万，70多个QQ微信群承载10万人。案例众多，uni统计月活10亿（[详见](https://uniapp.dcloud.io/case)）
- 性能更高（见[评测](https://juejin.im/post/5ca1736af265da30ae314248)）
- 更丰富的周边生态，[插件市场](https://ext.dcloud.net.cn/)数千款插件
- 提供比小程序原生开发更好的开发体验、更高的工程化效率
- 跨端抹平度更完善，且各端特色发挥更灵活，可真正实现一套代码多端覆盖，无需各端多头维护升级
- 权威认可：阿里小程序官方工具内置uni-app（[详见](https://docs.alipay.com/mini/ide/0.70-stable)）、腾讯课堂官方自制uni-app培训视频（[详见](https://ask.dcloud.net.cn/article/35640)）
	
**三、开发工具**  

HBuilderX或HBuilder  
(开发版本HBuilderX.2.7.5)  
  
**四丶 项目的目录结构**  
│─components            符合vue组件规范的uni-app组件目录    
├─pages                 业务页面文件存放的目录   
├─static                存放应用引用静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此  
├─main.js               Vue初始化入口文件  
├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期  
├─manifest.json         配置应用名称、appid、logo、版本等打包信息  
└─pages.json            配置页面路由、导航条、选项卡等页面类信息  
   
**五丶 开发流程与注意事项**   
1. 项目开发需选用HBuilderX或HBuilder进行开发,将项目目录导入开发工具  
2. 点击菜单栏'运行'下的下拉菜单可选择任意开发环境  
3. 点击菜单栏'发行'下的下拉菜单可选择发布环境  

注意事项:  
1. 本项目打包或运行时需配置manifest.json文件  
2. 运行微信小程序需先下载微信开发者工具  
3. 本项目基于vue.js构建,故须有vue基础知识或熟练掌握vue开发  
4. 打包APK事项:  
    (1). 使用原生app云打包  
    (2). 打包时各类参数(Android包):  
          **uni_appid**： uniapp的id  
          **秘钥**： 生成APP证书时设置的密码  (使用共有证书时不需要)  
          **应用包名**： uniapp打包时有个安卓包名既应用包名  
          **应用签名**： 常是微信开放平台中特定需要的，下载微信签名工具安装到手机上，输入应用包名后获得一串字符串，既应用签名  (应用签名需对应应用包名)  
          **证书别名**： 证书的名称  (使用共有证书时不需要)  
    (3). 打包生成的app图标需在manifest.json文件中修改

## 扫码体验 

开发一次，编译到10个平台。依次扫描10个二维码，亲自体验最全面的跨平台效果！

<img src="https://img.cdn.aliyun.dcloud.net.cn/uni-app/uni-app-qr-all.jpg"/>

## 常见疑问
- 问：不同端有不同的需求、不同的特色，登陆支付也不一样，如何统一？
- 答：差异部分使用条件编译。uni-app提供了灵活强大的[条件编译](https://uniapp.dcloud.io/platform)。可以完美处理复用部分和差异部分。真正一套工程源码。当业务升级时，不再需要多端维护。如果多端维护，经常会因为某些端的流量不大，就一直拖延无法让那些用户享受到最新服务。另外登陆支付在客户端部分，已经被uni-app统一成一样的api了。

- 问：多端是不是一种妥协，是否会造成性能下降？
- 答：多端且不影响性能，确实很难，但uni-app做到了。在h5端，它的性能、包体积与直接使用vue.js开发一致； 在小程序端，它的性能比大多数开发框架更好，uni-app底层自动处理的setdata差量同步机制，比开发者手动写setdata更好，就像使用vue.js更新界面比手动写js修改dom更高效一样； 在App，uni-app支持webview渲染和原生渲染双引擎，启用原生渲染时，css写法受限，但性能是很接近原生开发的效果的，在当前的手机环境下，千万日活以下的应用在App使用uni-app也不会遇到任何压力。当然也可以在已经做好的原生App中将部分页面改为uni-app实现

# 前后端对接url调整
utils\request.js 中更改 baseUrl 可调整开发或打包时对应后台接口