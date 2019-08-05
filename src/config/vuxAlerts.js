import Vue from 'vue'

export default function(_this){
  /**
   * 显示toast
   * @author 张振东
   * @param {string} args[0] 显示的文字
   * @param {string} args[1] 可选，显示的类型或位置，取值范围：类型见下方types和positions。
   *  type默认为text，当type非text时，将展示图标，此时建议文字长度不超过5个全角字符
   *  position默认为default，位于屏幕的中上部
   *  根据一般使用情况，只有当types为text时才设置position，故将这两个参数合为一个
   * 
   * @param {string} args[2] 可选，toast栏宽度，默认为根据宽度自动撑开，如果文字过长请设置一个定值，此时将自动换行
   */
  function toast(...args){
    if(typeof args[0] === 'string'){
      var types = ['success', 'warn', 'cancel', 'text']
      var positions = ['default', 'top', 'middle', 'bottom']

      if(args[1] && (!types.includes(args[1]) && !positions.includes(args[1]))){
        throw new Error('无效的toast类型：' + args[1])
      }

      _this.$vux.toast.show({
        text: args[0],
        type: types.includes(args[1]) ? args[1] : 'text',
        position: positions.includes(args[1]) ? args[1] : 'default',
        width: args[2] ? args[2] : args[0].length + 2.6 + 'em'   
      })
    }
  }

  /**
   * 显示alert，默认title为“提示”
   * @author 张振东
   * @param {string}         content 提示文字 
   * @param {string, object} options 可选，当类型为字符串时，为设置alert的标题，
   *  当为对象时表示配置参数 @see https://doc.vux.li/zh-CN/components/alert.html
   * @return {promise}      窗口关闭时，变为成功状态
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
   * 开启options列表
   * @author 张振东
   * @param {array, object} menus 列表主题使用一个数组进行渲染，格式如下：
   * [
   *    {
   *      label: 显示文字,
   *      type: 对应值
   *    },
   *    ...
   * ]
   * 当类型为object时，将参数视为配置对象 @see https://doc.vux.li/zh-CN/components/actionsheet.html
   * @return {promise}     点击项时，变为成功状态，传入对应项的type值
   *                        点击取消按钮时，变为失败状态，传入字符串 cancel
   *                        点击遮罩时，变为失败状态，传入字符串 mask
   */
  function actionSheet(menus){
    return new Promise((resolve, reject) =>{
      _this.actionSheet = {
        onClick: val => resolve(val),
        onCancel: () => reject('cancel'),
        onMask: () => reject('mask')
      }

      _this.actionSheet.options = {
        theme: 'android',
        ...(Array.isArray(menus) ? { menus } : menus)
      }
      _this.visibleActionSheet = true
    })
  }
  
  var loading = {
  /**
   * 显示loading，带mask
   * @param {string} text 显示文本 
   */  

   show (text){
    typeof text === 'string' ? _this.$vux.loading.show({ text }) : _this.$vux.loading.show()
   },

   hide (){
     _this.$vux.loading.hide()
   }
  }

  var spinner = {
    /**
     * 显示spinner
     * @author 张振东
     * @param {string} type 默认值为crescent，可选值参见 @see https://doc.vux.li/zh-CN/components/spinner.html 
     */
    show (type = 'crescent'){
      _this.spinnerType = type
      _this.visibleSpinner = true
    },

    /**
     * 隐藏spinner
     * @author 张振东
     */
    hide (){ _this.visibleSpinner = false }
  }

  /**
   * 打开下拉picker
   * @author 张振东
   * @param {array}    data       列表数据，成员为对象{ name: 显示文字, value: 对应值 } ，多列参考vux文档
   * @param {any}      defaultVal 默认值，
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
   * 项目风格的confirm
   * @author 张振东
   * @param {string} title   标题
   * @param {string} content 内容
   * @return {promise} 用户点击确定触发resolve，点击取消触发reject
   */
  function myConfirm(title, content){
    return new Promise((resolve, reject) =>{
      _this.confirm = {
        title, content,
        visible: true,
        check: () =>{
          _this.confirm.visible = false
          resolve()
        },
        
        cancel: () =>{
          _this.confirm.visible = false
          reject()
        },
      }
    })
  }

  var mask = {
    /**
     * 开启遮罩，点击遮罩自动关闭。可以传入一个函数，当点击遮罩时触发
     * @author 张振东
     * @param {function} hideMethod 可选，点击遮罩时执行的函数
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

  Vue.prototype.$alert = { toast, alert, actionSheet, loading, spinner, picker, myConfirm, mask }
}