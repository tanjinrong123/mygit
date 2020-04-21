<template>
    <div class="registerContainer">
        <div class="register">
            <p>用户注册</p>
            <el-form ref="form" :model="form" label-width="80px" status-icon :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkpass">
                    <el-input type="password" v-model="form.checkpass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>

</template>

<script>

  export default {
    name: '',
    data(){
      let checkname=(rule,value,callback)=>{
        if(!value){
          return callback(new Error('请输入用户名 '))
        }else{
          callback()
        }
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.checkpass !== '') {
            this.$refs.form.validateField('checkpass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return{
        form:{
          username:'',
          password:'',
          checkpass:'',
          email:''
        },
        rules:{
          username:[
            {validator:checkname, trigger: 'blur',required: true,}
          ],
          email:[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
           ],
          password:[
            {validator:validatePass,trigger:'blur',required: true,},
            { min: 6, max: 20, message: '长度不少于6个字符', trigger: 'blur' }
          ],
          checkpass:[
            {validator:validatePass2 ,trigger:'blur',required: true,}
          ]
        }
      }
    },
    methods:{
      //提交注册
      submitForm(formName){
        this.$refs[formName].validate((valid)=>{
          if(valid){
            this.$ajax.post('/register',this.form)
              .then(res=>{
                console.log(res)
                if(res.data.code===200){
                  //element的消息框提示
                  this.$alert('注册成功',{center:true})
                  this.$router.push('/')
                }else{
                  this.$alert('注册失败',{center:true})
                }
              })
              .catch(err=>{
                console.log(err)
              })
          }
        })
      },
      //重置表单
      resetForm(formName){
        this.$refs[formName].resetFields()
      }
    }


  }
</script>

<style  lang="less" scoped>
.registerContainer{
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    margin:auto;
    /*height:650px;*/
    .register{
       margin: 100px auto;
        width:40%;
       .el-button{
         padding: 4% 20%;
         }
       .el-button--defalut{
           float: right;

       }
    p{
        text-align: center;
        font-size: 30px;
        margin-bottom: 30px;
    }
    }

}
</style>
