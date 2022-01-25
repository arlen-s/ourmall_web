<template>
	<div class="contentpanel transaction-page">
		<div class="pagetitle" ref="pageHeader" v-if="items.length">
			<div class="left">
				<div class="title">
					<i class="iconfont icon-zidingyidaima"></i>
					<h2>{{$t('storecode.title')}}</h2>
				</div>
			</div>
			<div class="right">
				<el-button :disabled="!$isRole($route.meta.roleWrite)" type="primary" size="medium" @click="addCode">{{$t('storecode.addtitle')}}</el-button>
			</div>
		</div>
		<div class="pagebody" v-loading="loading">
			<el-row :gutter="15" class="mg-b-20">
				<el-col :span="24">
					<el-card>
						<div class="no-code" v-if="!loading && !items.length">
							<img src="../../../public/images/store-code.png" width="800"/>
							<h3>{{$t('storecode.title1')}}</h3>
							<p>{{$t('storecode.title2')}}</p>
							<el-button type="primary" size="medium" @click="addCode">{{$t('storecode.addtitle')}}</el-button>
						</div>
						<el-table v-else stripe style="width: 100%" ref="gridTable" :data="items" tooltip-effect="dark" :row-key="(row) => row.id">
							<el-table-column :label="$t('storecode.codename')">
								<template slot-scope="scope">
									<span>{{scope.row.name || '---'}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('storecode.tap')">
								<template slot-scope="scope">
									<span>{{scope.row.pages || '---'}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('storecode.position')">
								<template slot-scope="scope">
									<span>{{scope.row.position || '---'}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('storecode.action')" width="150">
								<template slot-scope="scope">
									<div>
										<el-link :disabled="!$isRole($route.meta.roleWrite)" class="mg-r-20" type="primary" @click="addCode(scope.row)">
											{{$t('storecode.edit')}}
										</el-link>
										<el-link :disabled="!$isRole($route.meta.roleWrite)" class="mg-r-20" type="primary" @click="deleteFn(scope.row.id)">
											{{$t('storecode.delete')}}
										</el-link>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</el-card>
				</el-col>
			</el-row>
			<!-- <el-row v-if="items.length" :gutter="20">
				<el-col :span="24" class="d-flex justify-content-center">
					<div>
						<el-pagination :current-page="page" :background="true"
							layout="sizes, total, prev, pager, next, jumper" :page-sizes="pageSizes"
							:page-size="rowsPerPage" :total="Number(total)" @current-change="toPage"
							@size-change="changePageSize">
						</el-pagination>
					</div>
				</el-col>
			</el-row> -->
		</div>
		<el-backtop class="goto-top" target=".main-scroll  .el-scrollbar__wrap" :right="20" :bottom="20">
		</el-backtop>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				pageSizes: [10, 20, 50, 100],
				page: this.$route.query.page ? Number(this.$route.query.page) : 1,
				rowsPerPage: localStorage.getItem("storecodeRowsPerPage") ?
					Number(localStorage.getItem("storecodeRowsPerPage")) : 10,
				items: [],
				configJson: [],
				total: 0,
				totalPage: 0,
				setting: null,
			};
		},
		components: {},
		watch: {
			$route: "gotoPage",
		},
		mounted() {
			this.getItem();
		},
		methods: {
			deleteFn(id){
				this.$confirm(this.$t('storecode.delete1'), "", {
					confirmButtonText: this.$t('storecode.confirm'),
					cancelButtonText: this.$t('storecode.cancel'),
					type: ''
				}).then(() => {
					this.$store.commit('deletetCustomCode', id);
					setTimeout(()=>{
						this.loading = true;
						this.$apiCall("api.VendorShop.setShopConfig", {
							configJson: JSON.stringify(this.$store.state.configJson)
						},(r) => {
							this.loading = false;
							if (r.ErrorCode == 9999) {
								this.$elementMessage(this.$t('storecode.success'), "success");
								this.getItem();
							} else {
								this.$message({message: r.Message,type: "error"});
							}
						});
					},300)
				}).catch(() => {
				
				});
			},
			addCode(item){
				this.$router.push({
					name: "addCode",
					params: {
						items: item || "",
						id: item && item.id || "",
						type: item && item.id>0 ? 'edit' : ''
					}
				});
			},
			toPage(val) {
				if (val != this.$route.query.page)
					this.$router.push({
						query: {
							page: val
						}
					});
			},
			changePageSize(val) {
				this.rowsPerPage = val;
				localStorage.setItem("storecodeRowsPerPage", val);
				this.getItem();
			},
			gotoPage() {
				this.page = this.$route.query.page ? this.$route.query.page : 1;
				this.getItem();
			},
			getItem(s) {
				this.loading = true;
				this.$apiCall("api.VendorShop.getShopConfig", {},(r) => {
					this.loading = false;
					if (r.ErrorCode == 9999) {
            this.$store.commit('getStoreComponent', r.Data.Results)
						this.configJson = r.Data.Results;
						this.items = this.configJson.customCode || [];
					} else {
						this.$message({
							message: r.Message,
							type: "error"
						});
					}
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.no-code{
		text-align: center;
		h3{
			font-size: 20px;
			margin: 40px 0 20px;
			color:#5663B2;
		}
		p{
			color:#9E9E9E;
			margin: 0 0 40px;
		}
	}
	/deep/ .el-dialog__body {
	  height: 62vh;
	  overflow: auto;
	}
</style>
