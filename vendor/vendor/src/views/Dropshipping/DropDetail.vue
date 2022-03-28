<template>
  <div>
    <div class="card bd-gray-400">
      <div
        class="br-pagetitle d-flex justify-content-between align-items-center"
      >
        <div class="d-flex">
          <h4>DropShipping客户详情</h4><b v-if="data.completeRate == 0" class="mg-l-20">(客户资料尚未保存)</b>
        </div>
        <div class="tx-right">
            <router-link :to="{path:'/Drop'}">返回客户列表</router-link>
        </div>
      </div>
      <div class="box">
        <div class="d-flex formBox">
          <div class="form-group-drop" style="border: none">
            <div class="col-md-12">
              <h4>客户详情</h4>
            </div>
          </div>
          <div class="form-group-drop">
            <div class="formItem">
              <label for="name" class="required">名称：</label>
              <input id="name" type="text" v-model="form.name" />
            </div>
            <div class="formItem">
              <label for="country">国家：</label>
              <!-- <input id="country" type="text" v-model="form.country"/> -->
              <div>
                <select
                  name="country"
                  id="country"
                  data-error="请选择国家"
                  v-model="form.countryCode"
                >
                  <option value="">请选择国家</option>
                  <option
                    v-for="info in countryArr"
                    :key="info.value"
                    :value="info.value"
                  >
                    {{ info.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-group-drop">
            <div class="formItem">
              <label for="email">邮箱：</label>
              <input id="email" type="text" v-model="form.email" />
            </div>
            <div class="formItem">
              <label for="mobile">电话：</label>
              <input id="mobile" type="text" v-model="form.mobile" />
            </div>
          </div>
          <div class="form-group-drop">
            <div class="formItem">
              <label for="skype">Skype：</label>
              <input id="skype" type="text" v-model="form.skype" />
            </div>
            <div class="formItem">
              <label for="whatsapp">WhatsApp：</label>
              <input id="whatsapp" type="text" v-model="form.whatsapp" />
            </div>
          </div>
          <div class="form-group-drop">
            <div class="formItem">
              <label for="line">Line：</label>
              <input id="line" type="text" v-model="form.line" />
            </div>
            <div class="formItem">
              <label for="weChat">微信：</label>
              <input id="weChat" type="text" v-model="form.weChat" />
            </div>
          </div>
          <div class="form-group-drop">
            <div class="formItem">
              <label for="channelId">分销渠道：</label>
              <div style="flex: 1" class="rad">
                <el-radio v-model="form.channelId" label="SHOPIFY"
                  >Shopify</el-radio
                >
                <el-radio v-model="form.channelId" label="LAZADA"
                  >Lazada</el-radio
                >
                <el-radio v-model="form.channelId" label="SHOPEE"
                  >Shopee</el-radio
                >
                <el-radio v-model="form.channelId" label="EBAY">eBay</el-radio>
                <el-radio v-model="form.channelId" label="AMAZON"
                  >Amazon</el-radio
                >
                <el-radio v-model="form.channelId" label="WISH">Wish</el-radio>
                <el-radio v-model="form.channelId" label="WOOCOMMERCE"
                  >WooCommerce</el-radio
                >
                <el-radio v-model="form.channelId" label="线下"
                  >线下渠道</el-radio
                >
                <el-radio v-model="form.channelId" label="其他">其他</el-radio>
              </div>
            </div>
            <div class="formItem">
              <label for="remark">备注：</label>
              <textarea
                v-model="form.remark"
                id="remark"
                cols="30"
                rows="5"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="footer d-flex">
          <div>
            <el-link type="danger" v-if="isShow == 1" @click="hideCust(2)">将该客户从挖掘机列表中设为隐藏</el-link>
            <el-link type="success" v-else @click="hideCust(1)">将该客户从挖掘机列表中设为显示</el-link>
          </div>
          <div style="text-align: right">
            <button class="save" @click="save()">保存资料</button>
          </div>
        </div>
      </div>
      <el-divider></el-divider>
      <div
        class="br-pagetitle d-flex justify-content-between align-items-center"
      >
        <div>
          <h4>客户订单情况</h4>
        </div>
        <div class="tx-right"></div>
      </div>
      <div class="box">
        <div class="formBox">
          <a href="javascript:;" class="invite" @click="inviteMore"
           v-if="tableData.length != 0">邀请客户授权更多店铺</a>
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="其他线上平台订单" name="first" disabled
              >其他线上平台订单</el-tab-pane
            >
            <el-tab-pane label="线下DropShipping订单" name="second"> 
          <!-- 订单列表 -->
      <div class="tableBox" v-if="tableData.length > 0">
      <el-table style="width: 100%"  :data="tableData">
        <!-- 发票编号 -->
        <el-table-column
          :label="$t('myinvoice.invoiceNum')"
          align="center"
          prop="code"
          width="250"
        >
          <template slot-scope="scope">
            <div>
              {{scope.row.code}}
              <el-tooltip placement="top" v-if="scope.row.importError == 1 && scope.row.status != 4 && scope.row.status != 5 && scope.row.status != 6">
                <div slot="content">
                  <template v-if="scope.row.extraJson && scope.row.extraJson.importErrorLog && scope.row.extraJson.importErrorLog.length">
                    <p v-for="(log, index) in scope.row.extraJson.importErrorLog" :key="index">
                      {{log}}
                    </p>
                  </template>
                </div>
                <i style="font-size: 14px;margin-left: 5px;" class="el-icon-warning tx-danger"></i>
              </el-tooltip>
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
                  <div style="margin-bottom: 5px;">{{$t('myinvoice.总共店铺数：')}}<b>{{scope.row.shops.length}}</b>{{$t('myinvoice.店铺')}}</div>
                  <div :key="item.id" v-for="item in scope.row.shops">{{item.shopName}}</div>
                </div>
                <a
                  slot="reference"
                  href="javascript:;"
                  style="color: #5c6ac4;"
                >{{scope.row.shops.length}}</a>
              </el-popover>
              <span v-else style="color: #606266;">0</span>{{$t('myinvoice.个店铺')}}
            </p>
          </template>    
        </el-table-column>
        <!-- 客户 -->
        <el-table-column
          align="center"
          :label="$t('myinvoice.cus')"
          prop="customerName"
        >
          <template slot-scope="scope">
            <div>{{scope.row.customerName}}</div>
            <div>{{scope.row.customerRemark}}</div>
          </template>
        </el-table-column>

        <!-- 采购单金额 -->
        <el-table-column
          align="center"
          :label="$t('myinvoice.采购单金额')"
          width="230"
        >
          <template slot-scope="scope">
            <div style=" width: 100%; text-align: center;">
              <template v-if="scope.row.status == 1">
                <div v-if="scope.row.orderStatusCnt && Number(scope.row.orderStatusCnt.notBindCnt)" class="tx-danger">
                  {{$t('myinvoice.部分商品供货价未设置')}}
              </div>
                <template v-else-if="scope.row.orderStatusCnt">
                  <div>
                    <span style="margin-right: 5px; color: #909399;">US$</span>
                    <span style="color: #F56C6C;">{{scope.row.realAmount}}</span>
                  </div>
                  <div v-if="scope.row.paymentType">
                    <span style="margin-right: 5px;  color: #909399;">{{$t('invoice.采购单付款方式')}}: </span>
                    <span>{{$t($dict.paymentType[scope.row.paymentType].text)}}</span>
                  </div>
                </template>
              </template>
              <template v-else>
                <div class="d-flex" style="justify-content: center;">
                  <template v-if="Number(scope.row.totalAmount)">
                    <span style="margin-right: 10px; color: #909399">US$</span> 
                    <span style=" color: #303133">
                      {{scope.row.totalAmount}}
                    </span>
                  </template>
                  <span v-else style=" text-align: right;">{{$t('myinvoice.setUp')}}</span>
                </div>
              </template>
            </div>
          </template>
        </el-table-column>

        <!-- 发货统计 -->
        <el-table-column :label="$t('myinvoice.发货统计')"
          align="center"
          width="280"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.orderStatusCnt">
              <div style="display: flex;justify-content: center;">
                <div class="mg-r-10">
                  <!-- 待发货 -->
                  <div v-if="/^(1|2|3|4|5)$/.test(scope.row.status)" class="total-num">
                    <span class="title mg-r-5">
                      {{scope.row.status == 1 ? $t('myinvoice.待报价：'): $t('myinvoice.待发货：')}}
                    </span>
                    <span v-if="scope.row.status == 1" class="num mg-r-5" :class="`tx-${$dict.invoiceStatus[scope.row.status].type}`">{{scope.row.orderStatusCnt.waitOfferCnt || '---'}}</span>
                    <span v-else class="num mg-r-5" :class="`tx-${$dict.invoiceStatus[scope.row.status].type}`">{{scope.row.orderStatusCnt.undeliveredCnt || '---'}}</span>
                    <div v-if="Number(scope.row.orderStatusCnt.refundOrderCnt)" class="total-num">
                      <span class="msg">( <span class=" tx-danger">{{scope.row.orderStatusCnt.refundOrderCnt}}</span> {{$t('myinvoice.个订单采购数量异常')}} )</span>
                    </div>

                  </div>
                  <!-- 已发货 -->
                  <div v-if="/^(4|5|6)$/.test(scope.row.status)" class="total-num">
                    <span class="title mg-r-5">{{$t('myinvoice.已发货：')}}</span>
                    <span class="num mg-r-5 tx-success" >{{scope.row.orderStatusCnt.deliveredCnt || '---'}}</span>
                    <div>
                      <div v-if="Number(scope.row.orderStatusCnt.refundOrderCnt) && scope.row.status == 6" class="total-num">
                        <span class="msg">( <span class=" tx-danger">{{scope.row.orderStatusCnt.refundOrderCnt}}</span> {{$t('myinvoice.个客户有退款')}} )</span>
                      </div>
                      <div v-if="Number(scope.row.orderStatusCnt.notSyncCnt)" class="total-num">
                        <el-popover
                          placement="bottom"
                          :title="$t('myinvoice.Download')"
                          width="500"
                          trigger="hover">
                          <div class="mg-t-15 mg-b-15" style="white-space: nowrap;">
                            <span class=" tx-gray-600">{{$t('myinvoice.shippedquantity')}} </span>
                            <a href="javascript:;">{{scope.row.orderStatusCnt.deliveredCnt}}</a>
                            <span class="mg-l-10">
                              (<a href="javascript:;">{{scope.row.orderStatusCnt.notSyncOrderCnt}}</a>
                              {{$t('myinvoice.个订单同步异常')}})
                            </span>
                          </div>
                          <el-alert class="icon-color" :closable="false" :title="$t('myinvoice.Downloadtext')" type="info" show-icon>
                          </el-alert>
                          <div class="mg-t-15 d-flex justify-content-center">
                            <button class="save" style="margin-right:30px" @click="exportDeliver(scope.row.id,1)">{{$t('myinvoice.Downloadall')}}</button>
                            <button class="save" @click="exportDeliver(scope.row.id,2)">{{$t('myinvoice.Downloadallunsync')}}</button>
                          </div>
                          <a class="msg" slot="reference" href="javascript:;">
                            ( <span class=" tx-danger">{{scope.row.orderStatusCnt.notSyncOrderCnt}}</span> {{$t('myinvoice.个订单同步异常')}} )
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
        <el-table-column
          align="center"
          :label="$t('myinvoice.status')"
          width="180"
        >
          <template slot-scope="scope">
            <template v-if="$dict.invoiceStatus[scope.row.status]">
              <el-tooltip v-if="scope.row.status == '9' && scope.row.stopReason" class="item" effect="dark" 
                :content="scope.row.stopReason" placement="top">
                <span>{{$t($dict.invoiceStatus[scope.row.status].text)}}</span>
              </el-tooltip>
              <span
                v-else
                :class="`tx-${$dict.invoiceStatus[scope.row.status].type}`"
              >{{$t($dict.invoiceStatus[scope.row.status].text)}}</span>
            </template>
          </template>  
        </el-table-column>

        <!-- 时间 -->
        <el-table-column
          align="center"
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

        <!-- 操作 -->
         <el-table-column
          fixed="right"
          :label="$t('myinvoice.action')"
          width="150"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.orderStatusCnt">
              <!-- 显示 确认完成报价 -->
              <div v-if="scope.row.status == '1' && !Number(scope.row.orderStatusCnt.notBindCnt)"> 
                <el-link type="success" style="font-size: 12px;" 
                  @click="setPriceConfirm(scope.row)"
                >
                  {{$t('invoice.确认完成报价')}}
                </el-link>
              </div>
              <div>
                <el-link style="font-size: 12px;"
                  :type="scope.row.status == '1' && Number(scope.row.orderStatusCnt.notBindCnt) ? 'success' : 'primary'"
                  @click="gotoInvoice(scope.row)"
                >
                  {{scope.row.status == '1' && Number(scope.row.orderStatusCnt.notBindCnt)  ? $t('myinvoice.完善报价') : $t('myinvoice.viewDetail')}}
                </el-link>
              </div>
            </template>
            <template v-if="scope.row.status != 2 && scope.row.status != 3 && scope.row.status != 4 && scope.row.status != 5 && scope.row.status != 6 && scope.row.status != 9">
              <el-link style="font-size: 12px;"
                type="primary"
                @click="handleCommand({row: scope.row, command: 'b'})"
              >{{$t('myinvoice.导出订单信息')}}</el-link>
              <el-link style="font-size: 12px;"
                type="primary"
                @click="handleCommand({row: scope.row, command: 'a'})"
              >{{$t('myinvoice.importInfo')}}</el-link>
            </template>
            <!-- 发送给客户 -->
            <div v-if="scope.row.status == 2">
              <el-link style="font-size: 12px;"
                :disabled="scope.row.submitLoading"
                type="success"
                @click="sendInvoice(scope.row)"
              >{{$t('myinvoice.sendCus')}}</el-link>
            </div>
            <!-- 确认收到款项 -->
            <div v-if="scope.row.status == 3">
              <el-link style="font-size: 12px;"
                :disabled="scope.row.submitLoading"
                type="success"
                @click="openConfirmSetPayed(scope.row)"
              >{{$t('myinvoice.确认收到款项')}}</el-link>
            </div>
            <!-- 手工导入发货信息 -->
            <div v-if="scope.row.status == 4 || scope.row.status == 5">

              <el-link style="font-size: 12px;"
                type="primary"
                @click="openDeliverImport(scope.row)"
              >{{$t('myinvoice.手工导入发货信息')}}</el-link>
            </div>
            <!-- 导出采购单 -->
            <div v-if="scope.row.status != 1 && scope.row.status != 2">
              <el-link style="font-size: 12px;"
                type="primary"
                @click="handleCommand({row: scope.row, command: 'c'})"
              >{{$t('myinvoice.exportt')}}</el-link>
            </div>
            <div v-if="scope.row.status == 2">
              <div>
                
                <el-dropdown type="primary"  @command="handleCommandStatus2">
                  <div>
                  <el-link style="font-size: 12px;"
                  type="primary"
                  @click="handleCommand({row: scope.row, command: 'b'})"
                >{{$t('myinvoice.导出订单信息')}}</el-link>
                  <i class="el-icon-arrow-down el-icon--right"></i></div>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item disabled>
                        <b class="black">
                          {{$t('myinvoice.更多操作')}}
                        </b>
                      </el-dropdown-item>
                    <el-dropdown-item :command="{type: 'a', data: scope.row}">{{$t('myinvoice.importInfo')}}</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.status < 5" :command="{type: 'c', data: scope.row}">{{$t('myinvoice.cancelOrder')}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown> 
              </div>
            </div>  
            <!-- paymentType=4 的 payStatus=1的 不能取消订单 -->
            <template v-if="!(scope.row.paymentType == 4 && scope.row.payStatus == 1)">
              <div v-if="scope.row.status != 2 && scope.row.status < 5">
                <el-link style="font-size: 12px;"
                  type="danger"
                  @click="cancelInvoice(scope.row)"
                >{{$t('myinvoice.cancelOrder')}}</el-link>
              </div>
            </template>
          </template>  
        </el-table-column> 
      </el-table>
      <div ref="tableFooter">
      <el-row
        v-if="tableData.length"
        :gutter="20"
      >
        <el-col
          :span="24"
          class=" d-flex justify-content-center" style="height:80px"
        >
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
            </el-col>
          </el-row>
          </div>
              </div>
              <div class="d-flex justify-content-center noShip" v-else>
                <div>
                  没有当前客户的线下DropShipping订单,
                  <a href="javascript:;" @click="inviteMore">立刻邀请客户授权店铺</a>吧
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
        <div class="power">Powered by OurMall</div>
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
                    top: 15px;"
        >
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
          <el-button size="small" @click="sendInvoiceOpen = false">{{$t('myinvoice.discard')}}</el-button>
          <el-button size="small" type="primary" @click="invoicePreview(invoiceInfo.url)">{{$t('myinvoice.previewInvocie')}}</el-button>
        </div>

      </div>
    </el-dialog>
    <el-dialog :title="$t('myinvoice.您当前采购订单中有 0 元供货价的商品')"
      :visible.sync="dialogZeroAlert.isShow"
      width="600px"
    >
      <div style=" padding: 0 20px;">
        <div class=" mg-b-10">
          {{$t('myinvoice.您当前采购订单中有 0 元供货价的商品')}}：
        </div>
        <div v-for="item in dialogZeroAlert.items" :key="item.id"
          style=" margin-bottom: 5px; padding-left: 15px; color: #909399;">
          {{item.codeName}} - {{item.sku}} × {{item.quantity}}
        </div>
        <div class=" mg-t-30">
          <el-alert
             :title="$t('myinvoice.确定要发送当前发票发送给客户吗')"
            type="warning"
            :closable="false">
          </el-alert>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogZeroAlert.isShow = false">
          {{$t('myinvoice.我再看看')}}
        </el-button>
        <el-button
          size="small"
          type="primary"
          :loading="dialogZeroAlert.loading"
          @click="toSendInvoice(dialogZeroAlert.invoice, true)">
          {{$t('myinvoice.确定')}}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog :title="$t('invoice.shippinginformation')"
      :visible.sync="dialogDeliverImport.isShow"
      v-loading="dialogDeliverImport.loading"
      width="600px"
    >
      <div class="download-xsl">
        <el-alert type="warning" :closable="false" style="width: 100%;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>{{$t('invoice.templateprovided')}}</span>
            <el-button type="text" style="padding: 0;" @click="downloadFile">{{$t('invoice.template')}}</el-button>
          </div>
        </el-alert>
      </div>
      <div style="margin-top: 40px; padding: 0 20px;">
        <el-upload class="upload-demo" ref="upload" action="" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" :auto-upload="false" :file-list="dialogDeliverImport.uploadfileList" :on-change="handleUploadChange">
          <el-button slot="trigger" size="small" type="primary">{{$t('invoice.fileSelect')}}</el-button>
          <template v-if="dialogDeliverImport.invoiceInfo && dialogDeliverImport.invoiceInfo.payStatus != 1">
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                {{$t('invoice.proceeding')}}
              </div>
              <el-button style="background-color: #b3e19d;border-color: #b3e19d;cursor: not-allowed;margin-left: 10px;" size="small" type="success">{{$t('invoice.shippinginformation')}}</el-button>
            </el-tooltip>
          </template>
          <template v-else>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">{{$t('invoice.shippinginformation')}}</el-button>
          </template>

          <div slot="tip" class="el-upload__tip mg-y-15" style="margin-top: 20px;">
            <p>{{$t('invoice.shippinginformation1')}}</p>
            <p>{{$t('invoice.shippinginformation2')}}</p>
          </div>
        </el-upload>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogDeliverImport.isShow = false">
          {{$t('myinvoice.关闭')}}
        </el-button>
      </div>
    </el-dialog>
    <DialogCancelInvoice :data="dialogCancelInvoice" @setCancel="setCancel"/>
  </div>
</template>

<script>
import countryArr from "@/components/country.json";
import DialogCancelInvoice from '@/views/order/DialogCancelInvoice'
export default {
  data() {
    return {
      sendInvoiceOpen: false,
      activeShareName: "shareLink",
      shareTitle: "",
			shareDesc: "",
      exportItem: '',
			exportInvoiceType:'',
      dialogZeroAlert: {
				isShow: false,
				loading: false,
				items: [],
				invoice: null,
			},
      dialogZeroAlertDefault:'{}',
      showItemPrice: true,
      showCustom: false,
      invoiceInfo:"",
      modalCustomExport: {
				tags: [],
				selectedTitles: [],
				unselectedTitles: [],
			},
      modalCustomExportDefault: '',
      innerVisible: false,
      dialogDeliverImport: {
        isShow: false,
        loading: false,
        invoiceInfo: null,
        uploadfileList:[],
      },
      dialogDeliverImportDefault: '{}',
      dialogCancelInvoice: {
        loading: false,
        isShow: false,
        item: null,
        stopReason: '',
      },
      dialogCancelInvoiceDefault: '{}',
      id: null,
      index:null,
      data:{},
      channelId: "",
      activeName: "second",
      // isRoot: false,
      isShow:1,
      tableData: [],
      countryJSON: null,
      countryArr: [],
      form: {
        id:"",
        name: "",
        countryCode: "",
        email: "",
        mobile: "",
        skype: "",
        whatsapp: "",
        line: "",
        weChat: "",
        channelId: "",
        remark: "",
      },
      tableHeight: 400,
      pageSize: [10, 20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem(`${this.$route.name}RowsPerPage`)
        ? Number(localStorage.getItem(`${this.$route.name}RowsPerPage`))
        : 10,
      totalCount: 0,
      totalPage: 0,
      channelArr:[
        {name:"SHOPIFY",id:1},
        {name:"WOOCOMMERCE",id:2},
        {name:"LAZADA",id:3},
        {name:"SHOPEE",id:4},
        {name:"WAYFAIR",id:5},
        {name:"EBAY",id:6},
        {name:"AMAZON",id:8},
        {name:"WISH",id:9},
        {name:"线下",id:10},
        {name:"线下",id:11},
        ],
      platformArr:[
        {name:"eBay",id:1},
        {name:"亚马逊",id:2},
        {name:"速卖通",id:3},
        {name:"Wish",id:4},
        {name:"敦煌",id:6},
        {name:"LAZADA",id:7},
        {name:"Cdiscount",id:8},
        {name:"Bellabuy",id:9},
        {name:"云分销",id:10},
        {name:"ensogo",id:11},
        {name:"LINIO",id:12},
        {name:"Tobox",id:13},
        {name:"TopHatter",id:14},
        {name:"Kilimall",id:15},
        {name:"Shopify",id:16},
        {name:"Shopee",id:17},
        {name:"阿里巴巴",id:18},
        {name:"Joom",id:19},
        {name:"京东国际",id:20},
        {name:"E店宝",id:21},
        {name:"BigCommerce",id:22},
        {name:"Ourmall",id:23},
        {name:"ZoobMall",id:24},
        {name:"Fyndiq",id:25},
        {name:"MyMall",id:26},
        {name:"Shopyy",id:27},
        {name:"Jumia",id:28},
        {name:"Jolly",id:29},
        {name:"Ezbuy",id:30},
        {name:"Magento",id:31},
        {name:"Walmart",id:32},
        {name:"Yandex",id:33},
        {name:"Vova",id:34},
        {name:"Alabom",id:35},
        {name:"Woocommerce",id:36},
        {name:"Oberlo",id:37},
        {name:"Prestashop",id:38},
        {name:"京东印尼",id:39},
        {name:"Shoplazza",id:40},
        {name:"Xshopyy",id:41},
        {name:"Mercadolibre",id:42},
        {name:"AlibabaInternation",id:43},
        {name:"Tokopedia",id:44},
        {name:"京东泰国",id:45},
        {name:"淘宝",id:46},
        {name:"Daraz",id:47},
        {name:"Real",id:48},
        {name:"Rakuten",id:49},
        {name:"Skyhub",id:50},
        {name:"Allegro",id:51},
        {name:"Pdd",id:52},
        {name:"Darty",id:53},
        {name:"Coupang",id:54},
        {name:"有赞云",id:55},
        {name:"Umka",id:56},
        {name:"Uzo",id:57},
        {name:"Etsy",id:58},
        {name:"Newegg",id:59},
        {name:"Shoptima",id:60},
        {name:"Akulaku",id:61},
        {name:"Ueeshop",id:62},
        {name:"Shopline",id:63},
        {name:"抖音小店",id:64},
        {name:"京东国内",id:65},
        {name:"shopBase",id:66},
        {name:"OTTO",id:67},
        {name:"Fnac",id:68},
        {name:"天猫",id:69},
        {name:"yahooJP",id:70},
        {name:"ezapp",id:71},
        {name:"wayfair",id:72},
        {name:"backmarket",id:73},
        {name:"bukalapak",id:74},
        {name:"AllValue",id:75},
        {name:"shopy",id:76},
        {name:"Ecwid",id:77},
        {name:"自营平台",id:98},
        {name:"其他",id:99},
        {name:"Tobox",id:100},
        {name:"real",id:101},
        {name:"zoodmall",id:111},
      ],
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.isShow = this.$route.query.show;
    this.index = this.$route.query.index;
    this.countryJSON = countryArr;
     this.dialogCancelInvoiceDefault = JSON.stringify(this.dialogCancelInvoice);
    this.filterParamsDefault = JSON.stringify(this.filterParams);
    this.dialogZeroAlertDefault = JSON.stringify(this.dialogZeroAlert);
    this.modalCustomExportDefault = JSON.stringify(this.modalCustomExport);
    this.dialogDeliverImportDefault = JSON.stringify(this.dialogDeliverImport);
    //格式化国家
    Object.keys(countryArr).forEach((key) => {
      Object.keys(countryArr[key]).forEach((key2) => {
        this.countryArr.push({
          label: countryArr[key][key2].nameCN,
          value: countryArr[key][key2].code2,
        });
      });
    });
    this.countryArr.sort(
      (a, b) => a.label.charCodeAt(0) - b.label.charCodeAt(0)
    );
    this.getInfo();//匹配客户
    if(this.id){
      this.getItems();//获取列表
    }
  },
  watch: {
    $route: "gotoPage",
    cancelStatus: "gotoPage",
  },
  methods: {
    inviteMore(){
      if(this.data.relationship.length == 0){
        this.$elementMessage("当前客户资料尚未保存，无法邀请客户授权店铺", 'error');
      }else{
        let details = this.$router.resolve({
        name: "myCustom",
        query:{ id:this.data.relationship.id }
      });
      window.open(details.href, "_blank");
      }
      
    },
    openConfirmSetPayed(item){
      this.$confirm(this.$t('myinvoice.是否要确认收到款项？'),'', {
        type: 'warning',
        confirmButtonText: this.$t('myinvoice.确认'),
        cancelButtonText: this.$t('myinvoice.取消'),
      }).then(()=>{
        this.confirmSetPayed(item)
      }).catch(()=>{})
    },
    checkItem(item){
      this.cid = item.relationshipId;
    },
    checkDisabled(item){
      if(!item.relationshipId){
        return true;
      }
      if(!this.checkboxArr.length){
        return false;
      }
      return item.relationshipId != this.cid; 
    },
    setPriceConfirm(item){
      this.$confirm(`
        <p>${this.$t('invoice.是否要确认完成报价?')}</p>
        <p>
          <span style="margin-right: 5px; color: #909399;">${this.$t('myinvoice.采购订单编号')}: </span> ${item.code}
        </p>
        <p>
          <span style="margin-right: 5px; color: #909399;">${this.$t('invoice.采购单金额')}: </span> US$ ${item.realAmount}
        </p>
        <p>
          <span style="margin-right: 5px; color: #909399;">${this.$t('invoice.采购单付款方式')}: </span>
          ${item.paymentType ? this.$t(this.$dict.paymentType[item.paymentType].text) : '---'}
        </p>
        `
      , '', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: this.$t('invoice.确定'),
        cancelButtonText: this.$t('invoice.取消'),
        type: 'warning'
      }).then(()=>{
        this.loading = true;
        this.$apiCall('api.Invoice.setPriceConfirm', {invoiceId: item.id,}, r => {
          if(r.ErrorCode == "9999") {
            this.$elementMessage(this.$t('invoice.确认完成报价成功'), 'success');
            this.getItems(true);
          }else{
            this.$elementMessage(r.Message, 'error');
          }
        })
      })
    },
    handleCommandStatus2(commond){
      if(commond.type == 'a'){
        this.handleCommand({row: commond.data, command: 'a'})
      }
      if(commond.type == 'c'){
        this.cancelInvoice(commond.data)
      }
    },
    submitUpload(){
      if(!this.dialogDeliverImport.uploadfileList.length) {
        this.$elementMessage(this.$t('invoice.selectfile'), 'error');
        return;
      }
      this.dialogDeliverImport.loading = true;
      let uploadFile = this.dialogDeliverImport.uploadfileList[0].raw;
      if($("#ifilePro").length == 0) {
        $("body").append(
          '<iframe id="ifilePro" style="display:none"></iframe>'
        );
      }
      let openDownload = url => {
        document.getElementById("ifilePro").src = url;
      };
      let apiUrl = "api.Invoice.deliverImport";
      let param = {
        invoiceId: this.dialogDeliverImport.invoiceInfo.id,
        "@file": uploadFile,
      }
      this.$apiCall(apiUrl, param, r => {
        this.dialogDeliverImport.loading = false;
        if(r.ErrorCode == "9999") {
          this.dialogDeliverImport.isShow = false;
          this.$elementMessage(this.$t('invoice.successImport'), 'success');
          this.getItems(true);
          openDownload(r.Data.Results.file);
        }else{
          this.$elementMessage(r.Message, 'error');
        }
      })
    },
    handleUploadChange(file) {
      this.dialogDeliverImport.uploadfileList = [];
      this.dialogDeliverImport.uploadfileList.push(file);
    },
    downloadFile() {
      let url = "./file/orders_impor.xlsx";
      if($("#downloadFile").length == 0) {
        $("body").append(
          '<iframe id="downloadFile" style="display:none"></iframe>'
        );
      }
      let openDownload = url => {
        document.getElementById("downloadFile").src = url;
      };
      openDownload(url);
    },
    openDeliverImport(item){
      this.dialogDeliverImport = JSON.parse(this.dialogDeliverImportDefault);
      this.dialogDeliverImport.isShow = true;
      this.dialogDeliverImport.invoiceInfo = item;
    },
    confirmSetPayed(item){
      item.submitLoading = true;
      this.$apiCall("api.Invoice.setPayed", {invoiceId: item.id}, r => {
        if(r.ErrorCode == "9999") {
          this.$elementMessage(this.$t('invoice.successConfirm'), 'success');
          this.getItems(true)
        }
      });
    },
    clearFilter(type){
      switch(type){
        case 'code':
          this.filterParams.code = this.code = '';
          break;
        case 'relationshipId':
          this.filterParams.relationshipId = this.filterParams.idName = '';
          break;
        case 'accountId':
          this.filterParams.accountId = this.filterParams.aIdName = '';
          break;  
        case 'trackNumber':
          this.filterParams.trackNumber = this.filterParams.trackNumberIpt = '';
          break;
        case 'codeName':
          this.filterParams.codeName = this.filterParams.codeNameIpt = '';
          break;
        case 'date':
          this.filterParams.date = [];
          this.filterParams.dateFrom = '';
          this.filterParams.dateTo = '';
          this.filterParams.timeFilter = '';
          break;  
        default:
          this.code = '';
          this.filterParams = JSON.parse(this.filterParamsDefault);
          break;  
      }
      if(type != 'change')
        this.gotoPage();
    },
    showDateText(val){
      let txt = '';
      this.filterParams.timeOption.forEach(t => {
        if(t.value == val)
          txt = t.label;
      })
      return txt;
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
          this.getItems(true);
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
    getOrderCnt(i){
      if(!this.tableData.length || this.tableData.length < (i + 1) || typeof this.tableData[i] == 'undefined'){
        return;
      }
      this.$apiCall("api.Invoice.getSummary", {
        invoiceId: this.tableData[i].id,
        }, r => {
          if(r.ErrorCode == "9999") {
            if(typeof this.tableData[i] != 'undefined')
              this.$set(this.tableData[i], "orderStatusCnt", r.Data.Results);
          }else{
            this.$elementMessage(r.Message, 'error');
          }
          i++;
          this.getOrderCnt(i)
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
          let txt = `${this.$t('myinvoice.总共采购商品数：')}${item.totalCnt},`
          Object.keys(r.Data.Results).forEach(k => {
            txt += `${r.Data.Results[k].name}: ${r.Data.Results[k].cnt},`
          })
          item.cntText = txt.slice(0, txt.length - 1);
        }
      });
    },
    handleCommand(command) {
      this.exportItem = command.row;
      this.exportInvoiceType = command.command;
      let openDownload = ()=>{};
      let apiUrl = '';
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
					openDownload = url => {
            document.getElementById("ifilePro").src = url;
					};
					apiUrl = this.exportInvoiceType == "b" ? "api.Invoice.exportInvoice" : "api.Invoice.exportOrder";
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
      this.loading = true;
      this.showCustom = false;
      this.modalCustomExport = JSON.parse(this.modalCustomExportDefault);
      let apiUrl = this.exportInvoiceType == "b" ? "api.Invoice.exportInvoiceTitle" : "api.Invoice.exportTitle";
      this.$apiCall(apiUrl, {}, r => {
        this.loading = false;
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
    gotoInvoice(item) {
      let routeData = this.$router.resolve({name: 'Invoice', query: {
        uniCode: item.uniCode,
        fromPage: 1
        }});
      window.open(routeData.href, "_blank"); 
    },
    setCancel(){
      if(!this.dialogCancelInvoice.stopReason){
        this.$message({ message: '作废原因必须填写', type: "error" });
        return;
      }
      this.dialogCancelInvoice.loading = true;
      this.$apiCall("api.Invoice.cancel", { 
        invoiceId: this.dialogCancelInvoice.item.id,
        stopReason: this.dialogCancelInvoice.stopReason,
      }, r => {
        this.dialogCancelInvoice.loading = false;
        if (r.ErrorCode == 9999) {
          this.dialogCancelInvoice.isShow = false;
          this.$message({ message: this.$t('myinvoice.cancelSuccess'), type: "success" });
          this.getItems(true);
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      });

    },
    cancelInvoice(item) {
      //作废
      this.dialogCancelInvoice = JSON.parse(this.dialogCancelInvoiceDefault)
      this.dialogCancelInvoice.isShow = true;
      this.dialogCancelInvoice.item = item;
      return;
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
              this.$elementMessage(this.$t('myinvoice.下载成功'), 'success');
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
            this.$userFailure();
          }
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
      localStorage.setItem(`${this.$route.name}RowsPerPage`, val);
      this.getItems();
    },
    gotoPage() {
      this.page = this.$route.query.page ? Number(this.$route.query.page) : 1;
      this.getItems();
    },
    getInfo(){
       this.$apiCall("api.SourceBuyer.findByVendor",{status:this.isShow},r=>{
         r.Data.Results.forEach(e=>{
           if(e.id == this.index){
             this.data = e;
             this.form.name = this.data.relationship.customerName || this.data.name;
             this.form.countryCode = this.data.countryCode||"";
             this.form.email = this.data.relationship.customerEmail;
             this.form.line = this.data.relationship.customerLine;
             this.form.mobile = this.data.mobile;
             this.form.whatsapp = this.data.relationship.customerWhatsapp;
             if(isNaN(Number(this.data.channelId.replace(/,/g,""))) == false){
               this.form.channelId = Number(this.data.channelId.replace(/,/g,""));
                this.channelArr.forEach((i)=>{
               if(i.id == this.form.channelId){
                 this.form.channelId = i.name
               }
             })
             }else{
               this.form.channelId = this.data.channelId;
             }
             this.form.weChat = this.data.relationship.customerWeChat;
             this.form.skype = this.data.relationship.customerSkype;
             this.form.remark = this.data.relationship.customerRemark;
           }
         })
       })    
    
    },
    getItems() {
      this.$apiCall(
        "api.Invoice.findByVendor",
        {
          page: this.page,
          rowsPerPage: this.rowsPerPage,
          code: this.id,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
          this.loading = false;
          let [data, pagination] = [r.Data.Results, r.Data.Pagination];
          this.tableData = data.map(item => {
            item.loadCnt = false;
            item.cnt = null;
						item.cntText = '';
            item.submitLoading = false;
            item.orderStatusCnt = null;
            return item;
          });
          this.totalCount = Number(pagination.totalCount);
          this.totalPage = Number(pagination.totalPage);
          this.getOrderCnt(0);
          if (!s) this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
        }else{
          this.$message({ message: r.Message, type: "error" });
        }
        }
      );
    },
    getOrderCnt(i){
      if(!this.tableData.length || this.tableData.length < (i + 1) || typeof this.tableData[i] == 'undefined'){
        return;
      }
      this.$apiCall("api.Invoice.getSummary", {
        invoiceId: this.tableData[i].id,
        }, r => {
          if(r.ErrorCode == "9999") {
            if(typeof this.tableData[i] != 'undefined')
              this.$set(this.tableData[i], "orderStatusCnt", r.Data.Results);
          }else{
            this.$elementMessage(r.Message, 'error');
          }
          i++;
          this.getOrderCnt(i)
      });
    },
    cntOnError(){
      this.$elementMessage(this.$t('myinvoice.copyFailed'), 'error');
    },
    cntOnCopy(){
      this.$elementMessage(this.$t('myinvoice.copyItems'), 'success');
    },
    save(){
      this.channelArr.forEach((i)=>{
        if(i.name == this.form.channelId){
          this.form.channelId = i.id
        }
      });
      this.form.id = this.index;
      let params = this.form;
      if(!this.form.name){
        this.$elementMessage("请填写客户名称", 'error');
        return false;
      }
      if(!this.form.email&&!this.form.skype&&!this.form.line&&!this.form.mobile&&!this.form.whatsapp&&!this.form.weChat){
        this.$elementMessage("邮箱、电话、Skype、WhatsApp、Line、微信 至少填写一项", 'error');
        return false;
      }
      this.$apiCall("api.SourceBuyer.changeByVendor",params, r=>{
        if(r.ErrorCode == 9999){
          this.channelArr.forEach((i)=>{
            if(i.id == this.form.channelId){
              this.form.channelId = i.name
            }
          });
          this.getInfo();
          this.$elementMessage("保存成功", "success");
        }else{
          this.$message({ message: r.Message, type: "error" });
        }
      })
    },
    setShow(i){
      this.$apiCall("api.SourceBuyer.setShowOrHide",{
            id:this.index,
            status:i
            }, r=>{
              if(r.ErrorCode == 9999){
                this.isShow = i;
                this.$elementMessage("设置成功", "success");
              }else{
                this.$message({ message: r.Message, type: "error" });
           }
       })
    },
    hideCust(i){
      if(i==2){
       this.$confirm("隐藏后可以在Dropshipping客户挖掘机列表右上角	->   显示被隐藏的客户 页面恢复客户", '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
            this.setShow(i)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消设置'
          });          
        }); 
      }else{
        this.setShow(i)
      }
      
      
    },
    getCntCountry(item){
      if(!item.cnt)
        item.loadCnt = true;
      this.$apiCall("api.Invoice.getItemsCountry", {invoiceId: item.id}, r => {
        item.loadCnt = false;
        if(r.ErrorCode == "9999") {
          item.cnt = r.Data.Results;
          let txt = `${this.$t('myinvoice.总共采购商品数：')}${item.totalCnt},`
          Object.keys(r.Data.Results).forEach(k => {
            txt += `${r.Data.Results[k].name}: ${r.Data.Results[k].cnt},`
          })
          item.cntText = txt.slice(0, txt.length - 1);
        }
      });
    },
  },
  components: {
    DialogCancelInvoice
  },
};
</script>

<style scoped lang="scss">
label.required:before {
  content: '* ';
  color: red;
}
.invite {
  position: absolute;
  display: block;
  z-index: 20;
  right: 95px;
  top: 11px;
}
.br-pagetitle {
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 20px;
}
.br-pagetitle h4 {
  margin-bottom: 5px;
  color: #343a40;
  font-size: 24px;
}
.formBox {
  flex-wrap: wrap;
  flex-direction: column;
  position: relative;
  .formItem {
    width: 50%;
    display: flex;
    margin-right: 10px;
    padding: 5px;
    label {
      width: 250px;
      font-weight: 600;
      color: #6f6f6f;
      margin-right: 30px;
      padding-top: 8px;
      text-align: right;
    }
    input,
    select {
      flex: 1;
      display: block;
      height: 34px;
      padding: 6px 12px;
      font-size: 14px;
      line-height: 1.4px;
      color: #555;
      background-color: #fff;
      border: 1px solid #cfd9db;
      border-radius: 4px;
      outline: none;
    }
    input:focus,
    select:focus,
    textarea:focus {
      border-color: #00b1e1;
    }
    textarea {
      flex: 1;
      padding: 6px 12px;
      font-size: 14px;
      color: #555;
      background-color: #fff;
      border: 1px solid #cfd9db;
      border-radius: 4px;
      outline: none;
    }
  }
}
.save {
  outline: none;
  background-color: #7ca4d2;
  border-color: #6c91bc;
  color: #fff;
  font-size: 13px;
  padding: 7px 12px;
  line-height: 18px;
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  border-radius: 4px;
  user-select: none;
}
.save:hover {
  background-color: #6285ad;
  border-color: #5478a1;
}
.rad label {
  width: auto !important;
}
.form-group-drop {
  border-top: 1px solid #e0e7e8;
  width: 100%;
  display: flex;
  h4 {
    font-size: 18px;
    margin: 5px;
    color: #3f56a1;
    font-weight: 100;
  }
}
.footer {
  background-color: #f8f8f8;
  border-top: 1px solid #e0e7e8;
  div {
    width: 50%;
    margin-right: 10px;
    padding: 5px 5px 5px 30px;
  }
}
.box {
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid #dee2e6;
  border-radius: 3px;
}
.card {
  margin-top: 30px;
  background-color: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.21);
  border-radius: 3px;
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 3px;
}
.noShip {
  height: 250px;
  font-size: 20px;
}
.tableBox {
  margin: 20px;
  border: 1px solid #cfd9db;
}
// table边框颜色
.tableBox ::v-deep .el-table--border:after,
.tableBox ::v-deep .el-table--group:after,
.tableBox ::v-deep .el-table:before {
  background-color: #eee;
}

.tableBox ::v-deep .el-table--border,
.tableBox ::v-deep .el-table--group {
  border-color: #cfd9db;
}

.tableBox ::v-deep .el-table td {
  border-bottom: 1px solid #cfd9db;
}
.tableBox ::v-deep .el-table th.is-leaf{
  border-bottom: 2px solid #cfd9db;
  color: #5e5e5e;
  background: #eee;
}

.tableBox ::v-deep .el-table--border th,
.tableBox ::v-deep .el-table--border th.gutter:last-of-type {
  border-bottom: 2px solid #cfd9db;
  background: #eee;
}

.tableBox ::v-deep .el-table--border td,
.tableBox ::v-deep .el-table--border th {
  border-right: 1px solid #cfd9db;
}
.formItem ::v-deep .el-radio{
  .el-radio__input.is-checked .el-radio__inner{
    border-color: #7ca4d2;
    background: #7ca4d2;
  }
  .el-radio__input.is-checked + .el-radio__label{
    color: #7ca4d2;

  }
}
.formBox ::v-deep .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active{
  color: #7ca4d2;
}
.formBox ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color:#7ca4d2
}
.power{
  text-align: right;
  margin-top: 7px;
  color: #909399;
}
</style>
