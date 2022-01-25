<template>
	<div id="unregistered">
		<el-row class="mg-b-20 mg-r-30" style="text-align:right;">
			<el-button type="primary" icon="el-icon-plus" @click="addCustomer">新增客户</el-button>
		</el-row>
		<!-- 筛选条件 -->
		<el-card class="mg-r-30">
			<el-form :inline="true" size="small">
				<el-form-item label="供应商名称:">
					<el-input v-model="filterParams.name" @keyup.enter.native="getItems"></el-input>
				</el-form-item>
				<el-form-item label="供应商手机号:">
					<el-input v-model="filterParams.mobile" @keyup.enter.native="getItems"></el-input>
				</el-form-item>
				<el-form-item label="供应商邮箱:">
					<el-input v-model="filterParams.email" @keyup.enter.native="getItems"></el-input>
				</el-form-item>
				<el-form-item label="客户来源:">
					<el-select clearable v-model="filterParams.source">
						<el-option value="1" label="官网咨询"></el-option>
						<el-option value="2" label="客户介绍"></el-option>
						<el-option value="3" label="展会获客"></el-option>
						<el-option value="4" label="陌拜获客"></el-option>
						<el-option value="5" label="自然获客"></el-option>
						<el-option value="9" label="其他"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="联系人:">
					<el-input v-model="filterParams.contact" @keyup.enter.native="getItems"></el-input>
				</el-form-item>
				<el-form-item label="提交时间:">
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
				<el-form-item>
					<el-button type="primary" @click="getItems">查询</el-button>
					<el-button type="warning" @click="resetClick">重置</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<!-- 表单区 -->
		<el-card class="mg-t-30">
			<el-table
				:data="items">
				<el-table-column label="供应商名称" prop="name">
					<template slot-scope="scope">{{ scope.row.name || '--' }}</template>
				</el-table-column>
				<el-table-column label="供应商手机号" prop="phone">
					<template slot-scope="scope">{{ scope.row.phone || '--' }}</template>
				</el-table-column>
				<el-table-column label="邮箱" prop="email">
					<template slot-scope="scope">{{ scope.row.email || '--' }}</template>
				</el-table-column>
				<el-table-column label="客户来源">
					<template slot-scope="scope">
						<div v-if="scope.row.source == 1">官网咨询</div>
						<div v-if="scope.row.source == 2">客户介绍</div>
						<div v-if="scope.row.source == 3">展会获客</div>
						<div v-if="scope.row.source == 4">陌拜获客</div>
						<div v-if="scope.row.source == 9">其他</div>
						<div v-if="scope.row.source == 5">自然获客</div>
					</template>
				</el-table-column>
				<el-table-column label="联系人" prop="linkman">
					<template slot-scope="scope">{{ scope.row.linkman || '--' }}</template>
				</el-table-column>
				<el-table-column label="提交时间" prop="timeCreated">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-link type="primary" class="mg-r-10" @click="editCustomer(scope.row)">编辑</el-link>
						<el-link type="primary" @click="detailHandle(scope.row)">查看</el-link>
					</template>
				</el-table-column>
			</el-table>
			<el-row class="mg-t-20 tx-center">
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
			:title="isAdd == true ? '新增客户': '编辑客户信息'"
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
						<el-select clearable style="width: 460px" v-model="dialogForm.source">
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
					<!-- 新增客户 -->
					<el-button v-if="isAdd" size="small" type="primary" @click="addCustomerHandle">确定</el-button>
					<!-- 编辑客户 -->
					<el-button v-if="!isAdd" size="small" type="primary" @click="editCustomerHandle">确定</el-button>
				</div>
			</el-row>
		</el-dialog>

		<el-dialog
			title="查看客户信息"
			width="500px"
			:visible="detailVisible"
			:close-on-click-modal="false"
			@close="detailCloseHandle">
			<el-row class="dialog mg-l-50">
				<el-form size="small">
					<el-form-item label="客户名称:">{{dialogForm.name}}</el-form-item>
					<el-form-item label="电话:">{{ dialogForm.mobile }}</el-form-item>
					<el-form-item label="邮箱:">{{ dialogForm.email }}</el-form-item>
					<el-form-item label="客户来源:">
						<div v-if="dialogForm.source == 1">官网咨询</div>
						<div v-if="dialogForm.source == 2">客户介绍</div>
						<div v-if="dialogForm.source == 3">展会获客</div>
						<div v-if="dialogForm.source == 4">陌拜获客</div>
						<div v-if="dialogForm.source == 9">其他</div>
						<div v-if="dialogForm.source == 5">自然获客</div>
					</el-form-item>
					<el-form-item label="联系人:">{{ dialogForm.contact }}</el-form-item>
					<el-form-item label="提交时间:">{{ dialogForm.timeCreated }}</el-form-item>
					<el-form-item label="备注:">{{ dialogForm.remark }}</el-form-item>
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
	data () {
		return {
			// 弹框参数
			isAdd: false,
			detailVisible: false,
			addOrEditVisible: false,
			dialogForm: {
				name: '',
				mobile: '',
				email: '',
				source: '',
				contact: '',
				remark: ''
			},
			// 客户id
			customerId: null,
			pagination: {
				currentPage: 1,
				pageSize: 10,
				total: 0
			},
			items: [],
			dateArr: [],
			filterParams: {
				name: '',
				mobile: '',
				email: '',
				source: '',
				contact: '',
				startDate: '',
				endDate: ''
			}
		}
	},
	created () {
		this.getItems()
	},
	methods: {
		resetClick () {
			this.filterParams = {
				name: '',
				mobile: '',
				email: '',
				source: '',
				contact: '',
				startDate: '',
				endDate: ''
			}
			this.getItems()
		},
		getItems () {
			this.$apiCall('api.Admin.leadList', {
				nameLike: this.filterParams.name,
				phone: this.filterParams.mobile,
				source: this.filterParams.source,
				timeCreatedFrom: this.filterParams.startDate,
				timeCreatedTo: this.filterParams.endDate,
				email: this.filterParams.email,
				linkman: this.filterParams.contact,
				rowsPerPage: this.pagination.pageSize,
				page: this.pagination.currentPage
			}, (r) => {
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
		detailHandle (row) {
			this.detailVisible = true
			this.dialogForm = {
				name: row.name,
				mobile: row.phone,
				email: row.email,
				source: row.source,
				contact: row.linkman,
				remark: row.remark,
				timeCreated: row.timeCreated
			}
		},
		editCustomer (row) {
			this.isAdd = false
			this.addOrEditVisible = true
			this.customerId = row.id
			this.dialogForm = {
				name: row.name,
				mobile: row.phone,
				email: row.email,
				source: row.source,
				contact: row.linkman,
				remark: row.remark
			}
		},
		editCustomerHandle () {
			if (!this.dialogForm.email && !this.dialogForm.mobile) {
				this.$elementMessage('请至少要填写电话或者邮箱中其中一项', 'error')
				return;
			}
			if (!this.dialogForm.source) {
				this.$elementMessage('请填写客户来源', 'error')
				return;
			}
			this.$apiCall('api.Admin.changeLeads', {
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
		addCustomer () {
			this.isAdd = true
			this.addOrEditVisible = true
		},
		addCustomerHandle () {
			if (!this.dialogForm.email && !this.dialogForm.mobile) {
				this.$elementMessage('请至少要填写电话或者邮箱中其中一项', 'error')
				return;
			}
			if (!this.dialogForm.source) {
				this.$elementMessage('请填写客户来源', 'error')
				return;
			}
			this.$apiCall('api.Admin.addLeads', {
				email: this.dialogForm.email,
				phone: this.dialogForm.mobile,
				name: this.dialogForm.name,
				source: this.dialogForm.source,
				linkman: this.dialogForm.contact,
				remark: this.dialogForm.remark
			}, (r) => {
				if (r.ErrorCode == 9999) {
					this.$elementMessage('新增客户成功', 'success')
					this.dialogCloseHandle()
					this.getItems()
				} else {
					this.$elementMessage(r.Message, 'error')
				}
			})
		},
		dateChange (arr) {
			if (arr) {
				this.filterParams.startDate = this.$moment(arr[0]).format("YYYY-MM-DD");
				this.filterParams.endDate = this.$moment(arr[1]).format("YYYY-MM-DD");
			} else {
				this.filterParams.startDate = ''
				this.filterParams.endDate = ''
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
		}
	}
}
</script>

<style>
#unregistered .dialog .el-form-item--small.el-form-item {
	margin-bottom: 0;
}
#unregistered .el-dialog__header {
	padding-bottom: 0;
}
</style>