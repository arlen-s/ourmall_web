(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["storesMore"],{"08d0":function(t,e,o){},2314:function(t,e,o){t.exports=o.p+"img/none.56197834.png"},3032:function(t,e,o){"use strict";o("841d")},3482:function(t,e,o){},"4a85":function(t,e,o){"use strict";o("08d0")},5191:function(t,e,o){"use strict";o("d4bd")},"6afc":function(t,e,o){},"841d":function(t,e,o){},9547:function(t,e,o){"use strict";o("d975")},9978:function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home-page"},[t.code&&t.code.header&&t.code.header.length>0?t._l(t.code.header,(function(e,o){return a("div",{key:o,domProps:{innerHTML:t._s(e)}})})):t._e(),a("div",{staticStyle:{position:"relative",height:"120px"}},[a("DHeader",{attrs:{data:t.setting&&t.setting.header||"",headerMenu:t.headerMenu}})],1),a("div",[a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.allLoading,expression:"allLoading"}],staticClass:"contentpanel box"},[a("div",{ref:"pageHeader",staticClass:"pagetitle",staticStyle:{"padding-right":"0"}},[a("div",{staticClass:"d-flex",staticStyle:{width:"100%"}},[a("el-select",{staticStyle:{width:"264px","margin-right":"-1px"},attrs:{slot:"append",placeholder:"IN ALL CATEGORIES"},slot:"append",model:{value:t.categoryId,callback:function(e){t.categoryId=e},expression:"categoryId"}},[a("el-option",{attrs:{label:"IN ALL CATEGORIES",value:""}}),t._l(t.commodityTypeMoreList,(function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],2),a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"Search products"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}}),a("div",{staticClass:"search-but",on:{click:function(e){return t.search()}}},[t._v(" SEARCH ")])],1)]),a("div",{staticClass:"pagetitle"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/products-market"}}},[t._v(" Products Market")]),t.activeCategory.l1?a("el-breadcrumb-item",[t.activeCategory.L>1?a("a",{on:{click:function(e){return t.gotoCategory(1)}}},[t._v(" "+t._s(t.activeCategory.l1.name)+" ")]):a("a",{attrs:{href:"javascript:;"}},[t._v(t._s(t.activeCategory.l1.name))])]):t._e(),t.activeCategory.l2?a("el-breadcrumb-item",[t.activeCategory.L>2?a("a",{on:{click:function(e){return t.gotoCategory(2)}}},[t._v(" "+t._s(t.activeCategory.l2.name)+" ")]):a("a",{attrs:{href:"javascript:;"}},[t._v(t._s(t.activeCategory.l2.name))])]):t._e(),t.activeCategory.l3?a("el-breadcrumb-item",[a("a",{attrs:{href:"javascript:;"}},[t._v(t._s(t.activeCategory.l3.name))])]):t._e()],1)],1),a("div",{staticStyle:{display:"flex",width:"100%"}},[a("Categories",{attrs:{categories:t.commodityTypeMoreList}}),t.items&&0==t.items.length?a("div",{staticStyle:{flex:"1"}},[a("el-card",{staticClass:"mg-l-20",staticStyle:{width:"auto"}},[a("div",{staticClass:"noProduct"},[a("img",{attrs:{src:o("2314")}}),a("b",{staticClass:"mg-t-10"},[t._v("There are no products in this category")])])])],1):a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{flex:"1"}},[a("div",{staticClass:"list"},t._l(t.items,(function(e){return a("div",{key:e.id,staticClass:"pro_box",staticStyle:{"margin-bottom":"20px"}},[a("div",{staticClass:"pro_img",staticStyle:{height:"194px"}},[a("el-image",{staticStyle:{position:"absolute",width:"100%",cursor:"pointer",height:"100%"},attrs:{fit:"cover",src:e.imgUrl},on:{click:function(o){return t.goToDetail(e)}}})],1),a("div",{staticStyle:{padding:"16px 10px"}},[a("div",{staticClass:"pro_name",on:{click:function(o){return t.goToDetail(e)}}},[a("a",{attrs:{href:"javascript:;"}},[t._v(t._s(e.name))])]),a("b",{staticClass:"pro_cost"},[t._v(t._s(t.$showSybmol())+" "+t._s(t.$exchangeRate(e.cost)))]),a("div",{staticStyle:{display:"flex",width:"100%","justify-content":"center","margin-top":"12px"}},[a("el-dropdown",[a("el-button",{attrs:{type:"primary"}},[t._v(" Add to Import List"),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{staticClass:"importBut",attrs:{disabled:1==e.hasImport},nativeOn:{click:function(o){return t.import_pro(e,o)}}},[t._v("Add to Import List")]),a("el-dropdown-item",{nativeOn:{click:function(o){return t.goToDetail(e)}}},[t._v("Add to Cart")])],1)],1)],1)])])})),0)])],1)]),t.items.length?a("el-row",{staticStyle:{margin:"20px 0"},attrs:{gutter:20}},[a("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[a("div",[a("el-pagination",{attrs:{"current-page":Number(t.page),background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":t.pageSizes,"page-size":t.rowsPerPage,total:Number(t.total)},on:{"current-change":t.toPage,"size-change":t.changePageSize}})],1)])],1):t._e(),a("div",{staticClass:"ball",style:{top:t.ball.y+"px",left:t.ball.x+"px",opacity:t.ball.opacity}}),a("el-backtop",{staticClass:"goto-top",attrs:{right:32,bottom:120}})],1),a("DFooter",{attrs:{setting:t.$store.state.configJson&&t.$store.state.configJson.footer||""}}),t.code&&t.code.footer&&t.code.footer.length>0?t._l(t.code.footer,(function(e,o){return a("div",{key:o,domProps:{innerHTML:t._s(e)}})})):t._e(),a("el-dialog",{attrs:{visible:t.centerDialogVisible,width:"30%",center:""},on:{"update:visible":function(e){t.centerDialogVisible=e},close:t.closeLogin}},[a("div",{staticClass:"login-page"},[a("div",{staticClass:"login-box"},[a("div",{staticClass:"box mg-b-5"},[a("p",[t._v("Please enter your shopify store name to connect the dashboard page:")]),a("div",{staticClass:" mg-b-30"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.shopUrl,expression:"shopUrl"}],attrs:{type:"text",placeholder:"Shopify store name"},domProps:{value:t.shopUrl},on:{input:[function(e){e.target.composing||(t.shopUrl=e.target.value)},function(e){return t.storeInput(e.target.value)}],keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.goLogin(e)}}}),a("span",[t._v(".myshopify.com")])]),a("div",[a("el-button",{staticClass:"login-btn",attrs:{loading:t.loginLoading},on:{click:t.goLogin}},[t._v(t._s(t.loginLoading?"Please Wait":"LOGIN"))])],1)])])])])],2)},i=[],s=(o("99af"),o("caad"),o("b0c0"),o("a9e3"),o("4d63"),o("ac1f"),o("25f0"),o("2532"),o("5319"),o("841c"),o("159b"),o("b39c")),r=o("c942"),n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"categories-nav",class:{more:t.showMore}},[o("h2",{attrs:{title:"ALL CATEGORIES"}},[t._v("Categories")]),o("ul",{staticClass:"c-nav"},[t._l(t.categories,(function(e,a){return[a<10||t.showMore?o("li",{key:e.id},[o("router-link",{staticClass:"c-link",attrs:{title:e.name,to:{path:"/category/"+e.id+"/"+e.name.replace(/\s+/g,"-")+".html"}},nativeOn:{click:function(o){return t.categoryRecord(e.id,e.name,1)}}},[o("div",{staticClass:"left"},[o("i",{staticClass:"c-icon",class:"c-"+e.id}),o("span",{staticClass:" tx-ellipsis1"},[t._v(t._s(e.name))])]),o("i",{staticClass:"fa fa-angle-right",staticStyle:{"margin-left":"15px"},attrs:{"aria-hidden":"true"}})]),e.list&&0!=e.list.length?o("div",{staticClass:"sub-menu"},[o("ul",{staticClass:"l1"},[t._l(e.list,(function(e){return[o("li",{key:e.id},[o("router-link",{attrs:{to:{path:"/category/"+e.id+"/"+e.name.replace(/\s+/g,"-")+".html"},title:e.name},nativeOn:{click:function(o){return t.categoryRecord(e.id,e.name,2)}}},[t._v(t._s(e.name))]),e.list&&e.list.length?o("ul",{staticClass:"l2"},t._l(e.list,(function(e){return o("li",{key:e.id},[o("router-link",{attrs:{to:{path:"/category/"+e.id+"/"+e.name.replace(/\s+/g,"-")+".html"},title:e.name},nativeOn:{click:function(o){return t.categoryRecord(e.id,e.name,2)}}},[t._v(t._s(e.name))])],1)})),0):t._e()],1)]}))],2)]):t._e()],1):t._e()]}))],2),t.categories&&t.categories.length>9?o("div",{staticClass:"more"},[o("a",{attrs:{href:"javascript:;"},on:{click:t.moreChange}},[o("i",{staticClass:"fa ",class:t.showMore?"fa-minus-square-o":"fa-plus-square-o",attrs:{"aria-hidden":"true"}}),o("span",[t._v(t._s(t.showMore?"Collapse":"More"))])])]):t._e()])},l=[],c={props:["categories"],data:function(){return{showMore:!1}},methods:{categoryRecord:function(t,e,o){localStorage.setItem("c_buryResource","category"),1==o?this.$Burying({object:"5002",objectId:t,objectUrl:e}):2==o&&this.$Burying({object:"5003",objectId:t,objectUrl:e})},moreChange:function(){this.showMore=!this.showMore}}},d=c,u=(o("9547"),o("2877")),h=Object(u["a"])(d,n,l,!1,null,"a5680c26",null),p=h.exports,g=o("8214"),m=o("d8f7"),f={props:{},data:function(){return{setting:null,headerMenu:[],code:{header:[],footer:[]},nameS:"",header2Visible:!1,time:0,loginLoading:!1,shopUrl:"",categoryId:null,centerDialogVisible:!1,name:"",items:[],commodityTypeMoreList:[],page:this.$route.query.page?Number(this.$route.query.page):"1",rowsPerPage:localStorage.getItem("c_importPerPage")?Number(localStorage.getItem("c_importPerPage")):12,pageSizes:[12,24,48],total:0,totalPage:0,input:"",content:"",loading:!0,allLoading:!0,ball:{x:window.innerWidth/2,y:window.innerHeight/2,opacity:0},c_apiShopId:JSON.parse(localStorage.getItem("c_apiShopId"))}},computed:{product:function(){var t=this,e="";return this.commodityTypeMoreList.forEach((function(o){o.id==t.categoryId&&(e=o.name)})),e},activeCategory:function(){var t,e,o,a,i=this;return!!this.commodityTypeMoreList&&("0"==this.$route.params.id?{L:1,l1:{id:0,name:"All Categories"},l2:void 0,l3:void 0}:(this.commodityTypeMoreList&&this.commodityTypeMoreList.length&&this.commodityTypeMoreList.some((function(s){if(s.id==i.$route.params.id)return t=1,e=s,!0;s.list&&s.list.some((function(r){if(r.id==i.$route.params.id)return t=2,e=s,o=r,!0;r.list&&r.list.some((function(n){if(n.id==i.$route.params.id)return t=3,e=s,o=r,a=n,!0}))}))})),{L:t,l1:e,l2:o,l3:a}))}},beforeDestroy:function(){clearInterval(this.time)},created:function(){var t=this;this.setting=localStorage.getItem("c_shopConfigJson")?JSON.parse(localStorage.getItem("c_shopConfigJson")):null,this.setting&&this.setting.customCode&&this.setting.customCode.length&&this.setting.customCode.forEach((function(e){e.pages.includes("搜索结果页")&&("底部"==e.position&&t.code.footer.push(e.desc),"顶部"==e.position&&t.code.header.push(e.desc))}))},mounted:function(){var t=this;this.$root.$children[0].getParentUrl()&&this.$root.$children[0].getParentUrl().indexOf("vendor")>=0||this.$root.$children[0].checkLogin(),this.header2Visible=$(window).scrollTop()>70,$(window).scroll((function(){t.header2Visible=$(window).scrollTop()>70})),this.$route.query.search&&(this.categoryId=this.$route.params.id),this.input=this.$route.query.input,this.content=this.input,this.getCategory(),document.title="".concat(this.$route.params.name.replace(".html","")," How to find :: ").concat(this.$root.$children[0].pName.b," - Easy Dropshipping")},components:{homeHeader:s["a"],Footer:r["a"],Categories:p,DHeader:g["a"],DFooter:m["a"]},watch:{"setting.header.activeMenu":{handler:function(){this.getMenu()},deep:!0},$route:"gotoPage"},methods:{getMenu:function(){var t=this;this.setting.header.activeMenu&&this.setting.menu.forEach((function(e){e.id==t.setting.header.activeMenu&&(t.headerMenu=e)}))},gotoCategory:function(t){1==t?this.$router.push("/category/".concat(this.activeCategory.l1.id,"/").concat(this.activeCategory.l1.name.replace(/\s+/g,"-"),".html")):this.$router.push("/category/".concat(this.activeCategory.l2.id,"/").concat(this.activeCategory.l2.name.replace(/\s+/g,"-"),".html"))},storeInput:function(t){for(var e=new RegExp("[A-Za-z0-9-_]+"),o=t.length,a="",i=0;i<o;i++)e.test(t[i])&&(a+=t[i]);this.shopUrl=a},getLoginStatus:function(){var t=this;this.$apiCall("api.ShopifyAccount.getShopAuthStatus",{shopUrl:this.shopUrl},(function(e){"9999"==e.ErrorCode?e.Data.Results.status&&(clearInterval(t.time),1==e.Data.Results.status?(localStorage.getItem("c_ourMallFirstLogin")?localStorage.setItem("c_ourMallFirstLogin",2):localStorage.setItem("c_ourMallFirstLogin",1),localStorage.setItem("c_apiUserId",e.Data.Results.userInfo.id),localStorage.setItem("c_apiUserToken",e.Data.Results.userInfo.apiUserToken),localStorage.setItem("c_ourMallUserInfo",JSON.stringify(e.Data.Results.userInfo)),t.$store.commit("setUserInfo",e.Data.Results.userInfo),t.$router.push({name:"more",query:t.$route.query}),t.win.close()):(t.loginLoading=!1,t.$elementMessage(e.Data.Results.errorMessage,"error"),setTimeout((function(){window.location.reload()}),1e3),t.win.close())):(clearInterval(t.time),t.$elementMessage(e.Message,"error"))}))},goLogin:function(){var t=this;if(!this.shopUrl)return this.$elementMessage("Please enter Shopify store name","error"),!1;this.win=window.open("/blank.html","Shopify"),this.loginLoading=!0,this.$apiCall("api.ShopifyAccount.addShopifyAccount",{shopUrl:this.shopUrl,getAuth:1,ivc:localStorage.getItem("c_ivc")?localStorage.getItem("c_ivc"):"",utmSource:localStorage.getItem("c_utm")},(function(e){"9999"==e.ErrorCode?(t.win.location=e.Data.Results,t.time=setInterval((function(){t.getLoginStatus()}),2e3)):t.$elementMessage(e.Message,"error")}))},closeLogin:function(){this.shopUrl="",this.loginLoading=!1},handleCommand:function(t){switch(t){case"exit":this.$Logout("/");break;case"profile":this.$router.push({name:"profile"});break;case"dashboard":if(121173==this.c_apiShopId){var e=JSON.parse(localStorage.getItem("isValidationCW"));if(!e)return void(this.isValidationCWDialog=!0)}this.$router.push({name:"dashboard"});break}},login:function(){localStorage.getItem("c_ourMallUserInfo")?this.$router.push({name:"dashboard"}):this.$router.push({name:"login"})},gotoLogin:function(){if(!this.shopUrl)return this.$elementMessage("Please enter Shopify store name","error"),!1;localStorage.getItem("c_ourMallUserInfo")?this.$router.push({name:"stores",params:{add:!0,val:this.shopUrl}}):this.$router.push({name:"login",params:{shopUrl:this.shopUrl}})},getCategory:function(){var t=this;this.$apiCall("api.ProductCategory.findByVendorRelateCategory",{},(function(e){9999==e.ErrorCode&&(t.commodityTypeMoreList=e.Data.Results,t.getItems())}))},getItems:function(){var t=this;this.loading=!0,this.allLoading=!0,"ALL-CATEGORIES"==this.categoryId&&(this.categoryId=""),this.commodityTypeMoreList.forEach((function(e){e.name==t.categoryId&&(t.categoryId=e.id)})),this.$apiCall("api.VendorShop.vendorFindProducts",{name:this.input,categoryId:this.$route.params.id,page:this.page,rowsPerPage:this.rowsPerPage,status:1},(function(e){9999==e.ErrorCode?(t.commodityTypeMoreList.forEach((function(e){e.id==t.categoryId&&(t.name=e.name,t.categoryId=e.name)})),t.items=e.Data.Results.products,t.total=e.Data.Pagination.totalCount,t.totalPage=e.Data.Pagination.totalPage,t.allLoading=!1,t.loading=!1,document.body.scrollTop=document.documentElement.scrollTop=0):(t.allLoading=!1,t.$elementMessage(e.Message,"error"))}))},search:function(){var t=this;this.content=this.input,this.commodityTypeMoreList.forEach((function(e){e.name==t.categoryId&&(t.nameS=e.id)})),this.nameS||(this.nameS=this.categoryId),""==this.categoryId?this.$router.push({path:"/category/ALL-CATEGORIES/".concat(this.content,".html"),query:{input:this.content,search:!0}}):this.$router.push({path:"/category/".concat(this.nameS,"/").concat(this.content,".html"),query:{input:this.content}}),this.page=1,this.nameS=""},changePageSize:function(t){this.rowsPerPage=t,localStorage.setItem("c_importPerPage",t),this.getItems()},gotoPage:function(){this.page=this.$route.query.page?this.$route.query.page:1,this.input=this.$route.query.input,this.getItems()},toPage:function(t){if(t!=this.$route.query.page){var e={},o="";o=this.$route.params.id,e.page=t,e.input=this.content,""==this.categoryId?this.$router.push({path:"/category/ALL-CATEGORIES/.html",query:e}):this.$router.push({path:"/category/".concat(o,"/").concat(this.$route.params.name),query:e})}},goToDetail:function(t){var e=localStorage.getItem("vendorId");148982!=e&&146428!=e&&144875!=e&&144843!=e&&143779!=e&&143654!=e&&140694!=e&&74!=e?window.open("/item/".concat(t.id,"/").concat(t.name.replace(/\s+/g,"-").replace(/[^\w]/g,"_"),".html")):window.open("/itemOld/".concat(t.id,"/").concat(t.name.replace(/\s+/g,"-").replace(/[^\w]/g,"_"),".html"))},import_pro:function(t,e){var o=this;this.$store.state.userInfo?this.$apiCall("api.Product.addFromVendorShopProduct",{id:t.id},(function(e){9999==e.ErrorCode?(t.hasImport=1,t.imports++,o.$root.$children[0].importNum++,o.$message.success("Import Success !")):o.$message.error(e.Message)})):this.$root.$children[0].openDialogLogin()}}},y=f,v=(o("5191"),o("4a85"),o("b418"),Object(u["a"])(y,a,i,!1,null,"0f9f454a",null));e["default"]=v.exports},b39c:function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"home-header"},[o("router-link",{attrs:{to:"/"}},[o("h1",{style:{backgroundImage:"url("+t.$store.state.shopInfo.logo+")"}})]),o("div",{staticClass:"right"},[o("ul",[o("li",[o("router-link",{class:{active:"home"==t.$route.name},attrs:{to:"/"}},[t._v("Home")])],1),o("li",[o("router-link",{attrs:{to:"/products-market"}},[t._v("Find Products")])],1),t.$store.state.userInfo?[o("li",{staticClass:"import-link"},[o("router-link",{attrs:{to:"/import-list"}},[o("i",[this.$root.$children[0].importNum?o("i",{staticClass:"badge"},[t._v(t._s(this.$root.$children[0].importNum>99?"99+":this.$root.$children[0].importNum))]):t._e()]),t._v(" My Import List ")])],1),o("li",[o("el-dropdown",{on:{command:t.handleCommand}},[o("span",{staticClass:"el-dropdown-link"},[o("i",{staticClass:"user-i"}),o("span",{staticClass:"name tx-ellipsis1"},[t._v(t._s(t.$store.state.userInfo.name))]),o("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),o("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[o("el-dropdown-item",{staticClass:"align-items-endd-flex",staticStyle:{width:"150px"},attrs:{command:"dashboard"}},[o("i",{staticClass:"mg-r-15 fa fa-user-o",attrs:{"aria-hidden":"true"}}),t._v(" My Profile ")]),o("el-dropdown-item",{staticClass:"d-flex",staticStyle:{width:"150px"},attrs:{command:"exit"}},[o("i",{staticClass:"mg-r-15 fa fa-sign-out",attrs:{"aria-hidden":"true"}}),t._v(" Logout ")])],1)],1)],1)]:[o("li",[o("a",{attrs:{href:"javascript:;"},on:{click:t.openDialogLogin}},[t._v("Login")])]),o("li",{staticClass:"reg"},[o("a",{attrs:{href:"javascript:;"},on:{click:t.openRegister}},[t._v("Register")])])]],2)])],1)},i=[],s={data:function(){return{c_apiShopId:JSON.parse(localStorage.getItem("c_apiShopId"))}},methods:{handleCommand:function(t){switch(t){case"exit":localStorage.removeItem("c_wantVisitPath"),this.$Logout("/");break;case"profile":this.$router.push({name:"profile"});break;case"dashboard":if(121173==this.c_apiShopId){var e=JSON.parse(localStorage.getItem("isValidationCW"));if(!e)return void(this.isValidationCWDialog=!0)}this.$router.push({name:"dashboard"});break}},openDialogLogin:function(){this.$root.$children[0].openDialogLogin()},openRegister:function(){this.$root.$children[0].openDialogRegister()}}},r=s,n=(o("ecc6"),o("2877")),l=Object(n["a"])(r,a,i,!1,null,"ace027c8",null);e["a"]=l.exports},b418:function(t,e,o){"use strict";o("3482")},c942:function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"home-footer"},[o("div",{staticClass:"content"},[o("div",{staticClass:"left"},[o("p",{staticClass:"r1 title"},[t._v("Make dropshipping easy with "+t._s(t.$root.$children[0].pName.a)+".")]),o("p",{staticClass:"r2"},[t._v(" Ourmall is designed for customers with need for drop-shipping, it can easily Allocate store orders to your vendors, and your store orders could be automatically completed. ")])]),"shopify"==t.$route.name?o("div",{staticClass:"right"},[o("ul",[o("li",{staticStyle:{"margin-right":"70px"}},[o("div",{staticClass:"t title"},[t._v("Company")]),o("div",{staticClass:"m"},[o("span",[t._v("Privacy policy")]),o("span",[t._v("Terms of use")]),o("router-link",{attrs:{to:{name:"contact"}}},[t._v("Contact Us")])],1)]),o("li",{staticStyle:{margin:"0"}},[o("div",{staticClass:"t title"},[t._v("Getting Started")]),o("div",{staticClass:"m"},[o("router-link",{attrs:{to:{path:"/article/How-to-install-OurMall-Dropshipping-App?",query:{id:3}}}},[t._v("How to install "+t._s(t.$root.$children[0].pName.a)+"?")]),o("router-link",{attrs:{to:{path:"/article/How-to-dispatch-my-Shopify-orders-to-my-vendors?",query:{id:5}}}},[t._v("How to allocate my orders?")]),o("router-link",{attrs:{to:{path:"/article/How-to-auto-fulfill-orders?",query:{id:6}}}},[t._v("How to auto fulfill orders?")]),o("router-link",{attrs:{to:{path:"/article/Connect-several-Shopify-stores-in-one-OurMall-account",query:{id:7}}}},[t._v("Connect several Shopify stores")])],1)])])]):t._e()]),t._m(0)])},i=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"footLogo"},[o("div",{staticClass:"d-flex"},[o("span",{staticStyle:{"margin-top":"14px"}},[t._v(" © 2021, Powered by OurMall ")])])])}],s=(o("3032"),o("2877")),r={},n=Object(s["a"])(r,a,i,!1,null,"11c9dfc3",null);e["a"]=n.exports},d4bd:function(t,e,o){},d975:function(t,e,o){},ecc6:function(t,e,o){"use strict";o("6afc")}}]);
//# sourceMappingURL=storesMore.c4002908.js.map