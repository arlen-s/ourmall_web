<template>
  <div class="goods-list-page">
    <div ref="tablefilter">
      <div ref="pageFilter" class="page-filter" style="border-bottom: none">
        <el-form :inline="true" size="mini" v-if="filterData">
          <el-form-item>
            <el-input
              @keyup.enter.native="filterGetItem()"
              @clear="clearFilter('name')"
              clearable
              size="mini"
              :placeholder="$t('goods.商品名称')"
              style="width: 160px"
              v-model="filterData.name"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-select
            v-if="$route.name=='SGQuotation'"
              filterable
              remote
              :remote-method="remoteMethodCustom"
              :loading="selectLoading"
              :placeholder="$t('quotation.分配人')"
              clearable
              v-model="filterData.subUserId"
              @change="filterGetItem()"
              @clear="clearFilter('subUserId')"
            >
              <el-option
                v-for="opt in selectArr"
                :key="opt.id"
                :label="opt.name"
                :value="opt.id"
              ></el-option>
            </el-select>  
          </el-form-item>
          <el-form-item>
            <el-select
            v-if="$route.name!='SGQuotation' &&$route.name!='SGAssign'"
              filterable
              remote
              :remote-method="remoteMethodCustom"
              :loading="selectLoading"
              :placeholder="$t('quotation.报价人')"
              clearable
              v-model="filterData.subUserIdCompleted"
              @change="filterGetItem()"
              @clear="clearFilter('subUserIdCompleted')"
            >
              <el-option
                v-for="opt in selectArr"
                :key="opt.id"
                :label="opt.name"
                :value="opt.id"
              ></el-option>
            </el-select>  
          </el-form-item>
          <el-form-item>
            <el-select
            v-if="$route.name=='SGSearch'"
              :placeholder="$t('quotation.状态')"
              clearable
              v-model="filterData.type"
              @change="filterGetItem()"
              @clear="clearFilter('status')"
            >
              <el-option
                :label="$t('quotation.待处理')"
                value="1"
              ></el-option>
              <el-option
                :label="$t('quotation.已完成')"
                value="2"
              ></el-option>
            </el-select>  
          </el-form-item>
          <el-form-item :label="$t('quotation.日期')">
            <el-date-picker value-format="yyyy-MM-dd" key="date2"
                v-model="filterData.date" @clear="clearFilter('date')"
                @change="dateChange" type="daterange" align="right"
                unlink-panels start-placeholder="Start"
                end-placeholder="End">
            </el-date-picker>
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
    </div>
    <div class="table-wrap" style="border-top: 1px #ebeef5 solid; padding-top: 5px;">
      <div v-if="items.length && $route.name =='SGAssign'" class="table-action">
        <div class=" mg-r-15">
          <el-checkbox v-model="isAllCheck" @change="changeAllCheckbox"> <span style=" color:#606266; font-size: 12px;">{{$t("goods.全选/全不选")}} ({{checkboxArr.length}})</span></el-checkbox>
        </div>
        <div>
          <el-button type="primary" size="mini" @click="assignAll()"  :disabled="!$isRole($route.meta.roleWrite)">{{$t('quotation.批量分配')}}</el-button>
        </div>
      </div>
      <el-table v-if="items.length || loading" :data="items" stripe 
        :ref="`gridTable${$route.name}`" :key="`gridTable${$route.name}`" >
        <el-table-column :label="''" width="40" v-if="items.length && $route.name =='SGAssign'">
          <template slot-scope="scope">
            <el-checkbox
              class="none-label"
              v-model="checkboxArr"
              :label="scope.row.id"
            ></el-checkbox>
          </template>
        </el-table-column>
        <!-- 商品名称 -->
        <el-table-column :label="$t('goods.商品名称')" width="180">
          <template slot-scope="scope">
            <p class=" tx-ellipsis3" style=" line-height: 22px;" v-if="scope.row.name">
              {{scope.row.name}}
            </p>
            <p v-else>---</p>
          </template>
        </el-table-column> 
        <!-- 商品图片 -->
        <el-table-column :label="$t('goods.商品图片')">
          <template slot-scope="scope">
            <el-image style=" width: 80px; height: 80px; border: 1px solid #ddd; background-color: #fff;"
              v-if="scope.row.imgUrlArr"
              :src="scope.row.imgUrlArr[0]"
              :fit="'contain'"
              :scroll-container="'.main-scroll .el-scrollbar__wrap'"
              :preview-src-list="scope.row.imgUrlArr"
              lazy
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>+
            </el-image>
          </template>
        </el-table-column>
        <!-- 商品链接 -->
        <el-table-column :label="$t('quotation.商品链接')" width="180" v-if="$route.name == 'SGAssign' || $route.name == 'SGQuotation'">
          <template slot-scope="scope">
            <p class=" tx-ellipsis3" style=" line-height: 22px;" v-if="scope.row.url">
              <a :href="scope.row.url" target="_blank">{{scope.row.url}}</a>
            </p>
            <p v-else>---</p>
          </template>
        </el-table-column> 
		
		<!-- 客户邮箱 -->
		<el-table-column :label="$t('quotation.客户邮箱')">
		  <template slot-scope="scope">
		     <span v-if="scope.row.username">{{scope.row.username}}</span>
		     <span v-else>---</span>
		  </template>  
		</el-table-column>
        <!-- 预期价格 -->
        <el-table-column :label="$t('quotation.预期价格')">
          <template slot-scope="scope">
            <b>${{scope.row.minPrice}}-{{scope.row.maxPrice}}</b>
          </template>  
        </el-table-column>
        <!-- 回复价格 -->
        <el-table-column :label="$t('quotation.回复价格')"   v-if="$route.name == 'SGFinish'||$route.name == 'SGSearch'">
          <template slot-scope="scope">
              <b v-if="scope.row.price">${{scope.row.price}}</b>
            <span v-else>---</span>
          </template>  
        </el-table-column>
        <!-- 回复价格 -->
        <el-table-column :label="$t('quotation.失败原因')"  v-if="$route.name == 'SGNone'">
          <template slot-scope="scope">
            <span>{{scope.row.remark}}</span>
          </template>  
        </el-table-column>
       
        <!-- 分配人 -->
        <el-table-column :label="$t('quotation.分配人')" v-if="$route.name=='SGQuotation'">
          <template slot-scope="scope">
             <span v-if="scope.row.subUserName">{{scope.row.subUserName}}</span>
             <span v-else>---</span>
          </template>  
        </el-table-column>
        <!-- 报价人 -->
        <el-table-column :label="$t('quotation.报价人')" v-if="$route.name!='SGQuotation' &&$route.name!='SGAssign'">
          <template slot-scope="scope">
             <span v-if="scope.row.subUserNameCompleted">{{scope.row.subUserNameCompleted}}</span>
             <span v-else>---</span>
          </template>  
        </el-table-column>
        <!-- 创建日期 -->
        <el-table-column :label="$t('quotation.创建日期')">
          <template slot-scope="scope">
            {{
              $moment(scope.row.timeCreated * 1000).format("YYYY-MM-DD HH:mm:ss")
            }}
          </template>  
        </el-table-column>
        <!-- 操作 -->
        <el-table-column :label="$t('goods.操作')" width="150" v-if="$route.name!='SGSearch'">
          <template slot-scope="scope">
            <el-link type="primary" class="mg-r-15" :disabled="!$isRole($route.meta.roleWrite)" v-if="$route.name == 'SGQuotation'|| $route.name == 'SGAssign'" @click="quotation(scope.row)">{{$t('quotation.报价')}}</el-link>
            <el-link type="primary" class="mg-r-15" :disabled="!$isRole($route.meta.roleWrite)" v-if="$route.name == 'SGAssign'" @click="assign(scope.row)">{{$t('quotation.分配')}}</el-link>
            <el-link type="primary" @click="openDetail(scope.row)">{{$t('quotation.详情')}}</el-link>
          </template>
        </el-table-column> 
        <el-table-column :label="$t('quotation.状态')" width="120" v-if="$route.name == 'SGSearch'">
          <template slot-scope="scope">
            <template v-if="$store.state.userInfo.offerProductDistribute == 1">
              <!-- 关闭分配 -->
              <span v-if="scope.row.status==1">{{$t('quotation.待报价')}}</span>
              <span v-if="scope.row.status==2">{{$t('quotation.已完成')}}</span>
              <span v-if="scope.row.status==9">{{$t('quotation.无法搜品')}}</span>
            </template>
            <template v-else>
              <span v-if="scope.row.status==1 && (!scope.row.subUserId||scope.row.subUserId == 0)">{{$t('quotation.待分配')}}</span>
              <span v-if="scope.row.status==1 && (scope.row.subUserId &&scope.row.subUserId!=0)">{{$t('quotation.待报价')}}</span>
              <span v-if="scope.row.status==2">{{$t('quotation.已完成')}}</span>
              <span v-if="scope.row.status==9">{{$t('quotation.无法搜品')}}</span>
            </template>
          </template>
        </el-table-column> 
      </el-table>
      <div v-else class="noProduct">
        <div>{{$t('quotation.暂无数据展示')}}</div>
      </div>
    </div>
    <dialogDetail :data="dialogDetail"/>
  </div>
