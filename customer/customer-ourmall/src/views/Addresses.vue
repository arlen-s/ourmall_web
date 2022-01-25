<template>
  <div class="contentpanel add-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-location"></i>
          <h2>Address Management</h2>
        </div>
      </div>
      <div class="right">
        <el-button type="primary" @click="openAddAdd()">Add New Address</el-button>
      </div>
    </div>
    <div class="pagebody" v-loading="loading">
      <el-row v-if="items.length" :gutter="15" class="mg-b-20">
        <el-col v-for="item in items" :key="item.id" :sm="24" :lg="12" :xl="8" class=" mg-b-15">
          <el-card class="add-card" :class="{default: item.isDefault == 1}">
            <div v-if="item.isDefault == 1" class="badge-default">Default Shipping Address</div>
            <div class="add-row tx-ellipsis1">
              <span class=" title">First name:</span> {{item.firstName}}
            </div>
            <div class="add-row tx-ellipsis1">
              <span class=" title">Last name:</span> {{item.lastName}}
            </div>
            <div class="add-row tx-ellipsis1">
              <span class="title">Phone:</span> {{item.phone || '--'}}
            </div>
            <div class="add-row">
              <span class="title">Address:</span> <span class="tx-ellipsis1">{{item.address1}}</span>
            </div>
            <div class="add-row-2">
              <div class="row-sub tx-ellipsis1">
                <span class="title">City:</span> {{item.city}}
              </div>
              <div class="row-sub tx-ellipsis1">
                <span class="title">Postcode:</span> {{item.postcode || '--'}}
              </div>
            </div>
            <div class="add-row-2 tx-ellipsis1">
              <div class="row-sub">
                <span class="title">Province:</span> {{item.province}}
              </div>
              <div class="row-sub tx-ellipsis1">
                <span class="title">Country:</span> {{item.country ? `${codeToCountry(item.country)} (${item.country})` : '---'}}
              </div>
            </div>
            <div class="action">
              <el-button type="primary" size="mini" @click="openAddAdd(item)">Edit</el-button>
              <el-button type="danger" size="mini" @click="delAdd(item)">Delete</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row v-else :gutter="10">
        <el-col :span="24" class=" tx-center" style=" padding: 25px; color: #909399; font-size: 18px;">
          No address
        </el-col>
      </el-row>
    </div>  
    <DialogEditAdd :data="dialogEditAdd" @setAdd="setAdd"/>
  </div>
</template>

<script>
import countryArr from "@/components/country.json";
import DialogEditAdd from "@/components/addresse/DialogEditAdd"
export default {
  data(){
    return {
      loading: false,
      countryArr: [],
      dialogEditAdd: {
        isShow: false,
        loading: false,
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        country: '',
        province: '',
        city: '',
        street: '',
        company: '',
        phone: '',
        postcode: '',
        isDefault: false,
        addressId: '',
      },
      dialogEditAddDefault: '{}',
      items: [],
    }
  },
  components: {
    DialogEditAdd,
  },
  mounted(){
    //格式化国家
    Object.keys(countryArr).forEach((key) => {
      Object.keys(countryArr[key]).forEach((key2) => {
        this.countryArr.push({
          label: countryArr[key][key2].nameEN,
          value: countryArr[key][key2].code2,
        });
      });
    });
    this.dialogEditAddDefault = JSON.stringify(this.dialogEditAdd)
    this.getAddList();
    
  },
  methods:{
    delAdd(item){
      //删除地址
      this.$confirm('Do you want to delete?', '', {
        confirmButtonClass: " el-button--danger",
        type: "error",

      }).then(()=>{
        this.loading = true;
        this.$apiCall('api.Address.deleteAddress', {addressId: item.id}, r => {
          this.loading = false;
          if (r.ErrorCode == "9999") {
            this.$elementMessage('delete successfully', "success");
            this.getAddList();
          }else{
            this.$elementMessage(r.Message, "error");
          }
        })
      }).catch(()=>{})
    },
    setAdd(){ 
      //保存地址成功
      this.getAddList();
      this.dialogEditAdd.isShow = false;
      this.$elementMessage('save successfully', "success");
    },
    openAddAdd(item){
      this.dialogEditAdd = JSON.parse(this.dialogEditAddDefault)
      if(item){
        //修改
        this.dialogEditAdd.firstName = item.firstName;
        this.dialogEditAdd.lastName = item.lastName;
        this.dialogEditAdd.address1 = item.address1;
        this.dialogEditAdd.address2 = item.address2;
        this.dialogEditAdd.country = item.country;
        this.dialogEditAdd.province = item.province;
        this.dialogEditAdd.city = item.city;
        this.dialogEditAdd.street = item.street;
        this.dialogEditAdd.company = item.company;
        this.dialogEditAdd.phone = item.phone;
        this.dialogEditAdd.postcode = item.postcode;
        this.dialogEditAdd.isDefault = item.isDefault == 1;
        this.dialogEditAdd.addressId = item.id;
      }
      this.dialogEditAdd.isShow = true;
    },
    getAddList(){
      //获取地址列表
      this.loading = true;
      this.$apiCall(' api.Address.addressList', {}, r => {
        this.loading = false;
        if (r.ErrorCode == "9999") {
          this.items = r.Data.Results;
        }else{
          this.$elementMessage(r.Message, "error");
        }
      })
    },
    codeToCountry(val){
      let c ='';
      this.countryArr.some(e => {
        if(e.value == val){
          c = e.label
          return true;
        }
      })
      return c;
    },
  }

}
</script>

<style lang="scss">
.add-page{
  .el-button--danger:focus{
    background: #dd6161;
    border-color: #dd6161;
  }
}

</style>
<style lang="scss" scoped>
.add-card{
  position: relative;
  height: 230px;
  .add-row{
    display: flex;
    margin-bottom: 5px;
    line-height: 20px;
    .title{
      min-width: 85px;
      color: #909399;
    }
  }
  .add-row-2{
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    line-height: 20px;
    .row-sub{
      display: flex;
      width: 50%;
      .title{
        min-width: 85px;
        color: #909399;
      }
    }
  }
  .action{
    padding-top: 10px;
    text-align: right;
  }
  .badge-default{
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 10px;
    background-color: #C0C4CC;
    color: #fff;
    line-height: 18px;
    font-size: 12px;
  }
}
.add-card.default{
  border-image: repeating-linear-gradient(-225deg, red 0, red 10px, transparent 10px, transparent 20px, #58a 20px, #58a 30px, transparent 30px, transparent 40px) 20;
}
</style>