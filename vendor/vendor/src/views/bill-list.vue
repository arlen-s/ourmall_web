<template>
  <div class="contentpanel my-invoice-page">
    <div
      class="pagetitle"
      ref="pageHeader"
    >
      <div class="left d-flex align-items-center">
        <div class="title" style="margin-right: 20px;">
          <i class="el-icon-tickets"></i>
          <h2>{{$t('bill.账单详情')}}</h2>
        </div>
      </div>
      <div class="right">

      </div>
    </div>
    <div style="marginBottom: 20px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/dashboard' }">{{$t('bill.我的首页')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/payment-method' }">{{$t('bill.设置')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('bill.账单详情')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div
      class="pagebody"
      v-loading="loading"
    >
      <el-card class=" mg-b-15">
        <el-row
          :gutter="15"
          class=" mg-b-20"
        >
          <el-col :span="24" style="position: relative; z-index: 1;">
            <div ref="pageFilter" class="page-filter">
              <div class="d-flex">
                <el-form
                  :inline="true"
                  size="mini"
                >
                  <el-form-item :label="$t('bill.日期')">
                    <el-date-picker
                      v-model="selectedDate"
                      @change="dateChange"
                      type="daterange"
                      range-separator="-"
                      :default-time="['00:00:00', '23:59:59']"
                      :start-placeholder="$t('bill.开始日期')"
                      :end-placeholder="$t('bill.结束日期')">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item class=" mg-r-5" :label="$t('bill.订单号')">
                    <el-input
                      style="width: 180px;"
                      :placeholder="$t('bill.订单号')"
                      v-model="filterParams.invoiceCode"
                      @keyup.enter.native="filterGetItem('name')"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="getItems"
                    >{{$t('bill.查询')}}</el-button>
                    <el-button
                      type="danger"
                      size="mini"
                      @click="clearFilter()"
                    >{{$t('bill.清空')}}</el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="exportBills()"
                    >{{$t('bill.导出账单')}}</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-col>
          <el-row
            ref="gridTable"
            :gutter="10"
            style=" padding-top: 15px; position: relative; z-index: 0;"
          >
            <el-table
              :data="items"
              style="width: 100%">
              <el-table-column
                :label="$t('bill.类型')"
                width="180">
                <template slot-scope="scope">
                  付款
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('bill.时间')"
                width="180">
                <template slot-scope="scope">
                  {{
                    $moment(scope.row.timeCreated * 1000).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  }}
                </template>
              </el-table-column>
              <el-table-column
                prop="invoice"
                :label="$t('bill.订单号')"
                width="180">
              </el-table-column>
              <el-table-column
                prop="platformTypeText"
                :label="$t('bill.支付方式')"
                width="180">
              </el-table-column>
              <el-table-column
                prop="totalAmount"
                :label="$t('bill.付款金额')"
                width="180">
              </el-table-column>
            </el-table>
          </el-row>
        </el-row>
      </el-card>
      <el-row
        :gutter="20"
        ref="pageFooter"
      >
        <el-col
          :span="24"
          class=" d-flex justify-content-center"
        >
          <div>
          <el-pagination
            @size-change="getItems"
            @current-change="getItems"
            :current-page="pagination.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total">
          </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-backtop class="goto-top" target=".main-scroll  .el-scrollbar__wrap" :right="20" :bottom="20">
    </el-backtop>
  </div>
</template>

<script>
export default {
	data () {
		return {
      loading: false,
      selectedDate: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
			filterParams: {
        invoiceCode: '',
        timeCreatedTo: '',
        timeCreatedFrom: ''
      },
      items: []
		}
	},
  mounted() {
    this.getItems()
  },
  methods: {
    exportBills () {
      this.$apiCall('api.AccountPayment.exportRecordByVendor', {
        notEcommerce:1,
        invoiceCode: this.filterParams.invoiceCode || '',
        timeCreatedTo: this.filterParams.timeCreatedTo || '',
        timeCreatedFrom: this.filterParams.timeCreatedFrom || ''
      }, r => {
        if (r.ErrorCode == 9999) {
          window.open(r.Data.Results.file, 'Bill')
        } else {
          this.$elementMessage(r.Message, "error");
        }
      })
    },
    clearFilter () {
      this.selectedDate = []
      this.filterParams = {
        invoiceCode: '',
        timeCreatedTo: '',
        timeCreatedFrom: ''
      }
      this.getItems()
    },
    dateChange (date) {
      if (date) {
        this.filterParams.timeCreatedFrom = this.$moment(date[0]).format("YYYY-MM-DD")
        this.filterParams.timeCreatedTo = this.$moment(date[1]).format("YYYY-MM-DD")
      } else {
        this.filterParams.timeCreatedFrom = ''
        this.filterParams.timeCreatedTo = ''
      }
    },
    getItems() {
      this.loading = true
      console.log('timeTo', this.filterParams.timeCreatedTo)
      console.log('timeFrom', this.filterParams.timeCreatedFrom)
      this.$apiCall('api.AccountPayment.findRecordByVendor', {
        notEcommerce:1,
        type:1,
        invoiceCode: this.filterParams.invoiceCode || '',
        timeCreatedTo: this.filterParams.timeCreatedTo || '',
        timeCreatedFrom: this.filterParams.timeCreatedFrom || '',
        page: this.pagination.currentPage || 1,
        rowsPerPage: this.pagination.pageSize || 10
      }, r => {
        if (r.ErrorCode == 9999) {
          this.pagination.total = Number(r.Data.Pagination.totalCount)
          this.items = r.Data.Results
          this.loading = false
        } else {
          this.$elementMessage(r.Message, "error");
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.text-th{
  text-decoration: line-through;
}
.product-box {
  border: 1px #dcdfe6 solid;
  padding: 6px 15px;
  font-size: 12px;
  background-color: #fff;
  box-shadow: 0 0 6px #e0e0e0;
  .check-bg{
    position: absolute;
    top: 2px;
    left: 5px;
  }
  .name{
    margin-bottom: 5px;
  }
  .info-item{
    margin-bottom: 5px;
    display: flex;
    .title{
      margin-right: 5px;
      min-width: 85px;
      color: #909399;
    }
  }
}
.table-pro{
  display: flex;
  align-items: center;
}
</style>
