<template>
	<el-dialog 
		:visible.sync="dialogLogistic.isShow"
		width="800px"
		:show-close="false"
		title="">
		<el-row style="word-break: break-word;">
			<el-row class="tx-center pd-15">
				<div v-if="dialogLogistic.errorType == 1">The receiving address has no logistics method set</div>
				<div v-if="dialogLogistic.errorType == 3">The order is below the minimum deliverable weight({{ dialogLogistic.min }}g)</div>
				<div v-if="dialogLogistic.errorType == 2">The order is below the minimum deliverable volume({{ dialogLogistic.min }}cm<sup>3</sup>)</div>
				<div v-if="dialogLogistic.errorType == 5">The order is higher than the maximum deliverable weight({{ dialogLogistic.max }}g)</div>
				<div v-if="dialogLogistic.errorType == 4">The order is higher than the maximum deliverable volume({{ dialogLogistic.max }}cm<sup>3</sup>)</div>
				<div v-if="dialogLogistic.errorType == 6">The following product attributes of this order do not meet the attribute requirements of deliverable products</div>
				<div v-if="dialogLogistic.errorType == 7">The total weight of the goods in this order does not meet the deliverable requirements</div>
			</el-row>
			<el-row class="tx-center pd-15"   v-if="dialogLogistic.errorType == 3 || dialogLogistic.errorType == 5">
				<el-table border class="mg-t-20" :data="items">
					<el-table-column label="SKU" prop="vendorSku"></el-table-column>
					<el-table-column label="Weight(g)" prop="weight"></el-table-column>
					<el-table-column label="Quantity" prop="number"></el-table-column>
					<el-table-column label="Total weight(g)" prop="weightTotal"></el-table-column>
				</el-table>
			</el-row>
			<el-row class="tx-center pd-15" v-if="dialogLogistic.errorType == 2 || dialogLogistic.errorType == 4">
				<el-table border class="mg-t-20" :data="items">
					<el-table-column label="SKU" prop="vendorSku"></el-table-column>
					<el-table-column prop="volume">
						<template slot="header">
							Volume(cm<sup>3</sup>)
						</template>
					</el-table-column>
					<el-table-column label="Quantity" prop="number"></el-table-column>
					<el-table-column prop="volumeTotal">
						<template slot="header">
							Total volume(cm<sup>3</sup>)
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<el-row class="tx-center pd-15"  v-if="dialogLogistic.errorType == 6">
				<el-table border class="mg-t-20" :data="items">
					<el-table-column label="SKU" prop="vendorSku"></el-table-column>
					<el-table-column label="Attribute">
						<template slot-scope="scope">
							<div v-for="(type, index) in scope.row.productType" :key="index">
								{{ $dict.productType[type] ? $dict.productType[type].text : ''}}
							</div>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<el-row class="tx-center">
				<el-button class="mt-15" type="primary" @click="closeHandle">I Know</el-button>
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