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
					<h2>{{ $t("orders.Made") }}</h2>
				</div>
			</div>
			<div class="right">

			</div>
		</div>
		<div class="pagebody mg-t-30">
			<el-row :gutter="15" class="mg-b-20">
				<el-col :span="24" class="mg-b-30 mg-t-10">
					<el-card>
						<el-table stripe :data="items" style="width: 100%">
							<el-table-column :label="$t('orders.productinfo')">
								<template slot-scope="scope">
									<div class="d-flex">
										<img :src="scope.row.imgUrl" width="60" height="60"/>
										<div class="mg-l-20">
											<p>{{scope.row.name}}</p>
											<p>Shop SPU: {{scope.row.spu}}</p>
											<p>Shop SKU: {{scope.row.sku}}</p>
										</div>
									</div>
								</template>
							</el-table-column>
							<el-table-column prop="quantity" :label="$t('orders.qty')" width="200">
							</el-table-column>
							<el-table-column :label="$t('orders.price')" width="200">
								<template slot-scope="scope">
									<span>{{scope.row.currency}} {{scope.row.price || 0}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('orders.operate')" width="200">
								<template slot-scope="scope">
									<div>
										<el-link class="mg-r-20" type="primary" @click="goto">
											{{$t('orders.putaway')}}
										</el-link>
										<el-link class="mg-r-20" type="primary" @click="openRelate(scope.row)">
											{{$t('orders.relate')}}
										</el-link>
										<el-link class="mg-r-20" type="primary" @click="openDetail(scope.row)">
											{{$t('orders.查看详情')}}
										</el-link>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<el-backtop class="goto-top" target=".main-scroll  .el-scrollbar__wrap" :right="20" :bottom="20">
		</el-backtop>
		<dialogRelate :relateData="dialogRelateInfo" @relateFn="relateFn"></dialogRelate>
		<dialogDetail :detailData="dialogDetailInfo"></dialogDetail>
	</div>
</template>

<script>
	import dialogRelate from "./dialogRelate.vue";
	import dialogDetail from "./dialogDetail";
	export default {
		data() {
			return {
				dialogRelateInfo: {
					isShow: false,
					loading: false,
					items: [],
					Pagination: {},
					item: "",
					list: [],
				},
				dialogRelateInfoDefault: "{}",
				dialogDetailInfo: {
					isShow: false,
					loading: false,
					data: {},
					variableId:""
				},
				dialogDetailInfoDefault: "{}",
				items:[]
			};
		},
		components: {
			dialogRelate,
			dialogDetail
		},
		watch: {},
		mounted() {
			this.dialogRelateInfoDefault = JSON.stringify(this.dialogRelateInfo);
			this.dialogDetailInfoDefault = JSON.stringify(this.dialogDetailInfo);
			this.getItems();
		},
		methods: {
			openDetail(item){
				this.$showLoading();
				this.$apiCall("api.ShopifyOrder.getCustomerProductDetail", {
					variableId: item.variableId,
				}, (r) => {
					if (r.ErrorCode == "9999") {
						this.dialogDetailInfo = JSON.parse(this.dialogDetailInfoDefault);
						this.dialogDetailInfo.data = r.Data.Results;
						this.$set(this.dialogDetailInfo.data,"imgUrlArr",this.dialogDetailInfo.data.imgsJson?JSON.parse(this.dialogDetailInfo.data.imgsJson):[]);
						this.dialogDetailInfo.variableId = item.variableId;
						this.dialogDetailInfo.isShow = true;
					} else {
						this.$elementMessage(r.Message, "error");
					}
					this.$hideLoading();
				})
			},
			goback(){
				this.$router.push({path:"ordersManage/2/1"})
			},
			getItems(){
				let items = localStorage.getItem('needQuoteOrders') ? JSON.parse(localStorage.getItem('needQuoteOrders')) : "";
				if(!items) return;
				this.items = items || [];
			},
			goto(){
				let routeData = this.$router.resolve({name: 'AddGoods'});
				window.open(routeData.href, '_blank');
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
						this.updateItems();
					} else {
						this.$elementMessage(r.Message, "error");
					}
					this.$hideLoading();
				})
			},
			updateItems(){
				this.$apiCall("api.ShopifyOrder.getOfferShopifyItems", {
					ids: this.$route.params.ids
				}, (r) => {
					if (r.ErrorCode == "9999") {
						if(!r.Data || !r.Data.Results) {
							this.$router.push({path:"ordersManage/2/1"})
							return;
						}
						let items = Object.values(r.Data.Results)
						if(!items || !items.length) {
							this.$router.push({path:"ordersManage/2/1"})
							return;
						}
						this.items = items || [];
					} else {
						this.$router.push({path:"ordersManage/2/1"})
						return;
						this.$elementMessage(r.Message, "error");
					}
				})
			},
		},
	};
</script>

<style lang="scss" scoped>

</style>
