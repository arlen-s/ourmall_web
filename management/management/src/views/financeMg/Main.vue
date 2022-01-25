<template>
	<div id="customer-Mgr">
		<el-card style="margin-right: 30px;">
			<el-row class="mlr-30">
				<el-form :inline="true" size="small">
						<el-form-item label="付款时间:">
							<el-date-picker
								v-model="dateArr"
								type="daterange"
								@change="dateChange"
								range-separator="至"
								:default-time="['00:00:00', '23:59:59']"
								start-placeholder="开始日期"
								:picker-options="pickerOptions"
								end-placeholder="结束日期">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="交易编号:">
							<el-input v-model="filterParams.code"></el-input>
						</el-form-item>
						<el-form-item label="付款金额:">
							<el-input v-model="filterParams.totalAmount"></el-input>
						</el-form-item>
						<el-form-item label="供应商账号:">
							<el-select
								clearable 
								:loading="vendorLoading" 
								filterable 
								remote 
								:remote-method="getVendorList" 
								v-model="filterParams.userId">
								<el-option
									v-for="item in vendorOption"
									:key="item.id"
									:value="item.id"
									:label="item.username"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="订购版本:">
							<el-select clearable v-model="filterParams.vipType">
								<el-option value="1" label="免费版"></el-option>
								<el-option value="2" label="标准版"></el-option>
								<el-option value="3" label="专业版"></el-option>
								<el-option value="4" label="尊享版"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="开通人:">
							<el-select clearable filterable v-model="filterParams.adminId">
								<el-option
									v-for="item in adminOption"
									:key="item.id"
									:value="item.id"
									:label="item.username"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="是否加购:">
							<el-select clearable v-model="filterParams.hasAdd">
								<el-option :value="1" label="是"></el-option>
								<el-option :value="0" label="否"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="支付方式:">
							<el-select clearable v-model="filterParams.payment">
								<el-option :value="1" label="线下支付"></el-option>
								<el-option :value="2" label="线上支付"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item><el-button type="primary" @click="getItems">查询</el-button></el-form-item>
						<el-form-item><el-button type="danger" @click="resetClick">重置</el-button></el-form-item>
						<el-form-item><el-button type="warning" :disabled="!isWrite" @click="batchExport">批量导出</el-button></el-form-item>
				</el-form>
			</el-row>
		</el-card>

		<el-card class="mt-20" style="margin-right: 30px;">
			<el-row>
				<el-table
					:data="items"
					v-loading="dataLoading"
					@selection-change="selectionChange">
					<el-table-column
						type="selection">
					</el-table-column>
					<el-table-column
						width="140px"
						label="付款时间">
						<template slot-scope="scope">
							{{$moment(scope.row.timeCreated*1000).format('YYYY-MM-DD HH:mm:ss')}}
						</template>
					</el-table-column>
					<el-table-column
						width="140px"
						label="交易编号"
						prop="code">
					</el-table-column>
					<el-table-column label="支付方式">
						<template slot-scope="scope">
							<template v-if="scope.row.payment == 1">线下支付</template>
							<template v-if="scope.row.payment == 2">线上支付</template>
						</template>
					</el-table-column>
					<el-table-column
						width="140px"
						label="供应商">
						<template slot-scope="scope">
							{{scope.row.vendorName}}
						</template>
					</el-table-column>
					<el-table-column
						label="订购版本">
						<template slot-scope="scope">
							<template v-if="scope.row.vipType == 1">免费版</template>
							<template v-if="scope.row.vipType == 2">标准版</template>
							<template v-if="scope.row.vipType == 3">专业版</template>
							<template v-if="scope.row.vipType == 4">尊享版</template>
							<template v-if="scope.row.vipType == 0">--</template>
						</template>
					</el-table-column>
					<el-table-column
						label="付款金额￥"
						prop="vipAmount">
					</el-table-column>
					<el-table-column
						label="加购项目">
						<template slot-scope="scope">
							<div v-if="scope.row.extraJson.addPack && scope.row.extraJson.addPack.length > 0">
								<span v-for="(item, index) in scope.row.extraJson.addPack" :key="index">
									<span v-if="item.object == 'service'">服务包</span>
									<span v-if="item.object == 'mail'">邮件加油包</span>
									<span v-if="item.object == 'product'">商品上架数</span>
									<span v-if="item.object == 'order'">订单拉取数</span>
									<span v-if="item.object == 'subUser'">子账号数量</span>
									<template v-if="index != scope.row.extraJson.addPack.length -1"><br/></template>
								</span>
							</div>
							<div v-else>
								--
							</div>
						</template>
					</el-table-column>
					<el-table-column
						label="付款金额￥"
						prop="addAmount">
					</el-table-column>
					<el-table-column
						label="总额￥">
						<template slot-scope="scope">
							{{ scope.row.totalAmount || (Number(scope.row.addAmount) + 	Number(scope.row.vipAmount)) }}
						</template>
					</el-table-column>
					<el-table-column label="开通人">
						<template slot-scope="scope">
							<span>{{scope.row.adminName || '--'}}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="支付凭证">
						<template slot-scope="scope">
							<el-image
								fit="contain"
							 	style="width: 100px; height: 100px"
								:src="scope.row.extraJson.imgUrl"
								:preview-src-list="[scope.row.extraJson.imgUrl]" v-if="scope.row.extraJson.imgUrl"></el-image>
							<span v-else>--</span>
						</template>
					</el-table-column>
					<el-table-column
						label="备注">
						<template slot-scope="scope">
							{{ scope.row.extraJson.remark }}
						</template>
					</el-table-column>
					<el-table-column
						label="操作">
						<template slot-scope="scope">
							<el-link type="primary" :disabled="!isWrite" @click="exportData(scope.row)">导出</el-link>&nbsp;
							<!-- <el-link type="primary">查看</el-link>&nbsp; -->
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
	data() {
		return {
			dataLoading: false,
			vendorLoading: false,
			isWrite: false, //是否可写
			items: [],
			pickerOptions: {
				shortcuts: [{
					text: '最近一周',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
						picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近一个月',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
						picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近三个月',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
						picker.$emit('pick', [start, end]);
					}
				}]
			},
			filterParams: {
				userId: '',
				code: '',
				totalAmount: '',
				vipType: '',
				adminId: '',
				hasAdd: '',
				payment: '',
				timeCreatedFrom: '',
				timeCreatedTo: ''
			},
			selectArr: [],
			dateArr: [],
			adminOption: [],
			vendorOption: [],
			pagination: {
				currentPage: 1,
				pageSize: 10,
				total: 0
			}
		}
	},
	mounted () {
		this.isWrite = this.$isRole(this.$route.meta.roleWrite)
		this.getItems()
		this.getAdminList()
		// this.getVendorList()
	},
	methods: {
		getAdminList () {
			this.$apiCall('api.Admin.findsAdmin',{
				all: true
			},r=>{
				if(r.ErrorCode == 9999){
					this.adminOption = r.Data.Results
				}else{
					this.$message({message: r.Message, type: "error"});
				}
			})
		},
		getVendorList (query) {
			if (query.length <= 1) {
				return;
			}
			this.vendorLoading = true
			this.$apiCall('api.Admin.vendorList',{
				usernameLike: query
			},r=>{
				this.vendorLoading = false
				if(r.ErrorCode == 9999){
					this.vendorOption = r.Data.Results
				}else{
					this.$message({message: r.Message, type: "error"});
				}
			})
		},
		selectionChange (selection) {
			console.log(selection)
			this.selectArr = []
			selection.forEach((item, index) => {
				this.selectArr.push(item.id)
			})
		},
		batchExport () {
			this.$apiCall('api.Admin.exportVipRecord', {
				userId: this.filterParams.userId,
				code: this.filterParams.code,
				vipType: this.filterParams.vipType,
				timeCreatedFrom: this.filterParams.timeCreatedFrom,
				timeCreatedTo: this.filterParams.timeCreatedTo,
				totalAmount: this.filterParams.totalAmount,
				hasAdd: this.filterParams.hasAdd,
				adminId: this.filterParams.adminId,
				ids: this.selectArr
			}, (r) => {
				if (r.ErrorCode == 9999) {
					window.open(r.Data.Results)
				} else {
					this.$elementMessage(r.Message, 'error')
				}
			})
		},
		exportData (row) {
			this.$apiCall('api.Admin.exportVipRecord', {
				ids: [row.id]
			}, (r) => {
				if (r.ErrorCode == 9999) {
					window.open(r.Data.Results)
				} else {
					this.$elementMessage(r.Message, 'error')
				}
			})
		},
		getItems() {
			this.dataLoading = true
			this.$apiCall('api.Admin.getVipRecord', {
				userId: this.filterParams.userId,
				code: this.filterParams.code,
				vipType: this.filterParams.vipType,
				timeCreatedFrom: this.filterParams.timeCreatedFrom,
				timeCreatedTo: this.filterParams.timeCreatedTo,
				totalAmount: this.filterParams.totalAmount,
				hasAdd: this.filterParams.hasAdd,
				payment: this.filterParams.payment,
				adminId: this.filterParams.adminId,
				page: this.pagination.currentPage,
				rowsPerPage: this.pagination.pageSize
			}, (r) => {
				this.dataLoading = false
				if (r.ErrorCode == 9999) {
					this.items = r.Data.Results
					this.pagination.total = Number(r.Data.Pagination.totalCount)
					this.items.forEach((item) => {
						item.extraJson = JSON.parse(item.extraJson)
					})
				} else {
					this.$elementMessage(r.Message, 'error')
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
		resetClick() {
			this.filterParams = {
				userId: '',
				code: '',
				totalAmount: '',
				vipType: '',
				adminId: '',
				hasAdd: '',
				timeCreatedFrom: '',
				timeCreatedTo: ''
			}
			this.dateArr = []
			this.getItems()
		},
		dateChange (arr) {
			if (arr) {
				this.filterParams.timeCreatedFrom = new Date(this.dateArr[0]).getTime() / 1000
				this.filterParams.timeCreatedTo = new Date(this.dateArr[1]).getTime() / 1000
			} else {
				this.filterParams.timeCreatedFrom = ''
				this.filterParams.timeCreatedTo = ''
			}
		}
	}
}
</script>

<style lang="scss" scoped>
#customer-Mgr {
	.mt-20 {
		margin-top: 20px;
	}
	.mlr-30 {
		margin: 0 30px;
	}
	.footer {
		text-align: center;
		margin-top: 20px;
	}
}
</style>