<template>
  <div class="contentpanel profile-page">
    <div class="pagetitle">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/dashboard' }"
          >Dashboard</el-breadcrumb-item
        >
        <el-breadcrumb-item>My Wallet</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-loading="loading" class="pagebody">
      <el-row :gutter="20" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <!-- 各钱包及余额 -->
            <el-row :gutter="20" class="mg-b-25 wallet">
              <div style="min-width: 200px">
                <div class="icon">
                  <i class="iconfont icon-qian"></i>
                </div>
                <div class="body">
                  <div class="title">My Balance</div>
                  <div class="num">${{ wallet.balance || 0 }}</div>
                </div>
              </div>
              <div style="min-width: 240px">
                <div class="icon">
                  <i class="iconfont icon-liwu"></i>
                </div>
                <div class="body">
                  <div class="title">Your Total Rewards</div>
                  <div class="num">
                    {{ wallet.orderRewards || 0 }} orders QTY
                  </div>
                </div>
              </div>
              <div style="min-width: 240px">
                <div class="icon">
                  <img src="./../assets/wallet/icon-QTY.png" />
                </div>
                <div class="body">
                  <div class="title">Rewards QTY left</div>
                  <div class="num">
                    {{ wallet.withdrawalAmount || 0 }} orders QTY
                  </div>
                </div>
              </div>
            </el-row>
            <el-row :gutter="20" class="main">
              <!-- 充值选择支付类型 -->
              <el-row :gutter="20" class="mode">
                <div class="mg-b-15 label-title">Charging Method:</div>
                <div class="body">
                  <div class="card" @click="walletParams.paymentType = 1">
                    <div class="name">PayPal</div>
                    <div
                      class="active"
                      v-if="walletParams.paymentType == 1"
                    ></div>
                  </div>
                  <div style="width: 60px"></div>
                  <div class="card" @click="walletParams.paymentType = 2">
                    <div class="name">Pay with Credit Card</div>
                    <div
                      class="active"
                      v-if="walletParams.paymentType == 2"
                    ></div>
                  </div>
                </div>
              </el-row>
              <!-- 充值表单 -->
              <el-row :gutter="20">
                <el-col :span="12" class="amount">
                  <div class="label-title">Paypal Payment Amount:</div>
                  <div class="field">
                    <span>$</span>
                    <el-input
                      v-model="walletParams.amount"
                      placeholder="Please input"
                    ></el-input>
                  </div>
                </el-col>
                <el-col :span="24" class="tips"
                  >The amount of each recharge must be more than 100
                  dollars.</el-col
                >
                <el-col :span="24" class="wallet-btn">
                  <el-button type="primary" @click="showPay">Confim</el-button>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <!-- 列表类型 -->
                <el-col :span="24" class="mg-b-15">
                  <el-tabs v-model="activeName">
                    <el-tab-pane
                      label="Recharge Records"
                      name="RechargeRecords"
                    ></el-tab-pane>
                    <el-tab-pane
                      label="Billing History"
                      name="BillingHistory"
                    ></el-tab-pane>
                    <el-tab-pane
                      label="Withdrawal History"
                      name="WithdrawalHistory"
                    ></el-tab-pane>
                  </el-tabs>
                </el-col>
                <!-- 提现 -->
                <el-tooltip
                  effect="dark"
                  placement="bottom"
                  :disabled="$store.state.userInfo.verifyEmail == 1"
                >
                  <div slot="content">
                    <span>Please verify your email address here, </span>
                    <a
                      href="javascript:;"
                      style="text-decoration: none"
                      @click="$emit('openVerify')"
                      >Verify Email</a
                    >
                  </div>
                  <div class="withdraw">
                    <el-button
                      type="primary"
                      size="small"
                      :disabled="$store.state.userInfo.verifyEmail != 1"
                      @click="showWithdraw"
                    >
                      Withdraw Cash
                    </el-button>
                  </div>
                </el-tooltip>
                <el-col :span="24">
                  <!-- 搜索 -->
                  <el-row :gutter="20" v-if="activeName != 'WithdrawalHistory'">
                    <el-col :span="24">
                      <div class="page-filter">
                        <el-form :inline="true" size="mini">
                          <el-form-item class="wallet_search">
                            <el-input
                              placeholder="search by bill number or order number"
                              v-model="search_txt"
                              class="search_txt"
                              @keyup.enter.native="search"
                            >
                            </el-input>
                            <el-button
                              type="primary"
                              class="search_btn"
                              @click.stop="search"
                              >Search</el-button
                            >
                          </el-form-item>
                          <el-form-item label="Date：">
                            <el-date-picker
                              v-model="timeCreated"
                              value-format="yyyyMMdd"
                              type="daterange"
                              align="right"
                              unlink-panels
                              range-separator="-"
                              start-placeholder="Start date"
                              end-placeholder="End date"
                              :picker-options="pickerOptions"
                              @change="search"
                            >
                            </el-date-picker>
                          </el-form-item>
                        </el-form>
                      </div>
                    </el-col>
                  </el-row>
                  <!-- 表格 -->
                  <el-table
                    v-if="refresh"
                    :data="items"
                    stripe
                    row-key="id"
                    style="width: 100%"
                    ref="gridTable"
                  >
                    <el-table-column
                      label="Bill Number"
                      v-if="activeName == 'RechargeRecords'"
                    >
                      <template slot-scope="scope">
                        {{ scope.row.code || "---" }}
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="Order Code"
                      v-if="activeName == 'BillingHistory'"
                    >
                      <template slot-scope="scope">
                        {{ scope.row.invoice || "---" }}
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="Transfer ID"
                      v-if="activeName == 'WithdrawalHistory'"
                    >
                      <template slot-scope="scope">
                        {{ scope.row.id || "---" }}
                      </template>
                    </el-table-column>

                    <el-table-column label="Date">
                      <template slot-scope="scope">
                        {{
                          moment(scope.row.timeCreated * 1000).format(
                            "YYYY-MM-DD HH:mm:ss"
                          )
                        }}
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="Type"
                      v-if="activeName == 'RechargeRecords'"
                    >
                      wallet recharge
                    </el-table-column>

                    <el-table-column
                      label="Payment Method"
                      v-if="activeName != 'WithdrawalHistory'"
                    >
                      <template slot-scope="scope">
                        <template v-if="activeName == 'RechargeRecords'">
                          {{ scope.row.PaymentMethod || "---" }}
                        </template>
                        <template v-if="activeName == 'BillingHistory'">
                          {{
                            ($dict.PayType[scope.row.platformType] || {})
                              .text || "---"
                          }}
                        </template>
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="Vendor"
                      v-if="activeName == 'BillingHistory'"
                    >
                      <template slot-scope="scope">
                        {{ scope.row.vendor || "---" }}
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="Amount"
                      v-if="activeName != 'WithdrawalHistory'"
                    >
                      <template slot-scope="scope">
                        <template v-if="activeName == 'RechargeRecords'">
                          {{ scope.row.amount || "---" }}
                        </template>
                        <template v-if="activeName == 'BillingHistory'">
                          {{ scope.row.totalAmount || "---" }}
                        </template>
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="Collection Account"
                      v-if="activeName == 'WithdrawalHistory'"
                    >
                      <template slot-scope="scope">
                        {{ scope.row.account || "---" }}
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="Withdrawal amount"
                      v-if="activeName == 'WithdrawalHistory'"
                    >
                      <template slot-scope="scope">
                        {{ scope.row.amount || "---" }}
                      </template>
                    </el-table-column>

                    <el-table-column label="Status">
                      <template slot-scope="scope">
                        <template v-if="activeName == 'WithdrawalHistory'">
                          {{
                            ($dict.WithdrawStatus[scope.row.status] || {})
                              .text || "---"
                          }}
                        </template>
                        <template v-else>
                          {{
                            ($dict.PayStatus[scope.row.status] || {}).text ||
                            "---"
                          }}
                        </template>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 分页栏 -->
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
    <!-- payPal支付模态框 -->
    <el-dialog
      title="Paypal Payment"
      :visible="walletParams.isShow && walletParams.paymentType == 1"
      width="30%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="!walletParams.loading"
      @close="walletParams.isShow = false"
    >
      <el-divider></el-divider>
      <div class="dialog-body">
        <div
          class="mg-b-20 label-title"
          style="font-size: 20px; line-hight: 26px"
        >
          ${{ walletParams.amount }}
        </div>
        <div class="mg-b-25 label-title" style="font-weight: 500">
          The minimum payment is $100.
        </div>
        <div class="action">
          <el-button
            :loading="walletParams.loading"
            type="primary"
            style="width: 240px; font-size: 18px"
            @click="recharge"
          >
            <svg
              class="icon"
              aria-hidden="true"
              style="width: 86px; height: 24px"
            >
              <use xlink:href="#icon-paypal-text"></use>
            </svg>
          </el-button>
        </div>
        <div
          class="mg-t-10 label-title"
          style="font-weight: 500; display: flex; justify-content: center"
        >
          <div>Powered by</div>
          <svg
            class="icon"
            aria-hidden="true"
            style="width: 86px; height: 24px"
          >
            <use xlink:href="#icon-paypal-text"></use>
          </svg>
        </div>
      </div>
    </el-dialog>
    <!-- 信用卡支付模态框 -->
    <el-dialog
      v-loading="walletParams.loading"
      title="Pay with Credit Card"
      :visible="walletParams.isShow && walletParams.paymentType == 2"
      width="30%"
      @opened="opened"
      @close="walletParams.isShow = false"
    >
      <el-divider></el-divider>
      <div class="dialog-body">
        <div
          class="mg-b-20 label-title"
          style="font-size: 20px; line-hight: 26px"
        >
          ${{ walletParams.amount }}
        </div>
        <div class="mg-b-25 label-title" style="font-weight: 500">
          The minimum payment is $100.
        </div>
        <div class="mg-t-10" style="display: flex; justify-content: center">
          <svg
            class="icon"
            aria-hidden="true"
            style="width: 50px; height: 40px"
          >
            <use xlink:href="#icon-master"></use>
          </svg>
          <svg
            class="icon"
            aria-hidden="true"
            style="width: 70px; height: 40px"
          >
            <use xlink:href="#icon-visa"></use>
          </svg>
        </div>
        <form
          id="payment-form"
          method="POST"
          action="https://merchant.com/charge-card"
        >
          <div class="one-liner">
            <div class="card-label">
              <div>
                <div>Card Number <span>*</span></div>
              </div>
              <div class="right">
                <div class="mg-r-5">Expiration<span>*</span></div>
                <div>CVV<span>*</span></div>
              </div>
            </div>
            <div class="card-frame">
              <!-- form will be added here -->
            </div>
            <!-- add submit button -->
            <div class="pay-btn-wrap">
              <button id="pay-button" disabled>
                PAY US ${{ walletParams.amount }}
              </button>
            </div>
          </div>
        </form>
        <div class="mg-t-15" style="font-size: 16px">
          <i class="iconfont icon-verification-code"></i>
          <span style="padding-left: 10px"
            >All transactions are secure and encrypted.</span
          >
        </div>
      </div>
    </el-dialog>
    <!-- 提现模态框 -->
    <el-dialog
      title="Withdraw Cash"
      :visible.sync="withdrawParams.isShow"
      width="40%"
    >
      <el-divider></el-divider>
      <el-form
        label-width="180px"
        :model="withdrawParams"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="Account Balance：">
          US ${{ wallet.balance || 0 }}
        </el-form-item>
        <el-form-item label="Withdrawal amount：" prop="amount">
          <div style="display: flex">
            <div style="padding-right: 6px; white-space: nowrap">US $</div>
            <el-input
              style="width: calc(100% - 235px)"
              v-model="withdrawParams.amount"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item
          label="Your PayPal Account："
          prop="account"
          style="margin-bottom: 0"
        >
          <el-input
            style="width: calc(100% - 200px)"
            v-model="withdrawParams.account"
            placeholder="PayPal Account"
          ></el-input>
        </el-form-item>
        <div class="mg-b-20" style="padding-left: 180px">
          We will charge you 5% fee when withdrawing.
        </div>
        <el-form-item label="Your PayPal Name：" prop="name">
          <el-input
            style="width: calc(100% - 200px)"
            v-model="withdrawParams.name"
            placeholder="PayPal Name"
          ></el-input>
        </el-form-item>
        <el-form-item label="Verification Code：" prop="token">
          <div style="display: flex; justify-content: space-between">
            <el-input
              style="width: calc(100% - 200px)"
              v-model="withdrawParams.token"
              placeholder="Enter the code"
            ></el-input>
            <el-button
              type="primary"
              :loading="withdrawParams.codeLoading"
              @click="getCode"
            >
              <template v-if="withdrawParams.time == 0"
                >Send Verification Code</template
              >
              <template v-else>{{ withdrawParams.time }}s</template>
            </el-button>
          </div>
        </el-form-item>
        <div style="margin-bottom: 60px; padding-left: 180px">
          The verification code will be sent to your email：{{
            $store.state.userInfo.email || ""
          }}
        </div>
        <el-form-item>
          <el-button
            style="margin-right: 30px"
            @click="withdrawParams.isShow = false"
            >Cancel</el-button
          >
          <el-button
            type="primary"
            :loading="withdrawParams.loading"
            @click="submitForm('ruleForm')"
            >Confirm</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      refresh: true,
      activeName: "RechargeRecords",
      pickerOptions: {
        shortcuts: [
          {
            text: "Last week",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "Last month",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "Last three months",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      search_txt: "",
      timeCreated: "",
      wallet: {},
      items: [],
      pageSizes: [10, 20, 50, 100],
      page: Number(this.$route.query.page) || 1,
      rowsPerPage: Number(localStorage.getItem("c_storeRowsPerPage")) || 10,
      total: 0,
      newWin: null,
      payTime: 0,
      walletParams: {
        isShow: false,
        loading: false,
        amount: "",
        paymentType: 1,
        packages: null,
        token: "",
      },
      walletParamsDefault: "{}",
      withdrawParams: {
        isShow: false,
        codeLoading: false,
        loading: false,
        amount: "",
        account: "",
        name: "",
        accountType: 1,
        token: "",
        interval: null,
        time: 0,
      },
      withdrawParamsDefault: "{}",
      rules: {
        amount: [
          {
            required: true,
            message: "Please enter your withdrawal amount",
            trigger: "blur",
          },
        ],
        account: [
          {
            required: true,
            message: "Please enter your account",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "Please enter your account name",
            trigger: "blur",
          },
        ],
        token: [
          {
            required: true,
            message: "Please enter the code",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    $route: "gotoPage",
    activeName() {
      this.refresh = false;
      this.search_txt = "";
      this.timeCreated = "";
      this.search();
      setTimeout(() => {
        this.refresh = true;
      }, 200);
    },
    "walletParams.isShow"(show) {
      if (!show) this.walletParams = JSON.parse(this.walletParamsDefault);
    },
    "walletParams.amount"(n) {
      if (!n) return;
      let num = n.replace(/[^\d^.]+/g, "");
      if (num.substr(0, 1) == ".") num = "0.";
      num = num.replace(/(\.)(\.*)/, "$1");
      num = num.replace(/^(\d+)\.(\d\d).*$/, "$1.$2");
      this.walletParams.amount = num;
    },
    "withdrawParams.amount"(n) {
      if (!n) return;
      let num = n.replace(/[^\d^.]+/g, "");
      if (num.substr(0, 1) == ".") num = "0.";
      num = num.replace(/(\.)(\.*)/, "$1");
      num = num.replace(/^(\d+)\.(\d\d).*$/, "$1.$2");
      this.withdrawParams.amount = num;
    },
    "withdrawParams.isShow"(show) {
      if (!show) window.clearInterval(this.withdrawParams.interval);
    },
  },
  mounted() {
    this.getWallet();
    this.getTable();
    this.walletParamsDefault = JSON.stringify(this.walletParams);
    this.withdrawParamsDefault = JSON.stringify(this.withdrawParams);
  },
  methods: {
    /**
     * 获取各钱包余额
     */
    getWallet() {
      this.loading = true;
      this.$apiCall("api.User.getInviteInfo", {}, (r) => {
        this.loading = false;
        if (r.ErrorCode == 9999) {
          this.wallet = r.Data.Results || {};
        } else {
          this.$message({
            message: r.Message,
            type: "error",
          });
        }
      });
    },
    /**
     * 根据类型获取列表数据
     */
    getTable() {
      if (this.activeName == "RechargeRecords") {
        this.rechargeRecords();
      } else if (this.activeName == "BillingHistory") {
        this.findRecordByCustomer();
      } else if (this.activeName == "WithdrawalHistory") {
        this.getWithdrawal();
      }
    },
    /**
     * Recharge Records列表
     */
    rechargeRecords() {
      this.loading = true;
      this.$apiCall(
        "api.PayRecord.rechargeRecords",
        {
          rowsPerPage: this.rowsPerPage,
          page: this.page,
          code: this.search_txt,
          timeCreatedFrom: (this.timeCreated || [])[0] || "",
          timeCreatedTo: (this.timeCreated || [])[1] || "",
        },
        (r) => {
          this.loading = false;
          if (r.ErrorCode == 9999) {
            this.items = r.Data.Results;
            this.total = Number(r.Data.Pagination.totalCount);
            this.totalPage = Number(r.Data.Pagination.totalPage);
          } else {
            this.$message({
              message: r.Message,
              type: "error",
            });
          }
        }
      );
    },
    /**
     * Billing History 列表
     */
    findRecordByCustomer() {
      this.loading = true;
      this.$apiCall(
        "api.AccountPayment.findRecordByCustomer",
        {
          rowsPerPage: this.rowsPerPage,
          page: this.page,
          invoiceCode: this.search_txt,
          timeCreatedFrom: (this.timeCreated || [])[0] || "",
          timeCreatedTo: (this.timeCreated || [])[1] || "",
        },
        (r) => {
          this.loading = false;
          if (r.ErrorCode == 9999) {
            this.items = r.Data.Results;
            this.total = Number(r.Data.Pagination.totalCount);
            this.totalPage = Number(r.Data.Pagination.totalPage);
          } else {
            this.$message({
              message: r.Message,
              type: "error",
            });
          }
        }
      );
    },
    /**
     * Withdrawal History列表
     */
    getWithdrawal() {
      this.loading = true;
      this.$apiCall(
        "api.PayRecord.getWithdrawal",
        {
          rowsPerPage: this.rowsPerPage,
          page: this.page,
        },
        (r) => {
          this.loading = false;
          if (r.ErrorCode == 9999) {
            this.items = r.Data.Results;
            this.total = Number(r.Data.Pagination.totalCount);
            this.totalPage = Number(r.Data.Pagination.totalPage);
          } else {
            this.$message({
              message: r.Message,
              type: "error",
            });
          }
        }
      );
    },
    /**
     * 搜索事件
     */
    search() {
      if (this.$route.query.page == 1) {
        this.getTable();
      } else {
        this.$router.push({
          query: {
            page: 1,
          },
        });
      }
    },
    /**
     * 跳转页面
     */
    toPage(val) {
      if (val != this.$route.query.page)
        this.$router.push({
          query: {
            page: val,
          },
        });
    },
    /**
     * 每页多少条下拉框事件
     */
    changePageSize(val) {
      this.rowsPerPage = val;
      localStorage.setItem("c_storeRowsPerPage", val);
      this.getTable();
    },
    /**
     * 路由改变时
     */
    gotoPage() {
      this.page = this.$route.query.page ? Number(this.$route.query.page) : 1;
      this.getTable();
    },
    /**
     * 判断表单是否填写，打开模态框
     */
    showPay() {
      if (!this.walletParams.amount) {
        this.$message({
          message: "Please enter the recharge amount",
          type: "error",
        });
        return;
      } else {
        if (this.walletParams.amount < 100) {
          this.$message({
            message: "The minimum payment is $100",
            type: "error",
          });
          return;
        }
      }
      this.walletParams.isShow = true;
    },
    /**
     * 获取支付状态
     */
    getPayStatus() {
      this.$apiCall("api.User.getPayStatusByCustomer", {}, (r) => {
        if (r.ErrorCode == "9999") {
          let status = r.Data.Results.status;
          if (status != 1) {
            clearInterval(this.payTime);
          }
          if (status == 2) {
            //支付成功
            this.$message({
              message: "Payment successful",
              type: "success",
            });
            this.closePayPage();
          } else if (status == 3) {
            //支付失败
            this.$elementMessage(r.Data.Results.message, "error");
            this.closePayPage();
          }
        } else {
          this.$elementMessage(r.Message, "error");
          clearInterval(this.payTime);
        }
      });
    },
    /**
     * 充值
     */
    recharge() {
      this.newWin = window.open(
        (this.$root.$children[0].baseUrl == "/my" ? "/my" : "") + "/blank.html",
        "pay"
      );
      this.walletParams.loading = true;
      let params = {
        amount: Number(this.walletParams.amount),
        paymentType: this.walletParams.paymentType,
      };
      if (this.walletParams.paymentType == 2) {
        params.token = this.walletParams.token;
      }
      this.$apiCall("api.User.goToPayByCustomerWallet", params, (r) => {
        if (r.ErrorCode == "9999") {
          this.newWin.location = r.Data.Results;
          this.payTime = setInterval(() => {
            this.getPayStatus();
          }, 2000);
        } else {
          this.newWin.close();
          this.newWin = null;
          this.walletParams.loading = false;
          this.$message({
            message: r.Message,
            type: "error",
          });
        }
      });
    },
    /**
     * 关闭支付新开页面
     */
    closePayPage() {
      this.newWin.close();
      this.newWin = null;
      clearInterval(this.payTime);
      this.walletParams.loading = false;
      this.walletParams.isShow = false;
      this.getWallet();
      this.getTable();
    },
    /**
     * 获取支付密钥
     */
    opened() {
      this.walletParams.loading = true;
      this.$apiCall("api.User.getCheckoutKey", {}, (r) => {
        this.walletParams.loading = false;
        if (r.ErrorCode == "9999") {
          this.walletParams.token = r.Data.Results;
          this.$nextTick(() => {
            var payButton = document.getElementById("pay-button");
            var form = document.getElementById("payment-form");

            Frames.init(this.walletParams.token);

            Frames.addEventHandler(
              Frames.Events.CARD_VALIDATION_CHANGED,
              function (event) {
                payButton.disabled = !Frames.isCardValid();
              }
            );

            Frames.addEventHandler(Frames.Events.CARD_TOKENIZED, (event) => {
              //点击
              this.walletParams.token = event.token;
              this.recharge();
            });

            form.addEventListener("submit", function (event) {
              event.preventDefault();
              Frames.submitCard();
            });
          });
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    /**
     * 打开提现申请的模态框
     */
    showWithdraw() {
      this.withdrawParams = JSON.parse(this.withdrawParamsDefault);
      this.withdrawParams.isShow = true;
    },
    /**
     * 获取验证码
     */
    getCode() {
      if (this.$store.state.userInfo.verifyEmail != 1) {
        return;
      }
      this.withdrawParams.codeLoading = true;
      this.$apiCall(
        "api.AccountPayment.sendToken",
        {
          mobile: this.$store.state.userInfo.email,
        },
        (r) => {
          this.withdrawParams.codeLoading = false;
          if (r.ErrorCode == "9999") {
            this.$message({
              message: "The Code was sent successfully",
              type: "success",
            });
            this.withdrawParams.time = 300;
            this.withdrawParams.interval = window.setInterval(() => {
              if (this.withdrawParams.time-- <= 0) {
                this.withdrawParams.time = 0;
                window.clearInterval(this.withdrawParams.interval); //停止
              }
            }, 1000);
          } else {
            this.$message({
              message: r.Message,
              type: "error",
            });
          }
        }
      );
    },
    /**
     * 提现申请表单提交
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.withdrawParams.loading = true;
          this.$apiCall(
            "api.AccountPayment.walletWithdrawal",
            {
              amount: Number(this.withdrawParams.amount),
              account: this.withdrawParams.account,
              name: this.withdrawParams.name,
              accountType: this.withdrawParams.accountType,
              mobile: this.$store.state.userInfo.email,
              token: this.withdrawParams.token,
            },
            (r) => {
              this.withdrawParams.loading = false;
              if (r.ErrorCode == "9999") {
                this.$message({
                  message: "Confirmed Successfully.",
                  type: "success",
                });
                this.getWallet();
                this.getTable();
                this.withdrawParams.isShow = false;
              } else {
                this.$message({
                  message: r.Message,
                  type: "error",
                });
              }
            }
          );
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.wallet {
  display: flex;
  align-items: center;

  > div {
    margin: 0 5px;
    padding: 14px 0;
    max-width: 33%;
    height: 92px;
    background: rgba(236, 244, 255, 1);
    border-radius: 4px;
    display: flex;
    flex-wrap: nowrap;

    .icon {
      width: 56px;
      height: 100%;
      display: flex;
      justify-content: center;

      > i {
        font-size: 25px;
        line-height: 25px;
        color: rgba(86, 138, 249, 1);
      }

      > img {
        width: 23px;
        height: 25px;
      }
    }

    .body {
      padding-right: 16px;
      width: calc(100% - 56px);
      height: 100%;
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #568af9;
      line-height: 22px;

      .title {
        padding-top: 3px;
      }

      .num {
        padding-top: 14px;
        padding-left: 5px;
      }
    }
  }
}

.label-title {
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #4e4e4e;
  line-height: 22px;
}

.main {
  padding: 0 28px;

  .mode {
    margin-bottom: 95px;

    .body {
      display: flex;
      justify-content: center;
      align-items: center;

      .card {
        position: relative;
        width: 330px;
        height: 100px;
        border-radius: 12px;
        cursor: pointer;

        .name {
          padding: 18px 16px 0;
          font-size: 24px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 33px;
        }

        .active {
          position: absolute;
          right: 22px;
          bottom: 11px;
          width: 24px;
          height: 24px;
          background: transparent;
          background-size: cover;
          background-repeat: no-repeat;
          background-image: url("./../assets/wallet/active.png");
        }
      }

      .card:nth-child(1) {
        background: rgba(102, 172, 255, 1);
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url("./../assets/wallet/paypal.png");
      }

      .card:nth-child(3) {
        background: rgba(255, 123, 111, 1);
      }
    }
  }

  .amount {
    display: flex;
    align-items: center;

    .label-title {
      padding-right: 16px;
    }

    .field {
      flex: 1;
      display: flex;
      align-items: center;

      span {
        padding-right: 8px;
        font-size: 20px;
        color: rgba(116, 116, 116, 1);
      }
    }
  }

  .tips {
    padding-top: 7px;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #f95656;
    line-height: 22px;
  }

  .wallet-btn {
    margin-bottom: 47px;
    padding-top: 17px;
    display: flex;
    justify-content: center;
  }

  .withdraw {
    position: absolute;
    right: 10px;
    top: -2px;
  }
}

.dialog-body {
  padding: 15px 20px 30px;

  .action {
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }
}
</style>

<style lang="scss" scoped>
*,
*::after,
*::before {
  box-sizing: border-box;
}
html {
  padding: 1rem;
  background-color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
#payment-form {
  margin: 0 auto;
  padding: 0 30px;
}
iframe {
  width: 100%;
}
.one-liner {
  display: flex;
  flex-direction: column;
}
#pay-button {
  border: none;
  border-radius: 3px;
  color: #fff;
  font-weight: 500;
  height: 40px;
  width: 100%;
  background-color: #13395e;
  box-shadow: 0 1px 3px 0 rgba(19, 57, 94, 0.4);
}
#pay-button:active {
  background-color: #0b2a49;
  box-shadow: 0 1px 3px 0 rgba(19, 57, 94, 0.4);
}
#pay-button:hover {
  background-color: #15406b;
  box-shadow: 0 2px 5px 0 rgba(19, 57, 94, 0.4);
}
#pay-button:disabled {
  background-color: #697887;
  box-shadow: none;
}
#pay-button:not(:disabled) {
  cursor: pointer;
}
.card-frame {
  border: solid 1px #13395e;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 15px;
  height: 40px;
  box-shadow: 0 1px 3px 0 rgba(19, 57, 94, 0.2);
}
.card-frame.frame--rendered {
  opacity: 1;
}
.card-frame.frame--rendered.frame--focus {
  border: solid 1px #13395e;
  box-shadow: 0 2px 5px 0 rgba(19, 57, 94, 0.15);
}
.card-frame.frame--rendered.frame--invalid {
  border: solid 1px #d96830;
  box-shadow: 0 2px 5px 0 rgba(217, 104, 48, 0.15);
}
.success-payment-message {
  color: #13395e;
  line-height: 1.4;
}
.token {
  color: #b35e14;
  font-size: 0.9rem;
  font-family: monospace;
}
.card-msg {
  padding: 15px 30px;
}
.card-label {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  span {
    color: #f56c6c;
  }
  .right {
    display: flex;
    padding-right: 15px;
  }
}
.pay-btn-wrap {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}
@media screen and (min-width: 31rem) {
  .card-frame {
    margin-bottom: 40px;
  }
  #pay-button {
    width: 175px;
  }
}
</style>

<style lang="scss">
.wallet-btn {
  .el-button--primary {
    width: 230px;

    span {
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      line-height: 28px;
    }
  }
}

.wallet_search {
  width: 40%;

  .el-form-item__content {
    width: 80%;
    display: flex;
  }

  .search_txt {
    input {
      padding: 0 15px;
      border-radius: 0;
      box-shadow: none;
    }
  }

  .search_btn {
    border-radius: 0;
    box-shadow: none;
  }
}
</style>
