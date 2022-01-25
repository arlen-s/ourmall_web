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
						<el-form-item label="当前套餐类型:">
							<el-select v-model="filterParams.vipType">
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
					</el-table-column>
					<el-table-column
						label="供应商登录账号"
						prop="username">
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
						prop="timeLogin">
					</el-table-column>
					<el-table-column
						label="操作">
						<template slot-scope="scope">
							<el-link type="primary" v-if="!scope.row.nextVip" :disabled="!isWrite" @click="modifyCombo(scope.row)">套餐编辑</el-link>&nbsp;
							<el-link type="primary" v-if="!scope.row.nextVip" :disabled="!isWrite" @click="comboDetail(scope.row)">套餐详情</el-link>
							<el-tooltip class="item" effect="dark" content="存在未生效的套餐, 无法进行修改" placement="top">
								<i v-if="scope.row.nextVip" class="el-icon-info"></i>
							</el-tooltip>
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
	mounted () {
		this.isWrite = this.$isRole(this.$route.meta.roleWrite)
		this.getItems()
	},
	methods: {
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
			this.$apiCall('api.Admin.vendorList', {
				id: this.filterParams.id,
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