(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["storesMore"],{2314:function(t,e,i){t.exports=i.p+"img/none.56197834.png"},3032:function(t,e,i){"use strict";i("5608")},4928:function(t,e,i){"use strict";i("9c14")},5608:function(t,e,i){},"77c7":function(t,e,i){},"951b":function(t,e,i){"use strict";i("cc71")},9539:function(t,e,i){"use strict";i("9a71")},9978:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home-page"},[t.code&&t.code.header&&t.code.header.length>0?t._l(t.code.header,(function(e,i){return a("div",{key:i,domProps:{innerHTML:t._s(e)}})})):t._e(),a("div",{staticStyle:{position:"relative",height:"130px"}},[a("DHeader",{attrs:{data:t.setting&&t.setting.header||"",headerMenu:t.headerMenu}})],1),a("div",[a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.allLoading,expression:"allLoading"}],staticClass:"contentpanel box"},[a("div",{staticClass:"pagetitle"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/products-market"}}},[t._v(" Products Market ")]),t.activeCategory.l1?a("el-breadcrumb-item",[t.activeCategory.L>1?a("a",{on:{click:function(e){return t.gotoCategory(1)}}},[t._v(t._s(t.activeCategory.l1.name))]):a("a",{attrs:{href:"javascript:;"}},[t._v(t._s(t.activeCategory.l1.name))])]):t._e(),t.activeCategory.l2?a("el-breadcrumb-item",[t.activeCategory.L>2?a("a",{on:{click:function(e){return t.gotoCategory(2)}}},[t._v(t._s(t.activeCategory.l2.name))]):a("a",{attrs:{href:"javascript:;"}},[t._v(t._s(t.activeCategory.l2.name))])]):t._e(),t.activeCategory.l3?a("el-breadcrumb-item",[a("a",{attrs:{href:"javascript:;"}},[t._v(t._s(t.activeCategory.l3.name))])]):t._e()],1)],1),a("div",{staticStyle:{display:"flex",width:"100%"}},[a("div",[a("Categories",{attrs:{categories:t.commodityTypeMoreList}}),a("div",{staticClass:"filter-box"},[a("div",{staticClass:"box-card"},[a("p",{staticClass:"price"},[t._v("Unit Price")]),a("div",[a("el-input",{staticStyle:{width:"60px"},attrs:{placeholder:"Min"},model:{value:t.min,callback:function(e){t.min=e},expression:"min"}},[a("span",{attrs:{slot:"prefix"},slot:"prefix"},[t._v(t._s(t.$store.state.country.symbol))])]),a("span",[t._v(" — ")]),a("el-input",{staticStyle:{width:"60px"},attrs:{placeholder:"Max"},model:{value:t.max,callback:function(e){t.max=e},expression:"max"}},[a("span",{attrs:{slot:"prefix"},slot:"prefix"},[t._v(t._s(t.$store.state.country.symbol))])]),a("el-button",{attrs:{type:"primary"},on:{click:t.searchPrice}},[t._v("GO")])],1),a("el-divider"),a("p",{staticClass:"price"},[t._v("Qty Available")]),a("div",[a("el-input",{staticStyle:{width:"60px"},attrs:{placeholder:"Min"},model:{value:t.minQty,callback:function(e){t.minQty=e},expression:"minQty"}}),a("span",[t._v(" — ")]),a("el-input",{staticStyle:{width:"60px"},attrs:{placeholder:"Max"},model:{value:t.maxQty,callback:function(e){t.maxQty=e},expression:"maxQty"}}),a("el-button",{attrs:{type:"primary"},on:{click:t.searchPrice}},[t._v("GO")])],1),a("el-divider"),a("div",{staticClass:"top-title"},[a("p",{staticClass:"price"},[t._v("First Available")]),a("span",{on:{click:t.restDay}},[t._v("Clear")])]),a("div",[a("el-radio-group",{on:{change:t.searchPrice},model:{value:t.radioDay,callback:function(e){t.radioDay=e},expression:"radioDay"}},[a("div",[a("el-radio",{attrs:{label:7}},[t._v("Last 7 days")])],1),a("div",[a("el-radio",{attrs:{label:14}},[t._v("Last 14 days")])],1),a("div",[a("el-radio",{attrs:{label:30}},[t._v("Last 30 days")])],1)])],1)],1)])],1),t.items&&0==t.items.length?a("div",{staticStyle:{flex:"1"}},[a("div",{staticClass:"top-filter-box"},[a("span",[t._v(" Sort by")]),a("div",{staticClass:"right",on:{click:function(e){return t.changePrice()}}},[t._v(t._s(t.priceObj.label)+" "),a("div",{staticClass:"box-icon-top"},[a("div",{staticClass:"up",class:1===t.priceObj.status?"opacity-5":""}),a("div",{staticClass:"down",class:1===t.priceObj.status?"opacity-1":""})])]),a("div",{staticClass:"right",on:{click:function(e){return t.changeStock()}}},[t._v(t._s(t.filterStock.label)+" "),a("div",{staticClass:"box-icon-top"},[a("div",{staticClass:"up",class:1===t.filterStock.status?"opacity-5":""}),a("div",{staticClass:"down",class:1===t.filterStock.status?"opacity-1":""})])])]),a("el-card",{staticClass:"mg-l-20",staticStyle:{width:"auto"}},[a("div",{staticClass:"noProduct"},[a("img",{attrs:{src:i("2314")}}),a("b",{staticClass:"mg-t-10"},[t._v("There are no products in this category")])])])],1):a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{flex:"1"}},[a("div",{staticClass:"top-filter-box"},[a("span",[t._v(" Sort by")]),a("div",{staticClass:"right",on:{click:function(e){return t.changePrice()}}},[t._v(t._s(t.priceObj.label)+" "),a("div",{staticClass:"box-icon-top"},[a("div",{staticClass:"up",class:1===t.priceObj.status?"opacity-5":""}),a("div",{staticClass:"down",class:1===t.priceObj.status?"opacity-1":""})])]),a("div",{staticClass:"right",on:{click:function(e){return t.changeStock()}}},[t._v(t._s(t.filterStock.label)+" "),a("div",{staticClass:"box-icon-top"},[a("div",{staticClass:"up",class:1===t.filterStock.status?"opacity-5":""}),a("div",{staticClass:"down",class:1===t.filterStock.status?"opacity-1":""})])])]),a("div",{staticClass:"list"},t._l(t.items,(function(e){return a("div",{key:e.id,staticClass:"pro_box",staticStyle:{"margin-bottom":"10px"}},[a("div",{staticClass:"pro_img",staticStyle:{height:"194px"}},[a("el-image",{staticStyle:{width:"100%",cursor:"pointer",height:"100%"},attrs:{fit:"contain",src:e.imgUrl},on:{click:function(i){return t.goToDetail(e)}}})],1),a("div",{staticStyle:{padding:"16px 10px"}},[a("div",{staticClass:"pro_name",on:{click:function(i){return t.goToDetail(e)}}},[a("a",{attrs:{href:"javascript:;"}},[t._v(t._s(e.name))])]),a("b",{staticClass:"pro_cost"},[t._v(t._s(t.$store.state.country.symbol)+" "+t._s(e.minPrice===e.maxPrice?e.minPrice:e.minPrice+"~"+e.maxPrice+" "))]),a("p",{directives:[{name:"show",rawName:"v-show",value:e.estimatedLeadTimeType,expression:"item.estimatedLeadTimeType"}]},[t._v("über: "+t._s(e.estimatedLeadTimeMinValue)+"-"+t._s(e.estimatedLeadTimeMaxValue)+t._s(t.getType(e.estimatedLeadTimeType)))]),a("p",[t._v("Kostenloser Versand")])])])})),0)])])]),t.items.length?a("el-row",{staticStyle:{margin:"20px 0"},attrs:{gutter:20}},[a("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[a("div",[a("el-pagination",{attrs:{"current-page":Number(t.page),background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":t.pageSizes,"page-size":t.rowsPerPage,total:Number(t.total)},on:{"current-change":t.toPage,"size-change":t.changePageSize}})],1)])],1):t._e(),a("div",{staticClass:"ball",style:{top:t.ball.y+"px",left:t.ball.x+"px",opacity:t.ball.opacity}}),a("el-backtop",{staticClass:"goto-top",attrs:{right:32,bottom:120}})],1),a("DFooter",{attrs:{setting:t.$store.state.configJson&&t.$store.state.configJson.footer||""}}),t.code&&t.code.footer&&t.code.footer.length>0?t._l(t.code.footer,(function(e,i){return a("div",{key:i,domProps:{innerHTML:t._s(e)}})})):t._e(),a("el-dialog",{attrs:{visible:t.centerDialogVisible,width:"30%",center:""},on:{"update:visible":function(e){t.centerDialogVisible=e},close:t.closeLogin}},[a("div",{staticClass:"login-page"},[a("div",{staticClass:"login-box"},[a("div",{staticClass:"box mg-b-5"},[a("p",[t._v("Please enter your shopify store name to connect the dashboard page:")]),a("div",{staticClass:"mg-b-30"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.shopUrl,expression:"shopUrl"}],attrs:{type:"text",placeholder:"Shopify store name"},domProps:{value:t.shopUrl},on:{input:[function(e){e.target.composing||(t.shopUrl=e.target.value)},function(e){return t.storeInput(e.target.value)}],keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.goLogin(e)}}}),a("span",[t._v(".myshopify.com")])]),a("div",[a("el-button",{staticClass:"login-btn",attrs:{loading:t.loginLoading},on:{click:t.goLogin}},[t._v(t._s(t.loginLoading?"Please Wait":"LOGIN"))])],1)])])])])],2)},s=[],o=(i("99af"),i("4de4"),i("caad"),i("b0c0"),i("a9e3"),i("4d63"),i("ac1f"),i("25f0"),i("2532"),i("5319"),i("841c"),i("159b"),i("b39c")),r=i("c942"),n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"categories-nav",class:{more:t.showMore}},[i("h2",{attrs:{title:"ALL CATEGORIES"}},[t._v("Categories")]),i("ul",{staticClass:"c-nav"},[t._l(t.categories,(function(e,a){return[a<10||t.showMore?i("li",{key:e.id},[i("router-link",{staticClass:"c-link",attrs:{title:e.name,to:{path:"/category/"+e.id+"/"+e.name.replace(/\s+/g,"-")+".html"}},nativeOn:{click:function(i){return t.categoryRecord(e.id,e.name,1)}}},[i("div",{staticClass:"left"},[i("i",{staticClass:"c-icon",class:"c-"+e.id}),i("span",{staticClass:" tx-ellipsis1"},[t._v(t._s(e.name))])]),i("i",{staticClass:"fa fa-angle-right",staticStyle:{"margin-left":"15px"},attrs:{"aria-hidden":"true"}})]),e.list&&0!=e.list.length?i("div",{staticClass:"sub-menu"},[i("ul",{staticClass:"l1"},[t._l(e.list,(function(e){return[i("li",{key:e.id},[i("router-link",{attrs:{to:{path:"/category/"+e.id+"/"+e.name.replace(/\s+/g,"-")+".html"},title:e.name},nativeOn:{click:function(i){return t.categoryRecord(e.id,e.name,2)}}},[t._v(t._s(e.name))]),e.list&&e.list.length?i("ul",{staticClass:"l2"},t._l(e.list,(function(e){return i("li",{key:e.id},[i("router-link",{attrs:{to:{path:"/category/"+e.id+"/"+e.name.replace(/\s+/g,"-")+".html"},title:e.name},nativeOn:{click:function(i){return t.categoryRecord(e.id,e.name,2)}}},[t._v(t._s(e.name))])],1)})),0):t._e()],1)]}))],2)]):t._e()],1):t._e()]}))],2),t.categories&&t.categories.length>9?i("div",{staticClass:"more"},[i("a",{attrs:{href:"javascript:;"},on:{click:t.moreChange}},[i("i",{staticClass:"fa ",class:t.showMore?"fa-minus-square-o":"fa-plus-square-o",attrs:{"aria-hidden":"true"}}),i("span",[t._v(t._s(t.showMore?"Collapse":"More"))])])]):t._e()])},c=[],l={props:["categories"],data:function(){return{showMore:!1}},methods:{categoryRecord:function(t,e,i){localStorage.setItem("c_buryResource","category"),1==i?this.$Burying({object:"5002",objectId:t,objectUrl:e}):2==i&&this.$Burying({object:"5003",objectId:t,objectUrl:e})},moreChange:function(){this.showMore=!this.showMore}}},u=l,d=(i("9539"),i("2877")),h=Object(d["a"])(u,n,c,!1,null,"3fe1cce2",null),p=h.exports,g=i("8214"),m=i("d8f7"),f={props:{},data:function(){return{setting:null,min:"",max:"",minQty:"",maxQty:"",radioDay:"",filterUItem:{},headerMenu:[],languageList:[{Ge:"Tag",En:"day"},{Ge:"Woche",En:"week"},{Ge:"Monat",En:"month"}],code:{header:[],footer:[]},btnList:[{label:"Price",status:0},{label:"Stock Qty",status:0}],priceObj:{label:"Price",status:0},filterStock:{label:"Stock Qty",status:0},nameS:"",checkQty:"asc",checkSort:"",header2Visible:!1,time:0,loginLoading:!1,shopUrl:"",categoryId:null,centerDialogVisible:!1,name:"",items:[],commodityTypeMoreList:[],page:this.$route.query.page?Number(this.$route.query.page):"1",rowsPerPage:localStorage.getItem("c_importPerPage")?Number(localStorage.getItem("c_importPerPage")):12,pageSizes:[12,24,48],total:0,totalPage:0,input:"",content:"",loading:!0,allLoading:!0,ball:{x:window.innerWidth/2,y:window.innerHeight/2,opacity:0},c_apiShopId:JSON.parse(localStorage.getItem("c_apiShopId"))}},computed:{product:function(){var t=this,e="";return this.commodityTypeMoreList.forEach((function(i){i.id==t.categoryId&&(e=i.name)})),e},activeCategory:function(){var t,e,i,a,s=this;return!!this.commodityTypeMoreList&&("0"==this.$route.params.id?{L:1,l1:{id:0,name:"All Categories"},l2:void 0,l3:void 0}:(this.commodityTypeMoreList&&this.commodityTypeMoreList.length&&this.commodityTypeMoreList.some((function(o){if(o.id==s.$route.params.id)return t=1,e=o,!0;o.list&&o.list.some((function(r){if(r.id==s.$route.params.id)return t=2,e=o,i=r,!0;r.list&&r.list.some((function(n){if(n.id==s.$route.params.id)return t=3,e=o,i=r,a=n,!0}))}))})),{L:t,l1:e,l2:i,l3:a}))}},beforeDestroy:function(){clearInterval(this.time)},created:function(){var t=this;this.setting=localStorage.getItem("c_shopConfigJson")?JSON.parse(localStorage.getItem("c_shopConfigJson")):null,this.setting&&this.setting.customCode&&this.setting.customCode.length&&this.setting.customCode.forEach((function(e){e.pages.includes("搜索结果页")&&("底部"==e.position&&t.code.footer.push(e.desc),"顶部"==e.position&&t.code.header.push(e.desc))}))},mounted:function(){var t=this;this.$root.$children[0].getParentUrl()&&this.$root.$children[0].getParentUrl().indexOf("vendor")>=0||this.$root.$children[0].checkLogin(),this.header2Visible=$(window).scrollTop()>70,$(window).scroll((function(){t.header2Visible=$(window).scrollTop()>70})),this.$route.query.search&&(this.categoryId=this.$route.params.id),this.input=this.$route.query.input,this.content=this.input,this.getCategory(),document.title="".concat(this.$route.params.name.replace(".html","")," How to find :: ").concat(this.$root.$children[0].pName.b," - Easy Dropshipping")},components:{homeHeader:o["a"],Footer:r["a"],Categories:p,DHeader:g["a"],DFooter:m["a"]},watch:{"setting.header.activeMenu":{handler:function(){this.getMenu()},deep:!0},$route:"gotoPage"},methods:{getMenu:function(){var t=this;this.setting.header.activeMenu&&this.setting.menu.forEach((function(e){e.id==t.setting.header.activeMenu&&(t.headerMenu=e)}))},searchPrice:function(){this.getItems()},change:function(t,e){0===this.btnList[e].status?this.btnList[e].status=1:this.btnList[e].status=0,this.filterUItem=t,this.getItems()},changePrice:function(){0===this.priceObj.status?this.priceObj.status=1:this.priceObj.status=0,this.filterUItem=this.priceObj,this.getItems()},changeStock:function(){0===this.filterStock.status?this.filterStock.status=1:this.filterStock.status=0,this.filterUItem=this.filterStock,this.getItems()},gotoCategory:function(t){1==t?this.$router.push("/category/".concat(this.activeCategory.l1.id,"/").concat(this.activeCategory.l1.name.replace(/\s+/g,"-"),".html")):this.$router.push("/category/".concat(this.activeCategory.l2.id,"/").concat(this.activeCategory.l2.name.replace(/\s+/g,"-"),".html"))},storeInput:function(t){for(var e=new RegExp("[A-Za-z0-9-_]+"),i=t.length,a="",s=0;s<i;s++)e.test(t[s])&&(a+=t[s]);this.shopUrl=a},getLoginStatus:function(){var t=this;this.$apiCall("api.ShopifyAccount.getShopAuthStatus",{shopUrl:this.shopUrl},(function(e){"9999"==e.ErrorCode?e.Data.Results.status&&(clearInterval(t.time),1==e.Data.Results.status?(localStorage.getItem("c_ourMallFirstLogin")?localStorage.setItem("c_ourMallFirstLogin",2):localStorage.setItem("c_ourMallFirstLogin",1),localStorage.setItem("c_apiUserId",e.Data.Results.userInfo.id),localStorage.setItem("c_apiUserToken",e.Data.Results.userInfo.apiUserToken),localStorage.setItem("c_ourMallUserInfo",JSON.stringify(e.Data.Results.userInfo)),t.$store.commit("setUserInfo",e.Data.Results.userInfo),t.$router.push({name:"more",query:t.$route.query}),t.win.close()):(t.loginLoading=!1,t.$elementMessage(e.Data.Results.errorMessage,"error"),setTimeout((function(){window.location.reload()}),1e3),t.win.close())):(clearInterval(t.time),t.$elementMessage(e.Message,"error"))}))},goLogin:function(){var t=this;if(!this.shopUrl)return this.$elementMessage("Please enter Shopify store name","error"),!1;this.win=window.open("/blank.html","Shopify"),this.loginLoading=!0,this.$apiCall("api.ShopifyAccount.addShopifyAccount",{shopUrl:this.shopUrl,getAuth:1,ivc:localStorage.getItem("c_ivc")?localStorage.getItem("c_ivc"):"",utmSource:localStorage.getItem("c_utm")},(function(e){"9999"==e.ErrorCode?(t.win.location=e.Data.Results,t.time=setInterval((function(){t.getLoginStatus()}),2e3)):t.$elementMessage(e.Message,"error")}))},closeLogin:function(){this.shopUrl="",this.loginLoading=!1},handleCommand:function(t){switch(t){case"exit":this.$Logout("/");break;case"profile":this.$router.push({name:"profile"});break;case"dashboard":if(121173==this.c_apiShopId){var e=JSON.parse(localStorage.getItem("isValidationCW"));if(!e)return void(this.isValidationCWDialog=!0)}this.$router.push({name:"dashboard"});break}},login:function(){localStorage.getItem("c_ourMallUserInfo")?this.$router.push({name:"dashboard"}):this.$router.push({name:"login"})},gotoLogin:function(){if(!this.shopUrl)return this.$elementMessage("Please enter Shopify store name","error"),!1;localStorage.getItem("c_ourMallUserInfo")?this.$router.push({name:"stores",params:{add:!0,val:this.shopUrl}}):this.$router.push({name:"login",params:{shopUrl:this.shopUrl}})},getCategory:function(){var t=this;this.$apiCall("api.ProductCategory.findByVendorRelateCategory",{},(function(e){9999==e.ErrorCode&&(t.commodityTypeMoreList=e.Data.Results,t.getItems())}))},getType:function(t){if(localStorage.getItem("c_ourMallUserInfo")){if("DE"==JSON.parse(localStorage.getItem("c_ourMallUserInfo")).shopCountry){var e=this.languageList.filter((function(e){if(e.En==t)return e}));return e.length>0?e[0].En:""}var i=this.languageList.filter((function(e){if(e.En==t)return e}));return i.length>0?i[0].En:""}return t},getItems:function(){var t=this;this.loading=!0,this.allLoading=!0,"ALL-CATEGORIES"==this.categoryId&&(this.categoryId="");var e={};this.commodityTypeMoreList.forEach((function(e){e.name==t.categoryId&&(t.categoryId=e.id)})),this.filterUItem&&("Price"==this.filterUItem.label?(this.checkSort=0==this.filterUItem.status?"asc":"desc",e={name:this.input,categoryId:this.$route.params.id,page:this.page,rowsPerPage:this.rowsPerPage,status:1,costFrom:this.min,costTo:this.max,timePublishedTo:this.radioDay,sortCost:this.checkSort||"asc",maxInventory:this.maxQty,minInventory:this.minQty,sortMinInventory:""}):(this.checkSort=0==this.filterUItem.status?"asc":"desc",e="asc"==this.checkSort?{name:this.input,categoryId:this.$route.params.id,page:this.page,rowsPerPage:this.rowsPerPage,status:1,costFrom:this.min,costTo:this.max,timePublishedTo:this.radioDay,sortCost:"",maxInventory:this.maxQty,minInventory:this.minQty,sortMinInventory:this.checkSort}:{name:this.input,categoryId:this.$route.params.id,page:this.page,rowsPerPage:this.rowsPerPage,status:1,costFrom:this.min,costTo:this.max,timePublishedTo:this.radioDay,sortCost:"",maxInventory:this.maxQty,minInventory:this.minQty,sortMaxInventory:this.checkSort},this.checkQty=0==this.filterUItem.status?"asc":"desc")),this.$apiCall("api.VendorShop.vendorFindProducts",e,(function(e){9999==e.ErrorCode?(t.commodityTypeMoreList.forEach((function(e){e.id==t.categoryId&&(t.name=e.name,t.categoryId=e.name)})),t.items=e.Data.Results.products,t.total=e.Data.Pagination.totalCount,t.totalPage=e.Data.Pagination.totalPage,t.allLoading=!1,t.loading=!1,document.body.scrollTop=document.documentElement.scrollTop=0):(t.allLoading=!1,t.$elementMessage(e.Message,"error"))}))},search:function(){var t=this;this.content=this.input,this.commodityTypeMoreList.forEach((function(e){e.name==t.categoryId&&(t.nameS=e.id)})),this.nameS||(this.nameS=this.categoryId),""==this.categoryId?this.$router.push({path:"/category/ALL-CATEGORIES/".concat(this.content,".html"),query:{input:this.content,search:!0}}):this.$router.push({path:"/category/".concat(this.nameS,"/").concat(this.content,".html"),query:{input:this.content}}),this.page=1,this.nameS=""},changePageSize:function(t){this.rowsPerPage=t,localStorage.setItem("c_importPerPage",t),this.getItems()},gotoPage:function(){this.page=this.$route.query.page?this.$route.query.page:1,this.input=this.$route.query.input,this.getItems()},toPage:function(t){if(t!=this.$route.query.page){var e={},i="";i=this.$route.params.id,e.page=t,e.input=this.content,""==this.categoryId?this.$router.push({path:"/category/ALL-CATEGORIES/.html",query:e}):this.$router.push({path:"/category/".concat(i,"/").concat(this.$route.params.name),query:e})}},restDay:function(){this.radioDay="",this.getItems()},goToDetail:function(t){var e=localStorage.getItem("vendorId");148982!=e&&146428!=e&&144875!=e&&144843!=e&&143779!=e&&143654!=e&&74!=e?window.open("/item/".concat(t.id,"/").concat(t.name.replace(/\s+/g,"-").replace(/[^\w]/g,"_"),".html")):window.open("/itemOld/".concat(t.id,"/").concat(t.name.replace(/\s+/g,"-").replace(/[^\w]/g,"_"),".html"))},import_pro:function(t,e){var i=this;this.$store.state.userInfo?this.$apiCall("api.Product.addFromVendorShopProduct",{id:t.id},(function(e){9999==e.ErrorCode?(t.hasImport=1,t.imports++,i.$root.$children[0].importNum++,i.$message.success("Import Success !")):i.$message.error(e.Message)})):this.$root.$children[0].openDialogLogin()}}},v=f,y=(i("951b"),i("4928"),i("f03d"),Object(d["a"])(v,a,s,!1,null,"1504401f",null));e["default"]=y.exports},"9a71":function(t,e,i){},"9c14":function(t,e,i){},b39c:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"home-header"},[i("router-link",{attrs:{to:"/"}},[i("h1",{style:{backgroundImage:"url("+t.$store.state.shopInfo.logo+")"}})]),i("div",{staticClass:"right"},[i("ul",[i("li",[i("router-link",{class:{active:"home"==t.$route.name},attrs:{to:"/"}},[t._v("Home")])],1),i("li",[i("router-link",{attrs:{to:"/products-market"}},[t._v("Find Products")])],1),t.$store.state.userInfo?[i("li",{staticClass:"import-link"},[i("router-link",{attrs:{to:"/import-list"}},[i("i",[this.$root.$children[0].importNum?i("i",{staticClass:"badge"},[t._v(t._s(this.$root.$children[0].importNum>99?"99+":this.$root.$children[0].importNum))]):t._e()]),t._v(" My Import List ")])],1),i("li",[i("el-dropdown",{on:{command:t.handleCommand}},[i("span",{staticClass:"el-dropdown-link"},[i("i",{staticClass:"user-i"}),i("span",{staticClass:"name tx-ellipsis1"},[t._v(t._s(t.$store.state.userInfo.name))]),i("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[i("el-dropdown-item",{staticClass:"align-items-endd-flex",staticStyle:{width:"150px"},attrs:{command:"dashboard"}},[i("i",{staticClass:"mg-r-15 fa fa-user-o",attrs:{"aria-hidden":"true"}}),t._v(" My Profile ")]),i("el-dropdown-item",{staticClass:"d-flex",staticStyle:{width:"150px"},attrs:{command:"exit"}},[i("i",{staticClass:"mg-r-15 fa fa-sign-out",attrs:{"aria-hidden":"true"}}),t._v(" Logout ")])],1)],1)],1)]:[i("li",[i("a",{attrs:{href:"javascript:;"},on:{click:t.openDialogLogin}},[t._v("Login")])]),i("li",{staticClass:"reg"},[i("a",{attrs:{href:"javascript:;"},on:{click:t.openRegister}},[t._v("Register")])])]],2)])],1)},s=[],o={data:function(){return{c_apiShopId:JSON.parse(localStorage.getItem("c_apiShopId"))}},methods:{handleCommand:function(t){switch(t){case"exit":localStorage.removeItem("c_wantVisitPath"),this.$Logout("/");break;case"profile":this.$router.push({name:"profile"});break;case"dashboard":if(121173==this.c_apiShopId){var e=JSON.parse(localStorage.getItem("isValidationCW"));if(!e)return void(this.isValidationCWDialog=!0)}this.$router.push({name:"dashboard"});break}},openDialogLogin:function(){this.$root.$children[0].openDialogLogin()},openRegister:function(){this.$root.$children[0].openDialogRegister()}}},r=o,n=(i("ecc6"),i("2877")),c=Object(n["a"])(r,a,s,!1,null,"ace027c8",null);e["a"]=c.exports},c942:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"home-footer"},[i("div",{staticClass:"content"},[i("div",{staticClass:"left"},[i("p",{staticClass:"r1 title"},[t._v("Make dropshipping easy with "+t._s(t.$root.$children[0].pName.a)+".")]),i("p",{staticClass:"r2"},[t._v(" Ourmall is designed for customers with need for drop-shipping, it can easily Allocate store orders to your vendors, and your store orders could be automatically completed. ")])]),"shopify"==t.$route.name?i("div",{staticClass:"right"},[i("ul",[i("li",{staticStyle:{"margin-right":"70px"}},[i("div",{staticClass:"t title"},[t._v("Company")]),i("div",{staticClass:"m"},[i("span",[t._v("Privacy policy")]),i("span",[t._v("Terms of use")]),i("router-link",{attrs:{to:{name:"contact"}}},[t._v("Contact Us")])],1)]),i("li",{staticStyle:{margin:"0"}},[i("div",{staticClass:"t title"},[t._v("Getting Started")]),i("div",{staticClass:"m"},[i("router-link",{attrs:{to:{path:"/article/How-to-install-OurMall-Dropshipping-App?",query:{id:3}}}},[t._v("How to install "+t._s(t.$root.$children[0].pName.a)+"?")]),i("router-link",{attrs:{to:{path:"/article/How-to-dispatch-my-Shopify-orders-to-my-vendors?",query:{id:5}}}},[t._v("How to allocate my orders?")]),i("router-link",{attrs:{to:{path:"/article/How-to-auto-fulfill-orders?",query:{id:6}}}},[t._v("How to auto fulfill orders?")]),i("router-link",{attrs:{to:{path:"/article/Connect-several-Shopify-stores-in-one-OurMall-account",query:{id:7}}}},[t._v("Connect several Shopify stores")])],1)])])]):t._e()]),t._m(0)])},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"footLogo"},[i("div",{staticClass:"d-flex"},[i("span",{staticStyle:{"margin-top":"14px"}},[t._v(" © 2021, Powered by OurMall ")])])])}],o=(i("3032"),i("2877")),r={},n=Object(o["a"])(r,a,s,!1,null,"11c9dfc3",null);e["a"]=n.exports},cc71:function(t,e,i){},ecc6:function(t,e,i){"use strict";i("ee57")},ee57:function(t,e,i){},f03d:function(t,e,i){"use strict";i("77c7")}}]);
//# sourceMappingURL=storesMore.263b4c6c.js.map