import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/index' // 用一种简写的形式 替换原来的方式 index可以不写因为home文件下只有index.vue
import Login from '@/views/login' // 简写形式
import SecondHome from '@/views/home/second_home'
// @代表一个别名 /src的别名
// @ is an alias to /src
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home' // 强制跳转redirect到home页

  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '', // 二级路由的path 什么都不写 代表二级路由的默认组件
        component: SecondHome // 默认的二级路由组件
      }, {
        // path:'/home/comment', // 完整地址 评论列表的地址
        path: 'comment', // 简写地址
        component: () => import('@/views/comment')// 按需加载的方式 组件
      }, {
        path: 'material',
        component: () => import('@/views/material')
      }
    ]
    // 在一级路由的路由表下 children 配置二级路由表
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
  // {
  //   // 按需加载
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
