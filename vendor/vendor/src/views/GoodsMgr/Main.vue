<template>
  <div class="contentpanel goods-mgr-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-s-goods"></i>
          <h2>{{$t('goods.商品管理')}}</h2>
        </div>
      </div>
      <div class="right">
          <el-button type="primary" v-if="vendorId != '148982' && vendorId != '146428'&& vendorId != '144875'&& vendorId != '144843'&& vendorId != '143779'&& vendorId != 143654 && vendorId != '74'"  size="small" @click="handleVat" style="margin-right:10px"> {{$t('goods.vat税设置')}}</el-button>
        <el-badge
          v-if="exportBtn.isShow"
          :hidden="!exportBtn.process.status"
          :type="exportBtn.process.status ? exportBtn.process.statusObj[exportBtn.process.status].type : 'info'"
          :value="exportBtn.process.status ? exportBtn.process.statusObj[exportBtn.process.status].txt : ''"
          class="export-btn"
        >
          <el-link
            type="primary"
            class="mg-r-15"
            @click="openDialogExport"
            :disabled="!$isRole($route.meta.roleWrite)"
          >{{$t('goods.导出产品')}}</el-link>
        </el-badge>
        <el-link
          type="primary"
          class="mg-r-30"
          v-if="vendorId != '148982' && vendorId != '146428'&& vendorId != '144875'&& vendorId != '144843'&& vendorId != '143779'&& vendorId != 143654 && vendorId != '74'"
          @click="openDialogImport"
          :disabled="!$isRole($route.meta.roleWrite)"
        >{{$t('goods.导入产品')}}</el-link>
        <el-button
          type="primary"
          size="small"
          @click="goto('AddGoods')"
          :disabled="!$isRole($route.meta.roleWrite)"
        >{{$t('goods.新增产品')}}</el-button>
        <el-button
          type="primary"
          size="small"
          @click="collectGoods()"
          :disabled="!$isRole($route.meta.roleWrite)"
        >{{$t('goods.采集商品')}}</el-button>
      </div>
    </div>
    <div v-loading="loading" class="pagebody">
      <el-card>
        <el-row>
          <el-col :span="24" ref="pageTabs">
            <div
              style="position: absolute;right: 0;"
              v-if="$root.$children[0].vipNowDetail && $root.$children[0].vipNowDetail.productCnt"
            >{{$t('package.当前版本支持上架商品数为：{num1}个SPU，目前剩余{num2}个',{num1:$root.$children[0].vipNowDetail.productCnt,num2:$root.$children[0].vipNowDetail.nowProductCnt})}}</div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane :label="$t('goods.全部')"  name="GoodsMgrAll"></el-tab-pane>
              <el-tab-pane :label="$t('goods.已上架')" name="GoodsMgrOn">
                <span slot="label">
                   {{$t('goods.已上架')}} <el-badge :value="onSale" class="item" type="primary">
                    </el-badge>
                </span>
              </el-tab-pane>
              <el-tab-pane :label="$t('goods.已下架')" name="GoodsMgrOff">
                <span slot="label">
                   {{$t('goods.已下架')}} <el-badge :value="offSale" class="item" type="warning">
                    </el-badge>
                </span>
              </el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="24">
            <router-view
              :key="pageKey"
              ref="subPage"
              :loading="loading"
              :items="items"
              :categroyArr="selectCategroyArr"
              :filterData="filterData"
              @goto="goto"
              @changeStatus="changeStatus"
              @changeStatusAll="changeStatusAll"
              @delSelected="delSelected"
              @filterGetItem="filterGetItem"
              @clearFilter="clearFilter"
              @openChangeCategory="openChangeCategory"
              @openVisiableCus="openVisiableCus"
            />

            <!-- 底部分页 -->
            <div ref="tableFooter">
              <el-row v-if="items.length" :gutter="20">
                <el-col :span="24" class="d-flex justify-content-center">
                  <div style="position: relative; top: 10px">
                    <el-pagination
                      :current-page="Number(page)"
                      :background="true"
                      layout="sizes, total, prev, pager, next, jumper"
                      :page-sizes="pageSize"
                      :page-size="rowsPerPage"
                      :total="Number(total)"
                      @current-change="toPage"
                      @size-change="changePageSize"
                    ></el-pagination>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <el-dialog
  :title="$t('goods.vat税设置')"
  :visible.sync="showVatDialog"
  width="40%">
  <span class="fnn"> <i>{{$t('是否开启vat税')}}</i> <el-switch
  v-model="vatFlag"
  active-color="#13ce66"
  inactive-color="rgb(237 237 237)">
