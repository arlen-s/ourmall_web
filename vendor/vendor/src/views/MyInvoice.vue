<template>
  <div class="contentpanel my-invoice-page">
    <div
      class="pagetitle"
      ref="pageHeader"
    >
      <div class="left d-flex align-items-center">
        <div class="title" style="margin-right: 20px;">
          <i class="el-icon-s-order"></i>
          <h2>{{$t('myinvoice.purchaseOrders')}}</h2>
        </div>
        <div style="margin-top: 8px;">
          <!--<el-checkbox v-model="cancelStatus" @change="filterGetItem">显示取消状态采购单</el-checkbox>-->
          <el-link v-if="cancelStatus == 1" type="primary" @click="filterGetItem2(2)">{{$t('myinvoice.viewCancelled')}}</el-link>
          <el-link v-if="cancelStatus == 2" type="primary" @click="filterGetItem2(1)">{{$t('myinvoice.viewAll')}}</el-link>
				</div>
      </div>
      <div class="right">
        <el-button
          type="primary"
          size="medium"
          @click="gotoImport"
        >{{$t('myinvoice.createCus')}}</el-button>
      </div>
    </div>
    <div
      class="pagebody"
      v-loading="loading"
    >
      <el-row
        :gutter="15"
        class=" mg-b-20"
      >
        <el-col :span="24">
          <el-card>
            <el-row :gutter="20">
              <el-col :span="24">
                <div ref="pageFilter"  class="page-filter">
                  <el-form
                    :inline="true"
                    size="mini"
                  >
                    <el-form-item class=" mg-r-5" label="#">
                      <el-input
                        style="width: 120px;"
                        v-model="filterParams.code"
                        :placeholder="$t('myinvoice.invoiceNum')"
                        @keyup.enter.native="filterGetItem"
                      ></el-input>
                    </el-form-item>
                    <el-form-item class=" mg-r-5">
                      <el-select
                        filterable
                        remote
                        :remote-method="remoteMethodCustom"
                        :loading="selectLoading"
                        :placeholder="$t('myinvoice.pleaseCusName')"
                        v-model="filterParams.id"
                        @change="filterGetItem"
                      >
                        <el-option
                          v-for="opt in selectArr"
                          :key="opt.id"
                          :label="opt.customerName"
                          :value="opt.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item class=" mg-r-5">
                      <el-select
                        filterable
                        remote
                        :remote-method="getShopName"
                        :loading="getShopNameInput.loading"
                        placeholder="请输入查询店铺名"
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

                    <el-form-item class=" mg-r-5">
                      <el-input
                        style="width: 120px;"
                        v-model="filterParams.trackNumber"
                        :placeholder="$t('myinvoice.losNum')"
                        @keyup.enter.native="filterGetItem"
                      ></el-input>
                    </el-form-item>
                    <el-form-item class=" mg-r-5">
                      <el-input
                        style="width: 120px;"
                        v-model="filterParams.codeName"
                        :placeholder="$t('myinvoice.shopifyNum')"
                        @keyup.enter.native="filterGetItem"
                      ></el-input>
                    </el-form-item>
                    <el-form-item class=" mg-r-20">
                      <el-select
                        class=" mg-r-5"
                        style="width: 170px"
                        v-model="filterParams.timeFilter"
                        :placeholder="$t('myinvoice.filterTime')"
                      >
                        <el-option
                          v-for="opt in filterParams.timeOption"
                          :key="opt.value"
                          :label="opt.label"
                          :value="opt.value"
                        ></el-option>
                      </el-select>
                      <el-date-picker
                        v-if="filterParams.timeFilter"
                        value-format="yyyy-MM-dd"
                        v-model="filterParams.date"
                        @change="dateChange"
                        type="daterange"
                        align="right"
                        unlink-panels
                        :range-separator="$t('myinvoice.to')"
                        :start-placeholder="$t('myinvoice.startDate')"
                        :end-placeholder="$t('myinvoice.endDate')"
                      >
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item :label="$t('myinvoice.orderStatus')">
                      <el-select
                        v-model='filterParams.status'
                        :placeholder="$t('myinvoice.pleaseSelect')"
                        @change="filterGetItem"
                      >
                        <el-option
                          :label="$t('importdata.all')"
                          value=""
                        ></el-option>
                        <el-option v-for="opt in $dict.invoiceStatus" v-if="opt.val != 9"
                          :key="opt.text"
                          :label="$t(opt.text)"
                          :value="opt.val"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-button
                        type="primary"
                        @click="filterGetItem"
                      >{{$t('myinvoice.filter')}}</el-button>
                      <el-button
                        type="danger"
                        @click="clearFilter"
                      >{{$t('myinvoice.clear')}}</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
            <el-table
              :data="items"
              row-key="id"
              stripe
              style="width: 100%"
              :height="tableHeight"
              ref="gridTable"
              :row-class-name="tableRowClassName"
            >
              <el-table-column
                :label="$t('myinvoice.invoiceNum')"
                prop="code"
                width="250"
              >
              <template slot-scope="scope">
                <div class="d-flex align-items-center">
                  {{scope.row.code}}
                  <template v-if="scope.row.status != 4 && scope.row.status != 5 && scope.row.status != 6">
                  <el-tooltip placement="top">
                    <div slot="content">
                      <template v-if="scope.row.extraJson && scope.row.extraJson.importErrorLog && scope.row.extraJson.importErrorLog.length">
                        <p v-for="log in scope.row.extraJson.importErrorLog">
                          {{log}}
                        </p>
                      </template>
                  </div>
                    <i v-if="scope.row.importError == 1" style="font-size: 14px;margin-left: 5px;" class="el-icon-warning tx-danger"></i>
									</el-tooltip>
									</template>
                </div>
                <p class="tx-gray-600" style="white-space: nowrap;">
                    <span v-html="$t('myinvoice.includeNum',{num: Number(scope.row.orderCnt)})"></span>
                     /
                    <el-popover
                      v-if="scope.row.totalCnt"
                      trigger="hover"
                      placement="right"
                    >
                      <div slot v-loading="scope.row.loadCnt" style=" min-height: 50px; font-size: 12px;">
                        <div style="margin-bottom: 5px;">{{$t('myinvoice.totalOrders')}}<b>{{scope.row.totalCnt}}</b> {{$t('myinvoice.pros')}}</div>
                        <template v-if="scope.row.cnt">
                          <div style="margin-bottom: 15px; padding-left: 10px;">
                            <div v-for="(n,k) in scope.row.cnt" :key="k">
                              <span style="white-space: nowrap;">{{n.name}} :</span> <span style=" color: #606266;white-space: nowrap;">{{n.cnt}}</span>
                            </div>
                          </div>
                          <div style="text-align: right;">
                            <a href="javascript:;" style="color: #5c6ac4;"
                              v-clipboard:copy="scope.row.cntText"
                              v-clipboard:success="cntOnCopy"
                              v-clipboard:error="cntOnError"
                            >{{$t('myinvoice.copyData')}}</a>
                          </div>
                        </template>
                      </div>
                      <a
                        slot="reference"
                        href="javascript:;"
                        style="color: #5c6ac4;"
                        @mouseenter="getCntCountry(scope.row)"
                      >{{scope.row.totalCnt}}</a>
                    </el-popover>
                    <span v-else style="color: #606266;">0</span>
                    {{$t('myinvoice.pros')}}
                    /
                    <el-popover
                      trigger="hover"
                      placement="right"
                      v-if="scope.row.shops.length"
                    >
                      <div style=" min-height: 50px; font-size: 12px;">
                        <div style="margin-bottom: 5px;">总共店铺数：<b>{{scope.row.shops.length}}</b>店铺</div>
                        <div :key="item.id" v-for="item in scope.row.shops">{{item.shopName}}</div>
                      </div>
                      <a
                        slot="reference"
                        href="javascript:;"
                        style="color: #5c6ac4;"
                      >{{scope.row.shops.length}}</a>
                    </el-popover>
                    <span v-else style="color: #606266;">0</span>
                    个店铺
                </p>
