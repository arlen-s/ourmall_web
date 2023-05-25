<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      width="600px"
      :visible.sync="data.isShow"
    >
      <div slot="title" class="d-title">
        <h3>Welocome to <span>{{$root.$children[0].pName.b}} App</span></h3>
        <h4>Create your {{$root.$children[0].pName.a}} account here</h4>
      </div>
      <div class="body-wrap">
        <form id="homeSignup" name="signup">
          <div class="ipt-box">
            <el-input v-model="data.email" 
              placeholder="Please fill in your Email as your Username">
            </el-input>
          </div>
          <!-- <vue-simple-verify
            ref="verify"
            :width="560"
            movedColor="#67C23A"
            tips="Slide to get your CAPTCHA"
            :successTips="emailLoading ? 'Loading' : `Validation passed. try again in ${sec} seconds`"
            style="margin-bottom: 15px;"
            @success="verifySuccess"
          /> -->
          <!-- <div class="ipt-box d-flex">
            <el-input 
              :disabled="data.isReadonly && !sec" 
              v-model="data.captcha"
              name="captcha"
              placeholder="Please fill in the CAPTCHA you received">
            </el-input>
          </div> -->
          <div class="ipt-box">
            <el-tooltip class="item" effect="dark"  placement="top-start"
              content="The password must contain letters, and numbers, Minimum 8 characters"
            >
              <el-input
                :disabled="data.isReadonly && !sec" 
                v-model="data.password" show-password
                placeholder="Please set your password">
              </el-input>
            </el-tooltip>
          </div> 
          <div class="ipt-box">
            <el-input
              :disabled="data.isReadonly && !sec"
              v-model="data.rePassword" show-password
              placeholder="Please confirm your password">
            </el-input>
          </div>
          <div class="submit-box">
            <el-button :loading="data.loading"
              type="primary" :disabled="data.isReadonly && !sec" style=" margin-right: 15px;"
              @click="register"
            >
              Create {{$root.$children[0].pName.a}} Account
            </el-button>
            <span class=" mg-r-5">{{$t('Already have an account?')}}</span>
            <el-link type="primary" @click="openSingIn">{{$t('Sign in')}}</el-link>
          </div>
        </form>
        <el-divider ><span>{{$t('or Sign in with')}}</span></el-divider>
        <OtherLogin :platformArr="platformArr" @selectLogin="selectLogin"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import OtherLogin from './OtherLogin'
export default {
  props: ["data", "platformArr", "sec"],
  data(){
    return {
      emailLoading: false,
    }
  },
  components: {
    OtherLogin,
  },
  watch: {
    'data.isShow'(){
      if(this.data.isShow){
        setTimeout(()=>{
          this.data.isReadonly = false;
        },500)
        if(this.$refs.verify){
          this.$refs.verify.reset();
        }   
      }
    }
  },
  methods: {
    register(){
      this.$emit('register')
    },
    sendToken(){
      this.emailLoading = true;
      this.$Burying({
        object: '2002'
      })
      this.$apiCall('api.User.sendToken', {
        mobile: this.data.email,
        lang: "EN"}, r => {
        this.emailLoading = false;
        if (r.ErrorCode == 9999) {
          this.data.isReadonly = false;
          this.$emit('resetSEC', 'signup')
        }else{
          this.$refs.verify.reset();
          this.$message({message:  r.Message, type: "error"});
        }
      })
    },
    verifySuccess(){
      if(this.data.email && this.checkEmail()){
        this.sendToken();
      }else{
        this.$refs.verify.reset();
        this.$message({message:'Please enter a valid Email.', type: "error"});
      }
    },
    openSingIn(){
      this.$emit('openSingIn')
    },
    checkEmail(){
      var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
      if(this.data.email === ""){ //输入不能为空
        return false;
      }else if(!reg.test(this.data.email)){ //正则验证不通过，格式不对
        return false;
      }else{
        return true;
      }
    },
    selectLogin(platform){
      this.$emit('selectLogin', platform)
    },
  }  
}


</script>

<style lang="scss" scoped>
.d-title{
  padding: 5px 0 15px;
  border-bottom:1px #DCDFE6 solid;
  h3{
    line-height: 26px;
    font-size: 18px;
    span{
      color: #5c6ac4
    }
  }
  h4{
    color: #909399;
    font-size: 16px;
  }
}
.body-wrap{
  padding: 0 20px;
  .ipt-box{
    margin-bottom: 20px;
  }
  .submit-box{
    display: flex;
    align-items: center;
    margin-bottom: 40px;
  }
}
</style>