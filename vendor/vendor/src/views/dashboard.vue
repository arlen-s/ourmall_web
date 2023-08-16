<template>
	<div class="contentpanel dashboard-page">
		<div class="pagetitle">
			<div class="left">
				<div class="title">
					<i class="el-icon-s-home"></i>
					<h2>{{$t('dashboard.dashboard')}}</h2>
				</div>
			</div>
			<div class="right"></div>
		</div>
		<div style="display: none;" class="pagebody">
			<el-row :gutter="15" class="mg-b-30">
				<el-col :span="14">
					<el-card>
						<el-row :gutter="10">
							<el-col :span="12" class=" d-flex align-items-center mg-b-30 top-box-wrap">
								<div class=" top-box">
									<div class="left">
										<div class=" title">{{$t('dashboard.customerAdded')}}</div>
										<div class=" t-link">
											<el-link class=" mg-r-10" type="primary" href="#/my-custom">
												{{$store.state.cnt.customerCnt}}</el-link> {{$t('dashboard.pcs')}}
										</div>
									</div>
									<i class="el-icon-s-custom"></i>
								</div>
							</el-col>
							<el-col :span="12" class=" d-flex align-items-center mg-b-30 top-box-wrap">
								<div class=" top-box">
									<div class="left">
										<div class=" title">{{$t('dashboard.authorizedShopifyCustomers')}}</div>
										<div class=" t-link">
											<el-link class=" mg-r-10" type="primary" href="#/my-custom?isAuth=true">
												{{$store.state.cnt.customerAuthCnt}}</el-link>
											{{$t('dashboard.pcs')}}
										</div>
									</div>
									<i class="el-icon-s-goods"></i>
								</div>
							</el-col>
							<el-col :span="12" class=" d-flex align-items-center top-box-wrap">
								<div class=" top-box">
									<div class="left">
										<div class=" title">{{$t('dashboard.validInvoice')}}</div>
										<div class=" t-link">
											<el-link class=" mg-r-10" type="primary" href="#/my-invoice">
												{{$store.state.cnt.invoiceCnt}}
											</el-link>
											{{$t('dashboard.pcs')}}
										</div>
									</div>
									<i class="el-icon-s-order"></i>
								</div>
							</el-col>
						</el-row>
					</el-card>
				</el-col>

				<el-col :offset="1" :span="7">
					<el-card class="add-box">
						<a class=" d-flex" href="javascript:;" @click="openAddVendor">
							<i class="el-icon-plus"></i>
							<span>{{$t('dashboard.addNumCustomer',{num: Number($store.state.cnt.customerCnt) + 1})}}</span>
						</a>
					</el-card>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="22">
					<div v-if="lastVendor.length" class="last-customer">
						<div class="header">
							{{$t('dashboard.recentCooperation')}}
							<el-link type="primary" href="#/my-custom">{{$t('dashboard.more')}}</el-link>
						</div>
						<el-row :gutter="20">
							<el-col :xl="6" :lg="12" :md="12" v-for="(vendor, index) in lastVendor" :key="vendor.id">
								<el-card class="c-box">
									<div class=" c-box-content">
										<div class=" left tx-ellipsis1" :title="vendor.customerName">
											<i class="avatar-title"
												:style="{backgroundColor: aBg[index]}">{{vendor.customerName.substr(0,1)}}</i>
											<div class="name tx-ellipsis1" style=" max-width: 100px;">
												{{vendor.customerName}}</div>
										</div>
										<div class="right">
											<div class=" mg-b-10 d-flex align-items-center v-content">
												<span class=" v-content-title">{{$t('dashboard.validInvoice2')}}</span>
												<el-link class=" v-content-val" type="primary"
													@click="gotoInvoice(vendor)">{{vendor.invoiceCnt}}</el-link>
											</div>
											<div class=" mg-b-20 d-flex align-items-center v-content">
												<span
													class=" v-content-title">{{$t('dashboard.authorizedShopifyStores')}}</span>
												<span class=" v-content-val">{{vendor.customerAuthCnt}}</span>
											</div>
											<div class=" tx-right">
												<el-link type="primary" @click="gotoCustom(vendor)">
													{{$t('mycustomer.Invitecustomers2')}}
												</el-link>
											</div>
										</div>
									</div>
								</el-card>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
		</div>

		<div style="display: block;" class="pagebodytwo">
			<el-row :gutter="20" class="mg-b-30 user-status-list">
				<el-col :span="8">
						<el-card class="box-card bg-box" :body-style="{height:'290px' }">
								<div>
									<el-image
										style="width: 70px; height: 70px;border-radius:50%"
										:src="this.$store.state.userInfo.logo"
    								  fit="fit">
											<div slot="error" class="image-slot" style="background:#f6e9e9;">
															<i class="el-icon-picture-outline"></i>
											</div>											
									</el-image>
								</div>
								<div style="color:#fff; padding-top:10px">  <b> 嗨，{{this.$store.state.userInfo.username}}</b></div>
								<div>
									<p  style="color:#fff; padding-top:10px">用户编号:{{this.$store.state.userInfo.id}}</p>
								</div>
						</el-card>
				</el-col>
				<el-col :span="16">
					<el-card class="box-card" :body-style="{ padding: '0px 0px 20px 0px', height:'232px' }">
                <div slot="header" class="clearfix">
                      <span>{{$t('dashboard.system notification')}}</span>
                    </div>
                    <div v-for="o in advData.slice(0,5)" :key="o.id" class="text item fit-box">
                      <p class="text-style" @click="lookLog(o.id)" >
                         <el-link type="primary"> <i class="round"></i> {{o.title}}</el-link>
                         <span>{{o.createdAt}}</span>
                        </p>
                    </div>
              </el-card>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="mg-b-30 user-status-list">
				<el-col :span="8" :xs="24" :sm="12" :md="8" :lg="8" type="flex">
					<div @click="gotoPage(1)" class="user-status-item">
						<div class="status-icon">
							<i class="iconfont icon-daiwanshankaoshi"></i>
						</div>
						<div class="status-content">
							<div style="color: #e6a23c;" class="status-num">{{vendorAllOrderCntText(2) || '0'}}</div>
							<div class="status-description">{{$t('dashboard.待报价订单')}}</div>
						</div>
					</div>
				</el-col>

				<el-col :span="8" :xs="24" :sm="12" :md="8" :lg="8" type="flex">
					<div @click="gotoPage(2)" class="user-status-item">
						<div class="status-icon">
							<i class="el-icon-finished"></i>
						</div>
						<div class="status-content">
							<div style="color: #e6a23c;" class="status-num">{{vendorAllOrderCntText(22) || '0'}}</div>
							<div class="status-description">{{$t('dashboard.待确认收款订单')}}</div>
						</div>
					</div>
				</el-col>
				<el-col :span="8" :xs="24" :sm="12" :md="8" :lg="8" type="flex">
					<div @click="gotoPage(3)" class="user-status-item">
						<div class="status-icon">
							<i class="el-icon-truck"></i>
						</div>
						<div class="status-content">
							<div style="color: #e6a23c;" class="status-num">{{ vendorAllOrderCntText(5) || '0'}}</div>
							<div class="status-description">{{$t('dashboard.待发货订单')}}</div>
						</div>
					</div>
				</el-col>
				<!-- <el-col :span="6" :xs="24" :sm="12" :md="6" :lg="6" type="flex">
          <div @click="gotoPage(4)" class="user-status-item">
            <div  class="status-icon">
              <i class="el-icon-refresh"></i>
            </div>
            <div class="status-content">
              <div style="color: #f56c6c;" class="status-num">{{vendorDashboardSummary.syncFailCnt || '0'}}</div>
              <div class="status-description">{{$t('dashboard.同步发货信息失败')}}</div>
            </div>
          </div>
        </el-col> -->
			</el-row>

			<div class="chart mg-b-30">
				<div class="chart-header">
					<div class="chart-title">{{$t('dashboard.销售统计')}}</div>
					<div class="chart-right">
						<el-date-picker :picker-options="pickerOptions0" value-format="yyyyMMdd" v-model="statisticDate"
							@change="dateChange" type="daterange" align="right" unlink-panels range-separator="-"
							:start-placeholder="$t('dashboard.起始')" :end-placeholder="$t('dashboard.截止')">
						</el-date-picker>
						<el-select class="mg-l-20" style="width: 200px" v-model="statisticDateRange"
							:placeholder="$t('dashboard.日期范围')" @change="dateRangeChange">
							<el-option v-for="(time,k) in dateArr" :key="time" :label="$t(time)" :value="k"></el-option>
						</el-select>
					</div>
				</div>
				<div class="chart-body" style="width:100%">
					<div v-show="isShowCart" ref="chart" id="dashboardCharts" style="width: 100%;height: 400px;"></div>
					<div v-show="!isShowCart" class=" tx-center"
						style="height: 100px; line-height: 100px; color: #909399;">{{$t("invoice.Nodata")}}</div>
				</div>
			</div>

			<el-row :gutter="20" class="mg-b-30">
				<el-col :span="16" type="flex">
					<div class="day-statistics mg-b-30">
						<div class="day-statistics-title">{{$t('dashboard.每日统计')}}</div>
						<el-table :data="tableData" stripe style="width: 100%">
							<el-table-column prop="date" :label="$t('dashboard.日期')">
								<template #header>
									<div class="tableTiop">{{$t('dashboard.日期')}}</div>
								</template>
							</el-table-column>
							<el-table-column prop="customerCnt" :label="$t('dashboard.下单客户量')">
								<template #header>
									<div class="tableTiop">{{$t('dashboard.下单客户量')}}</div>
								</template>
							</el-table-column>
							<el-table-column prop="orderCnt" :label="$t('dashboard.订单数')">
								<template #header>
									<div class="tableTiop">{{$t('dashboard.订单数')}}</div>
								</template>
							</el-table-column>
							<el-table-column prop="amount" :label="`${$t('dashboard.销售额')}${$store.state.country.shopCurrency}${$store.state.country.symbol}`">
								<template #header>
									<div class="tableTiop">{{$t('dashboard.销售额')}}{{$store.state.country.shopCurrency}}{{$store.state.country.symbol}} </div>
								</template>
							</el-table-column>
						</el-table>
						<div class="day-statistics-footer">
							<el-button type="primary" @click="showMoreReference">{{$t('dashboard.显示更多')}}</el-button>
						</div>
					</div>
				</el-col>

				<el-col :span="8" type="flex">
					<div class="info-aggregation mg-b-30">
						<div class="info-aggregation-title">{{$t('dashboard.信息汇总')}}</div>
						<el-divider></el-divider>
						<div class="info-aggregation-list">
							<!-- <div @click="gotoPage(5)" class="item">
                <div class="icon">
                  <i class="el-icon-user-solid"></i>
                </div>
                <div class="text">
                  <div>{{ vendorDashboardSummary.customerCnt || '0' }} {{$t('dashboard.客户')}}</div>
                </div>
              </div>
              <el-divider></el-divider>

              <div @click="gotoPage(6)" class="item">
                <div class="icon">
                  <i class="iconfont icon-shopify"></i>
                </div>
                <div class="text">
                  <div>{{ vendorDashboardSummary.shopCnt || '0'}} {{$t('dashboard.客户店铺')}}</div>
                  <span class="tips">{{$t("dashboard.托管管理订单")}}</span>
                </div>
              </div>
              <el-divider></el-divider>

              <div @click="gotoPage(7)" class="item">
                <div class="icon">
                  <i class="el-icon-s-goods"></i>
                </div>
                <div class="text">
                  <div>{{ vendorDashboardSummary.offerItemCnt || '0' }} {{$t('dashboard.未合作商品')}}</div>
                  <span class="tips">{{$t("dashboard.可以进行报价")}}<span>
                </div>
              </div>
              <el-divider></el-divider> -->
							<!-- 新信息汇总 -->
							<div class="item" @click="gotoPage(8)">
								<div class="icon">
									<i class="el-icon-sell"></i>
								</div>
								<div class="text">
									<div>{{$t('dashboard.上架商品数')}}: <b>{{ vendorDashboardSummary.productCnt|| '0' }}</b>
									</div>
								</div>
							</div>
							<el-divider></el-divider>

							<div class="item" @click="gotoPage(5)">
								<div class="icon">
									<i class="el-icon-user-solid"></i>
								</div>
								<div class="text">
									<div>{{$t('dashboard.下单客户量')}}:
										<b>{{ vendorDashboardSummary.customerCnt || '0' }}</b> </div>
								</div>
							</div>
							<el-divider></el-divider>

							<div class="item" @click="gotoPage(1)">
								<div class="icon">
									<i class="el-icon-s-order"></i>
								</div>
								<div class="text">
									<div>{{$t('dashboard.订单数')}}: <b>{{ vendorDashboardSummary.orderCnt || '0' }}</b>
									</div>
								</div>
							</div>
							<el-divider></el-divider>

							<div class="item" @click="gotoPage(10)">
								<div class="icon">
									<i class="fa fa-exchange"></i>
								</div>
								<div class="text">
									<div>{{$t('dashboard.销售额')}}{{$store.state.country.shopCurrency}}{{$store.state.country.symbol}}:
										<b>{{ Number(vendorDashboardSummary.orderTotalAmount).toFixed(2) || '0' }}</b>
									</div>
								</div>
							</div>
							<el-divider></el-divider>

						</div>
					</div>
				</el-col>
			</el-row>
		</div>


		<el-dialog :loading="moreReference.loading" title="Reference" :visible.sync="moreReference.isShow"
			width="800px">
			<el-divider></el-divider>
			<div class="mg-t-20 mg-b-20 mg-l-20 mg-r-20">
				<el-table :data="moreReference.tableData" stripe style="width: 100%">
					<el-table-column prop="date" :label="$t('dashboard.日期')" width="180">
					</el-table-column>
					<el-table-column prop="customerCnt" :label="$t('dashboard.下单客户量')">
					</el-table-column>
					<el-table-column prop="orderCnt" :label="$t('dashboard.订单数')" width="180">
					</el-table-column>
					<el-table-column prop="amount" :label="`${$t('dashboard.销售额')}${$store.state.country.shopCurrency}${$store.state.country.symbol}`" width="180">
					</el-table-column>
				</el-table>
			</div>
			<el-row v-if="tableData.length" :gutter="20" class="mg-b-20">
				<el-col :span="24" class=" d-flex justify-content-center">
					<div>
						<el-pagination :current-page="moreReference.page" :background="true"
							layout="sizes, total, prev, pager, next, jumper" :page-sizes="moreReference.pageSizes"
							:page-size="moreReference.rowsPerPage" :total="Number(moreReference.total)"
							@current-change="toPage" @size-change="changePageSize">
						</el-pagination>
					</div>
				</el-col>
			</el-row>
			<el-divider></el-divider>
			<div slot="footer" class="dialog-footer d-flex justify-content-end">
				<div>
					<el-button size="small" @click="moreReference.isShow = false">Close</el-button>
				</div>
			</div>
		</el-dialog>

		<!-- <DialogAddVendor
      :addVendorDialog="addVendorDialog"
      @saveSuccess="addVendorSaveSuccess()"
    /> -->
		<el-dialog :title="$t('dashboard.welcomeOurMallApp')" :visible.sync="createdNameDialog.isShow" :width="'650px'"
			:show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
			<el-row>
				<el-col :span="24">
					<p style="padding-left: 20px;">{{$t('dashboard.relevantInformation')}}</p>
					<el-form>
						<el-form-item :label="$t('dashboard.yourCompany')" :label-width="createdNameDialog.labelW"
							required>
							<el-input :placeholder="$t('dashboard.customersView')" v-model="createdNameDialog.name"
								auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item :label="$t('dashboard.yourEmail')" :label-width="createdNameDialog.labelW">
							<span v-if="this.$store.state.userInfo.email">
								{{this.$store.state.userInfo.email}} <a href="javascript:;"
									@click="changeMail">{{$t('dashboard.modify')}}</a>
							</span>
							<a v-else href="javascript:;" @click="changeMail">{{$t('dashboard.add')}}</a>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="saveName" :loading="createdNameDialog.loading">
					{{$t('dashboard.save')}}</el-button>
			</div>
		</el-dialog>
		    <el-dialog
					:title="advLook.title"
					:visible.sync="dialogVisibleLog"
					width="40%">
					<div v-html="advLook.content" style="padding:0 20px" class="set-css"></div>
					<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="dialogVisibleLog = false">{{$t('dashboard.save')}}</el-button>
  </span>
