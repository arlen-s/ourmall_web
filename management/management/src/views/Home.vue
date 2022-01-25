<template>
  <div class="login-body">
    <div class="login-box">
      <div class="left">
        <h1></h1>
        <p>供应商内部管理后台</p>
      </div>
      <div class="right">
        <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="登录" prop="username">
            <el-input v-model="form.username" style=" width: 260px;"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" show-password style=" width: 260px;" @keyup.enter.native="toLogin"></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 0;">
            <el-button type="primary" :loading="loading" @click="toLogin">登录</el-button>
          </el-form-item>
        </el-form>  
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      loading: false,
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          {required: true, message: '用户名必须输入', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '密码必须输入', trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
    handleLogin(Results){
      localStorage.setItem("apiUserToken",Results.apiUserToken);
      localStorage.setItem("apiUserId", Results.id);
      localStorage.setItem("apiSubUserId", Results.subUserId ? Results.subUserId : "");
      localStorage.setItem("userInfo",JSON.stringify(Results));
      this.$store.commit("setUserInfo", Results);
      this.$root.$children[0].navMenu.some(e => {
        if(e.role && this.$isRole(e.role)){
          this.$router.push({ path: e.path });
          return true;
        }
      });
    },
    toLogin(){
      this.loading = true;
      this.$refs['loginForm'].validate((valid) => {
        if(valid){
          this.$apiCall("api.Admin.login", this.form, r => {
            this.loading = false;
            if (r.ErrorCode == 9999) {
              this.handleLogin(r.Data.Results)
            }else{
              this.$message({ message: r.Message, type: "error" });
            }
          })
        }else{
          this.loading = false;
        }
        
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-body{
  position: relative;
  height: 100%;
  padding-top: 200px;
  background-color: #535fb0;
  .login-box{
    display: flex;
    align-items: center;
    margin: 0 auto;
    width: 620px;
    padding: 30px;
    background-color: #fff;
    .left{
      padding-right: 30px;
      border-right: 1px #DCDFE6 solid;;
      h1{
        margin-bottom: 15px;
        width: 174px;
        height: 52px;
        background-image: url('/images/mgr/logo2.png');
      }
      p{
        color: #606266;
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
}
</style>