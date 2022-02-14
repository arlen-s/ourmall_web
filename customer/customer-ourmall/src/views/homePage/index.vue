<template>
	<div class="home-page">
		<div class="home-body" id="garbage-network" v-loading="loading">
			<Main :setting="setting" :code="code"></Main>
		</div>
	</div>
</template>

<script>
	import Main from "@/views/homePage/components/main";
	export default {
		data() {
			return {
				setting: null,
				loading: false,
				code: {
					header: [],
					footer: [],
				},
			};
		},
		components: {
			Main,
		},
		watch: {},
		created() {
			this.setting = JSON.parse(JSON.stringify(this.$store.state.configJson));
			this.getInfo();
		},
		mounted() {
			if (document.getElementById("loading")) document.getElementById("loading").remove();
		},
		methods: {
			getInfo() {
				// location.host.split('.').length < 3 || 
				// location.host.split('.')[0].toLowerCase() == 'www' || 去除 贴牌逻辑修改
				if ((location.host.split('.')[0].toLowerCase() ==
						'sandboxwww') || location.host.split('.')[0].toLowerCase() == 'supplier' || location.host.split(
						'.')[0].toLowerCase() == 'sandboxsupplier' && location.host.indexOf('localhost') < 0) {
					return;
				}

				this.loading = true;
				// location.host
				let url = location.host;
				if (location.host.indexOf('localhost') > -1) { //测试
					url = 'shop242.myourmall.com'
				}
				this.$apiCall('api.User.getInfoFromUrl', {
					url
				}, r => {
					if (r.ErrorCode == 9999) {
						localStorage.setItem('c_apiShopId', r.Data.Results.shopId);
						this.getItem();
					} else {
						this.loading = false;
						this.$elementMessage(r.Message, "error");
					}
				})

			},
			getItem() {
				this.$apiCall("api.VendorShop.getShopConfig", {}, (r) => {
					this.loading = false;
					if (r.ErrorCode == 9999) {
						if (r.Data.Results.length !== 0) {
							let shopConfig = r.Data.Results;
							if (shopConfig.sort && shopConfig.sort.length) {
								shopConfig.sort.forEach(item => {
									if (item.type == "hotProduct") { //热门商品列表
										this.$apiCall("api.VendorShop.vendorFindProducts", {
											categoryId: item.categoryItem ? item.categoryItem.id :
												"",
											status: 1,
											page: 1,
											rowsPerPage: 16,
										}, r => {
											if (r.ErrorCode == 9999) {
												let arr = [];
												r.Data.Results.forEach(e => {
													if (e.status == 1) {
														arr.push(e)
													}
												});
												this.$set(item,"productItems",arr)
												// item.productItems = arr;
											}
										})
									} else if (item.type == "singleProduct") { //单个商品
										this.$apiCall("api.VendorShop.vendorFindProducts", {
											productId: item.id ? item.id : '',
											page: 1,
											rowsPerPage: 10,
										}, r => {
											if (r.ErrorCode == 9999) {
												let data = r.Data.Results;
												// item.imgUrl = data[0].imgUrl;
												// item.cost = data[0].cost;
												// item.name = data[0].name;
												this.$set(item,"imgUrl",data[0].imgUrl)
												this.$set(item,"cost",data[0].cost)
												this.$set(item,"name",data[0].name)
											}
										})
									} else if (item.type == "productCategory") {
										this.$apiCall("api.ProductCategory.findByVendorRelateCategory", {
											level: 1
										}, (r) => {
											if (r.ErrorCode == 9999) {
												let data = r.Data.Results;
												let items = [];
												if (item.categorys && item.categorys.length && data
													.length) {
													item.categorys.forEach((category, i) => {
														data.forEach(obj => {
															if (category.id == obj
																.id) {
																items.push(obj)
															}
														})
													})
													// item.categorys = items;
													this.$set(item,"categorys",items)
												}
											}
										});
									} else {
										
									}
								})
							}
							this.setting = shopConfig;
							localStorage.setItem("c_shopConfigJson", JSON.stringify(shopConfig));
							this.$store.commit('getStoreComponent', shopConfig);
							this.handleCode(shopConfig.customCode);
						} else {
							this.setting = JSON.parse(JSON.stringify(this.$store.state.configJson))
						}
					} else {
						this.$message({
							message: r.Message,
							type: "error"
						});
					}
				});
			},
			handleCode(arr) {
				this.code.footer = [];
				this.code.header = [];
				arr.forEach((item) => {
					if (item.pages.includes('首页')) {
						if (item.position == '底部') {
							this.code.footer.push(item.desc)
						}
						if (item.position == '顶部') {
							this.code.header.push(item.desc)
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.home-page {
		width: 100%;
		background-color: #fff;

		.home-body {
			position: relative;
			margin: 0 auto 90px;
			// width: 1280px;
		}
	}
</style>

<style lang="scss">
	#garbage-network .el-loading-mask {
		position: fixed;
	}
</style>