</el-dialog>
	</div>
</template>

<script>
	// import DialogAddVendor from "./../components/dialog/AddVendor";

	export default {
		data() {
			return {
				statisticDateRange: "3", // 选择查看类型
				statisticDateFrom: "",
				statisticDateTo: "",
				statisticDate: [],
				advData: [],
    	  advLook: {},
				dialogVisibleLog: false,
				dateArr: { // 选项
					1: 'dashboard.今天',
					2: 'dashboard.7天前',
					3: 'dashboard.30天前',
					4: 'dashboard.90天前',
					5: 'dashboard.一年前',
					6: 'dashboard.自定义'
				},
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() > Date.now() - 8.64e6
					}
				},
				tableData: [],
				chartData: {
					columns: [this.$t('dashboard.日期'), `${this.$t('dashboard.销售额')}${this.$store.state.country.shopCurrency}${this.$store.state.country.symbol}`, this.$t('dashboard.订单数')],
					rows: []
				},
				moreReference: {
					isShow: false,
					pageSizes: [10, 20, 50, 100],
					page: 1,
					rowsPerPage: 10,
					items: [],
					total: 0,
					totalPage: 0,
					loading: false,
					tableData: [],
				},
				vendorDashboardSummary: {
					waitCompleteCnt: '', // 待完善
					waitDeliverCnt: '', // 待发货
					abnormalCnt: '', // 订单异常
					syncFailCnt: '', // 同步发货失败
					customerCnt: '', // 客户数
					shopCnt: '', // 托管店铺数
					offerItemCnt: '', // 待报价商品数
				},
				dialogVisibleAddVendor: false,
				addVendorDialog: {
					isShow: false,
					loading: false,
					labelW: "100px",
					name: "",
					remark: "",
					email: "",
				},
				addVendorDialogDefault: "{}",
				lastVendor: [],
				aBg: ["#343a40", "#c5a46b", "#f46a6a", "#34c38f"],
				createdNameDialog: {
					isShow: false,
					loading: false,
					labelW: "150px",
					name: "",
					email: "",
				},
				createdNameDialogDefault: "{}",
				isShowCart: true,
				vendorAllOrderCnt: {},
			};
		},
		components: {
			// DialogAddVendor,
		},
		mounted() {
			this.initPageData();
			this.getCharts();
			this.getAdvList()
			this.getVendorAllOrderCnt(),
				this.addVendorDialogDefault = JSON.stringify(this.addVendorDialog);
			this.createdNameDialogDefault = JSON.stringify(this.createdNameDialog);
			this.getLastVendor();
			if (!this.$store.state.userInfo.name) {
				//没有名字先提示改名
				this.createdNameDialog.isShow = true;
				// this.createdNameDialog.email = this.$store.state.userInfo.email;
				return;
			}
			// if (!Number(this.$store.state.cnt.customerCnt)) {
			//   this.$root.$children[0].getCnt(this.firstCustomer); //添加第一个客户
			// }
			// this.open2()
		},
		methods: {
			getVendorAllOrderCnt() {
				this.$apiCall("api.ShopifyOrder.getVendorAllOrderCnt", {}, (r) => {
					if (r.ErrorCode == 9999) {
						this.vendorAllOrderCnt = r.Data.Results;
					} else {
						if (r.ErrorCode != 10086)
							this.$message({
								message: r.Message,
								type: "error"
							});
					}
				});
			},
			vendorAllOrderCntText(id) {
				let text = 0;
				if (id == 22) {
					text = this.vendorAllOrderCnt.waitVendorConfirmCnt ? this.vendorAllOrderCnt.waitVendorConfirmCnt : 0;
				} else {
					text = this.vendorAllOrderCnt[id] ? this.vendorAllOrderCnt[id] : 0;
				}
				return text;
			},
			//       open2() {
      //   this.$notify({
      //     title: '警告',
      //     message: 'ourmall预计将于2023年8月15日晚上8点进行停机维护工作，预计维护时长4小时，如果在预订时间内无法完成维护内容，开机时间也将继续顺延。请各位用户相互转告，并提前留意工作时间，以免造成不必要的损失。维护期间给您带来的不便，敬请谅解，感谢所有用户的支持与配合。',
      //     type: 'warning',
			// 		 duration: 0
      //   });
      // },
    getAdvList(){ //获取
      this.$apiCall("api.Notice.finds", {rType:1}, r => {
        if (r.ErrorCode == 9999) {
            this.advData = r.Data.Results.filter((item)=>{
                if (item.status == '1') {
                 return  item
              } 
              })
        }else{
           this.$message.error(r.Message)
        }
      })
    },
    lookLog(id){ //公告详情
    this.dialogVisibleLog = true
      this.$apiCall("api.Notice.get", {id: id}, r => {
      if (r.ErrorCode == 9999) {
        this.advLook = r.Data.Results
      }else{
          this.$message.error(r.Message)
      }
      })
    },
			gotoPage(type) {
				switch (type) {
					case 1:
						this.$router.push({
							path: '/ordersManage/2/1',
							// query: {
							// 	type: 1
							// }
						})
						break;
					case 2:
						this.$router.push({
							path: '/ordersManage/2/2',
							// query: {
							// 	type: 2
							// }
						})
						break;
					case 3:
						this.$router.push({
							path: '/ordersManage/2/3',
							// query: {
							// 	type: 3
							// }
						})
						break;
					case 4:
						this.$router.push({
							path: '/abnormal',
						})
						break;
					case 5:
						this.$router.push({
							path: '/my-custom',
						})
						break;
					case 6:
						this.$router.push({
							path: '/shopify-orders',
						})
						break;
					case 7:
						this.$router.push({
							path: '/products',
							query: {
								filterParams: 1
							}
						})
						break;
					case 8:
						this.$router.push({
							path: '/goods-mgr/shelves',
						})
						break;
					case 9:
						this.$router.push({
							name: "allOrders"
						})
						break;
					case 10:

						break;
				}
			},
			toPage(val) {
				if (val != this.moreReference.page)
					this.moreReference.page = val
				this.getTableData();
			},
			changePageSize(val) {
				this.moreReference.rowsPerPage = val;
				this.moreReference.page = 1;
				localStorage.setItem("moreReferenceRowsPerPage", val);
				this.getTableData();
			},
			showMoreReference() {
				this.moreReference.isShow = true;
				this.getTableData();
			},
			getTableData() {
				this.moreReference.loading = true;
				this.$apiCall("api.Invoice.vendorDashboardStatistic", {
					page: this.moreReference.page,
					rowsPerPage: this.moreReference.rowsPerPage,
				}, r => {
					this.moreReference.loading = false;
					if (r.ErrorCode == 9999) {
						this.moreReference.tableData = Object.values(r.Data.Results);
						if (this.moreReference.tableData.length) {
							this.moreReference.tableData.forEach((item) => {
								this.$set(item, "dateCode1", Number(item.dateCode))
								this.$set(item, "date", item.dateCode.replace(/^(\d{4})(\d{2})(\d{2})$/,
									"$1-$2-$3"))
							})
							this.moreReference.total = Number(r.Data.Pagination.totalCount);
							this.moreReference.totalPage = Number(r.Data.Pagination.totalPage);
							this.moreReference.tableData = this.moreReference.tableData.sort(this.sortData);
						}
					} else {
						if (r.ErrorCode != 10086)
							this.$elementMessage(r.Message, 'error');
					}
				})
			},
			dateChange() {
				if (this.statisticDate.length > 1) {
					this.statisticDateFrom = this.$moment(
						this.statisticDate[0]
					).format("YYYYMMDD");
					this.statisticDateTo = this.$moment(
						this.statisticDate[1]
					).format("YYYYMMDD");
					this.getCharts(1);
					this.statisticDateRange = "";
				}
			},
			dateRangeChange() {
				let type = this.statisticDateRange;
				switch (type) {
					case '1':
						this.statisticDateFrom = this.$moment().format("YYYYMMDD");
						this.statisticDateTo = this.$moment().format("YYYYMMDD");
						break;
					case '2':
						this.statisticDateFrom = this.$moment().subtract(7, 'd').format("YYYYMMDD");
						this.statisticDateTo = this.$moment().format("YYYYMMDD");
						break;
					case '3':
						this.statisticDateFrom = this.$moment().subtract(30, 'd').format("YYYYMMDD");
						this.statisticDateTo = this.$moment().format("YYYYMMDD");
						break;
					case '4':
						this.statisticDateFrom = this.$moment().subtract(90, 'd').format("YYYYMMDD");
						this.statisticDateTo = this.$moment().format("YYYYMMDD");
						break;
					case '5':
						this.statisticDateFrom = this.$moment().subtract(12, 'M').format("YYYYMMDD");
						this.statisticDateTo = this.$moment().format("YYYYMMDD");
						break;
					default:
						this.statisticDateFrom = "";
						this.statisticDateTo = "";
						break;
				}
				this.statisticDate = [this.statisticDateFrom, this.statisticDateTo];
				this.getCharts(1)
			},
			initPageData() {
				this.$showLoading()
				this.$apiCall(
					"api.Invoice.vendorDashboardSummary", {},
					(r) => {
						if (r.ErrorCode == 9999) {
							this.vendorDashboardSummary = r.Data.Results
							this.$hideLoading();
						} else {
							if (r.ErrorCode != 10086)
								this.$message({
									message: r.Message,
									type: "error"
								});
						}
					}
				);

				this.$apiCall(
					"api.Invoice.vendorDashboardStatistic", {
						page: this.moreReference.page,
						rowsPerPage: this.moreReference.rowsPerPage,
					},
					(r) => {
						if (r.ErrorCode == 9999) {
							this.tableData = Object.values(r.Data.Results)
							if (this.tableData.length) {
								this.tableData.forEach((item) => {
									this.$set(item, "dateCode1", Number(item.dateCode))
									this.$set(item, "date", item.dateCode.replace(/^(\d{4})(\d{2})(\d{2})$/,
										"$1-$2-$3"))
								})
							}
							this.tableData = this.tableData.reverse()
							this.$hideLoading();
						} else {
							if (r.ErrorCode != 10086)
								this.$message({
									message: r.Message,
									type: "error"
								});
						}
					}
				);


			},
			getCharts(type) {
				const chart = this.$refs.chart;
				if (!type) {
					this.statisticDateFrom = this.$moment().subtract(1, 'M').format("YYYYMMDD");
					this.statisticDateTo = this.$moment().format("YYYYMMDD");
					this.statisticDate = [this.statisticDateFrom, this.statisticDateTo];
				}
				this.$showLoading();
				let arr = [];
				this.$apiCall("api.Invoice.vendorDashboardStatistic", {
					dateFrom: this.statisticDateFrom,
					dateTo: this.statisticDateTo,
				}, r => {
					this.$hideLoading();
					if (r.ErrorCode == 9999) {
						arr = Object.values(r.Data.Results);
						if (arr.length) {
							this.isShowCart = true;
							arr.forEach((item) => {
								this.$set(item, "date", item.dateCode.replace(/^(\d{4})(\d{2})(\d{2})$/,
									"$1-$2-$3"));
							})
						} else {
							this.isShowCart = false;
							return;
						}
						const myChart = this.$echarts.init(chart);
						// const myChart = this.$echarts.init(document.getElementById('dashboardCharts'));
						const option = {
							title: {
								text: ''
							},
							tooltip: {
								trigger: 'axis'
							},
							legend: {
								data: [`${this.$t('dashboard.销售额')}${this.$store.state.country.shopCurrency}${this.$store.state.country.symbol}`, this.$t('dashboard.订单数')]
							},
							grid: {
								left: '3%',
								right: '4%',
								bottom: '3%',
								containLabel: true
							},
							xAxis: {
								type: 'category',
								boundaryGap: false,
								data: arr.map(item => item.date)
							},
							yAxis: {
								type: 'value'
							},
							series: [{
									name: `${this.$t('dashboard.销售额')}${this.$store.state.country.shopCurrency}${this.$store.state.country.symbol}`,
									type: 'line',
									stack: `${this.$t('dashboard.销售额')}${this.$store.state.country.shopCurrency}${this.$store.state.country.symbol}`,
									data: arr.map(item => item.amount),
									smooth: true
								},
								{
									name: this.$t('dashboard.订单数'),
									type: 'line',
									stack: this.$t('dashboard.订单数'),
									data: arr.map(item => item.orderCnt),
									smooth: true
								},
							]
						}
						myChart.setOption(option);
						//修改首次进入时图的宽度
						setTimeout(() => {
							myChart.resize();
						}, 200)
						window.onresize = function() {
							myChart.resize();
						};
					} else {
						if (r.ErrorCode != 10086)
							this.$elementMessage(r.Message, 'error');
					}
				})
			},
			changeMail() {
				this.$root.$children[0].changeUserEmail();
			},
			saveName() {
				if (!this.createdNameDialog.name) {
					this.$message({
						message: this.$t('dashboard.nameEnter'),
						type: "error"
					});
					return;
				}
				// let reg = new RegExp(
				//   "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
				// );
				// if (
				//   this.createdNameDialog.email &&
				//   !reg.test(this.createdNameDialog.email)
				// ) {
				//   this.$message({ message: "email格式不对", type: "error" });
				//   return;
				// }
				this.createdNameDialog.loading = true;
				this.$apiCall(
					"api.User.changeByUser", {
						name: this.createdNameDialog.name,
						// email: this.createdNameDialog.email,
					},
					(r) => {
						if (r.ErrorCode == 9999) {
							this.createdNameDialog.isShow = false;
							let userInfo = this.$store.state.userInfo;
							userInfo.name = this.createdNameDialog.name;
							// userInfo.email = this.createdNameDialog.email;
							localStorage.setItem("userInfo", JSON.stringify(userInfo));
							this.$store.commit("setUserInfo", userInfo);
							this.firstCustomer();
						} else {
							this.$message({
								message: r.Message,
								type: "error"
							});
						}
					}
				);
			},
			gotoCustom(item) {
				this.$router.push({
					name: "myCustom",
					params: {
						item
					}
				})
			},
			gotoInvoice(item) {
				this.$router.push({
					name: "allOrders",
					params: {
						customerName: item.customerName,
						id: item.id
					},
				});
			},
			getLastVendor() {
				//最近合作客户
				this.$showLoading();
				this.$apiCall(
					"api.Relationship.findByVendor", {
						last: true,
						page: 1,
						rowsPerPage: 4,
					},
					(r) => {
						this.$hideLoading();
						if (r.ErrorCode == 9999) {
							this.lastVendor = r.Data.Results;
							this.lastVendor.forEach((n) => {
								this.$apiCall("api.Relationship.getCntDetail", {
									relationshipId: n.id
								}, i => {
									if (i.ErrorCode == 9999) {
										n.invoiceCnt = i.Data.Results.invoiceCnt;
										n.totalAmount = i.Data.Results.totalAmount;
										n.orderCnt = i.Data.Results.orderCnt;
										n.skuCnt = i.Data.Results.skuCnt;
										n.offerSkuCnt = i.Data.Results.offerSkuCnt;
										this.lastVendor = [...this.lastVendor]
									}
								})
							});
						} else {
							if (r.ErrorCode != 10086)
								this.$message({
									message: r.Message,
									type: "error"
								});
						}
					}
				);
			},
			addVendorSaveSuccess() {
				//客户添加成功
				this.$root.$children[0].getCnt();
				this.getLastVendor();
			},
			openAddVendor() {
				this.addVendorDialog = JSON.parse(this.addVendorDialogDefault);
				this.addVendorDialog.isShow = true;
			},
			firstCustomer() {
				this.openAddVendor();
			},
			gotoImport(item) {
				this.$router.push({
					name: "importData",
					query: {
						rid: item.id
					}
				});
			},
		},
	};
