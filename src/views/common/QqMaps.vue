<template>
  <div class="flex">
    <vue-header title="选择位置">
      <strong slot="right" class="checkBtn" @click="check">确定</strong>
    </vue-header>
    <div class="qq-maps flex-grow" ref="maps"></div>
  </div>
</template>

<script>
// 腾讯地图
// 传入route.params.location = { lat, lon }，也就是坐标经纬度对象，要求为gps经纬度
export default {
  data (){
    return {
      mapsInstance: null, 
      location: null,
      marker: null,
      address: null,
    }
  },

  created (){
    this.location = this.$route.params.location
  },

  mounted (){
    this.init()
  },

  methods: {
    // 初始化地图
    async init (){
      // gps经纬度转腾讯地图经纬度
      var translate = (lat, lon) => new Promise((resolve, reject) =>
        qq.maps.convertor.translate(new qq.maps.LatLng(lat, lon), 1, result => resolve(result[0]))
      )
      
      var myOptions = {
        zoom: 18,
        center: await translate(this.location.lat, this.location.lon),
        mapTypeId: qq.maps.MapTypeId.ROADMAP
      }

      this.mapsInstance = new qq.maps.Map(this.$refs.maps, myOptions)

      // 绑定点击事件
      qq.maps.event.addListener(this.mapsInstance, 'click', ({latLng}) =>{
        this.$alert.loading.show()
        // 清除原有标记
        this.marker && this.marker.setMap(null)
        this.location = {
          lat: latLng.getLat(),
          lon: latLng.getLng()
        }
        
        _api('common/locationToAddress', this.location)
        .finally(this.$alert.loading.hide)
        .then(async data =>{
          // 在地图上添加标记
          this.marker = new qq.maps.Label({
            position: new qq.maps.LatLng(this.location.lat, this.location.lon),
            map: this.mapsInstance,
            content: data.address
          })
          
          this.address = data
        })
        .catch(() => this.$alert.toast('网络错误', 'cancel'))
      })


          
    },

    // 返回点击的地址
    check (){
      if(!this.address){
        this.$alert.toast('您还未选择位置')
        return
      }

      this.$route.params.callback(this.address, this.location)
    }
  }
}
</script>

<style lang="less" scoped>
.qq-maps{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}

.checkBtn{
  color: @theme;
}
</style>