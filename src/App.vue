<template>
  <div style="height:100%; overflow:auto;">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <!-- actionsheet全局方法组件 -->
    <actionsheet v-model="visibleActionSheet"
      v-bind="actionSheet.options"
      @on-click-menu="actionSheet.onClick"
      @on-click-menu-cancel="actionSheet.onCancel"
      @on-click-mask="actionSheet.onMask"
    ></actionsheet>

    <!-- vux没有单独的下popup-picker，这个会自带一个cell栏，只好手动隐藏(定位定走) -->
    <popup-picker v-model="pickerVal" title="_" :data="pickerData" class="hidePicker" ref="picker"
      :columns="1"
      @on-hide="pickerHide"
    ></popup-picker>

    <!-- 遮罩层 -->
    <transition name="fade">
      <div class="com-mask" v-show="visibleMask" @click="hideMask"></div>
    </transition>
  </div>
</template>

<script>
import { Toast, Actionsheet, Spinner, PopupPicker } from 'vux'
import mountVuxAlerts from './config/vuxAlerts.js'
import mountApis from './config/api.js'
import alertMounted from './config/alertMounted.js'

export default {
  components: {
    Actionsheet,
    Spinner,
    PopupPicker,
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

      pickerVal: [],
      pickerData: [],
      pickerHide: new Function(),

      confirm: {
        title: '',
        content: '',
        cancel: new Function(),
        check: new Function(),
        visible: false
      },

      visibleMask: false,
      hideMask: new Function(),

      visibleSpinner: false,
      spinnerType: 'crescent',
    }
  },

  mounted (){
    // 挂载通知方法
    mountVuxAlerts(this)
    window._alert = this.$alert

   // 弹窗通知方法挂载完毕(api management也已经挂载完毕)
    alertMounted(this)
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~@/styles/main.less';

.hidePicker{
  position: fixed !important;
  left: -9999px;
}
</style>
