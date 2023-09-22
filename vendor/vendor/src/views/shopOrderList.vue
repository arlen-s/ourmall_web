<template>
  <div class="contentpanel transaction-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-s-finance"></i>
          <h2>{{ $t("withdraw.店铺销量统计") }}</h2>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="pagebody" v-loading="loading">
      <el-row :gutter="15" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <el-row :gutter="20">
              <el-col :span="24">
                <div ref="pageFilter" class="page-filter">
                  <el-form :inline="true" size="mini">
                    <el-form-item :label="$t('withdraw.店长名称') + ':' ">
                      <el-select
                        filterable
                        remote
                        placeholder="all"
                        clearable
                        v-model="filterParams.accountIds"
                        @change="filterItem"
                        @clear="clearFilter('accountIds')"
                      >
                        <el-option
                          v-for="opt in storeList"
                          :key="opt.id"
                          :label="opt.customerName"
                          :value="opt.customerId"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-date-picker
                        v-model="timer"
                        type="daterange"
                        align="right"
                        unlink-panels
                        @change="changeDate"
												:placement="placement"
                        range-separator="-"
                        :start-placeholder="$t('bill.开始日期')"
                        :end-placeholder="$t('bill.结束日期')"
                        value-format="yyyy-MM-dd"
                      ></el-date-picker>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
            <el-table
              stripe
              style="width: 100%"
              ref="gridTable"
              :data="items"
              tooltip-effect="dark"
              :row-key="(row) => row.id"
            >
              <el-table-column :label="`${$t('withdraw.店铺ID')}`">
                <template slot-scope="scope">
                  <span>{{scope.row.customerId || '--'}}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('withdraw.店长名称')">
                <template slot-scope="scope">
                  <span>{{scope.row.customerName || '--'}}</span>
                </template>
              </el-table-column>

              <el-table-column :label="$t('withdraw.销售数量')">
                <template slot-scope="scope">
                  <span>{{scope.row.saleNum}}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('withdraw.销售总金额')">
                <template slot-scope="scope">
                  <span>{{scope.row.totalAmount}}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-row v-if="items.length" :gutter="20" style="margin-top:10px">
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
                  ></el-pagination>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      pageSizes: [10, 20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("transactionRowsPerPage") ?
        Number(localStorage.getItem("transactionRowsPerPage")) : 10,
      items: [],
      selectLoading: false,
      selectArr: [],
      total: 0,
      totalPage: 0,
      filterParams: {
        accountIds: '',
      },
      timer: '',
      storeList: [],
placement: 'bottom-end',
    }
  },
  components: {
  },
  watch: {
  },
  mounted () {
    this.getItem()
    this.getShopName()
  },
  methods: {
    getShopName () {
      this.storeList = []
      this.$apiCall(
        "api.Relationship.findByVendor", {}, (r) => {
          if (r.ErrorCode == 9999) {
            this.storeList = r.Data.Results
          } else {
            this.$message({
              message: r.Message,
              type: "error"
            })
          }
        }
      )
    },
    toPage (val) {
      if (val != this.$route.query.page)
        this.$router.push({
          query: {
            page: val
          }
        })
    },
    changePageSize (val) {
      this.rowsPerPage = val
      localStorage.setItem("transactionRowsPerPage", val)
      this.getItem()
    },
    gotoPage () {
      this.page = this.$route.query.page ? this.$route.query.page : 1
      this.getItem()
    },
    changeDate () {
      this.getItem()
    },
    filterItem () {
      this.getItem()
    },
    getItem () {
      this.loading = true
      this.$apiCall(
        "api.AccountPayment.findByVendorGroupDate", {
        page: this.page,
        rowsPerPage: this.rowsPerPage,
        timeCreatedFrom: this.timer ? this.timer[0] : '',
        timeCreatedTo: this.timer ? this.timer[1] : '',
        customerId: this.filterParams.accountIds,
      },
        (r) => {
          this.loading = false
          if (r.ErrorCode == 9999) {
            this.items = r.Data.Results
            this.total = Number(r.Data.Pagination.totalCount)
            this.totalPage = Number(r.Data.Pagination.totalPage)

          } else {
            this.$message({
              message: r.Message,
              type: "error"
            })
          }
        }
      )
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-body {
  padding: 25px;
  .tltle {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 25px;
  }

  .item-wrap {
    padding-top: 15px;
    padding-bottom: 7px;
    border-top: 1px solid #ddd;

    > * {
      margin-bottom: 8px;
    }
  }
}
::v-deep .el-dialog__body {
  height: 62vh;
  overflow: auto;
}
</style>
