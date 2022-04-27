<template>
  <div class="home-page">
   <!-- <homeHeader ref="homeHeader"/> -->
	<template v-if="code && code.header && code.header.length > 0">
		<div v-for="(item, index) in code.header" :key="index" v-html="item"></div>
	</template>
	<div style="position: relative;height: 120px;">
		   <DHeader :data="setting && setting.header || ''" :headerMenu="headerMenu" />
	</div>
    <div class="contentpanel find-product">
      <div class="pagetitle" ref="pageHeader" style="padding-right:0">
            <div style="width:100%" class="d-flex">
              <el-select
                  style="width:264px;margin-right:-1px"
                  v-model="select"
                  slot="append"
                  placeholder="IN ALL CATEGORIES"
                >
                  <el-option label="IN ALL CATEGORIES" value=""></el-option>
                  <el-option
                    v-for="item in commodityTypeAllList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              <el-input
                placeholder="Search products"
                v-model="input"
                class="input-with-select"
                @keyup.enter.native="search"
              >
              </el-input>
            <div class="search-but" @click="search()">
              SEARCH
            </div>
          </div>
      </div>
      <div style="margin-top: 50px">
        <div ref="tablefilter" class="commodity-type-wrapper">
          <template v-for="(item, index) in commodityTypeAllList">
          <div
            class="type-item"
            v-if="index < 9"
            :key="index"
            :class="{ selected: index === commodityType }"
            @click="
              selectedCommodityType({ id: item.id, name: item.name, index })
            "
          >
            <div class="type-icon">
              <i class="iconfont" :class="item.icon"></i>
            </div>
            <div class="type-text">{{ item.name }}</div>
          </div>
          </template>
          <div class="type-item" :class="{ selected: commodityType >= 9 }" 
            v-if="commodityTypeAllList&&commodityTypeAllList.length>=9">
            <el-dropdown trigger="click">
              <div class="type-item-more">
                <div class="type-icon">
                  <i class="iconfont icon-weibiaoti5"></i>
                </div>
                <div class="type-text">More categories</div>
              </div>
              <el-dropdown-menu class="more-dropdown" slot="dropdown">
                <el-dropdown-item
                  placement="top"
                  v-for="(item, index) in commodityTypeMoreList"
                  :key="index"
                  :command="{ index: index + 9, id: item.id }"
                  :class="{ action: categoryId == item.id }"
                  @click.native="
                    selectedCommodityType({
                      id: item.id,
                      name: item.name,
                      index: index + 9,
                    })
                  "
                  >{{ item.name }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div></div
      >
      <!-- 商品列表 -->
      <div v-loading="loading" v-if="!ShowPage">
        <div class="head_tit">
          <div class=" justify-content-between" style="width:100%;display:flex">
            <h1>{{ titName }}</h1>
            <div
              class="more"
              @click="goMore('go')"
              v-if="productList && productList.length != 0 && productList.length > 6"
            >View More ></div>
          </div>
        </div>
          
          
        <div
          class="out"
          v-if="productList && productList.length != 0"
        >
         
            <ul class="pro_list">
              <template v-for="(item, index) in productList">
                <li v-if="index < 5"  :key="index" class="lis">
                  <div class="pro_box">
                    <div class="pro_img" style="height:194px">
                    <el-image
                      lazy
                      style="position: absolute; width: 100%;cursor: pointer;
                      height: 100%;"
                      :fit="'cover'"
                      :src="item.imgUrl"
                      @click="goToDetail(item)"
                    >
                    </el-image>
                      
                    </div>
                    
                    <div style="padding:16px 10px">
                    <div class="pro_name" @click="goToDetail(item)">
                      <a href="javascript:;">{{ item.name }}</a>
                    </div>
                    <b class="pro_cost">{{$showSybmol()}} {{$exchangeRate(item.cost)}}</b>
                    <!-- <div class="imports">
                      <span>Imports: {{ item.imports }}</span>
                      <span
                        >Orders:{{ item.sold30days }}
                        <el-tooltip
                          class="item"
                          effect="dark"
                          content="Last 30 days"
                          placement="top"
                        >
                          <i
                            style="font-size: 12px; width: 12px;"
                            class="el-icon-info"
                          ></i> </el-tooltip
                      ></span>
                    </div> -->

                    <div
                      style="
                        display: flex;
                        width: 100%;
                        justify-content: center;
                        margin-top: 12px;
                      "
                    >
                      <!-- <el-button
                        type="primary" class="importBut"
                        @click="import_pro(item, $event)"
                        :disabled="item.hasImport == 1"
                        >Add to Import List</el-button
                      >  -->
                      <!-- 这里 -->
                        <el-dropdown>
                          <el-button type="primary">
                            Add to Import List<i class="el-icon-arrow-down el-icon--right"></i>
                          </el-button>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item  class="importBut" :disabled="item.hasImport == 1" @click.native="import_pro(item, $event)">Add to Import List</el-dropdown-item>
                            <el-dropdown-item @click.native="goToDetail(item)">Add to Cart</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    </div>
                  </div>
                </li>
              </template>
            </ul>
        </div>
        <div v-else>
          <el-card>
            <b>There are no products in this category</b>
          </el-card>
        </div>
      </div>
  <!-- 全部商品列表 -->
      <div v-if="ShowPage">
        <template 
          v-for="(info, index) in commodityTypeAllList">
        <div
          v-loading="loading"
          :key="index"
          v-if="index < 9"
        >
          <div class="head_tit">
            <div class="justify-content-between" style="width:100%;display:flex ">
            <h1>{{ info.name }}</h1>
            <div
              class="more"
              @click="goMore(info.id, info.name)"
              v-if="
                info.proList &&
                info.proList.length != 0 &&
                info.proList.length > 6
              "
              >View More ></div
            >
          </div>
            
          </div>
          <div v-if="!info.proList || info.proList.length == 0">
            <el-card>
              <b>There are no products in this category</b>
            </el-card>
          </div>
          <div class="out"  v-else>
              <ul class="pro_list">
                <template v-for="(item, index) in info.proList">
                  <li v-if="index < 5"  :key="item.id" class="lis">
                    <div class="pro_box">
                      <div class="pro_img" style="height:194px">
                    <el-image
                      lazy
                      style="position: absolute; width: 100%;cursor: pointer;
                      height: 100%;"
                      :fit="'cover'"
                      :src="item.imgUrl"
                      @click="goToDetail(item)"
                    >
                    </el-image>
                      
                    </div>
                    <div style="padding:16px 10px">
                      <div class="pro_name" @click="goToDetail(item)">
                        <a href="javascript:;">{{ item.name }}</a>
                      </div>
                      <b class="pro_cost">{{$showSybmol()}} {{$exchangeRate(item.cost)}}</b>
                      <!-- <div class="imports">
                        <span>Imports:
                           <span style="color:#525FB0">{{ item.imports }}</span>
                        </span>
                      </div> -->
                      <div
                        style="
                          display: flex;
                          width: 100%;
                          justify-content: center;
                          margin-top: 12px;
                        "
                      >
                        <!-- <el-button
                          type="primary"
                          class="importBut"
                          @click="import_pro(item, $event)"
                          :disabled="item.hasImport == 1"
                          >Add to Import List</el-button
                        > -->
                        <!-- 这里 -->
                        <el-dropdown>
                          <el-button type="primary">
                            Add to Import List<i class="el-icon-arrow-down el-icon--right"></i>
                          </el-button>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item  class="importBut" :disabled="item.hasImport == 1" @click.native="import_pro(item, $event)">Add to Import List</el-dropdown-item>
                            <el-dropdown-item @click.native="goToDetail(item)">Add to Cart</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                    </div>
                    </div>
                  </li>
                </template>
              </ul>
          </div>
          
        </div>
        </template>
      </div>
      
    </div>
  <!-- <Footer /> -->
   <DFooter :setting="$store.state.configJson && $store.state.configJson.footer || ''"/>
   <template v-if="code && code.footer && code.footer.length > 0">
   	<div v-for="(item, index) in code.footer" :key="index" v-html="item"></div>
   </template>
    <DialogProductForm :data="dialogProductForm" @signup="openSingUp"/>
    <DialogSignin :data="dialogSignin" :platformArr="platformArr"
      @openSingUp="openSingUp"
      @signIn="signIn"
      @forgotPS="openForgotPS"
      @selectLogin="selectLogin"
    />
    <DialogSignUp ref="dialogSingUp"
      :data="dialogSignup" :platformArr="platformArr"
      :sec="emailCountDownSec.signup"
      @resetSEC="resetSEC"
      @openSingIn="openSingIn"
      @register="register"
      @selectLogin="selectLogin"
    />
    <DialogForgotPsd ref="dialogForgotPsd" 
      :data="dialogForgotPsd"
      :sec="emailCountDownSec.forgot"
      @resetSEC="resetSEC"
      @saveNewPSD="saveNewPSD"
    />
    <el-backtop
      class="goto-top"
      :right="32"
      :bottom="120"
    >
    </el-backtop>
  </div>
</template>

<script>
import homeHeader from '@/components/Home/Header-v2' 
import Footer from "./../components/PageFooter2"
import { commodityType } from '@/components/productList'
import DialogProductForm from '@/components/DialogProductForm'
import DialogSignin from "./../components/Home/DialogSignIn" //signIn 弹框登录
import DialogSignUp from "./../components/Home/DialogSignUp" //sigup 注册
import DialogForgotPsd from "./../components/Home/DialogForgotPsd" //忘记密码
import DHeader from '@/views/homePage/components/header'
import DFooter from '@/views/homePage/components/footer'
export default {
  props: {},
  data() {
    return {
		setting: null,
		code: {
			header: [],
			footer: []
		},
				headerMenu:[],
      loginLoading:false,
      centerDialogVisible:false,
      header2Visible: false,
      loading: false,
      time: 0,
      shopUrl: "",
      platformArr: this.$dict.platformArr,
      activePlatform: 'shopify',
      dialogSignin:{
        isShow: false,
        loading: false,
        email: '',
        password: '',
      },
      dialogSigninDefault: '{}',
      dialogSignup: {
        isShow: false,
        loading: false,
        email: '',
        captcha: '',
        password: '',
        rePassword: '',
        isReadonly: true,
      },
      dialogSignupDefault: '{}',
      emailCountDownSec:  {
        signup: 0,
        forgot: 0,
      },
      emailCountDownTime: {
        signup: 0,
        forgot: 0,
      },
      dialogForgotPsd: {
        isShow: false,
        loading: false,
        email: '',
        captcha: '',
        password: '',
        rePassword: '',
        isReadonly: true,
      },
      dialogForgotPsdDefault: '{}',
      forgotPsdCountDownSec: 0,
      forgetPsdCountDownTime: 0,
      win: null,
      input: "",
      select: null,
      titName: "",
      name: "",
      status: 0,
      page: 1,
      isRun: false,
      commodityType: null,
      fullscreenLoading: true,
      ShowPage: false,
      rowsPerPage: 10,
      categoryId: "",
      ball: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        opacity: 0,
      },
      commodityTypeList: commodityType,
      commodityTypeMoreList: [],
      commodityTypeAllList:[],
      productList: [],
      dialogProductForm: {
        isShow: false,
        loading: false,
        type: 1,
        imgUrl: '',
        detail: '',
        email: '',
        otherContact: '',
      },
      dialogProductFormDefault: '{}',
      c_apiShopId: JSON.parse(localStorage.getItem('c_apiShopId'))
    };
  },
  components:{
    homeHeader,
    Footer,
    DialogProductForm,
    DialogSignin,
    DialogSignUp,
    DialogForgotPsd,
    DHeader,
    DFooter,
  },
  watch: {
    'setting.header.activeMenu': {
      handler() {
        this.getMenu()
      },
      deep: true
    },
  },
  beforeDestroy(){
    clearInterval(this.time);
  },   
  created() {
  	this.setting = localStorage.getItem("c_shopConfigJson") ? JSON.parse(localStorage.getItem("c_shopConfigJson")) : null;
  	if(!this.setting || !this.setting.customCode || !this.setting.customCode.length) return;
  	this.setting.customCode.forEach((item) => {
  		if (item.pages.includes('商品列表页')) {
  			if (item.position == '底部') {
  				this.code.footer.push(item.desc)
  			}
  			if (item.position == '顶部') {
  				this.code.header.push(item.desc)
  			}
  		}
  	})
  },
  mounted() {
    this.getProductCategory();
    // this.getCategory();
    this.dialogSigninDefault = JSON.stringify(this.dialogSignin);
    this.dialogSignupDefault = JSON.stringify(this.dialogSignup);
    this.dialogForgotPsdDefault = JSON.stringify(this.dialogForgotPsd);
    this.dialogProductFormDefault = JSON.stringify(this.dialogProductForm)
    if(this.$route.hash && this.$route.hash.indexOf('utm_source') > -1 && !this.$store.state.userInfo){
      setTimeout(()=>{
        this.openDialogProductForm();
      },3000)
    }
    if(this.$root.$children[0].getParentUrl() && this.$root.$children[0].getParentUrl().indexOf("vendor") >= 0) {
		}else{
			this.$root.$children[0].checkLogin();
		}
    this.header2Visible = $(window).scrollTop() > 70;
    $(window).scroll(() => {
      this.header2Visible = $(window).scrollTop() > 70;
    });
    // console.log(this.$root.$children[0].$refs.mainScroll.wrap);
    this.ShowPage = true;
   
    this.$nextTick(function () {
      document.addEventListener(
        "scroll",
        this.onScroll()
      );
    });
    document.title = 
    `How to find products? Find products in ${this.$root.$children[0].pName.a} Products Market! Dropshipping from Worldwide to Worldwide! :: ${this.$root.$children[0].baseUrl == '/my' ? 'GoDropShipping':'OurMall DropShipping'} App`;
  },
  methods: {
    getMenu(){
      if(this.setting.header.activeMenu){ //有启用头部菜单
        this.setting.menu.forEach((item) => {
          if (item.id == this.setting.header.activeMenu) {
            this.headerMenu = item
          }
        })
      }
    },
    getProductCategory(){
      this.$apiCall("api.ProductCategory.findByVendorRelateCategory", {}, (r) => {
        if (r.ErrorCode == 9999) {
          this.commodityTypeAllList = r.Data.Results;
          this.commodityTypeMoreList = r.Data.Results.slice(9,r.Data.Results.length);
          this.commodityTypeAllList.forEach((item, index) => {
            this.getPro(item.id, index);
          });
        }
      });
    },
    // getCategory() {
    //   this.$apiCall("api.VendorShop.getAllCategorys", {}, (r) => {
    //     if (r.ErrorCode == 9999) {
    //       this.commodityTypeAllList = r.Data.Results;
    //       this.commodityTypeMoreList = r.Data.Results.slice(9,r.Data.Results.length)
    //       this.getItems();
    //     }
    //   });
    // },
    openDialogProductForm(){
      this.dialogProductForm = JSON.parse(this.dialogProductFormDefault)
      this.dialogProductForm.isShow = true;
    },
    saveNewPSD(){
      //保存新密码
      if(!this.dialogForgotPsd.email){
        this.$message({ message: 'Email must be filled in', type: "error" });
        return;
      }
      if(!this.dialogForgotPsd.captcha){
        this.$message({ message: 'CAPTCHA must be filled in', type: "error" });
        return;
      }
      if(!this.dialogForgotPsd.password){
        this.$message({ message: 'New password must be filled in', type: "error" });
        return;
      }
      if(this.dialogForgotPsd.password != this.dialogForgotPsd.rePassword){
        this.$message({ message: 'The new password and confirm password must be the same', type: "error" });
        return;
      }
      let pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[^]{8,32}$/;
      if(!pwdRegex.test(this.dialogForgotPsd.password)){
        this.$message({ message: 'The password must contain letters, and numbers, Minimum 8 characters', type: "error" });
        return;
      }
      this.dialogForgotPsd.loading = true;
      this.$apiCall( "api.User.resetPassword",{
        mobile: this.dialogForgotPsd.email,
        token : this.dialogForgotPsd.captcha,
        newPassword: this.dialogForgotPsd.password,
        repeatNewPassword: this.dialogForgotPsd.rePassword,
      }, r => {
        this.dialogForgotPsd.loading = false;
        if(r.ErrorCode == 9999){
          this.$message({ message: 'Password reset successful', type: "success" });
          this.openSingIn(this.dialogForgotPsd.email, this.dialogForgotPsd.password)
        }else{
          this.$message({ message: r.Message, type: "error" });
        }
      })

    },
    openForgotPS(){
      //打开忘记密码
      this.dialogSignin.isShow = false;
      this.dialogForgotPsd = JSON.parse(this.dialogForgotPsdDefault)
      this.dialogForgotPsd.isShow = true;
    },
    signIn(){
      //登录
      if(!this.dialogSignin.email){
        this.$message({ message: 'Email must be filled in', type: "error" });
        return;
      }
      if(!this.dialogSignin.password){
        this.$message({ message: 'Password must be filled in', type: "error" });
        return;
      }
      this.$Burying({
        object: '1002',
      })
      this.dialogSignin.loading = true;
      this.$apiCall("api.User.login", {
        username: this.dialogSignin.email,
        password: this.dialogSignin.password,
        type: 1,
        lang: "EN",
      }, r => {
        this.dialogSignin.loading = false;
        if (r.ErrorCode == 9999) {
          if(!localStorage.getItem("c_ourMallFirstLogin")){
            localStorage.setItem("c_ourMallFirstLogin",1);
          }else{
            localStorage.setItem("c_ourMallFirstLogin",2);
          }
          localStorage.setItem( "apiUserToken",r.Data.Results.apiUserToken);
          localStorage.setItem("c_apiUserId", r.Data.Results.id);
          localStorage.setItem("c_ourMallUserInfo",JSON.stringify(r.Data.Results));
          this.$store.commit("setUserInfo", r.Data.Results);
          this.$Burying({
            object: '1005',
          })
          if(localStorage.getItem('c_wantVisitPath')){
            this.$router.push({ path: localStorage.getItem('c_wantVisitPath') });
          }else{
            this.$router.push({ name: "dashboard" });
          }
          this.dialogSignin.isShow = false;
        }else{
          this.$message({ message: r.Message, type: "error" });
          this.$Burying({
            object: '1006',
          })
        }
      })
    },
    register(){
      //注册
      if(!this.dialogSignup.email){
        this.$message({ message: 'Email must be filled in', type: "error" });
        return;
      }
      if(!this.dialogSignup.captcha){
        this.$message({ message: 'CAPTCHA must be filled in', type: "error" });
        return;
      }
      if(!this.dialogSignup.password){
        this.$message({ message: 'Password must be filled in', type: "error" });
        return;
      }
      if(this.dialogSignup.password != this.dialogSignup.rePassword){
        this.$message({ message: 'The password and confirm password must be the same', type: "error" });
        return;
      }
      let pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[^]{8,32}$/;
      if(!pwdRegex.test(this.dialogSignup.password)){
        this.$message({ message: 'The password must contain letters, and numbers, Minimum 8 characters', type: "error" });
        return;
      }

      //注册
      this.$Burying({
        object: '2001'
      })
      this.dialogSignup.loading = true;
      this.$apiCall('api.User.register', {
        username: this.dialogSignup.email,
        password: this.dialogSignup.password,
        code: this.dialogSignup.captcha,
        type: 1,
        lang: "EN",
        }, r => {
          this.dialogSignup.loading = false;
          if(r.ErrorCode == '9999'){
            this.openSingIn(this.dialogSignup.email, this.dialogSignup.password)
            this.$Burying({
              object: '2004'
            })
          }else{
            this.$message({ message: r.Message, type: "error" });
            this.$Burying({
              object: '2005'
            })
          }
        })
    },
    resetSEC(type){ //验证码开始计时
      this.emailCountDownSec[type] = 60;
      this.emailCountDown(type);
    },
    emailCountDown(type){ //验证码定时器
      clearInterval(this.emailCountDownTime[type])
      this.emailCountDownTime[type] = setInterval(
        () => {
          this.emailCountDownSec[type] --
          if(this.emailCountDownSec[type] < 1){
            clearInterval(this.emailCountDownTime[type])
            if(type == 'signup'){
              this.$refs.dialogSingUp.$refs.verify.reset();
            }else if(type == 'forgot'){
              this.$refs.dialogForgotPsd.$refs.verify.reset();
            }  
          }
        },1000) 
    },
    openSingUp(){ //打开注册
      this.$Burying({
        object: '1003'
      })
      this.dialogSignin.isShow = false;
      let username = ''
      if(this.emailCountDownSec.signup){
        username = this.dialogSignup.email
      }
      this.dialogSignup = JSON.parse(this.dialogSignupDefault)
      this.dialogSignup.email = username;
      this.dialogSignup.isShow = true;
    },
    openSingIn(user, psd){ //打开登录
      this.$Burying({
        object: '1001'
      })
    this.dialogSignup.isShow = false;
    this.dialogForgotPsd.isShow = false;
    this.dialogSignin = JSON.parse(this.dialogSigninDefault);
    this.dialogSignin.isShow = true;
    if(user)
      this.dialogSignin.email = user;
    if(psd)
      this.dialogSignin.password = psd;  
    },
    selectPlatform(p){
      this.activePlatform = p;
    },
    handleCommand(command) {
      switch (command) {
        case "exit":
          this.$Logout("/");
          break;
        case "profile":
          this.$router.push({ name: "profile" });
          break;
        case "dashboard":
          // this.$router.push({ name: "dashboard" });
          if(this.c_apiShopId == 1105) {
            let isValidationCW = JSON.parse(localStorage.getItem('isValidationCW'))
            // console.log(isValidationCW)
            if (!isValidationCW) {
              this.isValidationCWDialog = true
              return
            } 
          }
          this.$router.push({
            name: "dashboard",
          });
          break;
      }
    },
    storeInput(val) {
      let codeReg = new RegExp("[A-Za-z0-9-_]+"), //正则 英文+数字；
        len = val.length,
        str = "";
      for (var i = 0; i < len; i++) {
        if (codeReg.test(val[i])) {
          str += val[i];
        }
      }
      this.shopUrl = str;
    },
     getLoginStatus() {
      this.$apiCall(
        "api.ShopifyAccount.getShopAuthStatus",
        {
          shopUrl: this.shopUrl
        },
        r => {
          if (r.ErrorCode == "9999") {
            if (r.Data.Results.status) {
              clearInterval(this.time);
              if (r.Data.Results.status == 1) {
              	if(!localStorage.getItem("c_ourMallFirstLogin")){
				      		localStorage.setItem("c_ourMallFirstLogin",1);
				      	}else{
				      		localStorage.setItem("c_ourMallFirstLogin",2);
				      	}
                localStorage.setItem("c_apiUserId", r.Data.Results.userInfo.id);
                localStorage.setItem("c_apiUserToken",
                  r.Data.Results.userInfo.apiUserToken
                );
                localStorage.setItem("c_ourMallUserInfo",
                  JSON.stringify(r.Data.Results.userInfo)
                );
                this.$store.commit("setUserInfo", r.Data.Results.userInfo);
                this.$router.push({name: 'findProducts', query:this.$route.query})
                
                this.win.close();
              } else {
                this.loginLoading = false;
                this.$elementMessage(r.Data.Results.errorMessage, "error");
                setTimeout(()=>{
                  window.location.reload();
                },1000)
                this.win.close();
              }
            }
          } else {
            clearInterval(this.time);
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    closeLogin(){
    this.shopUrl ='';
    this.loginLoading = false;
    },
    goLogin() {
      if (!this.shopUrl) {
        this.$elementMessage("Please enter Shopify store name", "error");
        return false;
      }
      this.win = window.open("/blank.html", "Shopify");
      this.loginLoading = true;
      this.$apiCall(
        "api.ShopifyAccount.addShopifyAccount",
        {
          shopUrl: this.shopUrl,
          getAuth: 1,
          ivc:localStorage.getItem('c_ivc') ? localStorage.getItem('c_ivc') : '',
          utmSource:localStorage.getItem('c_utm'),
        },
        r => {
          if (r.ErrorCode == "9999") {
            this.win.location = r.Data.Results;
            this.time = setInterval(() => {
              this.getLoginStatus();
            }, 2000);
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    login() {
      if (localStorage.getItem("c_ourMallUserInfo")) {
        this.$router.push({ name: "dashboard" });
      } else {
        this.openSingIn();
      }
    },
    selectLogin(p){
      this.activePlatform = p;
      this.gotoLogin();
    },
    gotoLogin() {
      if (!this.shopUrl) {
        this.$elementMessage("Please enter Shopify store name", "error");
        return false;
      }
      if (localStorage.getItem("c_ourMallUserInfo")) {
        this.$router.push({
          name: "stores",
          params: { add: true, val: this.shopUrl },
        });
      } else {
        this.$router.push({ name: "login", params: { shopUrl: this.shopUrl } });
      }
    },
    goMore(id, name) {
      this.$Burying({
        object: '3012',
        objectId: `${id}`
      })
      if (id != "go") {
        id = id;
      } else {
        id = this.categoryId;
        name = this.titName;
      }
      this.$router.push({
        path: `/category/${id}/${name.replace(/\s+/g,"-")}.html`
      })
    },
    jumpToDetail(item, e){
      console.log(item, e)
    },
    import_pro(item, e) {
      if(!this.$store.state.userInfo){
        this.$root.$children[0].openDialogLogin();
        return;
      }
      this.loading = true;
      this.$apiCall(
        "api.Product.addFromVendorShopProduct",
        {
          id: item.id,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            item.hasImport = 1;
            item.imports++;
            this.$root.$children[0].importNum++;
            this.commodityTypeAllList = [...this.commodityTypeAllList];
            this.loading = false;
            // this.$router.push({name: 'findProducts', query:this.$route.query})
            this.$message.success("Import Success !");
          } else {
            this.$message.error(r.Message);
          }
        }
      );
    },
    search() {
      this.$Burying({
        object: '3004',
        objectId: `input: ${this.input}, select: ${this.select}`
      })
      this.commodityTypeMoreList.forEach((item) => {
        if (item.id == this.select) {
          this.name = item.name;
        }
      });
      if(!this.select){
        this.$router.push({
        path: `/category/ALL-CATEGORIES/${this.input}.html`,
        query:{
          input:this.input,
          search:true
        }
      });
      }else{
        this.$router.push({
        path: `/category/${this.select}/${this.input}.html`,
        query:{
          input:this.input,
          search:true
        }
      });
      }
    },
    selectedCommodityType({ id, name, index }) {
      this.$Burying({
        object: '5001',
        objectId: id
      })
      if (this.commodityType === index) {
        this.commodityType = null;
        this.categoryId = null;
        this.ShowPage = true;
      } else {
        if (index == "reset") {
          this.commodityType = null;
        } else {
          this.commodityType = index;
        }
        this.categoryId = id;
        this.ShowPage = false;
        this.fullscreenLoading = true;
        this.loading = true;
        this.titName = name;
        let inner = document.getElementsByClassName("inner")[0];
        if (inner) {
          inner.scrollLeft = 0;
        }
        this.$apiCall(
          "api.VendorShop.vendorFindProducts",
          {
            categoryId: this.categoryId,
            rowsPerPage: this.rowsPerPage,
            page: this.page,
            status:1
          },
          (r) => {
            if (r.ErrorCode == 9999) {
              this.productList = r.Data.Results;
              this.loading = false;
              this.fullscreenLoading = false;
            }
          }
        );
      }
    },
    getPro(id, index) {
      this.fullscreenLoading = true;
      this.loading = true;
      this.$apiCall(
        "api.VendorShop.vendorFindProducts",
        {
          categoryId: id,
          rowsPerPage: this.rowsPerPage,
          page: this.page,
          status:1
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            // this.productList = r.Data.Results;
            this.commodityTypeAllList[index].proList = r.Data.Results;
            this.commodityTypeAllList = [...this.commodityTypeAllList];
            this.fullscreenLoading = false;
            this.loading = false;
          }
        }
      );
    },
    goToDetail(item) {
      this.$Burying({
        object: '3011',
        objectId: item.id
      })
      window.open(`/item/${item.id}/${item.name.replace(/\s+/g,"-").replace(/\//g,'_')}.html`)
      // this.$router.push({
      //   path: `/item/${item.id}/${item.name.replace(/\s+/g,"-").replace(/\//g,'_')}.html`,
      // })
    },

    // 获取滚动条当前的位置
    getScrollTop() {
      let scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      return scrollTop;
    },
    // 获取当前可视范围的高度
    getClientHeight() {
      let clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      } else {
        clientHeight = Math.max(
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      }
      return clientHeight;
    },

    // 获取文档完整的高度
    getScrollHeight() {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
    },
    // 滚动事件触发下拉加载
    onScroll() {
      console.log(
        this.getScrollHeight(),
        this.getClientHeight(),
        this.getScrollTop()
      );
      if (
        this.getScrollHeight() - this.getClientHeight() - this.getScrollTop() <=
        0
      ) {
        if (this.status && this.status <= 5) {
          // 调用请求函数
          this.getPro(this.commodityTypeAllList[this.status].id, this.status);
          this.getPro(
            this.commodityTypeAllList[this.status + 1].id,
            this.status + 1
          );
          this.status++;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.home-page {
  max-width: 1920px;
  width: 100%;
  background-color: #fff;
}

</style>

<style scoped lang="scss">
.importBut{
  width: 206px;
  height: 40px;
  border-radius: 2px;
}
.pagetitle{
  justify-content: flex-start;
  ::v-deep .el-input__inner {
    border-radius: 0 !important;
  }
  ::v-deep .el-input__inner:last-child {
    background-image: url('../../public/images/productShop/search.png') !important;
    background-repeat: no-repeat;
    background-position: 20px center;
    background-color: #fff;
    background-size: 20px 20px;
    padding-left: 50px;
  }
}

.find-product{
  margin: 70px auto 0;
  width: 1200px;
  padding: 15px 0;
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
.more-dropdown {
  height: 30vh;
  overflow-y: auto;
}
ul,
li {
  list-style: none;
  margin-bottom: 0 !important;
}
h1 {
  margin: 40px 0 20px;
  font-size: 20px;
  font-weight: bold;
}

.el-select {
  width: 180px;
}
.el-select .el-input {
  width: 180px;
}
.input-with-select{
   min-width: 550px;
   flex:1;
  .el-input-group__prepend {
    background-color: #ccc;
  }
 
} 

.head_tit {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.more{
  font-size: 18px; 
  font-weight: 500;
  padding: 40px 0 20px;
  color: #525FB0;
  cursor: pointer;
}

.commodity-type-wrapper {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  min-width: 1065px;
  .type-item {
    margin-left: 10.5px;
    flex: 0 0 19.3%;
    margin-top: 5px;
    height: 60px;
    display: flex;
    align-items: center;
    border: 1px solid #e8e8e8;
    background: #FFFFFF;
    box-shadow: 0px 2px 9px 0px rgba(180, 180, 180, 0.5);
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    z-index: 0;
    padding: 10px 30px;
    &.selected {
      border: 2px solid #5c6ac4;
      z-index: 1;
      .iconfont {
        color: #5c6ac4;
      }
      .type-text {
        color: #5c6ac4;
      }
    }
    &:hover {
      .type-text {
        color: #5c6ac4;
      }
      .iconfont {
        color: #5c6ac4;
      }
    }
  }
  .type-item:nth-child(6),.type-item:first-child{
    margin-left: 0;
  }
  .type-icon {
    margin-right: 10px;
    .iconfont {
      font-size: 32px;
      color: #909399;
    }
  }
  .type-text {
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .type-item-more {
    display: flex;
    align-items: center;
    .type-text {
      color: #303133;
    }
  }
}
.pro_box {
  width: 228px;
  position: relative;
  background: #FFFFFF;
  box-shadow: 0px 2px 9px 0px rgba(180, 180, 180, 0.5);
  border-radius: 2px;
}
.pro_list {
  width: 1200px;
  padding: 0;
  display: flex;
  // justify-content: space-between;
  font-weight: 500;
  li {
    width: 228px;
    margin-right: 15px;
    .pro_img {
      width: 100%;
      position: relative;
      img {
        width: 100%;
        height: 194px;
        object-fit: cover;
        cursor: pointer;
      }
    }
    

    .pro_name {
      height: 40px;
      cursor: pointer;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      a{
        color: #333333;
      }
    }
    // .pro_name:hover {
    //   text-decoration: underline;
    //   color: #428bc5;
    // }
    .pro_cost {
      padding: 12px 0;
      font-size: 14px;
      color: #5c6ac4;
    }
  }
}
.imports {
  display: flex;
  justify-content: space-between;
  color: rgb(144, 147, 153);
  font-size: 14px;
}
</style>
<style lang="scss" scoped>
.search-but{
    width: 208px;
    height: 40px;
    background: linear-gradient(213deg, #6995F1 0%, #525FB0 100%);
    border-radius: 0px 4px 4px 0px;
    color: #fff;
    text-align: center;
    line-height: 40px;
    font-weight: 700;
    cursor: pointer;
}
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
.el-backtop{
  right: 32px !important;
  transform: none;
}
</style>
