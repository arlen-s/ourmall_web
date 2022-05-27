<template>
	<div class="contentpanel transaction-page">
		<div class="pagetitle" ref="pageHeader">
			<div class="left">
				<div class="title">
					<i class="el-icon-s-management"></i>
					<h2>{{ $t("payment.title") }}</h2>
				</div>
			</div>
			<div class="right">

			</div>
		</div>
		<el-alert
			:title="$t('payment.paypal3')"
			type="warning" show-icon :closable="false">
		</el-alert>
		<div class="pagebody mg-t-30">
			<el-row :gutter="15" class="mg-b-20">
				<el-col :span="24" v-for="(item,index) in paymentMethods" :key="index" class="mg-b-30 mg-t-10">
					<el-row :gutter="15" class="mg-b-15" align="middle">
						<el-col :span="6">
							<div class="" style="font-size:18px">
								{{ $t(`payment.payment${item.accountType}`) }}
							</div>
						</el-col>
						<el-col :span="16">
							<el-switch v-model="item.switchStatus" :disabled="!$isRole($route.meta.roleWrite)" active-color="#7d88d0" @change="changeStatus(item)">
							</el-switch>
						</el-col>
					</el-row>
					<el-card>
						<el-row :gutter="15" type="flex" align="middle">
							<el-col :span="6">
								<img :src="item.icon" alt="" height="80">
							</el-col>
							<el-col :span="12">
								<!-- paypal收款 -->
								<div v-if="item.accountType == 3">
									<p>{{$t('payment.paypal1')}}</p>
									<p class="mg-b-15">{{$t('payment.paypal2')}}</p>
									
								</div>
								<!-- 线下收款 -->
								<div v-else-if="item.accountType == 12">
									<p>{{$t('payment.offline1')}}
									</p>
									<p>{{$t('payment.offline2')}}</p>
								</div>
								<!-- 其他收款 -->
								<div v-else>
									<p>{{$t('payment.paymentText1',{name:item.name})}} </p>
									<p>{{$t('payment.paymentText2',{name:item.name})}}
									</p>
								</div>
							</el-col>
							<el-col :span="6">
								<!-- 线下收款开启显示绑定银行卡按钮 -->
								<div v-if="item.status == 1">
									<template v-if="item.params">
										<el-button type="primary" :disabled="!$isRole($route.meta.roleWrite)" @click="bindPayment(item)">
											{{item.accountType == 12 ? $t('payment.setting') : $t("payment.change") + ' ' + $t('payment.account')}}</el-button>
										<el-button type="primary" :disabled="!$isRole($route.meta.roleWrite)" @click="item.show = !item.show">{{ $t("payment.detail") }}<i
												class="el-icon--right"
												:class="!item.show ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
										</el-button>
									</template>
									<el-button v-else type="primary" :disabled="!$isRole($route.meta.roleWrite)" @click="bindPayment(item)">
										{{item.accountType == 12 ? $t('payment.setting') : $t('payment.activate')}}</el-button>
								</div>

							</el-col>
						</el-row>
						<el-row v-if="item.show" :gutter="15" type="flex" align="middle" style="background: #f4f6fa;">
							<el-col :span="24">
								<div v-if="item.accountType == 12" style="margin: 20px auto;display: flex;flex-wrap: wrap;" class="underline-pay">
									<el-form label-width="200px" class="demo-ruleForm" label-position="top" style="width: 45%;padding: 20px; border: 1px solid #ddd;margin: 20px;" v-for="(pay,payindex) in underlineItems" :key="payindex">
										<el-form-item :label="$t('payment.cname')" prop="cname">
											<el-input v-model="pay.info.cname" :readonly="true"></el-input>
										</el-form-item>
										<el-form-item :label="$t('payment.info1')" prop="info1">
											<!-- <el-input type="textarea" :rows="3" v-model="pay.info.info1" :readonly="true"></el-input> -->
											<quill-editor ref="goodsEditor" :content="pay.info.info1"
												:options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)">
											</quill-editor>
											<p style="color: #999;">{{$t('payment.info1text')}}</p>
										</el-form-item>
										<el-form-item :label="$t('payment.info2')" prop="info2">
											<!-- <el-input type="textarea" :rows="3" v-model="pay.info.info2" :readonly="true"></el-input> -->
											<quill-editor ref="goodsEditor" :content="pay.info.info2"
												:options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)">
											</quill-editor>
											<p style="color: #999;">{{$t('payment.info2text')}}</p>
										</el-form-item>
										<!-- <el-form-item :label="$t('payment.bankName')" prop="bankName">
											<el-input v-model="item.info.bankName" :readonly="true"></el-input>
										</el-form-item>
										<el-form-item :label="$t('payment.bankCode')" prop="bankCode">
											<el-input v-model="item.info.bankCode" :readonly="true"></el-input>
										</el-form-item>
										<el-form-item :label="$t('payment.bankAccountType')" prop="bankAccountType">
											<el-radio-group v-model="item.info.bankAccountType" :readonly="true">
												<el-radio label="1">{{$t('payment.checkAccount')}}</el-radio>
												<el-radio label="2">{{$t('payment.thriftAccount')}}</el-radio>
											</el-radio-group>
										</el-form-item>
										<el-form-item :label="$t('payment.bankArea')" prop="bankArea">
											<el-input v-model="item.info.bankArea" :readonly="true"></el-input>
										</el-form-item>
										<el-form-item :label="$t('payment.bankAreaCode')" prop="bankAreaCode">
											<el-input v-model="item.info.bankAreaCode" :readonly="true"></el-input>
										</el-form-item>
										<el-form-item :label="$t('payment.bankAccount')" prop="bankAccount">
											<el-input v-model="item.info.bankAccount" :readonly="true"></el-input>
										</el-form-item>
										<el-form-item :label="$t('payment.bankAccountName')" prop="bankAccountName">
											<el-input v-model="item.info.bankAccountName" :readonly="true"></el-input>
										</el-form-item> -->
										<el-button type="danger" @click="deletePayment(pay)" :disabled="!$isRole($route.meta.roleWrite)">Delete</el-button>
										<el-button type="primary" class=" mg-l-20" @click="bindPayment(pay,'edit')" :disabled="!$isRole($route.meta.roleWrite)">Edit</el-button>
									</el-form>
									
								</div>
								<div v-if="item.accountType == 10" style="margin: 20px auto;width:50%;">
									<el-form label-width="200px" class="demo-ruleForm">
										<el-form-item label="secretKey: " prop="secretKey">
											<el-input v-model="item.info.secretKey" :readonly="true"></el-input>
										</el-form-item>
										<el-form-item label="xLogin: " prop="xLogin">
											<el-input v-model="item.info.xLogin" :readonly="true"></el-input>
										</el-form-item>
										<el-form-item label="xTransKey: " prop="xTransKey">
											<el-input v-model="item.info.xTransKey" :readonly="true"></el-input>
										</el-form-item>
										<el-form-item label="apiKey: " prop="apiKey">
											<el-input v-model="item.info.apiKey" :readonly="true"></el-input>
										</el-form-item>
									</el-form>
								</div>
								<div v-if="item.accountType == 2 || item.accountType == 4" style="margin: 20px auto;width:50%;">
									<el-form label-width="200px" class="demo-ruleForm">
										<el-form-item label="secretKey: " prop="secretKey">
											<el-input v-model="item.info.secretKey" :readonly="true"></el-input>
										</el-form-item>
										<el-form-item label="publicKey: " prop="publicKey">
											<el-input v-model="item.info.publicKey" :readonly="true"></el-input>
										</el-form-item>
									</el-form>
								</div>
								<div v-if="item.accountType == 13" style="margin: 20px auto;width:50%;">
									<el-form label-width="200px" class="demo-ruleForm">
										<el-form-item label="secretKey: " prop="secretKey">
											<el-input v-model="item.info.secretKey" :readonly="true"></el-input>
										</el-form-item>
										<el-form-item label="publicKey: " prop="publicKey">
											<el-input v-model="item.info.publicKey" :readonly="true"></el-input>
										</el-form-item>
										<el-form-item label="merchantId: " prop="publicKey">
											<el-input v-model="item.info.merchantId" :readonly="true"></el-input>
										</el-form-item>
										<el-form-item label="terminalId: " prop="publicKey">
											<el-input v-model="item.info.terminalId" :readonly="true"></el-input>
										</el-form-item>
									</el-form>
								</div>
								<div v-if="item.accountType == 1" style="margin: 20px auto;width:50%;">
									<el-form label-width="200px" class="demo-ruleForm">
										<el-form-item label="secretKey: " prop="secretKey">
											<el-input v-model="item.info.secretKey" :readonly="true"></el-input>
										</el-form-item>
										<el-form-item label="publicKey: " prop="publicKey">
											<el-input v-model="item.info.publicKey" :readonly="true"></el-input>
										</el-form-item>
										<el-form-item label="webhookSecret: " prop="webhookSecret">
											<el-input v-model="item.info.webhookSecret" :readonly="true"></el-input>
										</el-form-item>
									</el-form>
								</div>
								<div v-if="item.accountType == 3" style="margin: 20px auto;width:50%;">
									<el-form label-width="200px" class="demo-ruleForm">
										<el-form-item label="username: " prop="username">
											<el-input v-model="item.info.username" :readonly="true"></el-input>
										</el-form-item>
										<el-form-item label="password: " prop="password">
											<el-input v-model="item.info.password" :readonly="true"></el-input>
										</el-form-item>
										<el-form-item label="signature: " prop="signature">
											<el-input v-model="item.info.signature" :readonly="true"></el-input>
										</el-form-item>
									</el-form>
								</div>
							</el-col>
						</el-row>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<el-backtop class="goto-top" target=".main-scroll  .el-scrollbar__wrap" :right="20" :bottom="20">
		</el-backtop>
		<paymentDialog :dialogData="dialogData" @BindAccountPayment="BindAccountPayment" @closeDialog="closeDialog"></paymentDialog>
	</div>
