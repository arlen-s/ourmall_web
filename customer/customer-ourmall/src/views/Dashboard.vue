<template>
  <div class="contentpanel dashboard-page">
    <div class="pagetitle">
      <div class="left">
        <div class="title">
          <i class="el-icon-s-home"></i>
          <h2>Dashboard</h2>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <template v-show="!card2Loading">
      <!-- <div
        v-show="noneData >= 1 && !Number(dashBoardData.allPurchaseCnt)"
        class="pagebody"
      >
        <div class="step-alert">
          <router-link :to="{ name: 'guidance' }">
            <template v-if="$root.$children[0].baseUrl == '/my'">
              <img src="./../../public/images/new-alert2.png"/>
            </template>
            <template v-else>
              <img src="./../../public/images/new-alert.png"/>
            </template>
          </router-link>
        </div>
      </div> -->
      <div class="pagebody">
        <template>
          <div>				            
        <el-row :gutter="20"
        class="mg-b-30 user-status-list"
      >
              <el-col :span="8">
                <el-card :body-style="{ height:'290px' }">
                  <div class="grid-content d-flex grid-dashboard">
                    <div class="grid-top">
                      <img class="walletIcon" src="../../public/images/qianbao.png" alt="">
                    </div>
                    <div class="grid-bottom">
                      <h2 class="tx-primary">balance($): {{balance || '0.00'}}</h2>
                      <p>wallet</p>
                    </div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="8" class="d-box">
                <el-card class="box-card" :body-style="{ padding: '0px 0px 20px 0px',height:'232px' }">
                <div slot="header" class="clearfix">
                      <span>system notification</span>
                    </div>
                    <div v-for="o in advData.slice(0,5)" :key="o.id" class="text item fit-box">
                      <p class="text-style" @click="lookLog(o.id)">
                         <el-link type="primary"> <i class="round"></i> {{o.title}}</el-link>
                         <span>{{o.createdAt}}</span>
                        </p>
                    </div>
              </el-card>
              </el-col>
      </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-card>
                  <div class="grid-content d-flex grid-dashboard">
                    <div class="grid-top">
                      <i class="el-icon-bank-card"></i>
                    </div>
                    <div class="grid-bottom">
                      <h2 class="tx-primary">{{ dashBoardData.orderCnt }}</h2>
                      <p>This month Orders</p>
                    </div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card>
                  <div class="grid-content d-flex justify-content-between">
                    <div class="d-flex grid-dashboard">
                      <div class="grid-top">
                        <i class="fa fa-dollar"></i>
                      </div>
                      <div class="grid-bottom">
                        <h2 class="tx-primary">
                          {{ $showSybmol() }}
                          {{ $exchangeRate(dashBoardData.orderRevenue) }}
                        </h2>
                        <p>This month Revenue</p>
                      </div>
                    </div>
                    <div>
                      <template v-if="dashBoardData.orderRevenueRate == 0">
                        {{ dashBoardData.orderRevenueRate }}
                      </template>
                      <template v-else>
                        <i
                          v-if="dashBoardData.orderRevenueRate < 0"
                          class="el-icon-bottom tx-danger tx-bold"
                        ></i>
                        <i
                          v-if="dashBoardData.orderRevenueRate > 0"
                          class="el-icon-top tx-success tx-bold"
                        ></i>
                        {{ dashBoardData.orderRevenueRate }}
                      </template>
                      <span> %</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card>
                  <div class="grid-content d-flex justify-content-between">
                    <div class="d-flex grid-dashboard">
                      <div class="grid-top">
                        <i class="fa fa-tags"></i>
                      </div>
                      <div class="grid-bottom">
                        <h2 class="tx-primary">
                          {{ $showSybmol() }}
                          {{ $exchangeRate(dashBoardData.orderCost) }}
                        </h2>
                        <p>This month Cost</p>
                      </div>
                    </div>
                    <div>
                      <template v-if="dashBoardData.orderCostRate == 0">
                        {{ dashBoardData.orderCostRate }}
                      </template>
                      <template v-else>
                        <i
                          v-if="dashBoardData.orderCostRate < 0"
                          class="el-icon-bottom tx-danger tx-bold"
                        ></i>
                        <i
                          v-if="dashBoardData.orderCostRate > 0"
                          class="el-icon-top tx-success tx-bold"
                        ></i>
                        {{ dashBoardData.orderRevenueRate }}
                      </template>
                      <span> %</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>

          <div class="mg-t-20">
            <el-card>
              <div
                class="
                  statistic-top
                  d-flex
                  align-item-center
                  justify-content-between
                "
              >
                <h2>Statistics</h2>
                <div>
                  <el-date-picker
                    :picker-options="pickerOptions0"
                    value-format="yyyyMMdd"
                    v-model="statisticDate"
                    @change="dateChange"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="Start"
                    end-placeholder="End"
                  >
                  </el-date-picker>
                  <el-select
                    class="mg-l-20"
                    style="width: 200px"
                    v-model="statisticDateRange"
                    placeholder="Date Range"
                    @change="dateRangeChange"
                  >
                    <el-option
                      v-for="(time, k) in dateArr"
                      :key="time"
                      :label="time"
                      :value="k"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="mg-t-20" style="width: 100%">
                <div
                  ref="chart"
                  id="dashboardCharts"
                  style="width: 100%; height: 400px"
                ></div>
              </div>
            </el-card>
          </div>

          <div class="mg-t-20">
            <el-row :gutter="20">
              <el-col :span="16">
                <el-card>
                  <div class="grid-content">
                    <h2>Reference</h2>
                  </div>
                  <div class="grid-content mg-t-20">
                    <el-table :data="tableData" stripe style="width: 100%">
                      <el-table-column prop="date" label="Date" width="180">
                      </el-table-column>
                      <el-table-column prop="orderCnt" label="Total Orders">
                      </el-table-column>
                      <el-table-column
                        :label="`Revenue (${$showSybmol()})`"
                        width="180"
                      >
                        <template slot-scope="scope">
                          {{ $exchangeRate(scope.row.revenue) }}
                        </template>
                      </el-table-column>
                      <el-table-column
                        :label="`Cost (${$showSybmol()})`"
                        width="180"
                      >
                        <template slot-scope="scope">
                          {{ $exchangeRate(scope.row.cost) }}
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="grid-content mg-t-20 text-center">
                    <el-button
                      size="small"
                      type="primary"
                      @click="showMoreReference"
                      >Show More</el-button
                    >
                  </div>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card>
                  <div class="grid-content">
                    <h2>Quick Summary</h2>
                  </div>
                  <el-divider></el-divider>
                  <div
                    class="
                      grid-content
                      d-flex
                      grid-dashboard
                      quick-summary
                      mg-t-20 mg-b-20
                    "
                    @click="gotoPage(1)"
                  >
                    <div
                      class="grid-top"
                      style="background-color: #f4f4f5; color: #909399"
                    >
                      <i class="el-icon-bank-card"></i>
                    </div>
                    <div class="grid-bottom">
                      <h2 class="tx-primary">
                        {{ dashBoardData.waitPlaceOrder }} Orders
                      </h2>
                      <p>Waiting to place order</p>
                    </div>
                  </div>
                  <el-divider></el-divider>
                  <div
                    class="
                      grid-content
                      d-flex
                      grid-dashboard
                      quick-summary
                      mg-t-20 mg-b-20
                    "
                    @click="gotoPage(2)"
                  >
                    <div
                      class="grid-top"
                      style="background-color: #f0f9eb; color: #67c23a"
                    >
                      <i class="el-icon-bank-card"></i>
                      <!--fa fa-shopping-cart-->
                    </div>
                    <div class="grid-bottom">
                      <h2 class="tx-primary">
                        {{ dashBoardData.invoiceCnt }} Orders
                      </h2>
                      <p>Waiting for tracking code</p>
                    </div>
                  </div>
                  <el-divider></el-divider>
                  <div
                    class="
                      grid-content
                      d-flex
                      grid-dashboard
                      quick-summary
                      mg-t-20 mg-b-20
                    "
                    @click="gotoPage(3)"
                  >
                    <div class="grid-top">
                      <i class="el-icon-shopping-cart-full"></i>
                    </div>
                    <div class="grid-bottom">
                      <h2 class="tx-primary">
                        {{ dashBoardData.shopCnt }} Stores
                      </h2>
                      <p>Authorized</p>
                    </div>
                  </div>
                  <!-- <el-divider></el-divider>
                  <div
                    class="grid-content d-flex grid-dashboard quick-summary mg-t-20 mg-b-20"
                    @click="gotoPage(4)"
                  >
                    <div class="grid-top">
                      <i class="el-icon-s-custom"></i>
                    </div>
                    <div class="grid-bottom">
                      <h2 class="tx-primary">
                        {{ dashBoardData.vendorCnt }} Vendors
                      </h2>
                    </div>
                  </div> -->
                </el-card>
              </el-col>
            </el-row>
          </div>
        </template>
        <template v-if="false">
          <el-row :gutter="20" class="mg-b-20" style="min-height: 200px">
            <el-col :span="24" class="card-box" v-loading="card1Loading">
              <div class="d-flex justify-content-between">
                <h2>My Vendors</h2>
                <el-link class="mg-r-15" @click="goto('vendors')">MORE</el-link>
              </div>
              <!-- 第一个card列表 -->
              <el-card
                v-for="(vendor, i) in vendorItems"
                :key="vendor.relationshipId + i"
                class="mg-b-20"
              >
                <el-row :gutter="20">
                  <el-col :span="18" class="left border-r">
                    <el-row class="mg-b-25" :gutter="20">
                      <!-- 商品循环 -->
                      <template v-if="vendor.skus.length">
                        <el-col
                          v-for="(item, index) in vendor.skus"
                          :span="6"
                          :key="item.id + index"
                        >
                          <div class="product-box">
                            <div class="image-box">
                              <el-image
                                class="mg-b-10"
                                :src="item.imgUrl"
                                :fit="'contain'"
                                style="width: 100%; height: 200px"
                              >
                                <div slot="error" class="image-slot">
                                  <div class="no-pic">
                                    <i></i>
                                    <span>No Picture</span>
                                  </div>
                                </div>
                              </el-image>
                              <el-popover
                                v-if="item.name && item.name.length > 40"
                                placement="bottom-end"
                                width="200"
                                trigger="hover"
                                :content="item.name"
                              >
                                <div
                                  class="product-name tx-ellipsis2"
                                  slot="reference"
                                >
                                  {{ item.name }}
                                </div>
                              </el-popover>
                              <div v-else class="product-name tx-ellipsis2">
                                {{ item.name }}
                              </div>
                            </div>
                            <div
                              v-if="item.price || Number(item.price)"
                              class="cost"
                            >
                              Purchase price:
                              <span
                                >{{ $showSybmol() }}
                                {{ $exchangeRate(item.price) }}</span
                              >
                              /piece
                            </div>
                            <div v-else class="cost">
                              Purchase price:
                              <span style="font-size: 14px">NOT SET</span>
                            </div>
                          </div>
                        </el-col>
                      </template>
                      <el-col v-else class="no-product" :span="24">
                        no product
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="6" class="right pd-l-10">
                    <div
                      class="
                        title
                        mg-b-10
                        d-flex
                        justify-content-between
                        align-items-center
                      "
                    >
                      <h3 style="font-size: 16px; font-weight: bold">
                        Statistics
                      </h3>
                      <div v-if="vendor.vendorName">
                        <i class="s-avaver">{{
                          vendor.vendorName.substr(0, 1)
                        }}</i>
                        {{ vendor.vendorName }}
                      </div>
                    </div>
                    <div v-if="vendor.vendorCnt.skuCnt" class="mg-b-20">
                      <span class="mg-r-5" style="color: #909399"
                        >Dispatched Items:</span
                      >
                      <span>{{ vendor.vendorCnt.skuCnt }}</span>
                    </div>
                    <div v-if="vendor.vendorCnt.invoiceCnt" class="mg-b-20">
                      <span class="mg-r-5" style="color: #909399"
                        >Valid Invoices:</span
                      >
                      <router-link
                        :to="{
                          name: 'invoices',
                          params: {
                            rid: vendor.relationshipId,
                            name: vendor.vendorName,
                          },
                        }"
                        >{{ vendor.vendorCnt.invoiceCnt }}</router-link
                      >
                    </div>
                    <div v-if="vendor.vendorCnt.invoiceAmount" class="mg-b-20">
                      <span style="color: #909399">Valid Amount Due:</span>
                      <span
                        >{{ $showSybmol() }}
                        {{
                          $exchangeRate(vendor.vendorCnt.invoiceAmount)
                        }}</span
                      >
                    </div>
                    <div>
                      <el-button type="primary" @click="gotoOrder(vendor)"
                        >{{
                          vendor.itemCnt == "0"
                            ? "Place Order"
                            : `${vendor.itemCnt} items are dispatchable`
                        }}
                      </el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <el-row v-if="items2.length" :gutter="20" class="mg-b-20">
            <el-col :span="24">
              <a href="javascript:;">
                <img
                  style="width: 100%"
                  src="./../../public/images/banner/d1.png"
                />
              </a>
            </el-col>
          </el-row>
          <el-row v-if="items2.length" :gutter="20" class="mg-b-20">
            <el-col :span="24" class="card-box" v-loading="card2Loading">
              <h2>Order’s items that you can dispatch to vendors</h2>
              <el-card>
                <el-row :gutter="20">
                  <el-col :span="18" class="left border-r">
                    <el-row class="mg-b-25" :gutter="20" v-if="items2.length">
                      <template v-for="(item, index) in items2">
                        <el-col
                          v-if="index < 4"
                          :span="6"
                          :key="item.id + index"
                        >
                          <div class="product-box">
                            <div class="image-box">
                              <el-image
                                class="mg-b-10"
                                :src="item.imgUrl"
                                :fit="'contain'"
                                style="width: 100%; height: 200px"
                              >
                                <div slot="error" class="image-slot">
                                  <div class="no-pic">
                                    <i></i>
                                    <span>No Picture</span>
                                  </div>
                                </div>
                              </el-image>
                              <div class="product-name tx-ellipsis2">
                                {{ item.name ? item.name : "---" }}
                              </div>
                            </div>
                          </div>
                        </el-col>
                      </template>
                    </el-row>
                    <el-row v-else :gutter="20">
                      <el-col
                        :span="24"
                        class="text-center"
                        style="color: ##c0c4cc"
                        >No Data</el-col
                      >
                    </el-row>
                  </el-col>
                  <el-col
                    :span="6"
                    class="d-flex justify-content-center align-items-center"
                    style="flex-direction: column"
                  >
                    <a
                      class="add-vendor-btn"
                      href="javascript:;"
                      @click="goto('shopifyOrders', { vid: '999e' })"
                    >
                      <i class="el-icon-plus"></i><br /><br />
                      Dispatch order’s items to vendors
                    </a>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="mg-b-20">
            <el-col :span="24">
              <a href="javascript:;" @click="goto('stores', { add: true })">
                <img
                  style="width: 100%"
                  src="./../../public/images/banner/d2.png"
                />
              </a>
            </el-col>
          </el-row>
        </template>
      </div>
    </template>
    <el-dialog
      @open="openSend"
      custom-class="sendInvoice"
      title="Send to vendor"
      :visible.sync="sendInvoiceOpen"
      width="50%"
    >
      <template>
        <el-tabs
          v-model="activeShareName"
          type="card"
          style="margin-left: 20px; margin-top: 10px"
        >
          <el-tab-pane name="shareWeixin">
            <span slot="label"
              ><i class="iconfont icon-shejiao"></i> Share by APP</span
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
                  Title:
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
                  Desc:
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
                  Share:
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
                        <p class="tx-center mg-b-10">Scan share to WeChat</p>
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
                        <i class="fa fa-weixin"></i> Share
                      </a>
                    </el-tooltip>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane name="shareLink">
            <span slot="label"
              ><i class="iconfont icon-link"></i> Share by link</span
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
                Share link:
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
                    >Copy Link</el-button
                  >
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
            >Clear</el-button
          >
        </div>
        <div>
          <el-button size="small" @click="sendInvoiceOpen = false"
            >Close</el-button
          >
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :title="`Welcome to use ${$root.$children[0].pName.a} DropShipping App`"
      :visible.sync="DialogDispatchSetting.isShow"
      width="700px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <div style="padding: 0 25px">
        <p style="margin-bottom: 10px">
          Your vendor
          <b style="margin: 0 5px; color: #606266; font-size: 14px">{{
            DialogDispatchSetting.vendorName
          }}</b>
          is inviting you to allocate your Orders
        </p>
        <p
          style="
            margin-bottom: 10px;
            padding-bottom: 15px;
            border-bottom: 1px #e4e7ed solid;
          "
        >
          Your store name:
          <b style="margin: 0 5px; color: #606266; font-size: 14px">
            {{ this.$store.state.userInfo.name }}</b
          >
        </p>
        <div style="margin-bottom: 10px">
          <span style="margin-right: 15px">Dispatch order method:</span>
          <b style="color: #606266"
            >All my unfulfilled / partially fulfilled orders</b
          >
        </div>
        <div style="margin-bottom: 15px">
          <span style="margin-right: 15px">Cycle time:</span>
          <b style="color: #606266">Every 1 day</b>
        </div>
        <div style="color: #909399">
          <i class="el-icon-info" style="margin-right: 5px"></i>
          You can modify your order dispatch rules at any time in the menu "My
          Orders >> Dispatch settings"
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <div>
          <el-button
            :disabled="DialogDispatchSetting.loading"
            @click="DialogDispatchSetting.isShow = false"
            >Remind later</el-button
          >
          <el-button
            type="primary"
            :disabled="DialogDispatchSetting.loading"
            :loading="DialogDispatchSetting.loading"
            @click="saveDispatchSetting"
            >I agree</el-button
          >
        </div>
      </div>
    </el-dialog>
    <el-dialog
      width="30%"
      title="Dispatch rule Test Preview"
      :visible.sync="DialogDispatchPreview.isShow"
      append-to-body
    >
      <div style="padding: 20px">
        <p style="margin-bottom: 10px">
          According to your settings, we found some data for you:
        </p>
        <p>
          Shopify order:
          <b style="margin-right: 15px; color: #5c6ac4">{{
            DialogDispatchPreview.orderCnt
          }}</b>
          (Dispatch to
          <b style="color: #5c6ac4">{{ DialogDispatchPreview.vendorCnt }}</b>
          vendor(s))
        </p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          :disabled="DialogDispatchPreview.loading"
          @click="DialogDispatchPreview.isShow = false"
        >
          Dispatch in the Next Cycle
        </el-button>
        <el-button
          :loading="DialogDispatchPreview.loading"
          :disabled="DialogDispatchPreview.loading"
          type="primary"
          @click="runDispatchRule"
          >Dispatch Immediately</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      :loading="moreReference.loading"
      title="Reference"
      :visible.sync="moreReference.isShow"
      width="800px"
    >
      <el-divider></el-divider>
      <div class="mg-t-20 mg-b-20 mg-l-20 mg-r-20">
        <el-table :data="moreReference.tableData" stripe style="width: 100%">
          <el-table-column prop="date" label="Date" width="180">
          </el-table-column>
          <el-table-column prop="orderCnt" label="Total Orders">
          </el-table-column>
          <el-table-column
            prop="revenue"
            :label="`Revenue (${$showSybmol()})`"
            width="180"
          >
            <template slot-scope="scope">
              {{ $exchangeRate(scope.row.revenue) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="cost"
            :label="`Cost (${$showSybmol()})`"
            width="180"
          >
            <template slot-scope="scope">
              {{ $exchangeRate(scope.row.cost) }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-row v-if="tableData.length" :gutter="20" class="mg-b-20">
        <el-col :span="24" class="d-flex justify-content-center">
          <div>
            <el-pagination
              :current-page="moreReference.page"
              :background="true"
              layout="sizes, total, prev, pager, next, jumper"
              :page-sizes="moreReference.pageSizes"
              :page-size="moreReference.rowsPerPage"
              :total="Number(moreReference.total)"
              @current-change="toPage"
              @size-change="changePageSize"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <div slot="footer" class="dialog-footer d-flex justify-content-end">
        <div>
          <el-button size="small" @click="moreReference.isShow = false"
            >Close</el-button
          >
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :title="`Welcome to use ${$root.$children[0].pName.a} DropShipping App`"
      :visible.sync="DialogEntrustStore.isShow"
      width="700px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <div style="padding: 0 25px">
        <p style="margin-bottom: 10px">
          Your vendor
          <b style="margin: 0 5px; color: #606266; font-size: 14px">{{
            DialogEntrustStore.vendorName
          }}</b>
          is inviting you to allocate your Orders
        </p>
        <p
          style="
            margin-bottom: 10px;
            padding-bottom: 15px;
            border-bottom: 1px #e4e7ed solid;
          "
        >
          Your store name:
          <b style="margin: 0 5px; color: #606266; font-size: 14px">
            {{ DialogEntrustStore.shopName }}</b
          >
        </p>
        <div style="color: #909399">
          <i class="el-icon-info" style="margin-right: 5px"></i>
          You can modify your store settings at any time in the menu "My Stores"
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <div>
          <el-button
            :disabled="DialogEntrustStore.loading"
            @click="DialogEntrustStore.isShow = false"
            >Remind later</el-button
          >
          <el-button
            type="primary"
            :disabled="DialogEntrustStore.loading"
            :loading="DialogEntrustStore.loading"
            @click="saveEntrustStore"
            >I agree</el-button
          >
        </div>
      </div>
    </el-dialog>
    <div class="el-tips" type="primary" circle @click="tips = !tips">
      <div>Newbie</div>
      <div>guide</div>
    </div>
    <el-dialog
      title="Newbie guide"
      :visible.sync="tips"
      width="681px"
      class="guide"
      custom-class="verify-1"
    >
      <div class="tips-content">
        <p class="ctx">
          <el-tag type="warning" class="mg-r-10">Step 1</el-tag> Complete
          personal information
        </p>
        <p class="ctx">
          <el-tag type="warning" class="mg-r-10">Step 2</el-tag>Authorize to
          bind the store
        </p>
        <p class="ctx">
          <el-tag type="warning" class="mg-r-10">Step 3</el-tag>Publish the push
          product
        </p>
        <p class="ctx">
          <el-tag type="warning" class="mg-r-10">Step 4</el-tag>Start pulling
          orders
        </p>
      </div>
      <div class="flex-center">
        <el-button class="btn spec-1" type="primary" @click="tips = false"
          >Already
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
  :title="advLook.title"
  :visible.sync="dialogVisibleLog"
  width="40%">
  <div v-html="advLook.content" style="padding:0 20px" class="set-css"></div>
  <span slot="footer" class="dialog-footer">
   <el-button type="primary" @click="dialogVisibleLog = false">enter</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import { commodityTypeMore } from "@/components/productList";
export default {
  data() {
    return {
      tipsNum: 1,
      tips: false,
      autoplay: true,
      activeIndex: 0,
      vendorsList: [],
      dialogVisibleLog: false,
      advLook: {},
      aliexpressVendorsStatus: !localStorage.getItem(
        "c_aliexpressVendorsStatus"
      ),
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        },
      },
      scrollContainer: this.$root.$children[0].$refs.mainScroll,
      card1Loading: false,
      card2Loading: false,
      card3Loading: false,
      vendorItems: [],
      items: [],
      totalCount: 0,
      items2: [],
      iList: [],
      invoiceInfo: "",
      shareTitle: "",
      shareDesc: "",
      sendInvoiceOpen: false,
      activeShareName: "shareWeixin",
      showDownloadInvoice: false,
      remarkLoading: false,
      noneData: 0,
      DialogEntrustStore: {
        isShow: false,
        loading: false,
        vendorName: "---",
        vendorId: "",
        shopName: "---",
        id: "",
      },
      DialogDispatchSetting: {
        isShow: false,
        loading: false,
        vendorName: "---",
        vendorId: "",
        storeName: "---",
        allProducts: 0,
        productIds: [],
        getProductsloading: false,
        products: [],
        period: "1",
      },
      DialogDispatchPreview: {
        isShow: false,
        loading: false,
        orderCnt: 0,
        vendorCnt: 0,
      },
      statisticDate: [],
      statisticDefaultDate: [],
      statisticDateRange: "3",
      statisticDateFrom: "",
      statisticDateTo: "",
      dateArr: {
        1: "Today",
        2: "Last 7 days",
        3: "Last 30 days",
        4: "Last 90 days",
        5: "Last 12 months",
        6: "Custom",
      },
      userInfo: localStorage.getItem("c_ourMallUserInfo")
        ? JSON.parse(localStorage.getItem("c_ourMallUserInfo"))
        : "",
      tableData: [],
      moreReference: {
        isShow: false,
        pageSizes: [10, 20, 50, 100],
        page: 1,
        rowsPerPage: localStorage.getItem("c_moreReferenceRowsPerPage")
          ? Number(localStorage.getItem("c_moreReferenceRowsPerPage"))
          : 10,
        items: [],
        total: 0,
        totalPage: 0,
        loading: false,
        tableData: [],
      },
      dashBoardData: {},
      marketLoading: true,
      categorysList: [],
      advData: []
    };
  },
  created() {
    this.tipsNum = localStorage.getItem("tips") || 1;
    if (this.tipsNum == 1) {
      this.tips = true;
      localStorage.setItem("tips", 2);
    } else {
      this.tips = false;
    }
  },
  mounted() {
    if (
      localStorage.getItem("c_ourMallFirstLogin") &&
      localStorage.getItem("c_ourMallFirstLogin") == 2
    ) {
      //非第一次登陆
      this.noneData = 0;
      this.getOrderItems();
    } else {
      //第一次登陆,不论有没有订单，都进入之前的dashboard演示流程页面
      this.noneData = 1;
    }
    //没有用户就进入guidance页面
    //			let userInfo = localStorage.getItem('c_ourMallUserInfo') ? JSON.parse(localStorage.getItem('c_ourMallUserInfo')) : "";
    //			if(userInfo && userInfo.vendorCnt == 0 && !sessionStorage.getItem('c_haveShownGuide')){
    //				this.$router.push({name:"guidance"});
    //				return;
    //			}
    //			this.getDashboardVendors();
    //			this.getLastInvoice();
    this.$apiCall("api.Invoice.findStores", {}, (r) => {
      if (r.ErrorCode == 9999) {
        let stores = r.Data.Results;
        //					if(r.Data.Results.length > 0){
        //						this.DialogEntrustStore.id = r.Data.Results[0].id;
        //					}
        this.$apiCall("api.Relationship.findByCustomer", {}, (r) => {
          if (r.ErrorCode == 9999) {
            if (r.Data.Results.length > 0) {
              let item = r.Data.Results.find((item) => item.vendorId);
              if (
                this.$store.state.userInfo.isInvite == 1 &&
                !Number(this.$store.state.userInfo.ruleCnt) &&
                stores.every((store) => {
                  return !store.vendorName;
                })
              ) {
                stores.forEach((store, index) => {
                  if (
                    store.subShopUrl ==
                      localStorage.getItem("c_inviteShopUrl") &&
                    store.authStatus == 1 &&
                    this.$store.state.userInfo.vendorCnt == "1"
                  ) {
                    //上一步店铺名
                    this.DialogEntrustStore.shopName = stores[index].subShopUrl;
                    this.DialogEntrustStore.id = stores[index].id;
                    if (item.vendorId)
                      this.DialogEntrustStore.vendorId = item.vendorId;
                    this.DialogEntrustStore.vendorName = item.vendorName;
                    this.DialogEntrustStore.isShow = true;
                    localStorage.removeItem("c_inviteShopUrl");
                  }
                });
              }
            }
          }
        });
      }
    });
    this.getDashboardSummary();
    this.myEcharts();
    this.getVnedors();
    this.getVendorShop();
    this.getBalance()
    this.getAdvList()
  },
  components: {},
  computed: {
    ActiveCategoryName() {
      return (
        this.categorysList.length && this.categorysList[this.activeIndex].name
      );
    },
  },
  methods: {
    check2(e) {
      if (e) {
        //  e==true
        this.data.warning = false;
      } else {
        this.data.warning = true;

        //  e==false
      }
    },
    getAdvList(){ //获取
      this.$apiCall("api.Notice.finds", {rType:2}, r => {
        if (r.ErrorCode == 9999) {
          console.log(r.Data, 'dfsdfsd');
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
    getBalance(){
				this.$apiCall("api.Relationship.getUserBonus", {
				}, r => {
					if(r.ErrorCode == 9999) {
						this.balance = r.Data.Results
						
					}else{
						this.$elementMessage(r.Message, 'error');
					}
				})
			},
    getVendorShopProducts() {
      //getVendorShop 后获取商品
      let num = this.categorysList.length;
      this.categorysList.forEach((category) => {
        this.$apiCall(
          "api.VendorShop.findProducts",
          { page: 1, rowsPerPage: 12, categoryId: category.id },
          (r) => {
            num--;
            if (!num) this.marketLoading = false;
            if (r.ErrorCode == "9999") {
              category.items = r.Data.Results;
            } else {
              this.$elementMessage(r.Message, "error");
            }
          }
        );
      });
    },
    getVendorShop() {
      this.categorysList = [];
      let categorys = commodityTypeMore;
      function randomNum(minNum, maxNum) {
        switch (arguments.length) {
          case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
          case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
          default:
            return 0;
            break;
        }
      }
      //随机取5个分类
      let getCNum = 5;
      let getCagegorys = () => {
        if (!getCNum) {
          this.getVendorShopProducts(); //结束获取商品
          return;
        }
        let num = randomNum(0, categorys.length);
        if (categorys[num]) {
          this.categorysList.push(categorys[num]);
          getCNum--;
        }

        categorys.splice(num, 1);
        setTimeout(() => {
          getCagegorys();
        }, 50);
      };
      getCagegorys();
    },
    deleteTramsform(event) {
      // console.log(event)
      // console.log(this.$refs.pricingCarousel)
      // event.path[5].style = ''
    },
    productTag(id) {
      this.$router.push({
        path: "/aliExpress-dropShipping-vendors",
        query: {
          typeid: id,
        },
      });
    },
    addVendors(id, vendorId) {
      this.$showLoading();
      this.$apiCall(
        "api.VendorShop.addToMyVendor",
        {
          id,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            // this.items = r.Data.Results;
            this.vendorsList.forEach((item) => {
              if (item.vendorId === vendorId) {
                this.$set(item, "isAdded", 1);
              }
            });
            this.$elementMessage("Add vendors success", "success");
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure();
            }
          }
          this.$hideLoading();
        }
      );
    },
    closeAliexporessVendors() {
      this.aliexpressVendorsStatus = false;
      localStorage.setItem("c_aliexpressVendorsStatus", "1");
    },
    setActiveItem(i) {
      this.autoplay = false;
      this.$refs.pricingCarousel.setActiveItem(i);
    },
    handleChangeCarousel() {
      this.activeIndex = this.$refs.pricingCarousel.activeIndex;
    },
    getVnedors() {
      this.$apiCall(
        "api.VendorShop.findByCustomer",
        {
          page: 1,
          rowsPerPage: 5,
          rand: true,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            this.vendorsList = r.Data.Results;
            this.vendorsList.forEach((item) => {
              const arr = [];
              item.products.slice(0, 4).forEach((items) => {
                arr.push(items.imgUrl);
              });
              this.$set(item, "imgUrlGroup", arr);
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
    gotoPage(type) {
      switch (type) {
        case 1:
          this.$router.push({ name: "WaitingForAllocated" });
          break;
        case 2:
          this.$router.push({
            name: "OrderProcessing",
            query: {
              status: 4,
            },
          });
          break;
        case 3:
          this.$router.push({
            path: "/stores",
            query: {
              isAuth: "1",
            },
          });
          break;
        case 4:
          this.$router.push({ name: "vendors" });
          break;
        case 5:
          this.$router.push({ name: "importList" });
          break;
        case 6:
          this.$router.push({ path: "/aliExpress-dropShipping-vendors" });
          break;
        default:
          this.$router.push({ name: "products" });
          break;
      }
    },
    getTableData() {
      this.moreReference.loading = true;
      this.$apiCall(
        "api.Invoice.dashboardStatistic",
        {
          page: this.moreReference.page,
          rowsPerPage: this.moreReference.rowsPerPage,
        },
        (r) => {
          this.moreReference.loading = false;
          if (r.ErrorCode == 9999) {
            this.moreReference.tableData = Object.values(r.Data.Results);
            if (this.moreReference.tableData.length) {
              this.moreReference.tableData.forEach((item) => {
                this.$set(item, "dateCode1", Number(item.dateCode));
                this.$set(
                  item,
                  "date",
                  item.dateCode.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")
                );
              });
              this.moreReference.total = Number(r.Data.Pagination.totalCount);
              this.moreReference.totalPage = Number(
                r.Data.Pagination.totalPage
              );
              this.moreReference.tableData = this.moreReference.tableData.sort(
                this.sortData
              );
            }
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    sortData(a, b) {
      return b.dateCode1 - a.dateCode1;
    },
    dateChange() {
      console.log(moment(this.statisticDate[0]).format("YYYYMMDD"));
      if (this.statisticDate && this.statisticDate.length > 1) {
        this.statisticDateFrom = moment(this.statisticDate[0]).format(
          "YYYYMMDD"
        );
        this.statisticDateTo = moment(this.statisticDate[1]).format("YYYYMMDD");
        this.$Burying({
          object: "4001",
          objectId: `${this.statisticDateFrom} - ${this.statisticDateTo}`,
        });
        this.myEcharts(1);
        this.statisticDateRange = "";
      }
    },
    dateRangeChange() {
      let type = this.statisticDateRange;
      switch (type) {
        case "1":
          this.statisticDateFrom = moment().format("YYYYMMDD");
          this.statisticDateTo = moment().format("YYYYMMDD");
          break;
        case "2":
          this.statisticDateFrom = moment().subtract(7, "d").format("YYYYMMDD");
          this.statisticDateTo = moment().format("YYYYMMDD");
          break;
        case "3":
          this.statisticDateFrom = moment()
            .subtract(30, "d")
            .format("YYYYMMDD");
          this.statisticDateTo = moment().format("YYYYMMDD");
          break;
        case "4":
          this.statisticDateFrom = moment()
            .subtract(90, "d")
            .format("YYYYMMDD");
          this.statisticDateTo = moment().format("YYYYMMDD");
          break;
        case "5":
          this.statisticDateFrom = moment()
            .subtract(12, "M")
            .format("YYYYMMDD");
          this.statisticDateTo = moment().format("YYYYMMDD");
          break;
        default:
          this.statisticDateFrom = "";
          this.statisticDateTo = "";
          break;
      }
      this.statisticDate = [this.statisticDateFrom, this.statisticDateTo];
      this.$Burying({
        object: "4001",
        objectId: `${this.statisticDateFrom} - ${this.statisticDateTo}`,
      });
      this.myEcharts(1);
    },
    getDashboardSummary() {
      this.$showLoading();
      this.$apiCall("api.Invoice.dashboardSummary", {}, (r) => {
        this.$hideLoading();
        if (r.ErrorCode == 9999) {
          this.dashBoardData = r.Data.Results;
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
      this.$apiCall(
        "api.Invoice.dashboardStatistic",
        {
          page: this.moreReference.page,
          rowsPerPage: this.moreReference.rowsPerPage,
        },
        (r) => {
          this.$hideLoading();
          if (r.ErrorCode == 9999) {
            this.tableData = Object.values(r.Data.Results);
            if (this.tableData.length) {
              this.tableData.forEach((item) => {
                this.$set(item, "dateCode1", Number(item.dateCode));
                this.$set(
                  item,
                  "date",
                  item.dateCode.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")
                );
              });
              this.moreReference.total = Number(r.Data.Pagination.totalCount);
              this.moreReference.totalPage = Number(
                r.Data.Pagination.totalPage
              );
              this.tableData = this.tableData.sort(this.sortData);
            }
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    toPage(val) {
      if (val != this.moreReference.page) this.moreReference.page = val;
      this.getTableData();
    },
    changePageSize(val) {
      this.moreReference.rowsPerPage = val;
      this.moreReference.page = 1;
      localStorage.setItem("c_moreReferenceRowsPerPage", val);
      this.getTableData();
    },
    showMoreReference() {
      this.$Burying({
        object: "3012",
      });
      this.moreReference.isShow = true;
      this.getTableData();
    },
    myEcharts(type) {
      const chart = document.getElementById("dashboardCharts");
      if (!type) {
        this.statisticDateFrom = moment().subtract(1, "M").format("YYYYMMDD");
        this.statisticDateTo = moment().format("YYYYMMDD");
        this.statisticDate = [this.statisticDateFrom, this.statisticDateTo];
      }
      this.$showLoading();
      let arr = [];
      this.$apiCall(
        "api.Invoice.dashboardStatistic",
        {
          dateFrom: this.statisticDateFrom,
          dateTo: this.statisticDateTo,
        },
        (r) => {
          this.$hideLoading();
          if (r.ErrorCode == 9999) {
            arr = Object.values(r.Data.Results);
            if (arr.length) {
              arr.forEach((item) => {
                this.$set(
                  item,
                  "date",
                  item.dateCode.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")
                );
              });
            }
            console.log(arr);
            const myChart = echarts.init(chart);
            // 指定图表的配置项和数据
            var option = {
              title: {
                text: "",
              },
              tooltip: {
                trigger: "axis",
              },
              legend: {
                data: [`Total Revenue ${this.$showSybmol()}`, "Total Cost"],
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
              },
              //						    toolbox: {
              //						        feature: {
              //						            saveAsImage: {}
              //						        }
              //						    },
              xAxis: {
                type: "category",
                boundaryGap: false,
                data: arr.map((item) => item.date),
              },
              yAxis: {
                type: "value",
              },
              series: [
                {
                  name: `Total Revenue ${this.$showSybmol()}`,
                  type: "line",
                  stack: "Total Revenue",
                  data: arr.map((item) => this.$exchangeRate(item.revenue)),
                  smooth: true,
                },
                {
                  name: "Total Cost",
                  type: "line",
                  stack: "Total Cost",
                  data: arr.map((item) => this.$exchangeRate(item.cost)),
                  smooth: true,
                },
              ],
            };
            myChart.setOption(option);
            //修改首次进入时图的宽度
            setTimeout(function () {
              myChart.resize();
            }, 200);
            window.onresize = myChart.resize;
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    runDispatchRule() {
      this.DialogDispatchPreview.loading = true;
      this.$apiCall(
        "api.DispatchOrderRule.testGenerate",
        { isGenerate: 1 },
        (r) => {
          this.DialogDispatchPreview.loading = false;
          if (r.ErrorCode == 9999) {
            this.$elementMessage("success", "success");
            this.DialogDispatchPreview.isShow = false;
            this.$router.push({ name: "invoices" });
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    saveEntrustStore() {
      const params = {
        id: this.DialogEntrustStore.id,
        vendorId: this.DialogEntrustStore.vendorId,
      };
      this.$apiCall("api.ShopifyAccount.bindVendor", params, (r) => {
        this.DialogEntrustStore.loading = false;
        if (r.ErrorCode == 9999) {
          this.DialogEntrustStore.isShow = false;
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    saveDispatchSetting(type) {
      if (
        this.DialogDispatchSetting.allProducts &&
        !this.DialogDispatchSetting.productIds.length
      ) {
        this.$elementMessage("Please select the products", "error");
        return;
      }
      if (!this.DialogDispatchSetting.vendorId) {
        this.$elementMessage("Please select the vendor", "error");
        return;
      }
      if (!this.DialogDispatchSetting.period) {
        this.$elementMessage("Please select the circle period", "error");
        return;
      }
      this.DialogDispatchSetting.loading = true;
      const params = {
        relationshipId: this.DialogDispatchSetting.vendorId,
        period: this.DialogDispatchSetting.period,
        visibilityType: 1,
        productIds: this.DialogDispatchSetting.productIds,
        status: 1,
      };
      if (!this.DialogDispatchSetting.allProducts) {
        params.productIds = [];
      }
      this.$apiCall("api.DispatchOrderRule.addByCustomer", params, (r) => {
        if (r.ErrorCode == 9999) {
          this.$apiCall("api.DispatchOrderRule.testGenerate", {}, (r) => {
            this.DialogDispatchSetting.loading = false;
            this.DialogDispatchSetting.isShow = false;
            if (r.ErrorCode == 9999) {
              this.DialogDispatchPreview.vendorCnt = r.Data.Results.vendorCnt;
              this.DialogDispatchPreview.orderCnt = r.Data.Results.orderCnt;
              this.DialogDispatchPreview.isShow = true;
            } else {
              this.$elementMessage(r.Message, "error");
            }
          });
        } else {
          this.DialogDispatchSetting.loading = false;
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    remoteMethodGetProducts(query) {
      if (!query) {
        return;
      }
      this.DialogDispatchSetting.getProductsloading = true;
      this.$apiCall("api.Product.findByUser", { name: query }, (r) => {
        this.DialogDispatchSetting.getProductsloading = false;
        if (r.ErrorCode == 9999) {
          this.DialogDispatchSetting.products = [];
          r.Data.Results.forEach((e) => {
            if (JSON.parse(e.imgsJson).length)
              e.img = JSON.parse(e.imgsJson)[0];
            this.DialogDispatchSetting.products.push(e);
          });
        }
      });
    },
    stockImg(item) {
      return JSON.parse(item.imgsJson)[0];
    },
    saveRemark(type) {
      this.remarkLoading = true;
      this.$apiCall(
        "api.Invoice.saveRemark",
        {
          uniCode: this.invoiceInfo.uniCode,
          title: type == 1 ? "" : this.shareTitle,
          desc: type == 1 ? "" : this.shareDesc,
        },
        (r) => {
          this.remarkLoading = false;
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
    onCopy(e) {
      this.$elementMessage("Has been copied to the clipboard", "success");
    },
    onError(e) {
      this.$elementMessage(
        "Copy to clipboard failed, please copy manually",
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
    sendtoVendor(item) {
      this.card3Loading = true;
      this.$apiCall(
        "api.Invoice.getShareUrl",
        {
          invoiceId: item.id,
        },
        (r) => {
          this.card3Loading = false;
          if (r.ErrorCode == "9999") {
            this.invoiceInfo = r.Data.Results;
            this.shareTitle = this.invoiceInfo.remark
              ? this.invoiceInfo.remark.title
              : "";
            this.shareDesc = this.invoiceInfo.remark
              ? this.invoiceInfo.remark.desc
              : "";
            this.sendInvoiceOpen = true;
            this.activeShareName = "shareWeixin";
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure();
            }
          }
        }
      );
    },
    gotoOrder(vender) {
      let params = {
        id: vender.relationshipId,
        name: vender.vendorName,
      };
      if (!Number(vender.itemCnt)) {
        params.bind = true;
      }
      this.$router.push({
        name: "shopifyOrders",
        params,
      });
    },
    //			getDashboardVendors() {
    //				//第一个card数据
    //				this.card1Loading = true;
    //				this.$apiCall("api.Invoice.dashboardVendors", {}, (r) => {
    //					this.card1Loading = false;
    //					if(r.ErrorCode == "9999") {
    //						if(!r.Data.Results.length)
    //							this.noneData ++;
    //						this.vendorItems = r.Data.Results;
    //					} else {
    //						this.$elementMessage(r.Message, "error");
    //					}
    //				});
    //			},
    gotoInvoice(item) {
      let routeData = this.$router.resolve({
        path: "/i/" + item.uniCode,
      });
      window.open(routeData.href, "_blank");
    },
    cancelInvoice(item) {
      //作废
      this.$confirm("Are you sure you want to cancel it?", "", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "error",
      })
        .then(() => {
          this.$apiCall(
            "api.Invoice.cancel",
            {
              invoiceId: item.id,
            },
            (r) => {
              if (r.ErrorCode == 9999) {
                this.$message({
                  message: "Success",
                  type: "success",
                });
                this.getLastInvoice();
              } else {
                this.$message({
                  message: r.Message,
                  type: "error",
                });
              }
            }
          );
        })
        .catch(() => {});
    },
    getVendorCnt() {
      //左边供应商统计
      this.VendorCnt.loading = true;
      this.$apiCall(
        "api.Invoice.vendorCnt",
        {
          relationshipId: this.items[0].relationshipId,
        },
        (r) => {
          this.VendorCnt.loading = false;
          if (r.ErrorCode == "9999") {
            this.VendorCnt.invoiceAmount = r.Data.Results.invoiceAmount;
            this.VendorCnt.invoiceCnt = r.Data.Results.invoiceCnt;
            this.VendorCnt.skuCnt = r.Data.Results.skuCnt;
            this.VendorCnt.name = this.items[0].vendorName;
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    getOrderItems() {
      this.card2Loading = true;
      this.$apiCall(
        "api.Invoice.shopifyOrders",
        {
          page: 1,
          rowsPerPage: 10,
        },
        (r) => {
          this.card2Loading = false;
          if (r.ErrorCode == "9999") {
            if (!r.Data.Results.length) {
              this.noneData++;
            }
            this.items2 = r.Data.Results;
          } else {
            this.pageLoading = false;
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    //			getLastInvoice() {
    //				this.card3Loading = true;
    //				this.$apiCall(
    //					"api.Invoice.findByCustomer", {
    //						page: 1,
    //						rowsPerPage: 10,
    //						orderBy: "timeCreated",
    //						sort: "asc",
    //					},
    //					(r) => {
    //						this.card3Loading = false;
    //						if(r.ErrorCode == "9999") {
    //							if(!r.Data.Results.length){
    //								this.noneData ++;
    //							}
    //							this.iList = r.Data.Results;
    //						} else {
    //							this.pageLoading = false;
    //							this.$elementMessage(r.Message, "error");
    //						}
    //					}
    //				);
    //			},
    goto(name, params = {}) {
      this.$router.push({
        name,
        params,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.product-wrapper {
  display: flex;
  flex-wrap: wrap;
  border: 1px #dcdfe6 solid;
  height: 148px;
  width: 100%;
  overflow: hidden;
  .item-wrap {
    min-width: 110px;
    width: 110px;
    margin: 0 25px;
    padding: 5px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    .name {
      text-align: center;
      line-height: 20px;
      font-size: 12px;
    }
  }
}
.commodity-tab-wrapper {
  .store-name {
    font-size: 16px;
    font-weight: bold;
    color: #303133;
    word-break: keep-all;
  }
  .storeInfo-a {
    font-size: 12px;
    color: #f90;
  }
  .store-introduce {
    font-size: 12px;
    color: #909399;
  }
  .categories {
    font-size: 12px;
    color: #909399;
    .not-categories {
      font-size: 12px;
      color: #909399;
    }
    .categories-item {
      span {
        display: inline-block;
      }
      span.info {
        text-align: left;
        width: 110px;
        margin-right: 10px;
      }
    }
  }
  .product-images {
    display: flex;
    .el-image {
      margin: 0 1px;
    }
  }
  .store-action {
    text-align: center;
  }
  .not-remind {
    font-size: 12px;
    color: #909399;
    cursor: pointer;
  }
}
.carousel-index-wrapper {
  span {
    border: 1px solid #5c6ac4;
    font-size: 10px !important;
    height: 18px;
    width: 18px;
    line-height: 18px;
    border-radius: 50%;
    overflow: hidden;
    text-align: center;
    display: inline-block;
    //background-color: #00B0F6;
    color: #5c6ac4;
    margin: 0 2px;
    cursor: pointer;
    &.selected {
      color: #ffffff;
      background-color: #5c6ac4;
    }
  }
}
.vendors-wrapper {
  padding: 12px 5px;
  background-color: #fff;
  border: 1px #ebeef5 solid;
  border-radius: 4px;
  overflow: hidden;
  .item-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .table-type {
    font-size: 12px;
    .table-type-tag {
      cursor: pointer;
    }
  }
}
.card-box {
  > h2,
  > .d-flex > h2 {
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 16px;
  }
  .cost {
    color: #909399;
    span {
      color: #606266;
      font-size: 16px;
    }
  }
}

.add-vendor-btn {
  margin-top: 20px;
  display: inline-block;
  padding: 20px;
  background-color: #5c6ac4;
  color: #fff;
  text-align: center;
  i {
    font-size: 32px;
  }
}

.add-vendor-btn:hover {
  background-color: #7d88d0;
  text-decoration: none;
}

.s-avaver {
  display: inline-block;
  background-color: rgb(52, 195, 143);
  color: #fff;
  font-style: normal;
  width: 22px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  border-radius: 50%;
}

.el-image {
  border: 1px #f2f6fc solid;
  position: relative;
  .no-pic {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f2f6fc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #c0c4cc;
    i {
      width: 80px;
      height: 80px;
      background-image: url("./../../public/images/no-picture.png");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
  }
}

.image-box {
  position: relative;
  .product-name {
    // position: absolute;
    // right: 0;
    // bottom: 0;
    // left: 0;
    padding: 5px 10px;
    // background-color: rgba(33, 33, 33, .3);
    height: 40px;
    line-height: 20px;
    box-sizing: content-box;
    color: #606266;
  }
}

.no-product {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  color: #909399;
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
.step-alert {
  margin: 50px auto 15px;
  text-align: center;
}

.el-select-dropdown__item {
  height: auto;
  line-height: 22px;
}
.product-select-opt {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  .img-wrap {
    min-width: 40px;
    width: 40px;
    height: 40px;
    background-size: contain;
    border: 1px #e4e7ed solid;
    background-color: #fff;
  }
  .info {
    font-size: 13px;
    .name {
      margin-bottom: 5px;
      width: 200px;
    }
    .price {
      .currency {
        color: #909399;
      }
      .val {
      }
    }
  }
}
.grid-dashboard {
  padding: 0 10px;
  align-items: center;
  .grid-top {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: rgba(92, 106, 196, 0.12);
    border-radius: 50%;
    color: #5c6ac4;
    font-size: 22px;
  }
  .grid-bottom {
    margin-left: 20px;
    h2 {
      font-size: 18px;
      font-weight: 500;
      color: #5c6ac4;
      margin-bottom: 10px;
    }
  }
}
.statistic-top {
  h2 {
    font-size: 18px;
    font-weight: 500;
  }
}
.grid-content {
  h2 {
    font-size: 18px;
    font-weight: 500;
  }
}
.quick-summary {
  cursor: pointer;
  .grid-top {
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: rgba(92, 106, 196, 0.12);
    border-radius: 50%;
    color: #5c6ac4;
    font-size: 18px;
  }
  .grid-bottom {
    h2 {
      font-size: 16px;
      font-weight: 500;
      color: #333;
      margin-bottom: 5px;
    }
    p {
      color: #666;
    }
  }
}
.guide {
  z-index: 9999 !important;
  ::v-deep .el-dialog__headerbtn{
    display: none;
}
}

.el-tips {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #5c6ac4;
  color: #fff;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  box-shadow: 0 0 6px rgb(0 0 0 / 12%);
  cursor: pointer;
  position: fixed;
  bottom: 50px;
  right: 50px;
  div {
    font-size: 12px;
  }
}
.el-tips:hover {
  background-color: #868dc0;
  transform: 0.3s;
}
.tips-content {
  padding: 30px;
  margin: 30px 60px;
  border: 1px solid #eee;
  border-radius: 15px;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0 40px;
}
.btn {
  width: 179px;
    height: 46px;
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    border-radius: 10px;
}
.ctx {
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 22px;
  word-break: normal;
  font-size: AlibabaSans;
  color: #4e4e4e;
  line-height: 28px;
}
.mg-r-10{
  margin-right: 10px;
}
</style>

<style>
.commodity-tab-wrapper.diy1 .el-table__header-wrapper {
  display: none;
}
.walletIcon{
  margin-top: -10px;
}
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
.fit-box{
	padding: 0 20px;
    border-bottom: 1px solid #e1e1e1;
}
.set-css img{
  max-width: 100%;
  max-height: 100%;
}
.set-css .ql-align-center{
  text-align: center;
}
</style>
