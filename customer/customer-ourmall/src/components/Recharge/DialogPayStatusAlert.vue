<template>
  <el-dialog
    :visible.sync="data.isShow"
    width="600px"
    :show-close="false"
    :close-on-click-modal="false"
		:close-on-press-escape="false"
    title="Pay Package"
  >
    <el-divider></el-divider>
    <div class="body-wrap">
      <el-card v-if="data.payItem" class="pay-card">
        <el-row :gutter="20">
          <el-col :span="12">
            <span class="title">Amount</span>
            <span class="val success">US$ {{data.payItem.price}}</span>
          </el-col>
          <el-col :span="12">
            <span class=" title">Orders</span>
            <span class=" val">{{data.payItem.count}}</span>
          </el-col>
        </el-row>
      </el-card>
      <el-row v-if="data.status == 1" :gutter="20" class="pay-loading">
        <el-col :span="24">
          <div class="loading">
            <i class="el-icon-loading"></i>
          </div>
          <div class="tx t1">
            Payment Processing
          </div>
          <div class="tx t2">
            Please leave window open
          </div>
        </el-col>
      </el-row>
      <el-row v-if="data.status != 1" :gutter="20" class="pay-status">
        <el-col :span="24">
          <div class="status-icon">
            <i v-if="data.status == 2" class="el-icon-success"></i>
            <i v-if="data.status == 3" class="el-icon-error"></i>
          </div>
          <template v-if="data.status == 2">
            <div class=" tx t1">
              Charge Submitted
            </div>
            <div class=" tx t2">
              Your payment has been successfully scheduled for processing. You will 
              receive a confirmation email within 5 business days once the payment 
              has been processed.
            </div>
          </template>
          <template v-if="data.status == 3">
            <div class=" tx t3">
              {{data.errorMsg}}
            </div>
          </template>
          
        </el-col>
      </el-row>
    </div>
    <div class="footer">
      <i class="el-icon-lock"></i>
      Secure Payment
      <el-button 
        v-if="data.status != 1"
        :loading="doneLoading"
        class="btn-done" type="primary" size="small" @click="resetPage">Done</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['data'],
  data(){
    return {
      doneLoading: false
    }
  },
  methods: {
    resetPage(){
      this.doneLoading = true;
      this.$emit('closePayPage'); //关闭支付页 和 父页面的定时器
      //重新取userInfo 后刷新
      this.$apiCall("api.User.checkLoginStatus", {}, r => {
        localStorage.setItem("c_apiUserToken",r.Data.Results.apiUserToken);
        localStorage.setItem("c_apiUserId", r.Data.Results.id);
				localStorage.setItem("c_userInfo",JSON.stringify(r.Data.Results));
				location.reload();
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.body-wrap{
  padding: 20px;
}
.pay-card{
  margin-bottom: 20px;
  .title{
    margin-right: 15px;
  }
  .val{
    color: #909399;
    font-weight: bold;
  }
  .val.success{
    color: #67C23A;
  }
}
.pay-loading{
  .loading{
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
    > i{
      font-size: 48px;
    }
  }
  .tx{
    text-align: center;
  }
  .tx.t1{
    color: #5c6ac4;
    font-weight: bold;
    font-size: 18px;
  }
}
.pay-status{
  .status-icon{
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
    > i{
      font-size: 48px;
    }
    > i.el-icon-success{
      color: #67C23A;
    }
    > i.el-icon-error{
      color: #F56C6C;
    }
  }
  .tx{
    text-align: center;
    word-break: break-word;
  }
  .tx.t1{
    color: #67C23A;
    font-weight: bold;
    font-size: 18px;
  }
  .tx.t3{
    color: #F56C6C;
  }
}
.footer{
  position: relative;
  margin-bottom: -10px;
  height: 56px;
  line-height: 56px;
  background-color: #EBEEF5;
  border-top: 1px #DCDFE6 solid;
  text-align: center;
  font-weight: bold;
  i{
    margin-right: 5px;
  }
  .btn-done{
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
  }
}
</style>