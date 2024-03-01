<template>
  <div class="contentpanel my-custom-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-s-custom"></i>
          <h2>{{ $t("mycustomer.customers") }}</h2>
        </div>
      </div>
      <div class="right">
        <el-button type="primary" size="medium" @click="openBatchVendor">
          {{
          $t("mycustomer.batchSettings")
          }}
        </el-button>
        <el-button
          type="primary"
          size="medium"
          @click="openAddVendor"
          :disabled="!$isRole($route.meta.roleWrite)"
        >
          {{
          $t("mycustomer.customersAdd")
          }}
        </el-button>
      </div>
    </div>
    <div class="pagebody" v-loading="loading">
      <el-row :gutter="15" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <el-row :gutter="20">
              <el-col :span="24">
                <div ref="pageFilter" class="page-filter">
                  <el-form :inline="true" size="mini">
                    <!-- <el-form-item>
                      <el-input
                        v-model="filterParams.customerId"
                        placeholder="OurMall ID"
                        @keyup.enter.native="filterGetItem"
                      ></el-input>
                    </el-form-item>-->
                    <el-form-item>
                      <el-select
                        filterable
                        remote
                        :remote-method="remoteMethodCustom"
                        :loading="selectLoading"
                        :placeholder="$t('myinvoice.pleaseCusName')"
                        clearable
                        v-model="filterParams.name"
                        @change="filterGetItem('relationshipId')"
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
                    <!-- //TODO先不加筛选 -->
                    <el-form-item v-if="apiUserId == 148797 && false">
                      <el-input
                        v-model="filterParams.customCode"
                        :placeholder="$t('站长外部编号')"
                        @keyup.enter.native="filterGetItem"
                      ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-input
                        v-model="filterParams.customerPhone"
                        :placeholder="$t('mycustomer.customersContact')"
                        @keyup.enter.native="filterGetItem"
                      ></el-input>
                    </el-form-item>                    
                    <el-form-item>
                      <el-input
                        v-model="filterParams.accountName"
                        :placeholder="$t('mycustomer.店铺名称')"
                        @keyup.enter.native="filterGetItem"
                      ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-input
                        v-model="filterParams.email"
                        :placeholder="$t('mycustomer.电子邮箱')"
                        @keyup.enter.native="filterGetItem"
                      ></el-input>
                    </el-form-item>     
                    <el-form-item>
                          <el-date-picker
                            v-model="filterParams.timeCreated"
                            type="daterange"
                            :range-separator="$t('mycustomer.至')"
                            :start-placeholder="$t('mycustomer.开始日期')"
                            :end-placeholder="$t('mycustomer.结束日期')"
                          
                            >
                          </el-date-picker>
                    </el-form-item>                                        
                    <el-form-item>
                      <el-input
                        v-model="filterParams.vendorSku"
                        :placeholder="$t('mycustomer.我已合作的商品SKU编号')"
                        @keyup.enter.native="filterGetItem"
                      ></el-input>
                    </el-form-item>

                    <el-form-item>
                      <el-autocomplete
                        class="mg-r-10"
                        v-model="supplierName"
                        :fetch-suggestions="querySearchAsync"
                        :placeholder="$t('请输入员工名称')"
                      ></el-autocomplete>
                      <!-- <el-input v-model="filterParams.inviterUserId" :placeholder="$t('请输入员工名称')" @keyup.enter.native="filterGetItem"></el-input> -->
                    </el-form-item>
                    <el-form-item :label="$t('mycustomer.storeAuthorized')">
                      <el-select
                        v-model="filterParams.isAuth"
                        style="width: 90px"
                        :placeholder="$t('mycustomer.all')"
                        @change="filterGetItem"
                      >
                        <el-option :label="$t('mycustomer.all')" value></el-option>
                        <el-option :label="$t('mycustomer.yes')" value="true"></el-option>
                        <el-option :label="$t('mycustomer.no')" value="false"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('mycustomer.客户等级')">
                       <el-select
                        v-model="filterParams.clientGrade"                        
                        :placeholder="$t('mycustomer.请选择客户等级')"
                         style="width: 90px"
                        @change="filterGetItem"
                      >
                        <el-option :label="$t('mycustomer.all')" value=''></el-option>  
                        <el-option :label="$t('mycustomer.一级')" value='1'></el-option>
                        <el-option :label="$t('mycustomer.二级')" value="2"></el-option>
                        <el-option :label="$t('mycustomer.三级')" value="3"></el-option>
                      </el-select>                     
                    </el-form-item>
                    <el-form-item :label="$t('mycustomer.客户活跃度')">
                      <el-select
                        v-model="filterParams.dynamic"
                        style="width: 90px"
                        :placeholder="$t('mycustomer.all')"
                        @change="filterGetItem"
                      >
                        <el-option :label="$t('mycustomer.all')" value></el-option>
                        <el-option :label="$t('mycustomer.活跃')" value="1"></el-option>
                        <el-option :label="$t('mycustomer.非活跃')" value="2"></el-option>
                      </el-select>
                    </el-form-item>                    
                    <el-form-item>
                      <el-button type="primary" @click="filterGetItem">
                        {{
                        $t("mycustomer.filter")
                        }}
                      </el-button>
                      <el-button type="danger" @click="clearFilter">
                        {{
                        $t("mycustomer.clear")
                        }}
                      </el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
            <el-table :data="items" stripe row-key="id" style="width: 100%" ref="gridTable">
              <el-table-column prop="customerName" :label="$t('mycustomer.customersName')">
                <template slot-scope="scope">
                  <div>
                    <b>{{ scope.row.customerName }}</b>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="scope.row.customerRemark"
                      placement="right"
                      v-if="scope.row.customerRemark"
                    >
                      <i class="el-icon-chat-line-square"></i>
                    </el-tooltip>
                  </div>
                  <!-- <div>
                    OurMall ID:
                    <b
                      v-if="scope.row.customerId && scope.row.customerId != 0"
                      >{{ scope.row.customerId }}</b
                    >
                    <span v-else>-({{ $t("mycustomer.尚未注册") }})</span>
                  </div>-->
                  <div>
                    {{ $t("mycustomer.授权Shopify") }}:
                    <el-popover
                      v-if="scope.row.shops && scope.row.shops.length"
                      trigger="hover"
                      placement="right"
                    >
                      <div slot style="font-size: 12px">
                        <div v-for="shop in scope.row.shops" :key="shop.url" class="d-flex mg-b-10">
                          <span>{{ $t("mycustomer.shopName") }}</span>
                          <a
                            :href="`//${shop.url}`"
                            target="_blank"
                            class="text-primary"
                          >{{ shop.name }}</a>
                        </div>
                      </div>
                      <span slot="reference">
                        <a
                          style="color: #5c6ac4"
                          href="javascript:;"
                          @click="editShopName(scope.row)"
                        >{{ scope.row.customerAuthCnt }}</a>
                      </span>
                    </el-popover>
                    <span v-else>{{ scope.row.customerAuthCnt }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column v-if="apiUserId == 148797" :label="$t('mycustomer.站长外部编号')">
                <template slot-scope="scope">{{scope.row.customCode || '--'}}</template>
              </el-table-column>
              <el-table-column :label="$t('mycustomer.手机号')">
                <template slot-scope="scope">{{scope.row.customerPhone || '--'}}</template>
              </el-table-column>              
              <el-table-column :label="$t('mycustomer.员工名称')">
                <template slot-scope="scope">{{scope.row.inviterName || '--'}}</template>
              </el-table-column>
              <el-table-column :label="$t('mycustomer.是否开启二级分销商')">
                <template slot-scope="scope">
                  <el-switch
                  v-model="scope.row.distributionSwitch"
                  active-value="1"
                  inactive-value="2"
                  active-color="#13ce66"
                  @change="changeSwitch($event,scope.row.id,scope.row.customerName)"
                  inactive-color="#ff4949">
                </el-switch>
                </template>
              </el-table-column>    
              <el-table-column :label="$t('mycustomer.分销商佣金')">
                    <template slot-scope="scope">
                      <span>
                        {{scope.row.commissionBalance || '--'}}
                      </span>
                      <!-- <el-popover
                        placement="right"
                        width="400"
                        trigger="click">
                        <el-table :data="gridData">
                          <el-table-column width="150" property="date" label="日期"></el-table-column>
                          <el-table-column width="100" property="name" label="姓名"></el-table-column>
                          <el-table-column width="300" property="price" label="金额"></el-table-column>
                        </el-table>
                        <el-link  slot="reference" type="primary">30</el-link>
                      </el-popover> -->
                      <!-- <el-link  type="primary">30</el-link> -->
                    </template>
              </el-table-column>             
              <el-table-column :label="$t('mycustomer.customersContact')">
                <template slot-scope="scope">
                  <div class="customer-info-box">
                    <div v-if="scope.row.customerEmail">
                      <span style="color: #606266">
                        <i class="iconfont icon-email"></i>
                      </span>
                      <a
                        :href="`mailto:${scope.row.customerEmail}`"
                        target="_blank"
                      >{{ scope.row.customerEmail }}</a>
                    </div>
                    <div v-if="scope.row.customerWeChat">
                      <span style="color: #55a947">
                        <i class="iconfont icon-wechat"></i>
                      </span>
                      {{ scope.row.customerWeChat }}
                    </div>
                    <div v-if="scope.row.customerSkype">
                      <span style="color: #00b0f6">
                        <i class="iconfont icon-skype"></i>
                      </span>
                      <a
                        :href="`skype:${scope.row.customerSkype}?chat`"
                        target="_blank"
                      >{{ scope.row.customerSkype }}</a>
                    </div>
                    <div v-if="scope.row.customerLine">
                      <span style="color: #00c300">
                        <i class="iconfont icon-line"></i>
                      </span>
                      {{ scope.row.customerLine }}
                    </div>
                    <div v-if="scope.row.customerQQ">
                      <span style="color: #1e6fff">
                        <i class="iconfont icon-qq"></i>
                      </span>
                      <a
                        :href="`tencent://message/?uin=${scope.row.customerQQ}&Site=5yoho&Menu=yes`"
                      >{{ scope.row.customerQQ }}</a>
                    </div>
                    <div v-if="scope.row.customerWangwang">
                      <span style="color: #009fff">
                        <i class="iconfont icon-wangwang"></i>
                      </span>
                      <a
                        :href="`http://amos.alicdn.com/msg.aw?v=2&uid=${scope.row.customerWangwang}&site=cnalichn&s=11&charset=UTF-8`"
                        target="_blank"
                      >{{ scope.row.customerWangwang }}</a>
                    </div>
                    <div v-if="scope.row.customerWhatsapp">
                      <span style="color: #109d58">
                        <i class="iconfont icon-whatsapp"></i>
                      </span>
                      <a
                        :href="`https://wa.me/${scope.row.customerWhatsapp}`"
                        target="_blank"
                      >{{ scope.row.customerWhatsapp }}</a>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <!-- 新增客户bonus余额列-->
              <el-table-column v-if="$store.state.userInfo.walletOpen != 1">
                <template slot="header">
                  <span>{{ $t("mycustomer.客户Bonus余额") }}({{$store.state.country.symbol}})</span>
                  <el-tooltip
                    :content="$t('mycustomer.您客户账户的预充值金额，如客户线下提前支付给您100美金，您可为其Bonus账户充值100美金，且开启Bonus功能后，您的客户即可在支付订单是用Bonus直接抵扣。')"
                    placement="bottom"
                  >
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </template>
                <template slot-scope="scope">
                  <div>{{ scope.row.bonus || 0 }}</div>
                  <div>
                    <template>
                      <el-link
                        :disabled="!$isRole($route.meta.roleWrite)"
                        class="mg-r-20"
                        :type="
                        (scope.row.bonusStatus == 1 && 'danger') ||
                        (scope.row.bonusStatus == 2 && 'primary') ||
                        'primary'
                      "
                        @click="showBonus(scope.row, 1)"
                      >
                        {{
                        (scope.row.bonusStatus == 1 && $t("mycustomer.停用")) ||
                        (scope.row.bonusStatus == 2 && $t("mycustomer.启用")) ||
                        $t("mycustomer.启用")
                        }}
                      </el-link>
                      <el-link
                        class="mg-r-20"
                        :disabled="!$isRole($route.meta.roleWrite)"
                        type="primary"
                        @click="showBonus(scope.row, 2)"
                      >
                        {{
                        $t("mycustomer.充值")
                        }}
                      </el-link>
                      <el-link
                        :disabled="!scope.row.bonus || !$isRole($route.meta.roleWrite)"
                        type="primary"
                        @click="openDeduction(scope.row)"
                      >
                        {{
                        $t("mycustomer.扣款")
                        }}
                      </el-link>
                      <br />
                    </template>
                    <!-- <el-link type="primary">
                      <router-link tag="span" :to="{path:'/Bonus',query:{id:scope.row.id}}">
                      {{$t("mycustomer.Bonus明细")}}
                      </router-link>
                    </el-link>-->
                  </div>
                </template>
              </el-table-column>
              <!-- 已授权店铺 -->
              <el-table-column :label="$t('mycustomer.已授权店铺')">
                <template slot-scope="scope">
                  <div>
                    <!-- {{ $t("mycustomer.授权店铺数量：") }} -->
                    <b type="primary" style="font-size: 13px">{{ scope.row.customerAuthCnt }}</b>
                  </div>
                  <div>
                    <el-link
                      :disabled="!$isRole($route.meta.roleWrite)"
                      type="primary"
                      @click="openInvitation(scope.row)"
                    >{{ $t("mycustomer.storeInvite") }}</el-link>
                  </div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('mycustomer.注册时间')" prop="timeCreated">

              </el-table-column>
              <el-table-column
                :label="`${$t('mycustomer.总信用额度')}/${$t('mycustomer.剩余信用额度')}`"
                align="center"
              >
                <template slot-scope="scope">
                  <p>{{Number(scope.row.creditAmount).toFixed(2) }}</p>
                  <p>{{ (Number(scope.row.creditAmount) - Number(scope.row.usedCreditAmount)).toFixed(2)   }}</p>
                </template>
              </el-table-column>
              <el-table-column :label="$t('mycustomer.operate')" width="230">
                <template slot-scope="scope">
                  <!-- 编辑 -->
                  <div>
                    <el-link
                      :disabled="!$isRole($route.meta.roleWrite)"
                      class="mg-r-20"
                      type="primary"
                      @click="editVendor(scope.row)"
                    >{{ $t("mycustomer.modify") }}</el-link>
                    <!-- 删除 -->
                    <el-link
                      :disabled="!$isRole($route.meta.roleWrite)"
                      v-if="scope.row.canDelete"
                      type="danger"
                      @click="delVendor(scope.row)"
                    >{{ $t("mycustomer.delete") }}</el-link>
                  </div>
                  <!-- 导入 -->
                  <!-- <div v-if="scope.row.hasAuth != 1">
                    <el-link 
                     :disabled="!$isRole($route.meta.roleWrite)"
                     type="primary" @click="gotoImport(scope.row)">{{
                      $t("mycustomer.orderImport")
                    }}</el-link>
                  </div>-->
                  <!-- 邀请 -->
                  <div v-if="scope.row.shops && scope.row.shops.length != 0">
                    <el-link
                      :disabled="!$isRole($route.meta.roleWrite)"
                      type="primary"
                      @click="editShopName(scope.row)"
                    >
                      {{
                      $t("mycustomer.管理店铺别名")
                      }}
                    </el-link>
                  </div>
                  <!-- IOSS -->
                  <div v-if="scope.row.shops && scope.row.shops.length != 0">
                    <el-link
                      :disabled="!$isRole($route.meta.roleWrite)"
                      type="primary"
                      @click="openSetIOSS(scope.row)"
                    >IOSS setting</el-link>
                  </div>
                  <div>
                    <el-link type="primary" @click="openTX(scope.row)">withdrawals</el-link>
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
              :current-page="page"
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
    <DialogAddVendor
      :addVendorDialog="addVendorDialog"
      @saveSuccess="addVendorSaveSuccess()"
      @openInvite="openInvite"
    />
    <el-dialog
      :title="$t('mycustomer.customersInvite')"
      :visible.sync="dialogInvite.isShow"
      @opened="inviteOpened"
    >
      <el-divider></el-divider>
      <div>
        <el-form v-loading="dialogInvite.wordLoading" class="mg-b-15" label-width="120px">
          <el-form-item :label="$t('mycustomer.messageEnter')">
            <el-input
              type="textarea"
              resize="none"
              :autosize="{ minRows: 3, maxRows: 6 }"
              size="small"
              v-model="dialogInvite.words"
              @change="setInvoiceWord"
              :placeholder="$t('mycustomer.messageInvitation')"
              style="font-size: 14px"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-row :gutter="20">
          <el-col :span="24" class="mg-b-15">
            <div class="d-flex">
              <span class="tx-right mg-r-10" style="width: 120px">
                {{
                $t("mycustomer.appSocial")
                }}
              </span>
              <div
                class="skype-share mg-r-10"
                :data-href="dialogInvite.inviteUrl"
                data-lang="en-US"
                :data-text="`${dialogInvite.words} ${dialogInvite.inviteUrl}`"
                data-style="large"
              ></div>
              <div>
                <el-tooltip placement="bottom">
                  <div slot="content">
                    <p class="tx-center mg-b-10">{{ $t("mycustomer.scan") }}</p>
                    <img :src="dialogInvite.qrcode" width="130" />
                  </div>
                  <a class="share-weixin" href="javascript:;">
                    <i class="fa fa-weixin"></i>
                    {{ $t("mycustomer.share") }}
                  </a>
                </el-tooltip>
              </div>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="d-flex">
              <span class="tx-right mg-r-10" style="width: 120px">
                {{
                $t("mycustomer.urlInvite")
                }}
              </span>
              <a
                class="mg-r-15"
                :href="dialogInvite.inviteUrl"
                target="_blank"
              >{{ dialogInvite.inviteUrl }}</a>
              <el-button
                size="mini"
                type="success"
                v-clipboard:copy="dialogInvite.inviteUrl"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              >{{ $t("mycustomer.urlCopy") }}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <div slot="footer" class="dialog-footer d-flex justify-content-end">
        <el-link type="primary" class="mg-r-30">
          {{
          $t("mycustomer.document")
          }}
        </el-link>
        <el-button @click="dialogInvite.isShow = false">
          {{
          $t("mycustomer.close")
          }}
        </el-button>
      </div>
    </el-dialog>
    <!-- 客户Shopify店铺别名管理 -->
    <el-dialog :title="$t('mycustomer.客户Shopify店铺别名管理')" :visible.sync="ShopifyNameEdit">
      <div class="mg-l-20 mg-b-20 mg-r-20" v-loading="aliasLoading">
        <el-table :data="ShopOtherName">
          <el-table-column property="name" :label="$t('mycustomer.店铺名称')" width="200"></el-table-column>
          <el-table-column property="url" :label="$t('mycustomer.店铺地址')">
            <template slot-scope="scope">
              <a
                :href="`//${scope.row.url}`"
                target="_blank"
                v-if="scope.row.url"
                class="text-primary"
              >{{ scope.row.url }}</a>
              <span v-else>---</span>
            </template>
          </el-table-column>
          <el-table-column property="alias" :label="$t('mycustomer.店铺别名')">
            <template slot-scope="scope">
              <span v-if="scope.row.alias">{{ scope.row.alias }}</span>
              <span v-else>---</span>
            </template>
          </el-table-column>
          <el-table-column property="active" :label="$t('mycustomer.操作')" width="150">
            <template slot-scope="scope">
              <el-link
                type="primary"
                @click="editOtherName(scope)"
                v-if="scope.row.alias"
              >{{ $t("mycustomer.修改店铺别名") }}</el-link>
              <el-link
                type="primary"
                @click="editOtherName(scope)"
                v-if="!scope.row.alias"
              >{{ $t("mycustomer.添加店铺别名") }}</el-link>
              <br />
              <el-link
                type="danger"
                @click="deleteAlias(scope)"
                v-if="scope.row.alias"
              >{{ $t("mycustomer.删除店铺别名") }}</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog
        width="30%"
        :show-close="false"
        :visible.sync="EditInput"
        @close="OtherName = ''"
        append-to-body
      >
        <el-form :label-position="'left'">
          <el-form-item :label="$t('mycustomer.请输入店铺别名:')" label-width="150px">
            <el-input v-model="OtherName"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="EditInput = false">
            {{
            $t("mycustomer.取 消")
            }}
          </el-button>
          <el-button type="primary" @click="ChangeEdit">
            {{
            $t("mycustomer.确定")
            }}
          </el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ShopifyNameEdit = false">
          {{
          $t("mycustomer.关 闭")
          }}
        </el-button>
      </div>
    </el-dialog>
    <!-- 启用或停用bonus抵扣功能的模态框 -->
    <el-dialog
      :title="$t('mycustomer.提示')"
      :visible="bonusParams.isShow && bonusParams.type == 1"
      width="30%"
      class="dialog-open-custom"
      @close="bonusParams.isShow = false"
    >
      <el-divider></el-divider>
      <div class="dialog-body">
        <p>
          {{ bonusParams.status == 1?$t('mycustomer.确定为 {name} 客户关闭Bonus抵扣功能？',{name:bonusParams.name})
          :$t('mycustomer.确定为 {name} 客户开启Bonus抵扣功能？',{name:bonusParams.name})}}
        </p>
      </div>
      <el-divider></el-divider>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bonusParams.isShow = false">{{$t('mycustomer.取 消')}}</el-button>
        <el-button
          type="primary"
          :loading="bonusParams.loading"
          @click="updateBonus"
        >{{$t('mycustomer.确定')}}</el-button>
      </div>
    </el-dialog>
    <!-- 充值bonus余额的模态框 -->
    <el-dialog
      :title="$t('mycustomer.为{name}客户充值Bonus',{name:bonusParams.name})"
      :visible="bonusParams.isShow && bonusParams.type == 2"
      width="50%"
      class="dialog-open-custom"
      @close="bonusParams.isShow = false"
    >
      <el-divider></el-divider>
      <div class="dialog-body">
        <el-form>
          <el-form-item :label="$t('mycustomer.请输入金额：')" required>
            <el-input-number :min="0" :precision="2" :controls="false" v-model="bonusParams.num"></el-input-number>
          </el-form-item>
          <el-form-item>
            <i class="el-icon-info"></i>
            {{$t('mycustomer.bonusTips')}}
          </el-form-item>
          <el-form-item class="d-flex bonusRemark" :label="$t('mycustomer.备注：')">
            <el-input type="textarea" :autosize="{ minRows: 2}" v-model="bonusParams.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bonusParams.isShow = false">{{$t('mycustomer.取 消')}}</el-button>
        <el-button
          type="primary"
          :loading="bonusParams.loading"
          @click="addBonusNum"
        >{{$t('mycustomer.确定')}}</el-button>
      </div>
    </el-dialog>
    <!-- 批量设置邮件推送 -->
    <el-dialog
      :title="$t('mycustomer.batchSettings')"
      :visible.sync="dialogEmailVisible"
      width="30%"
    >
      <div class="email-box">
        <span class="txt">是否允许推送shopifly邮件</span>
        <el-switch v-model="sendEmailFlag" @change="switchEmail"></el-switch>
      </div>
      <div class="email-box">
        <span class="txt">佣金批量设置</span>
        <el-input-number type="number"   :precision="4" @change="rageTick"  :controls="false"  v-model="BathBrokerage" autocomplete="off" style="width:150px"></el-input-number>
      </div>        
    </el-dialog>
    <el-backtop
      class="goto-top"
      target=".main-scroll  .el-scrollbar__wrap"
      :right="20"
      :bottom="20"
    ></el-backtop>
    <DialogSettingIOSS :data="dialogSettingIossData" />
    <dialogDeduction :data="dialogDeductionData" @saveDeduction="saveDeduction" />
        <el-dialog
      :title="$t('mycustomer.分销商佣金提现')"
      :before-close="cleanClose"
      :visible.sync="visibleTX"
      width="550px"
      :close-on-click-modal="false">
      <el-form
        ref="dynamicValidateForm"
        :model="dynamicValidateForm"
        label-width="100px"
        class="demo-dynamic">
        <el-form-item
          prop="itemTotal"
          :label="$t('mycustomer.提现金额')"
          :rules="[{required: true, message: $t('mycustomer.请输入佣金提现金额'), trigger: 'blur'}]">
          <el-input
            v-model="dynamicValidateForm.itemTotal"
            style="width: 250px"
            oninput="value=value.replace(/[^\d.]/g,'')">
            <el-button slot="append">￥</el-button>
          </el-input>
        </el-form-item>

        <!-- <el-form-item
          prop="remark"
          :label="$t('mycustomer.备注')"
          :rules="[{required: true, message: $t('mycustomer.请输入'), trigger: 'blur'}]">
          <el-input
            v-model="dynamicValidateForm.remark"
            type="textarea"
            :rows="2"
            style="width: 250px">
          </el-input>
        </el-form-item> -->
        <!-- <el-form-item :label="$t('mycustomer.凭证')" required>
          <div v-loading="uploading" class="up-avatar">
            <el-upload
              ref="elupload"
              class="avatar-uploader"
              action="#"
              :http-request="httpRequest"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload">
              <img
                v-if="dynamicValidateForm.certificate_urls"
                :src="dynamicValidateForm.certificate_urls"
                class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item> -->
        <el-form-item>
          <el-button size="small" type="primary" @click="submitForm('dynamicValidateForm')">{{
            $t('mycustomer.confirm')
          }}</el-button>
          <el-button size="small" @click="resetForm('dynamicValidateForm')">{{
            $t('mycustomer.cancel')
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import DialogAddVendor from "./../components/dialog/AddVendor"
import DialogSettingIOSS from "@/views/MyCustom/DialogSettingIoss"
import dialogDeduction from "@/views/MyCustom/dialogDeduction"
export default {
  data () {
    return {
      searchList: [],
      supplierName: "",
      aliasLoading: false,
      dialogEmailVisible: false,
      OtherName: "",
      shopId: "",
      shopIndex: "",
      uploading: false,
      visibleTX:false,
      loading: false,
      sendEmailFlag: true,
      ShopifyNameEdit: false,
      EditInput: false,
      BathBrokerage: '',
      dynamicValidateForm: {
          itemTotal: '',
          remark: '',
          certificate_urls: '',
      },
      tableHeight: 400,
      reSizeTime: 0,
      pageSizes: [10, 20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("myCustomRowsPerPage")
        ? Number(localStorage.getItem("myInvoiceRowsPerPage"))
        : 10,
      items: [],
      total: 0,
      totalPage: 0,
      ShopOtherName: [],
      addVendorDialog: {
        isEdit: false,
        isShow: false,
        loading: false,
        creditStatus: true,
        creditAmount: 0.00,
        labelW: "100px",
        name: "",
        remark: "",
        email: "",
        id: "",
        weChat: "",
        skype: "",
        line: "",
        QQ: "",
        wangwang: "",
        whatsapp: "",
        customCode: "",
        customerPhone: '',
        clientGrade: '',
        brokerage:'',
        
      },
       gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          price: '14.5'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          price: '14.5'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          price: '14.5'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          price: '14.5'
        }],
      filterParams: {
        customCode: "",
        customerId: "",
        vendorSku: "",
        name: "",
        email: "",
        isAuth: "",
        dynamic:'',
        customerLike: "",
        relationshipId: "",
        inviterUserId: '',
        shopName: '',
        clientGrade: '',
        customerPhone: '',
        timeCreated: '',
        createTimeFrom: '',
        createTimeTo: '',
        accountName: '',
        clientGrade: '',
      },
      customerId: '',
      filterParamsDefault: "{}",
      dialogInvite: {
        isShow: false,
        loading: false,
        wordLoading: false,
        words: "",
        inviteUrl: "",
        qrcode: "",
      },
      dialogInviteDefault: "{}",
      selectLoading: false,
      selectArr: [],
      // 启用或停用bonus抵扣和充值bonus余额所需字段
      bonusParams: {
        remark: "",
        type: "",
        isShow: false,
        loading: false,
        id: "",
        status: "",
        name: "",
        num: undefined,
      },
      bonusParamsDefault: "{}",
      dialogSettingIossData: {
        isShow: false,
        loading: false,
        isOpenIoss: false,
        items: [],
        id: '',
      },
      defaultDialogSettingIossData: '{}',
      dialogDeductionData: {
        isShow: false,
        loading: false,
        item: '',
      },
      defaultDialogDeductionData: '{}',
      apiUserId: JSON.parse(localStorage.getItem('userInfo')).id,
    }
  },
  components: {
    DialogAddVendor,
    DialogSettingIOSS,
    dialogDeduction,
  },
  watch: {
    $route: "gotoPage",
  },
  mounted () {
    setTimeout(() => {
      // let userInfo = this.$store.state.userInfo;
      let configJson = JSON.parse(localStorage.getItem('userInfo')).configJson
      let shopifyEmailType = JSON.parse(configJson).deliverNotifyCustomer
      this.BathBrokerage = JSON.parse(configJson).brokerage
      if (shopifyEmailType) {
        console.log(111111, shopifyEmailType)
        this.sendEmailFlag = shopifyEmailType === "2" ? false : true
        console.log(111121651511, this.sendEmailFlag)
      }
    }, 1000)
    if (this.$route.query.id) {
      this.filterParams.relationshipId = this.$route.query.id
      // this.getItem();
    }

    (this.filterParams.isAuth = this.$route.query.isAuth
      ? this.$route.query.isAuth
      : ""),
      (this.addVendorDialogDefault = JSON.stringify(this.addVendorDialog))
    this.filterParamsDefault = JSON.stringify(this.filterParams)
    this.dialogInviteDefault = JSON.stringify(this.dialogInvite)
    this.bonusParamsDefault = JSON.stringify(this.bonusParams)
    this.defaultDialogSettingIossData = JSON.stringify(this.dialogSettingIossData)
    this.defaultDialogDeductionData = JSON.stringify(this.dialogDeductionData)
    this.getItem()

  },

  methods: {
    querySearchAsync (queryString, cb) {
      if (!queryString) {
        return false
      }
      this.$apiCall(
        "api.SubUser.findByUser",
        {
          nameLike: queryString,
          page: 1,
          rowsPerPage: 10,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            if (r.Data.Results.length == 0) {
              this.$message.error(this.$t("supplier.搜索不到数据"))
            }
            this.searchList = r.Data.Results
            var results = queryString
              ? this.searchList.filter(
                (item) => item.name.indexOf(queryString) > -1
              )
              : this.searchList
            results = results.map((item) => ({ value: item.name }))
            cb(results)
          } else {
            this.$message.error(r.Message)
          }
        }
      )
    },
    cleanClose(){
      this.visibleTX = false
    },
    openTX(row){
      this.customerId= row.id
      this.visibleTX = true
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            relationshipId: this.customerId,
            amount: this.dynamicValidateForm.itemTotal,
            // remark: this.dynamicValidateForm.remark,
            // certificate_urls: this.dynamicValidateForm.certificate_urls,
          }
        this.$apiCall("api.Relationship.commissionWithdrawal", params, (r) => {
        if (r.ErrorCode == 9999) {
          this.$elementMessage(this.$t("orders.success"), "success")
          this.visibleTX = false
          this.getItem(true)
        } else {
          this.$message({ message: r.Message, type: "error" })
        }
      })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },   
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.visibleTX = false
      
    },     
    openDeduction (item) { //打开ioss设置
      this.dialogDeductionData = JSON.parse(this.defaultDialogDeductionData)
      this.dialogDeductionData.item = item
      this.dialogDeductionData.isShow = true
    },
    saveDeduction (params) {
      this.dialogDeductionData.loading = true
      this.$apiCall("api.Relationship.reduceBonusVendor", params, (r) => {
        this.dialogDeductionData.loading = false
        if (r.ErrorCode == 9999) {
          this.$elementMessage(this.$t("orders.success"), "success")
          this.dialogDeductionData.isShow = false
          this.getItem(true)
        } else {
          this.$message({ message: r.Message, type: "error" })
        }
      })
    },
    //是否开启二级分销商
    changeSwitch(e, id, name){
      let params = {
        relationshipId : id,
        distributionSwitch: e,
        name: name,
      }
      this.$apiCall('api.Relationship.changeByVendor', params, (r) => {
        this.addVendorDialog.loading = false;
        if (r.ErrorCode == 9999) {
          this.$message({
            message: 'success',
            type: "success",
          });
          this.getItem()
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      });
    },    
    openSetIOSS (item) { //打开ioss设置
      this.dialogSettingIossData = JSON.parse(this.defaultDialogSettingIossData)
      this.dialogSettingIossData.id = item.id
      this.dialogSettingIossData.isShow = true
    },
    deleteAlias (shop) {
      this.aliasLoading = true
      this.$apiCall(
        "api.ShopifyAccount.changeAlias",
        {
          id: shop.row.id,
          name: "",
        },
        (r) => {
          this.aliasLoading = false
          if (r.ErrorCode == 9999) {
            this.ShopOtherName[shop.$index].alias = ""
            this.$message({ message: this.$t('mycustomer.删除成功'), type: "success" })
          } else {
            this.$message({ message: r.Message, type: "error" })
          }
        }
      )
    },
    //open批量设置dialog
    openBatchVendor () {
      this.dialogEmailVisible = true
    },
        beforeAvatarUpload (file) {
      console.log(file)
      this.imgName = file.name
      this.nowFile = file
    },
    httpRequest (data) {
      // this.imageUrl = URL.createObjectURL(data.file)
      //这是限制上传文件类型 
      const isPFX = data.file.type === 'image/jpeg' || data.file.type === 'image/jpg' || data.file.type === 'image/png'
      const isLt2M = data.file.size / 1024 / 1024 < 2
      if (!isPFX) {
        this.$message.error("上传头像图片只能是 JPG、PNG、JPEG 格式!")
      } else if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 2MB!")
      } else {
        this.getBase64(data.file).then(resBase64 => {
          this.fileBase64 = resBase64.split(',')[1]　　//直接拿到base64信息
          let ext = resBase64.match(/data:image\/(.*);base64,.*/)[1]
          console.log(this.tempUrl, 'this.tempUrl')
          this.getUploadImgUrl(this.fileBase64, ext)
        })
      }
    },
    handleRemove (file, fileList) {

    },
    getUploadImgUrl (imgUrlBase64, ext) {
      //图片上传接口
      this.$apiCall('api.Comment.uploadImg', {
        imgUrlBase64,
        ext
      }, r => {
        // obj.loading = false
        if (r.ErrorCode == 9999) {
          this.dynamicValidateForm.certificate_urls = r.Data.Results.imgUrl
        } else {
          // this.form.imgUrlsList.splice(this.form.imgUrlsList.length - 1, 1)
          this.$message({
            message: r.Message,
            type: "error"
          })
        }
      })
    },    
    getBase64 (file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        let fileResult = ""
        reader.readAsDataURL(file)
        //开始转
        reader.onload = function () {
          fileResult = reader.result
        }
        //转 失败
        reader.onerror = function (error) {
          reject(error)
        }
        //转 结束  咱就 resolve 出去
        reader.onloadend = function () {
          resolve(fileResult)
        }
      })
    },    
    switchEmail (v) {
      let type = v == true ? 1 : 2
      this.$apiCall("api.User.changeByUser", { deliverNotifyCustomer: type }, (r) => {
        if (r.ErrorCode == 9999) {
          this.$message({ message: r.Message, type: "success" })
        } else {
          this.$message({ message: r.Message, type: "error" })
        }
      })
    },
    ChangeEdit () {
      this.aliasLoading = true
      let name = this.OtherName
      this.$apiCall(
        "api.ShopifyAccount.changeAlias",
        {
          id: this.shopId,
          name,
        },
        (r) => {
          this.EditInput = false
          this.aliasLoading = false
          if (r.ErrorCode == 9999) {
            this.ShopOtherName[this.shopIndex].alias = name
            this.$message({ message: this.$t('mycustomer.修改成功'), type: "success" })
          } else {
            this.$message({ message: r.Message, type: "error" })
          }
        }
      )
    },
    editOtherName (shop) {
      this.EditInput = true
      this.shopId = shop.row.id
      this.shopIndex = shop.$index
    },
    editShopName (shop) {
      this.ShopifyNameEdit = true
      this.ShopOtherName = shop.shops
    },
    close () {
      this.selectArr = []
      // todo
      this.filterParams.relationshipId = ''
      this.getItem()
    },
    rageTick(){
      this.$apiCall("api.User.changeByUser", { brokerage: this.BathBrokerage }, (r) => {
        if (r.ErrorCode == 9999) {
          this.$message({ message: r.Message, type: "success" })
          this.dialogEmailVisible = false
          this.getItem()
        } else {
          this.$message({ message: r.Message, type: "error" })
        }
      })          
    },    
    goTo (n, row) {
      this.$router.push({
        name: n,
        params: {
          id: row.id,
          customerName: row.customerName,
        },
      })
    },
    remoteMethodCustom (query) {
      this.selectArr = []
      //获取筛选客户
      if (!query) return
      this.selectLoading = true
      this.$apiCall("api.Relationship.findByVendor", { name: query }, (r) => {
        this.selectLoading = false
        if (r.ErrorCode == 9999) {
          this.selectArr = r.Data.Results
        } else {
          this.$message({ message: r.Message, type: "error" })
        }
      })
    },
    setInvoiceWord () {
      //设置话术
      this.dialogInvite.wordLoading = true
      this.$apiCall(
        "api.User.setWords",
        { words: this.dialogInvite.words },
        (r) => {
          this.dialogInvite.wordLoading = false
          if (r.ErrorCode == 9999) {
            this.$message({
              message: this.$t("mycustomer.savedSuccess"),
              type: "success",
            })
            let userInfo = this.$store.state.userInfo
            userInfo.inviteWords = this.dialogInvite.words
            this.$store.commit("setUserInfo", userInfo)
            localStorage.setItem("userInfo", JSON.stringify(userInfo))
          } else {
            this.$message({ message: r.Message, type: "error" })
          }
        }
      )
    },
    onCopy () {
      this.$elementMessage(this.$t("mycustomer.copiedSuccess"), "success")
    },
    onError () {
      this.$elementMessage(this.$t("mycustomer.copiedFailed"), "error")
    },
    inviteOpened () {
      //邀请弹层打开后
      (function (r, d, s) {
        r.loadSkypeWebSdkAsync =
          r.loadSkypeWebSdkAsync ||
          function (p) {
            var js,
              sjs = d.getElementsByTagName(s)[0]
            if (d.getElementById(p.id)) {
              return
            }
            js = d.createElement(s)
            js.id = p.id
            js.src = p.scriptToLoad
            js.onload = p.callback
            sjs.parentNode.insertBefore(js, sjs)
          }
        var p = {
          scriptToLoad:
            "https://swx.cdn.skype.com/shared/v/latest/skypewebsdk.js",
          id: "skype_web_sdk",
        }
        r.loadSkypeWebSdkAsync(p)
      })(window, document, "script")
    },
    openInvite (name) {
      this.items.some((e) => {
        if (e.customerName == name) {
          this.openInvitation(e)
          return true
        }
      })
    },
    openInvitation (item) {
      //打开邀请链接弹层
      this.dialogInvite = JSON.parse(this.dialogInviteDefault)
      this.dialogInvite.isShow = true
      this.dialogInvite.words = this.$store.state.userInfo.inviteWords
      this.dialogInvite.inviteUrl = `${location.host.indexOf('sandbox') > -1 ? 'sandbox' : ''}${this.$store.state.userInfo.shop.subDomain}.bcndropshippingelite.com/`
      this.dialogInvite.qrcode = item.qrcodeBase64
    },
    clearFilter () {
      this.supplierName = ""
      //清空筛选
      this.filterParams = JSON.parse(this.filterParamsDefault)
      this.selectArr = []
      if (this.$route.query.page == 1) {
        this.getItem()
      } else {
        this.$router.push({ query: { page: 1 } })
      }
    },
    filterGetItem (type) {
      //筛选
      if (type == "relationshipId") {
        this.selectArr.forEach((c) => {
          if (c.customerName == this.filterParams.name)
            this.filterParams.relationshipId = c.id
        })
        this.getItem()
      } else {
        if (this.$route.query.page == 1) {
          this.getItem()
        } else {
          this.$router.push({ query: { page: 1 } })
        }
      }
    },
    gotoImport (item) {
      this.$router.push({ name: "importData", query: { rid: item.id } })
    },
    delVendor (item) {
      //删除
      this.$confirm(this.$t("mycustomer.confirmToCancel"), "", {
        confirmButtonText: this.$t("mycustomer.delete"),
        cancelButtonText: this.$t("mycustomer.cancel"),
        type: "error",
      })
        .then(() => {
          this.$apiCall(
            "api.Relationship.deleteByVendor",
            { relationshipId: item.id },
            (r) => {
              if (r.ErrorCode == 9999) {
                this.$root
                this.$message({
                  message: this.$t("mycustomer.cancelSuccess"),
                  type: "success",
                })
                this.$root.$children[0].getCnt()
                this.getItem(true)
              } else {
                this.$message({ message: r.Message, type: "error" })
              }
            }
          )
        })
        .catch(() => { })
    },
    editVendor (item) {
      this.addVendorDialog = JSON.parse(this.addVendorDialogDefault)
      this.addVendorDialog.name = item.customerName
      this.addVendorDialog.email = item.customerEmail
      this.addVendorDialog.remark = item.customerRemark
      this.addVendorDialog.id = item.id
      this.addVendorDialog.weChat = item.customerWeChat
      this.addVendorDialog.customerPhone = item.customerPhone
      this.addVendorDialog.clientGrade = item.clientGrade
      this.addVendorDialog.skype = item.customerSkype
      this.addVendorDialog.line = item.customerLine
      this.addVendorDialog.QQ = item.customerQQ
      this.addVendorDialog.wangwang = item.customerWangwang
      this.addVendorDialog.creditStatus = item.creditStatus == '2' ? false : true
      this.addVendorDialog.creditAmount = item.creditAmount
      this.addVendorDialog.whatsapp = item.customerWhatsapp
      this.addVendorDialog.isShow = true
      this.addVendorDialog.isEdit = item.customerEmail ? true : false
      this.addVendorDialog.customCode = item.customCode || ''
      this.addVendorDialog.brokerage = item.brokerage || ''
    },
    openAddVendor () {
      this.addVendorDialog = JSON.parse(this.addVendorDialogDefault)
      this.addVendorDialog.isShow = true
    },
    addVendorSaveSuccess () {
      this.clearFilter()
    },
    getItem (s) {
      this.loading = true
      if (this.supplierName) {
        this.filterParams.inviterUserId = this.searchList.find((item) => item.name == this.supplierName).subUserId
      }

      this.$apiCall(
        "api.Relationship.findByVendor",
        {
          page: this.page,
          rowsPerPage: this.rowsPerPage,
          name: this.filterParams.name,
          accountName: this.filterParams.accountName,
          customerId: this.filterParams.customerId,
          customCode: this.filterParams.customCode,
          customerPhone: this.filterParams.customerPhone,
          vendorSku: this.filterParams.vendorSku,
          email: this.filterParams.email,
          isAuth: this.filterParams.isAuth,
          actDegree: this.filterParams.dynamic,
          customerLike: '',
          clientGrade: this.filterParams.clientGrade,
          relationshipId: this.filterParams.relationshipId,
          inviterUserId: this.filterParams.inviterUserId,
          createTimeFrom: this.filterParams.timeCreated? this.filterParams.timeCreated[0] : '',
          createTimeTo: this.filterParams.timeCreated? this.filterParams.timeCreated[1] : '',
          status: 1,
        },
        (r) => {
          this.loading = false
          if (r.ErrorCode == 9999) {
            this.items = r.Data.Results
            this.items.forEach((n) => {
              this.$apiCall(
                "api.Relationship.getCntDetail",
                {
                  relationshipId: n.id,
                },
                (i) => {
                  if (i.ErrorCode == 9999) {
                    n.invoiceCnt = i.Data.Results.invoiceCnt
                    n.totalAmount = i.Data.Results.totalAmount
                    n.orderCnt = i.Data.Results.orderCnt
                    n.skuCnt = i.Data.Results.skuCnt
                    n.offerSkuCnt = i.Data.Results.offerSkuCnt
                    this.items = [...this.items]
                  }
                }
              )
            })

            this.total = Number(r.Data.Pagination.totalCount)
            this.totalPage = Number(r.Data.Pagination.totalPage)
            // this.$getTableHeight(this);
            if (!s) this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0
            if (this.$route.params.openInvite) {
              this.items.some((e) => {
                if (e.customerName == this.$route.params.name) {
                  this.openInvitation(e)
                  this.$route.params.openInvite = false
                  return true
                }
              })
            }
            if (this.$route.params.item) {
              this.openInvitation(this.$route.params.item)
              this.$route.params.item = null
            }

            if (this.$route.query.id) {
              if (this.items.length != 0) {
                this.filterParams.relationshipId = ""
                this.openInvitation(this.items[0])
              }
            }
          } else {
            this.$message({ message: r.Message, type: "error" })
          }
        }
      )
    },
    toPage (val) {
      if (val != this.$route.query.page)
        this.$router.push({ query: { page: val } })
    },
    changePageSize (val) {
      this.rowsPerPage = val
      localStorage.setItem("myCustomRowsPerPage", val)
      this.getItem()
    },
    gotoPage () {
      this.page = this.$route.query.page ? Number(this.$route.query.page) : 1
      this.getItem()
    },
    /**
     * 根据type类型打开Bonus业务的相关模态框
     */
    showBonus (params, type) {
      this.bonusParams = JSON.parse(this.bonusParamsDefault)
      this.bonusParams.type = type
      this.bonusParams.id = params.id
      this.bonusParams.name = params.customerName
      if (type == 1) {
        this.bonusParams.status = params.bonusStatus
      }
      this.bonusParams.isShow = true
    },
    /**
     * 修改bonus账户的状态
     */
    updateBonus () {
      this.bonusParams.loading = true
      this.$apiCall(
        "api.Relationship.changeBonusStatusVendor",
        {
          relationshipId: this.bonusParams.id,
        },
        (r) => {
          this.bonusParams.loading = false
          if (r.ErrorCode == 9999) {
            this.$message({
              message: this.bonusParams.status == 1 ? this.$t("mycustomer.停用成功") : this.$t("mycustomer.启用成功"),
              type: "success",
            })
            this.bonusParams.isShow = false
            this.getItem(true)
          } else {
            this.$message({ message: r.Message, type: "error" })
          }
        }
      )
    },
    /**
     * 为指定客户充值bonus余额
     */
    addBonusNum () {
      if (!this.bonusParams.num) {
        this.$message({ message: this.$t("mycustomer.充值金额必须填写"), type: "error" })
        return
      }
      this.bonusParams.loading = true
      this.$apiCall(
        "api.Relationship.addBonusVendor",
        {
          relationshipId: this.bonusParams.id,
          bonus: this.bonusParams.num,
          remark: this.bonusParams.remark,
        },
        (r) => {
          this.bonusParams.loading = false
          if (r.ErrorCode == 9999) {
            this.$message({ message: this.$t("mycustomer.充值成功"), type: "success" })
            this.bonusParams.isShow = false
            this.getItem(true)
          } else {
            this.$message({ message: r.Message, type: "error" })
          }
        }
      )
    },
  },
};
</script>

<style lang="scss" scoped>
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
.customer-info-box {
  > div {
    display: flex;
    align-items: center;
    margin-bottom: 3px;
    color: #606266;
    > span {
      margin-right: 5px;
      i {
        line-height: 26px;
        font-size: 22px;
      }
    }
  }
}
.el-icon-chat-line-square {
  font-size: 18px;
  margin-left: 7px;
}
.up-avatar ::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  width: 78px;
  height: 78px;
  position: relative;
  overflow: hidden;
  img {
    // width: 100%;
    height: 78px;
  }
}
.up-avatar ::v-deep .avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  line-height: 78px;
  text-align: center;
}
.dialog-open-custom {
  .dialog-body {
    padding: 15px 20px;
    p {
      margin-bottom: 30px;
    }
  }
  ::v-deep .el-form-item__label {
    width: 110px !important;
    text-align: left !important;
  }
  .bonusRemark ::v-deep .el-form-item__content {
    flex: 1;
  }
}
.email-box {
  padding: 20px;
  .txt {
    padding-right: 15px;
  }
}
</style>