</script>
<style lang="scss" scoped>
	.add-box {
		a.d-flex {
			padding: 15px;
			flex-direction: column;
			justify-content: center;
			color: #fff;
			background-color: $--color-primary;
			border: 1px #ebeef5 solid;

			i {
				margin-bottom: 10px;
				font-size: 42px;
			}
		}

		a.d-flex:hover,
		a.d-flex:focus {
			text-decoration: none;
			background-color: $--primary-hover;
		}
	}

	.top-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		max-width: 300px;
		padding: 10px 25px;

		.left {
			.title {
				margin-bottom: 5px;
				color: #909399;
			}

			.t-link {
				display: flex;
				align-items: flex-end;
				color: #909399;

				a {
					font-size: 22px;
				}
			}
		}

		i {
			width: 42px;
			height: 42px;
			line-height: 42px;
			text-align: center;
			background-color: $--color-primary;
			border-radius: 50%;
			color: #fff;
			font-size: 22px;
		}
	}

	.last-customer {
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20px;
			font-weight: bold;
			font-size: 18px;
		}
	}

	.c-box {
		margin-bottom: 15px;

		.c-box-content {
			display: flex;
			align-items: center;
			color: #606266;

			.left {
				display: flex;
				flex-direction: column;
				align-items: center;
				min-width: 110px;

				.avatar-title {
					margin-bottom: 10px;
					width: 42px;
					height: 42px;
					line-height: 42px;
					text-align: center;
					background-color: $--primary-hover;
					border-radius: 50%;
					color: #fff;
					font-style: normal;
					font-size: 18px;
				}

				.name {
					color: #606266;
				}
			}

			.right {
				padding-left: 15px;
				border-left: 1px #ebeef5 solid;
				width: 100%;
				font-size: 12px;

				.v-content {
					display: flex;
					flex-direction: column;
					align-items: baseline;

					.v-content-title {
						margin-right: 10px;
						font-size: 12px;
					}

					.v-content-val {
						font-size: 22px;
					}
				}
			}
		}
	}

	@mixin common-window {
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		border: 1px solid #EBEEF5;
		background-color: #FFFFFF;
		overflow: hidden;
		color: #303133;
		transition: 0.3s;
	}

	.user-status-list {
		&>div {
			cursor: pointer;
		}

		.user-status-item {
			display: flex;
			//margin: 10px 0;
			padding: 20px;
			justify-content: flex-start;
			align-items: center;
			@include common-window;
		}

		.status-icon {
			width: 50px;
			height: 50px;
			line-height: 50px;
			text-align: center;
			background-color: #5c6ac41f;
			border-radius: 50%;
			color: #5c6ac4;
			font-size: 22px;
			margin-right: 10px;

			i {
				font-size: 22px;
			}
		}

		.status-content {
			display: flex;
			flex-direction: column;
			justify-content: center;

			.status-num {
				font-size: 18px;
				font-weight: 500;
				color: #5c6ac4;
				//margin-bottom: 10px;
			}

			.status-description {
				color: #606266;
				font-size: 15px;
			}
		}
	}


	.chart {
		padding: 20px;
		@include common-window;

		.chart-header {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20px;

			.chart-title {
				font-weight: bold;
				font-size: 18px;
			}
		}

		.chart-body {
			padding: 0 20px;
		}
	}

	.day-statistics {
		padding: 20px;
		@include common-window;

		.day-statistics-title {
			font-size: 18px;
			margin-bottom: 10px;
			font-weight: 500;
		}

		.day-statistics-footer {
			margin-top: 20px;
			text-align: center;
		}

		.tableTiop {
			color: #5c6ac4;
			font-size: 13px !important;
			font-weight: 700 !important;
		}
	}

	.info-aggregation {
		padding: 20px;
		@include common-window;

		.info-aggregation-title {
			font-size: 18px;
			font-weight: 500;
			margin-bottom: 10px;
		}

		.info-aggregation-list {
			.item {
				display: flex;
				padding: 0 10px;
				align-items: center;
				cursor: pointer;

				.icon {
					width: 32px;
					height: 32px;
					line-height: 32px;
					text-align: center;
					background-color: #5c6ac41f;
					color: #5c6ac4;
					font-size: 18px;
					border-radius: 50%;
					overflow: hidden;

					i {
						font-size: 22px !important;
					}
				}

				.text {
					display: flex;
					flex-direction: column;
					margin-left: 10px;
					line-height: 20px;
					justify-content: center;

					&>div {
						margin-bottom: 5px;
						font-size: 16px;
						font-weight: 500;
						color: #333;
					}

					.tips {
						color: #666;
						font-size: 14px;
						font-weight: 400;
					}
				}
			}
		}
	}

	.user-status-list .status-icon {
		min-width: 50px;
	}
</style>
<style>
.text-style{
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  /* border-bottom:1px solid #e1e1e1; */
}
.text-style .el-link--inner{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: contents;
}

.text-style .el-link--inner .round{
  display: block;
  width: 3px;
  height: 3px;
  background: #5c6ac4;
  margin-right: 3px;
  border-radius: 50%;
}
.bg-box{
	background: #7d88d0;
}
.fit-box{
	padding: 0 20px;
    border-bottom: 1px solid #e1e1e1;
}
.set-css img{
  max-width: 100%;
  max-height: 100%;
}
</style>