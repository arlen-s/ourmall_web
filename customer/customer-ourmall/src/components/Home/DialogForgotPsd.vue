<template>
  <el-dialog
    :close-on-click-modal="false"
    width="600px"
    :visible.sync="data.isShow"
    title="Change password"
  >
    <div class="body-wrap">
      <form id="homeForgotPSD" name="forgotPSD">
        <div class="ipt-box">
          <el-input v-model="data.email" 
            placeholder="Please fill in your Email as your Username">
          </el-input>
        </div>
        <vue-simple-verify
          ref="verify"
          :width="560"
          movedColor="#67C23A"
          tips="Slide to get your CAPTCHA"
          :successTips="emailLoading ? 'Loading...' : `Validation passed. try again in ${sec} seconds`"
          style="margin-bottom: 15px;"
          @success="verifySuccess"
        />
        <div class="ipt-box d-flex">
          <el-input 
            :disabled="data.isReadonly && !sec"
            v-model="data.captcha"
            name="captcha"
            placeholder="Please fill in the CAPTCHA you received">
          </el-input>
        </div>
        <div class="ipt-box">
          <el-tooltip class="item" effect="dark"  placement="top-start"
            content="The password must contain letters, and numbers, Minimum 8 characters"
          >
            <el-input
              :disabled="data.isReadonly && !sec"
              v-model="data.password" show-password
              placeholder="Please set your new password">
            </el-input>
          </el-tooltip>  
        </div>
        <div class="ipt-box">
          <el-input
            :disabled="data.isReadonly && !sec"
            v-model="data.rePassword" show-password
            placeholder="Please confirm your new password">
          </el-input>
        </div>
      </form>  
    </div>
    <el-divider></el-divider>
    <div slot="footer" class="dialog-footer">
      <el-button  @click="data.isShow = false">{{$t('Discard')}}</el-button>
      <el-button :loading="data.loading" :disabled="data.isReadonly && !sec" type="primary"  @click="saveNewPSD">{{$t('Confirm')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["data", "sec"],
  data(){
    return {
      emailLoading: false,
    }
  },
  watch: {
    'data.isShow'(){
      if(this.data.isShow){
        setTimeout(()=>{
          this.data.isReadonly = false;
        },500)
      }
    }
  },
  methods: {
    saveNewPSD(){
      this.$emit('saveNewPSD')
    },
    sendToken(){
      this.emailLoading = true;
      this.$apiCall('api.User.sendToken', {
        mobile: this.data.email,
        reset: true,
        lang: "EN",
        }, r => {
        this.emailLoading = false;
        if (r.ErrorCode == 9999) {
          this.data.isReadonly = false;
          this.$emit('resetSEC', 'forgot')
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
  }
}
</script>

<style lang="scss" scoped>
.body-wrap{
  padding: 0 20px;
  .ipt-box{
    margin-bottom: 20px;
  }
}
</style>