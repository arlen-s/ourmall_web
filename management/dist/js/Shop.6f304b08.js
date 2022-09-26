(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Shop"],{cd1c:function(e,a,t){"use strict";t.r(a);var i=function(){var e=this,a=e._self._c;return a("div",{staticClass:"contentpanel shop-set-page"},[a("div",{ref:"pageHeader",staticClass:"pagetitle"},[e._m(0),a("div",{staticClass:"right"})]),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"pagebody"},[a("el-row",{staticClass:"mg-b-20",attrs:{gutter:10}},[a("el-col",{attrs:{span:24}},[a("el-card",[a("el-form",{ref:"shopForm",staticClass:"inner",attrs:{model:e.form,rules:e.rulesReg}},[a("el-form-item",{staticStyle:{width:"40%"},attrs:{label:"店铺名称",prop:"name"}},[a("el-input",{attrs:{maxlength:"35",minlength:"3","show-word-limit":"",placeholder:"请输入店铺名称"},model:{value:e.form.name,callback:function(a){e.$set(e.form,"name",a)},expression:"form.name"}}),a("div",{staticClass:"tip"},[e._v("名称长度需在3~35之间，由字母、数字、“-”构成，“-”不能在首尾位置")])],1),a("el-form-item",{staticStyle:{width:"40%"},attrs:{label:"店铺链接"}},[a("div",{staticClass:"changeLink",staticStyle:{float:"right"}},[a("el-link",{attrs:{underline:!1,type:"primary"},on:{click:function(a){return e.tip()}}},[e._v("更换")])],1),e.form.url?a("el-input",{attrs:{disabled:""},model:{value:e.form.url,callback:function(a){e.$set(e.form,"url",a)},expression:"form.url"}}):a("el-input",{scopedSlots:e._u([{key:"append",fn:function(){return[e._v(".ourmall.com")]},proxy:!0}],null,!1,1986311734),model:{value:e.form.subDomain,callback:function(a){e.$set(e.form,"subDomain",a)},expression:"form.subDomain"}})],1),a("el-form-item",{staticStyle:{width:"40%"},attrs:{label:"店铺邮箱",prop:"email"}},[a("el-input",{attrs:{placeholder:"请输入店铺邮箱"},model:{value:e.form.email,callback:function(a){e.$set(e.form,"email",a)},expression:"form.email"}}),a("div",{staticClass:"tip"},[e._v("如有需要，我们会通过此邮箱来联系您")])],1),a("el-form-item",{staticStyle:{width:"40%"},attrs:{label:"店主手机号",prop:"phone"}},[a("el-input",{attrs:{placeholder:"请输入店主手机号"},model:{value:e.form.phone,callback:function(a){e.$set(e.form,"phone",a)},expression:"form.phone"}})],1),a("el-form-item",{staticStyle:{width:"40%"},attrs:{label:"店铺头像"}},[a("div",{staticClass:"upload",on:{click:e.uploadOpen}},[e.form.logo?a("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e.form.logo,fit:"cover"}}):a("i",{staticClass:"el-icon-plus"})],1),a("div",{staticClass:"tip"},[e._v("支持 image/gif, image/jpeg, image/png 格式，最多1张，单个图片不超过 1 MB")])]),a("el-form-item",{staticStyle:{width:"40%"},attrs:{label:"财务邮箱",prop:"financialEmail"}},[a("el-input",{attrs:{placeholder:"请输入财务邮箱"},model:{value:e.form.financialEmail,callback:function(a){e.$set(e.form,"financialEmail",a)},expression:"form.financialEmail"}}),a("div",{staticClass:"tip"},[e._v("用于存在费用争议时联系的邮箱，请务必填")])],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v(" 保存 ")])],1)],1)],1)],1)],1)],1),a("input",{staticStyle:{display:"none"},attrs:{type:"file",id:"imgFile",accept:".jpg,.png,.gif"},on:{change:function(a){return e.Base64(a)}}})])},s=[function(){var e=this,a=e._self._c;return a("div",{staticClass:"left"},[a("div",{staticClass:"title"},[a("i",{staticClass:"iconfont icon-dianpushezhi"}),a("h2",[e._v("店铺设置")])])])}],l={data(){return{loading:!1,form:{name:"",subDomain:"",email:"",phone:"",logo:"",financialEmail:"",url:""},rulesReg:{name:[{required:!0,message:"请输入店铺名称",trigger:"blur"},{pattern:/^(?![-])(?![0-9-]+$)(?![a-zA-Z-]+$)[0-9A-Za-z-]{3,35}(?<![-])$/,message:"店铺名称格式错误",trigger:"blur"}],email:[{pattern:/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,message:"邮箱格式错误",trigger:"blur"}],financialEmail:[{pattern:/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,message:"邮箱格式错误",trigger:"blur"},{required:!0,message:"请输入财务邮箱",trigger:"blur"}],phone:[{pattern:/^1[34578]\d{9}$/,message:"手机号格式错误",trigger:"blur"}]}}},mounted(){this.getVonders()},methods:{save(){this.$refs.shopForm.validate(e=>{if(e){this.loading=!0;let e=this.form;this.$apiCall("api.VendorShop.changeByVendor",e,e=>{this.loading=!1,9999==e.ErrorCode?this.$message({message:"保存成功",type:"success"}):this.$message({message:e.Message,type:"error"})})}})},getVonders(){this.loading=!0,this.$apiCall("api.VendorShop.getByVendor",{},e=>{if(this.loading=!1,9999==e.ErrorCode){let a=e.Data.Results;this.form.name=a.name,this.form.subDomain=a.subDomain?a.subDomain:"shop"+a.id,this.form.email=a.email?a.email:this.$store.state.userInfo.email,this.form.url=a.url,this.form.phone=a.phone,this.form.logo=a.logo,this.form.financialEmail=a.financialEmail}else this.$message({message:e.Message,type:"error"})})},uploadOpen(){document.getElementById("imgFile").click()},Base64(e){if(e.target.value){let a=new FileReader,t=new Image,i="";a.onload=e=>{t.src=e.target.result;let a=e.target.result.match(/data:image\/(.*);base64,.*/);i=a[1]},t.onload=a=>{base64Image({file:e.target,callback:e=>{let a=e.split("base64,").pop();this.uploadImgBase64(a,i)}})},a.readAsDataURL(e.target.files[0])}},uploadImgBase64(e,a){this.loading=!0,this.$apiCall("api.User.uploadImgBase64",{imgUrlBase64:e,ext:a},e=>{this.loading=!1,9999==e.ErrorCode?this.form.logo=e.Data.Results.imgUrl:this.$message.error(e.Message)})},tip(){this.$message.warning({showClose:!0,duration:5e3,message:"若供应商自有域名，或之后申请了新的域名，需要更换域名的，需联系客服"})}},components:{}},r=l,o=(t("d75d"),t("2877")),n=Object(o["a"])(r,i,s,!1,null,"96ae178e",null);a["default"]=n.exports},d75d:function(e,a,t){"use strict";t("e73c")},e73c:function(e,a,t){}}]);
//# sourceMappingURL=Shop.6f304b08.js.map