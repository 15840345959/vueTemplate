<template>
  <!-- 该组件为懒加载 + 图片失效显示替代图片 -->
  <x-img :src="src" class="img" error-class="error" :container="container || '.flex-scroll'" :delay="100"></x-img>
</template>

<script>
import { XImg } from 'vux'

export default {
  components: {
    XImg
  },

  props: ['container', 'src'],

  data (){
    return {
      
    }
  },

  methods: {

  }
}
</script>

<style lang="less" scoped>
.img{
  background-color: #eee;
}

.error{
  // 图片加载失败时，要显示的替代图片的路径
  background-image: url('~@img/sub/img_load_error.png');
  background-repeat: no-repeat;
  background-size: 100%;
  border: 1px #f2f2f2 solid;
  box-sizing: border-box;
}
</style>