</el-switch></span>
<el-button type="primary" @click="addCountry()" size="mini">{{$t('添加国家')}}</el-button>
<p class="error-tips"> <i class="el-icon-info"></i> {{$t('注：国家/国家二字码/vat税必填')}}</p>
  <div style="padding:10px" v-if="vatFlag">
    <el-form :model="formData" :rules="formData.rules" ref="formRef">
        <el-table
      :data="formData.vatData"
      border
      class="catTable"
      style="width: 95%;margin-left:2.5%">
      <el-table-column
        prop="name"
        :label="$t('goods.国家')"
        align="center">
        <template slot-scope="scope">
          <el-form-item :prop="'vatData.' + scope.$index + '.name'" :rules="formData.rules.name">
              <el-input  v-model="scope.row.name" ></el-input>
          </el-form-item>          
        </template>        
      </el-table-column>
      <el-table-column
        prop="code"
        :label="$t('goods.国家二字码')"
        align="center">
        <template slot-scope="scope">
          <el-form-item :prop="'vatData.' + scope.$index + '.name'" :rules="formData.rules.code">
              <el-input v-model="scope.row.code" ></el-input>
          </el-form-item>          
        </template>        
      </el-table-column>   
      <el-table-column
        prop="type"
        :label="$t('orders.类型')"
        align="center">
        <template slot-scope="scope">
          <el-form-item :prop="'vatData.' + scope.$index + '.name'" :rules="formData.rules.type">
              <el-select v-model="scope.row.type" :placeholder="$t('orders.请选择类型')">
                <el-option
                  :label="$t('orders.只计算商品价格')"
                  :value="1">
                </el-option>
                <el-option
                  :label="$t('orders.计算商品价格和运费')"
                  :value="2">
                </el-option>                
              </el-select>
          </el-form-item>          
        </template>        
      </el-table-column>            
      <el-table-column
        prop="vat"
        :label="`${$t('goods.vat税')}(%)`"
        align="center"       
        >
        <template slot-scope="scope">
          <el-form-item :prop="'vatData.' + scope.$index + '.name'" :rules="formData.rules.value">
              <el-input type="number" v-model="scope.row.value" ></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column :label="$t('操作')"  width="70" align="center" >
        <template slot-scope="scope">
            <el-link type="danger" @click="deleteVat(scope.$index, vatData)">{{$t('删除')}}</el-link>
        </template>        
      </el-table-column>
    </el-table>
    </el-form>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="saveVat('formRef')">{{$t('goods.确定')}}</el-button>
  </span>
</el-dialog>
    <DialogExport
      :data="dialogExportData"
      :filterData="filterData"
      :exportTime="exportTime"
      @runExport="runExport"
      @resetExport="resetExport"
      @breakDown="breakDown"
    />
    <DialogImport :data="dialogImportData" @uploadSuccess="uploadSuccess" />
    <dialogVisibleCus :keyData="dialogVisibleCustomers" />
    <template v-if="$root.$children[0].vipNowDetail && $root.$children[0].vipNowDetail.productCnt">
      <el-dialog :visible="dialogVipUp" width="400px" @close="dialogVipUp = false">
        <el-divider></el-divider>
        <div
          style="padding:20px;font-size:18px;line-height:36px"
        >{{$t('goods.您当前的商品上架数量已达')}}{{$root.$children[0].vipNowDetail.productCnt}} {{$t('goods.个，是否进行套餐升级？')}}</div>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVipUp = false">
            {{
            $t("shop.取消")
            }}
          </el-button>
          <!-- <el-button type="primary" @click="goToUP"> 升级套餐 </el-button> -->
        </div>
      </el-dialog>
    </template>
    <DialogSelectCategory :data="dialogSelectCategoryData" :categroyArr="selectCategroyArr"></DialogSelectCategory>
    <DialogCollect :data="collectGoodsData" @collectSuccess="collectSuccess"></DialogCollect>
  </div>
