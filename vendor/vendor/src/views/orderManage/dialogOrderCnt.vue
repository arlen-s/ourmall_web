<template>
	<div>
		<el-dialog v-loading="data.loading" :close-on-press-escape="false" :close-on-click-modal="false"
			title="订单信息" :visible.sync="data.isShow" width="90%">
			<el-divider></el-divider>
			<div class="pd-x-20 mg-y-30">
				<el-table stripe :data="data.items" style="width: 100%">
					<el-table-column prop="codeName" :label="$t('orders.third')" width="150">
					</el-table-column>
					<el-table-column prop="orderId" :label="$t('orders.orderID')" width="150">
					</el-table-column>
					<el-table-column :label="$t('orders.vendorName')" width="150">
						<template slot-scope="scope">
							<div>{{ scope.row.customer ? scope.row.customer.name : '---' }}</div>
						</template>
					</el-table-column>
					<el-table-column :label="$t('orders.storeName')" width="150">
						<template slot-scope="scope">
							<span>{{scope.row.store || '---'}}</span>
						</template>
					</el-table-column>
					<el-table-column :label="$t('orders.CreateDate')" width="200">
						<template slot-scope="scope">
							<span>{{scope.row.timeCreated || '---'}}</span>
						</template>
					</el-table-column>
					<el-table-column :label="$t('orders.address')" min-width="250">
						<template slot-scope="scope">
							<el-tooltip class="item" effect="dark" placement="right">
								<div slot="content">
									{{scope.row.shippingJsonInfo && scope.row.shippingJsonInfo.zip ? scope.row.shippingJsonInfo.zip : '---'}}
									{{scope.row.shippingJsonInfo && scope.row.shippingJsonInfo.address1 ? scope.row.shippingJsonInfo.address1 : '---'}}
									{{scope.row.shippingJsonInfo && scope.row.shippingJsonInfo.city ? scope.row.shippingJsonInfo.city : '---'}}
									{{scope.row.shippingJsonInfo && scope.row.shippingJsonInfo.province ? scope.row.shippingJsonInfo.province : '---'}}
									{{scope.row.shippingJsonInfo && scope.row.shippingJsonInfo.country ? scope.row.shippingJsonInfo.country : '---'}}
								</div>
								<span>{{scope.row.receiverAddress || '---'}}</span>
							</el-tooltip>
						</template>
					</el-table-column>
					<el-table-column :label="$t('orders.receiver')" width="150">
						<template slot-scope="scope">
							<span>{{scope.row.receiverName || '---'}}</span>
						</template>
					</el-table-column>
					<el-table-column :label="$t('orders.logistics')" width="150">
						<template slot-scope="scope">
							<span>{{scope.row.trackCompany ? `${scope.row.trackCompany}${scope.row.trackNumber ? '：'+scope.row.trackNumber : ''}` : '---'}}</span>
						</template>
					</el-table-column>
					<el-table-column :label="`${$t('orders.logisticsFee')}(${$store.state.country.symbol})`" width="150">
						<template slot-scope="scope">
							<span v-if="scope.row.discountType == 3">
								<span>0&nbsp;</span>
								<span style="color: red; text-decoration:line-through;">
									<span style="color: #606266;">{{scope.row.trackFee || '---'}}</span>
								</span>
							</span>
							<span v-else>{{scope.row.trackFee || '---'}}</span>
						</template>
					</el-table-column>
					<el-table-column :label="`${$t('orders.tradeAmount')}(${$store.state.country.symbol})`" width="100">
						<template slot-scope="scope">
							<span v-if="scope.row.discountType">
								<span>{{scope.row.payAmount || '---'}}&nbsp;</span>
								<span style="color: red; text-decoration:line-through;">
									<span style="color: #606266;">{{scope.row.realAmount || '---'}}</span>
								</span>
							</span>
							<span v-else>{{scope.row.realAmount || '---'}}</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<el-divider></el-divider>
			<div slot="footer" class="dialog-footer" @click="data.isShow = false">
				<el-button>
					{{$t('orders.cancel')}}
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
::v-deep .el-dialog__body {
	  max-height: 62vh;
	  overflow: auto;
	}
</style>
