<template>
  <div class="home-page">
    <!-- <homeHeader ref="homeHeader"/> -->
    <template v-if="code && code.header && code.header.length > 0">
      <div v-for="(item, index) in code.header" :key="index" v-html="item"></div>
    </template>
    <div style="position: relative;height: 130px;">
      <DHeader :data="setting && setting.header || ''" :headerMenu="headerMenu" />
    </div>
    <div class="detail" v-loading="loading">
      <div class="contentpanel box">
        <!-- 面包屑 -->
        <div class="pagetitle">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/products-market' }">
              <!-- {{$root.$children[0].pName.a}} -->
              Products Market
            </el-breadcrumb-item>
            <template v-if="breadCrumbs && breadCrumbs.L && breadCrumbs.l1">
              <el-breadcrumb-item
                :to="{path: `/category/${breadCrumbs.l1.id}/${breadCrumbs.l1.name.replace(/\s+/g,'-')}.html`}"
              >{{breadCrumbs.l1.name}}</el-breadcrumb-item>
              <el-breadcrumb-item
                :to="{path: `/category/${breadCrumbs.l2.id}/${breadCrumbs.l2.name.replace(/\s+/g,'-')}.html`}"
                v-if="breadCrumbs.l2"
              >{{breadCrumbs.l2.name}}</el-breadcrumb-item>
              <el-breadcrumb-item
                :to="{path: `/category/${breadCrumbs.l3.id}/${breadCrumbs.l3.name.replace(/\s+/g,'-')}.html`}"
                v-if="breadCrumbs.l3"
              >{{breadCrumbs.l3.name}}</el-breadcrumb-item>
            </template>
            <el-breadcrumb-item class="breadName">{{products.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 商品详情 -->
        <el-card>
          <div class="detailBox">
            <div class="img_view">
              <div class="show_img">
                <!-- 放大镜 -->
                <div class="magnifier" @click="clickImg(activeImg)">
                  <vue-photo-zoom-pro v-if="activeImg.type=='img'" :url="activeImg.url" :scale="3" :width="200" :mask="false"></vue-photo-zoom-pro>
                  <video v-else :src="activeImg.url" controls="controls"  width="450px" height="450px"/>
                </div>
              </div>
              <div class="list_wrap">
                <el-link :underline="false" icon="el-icon-arrow-left" @click="moveCarousel(-1)"></el-link>
                <div style="width:380px;">
                  <ul
                    class="img_view_list"
                    :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}"
                  >
                    <li
                      v-for="(item, index) in concatList"
                      :key="index"
                      @mouseover="change(index)"
                      :class="{ active: isActive == index }"
                    >
                      <div class="images-view-item">
                        <img :src="item.url" v-if="item.type == 'img'" alt />
                        <video v-else :src="item.url" controls="controls"  width="45px" height="45px"/>
                      </div>
                    </li>
                  </ul>
                </div>
                <el-link :underline="false" icon="el-icon-arrow-right" @click="moveCarousel(1)"></el-link>
              </div>
            </div>
            <!-- 详情数据 -->
            <div class="pro_detail">           
              <div class="pro_name_w">{{name }}</div> 
            <div class="title-box">
              <div class="proCost">{{$store.state.country.symbol}} {{ $exchangeRate(Number(price).toFixed(2)) }}</div>
                <el-tooltip class="item" effect="dark" content="Combo" placement="top">
                    <i v-show="checkData.isCombination ==1" class="combo">C</i>
                 </el-tooltip>
                </div> 
              <!-- <div class="proCost">{{$showSybmol()}} {{ Number(price)!='0.00' ? $exchangeRate(Number(price).toFixed(2)) : (minPrice||maxPrice) ? `${$exchangeRate(minPrice)} - ${$exchangeRate(maxPrice)}` : $exchangeRate(price)}}</div> -->
              <!-- 选属性 -->
              <div class="other-info" id="special-info" v-if="vatDom">
                <div class="title">   Mehrwertsteuer-Informationen :</div>
                <div class="right-fit">
                    <span class="tx-bold">können Sie klicken </span>
                      <el-link type="primary" @click="showVatDom"> hier </el-link>
                      <span>für Informationen zur Mehrwertsteuer</span>
                </div>  
              </div>
              <div class="other-info">
                <div class="title">   {{checkData.sku? 'SKU' : 'SPU'}} :</div>
                <span class="tx-bold">{{checkData.sku || sku}}</span>
              </div>
              <div>
                <div
                  class="other-info"
                  v-for="(item, itemIndex) in defaultPropertyArr"
                  :key="item.name"
                >
                  <div class="title">{{item.name}} :</div>
                  <div class="house-box">
                    <div
                      v-for="(attr,attrIndex) in item.items"
                      :key="attrIndex"
                      v-on:click="specificationBtn(attr.name,itemIndex,attrIndex)"
                      v-bind:class="[attr.isShow?'':'noneActive',subIndex[itemIndex] == attrIndex?'productActive':'']"
                    >{{attr.name}}</div>
                  </div>
                </div>
              </div>
              <div class="d-flex warehouse-sty" style="align-items: baseline;">
                <div class="title">Versand :</div>
                <div class>
                  <div class="d-flex text mg-b-15">
                    <div class="mg-l-10 " style="width: 100px;">Versand nach</div>
                    <el-select
                      size="small"
                      v-model="shippingContry"
                      filterable
                      placeholder="Please select"
                      no-match-text="No data"
                      no-data-text="No data"
                      class="mg-l-20"
                      @change="changeShippingCountry"
                    >
                      <el-option
                        v-for="item in shippingContrys"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                  <div class="d-flex text">
                    <div class="mg-l-10" style="width: 100px;">Versandgebühr</div>
                    <el-select
                      size="small"
                      v-model="shippingFee"
                      placeholder="Please select"
                      class="mg-l-20"
                      no-data-text="No data"
                      style="width: 400px;"
                    >
                      <el-option
                        v-for="item in shippingFees"
                        :key="item.name"
                        :label="`${item.name}  ${$store.state.country.symbol}${item.fee}  received within ${item.agingDaysBegin || 0} ~ ${item.agingDaysEnd || 0} days`"
                        :value="item.name"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <!-- 觉得没用去掉了数量输入 -->
              <!-- 1.9新增数量     -->
              <!-- <div class="other-info ipt-num">
          <span class="title">Quantity:</span>
          <div class="ipt-num-wrap">
            <el-input-number v-model="quantity" size="small" style="width: 200px;"></el-input-number>
          </div>
              </div>-->
              <!-- 1.9新增tags -->
              <ul class="tags">
                <li v-for="tag in $store.state.configJson.detailPage.tags" :key="tag.text">
                  <span class="tx-danger">*</span>
                  <span class="text">{{tag.text}}</span>
                </li>
              </ul>
              <!-- 这里 -->
              <div class="d-flex  warehouse-sty" style="align-items: baseline; margin:20px 0 10px 0;">
                <div class="title">Qualität :</div>
                <div class="mg-l-20 d-flex">
                  <el-input-number
                    size="small"
                    :disabled="qualityDisabled"
                    v-model="qualityNumClone"
                    :min="1"
                    :max="qualityNum"
                    label="description text"
                  ></el-input-number>
                  <div class="mg-l-20 d-flex">
                    <div>Inventar :</div>
                    <div class="tx-bold mg-l-10">{{qualityNum}}</div>
                  </div>
                </div>
              </div>
              <el-button
                style="margin-top: 10px; width: 240px; height: 54px; font-size: 20px;"
                type="primary"
                @click="import_pro($event)"
                :disabled="isAdd == 1"
              >Zur Liste hinzufügent</el-button>
              <el-button
                class="addCart"
                type="primary"
                @click="addToCart($event)"
                :disabled="qualityNum == 0 ? true : false"
              >Zum Warenkorb hinzufügen</el-button> 
              <!-- 1.9 平铺     -->
              <!-- <div v-if="$store.state.configJson.detailPage.imgSize == 'Tile'" class="inner-description" v-html="web"> -->

              <!-- </div>     -->
            </div>
          </div>

          <!-- Description -->
          <!-- <div v-if="$store.state.configJson.detailPage.imgSize == 'Thumbnail'" class="descript">
         <el-tabs v-model="activeName">
            <el-tab-pane label="Description" name="first">
              <div v-html="web" class="detail-desc ql-snow ql-editor"></div>
            </el-tab-pane>
        </el-tabs> 
          </div>-->
        </el-card>
      </div>
      <el-row style="margin-bottom:50px">
        <el-col>
          <el-tabs v-model="activeTabsBom" @tab-click="handleClick">
            <el-tab-pane label="Specifications" name="first">
              <div v-if="showSpace &&  checkData.attachment.length> 0">
               <h3>Download der Anlage</h3>
              <div class="product-information2">
                <span class="fly-box"  v-for="(item, c) in checkData.attachment" :key="c" @click="downFile(item.url,item.name)"><i class="el-icon-document"></i>{{item.name}}</span>
              </div>   
              </div>
              <div style="margin-top:30px"  v-if="showSpace">
              <h3 >Produktinformation</h3>
              <div class="product-information">
                <div>
                  <span>sku</span>
                  <span>{{checkData.sku || ''}}</span>
                </div>
                <div>
                  <span>Produktkategorie</span>
                  <span>{{checkData.productCategory}}</span>
                </div>
                <div>
                  <span>Produktname</span>
                  <span>{{checkData.productName || ''}}</span>
                </div>
                <div>
                  <span>Spezifikation</span>
                  <span>{{checkData.propertyValue || '/'}}</span>
                </div>
                <div>
                  <span>Material</span>
                  <span>{{checkData.material || ''}}</span>
                </div>
                <div>
                  <span>Größe</span>
                  <span>{{checkData.productLength}}*{{checkData.productWidth}}*{{checkData.productHeight}} （V{{ Number(checkData.productLength)* Number(checkData.productWidth)*Number(checkData.productHeight)}} cm³）</span>
                </div>
                <div>
                  <span>Gewicht</span>
                  <span>{{checkData.weight}}</span>
                </div>
              </div>
              </div>

              <!-- <h3 style="margin-top:30px">Package dimensions</h3>
              <div class="product-information">
                <div>
                  <span>sku:{{checkData.sku || ''}}</span>
                  <span>{{checkData.packageLength}}*{{checkData.packageWidth}}*{{checkData.packageHeight}} （V{{ Number(checkData.packageLength*Number(checkData.packageWidth))*Number(checkData.packageHeight)}} cm³）</span>
                </div>
              </div> -->
              <div>
              <div style="margin-top:30px" v-for="(dimensions,i) in checkData.specification" :key="i">
                <div v-if="showSpace&&  checkData.specification.length> 0">
              <h3 >{{dimensions.name}}</h3>
              <div class="product-information" >
                <div v-for="(dime, b) in dimensions.table" :key="b">
                  <span>{{dime.Specification || ''}}:</span>
                  <span>{{dime.SpecificationVal}}</span>
                </div>
              </div>  
                </div>

              </div>
              
              </div>
            </el-tab-pane>
            <el-tab-pane label="product description" name="second">
              <div v-html="web"></div>
            </el-tab-pane>
            <el-tab-pane label="After Sales Service" name="three" v-if="salesGuaranteeTimeValue">
              <div class="sel-box">
              <el-image
                style="width: 30px; height: 30px"
                :src="returnImg"
                fit="contain"></el-image>
                <strong class="sp" v-if="!salesGuaranteeTimeValue"></strong>
                <strong class="sp" v-else>Rückgabe innerhalb von{{salesGuaranteeTimeValue}}{{timeType}}</strong>
                  
              </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="Versuchsweise Berechnung der Versandkosten" name="fourth">
                    <el-table
                     :header-cell-style="{background:'#ccc',color:'#000000 !important'}"
                      :data="tableDataCost"
                      style="width: 100%">
                      <el-table-column
                        prop="country"
                        label="Land"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="Shipping"
                        label="Shipping options"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="Erfüllungsaufwand"
                        label="Fulfillment Costs">
                        <template  slot="header">
                          <span>{{$t('Fulfillment Costs')}}</span> 
                          <i class="el-icon-question"></i>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="发货时效"
                        label="Versandzeit">
                      </el-table-column>
                    </el-table>  
            </el-tab-pane> -->
          </el-tabs>
        </el-col>
      </el-row>
    </div>
    <!-- <Footer /> -->
    <DFooter :setting="$store.state.configJson && $store.state.configJson.footer || ''" />
    <template v-if="code && code.footer && code.footer.length > 0">
      <div v-for="(item, index) in code.footer" :key="index" v-html="item"></div>
    </template>
    <el-backtop class="goto-top" :right="32" :bottom="120"></el-backtop>

    <!-- 快递方式 -->
    <el-dialog title="Shipping Method" :visible.sync="shoppingDialog" width="40%">
      <el-divider></el-divider>
      <el-table :data="shopMethod" highlight-current-row style="width:100%">
        <el-table-column label width="60"></el-table-column>
        <el-table-column property="time" label="Estimated Delivery" width="200"></el-table-column>
        <el-table-column property="track" label="Tracking" width="150">
          <i class="el-icon-check"></i>
        </el-table-column>
        <el-table-column property="name" label="Carrier"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shoppingDialog = false">Schließen Sie</el-button>
      </div>
    </el-dialog>
    <el-dialog
  title="VAT information"
  :visible.sync="dialogVisibleHide"
  width="40%">
  <el-row>
    <el-col>
        <span class="pad-20">Der Preis eines Artikels ohne Steuern wird auf der Grundlage des vom Verkäufer festgelegten Artikelpreises und des geltenden Steuersatzes berechnet. Für weitere Einzelheiten können Sie sich an den Verkäufer wenden.</span>
        <span class="pad-10">
           Mehrwertsteuersatz (Bestimmung nur in Deutschland): {{vatValue}} %
        </span>
        <div style="padding:20px">
            <el-table
    :data="VatTableData"
    border
    style="width: 100%">
    <el-table-column
      prop="price"
      label="Excluding VAT amount"
      align="center"
      width="180">
    </el-table-column>
    <el-table-column
      prop="VAT"
      align="center"
      label="VAT amount"
      width="180">
    </el-table-column>
    <el-table-column
      prop="Amount"
      align="center"
      label="Amount including VAT">
    </el-table-column>
  </el-table>
        </div>
    </el-col>
 
  </el-row>
 

  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisibleHide = false">eingeben.</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import "quill/dist/quill.core.css"
import "quill/dist/quill.snow.css"
import "quill/dist/quill.bubble.css"
import ZsSuit from "@/assets/ZsSuit.js" //规格选择
import homeHeader from '@/components/Home/Header-v2'
import Footer from "./../components/PageFooter2"
import DHeader from '@/views/homePage/components/header'
import DFooter from '@/views/homePage/components/footer'
export default {
  props: {},
  data () {
    return {
      keyValue: "",
      showSpace: false,
      showDef: false,
      returnImg: require('../assets/images/store-design/back.png'),
      showTest: true,
      vatValue: '0',
      tableDataCost: [],
      suitRuleInfoClone: {},
      qualityNum: 0,
      checkData: {},
      dialogVisibleHide: false,
      qualityDisabled: true,
      qualityNumClone: 0,
      salesGuaranteeTimeValue: '',
      salesGuaranteeTime: '',
      timeType: '',
      shippingContry: "",
      selectArr: [], //存放被选中的值
      showAttr: "",
      name: '',
      shopItemInfo: {}, //存放要和选中的值进行匹配的数据
      subIndex: [], //是否选中 因为不确定是多规格还是单规格，所以这里定义数组来判断
      defaultImg: '',
      defaultStocks: [],
      defaultPropertyArr: [],
      shippingContrys: [],
      shippingFee: "",
      shippingFees: [],
      allShippingFees: [],
      quantity: 1,
      setting: null,
      activeTabsBom: 'first',
      code: {
        header: [],
        footer: []
      },
      VatTableData: [{
          price: '0.00',
          VAT: '0.00',
          Amount: '0.00'
      }],
      storeHouseCheck: 0,
      Specification: [
        {
          value: [1, 2, 3]
        }, { value: [1, 2, 3] }
      ],
      headerMenu: [],
      videoUrl: '',
      inner: false,
      isImage: true,
      countryJSON: null,
      countryArr: [],
      countryCode: '',
      shippingList: [],
      modalShippingMethod: {
        loading: false,
        selectCountry: '',
        shippingMethodList: [],
        isShowAlert: false,
        selectShipping: '',
      },
      saleDay: {},
      modalShippingMethodDefault: '{}',
      activeShipping: null,
      radio: '',
      loading: false,
      activeImg: '',
      swiperOption: {
        spaceBetween: 10,
        slidesPerView: 4,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        navigation: {
          nextEl: '.owl2-next',
          prevEl: '.owl2-prev'
        },
      },
      shopMethod: [{
        time: '15-30 days',
        name: 'EUB'
      }, {
        time: '15-20 days',
        name: 'CNE'
      }, {
        time: '15-20 days',
        name: 'YunExpress'
      }, {
        time: '15-20 days',
        name: '4PX'
      }],
      activeName: 'first',
      web: '',
      isFound: true,
      proId: null,
      isAdd: null,
      name: "",
      moreName: '',
      imgUrl: "",
      imgList: [],
      videoList: [],
      type1: [],
      type2: [],
      typeImg: [],
      items: [],
      nowPro: {},
      price: '',
      typeTwoData: '',
      isActive: 0,
      isActiveCate: -1,
      isChange: -1,
      products: {},
      shoppingDialog: false,
      visible: false,
      propValue: "",
      submitLoading: false,
      types: [],
      disType: [],
      //新属性
      propertyArr: [],  //属性表
      stocks: [],
      zsSuit: new ZsSuit(),
      choosePropVal: [], // 已选择的属性
      disabledProp: [], //不能选的层级
      selectedStockId: 0, //选中的stock id
      addCartLoading: false, //购物车Loading
      modalConfirmCart: {
        loading: false,
        type: 1,
        stock: {},
      },
      weight: 0,
      sku: "",
      currentOffset: 0,
      windowSize: 6,
      paginationFactor: 65,
      minPrice: '',
      maxPrice: '',
      saleCost: '0.00',
      vatDom: true,
      concatList: []
    }
  },
  watch: {

    $route: "gotoPage",
    'setting.header.activeMenu': {
      handler () {
        this.getMenu()
      },
      deep: true
    },
    checkData(val){
      console.log(val.attachment, 'val');
          if (val) {
              this.showSpace = val.specificationSwitch == '1' ? true : false
              // if (!this.showSpace) {
              //   this.showDef = false
              // }else{
              //     this.showDef = false
              // }
          }
    },
    pid () {
      //reset
      this.countryArr = []
      this.propertyArr = []
      this.choosePropVal = []
      this.disabledProp = []
      this.selectedStockId = 0
      this.addCartLoading = false
      this.quantity = 1
      this.modalConfirmCart = {
        loading: false,
        type: 1,
        stock: {},
      }
      this.zsSuit = new ZsSuit()
      this.modalShippingMethodDefault = JSON.stringify(this.modalShippingMethod)
      this.proId = this.pid
      if (this.$route.params.name)
        this.name = this.$route.params.name.replace('.html', '').replace(/_/g, ' ')
      this.getDetail()
    },
  },
  created () {
    this.setting = localStorage.getItem("c_shopConfigJson") ? JSON.parse(localStorage.getItem("c_shopConfigJson")) : null
    if (!this.setting || !this.setting.customCode || !this.setting.customCode.length) return
    this.setting.customCode.forEach((item) => {
      if (item.pages.includes('商品详情页')) {
        if (item.position == '底部') {
          this.code.footer.push(item.desc)
        }
        if (item.position == '顶部') {
          this.code.header.push(item.desc)
        }
      }
    })
  },
  computed: {
    atEndOfList () {
      return this.currentOffset <= (this.paginationFactor * -1) * (this.concatList.length - this.windowSize)
    },
    atHeadOfList () {
      return this.currentOffset === 0
    },
    activeSelect () {
      let r = {
        price: '0.00',
        img: '',
        weight: '',
        sku: ''
      }
      this.stocks.forEach(e => {
        if (e.id == this.selectedStockId) {
          r.price = e.price
          r.img = e.propertyImage
          r.weight = e.weight
          r.sku = e.sku
        }
      })
      if (r.img) {
        // this.activeImg = r.img;
        this.activeImg ={url: this.stocks.find((item) => item.id == this.keyValue).propertyImage, type:'img'} 
      }
      return r
    },
    breadCrumbs () {
      let arr = this.products.categorys
      if (!(arr && arr.length)) {
        return false
      }
      let obj = {
        L: 0,
        l1: null,
        l2: null,
        l3: null,
      }

      obj.L = arr.length
      obj.l1 = obj.L ? arr[arr.length - 1] : null
      obj.l2 = obj.L && obj.L > 1 ? arr[arr.length - 2] : null
      obj.l3 = obj.L && obj.L > 2 ? arr[arr.length - 3] : null
      // obj.l1.open = obj.L > 1;
      return obj
    },
  },
  filters: {
    typeOne (value) {
      if (value) {
        return value.split("||")[0]
      } else {
        return ''
      }
    },
    typeTwo (value) {
      if (value) {
        return value.split("||")[1]
      } else {
        return ''
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.time)
  },
  mounted () {
    if (this.$root.$children[0].getParentUrl() && this.$root.$children[0].getParentUrl().indexOf("vendor") >= 0) {
      return
    } else {
      this.$root.$children[0].checkLogin()
    }
    this.proId = this.$route.params.id
    this.name = this.$route.params.name.replace('.html', '').replace(/-/g, ' ')

    this.getDetail()
    document.title = `${this.name} How to find :: ${this.$root.$children[0].pName.b} App - ${this.$root.$children[0].pName.a}.com`
    // 1.9注释掉推荐
    // this.getRecommend();
    this.getVat()
  },
  methods: {
  showVatDom(){
          this.dialogVisibleHide = true
    },
    getVat(){
      this.$apiCall(
        "api.Product.getVatConfig", {}, (r) => {
          if (r.ErrorCode == 9999) {
            this.vatValue =  Number(r.Data.Results.vatList.DE.value)
            this.vatDom = r.Data.Results.vatState== 1 ? true : false
          }
        }
      )
    },
    downFile(url,name){
        // let url = res.success.url
        const a = document.createElement('a')
        a.href = url
        a.download = name // 下载后文件名
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click() // 点击下载
        document.body.removeChild(a) // 下载完成移除元素    

    },
    addToCart (e) {
      if (!this.$store.state.userInfo) {
        this.importProduct = this.$route.params
        this.$root.$children[0].openDialogLogin()
        return
      }
      let stockList = []
      // let quantity = this.defaultStocks.find((item) => item.propertyValue == this.choosePropVal.join("||"))
      stockList.push({ stockId: this.checkData.id, quantity: this.qualityNumClone,stockWarehouseId: this.checkData.vendorStockWarehouseId })
      let params = {
        stockList: stockList
      }
      this.$apiCall("api.Cart.addToCart", { ...params }, (r) => {
        if (r.ErrorCode == 9999) {
          this.getCartNum()
          this.$message.success(r.Message)
        } else {
          this.$message.error(r.Message)
        }
      }
      )
    },
    getCartNum () {
      this.$apiCall(
        "api.Cart.countCart", {}, (r) => {
          if (r.ErrorCode == 9999) {
            this.$root.$children[0].cartNum = Number(r.Data.Results)
          }
        }
      )
    },
    getMenu () {
      if (this.setting.header.activeMenu) { //有启用头部菜单
        this.setting.menu.forEach((item) => {
          if (item.id == this.setting.header.activeMenu) {
            this.headerMenu = item
          }
        })
      }
    },
    moveCarousel (direction) {
      // Find a more elegant way to express the :style. consider using props to make it truly generic
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor
      }
    },
    chooseProp (value) {
      //TODO
      let i = value.index,
        val = value.name,
        code = value.code
      //选择属性
      if (this.isPropDisabled(i, code)) return //disabled不能点
      if (this.choosePropVal[i] == val) {
        //不选
        this.$set(this.choosePropVal, i, "")
        this.zsSuit.unset(i)
      } else {
        //选择
        this.$set(this.choosePropVal, i, val)
        this.zsSuit.set(i, code)
      }

      let keys = Object.keys(this.suitRuleInfoClone)
      for (let i = 0, l = keys.length; i < l; i++) {
        if (this.suitRuleInfoClone[keys[i]] == code || this.suitRuleInfoClone[keys[i]].indexOf(code) != -1) {
          this.keyValue = keys[i]
          break
        }
      }
      // this.activeImg = this.stocks.find((item) => item.id == this.keyValue).propertyImage
      let quantity = this.stocks.find((item) => item.propertyValue == this.choosePropVal.join("||"))
      if (quantity) {
        if (!quantity.inventory) {
          this.qualityNum = 999999999999
          this.qualityDisabled = false
        } else if (Number(quantity.inventory) >= 0) {
          this.qualityNum = Number(quantity.inventory)
          this.qualityDisabled = false
        } else if (Number(quantity.inventory) < 0) {
          this.qualityNum = 0
          this.qualityDisabled = true
        }
      } else {
        this.qualityDisabled = true
        this.qualityNum = 0
      }
      // console.log(this.zsSuit)
      let keyArr = Object.keys(this.suitRuleInfoClone)
      for (let i = 0, l = keyArr.length; i < l; i++) {
        if (this.suitRuleInfoClone[keyArr[i]] == code || this.suitRuleInfoClone[keyArr[i]].indexOf(code) != -1) {
          this.keyValue = keyArr[i]
          break
        }
      }
      if (this.propertyArr[i].select == val) {
        this.$set(this.choosePropVal, i, '')
        this.$set(this.propertyArr[i], "select", '')
        this.$nextTick(() => {
          this.selectedStockId = 0
        })
        this.getVendorShippingCountry()
      } else {
        this.$set(this.choosePropVal, i, val)
        this.$set(this.propertyArr[i], "select", val)
        this.shippingFees = this.allShippingFees[this.selectedStockId]
        this.shippingFee = this.shippingFees[0] ? this.shippingFees[0].name : ""
      }
      this.zsSuit.set(i, code)
    },
    isPropDisabled (i, code) {
      if (!this.disabledProp.length) return
      //是否禁用
      let state = false
      this.disabledProp[i].find(e => {
        if (e == code) {
          state = true
        }
      })
      return state
    },
    getCurrentRow (row) {
    },
    // 登录功能
    gotoPage () {
      Object.assign(this.$data, this.$options.data())
      this.proId = this.$route.params.id
      this.name = this.$route.params.name
      this.getDetail()
      // 1.9注释掉推荐
      // this.getRecommend()
    },
    getRecommend () {
      this.$apiCall("api.VendorShop.findProducts", { id: this.proId, rowsPerPage: 12, page: 1 }, (r) => {
        this.items = r.Data.Results
        $(window).scrollTop(0)
      })
    },
    filterType (type, i) {
      this.isChange = i
      this.typeTwoData = type
      if (this.propValue != '') {
        this.products.stocks.forEach(a => {
          if (a.propertyValue == `${this.propValue}||${this.typeTwoData}`) {
            this.nowPro = a
            this.price = this.nowPro.price
            this.weight = this.nowPro.weight
            this.sku = this.nowPro.sku
          }
        })
      }
    },
    returnMore () {
      let num = this.products.categorys.length - 1
      this.$router.push({
        path: `/category/${this.products.categorys[num].id}/${this.products.categorys[num].name.replace(/\s+/g, "-")}.html`
      })
    },
    formatCharAT (txt) {
      var asc = ""
      for (var i = 0; i < txt.length; i++) {
        if (txt[i] != "_") {
          asc += txt.charAt(i).charCodeAt()
        } else {
          asc += "_"
        }
      }
      return asc
    },
    changeShippingCountry (val) {
      this.$apiCall("api.VendorShop.getProductShippingFee", {
        id: this.proId,
        country: val
      }, r => {
        this.loading = false
        if (r.ErrorCode == "9999") {
          this.allShippingFees = r.Data.Results
          this.shippingFees = this.selectedStockId ? this.allShippingFees[this.selectedStockId] : this.allShippingFees[Object.keys(this.allShippingFees)[0]]
          this.shippingFee = this.shippingFees[0] ? this.shippingFees[0].name : ""
        } else {
          this.$elementMessage(r.Message, 'error')
        }
      })
    },
    clickImg(u){

    },
    getVendorShippingCountry () {
      this.$apiCall("api.VendorShop.getVendorShippingCountry", {
        id: this.proId
      }, r => {
        if (r.ErrorCode == "9999") {
          this.allShippingFees = r.Data.Results
          let data = r.Data.Results
          this.shippingContrys = []
          if (Object.keys(data).length) {
            this.shippingContry = Object.keys(data)[0]
            for (let key of Object.keys(data)) {
              this.shippingContrys.push({
                label: data[key],
                value: key
              })
            }
            this.changeShippingCountry(this.shippingContry)
          } else {
            this.loading = false
          }

        } else {
          this.loading = false
          this.$elementMessage(r.Message, 'error')
        }
      })
    },
    getDetail () {
      this.loading = true
      this.$apiCall(
        "api.VendorShop.detail",
        {
          id: this.proId,
          vendorCategory: true,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            let data = r.Data.Results
            this.getVendorShippingCountry()
            for (let i = 0; i < data.property.length; i++) {
             this.subIndex.push(0)              
            }
            this.defaultPropertyArr = data.property
            console.log( this.defaultPropertyArr, ' this.defaultPropertyArr');
            this.defaultStocks = data.stocks
            this.name = data.name
            for (var i in data.stocks) {
              this.shopItemInfo[data.stocks[i].difference] = data.stocks[i] //修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
            }
            this.checkItem()
            this.defaultImg = data.imgUrl

            let priceArr = []
            let weightArr = []
            //old
            this.activeImg = {url:r.Data.Results.imgUrl, type: 'img'}
            this.saleCost = r.Data.Results.saleCost
            this.price = this.saleCost
            this.sku = r.Data.Results.sku
            this.weight = 0

            this.imgList = eval(r.Data.Results.imgUrlJson)
            this.videoList =r.Data.Results.videoUrlJson ==null ? [] : JSON.parse(r.Data.Results.videoUrlJson)
            let newListImg = this.imgList.map(item=>{
              let img = {
                type: 'img',
                url: item
              }
              return img
            })
            let newListVideo = this.videoList.map(item=>{
              let video = {
                type: 'video',
                url: item
              }
              return video
            })
            this. concatList = [...newListImg, ...newListVideo]
            // console.log(concatList, 'this.imgList');
            if (r.Data.Results.videoUrl) {
              this.isImage = false
            }
            this.videoUrl = r.Data.Results.videoUrl
            this.products = r.Data.Results
            this.isAdd = r.Data.Results.hasImport
            this.salesGuaranteeTime = r.Data.Results.salesGuaranteeTime
            this.salesGuaranteeTimeValue = r.Data.Results.salesGuaranteeTimeValue
            this.timeType = r.Data.Results.salesGuaranteeTimeType
            this.web = r.Data.Results.description.web
            this.web = this.web.replace(/\n/g, '<br/>')
            const num = r.Data.Results.categorys.length - 1
            if (r.Data.Results.categorys[num])
              this.moreName = r.Data.Results.categorys[num].name
            r.Data.Results.stocks.forEach(item => {
              this.type1.push(item.propertyValue.split("||")[0])
              this.type2.push(item.propertyValue.split("||")[1])
              priceArr.push(item.price)
              weightArr.push(item.weight)
            })
            if (Math.min(...priceArr) == Math.max(...priceArr)) {
              this.price = Math.min(...priceArr).toFixed(2)
            } else {
              this.minPrice = Math.min(...priceArr).toFixed(2)
              this.maxPrice = Math.max(...priceArr).toFixed(2)
            }
            if (Math.min(...weightArr) == Math.max(...weightArr)) {
              this.weight = Math.min(...weightArr).toFixed(2)
            } else {
              this.weight = `${Math.min(...weightArr).toFixed(2)} - ${Math.max(...weightArr).toFixed(2)}`
            }
            this.type1 = [...new Set(this.type1)]
            this.type2 = [...new Set(this.type2)]
            let arr = []
            this.type1.forEach(i => {
              arr.push(r.Data.Results.stocks.filter((a) => {
                return a.propertyValue.split("||")[0] == i
              }))
            })
            this.types = arr
            arr.forEach(info => {
              if (info[0] && info[0].propertyImage)
                this.typeImg.push(info[0].propertyImage)
            })
          this.VatTableData[0] = {
          price : this.price,
          VAT: (Number(this.price)*(this.vatValue/100)).toFixed(2),
          Amount: (Number(this.price)*(this.vatValue/100)+ Number(this.price)).toFixed(2),
        }
            //  this.$nextTick(()=>{
            //   //默认先选美国第一个物流 
            //   if(this.$route.name == 'ProductDetail'){
            //     let callback = r => {
            //       if(r && r.length){
            //         r[0].ccode = this.modalShippingMethod.selectCountry;
            //         this.activeShipping = {...r[0]};
            //       }
            //     }  
            //     this.modalShippingMethod.selectCountry = 'US';
            //     this.getLogisticFee(callback);
            //   }


            //   $('[data-toggle="tooltip"]').tooltip();
            //   let time = setInterval(() => {
            //       if(this.$root.$children[0].categories){
            //           clearInterval(time)
            //           this.$root.$children[0].categories.some(e => {
            //               if(this.breadCrumbs.l1 && e.id == this.breadCrumbs.l1.id){
            //               e.open = true;
            //               return true;
            //               }
            //           })
            //       }  
            //   }, 500);
            // })
          }
        }
      )
    },
    specificationBtn (item, n, index) {
      var self = this
      if (self.selectArr[n] != item) {
        self.selectArr[n] = item
        self.subIndex[n] = index

      } else {
        self.selectArr[n] = undefined
        self.subIndex[n] = -1 //去掉选中的颜色
      }
      var showarr = self.selectArr
      var tempTop = []
      showarr.forEach((item, i, arr) => {
        if (item) {
          tempTop.push(item)
        }
      })

      self.showAttr = tempTop.join("||")
      self.checkItem()
      tempTop = []
    },
    checkItem () {
      var self = this
      var option = self.defaultPropertyArr
      var result = [] //定义数组存储被选中的值
      for (var i in option) {
        result[i] = self.selectArr[i] ? self.selectArr[i] : ''
      }
      if (self.shopItemInfo[result.join("||")]) {
        self.qualityNum = self.shopItemInfo[result.join("||")].inventory
        self.price = self.shopItemInfo[result.join("||")].price
        self.activeImg = {url: self.shopItemInfo[result.join("||")].propertyImageOriginal, type:"img"}
        this.checkData = self.shopItemInfo[result.join("||")]
        if (Number(self.qualityNum) >= 0) {
          this.qualityNum = Number(self.qualityNum)
          this.qualityDisabled = false
        } else if (Number(self.qualityNum) < 0) {
          this.qualityNum = 0
          this.qualityDisabled = true
        }
        this.VatTableData[0] = {
          price : self.price,
          VAT: (Number(self.price)*(this.vatValue/100)).toFixed(2),
          Amount: (Number(self.price)*(this.vatValue/100)+ Number(self.price)).toFixed(2),
        }
      } else {
        self.qualityNum = 0
        self.price = this.saleCost
        self.activeImg = {url:self.defaultImg, type: 'img'}
        this.checkData = {}
        this.VatTableData[0] = {
          price : this.saleCost,
          VAT: (Number(self.saleCost)*(this.vatValue/100)).toFixed(2),
          Amount: (Number(self.saleCost)*(this.vatValue/100)+ Number(self.saleCost)).toFixed(2)
        }
      }

      for (var i in option) {
        var last = result[i] //把选中的值存放到字符串last去
        for (var k in option[i].items) {
          result[i] = option[i].items[k].name //赋值，存在直接覆盖，不存在往里面添加name值
          option[i].items[k].isShow = self.isMay(result) //在数据里面添加字段isShow来判断是否可以选择
        }
        result[i] = last //还原，目的是记录点下去那个值，避免下一次执行循环时避免被覆盖
      }
      self.$forceUpdate() //重绘
    },
    isMay (result) {
      for (var i in result) {
        if (result[i] == '') {
          return true //如果数组里有为空的值，那直接返回true
        }
      }
      if (this.shopItemInfo[result.join("||")]) { //匹配选中的数据的库存，若不为空返回true反之返回false
        return this.shopItemInfo[result.join("||")].inventory == 0 ? false : true
      }


    },
    change (i) {
      this.isActive = i
      this.activeImg = this.concatList[i]
    },
    changeCate (i) {
      this.isActiveCate = i
      this.isActive = -1
      this.propValue = this.type1[i]
      this.imgUrl = this.typeImg[i]
      if (this.typeTwoData != '') {
        this.products.stocks.forEach(i => {
          if (i.propertyValue == `${this.propValue}||${this.typeTwoData}`) {
            this.nowPro = i
            this.price = this.nowPro.price
            this.sku = this.nowPro.sku
            this.weight = this.nowPro.weight
          }
        })
      }
    },
    import_Recommend (item) {
      if (!this.$store.state.userInfo) {
        this.importProduct = { id: item.id, name: item.name }
        this.centerDialogVisible = true
        return
      }
      this.$apiCall(
        "api.Product.addFromVendorShopProduct",
        {
          id: item.id,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            item.hasImport = 1
            item.imports++
            this.$message.success("Import Success !")
            this.$router.push({ name: 'productDetail', query: { id: item.id, name: item.name } })
          } else {
            this.$message.error(r.Message)
          }
        }
      )
    },
    goToDetail (item) {
      // window.open(`/item/${item.id}/${item.name.replace(/\s+/g, "-").replace(/[^\w]/g, '_')}.html`)
      let id = localStorage.getItem('vendorId')
      if ( id != 148982 && id != 146428 && id != 144875 && id != 144843 && id != 143779 && id != 143654 && id != 74) {
      window.open(`/item/${item.id}/${item.name.replace(/\s+/g, "-").replace(/[^\w]/g, '_')}.html`)
      }else{
    window.open(`/itemOld/${item.id}/${item.name.replace(/\s+/g, "-").replace(/[^\w]/g,'_')}.html`)

      }
      document.title = `${item.name.replace('.html', '')} How to find :: ${this.$root.$children[0].pName.b} App - ${this.$root.$children[0].pName.a}.com`

    },
    import_pro () {
      if (!this.$store.state.userInfo) {
        this.importProduct = this.$route.params
        this.$root.$children[0].openDialogLogin()
        return
      }
      this.$apiCall(
        "api.Product.addFromVendorShopProduct",
        {
          id: this.products.id,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            this.products.imports++
            this.isAdd = 1
            this.$root.$children[0].importNum++
            this.$message.success("Import Success !")
          } else {
            this.$message.error(r.Message)
          }
        }
      )
    },

  },
  components: {
    Footer,
    homeHeader,
    DHeader,
    DFooter,
  },
};
</script>
<style lang="scss">
.detail-desc {
  img {
    max-width: 1200px;
  }
}
</style>
<style lang="scss" scoped>
.addCart {
  margin: 10px 0 0 20px;
  width: 240px;
  height: 54px;
  font-size: 20px;
}
.el-table__header thead > tr > th ::v-deep div{
  color: #000 !important;
}
.product-information {
  border: 1px solid #c0bfbf;
  width: 60%;
  margin-top: 20px;
  div {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #c0bfbf;
    display: flex;
    span:first-child {
      background: rgb(230, 227, 227);
      border-right: 1px solid #c0bfbf;
      width: 30%;
      padding-left: 15px;
    }
    span:last-child {
      padding-left: 10px;
    }
  }
}
.product-information2 {
  display: flex;
  width: 60%;
  margin-top: 20px;
  div {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #c0bfbf;
    display: flex;
    span:first-child {
      background: rgb(230, 227, 227);
      border-right: 1px solid #c0bfbf;
      width: 30%;
      padding-left: 15px;
    }
    span:last-child {
      padding-left: 10px;
    }
  }
}
.house-box {
  flex: 1;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  div {
    padding: 0 10px;
    background: #f6f4f5;
    border-radius: 5px;
    height: 26px;
    line-height: 26px;
    margin-bottom: 6px;
    cursor: pointer;
     margin-right: 6px;
  }
  // div:nth-child(n + 2) {
  //   margin-left: 6px;
  // }
}

