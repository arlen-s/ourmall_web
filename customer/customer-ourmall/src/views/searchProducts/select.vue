<template>
	<div id="search-reply">
		<div class="pagetitle">
			<div class="left">
				<div class="title title-color">
					<h2>{{$t('Search Products')}}</h2>
				</div>
			</div>
			<div class="right">
			</div>
		</div>
		<el-card>
			<el-row>
				<el-form :mode="filterParams" :inline="true" size="mini">
					<el-form-item label="Trade Name">
						<el-input v-model="filterParams.name" placeholder="Please enter"></el-input>
					</el-form-item>
					<el-form-item label="State">
						<el-select v-model="filterParams.status">
							<el-option value="0" :label="$t('All')"></el-option>
							<el-option value="1" :label="$t('Penging')"></el-option>
							<el-option value="2" :label="$('Completed')"></el-option>
							<el-option value="9" :label="$t('Failed')"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="Date">
						<el-date-picker
							v-model="dateArr"
							type="daterange"
							:default-time="['00:00:00', '23:59:59']"
							value-format="yyyy-MM-dd"
							range-separator="-"
							@change="dateChange"
							start-placeholder="Start date"
							end-placeholder="End date">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getItems">{{$t('Query')}}</el-button>
						<el-button type="warning" @click="ResetClick">{{$t('Reset')}}</el-button>
					</el-form-item>
				</el-form>
			</el-row>
			<el-divider></el-divider>
			<el-row>
				<el-table
					:data="items">
					<el-table-column :label="$t('Product title')" prop="name"></el-table-column>
					<el-table-column :label="$t('Picture')">
						<template slot-scope="scope">
							<el-image class="image-size" 
								:src="scope.row.imgUrlJson[0]" fit="contain"
								:preview-src-list="[scope.row.imgUrlJson[0]]"></el-image>
						</template>
					</el-table-column>
					<el-table-column :label="$t('Expected price')">
						<template slot-scope="scope">
							{{$store.state.country.symbol}} {{ $exchangeRate(scope.row.minPrice) }} - {{ $exchangeRate(scope.row.maxPrice) }}
						</template></el-table-column>
					<el-table-column :label="$t('Reply price')">
						<template slot-scope="scope">
							<span v-if="scope.row.price">
								{{$store.state.country.symbol}} {{ $exchangeRate(scope.row.price)}}
							</span>
							<span v-else>--</span>
						</template></el-table-column>
					<el-table-column :label="$t('Reply link')">
						<template slot-scope="scope">
							<span v-if="scope.row.vendorProduct">
								<span v-if="vendorId != 148982 && vendorId != 146428&& vendorId != 144875&& vendorId != 144843&& vendorId != 143779&& vendorId != 14365&& vendorId != 74">
										{{`${host}/item/${scope.row.vendorProduct.id}/${scope.row.vendorProduct.name.replace(/\s+/g, '-').replace(/[^\w]/g,'_')}.html`}}
								</span>
								<span v-else>

								</span>
								
							</span>
							<span v-else>--</span>
						</template>
					</el-table-column>
					<el-table-column :label="$t('Creation date')">
						<template slot-scope="scope">
						{{moment.unix(scope.row.timeCreated).format("YYYY-MM-DD HH:mm:ss")}}
						</template>
					</el-table-column>
					<el-table-column :label="$t('Reply date')">
						<template slot-scope="scope">
							<div v-if="scope.row.timeUpdate == '0'">
								--
							</div>
							<div v-else>
								{{ moment.unix(scope.row.timeUpdate).format("YYYY-MM-DD HH:mm:ss") }}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="State">
						<template slot-scope="scope">
							<div v-if="scope.row.status == '1'">{{$t('Pending')}}</div>
							<div v-if="scope.row.status == '2'">{{$t('Completed')}}</div>
							<div v-if="scope.row.status == '9'">{{$t('Failed')}}</div>
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
				return callback(new Error(this.$t('Please enter price')))
			} else {
				callback()
			}
		}
		return {
			host: window.location.origin,
			vendorId: localStorage.getItem('vendorId'),
			filterParams: {
				name: '',
				status: '',
				createdFrom: '',
				createdTo: ''
			},
			dateArr: [],
			pagination: {
				currentPage: 1,
				pageSize: 10,
				totalCount: 0
			},
			items: []
		}
	},
	created () {
	},
	mounted() {
		this.getItems()
	},
	methods: {
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
			this.$apiCall('api.OfferProduct.findByCustomer', {
				status: this.filterParams.status,
				nameLike: this.filterParams.name || '',
				timeCreatedFrom: this.filterParams.createdFrom,
				timeCreatedTo: this.filterParams.createdTo,
        rowsPerPage: this.pagination.pageSize || 10,
        page: this.pagination.currentPage || 1,
			}, (r) => {
				if (r.ErrorCode == 9999) {
					this.items = r.Data.Results
					this.pagination.totalCount = Number(r.Data.Pagination.totalCount)
				} else {
					this.$elementMessage(r.Message, 'error')
				}
			})
		},
		addClick () {
			// 新增搜品
			this.publishVisible = true
		},
		dateChange (arr) {
			if (arr) {
				this.filterParams.createdFrom = arr[0]
				this.filterParams.createdTo = arr[1]
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