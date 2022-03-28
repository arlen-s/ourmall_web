<template>
  <div :class="{ dropshipping: baseUrl == '/my' }">
    <div v-if="!$route.meta.urlActive" id="app">
      <router-view ref="fhome"></router-view>
      <!-- <Chat
        v-if="
          $route.name == 'home' ||
          $route.name == 'productsMarketHome' ||
          $route.name == 'productsDetilHome'
        "
        ref="chatBtn"
        :newChatNum="newChatNum"
      /> -->
    </div>
    <div
      v-else-if="$route.name"
      id="app"
      class="admin-page"
      :class="{ 'admin-page-max': pageMax }"
    >
      <DHeader
        :data="(setting && setting.header) || ''"
        :headerMenu="headerMenu"
        class="home-header"
      />
      <!-- <homeHeader :name="shopName" ref="homeHeader" /> -->
      <!-- <div class="admin-header" :class="headerClass">
        <div class="d-flex">
          <a href="/">
            <h1
              :style="{
                backgroundImage:
                  baseUrl == '/my'
                    ? `url(${baseUrl}/images/dropshipping-logo.png)`
                    : 'url(/images/logo3.png)',
                width: baseUrl == '/my' ? '268px' : '210px',
                height: baseUrl == '/my' ? '49px' : '32px',
              }"
            ></h1>
          </a>
          <el-alert
            v-if="$store.state.userInfo.isDemo"
            title="Demo account"
            type="warning"
            :closable="false"
            show-icon
            style="margin-left: 15px; width: 150px"
          >
          </el-alert>
        </div>
        <div class="right"> -->
      <!-- source == 1 才有付费相关 -->
      <!-- <template v-if="$store.state.userInfo.source == '1'">
            <div class="order-qty">
              <span class="mg-r-10">
                Your orders QTY: <b>{{ $store.state.userInfo.orderNum }}</b>
              </span>
              <router-link :to="{ name: 'Rechareg' }">Recharge</router-link>
            </div> -->
      <!-- <router-link :to="{ name: 'ticket' }" class="header-msg mg-r-15">
              <i class="el-icon-headset"></i>
              <div v-if="Number($store.state.newMsgNum)" class="msg-num"></div>
            </router-link> -->
      <!-- </template>
          <el-dropdown
            v-if="$store.state.userInfo"
            trigger="click"
            @command="handleCommand"
          >
            <span class="el-dropdown-link">
              {{ $store.state.userInfo.name }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                class="align-items-end-flex"
                style="width: 180px"
                command="home"
              >
                <i class="mg-r-15 fa fa-home" aria-hidden="true"></i> Home
              </el-dropdown-item>
              <el-dropdown-item
                class="align-items-end-flex"
                style="width: 180px"
                command="profile"
              >
                <i class="mg-r-15 fa fa-user-o" aria-hidden="true"></i> My Profile
              </el-dropdown-item>
              <el-dropdown-item
                class="align-items-end-flex"
                style="width: 180px"
                command="settings"
              >
                <i class="mg-r-15 el-icon-setting" aria-hidden="true"></i> Settings
              </el-dropdown-item>
              <template v-if="baseUrl == '/my'"> -->
      <!-- 钱包导航 -->
      <!-- <el-dropdown-item
                  class="align-items-end-flex"
                  style="width: 180px"
                  command="wallet"
                >
                  <i
                    class="mg-r-15 iconfont icon-qianbao"
                    style="font-size: 14px"
                    aria-hidden="true"
                  ></i>
                  My Wallet
                </el-dropdown-item>
              </template>
              <el-dropdown-item
                v-if="$store.state.userInfo.source == '1'"
                class="align-items-end-flex"
                style="width: 180px"
                command="rewards"
              >
                <i class="mg-r-15 fa fa-gift" aria-hidden="true"></i> Invitation
                Rewards
              </el-dropdown-item>
              <el-dropdown-item
                class="d-flex"
                style="width: 180px"
                command="exit"
              >
                <i class="mg-r-15 fa fa-sign-out" aria-hidden="true"></i> Exit
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div> -->
      <!-- <div class="header-crumbs">
        <div>
          <a href="javascript:;" @click="changeSize" style="margin-right: 30px">
            <i v-if="pageMax" class="el-icon-s-unfold"></i>
            <i v-else class="el-icon-s-fold"></i>
          </a>
          <el-breadcrumb
            separator-class="el-icon-arrow-right"
            style="font-size: 20px"
          >
            <el-breadcrumb-item
              ><a class="text-primary" style="font-size: 20px" href="/"
                >Home Page</a
              ></el-breadcrumb-item
            >
            <el-breadcrumb-item
              v-if="
                $route.name != 'dashboard' &&
                $route.meta.urlActive != '/dashboard'
              "
              :to="{ path: '/dashboard' }"
              >Dashboard</el-breadcrumb-item
            >
            <template v-if="this.$route.meta.makeOffers">
              <el-breadcrumb-item :to="{ path: '/orders' }"
                >Order</el-breadcrumb-item
              >
              <el-breadcrumb-item>Quotation</el-breadcrumb-item>
            </template>
            <el-breadcrumb-item v-else>{{ this.navName }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div> -->
      <div class="admin-main">
        <div class="admin-left-side">
          <el-row class="tac h-100">
            <el-col :span="24" class="h-100">
              <el-scrollbar style="height: 100%">
                <div
                  v-if="baseUrl != '/my'"
                  class="menu-box"
                  style="background-color: #ebeef5"
                >
                  <el-menu
                    class="main-menu"
                    router
                    :default-active="
                      $route.name == 'ordersManagement'
                        ? $route.path
                        : $route.meta.urlActive
                    "
                    background-color="#EBEEF5"
                    text-color="#606266"
                    active-text-color="#fff"
                    :default-openeds="openeds"
                    :unique-opened="true"
                    @select="menuSelect"
                  >
                    <!--v-show="!(nav.id == 6 && $store.state.userInfo.username != 'test1')"-->
                    <template v-for="nav in navMenu">
                      <el-menu-item
                        v-if="!nav.subItem"
                        :key="nav.id"
                        :disabled="!nav.enabled"
                        :index="nav.path"
                        :data-name="nav.text"
                        :style="
                          nav.id == '21'
                            ? 'margin-top: 5px; border-top: 1px #dcdfe6 solid'
                            : ''
                        "
                      >
                        <template slot="title">
                          <!-- <i :class="nav.icon"></i> -->
                          <img :src="nav.image" width="16" class="mg-r-10" />
                          <span>{{ nav.text }}</span>
                        </template>
                      </el-menu-item>
                      <el-submenu
                        v-else
                        :key="nav.id + 'b'"
                        :index="nav.id + 'b'"
                        :disabled="!nav.enabled"
                      >
                        <template slot="title">
                          <!-- <i :class="nav.icon"></i> -->
                          <img :src="nav.image" width="16" class="mg-r-10" />
                          <span>{{ nav.text }}</span>
                        </template>
                        <el-menu-item-group>
                          <el-menu-item
                            v-for="sub in nav.subItem"
                            :key="sub.name"
                            :index="sub.path"
                            :disabled="!sub.enabled"
                            :data-name="sub.name"
                            >{{ sub.name }}</el-menu-item
                          >
                        </el-menu-item-group>
                      </el-submenu>
                    </template>
                    <!-- <el-menu-item v-if="$store.state.userInfo.source == '1'">
                      <template slot="title">
                        <div @click="handleCommand('rewards')">
                          <i :class="'fa fa-gift'"></i>
                          <span>Invitation rewards</span>
                        </div>
                      </template>
                    </el-menu-item> -->
                    <!-- <el-submenu
                      index="a"
                      style="margin-top: 15px; border-top: 1px #dcdfe6 solid"
                    >
                      <template slot="title">
                        <i class="el-icon-question"></i>
                        <span>Help</span>
                      </template>
                      <el-menu-item-group> -->
                    <!-- <el-menu-item index="/ticket">
                          <span style="position: relative">
                            Support
                            <span
                              v-if="Number($store.state.newMsgNum)"
                              class="msg-num support-msg-num"
                            >
                            </span>
                          </span>
                        </el-menu-item> -->
                    <!-- <el-menu-item index="/guidance">Tutorial</el-menu-item>
                      </el-menu-item-group>
                    </el-submenu> -->
                  </el-menu>
                </div>
                <div v-else class="menu-box" style="background-color: #f6f1eb">
                  <el-menu
                    class="main-menu"
                    router
                    :default-active="
                      $route.name == 'ordersManagement'
                        ? $route.path
                        : $route.meta.urlActive
                    "
                    background-color="#F6F1EB"
                    text-color="#606266"
                    active-text-color="#fff"
                    :default-openeds="openeds"
                    :unique-opened="true"
                    @select="menuSelect"
                  >
                    <!--v-show="!(nav.id == 6 && $store.state.userInfo.username != 'test1')"-->
                    <template v-for="nav in navMenu">
                      <el-menu-item
                        v-if="!nav.subItem"
                        :key="nav.id"
                        :disabled="!nav.enabled"
                        :index="nav.path"
                        :data-name="nav.text"
                        :style="
                          nav.id == '21'
                            ? 'margin-top: 5px; border-top: 1px #dcdfe6 solid'
                            : ''
                        "
                      >
                        <template slot="title">
                          <!-- <i class="box-icon" :class="nav.icon"></i> -->
                          <img :src="nav.image" width="16" class="mg-r-10" />
                          <span>{{ nav.text }}</span>
                        </template>
                      </el-menu-item>
                      <el-submenu
                        v-else
                        :key="nav.id + 'b'"
                        :index="nav.id + 'b'"
                        :disabled="!nav.enabled"
                      >
                        <template slot="title">
                          <!-- <i class="box-icon" :class="nav.icon"></i> -->
                          <img :src="nav.image" width="16" class="mg-r-10" />
                          <span>{{ nav.text }}</span>
                        </template>
                        <el-menu-item-group>
                          <el-menu-item
                            v-for="sub in nav.subItem"
                            :key="sub.name"
                            :index="sub.path"
                            :disabled="!sub.enabled"
                            :data-name="sub.name"
                            >{{ sub.name }}</el-menu-item
                          >
                        </el-menu-item-group>
                      </el-submenu>
                    </template>
                    <!-- <el-menu-item v-if="$store.state.userInfo.source == '1'">
                      <template slot="title">
                        <div @click="handleCommand('rewards')">
                          <i class="box-icon box-reward"></i>
                          <span>Invitation rewards</span>
                        </div>
                      </template>
                    </el-menu-item> -->
                    <!-- <el-submenu
                      index="a"
                      style="margin-top: 15px; border-top: 1px #dcdfe6 solid"
                    >
                      <template slot="title">
                        <i class="box-icon box-help"></i>
                        <span>Help</span>
                      </template>
                      <el-menu-item-group> -->
                    <!-- <el-menu-item index="/ticket">
                          <span style="position: relative">
                            Support
                            <span
                              v-if="Number($store.state.newMsgNum)"
                              class="msg-num support-msg-num"
                            >
                            </span>
                          </span>
                        </el-menu-item> -->
                    <!-- <el-menu-item index="/guidance">Tutorial</el-menu-item>
                      </el-menu-item-group>
                    </el-submenu> -->
                  </el-menu>
                </div>
              </el-scrollbar>
            </el-col>
          </el-row>
        </div>
        <div class="admin-content">
          <el-scrollbar
            style="height: 100%"
            ref="mainScroll"
            class="main-scroll"
          >
            <router-view :key="dateKey" @openVerify="openVerify"></router-view>
          </el-scrollbar>
        </div>
      </div>
      <div id="modalVerChange">
        <div class="modal-content">
          <div class="top" :style="{ width: `${verChangeTime * 10}%` }"></div>
          <div class="modal-body">
            <div class="left">
              <i class="fa fa-refresh" aria-hidden="true"></i>
            </div>
            <div class="right">
              <h3>Dear {{ $store.state.userInfo.name }}</h3>
              <p>
                Our app is now updating the page you are visiting, we will auto
                refresh this page in 10 seconds.
              </p>
              <div>
                <el-button type="primary" size="small" @click="resetPage()"
                  >I got it, please refresh it now</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <IAgreeToTheEmail :data="iAgreeEmailData" /> -->
      <DialogInvitationRewards :data="dialogInvitationRewardsData" />
      <el-dialog
        title="Announcement"
        :visible.sync="annDialogVisible"
        :close-on-click-modal="false"
        width="30%"
      >
        <el-divider></el-divider>
        <div
          class="annbox"
          style="
            word-break: break-word;
            overflow-wrap: break-word;
            white-space: pre-wrap;
          "
        >
          <el-alert
            style="width: 92%"
            :closable="false"
            :title="announce.title"
            type="warning"
          >
            <div
              v-html="announce.content"
              slot="title"
              class="annContent"
            ></div>
          </el-alert>
        </div>
        <div class="countDown">
          Estimated start time: <b v-html="countDown"></b>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="annDialogVisible = false">I see</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :visible.sync="verifyVisible"
        custom-class="verify-1"
        width="681px"
      >
        <div class="verifyWrap">
          <img src="./assets/security.png" alt="" />
          <div class="right">
            <h3 class="title">Security Verification</h3>
            <div class="ctx">
              We noticed you haven't verified your email address. Go to verify
              now?
            </div>
            <div class="btn-group1">
              <el-button
                class="btn spec-1"
                type="primary"
                @click="verifyVisible = false"
                >Cancel
              </el-button>
              <el-button class="btn m-r-35" type="primary" @click="toVerify"
                >Verify</el-button
              >
            </div>
          </div>
        </div>
        <!-- <div slot="footer" class="verify-footer">
          <el-button @click="verifyVisible = false">Cancel</el-button>
          <el-button type="primary" @click="toVerify">Verify</el-button>
        </div> -->
      </el-dialog>
      <el-dialog
        :visible="changeEmailStatus"
        center
        custom-class="verify-1"
        @close="EmailClose"
        width="681px"
      >
        <div class="verify">
          <div class="box-email">
            <img src="./assets/email.png" />
            <div class="content">
              <h3 class="title">Email Security Verification</h3>
              <div class="desc">
                For security reason.We need to verify your email address.<br />Please
                click "Send" to get the verification code in your inbox
              </div>
              <div class="email">
                Send To: {{ $store.state.userInfo.email }}
              </div>
              <div class="inputbox">
                <input
                  class="form-control"
                  type="text"
                  v-model="authCode"
                  placeholder="Enter Verification Code"
                />
                <span v-if="!hasSendCode" @click="sendCode">Send</span>
                <span v-if="hasSendCode">{{ time }}</span>
              </div>
              <button
                class="btn"
                :class="{ highlight: highlight }"
                @click="verifyClick"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <DialogRegister
      :data="dialogRegisterData"
      @register="register"
      @switchTo="switchTo"
    />
    <DialogLogin :data="dialogLoginData" @login="login" @switchTo="switchTo" />
    <DialogForgot
      ref="dialogForgotPsd"
      :data="dialogForgotPsdData"
      :sec="emailCountDownSec.forgot"
      @resetSEC="resetSEC"
      @saveNewPSD="saveNewPSD"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import homeHeader from "@/components/Home/Header-v3";
import DialogInvitationRewards from "./components/Recharge/DialogInvitationRewards";
// import Chat from "@/components/Chat/ChatBtn";
import DialogRegister from "@/components/Home/DialogRegister-v2"; //注册v2
import DialogLogin from "@/components/Home/DialogLogin-v2"; //登录
import DialogForgot from "@/components/Home/DialogForgotPsd-v2"; //忘记密码
import DHeader from "@/views/homePage/components/header";
export default {
  name: "app",
  data() {
    return {
      shopName: "",
      importNum: 0,
      cartNum: 0,
      authCode: "",
      headerMenu: [],
      changeEmailStatus: false,
      highlight: false,
      hasSendCode: false,
      time: 0,
      baseUrl: process.env.VUE_APP_BASEURL,
      baseTimeStamp: new Date().getTime(),
      verifyVisible: false,
      countDown: 0,
      countTimer: null,
      annDialogVisible: false,
      announce: {},
      titColor: "",
      dialogInvitationRewardsData: {
        loading: false,
        isShow: false,
        items: [],
        orderRewards: "",
        inviteCode: "",
        canWithdrawal: false,
        withdrawalAmount: 0,
        withdrawal: 0,
      },
      dialogInvitationRewardsDataDefault: "{}",
      pageMax: false,
      dateKey: new Date().valueOf(),
      navMenu: [
        {
          id: 1,
          icon: "",
          image: "/images/sidebar/dashboard.png",
          text: "Dashboard",
          path: "/dashboard",
          enabled: true,
        },
        {
          id: 6,
          icon: "box-product",
          image: "/images/sidebar/products.png",
          text: "Products",
          path: "/products",
          enabled: true,
          subItem: [
            {
              name: "Import List",
              path: "/import-list",
              enabled: true,
            },
            {
              name: "My Products",
              path: "/products",
              enabled: true,
            },
          ],
        },
        // {
        //   id: 4,
        //   icon: "box-vendor",
        //   text: "Vendors",
        //   path: "/vendors",
        //   enabled: true,
        // },
        // {
        //   id: 7,
        //   icon: "icon iconfont icon-offer",
        //   text: "Quotation",
        //   path: "/make-offers",
        //   enabled: true,
        // },
        {
          id: 3,
          icon: "box-order",
          image: "/images/sidebar/order.png",
          text: "Orders",
          path: "/orders",
          enabled: true,
        },
        {
          id: 21,
          icon: "el-icon-s-order",
          image: "/images/sidebar/search-pro.png",
          text: "Inquiry",
          enabled: true,
          subItem: [
            {
              name: "Reply",
              path: "/search-reply",
              enabled: true,
            },
            {
              name: "Complete",
              path: "/search-complete",
              enabled: true,
            },
            {
              name: "All",
              path: "/search-select",
              enabled: true,
            },
          ],
        },
        {
          id: 10,
          icon: "box-purchase",
          text: "Purchase List",
          path: "/purchase-list",
          enabled: true,
          subItem: [
            {
              name: "Cart",
              path: "/cart",
              enabled: true,
            },
            {
              name: "Purchase List",
              path: "/purchase-list",
              enabled: true,
            },
            {
              name: "Disputed Order",
              path: "/disputed-order",
              enabled: true,
            },
            {
              name: "Address",
              path: "/manage-addresses",
              enabled: true,
            },
          ],
        },
        {
          id: 5,
          icon: "box-store",
          image: "/images/sidebar/store.png",
          text: "My Stores",
          path: "/stores",
          enabled: true,
        },
        {
          id: 13,
          text: "Transaction detail",
          icon: "el-icon-s-finance",
          image: "/images/sidebar/billing.png",
          path: "/transaction",
          enabled: true,
        },
        // {
        //   id: 2,
        //   icon: "box-bill",
        //   text: "Billing History",
        //   path: "/history",
        //   enabled: true,
        // },
      ],
      openeds: ["6b", "14b"], //openeds: ["a", "6b","10b"]
      reCount: 0,
      verChangeTime: 10,
      path: "",
      socket: null,
      lockReconnect: false, //重连锁
      newChatNum: 0,
      dialogRegisterData: {
        isShow: false,
        loading: false,
        form: {
          email: "",
          password: "",
          rePassword: "",
        },
      },
      defaultDialogRegisterData: "{}",
      dialogLoginData: {
        isShow: false,
        loading: false,
        form: {
          email: "",
          password: "",
        },
      },
      defaultDialogLoginData: "{}",
      dialogForgotPsdData: {
        isShow: false,
        loading: false,
        form: {
          mobile: "", //email
          token: "",
          newPassword: "",
          repeatNewPassword: "",
        },
      },
      defaultDialogForgotPsdData: "{}",
      emailCountDownSec: {
        //秒数
        signup: 0,
        forgot: 0,
      },
      emailCountDownTime: {
        //定时器
        signup: 0,
        forgot: 0,
      },
      customerAllOrderCnt: "",
      setting: null,
    };
  },
  created() {
    this.setting = JSON.parse(JSON.stringify(this.$store.state.configJson));
    this.getInfo();
    if (this.baseUrl != "/my") {
      this.navMenu = [
        {
          id: 1,
          icon: "el-icon-s-home",
          image: "/images/sidebar/dashboard.png",
          text: "Dashboard",
          path: "/dashboard",
          enabled: true,
        },
        {
          id: 6,
          icon: "el-icon-shopping-bag-1",
          image: "/images/sidebar/products.png",
          text: "Products",
          path: "/products",
          enabled: true,
          subItem: [
            {
              name: "Import List",
              path: "/import-list",
              enabled: true,
            },
            {
              name: "My Products",
              path: "/products",
              enabled: true,
            },
          ],
        },
        // {
        //   id: 4,
        //   icon: "el-icon-s-custom",
        //   text: "Vendors",
        //   path: "/vendors",
        //   enabled: true,
        // },
        // {
        //   id: 7,
        //   icon: "icon iconfont icon-offer",
        //   text: "Quotation",
        //   path: "/make-offers",
        //   enabled: true,
        // },
        // {
        //   id: 3,
        //   icon: "iconfont icon-shopify",
        //   text: "Orders",
        //   path: "/orders",
        //   enabled: true,
        // },
        {
          id: 10,
          icon: "el-icon-receiving",
          text: "Purchase List",
          path: "/purchase-list",
          enabled: true,
          subItem: [
            {
              name: "Cart",
              path: "/cart",
              enabled: true,
            },
            {
              name: "Purchase List",
              path: "/purchase-list",
              enabled: true,
            },
            {
              name: "Disputed Order",
              path: "/disputed-order",
              enabled: true,
            },
            {
              name: "Address",
              path: "/manage-addresses",
              enabled: true,
            },
          ],
        },

        {
          id: 14,
          icon: "el-icon-s-order",
          image: "/images/sidebar/order.png",
          text: "Order",
          path: "/ordersManage/1",
          enabled: true,
          subItem: [
            {
              name: "Quotation",
              path: "/ordersManage/1",
              enabled: true,
            },
            {
              name: "Payment",
              path: "/ordersManage/2",
              enabled: true,
            },
            {
              name: "Shipment",
              path: "/ordersManage/3",
              enabled: true,
            },
            {
              name: "Abnormal",
              path: "/ordersManage/4",
              enabled: true,
            },
            {
              name: "Completed",
              path: "/ordersManage/5",
              enabled: true,
            },
            {
              name: "All orders",
              path: "/ordersManage/6",
              enabled: true,
            },
          ],
        },
        {
          id: 21,
          icon: "el-icon-s-order",
          image: "/images/sidebar/search-pro.png",
          text: "Inquiry",
          enabled: true,
          subItem: [
            {
              name: "Pending",
              path: "/search-reply",
              enabled: true,
            },
            {
              name: "Completed",
              path: "/search-complete",
              enabled: true,
            },
            {
              name: "All",
              path: "/search-select",
              enabled: true,
            },
          ],
        },
        {
          id: 5,
          icon: "el-icon-s-shop",
          image: "/images/sidebar/store.png",
          text: "Stores",
          path: "/stores",
          enabled: true,
        },
        // {
        //   id: 2,
        //   icon: "el-icon-s-finance",
        //   text: "Billing History",
        //   path: "/history",
        //   enabled: true,
        // },
        {
          id: 13,
          text: "Billing",
          icon: "el-icon-s-finance",
          image: "/images/sidebar/billing.png",
          path: "/transaction",
          enabled: true,
        },
      ];
      this.navMenu.some((e, i) => {
        if (e.id == 10) {
          this.navMenu.splice(i, 1);
          return true;
        }
      });
    }
    // 页面崩溃监控 --start
    // 页面崩溃监控 --end
  },
  mounted() {
    if (this.$route.path != "/home" && document.getElementById("loading")) {
      document.getElementById("loading").remove();
    }
    this.defaultDialogRegisterData = JSON.stringify(this.dialogRegisterData);
    this.defaultDialogLoginData = JSON.stringify(this.dialogLoginData);
    this.defaultDialogForgotPsdData = JSON.stringify(this.dialogForgotPsdData);
    // 统计页面停留时间——直接关闭页面或者刷新页面的情况
    window.onbeforeunload = () => {
      let timeInterval = new Date().getTime() - this.baseTimeStamp;
      this.$Burying({
        object: "12001",
        objectId: timeInterval,
      });
    };
    // this.userEmail = this.$store.state.userInfo.email;
    this.dialogInvitationRewardsDataDefault = JSON.stringify(
      this.dialogInvitationRewardsData
    );
    window.addEventListener("message", (e) => {
      if (e.source != window.parent) return;
      if (e.data) {
        // 获取消息内容
        if (e.data.code == "success") {
          localStorage.setItem("c_haslogin", true);
          localStorage.setItem("c_hasloginId", e.data.id);
        }
        if (e.data.code == "fail") {
          localStorage.removeItem("c_haslogin");
          localStorage.removeItem("c_hasloginId");
        }
      }
    });
    const ourMallUserInfo = localStorage.getItem("c_apiUserId");
    if (ourMallUserInfo) {
      parent.postMessage(
        {
          type: "isVendors",
          id: ourMallUserInfo,
        },
        "*"
      );
    }
  },
  watch: {
    authCode: {
      handler: function () {
        if (this.authCode.length > 0) {
          this.highlight = true;
        } else {
          this.highlight = false;
        }
      },
      deep: true,
    },
    $route: {
      handler: function () {
        // 页面停留时间统计——正常路由跳转
        let timeInterval = new Date().getTime() - this.baseTimeStamp;
        let userAgent = window.navigator.userAgent;
        // 区别浏览器 和平台
        let isFireFox = /(?:Firefox)/.test(userAgent);
        let isTablet =
          /(?:iPad|PlayBook)/.test(userAgent) ||
          (isAndroid && !/(?:Mobile)/.test(userAgent)) ||
          (isFireFox && /(?:Tablet)/.test(userAgent));
        let isAndroid = /(Android)/i.test(userAgent);
        let isIPhone = /(iPhone|iPod|iOS)/i.test(userAgent);
        let device = 1;
        if (isIPhone) {
          // iphone
          device = 4;
        } else if (isTablet) {
          // 平板
          device = 2;
        } else if (isAndroid) {
          // andriod
          device = 3;
        } else {
          // pc
          device = 1;
        }
        if (process.env.NODE_ENV != "development") {
          this.$apiCall(
            "api.Visit.add",
            {
              lang: window.navigator.language,
              device: window.navigator.userAgent,
              deviceHard: device || 1,
              nowUrl: window.location.href,
              object: "12001",
              objectId: timeInterval,
            },
            (r) => {
              // 路由跳转后 基本时间重置
              this.baseTimeStamp = new Date().getTime();
            }
          );
        }

        if (this.$route.name == "Home" && this.categories) {
          setTimeout(() => {
            runMegamenu();
          }, 200);
        }
        if (!this.$route.meta.noCheck) {
          this.checkLogin();
        }
        if (this.$route.name == "ordersManagement") {
          setTimeout(() => {
            this.getCustomerAllOrderCnt();
          }, 200);
        }
        if (this.shopInfo) {
          this.getShopConfig();
        }
      },
      deep: true,
    },
    shopInfo() {
      this.getShopConfig();
    },
  },
  computed: {
    ...mapState(["shopInfo"]),
    userEmail() {
      return this.$store.state.userInfo.email;
    },
    headerClass() {
      if (this.baseUrl == "/my") {
        return "header-dropshipping";
      } else {
        return "header-ourmall";
      }
    },
    navName() {
      let txt = "";
      this.navMenu.some((e) => {
        if (e.path == this.$route.meta.urlActive) {
          txt = e.text;
          return true;
        }
        if (e.subItem && e.subItem.length) {
          e.subItem.some((s) => {
            if (s.path == this.$route.meta.urlActive) {
              txt = s.name;
              return true;
            }
          });
        }
      });
      if (this.$route.name == "ticket") {
        txt = "My support";
      }
      if (this.$route.meta.makeOffers) {
        txt = "Quotation";
      }
      if (this.$route.name == "ordersManagement") {
        txt = "Order";
      }
      return txt;
    },
    pName() {
      let name = {
        a: "OurMall",
        b: "OurMall Dropshipping",
      };
      if (process.env.VUE_APP_BASEURL == "/my") {
        name.a = name.b = "GoDropshipping";
      }
      return name;
    },
  },
  methods: {
    getVendorCurrency() {
      this.$apiCall("api.User.getVendorCurrency", {}, (r) => {
        if (r.ErrorCode == 9999) {
          let arr = r.Data.Results;
          this.$store.commit("getRate", arr);
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    getShopConfig() {
      this.$apiCall("api.VendorShop.getShopConfig", {}, (r) => {
        if (r.ErrorCode == 9999) {
          if (r.Data.Results.length !== 0) {
            if (r.Data.Results.header.activeMenu) {
              //有启用头部菜单
              r.Data.Results.menu.forEach((item) => {
                if (item.id == r.Data.Results.header.activeMenu) {
                  this.headerMenu = item;
                }
              });
            }
            this.$store.commit("getStoreComponent", r.Data.Results);
            this.setting = r.Data.Results;
            localStorage.setItem(
              "c_shopConfigJson",
              JSON.stringify(r.Data.Results)
            );
          } else {
            this.setting = JSON.parse(
              JSON.stringify(this.$store.state.configJson)
            );
          }
        } else {
          this.$message({
            message: r.Message,
            type: "error",
          });
        }
      });
    },
    getCustomerAllOrderCnt() {
      this.$apiCall("api.ShopifyOrder.getCustomerAllOrderCnt", {}, (r) => {
        if (r.ErrorCode == 9999) {
          this.customerAllOrderCnt = r.Data.Results;
          let cnt =
            Number(this.customerAllOrderCnt[1]) +
            Number(this.customerAllOrderCnt[2]);
          let cnt2 =
            Number(this.customerAllOrderCnt.waitCustomerPayCnt) +
            Number(this.customerAllOrderCnt.waitVendorConfirmCnt) +
            Number(this.customerAllOrderCnt[3]);
          this.navMenu.forEach((menu) => {
            if (menu.id == 14) {
              menu.subItem.forEach((sub) => {
                if (sub.path == "/ordersManage/1") {
                  this.$set(
                    sub,
                    "name",
                    `Quotation (${cnt > 99 ? "99+" : cnt})`
                  );
                } else if (sub.path == "/ordersManage/2") {
                  this.$set(
                    sub,
                    "name",
                    `Payment (${cnt2 > 99 ? "99+" : cnt2})`
                  );
                } else {
                }
              });
            }
          });
        }
      });
    },
    getShopName() {
      this.$apiCall("api.VendorShop.getVendorShop", {}, (r) => {
        if (r.ErrorCode == 9999) {
          this.shopName = r.Data.Results.name;
        }
      });
    },
    getInfo() {
      if (
        (location.host.split(".").length < 3 ||
          // location.host.split(".")[0].toLowerCase() == "www" ||
          location.host.split(".")[0].toLowerCase() == "sandboxwww" ||
          location.host.split(".")[0].toLowerCase() == "app" ||
          location.host.split(".")[0].toLowerCase() == "shopify" ||
          location.host.split(".")[0].toLowerCase() == "sandboxshopify") &&
        location.host.indexOf("localhost") < 0
      ) {
        return;
      }
      // location.host
      let url = location.host;
      if (location.host.indexOf("localhost") > -1) {
        //测试
        url = "shop242.myourmall.com";
      }
      this.$apiCall(
        "api.User.getInfoFromUrl",
        {
          url,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            this.$store.commit("setShopInfo", r.Data.Results);
            localStorage.setItem("c_apiShopId", r.Data.Results.shopId);
            this.getVendorCurrency();
          } else {
            this.$elementMessage(r.Message, "error");
          }
          this.$apiCall(
            "api.ProductCategory.findByVendorRelateCategory",
            {},
            (r) => {
              if (r.ErrorCode == 9999) {
                this.$store.commit("setCategroy", r.Data.Results);
              } else {
                this.$elementMessage(r.Message, "error");
              }
            }
          );
        }
      );
    },
    switchTo(type, username, password) {
      //弹层切换
      if (type == "login") {
        this.dialogRegisterData.isShow = false;
        this.dialogForgotPsdData.isShow = false;
        //开
        this.openDialogLogin(username, password);
      }
      if (type == "register") {
        this.dialogLoginData.isShow = false;
        this.dialogForgotPsdData.isShow = false;
        //开
        this.openDialogRegister();
      }
      if (type == "forgotPSD") {
        this.dialogRegisterData.isShow = false;
        this.dialogLoginData.isShow = false;
        // 开
        this.openDialogForgotPSD();
      }
    },
    saveNewPSD(params) {
      //保存新密码
      this.$apiCall("api.User.resetPassword", params, (r) => {
        this.dialogForgotPsdData.loading = false;
        if (r.ErrorCode == 9999) {
          this.$message({
            message: "Password reset successful",
            type: "success",
            customClass: "z9999",
          });
          //清空计时
          clearInterval(this.emailCountDownTime.forgot);
          this.emailCountDownSec.forgot = 0;
          this.$refs.dialogForgotPsd.$refs.verify.reset();
          this.switchTo(
            "login",
            this.dialogForgotPsdData.form.mobile,
            this.dialogForgotPsdData.form.newPassword
          );
        } else {
          this.$message({
            message: r.Message,
            type: "error",
            customClass: "z9999",
          });
        }
      });
    },
    openDialogForgotPSD() {
      //打开忘记密码
      let email = this.dialogForgotPsdData.mobile;
      this.dialogForgotPsdData = JSON.parse(this.defaultDialogForgotPsdData);
      if (this.emailCountDownTime.forgot)
        this.dialogForgotPsdData.mobile = email;
      this.dialogForgotPsdData.isShow = true;
    },
    resetSEC(type) {
      //验证码开始计时
      this.emailCountDownSec[type] = 60;
      this.emailCountDown(type);
    },
    emailCountDown(type) {
      //验证码定时器
      clearInterval(this.emailCountDownTime[type]);
      this.emailCountDownTime[type] = setInterval(() => {
        this.emailCountDownSec[type]--;
        if (this.emailCountDownSec[type] < 1) {
          clearInterval(this.emailCountDownTime[type]);
          if (type == "signup") {
            // this.$refs.dialogSingUp.$refs.verify.reset();
          } else if (type == "forgot") {
            this.$refs.dialogForgotPsd.$refs.verify.reset();
          }
        }
      }, 1000);
    },
    login(params) {
      //登录接口
      this.$apiCall("api.User.login", params, (r) => {
        this.dialogLoginData.loading = false;
        if (r.ErrorCode == 9999) {
          if (!localStorage.getItem("c_ourMallFirstLogin")) {
            localStorage.setItem("c_ourMallFirstLogin", 1);
          } else {
            localStorage.setItem("c_ourMallFirstLogin", 2);
          }
          localStorage.setItem("c_apiUserToken", r.Data.Results.apiUserToken);
          localStorage.setItem("c_apiUserId", r.Data.Results.id);
          localStorage.setItem(
            "c_ourMallUserInfo",
            JSON.stringify(r.Data.Results)
          );
          this.$store.commit("setUserInfo", r.Data.Results);
          this.$Burying({
            object: "1005",
          });
          if (localStorage.getItem("c_wantVisitPath")) {
            this.$router.push({
              path: localStorage.getItem("c_wantVisitPath"),
            });
          } else {
            //登录后暂无跳转
            // this.$router.push({ name: "dashboard" });
          }
          this.dialogLoginData.isShow = false;
        } else {
          this.$message({
            message: r.Message,
            type: "error",
          });
          this.$Burying({
            object: "1006",
          });
        }
      });
    },
    openDialogLogin(username, password) {
      this.dialogLoginData = JSON.parse(this.defaultDialogLoginData);
      this.dialogLoginData.form.email = username || "";
      this.dialogLoginData.form.password = password || "";
      this.dialogLoginData.isShow = true;
    },
    register(params) {
      //注册接口
      this.$apiCall("api.User.register", params, (r) => {
        this.dialogRegisterData.loading = false;
        if (r.ErrorCode == "9999") {
          this.dialogRegisterData.isShow = false;
          // this.switchTo('login', params.username, params.password)
          //注册后直接登录
          this.login({
            username: params.username,
            password: params.password,
            type: 1,
            lang: "EN",
          });
          this.$Burying({
            object: "2004",
          });
        } else {
          this.$message({
            message: r.Message,
            type: "error",
          });
          this.$Burying({
            object: "2005",
          });
        }
      });
    },
    openDialogRegister() {
      //打开注册弹层
      this.dialogRegisterData = JSON.parse(this.defaultDialogRegisterData);
      this.dialogRegisterData.isShow = true;
    },
    getCartNum(){
      if (!this.$store.state.userInfo) {
        this.importNum = 0;
        return;
      }
      this.$apiCall(
        "api.Cart.countCart", {}, (r) => {
          if (r.ErrorCode == 9999) {
            this.cartNum = Number(r.Data.Results);
            // this.cartNum = 16
          }
        }
      );
    },
    getImportNum() {
      //获取没推送的importlist 数量
      if (!this.$store.state.userInfo) {
        this.importNum = 0;
        return;
      }
      this.$apiCall(
        "api.Product.findImportProduct",
        {
          page: 1,
          rowsPerPage: 1,
          status: 1,
          // onlyNotImport: true,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            this.importNum = Number(r.Data.Pagination.totalCount);
          }
        }
      );
    },
    openVerify() {
      this.verifyVisible = true;
    },
    EmailClose() {
      this.changeEmailStatus = false;
    },
    sendCode() {
      let vm = this;
      this.hasSendCode = true;
      this.$apiCall(
        "api.User.checkEmail",
        {
          email: this.userEmail || this.$store.state.userInfo.email,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            this.$message({
              message: "The Code was sent successfully",
              type: "success",
            });
            vm.time = 300;
            let interval = window.setInterval(function () {
              if (vm.time-- <= 0) {
                vm.time = 0;
                this.hasSendCode = false;
                window.clearInterval(interval); //停止
              }
            }, 1000);
          } else {
            this.$message({
              message: r.Message,
              position: "center",
            });
          }
        }
      );
    },
    verifyClick() {
      this.$apiCall(
        "api.User.checkEmailToken",
        {
          email: this.userEmail || this.$store.state.userInfo.email,
          token: this.authCode,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            this.$message({
              message: "User Email verified successfully",
              type: "success",
            });
            this.changeEmailStatus = false;
            this.authCode = "";
            this.$router.go(0);
          } else {
            this.$message({
              message: r.Message,
              type: "error",
            });
          }
        }
      );
    },
    toVerify() {
      this.verifyVisible = false;
      this.changeEmailStatus = true;
    },
    isVendor() {
      this.$apiCall(
        "api.Relationship.findByCustomer",
        {
          page: 1,
          rowsPerPage: 1,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            if (r.Data.Results.length == 0) {
              this.navMenu.forEach((ele, index) => {
                if (ele.text == "Vendors") {
                  this.navMenu.splice(index, 1);
                }
              });
            }
          }
        }
      );
    },
    init() {
      if (!this.$store.state.userInfo) {
        setTimeout(() => {
          this.init();
        }, 1000);
        return;
      }
      let reg = /^localhost:/;
      if (reg.test(window.location.host)) {
        this.path = "ws://192.168.2.24:1224/";
      } else {
        let arr = window.location.host.split(".");
        this.path =
          window.location.host.toLowerCase().indexOf("sandbox") >= 0
            ? `wss://sandboxwww.${
                /^(\w+\.)+[a-zA-Z]+$/.test(location.hostname)
                  ? arr[arr.length - 2]
                  : "ourmall"
              }.com/ws`
            : `wss://www.${
                /^(\w+\.)+[a-zA-Z]+$/.test(location.hostname)
                  ? arr[arr.length - 2]
                  : "ourmall"
              }.com/ws`;
      }
      if (typeof WebSocket !== "undefined") {
        // 实例化socket
        this.socket = new WebSocket(this.path, [
          "auth",
          this.$store.state.userInfo.id,
          this.$store.state.userInfo.apiUserToken,
        ]);
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },
    open() {
      setInterval(() => {
        this.send();
      }, 28000);
    },
    send() {
      if (this.$store.state.userInfo) {
        if (this.socket.readyState == 1) {
          this.socket.send(
            JSON.stringify({
              userId: this.$store.state.userInfo.id,
              ac: "ping",
            })
          );
        } else {
          this.reconnect();
        }
      }
    },
    error() {
      this.reconnect();
    },
    getMessage(msg) {
      let data = JSON.parse(msg.data);
      if (data.ac == "newMessage") {
        this.getNewCnt();
        this.$refs["chatBtn"].getItems("add2");
      }
    },
    reconnect() {
      if (this.lockReconnect) return;
      this.lockReconnect = true;
      setTimeout(() => {
        try {
          if (this.$store.state.userInfo)
            this.socket = new WebSocket(this.path, [
              "auth",
              this.$store.state.userInfo.id,
              this.$store.state.userInfo.apiUserToken,
            ]);
        } catch (err) {
          this.reconnect();
        }
        this.lockReconnect = false;
      }, 2000);
    },
    getNewCnt() {
      this.$apiCall("api.Chat.getNewCnt", {}, (r) => {
        if (r.ErrorCode == 9999) {
          if (
            !document.hidden &&
            r.Data.Results > this.newChatNum &&
            localStorage.getItem("c_chatSound") == 1
          )
            document.getElementById("newmsg").src = "/template/sound/new.mp3";
          this.newChatNum = r.Data.Results;
          if (
            !Number(this.newChatNum) &&
            !localStorage.getItem("c_firstGetNewCnt")
          ) {
            //第一次一定有红点
            this.newChatNum = 1;
          }
        }
      });
    },
    //  倒计时
    countTime(timer) {
      // console.log(timer)
      var that = this;
      if (!timer) {
        return;
      }
      this.countTimer = setInterval(() => {
        var date = new Date();
        var now = date.getTime();
        var end = timer * 1000;
        var leftTime = end - now; //时间差
        // console.log(leftTime)
        var d, h, m, s;
        if (leftTime >= 0) {
          d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
          h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
          m = Math.floor((leftTime / 1000 / 60) % 60);
          s = Math.floor((leftTime / 1000) % 60);
          s = s < 10 ? "0" + s : s;
          m = m < 10 ? "0" + m : m;
          h = h < 10 ? "0" + h : h;
          this.countDown = d + " Day : " + h + " h : " + m + " m : " + s + " s";
        } else {
          this.annDialogVisible = false;
          clearInterval(this.countTimer);
        }
      }, 1000);
    },

    getAnnouncement() {
      this.$apiCall("api.Announcement.getAnnouncementList", {}, (r) => {
        if (r.ErrorCode == "9999") {
          this.announce = r.Data.Results;
          if (this.announce.length == 0) {
            return false;
          } else {
            this.annDialogVisible = true;
          }
          this.announce.content = encodeURI(this.announce.content).replace(
            /&nbsp;/g,
            " "
          );
          this.announce.content = decodeURI(this.announce.content);
          this.countTime(r.Data.Results.validTimeFrom);
        }
      });
    },
    openDialogInvitationRewards() {
      this.dialogInvitationRewardsData = JSON.parse(
        this.dialogInvitationRewardsDataDefault
      );
      this.dialogInvitationRewardsData.loading = true;
      this.dialogInvitationRewardsData.isShow = true;
      this.$apiCall("api.User.getInviteInfo", {}, (r) => {
        this.dialogInvitationRewardsData.loading = false;
        if (r.ErrorCode == "9999") {
          let data = r.Data.Results;
          this.dialogInvitationRewardsData.inviteCode = data.inviteCode;
          this.dialogInvitationRewardsData.orderRewards = data.orderRewards;
          this.dialogInvitationRewardsData.items = data.invitedUsers;
          this.dialogInvitationRewardsData.withdrawalAmount =
            data.withdrawalAmount;
          this.dialogInvitationRewardsData.withdrawal = data.withdrawal;
          this.dialogInvitationRewardsData.canWithdrawal = data.canWithdrawal;
        }
      });
    },
    resetPage() {
      location.reload();
    },
    testVer() {
      if (process.env.NODE_ENV == "production") {
        //生产环境验证版本
        this.axios
          .get(`${process.env.BASE_URL}version.json?_=${Date.now()}`, {
            baseURL: "//",
          })
          .then((r) => {
            if (process.env.VERSION != r.data.version) {
              if (document.getElementById("modalVerChange")) {
                document.getElementById("modalVerChange").style.display =
                  "block";
                let t = setInterval(() => {
                  this.verChangeTime--;
                  if (this.verChangeTime < 0) {
                    clearInterval(t);
                    location.reload();
                  }
                }, 1000);
              } else {
                location.reload();
              }
            }
          });
      }
    },
    getMsgNum() {
      this.$apiCall("api.Comment.checkUnread", {}, (r) => {
        if (r.ErrorCode == "9999") {
          this.$store.commit("setNewMsgNum", r.Data.Results);
        }
      });
    },
    changeSize() {
      this.pageMax = !this.pageMax;
    },
    menuSelect(key) {
      // this.$Burying({a: 1})
      if (key == this.$route.path) this.dateKey = new Date().valueOf();
      if (this.$route.name == "invoices") {
        let query = Object.assign(
          {
            status: 1,
          },
          this.$route.params
        );
        this.$router.push({
          query,
        });
      }
    },
    getParentUrl() {
      var url = null;
      if (parent !== window) {
        try {
          url = parent.location.href;
        } catch (e) {
          url = document.referrer;
        }
      }
      return url;
    },
    checkLogin() {
      if (this.getParentUrl() && this.getParentUrl().indexOf("vendor") >= 0) {
        return;
      }
      this.$apiCall(
        "api.User.checkLoginStatus",
        {
          type: localStorage.getItem("c_ourMallUserInfo")
            ? JSON.parse(localStorage.getItem("c_ourMallUserInfo")).type
            : 1,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            if (!localStorage.getItem("c_ourMallFirstLogin")) {
              localStorage.setItem("c_ourMallFirstLogin", 1);
            } else {
              localStorage.setItem("c_ourMallFirstLogin", 2);
            }
            localStorage.setItem("c_apiUserId", r.Data.Results.id);
            localStorage.setItem("c_apiUserToken", r.Data.Results.apiUserToken);
            if (r.Data.Results) {
              if (r.Data.Results.configJson)
                r.Data.Results.config = JSON.parse(r.Data.Results.configJson);
              localStorage.setItem(
                "c_ourMallUserInfo",
                JSON.stringify(r.Data.Results)
              );
              if (
                JSON.parse(localStorage.getItem("c_ourMallUserInfo"))
                  .verifyEmail == "2" &&
                this.$route.name == "dashboard"
              ) {
                this.verifyVisible = true;
              }
              this.$store.commit("setUserInfo", r.Data.Results);
            }
            // if (
            //   this.$store.state.userInfo.isAgree == "2" &&
            //   this.$store.state.userInfo.isInvite == "1"
            // ) {
            //   this.iAgreeEmailData.showdialog = true;
            // }
            // if (
            //   this.$store.state.userInfo.source == "1" &&
            //   !this.navMenu.some((e) => {
            //     return e.id == 21;
            //   })
            // ) {
            //   this.navMenu.push({
            //     id: 21,
            //     icon: this.baseUrl != "/my" ? "fa fa-usd" : "box-recharge",
            //     text: "Recharge",
            //     path: "/recharge",
            //     enabled: true,
            //   });
            // }
            this.getAnnouncement();
            this.getImportNum();
            this.getCartNum();
            this.getShopName(); //获取店铺名称
            this.isVendor(); //判断是否有供应商，没有就隐藏供应商菜单
            // this.getNewCnt();
            this.init();
            if (localStorage.getItem("c_homeBindOfferIds")) {
              this.$apiCall(
                "api.OfferList.bindOfferList",
                {
                  bindOfferIds: JSON.parse(
                    localStorage.getItem("c_homeBindOfferIds")
                  ),
                },
                (r) => {
                  if (r.ErrorCode == "9999") {
                    localStorage.removeItem("c_homeBindOfferIds");
                  }
                }
              );
            }
          } else {
            this.$Logout(this.$route.meta.urlActive);
          }
        }
      );
    },
    handleCommand(command) {
      switch (command) {
        case "home":
          window.location.href = "/";
          break;
        case "rewards":
          this.openDialogInvitationRewards();
          break;
        case "exit":
          localStorage.removeItem("c_wantVisitPath");
          this.$Logout("/");
          break;
        case "profile":
          this.$router.push({
            name: "profile",
          });
          break;
        case "wallet":
          if (this.baseUrl != "/my") return;
          this.$router.push({
            name: "wallet",
          });
          break;
        case "settings":
          this.$router.push({
            name: "settings",
          });
          break;
      }
    },
  },
  components: {
    // IAgreeToTheEmail,
    DialogInvitationRewards,
    // Chat,
    DialogRegister,
    DialogLogin,
    DialogForgot,
    homeHeader,
    DHeader,
  },
};
</script>

<style lang="scss">
#app {
  font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI,
    Roboto, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 0;
  height: 100%;
}

