<template>
  <div class="contentpanel pay-list-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-money"></i>
          <h2>{{$t('Payment Record')}}</h2>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div v-loading="loading" class="pagebody mg-b-20">
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="margin-bottom: 10px; font-size: 12px"
      >
        <el-breadcrumb-item :to="{ path: '/Recharge' }"
          >{{$t('Recharge')}}</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{$t('Payment Record')}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-row
          ref="gridTable"
          :gutter="10"
          style="margin-bottom: 15px; padding-top: 15px"
        >
          <el-col :span="24">
            <el-table :data="tableData" stripe ref="gridTable" width>
              <el-table-column label="Platform / Type">
                <template slot-scope="scope">
                  <div>
                    {{ (payPlatformDict[scope.row.platform] || {}).name }}
                    <span style="color: #909399">/</span>
                  </div>
                  <div>{{ (payTypeDict[scope.row.type] || {}).name }}</div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('Payment Amount')" prop="amount">
                <template slot-scope="scope">
                  {{$store.state.country.shopCurrency}}{{$store.state.country.symbol}} {{ scope.row.amount }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('Payment Status')" prop="status">
                <template slot-scope="scope">
                  <div :class="payStatusDict[scope.row.status].style">
                    {{ (payStatusDict[scope.row.status] || {}).name }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('Payment Number')">
                <template slot-scope="scope">
                  <div>
                    <span style="color: #909399">code：</span>
                    {{ scope.row.code }}
                  </div>
                  <div>
                    <span style="color: #909399">{{$t('trade code')}}：</span>
                    {{ scope.row.tradeCode }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('Payment Date')">
                <template slot-scope="scope">
                  <div>
                    {{
                      moment.unix(scope.row.timeCreated).format("ll [at] LTS")
                    }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>

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
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      pageSize: [10, 20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("c_allOrdersRowsPerPage")
        ? Number(localStorage.getItem("c_allOrdersRowsPerPage"))
        : 20,
      totalCount: 0,
      totalPage: 0,
      tableData: [],
      payStatusDict: {
        1: { name: "Pending", style: "tx-warning" },
        2: { name: "Paid", style: "tx-success" },
        3: { name: "Refund", style: "tx-danger" },
        4: { name: "Cancelled", style: "tx-info" },
      },
      payTypeDict: {
        1: { name: "VIP Membership" },
        2: { name: "Recharge" },
        3: { name: "Used" },
      },
      payPlatformDict: {
        1: { name: "PayPal" },
        2: { name: "Checkout" },
      },
    };
  },
  mounted() {
    this.getItem();
  },
  watch: {
    $route: "gotoPage",
  },
  methods: {
    getItem() {
      this.loading = true;
      let params = {
        page: this.page,
        rowsPerPage: this.rowsPerPage,
      };
      this.loading = false;
      this.$apiCall("api.PayRecord.findByUser", params, (r) => {
        if (r.ErrorCode == "9999") {
          this.tableData = r.Data.Results;
          this.totalPage = r.Data.Pagination.totalPage;
          this.totalCount = r.Data.Pagination.totalCount;
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
      localStorage.setItem("c_payListRowsPerPage", val);
      this.getItem();
    },
    gotoPage() {
      this.page = this.$route.query.page ? this.$route.query.page : 1;
      this.getItem();
    },
  },
};
</script>