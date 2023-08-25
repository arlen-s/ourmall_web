<template>
	<div class="contentpanel transaction-page">
		<div class="pagetitle" ref="pageHeader">
			<div class="left">
				<div class="title">
					<i class="el-icon-s-finance"></i>
					<h2>{{ $t("withdraw.店铺销量统计") }}</h2>
				</div>
			</div>
			<div class="right">
			
			</div>
		</div>
		<div class="pagebody" v-loading="loading">
			<el-row :gutter="15" class="mg-b-20">
				<el-col :span="24">
					<el-card>
						<el-row :gutter="20">
							<el-col :span="24">
								<div ref="pageFilter" class="page-filter">
									<el-form :inline="true" size="mini">
     					       <el-form-item :label="$t('orders.storeName') + ':' ">
                          <el-select
                            filterable
                            remote
                            placeholder="all"
                            clearable
                            v-model="filterParams.accountIds"
                            @change="filterItem"
                            @clear="clearFilter('accountIds')"
                          >
                            <el-option
                              v-for="opt in storeList"
                              :key="opt.id"
                              :label="opt.shopName"
                              :value="opt.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>	
												<el-form-item>
													<el-date-picker
														v-model="timer"
														type="daterange"
														align="right"
														unlink-panels
														range-separator="至"
														start-placeholder="开始日期"
														end-placeholder="结束日期"
														:picker-options="pickerOptions">
													</el-date-picker>
												</el-form-item>								
									</el-form>
								</div>
							</el-col>
						</el-row>
						<el-table stripe style="width: 100%" ref="gridTable" :data="items" tooltip-effect="dark" :row-key="(row) => row.id"
						>
							<el-table-column  :label="$t('withdraw.店铺名称')">
								<template slot-scope="scope">
									<span>{{'天豪服装旗舰店' || '--'}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="`${$t('withdraw.店铺邮箱')}`">
								<template slot-scope="scope">
									<span >{{'79354545@qq.com' || '--'}}</span>
								</template>
							</el-table-column>							
							<el-table-column :label="$t('withdraw.销售数量')">
								<template slot-scope="scope">									
									<span >40</span>
								</template>
							</el-table-column>	
							<el-table-column :label="$t('withdraw.销售总金额')">
								<template slot-scope="scope">									
									<span>100.5</span>
								</template>
							</el-table-column>	              					

							<el-table-column :label="$t('transaction.operate')" width="120">
								<template slot-scope="scope">
									<div>
										 <el-link class="mg-r-20" type="primary" @click="changeStatus('2',scope.row)">
											{{ $t("withdraw.详情") }}
										</el-link> 
									</div>
								</template>
							</el-table-column> 
						</el-table>
			<el-row v-if="items.length" :gutter="20" style="margin-top:10px">
				<el-col :span="24" class="d-flex justify-content-center">
					<div>
						<el-pagination :current-page="Number(page)" :background="true"
							layout="sizes, total, prev, pager, next, jumper" :page-sizes="pageSizes"
							:page-size="rowsPerPage" :total="Number(total)" @current-change="toPage"
							@size-change="changePageSize">
						</el-pagination>
					</div>
				</el-col>
			</el-row>
					</el-card>
				</el-col>
			</el-row>




		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				pageSizes: [10, 20, 50, 100],
				page: this.$route.query.page ? Number(this.$route.query.page) : 1,
				rowsPerPage: localStorage.getItem("transactionRowsPerPage") ?
					Number(localStorage.getItem("transactionRowsPerPage")) : 10,
				items: [],
        selectLoading: false,
        selectArr:[],
				total: 0,
				totalPage: 0,
				filterParams: {
          accountIds:'',
				},
				timer: '',
				storeList: [],

			};
		},
		components: {
		},
		watch: {
		},
		mounted() {
			this.getItem();
		},
		methods: {
			    getShopName () {
      this.storeList = []
      this.$apiCall(
        "api.Invoice.findStoreByVendor", {}, (r) => {
          if (r.ErrorCode == 9999) {
            this.storeList = r.Data.Results
          } else {
            this.$message({
              message: r.Message,
              type: "error"
            })
          }
        }
      )
    },
    remoteMethodCustom (query) {
      this.selectArr = []
      //获取筛选客户
      if (!query) return
      this.selectLoading = true
      this.$apiCall("api.Relationship.findByVendor", { name: query }, (r) => {
        this.selectLoading = false
        if (r.ErrorCode == 9999) {
          this.selectArr = r.Data.Results
        } else {
          this.$message({ message: r.Message, type: "error" })
        }
      })
    },
			toPage(val) {
				if (val != this.$route.query.page)
					this.$router.push({
						query: {
							page: val
						}
					});
			},
      changeStatus(type, row){
      this.$apiCall("api.CustomerWithdrawal.checkStatus", { drawStatus: type,id: row.id}, (r) => {
        this.selectLoading = false
        if (r.ErrorCode == 9999) {
          this.getItem()
        } else {
          this.$message({ message: r.Message, type: "error" })
        }
      })          
      },
			changePageSize(val) {
				this.rowsPerPage = val;
				localStorage.setItem("transactionRowsPerPage", val);
				this.getItem();
			},
			gotoPage() {
				this.page = this.$route.query.page ? this.$route.query.page : 1;
				this.getItem();
			},
			dateChange() {
				if (this.filterParams.date.length > 1) {
					this.filterParams.timeCreatedFrom = this.$moment(
						this.filterParams.date[0]
					).format("YYYY-MM-DD");
					this.filterParams.timeCreatedTo = this.$moment(
						this.filterParams.date[1]
					).format("YYYY-MM-DD");
					this.filterItem();
				}
			},    
			getItem(s) {
				console.log(this.filterParams.creditStatus, 'this.filterParams.creditStatus');
				this.loading = true;
				this.$apiCall(
					"api.CustomerWithdrawal.get", {
						page: this.page,
						rowsPerPage: this.rowsPerPage,
						timeCreatedFrom: this.filterParams.timeCreatedFrom,
						timeCreatedTo: this.filterParams.timeCreatedTo,
						customerId: this.filterParams.relationshipId,
						drawType: this.filterParams.drawType,
						drawStatus:  this.filterParams.accountPayee,
					},
					(r) => {
						this.loading = false;
						if (r.ErrorCode == 9999) {
							this.items = r.Data.Results;
							this.total = Number(r.Data.Pagination.totalCount);
							this.totalPage = Number(r.Data.Pagination.totalPage);

						} else {
							this.$message({
								message: r.Message,
								type: "error"
							});
						}
					}
				);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.dialog-body {
		padding: 25px;
		.tltle {
			font-size: 16px;
			font-weight: bold;
			margin-bottom: 25px;
		}

		.item-wrap {
			padding-top: 15px;
			padding-bottom: 7px;
			border-top: 1px solid #ddd;

			>* {
				margin-bottom: 8px;
			}
		}
	}
	::v-deep .el-dialog__body {
	  height: 62vh;
	  overflow: auto;
	}
</style>
