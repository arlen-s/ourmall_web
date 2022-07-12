<template>
  <div>
    <div v-if="paystatus > 0" class="pay-status-body">
      <div v-if="paystatus == 1">
        <div class="d-flex">
          <img src="@/assets/pay/payStatus1.png" height="30" />
          <span class="tx-bold"
            >Waiting for the payment result to be returned.</span
          >
        </div>
        <p>You may need to wait a little while</p>
        <el-button type="primary" plain @click="goBack">View order</el-button>
      </div>
      <div v-if="paystatus == 2">
        <div class="d-flex">
          <img src="@/assets/pay/payStatus2.png" height="30" />
          <span class="tx-bold">Payment successful</span>
        </div>
        <p>You have successfully completed your order.</p>
        <el-button type="primary" plain @click="goBack">View order</el-button>
      </div>
      <div v-if="paystatus == 3">
        <div class="d-flex">
          <img src="@/assets/pay/payStatus3.png" height="30" />
          <span class="tx-bold">Payment failed</span>
        </div>
        <p>Sorry, we can't complete the payment.</p>
        <div class="d-flex">
          <!-- <el-button type="primary" @click="orderPay('repay')"
            >Pay again</el-button
          > -->
          <el-button type="primary" plain @click="goBack">View order</el-button>
        </div>
      </div>
    </div>
    <div v-else class="cart">
      <!-- Header -->
      <template v-if="code && code.header && code.header.length > 0">
        <div
          v-for="(item, index) in code.header"
          :key="index"
          v-html="item"
        ></div>
      </template>
      <div style="position: relative; height: 120px">
        <DHeader
          :data="(setting && setting.header) || ''"
          :headerMenu="headerMenu"
        />
      </div>
      <div class="main">
        <div class="address_box">
          <div class="title mr-l-30">Shipping Address</div>
          <div class="swiperBox">
            <div class="swiper-button-next">
              <el-button icon="el-icon-arrow-right" circle></el-button>
            </div>
            <div>
              <swiper :options="swiperOptions">
                <swiper-slide v-for="(item, index) in addressList" :key="index">
                  <el-card
                    class="card"
                    :class="{ active: item.isDefault == '1' }"
                  >
                    <div class="main_card" @click="changeChoose(item, index)">
                      <div class="title_card">
                        <span>{{ item.firstName }}</span>
                        <span style="margin-left: 5px">{{
                          item.lastName
                        }}</span>
                      </div>
                      <div class="title_card">{{ item.phone }}</div>
                      <div class="mutiple title_card">
                        {{ item.address1 }}
                      </div>
                    </div>
                    <div class="footer_card">
                      <el-button type="text" @click.native="editAddress(item)"
                        >Edit</el-button
                      >
                      <el-button
                        type="text"
                        class="text-danger"
                        @click.native="deleteAddress(item, index)"
                        >Delete</el-button
                      >
                    </div>
                    <span v-if="item.isDefault == '1'" class="default"
                      ><i class="el-icon-circle-check"></i
                    ></span>
                  </el-card>
                </swiper-slide>
                <swiper-slide>
                  <el-card class="card addEdit" @click.native="editAddress()">
                    <el-button
                      icon="el-icon-plus"
                      type="text"
                      class="text-white"
                      @click.native="editAddress()"
                      >Add New Address</el-button
                    >
                  </el-card>
                </swiper-slide>
              </swiper>
            </div>
            <!--以下看需要添加-->

            <div class="swiper-button-prev">
              <el-button icon="el-icon-arrow-left" circle></el-button>
            </div>
          </div>
        </div>
        <el-card shadow="never">
          <div>
            <div class="title">
              Product Details
              <span class="title_tips m-l-20"
                >(Please check the purchase products)</span
              >
            </div>
            <div>
              <el-table
                :data="detailsData"
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  type="selection"
                  :selectable="selectable"
                  width="55"
                >
                </el-table-column>
                <el-table-column prop="date" label="Check All" align="center">
                  <template slot-scope="scope">
                    <el-image
                      style="width: 70px; height: 70px"
                      :src="
                        scope.row.stockInfo.propertyImage ||
                        scope.row.productInfo.imgUrl
                      "
                      :fit="fit"
                    >
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="Product">
                  <template slot-scope="scope">
                    <div>
                      <div
                        class="detail_title text-blue font"
                        :title="scope.row.name"
                      >
                        {{ scope.row.productInfo.name }}
                      </div>
                      <div class="font">
                        {{
                          scope.row.stockInfo.propertyValue.replace(
                            /\|\|/g,
                            ","
                          )
                        }}
                      </div>
                      <div class="detail_title text-muted font">
                        {{ scope.row.stockInfo.sku }}
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="address" label="Price" align="center">
                  <template slot-scope="scope">
                    <div class="title">${{ scope.row.stockInfo.price }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="Quantity" align="center">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="scope.row.stockInfo.inventory <= 0"
                      size="mini"
                      v-model="scope.row.stockInfo.chooseInventory"
                      :min="1"
                      :max="Number(scope.row.stockInfo.inventory)"
                      @change="switchHandleChange()"
                    ></el-input-number>
                    <div
                      class="text-danger"
                      v-if="scope.row.stockInfo.inventory <= 0"
                    >
                      out of stock
                    </div>
                    <div
                      class="text-danger"
                      v-if="
                        scope.row.stockInfo.chooseInventory >=
                          scope.row.stockInfo.inventory &&
                        scope.row.stockInfo.inventory > 0
                      "
                    >
                      Inventory: {{ scope.row.stockInfo.inventory }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="Weight" align="center">
                  <template slot-scope="scope">
                    <div class="title">
                      {{ scope.row.stockInfo.weight || 0 }}g
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="Subtotal" align="center">
                  <template slot-scope="scope">
                    <div class="title">
                      ${{
                        Number(
                          scope.row.stockInfo.price *
                            scope.row.stockInfo.chooseInventory
                        ).toFixed(2)
                      }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="Operate" align="center">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      icon="el-icon-delete"
                      @click="deleteFromCart(scope.row)"
                      >Delete</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-card>
        <el-card style="margin-top: 20px; padding-bottom: 100px" shadow="never">
          <div class="d-flex-between">
            <div>
              <span>Shipping Method :</span>
              <el-select
                @change="logisticChange"
                style="margin-left: 20px"
                v-model="logistic"
                placeholder="Please choose"
              >
                <el-option
                  v-for="item in logisticArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <span style="margin-left: 20px">
                <el-tooltip v-if="logError" :content="logError" placement="top">
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </span>
              <el-button type="text" :loading="logLoading"></el-button>
            </div>
            <div>
              <span
                >Subtotal（$）:
                <span class="font_bold">{{ subtotal }}</span></span
              >
              <span style="margin-left: 20px"
                >Freight（$）:
                <span class="font_bold">{{ freight }}</span></span
              >
            </div>
          </div>
          <!-- <div class="other d-flex" style="justify-content: space-between">
          <p>Discount:</p>
          <div class="discount">
            <el-input
              style="width: 400px"
              v-model="discount"
              placeholder="Enter discount code"
              @keyup.enter.native="confirmDiscount"
            >
              <el-button slot="append" type="primary" @click="confirmDiscount"
                >Exchange</el-button
              >
            </el-input>
          </div>
        </div> -->
          <div class="bonus">
            <span style="margin-right: 20px"
              >Bonus:<span class="font_bold"> ($ {{ bonus }})</span></span
            >
            <el-switch
              :disabled="disableSwitchBonus && bonusStatus == '2'"
              @change="changSwitchBonus"
              v-model="switchBonus"
              active-color="#13ce66"
            >
            </el-switch>
          </div>
          <div class="pay_method">
            <p>Payment method:</p>
            <div class="imgRow" v-if="payTypes.length">
              <div
                class="img"
                @click="changePlatform(type.accountType)"
                v-for="type in payTypes"
                :key="type.accountType"
              >
                <img
                  :src="type.icon"
                  alt=""
                  :class="{ disabled: switchBonus == true }"
                />
                <img
                  v-show="
                    platformType == type.accountType && switchBonus == false
                  "
                  class="active-type"
                  src="../assets/pay/Active.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </el-card>
        <div class="pay-submit">
          <span class="left">
            Amount due (including freight)（$）:
            <span class="font_bold"> {{ sum }} </span>
          </span>
          <el-button type="primary" :disabled="platformType == '13'" @click="orderPay()"
            >Submit orders</el-button
          >
        </div>
      </div>
      <!-- <Footer /> -->
      <!-- <DFooter
      :setting="
        ($store.state.configJson && $store.state.configJson.footer) || ''
      "
    />
    <template v-if="code && code.footer && code.footer.length > 0">
      <div
        v-for="(item, index) in code.footer"
        :key="index"
        v-html="item"
      ></div>
    </template> -->
      <el-backtop class="goto-top" :right="32" :bottom="120"> </el-backtop>
      <DialogAddress :setting="activeAddressData" @close="closeDialogAddress" />
      <Underline :data="dialogUnderline" @submitUnderline="submitUnderline" />
      <Dlocal :data="dialogDlocal" @submitDlocal="submitDlocal" />
      <Checkout :data="dialogCheckOut" @payCheckOut="payCheckOut" />
    </div>
   		<el-dialog
		:close-on-press-escape="false" :close-on-click-modal="false"
  title="Please select payment method"
  :visible.sync="dialogVisibleKTPay"
  width="800px"
  :before-close="handleClosePay">
	<el-divider></el-divider>
 	<div class="pd-x-20 mg-y-30 cell-flex">
			  <el-radio-group v-model="KTType">
    <el-radio v-for="(item, i) of KTpayList" :key="i" :label="item.name">{{item.name}}</el-radio>
  </el-radio-group>
	</div>
	<el-divider></el-divider>
	<div slot="footer" class="dialog-footer" @click="dialogVisibleKTPay = false">
		<el-button>
			Cancel
		</el-button>
		<el-button type="primary" @click="continuePay()">
			Pay
		</el-button>
	</div>
</el-dialog> 
  </div>
</template>

<script>
import DHeader from "@/views/homePage/components/header";
// import DFooter from "@/views/homePage/components/footer";
import DialogAddress from "@/views/homePage/components/DialogAddress";
import countryArr from "@/components/country.json";
import Underline from "@/components/checkout/underline";
import Dlocal from "@/components/checkout/dlocal";
import Checkout from "@/components/checkout/checkout";
export default {
  components: {
    DHeader,
    // DFooter,
    DialogAddress,
    Underline,
    Dlocal,
    Checkout,
  },
  data() {
    return {
      payPalSessionId:'',
      payPalId:"",
      delLoading: false,
      newWin: null,
      paystatus: 0,
      KTType: 'credit card',
      KTpayList: [
        {
          name: 'credit card',
          id: 13,

        },
        {
          name: 'qr payment',
          id: 14
        },
        {
          name: 'debit card',
          id: 15
        }
      ],
      setting: null,
      logLoading: false,
      code: {
        header: [],
        footer: [],
      },
      headerMenu: [],
      detailsData: [],
      addressList: [],
      countryJSON: null,
      countryArr: [],
      logError: "",
      dialogVisibleKTPay: false,
      KasikornbankInfo: '',
      logisticArr: [],
      country: "",
      multipleSelection: [],
      logistic: "",
      discount: "",
      subtotal: 0,
      freight: 0,
      bonus: 0,
      sum: 0,
      disableSwitchBonus: false,
      payTypes: [],
      platformType: "",
      switchBonus: false,
      bonusStatus: "2",
      activeAddressData: {
        visible: false,
        addressFrom: {},
        countryList: [],
      },
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        // Some Swiper option/callback...
      },
      activeIndex: 0,
      isBeginning: true,
      isEnd: true,
      openType: "",
      payparams: {},
      //pay   undeline
      dialogUnderline: {
        isShow: false,
        loading: false,
        paymentId: "",
        params: "",
        payAmount: 0,
      },
      //Dlocal
      dialogDlocal: {
        isShow: false,
        invoiceId: "",
        loading: false,
      },
      //checkout
      dialogCheckOut: {
        isShow: false,
        loading: false,
        packages: null,
        orderPay: null,
        token: "",
      },
    };
  },
  watch: {
    $route: "gotoPage",
    "setting.header.activeMenu": {
      handler() {
        this.getMenu();
      },
      deep: true,
    },
    sum: {
      deep: true,
      handler: function (val) {
        if (Number(val) > Number(this.bonus)) {
          this.switchBonus = false;
          this.disableSwitchBonus = true;
        } else {
          this.bonusStatus == "2"
            ? (this.switchBonus = false)
            : (this.switchBonus = true);
          this.disableSwitchBonus = false;
        }
      },
    },
  },
  mounted() {
    this.paystatus = this.$route.query.paystatus
      ? Number(this.$route.query.paystatus)
      : 0;
    localStorage.setItem("c_returnPayStatus", this.paystatus);
    window.addEventListener("storage", (e) => {
      if (e.key == "c_returnPayStatus") {
        //支付回调，显示支付结果
        this.paystatus = localStorage.getItem("c_returnPayStatus") || 0;
        setTimeout(() => {
          this.closePayPage();
          if(this.platformType == '3'){
             console.log(this.platformType,'平台类型1')
            this.returnPay()
          }
          console.log(this.platformType,'平台类型')
        }, 300);
      }
    });
    this.countryJSON = countryArr;
    //格式化国家
    Object.keys(countryArr).forEach((key) => {
      Object.keys(countryArr[key]).forEach((key2) => {
        this.countryArr.push({
          label:
            `${countryArr[key][key2].nameEN}` +
            " " +
            `${countryArr[key][key2].nameCN}`,
          value: countryArr[key][key2].code2,
        });
      });
    });
    this.countryArr.sort(
      (a, b) => a.label.charCodeAt(0) - b.label.charCodeAt(0)
    );
  },
  created() {
  //  this.getInfoFromKasikornbank()
    this.initAddress();
    this.getBonus();
    this.initPayTypes();
    this.initGetCartInfo();
    this.setting = localStorage.getItem("c_shopConfigJson")
      ? JSON.parse(localStorage.getItem("c_shopConfigJson"))
      : null;
    if (
      !this.setting ||
      !this.setting.customCode ||
      !this.setting.customCode.length
    )
      return;
  },
  methods: {
    returnPay(){
       console.log(this.platformType,'平台类型2')
      let params = {
        id: this.payPalId,
        sessionId: this.payPalSessionId
      }
      this.$apiCall("api.ShopifyOrder.returnPay", params, (r) => {
        if (r.ErrorCode == 9999) {
          console.log('ok')
        }
      });
    },
    			//开泰弹层关闭
			handleClosePay(){
					this.dialogVisibleKTPay = false
			},
			continuePay(){
        // console.log(JSON.parse(r.Data.Results[0].extra).code, 'a11414585');
				if (this.KTType == 'qr payment') {
            this.platformType = 14 
             this.orderPay()
				}else if(this.KTType == 'credit card'){
						this.platformType = 13
            this.orderPay()
				}else{
						this.platformType = 15
            this.orderPay()
				}
			},
    closePayPage() {
      //关闭支付新开页面
      if (this.newWin) {
        this.newWin.close();
      }
      localStorage.removeItem("c_returnPayStatus");
    },
    goBack() {
      if (this.paystatus == 2) {
        this.$router.push({ path: "ordersManage/3" });
      } else {
        this.$router.push({
          path: "ordersManage/2",
          query: { type: 2 },
        });
      }
    },
    initGetCartInfo() {
      this.$apiCall("api.Cart.getCartInfo", {}, (r) => {
        if (r.ErrorCode == 9999) {
          this.detailsData = r.Data.Results;
          this.detailsData.forEach((item) => {
            if (!item.stockInfo.inventory) {
              item.stockInfo.inventory = 999999999999999999999;
            }
            this.$set(item.stockInfo, "chooseInventory", item.quantity);
          });
          this.$root.$children[0].cartNum = this.detailsData.length;
        } else {
          this.$message.error(r.Message);
        }
      });
    },
    deleteFromCart(row) {
      let params = {
        stockList: [{ id: row.id }],
      };
      this.delLoading = true;
      this.$apiCall("api.Cart.deleteFromCart", params, (r) => {
        this.delLoading = false;
        if (r.ErrorCode == 9999) {
          this.initGetCartInfo();
          this.$message.success(r.Message);
        } else {
          this.$message.error(r.Message);
        }
      });
    },
    getMenu() {
      if (this.setting.header.activeMenu) {
        //有启用头部菜单
        this.setting.menu.forEach((item) => {
          if (item.id == this.setting.header.activeMenu) {
            this.headerMenu = item;
          }
        });
      }
    },
    initCountryList() {
      this.$apiCall("api.MallAddress.getList", {}, (r) => {
        if (r.ErrorCode == "9999") {
          this.countryList = r.Data.Results;
        } else {
          this.$message.error(r.Message);
        }
      });
    },
    initAddress() {
      this.$apiCall("api.MallAddress.getList", {}, (r) => {
        if (r.ErrorCode == "9999") {
          this.addressList = r.Data.Results;
          this.country = this.addressList.find(
            (item) => item.isDefault == "1"
          ).country;
        } else {
          this.$message.error(r.Message);
        }
      });
    },
    changeChoose(item, index) {
      this.country = item.country;
      this.addressList.forEach((item) => {
        item.isDefault = "2";
      });
      item.isDefault = "1";
      this.$apiCall("api.MallAddress.change", { ...item }, (r) => {
        if (r.ErrorCode == "9999") {
          this.initAddress();
          this.logisticArr = [];
          this.logistic = "";
          let stockInfo = {};
          this.multipleSelection.forEach((item) => {
            stockInfo[item.stockInfo.id] = item.stockInfo.chooseInventory;
          });
          if (Object.keys(stockInfo).length != 0) {
            this.getLogisticArr(stockInfo);
          }
          this.$message.success(r.Message);
        } else {
          this.$message.error(r.Message);
        }
      });
    },
    editAddress(item) {
      if (item) {
        this.activeAddressData = {
          visible: true,
          addressFrom: item,
          countryList: this.countryArr,
        };
      } else {
        this.activeAddressData = {
          visible: true,
          addressFrom: {},
          countryList: this.countryArr,
        };
      }
    },
    deleteAddress(item, index) {
      this.delLoading = true;
      this.$apiCall("api.MallAddress.delete", { id: Number(item.id) }, (r) => {
        if (r.ErrorCode == "9999") {
          this.delLoading = false;
          this.addressList.splice(index, 1);
          this.$message.success(r.Message);
        } else {
          this.$message.error(r.Message);
        }
      });
    },
    closeDialogAddress(bool) {
      if (bool) {
        this.initAddress();
      }
    },
    getBonus() {
      this.$apiCall("api.Invoice.getBonus", {}, (r) => {
        if (r.ErrorCode == "9999") {
          this.bonus = Number(r.Data.Results.bonus).toFixed(2);
          this.bonusStatus = r.Data.Results.bonusStatus;
          this.bonusStatus != "1"
            ? (this.switchBonus = false)
            : (this.switchBonus = true);
        } else {
          this.$message.error(r.Message);
        }
      });
    },
    changSwitchBonus() {
      this.platformType = "";
      if (this.bonusStatus == "2") {
        this.switchBonus = false;
      }
    },
    changePlatform(accountType) {
      this.platformType = accountType;
      if (accountType == 13) {
					this.dialogVisibleKTPay = true
			}
    },
    confirmDiscount() {
      // api.ShopifyOrder.getCoupon
    },
    selectable(row, index) {
      if (
        row.stockInfo.inventory <= 0 ||
        !row.stockInfo.inventory ||
        row.productInfo.status != "1"
      ) {
        return false;
      } else {
        return true;
      }
    },
    handleSelectionChange(val) {
      let stockInfo = {};
      this.subtotal = 0;
      this.multipleSelection = val;
      if (val.length) {
        this.multipleSelection.forEach((item) => {
          this.subtotal += Number(
            item.stockInfo.price * item.stockInfo.chooseInventory
          );
          //   运费逻辑
          stockInfo[item.stockInfo.id] = item.stockInfo.chooseInventory;
          //   运费逻辑
        });
        this.getLogisticArr(stockInfo);
        this.subtotal = Number(this.subtotal).toFixed(2);
        this.sum = Number(this.subtotal) + Number(this.freight);
        this.sum = Number(this.sum).toFixed(2);
      } else {
        this.subtotal = 0;
        this.sum = Number(this.subtotal) + Number(this.freight);
        this.sum = Number(this.sum).toFixed(2);
        this.logisticArr = [];
        this.logistic = "";
      }
    },
    logisticChange() {
      this.freight = this.logisticArr.find(
        (item) => item.id == this.logistic
      ).fee;
      this.sum = Number(this.subtotal) + Number(this.freight);
      this.sum = Number(this.sum).toFixed(2);
    },
    getLogisticArr(stockInfo) {
      let params = {
        country: this.country,
        stockList: stockInfo,
      };
      this.logLoading = true;
      this.$apiCall("api.AreaShipping.getShippingByStockList", params, (r) => {
        if (r.ErrorCode == "9999") {
          this.logLoading = false;
          if (r.Data.Results.length) {
            this.logisticArr = r.Data.Results;
            this.logError = "";
          } else {
            this.logError = r.Data.Results.msg;
          }
        } else {
          this.$message.error(r.Message);
        }
      });
    },
    switchHandleChange() {
      this.subtotal = 0;
      let stockInfo = {};
      if (this.multipleSelection.length) {
        this.multipleSelection.forEach((item) => {
          this.subtotal += Number(
            item.stockInfo.price * item.stockInfo.chooseInventory
          );
          //   运费逻辑
          stockInfo[item.stockInfo.id] = item.stockInfo.chooseInventory;
          //   运费逻辑
        });
        this.getLogisticArr(stockInfo);
        this.subtotal = Number(this.subtotal).toFixed(2);
        this.sum = Number(this.subtotal) + Number(this.freight);
        this.sum = Number(this.sum).toFixed(2);
      } else {
        this.subtotal = 0;
        this.sum = Number(this.subtotal) + Number(this.freight);
        this.sum = Number(this.sum).toFixed(2);
        this.logisticArr = [];
        this.logistic = "";
      }
    },
    initPayTypes() {
      this.$apiCall("api.AccountPayment.getPaymentAccounts", {}, (r) => {
        if (r.ErrorCode == "9999") {
          this.payTypes = [];
          r.Data.Results.forEach((item) => {
            item.icon = require("@/assets/pay/" +
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
              this.payTypes.push(item);
            }
          });
        } else {
          this.$message.error(r.Message);
        }
      });
    },

    orderPay() {
      if (!this.multipleSelection.length) {
        this.$message.error("Please select the goods first!");
        return;
      }
      if (this.logistic == "") {
        this.$message.error("Please choose the logistics channel");
        return;
      }
      if (this.switchBonus == false && this.platformType == "") {
        this.$message.error("Please select payment method");
        return;
      }
      let type = "";
      type = this.platformType;
      let paymentId = "";
      if (
        this.platformType &&
        !Number(this.platformType) &&
        this.platformType.indexOf("underline") != -1
      ) {
        //线下支付
        paymentId = this.platformType.substring(9);
        type = 12;
      } else {
        type = Number(this.platformType);
      }
      if (this.switchBonus) {
        type = 6;
      }
      switch (type) {
        case 1:
          //stripe
          this.pay(type);
          break;
        case 2:
          //ebanx
          this.pay(type);
          break;
        case 3:
          //paypal
          this.pay(type);
          break;
        case 4:
          //checkout
          this.dialogCheckOut.isShow = true;
          break;
        case 6:
          this.pay(type);
          break;
        case 13:
          this.pay(type);
          break;
          case 14:
          this.pay(type);
          break;
          case 15:
          this.pay(type);
          break;
        case 10:
          //dlocal
          this.dialogDlocal.isShow = true;
          this.dialogDlocal.invoiceId = this.payparams.id;
          break;
        case 12:
          // offline
          this.dialogUnderline.isShow = true;
          this.dialogUnderline.paymentId = paymentId;
          let item = this.payTypes.find((item) => item.id == paymentId);
          this.dialogUnderline.params = item.params
            ? JSON.parse(item.params)
            : "";
          this.dialogUnderline.payAmount = 0;
          break;
        default:
          //bonus
          break;
      }
    },
    			getInfoFromKasikornbank() {
				this.$showLoading();
				this.$apiCall("api.AccountPayment.getKaiTaiPayInfo", {}, (r) => {
					this.$hideLoading();
					if (r.ErrorCode == "9999") {
						this.KasikornbankInfo =  r.Data.Results
					} else {
						this.$elementMessage(r.Message, "error");
					}
				})
			},
    pay(type) {
      console.log(type , 'sadasdasdastype');
      let stockInfo = {};
      this.multipleSelection.forEach((item) => {
        stockInfo[item.stockInfo.id] = item.stockInfo.chooseInventory;
      });
      let params = {
        success_url: window.location.origin + "/shoppingCart?paystatus=2",
        cancel_url: window.location.origin + "/shoppingCart?paystatus=3",
        stockList: stockInfo,
        addressId: this.addressList.find((item) => item.isDefault == "1").id,
        shippingId: this.logistic,
        platformType: type,
      };
      this.$apiCall("api.ShopifyOrder.generateVendorShopOrder", params, (r) => {
        if (r.ErrorCode == "9999") {
          if (type == 6) {
            this.paystatus = 2;
          } else if (type == 1) {
            const data = r.Data.Results;
            let stripe = Stripe(data.pk);
            stripe.redirectToCheckout({
              sessionId: data.sessionId,
            });
            this.paystatus = 1;
          } else if (type == 2) {
            this.newWin = window.open(
              (this.$root.$children[0].baseUrl == "/my" ? "/my" : "") +
                "/blank.html",
              "pay"
            );
            this.newWin.location = r.Data.Results.url;
            this.paystatus = 1;
          } else if (type == 3) {
            this.newWin = window.open(
              (this.$root.$children[0].baseUrl == "/my" ? "/my" : "") +
                "/blank.html",
              "pay"
            );
            this.newWin.location = r.Data.Results.url;
            this.paystatus = 1;
            this.payPalId = r.Data.Results.id
            this.payPalSessionId = r.Data.Results.sessionId
          }else if(type == 13) {
                this.KasikornbankPay('','card', 13, r.Data.Results.id)
          }else if(type == 14){
                let sessionId = r.Data.Results.sessionId
								this.KasikornbankPay(sessionId, 'qr', 14,r.Data.Results.id)
          }else if(type == 15){
                this.KasikornbankPay('','debit', 15, r.Data.Results.id)
          }
        } else {
          this.$message.error(r.Message);
          // this.closePayPage();
        }
      });
    },
    KasikornbankPay(seId, codeType, formType, id) {
				// Todo 这块跟后端协商。。。action的
        // let id = r.Data.Results.id;
        let success_url = window.location.origin + '/orderPay?paystatus=2&payType=13'
        let apiUserId = localStorage.getItem("c_apiUserId")?localStorage.getItem("c_apiUserId"):"";
				let url = `https://sandboxapi.myourmall.com/kaitaiCheckout.php?id=${id}&code=${this.coupon}&apiUserId=${apiUserId}&platformType=${formType}`
				if(Object.keys(this.KasikornbankInfo).length && this.shopName !== ''){
								let obj = {
									sessionId:seId,
									action_url: url,
                  success_url: success_url,
									src: 'https://dev-kpaymentgateway.kasikornbank.com/ui/v2/kpayment.min.js',
									dataApikey: this.KasikornbankInfo.publicKey,
									dataAmount:this.sum,
									dataCurrency: 'THB',
									dataPaymentMethods: codeType || 'card',
									dataName: 'this.shopName',
									merchantId_Installment: this.KasikornbankInfo.merchantId_Installment,
									merchantId_FullPayment: this.KasikornbankInfo.merchantId_FullPayment,
									dataSmartpayId:	this.KasikornbankInfo.smartpayId,
									terminalId_Installment: this.KasikornbankInfo.terminalId_Installment,
									terminalId_FullPayment: this.KasikornbankInfo.terminalId_FullPayment,

								}
								 let htmlObj = JSON.stringify(obj)
								// sessionStorage.setItem('payTypeKT', 13)
							//跳转新页面-做支付
								this.paystatus = 1;
								sessionStorage.setItem('html', htmlObj)
							 	window.open(`./payment.html`, '_blank')
								 window.close();

				} else {
					this.$elementMessage('请稍后重试～', "error");
				}
			},
    submitUnderline(account, imageUrl) {
      this.dialogUnderline.loading = true;
      let stockInfo = {};
      this.multipleSelection.forEach((item) => {
        stockInfo[item.stockInfo.id] = item.stockInfo.chooseInventory;
      });
      let params = {
        code: 0,
        stockList: stockInfo,
        shippingId: this.logistic,
        addressId: this.addressList.find((item) => item.isDefault == "1").id,
        platformType: 12,
        accountPayment: account,
        voucherUrl: imageUrl,
        paymentId: this.dialogUnderline.paymentId,
      };
      this.$apiCall("api.ShopifyOrder.generateVendorShopOrder", params, (r) => {
        this.dialogUnderline.loading = false;
        this.dialogUnderline.isShow = false;
        if (r.ErrorCode == "9999") {
          this.paystatus = 1;
          let id = r.Data.Results.id
          this.payReturn(id)
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    payReturn(id){
      this.$apiCall("api.ShopifyOrder.returnPay", {id:id}, (r) => {
        if (r.ErrorCode == "9999") {
          this.paystatus = 2;
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
      let stockInfo = {};
      this.multipleSelection.forEach((item) => {
        stockInfo[item.stockInfo.id] = item.stockInfo.chooseInventory;
      });
      let params2 = {
        code: 0,
        stockList: stockInfo,
        shippingId: this.logistic,
        addressId: this.addressList.find((item) => item.isDefault == "1").id,
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
      this.$apiCall(
        "api.ShopifyOrder.generateVendorShopOrder",
        params2,
        (r) => {
          this.dialogDlocal.loading = false;
          this.dialogDlocal.isShow = false;
          if (r.ErrorCode == "9999" && r.Data.Results.url) {
            this.newWin.location = r.Data.Results.url;
            this.paystatus = 2;
          } else {
            this.$elementMessage(
              r.ErrorCode == "9999" ? "fail" : r.Message,
              "error"
            );
            this.newWin.close();
          }
        }
      );
    },
    payCheckOut(token) {
      if (this.dialogCheckOut.loading) {
        return;
      }
      this.dialogCheckOut.loading = true;
      this.$Burying({
        object: "9003",
        objectId: 4,
      });
      let stockInfo = {};
      this.multipleSelection.forEach((item) => {
        stockInfo[item.stockInfo.id] = item.stockInfo.chooseInventory;
      });
      let params = {
        stockList: stockInfo,
        shippingId: this.logistic,
        addressId: this.addressList.find((item) => item.isDefault == "1").id,
        code: this.coupon,
        platformType: 4,
        token,
      };
      this.$apiCall("api.ShopifyOrder.generateVendorShopOrder", params, (r) => {
        this.dialogCheckOut.loading = false;
        this.dialogCheckOut.isShow = false;
        if (r.ErrorCode == "9999" && r.Data.Results.url) {
          this.paystatus = 2;
        } else {
          this.$elementMessage(
            r.ErrorCode == "9999" ? "fail" : r.Message,
            "error"
          );
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pay-status-body {
  border: 1px solid #dfdfdf;
  background: #fff;
  text-align: center;
  padding: 30px;
  .d-flex {
    justify-content: center;
  }
  .tx-bold {
    margin-left: 10px;
    height: 60px;
    font-size: 30px;
    font-weight: 600;
    color: #040404;
    line-height: 60px;
  }
  p {
    color: #b2b2b2;
    margin-top: 20px;
    margin-bottom: 80px;
    font-size: 20px;
  }
  .el-button--primary {
    background: #4b9bfb;
    border-color: #4b9bfb;
  }
  .el-button--primary.is-plain {
    background: #fff;
    color: #4b9bfb;
    border-color: #ddd;
  }
  .el-button--primary.is-plain:hover,
  .el-button--primary.is-plain:focus,
  .el-button--primary.is-plain:active {
    border-color: #4b9bfb;
  }
}
	.cell-flex{
		display: flex;
		justify-content: center;
		padding-top: 50px;
		padding-bottom: 50px;
	}
.disabled {
  width: 170px;
  height: 80px;
  cursor: not-allowed;
  opacity: 0.1;
}
.imgRow {
  width: 100%;
  display: flex;
  align-items: center;
  .img {
    position: relative;
    width: 170px;
    height: 80px;
    border: 1px dashed #dfdfdf;
    margin: 20px 20px 0 0;
    cursor: pointer;
    img {
      width: 99%;
      height: 99%;
    }
    .active-type {
      width: 30px;
      height: 30px;
      position: absolute;
      bottom: -5px;
      right: -5px;
    }
  }
}
.pay-submit {
  min-width: 1300px;
  position: fixed;
  bottom: 0;
  padding: 20px;
  text-align: right;
  // width: 100%;
  background: #fff;
  z-index: 9;
  border: 1px solid #dfdfdf;
  .left {
    margin-right: 50px;
    font-size: 26px;
    color: #6d6d6d;
    span {
      color: #262626;
    }
  }
  .el-button {
    background-color: #4b9bfb;
    border-color: #4b9bfb;
  }
}
.font_bold {
  font-weight: 500;
}
.pay_method {
  padding: 20px;
  font-size: 20px;
}
.bonus {
  font-size: 20px;
  height: 80px;
  line-height: 80px;
  background: #f3f9ff;
  display: flex;
  align-items: center;
  padding: 0 20px;
  cursor: pointer;
}
.other {
  padding: 20px;
  font-size: 20px;
}
.d-flex {
  display: flex;
}
.d-flex-between {
  font-size: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.mr-l-30 {
  margin-left: 30px;
}
.zIndex {
  z-index: 9999;
}
.default {
  font-size: 24px;
  position: absolute;
  right: 5px;
  bottom: 0;
  color: #5c6ac4;
}
.active {
  border: 1px solid #5c6ac4;
  background-color: #cccee2;
}
.addEdit {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5c6ac4;
  cursor: pointer;
}
.title_card {
  font-size: 14px;
  font-weight: 500;
  padding: 5px 0;
}
.mutiple {
  display: -webkit-box; /*重点，不能用block等其他，将对象作为弹性伸缩盒子模型显示*/
  -webkit-box-orient: vertical; /*从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）*/
  -webkit-line-clamp: 3; /*行数，超出三行隐藏且多余的用省略号表示...*/
  line-clamp: 3;
  word-break: break-all;
  overflow: hidden;
  max-width: 100%;
}
.text-danger {
  color: #f56c6c;
}
.text-white {
  color: #fff;
}
.footer_card {
  padding-left: 20px;
  z-index: 999;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 5px;
}
.card {
  cursor: pointer;
  height: 200px;
  display: flex;
  flex-direction: column;
  ::v-deep .el-card__body {
    padding: 0 !important;
  }
}
.main_card {
  height: 160px;
  padding: 10px 20px;
}
.swiperBox {
  position: relative;
  height: 200px;
  max-width: 1100px;
  margin: 0 auto;
}
.swiper-button-next {
  position: absolute;
  top: 50%;
  right: -80px;
  transform: translate(0, -50%);
}
.swiper-button-prev {
  position: absolute;
  top: 50%;
  left: -80px;
  transform: translate(0, -50%);
}

.cart {
  height: 100%;
  width: 100%;
}
.main {
  margin: 0 auto;
  max-width: 1300px;
}
.address_box {
  padding: 30px 0px;
}
.title {
  font-size: 20px;
  line-height: 22px;
  padding: 15px 5px;
  font-weight: 500;
}
.title_tips {
  font-size: 14px;
  line-height: 18px;
  color: #606266;
}

.m-l-20 {
  margin-left: 20px;
}
.details_box {
  padding: 20px 5px;
}
.detail_title {
  font-size: 14px;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
}
.font {
  font-weight: 500;
  font-size: 14px;
}
.text-blue {
  color: #5997d6;
}
.text-muted {
  color: #99a0b2;
}
</style>

