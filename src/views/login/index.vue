<template>
    <div class="login">
        <!-- 表单 -->

        <el-card class="login-card">
        <!-- 表单内容 -->
        <!-- 头部logo部分 -->
        <div class="title">
            <img src="../../assets/img/three_squirrels-logo.png" alt="">
        </div>
        <!-- 表单 绑定model属性 绑定rules属性(表单验证规则) ref 给el-form一个属性-->
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" style="margin-top:20px">
            <!-- 表单容器  设置prop属性 prop表示要校验的字段名-->
            <el-form-item prop="mobile">
                <!-- 表单域 -->
                <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <!-- 验证码 -->
            <el-form-item prop="code">
                <el-input v-model="loginForm.code" style="width:60%" placeholder="请输入验证码"></el-input>
                <!-- 放置一个按钮 -->
                <el-button style="float:right" plain>发送验证码</el-button>
            </el-form-item>
            <!-- 表单域 -->
            <el-form-item prop="checked">
                <!-- 是否同意被人家坑 -->
                <el-checkbox v-model="loginForm.checked">我已阅读同意 <el-link :underline = false style="vertical-align:center">用户协议</el-link>和<el-link :underline = false>隐私条款</el-link></el-checkbox>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item>
                <el-button @click="login" style="width:100%" type="primary">登录</el-button>
            </el-form-item>
        </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
  data () {
    // 登陆表单数据
    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false // 是否同意用户协议
      },
      // 定义表单的验证规则
      loginRules: {
        // required 如果为true表示该字段必填
        mobile: [{ required: true, message: '亲~您的手机号不能为空' }, {
          pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, // 正则表达式
          message: '您的手机号格式不正确'
        }],
        code: [{ required: true, message: '亲~您的验证码不能为空' }, {
          pattern: /^\d{6}$/, // 要求6个数字
          message: '亲~验证码应该是6位数字'
        }],
        // 自定义校验 required不能校验true/false
        checked: [{
          validator: function (rule, value, callback) {
          // rule是当前的校验规则
          // value是当前的要校验的字段值
          // callback是一个回调函数 不论成功或者失败都要执行
          // 成功执行callback 失败执行callback(new Error('错误信息'))
          // 我们认为如果 value为true就表示校验成功 如果value为false就表示校验失败
          // new Error(错误信息)就是我们提示的错误信息
            value ? callback() : callback(new Error('您必须同意条款呢'))
          }
        }]
      }
    }
  },
  methods: {
    login () {
      // this.$ref.loginForm 获取的就是el-form的对象实例
      // 第一种 回调函数 isOk,fields(没有校验通过的字段)
      // this.$ref.loginForm.validate(function (isOk) {
      //   if (isOk) {
      //     console.log('校验通过')
      //   } else {
      //     console.log('校验未通过')
      //   }
      // }) // 方法
    // 第二种方法
      // this.$ref.loginForm.validate().then(() => {
      //   // 如果成功通过 校验就会到达 then
      //   alert(123)
      // })
      this.$refs.loginForm.validate().then(() => {
        // 如果成功通过 校验就会到达 then
        // 通过校验之后 应该做什么事 -> 应该调用登录接口 看看手机号是否正常
        //   this.$axios.get/post/delete/put
        this.$axios({
          url: '/authorizations', // 请求地址
          data: this.loginForm,
          // data: { ...this.loginForm, checked: null }, // body请求体参数
          method: 'post'
        }).then(result => {
          // 成功 之后打印结果
          // 把钥匙放在兜里 也就是把token存于 本地缓存
          // window.localStorage.setItem('user-token', result.data.data.token)
          window.localStorage.setItem('user-token', result.data.token)
          // 跳转到主页
          this.$router.push('/home') // push 和 router-link类似 to属性 可以直接是字符串 也可以是对象
        }).catch(() => {
          // 提示消息
          // 第一种用法
          // this.$message({ message: '用户名或者密码错误', type: 'error' })
          this.$message.error('用户名或者密码错误')
        })
      })
    }
  }

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
    // background-image: url('../../assets/img/three_squirrels-bg.jpg');
    height: 100vh; // 当前屏幕可视区域100%
    display: flex;
    justify-content: center;
    align-items: center;
    // less中的&，去除层级之间的空格 有 & 时解析的是同一个元素或此元素的伪类，没有 & 解析是后代元素
    &:before {
        // content内容会显示
        content: '';
        // .login盒子控制伪类的大小所以要设置100%
        width: 100%;
        height: 100%;
        position: absolute;
        background-image: url('../../assets/img/three_squirrels-bg.jpg');
        // filter: blur(2px);
        background-size: cover;
    }
    // 毛玻璃效果 filter: blur(5px) 字也很模糊
    .login-card {
        background: rgba(0,0,0,0);
        // 跟伪类同级所以要设置层级关系
        z-index: 2;
        border-radius: 10px;
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
