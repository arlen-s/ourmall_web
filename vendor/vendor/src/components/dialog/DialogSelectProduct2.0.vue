<template>
<div class="select-product">
    <el-dialog @open="open()" :visible.sync="data.isShow" :title="$t('storeSetting.选择商品')" 
    width="600px" :close-on-click-modal="false"
		:close-on-press-escape="false"
    @close="closeDialog"
    v-loading="data.loading"
    >
		<el-divider></el-divider>
        <div>
          <el-form :inline="true" size="mini" style="margin-bottom: 10px !important;">
          <el-form-item v-if="!up">
              <el-select v-model="filterData.status" style="width:120px" 
                  @change="filterGetItem('status')" :placeholder="$t('storeSetting.请选择')">
                    <el-option :label="$t('storeSetting.全部')" value=""></el-option>
                    <el-option :label="$t('storeSetting.上架')" value="1"></el-option>
                    <el-option :label="$t('storeSetting.下架')" value="2"></el-option>
                </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              @keyup.enter.native="filterGetItem()"
              @clear="clearFilter('name')"
              clearable
              size="mini"
              :placeholder="$t('goods.商品名称')"
              style="width: 160px"
              v-model="filterData.name"
            ></el-input>
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
        <el-divider></el-divider>
        <div class="action">
          <el-button type="primary" size="mini" @click="goToGoods">{{$t('storeSetting.管理商品')}}</el-button>
          <div class="refresh" @click="getItems">
            <i class="el-icon-refresh-right"></i>
            <span class="mg-l-5">{{$t('storeSetting.刷新')}}</span>  
          </div>
        </div>
        <el-divider></el-divider>
        
      <div>
      </div>
        <el-table v-if="(data.item && data.item.length)&& data.variableId == null" :data="data.item" stripe height="300px" ref="productTable"> 
        <el-table-column :label="''" width="60"> 
          <template slot-scope="scope">
            <el-radio
              v-if="scope.row.statusIpt"
              class="none-label"
              v-model="productData"
              :label="scope.row.id"
            >{{''}}</el-radio>
          </template>
        </el-table-column>
        <!-- 商品图片 -->
        <el-table-column :label="$t('goods.商品图片')" width="150">
          <template slot-scope="scope">
            <el-image style=" width: 60px; height: 60px; border: 1px solid #ddd; background-color: #fff;"
              :src="scope.row.imgUrl"
              :fit="'contain'"
              :scroll-container="'.main-scroll .el-scrollbar__wrap'"
              :preview-src-list="scope.row.imgUrlArr"
              
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
        <!-- 是否上架 -->
        <el-table-column :label="$t('storeSetting.状态')" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.statusIpt">{{$t('storeSetting.上架')}}</el-tag>
            <el-tag v-else type="success">{{$t('storeSetting.下架')}}</el-tag>
          </template> 
        </el-table-column>  
      </el-table>
    
      <div v-else-if="(data.item && data.item.length)&& data.variableId">
			<el-table class="no-hover" stripe :data="data.item" style="width: 100%" height="300px">
				<el-table-column  type="expand">
			　　　　<template slot-scope="scope">
			　　　　　　<el-table stripe :show-header="false" :data="scope.row.stocks" style="width: 100%">
						<el-table-column :label="$t('orders.select')" width="55">
					　　　　<template slot-scope="child">
					　　　　　　<el-radio v-model="tableRadio" :label="child.row.sku" @change="changeHandler(child.row.sku,scope.row)"><i></i></el-radio>
					　　　　</template>
					　　</el-table-column>
						<el-table-column :label="$t('orders.productinfo')">
							<template slot-scope="child">
								<div class="d-flex">
                    <el-image
                    style="width: 60px; height: 60px"
                    :src="child.row.propertyImage"
                    fit="cover"></el-image>
									<!-- <img :src="child.row.propertyImage" width="60" height="60" /> -->
									<div class="mg-l-20">
										<p>{{child.row.name}}</p>
										<p>SKU: {{child.row.sku}}</p>
									</div>
								</div>
							</template>
						</el-table-column>
					</el-table>
			　　　　</template>
			　　</el-table-column>
				<el-table-column :label="$t('orders.productinfo')">
					<template slot-scope="scope">
						<div class="d-flex">
							<img :src="scope.row.imgUrl" width="60" height="60" />
							<div class="mg-l-20">
								<p>{{scope.row.name}}</p>
								<p>SPU: {{scope.row.sku}}</p>
							</div>
						</div>
					</template>
				</el-table-column>
			</el-table>
      </div>
      <div class="no-data" v-else>
           <img src="../../../public/images/noData.png">
           <div>{{$t('storeSetting.暂无数据')}}，<span @click="goToGoods">{{$t('storeSetting.去添加商品')}}</span></div>
        </div>
      <div ref="tableFooter" style="margin:10px 0 20px">
        <el-row v-if="data.item && data.item.length" :gutter="20">
          <el-col :span="24" class="d-flex justify-content-center">
            <div>
              <el-pagination
                 small
                :current-page="Number(page)"
                :background="true"
                layout="sizes, total, prev, pager, next, jumper"
                :page-sizes="pageSize"
                :pager-count="Number(5)"
                :page-size="rowsPerPage"
                :total="Number(total)"
                @current-change="toPage"
                @size-change="changePageSize"
              >
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
		<el-divider></el-divider>
		<div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">{{$t('storeSetting.取消')}}</el-button>
			<el-button type="primary" @click="AddGoods" :disabled=" data.variableId ?!tableRadio : !productData">{{$t('storeSetting.添加')}}</el-button>
		</div>
	</el-dialog>
