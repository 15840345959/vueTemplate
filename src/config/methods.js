// 实例方法
import Vue from 'vue'
import themeColors from '@/styles/global.less'

// 主题色，这是一个对象，包含了在styles/global.less中导出的颜色值
Vue.prototype.$colors = themeColors

// 跳转路由
Vue.prototype.$toView = function(name, options = {}){
  this.$router.push({ name, ...options })
}

// 在当前层级跳转路由
Vue.prototype.$baseToView = function(name, options = {}){
  var basePath = this.$route.name.replace(/^(.+\/)[^\/]+$/, '$1')
  this.$router.push({ name: basePath + name, ...options })
}

// 深入一个层级跳转路由
Vue.prototype.$deepToView = function(name, options = {}){
  this.$router.push({ name: this.$route.name + '/' + name, ...options })
}
