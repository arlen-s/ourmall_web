<template>
  <el-dialog :title="$t('transaction.支付明细')"
    :visible.sync="data.isShow"
    width="990px"
    :custom-class="'d-detail'"
  >
    <el-divider></el-divider>
    <div class="d-body">
      <div class="t-table">
        <div class="t-header">
           <div class="c c1">{{$t('transaction.订单类型')}}</div>
          <div class="c c1">{{$t('transaction.第三方订单')}}</div>
          <div class="c c2">{{$t('transaction.平台订单号')}}</div>
          <div class="c c3">{{$t('transaction.实际支付总额')}}({{$store.state.country.shopCurrency}})</div>
          <div class="c c4">{{$t('transaction.实际支付运费')}}({{$store.state.country.shopCurrency}})</div>
          <div class="c c5">{{$t('transaction.实际支付商品总额')}}({{$store.state.country.shopCurrency}})</div>
          <div class="c c6">{{$t('transaction.SKU明细')}}</div>
          <div class="c c7">{{$t('transaction.实际支付商品单价')}}({{$store.state.country.shopCurrency}})</div>
          <div class="c c8">{{$t('transaction.商品数量')}}</div>
          <div class="c c9">{{$t('transaction.重量')}}(g)</div>
        </div>
        <div class="t-body">
          <div v-for="item in data.items" :key="item.id" class="t-row" >
             <div class="c c1">{{item.shippingType == 1? $t('transaction.批发单') : $t('transaction.自提单')}}</div>
            <div class="c c1">{{item.codeName}}</div>
            <div class="c c2">{{item.orderId}}</div>
            <div class="c c3">{{item.payTotalAmount}}</div>
            <div class="c c4">{{item.shippingAllAmount}}</div>
            <div class="c c5">{{item.itemAllAmount}}</div>
            <div class="c c6-9">
              <div class="c-sub" v-for="sku in item.items" :key="sku.id">
                <div class="c c6">{{sku.vendorSku}}</div>
                <div class="c c7">{{sku.vendorPrice}}</div>
                <div class="c c8">{{sku.quantity}}</div>
                <div class="c c9">{{Number(sku.weight) * Number(sku.quantity)}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div slot="footer" class="dialog-footer">
      <el-button @click="data.isShow = false">{{$t('transaction.cancel')}}</el-button>
      <el-button :disabled="!$isRole($route.meta.roleWrite)" type="primary" @click="exportDetailFn" :loading="data.loading">
        {{$t('transaction.export')}}
      </el-button>
    </div>  
  </el-dialog>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    exportDetailFn(){
      this.data.loading = true;
      if ($("#ifilePro").length == 0) {
        $("body").append(
          '<iframe id="ifilePro" style="display:none"></iframe>'
        );
      }
      console.log(this.data.ids)
      this.$apiCall('api.AccountPayment.exportPayment', {ids: this.data.ids, isNew: 1,}, r => {
        this.data.loading = false;
        if (r.ErrorCode == "9999") {
          document.getElementById("ifilePro").src = r.Data.Results.file;
          this.$elementMessage(this.$t('myinvoice.exportSuccess'), 'success');
          this.data.isShow = false;
        }else{
          this.$elementMessage(r.Message, 'error');
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .d-detail .el-dialog__body {
  height: auto;
  overflow: hidden;
}
.d-body{
  padding: 15px;
  max-height: 600px;
  min-height: 200px;
  overflow-y: scroll;
}
.t-table{
  width: 1000px;
  .c{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    line-height: 22px;
    border-right: 1px #DCDFE6 solid;
    border-bottom: 1px #DCDFE6 solid;
  }
  .c1{
    width: 90px;
  }
  .c2{
    width: 120px;
  }
  .c3{
    width: 100px;
  }
  .c4{
    width: 100px;
  }
  .c5{
    width: 140px;
  }
  .c6{
    width: 100px;
  }
  .c7{
    width: 130px;
  }
  .c8{
    width: 70px;
  }
  .c9{
    width: 60px;
  }
  .c.c6-9{
    flex-direction: column;
    justify-content: space-between;
    border: none;
    padding: 0;
    .c-sub{
      display: flex;
      align-items: stretch;
      flex: 1;
    }
  }
  .t-header{
    display: flex;
    align-items: stretch;
    font-size: 12px;
    border-top: 1px #DCDFE6 solid;
    border-left: 1px #DCDFE6 solid;
    font-weight: bold;
  }
  .t-body{
    border-left: 1px #DCDFE6 solid;
    .t-row{
      display: flex;
      align-items: stretch;
      line-height: 22px;
    }
    .t-row:nth-of-type(even){
      background-color: #f6f6f6;
    }
  }
} 
</style>