</div>
</template>

<script>
export default {
    props: ["data","up"],
    data() {
        return {
          host: location.host,
          productItem:{},
          productData:'',
          filterData:{
              name:'',
              status:''
          },
          showDialog: false,
          tableRadio: '',
          defaultFilterData: '{}',
          pageSize: [10, 20, 50, 100],
          page: this.$route.query.page ? Number(this.$route.query.page) : 1,
          rowsPerPage: localStorage.getItem(`${this.$route.name}RowsPerPage`)
            ? Number(localStorage.getItem(`${this.$route.name}RowsPerPage`))
            : 10,
          total: 0,
          totalPage: 0,
          loading:false
        };
    },
    mounted(){
      if(this.up){
        this.filterData.status = 1
      }
      this.getItems();
      this.defaultFilterData = JSON.stringify(this.filterData); 
    },
    watch: { 
       $route: "gotoPage", 
       'data.menuData': {
         deep: true,
         handler() {
           if(this.data.menuData.urlData){
             this.productData = this.data.menuData.urlData.id;
           }
         }
       }
    },
    methods: {
      open(){
            this.showDialog = this.data.isShow
            console.log(this.data.item, 'data.item');
      },
        getItems(){
            this.loading = true;
            this.$apiCall("api.VendorShop.vendorFindProducts", {
                page: this.page,
                rowsPerPage: this.rowsPerPage,
                name: this.filterData.name,
                status: this.filterData.status,
            }, r => {
              this.tableRadio = "";
                this.loading = false;
                if (r.ErrorCode == 9999) {
                this.data.item = r.Data.Results.products.map(e => {
                  e.imgUrlArr = JSON.parse(e.imgUrlJson);
                  e.statusIpt = e.status == '1';
                  return e;
                });
                  this.total = Number(r.Data.Pagination.totalCount);
                  this.totalPage = Number(r.Data.Pagination.totalPage);
                  if(this.$refs.productTable){
                    this.$refs.productTable.bodyWrapper.scrollTop = 0;
                  }
                  
                }else{
                this.$message({ message: r.Message, type: "error" });
                }
            })
        },
        changeHandler(value, item){
          this.productItem = item
            console.log(this.tableRadio, 'vcvsdf');
            console.log(item);
        },
       filterGetItem(){
         this.page = 1;
         this.productData = '';
         this.getItems();
         
       },
       clearFilter(type){
       switch(type){
         case 'name':
          this.filterData.name = '';
          break;
        default:
          this.filterData = JSON.parse(this.defaultFilterData);
      }
      if(type != 'none')
        this.toPage(1);
      },
      AddGoods(){
         if(!this.productItem) {
            this.$message({ message: '请选择一件商品', type: "error" });
            return
        } else{
          this.data.item.forEach(e => {
          if(e.id == this.productData){
            this.productItem = e
          }});
         if(this.data.type=='1'){
            this.$parent.addShopForm.mainProductId = this.productItem.id;
            this.$parent.addShopForm.imgUrl = this.productItem.imgUrl;
            this.$parent.addShopForm = {...this.$parent.addShopForm}
          }else{
            this.$parent.addShopForm.productId = this.productItem.id;
            this.$parent.addShopForm.imgUrlBuild = this.productItem.imgUrl;
            this.$parent.addShopForm.sku = this.tableRadio;
          this.$parent.setting = {...this.$parent.setting}
          }
          this.closeDialog();
        } 
      },
      goToGoods(){
        this.$router.push("/goods-mgr/all")
      },
      gotoPage() {
      this.page = this.$route.query.page ? this.$route.query.page : 1;
      this.$nextTick(()=>{
        this.getItems();
      })
    },
    toPage(val) {
      if (val != this.$route.query.page){
        this.$router.push({
          query: {
            page: val,
            cid:this.$route.query.cid,
            id:this.$route.query.id,
          },
        });
      }else{
        this.getItems();
      }
        
    },
    changePageSize(val) {
      this.rowsPerPage = val;
      localStorage.setItem(`${this.$route.name}RowsPerPage`, val);
      this.getItems();
    }, 
    closeDialog(){
      this.page = 1;
      // this.data.item = {};
      this.productData = '';
      this.productItem = {};
      this.tableRadio = '';
      this.filterData = JSON.parse(this.defaultFilterData);
      this.data.isShow = false;
    }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
  .action{
      margin: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .refresh{
          color: #346DFF;
          cursor: pointer;
      }
  }
  .select-product ::v-deep .el-dialog{
    margin-top: 60px !important;
  }
  .select-product ::v-deep .el-radio{
    margin-left: 15px !important;
  }
  .no-data{
    height: 280px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
    span{
      color: #346DFF;
      cursor: pointer;
    }
  }

</style>
