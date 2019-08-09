<template>
  <!-- 无限容器对应的下方提示，不强制使用 -->
  <div class="hint" v-show="[0, 2, 4].includes(status)" @click="!status && method()">
    <spinner type="crescent" class="spinner" v-if="status === 2"></spinner>
    <span class="text">{{ ['加载失败，点此重试', '', '加载中', '', '已经没有啦'][status] }}</span>
  </div>
</template>

<script>
import { Spinner } from 'vux'
export default {
  // status表示当前加载状态，如下
  /*
    1：初始，还为执行过加载数据的方法
    2：加载中
    3：加载成功
    0：加载失败
    4：已全部加载
    5：已加载过，但获取到的数据为空
  */

  // method为用于加载的方法
  props: ['status', 'method'],

  components: {
    Spinner
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
.hint{
  height: 50px;
  text-align: center;
  margin: 10px 0;

  .spinner{
    margin-right: 10px;
  }
}
</style>