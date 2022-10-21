<template>
	<div class="contentpanel transaction-page">
		<div class="pagetitle" ref="pageHeader">
			<div class="left">
				<div class="title">
					<i class="el-icon-s-finance"></i>
					<h2>Pay</h2>
				</div>
			</div>
			<div class="right">
			</div>
		</div>
		<div class="pagebody" v-loading="loading" ref="pagebody">
			<el-row :gutter="15" class="mg-b-20">
				<el-col :span="24">
					<div v-if="paystatus > 0" class="pay-status-body">
						<div v-if="paystatus == 1">
							<div class="d-flex">
								<img src="../../assets/pay/payStatus1.png" height="30"/>
								<span class="tx-bold">Waiting for the payment result to be returned.</span>
							</div>
							<p>You may need to wait a little while</p>
							<el-button type="primary" plain @click="goBack">View order</el-button>
						</div>
						<div v-if="paystatus == 2">
							<div class="d-flex">
								<img src="../../assets/pay/payStatus2.png" height="30"/>
								<span class="tx-bold">Payment successful</span>
							</div>
							<p>You have successfully completed your order.</p>
							<el-button type="primary" plain @click="goBack">View order</el-button>
						</div>
						<div v-if="paystatus == 3">
							<div class="d-flex">
								<img src="../../assets/pay/payStatus3.png" height="30"/>
								<span class="tx-bold">Payment failed</span>
							</div>
							<p>Sorry, we can't complete the payment. </p>
							<div class="d-flex">
								<el-button type="primary" @click="orderPay('repay')">Pay again</el-button>
								<el-button type="primary" plain @click="goBack">View order</el-button>
							</div>
						</div>
					</div>
					<div v-else class="pay-body">
						<div class="pay-item" v-for="item in items" :key="item.orderId">
							<div class="title d-flex" style="justify-content: space-between;">
								<span>
									Order {{item.codeName}}
								</span>
								<i class="el-icon-arrow-right"></i>
							</div>
							<div class="item-body">
								<div>
									<span class="tx-bold">Order No. : </span>
									{{item.orderId}}
								</div>
								<div>
									<span class="tx-bold">Receiving: </span>
									{{item.shippingJsonInfo && item.shippingJsonInfo.zip ? item.shippingJsonInfo.zip : '---'}}
									{{item.shippingJsonInfo && item.shippingJsonInfo.address1 ? item.shippingJsonInfo.address1 : '---'}}
									{{item.shippingJsonInfo && item.shippingJsonInfo.city ? item.shippingJsonInfo.city : '---'}}
									{{item.shippingJsonInfo && item.shippingJsonInfo.province ? item.shippingJsonInfo.province : '---'}}
									{{item.shippingJsonInfo && item.shippingJsonInfo.country ? item.shippingJsonInfo.country : '---'}}
								</div>
							</div>
							<el-table stripe style="width: 100%" ref="gridTable" :data="item.items" tooltip-effect="dark" :row-key="(row) => row.id">
								<el-table-column label="Product information">
									<template slot-scope="scope">
										<div class="d-flex">
											<img :src="scope.row.imgUrl" width="80" height="80" />
											<div class="mg-l-10">
												<p>{{scope.row.name}}</p>
												<!-- <p>{{scope.row.propertyValue}}</p> -->
											</div>
										</div>
									</template>
								</el-table-column>
								<el-table-column label="SKU " width="200">
									<template slot-scope="scope">
										<div>
											{{scope.row.vendorSku || '---'}}
										</div>
									</template>
								</el-table-column>
								<el-table-column label="Store price" width="150">
									<template slot-scope="scope">
										{{item.currency}} {{Number(scope.row.price).toFixed(2)}}
									</template>
								</el-table-column>
								<el-table-column label="Supply unit price" width="200">
									<template slot-scope="scope">
										<span >{{$store.state.country.symbol}} {{Number(scope.row.vendorPrice).toFixed(2)}}</span>
									</template>
								</el-table-column>
								<el-table-column label="Quantity" width="150">
									<template slot-scope="scope">
										{{scope.row.quantity}}
									</template>
								</el-table-column>
								<el-table-column :label="`Subtotal(${$store.state.country.symbol})` " width="200">
									<template slot-scope="scope">
										{{Number(scope.row.quantity * scope.row.vendorPrice).toFixed(2)}}
									</template>
								</el-table-column>
							</el-table>
							<div class="item-total" style="position: relative;">
								<div style="position: absolute;left: 40px;">
									Shipping days : {{item.agingDaysBegin ? item.agingDaysBegin : 0}} - {{item.agingDaysEnd ? item.agingDaysEnd : 0}} days
								</div>							
								<span>
									Subtotal（{{$store.state.country.symbol}}）:
									<span class="tx-bold">{{item.itemAllAmount ? item.itemAllAmount : '---'}}</span>
								</span>
								<span>
									Freight（{{$store.state.country.symbol}}）:
									<span class="tx-bold">{{item.shippingAllAmount ? item.shippingAllAmount : '---'}}</span>
								</span>
							</div>
						</div>
						<div class="pay-type">
							<div class="other d-flex" style="justify-content: space-between;">
								<p>Discount:</p>
								<div class="discount">
									<el-input style="width: 400px" v-model="coupon" placeholder="Enter discount code" @keyup.enter.native="getCoupon">
										 <el-button slot="append" type="primary" @click="getCoupon">Exchange</el-button>
									</el-input>
								</div>
							</div>
							<div class="pay-bouns" v-if="bonusStatus == 1" :class="{ dis: bonus + credits< totalAllGoodsAndFreight}" @click="changeBonusPlatform(6)">
								<span style="margin-right: 30px;">
									Bonus:
									<span class="tx-bold"> ({{$store.state.country.symbol}} {{bonus}})</span>
								</span>
								<el-tooltip class="item" effect="dark" content="The supplier has opened a credit limit for you. When your account balance is insufficient, you can deduct the credit limit" placement="top">
      						<i class="el-icon-question" style="color:red;line-height:80px;margin-right:5px"></i>
    						</el-tooltip>
								
								<span style="margin-right: 30px;">
									Credits:
									<span class="tx-bold"> ({{$store.state.country.symbol}} {{credits}})</span>
								</span>
								<div class="active" v-show="platformType != 6 ||  bonus + credits < totalAllGoodsAndFreight">
									<img src="../../assets/pay/Basic.png" alt="" height="25">
								</div>
								<div class="active-icon" v-show="platformType == 6">
									<img src="../../assets/pay/Active.png" alt="" height="30">
								</div>
							</div>
							<div class="other">
								<p>Payment method:</p>
								<div class="types" v-if="payTypes.length">
									<div v-for="type in payTypes" :key="type.accountType" @click="changePlatform(type.accountType)" :class="{ active: platformType == type.accountType, disabled: bonusStatus == 1 && platformType == 6 && bonus > totalAllGoodsAndFreight}">
										<img :src="type.icon" alt="" width="100%"/>
										<img v-show="platformType == type.accountType" class="active-type" src="../../assets/pay/Active.png" alt=""/>
									</div>
								</div>
								<div v-if="!payTypes.length && (bonusStatus == 2)">
									There is no alternative method of payment
								</div>
							</div>
						</div>
						<el-divider></el-divider>
						<div class="pay-total">
							<template>
								<div>
									<span class="left">
										Quantity of order :
									</span>
									<span class="tx-bold"> {{items.length}}</span>
								</div>
								<div :class="couponInfo.type == 1 ? 'line-through' : ''">
									<span class="left">
										Total amount of goods（{{$store.state.country.symbol}}）:
									</span>
									<span class="tx-bold"> {{totalAllGoodsAmount ? mathTofixed(totalAllGoodsAmount) : '---'}}</span>
								</div>
								<div :class="couponInfo.type == 1 ? 'line-through' : ''">
									<span class="left">
										Tax Amount（{{$store.state.country.symbol}}）:
									</span>
									<span class="tx-bold"> {{taxAmount ? mathTofixed(taxAmount) : '---'}}</span>
								</div>								
								<div v-show="couponInfo.type == 1">
									<span class="left">
										Discounted price of goods（{{$store.state.country.symbol}}）:
									</span>
									<span class="tx-bold"> {{couponInfo.disItemAmount ? mathTofixed(couponInfo.disItemAmount) : '---'}}</span>
								</div>
								<div :class="couponInfo.type == 3 ? 'line-through' : ''">
									<span class="left">
										Total freight amount（{{$store.state.country.symbol}}）:
									</span>
									<span class="tx-bold"> {{totalAllFreight ? mathTofixed(totalAllFreight) : '---'}}</span>
								</div>
								<div v-show="couponInfo.type == 2">
									<span class="left">
										Shop discount（{{$store.state.country.symbol}}）:
									</span>
									<span class="tx-bold" style="color:#FF0000;"> {{couponInfo.discountAmount ? - couponInfo.discountAmount : '---'}}</span>
								</div>
								<div v-show="couponInfo.type == 3">
									<span class="tx-bold" style="color:#FF0000;display:block;width:100%;"> This document is free of freight</span>
								</div>
								<div class="">
									<span class="left">
										Amount due (including freight)（{{$store.state.country.symbol}}）:
									</span>
									<span class="tx-bold"> {{totalAllGoodsAndFreight ? mathTofixed(totalAllGoodsAndFreight) : '---'}}</span>
								</div>
							</template>
						</div>
					</div>
				</el-col>
			</el-row>
			<div v-if="!paystatus>0" class="pay-submit" :style="{width: width}">
				<span class="left">
					Amount due (including freight)（{{$store.state.country.symbol}}）:
					<span class="tx-bold"> {{totalAllGoodsAndFreight ? mathTofixed(totalAllGoodsAndFreight) : '---'}}</span>
				</span>
				 <el-button  type="primary" :disabled="platformType == '13'" @click="orderPay(openType)">Submit orders</el-button>
				 
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
			Cancel
		</el-button>
		<el-button type="primary" @click="continuePay()">
			Pay
		</el-button>
	</div>
