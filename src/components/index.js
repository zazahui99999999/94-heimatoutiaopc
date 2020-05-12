// 需要使用Vue.use的方式去注册
// Vue.use会调用对象中的install方法 install方法第一个参数 是Vue对象
import LayoutAside from './home/layout-aside'
import LayoutHeader from './home/layout-header'
import BreadCrumb from './common/bread-crumb'
export default {
  install: function (Vue) {
    // 注册全局组件 Vue
    // alert('调用了哦')
    Vue.component('layout-header', LayoutHeader) // 注册头部组件
    Vue.component('layout-aside', LayoutAside) // 注册左侧导航组件
    Vue.component('bread-crumb', BreadCrumb) // 注册面包屑组件
  }
}
