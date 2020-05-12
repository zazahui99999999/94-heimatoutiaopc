<template>
<!-- 先在最外面放一个大容器 因为小容器只能放到大容器里面 -->
    <el-container>
        <el-aside style="width:230px">
            <!-- 左侧导航区域 -->
            <layout-aside></layout-aside>
        </el-aside>
        <!-- 右侧在嵌套一个el-container -->
        <el-container>
            <!-- 再上下布局 -->
            <el-header>
                <!-- 顶部操作栏组件 -->
                <layout-header></layout-header>
            </el-header>
            <!-- 主要区域 el-main默认加了20px的内边距-->
            <el-main style="padding:0">
               <!-- 这里应该放置 二级路由容器 -->
               <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
// 将左侧导航组件引用注册 并使用
// import LayoutAside from '@/components/home/layout-aside'
// import LayoutHeader from '@/components/home/layout-header'
export default {
//   components: {
//     'layout-aside': LayoutAside,
//     'layout-header': LayoutHeader
//   }

}
</script>
<style>

</style>
