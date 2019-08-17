<template>
  <div class="flex">
    <router-view></router-view>
    <vue-footer></vue-footer>
  </div>
</template>

<script>
import VueFooter from '@c/footer/Footer'
export default {
  components: {
    VueFooter
  },

  data (){
    return {
     
    }
  },
  
  methods: {
      
  }
}
</script>

<style lang="less" scoped>

</style>