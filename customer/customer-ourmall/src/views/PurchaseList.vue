<template>
  <div class="contentpanel p-l-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-receiving"></i>
          <h2>Purchase List</h2>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="pagebody" v-loading="loading">
      <el-row :gutter="15" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <!-- 筛选状 -->
            <el-row :gutter="20" class="mg-b-10">
              <el-col :span="24">
                <div ref="pageFilter" class="page-filter">
                  <el-form :inline="true" size="mini">
                    <el-form-item label="Order Number:">
                      <el-input
                        v-model="iptCode"
                        placeholder="Enter Order Number"
                        style="width: 180px"
                        :clearable="true"
                        @clear="clearFilter('code')"
                        @keyup.enter.native="filtergetItem('c_code')"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="SKU:">
                      <el-input
                        v-model="iptSku"
                        placeholder="Enter SKU"
                        style="width: 180px"
                        :clearable="true"
                        @clear="clearFilter('sku')"
                        @keyup.enter.native="filtergetItem('c_sku')"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="Product Name:">
                      <el-input
                        v-model="iptName"
                        placeholder="Enter Product Name"
                        style="width: 180px"
                        :clearable="true"
                        @clear="clearFilter('name')"
                        @keyup.enter.native="filtergetItem('c_name')"
                      ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="filterGetItem()"
                        >Filter</el-button
                      >
                      <el-button type="danger" @click="clearFilter()"
                        >Clear</el-button
                      >
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
            <!-- 筛选状态 -->
            <el-row :gutter="10" style="margin-bottom: 5px">
              <el-col :span="24">
                <el-tag
                  v-if="filterParams.code"
                  size="small"
                  type="info"
                  closable
                  @close="clearFilter('code')"
                  class="mg-r-5"
                  >{{ filterParams.code }}</el-tag
                >
                <el-tag
                  v-if="filterParams.sku"
                  size="small"
                  type="info"
                  closable
                  @close="clearFilter('sku')"
                  class="mg-r-5"
                  >{{ filterParams.sku }}</el-tag
                >
                <el-tag
                  v-if="filterParams.name"
                  size="small"
                  type="info"
                  closable
                  @close="clearFilter('name')"
                  class="mg-r-5"
                  >{{ filterParams.name }}</el-tag
                >
              </el-col>
            </el-row>
            <!-- 表格 -->
            <el-row :gutter="0" class="table-title">
              <el-col :span="9" class="tx-center">Products</el-col>
              <el-col :span="2" class="tx-center">Price</el-col>
              <el-col :span="2" class="tx-center">Quantity</el-col>
              <el-col :span="3" class="tx-center">Status</el-col>
              <el-col :span="4" class="tx-center">Tracking Number</el-col>
              <el-col :span="4" class="tx-center">Action</el-col>
            </el-row>
            <el-row
              v-for="item in items"
              :key="item.id"
              :gutter="0"
              class="table-data"
            >
              <el-col :span="24" class="t-row-1">
                <span class="mg-r-15">{{
                  moment.unix(item.timeCreated).format("ll [at] LTS")
                }}</span>
                <span class="mg-r-20" style="color: #909399">
                  Order Number:
                  <span class="mg-l-5" style="color: #606266">{{
                    item.code
                  }}</span>
                </span>
                <el-button size="mini" plain @click="toDetail(item)">View Details</el-button>
              </el-col>
              <div style="clear: both"></div>
              <div
                v-for="(sku, si) in item.items"
                :key="sku.id"
                class="product-row"
              >
                <el-col :span="9" class="td-product-info">
                  <a  v-if="vendorId != 148982 && vendorId != 146428&& vendorId != 144875&& vendorId != 144843&& vendorId != 143779&& vendorId != 143654&& vendorId != 140694&& vendorId != 74"
                    :href="`/item/${sku.productId}/${sku.name
                      .replace(/\s+/g, '-')
                      .replace(/[^\w]/g, '_')}.html`"
                    target="_blank"
                  >
                    <el-image
                      class="product-img"
                      :fit="'cover'"
                      @click="productClick(sku.productId)"
                      :src="sku.product ? sku.product.imgUrl : sku.propertyImage"
                      lazy
                    >
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                  </a>
                  <a v-else
                    :href="`/itemOld/${sku.productId}/${sku.name
                      .replace(/\s+/g, '-')
                      .replace(/[^\w]/g, '_')}.html`"
                    target="_blank"
                  >
                    <el-image
                      class="product-img"
                      :fit="'cover'"
                      @click="productClick(sku.productId)"
                      :src="sku.product ? sku.product.imgUrl : sku.propertyImage"
                      lazy
                    >
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                  </a>
                  <div class="right">
                    <a   v-if="vendorId != 148982 && vendorId != 146428&& vendorId != 144875&& vendorId != 144843&& vendorId != 143779&& vendorId != 143654&& vendorId != 140694&& vendorId != 74"
                      @click="productClick(sku.productId)"
                      class="name tx-ellipsis2"
                      :href="`/item/${
                        sku.productId
                      }/${sku.name
                        .replace(/\s+/g, '-')
                        .replace(/[^\w]/g, '_')}.html`"
                      target="_blank"
                    >
                      {{ sku.name }}
                    </a>
                    <a   v-else
                      @click="productClick(sku.productId)"
                      class="name tx-ellipsis2"
                      :href="`/itemOld/${
                        sku.productId
                      }/${sku.name
                        .replace(/\s+/g, '-')
                        .replace(/[^\w]/g, '_')}.html`"
                      target="_blank"
                    >
                      {{ sku.name }}
                    </a>                    
                    <div>{{formatAttr(sku.stock ? sku.stock.propertyValue : sku.propertyValue)}}</div>
                    <div class="sku">
                      SKU
                      <span style="color: #303133">{{ sku.sku }}</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="2" class="td-price">
                  <span>$ {{ Number(sku.price).toFixed(2) }}</span>
                  <i class="el-icon-close"></i>
                </el-col>
                <el-col :span="2" class="td-qty">{{ sku.oQuantity }}</el-col>
                <el-col :span="3" class="td-s">
                  <div :class="{ last: si + 1 == item.items.length }">
                    <span
                      v-if="!si"
                      :class="$dict.PurchaseStatus[item.status].color"
                      >{{ $dict.PurchaseStatus[item.status].text }}</span
                    >
                  </div>
                  <!-- <div class=" s2"></div> -->
                </el-col>
                <el-col :span="4" class="td-tk-num">
                  <template v-if="item.status == 5 || item.status == 6">
                    <div v-if="item.shippingJSONObj">{{item.shippingJSONObj.trackCompany || '---'}}</div>
                    <div>{{sku.trackNumber || '---'}}</div>
                  </template>
                </el-col>
                <el-col
                  :span="4"
                  class="td-action"
                  :class="{ last: si + 1 == item.items.length }"
                >
                  <el-dropdown v-if="!si && (item.status == 1 || (/3|4|5/.test(item.status) && item.abnormalStatus == 0))" @command="handleCommand">
                    <el-button plain>
                      Action <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-if="item.status == 1"
                        :command="{ item, type: 'pay' }"
                        style="color: #5c6ac4"
                      >
                        Pay
                      </el-dropdown-item>
                      <el-dropdown-item
                        v-if="item.status == 1"
                        :command="{ item, type: 'cancel' }"
                        style="color: #f56c6c"
                      >
                        Cancel
                      </el-dropdown-item>
                      <el-dropdown-item
                        :command="{ item, type: 'dispute' }"
                        style="color: #e6a23c"
                        v-if=" /3|4|5/.test(item.status) && item.abnormalStatus == 0"
                      >
                        Dispute
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </div>
              <el-col :span="24" class="t-row-2">
                <span class="mg-r-20">1 Unit</span>
                <span class="mg-r-5"
                  >Amount:
                  <b style="color: #f56c6c; font-size: 16px"
                    >$ {{ Number(item.realAmount).toFixed(2) }}</b
                  ></span
                >
                <span style="color: #909399">(Shipping Cost Included)</span>
              </el-col>
            </el-row>
            <el-row v-if="!items.length" :gutter="15">
              <el-col :span="24" style=" text-align: center; color: #909399;">no data</el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row v-if="items.length" :gutter="20" class="mg-b-10">
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
    </div>
    <DialogPay :dialogPay="dialogPay" />
    <DialogDispute ref="DialogDispute" :dialogDispute="dialogDispute" />
  </div>
</template>

<script>
import DialogPay from "@/components/checkout/DialogPay";
import DialogDispute from "@/components/DialogDispute";
export default {
  data() {
    return {
      loading: false,
      searchKey: "",
        vendorId:  localStorage.getItem('vendorId'),
      pageSizes: [10, 20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("c_purchaseListPerPage")
        ? Number(localStorage.getItem("c_purchaseListPerPage"))
        : 10,
      total: 0,
      totalPage: 0,
      items: [],
      dialogPay: {
        isShow: false,
        loading: false,
        orderNum: "",
        amount: "",
        platformType: 3,
        payLoading: false,
        step: 1,
        msg: "", //出错
        purchaseOrderId: "",
      },
      dialogDispute: {
        isShow: false,
      },
      dialogPayDefault: "{}",
      dialogDisputeDefault: "{}",
      iptCode: "",
      iptSku: "",
      iptName: "",
      filterParams: {
        code: "",
        sku: "",
        name: "",
      },
      filterParamsDefault: "{}",
    };
  },
  components: {
    DialogPay,
    DialogDispute,
  },
  watch: {
    $route: "gotoPage",
  },
  mounted() {
    this.dialogPayDefault = JSON.stringify(this.dialogPay);
    this.dialogDisputeDefault = JSON.stringify(this.dialogDispute);
    this.filterParamsDefault = JSON.stringify(this.filterParams);
    this.getItem();
  },
  methods: {
    productClick (id) {
      this.$Burying({
        object: '7002',
        objectId: id
      })
    },
    toDetail(item){
      this.$router.push({name: 'purchaseDetail', query: {code: item.code}})
    },
    openPay(item) {
      //打开支付
      this.dialogPay = JSON.parse(this.dialogPayDefault);
      this.dialogPay.isShow = true;
      this.dialogPay.amount = Number(item.realAmount);
      this.dialogPay.orderNum = item.code;
      this.dialogPay.purchaseOrderId = item.id;
    },
    openDispute(item) {
      // 打开纠纷编辑框
      this.dialogDispute = JSON.parse(this.dialogDisputeDefault);
      this.dialogDispute.isShow = true;
      this.dialogDispute.orderNum = item.code;
      this.dialogDispute.status = item.status;
      this.dialogDispute.purchaseOrderId = item.id;
      this.$refs.DialogDispute.form = {
        reason: "",
        result: "",
        remark: "",
      }
    },
    handleCommand(command) {
      console.log(command);
      switch (command.type) {
        case "pay":
          this.openPay(command.item);
          break;
        case "cancel":
          this.$confirm("Do you want to cancel the order?", "", {
            confirmButtonClass: " el-button--danger",
            type: "warning",
          })
            .then(() => {
              this.loading = true;
              this.$Burying({
                object: '13006',
                objectId: command.item.id
              })
              this.$apiCall(
                "api.PurchaseOrder.setCancel",
                { purchaseOrderId: command.item.id },
                (r) => {
                  if (r.ErrorCode == 9999) {
                    this.getItem(true);
                    this.$message({
                      message: "Order was successfully cancelled",
                      type: "success",
                    });
                  } else {
                    this.$message({ message: r.Message, type: "error" });
                  }
                }
              );
            })
            .catch(() => {});
          break;
        case "dispute":
          this.openDispute(command.item);
          break;
      }
    },
    getItem(s) {
      this.loading = true;
      let params = {
        page: this.page,
        rowsPerPage: this.rowsPerPage,
        code: this.filterParams.code,
        sku: this.filterParams.sku,
        name: this.filterParams.name,
      };
      this.$apiCall("api.PurchaseOrder.findByCustomer", params, (r) => {
        this.loading = false;
        if (r.ErrorCode == 9999) {
          if(r.Data.Results.length)
            this.items = r.Data.Results.map(e => {
              if(e.shippingJson){
                e.shippingJSONObj = JSON.parse(e.shippingJson)
              }else{
                e.shippingJSONObj = {}
              }
                
              return e
            });
          this.total = Number(r.Data.Pagination.totalCount);
          this.totalPage = Number(r.Data.Pagination.totalPage);
          if (!s) this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
          if(this.$route.params.action == 'pay'){
            if(this.items[0].status == 1){
              this.openPay(this.items[0]);
            }
          } 
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      });
    },
    filterGetItem(type) {
      switch (type) {
        case "code":
          this.filterParams.code = this.iptCode;
          break;
        case "sku":
          this.filterParams.sku = this.iptSku;
          break;
        case "name":
          this.filterParams.name = this.iptName;
          break;
        default:
          this.filterParams.code = this.iptCode;
          this.filterParams.sku = this.iptSku;
          this.filterParams.name = this.iptName;
      }
      if (this.$route.query.page == 1) {
        this.getItem();
      } else {
        this.$router.push({
          query: {
            page: 1,
          },
        });
      }
    },
    clearFilter(type) {
      switch (type) {
        case "code":
          this.filterParams.code = this.iptCode = "";
          break;
        case "sku":
          this.filterParams.sku = this.iptSku = "";
          break;
        case "code":
          this.filterParams.name = this.iptName = "";
          break;
        default:
          this.iptCode = this.iptSku = this.iptName = '';
          this.filterParams = JSON.parse(this.filterParamsDefault);
      }
      if (this.$route.query.page == 1) {
        this.getItem();
      } else {
        this.$router.push({
          query: {
            page: 1,
          },
        });
      }
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
      localStorage.setItem("c_purchaseListPerPage", val);
      this.getItem();
    },
    gotoPage() {
      this.page = this.$route.query.page ? this.$route.query.page : 1;
      this.getItem();
    },
    formatAttr(attr){
      if(!attr){
        return ''
      }
      attr = attr.split("||")
      attr = attr.filter(s => {
        return s && s.trim();
      })
      let str = attr.join(',')
      return str
    }
  },
};
</script>

<style lang="scss" scoped>
.table-title {
  margin-bottom: 15px;
  background-color: #5c6ac4;
  color: #fff;
  line-height: 32px;
  font-weight: bold;
}
.table-data {
  margin-bottom: 20px;
  border: 1px #e4e7ed solid;
  background-color: #fff;
  box-shadow: 0 2px 10px 0 #eee;
  font-size: 12px;
  .t-row-1 {
    padding: 5px 15px;
    background-color: #ebeef5;
  }
  .product-row {
    display: flex;
    align-items: stretch;
    .td-product-info {
      display: flex;
      padding: 5px;
      padding-left: 15px;
      border-right: 1px #e4e7ed solid;
      border-bottom: 1px #e4e7ed solid;
      .product-img {
        margin-right: 10px;
        border: 1px #dcdfe6 solid;
        width: 70px;
        height: 70px;
        .image-slot {
          i {
            margin: 0;
            color: #c0c4cc;
            transform: translate(-50%, -50%);
            font-size: 22px;
          }
        }
      }
      .right {
        .name {
          margin-bottom: 10px;
        }
        .sku {
          color: #909399;
        }
      }
    }
    .td-price,
    .td-qty,
    .td-tk-num {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border-bottom: 1px #e4e7ed solid;
    }
    .td-price {
      i {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(50%, -50%);
      }
    }
    .td-qty {
      border-right: 1px #e4e7ed solid;
    }
    .td-s {
      display: flex;
      border-right: 1px #e4e7ed solid;
      > div {
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px #e4e7ed solid;
        width: 100%;
      }
      > div:last-child {
        border-right: none;
      }
      > div.last {
        border-bottom: 1px #e4e7ed solid;
      }
      > div.s2 {
        border-bottom: 1px #e4e7ed solid;
      }
    }
    .td-tk-num {
      border-right: 1px #e4e7ed solid;
    }
    .td-action {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .td-action.last {
      border-bottom: 1px #e4e7ed solid;
    }
  }
  .t-row-2 {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 15px;
    font-size: 14px;
  }
}
</style>