.breadName {
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.home-page {
  max-width: 1920px;
  width: 100%;
  background-color: #fff;
}
</style>
<style scoped lang="scss">
ul,
li {
  list-style: none;
}
.noneActive {
  background-color: #ccc;
  opacity: 0.4;
  color: #000;
  pointer-events: none;
}
.productActive {
  background: #feab27 !important;
  color: white;
}
.img_view {
  width: 460px;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.show_img {
  position: relative;
  width: 450px;
  height: 450px;
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  direction: ltr;
  border: 1px solid #ddd;
  border-radius: 10px;
  img {
    width: 100%;
    height: auto;
  }
}
.list_wrap {
  overflow: hidden;
  width: 450px;
  position: relative;
  display: flex;
  .el-link {
    font-size: 20px;
    background: #fff;
    padding: 10px;
    z-index: 99;
  }
}
.img_view_list {
  padding: 0;
  margin: 15px 0 20px;
  list-style-type: none;
  display: flex;
  flex-wrap: nowrap;
  max-width: 100%;
  li {
    display: inline-block;
    vertical-align: middle;
    box-shadow: inset 0 0 0 1px #ddd;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 11px;
    // margin-bottom: 10px;
    a {
      padding: 3px 10px;
      border-radius: 5px;
      color: #4e4e4e;
      text-align: center;
      display: block;
      border: 1px #cbcbcb solid;
      box-sizing: content-box;
      transition: none;
      text-decoration: none;
    }
    .images-view-item {
      width: 54px;
      height: 54px;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: center;
      justify-content: center;
      -ms-flex-align: center;
      align-items: center;
      position: relative;
    }

    img {
      max-width: 50px;
      max-height: 50px;
    }
  }
  li.active {
    a {
      background: #568af9;
      border: 1px solid #568af9;
      color: #fff;
    }
  }
  li.disabled {
    background-color: #e6e6e6;
    opacity: 0.8;
    a {
      border-style: dashed;
      border-color: #ddd;
      color: #999;
      cursor: no-drop;
    }
    a:hover {
      border-color: #ddd;
      color: #999;
    }
  }
}
.combo{
  display: block;
width: 20px;
height: 20px;
text-align: center;
line-height: 20px;
color: #fff;
border-radius: 5px;
background: #5c6ac4;
margin-left: 5px;
}
// .img_view_list .active {
//   box-shadow: inset 0 0 0 1px #5c6ac4;
// }
.detail {
  max-width: 1300px;
  margin: 0 auto;
}
.detailBox {
  display: flex;
  .imports {
    width: 450px;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    color: rgb(144, 147, 153);
  }
  .proCost {
    height: 40px;
    font-size: 28px;
    font-weight: 600;
    color: #252525;
    line-height: 40px;
    margin: 20px 0;
  }
}

.moreName {
  cursor: pointer;
  color: #000;
}
.moreName:hover {
  color: #5c6ac4;
}
.ball {
  position: fixed;
  z-index: 1;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background-color: #f56c6c;
  transition: ease-in-out 0.5s;
}
// 商品详情描述
.detail-desc {
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  // align-items: center;
  img {
    max-width: 1000px !important;
  }
  ::v-deep .detailmodule_image {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      max-width: 1000px;
      margin-top: 20px;
    }
  }
  ::v-deep .detailmodule_text {
    p {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    img {
      max-width: 1000px;
      margin-top: 20px;
    }
  }
}

.but {
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 3px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
}
.descript ::v-deep .el-tabs__active-bar .is-top {
  width: 95px;
}
.descript ::v-deep #tab-first {
  font-size: 20px;
}
.recommend ::v-deep .el-tabs__active-bar .is-top {
  width: 221px;
}
.recommend ::v-deep #tab-first {
  font-size: 20px;
}
.recommend {
  font-size: 20px;
  font-weight: 500;
}
.pro_img {
  width: 100%;
  position: relative;
  .img-wrap {
    margin-bottom: 15px;
    position: relative;
    padding-bottom: 100%;
    cursor: pointer;
  }
}
.pro_box {
  margin: 0 10px;
  position: relative;
  padding: 15px;
  border: 1px #dcdfe6 solid;
}
.pro_name {
  height: 38px;
  cursor: pointer;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
}
.title-box{
  display: flex;
  align-items: center;
}
.pro_name_w {
  max-height: 144px;
  font-size: 24px;
  font-weight: 500;
  color: #252525;
  line-height: 36px;
  overflow: hidden;
}

