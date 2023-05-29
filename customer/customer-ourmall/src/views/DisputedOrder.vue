<template>
  <div class="contentpanel orders-page">
    <div class="header-diy">
      <div class="pagetitle">
        <div class="left">
          <div class="title">
            <i class="iconfont icon-shopify"></i>
            <h2>{{$t('Disputed order')}}</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="pagebody">
      <el-card>
        <el-row>
          <el-col :span="24">
            <el-tabs v-model="activeName" @tab-click="search">
              <el-tab-pane label="Awaiting Response" name="1">
                <span slot="label">
                  {{$t('Awaiting Response')}}
                  <span>({{ total }})</span>
                </span>
              </el-tab-pane>
              <el-tab-pane :label="$t('Completed')" name="3"></el-tab-pane>
              <el-tab-pane label="Closed" name="4"></el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="24">
            <div class="pagebody" v-loading="loading">
              <el-row :gutter="15" class="mg-b-20">
                <el-col :span="24">
                  <el-card>
                    <el-row :gutter="20">
                      <el-col :span="24">
                        <div class="page-filter">
                          <el-form :inline="true" size="mini">
                            <!-- 日期选择 -->
                            <el-form-item class="do_date">
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
                                @change="search"
                              >
                              </el-date-picker>
                            </el-form-item>
                            <!-- 搜索框 -->
                            <el-form-item class="do_search">
                              <el-input
                                placeholder="Enter order number"
                                v-model="search_txt"
                                class="search_txt"
                                @keyup.enter.native="search"
                              >
                              </el-input>
                              <el-button
                                type="primary"
                                class="search_btn"
                                @click.stop="search"
                                >{{$t('Search')}}</el-button
                              >
                            </el-form-item>
                            <!-- 下拉框 -->
                            <el-form-item>
                              <el-select
                                v-model="search_select"
                                :placeholder="$t('Please select')"
                                @change="search"
                              >
                                <el-option
                                  v-for="(s, i) in $dict.PurchaseStatus"
                                  :key="i"
                                  :label="s.text"
                                  :value="s.val"
                                ></el-option>
                              </el-select>
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
                    >
                      <el-table-column type="selection"></el-table-column>
                      <el-table-column label="Order Number">
                        <template slot-scope="scope">
                          {{ scope.row.code }}
                        </template>
                      </el-table-column>
                      <el-table-column label="Tracking Number">
                        <template slot-scope="scope">
                          {{ scope.row.reissueCode }}
                        </template>
                      </el-table-column>
                      <el-table-column label="Dispute Type">
                        <template slot-scope="scope">
                          {{
                            (
                              $dict.disputedReason[
                                (scope.row.abnormalJson || {}).reason
                              ] || {}
                            ).text
                          }}
                        </template>
                      </el-table-column>
                      <el-table-column label="Expected Solution">
                        <template slot-scope="scope">
                          {{
                            (
                              $dict.disputedResult[
                                (scope.row.abnormalJson || {}).result
                              ] || {}
                            ).text
                          }}
                        </template>
                      </el-table-column>
                      <el-table-column label="Create Date">
                        <template slot-scope="scope">
                          {{
                            moment(scope.row.timeAbnormal * 1000).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )
                          }}
                        </template>
                      </el-table-column>
                      <el-table-column label="Status">
                        <template slot-scope="scope">
                          {{
                            (
                              $dict.disputedStatus[scope.row.abnormalStatus] ||
                              {}
                            ).text
                          }}
                        </template>
                      </el-table-column>
                      <!-- <el-table-column label="Operation">
                        <el-button plain>View</el-button>
                      </el-table-column> -->
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
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "1",
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
      search_select: "",
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
    search_checkbox() {
      this.search();
    },
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
     * 获取表格中的数据
     */
    getTable(s) {
      this.loading = true;
      let params = {
        rowsPerPage: this.rowsPerPage,
        page: this.page,
        abnormalStatus: Number(this.activeName),
        invoiceCode: this.search_txt,
        timeCreatedFrom: (this.timeCreated || [])[0] || "",
        timeCreatedTo: (this.timeCreated || [])[1] || "",
      };
      if (this.search_select) {
        params.status = Number(this.search_select);
      }
      this.$apiCall("api.PurchaseOrder.findByCustomer", params, (r) => {
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
      });
    },
    /**
     * 搜索框事件
     */
    search() {
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
.do_date {
  width: 25%;

  .el-date-editor--daterange.el-input__inner {
    width: 100%;
  }
}

.do_search {
  width: 25%;

  .el-form-item__content {
    width: 100%;
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