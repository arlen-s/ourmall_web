<template>
  <div class="home-page">
   <!-- <homeHeader ref="homeHeader"/> -->
	<template v-if="code && code.header && code.header.length > 0">
		<div v-for="(item, index) in code.header" :key="index" v-html="item"></div>
	</template>
	<div style="position: relative;height: 120px;">
		   <DHeader :data="setting && setting.header || ''" :headerMenu="headerMenu"/>
	</div>
    <div>
      <div class="contentpanel box" v-loading="allLoading">
        <div class="pagetitle" ref="pageHeader" style="padding-right:0">
            <div style="width:100%" class="d-flex">
              <el-select
                  style="width:264px;margin-right:-1px"
                  v-model="categoryId"
                  slot="append"
                  placeholder="IN ALL CATEGORIES"
                >
                  <el-option label="IN ALL CATEGORIES" value=""></el-option>
                  <el-option
                      v-for="item in commodityTypeMoreList"
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
        <!-- 面包屑 -->
        <div class="pagetitle">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/products-market' }"
              >{{$root.$children[0].pName.a}} Products Market</el-breadcrumb-item
            >
            <el-breadcrumb-item v-if="activeCategory.l1">
              <a v-if="activeCategory.L > 1" @click="gotoCategory(1)">
              {{ activeCategory.l1.name }}
            </a>
            <a v-else href="javascript:;">{{ activeCategory.l1.name }}</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="activeCategory.l2">
              <a v-if="activeCategory.L > 2" @click="gotoCategory(2)">
              {{ activeCategory.l2.name }}
            </a>
            <a v-else href="javascript:;">{{ activeCategory.l2.name }}</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="activeCategory.l3">
              <a href="javascript:;">{{ activeCategory.l3.name }}</a>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 列表 -->
        
      <div style="display:flex;width:100%">
        <Categories :categories="commodityTypeMoreList" />
        <div v-if="items && items.length == 0" style="flex:1">
          <el-card class="mg-l-20" style="width:auto">
            <div class="noProduct">
              <img src="../../public/images/productShop/none.png">
              <b class="mg-t-10">There are no products in this category</b>
            </div>
          </el-card>
        </div>
        <div v-loading="loading"  style="flex:1" v-else>
          <div class="list">
            
               <div class="pro_box" v-for="item in items"
              :key="item.id"
              style="margin-bottom: 20px">
                      <div class="pro_img" style="height:194px">
                    <el-image
                      
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
          </div>
        </div>
        </div>
      </div>
      <el-row v-if="items.length" :gutter="20" style="margin: 20px 0">
        <el-col :span="24" class="d-flex justify-content-center">
          <div>
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
      <div
        class="ball"
        :style="{
          top: `${ball.y}px`,
          left: `${ball.x}px`,
          opacity: ball.opacity,
        }"
      ></div>
      <el-backtop
      class="goto-top"
      :right="32"
      :bottom="120"
    >
    </el-backtop>
    </div>
   <!-- <Footer /> -->
	<DFooter :setting="$store.state.configJson && $store.state.configJson.footer || ''"/>
	<template v-if="code && code.footer && code.footer.length > 0">
		<div v-for="(item, index) in code.footer" :key="index" v-html="item"></div>
	</template>
     <el-dialog
      :visible.sync="centerDialogVisible"
      @close="closeLogin"
        width="30%" 
       center >
    <div class="login-page">
     <div class="login-box">
      <div class="box mg-b-5">
        <p>Please enter your shopify store name to connect the dashboard page:</p>
        <div class=" mg-b-30">
          <input
            type="text"
            placeholder="Shopify store name"
            @input="storeInput($event.target.value)"
            v-model="shopUrl"
            @keyup.enter="goLogin"
          >
          <span>.myshopify.com</span>
        </div>
        <div>
          <el-button
            class="login-btn"
            :loading="loginLoading"
            @click="goLogin"
          >{{loginLoading ? 'Please Wait' : 'LOGIN'}}</el-button>
        </div>
      </div>
     </div>
    </div>
</el-dialog>
  </div>
</template>

