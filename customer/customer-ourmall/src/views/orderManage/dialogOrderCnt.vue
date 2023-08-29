<template>
	<div>
		<el-dialog v-loading="data.loading" :close-on-press-escape="false" :close-on-click-modal="false"
			title="订单信息" :visible.sync="data.isShow" width="800px">
			<el-divider></el-divider>
			<div class="pd-x-20 mg-y-30">
				<el-table stripe :data="data.items" style="width: 100%">
					<el-table-column prop="codeName" :label="$t('第三方订单编号')" width="150">
					</el-table-column>
					<el-table-column prop="orderId" :label="$t('订单编号')" width="200">
					</el-table-column>
					<el-table-column prop="store" :label="$t('店铺')" width="150">
					</el-table-column>
					<el-table-column prop="timeCreated" label="创建时间" width="250">
					</el-table-column>
				</el-table>
			</div>
			<el-divider></el-divider>
			<div slot="footer" class="dialog-footer" @click="data.isShow = false">
				<el-button>
					{{$t('取消')}}
				</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props: ["data"],
		data() {
			return {}
		},
		created() {},
		mounted() {

		},
		methods: {
		}
	};
</script>
<style lang="scss" scoped>

</style>
