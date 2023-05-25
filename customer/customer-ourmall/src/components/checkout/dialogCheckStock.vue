<template>
	<div>
		<el-dialog v-loading="data.loading" :close-on-press-escape="false" :close-on-click-modal="false"
			title="The following orders are out of stock or the products have been off the shelves, whether to delete these orders and continue to pay" :visible.sync="data.isShow" width="800px">
			<el-divider></el-divider>
			<div class="pd-x-20 mg-y-30">
				<el-table stripe :data="data.items" style="width: 100%">
					<el-table-column label="Abnormal SKU" width="350">
						<template slot-scope="scope">
							<div class="d-flex">
								<img :src="scope.row.imgUrl" width="60" height="60"/>
								<div class="mg-l-20">
									<p>{{scope.row.name}}</p>
									<p>SPU: {{scope.row.spu}}</p>
									<p>SKU: {{scope.row.sku}}</p>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="codeName" label="Order Number" width="150">
					</el-table-column>
					<!-- <el-table-column prop="lackQuantity" label="缺少的数量" width="150">
					</el-table-column> -->
					<el-table-column prop="reason" label="Reason for abnormal case" width="250">
					</el-table-column>
				</el-table>
			</div>
			<el-divider></el-divider>
			<div slot="footer" class="dialog-footer" @click="data.isShow = false">
				<el-button>
					{{$t('Cancel')}}
				</el-button>
				<el-button type="primary" @click="continuePay()">
					Pay
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
			continuePay(){
				this.$emit("continuePay")
			}
		}
	};
</script>
<style lang="scss" scoped>

</style>
