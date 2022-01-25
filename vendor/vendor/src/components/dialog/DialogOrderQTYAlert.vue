<template>
  <div>
    <el-dialog
      :visible.sync="data.isShow"
      :title="$t('app.通知')"
      width="700px"
    >
      <el-divider></el-divider>
      <div class="body-wrap">
        <p class=" mg-b-10">{{$t('app.该站长可处理的单量不足，请联系站长购买单量包。')}}</p>
        <p class=" mg-b-15">( {{$t('app.请将该提醒转发您的站长客户：')}}
            <span style="color: #909399;">{{$t("app.Youdon")}}</span> )
        </p>
        <p class=" mg-b-10 d-flex">{{$t('app.您若有疑问，')}}<el-link type="primary" @click.native="tawk()">{{$t('app.可点此联系客服')}}</el-link></p>
      </div>
      <el-divider></el-divider>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button size="small" @click="data.isShow = false;">{{$t('app.关闭')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    tawk(){
      // if(Tawk_API.maximize){
      //   Tawk_API.maximize();
      //   // console.log({
      //   //     text: '由于站长单量不足，供应商无法创建采购订单',
      //   //     customerId: this.data.item.customerId,
      //   //     customerName: this.data.item.customerName,
      //   //     num: this.data.item.orderNum,
      //   // })
      //   Tawk_API.addEvent('notEnoughQTY', {
      //       text: '由于站长单量不足，供应商无法创建采购订单',
      //       customerId: this.data.item.customerId,
      //       customerName: this.data.item.customerName,
      //       num: this.data.item.orderNum,
      //   }, function(error){});
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.body-wrap{
  padding: 0 20px;
  line-height: 22px;
}
</style>