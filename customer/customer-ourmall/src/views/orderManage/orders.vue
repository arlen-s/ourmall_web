<template>
  <div class="contentpanel my-custom-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-s-order"></i>
          <h2>{{$t('Order Management')}}</h2>
        </div>
      </div>
      <div class="right">
        <el-button
          type="primary"
          v-if="status == 1 || status == 2"
          @click="updateFn"
          :disabled="isDisabled"
        >
        {{$t('Update order')}}  </el-button
        >
        <el-button type="primary" v-if="status == 1" @click="ImportFn"
          >{{$t('Import order')}}</el-button
        >
        <!-- <el-button type="primary" v-if="status == 2" @click="batchWareHouse"
          >Bulk associated warehouse</el-button
        >         -->
        <!--  v-if="status == 1 || (status == 2 && activeName == 1)" -->
        <el-button
          v-if="!(status == 2 && (activeName == 2 || activeName == 3))"
          type="primary"
          @click="exportOrder"
        >
        {{$t('Export order')}}</el-button
        >
      </div>
    </div>
    <div class="pagebody" v-loading="loading">
      <el-row :gutter="15" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <div ref="pageFilter" class="page-filter">
                    <el-form :inline="true" size="mini">
                      <template
                        v-if="
                          status == 2 && (activeName == 2 || activeName == 3)
                        "
                      >
                        <el-form-item>
                          <el-input
                            placeholder="Payment Number"
                            v-model="filterParams.sysCode"
                            clearable
                            @keyup.enter.native="filterItem"
                            @clear="clearFilter('sysCode')"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="Payment time">
                          <el-date-picker
                            value-format="yyyy-MM-dd"
                            key="date2"
                            v-model="filterParams.date2"
                            @clear="clearFilter('date2')"
                            @change="dateChange2"
                            type="daterange"
                            align="right"
                            unlink-panels
                            start-placeholder="Start"
                            end-placeholder="End"
                          >
                          </el-date-picker>
                        </el-form-item>
                      </template>
                      <template v-else>
                        <el-form-item>
                          <el-input
                            :placeholder="$t('Your No.')"
                            v-model="filterParams.codeName"
                            clearable
                            @keyup.enter.native="filterItem"
                            @clear="clearFilter('codeName')"
                          ></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-input
                            :placeholder="$t('Order Number')"
                            v-model="filterParams.orderId"
                            clearable
                            @keyup.enter.native="filterItem"
                            @clear="clearFilter('orderId')"
                          ></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-input
                            :placeholder="$t('Customer')"
                            v-model="filterParams.receiverName"
                            clearable
                            @keyup.enter.native="filterItem"
                            @clear="clearFilter('receiverName')"
                          ></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('Shop name') ">
                          <el-select
                            filterable
                            remote
                            placeholder="all"
                            clearable
                            v-model="filterParams.accountIds"
                            @change="filterItem"
                            @clear="clearFilter('accountIds')"
                          >
                            <el-option
                              v-for="opt in storeList"
                              :key="opt.id"
                              :label="opt.shopName"
                              :value="opt.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <template v-if="status == 6">
                          <el-form-item>
                            <el-input
                              :placeholder="$t('Payment Number')"
                              v-model="filterParams.sysCode"
                              clearable
                              @keyup.enter.native="filterItem"
                              @clear="clearFilter('sysCode')"
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="Created Time">
                            <el-date-picker
                              value-format="yyyy-MM-dd"
                              key="date2"
                              v-model="filterParams.date2"
                              @clear="clearFilter('date2')"
                              @change="dateChange2"
                              type="daterange"
                              align="right"
                              unlink-panels
                              start-placeholder="Start"
                              end-placeholder="End"
                            >
                            </el-date-picker>
                          </el-form-item>
                        </template>
                        <!-- <el-form-item label="Created Time">
													<el-date-picker value-format="yyyy-MM-dd" key="date1"
														v-model="filterParams.date" @clear="clearFilter('date')"
														@change="dateChange" type="daterange" align="right"
														unlink-panels start-placeholder="Start" end-placeholder="End">
													</el-date-picker>
												</el-form-item> -->
                        <!-- <el-form-item v-if="status == 6" label="Payment time">
													<el-date-picker value-format="yyyy-MM-dd" type="daterange"
														align="right" unlink-panels start-placeholder="Start"
														end-placeholder="End">
													</el-date-picker>
												</el-form-item> -->
                      </template>
                      <el-form-item>
                        <el-button type="primary" @click="filterItem"
                          >{{$t('Filter')}}</el-button
                        >
                        <el-button type="danger" @click="clearFilter"
                          >{{$t('Clear')}}</el-button
                        >
                      </el-form-item>
                      <el-form-item style="width:200px;"></el-form-item>
                      <el-form-item class="btns-wrap">
                        <template v-if="status == 1 && activeName == 1">
                          <el-button type="primary" @click="quoteFn"
                            >{{$t('Create a quote')}}
                          </el-button>
                          <el-button type="primary" @click="quoteCancelFn"
                            >{{$t('Quit quotation')}}
                          </el-button>
                        </template>
                        <template v-if="status == 2 && activeName == 1">
                          <el-button type="primary" @click="payFn"
                            >{{$t('Bulk payment')}}</el-button
                          >
                          <el-button type="primary" @click="payCancelFn"
                            >{{$t('Cancel payment')}}
                          </el-button>
                        </template>
                        <template v-if="status == 4 && activeName == 1">
                          <el-button type="primary" @click="syncFn"
                            >{{$t('Manually synced')}}
                          </el-button>
                        </template>
                        <template
                          v-if="
                            status == 4 && (activeName == 2 || activeName == 3)
                          "
                        >
                          <el-button type="primary" @click="BatchContinuePay(1)"
                            >{{$t('Continue Pay')}}
                          </el-button>
                        </template>
                        <template v-if="status == 4 && activeName == 3">
                          <el-button type="primary" @click="BatchContinuePay(2)"
                            >{{$t('Re quote')}}
                          </el-button>
                        </template>
                      </el-form-item>
                    </el-form>
                  </div>
                  <el-tab-pane
                    v-for="(item, index) in tabList"
                    :key="index"
                    :name="item.name + ''"
                  >
                    <span slot="label">
                      {{ item.title }}
                      <span class="tx-danger"
                        >({{ customerAllOrderCntText(item.id) }})</span
                      >
                    </span>
                  </el-tab-pane>
                </el-tabs>
              </el-col>
            </el-row>
            <!-- table -->
            <template
              v-if="
                (status == 1 || status == 2 || status == 4) && activeName == 1
              "
            >
              <el-table
                key="gridTable"
                stripe
                style="width: 100%"
                ref="gridTable"
                :data="items"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange"
                :row-key="(row) => row.id"
              >
                <el-table-column
                  type="selection"
                  width="55"
                  :reserve-selection="true"
                >
                </el-table-column>
                   <el-table-column type="expand" width="25" :reserve-selection="true">
                     <template #header>
                      <el-button type="text" size="mini" v-if="isExpansion" @click="toggleRowExpansion">  <i class="el-icon-minus"></i></el-button>
                       <el-button type="text" size="mini" v-if="!isExpansion" @click="toggleRowExpansion">  <i class="el-icon-plus"></i> </el-button>
                      </template>
                    <template slot-scope="props">
                        <el-table
                        ref="multipleTable"
                        :data="props.row.items"
                        style="width: 100%; margin-left: 0"
                        max-height="360"
                        :row-style="rowStyle"
                        :header-cell-style="rowStyle"
                        :cell-style="rowStyle"
                       :cell-class-name="cellClassName"
                      >
                        <el-table-column prop="" :label="$t('Product Images')" 
                          width='200'
                          align="center">
                          <template slot-scope="child">
                              <!-- <img :src="child.row.imgUrl" width="80" height="80" /> -->
                               <el-image
                                style="width: 80px; height: 80px"
                                :src="child.row.imgUrl"
                                fit="cover"></el-image>
                          </template>                       
                        </el-table-column>
                        <el-table-column prop="vendorProductName" label="SKU number/quantity/name" 
                          width='200'
                          align="left">  
                             <template slot-scope="child">
                                  <!-- <span>{{child.row.name}}</span> -->
                          <el-link
                            type="primary"
                            v-if="child.row.isManage != 2 && !child.row.vendorPrice"
                           
                            @click="unable(child.row)"
                          >{{$t('Unable to be sourced')}}</el-link>                                  
                            <p class="">
                                <template v-if="child.row.isManage == 2">
                                  <span style="display: inline-block;color: #F56C6C;">
                                    {{child.row.vendorSku + 'Unable to purchase'}}
                                    <span> <b class="text-danger" style="font-size:16px">×</b><el-badge class="mark" :value="child.row.quantity" /></span>
                                  </span>
                                </template>
                                <template v-else>
                                  <template v-if="child.row.status != 1">
                                    <span
                                      style="display: inline-block;color: #F56C6C;"
                                    >
                                      {{child.row.vendorSku ? `${child.row.vendorSku} Products Off shelf` : $t('null     Please make an offer')}}
                                     <span> <b class="text-danger" style="font-size:16px">×</b><el-badge class="mark" :value="child.row.quantity" /></span>
                                    </span>
                                  </template>
                                  <template v-else>
                                    <span style="display: inline-block;">
                                      {{child.row.vendorSku || $t('null     Please make an offer')}}
                                       <span> <b class="text-danger" style="font-size:16px">×</b><el-badge class="mark" :value="child.row.quantity" /></span>
                                    </span>
                                  </template>
                                </template>
                              </p>
                               <span>{{child.row.name}}</span>
                              </template>                   
                        </el-table-column>  
                        <el-table-column
                          prop=""
                          :label="$t('Attribute Value')"
                          width='180'
                          align="left"
                        >
                          <template slot-scope="child">
                            <span>{{child.row.propertyValue}}</span>                           
                          </template>
                        </el-table-column>                        
                        <el-table-column prop="vendorSku" label="Supplier Prices" 
                          width='200'
                          align="left">  
                          <template slot-scope="child">
                                <span style="display: inline-block;">
                                  <span v-if="child.row.vendorSku">
                                    <template
                                      v-if="(props.row.discountType == 1 || props.row.discountType == 2) && child.row.isManage != 2"
                                    >
                                      <span>{{$store.state.country.symbol}} {{Number((child.row.amount - child.row.amount / props.row.productAmount * props.row.couponAmount) / child.row.quantity).toFixed(2)}}&nbsp;</span>
                                      <span style="color: red; text-decoration:line-through;">
                                        <span
                                          style="color: #606266;"
                                        >{{$store.state.country.symbol}} {{Number(child.row.vendorPrice).toFixed(2)}}</span>
                                      </span>
                                    </template>
                                    <template v-else>{{$store.state.country.symbol}} {{Number(child.row.vendorPrice).toFixed(2)}}</template>
                                  </span>
                                  <span style="color: #F56C6C;" v-else>{{$t('Please make an offer')}}</span>
                                </span>
                          </template>                    
                        </el-table-column>                                         

                        <el-table-column
                          prop="phone"
                          label="Customer selling price"
                          width='200'
                          align="left"
                        >
                        <template slot-scope="child">
                          <span>{{props.row.currency}} {{Number(child.row.price).toFixed(2)}}</span>
                                  
                        </template>
                        </el-table-column>
                        <el-table-column label=""></el-table-column>
                    <!-- <span>{{ scope.row.codeName }}</span> -->
                        </el-table>
                  </template>
                </el-table-column>                  
                <el-table-column label="order type" v-if="status == 3">
                    <template slot-scope="scope">
                        <p>{{scope.row.shippingType== 1? $t('Wholesale order') : $t('offline order')}}</p>
                    </template>
                </el-table-column>                
                <el-table-column :label="$t('Your shop order num')" width="100">
                  <template slot-scope="scope">
                    <!-- <el-popover
                      width="1000"
                      trigger="hover"
                      placement="top-start"
                      :ref="'popover' + scope.row.codeName"
                    >
                      <div class="items">
                        <div
                          v-for="(item, i) in scope.row.items"
                          :key="scope.row.orderId + scope.row.codeName + i"
                          class="d-flex mg-b-15"
                        >
                          <el-checkbox v-model="item.check"></el-checkbox>
                          <img
                            :src="item.imgUrl"
                            width="80"
                            height="80"
                            class="mg-l-10"
                          />
                          <div class="mg-l-10">
                            <p style="width: 800px;" class="mg-b-10">
                              <span v-if="!item.vendorProductId">{{
                                item.name
                              }}</span>
                              <el-link
                                v-else
                                type="primary"
                                :href=" (vendorId != 148982 && vendorId != 146428&& vendorId != 144875&& vendorId != 144843&& vendorId != 143779&& vendorId != 143654&&vendorId != 74) ? 
                                  `/item/${item.vendorProductId}/${item.vendorProductName}.html` :  `/itemOld/${item.vendorProductId}/${item.vendorProductName}.html`
                                "
                                target="_blank"
                              >
                                {{ item.vendorProductName }}
                              </el-link>
                            </p>
                            <p class="mg-b-10">
                              <template v-if="item.isManage == 2">
                                <span
                                  style="width: 450px;display: inline-block;color: #F56C6C;"
                                  >SKU:
                                  {{
                                    item.vendorSku + "Unable to purchase"
                                  }}</span
                                >
                              </template>
                              <template v-else>
                                <template v-if="item.status != 1">
                                  <span
                                    style="width: 450px;display: inline-block;color: #F56C6C;"
                                    >SKU:
                                    {{
                                      item.vendorSku
                                        ? `${item.vendorSku} Products Off shelf`
                                        : "null     Please make an offer"
                                    }}</span
                                  >
                                </template>
                                <template v-else>
                                  <span
                                    style="width: 450px;display: inline-block;"
                                    >SKU:
                                    {{
                                      item.vendorSku ||
                                        "null     Please make an offer"
                                    }}</span
                                  >
                                </template>
                              </template>
                              <span style="width: 200px;display: inline-block;">
                               {{$t('Weight')}}：{{
                                  item.vendorProductWeight || "---"
                                }}
                                g
                              </span>
                            </p>
                            <p>
                              <span style="width: 200px;display: inline-block;">
                               {{$t('Shop price')}}：{{ scope.row.currency }}
                                {{ Number(item.price).toFixed(2) }}</span
                              >
                              <span style="width: 250px;display: inline-block;">
                               {{$t('Supply unit price')}}：
                                <span v-if="item.vendorSku">
                                  <template
                                    v-if="
                                      (scope.row.discountType == 1 ||
                                        scope.row.discountType == 2) &&
                                        item.isManage != 2
                                    "
                                  >
                                    <span
                                      >{{$store.state.country.symbol}}
                                      {{
                                        Number(
                                          (item.amount -
                                            (item.amount /
                                              scope.row.productAmount) *
                                              scope.row.couponAmount) /
                                            item.quantity
                                        ).toFixed(2)
                                      }}&nbsp;</span
                                    >
                                    <span
                                      style="color: red; text-decoration:line-through;"
                                    >
                                      <span style="color: #606266;"
                                        >{{$store.state.country.symbol}}
                                        {{
                                          Number(item.vendorPrice).toFixed(2)
                                        }}</span
                                      >
                                    </span>
                                  </template>
                                  <template v-else
                                    >{{$store.state.country.symbol}}
                                    {{
                                      Number(item.vendorPrice).toFixed(2)
                                    }}</template
                                  >
                                </span>
                                <span style="color: #F56C6C;" v-else
                                  >{{$t('Please make an offer')}}</span
                                >
                              </span>
                              <span
                                style="width: 50px;display: inline-block;text-align: left;"
                                >* {{ item.quantity }}</span
                              >
                              <span
                                style="width: 100px;display: inline-block;text-align: right;"
                              >
                                <template
                                  v-if="
                                    (scope.row.discountType == 1 ||
                                      scope.row.discountType == 2) &&
                                      item.isManage != 2
                                  "
                                >
                                  <span
                                    >{{$store.state.country.symbol}}
                                    {{
                                      Number(
                                        item.amount -
                                          (item.amount /
                                            scope.row.productAmount) *
                                            scope.row.couponAmount
                                      ).toFixed(2)
                                    }}&nbsp;</span
                                  >
                                  <span
                                    style="color: red; text-decoration:line-through;"
                                  >
                                    <span style="color: #606266;"
                                      >{{$store.state.country.symbol}}
                                      {{ Number(item.amount).toFixed(2) }}</span
                                    >
                                  </span>
                                </template>
                                <template v-else
                                  >{{$store.state.country.symbol}}
                                  {{
                                    Number(
                                      item.quantity * item.vendorPrice
                                    ).toFixed(2)
                                  }}</template
                                >
                              </span>
                              <span
                                v-if="item.isManage == 2"
                                style="width: 200px;display: inline-block;text-align: right;color: red;"
                              >
                                Removed</span
                              >
                            </p>
                          </div>
                          <div
                            class="d-flex"
                            style="flex: 1;justify-content: flex-end;margin-right:5px"
                            v-if="item.isManage != 2"
                          >
                            <el-link
                              type="primary"
                              @click="deleteOrder(item, scope.row)"
                              >Delete</el-link
                            >
                          </div>
                        </div>
                      </div>
                      <div slot="reference" class="name-wrapper">
                        <span>{{ scope.row.codeName }}</span>
                      </div>
                    </el-popover> -->
                    <span>{{ scope.row.codeName }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('Order Number')" width="200">
                  <template slot-scope="scope">
                    <!-- <el-popover
                      width="1000"
                      trigger="hover"
                      placement="top-start"
                      :ref="'popover' + scope.row.orderId"
                    >
                      <div class="items">
                        <div
                          v-for="(item, i) in scope.row.items"
                          :key="scope.row.orderId + scope.row.codeName + i"
                          class="d-flex mg-b-15"
                        >
                          <el-checkbox v-model="item.check"></el-checkbox>
                          <img
                            :src="item.imgUrl"
                            width="80"
                            height="80"
                            class="mg-l-10"
                          />
                          <div class="mg-l-10">
                            <p style="width: 600px;" class="mg-b-10">
                              <span v-if="!item.vendorProductId">{{
                                item.name
                              }}</span>
                              <el-link
                                v-else
                                type="primary"
                                :href=" (vendorId != 148982 && vendorId != 146428&& vendorId != 144875&& vendorId != 144843&& vendorId != 143779&& vendorId != 143654&&  vendorId != 74) ? 
                                  `/item/${item.vendorProductId}/${item.vendorProductName}.html` :  `/itemOld/${item.vendorProductId}/${item.vendorProductName}.html`
                                "
                                target="_blank"
                              >
                                {{ item.vendorProductName }}
                              </el-link>
                            </p>
                            <p class="mg-b-10">
                              <template v-if="item.isManage == 2">
                                <span
                                  style="width: 450px;display: inline-block;color: #F56C6C;"
                                  >SKU:
                                  {{
                                    item.vendorSku + "Unable to purchase"
                                  }}</span
                                >
                              </template>
                              <template v-else>
                                <template v-if="item.status != 1">
                                  <span
                                    style="width: 450px;display: inline-block;color: #F56C6C;"
                                    >SKU:
                                    {{
                                      item.vendorSku
                                        ? `${item.vendorSku} Products Off shelf`
                                        : "null     Please make an offer"
                                    }}</span
                                  >
                                </template>
                                <template v-else>
                                  <span
                                    style="width: 450px;display: inline-block;"
                                    >SKU:
                                    {{
                                      item.vendorSku ||
                                        "null     Please make an offer"
                                    }}</span
                                  >
                                </template>
                              </template>
                              <span style="width: 200px;display: inline-block;">
                               {{$t('Weight')}}：{{
                                  item.vendorProductWeight || "---"
                                }}
                                g
                              </span>
                            </p>
                            <p>
                              <span style="width: 200px;display: inline-block;">
                               {{$t('Shop price')}}：{{ scope.row.currency }}
                                {{ Number(item.price).toFixed(2) }}</span
                              >
                              <span style="width: 250px;display: inline-block;">
                                {{$t('Supply unit price')}}：
                                <span v-if="item.vendorSku">
                                  <template
                                    v-if="
                                      (scope.row.discountType == 1 ||
                                        scope.row.discountType == 2) &&
                                        item.isManage != 2
                                    "
                                  >
                                    <span
                                      >{{$store.state.country.symbol}}
                                      {{
                                        Number(
                                          (item.amount -
                                            (item.amount /
                                              scope.row.productAmount) *
                                              scope.row.couponAmount) /
                                            item.quantity
                                        ).toFixed(2)
                                      }}&nbsp;</span
                                    >
                                    <span
                                      style="color: red; text-decoration:line-through;"
                                    >
                                      <span style="color: #606266;"
                                        >{{$store.state.country.symbol}}
                                        {{
                                          Number(item.vendorPrice).toFixed(2)
                                        }}</span
                                      >
                                    </span>
                                  </template>
                                  <template v-else
                                    >{{$store.state.country.symbol}}
                                    {{
                                      Number(item.vendorPrice).toFixed(2)
                                    }}</template
                                  >
                                </span>
                                <span style="color: #F56C6C;" v-else
                                  >{{$t('Please make an offer')}}</span
                                >
                              </span>
                              <span
                                style="width: 50px;display: inline-block;text-align: left;"
                                >* {{ item.quantity }}</span
                              >
                              <span
                                style="width: 100px;display: inline-block;text-align: right;"
                              >
                                <template
                                  v-if="
                                    (scope.row.discountType == 1 ||
                                      scope.row.discountType == 2) &&
                                      item.isManage != 2
                                  "
                                >
                                  <span
                                    >{{$store.state.country.symbol}}
                                    {{
                                      Number(
                                        item.amount -
                                          (item.amount /
                                            scope.row.productAmount) *
                                            scope.row.couponAmount
                                      ).toFixed(2)
                                    }}&nbsp;</span
                                  >
                                  <span
                                    style="color: red; text-decoration:line-through;"
                                  >
                                    <span style="color: #606266;"
                                      >{{$store.state.country.symbol}}
                                      {{ Number(item.amount).toFixed(2) }}</span
                                    >
                                  </span>
                                </template>
                                <template v-else
                                  >{{$store.state.country.symbol}}
                                  {{
                                    Number(
                                      item.quantity * item.vendorPrice
                                    ).toFixed(2)
                                  }}</template
                                >
                              </span>
                              <span
                                v-if="item.isManage == 2"
                                style="width: 200px;display: inline-block;text-align: right;color: red;"
                              >
                                {{$t('Removed')}}</span
                              >
                            </p>
                          </div>
                          <div
                            class="d-flex"
                            style="flex: 1;justify-content: flex-end;margin-right:5px"
                            v-if="item.isManage != 2"
                          >
                            <el-link
                              type="primary"
                              @click="deleteOrder(item, scope.row)"
                              >{{$t('Delete')}}</el-link
                            >
                          </div>
                        </div>
                      </div>
                      <div slot="reference" class="name-wrapper">
                        <span>{{ scope.row.orderId || "---" }}</span>
                        <img
                          v-if="status != 1 && scope.row.isSplit == 1"
                          style="margin-left: 10px;"
                          src="../../../public/images/split2.png"
                        />
                      </div>
                    </el-popover> -->
                        <span>{{ scope.row.orderId || "---" }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="Shop" width="200">
                  <template slot-scope="scope">
                    <span>{{ scope.row.store || "---" }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('Created Time')" width="200">
                  <template slot-scope="scope">
                    <span>{{
                      moment(scope.row.timeCreated).format(
                        "YYYY-MM-DD HH:mm:ss"
                      ) || "---"
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('Shipping address')" min-width="250">
                  <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" placement="right">
                      <div slot="content">
                        {{
                          scope.row.shippingJsonInfo &&
                          scope.row.shippingJsonInfo.zip
                            ? scope.row.shippingJsonInfo.zip
                            : "---"
                        }}
                        {{
                          scope.row.shippingJsonInfo &&
                          scope.row.shippingJsonInfo.address1
                            ? scope.row.shippingJsonInfo.address1
                            : "---"
                        }}
                        {{
                          scope.row.shippingJsonInfo &&
                          scope.row.shippingJsonInfo.city
                            ? scope.row.shippingJsonInfo.city
                            : "---"
                        }}
                        {{
                          scope.row.shippingJsonInfo &&
                          scope.row.shippingJsonInfo.province
                            ? scope.row.shippingJsonInfo.province
                            : "---"
                        }}
                        {{
                          scope.row.shippingJsonInfo &&
                          scope.row.shippingJsonInfo.country
                            ? scope.row.shippingJsonInfo.country
                            : "---"
                        }}
                      </div>
                      <span>{{ scope.row.receiverAddress || "---" }}</span>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('warehouse')" width="150" v-if="vendorId != 148982 && vendorId != 146428&& vendorId != 144875&& vendorId != 144843&& vendorId != 143779&& vendorId != 143654&& vendorId != 74">
                  <template slot-scope="scope">
                    <span>{{ scope.row.warehouseName || "---" }}</span>
                  </template>
                </el-table-column>    
                <el-table-column :label="$t('address')" width="150" v-if="vendorId != 148982 && vendorId != 146428&& vendorId != 144875&& vendorId != 144843&& vendorId != 143779&& vendorId != 143654&& vendorId != 74">
                  <template slot-scope="scope">                
                    <el-tooltip class="item" effect="dark" :content="scope.row.warehouseAddress" placement="top-start">
                       <i class="el-icon-chat-dot-square"></i>
                     </el-tooltip>
                  </template>
                </el-table-column>                                
                <el-table-column :label="$t('Customer')" width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.receiverName || "---" }}</span>
                  </template>
                </el-table-column>
                <template v-if="status == 1">
                  <el-table-column :label="$t('Products')" width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.unBindQuantity || "---" }}</span>
                    </template>
                  </el-table-column>
                </template>
                <template v-if="status == 2 || status == 4">
                  <el-table-column :label="$t('Shipping Method')" width="150">
                    <template slot-scope="scope">
                      <div v-if="scope.row.isMailFree">
                          Kostenloser Versand
                      </div>
                      <div v-else>
                      <template
                        v-if="
                          scope.row.shippingMethodArr &&
                            scope.row.shippingMethodArr.length
                        "
                      >
                        <el-select
                          v-model="scope.row.shippingMethodId"
                          @change="filterShippingMethod($event, scope.row)"
                          size="small"
                        >
                          <el-option
                            v-for="shippingMethod in scope.row
                              .shippingMethodArr"
                            :key="shippingMethod.id"
                            :label="
                              `${
                                shippingMethod.nameDisplay
                                  ? shippingMethod.nameDisplay
                                  : shippingMethod.name
                              } [${
                                shippingMethod.agingDaysBegin
                                  ? shippingMethod.agingDaysBegin
                                  : 0
                              }-${
                                shippingMethod.agingDaysEnd
                                  ? shippingMethod.agingDaysEnd
                                  : 0
                              }days]`
                            "
                            :value="shippingMethod.id"
                          ></el-option>
                        </el-select>
                      </template>
                      <div class="tx-middle" v-else>
                        <div>
                             ---
                        <i
                          @click="shippedFn(scope.row)"
                          class="el-icon-warning"
                          style="font-size: 20px;cursor:pointer;"
                        ></i>
                        </div>
                       
                      </div>
                      </div>

                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="`${$t('Shipping cost')}(${$store.state.country.symbol})`"
                    width="150"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row.discountType == 3">
                        <span>0&nbsp;</span>
                        <span style="color: red; text-decoration:line-through;">
                          <span style="color: #606266;">{{
                            scope.row.shippingMethodItem
                              ? $exchangeRate(scope.row.shippingMethodItem.fee)
                              : "---"
                          }}</span>
                        </span>
                      </span>
                      <span v-else>{{
                        scope.row.shippingMethodItem
                          ? $exchangeRate(scope.row.shippingMethodItem.fee)
                          : "---"
                      }}</span>
                    </template>
                  </el-table-column>
                </template>
                <template v-if="status == 2">
                  <el-table-column
                    :label="`${$t('Total')}(${$store.state.country.symbol})`"
                    width="150"
                  >
                    <template slot-scope="scope">
                      <span>{{
                        scope.row.totalAllAmount
                          ? $exchangeRate(scope.row.totalAllAmount)
                          : "---"
                      }}</span>
                    </template>
                  </el-table-column>
                </template>
                <template v-if="status == 4">
                  <el-table-column
                    :label="`${$t('pay total')}(${$store.state.country.symbol})`"
                    width="100"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row.discountType">
                        <span
                          >{{
                            scope.row.payAmount
                              ? $exchangeRate(scope.row.payAmount)
                              : "---"
                          }}&nbsp;</span
                        >
                        <span style="color: red; text-decoration:line-through;">
                          <span style="color: #606266;">{{
                            scope.row.realAmount
                              ? $exchangeRate(scope.row.realAmount)
                              : "---"
                          }}</span>
                        </span>
                      </span>
                      <span v-else>{{
                        scope.row.realAmount
                          ? $exchangeRate(scope.row.realAmount)
                          : "---"
                      }}</span>
                    </template>
                  </el-table-column>
                </template>
                <el-table-column label="Action" width="120" fixed="right">
                  <template slot-scope="scope">
                    <div>
                      <el-link
                        v-if="status == 1"
                        class="mg-r-20"
                        type="primary"
                        @click="quoteFn('row', scope.row)"
                      >
                        Quote
                      </el-link>
                      <el-link
                        v-if="
                          (status == 2 &&
                          scope.row.shippingMethodArr &&
                            scope.row.shippingMethodArr.length) ||  (status == 2&&scope.row.isMailFree == 1)
                            
                        "
                        class="mg-r-20"
                        type="primary"
                        @click="payFn('row', scope.row)"
                      >
                        {{$t('Pay')}}
                      </el-link>
                      <el-link
                        v-if="status == 4"
                        class="mg-r-20"
                        type="primary"
                        @click="syncFn('row', scope.row)"
                      >
                        {{$t('Manually synced')}}
                      </el-link>
                    </div>
                  </template>
                </el-table-column>
                <template v-if="status != 1">
                  <el-table-column label="Remark" width="100">
                    <template slot-scope="scope">
                      <div>
                        <div>{{ scope.row.remark || "---" }}</div>
                      </div>
                    </template>
                  </el-table-column>
                </template>
              </el-table>
            </template>
            <template v-else-if="status == 2">
              <el-table
                key="gridTable2"
                stripe
                style="width: 100%"
                ref="gridTable"
                :data="items"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange"
                :row-key="(row) => row.id"
              >
                <el-table-column
                  type="selection"
                  width="55"
                  :reserve-selection="true"
                >
                </el-table-column>
                  <el-table-column type="expand" width="25" :reserve-selection="true">
                     <template #header>
                      <el-button type="text" size="mini" v-if="isExpansion" @click="toggleRowExpansion">  <i class="el-icon-minus"></i></el-button>
                       <el-button type="text" size="mini" v-if="!isExpansion" @click="toggleRowExpansion">  <i class="el-icon-plus"></i> </el-button>
                      </template>
                    <template slot-scope="props">
                        <el-table
                        ref="multipleTable"
                        :data="props.row.items"
                        style="width: 100%; margin-left: 0"
                        max-height="360"
                        :row-style="rowStyle"
                        :header-cell-style="rowStyle"
                        :cell-style="rowStyle"
                       :cell-class-name="cellClassName"
                      >
                        <el-table-column prop="" label="Product Images" 
                          width='200'
                          align="center">
                          <template slot-scope="child">
                              <!-- <img :src="child.row.imgUrl" width="80" height="80" /> -->
                               <el-image
                                style="width: 80px; height: 80px"
                                :src="child.row.imgUrl"
                                fit="cover"></el-image>
                          </template>                       
                        </el-table-column>
                        <el-table-column prop="vendorProductName" label="SKU number/quantity/name" 
                          width='200'
                          align="left">  
                             <template slot-scope="child">
                                  <!-- <span>{{child.row.name}}</span> -->
                          <el-link
                            type="primary"
                            v-if="child.row.isManage != 2 && !child.row.vendorPrice"
                           
                            @click="unable(child.row)"
                          >{{$t('Unable to be sourced')}}</el-link>                                  
                            <p class="">
                                <template v-if="child.row.isManage == 2">
                                  <span style="display: inline-block;color: #F56C6C;">
                                    {{child.row.vendorSku + 'Unable to purchase'}}
                                    <span> <b class="text-danger" style="font-size:16px">×</b><el-badge class="mark" :value="child.row.quantity" /></span>
                                  </span>
                                </template>
                                <template v-else>
                                  <template v-if="child.row.status != 1">
                                    <span
                                      style="display: inline-block;color: #F56C6C;"
                                    >
                                      {{child.row.vendorSku ? `${child.row.vendorSku} Products Off shelf` : $t('null Please make an offer') }}
                                     <span> <b class="text-danger" style="font-size:16px">×</b><el-badge class="mark" :value="child.row.quantity" /></span>
                                    </span>
                                  </template>
                                  <template v-else>
                                    <span style="display: inline-block;">
                                      {{child.row.vendorSku || 'null Please make an offer'}}
                                       <span> <b class="text-danger" style="font-size:16px">×</b><el-badge class="mark" :value="child.row.quantity" /></span>
                                    </span>
                                  </template>
                                </template>
                              </p>
                               <span>{{child.row.name}}</span>
                              </template>                   
                        </el-table-column>  
                        <el-table-column
                          prop=""
                          label="Attribute Value"
                          width='180'
                          align="left"
                        >
                          <template slot-scope="child">
                            <span>{{child.row.propertyValue}}</span>                           
                          </template>
                        </el-table-column>                        
                        <el-table-column prop="vendorSku" label="Supplier Prices" 
                          width='200'
                          align="left">  
                          <template slot-scope="child">
                                <span style="display: inline-block;">
                                  <span v-if="child.row.vendorSku">
                                    <template
                                      v-if="(props.row.discountType == 1 || props.row.discountType == 2) && child.row.isManage != 2"
                                    >
                                      <span>{{$store.state.country.symbol}} {{Number((child.row.amount - child.row.amount / props.row.productAmount * props.row.couponAmount) / child.row.quantity).toFixed(2)}}&nbsp;</span>
                                      <span style="color: red; text-decoration:line-through;">
                                        <span
                                          style="color: #606266;"
                                        >{{$store.state.country.symbol}} {{Number(child.row.vendorPrice).toFixed(2)}}</span>
                                      </span>
                                    </template>
                                    <template v-else>{{$store.state.country.symbol}} {{Number(child.row.vendorPrice).toFixed(2)}}</template>
                                  </span>
                                  <span style="color: #F56C6C;" v-else>{{$t('Please make an offer')}}</span>
                                </span>
                          </template>                    
                        </el-table-column>                                         

                        <el-table-column
                          prop="phone"
                          label="Customer selling price"
                          width='200'
                          align="left"
                        >
                        <template slot-scope="child">
                          <span>{{props.row.currency}} {{Number(child.row.price).toFixed(2)}}</span>
                                  
                        </template>
                        </el-table-column>
                        <el-table-column label=""></el-table-column>
                    <!-- <span>{{ scope.row.codeName }}</span> -->
                        </el-table>
                  </template>
                </el-table-column>                
                <!-- <el-table-column label="Order" width="150">
									<template slot-scope="scope">
										<span>{{scope.row.code}}</span>
									</template>
								</el-table-column> -->

                <el-table-column :label="$t('Payment number')" width="200">
                  <template slot-scope="scope">
                    <span>{{
                      scope.row.accountPayment &&
                      scope.row.accountPayment.sysCode
                        ? scope.row.accountPayment.sysCode
                        : "---"
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('Payment time')" width="300">
                  <template slot-scope="scope">
                    <span>{{
                      moment
                        .unix(scope.row.timeCreated)
                        .format("YYYY-MM-DD HH:mm:ss") || "---"
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="`${$t('Payment amount')}(${$store.state.country.symbol})`"
                  width="200"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.discountType">
                      <span
                        >{{
                          scope.row.payAmount
                            ? $exchangeRate(scope.row.payAmount)
                            : "---"
                        }}&nbsp;</span
                      >
                      <span style="color: red; text-decoration:line-through;">
                        <span style="color: #606266;">{{
                          scope.row.totalAmount
                            ? $exchangeRate(scope.row.totalAmount)
                            : "---"
                        }}</span>
                      </span>
                    </span>
                    <span v-else>{{
                      scope.row.realAmount
                        ? $exchangeRate(scope.row.realAmount)
                        : "---"
                    }}</span>
                  </template>
                </el-table-column>
                <template v-if="activeName == 2">
                  <el-table-column
                    :label="$t('Inventory lock remaining time')"
                    width="200"
                  >
                    <template slot-scope="scope">
                      <span>{{ scope.row.timeLeft }}</span>
                    </template>
                  </el-table-column>
                </template>
                <el-table-column :label="$t('Order quantity')" min-width="100">
                  <template slot-scope="scope">
                    <el-link
                      v-if="scope.row.shopifyOrderCnt"
                      type="primary"
                      @click="shopifyOrderCnt(scope.row)"
                    >
                      {{ scope.row.shopifyOrderCnt }}
                    </el-link>
                    <span v-else>---</span>
                  </template>
                </el-table-column>
                <template v-if="activeName == 2">
                  <el-table-column :label="$t('Status')" width="200">
                    <template slot-scope="scope">
                      <template>
                        <span v-if="scope.row.accountPayment">{{
                          statusPayArr[scope.row.accountPayment.status]
                            ? statusPayArr[scope.row.accountPayment.status].text
                            : "---"
                        }}</span>
                        <span v-else>---</span>
                      </template>
                    </template>
                  </el-table-column>
                </template>
                <template v-if="activeName == 3">
                  <el-table-column :label="$t('Status')" width="200">
                    <template slot-scope="scope">
                      <template>
                        <span v-if="scope.row.paymentType">{{
                          paymentTypeArr[scope.row.paymentType]
                            ? paymentTypeArr[scope.row.paymentType].text
                            : "---"
                        }}</span>
                        <span v-else>---</span>
                      </template>
                    </template>
                  </el-table-column>
                </template>
                <el-table-column
                  v-if="activeName == 2"
                  label="Action"
                  width="120"
                  fixed="right"
                >
                  <template slot-scope="scope">
                    <div>
                      <el-link
                        class="mg-r-20"
                        type="primary"
                        @click="payCancelFn('row', scope.row)"
                      >
                        Cancel payment
                      </el-link>
                      <el-link
                        class="mg-r-20"
                        type="primary"
                        @click="repayFn(scope.row)"
                      >
                        Repay
                      </el-link>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
            <template v-else>
              <el-table
                key="gridTable3"
                stripe
                style="width: 100%"
                ref="gridTable"
                :data="items"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange"
                :row-key="(row) => row.id"
              >
                <el-table-column
                  type="selection"
                  width="55"
                  :reserve-selection="true"
                >
                </el-table-column>
                   <el-table-column type="expand" width="25" :reserve-selection="true">
                     <template #header>
                      <el-button type="text" size="mini" v-if="isExpansion" @click="toggleRowExpansion">  <i class="el-icon-minus"></i></el-button>
                       <el-button type="text" size="mini" v-if="!isExpansion" @click="toggleRowExpansion">  <i class="el-icon-plus"></i> </el-button>
                      </template>
                    <template slot-scope="props">
                        <el-table
                        ref="multipleTable"
                        :data="props.row.items"
                        style="width: 100%; margin-left: 0"
                        max-height="360"
                        :row-style="rowStyle"
                        :header-cell-style="rowStyle"
                        :cell-style="rowStyle"
                       :cell-class-name="cellClassName"
                      >
                        <el-table-column prop="" label="Product Images" 
                          width='200'
                          align="center">
                          <template slot-scope="child">
                              <!-- <img :src="child.row.imgUrl" width="80" height="80" /> -->
                               <el-image
                                style="width: 80px; height: 80px"
                                :src="child.row.imgUrl"
                                fit="cover"></el-image>
                          </template>                       
                        </el-table-column>
                        <el-table-column prop="vendorProductName" label="SKU number/quantity/name" 
                          width='200'
                          align="left">  
                             <template slot-scope="child">
                                  <!-- <span>{{child.row.name}}</span> -->
                          <el-link
                            type="primary"
                            v-if="child.row.isManage != 2 && !child.row.vendorPrice"
                           
                            @click="unable(child.row)"
                          >{{$t('Unable to be sourced')}}</el-link>                                  
                            <p class="">
                                <template v-if="child.row.isManage == 2">
                                  <span style="display: inline-block;color: #F56C6C;">
                                    {{child.row.vendorSku + 'Unable to purchase'}}
                                    <span> <b class="text-danger" style="font-size:16px">×</b><el-badge class="mark" :value="child.row.quantity" /></span>
                                  </span>
                                </template>
                                <template v-else>
                                  <template v-if="child.row.status != 1">
                                    <span
                                      style="display: inline-block;color: #F56C6C;"
                                    >
                                      {{child.row.vendorSku ? `${child.row.vendorSku} Products Off shelf` : 'null Please make an offer'}}
                                     <span> <b class="text-danger" style="font-size:16px">×</b><el-badge class="mark" :value="child.row.quantity" /></span>
                                    </span>
                                  </template>
                                  <template v-else>
                                    <span style="display: inline-block;">
                                      {{child.row.vendorSku || 'null Please make an offer'}}
                                       <span> <b class="text-danger" style="font-size:16px">×</b><el-badge class="mark" :value="child.row.quantity" /></span>
                                    </span>
                                  </template>
                                </template>
                              </p>
                               <span>{{child.row.name}}</span>
                              </template>                   
                        </el-table-column>  
                        <el-table-column
                          prop=""
                          label="Attribute Value"
                          width='180'
                          align="left"
                        >
                          <template slot-scope="child">
                            <span>{{child.row.propertyValue}}</span>                           
                          </template>
                        </el-table-column>                        
                        <el-table-column prop="vendorSku" label="Supplier Prices" 
                          width='200'
                          align="left">  
                          <template slot-scope="child">
                                <span style="display: inline-block;">
                                  <span v-if="child.row.vendorSku">
                                    <template
                                      v-if="(props.row.discountType == 1 || props.row.discountType == 2) && child.row.isManage != 2"
                                    >
                                      <span>{{$store.state.country.symbol}} {{Number((child.row.amount - child.row.amount / props.row.productAmount * props.row.couponAmount) / child.row.quantity).toFixed(2)}}&nbsp;</span>
                                      <span style="color: red; text-decoration:line-through;">
                                        <span
                                          style="color: #606266;"
                                        >{{$store.state.country.symbol}} {{Number(child.row.vendorPrice).toFixed(2)}}</span>
                                      </span>
                                    </template>
                                    <template v-else>{{$store.state.country.symbol}} {{Number(child.row.vendorPrice).toFixed(2)}}</template>
                                  </span>
                                  <span style="color: #F56C6C;" v-else>{{$t('Please make an offer')}}</span>
                                </span>
                          </template>                    
                        </el-table-column>                                         

                        <el-table-column
                          prop="phone"
                          label="Customer selling price"
                          width='200'
                          align="left"
                        >
                        <template slot-scope="child">
                          <span>{{props.row.currency}} {{Number(child.row.price).toFixed(2)}}</span>
                                  
                        </template>
                        </el-table-column>
                        <el-table-column label=""></el-table-column>
                    <!-- <span>{{ scope.row.codeName }}</span> -->
                        </el-table>
                  </template>
                </el-table-column>               
                <el-table-column label="order type" v-if="status == 3">
                    <template slot-scope="scope">
                        <p>{{scope.row.shippingType== 1? $t('Wholesale order') : $t('offline order')}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="Your shop order num" width="100">
                  <template slot-scope="scope">
                    <el-popover
                      width="1000"
                      trigger="hover"
                      placement="top-start"
                      :ref="'popover' + scope.row.codeName"
                    >
                      <div class="items">
                        <div
                          v-for="(item, i) in scope.row.items"
                          :key="scope.row.orderId + scope.row.codeName + i"
                          class="d-flex mg-b-15"
                        >
                          <img :src="item.imgUrl" width="80" height="80" />
                          <div class="mg-l-10">
                            <p style="width: 600px;" class="mg-b-10">
                              <span v-if="!item.vendorProductId">{{
                                item.name
                              }}</span>
                              <el-link
                                v-else
                                type="primary"
                                :href=" (vendorId != 148982 && vendorId != 146428&& vendorId != 144875&& vendorId != 144843&& vendorId != 143779&& vendorId != 143654&&  vendorId != 74) ? 
                                  `/item/${item.vendorProductId}/${item.vendorProductName}.html` :  `/itemOld/${item.vendorProductId}/${item.vendorProductName}.html`
                                "
                                target="_blank"
                              >
                                {{ item.vendorProductName }}
                              </el-link>
                            </p>
                            <p class="mg-b-10">
                              <template v-if="item.isManage == 2">
                                <span
                                  style="width: 350px;display: inline-block;color: #F56C6C;"
                                  >SKU:
                                  {{
                                    item.vendorSku + "Unable to purchase"
                                  }}</span
                                >
                              </template>
                              <template v-else>
                                <template v-if="item.status != 1">
                                  <span
                                    style="width: 350px;display: inline-block;color: #F56C6C;"
                                    >SKU:
                                    {{
                                      item.vendorSku
                                        ? `${item.vendorSku} Products Off shelf`
                                        : $t('null     Please make an offer')
                                    }}</span
                                  >
                                </template>
                                <template v-else>
                                  <span
                                    style="width: 350px;display: inline-block;"
                                    >SKU:
                                    {{
                                      item.vendorSku ||
                                        $t('null     Please make an offer')
                                    }}</span
                                  >
                                </template>
                              </template>
                            </p>
                            <p>
                              <span style="width: 200px;display: inline-block;">
                              {{ $t('Shop price')}}：{{ scope.row.currency }}
                                {{ Number(item.price).toFixed(2) }}</span
                              >
                              <span style="width: 200px;display: inline-block;">
                              {{ $t('Supply unit price')}}：
                                <span v-if="item.vendorSku">
                                  <template
                                    v-if="
                                      (scope.row.discountType == 1 ||
                                        scope.row.discountType == 2) &&
                                        item.isManage != 2
                                    "
                                  >
                                    <span
                                      >{{$store.state.country.symbol}}
                                      {{
                                        Number(
                                          (item.amount -
                                            (item.amount /
                                              scope.row.productAmount) *
                                              scope.row.couponAmount) /
                                            item.quantity
                                        ).toFixed(2)
                                      }}&nbsp;</span
                                    >
                                    <span
                                      style="color: red; text-decoration:line-through;"
                                    >
                                      <span style="color: #606266;"
                                        >{{$store.state.country.symbol}}
                                        {{
                                          Number(item.vendorPrice).toFixed(2)
                                        }}</span
                                      >
                                    </span>
                                  </template>
                                  <template v-else
                                    >{{$store.state.country.symbol}}
                                    {{
                                      Number(item.vendorPrice).toFixed(2)
                                    }}</template
                                  >
                                </span>
                                <span style="color: #F56C6C;" v-else
                                  >{{$t('Please make an offer')}}</span
                                >
                              </span>
                              <span
                                style="width: 100px;display: inline-block;text-align: right;"
                                >* {{ item.quantity }}</span
                              >
                              <span
                                style="width: 100px;display: inline-block;text-align: right;"
                              >
                                <template
                                  v-if="
                                    (scope.row.discountType == 1 ||
                                      scope.row.discountType == 2) &&
                                      item.isManage != 2
                                  "
                                >
                                  <span
                                    >{{$store.state.country.symbol}}
                                    {{
                                      Number(
                                        item.amount -
                                          (item.amount /
                                            scope.row.productAmount) *
                                            scope.row.couponAmount
                                      ).toFixed(2)
                                    }}&nbsp;</span
                                  >
                                  <span
                                    style="color: red; text-decoration:line-through;"
                                  >
                                    <span style="color: #606266;"
                                      >{{$store.state.country.symbol}}
                                      {{ Number(item.amount).toFixed(2) }}</span
                                    >
                                  </span>
                                </template>
                                <template v-else
                                  >{{$store.state.country.symbol}}
                                  {{
                                    Number(
                                      item.quantity * item.vendorPrice
                                    ).toFixed(2)
                                  }}</template
                                >
                              </span>
                              <span
                                v-if="item.isManage == 2"
                                style="width: 200px;display: inline-block;text-align: right;color: red;"
                              >
                                {{$t('Removed')}}</span
                              >
                            </p>
                          </div>
                        </div>
                      </div>
                      <div slot="reference" class="name-wrapper">
                        <span>{{ scope.row.codeName }}</span>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column label="Order Number" width="150">
                  <template slot-scope="scope">
                    <el-popover
                      width="1000"
                      trigger="hover"
                      placement="top-start"
                      :ref="'popover' + scope.row.orderId"
                    >
                      <div class="items">
                        <div
                          v-for="(item, i) in scope.row.items"
                          :key="scope.row.orderId + scope.row.codeName + i"
                          class="d-flex mg-b-15"
                        >
                          <img :src="item.imgUrl" width="80" height="80" />
                          <div class="mg-l-10">
                            <p style="width: 600px;" class="mg-b-10">
                              <span v-if="!item.vendorProductId">{{
                                item.name
                              }}</span>
                              <el-link
                                v-else
                                type="primary"
                                   :href=" (vendorId != 148982 && vendorId != 146428&& vendorId != 144875&& vendorId != 144843&& vendorId != 143779&& vendorId != 143654&& vendorId != 74) ? 
                                  `/item/${item.vendorProductId}/${item.vendorProductName}.html` :  `/itemOld/${item.vendorProductId}/${item.vendorProductName}.html`
                                "
                                target="_blank"
                              >
                                {{ item.vendorProductName }}
                              </el-link>
                            </p>
                            <p class="mg-b-10">
                              <template v-if="item.isManage == 2">
                                <span
                                  style="width: 350px;display: inline-block;color: #F56C6C;"
                                  >SKU:
                                  {{
                                    item.vendorSku + "Unable to purchase"
                                  }}</span
                                >
                              </template>
                              <template v-else>
                                <template v-if="item.status != 1">
                                  <span
                                    style="width: 350px;display: inline-block;color: #F56C6C;"
                                    >SKU:
                                    {{
                                      item.vendorSku
                                        ? `${item.vendorSku} Products Off shelf`
                                        : $t('null     Please make an offer')
                                    }}</span
                                  >
                                </template>
                                <template v-else>
                                  <span
                                    style="width: 350px;display: inline-block;"
                                    >SKU:
                                    {{
                                      item.vendorSku ||
                                        $t('null     Please make an offer')
                                    }}</span
                                  >
                                </template>
                              </template>
                            </p>
                            <p>
                              <span style="width: 200px;display: inline-block;">
                                {{$t('Shop price')}}：{{ scope.row.currency }}
                                {{ Number(item.price).toFixed(2) }}</span
                              >
                              <span style="width: 200px;display: inline-block;">
                                {{$t('Supply unit price')}}：
                                <span v-if="item.vendorSku">
                                  <template
                                    v-if="
                                      (scope.row.discountType == 1 ||
                                        scope.row.discountType == 2) &&
                                        item.isManage != 2
                                    "
                                  >
                                    <span
                                      >{{$store.state.country.symbol}}
                                      {{
                                        Number(
                                          (item.amount -
                                            (item.amount /
                                              scope.row.productAmount) *
                                              scope.row.couponAmount) /
                                            item.quantity
                                        ).toFixed(2)
                                      }}&nbsp;</span
                                    >
                                    <span
                                      style="color: red; text-decoration:line-through;"
                                    >
                                      <span style="color: #606266;"
                                        >{{$store.state.country.symbol}}
                                        {{
                                          Number(item.vendorPrice).toFixed(2)
                                        }}</span
                                      >
                                    </span>
                                  </template>
                                  <template v-else
                                    >{{$store.state.country.symbol}}
                                    {{
                                      Number(item.vendorPrice).toFixed(2)
                                    }}</template
                                  >
                                </span>
                                <span style="color: #F56C6C;" v-else
                                  >{{$t('Please make an offer')}}</span
                                >
                              </span>
                              <span
                                style="width: 100px;display: inline-block;text-align: right;"
                                >* {{ item.quantity }}</span
                              >
                              <span
                                style="width: 100px;display: inline-block;text-align: right;"
                              >
                                <template
                                  v-if="
                                    (scope.row.discountType == 1 ||
                                      scope.row.discountType == 2) &&
                                      item.isManage != 2
                                  "
                                >
                                  <span
                                    >{{$store.state.country.symbol}}
                                    {{
                                      Number(
                                        item.amount -
                                          (item.amount /
                                            scope.row.productAmount) *
                                            scope.row.couponAmount
                                      ).toFixed(2)
                                    }}&nbsp;</span
                                  >
                                  <span
                                    style="color: red; text-decoration:line-through;"
                                  >
                                    <span style="color: #606266;"
                                      >{{$store.state.country.symbol}}
                                      {{ Number(item.amount).toFixed(2) }}</span
                                    >
                                  </span>
                                </template>
                                <template v-else
                                  >{{$store.state.country.symbol}}
                                  {{
                                    Number(
                                      item.quantity * item.vendorPrice
                                    ).toFixed(2)
                                  }}</template
                                >
                              </span>
                              <span
                                v-if="item.isManage == 2"
                                style="width: 200px;display: inline-block;text-align: right;color: red;"
                              >
                               {{$t('Removed')}} </span
                              >
                            </p>
                          </div>
                        </div>
                      </div>
                      <div slot="reference" class="name-wrapper">
                        <span>{{ scope.row.orderId || "---" }}</span>
                        <img
                          v-if="status != 1 && scope.row.isSplit == 1"
                          style="margin-left: 10px;"
                          src="../../../public/images/split2.png"
                        />
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column label="Shop" width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.store || "---" }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('Created Time')" width="200">
                  <template slot-scope="scope">
                    <span>{{
                      moment(scope.row.timeCreated).format(
                        "YYYY-MM-DD HH:mm:ss"
                      ) || "---"
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('Shipping address')" min-width="250">
                  <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" placement="right">
                      <div slot="content">
                        {{
                          scope.row.shippingJsonInfo &&
                          scope.row.shippingJsonInfo.zip
                            ? scope.row.shippingJsonInfo.zip
                            : "---"
                        }}
                        {{
                          scope.row.shippingJsonInfo &&
                          scope.row.shippingJsonInfo.address1
                            ? scope.row.shippingJsonInfo.address1
                            : "---"
                        }}
                        {{
                          scope.row.shippingJsonInfo &&
                          scope.row.shippingJsonInfo.city
                            ? scope.row.shippingJsonInfo.city
                            : "---"
                        }}
                        {{
                          scope.row.shippingJsonInfo &&
                          scope.row.shippingJsonInfo.province
                            ? scope.row.shippingJsonInfo.province
                            : "---"
                        }}
                        {{
                          scope.row.shippingJsonInfo &&
                          scope.row.shippingJsonInfo.country
                            ? scope.row.shippingJsonInfo.country
                            : "---"
                        }}
                      </div>
                      <span>{{ scope.row.receiverAddress || "---" }}</span>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('Customer')" width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.receiverName || "---" }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('warehouse')" width="150" v-if="vendorId != 148982 || vendorId != 146428|| vendorId != 144875|| vendorId != 144843|| vendorId != 143779|| vendorId != 143654|| vendorId != 140694|| vendorId != 74">
                  <template slot-scope="scope">
                    <span>{{ scope.row.warehouseName || "---" }}</span>
                  </template>
                </el-table-column>   
                <el-table-column :label="$t('address')" width="150" v-if="vendorId != 148982 || vendorId != 146428|| vendorId != 144875|| vendorId != 144843|| vendorId != 143779|| vendorId != 143654|| vendorId != 140694|| vendorId != 74">
                  <template slot-scope="scope">                
                    <el-tooltip class="item" effect="dark" :content="scope.row.warehouseAddress" placement="top-start">
                       <i class="el-icon-chat-dot-square"></i>
                     </el-tooltip>
                  </template>
                </el-table-column>                
                <!-- 1.6.0隐藏 -->
                <el-table-column
                  v-if="status == 4 && (activeName == 2 || activeName == 3)"
                  label="Operate"
                  width="150"
                >
                  <template slot-scope="scope">
                    <div>
                      <el-link
                        type="primary"
                        v-if="activeName == 3"
                        @click="AbnormalContinuePay(scope.row, 2)"
                        >{{$t('Re quote')}}</el-link
                      >
                    </div>
                    <div>
                      <el-link
                        class=""
                        type="primary"
                        @click="AbnormalContinuePay(scope.row, 1)"
                      >
                        {{$t('Continue Pay')}}</el-link
                      >
                    </div>
                  </template>
                </el-table-column>
                <template v-if="status == 1">
                  <el-table-column label="Products" width="150">
                    <template slot-scope="scope">
                      <span>{{ scope.row.unBindQuantity || "---" }}</span>
                    </template>
                  </el-table-column>
                </template>
                <template
                  v-if="status == 1 && activeName == 2 && apiUserId == '146445'"
                >
                  <el-table-column label="Action" width="150">
                    <template slot-scope="scope">
                      <el-link type="primary" @click="addTracking(scope.row)"
                        >{{$t('Request Fullfill')}}</el-link
                      >
                    </template>
                  </el-table-column>
                </template>
                <template v-if="status == 3 || status == 5 || status == 6">
                  <el-table-column :label="$t('Shipping Method')" width="250">
                    <template slot-scope="scope">
                      <span>{{
                        scope.row.trackCompany
                          ? `${scope.row.trackCompany}${
                              scope.row.trackNumber
                                ? `:${scope.row.trackNumber} [${
                                    scope.row.agingDaysBegin
                                      ? scope.row.agingDaysBegin
                                      : 0
                                  }-${
                                    scope.row.agingDaysEnd
                                      ? scope.row.agingDaysEnd
                                      : 0
                                  }days]`
                                : `[${
                                    scope.row.agingDaysBegin
                                      ? scope.row.agingDaysBegin
                                      : 0
                                  }-${
                                    scope.row.agingDaysEnd
                                      ? scope.row.agingDaysEnd
                                      : 0
                                  }days]`
                            }`
                          : "No logistics"
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="`${$t('Shipping cost')}(${$store.state.country.symbol})`"
                    width="150"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row.discountType == 3">
                        <span>0&nbsp;</span>
                        <span style="color: red; text-decoration:line-through;">
                          <span style="color: #606266;">{{
                            scope.row.trackFee
                              ? $exchangeRate(scope.row.trackFee)
                              : "---"
                          }}</span>
                        </span>
                      </span>
                      <span v-else>{{
                        scope.row.trackFee
                          ? $exchangeRate(scope.row.trackFee)
                          : "---"
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="`${$t('pay total')}(${$store.state.country.symbol})`"
                    width="150"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row.discountType">
                        <span
                          >{{
                            scope.row.payAmount
                              ? $exchangeRate(scope.row.payAmount)
                              : "---"
                          }}&nbsp;</span
                        >
                        <span style="color: red; text-decoration:line-through;">
                          <span style="color: #606266;">{{
                            scope.row.realAmount
                              ? $exchangeRate(scope.row.realAmount)
                              : "---"
                          }}</span>
                        </span>
                      </span>
                      <span v-else>{{
                        scope.row.realAmount
                          ? $exchangeRate(scope.row.realAmount)
                          : "---"
                      }}</span>
                    </template>
                  </el-table-column>
                </template>
                <template v-if="status == 6">
                  <el-table-column :label="$t('status')" width="100">
                    <template slot-scope="scope">
                      <span>{{
                        statusArr[scope.row.status]
                          ? statusArr[scope.row.status].text
                          : "---"
                      }}</span>
                    </template>
                  </el-table-column>
                </template>
                <template v-if="status != 1">
                  <el-table-column label="Remark" width="100">
                    <template slot-scope="scope">
                      <div>
                        <div>{{ scope.row.remark || "---" }}</div>
                      </div>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column label="action" v-if="status== 3" width="150">
                      <el-link>
                        Download documentation
                      </el-link>
                  </el-table-column> -->
                </template>
              </el-table>
            </template>
          </el-card>
        </el-col>
      </el-row>
      <el-row v-if="items.length" :gutter="20">
        <el-col :span="24" class="d-flex justify-content-center">
          <div>
            <el-pagination
              :current-page="page"
              :background="true"
              layout="sizes, total, prev, pager, next, jumper"
              :page-sizes="pageSizes"
              :page-size="rowsPerPage"
              :total="Number(total)"
              @current-change="toPage"
              @size-change="changePageSize"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-backtop
      class="goto-top"
      target=".main-scroll  .el-scrollbar__wrap"
      :right="20"
      :bottom="120"
    >
    </el-backtop>
    <!-- 支付弹层 -->
    <el-dialog
      :visible="dialogPay.isShow"
      :loading="dialogPay.loading"
      class="pay-dialog"
      width="30%"
      :before-close="handlePayClose"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      title="Select Payment Method"
    >
      <el-divider></el-divider>
      <div class="pay-info">
        <div class="mg-b-10" v-if="dialogPay.orderNum">
         {{$t('Order Number')}}: <b>{{ dialogPay.orderNum }}</b>
        </div>
        <div v-if="dialogPay.amount">
         {{$t('Total Amount')}}:
          <b class="tx-danger"
            >{{ $exchangeRate(dialogPay.amount.toFixed(2)) }}
            {{ $store.state.country.symbol }}</b
          >
        </div>
      </div>
      <template v-if="dialogPay.step == 1">
        <div class="pay-platform">
          <div class="d-flex title">
            <!-- <h3>Payment Methods</h3> -->
            <el-alert
              title="All transactions are secure and encrypted."
              type="info"
              :closable="false"
            >
            </el-alert>
          </div>
          <div class="platform-select">
            <div
              v-for="type in dialogPay.payTypes"
              :key="type.accountType"
            >
              <a
                href="javascript:;"
                :class="{ active: dialogPay.platformType == type.accountType }"
                @click="changePlatform(type.accountType)"
              >
                <div class="d-flex">
                  <div class="icon-wrap" style="width:150px;">
                    <img :src="type.icon" alt="" height="30" />
                  </div>
                  <span>{{$t('Pay with')}} {{ type.name }}</span>
                </div>
                <div
                  class="active"
                  v-show="dialogPay.platformType != type.accountType"
                >
                  <img src="../../assets/pay/Basic.png" alt="" height="20" />
                </div>
                <div
                  class="active-icon"
                  v-show="dialogPay.platformType == type.accountType"
                >
                  <img src="../../assets/pay/Active.png" alt="" height="20" />
                </div>
              </a>
            </div>
            <div
              v-if="
                invoiceInfo &&
                  invoiceInfo.relationship &&
                  invoiceInfo.relationship.bonusStatus == 1
              "
              :class="{ dis: invoiceInfo.relationship.bonus == 0 }"
            >
              <a
                href="javascript:;"
                :class="{ active: dialogPay.platformType == 6 }"
                @click="changePlatform(6)"
              >
                <div class="d-flex">
                  <div class="icon-wrap" style="width:150px;">
                    <img src="../../assets/pay/6.png" alt="" height="30" />
                  </div>
                  <span
                    >{{$t('Bonus')}}(${{
                      Number((invoiceInfo.relationship || {}).bonus)
                    }})</span
                  >
                </div>
                <div class="active" v-show="dialogPay.platformType != 6">
                  <img
                    v-if="
                      invoiceInfo &&
                        invoiceInfo.relationship &&
                        invoiceInfo.relationship.bonus > 0
                    "
                    src="../../assets/pay/Basic.png"
                    alt=""
                    height="20"
                  />
                  <div class="disable-bonus" v-else></div>
                </div>
                <div
                  class="active-icon"
                  v-show="
                    dialogPay.platformType == 6 &&
                      invoiceInfo.relationship.bonus != 0
                  "
                >
                  <img src="../../assets/pay/Active.png" alt="" height="20" />
                </div>
              </a>
            </div>
            <div
              v-if="
                dialogPay.payTypes.length == 0 &&
                  invoiceInfo &&
                    invoiceInfo.relationship &&
                    invoiceInfo.relationship.bonusStatus == 2
              "
            >
              {{$t('There is no alternative method of payment')}}
            </div>
          </div>
          <div class="action">
            <el-button
              :loading="dialogPay.payLoading"
              type="primary"
              round
              style="width: 120px; font-size: 18px"
              @click="orderPay"
            >
              {{$t('')}}Pay
            </el-button>
          </div>
        </div>
      </template>
      <template v-if="dialogPay.step == 2">
        <div class="paying">
          <i class="mg-r-10 el-icon-loading"></i>
          <p>{{$t('Please do not close the page during payment')}}</p>
          <!-- <p>Please click the "I have paid" button on the payment page after completing the payment </p> -->
        </div>
        <div class="close-pay" @click="closePay">
          <el-button type="info" round plain>{{$t('Close pay')}}</el-button>
        </div>
      </template>
      <template v-if="dialogPay.step == 3">
        <div v-if="dialogPay.msg" class="pay-success error">
          <i class="el-icon-circle-close"></i>
          <p>
            {{ dialogPay.msg }}
          </p>
        </div>
        <div v-else class="pay-success">
          <i class="el-icon-success"></i>
          <p>
            {{$t('Your order has been successfully paid')}}
            <!-- and the order amount is
						<span class="tx-danger"> ${{ dialogPay.amount.toFixed(2) }}</span> -->.
          </p>
        </div>
        <div class="close-pay" @click="closePay">
          <el-button type="info" round plain>{{$t('Close pay')}}</el-button>
        </div>
      </template>
    </el-dialog>
    <checkout :data="dialogCheckOut" @payCheckOut="payCheckOut"></checkout>
    <underline
      :data="dialogUnderline"
      @submitUnderline="submitUnderline"
    ></underline>
    <dlocal :data="dialogDlocal" @submitDlocal="submitDlocal"></dlocal>
    <checkStock
      :data="dialogCheckStock"
      @continuePay="continuePay"
    ></checkStock>
    <dialogLogistic :dialogLogistic="dialogLogistic"></dialogLogistic>
    <orderCnt :data="dialogOrderCnt"></orderCnt>
    <el-dialog
      :visible="abnormalStatus"
      :before-close="abnormalClose"
      width="550px"
    >
      <div class="abnormal-dialog">
        <h1 v-if="abnormalType == 1 && !canPay">
          {{$t('The selected orders are abnormal and payment cannot be continued')}}
        </h1>
        <h1 v-if="abnormalType == 1 && canPay">
          {{$t('Payment can continue after excluding the following goods')}}
        </h1>
        <h1 v-if="abnormalType == 2">
          {{$t('After removing the off shelf goods, the order will be returned to the')}}{{$t('price to be quoted')}}
          
        </h1>
        <el-table :data="abnormalData">
          <el-table-column label="Goods SKU">
            <template slot-scope="scope">
              {{ scope.row.items.vendorSku || "--" }}
            </template>
          </el-table-column>
          <el-table-column label="Order Number" prop="codeName">
          </el-table-column>
          <el-table-column label="Status" prop="reason"> </el-table-column>
        </el-table>
        <div class="btn-area">
          <el-button size="small" v-if="canPay" @click="abnormalClose"
            >{{$t('Cancel')}}</el-button
          >
          <el-button
            size="small"
            :loading="abnormalBtnVisible"
            type="primary"
            @click="AbnormalReClick"
          >
            {{$t('Confirm')}}</el-button
          >
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="Create Order"
      :visible="createVisible"
      :before-close="ImportCancel"
      width="400px"
    >
      <div class="create-order">
        <el-upload
          class="upload-demo"
          ref="upload"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          :auto-upload="false"
          :file-list="uploadfileList"
          :on-change="fileBeforeUpload"
          action=""
        >
          <el-button slot="trigger" size="small" type="primary"
            >{{$t('选取文件')}}</el-button
          >
          <div class="el-upload__tip" slot="tip">
            <div>
              {{$t('点击下载')}}
              <a class="template" @click="downloadFile">{{$t('订单导入模板')}}</a>
            </div>
           {{$t('请按规范填写表格，仅支持xlsx格式文件')}}<br />
           {{$t('上传的文件不能超过2M，只处理前99条数据')}} 
          </div>
        </el-upload>
      </div>
      <div slot="footer">
        <el-button size="mini" @click="ImportCancel">cancel</el-button>
        <el-button size="mini" type="primary" @click="createUpload"
          >{{$t('submit')}}</el-button
        >
      </div>
    </el-dialog>
    <add-tracking-dialog
      :dialog="addTrackingDialog"
      v-if="addTrackingDialog.visible"
    ></add-tracking-dialog>
  </div>
</template>

<script>
import dialogLogistic from "./dialogLogistic.vue";
import checkout from "@/components/checkout/checkout";
import underline from "@/components/checkout/underline";
import dlocal from "@/components/checkout/dlocal";
import checkStock from "@/components/checkout/dialogCheckStock";
import orderCnt from "./dialogOrderCnt.vue";
import AddTrackingDialog from "./addTrackingDialog.vue";
export default {
  data() {
    return {
      apiUserId: localStorage.getItem("c_apiUserId"),
      dialogLogisticDefault: "{}",
      dialogLogistic: {
        isShow: false,
        errorType: null,
        items: [],
        max: "",
        min: "",
      },
      formHouse: {
          type: []
      },
      dialogVisibleHouse: false,
      isExpansion: false,
       vendorId: localStorage.getItem('vendorId'),
      // v1.6.0 异常订单新增参数 Start
      details: {},
      createVisible: false,
      abnormalStatus: false,
      uploadfileList: [],
      abnormalSelection: [],
      abnormalData: [],
      batchChange: false,
      abnormalBtnVisible: false,
      abnormalType: 0,
      canPay: false,
      // end
      loading: false,
      tableHeight: 400,
      reSizeTime: 0,
      pageSizes: [10, 20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("c_ordersRowsPerPage")
        ? Number(localStorage.getItem("c_ordersRowsPerPage"))
        : 10,
      items: [],
      total: 0,
      totalPage: 0,
      status: this.$route.params.status ? Number(this.$route.params.status) : 1,
      activeName: "1",
      tabList: [],
      storeList: [],
      checkIds: [],
      checkItems: [],
      customerAllOrderCnt: {},
      filterParams: {
        date: [],
        dateFrom: "",
        dateTo: "",
        date2: [],
        dateFrom2: "",
        dateTo2: "",
        accountIds: "",
        orderId: "",
        codeName: "",
        receiverName: "",
        sysCode: "",
      },
      filterParamsDefault: "{}",
      dialogPay: {
        isShow: false,
        loading: false,
        orderNum: "",
        amount: "",
        platformType: "",
        payLoading: false,
        step: 1,
        msg: "", //出错
        payTypes: [],
        params: "",
        openType: "",
      },
      dialogPayDefault: "{}",
      dialogCheckStock: {
        isShow: false,
        loading: false,
        params: "",
        openType: "",
        items: [],
      },
      dialogCheckStockDefault: "{}",
      dialogCheckOut: {
        isShow: false,
        loading: false,
        packages: null,
        orderPay: null,
        token: "",
      },
      dialogUnderline: {
        isShow: false,
        loading: false,
        paymentId: "",
        params: "",
        payAmount: 0,
      },
      dialogDlocal: {
        isShow: false,
        invoiceId: "",
        loading: false,
      },
      dialogOrderCnt: {
        isShow: false,
        items: [],
      },
      payTime: 0,
      payAmount: 0,
      newWin: null,
      storehouseList: [],
      invoiceInfo: {
        id: "",
        relationship: {
          bonus: 0,
          bonusStatus: "",
        },
      },
      statusArr: {
        //状态
        // 1: {
        //   text: "Quotation to be submitted",
        //   type: "danger",
        //   val: 1,
        // },
        2: {
          text: this.$t("Vendor quoted order"),
          type: "warning",
          val: 2,
        },
        4: {
          text: this.$t("Payment Not Received"),
          type: "warning",
          val: 4,
        },
        3: {
          text: this.$t("Pending payment"),
          type: "warning",
          val: 3,
        },
        5: {
          text: this.$t("Waiting for fulfill"),
          type: "warning",
          val: 5,
        },
        6: {
          text: this.$t("Fulfilled"),
          type: "success",
          val: 6,
        },
        7: {
          text: this.$t("Completed"),
          type: "success",
          val: 7,
        },
        8: {
          text: this.$t("Logistics synchronization failed"),
          type: "info",
          val: 8,
        },
        9: {
          text: this.$t("Unable to purchase"),
          type: "info",
          val: 9,
        },
        10: {
          text: this.$t("Products Off shelf"),
          type: "info",
          val: 10,
        },
        11: {
          text: this.$t("Payment to be completed"),
          type: "warning",
          val: 11,
        },
        12: {
          text: this.$t("Waiting for fulfill"),
          type: "warning",
          val: 12,
        },
        14: {
          text: this.$t("Quit quotation"),
          type: "warning",
          val: 14,
        },
      },
      statusPayArr: {
        //状态
        1: {
          text: this.$t("Pending Payment"),
          type: "danger",
          val: 1,
        },
        4: {
          text: this.$t("Payment failed"),
          type: "warning",
          val: 4,
        },
        5: {
          text: this.$t("Vendor Verifying Payment"),
          type: "warning",
          val: 5,
        },
      },
      paymentTypeArr: {
        //状态
        1: {
          text: this.$t("Vendor Verifying Payment"),
          type: "danger",
          val: 1,
        },
        4: {
          text: this.$t("Payment result to be returned"),
          type: "warning",
          val: 4,
        },
      },
      isDisabled: false,
      count: "",
      timer: null,
      addTrackingDialog: {
        visible: false,
        row: {},
      },
    };
  },
  components: {
    checkout,
    dialogLogistic,
    underline,
    dlocal,
    checkStock,
    orderCnt,
    AddTrackingDialog,
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      this.status = this.$route.params.status
        ? Number(this.$route.params.status)
        : 2;
      this.activeName = this.activeName ? this.activeName : "1";
      if (to.params.status !== from.params.status) {
        //切换左边菜单清空搜索条件
        this.filterParams = JSON.parse(this.filterParamsDefault);
      }
      this.gotoPage();
      this.gettabList();
    },
    status() {
      this.$refs.gridTable.clearSelection();
      this.filterParams = JSON.parse(this.filterParamsDefault);
      this.activeName = "1";
    },
    activeName() {
      this.$refs.gridTable.clearSelection();
      this.toPage(1);
    },
  },
  mounted() {
    if (this.$route.query.type) {
      this.activeName = String(this.$route.query.type);
    }
    this.getItem();
    this.dialogPayDefault = JSON.stringify(this.dialogPay);
    this.dialogCheckStockDefault = JSON.stringify(this.dialogCheckStock);
    let status = this.$route.params.status
      ? Number(this.$route.params.status)
      : 1;
    let paystatus = this.$route.query.paystatus
      ? Number(this.$route.query.paystatus)
      : 1;
    if (
      status == 2 &&
      this.activeName == "1" &&
      (paystatus == 2 || paystatus == 3)
    ) {
      let returnPayId = localStorage.getItem("c_returnPayId") || "";
      let returnPaySessionId =
        localStorage.getItem("c_returnPaySessionId") || "";
      if (paystatus == 2) {
        this.paySuccess(returnPayId, returnPaySessionId);
      }
      localStorage.setItem("c_returnPayStatus", paystatus);
    }
    window.addEventListener("storage", (e) => {
      if (e.key == "returnPayStatus") {
        //支付回调，支付结果弹层
        if (this.dialogPay.isShow) {
          let returnPayStatus = localStorage.getItem("c_returnPayStatus") || "";
          if (returnPayStatus == 2) {
            //支付成功
            this.dialogPay.step = 3;
            this.closePayPage();
          } else {
            //支付失败
            this.dialogPay.step = 3;
            this.dialogPay.msg = "Payment failed";
            this.closePayPage();
          }
        }
      }
    });
    setInterval(() => {}, 1000);
  },
  beforeDestroy() {},
  methods: {
    addTracking(row) {
      this.addTrackingDialog = {
        visible: true,
        row: row,
      };
    },
    shippedFn(row) {
      this.dialogLogistic.errorType = row.shippingMethodArr.errorType;
      if (row.shippingMethodArr.errorSkuList) {
        this.dialogLogistic.items = row.shippingMethodArr.errorSkuList;
      }
      this.dialogLogistic.max = row.shippingMethodArr.max;
      this.dialogLogistic.min = row.shippingMethodArr.min;
      this.dialogLogistic.isShow = true;
    },
    deleteOrder(i, data) {
      let ids = [];
      data.items.forEach((e) => {
        if (e.check) {
          ids.push(e.id);
        }
      });
      if (ids.length == 0) {
        ids.push(i.id);
      }
      this.$confirm(this.$t("确定删除该商品？"), "Tips", {
        confirmButtonText: this.$t("确定"),
        cancelButtonText: this.$t("取消"),
        type: "warning",
      })
        .then(() => {
          this.$apiCall(
            "api.ShopifyOrder.delshopifyItem",
            {
              ids: ids,
            },
            (r) => {
              if (r.ErrorCode == 9999) {
                this.getItem();
                this.$elementMessage(this.$t("Delete Successful!"), "success");
              } else {
                this.$elementMessage(r.Message, "error");
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    handlePurchaseChange(selection) {
      this.abnormalSelection = [];
      selection.forEach((item) => {
        this.abnormalSelection.push(item.id);
      });
    },
    ImportFn() {
      this.createVisible = true;
    },
    batchWareHouse(){        
        if (this.checkIds.length == 0) {
          this.$message.error(this.$t('Please select an order'))
          return
        }
        this.dialogVisibleHouse = true
    },
    buildOrder(){
          let params = {
            id: this.checkIds,
            warehouseId: this.formHouse.type
          }
      this.$apiCall("api.ShopifyOrder.orderChooseWarehouse", params, (r) => {
        if (r.ErrorCode == 9999) {
          this.$message.success('Binding succeeded!');
          this.dialogVisibleHouse = false
          this.formHouse.type = []
        } else {
          this.$message({
            message: r.Message,
            type: "error"
          })
        }
      })
    },
    openStorehouse(){
      this.$apiCall("api.Warehouse.finds", {}, (r) => {
        if (r.ErrorCode == 9999) {
          this.storehouseList = r.Data.Results
          if (r.Data.Results.length == 0) {
            this.$message.error('There is no warehouse, please go to add！')
          }
        } else {
          this.$message({
            message: r.Message,
            type: "error"
          })
        }
      })
    },
    ImportCancel() {
      this.createVisible = false;
    },
    createUpload() {
      if (!this.uploadfileList.length) {
        this.$elementMessage(this.$t("Please choose file"), "error");
        return;
      }
      if (this.uploadfileList[0].raw.size / 1024 / 1024 > 2) {
        this.$message({
          message: this.$t("file cannot over 2MB"),
          type: "error",
        });
        return;
      }
      let uploadFile = this.uploadfileList[0].raw;
      this.$showLoading();
      if ($("#ifileProCreate").length == 0) {
        $("body").append(
          '<iframe id="ifileProCreate" style="display:none"></iframe>'
        );
      }
      let openDownload = (url) => {
        document.getElementById("ifileProCreate").src = url;
      };
      let apiUrl = "api.ShopifyOrder.importOrderExcel";
      let param = {
        "@file": uploadFile,
      };
      this.$apiCall(apiUrl, param, (r) => {
        if (r.ErrorCode == "9999") {
          this.$elementMessage(this.$t("Create Success"), "success");
          openDownload(r.Data.Results.file);
          this.getItem();
          this.createVisible = false;
          this.uploadfileList = [];
        } else {
          this.$elementMessage(r.Message, "error");
          if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
            this.$userFailure(this);
          }
        }
        this.$hideLoading();
      });
    },
    downloadFile() {
      let url = "/newFile/orders_create.xlsx";
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
    fileBeforeUpload(file) {
      this.uploadfileList = [];
      this.uploadfileList.push(file);
    },
    abnormalClose() {
      this.batchChange = false;
      this.abnormalStatus = false;
      this.abnormalData = [];
    },
    AbnormalReClick() {
      if (!this.canPay && this.abnormalType == 1) {
        this.abnormalStatus = false;
        return;
      }

      this.abnormalBtnVisible = true;
      if (this.batchChange) {
        // 批量
        this.$apiCall(
          "api.ShopifyOrder.reOfferOrPay",
          {
            ids: this.abnormalSelection,
            type: this.abnormalType,
          },
          (r) => {
            this.abnormalBtnVisible = false;
            this.abnormalStatus = false;
            if (r.ErrorCode == 9999) {
              if (r.Data.Results) {
                this.$elementMessage("Change Success", "success");
                if (this.abnormalType == 1) {
                  this.$router.push({
                    path: "/ordersManage/2",
                  });
                } else if (this.abnormalType == 2) {
                  this.$router.push({
                    path: "/ordersManage/1",
                    query: {
                      type: 2,
                    },
                  });
                }
              }
            }
          }
        );
      } else {
        // 单个
        this.$apiCall(
          "api.ShopifyOrder.reOfferOrPay",
          {
            ids: [this.details.id],
            type: this.abnormalType,
          },
          (r) => {
            this.abnormalBtnVisible = false;
            this.abnormalStatus = false;
            if (r.ErrorCode == 9999) {
              if (r.Data.Results) {
                this.$elementMessage("Change Success", "success");
                if (this.abnormalType == 1) {
                  this.$router.push({
                    path: "/ordersManage/2",
                  });
                } else if (this.abnormalType == 2) {
                  this.$router.push({
                    path: "/ordersManage/1",
                    query: {
                      type: 2,
                    },
                  });
                }
              }
            }
          }
        );
      }
    },
    BatchContinuePay(type) {
      // 批量处理 购买 报价
      this.batchChange = true;
      this.abnormalType = type;
      this.$apiCall(
        "api.ShopifyOrder.checkOfferOrPay",
        {
          ids: this.abnormalSelection,
          type: type,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            this.canPay = r.Data.Results.isPayFlag;
            this.abnormalData = r.Data.Results.abnormalSkus;
            if (this.abnormalData.length > 0) {
              this.abnormalStatus = true;
            } else if (
              this.abnormalData.length == 0 &&
              this.abnormalType == 2
            ) {
              this.$elementMessage(this.$t("No goods need to be eliminated"), "error");
            } else if (
              this.abnormalData.length == 0 &&
              this.abnormalType == 1
            ) {
              this.AbnormalReClick();
            }
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    AbnormalContinuePay(row, type) {
      this.abnormalType = type;
      this.details = row;
      this.$apiCall(
        "api.ShopifyOrder.checkOfferOrPay",
        {
          ids: [row.id],
          type: this.abnormalType,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            this.canPay = r.Data.Results.isPayFlag;
            this.abnormalData = r.Data.Results.abnormalSkus;
            if (this.abnormalData.length > 0) {
              this.abnormalStatus = true;
            } else if (
              this.abnormalData.length == 0 &&
              this.abnormalType == 2
            ) {
              this.$elementMessage(this.$t("No goods need to be eliminated"), "error");
            } else if (
              this.abnormalData.length == 0 &&
              this.abnormalType == 1
            ) {
              this.AbnormalReClick();
            }
          }
        }
      );
    },
    show(row) {
      this.$refs["popover" + row.orderId].showPopper = true;
      this.$nextTick(() => {
        this.$refs["popover" + row.orderId].updatePopper();
      });
    },
    enter(row, column, cell) {
      this.show(row);
      // this.$refs['popover'+row.orderId].showPopper = true
    },
    leave(row, column, cell) {
      this.$refs["popover" + row.orderId].showPopper = false;
    },
    shopifyOrderCnt(item) {
      this.$showLoading();
      this.$apiCall(
        "api.ShopifyOrder.shopifyOrders",
        {
          invoiceId: item.id,
          isAll: true,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            this.dialogOrderCnt.items = r.Data.Results;
            this.dialogOrderCnt.isShow = true;
          } else {
            this.$elementMessage(r.Message, "error");
          }
          this.$hideLoading();
        }
      );
    },
    exportOrder() {
      if (!this.checkIds.length)
        this.$elementMessage(this.$t("Please select an order first"), "error");
      this.$showLoading();
      if ($("#ifilePro").length == 0) {
        $("body").append(
          '<iframe id="ifilePro" style="display:none"></iframe>'
        );
      }
      let openDownload = (url) => {
        document.getElementById("ifilePro").src = url;
      };
      let apiUrl = "api.ShopifyOrder.exportShopifyOrder2";
      this.$apiCall(
        apiUrl,
        {
          idList: this.checkIds,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            this.$elementMessage("Successfully", "success");
            openDownload(r.Data.Results);
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
          this.$hideLoading();
        }
      );
    },
    paySuccess(id, sessionId) {
      localStorage.removeItem("c_returnPayId");
      localStorage.removeItem("c_returnPaySessionId");
      this.$apiCall(
        "api.ShopifyOrder.returnPay",
        {
          id: id,
          sessionId: sessionId,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            this.$elementMessage("Successfully", "success");
            this.getItem();
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
        /** 表格展开与关闭 */
    toggleRowExpansion(){
      if(this.items.length){
        this.isExpansion = !this.isExpansion;
        this.toggleRowExpansionAll(this.items, this.isExpansion);
      }
    },
    toggleRowExpansionAll(data, isExpansion) {
      console.log(data, 'datas');
      data.forEach((item) => {
        this.$refs.gridTable.toggleRowExpansion(item, isExpansion);
        if (item.items !== undefined && item.items !== null) {
          this.toggleRowExpansionAll(item.items, isExpansion);
        }
      });
    },
  // 判断是否所有行都展开或者关闭
  handleExpandChange(row,rows){
    if(this.items.length == rows.length){
         this.isExpansion = true
   }else{
        this.isExpansion = false
     }
},    
    rowStyle({ row, rowIndex }) {
    let bgcolor = {
      background: "#DDDFEF",
      borderBottom: "1px solid #d9d9d9",
      fontWeight:'500',
    };
    return bgcolor;
  },
 cellClassName({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'sub-table-cell';
      }
      return '';
    }, 
    filterShippingMethod(e, item) {
      item.shippingMethodArr.forEach((obj) => {
        if (obj.id == e) {
          this.$set(item, "shippingMethodItem", obj);
          this.$set(item, "shippingMethodId", obj.id);
          this.$set(item, "shippingMethodFee", obj.fee);
        }
      });
      if (item.shippingMethodItem) {
        //有运费加上运费
        this.$set(
          item,
          "totalAllAmount",
          (item.itemAmount ? Number(item.itemAmount) : 0) +
            Number(item.shippingMethodItem.fee)
        );
      } else {
        this.$set(
          item,
          "totalAllAmount",
          item.itemAmount ? Number(item.itemAmount) : 0
        );
      }
      // if(item.items.length){
      // 	item.items.forEach(obj=>{
      // 		this.$set(obj,"totalPrice",Number(obj.vendorPrice)*Number(obj.quantity));
      // 	})
      // 	if(item.shippingMethodItem){//有运费加上运费
      // 		this.$set(item,"totalAllAmount",this.countTotal(item.items,'totalPrice') + Number(item.shippingMethodItem.fee));
      // 	}else{
      // 		this.$set(item,"totalAllAmount",this.countTotal(item.items,'totalPrice'));
      // 	}
      // }else{
      // 	if(item.shippingMethodItem){//有运费加上运费
      // 		this.$set(item,"totalAllAmount",Number(item.shippingMethodItem.fee));
      // 	}else{
      // 		this.$set(item,"totalAllAmount",0);
      // 	}
      // }
    },
    updateFn() {
      this.$showLoading();
      this.$apiCall("api.ShopifyAccount.updateShopifyOrderNow", {}, (r) => {
        if (r.ErrorCode == "9999") {
          this.$elementMessage("Successfully", "success");
          this.getItem();
        } else {
          this.$elementMessage(r.Message, "error");
        }
        this.$hideLoading();
        this.updateCountDown();
      });
    },
    updateCountDown() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.isDisabled = true;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.isDisabled = false;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    countDown(item) {
      let time = item.timeCreated;
      let timeLeft = "";
      item.clock = setInterval(() => {
        let start = moment.unix(time).format("YYYY-MM-DD HH:mm:ss"); //获取开始时间
        let end = moment
          .unix(time)
          .add(2, "days")
          .format("YYYY-MM-DD HH:mm:ss"); //结束时间
        let today = moment().format("YYYY-MM-DD HH:mm:ss"); //今天时间
        let diff = moment(end).diff(moment(today)); //时间差
        if (diff > 0) {
          if (moment.duration(diff).days() > 0) {
            timeLeft = `${moment.duration(diff).hours() +
              24} : ${moment.duration(diff).minutes()} : ${moment
              .duration(diff)
              .seconds()}`; //格式化为需要的格式 这里是时分秒
          } else {
            timeLeft = `${moment.duration(diff).hours()} : ${moment
              .duration(diff)
              .minutes()} : ${moment.duration(diff).seconds()}`; //格式化为需要的格式 这里是时分秒
          }
        } else {
          timeLeft = "null";
          clearInterval(item.clock);
        }
        this.$set(item, "timeLeft", timeLeft);
      }, 1000);
    },
    payCheckOut(token) {
      if (this.dialogCheckOut.loading) {
        return;
      }
      this.dialogCheckOut.loading = true;
      // this.newWin = window.open(
      // 	(this.$root.$children[0].baseUrl == "/my" ? "/my" : "") + "/blank.html",
      // 	"pay"
      // );
      this.$Burying({
        object: "9003",
        objectId: 4,
      });
      let params = {
        success_url: window.location.origin + "/ordersManage/2?paystatus=2",
        cancel_url: window.location.origin + "/ordersManage/2?paystatus=3",
        platformType: 4,
        token,
      };
      let url = "api.ShopifyOrder.createPay";
      if (this.dialogPay.openType == "repay") {
        //重新支付
        params.id = Object.keys(this.dialogPay.params)[0];
        url = "api.ShopifyOrder.reCreatePay";
      } else {
        params.ids = this.dialogPay.params;
      }
      this.$apiCall(url, params, (r) => {
        this.dialogCheckOut.loading = false;
        this.dialogCheckOut.isShow = false;
        if (r.ErrorCode == "9999" && r.Data.Results.url) {
          // this.newWin.location = r.Data.Results.url;
          // this.dialogPay.step = 2;
          this.dialogPay.step = 3;
          if (this.dialogPay.openType == "repay") {
            //重新支付
            this.paySuccess(params.id, r.Data.Results.sessionId);
          } else {
            this.paySuccess(r.Data.Results.id, r.Data.Results.sessionId);
          }
        } else {
          this.$elementMessage(
            r.ErrorCode == "9999" ? "fail" : r.Message,
            "error"
          );
          // this.newWin.close();
        }
      });
    },
    submitUnderline(account, imageUrl) {
      this.dialogUnderline.loading = true;
      let params = {
        platformType: 12,
        accountPayment: account,
        voucherUrl: imageUrl,
        paymentId: this.dialogUnderline.paymentId,
      };
      let url = "api.ShopifyOrder.createPay";
      if (this.dialogPay.openType == "repay") {
        //重新支付
        params.id = Object.keys(this.dialogPay.params)[0];
        url = "api.ShopifyOrder.reCreatePay";
      } else {
        params.ids = this.dialogPay.params;
      }
      this.$apiCall(url, params, (r) => {
        this.dialogUnderline.loading = false;
        this.dialogUnderline.isShow = false;
        if (r.ErrorCode == "9999") {
          this.dialogPay.step = 3;
          if (this.dialogPay.openType == "repay") {
            //重新支付
            this.paySuccess(params.id, r.Data.Results.sessionId);
          } else {
            this.paySuccess(r.Data.Results.id, r.Data.Results.sessionId);
          }
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    submitDlocal(params) {
      this.dialogDlocal.loading = true;
      this.newWin = window.open(
        (this.$root.$children[0].baseUrl == "/my" ? "/my" : "") + "/blank.html",
        "pay"
      );
      let params2 = {
        methodId: params.methodId,
        platformType: 10,
        domain: window.location.origin + "/",
        flow: "REDIRECT",
        country: params.country,
        name: params.name,
        city: params.city,
        street: params.street,
        number: params.number,
        document: params.document,
        phone: params.phone,
        email: params.email,
      };
      let url = "api.ShopifyOrder.createPay";
      if (this.dialogPay.openType == "repay") {
        //重新支付
        params2.id = Object.keys(this.dialogPay.params)[0];
        url = "api.ShopifyOrder.reCreatePay";
      } else {
        params2.ids = this.dialogPay.params;
      }
      this.$apiCall(url, params2, (r) => {
        this.dialogDlocal.loading = false;
        this.dialogDlocal.isShow = false;
        if (r.ErrorCode == "9999" && r.Data.Results.url) {
          this.newWin.location = r.Data.Results.url;
          this.dialogPay.step = 2;
        } else {
          this.$elementMessage(
            r.ErrorCode == "9999" ? "fail" : r.Message,
            "error"
          );
          this.newWin.close();
        }
      });
    },
    orderPay() {
      //支付弹层支付
      this.$Burying({
        object: "9003",
        objectId: this.dialogPay.platformType,
      });
      let params = {
        platformType: this.dialogPay.platformType,
        success_url: window.location.origin + "/ordersManage/2?paystatus=2",
        cancel_url: window.location.origin + "/ordersManage/2?paystatus=3",
      };
      let type = "";
      let paymentId = "";
      if (
        this.dialogPay.platformType &&
        !Number(this.dialogPay.platformType) &&
        this.dialogPay.platformType.indexOf("underline") != -1
      ) {
        paymentId = this.dialogPay.platformType.substring(9);
        type = 12;
      } else {
        type = Number(this.dialogPay.platformType);
      }
      switch (type) {
        //underline
        case 12:
          this.dialogUnderline.isShow = true;
          this.dialogUnderline.paymentId = paymentId;
          let item = this.dialogPay.payTypes.filter((item) => {
            return item.id == paymentId;
          });
          this.dialogUnderline.params =
            item.length && item[0].params ? JSON.parse(item[0].params) : "";
          this.dialogUnderline.payAmount = this.payAmount;
          break;
        //dlocal
        case 10:
          this.dialogDlocal.isShow = true;
          this.dialogDlocal.invoiceId = this.invoiceInfo.id;
          break;
        //CheckOut
        case 4:
          this.dialogCheckOut.isShow = true;
          break;
        //paypal
        case 3:
          this.newWin = window.open(
            (this.$root.$children[0].baseUrl == "/my" ? "/my" : "") +
              "/blank.html",
            "pay"
          );
          break;
        //ebanx
        case 2:
          this.newWin = window.open(
            (this.$root.$children[0].baseUrl == "/my" ? "/my" : "") +
              "/blank.html",
            "pay"
          );
          break;
        //stripe
        case 1:
          break;
        default:
          //bonus
          break;
      }
      if (type == 4 || type == 10 || type == 12) {
        //CheckOut或者dlocal或者underline
        return;
      }
      this.dialogPay.payLoading = true;
      let url = "api.ShopifyOrder.createPay";
      if (this.dialogPay.openType == "repay") {
        //重新支付
        params.id = Object.keys(this.dialogPay.params)[0];
        url = "api.ShopifyOrder.reCreatePay";
      } else {
        params.ids = this.dialogPay.params;
      }
      this.$apiCall(url, params, (r) => {
        this.dialogPay.payLoading = false;
        if (r.ErrorCode == "9999") {
          if (this.dialogPay.openType == "repay") {
            //重新支付
            localStorage.setItem("c_returnPayId", params.id);
          } else {
            localStorage.setItem("c_returnPayId", r.Data.Results.id);
          }
          localStorage.setItem(
            "c_returnPaySessionId",
            r.Data.Results.sessionId
          );
          //bonus
          if (this.dialogPay.platformType == 6) {
            this.dialogPay.step = 3;
            if (this.dialogPay.openType == "repay") {
              //重新支付
              this.paySuccess(params.id, r.Data.Results.sessionId);
            } else {
              this.paySuccess(r.Data.Results.id, r.Data.Results.sessionId);
            }
          } else {
            //stripe
            if (this.dialogPay.platformType == 1) {
              const data = r.Data.Results;
              let stripe = Stripe(data.pk);
              stripe.redirectToCheckout({
                sessionId: data.sessionId,
              });
            } else {
              this.newWin.location = r.Data.Results.url;
            }
            this.dialogPay.step = 2;
            // this.payTime = setInterval(() => {
            // 	this.getPayStatus(this.dialogPay.platformType);
            // }, 2000);
          }
        } else {
          this.$elementMessage(r.Message, "error");
          this.closePayPage();
        }
      });
    },
    changePlatform(type) {
      if (type == 6 && (this.invoiceInfo.relationship || {}).bonus == 0) {
        return;
      }
      this.$set(this.dialogPay, "platformType", type);
      this.$Burying({
        object: "9002",
        objectId: type,
      });
    },
    openPay(obj, type) {
      this.$showLoading();
      let url = "api.ShopifyOrder.creatPayInvoice";
      let params = {};
      if (type == "repay") {
        //重新支付
        params.id = Object.keys(obj)[0];
        url = "api.ShopifyOrder.reCreatPayInvoice";
      } else {
        params.ids = obj;
      }
      this.$apiCall(url, params, (r) => {
        this.$hideLoading();
        if (r.ErrorCode == "9999") {
          let items = {
            type: type,
            invoice: r.Data.Results.invoice,
            items: [],
          };
          localStorage.setItem(
            "accountPayment",
            r.Data.Results.accountPayment
              ? JSON.stringify(r.Data.Results.accountPayment)
              : ""
          );
          if (r.Data.Results.shopifyOrders) {
            for (let index in r.Data.Results.shopifyOrders) {
              items.items.push(
                Object.assign({}, r.Data.Results.shopifyOrders[index], {
                  orderId: index,
                })
              );
            }
            localStorage.setItem("needPayOrders", JSON.stringify(items));
            this.$router.push({
              path: "/orderPay",
            });
          } else {
            localStorage.removeItem("needPayOrders");
          }
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
      // this.$router.push({path:'/orderPay'})
      return;
      //打开支付弹层
      if (this.dialogPay.isShow) {
        return;
      }
      this.$showLoading();
      this.$apiCall("api.Invoice.getBonus", {}, (r) => {
        if (r.ErrorCode == "9999") {
          this.invoiceInfo.relationship.bonus = r.Data.Results.bonus;
          this.invoiceInfo.relationship.bonusStatus =
            r.Data.Results.bonusStatus;
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
      this.$apiCall("api.AccountPayment.getPaymentAccounts", {}, (r) => {
        if (r.ErrorCode == "9999") {
          this.dialogPay = JSON.parse(this.dialogPayDefault);
          this.dialogPay.isShow = true;
          this.dialogPay.step = 1;
          this.dialogPay.amount = Number(this.realAmount);
          this.dialogPay.orderNum = this.invoiceInfo.code;
          this.dialogPay.payTypes = [];
          if (!r.Data.Results || !r.Data.Results.length) return;
          r.Data.Results.forEach((item) => {
            item.icon = require("@/assets/pay/n" +
              Number(item.accountType) +
              ".png");
            if (item.accountType == 12) {
              this.$set(item, "accountType", `underline${item.id}`);
              this.$set(
                item,
                "name",
                `${item.params ? JSON.parse(item.params).cname : ""}`
              );
            }
            if (item.status == 1) {
              this.dialogPay.payTypes.push(item);
            }
          });
          // this.dialogPay.payTypes = r.Data.Results;
          this.dialogPay.params = obj;
          this.dialogPay.openType = type;
        } else {
          this.$elementMessage(r.Message, "error");
        }
        this.$hideLoading();
      });
    },
    closePay() {
      if (this.newWin) {
        this.newWin.close();
      }
      this.dialogPay = JSON.parse(this.dialogPayDefault);
      let newQuery = JSON.parse(JSON.stringify(this.$route.query)); // 深拷贝
      delete newQuery.paystatus;
      this.$router.replace({
        query: newQuery,
      });
      this.getItem();
    },
    closePayPage() {
      //关闭支付新开页面
      if (this.newWin) {
        this.newWin.close();
      }
      // clearInterval(this.payTime);
      localStorage.removeItem("c_returnPayStatus");
    },
    handlePayClose() {
      this.dialogPay.isShow = false;
    },
    syncFn(type, item) {
      if (type == "row") {
        this.sync(type, item);
      } else {
        if (!this.checkIds.length) {
          this.$elementMessage(this.$t("Please select an order first"), "error");
        } else {
          this.sync();
        }
      }
    },
    sync(type, item) {
      let ids = [];
      if (type == "row") {
        ids.push(item.id);
      } else {
        ids = this.checkIds;
      }
      this.$showLoading();
      this.$apiCall(
        "api.ShopifyOrder.setNotAbnormal",
        {
          ids: ids,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            this.$elementMessage("Successfully", "success");
            this.getItem();
          } else {
            this.$elementMessage(r.Message, "error");
          }
          this.$hideLoading();
        }
      );
    },
    continuePay() {
      this.openPay(
        this.dialogCheckStock.params,
        this.dialogCheckStock.openType
      );
    },
    payFn(type, item) {
      if (type == "row") {
        this.checkOpenPay(item);
      } else {
        if (!this.checkIds.length) {
          this.$elementMessage(this.$t("Please select an order first"), "error");
        } else {
          this.checkOpenPay();
        }
      }
    },
    repayFn(item) {
      this.checkOpenPay(item, "repay");
    },
    checkOpenPay(item, type) {
      let flag = 0;
      let obj = {};
      if (item) {
        if (item.isMailFree) {
           obj[item.id] = 0
        }else{
        obj[item.id] = item.shippingMethodItem
          ? item.shippingMethodItem.id
          : "";
        }

      } else {
        this.checkItems.forEach((item) => {
          if (item.shippingMethodArr && item.shippingMethodArr.length) {
            obj[item.id] = item.shippingMethodItem
              ? item.shippingMethodItem.id
              : "";
          } else {
            flag++;
          }
        });
      }
      if (flag > 0) {
        this.$elementMessage(this.$t("No logistics"), "error");
        return;
      }
      let params;
      if (type == "repay") {
        //重新支付不检查库存
        // this.openPay(obj,type);
        // return;
        params = {
          invoiceId: item.id,
        };
      } else {
        params = {
          ids: obj,
        };
      }
      this.$showLoading();
      this.$apiCall("api.ShopifyOrder.checkSkuStock", params, (r) => {
        this.$hideLoading();
        if (r.ErrorCode == "9999") {
          this.payAmount = r.Data.Results.realAmount;
          if (
            !r.Data.Results ||
            !r.Data.Results.abnormalSkus ||
            !r.Data.Results.abnormalSkus.length
          ) {
            this.openPay(obj, type);
          } else {
            //打开无库存弹层
            this.dialogCheckStock = JSON.parse(this.dialogCheckStockDefault);
            this.dialogCheckStock.params = obj;
            this.dialogCheckStock.openType = type;
            this.dialogCheckStock.items = [];
            r.Data.Results.abnormalSkus.forEach((item) => {
              if (item.items) {
                item.items.codeName = item.codeName;
                item.items.reason = item.reason;
                item.items.lackQuantity = item.lackQuantity;
                this.dialogCheckStock.items.push(item.items);
              }
            });
            this.dialogCheckStock.isShow = true;
          }
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    payCancelFn(type, item) {
      let text =this.$t("Are you sure to abandon payment for the selected order? After abandoning, the order will disappear from the list, which cannot be restored, please operate with caution");
        
      if (type == "row") {
        text = this.$t("Are you sure to abandon payment for the selected order? After abandoning, the order will disappear from the list, which cannot be restored, please operate with caution");
          
        // text = "取消支付后，该订单返回至待发起付款列表。";
        this.payCancel(type, text, item);
      } else {
        if (!this.checkIds.length) {
          this.$elementMessage(this.$t("Please select an order first"), "error");
        } else {
          this.payCancel(type, text);
        }
      }
    },
    payCancel(type, text, item) {
      this.$confirm(text, "", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "",
      })
        .then(() => {
          this.$showLoading();
          if (type == "row") {
            //取消支付
            this.$apiCall(
              "api.ShopifyOrder.cancelPay",
              {
                id: item.id,
              },
              (r) => {
                if (r.ErrorCode == "9999") {
                  this.$elementMessage("Successfully", "success");
                  this.getItem();
                } else {
                  this.$elementMessage(r.Message, "error");
                }
                this.$hideLoading();
              }
            );
          } else {
            //放弃支付
            this.$apiCall(
              "api.ShopifyOrder.cancel",
              {
                ids: this.checkIds,
              },
              (r) => {
                if (r.ErrorCode == "9999") {
                  this.$elementMessage("Successfully", "success");
                  this.getItem();
                } else {
                  this.$elementMessage(r.Message, "error");
                }
                this.$hideLoading();
              }
            );
          }
        })
        .catch(() => {});
    },
    quoteFn(type, item) {
      if (type == "row") {
        this.quote(type, item);
      } else {
        if (!this.checkIds.length) {
          this.$elementMessage(this.$t("Please select an order first"), "error");
        } else {
          this.quote();
        }
      }
    },
    quote(type, item) {
      this.$confirm(
        this.$t("Are you sure to initiate a quotation for the selected order?"),
        "",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "",
        }
      )
        .then(() => {
          let ids = [];
          if (type == "row") {
            ids.push(item.id);
          } else {
            ids = this.checkIds;
          }
          this.$showLoading();
          this.$apiCall(
            "api.ShopifyOrder.commitOffer",
            {
              ids: ids,
            },
            (r) => {
              if (r.ErrorCode == "9999") {
                this.$elementMessage("Successfully", "success");
                this.getItem();
              } else {
                this.$elementMessage(r.Message, "error");
              }
              this.$hideLoading();
            }
          );
        })
        .catch(() => {});
    },
    quoteCancelFn() {
      if (!this.checkIds.length) {
        this.$elementMessage("Please select an order first", "error");
      } else {
        this.$confirm(
        this.$t("Are you sure to abandon the quotation for the selected order? After giving up, it cannot be restored, please operate with caution"),
          "",
          {
            confirmButtonText: "Confirm",
            cancelButtonText: "Cancel",
            type: "",
          }
        )
          .then(() => {
            this.$showLoading();
            this.$apiCall(
              "api.ShopifyOrder.cancel",
              {
                ids: this.checkIds,
              },
              (r) => {
                if (r.ErrorCode == "9999") {
                  this.$elementMessage("Successfully", "success");
                  this.getItem();
                } else {
                  this.$elementMessage(r.Message, "error");
                }
                this.$hideLoading();
              }
            );
          })
          .catch(() => {});
      }
    },
    // val表示选中的表格行数据
    handleSelectionChange(val) {
      this.checkIds = [];
      this.checkItems = [];
      if (!val.length) return;
      val.forEach((item) => {
        this.checkItems.push(item);
        this.checkIds.push(item.id);
      });
    },
    dateChange() {
      if (this.filterParams.date && this.filterParams.date.length > 1) {
        this.filterParams.dateFrom = moment(this.filterParams.date[0]).format(
          "YYYY-MM-DD"
        );
        this.filterParams.dateTo = moment(this.filterParams.date[1]).format(
          "YYYY-MM-DD"
        );
        this.filterItem();
      } else {
        this.clearFilter("date");
      }
    },
    dateChange2() {
      if (this.filterParams.date2 && this.filterParams.date2.length > 1) {
        this.filterParams.dateFrom2 = moment(this.filterParams.date2[0]).format(
          "YYYY-MM-DD"
        );
        this.filterParams.dateTo2 = moment(this.filterParams.date2[1]).format(
          "YYYY-MM-DD"
        );
        this.filterItem();
      } else {
        this.clearFilter("date2");
      }
    },
    clearFilter(type) {
      switch (type) {
        case "codeName":
          this.filterParams.codeName = "";
          break;
        case "orderId":
          this.filterParams.orderId = "";
          break;
        case "receiverName":
          this.filterParams.receiverName = "";
          break;
        case "accountIds":
          this.filterParams.accountIds = "";
          break;
        case "date":
          this.filterParams.date = [];
          this.filterParams.dateFrom = "";
          this.filterParams.dateTo = "";
          break;
        case "date2":
          this.filterParams.date2 = [];
          this.filterParams.dateFrom2 = "";
          this.filterParams.dateTo2 = "";
          break;
        case "sysCode":
          this.filterParams.sysCode = "";
          break;
        default:
          this.filterParams = JSON.parse(this.filterParamsDefault);
          break;
      }
      this.filterItem();
    },
    filterItem(type) {
      if (this.$route.query.page == 1) {
        this.getItem();
      } else {
        this.$router.push({
          path: `/ordersManage/${Number(this.status)}`,
          query: {
            page: 1,
          },
        });
      }
    },
    getStore() {
      this.$apiCall("api.Invoice.findStores", {}, (r) => {
        if (r.ErrorCode == 9999) {
          this.storeList = r.Data.Results;
        } else {
          this.$message({
            message: r.Message,
            type: "error",
          });
        }
      });
    },
    gettabList() {

      switch (this.status) {
        case 1:
          this.tabList = [
            // {
            //   id: 1,
            //   name: 1,
            //   title: "Quotation to be submitted",
            // },
            {
              id: 2,
              name: 1,
              title: this.$t("Vendor quoted order"),
            },
          ];
          break;
        case 2:
          this.tabList = [
            {
              id: 3,
              name: 1,
              title: this.$t("Pending payment"),
            },
            {
              id: 22,
              name: 2,
              title: this.$t("Payment to be completed"),
            },
            {
              id: 23,
              name: 3,
              title: this.$t("Payment has not arrived"),
            },
          ];
          break;
        case 3:
          this.tabList = [
            {
              id: 5,
              name: 1,
              title: this.$t("Waiting for fulfillment"),
            },
            {
              id: 6,
              name: 2,
              title: "Fulfilled",
            },
          ];
          break;
        case 4:
          this.tabList = [
            {
              id: 8,
              name: 1,
              title: this.$t("Logistics synchronization failed"),
            },
            {
              id: 9,
              name: 2,
              title: this.$t("Unable to purchase"),
            },
            {
              id: 10,
              name: 3,
              title: this.$t("Products Off shelf"),
            },
          ];
          break;
        default:
          this.tabList = [];
          break;
      }
    },
    getCustomerAllOrderCnt() {
      this.$apiCall("api.ShopifyOrder.getCustomerAllOrderCnt", {}, (r) => {
        if (r.ErrorCode == 9999) {
          this.customerAllOrderCnt = r.Data.Results;
        } else {
          this.$message({
            message: r.Message,
            type: "error",
          });
        }
      });
    },
    customerAllOrderCntText(id) {
      let text = 0;
      if (id == 22) {
        text = this.customerAllOrderCnt.waitCustomerPayCnt
          ? this.customerAllOrderCnt.waitCustomerPayCnt
          : 0;
      } else if (id == 23) {
        text = this.customerAllOrderCnt.waitVendorConfirmCnt
          ? this.customerAllOrderCnt.waitVendorConfirmCnt
          : 0;
      } else {
        text = this.customerAllOrderCnt[id] ? this.customerAllOrderCnt[id] : 0;
      }
      return text;
    },
    getItem(s) {
      console.log(this.status, 'this.status');
      this.getStore();
      this.gettabList();
      this.getCustomerAllOrderCnt();
      this.items = [];
      let status = "",
        url = "api.ShopifyOrder.shopifyOrders",
        params,
        params1 = {
          page: this.page,
          rowsPerPage: this.rowsPerPage,
          status: status,
          timeCreatedFrom: this.filterParams.dateFrom,
          timeCreatedTo: this.filterParams.dateTo,
          accountIds: [this.filterParams.accountIds],
          orderId: this.filterParams.orderId,
          keywords: this.filterParams.codeName,
          receiverName: this.filterParams.receiverName,
        },
        params2 = {
          page: this.page,
          rowsPerPage: this.rowsPerPage,
          status: status,
          sysCode: this.filterParams.sysCode,
          dateFrom: this.filterParams.dateFrom2,
          dateTo: this.filterParams.dateTo2,
        };
      params = params1;
      if (this.status == 5) {
        //已完成
        status = 7;
      } else if (this.status == 6) {
        //查询页面
        status = "";
        params = Object.assign(params1, params2);
        params.isAll = true;
      } else {
        let item = this.tabList.filter((item) => {
          return item.name == this.activeName;
        });
        status = item[0].id;
        if (this.status == 2) {
          //付款
          if (this.activeName == 2 || this.activeName == 3) {
            status = this.activeName;
            params = params2;
            url = "api.ShopifyOrder.findByInvoice";
          }
        }
      }
      this.loading = true;
      params.status = status;
      this.$apiCall(url, params, (r) => {
        this.loading = false;
        if (r.ErrorCode == 9999) {
          this.items = r.Data.Results;
          this.items.forEach((item) => {
            if (this.status == 2 && this.activeName != 1) {
              this.countDown(item);
            }
            if (item.shippingMethodArr && item.shippingMethodArr.length) {
              this.$set(item, "shippingMethodItem", item.shippingMethodArr[0]);
              this.$set(item, "shippingMethodId", item.shippingMethodArr[0].id);
              this.$set(
                item,
                "shippingMethodFee",
                Number(item.shippingMethodArr[0].fee)
              );
            }
            this.$set(
              item,
              "shippingJsonInfo",
              item.shippingJson ? JSON.parse(item.shippingJson) : ""
            );
            if (item.items.length) {
              item.items.forEach((obj) => {
                this.$set(
                  obj,
                  "totalPrice",
                  Number(obj.vendorPrice) * Number(obj.quantity)
                );
              });
              // if(item.shippingMethodItem){//有运费加上运费
              // 	this.$set(item,"totalAllAmount",this.countTotal(item.items,'totalPrice') + Number(item.shippingMethodItem.fee));
              // }else{
              // 	this.$set(item,"totalAllAmount",this.countTotal(item.items,'totalPrice'));
              // }
            }
            // else{
            // 	if(item.shippingMethodItem){//有运费加上运费
            // 		this.$set(item,"totalAllAmount",Number(item.shippingMethodItem.fee));
            // 	}else{
            // 		this.$set(item,"totalAllAmount",0);
            // 	}
            // }
            if (item.shippingMethodItem) {
              //有运费加上运费
              this.$set(
                item,
                "totalAllAmount",
                (item.itemAmount ? Number(item.itemAmount) : 0) +
                  Number(item.shippingMethodItem.fee) + Number(item.taxAmount)
              );
            } else {
              this.$set(
                item,
                "totalAllAmount",
                item.itemAmount ? Number(item.itemAmount) + Number(item.taxAmount) : 0
              );
            }
          });

          this.total = Number(r.Data.Pagination.totalCount);
          this.totalPage = Number(r.Data.Pagination.totalPage);
          this.$getTableHeight(this);
          if (!s) this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
        } else {
          this.$message({
            message: r.Message,
            type: "error",
          });
        }
      });
    },
    countTotal(arr, keyName) {
      let $total = 0;
      $total = arr.reduce((total, currentValue, currentIndex, arr) => {
        return currentValue[keyName] ? total + currentValue[keyName] : total;
      }, 0);
      return $total;
    },
    toPage(val) {
      if (val != this.$route.query.page)
        this.$router.push({
          path: `/ordersManage/${Number(this.status)}`,
          query: {
            page: val,
          },
        });
    },
    changePageSize(val) {
      this.rowsPerPage = val;
      localStorage.setItem("c_ordersRowsPerPage", val);
      this.getItem();
    },
    gotoPage() {
      this.page = this.$route.query.page ? Number(this.$route.query.page) : 1;
      this.getItem();
    },
    handleClick(tab, event) {
      this.filterParams = JSON.parse(this.filterParamsDefault);
      this.getItem();
    },
  },
};
</script>
<style lang="scss" scoped>
.tx-middle {
  display: flex;
  align-items: center;
}
.create-order {
  padding: 0 20px;

  .template {
    color: #5c6ac4;
    text-decoration: none;
    cursor: pointer;
  }
}

.abnormal-dialog {
  padding: 0 20px;

  .btn-area {
    margin-top: 10px;
    text-align: center;
  }

  h1 {
    font-weight: 600;
    font-size: 14px;
    padding-bottom: 10px;
  }
}

.btns-wrap {
  position: absolute;
  right: 0;
}

.pay-dialog {
  .pay-info {
    padding: 15px 20px;
  }

  .pay-platform {
    .title {
      padding: 0 20px 20px;

      h3 {
        margin-right: 30px;
        font-weight: bold;
        font-size: 16px;
      }
    }

    .platform-select {
      margin: 10px 30px;

      > div {
        margin-bottom: 10px;
        border-bottom: 1px solid #ddd;
        padding-bottom: 10px;

        a {
          margin: 0 auto;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;

          span {
            color: #303133;
            font-size: 16px;
          }
        }

        a:hover {
          text-decoration: none;
          border-color: #e6a23c;
        }

        a.active {
          border-color: #e6a23c;
          text-decoration: none;

          .active {
            display: block;
          }

          .active-icon {
            display: block;
          }
        }
      }

      .dis {
        // background: rgba(0, 0, 0, 0.2);
        .disable-bonus {
          width: 20px;
          height: 20px;
          border-radius: 100%;
          border: 1px solid #ddd;
          background: #ddd;
        }

        a:hover {
          border-color: none;
        }

        a.active {
          border-color: none;
        }
      }
    }
  }

  .action {
    display: flex;
    justify-content: center;
    margin: 20px auto 10px;
  }

  .footer {
    padding: 0 20px;

    .ft {
      margin-bottom: 10px;
      font-weight: bold;
      font-size: 18xp;
    }

    .fd {
      display: flex;
      align-items: center;
      padding: 0 30px;
      height: 80px;
      border: 1px #ebeef5 solid;
      background-color: #fff;

      .icon {
        margin-right: 20px;
      }
    }
  }

  .paying {
    margin-bottom: 20px;
    padding: 20px;
    text-align: center;
    font-size: 18px;

    i {
      margin-bottom: 20px;
      font-size: 50px;
    }
  }

  .pay-success {
    text-align: center;
    padding: 20px;
    font-size: 16px;

    i {
      margin-bottom: 20px;
      color: #67c23a;
      font-size: 50px;
    }
  }

  .pay-success.error {
    i {
      margin-bottom: 20px;
      color: #f56c6c;
      font-size: 50px;
    }
  }

  .close-pay {
    padding: 20px;
    text-align: center;
  }
}
.sub-table-row {
  line-height: 30px; /* 设置子表格行高度 */
  	padding: 0;
}
.sub-table-cell {
  padding: 10px; /* 设置子表格单元格的内边距 */
}
::v-deep .el-table__expanded-cell{
  padding: 0;
}
</style>
<style>
.el-popover .items {
  max-height: 300px;
  overflow: auto;
}
</style>
