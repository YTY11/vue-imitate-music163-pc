import Vue from 'vue'
import { Row, Col, Message, Form, FormItem, Button, Input, Link, Image } from 'element-ui'
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Link)
Vue.use(Image)

Vue.prototype.$message = function(type, msg) {
  Message({
    showClose: true, // 关闭按钮是否显示
    message: msg, // 提示信息
    type: type // 状态
  })
}
