<template>
  <div class="contentpanel my-custom-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-s-el-icon-s-goods"></i>
          <h2>{{ $t("mycustomer.售后工单") }}</h2>
        </div>
      </div>
      <div class="right">
      </div>
    </div>
    <div class="pagebody" v-loading="loading">
      <el-row :gutter="15" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <el-row :gutter="20">
              <el-col :span="24">
                <div ref="pageFilter" class="page-filter">
                  <el-form :inline="true" size="mini">                                     

                    <el-form-item :label="$t('mycustomer.客户活跃度')">
                      <el-select
                        v-model="filterParams.dynamic"
                        style="width: 90px"
                        :placeholder="$t('mycustomer.all')"
                        @change="filterGetItem"
                      >
                        <el-option :label="$t('mycustomer.all')" value></el-option>
                        <el-option :label="$t('mycustomer.活跃')" value="1"></el-option>
                        <el-option :label="$t('mycustomer.非活跃')" value="2"></el-option>
                      </el-select>
                    </el-form-item> 
                  </el-form>
                </div>
              </el-col>
            </el-row>
            <el-table :data="items" stripe row-key="id" style="width: 100%" height="650" ref="gridTable">
              <el-table-column prop="customerName" :label="$t('mycustomer.customersName')">
                <template slot-scope="scope">
                  <div>
                    <b>{{ scope.row.customerName }}</b>
                  </div>
                </template>
              </el-table-column>
              <el-table-column v-if="apiUserId == 148797" :label="$t('站长外部编号')">
                <template slot-scope="scope">{{scope.row.customCode || '--'}}</template>
              </el-table-column>
              <el-table-column :label="$t('员工名称')">
                <template slot-scope="scope">{{scope.row.inviterName || '--'}}</template>
              </el-table-column>
              <el-table-column :label="$t('是否开启二级分销商')">
                <template slot-scope="scope">
                  <el-switch
                  v-model="scope.row.distributionSwitch"
                  active-value="1"
                  inactive-value="2"
                  active-color="#13ce66"
                  @change="changeSwitch($event,scope.row.id,scope.row.customerName)"
                  inactive-color="#ff4949">
                </el-switch>
                </template>
              </el-table-column>                
              <el-table-column
                :label="`${$t('mycustomer.总信用额度')}/${$t('mycustomer.剩余信用额度')}`"
                align="center"
              >
                <template slot-scope="scope">
                  <p>{{Number(scope.row.creditAmount).toFixed(2) }}</p>
                  <p>{{ (Number(scope.row.creditAmount) - Number(scope.row.usedCreditAmount)).toFixed(2)   }}</p>
                </template>
              </el-table-column>
              <el-table-column :label="$t('mycustomer.operate')" width="230">
                <template slot-scope="scope">

                  <div>
                    <el-link type="primary" @click="openTX(scope.row)">提现</el-link>
                  </div>
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
        customCode: "",
        customerId: "",
        vendorSku: "",
        name: "",
        email: "",
        isAuth: "",
        dynamic:'',
        customerLike: "",
        relationshipId: "",
        inviterUserId: '',
        shopName: '',
        clientGrade: '',
        customerPhone: '',
        timeCreated: '',
        createTimeFrom: '',
        createTimeTo: '',
        accountName: '',
        clientGrade: '',
      },
      apiUserId: JSON.parse(localStorage.getItem('userInfo')).id,
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
    getItem (s) {
      this.loading = true

      this.$apiCall(
        "api.Relationship.findByVendor",
        {
          page: this.page,
          rowsPerPage: this.rowsPerPage,
          name: this.filterParams.name,
          accountName: this.filterParams.accountName,
          customerId: this.filterParams.customerId,
          customCode: this.filterParams.customCode,
          customerPhone: this.filterParams.customerPhone,
          vendorSku: this.filterParams.vendorSku,
          email: this.filterParams.email,
          isAuth: this.filterParams.isAuth,
          actDegree: this.filterParams.dynamic,
          customerLike: '',
          clientGrade: this.filterParams.clientGrade,
          relationshipId: this.filterParams.relationshipId,
          inviterUserId: this.filterParams.inviterUserId,
          createTimeFrom: this.filterParams.timeCreated? this.filterParams.timeCreated[0] : '',
          createTimeTo: this.filterParams.timeCreated? this.filterParams.timeCreated[1] : '',
          status: 1,
        },
        (r) => {
          this.loading = false
          if (r.ErrorCode == 9999) {
            this.items = r.Data.Results
            this.items.forEach((n) => {
              this.$apiCall(
                "api.Relationship.getCntDetail",
                {
                  relationshipId: n.id,
                },
                (i) => {
                  if (i.ErrorCode == 9999) {
                    n.invoiceCnt = i.Data.Results.invoiceCnt
                    n.totalAmount = i.Data.Results.totalAmount
                    n.orderCnt = i.Data.Results.orderCnt
                    n.skuCnt = i.Data.Results.skuCnt
                    n.offerSkuCnt = i.Data.Results.offerSkuCnt
                    this.items = [...this.items]
                  }
                }
              )
            })

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
    changePageSize (val) {
      this.rowsPerPage = val
      localStorage.setItem("myCustomRowsPerPage", val)
      this.getItem()
    },
    gotoPage () {
      this.page = this.$route.query.page ? Number(this.$route.query.page) : 1
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