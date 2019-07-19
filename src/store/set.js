/**
 * 全局设置方法
 * 直接设置全局状态：this.$store.commit('set', { key: value })
 * 向内查找设置对象内部状态或子模块状态：
 * this.$store.commit('set', { 
 *  context: ['aaa', 'bbb'],
 *  key: 'target',
 *  val: true 
 * })
 * 
 * 这相当于设置$store.state.aaa.bbb.target为true
 */
export default function(state, payload){
  if('context' in payload){
    var {key, val, context} = payload
    context.unshift(state)
    var target = context.reduce((prev, cur) => prev[cur])
    target[key] = val
  }else{
    state[Object.keys(payload)[0]] = Object.values(payload)[0]
  }
}