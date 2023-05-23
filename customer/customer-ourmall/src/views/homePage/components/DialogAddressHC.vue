<template>
  <div>
    <el-dialog
      title="Adresse eingeben"
      :visible.sync="setting.visible"
      width="60%"
      :before-close="handleClose"
    >
      <div>
        <el-form
          :model="addressForm"
          :rules="addressRules"
          ref="addressForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="Vorname" prop="firstName">
            <el-input
              v-model="addressForm.firstName"
              placeholder="Bitte geben Sie den Vornamen ein"
            ></el-input>
          </el-form-item>
          <el-form-item label="Nachname" prop="lastName">
            <el-input
              v-model="addressForm.lastName"
              placeholder="Bitte geben Sie den Nachnamen ein"
            ></el-input>
          </el-form-item>
          <el-form-item label="Adresse1" prop="address1">
            <el-input
              v-model="addressForm.address1"
              placeholder="Bitte geben Sie die Adresse ein"
            ></el-input>
          </el-form-item>
          <el-form-item label="Address2">
            <el-input
              v-model="addressForm.address2"
              placeholder="Bitte geben Sie die Adresse ein2"
            ></el-input>
          </el-form-item>
          <el-form-item label="Land" prop="country" style="width: 100%">
            <el-select
              v-model="addressForm.country"
              placeholder="Bitte geben Sie das Land ein"
            >
              <el-option
                v-for="item in countryList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Provinz" prop="province">
            <el-input
              v-model="addressForm.province"
              placeholder="Bitte geben Sie die Provinz ein"
            ></el-input>
          </el-form-item>
          <el-form-item label="Stadt" prop="city">
            <el-input
              v-model="addressForm.city"
              placeholder="Bitte geben Sie die Provinz ein"
            ></el-input>
          </el-form-item>
          <el-form-item label="Telefon" prop="phone">
            <el-input
              v-model="addressForm.phone"
              placeholder="Bitte geben Sie das Telefon ein"
            ></el-input>
          </el-form-item>
          <el-form-item label="Postleitzahl" prop="postcode">
            <el-input
              v-model="addressForm.postcode"
              placeholder="Bitte geben Sie die Postleitzahl ein"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="flex-end">
          <el-switch v-model="isDefault" active-color="#eb8c1f"> </el-switch>
          <span style="margin-left: 10px">Als Standardversandadresse festlegen</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addressForm')">Zurücksetzen</el-button>
        <el-button
          :loading="confirmLoading"
          type="primary"
          @click="confirm('addressForm')"
          >bestätigen</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      addressForm: {
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        country: "",
        province: "",
        city: "",
        phone: "",
        postcode: "",
      },
      countryList: [],
      isDefault: true,
      confirmLoading: false,
      addressRules: {
        firstName: [
          {
            required: true,
            message: "Bitte geben Sie den Vornamen ein",
            trigger: "blur",
          },
        ],
        lastName: [
          {
            required: true,
            message: "Bitte geben Sie den Nachnamen ein",
            trigger: "blur",
          },
        ],
        address1: [
          {
            required: true,
            message: "Bitte geben Sie die Adresse ein",
            trigger: "blur",
          },
        ],
        province: [
          {
            required: true,
            message: "Bitte geben Sie die Provinz ein",
            trigger: "blur",
          },
        ],
        city: [
          { required: true, message: "Bitte geben Sie die Stadt ein", trigger: "blur" },
        ],
        phone: [
          {
            required: true,
            message: "Bitte geben Sie das Telefon ein",
            trigger: "blur",
          },
        ],
        postcode: [
          {
            required: true,
            message: "Bitte geben Sie die Postleitzahl ein",
            trigger: "blur",
          },
        ],
        country: [
          {
            required: true,
            message: "Bitte geben Sie das Land ein",
            trigger: "change",
          },
        ],
      },
    };
  },
  props: {
    setting: {
      type: Object,
      default: function () {
        return {
          visible: false,
          addressForm: {},
          countryList: [],
        };
      },
    },
  },
  watch: {
    setting: {
      deep: true,
      handler: function (val) {
        if (val.addressFrom) {
          this.addressForm = _.cloneDeep(val.addressFrom);
          this.countryList =  _.cloneDeep(val.countryList);
        }
      },
    },
  },
  methods: {
    handleClose(done) {
      this.addressForm = {};
      done();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.addressForm = {};
    },
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addressForm;
          this.isDefault ? (this.addressForm.isDefault = "1") : (this.addressForm.isDefault = "2");
          this.addressForm.address2 ? this.addressForm.address2 : (this.addressForm.address2 = "");
          this.confirmLoading = true;
          this.$apiCall("api.MallAddress.change", { ...this.addressForm }, (r) => {
            if (r.ErrorCode == "9999") {
              this.confirmLoading = false;
              this.$message.success(r.Message);
              this.$emit("close", true);
              this.setting.visible = false;
            } else {
              this.confirmLoading = false;
              this.$message.error(r.Message);
            }
          });
        } else {
          console.log("Please complete the information!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.flex-end {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0 0 120px;
}
</style>
