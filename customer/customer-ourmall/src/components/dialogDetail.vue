<template>
  <el-dialog title="Billing Detail"
    :visible.sync="data.isShow"
    width="960px"
    :custom-class="'d-detail'"
  >
    <el-divider></el-divider>
    <div class="d-body">
      <div class="t-table"> 
        <div class="t-header">  
          <div class="c c1">{{$t('Your shop order num')}}</div>
          <div class="c c2">{{$t('Order Number')}}</div>
          <div class="c c3">{{$t('Total Payment')}}({{$store.state.country.symbol}})</div>
          <div class="c c4">{{$t('Freight')}}({{$store.state.country.symbol}})</div>
          <div class="c c5">{{$t('Total Merchandise')}}({{$store.state.country.symbol}})</div>
          <div class="c c6">{{$t('SKU Details')}}</div>
          <div class="c c7">{{$t('Commodity Price')}}({{$store.state.country.symbol}})</div>
          <div class="c c8">{{$t('Quantity')}}</div>
          <div class="c c9">{{$t('weight')}}(g)</div>
        </div>
        <div class="t-body">
          <div v-for="item in data.items" :key="item.id" class="t-row" >
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
      <el-button @click="data.isShow = false">{{$t('Cancel')}}</el-button>
      <el-button type="primary" @click="exportDetailFn" :loading="data.loading">
        {{$t('Export')}}
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
      this.$apiCall('api.AccountPayment.exportPayment', {ids: this.data.ids, isNew: 1,}, r => {
        this.data.loading = false;
        if (r.ErrorCode == "9999") {
          document.getElementById("ifilePro").src = r.Data.Results.file;
          this.$elementMessage('Export success', 'success');
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
  width: 910px;
  .c{
    display: flex;
    align-items: center;
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
