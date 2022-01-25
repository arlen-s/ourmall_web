<template>
	<div>
		<div class="pagetitle" ref="pageHeader">
			<div class="left">
				<div class="title">
					<i class="el-icon-s-management"></i>
					<h2>{{ $t('app.应用') }}</h2>
				</div>
			</div>
			<div class="right"></div>
		</div>
		<el-card>
			<div class="erp-manage">
				<h4>ERP</h4>
				<div class="d-flex erp-mabang">
					<img src="../../../public/images/erp/mabang.png" width="150">
					<div class="">
						<p>{{ $t('app.马帮ERP') }}</p>
						<el-link type="primary" @click="openAuth">{{ $t('app.去授权') }}</el-link>
					</div>
				</div>
				<div class="d-flex erp-text">
					<img src="../../../public/images/erp/icon.png" width="25">
					<p>{{ $t('app.您若使用其他ERP') }}</p>
				</div>
				<img src="../../../public/images/erp/qrcode.png" width="300">
			</div>
		</el-card>
		<dialoAuth :authData="dialoAuthInfo" @openSecretKey="openSecretKey"></dialoAuth>
		<dialogKey :keyData="dialoKeyInfo" @openAddComment="openAddComment"></dialogKey>
		<DialogEditComment :DialogEditComment="DialogEditComment"></DialogEditComment>
	</div>
</template>

<script>
	import dialoAuth from "../orderManage/dialoAuth.vue";
	import dialogKey from "../orderManage/dialogKey.vue";
	import DialogEditComment from "../orderManage/DialogEditComment.vue";
	export default {
		data() {
			return {
				dialoAuthInfo: {
					isShow: false,
					loading: false,
					shopData: []
				},
				dialogAuthInfoDefault: "{}",
				dialoKeyInfo: {
					isShow: false,
					loading: false,
				},
				dialogKeyInfoDefault: "{}",
				DialogEditComment: {
					loading: false,
					uploadLoading: false,
					visible: false,
					contents: "",
					shopName: "",
					attach: [],
					commentId: "",
					item: null,
				},
				DialogEditCommentDefault: "{}",
			}
		},
		components: {
			dialoAuth,
			dialogKey,
			DialogEditComment,
		},
		created() {},
		mounted() {
			this.dialogAuthInfoDefault = JSON.stringify(this.dialoAuthInfo);
			this.dialogKeyInfoDefault = JSON.stringify(this.dialoKeyInfo);
			this.DialogEditCommentDefault = JSON.stringify(this.DialogEditComment);
		},
		methods: {
			openAddComment() {
				//打开新建工单
				if (this.$refs.uploadFile) this.$refs.uploadFile.clearFiles();
				this.DialogEditComment = JSON.parse(this.DialogEditCommentDefault);
				this.DialogEditComment.visible = true;
			},
			openSecretKey() {
				this.dialoKeyInfo = JSON.parse(this.dialogKeyInfoDefault);
				this.dialoKeyInfo.isShow = true;
			},
			openAuth() {
				this.dialoAuthInfo = JSON.parse(this.dialogAuthInfoDefault);
				this.dialoAuthInfo.shopData = localStorage.getItem("userInfo") ?
					JSON.parse(localStorage.getItem("userInfo")).erpShops : [];
				this.dialoAuthInfo.isShow = true;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.erp-manage{
		padding: 50px 150px;
		h4{
			font-size: 26px;
			font-weight: 600;
			color: #000000;
			line-height: 37px;
			margin-bottom: 10px;
		}
		.erp-mabang{
			padding: 26px 46px;
			border-radius: 4px;
			border: 1px solid #CACACA;
			margin-bottom: 80px;
			width: 500px;
			img{
				margin-right: 37px;
			}
			p{
				font-size: 24px;
				font-weight: 500;
				color: #0F0252;
				line-height: 33px;
				margin-bottom: 20px;
			}
		}
		.erp-text{
			margin-bottom: 30px;
			p{
				font-size: 14px;
				font-weight: 400;
				color: #666666;
				line-height: 20px;
				margin-left: 22px;
			}
		}
	}
</style>
