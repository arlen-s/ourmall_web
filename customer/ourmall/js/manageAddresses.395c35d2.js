(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["manageAddresses"],{"0df7":function(t,s,i){"use strict";i.r(s);var d=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"contentpanel add-page"},[i("div",{ref:"pageHeader",staticClass:"pagetitle"},[t._m(0),i("div",{staticClass:"right"},[i("el-button",{attrs:{type:"primary"},on:{click:function(s){return t.openAddAdd()}}},[t._v("Add New Address")])],1)]),i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"pagebody"},[t.items.length?i("el-row",{staticClass:"mg-b-20",attrs:{gutter:15}},t._l(t.items,(function(s){return i("el-col",{key:s.id,staticClass:" mg-b-15",attrs:{sm:24,lg:12,xl:8}},[i("el-card",{staticClass:"add-card",class:{default:1==s.isDefault}},[1==s.isDefault?i("div",{staticClass:"badge-default"},[t._v("Default Shipping Address")]):t._e(),i("div",{staticClass:"add-row tx-ellipsis1"},[i("span",{staticClass:" title"},[t._v("First name:")]),t._v(" "+t._s(s.firstName)+" ")]),i("div",{staticClass:"add-row tx-ellipsis1"},[i("span",{staticClass:" title"},[t._v("Last name:")]),t._v(" "+t._s(s.lastName)+" ")]),i("div",{staticClass:"add-row tx-ellipsis1"},[i("span",{staticClass:"title"},[t._v("Phone:")]),t._v(" "+t._s(s.phone||"--")+" ")]),i("div",{staticClass:"add-row"},[i("span",{staticClass:"title"},[t._v("Address:")]),t._v(" "),i("span",{staticClass:"tx-ellipsis1"},[t._v(t._s(s.address1))])]),i("div",{staticClass:"add-row-2"},[i("div",{staticClass:"row-sub tx-ellipsis1"},[i("span",{staticClass:"title"},[t._v("City:")]),t._v(" "+t._s(s.city)+" ")]),i("div",{staticClass:"row-sub tx-ellipsis1"},[i("span",{staticClass:"title"},[t._v("Postcode:")]),t._v(" "+t._s(s.postcode||"--")+" ")])]),i("div",{staticClass:"add-row-2 tx-ellipsis1"},[i("div",{staticClass:"row-sub"},[i("span",{staticClass:"title"},[t._v("Province:")]),t._v(" "+t._s(s.province)+" ")]),i("div",{staticClass:"row-sub tx-ellipsis1"},[i("span",{staticClass:"title"},[t._v("Country:")]),t._v(" "+t._s(s.country?t.codeToCountry(s.country)+" ("+s.country+")":"---")+" ")])]),i("div",{staticClass:"action"},[i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){return t.openAddAdd(s)}}},[t._v("Edit")]),i("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(i){return t.delAdd(s)}}},[t._v("Delete")])],1)])],1)})),1):i("el-row",{attrs:{gutter:10}},[i("el-col",{staticClass:" tx-center",staticStyle:{padding:"25px",color:"#909399","font-size":"18px"},attrs:{span:24}},[t._v(" No address ")])],1)],1),i("DialogEditAdd",{attrs:{data:t.dialogEditAdd},on:{setAdd:t.setAdd}})],1)},a=[function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"left"},[i("div",{staticClass:"title"},[i("i",{staticClass:"el-icon-location"}),i("h2",[t._v("Address Management")])])])}],e=(i("b64b"),i("159b"),i("c895")),l=i("79fe"),o={data:function(){return{loading:!1,countryArr:[],dialogEditAdd:{isShow:!1,loading:!1,firstName:"",lastName:"",address1:"",address2:"",country:"",province:"",city:"",street:"",company:"",phone:"",postcode:"",isDefault:!1,addressId:""},dialogEditAddDefault:"{}",items:[]}},components:{DialogEditAdd:l["a"]},mounted:function(){var t=this;Object.keys(e).forEach((function(s){Object.keys(e[s]).forEach((function(i){t.countryArr.push({label:e[s][i].nameEN,value:e[s][i].code2})}))})),this.dialogEditAddDefault=JSON.stringify(this.dialogEditAdd),this.getAddList()},methods:{delAdd:function(t){var s=this;this.$confirm("Do you want to delete?","",{confirmButtonClass:" el-button--danger",type:"error"}).then((function(){s.loading=!0,s.$apiCall("api.Address.deleteAddress",{addressId:t.id},(function(t){s.loading=!1,"9999"==t.ErrorCode?(s.$elementMessage("delete successfully","success"),s.getAddList()):s.$elementMessage(t.Message,"error")}))})).catch((function(){}))},setAdd:function(){this.getAddList(),this.dialogEditAdd.isShow=!1,this.$elementMessage("save successfully","success")},openAddAdd:function(t){this.dialogEditAdd=JSON.parse(this.dialogEditAddDefault),t&&(this.dialogEditAdd.firstName=t.firstName,this.dialogEditAdd.lastName=t.lastName,this.dialogEditAdd.address1=t.address1,this.dialogEditAdd.address2=t.address2,this.dialogEditAdd.country=t.country,this.dialogEditAdd.province=t.province,this.dialogEditAdd.city=t.city,this.dialogEditAdd.street=t.street,this.dialogEditAdd.company=t.company,this.dialogEditAdd.phone=t.phone,this.dialogEditAdd.postcode=t.postcode,this.dialogEditAdd.isDefault=1==t.isDefault,this.dialogEditAdd.addressId=t.id),this.dialogEditAdd.isShow=!0},getAddList:function(){var t=this;this.loading=!0,this.$apiCall(" api.Address.addressList",{},(function(s){t.loading=!1,"9999"==s.ErrorCode?t.items=s.Data.Results:t.$elementMessage(s.Message,"error")}))},codeToCountry:function(t){var s="";return this.countryArr.some((function(i){if(i.value==t)return s=i.label,!0})),s}}},n=o,r=(i("aa46"),i("6a73"),i("2877")),c=Object(r["a"])(n,d,a,!1,null,"7e9a18c2",null);s["default"]=c.exports},"6a73":function(t,s,i){"use strict";i("7326")},7326:function(t,s,i){},"80c8":function(t,s,i){},aa46:function(t,s,i){"use strict";i("80c8")}}]);