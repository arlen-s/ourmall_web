(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["storesMore"],{2314:function(t,e,a){t.exports=a.p+"img/none.56197834.png"},"2dd8":function(t,e,a){"use strict";a("b983")},3032:function(t,e,a){"use strict";a("841d")},3252:function(t,e,a){},"67e5":function(t,e,a){"use strict";a("8e64")},"6ade":function(t,e,a){"use strict";a("3252")},"6afc":function(t,e,a){},"841d":function(t,e,a){},"8e64":function(t,e,a){},9547:function(t,e,a){"use strict";a("d975")},9978:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"home-page"},[t.code&&t.code.header&&t.code.header.length>0?t._l(t.code.header,(function(e,a){return o("div",{key:a,domProps:{innerHTML:t._s(e)}})})):t._e(),o("div",{staticStyle:{position:"relative",height:"120px"}},[o("DHeader",{attrs:{data:t.setting&&t.setting.header||"",headerMenu:t.headerMenu}})],1),o("div",[o("div",{directives:[{name:"loading",rawName:"v-loading",value:t.allLoading,expression:"allLoading"}],staticClass:"contentpanel box"},[o("div",{ref:"pageHeader",staticClass:"pagetitle",staticStyle:{"padding-right":"0"}},[o("div",{staticClass:"d-flex",staticStyle:{width:"100%"}},[o("el-select",{staticStyle:{width:"264px","margin-right":"-1px"},attrs:{slot:"append",placeholder:"IN ALL CATEGORIES"},slot:"append",model:{value:t.categoryId,callback:function(e){t.categoryId=e},expression:"categoryId"}},[o("el-option",{attrs:{label:"IN ALL CATEGORIES",value:""}}),t._l(t.commodityTypeMoreList,(function(t){return o("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],2),o("el-input",{staticClass:"input-with-select",attrs:{placeholder:"Search products"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}}),o("div",{staticClass:"search-but",on:{click:function(e){return t.search()}}},[t._v(" SEARCH ")])],1)]),o("div",{staticClass:"pagetitle"},[o("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[o("el-breadcrumb-item",{attrs:{to:{path:"/products-market"}}},[t._v(" Products Market")]),t.activeCategory.l1?o("el-breadcrumb-item",[t.activeCategory.L>1?o("a",{on:{click:function(e){return t.gotoCategory(1)}}},[t._v(" "+t._s(t.activeCategory.l1.name)+" ")]):o("a",{attrs:{href:"javascript:;"}},[t._v(t._s(t.activeCategory.l1.name))])]):t._e(),t.activeCategory.l2?o("el-breadcrumb-item",[t.activeCategory.L>2?o("a",{on:{click:function(e){return t.gotoCategory(2)}}},[t._v(" "+t._s(t.activeCategory.l2.name)+" ")]):o("a",{attrs:{href:"javascript:;"}},[t._v(t._s(t.activeCategory.l2.name))])]):t._e(),t.activeCategory.l3?o("el-breadcrumb-item",[o("a",{attrs:{href:"javascript:;"}},[t._v(t._s(t.activeCategory.l3.name))])]):t._e()],1)],1),o("div",{staticStyle:{display:"flex",width:"100%"}},[o("Categories",{attrs:{categories:t.commodityTypeMoreList}}),t.items&&0==t.items.length?o("div",{staticStyle:{flex:"1"}},[o("el-card",{staticClass:"mg-l-20",staticStyle:{width:"auto"}},[o("div",{staticClass:"noProduct"},[o("img",{attrs:{src:a("2314")}}),o("b",{staticClass:"mg-t-10"},[t._v("There are no products in this category")])])])],1):o("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{flex:"1"}},[o("div",{staticClass:"list"},t._l(t.items,(function(e){return o("div",{key:e.id,staticClass:"pro_box",staticStyle:{"margin-bottom":"20px"}},[o("div",{staticClass:"pro_img",staticStyle:{height:"194px"}},[o("el-image",{staticStyle:{position:"absolute",width:"100%",cursor:"pointer",height:"100%"},attrs:{fit:"contain",src:e.imgUrl},on:{click:function(a){return t.goToDetail(e)}}})],1),o("div",{staticStyle:{padding:"16px 10px"}},[o("div",{staticClass:"pro_name",on:{click:function(a){return t.goToDetail(e)}}},[o("a",{attrs:{href:"javascript:;"}},[t._v(t._s(e.name))])]),o("b",{staticClass:"pro_cost"},[t._v(t._s(t.$showSybmol())+" "+t._s(t.$exchangeRate(e.minPrice))+"~"+t._s(t.$exchangeRate(e.maxPrice)))]),o("div",{staticStyle:{display:"flex",width:"100%","justify-content":"center","margin-top":"12px"}},[o("el-dropdown",[o("el-button",{attrs:{type:"primary"}},[t._v(" Add to Import List"),o("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),o("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[o("el-dropdown-item",{staticClass:"importBut",attrs:{disabled:1==e.hasImport},nativeOn:{click:function(a){return t.import_pro(e,a)}}},[t._v("Add to Import List")]),o("el-dropdown-item",{nativeOn:{click:function(a){return t.goToDetail(e)}}},[t._v("Add to Cart")])],1)],1)],1)])])})),0)])],1)]),t.items.length?o("el-row",{staticStyle:{margin:"20px 0"},attrs:{gutter:20}},[o("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[o("div",[o("el-pagination",{attrs:{"current-page":Number(t.page),background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":t.pageSizes,"page-size":t.rowsPerPage,total:Number(t.total)},on:{"current-change":t.toPage,"size-change":t.changePageSize}})],1)])],1):t._e(),o("div",{staticClass:"ball",style:{top:t.ball.y+"px",left:t.ball.x+"px",opacity:t.ball.opacity}}),o("el-backtop",{staticClass:"goto-top",attrs:{right:32,bottom:120}})],1),o("DFooter",{attrs:{setting:t.$store.state.configJson&&t.$store.state.configJson.footer||""}}),t.code&&t.code.footer&&t.code.footer.length>0?t._l(t.code.footer,(function(e,a){return o("div",{key:a,domProps:{innerHTML:t._s(e)}})})):t._e(),o("el-dialog",{attrs:{visible:t.centerDialogVisible,width:"30%",center:""},on:{"update:visible":function(e){t.centerDialogVisible=e},close:t.closeLogin}},[o("div",{staticClass:"login-page"},[o("div",{staticClass:"login-box"},[o("div",{staticClass:"box mg-b-5"},[o("p",[t._v("Please enter your shopify store name to connect the dashboard page:")]),o("div",{staticClass:" mg-b-30"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.shopUrl,expression:"shopUrl"}],attrs:{type:"text",placeholder:"Shopify store name"},domProps:{value:t.shopUrl},on:{input:[function(e){e.target.composing||(t.shopUrl=e.target.value)},function(e){return t.storeInput(e.target.value)}],keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.goLogin(e)}}}),o("span",[t._v(".myshopify.com")])]),o("div",[o("el-button",{staticClass:"login-btn",attrs:{loading:t.loginLoading},on:{click:t.goLogin}},[t._v(t._s(t.loginLoading?"Please Wait":"LOGIN"))])],1)])])])])],2)},i=[],s=(a("99af"),a("caad"),a("b0c0"),a("a9e3"),a("4d63"),a("ac1f"),a("25f0"),a("2532"),a("5319"),a("841c"),a("159b"),a("b39c")),r=a("c942"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"categories-nav",class:{more:t.showMore}},[a("h2",{attrs:{title:"ALL CATEGORIES"}},[t._v("Categories")]),a("ul",{staticClass:"c-nav"},[t._l(t.categories,(function(e,o){return[o<10||t.showMore?a("li",{key:e.id},[a("router-link",{staticClass:"c-link",attrs:{title:e.name,to:{path:"/category/"+e.id+"/"+e.name.replace(/\s+/g,"-")+".html"}},nativeOn:{click:function(a){return t.categoryRecord(e.id,e.name,1)}}},[a("div",{staticClass:"left"},[a("i",{staticClass:"c-icon",class:"c-"+e.id}),a("span",{staticClass:" tx-ellipsis1"},[t._v(t._s(e.name))])]),a("i",{staticClass:"fa fa-angle-right",staticStyle:{"margin-left":"15px"},attrs:{"aria-hidden":"true"}})]),e.list&&0!=e.list.length?a("div",{staticClass:"sub-menu"},[a("ul",{staticClass:"l1"},[t._l(e.list,(function(e){return[a("li",{key:e.id},[a("router-link",{attrs:{to:{path:"/category/"+e.id+"/"+e.name.replace(/\s+/g,"-")+".html"},title:e.name},nativeOn:{click:function(a){return t.categoryRecord(e.id,e.name,2)}}},[t._v(t._s(e.name))]),e.list&&e.list.length?a("ul",{staticClass:"l2"},t._l(e.list,(function(e){return a("li",{key:e.id},[a("router-link",{attrs:{to:{path:"/category/"+e.id+"/"+e.name.replace(/\s+/g,"-")+".html"},title:e.name},nativeOn:{click:function(a){return t.categoryRecord(e.id,e.name,2)}}},[t._v(t._s(e.name))])],1)})),0):t._e()],1)]}))],2)]):t._e()],1):t._e()]}))],2),t.categories&&t.categories.length>9?a("div",{staticClass:"more"},[a("a",{attrs:{href:"javascript:;"},on:{click:t.moreChange}},[a("i",{staticClass:"fa ",class:t.showMore?"fa-minus-square-o":"fa-plus-square-o",attrs:{"aria-hidden":"true"}}),a("span",[t._v(t._s(t.showMore?"Collapse":"More"))])])]):t._e()])},l=[],c={props:["categories"],data:function(){return{showMore:!1}},methods:{categoryRecord:function(t,e,a){localStorage.setItem("c_buryResource","category"),1==a?this.$Burying({object:"5002",objectId:t,objectUrl:e}):2==a&&this.$Burying({object:"5003",objectId:t,objectUrl:e})},moreChange:function(){this.showMore=!this.showMore}}},d=c,u=(a("9547"),a("2877")),h=Object(u["a"])(d,n,l,!1,null,"a5680c26",null),g=h.exports,p=a("8214"),m=a("d8f7"),f={props:{},data:function(){return{setting:null,headerMenu:[],code:{header:[],footer:[]},nameS:"",header2Visible:!1,time:0,loginLoading:!1,shopUrl:"",categoryId:null,centerDialogVisible:!1,name:"",items:[],commodityTypeMoreList:[],page:this.$route.query.page?Number(this.$route.query.page):"1",rowsPerPage:localStorage.getItem("c_importPerPage")?Number(localStorage.getItem("c_importPerPage")):12,pageSizes:[12,24,48],total:0,totalPage:0,input:"",content:"",loading:!0,allLoading:!0,ball:{x:window.innerWidth/2,y:window.innerHeight/2,opacity:0},c_apiShopId:JSON.parse(localStorage.getItem("c_apiShopId"))}},computed:{product:function(){var t=this,e="";return this.commodityTypeMoreList.forEach((function(a){a.id==t.categoryId&&(e=a.name)})),e},activeCategory:function(){var t,e,a,o,i=this;return!!this.commodityTypeMoreList&&("0"==this.$route.params.id?{L:1,l1:{id:0,name:"All Categories"},l2:void 0,l3:void 0}:(this.commodityTypeMoreList&&this.commodityTypeMoreList.length&&this.commodityTypeMoreList.some((function(s){if(s.id==i.$route.params.id)return t=1,e=s,!0;s.list&&s.list.some((function(r){if(r.id==i.$route.params.id)return t=2,e=s,a=r,!0;r.list&&r.list.some((function(n){if(n.id==i.$route.params.id)return t=3,e=s,a=r,o=n,!0}))}))})),{L:t,l1:e,l2:a,l3:o}))}},beforeDestroy:function(){clearInterval(this.time)},created:function(){var t=this;this.setting=localStorage.getItem("c_shopConfigJson")?JSON.parse(localStorage.getItem("c_shopConfigJson")):null,this.setting&&this.setting.customCode&&this.setting.customCode.length&&this.setting.customCode.forEach((function(e){e.pages.includes("搜索结果页")&&("底部"==e.position&&t.code.footer.push(e.desc),"顶部"==e.position&&t.code.header.push(e.desc))}))},mounted:function(){var t=this;this.$root.$children[0].getParentUrl()&&this.$root.$children[0].getParentUrl().indexOf("vendor")>=0||this.$root.$children[0].checkLogin(),this.header2Visible=$(window).scrollTop()>70,$(window).scroll((function(){t.header2Visible=$(window).scrollTop()>70})),this.$route.query.search&&(this.categoryId=this.$route.params.id),this.input=this.$route.query.input,this.content=this.input,this.getCategory(),document.title="".concat(this.$route.params.name.replace(".html","")," How to find :: ").concat(this.$root.$children[0].pName.b," - Easy Dropshipping")},components:{homeHeader:s["a"],Footer:r["a"],Categories:g,DHeader:p["a"],DFooter:m["a"]},watch:{"setting.header.activeMenu":{handler:function(){this.getMenu()},deep:!0},$route:"gotoPage"},methods:{getMenu:function(){var t=this;this.setting.header.activeMenu&&this.setting.menu.forEach((function(e){e.id==t.setting.header.activeMenu&&(t.headerMenu=e)}))},gotoCategory:function(t){1==t?this.$router.push("/category/".concat(this.activeCategory.l1.id,"/").concat(this.activeCategory.l1.name.replace(/\s+/g,"-"),".html")):this.$router.push("/category/".concat(this.activeCategory.l2.id,"/").concat(this.activeCategory.l2.name.replace(/\s+/g,"-"),".html"))},storeInput:function(t){for(var e=new RegExp("[A-Za-z0-9-_]+"),a=t.length,o="",i=0;i<a;i++)e.test(t[i])&&(o+=t[i]);this.shopUrl=o},getLoginStatus:function(){var t=this;this.$apiCall("api.ShopifyAccount.getShopAuthStatus",{shopUrl:this.shopUrl},(function(e){"9999"==e.ErrorCode?e.Data.Results.status&&(clearInterval(t.time),1==e.Data.Results.status?(localStorage.getItem("c_ourMallFirstLogin")?localStorage.setItem("c_ourMallFirstLogin",2):localStorage.setItem("c_ourMallFirstLogin",1),localStorage.setItem("c_apiUserId",e.Data.Results.userInfo.id),localStorage.setItem("c_apiUserToken",e.Data.Results.userInfo.apiUserToken),localStorage.setItem("c_ourMallUserInfo",JSON.stringify(e.Data.Results.userInfo)),t.$store.commit("setUserInfo",e.Data.Results.userInfo),t.$router.push({name:"more",query:t.$route.query}),t.win.close()):(t.loginLoading=!1,t.$elementMessage(e.Data.Results.errorMessage,"error"),setTimeout((function(){window.location.reload()}),1e3),t.win.close())):(clearInterval(t.time),t.$elementMessage(e.Message,"error"))}))},goLogin:function(){var t=this;if(!this.shopUrl)return this.$elementMessage("Please enter Shopify store name","error"),!1;this.win=window.open("/blank.html","Shopify"),this.loginLoading=!0,this.$apiCall("api.ShopifyAccount.addShopifyAccount",{shopUrl:this.shopUrl,getAuth:1,ivc:localStorage.getItem("c_ivc")?localStorage.getItem("c_ivc"):"",utmSource:localStorage.getItem("c_utm")},(function(e){"9999"==e.ErrorCode?(t.win.location=e.Data.Results,t.time=setInterval((function(){t.getLoginStatus()}),2e3)):t.$elementMessage(e.Message,"error")}))},closeLogin:function(){this.shopUrl="",this.loginLoading=!1},handleCommand:function(t){switch(t){case"exit":this.$Logout("/");break;case"profile":this.$router.push({name:"profile"});break;case"dashboard":if(121173==this.c_apiShopId){var e=JSON.parse(localStorage.getItem("isValidationCW"));if(!e)return void(this.isValidationCWDialog=!0)}this.$router.push({name:"dashboard"});break}},login:function(){localStorage.getItem("c_ourMallUserInfo")?this.$router.push({name:"dashboard"}):this.$router.push({name:"login"})},gotoLogin:function(){if(!this.shopUrl)return this.$elementMessage("Please enter Shopify store name","error"),!1;localStorage.getItem("c_ourMallUserInfo")?this.$router.push({name:"stores",params:{add:!0,val:this.shopUrl}}):this.$router.push({name:"login",params:{shopUrl:this.shopUrl}})},getCategory:function(){var t=this;this.$apiCall("api.ProductCategory.findByVendorRelateCategory",{},(function(e){9999==e.ErrorCode&&(t.commodityTypeMoreList=e.Data.Results,t.getItems())}))},getItems:function(){var t=this;this.loading=!0,this.allLoading=!0,"ALL-CATEGORIES"==this.categoryId&&(this.categoryId=""),this.commodityTypeMoreList.forEach((function(e){e.name==t.categoryId&&(t.categoryId=e.id)})),this.$apiCall("api.VendorShop.vendorFindProducts",{name:this.input,categoryId:this.$route.params.id,page:this.page,rowsPerPage:this.rowsPerPage,status:1},(function(e){9999==e.ErrorCode?(t.commodityTypeMoreList.forEach((function(e){e.id==t.categoryId&&(t.name=e.name,t.categoryId=e.name)})),t.items=e.Data.Results.products,t.total=e.Data.Pagination.totalCount,t.totalPage=e.Data.Pagination.totalPage,t.allLoading=!1,t.loading=!1,document.body.scrollTop=document.documentElement.scrollTop=0):(t.allLoading=!1,t.$elementMessage(e.Message,"error"))}))},search:function(){var t=this;this.content=this.input,this.commodityTypeMoreList.forEach((function(e){e.name==t.categoryId&&(t.nameS=e.id)})),this.nameS||(this.nameS=this.categoryId),""==this.categoryId?this.$router.push({path:"/category/ALL-CATEGORIES/".concat(this.content,".html"),query:{input:this.content,search:!0}}):this.$router.push({path:"/category/".concat(this.nameS,"/").concat(this.content,".html"),query:{input:this.content}}),this.page=1,this.nameS=""},changePageSize:function(t){this.rowsPerPage=t,localStorage.setItem("c_importPerPage",t),this.getItems()},gotoPage:function(){this.page=this.$route.query.page?this.$route.query.page:1,this.input=this.$route.query.input,this.getItems()},toPage:function(t){if(t!=this.$route.query.page){var e={},a="";a=this.$route.params.id,e.page=t,e.input=this.content,""==this.categoryId?this.$router.push({path:"/category/ALL-CATEGORIES/.html",query:e}):this.$router.push({path:"/category/".concat(a,"/").concat(this.$route.params.name),query:e})}},goToDetail:function(t){var e=localStorage.getItem("vendorId");148982!=e&&146428!=e&&144875!=e&&144843!=e&&143779!=e&&143654!=e&&140694!=e&&74!=e?window.open("/item/".concat(t.id,"/").concat(t.name.replace(/\s+/g,"-").replace(/[^\w]/g,"_"),".html")):window.open("/itemOld/".concat(t.id,"/").concat(t.name.replace(/\s+/g,"-").replace(/[^\w]/g,"_"),".html"))},import_pro:function(t,e){var a=this;this.$store.state.userInfo?this.$apiCall("api.Product.addFromVendorShopProduct",{id:t.id},(function(e){9999==e.ErrorCode?(t.hasImport=1,t.imports++,a.$root.$children[0].importNum++,a.$message.success("Import Success !")):a.$message.error(e.Message)})):this.$root.$children[0].openDialogLogin()}}},y=f,v=(a("2dd8"),a("67e5"),a("6ade"),Object(u["a"])(y,o,i,!1,null,"162583ad",null));e["default"]=v.exports},b39c:function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home-header"},[a("router-link",{attrs:{to:"/"}},[a("h1",{style:{backgroundImage:"url("+t.$store.state.shopInfo.logo+")"}})]),a("div",{staticClass:"right"},[a("ul",[a("li",[a("router-link",{class:{active:"home"==t.$route.name},attrs:{to:"/"}},[t._v("Home")])],1),a("li",[a("router-link",{attrs:{to:"/products-market"}},[t._v("Find Products")])],1),t.$store.state.userInfo?[a("li",{staticClass:"import-link"},[a("router-link",{attrs:{to:"/import-list"}},[a("i",[this.$root.$children[0].importNum?a("i",{staticClass:"badge"},[t._v(t._s(this.$root.$children[0].importNum>99?"99+":this.$root.$children[0].importNum))]):t._e()]),t._v(" My Import List ")])],1),a("li",[a("el-dropdown",{on:{command:t.handleCommand}},[a("span",{staticClass:"el-dropdown-link"},[a("i",{staticClass:"user-i"}),a("span",{staticClass:"name tx-ellipsis1"},[t._v(t._s(t.$store.state.userInfo.name))]),a("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{staticClass:"align-items-endd-flex",staticStyle:{width:"150px"},attrs:{command:"dashboard"}},[a("i",{staticClass:"mg-r-15 fa fa-user-o",attrs:{"aria-hidden":"true"}}),t._v(" My Profile ")]),a("el-dropdown-item",{staticClass:"d-flex",staticStyle:{width:"150px"},attrs:{command:"exit"}},[a("i",{staticClass:"mg-r-15 fa fa-sign-out",attrs:{"aria-hidden":"true"}}),t._v(" Logout ")])],1)],1)],1)]:[a("li",[a("a",{attrs:{href:"javascript:;"},on:{click:t.openDialogLogin}},[t._v("Login")])]),a("li",{staticClass:"reg"},[a("a",{attrs:{href:"javascript:;"},on:{click:t.openRegister}},[t._v("Register")])])]],2)])],1)},i=[],s={data:function(){return{c_apiShopId:JSON.parse(localStorage.getItem("c_apiShopId"))}},methods:{handleCommand:function(t){switch(t){case"exit":localStorage.removeItem("c_wantVisitPath"),this.$Logout("/");break;case"profile":this.$router.push({name:"profile"});break;case"dashboard":if(121173==this.c_apiShopId){var e=JSON.parse(localStorage.getItem("isValidationCW"));if(!e)return void(this.isValidationCWDialog=!0)}this.$router.push({name:"dashboard"});break}},openDialogLogin:function(){this.$root.$children[0].openDialogLogin()},openRegister:function(){this.$root.$children[0].openDialogRegister()}}},r=s,n=(a("ecc6"),a("2877")),l=Object(n["a"])(r,o,i,!1,null,"ace027c8",null);e["a"]=l.exports},b983:function(t,e,a){},c942:function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home-footer"},[a("div",{staticClass:"content"},[a("div",{staticClass:"left"},[a("p",{staticClass:"r1 title"},[t._v("Make dropshipping easy with "+t._s(t.$root.$children[0].pName.a)+".")]),a("p",{staticClass:"r2"},[t._v(" Ourmall is designed for customers with need for drop-shipping, it can easily Allocate store orders to your vendors, and your store orders could be automatically completed. ")])]),"shopify"==t.$route.name?a("div",{staticClass:"right"},[a("ul",[a("li",{staticStyle:{"margin-right":"70px"}},[a("div",{staticClass:"t title"},[t._v("Company")]),a("div",{staticClass:"m"},[a("span",[t._v("Privacy policy")]),a("span",[t._v("Terms of use")]),a("router-link",{attrs:{to:{name:"contact"}}},[t._v("Contact Us")])],1)]),a("li",{staticStyle:{margin:"0"}},[a("div",{staticClass:"t title"},[t._v("Getting Started")]),a("div",{staticClass:"m"},[a("router-link",{attrs:{to:{path:"/article/How-to-install-OurMall-Dropshipping-App?",query:{id:3}}}},[t._v("How to install "+t._s(t.$root.$children[0].pName.a)+"?")]),a("router-link",{attrs:{to:{path:"/article/How-to-dispatch-my-Shopify-orders-to-my-vendors?",query:{id:5}}}},[t._v("How to allocate my orders?")]),a("router-link",{attrs:{to:{path:"/article/How-to-auto-fulfill-orders?",query:{id:6}}}},[t._v("How to auto fulfill orders?")]),a("router-link",{attrs:{to:{path:"/article/Connect-several-Shopify-stores-in-one-OurMall-account",query:{id:7}}}},[t._v("Connect several Shopify stores")])],1)])])]):t._e()]),t._m(0)])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"footLogo"},[a("div",{staticClass:"d-flex"},[a("span",{staticStyle:{"margin-top":"14px"}},[t._v(" © 2021, Powered by OurMall ")])])])}],s=(a("3032"),a("2877")),r={},n=Object(s["a"])(r,o,i,!1,null,"11c9dfc3",null);e["a"]=n.exports},d975:function(t,e,a){},ecc6:function(t,e,a){"use strict";a("6afc")}}]);
//# sourceMappingURL=storesMore.8ccb04c4.js.map