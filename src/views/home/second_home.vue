<template>
  <!-- 二级路由的默认组件 -->
  <div class="second-home">
     <!-- 幻灯片 -->
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in list" :key="item">
         <img :src="item" alt="">
      </el-carousel-item>
  </el-carousel>
  </div>

</template>

<script>
export default {
  data () {
    return {
      list: ['http://imgs.3songshu.com/www/cb1.png',
        'http://imgs.3songshu.com/www/cb2.png',
        'http://imgs.3songshu.com/www/cb3.png',
        'http://imgs.3songshu.com/www/cb4.png'
      ]
    }
  }

}
</script>

<style lang='less' scoped>
  .second-home {
    /* calc 计算的意思 在css中计算数值 用法calc(四则运算) 注意calc里面变量、运算符号之间一定要有空格否则图片不显示*/
    height: calc(100vh - 60px);
    background-size: cover;
    background-image: url('http://imgs.3songshu.com/www/cb2.png');
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
