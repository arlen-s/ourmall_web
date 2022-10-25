<template>
  <!-- https://lanhuapp.com/url/txFd8 -->
  <div class="goods-list-page">
    <div ref="tablefilter">
      <div ref="pageFilter" class="page-filter" style="border-bottom: none">
        <el-form :inline="true" size="mini">
          <el-form-item>
            <el-input
              @keyup.enter.native="filterGetItem()"
              @clear="clearFilter('name')"
              clearable
              size="mini"
              :placeholder="$t('goods.商品名称')"
              style="width: 160px"
              v-model="filterData.nameIpt"
            >
            </el-input>
          </el-form-item>
		  <el-form-item>
		    <el-input
		      @keyup.enter.native="filterGetItem()"
		      @clear="clearFilter('sku')"
		      clearable
		      size="mini"
		      placeholder="sku"
		      style="width: 160px"
		      v-model="filterData.sku"
		    >
		    </el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-input
		      @keyup.enter.native="filterGetItem()"
		      @clear="clearFilter('spu')"
		      clearable
		      size="mini"
		      placeholder="spu"
		      style="width: 160px"
		      v-model="filterData.spu"
		    >
		    </el-input>
		  </el-form-item>
          <el-cascader
            class=" mg-r-15"
            ref="cascaderHandle"
            :options="categroyArr"
            :props="{ expandTrigger: 'hover', checkStrictly: true }"
            :placeholder="$t('goods.商品分类')"
            size="mini"
            filterable
            clearable
            :show-all-levels="false"
            v-model="filterData.categroyPath"
            @change="changeCategory"
          >
            <span slot-scope="{data}" @click="clickNode">{{ data.label }}</span>
          </el-cascader>
           <el-form-item :label="$t('goods.商品金额：')" style=" padding-left: 0">
             <el-input-number  :min="0" :precision="2" :controls="false" :placeholder="$t('goods.最小')" style="width: 80px;" v-model="filterData.costFromIpt"></el-input-number>
           </el-form-item>
           <span class=" mg-r-10">-</span>
           <el-form-item style=" margin-right: 20px;">
             <el-input-number  :min="0" :precision="2" :controls="false" :placeholder="$t('goods.最大')" style="width: 80px;" v-model="filterData.costToIpt"></el-input-number>
           </el-form-item>
           <el-form-item style="margin-right: 25px;">  
              <el-select  :placeholder="$t('goods.请选择 - 商品类型')" v-model="filterData.productType" @change="filterGetItem('productType')">
                <el-option v-for="type in productTypeArr" :key="type.value" :label="$t(type.label)" :value="type.value">
                </el-option>
              </el-select>
           </el-form-item>
           <el-form-item style="margin-bottom: 0">
            <el-button type="primary" @click="filterGetItem()">{{
              $t("myinvoice.filter")
            }}</el-button>
            <el-button type="danger" @click="clearFilter()">{{
              $t("goods.重置")
            }}</el-button>
          </el-form-item>
        </el-form>  
      </div>
      <!-- 以筛选条件 -->
      <div class="mg-b-10">
        <!-- 商品名称tags -->
        <el-tag
          v-if="filterData.name"
          size="small"
          type="info"
          closable
          @close="clearFilter('name')"
          class="mg-r-5"
          >{{$t("goods.商品名称：")}}<b style=" color: #5c6ac4;">{{ filterData.name }}</b>
        </el-tag>
        <!-- 分类tags -->
        <el-tag
          v-if="filterData.categoryId"
          size="small"
          type="info"
          closable
          @close="clearFilter('categoryId')"
          class="mg-r-5"
          >{{$t("goods.商品分类：")}}<b style=" color: #5c6ac4;">{{ showCategroyText(filterData.categoryId) }}</b>
        </el-tag>
        <!-- 金额tags -->
        <el-tag
          v-if="filterData.costFrom || filterData.costTo"
          size="small"
          type="info"
          closable
          @close="clearFilter('cost')"
          class="mg-r-5"
          >{{$t("goods.商品金额：")}}<b style=" color: #5c6ac4;">{{ filterData.costFrom ? Number(filterData.costFrom).toFixed(2) : 'min' }} - {{ filterData.costTo ? Number(filterData.costTo).toFixed(2):'max' }}</b>
        </el-tag>
        <el-tag v-if="filterData.productType"
          size="small"
          type="info"
          closable
          @close="clearFilter('productType')"
          class="mg-r-5"
        >
          {{$t("goods.商品类型: ")}}<b style=" color: #5c6ac4;">{{showProductType(filterData.productType)}}</b>
        </el-tag>
      </div>  
    </div>
    <div class="table-wrap" style="border-top: 1px #ebeef5 solid; padding-top: 5px;">
      <div v-if="items.length" class="table-action">
        <div class=" mg-r-15">
          <el-checkbox v-model="isAllCheck" @change="changeAllCheckbox"> <span style=" color:#606266; font-size: 12px;">{{$t("goods.全选/全不选")}} ({{checkboxArr.length}})</span></el-checkbox>
        </div>
        <div>
          <el-button type="primary" size="mini" @click="confirmShelvesAll(true)"  :disabled="!$isRole($route.meta.roleWrite) || !checkboxArr.length">{{$t("goods.批量上架")}}</el-button>
          <el-button type="info" plain size="mini" @click="confirmShelvesAll(false)" :disabled="!$isRole($route.meta.roleWrite) || !checkboxArr.length">{{$t("goods.批量下架")}}</el-button>
          <el-button type="danger" size="mini" @click="delSelected" :disabled="!$isRole($route.meta.roleWrite) || !checkboxArr.length">{{$t("goods.删除")}}</el-button>
          <el-button type="primary" size="mini" @click="openChangeCategory" :disabled="!$isRole($route.meta.roleWrite) || !checkboxArr.length">
            {{$t("goods.批量修改类目")}}
          </el-button> 
        </div>
      </div>
      <el-table v-if="items.length || loading" :data="items" stripe ref="gridTable">
        <el-table-column :label="''" width="40">
          <template slot-scope="scope">
            <el-checkbox
              class="none-label"
              v-model="checkboxArr"
              :label="scope.row.id"
            ></el-checkbox>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column :label="$t('goods.操作')" width="100">
          <template slot-scope="scope">
            <el-link type="primary" style="font-size: 12px;" @click="gotoEdit(scope.row.id)">{{$t('goods.编辑')}}</el-link>
            <template v-if="scope.row.status == '1'">
              <br>
              
                <el-link type="primary" v-if="vendorId != 148982 && vendorId != 146428&& vendorId != 144875&& vendorId != 144843&& vendorId != 143779&& vendorId != 143654&& vendorId != 74" style="font-size: 12px;" :href="`//${host.indexOf('sandbox') > -1 ? 'sandboxshop' : 'shop'}${scope.row.shopId}.myourmall.com/item/${scope.row.id}/${scope.row.name}.html`" target="_blank">
                {{$t('goods.预览')}}
              </el-link>
              <el-link type="primary" v-else style="font-size: 12px;" :href="`//${host.indexOf('sandbox') > -1 ? 'sandboxshop' : 'shop'}${scope.row.shopId}.myourmall.com/itemOld/${scope.row.id}/${scope.row.name}.html`" target="_blank">
                {{$t('goods.预览')}}
              </el-link>

            </template>
            <br/>
             <el-link type="primary" style="font-size: 12px;" @click="lookLog(scope.row.id)">{{$t('goods.日志')}}</el-link>
          </template>
        </el-table-column>
        <!-- 商品图片 -->
        <el-table-column :label="$t('goods.商品图片')" width="150">
          <template slot-scope="scope">
            <el-image style=" width: 80px; height: 80px; border: 1px solid #ddd; background-color: #fff;"
              :src="scope.row.imgUrl"
              :fit="'contain'"
              :scroll-container="'.main-scroll .el-scrollbar__wrap'"
              :preview-src-list="scope.row.imgUrlArr"
              lazy
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <!-- 商品名称 -->
        <el-table-column :label="$t('goods.商品名称')">
          <template slot-scope="scope">
            <p class=" tx-ellipsis3" style=" line-height: 22px;">{{scope.row.name}}</p>
          </template>
        </el-table-column>  
        <!-- 商品价格 -->
        <!-- <el-table-column :label="$t('goods.商品价格(USD)')" width="150">
          <template slot-scope="scope">
            <b>{{scope.row.cost}}</b>
          </template>  
        </el-table-column> -->
        <!-- 商品分类 -->
        <!-- <el-table-column :label="$t('goods.商品分类')" width="150">
          <template slot-scope="scope">
            <p class=" tx-ellipsis3" style=" line-height: 22px;">{{showCategroyText(scope.row.categoryId)}}</p>
          </template>
        </el-table-column> -->
        <!-- 库存 -->
        <!-- <el-table-column :label="$t('goods.库存')" width="90">
           <template slot-scope="scope">
            {{ scope.row.allInventory || typeof scope.row.allInventory === 'number' ? scope.row.allInventory : '-' }}
          </template> 
        </el-table-column>   -->
		<el-table-column :label="$t('goods.可见范围')">
		   <template slot-scope="scope">
			   <div v-if="scope.row.isAllVisible">{{$t('goods.全部可见')}}</div>
			   <el-link type="primary" :underline="false" v-else @click="openVisiableCus(scope.row.id)">{{$t('goods.指定客户可见')}}</el-link>
		  </template> 
		</el-table-column>
        <!-- 上架时间 -->
        <el-table-column :label="`${$t('goods.创建时间')}/ ${$t('修改时间')}`" width="180">
          <template slot-scope="scope">
            <p>{{scope.row.timeCreated}}</p>
            <p>{{scope.row.timeLastGet}}</p>
          </template> 
        </el-table-column>      
        <!-- 是否上架 -->
        <el-table-column :label="$t('goods.是否上架')" width="180">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.statusIpt" @change="confirmShelves(scope.row)" :disabled="!$isRole($route.meta.roleWrite)"></el-switch>
          </template> 
        </el-table-column>  
      </el-table>
      <div v-else>
        <!-- 一个商品都没有创建才显示 -->
        <div v-if="$route.name == 'GoodsMgrAll' && !filterData.categoryId && !filterData.name && !filterData.costFrom && !filterData.costTo && !filterData.productType" class="none-goods">
          <div class="i"></div>
          <p class="p1">{{$t('goods.新建并上架你的商品')}}</p>
          <p class="p2">{{$t('goods.新建并上架你的第一件商品，上架完你的优质商品后，用户才可以在你的网站上进行购物。')}}</p>
          <div class="action">
            <el-button type="primary" size="small" @click="goto('AddGoods')" :disabled="!$isRole($route.meta.roleWrite)">{{$t('goods.新建商品')}}</el-button>
          </div>
        </div>
        <div v-else class="none-goods"> 
          <p style=" color: #909399;">{{$t('goods.暂无商品')}}</p>
        </div>
      </div>
    </div>
    <el-dialog
  :title="$t('goods.商品日志')"
  width="35%"
   :visible.sync="dialogVisibleLog"
  >
  <el-card class="box-card">
        <el-table
    :data="tableLogData"
    border
    style="width: 100%">
    <el-table-column
      prop="userName"
      :label="$t('goods.操作者')"
      width="180">
    </el-table-column>
    <el-table-column
      prop="content"
      :label="$t('goods.操作描述')"
      >
    </el-table-column>
    <el-table-column
      prop="timeCreated"
      :label="$t('goods.操作时间')">
    </el-table-column>
  </el-table>
