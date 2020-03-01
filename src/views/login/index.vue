<template>
    <div class="login">
        <!-- 表单 -->
        <el-card class="login-card">
        <!-- 表单内容 -->
        <!-- 头部logo部分 -->
        <div class="title">
            <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <!-- 表单 -->
        <el-form style="margin-top:20px">
            <!-- 表单容器 -->
            <el-form-item>
                <!-- 表单域 -->
                <el-input placeholder="请输入手机号"></el-input>
            </el-form-item>
            <!-- 验证码 -->
            <el-form-item>
                <el-input style="width:60%" placeholder="请输入验证码"></el-input>
                <!-- 放置一个按钮 -->
                <el-button style="float:right" plain>发送验证码</el-button>
            </el-form-item>
            <!-- 表单域 -->
            <el-form-item>
                <!-- 是否同意被人家坑 -->
                <el-checkbox>我已阅读同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item>
                <el-button style="width:100%" type="primary">登录</el-button>
            </el-form-item>
        </el-form>
        </el-card>

    </div>
</template>
<script>
export default {

}
</script>
<style lang='less' scoped>
// 加了scoped属性 只会对自己的html起作用
// 如果需要写less，需要在style标签中 lang='less'
// h1 {
//     color: red;
// }
// .login {
//     h1 {
//         color: red;
//     }
// }
// css中不能用@当/src
.login {
    background-image: url('../../assets/img/login_bg.jpg');
    height: 100vh; // 当前屏幕可视区域100%
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    // 毛玻璃效果 filter: blur(5px) 字也很模糊
    .login-card {
        width: 440px;
        height: 340px;
        .title {
            text-align: center;
            img {
                height: 40px;
            }
        }
    }

}

</style>
