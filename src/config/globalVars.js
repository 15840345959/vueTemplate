// 全局变量，挂载于window._GLOBAL

// 这里填写生产环境api地址，开发环境api地址配置在根目录下的 @see/config/index.js中
const productionApi = ''

export default {
  api: process.env.NODE_ENV === 'production' ? productionApi : '/api',
  qiniuPic: ''
}