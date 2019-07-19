export default {
  get (key, defaultVal) {
    var data = JSON.parse(sessionStorage.getItem(key) || '[]')
    var val = data.length ? data[0] : defaultVal || null
    return val
  },

  set (key, value) {
    sessionStorage.setItem(key, JSON.stringify([value]))
  },

  remove (key) {
    sessionStorage.removeItem(key)
  }
}