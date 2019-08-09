<template>
  <!-- 无限滚动容器 -->
  <scroll-view class="infinite-container flex-grow flex-scroll" @scroll.native="changeScroll" ref="scrollView">
    <div class="container" :class="{ paddingBottom: status === 3 }" ref="container">
      <slot></slot>
    </div>
  </scroll-view>
</template>

<script>
/*
  该组件对外暴露一个方法，用于获取滚动容器的vue实例，方法名为：getScrollViewVNode
*/
import ScrollView from '@c/ScrollView'
export default {
  components: {
    ScrollView
  },

  props: {
    // 加载更多数据所使用的方法
    loadMore: {
      default: new Function()
    },

    // 距离底部还有多少px时，加载loadMore方法
    limit: {
      default: 150
    },

    // 加载loadMore方法的间隔时长，单位为毫秒
    interval: {
      default: 500
    },

    // 初始化时执行loadMore的等待时长，防止刚进入没有内容时，立刻执行loadMore，单位为毫秒
    delay: {
      default: 1500
    },

    status: {},
  },

  data (){
    return {
      intervalFlag: false,
      delayOver: false
    }
  },

  mounted (){
    setTimeout(() => this.delayOver = true, this.delay)
  },

  methods: {
    // 监听滚动条变化
    changeScroll (e){
      if(!this.delayOver || this.status === 2){ return }
      var contentHeight = this.$refs.container.offsetHeight
      var containerHeight = e.target.offsetHeight
      if(contentHeight - e.target.scrollTop - containerHeight <= this.limit){
        if(!this.intervalFlag){
          this.loadMore()
          this.intervalFlag = true
          setTimeout(() => this.intervalFlag = false, this.interval)
        }
      }
    },

    getScrollViewVNode (){
      return this.$refs.scrollView
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  height: min-content;
}

.paddingBottom{
  padding-bottom: 30px;
}
</style>