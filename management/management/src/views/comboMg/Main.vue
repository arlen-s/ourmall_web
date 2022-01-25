<template>
	<div id="comboMg">
		<el-card>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="常规套餐管理" name="1"></el-tab-pane>
				<el-tab-pane label="加购项目" name="2"></el-tab-pane>
			</el-tabs>

			<el-row v-show="activeName == '1'">
				<el-table
					:data="items">
					<el-table-column prop="name" label="套餐名称"></el-table-column>
					<el-table-column label="套餐内容">
						<template slot-scope="scope">
							<div>商品上架数量: {{scope.row.content.spu}}个SPU</div>
							<div>子账号数量: {{scope.row.content.cAccount}}个</div>
							<div>订单数据保留时长: {{scope.row.content.time}}天</div>
						</template>
					</el-table-column>
					<el-table-column prop="price" label="套餐金额">
						<template slot-scope="scope">
							{{ scope.row.price }}元/年
						</template>
					</el-table-column>
					<el-table-column prop="count" label="使用人数"></el-table-column>
				</el-table>
			</el-row>
			
			<el-row v-show="activeName == '2'">
				<el-table
					:data="items2">
					<el-table-column prop="name" label="套餐名称"></el-table-column>
					<el-table-column prop="desc" label="套餐内容"></el-table-column>
					<el-table-column prop="price" label="套餐金额"></el-table-column>
					<el-table-column prop="count" label="使用人数"></el-table-column>
				</el-table>
			</el-row>
		</el-card>
	</div>
</template>

<script>
export default {
	data () {
		return {
			activeName: '1',
			items: [
				{ name: '', content: { spu: 0, order: 0, cAccount: 0, time: 0 }, price: '', count: 0 },
				{ name: '', content: { spu: 0, order: 0, cAccount: 0, time: 0 }, price: '', count: 0 },
				{ name: '', content: { spu: 0, order: 0, cAccount: 0, time: 0 }, price: '', count: 0 },
				{ name: '', content: { spu: 0, order: 0, cAccount: 0, time: 0 }, price: '', count: 0 },
			],
			items2: [
				{ name: '企业自由品牌服务包', desc: '上架应用至Shopify', price: '150000元', count: 0 },
				{ name: '邮件套餐加油包', desc: '替供应商发送邮件给站长', price: '10元/1000封', count: 0},
				{ name: '商品上架数', desc: '额外商品上架数', price: '100个/1年/10000元', count: 0},
				{ name: '子账号', desc: '额外子账号数量', price: '5个/1年/10000元', count: 0},
			],
			serviceCount: 0,
			mailCount: 0
		}
	},
	mounted() {
		this.getItems()
	},
	methods: {
		handleClick (val) {
			if (this.activeName == 1) {
			}
		},
		getItems () {
			this.$apiCall('api.Admin.vipSummary', {}, (r) => {
				if (r.ErrorCode == 9999) {
					this.items2[0].count = r.Data.Results.serviceCnt
					this.items2[1].count = r.Data.Results.mailCnt
					this.items2[2].count = r.Data.Results.productCnt
					this.items2[3].count = r.Data.Results.subUserCnt
					for(let key in r.Data.Results.vipInfo) {
						this.items[key-1].name = r.Data.Results.vipInfo[key].name
						this.items[key-1].price = r.Data.Results.vipInfo[key].amount
						this.items[key-1].count = r.Data.Results.vipInfo[key].count
						this.items[key - 1].content = {
							spu: r.Data.Results.vipInfo[key].productCnt,
							order: r.Data.Results.vipInfo[key].dailyOrderCnt,
							cAccount: r.Data.Results.vipInfo[key].subUserCnt,
							time: r.Data.Results.vipInfo[key].orderReserveDay
						}
					}
				}
			})
		}
	}
}
</script>

<style>

</style>