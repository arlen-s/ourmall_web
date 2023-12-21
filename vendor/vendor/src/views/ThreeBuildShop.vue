<template>
  <div class="contentpanel my-custom-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-s-el-icon-s-goods"></i>
          <h2>{{ $t("transaction.绑定商品列表") }}</h2>
        </div>
      </div>
      <div class="right">
        <el-button type="primary" size="medium" @click="open()">
          {{
          $t("transaction.绑定新商品")
          }}
        </el-button>
      </div>
    </div>
    <div class="pagebody" v-loading="loading">
      <el-row :gutter="15" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <el-table
              :data="items"
              stripe
              row-key="id"
              style="width: 100%"
              height="650"
              ref="gridTable"
            >
              <el-table-column prop="customerName" :label="$t('transaction.客户邮箱')">
                <template slot-scope="scope">
                  <div>
                    <b>{{ scope.row.customer }}</b>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="customerName" :label="$t('transaction.绑定SKU')">
                <template slot-scope="scope">
                  <div>
                    <b>{{ scope.row.stock.sku }}</b>
                  </div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('transaction.绑定SKU图片')">
                <template slot-scope="scope">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.stock.propertyImage"
                    fit="fit"
                  ></el-image>
                </template>
              </el-table-column>
              <el-table-column :label="$t('transaction.被绑定SKU')">
                <template slot-scope="scope">{{ scope.row.mainProduct ?scope.row.mainProduct.name : '' }}</template>
              </el-table-column>
              <el-table-column :label="$t('transaction.被绑定SKU图片')">
                <template slot-scope="scope">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.mainProduct.imgsJson? scope.row.mainProduct.imgsJson[0]: ''"
                    fit="fit"
                  ></el-image>
                </template>
              </el-table-column>
              <el-table-column :label="$t('mycustomer.operate')" width="230">
                <template slot-scope="scope">
                  <div>
                    <el-popconfirm
                      title="Are you sure you want to delete it?"
                      :key="scope.row.id"
                      confirm-button-text="Confirm"
                      cancel-button-text="Cancel"
                      @confirm="cancel(scope.row)"
                    >
                      <el-link
                        type="danger"
                        slot="reference"
                        style="margin-left:5px"
                      >{{$t('transaction.删除')}}</el-link>
                    </el-popconfirm>
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
    <el-dialog
      :title="$t('transaction.新增绑定商品')"
      :visible.sync="dialogVisibleAdd"
      @open="open()"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <el-form :label-position="'left'" ref="replyForm" class="mg-t-20">
          <el-form-item :label="$t('quotation.客户选择')" label-width="150px" required>
            <el-select
              filterable
              remote
              :remote-method="remoteMethodCustom"
              :loading="selectLoading"
              :placeholder="$t('myinvoice.pleaseCusName')"
              clearable
              v-model="addShopForm.name"
              @change="filterGetItem()"
              @clear="close"
            >
              <el-option
                v-for="opt in selectArr"
                :key="opt.id"
                :label="opt.customerName"
                :value="opt.customerName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('quotation.添加被绑定商品')" label-width="150px" required>
            <div class="d-flex">
              <el-link type="primary" @click="openSelect('1')">{{$t('quotation.选择商品')}}</el-link>
            </div>
          </el-form-item>
          <el-form-item :label="$t('quotation.商品图片')" label-width="150px" required>
            <div class="upload">
              <i class="el-icon-plus" v-if="!addShopForm.imgUrl"></i>
              <el-image
                style="width: 100%; height: 100%"
                :src="addShopForm.imgUrl"
                :fit="'cover'"
                v-else
              ></el-image>
            </div>
          </el-form-item>
          <el-form-item :label="$t('quotation.添加绑定商品')" label-width="150px" required>
            <div class="d-flex">
              <el-link type="primary" @click="openSelect('2')">{{$t('quotation.选择商品')}}</el-link>
            </div>
          </el-form-item>
          <el-form-item :label="$t('quotation.绑定商品图片')" label-width="150px" required>
            <div class="upload">
              <i class="el-icon-plus" v-if="!addShopForm.imgUrlBuild"></i>
              <el-image
                style="width: 100%; height: 100%"
                :src="addShopForm.imgUrlBuild"
                :fit="'cover'"
                v-else
              ></el-image>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="mg-t-20">
          <el-button @click="handleClose">{{$t('quotation.取消')}}</el-button>
          <el-button type="primary" @click="quote">{{$t('quotation.确定')}}</el-button>
        </div>
      </span>
    </el-dialog>
    <selectProduct :data="dialogProductList" up="up" />
  </div>
