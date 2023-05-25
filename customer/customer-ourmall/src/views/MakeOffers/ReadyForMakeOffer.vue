<template>
  <div
    v-loading.fullscreen="loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <div ref="tablefilter" class="make-offer-filter">
      <div style="margin-bottom: 5px; font-size: 12px">
        <!-- 筛选 -->
        <div style="margin-bottom: 5px">
          <div class="left d-flex" style="position: relative; flex-wrap: wrap">
            <el-checkbox
              size="small"
              v-model="AllChecked"
              @change="changeAllChecked"
            >
              <span style="margin-right: 15px; font-size: 12px"
                >{{$t('All')}} ({{ CAllChecked.num }} / {{ tableData.length }})</span
              >
            </el-checkbox>
            <div class="mg-r-10">
              <el-input
                @keyup.enter.native="filterItems('name')"
                @clear="clearFilter('name')"
                v-model="codeName"
                size="mini"
                placeholder="Order ID"
                style="width: 190px"
              >
                <template slot="prepend"> # </template>
              </el-input>
            </div>
            <el-cascader
              size="mini"
              v-model="filterParams.shopifyStore"
              :placeholder="$t('All my stores')"
              :key="cascaderKey"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              @change="filterItems('store')"
            >
            </el-cascader>

            <el-button-group class="mg-r-10" style="height: 28px">
              <!-- 筛选店铺 -->
              <!-- <el-popover
                placement="bottom"
                title=""
                trigger="click"
                popper-class="d-block"
                v-model="popStoreFilter"
              >
                <div>
                  <el-checkbox-group
                    v-model="filterParams.shopifyStore"
                    style=" max-height: 200px;"
                  >
                    <el-checkbox
                      v-for="tag in storeList"
                      :label="tag.shopifyAccountId"
                      :key="tag.shopifyAccountId"
                      @change="filterItems('store')"
                      >{{ tag.store }}</el-checkbox
                    >
                  </el-checkbox-group>
                  <div class=" d-flex justify-content-end">
                    <el-link
                      type="danger"
                      :disabled="!filterParams.shopifyStore.length"
                      @click="clearFilter('store')"
                      >Clear</el-link
                    >
                  </div>
                </div>
                <el-button size="mini" slot="reference"
                  >My Stores<i
                    class="el-icon-caret-bottom el-icon--right"
                  ></i
                ></el-button>
              </el-popover> -->
              <!-- 筛选时间段 -->
              <el-popover
                placement="bottom"
                title=""
                trigger="click"
                popper-class="d-block"
                v-model="popDateFilter"
              >
                <el-radio-group
                  v-model="filterParams.timeFilter"
                  @change="filterItems('date')"
                  style="max-height: 200px"
                >
                  <el-radio v-for="(time, k) in dateArr" :key="k" :label="k">{{
                    time
                  }}</el-radio>
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
                <div class="d-flex justify-content-end">
                  <el-link
                    type="danger"
                    :disabled="!filterParams.timeFilter"
                    @click="clearFilter('date')"
                    >Clear</el-link
                  >
                </div>
                <el-button size="mini" slot="reference"
                  >Date Ranges<i class="el-icon-caret-bottom el-icon--right"></i
                ></el-button>
              </el-popover>

              <!-- 排序 -->
              <el-popover
                placement="bottom"
                title=""
                trigger="click"
                popper-class="d-block"
                v-model="popSortFilter"
              >
                <el-radio-group
                  v-model="filterParams.sortBy"
                  @change="filterItems('sort')"
                >
                  <el-radio v-for="(sort, k) in sortArr" :key="k" :label="k">{{
                    sort
                  }}</el-radio>
                </el-radio-group>
                <div class="d-flex justify-content-end">
                  <el-link
                    type="danger"
                    :disabled="!filterParams.sortBy"
                    @click="clearFilter('sort')"
                    >{{$t('Clear')}}</el-link
                  >
                </div>
                <el-button size="mini" slot="reference"
                  >{{$t('SortBy')}}<i class="el-icon-caret-bottom el-icon--right"></i
                ></el-button>
              </el-popover>
            </el-button-group>
            <div style="min-width: 130px">
              <el-button type="primary" size="mini" @click="filterItems()"
                >{{$t('Filter')}}
              </el-button>
              <el-button type="danger" size="mini" @click="clearFilter()"
                >{{$t('Clear')}}</el-button
              >
            </div>

            <!-- 全部勾选提示 -->
            <el-alert
              v-if="tableData.length && CAllChecked.num"
              type="warning"
              center
              show-icon
              :closable="false"
              style="margin: 0 20px; max-width: 400px; font-size: 12px"
            >
              <div slot="title">
                <el-link
                  type="warning"
                  v-if="CAllChecked.num == tableData.length"
                  @click="changeAllChecked(false)"
                  >{{ CAllChecked.num }} {{$t('orders selected, uncheck')}}</el-link
                >
                <el-link
                  type="primary"
                  v-if="CAllChecked.num && CAllChecked.num < tableData.length"
                  @click="changeAllChecked(true)"
                >
                  {{ CAllChecked.num }} {{$t('orders selected, select all')}} ({{
                    tableData.length
                  }}) {{$t('orders')}}
                </el-link>
              </div>
            </el-alert>

            <div
              style="
                flex: 1;
                text-align: right;
                position: absolute;
                top: -56px;
                right: 0;
              "
            >
              <el-button type="primary" @click="quotation()" size="small">
                <i class="el-icon-plus"></i> {{$t('Request Quotation')}}
              </el-button>
              <el-button
                type="primary"
                size="small"
                :disabled="!CAllChecked.num"
                @click="makeAnOffer"
              >
               {{$t('Create quotation request')}} 
              </el-button>
            </div>
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
            >#{{ filterParams.codeName }}</el-tag
          >
          <el-tag
            v-if="filterParams.shopifyStore.length"
            size="small"
            type="info"
            closable
            @close="clearFilter('store')"
            class="mg-r-5"
            >{{ shopifyStoreName }}</el-tag
          >
          <el-tag
            v-if="filterParams.timeFilter"
            size="small"
            type="info"
            closable
            @close="clearFilter('date')"
            class="mg-r-5"
          >
            {{ dateArr[filterParams.timeFilter] }}
            <span v-if="filterParams.timeFilter == 6 && filterDate.length">
              {{ filterDate[0] }}--{{ filterDate[1] }}
            </span>
          </el-tag>
          <el-tag
            v-if="filterParams.fulfillStatus.length"
            size="small"
            type="info"
            closable
            @close="clearFilter('fulfill')"
            class="mg-r-5"
          >
            {{
              filterParams.fulfillStatus[0] == "unfulfilled"
                ? "Unfulfilled"
                : "Partially fulfilled"
            }}<span v-if="filterParams.fulfillStatus.length > 1"
              >,{{
                filterParams.fulfillStatus[1] == "unfulfilled"
                  ? "Unfulfilled"
                  : "Partially fulfilled"
              }}</span
            >
          </el-tag>
          <el-tag
            v-if="filterParams.sortBy"
            size="small"
            type="info"
            closable
            @close="clearFilter('sort')"
            class="mg-r-5"
            >{{ sortArr[filterParams.sortBy] }}</el-tag
          >
        </div>
        <div
          class="d-flex"
          style="
            margin-bottom: 5px;
            justify-content: space-between;
            font-size: 12px;
          "
        >
          <div style="flex: 2">
            <el-alert type="warning" :closable="false">
              <div slot="title" class="table-wrap">
                * Only orders in
                <span
                  style="margin-right: 5px"
                  class="el-tag el-tag--info el-tag--small el-tag--light"
                  ><span class="-EFlq bg3"></span>{{$t('Paid')}} 
                </span>

                <span style="margin-right: 5px"
                  ><span
                    class="el-tag el-tag--warning el-tag--small el-tag--light"
                    ><span class="-EFlq bg1"></span> {{$t('Unfulfilled')}}
                  </span></span
                >

                <span style="margin-right: 5px"
                  ><span
                    class="shopfiy-status el-tag el-tag--danger el-tag--small el-tag--light"
                    ><span class="-EFlq bg2"></span>{{$t('Partially Fulfilled')}} 
                  </span></span
                >
                can <b style="color: #606266">[{{$t('Create quotation request')}}]</b>
              </div>
            </el-alert>
          </div>
          <!-- <div style=" flex: 1; text-align: right;">
            <el-button type="primary" size="small"
              :disabled="!CAllChecked.num"
              @click="makeAnOffer"
            >
              Create quotation request
            </el-button>
          </div> -->
        </div>
      </div>
      <div class="table-wrap">
        <el-table :data="tableData" stripe ref="gridTable">
          <el-table-column :label="$t('Order')" prop="codeName" width="80" fixed>
            <template slot-scope="scope">
              <el-checkbox
                style="margin-right: 5px"
                v-model="scope.row.checked"
              ></el-checkbox>
              <span>{{ scope.row.codeName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('My Store')" prop="codeName" width="170">
            <template slot-scope="scope">
              <div
                class="tx-ellipsis1"
                style="display: inline-block; max-width: 200px; font-size: 12px"
              >
                <shopCate :items="scope.row" /> {{ scope.row.store }}
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Date')" width="180">
            <template slot-scope="scope">
              {{ moment(scope.row.timeCreated).format("ll [at] LTS") }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('Customer')" width="140">
            <template slot-scope="scope">
              <popShippingJson
                :item="scope.row"
                @onCopy="onCopy"
                @onError="onError"
              />
            </template>
          </el-table-column>
          <el-table-column :label="$t('Total')" align="center">
            <template slot-scope="scope">
              <span>{{
                ce[scope.row.currency]
                  ? ce[scope.row.currency].symbol
                  : scope.row.currency
              }}</span>
              {{ scope.row.totalPrice }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('Payment')" width="150">
            <template slot-scope="scope">
              <el-tag
                v-if="
                  scope.row.financialStatus &&
                  scope.row.financialStatus != 'voided'
                "
                size="small"
                :type="paymentArr[scope.row.financialStatus].type"
              >
                <span
                  class="-EFlq"
                  :class="`bg${paymentArr[scope.row.financialStatus].r}`"
                ></span>
                {{ paymentArr[scope.row.financialStatus].text }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Fulfillment')" width="150">
            <template slot-scope="scope">
              <fulfillMentStatusTag
                :fulfillmentStatus="scope.row.fulfillmentStatus"
              />
            </template>
          </el-table-column>
          <el-table-column :label="$t('Items')">
            <template slot-scope="scope">
              <popItems
                v-if="scope.row.items"
                :items="scope.row.items"
                :fulfillmentStatus="scope.row.fulfillmentStatus"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div ref="tableFooter">
        <el-row v-if="tableData.length" :gutter="20">
          <el-col :span="24" class="d-flex justify-content-center">
            <div style="position: relative; top: 10px">
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
      <!-- <Quotation :visible.sync="visible"></Quotation> -->
    </div>
  </div>
</template>

<script>
import popShippingJson from "./../../components/PopShippingJson";
import fulfillMentStatusTag from "./../../components/ShopifyStatus";
import popItems from "./../../components/PopItems";
import shopCate from "./../../components/shopCate";
import Quotation from "../../components/productQuotation";

export default {
  props: ["dateArr", "sortArr", "paymentArr", "storeList", "options"],
  data() {
    return {
      visible: false,
      cascaderKey: 1,
      loading: false,
      AllChecked: false,
      tableData: [],
      pageSize: [20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("c_ReadyForMakeOfferRowsPerPage")
        ? Number(localStorage.getItem("c_ReadyForMakeOfferRowsPerPage"))
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
      },
      filterParamsDefault: "{}",
      shopifyStoreName: "",
      popStoreFilter: false,
      popFulfillFilter: false,
      popDateFilter: false,
      popSortFilter: false,
      filterDate: [],
    };
  },
  components: {
    popShippingJson,
    fulfillMentStatusTag,
    popItems,
    shopCate,
    Quotation,
  },
  watch: {
    $route: "gotoPage",
    CAllChecked() {
      this.AllChecked = this.CAllChecked.status;
    },
    "filterParams.shopifyStore"() {
      if (!this.filterParams.shopifyStore.length) return;
      let arr = [];
      this.filterParams.shopifyStore.forEach((e) => {
        this.storeList.forEach((item) => {
          if (e == item.shopifyAccountId) {
            arr.push(item.store);
          }
        });
      });
      this.shopifyStoreName = arr.join(",");
    },
  },
  computed: {
    checkedOrder() {
      //选中的id 数组
      return this.tableData.filter((order) => {
        return order.checked;
      });
    },
    CAllChecked() {
      //是否全选
      let [num, skus] = [0, []];
      this.tableData.forEach((order) => {
        if (order.checked) {
          num++;
          order.items.forEach((itm) => {
            skus.push(itm.id);
          });
        }
      });
      return {
        num,
        status: num && num == this.tableData.length,
        skus,
      };
    },
  },
  mounted() {
    this.filterParamsDefault = JSON.stringify(this.filterParams);
    this.getItems();
  },
  methods: {
    quotation() {
      this.visible = true;
    },
    makeAnOffer() {
      //生成 make an offer
      this.$confirm(this.$t("Create quotation request?"), "", {
        confirmButtonText: "OK",
        cancelButtonText: "Discard",
        type: "info",
      }).then(() => {
        this.loading = true;
        this.$apiCall(
          "api.OfferList.genOffer",
          { skus: this.CAllChecked.skus },
          (r) => {
            this.loading = false;
            if (r.ErrorCode == "9999") {
              this.$elementMessage("success", "success");
              this.$router.push({ name: "WaitingForVendorsRespond" });
            } else {
              this.$elementMessage(r.Message, "error");
            }
          }
        );
      });
      setTimeout(() => {
        //取消弹层显示时 按钮默认 focus
        document
          .querySelectorAll(".el-message-box__btns .el-button")
          .forEach((e) => {
            e.blur();
          });
      }, 200);
    },
    changeAllChecked(bool) {
      this.AllChecked = bool;
      //全选全不选
      this.tableData.forEach((e) => {
        this.$set(e, "checked", this.AllChecked);
      });
    },
    filterItems(type) {
      switch (type) {
        case "name":
          this.filterParams.codeName = this.codeName.replace(/#/g, "");
          break;
        case "date":
          this.filterDate = [];
          this.filterParams.dateFrom = "";
          this.filterParams.dateTo = "";
          break;
        default:
          this.filterParams.codeName = this.codeName.replace(/#/g, "");
          break;
      }
      if (this.timeFilter != 6) this.resetPage();
    },
    clearFilter(type) {
      // this.$Burying()
      switch (type) {
        case "name":
          this.filterParams.codeName = this.codeName = "";
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
        default:
          this.filterParams = JSON.parse(this.filterParamsDefault);
          this.codeName = "";
          this.filterDate = [];
      }
      this.resetPage();
    },
    getItems(s) {
      this.loading = true;
      let arr = [];
      if (this.filterParams.shopifyStore[1]) {
        arr.push(this.filterParams.shopifyStore[1]);
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
        waitDispatch: 1,
      };

      this.$apiCall("api.Invoice.shopifyOrders", params, (r) => {
        this.loading = false;
        if (r.ErrorCode == "9999") {
          this.totalPage = r.Data.Pagination.totalPage;
          this.totalCount = r.Data.Pagination.totalCount;
          this.tableData = r.Data.Results.map((e) => {
            e.checked = false;
            e.shippingJson = JSON.parse(e.shippingJson);
            return e;
          });
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    dateChange() {
      if (this.filterDate.length > 1) {
        this.filterParams.dateFrom = moment(this.filterDate[0]).unix();
        this.filterParams.dateTo = moment(this.filterDate[1])
          .endOf("d")
          .unix();
        //筛选
        this.resetPage();
      }
    },
    gotoPage() {
      this.page = this.$route.query.page ? this.$route.query.page : 1;
      this.getItems();
    },
    toPage(val) {
      if (val != this.$route.query.page)
        this.$router.push({
          query: {
            page: val,
          },
        });
    },
    resetPage() {
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
    changePageSize(val) {
      this.rowsPerPage = val;
      localStorage.setItem("c_ReadyForMakeOfferRowsPerPage", val);
      this.getItems();
    },
    onCopy(e) {
      this.$elementMessage(this.$t("Has been copied to the clipboard"), "success");
    },
    onError(e) {
      this.$elementMessage(
        this.$t("Copy to clipboard failed, please copy manually"),
        "error"
      );
    },
  },
};
</script>


<style lang="scss" scoped>
.el-button--primary:focus {
  background-color: #5c6ac4;
  border-color: #5c6ac4;
}
.d-block .el-radio,
.d-block .el-checkbox {
  display: block;
  margin: 10px 0;
}
.el-cascader {
  margin-right: 10px;
}
</style>
