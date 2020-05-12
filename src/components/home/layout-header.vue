<template>
  <!-- <div class="layout-header">顶部操作栏组件</div> -->
  <!-- elementUI布局组件 el-row 和 el-col 为什么是:span=""-->
  <el-row align="middle" type="flex" class="layout-header">
      <!-- 分为两列 -->
      <!-- 左侧列 -->
      <el-col class="left" :span="12">
          <!-- 图标 -->
          <i class="el-icon-s-fold"></i>
          <span>奥利给秘制小汉堡股份有限公司</span>
      </el-col>
      <!-- 右侧列 -->
      <el-col class="right">
          <!-- 再次放置一个row组件 align属性设置垂直对齐方式 justify设置 水平对齐属性-->
          <el-row type="flex" justify="end" align="middle">
              <img :src="userInfo.photo" alt="">
              <!-- 下拉菜单 点击菜单项会触发command事件-->
              <el-dropdown trigger="click" @command="clickMenu">
                  <!-- 显示的内容 -->
                  <span>{{userInfo.name}}</span>
                  <!-- 下拉内容需要做具名插槽dropdown el-dropdown-menu是专门做下拉的组件-->
                  <el-dropdown-menu slot="dropdown">
                      <!-- 下拉选项 el-dropdown-menu是专门做下拉的组件 -->
                      <el-dropdown-item command="info">个人信息</el-dropdown-item>
                      <el-dropdown-item command="git">邮箱</el-dropdown-item>
                      <el-dropdown-item command="lgout">退出</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
          </el-row>
      </el-col>

  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {} // 用户个人信息
    }
  },
  methods: {
    // 需要处理三种情况
    clickMenu (command) {
    //   alert('点击了菜单' + command)
      if (command === 'info') {
        // 个人信息
      } else if (command === 'git') {
        // 如果点击了git地址就跳转到git仓库
        window.location.herf = 'https://github.com/shuiruohanyu/94-heimatoutiaopc'
      } else {
        // 退出系统 1、删除token 2、跳转回登陆页
        localStorage.removeItem('user-token') // 删除localStorage中某个选项
        this.$router.push('/login') // 跳回登录页  编程式导航
      }
    }
  },
  created () {
    // const token = localStorage.getItem('user-token') // 往兜里拿钥匙 也就是从缓存中取token
    // 获取用户的个人信息
    this.$axios({
      url: '/user/profile' // 请求地址
    //   headers: {
    //     Authorization: `Bearer ${token}` // 格式要求 Bearer +token
    //   } // 请求头参数 headers放置请求头参数
    }).then(result => {
      // 如果加载成功了 我们要将数据赋值给 userInfo
    //   this.userInfo = result.data.data
      this.userInfo = result.data
    })
    // .then(result => {
    //   this.userInfo = result.data.data
    // })
  }

}
</script>

<style lang='less' scoped>
  .layout-header {
      height: 60px;
      .left {
          i {
              font-size: 20px;
          }
      }
      .right {
          img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
          }
      }
  }

</style>
