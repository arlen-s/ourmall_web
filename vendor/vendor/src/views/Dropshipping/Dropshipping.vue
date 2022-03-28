<template>
  <div v-loading.fullscreen="loading"
    element-loading-background="rgba(0, 0, 0, 0.3)">
    
    <div class="br-pagetitle  d-flex justify-content-between align-items-center">
        <div class="d-flex">
          <h4 class="mg-r-15">DropShipping 客户挖掘机</h4>
          <el-tooltip class="item" effect="dark" content="" placement="right">
            <div slot="content" style="width:455px">
            　<p style="font-size:16px;margin-bottom:5px">这些数据为什么在这里？</p>
              <p class="mg-b-20">马帮ERP通过对您账号中的店铺订单数据进行分析，发现这些客户可能是DropShipping客户。</p>
            　<p style="font-size:16px;margin-bottom:5px">什么是DropShipping?</p>
            　<p class="mg-b-15">海外客户通过速实通等平台，找中国卖家进行一件代发等批发采购的业务。</p>
              <div style="display:flex" >
                <i class="el-icon-warning-outline mg-r-5" style="color:#FEA93F;font-size:14px"></i>
                <div>马帮ERP提醒您:这类客户维护好有什么好处? 他们有持续的下单能力，服务好这类客户可以获取大量订单对您业绩提升有极大的帮助。
                </div>
              </div>
            </div>
            <i class="el-icon-question" style="color:#3f56a1"></i>
          </el-tooltip>
        </div>
      <div class="tx-right">
        <a href="javascript:;" @click="showCustomer(2)" v-if="isShow == 1">显示被隐藏的客户</a>
        <a href="javascript:;" @click="showCustomer(1)" v-else>显示有效的客户</a>
      </div>
    </div>
	    <!-- 筛选 -->
      <div class="pd-x-20 pd-sm-x-30 br-pagebody" style="margin-bottom:20px">
        <div class="card bd-gray-400 formBox" style="padding:9px 30px">
          <div class="formItem" style="display:flex">
            <select name="complete" id="complete" v-model="complete">
              <option value="">请选择</option>
              <option value="completeRateGt">大于</option>
              <option value="completeRate">等于</option>
              <option value="completeRateLt">小于</option>
              <option value="completeRateGeq">大于等于</option>
              <option value="completeRateLeq">小于等于</option>
              <option value="completeRateNeq">不等于</option>
            </select>
            <input type="number" placeholder="完整度" v-model="num" @input="numRole" style="width:100px;margin-left:5px;margin-right:5px">%
          </div>
          <div class="formItem">
            <input type="text" placeholder="买家账号" v-model="form.uidLike">
          </div>
          <div class="formItem">
            <input type="text" placeholder="买家姓名" v-model="form.nameLike">
          </div>
          <div class="formItem">
            <select
                  name="country"
                  id="country"
                  data-error="请选择国家"
                  v-model="form.countryCode"
                >
                  <option value="">请选择国家</option>
                  <option
                    v-for="info in countryArr"
                    :key="info.value"
                    :value="info.value"
                  >
                    {{ info.label }}
                  </option>
                </select>
          </div>
          <div class="formItem">
            <button class="but" @click="getVendor('filter')">筛选</button>
          </div>
        </div>
        
      </div>
    <div class="pd-x-20 pd-sm-x-30 br-pagebody">
    <div class="card bd-gray-400">
      <table class="table mg-b-0 table-contact bill">
        <thead>
          <tr>
          	<th class="wd-lg-150">资料完整度
            </th>
            <th class="wd-lg-150">买家账号</th>
            <th class="wd-lg-150">
            	买家姓名
            </th>
            <th class="wd-lg-200">
            	国家	
            </th>
            <th class="wd-lg-200">
            	平台订单汇总
            </th>
            <!-- <th class="wd-lg-200">
            	时间信息
            </th> -->
            <th class="wd-lg-150">
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="items && items.length == 0">
            <td colspan="11">
              <div class="none-product">
                没有<span v-if="isShow != 1">被隐藏</span><span v-else>有效</span>的客户</div>
            </td>
          </tr>
          <template v-else>
          <tr v-for="(item,index) in items" :key="index+item.id">
          	<td class="valign-middle">
              <span v-if="item.completeRate == 0">尚未完善</span>
              <span v-else>{{item.completeRate}} %</span>
            </td>
            <td class="valign-middle tx-12">
              <div v-if="item.uid">
                {{item.uid}}
              </div>
              <div v-else>---</div>
            </td>
            <td class="valign-middle tx-12">
              <div v-if="item.name">
              	{{item.name}}
              </div>
              <div v-else>---</div>
            </td>
            <td class="valign-middle tx-12">
              <div v-if="item.countryCode">
              	{{item.countryCode}}
              </div>
              <div v-else>---</div>
            </td>
            <td class="valign-middle tx-12">
              	<div>总订单：<span v-if="item.orderCnt">{{item.orderCnt}}</span>
                <span v-else>---</span> / 
                <span v-if="item.amount">${{item.amount}}</span>
                <span v-else>---</span></div>
              	<div>上月订单：
                  <span v-if="item.lastMonthOrderCnt">{{item.lastMonthOrderCnt}}</span>
                   <span v-else>---</span> / 
                <span v-if="item.lastMonthAmount">{{item.lastMonthAmount}}</span>
                <span v-else>---</span>
                </div>
            </td>
            <!-- <td class="valign-middle tx-12">
              <div>首次合作：<span v-if="item.firstCooptime&&item.firstCooptime!=0">{{item.firstCooptime}}</span><span v-else>---</span></div>
              <div>最近合作：<span v-if="item.recentCooptime&&item.recentCooptime!=0">{{item.recentCooptime}}</span><span v-else>---</span></div>
            </td> -->
            <td class="valign-middle tx-12">
              	<a href="javascript:;" @click="goDetail(item)">
                   查看详情</a>
            </td>
          </tr>
        </template> 
        </tbody>
      </table>
      <div style=" position: relative; top: 20px;text-align:center">
          <el-pagination
            :current-page="page"
            :background="true"
            layout="sizes, total, prev, pager, next, jumper"
            :page-sizes="pageSize"
            :page-size="rowsPerPage"
            :total="Number(totalCount)"
            @current-change="toPage"
            @size-change="changePageSize"
          >
          </el-pagination>
        </div>
    </div>
    <div class="power">Powered by OurMall</div> 
    </div>
    
    
    
  </div>
