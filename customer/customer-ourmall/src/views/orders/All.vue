<template>
  <div
    v-loading.fullscreen="loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <div ref="tablefilter">
      <div class=" d-flex" style=" margin-bottom: 5px; justify-content: space-between;flex-wrap:wrap">
        <div class="left d-flex" style="margin:10px">
          <div class="mg-r-10">
            <el-input
              @keyup.enter.native="filterItems('name')"
              @clear="clearFilter('name')"
              v-model="codeName"
              size="mini"
              placeholder="Order ID"
              style="width: 190px;"
            >
              <template slot="prepend">#</template>
            </el-input>
          </div>
          <div class=" mg-r-10">
            <el-button-group style="min-width:658px; height: 28px;">

            <el-cascader
              size="mini"
              :key="cascaderKey"
              v-model="filterParams.shopifyStore"
              placeholder="All my stores"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              @change="filterItems('store')"
             >
            </el-cascader>
              <!-- 筛选店铺 -->
              <!-- <el-popover
                placement="bottom"
                title=""
                trigger="click"
                popper-class="d-block"
                v-model="popStoreFilter"
              >
                <div>
                  <el-checkbox-group style=" max-height: 200px;" v-model="filterParams.shopifyStore">
                    <el-checkbox
                      v-for="tag in storeList"
                      :label="tag.shopifyAccountId"
                      :key="tag.shopifyAccountId"
                      @change="filterItems('store')"
                    >{{tag.store}}</el-checkbox>
                  </el-checkbox-group>
                  <div class=" d-flex justify-content-end">
                    <el-link
                      type="danger"
                      :disabled="!filterParams.shopifyStore.length"
                      @click="clearFilter('store')"
                    >Clear</el-link>
                  </div>
                </div>
                <el-button
                  size="mini"
                  slot="reference"
                >My Stores<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
              </el-popover> -->

              <!-- 筛选时间段 -->
              <el-popover
                placement="bottom"
                title=""
                trigger="click"
                popper-class="d-block"
                v-model="popDateFilter"
              >
                <el-radio-group  style=" max-height: 200px;"
                  v-model="filterParams.timeFilter"
                  @change="filterItems('date')"
                >
                  <el-radio
                    v-for="(time,k) in dateArr"
                    :key="k"
                    :label="k"
                  >{{time}}</el-radio>
                </el-radio-group>
                <div v-if="filterParams.timeFilter == 6">
                  <el-date-picker
                    size="mini"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="Start"
                    end-placeholder="End"
                    v-model="filterDate"
                    @change="dateChange"
                  >
                  </el-date-picker>
                </div>
                <div class=" d-flex justify-content-end">
                  <el-link
                    type="danger"
                    :disabled="!filterParams.timeFilter"
                    @click="clearFilter('date')"
                  >Clear</el-link>
                </div>
                <el-button
                  size="mini"
                  slot="reference"
                >Date Ranges<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
              </el-popover>
              <!-- 筛选Payment -->
              <el-popover
                placement="bottom"
                title=""
                trigger="click"
                popper-class="d-block"
                v-model="popPaymentFilter"
              >
                <el-checkbox-group  style=" max-height: 200px;"
                  v-model="filterParams.financial_status"
                  @change="filterItems('financial')"
                >
                  <el-checkbox
                    v-for="(pay, k) in paymentArr"
                    :key="k"
                    :label="k"
                  >{{pay.text}}</el-checkbox>
                </el-checkbox-group>
                <div class=" d-flex justify-content-end">
                  <el-link
                    type="danger"
                    :disabled="!filterParams.financial_status.length"
                    @click="clearFilter('financial')"
                  >Clear</el-link>
                </div>
                <el-button
                  size="mini"
                  slot="reference"
                >Payment Status<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
              </el-popover>
              <!-- 筛选状态 -->
              <el-popover
                placement="bottom"
                title=""
                trigger="click"
                popper-class="d-block"
                v-model="popFulfillFilter"
              >
                <el-checkbox-group  style=" max-height: 200px;"
                  v-model="filterParams.fulfillStatus"
                  @change="filterItems('fulfill')"
                >
                  <el-checkbox
                    v-for="(f, k) in fulfillArr"
                    :key="k"
                    :label="k"
                  >{{f.text}}</el-checkbox>
                </el-checkbox-group>
                <div class=" d-flex justify-content-end">
                  <el-link
                    type="danger"
                    :disabled="!filterParams.fulfillStatus.length"
                    @click="clearFilter('fulfill')"
                  >Clear</el-link>
                </div>
                <el-button
                  size="mini"
                  slot="reference"
                >Fulfillment Status<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
              </el-popover>
              <!-- 排序 -->
              <el-popover
                placement="bottom"
                title=""
                trigger="click"
                popper-class="d-block"
                v-model="popSortFilter"
              >
                <el-radio-group  style=" max-height: 200px;"
                  v-model="filterParams.sortBy"
                  @change="filterItems('sort')"
                >
                  <el-radio
                    v-for="(sort,k) in sortArr"
                    :key="k"
                    :label="k"
                  >{{sort}}</el-radio>
                </el-radio-group>
                <div class=" d-flex justify-content-end">
                  <el-link
                    type="danger"
                    :disabled="!filterParams.sortBy"
                    @click="clearFilter('sort')"
                  >Clear</el-link>
                </div>
                <el-button
                  size="mini"
                  slot="reference"
                >SortBy<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
              </el-popover>
            </el-button-group>
          </div>
          <div style=" min-width: 130px;">
            <el-button type="primary" size="mini" @click="filterItems()">Filter</el-button>
            <el-button type="danger" size="mini" @click="clearFilter()">Clear</el-button>
          </div>
        </div>
        <div class="right" style="margin:10px">
          <el-button v-if="routerName == 'AbnormalOrder'" type="primary" size="mini"
            :disabled="!checkedOrder.length"
            @click="exportDialogOpen"
          ><i class=" fa fa-download"></i> Export ({{checkedOrder.length}})</el-button>
        </div>
      </div>
      <!-- 筛选状态栏 -->
      <div>
        <el-tag
          v-if="filterParams.codeName"
          size="small"
          type="info"
          closable
          @close="clearFilter('name')"
          class="mg-r-5"
        >#{{filterParams.codeName}}</el-tag>
        <el-tag
          v-if="filterParams.shopifyStore.length"
          size="small"
          type="info"
          closable
          @close="clearFilter('store')"
          class="mg-r-5"
        >{{shopifyStoreName}}</el-tag>
        <el-tag
          v-if="filterParams.timeFilter"
          size="small"
          type="info"
          closable
          @close="clearFilter('date')"
          class="mg-r-5"
        >
          {{dateArr[filterParams.timeFilter]}}
          <span v-if="filterParams.timeFilter == 6 && filterDate.length">
            {{filterDate[0]}}--{{filterDate[1]}}
          </span>
        </el-tag>
        <el-tag
          v-if="filterParams.financial_status.length"
          size="small"
          type="info"
          closable
          @close="clearFilter('financial')"
          class="mg-r-5"
        >
          {{paymentFilterText}}
        </el-tag>
        <el-tag
          v-if="filterParams.fulfillStatus.length"
          size="small"
          type="info"
          closable
          @close="clearFilter('fulfill')"
          class="mg-r-5"
        >
          {{fulfilledFilterText}}
        </el-tag>
        <el-tag
          v-if="filterParams.sortBy"
          size="small"
          type="info"
          closable
          @close="clearFilter('sort')"
          class="mg-r-5"
        >{{sortArr[filterParams.sortBy]}}</el-tag>
      </div>
    </div>
    <div v-if="showTable" class="table-wrap">
      <!-- :height="tableHeight" -->
      <el-table
        :data="tableData"
        stripe
        ref="gridTable"
      >
        <el-table-column v-if="routerName == 'AbnormalOrder'" width="40" fixed>
          <template slot="header"
            slot-scope="scope"
          >
            <el-checkbox v-model="AllChecked" @change="changeAllChecked"></el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.checked"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
          label="Order"
          prop="codeName"
          width="150"
          fixed
        >
          <template v-slot="{ row }">
            {{row.codeName}}
            <span v-if="row.note" class="mg-l-5">
              <el-tooltip class="item" effect="dark" :content="row.note" placement="top">
                <i style="font-size: 12px;width: 12px;color: #5c6ac4;" class="el-icon-info"></i>
              </el-tooltip>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="My Store"
          prop="store"
          width="200"
        >
        <template slot-scope="scope">
          <span>
            <shopCate :items="scope.row" /> 
            {{scope.row.store}}
          </span>
        </template>
        </el-table-column>
        <el-table-column
          label="Date"
          prop="timeCreated"
          width="220"
        >
          <template slot-scope="scope">
            {{moment(scope.row.timeCreated).format("ll [at] LTS")}}
          </template>
        </el-table-column>
        <el-table-column label="Customer" width="250">
          <template slot-scope="scope">
            <popShippingJson :item="scope.row" @onCopy="onCopy" @onError="onError"/>
          </template>
        </el-table-column>
        <el-table-column width="120">
          <template
            slot="header"
            slot-scope="scope"
          >
            <div class=" tx-right">Total</div>
          </template>
          <template slot-scope="scope">
            <div class=" tx-right">
              <span v-if="scope.row.currency">{{ ce[scope.row.currency] ? ce[scope.row.currency].symbol : scope.row.currency}} </span>
              {{scope.row.totalPrice}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Payment"
          width="170"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.financialStatus && scope.row.financialStatus != 'voided'"
              size="small"
              :type="paymentArr[scope.row.financialStatus].type"
            >
              <span class="-EFlq" :class="`bg${paymentArr[scope.row.financialStatus].r}`"></span>
              {{paymentArr[scope.row.financialStatus].text}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="Fulfillment"
          width="150"
        >
          <template slot-scope="scope">
            <fulfillMentStatusTag :fulfillmentStatus="scope.row.fulfillmentStatus"/>
          </template>
        </el-table-column>
        <el-table-column label="Items">
          <template slot-scope="scope">
            <popItems v-if="scope.row.items" :items="scope.row.items" :fulfillmentStatus="scope.row.fulfillmentStatus" />
          </template>
        </el-table-column>
        <el-table-column v-if="routerName == 'AbnormalOrder'"
          label="Abnormal reason"
          width="180"
        >
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.reason" placement="bottom-end"
              popper-class="reason-tip"
            >
              <div class=" tx-ellipsis1" style="width: 165px; cursor: default;">
                {{scope.row.reason}}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div ref="tableFooter">
      <el-row
        v-if="tableData.length"
        :gutter="20"
      >
        <el-col
          :span="24"
          class=" d-flex justify-content-center"
        >
          <div style=" position: relative; top: 10px;">
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
        </el-col>
      </el-row>
    </div>
    <el-dialog title="Export"  :width="'620px'" :close-on-click-modal="false"
      :visible.sync="exportDialog.isShow"
    >
      <el-divider></el-divider>
      <div style="padding: 20px;">
        <p class="mg-b-10">Export to   {{$store.state.userInfo.email}}</p>
        <p class="mg-b-10">Selected: <b>{{checkedOrder.length}}</b> orders</p>
      </div>
      <el-divider></el-divider>
      <div slot="footer" class="dialog-footer">
				<el-button size="small" @click="exportDialog.isShow = false;">Cancel</el-button>
				<el-button size="small" type="primary" @click="exportOrders" :loading="exportDialog.loading">Export orders</el-button>
			</div>
    </el-dialog>
    <el-backtop class="goto-top" target=".main-scroll  .el-scrollbar__wrap" :right="20" :bottom="120">
    </el-backtop>
  </div>
</template>

<script>
import fulfillMentStatusTag from './../../components/ShopifyStatus'
import popItems from './../../components/PopItems'
import popShippingJson from './../../components/PopShippingJson'
import shopCate from './../../components/shopCate'
export default {
  props: ['fulfillArr'],
  data() {
    return {
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
      cascaderKey:1,
      showTable: false,
      routerName: this.$route.name,
      loading: false,
      tableHeight: 400,
      isAllExpand: true,
      tableData: [],
      pageSize: [20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("c_allOrdersRowsPerPage")
        ? Number(localStorage.getItem("c_allOrdersRowsPerPage"))
        : 20,
      totalCount: 0,
      totalPage: 0,
      ce: this.$CE, //货币符号
      isManage: 1,
      codeName: "",
      filterParams: {
        codeName: "",
        shopifyStore: [],
        fulfillStatus: [],
        timeFilter: "",
        dateFrom: "",
        dateTo: "",
        sortBy: "",
        financial_status: [],
      },
      filterParamsDefault: "{}",
      AllChecked: false,
      storeList: [],
      shopifyStoreName: "",
      popStoreFilter: false,
      popFulfillFilter: false,
      popDateFilter: false,
      popSortFilter: false,
      popPaymentFilter: false,
      filterDate: [],
      dateArr: {
        1: "Today",
        2: "Last 7 days",
        3: "Last 30 days",
        4: "Last 90 days",
        5: "Last 12 months",
        6: "Custom",
      },
      sortArr: {
        1: "Order number (ascending)",
        2: "Order number (descending)",
        3: "Date (oldest first)",
        4: "Date (newest first)",
      },
      paymentArr: {
        paid: { text: "Paid", type: "info", r: 3 },
        partially_refunded: {
          text: "Partially refunded",
          type: "danger",
          r: 2,
        },
        refunded: { text: "Refunded", type: "info", r: 3 },
      },
      exportDialog: {
        isShow: false,
        loading: false,
      },
      exportDialogDefault: '{}',
      keyTimeout: 0,
    };
  },
  components: {
    fulfillMentStatusTag,
    popItems,
    popShippingJson,
    shopCate
  },
  mounted() {
    this.exportDialogDefault = JSON.stringify(this.exportDialog);
    this.filterParamsDefault = JSON.stringify(this.filterParams)
    this.$nextTick(() => {
      // this.$emit("getTableHeight", this);
      this.getItems();
      this.getStore();
      // window.onresize = () => {
      //   this.$emit("getTableHeight", this);
      // };
    });
  },
  computed: {
    checkedOrder(){ //选中的id 数组
      return this.tableData.filter(order => {
          return order.checked
      })
    },
    CAllChecked(){ //是否全选
      let num = 0;
      this.tableData.forEach(order => {
        if(order.checked)
          num ++
      });
      return num && num == this.tableData.length;
    },
    paymentFilterText(){ //筛选后显示的文字
      let tx = [];
      if(this.filterParams.financial_status.length){
        Object.keys(this.paymentArr).forEach(key => {
          this.filterParams.financial_status.forEach(e => {
            if(e == key){
              tx.push(this.paymentArr[key].text)
            }
          })
        })
        return tx.join(', ')
      }else{
        return '';
      }
    },
    fulfilledFilterText(){ //筛选后显示的文字 fulfillment
      let tx = [];
      if(this.filterParams.fulfillStatus.length){
        Object.keys(this.fulfillArr).forEach(key => {
          this.filterParams.fulfillStatus.forEach(e => {
            if(e == key){
              tx.push(this.fulfillArr[key].text)
            }
          })
        })
        return tx.join(', ')
      }else{
        return '';
      }
    },
  },
  watch: {
    '$route.name'(){
      this.showTable = false;
      this.routerName = this.$route.name;
    },
    $route: "gotoPage",
    CAllChecked(){
      this.AllChecked = this.CAllChecked;
    },
    'filterParams.shopifyStore'(){
      if(!this.filterParams.shopifyStore.length) return;
				let arr = [];
				this.filterParams.shopifyStore.forEach(e=>{
					this.storeList.forEach(item=>{
						if(e == item.shopifyAccountId){
							arr.push(item.store)
						}
					})
				})
			this.shopifyStoreName = arr.join(",");
    },
  },
  methods: {
    exportOrders(){ //导出
      this.exportDialog.loading = true;
      let orderIds = this.checkedOrder.map(order => {return order.id});
      this.$apiCall("api.Invoice.exportShopifyOrders", {
        email: this.$store.state.userInfo.email,
        orderIds,
        byAbnormal: 1,
        }, r => {
        if (r.ErrorCode == "9999") {
          this.tableData.forEach(order => {
            order.checked = false;
          })
          this.exportDialog.isShow = false;
          this.$message({
            offset:200,
            duration:0,
            dangerouslyUseHTMLString: true,
            showClose: true,
            message: `<strong>Your Orders are exporting</strong><br/>Your export will be delivered by email to: ${this.$store.state.userInfo.email}. <br/>Depending on how many Orders you’re exporting, this could take some time.`,
            type: 'success'
            });
        }else{
          this.$elementMessage(r.Message, "error");
        }
      })
    },
    exportDialogOpen(){ //打开导出
      this.exportDialog = JSON.parse(this.exportDialogDefault);
      this.exportDialog.isShow = true;
    },
    changeAllChecked(){ //全选全不选
      this.tableData.forEach(item => {
        this.$set(item, 'checked', this.AllChecked)
      })
    },
    dateChange() {
      if (this.filterDate.length > 1) {
        this.filterParams.dateFrom = moment(this.filterDate[0]).unix();
        this.filterParams.dateTo = moment(this.filterDate[1]).endOf("d").unix();
        //筛选
        if (this.$route.query.page == 1) {
          this.getItems();
        } else {
          this.$router.push({
            query: {
              page: 1,
            },
          });
        }
     }
    },
    clearFilter(type) {
      switch (type) {
        case 'name':
          this.filterParams.codeName = this.codeName = '';
          break;
        case "store":
          this.filterParams.shopifyStore = [];
          this.popStoreFilter = false;
          ++this.cascaderKey;
          break;
        case "date":
          this.filterParams.timeFilter = "";
          this.filterDate = [];
          this.filterParams.dateFrom = "";
          this.filterParams.dateTo = "";
          this.popDateFilter = false;
          break;
        case "fulfill":
          this.filterParams.fulfillStatus = [];
          this.popFulfillFilter = false;
          break;
        case "sort":
          this.filterParams.sortBy = "";
          this.popSortFilter = false;
          break;
        case "financial":
          this.filterParams.financial_status = [];
          this.popPaymentFilter = false;
          break;
        default:
          this.filterParams = JSON.parse(this.filterParamsDefault);
          this.codeName = '';
          this.filterDate = [];
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
    filterItems(type) {
      switch (type) {
        case "name":
          this.filterParams.codeName = this.codeName;
          break;
        case "date":
          this.filterDate = [];
          this.filterParams.dateFrom = "";
          this.filterParams.dateTo = "";
          break;
        default:
          this.filterParams.codeName = this.codeName;
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
    getItems(s) {
      this.loading = true;
      let arr = [];
      if(this.filterParams.shopifyStore[1]){
      arr.push(this.filterParams.shopifyStore[1])  
      }
      let params = {
        page: this.page,
        rowsPerPage: this.rowsPerPage,
        accountIds: arr,
        timeFilter:
          this.filterParams.timeFilter >= 6 ? "" : this.filterParams.timeFilter,
        dateFrom: this.filterParams.dateFrom,
        dateTo: this.filterParams.dateTo,
        fulfillmentStatus: this.filterParams.fulfillStatus,
        sort: this.filterParams.sortBy,
        keywords: this.filterParams.codeName,
        financialStatus: this.filterParams.financial_status,
      };
      let url = 'api.Invoice.shopifyOrders';
      if(this.routerName == "AbnormalOrder"){
        url = 'api.Invoice.getAbnormalShopifyOrder';
        params.codeName = this.filterParams.codeName;
      }else{
        params.isAll = 1;
        params.keywords = this.filterParams.codeName;
      }
      this.$apiCall(url, params, (r) => {
        this.showTable = true;
        this.loading = false;
        if (r.ErrorCode == "9999") {
          this.totalPage = r.Data.Pagination.totalPage;
          this.totalCount = r.Data.Pagination.totalCount;
          this.tableData = r.Data.Results.map((e) => {
            if (e.shippingJson) e.shippingJson = JSON.parse(e.shippingJson);
            e.checked = false;
            e.reason = [];
            e.items.forEach(item => {
              if(item.reason)
                e.reason.push(item.reason)
            })
            e.reason = Array.from(new Set(e.reason)).join(', ')
            return e;
          });
          // this.$emit("getTableHeight", this);
          if (!s && this.$refs.gridTable) this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
        } else {
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
      localStorage.setItem("c_allOrdersRowsPerPage", val);
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
    onCopy(e) {
      this.$elementMessage('Has been copied to the clipboard', 'success');
    },
    onError(e) {
      this.$elementMessage('Copy to clipboard failed, please copy manually', 'error');
    },
  },
};
</script>

<style lang="scss" scoped>
.d-block .el-radio,
.d-block .el-checkbox {
  display: block;
  margin: 10px 0;
}
.el-cascader{
  margin-right: 10px;
  max-width: 170px;
}
</style>
