<template>
  <el-dialog
    :visible.sync="isVisible"
    width="1000px"
    :title="type == 1 ? '付费创建套餐' : '修改套餐'"
    :close-on-click-modal="false"
    :before-close="close"
  >
    <el-divider></el-divider>
    <div class="">
      <el-form
        label-position="right"
        label-width="200px"
        ref="dataForm"
        :model="form"
        :rules="rules"
      >
        <el-row class="product-row">
          <el-col :span="24">
            <el-form-item label="套餐名称" prop="name">
              <el-input placeholder="" v-model="form.name"> </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="product-row">
          <el-col :span="12">
            <el-form-item label="创建店铺个数" prop="shopNum">
              <!-- oninput="value=value.replace(/^\.+|[^\d.]/g,'')" -->
              <el-input placeholder="" v-model="form.shopNum"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单总单量" prop="orderNum">
              <el-input placeholder="" v-model="form.orderNum">
              </el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row class="product-row">
          <el-col :span="12">
            <el-form-item label="每个店铺创建子账号的数量" prop="subUserCnt">
              <el-input placeholder="" v-model="form.subUserCnt">
              </el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row class="product-row">
          <el-col :span="24">
            <el-form-item label="每个店铺允许上架的spu数量" prop="productCnt">
              <el-input type="number" placeholder="" v-model="form.productCnt">
              </el-input> </el-form-item
          ></el-col>
        </el-row>
      </el-form>
    </div>
    <el-divider></el-divider>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close"> 取消 </el-button>
      <el-button :loading="loading" type="primary" @click="confirmClick">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      type: 1,
      isVisible: false,
      loading: false,
      data: "",
      form: {
        name: "",
        shopNum: "",
        productCnt: "",
        orderNum: "",
        subUserCnt: "",
      },
      rules: {
        name: [{ required: true, message: "套餐名称必填", trigger: "blur" }],
      },
    };
  },
  methods: {
    openDialog(row) {
      this.isVisible = true;
      this.data = row.data;
      this.type = row.type;
      if (row.type == 2) {
        this.form = {
          name: row.data.name,
          shopNum: row.data.shopNum,
          productCnt: row.data.productCnt,
          orderNum: row.data.orderNum,
          subUserCnt: row.data.subUserCnt,
        };
      }
    },
    confirmClick() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.loading = true;
          let params = {
            id: this.data?.id,
            name: this.form.name,
            shopNum: this.form.shopNum,
            productCnt: this.form.productCnt,
            orderNum: this.form.orderNum,
            subUserCnt: this.form.subUserCnt,
          };
          this.$apiCall("api.VendorVip.save", params, (r) => {
            this.loading = false;
            if (r.ErrorCode == 9999) {
              this.$parent.getItems();
              this.close();
              this.$message({ message: "保存成功", type: "success" });
            } else {
              this.$message({ message: r.Message, type: "error" });
            }
          });
        }
      });
    },

    close() {
      this.isVisible = false;
      Object.assign(this._data, this.$options.data());
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
  },
};
</script>