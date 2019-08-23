# Vue-vux项目基础模板

> 请下载zip而不是直接拉取，直接拉取会关联git。

该模板使用了[vux](https://doc.vux.li/zh-CN/components/actionsheet.html)作为UI框架。

## 配置

* [开发环境API地址 16行](config/index.js)

* [生产环境API地址 4行](src/config/globalVars.js)

* [文件夹路径别名 28行](build/webpack.base.conf.js)

* [打包后是否屏蔽console.log 38行](build/webpack.prod.conf.js)


## 目录结构

以下目录均在src文件夹下。

* __assets__ 用于存放一些图标的小图片，该文件夹中所有资源会被打包，图片被转换为base64，如果图片过大会显著增加打包时间
* __components__ 只存放共用组件，以功能或组件类型来分类
* __config__ 包含vue原生钩子和一些自定义钩子，以及一些其他项目全局都要用到的文件。以下是每个文件的作用

``` bash
> beforeCreate、created：vue原生钩子

> beforeInit：自定义钩子，在创建vue根实例之前执行，注意：这里完全无法访问到当前vue实例，因为还没有创建

> alertMounted：自定义钩子，在自定义通知方法(this.$alert)绑定后执行，此时 window._api 也已经绑定完成

> directives：添加vue自定义指令

> filters：添加vue过滤器

> globalVars：设置全局变量，挂载于window._GLOBAL

> methods：向Vue的原型链添加方法(也就是向vue实例添加方法)，请以$开头，并确保方法名没有被占用

> request：请求器实例，用于配置请求和响应拦截器，自定义请求头等，请求器使用axios

> api：管理一个项目中的全部请求，并包括自动控制loading、错误提示等功能，所有请求方法挂载于 window._api

> vuxAlert：自定义的弹窗通知方法库
```

* __router__ 管理路由
* __store__ 管理vuex全局状态
* __styles__ 全局样式，详见下表

``` bash
> page文件夹：根据目录层级存放多个页面(不是全局)需要引入的样式

> common：全局样式，其中声明的class在全局都可以使用，class命名以 com- 开头

> flex：弹性布局，不用可以删除

> global：配置less的全局变量和全局可混入(mixin)类，** 写在其他less文件中的变量无法在全局使用 **

> vuxTheme：配置vux的组件颜色，具体见vux文档，** 必须在这个文件中配置，写在其他文件中无效 **

> main：所有样式文件的入口文件，以及对html、body标签的一些全局样式配置(如规定全局字体、文字大小等)

> transitions：vue过渡动画

> trim：强制覆盖vux组件默认样式
```

* __utils__ 一些工具函数
* __views__ 页面，其中的common文件中存放了一些常用页面，这些页面一般以子路由形式使用
* __static__ 静态内容，不会被打包。一般存放一些未遵守模块化规范的js库，或较大的图片文件

## 关于目录安排

引用组件、共用样式、工具函数等一律使用别名，以绝对路径引用。以下是默认的别名列表：

* @: src
* @c: src/components
* @v: src/views
* @u: src/utils
* @img: src/assets/images


如果某些样式表和组件，只在某一模块内使用，则将其放在对应文件夹下，按类型放在不同文件夹中，以相对路径引用。

例如有如下几个文件：

``` bash
login
  > style.less 登录模块的共用样式
  > TextInput.vue 输入栏
  > Login.vue 登录
  > Register.vue 注册
```

则应这样安排目录结构：

``` bash
login
  > styles
    > style.less
  > components
    > TextInput.vue
  > Login.vue
  > Register.vue
```