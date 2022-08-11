<template>
	<div class="contentpanel transaction-page">
		<div class="pagetitle" ref="pageHeader">
			<div class="left">
				<div class="title">
					<i class="el-icon-s-finance"></i>
					<h2>Transaction</h2>
				</div>
			</div>
			<div class="right">
				<!-- <el-button type="primary" size="medium" @click="viewDetailFn" :disabled="!checkItems.length">Export</el-button> -->
			</div>
		</div>
		<div class="pagebody" v-loading="loading">
			 <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="normal bill" name="2">			
			<el-row :gutter="15" class="mg-b-20">
				<el-col :span="24">
					<el-card>
						<el-row :gutter="20">
							<el-col :span="24">
								<div ref="pageFilter" class="page-filter">
									<el-form :inline="true" size="mini">
										<el-form-item label="Create Date">
											<el-date-picker value-format="yyyy-MM-dd" v-model="filterParams.date"
												@clear="clearFilter('date')" @change="dateChange" type="daterange"
												align="right" unlink-panels start-placeholder="Start"
												end-placeholder="End">
											</el-date-picker>
										</el-form-item>
										<el-form-item>
											<el-radio-group v-model="dateFilter" size="mini" @change="filterDate">
												<el-radio-button label="1">Today</el-radio-button>
												<el-radio-button label="2">Yestoday
												</el-radio-button>
												<el-radio-button label="3">Last 7 days
												</el-radio-button>
												<el-radio-button label="4">Last 30 days
												</el-radio-button>
											</el-radio-group>
										</el-form-item>
										<el-form-item>
											<el-input placeholder="Payment code" v-model="filterParams.paymentCode"
												clearable @keyup.enter.native="filterItem"
												@clear="clearFilter('paymentCode')"></el-input>
										</el-form-item>
										<el-form-item>
											<el-input placeholder="Third Party Number" v-model="filterParams.code"
												clearable @keyup.enter.native="filterItem" @clear="clearFilter('code')">
											</el-input>
										</el-form-item>
										<el-form-item label="Trade type: ">
											<el-select filterable remote placeholder="all" clearable
												v-model="filterParams.tradeType" @change="filterItem"
												@clear="clearFilter('tradeType')">
												<el-option v-for="opt in tradeTypeArr" :key="opt.id" :label="opt.name"
													:value="opt.id"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="Trade status: ">
											<el-select filterable remote placeholder="all" clearable
												v-model="filterParams.tradeStatus" @change="filterItem"
												@clear="clearFilter('tradeStatus')">
												<el-option v-for="opt in tradeStatusArr" :key="opt.id" :label="opt.name"
													:value="opt.id"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="Account payee: ">
											<el-select filterable remote placeholder="all" clearable
												v-model="filterParams.accountPayee" @change="filterItem"
												@clear="clearFilter('accountPayee')">
												<el-option v-for="opt in accountPayeeArr" :key="opt.id"
													:label="opt.name" :value="opt.id"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item>
											<el-input placeholder="Order number" v-model="filterParams.shopifyOrder"
												clearable @keyup.enter.native="filterItem"
												@clear="clearFilter('shopifyOrder')"></el-input>
										</el-form-item>
										<el-form-item>
											<el-button type="primary" @click="filterItem">Filter</el-button>
											<el-button type="danger" @click="clearFilter">Clear</el-button>
										</el-form-item>
									</el-form>
								</div>
							</el-col>
						</el-row>
						<el-table stripe style="width: 100%" ref="gridTable" :data="items" tooltip-effect="dark"
							@selection-change="handleSelectionChange" :row-key="(row) => row.id">
							<!-- <el-table-column type="selection" width="55" :reserve-selection="true">
							</el-table-column> -->
							<el-table-column label="Create Date" width="200">
								<template slot-scope="scope">
									<span>{{moment.unix(scope.row.timeCreated).format("YYYY-MM-DD HH:mm:ss")}}</span>
								</template>
							</el-table-column>
							<el-table-column label="Payment code" width="200">
								<template slot-scope="scope">
									<span>{{scope.row.sysCode || '---'}}</span>
								</template>
							</el-table-column>
							<el-table-column label="Third Party Number" min-width="350">
								<template slot-scope="scope">
									<span v-if="scope.row.code=='96'||scope.row.code=='97'||scope.row.code=='98'||scope.row.code=='99'">---</span>
									<span v-else>{{scope.row.code || '---'}}</span>
								</template>
							</el-table-column>
							<el-table-column label="Trade type" width="150">
								<template slot-scope="scope">
									<span>{{filterText('tradeType',scope.row.type)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="Trade amount($)" width="150">
								<template slot-scope="scope">
									<span v-if="scope.row.status == 3" class="tx-danger">-
										{{scope.row.totalAmount}}</span>
									<span v-else>{{scope.row.totalAmount}}</span>
								</template>
							</el-table-column>
							<el-table-column label="Trade status" width="150">
								<template slot-scope="scope">
									<span>{{filterText('tradeStatus',scope.row.status)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="Payment type" width="150">
								<template slot-scope="scope">
									<span>{{filterText('platformType',scope.row.platformType)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="Remark">
								<template slot-scope="scope">
									<span>{{scope.row.remark || '---'}}</span>
								</template>
							</el-table-column>
							<el-table-column label="Operate" width="120" fixed="right">
								<template slot-scope="scope">
									<div>
										<!-- <el-link class="mg-r-20" type="primary" @click="viewDetailFn('row',scope.row)">
											View detail
										</el-link> -->
										<el-link :disabled="scope.row.type != '1'" class="mg-r-20" type="primary" @click="openExportDetail(scope.row)">
											View detail
										</el-link>
									</div>
								</template>
							</el-table-column>
						</el-table>

					</el-card>
				</el-col>
			</el-row>
			<el-row v-if="items.length" :gutter="20">
				<el-col :span="24" class="d-flex justify-content-center">
					<div>
						<el-pagination :current-page="page" :background="true"
							layout="sizes, total, prev, pager, next, jumper" :page-sizes="pageSizes"
							:page-size="rowsPerPage" :total="Number(total)" @current-change="toPage"
							@size-change="changePageSize">
						</el-pagination>
					</div>
				</el-col>
			</el-row>
			</el-tab-pane>
    <el-tab-pane label="abnormal bill" name="1">
			<el-row :gutter="15" class="mg-b-20">
				<el-col :span="24">
					<el-card>
						<el-row :gutter="20">
							<el-col :span="24">
								<div ref="pageFilter" class="page-filter">
									<el-form :inline="true" size="mini">
										<el-form-item label="Create Date">
											<el-date-picker value-format="yyyy-MM-dd" v-model="filterParams.date"
												@clear="clearFilter('date')" @change="dateChange" type="daterange"
												align="right" unlink-panels start-placeholder="Start"
												end-placeholder="End">
											</el-date-picker>
										</el-form-item>
										<el-form-item>
											<el-radio-group v-model="dateFilter" size="mini" @change="filterDate">
												<el-radio-button label="1">Today</el-radio-button>
												<el-radio-button label="2">Yestoday
												</el-radio-button>
												<el-radio-button label="3">Last 7 days
												</el-radio-button>
												<el-radio-button label="4">Last 30 days
												</el-radio-button>
											</el-radio-group>
										</el-form-item>
										<el-form-item>
											<el-input placeholder="Payment code" v-model="filterParams.paymentCode"
												clearable @keyup.enter.native="filterItem"
												@clear="clearFilter('paymentCode')"></el-input>
										</el-form-item>
										<el-form-item>
											<el-input placeholder="Third Party Number" v-model="filterParams.code"
												clearable @keyup.enter.native="filterItem" @clear="clearFilter('code')">
											</el-input>
										</el-form-item>
										<el-form-item label="Trade type: ">
											<el-select filterable remote placeholder="all" clearable
												v-model="filterParams.tradeType" @change="filterItem"
												@clear="clearFilter('tradeType')">
												<el-option v-for="opt in tradeTypeArr" :key="opt.id" :label="opt.name"
													:value="opt.id"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="Trade status: ">
											<el-select filterable remote placeholder="all" clearable
												v-model="filterParams.tradeStatus" @change="filterItem"
												@clear="clearFilter('tradeStatus')">
												<el-option v-for="opt in tradeStatusArr" :key="opt.id" :label="opt.name"
													:value="opt.id"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="Account payee: ">
											<el-select filterable remote placeholder="all" clearable
												v-model="filterParams.accountPayee" @change="filterItem"
												@clear="clearFilter('accountPayee')">
												<el-option v-for="opt in accountPayeeArr" :key="opt.id"
													:label="opt.name" :value="opt.id"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item>
											<el-input placeholder="Order number" v-model="filterParams.shopifyOrder"
												clearable @keyup.enter.native="filterItem"
												@clear="clearFilter('shopifyOrder')"></el-input>
										</el-form-item>
										<el-form-item>
											<el-button type="primary" @click="filterItem">Filter</el-button>
											<el-button type="danger" @click="clearFilter">Clear</el-button>
										</el-form-item>
									</el-form>
								</div>
							</el-col>
						</el-row>
						<el-table stripe style="width: 100%" ref="gridTable" :data="items" tooltip-effect="dark"
							@selection-change="handleSelectionChange" :row-key="(row) => row.id">
							<!-- <el-table-column type="selection" width="55" :reserve-selection="true">
							</el-table-column> -->
							<el-table-column label="Create Date" width="200">
								<template slot-scope="scope">
									<span>{{moment.unix(scope.row.timeCreated).format("YYYY-MM-DD HH:mm:ss")}}</span>
								</template>
							</el-table-column>
							<el-table-column label="Payment code" width="200">
								<template slot-scope="scope">
									<span>{{scope.row.sysCode || '---'}}</span>
								</template>
							</el-table-column>
							<el-table-column label="Third Party Number" min-width="350">
								<template slot-scope="scope">
									<span v-if="scope.row.code=='96'||scope.row.code=='97'||scope.row.code=='98'||scope.row.code=='99'">---</span>
									<span v-else>{{scope.row.code || '---'}}</span>
								</template>
							</el-table-column>
							<el-table-column label="Trade type" width="150">
								<template slot-scope="scope">
									<span>{{filterText('tradeType',scope.row.type)}}</span>
								</template>
							</el-table-column>
							<el-table-column label=" Amount paid/Credit payment" width="150">
								<template slot-scope="scope">
									<span class="tx-danger">
										{{ Number(scope.row.bonusAmount).toFixed(2) }}</span> <br/>
									<span >{{ Number(scope.row.creditAmount).toFixed(2)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="Trade status" width="150">
								<template slot-scope="scope">
									<span>{{filterText('tradeStatus',scope.row.status)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="Payment type" width="150">
								<template slot-scope="scope">
									<span>{{filterText('platformType',scope.row.platformType)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="Remark">
								<template slot-scope="scope">
									<span>{{scope.row.remark || '---'}}</span>
								</template>
							</el-table-column>
							<el-table-column label="Operate" width="120" fixed="right">
								<template slot-scope="scope">
									<div>
										<!-- <el-link class="mg-r-20" type="primary" @click="viewDetailFn('row',scope.row)">
											View detail
										</el-link> -->
										<el-link :disabled="scope.row.type != '1'" class="mg-r-20" type="primary" @click="openExportDetail(scope.row)">
											View detail
										</el-link>
									</div>
								</template>
							</el-table-column>
						</el-table>

					</el-card>
				</el-col>
			</el-row>
			<el-row v-if="items.length" :gutter="20">
				<el-col :span="24" class="d-flex justify-content-center">
					<div>
						<el-pagination :current-page="page" :background="true"
							layout="sizes, total, prev, pager, next, jumper" :page-sizes="pageSizes"
							:page-size="rowsPerPage" :total="Number(total)" @current-change="toPage"
							@size-change="changePageSize">
						</el-pagination>
					</div>
				</el-col>
			</el-row>
		</el-tab-pane>
  </el-tabs>

		</div>
		<el-backtop class="goto-top" target=".main-scroll  .el-scrollbar__wrap" :right="20" :bottom="20">
		</el-backtop>
		<el-dialog title="Detail export records" :visible="viewDetail.isShow" width="50%" class="dialog-open-custom"
			@close="viewDetail.isShow = false">
			<el-divider></el-divider>
			<div class="dialog-body">
				<el-row class="tltle">
					<el-col :span="12">
						<div class="grid-content">
							The export of time：{{moment().format("YYYY-MM-DD HH:mm:ss")}}
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content">
							Petitioner：{{ $store.state.userInfo.name}}
						</div>
					</el-col>
				</el-row>
				<div class="item-wrap" v-for="item in viewDetail.items">
					<el-row>
						<el-col :span="12">
							<div class="grid-content">
								Create Date：{{moment.unix(item.timeCreated).format("YYYY-MM-DD HH:mm:ss")}}
							</div>
						</el-col>
						<el-col :span="12">
							<div class="grid-content">
								Payment code：{{item.sysCode}}
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<div class="grid-content">
								Trade type：{{filterText('tradeType',item.type)}}
							</div>
						</el-col>
						<el-col :span="12">
							<div class="grid-content">
								Trade amount({{$showSybmol()}})：{{$exchangeRate(item.totalAmount)}}
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<div class="grid-content">
								Third Party Number：{{item.code}}
							</div>
						</el-col>
					</el-row>
				</div>
			</div>
			<el-divider></el-divider>
			<div slot="footer" class="dialog-footer">
				<el-button @click="viewDetail.isShow = false">Cancel</el-button>
				<el-button type="primary" @click="exportDetailFn" :loading="viewDetail.exportLoading">
					Export
				</el-button>
			</div>
		</el-dialog>
		<DialogDetail :data="dialogDetailData"/>
	</div>
</template>
<script>
    import DialogDetail from '@/components/dialogDetail.vue'
	export default {
		data() {
			return {
				loading: false,
				pageSizes: [10, 20, 50, 100],
				page: this.$route.query.page ? Number(this.$route.query.page) : 1,
				rowsPerPage: localStorage.getItem("c_transactionRowsPerPage") ?
					Number(localStorage.getItem("c_transactionRowsPerPage")) : 10,
				items: [],
				total: 0,
				activeName: '2',
				totalPage: 0,
				filterParams: {
					verdorName: "",
					paymentCode: "",
					code: "",
					accountPayee: "",
					tradeStatus: "",
					tradeType: "",
					date: [],
					timeCreatedFrom: "",
					timeCreatedTo: "",
					shopifyOrder:"",
					creditStatus: '2',
				},
				filterParamsDefault: "{}",
				dateFilter: "",
				viewDetail: {
					isShow: false,
					exportLoading: false,
					items: []
				},
				tradeTypeArr: [{
					id: 1,
					name: "Payment order"
				}, {
					id: 6,
					name: "Refund order"
				}, {
					id: 7,
					name: "Wallet card"
				}, {
					id: 8,
					name: "Manual deduction"
				}],
				tradeStatusArr: [{
					id: 1,
					name: "Paying"
				}, {
					id: 2,
					name: "Account paid"
				}, {
					id: 3,
					name: "Refunded"
				}, {
					id: 9,
					name: "Cancel"
				}],
				accountPayeeArr: [{
					id: 1,
					name: "stripe"
				}, {
					id: 2,
					name: "ebanx"
				}, {
					id: 3,
					name: "PayPal"
				}, {
					id: 4,
					name: "checkout"
				}, {
					id: 6,
					name: "Bonus balance"
				}, {
					id: 7,
					name: "Credit"
				}, {
					id: 8,
					name: "balance + credit"
				}, {
					id: 10,
					name: "dLocal"
				}, {
					id: 11,
					name: "PAYONEER"
				}, {
					id: 12,
					name: "Offline payment"
				}],
				checkItems:[],
				dialogDetailData: {
					isShow: false,
					loading: false,
					ids: [],
					items: [],
				},
				defaultDialogDetailData: '{}',
			};
		},
		components: {DialogDetail},
		watch: {
			$route: "gotoPage",
		},
		mounted() {
			this.defaultDialogDetailData = JSON.stringify(this.dialogDetailData)
			this.filterParamsDefault = JSON.stringify(this.filterParams);
			this.getItem();
		},
		methods: {
			openExportDetail(item){
				this.loading = true;
				this.$apiCall('api.AccountPayment.getInvoiceShopifyInfo', {id: item.id}, r => {
					this.loading = false;
					if (r.ErrorCode == "9999") {
						this.dialogDetailData = JSON.parse(this.defaultDialogDetailData)
						this.dialogDetailData.ids = [item.id]
						this.dialogDetailData.items = Object.keys(r.Data.Results).map(k => r.Data.Results[k]) ;
						this.dialogDetailData.isShow = true;
					}else{
						this.$elementMessage(r.Message, 'error');
					}
				})

				
			},
			setOrder(item){
								this.$apiCall('api.AccountPayment.changeCreditStatus', {id: item.id}, r => {
					this.loading = false;
					if (r.ErrorCode == "9999") {
						this.$elementMessage(r.Message, 'success');
						this.getItem();
					}else{
						this.$elementMessage(r.Message, 'error');
					}
				})
			},
			exportDetailFn() {
				let ids = [];
				if (!this.viewDetail.items.length) return;
				this.viewDetail.items.forEach(item => {
					ids.push(item.id)
				})
				this.viewDetail.exportLoading = true;
				if ($("#ifilePro").length == 0) {
					$("body").append(
						'<iframe id="ifilePro" style="display:none"></iframe>'
					);
				}
				let openDownload = url => {
					document.getElementById("ifilePro").src = url;
				};
				let apiUrl = "api.AccountPayment.exportPayment";
				this.$apiCall(apiUrl, {
					ids: ids
				}, r => {
					this.viewDetail.exportLoading = false;
					if (r.ErrorCode == "9999") {
						this.$elementMessage('Export success', 'success');
						openDownload(r.Data.Results.file);
					} else {
						this.$elementMessage(r.Message, 'error');
						if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
							this.$userFailure(this);
						}
					}
				});
			},
			handleClick(tab, event){
				this.filterParams= {
					verdorName: "",
					paymentCode: "",
					code: "",
					accountPayee: "",
					tradeStatus: "",
					tradeType: "",
					date: [],
					timeCreatedFrom: "",
					timeCreatedTo: "",
					shopifyOrder:"",
					creditStatus:  tab.name,
				}
				this.$refs.gridTable.clearSelection();	
				this.getItem();
			},
			// val表示选中的表格行数据
			handleSelectionChange(val) {
				this.viewDetail.items = [];
				this.checkItems = [];
				if (!val.length) return;
				this.viewDetail.items = val;
				this.checkItems = val;
			},
			viewDetailFn(type, item) {
				this.viewDetail.isShow = true;
				if (type == 'row') {
					this.viewDetail.items = [];
					this.viewDetail.items.push(item);
				}
			},
			filterText(type, id) {
				let obj;
				switch (type) {
					case 'tradeType':
						this.tradeTypeArr.forEach(item => {
							if (item.id == id) obj = item;
						})
						break;
					case 'tradeStatus':
						this.tradeStatusArr.forEach(item => {
							if (item.id == id) obj = item;
						})
						break;
					case 'platformType':
						this.accountPayeeArr.forEach(item => {
							if (item.id == id) obj = item;
						})
						break;
					default:
						break;
				}
				return obj ? obj.name : "---"
			},
			toPage(val) {
				if (val != this.$route.query.page)
					this.$router.push({
						query: {
							page: val
						}
					});
			},
			changePageSize(val) {
				this.rowsPerPage = val;
				localStorage.setItem("c_transactionRowsPerPage", val);
				this.getItem();
			},
			gotoPage() {
				this.page = this.$route.query.page ? Number(this.$route.query.page) : 1;
				this.getItem();
			},
			filterDate() {
				let type = Number(this.dateFilter),
					today = moment().format('YYYY-MM-DD'),
					yewtoday = moment().add(-1, 'days').format('YYYY-MM-DD'),
					last7 = moment().add(-6, 'days').format('YYYY-MM-DD'),
					last30 = moment().add(-29, 'days').format('YYYY-MM-DD');
				this.filterParams.timeCreatedTo = today;
				switch (type) {
					case 1:
						this.filterParams.timeCreatedFrom = today;
						break;
					case 2:
						this.filterParams.timeCreatedFrom = yewtoday;
						this.filterParams.timeCreatedTo = yewtoday;
						break;
					case 3:
						this.filterParams.timeCreatedFrom = last7;
						break;
					case 4:
						this.filterParams.timeCreatedFrom = last30;
						break;
					default:
						break;
				}
				this.filterItem();
			},
			dateChange() {
				if (this.filterParams.date.length > 1) {
					this.filterParams.timeCreatedFrom = moment(
						this.filterParams.date[0]
					).format("YYYY-MM-DD");
					this.filterParams.timeCreatedTo = moment(
						this.filterParams.date[1]
					).format("YYYY-MM-DD");
					this.filterItem();
				}
			},
			clearFilter(type) {
				switch (type) {
					case "shopifyOrder":
						this.filterParams.shopifyOrder = "";
						break;
					case "paymentCode":
						this.filterParams.paymentCode = "";
						break;
					case "code":
						this.filterParams.code = "";
						break;
					case "verdorName":
						this.filterParams.verdorName = "";
						break;
					case "tradeType":
						this.filterParams.tradeType = "";
						break;
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
						this.dateFilter = "";
						this.filterParams = JSON.parse(this.filterParamsDefault);
						break;
				}
				this.filterItem();
			},
			filterItem(type) {
				this.$refs.gridTable.clearSelection();
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
			getItem(s) {
				this.loading = true;
				this.$apiCall(
					"api.AccountPayment.findByCustomer", {
						page: this.page,
						rowsPerPage: this.rowsPerPage,
						timeCreatedFrom: this.filterParams.timeCreatedFrom,
						timeCreatedTo: this.filterParams.timeCreatedTo,
						sysCode: this.filterParams.paymentCode,
						code: this.filterParams.code,
						platformType: this.filterParams.accountPayee,
						paymentType: this.filterParams.tradeType,
						status: this.filterParams.tradeStatus,
						shopifyOrder: this.filterParams.shopifyOrder,
						creditStatus:this.activeName
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

<style lang="scss" >
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
<style lang="scss" scoped>
	.dialog-open-custom ::v-deep .el-table .el-table__row{
		.el-table__cell:nth-child(6), 
		.el-table__cell:nth-child(7), 
		.el-table__cell:nth-child(8), 
		.el-table__cell:nth-child(9){
			padding: 0;
			.cell{
				padding: 0;
			}
		}	
	}
	.cell-item{
		border-top: 1px solid #EBEEF5;
		padding:  5px 10px;
	}
	.cell-item:first-child{
		border-top: none;
	}
	.el-table--enable-row-hover .el-table__body tr:hover>td {
		.cell-item{
			border-top: 1px solid rgb(217, 220, 239) !important;
		}
		.cell-item:first-child{
		border-top: none !important;
	}
	}
	
</style>
