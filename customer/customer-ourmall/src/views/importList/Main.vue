<template>
   <div class="contentpanel import-page2">
     <div v-if="fromPage != 'home'" class="pagetitle" ref="pageHeader">
       <div class="left">
          <div class="title">
            <i class="el-icon-upload2"></i>
            <h2>{{$t('Import List')}}</h2>
          </div>
        </div>
     </div>
     <div class="pagebody" v-loading="loading">
       <el-card v-if="fromPage != 'home'" style="margin-bottom: 20px;">
        <el-row :gutter="20">
					<el-col :span="24">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane v-for="tab in tabsArr" :key="tab.id"
                ref="mainTab"
                :label="tab.name"
                :name="tab.id"
              >
                <!-- tabs内容 -->
                  <router-view ref="main" :key="pageKey"
                    :tab="tab" 
                    :loadingImport="loadingImport"
                    :pushLoading="pushLoading"
                    :exportLoading="exportLoading"
                    :delLoading="delLoading"
                    :AllChecked="AllChecked"
                    :items="items"
                    :tags="tags"
                    :allCnt="allCnt"
                    :doneCnt="doneCnt"
                    :filtersParams="filtersParams"
                    :shopOptArr="shopOptArr"
                    :filterAccountProps="filterAccountProps"
                    @changeAllItems="changeAllItems"
                    @batItems="batItems"
                    @openTagMgt="openTagMgt"
                    @removeCheckedTags="removeCheckedTags"
                    @singPush="singPush"
                    @editProduct="editProduct"
                    @delItem="delItem"
                    @importPorduct="importPorduct"
                    @openPushSetting="openPushSetting"
                    @setFilter="setFilter"
                    @clearFilter="clearFilter"
                    @delItem2="delItem2"
                    @gotoImportList="gotoImportList"
                  />
                <!-- tabs内容 end -->
              </el-tab-pane>
            </el-tabs>  
          </el-col>
        </el-row>
       </el-card> 
		<div style="margin: 0 0 30px;" v-else>
      <span v-if="this.vendorId != 148982 && this.vendorId != 146428 && this.vendorId != 144875 && this.vendorId != 144843 && this.vendorId != 143779 && this.vendorId != 143654 && this.vendorId != 74">
        			<subPage ref="main" :key="pageKey"
			  :tab="tab" 
			  :loadingImport="loadingImport"
			  :pushLoading="pushLoading"
			  :exportLoading="exportLoading"
			  :delLoading="delLoading"
			  :AllChecked="AllChecked"
			  :items="items"
			  :tags="tags"
			  :allCnt="allCnt"
			  :doneCnt="doneCnt"
			  :filtersParams="filtersParams"
			  :shopOptArr="shopOptArr"
			  :filterAccountProps="filterAccountProps"
			  @changeAllItems="changeAllItems"
			  @batItems="batItems"
			  @openTagMgt="openTagMgt"
			  @removeCheckedTags="removeCheckedTags"
			  @singPush="singPush"
			  @editProduct="editProduct"
			  @delItem="delItem"
			  @importPorduct="importPorduct"
			  @openPushSetting="openPushSetting"
			  @setFilter="setFilter"
			  @clearFilter="clearFilter"
			  @delItem2="delItem2"
			  @gotoImportList="gotoImportList"
			/>
      </span>
		</div>
       <el-row v-if="items.length" :gutter="20">
        <el-col :span="24" class="d-flex justify-content-center">
          <div style="margin-bottom:30px">
            <el-pagination
              :current-page="Number(page)"
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
     <DialogPush :dialogPush="dialogPush" :SelectedPushStoresNum="SelectedPushStoresNum"/>
     <DialogManagement ref="dialogTagMgr" :dialogTagManagement="dialogTagManagement"/>
     <DialogEditProduct 
      :dialogEditProduct="dialogEditProduct" 
      :currency="currency"
      :tab2Loading="tab2Loading"
       @openDialogSelectImg="openDialogSelectImg" 
       @saveEditProduct="saveEditProduct"
      />
     <DialogSelectImg :dialogSelectImg="dialogSelectImg" :dialogEditProduct="dialogEditProduct"/>
     <DialogPushSetting :dialogPushSetting="dialogPushSetting" @savePushSetting="savePushSetting"/>
  </div>
