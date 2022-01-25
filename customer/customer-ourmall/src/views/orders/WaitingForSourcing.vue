<template>
  <div
    v-loading.fullscreen="loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <!-- filter -->
    <div ref="tablefilter">
      <div
        class="d-flex"
        style="justify-content: space-between; margin-bottom: 5px"
      >
        <div class="left d-flex">
          <!-- 筛选 vendors -->
          <div class="mg-r-10">
            <el-checkbox
              size="small"
              :disabled="tableData.some(e => {return e.loading})"
              v-model="allChecked"
              @change="changeAllChecked"
            >
              <span style="margin-right: 15px; font-size: 12px"
                >All ({{ totalOrdersNum }} / {{ totalAllOrdersNum }})</span
              >
            </el-checkbox>
            <el-select
              filterable
              size="mini"
              placeholder="My Vendor"
              v-model="filterParams.vendorId"
              @change="filterItems('vendor')"
            >
              <el-option
                v-for="vendor in vendors"
                :key="vendor.id"
                :label="vendor.vendorName"
                :value="vendor.id"
              ></el-option>
            </el-select>
          </div>
          <div class="mg-r-10">
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
            </div>
          <el-button-group class="mg-r-10" style="min-width: 420px">
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
                  style="max-height: 200px"
                >
                  <el-checkbox
                    v-for="tag in storeList"
                    :label="tag.shopifyAccountId"
                    :key="tag.shopifyAccountId"
                    @change="filterItems('store')"
                    >{{ tag.store }}</el-checkbox
                  >
                </el-checkbox-group>
                <div class="d-flex justify-content-end">
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
            <!-- 过滤订单号 -->
            <el-popover
              placement="bottom"
              title=""
              trigger="click"
              popper-class="d-block"
              v-model="popCodeFilter"
            >
              <div
                class="d-flex mg-b-10"
                style="justify-content: space-between; font-size: 12px"
              >
                <span class="mg-r-5">Order ID From: #</span>
                <el-input-number
                  size="mini"
                  :controls="false"
                  :min="0"
                  style="width: 100px"
                  placeholder="Number from"
                  v-model="orderMin"
                >
                </el-input-number>
              </div>
              <div
                class="d-flex mg-b-10"
                style="justify-content: space-between; font-size: 12px"
              >
                <span>Order ID To: #</span>
                <el-input-number
                  size="mini"
                  :controls="false"
                  :min="0"
                  style="width: 100px"
                  placeholder="Number to"
                  v-model="orderMax"
                >
                </el-input-number>
              </div>
              <div class="d-flex justify-content-end">
                <el-button
                  type="primary"
                  size="mini"
                  @click="tableSelect('range')"
                  >Confirm</el-button
                >
                <el-button size="mini" @click="tableSelect('remove')"
                  >Reset</el-button
                >
              </div>
              <el-button size="mini" slot="reference"
                >Order ID Range<i
                  class="el-icon-caret-bottom el-icon--right"
                ></i
              ></el-button>
            </el-popover>
          </el-button-group>
          <div style="min-width: 130px; height: 29px">
            <el-button type="primary" size="mini" @click="filterItems()"
              >Filter</el-button
            >
            <el-button type="danger" size="mini" @click="clearFilter()"
              >Clear</el-button
            >
          </div>
        </div>
        <div class="right">
          <!-- <el-button type="success" size="small" icon="el-icon-s-tools"
            @click="openSetPeriod"
          >Setting</el-button> -->
        </div>
      </div>
      <div style="margin-bottom: 5px">
        <el-tag
          v-if="filterParams.vendorId"
          size="small"
          type="info"
          closable
          @close="clearFilter('vendor')"
          class="mg-r-5"
          >{{ filterParams.vendorName }}</el-tag
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
          v-if="filterParams.orderMin || filterParams.orderMax"
          type="info"
          size="small"
          closable
          @close="tableSelect('remove')"
        >
          ID Range: <span>{{ filterParams.orderMin || "From" }}</span> -
          <span>{{ filterParams.orderMax || "To" }}</span>
        </el-tag>
      </div>
    </div>
    <!-- filter end -->
    <div class="table-wrap">
      <vxe-list
        v-if="tableData.length"
        :height="tableHeight"
        class="my-tree"
        ref="orderTree"
        :data="tableData"
        :scroll-y="{ gt: 50 }"
      >
        <template v-slot="{ items }">
          <div class="sourcing-item" v-for="item in items" :key="item._ID">
            <!-- 供应商 -->
            <el-row
              v-if="item._LEVEL === 0"
              :class="[
                { l0: item._LEVEL === 0 },
                { vendor_close: !item._EXPAND },
              ]"
              style="box-sizing: content-box; height: 32px"
            >
              <el-col :span="24" style="height: 32px">
                <div
                  class="d-flex"
                  style="padding-left: 15px; height: 32px; font-size: 15px"
                >
                  <a
                    class="mg-r-10"
                    href="javascript:;"
                    @click="toggleTreeNode(item)"
                  >
                    <i
                      class="fa"
                      :class="
                        item._EXPAND ? 'fa-minus-square' : 'fa-plus-square'
                      "
                    ></i>
                  </a>
                  <i class="mg-r-5 el-icon-user-solid"></i>
                  <span class="mg-r-15">
                    {{ item.vendorName }}
                    <span style="color: #909399; font-size: 12px">
                      {{
                        item.vendorId
                          ? `${$root.$children[0].pName.a} ID: ${item.vendorId}`
                          : "- Not joined"
                      }}
                    </span>
                  </span>
                  <span
                    v-if="selectedSkuNum(item)"
                    class="mg-r-15"
                    style="color: #909399"
                    >({{ selectedSkuNum(item) }} orders selected)</span
                  >
                </div>
              </el-col>
            </el-row>
            <!-- 商店 -->
            <el-row
              v-if="item._LEVEL == 1"
              :class="[
                { l1: item._LEVEL == 1 },
                { close_store: !item._EXPAND },
                { card_last: !item._EXPAND && item.last },
              ]"
              style="box-sizing: content-box; height: 32px; font-size: 13px"
            >
              <el-col :span="1"><div style="height: 32px"></div></el-col>
              <el-col :span="23">
                <div class="d-flex shop-wrap">
                  <a
                    v-if="item.children.length"
                    href="javascript:;"
                    class="mg-r-10"
                    @click="toggleTreeNode(item)"
                  >
                    <i
                      class="fa"
                      :class="
                        item._EXPAND ? 'fa-minus-square' : 'fa-plus-square'
                      "
                    ></i>
                  </a>
                  <el-checkbox
                    style="margin-bottom: 0; margin-right: 10px"
                    v-model="item.checked"
                    @change="storeAllChecked(item)"
                  ></el-checkbox>
                  <span class="mg-r-5">
                    <!-- <i class="iconfont icon-shopify"></i>  -->
                     <shopCate :items="item" />                    
                    {{ item.shopName }}
                  </span>
                  <span
                    v-if="selectedSkuNum(item)"
                    class="mg-r-15"
                    style="color: #909399"
                    >({{ selectedSkuNum(item) }} orders selected)</span
                  >
                  <span v-else style="color: #909399">(No order selected)</span>
                  <i v-if="item.loading" class="el-icon-loading"></i>
                </div>
              </el-col>
            </el-row>
            <!-- 订单 -->
            <el-row
              v-if="item._LEVEL == 2"
              :class="[
                { l2: item._LEVEL == 2 },
                { card_last: item.storeLast && item.last },
                { store_last: !item.storeLast && item.last },
                { bg: !item.bg },
              ]"
              style="box-sizing: content-box; height: 32px; font-size: 12px"
            >
              <el-col :span="1"><div style="height: 28px"></div></el-col>
              <el-col :span="23" class=" ">
                <div class="d-flex order-wrap">
                  <div style="width: 150px">
                    <el-checkbox
                      style="margin-bottom: 0"
                      v-model="item.checked"
                      @change="changeSkuChecked(item)"
                    >
                      {{ item.codeName }}
                      <span v-if="item.note" class="mg-l-5">
                        <el-tooltip
                          class="item"
                          effect="dark"
                          :content="item.note"
                          placement="top"
                        >
                          <i
                            style="font-size: 12px; width: 12px; color: #5c6ac4"
                            class="el-icon-info"
                          ></i>
                        </el-tooltip>
                      </span>
                    </el-checkbox>
                  </div>
                  <div style="width: 230px">
                    <span>{{
                      moment(item.timeCreated).format("ll [at] LTS")
                    }}</span>
                  </div>
                  <div class="tx-right" style="width: 100px">
                    <span v-if="item.currency"
                      >{{
                        ce[item.currency]
                          ? ce[item.currency].symbol
                          : item.currency
                      }}
                    </span>
                    {{ item.totalPrice }}
                  </div>
                  <div style="padding-left: 15px; width: 250px">
                    <fulfillMentStatusTag
                      :fulfillmentStatus="item.fulfillmentStatus"
                    />
                  </div>
                  <div style="width: 150px">
                    <popItems
                      v-if="item.items"
                      :items="item.items"
                      :fulfillmentStatus="item.fulfillmentStatus"
                    />
                  </div>
                </div>
              </el-col>
              <!-- <el-col v-if="item.storeLast && item.last" :span="24"></el-col>
              <el-col v-if="!item.storeLast && item.last" :span="24" style=" height: 10px;"></el-col> -->
            </el-row>
          </div>
        </template>
      </vxe-list>
      <div
        v-if="!tableData.length"
        class="tx-center"
        style="padding: 30px 0"
        :style="{ height: tableHeight + 'px' }"
      >
        <span style="color: #909399; font-size: 12px">No Data</span>
      </div>
    </div>
    <!-- table end -->
    <div ref="tableFooter">
      <div v-if="tableData.length" class="footer-wrap">
        <div class="left">
          <el-button
            :disabled="!purchaseNum"
            type="danger"
            size="mini"
            @click="unAllocate"
          >
            Un-allocate selected products
          </el-button>
        </div>
        <div class="right">
          <div style="margin-right: 50px">
            <span style="margin-right: 5px; color: #c0c4cc"
              >Total vendors:</span
            >
            {{ totalVendorsNum }}
          </div>
          <div style="margin-right: 50px">
            <span style="margin-right: 5px; color: #c0c4cc">Total orders:</span>
            {{ totalOrdersNum }}
          </div>
          <div>
            <el-button
              :disabled="!purchaseNum"
              type="primary"
              size="mini"
              @click="openToGenInvoice"
            >
              Place {{ purchaseNum }} purchase orders
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogToGenInvoice.isShow"
      v-loading="dialogToGenInvoice.loading"
      width="500px"
    >
      <div class="dialog-to-invoice">
        <div class="dialog-title">
          You're going to place
          <span class="tx-danger">{{ purchaseNum }}</span> orders to
          {{ totalVendorsNum }} vendors
        </div>
        <div class="dialog-text">
          You can choose the payment method you can accept, we will submit your
          orders and options to your vendors
        </div>
        <div class="dialog-choose">
          <el-checkbox-group v-model="dialogToGenInvoice.paymentType">
            <div v-for="pay in paymentArr" :key="pay.val">
              <el-checkbox :label="pay.val">{{ pay.text }}</el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
        <el-divider v-if="dialogToGenInvoice.onlyOne.length"></el-divider>
        <div v-if="dialogToGenInvoice.onlyOne.length" style="padding-top: 15px">
          <div style="margin-bottom: 10px; font-size: 12px">
            <span style="margin-right: 5px; color: #909399">Warm tips:</span>
            You have set the following products to be allocated to the vendors
            only once. Therefore, the following items will need to be
            re-allocated after the orders are generated again.
          </div>
          <el-table
            :data="dialogToGenInvoice.onlyOne"
            height="260"
            stripe
            style="width: 100%"
            class="only-one-table"
          >
            <el-table-column label="Product">
              <template slot-scope="scope">
                <div class="product-info">
                  <div class="image-wrap">
                    <el-image
                      :src="scope.row.imgUrl"
                      style="min-width: 50px; width: 50px; height: 50px"
                      :fit="'contain'"
                    >
                      <div slot="error" class="image-slot">
                        <i
                          class="el-icon-picture-outline"
                          style="color: #c0c4cc; font-size: 20px"
                        ></i>
                      </div>
                    </el-image>
                    <i>{{ scope.row.quantity }}</i>
                  </div>
                  <div class="info">
                    <div class="mg-b-10 tx-ellipsis2">{{ scope.row.name }}</div>
                    <div>{{ scope.row.propertyValue }}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Vendor" width="160">
              <template slot-scope="scope">
                <span style="font-size: 12px">{{ scope.row.vendorName }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogToGenInvoice.isShow = false"
          >Cancel</el-button
        >
        <el-button type="primary" size="small" @click="toGenInvoice">
          Place {{ purchaseNum }} orders NOW
        </el-button>
      </span>
    </el-dialog>
    <DialogNotice :data="dialogNoticeData" />
  </div>
</template>

<script>
import fulfillMentStatusTag from "./../../components/ShopifyStatus";
import popItems from "./../../components/PopItems";
import XEUtils from "xe-utils";
import DialogNotice from './../../components/Recharge/DialogNotice';
import shopCate from './../../components/shopCate'
export default {
  props: ["fulfillArr", "dateArr"],
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
      loading: false,
      tableHeight: 400,
      ce: this.$CE, //货币符号
      vendors: [],
      filterParams: {
        vendorId: "",
        vendorName: "",
        shopifyStore: [],
        timeFilter: "",
        dateFrom: "",
        dateTo: "",
        sortBy: "",
        orderMin: 0,
        orderMax: 0,
      },
      filterParamsDefault: "{}",
      orderMin: undefined,
      orderMax: undefined,
      storeList: [],
      shopifyStoreName: "",
      filterDate: [],
      popDateFilter: false,
      popStoreFilter: false,
      popCodeFilter: false,
      allChecked: true,
      tableData: [],
      AllTableData: [], //全数据备份
      submitI: 0,
      // dialogSetOrderPeriod: {
      //   isShow: false,
      //   loading: false,
      //   checked: false,
      //   period: undefined,
      // },
      // dialogSetOrderPeriodDefault: '{}',
      dialogToGenInvoice: {
        isShow: false,
        loading: false,
        paymentType: [1, 2, 3],
        onlyOne: [],
      },
      dialogToGenInvoiceDefault: "{}",
      paymentArr: [
        { text: "By AliExpress VIP link", val: 2 },
        { text: "PayPal", val: 1 },
        { text: "Bank transfer", val: 3 },
      ],
      lastId: "", //最后一个店铺id
      dialogNoticeData: {
        isShow: false,
      },
    };
  },
  mounted() {
    this.filterParamsDefault = JSON.stringify(this.filterParams);
    if (this.$route.params.id) {
      this.vendors.push({
        vendorName: this.$route.params.name,
        id: this.$route.params.id,
      });
      this.filterParams.vendorId = this.$route.params.id;
      this.filterParams.vendorName = this.$route.params.name;
    }
    // this.dialogSetOrderPeriodDefault = JSON.stringify(this.dialogSetOrderPeriod)
    this.dialogToGenInvoiceDefault = JSON.stringify(this.dialogToGenInvoice);
    this.getVendors();
    this.getStore();
    this.$nextTick(() => {
      // this.$emit("getTableHeight", this);
      this.getItems();
      setTimeout(()=>{
        $('.my-tree > .vxe-list--virtual-wrapper').css({'min-height': $(window).height()-400 + 'px', 'height': $(window).height()-400 + 'px'});
      },1100)
      
      window.onresize = () => {
        $('.my-tree > .vxe-list--virtual-wrapper').css({'min-height': $(window).height()-400 + 'px', 'height': $(window).height()-400 + 'px'});
        // this.$emit("getTableHeight", this);
      };
    });
  },
  destroyed() {
    window.onresize = () => {};
  },
  components: {
    fulfillMentStatusTag,
    popItems,
    DialogNotice,
    shopCate
  },
  computed: {
    AllOrderChecked() {
      let [orderNum, checkedOrderNum] = [0, 0];
      this.tableData.forEach((vendor) => {
        if (vendor._LEVEL === 0) {
          vendor.children.forEach((store) => {
            store.children.forEach((order) => {
              if (order._VISIBLE) orderNum++;
              if (order.checked) checkedOrderNum++;
            });
          });
        }
      });
      return orderNum && orderNum === checkedOrderNum;
    },
    checkedVariableId() {
      let ids = [];
      this.tableData.forEach((vendor) => {
        if (vendor._LEVEL === 0) {
          vendor.children.forEach((store) => {
            store.children.forEach((order) => {
              if (order.checked) {
                order.items.forEach((item) => {
                  ids.push(item.variableId);
                });
              }
            });
          });
        }
      });
      return Array.from(new Set(ids));
    },
    totalVendorsNum() {
      //选中的 vendors
      let num = 0;
      this.tableData.forEach((vendor) => {
        if (vendor._LEVEL === 0) {
          let checked = false;
          vendor.children.forEach((store) => {
            if (
              store.children.some((order) => {
                return order.checked;
              })
            ) {
              checked = true;
            }
          });
          if (checked) num++;
        }
      });
      return num;
    },
    totalOrdersNum() {
      //所有被选择订单数
      let arr = [];
      this.tableData.forEach((item) => {
        if (item._LEVEL === 0) {
          item.children.forEach((store) => {
            store.children.forEach((order) => {
              if (order.checked) arr.push(order.id);
            });
          });
        }
      });
      return Array.from(new Set(arr)).length;
    },
    totalAllOrdersNum() {
      //所有订单数量
      let arr = [];
      this.tableData.forEach((item) => {
        if (item._LEVEL === 0) {
          item.children.forEach((store) => {
            store.children.forEach((order) => {
              if (order._VISIBLE) arr.push(order.id);
            });
          });
        }
      });
      return Array.from(new Set(arr)).length;
    },
    purchaseNum() {
      let num = 0;
      this.tableData.forEach((item) => {
        if (item._LEVEL === 0) {
          item.children.forEach((store) => {
            if (
              store.children.some((order) => {
                return order.checked;
              })
            )
              num++;
          });
        }
      });
      return num;
    },
  },
  watch: {
    AllOrderChecked() {
      this.allChecked = this.AllOrderChecked;
    },
    tableHeight() {
      this.$nextTick(() => {
        this.refreshTree();
      });
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
  methods: {
    changeAllChecked() {
      //全选全不选
      this.tableData.forEach((vendor) => {
        if (vendor._LEVEL === 0) {
          vendor.children.forEach((store) => {
            this.$set(store, "checked", this.allChecked);
            store.children.forEach((order) => {
              this.$set(order, "checked", this.allChecked);
            });
          });
        }
      });
    },
    unAllocate() {
      //取消分配
      this.$confirm(
        `Un-allocate selected products? (orders: ${this.totalOrdersNum}, products: ${this.checkedVariableId.length})`,
        "",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Discard",
          confirmButtonClass: "el-button--danger",
          type: "info",
        }
      ).then(() => {
        this.loading = true;
        this.$apiCall(
          "api.DispatchOrderRule.unAllocate",
          { variableIds: this.checkedVariableId },
          (r) => {
            if (r.ErrorCode == "9999") {
              this.$emit("getNum");
              this.getItems(true);
              this.$elementMessage("UN-allocate Success", "success");
            } else {
              this.$elementMessage(r.Message, "error");
            }
          }
        );
      });
      setTimeout(() => {
        document.querySelectorAll(".el-button--primary").forEach((el) => {
          el.blur();
        });
      }, 200);
    },
    openToGenInvoice() {
      this.dialogToGenInvoice = JSON.parse(this.dialogToGenInvoiceDefault);
      this.dialogToGenInvoice.paymentType = localStorage.getItem("c_defaultPaymentType"
      )
        ? JSON.parse(localStorage.getItem("c_defaultPaymentType"))
        : [];
      this.tableData.forEach((vendor) => {
        if (vendor._LEVEL === 0) {
          vendor.children.forEach((store) => {
            store.children.forEach((order) => {
              if (order.checked) {
                order.items.forEach((item) => {
                  if (item.onlyOne == 1) {
                    item.vendorName = vendor.vendorName;
                    this.dialogToGenInvoice.onlyOne.push(item);
                  }
                });
              }
            });
          });
        }
      });
      //去重
      let hash = {};
      this.dialogToGenInvoice.onlyOne = this.dialogToGenInvoice.onlyOne.reduce(
        (item, next) => {
          hash[next.variableId]
            ? ""
            : (hash[next.variableId] = true && item.push(next));
          return item;
        },
        []
      );
      this.dialogToGenInvoice.isShow = true;
    },
    tableSelect(type) {
      if (type == "remove") {
        this.filterParams.orderMin = this.orderMin = undefined;
        this.filterParams.orderMax = this.orderMax = undefined;
        this.getItems();
      }
      if (type == "range") {
        if (!(this.orderMin || this.orderMax)) {
          this.$elementMessage("请输入单号范围", "error");
          return;
        }
        if (this.orderMin > this.orderMax) {
          this.$elementMessage("起始单号必须小于结束单号", "error");
          return;
        }
        this.filterParams.orderMin = this.orderMin;
        this.filterParams.orderMax = this.orderMax;
        // this.tableData.forEach(item => {
        //   if(item._LEVEL === 0){
        //     item.children.forEach(store => {
        //       store.children.forEach(order => {
        //         order._VISIBLE = (order.nCode >= this.filterParams.orderMin &&  order.nCode <= (this.filterParams.orderMax ? this.filterParams.orderMax : Number.POSITIVE_INFINITY))
        //       })
        //     })
        //   }
        // });
        this.tableData = this.AllTableData.slice();
        this.tableData.forEach((vendor) => {
          if (vendor._LEVEL === 0) {
            for (let i1 = 0; vendor.children.length > i1; i1++) {
              let store = vendor.children[i1];
              for (let i2 = 0; store.children.length > i2; i2++) {
                let order = store.children[i2];
                if (
                  !(
                    order.nCode >= this.filterParams.orderMin &&
                    order.nCode <=
                      (this.filterParams.orderMax
                        ? this.filterParams.orderMax
                        : Number.POSITIVE_INFINITY)
                  )
                ) {
                  store.children.splice(i2, 1);
                  i2--;
                }
              }
              if (!store.children.length) {
                vendor.children.splice(i1, 1);
                i1--;
              }
            }
            if (!vendor.children.length) vendor._VISIBLE = false;
          }
        });
      }
      this.refreshTree();
      this.popCodeFilter = false;
    },
    dateChange() {
      if (this.filterDate.length > 1) {
        this.filterParams.dateFrom = moment(this.filterDate[0]).unix();
        this.filterParams.dateTo = moment(this.filterDate[1])
          .endOf("d")
          .unix();
        //筛选
        this.getItems();
      }
    },
    clearFilter(type) {
      switch (type) {
        case "vendor":
          this.filterParams.vendorId = "";
          this.filterParams.vendorName = "";
          this.getItems();
          break;
        case "store":
          this.filterParams.shopifyStore = [];
          this.popStoreFilter = false;
          ++this.cascaderKey;
          this.getItems();
          break;
        case "date":
          this.filterParams.timeFilter = "";
          this.filterDate = [];
          this.filterParams.dateFrom = "";
          this.filterParams.dateTo = "";
          this.popDateFilter = false;
          this.getItems();
          break;
        default:
          this.filterParams = JSON.parse(this.filterParamsDefault);
          this.filterDate = [];
          this.tableSelect("remove");
      }
    },
    filterItems(type) {
      switch (type) {
        case "vendor":
          this.vendors.some((vendor) => {
            if (vendor.id == this.filterParams.vendorId) {
              this.filterParams.vendorName = vendor.vendorName;
              return true;
            }
          });
          break;
        case "date":
          this.filterDate = [];
          this.filterParams.dateFrom = "";
          this.filterParams.dateTo = "";
          break;
      }
      this.getItems();
    },
    // openSetPeriod(){

    // },
    toGenInvoice() {
      let paramsArr = [];
      this.tableData.forEach((vendor) => {
        if (vendor._LEVEL === 0) {
          vendor.children.forEach((store) => {
            let skus = [];
            store.children.forEach((order) => {
              if (order.checked) {
                order.items.forEach((sku) => {
                  skus.push(sku.id);
                });
              }
            });
            if (skus.length) {
              paramsArr.push({
                relationshipId: [vendor.id],
                skus,
              });
            }
          });
        }
      });
      this.submitI = 0;
      if (paramsArr.length) {
        this.dialogToGenInvoice.loading = true;
        this.genInvoice(paramsArr);
      }
    },
    genInvoice(paramsArr) {
      paramsArr[this.submitI].paymentType = this.dialogToGenInvoice.paymentType;
      localStorage.setItem("c_defaultPaymentType",
        JSON.stringify(this.dialogToGenInvoice.paymentType)
      );
      this.$apiCall("api.Invoice.genInvoice", paramsArr[this.submitI], (r) => {
        if(r.ErrorCode == "9998"){
          this.dialogToGenInvoice.loading = false;
          this.dialogToGenInvoice.isShow = false;
          this.dialogNoticeData.isShow = true;
          return;
        }
        if (r.ErrorCode == "9999") {
          this.submitI++;
          if (this.submitI < paramsArr.length) {
            this.genInvoice(paramsArr);
          } else {
            this.submitI = 0;
            this.dialogToGenInvoice.loading = false;
            this.dialogToGenInvoice.isShow = false;
            this.$router.push({ name: "OrderProcessing" ,params:{verify:'email'}});
            // this.getItems(true);
            // this.$elementMessage('Success', "success");
          }
        } else {
          this.$elementMessage(r.Message, "error");
          this.dialogToGenInvoice.loading = false;
          this.submitI = 0;
        }
      });
    },
    changeSkuChecked(item) {
      this.tableData.forEach((itm) => {
        if (itm._LEVEL == 1 && itm._ID == item.parent_ID) {
          this.$set(
            itm,
            "checked",
            itm.children.length &&
              this.selectedSkuNum(itm) == itm.children.length
          );
        }
      });
    },
    storeAllChecked(item) {
      //店铺全选 全不选
      item.children.forEach((sku) => {
        this.$set(sku, "checked", item.checked);
      });
    },
    selectedSkuNum(item) {
      // 商品被选择数量
      let num = 0;
      if (item._LEVEL == 1) {
        //店铺下
        item.children.forEach((sku) => {
          if (sku.checked) num++;
        });
      } else if (item._LEVEL == 0) {
        //账号下
        item.children.forEach((store) => {
          store.children.forEach((sku) => {
            if (sku.checked) num++;
          });
        });
      }
      return num;
    },
    toggleTreeNode(row) {
      if (row._HAS_CHILDREN) {
        this.setTreeExpand(row, !row._EXPAND);
      }
    },
    setTreeExpand(row, isExpand) {
      const matchObj = XEUtils.findTree(this.tree, (item) => item === row);
      row._EXPAND = isExpand;
      if (matchObj) {
        XEUtils.eachTree(
          matchObj.item.children,
          (item, index, items, path, parent) => {
            item._VISIBLE = parent
              ? parent._EXPAND && parent._VISIBLE
              : isExpand;
          }
        );
      }
      this.refreshTree();
    },
    getVendors() {
      this.$apiCall("api.Relationship.findByCustomer", {}, (r) => {
        if (r.ErrorCode == "9999") {
          this.vendors = r.Data.Results;
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    refreshTree() {
      this.tableData.forEach((vendor) => {
        if (vendor._LEVEL === 0) {
          vendor.children.forEach((store, i1) => {
            this.$set(store, "last", i1 == vendor.children.length - 1); //是否最后商店
            store.children.forEach((order, i2) => {
              this.$set(order, "storeLast", store.last); //最后商店的商品
              this.$set(order, "last", i2 == store.children.length - 1); //是否最后商品
              this.$set(order, "bg", i2 % 2); //斑马
            });
          });
        }
      });
      const treeList = XEUtils.toTreeArray(this.tree);
      this.fullList = treeList;
      this.tableData = treeList.filter((item) => item._VISIBLE);
      this.$emit("getTableHeight", this);
    },
    allTreeExpand() {
      XEUtils.eachTree(this.tree, (item) => {
        item._EXPAND = item._HAS_CHILDREN;
        item._VISIBLE = true;
      });
      this.refreshTree();
    },
    getProducts(type) {
      this.tableData.some((item, index) => {
        if (item._LEVEL == 1 && item.loading) {
          let params = {
            timeFilter:
              this.filterParams.timeFilter >= 6
                ? ""
                : this.filterParams.timeFilter,
            dateFrom: this.filterParams.dateFrom,
            dateTo: this.filterParams.dateTo,
            relationshipId: item.relationshipId,
            accountIds: [item.id],
          };
          this.$apiCall("api.Invoice.shopifyOrders", params, (r) => {
            if (r.ErrorCode == "9999") {
              item.children = [];
              let data = r.Data.Results;
              if (data.length) {
                item._EXPAND = true;
                item._HAS_CHILDREN = true;
                data.forEach((order, index) => {
                  order._ID = item._ID + "_" + order.id;
                  order._LEVEL = 2;
                  order._EXPAND = false;
                  order._VISIBLE = true;
                  order._HAS_CHILDREN = false;
                  order._IS_LEAF = !order._HAS_CHILDREN;
                  if (type) {
                    order.checked = false;
                  } else {
                    order.checked = this.allChecked;
                  }
                  order.checked = !type;
                  order.parent_ID = item._ID;
                  let codeArr = order.codeName;
                  codeArr = codeArr.replace(/[^0-9]/gi, ",");
                  codeArr = codeArr.split(",");
                  codeArr = codeArr.filter((s) => {
                    return s && s.trim();
                  });
                  let nMax = 0;
                  codeArr.forEach((n) => {
                    if (n > nMax) {
                      nMax = n;
                    }
                  });
                  order.nCode = nMax;
                  item.children.push(order);
                });
              } else {
                item._EXPAND = false;
                item._HAS_CHILDREN = false;
              }
            } else {
              this.$elementMessage(r.Message, "error");
            }
            item.loading = false;
            this.refreshTree();
            if (index < this.tableData.length) {
              this.getProducts(type);
            }
            this.AllTableData = this.tableData.slice();
            if (
              item.id == this.lastId &&
              (this.filterParams.orderMin || this.filterParams.orderMax)
            ) {
              this.tableSelect("range");
            }
          });
          return true;
        }
      });
    },
    getItems(type) {
      this.loading = true;
      let arr = [];
      if(this.filterParams.shopifyStore[1]){
      arr.push(this.filterParams.shopifyStore[1])  
      }
      let params = {
        relationshipId: this.filterParams.vendorId,
        accountIds: arr,
      };
      this.$apiCall("api.Invoice.findOrderRelationships", params, (r) => {
        this.loading = false;
        if (r.ErrorCode == "9999") {
          this.tableData = [];
          let data = r.Data.Results;
          if (!data.length) return;
          let lastAccount =
            data[data.length - 1].accounts[
              data[data.length - 1].accounts.length - 1
            ];
          this.lastId = lastAccount.id;
          data.forEach((item) => {
            this.$set(item.vendorInfo, "_ID", item.vendorInfo.id);
            this.$set(item.vendorInfo, "_LEVEL", 0);
            this.$set(item.vendorInfo, "_EXPAND", true);
            this.$set(item.vendorInfo, "_VISIBLE", true);
            this.$set(item.vendorInfo, "_HAS_CHILDREN", true);
            this.$set(
              item.vendorInfo,
              "_IS_LEAF",
              !item.vendorInfo._HAS_CHILDREN
            );
            item.vendorInfo.children = [];
            item.accounts.forEach((account, index) => {
              if (account) {
                account._ID = item.vendorInfo.id + "_" + account.id;
                account._LEVEL = 1;
                account._EXPAND = false;
                account._VISIBLE = true;
                account._HAS_CHILDREN = false;
                account._IS_LEAF = !account._HAS_CHILDREN;
                account.children = [];
                account.loading = true;
                if (type) {
                  account.checked = false;
                } else {
                  account.checked = this.allChecked;
                }
                account.relationshipId = item.vendorInfo.id;
                item.vendorInfo.children.push(account);
              }
            });
            this.tableData.push(item.vendorInfo);
          });
          this.tree = this.tableData;
          this.allTreeExpand();
          this.$nextTick(() => {
            this.getProducts(type);
          });
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
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
  },
};
</script>
<style lang="scss" scoped>

.table-wrap {
  border-top: 1px #dcdfe6 solid;
}
.footer-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
  background-color: rgba(48, 49, 51, 0.9);
  border-radius: 4px;
  color: #fff;
  .right {
    display: flex;
    align-items: center;
  }
}
.d-block .el-radio,
.d-block .el-checkbox {
  display: block;
  margin: 10px 0;
}
.sourcing-item {
  > .el-row {
    background-color: #fff;
    box-shadow: 3px 0 1px #f0f0f0;
    > .el-col {
      background-color: #fff;
    }
  }
  .shop-wrap {
    padding-left: 15px;
    border: 1px #dcdfe6 solid;
    border-bottom-color: #ebeef5;
    width: 900px;
    height: 32px;
  }
  .order-wrap {
    padding-left: 60px;
    border-left: 1px #dcdfe6 solid;
    border-right: 1px #dcdfe6 solid;
    width: 900px;
    height: 32px;
  }
  .order-wrap:hover {
    background-color: #f2f6fc;
  }
  .bg {
    .order-wrap {
      background-color: #f6f6f6;
    }
    .order-wrap:hover {
      background-color: #f2f6fc;
    }
  }
  .card_last .order-wrap,
  .store_last .order-wrap {
    border-bottom: 1px #dcdfe6 solid;
  }
}
.l0 {
  margin-top: 15px;
  width: 980px;
  border: 1px #e4e7ed solid;
  border-bottom: none;
}
.l0.vendor_close {
  border-bottom: 1px #e4e7ed solid;
  box-shadow: 1px 2px 1px 2px #f0f0f0 !important;
}
.l1 {
  width: 980px;
  border-left: 1px #e4e7ed solid;
  border-right: 1px #e4e7ed solid;
}
.l1.close_store {
  height: 42px !important;
  .shop-wrap {
    border-bottom-color: #dcdfe6;
  }
}
.l2 {
  width: 980px;
  border-left: 1px #e4e7ed solid;
  border-right: 1px #e4e7ed solid;
}
.card_last {
  height: 42px !important;
  border-bottom: 1px #e4e7ed solid;
  box-shadow: 1px 2px 1px 2px #f0f0f0 !important;
}
.store_last {
  height: 42px !important;
}
.dialog-to-invoice {
  padding: 0 15px;
  .dialog-title {
    margin-bottom: 15px;
    font-weight: bold;
  }
  .dialog-text {
    margin-bottom: 10px;
    line-height: 26px;
  }
  .dialog-choose {
    margin-bottom: 15px;
    padding-left: 40px;
  }
}
.only-one-table {
  .product-info {
    display: flex;
    font-size: 12px;
    .image-wrap {
      position: relative;
      width: 50px;
      height: 50px;
      margin-right: 10px;
      > i {
        position: absolute;
        top: 1px;
        right: -6px;
        width: 22px;
        height: 16px;
        line-height: 16px;
        font-style: normal;
        font-size: 12px;
        color: #606266;
        background: #dcdfe6;
        text-align: center;
        border-radius: 8px;
      }
      .el-image {
        border: 1px #ebeef5 solid;
      }
    }
    .info {
      line-height: 16px;
      font-size: 12px;
      > div {
        font-size: 12px;
      }
    }
  }
}
</style>
