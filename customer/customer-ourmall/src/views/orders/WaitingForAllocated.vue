<template>
  <div v-loading.fullscreen="loading" element-loading-background="rgba(0, 0, 0, 0.3)">
    <div ref="tablefilter">
      <!-- 订单报价 -->
      
      
      <div style="margin-bottom: 5px; font-size: 12px;">
        <el-alert
          type="warning"
          :closable="false"
        >
          <div slot="title" class="table-wrap">
            * {{$t('In this tab, we will only filter your')}} 
            <span class="el-tag el-tag--info el-tag--small el-tag--light"><span class="-EFlq bg3"></span> {{$t('Paid')}} </span>
             + 
             <span><span class="el-tag el-tag--warning el-tag--small el-tag--light"><span class="-EFlq bg1"></span> {{$t('Unfulfilled')}} </span></span> 
              / 
             <span><span class="shopfiy-status el-tag el-tag--danger el-tag--small el-tag--light"><span class="-EFlq bg2"></span> {{$t('Partially Fulfilled')}} </span></span>
              {{$t('Orders which you can allocate to your vendor to process.')}}
          </div>
        </el-alert>
      </div>
      <div style=" margin-bottom: 5px;">
        <div class="left d-flex" style="flex-wrap: wrap;">
          <el-checkbox
              size="small"
              v-model="AllChecked"
              @change="changeAllCheckedT"
            >
              <span style="margin-right: 15px; font-size: 12px"
                >All ({{ CAllChecked.num }} / {{ tableDataCopy.length }})</span
              >
            </el-checkbox>
          <div class="mg-r-10">
						<el-input  @keyup.enter.native="filterItems('name')" @clear="clearFilter('name')" v-model="codeName" size="mini"  placeholder="Order ID" style="width: 190px;">
              <template slot="prepend">#</template>
						</el-input>
					</div>
          <!-- 筛选店铺 -->
          <div class="mg-r-10">
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
            </div>
          <el-button-group class=" mg-r-10" style="min-width:345px; height: 28px;">
            
            
            <!-- <el-popover placement="bottom" title="" trigger="click" popper-class="d-block"
              v-model="popStoreFilter"
            >
              <div>
                <el-checkbox-group v-model="filterParams.shopifyStore"  style=" max-height: 200px;">
                  <el-checkbox v-for="tag in storeList" :label="tag.shopifyAccountId" :key="tag.shopifyAccountId" @change="filterItems('store')">{{tag.store}}</el-checkbox>
                </el-checkbox-group>
                <div class=" d-flex justify-content-end">
                  <el-link type="danger" :disabled="!filterParams.shopifyStore.length" @click="clearFilter('store')">Clear</el-link>
                </div>
              </div>
              <el-button size="mini" slot="reference">My Stores<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
            </el-popover> -->
            <!-- 筛选时间段 -->
            <el-popover placement="bottom" title="" trigger="click" popper-class="d-block"
              v-model="popDateFilter"
            >
              <el-radio-group v-model="filterParams.timeFilter" @change="filterItems('date')"  style=" max-height: 200px;">
                <el-radio v-for="(time,k) in dateArr" :key="k" :label="k">{{time}}</el-radio>
							</el-radio-group>
              <div v-if="filterParams.timeFilter == 6">
                <el-date-picker size="mini"  value-format="yyyy-MM-dd"
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
              <div class=" d-flex justify-content-end">
								<el-link type="danger" :disabled="!filterParams.timeFilter" @click="clearFilter('date')">{{$t('Clear')}}</el-link>
							</div>
              <el-button size="mini" slot="reference">{{$t('Date Ranges')}}<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
            </el-popover>
            <!-- 筛选状态 -->
            <el-popover placement="bottom" title="" trigger="click" popper-class="d-block"
              v-model="popFulfillFilter"
            >
              <el-checkbox-group v-model="filterParams.fulfillStatus" @change="filterItems('fulfill')">
                <el-checkbox label="unfulfilled">{{$t('Unfulfilled')}}</el-checkbox>
                <el-checkbox label="partial">{{$t('Partially fulfilled')}}</el-checkbox>
              </el-checkbox-group>
              <div class=" d-flex justify-content-end">
								<el-link type="danger" :disabled="!filterParams.fulfillStatus.length" @click="clearFilter('fulfill')">{{$t('Clear')}}</el-link>
							</div>
              <el-button size="mini" slot="reference">{{$t('Fulfillment Status')}}<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
            </el-popover>
            <!-- 排序 -->
            <el-popover placement="bottom" title="" trigger="click" popper-class="d-block"
              v-model="popSortFilter"
            >
              <el-radio-group v-model="filterParams.sortBy" @change="filterItems('sort')">
                <el-radio v-for="(sort,k) in sortArr" :key="k" :label="k">{{sort}}</el-radio>
              </el-radio-group>
              <div class=" d-flex justify-content-end">
								<el-link type="danger" :disabled="!filterParams.sortBy" @click="clearFilter('sort')">{{$t('Clear')}}</el-link>
							</div>
              <el-button size="mini" slot="reference">{{$t('SortBy')}}<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
            </el-popover>
          </el-button-group>
          <div style=" min-width: 130px;">
            <el-button type="primary" size="mini" @click="filterItems()">{{$t('Filter')}}</el-button>
            <el-button type="danger" size="mini" @click="clearFilter()">{{$t('Clear')}}</el-button>
          </div>
          <!-- 全部勾选提示 -->
            <el-alert
              v-if="tableDataCopy.length && CAllChecked.num"
              type="warning"
              center
              show-icon
              :closable="false"
              style="margin: 0 20px; max-width: 400px; font-size: 12px"
            >
              <div slot="title">
                <el-link
                  type="warning"
                  v-if="CAllChecked.num == tableDataCopy.length"
                  @click="changeAllCheckedT(false)"
                  >{{ CAllChecked.num }} {{$t('orders selected, uncheck')}}</el-link
                >
                <el-link
                  type="primary"
                  v-if="CAllChecked.num && CAllChecked.num < tableDataCopy.length"
                  @click="changeAllCheckedT(true)"
                >
                  {{ CAllChecked.num }} {{$t('orders selected, select all')}} ({{
                    tableDataCopy.length
                  }}) orders
                </el-link>
              </div>
            </el-alert>
        </div>
        <div class="right"></div>
      </div>
      <div>
        <el-tag
          v-if="filterParams.codeName"
          size="small"
          type="info"
          closable
          @close="clearFilter('name')"
          class="mg-r-5"
        >#{{filterParams.codeName}}</el-tag>
        <el-tag v-if="filterParams.shopifyStore.length" size="small" type="info" closable @close="clearFilter('store')" class="mg-r-5">{{shopifyStoreName}}</el-tag>
        <el-tag v-if="filterParams.timeFilter" size="small" type="info" closable @close="clearFilter('date')" class="mg-r-5">
          {{dateArr[filterParams.timeFilter]}}
          <span v-if="filterParams.timeFilter == 6 && filterDate.length">
            {{filterDate[0]}}--{{filterDate[1]}}
          </span>
        </el-tag>
        <el-tag v-if="filterParams.fulfillStatus.length" size="small" type="info" closable @close="clearFilter('fulfill')" class="mg-r-5">
          {{filterParams.fulfillStatus[0] == 'unfulfilled' ? 'Unfulfilled' : 'Partially fulfilled'}}<span v-if="filterParams.fulfillStatus.length>1">,{{filterParams.fulfillStatus[1] == 'unfulfilled' ? 'Unfulfilled' : 'Partially fulfilled'}}</span>
        </el-tag>
        <el-tag v-if="filterParams.sortBy" size="small" type="info" closable @close="clearFilter('sort')" class="mg-r-5">{{sortArr[filterParams.sortBy]}}</el-tag>
      </div>
    </div>
    <div class="table-wrap" style="min-width: 930px;">
      <div class="table-titel">
        <el-row class="hidden-md-and-down">
          <el-col :span="3" :xs="3">
            <a v-if="tableData.length" href="javascript:;" class=" mg-r-10" @click="changeAllExpand">
              <i class=" fa" :class="isAllExpand ? 'fa-minus-square' : 'fa-plus-square'"></i>
            </a>
            <span class=" title-tx">{{$t('Order')}}</span>
          </el-col>
          <el-col :xl="3" :lg="5" :xs="5" style=" min-width: 100px;">
            <span class=" title-tx">{{$t('My Store')}}</span>
          </el-col>
          <el-col :xl="3" :lg="3" :xs="3">
            <span class=" title-tx">{{$t('Date')}}</span>
          </el-col>
          <el-col :span="3" class="hidden-lg-and-down">
            <span class=" title-tx customer-title">{{$t('Customer')}}</span>
          </el-col>
          <el-col :span="1" :xs="1" class="hidden-xl-only">
          </el-col>
          <el-col :span="3" :xs="3" style="justify-content: flex-end;">
            <span class=" title-tx" style="margin-right: 40px;">{{$t('Total')}}</span>
          </el-col>
          <el-col :span="3" :xs="3">
            <span class=" title-tx">{{$t('Fulfillment')}}</span>
          </el-col>
          <el-col :span="2" :xs="2">
            <span class=" title-tx">{{$t('Items')}}</span>
          </el-col>
          <el-col :span="4" :xs="4">
          </el-col>
        </el-row>
      </div>
      <!-- 加分页 -->
      <!-- :height="tableHeight" :scroll-y="{gt: 100}" @scroll="listScroll" -->
      <vxe-list v-if="tableData.length"  class="my-tree" ref="orderTree" 
        :data="tableData" 
      >
        <template v-slot="{ items }">
          <div
            class="my-tree-item"
            v-for="(item, i) in items"
            :key="item._id + '_' + i"
            :class="[`level-${item._LEVEL}`, {'has-child': item._HAS_CHILDREN, 'is-expand': item._EXPAND, 'bg': item.bg}]"
            style=" font-size: 12px;"
          >
            <!-- 订单层 -->
            <el-row v-if="item._LEVEL === 0" class="order-itm-row" :gutter="20"
              :style="{borderBottom: item._EXPAND ? '1px #E4E7ED solid' : 'none'}"
            >
              <!-- Order ID -->
              <el-col :span="3" style=" padding-left: 10px;">
                <el-checkbox
                style="margin-right: 5px;margin-top: 4px;"
                v-model="item.checked"
              ></el-checkbox>
                <a href="javascript:;" class=" mg-r-10" @click="toggleTreeNode(item)">
                  <i class=" fa " :class="item._EXPAND ? 'fa-minus-square' : 'fa-plus-square'"></i>
                </a>
                <span style="white-space: nowrap; font-size: 12px;">
                  {{ item.codeName }}
                  <span v-if="item.note" class="mg-l-5">
                    <el-tooltip class="item" effect="dark" :content="item.note" placement="top">
                      <i style="font-size: 12px;width: 12px;color: #5c6ac4;" class="el-icon-info"></i>
                    </el-tooltip>
                  </span>
                </span>
              </el-col>
              <!-- Shopify store -->
              <el-col :xl="3" :lg="5" class=" tx-ellipsis1">
                <div>
                  <!-- <el-tooltip class="item" effect="dark" :content="item.store" placement="top"> -->
                    <div class=" tx-ellipsis1" style=" min-width: 100px; max-width: 190px; font-size: 12px;display:flex">
                     <shopCate :items="item" /> 
                    {{item.store}}</div>
                  <!-- </el-tooltip> -->
                </div>
              </el-col>
              <!-- Date -->
              <el-col :xl="3" :lg="3" class="hidden-md-and-down">
                <el-tooltip class="item" effect="dark" :content="moment(item.timeCreated).format('ll [at] LTS')" placement="top">
                  <span class=" tx-ellipsis1" style="word-break: break-all; font-size: 12px;">{{moment(item.timeCreated).format("ll")}}</span>
                </el-tooltip>
              </el-col>
              <!-- Customer -->
              <el-col :span="3" class="hidden-lg-and-down">
                <popShippingJson :item="item" @onCopy="onCopy" @onError="onError"/>
              </el-col>
              <el-col :span="1" class="hidden-xl-only">
                <popShippingJson :item="item" :size="'mini'" @onCopy="onCopy" @onError="onError"/>
              </el-col>
              <!-- Shopify order total -->
              <el-col :span="3" style="justify-content: flex-end;">
                <div style=" margin-right: 25px; min-width: 50px;">
                  <span v-if="item.currency">{{ ce[item.currency] ? ce[item.currency].symbol : item.currency}} </span>
                  {{item.totalPrice}}
                </div>
              </el-col>
              <!-- Fulifillment -->
              <el-col :span="3" class="hidden-md-and-down">
                <fulfillMentStatusTag :fulfillmentStatus="item.fulfillmentStatus"/>
              </el-col>
              <!-- Items -->
              <el-col :span="2" class="hidden-md-and-down">
                <span>{{item.items.length}} {{$t('Items')}}</span>
              </el-col>
              <!-- 操作 -->
              <el-col :span="4">
                <el-link  class="mg-l-20" style="display: inline;min-width:170px" :underline="false" type="primary"
                  @click="openAllocateToVendor(item)"
                >{{$t('Allocate all to vendor')}}
                 
                </el-link>
              </el-col>
            </el-row>
            <!-- 商品层 -->
            <el-row v-else class="sku-itm-row">
              <el-col :span="1" class="tree-sub-first" style="border: none;"></el-col>
              <!-- 商品信息 -->
              <el-col :span="12">
                <div style="display: flex;align-items: center;">
                  <el-image style="min-width: 70px;width: 70px;height: 70px;margin: 5px 15px 5px 0;border: 1px solid #E4E7ED;"
                    :src="item.imgUrl"
                    :preview-src-list="[item.imgUrl]"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline" style="font-size: 20px;"></i>
                    </div>
                  </el-image>
                  <div style=" flex: 1; font-size: 12px;">
                    <p class=" tx-ellipsis2">{{ item.name }}</p>
                    <div v-if="item.customerProperties && item.customerProperties.length">
                      <div style="display: inline-block" class="mg-r-5" v-for="(val, i) in item.customerProperties" :key="i">
                        <span style="color: #909399;">{{val.name}}: </span>
                        {{val.value}}
                      </div>
                    </div>
                    <p><span style="color: #909399;">SKU: </span>{{ item.sku }}</p>
                  </div>
                </div>
              </el-col>
              <el-col :span="8" style="padding-left:15px;">
                <p v-if="!(item.unfulfillQuantity > 0 && item.unfulfillQuantity < item.quantity)" :class="item.unfulfillQuantity > 0 && item.unfulfillQuantity < item.quantity ? 'line' : ''">
                  x {{ item.quantity }}
                </p>
                <p v-if="item.unfulfillQuantity > 0 && item.unfulfillQuantity < item.quantity">
                  <span>
                    x {{ item.unfulfillQuantity }}
                  </span>
                  <span style="color: #c05717; margin-left: 20px;">({{item.fulfillQuantity}} of {{ item.quantity }} {{$t('purchased items are delivered')}})</span>
                </p>
                <p v-if="item.unfulfillQuantity == 0">
                  <span>({{item.fulfillQuantity}} of {{ item.quantity }} {{$t('fulfilled')}})</span>
                </p>
              </el-col>
              <el-col :span="3" style=" margin-left: -15px;">
               <el-link type="primary" @click="openAllocateToVendor(item)">{{$t('Allocate to vendor')}}</el-link>
              </el-col> 
            </el-row>
          </div>
          <div v-if="bottomLoading" class=" tx-center" style=" padding: 10px 0;"><i class="el-icon-loading"></i> Loading</div>
        </template>
      </vxe-list>
      <div v-else-if="!loading" class="nodata" :style="{height: tableHeight + 'px'}">
        {{$t('No data')}}
      </div>
    </div>
    <div ref="tableFooter">
      <el-row
        v-if="tableData.length"
        :gutter="20"
      >
        <el-col
          :span="24"
          class=" d-flex justify-content-center"
        >
          <div style=" position: relative; top: 10px;">
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
    <el-dialog
      v-loading="dialogAllocated.loading"
      :title="dialogAllocated.status == 1 ? this.$t('Select a vendor') : this.$t('Product has been allocated')"
      :visible.sync="dialogAllocated.isShow"
      :width="dialogAllocated.status == 1 ? '700px' : '1000px'"
      class="dialog-allocated"
      @closed="closeAllocated"
    >
      <div v-if="dialogAllocated.status == 1" class="vendors-wrap">
        <div class=" mg-b-10 d-flex">
          <el-input
            style="margin-right: 5px; width: 300px"
            v-model="dialogAllocated.vendorLike"
            :placeholder="$t('Vendor name / contact / shop name etc.')"
            size="mini"
            clearable
            @keyup.native="getVendors(1)"
            @clear="getVendors(1)"
          ></el-input>
        </div>
        <el-table
          border
          stripe
          highlight-current-row
          :data="dialogAllocated.vendors"
          style=" margin-bottom: 5px;"
        >
          <el-table-column :label="`${$root.$children[0].pName.a} ID`" width="200">
            <template slot-scope="scope">
              <i v-if="scope.row.vendorId" class=" mg-r-10 el-icon-user-solid" style="color: #909399;"></i>
              <span>{{scope.row.vendorId || 'NOT Joined'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="Vendor name" prop="vendorName" width="300"></el-table-column>
          <el-table-column label="" align="center">
            <template slot-scope="scope">
              <el-popconfirm
                :title="`Allocate ${dialogAllocated.skus.length} products to this vendor？`"
                confirm-button-text='Confirm'
                cancel-button-text='Cancel'
                @onConfirm="selectVendor(scope.row)"
              >
                <el-button slot="reference" type="primary" size="mini">{{$t('Select')}}</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div class=" d-flex" style="justify-content: center;">
          <el-pagination
            :current-page="dialogAllocated.page"
            :background="true"
            layout="total, prev, pager, next"
            :page-size="dialogAllocated.rowsPerPage"
            :total="Number(dialogAllocated.total)"
            @current-change="getVendors"
          >
          </el-pagination>
        </div>
      </div>
      <template v-else>
        <div class="row1">
          <i class="el-icon-success" style="margin-right: 15px; color: #67C23A; font-size: 46px;"></i>
          <div class="p-list">
            <div class="pro-item">
              <el-image
                style="margin-right: 20px; min-width: 50px; width: 50px; height: 50px; border: 1px solid #E4E7ED;"
                :src="dialogAllocated.skus[0].imgUrl"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline" style="font-size: 20px;"></i>
                </div>
              </el-image>
              <div class="pro-info">
                <div class=" mg-b-10 tx-ellipsis2">{{dialogAllocated.skus[0].name}}</div>
                <div class=" d-flex">
                  <div class="title">SKU:</div>
                  <div>{{dialogAllocated.skus[0].sku}}</div>
                </div>
              </div>
              <div v-if="dialogAllocated.skus.length > 1" class=" total">
                <div>{{$t('total')}} {{dialogAllocated.skus.length}} {{$t('products')}}</div>
              </div>
            </div>

          </div>
          <div class="right">
            <i class="el-icon-right"></i>
            <span>
              <i class="el-icon-user-solid"></i>
              <span>{{dialogAllocated.vendor.vendorName}}</span>
            </span>
          </div>
        </div>
        <div v-if="dialogAllocated.other.length" class=" row2">
          <div class="title">
            {{$t('Here are some other products seems can been allocated to the vendor too, do you want to do it now?')}}
          </div>
          <div class="select-items">
            <div class="list">
              <el-table
                stripe
                highlight-current-row
                height="300"
                :data="dialogAllocated.other"
                class="other-table"
              >
                <el-table-column label="" align="center" width="50">
                  <template slot="header" >
                    <el-checkbox style="margin: 0;" v-model="dialogAllocated.allChecked"
                      @change="changeAllChecked"
                    ></el-checkbox>
                  </template>
                  <template slot-scope="scope">
                     <el-checkbox v-model="scope.row.checked"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column label="Selected products">
                  <template slot="header" >
                    <span>{{$t('Selected products')}} </span>
                    <span v-if="allocatedOtherSelectNum">({{allocatedOtherSelectNum}})</span>
                  </template>
                  <template slot-scope="scope">
                     <div class="pro-info">
                       <el-image
                        style="margin-right: 20px; min-width: 50px; width: 50px; height: 50px; border: 1px solid #E4E7ED;"
                        :src="scope.row.imgUrl"
                      >
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline" style="font-size: 20px;"></i>
                        </div>
                      </el-image>
                      <div class="right">
                        <div class="name tx-ellipsis2" :title="`${scope.row.productName} - ${scope.row.propertyValue}`">
                          {{scope.row.productName}} - {{scope.row.propertyValue}}
                        </div>
                        <div class="sku">
                          <span class="title" style="font-size: 12px;">SKU:</span>
                          <span>{{scope.row.sku}}</span>
                        </div>
                      </div>
                     </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="action">
              <div>
                <el-button type="primary" size="small" @click="AllocateNow"
                  :disabled="!allocatedOtherSelectNum"
                >{{$t('Allocate NOW')}}</el-button>
              </div>
              <div>
                <el-button  size="small" @click="dialogAllocated.isShow = false;">{{$t('No thanks')}}</el-button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <span v-if="dialogAllocated.status == 1 || (dialogAllocated.status == 2 && !dialogAllocated.other.length)" slot="footer" class="dialog-footer">
        <el-button @click="dialogAllocated.isShow = false">{{$t('Close')}}</el-button>
      </span>
    </el-dialog>
    <div class="ball" :style="{top: `${ball.y}px`, left: `${ball.x}px`, opacity: ball.opacity}"></div>

    <DistributionVendorDialog
      ref="DistributionVendorDialog"
      @resetPage="resetPage"
      @ballAnimation="ballAnimation"
    />
    <el-backtop class="goto-top" target=".main-scroll  .el-scrollbar__wrap" :right="20" :bottom="120">
    </el-backtop>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import fulfillMentStatusTag from './../../components/ShopifyStatus'
import DistributionVendorDialog from "@/components/DistributionVendorDialog";
import popShippingJson from './../../components/PopShippingJson';
import shopCate from './../../components/shopCate'
export default {
  data() {
    return {
      AllChecked: false,
      options:[{
        id:1,
        label:'Shopify',
        children:[]
      },
      {
        id:2,
        label:'Woocommerce',
        children:[]
      },
      {
        id:3,
        label:'Lazada',
        children:[]
      },
      {
        id:4,
        label:'Shopee',
        children:[]
      }],
      cascaderKey:1,
      loading: false,
      tableHeight: 400,
      isAllExpand: true,
      tableData: [],
      tableDataCopy:[],
      pageSize: [10, 20, 50],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("c_waitingForAllocatedRowsPerPage")
        ? Number(localStorage.getItem("c_waitingForAllocatedRowsPerPage"))
        : 10,
      totalCount: 0,
      totalPage: 0,
      allExpand: false, //全部展开
      ce: this.$CE, //货币符号
      isManage: 1,
      codeName: "",
      filterParams: {
        codeName: '',
        shopifyStore: [],
        fulfillStatus: [],
        timeFilter: "",
        dateFrom: "",
        dateTo: "",
        sortBy: "",
      },
      filterParamsDefault: "{}",
      storeList: [],
      shopifyStoreName: "",
      popStoreFilter: false,
      popFulfillFilter: false,
      popDateFilter: false,
      popSortFilter: false,
      filterDate:[],
      dateArr: {
        1: this.$t("Today"),
        2: this.$t("Last 7 days"),
        3: this.$t("Last 30 days"),
        4: this.$t("Last 90 days"),
        5: this.$t("Last 12 months"),
        6: this.$t("Custom"),
      },
      sortArr: {
        1: this.$t("Order number (ascending)"),
        2: this.$t("Order number (descending)"),
        3: this.$t("Date (oldest first)"),
        4: this.$t("Date (newest first)"),
      },
      dialogAllocated: {
        status: 1,
        isShow: false,
        loading: false,
        skus: [],
        relationshipId: "",
        vendors:[],
        vendorLike: "",
        page: 1,
        rowsPerPage: 5,
        total: 0,
        totalPage: 0,
        vendor: null,
        other: [],
        allChecked: false,
      },
      dialogAllocatedDefault: '{}',
      ball:{
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        opacity: 0,
      },
      bottomLoading: false,
      scrollT: 0,
      gvTime: 0,
      keyTimeout: 0,
    };
  },
  components: {
    fulfillMentStatusTag,
    DistributionVendorDialog,
    popShippingJson,
    shopCate
  },
  watch: {
    $route: "gotoPage",
    // tableHeight(){
    //   this.$nextTick(()=>{
    //     this.refreshTree();
    //   })
    // },
    CAllChecked() {
      this.AllChecked = this.CAllChecked.status;
    },
    'filterParams.shopifyStore'(){
      if(!this.filterParams.shopifyStore.length) return;
				let arr = [];
				this.filterParams.shopifyStore.forEach(e=>{
					this.storeList.forEach(item=>{
						if(e == item.shopifyAccountId){
							arr.push(item.store)
						}
					})
				})
				this.shopifyStoreName = arr.join(",");
    },
    isShowFilter(){
      if(this.isShowFilter){
        // this.filterParams.timeFilter = 3;
      }
    },
    allocatedOtherSelectNum(){
      if(!this.dialogAllocated.other.length){
        this.$set(this.dialogAllocated, 'allChecked', false)
        return;
      }
      this.$set(this.dialogAllocated, 'allChecked', this.allocatedOtherSelectNum == this.dialogAllocated.other.length)
    }
  },
  mounted() {
    this.filterParamsDefault = JSON.stringify(this.filterParams);
    this.dialogAllocatedDefault = JSON.stringify(this.dialogAllocated);
    // this.filterParams.timeFilter = 3;
    if(this.$route.params.vid == '999e'){
      this.filterParams.timeFilter = "";
    }
    if(this.$route.params.id){
      this.filterParams.timeFilter = "";
    }
    this.$nextTick(() => {
      // this.$emit("getTableHeight", this);
      this.getStore();
      // window.onresize = () => {
      //   this.$emit("getTableHeight", this);
      // };
    });
    //打一次接口再打开子路由
    this.loading = true;
    this.$apiCall('api.ShopifyAccount.updateShopifyOrderNow', {}, r => {
      this.getItems();
    })
  },
  beforeDestroy() {
    // window.onresize = null;
  },
  computed: {
    isShowFilter(){
      return !this.filterParams.sortBy && !this.filterParams.fulfillStatus.length &&
        !this.filterParams.shopifyStore.length && !this.filterParams.codeName;
    },
    allocatedOtherSelectNum(){
      let num = 0;
      this.dialogAllocated.other.forEach(e => {
        if(e.checked){
          num++
        }
      })
      return num;
    },
     checkedOrder() {
      //选中的id 数组
      return this.tableDataCopy.filter((order) => {
        return order.checked;
      });
    },
    CAllChecked() {
      //是否全选
      let [num, skus] = [0, []];
      this.tableDataCopy.forEach((order) => {
        if (order.checked) {
          num++;
          if(order.items){
            order.items.forEach((itm) => {
            skus.push(itm.id);
          });
          }else{
            skus.push(order.itemId)
          }
        }
      });
      return {
        num,
        status: num && num == this.tableDataCopy.length,
        skus,
      };
    },
  },
  methods: {
    makeAnOffer() {
      //生成 make an offer
      if(!this.CAllChecked.num){
         this.$message({
          message: this.$t('Please select at least one order!'),
          type: 'error'
        });
        return false;
      }

      this.$Burying({
        object: '14001'
      })
      this.$confirm(this.$t("Create quotation request?"), "", {
        confirmButtonText: "OK",
        cancelButtonText: "Discard",
        type: "info",
      }).then(() => {
        this.loading = true;
        this.$apiCall(
          "api.OfferList.genOffer",
          { skus: this.CAllChecked.skus },
          (r) => {
            this.loading = false;
            if (r.ErrorCode == "9999") {
              this.$elementMessage("success", "success");
              this.$router.push({ name: "WaitingForVendorsRespond" });
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
      localStorage.setItem("c_waitingForAllocatedRowsPerPage", val);
      this.getItems();
    },
    gotoPage() {
      this.page = this.$route.query.page ? this.$route.query.page : 1;
      this.getItems();
    },
    listScroll(){
      this.scrollT = setTimeout(()=>{
        clearTimeout(this.scrollT)
        let scrollT = document.querySelector(".vxe-list--virtual-wrapper").scrollTop;
        let h = document.querySelector(".vxe-list--body").offsetHeight;
        let mT =  document.querySelector(".vxe-list--body").style.marginTop ?
        document.querySelector(".vxe-list--body").style.marginTop.match(/\d+/g)[0] : 0
        h = h + Number(mT);
        if((scrollT + this.tableHeight) + 100 > h){
          if(this.page <= this.totalPage){
          this.getItems(2)
          }
        }
      },200)
    },
    ballAnimation(){
      //重新获取数量
      this.$emit('getNum', (new Date()).valueOf());
      const getOffset = (element) => {
        let actualTop = element.offsetTop;
        let actualLeft = element.offsetLeft;
        let current = element.offsetParent;
        while (current !== null) {
          actualTop += current.offsetTop;
          actualLeft += current.offsetLeft;
          current = current.offsetParent;
        }
        return {left: actualLeft, top: actualTop};
      }
      let elOffset = getOffset(document.getElementById('tab-WaitingForSourcing'));
      this.ball.opacity = 1;
      this.ball.x = elOffset.left + 160;
      this.ball.y = elOffset.top + 20;
      setTimeout(()=>{
        this.ball.opacity = 0
      },500)
      setTimeout(()=>{
        this.ball.x = window.innerWidth / 2,
        this.ball.y = window.innerHeight / 2;
      },1000)
    },
    closeAllocated(){ //Allocated关闭后处理
      if(this.dialogAllocated.status == 2){
        this.ballAnimation()
      }
    },
    changeAllChecked(){
      this.dialogAllocated.other.forEach(e => {
        this.$set(e, 'checked', this.dialogAllocated.allChecked)
      })
    },
    changeAllCheckedT(bool) {
      this.AllChecked = bool;
      //全选全不选
      this.tableDataCopy.forEach((e) => {
        this.$set(e, "checked", this.AllChecked);
      });
    },
    AllocateNow(){
      this.dialogAllocated.loading = true;
      let skus = this.dialogAllocated.other.map(sku => {
          if(sku.checked){
            return sku.variableId
          }
        })
      let params = {
        relationshipId: this.dialogAllocated.vendor.id,
        skus,
        notProduct: 1,
      }
      this.$apiCall('api.DispatchOrderRule.dispatchProducts', params, r => {
        this.dialogAllocated.loading = false;
        if (r.ErrorCode == "9999") {
          this.dialogAllocated.isShow = false;
          this.$elementMessage('Allocated Success', "success");
          this.resetPage();
        }else{
          this.$elementMessage(r.Message, "error");
        }
      })
    },
    selectVendor(item){
      this.dialogAllocated.loading = true;
      let skus = this.dialogAllocated.skus.map(sku => {return sku.variableId})
      let params = {
        relationshipId: item.id,
        skus,
      }
      this.$apiCall('api.DispatchOrderRule.dispatchProducts', params, r => {
        this.dialogAllocated.loading = false;
        if (r.ErrorCode == "9999") {
          this.dialogAllocated.vendor = item;
          this.dialogAllocated.allChecked = true;
          this.dialogAllocated.other = r.Data.Results.map(e => {
            e.checked = true;
            return e})
          this.dialogAllocated.status = 2;
          this.resetPage();
        }else{
          this.$elementMessage(r.Message, "error");
        }
      })
    },
    getVendors(query){
      clearTimeout(this.gvTime)
      this.gvTime = setTimeout(()=>{
        if(query){
          this.dialogAllocated.page = query
        }
        if(!this.dialogAllocated.vendorLike)
          this.dialogAllocated.loading = true;
        this.$apiCall("api.Relationship.findByCustomer",{
          page: this.dialogAllocated.page,
          rowsPerPage: this.dialogAllocated.rowsPerPage,
          vendorLike: this.dialogAllocated.vendorLike,
        }, r => {
          if (r.ErrorCode == "9999") {
            this.dialogAllocated.loading = false;
            this.dialogAllocated.vendors = r.Data.Results;
            this.dialogAllocated.total = Number(r.Data.Pagination.totalCount);
          }else{
            this.$elementMessage(r.Message, "error");
          }
        })
      },200)
    },
    openAllocateToVendor(item){//打开分配弹层
      // this.dialogAllocated = JSON.parse(this.dialogAllocatedDefault);
      if(item._LEVEL === 0){
        // this.dialogAllocated.skus = item.items.slice()
        this.$refs.DistributionVendorDialog.openDistributionDialog(item.items.slice())
      }else{
        // this.dialogAllocated.skus = [item]
        this.$refs.DistributionVendorDialog.openDistributionDialog([item])
      }
      // this.getVendors();
      // this.dialogAllocated.isShow = true;
    },
    changeAllExpand(){
      this.isAllExpand = !this.isAllExpand;
      this.allTreeExpand();
    },
    allTreeExpand(){
      if (this.isAllExpand) {
        XEUtils.eachTree(this.tree6, item => {
          item._EXPAND = item._HAS_CHILDREN
          item._VISIBLE = true
        })
      } else {
        XEUtils.eachTree(this.tree6, item => {
          item._EXPAND = false
          item._VISIBLE = !item._LEVEL
        })
      }
      this.refreshTree()
    },
    resetPage(){
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
    dateChange() {
      if (this.filterDate.length > 1) {
        this.filterParams.dateFrom = moment(this.filterDate[0]).unix();
        this.filterParams.dateTo = moment(this.filterDate[1]).endOf("d").unix();
        //筛选
        this.resetPage();
     }
    },
    filterItems(type){
      switch(type){
        case 'name':
          this.filterParams.codeName = this.codeName;
          break;
        case 'date':
          this.filterDate = [];
          this.filterParams.dateFrom = "";
          this.filterParams.dateTo = "";
          break;
        default:
          break;
      }
      if(this.timeFilter != 6)
        this.resetPage();

    },
    clearFilter(type){
      switch(type){
        case 'name':
          this.filterParams.codeName = this.codeName = '';
          break;
        case 'store':
          this.filterParams.shopifyStore = [];
          this.popStoreFilter = false;
          ++this.cascaderKey;
          break;
        case 'date':
          this.filterParams.timeFilter = "";
					this.filterDate = [];
					this.filterParams.dateFrom = "";
          this.filterParams.dateTo = "";
          this.popDateFilter = false;
          break;
        case 'fulfill':
          this.filterParams.fulfillStatus = []
          this.popFulfillFilter = false;
          break;
        case 'sort':
          this.filterParams.sortBy = "";
          this.popSortFilter = false;
          break;
        default:
          this.filterParams = JSON.parse(this.filterParamsDefault);
          this.codeName = '';
          this.filterDate = [];
      }

      this.resetPage();
    },
    toggleTreeNode (row) {
      if (row._HAS_CHILDREN) {
        this.setTreeExpand(row, !row._EXPAND)
      }
    },
    setTreeExpand (row, isExpand) {
      const matchObj = XEUtils.findTree(this.tree6, item => item === row)
      row._EXPAND = isExpand
      if (matchObj) {
        XEUtils.eachTree(matchObj.item.children, (item, index, items, path, parent) => {
          item._VISIBLE = parent ? parent._EXPAND && parent._VISIBLE : isExpand
        })
      }
      this.refreshTree()
    },
    refreshTree () {
      const treeList = XEUtils.toTreeArray(this.tree6)
      this.fullList6 = treeList
      this.tableData = treeList.filter(item => item._VISIBLE)
      if(this.tableData.length){
        let [exandNum, closeNum] =  [0, 0];
        this.tableData.forEach(item => {
          if(item._LEVEL === 0){
            if(item._EXPAND){
              exandNum ++;
            }else{
              closeNum ++;
            }
          }
        })
        if(exandNum && !closeNum){
          this.isAllExpand = true;
        }
        if(closeNum && !exandNum){
          this.isAllExpand = false;
        }
      }
      // this.$emit("getTableHeight", this);
    },
    getItems(type) {
      let arr = [];
      if(this.filterParams.shopifyStore[1]){
      arr.push(this.filterParams.shopifyStore[1])  
      }
      if (!type) {
        this.loading = true;
        this.tableData = [];
        this.tableDataCopy = [];
      }else{
        if(this.bottomLoading ){
          return;
        }
        this.bottomLoading = true;
      }
      let params = {
        page: this.page,
        rowsPerPage: this.rowsPerPage,
        accountIds: arr,
        timeFilter: this.filterParams.timeFilter >= 6 ? "" : this.filterParams.timeFilter,
				dateFrom: this.filterParams.dateFrom,
        dateTo: this.filterParams.dateTo,
        fulfillmentStatus: this.filterParams.fulfillStatus,
        sort: this.filterParams.sortBy,
        keywords: this.filterParams.codeName,
        waitDispatch: 1,
      };
      this.$apiCall("api.Invoice.shopifyOrders", params, (r) => {
        
        if (r.ErrorCode == "9999") {
          this.totalPage = r.Data.Pagination.totalPage;
          this.totalCount = r.Data.Pagination.totalCount;
          r.Data.Results.forEach((e, i) => {
            this.$set(e, "shippingJson", JSON.parse(e.shippingJson));
            this.$set(e, "_id", e.id);
            this.$set(e, "_LEVEL", 0);
            this.$set(e, "_EXPAND", false);
            this.$set(e, "_VISIBLE", true);
            this.$set(e, "_HAS_CHILDREN", !!(e.items && e.items.length));
            this.$set(e, "_IS_LEAF", !e._HAS_CHILDREN);
            this.$set(e, "bg", i%2)
            e.children = [];
            e.items.forEach((child, index) => {
              child._LEVEL = 1;
              child._id =  e.id + '_' + child.id + '_' + index + e.codeName;
              this.$set(child, "bg", i%2)
              this.$set(child, "storeDefaultVendorId", e.storeDefaultVendorId)
              e.children.push(child);

            });
            this.tableData.push(e);
          });
          this.tree6 = this.tableData;
          this.tableDataCopy = this.tableData;
          this.$nextTick(()=>{
            if(this.isAllExpand)
              this.allTreeExpand()
          })

          this.loading = false;
          if(type){
            this.bottomLoading = false;
          }
        } else {
          this.loading = false;
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    getStore(){
      this.$apiCall("api.Invoice.findStores", { authStatus: 1 }, r => {
        if(r.ErrorCode == 9999) {
          this.storeList = [];
          r.Data.Results.forEach(e=>{
            this.storeList.push({
              shopifyAccountId: e.id,
              store: e.shopName,
            })
          });
          this.options.map((item) => {
            r.Data.Results.filter((a) => {
              if(a.platform == item.id){
                item.children.push({
                  label: a.shopName,
                  value: a.id,
                })
              }
            });
          });
        }else{
          this.$message({ message: r.Message, type: "error"});
        }
      })
    },
    onCopy(e) {
      this.$elementMessage(this.$t('Has been copied to the clipboard'), 'success');
    },
    onError(e) {
      this.$elementMessage(this.$t('Copy to clipboard failed, please copy manually'), 'error');
    },
  },
};
</script>

<style>
.vxe-list .vxe-list--virtual-wrapper{
  height: auto;
  overflow-x: hidden;
}
.el-popconfirm__main{
  margin-bottom: 5px;
}
@media screen and (max-width: 1380px) {
    .vxe-list .vxe-list--virtual-wrapper {

    }
}
</style>

<style lang="scss" scoped>
.ball{
  position: fixed;
  z-index: 1;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background-color: #F56C6C;
  transition: ease-in-out .5s;
}
.dialog-allocated{
  .vendors-wrap{
    padding: 0 20px;
  }
  .row1{
    display: flex;
    align-items: center;
    margin: 0 20px 15px;
    padding: 15px 5px;
    border-bottom: 1px #EBEEF5 dashed;
    .p-list{
      max-width:700px;
      .pro-item{
        display: flex;
        margin-bottom: 5px;
        padding: 5px 0;
        max-width: 600px;
        .pro-info{
          margin-right: 15px;
          max-width: 450px;
          font-size: 12px;
          > div{
            .title{
              color: #909399;
            }
          }
        }
        .total{
          margin-right: 15px;
          color: #5c6ac4;
        }
      }
    }
    .right{
      flex: 1;
      display: flex;
      align-items: center;
      > i{
        margin-right: 15px;
        color: #67C23A;
        font-size: 62px;
      }
      > span{
        display: flex;
        align-items: center;
        i{
          margin-right: 10px;
          color: #909399;
          font-size: 46px;
        }
        span{
          font-size: 24px;
        }
      }

    }
  }
  .row2{
    margin: 0 20px;
    padding: 0 5px;
    .title{
      margin-bottom: 10px;
      color: #606266;
      line-height: 32px;
      font-weight: bold;
      font-size: 14px;
    }
    .select-items{
      display: flex;
      .list{
        min-width: 700px;
        .other-table{
          .pro-info{
            display: flex;
            align-items: center;
            .right{
              .name{
                width: 520px;
              }
              .sku{
                .title{
                  margin-right: 5px;
                  color:#909399;
                  font-weight: normal;
                }
              }
            }
          }
        }
      }
      .action{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        padding-left: 15px;
        div{
          margin-bottom: 20px;
          .el-button{
            width: 110px;
          }
        }
      }
    }
  }
}
.my-tree-item.bg{
  background-color:#eff0f9;
}
.table-titel{
  .title-tx{
    color: #5c6ac4;
    font-weight: bold;
    font-size: 13px;
  }
}
.table-titel{
  border-bottom: 1px #EBEEF5 solid;
  .el-col{
    display: flex;
    align-items: center;
    height: 36px;
  }
}
.my-tree-item {
  .order-itm-row{
    display: flex;
    height: 36px;
    .el-col{
      display: flex;
      align-items: center;
    }
  }
  .el-tag {
    background-color: #ffea8a;
    color: #595130;
    display: inline-flex;
    align-items: center;
    padding: 0.3rem 0.8rem;
    border-radius: 2rem;
    font-size: 1.3rem;
    line-height: 1.5rem;
    font-weight: normal;
    .-EFlq {
      height: 1rem;
      width: 1rem;
      margin: 0 0.4rem 0 -0.3rem;
      border: 0.2rem solid currentColor;
      border-radius: 50%;
      flex-shrink: 0;
      background: transparent;
      color: #8a6116;
    }
  }
  .el-tag.el-tag--danger {
    background-color: #ffc58b;
    .-EFlq {
      color: #c05717;
      background: linear-gradient(
        0deg,
        currentColor,
        currentColor 50%,
        transparent 0,
        transparent
      );
    }
  }
}

.sku-itm-row{
  display: flex;
  align-items: center;
  height: 80px;
  .el-col{
    display: flex;
    align-items: center;
    height: 100%;
    border-bottom: 1px #E4E7ED solid;
  }
}
.d-block .el-radio,.d-block .el-checkbox{
	display: block;
	margin: 10px 0;
}
.el-message__content{
	line-height: 24px!important;
	word-break: keep-all;
}
.nodata{
  text-align: center;
  line-height: 128px;
  color: #909399;
  font-size: 12px;
}

</style>