<!--                <p class="tx-gray-600" style="white-space: nowrap;">-->
<!--                -->
<!--                </p>-->
              </template>

              </el-table-column>
              <el-table-column
                :label="$t('myinvoice.cus')"
                prop="customerName"
                width="150"
              >
                <template slot-scope="scope">
                  <div>{{scope.row.customerName}}</div>
                  <div>{{scope.row.customerRemark}}</div>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('myinvoice.skuKinds')"
                prop="itemCnt"
                align="center"
                width="120"
              >
              </el-table-column>
              <el-table-column
                :label="$t('myinvoice.originalAndDiscount')"
                width="250"
              >
                <template slot-scope="scope">
                  <div v-if="Number(scope.row.totalAmount)">US$ {{scope.row.totalAmount}}</div>
                  <div v-else>{{$t('myinvoice.setUp')}}</div>
                  <div class=" tx-success">- US$ {{(Number(scope.row.totalAmount) - Number(scope.row.realAmount)).toFixed(2)}}</div>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('myinvoice.actualAmount')"
                prop="realAmount"
                width="200"
                align="right"
              >
                <template slot-scope="scope">
                  <span class=" tx-danger">
                  	<span v-if="Number(scope.row.realAmount)">US$ {{scope.row.realAmount}}</span>
                  	<div v-else>{{$t('myinvoice.setUp')}}</div>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('myinvoice.statistics')"
                width="200"
              >
                <template slot-scope="scope">

                  <div style="white-space: nowrap;">
                    <span class="">{{$t('myinvoice.shippedAndDelivered')}}</span>
                    <span>{{scope.row.orderStatusCnt ? scope.row.orderStatusCnt.undeliveredCnt : '---'}}</span> /
                    <span>{{scope.row.orderStatusCnt ? scope.row.orderStatusCnt.deliveredCnt : '---'}}</span>
                  </div>
                  <div style="white-space: nowrap;" v-if="scope.row.orderStatusCnt && Number(scope.row.orderStatusCnt.notSyncCnt) > 0">
										<template>
											<span class="tx-warning">
												<el-popover
											    placement="bottom"
											    :title="$t('myinvoice.Download')"
											    width="500"
											    trigger="hover">
											    <div class="mg-t-15 mg-b-15" style="white-space: nowrap;">
											    	<span class=" tx-gray-600">{{$t('myinvoice.shippedquantity')}} </span>
			                    	<a href="javascript:;">{{scope.row.orderStatusCnt ? scope.row.orderStatusCnt.deliveredCnt : '---'}}</a>
														<span v-if="scope.row.orderStatusCnt && Number(scope.row.orderStatusCnt.notSyncCnt) > 0" class="mg-l-10">
															（<a href="javascript:;">{{scope.row.orderStatusCnt ? Number(scope.row.orderStatusCnt.notSyncCnt) : '---'}}</a>
															{{$t('myinvoice.syncShopify')}}）
														</span>
													</div>
													<el-alert class="icon-color" :closable="false" :title="$t('myinvoice.Downloadtext')" type="info" show-icon>
													</el-alert>
													<div class="mg-t-15 d-flex justify-content-center">
														<el-button type="primary" size="small" @click="exportDeliver(scope.row.id,1)">{{$t('myinvoice.Downloadall')}}</el-button>
														<el-button v-if="scope.row.orderStatusCnt && Number(scope.row.orderStatusCnt.notSyncCnt) > 0" type="primary" size="small" @click="exportDeliver(scope.row.id,2)">{{$t('myinvoice.Downloadallunsync')}}</el-button>
													</div>
													<a slot="reference" href="javascript:;">{{scope.row.orderStatusCnt ? Number(scope.row.orderStatusCnt.notSyncCnt) : '---'}}</a>
												</el-popover>
													{{$t('myinvoice.syncShopify')}}
											</span>
										</template>
									</div>
									<div style="white-space: nowrap;" v-if="scope.row.orderStatusCnt && Number(scope.row.orderStatusCnt.abnormalCnt) > 0 && scope.row.status != 6">
                    <span class=" tx-danger">{{scope.row.orderStatusCnt ? scope.row.orderStatusCnt.abnormalCnt : '---'}}</span> {{$t('myinvoice.abnormal')}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('myinvoice.status')"
                width="180"
              >
                <template slot-scope="scope">
                  <span
                    v-if="$dict.invoiceStatus[scope.row.status]"
                    :class="`tx-${$dict.invoiceStatus[scope.row.status].type}`"
                  >{{$t($dict.invoiceStatus[scope.row.status].text)}}</span>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('myinvoice.dateTime')"
                width="250"
              >
                <template slot-scope="scope">
                  <div v-if="scope.row.timeCreated" style="white-space: nowrap;">
                    <span class=" tx-gray-600">{{$t('myinvoice.orderCreate')}}</span>
                    <span>{{$moment.unix(scope.row.timeCreated).format("YYYY-MM-DD HH:mm:ss")}}</span>
                  </div>
                  <div v-if="scope.row.timeRead" style="white-space: nowrap;">
                    <span class=" tx-gray-600">{{$t('myinvoice.orderPaid')}}</span>
                    <span>{{$moment.unix(scope.row.timeRead).format("YYYY-MM-DD HH:mm:ss")}}</span>
                  </div>
                  <div v-if="scope.row.timePaid" style="white-space: nowrap;">
                    <span class=" tx-gray-600">{{$t('myinvoice.orderConfirm')}}</span>
                    <span>{{$moment.unix(scope.row.timePaid).format("YYYY-MM-DD HH:mm:ss")}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                :label="$t('myinvoice.action')"
                width="120"
              >
                <template slot-scope="scope">
                  <div>
                  	<el-dropdown
                      v-if="scope.row.status != 3 && scope.row.status != 4 && scope.row.status != 5 && scope.row.status != 6 && scope.row.status != 9"
                      size="mini"
                      split-button
                      type="text"
                      @click="gotoInvoice(scope.row)"
                      @command="handleCommand"
                    >
										  {{$t('myinvoice.viewDetail')}}
										  <el-dropdown-menu slot="dropdown">
										    <el-dropdown-item :command="beforeHandleCommand(scope.row,'b')">{{$t('myinvoice.exportShopify')}}</el-dropdown-item>
										    <el-dropdown-item :command="beforeHandleCommand(scope.row,'a')">{{$t('myinvoice.importInfo')}}</el-dropdown-item>
										    <!--<el-dropdown-item :command="beforeHandleCommand(scope.row,'c')">导出采购订单</el-dropdown-item>-->
										  </el-dropdown-menu>
										</el-dropdown>
                    <el-link v-else style="font-size: 12px;"
                      type="primary"
                      @click="gotoInvoice(scope.row)"
                    >{{$t('myinvoice.viewDetail')}}</el-link>
                  </div>
                  <div v-if="scope.row.status != 9 && scope.row.status != 1"
									>
                    <el-link style="font-size: 12px;"
											:disabled="scope.row.submitLoading"
                      type="primary"
                      @click="sendInvoice(scope.row)"
                    >{{$t('myinvoice.sendCus')}}</el-link>
                  </div>
                  <div v-if="scope.row.status != 1 && scope.row.status != 2 && scope.row.status != 3">
                    <el-link style="font-size: 12px;"
                      type="primary"
                      @click="handleCommandFn(scope.row,'c')"
                    >{{$t('myinvoice.exportt')}}</el-link>
                  </div>
                  <!--scope.row.status != 9 && scope.row.status != 1-->
                  <div v-if="scope.row.status == 1  || scope.row.status == 2">
                    <el-link style="font-size: 12px;"
                      type="danger"
                      @click="cancelInvoice(scope.row)"
                    >{{$t('myinvoice.cancelOrder')}}</el-link>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
      <el-row
        v-if="items.length"
        :gutter="20"
        ref="pageFooter"
      >
        <el-col
          :span="24"
          class=" d-flex justify-content-center"
        >
          <div>
          	<el-pagination :current-page="page" :background="true" layout="sizes, total, prev, pager, next, jumper" :page-sizes="pageSizes" :page-size="rowsPerPage" :total="Number(total)" @current-change="toPage" @size-change="changePageSize">
					</el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog width="80%" :title="exportInvoiceType == 'b' ? $t('myinvoice.exportShopify') : $t('myinvoice.exportOrder')" :visible.sync="innerVisible">
			<div class="modal-export">
				<el-divider></el-divider>
				<div class="border-bottom-1 mg-b-15 pd-b-15">
					<h6 class="mg-b-15" style="border-left: 4px solid #3F4EAE;padding-left: 10px;">{{$t('myinvoice.exportFields')}}<span class="mg-l-5">{{$t('myinvoice.dragging')}}</span></h6>
					<div class=" draggable-wrap">
						<draggable :list="modalCustomExport.selectedTitles" draggable=".dargDiv" :options="{animation: 300}" group="tags">
							<el-tag class="dargDiv" v-for="(title, index) in modalCustomExport.selectedTitles" :key="title.name" closable :disable-transitions="false" @close="removeTitle(index)">
								{{title.name}}
							</el-tag>
						</draggable>
						<div v-if="!modalCustomExport.selectedTitles.length" class=" w-100 justify-content-center">
							<span style="color: #F56C6C;">{{$t('myinvoice.PleaseSelectBelow')}}</span>
						</div>
					</div>
				</div>
				<el-divider></el-divider>
				<div class="border-bottom-1 mg-b-15 pd-b-15">
					<h6 class="mg-b-15" style="border-left: 4px solid #3F4EAE;padding-left: 10px;">{{$t('myinvoice.optionalfields')}} <span style="color: #F56C6C;" class=" tx-danger tx-12">{{$t('myinvoice.notExport')}}</span></h6>
					<div class="tag-wrap">
						<draggable :list="modalCustomExport.unselectedTitles" draggable=".uns-tag" :options="{animation: 300}" group="tags">
							<el-tag v-for="(title, index) in modalCustomExport.unselectedTitles" :key="title.orName" effect="dark" @click="selectTitle(index)">
								{{title.orName}}
							</el-tag>

						</draggable>
					</div>
				</div>
				<el-divider></el-divider>
				<div class="border-bottom-1 mg-b-15 pd-b-15">
					<h6 class="mg-b-15" style="border-left: 4px solid #3F4EAE;padding-left: 10px;">
					{{$t('myinvoice.customField')}}
					<el-tooltip class="item" effect="dark" :content="$t('myinvoice.rename')" placement="top">
						<i style="color: #5C6AC4;text-decoration: none;" class="fa fa-question-circle-o"></i>
					</el-tooltip>
					<a style="color: #5C6AC4;text-decoration: none;" class="mg-l-20" href="javascript:;" @click="showCustom = !showCustom">{{showCustom ? $t('myinvoice.hideFields') : $t('myinvoice.showFields')}}</a>
				</h6>
					<div class="row custom-wrap" :class="{hide: !showCustom}">
						<el-row :gutter="20" style="margin: 0;">
							<el-col :span="12" v-for="title in modalCustomExport.selectedTitles" :key="title.orName" style="margin-top: 10px;">
								<div class="grid-content" style="display: flex;align-items: center;">
									<label style="width: 200px;white-space: nowrap;text-align: right;margin-right: 10px;color: #999;">[{{title.orName}}]{{$t('myinvoice.showAs')}}：</label>
									<div class="col-6">
										<el-input :placeholder="title.orName" size="small" v-model="title.name">
										</el-input>
									</div>
								</div>
							</el-col>
						</el-row>
					</div>
				</div>
				<el-divider></el-divider>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button size="small" @click="innerVisible = false">{{$t('myinvoice.discard')}}</el-button>
				<el-button type="primary" size="small" @click="saveCustomExportSettingOnly">{{$t('myinvoice.saveSetting')}}</el-button>

        <template v-if="exportItem.payStatus != 1 && exportInvoiceType == 'c'">
					<el-tooltip class="item" effect="dark" placement="top">
						<div slot="content">
							{{$t('myinvoice.confirmReceipt')}}
						</div>
						<el-button type="success" size="small" style="background-color: #b3e19d;border-color: #b3e19d;cursor: not-allowed;">
							{{$t('myinvoice.saveSettingExcel')}}
						</el-button>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" placement="top">
						<div slot="content">
							{{$t('myinvoice.confirmReceipt')}}
						</div>
						<el-button type="success" size="small" style="background-color: #b3e19d;border-color: #b3e19d;cursor: not-allowed;">
							{{$t('myinvoice.saveSettingCsv')}}
						</el-button>
					</el-tooltip>
				</template>
				<template v-else>
					<el-button type="success" size="small" @click="saveCustomExport('1')">{{$t('myinvoice.saveSettingExcel')}}</el-button>
          <el-button type="success" size="small" @click="saveCustomExport('2')">{{$t('myinvoice.saveSettingCsv')}}</el-button>
				</template>
			</div>
		</el-dialog>
		<el-dialog @open="openSkype" custom-class="sendInvoice" :title="$t('myinvoice.sendInvoice')" :visible.sync="sendInvoiceOpen" width="50%">
				<!--<el-divider></el-divider>-->
				<template>
					<div style="position: relative; z-index: 1;">
					<div style="position: absolute;
    right: 30px;
    top: 15px;">
						<el-switch
							v-model="showItemPrice"
							@change="changeShowItemPrice"
						>
						</el-switch>
						{{$t('myinvoice.showPrice')}}
					</div>
					</div>
					<el-tabs v-model="activeShareName" type="card" style="margin-left: 20px;margin-top: 10px;">

						<el-tab-pane name="shareLink">
							<span slot="label"><i class="iconfont icon-link"></i> {{$t('myinvoice.shareLink')}}</span>
							<div class="d-flex mg-y-20">
								<div style="color: #999;width: 150px;text-align: right;margin-right: 10px;white-space: nowrap;">{{$t('myinvoice.shareUrl')}}</div>
								<div>
									<!--<el-link :underline="false" :href="invoiceInfo.url" target="_blank">{{invoiceInfo.url}}</el-link>-->
									<span>{{invoiceInfo.url}}</span>
								</div>
							</div>
							<div class="d-flex mg-y-20">
								<div style="color: #999;width: 150px;text-align: right;margin-right: 10px;white-space: nowrap;"></div>
								<div>
									<div>
										<el-button size="mini" type="success" v-clipboard:copy="invoiceInfo.url" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('myinvoice.shareCopy')}}</el-button>
									</div>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane name="shareWeixin">
							<span slot="label"><i class="iconfont icon-shejiao"></i> {{$t('myinvoice.showApp')}}</span>
							<div>
								<div class="d-flex mg-y-20">
									<div style="color: #999;width: 150px;text-align: right;margin-right: 10px;white-space: nowrap;">{{$t('myinvoice.setTitle')}}</div>
									<div style="width: 70%;">
										<el-input @change="saveRemark('2')" type="text" size="small" v-model="shareTitle"></el-input>
									</div>
								</div>
								<div class="d-flex mg-y-20 align-items-center">
									<div style="color: #999;width: 150px;text-align: right;margin-right: 10px;white-space: nowrap;">{{$t('myinvoice.setContent')}}</div>
									<div style="width: 70%;">
										<el-input @change="saveRemark('2')" type="textarea" resize="none" :autosize="{ minRows: 3, maxRows: 6}" size="small" v-model="shareDesc"></el-input>

									</div>
								</div>
								<div class="d-flex mg-y-20">
									<div style="color: #999;width: 150px;text-align: right;margin-right: 10px;white-space: nowrap;">{{$t('myinvoice.setType')}}</div>
									<div style="width: 70%;" class="d-flex">
										<div style="margin-right: 30px;" class="skype-share" :data-href="shareTitle + shareDesc" data-lang="en-US" :data-text="invoiceInfo.url" data-style="large"></div>
										<div>
											<el-tooltip placement="bottom">
												<div slot="content">
													<p class="tx-center mg-b-10">{{$t('myinvoice.scan')}}</p>
													<img :src="invoiceInfo.qrcodeBase64" width="130" />
													<img src="images/weixin.png" width="30px" style="position: absolute;left: 50%;top: 50%;margin-left: -15px;margin-top: -4px;" />
												</div>
												<a class="share-weixin" href="javascript:;">
													<i class="fa fa-weixin"></i> {{$t('myinvoice.share')}}
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
						<el-button v-show="activeShareName == 'shareWeixin'" size="small" type="primary" plain @click="saveRemark('1')">{{$t('myinvoice.reset')}}</el-button>
					</div>
					<div>
						<el-button size="small" @click="sendInvoiceOpen = false">{{$t('myinvoice.cancel')}}</el-button>
						<el-button size="small" type="primary" @click="invoicePreview(invoiceInfo.url)">{{$t('myinvoice.previewInvocie')}}</el-button>
					</div>

				</div>
			</el-dialog>
			<el-dialog title="您当前采购订单中有 0 元供货价的商品"
				:visible.sync="dialogZeroAlert.isShow"
				width="600px"
			>
				<div style=" padding: 0 20px;">
					<div class=" mg-b-10">
						您当前的采购订单中有设置为 0 元供货价的商品：
					</div>
					<div v-for="item in dialogZeroAlert.items" :key="item.id"
						style=" margin-bottom: 5px; padding-left: 15px; color: #909399;">
						{{item.codeName}} - {{item.sku}} × {{item.quantity}}
					</div>
					<div class=" mg-t-30">
						<el-alert
							title="确定要发送当前发票发送给客户吗"
							type="warning"
							:closable="false">
						</el-alert>
					</div>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button size="small" @click="dialogZeroAlert.isShow = false">
						我再看看
					</el-button>
					<el-button
						size="small"
						type="primary"
						:loading="dialogZeroAlert.loading"
						@click="toSendInvoice(dialogZeroAlert.invoice, true)">
						确定
					</el-button>
				</div>
			</el-dialog>
  </div>
