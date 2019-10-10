// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 公共库
import Vue from 'vue'
import FastClick from 'fastclick'

// 配置对象
import App from './App'
import router from './router'
import store from './store'
import beforeCreate from './config/beforeCreate'
import created from './config/created'
import themeColors from './styles/global.less'

import { 
  ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, DatetimePlugin
} from 'vux'

// 全局组件及插件
Vue.use(ToastPlugin, { type: 'text' })
Vue.use(AlertPlugin, { title: '提示' })
Vue.use(ConfirmPlugin, { title: '提示' })
Vue.use(LoadingPlugin)
Vue.use(DatetimePlugin)

// 全局变量
Vue.prototype.$bus = new Vue()    // 主要用于绑定自定义事件及触发相应事件
Vue.prototype.$colors = themeColors // 主题色，这是一个对象，包含了在styles/global.less中导出的颜色值

// 立即执行文件
require('./config/methods.js')  // 挂载实例方法
require('./config/api.js')      // 挂载api management
require('./config/filters.js')  // 注册全局过滤器
require('./config/directives.js')  // 注册全局指令

FastClick.attach(document.getElementById('app'))

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router, store,
  beforeCreate, created,
  render: h => h(App)
}).$mount('#app')
