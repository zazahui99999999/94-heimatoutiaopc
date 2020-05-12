import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission' // 引入权限模块
import ElementUI from 'element-ui' // 引入模块
import axios from '@/utils/request' // 引入axios
import Components from '@/components'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import '@/styles/index.less' // 引入基本样式
Vue.config.productionTip = false
Vue.use(Components) // 注册开发的自定义组件
Vue.use(ElementUI) // 全局注册element-ui框架 一旦全局注册 所有位置都可以使用组件
// Vue.use实际是会调用 ElementUI对象里的install 方法 并且传入当前的vue对象

Vue.prototype.$axios = axios // 将axios赋值给 Vue对象的原型属性
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
