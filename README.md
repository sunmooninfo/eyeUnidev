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
│  └─comp-a.vue         可复用的a组件  
├─hybrid                存放本地网页的目录， 
├─platforms             存放各平台专用页面的目录，  
├─pages                 业务页面文件存放的目录  
│  ├─index  
│  │  └─index.vue       index页面  
│  └─list 
│     └─list.vue        list页面  
├─static                存放应用引用静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此  
├─wxcomponents          存放小程序组件的目录， 
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


## 扫码体验

开发一次，编译到10个平台。依次扫描10个二维码，亲自体验最全面的跨平台效果！

<img src="https://img.cdn.aliyun.dcloud.net.cn/uni-app/uni-app-qr-all.jpg"/>


	
# url调整
utils\request.js 中更改 baseUrl 可调整开发环境