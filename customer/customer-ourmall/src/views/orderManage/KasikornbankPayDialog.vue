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
//     const html = `<form method="POST" action="/checkout">
// <script type="text/javascript"
// src="https://dev-kpaymentgateway.kasikornbank.com/ui/v2/kpayment.min.js"
// data-apikey="pkey_prod_75677dushd74774gdgdgd77d7dhsgfhfghfhgdh"
// data-amount ="13.00"
// data-payment-methods="qr"
// data-order-id="1" ><\/script>
// </form>`
    return {
      dialogModal: this.dialog,
      html: '',
    };
  },
  watch: {
    dialog: {
      handler: function (val) {
          if(val) {
              this.html = `<form id="bankPay" method="POST" action="/checkout">
						<script type="text/javascript"
							src="https://dev-kpaymentgateway.kasikornbank.com/ui/v2/kpayment.min.js"
							data-apikey="${val.row.apikey}"
							data-amount ='${val.row.amount}'	
							data-payment-methods="${val.row.methods}"
							data-order-id="${val.row.orderId}" ><\/script>
						</form>`
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

