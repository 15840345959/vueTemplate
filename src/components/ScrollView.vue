<template>
  <!-- 滚动容器，本身只是一个div，不包含任何样式 -->
  <div class="scroll-view">
    <slot></slot>
  </div>
</template>

<script>
/**
 * 对外暴露两个方法，见methods
 * 如何使用：使用组件时设置ref，在下方代码中调用，例如设置ref="scrollView"，保存滚动条进度：
 * this.$refs.scrollView.saveScroll()
 */
export default {
  name: 'scrollView',
  data (){
    return {
      
    }
  },

  methods: {
    // 保存当前的滚动条进度
    saveScroll (){
      this.$store.commit('saveScroll/save', {
        [this._uid]: {
          top: this.$el.scrollTop,
          left: this.$el.scrollLeft
        }
      })
    },

    // 载入当前滚动条进度
    loadSavedScroll (){
      if(this.$store.state.saveScroll.scrolls[this._uid]){
        this.$el.scrollTo(this.$store.state.saveScroll.scrolls[this._uid])
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>