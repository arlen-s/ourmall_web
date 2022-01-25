<template>
  <el-drawer
    :title="`${data.form.tId ? $t('logistics.编辑') : $t('logistics.添加')}${$t(
      'logistics.运费方案'
    )}`"
    :visible.sync="data.isShow"
    class="drawer-shipping"
    size="1080px"
    :before-close="beforeClose"
  >
    <el-divider></el-divider>
    <div class="d-body">
      <el-form
        ref="ShoppingForm"
        :label-position="'top'"
        :model="data.form"
        label-width="120px"
      >
        <el-form-item :label="$t('logistics.名称')" required>
          <el-input
            :placeholder="$t('logistics.请输入名称')"
            maxlength="30"
            v-model="data.form.name"
          >
            <span slot="suffix">{{ data.form.name.length }} / 30</span>
          </el-input>
        </el-form-item>
        <el-form-item
          :label="$t('logistics.方案说明')"
          style="position: relative"
        >
          <el-input
            type="textarea"
            :rows="4"
            :placeholder="$t('logistics.请输入200个字以内的物流方案说明')"
            v-model="data.form.remark"
          >
          </el-input>
          <span class="textarea-len" style="color: #909399"
            ><span
              :style="{
                color: data.form.remark.length > 200 ? '#F56C6C' : '#909399',
              }"
              >{{ data.form.remark.length }}</span
            >
            / 200</span
          >
        </el-form-item>
        <el-form-item :label="$t('logistics.商品属性')">
          <el-checkbox-group v-model="data.form.productType">
            <el-checkbox
              v-for="(type, k) in productTypeArr"
              :key="k"
              :label="type.val"
              name="type"
              :value="type.val"
              >{{ $t(type.text) }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <template v-if="data.form.type == 1">
          <el-form-item :label="$t('logistics.规格设置')">
            <!-- 重量 -->
            <el-col :span="5" class="mg-r-5">
              <el-select v-model="data.form.type">
                <el-option
                  :label="$t('logistics.商品重量')"
                  value="1"
                ></el-option>
                <el-option
                  :label="$t('logistics.商品体积')"
                  value="2"
                ></el-option>
                <!-- <el-option label="固定运费" value="3"></el-option> -->
              </el-select>
            </el-col>
            <el-col :span="2">
              <el-input-number
                :precision="2"
                :controls="false"
                :min="0"
                v-model="data.form.min"
                :placeholder="$t('goods.最小')"
                style="width: 80px"
              ></el-input-number>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center">-</el-col>
            <el-col :span="2">
              <el-input-number
                :precision="2"
                :controls="false"
                :min="0"
                v-model="data.form.max"
                :placeholder="$t('logistics.无限')"
                style="width: 80px"
              ></el-input-number>
            </el-col>
            <el-col :span="2">
              <el-select v-model="data.kg" style="width: 70px">
                <el-option label="g" :value="1"></el-option>
                <el-option label="kg" :value="2"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('logistics.运费设置')">
            <el-radio-group v-model="data.form.priceType" @change="changePriceType">
              <el-radio label="1">{{ $t("logistics.固定运费") }}</el-radio>
              <el-radio label="2">{{ $t("logistics.首重 + 续重") }}</el-radio>
              <!-- <el-radio label="3">{{ $t("logistics.阶梯收费") }}</el-radio> -->
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('logistics.运费')">
            <template v-if="data.form.priceType == '3'">
              <div>
                <el-row>
                  <el-col :span="7">
                    {{ $t("logistics.最低计费重量：") }}
                    <el-input-number
                      :precision="2"
                      :controls="false"
                      :min="0"
                      v-model="data.form.minWeight"
                      :placeholder="$t('logistics.最低计费重量')"
                      style="width: 125px"
                    ></el-input-number>
                  </el-col>
                  <el-col :span="2">
                    <el-select v-model="data.kg2" style="width: 70px">
                      <el-option label="g" :value="1"></el-option>
                      <el-option label="kg" :value="2"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </div>
              <div
                class="mg-t-10"
                v-for="(price, index) in data.form.priceArr"
                :key="index"
              >
                <el-row>
                  <el-col :span="6">
                    {{ $t("logistics.重量：") }}
                    <el-input-number
                      :precision="2"
                      :controls="false"
                      :min="0"
                      v-model="price.smallerWeight"
                      style="width: 70px"
                    ></el-input-number>
                    &lt;W≤
                    <el-input-number
                      :precision="2"
                      :controls="false"
                      :min="0"
                      v-model="price.greaterWeight"
                      style="width: 70px"
                    ></el-input-number>
                  </el-col>
                  <el-col :span="2">
                    <el-select v-model="data.kg2" style="width: 70px">
                      <el-option label="g" :value="1"></el-option>
                      <el-option label="kg" :value="2"></el-option>
                    </el-select>
                  </el-col>
                  <el-col
                    :span="3"
                    style="display: flex; justify-content: flex-end"
                  >
                    <el-input-number
                      :precision="10"
                      :controls="false"
                      :min="0"
                      v-model="price.perPrice"
                      :placeholder="$t('logistics.运费')"
                      style="width: 75px"
                    ></el-input-number>
                    <span style="margin-left: 6px; margin-right: 6px"
                      >USD/</span
                    >
                  </el-col>
                  <el-col :span="2">
                    <el-select v-model="data.kg2" style="width: 70px">
                      <el-option label="g" :value="1"></el-option>
                      <el-option label="kg" :value="2"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    <el-input-number
                      :precision="2"
                      :controls="false"
                      :min="0"
                      v-model="price.registrationFee"
                      :placeholder="$t('logistics.挂号费')"
                      style="margin-left: 25px; width: 75px"
                    ></el-input-number>
                    USD
                  </el-col>
                  <el-col :span="4">
                    <el-input-number
                      :precision="2"
                      :controls="false"
                      :min="0"
                      v-model="price.surcharge"
                      :placeholder="$t('logistics.附加费（选填）')"
                      style="width: 125px"
                    ></el-input-number>
                    USD
                  </el-col>
                  <el-col :span="3">
                    <span
                      style="color: #525fb0; cursor: pointer"
                      @click="addPriceArr"
                      >{{ $t("logistics.添加") }}</span
                    >
                    <span
                      style="margin-left: 20px; color: #f56c6c; cursor: pointer"
                      v-if="index != 0"
                      @click="delPriceArr(index)"
                      >{{ $t("logistics.删除") }}</span
                    >
                  </el-col>
                </el-row>
              </div>
            </template>
            <template v-if="data.form.priceType == '2'">
              <div class="mg-b-10">
                <el-row>
                  <el-col :span="7">
                    <el-input-number
                      :precision="4"
                      :controls="false"
                      :min="0"
                      v-model="data.form.firstPrice"
                      :placeholder="$t('logistics.首重运费')"
                      style="width: 130px"
					  ref="inputNumber"
                    ></el-input-number>
                    USD
                  </el-col>
                  <el-col :span="1"></el-col>
                  <el-col :span="8">
                    {{ $t("logistics.首重：") }}
                    <el-input-number
                      :precision="data.kg2 == 1 ? 0 : 3"
                      :controls="false"
                      :min="0"
                      v-model="data.form.firstWeight"
                      :placeholder="$t('logistics.首重')"
                      style="width: 145px"
                    ></el-input-number>
                  </el-col>
                  <el-col :span="3">
                    <el-select v-model="data.kg2" style="width: 70px">
                      <el-option label="g" :value="1"></el-option>
                      <el-option label="kg" :value="2"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </div>
              <div>
                <el-row>
                  <el-col :span="7">
                    <el-input-number
                      :precision="4"
                      :controls="false"
                      :min="0"
                      v-model="data.form.nextPrice"
                      :placeholder="$t('logistics.续重运费')"
                      style="width: 130px"
                    ></el-input-number>
                    USD
                  </el-col>
                  <el-col :span="1"></el-col>
                  <el-col :span="8">
                    {{ $t("logistics.续重：") }}
                    <el-input-number
                      :precision="data.kg2 == 1 ? 0 : 3"
                      :controls="false"
                      :min="0"
                      v-model="data.form.nextWeight"
                      :placeholder="$t('logistics.续重')"
                      style="width: 145px"
                    ></el-input-number>
                  </el-col>
                  <el-col :span="3">
                    <el-select v-model="data.kg2" style="width: 70px">
                      <el-option label="g" :value="1"></el-option>
                      <el-option label="kg" :value="2"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </div>
            </template>
            <template v-if="data.form.priceType == '1'">
              <el-input-number
                :precision="4"
                :controls="false"
                :min="0"
                v-model="data.form.firstPrice"
                :placeholder="$t('logistics.固定运费')"
                style="width: 130px"
				ref="inputNumber"
              ></el-input-number>
              USD
            </template>
          </el-form-item>
        </template>
        <template v-if="data.form.type == 2">
          <!-- 体积 -->
          <el-form-item :label="$t('logistics.规格设置')">
            <el-col :span="5" class="mg-r-5">
              <el-select v-model="data.form.type">
                <el-option
                  :label="$t('logistics.商品重量')"
                  value="1"
                ></el-option>
                <el-option
                  :label="$t('logistics.商品体积')"
                  value="2"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-input-number
                :precision="0"
                :controls="false"
                :min="0"
                v-model="data.form.min"
                :placeholder="$t('goods.最小')"
                style="width: 80px"
              ></el-input-number>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="3">
              <el-input-number
                :precision="0"
                :controls="false"
                :min="0"
                v-model="data.form.max"
                :placeholder="$t('logistics.无限')"
                style="width: 80px"
              ></el-input-number>
            </el-col>
            <el-col :span="2" style="height: 40px; line-height: 36px">
              cm <sup>3</sup>
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('logistics.运费系数')">
            <el-input-number
              :precision="4"
              :controls="false"
              :min="0"
              v-model="data.form.radio"
              placeholder="0"
              style="width: 200px"
            ></el-input-number>
            USD
          </el-form-item>
        </template>
        <template v-if="data.form.type == 3">
          <!-- 固定 -->
          <el-form-item :label="$t('logistics.规格设置')">
            <el-col :span="5" class="mg-r-5">
              <el-select v-model="data.form.type">
                <el-option
                  :label="$t('logistics.商品重量')"
                  value="1"
                ></el-option>
                <el-option
                  :label="$t('logistics.商品体积')"
                  value="2"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-input-number
                :precision="0"
                :controls="false"
                :min="0"
                v-model="data.form.min"
                :placeholder="$t('goods.最小')"
                style="width: 80px"
              ></el-input-number>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="4">
              <el-input-number
                :precision="0"
                :controls="false"
                :min="0"
                v-model="data.form.max"
                :placeholder="$t('logistics.无限')"
                style="width: 80px"
              ></el-input-number>
            </el-col>
            <el-col :span="3">
              <el-select v-model="data.kg">
                <el-option label="g" :value="1"></el-option>
                <el-option label="kg" :value="2"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('logistics.固定运费')">
            <el-input-number
              :precision="2"
              :controls="false"
              :min="0"
              v-model="data.form.firstPrice"
              :placeholder="$t('logistics.固定运费')"
              style="width: 130px"
            ></el-input-number>
            USD
          </el-form-item>
        </template>
      </el-form>
    </div>
    <div class="drawer-footer">
      <el-button @click="data.isShow = false">{{
        $t("logistics.取消")
      }}</el-button>
      <el-button type="primary" :loading="data.loading" @click="setShipping">{{
        $t("logistics.保存")
      }}</el-button>
    </div>
  </el-drawer>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      productTypeArr: this.$dict.productType,
    };
  },
  methods: {
		changePriceType() {
			this.$nextTick(()=>{
				this.data.form.firstPrice = undefined;
				if(this.$refs.inputNumber){
					this.$refs.inputNumber.setCurrentValue(undefined);
				}
				this.data.form.firstWeight = undefined;
				this.data.form.nextPrice = undefined;
				this.data.form.nextWeight = undefined;
				this.data.form.max = undefined;
				this.data.form.min = undefined;
				this.data.form.minWeight = undefined;
				this.data.form.priceArr = [{
				  smallerWeight: undefined,
				  greaterWeight: undefined,
				  perPrice: undefined,
				  registrationFee: undefined,
				  surcharge: undefined,
				}];
			})
	  　　　	
	    },
    addPriceArr() {
      this.data.form.priceArr.push({
        smallerWeight: undefined,
        greaterWeight: undefined,
        perPrice: undefined,
        registrationFee: undefined,
        surcharge: undefined,
      });
    },
    delPriceArr(index) {
      this.data.form.priceArr.splice(index, 1);
    },
    setShipping() {
      if (!this.data.form.name) {
        this.$elementMessage(this.$t("logistics.名称必须输入"), "error");
        return;
      }
      if (this.data.form.remark.length > 200) {
        this.$elementMessage(
          this.$t("logistics.方案说明长度不能超过200"),
          "error"
        );
        return;
      }
      if (this.data.form.type == "1" && this.data.form.priceType == "2") {
        //选择首重 加 续重
        if (!this.data.form.firstPrice) {
          this.$elementMessage(
            this.$t("logistics.运费首重金额必须填写"),
            "error"
          );
          return;
        }
        if (!this.data.form.firstWeight) {
          this.$elementMessage(this.$t("logistics.首重重量必须填写"), "error");
          return;
        }
        if (!this.data.form.nextPrice) {
          this.$elementMessage(
            this.$t("logistics.运费续重金额必须填写"),
            "error"
          );
          return;
        }
        if (!this.data.form.nextWeight) {
          this.$elementMessage(
            this.$t("logistics.运费续重金额必须填写"),
            "error"
          );
          return;
        }
      }
      if (this.data.form.type == "1" && this.data.form.priceType == "3") {
        if (!this.data.form.minWeight) {
          this.$elementMessage(
            this.$t("logistics.最低计费重量必须填写"),
            "error"
          );
          return;
        }
        const price = this.data.form.priceArr[0] || {};
        if (!price.smallerWeight) {
          this.$elementMessage(this.$t("logistics.最低重量必须填写"), "error");
          return;
        }
        if (!price.greaterWeight) {
          this.$elementMessage(this.$t("logistics.最高重量必须填写"), "error");
          return;
        }
        if (!price.perPrice) {
          this.$elementMessage(this.$t("logistics.运费必须填写"), "error");
          return;
        }
        if (!price.registrationFee) {
          this.$elementMessage(this.$t("logistics.挂号费必须填写"), "error");
          return;
        }
      }
      let params = {
        id: this.data.form.id,
        name: this.data.form.name,
        remark: this.data.form.remark,
        productType: this.data.form.productType,
        type: this.data.form.type,
        min: "",
        max: "",
        firstWeight: "",
        firstPrice: "",
        nextWeight: "",
        nextPrice: "",
        radio: "",
        tId: this.data.form.tId,
        minWeight: "",
        priceArr: [],
      };
      if (this.data.form.type == 1) {
        if (this.data.form.max && this.data.form.min > this.data.form.max) {
          this.$elementMessage(
            this.$t("logistics.最小重量不能大于最大重量"),
            "error"
          );
          return;
        }
        //kg g *1000
        params.min =
          this.data.kg == 1
            ? this.data.form.min
            : !isNaN(this.data.form.min)
            ? this.data.form.min * 1000
            : "";
        params.max =
          this.data.kg == 1
            ? this.data.form.max
            : !isNaN(this.data.form.max)
            ? this.data.form.max * 1000
            : "";
        // 首重
        params.firstPrice = this.data.form.firstPrice;
        if (this.data.form.priceType == "2") {
          //非固定运费
          params.firstWeight =
            this.data.kg2 == 1
              ? this.data.form.firstWeight
              : !isNaN(this.data.form.firstWeight)
              ? this.data.form.firstWeight * 1000
              : "";

          // 续重
          params.nextWeight =
            this.data.kg2 == 1
              ? this.data.form.nextWeight
              : !isNaN(this.data.form.nextWeight)
              ? this.data.form.nextWeight * 1000
              : "";
          params.nextPrice = this.data.form.nextPrice;
        } else if (this.data.form.priceType == "3") {
          params.minWeight =
            this.data.kg2 == 1
              ? this.data.form.minWeight
              : !isNaN(this.data.form.minWeight)
              ? this.data.form.minWeight * 1000
              : "";
          this.data.form.priceArr.forEach((elem) => {
            elem.smallerWeight =
              this.data.kg2 == 1
                ? elem.smallerWeight
                : !isNaN(elem.smallerWeight)
                ? elem.smallerWeight * 1000
                : "";
            elem.greaterWeight =
              this.data.kg2 == 1
                ? elem.greaterWeight
                : !isNaN(elem.greaterWeight)
                ? elem.greaterWeight * 1000
                : "";
            elem.perPrice =
              this.data.kg2 == 1
                ? elem.perPrice
                : !isNaN(elem.perPrice)
                ? elem.perPrice / 1000
                : "";
            params.priceArr.push(elem);
          });
        }
      } else if (this.data.form.type == 2) {
        if (this.data.form.max && this.data.form.min > this.data.form.max) {
          this.$elementMessage(
            this.$t("logistics.最小体积不能大于最大体积"),
            "error"
          );
          return;
        }
        params.min = this.data.form.min;
        params.max = this.data.form.max;
        params.radio = this.data.form.radio;
      }
      if (params.type == "1" && this.data.form.priceType == "1") {
        params.type = "3";
      }
      if (params.type == "1" && this.data.form.priceType == "3") {
        params.type = "4";
      }
      params.min = params.min || 0;
	  params.max = params.max || 0;
      this.$emit("setShipping", params);
    },
    beforeClose(done) {
      this.$confirm(this.$t("logistics.确认关闭？  将不会保存改变。"))
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style lang="scss">
.drawer-shipping {
  .el-drawer {
    .el-drawer__header {
      border-bottom: 1px #dcdfe6 solid;
      margin-bottom: 0;
      padding-bottom: 15px;
    }
    .el-drawer__body {
      margin-bottom: 70px;
      .el-divider--horizontal {
        margin: 0;
      }
    }
  }
  .el-form-item {
    margin-bottom: 5px;
  }
  .el-form--label-top .el-form-item__label {
    padding: 0;
  }
}
</style>

<style lang="scss" scoped>
.drawer-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0 15px;
  border-top: 1px #dcdfe6 solid;
  width: 100%;
  height: 70px;
  background-color: #fff;
}
.d-body {
  padding: 0 10px 0 40px;
  .textarea-len {
    position: absolute;
    right: 0;
    bottom: -20px;
    max-width: 100px;
    line-height: 22px;
  }
}
</style>