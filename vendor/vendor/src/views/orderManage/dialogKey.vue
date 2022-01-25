<template>
	<el-dialog :title="$t('invoice.usertoken')" :visible.sync="keyData.isShow" width="800px" :close-on-click-modal="false"
		append-to-body>
		<el-divider></el-divider>
		<div style="margin: 20px; color: #303133">
			<p>
				{{ $t("invoice.software") }}
			</p>
		</div>
		<div class="d-body">
			<p>
				{{ $t("invoice.pastetoken") }}
			</p>
			<div class="d-flex" style="justify-content: space-around; margin: 15px 0">
				<div style="width: 48%; margin-right: 2%">
					<p class="mg-y-10">{{ $t("invoice.Picture1") }}</p>
					<img width="100%" src="../../../public/images/secretKey1.png" style="border: 1px solid #ddd" />
				</div>
				<div style="width: 48%; margin-left: 2%">
					<p class="mg-y-10">{{ $t("invoice.Picture2") }}</p>
					<img width="100%" src="../../../public/images/secretKey2.jpg" style="border: 1px solid #ddd" />
				</div>
			</div>
			<p style="margin-top: 10px">
				{{ $t("invoice.present") }}
				<el-link target="_blank" type="primary" :underline="false" href="//www.mabangerp.com/">马帮ERP
				</el-link>
				{{ $t("invoice.soon") }}
			</p>
		</div>
		<div style="margin: 20px; color: rgb(153, 153, 153)">
			<p>
				{{ $t("invoice.sametime") }}
				<el-link type="primary" :underline="false" @click="openAddComment">
					{{ $t("invoice.contact") }}
				</el-link>。
			</p>
		</div>
		<el-divider></el-divider>
		<div slot="footer" class="dialog-footer">
			<el-button size="small" type="primary" @click="keyData.isShow = false">
				{{ $t("importdata.gotIt") }}
			</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		props: ["keyData"],
		data() {
			return {
			}
		},
		methods: {
			openAddComment(){
				this.$emit("openAddComment")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.d-body{
		margin: 0 20px;
		padding: 15px;
		background-color: #fafafa;
		border: 1px solid #eaeefb;
		border-radius: 4px;
		color: #303133;
	}
</style>
