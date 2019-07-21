// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 公共库
import Vue from 'vue'
import FastClick from 'fastclick'

// 配置对象
import App from './App'
import router from './router'
import store from './store'
import globalVars from './config/globalVars'
import beforeInit from './config/beforeInit'
import beforeCreate from './config/beforeCreate'
import created from './config/created'
import mounted from './config/mounted'

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
Vue._GLOBAL = globalVars          // 全局变量，这里的全局变量不应更改
window.Vue = Vue
window._GLOBAL = {}               // 全局变量，可以进行更改
Vue.prototype.$bus = new Vue()    // 主要用于绑定自定义事件及触发相应事件

// 立即执行文件
require('./config/methods.js')  // 挂载实例方法
require('./config/request.js')  // 挂载请求器

FastClick.attach(document.getElementById('app'))

Vue.config.productionTip = false

/* eslint-disable no-new */
beforeInit(() => new Vue({
  router, store,
  beforeCreate, created, mounted,
  render: h => h(App)
}).$mount('#app'))