</el-dialog>
		<checkout :data="dialogCheckOut" @payCheckOut="payCheckOut"></checkout>
		<underline :data="dialogUnderline" @submitUnderline="submitUnderline"></underline>
		<dlocal :data="dialogDlocal" @submitDlocal="submitDlocal"></dlocal>
		<KasikornbankPayDialog :dialog="KasikornbankPayDialog" v-if="KasikornbankPayDialog.visible"></KasikornbankPayDialog>
	</div>
</template>
<script>  
	import checkout from "@/components/checkout/checkout";
	import underline from "@/components/checkout/underline";
	import dlocal from "@/components/checkout/dlocal";
	import KasikornbankPayDialog from './KasikornbankPayDialog.vue'
import { arrayEach } from 'xe-utils/methods';
	export default {
		data() {
			return {
				html: "",
				bankPayDialogKasikornbankInfo: {}, //开泰银行信息
				shopName: '', //店铺名称
				KasikornbankPayDialog: {
					visible: false,
					html: "",
					data:''
				},
				dialogVisibleKTPay: false,
				loading: false,
				items:[],
				bonus:0,
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
				KTType: 'credit card',
				bonusStatus:"",
				payTypes:[],
				platformType:"",
				totalAllGoodsAmount:0,
				taxAmount: 0,
				totalAllFreight:0,
				totalAllGoodsAndFreight:0,
				dialogCheckOut: {
					isShow: false,
					loading: false,
					packages: null,
					orderPay: null,
					token: "",
				},
				dialogUnderline: {
					isShow: false,
					loading: false,
					paymentId:"",
					params:"",
					payAmount:0,
				},
				dialogDlocal: {
					isShow: false,
					invoiceId: "",
					loading: false,
				},
				paystatus: 0,
				payparams:{},
				openType:"",
				width:0,
				coupon:"",
				couponInfo:"",
				KTurl: '',
				KTPayId: '',
				KTPaySession: '',
				credits: 0,
			};
		},
		components: {
			checkout,
			underline,
			dlocal,
			KasikornbankPayDialog,
		},
		computed: {},
		watch: {},
		created() {
			// console.log('321ceasasisahdqwnwqui1223');
			//
			//开泰银行获取支付信息
			// this.getInfoFromKasikornbank()
			this.getShopName()
				this.platformType = this.$route.query.type || ""
				if(this.$route.query.type==13){
					
						
				}
		},
		mounted() {
			this.width = window.getComputedStyle(this.$refs.pagebody).width;
			this.paystatus  = this.$route.query.paystatus ? Number(this.$route.query.paystatus) : 0;
			let returnPayId = localStorage.getItem("c_returnPayId") || "";
			let returnPaySessionId = localStorage.getItem("c_returnPaySessionId") || "";
			let payTypeKT = this.$route.query.payType;
			if (this.paystatus == 2) {
				if (payTypeKT != '13') {
						
				this.paySuccess(returnPayId,returnPaySessionId);	
				}
				
			}
			localStorage.setItem("c_returnPayStatus",this.paystatus);
			if (payTypeKT != '13' ) {
				console.log('347132saas14');
							window.addEventListener('storage', (e)=> {
			if(e.key == "c_returnPayStatus"){
					//支付回调，显示支付结果
					this.paystatus = localStorage.getItem("c_returnPayStatus") || 0;
					setTimeout(()=>{
						this.closePayPage();
					},300)
				}
			})
			}

			if(!this.paystatus){
				this.getItems();
				this.getBonus();
			}
		},
		methods: {
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
			//开泰弹层关闭
			handleClosePay(){
					this.dialogVisibleKTPay = false
			},
			continuePay(){
				if (this.KTType == 'qr payment') {
						this.$apiCall("api.ShopifyOrder.createPay", {
							code: this.coupon,
							platformType: 14,
							id:this.payparams.id
						}, (r) => {
							if (r.ErrorCode == "9999") {
								// this.couponInfo = r.Data.Results;
								// this.totalAllGoodsAndFreight = this.couponInfo.realAmount;
								let sessionId = r.Data.Results.sessionId
								this.KasikornbankPay(sessionId, 'qr', 14)
								this.dialogVisibleKTPay = false
							} else {
								this.$elementMessage(r.Message, "error");
							}
						})
				}else if(this.KTType == 'credit card'){
						this.KasikornbankPay('','card', 13)
				}else{
						this.KasikornbankPay('','debit', 15)
				}
					console.log('asda378', this.KTType);
			},
			getShopName() {
				this.$apiCall("api.VendorShop.getVendorShop", {}, (r) => {
					if (r.ErrorCode == 9999) {
					this.shopName = r.Data.Results.name;
					}
				});
			},
			KasikornbankPay(seId, codeType, formType) {
				// Todo 这块跟后端协商。。。action的
				let returnPayId = localStorage.setItem("c_returnPayId", this.KTPayId) || "";
		  	let returnPaySessionId = localStorage.setItem("c_returnPaySessionId", this.KTPaySession) || "";
				let success_url = window.location.origin + '/orderPay?paystatus=2&payType=13'
				let id = this.payparams.id;
				let apiUserId = localStorage.getItem("c_apiUserId")?localStorage.getItem("c_apiUserId"):"";
				let url = `https://sandboxapi.myourmall.com/kaitaiCheckout.php?id=${id}&code=${this.coupon}&apiUserId=${apiUserId}&platformType=${formType}`
				if(Object.keys(this.KasikornbankInfo).length && this.shopName !== ''){
								let obj = {
									sessionId:seId,
									action_url: url,
									success_url: success_url,
									src: 'https://dev-kpaymentgateway.kasikornbank.com/ui/v2/kpayment.min.js',
									dataApikey: this.KasikornbankInfo.publicKey,
									dataAmount:this.totalAllGoodsAndFreight,
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
							console.log(htmlObj, 'dsadadhtmlObj');
								this.paystatus = 1;
								sessionStorage.setItem('html', htmlObj)
							 	window.open(`./payment.html`, '_blank')
								 window.close();
					// this.KasikornbankPayDialog = {
					// 	visible: true,
					// 	html: obj
					// }
				} else {
					this.$elementMessage('请稍后重试～', "error");
				}
			},
			mathTofixed(num){
				let number = Math.floor(Number(num) * 100) / 100;
				return number.toFixed(2);
			},
			getCoupon(){
				this.$showLoading();
				this.$apiCall("api.ShopifyOrder.getCoupon", {
					code: this.coupon,
					id:this.payparams.id
				}, (r) => {
					this.$hideLoading();
					if (r.ErrorCode == "9999") {
						this.couponInfo = r.Data.Results;
						this.totalAllGoodsAndFreight = this.couponInfo.realAmount;
					} else {
						this.$elementMessage(r.Message, "error");
					}
				})
			},
			goBack(){
				if(this.paystatus == 2){
					this.$router.push({path:'ordersManage/3'})
				}else{
					this.$router.push({
						path:'ordersManage/2',
						query:{type:2}
					})
				}
			},
			payCheckOut(token) {
				if(this.dialogCheckOut.loading){
					return;
				}
				this.dialogCheckOut.loading = true;
				this.$Burying({
					object: "9003",
					objectId: 4,
				});
				let params = {
					code: this.coupon,
					success_url: window.location.origin + '/orderPay?paystatus=2',
					cancel_url: window.location.origin + '/orderPay?paystatus=3',
					platformType: 4,
					token,
				};
				let url = "api.ShopifyOrder.createPay";
				if(this.openType == "repay"){
					//重新支付
					url = "api.ShopifyOrder.reCreatePay";
				}
				params.id = this.payparams.id;
				this.$apiCall(url, params, (r) => {
						this.dialogCheckOut.loading = false;
						this.dialogCheckOut.isShow = false;
						if (r.ErrorCode == "9999" && r.Data.Results.url) {
							this.paystatus = 2;
							if(this.openType == "repay"){
								//重新支付
								this.paySuccess(params.id,r.Data.Results.sessionId);
							}else{
								this.paySuccess(r.Data.Results.id,r.Data.Results.sessionId);
							}
						} else {
							this.$elementMessage( r.ErrorCode == "9999" ? "fail" : r.Message, "error");
						}
					}
				);
			},
			submitUnderline(account, imageUrl) {
				this.dialogUnderline.loading = true;
				let params = {
					code: this.coupon,
					platformType: 12,
					accountPayment: account,
					voucherUrl: imageUrl,
					paymentId: this.dialogUnderline.paymentId
				};
				let url = "api.ShopifyOrder.createPay";
				if(this.openType == "repay"){
					//重新支付
					url = "api.ShopifyOrder.reCreatePay";
				}
				params.id = this.payparams.id;
				this.$apiCall(url ,params, (r) => {
					this.dialogUnderline.loading = false;
					this.dialogUnderline.isShow = false;
					if (r.ErrorCode == "9999") {
						this.paystatus = 2;
						if(this.openType == "repay"){
							//重新支付
							this.paySuccess(params.id,r.Data.Results.sessionId);
						}else{
							this.paySuccess(r.Data.Results.id,r.Data.Results.sessionId);
						}
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
				let params2 = {
					code: this.coupon,
					methodId: params.methodId,
					platformType: 10,
					domain: window.location.origin + '/',
					flow: 'REDIRECT',
					country: params.country,
					name: params.name,
					city: params.city,
					street: params.street,
					number: params.number,
					document: params.document,
					phone: params.phone,
					email: params.email
				};
				let url = "api.ShopifyOrder.createPay";
				if(this.openType == "repay"){
					//重新支付
					url = "api.ShopifyOrder.reCreatePay";
				}
				params2.id = this.payparams.id;
				this.$apiCall(url,params2 , (r) => {
					this.dialogDlocal.loading = false;
					this.dialogDlocal.isShow = false;
					if (r.ErrorCode == "9999" && r.Data.Results.url) {
						this.newWin.location = r.Data.Results.url;
						this.paystatus = 1;
					} else {
						this.$elementMessage(
							r.ErrorCode == "9999" ? "fail" : r.Message,
							"error"
						);
						this.newWin.close();
					}
				})
			},
			KTPayFun(){
			let success_url = window.location.origin + '/orderPay?paystatus=2'
			 	let cancel_url = window.location.origin + '/orderPay?paystatus=3'
				let id = this.payparams.id;
				let apiUserId = localStorage.getItem("c_apiUserId")?localStorage.getItem("c_apiUserId"):"";
						this.KTurl = `https://sandboxapi.myourmall.com/kaitaiCheckout.php?success_url=${success_url}&cancel_url=${cancel_url}&id=${id}&code=${this.coupon}&apiUserId=${apiUserId}&platformType=13`
				console.log(this.KTurl, '232this.KTurl');
				this.$nextTick(()=>{
						const container = document.querySelector('#formPay')
						container.removeChild()
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = 'https://dev-kpaymentgateway.kasikornbank.com/ui/v2/kpayment.min.js'
            script.setAttribute('data-apikey','pkey_test_21309fUcbpFt5H7fHKoPUjpo8GD7iVJxtjwev' )
            script.setAttribute('data-amount', '1000')
            script.setAttribute('data-currency', 'THB')
            script.setAttribute('data-payment-methods', 'card')
            script.setAttribute('data-name', 'Your Shop Name')
            script.setAttribute('data-smartpay-id', '0001')
            script.setAttribute('data-mid', '401882205171001')
            container?.appendChild(script)
						container.style.display= ''
					})
					},
			// TODO支付
			orderPay(openType) {
				this.openType = openType;
				if(!this.platformType){
					this.$elementMessage("Please select payment method", "error");
					return;
				}
				
				//支付
				this.$Burying({
					object: "9003",
					objectId: this.platformType,
				});
				let params = {
					code: this.coupon,
					platformType: this.platformType,
					success_url: window.location.origin + '/orderPay?paystatus=2',
					cancel_url: window.location.origin + '/orderPay?paystatus=3',
				};
				let type = "";
				let paymentId = "";
				if (this.platformType && !Number(this.platformType) && this.platformType.indexOf('underline') != -1) {//线下支付
					paymentId = this.platformType.substring(9);
					type = 12;
				}else{
					type = Number(this.platformType);
				}
				switch (type) {
					//Kasikornbank
					case 13:
						this.KasikornbankPay()
						break;
					//underline
					case 12:
						this.dialogUnderline.isShow = true;
						this.dialogUnderline.paymentId = paymentId;
						let item = this.payTypes.filter(item => {return item.id == paymentId});
						this.dialogUnderline.params = item.length && item[0].params ? JSON.parse(item[0].params) : "";
						this.dialogUnderline.payAmount = this.totalAllGoodsAndFreight;
						break;
						//dlocal
					case 10:
						this.dialogDlocal.isShow = true;
						this.dialogDlocal.invoiceId = this.payparams.id;
						break;
						//CheckOut
					case 4:
						this.dialogCheckOut.isShow = true;
						break;
						//paypal
					case 3:
						console.log(this.$root.$children[0].baseUrl)
						this.newWin = window.open(
							(this.$root.$children[0].baseUrl == "/my" ? "/my" : "") +
							"/blank.html",
							"pay"
						);
						break;
						//ebanx
					case 2:
						this.newWin = window.open(
							(this.$root.$children[0].baseUrl == "/my" ? "/my" : "") +
							"/blank.html",
							"pay"
						);
						break;
						//stripe
					case 1:
			
						break;
					default:
						//bonus
						break;
				}
				if (type == 4 || type == 10 || type == 12 || type == 13) {
					//CheckOut或者dlocal或者underline
					return;
				}
				this.loading = true;
				let url = "api.ShopifyOrder.createPay";
				if(openType == "repay"){
					//重新支付
					url = "api.ShopifyOrder.reCreatePay";
				}
				params.id = this.payparams.id;
				this.$apiCall(url, params, (r) => {
					this.loading = false;
					if (r.ErrorCode == "9999") {
						if(openType == "repay"){
							//重新支付
							localStorage.setItem("c_returnPayId",params.id);
						}else{
							localStorage.setItem("c_returnPayId",r.Data.Results.id);
							this.KTPayId = r.Data.Results.id;
						}
						localStorage.setItem("c_returnPaySessionId",r.Data.Results.sessionId);
						this.KTPaySession = r.Data.Results.sessionId;
						//bonus
						if (this.platformType == 6) {
							this.paystatus = 2;
							if(openType == "repay"){
								//重新支付
								this.paySuccess(params.id,r.Data.Results.sessionId);
							}else{
								this.paySuccess(r.Data.Results.id,r.Data.Results.sessionId);
							}
						} else {
							//stripe
							if (this.platformType == 1) {
								const data = r.Data.Results;
								let stripe = Stripe(data.pk);
								stripe.redirectToCheckout({
									sessionId: data.sessionId
								});
							} else {
								this.newWin.location = r.Data.Results.url;
							}
							this.paystatus = 1;
						}
					} else {
						this.$elementMessage(r.Message, "error");
						this.closePayPage();
					}
				});
			},
			paySuccess(id,sessionId){
				localStorage.removeItem("c_returnPayId");
				localStorage.removeItem("c_returnPaySessionId");
				this.$apiCall("api.ShopifyOrder.returnPay", {
					id:id,
					sessionId:sessionId
				}, (r) => {
					if (r.ErrorCode == "9999") {
						this.$elementMessage("Successfully", "success");
						this.$router.push({path:'ordersManage/3'})
					} else {
						this.$elementMessage(r.Message, "error");
					}
				})
			},
			closePayPage() {

				// clearInterval(this.payTime);
				// let pay = parseInt(sessionStorage.getItem('payTypeKT')) 
				// if(pay != 13){
				// 		}
									//关闭支付新开页面
				if (this.newWin) {
					this.newWin.close();
				}
				localStorage.removeItem("c_returnPayStatus");
			
				
			},
			changeBonusPlatform() {
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
			changePlatform(type) {
				if (this.bonusStatus !=1) {
					this.platformType = type;
				}else{
					if (this.platformType != 6) {
						this.platformType = type;
					}
				}
				if (type == 13) {
					this.dialogVisibleKTPay = true
				}
			},
			getBonus(){
				this.$apiCall("api.Invoice.getBonus", {
				}, (r) => {
					if (r.ErrorCode == "9999") {
						this.bonus = r.Data.Results.bonus ? parseFloat(Number(r.Data.Results.bonus).toFixed(2)) : 0;
						if(this.bonus > this.totalAllGoodsAndFreight){
							this.platformType = 6;
						}else{
							let accountPayment = localStorage.getItem('accountPayment') ? JSON.parse(localStorage.getItem('accountPayment')) : "";
							if(this.payTypes.length){
								if(accountPayment.platformType == 12){
									this.platformType = accountPayment.extJson && accountPayment.extJson.paymentId ? `underline${accountPayment.extJson.paymentId}` : this.payTypes[0].accountType
								}else if (accountPayment.platformType == 6){
									
								}else{
									this.platformType = accountPayment.platformType;
								}
							}
						}
						this.bonusStatus = r.Data.Results.bonusStatus;
						this.credits =( Number(r.Data.Results.creditAmount) - Number(r.Data.Results.usedCreditAmount)).toFixed(2);
					} else {}
				})
				// TODO支付
				this.$apiCall("api.AccountPayment.getPaymentAccounts", {
				}, (r) => {
					if (r.ErrorCode == "9999") {
						this.payTypes = [];
						if (!r.Data.Results || !r.Data.Results.length) return;
						r.Data.Results.forEach(item => {
							item.icon = require('@/assets/pay/' + Number(item.accountType) + '.png');
							if(item.accountType == 12){
								this.$set(item,"accountType",`underline${item.id}`);
								this.$set(item,"name",`${item.params ? JSON.parse(item.params).cname : ''}`);
							}
							if(item.status == 1){
								this.payTypes.push(item);
							}
						})
						// console.log(this.payTypes)
					} else {}
				})
			},
			getItems(){
				let items = localStorage.getItem('needPayOrders') ? JSON.parse(localStorage.getItem('needPayOrders')) : "";
				if(!items) return;
				this.openType = items.type;
				this.items = items.items || [];
				this.payparams.id = items.invoice.id;
				this.items.forEach(item=>{
					this.$set(item,"totalAllAmount",Number(item.itemAllAmount)+Number(item.shippingAllAmount)+Number(item.itemTaxAmount));
					this.$set(item,"shippingJsonInfo",item.shippingJson ? JSON.parse(item.shippingJson) : "");
					this.$set(item,"shippingAllAmount",item.shippingAllAmount ? Number(item.shippingAllAmount) : "");
				})
				this.$set(this,"totalAllGoodsAmount",this.countTotal(this.items,'itemAllAmount'));//商品总价
				this.$set(this,"totalAllFreight",this.countTotal(this.items,'shippingAllAmount'));//运费汇总
				this.$set(this,"taxAmount",this.countTotal(this.items,'itemTaxAmount'));//费率汇总
				this.$set(this,"totalAllGoodsAndFreight",this.countTotal(this.items,'totalAllAmount'));//商品总价+运费汇总
				//重新支付时获取之前支付的时候有没有占用优惠券
				if(this.openType == 'repay'){
					this.$showLoading();
					this.$apiCall("api.Coupon.findHistory", {
						relateId:this.payparams.id,
						status: 2
					}, (r) => {
						this.$hideLoading();
						if (r.ErrorCode == "9999") {
							if(!r.Data.Results || !r.Data.Results.length) return;
							if(r.Data.Results[0].extra){
								this.coupon = JSON.parse(r.Data.Results[0].extra).code;
								this.getCoupon();
							}
						} else {
							this.$elementMessage(r.Message, "error");
						}
					})
				}
			},
			countTotal(arr, keyName) {
				let $total = 0;
				$total = arr.reduce((total, currentValue, currentIndex, arr) => {
					return currentValue[keyName] ? (total + currentValue[keyName]) : total;
				}, 0);
				return parseFloat(Number($total).toFixed(2));
			},
		}
	};
</script>

<style lang="scss">
	::v-deep .el-dialog__body {
		height: 62vh;
		overflow: auto;
	}
	.cell-flex{
		display: flex;
		justify-content: center;
		padding-top: 50px;
		padding-bottom: 50px;
	}
	.pay-status-body{
		border: 1px solid #DFDFDF;
		background: #fff;
		text-align: center;
		padding: 30px;
		.d-flex{
			justify-content: center;
		}
		.tx-bold{
			margin-left: 10px;
			height: 60px;
			font-size: 30px;
			font-weight: 600;
			color: #040404;
			line-height: 60px;
		}
		p{
			color: #B2B2B2;
			margin-top: 20px;
			margin-bottom: 80px;
			font-size: 20px;
		}
		.el-button--primary{
			background: #4B9BFB;
			border-color: #4B9BFB;
		}
		.el-button--primary.is-plain{
			background: #fff;
			color: #4B9BFB;
			border-color: #ddd;
		}
		.el-button--primary.is-plain:hover, .el-button--primary.is-plain:focus, .el-button--primary.is-plain:active{
			border-color: #4B9BFB;
		}
	}
	.pay-body{
		border: 1px solid #DFDFDF;
		background: #fff;
		.title{
			display: flex;
			justify-content: space-between;
			height: 54px;
			background: #EDEDED;
			padding: 0 20px;
			span{
				height: 36px;
				font-size: 26px;
				font-weight: 600;
				color: #343434;
				line-height: 36px;
			}
		}
		.item-body{
			padding: 20px 20px 10px;
			>div{
				height: 30px;
				line-height: 30px;
				font-size: 16px;
				color: #6D6D6D;
				.tx{
					color: #262626;
					font-weight: normal;
				}
			}
		}
		.el-table{
			padding: 0 20px 20px;
		}
		.item-total{
			font-size: 20px;
			padding: 20px;
			text-align: right;
			>span:last-child{
				margin-left: 50px;
			}
		}
		.pay-type{
			color: #343434;
			padding: 0 20px;
			.pay-bouns{
				font-size: 20px;
				height: 80px;
				line-height: 80px;
				background: #F3F9FF;
				display: flex;
				align-self: center;
				// justify-content: space-between;
				padding: 0 20px;
				cursor: pointer;
			}
			.pay-bouns.dis{
				cursor:not-allowed;
				opacity: 0.5;
			}
			.other{
				padding: 20px;
				p{
					font-size: 20px;
				}
				.types{
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					>div{
						// width: 180px;
						// height: 80px;
						border: 1px dashed #DFDFDF;
						margin-right: 20px;
						margin-top: 20px;
						position: relative;
						cursor: pointer;
						img{
							width: 170px;
							display: block;
							// margin: 20px auto;
						}
						.active-type{
							width: 30px;
							position: absolute;
							bottom: -5px;
							right: -5px;
						}
					}
					div.active{
						border: 1px solid #4B9BFB;
					}
					div.disabled{
						cursor:not-allowed;
						opacity: 0.5;
					}
					div.disabled:before{
						content:"";
						width:100%;
						height:100%;
						position:absolute;
						background:rgba(0,0,0,0.1);
					}
				}
			}
		}
		.pay-total{
			padding: 0 20px 20px;
			font-size: 20px;
			>div{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				margin-bottom: 6px;
				span{
					display:block;
					width: 120px;
					text-align: right;
				}
				.left{
					width: 500px;
					color: #6d6d6d;
				}
			}
			>div:last-child{
				font-size: 26px;
			}
		}
		.tx-bold{
			color: #262626;
		}
	}
	.pagebody{
		position: relative;
		padding-bottom: 68px;
	}
	.pay-submit{
		position: fixed;
		bottom: 0;
		padding: 20px; 
		text-align: right;
		// width: 100%;
		background: #fff;
		z-index: 9;
		border: 1px solid #DFDFDF;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.left{
			margin-right: 50px;
			font-size: 26px;
			color: #6d6d6d;
			span{
				color: #262626;
			}
		}
		.el-button{
			background-color: #4B9BFB;
			border-color: #4B9BFB;
		}
	}
	.line-through{
		position: relative;
		color:#9E9E9E;
	}
	.line-through:before{
		content:"";
		position:absolute;
		width:500px;
		height:1px;
		background:#999;
		top:51%;
		right:-10px;
	}
</style>
