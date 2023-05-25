<template>
  <div
    v-loading.fullscreen="loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <div ref="tablefilter" class="make-offer-filter">
      <div style="margin-bottom: 5px; font-size: 12px">
        <!-- 筛选 -->
        <div style="margin-bottom: 5px">
          <div class="left d-flex" style="flex-wrap: wrap">
            <div class="mg-r-10">
              <el-input
                @keyup.enter.native="filterItems('offer')"
                @clear="clearFilter('offer')"
                v-model="code"
                size="mini"
                placeholder="Offer ID"
                style="width: 180px"
              >
                <template slot="prepend"> # </template>
              </el-input>
            </div>
            <div class="mg-r-10">
              <el-input
                @keyup.enter.native="filterItems('name')"
                @clear="clearFilter('name')"
                v-model="codeName"
                size="mini"
                placeholder="Order ID"
                style="width: 180px"
              >
                <template slot="prepend"> # </template>
              </el-input>
            </div>


            <el-cascader
              size="mini"
              :key="cascaderKey"
              v-model="filterParams.shopifyStore"
              placeholder="All my stores"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              @change="filterItems('store')"
             >
            </el-cascader>
            <el-button-group
              class="mg-r-10"
              style="height: 28px"
            >
            <!-- 类型筛选 -->
            <el-popover
                placement="bottom"
                title=""
                trigger="click"
                popper-class="d-block"
                v-model="popTypeFilter"
              >
                <el-radio-group
                  v-model="filterParams.type"
                  @change="filterItems('type')"
                  style="max-height: 200px"
                >
                  <el-radio :label="1">{{$t('Orders')}}</el-radio>
                  <el-radio :label="2">{{$t('Products')}}</el-radio>
                </el-radio-group>
                <div class="d-flex justify-content-end">
                  <el-link
                    type="danger"
                    :disabled="!filterParams.type"
                    @click="clearFilter('type')"
                    >{{$t('Clear')}}</el-link
                  >
                </div>
                <el-button size="mini" slot="reference"
                  >{{$t('Type')}}<i class="el-icon-caret-bottom el-icon--right"></i
                ></el-button>
              </el-popover>
              <!-- 筛选店铺 -->
              <!-- <el-popover
                placement="bottom"
                title=""
                trigger="click"
                popper-class="d-block"
                v-model="popStoreFilter"
              >
                <div>
                  
                  <el-checkbox-group
                    v-model="filterParams.shopifyStore"
                    style="max-height: 200px"
                  >
                    <el-checkbox
                      v-for="tag in storeList"
                      :label="tag.shopifyAccountId"
                      :key="tag.shopifyAccountId"
                      @change="filterItems('store')"
                      >{{ tag.store }}</el-checkbox
                    >
                  </el-checkbox-group>
                  <div class="d-flex justify-content-end">
                    <el-link
                      type="danger"
                      :disabled="!filterParams.shopifyStore.length"
                      @click="clearFilter('store')"
                      >Clear</el-link
                    >
                  </div>
                </div>
                <el-button size="mini" slot="reference"
                  >My Stores<i
                    class="el-icon-caret-bottom el-icon--right"
                  ></i
                ></el-button>
              </el-popover> -->
              <!-- 筛选时间段 -->
              <el-popover
                placement="bottom"
                title=""
                trigger="click"
                popper-class="d-block"
                v-model="popDateFilter"
              >
                <el-radio-group
                  v-model="filterParams.timeFilter"
                  @change="filterItems('date')"
                  style="max-height: 200px"
                >
                  <el-radio v-for="(time, k) in dateArr" :key="k" :label="k">{{
                    time
                  }}</el-radio>
                </el-radio-group>
                <div v-if="filterParams.timeFilter == 6">
                  <el-date-picker
                    size="mini"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="Start"
                    end-placeholder="End"
                    v-model="filterDate"
                    @change="dateChange"
                  >
                  </el-date-picker>
                </div>
                <div class="d-flex justify-content-end">
                  <el-link
                    type="danger"
                    :disabled="!filterParams.timeFilter"
                    @click="clearFilter('date')"
                    >{{$t('Clear')}}</el-link
                  >
                </div>
                <el-button size="mini" slot="reference"
                  >{{$t('Date Ranges')}}<i class="el-icon-caret-bottom el-icon--right"></i
                ></el-button>
              </el-popover>
              <!-- 状态 -->
              <el-popover
                v-if="$route.name == 'ArchivedOffers'"
                placement="bottom"
                title=""
                trigger="click"
                popper-class="d-block"
                v-model="popStatusFilter"
              >
                <el-radio-group
                  v-model="filterParams.status"
                  @change="filterItems('status')"
                  style="max-height: 200px"
                >
                  <el-radio
                    v-for="(status, k) in statusRadio"
                    :key="k"
                    :label="k"
                    >{{ status.text }}</el-radio
                  >
                </el-radio-group>
                <div class="d-flex justify-content-end">
                  <el-link
                    type="danger"
                    :disabled="!filterParams.status"
                    @click="clearFilter('status')"
                    >{{$t('Clear')}}</el-link
                  >
                </div>
                <el-button size="mini" slot="reference"
                  >{{$t('Status')}}<i class="el-icon-caret-bottom el-icon--right"></i
                ></el-button>
              </el-popover>
              <!-- 排序 -->
              <el-popover
                v-else
                placement="bottom"
                title=""
                trigger="click"
                popper-class="d-block"
                v-model="popSortFilter"
              >
                <el-radio-group
                  v-model="filterParams.sortBy"
                  @change="filterItems('sort')"
                >
                  <el-radio v-for="(sort, k) in sortArr" :key="k" :label="k">{{
                    sort
                  }}</el-radio>
                </el-radio-group>
                <div class="d-flex justify-content-end">
                  <el-link
                    type="danger"
                    :disabled="!filterParams.sortBy"
                    @click="clearFilter('sort')"
                    >{{$t('Clear')}}</el-link
                  >
                </div>
                <el-button size="mini" slot="reference"
                  >{{$t('SortBy')}}<i class="el-icon-caret-bottom el-icon--right"></i
                ></el-button>
              </el-popover>
            </el-button-group>
            <div style="min-width: 130px">
              <el-button type="primary" size="mini" @click="filterItems()"
                >{{$t('Filter')}}
              </el-button>
              <el-button type="danger" size="mini" @click="clearFilter()"
                >{{$t('Clear')}}</el-button
              >
            </div>
          </div>
        </div>
        <!-- 筛选状态栏 -->
        <div>
          <el-tag
            v-if="filterParams.code"
            size="small"
            type="info"
            closable
            @close="clearFilter('code')"
            class="mg-r-5"
            >#{{ filterParams.code }}</el-tag
          >
          <el-tag
            v-if="filterParams.codeName"
            size="small"
            type="info"
            closable
            @close="clearFilter('name')"
            class="mg-r-5"
            >#{{ filterParams.codeName }}</el-tag
          >
          <el-tag
            v-if="filterParams.shopifyStore.length"
            size="small"
            type="info"
            closable
            @close="clearFilter('store')"
            class="mg-r-5"
            >{{ shopifyStoreName }}</el-tag
          >
          <el-tag
            v-if="filterParams.timeFilter"
            size="small"
            type="info"
            closable
            @close="clearFilter('date')"
            class="mg-r-5"
          >
            {{ dateArr[filterParams.timeFilter] }}
            <span v-if="filterParams.timeFilter == 6 && filterDate.length">
              {{ filterDate[0] }}--{{ filterDate[1] }}
            </span>
          </el-tag>
          <el-tag
            v-if="filterParams.fulfillStatus.length"
            size="small"
            type="info"
            closable
            @close="clearFilter('fulfill')"
            class="mg-r-5"
          >
            {{
              filterParams.fulfillStatus[0] == "unfulfilled"
                ? "Unfulfilled"
                : "Partially fulfilled"
            }}<span v-if="filterParams.fulfillStatus.length > 1"
              >,{{
                filterParams.fulfillStatus[1] == "unfulfilled"
                  ? "Unfulfilled"
                  : "Partially fulfilled"
              }}</span
            >
          </el-tag>
          <el-tag
            v-if="filterParams.sortBy"
            size="small"
            type="info"
            closable
            @close="clearFilter('sort')"
            class="mg-r-5"
            >{{ sortArr[filterParams.sortBy] }}</el-tag
          >
          <el-tag
            v-if="filterParams.status"
            size="small"
            type="info"
            closable
            @close="clearFilter('status')"
            class="mg-r-5"
          >
            {{ statusRadio[filterParams.status].text }}
          </el-tag>
        </div> 
      </div>
      <div class="table-wrap">
        <el-table :data="tableData" stripe ref="gridTable">
          <el-table-column label="# Offer ID" prop="code" width="200" fixed>
            <template slot-scope="scope">
              <span style="margin-right: 10px"># {{ scope.row.code }}</span>
              <span>
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="
                    moment(scope.row.timeCreated * 1000).format('ll [at] LTS')
                  "
                  placement="top"
                >
                  <i class="el-icon-date"></i>
                </el-tooltip>
              </span>
            </template>
          </el-table-column>
          <!-- 类型 -->
          <el-table-column label="Type">
             <template slot-scope="scope">
                 <span v-if="scope.row.type == 1">{{$t('Orders')}}</span>
                 <span v-else>{{$t('Products')}}</span>
             </template>
          </el-table-column>

          <el-table-column label="QTY">
            <template slot-scope="scope">
              <span v-if="scope.row.accounts.length == 0 && scope.row.orderCnt == 0">---</span>
              <div v-else>
              <div v-for="store in scope.row.accounts" :key="store.shopName" >
                <div><shopCate :items="store" />{{ store.shopName }}</div>
              </div>
                <div v-if="scope.row.type == 1">{{$t('Total')}} {{ scope.row.orderCnt }} {{$t('orders')}}</div>
                <div v-else>{{$t('Total')}} {{ scope.row.orderCnt }} {{$t('products')}}</div>
              <div
                v-if="
                  scope.row.status != 3 && Number(scope.row.invalidOrderCnt)
                "
                style="color: #909399">
                ({{ scope.row.invalidOrderCnt }} {{$t('invalid')}}
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Some orders had been fulfilled or refunded"
                  placement="top"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
                )
              </div>
              </div>
              
            </template>
          </el-table-column>
          <!-- <el-table-column label="Shopify Orders">
            <template slot-scope="scope">
              <div>Total {{ scope.row.orderCnt }} orders</div>
              <div
                v-if="
                  scope.row.status != 3 && Number(scope.row.invalidOrderCnt)
                "
                style="color: #909399"
              >
                ({{ scope.row.invalidOrderCnt }} invalid
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Some orders had been fulfilled or refunded"
                  placement="top"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
                )
              </div>
            </template>
          </el-table-column> -->


          <el-table-column label="Income">
            <template slot="header">
              {{$t('Income')}}
              <el-tooltip
                class="item"
                effect="dark"
                :content="$t('Income will only visible to you')"
                placement="top"
              >
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <div></div>
              <span v-if="!scope.row.currency">---</span>
              <span>{{
                ce[scope.row.currency]
                  ? ce[scope.row.currency].symbol
                  : scope.row.currency
              }}</span>
              {{ scope.row.totalPrice }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="
              $route.name == 'VendorsRespondingOffers' ||
              $route.name == 'WaitingForVendorsRespond'
            "
            label="Vendors respond"
            width="190px"
          >
            <template slot-scope="scope">
              <div></div>
              <span v-if="$route.name == 'WaitingForVendorsRespond'">---</span>
              <div v-if="$route.name == 'VendorsRespondingOffers'">
                <div>
                  <span style="color: #909399">{{$t('Vendors')}}:</span>
                  <span>{{ scope.row.vendorResponseCnt }}{{$t('responded')}} </span>
                </div>
                <div>
                  <span style="color: #909399">{{$t('Offers')}}:</span>
                  <span
                    v-if="
                      Number(scope.row.offerPriceMin) ||
                      Number(scope.row.offerPriceMax)
                    "
                  >
                    US$
                    <span style="color: #f56c6c">{{
                      scope.row.offerPriceMin
                    }}</span>
                    -
                    <span style="margin-right: 5px; color: #f56c6c">{{
                      scope.row.offerPriceMax
                    }}</span>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="The products offers that vendors had filled in."
                      placement="top"
                    >
                      <i class="el-icon-question"></i>
                    </el-tooltip>
                  </span>
                  <span v-else>{{$t('waiting for responding')}}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="$route.name == 'ArchivedOffers'"
            :label="$t('Purchase Order')"
          >
            <template slot-scope="scope">
              <div></div>
              <div v-if="scope.row.status == 9">-</div>
              <div v-else>
                <div v-if="scope.row.invoiceCode" style="color: #5c6ac4">
                  # {{ scope.row.invoiceCode }}
                </div>
                <div
                  v-if="scope.row.invoiceStatus"
                  :class="`tx-${
                    $dict.invoiceStatus[scope.row.invoiceStatus].type
                  }`"
                >
                  {{ $dict.invoiceStatus[scope.row.invoiceStatus].text }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="$route.name == 'ArchivedOffers'"
            :label="$t('Status')"
          >
            <template slot-scope="scope">
              <div></div>
              <div v-if="scope.row.status == 9" style="color: #f56c6c">
               {{$t('Cancelled')}} 
              </div>
              <div v-if="scope.row.status == 3" style="color: #67c23a">
               {{$t('Confirmed')}} 
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Action" fixed="right">
            <template slot-scope="scope">
              <div></div>
              <template v-if="$route.name == 'WaitingForVendorsRespond'">
                <div>
                  <el-link type="primary" @click="openViewOrders(scope.row)"
                    >{{$t('View offers')}}</el-link
                  >
                </div>
                <div>
                  <el-link
                    type="danger"
                    @click="cancelOffer(scope.row, scope.$index)"
                    >{{$t('Cancel offers')}}</el-link
                  >
                </div>
              </template>
              <!-- 第三行 -->
              <template v-if="$route.name == 'VendorsRespondingOffers'">
                <div>
                  <el-link type="primary" @click="openViewOrders(scope.row)"
                    >{{$t('Check offers')}}</el-link
                  >
                </div>
                <div>
                  <el-link
                    type="danger"
                    @click="cancelOffer(scope.row, scope.$index)"
                    >{{$t('Cancel offers')}}</el-link
                  >
                </div>
              </template>
              <template v-if="$route.name == 'ArchivedOffers'">
                <div>
                  <el-link type="primary" @click="openViewOrders(scope.row, 1)"
                    >{{$t('View offer detail')}}</el-link
                  >
                </div>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div ref="tableFooter">
        <el-row v-if="tableData.length" :gutter="20">
          <el-col :span="24" class="d-flex justify-content-center">
            <div style="position: relative; top: 10px">
              <el-pagination
                :current-page="Number(page)"
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
    </div>
    <el-dialog
      v-if="DialogViewOrders.item"
      v-loading="!!DialogViewOrders.loading"
      :visible.sync="DialogViewOrders.isShow"
      width="90%"
    >
      <div slot="title">
        <span style="margin-right: 15px; font-size: 18px"
          ># {{ DialogViewOrders.item.code }}</span
        >
        <span style="color: #909399; font-size: 14px" v-if="isProduct == false"
          >({{$t('Total orders')}}: {{ DialogViewOrders.item.orderCnt }})</span
        >
        <span style="color: #909399; font-size: 14px" v-else
          >({{$t('Total Product')}}: {{ productDuotationList.length }})</span
        >
      </div>
      <el-divider></el-divider>
      <!-- dialog body -->
      <div style="padding: 0 20px">
        <div class="table-wrap" v-if="isProduct == false">
          <el-table
            :data="DialogViewOrders.orders"
            stripe
            ref="gridTable"
            height="200"
          >
            <el-table-column :label="$t('Order')" prop="codeName" width="100" fixed>
              <template slot-scope="scope">
                <span>{{ scope.row.codeName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('My Store')" prop="codeName" width="200">
              <template slot-scope="scope">
                
                  <div
                    class="tx-ellipsis1"
                    style="
                      display: inline-block;
                      max-width: 200px;
                      font-size: 12px;
                    "
                  ><shopCate :items="scope.row" /> 
                    {{ scope.row.store }}
                  </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Date')" width="190">
              <template slot-scope="scope">
                {{ moment(scope.row.timeCreated).format("ll [at] LTS") }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('Customer')" width="200">
              <template slot-scope="scope">
                <popShippingJson
                  :item="scope.row"
                  @onCopy="onCopy"
                  @onError="onError"
                />
              </template>
            </el-table-column>
            <el-table-column :label="$t('Total')" align="right">
              <template slot-scope="scope">
                <span>{{
                  ce[scope.row.currency]
                    ? ce[scope.row.currency].symbol
                    : scope.row.currency
                }}</span>
                {{ scope.row.totalPrice }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('Payment')" width="170">
              <template slot-scope="scope">
                <el-tag
                  v-if="
                    scope.row.financialStatus &&
                    scope.row.financialStatus != 'voided'
                  "
                  size="small"
                  :type="paymentArr[scope.row.financialStatus].type"
                >
                  <span
                    class="-EFlq"
                    :class="`bg${paymentArr[scope.row.financialStatus].r}`"
                  ></span>
                  {{ paymentArr[scope.row.financialStatus].text }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Fulfillment')" width="150">
              <template slot-scope="scope">
                <fulfillMentStatusTag
                  :fulfillmentStatus="scope.row.fulfillmentStatus"
                />
              </template>
            </el-table-column>
            <el-table-column label="Items">
              <template slot-scope="scope">
                <popItems
                  v-if="scope.row.items"
                  :items="scope.row.items"
                  :fulfillmentStatus="scope.row.fulfillmentStatus"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- productList -->
        <div class="table-wrap" v-else>
          <el-table
            :data="productDuotationList"
            stripe
            ref="gridTable"
            height="200"
          >
            <el-table-column :label="$t('Product images')" prop="img">
              <template slot-scope="scope">
                <img :src="scope.row.imgUrl" class="imgItem"
            />
              </template>
            </el-table-column>
            <el-table-column :label="$t('Details')" prop="Details">
              <template slot-scope="scope">
                <span>{{scope.row.detail}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Expected price (US$)')">
              <template slot-scope="scope">
               <span v-if="scope.row.expectPrice">US$ {{ scope.row.expectPrice }}</span>
               <span v-else>---</span> 
              </template>
            </el-table-column>
            <el-table-column label="Remark">
              <template slot-scope="scope">
                <span v-if="scope.row.remarks">{{ scope.row.remarks }}</span>
                <span v-else>---</span>
              </template>
            </el-table-column>
            
          </el-table>
        </div>
        <el-divider></el-divider>
        <div class="table-wrap">
          <div class="d-flex">
            <h3
              style="
                margin-right: 15px;
                height: 36px;
                line-height: 36px;
                font-weight: bold;
                font-size: 16px;
              "
            >
               {{$t('Vendors respond')}}
            </h3>
            <div style="font-size: 16px">
              <span style="color: #909399">{{$t('total')}}:</span>
              {{ DialogViewOrders.respond.length }}
            </div>
          </div>
          <el-table
            :data="DialogViewOrders.respond"
            stripe
            ref="gridTable"
            height="200"
          >
            <el-table-column label="Status">
              <template slot-scope="scope">
                <el-radio
                  :disabled="
                    scope.row.status != '3' || $route.name == 'ArchivedOffers'
                  "
                  v-model="DialogViewOrders.radio"
                  :label="scope.row.id"
                  name="1"
                >
                  <span :class="respondStatus[scope.row.status].style">{{
                    respondStatus[scope.row.status].text
                  }}</span>
                </el-radio>
              </template>
            </el-table-column>
            <el-table-column label="Vendor name">
              <template slot-scope="scope">
                <span v-if="scope.row.vendor.vendorName"
                  >Shop# {{ scope.row.vendor.id }}</span
                >
                <span v-else>---</span>
              </template>
            </el-table-column>
            <el-table-column label="Date" sortable prop="timeCreated">
              <template slot-scope="scope">
                {{
                  moment(scope.row.timeCreated * 1000).format("ll [at] LTS")
                }}
              </template>
            </el-table-column>
            <el-table-column :label="isProduct == false ? 'Offered Orders' : 'Offered Products'">
              <template slot-scope="scope">
                <template v-if="scope.row.status == 1"> --- </template>
                <template v-else>
                  <span class="text-danger">{{ scope.row.priceCnt }}</span> of
                  {{ scope.row.totalItemCnt }}
                </template>
              </template>
            </el-table-column>
            <el-table-column label="Offer price">
              <template slot-scope="scope">
                <template v-if="scope.row.status != 3"> --- </template>
                <template v-else>
               <span v-if="isProduct == true">US$ {{ `${scope.row.minPrice} ~ ${scope.row.maxPrice}` }}</span> 
               <span v-else>US$ {{ scope.row.totalPrice }}</span> 
                </template>
              </template>
            </el-table-column>
            <el-table-column label="Action">
              <template slot-scope="scope">
                <div v-if="scope.row.status == 3 || scope.row.status == 4">
                  <el-link type="primary" @click="openItemsDetail(scope.row)"
                    >{{$t('View offer detail')}}</el-link
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="DialogViewOrders.isShow = false">{{$t('Discard')}}</el-button>
        <el-button
          v-if="$route.name != 'ArchivedOffers'"
          type="primary"
          :disabled="!DialogViewOrders.radio"
          @click="confirmOffer"
          >{{$t('Confirm this Offer')}}</el-button
        >
      </div>
    </el-dialog>
    <!-- 报价详情 -->
    <el-dialog
      v-if="DialogItemsDetail.item"
      v-loading="DialogItemsDetail.loading"
      :visible.sync="DialogItemsDetail.isShow"
      width="90%"
    >
      <div slot="title">
        <span style="margin-right: 15px; font-size: 18px"
          ># {{ DialogViewOrders.item.code }}</span
        >
        <span style="color: #909399; font-size: 14px">
          ({{$t('Vendor')}}:
          <span style="margin-right: 25px; color: #606266">
            {{ DialogItemsDetail.item.vendor.vendorName }} #
            {{ DialogItemsDetail.item.vendor.id }}
          </span>
          <span v-if="isProduct == false">{{$t('Offered Orders')}}:</span> 
          <span v-else>{{$t('Offered Products')}}:</span> 
          <span style="color: #606266">{{
            DialogItemsDetail.item.priceCnt
          }}</span>
          of {{ DialogItemsDetail.item.totalItemCnt }}
          )
        </span>
      </div>
      <el-divider></el-divider>
      <!-- dialog body -->
      <div style="padding: 20px">
        <!-- tabs -->
        <el-row>
          <el-col :span="24" ref="pageTabs">
            <el-tabs
              v-model="DialogItemsDetail.activeName"
              @tab-click="handleClick"
            >
              <el-tab-pane :label="isProduct == false ? $t('All Orders')  : $t('All Products')" name="AllOrders"></el-tab-pane>
              <el-tab-pane
                :label="isProduct == false ? $t('Offered Orders') : $t('Offered Products') "
                name="OfferedOrders"
              ></el-tab-pane>
              <el-tab-pane v-if="isProduct == false"
                label="Invaild Orders"
                name="InvaildOrders"
              ></el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
        <div
          class="table-wrap"
          style="
            position: relative;
            top: -15px;
            border: 1px #dcdfe6 solid;
            padding: 15px;
          "
        >
          <el-table v-if="isProduct == false"
            :data="DialogItemsDetail.list"
            stripe
            ref="gridTable-items"
            height="250"
          >
            <el-table-column :label="$t('Orders')">
              <template slot-scope="scope">
                <div class="table-shopify-wrapper" style="text-align: center">
                  <div class="code tx-600">
                    <popShippingJson
                      isicon="1"
                      :item="scope.row"
                      :type="2"
                      @onCopy="onCopy"
                      @onError="onError"
                    />
                  </div>
                  <div class="date">
                    {{
                      scope.row.timeCreated
                        ? moment(scope.row.timeCreated).format("ll")
                        : "---"
                    }}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Items')" width="250">
              <template v-slot="{ row }">
                <div class="table-items-wrapper">
                  <div class="items-image">
                    <el-image
                      class="image"
                      lazy
                      :src="row.imgUrl"
                      :preview-src-list="row.previewList"
                    >
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                  </div>
                  <div class="items-content">
                    <div class="items-title tx-600">{{ row.name }}</div>
                    <div
                      style="white-space: initial"
                      v-if="
                        row.customerProperties && row.customerProperties.length
                      "
                    >
                      <div
                        style="display: inline-block"
                        class="mg-r-5"
                        v-for="(item,index) in row.customerProperties"
                        :key="index"
                      >
                        {{ item.name }}:
                        <span style="color: #909399">{{ item.value }}</span>
                      </div>
                    </div>
                    <div class="item-info">
                      <span v-if="row.shippingJson && row.shippingJson.name"
                        >To {{ row.shippingJson.name }}
                      </span>
                      <span v-if="row.shippingJson && row.shippingJson.country">
                        ({{ row.shippingJson.country }})</span
                      >
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Quantity')" align="center">
              <template slot-scope="scope">
                {{ scope.row.quantity }}
              </template>
            </el-table-column>
            <el-table-column label="Income">
              <template slot-scope="scope">
                US$ {{ scope.row.incomePrice }}
              </template>
            </el-table-column>
            <el-table-column :label="`${$t('Offer Price')}(US$)`"> 
              <template slot-scope="scope">
                <span v-if="scope.row.offerPrice" class="tx-danger">
                  {{ scope.row.offerPrice }}
                </span>
                <span v-else style="color: #c0c4cc">---</span>
              </template>
            </el-table-column>
            <el-table-column label="Profit (US$)">
              <template slot="header">
                Profit (US$)
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="About Profit = Income - Cost"
                  placement="top"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </template>
              <template slot-scope="scope">
                <span class="tx-success">{{ scope.row.profit }}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- Product -->
          <el-table
            :data="productsItems"
            stripe
            ref="gridTable-items"
            height="150"
            v-else
          >
            <el-table-column :label="$t('Product')" prop="codeName" width="200" fixed>
              <template slot-scope="scope">
                <img :src="scope.row.imgUrl" class="imgItem"/>
              </template>
            </el-table-column>
            <el-table-column label="Items">
              <template slot-scope="scope">
                <el-popover v-if="scope.row.offerPrices && scope.row.offerPrices.length"
                 placement="right-start"
              trigger="hover"
            width="400"
         >
      <div class="pop-sku">
        <div v-for="(sku, skuI) in scope.row.offerPrices" :key="sku.id"
          :style="{borderBottom:  scope.row.offerPrices.length - 1 != skuI ? '1px #EBEEF5 solid' : 'none'}"
        >
          <div class="image-wrap">
            <el-image :src="scope.row.imgUrl" style="min-width: 50px; width: 50px; height: 50px;"
              :fit="'cover'"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" style="color: #C0C4CC;font-size: 20px;"></i>
              </div>
            </el-image>
            
          </div>
          <div class="info">
            <div class=" mg-b-10">
              <i>US$ {{sku.price}}</i>
            </div>
            <div class=" tx-ellipsis2" style="word-break: normal;">{{sku.variableId}}</div>
            <div>{{sku.productName}}</div>
            
            
          </div>

        </div>
      </div>
      <span slot="reference" style=" display: inline-block; cursor: pointer;">
        <span>{{scope.row.offerPrices.length}} Items</span>
        <i v-if="scope.row.offerPrices.length" class="el-icon-caret-bottom"></i>
      </span>
    </el-popover>
              </template>
            </el-table-column>
           <el-table-column :label="$t('Quantity')" align="center">
              ---
            </el-table-column>
            <el-table-column :label="$t('Income')">
              ---
            </el-table-column>
            <el-table-column :label="`${$t('Offer Price')} (US$)`"> 
              <template slot-scope="scope">
                US$ <span v-if="scope.row.minPrice" class="tx-danger">
                  {{ scope.row.minPrice }}
                </span>
                <span v-else style="color: #c0c4cc">---</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-divider></el-divider>
      <div slot="footer" class="dialog-footer">
        <div class="d-flex" style="text-align: left">
          <div style="flex: 1">
            <span style="color: #909399">{{$t('Vendor')}}:</span>
            <span v-if="isProduct == false">{{ DialogItemsDetail.item.vendor.vendorName }}</span>
            <span v-else>Shop</span> #
            {{ DialogItemsDetail.item.vendor.id }}
          </div>
          <div style="flex: 1">
            <span style="margin-right: 5px; color: #909399" v-if="isProduct == false"
              >{{$t('Offered Orders')}}:</span
            >
            <span style="margin-right: 5px; color: #909399" v-else
              >{{$t('Offered Products')}}:</span
            >
            <template v-if="DialogItemsDetail.item.status == 1">---</template>
            <template v-else>
              <b style="color: #303133">{{
                DialogItemsDetail.item.priceCnt
              }}</b>
              of {{ DialogItemsDetail.item.totalItemCnt }}
            </template>
          </div>
          <div style="flex: 1">
            <span style="margin-right: 5px; color: #909399">{{$t('Offer Price')}}:</span>
            US$ <span style="color: #f56c6c" v-if="isProduct == true">{{ offerPrices }}</span>
           <span style="color: #f56c6c" v-if="isProduct == false">{{ DialogItemsDetail.item.totalPrice }}</span>
          </div>
          <!-- <div style="flex: 1">
            <span style="margin-right: 5px">Profit:</span>
            US$
            <span style="margin-right: 5px; color: #67c23a">{{
              itemTotal.profit
            }}</span>
            <el-tooltip
              class="item"
              effect="dark"
              content="About Profit = Income - Cost"
              placement="top"
            >
              <i class="el-icon-question"></i>
            </el-tooltip>
          </div> -->
          <div style="flex: 1; text-align: right">
            <el-button @click="DialogItemsDetail.isShow = false"
              >{{$t('Discard')}}</el-button
            >
          </div>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import popShippingJson from "./../../components/PopShippingJson";
import fulfillMentStatusTag from "./../../components/ShopifyStatus";
import popItems from "./../../components/PopItems";
import shopCate from './../../components/shopCate'
export default {
  props: ["dateArr", "sortArr", "paymentArr", "storeList","options"],
  data() {
    return {
      cascaderKey:1,
      offerPrices:'',
      isProduct:false,
      loading: false,
      tableData: [],
      productsItems:[],
      pageSize: [20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("c_WaitingForVendorsRespondRowsPerPage")
        ? Number(localStorage.getItem("c_WaitingForVendorsRespondRowsPerPage"))
        : 20,
      totalCount: 0,
      totalPage: 0,
      ce: this.$CE, //货币符号
      isManage: 1,
      codeName: "",
      code: "",
      filterParams: {
        type:"",
        code: "",
        codeName: "",
        shopifyStore: [],
        fulfillStatus: [],
        timeFilter: "",
        dateFrom: "",
        dateTo: "",
        sortBy: "",
        status: "",
      },
      filterParamsDefault: "{}",
      shopifyStoreName: "",
      popTypeFilter: false,
      popStoreFilter: false,
      popFulfillFilter: false,
      popDateFilter: false,
      popSortFilter: false,
      popStatusFilter: false,
      filterDate: [],
      productDuotationList:[],
      DialogViewOrders: {
        isShow: false,
        loading: 0,
        type: 1,
        item: null,
        orders: [],
        respond: [],
        radio: "",
      },
      DialogViewOrdersDefault: "{}",
      respondStatus: {
        1: { text: "checking", style: "tx-warning" },
        2: { text: "offering", style: "tx-warning" },
        3: { text: "complete", style: "tx-success" },
        4: { text: "confirmed", style: "tx-success" },
        9: { text: "invalid", style: "tx-danger" },
      },
      DialogItemsDetail: {
        isShow: false,
        loading: false,
        item: null,
        activeName: "AllOrders",
        list: [],
      },
      DialogItemsDetailDefault: "{}",
      statusRadio: {
        3: { text: "Confirmed", style: "tx-success" },
        9: { text: "Cancelled", style: "tx-danger" },
      },
    };
  },
  components: {
    popShippingJson,
    fulfillMentStatusTag,
    popItems,
    shopCate
  },
  computed: {
    itemTotal() {
      let re = {
        offerPrice: 0,
        profit: 0,
      };
      this.DialogItemsDetail.list.forEach((e) => {
        if (Number(e.offerPrice)) {
          re.offerPrice += Number(e.offerPrice);
          re.profit += Number(e.profit);
        }
      });
      re.offerPrice = re.offerPrice.toFixed(2);
      re.profit = re.profit.toFixed(2);
      return re;
    },
  },
  watch: {
    $route: "gotoPage",
    "filterParams.shopifyStore"() {
      if (!this.filterParams.shopifyStore.length) return;
      let arr = [];
      this.filterParams.shopifyStore.forEach((e) => {
        this.storeList.forEach((item) => {
          if (e == item.shopifyAccountId) {
            arr.push(item.store);
          }
        });
      });
      this.shopifyStoreName = arr.join(",");
    },
  },
  mounted() {
    this.filterParamsDefault = JSON.stringify(this.filterParams);
    this.DialogViewOrdersDefault = JSON.stringify(this.DialogViewOrders);
    this.DialogItemsDetailDefault = JSON.stringify(this.DialogItemsDetail);
    this.getItems();
  },
  methods: {
    checkOffers(item) {
      // console.log(item);
    },
    getItemsDetail() {
      this.DialogItemsDetail.loading = true;
      let params = {
        offerId: this.DialogItemsDetail.item.offerListId,
        vendorId: this.DialogItemsDetail.item.vendorId,
      };
      if (this.DialogItemsDetail.activeName == "OfferedOrders")
        params.offered = 1;
      if (this.DialogItemsDetail.activeName == "InvaildOrders")
        params.invaild = 1;
      this.$apiCall("api.OfferList.getOfferItemsDetail", params, (r) => {
        this.DialogItemsDetail.loading = false;
        if (r.ErrorCode == "9999") {
          if(this.isProduct == false){
          this.DialogItemsDetail.list = r.Data.Results.map((e) => {
            e.shippingJson = JSON.parse(e.shippingJson);
            return e;
          });
          this.$refs["gridTable-items"].bodyWrapper.scrollTop = 0;  
          }else{
          this.productsItems = r.Data.Results;
          } 
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    handleClick(val) {
      //弹层tabs
      this.DialogItemsDetail.activeName = val.name;
      this.getItemsDetail();
    },
    openItemsDetail(item) {
      this.offerPrices = `${item.minPrice} ~ ${item.maxPrice}`
      this.DialogItemsDetail = JSON.parse(this.DialogItemsDetailDefault);
      this.DialogItemsDetail.item = item;
      this.DialogItemsDetail.isShow = true;
      this.getItemsDetail();
    },
    confirmOffer() {
      //确认订单
      let params = {};
      this.DialogViewOrders.respond.forEach((e) => {
        if (e.id == this.DialogViewOrders.radio) params.vendorId = e.vendorId;
        params.offerId = e.offerListId;
      });
      // console.log(this.isProduct)
      this.DialogViewOrders.loading = true;
      this.$apiCall(this.isProduct ==false ? "api.OfferList.genOfferToInvoice":"api.OfferList.genOfferToImportProduct", 
      params, (r) => {
        this.DialogViewOrders.loading = false;
        if (r.ErrorCode == "9999") {
          this.DialogViewOrders.isShow = false;
          this.$elementMessage("success", "success");
          this.$router.push({ name: "ArchivedOffers" });
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    openViewOrders(item, offerFinished) {
      if(item.type == 2){
        this.isProduct = true;
      }else{
        this.isProduct = false;
      }
      //打开订单弹层
      this.$emit("getNum");
      this.productDuotationList = [];
      this.DialogViewOrders = JSON.parse(this.DialogViewOrdersDefault);
      this.DialogViewOrders.item = { ...item };
      this.DialogViewOrders.isShow = true;
      this.DialogViewOrders.loading = 2;
      //取orders
      let params = {
        offerListId: item.id,
      };
      if (offerFinished) {
        params.offerFinished = offerFinished;
      }
      if(item.type == 2){
      this.$apiCall("api.OfferList.getProductOfferItems",{ offerId: item.id },
      (r) => {
        this.DialogViewOrders.loading--;
        if (r.ErrorCode == "9999") {
          this.productDuotationList = r.Data.Results
        } else {
          this.$elementMessage(r.Message, "error");
          this.DialogViewOrders.isShow = false;
        }
      });  
      }else{
      this.$apiCall("api.Invoice.shopifyOrders", params , (r) => {
        this.DialogViewOrders.loading--;
        if (r.ErrorCode == "9999") {
          this.DialogViewOrders.orders = r.Data.Results.map((e) => {
            e.checked = false;
            e.shippingJson = JSON.parse(e.shippingJson);
            return e;
          });
        } else {
          this.$elementMessage(r.Message, "error");
          this.DialogViewOrders = JSON.parse(this.DialogViewOrdersDefault);
        }
      });   
      }
      
      //取vendors respond
      this.$apiCall(
        "api.OfferList.getOfferVendorList",
        { offerId: item.id },
        (r) => {
          this.DialogViewOrders.loading--;
          if (r.ErrorCode == "9999") {
            this.DialogViewOrders.respond = [];
            if (!r.Data.Results.length) return;
            r.Data.Results.forEach((e) => {
              if (e.status != "9") {
                e.checked = false;
                this.DialogViewOrders.respond.push(e);
              }
            });
            r.Data.Results.forEach((e) => {
              if (e.status == "9") {
                e.checked = false;
                this.DialogViewOrders.respond.push(e);
              }
            });
            //测试页面样式
            if (!this.DialogViewOrders.respond.length) {
              this.DialogViewOrders.respond = [{ checked: false }];
            }
          } else {
            this.$elementMessage(r.Message, "error");
            this.DialogViewOrders.isShow = false;
          }
        }
      );
    },
    cancelOffer(item, i) {
      //Cancel offer
      this.$confirm( this.$t("Yes, I want to CANCEL this offer"), "", {
        confirmButtonText: "Cancel",
        cancelButtonText: "Discard",
        confirmButtonClass: " el-button--danger",
        type: "info",
      }).then(() => {
        this.loading = true;
        this.$apiCall(
          "api.OfferList.cancelOffer",
          { offerId: item.id },
          (r) => {
            this.loading = false;
            if (r.ErrorCode == "9999") {
              this.$elementMessage(this.$t("Cancel the success"), "success");
              this.tableData.splice(i, 1);
              this.$emit("getNum");
              this.totalCount--;
            } else {
              this.$elementMessage(r.Message, "error");
            }
          }
        );
      });
      setTimeout(() => {
        //取消弹层显示时 按钮默认 focus
        document
          .querySelectorAll(".el-message-box__btns .el-button")
          .forEach((e) => {
            e.blur();
          });
      }, 200);
    },
    filterItems(type) {
      switch (type) {
        case "code":
          this.filterParams.code = this.code.replace(/#/g, "");
          break;
        case "name":
          this.filterParams.codeName = this.codeName.replace(/#/g, "");
          break;
        case "date":
          this.filterDate = [];
          this.filterParams.dateFrom = "";
          this.filterParams.dateTo = "";
          break;
        default:
          this.filterParams.code = this.code.replace(/#/g, "");
          this.filterParams.codeName = this.codeName.replace(/#/g, "");
          break;
      }
      if (this.timeFilter != 6) this.resetPage();
    },
    clearFilter(type) {
      switch (type) {
        case "code":
          this.filterParams.code = this.code = "";
          break;
        case "name":
          this.filterParams.codeName = this.codeName = "";
          break;
        case "type":
          this.filterParams.type = "";
          this.popTypeFilter = false;
          break;
        case "store":
          this.filterParams.shopifyStore = [];
          this.popStoreFilter = false;
          ++this.cascaderKey
          break;
        case "date":
          this.filterParams.timeFilter = "";
          this.filterDate = [];
          this.filterParams.dateFrom = "";
          this.filterParams.dateTo = "";
          this.popDateFilter = false;
          break;
        case "fulfill":
          this.filterParams.fulfillStatus = [];
          this.popFulfillFilter = false;
          break;
        case "sort":
          this.filterParams.sortBy = "";
          this.popSortFilter = false;
          break;
        case "status":
          this.filterParams.status = "";
          this.popStatusFilter = false;
          break;
        default:
          this.filterParams = JSON.parse(this.filterParamsDefault);
          this.code = this.codeName = "";
          this.filterDate = [];
      }
      this.resetPage();
    },
    getItems() {
      // this.loading = true;
      let arr = [];
      if(this.filterParams.shopifyStore[1]){
      arr.push(this.filterParams.shopifyStore[1])  
      }
      let params = {
        type:this.filterParams.type,
        page: this.page,
        rowsPerPage: this.rowsPerPage,
        code: this.filterParams.code,
        codeNameLike: this.filterParams.codeName,
        accountIds: arr,
        timeFilter:
          this.filterParams.timeFilter >= 6 ? "" : this.filterParams.timeFilter,
        dateFrom: this.filterParams.dateFrom,
        dateTo: this.filterParams.dateTo,
        sort: this.filterParams.sortBy,
      };
      if (this.$route.name == "VendorsRespondingOffers") {
        params.status = 2;
      }
      if (this.$route.name == "WaitingForVendorsRespond") {
        params.status = 1;
      }
      if (this.$route.name == "ArchivedOffers") {
        params.status = this.filterParams.status || "39";
      }
      this.loading = true;
      this.$apiCall("api.OfferList.findByCustomer", params, (r) => {
        this.loading = false;
        if (r.ErrorCode == "9999") {
          this.totalPage = r.Data.Pagination.totalPage;
          this.totalCount = r.Data.Pagination.totalCount;

          this.tableData = r.Data.Results.length
            ? r.Data.Results.map((e) => {
                return e;
              })
            : [];
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    dateChange() {
      if (this.filterDate.length > 1) {
        this.filterParams.dateFrom = moment(this.filterDate[0]).unix();
        this.filterParams.dateTo = moment(this.filterDate[1])
          .endOf("d")
          .unix();
        //筛选
        this.resetPage();
      }
    },
    gotoPage() {
      this.page = this.$route.query.page ? this.$route.query.page : 1;
      this.getItems();
    },
    toPage(val) {
      if (val != this.$route.query.page)
        this.$router.push({
          query: {
            page: val,
          },
        });
    },
    resetPage() {
      if (this.$route.query.page == 1) {
        this.getItems();
      } else {
        this.$router.push({
          query: {
            page: 1,
          },
        });
      }
    },
    changePageSize(val) {
      this.rowsPerPage = val;
      localStorage.setItem("c_WaitingForVendorsRespondRowsPerPage", val);
      this.getItems();
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
  },
};
</script>

<style lang="scss" scoped>
.d-block .el-radio,
.d-block .el-checkbox {
  display: block;
  margin: 10px 0;
}
.el-dialog__body .el-tabs .el-tabs__item {
  background: #fff;
}
.el-button--primary:focus {
  background-color: #5c6ac4;
  border-color: #5c6ac4;
}
.table-shopify-wrapper {
  font-size: 12px;
  .code {
    color: #101010;
  }
  .date {
    color: #888888;
  }
}
.table-items-wrapper {
  display: flex;
  align-items: center;
  margin: 5px;
  justify-content: space-between;
  .items-image {
    flex: 0 0 70px;
    .image {
      min-width: 70px;
      width: 70px;
      height: 70px;
      border: 1px solid #ddd;
    }
  }
  .items-content {
    height: 70px;
    //width: 420px;
    flex: 1;
    margin: 0 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 12px;
    .items-title {
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      //word-break: normal;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .item-info {
      color: #909399;
    }
  }
  .items-tips {
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
}
.imgItem {
  object-fit: cover;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 60px;
  height: 60px;
}
</style>
<style lang="scss" scoped>
.pop-sku{
  padding-top: 5px;
  max-height: 300px;
  overflow-y: auto;
  font-size: 12px;
  > div{
    display: flex;
    margin-bottom: 10px;
    padding-right: 20px;
    padding-bottom: 10px;
    .el-image{
      margin-right: 10px;
      border: 1px#E4E7ED solid;
    }
    .info{
      font-size: 13px;
    }
  }
}
.image-wrap{
  position: relative;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  > i{
    position: absolute;
    top: -5px;
    right: -4px;
    width: 22px;
    height: 16px;
    font-style: normal;
    font-size: 12px;
    color: #606266;
    background: #DCDFE6;
    text-align: center;
    border-radius: 8px;
  }
}
.el-cascader{
  margin-right: 10px;
}
</style>