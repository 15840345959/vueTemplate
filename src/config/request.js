// 请求器实例，挂载于window._request
import axios from 'axios'
import qs from 'qs'


var commonConfig = {
  timeout: 7000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: qs.stringify
}

var axiosInstance = axios.create({
  baseURL: Vue._GLOBAL.api,
  ...commonConfig
})
axiosInstance.interceptors.request.use(requestDataHandler)

window._request = axiosInstance