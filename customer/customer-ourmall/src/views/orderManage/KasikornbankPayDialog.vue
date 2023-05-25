<template>
  <el-dialog
    :title="$t('开泰银行支付')"
    :visible.sync="dialog.visible"
    :close-on-click-modal="false"
    :before-close="initDialog"
    top="5vh"
    width="70%"
  >
    <div class="scroll-box">
      <!-- <div v-append="html"></div> -->
      <!-- <form method="POST" style="display:none" id="formPay" :action="this.html.action_url"></form> -->
      <iframe id="sss111" style="display:none"></iframe>
    </div>
    <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save()">
            {{ $t("order.确定") }}
        </el-button>
        <el-button @click="initDialog()">
            {{ $t("order.取消") }}
        </el-button> 
    </div>-->
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
        }
      },
    },
  },
  data () {
    return {
      dialogModal: this.dialog,
      html: "",
    }
  },
  mounted () {

  },
  watch: {
    dialog: {
      handler: function (val) {
        if (val) {
          // let info = val.row;
          this.$nextTick(() => {
            let htmlObj = JSON.stringify(val.html)
            document.querySelector('#sss111').src = `./payment.html?obj=${htmlObj}`
            document.querySelector('#sss111').style.display = ''
            // this.html = val.html
            // const container = document.querySelector('#formPay')
            // const script = document.createElement('script')
            // script.type = 'text/javascript'
            // script.src = 'https://dev-kpaymentgateway.kasikornbank.com/ui/v2/kpayment.min.js'
            // script.setAttribute('data-apikey', val.html.dataApikey)
            // script.setAttribute('data-amount', val.html.dataAmount)
            // script.setAttribute('data-currency', 'THB')
            // script.setAttribute('data-payment-methods', 'card')
            // script.setAttribute('data-name', 'Your Shop Name')
            // script.setAttribute('data-smartpay-id', val.html.dataSmartpayId)
            // script.setAttribute('data-mid', val.html.dataMid)
            // container?.appendChild(script)
            // setTimeout(() => {
            //   container.style.display = ''
            // },300)
          })
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    initDialog () {
      this.dialog.visible = false
      this.dialog.row = {}
    },
    save () { },
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

