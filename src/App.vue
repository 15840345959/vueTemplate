<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <!-- actionsheet全局方法组件 -->
    <x-actionsheet v-model="visibleActionSheet"
      v-bind="actionSheet.options"
      @on-click-menu="actionSheet.onClick"
      @on-click-menu-cancel="actionSheet.onCancel"
      @on-click-mask="actionSheet.onMask"
    ></x-actionsheet>

    <!-- loading提示 -->
    <transition name="fade">
      <x-spinner class="com-ab-center" v-show="visibleSpinner" :type="spinnerType"></x-spinner>
    </transition>
  </div>
</template>

<script>
import { Toast, Actionsheet, Spinner } from 'vux'
import mountVuxAlerts from './vuxAlerts.js'

export default {
  components: {
    XActionsheet: Actionsheet,
    XSpinner: Spinner,
  },

  data (){
    return {
      visibleActionSheet: false,
      actionSheet: {
        options: {},
        onClick: new Function(),
        onCancel: new Function(),
        onMask: new Function()
      },

      visibleMask: false,

      visibleSpinner: false,
      spinnerType: 'crescent',
    }
  },

  mounted (){
    // 挂载通知方法
    mountVuxAlerts(this)
    window._alert = this.$alert
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~@/styles/main.less';

</style>
