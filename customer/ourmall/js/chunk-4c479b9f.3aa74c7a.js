(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4c479b9f"],{"58c2":function(t,s,i){"use strict";i.r(s);var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"home-page"},[t.code&&t.code.header&&t.code.header.length>0?t._l(t.code.header,(function(s,e){return i("div",{key:e,domProps:{innerHTML:t._s(s)}})})):t._e(),i("div",{staticStyle:{position:"relative"}},[i("DHeader",{attrs:{data:t.setting&&t.setting.header||"",headerMenu:t.headerMenu}})],1),i("div",[i("div",{staticClass:"cat-cont"},[i("div",{staticClass:"CategoryHeader"},[i("div",{staticClass:"mle"},[i("div",{staticClass:"kzv"},[i("nav",{staticClass:"CategoryHeader-navigation"},[i("h1",{staticClass:"kzv-h1"},[t._v(" "+t._s(t.Classification.name)+" ")]),i("ul",{staticClass:"CategoryNavigationCard"},t._l(t.Classification.list,(function(s){return i("li",{key:s.id,staticClass:"kzv-li"},[i("span",{staticClass:"CategoryNavigationCard-link",on:{click:function(i){return t.handleDeal(s)}}},[t._v(t._s(s.name))])])})),0)]),i("div",{staticClass:"CategoryHeader-imageWrapper"},[i("img",{staticClass:"CategoryHeader-image",attrs:{src:t.Classification.themeUrl,alt:""}})])])])]),i("div",{staticClass:"caltex-box"},[i("main",{staticClass:"cal-wr"},t._l(t.Classification.list,(function(s){return i("div",{key:s.id,staticClass:"CategoryRowNavigation"},[i("div",{staticClass:"gill"},[i("article",{staticClass:"CategoryCarousel"},[i("div",{staticClass:"CategoryCarousel-title"},[i("h2",[t._v(t._s(s.name))])]),i("div",{staticClass:"CategoryCarousel-carousel"},[i("div",{staticClass:"carouselBox"},[i("el-carousel",{staticClass:"carousel",attrs:{loop:!1,autoplay:!1}},t._l(s.list,(function(s,e){return i("el-carousel-item",{key:e,staticClass:"el-car-item"},t._l(s,(function(s,e){return i("div",{key:e,staticClass:"divSrc"},[i("div",{on:{click:function(i){return t.handleDeal(s)}}},[i("el-image",{staticStyle:{width:"200px",height:"100px","margin-top":"40px"},attrs:{src:s?s.themeUrl:"",fit:"contain"}},[i("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[i("i",{staticClass:"el-icon-picture-outline"})])]),i("div",{staticClass:"title"},[t._v(t._s(s?s.name:""))])],1)])})),0)})),1)],1)])])])])})),0)]),i("div")])]),i("footer",{staticClass:"footer-box"},[i("DFooter",{attrs:{setting:t.$store.state.configJson&&t.$store.state.configJson.footer||""}}),t.code&&t.code.footer&&t.code.footer.length>0?t._l(t.code.footer,(function(s,e){return i("div",{key:e,domProps:{innerHTML:t._s(s)}})})):t._e()],2)],2)},a=[],o=(i("99af"),i("caad"),i("b0c0"),i("ac1f"),i("2532"),i("5319"),i("159b"),i("8214")),l=i("d8f7"),n={components:{DFooter:l["a"],DHeader:o["a"]},data:function(){return{setting:null,code:{header:[],footer:[]},loading:!1,headerMenu:[],Classification:{}}},computed:{},watch:{},methods:{getItem:function(){var t=this;this.$apiCall("api.VendorShop.getShopConfig",{},(function(s){t.loading=!1,9999==s.ErrorCode?0!==s.Data.Results.length?(s.Data.Results.header.activeMenu&&s.Data.Results.menu.forEach((function(i){i.id==s.Data.Results.header.activeMenu&&(t.headerMenu=i)})),t.$store.commit("getStoreComponent",s.Data.Results),t.setting=s.Data.Results,t.setting&&t.setting.customCode&&t.setting.customCode.length&&t.setting.customCode.forEach((function(s){s.pages.includes("商品列表页")&&("底部"==s.position&&t.code.footer.push(s.desc),"顶部"==s.position&&t.code.header.push(s.desc))})),localStorage.setItem("c_shopConfigJson",JSON.stringify(s.Data.Results))):t.setting=JSON.parse(JSON.stringify(t.$store.state.configJson)):t.$message({message:s.Message,type:"error"})}))},getCat:function(){var t=this;this.$apiCall("api.ProductCategory.findByVendorRelateCategory",{},(function(s){if(9999==s.ErrorCode){console.log(2011);for(var i=s.Data.Results,e=0;e<i.length;e++)t.$route.query.id==i[e].id&&(t.Classification=i[e]);for(var a={list:[]},o=0;o<t.Classification.list.length;o++){for(var l={id:t.Classification.list[o].id,name:t.Classification.list[o].name,list:[],level:t.Classification.list[o].level,pid:t.Classification.list[o].pid,sort:t.Classification.list[o].sort,status:t.Classification.list[o].status,themeUrl:t.Classification.list[o].themeUrl,timeCreated:t.Classification.list[o].timeCreated,userId:t.Classification.list[o].userId},n=0;n<t.Classification.list[o].list.length;n++){var c=[];t.Classification.list[o].list[n]&&c.push(t.Classification.list[o].list[n]),t.Classification.list[o].list[n+1]&&c.push(t.Classification.list[o].list[n+1]),t.Classification.list[o].list[n+2]&&c.push(t.Classification.list[o].list[n+2]),t.Classification.list[o].list[n+3]&&c.push(t.Classification.list[o].list[n+3]),t.Classification.list[o].list[n+3]&&c.push(t.Classification.list[o].list[n+4]),l.list.push(c),n++,n++,n++,n++}a.list.push(l)}t.Classification.list=a.list,console.log(t.Classification,"this.Classification.list")}else t.$elementMessage(s.Message,"error")}))},handleDeal:function(t){console.log(t),window.open("/category/".concat(t.id,"/").concat(t.name.replace(/\s+/g,"-"),".html"),this.setting.target)}},created:function(){},mounted:function(){this.getItem(),this.getCat()},beforeCreate:function(){},beforeMount:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},activated:function(){}},c=n,r=(i("be5c"),i("2877")),d=Object(r["a"])(c,e,a,!1,null,"284150ce",null);s["default"]=d.exports},be5c:function(t,s,i){"use strict";i("d706")},d706:function(t,s,i){}}]);
//# sourceMappingURL=chunk-4c479b9f.3aa74c7a.js.map