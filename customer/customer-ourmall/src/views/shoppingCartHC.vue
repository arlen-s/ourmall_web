<template>
  <div>
    <div v-if="paystatus > 0" class="pay-status-body">
      <div v-if="paystatus == 1">
        <div class="d-flex">
          <img src="@/assets/pay/payStatus1.png" height="30" />
          <span class="tx-bold">{{$t('Waiting for the payment result to be returned.')}}</span>
        </div>
        <p>{{$t('You may need to wait a little while')}}</p>
        <el-button type="primary" plain @click="goBack">{{$t('View order')}}</el-button>
      </div>
      <div v-if="paystatus == 2">
        <div class="d-flex">
          <img src="@/assets/pay/payStatus2.png" height="30" />
          <span class="tx-bold">{{$t('Payment successful')}}</span>
        </div>
        <p>{{$t('You have successfully completed your order.')}}</p>
        <el-button type="primary" plain @click="goBack">{{$t('View order')}}</el-button>
      </div>
      <div v-if="paystatus == 3">
        <div class="d-flex">
          <img src="@/assets/pay/payStatus3.png" height="30" />
          <span class="tx-bold">{{$t('Payment failed')}}</span>
        </div>
        <p>{{$t("Sorry, we can't complete the payment.")}}</p>
        <div class="d-flex">
          <!-- <el-button type="primary" @click="orderPay('repay')"
            >Pay again</el-button
          >-->
          <el-button type="primary" plain @click="goBack">{{$t('View order')}}</el-button>
        </div>
      </div>
    </div>
    <div v-else class="cart">
      <!-- Header -->
      <template v-if="code && code.header && code.header.length > 0">
        <div v-for="(item, index) in code.header" :key="index" v-html="item"></div>
      </template>
      <div style="position: relative; height: 120px">
        <DHeader :data="(setting && setting.header) || ''" :headerMenu="headerMenu" />
      </div>
      <div class="main" style="margin-top:40px">
        <div style="height:40px">
          <el-radio v-model="orderType" label="1">{{$t('Wholesale order')}}</el-radio>
          <el-radio v-model="orderType" label="2">{{$t('offline order')}}</el-radio>
          <el-radio v-model="orderType" label="3">{{$t('pre-order item inventory')}}</el-radio>
        </div>
        <div class="address_box" v-if="orderType==1">
          <div class="title mr-l-30">{{$t('Shipping Address')}}</div>
          <div class="swiperBox">
            <div class="swiper-button-next">
              <el-button icon="el-icon-arrow-right" circle></el-button>
            </div>
            <div>
              <swiper :options="swiperOptions">
                <swiper-slide v-for="(item, index) in addressList" :key="index">
                  <el-card class="card" :class="{ active: item.isDefault == '1' }">
                    <div class="main_card" @click="changeChoose(item, index)">
                      <div class="title_card">
                        <span>{{ item.firstName }}</span>
                        <span style="margin-left: 5px">
                          {{
                          item.lastName
                          }}
                        </span>
                      </div>
                      <div class="title_card">{{ item.phone }}</div>
                      <div class="mutiple title_card">{{ item.address1 }}</div>
                    </div>
                    <div class="footer_card">
                      <el-button type="text" @click.native="editAddress(item)">{{$t('Edit')}}</el-button>
                      <el-button
                        type="text"
                        class="text-danger"
                        @click.native="deleteAddress(item, index)"
                        >{{$t('Delete')}}</el-button
                      >
                    </div>
                    <span v-if="item.isDefault == '1'" class="default">
                      <i class="el-icon-circle-check"></i>
                    </span>
                  </el-card>
                </swiper-slide>
                <swiper-slide>
                  <el-card class="card addEdit" @click.native="editAddress()">
                    <el-button
                      icon="el-icon-plus"
                      type="text"
                      class="text-white"
                      @click.native="editAddress()"
                      >{{$t('Add New Address')}}</el-button
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
              {{$t('Product Details')}}
              <span class="title_tips m-l-20"
                >({{$t('Please check the purchase products')}})</span
              >
            </div>
            <div>
              <el-table
                :data="detailsData"
                @selection-change="handleSelectionChange"
                 ref="multipleTable"
              >
                <el-table-column type="selection" :selectable="selectable" width="55"></el-table-column>
                <el-table-column prop="date" :label="$t('Check All')" align="center">
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
                <el-table-column prop="name" :label="$t('Product')">
                  <template slot-scope="scope">
                    <div>
                      <div
                        class="detail_title text-blue font"
                        :title="scope.row.name"
                      >{{ scope.row.productInfo.name }}</div>
                      <div class="font">
                        {{
                        scope.row.stockInfo.propertyValue ? scope.row.stockInfo.propertyValue.replace(
                        /\|\|/g,
                        ","
                        ) : ''
                        }}
                      </div>
                      <div class="detail_title text-muted font">{{ scope.row.stockInfo.sku }}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="address" :label="$t('Price')" align="center">
                  <template slot-scope="scope">
                    <div
                      class="title"
                    >{{$store.state.country.symbol}}{{ scope.row.stockInfo.price }}</div>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('Quantity')" align="center">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="scope.row.stockInfo.inventory <= 0"
                      size="mini"
                      v-model="scope.row.stockInfo.chooseInventory"
                      :min="1"
                      :max="Number(scope.row.stockInfo.inventory)"
                      @change="switchHandleChange(scope.row.stockInfo.chooseInventory)"
                    ></el-input-number>
                    <div
                      class="text-danger"
                      v-if="scope.row.stockInfo.inventory <= 0"
                    >{{$t('out of stock')}}</div>
                    <div
                      class="text-danger"
                      v-if="
                        scope.row.stockInfo.chooseInventory >=
                          scope.row.stockInfo.inventory &&
                        scope.row.stockInfo.inventory > 0
                      "
                    >
                      {{$t('Inventory')}}: {{ scope.row.stockInfo.inventory }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('Weight')" align="center">
                  <template slot-scope="scope">
                    <div class="title">{{ scope.row.stockInfo.weight || 0 }}g</div>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('warehouse')" align="center">
                  <template slot-scope="scope">
                    <div
                      class="title"
                    >{{ scope.row.warehouseInfo? scope.row.warehouseInfo.name : '--' }}</div>
                  </template>
                </el-table-column>
                <el-table-column :label="`${$t('Subtotal')}(vat)`" align="center">
                  <template slot-scope="scope">
                    <div class="title" v-if="orderType == 1">
                      {{$store.state.country.symbol}}{{
                        (  Number(
                                scope.row.stockInfo.price *
                                  scope.row.stockInfo.chooseInventory
                              )  +   Number(
                                scope.row.stockInfo.price *
                                  scope.row.stockInfo.chooseInventory*(vatValue/100)
                              )).toFixed(2) 
                      }}
                    </div>
                    <div class="title" v-else>
                      {{$store.state.country.symbol}}{{
                   (  Number(
                          scope.row.stockInfo.price *
                            scope.row.stockInfo.chooseInventory
                        )  +   Number(
                          scope.row.warehouseInfo.countryCode== 'DE'? Number(
                          scope.row.stockInfo.price *
                            scope.row.stockInfo.chooseInventory*(vatValue/100)
                        ) : 0
                        )).toFixed(2) 
                      }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('Operate')" align="center">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      icon="el-icon-delete"
                      @click="deleteFromCart(scope.row)"
                      >{{$t('Delete')}}</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-card>
        <el-card style="margin-top: 20px; padding-bottom: 100px" shadow="never">
          <div class="desc" v-if="orderType==2">
            <strong>
              <span>{{$t('Delivery Address')}}:</span>
              <span>{{pickAddress}}</span>
            </strong>
              
            </div>
          <div class="d-flex-between">
            <div v-if="orderType == 1">
              <span>{{$t('Shipping Method')}} :</span>
              <el-select
                @change="logisticChange"
                style="margin-left: 20px"
                v-model="logistic"
                placeholder="Please choose"
                :disabled="isMailFree == 1"
              >
                <el-option
                  v-for="item in logisticArr"
                  :key="item.id"
                  :label="item.nameDisplay? item.nameDisplay : item.name"
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
            <div v-else></div>
            <div>
              <span
                >{{$t('Subtotal')}}（{{$store.state.country.symbol}}）:
                <span class="font_bold">{{  getZw((Math.ceil(subtotal * 100) / 100) - (freight*arrLength)) }}</span></span
              >
              <span style="margin-left: 20px"
                >{{$t('Freight（')}}{{$store.state.country.symbol}}）:
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
              >{{$t('Bonus')}}:<span class="font_bold"> ({{$store.state.country.symbol}} {{ bonus }})</span></span
            >
            <el-tooltip class="item" effect="dark" :content="$t('The supplier has opened a credit limit for you. When your account balance is insufficient, you can deduct the credit limit')" placement="top">
      						<i class="el-icon-question" style="color:red;line-height:80px;margin-right:5px"></i>
    				</el-tooltip>
								
						<span style="margin-right: 30px;">
									{{$t('Credits')}}:
							<span class="tx-bold"> ({{$store.state.country.symbol}} {{credits}})</span>
						</span>
            <el-switch
              :disabled="disableSwitchBonus && bonusStatus == '2'"
              @change="changSwitchBonus"
              v-model="switchBonus"
              active-color="#13ce66"
            >
            </el-switch>
            <el-tooltip class="item" effect="dark" :content="$t('After the combination payment is enabled, the account balance will be deducted first, and the rest will be paid by other selected methods')" placement="top">
      						<i class="el-icon-question" style="color:red;line-height:80px;margin:0 5px 0 70px"></i>
    				</el-tooltip>
								
						<span style="margin-right: 30px;">
									{{$t('Combination payment')}}
						</span>
            <el-switch
            :disabled="switchBonus"
              @change="changSwitchPayment"
              v-model="switchPayment"
              active-color="#13ce66"
            >
            </el-switch>  
            <el-input v-model="bonusPayAmount" :disabled="!switchPayment" style="width:120px;margin-left:20px" :placeholder="$t('Please enter the balance to be used')"></el-input>
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                :content="$t('Rules: The input amount should be less than the order amount, and only two decimal places')">
                <i class="el-icon-info" slot="reference"></i>   
              </el-popover>
                 
          </div>
          <div class="pay_method">
            <p>{{$t('Payment method')}}:</p>
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
            {{$t('Amount due (including freight)')}}（{{$store.state.country.symbol}}）:
            <span class="font_bold"> {{ sum }} </span>
          </span>
          <el-button type="primary" :disabled="platformType == '13'" @click="orderPay()"
            >{{$t('Submit orders')}}</el-button
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
      <div>

      </div>
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
              {{$t('Cancel')}}
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
// import STable from '@/components/table'
export default {
  components: {
    DHeader,
    // DFooter,
    DialogAddress,
    Underline,
    Dlocal,
    Checkout,
    // STable
  },
  data() {
    return {
      payPalSessionId:'',
      payPalId:"",
      delLoading: false,
      orderType: '1',
      newWin: null,
      paystatus: 0,
      isMailFree: 2,
      pickAddress: '',
      addressTypeId: '',
      defVat: 0,
      bonusPayAmount: '',
      firstBox: true,
			credits: 0,
      KTType: 'credit&debit card',
      KTpayList: [
        {
          name: 'credit&debit card',
          id: 13,

        },
        {
          name: 'qr payment',
          id: 14
        },
        // {
        //   name: 'debit card',
        //   id: 15
        // }
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
      switchPayment: false,
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
      tableShopData: [ //改版table(暂时搁置)
        {
          id: '03',
          storeHouse: '苏州',
          item: [
            {
              id: 11,
              image: '',
              shopName: '商品名称',
              sku: '1122Sku',
              price: '10.00',
              sum: 0,
              Subtotal: 0,

            },
            {
              id: 12,
              image: '',
              shopName: '商品名称2W',
              sku: 'aa1122Sku',
              price: '10.00',
              sum: 0,
              Subtotal: 0,

            }

          ]
        }, {
          id: '04',
          storeHouse: '台州',
          item: [
            {
              id: 17,
              image: '',
              shopName: '商品名称',
              sku: '1122Sku',
              price: '10.00',
              sum: 0,
              Subtotal: 0,

            }
          ]
        }, {
          id: '05',
          storeHouse: '常州',
          item: [
            {
              id: 14,
              image: '',
              shopName: '商品名称',
              sku: '1122Sku',
              price: '10.00',
              sum: 0,
              Subtotal: 0,

            }
          ]
        }],
      groupColumn: {
        align: 'center',
      },
      columns: [
        {
          type: 'selection',
          width: 60,
        },
        {
          align: 'left',
          minWidth: 200,
          prop: 'productInfo',
          label: '图片',
        },
        {
          prop: 'orderAmount',
          label: '商品',
        },
        {
          prop: 'address',
          label: '单价',
        },
        {
          prop: 'time',
          label: '数量',
        },
        {
          prop: 'status',
          label: '小计',
        },
        {
          width: 100,
          prop: 'action',
          label: '操作',
        },
      ],
      multipleSelection: [],
      vatValue: 0, 
      perList:[],
      vatObj: [],
      arrLength: 0,
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
    orderType(val){      
        
        this.multipleSelection = []
        this.sum = 0
        this.freight = 0
        this.logistic = ''
        this.$refs.multipleTable.clearSelection();
        if (val == 2) {
          this.country = ''
       let filterVat = this.perList.filter(item=>{
        if(item.code == this.country){
          return item
        } 
       })
       this.vatValue = filterVat.length == 0 ? 0 : Number(filterVat[0].value)          
            this.sum =0
            this.freight = 0
            this.vatObj = filterVat     
        }else{
          if ( this.addressList.length >0) {
                this.country = this.addressList.find(
            (item) => item.isDefault == "1"
          ).country;
            let filterVat = this.perList.filter(item=>{
            if(item.code == this.country){
              return item
            } 
          })
          this.vatValue = filterVat.length == 0 ? 0 : Number(filterVat[0].value)    
          this.vatObj = filterVat              
        }                
      }
      this.initGetCartInfo()
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
        this.switchPayment = false
        console.log(this.switchBonus, 'this.switchBonus');
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
            this.returnPay()
          }
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
   this.getInfoFromKasikornbank()
    this.initAddress();
    this.getBonus();
    this.initPayTypes();
    this.initGetCartInfo();
    this.getVat()
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
    getVat () {
      this.$apiCall(
        "api.Product.getVatConfig", {}, (r) => {
          if (r.ErrorCode == 9999) {
            if (r.Data.Results.vatList != null) {
              let newArr = r.Data.Results.vatList.filter(item => {
                if (item.code == this.country) {
                  return item
                }
              })
              this.defVat = newArr.length == 0 ? 0 : Number(newArr[0].value)
              this.vatValue = newArr.length == 0 ? 0 : Number(newArr[0].value)
              this.vatObj = newArr   
              this.perList = r.Data.Results.vatList
            }


          }
        })
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
				}else if(this.KTType == 'credit&debit card'){
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
          if (this.addressList.length> 0) {
            this.country = this.addressList.find(
            (item) => item.isDefault == "1"
          ).country;
           let filterVat = this.perList.filter(item=>{
              if(item.code == this.country){
                return item
              } 
            })
       this.vatValue = filterVat.length == 0 ? 0 : Number(filterVat[0].value)   
       this.vatObj = filterVat
          }

        this.switchHandleChange()             
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
     let filterVat = this.perList.filter(item=>{
        if(item.code == item.country){
          return item
        } 
       })
       this.vatValue = filterVat.length == 0 ? 0 : Number(filterVat[0].value) 
       this.vatObj = filterVat
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
            this.getLogisticArr(stockInfo, this.multipleSelection);
          }
          this.$message.success(r.Message);
        } else {
          this.$message.error(r.Message);
        }
      });
      this.switchHandleChange()
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
          this.bonusPayAmount = this.bonus
          this.credits = (Number(r.Data.Results.creditAmount) - Number(r.Data.Results.usedCreditAmount)).toFixed(2);
          this.bonusStatus = r.Data.Results.bonusStatus;
          this.bonusStatus != "1"
            ? (this.switchBonus = false)
            : (this.switchBonus = true);
        } else {
          this.$message.error(r.Message);
        }
      });
    },
    changSwitchBonus(v) {
      // this.platformType = "";
      if (this.bonusStatus == "2") {
        this.switchBonus = false;
      }
        // this.switchPayment = !v
			if ( this.switchBonus) {
					this.switchPayment = false
			}        
				if(this.bonus + this.credits < this.totalAllGoodsAndFreight){
					return;
				}else{
					if(this.platformType == 6){
						this.platformType = "";
						return;
					}
					this.platformType = 6;
				}        
    },
    changSwitchPayment(v){
      // this.switchBonus = !v
      this.platformType = "";
      if (this.bonusStatus == "2") {
        this.switchBonus = false;
      }
    if(this.bonus + this.credits < this.totalAllGoodsAndFreight){
        return;
      }else{
        if(this.platformType == 6){
          this.platformType = "";
          return;
        }
        this.platformType = 6;
      }      
    },
    changePlatform(accountType) {
      this.platformType = accountType;
      // if (accountType == 13) {
			// 		this.dialogVisibleKTPay = true
			// }
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
    getZw(val){
      let hePrice =  Math.ceil(val* 100) / 100
      return hePrice
    },
    handleSelectionChange(val) {
      let stockInfo = {};
      this.subtotal = 0;
      this.sum = 0;
      if (val.length> 0) {
          for (let b = 0; b < val.length; b++) {
              if (val[b].warehouseInfo.id != val[0].warehouseInfo.id) {
                this.$message.error('Please tick the products from the same warehouse')
                //  this.$refs.multipleTable.clearSelection();
                 this.$refs.multipleTable.toggleRowSelection(val[b]);
                    return  false
              }
          }
      }
      for (let i = 0; i < this.multipleSelection.length; i++) {
                for (let j = 0; j < val.length; j++) {
                  if (this.multipleSelection[i]?.warehouseInfo && val[j]?.warehouseInfo) {
                  if(this.multipleSelection[i].warehouseInfo.id != val[j].warehouseInfo.id){
                   this.$refs.multipleTable.toggleRowSelection(val[j]);
                    this.$message.error('Please tick the products from the same warehouse')
                    return  false
                       }
                  }else{
                    if(this.multipleSelection[i].stockWarehouseId != val[j].stockWarehouseId){
                      this.$refs.multipleTable.toggleRowSelection(val[j]);
                        this.$message.error('Please tick the products from the same warehouse')
                        return  false
                    }
                  }
          }
        }
      this.multipleSelection = val;
      this.arrLength = val.length;
      if (this.orderType == 2 || this.orderType == 3) {
        if (this.multipleSelection.length > 0) {
          this.country =  this.multipleSelection[0].warehouseInfo.countryCode
          let filterVat = this.perList.filter(item=>{
            if(item.code == this.country){
              return item
            } 
          })
          this.vatValue = filterVat.length == 0 ? 0 : Number(filterVat[0].value)        
          this.freight = 0  
          this.vatObj = filterVat         
        }

      }  
        console.log(this.vatObj, 'his.vatObj');    
      if (val.length) {
        
        this.multipleSelection.forEach((item) => {
          if (this.vatObj.length >0 ) {
                if (this.vatObj[0].type == 1) {
                  this.subtotal += Number(
                      item.stockInfo.price * item.stockInfo.chooseInventory
                    )+Number(
                      item.stockInfo.price * item.stockInfo.chooseInventory*(this.vatValue/100)
                    );
                }else{
                  let leftNum = (
                      ( Number(item.stockInfo.price) * Number(item.stockInfo.chooseInventory))  + Number(this.freight)
                    )
                  let rightNum = 
                      1 +(this.vatValue/100)                    
                    this.subtotal +=   Number(leftNum) * Number(rightNum);
                    console.log( this.subtotal, ' this.subtotal1094');
                }
          }else{
            this.subtotal += Number(
                      (item.stockInfo.price * item.stockInfo.chooseInventory)  + this.freight
                    )*1           
          }

          //   运费逻辑
          stockInfo[item.stockInfo.id] = item.stockInfo.chooseInventory;
          //   运费逻辑
        });
        this.getLogisticArr(stockInfo, val);
        this.subtotal = Math.ceil(this.subtotal * 100) / 100;
        console.log(this.subtotal, 'this.subtotal1111');
        if (this.orderType == 2 || this.orderType == 3) {
          this.sum = Math.ceil(this.subtotal * 100) / 100          
        }else{
          // console.log(115,);
          // this.sum = Number(this.subtotal) + Number(this.freight);
          this.sum =  Math.ceil(this.subtotal * 100) / 100;
        }        
        // this.sum =  Math.ceil(this.sum * 100) / 100;
      } else {
        this.subtotal = 0;
        // if (this.orderType == 2 || this.orderType == 3) {
        //   this.sum = Math.ceil(this.subtotal * 100) / 100          
        // }else{
        //   this.sum = Number(this.subtotal) + Number(this.freight);
        // }
        // this.sum =  Math.ceil(this.sum * 100) / 100;
        this.sum = 0
        this.freight = 0;
        this.logisticArr = [];
        this.logistic = "";
      }
      this.pickAddress = this.multipleSelection[0]?.warehouseInfo.address
      if (this.orderType == 2 || this.orderType == 3) {
          this.addressTypeId = this.multipleSelection[0]?.warehouseInfo.id  
      }else{
        this.addressTypeId = ''
      }
      
    },
    logisticChange() {
      this.subtotal = 0
      this.freight = this.logisticArr.find(
        (item) => item.id == this.logistic
      ).fee;
      if(this.multipleSelection.length >0){
        this.multipleSelection.forEach((item) => {
          if (this.vatObj.length >0 ) {
                if (this.vatObj[0].type == 1) {
                  this.subtotal += Number(
                      item.stockInfo.price * item.stockInfo.chooseInventory
                    )+Number(
                      item.stockInfo.price * item.stockInfo.chooseInventory*(this.vatValue/100)
                    );
                }else{
                  let leftNum = (
                      ( Number(item.stockInfo.price) * Number(item.stockInfo.chooseInventory))  + Number(this.freight)
                    )
                  let rightNum = 
                      1 +(this.vatValue/100)                    
                    this.subtotal +=   Number(leftNum) * Number(rightNum);
                }
          }else{
            let leftNum = (
                      ( Number(item.stockInfo.price) * Number(item.stockInfo.chooseInventory))  + Number(this.freight)
                    )                 
                    this.subtotal +=   Number(leftNum) * 1;            
          }
        }); 
      }
      console.log(this.subtotal, 'this.subtotal333');
        if (this.orderType == 2 || this.orderType == 3) {                                                                                   

          this.sum = Number(this.subtotal);      
          this.sum =  Math.ceil(this.sum * 100) / 100;    
        }else{
          if (this.vatObj.length >0 ) {
                if (this.vatObj[0].type == 1) {
                  this.sum = Number(this.subtotal) + Number(this.freight);
                   this.sum = Math.ceil(this.sum * 100) / 100;
                }else{                  
                  this.sum = Math.ceil(this.subtotal * 100) / 100;     
                 }
              }else{
                this.sum = Math.ceil(this.subtotal * 100) / 100;  
              }
          
        }   
                  
    },
    getLogisticArr(stockInfo, val) {
      console.log(val, 'stockInfo');
      let params = {
        country: this.country,
        stockList: stockInfo,
        warehouseId: val[0].warehouseInfo.id
      };
      this.logLoading = true;
      this.$apiCall("api.AreaShipping.getShippingByStockList", params, (r) => {
        if (r.ErrorCode == "9999") {
          this.logLoading = false;

          if (r.Data.Results.length) {
            this.logisticArr = r.Data.Results;
            this.logError = "";
            this.isMailFree = 2
          } else {
            this.logError = r.Data.Results.msg;
            this.isMailFree = 1
          }
          

        } else {
          this.$message.error(r.Message);
        }
      });
    },
    switchHandleChange(val) {
      this.subtotal = 0;
      let stockInfo = {};
      if (this.multipleSelection.length) {
        this.multipleSelection.forEach((item) => {
          item.quantity = val
          if (this.vatObj.length >0 ) {
                if (this.vatObj[0].type == 1) {
                   this.subtotal += Number(
                      item.stockInfo.price * item.stockInfo.chooseInventory
                    )+Number(
                      item.stockInfo.price * item.stockInfo.chooseInventory*(this.vatValue/100)
                    );
                }else{
                  let leftNum = (
                      ( Number(item.stockInfo.price) * Number(item.stockInfo.chooseInventory))  + Number(this.freight)
                    )
                  let rightNum = 
                      1 +(this.vatValue/100)    
                    this.subtotal +=   Number(leftNum) * Number(rightNum);              
                }
              }else{
                let leftNum = (
                      ( Number(item.stockInfo.price) * Number(item.stockInfo.chooseInventory))  + Number(this.freight)
                    ) 
                    this.subtotal +=   Number(leftNum) * 1;  
              }

          //   运费逻辑
          stockInfo[item.stockInfo.id] = item.stockInfo.chooseInventory;
        });
        this.getLogisticArr(stockInfo, this.multipleSelection);
          // console.log(this.subtotal, 'this.subtotalss46');
        if (this.orderType == 2 || this.orderType == 3) {
          this.sum = Math.ceil(this.subtotal * 100) / 100;          
        }else{
          if (this.vatObj.length >0 ) {
                if (this.vatObj[0].type == 1) {
                  this.sum = Number(this.subtotal) + Number(this.freight);
                   this.sum = Math.ceil(this.sum * 100) / 100;
                }else{
                  this.sum = Math.ceil(this.subtotal * 100) / 100;      
                 }
              }else{
                this.sum = Math.ceil(this.subtotal * 100) / 100;      
              }
        
        }          
      } else {
        this.subtotal = 0;
        if (this.orderType == 2 || this.orderType == 3) {
          this.sum =  Math.ceil(this.subtotal * 100) / 100
        }else{
          if (this.vatObj.length >0 ) {
                if (this.vatObj[0].type == 1) {
                  this.sum = Number(this.subtotal) + Number(this.freight);
                   this.sum = Math.ceil(this.sum * 100) / 100;
                }else{
                  this.sum = Math.ceil(this.subtotal * 100) / 100;
                 }
              }else{
                this.sum = Math.ceil(this.subtotal * 100) / 100;      
              }
        }          
        this.sum = Math.ceil(this.sum * 100) / 100;
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
      if (this.orderType == 1 && this.isMailFree == 2) {
        console.log(this.isMailFree, '352352352');
              if (this.logistic == "") {
        this.$message.error("Please choose the logistics channel");
        return;
      }
      }

      if (this.switchBonus == false && this.platformType == "") {
        this.$message.error("Please select payment method");
        return;
      }
      if (this.switchPayment) {
          if ( Number(this.bonusPayAmount) == 0||  Number(this.bonusPayAmount) < 0) {
            this.$message.error("Please enter a value greater than 0");
            return;             
          }
          if ( Number(this.bonusPayAmount) > this.bonus) {
                this.$message.error("Please enter a value less than the total amount of the order");
                return;             
          }          
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
      let stockInfo = {};
      this.multipleSelection.forEach((item) => {
        stockInfo[item.stockInfo.id] = item.stockInfo.chooseInventory;
      });
      let stockWareHouse =[]
      stockWareHouse[0] = {
          warehouseId:  this.multipleSelection[0].warehouseInfo?.id,
            shippingId:  this.logistic,
            stockWarehouseList: [],
            shippingType: this.orderType
      }
        stockWareHouse[0].stockWarehouseList =  this.multipleSelection.map((item)=>{
              let  temp =  {
                stockWarehouseId:  item.stockWarehouseId,
                quantity:  item.quantity,
                stockId:  item.stockId,
                }  
                return temp      
         })
      let params = {
        success_url: window.location.origin + "/shoppingCart?paystatus=2",
        cancel_url: window.location.origin + "/shoppingCart?paystatus=3",
        stockList: stockInfo,
        addressId: this.orderType == 2 || this.orderType == 3? '' : this.addressList.find((item) => item.isDefault == "1").id,
        shippingId: this.logistic,
        platformType: type,
        stockWarehouseList: stockWareHouse,
        isMixedPayment: this.switchPayment ? 1 : '',
        bonusPayAmount: this.switchPayment? this.bonusPayAmount : '0.00'
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
				let url = `https://sandboxapi.myourmall.com/kaitaiCheckout.php?id=${id}&apiUserId=${apiUserId}&platformType=${formType}`
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
      let stockWareHouse =[]
      stockWareHouse[0] = {
          warehouseId:  this.multipleSelection[0].warehouseInfo?.id,
            shippingId:  this.logistic,
            stockWarehouseList: [],
            shippingType: this.orderType
      }
        stockWareHouse[0].stockWarehouseList =  this.multipleSelection.map((item)=>{
              let  temp =  {
                stockWarehouseId:  item.stockWarehouseId,
                quantity:  item.quantity,
                stockId:  item.stockId,
                }  
                return temp      
         })
      let params = {
        code: 0,
        stockList: stockInfo,
        stockWarehouseList:stockWareHouse,
        shippingId: this.logistic,
        addressId: this.orderType == 2 || this.orderType == 3? '' : this.addressList.find((item) => item.isDefault == "1").id,
        platformType: 12,
        accountPayment: account,
        voucherUrl: imageUrl,
        paymentId: this.dialogUnderline.paymentId,
        isMixedPayment: this.switchPayment ? 1 : '',
        bonusPayAmount: this.switchPayment? this.bonusPayAmount : '0.00'
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
      let stockWareHouse =[]
      stockWareHouse[0] = {
          warehouseId:  this.multipleSelection[0].warehouseInfo?.id,
            shippingId:  this.logistic,
            stockWarehouseList: []
      }
        stockWareHouse[0].stockWarehouseList =  this.multipleSelection.map((item)=>{
              let  temp =  {
                stockWarehouseId:  item.stockWarehouseId,
                quantity:  item.quantity,
                stockId:  item.stockId,
                }  
                return temp      
         })
      let params2 = {
        code: 0,
        stockList: stockInfo,
        stockWarehouseList:stockWareHouse,
        shippingId: this.logistic,
        addressId: this.orderType == 2 || this.orderType == 3? '' : this.addressList.find((item) => item.isDefault == "1").id,
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
      let stockWareHouse =[]
      stockWareHouse[0] = {
          warehouseId:  this.multipleSelection[0].warehouseInfo?.id,
            shippingId:  this.logistic,
            stockWarehouseList: []
      }
        stockWareHouse[0].stockWarehouseList =  this.multipleSelection.map((item)=>{
              let  temp =  {
                stockWarehouseId:  item.stockWarehouseId,
                quantity:  item.quantity,
                stockId:  item.stockId,
                }  
                return temp      
         })
      let params = {
        stockList: stockInfo,
        stockWarehouseList:stockWareHouse,
        shippingId: this.logistic,
        addressId: this.orderType == 2 || this.orderType == 3? '' : this.addressList.find((item) => item.isDefault == "1").id,
        // code: this.coupon,暂时去除
        platformType: 4,
        token,
        isMixedPayment: this.switchPayment ? 1 : '',
        bonusPayAmount: this.switchPayment? this.bonusPayAmount : '0.00'
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
  .bold-title{
    font-size: 20px;
    line-height: 22px;
    margin: 35px 5px 15px 5px;
    font-weight: 500;
  }
  .desc{
    font-size: 14px;
    font-weight: 500px;
    padding: 20px;
    
  
  }
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
  max-width: 1300px;
  width: 100%;
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
  margin: 0 auto;
  padding: 0 80px;
}
.swiper-button-next {
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translate(0, -50%);
}
.swiper-button-prev {
  position: absolute;
  top: 50%;
  left: 0px;
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
<style scoped>
/* 壳子样式开始 */
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #fff !important;
}
::v-deep .el-table__body-wrapper .el-table__body tr > td {
  vertical-align: top !important;
}
::v-deep .el-table__body-wrapper .el-table__body tr > .el-table-column--selection::before {
  content: '';
  height: 40px;
  width: 100%;
  background-color: #ebeef5;
  position: absolute;
  top: 0;
  left: 0;
}
.head-box {
  padding: 20px;
}
.table_box {
  padding: 20px;
  background: #fff;
}
.cellbg {
  padding-top: 45px;
}
.cellbg::before {
  content: "";
  height: 40px;
  width: 100%;
  background-color: #ebeef5;
  position: absolute;
  top: 0;
  left: 0;
}
.orderInfo {
  padding: 10px;
  line-height: 20px; 
  position: absolute;
  left: 0;
  top: 0;
  right: -100%;
  z-index: 1;
  display: flex;
  align-items: center;
}
.orderDefault {
  padding: 10px;
  line-height: 20px;
  position: absolute;
  left: -500px;

  right: 0;
  z-index: 1;
}
.p-10 {
  padding: 10px !important;
}
.min-width-order {
  min-width: 500px;
}
.min-width-deal {
  min-width: 400px;
}
.min-width-shop {
  min-width: 300px;
}
.min-width-logistics {
  min-width: 150px;
}
.image-box {
  min-width: 70px;
  width: 70px;
  padding: 5px;
  padding-right: 10px;
}
.orderDefault {
  padding: 10px;
  line-height: 20px;
  position: absolute;
  left: -500px;
  top: 0;
  right: 0;
  z-index: 1;
}
/* 壳子样式结束 */
</style>

