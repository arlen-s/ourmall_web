<template>
	<div class="contentpanel my-invoice-page">
		<div class="pagetitle" ref="pageHeader" style="flex-wrap: wrap; height: auto;">
			<div class="left d-flex align-items-center">
				<div class="title" style="margin-right: 20px;">
					<i class="el-icon-bank-card"></i>
					<h2>Purchase Orders</h2>
				</div>
				<div style="margin-top: 8px;">
					<!--<el-checkbox v-model="cancelStatus" @change="filterGetItem">Show the cancelled status</el-checkbox>-->
					<template v-if="!waitStatus">
						<el-link v-if="cancelStatus == 1" type="primary" @click="filterGetItem2(2)">Show cancelled orders</el-link>
						<el-link v-if="cancelStatus == 2" type="primary" @click="filterGetItem2(1)">Show all valid orders</el-link>
					</template>
					<el-link v-if="waitStatus" type="primary" @click="filterGetItem2(3)">Show all valid orders</el-link>
				</div>
			</div>
			<div class="right">

			</div>
			<div style="margin: 5px;width: 100%;">
				<el-alert
					v-if="waitConfirmCnt && !waitStatus"
					type="warning"
					:closable="false"
					class="top-warning"
				>
					<div slot="title">
						<p class="c-title" style="color: #e6a23c">
							<i class="el-icon-warning"></i>
							<b>Notice: </b>
							You have <a href="javascript:;"  @click="filterWaitConfirm">{{waitConfirmCnt}} purchase order(s)</a>  need your reconfirm,
							<a href="javascript:;"  @click="filterWaitConfirm">click here</a> to view details.
						</p>
					</div>
				</el-alert>
			</div>
		</div>

		<div class="pagebody">
			<el-row :gutter="15" class=" mg-b-20">
				<el-col :span="24">
					<el-card>
						<el-row :gutter="20">
							<el-col :span="24">
								<div ref="pageFilter" class="page-filter">
									<el-form :inline="true" size="mini">
										<el-form-item class=" mg-r-5" label="#">
											<el-input style="width: 150px;" v-model="filterParams.code" placeholder="Invoice Number" @keyup.enter.native="filterGetItem"></el-input>
										</el-form-item>
										<el-form-item class=" mg-r-5">
											<el-input style="width: 120px;" v-model="filterParams.trackNumber" placeholder="Track Number" @keyup.enter.native="filterGetItem"></el-input>
										</el-form-item>
										<el-form-item class=" mg-r-5">
											<el-input style="width: 150px;" v-model="filterParams.codeName" placeholder="Shopify order number" @keyup.enter.native="filterGetItem"></el-input>
										</el-form-item>
                    <el-form-item class=" mg-r-5">
                      <el-select
                        filterable
                        remote
                        :remote-method="getShopName"
                        :loading="getShopNameInput.loading"
                        placeholder="Shopify store Name"
                        v-model="filterParams.accountId"
                        @change="filterGetItem"
                      >
                        <el-option
                          v-for="opt in getShopNameInput.shopList"
                          :key="opt.id"
                          :label="opt.shopName"
                          :value="opt.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
										<el-form-item class=" mg-r-20">
											<el-select class=" mg-r-5" style="width: 150px" v-model="filterParams.timeFilter" placeholder="Date type">
												<el-option v-for="opt in filterParams.timeOption" :key="opt.value" :label="opt.label" :value="opt.value"></el-option>
											</el-select>
											<el-date-picker v-if="filterParams.timeFilter" value-format="yyyy-MM-dd" v-model="filterParams.date" @change="dateChange" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="Start" end-placeholder="End">
											</el-date-picker>
										</el-form-item>
										<el-form-item v-if="!waitStatus">
											<el-select style="width: 150px;" v-model='filterParams.status' placeholder="All status" @change="filterGetItem">
												<el-option label="All status" value=""></el-option>
												<el-option v-for="opt in $dict.invoiceStatus" v-if="opt.val != 9" :label="opt.text" :value="opt.val" :key="opt.val"></el-option>
											</el-select>
										</el-form-item>

										<!-- <el-form-item>
                      <el-select
                        style="width: 220px;"
                        v-model='filterParams.payStatus'
                        placeholder="Vendor confirmation"
                        @change="filterGetItem"
                      >
                        <el-option
                          label="Vendor confirmation status"
                          value=""
                        ></el-option>
                        <el-option
                          label="Confirmed"
                          value="1"
                        ></el-option>
                        <el-option
                          label="Not yet confirmed"
                          value="2"
                        ></el-option>
                      </el-select>
                    </el-form-item> -->
										<el-form-item class=" mg-r-5">
											<el-select filterable remote :remote-method="remoteMethodVendor" :loading="selectLoading" placeholder="Enter vendor name" v-model="filterParams.relationshipId" @change="filterGetItem">
												<el-option v-for="opt in selectArr" :key="opt.id" :label="opt.vendorName" :value="opt.id">
												</el-option>
											</el-select>
										</el-form-item>
										<!-- <el-form-item>
                      <el-popover
                        ref="popoverCustomer"
                        popper-class="with-shadow with-shadow2"
                        trigger="focus"
                        width="300"
                        placement="bottom"
                      >
                        <el-input
                          class="input-new-tag"
                          slot="reference"
                          v-model="filterParams.vendorName"
                          ref="saveTagInput"
                          placeholder="Vendor name"
                        >
                        </el-input>

                        <div class="tx-center change-customer">
                          <div
                            class="mg-t-10"
                            style="max-height: 280px;overflow-y: scroll;"
                            v-if="vendorData.length"
                          >
                            <div
                              v-for="(relation,index) in vendorData"
                              :key="index+relation.id+relation.customerName"
                              class="text customer-item"
                              :class="{active: relation.active}"
                              @click="selectCustomer(relation)"
                            >
                              {{relation.vendorName?relation.vendorName:'---'}} <span v-if="relation.vendorRemark">({{relation.vendorRemark}})</span>
                            </div>
                          </div>
                          <div
                            v-else
                            class="tx-center"
                          >No data</div>
                        </div>
                      </el-popover>
                    </el-form-item> -->
										<el-form-item>
											<el-button type="primary" @click="filterGetItem">Filter</el-button>
											<el-button type="danger" @click="clearFilter">Clear</el-button>
										</el-form-item>
									</el-form>
								</div>
							</el-col>
						</el-row>
						<el-table :data="items" row-key="id" stripe style="width: 100%" :height="tableHeight" ref="gridTable" :row-class-name="tableRowClassName">
							<el-table-column label="#Invoice Number" prop="code" width="250">
								<template slot-scope="scope">
									<span>#{{scope.row.code}}</span>
									<p class="tx-gray-600" style="white-space: nowrap;">Includes:
										<span style="color: #606266;">{{scope.row.orderCnt?scope.row.orderCnt:0}} </span>orders /
										<span style="color: #606266;">{{scope.row.totalCnt?scope.row.totalCnt:0}} </span>products /
                    <span style="color: #606266;">{{scope.row.shops.length?scope.row.shops.length:0}} </span> stores
									</p>
								</template>
							</el-table-column>
							<el-table-column label="Vendor" prop="vendorName" width="180">
							</el-table-column>
							<!--<el-table-column
                label="Shopify Orders"
                prop="orderCnt"
                align="center"
                width="150"
              >
              </el-table-column>-->
							<!--<el-table-column
                label="Items Quantity"
                prop="totalCnt"
                align="center"
                width="120"
              >
              </el-table-column>-->
							<el-table-column label="Amount Due" prop="realAmount" width="180" align="right" class=" pd-r-15">
								<template slot-scope="scope">
									<span v-if="scope.row.realAmount>0" class=" tx-danger">US$ <span>{{scope.row.realAmount}}</span></span>
									<span class=" tx-danger" v-else>Not set up</span>
								</template>
							</el-table-column>
							<el-table-column label="Statistics" width="400">
								<template slot-scope="scope">
									<div style="white-space: nowrap;">
										<span class=" tx-gray-600">Vendor shipped: </span>
										<span v-if="scope.row.orderStatusCnt && Number(scope.row.orderStatusCnt.deliveredOrderCnt) > 0">
											<el-popover
										    placement="bottom"
										    title="Download tracking information"
										    width="700"
										    trigger="hover">
										    <div class="mg-t-15 mg-b-15" style="white-space: nowrap;">
			                    				<span class=" tx-gray-600">Vendor shipped: </span>
			                    					<a href="javascript:;">{{scope.row.orderStatusCnt ? scope.row.orderStatusCnt.deliveredOrderCnt : '---'}}</a>
													<span v-if="scope.row.orderStatusCnt && Number(scope.row.orderStatusCnt.deliveredOrderCnt)- Number(scope.row.orderStatusCnt.syncOrderCnt) > 0" class="mg-l-10">(But <a href="javascript:;">{{scope.row.orderStatusCnt ? Number(scope.row.orderStatusCnt.deliveredOrderCnt)- Number(scope.row.orderStatusCnt.syncOrderCnt) : '---'}}</a> unfulfilled / partially fulfilled)</span>
												</div>
												<el-alert class="icon-color" :closable="false" title="You may download these tracking information and fulfilled these orders in your Shopify store manualy." type="info" show-icon>
												</el-alert>
												<div class="mg-t-15 d-flex justify-content-center">
													<el-button type="primary" size="small" @click="exportDeliver(scope.row.id,1)">Download ALL tracking information</el-button>
													<el-button v-if="scope.row.orderStatusCnt && Number(scope.row.orderStatusCnt.deliveredOrderCnt)- Number(scope.row.orderStatusCnt.syncOrderCnt) > 0" type="primary" size="small" @click="exportDeliver(scope.row.id,2)">Download NOT FULFILLED tracking information</el-button>
												</div>
												<a slot="reference" href="javascript:;">{{scope.row.orderStatusCnt ? scope.row.orderStatusCnt.deliveredOrderCnt : '---'}}</a>
											</el-popover>
										</span>
										<span v-else>
											<a href="javascript:;">{{scope.row.orderStatusCnt ? scope.row.orderStatusCnt.deliveredOrderCnt : '---'}}</a>
										</span>
										<el-tooltip class="item" effect="dark" placement="bottom" content="The Shopify orders that the vendor had upload tracking information.">
											<i class="fa fa-question-circle-o mg-l-5"></i>
										</el-tooltip>
										<template v-if="scope.row.orderStatusCnt && Number(scope.row.orderStatusCnt.deliveredOrderCnt)- Number(scope.row.orderStatusCnt.syncOrderCnt) > 0">
										<span class="mg-l-10">(But
											<el-popover
										    placement="bottom"
										    title="Download tracking information"
										    width="700"
										    trigger="hover">
										    <div class="mg-t-15 mg-b-15" style="white-space: nowrap;">
			                    			<span class=" tx-gray-600">Vendor shipped: </span>
													<a href="javascript:;">{{scope.row.orderStatusCnt ? scope.row.orderStatusCnt.deliveredOrderCnt : '---'}}</a>
													<span v-if="scope.row.orderStatusCnt && Number(scope.row.orderStatusCnt.deliveredOrderCnt)- Number(scope.row.orderStatusCnt.syncOrderCnt) > 0" class="mg-l-10">(But <a href="javascript:;">{{scope.row.orderStatusCnt ? Number(scope.row.orderStatusCnt.deliveredOrderCnt)- Number(scope.row.orderStatusCnt.syncOrderCnt) : '---'}}</a> unfulfilled / partially fulfilled)</span>
												</div>
												<el-alert class="icon-color" :closable="false" title="You may download these tracking information and fulfilled these orders in your Shopify store manualy." type="info" show-icon>
												</el-alert>
												<div class="mg-t-15 d-flex justify-content-center">
													<el-button type="primary" size="small" @click="exportDeliver(scope.row.id,1)">Download ALL tracking information</el-button>
													<el-button v-if="scope.row.orderStatusCnt && Number(scope.row.orderStatusCnt.deliveredOrderCnt)- Number(scope.row.orderStatusCnt.syncOrderCnt) > 0" type="primary" size="small" @click="exportDeliver(scope.row.id,2)">Download NOT FULFILLED tracking information</el-button>
												</div>
												<a slot="reference" href="javascript:;">{{scope.row.orderStatusCnt ? Number(scope.row.orderStatusCnt.deliveredOrderCnt)- Number(scope.row.orderStatusCnt.syncOrderCnt) : '---'}}</a>
												</el-popover>
												unfulfilled / partially fulfilled)
										</span>
										<el-tooltip class="item" effect="dark" placement="bottom">
											<div slot="content">The Shopify orders still unfulfilled / partially fulfilled even if the vendor had upload tracking information.
												<br/>( You may download these tracking information and fulfilled these order in your Shopify store manually. )
											</div>
											<i class="fa fa-question-circle-o mg-l-5"></i>
										</el-tooltip>
										</template>
		</div>
		</template>
		</el-table-column>
		<el-table-column label="Status" width="200">
			<template slot-scope="scope">
				<!--<span v-if="scope.row.timeApiGet" style="white-space: nowrap;word-break: break-word;">Downloaded to ERP</span>-->
				<span :class="`s-label label-${$dict.invoiceStatus[scope.row.status].type}`">{{$dict.invoiceStatus[scope.row.status].text}}</span>
			</template>
		</el-table-column>
		<el-table-column label="Date" width="275">
			<template slot-scope="scope">
				<div v-if="scope.row.timeCreated" style="white-space: nowrap;">
					<span class=" tx-gray-600">Order created:</span>
					<span>{{scope.row.timeCreated ? moment.unix(scope.row.timeCreated).format("ll [at] LTS") : '--'}}</span>
				</div>
				<div v-if="scope.row.timeRead" style="white-space: nowrap;">
					<span class=" tx-gray-600">Order paid:</span>
					<span>{{scope.row.timeRead ? moment.unix(scope.row.timeRead).format("ll [at] LTS") : '--'}}</span>
				</div>
				<div v-if="scope.row.timePaid" style="white-space: nowrap;">
					<span class=" tx-gray-600">Order confirmed:</span>
					<span>{{scope.row.timeCreateOrder ? moment.unix(scope.row.timeCreateOrder).format("ll [at] LTS") : '--'}}</span>
				</div>
				<!--<div class="d-flex "><span
                      class=" tx-gray-600 mg-r-10"
                      style="width: 110px; text-align: right;"
                    >Order created: </span> <span>{{scope.row.timeCreated ? moment.unix(scope.row.timeCreated).format("ll [at] LTS") : '--'}}</span></div>
                  <div class="d-flex "><span
                      class=" tx-gray-600 mg-r-10"
                      style="width: 110px; text-align: right;"
                    >Order paid: </span> <span>{{scope.row.timeRead ? moment.unix(scope.row.timeRead).format("ll [at] LTS") : '--'}}</span></div>
                  <div class="d-flex "><span
                      class=" tx-gray-600 mg-r-10"
                      style="width: 110px; text-align: right;"
                    >Order confirmed: </span> <span>{{scope.row.timeCreateOrder ? moment.unix(scope.row.timeCreateOrder).format("ll [at] LTS") : '--'}}</span></div>-->
			</template>
		</el-table-column>
		<el-table-column fixed="right" label="Action" width="150">
			<template slot-scope="scope">
				<!-- <div v-if="scope.row.status == 7">
					<el-popconfirm
						confirmButtonText='Confirm'
						cancelButtonText='Cancel'
						icon="el-icon-info"
						iconColor="#5c6ac4"
						title="Do You want to confirm?"
						@onConfirm="confirmInvoice(scope.row)"
					>
						<el-link  slot="reference" :disabled="scope.row.confirmLoading" type="primary">Confirm</el-link>
					</el-popconfirm>
				</div> -->
				<div v-if="scope.row.status == 7">
					<el-link type="primary" @click="openReconfirm(scope.row)">Reconfirm</el-link>
				</div>
				<div v-else>
					<el-link type="primary" @click="gotoInvoice(scope.row)">View Details</el-link>
				</div>
				<!--&& scope.row.payStatus != 1 -->
				<!-- paymentType=4 的 payStatus=1的 不能取消订单 -->
				<template v-if="!((scope.row.paymentType == 4 && scope.row.payStatus == 1) || scope.row.paymentType == 6)">
					<div v-if="(scope.row.status == 1 || scope.row.status == 2 || scope.row.status == 7) && scope.row.createUserType == 1">
						<el-link type="danger" @click="cancelInvoice(scope.row)">Cancel order</el-link>
					</div>
				</template>
				<div v-if="scope.row.status != 7">
					<el-link type="primary" @click="sendtoVendor(scope.row)">Send to vendor</el-link>
				</div>
			</template>
		</el-table-column>
		</el-table>
		</el-card>
		</el-col>
		</el-row>
		<el-row v-if="items.length" :gutter="20">
			<el-col :span="24" class=" d-flex justify-content-center">
				<div>
					<el-pagination :current-page="page" :background="true" layout="sizes, total, prev, pager, next, jumper" :page-sizes="pageSizes" :page-size="rowsPerPage" :total="Number(total)" @current-change="toPage" @size-change="changePageSize">
					</el-pagination>
				</div>
			</el-col>
		</el-row>
	</div>
	<el-dialog :visible.sync="selectedSaveDialog.isShow" :width="'620px'" :close-on-click-modal="false" class="selected-save-dialog">
		<div style="padding: 0 20px 20px;text-align: center;">
			<i style="color: #67C23A;font-size: 50px;" class="el-message__icon el-icon-success"></i>
			<p style="color: #67C23A;font-weight: bold;font-size: 18px;margin: 10px 0px 20px;">Selected saved! Now you can Check the purchase orders</p>
			<el-table :data="selectedSaveDialog.info" border style="width: 100%">
				<el-table-column label="#Invoice Number" prop="code">
					<template slot-scope="scope">
						<span>#{{scope.row.code}}</span>
					</template>
				</el-table-column>
				<el-table-column label="Vendor" prop="vendorName">
				</el-table-column>
				<el-table-column label="Amount Due" prop="realAmount">
					<template slot-scope="scope">
						<span v-if="scope.row.realAmount>0" class=" tx-danger">US$ <span>{{scope.row.realAmount}}</span></span>
						<span class=" tx-danger" v-else>Not set up</span>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="Action">
					<template slot-scope="scope">
						<div>
							<el-link style="font-size: 12px;font-weight: normal;" type="primary" @click="gotoInvoice(scope.row)">View Details</el-link>
						</div>
						<div>
							<el-link style="font-size: 12px;font-weight: normal;" type="primary" @click="sendtoVendor(scope.row)">Send to vendor</el-link>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</el-dialog>
	<el-dialog @open="openSend" @close="closeSend" custom-class="sendInvoice" title="Send to vendor" :visible.sync="sendInvoiceOpen" width="50%">
		<!--<el-divider></el-divider>-->
		<template>


				<el-tabs v-model="activeShareName" type="card" style="margin-left: 20px;margin-top: 10px;">
				<el-tab-pane name="shareLink">
					<span slot="label"><i class="iconfont icon-link"></i> Share by link</span>
					<div class="d-flex mg-y-20">
						<div style="color: #999;width: 150px;text-align: right;margin-right: 10px;white-space: nowrap;">Share link:</div>
						<div>
							<!--<el-link :underline="false" :href="invoiceInfo.url" target="_blank">{{invoiceInfo.url}}</el-link>-->
							<span>{{invoiceInfo.url}}</span>
						</div>
					</div>
					<div class="d-flex mg-y-20">
						<div style="color: #999;width: 150px;text-align: right;margin-right: 10px;white-space: nowrap;"></div>
						<div>
							<div>
								<el-button size="mini" type="success" v-clipboard:copy="invoiceInfo.url" v-clipboard:success="onCopy" v-clipboard:error="onError">Copy Link</el-button>
							</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane name="shareWeixin">
					<span slot="label"><i class="iconfont icon-shejiao"></i> Share by APP</span>
					<div>
						<div class="d-flex mg-y-20">
							<div style="color: #999;width: 150px;text-align: right;margin-right: 10px;white-space: nowrap;">Title:</div>
							<div style="width: 70%;">
								<el-input @change="saveRemark('2')" type="text" size="small" v-model="shareTitle"></el-input>
							</div>
						</div>
						<div class="d-flex mg-y-20 align-items-center">
							<div style="color: #999;width: 150px;text-align: right;margin-right: 10px;white-space: nowrap;">Desc:</div>
							<div style="width: 70%;">
								<el-input @change="saveRemark('2')" type="textarea" resize="none" :autosize="{ minRows: 3, maxRows: 6}" size="small" v-model="shareDesc"></el-input>
								<!--<div class="mg-t-20 tx-right">
										<el-button :loading="remarkLoading" size="mini" type="primary" plain @click="saveRemark('1')">Clear</el-button>
										<el-button size="mini" type="primary" :loading="remarkLoading" @click="saveRemark('2')">Save</el-button>
									</div>-->
							</div>
						</div>
						<div class="d-flex mg-y-20">
							<div style="color: #999;width: 150px;text-align: right;margin-right: 10px;white-space: nowrap;">Share:</div>
							<div style="width: 70%;" class="d-flex">
								<div class="skype-share" style="margin-right: 30px;" :data-href="shareTitle + shareDesc" data-lang="en-US" :data-text="invoiceInfo.url" data-style="large"></div>
								<div>
									<el-tooltip placement="bottom">
										<div slot="content">
											<p class="tx-center mg-b-10">Scan share to WeChat</p>
											<img :src="invoiceInfo.qrcode" width="130" />
											<img src="images/weixin.png" width="30px" style="position: absolute;left: 50%;top: 50%;margin-left: -15px;margin-top: -4px;" />
										</div>
										<a class="share-weixin" href="javascript:;">
											<i class="fa fa-weixin"></i> Share
										</a>
									</el-tooltip>
								</div>
							</div>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</template>
		<el-divider></el-divider>
		<div slot="footer" class="dialog-footer d-flex justify-content-between">
			<div>
				<el-button v-show="activeShareName == 'shareWeixin'" size="small" type="primary" plain @click="saveRemark('1')">Clear</el-button>
			</div>
			<div>
				<el-button size="small" @click="sendInvoiceOpen = false">Close</el-button>
			</div>
		</div>
	</el-dialog>
	<el-dialog
		title="Purchase Order Reconfirm"
		:visible.sync="DialogReconfirm.isShow"
		width="450px"
	>
		<template v-if="DialogReconfirm.item">
			<div style="padding: 0 20px">
				<div style="margin-bottom: 10px;">Vendor name: <b style="color: #909399;">{{DialogReconfirm.item.vendorName}}</b></div>
				<div>
					Includes: <b style="color: #5c6ac4;">{{DialogReconfirm.item.orderCnt ? DialogReconfirm.item.orderCnt : 0}}</b> Shopify orders /
					<b style="color: #5c6ac4;">{{DialogReconfirm.item.totalCnt ? DialogReconfirm.item.totalCnt : 0}}</b> products
				</div>
			</div>
			<div slot="footer" class="dialog-footer d-flex">
				<el-button v-if="DialogReconfirm.item.status == 7"  size="small" type="primary"  @click="runReconfirm(1)">
					Allow vendor to process these orders
				</el-button>
				<el-button size="small" @click="runReconfirm(2)">View details</el-button>
			</div>
		</template>
	</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
        getShopNameInput: {
          loading: false,
          shopList: []
        },
				loading: false,
				reSizeTime: 0,
				tableHeight: 400,
				pageSizes: [10, 20, 50, 100],
				page: this.$route.query.page ? Number(this.$route.query.page) : 1,
				rowsPerPage: localStorage.getItem("c_customerInvoiceRowsPerPage") ?
					Number(localStorage.getItem("c_customerInvoiceRowsPerPage")) :
					10,
				items: [],
				total: 0,
				totalPage: 0,
				filterParams: {
					timeOption: [{
							label: "Order created",
							value: "timeCreated"
						},
						{
							label: "Order paid",
							value: "timePaid"
						},
						{
							label: "Order confirmed",
							value: "timeRead"
						},
						//        { label: "下载订单时间", value: "timeApiGet" },
					],
					timeFilter: "", //时间筛选
					date: [],
					dateFrom: "",
					dateTo: "",
					code: "",
					status:'',
					customerRead: "",
					payStatus: "",
					relationshipId: "",
					vendorName: "",
					vendorSelectArr: [],
					trackNumber: "",
					codeName: "",
          accountId: "",
				},
				filterParamsDefault: "{}",
				selectedSaveDialog: {
					isShow: false,
					info: "",
				},
				selectedSaveDialogDefault: "{}",
				invoiceInfo: "",
				shareTitle: "",
				shareDesc: "",
				showDownloadInvoice: false,
				sendInvoiceOpen: false,
				activeShareName: "shareLink",
				saveCode: "",
				saveItem: "",
				vendorData: [],
				selectLoading: false,
				selectArr: [],
				cancelStatus: 1,
				waitConfirmCnt: 0,
				waitStatus: 0,
				DialogReconfirm:{
					isShow: false,
					item: null,
				}
			};
		},
		watch: {
			items() {
				this.items.forEach((e, i) => {
					e.isLoadOrderCnt = 0;
				});
				setTimeout(() => {
					this.loadCnt();
				}, 500);
			},
			$route: "gotoPage",
			saveCode() {
				if(this.saveCode) {
					this.selectedSaveDialog = JSON.parse(this.selectedSaveDialogDefault);

					this.selectedSaveDialog.info = sessionStorage.getItem("c_selectedSaveInfo"
						) ?
						JSON.parse(sessionStorage.getItem("c_selectedSaveInfo")) :
						[];
					if(this.selectedSaveDialog.info.length) {
						this.selectedSaveDialog.isShow = true;
					}
				}
			},
		},
		mounted() {
			this.filterParamsDefault = JSON.stringify(this.filterParams);
			this.filterParams.status = this.$route.query.status ?
				Number(this.$route.query.status) :
				"";
			if (this.$route.query.rid) {
        this.filterParams.relationshipId = this.$route.query.rid;
        this.filterParams.vendorName = this.$route.query.name;
        this.selectArr = [{
          id: this.$route.query.rid,
          vendorName: this.$route.query.name
        }];
      }
			if(this.$route.params.rid) {
				this.filterParams.relationshipId = this.$route.params.rid;
				this.filterParams.vendorName = this.$route.params.name;
				this.selectArr = [{
					id: this.$route.params.rid,
					vendorName: this.$route.params.name
				}];
			}
			this.getItem();
			this.getVendor();
			window.onresize = () => {
				this.$getTableHeight(this);
			};
			this.selectedSaveDialogDefault = JSON.stringify(this.selectedSaveDialog);
			this.saveCode = this.$route.params.saveCode ?
				this.$route.params.saveCode :
				"";
			let gridTable = this.$refs.gridTable.bodyWrapper
			gridTable.onscroll = () => {
				setTimeout(() => {
					this.loadCnt();
				}, 100);
			}
			let t;
		    $(window)
		      .scroll(() => {
		        clearTimeout(t);
		        t = setTimeout(() => {
		          this.loadCnt();
		        }, 100);
		      })
		      .resize(() => {
		        clearTimeout(t);
		        t = setTimeout(() => {
		          this.loadCnt();
		        }, 100);
		      });
		},
		beforeDestroy() {
			window.onresize = null;
		},
		methods: {
      getShopName(query) { // 模糊查询店铺名
        this.getShopNameInput.shopList = []
        //获取筛选客户
        if(!query)
          return;
        this.getShopNameInput.loading = true;
        this.$apiCall('api.Invoice.findStores', {shopName: query}, r => {
          this.getShopNameInput.loading = false;
          if (r.ErrorCode == 9999) {
            this.getShopNameInput.shopList = r.Data.Results;
          }else{
            this.$message({ message: r.Message, type: "error" });
          }
        })
      },
			runReconfirm(type){
				this.DialogReconfirm.isShow = false;
				if(type == 1)
					this.confirmInvoice(this.DialogReconfirm.item);
				if(type == 2)
					this.gotoInvoice(this.DialogReconfirm.item)
			},
			openReconfirm(item){
				this.DialogReconfirm.isShow = true;
				this.DialogReconfirm.item = item;
			},
			confirmInvoice(item){
				this.$set(item, 'confirmLoading', true);
				this.$apiCall('api.Invoice.confirmInvoice', {invoiceId: item.id}, r=>{
					this.$set(item, 'confirmLoading', false);
					if(r.ErrorCode == "9999") {
						this.$elementMessage('success', 'success');
						this.getItem(true, true);
					}else{
						this.$elementMessage(r.Message, 'error');
					}
				});
			},
			filterWaitConfirm(){
				this.cancelStatus = 1;
				this.waitStatus = 1;
				this.filterGetItem();
			},
			exportDeliver(id, type) {
				this.$showLoading();
				this.$apiCall("api.Invoice.exportDeliverTitle", {
					invoiceId: id,
				}, r => {
					if(r.ErrorCode == "9999") {
						let selectedTitles = [];
						for(var i in r.Data.Results.titles) {
							let obj = {};
							obj.key = i;
							obj.orName = r.Data.Results.titles[i];
							obj.name = r.Data.Results.titles[i];
							selectedTitles.push(obj);
						}
						let obj = {}
						selectedTitles.forEach(item => {
							obj[item.key] = item.name
						})

						let param = {
							invoiceId: id,
							titles: obj,
							onlyDelivered:true
						}
						if(type == 2) param.onlyNotSync = true;
						if($("#ifilePro").length == 0) {
							$("body").append(
								'<iframe id="ifilePro" style="display:none"></iframe>'
							);
						}
						let openDownload = url => {
							document.getElementById("ifilePro").src = url;
						};
						this.$apiCall("api.Invoice.exportDeliver", param, r => {
							this.$hideLoading();
							if(r.ErrorCode == "9999") {
								this.$elementMessage("Your request is been submitted, please wait one moment.", 'success');
								openDownload(r.Data.Results.file);
							} else {
								this.$elementMessage(r.Message, 'error');
								if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
									this.$userFailure();
								}
							}
						});
					} else {
						this.$elementMessage(r.Message, 'error');
						if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
							his.$userFailure();
						}
					}
				});
			},
			tableRowClassName({
				row,
				rowIndex
			}) {
				return `data-invocieid invocieid${this.items[rowIndex].id}`
			},
			loadCnt() {
				if(!this.$refs.gridTable) return
				let gridTable = this.$refs.gridTable.bodyWrapper
				let wH = gridTable.scrollHeight; //屏幕高
				let sH = gridTable.scrollTop; //滚动条高
				$(".el-table__body-wrapper .data-invocieid").each(index => {
					let obj = $(".el-table__body-wrapper .data-invocieid").eq(index);
					let objH = $(".el-table__body-wrapper .data-invocieid").eq(index).offset().top-200;
					if(objH < wH + sH && objH > sH) {
						//可见区域
						let invocieid = this.items[index].id;
						this.items.some(li => {
							if(li.id == invocieid) {
								if(!li.isLoadOrderCnt) this.getOrderCnt(invocieid);
							}
						});
					}
				});
			},
			getOrderCnt(sid) {
				let flag = false;
				let isLoad = false;
				let item;
				this.items.some(li => {
					if(li.id == sid) {
						if(li.isLoadOrderCnt) {
							flag = true;
						} else {
							item = li;
						}
						return true;
					}
				});
				if(isLoad) {
					return;
				}
				item.isLoadOrderCnt = 1;
				this.$apiCall("api.Invoice.getSummary", {
					invoiceId: sid,
				}, r => {
					this.$hideLoading();
					if(r.ErrorCode == "9999") {
						this.$set(item, "orderStatusCnt", r.Data.Results);
					} else {
						this.$elementMessage(r.Message, 'error');
						item.isLoadOrderCnt = 2;
					}
				});
			},
			remoteMethodVendor(query) {
				//获取筛选客户
				this.selectArr = [];
				if(!query)
					return;
				this.selectLoading = true;
				this.$apiCall('api.Relationship.findByCustomer', {
					name: query
				}, r => {
					this.selectLoading = false;
					if(r.ErrorCode == 9999) {
						this.selectArr = r.Data.Results;
					} else {
						this.$message({
							message: r.Message,
							type: "error"
						});
					}
				})
			},
			changeCustomerName() {
				if(window.lazy) {
					window.clearTimeout(window.lazy);
				}
				window.lazy = setTimeout(() => {
					this.$apiCall(
						"api.Relationship.findByCustomer", {
							name: this.filterParams.vendorName,
						},
						(r) => {
							if(r.ErrorCode == "9999") {
								this.vendorData = r.Data.Results;
							} else {
								this.$elementMessage(r.Message, "error");
								if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
									this.$userFailure();
								}
							}
						}
					);
				}, 400);
			},
			showPopover() {
				setTimeout(() => {
					$(".customer-input input").focus();
				}, 100);
			},
			selectCustomer(item) {
				this.$refs.popoverCustomer.doClose();
				this.filterParams.relationshipId = item.id;
				this.filterParams.vendorName = item.vendorName;
				this.filterGetItem();
			},
			getVendor() {
				this.$apiCall("api.Relationship.findByCustomer", {}, (r) => {
					if(r.ErrorCode == "9999") {
						this.vendorData = r.Data.Results;
					} else {
						this.$elementMessage(r.Message, "error");
						if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
							this.$userFailure();
						}
					}
				});
			},
			onCopy(e) {
				this.$elementMessage("Has been copied to the clipboard", "success");
			},
			onError(e) {
				this.$elementMessage("Copy to clipboard failed, please copy manually", "error");
			},
			openSend() {
				let num = 0;
				let t = setInterval(() => {
					(function(r, d, s) {
						r.loadSkypeWebSdkAsync =
							r.loadSkypeWebSdkAsync ||
							function(p) {
								var js,
									sjs = d.getElementsByTagName(s)[0];
								if(d.getElementById(p.id)) {
									return;
								}
								js = d.createElement(s);
								js.id = p.id;
								js.src = p.scriptToLoad;
								js.onload = p.callback;
								sjs.parentNode.insertBefore(js, sjs);
							};
						var p = {
							scriptToLoad: "https://swx.cdn.skype.com/shared/v/latest/skypewebsdk.js",
							id: "skype_web_sdk",
						};
						r.loadSkypeWebSdkAsync(p);
					})(window, document, "script");
					num++;
					if(num > 10) clearInterval(t);
				}, 300);
			},
			closeSend() {
				if(this.saveCode) this.selectedSaveDialog.isShow = true;
			},
			saveRemark(type) {
				this.$showLoading();
				this.$apiCall(
					"api.Invoice.saveRemark", {
						uniCode: this.invoiceInfo.uniCode,
						title: type == 1 ? "" : this.shareTitle,
						desc: type == 1 ? "" : this.shareDesc,
					},
					(r) => {
						this.$hideLoading();
						if(r.ErrorCode == "9999") {
							this.shareTitle = r.Data.Results.title;
							this.shareDesc = r.Data.Results.desc;
						} else {
							this.$elementMessage(r.Message, "error");
							if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
								this.$userFailure();
							}
							if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
								this.$userFailure();
							}
						}
					}
				);
			},
			sendtoVendor(item) {
				this.selectedSaveDialog.isShow = false;
				this.$showLoading();
				this.$apiCall(
					"api.Invoice.getShareUrl", {
						invoiceId: item.id,
					},
					(r) => {
						this.$hideLoading();
						if(r.ErrorCode == "9999") {
							this.invoiceInfo = r.Data.Results;
							this.shareTitle = this.invoiceInfo.remark ?
								this.invoiceInfo.remark.title :
								"";
							this.shareDesc = this.invoiceInfo.remark ?
								this.invoiceInfo.remark.desc :
								"";
							this.sendInvoiceOpen = true;
							this.activeShareName = "shareLink";
						} else {
							this.$elementMessage(r.Message, "error");
							if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
								this.$userFailure();
							}
						}
					}
				);
			},
			clearFilter() {
				//清空筛选
				this.selectArr = [];
				this.filterParams = JSON.parse(this.filterParamsDefault);
				if(this.$route.query.page == 1) {
					this.getItem();
				} else {
					this.$router.push({
						query: {
							page: 1
						}
					});
				}
			},
			filterGetItem() {
				//筛选
				if(this.$route.query.page == 1) {
					this.getItem();
				} else {
					this.$router.push({
						query: {
							page: 1
						}
					});
				}
			},
			filterGetItem2(type) {
				if(type == 3){
					this.waitStatus = 0;
					this.cancelStatus = 1;
				}else{
					this.cancelStatus = type;
				}

				//筛选
				if(this.$route.query.page == 1) {
					this.getItem();
				} else {
					this.$router.push({
						query: {
							page: 1
						}
					});
				}
			},
			dateChange() {
				if(this.filterParams.date.length > 1) {
					this.filterParams.dateFrom = moment(
						this.filterParams.date[0]
					).format("YYYY-MM-DD");
					this.filterParams.dateTo = moment(
						this.filterParams.date[1]
					).format("YYYY-MM-DD");
					this.filterGetItem();
				}
			},
			cancelInvoice(item) {
				//作废
				this.$confirm("Are you sure you want to cancel it?", "", {
						confirmButtonText: "OK",
						cancelButtonText: "Cancel",
						type: "error",
					})
					.then(() => {
						this.$apiCall("api.Invoice.cancel", {
							invoiceId: item.id
						}, (r) => {
							if(r.ErrorCode == 9999) {
								this.$message({
									message: "Success",
									type: "success"
								});
								this.getItem(true, true);
							} else {
								this.$message({
									message: r.Message,
									type: "error"
								});
							}
						});
					})
					.catch(() => {});
			},
			getItem(s, re) {
				this.$showLoading();
				let params = {
          page: this.page,
          rowsPerPage: this.rowsPerPage,
          timeFilter: this.filterParams.timeFilter,
          dateFrom: this.filterParams.dateFrom,
          dateTo: this.filterParams.dateTo,
          code: this.filterParams.code,
          status: this.cancelStatus == 2 ? 9 : this.filterParams.status,
          customerRead: this.filterParams.customerRead,
          payStatus: this.filterParams.payStatus,
          relationshipId: this.filterParams.relationshipId,
          trackNumber: this.filterParams.trackNumber,
          codeName: this.filterParams.codeName,
          accountId: this.filterParams.accountId
					}
				if(this.waitStatus)
					params.status = 7
				this.$apiCall(
					"api.Invoice.findByCustomer", params,
					(r) => {
						this.$hideLoading();
						if(r.ErrorCode == 9999) {
							this.items = [];
							r.Data.Results.forEach(item => {
								item.confirmLoading = false;
								this.items.push(item)
							})
							this.total = Number(r.Data.Pagination.totalCount);
							this.totalPage = Number(r.Data.Pagination.totalPage);
							this.$getTableHeight(this);
							if(r.Data.Results.length && r.Data.Results[0].confirmCnt)
								this.waitConfirmCnt = Number(r.Data.Results[0].confirmCnt);
							if(re && !this.items.length && this.waitStatus){
								this.waitStatus = 0;
								this.clearFilter()
							}
							if(!s) this.$refs.gridTable.bodyWrapper.scrollTop = 0;
						} else {
							this.$message({
								message: r.Message,
								type: "error"
							});
						}
					}
				);
			},
			toPage(val) {
				if(val != this.$route.query.page)
					this.$router.push({
						query: {
							page: val
						}
					});
			},
			changePageSize(val) {
				this.rowsPerPage = val;
				localStorage.setItem("c_customerInvoiceRowsPerPage", val);
				this.getItem();
			},
			gotoPage() {
				this.page = this.$route.query.page ? this.$route.query.page : 1;
				this.getItem();
			},
			gotoImport() {
				this.$router.push({
					name: "importData"
				});
			},
			gotoInvoice(item) {
				let routeData = this.$router.resolve({
					path: "/i/" + item.uniCode + "?fromPage=1",
				});
				window.open(routeData.href, "_blank");
			},
		},
	};