</template>

<script>
import DialogPush from '@/views/importList/DialogPush'
import DialogManagement from '@/views/importList/DialogTagManagement'
import DialogEditProduct from '@/views/importList/DialogEditProduct'
import DialogSelectImg from "@/views/importList/DialogSelectImg"
import DialogPushSetting from "@/views/importList/DialogPushSetting"
import subPage from '@/views/importList/Sub'
export default {
	props: ['fromPage'],
  data(){
    return {
      loading: false,
      pageKey: new Date().valueOf(),
      pageTime: 0,
      tabsArr: [ //id => status
        {name: this.$t('Waiting'), routerName: 'WaitingImport', id: '1', },
        {name: this.$t('Processing'), routerName: 'inImport', id: '2', },
        {name: this.$t('Completed'), routerName: 'imported', id: '3',},
        {name: this.$t('Failed'), routerName: 'importFailure', id: '4',},
      ],
      activeName: 1,
      loadingImport: false,
      importUrl: '',
      pageSizes: [10, 20, 50],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("c_importPerPage2")
        ? Number(localStorage.getItem("c_importPerPage2"))
        : 10,
      total: 0,
      totalPage: 0,
      items: [],
      pushLoading: false,
      delLoading: false,
      exportLoading:false,
      tags: [],
      stores: [],
      filtersParams: {
        nameIpt: '',
        accountIdIpt: '',
        name: '',
        accountId: [],
      },
      filtersParamsDefault: '{}',
      shopOptArr: [],
      filterAccountProps: {
        lazy: true,
        lazyLoad: (node, resolve) => {
          if(node.level < 2){
            resolve(node)
          }else{
            // leaf: true, 获取子商店
            this.$apiCall('api.Product.getCollections', {id: node.value}, r => {
              if(r.ErrorCode == 9999){
                let nodes = [];
                if (Object.keys(r.Data.Results).length) {
                  Object.keys(r.Data.Results).forEach((k) => {
                    nodes.push({
                      value: k,
                      label: r.Data.Results[k],
                      leaf: true,
                    })
                    resolve(nodes)
                  });
                }else{
                  resolve([])
                }
              }else{
                this.$elementMessage(r.Message, "error");
              }
            })

          }
        }
      },
      dialogPush: { //push 弹层
        isShow: false,
        loading: false,
        shopList: [],
        items: [],
        isAction: true,
        published: false,
      },
      dialogPushDefault: "{}",
      dialogTagManagement: { //tags 管理
        isShow: false,
        loading: false,
        tags: [],
        addMode: false,
        addNewLoading: false,
        tagIpt: "",
      },
      dialogTagManagementDefault: "{}",
      dialogEditProduct: {
        isShow: false,
        loading: false,
        id: "",
        name: "",
        mainImg: "",
        imgsJson: [],
        propertyName: [],
        shopifyTag: [],
        shopifyType: [],
        readyStoresLoading: false, //select 读取店铺
        storesItems: [], //select 店铺列表
        collectionStoreId: "", //选中的店铺id
        getCollectionsLoading: false,
        collectionItems: [],
        collectionId: "", //选中的分类Id
        shopifyVendor: "",
        description: "",
        stocks: [],
        stocks2: [],
        AllActionPriceType: "", //价格批量修改类型
        allChangePriceNum: "", //价格批量修改值
        AllActionCPriceType: "", //C价格批量修改类型
        allChangeCPriceNum: "", //C价格批量修改值
        AllActionStockType: "", //stock批量修改类型
        allChangeStockNum: "", //stock批量修改值
        activeTab: "0",
      },
      dialogEditProductDefault: "{}",
      dialogSelectImg: {
        isShow: false,
        imgList: [],
        selectImg: "",
        items: null,
      },
      dialogSelectImgDefault: "{}",
      currency: '',
      dialogPushSetting: {
        isShow: false,
        loading: false,
        ranger: [],
        isComparePrice: false,
        isPriceCent: false,
        isComparePriceCent: false,
        priceCent: 0,
        comparePriceCent: 0,
        convertCurrency: false,
        psLoading: false,
      },
      dialogPushSettingDefault: "{}",
      tab2Loading: true,
      allCnt: 0,
      doneCnt: 0,
	  tab:{name: 'Waiting', routerName: 'WaitingImport', id: '1', },
    }
  },
  computed: {
    AllChecked() {
      let c = true;
      if (this.items.length) {
        this.items.forEach((e) => {
          if (!e.checked && (this.activeName != 1 || e.status == '1')) {
            c = false;
          }
        });
      } else {
        c = false;
      }
      return c;
    },
    SelectedPushStoresNum() {
      let n = 0;
      this.dialogPush.shopList.forEach((shops) => {
        shops.data.forEach((shop) => {
          if (shop.checked  && shop.platform == 1) {
            n++;
          } else if (shop.checked && shop.platform != 1) {
            n++
          }
        })
      });
      return n;
    },
  },
  components: {
    DialogPush,
    DialogManagement,
    DialogEditProduct,
    DialogSelectImg,
    DialogPushSetting,
	subPage,
  },
  watch:{
    $route: "gotoPage",
    activeName(){
      //切换后初始化
      this.resetPage();
    }
  },
  created(){
    let active = '';
    this.tabsArr.forEach(e => {
      if(e.routerName == this.$route.name){
        active = e.id;
      }
    })
    this.activeName = active || '1';
  },
  mounted(){
    this.dialogPushDefault = JSON.stringify(this.dialogPush);
    this.dialogTagManagementDefault = JSON.stringify(this.dialogTagManagement);
    this.dialogEditProductDefault = JSON.stringify(this.dialogEditProduct);
    this.dialogSelectImgDefault = JSON.stringify(this.dialogSelectImg);
    this.dialogPushSettingDefault = JSON.stringify(this.dialogPushSetting);
    this.filtersParamsDefault = JSON.stringify(this.filtersParams);
    this.getItems();
    this.getTagList('page');
    this.getPageStores();
    if(this.activeName == '2'){
      this.getImportTask()
    }
  },
  beforeDestroy() {
    clearInterval(this.pageTime);        
    this.timer = 0;
  },
  methods: {
    gotoImportList(itms){ //提交至刊登
      this.$confirm(this.$t('Are you sure you want to push?'), "Tips", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
      }).then(()=>{
        this.loading = true;
        this.$apiCall("api.Product.reAddToImport", {ids: itms}, r => {
          if(r.ErrorCode == '9999'){
            this.getItems(true)
            this.$elementMessage("success", "success");
          }else{
            this.$elementMessage(r.Message, "error");
          }
        })
      })
    },
    delItem2(itms){ //findsImportTaskDetail接口列表的删除
      this.$confirm(this.$t('Do you want to delete tish task?'), "Tips", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        confirmButtonClass: "el-button--danger",
        type: "warning",
      }).then(() => {
        this.$apiCall("api.Product.delImportTaskDetail", {ids: itms}, r => {
          if(r.ErrorCode == '9999'){
            this.getItems(true);
            this.$elementMessage("Delete Completed", "success");
          }else {
            this.$elementMessage(r.Message, "error");
          }
        })
      }).catch(()=>{})
    },
    clearFilter(){
      this.filtersParams = JSON.parse(this.filtersParamsDefault);
      this.toPage(1)
    },
    setFilter(){
      this.filtersParams.name = this.filtersParams.nameIpt;
      this.filtersParams.accountId = this.filtersParams.accountIdIpt;
      this.toPage(1)
    },
    getImportTask(){
      this.$apiCall("api.Product.findsImportTask",{},r=>{
        if(r.ErrorCode == 9999){
          this.doneCnt = this.allCnt = 0;
          if(r.Data.Results && r.Data.Results.length){
            r.Data.Results.forEach(e => {
              this.doneCnt += Number(e.doneCnt);
              this.allCnt += Number(e.allCnt);
            })
          }
        }
      });
    },
    savePushSetting(s) {
      this.dialogPushSetting.loading = true;
      let rangeDefault = {};
      rangeDefault = this.dialogPushSetting.ranger[
        this.dialogPushSetting.ranger.length - 1
      ];
      delete rangeDefault.default;
      let range = [];
      this.dialogPushSetting.ranger.forEach((r, i) => {
        if (i < this.dialogPushSetting.ranger.length - 1) {
          range.push(r);
        }
      });
      let params = {
        importPriceSetting: {
          range,
          default: rangeDefault,
          isComparePrice: this.dialogPushSetting.isComparePrice ? 1 : 2,
          isPriceCent: this.dialogPushSetting.isPriceCent ? 1 : 2,
          isComparePriceCent: this.dialogPushSetting.isComparePriceCent ? 1 : 2,
          priceCent: this.dialogPushSetting.priceCent,
          comparePriceCent: this.dialogPushSetting.comparePriceCent,
          convertCurrency: this.dialogPushSetting.convertCurrency ? 1 : 2,
        },
      };
      this.$Burying({
        object: '8007'
      })
      this.$apiCall("api.Product.setImportPrice", params, (r) => {
        this.dialogPushSetting.loading = false;
        if (r.ErrorCode == 9999) {
          if (s) {
            this.$elementMessage(
              this.$t('The update  has started, it will take a while to finish.'),
              "success"
            );
            this.$apiCall("api.Product.applyPriceSetting", {}, (r) => {
              if (r.ErrorCode != 9999) {
                this.$elementMessage(r.Message, "error");
              }
            });
          } else {
            this.dialogPushSetting.isShow = false;
          }
          this.$elementMessage("save successfully", "success");
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    openPushSetting() {
      //打开push setting
      this.dialogPushSetting = JSON.parse(this.dialogPushSettingDefault);
      this.tab2Loading = false;
      this.dialogPushSetting.isShow = true;
      this.dialogPushSetting.loading = true;
      this.$apiCall("api.Product.getImportPrice", {}, (r) => {
        this.dialogPushSetting.loading = false;
        if (r.ErrorCode == 9999) {
          let results = r.Data.Results;
          //添加默认
          let rangeDefault = {
            comparePrice: 0,
            comparePriceType: "2",
            price: 0,
            priceType: "1",
            shippingCost: 0,
            default: 1,
          };
          if (!results) {
            this.dialogPushSetting.ranger.push(rangeDefault);
            return;
          }
          if (results.default) {
            rangeDefault = results.default;
          }
          rangeDefault.default = 1;
          this.dialogPushSetting.ranger = results.range.map(e => e);
          this.dialogPushSetting.ranger.push(rangeDefault);
          (this.dialogPushSetting.isComparePrice =
            results.isComparePrice == 1 ? true : false),
            (this.dialogPushSetting.isPriceCent =
              results.isPriceCent == 1 ? true : false),
            (this.dialogPushSetting.isComparePriceCent =
              results.isComparePriceCent == 1 ? true : false),
            (this.dialogPushSetting.priceCent = results.priceCent),
            (this.dialogPushSetting.comparePriceCent =
              results.comparePriceCent);
           ( this.dialogPushSetting.convertCurrency = results.convertCurrency == 1 ? true : false);
            // this.dialogPushSetting.convertCurrency = true;
        } else {
          this.$elementMessage(r.Message, "error");
          this.dialogPushSetting.isShow = false;
        }
      });
    },
    getPageStores() {
      this.$apiCall("api.Invoice.findStores", { authStatus: 1 }, (r) => {
        if (r.ErrorCode == 9999) {
          if (localStorage.getItem('countryType') == 'DE') {
           this.currency = r.Data.Results[0].currency
            ? r.Data.Results[0].currency
            : "EUR";           
          }else{ 
          this.currency = r.Data.Results[0].currency
            ? r.Data.Results[0].currency
            : "USD";
          }

          this.stores = [];
          this.shopOptArr = [];
          let dict = {
            1: 'Shopify',
            2: 'Woocommerce',
            3: 'Lazada',
            4: 'Shopee',
            5: 'Wayfair',
          }
          let unique = (arr, val) => {
            const res = new Map();
            return arr.filter(item => !res.has(item[val]) && res.set(item[val], 1))
          }
          r.Data.Results.forEach((store) => {
            store.fChecked = false;
            this.stores.push(store);
            //创建平台选择
            this.shopOptArr.push({
              value: store.platform,
              label: dict[store.platform],
              children: []
            })
            
          });
          //去重平台
          this.shopOptArr = unique(this.shopOptArr, 'value'); 
          //加入账号
          r.Data.Results.forEach(e => {
            this.shopOptArr.forEach(platform => {
              if(e.platform == platform.value){
                platform.children.push({
                  value: e.id,
                  label: e.shopName,
                  children: [],
                  // leaf: e.platform == '2', //false 查下层分类
                  leaf: true,
                })
              }
            })
          })
        }
      });
    },
    saveEditProduct() {
      //编辑商品保存
      this.dialogEditProduct.loading = true;
      let params = {
        id: this.dialogEditProduct.id,
        name: this.dialogEditProduct.name,
        mainImg: this.dialogEditProduct.mainImg,
        imgsJson: this.dialogEditProduct.imgsJson,
        description: this.dialogEditProduct.description,
        // collectionId: this.dialogEditProduct.collectionId,
        shopifyVendor: this.dialogEditProduct.shopifyVendor,
        shopifyTag: this.dialogEditProduct.shopifyTag.join(","),
        shopifyType: this.dialogEditProduct.shopifyType.join(","),
      };
      params.skuData = {};
      this.dialogEditProduct.stocks.forEach((sku) => {
        sku.propertyValue = sku.propertyValue.join("||");
        params.skuData[sku.id] = sku;
      });
      this.$Burying({
        object: '8003'
      })
      this.$apiCall("api.Product.changeImportProduct", params, (r) => {
        this.dialogEditProduct.loading = false;
        if (r.ErrorCode == 9999) {
          this.dialogEditProduct.isShow = false;
          this.getItems(true);
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    openDialogSelectImg(itm) {
      //打开选择图片
      this.dialogSelectImg = JSON.parse(this.dialogSelectImgDefault);
      this.dialogSelectImg.imgList = this.dialogEditProduct.imgsJson;
      this.dialogSelectImg.item = itm;
      this.dialogSelectImg.isShow = true;
    },
    editProduct(item) {
      //编辑商品
      this.loading = true;
      setTimeout(() => {
        item = JSON.parse(JSON.stringify(item));
        this.dialogEditProduct = JSON.parse(this.dialogEditProductDefault);
        this.dialogEditProduct.id = item.id;
        this.dialogEditProduct.name = item.name;
        this.dialogEditProduct.mainImg = item.mainImg;
        this.dialogEditProduct.propertyName = item.propertyName
          ? item.propertyName.split("||")
          : [];
        this.dialogEditProduct.shopifyTag = item.shopifyTag
          ? item.shopifyTag.split(",")
          : [];
        this.dialogEditProduct.shopifyType = item.shopifyType
          ? item.shopifyType.split(",")
          : [];
        // this.dialogEditProduct.collectionId = item.collectionId;
        this.dialogEditProduct.shopifyVendor = item.shopifyVendor;
        this.dialogEditProduct.description = item.description;
        //stocks
        this.dialogEditProduct.stocks = [];
        this.dialogEditProduct.stocks2 = [];
        item.stocks.forEach((e) => {
          e.propertyValue = e.propertyValue ? e.propertyValue.split("||") : [];
          this.dialogEditProduct.stocks2.push(e);
        });
        //图片
        this.dialogEditProduct.mainImg = item.mainImg;
		console.log(item)
        this.dialogEditProduct.imgsJson = JSON.parse(
          JSON.stringify(item.imgsJson)
        );
        this.dialogEditProduct.isShow = true;
        //滚动条复位
        this.$nextTick(() => {
          if (this.$refs.tableForm && this.$refs.tableForm.bodyWrapper) {
            this.$refs.tableForm.bodyWrapper.scrollTop = 0;
            this.$refs.tableFrom.bodyWrapper.scrollLeft = 0;
          }
        });
      }, 0);
    },
    delItem(ids = []) {
      //批量删除
      if (!ids.length) {
        return;
      }
      this.$confirm(
        `${this.$t('Do you want to delete the')} ${ids.length} ${this.$t('product(s)?')} `,
        "",
        {
          cancelButtonText: "Discard",
          confirmButtonText: "Delete",
          confirmButtonClass: "el-button--danger",
          type: "warning",
        }
      )
        .then(() => {
          this.delLoading = true;
          this.$apiCall("api.Product.deleteImportProduct", { ids }, (r) => {
            this.pushLoading = false;
            this.delLoading = false;
            this.$Burying({
              object: '8002',
              objectId: ids.join(',')
            })
            if (r.ErrorCode == 9999) {
              this.$elementMessage("Delete success", "success");
              this.changeAllItems(false);
              this.getItems(true);
            } else {
              this.$elementMessage(r.Message, "error");
            }
          });
        })
        .catch(() => {});
    },
    expItem(ids = []) {
      //批量导出
      if (!ids.length) {
        return;
      }
      this.$confirm(
         `${this.$t('Do you want to Export the')} ${ids.length} ${this.$t('product(s)?')} `,
        "",
        {
          cancelButtonText: "Discard",
          confirmButtonText: "Export",
          type: "info",
        }
      )
      .then(() => {
        this.exportLoading = true;
        this.$apiCall("api.Product.exportImportProduct", { productIds:ids }, (r) => {
          this.pushLoading = false;
          if (r.ErrorCode == 9999) {
            this.exportLoading = false;
            this.$elementMessage(this.$t('Export success'), "success");
            window.open(r.Data.Results.file,"_blank");
            this.changeAllItems(false);
            this.getItems(true);
          } else {
            this.$elementMessage(r.Message, "error");
          }
        });
      })
      .catch(() => {});
    },
    batItems(type) {
      //批量操作
      let items = [];
      this.items.forEach((e) => {
        if (e.checked && (e.status == '1' || this.activeName == '4')) {
          e.pushRe = [];
          items.push(e);
        }
      });
      if (!items.length) {
        this.$elementMessage(this.$t('Please select the products'), "error");
        return;
      }
      let ids = [];
      items.forEach((e) => {
        ids.push(e.id);
      });
      switch (type) {
        case "push":
          this.pushItem(items);
          break;
        case "export":
          this.expItem(ids);
          break;
        case "del":
          this.delItem(ids);
          break;
        case "addTags":
          this.itemsAddTags(ids);
          break;
        case 'importList':
          this.gotoImportList(ids)
          break;  
      }
    },
    getTagList(type) {
      if(type == 'dialog' || !type)
        this.dialogTagManagement.loading = true;
      this.$apiCall("api.Product.getTag", {}, (r) => {
        if(type == 'dialog' || !type)
          this.dialogTagManagement.loading = false;
        if (r.ErrorCode == 9999) {
          if(type == 'dialog'){
            this.dialogTagManagement.tags = [];
            r.Data.Results.forEach((e) => {
              e.edit = false;
              e.ipt = e.name;
              this.dialogTagManagement.tags.push(e);
            });
            this.$refs.dialogTagMgr.$refs.tagListTable.bodyWrapper.scrollTop = 0;
          }
          if(type == 'page' || !type){
            this.tags = [];
            r.Data.Results.forEach((e) => {
              e.checked = false;
              e.fChedked = false;
              this.tags.push(e);
            });
          }
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    openTagMgt() {
      //打开 tags 管理
      this.dialogTagManagement = JSON.parse(this.dialogTagManagementDefault);
      this.dialogTagManagement.isShow = true;
      this.getTagList();
    },
    pushSuccess(){
      this.activeName = '2'
      this.handleClick(this.$refs.mainTab[1])
    },
    handleClick(tab){//tabs 切换
      clearInterval(this.pageTime);
      this.items = [];
      this.pageKey = new Date().valueOf();
      if(this.tabsArr[tab.index].routerName != this.$route.name){ 
        this.$router.push({ name: this.tabsArr[tab.index].routerName });
      }else{
        this.resetPage();
      }
    },
    importPorduct(importUrl){
      //导入商品链接
      if (!importUrl) {
        this.$elementMessage(this.$t('URL required'), "error");
        return;
      }
      this.loadingImport = true;
      this.$Burying({
        object: '8006',
        objectUrl: importUrl
      })
      this.$apiCall(
        "api.Product.importPorduct",
        {
          url: importUrl,
        },
        (r) => {
          this.loadingImport = false;
          if (r.ErrorCode == 9999) {
            this.$elementMessage(this.$t('Import success'), "success");
            this.toPage(1);
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    getItems(s, noLoading){
      if(!noLoading)
        this.loading = true;
      let params = {
        page: this.page,
        rowsPerPage: this.rowsPerPage,
        tagIds: [],
        accountIds: [],
      };
      let apiUrl = 'api.Product.findsImportTaskDetail'
      if(this.$route.name == 'WaitingImport' || this.fromPage == 'home'){
        params.status = '1';
        apiUrl = 'api.Product.findImportProduct';
        
      }
      if(this.$route.name == 'imported' || this.$route.name == 'importFailure'){
        params.nameLike = this.filtersParams.name;
        if(this.filtersParams.accountId.length)
          params.accountId = this.filtersParams.accountId[this.filtersParams.accountId.length - 1];
      }
      params.status = this.activeName;
      this.$apiCall(apiUrl, params, (r) => {
        this.loading = false;
        let yourPrice = (e) => {
          //生成your price
          let yourPrice = '---';
          if(e.stocks && e.stocks.length){
            let [min, max] = [0, 0];
            e.stocks.some((e) => {
              if (e.price) {
                min = max = Number(e.price);
                return true;
              }
            });
            e.stocks.forEach((e) => {
              if (e.price && min > Number(e.price)) {
                min = Number(e.price);
              }
              if (e.price && max < Number(e.price)) {
                max = Number(e.price);
              }
            });
            if (min == max) {
              yourPrice =  min.toFixed(2);
            } else {
              yourPrice =  `${min} - ${max}`;
            }
          }
          return  `${this.currency}  ${yourPrice}`;
        }
        if (r.ErrorCode == 9999) {
          this.items = [];
          if(this.$route.name == 'WaitingImport' || this.fromPage == 'home'){ //第一个tabs
            r.Data.Results.forEach((e, index) => {
              if(e.imgsJson)
                e.imgsJson = JSON.parse(e.imgsJson);
              e.checked = false;
              e.tagsVisible = false;
              e.yourPrice = yourPrice(e);
              this.items.push(e);
              });
            }else{
              //2-4 detail接口
              r.Data.Results.forEach(e => {
                e.checked = false;
                e.mainImg = e.product.mainImg;
                e.name = e.product.name;
                e.originUrl = e.product.originUrl
                
                e.yourPrice = yourPrice(e);
                this.items.push(e)
              })
            }
          this.total = Number(r.Data.Pagination.totalCount);
          this.totalPage = Number(r.Data.Pagination.totalPage);
          if(!s)
            this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
        }
      })
    },
    itemsAddTags(ids) {
      let tagIds = [];
      this.tags.forEach((tag) => {
        if (tag.checked) tagIds.push(tag.id);
      });
      if (!tagIds.length) {
        this.$elementMessage(this.$t("Please select the tags"), "error");
        return;
      }
      this.loading = true;
      this.$apiCall(
        "api.Product.addTag",
        {
          ids,
          tags: tagIds,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            this.removeCheckedTags();
            this.$elementMessage(this.$t("Tags added successfully"), "success");
            this.getItems();
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    removeCheckedTags() { //不选
      this.tags.forEach((tag) => {
        tag.checked = false;
      });
    },
    getPageTags() {
      this.$apiCall("api.Product.getTag", {}, (r) => {
        this.tags = [];
        r.Data.Results.forEach((e) => {
          e.checked = false;
          e.fChedked = false;
          this.tags.push(e);
        });
      });
    },
    pushItem(items) {
      //批量push
      this.dialogPush = JSON.parse(this.dialogPushDefault);
      this.dialogPush.isShow = true;
      this.$set(this.dialogPush, "items", items);
      this.dialogPush.items.splice(0, 0);
      this.dialogPush.loading = true;
      //获取店铺
      this.$apiCall("api.Invoice.findStores", { authStatus: 1 }, (r) => {
        this.dialogPush.loading = false;
        if (r.ErrorCode == 9999) {
          this.dialogPush.shopList = [];
          r.Data.Results.forEach((e) => {
            e.loading = false;
            e.checked = false;
            e.selectCollection = "";
            e.collections = [];
            e.disabled = false;
            this.dialogPush.shopList.push(e);
          });
          this.dialogPush.shopList = this.groupBy(this.dialogPush.shopList)
          this.dialogPush.isShow = true;
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    singPush(item) {
      item.pushRe = [];
      this.pushItem([item]);
    },
    groupBy (arr) {
      var map = {},
					dest = [];
      for(var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if(!map[ai.platform]) { //依赖分组字段可自行更改！
          dest.push({
            platform: ai.platform, //依赖分组字段可自行更改！
            data: [ai]
          });
          map[ai.platform] = ai; //依赖分组字段可自行更改！
        } else {
          for(var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if(dj.platform == ai.platform) { //依赖分组字段可自行更改！
              dj.data.push(ai);
              break;
            }
          }
        }
      }
      return dest
    },
    changeAllItems(event) {
      // 全选全不选
      this.items.forEach((e) => {
        if(this.activeName != "1" || e.status == '1')
          this.$set(e, "checked", event);
      });
    },
    toPage(val) {
      if (val != this.$route.query.page) {
        this.$router.push({
          query: {
            page: val,
          },
        });
      } else {
        this.getItems();
      }
    },
    changePageSize(val) {
      this.rowsPerPage = val;
      localStorage.setItem("c_importPerPage2", val);
      this.getItems();
    },
    gotoPage() {
      this.$nextTick(()=>{
        this.page = this.$route.query.page ? this.$route.query.page : 1;
        this.getItems();
      })
      
    },
    resetPage(){
      clearInterval(this.pageTime);
      this.timer = 0;
      this.filtersParams = JSON.parse(this.filtersParamsDefault);
      if(this.activeName == '1'){
        this.getTagList('page');
        this.getItems();
      }
      if(this.activeName == '4'){
        this.getItems();
      }
      if(this.activeName == '2' || this.activeName == '3'){
        this.pageTime = setInterval(()=>{ //定时器
          this.getItems(undefined, 'noLoading');
          if(this.activeName == '2')
            this.getImportTask()
        }, 3000)
      }
    },
  }
}
</script>

<style lang="scss">
.import-page2{
  .image-slot{
    i{
      margin: 0;
      transform: translate(-50%, -50%);
      font-size: 22px;
    }
  }
}
</style>