</template>

<script>
	import {
		eeSourceBtn
	} from '@/components/quill.eeSourceBtn.js';
	Quill.register('modules/eeSourceBtn', eeSourceBtn);
	import "quill/dist/quill.core.css";
	import "quill/dist/quill.snow.css";
	import "quill/dist/quill.bubble.css";
	import {
		Quill,
		quillEditor
	} from "vue-quill-editor";
	import paymentDialog from "./../payment/payment-dialog";
	export default {
		data() {
			return {
				paymentMethods:[{
					accountType:"3",
					icon: require('@/assets/pay/3.png'),
					name:"paypal",
					status:"2"
				},{
					accountType:"4",
					icon:require('@/assets/pay/4.png'),
					name:"checkout",
					status:"2"
				},{
					accountType:"12",
					icon:require('@/assets/pay/12.png'),
					name:"underline",
					status:"2"
				},
				// {
				// 	accountType:"6",
				// 	icon:require('@/assets/pay/6.png'),
				// 	name:"bonus",
				// },
				{
					accountType:"1",
					icon:require('@/assets/pay/1.png'),
					name:"stripe",
					status:"2"
				},{
					accountType:"2",
					icon:require('@/assets/pay/2.png'),
					name:"ebanx",
					status:"2"
				},{
					accountType:"10",
					icon:require('@/assets/pay/10.png'),
					name:"dlocal",
					status:"2"
				},{
					accountType:"13",
					icon:require('@/assets/pay/13.png'),
					name:"Kasikornbank",
					status:"2"
				}],
				underlineItems:[],
				dialogData: {
					isShow: false,
					item: "",
					title: "",
					edit: false,
				},
				editorOption:{
					modules: {
						toolbar: {
							container: [],
						},
					},
				},
			};
		},
		components: {
			paymentDialog,
			quillEditor,
		},
		watch: {},
		mounted() {
			this.getPayment();
		},
		methods: {
			onEditorBlur() { //失去焦点事件
				document.querySelector('.ql-editor').setAttribute('data-placeholder', '');
			},
			onEditorFocus(event) { //获得焦点事件
				document.querySelector('.ql-editor').removeAttribute('data-placeholder', '');
				event.enable(false);
			},
			getPayment() {
				this.underlineItems = [];
				this.$showLoading();
				this.$apiCall("api.AccountPayment.getPaymentAccounts", {}, (r) => {
					if (r.ErrorCode == "9999") {
						if (!r.Data.Results || !r.Data.Results.length) return;
						r.Data.Results.forEach((item,index) => {
							item.icon = require('@/assets/pay/' + Number(item.accountType) + '.png');
							item.switchStatus = item.status == 1 ? true : false;
							item.show = false;
							item.info = item.params ? JSON.parse(item.params) : {};
							this.paymentMethods.forEach((payment,payIndex)=>{
								if (item.accountType == payment.accountType) {
									this.paymentMethods.splice(payIndex,1,r.Data.Results[index]);
								}
								
							})
							
							if(item.accountType == 12){
								this.underlineItems.push(item);
							}
						})
						console.log(this.paymentMethods)
					} else {
						this.$elementMessage(r.Message, "error");
					}
					this.$hideLoading();
				})
			},
			deletePayment(item){
				this.$confirm(this.$t('payment.delete'), "", {
					confirmButtonText: this.$t('payment.confirm'),
					cancelButtonText: this.$t('payment.cancel'),
					type: ''
				}).then(() => {
					this.$showLoading();
					this.$apiCall("api.AccountPayment.deletePayBind", {
						id: item.id,
						accountType: item.accountType,
					}, (r) => {
						if (r.ErrorCode == "9999") {
							this.getPayment();
						} else {
							this.$elementMessage(r.Message, "error");
						}
						this.$hideLoading();
					})
				}).catch(() => {
				
				});
			},
			bindPayment(item,type1) {
				this.dialogData.edit = false;
				let type = Number(item.accountType);
				this.dialogData.item = item;
				this.dialogData.title = this.$t(`payment.activate${item.accountType}`);
				if (item.params) {
					this.dialogData.params = JSON.parse(item.params);
				}
				if(type1 == 'edit'){
					this.dialogData.edit = true;
				}
				this.dialogData.isShow = true;
				// switch (type) {
				// 	//underline
				// 	case 12:
				// 		this.dialogData.isShow = true;
				// 		this.dialogData.title = "绑定银行卡";
				// 		break;
				// 		//dlocal
				// 	case 10:
				// 		this.dialogData.isShow = true;
				// 		this.dialogData.title = "激活Delocal";
				// 		break;
				// 		//CheckOut
				// 	case 4:
				// 		this.dialogData.isShow = true;
				// 		this.dialogData.title = "激活Checkout";
				// 		break;
				// 		//paypal
				// 	case 3:
				// 		this.dialogData.isShow = true;
				// 		this.dialogData.title = "激活PayPal";
				// 		break;
				// 		//ebanx
				// 	case 2:
				// 		this.dialogData.isShow = true;
				// 		this.dialogData.title = "激活EBANX";
				// 		break;
				// 		//stripe
				// 	case 1:
				// 		this.dialogData.isShow = true;
				// 		this.dialogData.title = "激活Stripe";
				// 		break;
				// 	default:
				// 		break;
				// }
			},
			BindAccountPayment(params) {
				this.$showLoading();
				this.$apiCall("api.AccountPayment.vendorBindAccountPaymentTest", params, (r) => {
					if (r.ErrorCode == "9999") {
						this.dialogData.isShow = false;
						this.getPayment();
					} else {
						this.$elementMessage(r.Message, "error");
					}
					this.$hideLoading();
				})
			},
			closeDialog(){
				this.dialogData.isShow = false;
			},
			changeStatus(item) {
				if (!item.params) {
					//未激活或者设置银行卡时
					item.status = 1;
					return;
				} 
				item.switchStatus = !item.switchStatus;
				if (!item.switchStatus) {
					this.$confirm(this.$t('payment.EnabledText'), this.$t('payment.EnabledTitle'), {
						confirmButtonText: this.$t('payment.Enabled'),
						cancelButtonText: this.$t('payment.cancel'),
						type: 'success'
					}).then(() => {
						this.$showLoading();
						this.$apiCall("api.AccountPayment.changePaymentAccountStatus", {
							accountType: item.accountType
						}, (r) => {
							if (r.ErrorCode == "9999") {
								this.$elementMessage(this.$t('payment.Enabled') + ' ' + this.$t('payment.success'), "success");
								this.getPayment();
							} else {
								this.$elementMessage(r.Message, "error");
							}
							this.$hideLoading();
						})
					}).catch(() => {

					});
				} else {
					this.$confirm(this.$t('payment.DisabledText'), this.$t('payment.DisabledTitle'), {
						confirmButtonText: this.$t('payment.Disabled'),
						cancelButtonText: this.$t('payment.cancel'),
						type: 'warning'
					}).then(() => {
						this.$showLoading();
						this.$apiCall("api.AccountPayment.changePaymentAccountStatus", {
							accountType: item.accountType
						}, (r) => {
							if (r.ErrorCode == "9999") {
								this.$elementMessage(this.$t('payment.Disabled') + ' ' + this.$t('payment.success'), "success");
								this.getPayment();
							} else {
								this.$elementMessage(r.Message, "error");
							}
							this.$hideLoading();
						})
					}).catch(() => {

					});
				}
			}
		},
	};
</script>

<style lang="scss" scoped>

</style>
