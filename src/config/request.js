// 请求器实例，挂载于window._request
import axios from 'axios'
import qs from 'qs'

var config = {
  timeout: 7000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: qs.stringify
}


var axiosInstance = axios.create({
  baseURL: Vue._GLOBAL.api,
  ...config
})

axiosInstance.interceptors.request.use(requestDataHandler)
axiosInstance.interceptors.response.use(responseDataHandler)

// 请求拦截器
function requestDataHandler(req){

  return req
}

// 响应拦截器
function responseDataHandler(res){

  return res
}


window._request = axiosInstance