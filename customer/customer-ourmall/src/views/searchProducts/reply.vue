<template>
	<div id="search-reply">
		<div class="pagetitle">
			<div class="left">
				<div class="title title-color">
					<h2>Store products</h2>
				</div>
			</div>
			<div class="right">
				<el-button type="primary" icon="el-icon-plus" size="medium" @click="addClick">Publish</el-button>
			</div>
		</div>
		<el-card>
			<el-row>
				<el-form :mode="filterParams" :inline="true" size="mini">
					<el-form-item label="Trade name">
						<el-input v-model="filterParams.name" placeholder="Please enter"></el-input>
					</el-form-item>
					<el-form-item label="Date">
						<el-date-picker
							v-model="dateArr"
							type="daterange"
							value-format="yyyy-MM-dd"
							:default-time="['00:00:00', '23:59:59']"
							range-separator="-"
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
					<el-table-column label="Expected Price">
						<template slot-scope="scope">
							{{$store.state.country.symbol}} {{ $exchangeRate(scope.row.minPrice) }} - {{ $exchangeRate(scope.row.maxPrice) }}
						</template>
					</el-table-column>
					<el-table-column label="Product link" prop="url"></el-table-column>
					<el-table-column label="Description" prop="description"></el-table-column>
					<el-table-column label="Creation date">
						<template slot-scope="scope">
							{{moment.unix(scope.row.timeCreated).format("YYYY-MM-DD HH:mm:ss")}}
						</template>
					</el-table-column>
					<el-table-column label="Operation">
						<template slot-scope="scope">
							<el-link type="primary"  @click="detailClick(scope.row)">Details</el-link>
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

		<!-- 搜品新增 -->
		<el-dialog
			title="Search product"
			:visible.sync="publishVisible"
			:close-on-click-modal="false"
			width="800px"
			:before-close="publishClose">
			<div class="publish">
				<el-form :model="publishForm" :rules="publishRules" ref="ruleForm" label-width="180px" class="demo-ruleForm">
					<el-form-item label="Picture:" prop="imgUrl">
						<el-input v-model="publishForm.imgUrl" style="display:none"></el-input>
						<el-upload
							action=""
							ref="upload"
							list-type="picture-card"
							:limit="5"
							:before-upload="onBeforeUpload"
							:http-request="Upload"
							:on-remove="handleRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
						<div>You can only upload 5 pictures</div>
					</el-form-item>
					<el-form-item label="Product Title:" prop="title">
						<el-input size="small" v-model="publishForm.title"></el-input>
					</el-form-item>
					<el-row>
						<el-col :span="6">
							<el-form-item label="Price Range:" prop="priceFrom">
								<el-input v-model="publishForm.priceFrom" type="number" style="width: 100px" size="small"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="17">
							<el-form-item label="——" prop="priceTo">
								<el-input v-model="publishForm.priceTo" type="number" style="width: 100px" size="small"></el-input>
								<span style="color: #ccc">
									$ *Price units default to US dollars
								</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="Product Links:">
						<el-input size="small" v-model="publishForm.link"></el-input>
					</el-form-item>
					<el-form-item label="Product Description:">
						<el-input type="textarea" size="small" :rows="4" v-model="publishForm.description"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="publishClose">Cancel</el-button>
				<el-button type="primary" @click="publish">Publish</el-button>
			</span>
		</el-dialog>
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
			items: [],
			publishVisible: false,
			publishForm: {
				imgUrl: '',
				title: '',
				priceFrom: '',
				priceTo: '',
				link: '',
				description: ''
			},
			publishRules: {
				imgUrl: [
					{ required: true, message: 'Please upload pictures'},
				],
				title: [
					{ required: true, message: 'Please enter title'},
				],
				priceFrom: [
					{ required: true, message: 'Please enter price', trigger: 'blur'},
				],
				priceTo: [
					{ validator: validatePrice, trigger: 'blur'},
				]
			},
			fileList: [],
			base64: '',
			ext: '',
			file: null,
			index: 0
		}
	},
	created () {
	},
	mounted() {
		this.getItems()
	},
	methods: {
		detailClick (row) {
			this.$router.push({ path: '/search-product/d', query: {id: row.id} })
		},
		addClick () {
			// 新增搜品
			this.publishVisible = true
		},
		dateChange (val) {
			if (val) {
				this.filterParams.createdFrom = val[0]
				this.filterParams.createdTo = val[1]
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
				status: '1',
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
		publishClose() {
			this.publishForm = {
				imgUrl: '',
				title: '',
				priceFrom: '',
				priceTo: '',
				link: '',
				description: ''
			}
			this.$refs.upload.clearFiles()
			this.$refs['ruleForm'].resetFields();
			this.publishVisible = false
		},
		publish() {
			let pass = false
			this.$refs['ruleForm'].validate((valid) => {
				console.log(valid)
				if (valid) {
					pass = true
				}
			});
			if (!pass) { return ; }

			let imgArr = []
			this.fileList.forEach((item) => {
				imgArr.push(item.imgUrl)
			})
			let params = {
				url: this.publishForm.link,
				name: this.publishForm.title,
				minPrice: this.publishForm.priceFrom,
				maxPrice: this.publishForm.priceTo,
				description: this.publishForm.description,
				imgUrlJson: imgArr
			}
			this.$apiCall('api.OfferProduct.addByCustomer', {
				...params
			}, (r) => {
				if (r.ErrorCode == 9999) {
					this.publishForm = {
						title: '',
						priceFrom: '',
						priceTo: '',
						link: '',
						description: '',
						imgUrl: ''
					}
					this.$refs.upload.clearFiles();
					this.$refs['ruleForm'].resetFields();
					this.fileList = []
					this.getItems()
					this.$message.success('publish Success!')
					this.publishVisible = false
				}
			})
		},
		onBeforeUpload(file) {
			var _this = this
			this.file = file
			this.index = file.uid
		},
		Upload () {
			let file = this.file
			const uploadFile = (file) => {
				return new Promise(function (resolve, reject) {
					let reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = function(e) {
						// 图片base64化
						resolve(this.result)
					}
				})
			}
			uploadFile(file).then((file) => {
				let newUrl = file;
				let extArr = newUrl.match(/data:image\/(.*);base64,.*/);
				this.ext = extArr[1]
				this.base64 = newUrl.split("base64,").pop()
				this.$apiCall('api.User.uploadImgBase64', {
					imgUrlBase64: this.base64,
					ext: this.ext
				}, (res) => {
					if (res.ErrorCode == 9999) {
						this.fileList.push({ index: this.index, imgUrl: res.Data.Results.imgUrl })
						this.publishForm.imgUrl = res.Data.Results.imgUrl
						this.index++
					}
				})
			})
		},
		handleRemove(file) {
			// 删除图片
			this.fileList.forEach((item,index) => {
				if (item.index == file.uid) {
					this.fileList.splice(index, 1)
				}
			})
			if (this.fileList.length == 0) {
				this.publishForm.imgUrl = ''
			}
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
	.search-header {
	}
	.pagination {
		width: 100%;
		margin-top: 20px;
		text-align: center;
	}
}
</style>