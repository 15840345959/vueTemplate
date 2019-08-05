<template>
  <div class="scroll-view">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'scrollView',
  data (){
    return {
      
    }
  },

  methods: {
    saveScroll (){
      this.$store.commit('saveScroll/save', {
        [this._uid]: {
          top: this.$el.scrollTop,
          left: this.$el.scrollLeft
        }
      })
    },

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