</script>
<style scoped="scoped">
	.el-tag {
		margin-right: 10px;
		margin-top: 10px;
	}

	.el-tag.dargDiv {
		cursor: move;
	}

	.el-tag.el-tag--dark {
		cursor: pointer;
	}

	.share-weixin {
		position: relative;
		text-decoration: none;
		background-color: rgb(75, 192, 42);
		height: 28px;
		font-family: Segoe UI Semibold, Segoe WP Semibold, Segoe WP, Segoe UI, Arial, Sans-Serif;
		color: white;
		margin: 1px;
		cursor: pointer;
		box-sizing: content-box;
		border-radius: 14px;
		padding: 0 14px;
		line-height: 28px;
		margin-right: 30px;
		display: inline-block;
	}

	.share-weixin:hover {
		background-color: rgb(26, 173, 25);
	}

	.share-download {
		background-color: #5c6ac4;
		border-color: #3f4eae;
	}

	.share-download:hover {
		background: #7d88d0;
		border-color: #6571be;
	}

	.el-divider--horizontal.export-line {
		height: 30px;
		margin-top: 0;
		margin-bottom: 0;
		background-color: rgb(233, 233, 235);
		box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
	}

	.el-card .invoice-bottom .el-divider--horizontal[data-v-5a9e3b63] {
		margin: 20px -20px 20px 20px;
	}
	.label-primary{
		color: #5c6ac4;
	}
</style>
<style lang="scss" scoped>
.top-warning{
	height: 50px;
	border: 1px #E6A23C solid;
	border-left-width: 4px;
	.c-title{
		line-height: 22px;
		i{
			margin-right: 5px;
			color: #606266;
			font-size: 16px;
		}
		b{
			color: #606266;
		}
	}
}
</style>
<style>
.el-alert.el-alert--info i.el-alert__icon.el-icon-info{
	color: #5c6ac4!important;
}
</style>
