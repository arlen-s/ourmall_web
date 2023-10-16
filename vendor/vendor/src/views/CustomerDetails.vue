<template>
  <div class="contentpanel transaction-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-s-finance"></i>
          <h2>{{ $t("withdraw.客户明细") }}</h2>
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
                    <el-form-item :label="$t('withdraw.上传物流单号时间')">
                      <el-date-picker
                        value-format="yyyy-MM-dd"
                        v-model="filterParams.date"
                        placement="top"
                        @change="dateChange"
                        type="daterange"
                        align="right"
                        unlink-panels
                        :range-separator="$t('myinvoice.to')"
                        :start-placeholder="$t('myinvoice.startDate')"
                        :end-placeholder="$t('myinvoice.endDate')"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="filterItem">{{$t("transaction.filter")}}</el-button>
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
              <el-table-column :label="$t('mycustomer.customersName')">
                <template slot-scope="scope">
                  <span>{{scope.row.funcName || '--'}}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('withdraw.发货物流票数')">
                <template slot-scope="scope">
                  <span>{{scope.row.quantity}}</span>
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
                    @current-change="gotoPage"
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
      vendorId: localStorage.getItem('vendorId'),
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
        date: [],
				timeCreatedFrom: '',
				timeCreatedTo: ''
      },

    }
  },
  components: {
  },
  watch: {
  },
  mounted () {
    this.getItem()
  },
  methods: {

    gotoPage (val) {
      this.page =  val
      this.getItem()
    },
    dateChange () {
			if (this.filterParams.date == null)  {
				this.filterParams.date = []
				this.filterParams.timeCreatedFrom = ''
				this.filterParams.timeCreatedTo = ''
				 this.filterItem()
			}
      if (this.filterParams.date.length > 1) {
        this.filterParams.timeCreatedFrom = this.$moment(
          this.filterParams.date[0]
        ).format("YYYY-MM-DD")
        this.filterParams.timeCreatedTo = this.$moment(
          this.filterParams.date[1]
        ).format("YYYY-MM-DD")
        this.filterItem()
      }
    },
    filterItem () {
      this.getItem()
    },
    getItem () {
      this.loading = true
      this.$apiCall(
        "api.Invoice.getOrderNumber", {
        pageNum: this.page,
        pageRow: this.rowsPerPage,
        timeFrom: this.filterParams.timeCreatedFrom,
        timeTo: this.filterParams.timeCreatedTo,
      },
        (r) => {
          this.loading = false
          if (r.ErrorCode == 9999) {
            this.items = r.Data.Results.data
            this.total = Number(r.Data.Results.totalCount)
            this.totalPage = Number(r.Data.Results.pageNum)

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
