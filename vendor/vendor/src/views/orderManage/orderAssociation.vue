<template>
	<div class="contentpanel transaction-page">
		<div class="pagetitle" ref="pageHeader">
			<div class="left">
				<div class="title">
					<el-link type="primary" @click="goback"
					  >{{$t('orders.back')}}</el-link
					>
					<span style="margin: 0 20px">/</span>
					<!-- <i class="el-icon-s-management"></i> -->
					<h2>{{$t('orders.导入确认')}}</h2>
				</div>
			</div>
			<div class="right">
				<el-button type="primary" @click="waitSubmit">{{$t('orders.提交')}}</el-button>
			</div>
		</div>
		<div class="mg-t-20">
				<el-button @click="batchDelete">{{$t('orders.批量删除')}}</el-button>
				
		</div>
		<div class="pagebody">
			<el-row :gutter="15" class="mg-b-20">
				<el-col :span="24" class="mg-b-30 mg-t-10">
					<el-card>
						<el-table border :data="items" style="width: 100%" @selection-change="selectionChange">
							<el-table-column align="center" type="selection"></el-table-column>
							<el-table-column width="80" align="center" :label="$t('orders.商品id')" prop="itemId"></el-table-column>
							<el-table-column width="140" align="center" :label="$t('orders.商品图片链接')">
								<template slot-scope="scope">
									<img :src="scope.row.imgUrl"  style="width: 100px;height: 100px;" />
								</template>
							</el-table-column>
							<el-table-column width="400" align="center" :label="$t('orders.店铺商品名称')" prop="itemName"></el-table-column>
							<el-table-column width="200" align="center" :label="$t('orders.店铺sku')" prop="itemSku"></el-table-column>
							<el-table-column align="center" :label="$t('orders.客户名称')" prop="customerName"></el-table-column>
							<el-table-column align="center" :label="$t('orders.店铺')" prop="shopName"></el-table-column>
							<el-table-column align="center" :label="$t('orders.供应商sku')" prop="vendorSku">
								<template slot-scope="scope">
									<div :style="{ color: scope.row.vendorSkuStatus == 1 ? '': 'red' }">{{ scope.row.vendorSku }}</div>
									<div v-if="scope.row.vendorSkuStatus == 1"></div>
									<div v-if="scope.row.vendorSkuStatus == 2" style="color:red">{{$t('orders.商品下架')}}</div>
									<div v-if="scope.row.vendorSkuStatus == 3" style="color:red">{{$t('orders.商品不存在')}}</div>
								</template>
							</el-table-column>
							<el-table-column width="100" align="center" :label="`${$t('orders.店铺售价')}`">
								<template slot-scope="scope">
									<div>{{ scope.row.currency }} {{ scope.row.itemPrice }}</div>
								</template>
							</el-table-column>
							<el-table-column align="center" :label="$t('orders.状态')">
								<template slot-scope="scope">
									<div v-if="scope.row.matchStatus == 1">{{$t('orders.匹配成功')}}</div>
									<div v-if="scope.row.matchStatus == 2" style="color:red">{{$t('orders.匹配失败')}}</div>
								</template>
							</el-table-column>
							<el-table-column align="center" :label="$t('orders.operate')">
								<template slot-scope="scope">
									<el-link type="primary" :underline="false" @click="openRelate(scope.row)">{{$t('orders.关联')}}</el-link><br/>
									<el-link type="primary" :underline="false" @click="deleteFn(scope.row)">{{$t('orders.删除')}}</el-link>
								</template>
							</el-table-column>
						</el-table>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<dialogAssRelate :relateData="dialogRelateInfo" @relateFn="relateFn"></dialogAssRelate>

		<el-dialog
			width="500px"
			:visible.sync="dialogDelete.isShow">
			<el-row class="tx-center">
				<h3>{{$t('orders.是否确认删除所选的商品,删除后需重新关联')}}</h3>
				<div class="mg-t-20">
					<el-button @click="deleteHandle">{{$t('orders.知道了')}}</el-button>
				</div>
			</el-row>	
		</el-dialog>
	</div>
</template>