<script>
import homeHeader from '@/components/Home/Header-v2'
import Footer from "./../components/PageFooter2"
import Categories from "./../components/categories"
import DHeader from '@/views/homePage/components/header'
import DFooter from '@/views/homePage/components/footer'
export default {
  props: {},
  data() {
    return {
		setting: null,
    headerMenu:[],
		code: {
			header: [],
			footer: []
		},
      nameS:'',
      header2Visible: false,
      time: 0,
      loginLoading:false,
      shopUrl: "",
      categoryId: null,
      centerDialogVisible:false,
      name: "",
      items: [],
      commodityTypeMoreList: [],
      page: this.$route.query.page ? Number(this.$route.query.page) : "1",
      rowsPerPage: localStorage.getItem("c_importPerPage")
        ? Number(localStorage.getItem("c_importPerPage"))
        : 12,
      pageSizes: [12, 24, 48],
      total: 0,
      totalPage: 0,
      input: "",
      content: "",
      loading: true,
      allLoading: true,
      ball: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        opacity: 0,
      },
    };
  },
  computed: {
    product() {
      let text = "";
      this.commodityTypeMoreList.forEach((item) => {
        if (item.id == this.categoryId) {
          text = item.name;
        }
      });
      return text;
    },
  activeCategory() {
      if (!this.commodityTypeMoreList) {
        return false;
      }
      if (this.$route.params.id == "0") {
        return {
          L: 1,
          l1: {
            id: 0,
            name: "All Categories",
          },
          l2: undefined,
          l3: undefined,
        };
      }
      let L, l1, l2, l3;
      if (this.commodityTypeMoreList && this.commodityTypeMoreList.length) {
        this.commodityTypeMoreList.some((e) => {
          if (e.id == this.$route.params.id) {
            L = 1;
            l1 = e;
            return true;
          }
          if (e.list) {
            e.list.some((s) => {
              if (s.id == this.$route.params.id) {
                L = 2;
                l1 = e;
                l2 = s;
                return true;
              }
              if (s.list) {
                s.list.some((ss) => {
                  if (ss.id == this.$route.params.id) {
                    L = 3;
                    l1 = e;
                    l2 = s;
                    l3 = ss;
                    return true;
                  }
                });
              }
            });
          }
        });
      }
      return {
        L,
        l1,
        l2,
        l3,
      };
    },
  },
  beforeDestroy(){
    clearInterval(this.time);
  },   
  created() {
  	this.setting = localStorage.getItem("c_shopConfigJson") ? JSON.parse(localStorage.getItem("c_shopConfigJson")) : null;
  	if(!this.setting || !this.setting.customCode || !this.setting.customCode.length) return;
  	this.setting.customCode.forEach((item) => {
  		if (item.pages.includes('搜索结果页')) {
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
    if(this.$root.$children[0].getParentUrl() && this.$root.$children[0].getParentUrl().indexOf("vendor") >= 0) {
		}else{
			this.$root.$children[0].checkLogin();
		}
    this.header2Visible = $(window).scrollTop() > 70;
    $(window).scroll(() => {
      this.header2Visible = $(window).scrollTop() > 70;
    });
    if(this.$route.query.search){
      this.categoryId = this.$route.params.id;
    }
    this.input = this.$route.query.input;
    this.content = this.input;
    this.getCategory();
    document.title = `${this.$route.params.name.replace('.html','')} How to find :: ${this.$root.$children[0].pName.b} - Easy Dropshipping`;
  },
  components:{
    homeHeader,
    Footer,
    Categories,
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
    $route: "gotoPage",
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
    gotoCategory(i) {
      if (i == 1) {
        this.$router.push(
          `/category/${
            this.activeCategory.l1.id
          }/${this.activeCategory.l1.name.replace(/\s+/g, "-")}.html`
        );
      } else {
        this.$router.push(
          `/category/${
            this.activeCategory.l2.id
          }/${this.activeCategory.l2.name.replace(/\s+/g, "-")}.html`
        );
      }
    },
    // 登录
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
                this.$router.push({name: 'more', query:this.$route.query})
                
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
    closeLogin(){
    this.shopUrl ='';
    this.loginLoading = false;
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
          this.$router.push({ name: "dashboard" });
          break;
      }
    },
    login() {
      if (localStorage.getItem("c_ourMallUserInfo")) {
        this.$router.push({ name: "dashboard" });
      } else {
        this.$router.push({ name: "login" });
      }
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
    getCategory() {
      this.$apiCall("api.ProductCategory.findByVendorRelateCategory", {}, (r) => {
        if (r.ErrorCode == 9999) {
          this.commodityTypeMoreList = r.Data.Results;
          this.getItems();
        }
      });
    },
    getItems() {
      this.loading = true;
      this.allLoading = true;
      if(this.categoryId == "ALL-CATEGORIES"){
        this.categoryId = ''
      }
      this.commodityTypeMoreList.forEach((item) => {
        if (item.name == this.categoryId) {
          this.categoryId = item.id;
        }
      });
      this.$apiCall(
        "api.VendorShop.vendorFindProducts",
        {
          name: this.input,
          categoryId: this.$route.params.id,
          page: this.page,
          rowsPerPage: this.rowsPerPage,
          status:1
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            this.commodityTypeMoreList.forEach((item) => {
              if (item.id == this.categoryId) {
                this.name = item.name;
                this.categoryId = item.name;
              }
            });
            this.items = r.Data.Results;
            this.total = r.Data.Pagination.totalCount;
            this.totalPage = r.Data.Pagination.totalPage;
            this.allLoading = false;
            this.loading = false;
            document.body.scrollTop = document.documentElement.scrollTop = 0;
          } else {
            this.allLoading = false;
            this.$elementMessage(r.Message, 'error')
          }
        }
      );
    },
    search() {
      this.content = this.input;
      // if(this.categoryId)
      this.commodityTypeMoreList.forEach((item) => {
            if (item.name == this.categoryId) {
              this.nameS = item.id;  
            }
        });
      if(!this.nameS){
        this.nameS = this.categoryId;
      }
      if(this.categoryId == ''){
        this.$router.push({
        path: `/category/ALL-CATEGORIES/${this.content}.html`,
        query:{
          input:this.content,
          search:true
        }
      });
      }else{
        this.$router.push({
        path: `/category/${this.nameS}/${this.content}.html`,
        query:{
          input:this.content
        }
      });
      }
      this.page = 1;
      // this.categoryId = this.nameS;
      this.nameS = '';
    },
    changePageSize(val) {
      this.rowsPerPage = val;
      localStorage.setItem("c_importPerPage", val);
      this.getItems();
    },
    gotoPage() {
      this.page = this.$route.query.page ? this.$route.query.page : 1;
      // this.categoryId = this.$route.params.id;
      this.input = this.$route.query.input;
      this.getItems();
    },
    toPage(val) {
      if (val != this.$route.query.page) {
        let query = {};
        let id = '';
      //    this.commodityTypeMoreList.forEach((item) => {
      //   if (item.name == this.categoryId) {
      //     id = item.id;
      //   }
      // });
        id = this.$route.params.id
        query.page = val;
        query.input = this.content
      if(this.categoryId == ''){
        this.$router.push({
        path: `/category/ALL-CATEGORIES/.html`,
        query,
      })
      }else{
        // this.categoryId.replace(/\s+/g,"-")
        this.$router.push({
          path: `/category/${id}/${this.$route.params.name}`,
          query,
        });
      }
      }
    },
    goToDetail(item){
      window.open(`/item/${item.id}/${item.name.replace(/\s+/g,"-").replace(/[^\w]/g,'_')}.html`)
    },
    import_pro(item, e) {
      if(!this.$store.state.userInfo){
        this.$root.$children[0].openDialogLogin();
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
            this.$root.$children[0].importNum++;
            this.$message.success("Import Success !");
          } else {
            this.$message.error(r.Message);
          }
        }
      );
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
.contentpanel.box{
  margin: 70px auto 0;
  width: 1300px;
  padding: 15px 0;
  .pagetitle{
  justify-content: flex-start;
}
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
.list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.box {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.el-card {
  width: 100%;
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
  width: 23%;
  font-weight: 500;
  margin-left: 2%;
  position: relative;
  background: #FFFFFF;
  box-shadow: 0px 2px 9px 0px rgba(180, 180, 180, 0.5);
  border-radius: 2px;
}
.pro_name {
  height: 40px;
  cursor: pointer;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  a{
    color: #333333;
  }
}
.pro_cost {
    padding: 12px 0;
    font-size: 14px;
    color: #5c6ac4;
  }

.imports {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: rgb(144, 147, 153);
}
.importBut{
  width: 206px;
  height: 40px;
  border-radius: 2px;
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
.pagetitle{
  width: 100%;
  justify-content: flex-start;
  /deep/ .el-input__inner {
    border-radius: 0 !important;
  }
  /deep/ .el-input__inner:last-child {
    background-image: url('../../public/images/productShop/search.png') !important;
    background-repeat: no-repeat;
    background-position: 20px center;
    background-color: #fff;
    background-size: 20px 20px;
    padding-left: 50px;
  }
}
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
.commodity-type-wrapper {
  display: flex;
  flex-wrap: wrap;
  .type-item {
    flex: 0 0 20%;
    height: 60px;
    display: flex;
    align-items: center;
    border: 1px solid #e8e8e8;
    // box-sizing: border-box;
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
}
.noProduct{
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:60px;
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
.el-backtop{
  right: 32px !important;
  transform: none;
}
ul,li{
  list-style: none;
}
.headerNav {
    background: #fff;
    position: absolute;
    top: 58px;
    left: -40px;
    padding: 15px 0;
    border-radius: 5px;
    z-index: 201;
    width: fit-content;
    box-shadow: 0px 0px 29px -17px rgba(0,0, 0,.57);
    text-align: left;
    box-sizing: content-box;
}
.headerNav .firstMenu {
    position: relative;
    width: 254px;
    padding-left: 22px;
    height: 34px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 34px;
}
.headerNav .firstMenu .align-category {
    display: flex;
    align-items: center;
}
</style>