</template>

<script>
	import draggable from "vuedraggable";
export default {
  data() {
    return {
      getShopNameInput: {
        loading: false,
        shopList: []
      },
      orderOtherStatus: 0, // 订单其他状态
      loading: false,
      reSizeTime: 0,
      tableHeight: 400,
      pageSizes: [10, 20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("myInvoiceRowsPerPage")
        ? Number(localStorage.getItem("myInvoiceRowsPerPage"))
        : 10,
      items: [],
      total: 0,
      totalPage: 0,
      filterParams: {
        timeOption: [
          { label: this.$t('myinvoice.createdTime'), value: "timeCreated"},
          { label: this.$t('myinvoice.confirmedTime'), value: "timePaid" },
          { label: this.$t('myinvoice.downloadTime'), value: "timeApiGet" },
          { label: this.$t('myinvoice.paidTime'), value: "timeRead" },
        ],
        timeFilter: "", //时间筛选
        date: [],
        dateFrom: "",
        dateTo: "",
        code: "",
        status: this.$route.query.status ? Number(this.$route.query.status) : "",
        customerRead: "",
        payStatus: "",
        name: "",
        id:"",
        trackNumber:"",
        codeName:"",
        accountId:"",
      },
      selectLoading: false,
      selectArr: [],
      selectedCustomerId: '',
      cancelStatus: 1,
      innerVisible: false,
      showCustom: false,
      modalCustomExport: {
				tags: [],
				selectedTitles: [],
				unselectedTitles: [],
			},
			modalCustomExportDefault: '',
			exportItem: '',
			exportInvoiceType:'',
			sendInvoiceOpen: false,
			activeShareName: "shareLink",
			showCustom: false,
			shareTitle: "",
			shareDesc: "",
			showDownloadInvoice: false,
			stopResource: "1",
			activeConfirm: "confirmErp",
			showItemPrice: true,
			invoiceInfo:"",
			dialogZeroAlert: {
				isShow: false,
				loading: false,
				items: [],
				invoice: null,
			},
			dialogZeroAlertDefault:'{}'
    };
  },
  watch: {
   items() {
      this.items.forEach((e, i) => {
        if (!e.isLoadOrderCnt) e.isLoadOrderCnt = 0;
      });
      setTimeout(() => {
        this.loadCnt();
      }, 500);
    },
    $route: "gotoPage"
  },
  components: {
		draggable,
	},
  mounted() {
		this.dialogZeroAlertDefault = JSON.stringify(this.dialogZeroAlert);
//  this.filterParams.status = this.$route.query.status
//    ? this.$route.query.status
//    : "";
    console.log(this.$route.query.orderStatus != null)
    if (this.$route.query.orderStatus != null) {
      const { orderStatus } = this.$route.query;
      if (Number(orderStatus) >= 10) {
        this.orderOtherStatus = Number(orderStatus)
      } else {
        this.filterParams.status = Number(orderStatus)
      }
    }
    this.filterParamsDefault = JSON.stringify(this.filterParams);
    if (this.$route.params.id) {
      this.filterParams.name = this.$route.params.customerName ? this.$route.params.customerName : '';
      this.filterParams.id = this.$route.params.id ? this.$route.params.id : '';
      this.selectArr = [{
        id: this.$route.params.id,
        customerName: this.$route.params.customerName
      }];
    }
    this.getItem();
    window.onresize = () => {
      this.$getTableHeight(this);
    };
    this.modalCustomExportDefault = JSON.stringify(this.modalCustomExport);
    let gridTable = this.$refs.gridTable.bodyWrapper
		gridTable.onscroll = () => {
				setTimeout(() => {
          this.loadCnt();
        }, 100);
		}
		let t;
      $(window).scroll(() => {
        clearTimeout(t);
        t = setTimeout(() => {
          this.loadCnt();
        }, 100);
      }).resize(() => {
        clearTimeout(t);
        t = setTimeout(() => {
          this.loadCnt();
        }, 100);
      });
  },
  beforeDestroy() {
    window.onresize = () => {};
  },
  methods: {
    getShopName(query) { // 模糊查询店铺名
      this.getShopNameInput.shopList = []
      //获取筛选客户
      if(!query)
        return;
      this.getShopNameInput.loading = true;
      this.$apiCall('api.Invoice.findStoreByVendor', {shopName: query}, r => {
        this.getShopNameInput.loading = false;
        if (r.ErrorCode == 9999) {
          this.getShopNameInput.shopList = r.Data.Results;
        }else{
          this.$message({ message: r.Message, type: "error" });
        }
      })
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
              this.$elementMessage("下载成功", 'success');
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
    cntOnError(){
      this.$elementMessage(this.$t('myinvoice.copyFailed'), 'error');
    },
    cntOnCopy(){
      this.$elementMessage(this.$t('myinvoice.copyItems'), 'success');
    },
    getCntCountry(item){
      if(!item.cnt)
        item.loadCnt = true;
      this.$apiCall("api.Invoice.getItemsCountry", {invoiceId: item.id}, r => {
        item.loadCnt = false;
        if(r.ErrorCode == "9999") {
          item.cnt = r.Data.Results;
          let txt = `总共采购商品数：${item.totalCnt},`
          Object.keys(r.Data.Results).forEach(k => {
            txt += `${r.Data.Results[k].name}: ${r.Data.Results[k].cnt},`
          })
          item.cntText = txt.slice(0, txt.length - 1);
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
          if (!this.$refs.gridTable) return
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
      onCopy(e) {
				this.$elementMessage(this.$t('successfullyToClipboard'), 'success');
			},
			onError(e) {
				this.$elementMessage(this.$t('failedToClipboard'), 'error');
			},
      saveRemark(type) {
				this.$showLoading();
				this.$apiCall("api.Invoice.saveRemark", {
					uniCode: this.invoiceInfo.uniCode,
					title: type == 1 ? "" : this.shareTitle,
					desc: type == 1 ? "" : this.shareDesc,
				}, r => {
					this.$hideLoading();
					if(r.ErrorCode == "9999") {
						this.shareTitle = r.Data.Results.title;
						this.shareDesc = r.Data.Results.desc;
						//						this.getData();
					} else {
						this.$elementMessage(r.Message, 'error');
						if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
							this.$userFailure(this);
						}
					}
				});
			},
      invoicePreview(url) {
				let newWin = window.open("/blank.html", "invoicePreview");
				newWin.location.href = url;
			},
      openSkype() {
				let num = 0
				let t = setInterval(() => {
					(function(r, d, s) {
						r.loadSkypeWebSdkAsync = r.loadSkypeWebSdkAsync || function(p) {
							var js, sjs = d.getElementsByTagName(s)[0];
							if(d.getElementById(p.id)) {
								return;
							}
							js = d.createElement(s);
							js.id = p.id;
							js.src = p.scriptToLoad;
							js.onload = p.callback
							sjs.parentNode.insertBefore(js, sjs);
						};
						var p = {
							scriptToLoad: "https://swx.cdn.skype.com/shared/v/latest/skypewebsdk.js",
							id: "skype_web_sdk"
						};
						r.loadSkypeWebSdkAsync(p);
					})(window, document, "script");
					num++;
					if(num > 10) clearInterval(t)
				}, 300);
			},
      toSendInvoice(item, close){
        this.showItemPrice = item.showItemPrice == '1' ? true : false;
        this.sendInvoiceOpen = true;
        this.activeShareName = "shareLink";
        if(close)
          this.dialogZeroAlert.loading = true;
        this.$apiCall(
          "api.Invoice.getShareUrl",
          {
            invoiceId: item.id,
          },
          (r) => {
            this.$hideLoading();
            if (r.ErrorCode == "9999") {
              this.invoiceInfo = r.Data.Results;
              this.shareTitle = this.invoiceInfo.remark
                ? this.invoiceInfo.remark.title
                : "";
              this.shareDesc = this.invoiceInfo.remark
                ? this.invoiceInfo.remark.desc
                : "";
              this.sendInvoiceOpen = true;
              this.activeShareName = "shareLink";
              if(close)
                this.dialogZeroAlert.isShow = false;
            } else {
              this.$elementMessage(r.Message, "error");
              if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                this.$userFailure();
              }
            }
          }
        );
      },
      sendInvoice(item) {
        item.submitLoading = true;
        this.$apiCall('api.Invoice.checkItemPrice', {invoiceId: item.id}, r => {
            item.submitLoading = false;
          if (r.ErrorCode == "9999") {
            let re = r.Data.Results;
            if(re.noSkuArr.length || re.nullPriceArr.length || re.zeroPriceArr.length){
              this.dialogZeroAlert = JSON.parse(this.dialogZeroAlertDefault);
              this.dialogZeroAlert.items = re.noSkuArr.concat(re.noSkuArr, re.nullPriceArr, re.zeroPriceArr)
              this.dialogZeroAlert.isShow = true;
              this.dialogZeroAlert.invoice = item;
            }else{
              this.toSendInvoice(item);
            }
          }else{
            this.$elementMessage(r.Message, "error");
          }
        });
      },
      changeShowItemPrice(){
        this.$apiCall('api.Invoice.setShowPrice', {
          uniCode: this.invoiceInfo.uniCode
        }, r => {
          if(r.ErrorCode == "9999") {
            this.getItem(true);
          }else{
            this.showItemPrice = !this.showItemPrice;
            this.$elementMessage(r.Message, "error");
          }
        });
      },
      selectTitle(i) {
        this.modalCustomExport.selectedTitles.push(
          this.modalCustomExport.unselectedTitles[i]
        );
        this.modalCustomExport.unselectedTitles.splice(i, 1);
      },
      removeTitle(i) {
        this.modalCustomExport.unselectedTitles.unshift(
          this.modalCustomExport.selectedTitles[i]
        );
        this.modalCustomExport.selectedTitles.splice(i, 1);
      },
      saveCustomExport(type) {
//				if(!this.modalCustomExport.selectedTitles.length) {
//					this.$elementMessage("至少要选择一个字段", "error");
//					return false;
//				}
//				if(
//					this.modalCustomExport.selectedTitles.some(e => {
//						return !e.name;
//					})
//				) {
//					this.$elementMessage("自定义表头名不得为空", "error");
//					return false;
//				}
				this.saveCustomExportSettingOnly(type);
//				this.uploadLoading = true;
//				let obj = {}
//				this.modalCustomExport.selectedTitles.forEach(item => {
//					obj[item.key] = item.name
//				})
//				if($("#ifilePro").length == 0) {
//					$("body").append(
//						'<iframe id="ifilePro" style="display:none"></iframe>'
//					);
//				}
//				let openDownload = url => {
//					document.getElementById("ifilePro").src = url;
//				};
//				let apiUrl = this.exportInvoiceType == "b" ? "api.Invoice.exportInvoice" : "api.Invoice.exportOrder";
//				this.$apiCall(apiUrl, {
//					titles: obj,
//					invoiceId: this.exportItem.id,
//					type: type == 1 ? 'excel' : 'csv'
//				}, r => {
//					this.uploadLoading = false;
//					if(r.ErrorCode == "9999") {
//						this.saveCustomExportSettingOnly();
//						this.$elementMessage("保存表头设置并导出成功", 'success');
//						openDownload(r.Data.Results.file);
//					} else {
//						this.$elementMessage(r.Message, 'error');
//						if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
//							this.$userFailure(this);
//						}
//					}
//				});
			},
    saveCustomExportSettingOnly(type) {
			if(!this.modalCustomExport.selectedTitles.length) {
				this.$elementMessage(this.$t('myinvoice.leastOne'), "error");
				return false;
			}
			if(
				this.modalCustomExport.selectedTitles.some(e => {
					return !e.name;
				})
			) {
				this.$elementMessage(this.$t('myinvoice.notEmpty'), "error");
				return false;
			}
			this.$showLoading();
			let obj = {}
			this.modalCustomExport.selectedTitles.forEach(item => {
				obj[item.key] = item.name
			})
			let apiUrl = this.exportInvoiceType == "b" ? "api.Invoice.saveInvoiceTitle" : "api.Invoice.saveExportTitle";
			this.$apiCall(apiUrl, {
				titles: obj
			}, r => {
				if(r.ErrorCode == "9999") {

					if(type>0){
						if($("#ifilePro").length == 0) {
							$("body").append(
								'<iframe id="ifilePro" style="display:none"></iframe>'
							);
						}
						let openDownload = url => {
							document.getElementById("ifilePro").src = url;
						};
						let apiUrl = this.exportInvoiceType == "b" ? "api.Invoice.exportInvoice" : "api.Invoice.exportOrder";
						this.$apiCall(apiUrl, {
							titles: obj,
							invoiceId: this.exportItem.id,
							type: type == 1 ? 'excel' : 'csv'
						}, r => {
							this.$hideLoading();
							if(r.ErrorCode == "9999") {
								this.innerVisible = false;
								this.$elementMessage(this.$t('myinvoice.saveSettingAndExport'), 'success');
								openDownload(r.Data.Results.file);
							} else {
								this.$elementMessage(r.Message, 'error');
								if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
									this.$userFailure(this);
								}
							}
						});
					}else{
						this.$elementMessage(this.$t('myinvoice.saveSettingSuccess'), 'success');
						this.innerVisible = false;
					}
				} else {
					this.$hideLoading();
					this.$elementMessage(r.Message, 'error');
					if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
						this.$userFailure(this);
					}
				}
			});
		},
    setExportOnly(type) {
        this.exportInvoiceType = type;
				this.$showLoading();
				this.showCustom = false;
				this.modalCustomExport = JSON.parse(this.modalCustomExportDefault);
				let apiUrl = this.exportInvoiceType == "b" ? "api.Invoice.exportInvoiceTitle" : "api.Invoice.exportTitle";
				this.$apiCall(apiUrl, {}, r => {
					this.$hideLoading();
					if(r.ErrorCode == "9999") {
						this.innerVisible = true;
						for(var i in r.Data.Results.default) {
							let obj = {};
							obj.key = i;
							obj.orName = r.Data.Results.default[i];
							obj.name = r.Data.Results.default[i];
							this.modalCustomExport.tags.push(obj);
						}

						for(var i in r.Data.Results.titles) {
							let obj = {};
							obj.key = i;
							obj.orName = r.Data.Results.titles[i];
							obj.name = r.Data.Results.titles[i];
							this.modalCustomExport.selectedTitles.push(obj);
						}

						this.modalCustomExport.tags.forEach(all => {
							if(!this.modalCustomExport.selectedTitles.some(sed => {
									return all.key == sed.key;
								})) {
								this.modalCustomExport.unselectedTitles.unshift(all);
							}

							this.modalCustomExport.selectedTitles.some(sed => {
								if(all.key == sed.key) {
									this.$set(sed, "orName", all.name)
								}
							})
						});

					} else {
						this.$elementMessage(r.Message, 'error');
						if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
							this.$userFailure(this);
						}
					}
				});
			},
		beforeHandleCommand(row,command){
        return {
            'row': row,
            'command':command
        }
    },
    handleCommandFn(item,command) {
      this.exportItem = item;
      this.exportInvoiceType = command;
      this.setExportOnly(command);
    },
    handleCommand(command) {
      this.exportItem = command.row;
      this.exportInvoiceType = command.command;
      switch (command.command) {
        case "a":
          this.$router.push({
            name: "importData",
            query: {
              rid:this.exportItem.relationshipId,
              id:this.exportItem.id,
            }
          });
          break;
        case "b":
          this.$showLoading();
					if($("#ifilePro").length == 0) {
						$("body").append(
							'<iframe id="ifilePro" style="display:none"></iframe>'
						);
					}
					let openDownload = url => {
						document.getElementById("ifilePro").src = url;
					};
					let apiUrl = this.exportInvoiceType == "b" ? "api.Invoice.exportInvoice" : "api.Invoice.exportOrder";
					this.$apiCall(apiUrl, {
						invoiceId: this.exportItem.id,
						type: 'excel'
					}, r => {
						this.$hideLoading();
						if(r.ErrorCode == "9999") {
							this.$elementMessage(this.$t('myinvoice.exportSuccess'), 'success');
							openDownload(r.Data.Results.file);
						} else {
							this.$elementMessage(r.Message, 'error');
							if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
								this.$userFailure(this);
							}
						}
					});
//      	this.setExportOnly("b");
          break;
        case "c":
          this.setExportOnly("c");
          break;
      }
    },
    remoteMethodCustom(query){
      this.selectArr = [];
      //获取筛选客户
      if(!query)
        return;
      this.selectLoading = true;
      this.$apiCall('api.Relationship.findByVendor', {name: query}, r => {
        this.selectLoading = false;
        if (r.ErrorCode == 9999) {
          this.selectArr = r.Data.Results;
        }else{
          this.$message({ message: r.Message, type: "error" });
        }
      })
    },
    clearFilter() {
      this.selectArr = [];
      //清空筛选
      this.filterParams = JSON.parse(this.filterParamsDefault);
      if (this.$route.query.page == 1) {
        this.getItem();
      } else {
        this.$router.push({ query: { page: 1 } });
      }
    },
    filterGetItem() {
      //筛选
      this.orderOtherStatus = 0;
      if (this.$route.query.page == 1) {
        this.getItem();
      } else {
        this.$router.push({ query: { page: 1 } });
      }
    },
    filterGetItem2(type) {
      this.cancelStatus = type;
      //筛选
      if (this.$route.query.page == 1) {
        this.getItem();
      } else {
        this.$router.push({ query: { page: 1 } });
      }
    },
    dateChange() {
      if (this.filterParams.date.length > 1) {
        this.filterParams.dateFrom = this.$moment(
          this.filterParams.date[0]
        ).format("YYYY-MM-DD");
        this.filterParams.dateTo = this.$moment(
          this.filterParams.date[1]
        ).format("YYYY-MM-DD");
        this.filterGetItem();
      }
    },
    cancelInvoice(item) {
      //作废
      this.$confirm(this.$t('myinvoice.confirmToCancel'), "", {
        confirmButtonText: this.$t('myinvoice.cancel'),
        cancelButtonText: this.$t('myinvoice.discard'),
        type: "error"
      })
        .then(() => {
          this.loading = true;
          this.$apiCall("api.Invoice.cancel", { invoiceId: item.id }, r => {
            this.loading = false;
            if (r.ErrorCode == 9999) {
              this.$message({ message: this.$t('myinvoice.cancelSuccess'), type: "success" });
              this.getItem(true);
            } else {
              this.$message({ message: r.Message, type: "error" });
            }
          });
        })
        .catch(() => {});
    },
    getItem(s) {
      this.loading = true;
      this.$apiCall(
        "api.Invoice.findByVendor",
        {
          page: this.page,
          rowsPerPage: this.rowsPerPage,
          timeFilter: this.filterParams.timeFilter,
          dateFrom: this.filterParams.dateFrom,
          dateTo: this.filterParams.dateTo,
          code: this.filterParams.code,
          status: this.cancelStatus == 2 ? 9 : this.filterParams.status,
          customerRead: this.filterParams.customerRead,
          payStatus: this.filterParams.payStatus,
          relationshipId: this.filterParams.id,
          trackNumber: this.filterParams.trackNumber,
          codeName: this.filterParams.codeName,
          isAbnormal: this.orderOtherStatus === 10, // 订单异常禁止发货
          syncFail: this.orderOtherStatus === 11, // 同步发货信息失败
          accountId: this.filterParams.accountId, // 店铺名称
//        customerName: this.filterParams.name,
        },
        r => {
          this.loading = false;
          if (r.ErrorCode == 9999) {
            this.items = [];
            r.Data.Results.forEach(item => {
              if(item.status != 7)
                item.loadCnt = false;
                item.cnt = null;
								item.cntText = '';
								item.submitLoading = false;
                this.items.push(item)
            })
            this.total = Number(r.Data.Pagination.totalCount);
            this.totalPage = Number(r.Data.Pagination.totalPage);
            this.$getTableHeight(this);
            if (!s) this.$refs.gridTable.bodyWrapper.scrollTop = 0;
          } else {
            this.$message({ message: r.Message, type: "error" });
          }
        }
      );
    },
    toPage(val) {
      if (val != this.$route.query.page)
        this.$router.push({ query: { page: val } });
    },
    changePageSize(val) {
      this.rowsPerPage = val;
      localStorage.setItem("myInvoiceRowsPerPage", val);
      this.getItem();
    },
    gotoPage() {
      this.page = this.$route.query.page ? this.$route.query.page : 1;
      this.getItem();
    },
    gotoImport() {
      this.$router.push({ name: "importData" });
    },
    gotoInvoice(item) {
      let routeData = this.$router.resolve({
        name: "Invoice",
        query: {
        	uniCode: item.uniCode,
        	fromPage: 1
        }
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>
<style scoped="scoped">
.el-dropdown-menu__item{
	list-style: none;
    line-height: 36px;
    padding: 0 20px;
    margin: 0;
    font-size: 14px;
    color: #606266;
    cursor: pointer;
    outline: none;
}
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
</style>
<style>
.el-alert.el-alert--info i.el-alert__icon.el-icon-info{
	color: #5c6ac4!important;
}
</style>