<script>
	import dialogAssRelate from "./dialogAssRelate.vue";
	export default {
		data() {
			return {
				dialogDelete: {
					isShow: false,
					item: null
				},
				dialogRelateInfo: {
					isShow: false,
					loading: false,
					items: [],
					Pagination: {},
					item: "",
					list: [],
				},
				dialogRelateInfoDefault: "{}",
				items:[],
				selectionIds: [],
				batchDeleteStatus: false,
				isSave: false,
			};
		},
		components: {
			dialogAssRelate,
		},
		watch: {},
		mounted() {
			this.dialogRelateInfoDefault = JSON.stringify(this.dialogRelateInfo);
			this.getItems();
		},
		beforeRouteLeave(to, from, next) {
			if (to.name != 'orderAssociation') {
				if (!this.isSave) {
					let c = confirm(this.$t('orders.需点击提交后，才能完成报价'))
					if (c) {
						next()
					} else {
						next(false)
					}
				} else {
					next()
				}
			} else {
				next();
			}
		},
		methods: {
			waitSubmit () {
				this.$apiCall('api.ShopifyOrder.setSkuRelationWaitBindItem', {}, (r) => {
					if (r.ErrorCode == 9999) {
						this.isSave = true;
						this.$router.push({path: '/ordersManage/2/1'})
					} else {
						this.$elementMessage(r.Message, 'error')
					}
				})
			},
			selectionChange (selection) {
				console.log(selection)
				this.selectionIds = []
				selection.forEach((item) => {
					this.selectionIds.push(item.variableId)
				})
			},
			batchDelete () {
				if (this.selectionIds.length == 0) {
					this.$elementMessage(this.$t('orders.请选择需要删除的数据'), 'error')
					return;
				}

				this.batchDeleteStatus = true
				this.dialogDelete.isShow = true
			},
			deleteFn (row) {
				this.dialogDelete.isShow = true
				this.dialogDelete.item = row
			},
			deleteHandle () {
				let ids = []
				if (this.batchDeleteStatus) {
					ids = this.selectionIds
				} else {
					ids = [this.dialogDelete.item.variableId]
				}
				this.$apiCall('api.ShopifyOrder.delWaitBindItem', {
					ids: ids
				}, (r) => {
					this.batchDeleteStatus = false
					if (r.ErrorCode == 9999) {
						this.$elementMessage(this.$t('orders.删除成功'), 'success')
						this.dialogDelete.isShow = false
						this.dialogDelete.item = null
						this.getItems()
					} else {
						this.$elementMessage(r.Message, 'error')
					}
				})
			},
			goback(){
				this.$router.push({path:"ordersManage/2/1"})
			},
			handleSizeChange (val) {
				this.pagination.pageSize = val
				this.getItems()
			},
			handleCurrentChange (val) {
				this.pagination.currentPage = val
				this.getItems()
			},
			getItems(){
				this.$apiCall('api.ShopifyOrder.getWaitBindItem', {
					// page: this.pagination.currentPage,
					// rowsPerPage: this.pagination.pageSize,
				}, (r) => {
					if (r.ErrorCode == 9999) {
						this.items = r.Data.Results
					} else {
						this.$elementMessage(r.Message, 'error')
					}
				})
			},
			openRelate(item){
				this.$showLoading();
				this.$apiCall("api.VendorShop.vendorFindProducts", {
					page: 1,
					rowsPerPage: 10,
					status:1
				}, (r) => {
					if (r.ErrorCode == "9999") {
						if (!r.Data.Results.products || !r.Data.Results.products.length) {
							this.$hideLoading();
							this.$elementMessage("No data", "error");
							return;
						}
						this.dialogRelateInfo = JSON.parse(this.dialogRelateInfoDefault);
						this.dialogRelateInfo.isShow = true;
						this.dialogRelateInfo.item = item;
						this.dialogRelateInfo.Pagination = r.Data.Pagination;
						this.dialogRelateInfo.items = [];
						this.dialogRelateInfo.list = [];
						r.Data.Results.products.forEach(item1 => {
							if (item1.stocks && item1.stocks.length) {
								item1.stocks.forEach(obj => {
									this.$set(obj, "name", item1.name);
									this.dialogRelateInfo.items.push(obj);
								})
							}
							this.dialogRelateInfo.list.push(item1);
						})
					} else {
						this.$elementMessage(r.Message, "error");
					}
					this.$hideLoading();
				})
			},
			relateFn(sku) {
				this.$showLoading();
				this.$apiCall("api.ShopifyOrder.setSkuRelation", {
					customerSku: this.dialogRelateInfo.item.variableId,
					customerId: this.dialogRelateInfo.item.customerId,
					vendorSku: sku,
				}, (r) => {
					if (r.ErrorCode == "9999") {
						this.$elementMessage(this.$t('orders.success'), "success");
						this.dialogRelateInfo = JSON.parse(this.dialogRelateInfoDefault);
						this.getItems();
					} else {
						this.$elementMessage(r.Message, "error");
					}
					this.$hideLoading();
				})
			},
		},
		// beforeDestroy () {
		// 	this.$apiCall('api.ShopifyOrder.clearWaitBindItem', {}, (r) => {
		// 		if (r.ErrorCode == 9999) {
		// 		} else {
		// 			this.$elementMessage(r.Message, 'error')
		// 		}
		// 	})
		// }
	};
</script>

<style lang="scss" scoped>

</style>