.verify-1 {
  border-radius: 20px !important;
}

.box-email {
  width: 681px;
  height: 273px;
  background: #ffffff;
  border-radius: 20px;
  padding: 20px 50px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-size: AlibabaSans;

  img {
    object-fit: contain;
    width: 84px;
    height: 86px;
  }

  .content {
    margin-left: 42px;
  }

  .title {
    font-size: 25px;
    margin: 0;
  }

  .desc {
    font-size: 16px;
    margin: 13px 0 12px 0;
  }

  .email {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .inputbox {
    border-bottom: 1px solid #ccc;

    input {
      font-size: 16px;
      border: 0;
      width: 89%;
      display: inline-block;
      box-shadow: initial;
    }

    span {
      color: #fe566b;
      font-size: 16px;
      cursor: pointer;
    }
  }

  .btn {
    width: 211px;
    height: 46px;
    margin-top: 20px;
    font-size: 20px;
    line-height: 1.5;
    background: rgb(204, 204, 204);
    color: #fff;
    border-radius: 5px;
  }

  .highlight {
    background: linear-gradient(218deg, #ffab73 0%, #ffab73 33%, #fe6678 100%);
  }
}

.verifyWrap {
  padding: 40px 75px;
  display: flex;
  // height: 200px;
  justify-content: flex-start;

  img {
    width: 69px;
    height: 83px;
  }

  .right {
    margin-left: 36px;

    .title {
      font-size: 25px;
      font-size: AlibabaSans;
      color: #4e4e4e;
      line-height: 34px;
    }

    .ctx {
      margin-top: 13px;
      font-size: 16px;
      word-break: normal;
      font-size: AlibabaSans;
      color: #4e4e4e;
      line-height: 28px;
    }

    .btn-group1 {
      margin-top: 30px;

      .spec-1 {
        background: #fff;
        color: #ffab73;
        border: 1px solid #ffab73;
      }

      .btn {
        width: 179px;
        height: 46px;
        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        border-radius: 10px;
      }

      .m-r-35 {
        margin-left: 36px;
      }
    }
  }
}

.verify-footer {
  text-align: center;
}

.box-icon {
  display: inline-block;
  width: 22px !important;
  margin-right: 10px;
  height: 22px !important;
  background: url("./../public/images/box-logo.png") no-repeat;
  background-size: 400%;
}

.box-product {
  background-position: -22px 0;
}

.box-vendor {
  background-position: -42px 0;
}

.box-order {
  background-position: 0 -21px;
}

.box-reward {
  background-position: -62px -21px;
}

.box-purchase {
  background-position: -63px 0;
}

.box-store {
  background-position: -21px ​-42px;
}

.box-bill {
  background-position: -20px -21px;
}

.box-help {
  background-position: 0 -42px;
}

.box-recharge {
  background-position: -40px -42px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #5c6ac4;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>

<style lang="scss" scoped>
.admin-header {
  .right {
    > a {
      color: #fff;
      font-size: 18px;
    }
  }
}

.header-ourmall {
  background: #000;
}

.header-dropshipping {
  background: linear-gradient(
    178deg,
    #ffab73 0%,
    #ffab73 33%,
    #fe6778 100%,
    #fe6678 100%
  );
}

#modalVerChange {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.7);

  .top {
    width: 100%;
    height: 3px;
    background-color: $--color-primary;
    transition: all 1s;
  }

  .modal-content {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;

    .modal-body {
      display: flex;
      align-items: center;

      .left {
        padding: 0 20px 0 15px;

        i {
          color: $--color-primary;
          font-size: 56px;
        }
      }

      .right {
        h3 {
          margin-bottom: 15px;
          color: #303133;
          font-size: 14px;
        }

        p {
          margin-bottom: 10px;
          color: #606266;
          font-size: 14px;
        }
      }
    }
  }
}

.support-msg-num {
  position: absolute;
  top: -1px;
  right: -10px;
  width: 6px;
  height: 6px;
  line-height: 6px;
  text-align: center;
  background-color: rgb(245, 108, 108);
  border-radius: 50%;
  font-size: 12px;
}

.msg-num:before {
  position: absolute;
  background: rgb(245, 108, 108);
  width: 8px;
  height: 8px;
  top: -1px;
  left: -1px;
  content: "";
  display: block;
  border-radius: 50%;
  -webkit-backface-visibility: hidden;
  animation: wave-animate 2s infinite ease-out;
}

.msg-num:after {
  position: absolute;
  background: rgb(245, 108, 108);
  width: 8px;
  height: 8px;
  top: -1px;
  left: -1px;
  content: "";
  display: block;
  border-radius: 50%;
  -webkit-backface-visibility: hidden;
  opacity: 0;
  animation: wave-animate 2s 1s infinite ease-out;
}

@keyframes wave-animate {
  0% {
    transform: scale(0);
    opacity: 1;
    transform-origin: center;
  }

  100% {
    transform: scale(3);
    opacity: 0;
    transform-origin: center;
  }
}
</style>

<style lang="scss" scoped>
.order-qty {
  margin-right: 35px;
  color: #fff;
}

.main-menu.el-menu .el-menu-item {
  i {
    width: 24px;
    text-align: center;
  }

  i.fa {
    font-size: 16px;
  }
}

.annbox {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.countDown {
  width: 90%;
  margin: 0 auto;
  background: #ccc;
  text-align: center;
  text-align: 18px;
  font-size: 16px;
}

#app ::v-deep.el-alert__content {
  width: 100%;

  .el-alert__title {
    display: block;
    width: 100%;
  }
}

.annContent {
  width: 100%;

  p {
    word-break: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
  }
}
</style>
