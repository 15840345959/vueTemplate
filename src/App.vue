<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>

export default {

  data (){
    return {

    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~@/styles/main.less';

</style>
