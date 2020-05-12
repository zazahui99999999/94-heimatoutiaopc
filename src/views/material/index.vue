<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">
            素材管理
        </template>
      </bread-crumb>
      <!-- 放置一个上传的组件 -->
      <el-row  type="flex" justify="end">
          <!-- 上传组件必须要有action属性不传会报错，可以给空串 -->
        <el-upload :show-file-list="false" :http-request="uploadImg" action="">
          <el-button type="primary" size="small">上传素材</el-button>
        </el-upload>
      </el-row>
      <!-- {{activeName}} -->
      <!-- 放置标签页 v-model所绑定的值就是当前所激活的标签 切换tabs页签的时候 需要 进行事件的监听-->
      <el-tabs v-model="activeName" @tab-click="changeTab">
          <!-- 放置标签 label表示标签显示的名称-->
          <el-tab-pane label="全部素材" name="all">
              <!-- 内容 循环生成页面结构 -->
              <div class="img-list">
                  <!-- 采用v-for对list数据进行循环 -->
                  <el-card class="img-card" v-for="item in list" :key="item.id">
                      <!-- 放置图片 并且赋值图片地址-->
                      <img :src="item.url" alt="">
                      <!-- 操作栏 -->
                      <el-row class="operate" type="flex" justify="space-around" align="middle">
                          <i class="el-icon-star-on"></i>
                          <i class="el-icon-delete-solid"></i>

                      </el-row>
                  </el-card>
              </div>
          </el-tab-pane>
          <el-tab-pane label="收藏素材" name="collect">
              <div class="img-list">
                  <!-- 采用v-for对list数据进行循环 -->
                  <el-card class="img-card" v-for="item in list" :key="item.id">
                      <!-- 放置图片 并且赋值图片地址-->
                      <img :src="item.url" alt="">
                  </el-card>
              </div>
          </el-tab-pane>
      </el-tabs>
      <!-- 放置一个公共的分页组件 -->
      <el-row type="flex" justify="center" style="height:80px" align="middle">
          <!-- 放置分页组件 -->
          <el-pagination background
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :total="page.total"
          layout="prev,pager,next"
          @current-change="changePage"
          >

          </el-pagination>
      </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 当前激活的页签 默认选中全部素材
      list: [], // 接收全部素材
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 3
      }
    }
  },
  methods: {
    // 定义一个上传组件的方法
    uploadImg (params) {
      //  params.file 就是需要上传的图片文件
      // 接口参数类型要求是 formData
      const data = new FormData() // 实例化一个formData对象
      data.append('image', params.file) // 加入文件参数
      // 开始发送上传请求了
      this.$axios({
        url: '/user/images', // 请求地址
        method: 'post', // 上传或者新增一般都是post类型
        data // es6简写
      }).then(() => {
        // 如果成功了 我们应该 重新来取数据啊
        this.getMaterial()
      }).catch(() => {
        this.$message.error('上传素材失败')
      })
    },
    //   该方法会在页码切换时执行
    changePage (newPage) {
      // 传入一个新页
      this.page.currentPage = newPage // 将新页码赋值给页码数据
      this.getMaterial() // 获取数据
    },
    // 获取素材数据
    getMaterial () {
      this.$axios({
        url: '/user/images', // 请求地址
        params: {
          collect: this.activeName === 'collect', // 获取不是收藏的数据 就是获取全部的数据 这个位置应该变活根据当前的页签变活
          page: this.page.currentPage, // 取页码变量中的值，页码变量一变获取数据跟着变
          per_page: this.page.pageSize // 获取每页数量
        },
        data: {}

      }).then(result => {
        // 将返回的数据赋值到data中的数据
        this.list = result.data.results
        // 将总条数赋值给total变量
        this.page.total = result.data.total_count // 总数跟随当前页前变化而变化
      })
    },
    // 切换事件
    changeTab () {
      this.currentPage = 1 // 页码重置为第一页
      //   alert(this.activeName)
      // 可以根据当前 activeName 来决定是获取哪个方面的数据
      this.getMaterial() // 获取素材的数据
    }
  },
  created () {
    // 实例化之后 调用获取素材数据
    this.getMaterial() // 获取素材数据
    //   debugger
  }

}
</script>

<style lang='less' scoped>
 .img-list {
     display: flex;
     flex-wrap: wrap;
     justify-content: center;
     .img-card {
         width: 220px;
         height: 240px;
         margin: 20px 40px;
         position: relative;
         img {
             width: 100%;
             height: 100%;
         }
         .operate {
             position: absolute;
             left:0;
             bottom:0;
             width: 100%;
             background: #f4f5f6;
             height: 30px;
             i  {
                 font-size:20px;
             }
         }
     }
 }

</style>
