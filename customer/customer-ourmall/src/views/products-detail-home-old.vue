<template>
<div class="home-page">
  <!-- <homeHeader ref="homeHeader"/> -->
   <template v-if="code && code.header && code.header.length > 0">
   	<div v-for="(item, index) in code.header" :key="index" v-html="item"></div>
   </template>
   <div style="position: relative;height: 130px;">
	   <DHeader :data="setting && setting.header || ''" :headerMenu="headerMenu" />
   </div>
  <div class="detail" v-loading=loading>
    <div class="contentpanel box">
     
      <!-- 面包屑 -->
      <div class="pagetitle">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/products-market' }">
          <!-- {{$root.$children[0].pName.a}} -->
           {{$t('Products Market')}}
          </el-breadcrumb-item>
          <template v-if="breadCrumbs && breadCrumbs.L && breadCrumbs.l1">
            <el-breadcrumb-item  :to="{path: `/category/${breadCrumbs.l1.id}/${breadCrumbs.l1.name.replace(/\s+/g,'-')}.html`}">
              {{breadCrumbs.l1.name}}
            </el-breadcrumb-item>
            <el-breadcrumb-item  :to="{path: `/category/${breadCrumbs.l2.id}/${breadCrumbs.l2.name.replace(/\s+/g,'-')}.html`}" v-if="breadCrumbs.l2">
              {{breadCrumbs.l2.name}}
            </el-breadcrumb-item>
            <el-breadcrumb-item  :to="{path: `/category/${breadCrumbs.l3.id}/${breadCrumbs.l3.name.replace(/\s+/g,'-')}.html`}" v-if="breadCrumbs.l3">
              {{breadCrumbs.l3.name}}
            </el-breadcrumb-item>
          </template>
          <el-breadcrumb-item class="breadName">
              {{products.name}}
            </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品详情 -->
      <el-card>
        <div class="detailBox">
          <div class="img_view">
            <div class="show_img">
              <!-- 放大镜 -->
              <div class="magnifier" @click="clickImg(activeImg)">
                  <vue-photo-zoom-pro
                      :url="activeImg"
                      :scale="3"
                      :width="200"
                      :mask="false"
                ></vue-photo-zoom-pro>
            </div>
            </div>
			<div class="list_wrap">
				<el-link :underline="false" icon="el-icon-arrow-left" @click="moveCarousel(-1)"></el-link>
				<div style="width:380px;">
					<ul class="img_view_list" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}">
					  <li
					    v-for="(item, index) in imgList"
					    :key="index"
					    @mouseover="change(index)"
					    :class="{ active: isActive == index }"
					  >
					    <div class="images-view-item">
					      <img :src="item" alt="" />
					    </div>
					  </li>
					</ul>
				</div>
				<el-link :underline="false" icon="el-icon-arrow-right" @click="moveCarousel(1)"></el-link>
			</div>
          </div>
          <!-- 详情数据 -->
          <div class="pro_detail">
            <div class="pro_name_w">{{ products.name }}</div>
            <div class="proCost">{{$store.state.country.symbol}} {{ Number(activeSelect.price) ? $exchangeRate(Number(activeSelect.price).toFixed(2)) : (minPrice||maxPrice) ? `${$exchangeRate(minPrice)} - ${$exchangeRate(maxPrice)}` : $exchangeRate(price)}}</div>
            <!-- 选属性 -->
			<!-- <div class="pro_property">
				<p>Variants</p>
				<div class="pro_propertyArr">
					<el-select v-for="(prop, index) in propertyArr" :key="prop.name" :placeholder="prop.name" @change="chooseProp" v-model="prop.select">
						<el-option
						  v-for="val in prop.values"
						  :disabled="isPropDisabled(index,val.code)"
						  :key="val.code"
						  :label="val.name ? val.name : val"
						  :value="{index:index,name:val.name,code:val.code}">
						</el-option>
					</el-select>
				</div>
			</div> -->
            <!-- <div v-for="(prop, index) in propertyArr" :key="prop.name" class="image_option_type form-group">
              <label class="control-label">{{ prop.name }}</label>
              <ul class="img_view_list">
                <li
                  v-for="val in prop.values"
                  :key="val.name ? val.name : val"
                  :class="{active: choosePropVal[index] == val.name, disabled: isPropDisabled(index,val.code)}"
                >
                  <a v-if="val.name" href="javascript:;" @click="chooseProp(index, val.name, val.code)">{{val.name}}</a>
                </li>
              </ul>
            </div> -->
		   <div class="other-info">
			   <div class="title">SKU :</div> <span class="tx-bold">{{activeSelect.sku ? activeSelect.sku : sku}}</span>
		   </div>
		   <div class="other-info">
		   		<div class="title">Weight :</div> <span class="tx-bold">{{activeSelect.weight ? activeSelect.weight : weight}} g</span>
		   </div>
            <!-- import -->
            <!-- <div style="margin-bottom:20px">Delivery: Varies for items shipped from an international location 
              <el-tooltip
                    class="item"
                    effect="dark"
                    content="Shipping Method"
                    placement="top"
                  >
                    <i
                      style="font-size: 12px; width: 12px;cursor: pointer;"
                      class="el-icon-info"
                      @click="shoppingDialog = true"
                    ></i>
                </el-tooltip>
            </div> -->
        <!-- 1.9 新增选择属性    TODO -->
        <div class="select-props-wrap">
          <div class="select-props" v-for="(prop, index) in propertyArr" :key="prop.name">
            <div class="prop">
              <div class="title">{{prop.name}} :</div>
              <div class="props">
                <button class="val" v-for="val in prop.values" :key="val.code" :disabled="isPropDisabled(index,val.code)"
                  :class="{active: propertyArr[index].select == val.name}"
                  @click="chooseProp({index, name: val.name, code: val.code})">
                  {{val.name ? val.name : val}}
                </button>
              </div>
            </div>
          </div>
        </div>
		<div class="d-flex" style="align-items: baseline;">
			<div class=" title">{{$t('Shipping')}} : </div>
			<div class="">
				<div class="d-flex text mg-b-15">
					<div class="mg-l-20 title" style="width: 100px;">{{$t('Shipping to')}}</div>
					<el-select size="small" v-model="shippingContry" filterable placeholder="Please select" no-match-text="No data" no-data-text="No data" class="mg-l-20" @change="changeShippingCountry">
					    <el-option
					      v-for="item in shippingContrys"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</div>
				<div class="d-flex text">
					<div class="mg-l-20 title" style="width: 100px;">{{$t('Shipping fee')}}</div>
					<el-select size="small" v-model="shippingFee" placeholder="Please select" class="mg-l-20" no-data-text="No data" style="width: 400px;">
					    <el-option
					      v-for="item in shippingFees"
					      :key="item.name"
					      :label="`${item.name}  $${item.fee}  received within ${item.agingDaysBegin || 0} ~ ${item.agingDaysEnd || 0} days`"
					      :value="item.name">
					    </el-option>
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
        </div> -->
        <!-- 1.9新增tags -->
        <ul class="tags">
          <li v-for="tag in $store.state.configJson.detailPage.tags" :key="tag.text">
            <span class=" tx-danger">*</span>
            <span class="text">{{tag.text}}</span>
          </li>
        </ul>
        <!-- 这里 -->
        <div class="d-flex" style="align-items: baseline; margin:20px 0 10px 0;">
          <div class="title">Quality : </div>
          <div class="mg-l-20 d-flex">
            <el-input-number size="small" :disabled="qualityDisabled" v-model="qualityNumClone"  :min="1" :max="qualityNum" label="描述文字"></el-input-number>
            <div class="mg-l-20 d-flex">
              <div>inventory :</div>
              <div class="tx-bold mg-l-10">{{qualityNum}}</div>
            </div>
          </div>
        </div>
            <el-button style="margin-top: 10px; width: 240px; height: 54px; font-size: 20px;"
                    type="primary"
                    @click="import_pro($event)"
                    :disabled="isAdd == 1"
                    >{{$t('Add to List')}}
            </el-button>
            <el-button class="addCart"
              type="primary"
              @click="addToCart($event)"
              :disabled="qualityDisabled"
              >{{$t('Add to Cart')}}
            </el-button>
        <!-- 1.9 平铺     -->
        <div v-if="$store.state.configJson.detailPage.imgSize == 'Tile'" class="inner-description" v-html="web">
         
        </div>    
          </div>
        </div>
       
        <!-- Description -->
        <div v-if="$store.state.configJson.detailPage.imgSize == 'Thumbnail'" class="descript">
         <el-tabs v-model="activeName">
            <el-tab-pane label="Description" name="first">
              <div v-html="web" class="detail-desc ql-snow ql-editor"></div>
            </el-tab-pane>
        </el-tabs> 
        </div>
      </el-card>
        <!-- Recommended -->
      <!-- 1.9 注释掉了   -->
      <!-- <el-card style="margin-top:20px" v-if="items.length != 0">
      <div class="recommend">
         <el-tabs v-model="activeName">
            <el-tab-pane label="Recommended Products" name="first">
              <div class="list">
          <el-col
            v-for="item in items"
            :key="item.id"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="4"
            style="margin-bottom: 20px"
          >
            <div class="pro_box">
              <div class="pro_img">
                <div class="img-wrap">
                  
                <el-image
                  style="position: absolute; width: 100%;
                  height: 100%;"
                  :fit="'cover'"
                  :src="item.imgUrl"
                  @click="goToDetail(item)"
                >
                </el-image>
                  
                </div>
                </div>
              <div class="pro_name" @click="goToDetail(item)">
                <a>{{ item.name }}</a>
              </div>
              <div class="price">
                <span class="pro_cost">{{$showSybmol()}} {{$exchangeRate(item.cost)}}</span>
              </div>
              
              <div class="imports_">

              </div>

              <div
                style="
                  display: flex;
                  width: 100%;
                  justify-content: center;
                  margin-top: 15px;
                "
              >
                <el-button
                  type="primary"
                  size="mini"
                  @click="import_Recommend(item, $event)"
                  :disabled="item.hasImport == 1"
                  >Add to Import List</el-button
                >
              </div>
            </div>
          </el-col>
        </div>
            </el-tab-pane>
        </el-tabs> 
        </div>
      
      </el-card> -->
    </div>
  </div>
 <!-- <Footer /> -->
 <DFooter :setting="$store.state.configJson && $store.state.configJson.footer || ''"/>
 <template v-if="code && code.footer && code.footer.length > 0">
 	<div v-for="(item, index) in code.footer" :key="index" v-html="item"></div>
 </template>
  <el-backtop
      class="goto-top"
      :right="32"
      :bottom="120"
    >
    </el-backtop>
     
