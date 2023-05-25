<template>
  <div v-loading="loading" class="contentpanel recharge-page">
    <div
      class="pagetitle"
      ref="pageHeader"
    >
      <div class="left">
        <div class="title">
          <i class="fa fa-usd" aria-hidden="true"></i>
          <h2>{{$t('Package')}}</h2>
        </div>
      </div>
      <div class="right">
        <el-link type="primary" @click="gotoPayRecord">{{$t('Payment Record')}}</el-link>
      </div>
    </div>
    <div class="pagebody mg-b-20">
      <el-card>
        <div class="pay-title">{{$t('Choose your payment method')}}</div>
        <!-- 选择支付方式 -->
        <SelectPayMethod  style=" margin-bottom: 50px;" 
          :payMethodAcitve="payMethodAcitve"
          @selectPay="selectPay"
        />
        <div v-if="payMethodAcitve == 3" class=" free" @click="tawk">
        </div>
        <template v-else>
          <div class="pay-title">{{$t('Choose your recharge package')}}</div>
          <!-- 选择支付package -->
          <ChooseRechargePackage style=" margin-bottom: 35px"
            :items="packages"
            :vipType="vipType"
            @choose="choosePackage"
          />
          <div class="bottom-action">
            <div class="checkBox" style="margin-bottom:15px">
              <el-checkbox v-model="check1">&nbsp;</el-checkbox>
             {{$t('I agree the')}}  
            <el-link @click="gotoHelp('terms')">{{$t('Terms of use')}}</el-link>
            and
            <el-link @click="gotoHelp('refund')">{{$t('Refund Policy')}}</el-link>
            </div>
            <el-button :disabled="check1 == false || check2 == false" :loading="payLoading" type="primary" @click="payNow">{{$t('Pay NOW')}}</el-button>
          </div>
        </template>
      </el-card>  
    </div>
    <DialogPayStatusAlert :data="dialogPayAlert" @closePayPage="closePayPage" />
    <div v-if="isShowMask" class="mask" @click="isShowMask = false"></div>
    <checkout :data="dialogCheckOut" @payCheckOut="payCheckOut"/>
  </div>
</template>

