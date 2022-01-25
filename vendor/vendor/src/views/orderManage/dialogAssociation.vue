<template>
	<el-dialog 
		class="dialog-association"
		:visible.sync="dialogAssociation.isShow"
		width="500px"
		title="">
		<el-row v-if="dialogAssociation.hasProduct">
			<el-row class="tx-center">
				<h3 style="padding: 40px 0;">{{ $t('orders.之前已有选中商品尚未被处理，是否继续报价？') }}</h3>
				<div>
					<el-button class="mt-15" type="primary" @click="giveUpFn">{{ $t('orders.放弃') }}</el-button>
					<el-button class="mt-15" type="primary" @click="continueFn">{{ $t('orders.继续报价') }}</el-button>
				</div>
			</el-row>
		</el-row>
		<el-row v-if="!dialogAssociation.hasProduct">
			<!-- <el-row class="tx-center">
				<h3>{{ $t('orders.请选择对应的订单号导入关联,方便能快速匹配') }}</h3>
				<el-button class="mt-15" type="primary">{{ $t('orders.知道了') }}</el-button>
			</el-row> -->
			<el-row class="tx-flex">
				<div>
					<el-upload
						class="upload-demo"
						drag
						action=""
						:show-file-list="false"
						:on-change="handleUploadChange"
						:auto-upload="false">
						<i class="el-icon-document-copy"></i>
						<div class="el-upload__text">{{ $t('orders.选择文件') }}</div>
					</el-upload>
				</div>
				<div style="width: 200px;">
					<div>{{ $t('orders.请按规范填写表格仅支持xlsx格式文件') }}</div>
					<div>{{ $t('orders.上传的文件不能超过10M') }} </div>
				</div>
			</el-row>
			<el-row class="tx-right pd-30">
				<el-button @click="cancelFn">{{ $t('orders.取消') }}</el-button>
			</el-row>
		</el-row>
	</el-dialog>
</template>

<script>
export default {
	props: ['dialogAssociation'],
	mounted () {
	},
	methods: {
		cancelFn () {
			this.dialogAssociation.isShow = false
		},
		giveUpFn () {
			this.$apiCall('api.ShopifyOrder.clearWaitBindItem', {}, (r) => {
				if (r.ErrorCode == 9999) {
					this.dialogAssociation.hasProduct = false
				} else {
					this.$elementMessage(r.Message, 'error')
				}
			})
		},
		continueFn () {
			this.$router.push({ path: '/orderAssociation' })
		},
		handleUploadChange (file) {
			this.$showLoading();
			this.$apiCall('api.ShopifyOrder.importNotBindItem', {
				'@file': file.raw
			}, (r) => {
				this.$hideLoading();
				if (r.ErrorCode == 9999) {
					this.$router.push({ path: '/orderAssociation' })
				} else {
					this.$elementMessage(r.Message, 'error')
				}
			})
		},
	}
}
</script>
<style>
.dialog-association .el-upload-dragger .el-upload__text {
	margin-top: 10px;
}
.dialog-association .el-upload-dragger .el-icon-document-copy {
	margin-top: 20px;
	font-size: 140px;
}
.dialog-association .el-upload-dragger{
	width: 200px;
	height: 200px !important;
}
</style>
<style lang="scss" scoped>
.tx-flex {
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.upload-demo {}
.mt-15 {
	margin-top: 15px;
}
.pd-30 {
	padding: 0 30px;
}
</style>