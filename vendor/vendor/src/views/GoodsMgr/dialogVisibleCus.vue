<template>
	<el-dialog :title="$t('goods.指定客户可见')" :visible.sync="keyData.isShow" width="600px" :close-on-click-modal="false"  @open="open"
		append-to-body>
		<el-divider></el-divider>
		<div class="d-body">
			<el-table stripe :data="keyData.items" style="width: 100%">
				<el-table-column :label="$t('goods.客户邮箱')">
					<template slot-scope="scope">
						<div>{{scope.row.customer && scope.row.customer.email || '---'}}</div>
					</template>
				</el-table-column>
				<el-table-column :label="$t('goods.指定可见时间')" width="250">
					<template slot-scope="scope">
						<div>{{$moment.unix(scope.row.timeCreated).format("YYYY-MM-DD HH:mm:ss")}}</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="d-flex" style="justify-content: center;margin: 20px;">
			<el-pagination :current-page="page" :background="true" layout="total, prev, pager, next" :total="Number(total)" @current-change="toPage">
			</el-pagination>
		</div>
		<el-divider></el-divider>
		<div slot="footer" class="dialog-footer">
			<el-button size="small" @click="keyData.isShow = false">
				{{ $t('goods.关闭') }}
			</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		props: ["keyData"],
		data() {
			return {
				page:1,
				rowsPerPage: 10,
				total: 0,
				totalPage: 0,
				items:[],
			}
		},
		methods: {
			open(){
				this.page = 1;
				this.tableRadio = "";
				this.total = Number(this.keyData.Pagination.totalCount);
				this.totalPage = Number(this.keyData.Pagination.totalPage);
				this.items = this.keyData.items;
			},
			toPage(val) {
				this.page = val;
				this.$showLoading();
				this.$apiCall("api.VendorShop.getVisibleCustomers", {
					page: this.page,
					rowsPerPage: 10,
					productId: this.keyData.pproductId,
				}, (r) => {
					if (r.ErrorCode == "9999") {
						this.total = Number(r.Data.Pagination.totalCount);
						this.totalPage = Number(r.Data.Pagination.totalPage);
						this.items = r.Data.Results;
						$(".el-dialog__body").scrollTop(0);
					} else {
						this.$elementMessage(r.Message, "error");
					}
					this.$hideLoading();
				})
			},
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
