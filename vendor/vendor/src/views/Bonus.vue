<template>
    <div class="contentpanel Bonus-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <h2>{{ $t("mycustomer.Bonus账单明细") }}</h2>
        </div>
      </div>
      <div class="right">
      </div>
    </div>
    <div style="margin-bottom:15px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/dashboard' }">{{ $t("mycustomer.首页") }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/my-custom' }">{{ $t("mycustomer.我的客户") }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t("mycustomer.Bonus账单明细") }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="pagebody" v-loading="loading">
      <el-row :gutter="15" class="mg-b-20"> 
        <el-col :span="24">
          <el-card>
            <el-row :gutter="20">
              <el-col :span="24">
              <div ref="pageFilter" class="page-filter">
                  <el-form :inline="true" size="mini">
                    <el-form-item>
                      <el-input
                        v-model="filterParams.code"
                        :placeholder="$t('mycustomer.单号查询')"
                        @keyup.enter.native="filterItem"
                      ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select 
                         filterable
                         remote
                         clearable
                         @change="filterItem()"
                         v-model="filterParams.symbol"
                         :placeholder="$t('mycustomer.请选择类型')"
                         >
                            <el-option label="ALL" value=""></el-option>
                            <el-option :label="$t('mycustomer.充值')" value="1"></el-option>
                            <el-option :label="$t('mycustomer.支出')" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker
                            value-format="yyyy-MM-dd"
                            v-model="filterParams.date"
                            @change="dateChange"
                            type="daterange"
                            align="right"
                            unlink-panels
                            :range-separator="$t('myinvoice.to')"
                            :start-placeholder="$t('myinvoice.startDate')"
                            :end-placeholder="$t('myinvoice.endDate')"
                            >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item style="margin-bottom: 0">
                        <el-button type="primary" @click="filterItem()">{{
                        $t("myinvoice.filter")
                        }}</el-button>
                        <el-button type="danger" @click="clear()">{{
                        $t("myinvoice.clear")
                        }}</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
            <template v-if="filterParams.symbol!=2">
            <el-table
              :data="items"
              stripe
              style="width: 100%"
              ref="gridTable"
            >
            <el-table-column :label="$t('mycustomer.类型')">
               <template slot-scope="scope">
                 <span>{{scope.row.symbol==1 ? $t('mycustomer.充值') :$t('mycustomer.支出')}}</span>
               </template>
            </el-table-column>
            <el-table-column :label="$t('mycustomer.交易流水号')" prop="code">
            </el-table-column>
            <el-table-column :label="$t('mycustomer.充值时间')">
               <template slot-scope="scope">
                  <span>{{$moment
                    .unix(scope.row.timeCreated)
                    .format("YYYY-MM-DD HH:mm:ss")}}
                  </span>
               </template>
            </el-table-column>
            <el-table-column :label="$t('mycustomer.金额（$）')" prop="amount">
            </el-table-column>
            <el-table-column :label="$t('mycustomer.备注')">
               <template slot-scope="scope">
                 <span>{{scope.row.remark}}</span>
                 <span v-if="!scope.row.remark">---</span>
               </template>
            </el-table-column>
            </el-table>
            </template>
            <template v-else>
            <el-table
              :data="items"
              stripe
              style="width: 100%"
              ref="gridTable2">
            <el-table-column :label="$t('mycustomer.类型')">
                <template slot-scope="scope">
                 <span>{{scope.row.symbol==1 ? $t('mycustomer.充值') :$t('mycustomer.支出')}}</span>
               </template>
            </el-table-column>
            <el-table-column :label="$t('mycustomer.订单号')" prop="code">
            </el-table-column>
            <el-table-column :label="$t('mycustomer.支付时间')">
                <template slot-scope="scope">
                  <span>{{$moment
                    .unix(scope.row.timeCreated)
                    .format("YYYY-MM-DD HH:mm:ss")}}
                  </span>
               </template>
            </el-table-column>
            <el-table-column :label="$t('mycustomer.金额（$）')" prop="amount">
            </el-table-column>
            </el-table>
            </template>
          </el-card>
        </el-col>
      </el-row>
    </div>
     <el-row v-if="items.length" :gutter="20">
        <el-col :span="24" class="d-flex justify-content-center">
          <div>
            <el-pagination
              :current-page="Number(page)"
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
    <el-backtop
      class="goto-top"
      target=".main-scroll  .el-scrollbar__wrap"
      :right="20"
      :bottom="20"
    >
    </el-backtop>
    </div>
</template>

<script>
export default {
    data() {
        return {
          id: this.$route.query.id,
          loading:false,
          filterParams:{
            code:"",
            symbol:"",
            timeCreatedFrom:"",
            timeCreatedTo:"",
          },
          items:[],
          pageSizes: [10, 20, 50, 100],
          page: this.$route.query.page ? Number(this.$route.query.page) : 1,
          rowsPerPage: localStorage.getItem("myCustomRowsPerPage")
          ? Number(localStorage.getItem("myInvoiceRowsPerPage"))
          : 10,
          total: 0,
          totalPage: 0,
        };
    },
    watch: {
     $route: "gotoPage",
    },
    mounted(){
      this.id = this.$route.query.id;
      this.getBonus()
    },
    methods: {
      toPage(val) {
      if (val != this.$route.query.page)
        this.$router.push({ query: { page: val } });
      },
      changePageSize(val) {
        this.rowsPerPage = val;
        localStorage.setItem("myCustomRowsPerPage", val);
        this.getBonus();
      },
      gotoPage() {
        this.page = this.$route.query.page ? this.$route.query.page : 1;
        this.getBonus();
      },
      getBonus(){
        this.loading = true
        this.$apiCall("api.Relationship.bonusList",{
          relationshipId:this.id,
          code:this.filterParams.code,
          symbol:this.filterParams.symbol,
          timeCreatedFrom:this.filterParams.timeCreatedFrom,
          timeCreatedTo:this.filterParams.timeCreatedTo,
          page: this.page,
          rowsPerPage: this.rowsPerPage,
        },r=>{ 
          this.loading = false;
          if(r.ErrorCode == 9999){
             this.items = r.Data.Results;
             this.total = Number(r.Data.Pagination.totalCount);
             this.totalPage = Number(r.Data.Pagination.totalPage);
             this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
          }else{
            this.$message({ message: r.Message, type: "error" });
          }
        })
      },
      dateChange() {
        if (this.filterParams.date.length > 1) {
            this.filterParams.timeCreatedFrom = this.$moment(
            this.filterParams.date[0]
            ).format("YYYY-MM-DD");
            this.filterParams.timeCreatedTo = this.$moment(
            this.filterParams.date[1]
            ).format("YYYY-MM-DD");      
            this.filterItem()
        }
    },
    filterItem(){
      if (this.$route.query.page == 1) {
          this.getBonus();
        } else {
          this.$router.push({ query: { page: 1 } });
      }
    },
    clear(){
      this.filterParams = {
            code:"",
            symbol:"",
            timeCreatedFrom:"",
            timeCreatedTo:"",
      };
      this.filterItem();
    }
    },
    components: {

    },
};
</script> 

<style scoped lang="scss">
    .tit{
        font-size: 22px;
        margin: 50px 0 0;
        padding-bottom: 20px;
        color: #2c3e50;
        border-bottom: 1px solid #EBEEF5;
    }
</style>
