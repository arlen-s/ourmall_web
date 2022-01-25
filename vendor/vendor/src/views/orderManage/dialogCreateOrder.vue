<template>
	<el-dialog :visible.sync="data.isShow" :title="$t('orders.创建订单')" width="600px" @close="closeDialog">
		<el-divider></el-divider>
		<div class="d-body" style="margin: 20px;">
			<el-alert type="warning" :closable="false">
				<div class="d-flex" style="justify-content: space-between;">
					<span>{{$t("orders.请按照提供的模板文件创建订单")}}</span>
					<el-button type="text" @click="downloadFile">{{$t("invoice.template") }}</el-button>
				</div>
			</el-alert>	
			<div class="mg-t-20">
				<el-upload class="upload-demo" ref="upload" action=""
					accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
					:auto-upload="false" :file-list="uploadfileList" :on-change="handleUploadChange">
                    <el-button slot="trigger" size="small" type="primary">{{ $t("invoice.fileSelect")}}</el-button>
					<div slot="tip" class="el-upload__tip mg-y-15" style="margin-top: 20px">
						<p>1.{{$t("orders.请按规范填写表格，仅支持xlsx格式文件")}}</p>
						<p>2.{{$t("orders.上传的文件不能超过2M，只处理前99条数据")}}</p>
						<p style="color:#f56c6c">3.{{$t("orders.订单编号处若填写同一编号为同一订单")}}</p>
					</div>
				</el-upload>
			</div>
		</div>
		<el-divider></el-divider>
		<div slot="footer" class="dialog-footer">
			<el-button @click="data.isShow = false">{{$t("orders.取消")}}</el-button>
			<el-button @click="createUpload()" type="primary">{{$t("orders.提交")}}</el-button>
		</div>	
	</el-dialog>
</template>

<script>
	export default {
		props: ["data"],
		data() {
			return {
				uploadfileList: [],
			}
		},
		methods: {
			closeDialog(){
               this.uploadfileList = [];
			},
			downloadFile() {
				let url = "/newFile/orders_creat.xlsx";
				if ($("#downloadFileCreate").length == 0) {
					$("body").append(
						'<iframe id="downloadFileCreate" style="display:none"></iframe>'
					);
				}
				let openDownload = (url) => {
					document.getElementById("downloadFileCreate").src = url;
				};
				openDownload(url);
			},
			handleUploadChange(file) {
				this.uploadfileList = [];
				this.uploadfileList.push(file);
			},
			createUpload() {
				if (!this.uploadfileList.length) {
					this.$elementMessage(this.$t("invoice.selectfile"), "error");
					return;
				}
				if(this.uploadfileList[0].raw.size / 1024 / 1024 > 2){
                  	this.$message({ message: this.$t("orders.上传文件不能大于2MB"), type: "error" });
	  				return;
				}
				let uploadFile = this.uploadfileList[0].raw;
				this.$emit("createUpload",uploadFile);
				this.uploadfileList = [];
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>
