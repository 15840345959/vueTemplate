import Vue from 'vue'

// 下列所有方法也挂载于window._alert，可以在浏览器控制台中直接测试
export default function(_this){   // 该_this为App.vue的页面实例(相当于App.vue页面的this)
  /**
   * 显示toast
   * @author 张振东
   * @param {string} text 显示的文字
   * @param {string} type 可选，显示的类型或位置，取值范围：类型见下方types和positions。
   *  type默认为text，当type设置为"success, warn, cancel"中的任意一值时，将展示对应图标，下方显示文字，
   *  此时建议文字长度不超过5个全角字符
   *  position默认为default，位于屏幕的中上部
   * 
   * @param {string} width 可选，toast栏宽度，默认为根据宽度自动撑开，
   *                       如果文字过长请设置一个定值(推荐使用em为单位)，此时将自动换行
   */
  function toast(text, type, width){
    var types = ['success', 'warn', 'cancel', 'text']
    var positions = ['default', 'top', 'middle', 'bottom']

    if(type && (!types.includes(type) && !positions.includes(type))){
      throw new Error('无效的toast类型：' + type)
    }

    _this.$vux.toast.show({
      text,
      type: types.includes(type) ? type : 'text',
      position: positions.includes(type) ? type : 'default',
      width: width ? width : text.length + 2.6 + 'em'   
    })
  }

  /**
   * 显示alert，默认title为“提示”
   * @author 张振东
   * @param {string}         content 提示文字 
   * @param {string, object} options 可选，当类型为字符串时，为设置alert的标题，
   *  当为对象时表示配置参数 @see https://doc.vux.li/zh-CN/components/alert.html
   * @return {promise}      窗口关闭时(包括用户点击确定或遮罩)，变为成功状态
   * 
   * @example
   * this.$alert.alert('保存成功')    // 显示提示栏： 【提示】 保存成功
   * this.$alert.alert('保存成功', '成功')    // 【成功】 保存成功
   * this.$alert.alert('即将开始载入数据').then(() =>{    // 该窗口关闭后，执行操作
   *   this.$alert.toast('载入完毕')
   * })
   */
  function alert(content, options){
    return new Promise(resolve => {
      _this.$vux.alert.show({
        title: '提示',
        content,
        onHide: resolve,
        ...(typeof options === 'object' ? options : { title: options })
      })
    })
  }

  /**
   * 开启actionSheet列表
   * @author 张振东
   * @param {array, object} menus 列表主题使用一个数组进行渲染，格式如下：
   * [
   *    {
   *      label: 显示文字,
   *      value: 对应值
   *    },
   *    ...
   * ]
   * @param {string} theme 可选，出现的菜单风格，取值范围[ios, android] 默认为android，效果见vux文档
   * 当类型为object时，将参数视为配置对象 @see https://doc.vux.li/zh-CN/components/actionsheet.html
   * @return {promise}     点击项时，变为成功状态，传入对应项的value值
   *                       点击取消按钮时(默认没有取消按钮，要显示请传入配置对象)，变为失败状态，传入字符串 cancel
   *                       点击遮罩时，变为失败状态，传入字符串 mask
   * 
   * @example
   * this.$alert.actionSheet([
   *   {
   *     label: '选项1',
   *     value: 1
   *   }, {
   *     label: '选项2',
   *     value: 2
   *   }
   * ]).then(value =>{
   *   console.log('用户点击项的值为：', value)
   * }).catch(type =>{
   *   console.log('用户没有选择，关闭了菜单')
   *   switch(type){
   *     case 'cancel': {
   *       console.log('用户点击取消将菜单关闭了')
   *     }
   *     case 'mask': {
   *       console.log('用户点击遮罩将菜单关闭了') 
   *     }
   *   }
   * })
   */
  function actionSheet(menus, theme = 'android'){
    return new Promise((resolve, reject) =>{
      _this.actionSheet = {
        onClick: val => resolve(val),
        onCancel: () => reject('cancel'),
        onMask: () => reject('mask')
      }

      _this.actionSheet.options = {
        theme,
        ...(Array.isArray(menus) ? { menus } : menus)
      }
      _this.visibleActionSheet = true
    })
  }
  
  var loading = {
  /**
   * 显示loading，带mask
   * @param {string} text 显示在loading转圈下的文本，默认为没有文本
   */  

   show (text){
    typeof text === 'string' ? _this.$vux.loading.show({ text }) : _this.$vux.loading.show()
   },

   hide (){
     _this.$vux.loading.hide()
   }
  }


  /**
   * 打开下拉picker，只支持单列，多列请参考vux文档
   * @author 张振东
   * @param {array}    data       列表数据，成员为对象{ name: 显示文字, value: 对应值 } 
   * @param {any}      defaultVal 默认值
   * @return {promise} 用户点击确认时触发resolve，传回选中的值，其他方式关闭选择栏时触发reject
   */
  function picker(data, defaultVal){
    return new Promise((resolve, reject) =>{
      _this.pickerVal = []
      typeof defaultVal !== 'undefined' && _this.pickerVal.push(defaultVal)
      _this.pickerData = data
      _this.pickerHide = result => result ? resolve(_this.pickerVal[0]) : reject()
      _this.$refs.picker.$el.querySelector('.weui-label').click()
    })
  }

    /**
   * 显示confirm，默认title为“提示”
   * @author 张振东
   * @param {string}         content 提示文字 
   * @param {string, object} options 可选，当类型为字符串时，为设置alert的标题，
   *  当为对象时表示配置参对象 @see https://doc.vux.li/zh-CN/components/confirm.html
   * @return {promise}      点击确定时变为成功状态，当为input模式时会传入用户输入的值
   *                        弹窗关闭时(包括用户点击取消或遮罩)，变为失败状态
   *                        
   */
  function confirm(content, options){
    return new Promise((resolve, reject) => {
      _this.$vux.confirm.show({
        title: '提示',
        content,
        hideOnBlur: true,
        onConfirm: resolve,
        onHide: reject,
        ...(typeof options === 'string' ? { title: options } : options )
      })
    })
  }

  var mask = {
    /**
     * 开启遮罩，点击遮罩自动关闭。可以传入一个函数，当点击遮罩时触发
     * 多用于配合其他自定义弹窗通知组件，可以直接在当前这个文件使用
     * @author 张振东
     * @param {function} hideMethod 可选，点击遮罩时执行的函数
     * 
     * 下面的代码演示了创建一个自定义风格的alert时，使用该方法的例子
     * 假设在App.vue已经写好了一个alert，控制该alert显示的变量为this.visibleMyAlert，
     * 现在需要将这个alert通过方法来调用，并在调用时显示遮罩，在点击遮罩时关闭alert
     * @example
     * function myAlert(){
     *    return new Promise((resolve, reject) =>{
     *       this.visibleMyAlert = true
     *       mask.show(() => this.visibleMyAlert = false)   // 传入的这个回调，将在用户点击遮罩时执行
     *    })  
     * }
     */
    show (hideMethod){
      _this.visibleMask = true
      _this.hideMask = () =>{
        hideMethod && hideMethod()
        _this.visibleMask = false
      }
    },

    hide (){
      _this.hideMask()
    },
  }

  Vue.prototype.$alert = { toast, alert, confirm, actionSheet, loading, picker, mask }
}