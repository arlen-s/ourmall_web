<template>
  <div class="contentpanel my-invoice-page" style="padding: 0">
    <div
      class="pagetitle"
      ref="pageHeader"
      style="flex-wrap: wrap; height: auto; display: none"
    >
      <div class="right"></div>
      <div style="margin: 5px; width: 100%">
        <el-alert
          v-if="waitConfirmCnt && !waitStatus"
          type="warning"
          :closable="false"
          class="top-warning"
        >
          <div slot="title">
            <p class="c-title" style="color: #e6a23c">
              <i class="el-icon-warning"></i>
              <b>{{$t('Notice')}}: </b>
             {{$t('You have')}}  {{ waitConfirmCnt }} 
             {{$t("purchase order(s) need your reconfirm,")}}
              <a href="javascript:;" @click="filterWaitConfirm">{{$t('click here')}}</a>
            {{$t('to view details.')}}  
            </p>
          </div>
        </el-alert>
      </div>
    </div>

    <div class="pagebody">
      <el-row :gutter="15" class="mg-b-20">
        <el-col :span="24">
          <el-row :gutter="20">
            <el-col :span="24">
              <div ref="tablefilter" class="page-filter">
                <div class="show-cancel">
                  <el-link
                    v-if="!isShowCancel"
                    type="primary"
                    @click="filtergetItem('c_showCancel')"
                  >
                   {{$t('Show cancelled orders')}} 
                  </el-link>
                  <el-link
                    v-else
                    type="primary"
                    @click="filtergetItem('c_showCancel')"
                  >
                   {{$t('Show all valid orders')}} 
                  </el-link>
                </div>
                <el-form :inline="true" size="mini">
                  <el-form-item class="mg-r-5" label="#">
                    <el-input
                      style="width: 130px"
                      v-model="filterParams.codeName"
                      placeholder="Order ID"
                      @keyup.enter.native="filterGetItem"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-cascader
                      size="mini"
                      :key="cascaderKey"
                      v-model="filterParams.accountId"
                      :placeholder="$t('All my stores')"
                      :options="options"
                      :props="{ expandTrigger: 'hover' }"
                      @change="handleStoreCheckbox"
                    >
                    </el-cascader>
                  </el-form-item>
                  <el-form-item class="mg-r-5">
                    <el-input
                      style="width: 130px"
                      v-model="filterParams.code"
                      :placeholder="$t('Invoice Number')"
                      @keyup.enter.native="filterGetItem"
                    ></el-input>
                  </el-form-item>
                  <el-form-item class="mg-r-20">
                    <el-select
                      class="mg-r-5"
                      style="width: 150px"
                      v-model="filterParams.timeFilter"
                      :placeholder="$t('Date type')"
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
                      range-separator="-"
                      start-placeholder="Start"
                      end-placeholder="End"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item v-if="!waitStatus">
                    <el-select
                      style="width: 130px"
                      v-model="filterParams.status"
                      :placeholder="$t('All status')"
                      @change="filterGetItem"
                    >
                      <el-option :label="$t('All status')" value=""></el-option>
                      <el-option
                        v-for="opt in $dict.invoiceStatusTwo"
                        v-if="opt.val != 9"
                        :label="opt.text"
                        :value="opt.val"
                        :key="opt.val"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="mg-r-5">
                    <el-input
                      style="width: 120px"
                      v-model="filterParams.trackNumber"
                      :placeholder="$t('Track Number')"
                      @keyup.enter.native="filterGetItem"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select
                      @change="handleVendorsSelect"
                      @visible-change="getVendors"
                      v-model="vendorsSelect.selected"
                      clearable
                      :placeholder="$t('All my vendors')"
                    >
                      <el-option
                        v-for="item in vendorsSelect.selectList"
                        :key="item.id"
                        :label="item.vendorName"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="filterGetItem"
                      >{{$t('Filter')}}</el-button
                    >
                    <el-button type="danger" @click="clearFilter"
                      >{{$t('Clear')}}</el-button
                    >
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
          </el-row>
          <!-- :height="tableHeight" -->
          <el-table
            :data="items"
            row-key="id"
            stripe
            style="width: 100%"
            ref="gridTable"
            :row-class-name="tableRowClassName"

          >
            <el-table-column :label="$t('Purchase Order')" width="250">
              <template v-slot="{ row }">
                <span>#{{ row.code }}</span>
                <el-popover placement="bottom" trigger="hover">
                  <div class="order-time-tips">
                    <p v-if="row.timeCreated">
                      <span>{{$t('Create')}}:</span>
                      {{ moment.unix(row.timeCreated).format("ll [at] LTS") }}
                    </p>
                    <p v-if="row.timeRead">
                      <span>Paid:</span>
                      {{ moment.unix(row.timeRead).format("ll [at] LTS") }}
                    </p>
                    <p v-if="row.timeCreateOrder">
                      <span>Confrmed:</span>
                      {{
                        moment.unix(row.timeCreateOrder).format("ll [at] LTS")
                      }}
                    </p>
                  </div>
                  <i slot="reference" class="el-icon-date mg-l-5"></i>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="Vendor" prop="vendorName" width="180">
              <template v-slot="{ row }">
                <span v-if="row.vendorId" style="color: #303133">
                  {{ row.vendorName }}</span
                >
                <span v-else style="color: #303133">
                  --- <span style="color: #909399">({{$t('NOT Joined')}})</span></span
                >
                <div v-if="row.vendorId == 0">
                  <span style="color: #909399">({{$t('NOT Joined')}})</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Order Includes')" width="200">
              <template v-slot="{ row }">
                <div style="white-space: nowrap">
                  <span class="tx-gray-600">{{$t('Orders')}}: </span>
                  <span style="color: #303133">{{
                    row.orderStatusCnt ? row.orderStatusCnt.orderCnt : 0
                  }}</span>
                </div>
                <div style="white-space: nowrap">
                  <span class="tx-gray-600">{{$t('Products')}}: </span>
                  <span style="color: #303133">{{ row.totalCnt || "0" }}</span>
                </div>
                <div style="white-space: nowrap">
                  <span class="tx-gray-600">{{$t('My stores')}}: </span>
                  <span style="color: #303133">{{
                    row.shops.length || "0"
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Amount')" prop="realAmount" width="235">
              <template slot-scope="{ row }">
                <div style="white-space: nowrap">
                  <span class="tx-gray-600">{{$t('Income')}}: </span>
                  <span style="color: #303133">
                    {{
                      row.orderStatusCnt
                        ? row.orderStatusCnt.income.income
                          ? `${
                              ce[row.orderStatusCnt.income.currency]
                                ? ce[row.orderStatusCnt.income.currency].symbol
                                : row.orderStatusCnt.income.currency
                            } ${row.orderStatusCnt.income.income}`
                          : "---"
                        : "---"
                    }}
                  </span>
                </div>
                <div style="white-space: nowrap">
                  <span class="tx-gray-600">Cost: </span>
                  <span class="tx-danger">
                    {{
                      row.totalAmount ? `US$ ${row.totalAmount}` : "Not set up"
                    }}
                  </span>
                </div>
                <div style="white-space: nowrap">
                  <span class="tx-gray-600">{{$t('Profit')}}: </span>
                  <span
                    :style="`color: ${isProfit(row) ? '#303133;' : '#67C23A;'}`"
                  >
                    {{
                      row.orderStatusCnt
                        ? row.orderStatusCnt.income.profit
                          ? `US$ ${row.orderStatusCnt.income.profit}`
                          : "N/A"
                        : "N/A"
                    }}
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="About Profit = Income - Cost"
                      placement="bottom"
                    >
                      <i style="color: #5c6ac4" class="el-icon-question"></i>
                    </el-tooltip>
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Statistics')" width="220">
              <template slot-scope="scope">
                <div style="white-space: nowrap">
                  <span class="tx-gray-600">Vendor shipped: </span>
                  <span>
                    {{ scope.row.itemShippedCnt }}
                    <span style="color: #909399"
                      >of {{ scope.row.itemCnt }}</span
                    >
                  </span>
                </div>
                <div style="white-space: nowrap">
                  <span class="tx-gray-600">{{$t('Fulfilled')}}: </span>
                  <span style="color: #303133">
                    {{ scope.row.itemSyncCnt }}
                    <span v-if="scope.row.itemSyncFailCnt !== '0'">
                      (<span style="color: #f56c6c">
                        <!--                      {{scope.row.itemSyncFailCnt}} sync failed-->
                        <el-popover
                          placement="bottom"
                          title="Download tracking information"
                          width="700"
                          trigger="hover"
                        >
                          <div
                            class="mg-t-15 mg-b-15"
                            style="white-space: nowrap"
                          >
                            <span class="tx-gray-600">{{$t('Vendor shipped')}}: </span>
                            <a href="javascript:void(0)">
                              {{
                                scope.row.orderStatusCnt
                                  ? scope.row.orderStatusCnt.deliveredOrderCnt
                                  : "---"
                              }}
                            </a>
                            <span
                              v-if="
                                scope.row.orderStatusCnt &&
                                Number(
                                  scope.row.orderStatusCnt.deliveredOrderCnt
                                ) -
                                  Number(
                                    scope.row.orderStatusCnt.syncOrderCnt
                                  ) >
                                  0
                              "
                              class="mg-l-10"
                            >
                              (But
                              <a href="javascript:void(0)">
                                {{
                                  scope.row.orderStatusCnt
                                    ? Number(
                                        scope.row.orderStatusCnt
                                          .deliveredOrderCnt
                                      ) -
                                      Number(
                                        scope.row.orderStatusCnt.syncOrderCnt
                                      )
                                    : "---"
                                }}
                              </a>
                              {{$t('unfulfilled / partially fulfilled')}})
                            </span>
                          </div>
                          <el-alert
                            class="icon-color"
                            :closable="false"
                            :title="$t('You may download these tracking information and fulfilled these orders in your store manualy.')"
                            type="info"
                            show-icon
                          >
                          </el-alert>
                          <div class="mg-t-15 d-flex justify-content-center">
                            <el-button
                              type="primary"
                              size="small"
                              @click="exportDeliver(scope.row.id, 1)"
                              >{{$t('Download ALL tracking information')}}</el-button
                            >
                            <el-button
                              v-if="
                                scope.row.orderStatusCnt &&
                                Number(
                                  scope.row.orderStatusCnt.deliveredOrderCnt
                                ) -
                                  Number(
                                    scope.row.orderStatusCnt.syncOrderCnt
                                  ) >
                                  0
                              "
                              type="primary"
                              size="small"
                              @click="exportDeliver(scope.row.id, 2)"
                              >{{$t('Download NOT FULFILLED tracking information')}}
                              </el-button
                            >
                          </div>
                          <a slot="reference" href="javascript:void(0)">
                            {{ scope.row.itemSyncFailCnt }}
                          </a>
                        </el-popover>
                        {{$t('sync failed')}} </span
                      >)
                    </span>
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Status')" width="220">
              <template slot-scope="scope">
                <el-tooltip
                  v-if="scope.row.status == '9' && scope.row.stopReason"
                  class="item"
                  effect="dark"
                  :content="scope.row.stopReason"
                  placement="top"
                >
                  <span
                    :class="`s-label label-${
                      $dict.invoiceStatus[scope.row.status].type
                    }`"
                    >{{ $dict.invoiceStatus[scope.row.status].text }}</span
                  >
                </el-tooltip>
                <span
                  v-else
                  :class="`s-label label-${
                    $dict.invoiceStatus[scope.row.status].type
                  }`"
                  >{{ $dict.invoiceStatus[scope.row.status].text }}</span
                >
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="Action" width="200">
              <template slot-scope="scope">
                <el-dropdown
                  v-if="scope.row.status != 2"
                  @command="handleCommand"
                >
                  <div>
                    <el-link type="primary" @click="gotoInvoice(scope.row)"
                      >{{$t('View Details')}}</el-link
                    >
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </div>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item disabled>
                      <b class="black"> {{$t('More Action')}} </b>
                    </el-dropdown-item>
                    <el-dropdown-item
                      v-if="scope.row.status == 1 || scope.row.status == 2"
                      :command="{
                        type: 'Change another vendor',
                        data: scope.row,
                      }"
                      >{{$t('Change another vendor')}}</el-dropdown-item
                    >
                    <el-dropdown-item
                      v-if="scope.row.status != 7"
                      :command="{
                        type: 'Invite vendor to process',
                        data: scope.row,
                      }"
                      >{{$t('Invite vendor to process')}}</el-dropdown-item
                    >
                    <!-- paymentType=4 的 payStatus=1的 不能取消订单 -->
                    <template
                      v-if="!((scope.row.paymentType == 4 && scope.row.payStatus == 1) || scope.row.paymentType == 6)"
                    >
                      <el-dropdown-item
                        style="color: #f56c6c"
                        v-if="scope.row.status < 5 || scope.row.status == 7"
                        :command="{
                          type: 'Cancel this order',
                          data: scope.row,
                        }"
                        >{{$t('Cancel this order')}}
                      </el-dropdown-item>
                    </template>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown v-else @command="handleCommand">
                  <div>
                    <el-link type="success" @click="confirmMoneyOnly(scope.row)"
                      >{{$t('Confirm payment')}}</el-link
                    >
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </div>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item disabled>
                      <b class="black"> {{$t('More Action')}} </b>
                    </el-dropdown-item>
                    <el-dropdown-item
                      v-if="isPay(scope.row)"
                      style="color: #67c23a"
                      :command="{ type: 'pay', data: scope.row }"
                    >
                      {{$t('Pay')}}
                    </el-dropdown-item>
                    <el-dropdown-item
                      :command="{ type: 'View Details', data: scope.row }"
                      >{{$t('View Details')}}</el-dropdown-item
                    >
                    <el-dropdown-item
                      :command="{
                        type: 'Invite vendor to process',
                        data: scope.row,
                      }"
                      >{{$t('Invite vendor to process')}}</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row v-if="items.length" :gutter="20">
        <el-col :span="24" class="d-flex justify-content-center">
          <div ref="tableFooter">
            <el-pagination
              :current-page="Number(page)"
              :background="true"
              layout="sizes, total, prev, pager, next, jumper"
              :page-sizes="pageSizes"
              :page-size="rowsPerPage"
              :total="Number(total)"
              @current-change="toPage"
              @size-change="changePageSize"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      :visible.sync="selectedSaveDialog.isShow"
      :width="'620px'"
      :close-on-click-modal="false"
      class="selected-save-dialog"
    >
      <div style="padding: 0 20px 20px; text-align: center">
        <i
          style="color: #67c23a; font-size: 50px"
          class="el-message__icon el-icon-success"
        ></i>
        <p
          style="
            color: #67c23a;
            font-weight: bold;
            font-size: 18px;
            margin: 10px 0px 20px;
          "
        >
         {{$t('Selected saved! Now you can Check the purchase orders')}} 
        </p>
        <el-table :data="selectedSaveDialog.info" border style="width: 100%">
          <el-table-column label="#Invoice Number" prop="code">
            <template slot-scope="scope">
              <span>#{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Vendor" prop="vendorName">
            <template slot-scope="scope">
              <span v-if="scope.row.vendorName" style="color: #303133">
                {{ scope.row.vendorName }}</span
              >
              <span v-else style="color: #303133">
                --- <span style="color: #909399">({{$t('NOT Joined')}})</span></span
              >
            </template>
          </el-table-column>
          <el-table-column :label="$t('Amount Due')" prop="realAmount">
            <template slot-scope="scope">
              <span v-if="scope.row.realAmount > 0" class="tx-danger"
                >US$ <span>{{ scope.row.realAmount }}</span></span
              >
              <span class="tx-danger" v-else>{{$t('Not set up')}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" :label="$t('Action')" width="150">
            <template slot-scope="scope">
              <div>
                <el-link
                  style="font-size: 12px; font-weight: normal"
                  type="primary"
                  @click="gotoInvoice(scope.row)"
                  >{{$t('View Details')}}</el-link
                >
              </div>
              <div>
                <el-link
                  style="font-size: 12px; font-weight: normal"
                  type="primary"
                  @click="sendtoVendor(scope.row)"
                  >{{$t('Send to vendor')}}</el-link
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <el-dialog
      @open="openSend"
      @close="closeSend"
      custom-class="sendInvoice"
      title="Send to vendor"
      :visible.sync="sendInvoiceOpen"
      width="50%"
    >
      <!--<el-divider></el-divider>-->
      <template>
        <el-tabs
          v-model="activeShareName"
          type="card"
          style="margin-left: 20px; margin-top: 10px"
        >
          <el-tab-pane name="shareLink">
            <span slot="label"
              ><i class="iconfont icon-link"></i> {{$t('Share by link')}}</span
            >
            <div class="d-flex mg-y-20">
              <div
                style="
                  color: #999;
                  width: 150px;
                  text-align: right;
                  margin-right: 10px;
                  white-space: nowrap;
                "
              >
                {{$t('Share link')}}:
              </div>
              <div>
                <!--<el-link :underline="false" :href="invoiceInfo.url" target="_blank">{{invoiceInfo.url}}</el-link>-->
                <span>{{ invoiceInfo.url }}</span>
              </div>
            </div>
            <div class="d-flex mg-y-20">
              <div
                style="
                  color: #999;
                  width: 150px;
                  text-align: right;
                  margin-right: 10px;
                  white-space: nowrap;
                "
              ></div>
              <div>
                <div>
                  <el-button
                    size="mini"
                    type="success"
                    v-clipboard:copy="invoiceInfo.url"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                    >{{$t('Copy Link')}}</el-button
                  >
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane name="shareWeixin">
            <span slot="label"
              ><i class="iconfont icon-shejiao"></i> {{$t('Share by APP')}}</span
            >
            <div>
              <div class="d-flex mg-y-20">
                <div
                  style="
                    color: #999;
                    width: 150px;
                    text-align: right;
                    margin-right: 10px;
                    white-space: nowrap;
                  "
                >
                  {{$t('Title')}}:
                </div>
                <div style="width: 70%">
                  <el-input
                    @change="saveRemark('2')"
                    type="text"
                    size="small"
                    v-model="shareTitle"
                  ></el-input>
                </div>
              </div>
              <div class="d-flex mg-y-20 align-items-center">
                <div
                  style="
                    color: #999;
                    width: 150px;
                    text-align: right;
                    margin-right: 10px;
                    white-space: nowrap;
                  "
                >
                  {{$t('Desc')}}:
                </div>
                <div style="width: 70%">
                  <el-input
                    @change="saveRemark('2')"
                    type="textarea"
                    resize="none"
                    :autosize="{ minRows: 3, maxRows: 6 }"
                    size="small"
                    v-model="shareDesc"
                  ></el-input>
                  <!--<div class="mg-t-20 tx-right">
                      <el-button :loading="remarkLoading" size="mini" type="primary" plain @click="saveRemark('1')">Clear</el-button>
                      <el-button size="mini" type="primary" :loading="remarkLoading" @click="saveRemark('2')">Save</el-button>
                    </div>-->
                </div>
              </div>
              <div class="d-flex mg-y-20">
                <div
                  style="
                    color: #999;
                    width: 150px;
                    text-align: right;
                    margin-right: 10px;
                    white-space: nowrap;
                  "
                >
                 {{$t('Share')}}:
                </div>
                <div style="width: 70%" class="d-flex">
                  <div
                    class="skype-share"
                    style="margin-right: 30px"
                    :data-href="shareTitle + shareDesc"
                    data-lang="en-US"
                    :data-text="invoiceInfo.url"
                    data-style="large"
                  ></div>
                  <div>
                    <el-tooltip placement="bottom">
                      <div slot="content">
                        <p class="tx-center mg-b-10">{{$t('Scan share to WeChat')}}</p>
                        <img :src="invoiceInfo.qrcode" width="130" />
                        <img
                          src="images/weixin.png"
                          width="30px"
                          style="
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            margin-left: -15px;
                            margin-top: -4px;
                          "
                        />
                      </div>
                      <a class="share-weixin" href="javascript:;">
                        <i class="fa fa-weixin"></i> {{$t('Share')}}
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
          <el-button
            v-show="activeShareName == 'shareWeixin'"
            size="small"
            type="primary"
            plain
            @click="saveRemark('1')"
            >{{$t('Clear')}}</el-button
          >
        </div>
        <div>
          <el-button size="small" @click="sendInvoiceOpen = false"
            >{{$t('Close')}}</el-button
          >
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('Purchase Order Reconfirm')"
      :visible.sync="DialogReconfirm.isShow"
      width="450px"
    >
      <template v-if="DialogReconfirm.item">
        <div style="padding: 0 20px">
          <div style="margin-bottom: 10px">
            {{$t('Vendor name')}}:
            <b style="color: #909399">{{ DialogReconfirm.item.vendorName }}</b>
          </div>
          <div>
            {{$t('Includes')}}:
            <b style="color: #5c6ac4">{{
              DialogReconfirm.item.orderCnt ? DialogReconfirm.item.orderCnt : 0
            }}</b>
           Shopify orders /
            <b style="color: #5c6ac4">{{
              DialogReconfirm.item.totalCnt ? DialogReconfirm.item.totalCnt : 0
            }}</b>
           {{$t('products')}} 
          </div>
        </div>
        <div slot="footer" class="dialog-footer d-flex">
          <el-button
            v-if="DialogReconfirm.item.status == 7"
            size="small"
            type="primary"
            @click="runReconfirm(1)"
          >
            {{$t('Allow vendor to process these orders')}}
          </el-button>
          <el-button size="small" @click="runReconfirm(2)"
            >{{$t('View details')}}</el-button
          >
        </div>
      </template>
    </el-dialog>
    <el-dialog
      :visible="cancelOrderDialog.visible"
      :title="$t('Cancel purchase order')"
      width="600px"
      :before-close="cancelOrderDialogClose"
    >
      <div style="margin: 20px">
        <p class="mg-b-10">{{$t('Do you want to cancel this order?')}}</p>
        <p style="word-break: break-word">
          {{$t("Don't worry, after cancelling this purchase order, you can still find your")}}
          {{$t("Shopify orders in the 'Waiting for sourcing' menu and re-place the purchase order")}}

        </p>
        <el-form ref="form" label-width="80px">
          <el-form-item :label="$t('Reason')">
            <el-input
              type="textarea"
              v-model="cancelOrderDialog.stopReason"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          :loading="cancelOrderDialog.loading"
          type="primary"
          @click="postCanceOrder"
          >{{$t('Confirm')}}</el-button
        >
        <el-button @click="cancelOrderDialogClose">{{$t('Discard')}}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible="changeAnotherVendorDialog.visible"
      :title="$t('Change purchase order to another vendor')"
      width="600px"
      :before-close="closeCAVDialog"
    >
      <div>
        <el-form label-position="right">
          <el-form-item :label="$t('Current vendor:')">
            <p>{{ changeAnotherVendorDialog.currentVendor }}</p>
          </el-form-item>
          <el-form-item :label="`${$t('Change to new vendor')}:`">
            <el-select
              @visible-change="getVendors"
              v-model="changeAnotherVendorDialog.relationshipId"
              clearable
             :placeholder="$t('All my vendors')"
            >
              <el-option
                v-for="item in vendorsSelect.selectList"
                :key="item.id"
                :label="item.vendorName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div style="margin: 0 20px">
          <el-checkbox v-model="changeAnotherVendorDialog.changeDispatch"
            >{{$t('Also allocate the products in this purchase order to the new supplier')}}</el-checkbox
          >
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          :loading="changeAnotherVendorDialog.loading"
          type="primary"
          @click="postCAVDialog"
          >{{$t('Confirm')}}</el-button
        >
        <el-button @click="closeCAVDialog">{{$t('Discard')}}</el-button>
      </span>
    </el-dialog>
    <el-backtop
      class="goto-top"
      target=".main-scroll  .el-scrollbar__wrap"
      :right="120"
      :bottom="20"
    >
    </el-backtop>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          id: 1,
          label: "Shopify",
          children: [],
        },
        {
          id: 2,
          label: "Woocommerce",
          children: [],
        },
        {
          id: 3,
          label: "Lazada",
          children: [],
        },
        {
          id: 4,
          label: "Shopee",
          children: [],
        },
      ],
      cascaderKey: 1,
      changeAnotherVendorDialog: {
        currentVendor: "",
        visible: false,
        loading: false,
        changeNewVnedor: [],
        changeDispatch: false, // 是否要更新已分配的商品
        relationshipId: "", // 供应商id
        invoiceId: "", // 发票id
      },
      cancelOrderDialog: {
        // 删除窗口
        loading: false,
        visible: false,
        id: "",
        stopReason: "",
      },
      ce: this.$CE, //货币符号
      vendorsSelect: {
        selected: "",
        selectList: [],
      },
      storeCheckbox: {
        selected: [],
        checkList: [],
      },
      getShopNameInput: {
        loading: false,
        shopList: [],
      },
      loading: false,
      reSizeTime: 0,
      tableHeight: 400,
      pageSizes: [10, 20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("c_customerInvoiceRowsPerPage")
        ? Number(localStorage.getItem("c_customerInvoiceRowsPerPage"))
        : 10,
      items: [],
      total: 0,
      totalPage: 0,
      filterParams: {
        timeOption: [
          {
            label: "Order created",
            value: "timeCreated",
          },
          {
            label: "Order paid",
            value: "timePaid",
          },
          {
            label: "Order confirmed",
            value: "timeRead",
          },
          //        { label: "下载订单时间", value: "timeApiGet" },
        ],
        timeFilter: "", //时间筛选
        date: [],
        dateFrom: "",
        dateTo: "",
        code: "",
        status: "",
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
      DialogReconfirm: {
        isShow: false,
        item: null,
      },
      isShowCancel: false,
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
      if (this.saveCode) {
        this.selectedSaveDialog = JSON.parse(this.selectedSaveDialogDefault);

        this.selectedSaveDialog.info = sessionStorage.getItem("c_selectedSaveInfo"
        )
          ? JSON.parse(sessionStorage.getItem("c_selectedSaveInfo"))
          : [];
        if (this.selectedSaveDialog.info.length) {
          this.selectedSaveDialog.isShow = true;
        }
      }
    },
  },
  mounted() {
    this.getShopName();
    this.filterParamsDefault = JSON.stringify(this.filterParams);
    this.filterParams.status = this.$route.query.status
      ? Number(this.$route.query.status)
      : "";
    if (this.$route.query.rid) {
      // this.filterParams.relationshipId = this.$route.query.rid;
      // this.filterParams.vendorName = this.$route.query.name;
      // this.selectArr = [{
      //   id: this.$route.query.rid,
      //   vendorName: this.$route.query.name
      // }];
      this.vendorsSelect.selectList = [
        {
          id: this.$route.query.rid,
          vendorName: this.$route.query.name,
        },
      ];
      this.vendorsSelect.selected = this.$route.query.rid;
    }
    if (this.$route.params.rid) {
      this.filterParams.relationshipId = this.$route.params.rid;
      this.filterParams.vendorName = this.$route.params.name;
      this.selectArr = [
        {
          id: this.$route.params.rid,
          vendorName: this.$route.params.name,
        },
      ];
    }
    this.getItem();
    this.getVendor();
    // window.onresize = () => {
    //   this.$emit("getTableHeight", this);
    // };
    this.selectedSaveDialogDefault = JSON.stringify(this.selectedSaveDialog);
    this.saveCode = this.$route.params.saveCode
      ? this.$route.params.saveCode
      : "";
    let gridTable = this.$refs.gridTable.bodyWrapper;
    gridTable.onscroll = () => {
      setTimeout(() => {
        this.loadCnt();
      }, 100);
    };
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
    // window.onresize = null;
  },
  methods: {
    confirmMoneyOnly(val) {
      this.$confirm(
        this.$t("After your confirmation for the payment, we will notify the vendor by email. You can also proactively notify the vendor to speed the delivery up"),
        this.$t("Have you finished the payment?"),
        {
          confirmButtonText: this.$t("Confirm the payment"),
          cancelButtonText: "Discard",
          type: "info",
        }
      ).then(() => {
        this.$apiCall(
          "api.Invoice.setRead",
          {
            uniCode: val.uniCode,
          },
          (r) => {
            if (r.ErrorCode == "9999") {
              this.$message({
                type: "success",
                message: "Payment success",
              });
              this.items = this.items.filter((v) => v.id !== val.id);
              --this.total;
              this.$emit("getNum");
            } else {
              this.$elementMessage(r.Message, "error");
              if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                this.$userFailure();
              }
              if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                this.$userFailure();
              }
            }
          }
        );
      });
      setTimeout(() => {
        document.querySelectorAll(".el-button--primary").forEach((el) => {
          el.blur();
        });
      }, 200);
    },
    handleCommand({ type, data }) {
      if (type === "Change another vendor") {
        this.openCAVDialog(data);
      }
      if (type === "Invite vendor to process") {
        this.sendtoVendor(data);
      }
      if (type === "Cancel this order") {
        this.cancelInvoice(data);
      }
      if (type === "View Details") {
        this.gotoInvoice(data);
      }
      if (type == "pay") {
        this.gotoInvoice(data, "pay");
      }
    },
    isProfit(item) {
      if (item.orderStatusCnt != null) {
        if (item.orderStatusCnt.income.profit == null) return true;
        return Number(item.orderStatusCnt.income.profit) >= 0;
      }
      return true;
    },
    postCAVDialog() {
      this.changeAnotherVendorDialog.loading = true;
      this.$apiCall(
        "api.Invoice.changeVendor",
        {
          invoiceId: this.changeAnotherVendorDialog.invoiceId,
          relationshipId: this.changeAnotherVendorDialog.relationshipId,
          changeDispatch: this.changeAnotherVendorDialog.changeDispatch,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            this.$message({ message: r.Message, type: "success" });
            this.changeAnotherVendorDialog.visible = false;
            this.filterGetItem();
          } else {
            this.$message({ message: r.Message, type: "error" });
          }
          this.changeAnotherVendorDialog.loading = false;
        }
      );
    },
    closeCAVDialog() {
      this.changeAnotherVendorDialog.visible = false;
      // this.changeAnotherVendorDialog.changeDispatch = false;
      // this.changeAnotherVendorDialog.relationshipId = '';
      // this.changeAnotherVendorDialog.invoiceId = '';
      // this.changeAnotherVendorDialog.loading = false;
    },
    openCAVDialog(item) {
      this.changeAnotherVendorDialog.currentVendor = item.vendorName;
      this.changeAnotherVendorDialog.changeDispatch = false;
      this.changeAnotherVendorDialog.relationshipId = "";
      this.changeAnotherVendorDialog.invoiceId = item.id;
      this.changeAnotherVendorDialog.visible = true;
      this.changeAnotherVendorDialog.loading = false;
    },
    handleVendorsSelect() {
      this.filterGetItem();
    },
    handleStoreCheckbox() {
      this.filterGetItem();
    },
    handleCleatStore() {
      this.storeCheckbox.selected = [];
      this.filterGetItem();
    },
    getVendors(status) {
      if (status && this.vendorsSelect.selectList.length <= 2) {
        this.$apiCall("api.Relationship.findByCustomer", {}, (r) => {
          if (r.ErrorCode == 9999) {
            this.vendorsSelect.selectList = [];
            r.Data.Results.forEach((e) => {
              this.vendorsSelect.selectList.push({
                id: e.id,
                vendorName: e.vendorName,
              });
            });
          } else {
            this.$message({ message: r.Message, type: "error" });
          }
        });
      }
    },
    getShopName() {
      // 查询所有shopify
      this.$apiCall("api.Invoice.findStores", { authStatus: 1 }, (r) => {
        if (r.ErrorCode == 9999) {
          this.storeCheckbox.checkList = [];
          r.Data.Results.forEach((e) => {
            this.storeCheckbox.checkList.push({
              shopifyAccountId: e.id,
              store: e.shopName,
            });
          });
          this.options.map((item) => {
            r.Data.Results.filter((a) => {
              if (a.platform == item.id) {
                item.children.push({
                  label: a.shopName,
                  value: a.id,
                });
              }
            });
          });
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      });
    },
    runReconfirm(type) {
      this.DialogReconfirm.isShow = false;
      if (type == 1) this.confirmInvoice(this.DialogReconfirm.item);
      if (type == 2) this.gotoInvoice(this.DialogReconfirm.item);
    },
    openReconfirm(item) {
      this.DialogReconfirm.isShow = true;
      this.DialogReconfirm.item = item;
    },
    confirmInvoice(item) {
      this.$set(item, "confirmLoading", true);
      this.$apiCall(
        "api.Invoice.confirmInvoice",
        { invoiceId: item.id },
        (r) => {
          this.$set(item, "confirmLoading", false);
          if (r.ErrorCode == "9999") {
            this.$elementMessage("success", "success");
            this.getItem(true, true);
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    filterWaitConfirm() {
      this.cancelStatus = 1;
      this.waitStatus = 1;
      this.filterGetItem();
    },
    exportDeliver(id, type) {
      this.$showLoading();
      this.$apiCall(
        "api.Invoice.exportDeliverTitle",
        {
          invoiceId: id,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            let selectedTitles = [];
            for (var i in r.Data.Results.titles) {
              let obj = {};
              obj.key = i;
              obj.orName = r.Data.Results.titles[i];
              obj.name = r.Data.Results.titles[i];
              selectedTitles.push(obj);
            }
            let obj = {};
            selectedTitles.forEach((item) => {
              obj[item.key] = item.name;
            });

            let param = {
              invoiceId: id,
              titles: obj,
              onlyDelivered: true,
            };
            if (type == 2) param.onlyNotSync = true;
            if ($("#ifilePro").length == 0) {
              $("body").append(
                '<iframe id="ifilePro" style="display:none"></iframe>'
              );
            }
            let openDownload = (url) => {
              document.getElementById("ifilePro").src = url;
            };
            this.$apiCall("api.Invoice.exportDeliver", param, (r) => {
              this.$hideLoading();
              if (r.ErrorCode == "9999") {
                this.$elementMessage(
                  this.$t("Your request is been submitted, please wait one moment."),
                  "success"
                );
                openDownload(r.Data.Results.file);
              } else {
                this.$elementMessage(r.Message, "error");
                if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                  this.$userFailure();
                }
              }
            });
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure();
            }
          }
        }
      );
    },
    tableRowClassName({ row, rowIndex }) {
      return `data-invocieid invocieid${this.items[rowIndex].id}`;
    },
    loadCnt() {
      if (!this.$refs.gridTable) return;
      let gridTable = this.$refs.gridTable.bodyWrapper;
      let wH = gridTable.scrollHeight; //屏幕高
      let sH = gridTable.scrollTop; //滚动条高
      $(".el-table__body-wrapper .data-invocieid").each((index) => {
        let obj = $(".el-table__body-wrapper .data-invocieid").eq(index);
        let objH =
          $(".el-table__body-wrapper .data-invocieid").eq(index).offset().top -
          $(".el-table__header-wrapper").offset().top -
          30;
        if (objH < wH + sH && objH > sH) {
          //可见区域
          let invocieid = this.items[index].id;
          this.items.some((li) => {
            if (li.id == invocieid) {
              if (!li.isLoadOrderCnt) this.getOrderCnt(invocieid);
            }
          });
        }
      });
    },
    getOrderCnt(sid) {
      let flag = false;
      let isLoad = false;
      let item;
      this.items.some((li) => {
        if (li.id == sid) {
          if (li.isLoadOrderCnt) {
            flag = true;
          } else {
            item = li;
          }
          return true;
        }
      });
      if (isLoad) {
        return;
      }
      item.isLoadOrderCnt = 1;
      this.$apiCall(
        "api.Invoice.getSummary",
        {
          invoiceId: sid,
        },
        (r) => {
          this.$hideLoading();
          if (r.ErrorCode == "9999") {
            this.$set(item, "orderStatusCnt", r.Data.Results);
          } else {
            this.$elementMessage(r.Message, "error");
            item.isLoadOrderCnt = 2;
          }
        }
      );
    },
    remoteMethodVendor(query) {
      //获取筛选客户
      this.selectArr = [];
      if (!query) return;
      this.selectLoading = true;
      this.$apiCall(
        "api.Relationship.findByCustomer",
        {
          name: query,
        },
        (r) => {
          this.selectLoading = false;
          if (r.ErrorCode == 9999) {
            this.selectArr = r.Data.Results;
          } else {
            this.$message({
              message: r.Message,
              type: "error",
            });
          }
        }
      );
    },
    changeCustomerName() {
      if (window.lazy) {
        window.clearTimeout(window.lazy);
      }
      window.lazy = setTimeout(() => {
        this.$apiCall(
          "api.Relationship.findByCustomer",
          {
            name: this.filterParams.vendorName,
          },
          (r) => {
            if (r.ErrorCode == "9999") {
              this.vendorData = r.Data.Results;
            } else {
              this.$elementMessage(r.Message, "error");
              if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
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
        if (r.ErrorCode == "9999") {
          this.vendorData = r.Data.Results;
        } else {
          this.$elementMessage(r.Message, "error");
          if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
            this.$userFailure();
          }
        }
      });
    },
    onCopy(e) {
      this.$elementMessage(this.$t("Has been copied to the clipboard"), "success");
    },
    onError(e) {
      this.$elementMessage(
        this.$t("Copy to clipboard failed, please copy manually"),
        "error"
      );
    },
    openSend() {
      let num = 0;
      let t = setInterval(() => {
        (function (r, d, s) {
          r.loadSkypeWebSdkAsync =
            r.loadSkypeWebSdkAsync ||
            function (p) {
              var js,
                sjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(p.id)) {
                return;
              }
              js = d.createElement(s);
              js.id = p.id;
              js.src = p.scriptToLoad;
              js.onload = p.callback;
              sjs.parentNode.insertBefore(js, sjs);
            };
          var p = {
            scriptToLoad:
              "https://swx.cdn.skype.com/shared/v/latest/skypewebsdk.js",
            id: "skype_web_sdk",
          };
          r.loadSkypeWebSdkAsync(p);
        })(window, document, "script");
        num++;
        if (num > 10) clearInterval(t);
      }, 300);
    },
    closeSend() {
      if (this.saveCode) this.selectedSaveDialog.isShow = true;
    },
    saveRemark(type) {
      this.$showLoading();
      this.$apiCall(
        "api.Invoice.saveRemark",
        {
          uniCode: this.invoiceInfo.uniCode,
          title: type == 1 ? "" : this.shareTitle,
          desc: type == 1 ? "" : this.shareDesc,
        },
        (r) => {
          this.$hideLoading();
          if (r.ErrorCode == "9999") {
            this.shareTitle = r.Data.Results.title;
            this.shareDesc = r.Data.Results.desc;
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure();
            }
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
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
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure();
            }
          }
        }
      );
    },
    clearFilter() {
      //清空筛选
      this.selectArr = [];
      this.storeCheckbox.selected = [];
      this.vendorsSelect.selected = "";
      this.filterParams = JSON.parse(this.filterParamsDefault);
      ++this.cascaderKey;
      if (this.$route.query.page == 1) {
        this.getItem();
      } else {
        this.$router.push({
          query: {
            page: 1,
          },
        });
      }
    },
    filterGetItem(status) {
      //筛选
      if (status == "showCancel") {
        this.isShowCancel = !this.isShowCancel;
      }
      if (this.$route.query.page == 1) {
        this.getItem();
      } else {
        this.$router.push({
          query: {
            page: 1,
          },
        });
      }
    },
    filterGetItem2(type) {
      if (type == 3) {
        this.waitStatus = 0;
        this.cancelStatus = 1;
      } else {
        this.cancelStatus = type;
      }

      //筛选
      if (this.$route.query.page == 1) {
        this.getItem();
      } else {
        this.$router.push({
          query: {
            page: 1,
          },
        });
      }
    },
    dateChange() {
      if (this.filterParams.date.length > 1) {
        this.filterParams.dateFrom = moment(
          this.filterParams.date[0]
        ).format("YYYY-MM-DD");
        this.filterParams.dateTo = moment(
          this.filterParams.date[1]
        ).format("YYYY-MM-DD");
        this.filterGetItem();
      }
    },
    postCanceOrder() {
      if (!this.cancelOrderDialog.stopReason) {
        this.$message({
          message: this.$t("The reason must be entered"),
          type: "error",
        });
        return;
      }
      this.cancelOrderDialog.loading = true;
      this.$apiCall(
        "api.Invoice.cancel",
        {
          invoiceId: this.cancelOrderDialog.id,
          stopReason: this.cancelOrderDialog.stopReason,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            this.$message({
              message: "Success",
              type: "success",
            });
            this.cancelOrderDialog.id = "";
            this.cancelOrderDialog.visible = false;
            this.getItem(true, true);
            this.$emit("getNum");
          } else {
            this.$message({
              message: r.Message,
              type: "error",
            });
          }
        }
      );
      this.cancelOrderDialog.loading = false;
    },
    cancelOrderDialogClose() {
      this.cancelOrderDialog.id = "";
      this.cancelOrderDialog.visible = false;
    },
    cancelInvoice(item) {
      this.cancelOrderDialog.stopReason = "";
      this.cancelOrderDialog.id = item.id;
      this.cancelOrderDialog.visible = true;
      this.cancelOrderDialog.loading = false;
      //作废
      // this.$confirm("Are you sure you want to cancel it?", "", {
      //   confirmButtonText: "OK",
      //   cancelButtonText: "Cancel",
      //   type: "error",
      // })
      //   .then(() => {
      //     this.$apiCall("api.Invoice.cancel", {
      //       invoiceId: item.id
      //     }, (r) => {
      //       if(r.ErrorCode == 9999) {
      //         this.$message({
      //           message: "Success",
      //           type: "success"
      //         });
      //         this.getItem(true, true);
      //       } else {
      //         this.$message({
      //           message: r.Message,
      //           type: "error"
      //         });
      //       }
      //     });
      //   })
      //   .catch(() => {});
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
        status: this.isShowCancel ? 9 : this.filterParams.status,
        customerRead: this.filterParams.customerRead,
        payStatus: this.filterParams.payStatus,
        relationshipId: this.vendorsSelect.selected, // this.filterParams.relationshipId
        trackNumber: this.filterParams.trackNumber,
        codeName: this.filterParams.codeName,
        accountId: this.filterParams.accountId[1],
        accountIds: this.storeCheckbox.selected,
      };
      if (this.waitStatus) params.status = 7;
      this.$apiCall("api.Invoice.findByCustomer", params, (r) => {
        this.$hideLoading();
        if (r.ErrorCode == 9999) {
          this.items = [];
          r.Data.Results.forEach((item) => {
            item.confirmLoading = false;
            this.items.push(item);
          });
          this.total = Number(r.Data.Pagination.totalCount);
          this.totalPage = Number(r.Data.Pagination.totalPage);
          // this.$emit("getTableHeight", this);
          if (r.Data.Results.length && r.Data.Results[0].confirmCnt)
            this.waitConfirmCnt = Number(r.Data.Results[0].confirmCnt);
          if (re && !this.items.length && this.waitStatus) {
            this.waitStatus = 0;
            this.clearFilter();
          }
          if (!s) this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
        } else {
          this.$message({
            message: r.Message,
            type: "error",
          });
        }
      });
    },
    toPage(val) {
      if (val != this.$route.query.page)
        this.$router.push({
          query: {
            page: val,
          },
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
        name: "importData",
      });
    },
    gotoInvoice(item, type) {
      let routeData = this.$router.resolve({
        path:
          "/i/" + item.uniCode + "?fromPage=1" + (type ? `&type=${type}` : ""),
      });
      window.open(routeData.href, "_blank");
    },
    isPay(elem) {
      if (this.$root.$children[0].baseUrl == "/my") {
        if (elem.walletOpen) {
          return true;
        } else {
          return false;
        }
      } else {
        if (elem.walletOpen) {
          return true;
        } else {
          if (elem.bonusStatus == 1 || elem.hasPayBind) {
            return true;
          } else {
            return false;
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped="scoped">
.page-filter {
  position: relative;
  .show-cancel {
    position: absolute;
    top: 56px;
    right: 0;
  }
}
@media screen and (min-width: 1442px) {
  .page-filter .show-cancel {
    top: -47px;
    right: 200px;
  }
}
@media screen and (min-width: 1530px) {
  .page-filter .show-cancel {
    top: -47px;
    right: 290px;
  }
}

.el-dropdown :focus {
  outline: 0;
}
.el-dropdown-menu__item {
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
  font-family: Segoe UI Semibold, Segoe WP Semibold, Segoe WP, Segoe UI, Arial,
    Sans-Serif;
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
.label-primary {
  color: #5c6ac4;
}
</style>
<style lang="scss" scoped>
.black {
  color: #303133 !important;
}
.top-warning {
  height: 50px;
  border: 1px #e6a23c solid;
  border-left-width: 4px;
  .c-title {
    line-height: 22px;
    i {
      margin-right: 5px;
      color: #606266;
      font-size: 16px;
    }
    b {
      color: #606266;
    }
  }
}

.order-time-tips {
  padding: 5px;
  font-size: 12px;
  text-align: center;
  line-height: 2;
  p {
    span {
      width: 60px;
      text-align: right !important;
    }
  }
}
.shopify-stroe-checkbox {
  .el-checkbox {
    display: block;
    margin: 10px 0;
  }
  .clear {
    margin-top: 10px;
    text-align: right;
  }
}
</style>
<style>
.el-alert.el-alert--info i.el-alert__icon.el-icon-info {
  color: #5c6ac4 !important;
}
</style>
