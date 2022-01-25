<template>
	<div id="search-reply">
		<div class="pagetitle">
			<div class="left">
				<div class="title title-color">
					<h2>Search Products</h2>
				</div>
			</div>
			<div class="right">
			</div>
		</div>
		<el-card>
			<el-row>
				<el-tabs v-model="activeName" @tab-click="tabChange">
					<el-tab-pane label="Complete" name="2"></el-tab-pane>
					<el-tab-pane label="Failed" name="9"></el-tab-pane>
				</el-tabs>
			</el-row>
			<el-row>
				<el-form :mode="filterParams" :inline="true" size="mini">
					<el-form-item label="Trade name">
						<el-input v-model="filterParams.name" placeholder="Please enter"></el-input>
					</el-form-item>
					<el-form-item label="Date">
						<el-date-picker
							v-model="dateArr"
							type="daterange"
							:default-time="['00:00:00', '23:59:59']"
							range-separator="-"
							value-format="yyyy-MM-dd"
							@change="dateChange"
							start-placeholder="Start date"
							end-placeholder="End date">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getItems">Query</el-button>
						<el-button type="warning" @click="ResetClick">Reset</el-button>
					</el-form-item>
				</el-form>
			</el-row>
			<el-divider></el-divider>
			<el-row>
				<el-table
					:data="items"
					v-loading="tableLoading">
					<el-table-column label="Product title" prop="name"></el-table-column>
					<el-table-column label="Picture">
						<template slot-scope="scope">
							<el-image class="image-size" 
								:src="scope.row.imgUrlJson[0]" fit="contain"
								:preview-src-list="[scope.row.imgUrlJson[0]]"></el-image>
						</template>
					</el-table-column>
					<el-table-column label="Expected price">
						<template slot-scope="scope">
							{{$showSybmol()}} {{ $exchangeRate(scope.row.minPrice) }} - {{ $exchangeRate(scope.row.maxPrice) }}
						</template>
					</el-table-column>
					<el-table-column label="Reply price" v-if="activeName == '2'">
						<template slot-scope="scope">
							<span v-if="scope.row.vendorProduct">
								{{$showSybmol()}} {{$exchangeRate(scope.row.vendorProduct.cost)}}
							</span>
							<span v-else>
								--
							</span>
						</template>
					</el-table-column>
					<el-table-column label="Reply link" v-if="activeName == '2'">
						<template slot-scope="scope">
							<a target="_blank" v-if="scope.row.vendorProduct" :href="`${host}/item/${scope.row.vendorProduct.id}/${scope.row.vendorProduct.name.replace(/\s+/g, '-').replace(/[^\w]/g,'_')}.html`">
								{{`${host}/item/${scope.row.vendorProduct.id}/${scope.row.vendorProduct.name.replace(/\s+/g, '-').replace(/[^\w]/g,'_')}.html` || '--'}}
							</a>
							<span v-else> --</span>
						</template>
					</el-table-column>
					<el-table-column label="Failure reason" v-if="activeName == '9'">
						<template slot-scope="scope">
							{{ scope.row.remark }}
						</template>
					</el-table-column>
					<el-table-column label="Creation date">
						<template slot-scope="scope">
						{{moment.unix(scope.row.timeCreated).format("YYYY-MM-DD HH:mm:ss")}}
						</template>
					</el-table-column>
					<el-table-column label="Operation" width="200px">
						<template slot-scope="scope">
							<div>
								<el-link type="primary"  v-if="activeName == '2' && scope.row.hasImportProduct != 1" @click="publishAndImport(scope.row)">Add To import List</el-link>
							</div>
							<div>
								<el-link type="primary" @click="detailClick(scope.row)">Details </el-link>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<el-row class="pagination">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pagination.currentPage"
					:page-sizes="[10, 20, 30]"
					:page-size="pagination.pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="pagination.totalCount">
				</el-pagination>
			</el-row>
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		let validatePrice = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('Please enter price'))
			} else {
				callback()
			}
		}
		return {
			tableLoading: false,
			host: window.location.origin,
			filterParams: {
				name: '',
				status: '',
				createdFrom: '',
				createdTo: ''
			},
			dateArr: [],
			activeName: '2',
			pagination: {
				currentPage: 1,
				pageSize: 20,
				totalCount: 0
			},
			items: [],
			publishDetail: {},
			detailVisible: false,
		}
	},
	created () {
	},
	mounted() {
		this.getItems()
	},
	methods: {
		publishAndImport (row) {
			this.$apiCall('api.Product.addFromVendorShopProduct', {
				id: row.vendorProduct.id
			}, (r) => {
				if (r.ErrorCode == 9999) {
					this.$message({message: r.Message, type: 'success'})
					this.getItems()
				} else {
					this.$message({message: r.Message, type: 'error'})
				}
			})
		},
		detailClick (row) {
			this.$router.push({ path: '/search-product/d', query: {id: row.id} })
		},
		ResetClick () {
			this.filterParams = {
				name: '',
				status: '',
				createdFrom: '',
				createdTo: ''
			}
			this.dateArr = []
			this.getItems()
		},
		getItems() {
			this.tableLoading = true
			this.$apiCall('api.OfferProduct.findByCustomer', {
				status: this.activeName,
				nameLike: this.filterParams.name || '',
				timeCreatedFrom: this.filterParams.createdFrom,
				timeCreatedTo: this.filterParams.createdTo,
        rowsPerPage: this.pagination.pageSize || 10,
        page: this.pagination.currentPage || 1,
			}, (r) => {
				this.tableLoading = false
				if (r.ErrorCode == 9999) {
					this.items = r.Data.Results
					this.pagination.totalCount = Number(r.Data.Pagination.totalCount)
				} else {
					this.$elementMessage(r.Message, 'error')
				}
			})
		},
		tabChange () {
			this.getItems()
		},
		dateChange (val) {
			if (val) {
				this.filterParams.createdFrom = val[0]
				this.filterParams.createdTo = val[1]
				console.log(this.filterParams)
			} else {
				this.filterParams.createdFrom = ''
				this.filterParams.createdTo = ''
			}
		},
		handleCurrentChange (val) {
			this.pagination.currentPage = val
			this.getItems()
		},
		handleSizeChange(val) {
			this.pagination.pageSize = val
			this.getItems()
		},
	}
}
</script>

<style>
#search-reply .el-form-item__error {
	white-space: nowrap;
}
</style>
<style lang="scss" scoped>
#search-reply {
	.image-size {
		width: 60px;
		height: 60px;
		margin: 0 10px;
	}
	.title-color {
		color: #5c6ac4;
		h2 {
			font-size: 24px;
		}
	}
	.text-right {
		text-align: right;
		padding: 0 40px;
	}
	.pagination {
		width: 100%;
		margin-top: 20px;
		text-align: center;
	}
}
</style>