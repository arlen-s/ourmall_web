<template>
  <div>
    <el-dialog 
      :visible="data.isShow"
      :show-close="false"
      width="30%"
    >
      <div slot="title" class="d-title"> 
        <h2>{{`${data.addressId ? 'Edit':'Add'} Address`}}</h2>
        <a href="javascript:;" @click="closeDialog">
          <i class="el-icon-close"></i>
        </a>
      </div>
      <el-divider></el-divider>
      <el-form label-width="120px" >
        <el-form-item label="First Name" required style=" margin-bottom: 10px;">
          <el-input v-model="data.firstName" size="small"></el-input>
        </el-form-item>
        <el-form-item label="Last Name" required style=" margin-bottom: 10px;">
          <el-input v-model="data.lastName" size="small"></el-input>
        </el-form-item>
        <el-form-item label="Address1" required style=" margin-bottom: 10px;">
          <el-input v-model="data.address1" size="small"></el-input>
        </el-form-item>
        <el-form-item label="Address2" style=" margin-bottom: 10px;">
          <el-input v-model="data.address2" size="small"></el-input>
        </el-form-item>
        <el-form-item label="Country" required style=" margin-bottom: 10px;">
          <el-select v-model="data.country" filterable>
            <el-option v-for="c in countryArr" 
              :key="c.value"
              :label="c.label"
              :value="c.value"
            >
              <span style="float: left">{{ c.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ c.value }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Province" required style=" margin-bottom: 10px;">
          <el-input v-model="data.province" size="small"></el-input>
        </el-form-item>
        <el-form-item label="City" required style=" margin-bottom: 10px;">
          <el-input v-model="data.city" size="small"></el-input>
        </el-form-item>
        <el-form-item label="Street" required style=" margin-bottom: 10px;">
          <el-input v-model="data.street" size="small"></el-input>
        </el-form-item>
        <el-form-item label="Company" style=" margin-bottom: 10px;">
          <el-input v-model="data.company" size="small"></el-input>
        </el-form-item>
        <el-form-item label="Phone" style=" margin-bottom: 10px;">
          <el-input v-model="data.phone" size="small"></el-input>
        </el-form-item>
        <el-form-item label="Postcode" style=" margin-bottom: 10px;">
          <el-input v-model="data.postcode" size="small"></el-input>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <div slot="footer">
        <div class="footer-wrap" v-loading="data.loading">
          <el-checkbox v-model="data.isDefault">{{$t('Set as default shipping address')}}</el-checkbox>
          <div class="footer-action">
            <el-button size="small" @click="closeDialog">{{$t('Cancel')}}</el-button>
            <el-button type="primary" size="small" @click="setAddress">{{$t('Confirm')}}</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import countryArr from "@/components/country.json";
export default {
  props: ["data",],
  data(){
    return {
      countryJSON: null,
      countryArr: [],
    }
  },
  mounted(){
    this.countryJSON = countryArr;
    //格式化国家
    Object.keys(countryArr).forEach((key) => {
      Object.keys(countryArr[key]).forEach((key2) => {
        this.countryArr.push({
          label: countryArr[key][key2].nameEN,
          value: countryArr[key][key2].code2,
        });
      });
    });
    this.countryArr.sort((a, b) => a.label.charCodeAt(0) - b.label.charCodeAt(0));
  },
  methods:{
    setAddress(){
      //保存地址
      if(!this.data.firstName){
        this.$elementMessage("Please enter First Name", "error");
        return;
      }
      if(!this.data.lastName){
        this.$elementMessage("Please enter Last Name", "error");
        return;
      }
      if(!this.data.address1){
        this.$elementMessage("Please enter Address1", "error");
        return;
      }
      if(!this.data.country){
        this.$elementMessage("Please select Country", "error");
        return;
      }
      if(!this.data.province){
        this.$elementMessage("Please enter Province", "error");
        return;
      }
      if(!this.data.city){
        this.$elementMessage("Please enter City", "error");
        return;
      }
      if(!this.data.street){
        this.$elementMessage("Please enter Street", "error");
        return;
      }
      this.data.loading = true;
      let params = {
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        address1: this.data.address1,
        address2: this.data.address2,
        country: this.data.country,
        province: this.data.province,
        city: this.data.city,
        street: this.data.street,
        company: this.data.company,
        phone: this.data.phone,
        postcode: this.data.postcode,
        isDefault: this.data.isDefault ? 1 : 2,
        addressId: this.data.addressId,
      }
      console.log(params)
      let api = params.addressId ? 'api.Address.updateAddress' : 'api.Address.addAddress'
      this.$apiCall(api, params, r =>{
        this.data.loading = false;
        if (r.ErrorCode == "9999") {
          this.$emit('setAdd', params.addressId)
        }else{
          this.$elementMessage(r.Message, "error");
        }
      })
    },
    closeDialog(){
      this.data.isShow = false;
    }
  }
}
</script>

<style lang="scss">
.add-page{
  .el-loading-mask{
    position: fixed;
  }
}
</style>
<style lang="scss" scoped>
.d-title{
  position: relative;
  > a{
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    color: #909399;
  }
}
.footer-wrap{
  display: flex; 
  justify-content: space-between;
}
</style>