<template>
  <div class="contentpanel shop-set-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="iconfont icon-dianpushezhi"></i>
          <h2>店铺设置</h2>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="pagebody" v-loading="loading">
      <el-row :gutter="10" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <el-form class="inner" :model="form" :rules="rulesReg" ref="shopForm">
              <el-form-item label="店铺名称" style="width: 40%" prop="name">
                <el-input
                  v-model="form.name"
                  maxlength="35"
                  minlength="3"
                  show-word-limit
                  placeholder="请输入店铺名称"
                ></el-input> 
                <div class="tip">名称长度需在3~35之间，由字母、数字、“-”构成，“-”不能在首尾位置</div>
               </el-form-item>
              <el-form-item label="店铺链接" style="width: 40%">
                  <div class="changeLink" style="float: right;">
                      <el-link :underline="false" type="primary" @click="tip()">更换</el-link>
                  </div>
                <el-input
                  v-if="!form.url"
                  v-model="form.subDomain"
                >
                <template #append>.ourmall.com</template>
                </el-input>
                <el-input
                  v-else
                  v-model="form.url"
                  disabled
                >
                </el-input>

               </el-form-item>
              <el-form-item label="店铺邮箱" style="width: 40%" prop="email">
                <el-input 
                placeholder="请输入店铺邮箱"
                v-model="form.email"
                >
                </el-input>
                <div class="tip">如有需要，我们会通过此邮箱来联系您</div>
              </el-form-item>
              <el-form-item label="店主手机号" style="width: 40%" prop="phone">
                <el-input 
                placeholder="请输入店主手机号"
                v-model="form.phone"
                ></el-input>
              </el-form-item>
              <el-form-item label="店铺头像" style="width: 40%">
                  <div class="upload" @click="uploadOpen">
                    <i class="el-icon-plus" v-if="!form.logo"></i>
                    <el-image
                        style="width: 100%; height: 100%"
                        :src="form.logo"
                        :fit="'cover'"
                        v-else
                    ></el-image>
                   </div>
                   <div class="tip">支持 image/gif, image/jpeg, image/png 格式，最多1张，单个图片不超过 1 MB</div>
              </el-form-item>
              <el-form-item label="财务邮箱" style="width: 40%" prop="financialEmail" >
                <el-input 
                placeholder="请输入财务邮箱"
                v-model="form.financialEmail"
                ></el-input>
                <div class="tip">用于存在费用争议时联系的邮箱，请务必填</div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="save">
                  保存
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        name:'',
        subDomain:'',//二级域名
        email:'',
        phone:'',
        logo: '',
        financialEmail:'',//财务邮箱
        url:'', //供应商联系客服修改的完整域名
      },
      rulesReg: {
        name: [
          {
            required: true,
            message: '请输入店铺名称',
            trigger: "blur",
          },
          {
            pattern:  /^(?![-])(?![0-9-]+$)(?![a-zA-Z-]+$)[0-9A-Za-z-]{3,35}(?<![-])$/,
            message: '店铺名称格式错误',
            trigger: "blur",
          },
        ],
        email: [
          {
            pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
            message: '邮箱格式错误',
            trigger: "blur",
          },
        ],
        financialEmail: [
          {
            pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
            message: '邮箱格式错误',
            trigger: "blur",
          },
          {
            required: true,
            message: '请输入财务邮箱',
            trigger: "blur",
          },
        ],
        phone: [
          {
            pattern: /^1[34578]\d{9}$/,
            message: '手机号格式错误',
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted(){
    this.getVonders();
  },
  methods: {
    save(){
      this.$refs.shopForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            let params = this.form;
            this.$apiCall('api.VendorShop.changeByVendor',params,r=>{
              this.loading = false;
              if(r.ErrorCode == 9999){
                this.$message({message:'保存成功',type:"success"})
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
          this.form.name = data.name;
          this.form.subDomain = data.subDomain ? data.subDomain:`shop${data.id}`;
          this.form.email = data.email ? data.email : this.$store.state.userInfo.email;
          this.form.url = data.url;
          this.form.phone = data.phone;
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
        let reader = new FileReader(),
          img = new Image(),
          ext = "";
        reader.onload = (e) => {
          img.src = e.target.result;
          let extArr = e.target.result.match(/data:image\/(.*);base64,.*/);
          ext = extArr[1];
        };
        img.onload = (e) => {
          base64Image({
            file: el.target,
            callback: (rst) => {
              let base64 = rst.split("base64,").pop();
              this.uploadImgBase64(base64, ext);
            },
          })
        };
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
    tip(){
      
      this.$message.warning({
        showClose: true,
        duration: 5000,
        message: '若供应商自有域名，或之后申请了新的域名，需要更换域名的，需联系客服'
      });
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
</style>
