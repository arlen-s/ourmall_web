<template>
  <div class="contentpanel my-custom-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-s-el-icon-s-goods"></i>
          <h2>{{ $t("售后工单") }}</h2>
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
                    <el-form-item :label="$t('工单类型')">
                      <el-select
                        v-model="filterParams.type"
                        style="width: 90px"
                        :placeholder="$t('all')"
                        @change="filterGetItem"
                      >
                        <el-option :label="$t('all')" value></el-option>
                        <el-option :label="$t('退款')" value="1"></el-option>
                        <el-option :label="$t('更换')" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('status')">
                      <el-select
                        v-model="filterParams.status"
                        style="width: 90px"
                        :placeholder="$t('all')"
                        @change="filterGetItem"
                      >
                        <el-option :label="$t('all')" value></el-option>
                        <el-option :label="$t('待审核')" value="1"></el-option>
                        <el-option :label="$t('同意')" value="2"></el-option>
                        <el-option :label="$t('拒绝')" value="3"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('工单号')">
                      <el-input
                        :placeholder="$t('请输入')"
                        v-model="filterParams.orderNumber"
                        clearable
                      ></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('订单编号')">
                      <el-input
                        :placeholder="$t('请输入')"
                        v-model="filterParams.orderId"
                        clearable
                      ></el-input>
                    </el-form-item>                    
                    <el-form-item>
                      <el-button type="primary" @click="filterItem">Filter</el-button>
                      <el-button type="danger" @click="clearFilter">Clear</el-button>
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
              height="650"
              ref="gridTable"
            >
              <el-table-column prop="customerName" :label="$t('工单号')">
                <template slot-scope="scope">
                  <div>
                    <b>{{ scope.row.orderNumber }}</b>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="customerName" :label="$t('订单编号')">
                <template slot-scope="scope">
                  <div>
                    <b>{{ scope.row.orderId }}</b>
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column :label="$t('客户名称')">
                <template slot-scope="scope">{{scope.row.customCode || '--'}}</template>
              </el-table-column>
              <el-table-column :label="$t('店铺')">
                <template slot-scope="scope"></template>
              </el-table-column>-->
              <el-table-column :label="$t('交易类型')">
                <template slot-scope="scope">{{scope.row.type == 1? $t('退款'): $t('更换')}}</template>
              </el-table-column>
              <el-table-column :label="$t('问题类型')">
                <template slot-scope="scope">{{getType(scope.row)}}</template>
              </el-table-column>
              <el-table-column :label="$t('问题描述')">
                <template slot-scope="scope">{{scope.row.description || '--'}}</template>
              </el-table-column>
              <el-table-column :label="$t('创建时间')">
                <template slot-scope="scope">{{scope.row.timeCreated || '--'}}</template>
              </el-table-column>
              <el-table-column :label="$t('备注')">
                <template slot-scope="scope">{{scope.row.remark || '--'}}</template>
              </el-table-column>              
              <el-table-column :label="$t('状态')">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == 1">{{$t('待审核')}}</span>
                  <span v-else-if="scope.row.status == 2">{{$t('同意')}}</span>
                  <span v-else>{{$t('拒绝')}}</span>
                </template>
              </el-table-column>              
            </el-table>
          </el-card>
        </el-col>
      </el-row>
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
            ></el-pagination>
          </div>
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
      rowsPerPage: localStorage.getItem("myCustomRowsPerPage")
        ? Number(localStorage.getItem("myInvoiceRowsPerPage"))
        : 10,
      items: [],
      total: 0,
      totalPage: 0,
      filterParams: {
        orderNumber: "",
        status: '',
        type: '',
        orderId: '',
      },
      questionList: [
        { label: this.$t('修改客户相关信息'), id: 1 },
        { label: this.$t('取消订单'), id: 2 },
        { label: this.$t('无跟踪信息'), id: 3 },
        { label: this.$t('跟踪信息长时间未更新'), id: 4 },
        { label: this.$t('物品损坏'), id: 5 },
        { label: this.$t('物品丢失'), id: 6 },
        { label: this.$t('发送错误产品'), id: 7 },
        { label: this.$t('发送错误地址'), id: 8 },
        { label: this.$t('订单暂停'), id: 9 },
      ],
    }
  },
  components: {
  },
  watch: {
    $route: "gotoPage",
  },
  mounted () {
    this.getItem()

  },

  methods: {
    getItem () {
      this.loading = true
      this.$apiCall(
        "api.OrderRefund.getList",
        {
          page: this.page,
          rowsPerPage: this.rowsPerPage,
          type: this.filterParams.name,
          orderNumber: this.filterParams.orderNumber,
          status: this.filterParams.status,
          orderId: this.filterParams.orderId
        },
        (r) => {
          this.loading = false
          if (r.ErrorCode == 9999) {
            this.items = r.Data.Results
            this.total = Number(r.Data.Pagination.totalCount)
            this.totalPage = Number(r.Data.Pagination.totalPage)
          } else {
            this.$message({ message: r.Message, type: "error" })
          }
        }
      )
    },
    toPage (val) {
      if (val != this.$route.query.page)
        this.$router.push({ query: { page: val } })
    },
    getType (row) {
      let fim = this.questionList.filter(item => {
        return item.id == row.type
      })
      return fim[0].label
    },
    changePageSize (val) {
      this.rowsPerPage = val
      localStorage.setItem("myCustomRowsPerPage", val)
      this.getItem()
    },
    gotoPage () {
      this.page = this.$route.query.page ? Number(this.$route.query.page) : 1
      this.getItem()
    },
    filterItem () {
      this.page = 1
      this.getItem()
    },
    clearFilter () {
      this.filterParams = {
        orderNumber: "",
        status: '',
        type: '',
      }
      this.page = 1
      this.getItem()
    },
  },
};
</script>

<style lang="scss" scoped>
.share-weixin {
  position: relative;
  text-decoration: none;
  background-color: rgb(75, 192, 42);
  height: 28px;
  font-family: Segoe UI Semibold, Segoe WP Semibold, Segoe WP, Segoe UI, Arial,
    Sans-Serif;
  color: white;
  margin: 1px;
  cursor: pointer;
  box-sizing: content-box;
  border-radius: 14px;
  padding: 0 14px;
  line-height: 28px;
  margin-right: 30px;
  display: inline-block;
}
.share-weixin:hover {
  background-color: rgb(26, 173, 25);
}
.customer-info-box {
  > div {
    display: flex;
    align-items: center;
    margin-bottom: 3px;
    color: #606266;
    > span {
      margin-right: 5px;
      i {
        line-height: 26px;
        font-size: 22px;
      }
    }
  }
}
.el-icon-chat-line-square {
  font-size: 18px;
  margin-left: 7px;
}
.up-avatar ::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  width: 78px;
  height: 78px;
  position: relative;
  overflow: hidden;
  img {
    // width: 100%;
    height: 78px;
  }
}
.up-avatar ::v-deep .avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  line-height: 78px;
  text-align: center;
}
.dialog-open-custom {
  .dialog-body {
    padding: 15px 20px;
    p {
      margin-bottom: 30px;
    }
  }
  ::v-deep .el-form-item__label {
    width: 110px !important;
    text-align: left !important;
  }
  .bonusRemark ::v-deep .el-form-item__content {
    flex: 1;
  }
}
.email-box {
  padding: 20px;
  .txt {
    padding-right: 15px;
  }
}
</style>