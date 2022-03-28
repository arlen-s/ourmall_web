<template>
  <el-scrollbar class="page-content" ref="myScrollbar1" style="height: 100%">
    <!--    <iframe :src="iframeUrl" style="opacity: 0;height: 0;position: absolute;"></iframe>-->
    <div class="invoice" v-cloak>
      <div v-if="!fromPage" class="invoice-top" style="height: 60px">
        <div v-if="loginType == 1 || loginType == 2">
          <header
            style="
              position: fixed;
              top: 0;
              left: 0;
              z-index: 9;
              width: 100%;
              height: 60px;
              padding: 0 15px;
            "
          >
            <div style="width: 1100px; margin: 0 auto; padding: 0px 30px 0 0">
              <div
                v-if="loginType == 2"
                class="tx-left"
                style="
                  background-color: rgb(253, 246, 236);
                  border-radius: 4px;
                  border-left: 5px solid rgb(230, 162, 60);
                  margin: 0 0 0 0px;
                  height: 60px;
                  padding: 0 20px;
                  box-shadow: rgba(33, 33, 33, 0.4) 0px 1px 4px 0px;
                "
              >
                <p
                  style="
                    color: #606266;
                    font-weight: 600;
                    margin-bottom: 0;
                    font-size: 14px;
                    line-height: 60px;
                  "
                  class="d-flex justify-content-start"
                >
                  {{ $t("invoice.justneed") }}
                  <a
                    @click="openLogin"
                    href="javascript:;"
                    style="
                      margin-right: 5px;
                      margin-left: 5px;
                      color: #e6a23c;
                      text-decoration: underline;
                      font-size: 14px;
                    "
                    >{{ $t("invoice.complete") }}</a
                  >
                  {{ $t("invoice.then") }}
                  <a
                    @click="openLogin"
                    href="javascript:;"
                    style="
                      margin-right: 5px;
                      margin-left: 5px;
                      color: #e6a23c;
                      text-decoration: underline;
                      font-size: 14px;
                    "
                    >{{ $t("invoice.my") }}</a
                  >
                  {{ $t("invoice.historical") }}
                </p>
              </div>
              <div
                v-if="loginType == 1"
                class="tx-left"
                style="
                  background-color: rgb(253, 246, 236);
                  border-radius: 4px;
                  border-left: 5px solid rgb(230, 162, 60);
                  margin: 0 0 0 0px;
                  height: 60px;
                  padding: 0 20px;
                  box-shadow: rgba(33, 33, 33, 0.4) 0px 1px 4px 0px;
                "
              >
                <p
                  style="
                    color: #606266;
                    font-weight: 600;
                    margin-bottom: 0;
                    font-size: 14px;
                    line-height: 60px;
                  "
                  class="d-flex justify-content-start"
                >
                  {{ $t("invoice.just") }}
                  <a
                    @click="openLogin"
                    href="javascript:;"
                    style="
                      margin-right: 5px;
                      margin-left: 5px;
                      color: #e6a23c;
                      text-decoration: underline;
                      font-size: 14px;
                    "
                    >{{ $t("invoice.sign") }}</a
                  >
                  {{ $t("invoice.then") }}
                  <a
                    @click="openLogin"
                    href="javascript:;"
                    style="
                      margin-right: 5px;
                      margin-left: 5px;
                      color: #e6a23c;
                      text-decoration: underline;
                      font-size: 14px;
                    "
                    >{{ $t("invoice.my") }}</a
                  >
                  {{ $t("invoice.historical") }}
                </p>
              </div>
            </div>
          </header>
        </div>
        <div v-else-if="showTopTip && !fromPage">
          <header
            style="
              position: fixed;
              top: 0;
              left: 0;
              z-index: 9;
              width: 100%;
              height: 60px;
              padding: 0 15px;
            "
          >
            <div style="width: 1100px; margin: 0 auto; padding: 0px 30px 0 0">
              <div
                class="tx-left"
                style="
                  background-color: #f0f9eb;
                  border-radius: 4px;
                  border-left: 5px solid #67c23a;
                  margin: 0 0 0 0px;
                  height: 60px;
                  padding: 0 20px;
                  box-shadow: rgba(33, 33, 33, 0.4) 0px 1px 4px 0px;
                "
              >
                <p
                  style="
                    color: #606266;
                    font-weight: 600;
                    margin-bottom: 0;
                    font-size: 14px;
                    line-height: 60px;
                  "
                  class="d-flex justify-content-start"
                >
                  {{ $t("invoice.click") }}
                  <router-link
                    :to="{ path: '/dashboard' }"
                    target="_blank"
                    style="
                      margin-right: 5px;
                      margin-left: 5px;
                      color: #67c23a;
                      text-decoration: underline;
                      font-size: 14px;
                    "
                    >{{ $t("invoice.my") }}</router-link
                  >
                  {{ $t("invoice.historical") }}
                </p>
              </div>
            </div>
          </header>
        </div>
      </div>
      <!-- v-infinite-scroll="load" -->
      <div :infinite-scroll-distance="800" infinite-scroll-disabled="disabled">
        <el-container
          id="invoiceContainer"
          :class="noMore || tabActive == 5 ? '' : 'pd-b-100'"
        >
          <el-main style="position: relative">
            <el-card shadow="always" style="margin-bottom: 20px">
              <el-steps :active="stepActive" process-status="wait">
                <el-step
                  :title="$t('invoice.step1')"
                  :icon="stepActive > 1 ? 'el-icon-success' : ''"
                  :description="$t('invoice.ImportShopify')"
                ></el-step>
                <el-step
                  :title="$t('invoice.step2')"
                  :icon="stepActive > 2 ? 'el-icon-success' : ''"
                  :description="$t('invoice.Improvenumber')"
                ></el-step>
                <el-step
                  :title="$t('invoice.step3')"
                  :icon="stepActive > 3 ? 'el-icon-success' : ''"
                  :description="$t('invoice.collectionstatus')"
                ></el-step>
                <el-step
                  :title="$t('invoice.step4')"
                  :icon="stepActive > 4 ? 'el-icon-success' : ''"
                  :description="$t('invoice.cooperation')"
                ></el-step>
              </el-steps>
            </el-card>
            <template
              v-if="
                invoiceInfo.status != 4 &&
                invoiceInfo.status != 5 &&
                invoiceInfo.status != 6
              "
            >
              <div
                v-if="
                  invoiceInfo.extraJson &&
                  invoiceInfo.extraJson.importErrorLog &&
                  invoiceInfo.extraJson.importErrorLog.length
                "
                class="warning"
                style="
                  padding: 8px 16px;
                  background-color: #fff6f7;
                  border-radius: 4px;
                  border-left: 5px solid #fe6c6f;
                  margin: 20px 0;
                "
              >
                <div
                  style="cursor: pointer"
                  @click="showErrorLog = !showErrorLog"
                  class="d-flex align-items-center justify-content-between"
                >
                  <span>
                    {{ invoiceInfo.extraJson.importErrorLog[0] }}
                    <span
                      v-if="
                        !showErrorLog &&
                        invoiceInfo.extraJson.importErrorLog.length
                      "
                      style="margin-left: 30px"
                      >(等{{
                        invoiceInfo.extraJson.importErrorLog.length
                      }}条错误数据,<a href="javascript:;">点击展开</a
                      >查看详情)</span
                    >
                  </span>
                  <i
                    v-show="invoiceInfo.extraJson.importErrorLog.length > 1"
                    :class="
                      showErrorLog ? 'el-icon-arrow-down' : 'el-icon-arrow-up'
                    "
                  ></i>
                </div>
                <div
                  v-show="
                    showErrorLog &&
                    invoiceInfo.extraJson.importErrorLog.length > 1
                  "
                >
                  <p
                    v-for="(log, i) in invoiceInfo.extraJson.importErrorLog"
                    v-if="i != 0"
                  >
                    {{ log }}
                  </p>
                </div>
              </div>
            </template>

            <el-card shadow="always" class="m-card">
              <div v-if="invoiceInfo.status == '9'" class="cancel-label">
                {{ $t("invoice.cancel") }}
              </div>
              <!-- 第一块 采购订单-->
              <div class="top-1">
                <div class="left">
                  <h2>{{ $t("invoice.采购订单") }}</h2>
                </div>
                <div class="center">
                  <div
                    class="grid-content invoice-header-logo"
                    v-loading="pageLoading"
                  >
                    <template v-if="!showLogo">
                      <el-upload
                        class="avatar-uploader"
                        ref="upload_img"
                        action=""
                        accept="image/jpeg,image/jpg,image/png"
                        name="file"
                        :show-file-list="false"
                        :http-request="uploadSectionFile"
                      >
                        <img
                          v-if="showLogo"
                          :src="logoUrl"
                          style="width: 100%; height: 100%"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </template>
                    <template v-if="showLogo">
                      <div class="tx-left">
                        <el-image
                          :src="logoUrl"
                          style="height: 70px; width: 70px"
                          :preview-src-list="[logoUrl]"
                        ></el-image>
                        <el-button
                          style="padding: 0"
                          type="text"
                          @click="removelogo"
                          class="mg-l-10"
                          >删除LOGO</el-button
                        >
                      </div>
                    </template>
                  </div>
                </div>
                <div>
                  <div class="grid-content invoice-header-info">
                    <template v-if="invoiceInfo.vendorName">
                      <div class="wv-text-strong">
                        {{
                          invoiceInfo.vendorName
                            ? invoiceInfo.vendorName
                            : "---"
                        }}
                        <el-button
                          v-if="
                            invoiceInfo.payStatus == 2 &&
                            invoiceInfo.status != '9'
                          "
                          style="padding: 0"
                          slot="reference"
                          type="text"
                          @click="editCompany"
                          >{{ $t("invoice.edit") }}</el-button
                        >
                      </div>
                    </template>
                    <template v-else>
                      <el-input
                        @change="editCompanyByInput()"
                        class="tx-right-input"
                        style="margin: 10px 0"
                        size="small"
                        :placeholder="$t('invoice.fillname')"
                        v-model="editCompanyName"
                      ></el-input>
                    </template>
                  </div>
                </div>
                <div class="right">
                  <div class="code">PO # {{ invoiceInfo.code || "---" }}</div>
                  <div class="date">
                    {{ $t("invoice.采购单日期") }}：{{
                      invoiceInfo.timeCreated || "---"
                    }}
                  </div>
                  <div class="lang">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="中文"
                      placement="top"
                    >
                      <a
                        href="javascript:;"
                        :class="{ active: $i18n.locale == 'zh' }"
                        @click="changeLang('zh')"
                      >
                        <svg
                          class="icon"
                          aria-hidden="true"
                          style="width: 32px; height: 24px"
                        >
                          <use xlink:href="#icon-flag-c"></use>
                        </svg>
                      </a>
                    </el-tooltip>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="EN"
                      placement="top"
                    >
                      <a
                        href="javascript:;"
                        :class="{ active: $i18n.locale == 'en' }"
                        @click="changeLang('en')"
                      >
                        <svg
                          class="icon"
                          aria-hidden="true"
                          style="width: 32px; height: 24px"
                        >
                          <use xlink:href="#icon-flag-e"></use>
                        </svg>
                      </a>
                    </el-tooltip>
                  </div>
                </div>
              </div>
              <el-divider></el-divider>
              <!-- 第二块 客户名称 -->
              <div class="top-2">
                <div class="left">
                  <div class="title">{{ $t("invoice.客户名称") }}</div>
                  <div class="t-name">
                    <span class="mg-r-15">{{
                      invoiceInfo.customerName || "---"
                    }}</span>
                    <!-- 店铺名和别名. 有别名显示别名没有显示店铺名 -->
                    <span
                      v-if="
                        invoiceInfo.customerShopName ||
                        invoiceInfo.customerShopNameAlia
                      "
                    >
                      ({{
                        invoiceInfo.customerShopNameAlia
                          ? invoiceInfo.customerShopNameAlia
                          : invoiceInfo.customerShopName
                      }})
                    </span>
                  </div>
                </div>
                <div class="right">
                  <div v-if="invoiceInfo.status" class="t-status">
                    {{ $t("invoice.订单状态") }}：
                    <el-tooltip
                      v-if="invoiceInfo.status == '9' && invoiceInfo.stopReason"
                      class="item"
                      effect="dark"
                      :content="invoiceInfo.stopReason"
                      placement="top"
                    >
                      <span>{{
                        $t($dict.invoiceStatus[invoiceInfo.status].text)
                      }}</span>
                    </el-tooltip>
                    <span
                      v-else
                      :class="`tx-${
                        $dict.invoiceStatus[invoiceInfo.status].type
                      }`"
                      >{{
                        $t($dict.invoiceStatus[invoiceInfo.status].text)
                      }}</span
                    >
                  </div>
                  <div class="t-amount">
                    {{ $t("invoice.采购单金额") }}(US$):
                    <span
                      :class="{
                        'active tx-danger': realAmount && realAmount > 0,
                      }"
                      :style="{
                        fontWeight:
                          realAmount && realAmount > 0 ? 'bold' : 'normal',
                      }"
                    >
                      {{
                        realAmount && realAmount > 0
                          ? $numberToCurrency(realAmount)
                          : $t("invoice.Notset")
                      }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- <el-row type="flex" style="align-items: flex-start;">
                <el-col :span="12">
                </el-col>
              </el-row> -->
              <!-- <el-divider></el-divider> -->
              <!--<el-row type="flex" align="middle">
                 <el-col :span="12">
                  <div class="grid-content invoice-metadata-custome tx-left pos-relative">
                    <div>
                      BILL To
                      <br />
                      <template>
                        <span style="cursor: pointer;" class="wv-text-strong">{{invoiceInfo.customerName ? invoiceInfo.customerName : '---'}}</span>
                      </template>
                      <template v-if="invoiceInfo.payStatus == 2">
                        <el-popover popper-class="with-shadow" trigger="click" width="300" ref="popoverCustomer" placement="bottom">
                          <el-button v-if="invoiceInfo.status != '9'" slot="reference" type="text" @click="changeCustomer" style="margin-left: 20px;">{{$t('invoice.Changecustomers')}}</el-button>
                          <div class="tx-center change-customer">
                            <el-input :placeholder="$t('invoice.entername')" prefix-icon="el-icon-search" v-model="customerName" :autofocus="true" ref="customerAutocomplete"></el-input>
                            <div class="mg-t-10">
                              <div v-for="(relation,index) in relationship" v-show="index < 5" :key="index+relation.id+relation.customerName" class="text customer-item" :class="{active: relation.active}" @click="selectCustomer(relation)">
                                {{relation.customerName}}
                              </div>
                            </div>
                            <el-divider></el-divider>
                            <template v-if="customerName == ''">
                              <el-button type="primary" plain @click="addCustomer"><i class="fa fa-user-plus mg-r-10"></i>{{$t('invoice.newcustomer')}}</el-button>
                            </template>
                            <template v-else>
                              <el-button type="primary" plain @click="addCustomer"><i class="fa fa-user-plus mg-r-10"></i>{{$t('invoice.Save')}} "{{customerName}}"</el-button>
                            </template>
                          </div>
                        </el-popover>
                      </template>
                    </div>
                    <div class="change-customer">
                    </div>
                  </div>

                </el-col> 
                <el-col :span="12">
                  <div class="invoice-metadata-info mg-b-20">
                    <div class="text-right">
                      <p>{{$t('invoice.InvoiceNumber')}}</p>
                      <p class="mg-y-10">{{$t('invoice.Invoicedate')}}</p>
                      <p class="text-bg">{{$t('invoice.Totalamount')}}</p>
                    </div>
                    <div class="text-left">
                      <p># {{invoiceInfo.code?invoiceInfo.code:'---'}}</p>
                      <p class="mg-y-10">{{invoiceInfo.timeCreated?invoiceInfo.timeCreated:'---'}}</p>
                      <p class="wv-text-strong text-bg" style="padding-left: 0;">$ {{realAmount&&realAmount > 0?$numberToCurrency(realAmount):$t('invoice.Notset')}}</p>
                    </div>
                  </div>
                </el-col>
              </el-row>-->
              <div class="table-fixed">
                <div class="tabs d-flex">
                  <div
                    class="tab-btn"
                    @click="tabcChange(1)"
                    :class="tabActive == 1 || tabActive == 2 ? 'active' : ''"
                  >
                    {{ $t("invoice.全部订单商品") }} ({{ invoiceCnt.orderCnt }})
                  </div>

                  <div
                    style="display: none"
                    class="tab-btn"
                    @click="tabcChange(3)"
                    :class="tabActive == 3 ? 'active' : ''"
                  >
                    <span slot="label"
                      ><i
                        class="fa fa-exclamation-triangle"
                        style="color: rgb(245, 108, 108)"
                      ></i>
                      {{ $t("invoice.SKUmissing") }}({{
                        invoiceCnt.notBindCnt
                      }})</span
                    >
                  </div>

                  <div
                    class="tab-btn"
                    @click="tabcChange(4)"
                    :class="tabActive == 4 ? 'active' : ''"
                  >
                    <span slot="label"
                      ><i
                        class="iconfont icon-tubiaozhizuomoban"
                        style="font-size: 18px; color: rgb(230, 162, 60)"
                      ></i>
                      {{ $t("invoice.Notshipped") }}({{
                        invoiceCnt.notDeliverCnt > 99
                          ? "99+"
                          : invoiceCnt.notDeliverCnt
                      }})</span
                    >
                  </div>
                  <div
                    class="tab-btn"
                    @click="tabcChange(8)"
                    :class="tabActive == 8 ? 'active' : ''"
                  >
                    <span slot="label"
                      ><i
                        class="fa fa-plane"
                        style="font-size: 18px; color: #67c23a"
                      ></i>
                      {{ $t("invoice.Delivered") }}({{
                        invoiceCnt.deliverCnt > 99
                          ? "99+"
                          : invoiceCnt.deliverCnt
                      }})</span
                    >
                  </div>
                  <div
                    class="tab-btn"
                    @click="tabcChange(5)"
                    :class="tabActive == 5 ? 'active' : ''"
                  >
                    <span slot="label"
                      ><i class="fa fa-times" style="color: #f56c6c"></i>
                      {{ $t("invoice.设为不发货") }}
                      ({{
                        invoiceCnt.noQuantityCnt > 99
                          ? "99+"
                          : invoiceCnt.noQuantityCnt
                      }})</span
                    >
                  </div>
                  <div
                    class="tab-btn"
                    @click="tabcChange(9)"
                    :class="tabActive == 9 ? 'active' : ''"
                  >
                    <span slot="label"
                      ><i class="el-icon-warning" style="color: #f56c6c"></i>
                      {{ $t("invoice.Abnormal") }}
                      ({{
                        invoiceCnt.abnormalCnt > 99
                          ? "99+"
                          : invoiceCnt.abnormalCnt
                      }})</span
                    >
                  </div>
                  <div class="pos-absolute" style="right: -15px; bottom: 10px">
                    <el-button-group class="text-btn">
                      <el-button
                        :class="showType == 1 ? 'active' : ''"
                        @click="changeShowType('1')"
                        size="mini"
                        type="text"
                      >
                        <b class="radio-span"></b>
                        <i class="iconfont icon-shuzhuangtu"></i>
                        <span>{{ $t("invoice.Ordergroup") }}</span>
                      </el-button>
                      <el-button
                        :class="showType == 2 ? 'active' : ''"
                        @click="changeShowType('2')"
                        size="mini"
                        type="text"
                      >
                        <b class="radio-span"></b>
                        <i class="iconfont icon-shuzhuang"></i>
                        <span>{{ $t("invoice.Productgroup") }}</span>
                      </el-button>
                    </el-button-group>
                  </div>
                </div>
                <div class="table-wrap" ref="orderItemsTable">
                  <template v-if="tabActive == 1">
                    <el-tooltip placement="left">
                      <div slot="content">
                        {{ $t("invoice.SKUmissing") }}({{
                          invoiceCnt.notBindCnt
                        }})
                      </div>
                      <div
                        class="tab-btn"
                        v-show="invoiceCnt.notBindCnt > 0"
                        @click="tabcChange(3)"
                        style="cursor: pointer"
                      >
                        <i class="fa fa-exclamation-triangle fa-2x"></i>
                        <span>{{
                          invoiceCnt.notBindCnt > 99
                            ? "99+"
                            : invoiceCnt.notBindCnt
                        }}</span>
                      </div>
                    </el-tooltip>
                  </template>
                  <template v-if="tabActive == 2">
                    <el-tooltip placement="left">
                      <div slot="content">
                        {{ $t("invoice.SKUmissing") }}({{
                          invoiceCnt.groupSkuCnt
                        }})
                      </div>
                      <div
                        class="tab-btn"
                        v-show="invoiceCnt.notBindCnt > 0"
                        @click="tabcChange(6)"
                        style="cursor: pointer"
                      >
                        <i class="fa fa-exclamation-triangle fa-2x"></i>
                        <span>{{
                          invoiceCnt.groupSkuCnt > 99
                            ? "99+"
                            : invoiceCnt.groupSkuCnt
                        }}</span>
                      </div>
                    </el-tooltip>
                  </template>
                  <el-table
                    :header-cell-style="getRowClass"
                    :cell-style="cellStyle"
                    class="table-only"
                  >
                    <el-table-column width="150" label=""> </el-table-column>
                    <el-table-column label=""> </el-table-column>
                    <el-table-column label="" width="160"> </el-table-column>
                    <el-table-column label="" width="120"> </el-table-column>
                    <el-table-column label="" width="120"> </el-table-column>
                  </el-table>
                  <!-- 订单维度浮动头部 -->
                  <div class="table1" v-if="tabActive != 2">
                    <el-table
                      :header-cell-style="getRowClass"
                      :cell-class-name="getCellClass"
                      :cell-style="cellStyle"
                      class="table-with-body"
                    >
                      <el-table-column>
                        <template slot="header">
                          <div v-if="!searchName && !searchTrack">
                            <div
                              class="
                                d-flex
                                align-items-center
                                justify-content-between
                              "
                            >
                              <div>
                                {{ $t("invoice.采购订单信息") }}
                                <el-button
                                  size="mini"
                                  type="text"
                                  @click="searchName = true"
                                >
                                  <i class="el-icon-search mg-l-5"></i>
                                </el-button>
                              </div>
                              <div>
                                {{ $t("invoice.物流信息") }}
                                <el-button
                                  size="mini"
                                  type="text"
                                  @click="searchTrack = true"
                                >
                                  <i class="el-icon-search mg-l-5"></i>
                                </el-button>
                              </div>
                            </div>
                          </div>
                          <div v-if="searchName || searchTrack" class="d-flex">
                            <el-input
                              size="mini"
                              type="text"
                              :placeholder="
                                searchName
                                  ? $t('invoice.Supportsearchname')
                                  : $t('invoice.Supportsearchnumber')
                              "
                              v-model="searchNameInput"
                              ref="searchNameInput"
                              clearable
                              @clear="Filter(2, 'name')"
                              @blur="Filter(3, 'name')"
                              @keyup.enter.native="Filter(1, 'name')"
                            >
                              <!--<el-link v-if="searchNameInput" slot="suffix" :underline="false" style="font-size: 12px;" @click="Filter(2,'name')">清除条件</el-link>-->
                              <el-button
                                @click="Filter(1, 'name')"
                                type="primary"
                                size="mini"
                                slot="append"
                                icon="el-icon-search"
                              ></el-button>
                            </el-input>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column width="140">
                        <template slot="header">
                          <div
                            class="d-flex align-item-center change-type"
                            v-if="tabActive == 1"
                          >
                            {{ $t("invoice.我的SKU编号") }}
                          </div>
                          <div v-else>
                            {{ $t("invoice.我的SKU编号") }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="qty" width="140">
                        <template slot="header">
                          <div class="tx-center">
                            {{ $t("invoice.发货数量") }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="price"
                        :label="$t('invoice.Supplyunit')"
                        :width="!isChangeAmount() ? '160px' : '120px'"
                      >
                        <template #header>
                          <span class="supplyunit">{{
                            $t("invoice.Supplyunit")
                          }}</span>
                          <a
                            v-if="!isChangeAmount() && !tempCode"
                            @click="setLotPrice()"
                            href="javascript:;"
                            class="mg-l-0"
                            style="font-weight: bold"
                            >{{ $t("invoice.Batchset") }}</a
                          >
                          <span v-if="tempCode" style="color: #e6a23c"
                            >(设价中)</span
                          >
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="每单运费"
                        width="100"
                        align="center"
                      >
                        <template slot="header">
                          <div class="tx-center">
                            {{ $t("invoice.每单运费") }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        :label="`${$t('invoice.小计')}(US$)`"
                        width="80"
                        align="center"
                      ></el-table-column>
                      <el-table-column
                        :label="$t('invoice.操作')"
                        width="100"
                      ></el-table-column>
                      <!-- <el-table-column :label="$t('invoice.Totalsupply')" width="120">
                      </el-table-column> -->
                    </el-table>
                  </div>
                  <div class="table2" v-if="tabActive == 2">
                    <el-table
                      :header-cell-style="getRowClass3"
                      :cell-class-name="getCellClass"
                      :cell-style="cellStyle"
                      class="table-with-body"
                    >
                      <el-table-column type="expand" width="20" label="">
                      </el-table-column>
                      <el-table-column width="180">
                        <template slot="header">
                          <div class="d-flex align-item-center change-type">
                            {{ $t("invoice.SupplierSKU") }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column>
                        <template slot="header">
                          <div v-if="!searchName && !searchTrack">
                            <div
                              class="
                                d-flex
                                align-items-center
                                justify-content-between
                              "
                            >
                              <div>
                                {{ $t("invoice.Orderitems") }}
                                <el-button
                                  size="mini"
                                  type="text"
                                  @click="searchName = true"
                                >
                                  <i class="el-icon-search mg-l-5"></i>
                                </el-button>
                              </div>
                              <div>
                                {{ $t("invoice.Logisticsnumber") }}
                                <el-button
                                  size="mini"
                                  type="text"
                                  @click="searchTrack = true"
                                >
                                  <i class="el-icon-search mg-l-5"></i>
                                </el-button>
                              </div>
                            </div>
                          </div>
                          <div v-if="searchName || searchTrack" class="d-flex">
                            <el-input
                              size="mini"
                              type="text"
                              :placeholder="
                                searchName
                                  ? $t('invoice.Supportsearchname')
                                  : $t('invoice.Supportsearchnumber')
                              "
                              v-model="searchNameInput"
                              ref="searchNameInput"
                              clearable
                              @clear="Filter(2, 'name')"
                              @blur="Filter(3, 'name')"
                              @keyup.enter.native="Filter(1, 'name')"
                            >
                              <!--<el-link v-if="searchNameInput" slot="suffix" :underline="false" style="font-size: 12px;" @click="Filter(2,'name')">清除条件</el-link>-->
                              <el-button
                                @click="Filter(1, 'name')"
                                type="primary"
                                size="mini"
                                slot="append"
                                icon="el-icon-search"
                              ></el-button>
                            </el-input>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="qty" width="160">
                        <template slot="header">
                          {{ $t("invoice.Purchasequantity") }}
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="price"
                        :label="$t('invoice.Supplyunit')"
                        width="200"
                      >
                      </el-table-column>
                      <el-table-column
                        :label="$t('invoice.Totalsupply')"
                        width="120"
                      >
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
              <!-- 大概是正文列表 -->
              <div class="tabs d-flex">
                <div
                  class="tab-btn"
                  @click="tabcChange(1)"
                  :class="tabActive == 1 || tabActive == 2 ? 'active' : ''"
                >
                  {{ $t("invoice.全部订单商品") }} ({{ invoiceCnt.orderCnt }})
                </div>

                <div
                  style="display: none"
                  class="tab-btn"
                  @click="tabcChange(3)"
                  :class="tabActive == 3 ? 'active' : ''"
                >
                  <span slot="label"
                    ><i
                      class="fa fa-exclamation-triangle"
                      style="color: rgb(245, 108, 108)"
                    ></i>
                    {{ $t("invoice.SKUmissing") }}({{
                      invoiceCnt.notBindCnt
                    }})</span
                  >
                </div>

                <div
                  class="tab-btn"
                  @click="tabcChange(4)"
                  :class="tabActive == 4 ? 'active' : ''"
                >
                  <span slot="label"
                    ><i
                      class="iconfont icon-tubiaozhizuomoban"
                      style="font-size: 18px; color: rgb(230, 162, 60)"
                    ></i>
                    {{ $t("invoice.Notshipped") }}({{
                      invoiceCnt.notDeliverCnt > 99
                        ? "99+"
                        : invoiceCnt.notDeliverCnt
                    }})</span
                  >
                </div>
                <div
                  class="tab-btn"
                  @click="tabcChange(8)"
                  :class="tabActive == 8 ? 'active' : ''"
                >
                  <span slot="label"
                    ><i
                      class="fa fa-plane"
                      style="font-size: 18px; color: #67c23a"
                    ></i>
                    {{ $t("invoice.Delivered") }}({{
                      invoiceCnt.deliverCnt > 99
                        ? "99+"
                        : invoiceCnt.deliverCnt
                    }})</span
                  >
                </div>
                <div
                  class="tab-btn"
                  @click="tabcChange(5)"
                  :class="tabActive == 5 ? 'active' : ''"
                >
                  <span slot="label"
                    ><i class="fa fa-times" style="color: #f56c6c"></i>
                    {{ $t("invoice.设为不发货") }}({{
                      invoiceCnt.noQuantityCnt > 99
                        ? "99+"
                        : invoiceCnt.noQuantityCnt
                    }})</span
                  >
                </div>
                <div
                  class="tab-btn"
                  @click="tabcChange(9)"
                  :class="tabActive == 9 ? 'active' : ''"
                >
                  <span slot="label"
                    ><i class="el-icon-warning" style="color: #f56c6c"></i>
                    {{ $t("invoice.Abnormal") }}
                    ({{
                      invoiceCnt.abnormalCnt > 99
                        ? "99+"
                        : invoiceCnt.abnormalCnt
                    }})</span
                  >
                </div>
                <div class="pos-absolute" style="bottom: 10px; right: -15px">
                  <el-button-group class="text-btn">
                    <el-button
                      :class="showType == 1 ? 'active' : ''"
                      @click="changeShowType('1')"
                      size="mini"
                      type="text"
                    >
                      <span class="radio-span"></span>
                      <i class="iconfont icon-shuzhuangtu"></i>
                      <span>{{ $t("invoice.Ordergroup") }}</span>
                    </el-button>
                    <el-button
                      :class="showType == 2 ? 'active' : ''"
                      @click="changeShowType('2')"
                      size="mini"
                      type="text"
                    >
                      <span class="radio-span"></span>
                      <i class="iconfont icon-shuzhuang"></i>
                      <span>{{ $t("invoice.Productgroup") }}</span>
                    </el-button>
                  </el-button-group>
                  <!-- <template v-if="invoiceCnt.notBindCnt > 0">

                    <el-tooltip placement="bottom">
                      <div slot="content">
                        {{$t('invoice.stillInvoice')}}
                        <el-button @click="changeTabByTip" type="text" size="mini"><i style="color: #F56C6C;" class="fa fa-exclamation-triangle"></i></el-button>
                        {{$t('invoice.stillmissing')}}<br />{{$t('invoice.invoicedetails')}}
                      </div>
                      <el-button class="with-disabled" size="mini" type="success" icon="fa fa-send">{{$t('invoice.Sendinvoice')}}</el-button>
                    </el-tooltip>
                  </template>
                  <template v-else-if="invoiceInfo.paymentType != 1 && invoiceInfo.paymentType != 2">
                    <el-popover ref="setPaymentType" popper-class="with-shadow" width="400" placement="top" :title="$t('invoice.paymentmethod')" trigger="hover">
                      <div>
                        <div class="mg-t-20">
                          <el-radio @change="setPayment" style="display: block; text-align: left;margin: 5px 0 10px;" v-model="paymentType" label="1">{{$t('invoice.PayPal')}}</el-radio>
                        </div>
                        <div class="mg-t-10">
                          <el-radio style="display: block; text-align: left;" v-model="paymentType" label="2">{{$t('invoice.AliExpress')}}</el-radio>
                        </div>
                        <div v-if="paymentType == 2" class="mg-t-10 normal-input">
                          <div class="mg-b-10" style="width: 70%;margin-left: auto;">
                            <p class="tx-right mg-b-5">{{$t('invoice.rateplatform')}}</p>
                            <el-input size="small" :disabled="invoiceInfo.payStatus == 1" v-model="platformRate" :placeholder="$t('invoice.fillednumbers')" @change="setPayment" @input="platformRate = (platformRate.match(/100|(^\d{0,2}(\.\d{0,2})?)/g)[0]) || null">
                              <template slot="prepend">{{$t('invoice.Platformrate')}}</template>
                              <template slot="append">%</template>
                            </el-input>
                          </div>
                          <el-input size="small" :disabled="invoiceInfo.payStatus == 1" v-model="payUrl" :placeholder="$t('invoice.inputAliExpress')+'https://www.aliexpress.com/item/12345.html'" @change="setPayment"></el-input>
                        </div>
                        <div class="mg-t-10 tx-right">
                          <el-button size="small" @click="$refs[`setPaymentType`].doClose()">{{$t('invoice.cancel')}}</el-button>
                          <el-button size="small" type="primary" @click="setPayment">{{$t('invoice.confirm')}}</el-button>
                        </div>
                      </div>
                      <el-button v-if="invoiceInfo.status != '9'" slot="reference" size="mini" type="success" icon="fa fa-send">{{$t('invoice.Sendinvoice')}}</el-button>
                    </el-popover>
                  </template> 
                  <template v-else-if="invoiceInfo.paymentType == 1 || invoiceInfo.paymentType == 2">

                    <el-tooltip placement="bottom">
                      <div slot="content">{{$t('invoice.Sendinvoiceto')}}</div>
                      <el-button size="mini" type="success" icon="fa fa-send" @click="sendInvoice()">{{$t('invoice.Sendinvoice')}}</el-button>
                    </el-tooltip>
                  </template>-->
                </div>
              </div>
              <template>
                <div class="table-wrap">
                  <template v-if="invoiceData.length">
                    <template v-if="tabActive == 1">
                      <el-tooltip placement="left">
                        <div slot="content">
                          {{ $t("invoice.SKUmissing") }}({{
                            invoiceCnt.notBindCnt
                          }})
                        </div>
                        <div
                          class="tab-btn"
                          v-show="invoiceCnt.notBindCnt > 0"
                          @click="tabcChange(3)"
                          style="cursor: pointer"
                        >
                          <i class="fa fa-exclamation-triangle fa-2x"></i>
                          <span>{{
                            invoiceCnt.notBindCnt > 99
                              ? "99+"
                              : invoiceCnt.notBindCnt
                          }}</span>
                        </div>
                      </el-tooltip>
                    </template>
                    <template v-if="tabActive == 2">
                      <el-tooltip placement="left">
                        <div slot="content">
                          {{ $t("invoice.SKUmissing") }}({{
                            invoiceCnt.groupSkuCnt
                          }})
                        </div>
                        <div
                          class="tab-btn"
                          v-show="invoiceCnt.notBindCnt > 0"
                          @click="tabcChange(6)"
                          style="cursor: pointer"
                        >
                          <i class="fa fa-exclamation-triangle fa-2x"></i>
                          <span>{{
                            invoiceCnt.groupSkuCnt > 99
                              ? "99+"
                              : invoiceCnt.groupSkuCnt
                          }}</span>
                        </div>
                      </el-tooltip>
                    </template>
                    <el-table
                      :header-cell-style="getRowClass"
                      :cell-style="cellStyle"
                      class="table-only table-only-top"
                    >
                      <el-table-column
                        width="150"
                        :label="$t('invoice.SupplierSKU')"
                      >
                      </el-table-column>
                      <el-table-column label="Items"> </el-table-column>
                      <el-table-column label="Quantity" width="160">
                      </el-table-column>
                      <el-table-column label="Unit Cost(US$)" width="120">
                      </el-table-column>
                      <el-table-column label="Subtotal(US$)" width="120">
                      </el-table-column>
                    </el-table>
                    <div v-if="tabActive != 2">
                      <el-table
                        :row-class-name="tableRowClassName"
                        :header-cell-style="getRowClass"
                        :cell-class-name="getCellClass"
                        :cell-style="cellStyle"
                        :data="invoiceData"
                        stripe
                        border
                        class="table-with-body"
                      >
                        <!-- 订单维度正文表格 -->
                        <!-- 订单商品项目 start -->
                        <el-table-column>
                          <template #header>
                            <div v-if="!searchName && !searchTrack">
                              <div
                                class="
                                  d-flex
                                  align-items-center
                                  justify-content-between
                                "
                              >
                                <div>
                                  {{ $t("invoice.采购订单信息") }}
                                  <el-button
                                    size="mini"
                                    type="text"
                                    @click="searchName = true"
                                  >
                                    <i class="el-icon-search mg-l-5"></i>
                                  </el-button>
                                </div>
                                <div>
                                  <template v-if="tabActive == 8">
                                    <span
                                      v-if="
                                        Number(invoiceCnt.deliverCnt) &&
                                        type != 'abnormal'
                                      "
                                      class="mg-r-15"
                                    >
                                      共计：{{ invoiceCnt.deliverCnt }}条
                                      <span
                                        v-if="Number(invoiceCnt.notSyncCnt)"
                                      >
                                        ( 同步异常:
                                        <a
                                          href="javascript:;"
                                          class="notsyn-link"
                                          @click="setType('abnormal')"
                                        >
                                          {{ invoiceCnt.notSyncCnt }} 条</a
                                        >
                                        )
                                      </span>
                                    </span>
                                    <span
                                      v-if="type == 'abnormal'"
                                      class="mg-r-15"
                                    >
                                      <el-tag
                                        type="danger"
                                        effect="plain"
                                        closable
                                        @close="setType('deliver')"
                                        style="
                                          margin: 0;
                                          height: 26px;
                                          line-height: 26px;
                                        "
                                        >同步异常</el-tag
                                      >
                                    </span>
                                  </template>
                                  {{ $t("invoice.物流信息") }}
                                  <el-button
                                    size="mini"
                                    type="text"
                                    @click="searchTrack = true"
                                  >
                                    <i class="el-icon-search mg-l-5"></i>
                                  </el-button>
                                </div>
                              </div>
                            </div>
                            <div
                              v-if="searchName || searchTrack"
                              class="d-flex"
                            >
                              <el-input
                                size="mini"
                                type="text"
                                :placeholder="
                                  searchName
                                    ? $t('invoice.Supportsearchname')
                                    : $t('invoice.Supportsearchnumber')
                                "
                                v-model="searchNameInput"
                                ref="searchNameInput"
                                clearable
                                @clear="Filter(2, 'name')"
                                @blur="Filter(3, 'name')"
                                @keyup.enter.native="Filter(1, 'name')"
                              >
                                <!--<el-link v-if="searchNameInput" slot="suffix" :underline="false" style="font-size: 12px;" @click="Filter(2,'name')">清除条件</el-link>-->
                                <el-button
                                  @click="Filter(1, 'name')"
                                  type="primary"
                                  size="mini"
                                  slot="append"
                                  icon="el-icon-search"
                                ></el-button>
                              </el-input>
                            </div>
                          </template>
                          <template v-slot="scope">
                            <div style="display: flex; align-items: flex-start">
                              <el-image
                                style="
                                  min-width: 70px;
                                  width: 70px;
                                  height: 70px;
                                  margin: 5px 5px 0 0;
                                  border: 1px solid #ddd;
                                "
                                lazy
                                :src="scope.row.imgUrl"
                                :preview-src-list="scope.row.previewList"
                              >
                                <div slot="error" class="image-slot">
                                  <i
                                    class="el-icon-picture-outline"
                                    style="font-size: 20px"
                                  ></i>
                                </div>
                              </el-image>
                              <div
                                style="
                                  max-width: 100%;
                                  text-align: left;
                                  flex: 100%;
                                "
                              >
                                <div class="tx-600">
                                  {{ scope.row.name }}
                                  <template
                                    v-if="
                                      scope.row.customerProperties &&
                                      scope.row.customerProperties.length
                                    "
                                  >
                                    <div
                                      v-for="val in scope.row
                                        .customerProperties"
                                      :key="val.name"
                                      class="d-flex"
                                    >
                                      <div class="d-flex" style="width: 90%">
                                        <div
                                          style="text-align: right; color: #999"
                                          class=""
                                        >
                                          {{ val.name }}:
                                        </div>
                                        <div class="mg-l-5 pd-r-15">
                                          {{ val.value }}
                                        </div>
                                      </div>
                                    </div>
                                  </template>
                                </div>
                                <div class="tx-600">
                                  <b>SKU:</b> {{ scope.row.sku }}
                                </div>
                                <div
                                  class="d-flex no-wrap justify-content-between"
                                  v-if="tabActive != 2"
                                >
                                  <div class="d-flex">
                                    <el-popover
                                      popper-class="customer-popover"
                                      placement="bottom"
                                      width="600"
                                      trigger="hover"
                                    >
                                      <div
                                        slot="reference"
                                        style="
                                          cursor: pointer;
                                          display: flex;
                                          max-width: 280px;
                                        "
                                      >
                                        <span style="margin-right: 10px"
                                          >{{ scope.row.codeName
                                          }}<i
                                            class="
                                              el-icon-caret-bottom
                                              el-icon--right
                                            "
                                          ></i
                                        ></span>
                                      </div>

                                      <div class="mg-b-20 mg-t-10">
                                        <div
                                          style="justify-content: space-between"
                                          class="d-flex mg-b-20"
                                        >
                                          <div
                                            style="
                                              font-weight: bold;
                                              font-size: 16px;
                                            "
                                            class="title"
                                          >
                                            {{ $t("invoice.ShopifyOrders") }}
                                            {{ scope.row.codeName }}
                                          </div>
                                          <div>
                                            <span
                                              style="color: #999"
                                              class=""
                                              >{{
                                                $t("invoice.Orderdate")
                                              }}</span
                                            >
                                            <span class="mg-l-5 pd-r-15">{{
                                              scope.row.timeCreated
                                                ? scope.row.timeCreated
                                                : "---"
                                            }}</span>
                                          </div>
                                        </div>
                                        <div
                                          class="mg-y-10"
                                          style="
                                            font-weight: bold;
                                            font-size: 16px;
                                          "
                                        >
                                          收件信息
                                        </div>
                                        <div class="d-flex">
                                          <div
                                            class="d-flex"
                                            style="width: 90%"
                                          >
                                            <div
                                              style="
                                                width: 100px;
                                                text-align: right;
                                                color: #999;
                                              "
                                              class=""
                                            >
                                              收件人:
                                            </div>
                                            <div class="mg-l-5 pd-r-15">
                                              {{
                                                scope.row.shippingJson &&
                                                scope.row.shippingJson.name
                                                  ? scope.row.shippingJson.name
                                                  : "---"
                                              }}
                                            </div>
                                            <el-tooltip
                                              class="item"
                                              effect="dark"
                                              content="copy"
                                              placement="left"
                                            >
                                              <el-button
                                                size="mini"
                                                type="text"
                                                v-if="
                                                  scope.row.shippingJson &&
                                                  scope.row.shippingJson.name
                                                "
                                              >
                                                <i
                                                  class="el-icon-document-copy"
                                                  v-clipboard:copy="
                                                    scope.row.shippingJson.name
                                                  "
                                                  v-clipboard:success="onCopy"
                                                  v-clipboard:error="onError"
                                                ></i>
                                              </el-button>
                                            </el-tooltip>
                                          </div>
                                        </div>
                                        <div class="d-flex">
                                          <div
                                            class="d-flex"
                                            style="width: 90%"
                                          >
                                            <div
                                              style="
                                                width: 100px;
                                                text-align: right;
                                                color: #999;
                                              "
                                              class=""
                                            >
                                              收货地址1:
                                            </div>
                                            <div class="mg-l-5 pd-r-15">
                                              {{
                                                scope.row.shippingJson &&
                                                scope.row.shippingJson.address1
                                                  ? scope.row.shippingJson
                                                      .address1
                                                  : "---"
                                              }}
                                            </div>
                                            <el-tooltip
                                              class="item"
                                              effect="dark"
                                              content="copy"
                                              placement="left"
                                            >
                                              <el-button
                                                size="mini"
                                                type="text"
                                                v-if="
                                                  scope.row.shippingJson &&
                                                  scope.row.shippingJson
                                                    .address1
                                                "
                                              >
                                                <i
                                                  class="el-icon-document-copy"
                                                  v-clipboard:copy="
                                                    scope.row.shippingJson
                                                      .address1
                                                  "
                                                  v-clipboard:success="onCopy"
                                                  v-clipboard:error="onError"
                                                ></i>
                                              </el-button>
                                            </el-tooltip>
                                          </div>
                                        </div>
                                        <div class="d-flex">
                                          <div
                                            class="d-flex"
                                            style="width: 90%"
                                          >
                                            <div
                                              style="
                                                width: 100px;
                                                text-align: right;
                                                color: #999;
                                              "
                                              class=""
                                            >
                                              收货地址2:
                                            </div>
                                            <div
                                              class="mg-l-5 pd-r-15"
                                              style="max-width: 75%"
                                            >
                                              <!--                                              {{scope.row.shippingJson && scope.row.shippingJson.zip ? scope.row.shippingJson.zip : '-&#45;&#45;'}}-->
                                              {{
                                                scope.row.shippingJson &&
                                                scope.row.shippingJson.address2
                                                  ? scope.row.shippingJson
                                                      .address2
                                                  : "---"
                                              }}
                                              <!--                                              {{scope.row.shippingJson && scope.row.shippingJson.city ? scope.row.shippingJson.city : '-&#45;&#45;'}}-->
                                              <!--                                              {{scope.row.shippingJson && scope.row.shippingJson.province ? scope.row.shippingJson.province : '-&#45;&#45;'}}-->
                                            </div>
                                            <el-tooltip
                                              class="item"
                                              effect="dark"
                                              content="copy"
                                              placement="left"
                                            >
                                              <el-button
                                                size="mini"
                                                type="text"
                                                v-if="
                                                  scope.row.shippingJson &&
                                                  scope.row.shippingJson
                                                    .address2
                                                "
                                              >
                                                <i
                                                  class="el-icon-document-copy"
                                                  v-clipboard:copy="
                                                    scope.row.shippingJson
                                                      .address2
                                                  "
                                                  v-clipboard:success="onCopy"
                                                  v-clipboard:error="onError"
                                                ></i>
                                              </el-button>
                                            </el-tooltip>
                                          </div>
                                        </div>
                                        <div class="d-flex">
                                          <div
                                            class="d-flex"
                                            style="width: 50%"
                                          >
                                            <div
                                              style="
                                                width: 100px;
                                                text-align: right;
                                                color: #999;
                                              "
                                              class=""
                                            >
                                              城市:
                                            </div>
                                            <div class="mg-l-5 pd-r-15">
                                              {{
                                                scope.row.shippingJson &&
                                                scope.row.shippingJson.city
                                                  ? scope.row.shippingJson.city
                                                  : "---"
                                              }}
                                            </div>
                                            <el-tooltip
                                              class="item"
                                              effect="dark"
                                              content="copy"
                                              placement="left"
                                            >
                                              <el-button
                                                size="mini"
                                                type="text"
                                                v-if="
                                                  scope.row.shippingJson &&
                                                  scope.row.shippingJson.city
                                                "
                                              >
                                                <i
                                                  class="el-icon-document-copy"
                                                  v-clipboard:copy="
                                                    scope.row.shippingJson.city
                                                  "
                                                  v-clipboard:success="onCopy"
                                                  v-clipboard:error="onError"
                                                ></i>
                                              </el-button>
                                            </el-tooltip>
                                          </div>
                                          <div
                                            class="d-flex"
                                            style="width: 50%"
                                          >
                                            <div
                                              style="
                                                width: 100px;
                                                text-align: right;
                                                color: #999;
                                              "
                                              class=""
                                            >
                                              省份:
                                            </div>
                                            <div class="mg-l-5 pd-r-15">
                                              {{
                                                scope.row.shippingJson &&
                                                scope.row.shippingJson.province
                                                  ? scope.row.shippingJson
                                                      .province
                                                  : "---"
                                              }}
                                            </div>
                                            <el-tooltip
                                              class="item"
                                              effect="dark"
                                              content="copy"
                                              placement="left"
                                            >
                                              <el-button
                                                size="mini"
                                                type="text"
                                                v-if="
                                                  scope.row.shippingJson &&
                                                  scope.row.shippingJson
                                                    .province
                                                "
                                              >
                                                <i
                                                  class="el-icon-document-copy"
                                                  v-clipboard:copy="
                                                    scope.row.shippingJson.city
                                                  "
                                                  v-clipboard:success="onCopy"
                                                  v-clipboard:error="onError"
                                                ></i>
                                              </el-button>
                                            </el-tooltip>
                                          </div>
                                        </div>
                                        <div
                                          class="d-flex"
                                          style="justify-content: space-between"
                                        >
                                          <div
                                            class="d-flex"
                                            style="flex: 0 0 50%"
                                          >
                                            <div
                                              style="
                                                width: 100px;
                                                text-align: right;
                                                color: #999;
                                              "
                                              class=""
                                            >
                                              国家:
                                            </div>
                                            <div class="mg-l-5 pd-r-15">
                                              {{
                                                scope.row.shippingJson &&
                                                scope.row.shippingJson.country
                                                  ? scope.row.shippingJson
                                                      .country
                                                  : "---"
                                              }}
                                            </div>
                                            <el-tooltip
                                              class="item"
                                              effect="dark"
                                              content="copy"
                                              placement="left"
                                            >
                                              <el-button
                                                size="mini"
                                                type="text"
                                                v-if="
                                                  scope.row.shippingJson &&
                                                  scope.row.shippingJson.country
                                                "
                                              >
                                                <i
                                                  class="el-icon-document-copy"
                                                  v-clipboard:copy="
                                                    scope.row.shippingJson
                                                      .country
                                                  "
                                                  v-clipboard:success="onCopy"
                                                  v-clipboard:error="onError"
                                                ></i>
                                              </el-button>
                                            </el-tooltip>
                                          </div>
                                          <div
                                            class="d-flex"
                                            style="flex: 0 0 50%"
                                          >
                                            <div
                                              style="
                                                width: 100px;
                                                text-align: right;
                                                color: #999;
                                              "
                                              class=""
                                            >
                                              邮编:
                                            </div>
                                            <div class="mg-l-5 pd-r-15">
                                              {{
                                                scope.row.shippingJson &&
                                                scope.row.shippingJson.zip
                                                  ? scope.row.shippingJson.zip
                                                  : "---"
                                              }}
                                            </div>
                                            <el-tooltip
                                              class="item"
                                              effect="dark"
                                              content="copy"
                                              placement="left"
                                            >
                                              <el-button
                                                size="mini"
                                                type="text"
                                                v-if="
                                                  scope.row.shippingJson &&
                                                  scope.row.shippingJson.zip
                                                "
                                              >
                                                <i
                                                  class="el-icon-document-copy"
                                                  v-clipboard:copy="
                                                    scope.row.shippingJson.zip
                                                  "
                                                  v-clipboard:success="onCopy"
                                                  v-clipboard:error="onError"
                                                ></i>
                                              </el-button>
                                            </el-tooltip>
                                          </div>
                                        </div>
                                        <div
                                          class="mg-y-10"
                                          style="
                                            font-weight: bold;
                                            font-size: 16px;
                                          "
                                        >
                                          收件信息
                                        </div>
                                        <div class="d-flex">
                                          <div
                                            class="d-flex"
                                            style="width: 90%"
                                          >
                                            <div
                                              style="
                                                width: 100px;
                                                text-align: right;
                                                color: #999;
                                              "
                                              class=""
                                            >
                                              联系电话:
                                            </div>
                                            <div class="mg-l-5 pd-r-15">
                                              {{
                                                scope.row.shippingJson &&
                                                scope.row.shippingJson.phone
                                                  ? scope.row.shippingJson.phone
                                                  : "---"
                                              }}
                                            </div>
                                            <el-tooltip
                                              class="item"
                                              effect="dark"
                                              content="copy"
                                              placement="left"
                                            >
                                              <el-button
                                                size="mini"
                                                type="text"
                                                v-if="
                                                  scope.row.shippingJson.phone
                                                "
                                              >
                                                <i
                                                  class="el-icon-document-copy"
                                                  v-clipboard:copy="
                                                    scope.row.shippingJson.phone
                                                  "
                                                  v-clipboard:success="onCopy"
                                                  v-clipboard:error="onError"
                                                ></i>
                                              </el-button>
                                            </el-tooltip>
                                          </div>
                                        </div>
                                        <template v-if="scope.row.ioss">
                                          <div class="mg-y-10" style="font-weight: bold;font-size: 16px;">
                                            IOSS信息
                                          </div>
                                          <div class="d-flex">
                                            <div class="d-flex" style="width: 90%">
                                              <div style="width: 100px;text-align: right;color: #999;">
                                                IOSS:
                                              </div>
                                              <div class="mg-l-5 pd-r-15">
                                                {{scope.row.ioss}}
                                              </div>
                                            </div>
                                          </div>
                                        </template>
                                        <template v-if="scope.row.note">
                                          <div
                                            class="mg-y-10"
                                            style="
                                              font-weight: bold;
                                              font-size: 16px;
                                            "
                                          >
                                            订单备注
                                          </div>
                                          <div class="d-flex">
                                            <div
                                              class="d-flex"
                                              style="width: 90%"
                                            >
                                              <div
                                                style="
                                                  width: 100px;
                                                  text-align: right;
                                                  color: #999;
                                                "
                                                class=""
                                              >
                                                备注:
                                              </div>
                                              <div class="mg-l-5 pd-r-15">
                                                {{ scope.row.note }}
                                              </div>
                                              <el-tooltip
                                                class="item"
                                                effect="dark"
                                                content="copy"
                                                placement="left"
                                              >
                                                <el-button
                                                  size="mini"
                                                  type="text"
                                                  v-if="scope.row.note"
                                                >
                                                  <i
                                                    class="
                                                      el-icon-document-copy
                                                    "
                                                    v-clipboard:copy="
                                                      scope.row.note
                                                    "
                                                    v-clipboard:success="onCopy"
                                                    v-clipboard:error="onError"
                                                  ></i>
                                                </el-button>
                                              </el-tooltip>
                                            </div>
                                          </div>
                                        </template>
                                      </div>
                                    </el-popover>
                                    <el-tooltip
                                      v-if="
                                        scope.row.shippingJson &&
                                        scope.row.shippingJson.name
                                      "
                                      class="item"
                                      effect="dark"
                                      :content="scope.row.shippingJson.name"
                                      placement="top"
                                    >
                                      <el-button size="mini">To</el-button>
                                    </el-tooltip>
                                    <div class="mg-l-5 mg-r-5">
                                      {{
                                        scope.row.shippingJson &&
                                        scope.row.shippingJson.country
                                          ? scope.row.shippingJson.country
                                          : "---"
                                      }}
                                    </div>
                                  </div>
                                  <div class="no-wrap d-flex">
                                    <div
                                      v-if="scope.row.trackNumber"
                                      class="d-flex"
                                    >
                                      <!--<div class="mg-r-5">
																			{{scope.row.trackNumber}}
																		</div>-->
                                      <div>
                                        <el-tooltip
                                          v-if="
                                            scope.row.trackCompany &&
                                            scope.row.realCompany
                                          "
                                          class="item"
                                          effect="dark"
                                          placement="top"
                                        >
                                          <div slot="content">
                                            <p style="margin-bottom: 5px">
                                              {{ scope.row.trackCompany }}({{
                                                scope.row.realCompany
                                              }})
                                            </p>
                                            {{ scope.row.trackNumber }}
                                          </div>
                                          <i class="fa fa-truck"></i>
                                        </el-tooltip>
                                        <el-tooltip
                                          v-else-if="scope.row.trackCompany"
                                          class="item"
                                          effect="dark"
                                          placement="top"
                                        >
                                          <div slot="content">
                                            <p style="margin-bottom: 5px">
                                              {{ scope.row.trackCompany }}
                                            </p>
                                            {{ scope.row.trackNumber }}
                                          </div>
                                          <i class="fa fa-truck"></i>
                                        </el-tooltip>
                                        <el-tooltip
                                          v-else
                                          class="item"
                                          effect="dark"
                                          placement="top"
                                        >
                                          <div slot="content">
                                            <p style="margin-bottom: 5px">
                                              {{ scope.row.realCompany }}
                                            </p>
                                            {{ scope.row.trackNumber }}
                                          </div>
                                          <i class="fa fa-truck"></i>
                                        </el-tooltip>
                                      </div>
                                      <el-tooltip
                                        v-if="scope.row.syncStatus == 2"
                                        class="item"
                                        effect="dark"
                                        placement="right"
                                      >
                                        <div slot="content">
                                          {{ $t("invoice.deliveredgoods") }}
                                          <br />{{ $t("invoice.Reason") }}
                                          {{
                                            invoiceInfo.hasAuth != 1
                                              ? $t("invoice.notauthorized")
                                              : scope.row.syncContent
                                          }}
                                        </div>

                                        <i class="invoice-icon-tongbu1"></i>
                                      </el-tooltip>
                                      <el-tooltip
                                        v-else
                                        class="item"
                                        effect="dark"
                                        :content="$t('invoice.hasbeensync')"
                                        placement="right"
                                      >
                                        <!--<i class="iconfont icon-tongbu1 mg-l-5" style="color: #67C23A;font-size: 20px;"></i>-->
                                        <i class="invoice-icon-tongbu2"></i>
                                      </el-tooltip>
                                    </div>
                                    <div
                                      v-else-if="scope.row.fulfillStatus == 1"
                                    >
                                      <el-tooltip
                                        class="item"
                                        effect="dark"
                                        :content="$t('invoice.hasnot')"
                                        placement="right"
                                      >
                                        <el-alert
                                          :title="$t('invoice.Notshipped')"
                                          type="warning"
                                          :closable="false"
                                        >
                                        </el-alert>
                                      </el-tooltip>
                                    </div>
                                    <div v-else>
                                      <el-tooltip
                                        class="item"
                                        effect="dark"
                                        :content="
                                          $t('invoice.wontReason') +
                                          scope.row.stopReason
                                        "
                                        placement="right"
                                      >
                                        <el-alert
                                          :title="$t('invoice.wontdeliver')"
                                          type="error"
                                          :closable="false"
                                        >
                                        </el-alert>
                                      </el-tooltip>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </template>
                        </el-table-column>
                        <!-- 订单商品项目 end -->
                        <!--  我的sku编号 start -->
                        <el-table-column width="180">
                          <template #header>
                            <div
                              class="d-flex align-item-center change-type"
                              v-if="tabActive == 1"
                            >
                              {{ $t("invoice.我的SKU编号") }}
                            </div>
                            <div v-else>
                              {{ $t("invoice.我的SKU编号") }}
                            </div>
                          </template>
                          <template v-slot="scope">
                            <div class="d-flex sku-with-error">
                              <el-tooltip
                                placement="left"
                                v-if="
                                  (!scope.row.sku || !scope.row.price) &&
                                  scope.row.quantity > 0 &&
                                  scope.row.fulfillStatus != 2
                                "
                              >
                                <div slot="content">
                                  {{ $t("invoice.SKUmissing") }}<br />{{
                                    $t("invoice.Reason")
                                  }}
                                  <span
                                    v-if="!scope.row.sku && !scope.row.price"
                                    >{{ $t("invoice.pricemissing") }}</span
                                  >
                                  <span v-else-if="!scope.row.sku">{{
                                    $t("invoice.SKUmissing")
                                  }}</span>
                                  <span v-else-if="!scope.row.price">{{
                                    $t("invoice.supplypricemissing")
                                  }}</span>
                                </div>
                                <i
                                  class="fa fa-exclamation-triangle mg-r-10"
                                  style="color: #f56c6c"
                                ></i>
                              </el-tooltip>
                              <div>
                                <div v-if="isChangeSku(scope.row)">
                                  {{ scope.row.sku || "---" }}
                                </div>
                                <template v-else>
                                  <el-popover
                                    popper-class="with-shadow"
                                    width="400"
                                    :ref="`popoverSku-${scope.$index}`"
                                    placement="top"
                                    :title="$t('invoice.Batchset')"
                                    trigger="manual"
                                  >
                                    <div>
                                      <div class="mg-t-20">
                                        <a
                                          href="javascript:;"
                                          class="input-btn d-flex"
                                          :class="
                                            form.resource == 1 ? 'active' : ''
                                          "
                                          style="color: #333"
                                          @click="setResource(1)"
                                        >
                                          <span class="mg-r-5"></span>
                                          {{ $t("invoice.samekind") }}
                                          <p
                                            style="
                                              display: inline;
                                              margin-left: 5px;
                                            "
                                            v-show="scope.row.noneCntSku"
                                            v-html="
                                              $t('invoice.hereare', {
                                                num: Number(
                                                  scope.row.noneCntSku
                                                ),
                                              })
                                            "
                                          ></p>
                                        </a>
                                      </div>
                                      <div class="mg-t-10">
                                        <a
                                          href="javascript:;"
                                          class="input-btn d-flex"
                                          :class="
                                            form.resource == 2 ? 'active' : ''
                                          "
                                          style="color: #333"
                                          @click="setResource(2)"
                                        >
                                          <span class="mg-r-5"></span>
                                          {{ $t("invoice.Allsame") }}
                                          <p
                                            style="
                                              display: inline;
                                              margin-left: 5px;
                                            "
                                            v-show="scope.row.sameCntSku"
                                            v-html="
                                              $t('invoice.hereare', {
                                                num: Number(
                                                  scope.row.sameCntSku
                                                ),
                                              })
                                            "
                                          ></p>
                                        </a>
                                      </div>
                                      <div class="mg-t-10">
                                        <div
                                          class="d-flex justify-content-between"
                                        >
                                          <span class=""
                                            >{{ $t("invoice.Batchsetto") }}
                                            <span
                                              class="color-primary tx-600"
                                              >{{ scope.row.sku }}</span
                                            ></span
                                          >
                                          <div class="tx-right">
                                            <el-button
                                              size="small"
                                              @click="
                                                scope._self.$refs[
                                                  `popoverSku-${scope.$index}`
                                                ].doClose()
                                              "
                                              >{{
                                                $t("invoice.cancel")
                                              }}</el-button
                                            >
                                            <el-button
                                              size="small"
                                              type="primary"
                                              @click="changeSkuBatch(scope.row)"
                                              >{{
                                                $t("invoice.Save1")
                                              }}</el-button
                                            >
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <el-input
                                      slot="reference"
                                      size="small"
                                      placeholder="SKU"
                                      style="min-width: 160px"
                                      v-model="scope.row.sku"
                                      @keyup.native="
                                        getSkuInfo(scope.row, scope.$index)
                                      "
                                      @change="
                                        changeSkuFn(scope.row, scope.$index)
                                      "
                                    >
                                    </el-input>
                                  </el-popover>
                                </template>
                              </div>
                            </div>
                          </template>
                        </el-table-column>
                        <!-- 供货商sku end -->
                        <!-- 发货数量 start -->
                        <el-table-column prop="qty" width="135">
                          <template #header>
                            {{ $t("invoice.发货数量") }}
                            <el-popover
                              v-if="totalCnt"
                              trigger="hover"
                              placement="right"
                            >
                              <div
                                slot
                                v-loading="loadCnt"
                                style="min-height: 50px; font-size: 12px"
                              >
                                <div style="margin-bottom: 5px">
                                  {{ $t("invoice.Totalpurchases")
                                  }}<b>{{ totalCnt }}</b> 个
                                </div>
                                <template v-if="cnt">
                                  <div
                                    style="
                                      margin-bottom: 15px;
                                      padding-left: 10px;
                                    "
                                  >
                                    <div v-for="(n, k) in cnt" :key="k">
                                      <span style="white-space: nowrap"
                                        >{{ n.name }} :</span
                                      >
                                      <span
                                        style="
                                          color: #606266;
                                          white-space: nowrap;
                                        "
                                        >{{ n.cnt }}</span
                                      >
                                    </div>
                                  </div>
                                  <div style="text-align: right">
                                    <a
                                      href="javascript:;"
                                      style="color: #5c6ac4"
                                      v-clipboard:copy="cntText"
                                      v-clipboard:success="cntOnCopy"
                                      v-clipboard:error="cntOnError"
                                      >{{ $t("invoice.copy") }}</a
                                    >
                                  </div>
                                </template>
                              </div>
                              <span
                                slot="reference"
                                @mouseenter="getCntCountry"
                              >
                                (<span
                                  style="
                                    text-decoration: underline;
                                    cursor: pointer;
                                  "
                                  >{{ totalCnt }}</span
                                >)
                              </span>
                            </el-popover>
                          </template>
                          <template slot-scope="scope">
                            <template v-if="isChangeOther(scope.row)">
                              {{ scope.row.quantity || 0 }}
                            </template>
                            <template v-else>
                              <el-input-number
                                style="width: 110px"
                                size="small"
                                controls-position="right"
                                :min="1"
                                v-model="scope.row.quantity"
                                @change="handleChange(scope.row, $event)"
                              ></el-input-number>
                            </template>
                            <el-tooltip
                              class="item"
                              effect="dark"
                              :content="
                                $t('invoice.Abnormalreasons') +
                                scope.row.abnormalReason
                              "
                              placement="right"
                            >
                              <span
                                v-if="scope.row.isAbnormal == 1"
                                class="tx-danger"
                                style="margin-top: 10px; display: inline-block"
                              >
                                <i class="el-icon-info"></i
                                >{{ $t("invoice.Abnormal") }}
                              </span>
                            </el-tooltip>
                          </template>
                        </el-table-column>
                        <!-- 采购数量 end -->
                        <el-table-column
                          :label="$t('invoice.客户实际售价')"
                          width="100px"
                        >
                          <template slot-scope="scope">
                            <template v-if="scope.row.customerPrice">
                              <span
                                v-if="scope.row.currency"
                                style="color: #909399"
                                >{{ scope.row.currency
                                }}{{ $CE[scope.row.currency].symbol }}</span
                              >
                              <span v-else style="color: #909399">US$</span>
                              {{ scope.row.customerPrice }}
                            </template>
                            <template v-else
                              ><span style="color: #c0c4cc">---</span></template
                            >
                          </template>
                        </el-table-column>
                        <!-- 供货单价 start -->
                        <el-table-column
                          prop="price"
                          label=""
                          :width="!isChangeAmount() ? '140px' : '120px'"
                        >
                          <template #header>
                            <span class="supplyunit">{{
                              $t("invoice.Supplyunit")
                            }}</span>
                            <a
                              v-if="!isChangeAmount() && !tempCode"
                              @click="setLotPrice()"
                              href="javascript:;"
                              class="mg-l-0"
                              style="font-weight: bold"
                              >{{ $t("invoice.Batchset") }}</a
                            >
                            <span v-if="tempCode" style="color: #e6a23c"
                              >(设价中)</span
                            >
                          </template>
                          <template slot-scope="scope">
                            <div>
                              <div v-if="isChangePrice(scope.row)">
                                {{ scope.row.price || "0.00" }}
                              </div>
                              <template v-else>
                                <el-popover
                                  v-if="scope.row.price !== null"
                                  popper-class="with-shadow"
                                  width="400"
                                  :ref="`popoverPrice-${scope.$index}`"
                                  placement="top"
                                  :title="$t('invoice.Batchsupplyset')"
                                  trigger="manual"
                                >
                                  <div>
                                    <div class="mg-t-20">
                                      <a
                                        href="javascript:;"
                                        class="input-btn d-flex"
                                        :class="
                                          formPrice.resource == 1
                                            ? 'active'
                                            : ''
                                        "
                                        style="color: #333"
                                        @click="setPriceResource(1)"
                                      >
                                        <span class="mg-r-5"></span>
                                        {{ $t("invoice.Allproducts") }}
                                        <p
                                          style="
                                            display: inline;
                                            margin-left: 5px;
                                          "
                                          v-show="scope.row.noneCntPrice"
                                          v-html="
                                            $t('invoice.hereare', {
                                              num: Number(
                                                scope.row.noneCntPrice
                                              ),
                                            })
                                          "
                                        ></p>
                                      </a>
                                    </div>
                                    <div class="mg-t-10">
                                      <a
                                        href="javascript:;"
                                        class="input-btn d-flex"
                                        :class="
                                          formPrice.resource == 2
                                            ? 'active'
                                            : ''
                                        "
                                        style="color: #333"
                                        @click="setPriceResource(2)"
                                      >
                                        <span class="mg-r-5"></span>
                                        {{ $t("invoice.Allsame") }}
                                        <p
                                          style="
                                            display: inline;
                                            margin-left: 5px;
                                          "
                                          v-show="scope.row.sameCntPrice"
                                          v-html="
                                            $t('invoice.hereare', {
                                              num: Number(
                                                scope.row.sameCntPrice
                                              ),
                                            })
                                          "
                                        ></p>
                                      </a>
                                    </div>
                                    <div class="mg-t-10">
                                      <div
                                        class="d-flex justify-content-between"
                                      >
                                        <span class=""
                                          >{{ $t("invoice.Batchsetto") }}
                                          <span class="color-primary tx-600">{{
                                            scope.row.price
                                          }}</span></span
                                        >
                                        <div class="tx-right">
                                          <el-button
                                            size="small"
                                            @click="
                                              scope._self.$refs[
                                                `popoverPrice-${scope.$index}`
                                              ].doClose()
                                            "
                                            >{{
                                              $t("invoice.cancel")
                                            }}</el-button
                                          >
                                          <el-button
                                            size="small"
                                            type="primary"
                                            @click="changePriceBatch(scope.row)"
                                            >{{
                                              $t("invoice.Save1")
                                            }}</el-button
                                          >
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <el-input
                                    type="number"
                                    @input="
                                      scope.row.price =
                                        scope.row.price.match(
                                          /^\d*(\.?\d{0,2})/g
                                        )[0] || null
                                    "
                                    slot="reference"
                                    name="price-input"
                                    size="small"
                                    :placeholder="$t('invoice.Supplyunit')"
                                    :ref="`refInput${scope.$index}`"
                                    v-model="scope.row.price"
                                    @keyup.native="
                                      getPriceInfo(scope.row, scope.$index)
                                    "
                                    @change="
                                      changePriceFn(scope.row, scope.$index)
                                    "
                                    @blur="blueChange(scope.row, scope.$index)"
                                  >
                                  </el-input>
                                </el-popover>
                                <div v-else>
                                  <el-tooltip
                                    class="item"
                                    effect="dark"
                                    :content="$t('invoice.noAllow')"
                                    placement="top"
                                    v-model="scope.row.tooltipShow"
                                  >
                                    <div>
                                      <el-input
                                        type="number"
                                        name="price-input"
                                        size="small"
                                        class="unactive"
                                        slot="reference"
                                        v-model="scope.row.price"
                                        @input="
                                          scope.row.price =
                                            scope.row.price.match(
                                              /^\d*(\.?\d{0,2})/g
                                            )[0] || null
                                        "
                                        @keyup.native="
                                          getPriceInfo(scope.row, scope.$index)
                                        "
                                        @change="
                                          changePriceFn(scope.row, scope.$index)
                                        "
                                        @focus="
                                          focusChange(scope.row, scope.$index)
                                        "
                                      >
                                      </el-input>
                                      {{ scope.row.price }}
                                    </div>
                                  </el-tooltip>
                                </div>
                              </template>
                            </div>
                          </template>
                        </el-table-column>
                        <!-- 供货单价 end -->
                        <!-- 每单运费 -->
                        <el-table-column
                          label="每单运费"
                          width="90"
                          align="center"
                        >
                          <template #header>
                            <div class="tx-center">
                              {{ $t("invoice.每单运费") }}
                            </div>
                          </template>
                          <template slot-scope="scope">
                            <div
                              v-if="
                                isChangePrice(scope.row) &&
                                invoiceInfo.status != 1
                              "
                              class="tx-center"
                            >
                              {{ scope.row.shippingFee || "0.00" }}
                            </div>
                            <div v-else class="tx-center">
                              <el-input-number
                                v-model="scope.row.shippingFee"
                                :min="0"
                                label="运费"
                                :controls="false"
                                size="small"
                                :precision="2"
                                style="width: 70px"
                                @change="setShippingFee(scope.row)"
                              >
                              </el-input-number>
                            </div>
                          </template>
                        </el-table-column>
                        <!-- 每单运费 end -->
                        <!-- 小计 start -->
                        <el-table-column
                          :label="`${$t('invoice.小计')}(US$)`"
                          width="75"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <div
                              class="tx-center"
                              v-if="scope.row.price == undefined"
                            >
                              0.00
                            </div>
                            <div class="tx-center" v-else>
                              {{ itemTotalAmount(scope.row) }}
                            </div>
                          </template>
                        </el-table-column>
                        <!-- 小计 end -->
                        <!-- 操作 start -->
                        <el-table-column :label="$t('invoice.操作')" width="90">
                          <template slot-scope="scope">
                            <div class="tx-left">
                              <a
                                v-if="
                                  invoiceInfo.payStatus == '1' &&
                                  invoiceInfo.status != '9' &&
                                  !scope.row.trackNumber &&
                                  scope.row.fulfillStatus != 2
                                "
                                href="javascript:;"
                                @click="markShippedOpen(scope.row)"
                                >{{ $t("invoice.shippedMark") }}</a
                              >
                            </div>
                            <div class="tx-left">
                              <!-- 标记不发货 -->
                              <div
                                v-if="
                                  invoiceInfo.payStatus != 1 &&
                                  invoiceInfo.customerRead != 1
                                "
                                style="margin-top: 0"
                              >
                                <template v-if="scope.row.fulfillStatus == 1">
                                  <el-popover
                                    :ref="`popover-stop-${scope.$index}`"
                                    width="400"
                                    placement="top"
                                    :title="$t('invoice.deleteReason')"
                                    trigger="click"
                                  >
                                    <div>
                                      <div class="mg-t-20">
                                        <a
                                          href="javascript:;"
                                          class="input-btn d-flex"
                                          :class="
                                            stopResource == 1 ? 'active' : ''
                                          "
                                          style="color: #333"
                                          @click="setStopResource(1)"
                                        >
                                          <span class="mg-r-5"></span>
                                          {{ $t("invoice.Outstock") }}
                                        </a>
                                      </div>
                                      <div class="mg-t-10">
                                        <a
                                          href="javascript:;"
                                          class="input-btn d-flex"
                                          :class="
                                            stopResource === 2 ? 'active' : ''
                                          "
                                          style="color: #333"
                                          @click="setStopResource(2)"
                                        >
                                          <span class="mg-r-5"></span> 暂时移除
                                          <el-tooltip
                                            content="表示从当前采购单中暂时移除，稍候可以继续对此Shopify订单生成采购订单。"
                                            placement="right"
                                          >
                                            <i
                                              class="el-icon-info"
                                              style="
                                                margin-left: 2px;
                                                font-size: 14px;
                                                color: #5c6ac4;
                                              "
                                            ></i>
                                          </el-tooltip>
                                        </a>
                                      </div>
                                      <div class="mg-t-10">
                                        <a
                                          href="javascript:;"
                                          class="input-btn d-flex"
                                          :class="
                                            stopResource === 3 ? 'active' : ''
                                          "
                                          style="color: #333"
                                          @click="setStopResource(3)"
                                        >
                                          <span class="mg-r-5"></span> 尚未合作
                                          <el-tooltip placement="right">
                                            <div slot="content">
                                              表示该商品您无法供货，之后再新生成采购订单时，该商品将自动设为不发货<br />（如您以后可以供货，可在“尚未合作商品”列表中对该商品进行报价和处理）
                                            </div>
                                            <i
                                              class="el-icon-info"
                                              style="
                                                margin-left: 2px;
                                                font-size: 14px;
                                                color: #5c6ac4;
                                              "
                                            ></i>
                                          </el-tooltip>
                                        </a>
                                      </div>
                                      <div class="mg-t-10">
                                        <a
                                          href="javascript:;"
                                          class="input-btn d-flex"
                                          :class="
                                            stopResource == 99 ? 'active' : ''
                                          "
                                          style="color: #333"
                                          @click="setStopResource(99)"
                                        >
                                          <span class="mg-r-5"></span>
                                          {{ $t("invoice.Other") }}
                                        </a>
                                      </div>

                                      <div class="mg-t-10">
                                        <div class="tx-right">
                                          <el-button
                                            size="small"
                                            @click="
                                              scope._self.$refs[
                                                `popover-stop-${scope.$index}`
                                              ].doClose()
                                            "
                                            >{{
                                              $t("invoice.cancel")
                                            }}</el-button
                                          >
                                          <el-button
                                            size="small"
                                            type="primary"
                                            @click="setStop(scope.row, '2')"
                                            >{{
                                              $t("invoice.confirm")
                                            }}</el-button
                                          >
                                        </div>
                                      </div>
                                    </div>
                                    <el-link
                                      @click="showPopover3"
                                      slot="reference"
                                      :underline="false"
                                      style="color: #f56c6c; font-size: 12px"
                                    >
                                      {{ $t("invoice.Setdelete") }}
                                    </el-link>
                                  </el-popover>
                                </template>
                                <template
                                  v-else-if="invoiceInfo.allowWithdraw == 1"
                                >
                                  <el-button
                                    @click="setStop(scope.row, '1')"
                                    type="text"
                                    style="color: #67c23a; font-size: 12px"
                                    >{{ $t("invoice.Resume") }}</el-button
                                  >
                                </template>
                                <div
                                  v-if="scope.row.fulfillStatus == '2'"
                                  class="tx-center"
                                >
                                  <el-link
                                    slot="reference"
                                    type="danger"
                                    @click="setRestore(scope.row)"
                                    >删除</el-link
                                  >
                                </div>
                              </div>
                            </div>
                          </template>
                        </el-table-column>
                        <!-- 操作 end -->
                        <!-- 供货总价 start -->
                        <!-- <el-table-column :label="$t('invoice.Totalsupply')" width="120">
                          <template slot-scope="scope">
                            <div v-if="isChangePrice(scope.row)">
                              <el-input
                                name="price-input"
                                disabled="disabled"
                                size="small"
                                :placeholder="$t('invoice.Totalsupply')"
                                v-model="scope.row.amount">
                              </el-input>
                            </div>
                            <template v-else>
                              <el-input
                                name="price-input"
                                type="number"
                                @input="scope.row.amount = (scope.row.amount.match(/^\d*(\.?\d{0,2})/g)[0]) || null"
                                size="small" :placeholder="$t('invoice.Totalsupply')"
                                v-model="scope.row.amount"
                                @change="changePriceTotalFn(scope.row,scope.$index)"></el-input>
                            </template>
                          </template>
                        </el-table-column> -->
                        <!-- 供货总价 end -->
                      </el-table>
                    </div>

                    <!-- 商品维度 -->
                    <div v-if="tabActive == 2">
                      <el-table
                        v-loading.fullscreen.lock="pageLoading"
                        element-loading-background="rgba(0, 0, 0, 0.6)"
                        :row-class-name="tableRowClassName2"
                        :header-cell-style="getRowClass3"
                        :cell-class-name="getCellClass"
                        :cell-style="cellStyle"
                        :data="invoiceData"
                        stripe
                        border
                        class="table-with-body"
                        :row-key="getRowKey"
                        :expand-row-keys="expands"
                        @row-click="rowClick"
                        @expand-change="expandChange"
                      >
                        <!-- 订单维度-展开设置 start  -->
                        <el-table-column type="expand" width="20">
                          <template slot-scope="props">
                            <el-card shadow="never">
                              <div>
                                <el-table
                                  :header-cell-style="getRowClass2"
                                  :cell-style="cellStyle2"
                                  :data="props.row.displayItems"
                                  stripe
                                  border
                                  class="table-with-body"
                                >
                                  <el-table-column
                                    width="150"
                                    prop="sku"
                                    :label="$t('invoice.SupplierSKU')"
                                  >
                                    <template slot-scope="scope">
                                      <div class="d-flex sku-with-error">
                                        <el-tooltip
                                          placement="left"
                                          v-if="
                                            (!scope.row.sku ||
                                              !scope.row.price) &&
                                            scope.row.quantity > 0 &&
                                            scope.row.fulfillStatus != 2
                                          "
                                        >
                                          <div slot="content">
                                            {{ $t("invoice.SKUmissing")
                                            }}<br />{{ $t("invoice.Reason") }}
                                            <span
                                              v-if="
                                                !scope.row.sku &&
                                                !scope.row.price
                                              "
                                              >{{
                                                $t("invoice.pricemissing")
                                              }}</span
                                            >
                                            <span v-else-if="!scope.row.sku">{{
                                              $t("invoice.SKUmissing")
                                            }}</span>
                                            <span v-else="!scope.row.price">{{
                                              $t("invoice.supplypricemissing")
                                            }}</span>
                                          </div>
                                          <i
                                            class="
                                              fa fa-exclamation-triangle
                                              mg-r-10
                                            "
                                            style="color: #f56c6c; left: -55px"
                                          ></i>
                                        </el-tooltip>

                                        <div>
                                          <div v-if="isChangeSku(scope.row)">
                                            <el-input
                                              disabled="disabled"
                                              size="small"
                                              placeholder="SKU"
                                              v-model="scope.row.sku"
                                              @change="
                                                changeSkuFnBySub(scope.row)
                                              "
                                            >
                                            </el-input>
                                          </div>
                                          <template v-else>
                                            <el-input
                                              slot="reference"
                                              size="small"
                                              placeholder="SKU"
                                              v-model="scope.row.sku"
                                              @change="
                                                changeSkuFnBySub(scope.row)
                                              "
                                            >
                                            </el-input>
                                          </template>
                                        </div>
                                      </div>
                                    </template>
                                  </el-table-column>
                                  <el-table-column>
                                    <template slot="header">
                                      {{ $t("invoice.ShopifyOrders") }}
                                    </template>
                                    <template slot-scope="scope">
                                      <div>
                                        <div
                                          style="
                                            max-width: 100%;
                                            text-align: left;
                                          "
                                        >
                                          <div
                                            class="
                                              d-flex
                                              no-wrap
                                              justify-content-between
                                            "
                                          >
                                            <el-popover
                                              class="d-flex"
                                              popper-class="customer-popover"
                                              placement="bottom"
                                              :title="`${$t(
                                                'invoice.ShopifyOrders'
                                              )} ${scope.row.codeName}`"
                                              width="500"
                                              trigger="hover"
                                            >
                                              <div
                                                slot="reference"
                                                style="cursor: pointer"
                                              >
                                                <span style="margin-right: 10px"
                                                  >{{ scope.row.codeName
                                                  }}<i
                                                    class="
                                                      el-icon-caret-bottom
                                                      el-icon--right
                                                    "
                                                  ></i
                                                ></span>
                                                <span
                                                  class="tx-ellipsis1"
                                                  style="
                                                    display: inline-block;
                                                    max-width: 100px;
                                                  "
                                                  v-if="
                                                    scope.row.shippingJson &&
                                                    scope.row.shippingJson.name
                                                  "
                                                  >To
                                                  {{
                                                    scope.row.shippingJson.name
                                                  }}
                                                </span>
                                                <span
                                                  style="
                                                    display: inline-block;
                                                    max-width: 100px;
                                                    text-overflow: ellipsis;
                                                  "
                                                  v-if="
                                                    scope.row.shippingJson &&
                                                    scope.row.shippingJson
                                                      .country
                                                  "
                                                >
                                                  ({{
                                                    scope.row.shippingJson
                                                      .country
                                                  }})</span
                                                >
                                              </div>
                                              <div class="mg-y-15 mg-t-20">
                                                <div class="d-flex">
                                                  <div
                                                    class="d-flex"
                                                    style="width: 90%"
                                                  >
                                                    <div
                                                      style="
                                                        width: 100px;
                                                        text-align: right;
                                                        color: #999;
                                                      "
                                                      class=""
                                                    >
                                                      {{
                                                        $t("invoice.Orderdate")
                                                      }}
                                                    </div>
                                                    <div class="mg-l-5 pd-r-15">
                                                      {{
                                                        scope.row.timeCreated
                                                      }}
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="d-flex">
                                                  <div
                                                    class="d-flex"
                                                    style="width: 90%"
                                                  >
                                                    <div
                                                      style="
                                                        width: 100px;
                                                        text-align: right;
                                                        color: #999;
                                                      "
                                                      class=""
                                                    >
                                                      {{ $t("invoice.Buyer") }}
                                                    </div>
                                                    <div class="mg-l-5 pd-r-15">
                                                      {{
                                                        scope.row
                                                          .shippingJson &&
                                                        scope.row.shippingJson
                                                          .name
                                                          ? scope.row
                                                              .shippingJson.name
                                                          : "---"
                                                      }}
                                                    </div>
                                                  </div>
                                                  <el-tooltip
                                                    class="item"
                                                    effect="dark"
                                                    :content="
                                                      $t(
                                                        'invoice.Copyinformation'
                                                      )
                                                    "
                                                    placement="left"
                                                  >
                                                    <el-button
                                                      size="mini"
                                                      type="text"
                                                      ><i
                                                        class="
                                                          el-icon-document-copy
                                                        "
                                                        v-clipboard:copy="
                                                          scope.row.shippingJson
                                                            .name
                                                        "
                                                        v-clipboard:success="
                                                          onCopy
                                                        "
                                                        v-clipboard:error="
                                                          onError
                                                        "
                                                      ></i
                                                    ></el-button>
                                                  </el-tooltip>
                                                </div>
                                                <div class="d-flex">
                                                  <div
                                                    class="d-flex"
                                                    style="width: 90%"
                                                  >
                                                    <div
                                                      style="
                                                        width: 100px;
                                                        text-align: right;
                                                        color: #999;
                                                      "
                                                      class=""
                                                    >
                                                      {{
                                                        $t("invoice.address")
                                                      }}
                                                    </div>
                                                    <div
                                                      class="mg-l-5 pd-r-15"
                                                      style="max-width: 75%"
                                                    >
                                                      {{
                                                        scope.row
                                                          .shippingJson &&
                                                        scope.row.shippingJson
                                                          .zip
                                                          ? scope.row
                                                              .shippingJson.zip
                                                          : "---"
                                                      }}
                                                      {{
                                                        scope.row
                                                          .shippingJson &&
                                                        scope.row.shippingJson
                                                          .address1
                                                          ? scope.row
                                                              .shippingJson
                                                              .address1
                                                          : "---"
                                                      }}
                                                      {{
                                                        scope.row
                                                          .shippingJson &&
                                                        scope.row.shippingJson
                                                          .city
                                                          ? scope.row
                                                              .shippingJson.city
                                                          : "---"
                                                      }}
                                                      {{
                                                        scope.row
                                                          .shippingJson &&
                                                        scope.row.shippingJson
                                                          .province
                                                          ? scope.row
                                                              .shippingJson
                                                              .province
                                                          : "---"
                                                      }}
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="d-flex">
                                                  <div
                                                    class="d-flex"
                                                    style="width: 90%"
                                                  >
                                                    <div
                                                      style="
                                                        width: 100px;
                                                        text-align: right;
                                                        color: #999;
                                                      "
                                                      class=""
                                                    ></div>
                                                    <div class="mg-l-5 pd-r-15">
                                                      {{
                                                        scope.row
                                                          .shippingJson &&
                                                        scope.row.shippingJson
                                                          .country
                                                          ? scope.row
                                                              .shippingJson
                                                              .country
                                                          : "---"
                                                      }}
                                                    </div>
                                                  </div>
                                                  <el-tooltip
                                                    class="item"
                                                    effect="dark"
                                                    :content="
                                                      $t('invoice.Copyaddress')
                                                    "
                                                    placement="left"
                                                  >
                                                    <el-button
                                                      size="mini"
                                                      type="text"
                                                      ><i
                                                        class="
                                                          el-icon-document-copy
                                                        "
                                                        v-clipboard:copy="
                                                          scope.row.shippingJson
                                                            .zip +
                                                          scope.row.shippingJson
                                                            .address1 +
                                                          scope.row.shippingJson
                                                            .city +
                                                          scope.row.shippingJson
                                                            .province +
                                                          scope.row.shippingJson
                                                            .country
                                                        "
                                                        v-clipboard:success="
                                                          onCopy
                                                        "
                                                        v-clipboard:error="
                                                          onError
                                                        "
                                                      ></i
                                                    ></el-button>
                                                  </el-tooltip>
                                                </div>
                                                <div class="d-flex">
                                                  <div
                                                    class="d-flex"
                                                    style="width: 90%"
                                                  >
                                                    <div
                                                      style="
                                                        width: 100px;
                                                        text-align: right;
                                                        color: #999;
                                                      "
                                                      class=""
                                                    >
                                                      {{
                                                        $t("invoice.BuyerEmail")
                                                      }}
                                                    </div>
                                                    <div class="mg-l-5 pd-r-15">
                                                      {{ scope.row.email }}
                                                    </div>
                                                  </div>
                                                  <template
                                                    v-if="scope.row.email"
                                                  >
                                                    <el-tooltip
                                                      class="item"
                                                      effect="dark"
                                                      :content="
                                                        $t('invoice.CopyEmail')
                                                      "
                                                      placement="left"
                                                    >
                                                      <el-button
                                                        size="mini"
                                                        type="text"
                                                        ><i
                                                          class="
                                                            el-icon-document-copy
                                                          "
                                                          v-clipboard:copy="
                                                            scope.row.email
                                                          "
                                                          v-clipboard:success="
                                                            onCopy
                                                          "
                                                          v-clipboard:error="
                                                            onError
                                                          "
                                                        ></i
                                                      ></el-button>
                                                    </el-tooltip>
                                                  </template>
                                                </div>
                                              </div>
                                            </el-popover>
                                          </div>
                                        </div>
                                      </div>
                                    </template>
                                  </el-table-column>
                                  <el-table-column prop="qty" width="160">
                                    <template slot="header">
                                      {{ $t("invoice.Purchasequantity") }}
                                    </template>
                                    <template slot-scope="scope">
                                      <template>
                                        <template
                                          v-if="isChangeOther(scope.row)"
                                        >
                                          <el-input-number
                                            :disabled="true"
                                            size="small"
                                            :min="1"
                                            v-model="scope.row.quantity"
                                            @change="
                                              handleChangeBySub(
                                                props,
                                                scope.row,
                                                $event
                                              )
                                            "
                                          ></el-input-number>
                                        </template>
                                        <template v-else>
                                          <el-input-number
                                            size="small"
                                            :min="1"
                                            v-model="scope.row.quantity"
                                            @change="
                                              handleChangeBySub(
                                                props,
                                                scope.row,
                                                $event
                                              )
                                            "
                                          ></el-input-number>
                                        </template>
                                      </template>
                                    </template>
                                  </el-table-column>
                                  <!-- 商品维度的商品表格 的 客户实际售价 -->
                                  <el-table-column
                                    :label="$t('invoice.客户实际售价')"
                                    width="100px"
                                  >
                                    <template slot-scope="scope">
                                      <template v-if="scope.row.customerPrice">
                                        <span
                                          v-if="scope.row.currency"
                                          style="color: #909399"
                                          >{{ scope.row.currency
                                          }}{{
                                            $CE[scope.row.currency].symbol
                                          }}</span
                                        >
                                        <span v-else style="color: #909399"
                                          >US$</span
                                        >
                                        {{ scope.row.customerPrice }}
                                      </template>
                                      <template v-else
                                        ><span style="color: #c0c4cc"
                                          >---</span
                                        ></template
                                      >
                                    </template>
                                  </el-table-column>
                                  <el-table-column
                                    prop="price"
                                    :label="$t('invoice.Supplyunit')"
                                    width="120"
                                  >
                                    <template slot-scope="scope">
                                      <div>
                                        <div v-if="isChangePrice(scope.row)">
                                          <el-input
                                            disabled="disabled"
                                            name="price-input"
                                            size="small"
                                            :placeholder="
                                              $t('invoice.Supplyunit')
                                            "
                                            v-model="scope.row.price"
                                            @change="
                                              changePriceFnBySub(
                                                props,
                                                scope.row
                                              )
                                            "
                                          >
                                          </el-input>
                                        </div>
                                        <template v-else>
                                          <el-input-number
                                            slot="reference"
                                            name="price-input"
                                            size="small"
                                            :placeholder="
                                              $t('invoice.Supplyunit')
                                            "
                                            :min="0"
                                            :controls="false"
                                            :precision="2"
                                            v-model="scope.row.price"
                                            @change="
                                              changePriceFnBySub(
                                                props,
                                                scope.row
                                              )
                                            "
                                          >
                                          </el-input-number>
                                        </template>
                                      </div>
                                    </template>
                                  </el-table-column>
                                  <el-table-column
                                    :label="$t('invoice.Totalsupply')"
                                    width="120"
                                  >
                                    <template slot-scope="scope">
                                      <div v-if="isChangePrice(scope.row)">
                                        <el-input
                                          name="price-input"
                                          disabled="disabled"
                                          size="small"
                                          :placeholder="
                                            $t('invoice.Totalsupply')
                                          "
                                          v-model="scope.row.amount"
                                        >
                                        </el-input>
                                      </div>
                                      <template v-else>
                                        <el-input
                                          name="price-input"
                                          type="number"
                                          @input="
                                            scope.row.amount =
                                              scope.row.amount.match(
                                                /^\d*(\.?\d{0,2})/g
                                              )[0] || null
                                          "
                                          size="small"
                                          :placeholder="
                                            $t('invoice.Totalsupply')
                                          "
                                          v-model="scope.row.amount"
                                          @change="
                                            changePriceTotalFnBySub(
                                              props,
                                              scope.row
                                            )
                                          "
                                        >
                                        </el-input>
                                      </template>
                                      <!--<div>
																			{{$numberToCurrency(scope.row.amount)}}
																		</div>-->
                                    </template>
                                  </el-table-column>
                                </el-table>
                                <div class="expandPage">
                                  <el-pagination
                                    :hide-on-single-page="true"
                                    :current-page="props.row.displayItemsPage"
                                    :background="true"
                                    layout="total, prev, pager, next, jumper"
                                    :page-size="50"
                                    :total="Number(props.row.allItems.length)"
                                    @current-change="
                                      (val) => DisplayToPage(val, props.row)
                                    "
                                  ></el-pagination>
                                </div>
                              </div>
                            </el-card>
                          </template>
                        </el-table-column>
                        <!-- 订单维度-展开设置 end  -->

                        <!--  订单维度-供应商SKU编号 start   -->
                        <el-table-column width="240">
                          <template #header>
                            <div class="d-flex align-item-center change-type">
                              {{ $t("invoice.SupplierSKU") }}
                            </div>
                          </template>
                          <template v-slot="scope">
                            <div class="d-flex sku-with-error">
                              <!-- 未设置供货商SKU提示  -->
                              <el-tooltip
                                placement="left"
                                v-if="
                                  (!scope.row.sku || !scope.row.price) &&
                                  scope.row.quantity > 0 &&
                                  scope.row.fulfillStatus != 2
                                "
                              >
                                <div slot="content">
                                  {{ $t("invoice.SKUmissing") }}<br />{{
                                    $t("invoice.Reason")
                                  }}
                                  <span
                                    v-if="!scope.row.sku && !scope.row.price"
                                    >{{ $t("invoice.pricemissing") }}</span
                                  >
                                  <span v-else-if="!scope.row.sku">{{
                                    $t("invoice.SKUmissing")
                                  }}</span>
                                  <span v-else="!scope.row.price">{{
                                    $t("invoice.supplypricemissing")
                                  }}</span>
                                </div>
                                <i
                                  class="fa fa-exclamation-triangle mg-r-10"
                                  style="color: #f56c6c; left: -55px"
                                ></i>
                              </el-tooltip>

                              <div>
                                <div v-if="isChangeSku(scope.row)">
                                  <el-input
                                    disabled="disabled"
                                    size="small"
                                    placeholder="SKU"
                                    v-model="scope.row.sku"
                                    @change="
                                      changeSkuFn(scope.row, scope.$index)
                                    "
                                  >
                                  </el-input>
                                </div>
                                <template v-else>
                                  <el-popover
                                    popper-class="with-shadow"
                                    width="400"
                                    :ref="`popoverSkuGroup-${scope.$index}`"
                                    placement="top"
                                    :title="$t('invoice.Batchset')"
                                    trigger="manual"
                                  >
                                    <div>
                                      <div class="mg-t-10">
                                        <div
                                          class="d-flex justify-content-between"
                                        >
                                          <span class=""
                                            >{{ $t("invoice.Total") }}
                                            <span
                                              class="color-primary tx-600"
                                              >{{ scope.row.cnt }}</span
                                            >{{ $t("invoice.haveset") }}
                                            <span
                                              class="color-primary tx-600"
                                              >{{ scope.row.sku }}</span
                                            >
                                          </span>
                                        </div>
                                      </div>
                                      <div class="mg-t-10">
                                        <div class="tx-right">
                                          <el-button
                                            size="small"
                                            @click="
                                              scope._self.$refs[
                                                `popoverSkuGroup-${scope.$index}`
                                              ].doClose()
                                            "
                                            >{{
                                              $t("invoice.cancel")
                                            }}</el-button
                                          >
                                          <el-button
                                            size="small"
                                            type="primary"
                                            @click="
                                              changeSkuFn(
                                                scope.row,
                                                scope.$index,
                                                'close'
                                              )
                                            "
                                            >{{
                                              $t("invoice.Save1")
                                            }}</el-button
                                          >
                                        </div>
                                      </div>
                                    </div>
                                    <el-input
                                      slot="reference"
                                      size="small"
                                      placeholder="SKU"
                                      v-model="scope.row.sku"
                                      @keyup.native="
                                        getSkuInfo2(
                                          scope.row,
                                          scope.$index,
                                          'popoverSkuGroup'
                                        )
                                      "
                                      @change="
                                        changeSkuFn(scope.row, scope.$index)
                                      "
                                    >
                                    </el-input>
                                  </el-popover>
                                  <!--商品维度 批量设为不发货 -->

                                  <el-popover
                                    v-if="
                                      invoiceInfo.payStatus != 1 &&
                                      invoiceInfo.customerRead != 1
                                    "
                                    :ref="`popover-stop-${scope.$index}`"
                                    @show="setDefaultResource"
                                    width="400"
                                    placement="top"
                                    :title="$t('invoice.deleteReason')"
                                    trigger="click"
                                  >
                                    <div>
                                      <div class="mg-t-20">
                                        <a
                                          href="javascript:;"
                                          class="input-btn d-flex"
                                          :class="
                                            stopResource == 1 ? 'active' : ''
                                          "
                                          style="color: #333"
                                          @click="setStopResource(1)"
                                        >
                                          <span class="mg-r-5"></span>
                                          {{ $t("invoice.Outstock") }}
                                        </a>
                                      </div>
                                      <div class="mg-t-10">
                                        <a
                                          href="javascript:;"
                                          class="input-btn d-flex"
                                          :class="
                                            stopResource === 2 ? 'active' : ''
                                          "
                                          style="color: #333"
                                          @click="setStopResource(2)"
                                        >
                                          <span class="mg-r-5"></span> 暂时移除
                                          <el-tooltip
                                            content="表示从当前采购单中暂时移除，稍候可以继续对此Shopify订单生成采购订单。"
                                            placement="right"
                                          >
                                            <i
                                              class="el-icon-info"
                                              style="
                                                margin-left: 2px;
                                                font-size: 14px;
                                                color: #5c6ac4;
                                              "
                                            ></i>
                                          </el-tooltip>
                                        </a>
                                      </div>
                                      <div class="mg-t-10">
                                        <a
                                          href="javascript:;"
                                          class="input-btn d-flex"
                                          :class="
                                            stopResource === 3 ? 'active' : ''
                                          "
                                          style="color: #333"
                                          @click="setStopResource(3)"
                                        >
                                          <span class="mg-r-5"></span> 尚未合作
                                          <el-tooltip placement="right">
                                            <div slot="content">
                                              表示该商品您无法供货，之后再新生成采购订单时，该商品将自动设为不发货
                                              <br />（如您以后可以供货，可在“尚未合作商品”列表中对该商品进行报价和处理
                                            </div>
                                            <i
                                              class="el-icon-info"
                                              style="
                                                margin-left: 2px;
                                                font-size: 14px;
                                                color: #5c6ac4;
                                              "
                                            ></i>
                                          </el-tooltip>
                                        </a>
                                      </div>
                                      <div class="mg-t-10">
                                        <a
                                          href="javascript:;"
                                          class="input-btn d-flex"
                                          :class="
                                            stopResource == 99 ? 'active' : ''
                                          "
                                          style="color: #333"
                                          @click="setStopResource(99)"
                                        >
                                          <span class="mg-r-5"></span>
                                          {{ $t("invoice.Other") }}
                                        </a>
                                      </div>
                                      <div class="mg-t-10">
                                        <div class="tx-right">
                                          <el-button
                                            size="small"
                                            @click="
                                              scope._self.$refs[
                                                `popover-stop-${scope.$index}`
                                              ].doClose()
                                            "
                                            >{{
                                              $t("invoice.cancel")
                                            }}</el-button
                                          >
                                          <el-button
                                            size="small"
                                            type="primary"
                                            @click="setStop(scope.row, '2')"
                                            >{{
                                              $t("invoice.confirm")
                                            }}</el-button
                                          >
                                        </div>
                                      </div>
                                    </div>
                                    <!-- @click="showPopover"  -->
                                    <el-link
                                      slot="reference"
                                      @click="showPopover3"
                                      :underline="false"
                                      style="
                                        color: #f56c6c;
                                        font-size: 12px;
                                        text-align: left;
                                        display: block;
                                      "
                                    >
                                      <i
                                        style="margin-right: 3px"
                                        class="el-icon-remove-outline sbns-icon"
                                      ></i>
                                      {{ $t("invoice.Setdelete") }}
                                    </el-link>
                                  </el-popover>
                                </template>
                              </div>
                            </div>
                          </template>
                        </el-table-column>
                        <!--  订单维度-供应商SKU编号 end   -->

                        <!--  订单维度-订单商品项和物流单号 start   -->
                        <el-table-column>
                          <template #header>
                            <div v-if="!searchName && !searchTrack">
                              <div
                                class="
                                  d-flex
                                  align-items-center
                                  justify-content-between
                                "
                              >
                                <div>
                                  {{ $t("invoice.Orderitems") }}
                                  <el-button
                                    size="mini"
                                    type="text"
                                    @click="searchName = true"
                                  >
                                    <i class="el-icon-search mg-l-5"></i>
                                  </el-button>
                                </div>
                                <div>
                                  {{ $t("invoice.Logisticsnumber") }}
                                  <el-button
                                    size="mini"
                                    type="text"
                                    @click="searchTrack = true"
                                  >
                                    <i class="el-icon-search mg-l-5"></i>
                                  </el-button>
                                </div>
                              </div>
                            </div>
                            <div
                              v-if="searchName || searchTrack"
                              class="d-flex"
                            >
                              <el-input
                                size="mini"
                                type="text"
                                :placeholder="
                                  searchName
                                    ? $t('invoice.Supportsearchname')
                                    : $t('invoice.Supportsearchnumber')
                                "
                                v-model="searchNameInput"
                                ref="searchNameInput"
                                clearable
                                @clear="Filter(2, 'name')"
                                @blur="Filter(3, 'name')"
                                @keyup.enter.native="Filter(1, 'name')"
                              >
                                <!--<el-link v-if="searchNameInput" slot="suffix" :underline="false" style="font-size: 12px;" @click="Filter(2,'name')">清除条件</el-link>-->
                                <el-button
                                  @click="Filter(1, 'name')"
                                  type="primary"
                                  size="mini"
                                  slot="append"
                                  icon="el-icon-search"
                                ></el-button>
                              </el-input>
                            </div>
                          </template>

                          <template slot-scope="scope">
                            <div class="d-flex">
                              <el-image
                                style="
                                  min-width: 70px;
                                  width: 70px;
                                  height: 70px;
                                  margin: 0 5px 0 0;
                                  border: 1px solid #ddd;
                                "
                                lazy
                                :src="scope.row.imgUrl"
                                :preview-src-list="scope.row.previewList"
                              >
                                <div slot="error" class="image-slot">
                                  <i
                                    class="el-icon-picture-outline"
                                    style="font-size: 20px"
                                  ></i>
                                </div>
                              </el-image>
                              <div style="max-width: 100%; text-align: left">
                                <div class="tx-600">
                                  {{ scope.row.name }}
                                </div>
                              </div>
                            </div>
                          </template>
                        </el-table-column>
                        <!--  订单维度-订单商品项和物流单号 end   -->

                        <!--  订单维度-采购数量 start   -->
                        <el-table-column prop="qty" width="80">
                          <template #header>
                            {{ $t("invoice.Purchasequantity") }}
                          </template>
                          <template slot-scope="scope">
                            <span>{{ scope.row.quantity }}</span>
                          </template>
                        </el-table-column>
                        <!--  订单维度-采购数量 end   -->
                        <!--  订单维度-供货单价 start   -->
                        <el-table-column
                          prop="price"
                          :width="!isChangeAmount() ? '200px' : '120px'"
                        >
                          <template #header>
                            <div class="supplyunit" style="text-align: center">
                              {{ $t("invoice.Supplyunit") }}
                            </div>
                          </template>
                          <template slot-scope="scope">
                            <div>
                              <div
                                v-if="isChangePrice(scope.row)"
                                class="d-flex"
                              >
                                <el-input
                                  disabled="disabled"
                                  name="price-input"
                                  size="small"
                                  :placeholder="$t('invoice.Supplyunit')"
                                  v-model="scope.row.price"
                                  @change="
                                    changePriceFn(scope.row, scope.$index)
                                  "
                                >
                                </el-input>
                                <a
                                  v-if="
                                    !isChangeAmount() &&
                                    scope.fulfillStatus === '1'
                                  "
                                  @click.stop="setLotPrice(scope.row)"
                                  href="javascript:;"
                                  class="mg-l-0"
                                  style="
                                    font-weight: bold;
                                    white-space: nowrap;
                                    margin-left: 10px;
                                  "
                                  >{{ $t("invoice.Batchset") }}</a
                                >
                              </div>
                              <div v-else class="d-flex">
                                <el-popover
                                  v-if="scope.row.price !== null"
                                  popper-class="with-shadow"
                                  width="400"
                                  :ref="`popoverPriceGroup-${scope.$index}`"
                                  placement="top"
                                  :title="$t('invoice.Batchsupplyset')"
                                  trigger="manual"
                                >
                                  <div>
                                    <div class="mg-t-10">
                                      <div
                                        class="d-flex justify-content-between"
                                      >
                                        <span class="">
                                          <span
                                            v-html="
                                              $t('invoice.hereare', {
                                                num: Number(scope.row.cnt),
                                              })
                                            "
                                          ></span
                                          >{{ $t("invoice.Batchsetto") }}
                                          <span class="color-primary tx-600">{{
                                            scope.row.price
                                          }}</span>
                                        </span>
                                      </div>
                                    </div>
                                    <div class="mg-t-10">
                                      <div class="tx-right">
                                        <el-button
                                          size="small"
                                          @click="
                                            scope._self.$refs[
                                              `popoverPriceGroup-${scope.$index}`
                                            ].doClose()
                                          "
                                          >{{ $t("invoice.cancel") }}</el-button
                                        >
                                        <el-button
                                          size="small"
                                          type="primary"
                                          @click="
                                            changePriceFn(
                                              scope.row,
                                              scope.$index,
                                              'close'
                                            )
                                          "
                                          >{{ $t("invoice.Save1") }}</el-button
                                        >
                                      </div>
                                    </div>
                                  </div>
                                  <el-input
                                    type="number"
                                    @input="
                                      scope.row.price =
                                        scope.row.price.match(
                                          /^\d*(\.?\d{0,2})/g
                                        )[0] || null
                                    "
                                    slot="reference"
                                    name="price-input"
                                    size="small"
                                    :placeholder="$t('invoice.Supplyunit')"
                                    v-model="scope.row.price"
                                    @keyup.native="
                                      getPriceInfo2(
                                        scope.row,
                                        scope.$index,
                                        'popoverPriceGroup'
                                      )
                                    "
                                    @change="
                                      changePriceFn(scope.row, scope.$index)
                                    "
                                    :ref="`refInput${scope.$index}`"
                                    @blur="blueChange(scope.row, scope.$index)"
                                  >
                                  </el-input>
                                </el-popover>
                                <div v-else>
                                  <el-tooltip
                                    class="item"
                                    effect="dark"
                                    :content="$t('invoice.noAllow')"
                                    placement="top"
                                    v-model="scope.row.tooltipShow"
                                  >
                                    <div>
                                      <el-input
                                        type="number"
                                        name="price-input"
                                        size="small"
                                        class="unactive"
                                        slot="reference"
                                        v-model="scope.row.price"
                                        @input="
                                          scope.row.price =
                                            scope.row.price.match(
                                              /^\d*(\.?\d{0,2})/g
                                            )[0] || null
                                        "
                                        @keyup.native="
                                          getPriceInfo(scope.row, scope.$index)
                                        "
                                        @change="
                                          changePriceFn(scope.row, scope.$index)
                                        "
                                        @focus="
                                          focusChange(scope.row, scope.$index)
                                        "
                                      >
                                      </el-input>
                                      {{ scope.row.price }}
                                    </div>
                                  </el-tooltip>
                                </div>
                                <a
                                  v-if="!isChangeAmount()"
                                  @click.stop="setLotPrice(scope.row)"
                                  href="javascript:;"
                                  class="mg-l-0"
                                  style="
                                    font-weight: bold;
                                    white-space: nowrap;
                                    margin-left: 10px;
                                  "
                                  >{{ $t("invoice.Batchset") }}</a
                                >
                              </div>
                              <p
                                v-show="
                                  scope.row.minPrice > 0 &&
                                  scope.row.minPrice != scope.row.maxPrice
                                "
                              >
                                {{ $t("invoice.supplyprice")
                                }}{{ $numberToCurrency(scope.row.minPrice) }} ~
                                {{ $numberToCurrency(scope.row.maxPrice) }}
                              </p>
                            </div>
                          </template>
                        </el-table-column>
                        <!--  订单维度-供货单价 end   -->

                        <!--  订单维度-供货总价 start   -->
                        <el-table-column
                          :label="$t('invoice.Totalsupply')"
                          width="120"
                        >
                          <template slot-scope="scope">
                            <div>
                              {{ $numberToCurrency(scope.row.amount) }}
                            </div>
                          </template>
                        </el-table-column>
                        <!--  订单维度-供货总价 end   -->
                      </el-table>
                    </div>
                  </template>

                  <template v-if="invoiceData.length == 0">
                    <el-table
                      :header-cell-style="getRowClass"
                      :cell-style="cellStyle"
                      class="table-only"
                    >
                      <el-table-column
                        width="150"
                        :label="$t('invoice.SupplierSKU')"
                      >
                      </el-table-column>
                      <el-table-column label="Items"> </el-table-column>
                      <el-table-column label="Quantity" width="160">
                      </el-table-column>
                      <el-table-column label="Unit Cost(US$)" width="120">
                      </el-table-column>
                      <el-table-column label="Subtotal(US$)" width="120">
                      </el-table-column>
                    </el-table>
                    <el-table
                      :row-class-name="tableRowClassName"
                      :header-cell-style="getRowClass"
                      :cell-class-name="getCellClass"
                      :cell-style="cellStyle"
                      :data="invoiceData"
                      stripe
                      border
                      class="table-with-body"
                    >
                      <el-table-column width="150">
                        <template slot="header">
                          {{ $t("invoice.SupplierSKU") }}
                        </template>
                      </el-table-column>
                      <el-table-column>
                        <template slot="header">
                          <div v-if="!searchName && !searchTrack">
                            <div
                              class="
                                d-flex
                                align-items-center
                                justify-content-between
                              "
                            >
                              <div>
                                {{ $t("invoice.Orderitems") }}
                                <el-button
                                  size="mini"
                                  type="text"
                                  @click="searchName = true"
                                >
                                  <i class="el-icon-search mg-l-5"></i>
                                </el-button>
                              </div>
                              <div>
                                {{ $t("invoice.Logisticsnumber") }}
                                <el-button
                                  size="mini"
                                  type="text"
                                  @click="searchTrack = true"
                                >
                                  <i class="el-icon-search mg-l-5"></i>
                                </el-button>
                              </div>
                            </div>
                          </div>
                          <div v-if="searchName || searchTrack" class="d-flex">
                            <el-input
                              size="mini"
                              type="text"
                              :placeholder="
                                searchName
                                  ? $t('invoice.Supportsearchname')
                                  : $t('invoice.Supportsearchnumber')
                              "
                              v-model="searchNameInput"
                              ref="searchNameInput"
                              clearable
                              @clear="Filter(2, 'name')"
                              @blur="Filter(3, 'name')"
                              @keyup.enter.native="Filter(1, 'name')"
                            >
                              <!--<el-link v-if="searchNameInput" slot="suffix" :underline="false" style="font-size: 12px;" @click="Filter(2,'name')">清除条件</el-link>-->
                              <el-button
                                @click="Filter(1, 'name')"
                                type="primary"
                                size="mini"
                                slot="append"
                                icon="el-icon-search"
                              ></el-button>
                            </el-input>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="qty" width="160">
                        <template slot="header" slot-scope="scope">
                          {{ $t("invoice.Purchasequantity") }}
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="price"
                        :label="$t('invoice.Supplyunit')"
                        width="120"
                      >
                      </el-table-column>
                      <el-table-column
                        :label="$t('invoice.Totalsupply')"
                        width="120"
                      >
                      </el-table-column>
                    </el-table>
                  </template>
                </div>
                <!-- 分页 -->
                <el-row v-if="invoiceData.length" :gutter="20">
                  <el-col :span="24" class="d-flex justify-content-center">
                    <div style="position: relative; top: 10px">
                      <el-pagination
                        :hide-on-single-page="true"
                        :current-page="page"
                        :background="true"
                        layout="total, prev, pager, next, jumper"
                        :page-size="rowsPerPage"
                        :total="Number(totalCount)"
                        @current-change="toPage"
                      >
                      </el-pagination>
                    </div>
                  </el-col>
                </el-row>
                <el-divider></el-divider>
                <!-- 分页结束 -->
                <template v-if="tabActive == 1 || tabActive == 2">
                  <div
                    style="min-height: 50px; z-index: 0"
                    class="page-footer mg-t-30 mg-b-10"
                    v-loading="loading"
                  >
                    <el-row>
                      <el-col :span="8">
                        <div class="text item">
                          <!--#f4f4f5-->
                          <div style="background-color: #fff; padding: 20px">
                            <p
                              v-show="invoiceInfo.customerRead == 1"
                              style="color: #67c23a; margin-bottom: 20px"
                            >
                              <i
                                class="el-icon-success"
                                style="font-size: 16px"
                              ></i>
                              <span
                                style="
                                  display: inline-block;
                                  width: 120px;
                                  margin: 0 5px;
                                "
                                >{{ $t("invoice.Customerconfirmed") }}</span
                              >{{
                                invoiceInfo.timeRead
                                  ? invoiceInfo.timeRead
                                  : "---"
                              }}
                            </p>
                            <p
                              v-show="invoiceInfo.payStatus == 1"
                              style="color: #67c23a; margin-bottom: 20px"
                            >
                              <i
                                class="el-icon-success"
                                style="font-size: 16px"
                              ></i>
                              <span
                                style="
                                  display: inline-block;
                                  width: 120px;
                                  margin: 0 5px;
                                "
                                >{{ $t("invoice.Supplierconfirmed") }} </span
                              >{{
                                invoiceInfo.timePaid
                                  ? invoiceInfo.timePaid
                                  : "---"
                              }}
                            </p>
                            <p
                              v-show="invoiceInfo.timeApiGet"
                              style="color: #67c23a; margin-bottom: 20px"
                            >
                              <i
                                class="el-icon-success"
                                style="font-size: 16px"
                              ></i>
                              <span
                                style="
                                  display: inline-block;
                                  width: 120px;
                                  margin: 0 5px;
                                "
                                >{{ $t("invoice.ERPdownloaded") }} </span
                              >{{
                                invoiceInfo.timeApiGet
                                  ? invoiceInfo.timeApiGet
                                  : "---"
                              }}
                            </p>
                            <p
                              v-show="invoiceInfo.firstDeliverTime"
                              style="color: #67c23a; margin-bottom: 20px"
                            >
                              <i
                                class="el-icon-success"
                                style="font-size: 16px"
                              ></i>
                              <span
                                style="
                                  display: inline-block;
                                  width: 120px;
                                  margin: 0 5px;
                                "
                                >{{ $t("invoice.Supplierstarts") }}</span
                              >{{
                                invoiceInfo.firstDeliverTime
                                  ? invoiceInfo.firstDeliverTime
                                  : "---"
                              }}
                            </p>
                          </div>
                        </div>
                      </el-col>
                      <!-- 页面底部 -->
                      <el-col :span="16">
                        <div class="grid-content invoice-bottom">
                          <div class="d-flex justify-content-end mg-b-10">
                            <div class="">
                              {{ $t("invoice.Producttotal") }}(US$) :
                            </div>
                            <div class="mg-l-5 pd-r-15">
                              {{
                                realAmount > 0
                                  ? $numberToCurrency(itemAmount)
                                  : $t("invoice.Notset")
                              }}
                            </div>
                          </div>
                          <div class="d-flex justify-content-end">
                            <div class="">
                              {{ $t("invoice.Shippingtotal") }} (US$) :
                            </div>
                            <div class="mg-l-5 pd-r-15">
                              {{
                                Number(shippingAmount)
                                  ? $numberToCurrency(shippingAmount)
                                  : "0.00"
                              }}
                            </div>
                          </div>
                          <el-divider></el-divider>
                          <div
                            class="
                              d-flex
                              justify-content-end
                              mg-t-10
                              bold-input
                            "
                          >
                            <div class="tx-bold">
                              {{ $t("invoice.Totalamount") }}
                            </div>
                            <div
                              class="mg-l-5 pd-r-15 tx-danger tx-bold"
                              style="font-size: 16px"
                            >
                              {{
                                realAmount && realAmount > 0
                                  ? $numberToCurrency(realAmount)
                                  : $t("invoice.Notset")
                              }}
                            </div>
                          </div>
                          <!-- 当前采购单付款方式 -->
                          <div
                            class="
                              d-flex
                              justify-content-end
                              mg-t-10
                              set-paytype-3
                            "
                            style="
                              align-items: center;
                              background-color: #f2f6fc;
                              padding: 15px 0;
                            "
                            v-if="$store.state.userInfo.canUseWallet"
                          >
                            <div class="">
                              {{ $t("invoice.Paymentmethod") }} :
                            </div>
                            <div class="mg-l-5 pd-r-15">
                              <a
                                v-if="
                                  invoiceInfo.paymentType == 2 &&
                                  invoiceInfo.payUrl
                                "
                                :href="invoiceInfo.payUrl"
                                target="_blank"
                              >
                                {{
                                  $t(
                                    $dict.paymentType[invoiceInfo.paymentType]
                                      .text
                                  )
                                }}
                              </a>
                              <span v-else>
                                {{
                                  invoiceInfo.paymentType
                                    ? $t(
                                        $dict.paymentType[
                                          invoiceInfo.paymentType
                                        ].text
                                      )
                                    : $t("invoice.Notset")
                                }}
                              </span>
                              <el-link
                                v-if="invoiceInfo.payStatus != 1"
                                type="primary"
                                @click="openSetPayment"
                                class="mg-l-15"
                              >
                                <i class="el-icon-edit"></i>
                              </el-link>
                            </div>
                          </div>
                        </div>
                        <!-- 底部按钮 -->
                        <div
                          v-if="
                            invoiceInfo.status != '9' &&
                            invoiceInfo.status != '1'
                          "
                          class="tx-right mg-t-15 d-flex justify-content-end"
                        >
                          <!-- 将当前发票发给客户底部 -->
                          <template v-if="invoiceCnt.notBindCnt > 0">
                            <el-tooltip
                              class="item"
                              effect="dark"
                              placement="bottom"
                            >
                              <div slot="content">
                                {{ $t("invoice.stillInvoice") }}
                                <el-button
                                  @click="changeTabByTip"
                                  type="text"
                                  size="mini"
                                  ><i
                                    style="color: #f56c6c"
                                    class="fa fa-exclamation-triangle"
                                  ></i
                                ></el-button>
                                {{ $t("invoice.stillmissing") }}<br />{{
                                  $t("invoice.invoicedetails")
                                }}
                              </div>
                              <el-button
                                v-if="invoiceInfo.status < 5"
                                :disabled="invoiceInfo.status == '9'"
                                class="with-disabled step-btn-4"
                                size="medium"
                                icon="fa fa-send"
                                style="margin-right: 10px"
                                >{{ $t("invoice.Sendinvoiceto") }}</el-button
                              >
                            </el-tooltip>
                          </template>
                          <!-- 都能发送 -->
                          <!-- <template v-else-if="!invoiceInfo.paymentType">
                            <el-tooltip
                              class="item"
                              effect="dark"
                              placement="bottom"
                            >
                              <div slot="content">
                                {{ $t("invoice.paymentmethod") }}
                              </div>
                              <el-button
                                :disabled="invoiceInfo.status == '9'"
                                class="with-disabled step-btn-4"
                                size="medium"
                                icon="fa fa-send"
                                style="margin-right: 10px"
                                >{{ $t("invoice.Sendinvoiceto") }}</el-button
                              >
                            </el-tooltip>
                          </template> -->
                           
                          <!-- 要支付方式才能发送不要了  -->
                          <!-- v-else-if="
                              (invoiceInfo.paymentType == 1 ||
                              invoiceInfo.paymentType == 2 ||
                              invoiceInfo.paymentType == 3)
                            " -->
                          <template
                            v-else
                          >
                            <el-button
                              :disabled="invoiceInfo.status == '9'"
                              @click="sendInvoice()"
                              class="step-btn-4"
                              size="medium"
                              type="success"
                              icon="fa fa-send"
                              style="margin-right: 10px"
                              >{{ $t("invoice.Sendinvoiceto") }}</el-button
                            >
                          </template>
                          <!-- 确认已收到货款 -->
                          <template v-if="invoiceCnt.notBindCnt == 0">
                            <div class="d-flex btn-wrap">
                              <template
                                v-if="invoiceInfo.payStatus == 2 "
                              >
                              <!-- &&
                                  (invoiceInfo.paymentType == 1 ||
                                    invoiceInfo.paymentType == 2 ||
                                    invoiceInfo.paymentType == 3) -->
                                <el-tooltip
                                  :disabled="!hasAbnormal"
                                  effect="dark"
                                  content="采购数量异常，请处理后再操作"
                                  placement="top-start"
                                >
                                  <el-popover
                                    placement="top"
                                    width="460"
                                    v-model="confirmVisible"
                                    trigger="manual"
                                  >
                                    <div>
                                      <div
                                        style="line-height: 20px"
                                        class="mg-b-5"
                                      >
                                        {{ $t("invoice.Received") }}
                                      </div>
                                      <div
                                        style="line-height: 20px"
                                        class="tx-error mg-b-10"
                                      >
                                        {{ $t("invoice.Afterconfirmation") }}
                                      </div>
                                    </div>
                                    <div style="text-align: right; margin: 0">
                                      <el-button
                                        size="mini"
                                        type="text"
                                        @click="confirmVisible = false"
                                        >{{ $t("invoice.cancel") }}</el-button
                                      >
                                      <el-button
                                        type="primary"
                                        size="mini"
                                        @click="confirmMoneyOnly('1')"
                                        >{{ $t("invoice.confirm") }}</el-button
                                      >
                                    </div>
                                    <a
                                      @click="showPopover"
                                      slot="reference"
                                      class="btn-item btn-item1"
                                      :class="{
                                        ' with-disabled':
                                          invoiceInfo.status == '9' ||
                                          hasAbnormal,
                                      }"
                                      href="javascript:;"
                                    >
                                      <i class="fa fa-dollar"></i>
                                      <span>{{
                                        $t("invoice.Confirmation")
                                      }}</span>
                                    </a>
                                  </el-popover>
                                </el-tooltip>
                              </template>
                              <template
                                v-if="invoiceInfo.status == '9'"
                              >
                                <!-- ||
                                  (invoiceInfo.payStatus == 2 &&
                                    !invoiceInfo.paymentType) -->
                                <el-tooltip
                                  class="item"
                                  effect="dark"
                                  placement="bottom"
                                >
                                  <div slot="content">
                                    {{ $t("invoice.paymentmethod") }}
                                  </div>
                                  <a
                                    class="btn-item btn-item1 with-disabled"
                                    href="javascript:;"
                                  >
                                    <i class="fa fa-dollar"></i>
                                    <span>{{
                                      $t("invoice.Confirmation")
                                    }}</span>
                                  </a>
                                </el-tooltip>
                              </template>
                              <template v-if="invoiceInfo.payStatus == 1">
                                <el-tooltip
                                  class="item"
                                  effect="dark"
                                  placement="bottom"
                                >
                                  <div slot="content">
                                    {{ $t("invoice.haveconfirmed") }}
                                  </div>
                                  <a
                                    class="btn-item btn-item1 with-disabled"
                                    href="javascript:;"
                                  >
                                    <i class="fa fa-dollar"></i>
                                    <span>{{
                                      $t("invoice.Confirmation")
                                    }}</span>
                                  </a>
                                </el-tooltip>

                                <el-tooltip
                                  class="item"
                                  effect="dark"
                                  placement="bottom"
                                >
                                  <div slot="content">
                                    {{ $t("invoice.Clickbutton") }}
                                  </div>
                                  <a
                                    class="btn-item btn-item2 confirmStep1"
                                    href="javascript:;"
                                    @click="confirmMoney"
                                  >
                                    <i class="el-icon-connection"></i>
                                    <span>{{ $t("invoice.ERPsystem") }}</span>
                                  </a>
                                </el-tooltip>
                              </template>
                              <template v-else>
                                <el-tooltip
                                  class="item"
                                  effect="dark"
                                  placement="top"
                                >
                                  <div slot="content">
                                    {{ $t("invoice.receivepayment") }}
                                  </div>
                                  <a
                                    class="
                                      btn-item btn-item2
                                      with-disabled
                                      confirmStep1
                                    "
                                    :class=" hasAbnormal ? 'with-disabled-btn1' : ''"
                                    href="javascript:;"
                                  >
                                     <!-- (invoiceInfo.paymentType != 1 &&
                                        invoiceInfo.paymentType != 2 &&
                                        invoiceInfo.paymentType != 3) || -->
                                    <i class="el-icon-connection"></i>
                                    <span>{{ $t("invoice.ERPsystem") }}</span>
                                  </a>
                                </el-tooltip>
                              </template>
                            </div>
                          </template>
                        </div>
                        <!-- 底部按钮 确认完成报价 -->
                        <div
                          v-if="
                            !Number(invoiceCnt.notBindCnt) &&
                            invoiceInfo.status == '1'
                          "
                          class="tx-right mg-t-15 d-flex justify-content-end"
                        >
                          <el-button
                            type="success"
                            size="medium"
                            style="margin-right: 10px"
                            @click="setPriceConfirm()"
                          >
                            {{ $t("invoice.确认完成报价") }}
                          </el-button>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <div v-show="!noMore" class="page-footer-fixed">
                    <div
                      class="tour-mask"
                      v-show="invoiceConfirmTourShow"
                    ></div>
                    <div style="width: 1270px; margin: 0 auto">
                      <div class="without-hover">
                        <el-row style="margin: 20px 15px 10px -15px">
                          <el-col :span="24">
                            <div class="d-flex justify-content-between">
                              <div class="d-flex">
                                <div
                                  v-show="invoiceInfo.customerRead == 1"
                                  style="
                                    display: flex;
                                    align-items: center;
                                    color: #67c23a;
                                    margin-right: 20px;
                                  "
                                >
                                  <i
                                    class="el-icon-success"
                                    style="font-size: 16px"
                                  ></i>
                                  <div style="margin-left: 5px">
                                    {{
                                      invoiceInfo.timeRead
                                        ? invoiceInfo.timeRead
                                        : "---"
                                    }}
                                    <span
                                      style="
                                        display: block;
                                        white-space: normal;
                                      "
                                      >{{
                                        $t("invoice.Customerconfirmed")
                                      }}</span
                                    >
                                  </div>
                                </div>
                                <div
                                  v-show="invoiceInfo.payStatus == 1"
                                  style="
                                    display: flex;
                                    align-items: center;
                                    color: #67c23a;
                                    margin-right: 20px;
                                  "
                                >
                                  <i
                                    class="el-icon-success"
                                    style="font-size: 16px"
                                  ></i>
                                  <div style="margin-left: 5px">
                                    {{
                                      invoiceInfo.timePaid
                                        ? invoiceInfo.timePaid
                                        : "---"
                                    }}
                                    <span
                                      style="
                                        display: block;
                                        white-space: normal;
                                      "
                                      >{{
                                        $t("invoice.Supplierconfirmed")
                                      }}</span
                                    >
                                  </div>
                                </div>
                                <div
                                  v-show="invoiceInfo.timeApiGet"
                                  style="
                                    display: flex;
                                    align-items: center;
                                    color: #67c23a;
                                    margin-right: 20px;
                                  "
                                >
                                  <i
                                    class="el-icon-success"
                                    style="font-size: 16px"
                                  ></i>
                                  <div style="margin-left: 5px">
                                    {{
                                      invoiceInfo.timeApiGet
                                        ? invoiceInfo.timeApiGet
                                        : "---"
                                    }}
                                    <span
                                      style="
                                        display: block;
                                        white-space: normal;
                                      "
                                      >{{ $t("invoice.ERPdownloaded") }}</span
                                    >
                                  </div>
                                </div>
                                <div
                                  v-show="invoiceInfo.firstDeliverTime"
                                  style="
                                    display: flex;
                                    align-items: center;
                                    color: #67c23a;
                                    margin-right: 20px;
                                  "
                                >
                                  <i
                                    class="el-icon-success"
                                    style="font-size: 16px"
                                  ></i>
                                  <div style="margin-left: 5px">
                                    {{
                                      invoiceInfo.firstDeliverTime
                                        ? invoiceInfo.firstDeliverTime
                                        : "---"
                                    }}
                                    <span
                                      style="
                                        display: block;
                                        white-space: normal;
                                      "
                                      >{{ $t("invoice.Supplierstarts") }}</span
                                    >
                                  </div>
                                </div>
                              </div>
                              <div
                                class="d-flex justify-content-end"
                                style="white-space: nowrap"
                              >
                                <div class="tx-bold">
                                  {{ $t("invoice.Totalamount") }}
                                </div>
                                <div
                                  class="mg-l-5"
                                  style="
                                    font-weight: bold;
                                    font-size: 16px !important;
                                  "
                                >
                                  {{
                                    realAmount > 0
                                      ? $numberToCurrency(realAmount)
                                      : $t("invoice.Notset")
                                  }}
                                </div>
                              </div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="with-hover">
                        <el-row style="margin: 10px 15px 10px -15px">
                          <el-col :span="8">
                            <div class="text item">
                              <!--#f4f4f5-->
                              <div
                                style="background-color: #fff; padding: 20px"
                              >
                                <p
                                  v-show="invoiceInfo.customerRead == 1"
                                  style="color: #67c23a; margin-bottom: 20px"
                                >
                                  <i
                                    class="el-icon-success"
                                    style="font-size: 16px"
                                  ></i>
                                  <span
                                    style="
                                      display: inline-block;
                                      width: 120px;
                                      margin: 0 5px;
                                    "
                                    >{{
                                      $t("invoice.Customerconfirmed")
                                    }} </span
                                  >{{
                                    invoiceInfo.timeRead
                                      ? invoiceInfo.timeRead
                                      : "---"
                                  }}
                                </p>
                                <p
                                  v-show="invoiceInfo.payStatus == 1"
                                  style="color: #67c23a; margin-bottom: 20px"
                                >
                                  <i
                                    class="el-icon-success"
                                    style="font-size: 16px"
                                  ></i>
                                  <span
                                    style="
                                      display: inline-block;
                                      width: 120px;
                                      margin: 0 5px;
                                    "
                                    >{{
                                      $t("invoice.Supplierconfirmed")
                                    }} </span
                                  >{{
                                    invoiceInfo.timePaid
                                      ? invoiceInfo.timePaid
                                      : "---"
                                  }}
                                </p>
                                <p
                                  v-show="invoiceInfo.timeApiGet"
                                  style="color: #67c23a; margin-bottom: 20px"
                                >
                                  <i
                                    class="el-icon-success"
                                    style="font-size: 16px"
                                  ></i>
                                  <span
                                    style="
                                      display: inline-block;
                                      width: 120px;
                                      margin: 0 5px;
                                    "
                                    >{{ $t("invoice.ERPdownloaded") }} </span
                                  >{{
                                    invoiceInfo.timeApiGet
                                      ? invoiceInfo.timeApiGet
                                      : "---"
                                  }}
                                </p>
                                <p
                                  v-show="invoiceInfo.firstDeliverTime"
                                  style="color: #67c23a; margin-bottom: 20px"
                                >
                                  <i
                                    class="el-icon-success"
                                    style="font-size: 16px"
                                  ></i>
                                  <span
                                    style="
                                      display: inline-block;
                                      width: 120px;
                                      margin: 0 5px;
                                    "
                                    >{{ $t("invoice.Supplierstarts") }} </span
                                  >{{
                                    invoiceInfo.firstDeliverTime
                                      ? invoiceInfo.firstDeliverTime
                                      : "---"
                                  }}
                                </p>
                              </div>
                            </div>
                          </el-col>
                          <!-- 浮动底部 -->
                          <el-col :span="16" style="overflow: visible">
                            <div class="grid-content invoice-bottom">
                              <div class="d-flex justify-content-end mg-b-10">
                                <div class="">
                                  {{ $t("invoice.Producttotal") }} (US$) :
                                </div>
                                <div class="mg-l-5 pd-r-15">
                                  {{
                                    realAmount > 0
                                      ? $numberToCurrency(itemAmount)
                                      : $t("invoice.Notset")
                                  }}
                                </div>
                              </div>
                              <div class="d-flex justify-content-end">
                                <div class="">
                                  {{ $t("invoice.Shippingtotal") }} (US$) :
                                </div>
                                <div class="mg-l-5 pd-r-15">
                                  {{
                                    Number(shippingAmount)
                                      ? $numberToCurrency(shippingAmount)
                                      : "0.00"
                                  }}
                                </div>
                              </div>
                              <el-divider
                                style="margin: 20px -20px 20px 20px"
                              ></el-divider>
                              <!-- <div class="d-flex justify-content-end">
                                <div class="">{{$t('invoice.AmountDue')}} (US$) :</div>
                                <div class="mg-l-5 pd-r-15">{{realAmount > 0 ? $numberToCurrency(totalAmount) : $t('invoice.Notset')}}</div>
                              </div> -->
                              <div
                                class="d-flex justify-content-end mg-t-10"
                                v-show="discount > 0"
                              >
                                <div class="">
                                  {{ $t("invoice.Discount") }} (US$) :
                                </div>
                                <div
                                  class="mg-l-5 pd-r-15"
                                  style="color: rgb(103, 194, 58)"
                                >
                                  - {{ $numberToCurrency(discount) }}
                                </div>
                              </div>
                              <div
                                class="
                                  d-flex
                                  justify-content-end
                                  mg-t-10
                                  bold-input
                                "
                              >
                                <div class="tx-bold">
                                  {{ $t("invoice.Totalamount") }}
                                </div>
                                <div
                                  class="mg-l-5 pd-r-15 tx-danger tx-bold"
                                  style="font-size: 16px"
                                >
                                  {{
                                    realAmount && realAmount > 0
                                      ? $numberToCurrency(realAmount)
                                      : $t("invoice.Notset")
                                  }}
                                </div>
                              </div>
                              <div
                                v-if="$store.state.userInfo.canUseWallet"
                                class="d-flex justify-content-end mg-t-10"
                                style="align-items: flex-start"
                              >
                                <div class="">
                                  {{ $t("invoice.Paymentmethod") }} :
                                </div>
                                <div class="mg-l-5 pd-r-15">
                                  <a
                                    v-if="
                                      invoiceInfo.paymentType == 2 &&
                                      invoiceInfo.payUrl
                                    "
                                    :href="invoiceInfo.payUrl"
                                    target="_blank"
                                  >
                                    {{
                                      $t(
                                        $dict.paymentType[
                                          invoiceInfo.paymentType
                                        ].text
                                      )
                                    }}
                                  </a>
                                  <span v-else>
                                    {{
                                      invoiceInfo.paymentType
                                        ? $t(
                                            $dict.paymentType[
                                              invoiceInfo.paymentType
                                            ].text
                                          )
                                        : $t("invoice.Notset")
                                    }}
                                  </span>
                                  <el-link
                                    v-if="invoiceInfo.payStatus != 1"
                                    type="primary"
                                    @click="openSetPayment"
                                    class="mg-l-15"
                                  >
                                    <i class="el-icon-edit"></i>
                                  </el-link>
                                </div>
                              </div>
                              <!-- <div v-if="paymentType == 2" class="mg-t-10 normal-input">
                                <div class="mg-b-10" style="width: 70%;margin-left: auto;">
                                  <p class="tx-right mg-b-5">{{$t('invoice.rateplatform')}}</p>
                                  <el-input size="small" :disabled="invoiceInfo.payStatus == 1" v-model="platformRate" :placeholder="$t('invoice.fillednumbers')" @change="setPayment" @input="platformRate = (platformRate.match(/100|(^\d{0,2}(\.\d{0,2})?)/g)[0]) || null">
                                    <template slot="prepend">{{$t('invoice.Platformrate')}}</template>
                                    <template slot="append">%</template>
                                  </el-input>
                                </div>
                                <el-input size="small" :disabled="invoiceInfo.payStatus == 1" v-model="payUrl" :placeholder="$t('invoice.inputAliExpress')+'https://www.aliexpress.com/item/12345.html'" @change="setPayment"></el-input>
                              </div> -->
                            </div>
                            <div
                              v-if="
                                invoiceInfo.status != '1' &&
                                invoiceInfo.status != '9'
                              "
                              class="
                                tx-right
                                mg-t-15
                                d-flex
                                justify-content-end
                              "
                            >
                              <!-- 浮动底部按钮 -->
                              <template v-if="invoiceCnt.notBindCnt > 0">
                                <div class="tooltip-wrap">
                                  <el-button
                                    :disabled="invoiceInfo.status == '9'"
                                    class="with-disabled"
                                    size="medium"
                                    icon="fa fa-send"
                                    style="margin-right: 10px"
                                    >{{
                                      $t("invoice.Sendinvoiceto")
                                    }}</el-button
                                  >
                                  <span class="tooltiptext">
                                    {{ $t("invoice.stillInvoice") }}
                                    <el-button
                                      @click="changeTabByTip"
                                      type="text"
                                      size="mini"
                                      ><i
                                        style="color: #f56c6c"
                                        class="fa fa-exclamation-triangle"
                                      ></i
                                    ></el-button>
                                    {{ $t("invoice.stillmissing") }}<br />{{
                                      $t("invoice.invoicedetails")
                                    }}
                                  </span>
                                </div>
                              </template>
                              <!-- <template v-else-if="!invoiceInfo.paymentType">
                                <div class="tooltip-wrap">
                                  <el-button
                                    :disabled="invoiceInfo.status == '9'"
                                    class="with-disabled"
                                    size="medium"
                                    icon="fa fa-send"
                                    style="margin-right: 10px"
                                    >{{
                                      $t("invoice.Sendinvoiceto")
                                    }}</el-button
                                  >
                                  <span class="tooltiptext">{{
                                    $t("invoice.paymentmethod")
                                  }}</span>
                                </div>
                              </template> -->
                               <!-- v-else-if="
                                  invoiceInfo.paymentType == 1 ||
                                  invoiceInfo.paymentType == 2 ||
                                  invoiceInfo.paymentType == 3
                                " -->
                              <template v-else>
                                <el-button
                                  :disabled="invoiceInfo.status == '9'"
                                  @click="sendInvoice()"
                                  size="medium"
                                  type="success"
                                  icon="fa fa-send"
                                  style="margin-right: 10px"
                                  >{{ $t("invoice.Sendinvoiceto") }}</el-button
                                >
                              </template>

                              <template v-if="invoiceCnt.notBindCnt == 0">
                                <div class="d-flex btn-wrap">
                                  <template
                                    v-if="
                                      invoiceInfo.payStatus == 2"
                                  >
                                    <!-- &&
                                      (invoiceInfo.paymentType == 1 ||
                                        invoiceInfo.paymentType == 2 ||
                                        invoiceInfo.paymentType == 3)
                                    " -->
                                    <el-tooltip
                                      :disabled="!hasAbnormal"
                                      effect="dark"
                                      content="采购数量异常，请处理后再操作"
                                      placement="top-start"
                                    >
                                      <el-popover
                                        @hide="hidePopover"
                                        placement="top"
                                        width="460"
                                        v-model="confirmVisible2"
                                        trigger="manual"
                                      >
                                        <div>
                                          <div
                                            style="line-height: 20px"
                                            class="mg-b-5"
                                          >
                                            {{ $t("invoice.Received") }}
                                          </div>
                                          <div
                                            style="line-height: 20px"
                                            class="tx-error mg-b-10"
                                          >
                                            {{
                                              $t("invoice.Afterconfirmation")
                                            }}
                                          </div>
                                        </div>
                                        <div
                                          style="text-align: right; margin: 0"
                                        >
                                          <el-button
                                            size="mini"
                                            type="text"
                                            @click="confirmVisible2 = false"
                                            >{{
                                              $t("invoice.cancel")
                                            }}</el-button
                                          >
                                          <el-button
                                            type="primary"
                                            size="mini"
                                            @click="confirmMoneyOnly('2')"
                                            >{{
                                              $t("invoice.confirm")
                                            }}</el-button
                                          >
                                        </div>
                                        <a
                                          @click="showPopover2"
                                          slot="reference"
                                          class="btn-item btn-item1"
                                          :class="{
                                            ' with-disabled':
                                              invoiceInfo.status == '9' ||
                                              hasAbnormal,
                                          }"
                                          href="javascript:;"
                                        >
                                          <i class="fa fa-dollar"></i>
                                          <span>{{
                                            $t("invoice.Confirmation")
                                          }}</span>
                                        </a>
                                      </el-popover>
                                    </el-tooltip>
                                  </template>
                                  <!-- <template
                                    v-if="
                                      invoiceInfo.payStatus == 2 &&
                                      !invoiceInfo.paymentType
                                    "
                                  >
                                    <div class="tooltip-wrap">
                                      <a
                                        class="btn-item btn-item1 with-disabled"
                                        href="javascript:;"
                                      >
                                        <i class="fa fa-dollar"></i>
                                        <span>{{
                                          $t("invoice.Confirmation")
                                        }}</span>
                                      </a>
                                      <span class="tooltiptext">{{
                                        $t("invoice.paymentmethod")
                                      }}</span>
                                    </div>
                                  </template> -->

                                  <template v-if="invoiceInfo.payStatus == 1">
                                    <el-tooltip
                                      class="item"
                                      effect="dark"
                                      placement="bottom"
                                    >
                                      <div slot="content">
                                        {{ $t("invoice.haveconfirmed") }}
                                      </div>
                                      <a
                                        class="btn-item btn-item1 with-disabled"
                                        href="javascript:;"
                                      >
                                        <i class="fa fa-dollar"></i>
                                        <span>{{
                                          $t("invoice.Confirmation")
                                        }}</span>
                                      </a>
                                    </el-tooltip>
                                    <el-tooltip
                                      class="item"
                                      effect="dark"
                                      placement="bottom"
                                    >
                                      <div slot="content">
                                        {{ $t("invoice.Clickbutton") }}
                                      </div>
                                      <a
                                        class="btn-item btn-item2 confirmStep"
                                        href="javascript:;"
                                        @click="confirmMoney"
                                      >
                                        <i class="el-icon-connection"></i>
                                        <span>{{
                                          $t("invoice.ERPsystem")
                                        }}</span>
                                      </a>
                                    </el-tooltip>
                                  </template>
                                  <template v-else>
                                    <div class="tooltip-wrap">
                                      <!-- (invoiceInfo.paymentType != 1 &&
                                            invoiceInfo.paymentType != 2 &&
                                            invoiceInfo.paymentType != 3) || -->
                                      <a
                                        class="btn-item btn-item2 with-disabled"
                                        :class=" hasAbnormal ? 'with-disabled-btn1' : ''"
                                        href="javascript:;"
                                      >
                                        <i class="el-icon-connection"></i>
                                        <span>{{
                                          $t("invoice.ERPsystem")
                                        }}</span>
                                      </a>
                                      <span class="tooltiptext">{{
                                        $t("invoice.receivepayment")
                                      }}</span>
                                    </div>
                                  </template>
                                </div>
                              </template>
                              <template v-if="false">
                                <template
                                  v-if="
                                    invoiceInfo.payStatus == 2 &&
                                    (invoiceInfo.paymentType == 1 ||
                                      invoiceInfo.paymentType == 2 ||
                                      invoiceInfo.paymentType == 3)
                                  "
                                >
                                  <el-popover
                                    @hide="hidePopover"
                                    placement="top"
                                    width="460"
                                    v-model="confirmVisible2"
                                  >
                                    <div>
                                      <div
                                        style="line-height: 20px"
                                        class="mg-b-5"
                                      >
                                        {{ $t("invoice.Received") }}
                                      </div>
                                      <div
                                        style="line-height: 20px"
                                        class="tx-error mg-b-10"
                                      >
                                        {{ $t("invoice.Afterconfirmation") }}
                                      </div>
                                    </div>
                                    <div style="text-align: right; margin: 0">
                                      <el-button
                                        size="mini"
                                        type="text"
                                        @click="confirmVisible2 = false"
                                        >{{ $t("invoice.cancel") }}</el-button
                                      >
                                      <el-button
                                        type="primary"
                                        size="mini"
                                        @click="confirmMoneyOnly('2')"
                                        >{{ $t("invoice.confirm") }}</el-button
                                      >
                                    </div>
                                    <el-button
                                      @click="showPopover2"
                                      slot="reference"
                                      size="medium"
                                      type="primary"
                                      icon="fa fa-dollar"
                                      >{{
                                        $t("invoice.Confirmation")
                                      }}</el-button
                                    >
                                  </el-popover>
                                </template>
                                <template
                                  v-if="
                                    invoiceInfo.payStatus == 2 &&
                                    !invoiceInfo.paymentType
                                  "
                                >
                                  <div class="tooltip-wrap">
                                    <el-button
                                      class="with-disabled"
                                      size="medium"
                                      type="primary"
                                      icon="fa fa-dollar"
                                      >{{
                                        $t("invoice.Confirmation")
                                      }}</el-button
                                    >
                                    <span class="tooltiptext">{{
                                      $t("invoice.paymentmethod")
                                    }}</span>
                                  </div>
                                </template>

                                <template v-if="invoiceInfo.payStatus == 1">
                                  <el-button
                                    class="confirmStep"
                                    style="margin-left: 10px"
                                    @click="confirmMoney"
                                    size="medium"
                                    type="primary"
                                    icon="el-icon-connection"
                                    >{{ $t("invoice.ERPsystem") }}</el-button
                                  >
                                </template>
                                <template v-else>
                                  <div class="tooltip-wrap">
                                    <el-button
                                      style="margin-left: 10px"
                                      class="with-disabled"
                                      size="medium"
                                      type="primary"
                                      icon="el-icon-connection"
                                      >{{ $t("invoice.ERPsystem") }}</el-button
                                    >
                                    <span class="tooltiptext">{{
                                      $t("invoice.receivepayment")
                                    }}</span>
                                  </div>
                                </template>
                              </template>
                            </div>
                            <!--浮动 底部按钮 确认完成报价 -->
                            <div
                              v-if="
                                !Number(invoiceCnt.notBindCnt) &&
                                invoiceInfo.status == '1'
                              "
                              class="
                                tx-right
                                mg-t-15
                                d-flex
                                justify-content-end
                              "
                            >
                              <el-button
                                type="success"
                                size="medium"
                                style="margin-right: 10px"
                                @click="setPriceConfirm()"
                              >
                                {{ $t("invoice.确认完成报价") }}
                              </el-button>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                  </div>
                </template>
              </template>
            </el-card>
            <div
              v-show="showDownloadInvoice"
              class="download-invoice"
              style="position: relative; left: 9999px"
            >
              <el-card shadow="always">
                <el-row
                  type="flex"
                  style="margin-top: 25px; align-items: flex-start"
                >
                  <el-col :span="12">
                    <div
                      class="grid-content invoice-header-logo"
                      v-loading="pageLoading"
                    ></div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content invoice-header-info">
                      <div class="wv-heading-title">INVOICE</div>
                      <template>
                        <div class="wv-text-strong">
                          {{
                            invoiceInfo.vendorName
                              ? invoiceInfo.vendorName
                              : "---"
                          }}
                        </div>
                      </template>
                    </div>
                  </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row type="flex" align="middle">
                  <el-col :span="12">
                    <div
                      class="
                        grid-content
                        invoice-metadata-custome
                        tx-left
                        pos-relative
                      "
                    >
                      <div>
                        BILL To
                        <br />
                        <template>
                          <span
                            style="cursor: pointer"
                            class="wv-text-strong"
                            >{{
                              invoiceInfo.customerName
                                ? invoiceInfo.customerName
                                : "---"
                            }}</span
                          >
                        </template>
                      </div>
                      <div class="change-customer"></div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="invoice-metadata-info mg-b-20">
                      <div class="text-right">
                        <p>Invoice Number :</p>
                        <p class="mg-y-10">Invoice Date :</p>
                        <p class="text-bg">Amount Due (US$) :</p>
                      </div>
                      <div class="text-left">
                        <p>
                          # {{ invoiceInfo.code ? invoiceInfo.code : "---" }}
                        </p>
                        <p class="mg-y-10">
                          {{
                            invoiceInfo.timeCreated
                              ? invoiceInfo.timeCreated
                              : "---"
                          }}
                        </p>
                        <p
                          class="wv-text-strong text-bg"
                          style="padding-left: 0"
                        >
                          $
                          {{
                            realAmount ? $numberToCurrency(realAmount) : "0.00"
                          }}
                        </p>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <template>
                  <div class="table-wrap">
                    <el-table
                      :header-cell-style="getRowClass"
                      :cell-style="cellStyle"
                      class="table-only"
                    >
                      <el-table-column label="Items"> </el-table-column>
                      <el-table-column label="Quantity" width="160">
                      </el-table-column>
                      <el-table-column label="Unit Cost(US$)" width="120">
                      </el-table-column>
                      <el-table-column label="Subtotal(US$)" width="120">
                      </el-table-column>
                    </el-table>
                    <el-table
                      :row-class-name="tableRowClassName"
                      :header-cell-style="getRowClass"
                      :cell-style="cellStyle"
                      :data="invoiceData3"
                      stripe
                      border
                      class="table-with-body"
                    >
                      <el-table-column label="Items">
                        <template slot-scope="scope">
                          <div class="">
                            <div style="max-width: 100%; text-align: left">
                              <div class="tx-600">
                                {{ scope.row.name }}
                              </div>
                              <div
                                class="d-flex no-wrap justify-content-between"
                                v-if="tabActive != 2"
                              >
                                <el-popover
                                  class="d-flex"
                                  popper-class="customer-popover"
                                  placement="bottom"
                                  :title="`Shopify Order ${scope.row.codeName}`"
                                  width="500"
                                  trigger="hover"
                                >
                                  <!--<span slot="reference" style="cursor: pointer;">{{scope.row.codeName}}<i class="el-icon-caret-bottom el-icon--right"></i></span>-->
                                  <div slot="reference" style="cursor: pointer">
                                    <span style="margin-right: 10px"
                                      >{{ scope.row.codeName
                                      }}<i
                                        class="
                                          el-icon-caret-bottom
                                          el-icon--right
                                        "
                                      ></i
                                    ></span>
                                    <span
                                      class="tx-ellipsis1"
                                      style="display: inline-block"
                                      v-if="
                                        scope.row.shippingJson &&
                                        scope.row.shippingJson.name
                                      "
                                      >To {{ scope.row.shippingJson.name }}
                                    </span>
                                    <span
                                      style="
                                        display: inline-block;
                                        max-width: 100px;
                                        text-overflow: ellipsis;
                                        overflow: hidden;
                                      "
                                      v-if="
                                        scope.row.shippingJson &&
                                        scope.row.shippingJson.country
                                      "
                                    >
                                      ({{
                                        scope.row.shippingJson.country
                                      }})</span
                                    >
                                  </div>
                                  <div class="mg-y-15 mg-t-20">
                                    <div class="d-flex">
                                      <div class="d-flex" style="width: 90%">
                                        <div
                                          style="
                                            width: 120px;
                                            text-align: right;
                                            color: #999;
                                          "
                                          class=""
                                        >
                                          Order Date :
                                        </div>
                                        <div class="mg-l-5 pd-r-15">
                                          {{ scope.row.timeCreated }}
                                        </div>
                                      </div>
                                    </div>
                                    <div class="d-flex">
                                      <div class="d-flex" style="width: 90%">
                                        <div
                                          style="
                                            width: 120px;
                                            text-align: right;
                                            color: #999;
                                          "
                                          class=""
                                        >
                                          Customer :
                                        </div>
                                        <div class="mg-l-5 pd-r-15">
                                          {{
                                            scope.row.shippingJson &&
                                            scope.row.shippingJson.name
                                              ? scope.row.shippingJson.name
                                              : "---"
                                          }}
                                        </div>
                                      </div>
                                    </div>
                                    <div class="d-flex">
                                      <div class="d-flex" style="width: 90%">
                                        <div
                                          style="
                                            width: 120px;
                                            text-align: right;
                                            color: #999;
                                          "
                                          class=""
                                        >
                                          Shipping Address :
                                        </div>
                                        <div
                                          class="mg-l-5 pd-r-15"
                                          style="max-width: 75%"
                                        >
                                          {{
                                            scope.row.shippingJson &&
                                            scope.row.shippingJson.zip
                                              ? scope.row.shippingJson.zip
                                              : "---"
                                          }}
                                          {{
                                            scope.row.shippingJson &&
                                            scope.row.shippingJson.address1
                                              ? scope.row.shippingJson.address1
                                              : "---"
                                          }}
                                          {{
                                            scope.row.shippingJson &&
                                            scope.row.shippingJson.city
                                              ? scope.row.shippingJson.city
                                              : "---"
                                          }}
                                          {{
                                            scope.row.shippingJson &&
                                            scope.row.shippingJson.province
                                              ? scope.row.shippingJson.province
                                              : "---"
                                          }}
                                        </div>
                                      </div>
                                    </div>
                                    <div class="d-flex">
                                      <div class="d-flex" style="width: 90%">
                                        <div
                                          style="
                                            width: 120px;
                                            text-align: right;
                                            color: #999;
                                          "
                                          class=""
                                        ></div>
                                        <div class="mg-l-5 pd-r-15">
                                          {{
                                            scope.row.shippingJson &&
                                            scope.row.shippingJson.country
                                              ? scope.row.shippingJson.country
                                              : "---"
                                          }}
                                        </div>
                                      </div>
                                    </div>
                                    <div class="d-flex">
                                      <div class="d-flex" style="width: 90%">
                                        <div
                                          style="
                                            width: 120px;
                                            text-align: right;
                                            color: #999;
                                          "
                                          class=""
                                        >
                                          Email：
                                        </div>
                                        <div class="mg-l-5 pd-r-15">
                                          {{ scope.row.email }}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </el-popover>

                                <div class="no-wrap">
                                  <div
                                    v-if="scope.row.trackNumber"
                                    class="d-flex"
                                  >
                                    <!--<div class="mg-r-5">
																		{{scope.row.trackNumber}}
																	</div>-->
                                    <div>
                                      <el-tooltip
                                        v-if="
                                          scope.row.trackCompany &&
                                          scope.row.realCompany
                                        "
                                        class="item"
                                        effect="dark"
                                        placement="top"
                                      >
                                        <div slot="content">
                                          <p style="margin-bottom: 5px">
                                            {{ scope.row.trackCompany }}({{
                                              scope.row.realCompany
                                            }})
                                          </p>
                                          {{ scope.row.trackNumber }}
                                        </div>
                                        <i class="fa fa-truck"></i>
                                      </el-tooltip>
                                      <el-tooltip
                                        v-else-if="scope.row.trackCompany"
                                        class="item"
                                        effect="dark"
                                        placement="top"
                                      >
                                        <div slot="content">
                                          <p style="margin-bottom: 5px">
                                            {{ scope.row.trackCompany }}
                                          </p>
                                          {{ scope.row.trackNumber }}
                                        </div>
                                        <i class="fa fa-truck"></i>
                                      </el-tooltip>
                                      <el-tooltip
                                        v-else
                                        class="item"
                                        effect="dark"
                                        placement="top"
                                      >
                                        <div slot="content">
                                          <p style="margin-bottom: 5px">
                                            {{ scope.row.realCompany }}
                                          </p>
                                          {{ scope.row.trackNumber }}
                                        </div>
                                        <i class="fa fa-truck"></i>
                                      </el-tooltip>
                                    </div>
                                    <el-tooltip
                                      v-if="scope.row.syncStatus == 2"
                                      class="item"
                                      effect="dark"
                                      placement="right"
                                    >
                                      <div slot="content">
                                        {{ $t("invoice.deliveredgoods") }}
                                        <br />{{ $t("invoice.Reason") }}
                                        {{
                                          invoiceInfo.hasAuth != 1
                                            ? $t("invoice.notauthorized")
                                            : scope.row.syncContent
                                        }}
                                      </div>

                                      <i class="invoice-icon-tongbu1"></i>
                                    </el-tooltip>
                                    <el-tooltip
                                      v-else
                                      class="item"
                                      effect="dark"
                                      :content="$t('invoice.hasbeensync')"
                                      placement="right"
                                    >
                                      <!--<i class="iconfont icon-tongbu1 mg-l-5" style="color: #67C23A;font-size: 20px;"></i>-->
                                      <i class="invoice-icon-tongbu2"></i>
                                    </el-tooltip>
                                  </div>
                                  <div v-else-if="scope.row.fulfillStatus == 1">
                                    <el-tooltip
                                      class="item"
                                      effect="dark"
                                      :content="$t('invoice.hasnot')"
                                      placement="right"
                                    >
                                      <el-alert
                                        :title="$t('invoice.Notshipped')"
                                        type="warning"
                                        :closable="false"
                                      >
                                      </el-alert>
                                    </el-tooltip>
                                  </div>
                                  <div v-else>
                                    <el-tooltip
                                      class="item"
                                      effect="dark"
                                      :content="
                                        $t('invoice.wontReason') +
                                        scope.row.stopReason
                                      "
                                      placement="right"
                                    >
                                      <el-alert
                                        :title="$t('invoice.wontdeliver')"
                                        type="error"
                                        :closable="false"
                                      >
                                      </el-alert>
                                    </el-tooltip>
                                  </div>
                                  <!--<el-tooltip class="item" effect="dark" :content="$t('invoice.Abnormalreasons') + scope.row.abnormalReason" placement="right">
																		<el-alert effect="dark" v-if="scope.row.isAbnormal == 1" style="margin-left: 5px;" :title="$t('invoice.Abnormal')" type="error" :closable="false">
																		</el-alert>
																</el-tooltip>-->
                                </div>
                              </div>
                            </div>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="qty" label="Quantity" width="160">
                        <template slot-scope="scope">
                          <template v-if="tabActive != 2">
                            <el-input-number
                              size="small"
                              :min="1"
                              v-model="scope.row.quantity"
                              @change="handleChange(scope.row, $event)"
                            ></el-input-number>
                          </template>
                          <div v-if="tabActive == 2">
                            {{ scope.row.quantity }}
                          </div>
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="
                              $t('invoice.Abnormalreasons') +
                              scope.row.abnormalReason
                            "
                            placement="right"
                          >
                            <span
                              v-if="scope.row.isAbnormal == 1"
                              class="tx-danger"
                              style="margin-top: 10px; display: inline-block"
                              ><i class="el-icon-info"></i
                              >{{ $t("invoice.Abnormal") }}</span
                            >
                          </el-tooltip>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="price"
                        label="Unit Cost(US$)"
                        width="120"
                      >
                        <template slot-scope="scope">
                          <div v-if="tabActive != 2">
                            <div>
                              {{ scope.row.price }}
                            </div>
                          </div>
                          <div v-if="tabActive == 2">
                            {{ scope.row.price }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="Subtotal(US$)" width="120">
                        <template slot-scope="scope">
                          {{ $numberToCurrency(scope.row.amount) }}
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div
                    style="min-height: 50px; z-index: 0"
                    class="page-footer mg-t-30 mg-b-10"
                  >
                    <el-row>
                      <el-col :span="20" :offset="4">
                        <div class="grid-content invoice-bottom">
                          <div class="d-flex justify-content-end mg-b-10">
                            <div class="">Items total (US$) :</div>
                            <div class="mg-l-5 pd-r-15">
                              {{ $numberToCurrency(itemAmount) }}
                            </div>
                          </div>
                          <div class="d-flex justify-content-end">
                            <div class="">Shipping total (US$) :</div>
                            <div class="mg-l-5 pd-r-15">
                              {{ $numberToCurrency(shippingAmount) }}
                            </div>
                          </div>
                          <el-divider></el-divider>
                          <div
                            class="d-flex justify-content-end"
                            v-if="discount && discount > 0"
                          >
                            <div class="">Subtotal (US$) :</div>
                            <div class="mg-l-5 pd-r-15">
                              {{ $numberToCurrency(totalAmount) }}
                            </div>
                          </div>
                          <div
                            class="d-flex justify-content-end mg-t-10"
                            v-if="discount && discount > 0"
                          >
                            <div class="">Discount (US$) :</div>
                            <div
                              class="mg-l-5 pd-r-15"
                              style="color: rgb(103, 194, 58)"
                            >
                              - {{ $numberToCurrency(discount) }}
                            </div>
                          </div>
                          <div
                            class="
                              d-flex
                              justify-content-end
                              mg-t-10
                              bold-input
                            "
                          >
                            <div class="tx-bold">Amount Due (US$) :</div>
                            <div
                              class="mg-l-5 pd-r-15"
                              style="font-size: 16px; font-weight: bold"
                            >
                              {{ $numberToCurrency(realAmount) }}
                            </div>
                          </div>
                          <div
                            class="d-flex justify-content-end mg-t-10"
                            style="align-items: flex-start"
                          >
                            <div class="">Payment :</div>
                            <div class="mg-l-5 pd-r-15">
                              {{
                                paymentType == 1
                                  ? "Transfer by bank or PayPal"
                                  : "AliExpress"
                              }}
                            </div>
                          </div>
                        </div>
                        <template
                          v-if="
                            invoiceInfo.paymentType == 1 ||
                            invoiceInfo.paymentType == 2 ||
                            invoiceInfo.paymentType == 3
                          "
                        >
                          <div
                            v-if="invoiceInfo.payStatus == 1"
                            class="tx-right mg-t-15"
                          >
                            <span>
                              <el-alert
                                style="display: inline"
                                title="The vender has confirmed the payment."
                                type="success"
                                :closable="false"
                              >
                              </el-alert>
                            </span>
                          </div>
                        </template>

                        <!--<el-button size="small" plain @click="drawer = true" type="primary" icon="fa fa-bar-chart">统计</el-button>-->
                      </el-col>
                    </el-row>
                  </div>
                  <div class="d-flex" style="align-items: flex-end">
                    <div style="position: relative">
                      <img :src="invoiceInfo.qrcodeBase64" width="200" />
                      <img
                        src="images/weixin.png"
                        width="30px"
                        style="
                          position: absolute;
                          left: 50%;
                          top: 50%;
                          margin-left: -15px;
                          margin-top: -15px;
                        "
                      />
                      <!--<i class="fa fa-weixin" style="font-size: 28px;position: absolute;left: 50%;top: 50%;margin-left: -16px;margin-top: -14px;color: rgb(75,192,42);">
							</i>-->
                    </div>
                    <div>
                      <span
                        >You can check the invoice by scan this QR Code or visit
                        this URL by your web browser:</span
                      >
                      <el-link
                        :underline="false"
                        style="text-decoration: underline; margin: 0 3px"
                        >{{ invoiceInfo.url }}</el-link
                      >
                    </div>
                  </div>
                </template>
              </el-card>
            </div>
          </el-main>
          <!--<el-button size="mini" plain @click="drawer = true" type="primary" icon="fa fa-bar-chart">统计</el-button>-->
          <el-aside width="50px" style="position: relative; left: 50px">
            <template>
              <el-tooltip
                v-if="invoiceInfo.status != '9'"
                class="item"
                effect="dark"
                :content="$t('invoice.exportImport')"
                placement="right"
              >
                <el-button
                  size="medium"
                  circle
                  @click="opendrawer('3')"
                  type="primary"
                  style="
                    position: fixed;
                    bottom: 260px;
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    padding: 0;
                    z-index: 1;
                  "
                >
                  <i
                    class="iconfont icon-xiazai"
                    style="margin-right: 0; font-size: 22px"
                  ></i>
                </el-button>
              </el-tooltip>
            </template>

            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('invoice.Orderstatistics')"
              placement="right"
            >
              <el-button
                size="medium"
                circle
                @click="opendrawer('1')"
                type="primary"
                style="
                  margin-left: 0;
                  position: fixed;
                  bottom: 200px;
                  width: 40px;
                  height: 40px;
                  line-height: 40px;
                  text-align: center;
                  padding: 0;
                  z-index: 1;
                "
              >
                <i class="fa fa-bar-chart" style="margin-right: 0"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('invoice.Helpcenter')"
              placement="right"
            >
              <el-button
                size="medium"
                circle
                type="primary"
                @click="opendrawer('2')"
                style="
                  margin-left: 0;
                  position: fixed;
                  bottom: 140px;
                  width: 40px;
                  height: 40px;
                  line-height: 40px;
                  text-align: center;
                  padding: 0;
                  z-index: 1;
                "
              >
                <i
                  class="fa fa-question-circle-o"
                  style="margin-right: 0; font-size: 20px"
                ></i>
              </el-button>
            </el-tooltip>
            <el-backtop
              target=".el-scrollbar__wrap"
              style="right: auto; bottom: 80px; z-index: 1"
            >
            </el-backtop>
          </el-aside>
        </el-container>
      </div>
      <el-container
        v-show="(tabActive != 5 && noMore) || tabActive == 5"
        id="messageContainer"
      >
        <el-main>
          <div class="d-flex justify-content-between mg-b-20 pd-x-20">
            <span class="tx-16 tx-600">{{ $t("invoice.Timeline") }}</span>
            <el-checkbox v-model="checked">{{
              $t("invoice.Showmessage")
            }}</el-checkbox>
          </div>
          <el-divider></el-divider>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-timeline v-if="currentPageDataLog.length">
                <template v-for="operate in currentPageDataLog">
                  <el-timeline-item>
                    {{ operate.date }}
                  </el-timeline-item>
                  <el-timeline-item
                    v-for="(activity, index) in operate.listInfo"
                    color="#5c6ac4"
                  >
                    <div
                      class="d-flex justify-content-between"
                      style="align-items: flex-start"
                    >
                      <span style="max-width: 515px; word-break: break-all">{{
                        activity.content
                      }}</span>
                      <span
                        style="
                          white-space: nowrap;
                          margin-left: 10px;
                          color: #999;
                        "
                        >{{ activity.datetime }}</span
                      >
                    </div>
                  </el-timeline-item>
                </template>
              </el-timeline>
              <p v-else class="tx-center">{{ $t("invoice.Nodata") }}</p>
            </el-col>
            <el-col :span="12">
              <div
                v-if="invoiceInfo.status != '9'"
                class="mg-b-15"
                style="
                  margin-left: 40px;
                  position: relative;
                  background: #fff;
                  border: 1px solid #ddd;
                  padding: 10px;
                "
              >
                <ul class="figure-list">
                  <li v-for="(file, index) in fileList" :key="index">
                    <figure
                      :style="{
                        backgroundImage: 'url(' + file.url + ')',
                        backgroundSize: 'cover',
                      }"
                    >
                      <a href="#"></a>
                      <a href="#" class="btn" @click="removeMsgImg(index)"
                        ><i class="el-icon-close"></i
                      ></a>
                    </figure>
                  </li>
                </ul>
                <!--v-model="msgContent" -->
                <textarea
                  :placeholder="$t('invoice.Pleasemessage')"
                  class="form-control textarea-control"
                  autosize
                  resize="none"
                  data-emojiable="true"
                ></textarea>

                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                  "
                >
                  <el-upload
                    class="upload-demo"
                    action=""
                    accept="image/jpeg,image/jpg,image/png"
                    :show-file-list="false"
                    :http-request="uploadSectionFile2"
                  >
                    <i
                      class="fa fa-paperclip"
                      style="font-size: 20px; margin: 0 10px"
                    ></i>
                  </el-upload>
                  <el-button slot="append" @click="addMessage" size="small">{{
                    $t("ticket.send")
                  }}</el-button>
                </div>
              </div>
              <div v-show="checked">
                <el-timeline v-if="currentmessages.length">
                  <template v-for="msg in currentmessages">
                    <el-timeline-item>
                      {{ msg.date }}
                    </el-timeline-item>
                    <template v-for="(activity, index) in msg.listInfo">
                      <el-timeline-item
                        color="#5c6ac4"
                        :timestamp="activity.datetime"
                        placement="top"
                        v-if="activity.type == 1"
                      >
                        <el-card>
                          <div class="d-flex timeline-customer">
                            <el-avatar :size="40">
                              {{ activity.cname }}
                            </el-avatar>
                            <div class="mg-l-10">
                              <h4>{{ activity.customerName }}</h4>
                              <p
                                class="mg-t-5"
                                style="word-break: break-all"
                                v-html="activity.content"
                              ></p>
                              <p class="mg-t-10" v-if="activity.imgJson">
                                <img
                                  v-for="img in activity.imgJson"
                                  :src="img"
                                  width="60"
                                  class="mg-l-10"
                                />
                              </p>
                            </div>
                          </div>
                        </el-card>
                      </el-timeline-item>
                      <el-timeline-item
                        color="#5c6ac4"
                        :timestamp="activity.datetime"
                        placement="top"
                        v-if="activity.type == 2"
                      >
                        <el-card :body-style="{ background: '#9eea6a' }">
                          <div
                            class="
                              d-flex
                              justify-content-end
                              tx-right
                              timeline-self
                            "
                          >
                            <div class="mg-r-10">
                              <h4>{{ activity.vendorName }}</h4>
                              <p
                                class="mg-t-5"
                                style="word-break: break-all"
                                v-html="activity.content"
                              ></p>
                              <p class="mg-t-10" v-if="activity.imgJson">
                                <img
                                  v-for="img in activity.imgJson"
                                  :src="img"
                                  width="60"
                                  class="mg-l-10"
                                />
                              </p>
                            </div>
                            <el-avatar :size="40">
                              {{ activity.vname }}
                            </el-avatar>
                          </div>
                        </el-card>
                      </el-timeline-item>
                    </template>
                  </template>
                </el-timeline>
                <p v-else class="tx-center">{{ $t("invoice.Nodata") }}</p>
              </div>
            </el-col>
          </el-row>
        </el-main>
        <el-aside width="50px"></el-aside>
      </el-container>
      <el-dialog
        custom-class="addCustomer"
        :title="$t('invoice.newcustomer')"
        :visible.sync="addCustomerOpen"
        width="40%"
      >
        <el-divider></el-divider>
        <el-form
          :rules="formNewcustomerRules"
          ref="formNewcustomer"
          :model="formNewcustomer"
          :label-position="'right'"
          label-width="100px"
        >
          <el-form-item :label="$t('mycustomer.customersName')" prop="name">
            <el-input
              v-model="formNewcustomer.name"
              :placeholder="$t('invoice.Pleasename')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('importdata.cusEmail')" prop="email">
            <el-input
              v-model="formNewcustomer.email"
              :placeholder="$t('invoice.PleaseEmail')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('mycustomer.remarks')" prop="remark">
            <el-input
              v-model="formNewcustomer.remark"
              :placeholder="$t('invoice.Pleaseremarks')"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addCustomerOpen = false">{{
            $t("invoice.cancel")
          }}</el-button>
          <el-button
            type="primary"
            @click="submitAddcustomer('formNewcustomer')"
            >{{ $t("invoice.confirm") }}</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        custom-class="editCustomer"
        :title="$t('invoice.modifiedCustomer')"
        :visible.sync="editCustomerOpen"
        width="40%"
      >
        <el-divider></el-divider>
        <el-form
          :rules="formEditcustomerRules"
          :model="formEditcustomer"
          ref="formEditcustomer"
          :label-position="'right'"
          label-width="100px"
        >
          <el-form-item :label="$t('mycustomer.customersName')" prop="name">
            <el-input
              v-model="formEditcustomer.name"
              :placeholder="$t('invoice.Pleasename')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('importdata.cusEmail')" prop="email">
            <el-input
              v-model="formEditcustomer.email"
              :placeholder="$t('invoice.PleaseEmail')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('mycustomer.remarks')" prop="remark">
            <el-input
              v-model="formEditcustomer.remark"
              :placeholder="$t('invoice.Pleaseremarks')"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="editCustomerOpen = false">{{
            $t("invoice.cancel")
          }}</el-button>
          <el-button
            size="small"
            type="primary"
            @click="submitEditcustomer('formEditcustomer')"
            >{{ $t("invoice.confirm") }}</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        custom-class="editCompany"
        :title="$t('invoice.modifiedCompany')"
        :visible.sync="editCompanyInfoOpen"
        width="40%"
      >
        <el-divider></el-divider>
        <el-form
          :rules="formEditCompanyRules"
          ref="formEditCompany"
          :model="formEditCompany"
          :label-position="'right'"
          label-width="150px"
        >
          <el-form-item :label="$t('invoice.companyName')" prop="name">
            <el-input
              v-model="formEditCompany.name"
              :placeholder="$t('invoice.fillcompany')"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="editCompanyInfoOpen = false">{{
            $t("invoice.cancel")
          }}</el-button>
          <el-button
            size="small"
            type="primary"
            @click="submitEditCompany('formEditCompany')"
            >{{ $t("invoice.confirm") }}</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        :title="$t('invoice.shippedMark')"
        :visible.sync="dialogMarkShipped.isShow"
        width="700px"
      >
        <el-row v-if="dialogMarkShipped.item" :gutter="20" class="pd-x-20">
          <el-col :span="24" style="color: #303133">
            {{ dialogMarkShipped.item.name }}
          </el-col>
          <el-col :span="24">
            <el-form label-width="160px">
              <el-form-item :label="$t('invoice.Supplier')">
                <span style="color: #303133">{{
                  invoiceInfo.vendorName ? invoiceInfo.vendorName : "---"
                }}</span>
              </el-form-item>
              <el-form-item :label="$t('invoice.Logisticsnumber')" required>
                <el-input
                  v-model="dialogMarkShipped.trackNumber"
                  :placeholder="$t('invoice.Logisticsnumber')"
                ></el-input>
              </el-form-item>
              <el-form-item :label="$t('invoice.Logisticscompany')" required>
                <!--:style="{width:(dialogMarkShipped.trackKey == 99?'50%':'100%')}"-->
                <el-select
                  style="width: 100%"
                  v-model="dialogMarkShipped.trackKey"
                  :placeholder="$t('invoice.Logisticscompany')"
                >
                  <el-option
                    v-for="item in dialogMarkShipped.shopifyCompany"
                    :key="item.key"
                    :label="item.name"
                    :value="item.key"
                  >
                  </el-option>
                </el-select>
                <el-input
                  style="margin: 10px 0"
                  v-if="dialogMarkShipped.trackKey == 99"
                  v-model="dialogMarkShipped.trackCompany"
                  :placeholder="$t('invoice.Logisticscompany')"
                ></el-input>
              </el-form-item>
              <el-form-item
                v-if="dialogMarkShipped.trackKey == 99"
                :label="$t('invoice.Trackinglinks')"
              >
                <el-input
                  v-model="dialogMarkShipped.trackUrl"
                  :placeholder="$t('invoice.Trackinglinks')"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer d-flex justify-content-between">
          <el-button @click="dialogMarkShipped.isShow = false">{{
            $t("invoice.cancel")
          }}</el-button>
          <el-button
            type="primary"
            :loading="dialogMarkShipped.loading"
            @click="saveMarkShipped"
            >{{ $t("invoice.shippedMark") }}</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        @open="openSkype"
        custom-class="sendInvoice"
        :title="$t('invoice.Sendinvoiceto')"
        :visible.sync="sendInvoiceOpen"
        width="50%"
      >
        <!--<el-divider></el-divider>-->
        <template>
          <div style="position: relative; z-index: 1">
            <div style="position: absolute; right: 30px; top: 15px">
              <el-switch v-model="showItemPrice" @change="changeShowItemPrice">
              </el-switch>
              {{ $t("invoice.Showsupply") }}
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
                {{ $t("invoice.Sharethrough") }}</span
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
                    {{ $t("invoice.SetshareTitle") }}
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
                    {{ $t("invoice.Setsharecontent") }}
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
                    {{ $t("invoice.Sharemethod") }}
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
                          <img :src="invoiceInfo.qrcodeP" width="130" />
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
                          <i class="fa fa-weixin"></i>
                          {{ $t("myinvoice.share") }}
                        </a>
                      </el-tooltip>
                    </div>
                    <a
                      class="share-weixin share-download"
                      href="javascript:;"
                      @click="downloadInvoice"
                    >
                      <i class="fa fa-download"></i>
                      {{ $t("invoice.Downloadinvoice") }}
                    </a>
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
              $t("invoice.cancel")
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
        custom-class="confirmMoney"
        :title="$t('invoice.processorders')"
        :visible.sync="confirmMoneyOpen"
        width="40%"
      >
        <el-dialog
          :title="$t('ticket.submitTicket')"
          :visible.sync="DialogEditComment.visible"
          width="760px"
          @closed="$refs.uploadFile.clearFiles()"
          append-to-body
        >
          <el-divider></el-divider>
          <div>
            <el-form ref="CommentForm">
              <el-form-item :label="$t('ticket.problemsOrRequirements')">
                <el-input
                  type="textarea"
                  v-model="DialogEditComment.contents"
                ></el-input>
              </el-form-item>
              <el-form-item label="">
                <div
                  style="font-size: 16px; font-weight: bold; margin: 20px 0 0"
                >
                  {{ $t("ticket.uploadImageAttachment") }}
                </div>
              </el-form-item>
              <el-form-item label="">
                <el-upload
                  ref="uploadFile"
                  :on-change="handleChangeImg"
                  :before-remove="handleRemoveImg"
                  action=""
                  :auto-upload="false"
                  accept="image/gif,image/jpeg,image/jpg,image/png"
                  class="upload-file"
                >
                  <el-button
                    ref="uploadBtn"
                    size="small"
                    type="primary"
                    :loading="DialogEditComment.uploadLoading"
                    >{{ $t("ticket.browse") }}</el-button
                  >
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
          <el-divider></el-divider>
          <div slot="footer" class="dialog-footer d-flex justify-content-end">
            <div class="mg-r-15">
              <el-button
                size="small"
                type="primary"
                :loading="DialogEditComment.loading"
                @click="saveComment"
                >{{ $t("ticket.submitTicket") }}</el-button
              >
            </div>
            <div>
              <el-button
                size="small"
                @click="DialogEditComment.visible = false"
                >{{ $t("invoice.cancel") }}</el-button
              >
            </div>
          </div>
        </el-dialog>

        <el-dialog
          :title="$t('invoice.usertoken')"
          :visible.sync="secretKeyOpen"
          width="50%"
          :close-on-click-modal="false"
          append-to-body
        >
          <el-divider></el-divider>
          <div style="margin: 20px; color: #303133">
            <p>
              {{ $t("invoice.software") }}
            </p>
          </div>
          <div
            style="
              margin: 0 20px;
              padding: 15px;
              background-color: #fafafa;
              border: 1px solid #eaeefb;
              border-radius: 4px;
              color: #303133;
            "
          >
            <p>
              {{ $t("invoice.pastetoken") }}
            </p>
            <!--<img style="margin: 15px 0;" width="100%" src="images/secretKey.png"/>-->
            <div
              class="d-flex"
              style="justify-content: space-around; margin: 15px 0"
            >
              <div style="width: 48%; margin-right: 2%">
                <p class="mg-y-10">{{ $t("invoice.Picture1") }}</p>
                <img
                  width="100%"
                  src="images/secretKey1.png"
                  style="border: 1px solid #ddd"
                />
              </div>
              <div style="width: 48%; margin-left: 2%">
                <p class="mg-y-10">{{ $t("invoice.Picture2") }}</p>
                <img
                  width="100%"
                  src="images/secretKey2.jpg"
                  style="border: 1px solid #ddd"
                />
              </div>
            </div>
            <p style="margin-top: 10px">
              {{ $t("invoice.present") }}
              <el-link
                target="_blank"
                type="primary"
                :underline="false"
                href="//www.mabangerp.com/"
                >马帮ERP</el-link
              >
              {{ $t("invoice.soon") }}
            </p>
          </div>
          <div style="margin: 20px; color: rgb(153, 153, 153)">
            <p>
              {{ $t("invoice.sametime") }}
              <el-link
                type="primary"
                :underline="false"
                @click="openAddComment"
                >{{ $t("invoice.contact") }}</el-link
              >。
            </p>
          </div>
          <el-divider></el-divider>
          <div slot="footer" class="dialog-footer">
            <el-button
              size="small"
              type="primary"
              @click="secretKeyOpen = false"
              >{{ $t("importdata.gotIt") }}</el-button
            >
          </div>
        </el-dialog>
        <el-tabs
          v-model="activeConfirm"
          type="card"
          style="margin-left: 20px; margin-top: 10px"
        >
          <el-tab-pane name="confirmErp">
            <span slot="label"> {{ $t("invoice.authorizederp") }}</span>
            <div>
              <div class="mg-y-20">
                <span
                  style="
                    margin: 0 10px 0 26px;
                    display: inline-block;
                    width: 177px;
                    text-align: right;
                  "
                  >{{ $t("invoice.tokenerp") }}</span
                >
                <span>
                  {{
                    userInfo && userInfo.secretKey ? userInfo.secretKey : "---"
                  }}
                </span>
                <el-button
                  v-if="userInfo && userInfo.secretKey"
                  size="mini"
                  type="text"
                >
                  <i
                    class="el-icon-document-copy"
                    v-clipboard:copy="userInfo.secretKey"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  ></i>
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  style="margin-left: 30px"
                  @click="openSecretKey"
                >
                  {{ $t("invoice.usertoken") }}
                </el-button>
              </div>
              <div style="display: flex; align-items: center" class="mg-y-20">
                <span style="margin: 0 10px 0 26px">{{
                  $t("invoice.storename")
                }}</span>
                <el-autocomplete
                  :disabled="!!invoiceInfo.timeApiGet"
                  size="medium"
                  class="inline-input"
                  v-model="shopName"
                  :fetch-suggestions="querySearch"
                  :placeholder="$t('invoice.entershopname')"
                  @select="handleSelect"
                ></el-autocomplete>
              </div>
              <div class="mg-y-20" v-if="invoiceInfo.timeApiGet">
                <span style="margin: 0 10px 0 26px; opacity: 0">{{
                  $t("invoice.storename")
                }}</span>
                <span class="tx-error">
                  <span style="margin: 0 5px"
                    >{{ $t("invoice.ERPdownloaded") }} </span
                  >{{ invoiceInfo.timeApiGet ? invoiceInfo.timeApiGet : "---" }}
                </span>
              </div>
              <div class="mg-y-20">
                <span style="margin: 0 10px 0 26px; opacity: 0">{{
                  $t("invoice.storename")
                }}</span>
                <el-button
                  :disabled="!!invoiceInfo.timeApiGet"
                  size="small"
                  icon="fa fa-save"
                  type="primary"
                  @click="confirmMoneyFn()"
                  >{{ $t("invoice.savesettings") }}</el-button
                >
              </div>
            </div>
          </el-tab-pane>
          
          <el-tab-pane name="confirmExcel">
            <span slot="label"> {{ $t("invoice.exportedExcel") }}</span>
            <div class="mg-y-20">
              <p
                style="margin-left: 50px"
                v-html="
                  $t('invoice.qualifiedorders', {
                    num: Number(invoiceCnt.orderCnt),
                  })
                "
              ></p>
            </div>
            <div style="margin-left: 50px" class="mg-y-20">
              <el-button
                size="small"
                icon="iconfont icon-excel3"
                type="success"
                @click="saveCustomExportOnly('1')"
                >{{ $t("invoice.Exportexcel") }}</el-button
              >
              <el-button
                size="small"
                icon="iconfont icon-csv11"
                type="success"
                @click="saveCustomExportOnly('2')"
                >{{ $t("invoice.Exportcsv") }}</el-button
              >
              <el-button
                size="small"
                icon="fa fa-cog"
                plain
                type="primary"
                @click="setExportOnly()"
                >{{ $t("invoice.exportfields2") }}</el-button
              >
            </div>
            <el-dialog
              width="80%"
              :title="$t('invoice.exportfields2')"
              :visible.sync="innerVisible"
              append-to-body
            >
              <div class="modal-export">
                <el-divider></el-divider>
                <div class="border-bottom-1 mg-b-15 pd-b-15">
                  <h6
                    class="mg-b-15"
                    style="border-left: 4px solid #3f4eae; padding-left: 10px"
                  >
                    {{ $t("invoice.exportFields")
                    }}<span class="mg-l-5">({{ $t("invoice.dragging") }})</span>
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
                        v-for="(
                          title, index
                        ) in modalCustomExport.selectedTitles"
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
                        $t("invoice.selectPlease")
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
                        v-for="(
                          title, index
                        ) in modalCustomExport.unselectedTitles"
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
                      @click="customWrapState()"
                      >{{
                        showCustom
                          ? $t("invoice.fieldsHide")
                          : $t("invoice.fieldsShow")
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
                            >[{{ title.orName }}]
                            {{ $t("myinvoice.showAs") }}</label
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
                  $t("invoice.cancel")
                }}</el-button>
                <el-button
                  type="primary"
                  size="small"
                  @click="saveCustomExportSettingOnly"
                  >{{ $t("myinvoice.saveSetting") }}</el-button
                >
              </div>
            </el-dialog>
          </el-tab-pane>
        </el-tabs>

        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="confirmMoneyOpen = false">{{
            $t("invoice.cancel")
          }}</el-button>
        </div>
      </el-dialog>

      <el-dialog
        v-loading.fullscreen.lock="setLotPriceDialog.loading"
        :element-loading-text="
          setLotPriceDialog.step == 4 ? '批量改价已提交请稍候 ' : ''
        "
        :title="$t('invoice.Batchset2')"
        :visible.sync="setLotPriceDialog.isShow"
        :width="'800px'"
        :close-on-click-modal="false"
        append-to-body
      >
        <el-divider></el-divider>
        <template v-if="setLotPriceDialog.step == 1">
          <el-row>
            <el-col :offset="4" :span="7">
              <div class="tx-center set-price" @click="setLotPriceStep(1)">
                <div class="logo-wrap"></div>
                <p>马帮ERP授权</p>
              </div>
            </el-col>
            <el-col :offset="2" :span="7">
              <div
                class="tx-center set-price other"
                @click="setLotPriceStep(2)"
              >
                <div class="logo-wrap">其他</div>
                <p>其他ERP授权</p>
              </div>
            </el-col>
          </el-row>
        </template>
        <template v-if="setLotPriceDialog.step == 2">
          <el-form
            ref="form"
            :model="setLotPriceDialog"
            label-width="160px"
            size="medium"
          >
            <el-form-item label="当前授权ERP：">
              <span v-if="userInfo.source == 2">马帮ERP2.0</span>
              <span v-if="userInfo.source == 3">马帮ERP3.0</span>
              <a
                v-if="userInfo.source == 3"
                href="javascript:;"
                class="mg-l-20"
                @click="unbind()"
                >解除绑定</a
              >
            </el-form-item>
            <el-form-item class="mg-t-15" label="供货价和运费：">
              <el-radio-group
                v-model="setLotPriceDialog.price"
                @change="changePriceType"
              >
                <el-radio label="1">
                  供货单价=（商品成本价+物流成本）+单价利润，每单运费设置为0
                </el-radio>
                <el-radio v-if="userInfo.source == 3" class="mg-t-10" label="2"
                  >供货单价=商品成本价+商品目标利润，总运费=物流成本+物流目标利润</el-radio
                >
              </el-radio-group>
            </el-form-item>
            <el-form-item
              v-if="userInfo.source == 3"
              class="mg-t-15"
              label="每件商品处理费(US$)："
            >
              <el-input-number
                :controls="false"
                :precision="2"
                v-model="setLotPriceDialog.addPrice"
                style="margin-right: 10px; width: 100px"
              ></el-input-number>
              <el-tooltip class="item" effect="dark" placement="right">
                <template slot="content">
                  <p style="margin-bottom: 10px">每件商品处理费</p>
                  <p>
                    在已计算得到的供货单价上额外增加处理费，如设置<br />
                    每件商品处理费为US$ 1, 某个商品采购数量3件，则<br />
                    在供货单价上额外增加US$ 3
                  </p>
                </template>
                <i class="el-icon-question"></i>
              </el-tooltip>
            </el-form-item>
            <el-form-item
              v-if="userInfo.source == 3"
              class="mg-t-15"
              label="运费规则："
            >
              <el-select
                style="width: 300px"
                filterable
                v-model="setLotPriceDialog.ruleId"
                placeholder="请选择运费规则"
              >
                <el-option label="请选择运费规则" value=""></el-option>
                <el-option
                  v-for="rule in setLotPriceDialog.erpRules"
                  :label="rule.name"
                  :value="rule.shippingFeeRuleId"
                  :key="rule.shippingFeeRuleId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="mg-t-15" label="设置商品：">
              <el-radio-group
                v-model="setLotPriceDialog.onlyNone"
                v-if="!setLotPriceDialog.sku"
              >
                <el-radio label="1" :disabled="setLotPriceDialog.price == 2"
                  >仅设置 [未填写供货价] 商品</el-radio
                >
                <el-radio class="mg-t-10 d-block" label="2"
                  >当前采购订单 [全部] 商品</el-radio
                >
                <el-radio class="mg-t-10 d-block" label="3"
                  >选择指定商品(<a @click="setDesignatedGood">{{
                    DesignatedGoodDialog.data.length
                  }}</a
                  >)</el-radio
                >
                <!-- 以后优化 -->
                <!-- <el-radio label="3">选择指定商品 <el-link @click="openSelectProducts">(0)</el-link></el-radio> -->
              </el-radio-group>
              <div v-else>{{ setLotPriceDialog.sku }}</div>
            </el-form-item>
            <el-form-item
              v-if="userInfo.source == 2"
              class="mg-t-15"
              label="物流渠道："
            >
              <div style="display: flex">
                <el-select
                  style="width: 300px"
                  v-model="setLotPriceDialog.logType"
                  placeholder="请选择物流渠道"
                >
                  <el-option
                    label="全部订单使用同一个物流渠道计算"
                    value="1"
                  ></el-option>
                  <el-option
                    label="按订单的国家选择物流渠道计算"
                    value="2"
                  ></el-option>
                </el-select>

                <div v-if="setLotPriceDialog.logType == 1">
                  <el-input
                    placeholder="请填写物流渠道名称"
                    maxlength="50"
                    v-model="setLotPriceDialog.shipTypeStr"
                    style="width: 200px; margin-left: 10px"
                  ></el-input>
                </div>
              </div>
              <div v-show="setLotPriceDialog.logType == 2" class="countrylist">
                <!--<div v-for="k in 100" :key="k" style="margin-bottom: 5px;">总共采购商品数：<b>{{totalCnt}}</b> 个</div>-->
                <div
                  class="d-flex mg-t-10 countrylist-item"
                  v-for="cnt in setLotPriceDialog.cntArr"
                  :key="cnt.countryCode"
                >
                  <div class="countrylist-name">
                    <el-tooltip :content="cnt.country" placement="top">
                      <span>{{ cnt.country }} :</span>
                    </el-tooltip>
                    <!--<span style=" color: #606266;white-space: nowrap;">{{cnt.num}}</span>-->
                  </div>
                  <div class="countrylist-input">
                    <el-input
                      placeholder="不填即该国订单不计算"
                      maxlength="50"
                      v-model="cnt.shipTypeStr"
                    ></el-input>
                  </div>
                </div>
              </div>
            </el-form-item>
            <el-form-item class="mg-t-15" label="当前采购单目标利润：">
              <div>
                <el-input
                  v-model="setLotPriceDialog.numbers"
                  style="width: 200px"
                ></el-input>
                %
              </div>
              <p class="tx-gray-600">如果希望采购单利润20%，请在输入框填写20</p>
            </el-form-item>
          </el-form>
        </template>
        <template v-if="setLotPriceDialog.step == 3">
          <div style="margin: 20px 50px">
            <div class="mg-b-20 mg-t-20">
              设置成功：<span class="tx-success">{{
                setLotPriceDialog.results.success &&
                setLotPriceDialog.results.success.cnt >= 0
                  ? setLotPriceDialog.results.success.cnt
                  : "---"
              }}</span>
              个
              <!--<el-link class="mg-l-10" type="primary" @click="setLotPriceDialog.successDetail = !setLotPriceDialog.successDetail">{{setLotPriceDialog.successDetail ? '查看' : '折叠'}}成功详情</el-link>-->
            </div>
            <div v-show="!setLotPriceDialog.successDetail">
              <p
                class="mg-b-10"
                v-for="(item, index) in setLotPriceDialog.results.success
                  .detail"
              >
                {{ item.sku }}
              </p>
            </div>
            <div class="mg-b-20">
              设置失败：<span class="tx-danger">{{
                setLotPriceDialog.results.fail &&
                setLotPriceDialog.results.fail.cnt >= 0
                  ? setLotPriceDialog.results.fail.cnt
                  : "---"
              }}</span>
              个
              <el-link
                v-if="setLotPriceDialog.results.fail.cnt > 0"
                class="mg-l-10"
                type="primary"
                @click="
                  setLotPriceDialog.failDetail = !setLotPriceDialog.failDetail
                "
                >{{
                  setLotPriceDialog.failDetail ? "查看" : "折叠"
                }}失败详情</el-link
              >
            </div>
            <div v-show="!setLotPriceDialog.failDetail">
              <p
                class="mg-b-10"
                v-for="(item, index) in setLotPriceDialog.results.fail.detail"
              >
                {{ item.country }} - {{ item.sku }} - {{ item.logisticsName }}：
                {{ item.message }}
              </p>
            </div>
          </div>
        </template>
        <template v-if="setLotPriceDialog.step == 4">
          <div style="margin: 20px 50px">
            <i class="el-icon-loading"></i>
            {{ parseInt(setLotPriceDialog.loadingCnt * 100) }}%
            批量改价已提交，请稍候
          </div>
        </template>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer">
          <el-button
            v-if="setLotPriceDialog.step == 2"
            type="primary"
            size="small"
            @click="saveSetLotPrice"
            >批量设置</el-button
          >
          <el-button size="small" @click="setLotPriceDialog.isShow = false"
            >关闭</el-button
          >
        </div>
      </el-dialog>

      <el-dialog
        v-loading="DesignatedGoodDialog.loading"
        title="选择指定商品"
        :visible.sync="DesignatedGoodDialog.isShow"
        :width="'890px'"
        :close-on-click-modal="false"
        append-to-body
      >
        <div style="padding: 20px">
          <el-transfer
            v-model="DesignatedGoodDialog.data"
            @change="DesignatedChange"
            :filterable="true"
            :titles="['商品列表', '指定商品']"
            :button-texts="['取消', '指定']"
            :data="transferData"
          >
            <span slot-scope="{ option }" class="flex-center">
              <div>
                <el-image
                  style="width: 40px; height: 40px"
                  :src="option.imgUrl"
                  alt=""
                >
                  <div slot="error" class="image-slot">
                    <i
                      class="el-icon-picture-outline"
                      style="font-size: 20px"
                    ></i>
                  </div>
                </el-image>
              </div>
              <div class="ml-10">
                <div>
                  {{ option.name }}
                </div>
                <div>SKU: {{ option.sku }}</div>
              </div>
            </span>
          </el-transfer>
        </div>
      </el-dialog>

      <!-- 其他ERP添加弹框 start  -->
      <el-dialog
        title="请输入您希望对接的ERP名称"
        :visible.sync="setOtherERPDialog.isShow"
        :width="'800px'"
        :close-on-click-modal="false"
        append-to-body
        @closed="$refs.uploadFile.clearFiles()"
      >
        <el-divider></el-divider>
        <el-form label-position="top">
          <el-form-item label="">
            <el-input
              type="textarea"
              v-model="setOtherERPDialog.contents"
              placeholder="请输入您希望对接的ERP名称"
            ></el-input>
          </el-form-item>
          <el-row
            :gutter="15"
            class="d-flex align-items-center mg-b-10"
            style="margin-top: 22px"
          >
            <el-col :span="5" style="min-width: 155px">
              <span style="font-size: 16px; font-weight: bold">{{
                $t("ticket.uploadImageAttachment")
              }}</span></el-col
            >
            <el-upload
              ref="uploadFile"
              :on-change="handleChangeOtherERPDialog"
              :before-remove="handleRemoveOtherERPDialog"
              action=""
              :auto-upload="false"
              accept="image/gif,image/jpeg,image/jpg,image/png"
              class="upload-file"
            >
              <el-button
                ref="uploadBtn"
                size="small"
                type="primary"
                :loading="DialogEditComment.uploadLoading"
                >{{ $t("ticket.browse") }}</el-button
              >
            </el-upload>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer d-flex justify-content-end">
          <div class="mg-r-15">
            <el-button
              size="small"
              type="primary"
              @click="commitOtherERP"
              :loading="setOtherERPDialog.loading"
              >提交工单</el-button
            >
          </div>
          <div>
            <el-button size="small" @click="setOtherERPDialog.isShow = false"
              >取消</el-button
            >
          </div>
        </div>
      </el-dialog>
      <!-- 其他ERP添加弹框 end  -->
      <!-- :title="drawerTitle"-->
      <el-drawer
        :size="'40%'"
        :destroy-on-close="true"
        :visible.sync="drawer"
        custom-class="drawer-outline"
        :wrapperClosable="false"
      >
        <div slot="title" class="clearfix">
          <h2 style="padding: 0; font-size: 24px">{{ drawerTitle }}</h2>
        </div>
        <el-divider style="margin-top: 0; margin-bottom: 0"></el-divider>
        <div v-loading="uploadLoading">
          <template v-if="drawertype == 1">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>{{ $t("invoice.informationBasic") }}</span>
              </div>
              <div style="margin-top: -30px">
                <el-form label-position="right" label-width="200px">
                  <el-form-item :label="$t('invoice.validTotal')">
                    {{ drawerinfo.orderCnt }}{{ $t("invoice.num") }}
                  </el-form-item>
                  <el-form-item :label="$t('invoice.productsOrder')">
                    {{ drawerinfo.skuCnt }}{{ $t("invoice.kind") }}
                  </el-form-item>
                  <el-form-item :label="$t('invoice.productTotal')">
                    {{ drawerinfo.totalCnt }}{{ $t("invoice.pro") }}
                  </el-form-item>
                  <el-form-item :label="$t('invoice.amountTotal')">
                    US$ {{ $numberToCurrency(drawerinfo.totalAmount) }}
                  </el-form-item>
                </el-form>
              </div>
            </el-card>
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>{{ $t("invoice.statisticsDelivery") }}</span>
              </div>
              <div style="margin-top: -30px">
                <el-form label-position="right" label-width="250px">
                  <el-form-item :label="$t('invoice.deliveredProducts')">
                    <span class="tx-success">{{
                      drawerinfo.deliveredCnt
                    }}</span>
                    {{ $t("invoice.Sync") }}
                    <span class="tx-success">{{ drawerinfo.syncCnt }}</span
                    >{{ $t("invoice.pro") }}
                  </el-form-item>
                  <el-form-item :label="$t('invoice.amount')">
                    US$
                    <span class="tx-success">{{
                      $numberToCurrency(drawerinfo.deliveredAmount)
                    }}</span>
                  </el-form-item>
                  <el-form-item :label="$t('invoice.notQuantity')">
                    <span class="tx-warning">{{
                      drawerinfo.undeliveredCnt
                    }}</span
                    >{{ $t("invoice.pro") }}
                  </el-form-item>
                  <el-form-item :label="$t('invoice.rate')">
                    <span class="tx-success"
                      >{{ drawerinfo.deliverRate }}%</span
                    >
                  </el-form-item>
                  <el-form-item :label="$t('invoice.wontQuantity')">
                    <span class="tx-error">{{
                      drawerinfo.notDeliveredCnt
                    }}</span
                    >{{ $t("invoice.pro") }}
                  </el-form-item>
                  <el-form-item :label="$t('invoice.wontAmount')">
                    US$
                    <span class="tx-error">{{
                      Number(drawerinfo.notDeliveredSku)
                        ? $numberToCurrency(drawerinfo.notDeliveredSku)
                        : "0.00"
                    }}</span>
                  </el-form-item>
                  <el-form-item :label="$t('invoice.notAmount')">
                    US$
                    <span class="tx-warning">{{
                      Number(drawerinfo.undeliveredAmount)
                        ? $numberToCurrency(drawerinfo.undeliveredAmount)
                        : "0.00"
                    }}</span>
                  </el-form-item>
                </el-form>
              </div>
            </el-card>
          </template>
          <template v-if="drawertype == 2">
            <el-card
              v-if="invoiceInfo.payStatus == 2"
              class="box-card"
              shadow="never"
            >
              <el-steps direction="vertical" :active="1">
                <el-step title="STEP 1">
                  <template slot="description">
                    <p class="mg-b-10">{{ $t("invoice.skuSet") }}</p>
                    <img
                      src="images/step1.png"
                      width="100%"
                      class="mg-b-20"
                      style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
                    />
                  </template>
                </el-step>
                <el-step title="STEP 2">
                  <template slot="description">
                    <p class="mg-b-10">{{ $t("invoice.priceSet") }}</p>
                    <img
                      src="images/step2.png"
                      width="100%"
                      class="mg-b-20"
                      style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
                    />
                  </template>
                </el-step>
                <el-step title="STEP 3">
                  <template slot="description">
                    <p class="mg-b-10">{{ $t("invoice.paymentSet") }}</p>
                    <img
                      src="images/step3.png"
                      width="100%"
                      class="mg-b-20"
                      style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
                    />
                  </template>
                </el-step>
                <el-step title="STEP 4">
                  <template slot="description">
                    <p class="mg-b-10">{{ $t("invoice.invoiceSend") }}</p>
                    <img
                      src="images/step4.png"
                      width="100%"
                      class="mg-b-20"
                      style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
                    />
                  </template>
                </el-step>
              </el-steps>
            </el-card>
            <el-card
              v-if="invoiceInfo.payStatus == 1"
              class="box-card"
              shadow="never"
            >
              <el-steps direction="vertical" :active="1">
                <el-step title="STEP 1">
                  <template slot="description">
                    <p class="mg-b-10">{{ $t("invoice.ordersDownload") }}</p>
                    <img
                      src="images/step1-1.png"
                      width="100%"
                      class="mg-b-20"
                      style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
                    />
                  </template>
                </el-step>
                <el-step title="STEP 2">
                  <template slot="description">
                    <p class="mg-b-10">
                      {{ $t("invoice.logisticsinformation") }}
                    </p>
                    <img
                      src="images/step1-2.png"
                      width="100%"
                      class="mg-b-20"
                      style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
                    />
                  </template>
                </el-step>
                <el-step title="STEP 3">
                  <template slot="description">
                    <p class="mg-b-10">{{ $t("invoice.customerInform") }}</p>
                    <img
                      src="images/url2-1.png"
                      class="mg-b-20"
                      style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
                    />
                  </template>
                </el-step>
              </el-steps>
            </el-card>
          </template>
          <template v-if="drawertype == 3">
            <el-tabs
              type="border-card"
              v-model="activeName"
              @tab-click="handleClickTab"
            >
              <el-tab-pane label="导出采购订单" name="first">
                <el-card
                  class="box-card"
                  shadow="never"
                  style="margin-bottom: 30px"
                >
                  <div>
                    <div class="border-bottom-1 mg-b-15 pd-b-15">
                      <h6
                        class="mg-b-15"
                        style="
                          border-left: 4px solid #3f4eae;
                          padding-left: 10px;
                        "
                      >
                        {{ $t("invoice.exportFields")
                        }}<span class="mg-l-5"
                          >({{ $t("invoice.dragging") }})</span
                        >
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
                            v-for="(
                              title, index
                            ) in modalCustomExport.selectedTitles"
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
                            $t("invoice.selectPlease")
                          }}</span>
                        </div>
                      </div>
                    </div>
                    <el-divider></el-divider>
                    <div class="border-bottom-1 mg-b-15 pd-b-15">
                      <h6
                        class="mg-b-15"
                        style="
                          border-left: 4px solid #3f4eae;
                          padding-left: 10px;
                        "
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
                            v-for="(
                              title, index
                            ) in modalCustomExport.unselectedTitles"
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
                        style="
                          border-left: 4px solid #3f4eae;
                          padding-left: 10px;
                        "
                      >
                        {{ $t("myinvoice.customField") }}
                        <el-tooltip
                          class="item"
                          effect="dark"
                          :content="$t('invoice.quantity0')"
                          placement="right"
                        >
                          <i class="fa fa-question-circle-o mg-l-5"></i>
                        </el-tooltip>
                        <a
                          style="color: #5c6ac4"
                          class="mg-l-20"
                          href="javascript:;"
                          @click="customWrapState()"
                          >{{
                            showCustom
                              ? $t("invoice.fieldsHide")
                              : $t("invoice.fieldsShow")
                          }}</a
                        >
                      </h6>
                      <div
                        class="row custom-wrap"
                        :class="{ hide: !showCustom }"
                      >
                        <el-row :gutter="20" style="margin: 0">
                          <el-col
                            :span="20"
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
                                >[{{ title.orName }}]
                                {{ $t("myinvoice.showAs") }}</label
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
                    <div class="text-left">
                      <el-button
                        type="primary"
                        size="small"
                        @click="saveCustomExportSetting"
                        >{{ $t("myinvoice.saveSetting") }}</el-button
                      >
                      <template v-if="invoiceInfo.payStatus != 1">
                        <el-tooltip class="item" effect="dark" placement="top">
                          <div slot="content">
                            {{ $t("invoice.proceeding") }}
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
                            {{ $t("invoice.exportExcel") }}
                          </el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" placement="top">
                          <div slot="content">
                            {{ $t("invoice.proceeding") }}
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
                            {{ $t("invoice.exportcsv") }}
                          </el-button>
                        </el-tooltip>
                      </template>
                      <template v-else>
                        <el-button
                          type="success"
                          size="small"
                          @click="saveCustomExport('1')"
                          >{{ $t("invoice.exportExcel") }}</el-button
                        >
                        <el-button
                          type="success"
                          size="small"
                          @click="saveCustomExport('2')"
                          >{{ $t("invoice.exportcsv") }}</el-button
                        >
                      </template>
                    </div>
                  </div>
                </el-card>
              </el-tab-pane>
              <el-tab-pane
                :label="$t('invoice.shippinginformation')"
                name="second"
              >
                <!--style="box-shadow: 0 -2px 12px 0 rgba(0,0,0,.1);"-->
                <el-card class="box-card" shadow="never">
                  <div class="draw-alert mg-b-20">
                    <el-alert type="warning" :closable="false">
                      <div
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: space-between;
                        "
                      >
                        <span>{{ $t("invoice.templateprovided") }}</span>
                        <el-button type="text" @click="downloadFile">{{
                          $t("invoice.template")
                        }}</el-button>
                      </div>
                    </el-alert>
                  </div>
                  <div style="margin-top: 40px">
                    <el-upload
                      class="upload-demo"
                      ref="upload"
                      action=""
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      :auto-upload="false"
                      :file-list="uploadfileList"
                      :on-change="handleUploadChange"
                    >
                      <el-button slot="trigger" size="small" type="primary">{{
                        $t("invoice.fileSelect")
                      }}</el-button>
                      <template v-if="invoiceInfo.payStatus != 1">
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
                </el-card>
              </el-tab-pane>
              <el-tab-pane
                v-if="
                  invoiceInfo.status != 3 &&
                  invoiceInfo.status != 4 &&
                  invoiceInfo.status != 5 &&
                  invoiceInfo.status != 6 &&
                  invoiceInfo.status != 9
                "
                :label="$t('invoice.ExportShopify')"
                name="third"
              >
                <el-card
                  class="box-card"
                  shadow="never"
                  style="margin-bottom: 30px"
                >
                  <div>
                    <el-button
                      style="margin-left: 10px"
                      size="small"
                      type="success"
                      @click="saveCustomExportShopify"
                      >{{ $t("invoice.ExportShopify") }}</el-button
                    >
                  </div>
                </el-card>
              </el-tab-pane>
              <el-tab-pane
                v-if="
                  invoiceInfo.status != 3 &&
                  invoiceInfo.status != 4 &&
                  invoiceInfo.status != 5 &&
                  invoiceInfo.status != 6 &&
                  invoiceInfo.status != 9
                "
                :label="$t('invoice.supplyinformation')"
                name="fourth"
              >
                <!--style="box-shadow: 0 -2px 12px 0 rgba(0,0,0,.1);"-->
                <el-card class="box-card" shadow="never">
                  <div class="draw-alert mg-b-20">
                    <el-alert type="warning" :closable="false">
                      <div
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: space-between;
                        "
                      >
                        <span>{{ $t("invoice.templateprovided") }}</span>
                        <el-button type="text" @click="downloadFile">{{
                          $t("invoice.template")
                        }}</el-button>
                      </div>
                    </el-alert>
                  </div>
                  <div style="margin-top: 40px">
                    <template>
                      <!--<a :href="`/#/import-data?rid=${invoiceInfo.relationshipId}&id=${invoiceInfo.id}`">导入Shopify订单</a>-->
                      <el-button
                        style="margin-left: 10px"
                        size="small"
                        type="success"
                        @click="submitUpload"
                        >{{ $t("invoice.supplyinformation") }}</el-button
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
                  </div>
                </el-card>
              </el-tab-pane>
            </el-tabs>
          </template>
          <div
            class="d-flex justify-content-center mg-t-20"
            style="padding: 30px; margin-bottom: 100px"
          >
            <el-divider></el-divider>
            <el-button type="primary" @click="drawer = false">{{
              drawertype == 3 ? $t("invoice.cancel") : $t("importdata.gotIt")
            }}</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
    <v-tour
      name="invoiceTour"
      :steps="steps"
      :callbacks="myCallbacks"
      :options="myOptions"
    >
      <template slot-scope="tour">
        <transition name="fade">
          <template v-for="(step, index) of tour.steps">
            <v-step
              v-if="tour.currentStep === index"
              :key="index + 'tourStep'"
              :step="step"
              :previous-step="tour.previousStep"
              :next-step="tour.nextStep"
              :stop="tour.stop"
              :is-first="tour.isFirst"
              :is-last="tour.isLast"
              :labels="tour.labels"
              :highlight="tour.highlight"
            >
              <template>
                <div
                  slot="actions"
                  class="
                    d-flex
                    justify-content-between
                    align-item-center
                    pd-x-15
                  "
                >
                  <div
                    v-if="tour.currentStep != steps.length - 1"
                    class="close-tour"
                  >
                    <a
                      style="color: #fff"
                      href="javascript:;"
                      @click="stopDistributorTour"
                    >
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </a>
                  </div>
                  <div class="btn tx-12 mg-r-30">
                    {{
                      $t("invoice.Step", {
                        index: index + 1,
                        length: steps.length,
                      })
                    }}
                  </div>
                  <div>
                    <el-button
                      v-if="index"
                      @click="tour.previousStep"
                      class="tx-white hover-white mg-r-15 tx-12"
                      size="mini"
                      :id="`supplier-prev-${step.name}-${index + 1}`"
                      type="text"
                      style="color: #fff; font-size: 12px"
                      >{{ $t("invoice.Back") }}</el-button
                    >
                    <el-button
                      v-if="tour.currentStep == steps.length - 1"
                      @click="stopDistributorTour"
                      id="stop-supplier-step"
                      type="primary"
                      size="mini"
                      style="font-size: 12px"
                      >{{ $t("importdata.gotIt") }}</el-button
                    >
                    <el-button
                      v-else
                      @click="tour.nextStep"
                      class="btn btn-primary btn-sm"
                      :id="`supplier-next-${step.name}-${index + 1}`"
                      type="primary"
                      size="mini"
                      style="font-size: 12px"
                      >{{ $t("invoice.Next") }}</el-button
                    >
                  </div>
                </div>
              </template>
            </v-step>
          </template>
        </transition>
      </template>
    </v-tour>
    <v-tour name="invoiceConfirmTour" :steps="confirmsteps">
      <template slot-scope="tour">
        <transition name="fade">
          <template v-for="(step, index) of tour.steps">
            <v-step
              v-if="tour.currentStep === index"
              :key="index + 'tourStep'"
              :step="step"
              :previous-step="tour.previousStep"
              :next-step="tour.nextStep"
              :stop="tour.stop"
              :is-first="tour.isFirst"
              :is-last="tour.isLast"
              :labels="tour.labels"
              :highlight="tour.highlight"
            >
              <template>
                <div slot="actions" class="pd-x-15">
                  <div
                    v-if="tour.currentStep != steps.length - 1"
                    class="close-tour"
                  >
                    <a
                      style="color: #fff"
                      href="javascript:;"
                      @click="stopConfirmTour"
                    >
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </a>
                  </div>
                  <div class="tx-right">
                    <el-button
                      @click="stopConfirmTour"
                      id="stop-supplier-step"
                      type="primary"
                      size="mini"
                      style="font-size: 12px"
                      >{{ $t("importdata.gotIt") }}</el-button
                    >
                  </div>
                </div>
              </template>
            </v-step>
          </template>
        </transition>
      </template>
    </v-tour>
    <v-tour name="invoiceConfirmTour1" :steps="confirmsteps1">
      <template slot-scope="tour">
        <transition name="fade">
          <template v-for="(step, index) of tour.steps">
            <v-step
              v-if="tour.currentStep === index"
              :key="index + 'tourStep'"
              :step="step"
              :previous-step="tour.previousStep"
              :next-step="tour.nextStep"
              :stop="tour.stop"
              :is-first="tour.isFirst"
              :is-last="tour.isLast"
              :labels="tour.labels"
              :highlight="tour.highlight"
            >
              <template>
                <div slot="actions" class="pd-x-15">
                  <div
                    v-if="tour.currentStep != steps.length - 1"
                    class="close-tour"
                  >
                    <a
                      style="color: #fff"
                      href="javascript:;"
                      @click="stopConfirmTour1"
                    >
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </a>
                  </div>
                  <div class="tx-right">
                    <el-button
                      @click="stopConfirmTour1"
                      id="stop-supplier-step"
                      type="primary"
                      size="mini"
                      style="font-size: 12px"
                      >{{ $t("importdata.gotIt") }}</el-button
                    >
                  </div>
                </div>
              </template>
            </v-step>
          </template>
        </transition>
      </template>
    </v-tour>
    <login :show="loginShow" :type="loginType" :rid="loginRId"></login>
    <input
      id="bottomUploadImg"
      type="file"
      style="display: none"
      accept="image/gif,image/jpeg,image/jpg,image/png"
      @change="bottomUploadimg($event)"
    />
    <el-dialog
      title="您当前采购订单中有 0 元供货价的商品"
      :visible.sync="dialogZeroAlert.isShow"
      width="600px"
    >
      <div style="padding: 0 20px">
        <div class="mg-b-10">您当前的采购订单中有设置为 0 元供货价的商品：</div>
        <div
          v-for="item in dialogZeroAlert.items"
          :key="item.id"
          style="margin-bottom: 5px; padding-left: 15px; color: #909399"
        >
          {{ item.codeName }} - {{ item.sku }} × {{ item.quantity }}
        </div>
        <div class="mg-t-30">
          <el-alert
            title="确定要发送当前发票发送给客户吗"
            type="warning"
            :closable="false"
          >
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
          @click="toSendInvoice(dialogZeroAlert.invoice, true)"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('invoice.采购单付款方式')"
      :visible.sync="dialogSetPayment.isShow"
      width="600px"
    >
      <el-divider></el-divider>
      <div style="padding: 15px 20px">
        <div class="pay-row">
          <div class="left">{{ $t("invoice.客户接受的付款方式：") }}</div>
          <div class="right">
            {{ dialogSetPayment.acceptPayment.length ? "" : "---" }}
            <span
              v-for="(payment, index) in dialogSetPayment.acceptPayment"
              :key="payment"
            >
              {{ $t($dict.paymentType[payment].text) }}
              {{ index < dialogSetPayment.acceptPayment.length - 1 ? "," : "" }}
            </span>
          </div>
        </div>
        <div class="pay-row">
          <div class="left">{{ $t("invoice.当前采购单付款方式：") }}</div>
          <div class="right radio-wrap">
            <template v-for="payment in $dict.paymentType">
              <template
                v-if="payment.val != 4 && payment.val != 5 && payment.val != 6"
              >
                <el-radio
                  :key="payment.val"
                  :label="payment.val"
                  v-model="dialogSetPayment.payment"
                  :disabled="
                    !$store.state.userInfo.walletOpen && payment.val == 4
                  "
                >
                  <!-- :disabled="!dialogSetPayment.acceptPayment.some(p => {return p == payment.val})" -->
                  {{ $t(payment.text) }}
                </el-radio>
                <div
                  v-if="dialogSetPayment.payment == 2 && payment.val == 2"
                  :key="payment.val + 'b'"
                  style="margin-bottom: 15px"
                >
                  <el-input
                    size="small"
                    v-model="dialogSetPayment.payUrl"
                    placeholder="请输入速卖通代拍商品链接地址"
                    style="width: 320px"
                  ></el-input>
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogSetPayment.isShow = false">
          {{ $t("invoice.取消") }}
        </el-button>
        <el-button
          size="small"
          type="primary"
          :loading="dialogSetPayment.loading"
          :disabled="dialogSetPayment.loading"
          @click="saveSetPayment()"
        >
          {{ $t("invoice.保存设置") }}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="DialogLoadingCnt.isShow"
      width="400px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <div class="get-invocie-loading">
        <i class="el-icon-loading"></i>
        <span
          >Loading
          <span>{{ parseInt(DialogLoadingCnt.loadingCnt * 100) }} %</span></span
        >
      </div>
    </el-dialog>
  </el-scrollbar>
</template>

<script>
import draggable from "vuedraggable";
import html2canvas from "html2canvas";
import login from "./../components/dialog/logIn.vue";
export default {
  name: "invoice",
  data() {
    return {
      transferData: [],
      DesignatedGoodDialog: {
        isShow: false,
        loading: false,
        data: [],
      },
      tooltipShow: false,
      setOtherERPDialog: {
        // 提交其他ERP窗口状态
        isShow: false,
        contents: "",
        loading: false,
        uploadLoading: false,
        attach: [],
      },
      setLotPriceDialog: {
        loading: false,
        isShow: false,
        step: 1,
        price: "1",
        type: "",
        numbers: "",
        shippingTypeArr: {},
        onlyNone: "1",
        shipTypeStr: "",
        logType: "1",
        cntArr: [],
        sku: "",
        erpRules: [],
        ruleId: "",
        failDetail: true,
        successDetail: true,
        results: [],
        addPrice: "",
        loadingCnt: 0,
      },
      setLotPriceDialogDefault: {},
      dialogselectProduct: {
        items: [],
        selectItems: [],
        page: 1,
        totalPage: 1,
        goto(page) {},
      },
      dialogselectProductDefault: "{}",
      showErrorLog: false,
      userInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : "",
      shopData: [],
      shopName: "",
      confirmMoneyType: "1",
      stepActive: 2,
      showType: 1,
      expands: [],
      confirmsteps: [
        {
          target: ".confirmStep",
          header: {
            title: this.$t("invoice.ERPsystem"),
          },
          content: `<div style='text-align:left;'>${this.$t(
            "invoice.importerp"
          )}</div>`,
          params: {
            placement: "top",
            highlight: true,
          },
        },
      ],
      confirmsteps1: [
        {
          target: ".confirmStep1",
          header: {
            title: this.$t("invoice.ERPsystem"),
          },
          content: `<div style='text-align:left;'>${this.$t(
            "invoice.importerp"
          )}</div>`,
          params: {
            placement: "top",
            highlight: true,
          },
        },
      ],
      steps: [
        {
          target: ".step-sku-1",
          header: {
            title: "STEP 1",
          },
          content: this.$t("invoice.skuSet"),
          params: {
            placement: "bottom",
            highlight: true,
          },
        },
        {
          target: ".step-price-2",
          header: {
            title: "STEP 2",
          },
          content: this.$t("invoice.priceSet"),
          params: {
            placement: "bottom",
            highlight: true,
          },
        },
        {
          target: ".set-paytype-3",
          header: {
            title: "STEP 3",
          },
          content: this.$t("invoice.paymentSet"),
          params: {
            placement: "top",
            highlight: true,
          },
        },
        {
          target: ".step-btn-4",
          header: {
            title: "STEP 4",
          },
          content: this.$t("invoice.invoiceSend"),
          params: {
            placement: "top",
            highlight: true,
          },
        },
      ],
      myCallbacks: {
        onStart: () => {
          setTimeout(() => {
            $(".v-step").css("opacity", 1);
          }, 200);
          this.invoiceTour = false;
        },
        onPreviousStep: (i) => {
          $(".v-step").css("opacity", 0);
          setTimeout(() => {
            $(".v-step").css("opacity", 1);
          }, 200);
          //			          if (i == 6) {
          //			            this.$router.push({ path: "/distributor-page/" });
          //			          }
          this.invoiceTour = false;
        },
        onNextStep: (i) => {
          $(".v-step").css("opacity", 0);
          setTimeout(() => {
            $(".v-step").css("opacity", 1);
          }, 200);
          this.invoiceTour = false;
        },
        onStop: () => {
          this.invoiceTour = true;
        },
      },
      myOptions: {
        startTimeout: 0,
        // useKeyboardNavigation: false
      },
      invoiceTour: true,
      editCompanyName: "",
      editCompanyAddress: "",
      confirmMoneyOpen: false,
      payUrl: "",
      platformRate: "",
      paymentType: "",
      msgContent: "",
      drawer: false,
      drawerTitle: "",
      drawertype: "",
      drawerinfo: "",
      modalCustomExport: {
        tags: [],
        selectedTitles: [],
        unselectedTitles: [],
      },
      modalCustomExportDefault: "",
      //				drawerExportinfo: "",
      alreadySet: false,
      isCollapse: true,
      formNewcustomer: {
        name: "",
        email: "",
        remark: "",
      },
      formNewcustomerRules: {
        name: [
          {
            required: true,
            message: this.$t("invoice.entername"),
            trigger: "blur",
          },
        ],
        email: [
          {
            type: "email",
            message: this.$t("invoice.fillcompanyEmail"),
            trigger: "change",
          },
        ],
      },
      formEditCompany: {
        name: "",
        address: "",
      },
      formEditCompanyRules: {
        name: [
          {
            required: true,
            message: this.$t("invoice.fillcompany"),
            trigger: "blur",
          },
        ],
      },
      formEditcustomer: {
        name: "",
        email: "",
        remark: "",
        id: "",
      },
      formEditcustomerRules: {
        name: [
          {
            required: true,
            message: this.$t("invoice.entername"),
            trigger: "blur",
          },
        ],
        email: [
          {
            type: "email",
            message: this.$t("invoice.fillcompanyEmail"),
            trigger: "change",
          },
        ],
      },
      customerName: "",
      changeCustomerStatus: false,
      activities: [
        {
          content: "Business address and contact details, title, and logo",
          timestamp: "JUNE 2",
        },
        {
          content: "支持自定义颜色",
          timestamp: "",
          color: "#5c6ac4",
        },
        {
          content:
            "支持自定义Business address and contact details, title, and logo",
          timestamp: "",
          color: "#5c6ac4",
        },
        {
          content: "默认样式的节点",
          timestamp: "",
          color: "#5c6ac4",
        },
        {
          content: "Business address and contact details, title, and logo",
          timestamp: "",
          color: "#5c6ac4",
        },
        {
          content: "支持自定义尺寸",
          timestamp: "",
          color: "#5c6ac4",
        },
        {
          content: "Business address and contact details, title, and logo节点",
          timestamp: "",
          color: "#5c6ac4",
        },
      ],
      checked: true,
      form: {
        resource: "1",
      },
      formPrice: {
        resource: "1",
      },
      activeName: "1",
      Amount: "",
      Shipping: "",
      tableData: [],
      addCustomerOpen: false,
      editCompanyInfoOpen: false,
      editCustomerOpen: false,
      activeNames: "1",
      count: 20,
      loading: false,
      pageLoading: false,
      uploadLoading: false,
      tabActive: 1,
      imageUrl: "",
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      totalPage: 1,
      rowsPerPage: 50,
      totalCount: 0,
      type: "all",
      invoiceInfo: "",
      invoiceData: [],
      firstLoading: true,
      invoiceCnt: "",
      getListFlag: true,
      relationship: [],
      showLogo: false,
      logoUrl: "",
      shippingAmount: "",
      itemAmount: "",
      totalAmount: "",
      realAmount: "",
      discount: "",
      operateLog: [],
      totalPageLog: 1, // 统共页数，默认为1
      currentPageLog: 1, //当前页数 ，默认为1
      pageSizeLog: 20, // 每页显示数量
      currentPageDataLog: [], //当前页显示内容
      getLogFlag: true,
      messages: [],
      currentmessages: [],
      msgpage: 1,
      msgtotalPage: 1,
      msgrowsPerPage: 20,
      msgtotalCount: 0,
      getMsgFlag: true,
      pack: "",
      fileList: [],
      uploadfileList: [],
      uniCode: this.$route.query.uniCode ? this.$route.query.uniCode : "",
      tipWithHover: {
        container: "page-footer-fixed",
      },
      invoiceData2: [],
      invoiceData3: [],
      sendInvoiceOpen: false,
      activeShareName: "shareLink",
      showCustom: false,
      shareTitle: "",
      shareDesc: "",
      showDownloadInvoice: false,
      stopResource: "1",
      activeConfirm: "confirmErp",
      innerVisible: false,
      confirmVisible: false,
      confirmVisible2: false,
      invoiceConfirmTourShow: false,
      invoiceConfirmTourShow1: false,
      loginShow: false,
      loginType: 0,
      loginRId: "",
      searchName: false,
      searchTrack: false,
      searchNameInput: "",
      showTopTip: false,
      fromPage: this.$route.query.fromPage ? this.$route.query.fromPage : "",
      secretKeyOpen: false,
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
      showItemPrice: true,
      activeName: "first",
      exportInvoiceType: "",
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
      loadCnt: false,
      cnt: null,
      cntText: "",
      totalCnt: 0,
      dialogZeroAlert: {
        isShow: false,
        loading: false,
        items: [],
        invoice: null,
      },
      dialogZeroAlertDefault: "{}",
      tempCode: "",
      setLotPriceCallBackTime: 0,
      iframeId: null,
      setShippingTime: 0,
      dialogSetPayment: {
        isShow: false,
        loading: false,
        acceptPayment: [], //供应商支付方式
        payment: "", //当前选择的
        payUrl: "",
      },
      dialogSetPaymentDefault: "{}",
      tempCode: "",
      getInvocieTime: 0,
      DialogLoadingCnt: {
        isShow: false,
        loadingCnt: 0,
      },
    };
  },
  computed: {
    hasAbnormal() {
      return this.invoiceData.some((item) => Number(item.isAbnormal) === 1);
    },
    noMore() {
      // return this.invoiceData.length == Number(this.totalCount) && !this.loading
      return true;
    },
    disabled() {
      return this.loading || this.noMore;
    },
    fullPath() {
      return this.$route.fullPath;
    },
  },
  watch: {
    $route: "gotoPage",
    fullPath() {
      //				this.uniCode = this.$route.query.uniCode?this.$route.query.uniCode:"";
      //		        this.getDataAll();
      // window.location.reload();
    },
    noMore() {
      if (this.noMore) {
        this.getOperateLog(this.invoiceInfo.id); //获取时间轴
        this.getMessages(this.invoiceInfo.id); //获取消息
      }
    },
    customerName() {
      //更换其他客户下拉框输入触发搜索
      this.changeCustomerName();
    },
    uniCode() {
      sessionStorage.removeItem("tabActiveAll");
      sessionStorage.removeItem("tabActiveSku");
      sessionStorage.removeItem("tabActiveNotBind");
      sessionStorage.removeItem("tabActiveNotDeliver");
    },
    drawer() {
      if (this.drawer) {
        setTimeout(() => {
          //						$(".el-drawer__wrapper .el-scrollbar__wrap").scrollTop(0)
          $(".el-drawer__body").scrollTop(0);
        }, 100);
      }
    },
    realAmount() {
      if (
        Number(this.realAmount) < Number(this.totalAmount) &&
        Number(this.realAmount) > 0
      ) {
        this.discount = this.toFixed(
          Number(this.totalAmount) - Number(this.realAmount)
        );
      } else {
        this.discount = 0;
      }
    },
    tabActive() {
      this.searchName = false;
      this.searchTrack = false;
      this.searchNameInput = "";
    },
    searchName() {
      if (this.searchName) {
        setTimeout(() => {
          this.$refs.searchNameInput.focus();
        }, 300);
      }
    },
    searchTrack() {
      if (this.searchTrack) {
        setTimeout(() => {
          this.$refs.searchNameInput.focus();
        }, 300);
      }
    },
    invoiceData() {
      if (this.invoiceData.length) {
        this.invoiceData.forEach((e, t) => {
          this.$set(e, "previewList", []);
          if (e.imgUrl) {
            e.previewList.push(e.imgUrl);
          }
        });
      }
    },
  },
  mounted() {
    window.addEventListener("message", (e) => {
      if (e.data.type && e.data.type === "isVendors") {
        this.iframeId = e.data.id;
      }
      let userId = localStorage.getItem("apiUserId")
          ? localStorage.getItem("apiUserId")
          : "",
        userToken = localStorage.getItem("apiUserToken")
          ? localStorage.getItem("apiUserToken")
          : "";
      if (!userId || !userToken) {
        if (this.iframeId === this.invoiceInfo.customerId) {
          this.loginShow = false;
        }
      }
    });
    this.dialogSetPaymentDefault = JSON.stringify(this.dialogSetPayment);
    this.dialogZeroAlertDefault = JSON.stringify(this.dialogZeroAlert);
    this.dialogMarkShippedDefault = JSON.stringify(this.dialogMarkShipped);
    this.DialogEditCommentDefault = JSON.stringify(this.DialogEditComment);
    this.setLotPriceDialogDefault = JSON.stringify(this.setLotPriceDialog);
    this.getDataAll();
    if (this.userInfo.source == 3) {
      this.getErpRules();
    }
    this.isCollapse = true;
    this.$nextTick(() => {
      this.handleScroll();
      window.emojiPicker = new EmojiPicker({
        emojiable_selector: "[data-emojiable=true]", //点击目标
        assetsPath: "images/v-emoji", //表情包路径
        popupButtonClasses: "fa fa-smile-o",
      });
      window.emojiPicker.discover();
    });
    this.shopData = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).erpShops
      : [];
    this.modalCustomExportDefault = JSON.stringify(this.modalCustomExport);

    $("body").on("click", (event) => {
      var target = $(event.target);
      if (
        !target.hasClass("el-popover") &&
        target.parent(".el-popover").length === 0
      ) {
        $(".el-popover").remove();
      }
    });
    //			document.domain = "ourmall.com";
    //			console.log(document.domain)
  },
  created() {
    document.body.ondrop = function (event) {
      event.preventDefault();
      event.stopPropagation();
    };
  },
  destroyed() {},
  components: {
    draggable,
    login,
  },
  methods: {
    DesignatedChange(a, b) {},
    setDesignatedGood() {
      this.DesignatedGoodDialog.isShow = true;
    },
    openSelectProducts() {},
    focusChange(item, index) {
      //  item.tooltipShow = false;
      item.price = undefined;
      this.$nextTick(function () {
        this.$refs[`refInput${index}`].focus();
      });
      console.log(item, index);
    },
    blueChange(item, index) {
      if (item.price == undefined) {
        item.price = null;
        item.tooltipShow = false;
      }
      //  this.$refs[`refInput${index}`].focus();
      console.log(item, index);
    },
    setType(type) {
      this.type = type;
      this.toPage(1);
    },
    gotoPage() {
      this.page = this.$route.query.page ? Number(this.$route.query.page) : 1;
      this.getInvoiceData(this.invoiceInfo.id);
    },
    toPage(val) {
      if (val != this.$route.query.page) {
        let query = { ...this.$route.query, page: val };
        this.$router.push({
          query,
        });
      } else {
        this.getInvoiceData(this.invoiceInfo.id);
      }
    },
    DisplayToPage(val, row) {
      this.pageLoading = true;
      setTimeout(() => {
        this.$set(
          row,
          "displayItems",
          row.allItems.slice((val - 1) * 50, val * 50)
        );
        this.$set(row, "displayItemsPage", val);
        this.pageLoading = false;
      }, 500);
    },
    saveSetLotPrice() {
      if (
        this.userInfo.source == 2 &&
        this.setLotPriceDialog.logType == 1 &&
        !this.setLotPriceDialog.shipTypeStr
      ) {
        this.$elementMessage("请填写物流渠道名称", "error");
        return;
      }
      if (
        this.setLotPriceDialog.onlyNone == 3 &&
        this.DesignatedGoodDialog.data.length == 0
      ) {
        this.$elementMessage("请选择指定商品", "error");
        return;
      }
      this.tempCode = `${this.invoiceInfo.id}${Date.parse(new Date())}`;
      let params = {
        invoiceId: this.invoiceInfo.id,
        shipType: this.setLotPriceDialog.type,
        shipTypeStr: this.setLotPriceDialog.shipTypeStr,
        addPricePercent: this.setLotPriceDialog.numbers,
        onlyNone: this.setLotPriceDialog.onlyNone,
        tempCode: this.tempCode,
      };
      if (this.setLotPriceDialog.logType == 2) {
        if (!this.setLotPriceDialog.cntArr.length) {
          params.shipTypeArr = [];
          return;
        }
        let arr = [];
        this.setLotPriceDialog.cntArr.forEach((item) => {
          arr.push({
            countryCode: item.countryCode,
            shipType: item.shipType,
            shipTypeStr: item.shipTypeStr,
          });
        });
        params.shipTypeArr = arr;
        params.shipType = "";
        params.shipTypeStr = "";
      }
      if (this.setLotPriceDialog.onlyNone == 2 && this.setLotPriceDialog.sku) {
        params.sku = this.setLotPriceDialog.sku;
      }
      if (
        this.setLotPriceDialog.onlyNone == 3 &&
        this.DesignatedGoodDialog.data.length > 0
      ) {
        params.ids = this.DesignatedGoodDialog.data;
      }
      if (this.userInfo.source == 3) {
        params.ruleId = this.setLotPriceDialog.ruleId;
        params.priceType = this.setLotPriceDialog.price;
        params.addPrice = this.setLotPriceDialog.addPrice;
      } else {
        params.priceType = this.setLotPriceDialog.price;
      }
      // console.log(params)
      // return;
      this.setLotPriceDialog.loading = true;
      this.$apiCall("api.Invoice.getErpPrice", params, (r) => {
        // if(r.ErrorCode != "9999"){
        //   this.$message({showClose: true, message: r.Message, type: 'error', duration: 30000});
        //   this.tempCode = '';
        //   clearInterval(this.setLotPriceCallBackTime)
        // }
      });
      // this.setLotPriceDialog.isShow = false;
      // this.$elementMessage('批量改价已提交，请稍候', 'success');
      this.setLotPriceDialog.step = 4;
      this.setLotPriceDialog.loadingCnt = 0;
      this.setLotPriceDialog.loading = false;
      let t = 0;
      this.setLotPriceCallBackTime = setInterval(() => {
        t++;
        if (t > 300) {
          this.setLotPriceDialog.loading = false;
          this.setLotPriceDialog.isShow = false;
          this.$elementMessage("批量改价失败", "error");
          this.tempCode = "";
          clearInterval(this.setLotPriceCallBackTime);
        }
        this.$apiCall(
          "api.Invoice.checkPriceResult",
          { tempCode: this.tempCode },
          (r) => {
            if (r.ErrorCode == "9999") {
              this.DesignatedGoodDialog.data = [];
              let re = r.Data.Results;
              if (re.result && re.result.now)
                this.setLotPriceDialog.loadingCnt =
                  re.result.now / re.result.allCnt;
              if (re.status != 1) {
                this.setLotPriceDialog.loading = false;
                if (re.status != 3) this.setLotPriceDialog.isShow = false;
                this.tempCode = "";
                clearInterval(this.setLotPriceCallBackTime);
                if (re.status == 2) {
                  //报错
                  this.setLotPriceDialog.isShow = false;
                  this.$elementMessage(re.message, "error");
                }
                if (re.status == 3) {
                  //成功
                  this.setLotPriceDialog.step = 3;
                  this.setLotPriceDialog.results = re.result;
                  this.getDataAll();
                }
              }
            }
          }
        );
      }, 1000);
    },
    setLotPriceStep(step) {
      //绑定erp
      //				this.$showLoading();
      if (step === 1) {
        let http = "https:" == document.location.protocol ? "https" : "http";
        let locationMall =
          window.location.host.toLowerCase().indexOf("sandbox") >= 0
            ? "sandboxvendor.ourmall.com"
            : "vendor.ourmall.com";
        let domainHost = http + "://" + locationMall + "/mabang-account.html";
        if (window.location.host.indexOf("localhost") > -1) {
          //开发环境
          domainHost = `http://${window.location.host}/mabang-account.html`;
        }
        let url = encodeURI(domainHost);
        let PayWindow = window.open(
          "http://www.mabangerp.com/index.php?mod=main.login&erp-type=5yoho&backUrl=" +
            url,
          "mabang-account-window",
          undefined,
          true
        );
        window.addEventListener("storage", (e) => {
          if (e.key == "authorizMabangAccount") {
            let mabangData = JSON.parse(
              localStorage.getItem("authorizMabangAccount")
            );
            this.$apiCall(
              "api.User.mbLogin",
              {
                employeeId: mabangData.employeeId,
                cKey: mabangData.cKey,
              },
              (r) => {
                if (r.ErrorCode == "9999") {
                  let userInfo = JSON.parse(
                    JSON.stringify(this.$store.state.userInfo)
                  );
                  userInfo.source = r.Data.Results.source;
                  localStorage.setItem("userInfo", JSON.stringify(userInfo));
                  this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
                  if (r.Data.Results.source == 3) {
                    //马帮3.0
                    this.getErpRules();
                  }
                  setTimeout(() => {
                    this.$hideLoading();
                    this.setLotPriceDialog.step = step;
                  }, 300);
                } else {
                  this.$hideLoading();
                  this.$elementMessage(r.Message, "error");
                }
              }
            );
          }
        });
      } else if (step === 2) {
        this.setOtherERPDialog.loading = false;
        this.setOtherERPDialog.uploadLoading = false;
        this.setOtherERPDialog.contents = "";
        this.setOtherERPDialog.attach = [];
        this.setOtherERPDialog.isShow = true;
      }
    },
    getErpRules() {
      this.$apiCall("api.Invoice.getErpRules", {}, (r) => {
        if (r.ErrorCode == "9999") {
          this.setLotPriceDialog.erpRules = r.Data.Results;
          if (this.setLotPriceDialog.erpRules.length) {
            this.setLotPriceDialog.erpRules.forEach((item) => {
              this.$set(
                item,
                "shippingFeeRuleId",
                Number(item.shippingFeeRuleId)
              );
            });
          }
          this.setLotPriceDialog.isShow = false;
          this.getData();
        }
      });
    },
    unbind() {
      //解绑
      this.$showLoading();
      this.$apiCall("api.User.unbind", {}, (r) => {
        this.$hideLoading();
        if (r.ErrorCode == "9999") {
          let userInfo = JSON.parse(JSON.stringify(this.$store.state.userInfo));
          userInfo.source = r.Data.Results.source;
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
          this.$elementMessage("解除绑定成功", "success");
          this.setLotPriceDialog.step = 1;
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    changePriceType() {
      if (this.setLotPriceDialog.price == 2) {
        this.setLotPriceDialog.onlyNone = "";
      }
    },
    setLotPrice(item) {
      //打开设价模态框
      // this.setLotPriceDialog = JSON.parse(this.setLotPriceDialogDefault);
      this.$showLoading();
      if (item && item.sku) {
        //sku设价
        this.setLotPriceDialog.sku = item.sku;
        this.setLotPriceDialog.onlyNone = "2";
      } else {
        this.setLotPriceDialog.sku = "";
        this.setLotPriceDialog.onlyNone = "1";
      }

      if (this.userInfo.source == 1) {
        //未绑定
        this.setLotPriceDialog.step = 1;
        this.setLotPriceDialog.isShow = true;
        this.$hideLoading();
      } else {
        this.setLotPriceDialog.step = 2;
        this.setLotPriceDialog.loading = true;
        //					if(this.userInfo.source == 3){//马帮3.0
        //			        	this.getErpRules();
        //			        }
        this.$apiCall(
          "api.Invoice.getPriceConfig",
          {
            invoiceId: this.invoiceInfo.id,
          },
          (r) => {
            this.setLotPriceDialog.loading = false;
            if (r.ErrorCode == "9999") {
              this.setLotPriceDialog.isShow = true;
              this.setLotPriceDialog.shippingTypeArr =
                r.Data.Results.shippingTypeArr;
              this.setLotPriceDialog.type = r.Data.Results.shipType;
              this.setLotPriceDialog.numbers = r.Data.Results.addPricePercent;
              this.setLotPriceDialog.shipTypeStr = r.Data.Results.shipTypeStr;
              this.setLotPriceDialog.ruleId = r.Data.Results.ruleId
                ? Number(r.Data.Results.ruleId)
                : "";
              this.setLotPriceDialog.price = r.Data.Results.priceType
                ? r.Data.Results.priceType
                : "1";
              if (this.setLotPriceDialog.price == 2) {
                this.setLotPriceDialog.onlyNone = "";
              }
              if (this.showType == 2) {
                this.setLotPriceDialog.onlyNone = "2";
              }
              if (this.setLotPriceDialog.shipTypeStr) {
                this.setLotPriceDialog.type = "999";
              }
              if (
                r.Data.Results.shipTypeArr &&
                r.Data.Results.shipTypeArr.length
              ) {
                let arr = [];
                this.setLotPriceDialog.logType = "2";
                r.Data.Results.shipTypeArr.forEach((item) => {
                  if (!item.shipType) {
                    this.$set(item, "shipType", "999");
                  }
                  if (this.setLotPriceDialog.cntArr.length) {
                    this.setLotPriceDialog.cntArr.forEach((obj) => {
                      if (obj.countryCode == item.countryCode) {
                        this.$set(obj, "shipType", item.shipType);
                        this.$set(obj, "shipTypeStr", item.shipTypeStr);
                      }
                    });
                  }
                });
                //								this.setLotPriceDialog.cntArr = r.Data.Results.shipTypeArr;
              }
              this.$hideLoading();
            } else {
              this.$elementMessage(r.Message, "error");
            }
          }
        );
      }
    },
    cntOnError() {
      this.$elementMessage(this.$t("myinvoice.copyFailed"), "error");
    },
    cntOnCopy() {
      this.$elementMessage(this.$t("myinvoice.copyItems"), "success");
    },
    getCntCountry() {
      this.loadCnt = true;
      this.$apiCall(
        "api.Invoice.getItemsCountry",
        {
          invoiceId: this.invoiceInfo.id,
        },
        (r) => {
          this.loadCnt = false;
          if (r.ErrorCode == "9999") {
            this.cnt = r.Data.Results;
            let txt = `${this.$t("invoice.Totalpurchases")}${this.totalCnt},`;
            this.totalCnt = 0;
            this.setLotPriceDialog.cntArr = [];
            Object.keys(r.Data.Results).forEach((k) => {
              txt += `${r.Data.Results[k].name}: ${r.Data.Results[k].cnt},`;
              this.totalCnt += Number(r.Data.Results[k].cnt);
              this.setLotPriceDialog.cntArr.push({
                country: r.Data.Results[k].name,
                countryCode: k,
                //								num: Number(r.Data.Results[k]),
                shipType: "",
                shipTypeStr: "",
              });
            });
            this.cntText = txt.slice(0, txt.length - 1);
          }
        }
      );
    },
    saveMarkShipped() {
      if (!this.dialogMarkShipped.trackNumber) {
        this.$elementMessage(this.$t("invoice.logisticsnumber"), "error");
        return;
      }
      if (!this.dialogMarkShipped.trackKey) {
        this.$elementMessage(this.$t("invoice.logisticscompany"), "error");
        return;
      }
      if (
        this.dialogMarkShipped.trackKey == 99 &&
        !this.dialogMarkShipped.trackCompany
      ) {
        this.$elementMessage(this.$t("invoice.logisticscompany"), "error");
        return;
      }
      // if(this.dialogMarkShipped.trackKey == 99 && !this.dialogMarkShipped.trackUrl) {
      //   this.$elementMessage(this.$t('invoice.logistics'), "error");
      //   return;
      // }
      let trackName = "";
      this.dialogMarkShipped.shopifyCompany.forEach((item) => {
        if (this.dialogMarkShipped.trackKey == item.key) {
          if (this.dialogMarkShipped.trackKey != 99) {
            trackName = item.name;
          } else {
            trackName = this.dialogMarkShipped.trackCompany;
          }
        }
      });
      this.dialogMarkShipped.loading = true;
      this.$apiCall(
        "api.Invoice.changeDeliver",
        {
          itemId: this.dialogMarkShipped.item.id,
          trackNumber: this.dialogMarkShipped.trackNumber,
          trackCompany: this.dialogMarkShipped.trackCompany,
          //					realCompany: this.dialogMarkShipped.realCompany,
          trackKey: this.dialogMarkShipped.trackKey,
          trackUrl: this.dialogMarkShipped.trackUrl,
        },
        (r) => {
          this.dialogMarkShipped.loading = false;
          if (r.ErrorCode == "9999") {
            this.$elementMessage(this.$t("invoice.shippedMark"), "success");
            this.dialogMarkShipped.isShow = false;
            this.getCnt(this.invoiceInfo.id); //获取tab栏数字
            this.getData();
            this.$apiCall(
              "api.Invoice.getItems",
              {
                uniCode: this.invoiceInfo.uniCode,
                invoiceId: this.invoiceInfo.id,
                id: this.dialogMarkShipped.item.id,
              },
              (r) => {
                if (r.ErrorCode == "9999") {
                  console.log(r);
                  this.invoiceData.forEach((item, i) => {
                    if (item.id == r.Data.Results[0].id) {
                      this.invoiceData.splice(i, 1, r.Data.Results[0]);
                    }
                  });
                } else {
                  this.$elementMessage(r.Message, "error");
                }
              }
            );
            //						this.$set(this.dialogMarkShipped.item,"trackNumber",this.dialogMarkShipped.trackNumber);
            //						this.$set(this.dialogMarkShipped.item,"trackCompany",trackName);
            //						this.$set(this.dialogMarkShipped.item,"trackCompany",this.dialogMarkShipped.trackCompany);
            //						this.$set(this.dialogMarkShipped.item,"realCompany",this.dialogMarkShipped.realCompany);
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    markShippedOpen(item) {
      this.dialogMarkShipped = JSON.parse(this.dialogMarkShippedDefault);
      this.$showLoading();
      this.$apiCall("api.Invoice.getShopifyCompany", {}, (r) => {
        this.$hideLoading();
        if (r.ErrorCode == "9999") {
          this.dialogMarkShipped.shopifyCompany = r.Data.Results;
          this.dialogMarkShipped.isShow = true;
          this.dialogMarkShipped.item = item;
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    handleClickTab(tab, event) {
      this.exportInvoiceType = tab.paneName;
      if (
        this.exportInvoiceType == "first" ||
        this.exportInvoiceType == "third"
      ) {
        this.$showLoading();
        this.getExportTitle();
      }
    },
    changeShowItemPrice() {
      this.$apiCall(
        "api.Invoice.setShowPrice",
        {
          uniCode: this.uniCode,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
          } else {
            this.showItemPrice = !this.showItemPrice;
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    handleRemoveImg(file, fileList) {
      fileList.forEach((e, index) => {
        if (e.name == file.name) {
          this.DialogEditComment.attach.splice(index, 1);
        }
      });
    },
    handleChangeImg(file) {
      this.DialogEditComment.loading = true;
      this.DialogEditComment.uploadLoading = true;
      this.$apiCall(
        "api.Comment.uploadAttach",
        {
          "@file": file.raw,
        },
        (r) => {
          this.DialogEditComment.loading = false;
          this.DialogEditComment.uploadLoading = false;
          if (r.ErrorCode == "9999") {
            this.DialogEditComment.attach.push(r.Data.Results.url);
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    openAddComment() {
      //打开新建工单
      if (this.$refs.uploadFile) this.$refs.uploadFile.clearFiles();
      this.DialogEditComment = JSON.parse(this.DialogEditCommentDefault);
      this.DialogEditComment.visible = true;
    },
    saveComment() {
      //保存新建工单
      if (!this.DialogEditComment.contents) {
        this.$message({
          message: this.$t("invoice.emptyQuestion"),
          type: "error",
        });
        return false;
      }
      this.DialogEditComment.loading = true;
      this.$apiCall(
        "api.Comment.addByUser",
        {
          commentId: this.DialogEditComment.commentId,
          contents: this.DialogEditComment.contents,
          shopName: this.DialogEditComment.shopName,
          attach: this.DialogEditComment.attach,
        },
        (r) => {
          this.DialogEditComment.loading = false;
          if (r.ErrorCode == 9999) {
            this.DialogEditComment.visible = false;
            this.$message({
              message: this.$t("app._wewillReplyASAP"),
              type: "success",
            });
          } else {
            this.$message({
              message: r.Message,
              type: "error",
            });
          }
        }
      );
    },
    openSecretKey() {
      this.secretKeyOpen = true;
    },
    Filter(type, name) {
      if (type == 3) {
        if ((this.searchName || this.searchTrack) && !this.searchNameInput) {
          this.searchName = false;
          this.searchTrack = false;
        }
      } else if (type == 2) {
        this.searchName = false;
        this.searchTrack = false;
        this.searchNameInput = "";
      } else if (type == 1) {
        if (!this.searchNameInput && !this.searchTrack) return;
      }
      this.page = 1;
      this.getInvoiceData(this.invoiceInfo.id, this.searchNameInput);
    },
    openSkype() {
      this.getData();
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
    isChangeSku(item) {
      if (
        this.invoiceInfo.timeApiGet ||
        this.invoiceInfo.timeCreateOrder ||
        item.fulfillStatus == 2 ||
        this.invoiceInfo.status == 9
      ) {
        return true;
      } else {
        return false;
      }
    },
    isChangePrice(item) {
      if (
        this.invoiceInfo.timeApiGet ||
        this.invoiceInfo.timeCreateOrder ||
        item.fulfillStatus == 2 ||
        this.invoiceInfo.status == 9 ||
        this.invoiceInfo.customerRead == 1 ||
        this.invoiceInfo.payStatus == 1
      ) {
        return true;
      } else {
        return false;
      }
    },
    isChangeOther(item) {
      if (
        (item.isAbnormal == 2 &&
          (this.invoiceInfo.timeApiGet ||
            this.invoiceInfo.timeCreateOrder ||
            item.fulfillStatus == 2 ||
            this.invoiceInfo.status == 9 ||
            this.invoiceInfo.customerRead == 1 ||
            this.invoiceInfo.payStatus == 1)) ||
        (item.isAbnormal == 1 && item.trackNumber)
      ) {
        return true;
      } else {
        return false;
      }
    },
    isChangeAmount() {
      if (
        this.invoiceInfo.timeApiGet ||
        this.invoiceInfo.timeCreateOrder ||
        this.invoiceInfo.status == 9 ||
        this.invoiceInfo.customerRead == 1 ||
        this.invoiceInfo.payStatus == 1
      ) {
        return true;
      } else {
        return false;
      }
    },
    hidePopoverFn() {
      $(".el-popover").remove();
    },
    showPopover() {
      if (this.hasAbnormal) {
        return;
      }
      this.confirmVisible = true;
      $(".el-popover").remove();
      $("body").off();
    },
    showPopover3() {
      $(".el-popover").remove();
      $("body").off();
    },
    showPopover2() {
      if (this.hasAbnormal) {
        return;
      }
      this.confirmVisible2 = true;
      $(".el-popover").remove();
      $("body").off();
      $(".page-footer-fixed").addClass("show-hover");
    },
    hidePopover() {
      $(".page-footer-fixed").removeClass("show-hover");
    },
    downloadInvoice() {
      this.showDownloadInvoice = true;
      let page = 1,
        totalpage = 1;

      this.showLogo = false;
      this.logoUrl = "";

      this.$showLoading();

      this.$apiCall(
        "api.Invoice.getOne",
        {
          uniCode: this.uniCode,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            this.invoiceInfo = r.Data.Results;
            this.shopName = this.invoiceInfo.shopName
              ? this.invoiceInfo.shopName
              : "";
            this.invoiceData3 = [];
            this.getDownload(page, totalpage);
            //分享标题
            this.shareTitle = this.invoiceInfo.remark
              ? this.invoiceInfo.remark.title
              : "";
            this.shareDesc = this.invoiceInfo.remark
              ? this.invoiceInfo.remark.desc
              : "";

            //logo
            if (this.invoiceInfo && this.invoiceInfo.logo) {
              this.showLogo = true;
              this.logoUrl = this.invoiceInfo.logo;
            }

            //付款方式、付款金额
            this.payUrl = this.invoiceInfo.payUrl
              ? this.invoiceInfo.payUrl
              : "";
            this.platformRate =
              this.invoiceInfo.platformRate && this.invoiceInfo.platformRate > 0
                ? this.invoiceInfo.platformRate
                : "";
            this.paymentType = this.invoiceInfo.paymentType
              ? this.invoiceInfo.paymentType
              : "";

            this.shippingAmount = this.invoiceInfo.shippingAmount
              ? this.toFixed(this.invoiceInfo.shippingAmount)
              : "";
            this.itemAmount = this.invoiceInfo.itemAmount
              ? this.toFixed(this.invoiceInfo.itemAmount)
              : "";
            this.totalAmount = this.invoiceInfo.totalAmount
              ? this.toFixed(this.invoiceInfo.totalAmount)
              : "";
            this.realAmount = this.invoiceInfo.realAmount
              ? this.toFixed(this.invoiceInfo.realAmount)
              : "";
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        }
      );
    },
    getDownload(page, totalp) {
      if (page > totalp) {
        setTimeout(() => {
          this.getCanvas();
        }, 1000);
        return;
      }
      // console.log(2, {
      //   invoiceId: this.invoiceInfo.id,
      //   type: "all",
      //   page: page,
      //   rowsPerPage: 50,
      // })
      this.$apiCall(
        "api.Invoice.getItems",
        {
          invoiceId: this.invoiceInfo.id,
          type: "all",
          page: page,
          rowsPerPage: 50,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            let totalPage = r.Data.Pagination.totalPage;
            r.Data.Results.forEach((e, t) => {
              if (!e.price) {
                this.$set(e, "amount", "");
              } else {
                if (e.fulfillStatus != 2) {
                  this.$set(
                    e,
                    "amount",
                    (Number(e.quantity) * Number(e.price)).toFixed(2)
                  );
                } else {
                  this.$set(e, "amount", "0.00");
                }
              }

              this.invoiceData3.push(e);
            });
            page++;
            this.getDownload(page, totalPage);
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        }
      );
    },
    getCanvas() {
      var copyDom = $(".download-invoice");
      var scale = 2; //放大倍数
      html2canvas(copyDom[0], {
        dpi: window.devicePixelRatio * 2,
        scale: scale,
        background: "#fff",
        allowTaint: true,
        useCORS: true,
      }).then((canvas) => {
        this.$hideLoading();
        //          		let link = document.createElement("a");
        //			        link.href = canvas.toDataURL();
        //			        link.setAttribute("download", "Invoice # " + this.invoiceInfo.code + ".png");
        //			        link.style.display = "none";//a标签隐藏
        //			        document.body.appendChild(link);
        //			        link.click();
        //			        link.remove();
        var imgData = canvas.toDataURL("image/jpeg");
        var triggerDownload = $("<a>")
          .attr("href", imgData)
          .attr("download", "Invoice # " + this.invoiceInfo.code + ".jpg")
          .appendTo("body");
        triggerDownload[0].click();
        triggerDownload.remove();
        //删除复制出来的div
        this.showDownloadInvoice = false;
      });
    },
    saveRemark(type) {
      this.$showLoading();
      this.$apiCall(
        "api.Invoice.saveRemark",
        {
          uniCode: this.uniCode,
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
    saveCustomExportSetting(type) {
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
      this.uploadLoading = true;
      let obj = {};
      this.modalCustomExport.selectedTitles.forEach((item) => {
        obj[item.key] = item.name;
      });
      let apiUrl =
        this.exportInvoiceType == "third"
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
                this.exportInvoiceType == "third"
                  ? "api.Invoice.exportInvoice"
                  : "api.Invoice.exportOrder";
              this.$apiCall(
                apiUrl,
                {
                  titles: obj,
                  invoiceId: this.invoiceInfo.id,
                  type: type == 1 ? "excel" : "csv",
                },
                (r) => {
                  this.uploadLoading = false;
                  if (r.ErrorCode == "9999") {
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
            }
          } else {
            this.uploadLoading = false;
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        }
      );
    },
    saveCustomExportShopify() {
      this.uploadLoading = true;
      if ($("#ifilePro").length == 0) {
        $("body").append(
          '<iframe id="ifilePro" style="display:none"></iframe>'
        );
      }
      let openDownload = (url) => {
        document.getElementById("ifilePro").src = url;
      };
      let apiUrl =
        this.exportInvoiceType == "third"
          ? "api.Invoice.exportInvoice"
          : "api.Invoice.exportOrder";
      this.$apiCall(
        apiUrl,
        {
          invoiceId: this.invoiceInfo.id,
          type: "excel",
        },
        (r) => {
          this.uploadLoading = false;
          if (r.ErrorCode == "9999") {
            this.$elementMessage(this.$t("myinvoice.exportSuccess"), "success");
            openDownload(r.Data.Results.file);
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        }
      );
    },
    saveCustomExport(type) {
      this.saveCustomExportSetting(type);
    },
    customWrapState() {
      this.showCustom = !this.showCustom;
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
    downloadFile() {
      let url =
        this.exportInvoiceType == "fourth"
          ? "/file/shopify_orders_import.csv"
          : "/file/orders_impor.xlsx";
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
    querySearch(queryString, cb) {
      var shopData = this.shopData;
      var results = queryString
        ? shopData.filter(this.createFilter(queryString))
        : shopData;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (shop) => {
        return (
          shop.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      this.shopName = item.value;
    },
    getExportTitle() {
      this.modalCustomExport = JSON.parse(this.modalCustomExportDefault);
      let apiUrl =
        this.exportInvoiceType == "third"
          ? "api.Invoice.exportInvoiceTitle"
          : "api.Invoice.exportTitle";
      this.$apiCall(apiUrl, {}, (r) => {
        this.$hideLoading();
        if (r.ErrorCode == "9999") {
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

      this.$apiCall(
        "api.Invoice.saveExportTitle",
        {
          titles: obj,
        },
        (r) => {
          this.$hideLoading();
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
              this.$apiCall(
                "api.Invoice.exportOrder",
                {
                  invoiceId: this.invoiceInfo.id,
                  type: type == 1 ? "excel" : "csv",
                },
                (r) => {
                  if (r.ErrorCode == "9999") {
                    this.innerVisible = false;
                    this.$elementMessage(
                      this.$t("myinvoice.exportSuccess"),
                      "success"
                    );
                    openDownload(r.Data.Results.file);
                    this.$hideLoading();
                  } else {
                    this.$hideLoading();
                    this.$elementMessage(r.Message, "error");
                    if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                      this.$userFailure(this);
                    }
                  }
                }
              );
            } else {
              this.innerVisible = false;
              this.$elementMessage(
                this.$t("myinvoice.saveSettingSuccess"),
                "success"
              );
              this.getExportTitle();
            }
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        }
      );
    },
    saveCustomExportOnly(type) {
      this.saveCustomExportSettingOnly(type);
      //				this.$showLoading();
      //				if($("#ifilePro").length == 0) {
      //					$("body").append(
      //						'<iframe id="ifilePro" style="display:none"></iframe>'
      //					);
      //				}
      //				let openDownload = url => {
      //					document.getElementById("ifilePro").src = url;
      //				};
      //				this.$apiCall("api.Invoice.exportOrder", {
      //					invoiceId: this.invoiceInfo.id,
      //					type: type == 1 ? 'excel' : 'csv'
      //				}, r => {
      //					if(r.ErrorCode == "9999") {
      //						this.$elementMessage("导出成功", 'success');
      //						openDownload(r.Data.Results.file);
      //						this.$hideLoading();
      //					} else {
      //						this.$hideLoading();
      //						this.$elementMessage(r.Message, 'error');
      //						if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
      //							this.$userFailure(this);
      //						}
      //					}
      //				});
    },
    setExportOnly() {
      this.$showLoading();
      this.showCustom = false;
      this.modalCustomExport = JSON.parse(this.modalCustomExportDefault);
      this.$apiCall("api.Invoice.exportTitle", {}, (r) => {
        this.$hideLoading();
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
    confirmMoney() {
      if (this.invoiceConfirmTourShow || this.invoiceConfirmTourShow1) {
        return;
      }
      this.$showLoading();
      this.modalCustomExport = JSON.parse(this.modalCustomExportDefault);
      this.$apiCall("api.Invoice.exportTitle", {}, (r) => {
        this.$hideLoading();
        if (r.ErrorCode == "9999") {
          this.confirmMoneyOpen = true;
          //						if(this.shopData.length == 1){
          //							this.shopName = this.shopData[0].value;
          //						}else{
          //							this.shopName = "";
          //						}
          this.confirmMoneyType = "1";
          this.activeConfirm = "confirmErp";

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
    confirmMoneyFn() {
      this.tempCode = `${this.invoiceInfo.id}${Date.parse(new Date())}`;
      this.$apiCall(
        "api.Invoice.setSyncToErp",
        {
          invoiceId: this.invoiceInfo.id,
          shopName: this.shopName,
          tempCode: this.tempCode,
        },
        (r) => {}
      );
      this.DialogLoadingCnt.loadingCnt = 0;
      this.DialogLoadingCnt.isShow = true;
      this.getInvocieTime = setInterval(() => {
        this.$apiCall(
          "api.Invoice.checkPriceResult",
          {
            tempCode: this.tempCode,
            type: 4,
          },
          (r) => {
            if (r.ErrorCode == "9999") {
              let re = r.Data.Results;
              if (Number(re.count) && Number(re.total))
                this.DialogLoadingCnt.loadingCnt = re.count / re.total;
              if (re.status != 1) {
                this.tempCode = "";
                clearInterval(this.getInvocieTime);
                this.DialogLoadingCnt.isShow = false;
                if (re.status == 3) {
                  //报错
                  this.$elementMessage(re.message, "error");
                }
                if (re.status == 2) {
                  //成功
                  this.$elementMessage(this.$t("invoice.storeSet"), "success");
                  this.confirmMoneyOpen = false;
                  this.getData();
                }
              }
            }
          }
        );
      }, 1000);
    },
    confirmMoneyOnly(type) {
      this.$showLoading();
      this.$apiCall(
        "api.Invoice.setPayed",
        {
          invoiceId: this.invoiceInfo.id,
          shopName: this.shopName,
        },
        (r) => {
          this.$hideLoading();
          if (r.ErrorCode == "9999") {
            this.$elementMessage(this.$t("invoice.successConfirm"), "success");
            this.getData();
            //						if(!localStorage.getItem("invoiceConfirmTourFlag")){
            //
            //						}
            if (type == 1) {
              $("#messageContainer").css("display", "none");
              setTimeout(() => {
                this.invoiceConfirmTourShow1 = true;
                this.$tours["invoiceConfirmTour1"].start();
              }, 1000);
            } else {
              $(".page-footer-fixed").addClass("show-hover");
              this.invoiceConfirmTourShow = true;
              setTimeout(() => {
                this.$tours["invoiceConfirmTour"].start();
              }, 1000);
            }
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        }
      );
    },
    toSendInvoice(close) {
      if (!this.invoiceTour) return;
      this.sendInvoiceOpen = true;
      this.activeShareName = "shareLink";
      if (close) this.dialogZeroAlert.isShow = false;
    },
    sendInvoice() {
      this.loading = true;
      this.$apiCall(
        "api.Invoice.checkItemPrice",
        { invoiceId: this.invoiceInfo.id },
        (r) => {
          this.loading = false;
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
            } else {
              this.toSendInvoice();
            }
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    invoicePreview(url) {
      let newWin = window.open("/blank.html", "invoicePreview");
      newWin.location.href = url;
    },
    changeShowType(type) {
      if (this.showType == type) return;
      this.showType = type;
      this.tabcChange(this.showType);
    },
    getRowKey(row) {
      return row.id;
    },
    rowClick(row, event, column) {
      //控制展开行
      if (row.fulfillStatus !== "1") return;

      const NoIndex = column.type.indexOf("expand");
      if (NoIndex == 0 && row.allItems.length <= 0) {
        this.expands = [];
        return;
      }
      if (row.allItems.length > 0) {
        //		            Array.prototype.remove = function(val) {
        //			            let index = this.indexOf(val);
        //			            if (index > -1) {
        //			                this.splice(index, 1);
        //			            }
        //		            };
        //		            if (this.expands.indexOf(row.id) < 0) {  //确保只展开一行
        //		                this.expands.shift();
        //		                this.expands.push(row.id);
        //		            } else {
        //		                this.expands.remove(row.id);
        //		            }
        if (this.expands.indexOf(row.id) < 0) {
          this.expands.push(row.id);
        }
      } else {
        return;
      }
    },
    expandChange(row, expandedRows) {
      this.expands = [];
      if (expandedRows.length) {
        expandedRows.forEach((e, i) => {
          if (e.fulfillStatus === "1") {
            this.expands.push(e.id);
          }
        });
        this.expands = Array.from(new Set(this.expands));
      } else {
        this.expands = [];
      }
    },
    stopDistributorTour() {
      this.invoiceTour = true;
      this.$tours["invoiceTour"].stop();
      localStorage.setItem("invocieTourFlag", true);
      $(".el-scrollbar__wrap").scrollTop(0);
      this.page = 1;
      this.getDataAll();
    },
    stopConfirmTour() {
      this.invoiceConfirmTourShow = false;
      this.$tours["invoiceConfirmTour"].stop();
      $(".page-footer-fixed").removeClass("show-hover");
      //		      	localStorage.setItem("invoiceConfirmTourFlag", true);
    },
    stopConfirmTour1() {
      this.invoiceConfirmTourShow1 = false;
      this.$tours["invoiceConfirmTour1"].stop();
      $("#messageContainer").css("display", "block");
    },
    opendrawer(type) {
      this.drawertype = type;
      this.$showLoading();
      if (type == 3) {
        //					this.drawerTitle = "订单信息导入导出";
        this.drawerTitle = this.$t("invoice.exportImport");
        this.showCustom = false;
        this.activeName = "first";
        this.uploadfileList = [];
        this.modalCustomExport = JSON.parse(this.modalCustomExportDefault);
        this.$apiCall("api.Invoice.exportTitle", {}, (r) => {
          this.$hideLoading();
          if (r.ErrorCode == "9999") {
            this.drawer = true;
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
      } else if (type == 2) {
        this.drawerTitle = this.$t("invoice.Helpcenter");
        if (!localStorage.getItem("invocieTourFlag")) {
          if (this.tabActive != 2) {
            if (!document.querySelectorAll(".step-btn-4").length) {
              for (let i = 0; i < this.steps.length; i++) {
                if (this.steps[i].target == ".step-btn-4") {
                  this.steps.splice(i, 1);
                  i--;
                }
              }
            }
            this.$tours["invoiceTour"].start();
          } else {
            this.drawer = true;
            this.$hideLoading();
          }
        } else {
          this.drawer = true;
          this.$hideLoading();
        }
      } else {
        this.drawerTitle = this.$t("invoice.Orderstatistics");
        this.$apiCall(
          "api.Invoice.getSummary",
          {
            invoiceId: this.invoiceInfo.id,
          },
          (r) => {
            this.$hideLoading();
            if (r.ErrorCode == "9999") {
              this.drawer = true;
              this.drawerinfo = r.Data.Results;
            } else {
              this.$elementMessage(r.Message, "error");
              if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                this.$userFailure(this);
              }
            }
          }
        );
      }
    },
    handleScroll() {
      let _self = this;
      let scrollbarEl = this.$refs.myScrollbar1.wrap;
      let offsetTop = $(".invoice #invoiceContainer").offset().top;
      let height = $(".invoice #invoiceContainer").outerHeight();
      scrollbarEl.onscroll = () => {
        $(".el-popover").remove();
        if (localStorage.getItem("invocieTourFlag")) {
          if ($(".el-scrollbar__wrap").scrollTop() >= 410) {
            if (
              $(".el-scrollbar__wrap").scrollTop() +
                $(".el-scrollbar__wrap").height() >=
              $("#invoiceContainer").height() + $(window).height() - 400
            ) {
              if (this.noMore) {
                setTimeout(() => {
                  $(".table-fixed").removeClass("scrolling");
                  $(".invoice-top").css({
                    display: "block",
                    height: "0",
                  });
                }, 100);
              }
            } else {
              setTimeout(() => {
                $(".table-fixed").addClass("scrolling");
                $(".invoice-top").css({
                  display: "none",
                  height: "0",
                });
              }, 100);
            }
          } else {
            setTimeout(() => {
              $(".table-fixed").removeClass("scrolling");
              $(".invoice-top").css("display", "block");
              if ($(".el-scrollbar__wrap").scrollTop() == 0) {
                $(".invoice-top").css({
                  display: "block",
                  height: "60px",
                });
              }
            }, 100);
          }
        }

        if (
          $(".el-scrollbar__wrap").scrollTop() +
            $(".el-scrollbar__wrap").height() >=
          $("#invoiceContainer").height() - 10
        ) {
          if (this.noMore) {
            setTimeout(() => {
              $(".page-footer-fixed").css("display", "none");
            }, 100);
          }
        } else {
          setTimeout(() => {
            $(".page-footer-fixed").css("display", "block");
          }, 100);
        }

        if (
          $(".el-scrollbar__wrap").scrollTop() +
            $(".el-scrollbar__wrap").height() >=
          $(".el-scrollbar__view").height() - 100
        ) {
          if (this.noMore) {
            setTimeout(() => {
              if (!this.operateLog.length) {
                this.getOperateLog(this.invoiceInfo.id);
              } else {
                this.nextPage();
              }
              this.getMessages(this.invoiceInfo.id);
            }, 300);
          }
        }
      };
    },
    previewInvoice() {
      const { href } = this.$router.resolve({
        name: "preview",
        query: {
          uniCode: this.uniCode,
          preview: 1,
        },
      });
      window.open(href, "_blank");
      //				this.$router.push({ name: "preview", query: {uniCode: this.uniCode,preview:1} });
    },
    setPayment() {
      if (!this.invoiceTour) return;
      //				if(this.paymentType == 2 && !this.payUrl){
      //					this.$elementMessage("请输入线上商品代拍链接", 'error');
      //					return;
      //				}
      this.$showLoading();
      this.$apiCall(
        "api.Invoice.setPayment",
        {
          invoiceId: this.invoiceInfo.id,
          paymentType: this.paymentType,
          payUrl: this.payUrl,
          platformRate: this.platformRate,
        },
        (r) => {
          this.$hideLoading();
          if (r.ErrorCode == "9999") {
            this.$elementMessage(this.$t("invoice.successPayment"), "success");
            this.getData();
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        }
      );
    },
    getSkuInfo2(item, index, type) {
      if (!this.invoiceTour) return;
      if (window.lazyGetSkuInfo2) {
        window.clearTimeout(window.lazyGetSkuInfo2);
      }
      let skuDom = `popoverSkuGroup-${index}`;
      this.invoiceData.forEach((e, i) => {
        let skuDom1 = `popoverSkuGroup-${i}`;
        if (this.$refs[skuDom1]) {
          this.$refs[skuDom1].doClose();
        }
      });
      window.lazyGetSkuInfo2 = setTimeout(() => {
        this.$apiCall(
          "api.Invoice.getSameCnt",
          {
            invoiceId: this.invoiceInfo.id,
            customerSku: item.customerSku,
            type: "sku",
          },
          (r) => {
            if (r.ErrorCode == "9999") {
              this.$set(item, "sameCntSku", r.Data.Results.sameCnt);
              this.$set(item, "noneCntSku", r.Data.Results.noneCnt);
              if (r.Data.Results.sameCnt > 1 && this.$refs[skuDom]) {
                this.$refs[skuDom].doShow();
              }
            } else {
              this.$elementMessage(r.Message, "error");
              if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                this.$userFailure(this);
              }
            }
          }
        );
      }, 400);
    },
    getSkuInfo(item, index, type) {
      if (!this.invoiceTour) return;
      if (window.lazyGetSkuInfo) {
        window.clearTimeout(window.lazyGetSkuInfo);
      }
      let skuDom = `popoverSku-${index}`;
      this.invoiceData.forEach((e, i) => {
        let skuDom1 = `popoverSku-${i}`;
        if (this.$refs[skuDom1]) {
          this.$refs[skuDom1].doClose();
        }
      });
      window.lazyGetSkuInfo = setTimeout(() => {
        this.$apiCall(
          "api.Invoice.getSameCnt",
          {
            invoiceId: this.invoiceInfo.id,
            customerSku: item.customerSku,
            type: "sku",
          },
          (r) => {
            if (r.ErrorCode == "9999") {
              this.$set(item, "sameCntSku", r.Data.Results.sameCnt);
              this.$set(item, "noneCntSku", r.Data.Results.noneCnt);
              if (r.Data.Results.sameCnt > 1 && this.$refs[skuDom]) {
                this.$refs[skuDom].doShow();
              }
            } else {
              this.$elementMessage(r.Message, "error");
              if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                this.$userFailure(this);
              }
            }
          }
        );
      }, 400);
    },
    getPriceInfo(item, index, type) {
      if (!this.invoiceTour) return;
      if (window.lazyGetPriceInfo) {
        window.clearTimeout(window.lazyGetPriceInfo);
      }
      if (type == "popoverPriceGroup") {
        let skuDom = `popoverPriceGroup-${index}`;
        this.invoiceData.forEach((e, i) => {
          let skuDom1 = `popoverPriceGroup-${i}`;
          if (this.$refs[skuDom1]) {
            this.$refs[skuDom1].doClose();
          }
        });
        if (item.cnt > 1 && this.$refs[skuDom]) {
          this.$refs[skuDom].doShow();
        }
        return;
      }
      let skuDom = `popoverPrice-${index}`;
      this.invoiceData.forEach((e, i) => {
        let skuDom1 = `popoverPrice-${i}`;
        if (this.$refs[skuDom1]) {
          this.$refs[skuDom1].doClose();
        }
      });
      window.lazyGetPriceInfo = setTimeout(() => {
        this.$apiCall(
          "api.Invoice.getSameCnt",
          {
            invoiceId: this.invoiceInfo.id,
            customerSku: item.customerSku,
            type: "price",
          },
          (r) => {
            if (r.ErrorCode == "9999") {
              this.$set(item, "sameCntPrice", r.Data.Results.sameCnt);
              this.$set(item, "noneCntPrice", r.Data.Results.noneCnt);
              if (r.Data.Results.sameCnt > 1 && this.$refs[skuDom]) {
                this.$refs[skuDom].doShow();
              }
            } else {
              this.$elementMessage(r.Message, "error");
              if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                this.$userFailure(this);
              }
            }
          }
        );
      }, 400);
    },
    getPriceInfo2(item, index, type) {
      if (!this.invoiceTour) return;
      if (window.lazyGetPriceInfo2) {
        window.clearTimeout(window.lazyGetPriceInfo2);
      }
      let skuDom = `popoverPriceGroup-${index}`;
      this.invoiceData.forEach((e, i) => {
        let skuDom1 = `popoverPriceGroup-${i}`;
        if (this.$refs[skuDom1]) {
          this.$refs[skuDom1].doClose();
        }
      });
      window.lazyGetPriceInfo2 = setTimeout(() => {
        this.$apiCall(
          "api.Invoice.getSameCnt",
          {
            invoiceId: this.invoiceInfo.id,
            customerSku: item.customerSku,
            type: "price",
          },
          (r) => {
            if (r.ErrorCode == "9999") {
              this.$set(item, "sameCntPrice", r.Data.Results.sameCnt);
              this.$set(item, "noneCntPrice", r.Data.Results.noneCnt);
              if (r.Data.Results.sameCnt > 1 && this.$refs[skuDom]) {
                this.$refs[skuDom].doShow();
              }
            } else {
              this.$elementMessage(r.Message, "error");
              if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                this.$userFailure(this);
              }
            }
          }
        );
      }, 400);
    },
    selectEmoji(emoji) {
      console.log(emoji);
    },
    toFixed(value) {
      if (!value || value == "") return "0.00";
      return Number(value).toFixed(2);
    },
    changeShippingAmount() {
      this.$apiCall(
        "api.Invoice.changeAmount",
        {
          invoiceId: this.invoiceInfo.id,
          shippingAmount: this.shippingAmount,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            this.shippingAmount = r.Data.Results.shippingAmount
              ? this.toFixed(r.Data.Results.shippingAmount)
              : "";
            this.totalAmount = r.Data.Results.totalAmount
              ? this.toFixed(r.Data.Results.totalAmount)
              : "";
            this.realAmount = r.Data.Results.realAmount
              ? this.toFixed(r.Data.Results.realAmount)
              : "";
            if (
              Number(this.realAmount) < Number(this.totalAmount) &&
              Number(this.realAmount) > 0
            ) {
              this.discount = this.toFixed(
                Number(this.totalAmount) - Number(this.realAmount)
              );
            } else {
              this.discount = 0;
            }
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        }
      );
      //				if(window.changeShipping) {
      //					window.clearTimeout(window.changeShipping)
      //				}
      //				window.changeShipping = setTimeout(() => {
      //
      //				}, 400)
    },
    changeRealAmount() {
      if (Number(this.realAmount) > Number(this.totalAmount)) {
        this.$elementMessage(this.$t("invoice.smallnum"), "error");
        this.discount = 0;
        return;
      }
      this.$apiCall(
        "api.Invoice.changeAmount",
        {
          invoiceId: this.invoiceInfo.id,
          realAmount: this.realAmount,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            this.shippingAmount = r.Data.Results.shippingAmount
              ? this.toFixed(r.Data.Results.shippingAmount)
              : "";
            this.totalAmount = r.Data.Results.totalAmount
              ? this.toFixed(r.Data.Results.totalAmount)
              : "";
            this.realAmount = r.Data.Results.realAmount
              ? this.toFixed(r.Data.Results.realAmount)
              : "";
            if (
              Number(this.realAmount) < Number(this.totalAmount) &&
              Number(this.realAmount) > 0
            ) {
              this.discount = this.toFixed(
                Number(this.totalAmount) - Number(this.realAmount)
              );
            } else {
              this.discount = 0;
            }
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        }
      );
      //				if(window.changeReal) {
      //					window.clearTimeout(window.changeReal)
      //				}
      //				window.changeReal = setTimeout(() => {
      //
      //				}, 400)
    },
    setResource(res) {
      this.form.resource = res;
    },
    setDefaultResource() {
      this.stopResource = 1;
    },
    setStopResource(res) {
      this.stopResource = res;
    },
    setStop(item, status) {
      // console.log(item, status)
      this.$showLoading();
      let params = {
        fulfillStatus: status,
        invoiceId: this.invoiceInfo.id,
        reason: this.stopResource,
      };
      if (item.allItems == null) {
        params = {
          ...params,
          itemId: item.id,
        };
      } else {
        const setNotShip = [];
        item.allItems.forEach((item) => {
          if (item.fulfillStatus === "1") {
            setNotShip.push(item.id);
          }
        });
        params = {
          ...params,
          itemIds: setNotShip,
        };
      }

      this.$apiCall("api.Invoice.setFulfill", params, (r) => {
        this.$hideLoading();
        if (r.ErrorCode == "9999") {
          this.itemAmount = r.Data.Results.itemAmount
            ? this.toFixed(r.Data.Results.itemAmount)
            : "";
          this.totalAmount = r.Data.Results.totalAmount
            ? this.toFixed(r.Data.Results.totalAmount)
            : "";
          this.realAmount = r.Data.Results.realAmount
            ? this.toFixed(r.Data.Results.realAmount)
            : "";
          $(".el-popover").remove();
          this.$elementMessage(
            this.$t("invoice.successModification"),
            "success"
          );
          this.getCnt(this.invoiceInfo.id);
          if (item.allItems == null) {
            this.updateSuccessOnly(item.id);
          } else {
            // this.tabcChange(this.showType);
            this.invoiceData = this.invoiceData.map((value) => {
              if (item.customerSku === value.customerSku) {
                return {
                  ...value,
                  fulfillStatus: status.toString(),
                };
              }
              return value;
            });
            this.expands = this.expands.filter((v) => v !== item.id);
          }
        } else {
          this.$elementMessage(r.Message, "error");
          if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
            this.$userFailure(this);
          }
        }
      });
    },
    updateSuccessOnly(id) {
      this.getData();
      console.log(3, {
        invoiceId: this.invoiceInfo.id,
        id: id,
      });
      this.$apiCall(
        "api.Invoice.getItems",
        {
          invoiceId: this.invoiceInfo.id,
          id: id,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            if (r.Data.Results.length == 0) return;
            this.invoiceData.forEach((e, i) => {
              if (e.id == id) {
                this.invoiceData.splice(i, 1, r.Data.Results[0]);
              }
            });
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        }
      );
    },
    changeSkuBatch(item) {
      //批量更换sku
      if (!this.invoiceTour) return;
      if (!item.sku) {
        this.$elementMessage(this.$t("invoice.fillsku"), "error");
        return;
      }
      if (this.form.resource == 2 && item.sameCntSku == 0) {
        $(".el-popover").remove();
        return;
      }
      if (this.form.resource == 1 && item.noneCntSku == 0) {
        $(".el-popover").remove();
        return;
      }
      if (window.lazySkuBatch) {
        window.clearTimeout(window.lazySkuBatch);
      }
      window.lazySkuBatch = setTimeout(() => {
        let params = {
          type: this.form.resource == 1 ? "onlyNone" : "batch",
          invoiceId: this.invoiceInfo.id,
          customerSku: item.customerSku,
          sku: item.sku,
          price: item.price,
        };
        if (this.tabActive == 2) {
          params.fromGroup = true;
          params.type = "batch";
        }
        this.$apiCall("api.Invoice.setSku", params, (r) => {
          if (r.ErrorCode == "9999") {
            $(".el-popover").remove();
            this.$elementMessage(this.$t("invoice.successsetsku"), "success");
            if (this.form.resource == 1) {
              //未设置SKU的同款
              this.invoiceData.forEach((e, t) => {
                if (
                  e.customerSku == item.customerSku &&
                  !e.sku &&
                  e.fulfillStatus != 2
                ) {
                  this.$set(e, "sku", item.sku);
                }
              });
            } else {
              //所有
              this.invoiceData.forEach((e, t) => {
                if (e.customerSku == item.customerSku && e.fulfillStatus != 2) {
                  this.$set(e, "sku", item.sku);
                }
              });
            }
            this.getCnt(this.invoiceInfo.id);
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        });
      }, 400);
    },
    changeSkuFn(item, index, type) {
      //更换sku
      if (!this.invoiceTour) return;
      if (!item.sku) {
        this.$elementMessage(this.$t("invoice.fillsku"), "error");
        return;
      }
      if (window.lazySku) {
        window.clearTimeout(window.lazySku);
      }
      window.lazySku = setTimeout(() => {
        let params = {
          type: "onlyOne",
          invoiceId: this.invoiceInfo.id,
          customerSku: item.customerSku,
          sku: item.sku,
          itemId: item.id,
          price: item.price,
        };
        if (this.tabActive == 2) {
          params.fromGroup = true;
          params.type = "batch";
        }
        this.$apiCall("api.Invoice.setSku", params, (r) => {
          if (r.ErrorCode == "9999") {
            this.getCnt(this.invoiceInfo.id);
            this.invoiceData.forEach((e, t) => {
              if (e.id == item.id) {
                if (e.allItems && e.allItems.length && this.tabActive == 2) {
                  this.updateAllSuccess(t, "sku");
                }
              }
            });
            if (type == "close") {
              $(".el-popover").remove();
            }
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        });
      }, 400);
    },
    changeSkuFnBySub(item) {
      //更换sku
      if (!this.invoiceTour) return;
      if (!item.sku) {
        this.$elementMessage(this.$t("invoice.fillsku"), "error");
        return;
      }
      if (window.lazySkuSub) {
        window.clearTimeout(window.lazySkuSub);
      }
      window.lazySkuSub = setTimeout(() => {
        let params = {
          type: "onlyOne",
          invoiceId: this.invoiceInfo.id,
          customerSku: item.customerSku,
          sku: item.sku,
          itemId: item.id,
          price: item.price,
        };
        this.$apiCall("api.Invoice.setSku", params, (r) => {
          if (r.ErrorCode == "9999") {
            this.getCnt(this.invoiceInfo.id);
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        });
      }, 400);
    },
    changePriceBatch(item) {
      //批量修改价格
      if (!this.invoiceTour) return;
      if (!item.price) return;
      if (this.formPrice.resource == 2 && item.sameCntPrice == 0) {
        $(".el-popover").remove();
        return;
      }
      if (this.formPrice.resource == 1 && item.noneCntPrice == 0) {
        $(".el-popover").remove();
        return;
      }
      if (window.lazyPriceBatch) {
        window.clearTimeout(window.lazyPriceBatch);
      }
      window.lazyPriceBatch = setTimeout(() => {
        let params = {
          type: this.formPrice.resource == 1 ? "onlyNone" : "batch",
          invoiceId: this.invoiceInfo.id,
          customerSku: item.customerSku,
          price: item.price,
          sku: item.sku,
        };
        if (this.tabActive == 2) {
          params.fromGroup = true;
          params.type = "batch";
        }
        this.$apiCall("api.Invoice.setPrice", params, (r) => {
          if (r.ErrorCode == "9999") {
            $(".el-popover").remove();
            this.$elementMessage(this.$t("invoice.successsetprice"), "success");
            if (this.formPrice.resource == 1) {
              //未设置SKU的同款
              this.invoiceData.forEach((e, t) => {
                if (
                  e.customerSku == item.customerSku &&
                  !e.price &&
                  e.fulfillStatus != 2
                ) {
                  this.$set(e, "price", Number(item.price).toFixed(2));
                  if (!e.price) {
                    this.$set(e, "amount", "");
                  } else {
                    if (e.fulfillStatus != 2) {
                      this.$set(
                        e,
                        "amount",
                        (Number(e.quantity) * Number(e.price)).toFixed(2)
                      );
                    } else {
                      this.$set(e, "amount", "0.00");
                    }
                  }
                }
              });
            } else {
              //所有
              this.invoiceData.forEach((e, t) => {
                if (e.customerSku == item.customerSku && e.fulfillStatus != 2) {
                  this.$set(e, "price", Number(item.price).toFixed(2));
                  if (!e.price) {
                    this.$set(e, "amount", "");
                  } else {
                    if (e.fulfillStatus != 2) {
                      this.$set(
                        e,
                        "amount",
                        (Number(e.quantity) * Number(e.price)).toFixed(2)
                      );
                    } else {
                      this.$set(e, "amount", "0.00");
                    }
                  }
                }
              });
            }
            this.itemAmount = r.Data.Results.itemAmount
              ? this.toFixed(r.Data.Results.itemAmount)
              : "";
            this.totalAmount = r.Data.Results.totalAmount
              ? this.toFixed(r.Data.Results.totalAmount)
              : "";
            this.realAmount = r.Data.Results.realAmount
              ? this.toFixed(r.Data.Results.realAmount)
              : "";
            this.getCnt(this.invoiceInfo.id);
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        });
      }, 400);
    },
    changePriceFn(item, i, type) {
      //修改价格
      if (this.expands.length) {
        this.expands = [];
      }
      if (!this.invoiceTour) return;
      if (!item.price) return;
      if (window.lazyPrice) {
        window.clearTimeout(window.lazyPrice);
      }
      window.lazyPrice = setTimeout(() => {
        let params = {
          type: "onlyOne",
          invoiceId: this.invoiceInfo.id,
          customerSku: item.customerSku,
          price: item.price,
          itemId: item.id,
          sku: item.sku,
        };
        if (this.tabActive == 2) {
          params.fromGroup = true;
          params.type = "batch";
        }
        this.$apiCall("api.Invoice.setPrice", params, (r) => {
          if (r.ErrorCode == "9999") {
            this.invoiceData.forEach((e, t) => {
              if (e.id == item.id) {
                if (e.fulfillStatus != 2) {
                  this.$set(e, "price", Number(item.price).toFixed(2));
                  if (!e.price) {
                    this.$set(e, "amount", "");
                  } else {
                    if (e.fulfillStatus != 2) {
                      this.$set(
                        e,
                        "amount",
                        (Number(e.quantity) * Number(e.price)).toFixed(2)
                      );
                    } else {
                      this.$set(e, "amount", "0.00");
                    }
                  }
                }
                if (e.allItems && e.allItems.length && this.tabActive == 2) {
                  this.updateAllSuccess(t, "price");
                }
              }
            });
            this.itemAmount = r.Data.Results.itemAmount
              ? this.toFixed(r.Data.Results.itemAmount)
              : "";
            this.totalAmount = r.Data.Results.totalAmount
              ? this.toFixed(r.Data.Results.totalAmount)
              : "";
            this.realAmount = r.Data.Results.realAmount
              ? this.toFixed(r.Data.Results.realAmount)
              : "";
            this.getCnt(this.invoiceInfo.id);
            if (type == "close") {
              $(".el-popover").remove();
            }
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        });
      }, 400);
    },
    changePriceTotalFn(item, i) {
      //修改价格
      if (!this.invoiceTour) return;
      if (window.lazyPriceTotal) {
        window.clearTimeout(window.lazyPriceTotal);
      }
      window.lazyPriceTotal = setTimeout(() => {
        let params = {
          type: "onlyOne",
          invoiceId: this.invoiceInfo.id,
          customerSku: item.customerSku,
          totalPrice: item.amount,
          itemId: item.id,
          sku: item.sku,
        };
        this.$apiCall("api.Invoice.setPrice", params, (r) => {
          if (r.ErrorCode == "9999") {
            this.invoiceData.forEach((e, t) => {
              if (e.id == item.id) {
                if (e.fulfillStatus != 2) {
                  this.$set(
                    e,
                    "price",
                    Number(r.Data.Results.price).toFixed(2)
                  );
                  if (!e.price) {
                    this.$set(e, "amount", "");
                  } else {
                    if (e.fulfillStatus != 2) {
                      this.$set(
                        e,
                        "amount",
                        (Number(e.quantity) * Number(e.price)).toFixed(2)
                      );
                    } else {
                      this.$set(e, "amount", "0.00");
                    }
                  }
                }
              }
            });
            this.itemAmount = r.Data.Results.itemAmount
              ? this.toFixed(r.Data.Results.itemAmount)
              : "";
            this.totalAmount = r.Data.Results.totalAmount
              ? this.toFixed(r.Data.Results.totalAmount)
              : "";
            this.realAmount = r.Data.Results.realAmount
              ? this.toFixed(r.Data.Results.realAmount)
              : "";
            this.getCnt(this.invoiceInfo.id);
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        });
      }, 400);
    },
    changePriceTotalFnBySub(props, item) {
      //修改价格
      let index = props.$index;
      if (window.lazyPriceTotalSub) {
        window.clearTimeout(window.lazyPriceTotalSub);
      }
      window.lazyPriceTotalSub = setTimeout(() => {
        let params = {
          type: "onlyOne",
          invoiceId: this.invoiceInfo.id,
          customerSku: item.customerSku,
          totalPrice: item.amount,
          itemId: item.id,
          sku: item.sku,
        };
        this.$apiCall("api.Invoice.setPrice", params, (r) => {
          if (r.ErrorCode == "9999") {
            this.invoiceData[index].allItems.forEach((e, t) => {
              if (e.id == item.id) {
                this.$set(e, "price", Number(r.Data.Results.price).toFixed(2));
                if (!e.price) {
                  this.$set(e, "amount", "");
                } else {
                  if (e.fulfillStatus != 2) {
                    this.$set(
                      e,
                      "amount",
                      (Number(e.quantity) * Number(e.price)).toFixed(2)
                    );
                  } else {
                    this.$set(e, "amount", "0.00");
                  }
                }
              }
            });
            this.itemAmount = r.Data.Results.itemAmount
              ? this.toFixed(r.Data.Results.itemAmount)
              : "";
            this.totalAmount = r.Data.Results.totalAmount
              ? this.toFixed(r.Data.Results.totalAmount)
              : "";
            this.realAmount = r.Data.Results.realAmount
              ? this.toFixed(r.Data.Results.realAmount)
              : "";
            this.getCnt(this.invoiceInfo.id);
            this.updateSuccess(index);
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        });
      }, 400);
    },
    updateAllSuccess(index, type) {
      let amount = [],
        qty = [],
        amounts = 0,
        quantity = 0;
      this.invoiceData[index].allItems.map((s) => {
        if (s.fulfillStatus != 2) {
          if (type == "sku") {
            this.$set(s, "sku", this.invoiceData[index].sku);
          } else {
            this.$set(s, "price", this.invoiceData[index].price);

            if (!s.price) {
              this.$set(s, "amount", "");
            } else {
              if (s.fulfillStatus != 2) {
                this.$set(
                  s,
                  "amount",
                  (Number(s.quantity) * Number(s.price)).toFixed(2)
                );
              } else {
                this.$set(s, "amount", "0.00");
              }
            }
          }
        }
      });
    },
    setPriceResource(res) {
      this.formPrice.resource = res;
    },
    removelogo() {
      this.pageLoading = true;
      this.$apiCall(
        "api.User.changeByUser",
        {
          invoiceId: this.invoiceInfo.id,
          logo: "",
        },
        (r) => {
          this.pageLoading = false;
          if (r.ErrorCode == "9999") {
            this.$elementMessage(this.$t("invoice.successdeleted"), "success");
            this.getData();
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        }
      );
    },
    handleUploadChange(file) {
      this.uploadfileList = [];
      this.uploadfileList.push(file);
    },
    submitUpload() {
      if (this.exportInvoiceType == "fourth") {
        this.drawer = false;
        setTimeout(() => {
          this.$router.push({
            name: "importData",
            query: {
              rid: this.invoiceInfo.relationshipId,
              id: this.invoiceInfo.id,
            },
          });
          //						let routeData = this.$router.resolve({
          //			              name: "importData",
          //			              query: { rid:this.invoiceInfo.relationshipId,id:this.invoiceInfo.id, },
          //			            });
          //			            window.open(routeData.href, "_self");
          localStorage.removeItem("fromPageReload");
        }, 100);
        return;
      }
      if (!this.uploadfileList.length) {
        this.$elementMessage(this.$t("invoice.selectfile"), "error");
        return;
      }
      this.uploadLoading = true;
      let uploadFile = this.uploadfileList[0].raw;
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
        invoiceId: this.invoiceInfo.id,
        "@file": uploadFile,
      };
      this.$apiCall(apiUrl, param, (r) => {
        this.uploadLoading = false;
        if (r.ErrorCode == "9999") {
          this.drawer = false;
          //						if(!r.Data.Results.file){
          //							this.$elementMessage("导入成功", 'success');
          //							this.page = 1;
          //							this.getDataAll();
          //							return
          //						}
          this.$elementMessage(this.$t("invoice.successImport"), "success");
          openDownload(r.Data.Results.file);
          this.page = 1;
          this.getDataAll();
        } else {
          this.$elementMessage(r.Message, "error");
          if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
            this.$userFailure(this);
          }
        }
      });
    },
    uploadSectionFile2(params) {
      let uploadFile = params.file;
      const isLt = uploadFile.size / 1024 / 1024 < 0.5;
      if (!isLt) {
        this.$message.error(this.$t("invoice.size500"));
        return;
      }
      this.$apiCall(
        "api.User.uploadImg",
        {
          "@file": uploadFile,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            this.fileList.push({
              name: "test",
              url: r.Data.Results.imgUrl,
            });
          } else {
            this.pageLoading = false;
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        }
      );
    },
    uploadSectionFile(params) {
      let uploadFile = params.file;
      const isLt = uploadFile.size / 1024 / 1024 < 0.5;
      if (!isLt) {
        this.$message.error(this.$t("invoice.size500picture"));
        return;
      }
      this.pageLoading = true;
      this.$apiCall(
        "api.User.uploadImg",
        {
          "@file": uploadFile,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            this.changeLogoByUser(r.Data.Results.imgUrl);
          } else {
            this.pageLoading = false;
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        }
      );
    },
    changeLogoByUser(logo) {
      this.$apiCall(
        "api.User.changeByUser",
        {
          invoiceId: this.invoiceInfo.id,
          logo: logo,
        },
        (r) => {
          this.pageLoading = false;
          if (r.ErrorCode == "9999") {
            this.$elementMessage(
              this.$t("invoice.successModification"),
              "success"
            );
            this.getData();
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        }
      );
    },
    tabcChange(i) {
      this.invoiceData = [];
      this.tabActive = Number(i);
      i = Number(i);
      this.getCnt(this.invoiceInfo.id);
      // if(i == 5) {
      //   this.getOperateLog(this.invoiceInfo.id); //获取时间轴
      //   this.getMessages(this.invoiceInfo.id); //获取消息

      //   return;
      // }
      switch (i) {
        case 1:
          this.type = "all";
          this.showType = 1;
          break;
        case 2:
          this.type = "sku";
          break;
        case 3:
          this.tabActive = 1;
          this.type = "notBind";
          this.showType = 1;
          break;
        case 4:
          this.type = "notDeliver";
          this.showType = 1;
          break;
        case 5:
          this.type = "noQuantity";
          this.showType = 1;
          break;
        case 6:
          this.tabActive = 2;
          this.type = "groupNotBind";
          this.showType = 1;
          break;
        case 7:
          this.type = "noQuantity";
          this.showType = 1;
          break;
        case 8:
          this.type = "deliver";
          this.showType = 1;
          break;
        case 9:
          this.type = "abnormal";
          this.showType = 1;
          break;
        default:
          break;
      }
      this.page = 1;
      this.getInvoiceData(this.invoiceInfo.id);
    },
    changeTabByTip() {
      if (this.tabActive == 1) {
        this.type = "notBind";
      } else {
        this.type = "groupNotBind";
      }
      this.invoiceData = [];
      this.page = 1;
      this.getInvoiceData(this.invoiceInfo.id);
    },
    onCopy(e) {
      this.$elementMessage(this.$t("successfullyToClipboard"), "success");
    },
    onError(e) {
      this.$elementMessage(this.$t("failedToClipboard"), "error");
    },
    load() {
      let top = $(".el-scrollbar__wrap").scrollTop();
      if (this.page == 1) return;
      if (!this.invoiceInfo) return;
      let i = this.tabActive;
      if (!this.getListFlag) return;
      if (this.page > this.totalPage) {
        return;
      }
      if (!this.invoiceTour) return;
      this.loading = true;
      this.getListFlag = false;
      let param = {
        invoiceId: this.invoiceInfo.id,
        type: this.type,
        page: this.page,
        rowsPerPage: this.rowsPerPage,
      };
      if (this.type == "abnormal") {
        param.type = "all";
        param.isAbnormal = 1;
      }
      if (this.searchTrack) {
        param.trackNumber = this.searchNameInput;
      }
      if (this.searchName) {
        param.keySearch = this.searchNameInput;
      }

      this.$apiCall("api.Invoice.getItems", param, (r) => {
        $(".el-scrollbar__wrap").animate({ scrollTop: top }, 10);
        this.getListFlag = true;
        if (r.ErrorCode == "9999") {
          //						this.invoiceData = r.Data.Results;
          this.totalPage = r.Data.Pagination.totalPage;
          this.totalCount = r.Data.Pagination.totalCount;
          r.Data.Results.forEach((e, t) => {
            if (!e.price) {
              this.$set(e, "amount", "");
            } else {
              if (e.fulfillStatus != 2) {
                this.$set(
                  e,
                  "amount",
                  (Number(e.quantity) * Number(e.price)).toFixed(2)
                );
              } else {
                this.$set(e, "amount", "0.00");
              }
            }
            if (e.shippingFee == null) this.$set(e, "shippingFee", undefined);
            this.invoiceData.push(e);
          });
          setTimeout(() => {
            this.loading = false;
            this.page++;
          }, 300);
        } else {
          this.loading = false;
          this.$elementMessage(r.Message, "error");
          if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
            this.$userFailure(this);
          }
        }
      });
    },
    isCollapseFn() {
      this.isCollapse = !this.isCollapse;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getInvoiceData(id, name) {
      let param = {
        invoiceId: id,
        type: this.type,
        page: this.page,
        rowsPerPage: this.rowsPerPage,
      };
      if (this.type == "abnormal") {
        param.type = "all";
        param.isAbnormal = 1;
      }
      if (this.searchTrack) {
        param.trackNumber = name;
      }
      if (this.searchName) {
        param.keySearch = name;
      }
      this.$showLoading();
      this.$apiCall("api.Invoice.getItems", param, (r) => {
        this.$nextTick(() => {
          this.$hideLoading();
        });
        this.loading = false;
        if (r.ErrorCode == "9999") {
          this.invoiceData = [];
          this.transferData = [];
          this.totalPage = r.Data.Pagination.totalPage;
          this.totalCount = r.Data.Pagination.totalCount;
          if (this.totalPage == 1) {
            this.getOperateLog(this.invoiceInfo.id); //获取时间轴
            this.getMessages(this.invoiceInfo.id); //获取消息
          }
          r.Data.Results.forEach((e, t) => {
            if (e.allItems && e.allItems.length > 0) {
              this.$set(e, "displayItems", e.allItems.slice(0, 50));
              this.$set(e, "displayItemsPage", 1);
            }
            this.$set(e, "previewList", []);
            if (e.imgUrl) {
              e.previewList.push(e.imgUrl);
            }
            if (!e.price) {
              this.$set(e, "amount", "");
            } else {
              if (e.fulfillStatus != 2) {
                this.$set(
                  e,
                  "amount",
                  (Number(e.quantity) * Number(e.price)).toFixed(2)
                );
              } else {
                this.$set(e, "amount", "0.00");
              }
            }
            if (e.shippingFee == null) this.$set(e, "shippingFee", undefined);
            this.invoiceData.push(e);
          });

          this.invoiceData.forEach((item, index) => {
            this.transferData.push({
              label: `${item.sku}`,
              key: item.id,
              ...item,
            });
          });
          if (!localStorage.getItem("invocieTourFlag")) {
            if (this.tabActive != 2) {
              let arr = [];
              arr.push(this.invoiceData.shift());
              this.invoiceData = arr;
              setTimeout(() => {
                if (!document.querySelectorAll(".step-btn-4").length) {
                  for (let i = 0; i < this.steps.length; i++) {
                    if (this.steps[i].target == ".step-btn-4") {
                      this.steps.splice(i, 1);
                      i--;
                    }
                  }
                }
                this.$tours["invoiceTour"].start();
              }, 1000);
            }
          } else {
            // this.page++;
          }
          this.$refs.myScrollbar1.wrap.scrollTop = 0;
        } else {
          this.$elementMessage(r.Message, "error");
          if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
            this.$userFailure(this);
          }
        }
      });
    },
    getCnt(id) {
      this.$apiCall(
        "api.Invoice.getItemsCnt",
        {
          invoiceId: id,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            this.invoiceCnt = r.Data.Results;
            //						if(this.invoiceCnt.notBindCnt > 0 || (this.invoiceInfo.paymentType != 1 && this.invoiceInfo.paymentType != 2)){
            //							this.stepActive = 2;
            //						}
            //						if(this.invoiceCnt.notBindCnt == 0 && (this.invoiceInfo.paymentType == 1 || this.invoiceInfo.paymentType == 2)){
            //							this.stepActive = 3;
            //						}
            if (this.invoiceCnt.notBindCnt > 0) {
              this.stepActive = 2;
            }
            if (this.invoiceCnt.notBindCnt == 0) {
              this.stepActive = 3;
            }
            if (this.invoiceInfo.payStatus == 1) {
              this.stepActive = 4;
            }
            if (this.invoiceCnt.notDeliverCnt == 0) {
              this.stepActive = 5;
            }
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        }
      );
    },
    groupBy(arr) {
      var map = {},
        dest = [];
      for (var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if (!map[ai.date]) {
          dest.push({
            date: ai.date,
            listInfo: [ai],
          });
          map[ai.date] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj.date == ai.date) {
              dj.listInfo.push(ai);
              break;
            }
          }
        }
      }

      return dest;
    },
    getOperateLog(id) {
      let params = {
        invoiceId: id,
      };
      if (this.$i18n.locale == "en") params.lang = "EN";
      this.$apiCall("api.Invoice.getOperateLog", params, (r) => {
        if (r.ErrorCode == "9999") {
          this.operateLog = r.Data.Results;
          this.operateLog.forEach((e) => {
            this.$set(e, "date", this.$moment(e.time * 1000).format("MMMM Do"));
            this.$set(
              e,
              "datetime",
              this.$moment(e.time * 1000).format("h:mm a")
            );
          });

          this.totalPageLog = Math.ceil(
            this.operateLog.length / this.pageSizeLog
          );
          // 计算得0时设置为1
          this.totalPageLog = this.totalPageLog == 0 ? 1 : this.totalPageLog;
          this.setCurrentPageData();
          //						this.operateLog = this.groupBy(this.operateLog);
        } else {
          this.$elementMessage(r.Message, "error");
          if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
            this.$userFailure(this);
          }
        }
      });
    },
    setCurrentPageData() {
      let begin = (this.currentPageLog - 1) * this.pageSizeLog;
      let end = this.currentPageLog * this.pageSizeLog;
      this.currentPageDataLog = this.groupBy(this.operateLog.slice(0, end));
    },
    nextPage() {
      if (!this.getLogFlag) return;
      if (this.currentPageLog == this.totalPageLog) return;
      this.getLogFlag = false;
      this.currentPageLog++;
      this.setCurrentPageData();
      this.getLogFlag = true;
    },
    getMessages(id) {
      if (!this.getMsgFlag) return;
      if (this.msgpage > this.msgtotalPage) {
        return;
      }
      this.getMsgFlag = false;
      this.$apiCall(
        "api.Invoice.getMessages",
        {
          invoiceId: id,
          page: this.msgpage,
          rowsPerPage: this.msgrowsPerPage,
        },
        (r) => {
          this.getMsgFlag = true;
          if (r.ErrorCode == "9999") {
            this.msgtotalPage = r.Data.Pagination.totalPage;
            this.msgtotalCount = r.Data.Pagination.totalCount;
            r.Data.Results.forEach((e, t) => {
              this.messages.push(e);
            });

            this.$moment().locale("en");
            this.messages.forEach((e) => {
              this.$set(
                e,
                "date",
                this.$moment(e.timeCreated).format("MMMM Do")
              );
              this.$set(
                e,
                "datetime",
                this.$moment(e.timeCreated).format("h:mm a")
              );

              this.$set(
                e,
                "vname",
                !e.vendorName ? "n" : e.vendorName.substr(0, 1)
              );
              this.$set(
                e,
                "cname",
                !e.customerName ? "n" : e.customerName.substr(0, 1)
              );
            });
            this.currentmessages = this.groupBy(this.messages);
            this.currentmessages.forEach((e) => {
              e.listInfo.forEach((l) => {
                this.$set(l, "content", this.forMatMsg(l.content));
              });
            });
            this.msgpage++;
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        }
      );
    },
    forMatMsg(str) {
      let arr = str.split("emoji");
      let html = "";
      if (arr.length > 0) {
        arr.forEach((a) => {
          if (a != "") {
            if (a.indexOf(":") === 0 && a.lastIndexOf(":") === a.length - 1) {
              a = $.emojiarea.createIcon($.emojiarea.icons[a]);
            }
            html += `<span>${a}</span>`;
          }
        });
      } else {
        html = `<span>${str}</span>`;
      }
      return html;
    },
    addMessage() {
      let arr = [];
      if (this.fileList.length) {
        this.fileList.forEach((e) => {
          arr.push(e.url);
        });
      }
      let msgContent = $(".emoji-wysiwyg-editor").html();
      if (!msgContent && !this.fileList.length) {
        this.$elementMessage(this.$t("invoice.messageFill"), "error");
        return;
      }
      if (msgContent) {
        let imgReg = /<img.*?(?:>|\/>)/gi;
        // 匹配src属性
        let nameReg = /alt=[\'\"]?([^\'\"]*)[\'\"]?/i;
        let arr = msgContent.match(imgReg);

        if (!arr) {
          //						console.log(arr)
        } else {
          //						console.log('所有已成功匹配图片的数组：' + arr)
          for (let i = 0; i < arr.length; i++) {
            //					   console.log(arr[i])
            let names = arr[i].match(nameReg);
            // 获取图片地址
            if (names && names[1]) {
              //					    console.log('已匹配的图片地址' + (i + 1) + '：' + names[1])
              msgContent = msgContent.replace(
                arr[i],
                "emoji" + names[1] + "emoji"
              );
            }
          }
        }
      }
      this.$showLoading();
      this.$apiCall(
        "api.Invoice.addMessage",
        {
          invoiceId: this.invoiceInfo.id,
          content: msgContent,
          images: arr,
        },
        (r) => {
          this.$hideLoading();
          if (r.ErrorCode == "9999") {
            this.$elementMessage(this.$t("invoice.messageSend"), "success");
            this.msgContent = "";
            $(".emoji-wysiwyg-editor").empty();
            this.fileList = [];
            this.msgpage = 1;
            this.messages = [];
            //						this.getMessages(this.invoiceInfo.id);
            this.$apiCall(
              "api.Invoice.getMessages",
              {
                invoiceId: this.invoiceInfo.id,
                page: this.msgpage,
                rowsPerPage: this.msgrowsPerPage,
              },
              (r) => {
                if (r.ErrorCode == "9999") {
                  this.msgtotalPage = r.Data.Pagination.totalPage;
                  this.msgtotalCount = r.Data.Pagination.totalCount;
                  r.Data.Results.forEach((e, t) => {
                    this.messages.push(e);
                  });

                  this.$moment().locale("en");
                  this.messages.forEach((e) => {
                    this.$set(
                      e,
                      "date",
                      this.$moment(e.timeCreated).format("MMMM Do")
                    );
                    this.$set(
                      e,
                      "datetime",
                      this.$moment(e.timeCreated).format("h:mm a")
                    );
                    this.$set(
                      e,
                      "vname",
                      !e.vendorName ? "n" : e.vendorName.substr(0, 1)
                    );
                    this.$set(
                      e,
                      "cname",
                      !e.customerName ? "n" : e.customerName.substr(0, 1)
                    );
                  });
                  this.currentmessages = this.groupBy(this.messages);
                  this.currentmessages.forEach((e) => {
                    e.listInfo.forEach((l) => {
                      this.$set(l, "content", this.forMatMsg(l.content));
                    });
                  });
                  this.msgpage++;
                } else {
                  this.$elementMessage(r.Message, "error");
                  if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                    this.$userFailure(this);
                  }
                }
              }
            );
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        }
      );
    },
    removeMsgImg(i) {
      this.fileList.splice(i, 1);
    },
    openLogin() {
      this.loginShow = true;
    },
    getDataAll() {
      //初次加载
      this.$showLoading();
      $(".el-scrollbar__wrap").scrollTop(0);
      this.page = 1;
      this.showLogo = false;
      this.logoUrl = "";
      this.$apiCall(
        "api.Invoice.getOne",
        {
          uniCode: this.uniCode,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            this.invoiceInfo = r.Data.Results;
            this.getCntCountry();
            this.showItemPrice =
              this.invoiceInfo.showItemPrice == "1" ? true : false;
            if (this.invoiceInfo.code == "20010699") {
              this.$hideLoading();
              this.loginShow = true;
              this.loginRId = this.invoiceInfo;
              this.loginType = 3;
            } else if (this.invoiceInfo.code == "20010698") {
              this.$hideLoading();
              this.loginShow = true;
              this.loginRId = this.invoiceInfo;
              this.loginType = 4;
            } else {
              let userId = localStorage.getItem("apiUserId")
                  ? localStorage.getItem("apiUserId")
                  : "",
                userToken = localStorage.getItem("apiUserToken")
                  ? localStorage.getItem("apiUserToken")
                  : "";
              if (!userId || !userToken) {
                if (this.iframeId !== this.invoiceInfo.customerId) {
                  this.$hideLoading();
                  this.loginShow = true;
                  this.loginRId = this.invoiceInfo;
                  if (Number(this.invoiceInfo.vendorId) > 0) {
                    //登录
                    this.loginType = 1;
                  } else {
                    //注册
                    this.loginType = 2;
                  }
                }
                this.getInvoiceData(this.invoiceInfo.id); //获取第一页数据
              } else {
                if (this.page == 1) {
                  this.getInvoiceData(this.invoiceInfo.id); //获取第一页数据
                }
                this.getCnt(this.invoiceInfo.id); //获取tab栏数字
                this.getRelationship(); //获取客户类表
                this.showTopTip = true;
              }
            }

            this.shopName = this.invoiceInfo.shopName
              ? this.invoiceInfo.shopName
              : "";
            //分享标题
            this.shareTitle = this.invoiceInfo.remark
              ? this.invoiceInfo.remark.title
              : "";
            this.shareDesc = this.invoiceInfo.remark
              ? this.invoiceInfo.remark.desc
              : "";

            //logo
            if (this.invoiceInfo && this.invoiceInfo.logo) {
              this.showLogo = true;
              this.logoUrl = this.invoiceInfo.logo;
            }

            //付款方式、付款金额
            this.payUrl = this.invoiceInfo.payUrl
              ? this.invoiceInfo.payUrl
              : "";
            this.platformRate =
              this.invoiceInfo.platformRate && this.invoiceInfo.platformRate > 0
                ? this.invoiceInfo.platformRate
                : "";
            this.paymentType = this.invoiceInfo.paymentType
              ? this.invoiceInfo.paymentType
              : "";

            this.shippingAmount = this.invoiceInfo.shippingAmount
              ? this.toFixed(this.invoiceInfo.shippingAmount)
              : "";
            this.itemAmount = this.invoiceInfo.itemAmount
              ? this.toFixed(this.invoiceInfo.itemAmount)
              : "";
            this.totalAmount = this.invoiceInfo.totalAmount
              ? this.toFixed(this.invoiceInfo.totalAmount)
              : "";
            this.realAmount = this.invoiceInfo.realAmount
              ? this.toFixed(this.invoiceInfo.realAmount)
              : "";
          } else {
            this.$hideLoading();
            this.$elementMessage(r.Message, "error");

            //						this.$elementMessage(r.Message, 'error');
            //						if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
            //			              this.$userFailure(this);
            //			            }
            //登录
            //						this.$hideLoading();
            //						localStorage.removeItem('apiUserToken');
            //						localStorage.removeItem('apiUserId');
            //						localStorage.removeItem('userInfo');
            //						this.getDataAll();
          }
        }
      );
    },
    getData() {
      //更新invoice数据
      this.showLogo = false;
      this.logoUrl = "";
      this.$apiCall(
        "api.Invoice.getOne",
        {
          uniCode: this.uniCode,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            this.invoiceInfo = r.Data.Results;
            this.shopName = this.invoiceInfo.shopName
              ? this.invoiceInfo.shopName
              : "";
            //分享标题
            this.shareTitle = this.invoiceInfo.remark
              ? this.invoiceInfo.remark.title
              : "";
            this.shareDesc = this.invoiceInfo.remark
              ? this.invoiceInfo.remark.desc
              : "";
            //logo
            if (!this.invoiceInfo.logo) {
              this.showLogo = false;
              this.logoUrl = "";
            } else {
              this.showLogo = true;
              this.logoUrl = this.invoiceInfo.logo;
            }
            //付款方式、付款金额
            this.payUrl = this.invoiceInfo.payUrl
              ? this.invoiceInfo.payUrl
              : "";
            this.platformRate =
              this.invoiceInfo.platformRate && this.invoiceInfo.platformRate > 0
                ? this.invoiceInfo.platformRate
                : "";
            this.paymentType = this.invoiceInfo.paymentType
              ? this.invoiceInfo.paymentType
              : "";

            this.shippingAmount = this.invoiceInfo.shippingAmount
              ? this.toFixed(this.invoiceInfo.shippingAmount)
              : "";
            this.itemAmount = this.invoiceInfo.itemAmount
              ? this.toFixed(this.invoiceInfo.itemAmount)
              : "";
            this.totalAmount = this.invoiceInfo.totalAmount
              ? this.toFixed(this.invoiceInfo.totalAmount)
              : "";
            this.realAmount = this.invoiceInfo.realAmount
              ? this.toFixed(this.invoiceInfo.realAmount)
              : "";
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        }
      );
    },
    getRelationship() {
      this.$apiCall("api.Relationship.getByName", {}, (r) => {
        if (r.ErrorCode == "9999") {
          this.relationship = r.Data.Results;
        } else {
          this.$elementMessage(r.Message, "error");
          if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
            this.$userFailure(this);
          }
        }
      });
    },
    //      	popoverSkuShowFn(sku) {
    //      		this.$nextTick(() => {
    //					this.tableData.map(v=>{
    //						this.$set(v,"popoverSkuShow",false);
    //				        if(sku==v.sku){
    //				           this.$set(v,"popoverSkuShow",true)
    //				        }
    //			   		})
    //		        })
    //
    //	      	},
    handleChange(item, value) {
      setTimeout(() => {
        this.$apiCall(
          "api.Invoice.changeQuantity",
          {
            invoiceId: this.invoiceInfo.id,
            itemId: item.id,
            quantity: item.quantity,
          },
          (r) => {
            if (r.ErrorCode == "9999") {
              this.itemAmount = r.Data.Results.itemAmount
                ? this.toFixed(r.Data.Results.itemAmount)
                : "";
              this.totalAmount = r.Data.Results.totalAmount
                ? this.toFixed(r.Data.Results.totalAmount)
                : "";
              this.realAmount = r.Data.Results.realAmount
                ? this.toFixed(r.Data.Results.realAmount)
                : "";
              this.invoiceData.map((v) => {
                if (item.id == v.id) {
                  this.$set(v, "quantity", Number(item.quantity));
                  if (!v.price) {
                    this.$set(v, "amount", "");
                  } else {
                    if (v.fulfillStatus != 2) {
                      this.$set(
                        v,
                        "amount",
                        (Number(v.quantity) * Number(v.price)).toFixed(2)
                      );
                    } else {
                      this.$set(v, "amount", "0.00");
                    }
                  }
                }
              });
              this.getCnt(this.invoiceInfo.id);
            } else {
              this.$elementMessage(r.Message, "error");
              if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                this.$userFailure(this);
              }
            }
          }
        );
      }, 1000);
    },
    handleChangeBySub(props, item, value) {
      let index = props.$index;
      setTimeout(() => {
        this.$apiCall(
          "api.Invoice.changeQuantity",
          {
            invoiceId: this.invoiceInfo.id,
            itemId: item.id,
            quantity: item.quantity,
          },
          (r) => {
            if (r.ErrorCode == "9999") {
              this.itemAmount = r.Data.Results.itemAmount
                ? this.toFixed(r.Data.Results.itemAmount)
                : "";
              this.totalAmount = r.Data.Results.totalAmount
                ? this.toFixed(r.Data.Results.totalAmount)
                : "";
              this.realAmount = r.Data.Results.realAmount
                ? this.toFixed(r.Data.Results.realAmount)
                : "";
              this.invoiceData[index].allItems.map((s) => {
                if (item.id == s.id) {
                  this.$set(s, "quantity", Number(item.quantity));
                }
              });
              this.getCnt(this.invoiceInfo.id);
              this.updateSuccess(index);
            } else {
              this.$elementMessage(r.Message, "error");
              if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                this.$userFailure(this);
              }
            }
          }
        );
      }, 1000);
    },
    changePriceFnBySub(props, item) {
      //修改价格
      if (!item.price) return;
      let index = props.$index;
      if (window.lazyPriceSub) {
        window.clearTimeout(window.lazyPriceSub);
      }
      window.lazyPriceSub = setTimeout(() => {
        let params = {
          type: "onlyOne",
          invoiceId: this.invoiceInfo.id,
          customerSku: item.customerSku,
          price: item.price,
          itemId: item.id,
          sku: item.sku,
        };
        this.$apiCall("api.Invoice.setPrice", params, (r) => {
          if (r.ErrorCode == "9999") {
            this.invoiceData[index].allItems.forEach((e, t) => {
              if (e.id == item.id) {
                this.$set(e, "price", Number(item.price).toFixed(2));
                if (!e.price) {
                  this.$set(e, "amount", "");
                } else {
                  if (e.fulfillStatus != 2) {
                    this.$set(
                      e,
                      "amount",
                      (Number(e.quantity) * Number(e.price)).toFixed(2)
                    );
                  } else {
                    this.$set(e, "amount", "0.00");
                  }
                }
              }
            });
            this.itemAmount = r.Data.Results.itemAmount
              ? this.toFixed(r.Data.Results.itemAmount)
              : "";
            this.totalAmount = r.Data.Results.totalAmount
              ? this.toFixed(r.Data.Results.totalAmount)
              : "";
            this.realAmount = r.Data.Results.realAmount
              ? this.toFixed(r.Data.Results.realAmount)
              : "";
            this.getCnt(this.invoiceInfo.id);
            this.updateSuccess(index);
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        });
      }, 400);
    },
    updateSuccess(index) {
      let price = [],
        amount = [],
        qty = [],
        amounts = 0,
        quantity = 0,
        min = 0,
        max = 0;
      this.invoiceData[index].allItems.map((s) => {
        if (!s.price) {
          this.$set(s, "amount", "");
        } else {
          if (s.fulfillStatus != 2) {
            this.$set(
              s,
              "amount",
              (Number(s.quantity) * Number(s.price)).toFixed(2)
            );
          } else {
            this.$set(s, "amount", "0.00");
          }
        }
        price.push(Number(s.price));
        amount.push(Number(s.amount));
        qty.push(Number(s.quantity));
      });

      amount.forEach((a) => {
        amounts += a;
      });
      qty.forEach((a) => {
        quantity += a;
      });
      min = Math.min(...price);
      max = Math.max(...price);

      this.$set(this.invoiceData[index], "minPrice", Number(min));
      this.$set(this.invoiceData[index], "maxPrice", Number(max));

      this.$set(this.invoiceData[index], "quantity", Number(quantity));
      this.$set(this.invoiceData[index], "amount", Number(amounts));
    },
    addCustomer() {
      this.addCustomerOpen = true;
      this.formNewcustomer.name = this.customerName ? this.customerName : "";
    },
    submitAddcustomer(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$showLoading(".addCustomer");
          this.$apiCall(
            "api.Relationship.addByVendor",
            {
              name: this.formNewcustomer.name,
              remark: this.formNewcustomer.remark,
              email: this.formNewcustomer.email,
            },
            (r) => {
              this.$hideLoading();
              if (r.ErrorCode == "9999") {
                this.$elementMessage(this.$t("invoice.addSuccess"), "success");
                this.addCustomerOpen = false;
                this.getData();
              } else {
                this.$elementMessage(r.Message, "error");
                if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                  this.$userFailure(this);
                }
              }
            }
          );
        } else {
          return false;
        }
      });
    },
    editCompany() {
      this.editCompanyInfoOpen = true;
      this.formEditCompany.name = this.invoiceInfo.vendorName
        ? this.invoiceInfo.vendorName
        : "";
      this.formEditCompany.address = this.invoiceInfo.address
        ? this.invoiceInfo.address
        : "";
    },
    submitEditCompany(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$showLoading(".editCustomer");
          this.$apiCall(
            "api.User.changeByUser",
            {
              invoiceId: this.invoiceInfo.id,
              name: this.formEditCompany.name,
              address: this.formEditCompany.address,
            },
            (r) => {
              this.$hideLoading();
              if (r.ErrorCode == "9999") {
                this.$elementMessage(
                  this.$t("invoice.successModification"),
                  "success"
                );
                this.editCompanyInfoOpen = false;
                this.getData();
              } else {
                this.$elementMessage(r.Message, "error");
                if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                  this.$userFailure(this);
                }
              }
            }
          );
        } else {
          return false;
        }
      });
    },
    editCompanyByInput() {
      if (window.editCompany) {
        window.clearTimeout(window.editCompany);
      }
      window.editCompany = setTimeout(() => {
        this.$showLoading();
        this.$apiCall(
          "api.User.changeByUser",
          {
            invoiceId: this.invoiceInfo.id,
            name: this.editCompanyName,
            address: this.editCompanyAddress,
          },
          (r) => {
            this.$hideLoading();
            if (r.ErrorCode == "9999") {
              this.$elementMessage(
                this.$t("invoice.successModification"),
                "success"
              );
              this.getData();
            } else {
              this.$elementMessage(r.Message, "error");
              if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                this.$userFailure(this);
              }
            }
          }
        );
      }, 400);
    },
    editCustomer() {
      this.editCustomerOpen = true;

      this.formEditcustomer.name = this.invoiceInfo.customerName
        ? this.invoiceInfo.customerName
        : "";
      this.formEditcustomer.email = this.invoiceInfo.customerEmail
        ? this.invoiceInfo.customerEmail
        : "";
      this.formEditcustomer.remark = this.invoiceInfo.customerRemark
        ? this.invoiceInfo.customerRemark
        : "";
      this.formEditcustomer.id = this.invoiceInfo.relationshipId;
    },
    submitEditcustomer(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$showLoading(".editCustomer");
          this.$apiCall(
            "api.Relationship.changeByVendor",
            {
              relationshipId: this.formEditcustomer.id,
              name: this.formEditcustomer.name,
              remark: this.formEditcustomer.remark,
              email: this.formEditcustomer.email,
            },
            (r) => {
              this.$hideLoading();
              if (r.ErrorCode == "9999") {
                this.$elementMessage(
                  this.$t("invoice.successCustomer"),
                  "success"
                );
                this.editCustomerOpen = false;
                this.getData();
              } else {
                this.$elementMessage(r.Message, "error");
                if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                  this.$userFailure(this);
                }
              }
            }
          );
        } else {
          return false;
        }
      });
    },
    changeCustomer() {
      $(".el-popover").remove();
      $("body").off();
      this.changeCustomerStatus = !this.changeCustomerStatus;
      this.customerName = "";
      setTimeout(() => {
        this.$refs.customerAutocomplete.focus();
      }, 300);
    },
    selectCustomer(item) {
      this.$showLoading();
      this.$apiCall(
        "api.Invoice.changeCustomer",
        {
          invoiceId: this.invoiceInfo.id,
          relationshipId: item.id,
        },
        (r) => {
          this.$hideLoading();
          if (r.ErrorCode == "9999") {
            this.$refs.popoverCustomer.doClose();
            this.$elementMessage(this.$t("invoice.successChange"), "success");
            this.getData();
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
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
          "api.Relationship.getByName",
          {
            name: this.customerName,
          },
          (r) => {
            if (r.ErrorCode == "9999") {
              this.relationship = r.Data.Results;
            } else {
              this.$elementMessage(r.Message, "error");
              if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                this.$userFailure(this);
              }
            }
          }
        );
      }, 400);
    },
    tableRowClassName({ row, rowIndex }) {
      if (
        this.invoiceData[rowIndex] &&
        this.invoiceData[rowIndex].fulfillStatus == 2
      ) {
        return "warning-row";
      } else {
        return "";
      }
    },
    tableRowClassName2({ row, rowIndex }) {
      if (
        this.invoiceData[rowIndex] &&
        this.invoiceData[rowIndex].fulfillStatus == 2
      ) {
        if (
          this.invoiceData[rowIndex].allItems &&
          this.invoiceData[rowIndex].allItems.length > 0
        )
          return "showrow warning-row";
        else return "hiderow warning-row";
      } else {
        if (
          this.invoiceData[rowIndex].allItems &&
          this.invoiceData[rowIndex].allItems.length > 0
        )
          return "showrow";
        else return "hiderow";
      }
    },
    getCellClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex == 0) {
          return "step-sku-1";
        } else if (columnIndex == 3) {
          return "step-price-2";
        } else {
          return "";
        }
      }
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex == 0) {
          return "padding-left:10px;text-align:left;background:#43467F;color:#fff;font-weight:600;white-space:nowrap;border-right: 0;";
        } else if (columnIndex == 1) {
          return "text-align:left;background:#43467F;color:#fff;font-weight:600;white-space:nowrap;border-right: 0;";
        } else if (columnIndex == 4 || columnIndex == 5) {
          return "padding-right:10px;text-align:right;background:#43467F;color:#fff;font-weight:600;white-space:nowrap;border-right: 0;";
        } else {
          return "text-align:center;background:#43467F;color:#fff;font-weight:600;white-space:nowrap;border-right: 0;";
        }
      }
    },
    getRowClass3({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex == 0) {
          return "padding-left:10px;text-align:left;background:#43467F;color:#fff;font-weight:600;white-space:nowrap;border-right: 0;";
        } else if (columnIndex == 1) {
          return "text-align:left;background:#43467F;color:#fff;font-weight:600;white-space:nowrap;border-right: 0;";
        } else if (columnIndex == 2) {
          return "text-align:left;background:#43467F;color:#fff;font-weight:600;white-space:nowrap;border-right: 0;";
        } else if (columnIndex == 4 || columnIndex == 5) {
          return "padding-right:10px;text-align:right;background:#43467F;color:#fff;font-weight:600;white-space:nowrap;border-right: 0;";
        } else {
          return "text-align:center;background:#43467F;color:#fff;font-weight:600;white-space:nowrap;border-right: 0;";
        }
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        // 指定列号
        return "padding-left:10px;text-align:left;";
      } else if (columnIndex == 4 || columnIndex == 5) {
        return "padding-right:10px;text-align:right;";
      } else {
        return "text-align:center;";
      }
    },
    getRowClass2({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex == 0) {
          return "padding-left:10px;text-align:left;white-space:nowrap;font-weight: normal;font-size: 12px;color: #303133;border-right:1px solid rgb(217, 220, 239);background: rgb(233, 233, 235);";
        } else if (columnIndex == 1) {
          return "text-align:left;white-space:nowrap;font-weight: normal;font-size: 12px;color: #303133;border-right:1px solid rgb(217, 220, 239);background: rgb(233, 233, 235);";
        } else if (columnIndex == 4) {
          return "padding-right:10px;text-align:right;white-space:nowrap;font-weight: normal;font-size: 12px;color: #303133;background: rgb(233, 233, 235);";
        } else {
          return "text-align:center;white-space:nowrap;font-weight: normal;font-size: 12px;color: #303133;border-right:1px solid rgb(217, 220, 239);background: rgb(233, 233, 235);";
        }
      }
    },
    cellStyle2({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        // 指定列号
        return "padding-left:10px;text-align:left;";
      } else if (columnIndex == 4) {
        return "padding-right:10px;text-align:right;border-right:none;";
      } else {
        return "text-align:center;";
      }
    },
    commitOtherERP() {
      //保存新建工单
      if (this.setOtherERPDialog.contents === "") {
        this.$message({
          message: this.$t("ticket.issueCannotEmpty"),
          type: "error",
        });
        return false;
      }
      // :loading="DialogEditComment.loading"
      this.setOtherERPDialog.loading = true;
      this.$apiCall(
        "api.Comment.addByUser",
        {
          contents: this.setOtherERPDialog.contents,
          attach: this.setOtherERPDialog.attach,
        },
        (r) => {
          this.setOtherERPDialog.loading = false;
          if (r.ErrorCode == 9999) {
            this.setOtherERPDialog.isShow = false;
            this.setLotPriceDialog.isShow = false;
            this.setOtherERPDialog.contents = "";
            this.$message({
              message:
                "我们已收到您的留言！我们将尽快在“我的OurMall”>>“客服支持”页面回复您。",
              type: "success",
            });
          } else {
            this.$message({ message: r.Message, type: "error" });
          }
        }
      );
    },
    handleChangeOtherERPDialog(file) {
      this.setOtherERPDialog.loading = true;
      this.setOtherERPDialog.uploadLoading = true;
      this.$apiCall(
        "api.Comment.uploadAttach",
        {
          "@file": file.raw,
        },
        (r) => {
          this.setOtherERPDialog.loading = false;
          this.setOtherERPDialog.uploadLoading = false;
          if (r.ErrorCode == "9999") {
            this.setOtherERPDialog.attach.push(r.Data.Results.url);
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    handleRemoveOtherERPDialog(file, fileList) {
      fileList.forEach((e, index) => {
        if (e.name == file.name) {
          this.setOtherERPDialog.attach.splice(index, 1);
        }
      });
    },
    changeLang(lang) {
      //语言切换
      if (lang != this.$i18n.locale) {
        this.$i18n.locale = lang;
        localStorage.setItem("ourmallVendorLang", lang);
        document.title =
          this.$t(this.$route.meta.title) + "- OurMall Dropshipping App";
      }
    },
    setShippingFee(item) {
      //每单运费
      let params = {
        invoiceId: this.invoiceInfo.id,
        itemId: item.id,
        shippingFee: item.shippingFee || 0,
      };
      this.$apiCall("api.Invoice.setShippingFee", params, (r) => {
        if (r.ErrorCode == "9999") {
          let data = r.Data.Results;
          this.$set(item, "shippingFee", data.shippingFee);
          this.realAmount = data.realAmount;
          this.shippingAmount = data.shippingAmount;
          this.totalAmount = data.totalAmount;
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    itemTotalAmount(item) {
      //小计
      return (
        Number(item.quantity) * Number(item.price) +
        (isNaN(item.shippingFee) ? 0 : Number(item.shippingFee))
      ).toFixed(2);
    },
    openSetPayment() {
      //打开采购单付款方式弹层
      this.dialogSetPayment = JSON.parse(this.dialogSetPaymentDefault);
      this.dialogSetPayment.acceptPayment = this.invoiceInfo.acceptPayment
        ? this.invoiceInfo.acceptPayment.split(",")
        : [];
      this.dialogSetPayment.payment = Number(this.invoiceInfo.paymentType);
      this.dialogSetPayment.payUrl = this.invoiceInfo.payUrl;
      this.dialogSetPayment.isShow = true;
    },
    saveSetPayment() {
      //保存付款方式设置
      if (!this.dialogSetPayment.payment) {
        this.$elementMessage("请选择一个付款方式", "error");
        return false;
      }
      let url = this.dialogSetPayment.payUrl;
      if (
        url &&
        !(
          url.substr(0, 7).toLowerCase() == "http://" ||
          url.substr(0, 8).toLowerCase() == "https://"
        )
      ) {
        url = "https://" + url;
      }

      this.dialogSetPayment.loading = true;
      this.$apiCall(
        "api.Invoice.setPayment",
        {
          invoiceId: this.invoiceInfo.id,
          paymentType: this.dialogSetPayment.payment,
          payUrl: url,
        },
        (r) => {
          this.dialogSetPayment.loading = false;
          if (r.ErrorCode == "9999") {
            this.dialogSetPayment.isShow = false;
            this.$elementMessage(this.$t("invoice.successPayment"), "success");
            this.getData();
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    setPriceConfirm() {
      this.$confirm(this.$t("invoice.是否要确认完成报价?"), "", {
        confirmButtonText: this.$t("invoice.确定"),
        cancelButtonText: this.$t("invoice.取消"),
        type: "warning",
      }).then(() => {
        this.$showLoading();
        this.$apiCall(
          "api.Invoice.setPriceConfirm",
          { invoiceId: this.invoiceInfo.id },
          (r) => {
            this.$hideLoading();
            if (r.ErrorCode == "9999") {
              this.$elementMessage(
                this.$t("invoice.确认完成报价成功"),
                "success"
              );
              this.getData();
            } else {
              this.$elementMessage(r.Message, "error");
            }
          }
        );
      });
    },
    setRestore(item) {
      this.$confirm("删除后可在托管店铺中重新生成, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$showLoading();
        this.$apiCall("api.Invoice.itemRestore", { itemId: item.id }, (r) => {
          this.$hideLoading();
          if (r.ErrorCode == "9999") {
            this.getCnt(this.invoiceInfo.id); //获取tab栏数字
            this.invoiceData.some((li, index) => {
              if (li.id == item.id) {
                this.invoiceData.splice(index, 1);
                return true;
              }
            });
            this.$elementMessage("删除成功", "success");
          }
        });
      });
    },
  },
};
</script>
<style scoped="scoped">
.ml-10 {
  margin-left: 10px;
}
.flex-center {
  display: flex;
  justify-content: left;
  align-items: center;
}
.expandPage {
  text-align: center;
  margin-top: 10px;
}
.avatar-uploader {
  width: 70px;
  height: 70px;
}
.notsyn-link {
  color: #00a3d9;
  font-weight: bold;
}
.page-content {
  height: 100%;
}

.page-content .el-scrollbar__wrap {
  overflow: auto;
  overflow-x: hidden;
}

.timeline-header {
  margin-bottom: 20px;
  border-bottom: 1px solid #d3dbe2;
  padding: 20px;
}

.invoice {
  width: 1270px;
  margin: 0 auto;
}

.invoice-header {
  display: -webkit-flex;
  display: flex;
  margin: 20px;
  align-items: center;
  justify-content: space-between;
}

.invoice-header-info {
  text-align: right;
}

.invoice-header-logo {
  text-align: left;
}

.wv-text-strong {
  font-weight: bold;
}

.invoice-header-logo,
.wv-heading-title {
  font-size: 36px;
  font-weight: 600;
  line-height: 1.4;
}
/*.wv-heading-title {
		line-height: 50px;
	}*/

.divider-full-width {
  border-bottom: 1px solid #dfe3e8;
  margin: 20px 0;
}

.invoice .el-divider--horizontal {
  display: block;
  height: 1px;
  width: auto;
  margin: 20px 0;
}

.invoice .el-card .el-divider--horizontal {
  margin: 20px -20px;
}

.invoice .change-customer .el-divider--horizontal {
  margin: 20px -20px;
}

.invoice .page-footer .el-divider--horizontal {
  margin: 20px -20px;
}

.page-footer {
  font-size: 14px;
  /*    	font-weight: bold;*/
}

.invoice-metadata-info {
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.invoice-metadata-info .text-right > p {
  padding-right: 8px;
}

.invoice-metadata-info .text-right p {
  font-weight: bold;
}

.text-bg {
  background: rgba(92, 106, 196, 0.12);
  padding: 0 5px;
}

.invoice .el-table {
  width: auto;
  max-width: none;
  margin: 0 -20px;
  border-top: 0;
}

.invoice-bottom > div.d-flex > div.tx-bold {
  width: 50%;
  text-align: right;
}

.invoice-bottom > div.d-flex > div.mg-l-5 {
  margin-left: 50px;
  min-width: 100px;
  width: 290px;
  text-align: right;
}

.el-form {
  margin-top: 20px;
}

.el-form-item {
  margin-bottom: 0;
}

.el-form .el-form-item .d-flex {
  margin-top: 10px;
}

.no-wrap .el-alert.el-alert--warning,
.no-wrap .el-alert.el-alert--error {
  padding: 2px 6px;
}

.customer-autocomplete li {
  line-height: normal;
  padding: 7px;
}

.customer-autocomplete .name {
  text-overflow: ellipsis;
  overflow: hidden;
}

.customer-autocomplete .addr {
  font-size: 12px;
  color: #b4b4b4;
}

.customer-autocomplete .highlighted .addr {
  color: #b4b4b4;
}

.change-customer .el-autocomplete {
  width: 250px;
}

.customer-popover .el-form-item {
  margin-top: 10px;
}

.invoice .el-aside {
  overflow: inherit;
  margin-left: -20px;
  padding: 20px 0;
  position: relative;
}

.invoice .el-aside .el-menu {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 40%;
  margin-top: 0;
}

.invoice .el-aside.fix .el-menu {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  top: auto;
  bottom: 20px;
  margin-top: 0;
}

.invoice .el-menu-item {
  padding: 0;
  text-align: center;
}

.invoice .el-menu-item .el-badge {
  position: relative;
  vertical-align: bottom;
  display: inline;
  margin-right: 10px;
}

.invoice .el-menu-item .el-badge .el-menu-item [class^="el-icon-"] {
  margin: 0;
}

.invoice .el-menu-item i {
  color: #909399;
  font-size: 18px;
  margin-right: 5px;
}

.invoice .el-menu-item.is-active i {
  color: #5c6ac4;
}
/*	/*
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 150px;
	}*/

.el-menu-item:focus,
.el-menu-item:hover {
  outline: 0;
  background-color: #eff0f9;
}

.el-menu-item:nth-child(1):focus,
.el-menu-item:nth-child(1):hover,
.el-menu-item:nth-child(1):focus i,
.el-menu-item:nth-child(1):hover i {
  color: rgb(245, 108, 108);
}

.el-menu-item:nth-child(2):focus,
.el-menu-item:nth-child(2):hover,
.el-menu-item:nth-child(2):focus i,
.el-menu-item:nth-child(2):hover i {
  color: rgb(230, 162, 60);
}

.el-menu-item:nth-child(3):focus,
.el-menu-item:nth-child(3):hover,
.el-menu-item:nth-child(3):focus i,
.el-menu-item:nth-child(3):hover i {
  color: rgb(158, 234, 106);
}

.el-menu-item:nth-child(4):focus,
.el-menu-item:nth-child(4):hover,
.el-menu-item:nth-child(4):focus i,
.el-menu-item:nth-child(4):hover i {
  color: #409eff;
}

.el-menu-item:nth-child(5):focus,
.el-menu-item:nth-child(5):hover,
.el-menu-item:nth-child(5):focus i,
.el-menu-item:nth-child(5):hover i {
  color: #5c6ac4;
}

.page-footer-fixed {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 2;
  background: #fff;
  left: 0;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.3);
  min-height: 60px;
}

.page-footer-fixed .with-hover .el-col {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
}

.page-footer-fixed.show .with-hover .el-col {
  -webkit-transition: all 1s cubic-bezier(0, 1, 0.5, 1);
  transition: all 1s cubic-bezier(0, 1, 0.5, 1);
  max-height: 600px !important;
  opacity: 1;
}

.page-footer-fixed.show .without-hover .el-col {
  -webkit-transition: all 0.3s cubic-bezier(0, 1, 0.5, 1);
  transition: all 0.3s cubic-bezier(0, 1, 0.5, 1);
  max-height: 0;
  overflow: hidden;
}

.page-footer-fixed:hover .with-hover .el-col {
  -webkit-transition: all 1s cubic-bezier(0, 1, 0.5, 1);
  transition: all 1s cubic-bezier(0, 1, 0.5, 1);
  max-height: 600px !important;
  opacity: 1;
}

.page-footer-fixed:hover .without-hover .el-col {
  -webkit-transition: all 0.3s cubic-bezier(0, 1, 0.5, 1);
  transition: all 0.3s cubic-bezier(0, 1, 0.5, 1);
  max-height: 0;
  overflow: hidden;
}

.page-footer-fixed.show-hover .with-hover .el-col {
  -webkit-transition: all 1s cubic-bezier(0, 1, 0.5, 1);
  transition: all 1s cubic-bezier(0, 1, 0.5, 1);
  max-height: 600px !important;
  opacity: 1;
}

.page-footer-fixed.show-hover .without-hover .el-col {
  -webkit-transition: all 0.3s cubic-bezier(0, 1, 0.5, 1);
  transition: all 0.3s cubic-bezier(0, 1, 0.5, 1);
  max-height: 0;
  overflow: hidden;
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

.invoice .el-divider--horizontal.export-line {
  height: 30px;
  margin-top: 0;
  margin-bottom: 0;
  background-color: rgb(233, 233, 235);
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
}

.invoice .el-card .invoice-bottom .el-divider--horizontal[data-v-5a9e3b63] {
  margin: 20px -20px 20px 20px;
}

.wv-table {
  width: 100%;
  border-collapse: collapse;
}

.wv-table thead th {
  color: #fff;
  font-weight: 600;
}

.wv-table th,
.wv-table td {
  padding: 10px 20px;
}

.next-input {
  -webkit-transition-property: background, border, -webkit-box-shadow;
  transition-property: background, border, -webkit-box-shadow;
  transition-property: background, border, box-shadow;
  transition-property: background, border, box-shadow, -webkit-box-shadow;
  -webkit-transition-timing-function: cubic-bezier(0.64, 0, 0.35, 1);
  transition-timing-function: cubic-bezier(0.64, 0, 0.35, 1);
  -webkit-transition-duration: 200ms;
  transition-duration: 200ms;
  -webkit-box-shadow: inset 0 1px 0 0 rgba(63, 63, 68, 0.05);
  box-shadow: inset 0 1px 0 0 rgba(63, 63, 68, 0.05);
  border-color: #c4cdd5;
}

.next-input {
  display: inline-block;
  max-width: auto;
  min-width: 50px;
  vertical-align: baseline;
  width: auto;
  height: auto;
  padding: 1px;
  margin: 0;
  border: 1px solid #95a7b7;
  border-radius: 0;
  border-style: inset;
  color: black;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 5px 10px;
  border: 1px solid #c4cdd5;
  border-radius: 3px;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
  text-transform: initial;
  letter-spacing: initial;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  width: 120px;
}

.next-input.price {
  width: 100px;
}

.next-input:focus {
  border: 1px solid #5c6ac4;
  -webkit-box-shadow: 0 0 0 1px #5c6ac4;
  box-shadow: 0 0 0 1px #5c6ac4;
}

.invoice .cell .el-icon-search {
  color: #fff !important;
}

.el-table td .el-input-number--small.is-without-controls.el-popover__reference {
  width: 100px;
}
</style>
<style>
.table2 .has-gutter tr > th:first-child .cell {
  display: none !important;
}

.pos-absolute {
  display: flex;
  align-items: center;
}

.pos-absolute .el-button-group {
  margin-right: 10px;
}

.pos-absolute .el-button-group button {
  padding: 5px 15px;
  vertical-align: middle;
}
/*.pos-absolute .el-button-group button i.iconfont{
		font-size: 12px;
	}*/

.pos-absolute .el-button-group button.active {
  background: #7d88d0;
  border-color: #7d88d0;
}

.pos-absolute .el-button-group .el-button--primary.active:first-child {
  border-right-color: rgba(255, 255, 255, 0.5);
}

.pos-absolute .el-button-group .el-button--primary.active:last-child {
  border-left-color: rgba(255, 255, 255, 0.5);
}

.pos-absolute .el-button-group.text-btn {
  display: flex;
  align-items: center;
}

.pos-absolute .el-button-group.text-btn button {
  padding: 0 5px;
  display: flex;
  align-items: center;
}

.pos-absolute .el-button-group.text-btn button i {
  margin-right: 0;
  margin-left: 5px;
}

.pos-absolute .el-button-group.text-btn button > span {
  display: flex;
  align-items: center;
}
/*.pos-absolute .el-button-group.text-btn button>span>span{
	font-size: 12px;
	margin-bottom: 2px;
}*/

.pos-absolute .el-button-group.text-btn button:first-child {
  border-right: 1px solid #5c6ac4 !important;
  padding-right: 8px;
}
/*.pos-absolute .el-button-group.text-btn button>*{
	vertical-align: middle;
}*/

.pos-absolute .el-button-group.text-btn button.active {
  background: none;
  border: none;
  font-weight: 700;
}

.pos-absolute .el-button-group.text-btn button .radio-span {
  display: block;
  border: 1px solid #dcdfe6;
  border-radius: 100%;
  width: 12px;
  height: 12px;
  background-color: #fff;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
}

.pos-absolute .el-button-group.text-btn button.active .radio-span {
  border-color: #5c6ac4;
  background: #5c6ac4;
}

.pos-absolute .el-button-group.text-btn button.active .radio-span:after {
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background-color: #fff;
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(1);
  transition: transform 0.15s ease-in;
}

.btn-wrap {
  padding: 0 0 0 10px;
  font-size: 14px;
  height: 36px;
  line-height: 36px;
}

.btn-wrap .btn-item {
  color: #ffffff;
  background-color: #5c6ac4;
  border-color: #5c6ac4;
  padding: 0 20px;
  height: 36px;
  line-height: 36px;
  position: relative;
  display: block;
  outline: none;
}

.btn-wrap .btn-item:hover,
.btn-wrap .btn-item:active,
.btn-wrap .btn-item:focus {
  text-decoration: none;
}

.btn-wrap .btn-item:first-child {
  border-radius: 4px 0 0 4px;
}

.btn-wrap .btn-item:last-child {
  border-radius: 0px 4px 4px 0px;
}

.btn-wrap .btn-item2:before {
  content: "";
  display: block;
  border-top: 18px solid transparent;
  border-bottom: 18px solid transparent;
  border-left: 18px solid #aeb5e2;
  position: absolute;
  left: -10px;
  top: 0;
  z-index: 2;
}

.btn-wrap .btn-item2:after {
  content: "";
  display: block;
  border-top: 18px solid #5c6ac4;
  border-bottom: 18px solid #5c6ac4;
  border-left: 20px solid #fff;
  position: absolute;
  left: -9px;
  top: 0;
  z-index: 1;
}

.btn-wrap .btn-item2.with-disabled:after {
  content: "";
  display: block;
  border-top: 18px solid #aeb5e2;
  border-bottom: 18px solid #aeb5e2;
  border-left: 20px solid #fff;
  position: absolute;
  left: -9px;
  top: 0;
  z-index: 1;
}

.btn-wrap .btn-item2.with-disabled:before {
  content: "";
  display: block;
  border-top: 18px solid transparent;
  border-bottom: 18px solid transparent;
  border-left: 18px solid #5c6ac4;
  position: absolute;
  left: -10px;
  top: 0;
  z-index: 2;
}

.btn-wrap .btn-item2.with-disabled.with-disabled-btn1:before {
  border-left: 18px solid #aeb5e2;
}

.btn-wrap .btn-item.with-disabled {
  color: #ffffff;
  background-color: #aeb5e2;
  border-color: #aeb5e2;
}

.btn-item > i {
  margin-right: 5px;
}

.el-button i.iconfont {
  margin-right: 5px;
}

.m-card {
  position: relative;
}

.cancel-label {
  position: absolute;
  top: -9px;
  left: -6px;
  padding: 2px 8px;
  background-color: #f56c6c;
  border-radius: 3px;
  color: #fff;
  line-height: 26px;
  font-size: 22px;
  transform: rotate(-12deg);
}

.invoice-icon-tongbu1 {
  margin-left: 10px;
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url(/images/invoice-icons.png) no-repeat center center;
  background-position: -16px 0;
}

.invoice-icon-tongbu2 {
  margin-left: 10px;
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url(/images/invoice-icons.png) no-repeat center center;
  background-position: 0 0;
}
.set-price {
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 20px;
}
.set-price .logo-wrap {
  width: 130px;
  height: 130px;
  border-radius: 100%;
  background: #252d40 url("../../public/images/main_logo.png") no-repeat center center;
  background-size: 80%;
  margin: 20px auto;
}
.set-price.other .logo-wrap {
  background: #f6f6f6;
  font-size: 24px;
  line-height: 130px;
}
.set-price p {
  margin: 40px 0 20px;
  font-size: 18px;
  /*font-weight: 700;*/
}
.set-price:hover {
  border-color: #5c6ac4;
}
.sbns-icon {
  margin-right: 3px !important;
  position: unset !important;
  left: 0 !important;
  font-size: 12px !important;
}

.countrylist {
  display: flex;
  flex-wrap: wrap;
}
.countrylist .countrylist-item {
  flex: 0 0 49%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}
.countrylist .countrylist-item:nth-of-type(2n + 1) {
  margin-right: 10px;
}
.countrylist .countrylist-name {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.countrylist .countrylist-input {
}
</style>

<style lang="scss" scoped>
.get-invocie-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 30px 30px;
  i {
    margin-bottom: 15px;
    width: 42px;
    height: 42px;
    font-size: 42px;
  }
  span {
    color: #909399;
    span {
      color: #606266;
    }
  }
}
.invoice {
  .top-1 {
    display: flex;
    justify-content: space-between;
    .left {
      h2 {
        font-weight: bold;
        font-size: 22px;
      }
    }
    .right {
      text-align: right;
      .code {
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 18px;
      }
      .date {
        margin-bottom: 5px;
      }
      .lang {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        a {
          opacity: 0.4;
        }
        a.active {
          opacity: 1;
        }
        a:first-chlid {
          margin-right: 5px;
        }
      }
    }
  }
  .top-2 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .left {
      .title {
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 18px;
      }
    }
    .right {
      text-align: right;
      .t-status {
        margin-bottom: 10px;
        font-size: 16px;
        span {
          font-weight: bold;
        }
      }
      .t-amount {
        font-weight: bold;
        font-size: 16px;
        span {
          margin-left: 10px;
        }
      }
    }
  }
}
.pay-row {
  display: flex;
  margin-bottom: 15px;
  line-height: 22px;
  .left {
    width: 200px;
  }
  .radio-wrap {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
}
.invoice .el-card {
  overflow: visible;
  border: none;
}
.invoice .el-table td,
.el-table th {
  padding: 6px 0 !important;
}
.tabs {
  margin: 0;
  align-items: flex-end;
  position: relative;
}
.invoice .table-only:after {
  content: "";
  border-bottom: 8px solid rgb(46, 46, 86);
  border-left: 10px solid transparent;
  position: absolute;
  top: -7px;
  left: 0px;
}
.invoice .table-only:before {
  content: "";
  border-bottom: 8px solid rgb(46, 46, 86);
  border-right: 10px solid transparent;
  position: absolute;
  top: -7px;
  right: 0px;
  width: 0;
  height: 0;
  left: auto;
  bottom: auto;
}
.table-only .el-table__body-wrapper {
  display: none;
}
.tabs div.tab-btn {
  cursor: pointer;
  border-radius: 5px 5px 0 0;
  padding: 1.5% 3%;
  float: left;
  margin-right: 3px;
  padding: 0 20px;
  height: 36px;
  box-sizing: border-box;
  line-height: 36px;
  display: inline-block;
  list-style: none;
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  position: relative;
  /*background: rgba(92, 106, 196, .12);*/
  background: #ebedf7;
}
.tabs div.active {
  background: rgb(67, 70, 127);
  color: rgb(255, 255, 255);
  height: 40px;
  line-height: 40px;
  /*box-shadow: 8px 19px 25px 2px rgba(0,0,0,0.4);*/
}
.pos-absolute {
  position: absolute;
  right: 0;
  bottom: 5px;
}
.table-wrap {
  position: relative;
}
.invoice .table-wrap .table-only {
  margin: 0 -30px -36px !important;
  position: relative;
  /*			z-index: 1;*/
  overflow: visible;
  box-shadow: 0 -14px 5px -12px rgba(0, 0, 0, 0.3);
}
.invoice
  .table-wrap
  .table-only
  .el-table__header-wrapper
  thead
  th:first-child
  .cell {
  padding-left: 20px;
}
.invoice .table-wrap .table-only .el-table__header-wrapper thead th,
.invoice .table-wrap .table-with-body .el-table__header-wrapper thead th {
  border: none;
  padding: 0 !important;
  height: 36px;
  line-height: 36px;
}
.invoice .el-table th > .cell {
  height: 32px;
  line-height: 28px;
}
.invoice .change-type button {
  background: rgb(67, 70, 127);
  border: none;
}
.invoice .change-type button.active {
  background-color: #5c6ac4;
  border-color: #3f4eae;
}
.el-table--border.table-with-body::after,
.el-table--group.table-with-body::after {
  display: none;
}
.el-table--border.table-with-body {
  border-left: none;
  overflow: visible;
}
.el-table--border.table-with-body .gutter {
  background: rgb(67, 70, 127);
}
.el-table.table-with-body td,
.el-table.table-with-body th.is-leaf {
  border-bottom: 0;
}

.el-button i.fa {
  margin-right: 5px;
}
.el-message {
  top: 50%;
  transform: translateY(-50%);
}
.el-upload-dragger {
  height: 130px !important;
}
.el-upload-dragger .el-icon-upload {
  margin: 10px 0 10px !important;
}
.invoice .el-table__body-wrapper {
  overflow: visible;
}
.invoice .sku-with-error i {
  position: absolute;
  top: 10px;
  left: -430px;
  margin: 0;
  font-size: 18px;
}
.input-btn {
  text-decoration: none;
}
.input-btn:hover,
.input-btn:focus {
  text-decoration: none;
}
.input-btn > span {
  display: block;
  border: 1px solid #dcdfe6;
  border-radius: 100%;
  width: 14px;
  height: 14px;
  background-color: #fff;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
}
.input-btn.active {
  color: #5c6ac4;
}
.input-btn.active > span {
  border-color: #5c6ac4;
  background: #5c6ac4;
}
.input-btn.active > span:after {
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background-color: #fff;
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(1);
  transition: transform 0.15s ease-in;
}
.el-form-item__error {
  position: relative !important;
  top: 0 !important;
  left: 0 !important;
  margin: 5px 0 15px !important;
}
.input-with-select textarea {
  border: none;
}
.supplyunit:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}

.unactive ::v-deep .el-input__inner {
  border: 1px solid red !important;
}
</style>