</template>

<script>
import selectProduct from '../components/dialog/DialogSelectProduct2.0.vue'
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
      dialogVisibleAdd: false,
      selectLoading: false,
      selectArr: [],
      addShopForm: {
        name: '',
        imgUrlBuild: '',
        imgUrl: '',
        customerId: '',
        mainProductId: '',
        productId: '',
        sku: '',
      },
      dialogProductList: {
        item: null,
        items: [],
        isShow: false,
        variableId: null,
        type: 1,
      }
    }
  },
  components: {
    selectProduct
  },
  watch: {
  },
  mounted () {
    this.getItem()

  },

  methods: {
    getItem () {
      this.loading = true

      this.$apiCall(
        "api.ShopifyProductBundling.getList",
        {
          page: this.page,
          rowsPerPage: this.rowsPerPage,
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
    open () {
      this.dialogVisibleAdd = true
    },
    handleClose () {
      this.addShopForm = {
        name: '',
        imgUrlBuild: '',
        imgUrl: '',
        customerId: '',
        mainProductId: '',
        productId: '',
        sku: '',
      }
      this.dialogVisibleAdd = false
    },
    changePageSize (val) {
      this.rowsPerPage = val
      localStorage.setItem("myCustomRowsPerPage", val)
      this.getItem()
    },
    filterGetItem () {
      this.selectArr.forEach((c) => {
        if (c.customerName == this.addShopForm.name)
          this.addShopForm.customerId = c.customerId
      })
    },
    close () {
      this.selectArr = []
    },
    cancel (row) {
      this.$apiCall(
        "api.VendorShopProductBundling.delBunding",
        {
          id: row.id,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            this.getItem()
          } else {
            this.$message({ message: r.Message, type: "error" })
          }
        }
      )
    },
    remoteMethodCustom (query) {
      this.selectArr = []
      //获取筛选客户
      if (!query) return
      this.selectLoading = true
      this.$apiCall("api.Relationship.findByVendor", { name: query }, (r) => {
        this.selectLoading = false
        if (r.ErrorCode == 9999) {
          this.selectArr = r.Data.Results
        } else {
          this.$message({ message: r.Message, type: "error" })
        }
      })
    },
    getProduct () {
      this.$apiCall("api.VendorShop.vendorFindProducts", {
        status: 1,
        page: 1,
        rowsPerPage: 10,
      }, r => {
        if (r.ErrorCode == 9999) {
          let tempArr = r.Data.Results.products.map(e => {
            e.imgUrlArr = JSON.parse(e.imgUrlJson)
            e.statusIpt = e.status == '1'
            return e
          })
          console.log(tempArr, 'tempArr');
          tempArr.forEach(item1 => {
            if (item1.stocks && item1.stocks.length) {
              item1.stocks.forEach(obj => {
                this.$set(obj, "name", item1.name)
                this.dialogProductList.items.push(obj)
              })
            }
            this.dialogProductList.item.push(item1)
          })

        } else {
          this.$message({ message: r.Message, type: "error" })
        }
      })
    },
    openSelect (type) {
      this.getProduct()
      type == 2 ? this.dialogProductList.variableId = 21 : this.dialogProductList.variableId = null
      this.dialogProductList.type = type
      this.dialogProductList.isShow = true

    },
    quote () {
      if (!this.addShopForm.customerId) {
        this.$message({ message: this.$t('transaction.请选择客户'), type: "error" })
        return
      }
      if (!this.addShopForm.mainProductId) {
        this.$message({ message: this.$t('transaction.请选择商品'), type: "error" })
        return
      }
      if (!this.addShopForm.productId) {
        this.$message({ message: this.$t('transaction.请选择商品'), type: "error" })
        return
      }
      this.$apiCall(
        "api.VendorShopProductBundling.addBunding",
        {
          customerId: this.addShopForm.customerId,
          mainProductId: this.addShopForm.mainProductId,
          productId: this.addShopForm.productId,
          sku: this.addShopForm.sku,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            this.addShopForm = {
              name: '',
              imgUrlBuild: '',
              imgUrl: '',
              customerId: '',
              mainProductId: '',
              productId: '',
              sku: '',
            }
            this.dialogVisibleAdd = false
            this.getItem()
          } else {
            this.$message({ message: r.Message, type: "error" })
          }
        }
      )
    },
  },
};
</script>

<style lang="scss" scoped>
.upload {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  cursor: not-allowed;
  line-height: 100px;
  vertical-align: top;
  text-align: center;
  margin-right: 15px;
  i {
    font-size: 16px;
  }
}
</style>