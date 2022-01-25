<template>
	<el-dialog :title="$t('ticket.submitTicket')" :visible.sync="DialogEditComment.visible" width="800px"
		@closed="$refs.uploadFile.clearFiles()" append-to-body>
		<el-divider></el-divider>
		<div>
			<el-form ref="CommentForm">
				<el-form-item :label="$t('ticket.problemsOrRequirements')">
					<el-input type="textarea" v-model="DialogEditComment.contents"></el-input>
				</el-form-item>
				<el-form-item label="">
					<div style="font-size: 16px; font-weight: bold; margin: 20px 0 0">
						{{ $t("ticket.uploadImageAttachment") }}
					</div>
				</el-form-item>
				<el-form-item label="">
					<el-upload ref="uploadFile" :on-change="handleChangeImg"
						:before-remove="handleRemoveImg" action="" :auto-upload="false"
						accept="image/gif,image/jpeg,image/jpg,image/png" class="upload-file">
						<el-button ref="uploadBtn" size="small" type="primary"
							:loading="DialogEditComment.uploadLoading">{{ $t("ticket.browse") }}</el-button>
					</el-upload>
				</el-form-item>
			</el-form>
		</div>
		<el-divider></el-divider>
		<div slot="footer" class="dialog-footer d-flex justify-content-end">
			<div class="mg-r-15">
				<el-button size="small" type="primary" :loading="DialogEditComment.loading"
					@click="saveComment">{{ $t("ticket.submitTicket") }}</el-button>
			</div>
			<div>
				<el-button size="small" @click="DialogEditComment.visible = false">
					{{ $t("invoice.cancel") }}</el-button>
			</div>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		props: ["DialogEditComment"],
		data() {
			return {
			}
		},
		methods: {
			handleRemoveImg(file, fileList) {
				fileList.forEach((e, index) => {
					if (e.name == file.name) {
						this.DialogEditComment.attach.splice(index, 1);
					}
				});
			},
			handleChangeImg(file) {
				this.DialogEditComment.loading = true;
				this.DialogEditComment.uploadLoading = true;
				this.$apiCall(
					"api.Comment.uploadAttach", {
						"@file": file.raw,
					},
					(r) => {
						this.DialogEditComment.loading = false;
						this.DialogEditComment.uploadLoading = false;
						if (r.ErrorCode == "9999") {
							this.DialogEditComment.attach.push(r.Data.Results.url);
						} else {
							this.$elementMessage(r.Message, "error");
						}
					}
				);
			},
			saveComment() {
				//保存新建工单
				if (!this.DialogEditComment.contents) {
					this.$message({
						message: this.$t("invoice.emptyQuestion"),
						type: "error",
					});
					return false;
				}
				this.DialogEditComment.loading = true;
				this.$apiCall(
					"api.Comment.addByUser", {
						commentId: this.DialogEditComment.commentId,
						contents: this.DialogEditComment.contents,
						shopName: this.DialogEditComment.shopName,
						attach: this.DialogEditComment.attach,
					},
					(r) => {
						this.DialogEditComment.loading = false;
						if (r.ErrorCode == 9999) {
							this.DialogEditComment.visible = false;
							this.$message({
								message: this.$t("app._wewillReplyASAP"),
								type: "success",
							});
						} else {
							this.$message({
								message: r.Message,
								type: "error",
							});
						}
					}
				);
			},
		}
	}
</script>

<style>
</style>
