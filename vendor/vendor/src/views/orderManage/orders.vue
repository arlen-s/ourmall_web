<template>
  <div class="contentpanel my-custom-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-s-order"></i>
          <h2>{{$t('orders.title')}}</h2>
        </div>
      </div>
      <div class="right">
          <el-button
            type="primary"
            @click="batchUnbundling()"          
          >{{$t('orders.批量解绑商品')}}</el-button>        
        <template v-if="status == 2 && (activeName == 3)">
          <el-button
            type="primary"
            @click="openImport"
            :disabled="!$isRole('invoiceWaitDeliverEdit')"
          >{{$t('orders.shippinginformation')}}</el-button>
          <el-button
            type="primary"
            @click="openAuth"
            :disabled="!$isRole('invoiceWaitDeliverEdit')"
          >{{$t('orders.authorize')}}</el-button>
        </template>
        <template v-if="(status == 2 && activeName == 3) || (status == 3 && activeName == 1)">
          <el-dropdown style="margin:0 10px">
          <el-button type="primary">
            {{$t('orders.发票')}}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item > <span @click="downPdf()">{{$t('orders.下载')}}</span> </el-dropdown-item>
            <el-dropdown-item > <span @click="sendEmail()">{{$t('orders.发送邮箱')}}</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </template>
        <template v-if="status == 2 && (activeName == 1)">
          <el-button
            type="primary"
            @click="openCreate"
            :disabled="!$isRole('invoiceWaitOfferEdit')"
          >{{$t('orders.创建订单')}}</el-button>
        </template>
        <template v-if="!(status == 2 && activeName == 2)">
          <el-button type="primary" @click="exportOrder">{{$t('orders.导出订单')}}</el-button>
        </template>
        <!-- <template v-if="status == 311">
          <el-button
            type="primary"
            @click="splitOrder"
            :disabled="!$isRole('invoiceWaitPayEdit')"
          >{{$t('orders.拆分订单')}}</el-button>

        </template> -->
        <template v-if="status== 15">
          <el-button
            type="primary"
            @click="batchWareHouse"
            :disabled="!$isRole('invoiceWaitPayEdit')"
          >{{$t('orders.批量关联仓库')}}</el-button>          
        </template>
      </div>
    </div>
    <div class="pagebody" v-loading="loading" >
      <el-row :gutter="15" class="mg-b-20" type="flex" v-if="status==2 && (activeName == 3)&&(vendorId != 148982 && vendorId != 146428&& vendorId != 144875&& vendorId != 144843&& vendorId != 143779&& vendorId != 143654&& vendorId != 74)">
          <el-col :span="2">
             <el-button @click="handleTypeOrder(1)">{{$t('orders.批发单')}}({{batchNum}})</el-button>
          </el-col>
          <el-col :span="2">
            <el-button @click="handleTypeOrder(2)">{{$t('orders.自提单')}}({{offlineNum}})</el-button>            
          </el-col>
      </el-row>
      <el-row :gutter="15" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <!-- <div class="mg-b-10" v-if="status == 2 && (activeName == 3)">
										{{$t('package.当前版本支持每日拉取订单{num}单，今日剩余{num2}单',{num:$root.$children[0].vipNowDetail.orderCnt,num2:$root.$children[0].vipNowDetail.nowOrderCnt})}}
										<span v-if="isVipUp">，{{$t('package.是否需要')}} <span style="color:#5c6ac4;cursor: pointer;" @click="goToUP">{{$t('package.升级套餐')}}</span>	
										{{$t('package.增加每日订单拉取额度？')}}</span>
                  </div>-->
                  <div ref="pageFilter" class="page-filter">
                    <el-form :inline="true" size="mini">
                      <template v-if="status == 2 && (activeName == 2)">
                        <el-form-item>
                          <el-input
                            :placeholder="$t('orders.paymentCode')"
                            v-model="filterParams.sysCode"
                            clearable
                            @keyup.enter.native="filterItem"
                            @clear="clearFilter('sysCode')"
                          ></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('orders.paymentDate')">
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
                          ></el-date-picker>
                        </el-form-item>
                      </template>
                      <template v-else>
                        <el-form-item>
                          <el-input
                            :placeholder="$t('orders.third')"
                            v-model="filterParams.codeName"
                            clearable
                            @keyup.enter.native="filterItem"
                            @clear="clearFilter('codeName')"
                          ></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-input
                            :placeholder="$t('orders.orderID')"
                            v-model="filterParams.orderId"
                            clearable
                            @keyup.enter.native="filterItem"
                            @clear="clearFilter('orderId')"
                          ></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-input
                            :placeholder="$t('orders.receiver')"
                            v-model="filterParams.receiverName"
                            clearable
                            @keyup.enter.native="filterItem"
                            @clear="clearFilter('receiverName')"
                          ></el-input>
                        </el-form-item>	                        
                        <el-form-item :label="$t('orders.vendorName') + ':' ">
                          <el-select
                            filterable
                            remote
                            placeholder="all"
                            clearable
                            v-model="filterParams.relationshipId"
                            @change="filterItem"
                            @clear="clearFilter('relationshipId')"
                          >
                            <el-option
                              v-for="opt in vendorList"
                              :key="opt.id"
                              :label="opt.customerName"
                              :value="opt.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('orders.storeName') + ':' ">
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
                              :placeholder="$t('orders.paymentCode')"
                              v-model="filterParams.sysCode"
                              clearable
                              @keyup.enter.native="filterItem"
                              @clear="clearFilter('sysCode')"
                            ></el-input>
                          </el-form-item>
                          <el-form-item v-if="status != 6" :label="$t('orders.paymentDate')">
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
                            ></el-date-picker>
                          </el-form-item>
                        </template>
                        <el-form-item :label="$t('orders.CreateDate')">
                          <el-date-picker
                            value-format="yyyy-MM-dd"
                            v-model="filterParams.date"
                            @clear="clearFilter('date')"
                            @change="dateChange"
                            type="daterange"
                            align="right"
                            unlink-panels
                            start-placeholder="Start"
                            end-placeholder="End"
                          ></el-date-picker>
                        </el-form-item>
                      </template>
                      <el-form-item>
                        <el-button type="primary" @click="filterItem">{{$t('orders.filter')}}</el-button>
                        <el-button type="danger" @click="clearFilter">{{$t('orders.clear')}}</el-button>
                        <el-button
                        v-if="billStatus != 3"
                          type="primary"
                          @click="handleAllFilter"
                        >{{$t('orders.allFilter')}} </el-button>
                      </el-form-item>
                      <el-form-item style="width:200px;"></el-form-item>
                      <el-form-item class="btns-wrap">
                        <template v-if="status == 2 && activeName == 1">
                          <el-button
                            type="primary"
                            @click="quoteFn"
                            :disabled="!$isRole('invoiceWaitOfferEdit')"
                          >{{$t('orders.Made')}}</el-button>
                          <el-button
                            type="primary"
                            @click="exportFn"
                            :disabled="!$isRole('invoiceWaitOfferEdit')"
                          >{{$t('orders.导出未关联商品')}}</el-button>
                          <el-button
                            type="primary"
                            @click="importFn"
                            :disabled="!$isRole('invoiceWaitOfferEdit')"
                          >{{$t('orders.导入关联')}}</el-button>
                          <!-- <el-button type="primary" @click="quoteCancelFn" :disabled="!$isRole($route.meta.roleWrite)">{{$t('orders.Giveup')}}</el-button> -->
                        </template>
                        <template v-if="status == 2 && activeName == 2">
                          <el-button
                            type="primary"
                            @click="payFn"
                            :disabled="!$isRole('invoicePayCheckEdit')"
                          >{{$t('orders.receipt')}}</el-button>
                          <el-button
                            type="primary"
                            @click="payCancelFn"
                            :disabled="!$isRole('invoicePayCheckEdit')"
                          >{{$t('orders.notreceived')}}</el-button>
                        </template>
                        <template v-if="status == 4 && activeName == 1">
                          <el-button
                            type="primary"
                            @click="syncFn"
                            :disabled="!$isRole('invoiceAbnormalEdit')"
                          >{{$t('orders.synchronized')}}</el-button>
                        </template>
                        <template v-if="status == 4 && activeName == 2">
                          <el-button
                            type="primary"
                            @click="quoteFn"
                            :disabled="!$isRole('invoiceAbnormalEdit')"
                          >{{$t('orders.重新报价')}}</el-button>
                        </template>
                      </el-form-item>
                    </el-form>
                  </div>
                  <el-tab-pane
                    v-if="status != 2 && tabList.length"
                    v-for="(item, index) in tabList"
                    :key="index"
                    :name="item.name+''"
                  >
                    <span slot="label">
                      {{item.title}}
                      <span class="tx-danger">({{vendorAllOrderCntText(item.id)}})</span>
                    </span>
                  </el-tab-pane>
                </el-tabs>
              </el-col>
            </el-row>
            <!-- table 待处理订单   待报价 待发货-->
            <template v-if="isVipOrder">
              <div class="noVip">
                <i class="el-icon-info mg-r-10"></i>
                <!-- {{$t('package.暂无数据，该条信息可能已超{num}天，是否',{num:vipOrderReserveDay})}}
								 <span style="color:#5c6ac4;cursor: pointer;" @click="goToUP"> {{$t('package.升级套餐')}} </span>
                {{$t('package.以恢复历史数据？')}}-->
                {{$t('package.暂无数据，该条信息可能已超{num}天',{num:vipOrderReserveDay})}}
              </div>
            </template>
            <template v-else>
              <template
                v-if="(status == 2 && activeName != 2)  || (status == 4 && activeName == 1)"
              >
                <el-table
                  key="gridTable"
                  stripe
                  style="width: 100%"
                  ref="gridTable"
                  :data="items"
                  tooltip-effect="dark"
                  height="500"
                  @selection-change="handleSelectionChange"
                  :row-key="(row) => row.id"
                >
                  <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
                  <el-table-column type="expand" width="25" >
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
                        <el-table-column
                          :label="$t('orders.orderID')"
                          width='140'
                          align="left"
                        >
                        <template slot-scope="child">
                          <span>{{child.row.orderId}}</span>                                  
                        </template>
                        </el-table-column>                      
                        <el-table-column prop="" :label="$t('orders.产品图片')" 
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
                        <el-table-column prop="vendorProductName" :label="$t('orders.SKU编号/数量/名称')" 
                          width='200'
                          align="left">  
                             <template slot-scope="child">
                                  <!-- <span>{{child.row.name}}</span> -->
                          <el-link
                            type="primary"
                            v-if="child.row.isManage != 2 && !child.row.vendorPrice"
                            :disabled="!$isRole($route.meta.roleWrite)"
                            @click="unable(child.row)"
                          >{{$t('orders.tabBar5')}}</el-link>                                  
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
                          :label="$t('orders.属性值')"
                          width='180'
                          align="left"
                        >
                          <template slot-scope="child">
                            <span>{{child.row.propertyValue || '--'}}</span>                           
                          </template>
                        </el-table-column>                        
                        <el-table-column prop="vendorSku" :label="$t('orders.供应商价格')" 
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
                                  <span style="color: #F56C6C;" v-else>Please make an offer</span>
                                </span>
                          </template>                    
                        </el-table-column>                                         
                        <el-table-column
                          prop="phone"
                          :label="$t('orders.客户售价')"
                          width='200'
                          align="left"
                        >
                        <template slot-scope="child">
                          <span>{{props.row.currency}} {{Number(child.row.price).toFixed(2)}}</span>
                                  
                        </template>
                        </el-table-column>
                        <el-table-column label=""></el-table-column>
                      </el-table>
                        </template>                    
                 </el-table-column>  
                  <el-table-column :label="$t('orders.storeName')" width="150">
                    <template slot-scope="scope">
                      <span>{{scope.row.store || '---'}}</span>
                    </template>
                  </el-table-column>                                 
                  <el-table-column :label="$t('orders.third')" width="120">
                    <template slot-scope="scope">
                      <span>{{scope.row.codeName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('orders.orderID')" width="150">
                    <template slot-scope="scope">
                       <span>{{scope.row.orderId || '---'}}</span>
                    </template>
                  </el-table-column>           
                  <el-table-column :label="$t('orders.vendorName')" width="150">
                    <template slot-scope="scope">
                      <div>{{ scope.row.customer ? scope.row.customer.name : '---' }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('orders.CreateDate')" width="200">
                    <template slot-scope="scope">
                      <span>{{$moment(scope.row.timeCreated).format("ll [at] LTS") || '---'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('orders.address')" min-width="250">
                    <template slot-scope="scope">
                      <el-tooltip class="item" effect="dark" placement="right">
                        <div slot="content">
                          {{scope.row.shippingJsonInfo && scope.row.shippingJsonInfo.zip ? scope.row.shippingJsonInfo.zip : '---'}}
                          {{scope.row.shippingJsonInfo && scope.row.shippingJsonInfo.address1 ? scope.row.shippingJsonInfo.address1 : '---'}}
                          {{scope.row.shippingJsonInfo && scope.row.shippingJsonInfo.city ? scope.row.shippingJsonInfo.city : '---'}}
                          {{scope.row.shippingJsonInfo && scope.row.shippingJsonInfo.province ? scope.row.shippingJsonInfo.province : '---'}}
                          {{scope.row.shippingJsonInfo && scope.row.shippingJsonInfo.country ? scope.row.shippingJsonInfo.country : '---'}}
                        </div>
                        <span>{{scope.row.receiverAddress || '---'}}</span>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('orders.receiver')" width="150">
                    <template slot-scope="scope">
                      <span>{{scope.row.receiverName || '---'}}</span>
                    </template>
                  </el-table-column>
                  <template v-if="status == 4">
                    <el-table-column :label="$t('orders.logistics')" width="150">
                      <template slot-scope="scope">
                        <template
                          v-if="scope.row.shippingMethodArr && scope.row.shippingMethodArr.length"
                        >
                          <el-select
                            v-model="scope.row.shippingMethodId"
                            @change="filterShippingMethod($event,scope.row)"
                            size="small"
                          >
                            <el-option
                              v-for="shippingMethod in scope.row.shippingMethodArr"
                              :key="shippingMethod.id"
                              :label="`${shippingMethod.name} [${shippingMethod.agingDaysBegin?shippingMethod.agingDaysBegin:0}-${shippingMethod.agingDaysEnd?shippingMethod.agingDaysEnd:0}${$t('logistics.天')}]`"
                              :value="shippingMethod.id"
                            ></el-option>
                          </el-select>
                        </template>
                        <span v-else>---</span>
                      </template>
                    </el-table-column>
							<el-table-column :label="$t('orders.仓库')" v-if="vendorId != 148982 && vendorId != 146428&& vendorId != 144875&& vendorId != 144843&& vendorId != 143779&& vendorId != 143654&& vendorId != 74">
								<template slot-scope="scope">
									<span>{{scope.row.warehouseName || '--'}}</span>
								</template>
							</el-table-column>	                    
                    <el-table-column :label="`${$t('orders.logisticsFee')}(${$store.state.country.symbol})`" width="150">
                      <template slot-scope="scope">
                        <span v-if="scope.row.discountType == 3">
                          <span>0&nbsp;</span>
                          <span style="color: red; text-decoration:line-through;">
                            <span
                              style="color: #606266;"
                            >{{scope.row.shippingMethodItem ? scope.row.shippingMethodItem.fee : '---'}}</span>
                          </span>
                        </span>
                        <span
                          v-else
                        >{{scope.row.shippingMethodItem ? scope.row.shippingMethodItem.fee : '---'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column :label="`${$t('orders.tradeAmount')}(${$store.state.country.symbol})`" width="100">
                      <template slot-scope="scope">
                        <span v-if="scope.row.discountType">
                          <span>{{scope.row.payAmount || '---'}}&nbsp;</span>
                          <span style="color: red; text-decoration:line-through;">
                            <span style="color: #606266;">{{scope.row.realAmount || '---'}}</span>
                          </span>
                        </span>
                        <span v-else>{{scope.row.realAmount || '---'}}</span>
                      </template>
                    </el-table-column>
                  </template>
                  <template v-if="status == 2 && activeName == 1">
                    <el-table-column :label="$t('orders.offerItem')" width="150">
                      <template slot-scope="scope">
                        <span>{{scope.row.unBindQuantity || '---'}}</span>
                      </template>
                    </el-table-column>
                  </template>
							<el-table-column :label="$t('orders.仓库')" v-if="vendorId != 148982 && vendorId != 146428&& vendorId != 144875&& vendorId != 144843&& vendorId != 143779&& vendorId != 143654&& vendorId != 74">
								<template slot-scope="scope">
									<span>{{scope.row.warehouseName || '--'}}</span>
								</template>
							</el-table-column>                     
                  <template v-if="status == 2 && activeName == 3">
                    <el-table-column :label="$t('orders.logistics')" width="250">
                      <template slot-scope="scope">
                        <span>
                          {{scope.row.trackCompany ? `${scope.row.trackCompany}${scope.row.trackNumber
                          ? `:${scope.row.trackNumber} [${scope.row.agingDaysBegin?scope.row.agingDaysBegin:0}-${scope.row.agingDaysEnd?scope.row.agingDaysEnd:0}${$t('logistics.天')}]`
                          : `[${scope.row.agingDaysBegin?scope.row.agingDaysBegin:0}-${scope.row.agingDaysEnd?scope.row.agingDaysEnd:0}${$t('logistics.天')}]`}` : '---'}}
                        </span>
                      </template>
                    </el-table-column>                 
                    <el-table-column :label="`${$t('orders.logisticsFee')}(${$store.state.country.symbol})`" width="150">
                      <template slot-scope="scope">
                        <span v-if="scope.row.discountType == 3">
                          <span>0&nbsp;</span>
                          <span style="color: red; text-decoration:line-through;">
                            <span style="color: #606266;">{{scope.row.trackFee || '---'}}</span>
                          </span>
                        </span>
                        <span v-else>{{scope.row.trackFee || '---'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column :label="`${$t('orders.tradeAmount')}(${$store.state.country.symbol})`" width="100">
                      <template slot-scope="scope">
                        <span v-if="scope.row.discountType">
                          <span>{{scope.row.payAmount || '---'}}&nbsp;</span>
                          <span style="color: red; text-decoration:line-through;">
                            <span style="color: #606266;">{{scope.row.realAmount || '---'}}</span>
                          </span>
                        </span>
                        <span v-else>{{scope.row.realAmount || '---'}}</span>
                      </template>
                    </el-table-column>
                  </template>
                  <el-table-column :label="$t('orders.operate')" width="150" fixed="right">
                    <template slot-scope="scope">
                      <div>
                        <el-link
                          v-if="status == 2 && activeName == 1"
                          class="mg-r-20"
                          type="primary"
                          @click="quoteFn('row',scope.row)"
                          :disabled="!$isRole('invoiceWaitOfferEdit')"
                        >{{$t('orders.Made')}}</el-link>
                    
                        <el-link
                          v-if="status == 2 && activeName == 3"
                          class="mg-r-20"
                          type="primary"
                          @click="markShippedOpen(scope.row)"
                          :disabled="!$isRole('invoiceWaitDeliverEdit')"
                        >{{$t('orders.mark')}}</el-link>
                                                <el-link
                          v-if="(status == 2 && activeName == 3) || (status == 3 && activeName == 1)"
                          class="mg-r-20"
                          type="primary"
                          @click="downPdf(scope.row, '1')"
                        >{{$t('orders.下载发票')}}</el-link>    
                        <el-link
                          v-if="(status == 2 && activeName == 3) || (status == 3 && activeName == 1)"
                          class="mg-r-20"
                          type="primary"
                          @click="sendEmail(scope.row, '1')"
                        >{{$t('orders.发送发票到邮箱')}}</el-link>   
                        <el-link
                          v-if="status == 4"
                          class="mg-r-20"
                          type="primary"
                          @click="syncFn('row',scope.row)"
                          :disabled="!$isRole('invoiceAbnormalEdit')"
                        >{{$t('orders.synchronized')}}</el-link>
                      </div>
                    </template>
                  </el-table-column>
                  <template v-if="!(status == 2 && (activeName == 2 || activeName == 1))">
                    <el-table-column :label="$t('quotation.备注')" width="150">
                      <template slot-scope="scope">
                        <div>{{ scope.row.remark || '---'}}</div>
                      </template>
                    </el-table-column>
                  </template>
                </el-table>
              </template>
              <!-- 待确认收款 -->
              <template v-else-if="status == 2 && activeName == 2">
                <el-table
                  key="gridTable"
                  stripe
                  style="width: 100%"
                  ref="gridTable"
                  :data="items"
                  tooltip-effect="dark"
                  height="500"
                  @selection-change="handleSelectionChange"
                  :row-key="(row) => row.id"
                >
                  <!-- :selectable="selectable()" -->
                  <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
                  <el-table-column type="expand" width="25" >
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
                        <el-table-column
                          :label="$t('orders.orderID')"
                          width='140'
                          align="left"
                        >
                        <template slot-scope="child">
                          <span>{{child.row.orderId}}</span>                                  
                        </template>
                        </el-table-column>                       
                        <el-table-column prop="" :label="$t('orders.产品图片')" 
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
                        <el-table-column prop="vendorProductName" :label="$t('orders.SKU编号/数量/名称')" 
                          width='200'
                          align="left">  
                             <template slot-scope="child">
                                  <!-- <span>{{child.row.name}}</span> -->
                          <el-link
                            type="primary"
                            v-if="child.row.isManage != 2 && !child.row.vendorPrice"
                            :disabled="!$isRole($route.meta.roleWrite)"
                            @click="unable(child.row)"
                          >{{$t('orders.tabBar5')}}</el-link>                                  
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
                          :label="$t('orders.属性值')"
                          width='180'
                          align="left"
                        >
                          <template slot-scope="child">
                            <span>{{child.row.propertyValue || '--'}}</span>                           
                          </template>
                        </el-table-column>                        
                        <el-table-column prop="vendorSku" :label="$t('orders.供应商价格')" 
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
                                  <span style="color: #F56C6C;" v-else>Please make an offer</span>
                                </span>
                          </template>                    
                        </el-table-column>                                         

                        <el-table-column
                          prop="phone"
                          :label="$t('orders.客户售价')"
                          width='200'
                          align="left"
                        >
                        <template slot-scope="child">
                          <span>{{props.row.currency}} {{Number(child.row.price).toFixed(2)}}</span>
                                  
                        </template>
                        </el-table-column>
                        <!-- <el-table-column
                          prop="phone"
                          width='200'
                          align="left"
                        >
                        <template slot-scope="child">
                          <el-link
                            type="primary"
                            v-if="child.row.isManage != 2 && !child.row.vendorPrice"
                            :disabled="!$isRole($route.meta.roleWrite)"
                            @click="unable(child.row)"
                          >{{$t('orders.tabBar5')}}</el-link>
                                  
                        </template>
                        </el-table-column>                         -->
                        <el-table-column label=""></el-table-column>
                      </el-table>
                        </template>                    
                 </el-table-column>                    
                  <el-table-column label="pay code" width="300">
                    <template slot-scope="scope">
                      <span>{{scope.row.accountPayment && scope.row.accountPayment.sysCode ? scope.row.accountPayment.sysCode : '---'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="pay time" width="300">
                    <template slot-scope="scope">
                      <span>{{$moment.unix(scope.row.timeCreated).format("YYYY-MM-DD HH:mm:ss") || '---'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="`${$t('orders.tradeAmount')}(${$store.state.country.symbol})`" width="200">
                    <template slot-scope="scope">
                      <span v-if="scope.row.discountType">
                        <span>{{scope.row.payAmount || '---'}}&nbsp;</span>
                        <span style="color: red; text-decoration:line-through;">
                          <span style="color: #606266;">{{scope.row.totalAmount || '---'}}</span>
                        </span>
                      </span>
                      <span v-else>{{scope.row.realAmount || '---'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="Quantity" width="200">
                    <template slot-scope="scope">
                      <el-link
                        v-if="scope.row.shopifyOrderCnt"
                        type="primary"
                        @click="shopifyOrderCnt(scope.row)"
                      >{{scope.row.shopifyOrderCnt}}</el-link>
                      <span v-else>---</span>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column label="Status">
									<template slot-scope="scope">
										<span v-if="scope.row.accountPayment&&scope.row.accountPayment.status">{{statusPayArr[scope.row.accountPayment.status] ? statusPayArr[scope.row.accountPayment.status].text : '---'}}</span>
										<span v-else>---</span>
									</template>
                  </el-table-column>-->
                  <el-table-column :label="$t('orders.voucherUrl')">
                    <template slot-scope="scope">
                      <div class="demo-image__preview" v-if="scope.row.voucherUrl">
                        <el-image
                          style="width: 100px; height: 100px"
                          :src="scope.row.voucherUrl"
                          :preview-src-list="scope.row.voucherUrlPreview"
                        ></el-image>
                      </div>
                      <span v-else>---</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-if="activeName == 2"
                    :label="$t('orders.operate')"
                    width="120"
                    fixed="right"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-link
                          v-if="scope.row.paymentType == 1"
                          class="mg-r-20"
                          type="primary"
                          @click="payFn('row',scope.row)"
                          :disabled="!$isRole('invoicePayCheckEdit')"
                        >{{$t('orders.receipt')}}</el-link>
                        <el-link
                          v-if="scope.row.paymentType == 1"
                          class="mg-r-20"
                          type="primary"
                          @click="payCancelFn('row',scope.row)"
                          :disabled="!$isRole('invoicePayCheckEdit')"
                        >{{$t('orders.notreceived')}}</el-link>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
              <template v-else>
                <el-table
                  :key="`gridTable3${activeName}`"
                  stripe
                  style="width: 100%"
                  ref="gridTable"
                  :data="items"
                  height="500"
                  @selection-change="handleSelectionChange"
                  tooltip-effect="dark"
                  :row-key="(row) => row.id"
                >
                  <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
                  <el-table-column type="expand" width="25" >
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
                        <el-table-column
                          :label="$t('orders.orderID')"
                          width='140'
                          align="left"
                        >
                        <template slot-scope="child">
                          <span>{{child.row.orderId}}</span>                                  
                        </template>
                        </el-table-column>                       
                        <el-table-column prop="" :label="$t('orders.产品图片')" 
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
                        <el-table-column prop="vendorProductName" :label="$t('orders.SKU编号/数量/名称')" 
                          width='200'
                          align="left">  
                             <template slot-scope="child">
                                  <!-- <span>{{child.row.name}}</span> -->
                          <el-link
                            type="primary"
                            v-if="child.row.isManage != 2 && !child.row.vendorPrice"
                            :disabled="!$isRole($route.meta.roleWrite)"
                            @click="unable(child.row)"
                          >{{$t('orders.tabBar5')}}</el-link>                                  
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
                          :label="$t('orders.属性值')"
                          width='180'
                          align="left"
                        >
                          <template slot-scope="child">
                            <span>{{child.row.propertyValue || '--'}}</span>                           
                          </template>
                        </el-table-column>                        
                        <el-table-column prop="vendorSku" :label="$t('orders.供应商价格')" 
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
                                  <span style="color: #F56C6C;" v-else>Please make an offer</span>
                                </span>
                          </template>                    
                        </el-table-column>                                         

                        <el-table-column
                          prop="phone"
                          :label="$t('orders.客户售价')"
                          width='200'
                          align="left"
                        >
                        <template slot-scope="child">
                          <span>{{props.row.currency}} {{Number(child.row.price).toFixed(2)}}</span>
                                  
                        </template>
                        </el-table-column>
                        <!-- <el-table-column
                          prop="phone"
                          width='200'
                          align="left"
                        >
                        <template slot-scope="child">
                          <el-link
                            type="primary"
                            v-if="child.row.isManage != 2 && !child.row.vendorPrice"
                            :disabled="!$isRole($route.meta.roleWrite)"
                            @click="unable(child.row)"
                          >{{$t('orders.tabBar5')}}</el-link>
                                  
                        </template>
                        </el-table-column>                         -->
                        <el-table-column label=""></el-table-column>
                      </el-table>
                        </template>                    
                 </el-table-column>     
                  <el-table-column :label="$t('orders.storeName')" width="150">
                    <template slot-scope="scope">
                      <span>{{scope.row.store || '---'}}</span>
                    </template>
                  </el-table-column>                                
                  <el-table-column :label="$t('orders.third')" width="120">
                    <template slot-scope="scope">
                      <span>{{scope.row.codeName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('orders.orderID')" width="150">
                    <template slot-scope="scope">

                      <span>{{scope.row.orderId || '---'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('orders.vendorName')" width="150">
                    <template slot-scope="scope">
                      <div>{{ scope.row.customer ? scope.row.customer.name : '---'}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('orders.CreateDate')" width="200">
                    <template slot-scope="scope">
                      <span>{{$moment(scope.row.timeCreated).format("ll [at] LTS") || '---'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('orders.address')" min-width="250">
                    <template slot-scope="scope">
                      <el-tooltip class="item" effect="dark" placement="right">
                        <div slot="content">
                          {{scope.row.shippingJsonInfo && scope.row.shippingJsonInfo.zip ? scope.row.shippingJsonInfo.zip : '---'}}
                          {{scope.row.shippingJsonInfo && scope.row.shippingJsonInfo.address1 ? scope.row.shippingJsonInfo.address1 : '---'}}
                          {{scope.row.shippingJsonInfo && scope.row.shippingJsonInfo.city ? scope.row.shippingJsonInfo.city : '---'}}
                          {{scope.row.shippingJsonInfo && scope.row.shippingJsonInfo.province ? scope.row.shippingJsonInfo.province : '---'}}
                          {{scope.row.shippingJsonInfo && scope.row.shippingJsonInfo.country ? scope.row.shippingJsonInfo.country : '---'}}
                        </div>
                        <span>{{scope.row.receiverAddress || '---'}}</span>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('orders.receiver')" width="150">
                    <template slot-scope="scope">
                      <span>{{scope.row.receiverName || '---'}}</span>
                    </template>
                  </el-table-column>
                  <template v-if="activeName != 2 && activeName != 3">
                    <el-table-column :label="$t('orders.logistics')" width="250">
                      <template slot-scope="scope">
                        <span v-if="scope.row.status == 3">
                          <span v-if="scope.row.shippingMethodArr">
                            <div
                              v-if="scope.row.shippingMethodArr.length && scope.row.shippingMethodArr[0]"
                            >{{ scope.row.shippingMethodArr[0].name }} [{{scope.row.shippingMethodArr[0].agingDaysBegin?scope.row.shippingMethodArr[0].agingDaysBegin:0}}-{{scope.row.shippingMethodArr[0].agingDaysEnd?scope.row.shippingMethodArr[0].agingDaysEnd:0}}{{$t('logistics.天')}}]</div>
                            <div class="tx-middle" v-else>
                              ---
                              <i
                                @click="shippedFn(scope.row)"
                                class="el-icon-warning mg-l-5"
                                style="font-size: 20px;cursor:pointer;"
                              ></i>
                            </div>
                          </span>
                        </span>
                        <span v-else>
                          {{scope.row.trackCompany ? `${scope.row.trackCompany}${scope.row.trackNumber ?
                          `:${scope.row.trackNumber} [${scope.row.agingDaysBegin?scope.row.agingDaysBegin:0}-${scope.row.agingDaysEnd?scope.row.agingDaysEnd:0}${$t('logistics.天')}]` :
                          `[${scope.row.agingDaysBegin?scope.row.agingDaysBegin:0}-${scope.row.agingDaysEnd?scope.row.agingDaysEnd:0}${$t('logistics.天')}]`}` : '---'}}
                        </span>
                      </template>
                    </el-table-column>
							<el-table-column :label="$t('orders.仓库')" v-if="vendorId != 148982 && vendorId != 146428&& vendorId != 144875&& vendorId != 144843&& vendorId != 143779&& vendorId != 143654&& vendorId != 74">
								<template slot-scope="scope">
									<span>{{scope.row.warehouseName || '--'}}</span>
								</template>
							</el-table-column>                    
                    <el-table-column :label="`${$t('orders.logisticsFee')}(${$store.state.country.symbol})`" width="150">
                      <template slot-scope="scope">
                        <span v-if="scope.row.status == 3">
                          <span
                            v-if="scope.row.shippingMethodArr"
                          >{{scope.row.shippingMethodArr.length && scope.row.shippingMethodArr[0] ? scope.row.shippingMethodArr[0].fee : '---'}}</span>
                        </span>
                        <span v-else>
                          <span v-if="scope.row.discountType == 3">
                            <span>0&nbsp;</span>
                            <span style="color: red; text-decoration:line-through;">
                              <span style="color: #606266;">{{scope.row.trackFee || '---'}}</span>
                            </span>
                          </span>
                          <span v-else>{{scope.row.trackFee || '---'}}</span>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column :label="`${$t('orders.tradeAmount')}(${$store.state.country.symbol})`" width="150">
                      <template slot-scope="scope">
                        <span v-if="scope.row.status == 3">
                          <span v-if="scope.row.shippingMethodArr">
                            <span
                              v-if="scope.row.itemAmount"
                            >{{ scope.row.payAmount?scope.row.payAmount : scope.row.shippingMethodArr.length && scope.row.shippingMethodArr[0] ? (Number(scope.row.shippingMethodArr[0].fee) + Number(scope.row.itemAmount)).toFixed(2) : '---'}}</span>

                            <span
                              v-else
                            >{{scope.row.payAmount? scope.row.payAmount: scope.row.shippingMethodArr.length && scope.row.shippingMethodArr[0] ? Number(scope.row.shippingMethodArr[0].fee) : '---'}}</span>
                          </span>
                          <span
                            v-else
                          >{{scope.row.itemAmount ? Number(scope.row.itemAmount).toFixed(2) : '---'}}</span>
                        </span>
                        <span v-else>
                          <span v-if="scope.row.discountType">
                            <span>{{scope.row.payAmount || '---'}}&nbsp;</span>
                            <span style="color: red; text-decoration:line-through;">
                              <span
                                style="color: #606266;"
                              >{{scope.row.realAmount.toFixed(2) || '---'}}</span>
                            </span>
                          </span>
                          <span v-else>{{scope.row.realAmount.toFixed(2) || '---'}}</span>
                        </span>
                      </template>
                    </el-table-column>
                  </template>
                  <template v-if="status == 6">
                    <el-table-column :label="$t('orders.status')" width="100">
                      <template slot-scope="scope">
                        <span>{{statusArr[scope.row.status] ? statusArr[scope.row.status].text : '---'}}</span>
                      </template>
                    </el-table-column>
                  </template>
                  <template v-if="status == 311">
                    <el-table-column :label="$t('orders.payStatus')" width="250">
                      <template slot-scope="scope">
                        <div v-if="scope.row.status == 3">
                          <span>{{$t('orders.status1')}}</span>
                        </div>
                        <div v-else-if="scope.row.status == 11">
                          <span>{{$t('orders.status2')}}</span>
                        </div>
                        <div v-else>
                          <span>---</span>
                        </div>
                      </template>
                    </el-table-column>
                  </template>
                  <template v-if="status == 4 && activeName == 2">
                    <el-table-column :label="$t('orders.operate')" width="100">
                      <template slot-scope="scope">
                        <el-link
                          class="mg-r-20"
                          type="primary"
                          @click="quoteFn('row',scope.row)"
                          :disabled="!$isRole('invoiceAbnormalEdit')"
                        >{{$t('orders.重新报价')}}</el-link>
                      </template>
                    </el-table-column>
                  </template>
                  <template v-if="!(status == 2 && (activeName == 2 || activeName == 1))">
                    <el-table-column :label="$t('quotation.备注')" width="150">
                      <template slot-scope="scope">
                        <div>{{ scope.row.remark || '---'}}</div>
                      </template>
                    </el-table-column>
                  </template>
                    <el-table-column :label="$t('orders.operate')" width="150" >
                      <template slot-scope="scope">
                        <div v-if="scope.row.isFirstOrder==1"> <el-link type="primary"  @click="handleSplit(scope.row)">{{$t('orders.拆分订单')}}</el-link></div>
                          <el-link
                          class="mg-r-20"
                          type="primary"
                          @click="openCustomer(scope.row.customerUrl)"
                        >{{$t('orders.分销点付款')}}</el-link>
                      <el-link type="primary" v-if="status == 16" @click="changeAor(scope.row)">{{$t('orders.recover')}}</el-link>
                      </template>
                    </el-table-column>                  
                </el-table>
              </template>
            </template>
          </el-card>
        </el-col>
      </el-row>
      <el-row v-if="items.length" :gutter="20">
        <el-col :span="24" class="d-flex justify-content-center">
          <div>
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
    <el-backtop
      class="goto-top"
      target=".main-scroll  .el-scrollbar__wrap"
      :right="20"
      :bottom="120"
    ></el-backtop>
    <el-dialog
      :title="$t('orders.选择仓库')"
      :close-on-click-modal="false"	
      :visible.sync="dialogVisibleHouse"
      width="30%"
      @open="openStorehouse()">
    <el-row>
        <el-col>
            <el-form ref="form" :model="formHouse" label-width="100px">
  <el-form-item :label="`${$t('orders.仓库')}:`">
          <el-radio-group v-model="formHouse.type">
            <el-radio style="padding:10px;width: 100px;overflow: hidden;text-overflow: ellipsis;" v-for="item in storehouseList" :key="item.id" :label="item.id" name="type">{{item.name}}</el-radio>
          </el-radio-group>

  </el-form-item>
</el-form>
        </el-col>
    </el-row>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancelHouseDialog">{{$t('orders.取消')}}</el-button>
    <el-button type="primary" @click="buildOrder">{{$t('orders.提交')}}</el-button>
  </span>
</el-dialog>
<el-dialog
  :title="$t('orders.批量解绑商品')"
  :visible.sync="bathBundDialog"
  width="30%"
  :before-close="handleCloseBund">
  <div class="sina-box">
     <el-link type="danger" :underline="false">{{$t('orders.注意：你现在操作解绑国内，有可能会影响已付款的订单，请确认操作')}}</el-link>
    <p> </p>
    <div>
  <el-form :model="formInline" class="demo-form-inline">
      <el-form-item :label="$t('orders.下载解绑模板：')">
      <!-- <el-link type="primary"  href="./file/UnbundTemp.xlsx" target="_blank">解绑模板</el-link> -->
      <el-button type="text" @click="downloadFileBuild">{{$t('orders.解绑模板')}}</el-button>
      			        <!-- <p class="t1">
         <el-link type="primary" href="./file/UnbundTemp.xlsx" target="_blank">{{$t('orders.解绑模板')}}</el-link>
        </p> -->
      </el-form-item>
      <el-form-item :label="$t('orders.导入解绑文档')">
          <el-input
            v-model="formInline.templateFile"
            type="text"
            style="width:65%"
            auto-complete="off"
            :placeholder="$t('orders.请上传模板文件')"
            readonly="readonly">
            <el-button slot="append" type="success" @click="uploadFileClick"
              ><i class="el-icon-upload"></i> {{ $t('orders.选择本地Excel文件') }}</el-button
            >
          </el-input>
      </el-form-item>
          <input
            id="uploadFile"
            style="display: none"
            type="file"
            accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            @change="uploadExcel($event)" />
  </el-form>
    </div>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="setDialog()">{{$t('confirm')}}</el-button>
  </span>
</el-dialog>
  <el-dialog
  title="解除拆分订单"
  :visible.sync="rowData.visible"
  width="40%"
  @open="openSP()"
  :before-close="handleCloseSP">
  <div>
 <el-table
    :data="tableDataSP"
    border
     @selection-change="handleSelectionChangeSP"
    style="width: 100%">
        <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="childOrderId"
       :label="$t('Order Number')"
      width="180">
    </el-table-column>
    <el-table-column :label="$t('Created Time')" prop="timeCreated">      
    </el-table-column>
  </el-table>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleCloseSP">{{$t('取消')}}</el-button>
    <el-button type="primary" @click="saveSP">{{$t('确定')}}</el-button>
  </span>
</el-dialog>
    <dialogQuote :quoteData="dialogQuoteInfo" @openRelate="openRelate"></dialogQuote>
    <dialogRelate :relateData="dialogRelateInfo" @relateFn="relateFn"></dialogRelate>
    <dialogImport :importData="dialoImportInfo" @submitUpload="submitUpload"></dialogImport>
    <dialogCreateOrder :data="dialogCreateInfo" @createUpload="createUpload"></dialogCreateOrder>
    <dialoAuth :authData="dialoAuthInfo" @openSecretKey="openSecretKey"></dialoAuth>
    <dialogKey :keyData="dialoKeyInfo" @openAddComment="openAddComment"></dialogKey>
    <dialogLogistic :dialogLogistic="dialogLogistic"></dialogLogistic>
    <dialogAssociation :dialogAssociation="dialogAssociation"></dialogAssociation>
    <DialogEditComment :DialogEditComment="DialogEditComment"></DialogEditComment>
    <dialogMarkShipped :dialogMarkShipped="dialogMarkShipped" @saveMarkShipped="saveMarkShipped"></dialogMarkShipped>
    <orderCnt :data="dialogOrderCnt"></orderCnt>
    <dialogSplit :keyData="dialogSplitInfo" @splitOrderFn="splitOrderFn"></dialogSplit>
    <filterOrder :filterData="filterDialog" @callBackFilter="changeBackData" @callBackCloseFilter="closeFilter"></filterOrder>
		<order-fail :failData="failData" @callBackFail="changeFail"></order-fail>
  </div>
</template>

<script>
import dialogLogistic from "./dialogLogistic.vue"
import dialogAssociation from "./dialogAssociation.vue"
import dialogQuote from "./dialogQuote.vue"
import dialogRelate from "./dialogRelate.vue"
import dialogImport from "./dialogImport.vue"
import dialogCreateOrder from "./dialogCreateOrder.vue"
import dialoAuth from "./dialoAuth.vue"
import dialogKey from "./dialogKey.vue"
import DialogEditComment from "./DialogEditComment.vue"
import dialogMarkShipped from "./dialogMarkShipped.vue"
import orderCnt from "./dialogOrderCnt.vue"
import filterOrder from "./filterOrder.vue"
import orderFail from './orderFail.vue'
import dialogSplit from "./dialogSplit.vue"
import FileSaver from 'file-saver';
import axios from 'axios';

export default {
  data () {
    return {
      host: location.host,
      dialogVisibleHouse:false,
      formHouse: {
          type: ''
      
      },
       tableDataSP: [],
 multipleSelectionSP: [],
      formInline: {
        templateFile: '',
      },
      rowData: {
        visible: false,
        customerId: '',
        accountId: '',
        parentOrderId: '',
      },
      afterData:{
        dialogVisible:false,  
        shopifyAccountId: "",
        orderId: ''
      },
      isExpansion: true,
      bathBundDialog: false,
      batchNum: 0,
      offlineNum: 0,
      vipOrderReserveDay: this.$root.$children[0].vipNowData.orderReserveDay, 
      isVipUp: false,
      loading: false,                                                            
       vendorId: localStorage.getItem('vendorId'),
      filterDialog: {
        isShowDialog: false,
        obj:{}
      },
      failData: {
        isShowDialog: false,
        obj: {}
      },
      billStatus: 1,
      tableHeight: 400,
      reSizeTime: 0,
      batchType: 1,
      pageSizes: [10, 20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("ordersRowsPerPage") ?
        Number(localStorage.getItem("ordersRowsPerPage")) : 10,
      items: [],
      total: 0,
      totalPage: 0,
      status: this.$route.params.status ? Number(this.$route.params.status) : 1,
      activeName: "1",
      tabList: [],
      storeList: [],
      vendorList: [],
      checkIds: [],
      checkItems: [],
      vendorAllOrderCnt: {},
      filterParams: {
        date: [],
        dateFrom: "",
        dateTo: "",
        date2: [],
        dateFrom2: "",
        dateTo2: "",
        accountIds: "",
        relationshipId: "",
        orderId: "",
        codeName: "",
        receiverName: "",
        sysCode: "",
      },
      filterParamsDefault: "{}",
      dialogAssociationDefault: "{}",
      dialogAssociation: {
        isShow: false,
        hasProduct: false
      },
      dialogLogisticDefault: "{}",
      dialogLogistic: {
        isShow: false,
        errorType: null,
        items: [],
        max: '',
        min: ''
      },
      dialogQuoteInfo: {
        isShow: false,
        loading: false,
        items: [],
      },
      dialogQuoteInfoDefault: "{}",
      dialogRelateInfo: {
        isShow: false,
        loading: false,
        items: [],
        Pagination: {},
        item: "",
        list: [],
      },
      dialogRelateInfoDefault: "{}",
      dialogSplitInfo: {
        isShow: false,
        loading: false,
        items: [],
      },
      dialogSplitInfoDefault: "{}",
      dialoImportInfo: {
        isShow: false,
        loading: false,
      },
      dialogImportInfoDefault: "{}",
      dialoAuthInfo: {
        isShow: false,
        loading: false,
        shopData: []
      },
      dialogAuthInfoDefault: "{}",
      dialogCreateInfo: {
        isShow: false,
        loading: false,
      },
      dialogCreateInfoDefault: "{}",
      dialoKeyInfo: {
        isShow: false,
        loading: false,
      },
      dialogKeyInfoDefault: "{}",
      DialogEditComment: {
        loading: false,
        uploadLoading: false,
        visible: false,
        contents: "",
        shopName: "",
        attach: [],
        commentId: "",
        item: null,
      },
      DialogEditCommentDefault: "{}",
      dialogMarkShipped: {
        isShow: false,
        loading: false,
        trackNumber: "",
        trackCompany: "",
        realCompany: "",
        item: null,
        shopifyCompany: [],
        trackKey: "",
        trackUrl: "",
      },
      dialogMarkShippedDefault: "{}",
      dialogOrderCnt: {
        isShow: false,
        items: []
      },
      statusArr: { //状态
        1: { text: this.$t('orders.tabBar14'), type: 'warning', val: 1, },
        2: { text: this.$t('orders.tabBar1'), type: 'warning', val: 2, },
        3: { text: this.$t('orders.tabBar13'), type: 'warning', val: 3, },
        4: { text: this.$t('orders.tabBar2'), type: 'warning', val: 4, },
        5: { text: this.$t('orders.tabBar3'), type: 'warning', val: 5, },
        6: { text: this.$t('orders.ordersMenu2'), type: 'success', val: 6, },
        7: { text: this.$t('orders.ordersMenu4'), type: 'success', val: 7, },
        8: { text: this.$t('orders.tabBar4'), type: 'info', val: 8, },
        9: { text: this.$t('orders.tabBar5'), type: 'info', val: 9, },
        10: { text: this.$t('orders.tabBar6'), type: 'info', val: 10, },
        11: { text: this.$t('orders.tabBar11'), type: 'info', val: 11, },
        12: { text: this.$t('orders.tabBar12'), type: 'info', val: 12, },
        14: { text: this.$t('orders.tabBar144'), type: 'info', val: 14, },
      },
      storehouseList: [],

      statusPayArr: { //状态
        1: { text: this.$t('orders.obligation'), type: 'danger', val: 1, },
        4: { text: this.$t('orders.payFail'), type: 'warning', val: 4, },
        5: { text: this.$t('orders.suppliernot'), type: 'warning', val: 5, },
      },
      checkIds: [],
      checkItems: [],
    }
  },
  computed: {
    isVipOrder () {
      let isVip = false
      if (this.filterParams.date[0] && this.GetDateStr(this.vipOrderReserveDay) >= new Date(this.filterParams.date[0]).getTime()) {
        if (this.vipOrderReserveDay == 0) {
          isVip = false
        } else {
          isVip = true
        }
      }
      else {
        isVip = false
      }

      return isVip
    },

  },
  components: {
    dialogAssociation,
    dialogLogistic,
    dialogQuote,
    dialogRelate,
    dialogImport,
    dialogCreateOrder,
    dialoAuth,
    dialogKey,
    DialogEditComment,
    dialogMarkShipped,
    orderCnt,
    dialogSplit,
    filterOrder,
    orderFail
  },
  watch: {
    status () {
      this.$refs.gridTable.clearSelection()
      this.filterParams = JSON.parse(this.filterParamsDefault)
      this.activeName = this.$route.params.active
    },
    $route (to, from) {
      // 对路由变化作出响应...
      this.activeName = this.$route.params.active
      this.status = this.$route.params.status ? Number(this.$route.params.status) : 1
      if (to.params.status !== from.params.status) {//切换左边菜单清空搜索条件
        this.filterParams = JSON.parse(this.filterParamsDefault)
      this.batchType =1
      }
      this.vipOrderReserveDay = this.$root.$children[0].vipNowData.orderReserveDay
      this.changeRole()
      this.gotoPage()
    },
    activeName () {
      this.$refs.gridTable.clearSelection()
      this.toPage(1)
    },
  },
  created () {

  },
  mounted () {
    this.isVip()
    // if(this.$route.query.type){
    // 	this.activeName =  String(this.$route.query.type)
    // }
        // console.log(this.getStatus(), 'sdadaadda1474');
    this.activeName = this.$route.params.active
    this.changeRole()
    this.batchType = 1
    // this.getVipArray();
    this.filterParamsDefault = JSON.stringify(this.filterParams)
    this.dialogAssociationDefault = JSON.stringify(this.dialogAssociation)
    this.dialogQuoteInfoDefault = JSON.stringify(this.dialogQuoteInfo)
    this.dialogLogisticDefault = JSON.stringify(this.dialogLogistic)
    this.dialogRelateInfoDefault = JSON.stringify(this.dialogRelateInfo)
    this.dialogImportInfoDefault = JSON.stringify(this.dialoImportInfo)
    this.dialogCreateInfoDefault = JSON.stringify(this.dialogCreateInfo)
    this.dialogAuthInfoDefault = JSON.stringify(this.dialoAuthInfo)
    this.dialogKeyInfoDefault = JSON.stringify(this.dialoKeyInfo)
    this.DialogEditCommentDefault = JSON.stringify(this.DialogEditComment)
    this.dialogMarkShippedDefault = JSON.stringify(this.dialogMarkShipped)
    this.dialogSplitInfoDefault = JSON.stringify(this.dialogSplitInfo)

    this.getItem()
  },
  beforeDestroy () { },
  methods: {
    splitOrder () {
      if (!this.checkIds.length) {
        this.$elementMessage("Please select an order first", "error")
        return
      };
      this.dialogSplitInfo.isShow = true
      this.checkItems.forEach(item => {
        item.items.forEach(obj => {
          this.$set(obj, "qty", Number(obj.quantity))
          this.$set(obj, "totalWe", (Number(obj.quantity) * Number(obj.vendorProductWeight)).toFixed(2))
        })
      })
      this.dialogSplitInfo.items = this.checkItems
    },
    handleSplit(row){
      this.rowData = {
        visible: true,
        customerId: row.customerId,
        accountId: row.shopifyAccountId,
        parentOrderId: row.orderId,
      }

    },
    changeAor (row) {
      this.$apiCall(
        "api.ShopifyOrder.orderStatusChange",
        {

          orderId: row.orderId,
          type: 3,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            if (r.Message == 'SUCCESS') {
              this.getItem()
            }
          } else {
            this.$message.error(r.Message)
          }
        }
      )
    },    
    success(){
      this.rowData = {
        visible: false,
        customerId: '',
        accountId: '',
        parentOrderId: '',
      }
      this.getItem()
    },
    batchUnbundling(){
        this.bathBundDialog = true
    },
    handleCloseBund(){
      this.bathBundDialog = false
       this.formInline.templateFile = ''
    },
    handleCloseSP(){
      this.success()
    },
    handleSelectionChangeSP(val) {
        this.multipleSelectionSP = val;
      },
      saveSP(){
        if ( !this.multipleSelectionSP.length ) {
          this.$elementMessage(this.$t("Please select an order first"), "error");
          return
        }
          this.$apiCall("api.OrderMerge.cancelMerge", {cancelList: this.multipleSelectionSP.map(item=>{return item.id})}, (r) => {
          if (r.ErrorCode == 9999) {
              this.success()
              } else {
                this.$message({
                  message: r.Message,
                  type: "error"
                })
            }
        })
},
    openSP(){
              let params = {
        accountId: this.rowData.accountId,
        parentOrderId: this.rowData.parentOrderId,
        customerId: this.rowData.customerId,
      }
            this.$apiCall("api.OrderMerge.getList", params, (r) => {
        if (r.ErrorCode == 9999) {
        this.tableDataSP = r.Data.Results
        } else {
          this.$message({
            message: r.Message,
            type: "error"
          })
        }
      })   
    },

    /** 表格展开与关闭 */
    toggleRowExpansion(){
      if(this.items.length){
        this.isExpansion = !this.isExpansion;
        this.toggleRowExpansionAll(this.items, this.isExpansion);
      }
    },
    toggleRowExpansionAll(data, isExpansion) {
      // console.log(data, 'datas');
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
     downloadFileBuild(){
      //  const excelPath = '/file/importGood.xlsx';
      //  FileSaver.saveAs(excelPath);
      // const excelPath = '/file/importGood.xlsx';
      // const downloadLink = document.createElement('a');
      // downloadLink.href = `${excelPath}`;
      // downloadLink.download = 'my-excel-file.xlsx';
      // downloadLink.click();
     const excelUrl = '/file/UnbundTemp.xlsx';

      fetch(excelUrl)
        .then((response) => response.blob())
        .then((excelData) => {
          // 保存 Excel 文件
          const excelFile = new File([excelData], 'my-excel-file.xlsx', {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });

          FileSaver.saveAs(excelFile);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    uploadFileClick(){
      document.getElementById('uploadFile').click()
    },
    setDialog(){
      if (this.formInline.templateFile.length == 0) {
        this.$message.error('请上传文件')
        return false
      }    
      let fileData  = document.getElementById('uploadFile').files[0]
      console.log(fileData, 'this.formInline.templateFile.');  
      // let form = new FormData()
      // form.append('file', fileData)
            let param = {
        "@file": fileData,
      }
      this.$apiCall("api.ShopifyOrder.cancelRelationships", param, (r) => {
        if (r.ErrorCode == 9999) {
          this.$message.success('Binding succeeded!');
          this.bathBundDialog = false
          this.formInline.templateFile = ''
          this.getItem()
        } else {
          this.$message({
            message: r.Message,
            type: "error"
          })
        }
      })      
    },
    uploadExcel(event) {
      let _this = this
      let file = event.currentTarget.files[0]
      _this.formInline.templateFile = file.name
    },    
    batchWareHouse(){        
        if (this.checkIds.length == 0) {
          this.$message.error('Please select an order')
          return
        }
        this.dialogVisibleHouse = true
    },
    cancelHouseDialog(){
          this.dialogVisibleHouse = false
          this.formHouse.type = []
    },
    buildOrder(){
          let params = {
            id: this.checkIds,
            warehouseId: Number(this.formHouse.type) 
          }
      this.$apiCall("api.ShopifyOrder.orderChooseWarehouse", params, (r) => {
        if (r.ErrorCode == 9999) {
          this.$message.success('Binding succeeded!');
          this.dialogVisibleHouse = false
          this.formHouse.type = []
          this.checkIds = []
          this.getItem()
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
    splitOrderFn (params) {
      this.$showLoading()
      this.$apiCall("api.ShopifyOrder.splitShopifyOrder", params, (r) => {
        if (r.ErrorCode == "9999") {
          this.$elementMessage(this.$t("orders.success"), "success")
          this.dialogSplitInfo = JSON.parse(this.dialogSplitInfoDefault)
          this.$refs.gridTable.clearSelection()
          this.getItem()
        } else {
          this.$elementMessage(r.Message, "error")
          if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
            this.$userFailure(this)
          }
        }
        this.$hideLoading()
      })
    },
    exportOrder () {
      if (!this.checkIds.length) this.$elementMessage("Please select an order first", "error")
      this.$showLoading()
      if ($("#ifilePro").length == 0) {
        $("body").append(
          '<iframe id="ifilePro" style="display:none"></iframe>'
        )
      }
      let openDownload = url => {
        document.getElementById("ifilePro").src = url
      }
      let apiUrl = "api.ShopifyOrder.exportShopifyOrder2"
      this.$apiCall(apiUrl, {
        idList: this.checkIds
      }, r => {
        if (r.ErrorCode == "9999") {
          this.$elementMessage(this.$t('orders.success'), 'success')
          openDownload(r.Data.Results)
        } else {
          this.$elementMessage(r.Message, 'error')
          if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
            this.$userFailure(this)
          }
        }
        this.$hideLoading()
      })
    },
    shippedFn (row) {
      this.dialogLogistic.errorType = row.shippingMethodArr.errorType
      if (row.shippingMethodArr.errorSkuList) {
        this.dialogLogistic.items = row.shippingMethodArr.errorSkuList
      }
      this.dialogLogistic.max = row.shippingMethodArr.max
      this.dialogLogistic.min = row.shippingMethodArr.min
      this.dialogLogistic.isShow = true
    },
    importFn () {
      this.$apiCall('api.ShopifyOrder.getWaitBindItem', {}, (r) => {
        if (r.ErrorCode == 9999) {
          if (r.Data.Results.length > 0) {
            this.dialogAssociation.hasProduct = true
          }
          this.dialogAssociation.isShow = true
        } else {
          this.$elementMessage(r.Message, 'error')
        }
      })
    },
    exportFn () {
      if (!this.checkIds.length) {
        this.$elementMessage(this.$t('orders.selectOrder'), 'error')
        return
      }
      this.$apiCall('api.ShopifyOrder.exportNotBindItem', {
        ids: this.checkIds
      }, (r) => {
        if (r.ErrorCode == 9999) {
          window.open(r.Data.Results)
          this.$refs.gridTable.clearSelection()
          this.checkIds = []
        } else {
          this.$elementMessage(r.Message, 'error')
        }
      })
    },
    openCustomer(link){
      console.log(link, '333');
      window.open(link, '_blank', 'my-window')
    },
    unable (i) {
      this.$confirm(this.$t('orders.确定将该商品无法采购?'), 'Tips', {
        confirmButtonText: this.$t('shop.确定'),
        cancelButtonText: this.$t('shop.取消'),
        type: "warning",
      }).then(() => {
        this.$apiCall('api.ShopifyOrder.setUnableToPurchase', {
          itemId: i.id
        }, r => {
          if (r.ErrorCode == 9999) {
            this.getItem()
            this.$elementMessage(this.$t('orders.已添加到无法采购'), "success")
          } else {
            this.$elementMessage(r.Message, "error")
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('orders.已取消')
        })
      })

    },
    show (row) {
      this.$refs['popover' + row.orderId].showPopper = true
      this.$nextTick(() => {
        this.$refs['popover' + row.orderId].updatePopper()
      })
    },
    enter (row) {
      this.show(row)
    },
    leave (row) {
      this.$refs['popover' + row.orderId].showPopper = false
    },
    // getVipArray() {	
    // 	this.$apiCall('api.Admin.getVipArray',{},r=>{
    // 		if(r.ErrorCode == 9999){
    //             let vipList = r.Data.Results;
    // 			this.vipOrderReserveDay = vipList[this.$store.state.userInfo.vipType].orderReserveDay;
    // 		}
    // 	});
    // },
    changeRole () {
      if (!this.$route.params.status || this.$route.params.status == 2) {
        this.$route.meta.roleWrite = 'invoiceWaitEdit'
      } else if (this.$route.params.status == 3) {
        this.$route.meta.roleWrite = 'invoiceDeliverEdit'
      } else if (this.$route.params.status == 4) {
        this.$route.meta.roleWrite = 'invoiceAbnormalEdit'
      } else if (this.$route.params.status == 5) {
        this.$route.meta.roleWrite = 'invoiceCompleteEdit'
      } else if (this.$route.params.status == 6) {
        this.$route.meta.roleWrite = 'invoiceAllEdit'
      }
    },
    handleTypeOrder(type){
        this.batchType = type
        this.getItem()
    },
    GetDateStr (AddDayCount) {
      var dd = new Date()
      dd.setDate(dd.getDate() - AddDayCount) //获取AddDayCount天后的日期
      // var  y = dd.getFullYear(); 
      // var  m = (dd.getMonth()+1)<10? "0" +(dd.getMonth()+1):(dd.getMonth()+1); //获取当前月份的日期，不足10补0
      // var  d = dd.getDate()<10? "0" +dd.getDate():dd.getDate(); //获取当前几号，不足10补0
      // return  y+ "-" +m+ "-" +d;
      return dd.getTime()
    },
    isVip () {
      this.$apiCall('api.Admin.getWaitShopifyOrder', {}, r => {
        if (r.ErrorCode == 9999) {
          this.isVipUp = r.Data.Results
        }
      })
    },
    handleAllFilter () {
      this.filterDialog.isShowDialog = true
    },
    goToUP () {
      this.$router.push({
        name: "pricingUp"
      })
    },
    shopifyOrderCnt (item) {
      this.$showLoading()
      this.$apiCall("api.ShopifyOrder.findByVendor", {
        invoiceId: item.id
      }, (r) => {
        if (r.ErrorCode == "9999") {
          if (r.Data.Results.length) {
            r.Data.Results.forEach(item => {
              this.$set(item, "shippingJsonInfo", item.shippingJson ? JSON.parse(item.shippingJson) : "")
            })
          }
          this.dialogOrderCnt.items = r.Data.Results
          this.dialogOrderCnt.isShow = true
        } else {
          this.$elementMessage(r.Message, "error")
        }
        this.$hideLoading()
      })
    },
    selectable (row, index) {
      setTimeout(() => {
        if (!row || !row.paymentType || row.paymentType != 1) {
          return false
        } else {
          return true
        }
      }, 1000)
    },
    async saveMarkShipped () {
      this.dialogMarkShipped.loading = true
      let paramsList = []
      let resList = []
      console.log(464646464,this.dialogMarkShipped.item);
      let ids = this.dialogMarkShipped.item.items.map(item => { return { id: item.id, isManage: item.isManage } })

      for (let i = 0; i < ids.length; i++) {
        // if (ids[i].isManage == 1) {
          paramsList.push(ids[i])
          
          await this.saveMarkShippedItem(ids[i].id).then((res) => {
            resList.push(res)
          })
        // }
      }
      if (resList.length == paramsList.length) {
        this.$elementMessage(this.$t('orders.success'), "success")
        this.dialogMarkShipped.isShow = false
        this.getItem()
      }
    },
    saveMarkShippedItem (id) {
      return new Promise((resolve, reject) => {
        this.$apiCall("api.ShopifyOrder.changeDeliver", {
          itemId: id,
          trackNumber: this.dialogMarkShipped.trackNumber,
          trackCompany: this.dialogMarkShipped.trackCompany,
          //					realCompany: this.dialogMarkShipped.realCompany,
          trackKey: this.dialogMarkShipped.trackKey,
          trackUrl: this.dialogMarkShipped.trackUrl,
        }, (r) => {
          if (r.ErrorCode == "9999") {
            resolve(id)
          } else {
            reject(id)
          }
        })
      })
    },
    downPdf(row, type){
      let params = []
      if (type) {
      params = [{accountId:row.shopifyAccountId,orderId:row.orderId}]
      }else{
      if (!this.checkIds.length) this.$elementMessage("Please select an order first", "error")
      this.$showLoading()
      params = this.checkItems.map(item=>{
          let itemT = {
              accountId:item.shopifyAccountId,orderId:item.orderId
          }
          return itemT
      })
      }
     this.$apiCall("api.BillSet.exportBill",{orderInfo:params} , (r) => {
        if (r.ErrorCode == "9999") {
    let a = document.createElement('a')
    a.href = r.Data.Results.url;
    a.click();
        } else {
          this.$elementMessage(r.Message, "error")
        }
         this.$hideLoading()
      })
    },
    sendEmail(row, type) {
      let params = []
      if (type) {
      params = [{accountId:row.shopifyAccountId,orderId:row.orderId}]
      }else{
      if (!this.checkIds.length){
        this.$elementMessage("Please select an order first", "error")
        return
      } 
      this.$showLoading()
      console.log(this.checkItems, '111');
      params = this.checkItems.map(item=>{
          let itemT = {
              accountId:item.shopifyAccountId,orderId:item.orderId,
          }
          return itemT
      })
      }
     this.$apiCall("api.BillSet.exportBill",{orderInfo:params,isSend: 1} , (r) => {
        if (r.ErrorCode == "9999") {
          this.$elementMessage('send success', "success")  
        } else {
          this.$elementMessage(r.Message, "error")
        }
         this.$hideLoading()
      })
    },
    markShippedOpen (item) {
      this.dialogMarkShipped = JSON.parse(this.dialogMarkShippedDefault)
      this.$showLoading()
      this.$apiCall("api.Invoice.getShopifyCompany", {}, (r) => {
        this.$hideLoading()
        if (r.ErrorCode == "9999") {
          this.dialogMarkShipped.shopifyCompany = r.Data.Results
          this.dialogMarkShipped.isShow = true
          this.dialogMarkShipped.item = item
        } else {
          this.$elementMessage(r.Message, "error")
        }
      })
    },
		changeFail(v){
				this.failData.isShowDialog = false
		},
    openAddComment () {
      //打开新建工单
      if (this.$refs.uploadFile) this.$refs.uploadFile.clearFiles()
      this.DialogEditComment = JSON.parse(this.DialogEditCommentDefault)
      this.DialogEditComment.visible = true
    },
    openSecretKey () {
      this.dialoKeyInfo = JSON.parse(this.dialogKeyInfoDefault)
      this.dialoKeyInfo.isShow = true
    },
    openAuth () {
      this.dialoAuthInfo = JSON.parse(this.dialogAuthInfoDefault)
      this.dialoAuthInfo.shopData = localStorage.getItem("userInfo") ?
        JSON.parse(localStorage.getItem("userInfo")).erpShops : []
      this.dialoAuthInfo.isShow = true
    },
    submitUpload (uploadFile) {
      this.$showLoading()
      if ($("#ifilePro").length == 0) {
        $("body").append(
          '<iframe id="ifilePro" style="display:none"></iframe>'
        )
      }
      let openDownload = (url) => {
        document.getElementById("ifilePro").src = url
      }
      let apiUrl = "api.ShopifyOrder.deliverImportNew"
      let param = {
        "@file": uploadFile,
      }
      this.$apiCall(apiUrl, param, (r) => {
        if (r.ErrorCode == "9999") {
          this.$elementMessage(this.$t("invoice.successImport"), "success")
          openDownload(r.Data.Results.file)
          this.dialoImportInfo = JSON.parse(this.dialogImportInfoDefault)
          this.getItem()
        } else {
          this.$elementMessage(r.Message, "error")
          if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
            this.$userFailure(this)
          }
        }
        this.$hideLoading()
      })
    },
    createUpload (uploadFile) {
      //    手工创建订单
      this.$showLoading()
      if ($("#ifileProCreate").length == 0) {
        $("body").append(
          '<iframe id="ifileProCreate" style="display:none"></iframe>'
        )
      }
      let openDownload = (url) => {
        document.getElementById("ifileProCreate").src = url
      }
      let apiUrl = "api.ShopifyOrder.importOrderExcel"
      let param = {
        "@file": uploadFile,
      }
      this.$apiCall(apiUrl, param, (r) => {
        if (r.ErrorCode == "9999") {
          this.$elementMessage('创建成功', "success")
          openDownload(r.Data.Results.file)
          this.dialogCreateInfo = JSON.stringify(this.dialogCreateInfoDefault)
          this.getItem()
        } else {
          this.$elementMessage(r.Message, "error")
          if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
            this.$userFailure(this)
          }
        }
        this.$hideLoading()
      })

    },
    openImport () {
      this.dialoImportInfo = JSON.parse(this.dialogImportInfoDefault)
      this.dialoImportInfo.isShow = true
    },
    openCreate () {
      this.dialogCreateInfo = JSON.parse(this.dialogCreateInfoDefault)
      this.dialogCreateInfo.isShow = true
    },
    relateFn (sku) {
      this.$showLoading()
      console.log(sku.sku, 'sku.sku');
      this.$apiCall("api.ShopifyOrder.setSkuRelation", {
        customerSku: this.dialogRelateInfo.item.variableId,
        customerId: this.dialogRelateInfo.item.customerId,
        vendorSku: sku.sku,
        warehouseId: sku.Hid
      }, (r) => {
        if (r.ErrorCode == "9999") {
          this.$elementMessage(this.$t('orders.success'), "success")
          this.dialogQuoteInfo = JSON.parse(this.dialogQuoteInfoDefault)
          this.dialogRelateInfo = JSON.parse(this.dialogRelateInfoDefault)
          this.$refs.gridTable.clearSelection()
          this.getItem()
        } else {
          this.$elementMessage(r.Message, "error")
        }
        this.$hideLoading()
      })
    },
    openRelate (item) {
      this.$showLoading()
      this.$apiCall("api.VendorShop.vendorFindProducts", {
        page: 1,
        rowsPerPage: 10,
        status: 1
      }, (r) => {
        if (r.ErrorCode == "9999") {
          // this.$elementMessage(this.$t('orders.success'), "success");
          if (!r.Data.Results.products || !r.Data.Results.products.length) return
          this.dialogRelateInfo = JSON.parse(this.dialogRelateInfoDefault)
          this.dialogRelateInfo.isShow = true
          this.dialogRelateInfo.item = item
          this.dialogRelateInfo.Pagination = r.Data.Pagination
          this.dialogRelateInfo.items = []
          this.dialogRelateInfo.list = []
          r.Data.Results.products.forEach(item1 => {
            if (item1.stocks && item1.stocks.length) {
              item1.stocks.forEach(obj => {
                this.$set(obj, "name", item1.name)
                this.dialogRelateInfo.items.push(obj)
              })
            }
            this.dialogRelateInfo.list.push(item1)
          })
        } else {
          this.$elementMessage(r.Message, "error")
        }
        this.$hideLoading()
      })
    },
    syncFn (type, item) {
      if (type == 'row') {
        this.sync(type, item)
      } else {
        if (!this.checkIds.length) {
          this.$elementMessage(this.$t('orders.selectOrder'), 'error')
        } else {
          this.sync()
        }
      }
    },
    sync (type, item) {
      let ids = []
      if (type == 'row') {
        ids.push(item.id)
      } else {
        ids = this.checkIds
      }
      this.$showLoading()
      this.$apiCall("api.ShopifyOrder.setNotAbnormal", { ids: ids }, (r) => {
        if (r.ErrorCode == "9999") {
          this.$elementMessage(this.$t('orders.success'), "success")
          this.getItem()
        } else {
          this.$elementMessage(r.Message, "error")
        }
        this.$hideLoading()
      })
    },
    payFn (type, item) {
      if (type == 'row') {
        this.pay(type, item)
      } else {
        if (!this.checkIds.length) {
          this.$elementMessage(this.$t('orders.selectOrder'), 'error')
        } else {
          let flag = 0
          this.checkItems.forEach(item => {
            if (item.paymentType == 1) {
              flag++
            }
          })
          if (flag == this.checkIds.length) {
            this.pay()
          } else {
            this.$elementMessage("只有线下付款的订单支持确认收款", 'error')
          }
        }
      }
    },
    pay (type, item) {
      this.$confirm(this.$t('orders.confirmRe'), "", {
        confirmButtonText: this.$t('orders.confirm'),
        cancelButtonText: this.$t('orders.cancel'),
        type: ''
      }).then(() => {
        let ids = []
        if (type == 'row') {
          ids.push(item.id)
        } else {
          ids = this.checkIds
        }
        this.payConfirm(ids)
      }).catch(() => {

      })
    },
    async payConfirm (ids) {
      this.$showLoading()
      let resList = []
      for (let i = 0; i < ids.length; i++) {
        await this.payConfirmItem(ids[i]).then((res) => {
          resList.push(res)
        })
      }
      if (resList.length == ids.length) {
        this.$elementMessage(this.$t('orders.success'), "success")
        this.$hideLoading()
        this.getItem()
      }
    },
    payConfirmItem (id) {
      return new Promise((resolve, reject) => {
        this.$apiCall("api.ShopifyOrder.setPaid", {
          id: id
        }, (r) => {
          if (r.ErrorCode == "9999") {
            resolve(id)
          } else {
            this.$hideLoading()
            this.$elementMessage(r.Message, "error")
            reject(id)
          }
        })
      })
    },
    payCancelFn (type, item) {
      if (type == 'row') {
        this.payCancel(type, item)
      } else {
        if (!this.checkIds.length) {
          this.$elementMessage(this.$t('orders.selectOrder'), 'error')
        } else {
          this.payCancel()
        }
      }
    },
    payCancel (type, item) {
      this.$confirm(this.$t('orders.payagain'), "", {
        confirmButtonText: this.$t('orders.confirm'),
        cancelButtonText: this.$t('orders.cancel'),
        type: ''
      }).then(() => {
        let ids = []
        if (type == 'row') {
          ids.push(item.id)
        } else {
          ids = this.checkIds
        }
        this.payCanceled(ids)
      }).catch(() => {

      })
    },
    async payCanceled (ids) {
      this.$showLoading()
      let resList = []
      for (let i = 0; i < ids.length; i++) {
        await this.payCancelItem(ids[i]).then((res) => {
          resList.push(res)
        })
      }
      if (resList.length == ids.length) {
        this.$elementMessage(this.$t('orders.success'), "success")
        this.$hideLoading()
        this.getItem()
      }
    },
    payCancelItem (id) {
      return new Promise((resolve, reject) => {
        this.$apiCall("api.ShopifyOrder.setNotPaid", {
          id: id
        }, (r) => {
          if (r.ErrorCode == "9999") {
            resolve(id)
          } else {
            this.$hideLoading()
            this.$elementMessage(r.Message, "error")
            reject(id)
          }
        })
      })
    },
    quoteFn (type, item) {
      if (type == 'row') {
        this.quote(type, item)
      } else {
        if (!this.checkIds.length) {
          this.$elementMessage(this.$t('orders.selectOrder'), 'error')
        } else {
          this.quote()
        }
      }
    },
    quote (type, item) {
      let ids = []
      if (type == 'row') {
        ids.push(item.id)
      } else {
        ids = this.checkIds
      }
      this.$showLoading()
      this.$apiCall("api.ShopifyOrder.getOfferShopifyItems", {
        ids: ids
      }, (r) => {
        if (r.ErrorCode == "9999") {
          // this.$elementMessage(this.$t('orders.success'), "success");
          // if(!r.Data.Results || !r.Data.Results.length) return;
          // this.dialogQuoteInfo = JSON.parse(this.dialogQuoteInfoDefault);
          // this.dialogQuoteInfo.isShow = true;
          // this.dialogQuoteInfo.items = Object.values(r.Data.Results);
          let items = Object.values(r.Data.Results)
          if (!items || !items.length) {
            this.$hideLoading()
            this.$elementMessage("No data", "error")
            return
          }
          localStorage.setItem('needQuoteOrders', JSON.stringify(items))
          this.$router.push({
            name: 'orderQuote',
            params: {
              ids: ids
            },
          })
        } else {
          this.$elementMessage(r.Message, "error")
        }
        this.$hideLoading()
      })

    }, 
    //获取请求status
    getStatus(){
        let status = ''
      if (this.status == 3) { //已发货
        status = 6
      } else if (this.status == 5) { //已完成
        status = 7
      } else if (this.status == 6) { //查询页面
        status = ""
      } else if (this.status == 311) { //查询页面
        status = 311
      }  else if (this.status == 15) { //查询页面
        status = 15
      } else {
        let item = this.tabList.filter(item => {
          return item.name == this.activeName
        })
        status = item[0].id
        if (this.status == 2) { //付款
          if (this.activeName == 2) {
            status = 3
          }
        }
      }
      return status
    },
    //获取批量弹层返回值
    changeBackData (b) {
      this.filterDialog.isShowDialog = b.show
      
      if (b.ok) {
         this.isFitterOrder = true
        let param = {
          status: this.getStatus(),
          page: this.page,
          rowsPerPage: this.rowsPerPage,
        }
        if (b.ok == 1) {
          param.codeNameList = b.order
        } else {
          param.orderIdList = b.order
        }
        this.filterDialog.obj = param
        this.filterOrderFun(param)
      }
    },
    filterOrderFun(param){
      // this.page = 1
        this.$apiCall("api.ShopifyOrder.findByVendor",
          param
          , (r) => {
            if (r.ErrorCode == 9999) {
							console.log(r.Data.Results, 'asd1r.Data.Results');
              this.items = r.Data.Results.searchResult
              this.total = Number(r.Data.Pagination.totalCount)
              this.totalPage = Number(r.Data.Pagination.totalPage)
              this.page= r.Data.Pagination.page
              if (r.Data.Results.noSearchList) {
                this.failData.isShowDialog = true
                this.failData.obj = r.Data.Results.noSearchList
								
              }
            } else {
              this.$message({
                message: r.Message,
                type: "error"
              })
            }

          })
    },
    closeFilter(v){
            this.filterDialog.isShowDialog = v.show
    },
		//失败结果
		changeFail(v){
			this.failData.isShowDialog = false
		},
    quoteCancelFn () {
      if (!this.checkIds.length) {
        this.$elementMessage(this.$t('orders.selectOrder'), 'error')
      } else {
        this.$confirm(this.$t('orders.waive'), "", {
          confirmButtonText: this.$t('orders.confirm'),
          cancelButtonText: this.$t('orders.cancel'),
          type: ''
        }).then(() => {
          this.$showLoading()
          this.$apiCall("api.ShopifyOrder.cancel", {
            ids: this.checkIds
          }, (r) => {
            if (r.ErrorCode == "9999") {
              this.$elementMessage(this.$t('orders.success'), "success")
              this.$refs.gridTable.clearSelection()
              this.getItem()
            } else {
              this.$elementMessage(r.Message, "error")
            }
            this.$hideLoading()
          })
        }).catch(() => {

        })
      }
    },
    // val表示选中的表格行数据
    handleSelectionChange (val) {
      this.checkIds = []
      this.checkItems = []
      if (!val.length) return
      val.forEach(item => {
        this.checkItems.push(item)
        this.checkIds.push(item.id)
      })
    },
    dateChange () {
      if (this.filterParams.date.length > 1) {
        this.filterParams.dateFrom = this.$moment(
          this.filterParams.date[0]
        ).format("YYYY-MM-DD")
        this.filterParams.dateTo = this.$moment(
          this.filterParams.date[1]
        ).format("YYYY-MM-DD")
        this.filterItem()
      }
    },
    dateChange2 () {
      if (this.filterParams.date2 && this.filterParams.date2.length > 1) {
        this.filterParams.dateFrom2 = this.$moment(
          this.filterParams.date2[0]
        ).format("YYYY-MM-DD")
        this.filterParams.dateTo2 = this.$moment(
          this.filterParams.date2[1]
        ).format("YYYY-MM-DD")
        this.filterItem()
      } else {
        this.clearFilter('date2')
      }
    },
    clearFilter (type) {
      switch (type) {
        case "codeName":
          this.filterParams.codeName = ""
          break
        case "orderId":
          this.filterParams.orderId = ""
          break
        case "receiverName":
          this.filterParams.receiverName = ""
          break
        case "accountIds":
          this.filterParams.accountIds = ""
          break
        case "relationshipId":
          this.filterParams.relationshipId = ""
          break
        case "date":
          this.filterParams.date = []
          this.filterParams.dateFrom = ""
          this.filterParams.dateTo = ""
          break
        case "date2":
          this.filterParams.date2 = []
          this.filterParams.dateFrom2 = ""
          this.filterParams.dateTo2 = ""
          break
        case "sysCode":
          this.filterParams.sysCode = ""
          break
        default:
          this.filterParams = JSON.parse(this.filterParamsDefault)
          break
      }
      this.filterItem()
    },
    filterItem (type) {
      if (this.$route.query.page == 1) {
        this.getItem()
      } else {

        this.$router.push({
          path: `/ordersManage/${Number(this.status)}/${Number(this.activeName)}`,
          query: {
            page: 1
          }
        })
      }

    },
    gettabList () {
      switch (this.status) {
        case 2:
          this.tabList = [{
            id: 2,
            name: 1,
            title: this.$t('orders.tabBar1')
          }, {
            id: 22,
            name: 2,
            title: this.$t('orders.tabBar2')
          }, {
            id: 5,
            name: 3,
            title: this.$t('orders.tabBar3')
          }]
          break
        case 4:
          this.tabList = [{
            id: 8,
            name: 1,
            title: this.$t('orders.tabBar4')
          }, {
            id: 9,
            name: 2,
            title: this.$t('orders.tabBar5')
          }, {
            id: 10,
            name: 3,
            title: this.$t('orders.tabBar6')
          }]
          break
        default:
          this.tabList = []
          break
      }
    },
    remoteMethodCustom () {
      this.vendorList = []
      this.$apiCall("api.Relationship.findByVendor", {}, (r) => {
        if (r.ErrorCode == 9999) {
          this.vendorList = r.Data.Results
        } else {
          this.$message({
            message: r.Message,
            type: "error"
          })
        }
      })
    },
    getShopName () {
      this.storeList = []
      this.$apiCall(
        "api.Invoice.findStoreByVendor", {}, (r) => {
          if (r.ErrorCode == 9999) {
            this.storeList = r.Data.Results
          } else {
            this.$message({
              message: r.Message,
              type: "error"
            })
          }
        }
      )
    },
    getVendorAllOrderCnt () {
      this.$apiCall("api.ShopifyOrder.getVendorAllOrderCnt", {}, (r) => {
        if (r.ErrorCode == 9999) {
          this.vendorAllOrderCnt = r.Data.Results
        } else {
          this.$message({
            message: r.Message,
            type: "error"
          })
        }
      })
    },
    getVendorOrderCnt (type) {      
      this.$apiCall("api.ShopifyOrder.getVendorAllOrderCnt", {status:5,shippingType: type}, (r) => {
        if (r.ErrorCode == 9999) {
          if (type == 1) {
            this.batchNum = r.Data.Results[5]
          }else{
            this.offlineNum = r.Data.Results[5]
          }
          this.vendorAllOrderCnt = r.Data.Results
        } else {
          this.$message({
            message: r.Message,
            type: "error"
          })
        }
      })
    },    
    vendorAllOrderCntText (id) {
      let text = 0
      if (id == 22) {
        text = this.vendorAllOrderCnt.waitVendorConfirmCnt ? this.vendorAllOrderCnt.waitVendorConfirmCnt : 0
      } else {
        text = this.vendorAllOrderCnt[id] ? this.vendorAllOrderCnt[id] : 0
      }
      return text
    },
    getItem (s) {
      this.isFitterOrder = false
      this.gettabList()
      this.remoteMethodCustom()
      this.getShopName()
      this.getVendorAllOrderCnt()
      this.items = []
      let status = "",
        url = "api.ShopifyOrder.findByVendor",
        params,
        params1 = {
          page: this.page,
          rowsPerPage: this.rowsPerPage,
          status: status,
          dateFrom: this.filterParams.dateFrom,
          dateTo: this.filterParams.dateTo,
          accountIds: this.filterParams.accountIds ? [this.filterParams.accountIds] : "",
          relationshipId: this.filterParams.relationshipId,
          orderId: this.filterParams.orderId,
          keywords: this.filterParams.codeName,
          receiverName: this.filterParams.receiverName,
        },
        params2 = {
          page: this.page,
          rowsPerPage: this.rowsPerPage,
          status: status,
          sysCode: this.filterParams.sysCode,
          timeCreatedFrom: this.filterParams.dateFrom2,
          timeCreatedTo: this.filterParams.dateTo2,
        }
      params = params1
      if (this.status == 3) { //已发货
        status = 6
      } else if (this.status == 5) { //已完成
        status = 7
      } else if (this.status == 6) { //查询页面
        status = ""
        params = Object.assign(params1, params2)
      } else if (this.status == 311) { //查询页面
        status = 311
      } else if (this.status == 15) { //查询页面
        status = 15
      } else if (this.status == 16) { //暂停页面
        status = 16
      } else if (this.status == 17) { //取消页面
        status = 17
      } else {
        let item = this.tabList.filter(item => {
          return item.name == this.activeName
        })
        console.log(item, 'item');
        status = item.length> 0? item[0].id : ''
        if (this.status == 2) { //付款
          if (this.activeName == 2) {
            status = 3
            params = params2
            url = "api.ShopifyOrder.findByInvoice"
          }
        }
      }
      this.billStatus = status
      if (status == 5) {
           params.shippingType = this.batchType
      }else{
        params.shippingType = ''
      }
      this.loading = true
      params.status = status
      this.$apiCall(url, params, (r) => {
        this.loading = false
        if (r.ErrorCode == 9999) {
          this.items = r.Data.Results
          this.items.forEach(item => {
            this.$set(item, "shippingJsonInfo", item.shippingJson ? JSON.parse(item.shippingJson) : "")
            if (item.accountPayment && item.accountPayment.extJson) {
              this.$set(item, "voucherUrl", item.accountPayment.extJson.voucherUrl || "")
              this.$set(item, "voucherUrlPreview", [item.accountPayment.extJson.voucherUrl])
            }
          })
          this.total = Number(r.Data.Pagination.totalCount)
          this.totalPage = Number(r.Data.Pagination.totalPage)
          this.$getTableHeight(this)
        this.isExpansion = true
        this.toggleRowExpansionAll(this.items, true);
          if (!s) this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0
        } else {
          this.$message({
            message: r.Message,
            type: "error",
          })
        }
      })
    if (this.status==2 && (this.activeName == 3)) {
          this.getVendorOrderCnt(1)
          this.getVendorOrderCnt(2)
    }      
    },
    toPage (val) {
      if(this.isFitterOrder) {
        this.filterDialog.obj.page = val
        this.filterOrderFun(this.filterDialog.obj)
      }else{
      if (val != this.$route.query.page)
        this.$router.push({
          path: `/ordersManage/${Number(this.status)}/${Number(this.activeName)}`,
          query: {
            page: val,
          },
        })
      }


    },
    changePageSize (val) {

      this.rowsPerPage = val
      localStorage.setItem("ordersRowsPerPage", val)
      if(this.isFitterOrder) {
        this.filterDialog.obj.rowsPerPage = val
        this.filterOrderFun(this.filterDialog.obj)
      }else{
        this.getItem()
      }

    },
    gotoPage () {
      this.page = this.$route.query.page ? this.$route.query.page : 1
      this.getItem()
    },
    //tab切换
    handleClick (tab, event) {
      this.filterParams = JSON.parse(this.filterParamsDefault)
      this.getItem()
    }
  },
};
</script>
<style lang="scss" scoped>
.btns-wrap {
  position: absolute;
  right: 0;
}
.tx-middle {
  display: flex;
  align-items: center;
}
.noVip {
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #606266;
}
.sina-box{
  padding-left: 20px;
}
::v-deep.el-table__body-wrapper{
  height: 458px !important;
}
</style>
<style>
.el-popover .items {
  /* max-height: 62vh; */
  max-height: 300px;
  overflow: auto;
}
.el-table__body-wrapper{
  height: 458px !important;
}
</style>
