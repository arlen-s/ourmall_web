<template>
	<el-dialog :visible.sync="importData.isShow" :title="$t('invoice.shippinginformation')" width="800px">
		<el-divider></el-divider>
		<div class="d-body" style="margin: 20px;">
			<div class="draw-alert mg-b-20">
				<el-alert type="warning" :closable="false">
					<div class="d-flex" style="justify-content: space-between;">
						<span>{{ $t("invoice.templateprovided") }}</span>
						<el-button type="text" @click="downloadFile">{{$t("invoice.template") }}</el-button>
					</div>
				</el-alert>
			</div>
			<div style="margin-top: 40px">
				<el-upload class="upload-demo" ref="upload" action=""
					accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
					:auto-upload="false" :file-list="uploadfileList" :on-change="handleUploadChange">
					<el-button slot="trigger" size="small" type="primary">{{ $t("invoice.fileSelect")}}</el-button>
					<template>
						<el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload">
							{{ $t("invoice.shippinginformation") }}
						</el-button>
					</template>

					<div slot="tip" class="el-upload__tip mg-y-15" style="margin-top: 20px">
						<p>{{ $t("invoice.shippinginformation1") }}</p>
						<p>{{ $t("invoice.shippinginformation2") }}</p>
					</div>
				</el-upload>
			</div>
		</div>
		<el-divider></el-divider>
		<div slot="footer" class="dialog-footer">
			<el-button @click="importData.isShow = false">取消</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		props: ["importData"],
		data() {
			return {
				uploadfileList: [],
			}
		},
		methods: {
			downloadFile() {
				let url = "/newFile/orders_impor.xlsx";
				if ($("#downloadFile").length == 0) {
					$("body").append(
						'<iframe id="downloadFile" style="display:none"></iframe>'
					);
				}
				let openDownload = (url) => {
					document.getElementById("downloadFile").src = url;
				};
				openDownload(url);
			},
			handleUploadChange(file) {
				this.uploadfileList = [];
				this.uploadfileList.push(file);
			},
			submitUpload() {
				if (!this.uploadfileList.length) {
					this.$elementMessage(this.$t("invoice.selectfile"), "error");
					return;
				}
				let uploadFile = this.uploadfileList[0].raw;
				this.$emit("submitUpload",uploadFile);
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>
