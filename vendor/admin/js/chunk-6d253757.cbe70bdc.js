(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6d253757"],{"0177":function(t,e,a){},"0ec9":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"house-box"},[a("el-card",{staticClass:"box-card"},[a("el-input",{staticStyle:{width:"30%"},attrs:{placeholder:t.$t("storehouse.请输入仓库名称")},on:{change:t.search},model:{value:t.searchVal,callback:function(e){t.searchVal=e},expression:"searchVal"}})],1),a("el-row",[a("el-col",{staticClass:"btn-col"},[a("el-button",{staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:t.addHouse}},[t._v(t._s(t.$t("创建仓库")))])],1)],1),a("el-card",{staticClass:"box-card"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{align:"center",prop:"id",label:t.$t("storehouse.序号"),width:"180"}}),a("el-table-column",{attrs:{align:"center",prop:"name",label:t.$t("storehouse.仓库名称"),width:"180"}}),a("el-table-column",{attrs:{align:"center",prop:"countryName",label:t.$t("storehouse.国家")}}),a("el-table-column",{attrs:{align:"center",prop:"contact",label:t.$t("storehouse.负责人")}}),a("el-table-column",{attrs:{prop:"telephone",align:"center",label:t.$t("storehouse.联系电话")}}),a("el-table-column",{attrs:{align:"center",label:t.$t("storehouse.状态")},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?a("span",[t._v("启用")]):a("span",{staticStyle:{color:"red"}},[t._v("停用")])]}}])}),a("el-table-column",{attrs:{prop:"stockQuantity",align:"center",label:t.$t("storehouse.关联库存SKU数")}}),a("el-table-column",{attrs:{prop:"createdAt",align:"center",label:t.$t("storehouse.创建时间")}}),a("el-table-column",{attrs:{label:t.$t("storehouse.操作"),align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-link",{staticStyle:{"margin-right":"5px"},attrs:{type:"primary"},on:{click:function(a){return t.edit(e.row)}}},[t._v("编辑")]),1==e.row.status?a("el-link",{attrs:{type:"danger"},on:{click:function(a){return t.handleStatus(e.row)}}},[t._v("停用")]):a("el-link",{attrs:{type:"primary"},on:{click:function(a){return t.handleStatus(e.row)}}},[t._v("启用")])]}}])})],1)],1),a("el-row",{staticClass:"pagination mg-t-20"},[a("el-pagination",{attrs:{"current-page":t.pagination.page,background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":t.pagination.pageSize,"page-size":t.pagination.rowsPerPage,total:t.pagination.totalCount},on:{"current-change":t.toPage,"size-change":t.changePageSize}})],1),a("createdHouseDialog",{attrs:{dialogAddData:t.dialogObj},on:{addSucc:t.getChild}})],1)},n=[],i=(a("a9e3"),a("b0c0"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{},[a("el-dialog",{attrs:{title:t.dialogAddData.isEdit?t.$t("storehouse.修改仓库信息"):t.$t("storehouse.创建仓库"),visible:t.dialogAddData.isShow,width:"40%","before-close":t.resetForm},on:{"update:visible":function(e){return t.$set(t.dialogAddData,"isShow",e)},open:function(e){return t.open()}}},[a("el-form",{ref:"form",attrs:{model:t.dialogAddData.data,"label-width":"auto",rules:t.rules}},[a("el-form-item",{attrs:{label:t.$t("storehouse.仓库名称"),required:!0}},[a("el-input",{staticStyle:{width:"50%"},attrs:{placeholder:t.$t("storehouse.请输入仓库名称")},model:{value:t.dialogAddData.form.name,callback:function(e){t.$set(t.dialogAddData.form,"name",e)},expression:"dialogAddData.form.name"}})],1),a("el-form-item",{attrs:{label:t.$t("storehouse.仓库所在国家"),required:!0}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:t.dialogAddData.form.nation,callback:function(e){t.$set(t.dialogAddData.form,"nation",e)},expression:"dialogAddData.form.nation"}},t._l(t.options,(function(t){return a("el-option",{key:t.code,attrs:{label:t.name,value:t.code}})})),1)],1),a("el-form-item",{attrs:{label:t.$t("storehouse.负责人")}},[a("el-input",{staticStyle:{width:"50%"},attrs:{placeholder:t.$t("storehouse.请输入负责人姓名")},model:{value:t.dialogAddData.form.role,callback:function(e){t.$set(t.dialogAddData.form,"role",e)},expression:"dialogAddData.form.role"}})],1),a("el-form-item",{attrs:{label:t.$t("storehouse.联系电话")}},[a("el-input",{staticStyle:{width:"50%"},attrs:{type:"number",placeholder:t.$t("storehouse.请输入联系电话")},model:{value:t.dialogAddData.form.tel,callback:function(e){t.$set(t.dialogAddData.form,"tel",e)},expression:"dialogAddData.form.tel"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.resetForm}},[t._v(t._s(t.$t("storehouse.取消")))]),a("el-button",{attrs:{type:"primary"},on:{click:t.save}},[t._v(t._s(t.$t("storehouse.确定")))])],1)],1)],1)}),r=[],s={props:["dialogAddData"],data:function(){return{rules:{name:[{required:!0,message:"error",trigger:"blur"}],password:[{required:!0,message:"error",trigger:"blur"}]},options:[]}},components:{},computed:{},watch:{},methods:{save:function(){var t=this;if(""==this.dialogAddData.form.name)return this.$message.error("请填写仓库名称"),!1;if(""==this.dialogAddData.form.nation)return this.$message.error("请选择国家"),!1;var e={name:this.dialogAddData.form.name,countryCode:this.dialogAddData.form.nation,contact:this.dialogAddData.form.role,telephone:this.dialogAddData.form.tel,id:this.dialogAddData.form.id};this.$apiCall("api.Warehouse.save",e,(function(e){9999==e.ErrorCode?(t.$elementMessage(e.Message,"success"),t.$emit("addSucc")):t.$elementMessage(e.Message,"error")}))},resetForm:function(){this.$emit("addSucc")},open:function(){var t=this,e={};this.$apiCall("api.CountryCode.list",e,(function(e){9999==e.ErrorCode&&(t.options=e.Data.Results)}))}},created:function(){},mounted:function(){},beforeCreate:function(){},beforeMount:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},activated:function(){}},l=s,d=(a("b784"),a("2877")),c=Object(d["a"])(l,i,r,!1,null,null,null),u=c.exports,g={components:{createdHouseDialog:u},data:function(){return{searchVal:"",tableData:[],dialogObj:{isShow:!1,isEdit:!1,form:{name:"",nation:"",role:"",tel:"",id:""}},pagination:{totalCount:0,pageSize:[10,20,50,100],rowsPerPage:10,page:1},loading:!0}},computed:{},watch:{},methods:{getInfo:function(){var t=this,e={rowsPerPage:this.pagination.rowsPerPage,page:this.pagination.page,name:this.searchVal};this.$apiCall("api.Warehouse.finds",e,(function(e){t.loading=!1,9999==e.ErrorCode?(t.pagination.totalCount=Number(e.Data.Pagination.totalCount),t.pagination.page=e.Data.Pagination.page,t.pagination.rowsPerPage=e.Data.Pagination.rowsPerPage,t.tableData=e.Data.Results):t.$message({message:e.Message,type:"error"})}))},changePageSize:function(t){this.pagination.rowsPerPage=t,this.getInfo()},toPage:function(t){this.pagination.page=t,this.getInfo()},search:function(){this.getInfo()},edit:function(t){this.dialogObj={isShow:!0,isEdit:!0,form:{name:t.name,nation:t.countryCode,nationName:t.countryName,role:t.contact,tel:t.telephone,id:t.id}}},addHouse:function(){this.dialogObj.isShow=!0},handleStatus:function(t){var e=this,a={id:t.id};this.$apiCall("api.Warehouse.change",a,(function(t){e.loading=!1,9999==t.ErrorCode?(e.$message({message:t.Message,type:"success"}),e.getInfo()):e.$message({message:t.Message,type:"error"})}))},getChild:function(){this.dialogObj={isShow:!1,form:{name:"",nation:"",role:"",tel:""}},this.getInfo()}},created:function(){this.getInfo()},mounted:function(){},beforeCreate:function(){},beforeMount:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},activated:function(){}},f=g,p=(a("f054"),Object(d["a"])(f,o,n,!1,null,"54bc57fc",null));e["default"]=p.exports},"28c0":function(t,e,a){},b784:function(t,e,a){"use strict";a("28c0")},f054:function(t,e,a){"use strict";a("0177")}}]);