.price {
  color: #909399;
  span {
    color: #5c6ac4;
    font-weight: bold;
  }
}
.imports_ {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: rgb(144, 147, 153);
  white-space: nowrap;
}
.pro_property {
  p {
    height: 22px;
    font-size: 14px;
    font-weight: 400;
    color: #303133;
    line-height: 22px;
    margin-bottom: 10px;
  }
  .pro_propertyArr {
    display: flex;
    flex-wrap: wrap;
    > .el-select {
      margin-right: 15px;
      margin-bottom: 15px;
    }
  }
}
#special-info .title{
  width: 110px;
  text-align: right;
}
#special-info .right-fit{
display: flex;
align-items: center;
span{
  padding: 3px;
}
}
.fly-box{
height: 26px;
display: block;
margin-right:5px;
padding-left: 5px;
border: 1px solid #e1e1e1;
cursor: pointer;
width: 100px;
overflow: hidden; //超出的文本隐藏
text-overflow: ellipsis; //溢出用省略号显示
white-space: nowrap;  // 默认不换行；

}
.warehouse-sty .title{
  width: 110px;
  text-align:right;
}
.other-info {
  display: flex;
  min-height: 22px;
  font-size: 14px;
  font-weight: 400;
  color: #303133;
  line-height: 22px;
  margin: 20px 0;
  .title {
    margin-right: 10px;
    // min-width: 66px;
    width: 110px;
    text-align: right;

  }
  .tx-bold {
    font-weight: 400;
    color: #000000;
  }
}
</style>
<style lang="scss" scoped>
.login-page {
  position: relative;
  height: 100%;
  .login-box {
    h2 {
      margin: 0 auto 5px;
      width: 286px;
      color: #fff;
      font-size: 18px;
    }
    h1 {
      margin: 0 auto 15px;
      width: 282px;
      height: 50px;
      background-image: url("./../../public/images/logo2.png");
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
    .box {
      margin: 0 auto;
      border-radius: 6px;
      padding: 20px;
      width: 460px;
      background-color: #fff;
      p {
        margin-bottom: 15px;
        text-align: center;
        color: #909399;
        font-size: 18px;
      }
      input {
        margin-right: 10px;
        outline: none;
        border: none;
        border-bottom: 1px #e4e7ed solid;
        width: 250px;
        height: 32px;
        text-align: center;
        font-size: 18px;
      }
      input + span {
        color: #909399;
        font-size: 18px;
      }
      button {
        width: 100%;
        height: 46px;
        background-color: #e94b26;
        border: none;
        border-radius: 4px;
        color: #fff;
        outline: none;
        font-size: 22px;
      }
    }
    .bottom {
      color: #fff;
      a {
        margin-left: 5px;
        color: #fff;
        text-decoration: underline;
      }
      a:hover {
        text-decoration: none;
      }
    }
  }
}

.home-page ::v-deep .el-radio__input.is-checked + .el-radio__label {
  color: #eff0f9;
}
.home-page .house-box ::v-deep .el-radio__input.is-checked + .el-radio__label {
  color: #5c6ac4;
}
.home-page ::v-deep .el-table__row:hover .el-radio__label {
  color: rgb(236, 237, 247);
}
.home-page ::v-deep .el-radio {
  margin-right: 10px;
  margin-left: 10px;
}
.el-backtop {
  right: 32px !important;
  transform: none;
}
.ipt-num {
  display: flex;
  align-items: center;
  .title {
    margin-right: 15px;
  }
  ::v-deep {
    .el-input-number__decrease,
    .el-input-number__increase {
      background-color: #fff;
    }
    .el-input {
      input {
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
}
ul.tags {
  display: flex;
  flex-wrap: wrap;
  margin: 15px 0 25px 0;
  padding: 15px 0;
  li {
    margin-right: 15px;
    font-size: 12px;
    .text {
      color: #909399;
    }
  }
}
.pro_detail {
  flex: 1;
}
.inner-description {
  margin-top: 30px;
  width: 716px;
  ::v-deep img {
    max-width: 700px;
  }
}
.select-props-wrap {
  .select-props {
    margin-bottom: 10px;
    .prop {
      display: flex;
      .title {
        margin-right: 10px;
        line-height: 44px;
        min-width: 66px;
      }
      .props {
        display: flex;
        flex-wrap: wrap;
        .val {
          margin-right: 6px;
          padding: 0 6px;
          height: 44px;
          min-width: 44px;
          border: 2px transparent solid;
          border-radius: 3px;
          background-color: #fff;
          line-height: 40px;
          text-align: center;
          color: #000;
          font-weight: bold;
          cursor: pointer;
        }
        .val:hover {
          border-color: #dcdfe6;
        }
        .val.active {
          border-color: #535fb0;
        }
        .val:disabled {
          color: #c0c4cc;
          cursor: no-drop;
        }
        .val:disabled {
          border-color: transparent;
        }
      }
    }
  }
}
.pad-20{
  display: block;
  padding: 0 20px 20px 20px;
}
.pad-10{
  display: block;
  padding: 0 20px 10px 20px;
}
.sel-box{
  display: flex;
    // justify-content: center;
    align-items: center;
    .sp{
      margin-left:5px;
      font-weight:500;
      font-size:20px;
    }
}
</style>