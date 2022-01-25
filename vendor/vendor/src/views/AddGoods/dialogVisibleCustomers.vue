<template>
	<el-dialog title="" :visible.sync="keyData.isShow" width="500px" :close-on-click-modal="false" :show-close="false"
		append-to-body>
		<div class="d-body">
			<h4>{{$t('goods.以下客户已对')}}</h4>
			<el-table stripe :data="keyData.items" style="width: 100%">
				<el-table-column prop="email" :label="$t('goods.客户邮箱')">
				</el-table-column>
				<el-table-column prop="name" :label="$t('goods.客户名称')" width="200">
				</el-table-column>
			</el-table>
		</div>
		<el-divider></el-divider>
		<div slot="footer" class="dialog-footer">
			<!-- <el-button size="small" @click="keyData.isShow = false">
				{{ $t('goods.取消') }}
			</el-button> -->
			<el-button size="small" type="primary" @click="checkVisibleCustomers">
				{{ $t('goods.确定') }}
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
			checkVisibleCustomers(){
				this.$emit("checkVisibleCustomers",this.keyData.step,this.keyData.items)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.d-body{
		margin: 0 20px;
		padding: 15px;
		h4{
			margin-bottom: 20px;
		}
	}
</style>
