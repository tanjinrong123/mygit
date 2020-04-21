<template>
    <div class="loginContainer">
        <div class="login">
            <p>滑坡灾害信息管理系统</p>
            <p>用户登录</p>
            <!--element的form表单-->
            <div class="login-content">
                <el-form  :label-position="labelPosition" :model="formLabelAlign"
                         :rules="rules" ref="formLabelAlign" status-icon  label-width="100px">
                    <el-form-item label="用户名" prop="username">
                        <el-input  v-model="formLabelAlign.username"
                                   placeholder="请输入用户名"  autocomplete="on" >
                            <i slot="prefix" class="iconfont icon-my"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="formLabelAlign.password" placeholder="请输入密码"
                                  autocomplete="off">
                            <!--阿里字体，slot是element的控制图标位置的-->
                            <i slot="prefix" class="iconfont icon-lock"></i>
                            <!-- <i slot="suffix" class="iconfont icon-display"></i> -->
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" plain @click="onSubmit('formLabelAlign')">登录</el-button>
                        <el-button type="info" plain @click="onRegister">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
  export default {
    data () {
      //element表单校验
      let checkname=(rule,value,callback)=>{
        if(!value){
          return callback(new Error('请输入用户名 '))
        }else{
          callback()
        }
      }
      let checkpass=(rule,value,callback)=>{
        if(!value){
          return callback(new Error('请输入密码'))
        }else{
          callback()
        }
      }
      return {
        labelPosition: 'right',
        formLabelAlign: {
         username: '',
          password: ''
        },
        rules: {
          username: [
            // {required: true, message: '请输入用户名', trigger: 'blur'}
            {validator:checkname, trigger: 'blur'}
          ],
          password: [
            {validator:checkpass, trigger: 'blur'}
            // {min: 5, max: 20, message: '长度在5到20个字符', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      // this.islogin()
    },
    methods: {
      //判断是否登录，已登录则跳转到主页
      islogin(){
        if (this.$store.state.user) {
          this.$router.push('/home')
        }
      },
      //提交valid验证后的表单，发送请求，调用接口，
      onSubmit (formName) {
          this.$refs[formName].validate((valid)=> {
            if (valid) {
              this.axios.post('login', this.formLabelAlign)
                .then(res => {
                  if (res.data.code === 200) {
                    sessionStorage.setItem('userName', res.data.user.user_name)
                    // this.$store.commit('user', res.data.user)
                    // this.$message.success('登录成功')
                    this.$router.push('/index')
                  }else{
                    //如果登录失败，重置表单，重新填写
                    //element的消息提示组件
                    this.$message.success('登录失败')
                    this.$refs[formName].resetFields()
                  }
                })
                .catch(err => {
                  console.log(err)
                })
            }
          })
          this.$router.push('/index')
        },
      //注册
      onRegister(){
        this.$router.push('/register')
      }

      }

  }
</script>


<style lang="less" scoped >
    // @import "../assets/fonts/iconfont.css";
    .loginContainer{
         display:flex;
        //  justify-content:center;
         align-items:center;
         width:100%;
         height:100%;
         background: url('../../assets/images/g.jpg') no-repeat center;
        -webkit-background-size:cover ;
        background-size: cover;

         .login{
             width: 400px;
             height: 270px;
             margin-left: 100px;
             background-color: #93b4bf;
             border-radius: 2%;
             padding: 15px 50px 0px 0px;
             color: #ffffffc4;

         }
        p{
            width: 100%;
            padding-left:23px;
            margin-bottom: 10px;
            font-size: 22px;
            text-align: center;
        }
        .login-content{
        .el-button{
            padding: 11px 44px;
        }
        .iconfont{
           font-size: 15px;
        }

        }
    }

</style>
<style>

    .login-content .el-form-item__label{
         color: #ebecefe3;
     }


</style>