</template>

<script>
import utils from "./../../components/utils"
import countryArr from "@/components/country.json";
export default {
  data(){
    return {
      userInfo:{},
      form:{
        countryCode:"",
        uidLike:"",
        nameLike:"",
      },
      complete:"",
      num:"",
      loading:false,
      pageSize: [10, 20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem(`${this.$route.name}RowsPerPage`)
        ? Number(localStorage.getItem(`${this.$route.name}RowsPerPage`))
        : 10,
      totalCount: 0,
      totalPage: 0,
      items:[],
      List:[],
      unList:[],
      isShow:1,
      countryArr:[],
      countryJSON:null
    }
  },
  components: {
    utils,
    countryArr
  },
  watch: {
    $route: "gotoPage",
  },
  mounted(){
  if(this.$route.query.outerUserId){
    this.openDrop();
  }else{
    this.getVendor();
  };
   this.countryJSON = countryArr;
    //格式化国家
    Object.keys(countryArr).forEach((key) => {
      Object.keys(countryArr[key]).forEach((key2) => {
        this.countryArr.push({
          label: countryArr[key][key2].nameCN,
          value: countryArr[key][key2].code2,
        });
      });
    });
    this.countryArr.sort(
      (a, b) => a.label.charCodeAt(0) - b.label.charCodeAt(0)
    );
  },
  methods: {
    numRole(){
      if(this.form.num >100){
        this.form.num = this.form.num.slice(0,2)
      }
    },
    openDrop(){
      // ？outerUserId=100001&type=1&email=aaa@bb.com&name=1231231
      if(this.$route.query){
        localStorage.removeItem("apiUserId");
        localStorage.removeItem("apiUserToken")
        let params = this.$route.query;
        this.$apiCall("api.SourceBuyer.loginByVendor",params, r=>{
        if(r.ErrorCode == 9999){
          this.userInfo = r.Data.Results;
          localStorage.setItem(
            "apiUserToken",
            r.Data.Results.apiUserToken
          );
          localStorage.setItem("apiUserId", r.Data.Results.id);
          localStorage.setItem(
            "userInfo",
            JSON.stringify(r.Data.Results)
          );
          if (localStorage.getItem("userInfo")) {
            this.$store.commit(
              "setUserInfo",
              JSON.parse(localStorage.getItem("userInfo"))
            );
          }
          this.getVendor();
        }
      })
      }
      
    },
    getVendor(i){
      this.loading = true;
      if(i){this.page = 1};
      let params = $.extend({
        page:this.page,
        rowsPerPage:this.rowsPerPage,
        status : this.isShow
        }, this.form);
      params[this.complete] = this.num;
      this.$apiCall("api.SourceBuyer.findByVendor",params, r=>{
          this.loading = false;
          if(r.ErrorCode == 9999){
            this.items = r.Data.Results;
            this.items.forEach((m)=>{
              this.countryArr.forEach((n)=>{
                if(m.countryCode == n.value){
                  m.countryCode = n.label
                } 
              })
            })
            this.totalPage = r.Data.Pagination.totalPage;
            this.totalCount = r.Data.Pagination.totalCount;
            this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
          }else{
          this.$message({ message: r.Message, type: "error" });
        }
      })
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
      localStorage.setItem(`${this.$route.name}RowsPerPage`, val);
      this.getVendor();
    },
    gotoPage() {
      this.page = this.$route.query.page ? Number(this.$route.query.page) : 1;
      this.getVendor();
    },
    goDetail(p){
      this.$router.push({
        name:"DropD",
        query:{
          index:p.id,
          id:p.relationship.id,
          show:p.status
          },
        })
    },
    showCustomer(i){
      this.isShow = i;
      this.getVendor();
    }
  }
}
</script>

<style lang="scss" scoped>
.br-pagetitle {
  padding: 20px;
  margin: 0 30px;
}
.br-pagetitle h4 {
  margin-bottom: 5px;
  color: #343a40;
  font-size: 24px;
}
.br-pagebody{
  margin: 0px 30px 70px;
}
.wd-lg-150 {
  width: 150px;
  }
.wd-lg-200{
  width: 250px;
}
.card {
    background-color: #fff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0 , 0.21);
    border-radius: 3px;
    padding: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 3px;
}
.none-product{
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
}
//table......//
.data-table.bill tr:nth-child(even) {
  background-color: rgba(0, 0, 0, .4);
}
.table {
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid #dee2e6;
}
.table th.valign-middle,
.table td.valign-middle {
  vertical-align: middle;
}
.table thead > tr > th,
.table tfoot > tr > th {
  border-top: 0;
  border-bottom: 0;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  color: #343a40;
  background: #F9F9F9;
  letter-spacing: 0.5px;
}
.table .thead-colored > tr > th,
.table .thead-colored > tr > td {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.75);
  border-color: rgba(255, 255, 255, 0.2);
  border-bottom-width: 0;
  border-top-width: 0;
}
.table .thead-colored > tr > th:first-child,
.table .thead-colored > tr > td:first-child {
  border-top-left-radius: 3px;
}
.table .thead-colored > tr > th:last-child,
.table .thead-colored > tr > td:last-child {
  border-top-right-radius: 3px;
}
.table .thead-colored + tbody > tr:first-child > td,
.table .thead-colored + tbody > tr:first-child > th {
  border-top-width: 0;
}
.table tbody > tr > th {
  color: #343a40;
  font-weight: 500;
}
/* CONTACTS MANAGER */
.table-contact tbody tr td:nth-child(4), .table-contact tbody tr td:nth-child(5),
.table-contact tbody tr th:nth-child(4),
.table-contact tbody tr th:nth-child(5) {
  font-family: "Lato", "Helvetica Neue", Arial, sans-serif;
  font-size: 13px;
}
.table-contact tbody tr td:nth-child(4),
.table-contact tbody tr th:nth-child(4) {
  color: #495057;
}
.card ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color:#7ca4d2
}
.formBox {
  display: flex;
  flex-direction: row;
  .formItem {
    margin-right: 20px;
    display: flex;
    align-items: center;
    input,
    select {
      flex: 1;
      display: block;
      height: 34px;
      padding: 6px 12px;
      font-size: 14px;
      line-height: 1.4px;
      color: #555;
      background-color: #fff;
      border: 1px solid #cfd9db;
      border-radius: 4px;
      outline: none;
    }
    input:focus,
    select:focus {
      border-color: #00b1e1;
    }
    
  }
}
.but {
  outline: none;
  background-color: #7ca4d2;
  border-color: #6c91bc;
  color: #fff;
  font-size: 13px;
  padding: 7px 12px;
  line-height: 18px;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  border-radius: 4px;
  user-select: none;
}
.but:hover {
  background-color: #6285ad;
  border-color: #5478a1;
}
.power{
  text-align: right;
  margin-top: 7px;
  color: #909399;
}
</style>