</template>

<script>
import DialogExport from '@/views/GoodsMgr/DialogExport'
import DialogImport from '@/views/GoodsMgr/DialogImport'
import dialogVisibleCus from '@/views/GoodsMgr/dialogVisibleCus'
import DialogSelectCategory from '@/views/GoodsMgr/DialogSelectCategory'
import DialogCollect from '@/views/GoodsMgr/DialogCollect'
export default {
  data () {
    return {
      dialogVisibleCustomers: {
        isShow: false,
        items: [],
        Pagination: {},
        pproductId: ""
      },
      onSale: 0,
      offSale: 0,
      formData: {
        rules: {
            name: {
              required: true,
              message: this.$t('goods.请输入国家'),
              tirgger: ['blur', 'change']
            },
            code: {
              required: true,
              message: this.$t('goods.请输入国家code'),
              tirgger: ['blur', 'change']
            },
            type: {
              required: true,
              message: this.$t('orders.请选择类型'),
              tirgger: [ 'change']
            },            
            value: {
              required: true,
              message: this.$t('goods.请输入vat税'),
              tirgger: ['blur', 'change']
            },            
          },
          vatData:[]
      },
      showVatDialog: false,
      vatFlag: false,
      vendorId: localStorage.getItem('vendorId'),
      dialogVipUp: false,
      loading: false,
      pageKey: new Date().valueOf(),
      activeName: "",
      pageSize: [10, 20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem(`${this.$route.name}RowsPerPage`)
        ? Number(localStorage.getItem(`${this.$route.name}RowsPerPage`))
        : 10,
      items: [],
      total: 0,
      totalPage: 0,
      productTypeArr: this.$dict.productTypeArr,
      filterData: {
        name: '',
        nameIpt: '',
        categoryId: '',
        categroyPath: [], //选择的分类
        costFrom: '',
        costTo: '',
        costFromIpt: undefined,
        costToIpt: undefined,
        productType: '',
        spu: '',
        sku: ''
      },
      defaultFilterData: '{}',
      dialogExportData: {
        isShow: false,
        loading: false,
        step: 0,
        method: 'selected',
        process: {
          status: '', // 1成功 2失败 3进行中
          totalNum: 1, //总数
          execNum: 0, //完成数
          uploadUrl: '',
        }
      },
      exportBtn: {
        isShow: false,
        process: {
          status: '',
          statusObj: {
            1: {
              type: 'success',
              txt: this.$t('goods.请下载'),
            },
            2: {
              type: 'danger',
              txt: this.$t('goods.失败'),
            },
            3: {
              type: 'warning',
              txt: this.$t('goods.请稍候'),
            }
          }
        }
      },
      exportTime: 0,
      defaultDialogExportData: '{}',
      dialogImportData: {
        loding: false,
        isShow: false,
        file: null,
        filePath: '',
      },
      defaultDialogImportData: '{}',
      dialogSelectCategoryData: {
        isShow: false,
        loading: false,
        selected: [],
        ids: [],
      },
      defaultDialogSelectCategory: '{}',
      collectGoodsData: {
        isShow: false,
        loading: false,
        categroyArr: []
      },
      defaultCollectGoodsData: '{}',
      vatData: [{
            name: '德国',
            value: '',
            code: 'DE',

          }]
    }
  },
  components: {
    DialogExport,
    DialogImport,
    dialogVisibleCus,
    DialogSelectCategory,
    DialogCollect,
  },
  computed: {
    selectCategroyArr () {
      let arr = JSON.parse(JSON.stringify(this.$store.state.categroyArr))
      arr.forEach(l1 => {
        l1['children'] = l1.list
        l1['value'] = l1.id
        l1['label'] = l1.name
        if (l1.children && l1.children.length) {
          l1.children.forEach(l2 => {
            l2['children'] = l2.list
            l2['value'] = l2.id
            l2['label'] = l2.name
            if (l2.children && l2.children.length) {
              l2.children.forEach(l3 => {
                l3['value'] = l3.id
                l3['label'] = l3.name
              })
            }
          })
        }
      })
      return arr
    },
  },
  watch: {
    $route: "gotoPage",
  },
  mounted () {
    if (this.$route.params.vip) {
      this.dialogVipUp = true
    }
    this.defaultDialogExportData = JSON.stringify(this.dialogExportData)
    this.defaultDialogImportData = JSON.stringify(this.dialogImportData)
    this.defaultFilterData = JSON.stringify(this.filterData)
    this.defaultDialogSelectCategory = JSON.stringify(this.dialogSelectCategoryData)
    this.defaultCollectGoodsData = JSON.stringify(this.collectGoodsData)
    this.activeName = this.$route.name
    this.getCategroy()
    this.getItems()
    this.exportProcess()
  },
  methods: {
    collectGoods () {
      this.collectGoodsData.isShow = true
      this.collectGoodsData.categroyArr = this.selectCategroyArr
    },
    handleVat(){
      this.showVatDialog = true
        this.$apiCall('api.Product.getVatConfig',{}, r => {
        if (r.ErrorCode == 9999) {     
          console.log(r, 'r.Data.Results');   
          let  vatList = r.Data.Results.vatList           
          this.formData.vatData = vatList.map(item => {
            if (!item.type) {
              item.type = 1
            }else{
              item.type = Number(item.type) 
            }
            return item
          })
          this.vatFlag = r.Data.Results.vatState == 1 ? true : false
        } else {
          this.$message({
            message: r.Message,
            type: "error"
          })
        }
      })
    },
    addCountry(){
        
      this.formData.vatData.push({
            name: "", code: "", value: ""
      })
    },
    saveVat(formName){
      let params = {
        vatState: this.vatFlag == true ? '1' : '2' ,
        vatList:this.formData.vatData
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$apiCall('api.Product.setVatConfig', params, r => {
              if (r.ErrorCode == 9999) {
                this.$message.success(r.Message)
                this.formData.vatData = []
                this.showVatDialog = false
              } else {
                this.$message({
                  message: r.Message,
                  type: "error"
                })
              }
          })
        }else{
          this.$message.error( this.$t('goods.请检查是否填完信息'))
          return false;
        }
      });       

    },
    deleteVat(index, rows){
        this.formData.vatData.splice(index, 1);
    },
    collectSuccess () {
      this.collectGoodsData.isShow = false
      this.$message({ message: this.$t('goods.采集成功'), type: "success" })
      this.toPage(1)
    },
    openVisiableCus (id) {
      this.$apiCall('api.VendorShop.getVisibleCustomers', {
        productId: id,
        page: 1,
        rowsPerPage: 10,
      }, r => {
        if (r.ErrorCode == 9999) {
          if (r.Data.Results.length) {
            this.dialogVisibleCustomers.isShow = true
            this.dialogVisibleCustomers.items = r.Data.Results
            this.dialogVisibleCustomers.Pagination = r.Data.Pagination
            this.dialogVisibleCustomers.pproductId = id
          }
        } else {
          this.$message({
            message: r.Message,
            type: "error"
          })
        }
      })
    },
    openChangeCategory (ids) {
      //打开批量改分类
      this.dialogSelectCategoryData = JSON.parse(this.defaultDialogSelectCategory)
      this.dialogSelectCategoryData.ids = ids
      this.dialogSelectCategoryData.isShow = true
    },
    goToUP () {
      this.$router.push({
        name: "pricingUp"
      })
    },
    breakDown () {
      //中止导出
      clearInterval(this.exportTime)
      this.exportTime = 0
      this.exportBtn.process.status = ''
      this.dialogExportData.isShow = false
      this.$apiCall("api.VendorShop.finishedExportProduct", {}, r => {
        if (r.ErrorCode != 9999) {
          this.$message({ message: this.$t('goods.中止导出失败'), type: "error" })
        }
      })
    },
    resetExport () { //重置导出
      this.exportBtn.process.status = ''
      this.$apiCall("api.VendorShop.finishedExportProduct", {}, r => { })
      this.openDialogExport()
    },
    exportProcess () { //导出进程查询
      this.$apiCall('api.VendorShop.exportProductProcess', {}, r => {
        this.exportBtn.isShow = true
        if (r.ErrorCode == 9999) {
          let results = r.Data.Results
          if (!results || results.status != 3) {
            clearInterval(this.exportTime)
            this.exportTime = 0
          }
          if (results.status == 1) { //成功
            this.exportBtn.process.status = 1
            this.dialogExportData.step = 2
            this.dialogExportData.process.status = 1
            this.dialogExportData.process.uploadUrl = results.uploadUrl
          }
          if (results.status == 2) { //失败
            this.exportBtn.process.status = 2
            this.dialogExportData.step = 2
            this.dialogExportData.process.status = 2
          }
          if (results.status == 3) { //进行中
            this.exportBtn.process.status = 3
            this.dialogExportData.step = 1
            this.dialogExportData.process.status = 3
            this.dialogExportData.process.totalNum = results.totalNum
            this.dialogExportData.process.execNum = results.execNum
          }
          if (!results) { //没用下载任务
            this.exportBtn.process.status = ''
          }
        }
      })
    },
    runExport (params) { //导出接口
      this.dialogExportData.loading = true
      params.page = 1 //total 需要个page
      this.$apiCall("api.VendorShop.searchExcelProducts", params, r => {
        //不等返回
      })
      this.dialogExportData.step = 1
      this.exportTime = setInterval(() => {
        this.exportProcess()
      }, 1000)
    },
    openDialogExport () {
      if (!this.exportBtn.process.status)
        this.dialogExportData = JSON.parse(this.defaultDialogExportData)
      this.dialogExportData.isShow = true
    },
    uploadSuccess (type) { //导入成功
      setTimeout(() => {
        this.dialogImportData.isShow = false
        if (type == 'error') {
          this.$message({ message: type ? this.$t('goods.导入失败，下载查看错误文件') : this.$t('goods.导入成功'), type: type ? "error" : "success" })
        } else {
          this.toPage(1)
        }
      }, 1000)
    },
    openDialogImport () {
      this.dialogImportData = JSON.parse(this.defaultDialogImportData)
      this.dialogImportData.isShow = true
    },
    filterGetItem () {
      this.filterData.name = this.filterData.nameIpt
      this.filterData.categoryId = this.filterData.categroyPath[this.filterData.categroyPath.length - 1]
      if (this.filterData.costFromIpt && this.filterData.costToIpt && this.filterData.costFromIpt > this.filterData.costToIpt) { //最小金额超过最大金额
        this.filterData.costToIpt = undefined
      }
      this.filterData.costFrom = this.filterData.costFromIpt
      this.filterData.costTo = this.filterData.costToIpt
      this.toPage(1)
    },
    clearFilter (type) {
      switch (type) {
        case 'categoryId':
          this.filterData.categroyPath = []
          this.filterData.categoryId = ''
          break
        case 'name':
          this.filterData.nameIpt = this.filterData.name = ''
          break
        case 'cost':
          this.filterData.costFromIpt = this.filterData.costToIpt = undefined
          this.filterData.costFrom = this.filterData.costTo = ''
          break
        case 'productType':
          this.filterData.productType = ''
          break
        case 'sku':
          this.filterData.sku = ''
          break
        case 'spu':
          this.filterData.spu = ''
          break
        default:
          this.filterData = JSON.parse(this.defaultFilterData)
      }
      if (type != 'none')
        this.toPage(1)
    },
    getItems (s) {
      this.loading = true
      this.$apiCall("api.VendorShop.vendorFindProducts", {
        page: this.page,
        rowsPerPage: this.rowsPerPage,
        name: this.filterData.name,
        categoryId: this.filterData.categoryId,
        status: this.$route.name == "GoodsMgrAll" ? '' : (this.$route.name == 'GoodsMgrOn' ? '1' : '2'),
        costFrom: this.filterData.costFrom,
        costTo: this.filterData.costTo,
        productType: this.filterData.productType,
        stockSku: this.filterData.sku,
        spu: this.filterData.spu,
      }, r => {
        this.loading = false
        if (r.ErrorCode == 9999) {
          this.onSale = r.Data.Results.onSale;
          this.offSale = r.Data.Results.offSale;
          this.$refs.subPage.checkboxArr = []
          this.items = r.Data.Results.products.map(item => {
            item.imgUrlArr = JSON.parse(item.imgUrlJson)
            item.statusIpt = item.status == '1'
            return item
          })
          this.total = Number(r.Data.Pagination.totalCount)
          this.totalPage = Number(r.Data.Pagination.totalPage)
          if (!s) this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0
        }
      })
    },
    getCategroy () {
      if (this.$store.state.categroyArr.length) {
        return
      }
      this.$apiCall("api.ProductCategory.findByVendorRelateCategory", {}, r => {
        if (r.ErrorCode == 9999) {
          this.$store.commit("setCategroyArr", r.Data.Results)
        }
      })
    },
    delSelected (productIds) { //删除 批量
      this.loading = true
      this.$apiCall("api.VendorShop.vendorChangeProducts", {
        type: "delete",
        productIds,
      }, r => {
        if (r.ErrorCode == 9999) {
          this.$refs.subPage.checkboxArr = []
        } else if (r.ErrorCode == 20210801) {
          this.dialogVipUp = true
          //弹出限制框 
        } else {
          this.$message({ message: r.Message, type: "error" })
        }
        this.getItems() //不管成功失败都刷新列表
      })
    },
    changeStatusAll (checkboxArr, status) { //上下架 批量
      this.loading = true
      this.$apiCall("api.VendorShop.vendorChangeProducts", {
        type: 'change',
        productIds: checkboxArr,
        status: status ? '1' : '2',
      }, r => {
        this.loading = false
        if (r.ErrorCode == 9999) {
          this.$refs.subPage.checkboxArr = []
          setTimeout(() => {
            this.$root.$children[0].getVipDetail()
          }, 1000)
          this.getItems()
        } else if (r.ErrorCode == 20210801) {
          this.dialogVipUp = true
          //弹出限制框 
        } else {
          this.$message({ message: r.Message, type: "error" })
        }
      })
    },
    changeStatus (item) { //上下架 单个   
      this.loading = true
      let status = item.status == '1' ? '2' : '1'
      this.$apiCall("api.VendorShop.vendorChangeProducts", {
        type: 'change',
        productIds: [item.id],
        status,
      }, r => {
        this.loading = false
        if (r.ErrorCode == 9999) {
          item.status = status
          setTimeout(() => {
            this.$root.$children[0].getVipDetail()
          }, 1000)

        } else if (r.ErrorCode == 20210801) {
          this.dialogVipUp = true
          //弹出限制框 
        } else {
          this.$message({ message: r.Message, type: "error" })
        }
        item.statusIpt = item.status == '1'
      })
    },
    handleClick (tab) {
      if (tab.name == this.$route.name) {
        //点击相同路由刷新
        this.pageKey = new Date().valueOf()
      } else {
        //tabs 切换
        this.clearFilter('none')
        this.$refs.subPage.checkboxArr = []
        this.$router.push({ name: tab.name })
      }
    },
    goto (name) {
      let id = localStorage.getItem('vendorId')
      if ( id !=148982 && id!=146428 && id != 144875 && id != 144843 && id != 143779 && id != 143654 && id != 74) {
        let name = 'AddGoods2'
        this.$router.push({ name })
      } else {
        this.$router.push({ name })
      }


    },
    gotoPage () {
      this.page = this.$route.query.page ? this.$route.query.page : 1
      this.$nextTick(() => {
        this.getItems()
      })
    },
    toPage (val) {
      if (val != this.$route.query.page) {
        this.$router.push({
          query: {
            page: val,
          },
        })
      } else {
        this.getItems()
      }

    },
    changePageSize (val) {
      this.rowsPerPage = val
      localStorage.setItem(`${this.$route.name}RowsPerPage`, val)
      this.getItems()
    },
  },

}
</script>

<style lang="scss">
.goods-mgr-page {
  .export-btn {
    .el-badge__content.is-fixed {
      top: -18px;
      right: auto;
      left: -2px;
      transform: none;
    }
  }
}
.fnn{
  padding: 20px;
  i{
    padding-right: 10px;
  }
}
.error-tips{
  color: rgb(238, 9, 9);
  padding: 10px 0 10px 22px;
}

</style>

<style>
.catTable .el-form-item{
  margin-bottom: 0 !important;
}
</style>

