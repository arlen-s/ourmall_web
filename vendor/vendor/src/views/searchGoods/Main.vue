<template>
  <div class="contentpanel goods-mgr-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="iconfont icon-xunjia"></i>
          <h2>{{$t('app.搜品管理')}}</h2> 
        </div>
      </div> 
      <div class="right">
          <div v-if="!$store.state.userInfo.subUserId">
            <template v-if="($route.name == 'SGAssign' && isOpenAssign)||($route.name == 'SGQuotation' && !isOpenAssign)">
              <el-button type="primary" size="small" @click="changeAssign('close')" v-if="isOpenAssign">{{$t('quotation.关闭分配')}}</el-button>
              <el-button type="primary" size="small" @click="changeAssign('open')" v-else>{{$t('quotation.开启分配')}}</el-button>
            </template>
          </div>
           
        
      </div>
    </div>
    <div v-loading="loading" class="pagebody"> 
      <el-card >
        <el-row>
          <!-- <el-col :span="24" ref="pageTabs">
          <template v-if="$route.name != 'SGSearch'">
            <el-tabs
              v-model="activeName"
              @tab-click="handleClick"
            >
              <el-tab-pane
               v-if="(($route.name == 'SGAssign'||$route.name=='SGQuotation') && isOpenAssign) || $route.name == 'SGFinish'||$route.name=='SGNone'"
                :name="($route.name == 'SGAssign'||$route.name=='SGQuotation') ?'SGAssign':'SGFinish'"
              >
              <span slot="label">
                {{($route.name == 'SGAssign'||$route.name=='SGQuotation') ?'待分配':'完成搜品'}}
                <span class="tx-danger" v-if="($route.name == 'SGAssign'||$route.name=='SGQuotation')">({{waitDistributeNum}})</span>
              </span>
              </el-tab-pane>
              <el-tab-pane
                :name="($route.name == 'SGAssign'||$route.name=='SGQuotation') ?'SGQuotation':'SGNone'"
              >
              <span slot="label">
                {{($route.name == 'SGAssign'||$route.name=='SGQuotation') ?'待报价':'无法报价'}}
                <span class="tx-danger" v-if="($route.name == 'SGAssign'||$route.name=='SGQuotation')">({{distributedNum}})</span>
              </span>
              </el-tab-pane>
            </el-tabs>
           </template>
          </el-col> -->
          <el-col :span="24">
            <Sub
              :key="pageKey"
              ref="subPage"
              :loading="loading"
              :items="items"
              :filterData="filterData"
              @filterGetItem="filterGetItem"
              @clearFilter="clearFilter"
              @assign="assign"
            />  

            <!-- 底部分页 -->
            <div ref="tableFooter">
              <el-row v-if="items.length" :gutter="20">
                <el-col :span="24" class="d-flex justify-content-center">
                  <div style="position: relative; top: 10px">
                    <el-pagination
                      :current-page="Number(page)"
                      :background="true"
                      layout="sizes, total, prev, pager, next, jumper"
                      :page-sizes="pageSize"
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
          </el-col>
        </el-row>  
      </el-card>
    </div> 
    <el-dialog  
      :visible.sync="assignDialog" :width="'500px'">
			<div class="tx-center dialog-content" style="padding:20px">
				{{isOpenAssign ? $t('quotation.是否确定关闭分配功能？确定后搜品请求直接在待报价状态') : $t('quotation.是否确定开启分配功能？确定后搜品请求需求分配后才能操作')}}
			</div>
			<div slot="footer" class="dialog-footer d-flex justify-content-center">
				<el-button @click="assignDialog = false">{{$t('quotation.取消')}}</el-button>
				<el-button type="primary" @click="closeAssign()">{{$t('quotation.确定')}}</el-button>
			</div>
		</el-dialog>
    <el-dialog  
      :visible.sync="selectAssignDialog" :width="'500px'" @close="closeSelectAssign">
			<div class="tx-center dialog-content" style="padding:20px">
        <el-form>
          <el-form-item :label="$t('quotation.请选择角色')">
            <el-select 
              style="width:320px"
              @change="staffChange"
              filterable 
              v-model="form.roleId">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('quotation.请选择人员')">
             <el-select 
              :disabled="!isSetect"
              style="width:320px"
              filterable 
              v-model="form.staff">
              <el-option
                v-for="item in staffList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
			</div>
			<div slot="footer" >
				<el-button @click="closeSelectAssign">{{$t('quotation.取消')}}</el-button>
				<el-button type="primary" @click="assignStaff()">{{$t('quotation.分配')}}</el-button>
			</div>
		</el-dialog>
  </div>  
