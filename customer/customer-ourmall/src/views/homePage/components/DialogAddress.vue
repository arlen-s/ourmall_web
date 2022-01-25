<template>
  <div>
    <el-dialog
      title="Add Address"
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
          <el-form-item label="First Name" prop="firstName">
            <el-input
              v-model="addressForm.firstName"
              placeholder="Please enter the first name"
            ></el-input>
          </el-form-item>
          <el-form-item label="Last Name" prop="lastName">
            <el-input
              v-model="addressForm.lastName"
              placeholder="Please enter the last name"
            ></el-input>
          </el-form-item>
          <el-form-item label="Address1" prop="address1">
            <el-input
              v-model="addressForm.address1"
              placeholder="Please enter the address"
            ></el-input>
          </el-form-item>
          <el-form-item label="Address2">
            <el-input
              v-model="addressForm.address2"
              placeholder="Please enter the address2"
            ></el-input>
          </el-form-item>
          <el-form-item label="Country" prop="country" style="width: 100%">
            <el-select
              v-model="addressForm.country"
              placeholder="Please enter the country"
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
          <el-form-item label="Province" prop="province">
            <el-input
              v-model="addressForm.province"
              placeholder="Please enter the province"
            ></el-input>
          </el-form-item>
          <el-form-item label="City" prop="city">
            <el-input
              v-model="addressForm.city"
              placeholder="Please enter the city"
            ></el-input>
          </el-form-item>
          <el-form-item label="Phone" prop="phone">
            <el-input
              v-model="addressForm.phone"
              placeholder="Please enter the phone"
            ></el-input>
          </el-form-item>
          <el-form-item label="Postcode" prop="postcode">
            <el-input
              v-model="addressForm.postcode"
              placeholder="Please enter the postcode"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="flex-end">
          <el-switch v-model="isDefault" active-color="#eb8c1f"> </el-switch>
          <span style="margin-left: 10px">Set as default shipping address</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addressForm')">Reset</el-button>
        <el-button
          :loading="confirmLoading"
          type="primary"
          @click="confirm('addressForm')"
          >Confirm</el-button
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
            message: "Please enter the first name",
            trigger: "blur",
          },
        ],
        lastName: [
          {
            required: true,
            message: "Please enter the last name",
            trigger: "blur",
          },
        ],
        address1: [
          {
            required: true,
            message: "Please enter the address",
            trigger: "blur",
          },
        ],
        province: [
          {
            required: true,
            message: "Please enter the province",
            trigger: "blur",
          },
        ],
        city: [
          { required: true, message: "Please enter the city", trigger: "blur" },
        ],
        phone: [
          {
            required: true,
            message: "Please enter the phone",
            trigger: "blur",
          },
        ],
        postcode: [
          {
            required: true,
            message: "Please enter the postcode",
            trigger: "blur",
          },
        ],
        country: [
          {
            required: true,
            message: "Please enter the country",
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
