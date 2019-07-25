function request({
  url,
  method = 'get',
  apiParams = {},   
  loading = false, 
  msg = false
}){
  return {
    [url] (params){
      var {_alert = null} = window
      return new Promise((resolve, reject) =>{
        loading && _alert && _alert.loading.show(loading)
        params = { ...apiParams, ...params }
        _request({
          url, method,
          ...({ [method === 'get' ? 'params' : 'data']: params }),
        }).finally(() => loading && _alert && _alert.loading.hide())
        .then(data =>{
          if(data.result) resolve(data.ret)
          else{
            msg && _alert && _alert.toast(data.message)
            reject(data)
          }
        }).catch(e =>{
          console.log(e)
          msg && _alert && _alert.toast(typeof msg == 'string' ? msg : '网络错误', 'cancel')
          reject()
        })
      })
    }
  }
}

var requests = {
  ...request({ url: 'index/index', loading: true })
}

window._api = (url, params) => requests[url](params)
