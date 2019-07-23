// 全局变量，挂载于Vue._GLOBAL
const productionApi = ''

export default {
  api: process.env.NODE_ENV === 'production' ? productionApi : '/api'
}