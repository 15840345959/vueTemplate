// 快捷操作cookie的工具

export default {
  get (cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim()
      if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
    }
    return ''
  },

  set (name, val, time = 1000 * 60 * 60 * 24 * 30) {
    this.get(name) && this.remove(name)
    var exp = new Date() 
    exp.setTime(exp.getTime() + time) 
    document.cookie = name + '=' + val + ';expires=' + exp.toGMTString() 
  },

  remove (name) {
    var exp = new Date() 
    exp.setTime(exp.getTime() - 10000) 
    document.cookie = name + '=undefined;expires=' + exp.toGMTString() 
  }
}