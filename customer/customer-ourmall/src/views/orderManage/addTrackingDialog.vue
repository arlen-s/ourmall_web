<template>
  <el-dialog
    :title="$t('Add Tracking')"
    :visible.sync="dialog.visible"
    :close-on-click-modal="false"
    :before-close="initDialog"
    top="10vh"
  >
    <div class="scroll-box">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="130px"
        class="demo-ruleForm"
      >
        <el-form-item :label="$t('Track number')" prop="number">
          <el-input
            v-model="ruleForm.number"
            :placeholder="$t('Please input the tracking number')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('Track company')" prop="company">
          <el-select
            style="width: 100%"
            v-model="ruleForm.company"
            :placeholder="$t('Please select logistics company')"
          >
            <el-option
              v-for="(item, index) of companyList"
              :key="index"
              :label="item.name"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save('ruleForm')"> {{$t('Confirm')}} </el-button>
      <el-button @click="initDialog()"> {{$t('Cancel')}} </el-button>
    </div>
  </el-dialog>
</template> 
<script>
export default {
  name: "name",
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
      ruleForm: {
        number: "",
        company: "",
      },
      rules: {
        number: [
          {
            required: true,
            message: this.$t("Please input the tracking number"),
            trigger: "blur",
          },
        ],
        company: [
          {
            required: true,
            message: this.$t("Please select logistics company"),
            trigger: "change",
          },
        ],
      },
      companyList: [],
    };
  },
  watch: {
    dialog: {
      handler: function () {
        this.getCompany();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getCompany() {
      this.$apiCall("api.Invoice.getShopifyCompany", {}, (r) => {
        if (r.ErrorCode == "9999") {
          this.companyList = r.Data.Results;
          // console.log(this.companyList)
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    initDialog() {
      this.dialog.visible = false;
      this.dialog.row = {};
      this.$refs.ruleForm.resetFields();
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          let params = {
            id: this.dialogModal.row.id,
            trackNumber: this.ruleForm.number,
            trackKey: this.ruleForm.company,
          };
          this.$apiCall(
            "api.ShopifyOrder.insertDeliverShopify",
            params,
            (r) => {
              if (r.ErrorCode == "9999") {
                this.$elementMessage(this.$t("Your request has been sent"), 'success');
                this.initDialog();
                this.$parent.getItem();
              } else {
                this.$elementMessage(r.Message, "error");
              }
            }
          );
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
::v-deep .el-dialog__body {
  border: 1px solid #eee;
}
.scroll-box {
  height: 300px;
  overflow-y: auto;
}
</style>

