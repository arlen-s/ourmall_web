(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["storesMore"],{"12b0":function(t,e,o){"use strict";o("dfbf")},2314:function(t,e,o){t.exports=o.p+"img/none.56197834.png"},"2c17":function(t,e,o){},3032:function(t,e,o){"use strict";o("841d")},"39f7":function(t,e,o){"use strict";o("2c17")},"4a58":function(t,e,o){},"6afc":function(t,e,o){},"841d":function(t,e,o){},9547:function(t,e,o){"use strict";o("d975")},9978:function(t,e,o){"use strict";o.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"home-page"},[t.code&&t.code.header&&t.code.header.length>0?t._l(t.code.header,(function(e,o){return i("div",{key:o,domProps:{innerHTML:t._s(e)}})})):t._e(),i("div",{staticStyle:{position:"relative",height:"120px"}},[i("DHeader",{attrs:{data:t.setting&&t.setting.header||"",headerMenu:t.headerMenu}})],1),i("div",[i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.allLoading,expression:"allLoading"}],staticClass:"contentpanel box"},[i("div",{ref:"pageHeader",staticClass:"pagetitle",staticStyle:{"padding-right":"0"}},[i("div",{staticClass:"d-flex",staticStyle:{width:"100%"}},[i("el-select",{staticStyle:{width:"264px","margin-right":"-1px"},attrs:{slot:"append",placeholder:"IN ALL CATEGORIES"},slot:"append",model:{value:t.categoryId,callback:function(e){t.categoryId=e},expression:"categoryId"}},[i("el-option",{attrs:{label:"IN ALL CATEGORIES",value:""}}),t._l(t.commodityTypeMoreList,(function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],2),i("el-input",{staticClass:"input-with-select",attrs:{placeholder:"Search products"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}}),i("div",{staticClass:"search-but",on:{click:function(e){return t.search()}}},[t._v(" SEARCH ")])],1)]),i("div",{staticClass:"pagetitle"},[i("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/products-market"}}},[t._v(" Products Market")]),t.activeCategory.l1?i("el-breadcrumb-item",[t.activeCategory.L>1?i("a",{on:{click:function(e){return t.gotoCategory(1)}}},[t._v(" "+t._s(t.activeCategory.l1.name)+" ")]):i("a",{attrs:{href:"javascript:;"}},[t._v(t._s(t.activeCategory.l1.name))])]):t._e(),t.activeCategory.l2?i("el-breadcrumb-item",[t.activeCategory.L>2?i("a",{on:{click:function(e){return t.gotoCategory(2)}}},[t._v(" "+t._s(t.activeCategory.l2.name)+" ")]):i("a",{attrs:{href:"javascript:;"}},[t._v(t._s(t.activeCategory.l2.name))])]):t._e(),t.activeCategory.l3?i("el-breadcrumb-item",[i("a",{attrs:{href:"javascript:;"}},[t._v(t._s(t.activeCategory.l3.name))])]):t._e()],1)],1),i("div",{staticStyle:{display:"flex",width:"100%"}},[i("Categories",{attrs:{categories:t.commodityTypeMoreList}}),t.items&&0==t.items.length?i("div",{staticStyle:{flex:"1"}},[i("el-card",{staticClass:"mg-l-20",staticStyle:{width:"auto"}},[i("div",{staticClass:"noProduct"},[i("img",{attrs:{src:o("2314")}}),i("b",{staticClass:"mg-t-10"},[t._v("There are no products in this category")])])])],1):i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{flex:"1"}},[i("div",{staticClass:"list"},t._l(t.items,(function(e){return i("div",{key:e.id,staticClass:"pro_box",staticStyle:{"margin-bottom":"20px"}},[i("div",{staticClass:"pro_img",staticStyle:{height:"194px"}},[i("el-image",{staticStyle:{position:"absolute",width:"100%",cursor:"pointer",height:"100%"},attrs:{fit:"cover",src:e.imgUrl},on:{click:function(o){return t.goToDetail(e)}}})],1),i("div",{staticStyle:{padding:"16px 10px"}},[i("div",{staticClass:"pro_name",on:{click:function(o){return t.goToDetail(e)}}},[i("a",{attrs:{href:"javascript:;"}},[t._v(t._s(e.name))])]),i("b",{staticClass:"pro_cost"},[t._v(t._s(t.$showSybmol())+" "+t._s(t.$exchangeRate(e.cost)))]),i("div",{staticStyle:{display:"flex",width:"100%","justify-content":"center","margin-top":"12px"}},[i("el-dropdown",[i("el-button",{attrs:{type:"primary"}},[t._v(" Add to Import List"),i("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[i("el-dropdown-item",{staticClass:"importBut",attrs:{disabled:1==e.hasImport},nativeOn:{click:function(o){return t.import_pro(e,o)}}},[t._v("Add to Import List")]),i("el-dropdown-item",{nativeOn:{click:function(o){return t.goToDetail(e)}}},[t._v("Add to Cart")])],1)],1)],1)])])})),0)])],1)]),t.items.length?i("el-row",{staticStyle:{margin:"20px 0"},attrs:{gutter:20}},[i("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[i("div",[i("el-pagination",{attrs:{"current-page":Number(t.page),background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":t.pageSizes,"page-size":t.rowsPerPage,total:Number(t.total)},on:{"current-change":t.toPage,"size-change":t.changePageSize}})],1)])],1):t._e(),i("div",{staticClass:"ball",style:{top:t.ball.y+"px",left:t.ball.x+"px",opacity:t.ball.opacity}}),i("el-backtop",{staticClass:"goto-top",attrs:{right:32,bottom:120}})],1),i("DFooter",{attrs:{setting:t.$store.state.configJson&&t.$store.state.configJson.footer||""}}),t.code&&t.code.footer&&t.code.footer.length>0?t._l(t.code.footer,(function(e,o){return i("div",{key:o,domProps:{innerHTML:t._s(e)}})})):t._e(),i("el-dialog",{attrs:{visible:t.centerDialogVisible,width:"30%",center:""},on:{"update:visible":function(e){t.centerDialogVisible=e},close:t.closeLogin}},[i("div",{staticClass:"login-page"},[i("div",{staticClass:"login-box"},[i("div",{staticClass:"box mg-b-5"},[i("p",[t._v("Please enter your shopify store name to connect the dashboard page:")]),i("div",{staticClass:" mg-b-30"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.shopUrl,expression:"shopUrl"}],attrs:{type:"text",placeholder:"Shopify store name"},domProps:{value:t.shopUrl},on:{input:[function(e){e.target.composing||(t.shopUrl=e.target.value)},function(e){return t.storeInput(e.target.value)}],keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.goLogin(e)}}}),i("span",[t._v(".myshopify.com")])]),i("div",[i("el-button",{staticClass:"login-btn",attrs:{loading:t.loginLoading},on:{click:t.goLogin}},[t._v(t._s(t.loginLoading?"Please Wait":"LOGIN"))])],1)])])])])],2)},a=[],s=(o("99af"),o("caad"),o("b0c0"),o("a9e3"),o("4d63"),o("ac1f"),o("25f0"),o("2532"),o("5319"),o("841c"),o("159b"),o("b39c")),r=o("c942"),n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"categories-nav",class:{more:t.showMore}},[o("h2",{attrs:{title:"ALL CATEGORIES"}},[t._v("Categories")]),o("ul",{staticClass:"c-nav"},[t._l(t.categories,(function(e,i){return[i<10||t.showMore?o("li",{key:e.id},[o("router-link",{staticClass:"c-link",attrs:{title:e.name,to:{path:"/category/"+e.id+"/"+e.name.replace(/\s+/g,"-")+".html"}},nativeOn:{click:function(o){return t.categoryRecord(e.id,e.name,1)}}},[o("div",{staticClass:"left"},[o("i",{staticClass:"c-icon",class:"c-"+e.id}),o("span",{staticClass:" tx-ellipsis1"},[t._v(t._s(e.name))])]),o("i",{staticClass:"fa fa-angle-right",staticStyle:{"margin-left":"15px"},attrs:{"aria-hidden":"true"}})]),e.list&&0!=e.list.length?o("div",{staticClass:"sub-menu"},[o("ul",{staticClass:"l1"},[t._l(e.list,(function(e){return[o("li",{key:e.id},[o("router-link",{attrs:{to:{path:"/category/"+e.id+"/"+e.name.replace(/\s+/g,"-")+".html"},title:e.name},nativeOn:{click:function(o){return t.categoryRecord(e.id,e.name,2)}}},[t._v(t._s(e.name))]),e.list&&e.list.length?o("ul",{staticClass:"l2"},t._l(e.list,(function(e){return o("li",{key:e.id},[o("router-link",{attrs:{to:{path:"/category/"+e.id+"/"+e.name.replace(/\s+/g,"-")+".html"},title:e.name},nativeOn:{click:function(o){return t.categoryRecord(e.id,e.name,2)}}},[t._v(t._s(e.name))])],1)})),0):t._e()],1)]}))],2)]):t._e()],1):t._e()]}))],2),t.categories&&t.categories.length>9?o("div",{staticClass:"more"},[o("a",{attrs:{href:"javascript:;"},on:{click:t.moreChange}},[o("i",{staticClass:"fa ",class:t.showMore?"fa-minus-square-o":"fa-plus-square-o",attrs:{"aria-hidden":"true"}}),o("span",[t._v(t._s(t.showMore?"Collapse":"More"))])])]):t._e()])},l=[],c={props:["categories"],data:function(){return{showMore:!1}},methods:{categoryRecord:function(t,e,o){localStorage.setItem("c_buryResource","category"),1==o?this.$Burying({object:"5002",objectId:t,objectUrl:e}):2==o&&this.$Burying({object:"5003",objectId:t,objectUrl:e})},moreChange:function(){this.showMore=!this.showMore}}},u=c,d=(o("9547"),o("2877")),g=Object(d["a"])(u,n,l,!1,null,"a5680c26",null),p=g.exports,h=o("8214"),m=o("d8f7"),f={props:{},data:function(){return{setting:null,headerMenu:[],code:{header:[],footer:[]},nameS:"",header2Visible:!1,time:0,loginLoading:!1,shopUrl:"",categoryId:null,centerDialogVisible:!1,name:"",items:[],commodityTypeMoreList:[],page:this.$route.query.page?Number(this.$route.query.page):"1",rowsPerPage:localStorage.getItem("c_importPerPage")?Number(localStorage.getItem("c_importPerPage")):12,pageSizes:[12,24,48],total:0,totalPage:0,input:"",content:"",loading:!0,allLoading:!0,ball:{x:window.innerWidth/2,y:window.innerHeight/2,opacity:0},c_apiShopId:JSON.parse(localStorage.getItem("c_apiShopId"))}},computed:{product:function(){var t=this,e="";return this.commodityTypeMoreList.forEach((function(o){o.id==t.categoryId&&(e=o.name)})),e},activeCategory:function(){var t,e,o,i,a=this;return!!this.commodityTypeMoreList&&("0"==this.$route.params.id?{L:1,l1:{id:0,name:"All Categories"},l2:void 0,l3:void 0}:(this.commodityTypeMoreList&&this.commodityTypeMoreList.length&&this.commodityTypeMoreList.some((function(s){if(s.id==a.$route.params.id)return t=1,e=s,!0;s.list&&s.list.some((function(r){if(r.id==a.$route.params.id)return t=2,e=s,o=r,!0;r.list&&r.list.some((function(n){if(n.id==a.$route.params.id)return t=3,e=s,o=r,i=n,!0}))}))})),{L:t,l1:e,l2:o,l3:i}))}},beforeDestroy:function(){clearInterval(this.time)},created:function(){var t=this;this.setting=localStorage.getItem("c_shopConfigJson")?JSON.parse(localStorage.getItem("c_shopConfigJson")):null,this.setting&&this.setting.customCode&&this.setting.customCode.length&&this.setting.customCode.forEach((function(e){e.pages.includes("搜索结果页")&&("底部"==e.position&&t.code.footer.push(e.desc),"顶部"==e.position&&t.code.header.push(e.desc))}))},mounted:function(){var t=this;this.$root.$children[0].getParentUrl()&&this.$root.$children[0].getParentUrl().indexOf("vendor")>=0||this.$root.$children[0].checkLogin(),this.header2Visible=$(window).scrollTop()>70,$(window).scroll((function(){t.header2Visible=$(window).scrollTop()>70})),this.$route.query.search&&(this.categoryId=this.$route.params.id),this.input=this.$route.query.input,this.content=this.input,this.getCategory(),document.title="".concat(this.$route.params.name.replace(".html","")," How to find :: ").concat(this.$root.$children[0].pName.b," - Easy Dropshipping")},components:{homeHeader:s["a"],Footer:r["a"],Categories:p,DHeader:h["a"],DFooter:m["a"]},watch:{"setting.header.activeMenu":{handler:function(){this.getMenu()},deep:!0},$route:"gotoPage"},methods:{getMenu:function(){var t=this;this.setting.header.activeMenu&&this.setting.menu.forEach((function(e){e.id==t.setting.header.activeMenu&&(t.headerMenu=e)}))},gotoCategory:function(t){1==t?this.$router.push("/category/".concat(this.activeCategory.l1.id,"/").concat(this.activeCategory.l1.name.replace(/\s+/g,"-"),".html")):this.$router.push("/category/".concat(this.activeCategory.l2.id,"/").concat(this.activeCategory.l2.name.replace(/\s+/g,"-"),".html"))},storeInput:function(t){for(var e=new RegExp("[A-Za-z0-9-_]+"),o=t.length,i="",a=0;a<o;a++)e.test(t[a])&&(i+=t[a]);this.shopUrl=i},getLoginStatus:function(){var t=this;this.$apiCall("api.ShopifyAccount.getShopAuthStatus",{shopUrl:this.shopUrl},(function(e){"9999"==e.ErrorCode?e.Data.Results.status&&(clearInterval(t.time),1==e.Data.Results.status?(localStorage.getItem("c_ourMallFirstLogin")?localStorage.setItem("c_ourMallFirstLogin",2):localStorage.setItem("c_ourMallFirstLogin",1),localStorage.setItem("c_apiUserId",e.Data.Results.userInfo.id),localStorage.setItem("c_apiUserToken",e.Data.Results.userInfo.apiUserToken),localStorage.setItem("c_ourMallUserInfo",JSON.stringify(e.Data.Results.userInfo)),t.$store.commit("setUserInfo",e.Data.Results.userInfo),t.$router.push({name:"more",query:t.$route.query}),t.win.close()):(t.loginLoading=!1,t.$elementMessage(e.Data.Results.errorMessage,"error"),setTimeout((function(){window.location.reload()}),1e3),t.win.close())):(clearInterval(t.time),t.$elementMessage(e.Message,"error"))}))},goLogin:function(){var t=this;if(!this.shopUrl)return this.$elementMessage("Please enter Shopify store name","error"),!1;this.win=window.open("/blank.html","Shopify"),this.loginLoading=!0,this.$apiCall("api.ShopifyAccount.addShopifyAccount",{shopUrl:this.shopUrl,getAuth:1,ivc:localStorage.getItem("c_ivc")?localStorage.getItem("c_ivc"):"",utmSource:localStorage.getItem("c_utm")},(function(e){"9999"==e.ErrorCode?(t.win.location=e.Data.Results,t.time=setInterval((function(){t.getLoginStatus()}),2e3)):t.$elementMessage(e.Message,"error")}))},closeLogin:function(){this.shopUrl="",this.loginLoading=!1},handleCommand:function(t){switch(t){case"exit":this.$Logout("/");break;case"profile":this.$router.push({name:"profile"});break;case"dashboard":if(121173==this.c_apiShopId){var e=JSON.parse(localStorage.getItem("isValidationCW"));if(!e)return void(this.isValidationCWDialog=!0)}this.$router.push({name:"dashboard"});break}},login:function(){localStorage.getItem("c_ourMallUserInfo")?this.$router.push({name:"dashboard"}):this.$router.push({name:"login"})},gotoLogin:function(){if(!this.shopUrl)return this.$elementMessage("Please enter Shopify store name","error"),!1;localStorage.getItem("c_ourMallUserInfo")?this.$router.push({name:"stores",params:{add:!0,val:this.shopUrl}}):this.$router.push({name:"login",params:{shopUrl:this.shopUrl}})},getCategory:function(){var t=this;this.$apiCall("api.ProductCategory.findByVendorRelateCategory",{},(function(e){9999==e.ErrorCode&&(t.commodityTypeMoreList=e.Data.Results,t.getItems())}))},getItems:function(){var t=this;this.loading=!0,this.allLoading=!0,"ALL-CATEGORIES"==this.categoryId&&(this.categoryId=""),this.commodityTypeMoreList.forEach((function(e){e.name==t.categoryId&&(t.categoryId=e.id)})),this.$apiCall("api.VendorShop.vendorFindProducts",{name:this.input,categoryId:this.$route.params.id,page:this.page,rowsPerPage:this.rowsPerPage,status:1},(function(e){9999==e.ErrorCode?(t.commodityTypeMoreList.forEach((function(e){e.id==t.categoryId&&(t.name=e.name,t.categoryId=e.name)})),t.items=e.Data.Results.products,t.total=e.Data.Pagination.totalCount,t.totalPage=e.Data.Pagination.totalPage,t.allLoading=!1,t.loading=!1,document.body.scrollTop=document.documentElement.scrollTop=0):(t.allLoading=!1,t.$elementMessage(e.Message,"error"))}))},search:function(){var t=this;this.content=this.input,this.commodityTypeMoreList.forEach((function(e){e.name==t.categoryId&&(t.nameS=e.id)})),this.nameS||(this.nameS=this.categoryId),""==this.categoryId?this.$router.push({path:"/category/ALL-CATEGORIES/".concat(this.content,".html"),query:{input:this.content,search:!0}}):this.$router.push({path:"/category/".concat(this.nameS,"/").concat(this.content,".html"),query:{input:this.content}}),this.page=1,this.nameS=""},changePageSize:function(t){this.rowsPerPage=t,localStorage.setItem("c_importPerPage",t),this.getItems()},gotoPage:function(){this.page=this.$route.query.page?this.$route.query.page:1,this.input=this.$route.query.input,this.getItems()},toPage:function(t){if(t!=this.$route.query.page){var e={},o="";o=this.$route.params.id,e.page=t,e.input=this.content,""==this.categoryId?this.$router.push({path:"/category/ALL-CATEGORIES/.html",query:e}):this.$router.push({path:"/category/".concat(o,"/").concat(this.$route.params.name),query:e})}},goToDetail:function(t){var e=localStorage.getItem("apiUserId");150488==e?window.open("/item/".concat(t.id,"/").concat(t.name.replace(/\s+/g,"-").replace(/[^\w]/g,"_"),".html")):window.open("/itemOld/".concat(t.id,"/").concat(t.name.replace(/\s+/g,"-").replace(/[^\w]/g,"_"),".html"))},import_pro:function(t,e){var o=this;this.$store.state.userInfo?this.$apiCall("api.Product.addFromVendorShopProduct",{id:t.id},(function(e){9999==e.ErrorCode?(t.hasImport=1,t.imports++,o.$root.$children[0].importNum++,o.$message.success("Import Success !")):o.$message.error(e.Message)})):this.$root.$children[0].openDialogLogin()}}},y=f,v=(o("12b0"),o("39f7"),o("aba9"),Object(d["a"])(y,i,a,!1,null,"7cef0b1a",null));e["default"]=v.exports},a996:function(t,e,o){"use strict";o("f7c2")},aba9:function(t,e,o){"use strict";o("4a58")},b39c:function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"home-header"},[o("router-link",{attrs:{to:"/"}},[o("h1",{style:{backgroundImage:"url("+t.$store.state.shopInfo.logo+")"}})]),o("div",{staticClass:"right"},[o("ul",[o("li",[o("router-link",{class:{active:"home"==t.$route.name},attrs:{to:"/"}},[t._v("Home")])],1),o("li",[o("router-link",{attrs:{to:"/products-market"}},[t._v("Find Products")])],1),t.$store.state.userInfo?[o("li",{staticClass:"import-link"},[o("router-link",{attrs:{to:"/import-list"}},[o("i",[this.$root.$children[0].importNum?o("i",{staticClass:"badge"},[t._v(t._s(this.$root.$children[0].importNum>99?"99+":this.$root.$children[0].importNum))]):t._e()]),t._v(" My Import List ")])],1),o("li",[o("el-dropdown",{on:{command:t.handleCommand}},[o("span",{staticClass:"el-dropdown-link"},[o("i",{staticClass:"user-i"}),o("span",{staticClass:"name tx-ellipsis1"},[t._v(t._s(t.$store.state.userInfo.name))]),o("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),o("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[o("el-dropdown-item",{staticClass:"align-items-endd-flex",staticStyle:{width:"150px"},attrs:{command:"dashboard"}},[o("i",{staticClass:"mg-r-15 fa fa-user-o",attrs:{"aria-hidden":"true"}}),t._v(" My Profile ")]),o("el-dropdown-item",{staticClass:"d-flex",staticStyle:{width:"150px"},attrs:{command:"exit"}},[o("i",{staticClass:"mg-r-15 fa fa-sign-out",attrs:{"aria-hidden":"true"}}),t._v(" Logout ")])],1)],1)],1)]:[o("li",[o("a",{attrs:{href:"javascript:;"},on:{click:t.openDialogLogin}},[t._v("Login")])]),o("li",{staticClass:"reg"},[o("a",{attrs:{href:"javascript:;"},on:{click:t.openRegister}},[t._v("Register")])])]],2)])],1)},a=[],s={data:function(){return{c_apiShopId:JSON.parse(localStorage.getItem("c_apiShopId"))}},methods:{handleCommand:function(t){switch(t){case"exit":localStorage.removeItem("c_wantVisitPath"),this.$Logout("/");break;case"profile":this.$router.push({name:"profile"});break;case"dashboard":if(121173==this.c_apiShopId){var e=JSON.parse(localStorage.getItem("isValidationCW"));if(!e)return void(this.isValidationCWDialog=!0)}this.$router.push({name:"dashboard"});break}},openDialogLogin:function(){this.$root.$children[0].openDialogLogin()},openRegister:function(){this.$root.$children[0].openDialogRegister()}}},r=s,n=(o("ecc6"),o("2877")),l=Object(n["a"])(r,i,a,!1,null,"ace027c8",null);e["a"]=l.exports},c942:function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"home-footer"},[o("div",{staticClass:"content"},[o("div",{staticClass:"left"},[o("p",{staticClass:"r1 title"},[t._v("Make dropshipping easy with "+t._s(t.$root.$children[0].pName.a)+".")]),o("p",{staticClass:"r2"},[t._v(" Ourmall is designed for customers with need for drop-shipping, it can easily Allocate store orders to your vendors, and your store orders could be automatically completed. ")])]),"shopify"==t.$route.name?o("div",{staticClass:"right"},[o("ul",[o("li",{staticStyle:{"margin-right":"70px"}},[o("div",{staticClass:"t title"},[t._v("Company")]),o("div",{staticClass:"m"},[o("span",[t._v("Privacy policy")]),o("span",[t._v("Terms of use")]),o("router-link",{attrs:{to:{name:"contact"}}},[t._v("Contact Us")])],1)]),o("li",{staticStyle:{margin:"0"}},[o("div",{staticClass:"t title"},[t._v("Getting Started")]),o("div",{staticClass:"m"},[o("router-link",{attrs:{to:{path:"/article/How-to-install-OurMall-Dropshipping-App?",query:{id:3}}}},[t._v("How to install "+t._s(t.$root.$children[0].pName.a)+"?")]),o("router-link",{attrs:{to:{path:"/article/How-to-dispatch-my-Shopify-orders-to-my-vendors?",query:{id:5}}}},[t._v("How to allocate my orders?")]),o("router-link",{attrs:{to:{path:"/article/How-to-auto-fulfill-orders?",query:{id:6}}}},[t._v("How to auto fulfill orders?")]),o("router-link",{attrs:{to:{path:"/article/Connect-several-Shopify-stores-in-one-OurMall-account",query:{id:7}}}},[t._v("Connect several Shopify stores")])],1)])])]):t._e()]),t._m(0)])},a=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"footLogo"},[o("div",{staticClass:"d-flex"},[o("span",{staticStyle:{"margin-top":"14px"}},[t._v(" © 2021, Powered by OurMall ")])])])}],s=(o("3032"),o("2877")),r={},n=Object(s["a"])(r,i,a,!1,null,"11c9dfc3",null);e["a"]=n.exports},d8f7:function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return/^(selectionTrend)$/.test(t.$route.name)?t._e():i("footer",{style:{paddingTop:t.$store.state.configJson.sort.length>0?"":"120px"},attrs:{id:"settingPageFooter"}},[t.setting.contentConfig.scribeUsed&&t.setting.content.length&&"scribe"==t.setting.content[0].type?i("div",{staticClass:"submit-email"},[i("div",{staticClass:"content",style:{backgroundColor:t.setting.content[0].bgColor}},[i("div",{staticClass:"row-1"},[i("h3",{style:{color:t.setting.content[0].titleColor}},[t._v(t._s(t.setting.content[0].title||"Subscribe to our newsletter"))]),i("p",{staticClass:"sub-t",style:{color:t.setting.content[0].textColor}},[t._v(t._s(t.setting.content[0].desc||"Promotions, new products and sales. Directly to your inbox."))])]),i("div",{staticClass:"row-2"},[i("div",{staticClass:"l-ipt"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"text",placeholder:t.setting.content[0].placeholder||"Your email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),i("button",{attrs:{rel:"nofollow"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submitSubscribe()},click:function(e){return t.submitSubscribe()}}},[i("i",{staticClass:"iconfont icon-loading"}),t._v(" "+t._s(t.setting.content[0].btnText||"Subscribe")+" ")])])])])]):t._e(),t.setting.contentConfig.companyUsed||t.setting.contentConfig.socalUsed||t.setting.contentConfig.aboutUsed?i("div",{staticClass:"bottom-row-2",style:{backgroundColor:t.setting.backgroundColor}},[i("div",{staticClass:"content",style:{width:t.setting.footerWidth?t.setting.footerWidth:"1420px"}},[t._l(t.setting.content,(function(e,a){return["scribe"==e.type&&t.setting.contentConfig.scribeUsed&&0!=a?i("div",{key:a,staticClass:"c-3"},[i("div",{staticClass:"text"},[i("h3",{style:{color:t.setting.titleColor}},[t._v(t._s(e.title||"Subscribe to our newsletter"))]),i("p",{staticClass:"sub-t",style:{color:t.setting.wordColor}},[t._v(t._s(e.desc||"Promotions, new products and sales. Directly to your inbox."))])]),i("div",{staticClass:"btn"},[i("div",{staticClass:"l-ipt"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"text",placeholder:e.placeholder||"Your email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),i("button",{attrs:{rel:"nofollow"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submitSubscribe()},click:function(e){return t.submitSubscribe()}}},[i("i",{staticClass:"iconfont icon-loading"}),t._v(" "+t._s(e.btnText||"Subscribe")+" ")])])])]):t._e(),"company"==e.type&&t.setting.contentConfig.companyUsed?i("div",{key:a,staticClass:"c-1"},[i("h2",{staticClass:"logo"},[t.setting.companyLogo?i("img",{attrs:{src:t.setting.companyLogo,alt:""}}):t._e(),t.setting.companyLogo?t._e():i("img",{attrs:{src:o("dd13"),alt:""}})]),i("h3",{style:{color:t.setting.titleColor}},[t._v("Company Information")]),i("div",{staticClass:"contact-row",style:{color:t.setting.wordColor,textAlign:e.align},domProps:{innerHTML:t._s(e.content)}})]):t._e(),"about"==e.type&&t.setting.contentConfig.aboutUsed?i("div",{key:a,staticClass:"c-2"},[i("dl",[e.title?i("dt",{style:{color:t.setting.titleColor}},[t._v(t._s(e.title))]):t._e(),i("dd",{style:{color:t.setting.wordColor,textAlign:e.align},domProps:{innerHTML:t._s(e.content)}})])]):t._e(),"navigate"==e.type&&t.setting.contentConfig.navigateUsed?i("div",{key:a,staticClass:"c-2"},[i("dl",[e.title?i("dt",{style:{color:t.setting.titleColor}},[t._v(t._s(e.title))]):t._e(),t._l(e.menu,(function(e,o){return i("dd",{key:o},["9999"==e.link.value?i("a",{style:{color:t.setting.wordColor},attrs:{href:"javascript:;"}},[t._v(" "+t._s(e.name)+" ")]):"9998"==e.link.value?i("a",{style:{color:t.setting.wordColor},attrs:{href:"javascript:;"},on:{click:function(o){return t.gotoUrl(e.url)}}},[t._v(" "+t._s(e.name)+" ")]):i("a",{style:{color:t.setting.wordColor},attrs:{href:"javascript:;"},on:{click:function(o){return t.goto(e.link.url)}}},[t._v(" "+t._s(e.name)+" ")])])}))],2)]):t._e(),"socal"==e.type&&t.setting.contentConfig.socalUsed?i("div",{key:a,staticClass:"c-2",staticStyle:{"margin-right":"0",windth:"200px"}},[i("dl",[i("dt",{style:{color:t.setting.titleColor}},[t._v("OUR SOCIAL MEDIA")]),i("dd",[i("div",{staticClass:"d-flex"},[e.facebook?i("a",{staticStyle:{"margin-right":"20px"},style:{color:t.setting.wordColor},attrs:{href:e.facebook,target:"_blank",rel:"nofollow"}},[i("i",{staticClass:"fa fa-facebook",staticStyle:{"font-size":"20px"}})]):t._e(),e.youtube?i("a",{staticStyle:{"margin-right":"20px"},style:{color:t.setting.wordColor},attrs:{href:e.youtube,target:"_blank",rel:"nofollow"}},[i("i",{staticClass:"fa fa-youtube-play",staticStyle:{"font-size":"20px"}})]):t._e(),e.instagram?i("a",{style:{color:t.setting.wordColor},attrs:{href:e.instagram,target:"_blank",rel:"nofollow"}},[i("i",{staticClass:"fa fa-instagram",staticStyle:{"font-size":"20px"}})]):t._e(),e.line?i("a",{staticStyle:{"margin-left":"15px"},style:{color:t.setting.wordColor},attrs:{href:e.line,target:"_blank",rel:"nofollow"}},[i("i",{staticClass:"iconfont icon-line",staticStyle:{"font-size":"22px"}})]):t._e()])])])]):t._e()]}))],2)]):t._e(),t.setting.ourmall?i("div",{staticClass:"bottom-row-copyright"},[i("span",[t._v("© 2021 Supplier store name Powered by OurMall.")]),t._v(" | "),i("span",{staticClass:"ban"},[i("a",{attrs:{href:"https://beian.miit.gov.cn",target:"_blank"}},[t._v(t._s(t.number||""))])])]):t._e()])},a=[],s={props:["setting"],data:function(){return{email:"",number:sessionStorage.getItem("filingNumber")}},mounted:function(){},methods:{gotoUrl:function(t){this.$store.state.userInfo?window.location.href=t:"home"!=t&&"products-market"!=t?-1!=t.indexOf("http")?window.location.href=t:this.openDialogLogin():window.location.href=t},goto:function(t){this.$store.state.userInfo?this.$router.push({name:t}):"home"!=t&&"productsMarketHome"!=t?this.openDialogLogin():this.$router.push({name:t})},openDialogLogin:function(){this.$root.$children[0].openDialogLogin()},openRegister:function(){this.$root.$children[0].openDialogRegister()},submitSubscribe:function(){var t=this;this.email&&(this.$showLoading(),this.$apiCall("api.Market.subscribe",{email:this.email},(function(e){9999==e.ErrorCode?(t.email="",t.$message.success("Email Submitted Successfully !")):t.$message.error(e.Message),t.$hideLoading()})))}}},r=s,n=(o("a996"),o("2877")),l=Object(n["a"])(r,i,a,!1,null,"6274202f",null);e["a"]=l.exports},d975:function(t,e,o){},dd13:function(t,e,o){t.exports=o.p+"img/logoNew.994d0ff0.png"},dfbf:function(t,e,o){},ecc6:function(t,e,o){"use strict";o("6afc")},f7c2:function(t,e,o){}}]);
//# sourceMappingURL=storesMore.038751f3.js.map