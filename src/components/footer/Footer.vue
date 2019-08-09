<template>
  <footer class="flex-row">
    <div class="item flex-grow" @click="toView(0)">
      <div class="img-container">
        <img src="@img/home_icon_home_1@2x.png" v-if="selected === 0">
        <img src="@img/me_tab_icon_home@2x.png" v-else>
      </div>
      <p class="title" :class="{ selected: selected === 0 }">首页</p>
    </div>

    <div class="item flex-grow" @click="toView(1)">
      <div class="img-container">
        <img src="@img/home_icon_faxian_1@2x.png" v-if="selected === 1">
        <img src="@img/home_icon_faxian_0@2x.png" v-else>
      </div>
      <p class="title" :class="{ selected: selected === 1 }">发现</p>
    </div>

    <div class="item flex-grow bigBtn" @click="toView(2)">
      <div class="img-container" style="position:initial;">
        <img style="visibility: hidden">
        <img src="@img/home_icon_fabu@2x.png" class="plusImg">
      </div>
      <p class="title" :class="{ selected: selected === 2 }">发布</p>
    </div>

    <div class="item flex-grow" @click="toView(3)">
      <div class="img-container">
        <img src="@img/home_icon_xiaoxi_1@2x.png" v-if="selected === 3">
        <img src="@img/home_icon_xiaoxi_0@2x.png" v-else>
        <div class="badge" v-if="unreadMsgCount">{{ unreadMsgCount }}</div>
      </div>
      <p class="title" :class="{ selected: selected === 3 }">消息</p>
    </div>

    <div class="item flex-grow" @click="toView(4)">
      <div class="img-container">
        <img src="@img/home_icon_me_1@2x.png@2x.png" v-if="selected === 4">
        <img src="@img/home_icon_me_0@2x.png" v-else>
      </div>
      <p class="title" :class="{ selected: selected === 4 }">我的</p>
    </div>
  </footer>
</template>

<script>
export default {
  props: ['value'],

  data (){
    return {
      selected: this.value,
      items: ['/', 'index/finds', 'index/publish', 'index/messages', 'index/my'],
      unreadMsgCount: 0
    }
  },

  mounted (){
    this.checkRoute()
    this.getUnreadMessagesCount()
  },

  watch: {
    $route (route){
      this.checkRoute()

      if(route.name === 'index/messages'){
        this.getUnreadMessagesCount()
      }
    }
  },

  methods: {
    checkRoute (){
      this.items.some((val, ind) =>{
        if(this.$route.name === val) this.selected = ind
      })
    },

    toView (index){
      this.$toView(this.items[index])
      this.$emit('input', index)
    },

    getUnreadMessagesCount (){
      _api('message/getListByCon', { is_read: 0 })
      .then(data => this.unreadMsgCount = data.total)
    }
  }
}
</script>

<style lang="less" scoped>
footer{
  text-align: center;
  background-color: white;
  margin-top: auto;
  box-shadow: 0 -1px 3px #eee;
  z-index: 300;
  height: 50px;

  @media screen and (max-height: 400px) {
    display: none;
  }

  .item{
    height: 50px;
    flex-basis: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    img{
      width: 25px;
      height: 25px;
      margin-bottom: -8px;
    }

    .title{
      width: 100%;
      font-size: 13px;
      color: @subtext;

      &.selected{
        color: @theme;
      }
    }
  }

  .bigBtn{
    position: relative;

    .plusImg{
      width: 45px;
      height: 45px;
      position: absolute;
      top: calc(~'50% - 1em - 5px');
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>