</template>

<script>
import Sub from './Sub.vue';
export default {
  data(){
    return {
      distributedNum:0,//待报价数量
      waitDistributeNum:0,//待分配数量
      offerProductDistribute:2,//1关闭2开启
      form:{  
         staff:'',
         idList:[],
      },
      roleList:[],
      staffList:[],
      isSetect:false,
      status:'',
      statusIn:'',
      waitDistribute:'', // 待分配传1待报价传2
      assignDialog:false,
      selectAssignDialog:false,
      isOpenAssign:false,
      loading: false,
      pageKey: new Date().valueOf(),
      activeName: "",
      pageSize: [10, 20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem(`${this.$route.name}RowsPerPage`)
        ? Number(localStorage.getItem(`${this.$route.name}RowsPerPage`))
        : 10,
      items: [],
      total: 0,
      totalPage: 0,
      productTypeArr: this.$dict.productTypeArr,
      filterData: {
        name: '',
        nameIpt: '',
        date:[],
        dateFrom: "",
	     	dateTo: "",
        subUserId:'',
        subUserIdCompleted:'',
        type:''
      },
      defaultFilterData: '{}',
    }
  },
  components: {
    Sub
  },
  computed: {
      
  },
  watch: { 
    $route: "gotoPage", 
  },
  mounted(){
      this.defaultFilterData = JSON.stringify(this.filterData);
          //判断开启or关闭分配
          if(this.$store.state.userInfo.offerProductDistribute && this.$store.state.userInfo.offerProductDistribute == 1){
            this.isOpenAssign = true;
          }else{
            this.isOpenAssign = false;
          }
          this.activeName = this.$route.name; 
          this.changeStatus();
          this.getRole();
          this.getNum()
    },
  methods: {
    // 获取商品数量
    getNum(){
      this.$apiCall('api.OfferProduct.getVendorAllOfferProductCnt',{
          waitDistribute:this.isOpenAssign?'1':'2'
        },r=>{
        if(r.ErrorCode == 9999){
          this.waitDistributeNum = r.Data.Results.waitDistributeNum?r.Data.Results.waitDistributeNum:0;
          this.distributedNum = r.Data.Results.distributedNum?r.Data.Results.distributedNum:0;
        }else{
          this.$message({ message: r.Message, type: "error" });
        }
      })
    },
    //分配
    assignStaff(){
      this.$apiCall('api.OfferProduct.distributeSubUser',{
        idList:this.form.idList,
        subUserId:this.form.staff
        },r=>{
          if(r.ErrorCode == 9999){
            this.closeSelectAssign();
            this.getItems();
            this.getNum();
            this.$message({ message: this.$t('shop.分配成功'), type: "success" });
          }else{
            this.$message({ message: r.Message, type: "error" });
          }
        })
    },
    // 关闭分配弹层
    closeSelectAssign(){
      this.selectAssignDialog = false;
      this.form = {roleId:'' , staff:'',idList:[]};
      this.isSetect = false
    },
    //匹配员工
    staffChange(){
      this.form.staff = '';
      this.isSetect = true;
      this.$apiCall('api.SubUser.findByUser',{
         page: this.page,
         //  TODO 原来根据外边分页筛选数量来选择 现在改为固定的
         rowsPerPage: 100,
         roleId:this.form.roleId,
       },r=>{
         if(r.ErrorCode == 9999){
           this.staffList = r.Data.Results;
         }else{
           this.$message({message: r.Message, type: "error"});
         }
       })
    },
    //获取角色权限列表
    getRole(){
      this.$apiCall("api.UserRole.findByUser", {}, (r) => {
        if (r.ErrorCode == 9999) {
          this.roleList = r.Data.Results;
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      });
    },
    assign(i){
      this.form.idList = i;
      this.selectAssignDialog = true;
      
    },
    changeStatus(){
     switch (this.$route.name) {
					case "SGAssign":
						this.status = 1;
            this.waitDistribute = 1;
						break;
					case "SGQuotation":
						this.status = 1;
            this.waitDistribute = 2;
						break;
					case "SGFinish":
            this.status = 2;
            this.waitDistribute = '';
						break;
					case "SGNone":
            this.status = 9;
            this.waitDistribute = '';
						break;
					case "SGSearch":
            this.status = '';
            this.waitDistribute = '';
						break;
				}
        this.getItems();
    },
    changeAssign(i){
      if(i=='open'){
        this.offerProductDistribute = 1
      }else{
        this.offerProductDistribute = 2
      }
      this.assignDialog = true;
    },
    closeAssign(){
          this.$apiCall("api.OfferProduct.changeUserDistributed",{
            offerProductDistribute:this.offerProductDistribute
          },r=>{
            if(r.ErrorCode == 9999){
              this.assignDialog = false;
              this.isOpenAssign = !this.isOpenAssign;
              this.$store.state.userInfo.offerProductDistribute = this.offerProductDistribute;
              if(this.offerProductDistribute == 2){
                this.$router.push({name:'SGQuotation'})
              }
              this.getNum();
               this.$message({message: this.offerProductDistribute == 1 ? this.$t('quotation.开启成功') : this.$t('quotation.关闭成功'), type: "success"});
            }else{
              this.$message({message: r.Message, type: "error"});
            }
          })
          
        },
    getItems(s){
      this.loading = true;
      let params = {
        subUserIdCompleted:this.filterData.subUserIdCompleted,
        statusIn:this.statusIn,
        status:this.status,
        waitDistribute:this.waitDistribute,
        nameLike:this.filterData.name,
        subUserId:this.filterData.subUserId,
        timeCreatedFrom:this.filterData.dateFrom,
        timeCreatedTo:this.filterData.dateTo,
        page: this.page,
        rowsPerPage: this.rowsPerPage,
      };
      if(this.$route.name == 'SGSearch'){
        params.isManageList = 1
      }
      this.$apiCall("api.OfferProduct.findByVendor", params, r => {
        this.loading = false;
        if (r.ErrorCode == 9999){
          //处理数据
          this.items = r.Data.Results.map(item => {
            item.imgUrlArr = item.imgUrlJson == '[]'? []: item.imgUrlJson;
            if(item.vendorProduct )
            item.vendorProduct.imgUrlArr = JSON.parse(item.vendorProduct.imgUrlJson)
            return item
          });
          this.total = Number(r.Data.Pagination.totalCount);
          this.totalPage = Number(r.Data.Pagination.totalPage);
          if (!s) this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
        }else{
          this.$message({ message: r.Message, type: "error" });
        }
      })
      },
    handleClick(tab){
      if (tab.name == this.$route.name) {
        //点击相同路由刷新
        this.pageKey = new Date().valueOf();
      }else{
        //tabs 切换
        this.clearFilter('none');
        this.$refs.subPage.checkboxArr = [];
        this.$router.push({ name: tab.name });
      }
    },
    filterGetItem(){
      if(this.filterData.type == 1){
          this.statusIn = '';
          this.status = this.filterData.type
      }else if(this.filterData.type == 2){
        this.status = '';
        this.statusIn = '2,9'
      }
      this.page = 1;
      this.getItems();
    },
    clearFilter(type){
      switch(type){
        case 'name':
          this.filterData.nameIpt = this.filterData.name = '';
          break;
        case 'date':
          this.filterData.date = [];
          this.filterData.dateFrom = this.filterData.dateTo = '';
          break;
        case 'subUserId':
          this.filterData.subUserId = '';
          break;
        case 'subUserIdCompleted':
          this.filterData.subUserIdCompleted = '';
          break;
        case 'status':
          this.filterData.type = this.status = '';
          this.statusIn = ''
          break;
        default:
          if(this.$route.name == 'SGSearch'){
            this.status = '';
          }
          this.statusIn = '';
          this.filterData = JSON.parse(this.defaultFilterData);
      }
      if(type != 'none')
        this.toPage(1);
    },
    gotoPage() {
      this.page = this.$route.query.page ? this.$route.query.page : 1;
      if(this.$route.name!=this.activeName){
        this.clearFilter();
        this.$refs['subPage'].selectArr = [];
        this.activeName = this.$route.name;
        this.$nextTick(()=>{
          this.changeStatus();
      })
      }else{
        this.$nextTick(()=>{
          this.getItems();
      })
      }
      
    },
    toPage(val) {
      if (val != this.$route.query.page){
        this.$router.push({
          query: {
            page: val,
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
  },
  
}
</script>

<style lang="scss">
.goods-mgr-page{
  .export-btn{
    .el-badge__content.is-fixed{
      top: -18px;
      right: auto;
      left: -2px;
      transform: none;
    }
  }
}
</style>