<!-- 快递方式 -->
<el-dialog title="Shipping Method" :visible.sync="shoppingDialog" width="40%" >
  <el-divider></el-divider>
  <el-table :data="shopMethod" highlight-current-row style="width:100%">
    <el-table-column label="" width="60">
			
		</el-table-column>
    <el-table-column property="time" label="Estimated Delivery" width="200"></el-table-column>
    <el-table-column property="track" label="Tracking" width="150">
      <i class="el-icon-check"></i>
    </el-table-column>
    <el-table-column property="name" label="Carrier"></el-table-column>
  </el-table>
  <div slot="footer" class="dialog-footer">
    <el-button  @click="shoppingDialog = false">{{$t('Close')}}</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import ZsSuit from "@/assets/ZsSuit.js"; //规格选择
import homeHeader from '@/components/Home/Header-v2'
import Footer from "./../components/PageFooter2"
import DHeader from '@/views/homePage/components/header'
import DFooter from '@/views/homePage/components/footer'
export default {
  props: {},
  data() {
    return {
      keyValue:"",
      suitRuleInfoClone: {},
      qualityNum: 0,
      qualityDisabled: true,
      qualityNumClone: 0,
		shippingContry:"",
    vendorId:localStorage.getItem('vendorId'),
		shippingContrys:[],
		shippingFee:"",
		shippingFees:[],
		allShippingFees:[],
      quantity: 1,
		setting: null,
		code: {
			header: [],
			footer: []
		},
				headerMenu:[],
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
        modalShippingMethodDefault: '{}',
        activeShipping: null,

        radio:'',
        loading:false,
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
        web:'',
        isFound:true,
        proId:null,
        isAdd:null,
        name: "",
        moreName: '',
        imgUrl: "",
        imgList: [],
        type1:[],
        type2:[],
        typeImg:[],
        items:[],
        nowPro:{},
        price:'',
        typeTwoData:'',
        isActive: 0,
        isActiveCate: -1,
        isChange:-1,
        products: {},
        shoppingDialog:false,
        visible:false,
        propValue: "",
        submitLoading: false,
        types:[],
        disType:[],
        //新属性
        propertyArr: [],  //属性表
        stocks:[], 
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
		sku:"",
		currentOffset: 0,
		windowSize: 6,
		paginationFactor: 65,
    minPrice: '',
    maxPrice: '',
      };
  },
  watch: {
	  
	$route: "gotoPage",
  'setting.header.activeMenu': {
    handler() {
      this.getMenu()
    },
    deep: true
  },
  pid(){
          //reset
          this.countryArr = [];
          this.propertyArr = [];
          this.choosePropVal = [];
          this.disabledProp = []; 
          this. selectedStockId = 0;
          this.addCartLoading = false; 
          this.quantity = 1;
          this. modalConfirmCart = {
            loading: false,
            type: 1,
            stock: {},
          }
          this.zsSuit= new ZsSuit();
          this.modalShippingMethodDefault = JSON.stringify(this.modalShippingMethod)
          this.proId =  this.pid;
          if(this.$route.params.name)
            this.name = this.$route.params.name.replace('.html','').replace(/_/g,' ');
          this.getDetail();
        }
 },
 created() {
 	this.setting = localStorage.getItem("c_shopConfigJson") ? JSON.parse(localStorage.getItem("c_shopConfigJson")) : null;
	if(!this.setting || !this.setting.customCode || !this.setting.customCode.length) return;
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
 computed:{
	 atEndOfList() {
	   return this.currentOffset <= (this.paginationFactor * -1) * (this.imgList.length - this.windowSize);
	 },
	 atHeadOfList() {
	   return this.currentOffset === 0;
	 },
   activeSelect(){
        let r = {
          price: '0.00',
          img: '',
		  weight:'',
		  sku:''
        }
        this.stocks.forEach(e => {
          if(e.id == this.selectedStockId){
            r.price = e.price;
            r.img = e.propertyImage;
			 r.weight = e.weight;
			  r.sku = e.sku;
          }
        })
        if(r.img) {
          // this.activeImg = r.img;
          this.activeImg = this.stocks.find((item) => item.id == this.keyValue).propertyImage
        }
        return r
      },
   breadCrumbs(){
        let arr = this.products.categorys;
        if(!(arr&& arr.length)){
            return false;
        }
        let obj = {
            L:0,
            l1: null,
            l2: null,
            l3: null,
        }

        obj.L = arr.length;
        obj.l1 = obj.L ? arr[arr.length - 1] : null;
        obj.l2 = obj.L && obj.L > 1 ? arr[arr.length - 2] : null; 
        obj.l3 = obj.L && obj.L > 2 ? arr[arr.length - 3] : null;
        // obj.l1.open = obj.L > 1;
        return obj
    },
 },
  filters: {
        typeOne(value) {
          if(value){
            return value.split("||")[0];
          }else{
            return '';
          }
        },
        typeTwo(value) {
            if(value){
            return value.split("||")[1];
          }else{
            return '';
          }
        }
    },
  beforeDestroy(){
    clearInterval(this.time);
  },      
  mounted() {
    if(this.$root.$children[0].getParentUrl() && this.$root.$children[0].getParentUrl().indexOf("vendor") >= 0) {
      return;
		}else{
			this.$root.$children[0].checkLogin();
		}
    this.proId = this.$route.params.id;
    this.name = this.$route.params.name.replace('.html','').replace(/-/g,' ');
    
    this.getDetail();
    document.title = `${this.name} How to find :: ${this.$root.$children[0].pName.b} App - ${this.$root.$children[0].pName.a}.com`;
    // 1.9注释掉推荐
    // this.getRecommend();
    
  },
  methods: {
	  addToCart(e){
      if(!this.$store.state.userInfo){
        this.importProduct = this.$route.params;
        this.$root.$children[0].openDialogLogin();
        return;
      }
      let stockList = []
      let quantity = this.stocks.find((item)=> item.propertyValue == this.choosePropVal.join("||"))
      stockList.push({stockId:quantity.id, quantity: this.qualityNumClone})
      let params = {
        stockList:stockList
      }
      this.$apiCall("api.Cart.addToCart", {...params}, (r) => {
          if (r.ErrorCode == 9999) {
            this.getCartNum()
            this.$message.success(r.Message)
          } else {
            this.$message.error(r.Message)
          }
        }
      );
    },
    getCartNum(){
      this.$apiCall(
        "api.Cart.countCart", {}, (r) => {
          if (r.ErrorCode == 9999) {
            this.$root.$children[0].cartNum = Number(r.Data.Results);
          }
        }
      );
    },
    getMenu(){
      if(this.setting.header.activeMenu){ //有启用头部菜单
        this.setting.menu.forEach((item) => {
          if (item.id == this.setting.header.activeMenu) {
            this.headerMenu = item
          }
        })
      }
    },
	  moveCarousel(direction) {
	    // Find a more elegant way to express the :style. consider using props to make it truly generic
	    if (direction === 1 && !this.atEndOfList) {
	      this.currentOffset -= this.paginationFactor;
	    } else if (direction === -1 && !this.atHeadOfList) {
	      this.currentOffset += this.paginationFactor;
	    }
	  },
    chooseProp(value){
      //TODO
      console.log(value)
		let i = value.index,
			val = value.name,
			code = value.code;
        //选择属性
        if (this.isPropDisabled(i, code)) return; //disabled不能点
        if (this.choosePropVal[i] == val) {
          //不选
          this.$set(this.choosePropVal, i, "");
          this.zsSuit.unset(i);
        } else {
          //选择
          this.$set(this.choosePropVal, i, val);
          this.zsSuit.set(i, code); 
        }

        let keys = Object.keys(this.suitRuleInfoClone)
         for(let i=0,l=keys.length;i<l;i++){
          if( this.suitRuleInfoClone[keys[i]]==code || this.suitRuleInfoClone[keys[i]].indexOf(code) != -1) {
            this.keyValue = keys[i]
            break
          }
         }
        console.log(this.keyValue)
        console.log(this.stocks)
        // this.activeImg = this.stocks.find((item) => item.id == this.keyValue).propertyImage
        let quantity = this.stocks.find((item)=> item.propertyValue == this.choosePropVal.join("||"))
        console.log(quantity)
        if(quantity){
          if(!quantity.inventory){
            this.qualityNum = 999999999999
            this.qualityDisabled = false
          } else if(Number(quantity.inventory) >= 0 ){
            this.qualityNum = Number(quantity.inventory)
            this.qualityDisabled = false
          } else if(Number(quantity.inventory) < 0){
            this.qualityNum = 0
            this.qualityDisabled = true
          }
        } else {
          this.qualityDisabled = true
          this.qualityNum = 0
        }
        // console.log(this.zsSuit)
        let keyArr = Object.keys(this.suitRuleInfoClone)
         for(let i=0,l=keyArr.length;i<l;i++){
          if( this.suitRuleInfoClone[keyArr[i]]==code || this.suitRuleInfoClone[keyArr[i]].indexOf(code) != -1) {
            this.keyValue = keyArr[i]
            break
          }
         }
    if(this.propertyArr[i].select == val){
      this.$set(this.choosePropVal, i, '');
      this.$set(this.propertyArr[i], "select", '');
      this.$nextTick(()=>{
        this.selectedStockId = 0;
      })
      this.getVendorShippingCountry();
    }else{
      this.$set(this.choosePropVal, i, val);
      this.$set(this.propertyArr[i], "select", val);
	  this.shippingFees = this.allShippingFees[this.selectedStockId];
	  this.shippingFee = this.shippingFees[0] ? this.shippingFees[0].name : "";
    } 
		this.zsSuit.set(i, code);
      },
      isPropDisabled(i, code) {
        if (!this.disabledProp.length) return;
        //是否禁用
        let state = false;
        this.disabledProp[i].find(e => {
          if (e == code) {
            state = true;
          }
        });
        return state;
      },
    getCurrentRow(row){
    },
    // 登录功能
    gotoPage(){
      Object.assign(this.$data, this.$options.data());
      this.proId = this.$route.params.id;
      this.name = this.$route.params.name; 
      this.getDetail();
      // 1.9注释掉推荐
      // this.getRecommend()
    },
    getRecommend(){
    this.$apiCall("api.VendorShop.findProducts",{id:this.proId,rowsPerPage:12,page: 1},(r)=>{
      this.items = r.Data.Results;
      $(window).scrollTop(0)
    })
    },
    filterType(type,i){
    this.isChange = i;
    this.typeTwoData = type;
    if(this.propValue!=''){
        this.products.stocks.forEach(a=>{
          if(a.propertyValue ==`${this.propValue}||${this.typeTwoData}`){
           this.nowPro = a;
           this.price = this.nowPro.price
           this.weight = this.nowPro.weight
		   this.sku = this.nowPro.sku
          }
        })
      }
    },
    returnMore(){
     let num = this.products.categorys.length - 1;
     this.$router.push({
        path: `/category/${this.products.categorys[num].id}/${this.products.categorys[num].name.replace(/\s+/g,"-")}.html`
      })
    },
     formatCharAT(txt) {
      var asc = "";
      for (var i = 0; i < txt.length; i++) {
        if (txt[i] != "_") {
          asc += txt.charAt(i).charCodeAt();
        } else {
          asc += "_";
        }
      }
      return asc;
    },
	changeShippingCountry(val){
		this.$apiCall("api.VendorShop.getProductShippingFee", {
			id: this.proId,
			country: val
		}, r => {
			this.loading = false;
			if (r.ErrorCode == "9999") {
				this.allShippingFees = r.Data.Results;
				this.shippingFees = this.selectedStockId ? this.allShippingFees[this.selectedStockId] : this.allShippingFees[Object.keys(this.allShippingFees)[0]];
				this.shippingFee = this.shippingFees[0] ? this.shippingFees[0].name : "";
			} else {
				this.$elementMessage(r.Message, 'error');
			}
		});
	},
	getVendorShippingCountry(){
		this.$apiCall("api.VendorShop.getVendorShippingCountry", {
			id: this.proId
		}, r => {
			if (r.ErrorCode == "9999") {
				this.allShippingFees = r.Data.Results;
				let data = r.Data.Results;
				this.shippingContrys = [];
				if(Object.keys(data).length){
					this.shippingContry = Object.keys(data)[0];
					for (let key of Object.keys(data)) {
						this.shippingContrys.push({
							label:data[key],
							value:key
						})
					}
					this.changeShippingCountry(this.shippingContry);
				}else{
					this.loading = false;
				}
				
			} else {
				this.loading = false;
				this.$elementMessage(r.Message, 'error');
			}
		});
	},
    getDetail() {
      this.loading = true;
      this.$apiCall(
        "api.VendorShop.productDetail",
        {
          id: this.proId,
          vendorCategory:true,
        },
        (r) => {
          if(r.ErrorCode == 9999){
          let data = r.Data.Results;
		  this.getVendorShippingCountry();
          data.propertyName.split('||').forEach(p => {
            this.propertyArr.push({
              name: p,
              values: [],
            })
          })
          if(data.stocks && data.stocks.length){
            this.stocks = data.stocks.map(e => {
              e.propertyValueArr = e.propertyValue.split('||')
              return e;
            })
          }
          let suitRuleInfo = {};
          this.stocks.forEach(e => {
            e.propertyValueArr.forEach((p,i) => {
              //属性空替换成 default
              if(!p) e.propertyValueArr.splice(i, 1, 'default');
              if(this.propertyArr[i].values.indexOf(p) < 0){
                this.propertyArr[i].values.push(p ? p : 'default')
              }
              //去重
              this.propertyArr[i].values = [...new Set(this.propertyArr[i].values)]
              e.propertyValue2 = this.formatCharAT(e.propertyValueArr.join('_'));
              suitRuleInfo[e.id] = e.propertyValue2;
            })
          })
          this.propertyArr.forEach(e =>{
            e.values.forEach((v,i) => {
              e.values.splice(i, 1, {name: v, code: this.formatCharAT(v)})
            })
            this.choosePropVal.push(''); //建立默认已选择属性长度
          })
          // console.log(suitRuleInfo)
          this.suitRuleInfoClone = suitRuleInfo
          this.zsSuit.config({ suitRuleInfo });
          // console.log(this.zsSuit)
          this.zsSuit.callBack = (data, skuId) => {
            this.disabledProp = data;
            this.selectedStockId = skuId;
            // console.log(this.selectedStockId,'111')
          }
          // console.log(this.zsSuit)

           let priceArr = []; 
		   let weightArr = [];
             //old
           this.activeImg = r.Data.Results.imgUrl;
           this.price = r.Data.Results.cost
		   this.sku = r.Data.Results.sku
		   this.weight = 0
           this.imgList = eval(r.Data.Results.imgUrlJson);
           if (r.Data.Results.videoUrl) {
             this.isImage = false
           }
           this.videoUrl = r.Data.Results.videoUrl
           this.products = r.Data.Results;
           this.isAdd = r.Data.Results.hasImport;
           this.web = r.Data.Results.description.web;
           this.web = this.web.replace(/\n/g,'<br/>');
           const num = r.Data.Results.categorys.length - 1;
           if(r.Data.Results.categorys[num])
            this.moreName = r.Data.Results.categorys[num].name;
           r.Data.Results.stocks.forEach(item => {
             this.type1.push(item.propertyValue.split("||")[0]);
             this.type2.push(item.propertyValue.split("||")[1]);
             priceArr.push(item.price);
			 weightArr.push(item.weight);
           });
           if(Math.min(...priceArr)== Math.max(...priceArr)){
             this.price = Math.min(...priceArr).toFixed(2);
           }else{
             this.minPrice = Math.min(...priceArr).toFixed(2);
             this.maxPrice = Math.max(...priceArr).toFixed(2);
           }
		   if(Math.min(...weightArr)== Math.max(...weightArr)){
		     this.weight = Math.min(...weightArr).toFixed(2);
		   }else{
		     this.weight = `${Math.min(...weightArr).toFixed(2)} - ${Math.max(...weightArr).toFixed(2)}`;
		   }
           this.type1 = [...new Set(this.type1)];
           this.type2 = [...new Set(this.type2)];
           let arr = [];
           this.type1.forEach(i =>{
             arr.push(r.Data.Results.stocks.filter((a)=>{
               return a.propertyValue.split("||")[0] == i
             }))
           })
           this.types = arr;
           arr.forEach(info=>{
               if(info[0] && info[0].propertyImage)
                this.typeImg.push(info[0].propertyImage)
           });
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
          }else{
        //    this.$message.error(r.Message);
          }
        }
      );
    },
    change(i) {
      this.isActive = i;
      this.activeImg = this.imgList[i];
    },
    changeCate(i) {
      this.isActiveCate = i;
      this.isActive = -1;
      this.propValue = this.type1[i];
      this.imgUrl = this.typeImg[i];
      if(this.typeTwoData!=''){
        this.products.stocks.forEach(i=>{
          if(i.propertyValue ==`${this.propValue}||${this.typeTwoData}`){
           this.nowPro = i;
           this.price = this.nowPro.price
		   this.sku = this.nowPro.sku
		   this.weight = this.nowPro.weight 
          }
        })
      }
    },
    import_Recommend(item) {
       if(!this.$store.state.userInfo){
        this.importProduct = {id:item.id,name:item.name};
        this.centerDialogVisible =true;
        return;
      }
      this.$apiCall(
        "api.Product.addFromVendorShopProduct",
        {
          id: item.id,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            item.hasImport = 1;
            item.imports++;
            this.$message.success("Import Success !");
            this.$router.push({name: 'productDetail', query:{id:item.id,name:item.name}})
          } else {
            this.$message.error(r.Message);
          }
        }
      );
    },
     goToDetail(item){
      let id = localStorage.getItem('vendorId')
      if ( id != 148982 && id != 146428 && id != 144875 && id != 144843 && id != 143779 && id != 143654 &&  id != 74) {
     window.open(`/item/${item.id}/${item.name.replace(/\s+/g, "-").replace(/[^\w]/g,'_')}.html`)
      }else{
    window.open(`/itemOld/${item.id}/${item.name.replace(/\s+/g, "-").replace(/[^\w]/g,'_')}.html`)

      }
      //  window.open(`/item/${item.id}/${item.name.replace(/\s+/g, "-").replace(/[^\w]/g,'_')}.html`)
       document.title = `${item.name.replace('.html','')} How to find :: ${this.$root.$children[0].pName.b} App - ${this.$root.$children[0].pName.a}.com`;

    },
    import_pro() {
      if(!this.$store.state.userInfo){
        this.importProduct = this.$route.params;
        this.$root.$children[0].openDialogLogin();
        return;
      }
      this.$apiCall(
        "api.Product.addFromVendorShopProduct",
        {
          id: this.products.id,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            this.products.imports++;
            this.isAdd = 1;
            this.$root.$children[0].importNum++;
            this.$message.success("Import Success !");
          } else {
            this.$message.error(r.Message);
          }
        }
      );
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
.detail-desc{
  img{
    max-width: 1200px;
  }
}

</style>
<style lang="scss" scoped>
.addCart{
  margin: 10px 0 0 20px;
  width: 240px;
  height: 54px;
  font-size: 20px;
}
.breadName{
  width: 250px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.home-page {
  max-width: 1920px;
  width: 100%;
  background-color: #fff;
}
</style>
<style scoped lang="scss">
ul,li{
  list-style: none;
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
.list_wrap{
	overflow: hidden;
	width: 450px;
	position: relative;
	display: flex;
	.el-link{
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
    a{ 
       padding: 3px 10px;
       border-radius: 5px;
       color: #4E4E4E;
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
  li.active{  
    a{
      background: #568AF9;
      border: 1px solid #568AF9;
      color: #fff;
    }
  }
  li.disabled{
    background-color: #e6e6e6;
    opacity: .8;
    a{
      border-style: dashed;
      border-color: #ddd;
      color: #999;
      cursor: no-drop;
    }
    a:hover{
      border-color: #ddd;
      color: #999;
    }
  }
}
// .img_view_list .active {
//   box-shadow: inset 0 0 0 1px #5c6ac4;
// }
.detail{
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
    color:  rgb(144, 147, 153);
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

.moreName{
 cursor: pointer;
 color: #000;
}
.moreName:hover{
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
.detail-desc{
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  // align-items: center;
  img{
    max-width: 1000px !important;
  }
  ::v-deep .detailmodule_image{
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      max-width: 1000px;
      margin-top: 20px;
    }
  }
  ::v-deep .detailmodule_text{
    p{
     display: flex;
    flex-direction: column;
    align-items: center; 
    }
    img{
      max-width: 1000px;
      margin-top: 20px;
    }
  }
}

.but{
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 3px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #FFFFFF;
  border: 1px solid #DCDFE6;
  border-color: #DCDFE6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
}
.descript ::v-deep .el-tabs__active-bar .is-top{
  width: 95px;
}
.descript ::v-deep #tab-first{
  font-size: 20px;
}
.recommend ::v-deep .el-tabs__active-bar .is-top{
  width: 221px;
}
.recommend ::v-deep #tab-first{
  font-size: 20px;
}
.recommend{
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
.pro_property{
	p{
		height: 22px;
		font-size: 14px;
		font-weight: 400;
		color: #303133;
		line-height: 22px;
		margin-bottom: 10px;
	}
	.pro_propertyArr{
		display: flex;
		flex-wrap: wrap;
		>.el-select{
			margin-right: 15px;
			margin-bottom: 15px;
		}
	}
}
.other-info{
  display: flex;
	height: 22px;
	font-size: 14px;
	font-weight: 400;
	color: #303133;
	line-height: 22px;
	margin: 20px 0;
  .title{
    margin-right: 10px;
    min-width: 66px;
  }
	.tx-bold{
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
    
    h2{
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

.home-page ::v-deep .el-radio__input.is-checked + .el-radio__label{
  color: #eff0f9;
}
.home-page ::v-deep .el-table__row:hover .el-radio__label{
  color: rgb(236, 237, 247);
}
.el-backtop{
  right: 32px !important;
  transform: none;
}
.ipt-num{
  display: flex;
  align-items: center;
  .title{
    margin-right: 15px;
  }
  ::v-deep{
    .el-input-number__decrease, .el-input-number__increase{
      background-color: #fff;
    }
    .el-input{
      input{
        font-weight: bold;
        font-size: 16px;
      }
    }
  } 
}
ul.tags{
  display: flex;
  flex-wrap: wrap;
  margin: 15px 0 25px 0;
  padding: 15px 0;
  li{
    margin-right: 15px;
    font-size: 12px;
    .text{
      color: #909399;
    }
  }
}
.pro_detail{
  flex: 1;
}
.inner-description{
  margin-top: 30px;
  width: 716px;
  ::v-deep img{
    max-width: 700px;
  }
}
.select-props-wrap{
  .select-props{
    margin-bottom: 10px;
    .prop{
      display: flex;
      .title{
        margin-right: 10px;
        line-height: 44px;
        min-width: 66px;
      }
      .props{
        display: flex;
		flex-wrap: wrap;
        .val{
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
        .val:hover{
          border-color: #DCDFE6;
        }
        .val.active{
          border-color: #535fb0;
        }
        .val:disabled{
          color: #C0C4CC;
          cursor: no-drop;
        }
        .val:disabled{
          border-color: transparent;
        }
      }

    }
  }
}
</style>
