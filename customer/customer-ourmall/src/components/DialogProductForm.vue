<template>
  <div>
    <el-dialog
      v-loading="data.loading"
      :close-on-click-modal="false"
      width="780px"
      :visible.sync="data.isShow"
    >
      <div slot="title">
        <div class="title">
          <h2>
            <img src="./../../public/images/logo.png">
          </h2>
        </div>
      </div>
      <div v-if="data.type != 2" class="body-wrap">
        <div class="content">
          <div v-if="data.type == 1" class="left">
            <h3>Hi there,</h3>
            <p>Are you looking for competitive products for your<br> dropshiping business?</p>
            <p>Submit the product you want, we will reply you in 30minutes</p>
            <div class="btn-wrap">
              <el-button class=" mg-r-20" type="primary" round @click="changeType(2)">Yes, go ahead</el-button>
              <el-button type="primary" round plain @click="openChat">Live chat</el-button>
            </div>
          </div>
          <div v-else class="left">
            <h3>Thank you!</h3>
            <p class=" mg-b-15"><b>We have received your form, and will contact you as<br>soon as possible!</b></p>
            <p style="color: #909399; font-size: 12px;">*Just 1-click and finish your sign up, follow your quotation's<br>latest status!</p>
            <div class="btn-wrap">
              <el-button class=" mg-r-20" type="primary" round @click="signup">SIGN UP</el-button>
              <el-button type="primary" round plain @click="openChat">Live chat</el-button>
            </div>
          </div>
          <div class="right">
            <div class="img-wrap">
              <img src="./../../public/images/product-form-img.jpg">
            </div>
          </div>
        </div>
      </div>
      <div v-else class="body-wrap">
        <div class=" mg-b-15">
          <div class=" mg-b-10">Product image</div>
          <div  v-if="data.imgUrl" class="el-upload-list el-upload-list--picture-card">
            <div class="el-upload-list__item is-ready">
              <div>
                <div :style="{backgroundImage: `url(${data.imgUrl})` }" class="el-upload-list__item-thumbnail">
                </div>
                <span class="el-upload-list__item-actions">
                  <span @click="delImg" class="el-upload-list__item-delete"><i class="el-icon-delete"></i></span>
                </span>
              </div>
            </div>
          </div>
          <div v-else tabindex="0" class="el-upload el-upload--picture-card"
            @click="openUpload"
          >
            <i class="el-icon-plus"></i>
            <input id="pfUpload" type="file" name="file" class="el-upload__input" accept=".jpg,.png,.gif"
              @change="Base64($event)"
            >
          </div>
        </div>

        <div class=" mg-b-10">
          <el-input
            v-model="data.detail"
            placeholder="*Please fill in the product URL where we can check it or any product information you can tell us."></el-input>
        </div>
        <div class=" mg-b-10">
          <el-input
            v-model="data.email" 
            placeholder="*Please fill in your Email, we will contact you in 30 minutes."></el-input>
        </div>
        <div class=" mg-b-10">
          <el-input
            v-model="data.otherContact" 
            placeholder="Please fill in your WhatsApp/Skype (optional)"></el-input>
        </div>
        <div class="submit-wrap">
          <el-button type="primary" @click="submitForm">Submit Form</el-button>
        </div>
      </div>
      <div slot="footer">
        <div class="footer-wrap">
          <div class="contact">
            <a href="javascript:;"
              v-clipboard:copy="'james@ourmall.com'"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >
              <i class=" mg-r-5 fa fa-skype" aria-hidden="true"></i> 
              <i class="mg-r-10 fa fa-envelope-o" aria-hidden="true"></i> 
              james@ourmall.com
            </a>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    signup(){
      this.data.isShow = false;
      this.$emit('signup')
    },
    submitForm(){
      if (!this.data.imgUrl) {
        this.$message.error("Please select a picture !");
        return false;
      }
      if (!this.data.detail) {
        this.$message.error("Please fill in the product URL !");
        return false;
      }
      var reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;

      if (!this.data.email || !reg.test(this.data.email)) {
        this.$message.error("Please fill in the correct Email !");
        return false;
      }
      this.data.loading = true;
      this.$apiCall("api.OfferList.genOfferProduct",{products: [{
        imgUrl: this.data.imgUrl,
        detail: this.data.detail,
        email: this.data.email,
        otherContact: this.data.otherContact,
      }]}, r=>{
        this.data.loading = false;
        if(r.ErrorCode == 9999){
          this.data.type = 3;
          this.$message.success("Submit Success !");
          let bindOfferIds = JSON.parse(localStorage.getItem('c_homeBindOfferIds')) || [];
          bindOfferIds.push(r.Data.Results);
          localStorage.setItem('c_homeBindOfferIds', JSON.stringify([...new Set(bindOfferIds)]))
        }else{
          this.$message.error(r.Message)
        }
      })
    },
    delImg(){
      this.data.imgUrl = '';
    },
    uploadImgBase64(base64, ext) {
      this.data.loading = true;
      this.$apiCall(
        "api.User.uploadImgBase64",
        { imgUrlBase64: base64, ext },
        (r) => {
          this.data.loading = false;
          if (r.ErrorCode == 9999) {
            this.data.imgUrl = r.Data.Results.imgUrl;
          } else {
            this.$message.error(r.Message);
          }
        }
      );
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
          });
        };
        reader.readAsDataURL(el.target.files[0]);
      }
    },
    openUpload(){//打开上传
      document.getElementById('pfUpload').click();
    },
    openChat(){
      // Tawk_API.maximize();
    },
    changeType(type){
      this.data.type = type
    },
    onCopy(e) {
      this.$elementMessage('Has been copied to the clipboard', 'success');
    },
    onError(e) {
      this.$elementMessage('Copy to clipboard failed, please copy manually', 'error');
    },
  },
}
</script>

<style lang="scss" scoped>
  .title{
    h2{
      img{
        width: 200px;
      }
    }
  }
  .body-wrap{
    padding: 0 30px;
    .content{
      display: flex;
      .left{
        padding-top: 50px;
        h3{
          margin-bottom: 30px;
          font-size: 24px;
        }
        p{
          line-height: 26px;
          font-size: 14px;
        }
        .btn-wrap{
          display: flex;
          padding-top:40px;
        }
      }
      .right{
        .img-wrap{
          margin-bottom: 30px;
          img{
            width: 315px;
          }
        }
      }
    }
    .el-upload--picture-card{
      width: 100px;
      height: 100px;
      line-height: 98px;
    }
  }
.footer-wrap{
  display: flex;
  justify-content: flex-end;
  .contact{
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-left: 10px;
    a{
      font-size: 12px;
    }
  }
}
.el-upload-list--picture-card .el-upload-list__item{
  width: 100px;
  height: 100px;
}
.el-upload-list--picture-card .el-upload-list__item-thumbnail{
  height: 98px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.submit-wrap{
  display: flex;
  justify-content: flex-end;
}
</style>