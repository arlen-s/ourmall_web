<template>
  <div
    v-loading.fullscreen="loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <!-- 筛选 -->
    <div ref="tablefilter">
      <!-- 筛选ipt -->
      <div
        class="d-flex"
        style="margin-bottom: 5px; justify-content: space-between"
      >
        <div class="left d-flex" style="flex-wrap: wrap">
          <div ref="pageFilter" class="page-filter" style="border-bottom: none">
            <el-form :inline="true" size="mini">
              <el-form-item
                class="mg-r-20"
                style="margin-bottom: 0"
                label="发起时间"
              >
                <el-date-picker
                  :clearable="false"
                  value-format="yyyyMMdd"
                  v-model="timeCreated"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="filterGetItem()"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item
                v-if="activeName == 'list-settle'"
                class="mg-r-20"
                style="margin-bottom: 0"
                label="订单号"
              >
                <el-input
                  @keyup.enter.native="filterGetItem('code')"
                  @clear="clearFilter('code')"
                  v-model="code"
                  clearable
                  size="mini"
                  placeholder="订单号"
                  style="width: 220px"
                >
                </el-input>
              </el-form-item>
              <el-form-item style="margin-bottom: 0">
                <el-button type="primary" @click="filterGetItem()"
                  >查询</el-button
                >
                <el-button
                  type="danger"
                  style="margin-right: 30px"
                  @click="clearFilter()"
                  >清空</el-button
                >
                <el-button
                  v-if="activeName == 'list-settle' || activeName == 'list'"
                  :loading="exportLoading"
                  type="primary"
                  @click="exportReacord(activeName)"
                >
                  导出账单
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <!-- 已筛选条件 -->
      <div class="mg-b-10">
        <el-tag
          v-if="timeCreated.length && timeCreated[0]"
          size="small"
          type="info"
          closable
          @close="clearFilter('timeCreated')"
          class="mg-r-5"
          >{{ $moment(timeCreated[0]).format("YYYY-MM-DD") }} -
          {{ $moment(timeCreated[1]).format("YYYY-MM-DD") }}</el-tag
        >
        <el-tag
          v-if="invoiceCode"
          size="small"
          type="info"
          closable
          @close="clearFilter('code')"
          class="mg-r-5"
        >
          订单号:{{ invoiceCode }}
        </el-tag>
      </div>
    </div>
    <!-- filter end -->
    <div
      v-if="!loading"
      class="table-wrap"
      style="border-top: 1px #ebeef5 solid"
    >
      <el-table
        v-if="activeName == 'list-withdraw'"
        :data="items"
        stripe
        ref="gridTable"
      >
        <el-table-column label="类型">
          <template> 提现 </template>
        </el-table-column>
        <el-table-column label="发起时间">
          <template slot-scope="scope">
            {{
              $moment(scope.row.timeCreated * 1000).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="支付类型">
          <template slot-scope="scope">
            {{ $dict.financePayType[scope.row.accountType].text }}
          </template>
        </el-table-column>
        <el-table-column label="收款人姓名">
          <template slot-scope="scope">
            {{ scope.row.name || "--" }}
          </template>
        </el-table-column>
        <el-table-column label="收款人账号">
          <template slot-scope="scope">
            {{ scope.row.account }}
          </template>
        </el-table-column>
        <el-table-column label="收款机构">
          <template slot-scope="scope">
            {{ $dict.financePayType[scope.row.accountType].text }}
          </template>
        </el-table-column>
        <el-table-column label="提现金额">
          <template slot-scope="scope">
            {{ scope.row.amount || amount }}
          </template>
        </el-table-column>
        <el-table-column label="处理时间">
          <template slot-scope="scope">
            {{
              scope.row.timeUpdate
                ? $moment(scope.row.timeCreated * 1000).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )
                : "--"
            }}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span
              :class="{
                'tx-warning': scope.row.status == 1,
                'tx-success': scope.row.status == 3,
                'tx-danger': scope.row.status == 9,
              }"
            >
              {{ $dict.financeStatus[scope.row.status].text }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            {{ scope.row.remark || "--" }}
          </template>
        </el-table-column>
      </el-table>

      <el-table
        v-if="
          activeName == 'list-withhold' ||
          activeName == 'list-frozen' ||
          activeName == 'list-settle'
        "
        :data="items"
        stripe
        ref="gridTable"
      >
        <el-table-column label="类型">
          <template slot-scope="scope">
            {{ $dict.financeType[scope.row.type].text }}
          </template>
        </el-table-column>
        <el-table-column label="时间">
          <template slot-scope="scope">
            {{
              $moment(scope.row.timeCreated * 1000).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="订单号">
          <template slot-scope="scope">
            {{ scope.row.invoice || "---" }}
          </template>
        </el-table-column>
        <el-table-column v-if="activeName == 'list-settle'" label="支付方式">
          <template slot-scope="scope">
            {{ scope.row.platformTypeText }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="activeName == 'list-withhold'"
          :label="`扣除金额(${$store.state.country.symbol})`"
        >
          <template slot-scope="scope">
            {{ scope.row.totalAmount | amount }}
          </template>
        </el-table-column>
        <el-table-column v-if="activeName != 'list-frozen'" :label="`结算金额(${$store.state.country.symbol})`">
          <template slot-scope="scope">
            {{ scope.row.totalAmount | amount }}
          </template>
        </el-table-column>
        <el-table-column v-if="activeName == 'list-frozen'" :label="`冻结金额(${$store.state.country.symbol})`">
          <template slot-scope="scope">
            {{ scope.row.totalAmount | amount }}
          </template>
        </el-table-column>
        <el-table-column v-if="activeName == 'list-settle'" :label="`佣金(${$store.state.country.symbol})`">
          <template slot-scope="scope">
            {{ scope.row.platformFee | amount }}
          </template>
        </el-table-column>
        <el-table-column v-if="activeName == 'list-settle'" :label="`钱包余额(${$store.state.country.symbol})`" >
          <template slot-scope="scope">
            {{ scope.row.surplus | amount }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="activeName == 'list-frozen'"
          :label="`可提现金额结余(${$store.state.country.symbol})`"
        >
          <template slot-scope="scope">
            {{ scope.row.surplus | amount }}
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            {{ scope.row.remark || "--" }}
          </template>
        </el-table-column>
      </el-table>

      <el-table
        v-if="activeName == 'list'"
        :data="items"
        stripe
        ref="gridTable"
      >
        <el-table-column label="类型">
          <template slot-scope="scope">
            <span v-if="scope.row.type">{{
              $dict.financeRecordType[scope.row.type].text
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易时间">
          <template slot-scope="scope">
            {{
              $moment(scope.row.timeCreated * 1000).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            }}
          </template>
        </el-table-column>
        <el-table-column 
           :label="`交易金额(${$store.state.country.symbol})`"
        >
          <template slot-scope="scope">
            <span
              :class="{
                'tx-success': scope.row.symbol == '1',
                'tx-danger': scope.row.symbol == '2',
              }"
            >
              {{ scope.row.symbol == "2" ? "-" : "+"
              }}{{ scope.row.amount | amount }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="`钱包余额(${$store.state.country.symbol})`">
          <template slot-scope="scope">
            {{ scope.row.surplus | amount }}
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            {{ scope.row.remark || "--" }}
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-row v-if="items.length" :gutter="20">
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
</template>

<script>
export default {
  props: ["activeName"],
  data() {
    return {
      loading: false,
      pageSize: [2, 10, 20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem(`${this.$route.name}RowsPerPage`)
        ? Number(localStorage.getItem(`${this.$route.name}RowsPerPage`))
        : 10,
      totalCount: 0,
      totalPage: 0,
      timeCreated: ["", ""],
      code: "",
      invoiceCode: "",
      items: [],
      exportLoading: false,
    };
  },
  watch: {
    $route: "gotoPage",
    activeName() {},
  },
  filters: {
    amount(val) {
      return Number(val) ? Number(val).toFixed(2) : "0.00";
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getItem();
    });
  },
  beforeDestroy() {
    this.code = this.invoiceCode = "";
    this.timeCreated = ["", ""];
    this.items = [];
  },
  methods: {
    exportReacord(type) {
      //导出账单
      this.exportLoading = true;
      if ($("#ifilePro").length == 0) {
        $("body").append(
          '<iframe id="ifilePro" style="display:none"></iframe>'
        );
      }
      let apiUrl =
        type == "list-settle"
          ? "api.AccountPayment.exportRecordByVendor"
          : "api.AccountPayment.exportAccountRecordByVendor";
      let params = {
        timeCreatedFrom: this.timeCreated.length ? this.timeCreated[0] : "",
        timeCreatedTo: this.timeCreated.length ? this.timeCreated[1] : "",
        invoiceCode: this.invoiceCode,
      };
      if (type == "list-settle") {
        params.invoiceCode = this.invoiceCode;
      }
      this.$apiCall(apiUrl, params, (r) => {
        this.exportLoading = false;
        if (r.ErrorCode == "9999") {
          this.$elementMessage("导出成功", "success");
          document.getElementById("ifilePro").src = r.Data.Results.file;
        } else {
          this.$elementMessage(r.Message, "error");
          if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
            this.$userFailure(this);
          }
        }
      });
    },
    clearFilter(type) {
      switch (type) {
        case "timeCreated":
          this.timeCreated = ["", ""];
          break;
        case "code":
          this.code = this.invoiceCode = "";
          break;
        default:
          this.invoiceCode = this.code = "";
          this.timeCreated = ["", ""];
      }
      this.gotoPage();
    },
    filterGetItem(type) {
      if (type == "code") {
        this.invoiceCode = this.code;
      }
      if (!type) {
        this.invoiceCode = this.code;
      }
      this.gotoPage();
    },
    getItem(s) {
      this.loading = true;
      let [api, params] = ["", {}];
      params = {
        page: this.page,
        rowsPerPage: this.rowsPerPage,
        timeCreatedFrom: this.timeCreated.length ? this.timeCreated[0] : "",
        timeCreatedTo: this.timeCreated.length ? this.timeCreated[1] : "",
      };
      switch (this.activeName) {
        case "list-withdraw":
          api = "api.AccountPayment.findWithdrawal";
          break;
        case "list-withhold":
        case "list-frozen":
        case "list-settle":
          api = "api.AccountPayment.findRecordByVendor";
          if (this.activeName == "list-withhold") {
            params.type = 56;
          }
          if (this.activeName == "list-frozen") {
            params.type = 34;
          }
          if (this.activeName == "list-settle") {
            params.type = 1;
            params.invoiceCode = this.invoiceCode;
          }
          break;
        case "list":
          api = "api.AccountPayment.findAccountRecord";
          break;
      }
      this.$apiCall(api, params, (r) => {
        this.loading = false;
        if (r.ErrorCode == 9999) {
          let [data, pagination] = [r.Data.Results, r.Data.Pagination];
          this.items = data.map((e) => {
            return e;
          });
          this.totalCount = Number(pagination.totalCount);
          this.totalPage = Number(pagination.totalPage);
        } else {
          this.$message({ message: r.Message, type: "error" });
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
      localStorage.setItem(`${this.$route.name}RowsPerPage`, val);
      this.getItem();
    },
    gotoPage() {
      this.page = this.$route.query.page ? Number(this.$route.query.page) : 1;
      this.getItem();
    },
  },
};
</script>