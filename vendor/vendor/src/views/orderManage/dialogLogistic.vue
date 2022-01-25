<template>
	<el-dialog 
		:visible.sync="dialogLogistic.isShow"
		width="800px"
		:show-close="false"
		:before-close="closeHandle"
		title="">
		<el-row style="word-break: break-word;">
			<el-row class="tx-center pd-15">
				<div v-if="dialogLogistic.errorType == 1">{{ $t('orders.该收货地址未设置物流方式') }}</div>
				<div v-if="dialogLogistic.errorType == 3">{{ $t('orders.该订单低于最低可发货重量') }}({{ dialogLogistic.min }}g)</div>
				<div v-if="dialogLogistic.errorType == 2">{{ $t('orders.该订单低于最低可发货体积') }}({{ dialogLogistic.min }}cm<sup>3</sup>)</div>
				<div v-if="dialogLogistic.errorType == 5">{{ $t('orders.该订单高于最高可发货重量') }}({{ dialogLogistic.max }}g)</div>
				<div v-if="dialogLogistic.errorType == 4">{{ $t('orders.该订单高于最高可发货体积') }}({{ dialogLogistic.max }}cm<sup>3</sup>)</div>
				<div v-if="dialogLogistic.errorType == 6">{{ $t('orders.该订单以下商品属性不符合可发货商品的属性要求') }}</div>
				<div v-if="dialogLogistic.errorType == 7">{{ $t('orders.该订单商品总重量不符合可发货要求') }}</div>
			</el-row>
			<el-row class="tx-center pd-15"  v-if="dialogLogistic.errorType == 3 || dialogLogistic.errorType == 5">
				<el-table border class="mg-t-20" :data="items">
					<el-table-column label="SKU" prop="vendorSku"></el-table-column>
					<el-table-column :label="`${$t('orders.重量')}(g)`" prop="weight"></el-table-column>
					<el-table-column :label="$t('orders.数量')" prop="number"></el-table-column>
					<el-table-column :label="`${$t('orders.总重量')}(g)`" prop="weightTotal"></el-table-column>
				</el-table>
			</el-row> 
			<el-row class="tx-center pd-15"  v-if="dialogLogistic.errorType == 2 || dialogLogistic.errorType == 4">
				<el-table border class="mg-t-20" :data="items">
					<el-table-column label="SKU" prop="vendorSku"></el-table-column>
					<el-table-column prop="volume">
						<template slot="header">
							{{ $t('orders.体积') }}(cm<sup>3</sup>)
						</template>
					</el-table-column>
					<el-table-column :label="$t('orders.数量')" prop="number"></el-table-column>
					<el-table-column prop="volumeTotal">
						<template slot="header">
							{{ $t('orders.总体积') }}(cm<sup>3</sup>)
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<el-row class="tx-center pd-15"  v-if="dialogLogistic.errorType == 6">
				<el-table border class="mg-t-20" :data="items">
					<el-table-column label="SKU" prop="vendorSku"></el-table-column>
					<el-table-column :label="$t('orders.属性')">
						<template slot-scope="scope">
							<div v-for="(type, index) in scope.row.productType" :key="index">
								{{ $dict.productType[type] ? $t($dict.productType[type].text) : ''}}
							</div>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<el-row class="tx-center">
				<el-button class="mt-15" type="primary" @click="closeHandle">{{ $t('orders.知道了') }}</el-button>
			</el-row>
		</el-row>
	</el-dialog>
</template>

<script>
export default {
	props: ['dialogLogistic'],
	data() {
		return {
			items: []
		}
	},
	watch: {
		'dialogLogistic.items': {
			handler () {
				if (this.dialogLogistic.items) {
					this.items = Object.values(this.dialogLogistic.items)
				}
			},
			deep: true,
			immediate: true
		}
	},
	mounted () {
	},
	methods: {
		closeHandle () {
			this.dialogLogistic.isShow = false
			this.dialogLogistic.items = []
			this.dialogLogistic.errorType = null
			this.dialogLogistic.min = ''
			this.dialogLogistic.max = ''
		}
	}
}
</script>

<style lang="scss" scoped>
.mt-15 {
	margin-top: 15px;
}
.pd-15 {
	padding: 0 15px;
}
</style>