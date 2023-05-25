<template>
  <el-dialog
    :close-on-click-modal="false"
    width="500px"
    :visible.sync="data.isShow"
    title="LOGIN"
    class="dialog-login"
    @opened="opened"
  >
    <div class="body-wrap">
      <el-form ref="loginForm" label-position="top" label-width="120px" :rules="rules" :model="data.form">
        <el-form-item label="E-Mail" prop="email">
          <el-input v-model="data.form.email" placeholder="Please enter your email address" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="data.form.password" show-password placeholder="Please input a password" :readonly="readonly" @keyup.enter.native="login"></el-input>
        </el-form-item>
      </el-form>  
      <div style=" padding: 0 20px">
        <el-link type="primary" @click="switchTo('forgotPSD')">{{$t('Forgot your password?')}}</el-link>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <div style="display: flex; justify-content: center; margin-bottom: 20px;">
        <el-button type="primary" @click="login" :loading="data.loading" style="padding: 12px 40px;">{{$t('LOGIN')}}</el-button>
      </div>
      <div style=" display: flex; justify-content: flex-end; align-items: center; color: #909399;">
        <span style=" margin-right: 15px;">No Account?</span>  <el-link type="primary" @click="switchTo('register')">{{$t('Sign up here')}}</el-link>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["data"],
  data(){
    return {
      readonly: true,
      rules: {
        email: [
          {required: true, message: this.$t('Email must be filled in'), trigger: 'blur'},
        ],
        password: [
          {required: true, message: this.$t('Password must be filled in'), trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
    login(){
      this.data.loading = true;
      this.$refs['loginForm'].validate((valid) => {
        if(valid){ //验证成功
          let params = {
            username: this.data.form.email,
            password: this.data.form.password,
            type: 1,
            lang: "EN",
          }
          this.$emit('login', params);
        }else{ //验证失败
          this.data.loading = false;
          return false;
        }
      })
    },
    switchTo(type){
      this.$emit('switchTo', type)
    },
    opened(){
      this.$nextTick(()=>{
        this.readonly = false;
        this.$refs['loginForm'].clearValidate(); //清除验证
      })
    },
  },
}
</script>


<style lang="scss">
.dialog-login{
  .el-form--label-top{
    margin: 0 20px;
    .el-form-item{
      margin-bottom: 15px;
      .el-form-item__label{
        margin-bottom: 0;
        padding-bottom: 0;
      } 
      .el-form-item__content{
        .el-form-item__error{
          margin-bottom: 0 !important;
        }
      }
    }
  }
}
</style>