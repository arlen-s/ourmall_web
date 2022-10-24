<template>
  <div
    v-loading.fullscreen="loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <!-- 已经打开钱包 -->
    <template v-if="$store.state.userInfo.walletOpen"> 
      <el-row :gutter="10">
        <el-col :span="2"><div style="height: 5px;"></div></el-col>
        <el-col :span="4">
          <el-card class="amount-card">
            <el-tooltip
              class="item"
              effect="dark"
              content="总余额"
              placement="top-start"
            >
              <i class="el-icon-question"></i>
            </el-tooltip>
            <div class="center-i">
              <i class="el-icon-s-finance"></i>
            </div>
            <div class="info">
              <p class="type">钱包余额({{$store.state.country.symbol}})</p>
              <div class="amount">{{balance}}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card class="amount-card">
            <el-tooltip
              class="item"
              effect="dark"
              content="可提现余额=总额-提现中的金额-冻结金额"
              placement="top-start"
            >
              <i class="el-icon-question"></i>
            </el-tooltip>
            <div class="center-i">
              <i class="iconfont icon-withdraw"></i>
            </div>
            <div class="info">
              <p class="type">可提现金额({{$store.state.country.symbol}})</p>
              <div class="amount">{{withdrawAmount}}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4" class="mg-b-20">
          <el-card class="amount-card">
            <el-tooltip
              class="item"
              effect="dark"
              content="供应商申请提现中的金额"
              placement="top-start"
            >
              <i class="el-icon-question"></i>
            </el-tooltip>
            <div class="center-i">
              <i class="iconfont icon-withdrawaing"></i>
            </div>
            <div class="info">
              <p class="type">提现中金额({{$store.state.country.symbol}})</p>
              <div class="amount">{{withdrawing}}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card class="amount-card">
            <el-tooltip
              class="item"
              effect="dark"
              content="供应商已提现的金额总和"
              placement="top-start"
            >
              <i class="el-icon-question"></i>
            </el-tooltip>
            <div class="center-i">
              <i class="el-icon-circle-check"></i>
            </div>
            <div class="info">
              <p class="type">已提现金额({{$store.state.country.symbol}})</p>
              <div class="amount">{{withdraw}}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card class="amount-card">
            <el-tooltip
              class="item"
              effect="dark"
              content="包含订单金额冻结期内金额及平台冻结金额"
              placement="top-start"
            >
              <i class="el-icon-question"></i>
            </el-tooltip>
            <div class="center-i">
              <i class="iconfont icon-freeze"></i>
            </div>
            <div class="info">
              <p class="type">冻结金额({{$store.state.country.symbol}})</p>
              <div class="amount">{{frozen}}</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="action-wrap">
          <el-button type="primary" @click="openWithdraw">提现</el-button>
        </el-col>
      </el-row>
    </template>
    <!-- 钱包关闭状态 -->
    <template v-else>
      <div class="open-wrap">
        <h2>设置收款方式</h2>
        <h3>支持在线支付：</h3>
        <el-row :gutter="15">
          <el-col :span="8">
          <el-card>
            <p class="msg">当您激活在线支付， 客户付款时会由OurMall进行代收， 付款金额会在您的钱包显示， 支持您进行提现。</p>
            <div class=" tx-right">
              <el-button type="primary" @click="openWallet">激活</el-button>
            </div>
          </el-card>
          </el-col>
        </el-row>
      </div>
    </template>
    <el-dialog
      title="提现"
      :visible.sync="dialogWithdraw.isShow"
      width="40%"
      class="dialog-withdraw"
    >
      <el-divider></el-divider>
      <div v-if="dialogWithdraw.status == 1" class="dialog-body">
        <div style="padding: 15px 0; font-size: 16px">
          每月<b class=" tx-danger">1</b>日、 <b class=" tx-danger">15</b>日可以提现
        </div>
        <div class="content">
          <el-form label-width="120px">
            <h3>提现方式</h3>
            <div class="d-flex mg-b-20">
              <el-radio
                class="d-flex"
                style="display: flex"
                v-model="dialogWithdraw.accountType"
                label="2"
              >
                <span
                  class="pay-logo alipay"
                  :class="{ active: dialogWithdraw.accountType == 2 }"
                ></span>
              </el-radio>
              <el-radio
                class="d-flex"
                style="display: flex"
                v-model="dialogWithdraw.accountType"
                label="1"
              >
                <span
                  class="pay-logo paypal"
                  :class="{ active: dialogWithdraw.accountType == 1 }"
                ></span>
              </el-radio>
            </div>
            <el-form-item :label="`提现金额(${$store.state.country.symbol})`" required class="mg-b-10">
              <el-input-number
                :min="50"
                :max="withdrawAmount"
                :precision="2"
                :controls="false"
                v-model="dialogWithdraw.amount"
              ></el-input-number>
            </el-form-item>
            <div class="mg-b-10 tx-warning">
              可提现金额： ${{withdrawAmount}} (折合人民币约 ￥{{withdrawAmountCNY}})
            </div>
            <div class="mg-b-20 tx-danger">
              *最小提现额度为： $50， 最大为可提现金额
            </div>
            <el-form-item label="收款人" required style="margin-bottom: 10px;">
              <el-col :span="12">
                <el-input v-model="dialogWithdraw.name"></el-input>
              </el-col>  
            </el-form-item>
            <el-form-item label="收款账号" required style="margin-bottom: 10px;">
              <el-col :span="12">
                <el-input v-model="dialogWithdraw.account"></el-input>
              </el-col>  
            </el-form-item>
            <el-form-item label="验证方式" required  style="margin-bottom: 10px;">
              <el-col :span="24">
                <el-select v-model="dialogWithdraw.tokenType" placeholder="请选择" class=" mg-r-15" style="width: 100px;">
                  <el-option :key="1" :label="'邮箱'"  :value="1">邮箱</el-option>
                  <el-option :key="2" :label="'手机'" :value="2">手机</el-option>
                </el-select> 
                <b class=" mg-r-20">{{mobile}}</b>
                <el-button type="primary" :disabled="!!(!mobile || sec)" 
                  :loading="dialogWithdraw.tokenLoading"
                  @click="getSendToken"
                >
                  <span v-if="sec">({{sec}})秒后可重新获取验证码</span>
                  <span v-else>获取验证码</span>
                </el-button>
              </el-col>              
            </el-form-item>
            <el-form-item label="验证码" required  style="margin-bottom: 10px;">
              <el-col :span="10" class="mg-r-15"
                ><el-input width="200" v-model="dialogWithdraw.token"></el-input
              ></el-col> 
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-if="dialogWithdraw.status == 2" class="dialog-body success">
        <div class="success-text"><i class="el-icon-success"></i>提交申请成功，请等待OurMall进行审核。</div>
        <div class="account-info">
          <h3>收款账号</h3>
          <p>提现方式：<span>{{dialogWithdraw.accountType == 1 ? 'PayPal' : 'AliPay'}}</span></p>
          <p>收款人：<span>{{dialogWithdraw.name}}</span></p>
          <p>收款账号：<span>{{dialogWithdraw.account}}</span></p>
          <p>金额({{$store.state.country.symbol}})：<span>{{dialogWithdraw.amount}}</span></p>
        </div>
      </div>  
      <el-divider></el-divider>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="dialogWithdraw.status == 1" :loading="sendWithdrawalLoading" type="primary" @click="sendWithdrawal">确认</el-button>
        <el-button v-else @click="withdrawClose">关闭</el-button>

      </div>
    </el-dialog>
    <!-- 确认激活钱包模态框 -->
    <el-dialog
      title="您确定激活线上支付方式？"
      :visible.sync="dialogOpenWallet.isShow"
      width="30%"
      class="dialog-open-wallet"
    >
      <el-divider></el-divider>
      <div class="dialog-body">
        <p>客户可以通过线上支付方式直接进行支付，划入您的OurMall钱包。</p>
      </div>
      <el-divider></el-divider>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="dialogOpenWallet.isShow = false;">取消</el-button>
        <el-button type="primary"  @click="sendOpenWallet" :loading="dialogOpenWallet.loading">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      dialogWithdraw: {
        isShow: false,
        status: 1,
        accountType: "2",
        amount: undefined,
        tokenType: 1,
        account: '',
        name: '',
        tokenLoading: false,
        token: '',
      },
      dialogWithdrawDefault: "{}",
      balance: "0.00", //总余额
      withdrawAmount: "0.00", //可提现
      withdrawing: "0.00", //提现中
      withdraw: "0.00", //已提现
      frozen: "0.00", //冻结
      withdrawAmountCNY: '0.00', //结余rmb
      sec:0,
      time: 0,
      sendWithdrawalLoading: false, //确认提现
      dialogOpenWallet:{
        isShow: false,
        loading: false,
      }
    };
  },
  mounted() {
    this.dialogWithdrawDefault = JSON.stringify(this.dialogWithdraw);
    this.getSummary();
  },
  computed:{
    mobile(){
      let mobile =  this.dialogWithdraw.tokenType == 1 ? this.$store.state.userInfo.email : this.$store.state.userInfo.mobile;
      return mobile ? mobile : '';
    }
  },
  methods: {
    sendOpenWallet(){
      this.dialogOpenWallet.loading = true;
      this.$apiCall("api.User.openWallet", {}, r => {
        if(r.ErrorCode == "9999") {
          this.$message({ message: '激活钱包成功', type: "success" });
          setTimeout(()=>{
            location.reload();
          },1500);
        }else{
          this.$message({ message: r.Message, type: "error" });
        }
      })
    },
    openWallet(){
      this.dialogOpenWallet.isShow = true;

    },
    withdrawClose(){
      this.getSummary();
      this.dialogWithdraw.isShow = false;
    },
    sendWithdrawal(){
      //提交
      if(!this.dialogWithdraw.amount){
        this.$message({ message: '请输入提现金额', type: "error" });
        return
      }
      if(!this.dialogWithdraw.name){
        this.$message({ message: '请输入收款人', type: "error" });
        return
      }
      if(!this.dialogWithdraw.account){
        this.$message({ message: '请输入收款账号', type: "error" });
        return
      }
      if(!this.mobile){
        this.$message({ message: '请选择有效验证方式', type: "error" });
        return
      }
      if(!this.dialogWithdraw.token){
        this.$message({ message: '请输入验证码', type: "error" });
        return
      }
      this.sendWithdrawalLoading = true;
      let params = {
        account: this.dialogWithdraw.account,
        accountType: this.dialogWithdraw.accountType,
        name: this.dialogWithdraw.name,
        amount: this.dialogWithdraw.amount,
        token: this.dialogWithdraw.token,
        mobile: this.mobile,
      }
      this.$apiCall('api.AccountPayment.withdrawal', params, r => {
        this.sendWithdrawalLoading = false;
        if(r.ErrorCode == "9999") {
          // this.$message({ message: '提现成功', type: "success" });
          this.dialogWithdraw.status = 2;
          this.getSummary();
        }else{
          this.$message({ message: r.Message, type: "error" });
        }
      })
    },
    getSendToken(){
      //获取token
      this.dialogWithdraw.tokenLoading = true;
      this.$apiCall('api.AccountPayment.sendToken', {mobile: this.mobile}, r => {
        this.dialogWithdraw.tokenLoading = false;
        if(r.ErrorCode == "9999") {
          this.$message({ message: `验证码已发送到 ${this.mobile}`, type: "success" });
          this.sec = 60;
          this.time = setInterval(()=>{
            if(this.sec > 0){
              this.sec --
            }else{
              clearInterval(this.time)
              this.sec = 0;
            }
          },1000)
        }else{
          this.$message({ message: r.Message, type: "error" });
        }

      })
    },
    openWithdraw() {
      this.dialogWithdraw = JSON.parse(this.dialogWithdrawDefault);
      this.time = 0;
      this.sec = 0;
      this.dialogWithdraw.isShow = true;
    },
    getSummary() {
      if(!this.$store.state.userInfo.walletOpen){
        return;
      }
      //统计数据
      this.loading = true;
      this.$apiCall("api.AccountPayment.getSummary",{}, (r)=>{
        this.loading = false;
        if(r.ErrorCode == "9999") {
          let data = r.Data.Results;
          this.balance = Number(data.balance) || "0.00";
          this.withdrawAmount = Number(data.withdrawAmount) || "0.00";
          this.withdrawing = Number(data.withdrawing) || "0.00";
          this.withdraw = Number(data.withdraw) || "0.00";
          this.frozen = Number(data.frozen) || "0.00";
          this.withdrawAmountCNY = Number(data.withdrawAmountCNY) || "0.00";
        }else{
          this.$message({ message: r.Message, type: "error" });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-withdraw {
  .pay-logo {
    display: inline-block;
    width: 140px;
    height: 60px;
    background-image: url("./../../../public/images/pay-logo.png");
    background-size: 100%;
    border: 1px $--border-color-light solid;
    border-radius: 4px;
  }
  .pay-logo.active {
    border-color: $--color-primary;
  }
  .pay-logo.paypal {
    background-position: 0 100%;
  }
  .dialog-body {
    padding: 0 15px;
    .content {
      padding: 0 25px;
      h3 {
        margin-bottom: 10px;
        font-weight: bold;
      }
    }
  }
  .dialog-footer {
    display: flex;
    justify-content: center;
  }
  .dialog-body.success{
    padding: 0 30px;
    .success-text{
      display: flex;
      align-items: center;
      padding: 20px 0;
      font-size: 16px;
      i{
        margin-right: 20px;
        color: #67C23A;
        font-size: 32px;
      }
    }
    .account-info{
      padding-left: 15px;
      h3{
        margin-bottom: 10px;
      }
      p{
        margin-bottom: 10px;
        padding-left: 30px;
        color: $--color-info;
        span{
          color: #212b36;
        }
      }
    }
  }
}
.dialog-open-wallet{
  .dialog-body{
    padding: 15px 20px;
    p{
      margin-bottom: 30px;
    }
  }
}

.amount-card {
  position: relative;
  margin: 20px auto;
  max-width: 250px;
  .el-icon-question {
    position: absolute;
    top: 15px;
    right: 15px;
    color: $--color-info;
  }
  .center-i {
    padding: 15px 0;
    text-align: center;
    > i {
      color: $--color-primary;
      line-height: 64px;
      font-size: 64px;
    }
  }
  .info {
    text-align: center;
    .type {
      margin-bottom: 5px;
    }
    .amount {
      color: $--color-danger;
      font-weight: bold;
      font-size: 22px;
    }
  }
}
.action-wrap {
  display: flex;
  justify-content: center;
  padding: 20px;
}
.open-wrap{
  padding: 25px; 
  h2{
    margin-bottom: 30px;
    font-size: 16px;
  }
  h3{
    margin-bottom: 10px;
    color: $--color-info;
  }
  .msg{
    margin-bottom: 25px;
  }
}
</style>