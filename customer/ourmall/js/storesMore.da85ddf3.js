(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["storesMore"],{"18d3":function(t,e,a){},2314:function(t,e,a){t.exports=a.p+"img/none.56197834.png"},"2bae":function(t,e,a){},3032:function(t,e,a){"use strict";a("5608")},5608:function(t,e,a){},"6e51":function(t,e,a){"use strict";a("2bae")},9978:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"home-page"},[t.code&&t.code.header&&t.code.header.length>0?t._l(t.code.header,(function(e,a){return i("div",{key:a,domProps:{innerHTML:t._s(e)}})})):t._e(),i("div",{staticStyle:{position:"relative",height:"130px"}},[i("DHeader",{attrs:{data:t.setting&&t.setting.header||"",headerMenu:t.headerMenu}})],1),i("div",[i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.allLoading,expression:"allLoading"}],staticClass:"contentpanel box"},[i("div",{staticClass:"pagetitle"},[i("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/products-market"}}},[t._v(" Products Market ")]),t.activeCategory.l1?i("el-breadcrumb-item",[t.activeCategory.L>1?i("a",{on:{click:function(e){return t.gotoCategory(1)}}},[t._v(t._s(t.activeCategory.l1.name))]):i("a",{attrs:{href:"javascript:;"}},[t._v(t._s(t.activeCategory.l1.name))])]):t._e(),t.activeCategory.l2?i("el-breadcrumb-item",[t.activeCategory.L>2?i("a",{on:{click:function(e){return t.gotoCategory(2)}}},[t._v(t._s(t.activeCategory.l2.name))]):i("a",{attrs:{href:"javascript:;"}},[t._v(t._s(t.activeCategory.l2.name))])]):t._e(),t.activeCategory.l3?i("el-breadcrumb-item",[i("a",{attrs:{href:"javascript:;"}},[t._v(t._s(t.activeCategory.l3.name))])]):t._e()],1)],1),i("div",{staticStyle:{display:"flex",width:"100%"}},[i("div",[i("Categories",{attrs:{categories:t.commodityTypeMoreList}}),i("div",{staticClass:"filter-box"},[i("div",{staticClass:"box-card"},[i("p",{staticClass:"price"},[t._v("Unit Price")]),i("div",[i("el-input",{staticStyle:{width:"60px"},attrs:{placeholder:"Min"},model:{value:t.min,callback:function(e){t.min=e},expression:"min"}},[i("span",{attrs:{slot:"prefix"},slot:"prefix"},[t._v("$")])]),i("span",[t._v(" — ")]),i("el-input",{staticStyle:{width:"60px"},attrs:{placeholder:"Max"},model:{value:t.max,callback:function(e){t.max=e},expression:"max"}},[i("span",{attrs:{slot:"prefix"},slot:"prefix"},[t._v("$")])]),i("el-button",{attrs:{type:"primary"},on:{click:t.searchPrice}},[t._v("GO")])],1),i("el-divider"),i("p",{staticClass:"price"},[t._v("Qty Available")]),i("div",[i("el-input",{staticStyle:{width:"60px"},attrs:{placeholder:"Min"},model:{value:t.minQty,callback:function(e){t.minQty=e},expression:"minQty"}}),i("span",[t._v(" — ")]),i("el-input",{staticStyle:{width:"60px"},attrs:{placeholder:"Max"},model:{value:t.maxQty,callback:function(e){t.maxQty=e},expression:"maxQty"}}),i("el-button",{attrs:{type:"primary"},on:{click:t.searchPrice}},[t._v("GO")])],1),i("el-divider"),i("div",{staticClass:"top-title"},[i("p",{staticClass:"price"},[t._v("First Available")]),i("span",{on:{click:t.restDay}},[t._v("Clear")])]),i("div",[i("el-radio-group",{on:{change:t.searchPrice},model:{value:t.radioDay,callback:function(e){t.radioDay=e},expression:"radioDay"}},[i("div",[i("el-radio",{attrs:{label:7}},[t._v("Last 7 days")])],1),i("div",[i("el-radio",{attrs:{label:14}},[t._v("Last 14 days")])],1),i("div",[i("el-radio",{attrs:{label:30}},[t._v("Last 30 days")])],1)])],1)],1)])],1),t.items&&0==t.items.length?i("div",{staticStyle:{flex:"1"}},[i("div",{staticClass:"top-filter-box"},[i("span",[t._v(" Sort by")]),t._l(t.btnList,(function(e,a){return i("div",{key:a,staticClass:"right",on:{click:function(i){return t.change(e,a)}}},[t._v(t._s(e.label)+" "),i("div",{staticClass:"box-icon-top"},[i("div",{staticClass:"up",class:1===e.status?"opacity-5":""}),i("div",{staticClass:"down",class:1===e.status?"opacity-1":""})])])}))],2),i("el-card",{staticClass:"mg-l-20",staticStyle:{width:"auto"}},[i("div",{staticClass:"noProduct"},[i("img",{attrs:{src:a("2314")}}),i("b",{staticClass:"mg-t-10"},[t._v("There are no products in this category")])])])],1):i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{flex:"1"}},[i("div",{staticClass:"top-filter-box"},[i("span",[t._v(" Sort by")]),t._l(t.btnList,(function(e,a){return i("div",{key:a,staticClass:"right",on:{click:function(i){return t.change(e,a)}}},[t._v(t._s(e.label)+" "),i("div",{staticClass:"box-icon-top"},[i("div",{staticClass:"up",class:1===e.status?"opacity-5":""}),i("div",{staticClass:"down",class:1===e.status?"opacity-1":""})])])}))],2),i("div",{staticClass:"list"},t._l(t.items,(function(e){return i("div",{key:e.id,staticClass:"pro_box",staticStyle:{"margin-bottom":"10px"}},[i("div",{staticClass:"pro_img",staticStyle:{height:"194px"}},[i("el-image",{staticStyle:{width:"100%",cursor:"pointer",height:"100%"},attrs:{fit:"contain",src:e.imgUrl},on:{click:function(a){return t.goToDetail(e)}}})],1),i("div",{staticStyle:{padding:"16px 10px"}},[i("div",{staticClass:"pro_name",on:{click:function(a){return t.goToDetail(e)}}},[i("a",{attrs:{href:"javascript:;"}},[t._v(t._s(e.name))])]),i("b",{staticClass:"pro_cost"},[t._v(t._s(t.$store.state.country.symbol)+" "+t._s(e.minPrice===e.maxPrice?e.minPrice:e.minPrice+"~"+e.maxPrice+" "))]),i("p",{directives:[{name:"show",rawName:"v-show",value:e.estimatedLeadTimeType,expression:"item.estimatedLeadTimeType"}]},[t._v("about: "+t._s(e.estimatedLeadTimeMinValue)+"-"+t._s(e.estimatedLeadTimeMaxValue)+t._s(e.estimatedLeadTimeType))])])])})),0)])])]),t.items.length?i("el-row",{staticStyle:{margin:"20px 0"},attrs:{gutter:20}},[i("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[i("div",[i("el-pagination",{attrs:{"current-page":Number(t.page),background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":t.pageSizes,"page-size":t.rowsPerPage,total:Number(t.total)},on:{"current-change":t.toPage,"size-change":t.changePageSize}})],1)])],1):t._e(),i("div",{staticClass:"ball",style:{top:t.ball.y+"px",left:t.ball.x+"px",opacity:t.ball.opacity}}),i("el-backtop",{staticClass:"goto-top",attrs:{right:32,bottom:120}})],1),i("DFooter",{attrs:{setting:t.$store.state.configJson&&t.$store.state.configJson.footer||""}}),t.code&&t.code.footer&&t.code.footer.length>0?t._l(t.code.footer,(function(e,a){return i("div",{key:a,domProps:{innerHTML:t._s(e)}})})):t._e(),i("el-dialog",{attrs:{visible:t.centerDialogVisible,width:"30%",center:""},on:{"update:visible":function(e){t.centerDialogVisible=e},close:t.closeLogin}},[i("div",{staticClass:"login-page"},[i("div",{staticClass:"login-box"},[i("div",{staticClass:"box mg-b-5"},[i("p",[t._v("Please enter your shopify store name to connect the dashboard page:")]),i("div",{staticClass:"mg-b-30"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.shopUrl,expression:"shopUrl"}],attrs:{type:"text",placeholder:"Shopify store name"},domProps:{value:t.shopUrl},on:{input:[function(e){e.target.composing||(t.shopUrl=e.target.value)},function(e){return t.storeInput(e.target.value)}],keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.goLogin(e)}}}),i("span",[t._v(".myshopify.com")])]),i("div",[i("el-button",{staticClass:"login-btn",attrs:{loading:t.loginLoading},on:{click:t.goLogin}},[t._v(t._s(t.loginLoading?"Please Wait":"LOGIN"))])],1)])])])])],2)},s=[],o=(a("99af"),a("caad"),a("b0c0"),a("a9e3"),a("4d63"),a("ac1f"),a("25f0"),a("2532"),a("5319"),a("841c"),a("159b"),a("b39c")),r=a("c942"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"categories-nav",class:{more:t.showMore}},[a("h2",{attrs:{title:"ALL CATEGORIES"}},[t._v("Categories")]),a("ul",{staticClass:"c-nav"},[t._l(t.categories,(function(e,i){return[i<10||t.showMore?a("li",{key:e.id},[a("router-link",{staticClass:"c-link",attrs:{title:e.name,to:{path:"/category/"+e.id+"/"+e.name.replace(/\s+/g,"-")+".html"}},nativeOn:{click:function(a){return t.categoryRecord(e.id,e.name,1)}}},[a("div",{staticClass:"left"},[a("i",{staticClass:"c-icon",class:"c-"+e.id}),a("span",{staticClass:" tx-ellipsis1"},[t._v(t._s(e.name))])]),a("i",{staticClass:"fa fa-angle-right",staticStyle:{"margin-left":"15px"},attrs:{"aria-hidden":"true"}})]),e.list&&0!=e.list.length?a("div",{staticClass:"sub-menu"},[a("ul",{staticClass:"l1"},[t._l(e.list,(function(e){return[a("li",{key:e.id},[a("router-link",{attrs:{to:{path:"/category/"+e.id+"/"+e.name.replace(/\s+/g,"-")+".html"},title:e.name},nativeOn:{click:function(a){return t.categoryRecord(e.id,e.name,2)}}},[t._v(t._s(e.name))]),e.list&&e.list.length?a("ul",{staticClass:"l2"},t._l(e.list,(function(e){return a("li",{key:e.id},[a("router-link",{attrs:{to:{path:"/category/"+e.id+"/"+e.name.replace(/\s+/g,"-")+".html"},title:e.name},nativeOn:{click:function(a){return t.categoryRecord(e.id,e.name,2)}}},[t._v(t._s(e.name))])],1)})),0):t._e()],1)]}))],2)]):t._e()],1):t._e()]}))],2),t.categories&&t.categories.length>9?a("div",{staticClass:"more"},[a("a",{attrs:{href:"javascript:;"},on:{click:t.moreChange}},[a("i",{staticClass:"fa ",class:t.showMore?"fa-minus-square-o":"fa-plus-square-o",attrs:{"aria-hidden":"true"}}),a("span",[t._v(t._s(t.showMore?"Collapse":"More"))])])]):t._e()])},c=[],l={props:["categories"],data:function(){return{showMore:!1}},methods:{categoryRecord:function(t,e,a){localStorage.setItem("c_buryResource","category"),1==a?this.$Burying({object:"5002",objectId:t,objectUrl:e}):2==a&&this.$Burying({object:"5003",objectId:t,objectUrl:e})},moreChange:function(){this.showMore=!this.showMore}}},d=l,u=(a("efa3"),a("2877")),h=Object(u["a"])(d,n,c,!1,null,"259133fb",null),p=h.exports,g=a("8214"),m=a("d8f7"),f={props:{},data:function(){return{setting:null,min:"",max:"",minQty:"",maxQty:"",radioDay:"",filterUItem:{},headerMenu:[],code:{header:[],footer:[]},btnList:[{label:"Price",status:0},{label:"Stock Qty",status:0}],nameS:"",checkQty:"asc",checkSort:"",header2Visible:!1,time:0,loginLoading:!1,shopUrl:"",categoryId:null,centerDialogVisible:!1,name:"",items:[],commodityTypeMoreList:[],page:this.$route.query.page?Number(this.$route.query.page):"1",rowsPerPage:localStorage.getItem("c_importPerPage")?Number(localStorage.getItem("c_importPerPage")):12,pageSizes:[12,24,48],total:0,totalPage:0,input:"",content:"",loading:!0,allLoading:!0,ball:{x:window.innerWidth/2,y:window.innerHeight/2,opacity:0},c_apiShopId:JSON.parse(localStorage.getItem("c_apiShopId"))}},computed:{product:function(){var t=this,e="";return this.commodityTypeMoreList.forEach((function(a){a.id==t.categoryId&&(e=a.name)})),e},activeCategory:function(){var t,e,a,i,s=this;return!!this.commodityTypeMoreList&&("0"==this.$route.params.id?{L:1,l1:{id:0,name:"All Categories"},l2:void 0,l3:void 0}:(this.commodityTypeMoreList&&this.commodityTypeMoreList.length&&this.commodityTypeMoreList.some((function(o){if(o.id==s.$route.params.id)return t=1,e=o,!0;o.list&&o.list.some((function(r){if(r.id==s.$route.params.id)return t=2,e=o,a=r,!0;r.list&&r.list.some((function(n){if(n.id==s.$route.params.id)return t=3,e=o,a=r,i=n,!0}))}))})),{L:t,l1:e,l2:a,l3:i}))}},beforeDestroy:function(){clearInterval(this.time)},created:function(){var t=this;this.setting=localStorage.getItem("c_shopConfigJson")?JSON.parse(localStorage.getItem("c_shopConfigJson")):null,this.setting&&this.setting.customCode&&this.setting.customCode.length&&this.setting.customCode.forEach((function(e){e.pages.includes("搜索结果页")&&("底部"==e.position&&t.code.footer.push(e.desc),"顶部"==e.position&&t.code.header.push(e.desc))}))},mounted:function(){var t=this;this.$root.$children[0].getParentUrl()&&this.$root.$children[0].getParentUrl().indexOf("vendor")>=0||this.$root.$children[0].checkLogin(),this.header2Visible=$(window).scrollTop()>70,$(window).scroll((function(){t.header2Visible=$(window).scrollTop()>70})),this.$route.query.search&&(this.categoryId=this.$route.params.id),this.input=this.$route.query.input,this.content=this.input,this.getCategory(),document.title="".concat(this.$route.params.name.replace(".html","")," How to find :: ").concat(this.$root.$children[0].pName.b," - Easy Dropshipping")},components:{homeHeader:o["a"],Footer:r["a"],Categories:p,DHeader:g["a"],DFooter:m["a"]},watch:{"setting.header.activeMenu":{handler:function(){this.getMenu()},deep:!0},$route:"gotoPage"},methods:{getMenu:function(){var t=this;this.setting.header.activeMenu&&this.setting.menu.forEach((function(e){e.id==t.setting.header.activeMenu&&(t.headerMenu=e)}))},searchPrice:function(){this.getItems()},change:function(t,e){0===this.btnList[e].status?this.btnList[e].status=1:this.btnList[e].status=0,this.filterUItem=t,this.getItems()},gotoCategory:function(t){1==t?this.$router.push("/category/".concat(this.activeCategory.l1.id,"/").concat(this.activeCategory.l1.name.replace(/\s+/g,"-"),".html")):this.$router.push("/category/".concat(this.activeCategory.l2.id,"/").concat(this.activeCategory.l2.name.replace(/\s+/g,"-"),".html"))},storeInput:function(t){for(var e=new RegExp("[A-Za-z0-9-_]+"),a=t.length,i="",s=0;s<a;s++)e.test(t[s])&&(i+=t[s]);this.shopUrl=i},getLoginStatus:function(){var t=this;this.$apiCall("api.ShopifyAccount.getShopAuthStatus",{shopUrl:this.shopUrl},(function(e){"9999"==e.ErrorCode?e.Data.Results.status&&(clearInterval(t.time),1==e.Data.Results.status?(localStorage.getItem("c_ourMallFirstLogin")?localStorage.setItem("c_ourMallFirstLogin",2):localStorage.setItem("c_ourMallFirstLogin",1),localStorage.setItem("c_apiUserId",e.Data.Results.userInfo.id),localStorage.setItem("c_apiUserToken",e.Data.Results.userInfo.apiUserToken),localStorage.setItem("c_ourMallUserInfo",JSON.stringify(e.Data.Results.userInfo)),t.$store.commit("setUserInfo",e.Data.Results.userInfo),t.$router.push({name:"more",query:t.$route.query}),t.win.close()):(t.loginLoading=!1,t.$elementMessage(e.Data.Results.errorMessage,"error"),setTimeout((function(){window.location.reload()}),1e3),t.win.close())):(clearInterval(t.time),t.$elementMessage(e.Message,"error"))}))},goLogin:function(){var t=this;if(!this.shopUrl)return this.$elementMessage("Please enter Shopify store name","error"),!1;this.win=window.open("/blank.html","Shopify"),this.loginLoading=!0,this.$apiCall("api.ShopifyAccount.addShopifyAccount",{shopUrl:this.shopUrl,getAuth:1,ivc:localStorage.getItem("c_ivc")?localStorage.getItem("c_ivc"):"",utmSource:localStorage.getItem("c_utm")},(function(e){"9999"==e.ErrorCode?(t.win.location=e.Data.Results,t.time=setInterval((function(){t.getLoginStatus()}),2e3)):t.$elementMessage(e.Message,"error")}))},closeLogin:function(){this.shopUrl="",this.loginLoading=!1},handleCommand:function(t){switch(t){case"exit":this.$Logout("/");break;case"profile":this.$router.push({name:"profile"});break;case"dashboard":if(121173==this.c_apiShopId){var e=JSON.parse(localStorage.getItem("isValidationCW"));if(!e)return void(this.isValidationCWDialog=!0)}this.$router.push({name:"dashboard"});break}},login:function(){localStorage.getItem("c_ourMallUserInfo")?this.$router.push({name:"dashboard"}):this.$router.push({name:"login"})},gotoLogin:function(){if(!this.shopUrl)return this.$elementMessage("Please enter Shopify store name","error"),!1;localStorage.getItem("c_ourMallUserInfo")?this.$router.push({name:"stores",params:{add:!0,val:this.shopUrl}}):this.$router.push({name:"login",params:{shopUrl:this.shopUrl}})},getCategory:function(){var t=this;this.$apiCall("api.ProductCategory.findByVendorRelateCategory",{},(function(e){9999==e.ErrorCode&&(t.commodityTypeMoreList=e.Data.Results,t.getItems())}))},getItems:function(){var t=this;this.loading=!0,this.allLoading=!0,"ALL-CATEGORIES"==this.categoryId&&(this.categoryId=""),this.commodityTypeMoreList.forEach((function(e){e.name==t.categoryId&&(t.categoryId=e.id)})),this.filterUItem&&("Price"==this.filterUItem.label?this.checkSort=0==this.filterUItem.status?"asc":"desc":this.checkQty=0==this.filterUItem.status?"asc":"desc");var e={};e="asc"==this.checkQty?{name:this.input,categoryId:this.$route.params.id,page:this.page,rowsPerPage:this.rowsPerPage,status:1,costFrom:this.min,costTo:this.max,timePublishedTo:this.radioDay,sortCost:this.checkSort||"asc",maxInventory:this.maxQty,minInventory:this.minQty,sortMinInventory:"asc"}:{name:this.input,categoryId:this.$route.params.id,page:this.page,rowsPerPage:this.rowsPerPage,status:1,costFrom:this.min,costTo:this.max,timePublishedTo:this.radioDay,sortCost:this.checkSort||"asc",maxInventory:this.maxQty,minInventory:this.minQty,sortMaxInventory:"desc"},this.$apiCall("api.VendorShop.vendorFindProducts",e,(function(e){9999==e.ErrorCode?(t.commodityTypeMoreList.forEach((function(e){e.id==t.categoryId&&(t.name=e.name,t.categoryId=e.name)})),t.items=e.Data.Results.products,t.total=e.Data.Pagination.totalCount,t.totalPage=e.Data.Pagination.totalPage,t.allLoading=!1,t.loading=!1,document.body.scrollTop=document.documentElement.scrollTop=0):(t.allLoading=!1,t.$elementMessage(e.Message,"error"))}))},search:function(){var t=this;this.content=this.input,this.commodityTypeMoreList.forEach((function(e){e.name==t.categoryId&&(t.nameS=e.id)})),this.nameS||(this.nameS=this.categoryId),""==this.categoryId?this.$router.push({path:"/category/ALL-CATEGORIES/".concat(this.content,".html"),query:{input:this.content,search:!0}}):this.$router.push({path:"/category/".concat(this.nameS,"/").concat(this.content,".html"),query:{input:this.content}}),this.page=1,this.nameS=""},changePageSize:function(t){this.rowsPerPage=t,localStorage.setItem("c_importPerPage",t),this.getItems()},gotoPage:function(){this.page=this.$route.query.page?this.$route.query.page:1,this.input=this.$route.query.input,this.getItems()},toPage:function(t){if(t!=this.$route.query.page){var e={},a="";a=this.$route.params.id,e.page=t,e.input=this.content,""==this.categoryId?this.$router.push({path:"/category/ALL-CATEGORIES/.html",query:e}):this.$router.push({path:"/category/".concat(a,"/").concat(this.$route.params.name),query:e})}},restDay:function(){this.radioDay="",this.getItems()},goToDetail:function(t){var e=localStorage.getItem("vendorId");148982!=e&&146428!=e&&144875!=e&&144843!=e&&143779!=e&&143654!=e&&74!=e?window.open("/item/".concat(t.id,"/").concat(t.name.replace(/\s+/g,"-").replace(/[^\w]/g,"_"),".html")):window.open("/itemOld/".concat(t.id,"/").concat(t.name.replace(/\s+/g,"-").replace(/[^\w]/g,"_"),".html"))},import_pro:function(t,e){var a=this;this.$store.state.userInfo?this.$apiCall("api.Product.addFromVendorShopProduct",{id:t.id},(function(e){9999==e.ErrorCode?(t.hasImport=1,t.imports++,a.$root.$children[0].importNum++,a.$message.success("Import Success !")):a.$message.error(e.Message)})):this.$root.$children[0].openDialogLogin()}}},v=f,y=(a("f068"),a("da0c"),a("6e51"),Object(u["a"])(v,i,s,!1,null,"8771a5f2",null));e["default"]=y.exports},b39c:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home-header"},[a("router-link",{attrs:{to:"/"}},[a("h1",{style:{backgroundImage:"url("+t.$store.state.shopInfo.logo+")"}})]),a("div",{staticClass:"right"},[a("ul",[a("li",[a("router-link",{class:{active:"home"==t.$route.name},attrs:{to:"/"}},[t._v("Home")])],1),a("li",[a("router-link",{attrs:{to:"/products-market"}},[t._v("Find Products")])],1),t.$store.state.userInfo?[a("li",{staticClass:"import-link"},[a("router-link",{attrs:{to:"/import-list"}},[a("i",[this.$root.$children[0].importNum?a("i",{staticClass:"badge"},[t._v(t._s(this.$root.$children[0].importNum>99?"99+":this.$root.$children[0].importNum))]):t._e()]),t._v(" My Import List ")])],1),a("li",[a("el-dropdown",{on:{command:t.handleCommand}},[a("span",{staticClass:"el-dropdown-link"},[a("i",{staticClass:"user-i"}),a("span",{staticClass:"name tx-ellipsis1"},[t._v(t._s(t.$store.state.userInfo.name))]),a("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{staticClass:"align-items-endd-flex",staticStyle:{width:"150px"},attrs:{command:"dashboard"}},[a("i",{staticClass:"mg-r-15 fa fa-user-o",attrs:{"aria-hidden":"true"}}),t._v(" My Profile ")]),a("el-dropdown-item",{staticClass:"d-flex",staticStyle:{width:"150px"},attrs:{command:"exit"}},[a("i",{staticClass:"mg-r-15 fa fa-sign-out",attrs:{"aria-hidden":"true"}}),t._v(" Logout ")])],1)],1)],1)]:[a("li",[a("a",{attrs:{href:"javascript:;"},on:{click:t.openDialogLogin}},[t._v("Login")])]),a("li",{staticClass:"reg"},[a("a",{attrs:{href:"javascript:;"},on:{click:t.openRegister}},[t._v("Register")])])]],2)])],1)},s=[],o={data:function(){return{c_apiShopId:JSON.parse(localStorage.getItem("c_apiShopId"))}},methods:{handleCommand:function(t){switch(t){case"exit":localStorage.removeItem("c_wantVisitPath"),this.$Logout("/");break;case"profile":this.$router.push({name:"profile"});break;case"dashboard":if(121173==this.c_apiShopId){var e=JSON.parse(localStorage.getItem("isValidationCW"));if(!e)return void(this.isValidationCWDialog=!0)}this.$router.push({name:"dashboard"});break}},openDialogLogin:function(){this.$root.$children[0].openDialogLogin()},openRegister:function(){this.$root.$children[0].openDialogRegister()}}},r=o,n=(a("ecc6"),a("2877")),c=Object(n["a"])(r,i,s,!1,null,"ace027c8",null);e["a"]=c.exports},c942:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home-footer"},[a("div",{staticClass:"content"},[a("div",{staticClass:"left"},[a("p",{staticClass:"r1 title"},[t._v("Make dropshipping easy with "+t._s(t.$root.$children[0].pName.a)+".")]),a("p",{staticClass:"r2"},[t._v(" Ourmall is designed for customers with need for drop-shipping, it can easily Allocate store orders to your vendors, and your store orders could be automatically completed. ")])]),"shopify"==t.$route.name?a("div",{staticClass:"right"},[a("ul",[a("li",{staticStyle:{"margin-right":"70px"}},[a("div",{staticClass:"t title"},[t._v("Company")]),a("div",{staticClass:"m"},[a("span",[t._v("Privacy policy")]),a("span",[t._v("Terms of use")]),a("router-link",{attrs:{to:{name:"contact"}}},[t._v("Contact Us")])],1)]),a("li",{staticStyle:{margin:"0"}},[a("div",{staticClass:"t title"},[t._v("Getting Started")]),a("div",{staticClass:"m"},[a("router-link",{attrs:{to:{path:"/article/How-to-install-OurMall-Dropshipping-App?",query:{id:3}}}},[t._v("How to install "+t._s(t.$root.$children[0].pName.a)+"?")]),a("router-link",{attrs:{to:{path:"/article/How-to-dispatch-my-Shopify-orders-to-my-vendors?",query:{id:5}}}},[t._v("How to allocate my orders?")]),a("router-link",{attrs:{to:{path:"/article/How-to-auto-fulfill-orders?",query:{id:6}}}},[t._v("How to auto fulfill orders?")]),a("router-link",{attrs:{to:{path:"/article/Connect-several-Shopify-stores-in-one-OurMall-account",query:{id:7}}}},[t._v("Connect several Shopify stores")])],1)])])]):t._e()]),t._m(0)])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"footLogo"},[a("div",{staticClass:"d-flex"},[a("span",{staticStyle:{"margin-top":"14px"}},[t._v(" © 2021, Powered by OurMall ")])])])}],o=(a("3032"),a("2877")),r={},n=Object(o["a"])(r,i,s,!1,null,"11c9dfc3",null);e["a"]=n.exports},da0c:function(t,e,a){"use strict";a("f402")},e96e:function(t,e,a){},ecc6:function(t,e,a){"use strict";a("ee57")},ee57:function(t,e,a){},efa3:function(t,e,a){"use strict";a("e96e")},f068:function(t,e,a){"use strict";a("18d3")},f402:function(t,e,a){}}]);
//# sourceMappingURL=storesMore.da85ddf3.js.map