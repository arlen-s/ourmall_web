<template>
	<div class="contentpanel transaction-page">
		<div class="pagetitle" ref="pageHeader">
			<div class="left">
				<div class="title">
					<i class="el-icon-s-finance"></i>
					<h2>{{ $t("transaction.title") }}</h2>
				</div>
			</div>
			<div class="right">
				<!-- <el-button type="primary" size="medium" @click="viewDetailFn" :disabled="!checkItems.length ||!$isRole($route.meta.roleWrite)">{{$t("transaction.export")}}</el-button> -->
			</div>
		</div>
		<div class="pagebody" v-loading="loading">
		<el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane :label="$t('transaction.正常账单')"  name="2">		
			<el-row :gutter="15" class="mg-b-20">
				<el-col :span="24">
					<el-card>
						<el-row :gutter="20">
							<el-col :span="24">
								<div ref="pageFilter" class="page-filter">
									<el-form :inline="true" size="mini">
										<el-form-item :label="$t('transaction.CreateDate')">
											<el-date-picker value-format="yyyy-MM-dd" v-model="filterParams.date"
												@clear="clearFilter('date')" @change="dateChange" type="daterange"
												align="right" unlink-panels :range-separator="$t('myinvoice.to')"
												:start-placeholder="$t('myinvoice.startDate')"
												:end-placeholder="$t('myinvoice.endDate')">
											</el-date-picker>
										</el-form-item>
										<el-form-item>
											<el-radio-group v-model="dateFilter" size="mini" @change="filterDate">
												<el-radio-button label="1">{{$t('transaction.today')}}</el-radio-button>
												<el-radio-button label="2">{{$t('transaction.yestoday')}}
												</el-radio-button>
												<el-radio-button label="3">{{$t('transaction.last7Days')}}
												</el-radio-button>
												<el-radio-button label="4">{{$t('transaction.last30Days')}}
												</el-radio-button>
											</el-radio-group>
										</el-form-item>
										<el-form-item>
											<el-input :placeholder="$t('transaction.paymentCode')"
												v-model="filterParams.paymentCode" clearable
												@keyup.enter.native="filterItem" @clear="clearFilter('paymentCode')">
											</el-input>
										</el-form-item>
										<el-form-item>
											<el-input :placeholder="$t('transaction.third')" v-model="filterParams.code"
												clearable @keyup.enter.native="filterItem" @clear="clearFilter('code')">
											</el-input>
										</el-form-item>
										<el-form-item>
											<el-input :placeholder="$t('transaction.verdorName')"
												v-model="filterParams.verdorName" clearable
												@keyup.enter.native="filterItem" @clear="clearFilter('verdorName')">
											</el-input>
										</el-form-item>
										<el-form-item :label="$t('transaction.tradeType')">
											<el-select filterable remote :placeholder="$t('transaction.all')" clearable
												v-model="filterParams.tradeType" @change="filterItem"
												@clear="clearFilter('tradeType')">
												<el-option v-for="opt in tradeTypeArr" :key="opt.id" :label="opt.name"
													:value="opt.id"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item :label="$t('transaction.tradeStatus')">
											<el-select filterable remote :placeholder="$t('transaction.all')" clearable
												v-model="filterParams.tradeStatus" @change="filterItem"
												@clear="clearFilter('tradeStatus')">
												<el-option v-for="opt in tradeStatusArr" :key="opt.id" :label="opt.name"
													:value="opt.id"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item :label="$t('transaction.accountPayee')">
											<el-select filterable remote :placeholder="$t('transaction.all')" clearable
												v-model="filterParams.accountPayee" @change="filterItem"
												@clear="clearFilter('accountPayee')">
												<el-option v-for="opt in accountPayeeArr" :key="opt.id"
													:label="opt.name" :value="opt.id"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item>
											<el-input :placeholder="$t('discount.订单编号')"
												v-model="filterParams.shopifyOrder" clearable
												@keyup.enter.native="filterItem" @clear="clearFilter('shopifyOrder')">
											</el-input>
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
							<!-- @selection-change="handleSelectionChange" -->
							<!-- <el-table-column type="selection" width="55" :reserve-selection="true">
							</el-table-column> -->
							<el-table-column :label="$t('transaction.CreateDate')">
								<template slot-scope="scope">
									<span>{{$moment.unix(scope.row.timeCreated).format("YYYY-MM-DD HH:mm:ss")}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('transaction.paymentCode')">
								<template slot-scope="scope">
									<span>{{scope.row.sysCode || '---'}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('transaction.third')">
								<template slot-scope="scope">
									<span v-if="scope.row.code=='96'||scope.row.code=='97'||scope.row.code=='98'||scope.row.code=='99'">---</span>
									<span v-else>{{scope.row.code || '---'}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('transaction.verdorName')">
								<template slot-scope="scope">
									<span>{{scope.row.customerName || '---'}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('transaction.tradeType')">
								<template slot-scope="scope">
									<span>{{filterText('tradeType',scope.row.type)}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('transaction.tradeAmount')">
								<template slot-scope="scope">
									<span v-if="scope.row.status == 3" class="tx-danger">-
										{{scope.row.totalAmount}}</span>
									<span v-else>{{scope.row.totalAmount}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('transaction.tradeStatus')">
								<template slot-scope="scope">
									<span>{{filterText('tradeStatus',scope.row.status)}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('transaction.paymentType')">
								<template slot-scope="scope">
									<span>{{filterText('platformType',scope.row.platformType)}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('quotation.备注')">
								<template slot-scope="scope">
									<span>{{scope.row.remark || '---'}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('transaction.operate')" width="120">
								<template slot-scope="scope">
									<div>
										<!-- <el-link :disabled="!$isRole($route.meta.roleWrite)" class="mg-r-20" type="primary" @click="viewDetailFn('row',scope.row)">
											{{ $t("transaction.detailView") }}
										</el-link> -->
										<el-link  :disabled="!$isRole($route.meta.roleWrite) || scope.row.type != '1'" class="mg-r-20" type="primary" @click="openExportDetail(scope.row)">
											{{ $t("transaction.detailView") }}
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
						<el-pagination :current-page="Number(page)" :background="true"
							layout="sizes, total, prev, pager, next, jumper" :page-sizes="pageSizes"
							:page-size="rowsPerPage" :total="Number(total)" @current-change="toPage"
							@size-change="changePageSize">
						</el-pagination>
					</div>
				</el-col>
			</el-row>
						</el-tab-pane>
    <el-tab-pane :label="$t('transaction.异常账单')" name="1">
				<el-row :gutter="15" class="mg-b-20">
				<el-col :span="24">
					<el-card>
						<el-row :gutter="20">
							<el-col :span="24">
								<div ref="pageFilter" class="page-filter">
									<el-form :inline="true" size="mini">
										<!-- <el-form-item :label="$t('transaction.CreateDate')">
											<el-date-picker value-format="yyyy-MM-dd" v-model="filterParams.date"
												@clear="clearFilter('date')" @change="dateChange" type="daterange"
												align="right" unlink-panels :range-separator="$t('myinvoice.to')"
												:start-placeholder="$t('myinvoice.startDate')"
												:end-placeholder="$t('myinvoice.endDate')">
											</el-date-picker>
										</el-form-item> -->
										<el-form-item>
											<el-radio-group v-model="dateFilter" size="mini" @change="filterDate">
												<el-radio-button label="1">{{$t('transaction.today')}}</el-radio-button>
												<el-radio-button label="2">{{$t('transaction.yestoday')}}
												</el-radio-button>
												<el-radio-button label="3">{{$t('transaction.last7Days')}}
												</el-radio-button>
												<el-radio-button label="4">{{$t('transaction.last30Days')}}
												</el-radio-button>
											</el-radio-group>
										</el-form-item>
										<el-form-item>
											<el-input :placeholder="$t('transaction.paymentCode')"
												v-model="filterParams.paymentCode" clearable
												@keyup.enter.native="filterItem" @clear="clearFilter('paymentCode')">
											</el-input>
										</el-form-item>
										<el-form-item>
											<el-input :placeholder="$t('transaction.third')" v-model="filterParams.code"
												clearable @keyup.enter.native="filterItem" @clear="clearFilter('code')">
											</el-input>
										</el-form-item>
										<el-form-item>
											<el-input :placeholder="$t('transaction.verdorName')"
												v-model="filterParams.verdorName" clearable
												@keyup.enter.native="filterItem" @clear="clearFilter('verdorName')">
											</el-input>
										</el-form-item>
										<el-form-item :label="$t('transaction.tradeType')">
											<el-select filterable remote :placeholder="$t('transaction.all')" clearable
												v-model="filterParams.tradeType" @change="filterItem"
												@clear="clearFilter('tradeType')">
												<el-option v-for="opt in tradeTypeArr" :key="opt.id" :label="opt.name"
													:value="opt.id"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item :label="$t('transaction.tradeStatus')">
											<el-select filterable remote :placeholder="$t('transaction.all')" clearable
												v-model="filterParams.tradeStatus" @change="filterItem"
												@clear="clearFilter('tradeStatus')">
												<el-option v-for="opt in tradeStatusArr" :key="opt.id" :label="opt.name"
													:value="opt.id"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item :label="$t('transaction.accountPayee')">
											<el-select filterable remote :placeholder="$t('transaction.all')" clearable
												v-model="filterParams.accountPayee" @change="filterItem"
												@clear="clearFilter('accountPayee')">
												<el-option v-for="opt in accountPayeeArr" :key="opt.id"
													:label="opt.name" :value="opt.id"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item>
											<el-input :placeholder="$t('discount.订单编号')"
												v-model="filterParams.shopifyOrder" clearable
												@keyup.enter.native="filterItem" @clear="clearFilter('shopifyOrder')">
											</el-input>
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
							<!-- @selection-change="handleSelectionChange" -->
							<!-- <el-table-column type="selection" width="55" :reserve-selection="true">
							</el-table-column> -->
							<el-table-column :label="$t('transaction.CreateDate')">
								<template slot-scope="scope">
									<span>{{$moment.unix(scope.row.timeCreated).format("YYYY-MM-DD HH:mm:ss")}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('transaction.paymentCode')">
								<template slot-scope="scope">
									<span>{{scope.row.sysCode || '---'}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('transaction.third')">
								<template slot-scope="scope">
									<span v-if="scope.row.code=='96'||scope.row.code=='97'||scope.row.code=='98'||scope.row.code=='99'">---</span>
									<span v-else>{{scope.row.code || '---'}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('transaction.verdorName')">
								<template slot-scope="scope">
									<span>{{scope.row.customerName || '---'}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('transaction.tradeType')">
								<template slot-scope="scope">
									<span>{{filterText('tradeType',scope.row.type)}}</span>
								</template>
							</el-table-column>
							<!-- <el-table-column :label="$t('transaction.tradeAmount')">
								<template slot-scope="scope">
									<span v-if="scope.row.status == 3" class="tx-danger">-
										{{scope.row.totalAmount}}</span>
									<span v-else>{{scope.row.totalAmount}}</span>
								</template>
							</el-table-column> -->
							<el-table-column :label=" $t('transaction.交易')" width="150">
								<template slot-scope="scope">
									<span class="tx-danger">
										{{scope.row.bonusAmount}}</span> <br/>
									<span >{{scope.row.creditAmount}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('transaction.tradeStatus')">
								<template slot-scope="scope">
									<span>{{filterText('tradeStatus',scope.row.status)}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('transaction.paymentType')">
								<template slot-scope="scope">
									<span>{{filterText('platformType',scope.row.platformType)}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('quotation.备注')">
								<template slot-scope="scope">
									<span>{{scope.row.remark || '---'}}</span>
								</template>
							</el-table-column>
							<el-table-column :label="$t('transaction.operate')" width="120">
								<template slot-scope="scope">
									<div>
										<!-- <el-link :disabled="!$isRole($route.meta.roleWrite)" class="mg-r-20" type="primary" @click="viewDetailFn('row',scope.row)">
											{{ $t("transaction.detailView") }}
										</el-link> -->
										<el-link  :disabled="!$isRole($route.meta.roleWrite) || scope.row.type != '1'" class="mg-r-20" type="primary" @click="openExportDetail(scope.row)">
											{{ $t("transaction.detailView") }}
										</el-link> <br/>
										<el-link type="primary" @click="setOrder(scope.row)" >处理</el-link>
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
						<el-pagination :current-page="Number(page)" :background="true"
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
		<el-dialog :title="$t('transaction.exportTitle')" :visible="viewDetail.isShow" width="50%"
			class="dialog-open-custom" @close="viewDetail.isShow = false">
			<el-divider></el-divider>
			<div class="dialog-body">
				<el-row class="tltle">
					<el-col :span="12">
						<div class="grid-content">
							{{$t('transaction.exportTime')}}：{{$moment().format("YYYY-MM-DD HH:mm:ss")}}
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content">
							{{$t('transaction.Petitioner')}}：{{ $store.state.userInfo.name}}
						</div>
					</el-col>
				</el-row>
				<div class="item-wrap" v-for="item in viewDetail.items">
					<el-row>
						<el-col :span="12">
							<div class="grid-content">
								{{$t('transaction.CreateDate')}}：{{$moment.unix(item.timeCreated).format("YYYY-MM-DD HH:mm:ss")}}
							</div>
						</el-col>
						<el-col :span="12">
							<div class="grid-content">
								{{$t('transaction.paymentCode')}}：{{item.sysCode}}
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<div class="grid-content">
								{{$t('transaction.tradeType')}}：{{filterText('tradeType',item.type)}}
							</div>
						</el-col>
						<el-col :span="12">
							<div class="grid-content">
								{{$t('transaction.tradeAmount')}}：{{item.totalAmount}}
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<div class="grid-content">
								{{$t('transaction.third')}}：{{item.code}}
							</div>
						</el-col>
					</el-row>
				</div>
			</div>
			<el-divider></el-divider>
			<div slot="footer" class="dialog-footer">
				<el-button @click="viewDetail.isShow = false">{{$t('transaction.cancel')}}</el-button>
				<el-button :disabled="!$isRole($route.meta.roleWrite)" type="primary" @click="exportDetailFn" :loading="viewDetail.exportLoading">
					{{$t('transaction.export')}}
				</el-button>
			</div>
		</el-dialog>
		<DialogDetail :data="dialogDetailData"/>
	</div>
</template>

<script>
	import DialogDetail from '@/views/transaction/dialogDetail'
	export default {
		data() {
			return {
				loading: false,
				pageSizes: [10, 20, 50, 100],
				page: this.$route.query.page ? Number(this.$route.query.page) : 1,
				rowsPerPage: localStorage.getItem("transactionRowsPerPage") ?
					Number(localStorage.getItem("transactionRowsPerPage")) : 10,
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
					name: this.$t('transaction.type1')
				}, {
					id: 6,
					name: this.$t('transaction.type6')
				}, {
					id: 7,
					name: this.$t('transaction.type7')
				}, {
					id: 8,
					name: this.$t('transaction.type8')
				}],
				tradeStatusArr: [{
					id: 1,
					name: this.$t('transaction.status1')
				}, {
					id: 2,
					name: this.$t('transaction.status2')
				}, {
					id: 3,
					name: this.$t('transaction.status3')
				}, {
					id: 9,
					name: this.$t('transaction.status9')
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
					name: this.$t('transaction.payment6')
				}, {
					id: 10,
					name: "dLocal"
				}, {
					id: 11,
					name: "PAYONEER"
				}, {
					id: 12,
					name: this.$t('transaction.payment12')
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
		components: {
			DialogDetail,
		},
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
			//切换tabs
			handleClick(tab, event){
						console.log(this.activeName, 'this.activeName'); 
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
			exportDetailFn() {
				let ids = [];
				if(!this.viewDetail.items.length) return;
				this.viewDetail.items.forEach(item=>{
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
					ids: ids,
					isNew: 1,
				}, r => {
					this.viewDetail.exportLoading = false;
					if (r.ErrorCode == "9999") {
						this.$elementMessage(this.$t('myinvoice.exportSuccess'), 'success');
						openDownload(r.Data.Results.file);
					} else {
						this.$elementMessage(r.Message, 'error');
						if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
							this.$userFailure(this);
						}
					}
				});
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
				localStorage.setItem("transactionRowsPerPage", val);
				this.getItem();
			},
			gotoPage() {
				this.page = this.$route.query.page ? this.$route.query.page : 1;
				this.getItem();
			},
			filterDate() {
				let type = Number(this.dateFilter),
					today = this.$moment().format('YYYY-MM-DD'),
					yewtoday = this.$moment().add(-1, 'days').format('YYYY-MM-DD'),
					last7 = this.$moment().add(-6, 'days').format('YYYY-MM-DD'),
					last30 = this.$moment().add(-29, 'days').format('YYYY-MM-DD');
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
					case "paymentCode":
						this.filterParams.paymentCode = "";
						break;
					case "code":
						this.filterParams.code = "";
						break;
					case "verdorName":
						this.filterParams.verdorName = "";
						break;
					case "shopifyOrder":
						this.filterParams.shopifyOrder = "";
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
					"api.AccountPayment.findByVendor", {
						page: this.page,
						rowsPerPage: this.rowsPerPage,
						timeCreatedFrom: this.filterParams.timeCreatedFrom,
						timeCreatedTo: this.filterParams.timeCreatedTo,
						sysCode: this.filterParams.paymentCode,
						code: this.filterParams.code,
						nameLike: this.filterParams.verdorName,
						shopifyOrder: this.filterParams.shopifyOrder,
						platformType: this.filterParams.accountPayee,
						paymentType: this.filterParams.tradeType,
						status: this.filterParams.tradeStatus,
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
