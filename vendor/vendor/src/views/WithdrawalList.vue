<template>
	<div class="contentpanel transaction-page">
		<div class="pagetitle" ref="pageHeader">
			<div class="left">
				<div class="title">
					<i class="el-icon-s-finance"></i>
					<h2>{{ $t("withdraw.提现列表") }}</h2>
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
                    <el-form-item>
                      <el-select
                        filterable
                        remote
                        :remote-method="remoteMethodCustom"
                        :loading="selectLoading"
                        :placeholder="$t('myinvoice.pleaseCusName')"
                        clearable
                        v-model="filterParams.name"
                        @change="filterItem('relationshipId')"
                        @clear="close"
                      >
                        <el-option
                          v-for="opt in selectArr"
                          :key="opt.id"
                          :label="opt.customerName"
                          :value="opt.customerName"
                        ></el-option>
                      </el-select>
                    </el-form-item>      
                    <el-form-item  :label="$t('withdraw.提现方式')">
											<el-select filterable remote :placeholder="$t('transaction.all')" clearable
												v-model="filterParams.drawType" @change="filterItem"
												@clear="clearFilter('drawType')">
												<el-option v-for="opt in typeArrMail" :key="opt.value"
													:label="opt.label" :value="opt.value"></el-option>
											</el-select>
                    </el-form-item>                                      
										<el-form-item :label="$t('transaction.CreateDate')">
											<el-date-picker value-format="yyyy-MM-dd" v-model="filterParams.date"
											 placement="top"
												@clear="clearFilter('date')" @change="dateChange" type="daterange"
												align="right" unlink-panels :range-separator="$t('myinvoice.to')"
												:start-placeholder="$t('myinvoice.startDate')"
												:end-placeholder="$t('myinvoice.endDate')">
											</el-date-picker>
										</el-form-item>
										<el-form-item :label="$t('withdraw.accountPayee')">
											<el-select filterable remote :placeholder="$t('transaction.all')" clearable
												v-model="filterParams.accountPayee" @change="filterItem"
												@clear="clearFilter('accountPayee')">
												<el-option v-for="opt in accountPayeeArr" :key="opt.id"
													:label="opt.name" :value="opt.id"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item>
											<el-button type="primary" @click="filterItem">{{$t("transaction.filter")}}
											</el-button>
											<el-button type="danger" @click="clearFilter">{{$t("transaction.clear")}}
											</el-button>
										</el-form-item>
									</el-form>
								</div>
							</el-col>
						</el-row>
						<el-table stripe style="width: 100%" ref="gridTable" :data="items" tooltip-effect="dark" :row-key="(row) => row.id"
						>
							<el-table-column  :label="$t('mycustomer.customersName')">
								<template slot-scope="scope">
									<span>{{scope.row.customerName || '--'}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('withdraw.提现方式')">
								<template slot-scope="scope">									
									<span >{{scope.row.drawType == 1? $t('余额'): $t('线下')}}</span>
								</template>
							</el-table-column>	
							<el-table-column :label="$t('withdraw.状态')">
								<template slot-scope="scope">									
									<span v-if="scope.row.drawStatus == 1">待审核</span>
                  <span v-else-if="scope.row.drawStatus == 2">通过</span>
									<span v-else>拒绝</span>
								</template>
							</el-table-column>	              					
							<el-table-column :label="`${$t('withdraw.tradeAmount')}`">
								<template slot-scope="scope">
									<span >{{scope.row.amount || '--'}}</span>
								</template>
							</el-table-column>

							<el-table-column :label="$t('quotation.备注')">
								<template slot-scope="scope">
									<span>{{scope.row.remark || '---'}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('transaction.operate')" width="120">
								<template slot-scope="scope">
									<div  v-if="scope.row.drawStatus == 1">
										 <el-link class="mg-r-20" type="primary" @click="changeStatus('2',scope.row)">
											{{ $t("withdraw.agree") }}
										</el-link> 
										<el-link  class="mg-r-20" type="danger" @click="changeStatus('3',scope.row)">
											{{ $t("withdraw.reject") }}
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
				 vendorId: localStorage.getItem('vendorId'),
				pageSizes: [10, 20, 50, 100],
				page: this.$route.query.page ? Number(this.$route.query.page) : 1,
				rowsPerPage: localStorage.getItem("transactionRowsPerPage") ?
					Number(localStorage.getItem("transactionRowsPerPage")) : 10,
				items: [],
        selectLoading: false,
        selectArr:[],
				total: 0,
				totalPage: 0,
        typeArrMail:[
        {
          value: '1',
          label: '余额'
        }, {
          value: '2',
          label: '线下'
        }
        ],
				filterParams: {
          name:'',
					accountPayee: "",
					tradeStatus: "",
					tradeType: "",
					date: [],
          drawType:'',
					timeCreatedFrom: "",
					timeCreatedTo: "",
					creditStatus: '2',
          relationshipId:'',
				},
				accountPayeeArr: [{
					id: 1,
					name: "待审批"
				}, {
					id: 2,
					name: "已审批"
				}],
        selectArr: [],
				filterParamsDefault:'{}'

			};
		},
		components: {
		},
		watch: {
		},
		mounted() {
			this.getItem();
			this.filterParamsDefault = JSON.stringify(this.filterParams);
		},
		methods: {
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
			clearFilter(type) {
				switch (type) {

					case "tradeStatus":
						this.filterParams.tradeStatus = "";
						break;
					case "accountPayee":
						this.filterParams.accountPayee = "";
						break;
					case "date":
						this.filterParams.date = [];
						this.filterParams.timeCreatedFrom = "";
						this.filterParams.timeCreatedTo = "";
						break;
					default:
						this.filterParams = JSON.parse(this.filterParamsDefault);
						break;
				}
				this.filterItem();
			},
			filterItem(type) {
				this.$refs.gridTable.clearSelection();
      if (type == "relationshipId") {
        this.selectArr.forEach((c) => {
          if (c.customerName == this.filterParams.name)
            this.filterParams.relationshipId = c.id
        })
        this.getItem()
      } else {
        if (this.$route.query.page == 1) {
          this.getItem()
        } else {
          this.$router.push({ query: { page: 1 } })
        }
      }        
				if (this.$route.query.page == 1) {
					this.getItem();
				} else {
					this.$router.push({
						query: {
							page: 1
						}
					});
				}

			},
    close () {
      this.selectArr = []
      // todo
      this.filterParams.relationshipId = ''
      this.getItem()
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
