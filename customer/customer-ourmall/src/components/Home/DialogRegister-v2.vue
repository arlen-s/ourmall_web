<template>
  <el-dialog
    :close-on-click-modal="false"
    width="500px"
    :visible.sync="data.isShow"
    title="REGISTER"
    class="dialog-reg"
    @opened="opened"
  >
    <div class="d-body">
      <el-form ref="regForm" label-position="top" label-width="120px" :rules="rules" :model="data.form">
        <el-form-item label="E-Mail" prop="email">
          <el-input v-model="data.form.email" placeholder="Please fill in your Email as your Username" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="data.form.password" show-password placeholder="Please set your password"  :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="Password confirm" prop="rePassword">
          <el-input v-model="data.form.rePassword" show-password placeholder="Please confirm your password"  :readonly="readonly"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <div style="display: flex; justify-content: center; margin-bottom: 20px;">
        <el-button type="primary" @click="register" :loading="data.loading">CREATE AN ACCOUNT</el-button>
      </div>
      <div style=" display: flex; justify-content: flex-end; align-items: center; color: #909399;">
        Already had an account? <span style=" margin: 0 15px;">|</span> <el-link type="primary" @click="switchTo('login')">{{$t('Login')}}</el-link>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {queryUrlParam} from '../../plugins/tools'
export default {
  props: ["data"],
  data(){
    let checkEmail = (rule, value, callback) => {
      if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)){
        callback(new Error('Please enter the correct email address'))
      }else{
        callback();
      }
    }
    let checkPassword = (rule, value, callback) => {
      if(!/^(?=.*[A-Za-z])(?=.*\d)[^]{8,32}$/.test(value)){
        callback(new Error('The password must contain letters, and numbers, Minimum 8 characters'))
      }else{
        callback();
      }
    }
    let checkRePassord = (rule, value, callback) => {
      if(value != this.data.form.password){
        callback(new Error('The password and confirm password must be the same'))
      }else{
        callback();
      }
    }
    return {
      readonly: true,
      rules:{
        email: [
          {required: true, message: 'Email must be filled in', trigger: 'blur'},
          {validator: checkEmail, trigger: 'blur'},
        ],
        password: [
          {required: true, message: 'Password must be filled in', trigger: 'blur'},
          {validator: checkPassword, trigger: 'blur'},
        ],
        rePassword: [
          {required: true, message: 'Confirm password must be filled in', trigger: 'blur'},
          {validator: checkRePassord, trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    switchTo(type){
      this.$emit('switchTo', type)
    },
    register(){
      
      this.data.loading = true;
      this.$refs['regForm'].validate((valid) => {
        if(valid){ //验证成功
          this.$Burying({
            object: "2001",
          });
          let params = {
            username: this.data.form.email,
            password: this.data.form.password,
            notCheckCode: true,
            type: 1,
            lang: 'EN',
            invitationCode: queryUrlParam('invitationCode') || JSON.parse(localStorage.getItem('invitationCode'))
          }
          this.$emit('register', params);
        }else{ //验证失败
          this.data.loading = false;
          return false;
        }
      })
     
    },
    opened(){
      this.$nextTick(()=>{
        this.readonly = false;
        this.$refs['regForm'].clearValidate(); //清除验证
      })
    },
  },

}
</script>


<style lang="scss">
.dialog-reg{
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