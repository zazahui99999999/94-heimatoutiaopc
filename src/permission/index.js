// 专门处理路由权限的问题
import router from '@/router'
// 注册全局前置守卫
// 回调函数会在路由发生改变之前执行
// next有三种场景
router.beforeEach(function (to, from, next) {
//   next() // 表示放过
// 首先应该判断拦截哪些页面 如果页面地址以/home为开头的地址需要进行token判断
  if (to.path.startsWith('/home')) {
    // 表示你要去主页相关的页面看是否有钥匙，没有返回登陆页
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login') // 回登陆页 去拿钥匙
    }
  } else {
    // 如果我不是去主业相关
    next() // 直接放过
  }
})
