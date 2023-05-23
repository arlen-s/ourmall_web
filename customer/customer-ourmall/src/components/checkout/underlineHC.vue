<template>
  <div>
    <el-dialog v-loading="data.loading" 
      :close-on-press-escape="false"
			:close-on-click-modal="false"
      title="Bitte laden Sie Ihren Zahlungsbeleg hoch" :visible.sync="data.isShow" width="800px" @open="open">
      <el-divider></el-divider>
	  <div class="pd-x-20 mg-y-30 underline-payment">
		  <el-row :gutter="20" class=" mg-y-20">
		    <el-col :span="7" style="text-align: right;">
		  	  Zahlungsbetrag ({{$store.state.country.symbol}})：
		    </el-col>
		    <el-col :span="16">
		  	  {{data.payAmount}}
		    </el-col>
		  </el-row>
		  <el-row :gutter="20" class=" mg-y-20">
		    <el-col :span="7" style="text-align: right;">
		  	  Zahlungsanweisungen：
		    </el-col>
		    <el-col :span="16">
		  	  <div class="ql-container ql-snow">
		  	  	<div class="ql-editor" v-html="data.params.info2">
		  	  	</div>
		  	  </div>
		    </el-col>
		  </el-row>
		  <el-row :gutter="20" class=" mg-y-20">
		    <el-col :span="7" style="text-align: right;">
		  	  Andere Details：
		    </el-col>
		    <el-col :span="16">
				<div class="ql-container ql-snow">
					<div class="ql-editor" v-html="data.params.info1">
					</div>
				</div>
		    </el-col>
		  </el-row>
	  	<el-row :gutter="20" class=" mg-y-20">
	  	  <el-col :span="7" style="text-align: right;">
			  Konto für die Zahlung：
		  </el-col>
	  	  <el-col :span="16">
			  <el-input v-model="account" placeholder="Konto für die Zahlung"></el-input>
		  </el-col>
	  	</el-row>
		<el-row :gutter="20" class=" mg-y-20">
		  <el-col :span="7" style="text-align: right;">
			  Zahlungsbeleg：
		  </el-col>
		  <el-col :span="16">
			  <el-upload
			    class="avatar-uploader upload-demo"
			    action=""
				:http-request="uploadSectionFile2"
			    :show-file-list="false">
			    <img v-if="imageUrl" :src="imageUrl" class="avatar">
			    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			  </el-upload>
		  </el-col>
		</el-row>
	  </div>
	  <el-divider></el-divider>
	  <div slot="footer" class="dialog-footer">
	  	<el-button type="primary" @click="submitUnderline">
	  		Pay
	  	</el-button>
	  </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data(){
    return{
		account:"",
		imageUrl:""
	}
  },
  created() {
  },
  mounted(){

  },
  methods: {
	  open(){
	  	this.account = "";
	  	this.imageUrl = "";
	  },
	  submitUnderline(){
		  if (!this.account) {
		  	this.$elementMessage('Zahlungskonto muss ausgefüllt werden', 'error')
		  	return;
		  }
		  if (!this.imageUrl) {
		  	this.$elementMessage('Lohnschein muss ausgefüllt werden', 'error')
		  	return;
		  }
		  this.$emit("submitUnderline",this.account,this.imageUrl);
	  },
	  uploadSectionFile2(params) {
	    let uploadFile = params.file;
	    // const isLt = uploadFile.size / 1024 / 1024 < 0.5;
	    // if (!isLt) {
	    //   this.$message.error("上传图片大小不能超过 500kb!");
	    //   return;
	    // }
		this.$showLoading();
	    this.$apiCall(
	      "api.User.uploadImg",
	      {
	        "@file": uploadFile,
	      },
	      (r) => {
	        if (r.ErrorCode == "9999") {
				this.imageUrl = r.Data.Results.imgUrl;
	        } else {
	          this.$elementMessage(r.Message, "error");
	        }
			this.$hideLoading();
	      }
	    );
	  },
  }
};
</script>
<style lang="scss" scoped>
.upload-demo:hover, .upload-demo:focus {
    border-color: #409eff;
    color: #409eff;
}
.upload-demo {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    cursor: pointer;
    line-height: 146px;
    vertical-align: top;
	font-size: 28px;
	color: #8c939d;
	text-align: center;
}
.avatar {
    width: 146px;
    height: 146px;
    display: block;
  }
</style>
<style type="text/css">
	.underline-payment{
		word-break: break-word;
	}
</style>
