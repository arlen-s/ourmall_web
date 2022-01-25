<template>
  <div class="contentpanel role-management-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <h2>{{$t('shop.域名管理')}}</h2>
        </div>
      </div>
      <div class="right">
      </div>
    </div>
    <div class="pagebody" v-loading="loading">
      <el-row :gutter="15" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <el-row :gutter="20">
              <el-col :span="24">
                <div ref="pageFilter" class="page-filter">
                  <div class="main-name">
                    <div>
                        <div class="mg-b-20">{{$t('shop.主域名')}}</div>
                        <div>{{mainUrl||subDomain}}
                          <span v-if="!mainUrl">{{$t('shop.（OurMall提供）')}}</span></div>
                    </div>
                    <div>
                        <el-button type="primary" @click="changeMain">
                          {{$t('shop.更改主域名')}}
                        </el-button>
                    </div>
                  </div>
                  <div class="pagetitle" ref="pageHeader">
                    <div class="left">
                        <div class="title">
                        <h2>{{$t('shop.多域名管理')}}</h2>
                        </div>
                    </div>
                    <div class="right">
                        <el-button type="primary" @click="addDomain">
                          {{$t('shop.添加域名')}}
                        </el-button>
                    </div>
                    </div>
                  <el-table
                    :data="items"
                    stripe
                    row-key="id"
                    style="width: 100%"
                    ref="gridTable2"
                  >
                    <el-table-column :label="$t('shop.域名')" prop="url">
                    </el-table-column>
                    <!-- <el-table-column label="状态" prop="status">
                    </el-table-column> -->
                    <el-table-column :label="$t('shop.操作')" width="100px">
                      <template slot-scope="scope">
                        <el-link  type="primary" @click="delDomain(scope.row)">
                          {{$t('shop.删除')}}
                        </el-link>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row v-if="items.length" :gutter="20">
        <el-col :span="24" class="d-flex justify-content-center">
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
    </div>
    <el-dialog :visible.sync="visibleDomain" :width="'400px'" @close="closeSelectAssign">
			<div class="tx-center dialog-content" style="padding:20px">
				<template v-if="visibleDomain">
					<el-select class="mg-r-15" remote :placeholder="$t('shop.请选择域名')" v-model="changeUrl"
						>
						<el-option v-for="(opt,i) in allItems" :key="i" :label="opt.url"
							:value="opt.url"></el-option>
					</el-select>
				</template>
			</div>
			<div slot="footer">
				<el-button @click="closeSelectAssign">{{$t('shop.取消')}}</el-button>
				<el-button type="primary" @click="changeMainDomain">{{$t('shop.确定')}}</el-button>
			</div>
		</el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainUrl:'',
      oldUrl:'',
      name:'',
      changeUrl:'',
      visibleDomain:false,
      subDomain:'',
      loading: false,
      items: [],
      allItems:[],
      pageSizes: [10, 20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("myDomainPerPage")
        ? Number(localStorage.getItem("myDomainPerPage"))
        : 10,
      total: 0,
      totalPage: 0,
    };
  },
  watch: { 
    $route: "gotoPage",
  },
  mounted() {
      this.getItems()
  },
  methods: {
    closeSelectAssign(){
      this.visibleDomain = false;
      this.allItems = [];
    },
    getVonders(){
      this.$apiCall('api.VendorShop.getByVendor',{},r=>{
        if(r.ErrorCode == 9999){
          let data = r.Data.Results;
          this.name = data.name;
          this.mainUrl = data.url;
          this.oldUrl = this.subDomain = window.location.host.indexOf("sandbox") >= 0 ? `sandbox${data.name}.myourmall.com`:`${data.name}.myourmall.com`;
          if(this.subDomain){
             this.subDomain = window.location.host.indexOf("sandbox") >= 0 ? `sandbox${data.subDomain}.myourmall.com`:`${data.subDomain}.myourmall.com`;
          }else{
             this.subDomain = this.oldUrl;
          }
        }
      })
    },
    toPage(val) {
      if (val != this.$route.query.page)
        this.$router.push({ query: { page: val } });
    },
    changePageSize(val) {
      this.rowsPerPage = val;
      localStorage.setItem("myDomainPerPage", val);
      this.getItems();
    },
    gotoPage() {
      this.page = this.$route.query.page ? this.$route.query.page : 1;
      this.getItems();
    },
    getAllItems(){
       this.$apiCall('api.VendorShop.getShopUrlList',{},r=>{
         if(r.ErrorCode == 9999){
           this.allItems = r.Data.Results;
           this.allItems.push({
             url:this.oldUrl,
           })
         }
       })
    },
    getItems(s){
        this.loading = true;
        this.$apiCall('api.VendorShop.getShopUrlList',{
          page: this.page,
          rowsPerPage: this.rowsPerPage,
        },r=>{
            this.loading = false;
            if(r.ErrorCode == 9999){
                this.items = r.Data.Results;
                this.getVonders();
                this.total = Number(r.Data.Pagination.totalCount);
                this.totalPage = Number(r.Data.Pagination.totalPage);
                if (!s) this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
            }
        })
    },
    addDomain(){
      this.$router.push('/add-domain')
    },
    delDomain(i){
       this.$confirm(this.$t('shop.确定删除该域名？'), this.$t('products.删除'), {
        confirmButtonText: this.$t('products.删除'),
        cancelButtonText: this.$t('products.取消'),
        type: "warning"
      }).then(()=>{
        this.$apiCall('api.VendorShop.deleteShopUrl',{
        id:i.id
        },r=>{
          if(r.ErrorCode == 9999){
            this.getItems();
            this.$message({ message: this.$t('shop.删除成功'), type: "success" });
          }else{
            this.$message({ message: r.Message, type: "error" }); 
          }
        })
      })
    },
    changeMain(){
      this.getAllItems();
      this.visibleDomain = true;
    },
    changeMainDomain(){
         this.$apiCall('api.VendorShop.changeShopUrl',{
           url:this.changeUrl,
           setDefault:this.changeUrl == this.oldUrl?'1':undefined
         },r=>{
           if(r.ErrorCode == 9999){
            this.getVonders();
            this.visibleDomain = false;
            this.$message({ message: this.$t('shop.更换成功'), type: "success" });
          }else{
            this.$message({ message: r.Message, type: "error" }); 
          }
         })
    }
  },
  components: {},
};
</script>

<style scoped lang="scss">
.main-name{
    display: flex;
    align-items: center;
    padding: 20px;
    justify-content: space-between;
    height: 120px;
    margin: 30px 0 50px;
    border: 1px #EBEEF5 solid;
    font-size: 18px;
}
</style>
