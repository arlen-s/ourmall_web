<template>
  <div class="contentpanel my-custom-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-s-shop"></i>
          <h2>My Stores</h2>
        </div>
      </div>
      <div class="right">
        <el-button v-if="apiUserId != 146445" type="primary" @click="openConnectStore"
          >Add a new store</el-button
        >
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
                    <el-form-item>
                      <el-input
                        v-model="filterParams.name"
                        placeholder="Name"
                        @keyup.enter.native="filterGetItem"
                      ></el-input>
                    </el-form-item>
                    <!--<el-form-item label="Status:">
											<el-select v-model="filterParams.status" style="width: 200px;" placeholder="Status" @change="filterGetItem">
												<el-option label="Please choose one" value=""></el-option>
												<el-option label="YES" value="true"></el-option>
												<el-option label="NO" value="false"></el-option>
											</el-select>
										</el-form-item>-->
                    <!--<el-form-item>
											<el-input v-model="filterParams.email" placeholder="email" @keyup.enter.native="filterGetItem"></el-input>
										</el-form-item>-->
                    <el-form-item label="Auth Status:">
                      <el-select
                        v-model="filterParams.isAuth"
                        style="width: 200px"
                        placeholder="All Status"
                        @change="filterGetItem"
                      >
                        <el-option label="All Status" value=""></el-option>
                        <el-option label="Authorized" value="1"></el-option>
                        <el-option label="Unauthorized" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="filterGetItem"
                        >Filter</el-button
                      >
                      <el-button type="danger" @click="clearFilter"
                        >Clear</el-button
                      >
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
            <!-- :height="tableHeight" -->
            <el-table
              :data="items"
              stripe
              row-key="id"
              style="width: 100%"
              ref="gridTable"
            >
              <el-table-column label="Store Name" width="400">
                <template slot-scope="scope">
                  <div v-if="scope.row.shopName && scope.row.platform != '3'">
                    <shopCate :items="scope.row" />
                    <el-link
                      type="primary"
                      :href="`//${scope.row.shopUrl}`"
                      target="_blank"
                      >{{ scope.row.shopName }}</el-link
                    >
                  </div>
                  <div v-else>{{ scope.row.shopName || "---" }}</div>
                </template>
              </el-table-column>
              <el-table-column label="Date">
                <template slot-scope="scope">
                  <div style="color: #909399">
                    Creation date:
                    <span style="color: #303133">{{
                      scope.row.timeCreated
                        ? moment
                            .unix(scope.row.timeCreated)
                            .format("ll [at] LTS")
                        : "---"
                    }}</span>
                  </div>
                  <div style="color: #909399">
                    Auth date:
                    <span style="color: #303133">{{
                      scope.row.timeAuth
                        ? moment.unix(scope.row.timeAuth).format("ll [at] LTS")
                        : "---"
                    }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="Whether to host">
                <template slot-scope="scope">
                  <el-switch
                    :value="Number(scope.row.isDeposit)"
                    :active-value="1"
                    :inactive-value="2"
                    active-color="rgba(69, 219, 94, 1)"
                    @change="changeDeposit(scope.row)"
                  >
                  </el-switch>
                </template>
              </el-table-column>
              <!--<el-table-column label="Auth Status">
								<template slot-scope="scope">
									<div> <span style="color:#303133">{{scope.row.authStatus == 1 ? 'yes' : 'no'}}</span></div>
								</template>
							</el-table-column>-->
              <el-table-column label="Status">
                <template slot-scope="scope">
                  <span
                    class="s-label"
                    :class="
                      scope.row.authStatus == 1
                        ? 'label-success'
                        : 'label-warning'
                    "
                    >{{
                      scope.row.authStatus == 1 ? "Authorized" : "Unauthorized"
                    }}</span
                  >
                </template>
              </el-table-column>
              <!-- <el-table-column label="Entrusted vendor" min-width="300">
                <template slot-scope="scope">
                  {{ scope.row.vendorName ? scope.row.vendorName : "---" }}
                </template>
              </el-table-column> -->
              <el-table-column v-if="apiUserId != 146445" label="Action" width="300">
                <template slot-scope="scope">
                  <div>
                    <el-link type="danger" @click="delStore(scope.row)"
                      >Delete</el-link
                    >
                  </div>
                  <div v-if="scope.row.vendorName">
                    <el-link type="danger" @click="entrustedRemove(scope.row)"
                      >Remove entrusted vendor</el-link
                    >
                  </div>
                  <!-- <div v-if="!scope.row.vendorName">
                    <el-link type="primary" @click="entrustedSet(scope.row)"
                      >Set entrusted vendor</el-link
                    >
                  </div> -->
                  <div>
                    <el-link
                      type="primary"
                      @click="connectStoreAgain(scope.row)"
                      >Reauthorize</el-link
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
    <!-- <el-dialog
      custom-class="connectStore"
      :visible.sync="connectStoreOpen"
      width="40%"
      :close-on-click-modal="false"
    >
      <el-divider></el-divider>
      <div slot="title" class="d-flex align-item-center">
        <img src="/images/shopify.jpg" width="100" />
        <span
          style="
            margin-left: 10px;
            line-height: 24px;
            font-size: 18px;
            color: #303133;
          "
          >Connect your Shopify store</span
        >
      </div>
      <div style="padding: 0 20px 30px">
        <div>
          <p
            style="
              margin-top: 20px;
              color: #333;
              font-size: 14px;
              line-height: 24px;
            "
          >
            you can dispatch the Shopify orders to your vendors after the
            authorization and the shipping information will be automatically
            synchronized to your Shopify Store.
          </p>
        </div> -->
    <!--<div class="d-flex" style="margin-bottom: 20px;">
						<div style="color: #999;width:100px;text-align: right;margin-right: 10px;white-space: nowrap;">Store Name:</div>
						<div style="margin-right: 30px;width: 70%;">
							<el-input size="medium" placeholder="Your Shopify store name" v-model="shopifyName">
							</el-input>
						</div>
					</div>-->
    <!-- <div style="margin-top: 20px">
          <p
            style="
              margin: 0 0 15px;
              color: #333;
              font-size: 14px;
              line-height: 24px;
            "
          >
            <strong
              >Enter your existing Shopify URL bellow and click
              “connect”</strong
            >, you will be redirect to Shopify to connect your account to
            OurMall (the authorization will be also completed).
          </p>
          <div style="width: 90%">
            <el-input
              :disabled="errorMessage != ''"
              size="medium"
              placeholder="Your Shopify store name"
              v-model="shopifyUrl"
            >
              <template slot="prepend">https://</template>
              <template slot="append">.myshopify.com</template>
            </el-input>
          </div>
        </div>

        <p
          v-if="errorMessage != ''"
          style="margin-top: 30px; color: #f56c6c; text-align: center"
        >
          {{ errorMessage }}
        </p>
      </div>

      <el-divider></el-divider>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="connectStoreOpen = false"
          >Close</el-button
        >
        <el-button
          size="small"
          type="primary"
          @click="connectStoreFn"
          v-if="errorMessage == ''"
          >Connect</el-button
        >
      </div>
    </el-dialog> -->

    <el-dialog
      :title="modiWoo ? 'Reauthorization' : 'Add a new store'"
      custom-class="connectStore"
      :visible.sync="connectStoreOpen"
      width="40%"
      :close-on-click-modal="false"
      v-loading="connectStoreLoading"
    >
      <el-divider></el-divider>
      <el-form :label-position="'left'" label-width="100px">
        <el-form-item label="Store type:">
          <div class="imgList">
            <template v-for="(platform, k) in platformArr">
              <div
                v-if="!modiWoo || k == 'woo'"
                :key="k"
                class="shopImg"
                :class="{
                  active: activePlatform == k,
                  disable: !platform.enabled,
                }"
                @click="selectPlatform(k, platform.enabled)"
              >
                <img
                  :src="shopImgList[k]"
                  :alt="platform.name"
                  :style="{ opacity: platform.enabled ? 1 : 0.5 }"
                />
                <a
                  v-if="!platform.enabled"
                  href="javascript:;"
                  class="comingSoon"
                  >Coming Soon</a
                >
              </div>
            </template>
          </div>
        </el-form-item>
        <el-form-item label="Store URL:" v-if="activePlatform == 'shopify'">
          <div>
            <el-input
              :disabled="errorMessage != ''"
              size="medium"
              placeholder="Your store name"
              v-model="shopifyUrl"
              @keyup.enter.native="connectStoreFn"
            >
              <template slot="prepend">https://</template>
              <template slot="append">.myshopify.com</template>
            </el-input>
          </div>
          <div v-if="!vipData.service">
            <i class="el-icon-info"></i>
            <span class="mg-l-5">{{ $root.$children[0].shopName }}</span>
            vendor is authorizing the store on Ourmall Dropshipping App, please
            be noted.
          </div>
        </el-form-item>
        <template v-if="activePlatform == 'woo'">
          <el-form-item label="Store URL:">
            <el-input
              style="width: 70%"
              size="medium"
              placeholder="Your Woocommerce store name"
              v-model="shopifyUrl"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="ApiKey:">
            <el-input style="width: 50%" size="medium" v-model="ApiKey">
            </el-input>
          </el-form-item>
          <el-form-item label="ApiSecretKey:">
            <el-input style="width: 50%" size="medium" v-model="ApiSecretKey">
            </el-input>
          </el-form-item>
        </template>
        <template v-if="activePlatform == 'shopee'">
          <el-form-item label="Store Name:">
            <el-row>
              <el-col :span="15">
                <el-input
                  size="medium"
                  placeholder="Your store name"
                  v-model="shopeeShopName"
                ></el-input>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-button
                  :loading="authLoading"
                  size="medium"
                  type="primary"
                  :disabled="!shopeeShopName.trim()"
                  @click="authShopee"
                  >Authroize</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="Auth Code:">
            <el-row>
              <el-col :span="15">
                <el-input
                  size="medium"
                  placeholder="Auth Code"
                  v-model="shopeeAuthCode"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </template>
      </el-form>
      <el-divider></el-divider>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="connectStoreOpen = false"
          >Close</el-button
        >
        <el-button
          size="small"
          type="primary"
          @click="connectStoreFn"
          v-if="errorMessage == ''"
          >Connect</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="depositDialog.isShow"
      :title="depositDialog.title"
      width="40%"
      custom-class="hosted"
      :close-on-click-modal="false"
      v-model="depositDialog.loading"
    >
      <template v-if="depositDialog.type == 1">
        <el-divider></el-divider>
        <p style="margin: 40px 12%; color: rgba(127, 127, 127, 1)">
          Are you sure you want to cancel the hosting store "{{
            depositDialog.name
          }}", after you close the hosting, the supplier will not be able to
          actively quote your order!
        </p>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="depositDialog.isShow = false"
            >Close</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="depositStore(depositDialog.row, 2)"
            >Sure</el-button
          >
        </div>
      </template>
      <template v-if="depositDialog.type == 2">
        <div class="tips_success">
          <div class="icon">
            <i class="el-icon-check"></i>
          </div>
          <div class="txt">
            You have successfully hosted the {{ depositDialog.name }} store.
            After the successful hosting, your supplier will take the initiative
            to quote for your pending orders!
          </div>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      title="Set entrusted vendor"
      :visible.sync="DialogEntrustSet.isShow"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-divider></el-divider>
      <div style="padding: 0 25px">
        <p class="mg-t-20 mg-b-20">Choose a vendor</p>
        <div
          :style="{
            minHeight: DialogEntrustSet.inputVisible2 ? '450px' : '200px',
          }"
        >
          <el-popover
            @hide="hidepopoverCustomer"
            ref="popoverCustomer"
            popper-class="with-shadow with-shadow2"
            trigger="manual"
            v-model="DialogEntrustSet.inputVisible2"
            width="300"
            placement="bottom"
          >
            <el-input
              @focus="
                DialogEntrustSet.inputVisible2 = !DialogEntrustSet.inputVisible2
              "
              @keyup.native="changeCustomerName()"
              @keyup.enter.native="changeCustomerName()"
              style="width: 350px"
              class="input-new-tag"
              slot="reference"
              v-model="DialogEntrustSet.vendorName"
              ref="saveTagInput"
              size="medium"
            >
            </el-input>
            <div class="tx-center change-customer">
              <div style="height: 280px; overflow-y: scroll">
                <div class="mg-t-10" v-if="vendorData.length">
                  <div
                    v-for="(relation, index) in vendorData"
                    v-if="relation.vendorId"
                    :key="index + relation.id + relation.customerName"
                    class="text customer-item"
                    @click="selectCustomer(relation)"
                    :class="{ active: relation.active }"
                  >
                    <div>
                      <i class="el-icon-s-custom mg-r-5"></i
                      >{{ relation.vendorName ? relation.vendorName : "---" }}
                      <!--<div>
												<span v-if="relation.vendorRemark">({{relation.vendorRemark}})</span>
											</div>-->
                    </div>
                    <!--<el-button size="mini" type="primary" plain>Select</el-button>-->
                    <el-link
                      type="primary"
                      :underline="false"
                      style="font-weight: normal"
                      >Select</el-link
                    >
                  </div>
                </div>
                <div v-else class="tx-center">No data</div>
              </div>
              <el-divider></el-divider>
              <template
                v-if="
                  DialogEntrustSet.vendorName == '' || vendorData.length > 0
                "
              >
                <el-button type="primary" plain @click="openAddVendor"
                  ><i class="fa fa-user-plus mg-r-10"></i>Add a new
                  vendor</el-button
                >
              </template>
              <template
                v-if="DialogEntrustSet.vendorName && vendorData.length == 0"
              >
                <el-button type="primary" plain @click="openAddVendor"
                  ><i class="fa fa-user-plus mg-r-10"></i>Add "{{
                    DialogEntrustSet.vendorName
                  }}"</el-button
                >
              </template>
            </div>
          </el-popover>
        </div>
      </div>
      <el-divider></el-divider>
      <div slot="footer" class="dialog-footer">
        <div>
          <el-button
            :disabled="DialogEntrustSet.loading"
            @click="
              DialogEntrustSet.isShow = false;
              DialogEntrustSet.inputVisible2 = false;
            "
            >Cancel</el-button
          >
          <el-button
            type="primary"
            :disabled="DialogEntrustSet.loading"
            :loading="DialogEntrustSet.loading"
            @click="saveEntrustSet"
            >Save</el-button
          >
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="Add a new vendor"
      :visible.sync="addVendorDialog.isShow"
      :width="'620px'"
      :close-on-click-modal="false"
      class="add-vendor-dialog"
    >
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24">
          <el-form>
            <el-form-item
              label="Name"
              :label-width="addVendorDialog.labelW"
              required
            >
              <el-input
                placeholder="Name"
                v-model="addVendorDialog.name"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Email" :label-width="addVendorDialog.labelW">
              <el-input
                placeholder="Email"
                v-model="addVendorDialog.email"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Remark" :label-width="addVendorDialog.labelW">
              <el-input
                placeholder="Remark"
                v-model="addVendorDialog.remark"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="addVendorDialog.isShow = false"
          >Close</el-button
        >
        <el-button
          size="small"
          type="primary"
          @click="saveVendor(2)"
          :loading="addVendorDialog.loading"
          >Save</el-button
        >
        <!--				<el-button size="small" type="primary" @click="saveVendor(2)" :loading="addVendorDialog.loading">Save and change the vendor</el-button>-->
      </div>
    </el-dialog>
    <el-backtop
      class="goto-top"
      target=".main-scroll  .el-scrollbar__wrap"
      :right="20"
      :bottom="120"
    >
    </el-backtop>
  </div>
