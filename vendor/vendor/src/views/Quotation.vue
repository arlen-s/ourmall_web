<template>
  <div class="contentpanel my-custom-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="iconfont icon-baojiadan"></i>
          <h2>{{ $t("quotation.我的报价单") }}</h2>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="pagebody" v-loading="loading">
      <el-row :gutter="15" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <el-row :gutter="20">
              <el-col :span="24">
                <div ref="pageFilter" class="page-filter">
                  <el-form :inline="true" size="mini">
                    <!-- <el-form-item :label="$t('quotation.报价单类型：')">
                      <el-select
                        style="width: 120px"
                        filterable
                        @change="filterItem()"
                        @clear="clearFilter('type')"
                        v-model="filterParams.type"
                        :placeholder="$t('quotation.请选择状态')"
                      >
                      <el-option
                          label="ALL"
                          value=""
                        ></el-option>
                        <el-option
                          :label="$t('quotation.商品报价单')"
                          value="2"
                        ></el-option>
                        <el-option
                          :label="$t('quotation.订单报价单')"
                          value="1"
                        ></el-option>
                      </el-select>
                    </el-form-item> -->
                    <el-form-item>
                      <el-input
                        style="width: 120px"
                        v-model="filterParams.code"
                        :placeholder="$t('quotation.编号')"
                        clearable
                        @clear="clearFilter('code')"
                        @keyup.enter.native="filterItem"
                      ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <!-- <el-input
                      v-if="filterParams.type!=1"
                        style="width: 120px"
                        v-model="filterParams.customer"
                        @keyup.enter.native="filterItem"
                        clearable
                        @clear="clearFilter('customerId')"
                        :placeholder="$t('quotation.请输入客户名')"
                      ></el-input>
                      <el-form-item> -->
                      <el-select
                        filterable
                        remote
                        :remote-method="remoteMethodCustom"
                        :loading="selectLoading"
                        :placeholder="$t('myinvoice.pleaseCusName')"
                        clearable
                        v-model="filterParams.customer"
                        @change="filterItem('cust')"
                        @clear="close"
                      >
                        <el-option
                          v-for="opt in selectArr"
                          :key="opt.id"
                          :label="opt.customerName"
                          :value="opt.customerName"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                      <!-- <el-input
                        style="width: 120px"
                        v-model="filterParams.accountId"
                        @keyup.enter.native="filterItem"
                        clearable
                        @clear="clearFilter('accountId')"
                        :placeholder="$t('quotation.Shopify店铺')"
                      ></el-input> -->
                      <!-- <el-select
                      v-else
                        filterable
                        remote
                        clearable
                        @clear="clearFilter('customerId')"
                        style="width: 120px"
                        :remote-method="getShopName"
                        :loading="getShopNameInput.loading"
                        :placeholder="$t('quotation.Shopify店铺')"
                        v-model="filterParams.accountId"
                        @change="filterItem"
                      >
                        <el-option
                          v-for="opt in getShopNameInput.shopList"
                          :key="opt.id"
                          :label="opt.shopName"
                          :value="opt.id"
                        ></el-option>
                      </el-select>
                     </el-form-item> -->
                    <el-form-item :label="$t('quotation.状态：')">
                      <el-select
                        style="width: 120px"
                        filterable
                        clearable
                        @change="filterItem()"
                        v-model="filterParams.status"
                        :placeholder="$t('quotation.请选择状态')"
                      >
                        <el-option label="ALL" value=""></el-option>
                        <el-option
                          :label="$t('quotation.待报价')"
                          value="1"
                        ></el-option>
                        <el-option
                          :label="$t('quotation.报价中')"
                          value="2"
                        ></el-option>
                        <el-option
                          :label="$t('quotation.已报价')"
                          value="3"
                        ></el-option>
                        <el-option
                          :label="$t('quotation.作废单')"
                          value="9"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('quotation.创建日期：')">
                      <el-date-picker
                        value-format="yyyy-MM-dd"
                        v-model="filterParams.date"
                        @clear="clearFilter('date')"
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

                    <el-form-item>
                      <el-button type="primary" @click="filterItem">{{
                        $t("mycustomer.filter")
                      }}</el-button>
                      <el-button type="danger" @click="clearFilter">{{
                        $t("mycustomer.clear")
                      }}</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
            <el-table
              :data="items"
              stripe
              row-key="id"
              style="width: 100%"
              ref="gridTable"
            >
              <!-- <el-table-column label="ID" prop="id" width="70">
              </el-table-column> -->
              <el-table-column :label="$t('quotation.编号')" prop="code">
              </el-table-column>
              <el-table-column :label="$t('quotation.状态')">
                <template slot-scope="scope">
                  {{
                    (scope.row.status == 1 && $t("quotation.待报价")) ||
                    (scope.row.status == 2 && $t("quotation.报价中")) ||
                    (scope.row.status == 3 && $t("quotation.已报价")) ||
                    (scope.row.status == 4 && $t("quotation.作废单")) ||
                    $t("quotation.作废单")
                  }} 
                  <span v-if="scope.row.status == 2||scope.row.status == 3">（
                    {{
                    (scope.row.vendorStatus == 1 && $t("quotation.待报价")) ||
                    (scope.row.vendorStatus == 2 && $t("quotation.报价中")) ||
                    (scope.row.vendorStatus == 3 && $t("quotation.待审核")) ||
                    (scope.row.vendorStatus == 4 && $t("quotation.已采纳")) ||
                    (scope.row.vendorStatus == 9 && $t("quotation.未采纳")) ||
                    $t("quotation.无效")
                  }}
                  ）</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('quotation.报价单类型')">
                <template slot-scope="scope">
                  {{
                    scope.row.type == 1
                      ? $t("quotation.订单报价单")
                      : $t("quotation.商品报价单")
                  }}
                </template>
              </el-table-column>
              <template v-if="filterParams.type != 1">
                <el-table-column :label="$t('quotation.客户')">
                  <template slot-scope="scope">
                    {{ scope.row.customerName }}
                  </template>
                </el-table-column>
                <!-- <el-table-column
                  :label="$t('quotation.预计金额')"
                  prop="totalPrice"
                > 
                  <template slot-scope="scope">
                    <span v-if="scope.row.totalPrice">
                    <span
                      v-if="scope.row.currency"
                      style="color: #909399"
                      >{{ scope.row.currency
                      }}{{ $CE[scope.row.currency].symbol }}</span
                    >
                    <span v-else style="color: #909399">US$</span>
                    {{
                      scope.row.totalPrice
                    }}</span>
                    <span v-else>---</span>
                  </template>
                </el-table-column> -->
              </template>
              <template v-else>
                <el-table-column :label="$t('quotation.shopify店铺')">
                  <template slot-scope="scope" v-if="scope.row.accounts">
                    <div v-for="item in scope.row.accounts" :key="item.id">
                      {{ item }}
                    </div>
                  </template>
                  <span v-else>---</span>
                </el-table-column>
                <el-table-column
                  :label="$t('quotation.shopify订单')"
                  prop="orderCnt"
                >
                </el-table-column>
                <el-table-column
                  :label="$t('quotation.订单金额')"
                  prop="totalPrice"
                >
                </el-table-column>
              </template>
              <!-- <el-table-column :label="$t('quotation.我的报价')">
                <div></div>
                <template slot-scope="scope">
                  <span v-if="scope.row.offerPriceMin">
                    <span
                      v-if="scope.row.currency"
                      style="color: #909399"
                      >{{ scope.row.currency}}
                      {{ $CE[scope.row.currency].symbol }}</span>
                      <span v-else style="color: #909399">US$</span>
                      {{ scope.row.offerPriceMin }}</span>
                      <span v-else>{{ $t("quotation.未报价") }}</span>
                </template>
              </el-table-column> -->
              <el-table-column :label="$t('quotation.创建时间')" width="230">
                <div></div>
                <template slot-scope="scope">
                  <span
                    >{{
                      $moment
                        .unix(scope.row.timeCreated)
                        .format("YYYY-MM-DD HH:mm:ss")
                    }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('quotation.操作')" width="150">
                <div></div>
                <template slot-scope="scope">
                  <div v-if="scope.row.status != 9">
                    <!-- <template v-if="scope.row.type == 1">
                      <el-upload
                        ref="uploadxls"
                        :on-change="handleChange"
                        action=""
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        :auto-upload="false"
                        :limit="1"
                      >
                        <el-link
                          type="primary"
                          class="mg-r-15"
                          @click="importPro(scope.row)"
                          >{{ $t("quotation.导入") }}</el-link
                        >
                      </el-upload>

                      <el-link type="primary" @click="exportPro(scope.row)">{{
                        $t("quotation.导出")
                      }}</el-link
                      ><br />
                      <el-link type="primary" @click="getOrder(scope.row)">{{
                        $t("quotation.报价详情")
                      }}</el-link>
                    </template> -->
                    <template>
                      <el-link
                        type="primary"
                        v-if="scope.row.canComplete && scope.row.status != 3"
                        @click="completeQuotation(scope.row)"
                        >{{ $t("quotation.完成报价") }}</el-link
                      >
                    </template>
                  </div>
                   <!-- 商品报价单详情open -->
                      <div>
                        <el-link
                          type="primary"
                          @click="getProduct(scope.row)"
                          >{{ $t("quotation.报价详情") }}</el-link
                        >
                      </div>
                </template>
              </el-table-column>
            </el-table>
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
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 返回顶部 -->
    <el-backtop
      class="goto-top"
      target=".main-scroll  .el-scrollbar__wrap"
      :right="20"
      :bottom="20"
    >
    </el-backtop>
    <!-- 报价详情 -->
    <el-dialog
      :visible="quotationDetail"
      width="50%"
      @close="quotationDetail = false"
    >
      <div class="dialog-body">
        <div style="padding: 20px">
          <el-divider></el-divider>
          <el-table
            :data="datailList"
            stripe
            row-key="id"
            style="width: 100%"
            height="500"
            ref="gridTable2"
          >
            <el-table-column :label="$t('quotation.名称')" prop="name">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.name"
                  placement="top"
                >
                  <span class="tx-ellipsis2" style="white-space: none">
                    {{ scope.row.name }}
                  </span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column :label="$t('quotation.图片')" width="100">
              <template slot-scope="scope">
                <el-image
                  :src="scope.row.imgUrl"
                  style="height: 70px; width: 70px"
                  :z-index="9999"
                  fit="cover"
                  :preview-src-list="[scope.row.imgUrl]"
                ></el-image>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('quotation.客户SKU')"
              prop="shopifySkuId"
            ></el-table-column>
            <el-table-column :label="$t('quotation.属性')" prop="propertyValue">
            </el-table-column>
            <el-table-column label="SKU" prop="vendorSku">
              <template slot-scope="scope">
                <span v-if="scope.row.vendorSku"
                  >{{ scope.row.vendorSku }}
                </span>
                <span v-else>---</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('quotation.报价')">
              <template slot-scope="scope">
                <span v-if="scope.row.price">{{ scope.row.price }} </span>
                <span v-else>{{ $t("quotation.未报价") }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    
    <!-- 商品报价详情 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible="ProductDetailVis"
      width="50%"
      @close="ProductDetailVis = false"
      :title="$t('quotation.报价详情')"
    >
      <!-- 添加商品 -->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      v-loading="addLoading"
      :visible="addProductVis"
      width="70%"
      @close="closeAdd"
      :title="$t('quotation.添加商品')"
    >
      <el-divider></el-divider>
      <div class="addprobox">
        <b>{{ $t("quotation.基础信息") }}</b>
        <el-form :label-position="'left'">
          <el-form-item :label="$t('quotation.图片：')" label-width="150px">
            <div class="upload">
              <el-image
                style="width: 100%; height: 100%"
                :src="nowItem.imgUrl"
                :z-index="9999"
                :fit="'cover'"
                :preview-src-list="[nowItem.imgUrl]"
              ></el-image>
            </div>
          </el-form-item>
          <el-form-item :label="$t('quotation.描述')" label-width="150px">
            <span>{{ nowItem.detail }}</span>
          </el-form-item>
          <el-form-item :label="$t('quotation.期望价格US($)')" label-width="150px">
            <span v-if="nowItem.expectPrice && nowItem.expectPrice!='0.00'">
              {{ nowItem.expectPrice }}</span>
              <span v-else>/</span>
          </el-form-item>
          <el-form-item :label="$t('quotation.备注')" label-width="150px">
            <span>{{ nowItem.remarks }}</span>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div style="padding: 20px 0">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane :label="$t('quotation.手工添加')" name="first">
              <b class="mg-t-20">{{ $t("quotation.商品规格") }}</b>
              <div style="margin-left: 40px; margin-top: 20px">
                <div class="mg-b-20">
                  {{ $t("quotation.规格名称：") }}
                  <el-tag
                    v-for="(tag, index) in dynamicTags"
                    :key="index"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                  >
                    {{ tag.name }}
                  </el-tag>
                  <template>
                    <el-input
                      class="input-new-tag"
                      v-if="inputVisible"
                      v-model="inputValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button
                      v-else
                      class="button-new-tag"
                      size="small"
                      @click="showInput"
                      >{{ $t("quotation.+ 自定义") }}</el-button
                    >
                    <span style="color:#ccc;margin-left:20px">{{ $t("quotation.回车键确认添加") }}</span>
                  </template>
                </div>
                <div style="display: flex">
                  <div style="width: 76px; padding-top: 14px">
                    {{ $t("quotation.规格值：") }}
                  </div>
                  <div>
                    <div
                      class="mg-t-10 d-flex"
                      v-for="(tag, index) in dynamicTags"
                      :key="index"
                    >
                      <span>{{ tag.name }}: </span>
                      <el-input
                        class="input-new-tag"
                        ref="saveTagInput"
                        size="small"
                        v-model="tag.value"
                        :placeholder="$t('quotation.请输入值')"
                      >
                      </el-input>
                    </div>
                  </div>
                </div>
                <div class="mg-t-15">
                  <el-button
                    type="primary"
                    size="small"
                    @click="addPro('on')"
                    >{{ $t("quotation.添加") }}</el-button
                  >
                </div>
              </div>
            </el-tab-pane>
            <!-- 商品链接添加 -->
            <el-tab-pane :label="$t('quotation.商品链接添加')" name="second">
              <el-form>
                <el-form-item :label="$t('quotation.商品链接：')">
                  <el-input
                    style="width: 80%"
                    class="mg-r-20"
                    :placeholder="$t('quotation.请输入AliExpress商品链接')"
                    v-model="LinkUrl"
                    @keyup.enter.native="LinkAdd"
                    
                  ></el-input>
                  <el-button type="primary" @click="LinkAdd">{{
                    $t("quotation.添加")
                  }}</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
        <el-divider></el-divider>
        <!-- 编辑属性 -->
        <el-dialog
          width="40%"
          :title="$t('quotation.编辑属性')"
          :visible.sync="innerVisible"
          append-to-body
          @close="closeEdit"
        >
          <div style="margin-left: 40px; margin-top: 20px">
            <div class="mg-b-20">
              {{ $t("quotation.规格名称：") }}
              <el-tag
                closable
                v-for="(tag, index) in dynamicTags2"
                :key="index"
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag.name }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible2"
                v-model="inputValue2"
                ref="saveTagInput2"
                size="small"
                @keyup.enter.native="handleInputConfirm2"
                @blur="handleInputConfirm2"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput2">{{$t('quotation.+ 自定义')}}</el-button>
            </div>
            <div style="display: flex">
              <div style="width: 76px; padding-top: 14px">
                {{ $t("quotation.规格值：") }}
              </div>
              <div>
                <div
                  class="mg-t-10 d-flex"
                  v-for="(tag, index) in dynamicTags2"
                  :key="index"
                >
                  <span>{{ tag.name }}: </span>
                  <el-input
                    class="input-new-tag"
                    ref="saveTagInput2"
                    size="small"
                    v-model="tag.value"
                    :placeholder="$t('quotation.请输入值')"
                  >
                  </el-input>
                </div>
              </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addPro()">{{
              $t("quotation.修改")
            }}</el-button>
          </div>
        </el-dialog>
        <!-- 商品规格列表 -->
        <div style="padding: 20px 0">
          <b class="mg-t-20">{{ $t("quotation.商品规格列表") }}</b>
          <el-table
            :data="productList.stocks"
            stripe
            row-key="id"
            style="width: 100%"
            ref="gridTable2"
          >
            <el-table-column :label="$t('quotation.名称')">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" />
              </template>
            </el-table-column>
            <el-table-column label="SKU">
              <template slot-scope="scope">
                <el-input v-model="scope.row.vendorSku" />
              </template>
            </el-table-column>
            <!-- <el-table-column v-for="(info,index) in propertyList" :key="info" :label="info">
              <template slot-scope="scope">
                {{scope.row.propertyValue.split("||")[index]}}
              </template>
            </el-table-column> -->
            <el-table-column :label="$t('quotation.属性')">
              <template slot-scope="scope">
                <div v-for="(info, index) in scope.row.propertyName.split('||')" :key="info">
                  {{ info }} : {{ scope.row.propertyValue.split("||")[index] }}
                </div>
                <el-link type="primary" @click="editProper(scope.row)">{{
                  $t("quotation.编辑")
                }}</el-link>
              </template>
            </el-table-column>
            <el-table-column :label="$t('quotation.报价($)')" width="180">
              <template slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="false"
                  v-model="scope.row.price"
                  style="width: 140px"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column :label="$t('quotation.操作')" width="120">
                <template slot-scope="scope">
                  <el-link type="primary" @click="delProper(scope)">{{$t('quotation.删除')}}</el-link>
                </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addProductVis = false">{{
          $t("mycustomer.取 消")
        }}</el-button>
        <el-button type="primary" @click="save">{{
          $t("quotation.保存并完成报价")
        }}</el-button>
      </div>
    </el-dialog>
    <!-- 单个商品报价详情 -->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :visible="ProductDetailbody"
      width="70%"
      @close="ProductDetailbody = false"
      :title="$t('quotation.报价详情')"
    >
      <el-divider></el-divider>
      <div class="addprobox">
        <b>{{ $t("quotation.基础信息") }}</b>
        <el-form :label-position="'left'">
          <el-form-item :label="$t('quotation.图片：')" label-width="150px">
            <div class="upload">
              <el-image
                style="width: 100%; height: 100%"
                :src="nowItemDetail.imgUrl"
                :z-index="9999"
                :fit="'cover'"
                :preview-src-list="[nowItemDetail.imgUrl]"
              ></el-image>
            </div>
          </el-form-item>
          <el-form-item :label="$t('quotation.描述')" label-width="150px">
            <span>{{ nowItemDetail.detail }}</span>
          </el-form-item>
          <el-form-item :label="$t('quotation.期望价格US($)')" label-width="150px">
            <span v-if="nowItemDetail.expectPrice && nowItemDetail.expectPrice!='0.00'">
              {{ nowItemDetail.expectPrice }}</span>
              <span v-else>/</span>
          </el-form-item>
          <el-form-item :label="$t('quotation.备注')" label-width="150px">
            <span>{{ nowItemDetail.remarks }}</span>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div style="padding: 20px 0">
          <b class="mg-t-20">{{ $t("quotation.商品规格列表") }}</b>
          <el-table
            :data="nowItemDetail.offerPrices"
            stripe
            row-key="id"
            style="width: 100%"
            ref="gridTable2"
          >
            <el-table-column :label="$t('quotation.名称')">
              <template slot-scope="scope">
                <span>{{ scope.row.productName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="SKU">
              <template slot-scope="scope">
                <span>{{ scope.row.vendorSku }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('quotation.属性')">
              <template slot-scope="scope">
                <div v-if="scope.row.propertyName">
                  <div v-for="(info, index) in scope.row.propertyName.split('||')" :key="info">
                    {{ info }} : {{ scope.row.variableId.split("||")[index] }}
                  </div>
                </div>
                <div v-else>---</div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('quotation.报价($)')" width="160">
              <template slot-scope="scope">
                <span>{{ scope.row.price }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    
     <div class="dialog-body">
        <div style="padding: 20px">
          <el-divider></el-divider>
          <el-table
            :data="productDetailList"
            stripe
            row-key="id"
            style="width: 100%"
            height="500"
            ref="gridTable3"
          >
            <el-table-column :label="$t('quotation.图片')" width="150">
              <template slot-scope="scope">
                <el-image
                  :src="scope.row.imgUrl"
                  style="height: 70px; width: 70px"
                  :z-index="9999"
                  fit="cover"
                  :preview-src-list="[scope.row.imgUrl]"
                ></el-image>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('quotation.描述')"
              prop="detail"
            ></el-table-column>
            <el-table-column :label="$t('quotation.期望价格US($)')" prop="expectPrice">
              <template slot-scope="scope">
                <span v-if="scope.row.expectPrice&&scope.row.expectPrice!= '0.00'">
                  {{scope.row.expectPrice}}
                </span>
                <span v-else>
                  /
                </span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('quotation.备注')" prop="remarks">
              <template slot-scope="scope">
                 <span v-if="scope.row.remarks">{{scope.row.remarks}}</span>
                 <span v-else>---</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('quotation.操作')">
              <template slot-scope="scope">
                <div v-if="filterParams.status!=9">
                  <el-link type="primary" v-if="!scope.row.offerPrices || scope.row.offerPrices.length == 0"
                  @click="addProduct(scope.row)">{{$t('quotation.提交商品')}}</el-link>
                  <el-link type="primary" v-else @click="proDetail(scope)">{{$t('quotation.报价详情')}}</el-link>
                </div>
                <div v-else>
                    ---
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      productDetailList:[],
      ProductDetailbody:false,
      isReady: true,
      propertyList2: [],
      nowItemDetail: {},
      ProductDetailVis: false,
      offerId: "",
      index: "",
      innerVisible: false,
      nowItem: {},
      addLoading: false,
      propertyList: [],
      productList: {
        stocks: [],
      },
      importId: "",
      uploadFile: "",
      LinkUrl: "",
      activeName: "first",
      items: [],
      datailList: [],
      loading: false,
      addProductVis: false,
      filterParams: {
        code: "",
        customerId: "",
        customer: "",
        accountId:"",
        account:"",
        status: "",
        type: "2",
        date: [],
        timeCreatedFrom: "",
        timeCreatedTo: "",
      },
      dynamicTags: [],
      dynamicTags2: [],
      inputVisible2: false,
      inputValue2: "",
      inputVisible: false,
      inputValue: "",
      filterParamsDefault: "{}",
      quotationDetail: false,
      pageSizes: [10, 20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("myQuotationRowsPerPage")
        ? Number(localStorage.getItem("myQuotationRowsPerPage"))
        : 10,
      total: 0,
      totalPage: 0,
      getShopNameInput:{
        shopList:[],
        loading:false,
      },
      selectLoading:false,
      selectArr:[]
    };
  },
  watch: {
    $route: "gotoPage",
  },
  mounted() {
    this.filterParamsDefault = JSON.stringify(this.filterParams);
    this.getItem();
  },
  methods: {
    close() {
      this.selectArr = [];
      this.filterParams.customerId = this.filterParams.customer = '';
      this.getItem();
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
    completeQuotation(item){
      this.loading = true;
      this.$apiCall('api.OfferList.completeOffer',{
        id:item.id
      },r=>{
        this.loading = false;
        if(r.ErrorCode == 9999){
          this.getItem();
          this.$message({ message: this.$t('quotation.完成报价成功'), type: "success" });

        }else{
          this.$message({ message: r.Message, type: "error" });
        }
      }) 
    },
    proDetail(item){
      this.nowItemDetail = this.productDetailList[item.$index];
      // console.log(this.productDetailList);
      if(this.productDetailList[item.$index].offerPrices[0] && this.productDetailList[item.$index].offerPrices[0].propertyName){
        this.propertyList2 =
        this.productDetailList[item.$index].offerPrices[0].propertyName.split("||")
      }else{
        this.propertyList2=[]
      }
      
      this.ProductDetailbody = true;
    },
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
    delProper(s){
      //  console.log(s);
       let num = s.$index
       this.productList.stocks.splice(num,1);
       this.$elementMessage(this.$t("quotation.删除成功"), "success");
    },
    handleChange(file) {
      this.loading = true;
      this.$apiCall(
        "api.OfferList.importByVendor",
        {
          id: this.importId,
          "@file": file.raw,
        },
        (r) => {
          this.loading = false;
          if (r.ErrorCode == "9999") {
            // this.setOtherERPDialog.attach.push(r.Data.Results.url);
            this.$elementMessage(this.$t("quotation.导入成功"), "success");
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    closeAdd() {
      this.addProductVis = false;
      this.productList = {
        stocks: [],
      };
      this.dynamicTags = [];
      this.propertyList = [];
      this.LinkUrl = '';
      this.activeName = 'first'
      // this.isReady = true;
    },
    closeEdit() {
      this.dynamicTags2 = [];
      this.inputVisible2 = false;
      this.inputValue2 = "";
    },
    editProper(item) {
      this.productList.stocks.forEach((m, n) => {
        if (m == item) {
          this.index = n;
        }
      });
      let arr = item.propertyName.split("||");
      arr.forEach((e, i) => {
        this.dynamicTags2.push({
          name: e,
          value: item.propertyValue.split("||")[i],
        });
      });
      this.innerVisible = true;
    },
    addPro(one) {
      if (one) {
        //添加属性
        // if (this.dynamicTags.length == 0) {
        //   this.$elementMessage(this.$t("quotation.请添加一个属性"), "error");
        //   return false;
        // }
        let Arr = [];
        this.propertyList = [];
        // if (this.isReady == true) {
          this.dynamicTags.forEach((e) => {
            Arr.push(e.value);
            this.propertyList.push(e.name);
          });
        // }else{
          //  this.dynamicTags.forEach(e=>{
          //     Arr.push(e.value);
          //   });
        // }
        this.productList.propertyName = this.propertyList.join("||");
        let isRepeat = false;
        this.productList.stocks.forEach(n=>{
          if(n.propertyValue == Arr.join("||")&&n.propertyName == this.propertyList.join("||")){
            this.$elementMessage(this.$t("quotation.不能添加重复属性"), "error");
            isRepeat = true;
          }
        })
        if(!isRepeat){
            this.productList.stocks.push({
            name: "",
            price: "",
            propertyValue: Arr.join("||"),
            propertyName: this.propertyList.join("||"),
            vendorSku: "",
          });
          // this.isReady = false;
          this.$elementMessage(this.$t("quotation.添加成功"), "success");
        }else{
          return false;
        }
        
      } else {
        //修改属性
        let Arr2 = [];
        let proList = [];
        let isRepeat2 = false;
        this.dynamicTags2.forEach((e) => {
          Arr2.push(e.value);
          proList.push(e.name);
        });
        this.productList.stocks.forEach(n=>{
          if(n.propertyValue == Arr2.join("||")&&n.propertyName == proList.join("||")){
            this.$elementMessage(this.$t("quotation.该属性已存在"), "error");
            isRepeat2 = true;
          }
        })
        if(isRepeat2 == false){
          this.productList.stocks[this.index].propertyValue = Arr2.join("||");
          this.productList.stocks[this.index].propertyName = proList.join("||");
          this.innerVisible = false;
          this.$elementMessage(this.$t("quotation.编辑成功"), "success");
        }else{
          return false;
        }
        
      }
    },
    // 保存商品报价
    save() {
      this.addLoading = true;
      let Arr = this.productList.stocks;
      Arr.forEach((e) => {
        e.productName = e.name;
      });
      this.$apiCall(
        "api.OfferList.completeByVendor",
        {
          id: this.offerId,
          offerId: this.nowItem.offerId,
          skuArr: Arr,
        },
        (r) => {
          this.addLoading = false;
          if (r.ErrorCode == 9999) {
            this.$elementMessage(this.$t("quotation.保存成功"), "success");
            this.getItem();
            this.addProductVis = false;
            this.ProductDetailVis = false;
          } else {
            this.$message({ message: r.Message, type: "error" });
          }
        }
      );
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      if (this.inputValue) {
        this.dynamicTags.push({ name: this.inputValue, value: "" });
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    //链接添加修改属性
    // handleClose2(tag) {
    //   this.dynamicTags2.splice(this.dynamicTags2.indexOf(tag), 1);
    // },
    showInput2() {
      this.inputVisible2 = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput2.$refs.input.focus();
      });
    },
    handleInputConfirm2() {
      if (this.inputValue2) {
        this.dynamicTags2.push({ name: this.inputValue2, value: "" });
      }
      this.inputVisible2 = false;
      this.inputValue2 = "";
    },
    importPro(item) {
      this.importId = item.id;
    },
    exportPro(item) {
      this.loading = true;
      if ($("#ifilePro").length == 0) {
        $("body").append(
          '<iframe id="ifilePro" style="display:none"></iframe>'
        );
      }
      this.$apiCall(
        "api.OfferList.exportByVendor",
        {
          id: item.id,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            this.loading = false;
            this.$elementMessage(this.$t("quotation.导出成功"), "success");
            document.getElementById("ifilePro").src = r.Data.Results.file;
          } else {
            this.$message({ message: r.Message, type: "error" });
          }
        }
      );
    },
    // 商品链接添加
    LinkAdd() {
      this.addLoading = true;
      this.$apiCall(
        "api.OfferList.getByUrl",
        {
          url: this.LinkUrl,
        },
        (r) => {
          this.addLoading = false;
          if (r.ErrorCode == 9999) {
            r.Data.Results.stocks.forEach((e) => {
              e.name = r.Data.Results.productName;
              e.propertyName = r.Data.Results.propertyName;
            });
            this.productList = r.Data.Results;
            this.propertyList = this.productList.propertyName.split("||");
            this.$elementMessage(this.$t("quotation.添加成功"), "success");
          } else {
            this.$message({ message: r.Message, type: "error" });
          }
        }
      );
    },

    addProduct(item) {
      this.nowItem = item;
      this.offerId = item.id;
      this.addProductVis = true;
    },
    toPage(val) {
      if (val != this.$route.query.page)
        this.$router.push({ query: { page: val } });
    },
    changePageSize(val) {
      this.rowsPerPage = val;
      localStorage.setItem("myQuotationRowsPerPage", val);
      this.getItem();
    },
    gotoPage() {
      this.page = this.$route.query.page ? this.$route.query.page : 1;
      this.getItem();
    },
    getItem() {
      this.loading = true;
      this.$apiCall(
        "api.OfferList.findByVendor",
        {
          status: this.filterParams.status,
          type: this.filterParams.type,
          customerId: this.filterParams.customerId,
          accountId: this.filterParams.accountId,
          code: this.filterParams.code,
          timeCreatedFrom: this.filterParams.timeCreatedFrom,
          timeCreatedTo: this.filterParams.timeCreatedTo,
          page: this.page,
          rowsPerPage: this.rowsPerPage,
        },
        (r) => {
          this.loading = false;
          if (r.ErrorCode == 9999) {
            this.items = r.Data.Results;
            this.total = Number(r.Data.Pagination.totalCount);
            this.totalPage = Number(r.Data.Pagination.totalPage);
            this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
          } else {
            this.$message({ message: r.Message, type: "error" });
          }
        }
      );
    },
    dateChange() {
      if (this.filterParams.date.length > 1) {
        this.filterParams.timeCreatedFrom = this.$moment(
          this.filterParams.date[0]
        ).format("YYYY-MM-DD");
        this.filterParams.timeCreatedTo = this.$moment(
          this.filterParams.date[1]
        ).format("YYYY-MM-DD");
        this.filterItem();
      }
    },
    getOrder(item) {
      // this.datailList = item.items;
      this.$apiCall(
        "api.OfferList.getDetailByVendor",
        {
          id: item.id,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            this.datailList = r.Data.Results;
          } else {
            this.$message({ message: r.Message, type: "error" });
          }
        }
      );
      this.quotationDetail = true;
    },
    
    getProduct(item) {
      this.$apiCall(
        "api.OfferList.getDetailByVendor",
        {
          id: item.id,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            this.productDetailList = r.Data.Results;
            
            this.ProductDetailVis = true;
          } else {
            this.$message({ message: r.Message, type: "error" });
          }
        }
      );
    },
    clearFilter(type) {
      switch (type) {
        case "code":
          this.filterParams.code = "";
          break;
        case "customerId":
          this.filterParams.customerId = "";
          this.filterParams.accountId = "";
          break;
        case "type":
          this.filterParams.type = "";
          break;
        case "date":
          this.filterParams.date = [];
          this.filterParams.timeCreatedFrom = "";
          this.filterParams.timeCreatedTo = "";
          break;
        default:
          this.filterParams = JSON.parse(this.filterParamsDefault);
          break;
      }
      this.filterItem();
    },
    filterItem(type) {
      if(type == 'cust'){
        this.selectArr.forEach(i=>{
          if(i.customerName==this.filterParams.customer){
            this.filterParams.customerId = i.customerId
          }
        });
        this.getItem();
      }else{
        if (this.$route.query.page == 1) {
        this.getItem();
        } else {
          this.$router.push({ query: { page: 1 } });
        }
      }
      
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
.upload {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 80px;
  height: 80px;
  cursor: pointer;
  line-height: 80px;
  vertical-align: top;
  text-align: center;
  margin-right: 15px;
  i {
    font-size: 16px;
  }
}
.addprobox {
  padding: 20px 40px;
  overflow-y: auto;
  height: 450px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
<style>
.el-upload-list.el-upload-list--text {
  display: none;
}
.import-page .el-alert__title {
  font-size: 16px;
}
.el-drawer__wrapper *:focus {
  outline: 0;
}
</style>

