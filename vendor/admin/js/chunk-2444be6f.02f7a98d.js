(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2444be6f"],{"0ec9":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"house-box"},[a("el-card",{staticClass:"box-card"},[a("el-input",{staticStyle:{width:"30%"},attrs:{placeholder:e.$t("storehouse.请输入仓库名称")},on:{change:e.search},model:{value:e.searchVal,callback:function(t){e.searchVal=t},expression:"searchVal"}})],1),a("el-row",[a("el-col",{staticClass:"btn-col"},[a("el-button",{staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:e.addHouse}},[e._v(e._s(e.$t("创建仓库")))])],1)],1),a("el-card",{staticClass:"box-card"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{align:"center",prop:"id",label:e.$t("storehouse.序号"),width:"180"}}),a("el-table-column",{attrs:{align:"center",prop:"name",label:e.$t("storehouse.仓库名称"),width:"180"}}),a("el-table-column",{attrs:{align:"center",prop:"countryName",label:e.$t("storehouse.国家")}}),a("el-table-column",{attrs:{align:"center",prop:"contact",label:e.$t("storehouse.负责人")}}),a("el-table-column",{attrs:{prop:"telephone",align:"center",label:e.$t("storehouse.联系电话")}}),a("el-table-column",{attrs:{align:"center",label:e.$t("storehouse.状态")},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.status?a("span",[e._v(e._s(e.$t("storehouse.启用")))]):a("span",{staticStyle:{color:"red"}},[e._v(e._s(e.$t("storehouse.停用")))])]}}])}),a("el-table-column",{attrs:{prop:"stockQuantity",align:"center",label:e.$t("storehouse.关联库存SKU数")}}),a("el-table-column",{attrs:{prop:"createdAt",align:"center",label:e.$t("storehouse.创建时间")}}),a("el-table-column",{attrs:{label:e.$t("storehouse.操作"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-link",{staticStyle:{"margin-right":"5px"},attrs:{type:"primary"},on:{click:function(a){return e.edit(t.row)}}},[e._v(e._s(e.$t("storehouse.编辑")))]),a("el-link",{staticStyle:{"margin-right":"5px"},attrs:{type:"danger"},on:{click:function(a){return e.deleteFun(t.row)}}},[e._v(e._s(e.$t("storehouse.删除")))]),1==t.row.status?a("el-link",{attrs:{type:"danger"},on:{click:function(a){return e.handleStatus(t.row)}}},[e._v(e._s(e.$t("storehouse.停用")))]):a("el-link",{attrs:{type:"primary"},on:{click:function(a){return e.handleStatus(t.row)}}},[e._v(e._s(e.$t("storehouse.启用")))])]}}])})],1)],1),a("el-row",{staticClass:"pagination mg-t-20"},[a("el-pagination",{attrs:{"current-page":e.pagination.page,background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":e.pagination.pageSize,"page-size":e.pagination.rowsPerPage,total:e.pagination.totalCount},on:{"current-change":e.toPage,"size-change":e.changePageSize}})],1),a("createdHouseDialog",{attrs:{dialogAddData:e.dialogObj},on:{addSucc:e.getChild}})],1)},s=[],r=(a("a9e3"),a("b0c0"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{},[a("el-dialog",{attrs:{title:e.dialogAddData.isEdit?e.$t("storehouse.修改仓库信息"):e.$t("storehouse.创建仓库"),visible:e.dialogAddData.isShow,width:"40%","before-close":e.resetForm},on:{"update:visible":function(t){return e.$set(e.dialogAddData,"isShow",t)},open:function(t){return e.open()}}},[a("el-form",{ref:"form",attrs:{model:e.dialogAddData.data,"label-width":"auto",rules:e.rules}},[a("el-form-item",{attrs:{label:e.$t("storehouse.仓库名称"),required:!0}},[a("el-input",{staticStyle:{width:"50%"},attrs:{placeholder:e.$t("storehouse.请输入仓库名称")},model:{value:e.dialogAddData.form.name,callback:function(t){e.$set(e.dialogAddData.form,"name",t)},expression:"dialogAddData.form.name"}})],1),a("el-form-item",{attrs:{label:e.$t("storehouse.仓库所在国家"),required:!0}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:e.dialogAddData.form.nation,callback:function(t){e.$set(e.dialogAddData.form,"nation",t)},expression:"dialogAddData.form.nation"}},e._l(e.options,(function(e){return a("el-option",{key:e.code,attrs:{label:e.name,value:e.code}})})),1)],1),a("el-form-item",{attrs:{label:e.$t("storehouse.详细地址"),required:!0}},[a("el-input",{attrs:{type:"textarea",rows:2,placeholder:e.$t("storehouse.请输入")},model:{value:e.dialogAddData.form.address,callback:function(t){e.$set(e.dialogAddData.form,"address",t)},expression:"dialogAddData.form.address"}}),a("p",{staticStyle:{color:"#ccc"}},[e._v(e._s(e.$t("storehouse.用于告知分销商自提地址")))])],1),a("el-form-item",{attrs:{label:e.$t("storehouse.负责人")}},[a("el-input",{staticStyle:{width:"50%"},attrs:{placeholder:e.$t("storehouse.请输入负责人姓名")},model:{value:e.dialogAddData.form.role,callback:function(t){e.$set(e.dialogAddData.form,"role",t)},expression:"dialogAddData.form.role"}})],1),a("el-form-item",{attrs:{label:e.$t("storehouse.联系电话")}},[a("el-input",{staticStyle:{width:"50%"},attrs:{type:"number",placeholder:e.$t("storehouse.请输入联系电话")},model:{value:e.dialogAddData.form.tel,callback:function(t){e.$set(e.dialogAddData.form,"tel",t)},expression:"dialogAddData.form.tel"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.resetForm}},[e._v(e._s(e.$t("storehouse.取消")))]),a("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v(e._s(e.$t("storehouse.创建")))])],1)],1)],1)}),i=[],n={props:["dialogAddData"],data:function(){return{rules:{name:[{required:!0,message:"error",trigger:"blur"}],password:[{required:!0,message:"error",trigger:"blur"}],address:[{required:!0,message:"请输入详细地址",trigger:"blur"}]},options:[]}},components:{},computed:{},watch:{},methods:{save:function(){var e=this;if(""==this.dialogAddData.form.name)return this.$message.error(this.$t("storehouse.请填写仓库名称")),!1;if(""==this.dialogAddData.form.nation)return this.$message.error(this.$t("storehouse.请选择国家")),!1;if(""==this.dialogAddData.form.address)return this.$message.error(this.$t("storehouse.请填写详细地址")),!1;var t={name:this.dialogAddData.form.name,countryCode:this.dialogAddData.form.nation,contact:this.dialogAddData.form.role,telephone:this.dialogAddData.form.tel,id:this.dialogAddData.form.id,address:this.dialogAddData.form.address};this.$apiCall("api.Warehouse.save",t,(function(t){9999==t.ErrorCode?(e.$elementMessage(t.Message,"success"),e.$emit("addSucc")):e.$elementMessage(t.Message,"error")}))},resetForm:function(){this.$emit("addSucc")},open:function(){var e=this,t={};this.$apiCall("api.CountryCode.list",t,(function(t){9999==t.ErrorCode&&(e.options=t.Data.Results)}))}},created:function(){},mounted:function(){},beforeCreate:function(){},beforeMount:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},activated:function(){}},l=n,d=(a("b784"),a("2877")),c=Object(d["a"])(l,r,i,!1,null,null,null),u=c.exports,g={components:{createdHouseDialog:u},data:function(){return{searchVal:"",tableData:[],dialogObj:{isShow:!1,isEdit:!1,form:{name:"",nation:"",role:"",tel:"",id:"",address:""}},pagination:{totalCount:0,pageSize:[10,20,50,100],rowsPerPage:10,page:1},loading:!0}},computed:{},watch:{},methods:{getInfo:function(){var e=this,t={rowsPerPage:this.pagination.rowsPerPage,page:this.pagination.page,name:this.searchVal};this.$apiCall("api.Warehouse.finds",t,(function(t){e.loading=!1,9999==t.ErrorCode?(e.pagination.totalCount=Number(t.Data.Pagination.totalCount),e.pagination.page=t.Data.Pagination.page,e.pagination.rowsPerPage=t.Data.Pagination.rowsPerPage,e.tableData=t.Data.Results):e.$message({message:t.Message,type:"error"})}))},deleteFun:function(e){var t=this;if(e.stockQuantity>0)this.$message.error({message:this.$t("storehouse.存在关联SKU，不能删除！")});else{var a={id:e.id};this.$apiCall("api.Warehouse.delete",a,(function(e){t.loading=!1,9999==e.ErrorCode?(t.$message({message:e.Message,type:"success"}),t.getInfo()):t.$message({message:e.Message,type:"error"})}))}},changePageSize:function(e){this.pagination.rowsPerPage=e,this.getInfo()},toPage:function(e){this.pagination.page=e,this.getInfo()},search:function(){this.getInfo()},edit:function(e){this.dialogObj={isShow:!0,isEdit:!0,form:{name:e.name,nation:e.countryCode,nationName:e.countryName,role:e.contact,tel:e.telephone,id:e.id,address:e.address}}},addHouse:function(){this.dialogObj.isShow=!0},handleStatus:function(e){var t=this,a={id:e.id};this.$apiCall("api.Warehouse.change",a,(function(e){t.loading=!1,9999==e.ErrorCode?(t.$message({message:e.Message,type:"success"}),t.getInfo()):t.$message({message:e.Message,type:"error"})}))},getChild:function(){this.dialogObj={isShow:!1,form:{name:"",nation:"",role:"",tel:"",address:""}},this.getInfo()}},created:function(){this.getInfo()},mounted:function(){},beforeCreate:function(){},beforeMount:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},activated:function(){}},h=g,f=(a("7931"),Object(d["a"])(h,o,s,!1,null,"7dcd6736",null));t["default"]=f.exports},"28c0":function(e,t,a){},"511e":function(e,t,a){},7931:function(e,t,a){"use strict";a("511e")},b784:function(e,t,a){"use strict";a("28c0")}}]);