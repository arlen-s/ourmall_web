<template>
  <div class="contentpanel allocate-products-page">
    <div
      class="pagetitle"
      ref="pageHeader"
    >
      <div class="left">
        <div class="title" style="margin-bottom: 10px;">
          <i class="el-icon-shopping-bag-1"></i>
          <h2>{{$t('My Allocated Products')}}</h2>
        </div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style=" font-size: 12px">
          <el-breadcrumb-item :to="{ path: '/vendors' }" style="color: #5c6ac4;">{{$t('Vendors')}}</el-breadcrumb-item>
          <el-breadcrumb-item style="color: #C0C4CC;">{{$t('My Allocated Products')}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="right">
        <el-button type="primary" size="medium" :disabled="!checkdeStatus.checkedArr.length"
          style=" margin-right: 10px;" @click="openAllocateToVendor()"
        >{{$t('Batch Re-allocate')}}</el-button>
        <el-button type="danger" size="medium" 
          :disabled="!checkdeStatus.checkedArr.length"
          @click="confirmUnAllocate('multi')"
        >{{$t('Batch Un-allocate')}}</el-button>
        
      </div>
    </div>
    <div
      v-loading="loading"
      class="pagebody mg-b-20"
    >
      <el-card>
        <el-row :gutter="20">
          <div
            ref="pageFilter"
            class="page-filter"
          >
            <el-form
              :inline="true"
              size="mini"
            >
              <el-form-item>
                <!-- <el-select v-model="filterParams.accountId"  filterable placeholder="All my stores"
                  @change="filterGetItem"
                >
                  <el-option  label="All my stores" value=""></el-option>
                  <el-option
                    v-for="store in storeList"
                    :key="store.shopifyAccountId"
                    :label="store.store"
                    :value="store.shopifyAccountId"
                  ></el-option>
                </el-select>   -->
                 <el-cascader
                 :key="cascaderKey"
                  v-model="cascaderValue"
                  :placeholder="$t('All my stores')"
                  :options="options"
                  :props="{ expandTrigger: 'hover' }"
                  @change="filterGetItem"
                  >
                  </el-cascader>
              </el-form-item>
              <el-form-item>
                <el-input v-model="productName" :placeholder="$t('Product name')"
                  @keyup.native.enter="filterGetItem"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="filterParams.relationshipId"  filterable :placeholder="$t('All my vendors')"
                  @change="filterGetItem"
                >
                  <el-option :label="$t('All my vendors')" value=""></el-option>
                  <el-option
                    v-for="vendor in vendors"
                    :key="vendor.id"
                    :label="vendor.vendorName"
                    :value="vendor.id"
                  ></el-option>
                </el-select>  
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="filterGetItem"
                >{{$t('Filter')}}</el-button>
                <el-button
                  type="danger"
                  @click="clearFilter('all')"
                >{{$t('Clear')}}</el-button>
              </el-form-item>
            </el-form>
            <div style=" margin-bottom: 5px;">
              <el-tag v-if="filterParams.accountId" size="small" type="info" closable @close="clearFilter('store')" class="mg-r-5">
                {{storeName(filterParams.accountId)}}
              </el-tag>
              <el-tag v-if="filterParams.productName" size="small" type="info" closable @close="clearFilter('name')" class="mg-r-5">
                {{filterParams.productName}}
              </el-tag>
              <el-tag v-if="filterParams.relationshipId" size="small" type="info" closable @close="clearFilter('vendor')" class="mg-r-5">
                {{venderName(filterParams.relationshipId)}}
              </el-tag>
            </div>
            <el-row :gutter="10" style="margin-bottom: 5px">
              <el-col :span="24" style="padding-right: 25px;">
                <el-card :shadow="'never'" :body-style="{ padding: '0 20px' }" class="table-header">
                  <el-col :span="10">
                    <div class=" d-flex">
                      <el-checkbox style="margin-right: 10px; margin-bottom: 0"
                        v-model="allChecked"
                        @change="changeAllChecked"
                      ></el-checkbox>
                      <div class="title">{{$t('My Product')}}</div>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class=" title">{{$t('My store')}}</div>
                  </el-col>
                  <el-col :span="6">
                    <div class=" title">{{$t('Vendor')}}</div>
                  </el-col>
                  <el-col :span="2">
                  </el-col>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-row>       
        <el-row
          ref="gridTable"
          :gutter="10"
          style=" padding-top: 15px; overflow-y: auto;"
          :style="[{height: `${tableHeight}px`}, {overflowX: 'hidden'}]"
        >
          <el-col v-if="!items.length">
            <p style="margin-top: 25px; font-size: 16px; color: #909399; text-align: center;">{{$t('No product')}}</p>
          </el-col>
          <!-- 横列表 -->       
          <el-row :gutter="10" v-for="item in items" :key="item.id">
            <el-col :span="24" style="padding-right: 25px;">
              <el-card :body-style="[{display: 'flex'},{padding: '10px 20px'},{alignItems: 'center'}]"  class="table-body-card">
                <el-col :span="10">
                  <div class="product-box">
                    <el-checkbox v-model="item.checked"></el-checkbox>
                    <el-image
                      style="min-width: 120px; width: 120px; height: 120px;"
                      :fit="'contain'"
                      :src="item.img"
                      :preview-src-list="[item.img]"
                    >
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                    <div class="info">
                      <div class="name tx-ellipsis3">{{item.productName}}</div>
                      <div class="row1">
                        <span style="color: #909399">SKU:</span>
                        {{item.sku}}
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="info-wrap">
                    <div class="row1">{{item.storeName}}</div>
                    <div class="row1">
                      <span style="color: #909399">{{$t('Sale price')}}: </span>
                      <span v-if="item.saleCurrency">{{ ce[item.saleCurrency] ? ce[item.saleCurrency].symbol : item.saleCurrency}} </span>
                      {{item.salePrice}}
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="info-wrap">
                    <div class="row1">{{item.vendorName}}</div>
                    <div class="row1">
                      <span style="color: #909399">{{$t('Purchase price')}}: </span>
                      <span>$ </span>
                      {{item.purchasePrice}}
                    </div>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div class="info-wrap">
                    <div class="row1 mg-b-10">
                      <el-button type="primary" size="small" @click="openAllocateToVendor(item)">Re-allocate</el-button>
                    </div>
                    <div class="row1">
                      <el-button type="danger" size="small" @click="confirmUnAllocate('single', item)">Un-allocate</el-button>                   
                    </div>
                  </div>
                </el-col>
              </el-card>
            </el-col>
          </el-row>
        </el-row>
      </el-card>  
    </div>
    <el-row
      v-if="items.length"
      :gutter="20"
    >
      <el-col
        :span="24"
        class=" d-flex justify-content-center"
      >
        <div>
          <el-pagination
            :current-page="page"
            :background="true"
            layout="sizes, total, prev, pager, next, jumper"
            :page-sizes="pageSizes"
            :page-size="rowsPerPage"
            :total="Number(total)"
            @current-change="toPage"
            @size-change="changePageSize"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <DistributionVendorDialog
      ref="DistributionVendorDialog"
      :type="'products'"
      @resetPage="filterGetItem"
    />
  </div>  
</template>

<script>
import DistributionVendorDialog from "@/components/DistributionVendorDialog";
import { set } from 'xe-utils/methods';
export default {
  data(){
    return {
// 1 shopify
// 2 woocommerce
// 3 lazada
// 4 shopee
      cascaderKey:1,
      cascaderValue:'',
      options:[{
        id:1,
        label:'Shopify',
        children:[]
      },
      {
        id:2,
        label:'Woocommerce',
        children:[]
      },
      {
        id:3,
        label:'Lazada',
        children:[]
      },
      {
        id:4,
        label:'Shopee',
        children:[]
      }],
      loading: false,
      tableHeight: 400,
      reSizeTime: 0,
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("c_allocateProductsPerPage")
        ? Number(localStorage.getItem("c_allocateProductsPerPage"))
        : 10,
      total: 0,
      totalPage: 0,
      pageSizes: [10, 20, 50],
      items: [],
      productName: "",
      filterParams: {
        accountId: "",
        productName: "",
        relationshipId: ""
      },
      filterParamsDefault: "{}",
      ce: this.$CE, //货币符号
      allChecked: false,
      storeList: [],
      vendors: [],
      resizeH: ()=>{this.$getTableHeight(this)},
    }
  },
  components: {
    DistributionVendorDialog,
  },
  computed:{
    checkdeStatus(){
      let [checkedArr,variableIdArr] = [[], []] 
      this.items.forEach(item => {
        if(item.checked){
          checkedArr.push(item)
          variableIdArr.push(item.variableId)
        }
      })
      return {
        checkedArr,
        allChecked: this.items.length && this.items.length == checkedArr.length,
        variableIdArr,
      }
    },
  },
  watch:{
    $route: "gotoPage",
    'checkdeStatus.allChecked'(){
      this.allChecked = this.checkdeStatus.allChecked
    }
  },
  mounted(){
    this.filterParamsDefault = JSON.stringify(this.filterParams);
    this.filterParams.relationshipId = this.$route.params.vendorId;
    this.getStore();
    this.getVendors();
    this.getItems();
    this.$nextTick(()=>{
      this.resizeH();
      window.addEventListener("resize", this.resizeH, false);
    })
  },
  beforeDestroy(){
    window.removeEventListener("resize", this.resizeH)
  },
  methods: {
    openAllocateToVendor(item){
      if(item){
        this.$refs.DistributionVendorDialog.openDistributionDialog([item])
      }else{
        this.$refs.DistributionVendorDialog.openDistributionDialog(this.checkdeStatus.checkedArr.slice())
      }
    },
    confirmUnAllocate(type, item){
      this.$confirm(type == 'single' ?  this.$t('Un-allocate selected products?'): `Un-allocate selected (${this.checkdeStatus.variableIdArr.length}) products? `, '', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(()=>{
        this.unAllocate(type, item)
      });
    },
    unAllocate(type, item){//取消分配
      this.loading = true;
      let params = {};
      if(type == 'single'){
        params.variableIds = [item.variableId]
      }else{
        params.variableIds = this.checkdeStatus.variableIdArr
      }
      this.$apiCall("api.DispatchOrderRule.unAllocate", params, r => {
        if (r.ErrorCode == "9999") {
          this.getItems(true);
          this.$elementMessage('UN-allocate Success', "success");
        }else{
          this.$elementMessage(r.Message, "error");
        }
      })
    },
    storeName(val){
      let text = '';
      this.storeList.some(e => {
        if(e.shopifyAccountId == val){
          text = e.store
          return true 
        }
          
      })
      return text;
    },
    venderName(val){
      let text = '';
      this.vendors.some(e => {
        if(e.id == val){
          text = e.vendorName;
          return true 
        }
      })
      return text; 
    },
    changeAllChecked(){
      this.items.forEach(item => {
        item.checked = this.allChecked;
      })
    },
    clearFilter(type){
      switch(type){
        case 'store':
          this.filterParams.accountId = "";
          this.cascaderValue = "";
          ++this.cascaderKey;
        break;
        case 'name':
          this.productName = this.filterParams.productName = "";
        break;
        case 'vendor':
          this.filterParams.relationshipId = "";
        break;
        case 'all':
          this.filterParams = JSON.parse(this.filterParamsDefault)
        break;
      }
      if (this.$route.query.page == 1) {
        this.getItems();
      } else {
        this.$router.push({
          query: {
            page: 1,
          },
        });
      }
    },
    filterGetItem(){
      //筛选
      if(this.cascaderValue != ""){
        this.filterParams.accountId = this.cascaderValue[1];
      }
      this.filterParams.productName = this.productName;
      if (this.$route.query.page == 1) {
        this.getItems();
      } else {
        this.$router.push({
          query: {
            page: 1,
          },
        });
      }
    },
    getItems(s){
      this.loading = true;
      let params = {
        page: this.page,
        rowsPerPage: this.rowsPerPage,
        accountId: this.filterParams.accountId,
        productName: this.filterParams.productName,
        relationshipId: this.filterParams.relationshipId,
      }
      this.$apiCall("api.DispatchOrderRule.findAllocatedProducts", params, r => {
        this.loading = false;
        if (r.ErrorCode == "9999") {
          this.items = r.Data.Results.map(item => {
            item.checked = false;
            return item
          });
          this.total = Number(r.Data.Pagination.totalCount);
          this.totalPage = Number(r.Data.Pagination.totalPage);
          this.resizeH();
          if (!s && this.$refs.gridTable) this.$refs.gridTable.$el.scrollTop = 0;
        }else{
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    toPage(val) {
      if (val != this.$route.query.page)
        this.$router.push({
          query: {
            page: val,
          },
        });
    },
    changePageSize(val) {
      this.rowsPerPage = val;
      localStorage.setItem("c_allocateProductsPerPage", val);
      this.getItems();
    },
    gotoPage() {
      this.page = this.$route.query.page ? this.$route.query.page : 1;
      this.getItems();
    },
    getStore() {
      this.$apiCall("api.Invoice.findStores", { authStatus: 1 }, (r) => {
        if (r.ErrorCode == 9999) {
          this.storeList = [];
          r.Data.Results.forEach((e) => {
            this.storeList.push({
              shopifyAccountId: e.id,
              store: e.shopName,
            });
          });
          this.options.map((item) => {
            r.Data.Results.filter((a) => {
              if(a.platform == item.id){
                item.children.push({
                  label: a.shopName,
                  value: a.id,
                })
              };
            });
          });
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      });
    },
    getVendors(){
      this.$apiCall('api.Relationship.findByCustomer', {}, r => {
        if (r.ErrorCode == "9999") {
          this.vendors = r.Data.Results;
        }else{
          this.$elementMessage(r.Message, "error");
        }
      });
    },
  }
}
</script>
<style lang="scss">
.allocate-products-page{
  .el-breadcrumb__inner.is-link{
    color: #5c6ac4;
  }
  .image-slot{
    border: 1px #EBEEF5 solid;
    i{
      color: #C0C4CC;
      font-size: 32px;
      margin-left: 0;
      margin-top: 0;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
<style lang="scss" scoped>
.el-card.table-header{
  border-color: transparent;
  background-color: transparent;
}
.table-body-card{
  margin-bottom: 15px;
  font-size: 13px;
}
.product-box{
  display: flex;
  align-items: center;
  .el-checkbox{
    margin: 0 10px 0 0;
  }
  .el-image{
    margin-right: 20px;
    border: 1px #E4E7ED solid;
  }
  .info{
    height: 120px;
    .name{
      margin-bottom: 15px;
      max-height: 72px;
      line-height: 24px;
    }
  }
}
.info-wrap{
  display: flex;
  flex-direction: column;
  .row1{
    margin-bottom: 15px;
  }
}
</style>