<template>
	<div id="discount">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-discount"></i>
          <h2>{{ $t('discount.折扣管理') }}</h2>
        </div>
      </div> 
      <div class="right">
        <el-button type="primary" class=" mg-r-30" @click="createDiscount" :disabled="!$isRole($route.meta.roleWrite)">{{ $t('discount.新增折扣代码') }}</el-button>
      </div>
    </div>

		<el-card v-if="items.length == 0 && firstEnter">
			<h2 class="empty-title">{{ $t('discount.折扣码') }}</h2>
			<el-divider></el-divider>
			<el-row class="empty">
				<div class="content">
					<h3>{{ $t('discount.管理折扣') }}</h3>
					<p>{{ $t('discount.创建用于结账的折扣代码') }}</p>
					<button @click="createDiscount" :disabled="!$isRole($route.meta.roleWrite)">{{ $t('discount.创建折扣码') }}</button>
				</div>
				<div class="image">
					<img src="../../../public/images/discount.png" />
				</div>
			</el-row>
		</el-card>
		<el-card v-else-if="items.length >= 0">
			<el-row>
				<el-tabs v-model="timeStatus" @tab-click="tabChange">
					<el-tab-pane :label="$t('discount.全部')" name="0"></el-tab-pane>
					<el-tab-pane :label="$t('discount.已生效')" name="1"></el-tab-pane>
					<el-tab-pane :label="$t('discount.待生效')" name="2"></el-tab-pane>
					<el-tab-pane :label="$t('discount.已失效')" name="3"></el-tab-pane>
				</el-tabs>
			</el-row>
			
			<el-row>
				  <el-popover
						placement="bottom-start" 
						width="200"
						trigger="click">
						<div>
							<el-select size="mini" @change="typeChange" v-model="filterType">
								<el-option :label="$t('discount.折扣类型')" value="1"></el-option>
								<el-option :label="$t('discount.使用时间')" value="2"></el-option>
								<el-option :label="$t('discount.折扣状态')" value="3"></el-option>
								<el-option :label="$t('discount.使用次数')" value="4"></el-option>
							</el-select>

							<el-row class="mg-t-10" v-if="filterType == 1">
								<el-select size="mini" @change="getItems" v-model="filterParams.type">
									<el-option :label="$t('discount.全部')" value="0"></el-option>
									<el-option :label="$t('discount.百分比')" value="1"></el-option>
									<el-option :label="$t('discount.定额')" value="2"></el-option>
									<el-option :label="$t('discount.减运费')" value="3"></el-option>
								</el-select>
							</el-row>
							<el-row class="mg-t-10" v-if="filterType == 2">
								<el-select size="mini" @change="dateChange" v-model="filterParams.date">
									<el-option :label="$t('discount.过去一周')" value="1"></el-option>
									<el-option :label="$t('discount.过去一个月')" value="2"></el-option>
									<el-option :label="$t('discount.过去三个月')" value="3"></el-option>
									<el-option :label="$t('discount.过去半年')" value="4"></el-option>
									<el-option :label="$t('discount.过去一年')" value="5"></el-option>
									<el-option :label="$t('discount.开始时间')" value="6"></el-option>
									<el-option :label="$t('discount.截止时间')" value="7"></el-option>
								</el-select>

								<el-date-picker
									v-if="filterParams.date == 6"
									v-model="filterParams.startDate"
									@change="startDateChange"
									size="mini"
									class="mg-t-10"
									style="width: 174px"
									value-format="timestamp"
									type="datetime"
									:placeholder="$t('discount.开始时间')">
								</el-date-picker>

								<el-date-picker
									v-if="filterParams.date == 7"
									v-model="filterParams.endDate"
									style="width: 174px"
									@change="endDateChange"
									class="mg-t-10"
									value-format="timestamp"
									size="mini"
									type="datetime"
									:placeholder="$t('discount.截止时间')">
								</el-date-picker>
							</el-row>
							<el-row class="mg-t-10" v-if="filterType == 3">
								<el-select size="mini"  @change="getItems" v-model="filterParams.status">
									<el-option :label="$t('discount.全部')" value="0"></el-option>
									<el-option :label="$t('discount.启用')" value="1"></el-option>
									<el-option :label="$t('discount.停用')" value="2"></el-option>
								</el-select>
							</el-row>
							<el-row class="mg-t-10" v-if="filterType == 4">
								<el-select class="mg-t-10"  @change="getItems" size="mini" v-model="filterParams.operate">
									<el-option label="=" value="1"></el-option>
									<el-option label="≠" value="2"></el-option>
									<el-option label=">" value="3"></el-option>
									<el-option label="<" value="4"></el-option>
									<el-option label="≥" value="5"></el-option>
									<el-option label="≤" value="6"></el-option>
								</el-select>

								<el-input class="mg-t-10"  @change="getItems" type="number" v-model="filterParams.useTime" size="mini"></el-input>
							</el-row>
						</div>
						<el-button size="mini" slot="reference">{{ $t('discount.筛选') }}</el-button>
					</el-popover>

					<el-input @keyup.enter.native="getItems" size="mini" class="ipt-control" :placeholder="$t('discount.搜索折扣码')" v-model="filterParams.code">
						<template slot="prepend"><i class="el-icon-search"></i></template>
					</el-input>
			</el-row>
			
			<el-row style="height: 40px;" class="mg-t-20" v-if="selections.length > 0">
				{{ selections.length }}{{ $t('discount.条折扣码') }}
				<el-button size="mini" type="primary" @click="batchChangeDiscount(1)">{{ $t('discount.启用折扣') }}</el-button>
				<el-button size="mini" type="warning" @click="batchChangeDiscount(2)">{{ $t('discount.禁用折扣') }}</el-button>
				<el-button size="mini" type="danger" @click="batchDeleteDiscount">{{ $t('discount.删除折扣') }}</el-button>
			</el-row>

			<el-row>
				<el-table
					row-key="code"
					@selection-change="handleSelectionChange"
					:data="items">
					<el-table-column type="selection"></el-table-column>
					<el-table-column :label="$t('discount.折扣名称')" prop="name"></el-table-column>
					<el-table-column :label="$t('discount.折扣码')" prop="code"></el-table-column>
					<el-table-column :label="$t('discount.优惠类型')">
						<template slot-scope="scope">
							<div v-if="scope.row.type == '1'">{{ $t('discount.百分比') }}</div>
							<div v-if="scope.row.type == '2'">{{ $t('discount.定额') }}</div>
							<div v-if="scope.row.type == '3'">{{ $t('discount.免运费') }}</div>
						</template>
					</el-table-column>
					<el-table-column :label="$t('discount.生效时间')">
						<template slot-scope="scope">
							{{ $moment.unix(scope.row.timeStart).format("YYYY-MM-DD HH:mm:ss") }}
							<span v-if="scope.row.timeEnd != '0'">
								-- {{ $moment.unix(scope.row.timeEnd).format("YYYY-MM-DD HH:mm:ss") }}
							</span>
							<span v-else>
								{{ $t('discount.起') }}
							</span>
						</template>
					</el-table-column>
					<el-table-column :label="$t('discount.使用次数')">
						<template slot-scope="scope">
							<el-link type="primary" :underline="false" @click="findHistory(scope.row)">{{ $t('discount.已使用') }} {{ scope.row.userCnt }} {{ $t('discount.次') }}</el-link>
						</template>
					</el-table-column>
					<el-table-column :label="$t('discount.状态')">
						<template slot-scope="scope">
							<div v-if="scope.row.status == '1'">{{ $t('discount.启用') }}</div>
							<div v-if="scope.row.status == '2'">{{ $t('discount.停用') }}</div>
						</template>
					</el-table-column>
					<el-table-column :label="$t('discount.操作')">
						<template slot-scope="scope">
							<el-link type="primary" :disabled="!$isRole($route.meta.roleWrite)" @click="modifyCoupon(scope.row)">{{ $t('discount.编辑') }}</el-link>
						</template>
					</el-table-column>
					<template slot="empty">
						<div class="mg-t-20 mg-b-20">
							<div style="line-height: 2"><img src="../../../public/images/discount-empty.png" alt=""></div>
							<div style="line-height: 2;font-size: 24px;font-weight: 600;color: #4E4E4E;">{{ $t('discount.没有找到折扣码') }}</div>
							<div style="line-height: 2;font-size: 18px;font-weight: 400;color: #838383">{{ $t('discount.尝试改变筛选条件') }}</div>
						</div>
					</template>
				</el-table>
			</el-row>

			<el-row class="pagination mg-t-20" v-if="items.length > 0">
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
			<el-dialog
				:title="$t('discount.使用历史')"
				width="600px"
				:before-close="historyClose"
				:visible="historyVisible">
				<div class="history">
					<el-table
						:data="history">
						<el-table-column :label="$t('discount.站长名称')" prop="customerName"></el-table-column>
						<el-table-column :label="$t('discount.订单编号')" prop="orderCode"></el-table-column>
						<el-table-column :label="$t('discount.折扣使用状态')">
							<template slot-scope="scope">
								<div v-if="scope.row.status == '1'">{{ $t('discount.已核销') }}</div>
								<div v-if="scope.row.status == '2'">{{ $t('discount.占用中') }}</div>
							</template>
						</el-table-column>
					</el-table>

					<el-row class="pagination mg-t-20">
						<el-pagination
							@size-change="historySizeChange"
							@current-change="historyCurrentChange"
							:current-page="historyPagination.currentPage"
							:page-sizes="[10, 20, 30, 40]"
							:page-size="historyPagination.pageSize"
							layout="total, sizes, prev, pager, next, jumper"
							:total="historyPagination.total">
						</el-pagination>
					</el-row>
				</div>
			</el-dialog>
		</el-card>
	</div>
