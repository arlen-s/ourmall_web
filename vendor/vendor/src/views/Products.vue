<template>
  <div class="contentpanel my-invoice-page">
    <div
      class="pagetitle"
      ref="pageHeader"
    >
      <div class="left d-flex align-items-center">
        <div class="title" style="margin-right: 20px;">
          <i class="el-icon-shopping-bag-1"></i>
          <h2>{{$t('products.未合作商品报价')}}</h2>
        </div>
      </div>
      <div class="right">

      </div>
    </div>
    <div
      class="pagebody"
      v-loading="loading"
    >
      <el-card class=" mg-b-15">
        <el-row
          :gutter="15"
          class=" mg-b-20"
        >
          <el-col :span="24" style="position: relative; z-index: 1;">
            <div ref="pageFilter" class="page-filter">
              <div class="d-flex">
                <div class="d-flex mg-r-20">
                  <el-checkbox
                    style="margin-bottom: 18px; margin-right: 10px;"
                    v-model="allCheckedData"
                    size="mini"
                    @change="allChange">
                      {{$t('products.全选')}}<span v-if="isSelectItems" style="color: #909399; font-size: 12px;">({{isSelectItems}})</span>
                    </el-checkbox>
                  <el-button
                    type="primary"
                    size="mini"
                    style="margin-bottom: 18px;"
                    @click="setOfferedBat()"
                    :disabled="!isSelectItems"
                  >{{$t('products.批量报价')}}</el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    style="margin-bottom: 18px;"
                    @click="deleteBat()"
                    :disabled="!isSelectItems"
                  >{{$t('products.批量删除')}}</el-button>
                </div>
                <el-form
                  :inline="true"
                  size="mini"
                >
                  <el-form-item class=" mg-r-5" label="">
                    <el-select
                      filterable
                      remote
                      :remote-method="remoteMethodCustom"
                      :loading="selectLoading"
                      :placeholder="$t('products.请输入客户名')"
                      v-model="filterParams.relationshipId"
                      @change="filterGetItem"
                    >
                      <el-option
                        v-for="opt in selectArr"
                        :key="opt.id"
                        :label="opt.customerName"
                        :value="opt.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class=" mg-r-5" label="">
                    <el-input
                      style="width: 180px;"
                      :placeholder="$t('products.商品名称')"
                      v-model="name"
                      @keyup.enter.native="filterGetItem('name')"
                    ></el-input>
                  </el-form-item>
                  <el-form-item class=" mg-r-5" label="">
                    <el-input
                      style="width: 180px;"
                      :placeholder="$t('products.我的SKU')"
                      v-model="sku"
                      @keyup.enter.native="filterGetItem('sku')"
                    ></el-input>
                  </el-form-item>
                  <el-form-item class=" mg-r-5" label="">
                    <el-select :placeholder="$t('products.选择状态')"  v-model="filterParams.status"
                      @change="filterGetItem" 
                    >
                      <el-option :label="$t('products.全部状态')" value=""></el-option>
                      <el-option v-for="(statu,k) in statusArr" :key="k"
                        :label="statu.text"
                        :value="k"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="filterGetItem('all')"
                    >{{$t('products.筛选')}}</el-button>
                    <el-button
                      type="danger"
                      size="mini"
                      @click="clearFilter()"
                    >{{$t('products.清除')}}</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <el-row style="margin-top: -5px; margin-bottom: 5px;">
                <el-col :span="24">
                  <el-tag v-if="filterParams.relationshipId" size="mini"  closable class=" mg-r-10"
                    @close="clearFilter('relationshipId')"
                  >
                    <span style=" color: #909399;">{{$t('products.客户名称')}}：</span> {{getRelationshipName(filterParams.relationshipId)}}
                  </el-tag>
                  <el-tag v-if="filterParams.name" size="mini"  closable class=" mg-r-10"
                    @close="clearFilter('name')"
                  >
                    <span style=" color: #909399;">{{$t('products.商品名称')}}：</span> {{filterParams.name}}
                  </el-tag>
                  <el-tag v-if="filterParams.sku" size="mini"  closable class=" mg-r-10"
                    @close="clearFilter('sku')"
                  >
                    <span style=" color: #909399;">{{$t('products.我的SKU')}}：</span> {{filterParams.sku}}
                  </el-tag>
                  <el-tag v-if="filterParams.status" size="mini"  closable class=" mg-r-10"
                    @close="clearFilter('status')"
                  >
                    <span style=" color: #909399;">{{$t('products.状态')}}：</span>
                    <span :style="{color: statusArr[filterParams.status].color}">{{statusArr[filterParams.status].text}}</span>
                  </el-tag>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <!-- :style="{height: `${tableHeight-20}px`}" -->
          <el-row
            ref="gridTable"
            :gutter="10"
            style=" padding-top: 15px; position: relative; z-index: 0;"
          >
            <el-col v-if="!items.length" :span="24">
              <p style="margin-top: 25px; font-size: 16px; color: #909399; text-align: center;">{{$t('products.没有商品')}}</p>
            </el-col>
            <el-col
              v-for="item in items"
              :key="item.id"
              :sm="12"
              :md="8"
              :lg="6"
              :xl="4"
              class=" mg-b-20"
            >
              <div class="product-box">
                <div style="position: relative; padding-bottom: 100%; margin-bottom: 15px;">
                  <div class="check-bg">
                    <el-checkbox v-model="item.checked"></el-checkbox>
                  </div>
                  <el-image
                    style="position: absolute; width: 100%; height: 100%; border: 1px #DCDFE6 solid;"
                    :fit="'contain'"
                    :src="item.imgUrl"
                  >
                    <div slot="error" class="image-slot" style="position: relative;">
                      <i class="el-icon-picture-outline" style="position: absolute; top: 50%; left: 50%; color: #909399; transform: translate(-20%, -20%); font-size: 36px;"></i>
                    </div>
                  </el-image>
                </div>
                <div class="info">
                  <div class="name tx-ellipsis1" :title="item.name">{{item.name}}</div>
                  <div class="info-item">
                    <span class="title">{{$t('products.客户名称')}}：</span>
                    <span>{{item.customerName}}</span>
                  </div>
                  <div class="info-item">
                    <span class="title">{{$t('products.近7/30天销量')}}：</span>
                    <span>{{item.saleCnt7}} / {{item.saleCnt30}}</span>
                  </div>
                  <div v-if="item.editMode" class="info-item" style="margin-bottom: 0;">
                    <el-input v-model="item.editSku" placeholder="SKU"
                      size="mini"
                      style="margin-right:5px; width: 120px;"
                    ></el-input>
                    <el-button-group>
                      <el-button type="primary" size="mini" icon="el-icon-check"
                        :loading="item.editLoading"
                        @click="saveEditSku(item)"
                      ></el-button>
                      <el-button type="danger" size="mini" icon="el-icon-close"
                        @click="canelEditSku(item)"
                      ></el-button>
                    </el-button-group>
                  </div>
                  <div v-else  class="info-item" style="margin-bottom: 9px;">
                    <span class="title">{{$t('products.我的SKU编号')}}：</span>
                    <span class="d-flex" style="padding-right: 5px;" :title="item.sku">
                      <span class=" tx-ellipsis1 mg-r-5" style="max-width: 95px;">{{item.sku || '---'}}</span>
                      <div class=" d-flex">
                        <a class=" mg-r-5" href="javascript:;" :title="$t('products.编辑')" @click="editSku(item)">
                          <i class="el-icon-edit"></i>
                        </a>
                        <a v-if="item.sku" href="javascript:;" :title="$t('products.复制')"
                          v-clipboard:copy="item.sku"
                          v-clipboard:success="onCopy"
                          v-clipboard:error="onError"
                        >
                          <i class="el-icon-document-copy"></i>
                        </a>
                      </div>
                    </span>
                  </div>
                  <div class="info-item">
                    <span class="title">{{$t('products.我的供货价')}}：</span>
                    <span>{{item.price ? `$ ${item.price}` : '---'}}</span>
                  </div>
                  <div class="info-item">
                    <span class="title">{{$t('products.合作状态')}}：</span>
                    <span :style="{color: statusArr[item.status].color}">{{statusArr[item.status].text}}</span>
                  </div>
                </div>
                <div class="action">
                  <el-button :disabled="item.status != '1'" size="mini" type="primary" @click="setOfferedSingle(item)" >{{$t('products.我要报价')}}</el-button>
                  <el-button size="mini" type="danger" @click="deleteSingle(item)">{{$t('products.删除')}}</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-row>
      </el-card>
      <el-row
        :gutter="20"
        ref="pageFooter"
      >
        <el-col
          :span="24"
          class=" d-flex justify-content-center"
        >
          <div>
            <el-pagination :current-page="page" :background="true" layout="sizes, total, prev, pager, next, jumper" :page-sizes="pageSizes" :page-size="rowsPerPage" :total="Number(total)" @current-change="toPage" @size-change="changePageSize">
					</el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog width="1000"
      :title="dialogOffered.type == 1 ? $t('products.批量报价') : $t('products.商品报价')"
      :visible.sync="dialogOffered.isShow"
    >
      <div style=" padding: 0 20px;">
        <el-table :data="dialogOffered.items"
          :height="dialogOffered.type == 1 ? 460 : ''"
        stripe>
          <el-table-column :label="$t('products.商品信息')">
            <template slot-scope="scope">
              <div class="table-pro">
                <el-image
                  style="margin-right: 15px;min-width:80px; width: 80px; height: 80px; border: 1px #DCDFE6 solid;"
                  :fit="'contain'"
                  :src="scope.row.imgUrl"
                >
                  <div slot="error" class="image-slot" style="position: relative;">
                    <i class="el-icon-picture-outline" style="position: absolute; top: 50%; left: 50%; color: #909399; transform: translate(-14%, -20%); font-size: 32px;"></i>
                  </div>
                </el-image>
                <div class=" tx-ellipsis2" style=" max-width: 250px;" :title="scope.row.name">{{scope.row.name}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('products.近7/30天销量')">
            <template slot-scope="scope">
              {{scope.row.saleCnt7}} / {{scope.row.saleCnt30}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('products.我的SKU编号')">
            <template slot-scope="scope">
              <el-input v-if="scope.row.status == '1'" v-model="scope.row.sku" placeholder="SKU" size="mini"></el-input>
              <span v-else class="text-th">{{scope.row.sku}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('products.我的供货价(US $)')">
            <template slot-scope="scope">
              <el-input-number v-if="scope.row.status == '1'" v-model="scope.row.price" :min="0" :controls="false" size="mini">
              </el-input-number>
              <span v-else class="text-th">{{scope.row.price}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="saveOffered">{{$t('products.提交报价')}}</el-button>
        <el-button size="small" @click="dialogOffered.isShow = false">{{$t('products.关闭')}}</el-button>
      </div>
    </el-dialog>
    <el-backtop class="goto-top" target=".main-scroll  .el-scrollbar__wrap" :right="20" :bottom="20">
    </el-backtop>
  </div>
</template>

<script>
export default {
  data(){
    return {
      loading: false,
      tableHeight: 400,
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      pageSizes: [12, 24, 48, 96],
      rowsPerPage: localStorage.getItem("productsRowsPerPage")
        ? Number(localStorage.getItem("productsRowsPerPage"))
        : 12,
      items: [],
      total: 0,
      totalPage: 0,
      name: '',
      sku: '',
      filterParams: {
        relationshipId: '',
        name: '',
        status: '',
        sku: '',
      },
      filterParamsDefault: '{}',
      selectArr: [],
      selectLoading: false,
      statusArr: {
        1: {text: this.$t('products.尚未合作'), color: '#F56C6C'},
        2: {text: this.$t('products.我已报价'), color: '#E6A23C'},
        3: {text: this.$t('products.客户已确认'), color: '#67C23A'},
      },
      dialogOffered: {
        isShow: false,
        loading: false,
        items: [],
        type: 1,
      },
      dialogOfferedDefault: '{}',
      allCheckedData: false,
    }
  },
  computed:{
    allChecked(){
      let num = 0;
      this.items.forEach(item => {
        if(item.checked)
          num++
      })
      return !!(num && num == this.items.length)
    },
    isSelectItems(){
      let num = 0;
      this.items.forEach(item => {
        if(item.checked)
          num ++
      })
      return num;
    }
  },
  watch: {
    allChecked(){
      this.allCheckedData = this.allChecked
    },
    $route: "gotoPage",
  },
  mounted(){
    if (this.$route.params.id) {
      this.filterParams.idName = this.$route.params.customerName ? this.$route.params.customerName : '';
      this.filterParams.relationshipId = this.$route.params.id ? this.$route.params.id : '';
      this.selectArr = [{
        id: this.$route.params.id,
        customerName: this.$route.params.customerName
      }];
      this.filterParams.status = 1
      this.getItem();
      this.filterParams.status = '',
      this.filterParams.idName ='',
      this.filterParams.relationshipId = ''
    }else{
     this.$nextTick(() => {
      this.getItem();
    }); 
    }
    
    this.filterParamsDefault = JSON.stringify(this.filterParams)
    this.dialogOfferedDefault = JSON.stringify(this.dialogOffered)

    if(this.$route.query.filterParams != null) {
      this.filterParams.status = this.$route.query.filterParams.toString()
    }
    window.onresize = () => {
      // this.$getTableHeight(this);
    };
  },
  beforeDestroy() {
    window.onresize = () => {};
  },
  methods: {
    onCopy() {
      this.$elementMessage(this.$t('successfullyToClipboard'), "success");
    },
    onError() {
      this.$elementMessage(this.$t('failedToClipboard'), "error");
    },
    allChange(){
      this.items.forEach(item => {
        this.$set(item, 'checked', this.allCheckedData)
      });
    },
    canelEditSku(item){ //取消保存
      this.$set(item, 'editMode', false)
    },
    saveEditSku(item){ //保存
      this.$set(item, 'editLoading', true)
      this.$apiCall('api.OfferItems.changeSku', {id: item.id, sku: item.editSku}, r => {
        this.$set(item, 'editLoading', false)
        this.$set(item, 'editMode', false)
        if (r.ErrorCode == 9999) {
          this.$message({message: this.$t('products.SKU修改成功'), type: "success", offset: 60 });
          this.getItem(true);
        }else{
          this.$message({message: r.Message, type: "error", offset: 60 });
        }

      })
    },
    editSku(item){
      this.$set(item, 'editMode', true)
      this.$set(item, 'editSku', item.sku);
      this.$set(item, 'editLoading', false)
    },
    deleteItem(items){
      this.loading = true;
      this.$apiCall('api.OfferItems.delete', {items}, r => {
        if (r.ErrorCode == 9999) {
          this.$message({message: this.$t('products.商品删除成功'), type: "success", offset: 60 });
          this.getItem(true);
        }else{
          this.$message({message: r.Message, type: "error", offset: 60 });
        }
      });
    },
    deleteSingle(item){ //单个删除
      this.$confirm(this.$t('products.是否要删除这个商品?'), this.$t('products.删除'), {
        confirmButtonText: this.$t('products.删除'),
        cancelButtonText: this.$t('products.取消'),
        type: "error"
      }).then(()=>{
        this.deleteItem([{id: item.id}])
      })
    },
    deleteBat(){ //批量删除
      if(!this.isSelectItems){
        this.$message({ message:this.$t('products.请先选择商品'), type: "error", offset: 60 });
        return;
      }
      let items = [];
      this.items.forEach(item => {
        if(item.checked)
          items.push({id:item.id})
      })
      this.$confirm(this.$t('products.是否要删除选中的 {num} 个商品?',{num: items.length}), this.$t('products.删除'), {
        confirmButtonText: this.$t('products.删除'),
        cancelButtonText: this.$t('products.取消'),
        type: "error"
      }).then(()=>{
        this.deleteItem(items)
      })
    },
    saveOffered(){ //提交报价
      let num = 0;
      this.dialogOffered.items.forEach(item => {
        if(item.status == 1)
          num ++
      });
      if(!num){
        this.$message({ message: this.$t('products.没有尚未报价的商品'), type: "error", offset: 60  });
        return;
      }
      this.dialogOffered.loading = true;
      let items = [];
      let error = 0;
      this.dialogOffered.items.forEach(item => {
        if(item.status == "1"){
          items.push({
            id: item.id,
            sku: item.sku,
            price: item.price,
          })
          if(!item.sku || !item.price)
            error ++
        }
      });
      if(error){
        this.$message({ message: this.$t('products.SKU编号和供货价必须填写。供货价不能为零'), type: "error", offset: 60  });
        return
      }
      this.$apiCall('api.OfferItems.setOffered', {items}, r => {
         this.dialogOffered.loading = false;
        if (r.ErrorCode == 9999) {
          this.getItem(true);
          this.dialogOffered.isShow = false;
          this.$message({ message: this.$t('products.报价成功'), type: "success", offset: 60  });
        }else{
          this.$message({ message: r.Message, type: "error", offset: 60  });
        }
      })
    },
    setOfferedSingle(item){
      this.dialogOffered = JSON.parse(this.dialogOfferedDefault);
      this.dialogOffered.type = 2;
      this.dialogOffered.isShow = true;
      this.dialogOffered.items.push(JSON.parse(JSON.stringify(item)))
    },
    setOfferedBat(){ //批量设置
      if(!this.isSelectItems){
        this.$message({ message:this.$t('products.请先选择商品'), type: "error", offset: 60 });
        return;
      }
      this.dialogOffered = JSON.parse(this.dialogOfferedDefault);
      this.dialogOffered.isShow = true;
      this.items.forEach(item => {
        if(item.checked)
          this.dialogOffered.items.push(JSON.parse(JSON.stringify(item)))
      })

    },
    getRelationshipName(val){
      let t = '';
      this.selectArr.forEach(s=>{
        if(s.id == val){
          t = s.customerName
        }
      })
      return t;
    },
    clearFilter(type){
      // 清空筛选
      if(!type){
        this.selectArr = [];
        this.name = '';
        this.sku = '';
        this.filterParams = JSON.parse(this.filterParamsDefault)
      }
      if(type == 'relationshipId'){
        this.selectArr = [];
        this.filterParams.relationshipId = '';
      }
      if(type == 'name'){
        this.name = '';
        this.filterParams.name = '';
      }
      if(type == 'sku'){
        this.sku = '';
        this.filterParams.sku = '';
      }
      if(type == 'status')
        this.filterParams.status = '';
      if (this.$route.query.page == 1) {
        this.getItem();
      } else {
        this.$router.push({ query: { page: 1 } });
      }

    },
    filterGetItem(type){//筛选
      if(type == 'name')
        this.filterParams.name = this.name
      if(type == 'sku')
        this.filterParams.sku = this.sku
      if(type == 'all'){
        this.filterParams.name = this.name
        this.filterParams.sku = this.sku
      }
      if (this.$route.query.page == 1) {
        this.getItem();
      } else {
        this.$router.push({ query: { page: 1 } });
      }
    },
    getItem(s){
      this.loading = true;
      let params = {
        page: this.page,
        rowsPerPage: this.rowsPerPage,
        name: this.filterParams.name,
        relationshipId: this.filterParams.relationshipId,
        status: this.filterParams.status,
        sku: this.filterParams.sku,
      };
      this.$apiCall('api.OfferItems.findByVendor', params, r => {
        this.loading = false;
        if (r.ErrorCode == 9999) {
          this.items = [];
          r.Data.Results.forEach(item => {
            item.checked = false;
            item.editMode = false;
            item.editLoading = false;
            item.editSku = '';
            this.items.push(item)
          })
          this.total = Number(r.Data.Pagination.totalCount);
          this.totalPage = Number(r.Data.Pagination.totalPage);
          this.$nextTick(()=>{
            // this.$getTableHeight(this);
          });
          if (!s) this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
        }else{
          this.$message({ message: r.Message, type: "error" });
        }
      })

    },
    toPage(val) {
      if (val != this.$route.query.page)
        this.$router.push({ query: { page: val } });
    },
    changePageSize(val) {
      this.rowsPerPage = val;
      localStorage.setItem("productsRowsPerPage", val);
      this.getItem();
    },
    gotoPage() {
      this.page = this.$route.query.page ? this.$route.query.page : 1;
      this.getItem();
    },
    remoteMethodCustom(query){
      this.selectArr = [];
      //获取筛选客户
      if(!query)
        return;
      this.selectLoading = true;
      this.$apiCall('api.Relationship.findByVendor', {name: query}, r => {
        this.selectLoading = false;
        if (r.ErrorCode == 9999) {
          this.selectArr = r.Data.Results;
        }else{
          this.$message({ message: r.Message, type: "error" });
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.text-th{
  text-decoration: line-through;
}
.product-box {
  border: 1px #dcdfe6 solid;
  padding: 6px 15px;
  font-size: 12px;
  background-color: #fff;
  box-shadow: 0 0 6px #e0e0e0;
  .check-bg{
    position: absolute;
    top: 2px;
    left: 5px;
  }
  .name{
    margin-bottom: 5px;
  }
  .info-item{
    margin-bottom: 5px;
    display: flex;
    .title{
      margin-right: 5px;
      min-width: 85px;
      color: #909399;
    }
  }
}
.table-pro{
  display: flex;
  align-items: center;
}
</style>
