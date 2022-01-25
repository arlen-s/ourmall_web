<template>
  <div class="contentpanel orders-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left d-flex">
        <div class="title mg-r-20">
          <i class="el-icon-s-order"></i>
          <h2>{{ $t("myinvoice.purchaseOrders") }}</h2>
        </div>
        <div class="mg-t-10">
          <el-link
            v-if="cancelStatus == 1"
            type="primary"
            @click="filterGetItem(2)"
            >{{ $t("myinvoice.viewCancelled") }}</el-link
          >
          <el-link
            v-if="cancelStatus == 2"
            type="primary"
            @click="filterGetItem(1)"
            >{{ $t("myinvoice.viewAll") }}</el-link
          >
        </div>
      </div>
      <div class="right">
        <el-button
          v-if="
            activeName == 'waitingForOffer' || activeName == 'waitingForPayment'
          "
          :disabled="!(checkboxArr.length > 1)"
          type="success"
          size="small"
          @click="toMergeInvoice"
          >{{ $t("myinvoice.合并订单")}}
          {{ checkboxArr.length > 1 ? checkboxArr.length : "" }}</el-button
        >
        <el-button type="primary" size="small" @click="gotoImport">{{
          $t("myinvoice.手工创建采购单")
        }}</el-button>
      </div>
    </div>
    <div class="pagebody">
      <el-card>
        <el-row>
          <el-col :span="24" ref="pageTabs">
            <el-tabs
              v-if="cancelStatus == 1"
              v-model="activeName"
              @tab-click="handleClick"
            >
              <el-tab-pane
                :label="$t('myinvoice.全部订单')"
                name="allOrders"
              ></el-tab-pane>
              <el-tab-pane
                :label="$t('myinvoice.待我报价')"
                name="waitingForOffer"
              >
                <span slot="label">
                  {{ $t("myinvoice.待我报价") }}
                  <span class="tx-danger">({{ cnt.waitCompleteCnt }})</span>
                </span>
              </el-tab-pane>
              <el-tab-pane
                :label="$t('myinvoice.待客户付款')"
                name="waitingForPayment"
              >
                <span slot="label">
                  {{ $t("myinvoice.待客户付款") }}
                  <span class="tx-warning">({{ cnt.waitCustomerPayCnt }})</span>
                </span>
              </el-tab-pane>
              <el-tab-pane
                :label="$t('myinvoice.待我确认收款')"
                name="waitingForConfirm"
              >
                <span slot="label">
                  {{ $t("myinvoice.待我确认收款") }}
                  <span class="tx-warning">({{ cnt.waitPayCnt }})</span>
                </span>
              </el-tab-pane>
              <el-tab-pane
                :label="$t('myinvoice.已付款待发货')"
                name="waitingForDelivery"
              >
                <span slot="label">
                  {{ $t("myinvoice.已付款待发货") }}
                  <span class="tx-warning">({{ cnt.waitDeliverCnt }})</span>
                </span>
              </el-tab-pane>
              <el-tab-pane
                :label="$t('myinvoice.全部发货')"
                name="fullDeliveryOrder"
              ></el-tab-pane>
              <el-tab-pane :label="$t('myinvoice.有异常')" name="abnormal">
                <span slot="label">
                  {{ $t("myinvoice.有异常") }}
                  <span class="tx-danger">({{ cnt.abnormalCnt }})</span>
                </span>
              </el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="24">
            <router-view
              :key="pageKey"
              ref="subPage"
              :cancelStatus="cancelStatus"
              :activeName="activeName"
              @getTableHeight="getTableHeight"
              @getNum="getNum"
              @checkedArr="checkedArr"
            />
          </el-col>
        </el-row>
      </el-card>
    </div>
    <!-- 提示设置收款方式 -->
    <!-- <el-dialog title="提示" :visible.sync="isShow" width="30%" center>
      <span>请先设置收款方式</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="isShow = false">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      pageKey: new Date().valueOf(),
      activeName: "",
      cancelStatus: 1,
      cnt: {
        abnormalCnt: 0,
      },
      checkboxArr: [],
    };
  },
  mounted() {
    this.activeName = this.$route.name;
    this.getNum();
  },
  watch: {
    $route() {
      this.activeName = this.$route.name;
      this.getNum();
    },
  },
  methods: {
    toMergeInvoice() {
      this.$confirm("确认要合并采购单吗？", "订单合并", {
        confirmButtonText: "合并",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.loading = true;
        this.$apiCall(
          "api.Invoice.mergeInvoice",
          {
            invoiceIds: this.checkboxArr,
          },
          (r) => {
            if (r.ErrorCode == "9999") {
              this.loading = false;
              this.checkboxArr = [];
              this.$elementMessage("合并成功", "success");
              this.$refs.subPage.checkboxArr = [];
              this.$refs.subPage.clearFilter();
            } else {
              this.$elementMessage(r.Message, "error");
            }
          }
        );
      });
    },
    checkedArr(arr) {
      this.checkboxArr = arr;
    },
    filterGetItem(type) {
      this.$router.push({ name: "allOrders" });
      this.activeName = "allOrders";
      this.cancelStatus = type;
    },
    getNum() {
      // 切换菜单的数字
      this.$apiCall("api.Invoice.vendorInvoiceCnt", {}, (r) => {
        if (r.ErrorCode == "9999") {
          this.cnt = { ...r.Data.Results };
          //转成数字格式
          for (let k in this.cnt) {
            this.cnt[k] = Number(this.cnt[k]);
          }
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    gotoImport() {
      this.$router.push({ name: "importData" });
    },
    handleClick(tab) {
      this.checkboxArr = [];
      if (tab.name == this.$route.name) {
        //点击相同路由刷新
        this.pageKey = new Date().valueOf();
      } else {
        //tabs 切换
        this.$router.push({ name: tab.name });
      }
    },
    getTableHeight(children) {
      //获取表格高度
      clearTimeout(this.reSizeTime);
      this.reSizeTime = setTimeout(() => {
        let h =
          this.$root.$children[0].$refs.mainScroll.wrap.offsetHeight -
          (this.$refs.pageHeader.offsetHeight +
            this.$refs.pageTabs.$el.offsetHeight +
            children.$refs.tablefilter.offsetHeight +
            children.$refs.tableFooter.offsetHeight) -
          120;
        children.tableHeight = h > 200 ? h : 200;
      }, 500);
    },
  },
};
</script>