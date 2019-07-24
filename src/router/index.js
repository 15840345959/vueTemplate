import Vue from 'vue'
import Router from 'vue-router'
import guard from './guard'

import Index from '@v/Index'

Vue.use(Router)

const keepAlive = true,
fromUrlStop = true

// 设置路由path和name
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
    meta: {
      keepAlive
    }
  }
]

// guard为路由实例添加全局守卫
export default guard(new Router({
  mode: 'history',
  routes
}))
