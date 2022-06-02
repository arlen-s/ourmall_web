<template>
  <el-dialog
    title="开泰银行支付"
    :visible.sync="dialog.visible"
    :close-on-click-modal="false"
    :before-close="initDialog"
    :fullscreen="true"
  >
    <div class="scroll-box">
      <p v-if="innerWidth===0">请耐心等待，正在努力为您创建链接中～</p>
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
          html: "",
        };
      },
    },
  },
  data() {
    return {
      dialogModal: this.dialog,
      html: '',
      innerWidth: 0,
    };
  },
  watch: {
    dialog: {
      handler: function (val) {
        if (val) {
          console.log(val)
          this.html = val.html
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.watchSize();
  },
  methods: {
    initDialog() {
      this.dialog.visible = false;
      this.dialog.html = "";
    },
    watchSize() {
      let t
      if(this.innerWidth === 0){
        this.$showLoading();
        t = setTimeout(() => {
          this.innerWidth = document.getElementById('bankPay').offsetWidth
          this.watchSize()
        },500)  
      } else {
        this.$hideLoading();
        clearTimeout(t)
      }
      
    },
    save() {},
  },
};
</script>
<style scoped>
::v-deep .el-dialog__body {
  /* border: 1px solid #eee; */
}
.scroll-box {
  height: 60vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

