<template>
  <el-dialog
    title="开泰银行支付"
    :visible.sync="dialog.visible"
    :close-on-click-modal="false"
    :before-close="initDialog"
    top="5vh"
    width="70%"
  >
    <div class="scroll-box">
      <div v-append="html"></div>
    </div>
    <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save()">
            {{ $t("order.确定") }}
        </el-button>
        <el-button @click="initDialog()">
            {{ $t("order.取消") }}
        </el-button> 
    </div> -->
  </el-dialog>
</template> 
<script>
export default {
  name: "KasikornbankPayDialog",
  props: {
    dialog: {
      type: Object,
      default: () => {
        return {
          visible: false,
          row: {},
        };
      },
    },
  },
  data() {
    return {
      dialogModal: this.dialog,
      html: "",
    };
  },
  watch: {
    dialog: {
      handler: function (val) {
        if (val) {
          let info = val.row;
          this.html = `<form id="bankPayDialog" method="POST" action="/checkout">
              
						</form>`;
            // <script type="text/javascript"
						// 	src="https://dev-kpaymentgateway.kasikornbank.com/ui/v2/kpayment.min.js"
						// 	data-apikey="${info.apikey}"
						// 	data-amount ='${info.amount}'	
						// 	data-payment-methods="${info.methods}"
						// 	data-order-id="${info.orderId}" ><\/script>
          console.log(document.getElementById('bankPayDialog'))
          // let script = document.createElement('script')
          // script.type = 'text/javascript'
          // script.src = 'https://dev-kpaymentgateway.kasikornbank.com/ui/v2/kpayment.min.js'
          // script.setAttribute('data-apikey',info.apikey)
          // script.setAttribute('data-amount','222333')
          // script.setAttribute('data-payment-methods','card')
          // script.setAttribute('data-order-id','222333')
          // document.getElementById('bankPay').appendChild(script)
          // script.onload = function () {
          //   console.log('js资源已加载成功了')
          // }
          // console.log(document.getElementById('bankPay'),'bank............2')
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    initDialog() {
      this.dialog.visible = false;
      this.dialog.row = {};
    },
    save() {},
  },
};
</script>
<style scoped>
::v-deep .el-dialog__body {
  border: 1px solid #eee;
}
.scroll-box {
  height: 60vh;
  overflow-y: auto;
}
</style>

