<template>
	<div>
		<div class="pagetitle" ref="pageHeader">
			<div class="left">
				<div class="title">
					<i class="el-icon-s-management"></i>
					<h2>{{ $t('app.我的服务') }}(1)</h2>
				</div>
			</div>
			<div class="right"></div>
		</div>
		<el-card class="box-card">
			<div class="erp-manage">
				<!-- <h4>ERP</h4> -->
				<div class="box-flex erp-mabang">
					<div class="log-box">
							<img src="../../../public/images/erp/mabang.png">
							<p class="erp-text">{{ $t('app.马帮erp') }}</p>
					</div>
					
					<div class="right-box">
						<p>{{ $t('app.maBangLogo文案') }}</p>
						<el-link type="primary" @click="openAuth">{{ $t('app.获取授权码') }}</el-link>
					</div>
				</div>
				<!-- <div class="d-flex erp-text">
					<img src="../../../public/images/erp/icon.png" width="25">
					<p>{{ $t('app.您若使用其他ERP') }}</p>
				</div>
				<img src="../../../public/images/erp/qrcode.png" width="300"> -->
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
		// padding: 50px 150px;
		.box-flex{
			display: flex;
		}
		h4{
			font-size: 26px;
			font-weight: 600;
			color: #000000;
			line-height: 37px;
			margin-bottom: 10px;
		}
		.erp-mabang{
			// padding: 26px 46px;
			border-radius: 4px;
			// border: 1px solid #CACACA;
			// margin-bottom: 80px;

			.log-box{
				margin-right: 10px
				p{
					text-align: center;
				}
			}
			img{
				width: 120px;
				height: 120px;
			}
			.erp-text{
				text-align: center;
				font-size: 14px;
				font-weight: 500;
				color: #000;
				line-height: 20px;
			}
		}
		.right-box{
				padding-left: 10px;
			p{
				padding-top: 10px;
				font-size: 14px;
				font-weight: 400;
				color: #666666;
				line-height: 20px;
			}
		}
		// .erp-text{
		// 	p{
		// 		font-size: 14px;
		// 		padding-left: 10px;
		// 		font-weight: 400;
		// 		color: #666666;
		// 		line-height: 20px;
		// 		margin-left: 22px;
		// 	}
		// }
	}
	.box-card{
		width: 400px;
	}
</style>