</template>

<script>
import shopCate from "../components/shopCate";
export default {
  data() {
    return {
      apiUserId: localStorage.getItem('c_apiUserId'),
      userId: "",
      vipData: {},
      num: 0,
      loading: false,
      tableHeight: 400,
      reSizeTime: 0,
      pageSizes: [10, 20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("c_storeRowsPerPage")
        ? Number(localStorage.getItem("c_storeRowsPerPage"))
        : 10,
      items: [],
      shopImgList: {
        shopify: require("../../public/images/shop/shopify.png"),
        // lazada: require("../../public/images/shop/lazada.png"),
        woo: require("../../public/images/shop/woo.jpg"),
        shopee: require("../../public/images/shop/shopee.jpg"),
      },
      shopeeShopName: "",
      shopeeAuthCode: "",
      authLoading: false,
      shopeeWindow: null,
      total: 0,
      totalPage: 0,
      filterParams: {
        name: "",
        status: "",
        isAuth: "",
      },
      filterParamsDefault: "{}",
      connectStoreLoading: false,
      connectStoreOpen: false,
      shopifyUrl: "",
      ApiSecretKey: "",
      ApiKey: "",
      errorMessage: "",
      DialogEntrustSet: {
        isShow: false,
        loading: false,
        vendorName: "",
        vendorId: "",
        inputVisible2: false,
        id: "",
      },
      vendorData: [],
      addVendorDialog: {
        isShow: false,
        loading: false,
        labelW: "120px",
        name: "",
        remark: "",
        email: "",
        id: "",
      },
      addVendorDialogDefault: "{}",
      platformArr: this.$dict.platformArr,
      activePlatform: "shopify",
      modiWoo: false,
      shopifyWindow: null,
      depositDialog: {
        isShow: false,
        loading: false,
        type: "",
        title: "",
        row: {},
        name: "",
      },
      depositDialogDefault: "{}",
    };
  },
  components: { shopCate },
  watch: {
    $route: "gotoPage",
    connectStoreOpen() {
      if (!this.connectStoreOpen) {
        clearInterval(this.connectStoreWait);
      }
    },
  },
  mounted() {
    this.addVendorDialogDefault = JSON.stringify(this.addVendorDialog);
    this.depositDialogDefault = JSON.stringify(this.depositDialog);
    this.filterParamsDefault = JSON.stringify(this.filterParams);
    this.filterParams.isAuth = this.$route.query.isAuth
      ? this.$route.query.isAuth
      : "";
    this.getItem();
    this.getVendor();
    this.getVipDetail();
    // window.onresize = () => {
    // 	this.$getTableHeight(this);
    // };
    if (this.$route.params.add) {
      this.$route.params.add = false;
      this.openConnectStore();
      if (this.$route.params.val) this.shopifyUrl = this.$route.params.val;
    }
    if (document.domain !== " ") {
      window.addEventListener("message", (e) => {
        if (e.data && typeof e.data === "string") {
          console.log(e.data);
          this.messageCallback(e.data);
        }
      });
    }
  },
  beforeDestroy() {
    // window.onresize = null;
  },
  methods: {
    messageCallback(code) {
      if (code.indexOf("=||=") > -1) {
        const codeDate = code.split("=||=");
        this.shopeeAuthCode = codeDate[0]
        const params = {
          code: codeDate[0],
          name: this.shopeeShopName.trim(),
          platformId: 4,
          shop_id: codeDate[1],
        };
        this.$apiCall("api.ShopifyAccount.authorizationErp", params, (r) => {
          if(r.ErrorCode == 9999){
            this.getItem()
            this.$message.success(r.Message)
            if(this.shopeeWindow)this.shopeeWindow.close()
            this.connectStoreOpen = false;
          } else {
            this.$message.error(r.Message)
          }
        });
      }
    },
    authShopee() {
      let params = {
        platform: 4,
        shopName: this.shopeeShopName.trim(),
      };
      this.authLoading = true;
      this.$apiCall("api.ShopifyAccount.addOtherAccount", params, (r) => {
        this.authLoading = false;
        if (r.ErrorCode == 9999) {
          if (r.Data.Results.url) {
            this.shopeeWindow = window.open(
              r.Data.Results.url,
              "popup",
              "width = 600, height = 600"
            );
          } else {
            this.$message.error("error!");
          }
          console.log(this.shopeeWindow);
        } else {
          this.$message.error(r.Message);
        }
      });
    },
    getVipDetail() {
      setTimeout(() => {
        this.userId = this.$store.state.userInfo.id;
        this.$apiCall(
          "api.Admin.getVipDetail",
          {
            userId: this.userId,
          },
          (r) => {
            if (r.ErrorCode == 9999) {
              this.vipData = r.Data.Results;
            }
          }
        );
      }, 500);
    },
    selectPlatform(k, status) {
      if (status) this.activePlatform = k;
    },
    openAddVendor() {
      this.addVendorDialog = JSON.parse(this.addVendorDialogDefault);
      this.addVendorDialog.name = this.vendorName;
      this.addVendorDialog.isShow = true;
    },
    saveVendor(type) {
      if (!this.addVendorDialog.name) {
        this.$elementMessage("Customer name required", "error");
        return;
      }
      this.addVendorDialog.loading = true;
      let url = "api.Relationship.addByCustomer";
      let params = {
        name: this.addVendorDialog.name,
        email: this.addVendorDialog.email,
        remark: this.addVendorDialog.remark,
      };
      this.$apiCall(url, params, (r) => {
        this.addVendorDialog.loading = false;
        if (r.ErrorCode == 9999) {
          this.DialogEntrustSet.vendorName = "";
          this.addVendorDialog.isShow = false;
          this.$elementMessage("Customers successfully added", "success");
          this.getVendor();
        } else {
          this.$elementMessage(r.Message, "error");
          if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
            this.$userFailure();
          }
        }
      });
    },
    changeCustomerName() {
      let time = 500;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.$showLoading();
        this.$apiCall(
          "api.Relationship.findByCustomer",
          {
            name: this.DialogEntrustSet.vendorName,
          },
          (r) => {
            this.$hideLoading();
            if (r.ErrorCode == 9999) {
              this.vendorData = r.Data.Results;
            } else {
              this.$elementMessage(r.Message, "error");
              if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                this.$userFailure();
              }
            }
          }
        );
      }, time);
    },
    getVendor() {
      this.$apiCall("api.Relationship.findByCustomer", {}, (r) => {
        if (r.ErrorCode == "9999") {
          this.vendorData = r.Data.Results;
        } else {
          this.$elementMessage(r.Message, "error");
          if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
            this.$userFailure();
          }
        }
      });
    },
    selectCustomer(item) {
      this.DialogEntrustSet.vendorName = item.vendorName;
      this.DialogEntrustSet.vendorId = item.vendorId;
      setTimeout(() => {
        this.DialogEntrustSet.inputVisible2 = false;
      }, 100);
    },
    hidepopoverCustomer() {
      setTimeout(() => {
        this.DialogEntrustSet.inputVisible2 = false;
      }, 100);
    },
    saveEntrustSet() {
      let params = {
        id: this.DialogEntrustSet.id,
        vendorId: this.DialogEntrustSet.vendorId,
      };
      this.$apiCall("api.ShopifyAccount.bindVendor", params, (r) => {
        this.DialogEntrustSet.loading = false;
        if (r.ErrorCode == 9999) {
          this.$message({
            message: "Successfully set",
            type: "success",
          });
          this.DialogEntrustSet.isShow = false;
          this.DialogEntrustSet.inputVisible2 = false;
          this.getItem(true);
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    entrustedSet(item) {
      this.DialogEntrustSet.isShow = true;
      this.DialogEntrustSet.vendorName = "";
      this.DialogEntrustSet.vendorId = "";
      this.DialogEntrustSet.id = item.id;
      setTimeout(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      }, 300);
    },
    entrustedRemove(item) {
      //删除
      this.$confirm("Are you sure you want to remove entrusted vendor? ", "", {
        confirmButtonText: "Remove",
        cancelButtonText: "Cancel",
        type: "error",
      })
        .then(() => {
          this.$apiCall(
            "api.ShopifyAccount.unbindVendor",
            {
              id: item.id,
            },
            (r) => {
              if (r.ErrorCode == 9999) {
                this.$message({
                  message: "Successfully remove",
                  type: "success",
                });
                this.getItem(true);
              } else {
                this.$elementMessage(r.Message, "error");
                if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                  this.$userFailure();
                }
              }
            }
          );
        })
        .catch(() => {});
    },
    connectStoreAgain(item) {
      if (item.platform != 2) {
        this.shopifyWindow = window.open(
          "/blank.html",
          "shopifyAccount-window",
          undefined,
          true
        );
      } else {
        this.activePlatform = "woo";
        this.openConnectStore("woo", item.shopUrl);
        return;
      }

      this.$showLoading();
      let params = {};
      if (item.platform == "1") {
        this.activePlatform = "shopify";
        params = {
          shopUrl: item.subShopUrl,
          getAuth: 1,
          fromList: 1,
          platform: item.platform,
        };
      } else if (item.platform == "3") {
        this.activePlatform = "lazada";
        params = {
          ati: this.$getCookie("_ati"),
          platform: item.platform,
        };
      }
      this.$apiCall("api.ShopifyAccount.addOtherAccount", params, (r) => {
        this.$hideLoading();
        if (r.ErrorCode == "9999") {
          if (this.activePlatform == "shopify") {
            this.shopifyWindow.location = r.Data.Results;
            this.shopifyUrl = item.subShopUrl;
            this.connectConfirmStart();
          }
          if (this.activePlatform == "lazada") {
            let state = r.Data.Results.state;
            this.shopifyWindow.location = r.Data.Results.url;
            this.connectConfirmStart(state);
          }
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    connectStoreConfirmFn() {
      location.reload();
    },
    connectConfirmStart(state) {
      if (this.shopifyWindow.closed) {
        this.shopifyWindow.close();
        this.connectStoreLoading = false;
        clearInterval(this.connectStoreWait);
      }
      let params = {};
      if (this.activePlatform == "shopify") {
        params.shopUrl = this.shopifyUrl;
      }
      if (this.activePlatform == "lazada") {
        params.state = state;
      }
      this.connectStoreWait = setInterval(() => {
        this.$apiCall("api.ShopifyAccount.getShopAuthStatus", params, (r) => {
          if (r.ErrorCode == "9999") {
            if (r.Data.Results.status == 1) {
              clearInterval(this.connectStoreWait);
              this.shopifyWindow.close();
              this.connectStoreLoading = false;
              this.connectStoreOpen = false;
              this.getItem();
              this.$message({
                message: "Successful store authorization",
                type: "success",
                duration: 0,
                showClose: true,
              });
            } else if (r.Data.Results.status == 2) {
              this.shopifyWindow.close();
              this.connectStoreLoading = false;
              this.connectStoreOpen = false;
              this.$elementMessage(r.Data.Results.errorMessage, "error");
              clearInterval(this.connectStoreWait);
            }
          } else {
            this.$elementMessage(r.Message, "error");
          }
        });
      }, 1000);
    },
    // add store
    connectStoreFn() {
      let params = {};
      if (this.activePlatform == "shopify") {
        if (!this.shopifyUrl) {
          this.$elementMessage("Please enter Shopify store URL", "error");
          return;
        }
        params = {
          shopUrl: this.shopifyUrl,
          platform: 1,
        };
      } else if (this.activePlatform == "woo") {
        if (!this.shopifyUrl) {
          this.$elementMessage("Please enter Woocommerce store URL", "error");
          return;
        }
        params = {
          shopUrl: this.shopifyUrl,
          apiKey: this.ApiKey,
          apiSecretKey: this.ApiSecretKey,
          ivc: localStorage.getItem("c_ivc")
            ? localStorage.getItem("c_ivc")
            : "",
          utmSource: localStorage.getItem("c_utm"),
          platform: 2,
        };
      } else if (this.activePlatform == "lazada") {
        params = {
          platform: 3,
          ati: this.$getCookie("_ati"),
        };
      } else if (this.activePlatform == "shopee") {
        params = {
          platform: 4,
        };
        this.$message.error('Please fulfill the store info!')
        return
      }
      this.connectStoreLoading = true;
      this.$apiCall("api.ShopifyAccount.addOtherAccount", params, (r) => {
        if (r.ErrorCode == "9999") {
          if (this.activePlatform == "shopify") {
            this.shopifyWindow = window.open(r.Data.Results);
            this.connectConfirmStart();
          }
          if (this.activePlatform == "lazada") {
            let state = r.Data.Results.state;
            this.shopifyWindow = window.open(r.Data.Results.url);
            this.connectConfirmStart(state);
          }
          if (this.activePlatform == "woo") {
            this.getItem();
            this.connectStoreOpen = false;
            this.$elementMessage("add a new store success", "success");
          }
        } else {
          this.connectStoreLoading = false;
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    openConnectStore(type, url) {
      clearInterval(this.connectStoreWait);
      this.modiWoo = false;
      this.connectStoreOpen = true;
      this.connectStoreLoading = false;
      this.activePlatform = this.$route.params.platform
        ? this.$route.params.platform
        : "shopify";
      this.shopifyUrl = "";
      this.errorMessage = "";
      this.ApiKey = this.ApiSecretKey = "";
      if (type == "woo") {
        this.activePlatform = "woo";
        this.shopifyUrl = url;
        this.modiWoo = true;
      }
    },
    delStore(item) {
      //删除
      this.$confirm("Are you sure you want to delete it? ", "", {
        confirmButtonText: "Delete",
        cancelButtonText: "Discard",
        type: "error",
      })
        .then(() => {
          this.$apiCall(
            "api.Invoice.deleteStore",
            {
              shopId: item.id,
            },
            (r) => {
              if (r.ErrorCode == 9999) {
                this.$message({
                  message: "Successfully delete",
                  type: "success",
                });
                this.getItem(true);
              } else {
                this.$elementMessage(r.Message, "error");
                if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                  this.$userFailure();
                }
              }
            }
          );
        })
        .catch(() => {});
    },
    changeDeposit(row) {
      console.log(row);
      if (row.isDeposit == 1) {
        this.depositDialog = JSON.parse(this.depositDialogDefault);
        this.depositDialog.type = 1;
        this.depositDialog.title = "Close";
        this.depositDialog.row = row;
        this.depositDialog.name = row.shopName;
        this.depositDialog.isShow = true;
      } else {
        this.depositStore(row, 1);
      }
    },
    depositStore(row, isDeposit) {
      if (isDeposit == 2) this.depositDialog.loading = true;
      this.$apiCall(
        "api.ShopifyAccount.changeDeposit",
        {
          id: row.id,
          isDeposit,
        },
        (r) => {
          if (isDeposit == 2) this.depositDialog.loading = false;
          if (r.ErrorCode == 9999) {
            row.isDeposit = isDeposit;
            if (isDeposit == 1) {
              this.depositDialog = JSON.parse(this.depositDialogDefault);
              this.depositDialog.type = 2;
              this.depositDialog.title = "";
              this.depositDialog.name = row.shopName;
              this.depositDialog.isShow = true;
            } else {
              this.depositDialog.isShow = false;
              this.$message({
                message: "Closed successfully",
                type: "success",
              });
            }
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure();
            }
          }
        }
      );
    },
    clearFilter() {
      //清空筛选
      this.filterParams = JSON.parse(this.filterParamsDefault);
      if (this.$route.query.page == 1) {
        this.getItem();
      } else {
        this.$router.push({
          query: {
            page: 1,
          },
        });
      }
    },
    filterGetItem() {
      //筛选
      if (this.$route.query.page == 1) {
        this.getItem();
      } else {
        this.$router.push({
          query: {
            page: 1,
          },
        });
      }
    },
    getItem(s) {
      this.loading = true;
      this.$apiCall(
        "api.Invoice.findStores",
        {
          page: this.page,
          rowsPerPage: this.rowsPerPage,
          shopName: this.filterParams.name,
          //						status: this.filterParams.status,
          authStatus: this.filterParams.isAuth,
        },
        (r) => {
          this.loading = false;
          if (r.ErrorCode == 9999) {
            this.items = r.Data.Results;
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
        }
      );
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
      localStorage.setItem("c_storeRowsPerPage", val);
      this.getItem();
    },
    gotoPage() {
      this.page = this.$route.query.page ? this.$route.query.page : 1;
      this.getItem();
    },
  },
};
</script>
<style lang="scss" scoped>
.d-none {
  display: none;
}
.imgList {
  display: flex;
  .shopImg {
    width: 100px;
    height: 50px;
    border: 1px solid #dcdfe6;
    line-height: 43px;
    margin-right: 10px;
    position: relative;
    cursor: pointer;
    img {
      width: 100%;
      height: auto;
    }
  }
  .shopImg:hover:not(.disable) {
    border-color: $--color-primary;
  }
  .active {
    border-color: $--color-primary;
  }
  .shopImg.disable {
    cursor: not-allowed;
    border-color: #dcdfe6;
  }
}

.comingSoon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-decoration: none !important;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  width: 80px;
  line-height: 20px;
}

.hosted {
  .tips_success {
    margin: 50px 12%;

    .icon {
      margin: 30px auto;
      width: 50px;
      height: 50px;
      background: rgba(82, 196, 26, 1);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        font-size: 30px;
        line-height: 30px;
        color: white;
      }
    }

    .txt {
      color: rgba(127, 127, 127, 1);
    }
  }
}
</style>
