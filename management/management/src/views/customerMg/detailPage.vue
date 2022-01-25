<template>
	<div id="customer-detail">
		<el-card>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><router-link :to="{ path: '/customerMg' }" replace>客户管理</router-link></el-breadcrumb-item>
				<el-breadcrumb-item>套餐详情</el-breadcrumb-item>
			</el-breadcrumb>
			<el-divider></el-divider>
			<el-row class="center">
					<div>
						<div class="flex">
							<span class="title">套餐版本:</span>
							<span class="content">
								<template v-if="comboDetail.vipType == 1">免费版</template>
								<template v-if="comboDetail.vipType == 2">标准版</template>
								<template v-if="comboDetail.vipType == 3">专业版</template>
								<template v-if="comboDetail.vipType == 4">尊享版</template>
								<span style="margin-left: 20px;">付款金额:  {{ vipDetail.amount }}元</span></span>
						</div>
						<div class="flex">
							<div class="title">服务期至:</div>
							<span class="content" v-if="comboDetail.overTime == '0'" > --</span>
							<span class="content" v-else> {{ $moment(comboDetail.overTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
						</div>
					</div>
					<div class="flex">
						<div class="title">套餐内容:</div>
						<div class="content">
							<div>商品上架数量: {{ vipDetail.productCnt }}个SPU</div>
							<div>目前剩余: {{ resetQu.vipProductCnt }}个SPU</div>
							<div>子账号数量: {{ vipDetail.subUserCnt }}个</div>
							<div>目前剩余: {{ resetQu.vipSubuserCnt }}个</div>
							<div>订单数据保留时长: {{ vipDetail.orderReserveDay }}天</div>
						</div>
					</div>
					<div class="flex" v-if="comboDetail.vipType != 1">
						<div class="title">额外内容:</div>
						<div>
							<div class="content">
								<div v-if="comboDetail.service">
									<div class="fz-16">企业自有品牌服务包</div>
									<div class="service"><span>上架应用至Shopify</span> <span>设置店铺独有域名</span></div>
								</div>
							</div>
							<div class="" v-for="(val, key, index) in addObj" :key="index">
								<div v-if="key == 'mail'" class="addPack">
									<div class="title">邮件加油包</div>
									<div class="content">已购: {{ val.mailCnt }}封 剩余数量: {{ comboDetail.mailCnt }}封</div>
									<div class="price">付款金额: {{ val.addAmount }} 元 </div>
								</div>
								<div v-if="key == 'product'" class="addPack">
									<div class="title">商品上架数</div>
									<div class="content">已购: {{ comboDetail.addProductCnt }}个 剩余数量: {{ resetQu.addProductCnt }}个</div>
									<div class="price">付款金额: {{ val.addAmount }} 元</div>
								</div>
								<div v-if="key == 'subUser'" class="addPack">
									<div class="title">子账号</div>
									<div class="content">已购: {{ comboDetail.addSubUserCnt }}个 剩余数量: {{ resetQu.addSubuserCnt }}个</div>
									<div class="price">付款金额: {{ val.addAmount }} 元</div>
								</div>
							</div>
						</div>
					</div>
			</el-row>
			<el-divider></el-divider>
			<el-row>
				<h2>操作日志</h2>
				<el-table
					:data="operateList">
					<el-table-column label="ID" prop="id"></el-table-column>
					<el-table-column label="操作人" prop="admin"></el-table-column>
					<el-table-column label="操作事项" prop="operate"></el-table-column>
					<el-table-column label="操作对象">
						<template slot-scope="scope">
							<div v-if="scope.row.object == 'service'">服务包加购</div>
							<div v-else-if="scope.row.object == 'mail'">邮件加购</div>
							<div v-else-if="scope.row.object == 'product'">商品数量加购</div>
							<div v-else-if="scope.row.object == 'order'">每日拉取订单加购</div>
							<div v-else-if="scope.row.object == 'subUser'">子账号加购</div>
							<div v-else>{{ scope.row.object }}</div>
						</template>
					</el-table-column>
					<!-- <el-table-column label="操作内容" prop=""></el-table-column> -->
					<el-table-column label="操作时间">
						<template slot-scope="scope">
							{{$moment(scope.row.timeCreated*1000).format('YYYY-MM-DD HH:mm:ss')}}
						</template>
					</el-table-column>
					<el-table-column label="开通时间">
						<template slot-scope="scope">
							{{$moment(scope.row.timeOpen*1000).format('YYYY-MM-DD HH:mm:ss')}}
						</template>
					</el-table-column>
				</el-table>
			</el-row>

			<el-row class="footer">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pagination.currentPage"
					:page-sizes="[10, 20, 30, 40]"
					:page-size="pagination.pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="pagination.total">
				</el-pagination>
			</el-row>
		</el-card>
	</div>
</template>

<script>
export default {
	data () {
		return {
			pagination: {
				currentPage: 1,
				pageSize: 10,
				total: 0
			},
			resetQu: {
				vipProductCnt: 0,
				vipSubuserCnt: 0,
				addProductCnt: 0,
				addSubuserCnt: 0,
			},
			userId: '',
			comboDetail: {},
			vipDetail: {},
			operateList: [],
			addObj: {
				'mail': {
					addAmount: 0,
					mailCnt: 0
				},
				'product': {
					addAmount: 0,
					productCnt: 0
				},
				'order': {
					addAmount: 0,
					dailyOrderCnt: 0
				},
				'subUser': {
					addAmount: 0,
					subUserCnt: 0
				},
			}
		}
	},
	mounted () {
		if (this.$route.query && this.$route.query.id) {
			this.userId = this.$route.query.id
			this.getDetail()
			this.getOperation()
		}
	},
	methods: {
		handleSizeChange (val) {
			this.pagination.pageSize = val
			this.getOperation()
		},
		handleCurrentChange (val) {
			this.pagination.currentPage = val
			this.getOperation()
		},
		getOperation () {
			this.$apiCall('api.Admin.getVipHistory', {
				userId: this.userId || '',
				page: this.pagination.currentPage,
				rowsperPage: this.pagination.pageSize
			}, (r) => {
				if (r.ErrorCode == 9999) {
					this.operateList = r.Data.Results
					this.pagination.total = Number(r.Data.Pagination.totalCount)
				}
			})
		},
		getDetail () {
			this.$apiCall('api.Admin.getVipDetail', {
				userId: this.userId || ''
			}, (r) => {
				if (r.ErrorCode == 9999) {
					this.comboDetail = r.Data.Results
					this.comboDetail.addDetail.forEach((item) => {
						item.extraJson = JSON.parse(item.extraJson)
						if(item.extraJson.addPack) {
							item.extraJson.addPack.forEach((add) => {
								if (add.object == 'mail') {
									this.addObj.mail.addAmount += Number(add.addAmount)
									this.addObj.mail.mailCnt += Number(add.mailCnt)
								}
								if (add.object == 'product') {
									this.addObj.product.addAmount += Number(add.addAmount)
									this.addObj.product.productCnt += Number(add.productCnt)
								}
								if (add.object == 'order') {
									this.addObj.order.addAmount += Number(add.addAmount)
									this.addObj.order.dailyOrderCnt += Number(add.dailyOrderCnt)
								}
								if (add.object == 'subUser') {
									this.addObj.subUser.addAmount += Number(add.addAmount)
									this.addObj.subUser.subUserCnt += Number(add.subUserCnt)
								}
							})
						}
					})
					this.getComboData()
				}
			})
		},
		getComboData () {
			this.$apiCall('api.Admin.getVipArray', {}, (r) => {
				if (r.ErrorCode == 9999) {
					let type = Number(this.comboDetail.vipType)
					this.vipDetail = r.Data.Results[type]

					if (this.vipDetail.productCnt - this.comboDetail.productCnt >= 0) {
						this.resetQu.vipProductCnt = this.vipDetail.productCnt - this.comboDetail.productCnt
						this.resetQu.addProductCnt = this.comboDetail.addProductCnt
					} else {
						this.resetQu.vipProductCnt = 0
						this.resetQu.addProductCnt = this.comboDetail.addProductCnt - (this.comboDetail.productCnt - this.vipDetail.productCnt)
					}

					if (this.vipDetail.subUserCnt - this.comboDetail.subUserCnt >= 0) {
						this.resetQu.vipSubuserCnt = this.vipDetail.subUserCnt - this.comboDetail.subUserCnt
						this.resetQu.addSubuserCnt = this.comboDetail.addSubUserCnt
					} else {
						this.resetQu.vipSubuserCnt = 0
						this.resetQu.addSubuserCnt = this.comboDetail.addSubUserCnt - (this.comboDetail.subUserCnt - this.vipDetail.subUserCnt)
					}
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
#customer-detail {
	font-size: 16px;
	.addPack {
		margin-bottom: 20px;
		font-size: 14px;
		.title {
			font-size: 16px;
		}
		.content {
		}
	}
	.center {
		display: flex;
		justify-content: space-between;
	}
	.flex{
		display: flex;
		justify-content: left;
		margin: 10px;
		font-size: 14px;
		.title {
			margin-right: 10px;
		}
		.content {
			div {
				margin: 0 0 5px 0;
			}
			.fz-16 {
				font-size: 16px;
			}
		}
		.service {
			font-size: 12px;
		}
	}
	.footer {
		text-align: center;
		margin-top: 20px;
	}
}
</style>