</template>

<script>
export default {
	data () {
		return {
			historyPagination: {
				currentPage: 1,
				total: 0,
				pageSize: 10
			},
			pagination: {
				currentPage: 1,
				total: 0,
				pageSize: 10
			},
			firstEnter: false,
			history: [],
			historyVisible: false,
			items: [],
			historyRow: null,
			timeStatus: '0',
			filterType: '1',
			filterParams: {
				code: '',
				date: '',
				type: '0',
				startDate: '',
				endDate: '',
				status: '0',
				timeValid: '',
				time: '',
				operate: null,
				useTime: null
			},
			selections: []
		}
	},
	created () {
		this.$apiCall('api.Coupon.finds', {
			page: this.pagination.currentPage,
			rowsPerPage: this.pagination.pageSize,
			type: this.filterParams.type,
			code: this.filterParams.code,
			timeValid: this.filterParams.time,
			timeStartFrom: this.filterParams.startDate / 1000,
			timeEndTo: this.filterParams.endDate / 1000,
			status: this.filterParams.status,
			timeStatus: this.timeStatus,
			useTime: this.filterParams.useTime,
			operate: this.filterParams.operate
		}, (r) => {
			if (r.ErrorCode == 9999) {
				this.items = r.Data.Results
				this.pagination.total = Number(r.Data.Pagination.totalCount)
			}
		})
		this.firstEnter = true
	},
	mounted () {},
	methods: {
		historyClose () {
			this.historyPagination = {
				currentPage: 1,
				total: 0,
				pageSize: 10
			}
			this.history = []
			this.historyVisible = false
		},
		tabChange () {
			this.filterType = '1'
			this.filterParams = {
				code: '',
				date: '',
				type: '0',
				startDate: '',
				endDate: '',
				status: '0',
				timeValid: '',
				time: '',
				operate: null,
				useTime: null
			}
			this.getItems()
		},
		modifyCoupon (row) {
			this.$router.push({path: '/discount-m', query: {code: row.code, id: row.id}})
		},
		findHistory (row) {
			if (row.userCnt == 0) {
				this.$elementMessage(this.$t('discount.折扣码没有被使用'), 'error')
				return;
			}
			this.historyRow = row
			this.$apiCall('api.Coupon.findHistory', {
        page: this.historyPagination.currentPage,
        rowsPerPage: this.historyPagination.pageSize,
				couponId: row.id
			}, (r) => {
				if (r.ErrorCode == 9999) {
					this.historyPagination.total = Number(r.Data.Pagination.totalCount)
					this.history = r.Data.Results
					this.historyVisible = true
				}
			})
		},
		batchDeleteDiscount () {
			let ids = []
			this.selections.forEach((item) => {
				ids.push(item.id)
			})
			this.$apiCall('api.Coupon.batchDelete', {
				ids: ids
			}, (r) => {
				if (r.ErrorCode == 9999) {
					this.$elementMessage(this.$t('discount.删除成功'), 'success')
					this.getItems()
				} else {
					this.$elementMessage(r.Message, 'error')
				}
			})
		},
		batchChangeDiscount (type) {
			let ids = []
			this.selections.forEach((item) => {
				ids.push(item.id)
			})
			this.$apiCall('api.Coupon.batchChange', {
				ids: ids,
				status: type
			}, (r) => {
				if (r.ErrorCode == 9999) {
					this.$elementMessage(this.$t('discount.修改成功'), 'success')
					this.getItems()
				}
			})
		},
		handleSelectionChange (val) {
			console.log(val)
			this.selections = val
		},
		startDateChange (val) {
			this.filterParams.startDate = val
			this.getItems()
		},
		endDateChange (val) {
			this.filterParams.endDate = val
			this.getItems()
		},
		dateChange (val) {
			console.log(val)
			this.filterParams.startDate = ''
			this.filterParams.endDate = ''
			switch (val) {
				case '1':
					// 过去一周
					this.filterParams.time = this.$moment().add(-1, 'w').format('X');
					console.log(this.filterParams.time)
					this.getItems()
					break
				case '2':
					// 过去一个月
					this.filterParams.time = this.$moment().add(-1, 'M').format('X');
					this.getItems()
					break
				case '3':
					//过去三个月
					this.filterParams.time = this.$moment().add(-3, 'M').format('X');
					this.getItems()
					break
				case '4':
					// 过去半年
					this.filterParams.time = this.$moment().add(-6, 'M').format('X');
					this.getItems()
					break
				case '5':
					//过去一年
					this.filterParams.time = this.$moment().add(-1, 'y').format('X');
					this.getItems()
					break
				case '6':
					this.filterParams.time = ''
					break
				case '7':
					this.filterParams.time = ''
					break
				default:
					break
			}
		},
		createDiscount () {
			this.$router.push({ path: '/discount-d' })
		},
		getItems() {
			this.firstEnter = false
			this.$apiCall('api.Coupon.finds', {
        page: this.pagination.currentPage,
        rowsPerPage: this.pagination.pageSize,
				type: this.filterParams.type,
				code: this.filterParams.code,
				timeValid: this.filterParams.time,
				timeStartFrom: this.filterParams.startDate / 1000,
				timeEndTo: this.filterParams.endDate / 1000,
				status: this.filterParams.status,
				timeStatus: this.timeStatus,
				useTime: this.filterParams.useTime,
				operate: this.filterParams.operate
			}, (r) => {
				if (r.ErrorCode == 9999) {
					this.items = r.Data.Results
					this.pagination.total = Number(r.Data.Pagination.totalCount)
				}
			})
		},
		handleSizeChange (val) {
			this.pagination.pageSize = val
			this.getItems()
		},
		handleCurrentChange (val) {
			this.pagination.currentPage = val
			this.getItems()
		},
		historySizeChange (val) {
			this.historyPagination.pageSize = val
			this.findHistory(this.historyRow)
		},
		historyCurrentChange (val) {
			this.historyPagination.currentPage = val
			this.findHistory(this.historyRow)
		},
		typeChange () {
			this.filterParams = {
				code: '',
				date: '',
				type: '0',
				startDate: '',
				endDate: '',
				status: '0',
				operate: '',
				useTime: null
			}
		}
	}
}
</script>

<style lang="scss" scoped>
#discount {
	padding: 15px 15px 15px 10px;
	.ipt-control {
		width: 300px;
		margin-left: 40px;
	}
	.empty-title {
		font-size: 26px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #4E4E4E;
		line-height: 37px;
	}
	.empty {
		display:flex;
		justify-content: center;
		align-items: center;
		.content {
			margin-right: 30px;
			h3 {
				font-size: 26px;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: bold;
				color: #4E4E4E;
				line-height: 40px;
			}
			p {
				font-size: 20px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #858585;
				line-height: 40px;
			}
			button {
				margin-top: 48px;
				cursor: pointer;
				width: 316px;
				height: 66px;
				border: 0;
				background: #525FB0;
				border-radius: 4px;
				font-size: 26px;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				text-align: center;
				line-height: 66px;
			}
		}
		.image {
			margin-left: 30px;
		}
	}
	.history {
		padding: 0 30px;
	}
	.pagination {
		text-align: center;
	}
}
</style>