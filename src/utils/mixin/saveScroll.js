export default {
  // 进入时读取进度条数据
  activated (){
    ;(function throughChildren(instance){
      instance.$children.forEach(val =>{
        if(/-scrollView$/.test(val.$vnode.tag)){
          if(val.$store.state.saveScroll.scrolls[val._uid]){
            val.$nextTick(() => val.$el.scrollTo(val.$store.state.saveScroll.scrolls[val._uid]))
          }
        }

        val.$children.length && throughChildren(val)
      })
    })(this)
  },

  // 离开时保存
  beforeRouteLeave (to, from, next){
    var children = {}
    ;(function throughChildren(instance){
      instance.$children.forEach(val =>{
        if(/-scrollView$/.test(val.$vnode.tag)){
          children[val._uid] = {
            top: val.$el.scrollTop,
            left: val.$el.scrollLeft
          }
        }

        val.$children.length && throughChildren(val)
      })
    })(this)

    this.$store.commit('saveScroll/save', children)
    next()
  }
}