</template>

<script>
import dialogDetail from './dialogDetail';
export default { 
  props: ["loading", "items", "categroyArr", "filterData"],
  data(){
    return {
      selectLoading:false,
      selectArr:[],
      isAllCheck: false,
      checkboxArr: [],
      productTypeArr: this.$dict.productTypeArr,
      productItem:{},
      dialogDetail:{
        isShow:false,
        data:{}
      }
    }  
  },
  components:{
    dialogDetail
  },
  watch: {
    checkboxArr(){
      this.isAllCheck = this.items.length && this.items.length == this.checkboxArr.length;
    }
  },
  methods: {
    quotation(i){
      this.$router.push({name:'quotationGoods',query:{id:i.id,waitDistribute:this.waitDistribute}})
    },
    changeAllCheckbox(val){ //全选全不选
      if(val){
        this.checkboxArr = this.items.map(item => item.id) 
      }else{
        this.checkboxArr = [];
      }
    },
    remoteMethodCustom(query) {
      this.selectArr = [];
      //获取筛选客户
      if (!query) return;
      this.selectLoading = true;
      this.$apiCall("api.SubUser.findByUser", { nameLike: query }, (r) => {
        this.selectLoading = false;
        if (r.ErrorCode == 9999) {
          this.selectArr = r.Data.Results;
          if(this.$route.name != 'SGQuotation'){
            this.selectArr.push({name:this.$store.state.userInfo.name,id:'0'})
          }
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      });
    },
    assign(i){
      if(i == 'All'){
        this.$emit('assign',this.checkboxArr)
      }else{
        this.selectArr = [];
        this.selectArr.push(i.id)
        this.$emit('assign',this.selectArr)
      }
    },
    openDetail(data){
      this.dialogDetail.data = this.productItem = data;
      this.dialogDetail.isShow = true;
    },
   assignAll(){
     this.assign('All')
   },
   dateChange() {
        if (this.filterData.date.length > 1) {
            this.filterData.dateFrom = this.$moment(
                this.filterData.date[0]
            ).format("YYYY-MM-DD");
            this.filterData.dateTo = this.$moment(
                this.filterData.date[1]
            ).format("YYYY-MM-DD");
            this.filterGetItem();
        }
    },
    filterGetItem(){
      this.$emit('filterGetItem');
    },
    clearFilter(type){
      this.selectArr = [];
      this.$emit('clearFilter', type)
    },
  }
}
</script>

<style lang="scss">
.noProduct{
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  div{
    margin-bottom: 20px;
  }
}
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


</style>