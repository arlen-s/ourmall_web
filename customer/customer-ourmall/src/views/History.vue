<template>
  <div class="contentpanel my-custom-page">
    <div class="pagetitle">
      <div class="left">
        <div class="title">
          <i class="el-icon-s-finance"></i>
          <h2>Billing History</h2>
        </div>
      </div>
    </div>
    <div class="pagebody" v-loading="loading">
      <el-row :gutter="15" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <el-row :gutter="20">
              <el-col :span="24">
                <div class="page-filter">
                  <el-form :inline="true" size="mini">
                    <el-form-item class="his_search">
                      <el-input
                        placeholder="Search by bill number or order number"
                        v-model="search_txt"
                        class="search_txt"
                        @keyup.enter.native="searchInput"
                      >
                      </el-input>
                      <el-button
                        type="primary"
                        class="search_btn"
                        @click.stop="searchInput"
                        >Search</el-button
                      >
                    </el-form-item>
                    <el-form-item label="Date：">
                      <el-date-picker
                        v-model="timeCreated"
                        value-format="yyyyMMdd"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="-"
                        start-placeholder="Start date"
                        end-placeholder="End date"
                        :picker-options="pickerOptions"
                        @change="searchInput"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
            <el-table
              :data="items"
              stripe
              row-key="id"
              style="width: 100%"
              ref="gridTable"
            >
              <el-table-column label="Order Code">
                <template slot-scope="scope">
                  {{ scope.row.invoice || "---" }}
                </template>
              </el-table-column>
              <el-table-column label="Date"
                ><template slot-scope="scope">
                  {{
                    moment(scope.row.timeCreated * 1000).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  }}
                </template>
              </el-table-column>
              <el-table-column label="Payment Method">
                <template slot-scope="scope">
                  {{ ($dict.PayType[scope.row.platformType] || {}).text }}
                </template>
              </el-table-column>
              <el-table-column label="Vendor">
                <template slot-scope="scope">
                  {{ scope.row.vendor || "---" }}
                </template>
              </el-table-column>
              <el-table-column label="Amount">
                <template slot-scope="scope">
                  {{ scope.row.totalAmount || "---" }}
                </template>
              </el-table-column>
              <el-table-column label="Status">
                <template slot-scope="scope">
                  <span>
                    {{ ($dict.PayStatus[scope.row.status] || {}).text }}
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-row v-if="items.length" :gutter="20">
      <el-col :span="24" class="d-flex justify-content-center">
        <div>
          <el-pagination
            :current-page="page"
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
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "Last week",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "Last month",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "Last three months",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      search_txt: "",
      timeCreated: "",
      items: [],
      pageSizes: [10, 20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("c_storeRowsPerPage")
        ? Number(localStorage.getItem("c_storeRowsPerPage"))
        : 10,
      total: 0,
    };
  },
  watch: {
    $route: "gotoPage",
  },
  created() {
    this.initData();
  },
  methods: {
    /**
     * 初始化数据
     */
    initData() {
      this.getTable();
    },
    /**
     * 搜索框事件
     */
    searchInput() {
      if (this.$route.query.page == 1) {
        this.getTable();
      } else {
        this.$router.push({
          query: {
            page: 1,
          },
        });
      }
    },
    /**
     * 获取列表数据
     */
    getTable(s) {
      this.loading = true;
      this.$apiCall(
        "api.AccountPayment.findRecordByCustomer",
        {
          rowsPerPage: this.rowsPerPage,
          page: this.page,
          invoiceCode: this.search_txt,
          timeCreatedFrom: (this.timeCreated || [])[0] || "",
          timeCreatedTo: (this.timeCreated || [])[1] || "",
        },
        (r) => {
          this.loading = false;
          if (r.ErrorCode == 9999) {
            this.items = r.Data.Results;
            this.total = Number(r.Data.Pagination.totalCount);
            this.totalPage = Number(r.Data.Pagination.totalPage);
            if (!s) this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
          } else {
            this.$message({
              message: r.Message,
              type: "error",
            });
          }
        }
      );
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
      localStorage.setItem("c_storeRowsPerPage", val);
      this.getTable();
    },
    gotoPage() {
      this.page = this.$route.query.page ? Number(this.$route.query.page) : 1;
      this.getTable();
    },
  },
};
</script>

<style lang='scss' scoped>
</style>

<style lang="scss">
.his_search {
  width: 40%;

  .el-form-item__content {
    width: 80%;
    display: flex;
  }

  .search_txt {
    input {
      padding: 0 15px;
      border-radius: 0;
      box-shadow: none;
    }
  }

  .search_btn {
    border-radius: 0;
    box-shadow: none;
  }
}
</style>