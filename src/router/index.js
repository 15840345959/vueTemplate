import Vue from 'vue'
import Router from 'vue-router'
import guard from './guard'

import Index from '@v/Index'

Vue.use(Router)

// 用于放在meta中的标记
const keepAlive = true,       // 带缓存路由 
fromUrlStop = true            // 直接从url进入时，将被导航至home

// 设置路由path和name
// 为什么使用这种模式：合并路由的path和name，确保每个路由必有name。因为从url直接访问一个页面它的route.name必然为null，
// 以此判断是否从url直接进入
function p(name, path){
  return {
    path: `/${path ? path : name}`,
    name,
    meta: {}  // 防止未设置meta造成取到undefined的情况
  }
}

var routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    meta: { keepAlive },
  }, {
    
  }
]

// guard为路由实例添加全局守卫
export default guard(new Router({
  mode: 'history',
  routes
}))
