<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      title="Sign In"
      width="600px"
      :visible.sync="data.isShow"
    >
      <div class="body-wrap">
        <div class=" d-flex mg-b-15">
          {{$t('No Account? ')}}
          <el-link class=" mg-l-10" type="primary" @click="openSingUp" >{{$t('Sign up here')}}</el-link>
        </div>
        <div>
          <div class="ipt-box">
            <el-input v-model="data.email" placeholder="Email"></el-input>
          </div>
          <div class="ipt-box">
            <el-input v-model="data.password" placeholder="Password" show-password></el-input>
          </div>
          <div class="submit-box">
            <el-button :loading="data.loading"
              type="primary" style="padding: 12px 40px;"
              @click="signIn"
            >{{$t('Sign in')}}</el-button>
            <el-link @click="forgotPS">{{$t('Forgot your password?')}}</el-link>
          </div>
          <el-divider ><span>{{$t('or Sign in with')}}</span></el-divider>
          <OtherLogin :platformArr="platformArr" @selectLogin="selectLogin"/>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import OtherLogin from './OtherLogin'
export default {
  props: ["data", "platformArr"],
  components: {
    OtherLogin,
  },
  methods: {
    signIn(){
      //登录
      this.$emit('signIn')
    },
    openSingUp(){
      this.$emit('openSingUp')
    },
    forgotPS(){
      this.$emit('forgotPS')
    },
    selectLogin(platform){
      this.$emit('selectLogin', platform)
    }
  }
}
</script>

<style lang="scss" scoped>
.body-wrap{
  padding: 0 20px;
  .ipt-box{
    margin-bottom: 20px;
  }
  .submit-box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
  }
}

</style>
