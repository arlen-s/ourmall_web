<template>
  <el-dialog
    title="Initiate a dispute"
    :visible="dialogDispute.isShow"
    class="dispute-dialog"
    :before-close="handleDisputeClose"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    center
  >
    <div class="dispute-info">
      <div v-if="dialogDispute.orderNum">
        Order Number: <b>{{ dialogDispute.orderNum }}</b>
      </div>
      <div v-if="dialogDispute.status">
        Order Status:
        <b class="tx-danger">{{
          $dict.PurchaseStatus[dialogDispute.status].text
        }}</b>
      </div>
    </div>
    <el-form :model="form">
      <el-form-item>
        <el-select
          v-model="form.reason"
          size="medium"
          placeholder="Dispute reason"
          style="width: 40%"
        >
          <el-option
            v-for="(s, i) in $dict.disputedReason"
            :key="i"
            :label="s.text"
            :value="s.val"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="form.result"
          size="medium"
          placeholder="Expected result"
          style="width: 40%"
        >
          <el-option
            v-for="(s, i) in $dict.disputedResult"
            :key="i"
            :label="s.text"
            :value="s.val"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
          type="textarea"
          :rows="4"
          placeholder="Please input message"
          v-model="form.remark"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.stop="handleDisputeClose">Cancel</el-button>
      <el-button type="primary" @click.stop="setAbnormal">Confirm</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["dialogDispute"],
  data() {
    return {
      form: {
        reason: "",
        result: "",
        remark: "",
      },
    };
  },
  methods: {
    setAbnormal() {
      if (!this.form.reason)
        return this.$elementMessage("Please choose the dispute reason", "error");
      if (!this.form.result)
        return this.$elementMessage("Please select your expect result", "error");
      this.$apiCall(
        "api.PurchaseOrder.setAbnormal",
        {
          ...this.form,
          purchaseOrderId: this.dialogDispute.purchaseOrderId,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            this.$message({ message: "success", type: "success" });
            this.handleDisputeClose();
            if(this.$parent.getItem)
              this.$parent.getItem(true)
          } else {
            this.$message({ message: r.Message, type: "error" });
          }
        }
      );
    },
    handleDisputeClose() {
      this.dialogDispute.isShow = false;
    },
  },
};
</script>

<style lang='scss' scoped>
.dispute-dialog {
  .dispute-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
  }
}
</style>