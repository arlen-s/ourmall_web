<template>
  <div class="contentpanel shop-set-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="iconfont icon-dianpushezhi"></i>
          <h2>{{$t('shop.店铺设置')}}</h2>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="pagebody" v-loading="loading">
      <el-row :gutter="10" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <el-form class="inner" :model="form" :rules="rulesReg" ref="shopForm">
              <el-form-item :label="$t('shop.店铺名称')" style="width: 40%" prop="name">
                <el-input
                  v-model="form.name"
                  maxlength="36"
                  minlength="3"
                   :disabled="true"
                  show-word-limit
                  :placeholder="$t('shop.请输入店铺名称')"
                ></el-input> 
                <!-- <div class="tip">{{$t('shop.名称长度需在3~36之间，由字母或数字构成')}}</div> -->
               </el-form-item>
              <el-form-item :label="$t('shop.店铺链接')" style="width: 40%">
                  <!-- <div class="changeLink" style="float: right;">
                      <el-link :underline="false" type="primary" @click="tip()">{{$t('shop.更换')}}</el-link>
                  </div> -->
                <el-input
                  v-if="!form.url && apiSubUserId"
                  v-model="form.subDomain+'/home?invitationCode='+invitationCode"
                  disabled
                >
                </el-input>
                <el-input
                  v-else-if="form.url && apiSubUserId"
                  v-model="form.url+'/home?invitationCode='+invitationCode"
                  disabled
                >
                </el-input>
                <el-input
                  v-else-if="!form.url"
                  v-model="form.subDomain"
                  disabled
                >
                </el-input>
                <el-input
                  v-else
                  v-model="form.url"
                  disabled
                >
                </el-input>
                <el-tooltip class="item" effect="dark" :content="$t('shop.查看店铺')" placement="top-start">
                  <i class="el-icon-view view" @click="goMyStore"></i>
                </el-tooltip>
               </el-form-item>
              <el-form-item label="当前店铺在shopify应用" style="width: 40%">
                  <!-- <div class="changeLink" style="float: right;">
                      <el-link :underline="false" type="primary" @click="tip('shopify')">{{$t('shop.更换')}}</el-link>
                  </div> -->
                <el-input
                  v-model="form.accountStoreName"
                  disabled
                >
                </el-input>
               </el-form-item>
              <el-form-item :label="$t('shop.店铺邮箱')" style="width: 40%" prop="email">
                <el-input 
                :placeholder="$t('shop.请输入店铺邮箱')"
                v-model="form.email"
                >
                </el-input>
                <div class="tip">{{$t('shop.如有需要，我们会通过此邮箱来联系您')}}</div>
              </el-form-item>
              <el-form-item :label="$t('shop.店主手机号')" style="width: 40%" prop="phone">
                <el-input 
                :placeholder="$t('shop.请输入店主手机号')"
                v-model="form.phone"
                ></el-input>
              </el-form-item>
              <el-form-item :label="$t('shop.工信部备案号')" style="width: 40%" >
                <el-input 
                :placeholder="$t('shop.请输入')"
                v-model="form.referenceNumber"
                ></el-input>
              </el-form-item>              
              <el-form-item :label="$t('shop.店铺头像')" style="width: 40%">
                  <div class="upload" @click="uploadOpen">
                    <i class="el-icon-plus" v-if="!form.logo"></i>
                    <el-image
                        style="width: 100%; height: 100%"
                        :src="form.logo"
                        :fit="'cover'"
                        v-else
                    ></el-image>
                   </div>
                   <!-- <div class="tip">{{$t('shop.支持 image/gif, image/jpeg, image/png 格式，最多1张，单个图片不超过 1 MB')}}</div> -->
                   <div class="tip">{{$t("shop.Support the format of image/jpeg, image/png，One picture utmost, each cannot beyond 1 MB, general size 50x50 PX")}}</div>
              </el-form-item>
              <el-form-item :label="$t('shop.财务邮箱')" style="width: 40%" prop="financialEmail" >
                <el-input 
                :placeholder="$t('shop.请输入财务邮箱')"
                v-model="form.financialEmail"
                ></el-input>
                <div class="tip">{{$t('shop.用于存在费用争议时联系的邮箱，请务必填')}}</div>
              </el-form-item>
              <el-form-item>
                <el-button :disabled="!$isRole($route.meta.roleWrite)" type="primary" @click="save">
                  {{$t('shop.保存')}}
                </el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>   
     <input
      @change="Base64($event)"
      type="file"
      id="imgFile"
      accept=".jpg,.png,.gif"
      style="display: none"
    />
    <el-dialog
      :visible.sync="dialogVisible"
      width="500px">
      <div class="tx-center dialog-content" style="padding:30px 0 50px;font-size:18px">
        <span>很抱歉，该版本无法修改域名，请升级版本</span>
        <el-link type="primary" @click="gotoUp" style="position: relative;top: -3px; left: 2px;font-size: 18px;">去升级</el-link>
      </div>
      
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      invitationCode:'',
      apiSubUserId: null,
      dialogVisible:false,
      loading: false,
      form: {
        name:'',
        accountStoreName:'',//当前店铺在shopify应用
        subDomain:'',//二级域名
        email:'',
        phone:'',
        logo: '',
        referenceNumber: '',
        financialEmail:'',//财务邮箱
        url:'', //供应商联系客服修改的完整域名
      },
      rulesReg: {
        name: [
          {
            required: true,
            message: this.$t('shop.请输入店铺名称'),
            trigger: "blur",
          },
          {
            pattern:  /^[A-Za-z0-9]{3,35}$/,
            message: this.$t('shop.店铺名称格式错误'),
            trigger: "blur",
          },
        ],
        email: [
          {
            pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
            message: this.$t('shop.邮箱格式错误'),
            trigger: "blur",
          },
        ],
        financialEmail: [
          {
            pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
            message: this.$t('shop.邮箱格式错误'),
            trigger: "blur",
          },
          {
            required: true,
            message: this.$t('shop.请输入财务邮箱'),
            trigger: "blur",
          },
        ],
        phone: [
          {
            pattern: /^1[34578]\d{9}$/,
            message: this.$t('shop.手机号格式错误'),
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted(){
    console.log(this.$isRole('shopEdit'))
    this.getVonders();
  },
  created(){
    if(localStorage.getItem('apiSubUserId')){
      this.apiSubUserId = JSON.parse(localStorage.getItem('apiSubUserId')) 
    }
  },
  methods: {
    gotoUp(){
     this.$router.push('/pricingUp')
    },
    saveStoreLogo(){
     let setting = JSON.parse(JSON.stringify(this.$store.state.configJson.header));
     setting.logo = this.form.logo;
     this.$store.commit("setStoreHeader", setting);
     this.$apiCall("api.VendorShop.setShopConfig", {
        configJson: JSON.stringify(this.$store.state.configJson)
      },(r) => {
        if (r.ErrorCode == 9999) {
          // this.$elementMessage(this.$t('storeSetting.保存成功'), "success");
        } else {
          this.$message({message: r.Message,type: "error"});
        }
      });
    },
    goMyStore(){
      
      if(this.form.url && this.apiSubUserId){
        window.open(`//${this.form.url}/?invitationCode=${this.invitationCode}`)
      }else if(!this.form.url && this.apiSubUserId){
        window.open(`//${this.form.subDomain}/?invitationCode=${this.invitationCode}`)
      }else if(this.form.url) {
        window.open(`//${this.form.url}`)
      }else {
        window.open(`//${this.form.subDomain}`)
      }
    },
    save(){
      this.$refs.shopForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            let params = this.form;
            params.subDomain = params.name;
            this.$apiCall('api.VendorShop.changeByVendor',params,r=>{
              this.loading = false;
              if(r.ErrorCode == 9999){
                // this.$root.$children[0].getVonders();
                // this.getVonders();
                // this.saveStoreLogo();
				let setting = JSON.parse(JSON.stringify(this.$store.state.configJson.header));
				setting.logo = this.form.logo;
				this.$store.commit("setStoreHeader", setting);
				this.$apiCall("api.VendorShop.setShopConfig", {
            configJson: JSON.stringify(this.$store.state.configJson)
          },(r) => {
            if (r.ErrorCode == 9999) {
              let reg = /^localhost:/;
              let reg2 = /^sandbox/;
              let admin = ".myourmall.com";
              if(this.$root.$children[0].baseUrl != '/admin'){
                admin = ".myourmall.com/admin"
              }
              if (reg.test(window.location.host)) {
                this.$router.go(0);
              } else{
                let url;
                if (reg2.test(window.location.host)) {
                  url = window.location.href.replace(window.location.host,`//sandbox${this.form.name}${admin}`);
                } else {
                  url = window.location.href.replace(window.location.host,`//${this.form.name}${admin}`);
                }
                window.location = `${url}`;
              }
              this.$message({message:this.$t('shop.保存成功'),type:"success"});
            } else {
              this.$message({message: r.Message,type: "error"});
            }
          });
                
              }else{
                this.$message({message: r.Message, type: "error"});
              }
            })
          }
        });
    },
    getVonders(){
      this.loading = true;
      this.$apiCall('api.VendorShop.getByVendor',{},r=>{
        this.loading = false;
        if(r.ErrorCode == 9999){
          let data = r.Data.Results;
          this.invitationCode = data.invitationCode || ''
          this.form.name = data.name;
          if(this.form.subDomain){
             this.form.subDomain = window.location.host.indexOf("sandbox") >= 0 ? `sandbox${data.subDomain}.myourmall.com`:`${data.subDomain}.myourmall.com`;
          }else{
             this.form.subDomain = window.location.host.indexOf("sandbox") >= 0 ? `sandbox${data.name}.myourmall.com`:`${data.name}.myourmall.com`;
          }
          this.form.email = data.email ? data.email : this.$store.state.userInfo.email;
          this.form.url = data.url;
          this.form.phone = data.phone;
          this.form.accountStoreName = data.accountStoreName || 'ourmall app';
          this.form.logo = data.logo;
          this.form.financialEmail = data.financialEmail;
        }else{
          this.$message({message: r.Message, type: "error"});
        }
      })
    },
    uploadOpen() {
      document.getElementById("imgFile").click();
    },
    Base64(el) {
      if (el.target.value) {
        if((el.target.files[0].size / 1024 / 1024) > 1){
          this.$message({ message: '上传文件不能大于1MB', type: "error" });
          return;
        }
        let reader = new FileReader(),
          img = new Image(),
          ext = "";
        reader.onload = e => {
          img.src = e.target.result;
          let extArr = e.target.result.match(/data:image\/(.*);base64,.*/);
          ext = extArr[1];
          this.uploadImgBase64(e.target.result.split(',').pop(), ext);
        }
        reader.readAsDataURL(el.target.files[0]);
      }
    },
    uploadImgBase64(base64, ext) {
      this.loading = true;
      this.$apiCall(
        "api.User.uploadImgBase64",
        { imgUrlBase64: base64, ext },
        (r) => {
          this.loading = false;
          if (r.ErrorCode == 9999) {
            this.form.logo = r.Data.Results.imgUrl;
          } else {
            this.$message.error(r.Message);
          }
        }
      );
    },
    tip(i){
      if(this.$root.$children[0].vipDetail.service){
        if(i){
          this.$router.push('/shopifyApp')
        }else{
          this.$router.push('/domain')
        }
      }else{
        this.dialogVisible = true;
      }
      
    }
  },
  components: {},
};
</script>

<style scoped lang="scss">
.el-form-item {
   margin-bottom: 15px;
}
.inner {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 570px;
}
.upload {
  margin-top: 50px;
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 150px;
  height: 150px;
  cursor: pointer;
  line-height: 150px;
  vertical-align: top;
  text-align: center;
  margin-right: 15px;
  i {
    font-size: 30px;
    color: #ccc;
  }
}
.tip{
    color: #909399;
    font-size: 12px;
    line-height: 30px;
}
.view{
    position: absolute;
    right: -20px;
    bottom: 15px;
    cursor: pointer;
}
.view:hover{
  color:#5c6ac4
}
</style>
