<template>
  <div
    v-loading.fullscreen="loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <div ref="tablefilter">
      <div
        class="d-flex"
        style="margin-bottom: 5px; justify-content: space-between"
      >
        <div class="left d-flex" style="flex-wrap: wrap">
          <div ref="pageFilter" class="page-filter" style="border-bottom: none">
            <el-form :inline="true" size="mini">
              <el-form-item class="mg-r-5" style="margin-bottom: 0">
                <el-input
                  @keyup.enter.native="filterGetItem('code')"
                  @clear="clearFilter('code')"
                  v-model="code"
                  clearable
                  size="mini"
                  :placeholder="$t('myinvoice.采购订单编号')"
                  style="width: 160px"
                >
                </el-input>
              </el-form-item>
              <!-- 客户select -->
              <el-form-item class="mg-r-5" style="margin-bottom: 0">
                <el-select
                  filterable
                  remote
                  :remote-method="remoteMethodCustom"
                  :loading="selectLoading"
                  :placeholder="$t('myinvoice.pleaseCusName')"
                  clearable
                  v-model="filterParams.relationshipId"
                  @change="filterGetItem('relationshipId')"
                >
                  <el-option
                    v-for="opt in selectArr"
                    :key="opt.id"
                    :label="opt.customerName"
                    :value="opt.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item class="mg-r-5" style="margin-bottom: 0">
                <el-select
                  filterable
                  remote
                  :remote-method="getShopName"
                  :loading="getShopNameInput.loading"
                  :placeholder="$t('myinvoice.请输入查询店铺名')"
                  clearable
                  v-model="filterParams.accountId"
                  @change="filterGetItem('accountId')"
                >
                  <el-option
                    v-for="opt in getShopNameInput.shopList"
                    :key="opt.id"
                    :label="opt.shopName"
                    :value="opt.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <!-- 物流单号 -->
              <el-form-item class="mg-r-5" style="margin-bottom: 0">
                <el-input
                  style="width: 120px"
                  v-model="filterParams.trackNumberIpt"
                  :placeholder="$t('myinvoice.losNum')"
                  clearable
                  @keyup.enter.native="filterGetItem('trackNumber')"
                  @clear="clearFilter('trackNumber')"
                ></el-input>
              </el-form-item>

              <!-- 客户订单号 -->
              <el-form-item class="mg-r-5" style="margin-bottom: 0">
                <el-input
                  style="width: 140px"
                  v-model="filterParams.codeNameIpt"
                  :placeholder="$t('myinvoice.客户订单编号')"
                  clearable
                  @keyup.enter.native="filterGetItem('codeName')"
                  @clear="clearFilter('codeName')"
                >
                  <template slot="prepend">#</template>
                </el-input>
              </el-form-item>

              <el-form-item class="mg-r-20" style="margin-bottom: 0">
                <el-select
                  class="mg-r-5"
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
              <el-form-item style="margin-bottom: 0">
                <el-button type="primary" @click="filterGetItem()">{{
                  $t("myinvoice.filter")
                }}</el-button>
                <el-button type="danger" @click="clearFilter()">{{
                  $t("myinvoice.clear")
                }}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <!-- 已筛选条件 -->
      <div class="mg-b-10">
        <el-tag
          v-if="filterParams.code"
          size="small"
          type="info"
          closable
          @close="clearFilter('code')"
          class="mg-r-5"
          >{{ filterParams.code }}</el-tag
        >
        <!-- 客户 -->
        <el-tag
          v-if="filterParams.relationshipId"
          size="small"
          type="info"
          closable
          @close="clearFilter('relationshipId')"
          class="mg-r-5"
          >{{ filterParams.idName }}
        </el-tag>
        <!-- 店铺 -->
        <el-tag
          v-if="filterParams.accountId"
          size="small"
          type="info"
          closable
          @close="clearFilter('accountId')"
          class="mg-r-5"
          >{{ filterParams.aIdName }}
        </el-tag>
        <!-- 物流单号 -->
        <el-tag
          v-if="filterParams.trackNumber"
          size="small"
          type="info"
          closable
          @close="clearFilter('trackNumber')"
          class="mg-r-5"
          >{{ $t("myinvoice.losNum") }} {{ filterParams.trackNumber }}
        </el-tag>
        <!-- 客户订单编号 -->
        <el-tag
          v-if="filterParams.codeName"
          size="small"
          type="info"
          closable
          @close="clearFilter('codeName')"
          class="mg-r-5"
          >{{ $t("myinvoice.客户订单编号") }}# {{ filterParams.codeName }}
        </el-tag>
        <!-- 时间 -->
        <el-tag
          v-if="filterParams.date.length"
          size="small"
          type="info"
          closable
          @close="clearFilter('date')"
          class="mg-r-5"
          >{{ showDateText(filterParams.timeFilter) }}
          {{ filterParams.dateFrom }} - {{ filterParams.dateTo }}
        </el-tag>
      </div>
    </div>
    <div class="table-wrap" style="border-top: 1px #ebeef5 solid">
      <el-checkbox-group v-model="checkboxArr">
        <el-table :data="tableData" stripe ref="gridTable">
          <el-table-column
            v-if="
              activeName == 'waitingForPayment' ||
              activeName == 'waitingForOffer'
            "
            width="40"
          >
            <template slot-scope="scope">
              <el-checkbox
                class="none-label"
                :label="scope.row.id"
                :disabled="checkDisabled(scope.row)"
                @change="checkItem(scope.row)"
              ></el-checkbox>
            </template>
          </el-table-column>
          <!-- 发票编号 -->
          <el-table-column
            :label="$t('myinvoice.invoiceNum')"
            prop="code"
            width="250"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.row.code }}
                <el-tooltip
                  placement="top"
                  v-if="
                    scope.row.importError == 1 &&
                    scope.row.status != 4 &&
                    scope.row.status != 5 &&
                    scope.row.status != 6
                  "
                >
                  <div slot="content">
                    <template
                      v-if="
                        scope.row.extraJson &&
                        scope.row.extraJson.importErrorLog &&
                        scope.row.extraJson.importErrorLog.length
                      "
                    >
                      <p
                        v-for="(log, index) in scope.row.extraJson
                          .importErrorLog"
                        :key="index"
                      >
                        {{ log }}
                      </p>
                    </template>
                  </div>
                  <i
                    style="font-size: 14px; margin-left: 5px"
                    class="el-icon-warning tx-danger"
                  ></i>
                </el-tooltip>
              </div>
              <p class="tx-gray-600" style="white-space: nowrap">
                <span
                  v-html="
                    $t('myinvoice.includeNum', {
                      num: Number(scope.row.orderCnt),
                    })
                  "
                ></span>
                /
                <el-popover
                  v-if="scope.row.totalCnt"
                  trigger="hover"
                  placement="right"
                >
                  <div
                    slot
                    v-loading="scope.row.loadCnt"
                    style="min-height: 50px; font-size: 12px"
                  >
                    <div style="margin-bottom: 5px">
                      {{ $t("myinvoice.totalOrders")
                      }}<b>{{ scope.row.totalCnt }}</b>
                      {{ $t("myinvoice.pros") }}
                    </div>
                    <template v-if="scope.row.cnt">
                      <div style="margin-bottom: 15px; padding-left: 10px">
                        <div v-for="(n, k) in scope.row.cnt" :key="k">
                          <span style="white-space: nowrap"
                            >{{ n.name }} :</span
                          >
                          <span style="color: #606266; white-space: nowrap">{{
                            n.cnt
                          }}</span>
                        </div>
                      </div>
                      <div style="text-align: right">
                        <a
                          href="javascript:;"
                          style="color: #5c6ac4"
                          v-clipboard:copy="scope.row.cntText"
                          v-clipboard:success="cntOnCopy"
                          v-clipboard:error="cntOnError"
                          >{{ $t("myinvoice.copyData") }}</a
                        >
                      </div>
                    </template>
                  </div>
                  <a
                    slot="reference"
                    href="javascript:;"
                    style="color: #5c6ac4"
                    @mouseenter="getCntCountry(scope.row)"
                    >{{ scope.row.totalCnt }}</a
                  >
                </el-popover>
                <span v-else style="color: #606266">0</span>
                {{ $t("myinvoice.pros") }}
                /
                <el-popover
                  trigger="hover"
                  placement="right"
                  v-if="scope.row.shops.length"
                >
                  <div style="min-height: 50px; font-size: 12px">
                    <div style="margin-bottom: 5px">
                      {{ $t("myinvoice.总共店铺数：")
                      }}<b>{{ scope.row.shops.length }}</b
                      >{{ $t("myinvoice.店铺") }}
                    </div>
                    <div :key="item.id" v-for="item in scope.row.shops">
                      {{ item.shopName }}
                    </div>
                  </div>
                  <a
                    slot="reference"
                    href="javascript:;"
                    style="color: #5c6ac4"
                    >{{ scope.row.shops.length }}</a
                  >
                </el-popover>
                <span v-else style="color: #606266">0</span
                >{{ $t("myinvoice.个店铺") }}
              </p>
            </template>
          </el-table-column>
          <!-- 客户 -->
          <el-table-column :label="$t('myinvoice.cus')" prop="customerName">
            <template slot-scope="scope">
              <div>{{ scope.row.customerName }}</div>
              <div>{{ scope.row.customerRemark }}</div>
            </template>
          </el-table-column>
          <!-- 采购单金额 -->
          <el-table-column
            :label="$t('myinvoice.采购单金额')"
            width="230"
            align="right"
          >
            <template slot-scope="scope">
              <div style="width: 100%; text-align: right">
                <template v-if="scope.row.status == 1">
                  <div
                    v-if="
                      scope.row.orderStatusCnt &&
                      Number(scope.row.orderStatusCnt.notBindCnt)
                    "
                    class="tx-danger"
                  >
                    {{ $t("myinvoice.部分商品供货价未设置") }}
                  </div>
                  <template v-else-if="scope.row.orderStatusCnt">
                    <div>
                      <span style="margin-right: 5px; color: #909399">US$</span>
                      <span style="color: #f56c6c">{{
                        scope.row.realAmount
                      }}</span>
                    </div>
                    <div v-if="scope.row.paymentType">
                      <span style="margin-right: 5px; color: #909399"
                        >{{ $t("invoice.采购单付款方式") }}:
                      </span>
                      <span>{{
                        $t($dict.paymentType[scope.row.paymentType].text)
                      }}</span>
                    </div>
                  </template>
                </template>
                <template v-else>
                  <div class="d-flex" style="justify-content: flex-end">
                    <template v-if="Number(scope.row.totalAmount)">
                      <span style="margin-right: 10px; color: #909399"
                        >US$</span
                      >
                      <span style="color: #303133">
                        {{ scope.row.totalAmount }}
                      </span>
                    </template>
                    <span v-else style="text-align: right">{{
                      $t("myinvoice.setUp")
                    }}</span>
                  </div>
                </template>
              </div>
            </template>
          </el-table-column>

          <!-- 发货统计 -->
          <el-table-column :label="$t('myinvoice.发货统计')" width="280">
            <template slot-scope="scope">
              <template v-if="scope.row.orderStatusCnt">
                <div style="display: flex">
                  <div class="mg-r-10">
                    <!-- 待发货 -->
                    <div
                      v-if="/^(1|2|3|4|5)$/.test(scope.row.status)"
                      class="total-num"
                    >
                      <span class="title mg-r-5">
                        {{
                          scope.row.status == 1
                            ? $t("myinvoice.待报价：")
                            : $t("myinvoice.待发货：")
                        }}
                      </span>
                      <span
                        v-if="scope.row.status == 1"
                        class="num mg-r-5"
                        :class="`tx-${
                          $dict.invoiceStatus[scope.row.status].type
                        }`"
                        >{{
                          scope.row.orderStatusCnt.waitOfferCnt || "---"
                        }}</span
                      >
                      <span
                        v-else
                        class="num mg-r-5"
                        :class="`tx-${
                          $dict.invoiceStatus[scope.row.status].type
                        }`"
                        >{{
                          scope.row.orderStatusCnt.undeliveredCnt || "---"
                        }}</span
                      >
                      <div
                        v-if="Number(scope.row.orderStatusCnt.refundOrderCnt)"
                        class="total-num"
                      >
                        <span class="msg"
                          >(
                          <span class="tx-danger">{{
                            scope.row.orderStatusCnt.refundOrderCnt
                          }}</span>
                          {{ $t("myinvoice.个订单采购数量异常") }} )</span
                        >
                      </div>
                    </div>
                    <!-- 已发货 -->
                    <div
                      v-if="/^(4|5|6)$/.test(scope.row.status)"
                      class="total-num"
                    >
                      <span class="title mg-r-5">{{
                        $t("myinvoice.已发货：")
                      }}</span>
                      <span class="num mg-r-5 tx-success">{{
                        scope.row.orderStatusCnt.deliveredCnt || "---"
                      }}</span>
                      <div>
                        <div
                          v-if="
                            Number(scope.row.orderStatusCnt.refundOrderCnt) &&
                            scope.row.status == 6
                          "
                          class="total-num"
                        >
                          <span class="msg"
                            >(
                            <span class="tx-danger">{{
                              scope.row.orderStatusCnt.refundOrderCnt
                            }}</span>
                            {{ $t("myinvoice.个客户有退款") }} )</span
                          >
                        </div>
                        <div
                          v-if="Number(scope.row.orderStatusCnt.notSyncCnt)"
                          class="total-num"
                        >
                          <el-popover
                            placement="bottom"
                            :title="$t('myinvoice.Download')"
                            width="500"
                            trigger="hover"
                          >
                            <div
                              class="mg-t-15 mg-b-15"
                              style="white-space: nowrap"
                            >
                              <span class="tx-gray-600"
                                >{{ $t("myinvoice.shippedquantity") }}
                              </span>
                              <a href="javascript:;">{{
                                scope.row.orderStatusCnt.deliveredCnt
                              }}</a>
                              <span class="mg-l-10">
                                (<a href="javascript:;">{{
                                  scope.row.orderStatusCnt.notSyncOrderCnt
                                }}</a>
                                {{ $t("myinvoice.个订单同步异常") }})
                              </span>
                            </div>
                            <el-alert
                              class="icon-color"
                              :closable="false"
                              :title="$t('myinvoice.Downloadtext')"
                              type="info"
                              show-icon
                            >
                            </el-alert>
                            <div class="mg-t-15 d-flex justify-content-center">
                              <el-button
                                type="primary"
                                size="small"
                                @click="exportDeliver(scope.row.id, 1)"
                                >{{ $t("myinvoice.Downloadall") }}</el-button
                              >
                              <el-button
                                type="primary"
                                size="small"
                                @click="exportDeliver(scope.row.id, 2)"
                                >{{
                                  $t("myinvoice.Downloadallunsync")
                                }}</el-button
                              >
                            </div>
                            <a class="msg" slot="reference" href="javascript:;">
                              (
                              <span class="tx-danger">{{
                                scope.row.orderStatusCnt.notSyncOrderCnt
                              }}</span>
                              {{ $t("myinvoice.个订单同步异常") }} )
                            </a>
                          </el-popover>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <i v-else class="el-icon-loading"></i>
            </template>
          </el-table-column>

          <!-- 状态 -->
          <el-table-column :label="$t('myinvoice.status')" width="180">
            <template slot-scope="scope">
              <template v-if="$dict.invoiceStatus[scope.row.status]">
                <el-tooltip
                  v-if="scope.row.status == '9' && scope.row.stopReason"
                  class="item"
                  effect="dark"
                  :content="scope.row.stopReason"
                  placement="top"
                >
                  <span>{{
                    $t($dict.invoiceStatus[scope.row.status].text)
                  }}</span>
                </el-tooltip>
                <span
                  v-else
                  :class="`tx-${$dict.invoiceStatus[scope.row.status].type}`"
                  >{{ $t($dict.invoiceStatus[scope.row.status].text) }}</span
                >
              </template>
            </template>
          </el-table-column>

          <!-- 时间 -->
          <el-table-column :label="$t('myinvoice.dateTime')" width="250">
            <template slot-scope="scope">
              <div v-if="scope.row.timeCreated" style="white-space: nowrap">
                <span class="tx-gray-600">{{
                  $t("myinvoice.orderCreate")
                }}</span>
                <span>{{
                  $moment
                    .unix(scope.row.timeCreated)
                    .format("YYYY-MM-DD HH:mm:ss")
                }}</span>
              </div>
              <div v-if="scope.row.timeRead" style="white-space: nowrap">
                <span class="tx-gray-600">{{ $t("myinvoice.orderPaid") }}</span>
                <span>{{
                  $moment.unix(scope.row.timeRead).format("YYYY-MM-DD HH:mm:ss")
                }}</span>
              </div>
              <div v-if="scope.row.timePaid" style="white-space: nowrap">
                <span class="tx-gray-600">{{
                  $t("myinvoice.orderConfirm")
                }}</span>
                <span>{{
                  $moment.unix(scope.row.timePaid).format("YYYY-MM-DD HH:mm:ss")
                }}</span>
              </div>
            </template>
          </el-table-column>

          <!-- 操作 -->
          <el-table-column
            fixed="right"
            :label="$t('myinvoice.action')"
            width="150"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.orderStatusCnt">
                <!-- 显示 确认完成报价 -->
                <div
                  v-if="
                    scope.row.status == '1' &&
                    !Number(scope.row.orderStatusCnt.notBindCnt)
                  "
                >
                  <el-link
                    type="success"
                    style="font-size: 12px"
                    @click="setPriceConfirm(scope.row)"
                  >
                    {{ $t("invoice.确认完成报价") }}
                  </el-link>
                </div>
                <div>
                  <el-link
                    style="font-size: 12px"
                    :type="
                      scope.row.status == '1' &&
                      Number(scope.row.orderStatusCnt.notBindCnt)
                        ? 'success'
                        : 'primary'
                    "
                    @click="gotoInvoice(scope.row)"
                  >
                    {{
                      scope.row.status == "1" &&
                      Number(scope.row.orderStatusCnt.notBindCnt)
                        ? $t("myinvoice.完善报价")
                        : $t("myinvoice.viewDetail")
                    }}
                  </el-link>
                </div>
              </template>
              <template
                v-if="
                  scope.row.status != 2 &&
                  scope.row.status != 3 &&
                  scope.row.status != 4 &&
                  scope.row.status != 5 &&
                  scope.row.status != 6 &&
                  scope.row.status != 9
                "
              >
                <el-link
                  style="font-size: 12px"
                  type="primary"
                  @click="handleCommand({ row: scope.row, command: 'b' })"
                  >{{ $t("myinvoice.导出订单信息") }}</el-link
                >
                <el-link
                  style="font-size: 12px"
                  type="primary"
                  @click="handleCommand({ row: scope.row, command: 'a' })"
                  >{{ $t("myinvoice.importInfo") }}</el-link
                >
              </template>
              <!-- 发送给客户 -->
              <div v-if="scope.row.status == 2">
                <el-link
                  style="font-size: 12px"
                  :disabled="scope.row.submitLoading"
                  type="success"
                  @click="sendInvoice(scope.row)"
                  >{{ $t("myinvoice.sendCus") }}</el-link
                >
              </div>
              <!-- 确认收到款项 -->
              <div v-if="scope.row.status == 3">
                <el-link
                  style="font-size: 12px"
                  :disabled="scope.row.submitLoading"
                  type="success"
                  @click="openConfirmSetPayed(scope.row)"
                  >{{ $t("myinvoice.确认收到款项") }}</el-link
                >
              </div>
              <!-- 手工导入发货信息 -->
              <div v-if="scope.row.status == 4 || scope.row.status == 5">
                <el-link
                  style="font-size: 12px"
                  type="primary"
                  @click="openDeliverImport(scope.row)"
                  >{{ $t("myinvoice.手工导入发货信息") }}</el-link
                >
              </div>
              <!-- 导出采购单 -->
              <div v-if="scope.row.status != 1 && scope.row.status != 2">
                <el-link
                  style="font-size: 12px"
                  type="primary"
                  @click="handleCommand({ row: scope.row, command: 'c' })"
                  >{{ $t("myinvoice.exportt") }}</el-link
                >
              </div>
              <div v-if="scope.row.status == 2">
                <div>
                  <el-dropdown type="primary" @command="handleCommandStatus2">
                    <div>
                      <el-link
                        style="font-size: 12px"
                        type="primary"
                        @click="handleCommand({ row: scope.row, command: 'b' })"
                        >{{ $t("myinvoice.导出订单信息") }}</el-link
                      >
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item disabled>
                        <b class="black">
                          {{ $t("myinvoice.更多操作") }}
                        </b>
                      </el-dropdown-item>
                      <el-dropdown-item
                        :command="{ type: 'a', data: scope.row }"
                        >{{ $t("myinvoice.importInfo") }}</el-dropdown-item
                      >
                      <el-dropdown-item
                        v-if="scope.row.status < 5"
                        :command="{ type: 'c', data: scope.row }"
                        >{{ $t("myinvoice.cancelOrder") }}</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
              <!-- paymentType=4 的 payStatus=1的 不能取消订单 -->
              <template
                v-if="!((scope.row.paymentType == 4 && scope.row.payStatus == 1) || scope.row.paymentType == 6)"
              >
                <div v-if="scope.row.status != 2 && scope.row.status < 5">
                  <el-link
                    style="font-size: 12px"
                    type="danger"
                    @click="cancelInvoice(scope.row)"
                    >{{ $t("myinvoice.cancelOrder") }}</el-link
                  >
                </div>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-checkbox-group>
    </div>
    <div ref="tableFooter">
      <el-row v-if="tableData.length" :gutter="20">
        <el-col :span="24" class="d-flex justify-content-center">
          <div style="position: relative; top: 10px">
            <el-pagination
              :current-page="page"
              :background="true"
              layout="sizes, total, prev, pager, next, jumper"
              :page-sizes="pageSize"
              :page-size="rowsPerPage"
              :total="Number(totalCount)"
              @current-change="toPage"
              @size-change="changePageSize"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      width="80%"
      :title="
        exportInvoiceType == 'b'
          ? $t('myinvoice.exportShopify')
          : $t('myinvoice.exportOrder')
      "
      :visible.sync="innerVisible"
    >
      <div class="modal-export">
        <el-divider></el-divider>
        <div class="border-bottom-1 mg-b-15 pd-b-15">
          <h6
            class="mg-b-15"
            style="border-left: 4px solid #3f4eae; padding-left: 10px"
          >
            {{ $t("myinvoice.exportFields")
            }}<span class="mg-l-5">{{ $t("myinvoice.dragging") }}</span>
          </h6>
          <div class="draggable-wrap">
            <draggable
              :list="modalCustomExport.selectedTitles"
              draggable=".dargDiv"
              :options="{ animation: 300 }"
              group="tags"
            >
              <el-tag
                class="dargDiv"
                v-for="(title, index) in modalCustomExport.selectedTitles"
                :key="title.name"
                closable
                :disable-transitions="false"
                @close="removeTitle(index)"
              >
                {{ title.name }}
              </el-tag>
            </draggable>
            <div
              v-if="!modalCustomExport.selectedTitles.length"
              class="w-100 justify-content-center"
            >
              <span style="color: #f56c6c">{{
                $t("myinvoice.PleaseSelectBelow")
              }}</span>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="border-bottom-1 mg-b-15 pd-b-15">
          <h6
            class="mg-b-15"
            style="border-left: 4px solid #3f4eae; padding-left: 10px"
          >
            {{ $t("myinvoice.optionalfields") }}
            <span style="color: #f56c6c" class="tx-danger tx-12">{{
              $t("myinvoice.notExport")
            }}</span>
          </h6>
          <div class="tag-wrap">
            <draggable
              :list="modalCustomExport.unselectedTitles"
              draggable=".uns-tag"
              :options="{ animation: 300 }"
              group="tags"
            >
              <el-tag
                v-for="(title, index) in modalCustomExport.unselectedTitles"
                :key="title.orName"
                effect="dark"
                @click="selectTitle(index)"
              >
                {{ title.orName }}
              </el-tag>
            </draggable>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="border-bottom-1 mg-b-15 pd-b-15">
          <h6
            class="mg-b-15"
            style="border-left: 4px solid #3f4eae; padding-left: 10px"
          >
            {{ $t("myinvoice.customField") }}
            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('myinvoice.rename')"
              placement="top"
            >
              <i
                style="color: #5c6ac4; text-decoration: none"
                class="fa fa-question-circle-o"
              ></i>
            </el-tooltip>
            <a
              style="color: #5c6ac4; text-decoration: none"
              class="mg-l-20"
              href="javascript:;"
              @click="showCustom = !showCustom"
              >{{
                showCustom
                  ? $t("myinvoice.hideFields")
                  : $t("myinvoice.showFields")
              }}</a
            >
          </h6>
          <div class="row custom-wrap" :class="{ hide: !showCustom }">
            <el-row :gutter="20" style="margin: 0">
              <el-col
                :span="12"
                v-for="title in modalCustomExport.selectedTitles"
                :key="title.orName"
                style="margin-top: 10px"
              >
                <div
                  class="grid-content"
                  style="display: flex; align-items: center"
                >
                  <label
                    style="
                      width: 200px;
                      white-space: nowrap;
                      text-align: right;
                      margin-right: 10px;
                      color: #999;
                    "
                    >[{{ title.orName }}]{{ $t("myinvoice.showAs") }}：</label
                  >
                  <div class="col-6">
                    <el-input
                      :placeholder="title.orName"
                      size="small"
                      v-model="title.name"
                    >
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
        <el-button size="small" @click="innerVisible = false">{{
          $t("myinvoice.discard")
        }}</el-button>
        <el-button
          type="primary"
          size="small"
          @click="saveCustomExportSettingOnly"
          >{{ $t("myinvoice.saveSetting") }}</el-button
        >

        <template v-if="exportItem.payStatus != 1 && exportInvoiceType == 'c'">
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">
              {{ $t("myinvoice.confirmReceipt") }}
            </div>
            <el-button
              type="success"
              size="small"
              style="
                background-color: #b3e19d;
                border-color: #b3e19d;
                cursor: not-allowed;
              "
            >
              {{ $t("myinvoice.saveSettingExcel") }}
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">
              {{ $t("myinvoice.confirmReceipt") }}
            </div>
            <el-button
              type="success"
              size="small"
              style="
                background-color: #b3e19d;
                border-color: #b3e19d;
                cursor: not-allowed;
              "
            >
              {{ $t("myinvoice.saveSettingCsv") }}
            </el-button>
          </el-tooltip>
        </template>
        <template v-else>
          <el-button
            type="success"
            size="small"
            @click="saveCustomExport('1')"
            >{{ $t("myinvoice.saveSettingExcel") }}</el-button
          >
          <el-button
            type="success"
            size="small"
            @click="saveCustomExport('2')"
            >{{ $t("myinvoice.saveSettingCsv") }}</el-button
          >
        </template>
      </div>
    </el-dialog>
    <el-dialog
      @open="openSkype"
      custom-class="sendInvoice"
      :title="$t('myinvoice.sendInvoice')"
      :visible.sync="sendInvoiceOpen"
      width="50%"
    >
      <!--<el-divider></el-divider>-->
      <template>
        <div style="position: relative; z-index: 1">
          <div style="position: absolute; right: 30px; top: 15px">
            <el-switch v-model="showItemPrice" @change="changeShowItemPrice">
            </el-switch>
            {{ $t("myinvoice.showPrice") }}
          </div>
        </div>
        <el-tabs
          v-model="activeShareName"
          type="card"
          style="margin-left: 20px; margin-top: 10px"
        >
          <el-tab-pane name="shareLink">
            <span slot="label"
              ><i class="iconfont icon-link"></i>
              {{ $t("myinvoice.shareLink") }}</span
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
                {{ $t("myinvoice.shareUrl") }}
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
                    >{{ $t("myinvoice.shareCopy") }}</el-button
                  >
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane name="shareWeixin">
            <span slot="label"
              ><i class="iconfont icon-shejiao"></i>
              {{ $t("myinvoice.showApp") }}</span
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
                  {{ $t("myinvoice.setTitle") }}
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
                  {{ $t("myinvoice.setContent") }}
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
                  {{ $t("myinvoice.setType") }}
                </div>
                <div style="width: 70%" class="d-flex">
                  <div
                    style="margin-right: 30px"
                    class="skype-share"
                    :data-href="shareTitle + shareDesc"
                    data-lang="en-US"
                    :data-text="invoiceInfo.url"
                    data-style="large"
                  ></div>
                  <div>
                    <el-tooltip placement="bottom">
                      <div slot="content">
                        <p class="tx-center mg-b-10">
                          {{ $t("myinvoice.scan") }}
                        </p>
                        <img :src="invoiceInfo.qrcodeBase64" width="130" />
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
                        <i class="fa fa-weixin"></i> {{ $t("myinvoice.share") }}
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
            >{{ $t("myinvoice.reset") }}</el-button
          >
        </div>
        <div>
          <el-button size="small" @click="sendInvoiceOpen = false">{{
            $t("myinvoice.discard")
          }}</el-button>
          <el-button
            size="small"
            type="primary"
            @click="invoicePreview(invoiceInfo.url)"
            >{{ $t("myinvoice.previewInvocie") }}</el-button
          >
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('myinvoice.您当前采购订单中有 0 元供货价的商品')"
      :visible.sync="dialogZeroAlert.isShow"
      width="600px"
    >
      <div style="padding: 0 20px">
        <div class="mg-b-10">
          {{ $t("myinvoice.您当前采购订单中有 0 元供货价的商品") }}：
        </div>
        <div
          v-for="item in dialogZeroAlert.items"
          :key="item.id"
          style="margin-bottom: 5px; padding-left: 15px; color: #909399"
        >
          {{ item.codeName }} - {{ item.sku }} × {{ item.quantity }}
        </div>
        <div class="mg-t-30">
          <el-alert
            :title="$t('myinvoice.确定要发送当前发票发送给客户吗')"
            type="warning"
            :closable="false"
          >
          </el-alert>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogZeroAlert.isShow = false">
          {{ $t("myinvoice.我再看看") }}
        </el-button>
        <el-button
          size="small"
          type="primary"
          :loading="dialogZeroAlert.loading"
          @click="toSendInvoice(dialogZeroAlert.invoice, true)"
        >
          {{ $t("myinvoice.确定") }}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('invoice.shippinginformation')"
      :visible.sync="dialogDeliverImport.isShow"
      v-loading="dialogDeliverImport.loading"
      width="600px"
    >
      <div class="download-xsl">
        <el-alert type="warning" :closable="false" style="width: 100%">
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
          >
            <span>{{ $t("invoice.templateprovided") }}</span>
            <el-button type="text" style="padding: 0" @click="downloadFile">{{
              $t("invoice.template")
            }}</el-button>
          </div>
        </el-alert>
      </div>
      <div style="margin-top: 40px; padding: 0 20px">
        <el-upload
          class="upload-demo"
          ref="upload"
          action=""
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          :auto-upload="false"
          :file-list="dialogDeliverImport.uploadfileList"
          :on-change="handleUploadChange"
        >
          <el-button slot="trigger" size="small" type="primary">{{
            $t("invoice.fileSelect")
          }}</el-button>
          <template
            v-if="
              dialogDeliverImport.invoiceInfo &&
              dialogDeliverImport.invoiceInfo.payStatus != 1
            "
          >
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                {{ $t("invoice.proceeding") }}
              </div>
              <el-button
                style="
                  background-color: #b3e19d;
                  border-color: #b3e19d;
                  cursor: not-allowed;
                  margin-left: 10px;
                "
                size="small"
                type="success"
                >{{ $t("invoice.shippinginformation") }}</el-button
              >
            </el-tooltip>
          </template>
          <template v-else>
            <el-button
              style="margin-left: 10px"
              size="small"
              type="success"
              @click="submitUpload"
              >{{ $t("invoice.shippinginformation") }}</el-button
            >
          </template>

          <div
            slot="tip"
            class="el-upload__tip mg-y-15"
            style="margin-top: 20px"
          >
            <p>{{ $t("invoice.shippinginformation1") }}</p>
            <p>{{ $t("invoice.shippinginformation2") }}</p>
          </div>
        </el-upload>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogDeliverImport.isShow = false">
          {{ $t("myinvoice.关闭") }}
        </el-button>
      </div>
    </el-dialog>
    <DialogCancelInvoice :data="dialogCancelInvoice" @setCancel="setCancel" />
    <el-backtop
      class="goto-top"
      target=".main-scroll  .el-scrollbar__wrap"
      :right="20"
      :bottom="20"
    >
    </el-backtop>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import DialogCancelInvoice from "./DialogCancelInvoice";
export default {
  props: ["cancelStatus", "activeName"],
  data() {
    return {
      loading: false,
      selectLoading: false,
      tableHeight: 400,
      pageSize: [10, 20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem(`${this.$route.name}RowsPerPage`)
        ? Number(localStorage.getItem(`${this.$route.name}RowsPerPage`))
        : 10,
      totalCount: 0,
      totalPage: 0,
      getShopNameInput: {
        loading: false,
        shopList: [],
      },
      selectArr: [],
      status: "",
      code: "",
      filterParams: {
        aIdName: "", //店铺文字
        idName: "", //客户名文字
        relationshipId: "",
        code: "",
        accountId: "",
        trackNumberIpt: "",
        trackNumber: "",
        codeNameIpt: "",
        codeName: "",
        timeOption: [
          { label: this.$t("myinvoice.createdTime"), value: "timeCreated" },
          { label: this.$t("myinvoice.confirmedTime"), value: "timePaid" },
          { label: this.$t("myinvoice.downloadTime"), value: "timeApiGet" },
          { label: this.$t("myinvoice.paidTime"), value: "timeRead" },
        ],
        timeFilter: "", //时间筛选
        date: [],
        dateFrom: "",
        dateTo: "",
      },
      filterParamsDefault: "{}",
      tableData: [],
      exportItem: "",
      exportInvoiceType: "",
      sendInvoiceOpen: false,
      activeShareName: "shareLink",
      shareTitle: "",
      shareDesc: "",
      dialogZeroAlert: {
        isShow: false,
        loading: false,
        items: [],
        invoice: null,
      },
      dialogZeroAlertDefault: "{}",
      showItemPrice: true,
      showCustom: false,
      invoiceInfo: "",
      modalCustomExport: {
        tags: [],
        selectedTitles: [],
        unselectedTitles: [],
      },
      modalCustomExportDefault: "",
      innerVisible: false,
      dialogDeliverImport: {
        isShow: false,
        loading: false,
        invoiceInfo: null,
        uploadfileList: [],
      },
      dialogDeliverImportDefault: "{}",
      dialogCancelInvoice: {
        loading: false,
        isShow: false,
        item: null,
        stopReason: "",
      },
      dialogCancelInvoiceDefault: "{}",
      checkboxArr: [],
      cid: "",
    };
  },
  components: {
    draggable,
    DialogCancelInvoice,
  },
  created() {
    this.getStatus();
  },
  mounted() {
    this.checkboxArr = [];
    // this.filterParams.idName = this.$route.params.id;
    this.dialogCancelInvoiceDefault = JSON.stringify(this.dialogCancelInvoice);
    this.filterParamsDefault = JSON.stringify(this.filterParams);
    this.dialogZeroAlertDefault = JSON.stringify(this.dialogZeroAlert);
    this.modalCustomExportDefault = JSON.stringify(this.modalCustomExport);
    this.dialogDeliverImportDefault = JSON.stringify(this.dialogDeliverImport);
    if (this.$route.params.id) {
      this.filterParams.idName = this.$route.params.customerName
        ? this.$route.params.customerName
        : "";
      this.filterParams.relationshipId = this.$route.params.id
        ? this.$route.params.id
        : "";
      this.selectArr = [
        {
          id: this.$route.params.id,
          customerName: this.$route.params.customerName,
        },
      ];
      this.filterGetItem("relationshipId");
    } else {
      this.$nextTick(() => {
        this.getItems();
      });
    }
  },
  beforeDestroy() {
    // window.onresize = null;
  },
  watch: {
    activeName() {
      this.checkboxArr = [];
      // this.clearFilter('change');
    },
    $route: "gotoPage",
    cancelStatus: "gotoPage",
    checkboxArr: {
      handler() {
        this.$emit("checkedArr", this.checkboxArr);
      },
      deep: true,
    },
  },
  methods: {
    openConfirmSetPayed(item) {
      this.$confirm(this.$t("myinvoice.是否要确认收到款项？"), "", {
        type: "warning",
        confirmButtonText: this.$t("myinvoice.确认"),
        cancelButtonText: this.$t("myinvoice.取消"),
      })
        .then(() => {
          this.confirmSetPayed(item);
        })
        .catch(() => {});
    },
    checkItem(item) {
      this.cid = item.relationshipId;
    },
    checkDisabled(item) {
      if (!item.relationshipId) {
        return true;
      }
      if (!this.checkboxArr.length) {
        return false;
      }
      return item.relationshipId != this.cid;
    },
    setPriceConfirm(item) {
      this.$confirm(
        `
        <p>${this.$t("invoice.是否要确认完成报价?")}</p>
        <p>
          <span style="margin-right: 5px; color: #909399;">${this.$t(
            "myinvoice.采购订单编号"
          )}: </span> ${item.code}
        </p>
        <p>
          <span style="margin-right: 5px; color: #909399;">${this.$t(
            "invoice.采购单金额"
          )}: </span> US$ ${item.realAmount}
        </p>
        <p>
          <span style="margin-right: 5px; color: #909399;">${this.$t(
            "invoice.采购单付款方式"
          )}: </span>
          ${
            item.paymentType
              ? this.$t(this.$dict.paymentType[item.paymentType].text)
              : "---"
          }
        </p>
        `,
        "",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: this.$t("invoice.确定"),
          cancelButtonText: this.$t("invoice.取消"),
          type: "warning",
        }
      ).then(() => {
        this.loading = true;
        this.$apiCall(
          "api.Invoice.setPriceConfirm",
          { invoiceId: item.id },
          (r) => {
            if (r.ErrorCode == "9999") {
              this.$elementMessage(
                this.$t("invoice.确认完成报价成功"),
                "success"
              );
              this.getItems(true);
            } else {
              this.$elementMessage(r.Message, "error");
            }
          }
        );
      });
    },
    handleCommandStatus2(commond) {
      if (commond.type == "a") {
        this.handleCommand({ row: commond.data, command: "a" });
      }
      if (commond.type == "c") {
        this.cancelInvoice(commond.data);
      }
    },
    submitUpload() {
      if (!this.dialogDeliverImport.uploadfileList.length) {
        this.$elementMessage(this.$t("invoice.selectfile"), "error");
        return;
      }
      this.dialogDeliverImport.loading = true;
      let uploadFile = this.dialogDeliverImport.uploadfileList[0].raw;
      if ($("#ifilePro").length == 0) {
        $("body").append(
          '<iframe id="ifilePro" style="display:none"></iframe>'
        );
      }
      let openDownload = (url) => {
        document.getElementById("ifilePro").src = url;
      };
      let apiUrl = "api.Invoice.deliverImport";
      let param = {
        invoiceId: this.dialogDeliverImport.invoiceInfo.id,
        "@file": uploadFile,
      };
      this.$apiCall(apiUrl, param, (r) => {
        this.dialogDeliverImport.loading = false;
        if (r.ErrorCode == "9999") {
          this.dialogDeliverImport.isShow = false;
          this.$elementMessage(this.$t("invoice.successImport"), "success");
          this.getItems(true);
          openDownload(r.Data.Results.file);
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    handleUploadChange(file) {
      this.dialogDeliverImport.uploadfileList = [];
      this.dialogDeliverImport.uploadfileList.push(file);
    },
    downloadFile() {
      let url = "./file/orders_impor.xlsx";
      if ($("#downloadFile").length == 0) {
        $("body").append(
          '<iframe id="downloadFile" style="display:none"></iframe>'
        );
      }
      let openDownload = (url) => {
        document.getElementById("downloadFile").src = url;
      };
      openDownload(url);
    },
    openDeliverImport(item) {
      this.dialogDeliverImport = JSON.parse(this.dialogDeliverImportDefault);
      this.dialogDeliverImport.isShow = true;
      this.dialogDeliverImport.invoiceInfo = item;
    },
    confirmSetPayed(item) {
      item.submitLoading = true;
      this.$apiCall("api.Invoice.setPayed", { invoiceId: item.id }, (r) => {
        if (r.ErrorCode == "9999") {
          this.$elementMessage(this.$t("invoice.successConfirm"), "success");
          this.getItems(true);
        }
      });
    },
    clearFilter(type) {
      switch (type) {
        case "code":
          this.filterParams.code = this.code = "";
          break;
        case "relationshipId":
          this.filterParams.relationshipId = this.filterParams.idName = "";
          break;
        case "accountId":
          this.filterParams.accountId = this.filterParams.aIdName = "";
          break;
        case "trackNumber":
          this.filterParams.trackNumber = this.filterParams.trackNumberIpt = "";
          break;
        case "codeName":
          this.filterParams.codeName = this.filterParams.codeNameIpt = "";
          break;
        case "date":
          this.filterParams.date = [];
          this.filterParams.dateFrom = "";
          this.filterParams.dateTo = "";
          this.filterParams.timeFilter = "";
          break;
        default:
          this.code = "";
          this.filterParams = JSON.parse(this.filterParamsDefault);
          break;
      }
      if (type != "change") this.gotoPage();
    },
    filterGetItem(type) {
      switch (type) {
        case "code":
          this.filterParams.code = this.code;
          break;
        case "relationshipId":
          this.selectArr.forEach((c) => {
            if (c.id == this.filterParams.relationshipId)
              this.filterParams.idName = c.customerName;
          });
          break;
        case "accountId":
          this.getShopNameInput.shopList.forEach((s) => {
            if (s.id == this.filterParams.accountId)
              this.filterParams.aIdName = s.shopName;
          });
          break;
        case "trackNumber":
          this.filterParams.trackNumber = this.filterParams.trackNumberIpt;
          break;
        case "codeName":
          this.filterParams.codeName = this.filterParams.codeNameIpt;
          break;
        default:
          this.filterParams.code = this.code;
          this.filterParams.trackNumber = this.filterParams.trackNumberIpt;
          this.filterParams.codeName = this.filterParams.codeNameIpt;
          break;
      }
      if (this.filterParams.codeName) {
        this.filterParams.codeName = this.filterParams.codeName.replace(
          /#/g,
          ""
        );
      }
      this.gotoPage();
    },
    showDateText(val) {
      let txt = "";
      this.filterParams.timeOption.forEach((t) => {
        if (t.value == val) txt = t.label;
      });
      return txt;
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
    getShopName(query) {
      // 模糊查询店铺名
      this.getShopNameInput.shopList = [];
      //获取筛选客户
      if (!query) return;
      this.getShopNameInput.loading = true;
      this.$apiCall(
        "api.Invoice.findStoreByVendor",
        { shopName: query },
        (r) => {
          this.getShopNameInput.loading = false;
          if (r.ErrorCode == 9999) {
            this.getShopNameInput.shopList = r.Data.Results;
          } else {
            this.$message({ message: r.Message, type: "error" });
          }
        }
      );
    },
    remoteMethodCustom(query) {
      this.selectArr = [];
      //获取筛选客户
      if (!query) return;
      this.selectLoading = true;
      this.$apiCall("api.Relationship.findByVendor", { name: query }, (r) => {
        this.selectLoading = false;
        if (r.ErrorCode == 9999) {
          this.selectArr = r.Data.Results;
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      });
    },
    onCopy(e) {
      this.$elementMessage(this.$t("successfullyToClipboard"), "success");
    },
    onError(e) {
      this.$elementMessage(this.$t("failedToClipboard"), "error");
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
            //						this.getData();
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        }
      );
    },
    invoicePreview(url) {
      let newWin = window.open("/blank.html", "invoicePreview");
      newWin.location.href = url;
    },
    openSkype() {
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
    toSendInvoice(item, close) {
      this.showItemPrice = item.showItemPrice == "1" ? true : false;
      this.sendInvoiceOpen = true;
      this.activeShareName = "shareLink";
      if (close) this.dialogZeroAlert.loading = true;
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
            if (close) this.dialogZeroAlert.isShow = false;
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
      this.$apiCall(
        "api.Invoice.checkItemPrice",
        { invoiceId: item.id },
        (r) => {
          item.submitLoading = false;
          if (r.ErrorCode == "9999") {
            let re = r.Data.Results;
            if (
              re.noSkuArr.length ||
              re.nullPriceArr.length ||
              re.zeroPriceArr.length
            ) {
              this.dialogZeroAlert = JSON.parse(this.dialogZeroAlertDefault);
              this.dialogZeroAlert.items = re.noSkuArr.concat(
                re.noSkuArr,
                re.nullPriceArr,
                re.zeroPriceArr
              );
              this.dialogZeroAlert.isShow = true;
              this.dialogZeroAlert.invoice = item;
            } else {
              this.toSendInvoice(item);
            }
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    changeShowItemPrice() {
      this.$apiCall(
        "api.Invoice.setShowPrice",
        {
          uniCode: this.invoiceInfo.uniCode,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            this.getItems(true);
          } else {
            this.showItemPrice = !this.showItemPrice;
            this.$elementMessage(r.Message, "error");
          }
        }
      );
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
    getOrderCnt(i) {
      if (
        !this.tableData.length ||
        this.tableData.length < i + 1 ||
        typeof this.tableData[i] == "undefined"
      ) {
        return;
      }
      this.$apiCall(
        "api.Invoice.getSummary",
        {
          invoiceId: this.tableData[i].id,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            if (typeof this.tableData[i] != "undefined")
              this.$set(this.tableData[i], "orderStatusCnt", r.Data.Results);
          } else {
            this.$elementMessage(r.Message, "error");
          }
          i++;
          this.getOrderCnt(i);
        }
      );
    },
    getItems(name, s) {
      this.loading = true;
      let params = {
        page: this.page,
        rowsPerPage: this.rowsPerPage,
        status: this.status,
        code: this.filterParams.code,
        relationshipId: this.filterParams.relationshipId,
        accountId: this.filterParams.accountId,
        trackNumber: this.filterParams.trackNumber,
        codeName: this.filterParams.codeName,
        timeFilter: this.filterParams.timeFilter,
        dateFrom: this.filterParams.dateFrom,
        dateTo: this.filterParams.dateTo,
      };

      if (this.status == "abnormal") {
        params.status = "";
        params.isAbnormal = "1";
      }
      if (this.cancelStatus == 2) {
        params.status = "9";
      }
      this.$apiCall("api.Invoice.findByVendor", params, (r) => {
        if (r.ErrorCode == 9999) {
          this.loading = false;
          let [data, pagination] = [r.Data.Results, r.Data.Pagination];
          this.tableData = data.map((item) => {
            item.loadCnt = false;
            item.cnt = null;
            item.cntText = "";
            item.submitLoading = false;
            item.orderStatusCnt = null;
            return item;
          });
          this.totalCount = Number(pagination.totalCount);
          this.totalPage = Number(pagination.totalPage);
          this.getOrderCnt(0);
          this.$emit("getNum");
          if (
            this.$route.name == "waitingForOffer" &&
            this.$route.params.saveCode &&
            this.$route.params.code
          ) {
            this.$route.params.saveCode = false;
            this.tableData.some((item) => {
              if (item.code == this.$route.params.code) {
                this.gotoInvoice(item);
                return true;
              }
            });
          }
          if (!s) this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      });
    },
    getStatus() {
      switch (this.$route.name) {
        case "waitingForOffer":
          this.status = "1";
          break;
        case "waitingForPayment":
          this.status = "2";
          break;
        case "waitingForConfirm":
          this.status = "3";
          break;
        case "waitingForDelivery":
          this.status = "45";
          break;
        case "fullDeliveryOrder":
          this.status = "6";
          break;
        case "abnormal":
          this.status = "abnormal";
          break;
        default:
          this.status = "";
          break;
      }
    },
    cntOnError() {
      this.$elementMessage(this.$t("myinvoice.copyFailed"), "error");
    },
    cntOnCopy() {
      this.$elementMessage(this.$t("myinvoice.copyItems"), "success");
    },
    getCntCountry(item) {
      if (!item.cnt) item.loadCnt = true;
      this.$apiCall(
        "api.Invoice.getItemsCountry",
        { invoiceId: item.id },
        (r) => {
          item.loadCnt = false;
          if (r.ErrorCode == "9999") {
            item.cnt = r.Data.Results;
            let txt = `${this.$t("myinvoice.总共采购商品数：")}${
              item.totalCnt
            },`;
            Object.keys(r.Data.Results).forEach((k) => {
              txt += `${r.Data.Results[k].name}: ${r.Data.Results[k].cnt},`;
            });
            item.cntText = txt.slice(0, txt.length - 1);
          }
        }
      );
    },
    handleCommand(command) {
      this.exportItem = command.row;
      this.exportInvoiceType = command.command;
      let openDownload = () => {};
      let apiUrl = "";
      switch (command.command) {
        case "a":
          this.$router.push({
            name: "importData",
            query: {
              rid: this.exportItem.relationshipId,
              id: this.exportItem.id,
            },
          });
          break;
        case "b":
          this.$showLoading();
          if ($("#ifilePro").length == 0) {
            $("body").append(
              '<iframe id="ifilePro" style="display:none"></iframe>'
            );
          }
          openDownload = (url) => {
            document.getElementById("ifilePro").src = url;
          };
          apiUrl =
            this.exportInvoiceType == "b"
              ? "api.Invoice.exportInvoice"
              : "api.Invoice.exportOrder";
          this.$apiCall(
            apiUrl,
            {
              invoiceId: this.exportItem.id,
              type: "excel",
            },
            (r) => {
              this.$hideLoading();
              if (r.ErrorCode == "9999") {
                this.$elementMessage(
                  this.$t("myinvoice.exportSuccess"),
                  "success"
                );
                openDownload(r.Data.Results.file);
              } else {
                this.$elementMessage(r.Message, "error");
                if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                  this.$userFailure(this);
                }
              }
            }
          );
          break;
        case "c":
          this.setExportOnly("c");
          break;
      }
    },
    saveCustomExport(type) {
      this.saveCustomExportSettingOnly(type);
    },
    saveCustomExportSettingOnly(type) {
      if (!this.modalCustomExport.selectedTitles.length) {
        this.$elementMessage(this.$t("myinvoice.leastOne"), "error");
        return false;
      }
      if (
        this.modalCustomExport.selectedTitles.some((e) => {
          return !e.name;
        })
      ) {
        this.$elementMessage(this.$t("myinvoice.notEmpty"), "error");
        return false;
      }
      this.$showLoading();
      let obj = {};
      this.modalCustomExport.selectedTitles.forEach((item) => {
        obj[item.key] = item.name;
      });
      let apiUrl =
        this.exportInvoiceType == "b"
          ? "api.Invoice.saveInvoiceTitle"
          : "api.Invoice.saveExportTitle";
      this.$apiCall(
        apiUrl,
        {
          titles: obj,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            if (type > 0) {
              if ($("#ifilePro").length == 0) {
                $("body").append(
                  '<iframe id="ifilePro" style="display:none"></iframe>'
                );
              }
              let openDownload = (url) => {
                document.getElementById("ifilePro").src = url;
              };
              let apiUrl =
                this.exportInvoiceType == "b"
                  ? "api.Invoice.exportInvoice"
                  : "api.Invoice.exportOrder";
              this.$apiCall(
                apiUrl,
                {
                  titles: obj,
                  invoiceId: this.exportItem.id,
                  type: type == 1 ? "excel" : "csv",
                },
                (r) => {
                  this.$hideLoading();
                  if (r.ErrorCode == "9999") {
                    this.innerVisible = false;
                    this.$elementMessage(
                      this.$t("myinvoice.saveSettingAndExport"),
                      "success"
                    );
                    openDownload(r.Data.Results.file);
                  } else {
                    this.$elementMessage(r.Message, "error");
                    if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                      this.$userFailure(this);
                    }
                  }
                }
              );
            } else {
              this.$elementMessage(
                this.$t("myinvoice.saveSettingSuccess"),
                "success"
              );
              this.innerVisible = false;
            }
          } else {
            this.$hideLoading();
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        }
      );
    },
    setExportOnly(type) {
      this.exportInvoiceType = type;
      this.loading = true;
      this.showCustom = false;
      this.modalCustomExport = JSON.parse(this.modalCustomExportDefault);
      let apiUrl =
        this.exportInvoiceType == "b"
          ? "api.Invoice.exportInvoiceTitle"
          : "api.Invoice.exportTitle";
      this.$apiCall(apiUrl, {}, (r) => {
        this.loading = false;
        if (r.ErrorCode == "9999") {
          this.innerVisible = true;
          for (var i in r.Data.Results.default) {
            let obj = {};
            obj.key = i;
            obj.orName = r.Data.Results.default[i];
            obj.name = r.Data.Results.default[i];
            this.modalCustomExport.tags.push(obj);
          }

          for (var i in r.Data.Results.titles) {
            let obj = {};
            obj.key = i;
            obj.orName = r.Data.Results.titles[i];
            obj.name = r.Data.Results.titles[i];
            this.modalCustomExport.selectedTitles.push(obj);
          }

          this.modalCustomExport.tags.forEach((all) => {
            if (
              !this.modalCustomExport.selectedTitles.some((sed) => {
                return all.key == sed.key;
              })
            ) {
              this.modalCustomExport.unselectedTitles.unshift(all);
            }

            this.modalCustomExport.selectedTitles.some((sed) => {
              if (all.key == sed.key) {
                this.$set(sed, "orName", all.name);
              }
            });
          });
        } else {
          this.$elementMessage(r.Message, "error");
          if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
            this.$userFailure(this);
          }
        }
      });
    },
    gotoInvoice(item) {
      let routeData = this.$router.resolve({
        name: "Invoice",
        query: {
          uniCode: item.uniCode,
          fromPage: 1,
        },
      });
      window.open(routeData.href, "_blank");
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
      localStorage.setItem(`${this.$route.name}RowsPerPage`, val);
      this.getItems();
    },
    gotoPage() {
      this.getStatus();
      this.page = this.$route.query.page ? Number(this.$route.query.page) : 1;
      this.getItems();
    },
    setCancel() {
      if (!this.dialogCancelInvoice.stopReason) {
        this.$message({ message: "作废原因必须填写", type: "error" });
        return;
      }
      this.dialogCancelInvoice.loading = true;
      this.$apiCall(
        "api.Invoice.cancel",
        {
          invoiceId: this.dialogCancelInvoice.item.id,
          stopReason: this.dialogCancelInvoice.stopReason,
        },
        (r) => {
          this.dialogCancelInvoice.loading = false;
          if (r.ErrorCode == 9999) {
            this.dialogCancelInvoice.isShow = false;
            this.$message({
              message: this.$t("myinvoice.cancelSuccess"),
              type: "success",
            });
            this.getItems(true);
          } else {
            this.$message({ message: r.Message, type: "error" });
          }
        }
      );
    },
    cancelInvoice(item) {
      //作废
      this.dialogCancelInvoice = JSON.parse(this.dialogCancelInvoiceDefault);
      this.dialogCancelInvoice.isShow = true;
      this.dialogCancelInvoice.item = item;
      return;
      this.$confirm(this.$t("myinvoice.confirmToCancel"), "", {
        confirmButtonText: this.$t("myinvoice.cancel"),
        cancelButtonText: this.$t("myinvoice.discard"),
        type: "error",
      })
        .then(() => {
          this.loading = true;
          this.$apiCall("api.Invoice.cancel", { invoiceId: item.id }, (r) => {
            this.loading = false;
            if (r.ErrorCode == 9999) {
              this.$message({
                message: this.$t("myinvoice.cancelSuccess"),
                type: "success",
              });
              this.getItems(true);
            } else {
              this.$message({ message: r.Message, type: "error" });
            }
          });
        })
        .catch(() => {});
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
                this.$elementMessage(this.$t("myinvoice.下载成功"), "success");
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
  },
};
</script>
<style lang="scss" scoped>
.l-num {
  text-align: right;
  width: 60px;
  color: #909399;
}
.r-num {
  text-align: right;
  width: 70px;
}
.total-num {
  display: flex;
  .title {
    color: #909399;
  }
  .num {
    margin-right: 5px;
  }
  .msg {
    color: #909399;
  }
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
.black {
  color: #303133 !important;
}
</style>

<style lang="scss">
.download-xsl {
  padding: 0 15px;
  .el-alert__content {
    width: 100%;
    .el-alert__description {
      margin: 0;
    }
  }
}
.orders-page {
  .el-input-group__prepend {
    padding: 0 5px;
  }
}
</style>