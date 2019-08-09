<template>
  <div class="com-modal">
    <img :src="url" preview ref="main" style="display:none">
  </div>
</template>

<script>
// 图片查看器，以子路由的形式使用
// 传入route.params.url即可，url为图片地址
export default {  
  data (){
    return {
      url: '',
      previewInstance: null    
    }
  },

  beforeRouteLeave (to, from, next){
    this.$preview.self.destroy()
    next()
  },

  created (){
    this.url = this.$route.params.url
  },

  mounted (){
    this.$refs.main.click()
    this.$preview.on('close', () => this.$router.back())
  },

  methods: {
      
  }
}
</script>

<style lang="less" scoped>

</style>