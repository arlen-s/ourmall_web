<template>
	<div id="customer-Mgr">
		<el-card style="margin-right: 30px;">
			<el-row class="mlr-30">
				<el-form :inline="true" size="small">
						<el-form-item label="供应商ID:">
							<el-input v-model="filterParams.id"></el-input>
						</el-form-item>
						<el-form-item label="供应商登陆账号:">
							<el-input v-model="filterParams.username"></el-input>
						</el-form-item>
						<el-form-item label="店铺名称:">
							<el-input v-model="filterParams.shopName"></el-input>
						</el-form-item>
						<el-form-item label="店铺域名:">
							<el-input v-model="filterParams.shopUrl"></el-input>
						</el-form-item>
						<el-form-item label="当前套餐类型:" v-if="$route.name != 'customerFree'">
							<el-select clearable v-model="filterParams.vipType">
								<el-option value="0" label="全部"></el-option>
								<el-option value="1" label="免费版"></el-option>
								<el-option value="2" label="标准版"></el-option>
								<el-option value="3" label="专业版"></el-option>
								<el-option value="4" label="尊享版"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="注册时间:">
							<el-date-picker
								v-model="dateArr"
								type="daterange"
								:default-time="['00:00:00', '23:59:59']"
								@change="dateChange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期">
							</el-date-picker>
						</el-form-item>
						<el-form-item><el-button type="primary" @click="getItems">查询</el-button></el-form-item>
						<el-form-item><el-button type="danger" @click="resetClick">重置</el-button></el-form-item>
				</el-form>
			</el-row>
		</el-card>

		<el-card class="mt-20" style="margin-right: 30px;">
			<el-row>
				<el-table
					v-loading="dataLoading"
					:data="items">
					<el-table-column
						label="供应商ID"
						prop="id">
						<template slot-scope="scope">{{ scope.row.id || '--' }}</template>
					</el-table-column>
					<el-table-column
						label="供应商登录账号"
						prop="username">
						<template slot-scope="scope">{{ scope.row.username || '--' }}</template>
					</el-table-column>
					<el-table-column
						label="店铺名称">
						<template slot-scope="scope">
							<div v-if="scope.row.vendorShop">
								{{ scope.row.vendorShop.name || '--' }}
							</div>
							<div v-else>--</div>
						</template>
					</el-table-column>
					<el-table-column
						label="店铺域名">
						<template slot-scope="scope">
							<div v-if="scope.row.vendorShop && scope.row.vendorShop.url">{{ scope.row.vendorShop.url }}</div>
							<div v-else-if="scope.row.vendorShop && scope.row.vendorShop.subDomain">{{ scope.row.vendorShop.subDomain + '.myourmall.com' }}</div>
							<div v-else>--</div>
						</template>
					</el-table-column>
					<el-table-column
						v-if="$route.name != 'customerFree'"
						label="当前套餐类型">
						<template slot-scope="scope">
							<template v-if="scope.row.vipType == 1">免费版</template>
							<template v-if="scope.row.vipType == 2">标准版</template>
							<template v-if="scope.row.vipType == 3">专业版</template>
							<template v-if="scope.row.vipType == 4">尊享版</template>
						</template>
					</el-table-column>
					<el-table-column
						label="注册时间"
						prop="timeCreated">
					</el-table-column>
					<el-table-column
						label="最近登录时间"
						prop="timeLastOperate">
						<template slot-scope="scope">{{ scope.row.timeLastOperate || '--' }}</template>
					</el-table-column>
					<el-table-column
						label="操作">
						<template slot-scope="scope">
							<!-- 全部客户 操作列表 -->
							<div v-if="$route.name == 'customerAll'">
								<el-link type="primary" class="mg-r-10" @click="detailHandle(scope.row)">客户信息</el-link>
								<el-link v-if="!scope.row.nextVip" :disabled="!isWrite" type="primary" @click="comboDetail(scope.row)">套餐详情</el-link>
								<el-tooltip class="item" effect="dark" content="存在未生效的套餐, 无法进行修改" placement="top">
									<i v-if="scope.row.nextVip" class="el-icon-info"></i>
								</el-tooltip>
							</div>
							<!-- 免费及付费客户操作列表 -->
							<!-- 不存在未生效套餐 且有操作权限 -->
							<div v-else>
								<el-dropdown
									v-if="!scope.row.nextVip && isWrite"
									@command="handleCommand"
									>
									<span @click="modifyCombo(scope.row)" class="el-dropdown-link">
										套餐编辑<i class="el-icon-arrow-down el-icon--right"></i>
									</span>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item :command="{ command: 'vipDetail', data: scope.row }">套餐详情</el-dropdown-item>
										<el-dropdown-item :command="{ command: 'editCustomer', data: scope.row }">客户编辑</el-dropdown-item>
										<el-dropdown-item :command="{ command: 'customerDetail', data: scope.row }">客户信息</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>

								<!-- 不存在未生效套餐 且没有操作权限 -->
								<el-dropdown
									v-if="!scope.row.nextVip && !isWrite"
									@command="handleCommand"
									>
									<span @click="comboDetail(scope.row)" class="el-dropdown-link">
										套餐详情<i class="el-icon-arrow-down el-icon--right"></i>
									</span>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item :command="{ command: 'customerDetail', data: scope.row }">客户信息</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>

								<!-- 存在未生效套餐 且有操作权限 -->
								<el-dropdown
									v-if="scope.row.nextVip && isWrite"
									@command="handleCommand"
									>
									<span class="el-dropdown-link">
										客户编辑<i class="el-icon-arrow-down el-icon--right"></i>
									</span>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item :command="{ command: 'customerDetail', data: scope.row }">客户信息</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
								
								<!-- 存在未生效套餐 且没有操作权限 -->
								<el-link v-if="scope.row.nextVip && !isWrite" @click="detailHandle(scope.row)" type="primary">客户信息</el-link>

								<el-tooltip class="item" effect="dark" content="存在未生效的套餐, 无法进行修改" placement="top">
									<i v-if="scope.row.nextVip" class="el-icon-info"></i>
								</el-tooltip>
							</div>
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

		<el-dialog
			width="500px"
			title="编辑客户信息"
			:close-on-click-modal="false"
			:visible="addOrEditVisible"
			@close="dialogCloseHandle">
			<el-row class="dialog">
				<el-form size="small">
					<el-form-item label="客户名称">
						<el-input v-model="dialogForm.name"></el-input>
					</el-form-item>
					<el-form-item label="电话">
						<el-input v-model="dialogForm.mobile"></el-input>
					</el-form-item>
					<el-form-item label="邮箱">
						<el-input v-model="dialogForm.email"></el-input>
					</el-form-item>
					<el-form-item label="客户来源">
						<el-select style="width: 460px" v-model="dialogForm.source">
							<el-option value="1" label="官网咨询"></el-option>
							<el-option value="2" label="客户介绍"></el-option>
							<el-option value="3" label="展会获客"></el-option>
							<el-option value="4" label="陌拜获客"></el-option>
							<el-option value="5" label="自然获客"></el-option>
							<el-option value="9" label="其他"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="联系人">
						<el-input v-model="dialogForm.contact"></el-input>
					</el-form-item>
					<el-form-item label="备注">
						<el-input type="textarea" v-model="dialogForm.remark"></el-input>
					</el-form-item>
				</el-form>
				<div class="tx-center">
					<el-button size="small" type="warning" @click="dialogCloseHandle">取消</el-button>
					<el-button size="small" type="primary" @click="editCustomerHandle">确定</el-button>
				</div>
			</el-row>
		</el-dialog>

		<el-dialog
			title="查看客户信息"
			width="500px"
			@close="detailCloseHandle"
			:close-on-click-modal="false"
			:visible="detailVisible">
			<el-row class="dialog mg-l-50">
				<el-form size="small">
					<el-form-item label="客户名称:">{{dialogForm.name || '--'}}</el-form-item>
					<el-form-item label="电话:">{{ dialogForm.mobile || '--' }}</el-form-item>
					<el-form-item label="邮箱:">{{ dialogForm.email || '--' }}</el-form-item>
					<el-form-item label="客户来源:">
						<div v-if="dialogForm.source == 1">官网咨询</div>
						<div v-if="dialogForm.source == 2">客户介绍</div>
						<div v-if="dialogForm.source == 3">展会获客</div>
						<div v-if="dialogForm.source == 4">陌拜客户</div>
						<div v-if="dialogForm.source == 9">其他</div>
						<div v-if="dialogForm.source == 5">自然获客</div>
					</el-form-item>
					<el-form-item label="联系人:">{{ dialogForm.contact || '--' }}</el-form-item>
					<el-form-item label="提交时间:">{{ dialogForm.timeCreated || '--' }}</el-form-item>
					<el-form-item label="供应商ID:">{{ dialogForm.id || '--' }}</el-form-item>
					<el-form-item label="供应商登录账号:">{{ dialogForm.username || '--' }}</el-form-item>
					<el-form-item label="店铺名称:">{{ dialogForm.shopName || '--' }}</el-form-item>
					<el-form-item label="店铺域名:">{{ dialogForm.url || '--' }}</el-form-item>
					<el-form-item label="注册时间:">{{ dialogForm.registerTime || '--' }}</el-form-item>
					<el-form-item label="最近登录时间:">{{ dialogForm.lastLoginTime || '--' }}</el-form-item>
					<el-form-item label="备注:">{{ dialogForm.remark || '--' }}</el-form-item>
				</el-form>
				<el-row class="tx-center">
					<el-button type="primary" size="small" @click="detailCloseHandle">关闭</el-button>
				</el-row>
			</el-row>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			// 弹框参数
			detailVisible: false,
			addOrEditVisible: false,
			customerId: null,
			dialogForm: {
				name: '',
				mobile: '',
				email: '',
				source: '',
				contact: '',
				remark: ''
			},
			dataLoading: false,
			isWrite: false, //是否可写
			filterParams: {
				id: '',
				username: '',
				shopName: '',
				shopUrl: '',
				comboType: '',
				timeCreatedFrom: '',
				timeCreatedTo: ''
			},
			dateArr: [],
			pagination: {
				currentPage: 1,
				pageSize: 10,
				total: 0
			},
			items: []
		}
	},
	watch: {
		$route() {
			this.resetClick()
		}
	},
	mounted () {
		this.isWrite = this.$isRole(this.$route.meta.roleWrite)
		this.getItems()
	},
	methods: {
		// Start 弹窗方法
		editCustomerHandle () {
			if (!this.dialogForm.email && !this.dialogForm.mobile) {
				this.$elementMessage('请至少要填写电话或者邮箱中其中一项', 'error')
				return;
			}
			if (!this.dialogForm.source) {
				this.$elementMessage('请填写客户来源', 'error')
				return;
			}
			this.$apiCall('api.Admin.changeVendor', {
				id: this.customerId,
				email: this.dialogForm.email,
				phone: this.dialogForm.mobile,
				name: this.dialogForm.name,
				source: this.dialogForm.source,
				linkman: this.dialogForm.contact,
				remark: this.dialogForm.remark
			}, (r) => {
				if (r.ErrorCode == 9999) {
					this.$elementMessage('编辑客户成功', 'success')
					this.dialogCloseHandle()
					this.getItems()
				} else {
					this.$elementMessage(r.Message, 'error')
				}
			})
		},
		dialogCloseHandle () {
			this.addOrEditVisible = false
			this.customerId = null
			this.dialogForm = {
				name: '',
				mobile: '',
				email: '',
				source: '',
				contact: '',
				remark: ''
			}
		},
		detailCloseHandle () {
			this.detailVisible = false
			this.dialogForm = {
				name: '',
				mobile: '',
				email: '',
				source: '',
				contact: '',
				remark: ''
			}
		},
		detailHandle (row) {
			this.detailVisible = true
			this.customerId = row.id
			this.$apiCall('api.Admin.getVendor', {
				id: this.customerId
			}, (r) => {
				if (r.ErrorCode == 9999) {
					let data = r.Data.Results
					this.dialogForm = {
						name: '',
						mobile: '',
						email: '',
						source: '',
						contact: '',
						remark: '',
						id: data.id,
						username: data.username,
						shopName: '',
						url: '',
						registerTime: data.timeCreated,
						lastLoginTime: data.timeLogin,
						timeCreated: ''
					}
					if (data.vendorShop) {
						this.dialogForm.shopName = data.vendorShop.name
						if (data.vendorShop.url) {
							this.dialogForm.url = data.vendorShop.url
						} else if (data.vendorShop.subDomain) {
							this.dialogForm.url = data.vendorShop.subDomain + '.myourmall.com'
						}
					}
					if (data.lead) {
						this.dialogForm.name = data.lead.name
						this.dialogForm.mobile = data.lead.phone
						this.dialogForm.email = data.lead.email
						this.dialogForm.source = data.lead.source
						this.dialogForm.contact = data.lead.linkman
						this.dialogForm.remark = data.lead.remark
						this.dialogForm.timeCreated = data.lead.timeCreated
					}
				} else {
					this.$elementMessage(r.Message, 'error')
				}
			})
		},
		editCustomer (row) {
			this.addOrEditVisible = true
			this.customerId = row.id
			this.$apiCall('api.Admin.getVendor', {
				id: this.customerId
			}, (r) => {
				if (r.ErrorCode == 9999) {
					let data = r.Data.Results
					this.dialogForm = {
						name: '',
						mobile: '',
						email: '',
						source: '',
						contact: '',
						remark: ''
					}
					if (data.lead) {
						this.dialogForm.name = data.lead.name
						this.dialogForm.mobile = data.lead.phone
						this.dialogForm.email = data.lead.email
						this.dialogForm.source = data.lead.source
						this.dialogForm.contact = data.lead.linkman
						this.dialogForm.remark = data.lead.remark
					}
				} else {
					this.$elementMessage(r.Message, 'error')
				}
			})
		},
		// End 弹窗
		handleCommand (command) {
			switch (command.command) {
				case 'editVip':
					this.modifyCombo(command.data)
					break;
				case 'vipDetail':
					this.comboDetail(command.data)
					break;
				case 'editCustomer':
					this.editCustomer(command.data)
					break;
				case 'customerDetail':
					this.detailHandle( command.data)
					break;
				default:
					break
			}
		},
		comboDetail (row) {
			this.$router.push({ path: '/customerMg-detail', query: {id: row.id} })
		},
		modifyCombo (row) {
			console.log(row)
			this.$router.push({ path: '/customerMg-modify', query: {id: row.id} })
		},
		resetClick () {
			this.filterParams = {
				id: '',
				username: '',
				shopName: '',
				shopUrl: '',
				comboType: '',
				timeCreatedFrom: '',
				timeCreatedTo: ''
			}
			this.dateArr = []
			this.getItems()
		},
		getItems () {
			this.dataLoading = true
			if (this.$route.name == 'customerFree') {
				this.filterParams.vipType = '1'
			}
			let vipTypeIn = null
			if (this.$route.name == 'customerPay') {
				vipTypeIn = ['4', '2', '3']
			}
			this.$apiCall('api.Admin.vendorList', {
				id: this.filterParams.id,
				vipTypeIn: vipTypeIn,
				username: this.filterParams.username,
				shopName: this.filterParams.shopName,
				shopUrl: this.filterParams.shopUrl,
				timeCreatedFrom: this.filterParams.timeCreatedFrom,
				timeCreatedTo: this.filterParams.timeCreatedTo,
				vipType: this.filterParams.vipType,
				rowsPerPage: this.pagination.pageSize,
				page: this.pagination.currentPage
			}, (r) => {
				this.dataLoading = false
				if (r.ErrorCode == 9999) {
					this.items = r.Data.Results
					this.pagination.total = Number(r.Data.Pagination.totalCount)
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
		dateChange (arr) {
			if (arr) {
				this.filterParams.timeCreatedFrom = this.$moment(arr[0]).format("YYYY-MM-DD");
				this.filterParams.timeCreatedTo = this.$moment(arr[1]).format("YYYY-MM-DD");
			} else {
				this.filterParams.timeCreatedFrom = ''
				this.filterParams.timeCreatedTo = ''
			}
		}
	}
}
</script>

<style>
#customer-Mgr .dialog .el-form-item--small.el-form-item {
	margin-bottom: 0;
}
#customer-Mgr .el-dialog__header {
	padding-bottom: 0;
}
</style>
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