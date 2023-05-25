<template>
  <el-dialog
    title="Push setting"
    :close-on-click-modal="false"
    :visible.sync="dialogPushSetting.isShow"
    v-loading="dialogPushSetting.loading"
    :style="{ overflow: dialogPushSetting.loading ? 'hidden' : 'auto' }"
  >
    <div class="setting-range">
      <div class="setting-opt">
        <el-button size="mini" @click="addRangeItem"
          >+ Add Cost Range</el-button
        >
      </div>
      <el-form
        v-if="dialogPushSetting.ranger.length"
        @submit.native.prevent
        ref="settingRangeForm"
        style="margin-top: 0"
      >
        <el-table
          :data="dialogPushSetting.ranger"
          stripe
          style="width: 100%"
          height="300"
        >
          <el-table-column label="Product Cost" width="250" fixed>
            <template slot-scope="scope">
              <el-tag v-if="scope.row.default" type="info"
                >Rest of the price ranges</el-tag
              >
              <template v-else>
                <el-input-number
                  v-model="scope.row.from"
                  :min="0"
                  size="mini"
                  :precision="2"
                  :controls="false"
                  class="mg-r-5"
                  style="width: 100px"
                >
                </el-input-number>
                <i class="el-icon-right mg-r-5"></i>
                <el-input-number
                  v-model="scope.row.to"
                  :min="0"
                  size="mini"
                  :precision="2"
                  :controls="false"
                  style="width: 100px"
                >
                </el-input-number>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="Shipping Cost" width="150">
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.shippingCost"
                :min="0"
                size="mini"
                :precision="2"
                :controls="false"
                style="width: 100px"
              >
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="Price" width="250">
            <template slot="header">
              <span class=" mg-r-20">{{$t('Price')}}</span>
            </template>
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.price"
                :min="0"
                size="mini"
                :controls="false"
                style="margin-right: 5px; width: 100px"
              >
              </el-input-number>
              <el-select
                v-if="!dialogPushSetting.fixedPrice"
                v-model="scope.row.priceType"
                size="mini"
                style="width: 100px"
              >
                <el-option label="Plus" value="1"></el-option>
                <el-option label="Multiply" value="2"></el-option>
                <el-option label="Fixed Price" value="3"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="Compare Price" width="250">
            <template slot="header">
              <el-checkbox style=" margin-right: 20px;" v-model="dialogPushSetting.isComparePrice">
              {{$t('Compare Price')}}  
              </el-checkbox>
            </template>
            <template
              v-if="dialogPushSetting.isComparePrice"
              slot-scope="scope"
            >
              <el-input-number
                v-model="scope.row.comparePrice"
                :min="0"
                size="mini"
                :controls="false"
                style="margin-right: 5px; width: 100px"
              >
              </el-input-number>
              <el-select
                v-if="!dialogPushSetting.fixedComparePrice"
                v-model="scope.row.comparePriceType"
                size="mini"
                style="width: 100px"
              >
                <el-option label="Plus" value="1"></el-option>
                <el-option label="Multiply" value="2"></el-option>
                <el-option label="Fixed Price" value="3"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="Action" width="100" align="center">
            <template v-if="!scope.row.default" slot-scope="scope">
              <a
                class="tx-danger"
                href="javascript:;"
                @click="delRange(scope.$index)"
              >
                <i class="el-icon-delete"></i>
              </a>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div>
        <div style="margin-bottom: 5px; padding-left: 15px">
          {{$t('You can set a specific cent value for your price or comparison')}} {{$t('price.')}}
          
        </div>
        <div class="d-flex" style="margin-bottom: 5px; padding: 0 15px">
          <div style="margin-right: 30px">
            <el-checkbox
              style="margin-right: 10px"
              v-model="dialogPushSetting.isPriceCent"
              size="mini"
            >
             {{$t('Assign Cent')}} 
            </el-checkbox>
            <el-input-number
              v-model="dialogPushSetting.priceCent"
              :controls="false"
              size="mini"
              style="width: 80px"
            >
            </el-input-number>
          </div>
          <div style="margin-right: 30px">
            <el-checkbox
              style="margin-right: 10px"
              v-model="dialogPushSetting.isComparePriceCent"
            >
             {{$t('Assign compare at Cent')}} 
            </el-checkbox>
            <el-input-number
              v-model="dialogPushSetting.comparePriceCent"
              :controls="false"
              size="mini"
              style="width: 80px"
            >
            </el-input-number>
          </div>
        </div>
        <div class="d-flex" style="padding: 0 15px">
          <div>
            <el-switch
              style="margin-right: 10px"
              v-model="dialogPushSetting.convertCurrency"
              active-text="Convert Currency"
            >
            </el-switch>
            <!-- Auto convert currency to
            <el-tag type="info" size="mini">{{ currency }}</el-tag> -->
          {{$t('According to store currency')}}  
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-link
        v-loading="dialogPushSetting.psLoading"
        :disabled="dialogPushSetting.psLoading"
        type="primary"
        style="margin-right: 10px"
        @click="applyPriceSetting"
        >{{$t('Apply for products in Import List')}}</el-link
      >
      <el-button @click="dialogPushSetting.isShow = false">{{$t('Cancel')}}</el-button>
      <el-button
        type="primary"
        :loading="dialogPushSetting.loading"
        @click="savePushSetting()"
      >
      {{$t('Save')}}  
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['dialogPushSetting'],
  methods: {
    delRange(i) {
      //删除range
      this.dialogPushSetting.ranger.splice(i, 1);
    },
    addRangeItem() {
      //添加新range
      this.dialogPushSetting.ranger.unshift({
        from: 0,
        to: 0.01,
        shippingCost: 0,
        price: 1,
        priceType: "1",
        comparePrice: 1,
        comparePriceType: "2",
      });
    },
    savePushSetting(s){
      this.$emit('savePushSetting', s)
    },
    applyPriceSetting() {
      this.savePushSetting(true)
    },
  }
}
</script>

<style lang="scss">
.setting-range {
  padding: 0 15px 10px;
  .setting-opt {
    display: flex;
    justify-content: space-between;
    padding-bottom: 15px;
    border-bottom: 1px #dcdfe6 solid;
  }
}
</style>