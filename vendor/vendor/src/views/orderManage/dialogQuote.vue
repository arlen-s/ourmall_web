<template>
	<el-dialog :visible.sync="quoteData.isShow" :title="$t('orders.Made')" width="800px">
		<el-divider></el-divider>
		<div class="d-body" style="margin: 20px;">
				<el-table stripe :data="quoteData.items" style="width: 100%">
					<el-table-column :label="$t('orders.productinfo')" width="350">
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
					<el-table-column prop="quantity" :label="$t('orders.qty')" width="150">
					</el-table-column>
					<el-table-column :label="$t('orders.price')" width="150">
						<template slot-scope="scope">
							<span>{{scope.row.currency}} {{scope.row.price || 0}}</span>
						</template>
					</el-table-column>
					<el-table-column :label="$t('orders.operate')">
						<template slot-scope="scope">
							<div>
								<el-link class="mg-r-20" type="primary" @click="goto">
									{{$t('orders.putaway')}}
								</el-link>
								<el-link class="mg-r-20" type="primary" @click="openRelate(scope.row)">
									{{$t('orders.relate')}}
								</el-link>
							</div>
						</template>
					</el-table-column>
				</el-table>
		</div>
		<el-divider></el-divider>
		<div slot="footer" class="dialog-footer">
			<el-button @click="quoteData.isShow = false">{{$t('orders.cancel')}}</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		props: ["quoteData"],
		data() {
			return {
			}
		},
		methods: {
			goto(){
				let routeData = this.$router.resolve({name: 'AddGoods'});
				window.open(routeData.href, '_blank');
			},
			openRelate(item){
				this.$emit("openRelate",item);
			}
		}
	}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
	  height: 62vh;
	  overflow: auto;
	}
</style>