</el-card>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisibleLog = false">{{$t('goods.确定')}}</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default { 
  props: ["loading", "items", "categroyArr", "filterData", ],
  data(){
    return {
      host: location.host,
      isAllCheck: false,
      checkboxArr: [],
      productTypeArr: this.$dict.productTypeArr,
      vendorId: localStorage.getItem('vendorId'),
      showLog: false,
      dialogVisibleLog: false,
        tableLogData: []      
    }  
  },
  watch: {
    checkboxArr(){
      this.isAllCheck = this.items.length && this.items.length == this.checkboxArr.length;
    }
  },
  methods: {
	  openVisiableCus(id){
	  		  this.$emit('openVisiableCus',id);
	  },
    openChangeCategory(){
      //打开批量改分类
      this.$emit('openChangeCategory', this.checkboxArr)
    },
    showProductType(id){
      let text = '';
      this.$dict.productTypeArr.forEach( e => {
        if(e.value == id){
          text = e.label;
        }
      })
      return this.$t(text);
    },
    lookLog(id){
        this.dialogVisibleLog = true
        							this.$apiCall("api.ProductLog.finds", {productId: id}, r => {
								if (r.ErrorCode == 9999) {
                    this.tableLogData = r.Data.Results
								}
							})
    },
    gotoEdit(id){ //跳转到
      if (  this.vendorId != '148982'&& this.vendorId != '146428'&& this.vendorId != '144875'&& this.vendorId != '144843'&& this.vendorId != '143779'&& this.vendorId != '143654'&& this.vendorId != '74') {
      this.$router.push({name: 'AddGoods2', query: {id}})
      }else{
      this.$router.push({name: 'AddGoods', query: {id}})
      }

    },
    filterGetItem(){
      this.$emit('filterGetItem');
    },
    clearFilter(type){
      this.$emit('clearFilter', type)
    },
    delSelected(){ //删除 批量
      if(!this.checkboxArr.length){
        this.$message({ message: this.$t('goods.请先选择一个要操作的商品'), type: "error" });
        return;
      }
      this.$confirm( this.$t('goods.确定要删除选中的{len}个商品吗？', {len: this.checkboxArr.length}), {
        confirmButtonText: this.$t('goods.删除'),
        cancelButtonText: this.$t('goods.取消'),
        confirmButtonClass: 'el-button--danger',
        type: 'warning',
      }).then(()=>{
        this.$emit('delSelected', this.checkboxArr)
      }).catch();
    },
    confirmShelvesAll(status){ //批量上下架
      if(!this.checkboxArr.length){
        this.$message({ message: this.$t('goods.请先选择一个要操作的商品'), type: "error" });
        return;
      }
      this.$confirm(
        this.$t('goods.确定要{s1}选中的商品吗？ 选中的商品将{s2}展示在您的网站上。', {s1: status ? this.$t('goods.上架'): this.$t('goods.下架'), s2: status ? '' : this.$t('goods.不再')}),
        {
        confirmButtonText: this.$t('goods.确定'),
        cancelButtonText: this.$t('goods.取消'),
        type: 'warning'
      }).then(()=>{
        this.$emit('changeStatusAll', this.checkboxArr, status)
      }).catch();
    },
    confirmShelves(item){ 
      this.$confirm(this.$t('goods.已{s1}的商品将{s2}展示在您的网站上?, 是否{s1}', {s1: item.statusIpt ? this.$t('goods.上架'): this.$t('goods.下架'), s2: item.statusIpt ? '' : this.$t('goods.不再')}), {
        confirmButtonText: this.$t('goods.确定'),
        cancelButtonText: this.$t('goods.取消'),
        type: 'warning'
      }).then(()=>{
        this.$emit('changeStatus', item)
      }).catch(()=>{
        item.statusIpt = !item.statusIpt
      })
    },
    changeAllCheckbox(val){ //全选全不选
      if(val){
        this.checkboxArr = this.items.map(item => item.id) 
      }else{
        this.checkboxArr = [];
      }
    },
    showCategroyText(id){ //id转换成 分类名称
      if(id){
        let txt = '';
        this.categroyArr.forEach(e => {
          if(e.id == id)
            txt = e.label;
          if(e.children && e.children.length){
            e.children.forEach(e2 => {
              if(e2.id == id)
                txt = e2.label;
              if(e2.children && e2.children.length){
                e2.children.forEach(e3 => {
                  if(e3.id == id)
                    txt = e3.label
                })
              }  
            })
          }  
        })
        return txt || '???'
      }else{
        return '--'
      }
    },
    
    clickNode($event){
      $event.target.parentElement.parentElement.firstElementChild.click();
    },
    changeCategory(){
      this.$refs.cascaderHandle.dropDownVisible = false; //监听值发生变化就关闭它
      if(this.filterData.categroyPath.length){
        this.filterGetItem();
      }else{
        this.clearFilter('categoryId');
      }
      
    },
    goto(name){
      this.$emit('goto', name)
    },
  }
}
</script>

<style lang="scss">
.goods-list-page{
  .el-cascader-panel{
    .el-input__suffix{
      top: 2px;
    }
  }
}
</style>
<style lang="scss" scoped>
.table-action{
  display: flex;
  align-items: center;
}
.none-goods{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 30px;
  .i{
    margin-bottom: 30px;
    width: 259px;
    height: 178px;
    background-image: url('../../../public/images/none-goods.png');
    background-size: 100%;
  }
  .p1{
    margin-bottom: 10px;
    color: #5c6ac4;
    font-size: 16px;
  }
  .p2{
    margin-bottom: 15px;
    color: #909399;
  }
}
.el-image{
  .el-icon-picture-outline{
    color: #C0C4CC;
    font-size: 18px;
  }
}

</style>