<script>
import SelectPayMethod from './../components/Recharge/SelectPayMethod'
import ChooseRechargePackage from './../components/Recharge/ChooseRechargePackage'
import DialogPayStatusAlert from './../components/Recharge/DialogPayStatusAlert'
import checkout from './../components/checkout/checkout'
export default {
  data(){
    return {
      check1:true,
      check2:true,
      loading: false,
      payLoading: false,
      packages: [],
      vipType: '',
      newWin: null,
      payTime: 0,
      dialogPayAlert: {
        isShow: false,
        errorMsg: '',
        payItem: null,
        status: 1,
      },
      payMethodAcitve: 1,
      isShowMask: false,
      dialogCheckOut: {
        isShow: false,
        loading: false,
        packages: null,
        token: '',
      },
      dialogCheckOutDefault:'{}',
    }
  },
  components: {
    SelectPayMethod,
    ChooseRechargePackage,
    DialogPayStatusAlert,
    checkout,
  },
  mounted(){
    this.dialogCheckOutDefault = JSON.stringify(this.dialogCheckOut);
    this.check1 = this.check2 = true;
    this.getPackage();
    if(this.$store.state.userInfo){
      this.payMethodAcitve = this.$store.state.userInfo.timeLastPaid == '0' ? 3 : 1
    }
    // Tawk_API.onChatMinimized = () => {
    //     this.isShowMask = false;
    // };
    // Tawk_API.onChatHidden = () => {
    //     this.isShowMask = false;
    // };
  },
  beforeDestroy(){
    // Tawk_API.onChatMinimized = () => {};
    // Tawk_API.onChatHidden = () => {};
  },
  watch: {
    '$store.state.userInfo'(){ //支付选择默认状态
      this.payMethodAcitve = this.$store.state.userInfo.timeLastPaid == '0' ? 3 : 1;
    }
  },
  methods:{
    payCheckOut(token){
      //卡支付
      this.dialogCheckOut.loading = true;
      this.newWin = window.open( (this.$root.$children[0].baseUrl == '/my' ? '/my' : '') + '/blank.html', 'pay');
      this.dialogPayAlert.isShow = true;
      this.packages.forEach(e => {
        if(e.id == this.vipType){
          this.dialogPayAlert.payItem = e;
        }
      });
      this.$apiCall("api.User.goToPayByCustomer", {
        vipType: this.vipType,
        paymentType: 2,
        token,
      }, r => {
        this.dialogCheckOut.loading = false;
        if (r.ErrorCode == "9999" && r.Data.Results) {
          this.newWin.location = r.Data.Results;
          this.payTime = setInterval(()=>{
            this.getPayStatus();
          },2000)
        }else{
          this.dialogPayAlert.isShow = false;
          this.dialogCheckOut.isShow = false;
          this.$elementMessage(r.ErrorCode == "9999" ? 'fail' : r.Message, 'error');
          this.newWin.close();
        }
      })
    },
    openDialogCheckOut(){
      //打开卡支付
      this.dialogCheckOut = JSON.parse(this.dialogCheckOutDefault)
      this.dialogCheckOut.isShow = true;
      this.packages.forEach(e => {
        if(e.id == this.vipType){
          this.dialogCheckOut.packages = {...e}
        }
      });
    },
    gotoHelp(name){
      let routeData = this.$router.resolve({
      name,
      });
      window.open(routeData.href, '_blank');
      this.check1 = this.check2 = true;
    },
    gotoPayRecord(){
      this.$router.push({name: 'payList'})
    },
    tawk(){
      // if(Tawk_API.maximize){
      //   this.isShowMask = true;
      //   Tawk_API.addEvent('try-for-free', {
      //     free: 1,
      //   }, function(error){});
      //   Tawk_API.maximize();
      // }
      this.$root.$children[0].$refs['chatBtn'].openChatWin();
    },
    selectPay(type){
      // 选择支付方式
      this.payMethodAcitve = type;
    },
    getPayStatus(){
      //获取支付状态
      this.$apiCall('api.User.getPayStatusByCustomer', {}, r => {
        if (r.ErrorCode == "9999") {
          let status = r.Data.Results.status;
          if(status != 1){
            clearInterval(this.payTime)
          }
          if(status == 2){ //支付成功
            this.dialogPayAlert.status = 2;
            this.closePayPage();
            // 成功后重新获取userInfo
            this.$apiCall('api.User.checkLoginStatus', {}, r => {
              localStorage.setItem("c_apiUserToken",r.Data.Results.apiUserToken);
              localStorage.setItem("c_apiUserId", r.Data.Results.id);
              localStorage.setItem("c_userInfo",JSON.stringify(r.Data.Results));
            })
          }else if(status == 3){
            //支付失败
            this.dialogPayAlert.status = 3;
            this.dialogPayAlert.msg = r.Data.Results.message;
            this.$elementMessage(r.Data.Results.message, 'error');
						this.closePayPage();
          }
        }else{
          this.dialogPayAlert.msg = r.Message;
          this.$elementMessage(r.Message, 'error');
          clearInterval(this.payTime)
        }
      })
    },
    payNow(){
      if(this.payMethodAcitve == 4){
        this.openDialogCheckOut();
        return;
      }
      this.newWin = window.open( (this.$root.$children[0].baseUrl == '/my' ? '/my' : '') + '/blank.html', 'pay');
      this.dialogPayAlert.isShow = true;
      this.packages.forEach(e => {
        if(e.id == this.vipType){
          this.dialogPayAlert.payItem = e;
        }
      });
      this.payLoading = true;
      this.$apiCall("api.User.goToPayByCustomer", {
        vipType: this.vipType,
        paymentType: this.payMethodAcitve,
      }, r => {
        this.payLoading = false;
        if (r.ErrorCode == "9999") {
          this.newWin.location = r.Data.Results;
          this.payTime = setInterval(()=>{
            this.getPayStatus();
          },2000)
        }else{
          this.$elementMessage(r.Message, 'error');
        }
      })
    },
    choosePackage(id){
      // 选择支付套餐
      this.vipType = id;
    },
    getPackage(){
      this.loading = true;
      this.$apiCall("api.User.getCustomerVip", {}, r => {
        this.loading = false;
        if (r.ErrorCode == "9999") {
          let data = r.Data.Results;
          this.packages = Object.keys(data.vip).map(e => {
            data.vip[e].id = e;
            return data.vip[e];
          })
          this.vipType = this.packages[0].id;
        }else{
          this.$elementMessage(r.Message, 'error');
        }
      })
    },
    closePayPage(){ //关闭支付新开页面
      this.newWin.close();
      clearInterval(this.payTime);
    }
  }
}
</script>

<style lang="scss" scoped>
.free{
  margin: 0 auto;
  width: 600px;
  height: 450px;
  background-image: url('./../../public/images/free-trial.png');
  background-size: 100%;
  cursor: pointer;
}
.pay-title{
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: center;
  color: #303133;
  font-weight: bold;
  font-size: 16px;
}
.bottom-action{
  margin-bottom: 15px;
  text-align: center;
}
.mask{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2005;
  background-color: rgba(33, 33, 33, .4);
}
.checkBox{
  label{
    margin-right: 10px !important;
    margin-left: 17px !important;
  }
}
.checkBox ::v-deep .el-link--default{
  position: relative;
    top: -2px;
    color:#5c6ac4;
}

</style>