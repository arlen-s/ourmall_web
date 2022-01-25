<template>
  <div>
    <el-dialog
      title="Request a quotation for products"
      :visible.sync="openCardDialog"
      @close='closeDialog'
    >
      <el-divider></el-divider>
      <div class="proQuotation" v-if="imgView">
        <div class="quotationTit">products for quotation</div>
        <div style="display: flex">
          <div class="imgList">
            <img
              :src="item"
              v-for="item in imgList"
              :key="item"
              class="upload imgItem"
            />
          </div>
          <div class="upload" @click="openForm">
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </div>
      <!-- from -->
      <div class="formRole" v-if="isForm" v-loading="loading">
        <div class="quotationTit">Product information</div>
        <el-form :model="form" label-position="left" label-width="150px">
          <el-form-item label="Product images:" required>
            <div class="upload" @click="uploadOpen">
              <i class="el-icon-plus" v-if="!form.imgUrl"></i>
              <el-image
                style="width: 100%; height: 100%"
                :src="form.imgUrl"
                :fit="'cover'"
                v-else
              ></el-image>
            </div>
          </el-form-item>
          <el-form-item label="Details:" required>
            <el-input
              v-model="form.details"
              placeholder="Product name / URL / description or anything you can tell us"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="Expected price (US$):">
            <el-input-number v-model="form.price" :controls="false"></el-input-number>
          </el-form-item>
          <el-form-item label="Remarks:">
            <el-input
              v-model="form.remark"
              :placeholder="`Leave your message that you want to tell ${$root.$children[0].pName.a} Vendors`"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="save" @click="saveQuotation"
          >Save</el-button
        >
      </div>
      <el-divider></el-divider>
      <!-- <footer> -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">Submit Request</el-button>
        <el-button @click="closeQuotation">Discard</el-button>
      </div>
    </el-dialog>
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
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        imgUrl: "",
        details: "",
        price: undefined,
        remark: "",
      },
      imgView:false,
      outerVisible: false,
      innerVisible: false,
      isForm: true,
      loading: false,
      dialogVisible: false,
      imgList: [],
      detailsList: [],
      priceList: [],
      remarkList: [],
    };
  },
  computed: {
    openCardDialog: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val); // openCardDialog改变的时候通知父组件
      },
    },
  },
  mounted(){
    

  },
  methods: {
    openForm() {
      this.isForm = true;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 800);
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
            this.form.imgUrl = r.Data.Results.imgUrl;
          } else {
            this.$message.error(r.Message);
          }
        }
      );
    },
    saveQuotation() {
      if (this.form.imgUrl == "") {
        this.$message.error("Please select a picture !");
        return false;
      }
      if (this.form.details == "") {
        this.$message.error("Please fill in the details !");
        return false;
      }
      this.imgView = true;
      this.isForm = false;
      this.imgList.push(this.form.imgUrl);
      this.detailsList.push(this.form.details);
      this.priceList.push(this.form.price);
      this.remarkList.push(this.form.remark);
      this.form = {
        imgUrl: "",
        details: "",
        price: undefined,
        remark: "",
      };
    },
    closeQuotation() {
      this.openCardDialog = false;
      this.form = {
        imgUrl: "",
        details: "",
        price: undefined,
        remark: "",
      };
      this.imgList= [];
      this.detailsList= [];
      this.priceList= [];
      this.remarkList= [];
      this.isForm = true;
      this.imgView = false;
    },
    closeDialog(){
    this.closeQuotation()
    },
    submit() {
      let products = [];
      for(let i = 0;i<this.imgList.length;i++){
        products.push({
          detail: this.detailsList[i],
          imgUrl: this.imgList[i],
          expectPrice: this.priceList[i],
          remarks: this.remarkList[i],
        })
      }
      this.$apiCall(
        "api.OfferList.genOfferProduct",
        {
          products
        },
        (r) => {
          if(r.ErrorCode == 9999){
            this.$message.success("Submit Success !");
            this.closeQuotation();
            this.$router.push('/Waiting-for-vendors-respond')
          }else{
            this.$message.error(r.Message)
          }
        }
      );
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
.formRole {
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  background: rgb(242, 243, 242);
}
.proQuotation {
  margin: 20px;
}
.save {
  margin: 0 auto;
  width: 100px;
  text-align: center;
}
.upload {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 110px;
  height: 110px;
  cursor: pointer;
  line-height: 110px;
  vertical-align: top;
  text-align: center;
  margin-right: 15px;
  i {
    font-size: 16px;
  }
}

.quotationTit {
  margin-bottom: 15px;
  color: #222;
  font-size: 17px;
}
.imgItem {
  object-fit: cover;
}
</style>
