<template>
	<div>
		<el-dialog :title="dialogData.title" :visible.sync="dialogData.isShow" :width="'50%'" @opened="opened" :close-on-press-escape="false"
			:close-on-click-modal="false">
			<el-divider></el-divider>
			<!-- underline -->
			<div v-if="dialogData.item.accountType == 12" style="width:80%;margin: 0 auto;" class="underline-pay">
				<!-- <el-radio-group v-model="resource" style="margin:40px 40px 20px;">
					<el-radio label="1">{{$t('payment.add1')}}</el-radio>
					<el-radio label="2">{{$t('payment.add2')}}</el-radio>
				</el-radio-group> -->
				<el-form v-if="dialogData.item" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm" label-position="top">
					<el-form-item :label="$t('payment.cname')+':'" prop="cname">
						<el-input v-model="ruleForm.cname"></el-input>
					</el-form-item>
					<el-form-item :label="$t('payment.info1')+':'" prop="info1">
						<!-- <el-input type="textarea" :rows="3" v-model="ruleForm.info1"></el-input> -->
						<quill-editor ref="goodsEditor" v-model="ruleForm.info1"
							:options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)">
						</quill-editor>
						<p style="color: #999;">{{$t('payment.info1text')}}</p>
					</el-form-item>
					<el-form-item :label="$t('payment.info2')+':'" prop="info2">
						<quill-editor ref="goodsEditor" v-model="ruleForm.info2"
							:options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)">
						</quill-editor>
						<!-- <el-input type="textarea" :rows="3" v-model="ruleForm.info2"></el-input> -->
						<p style="color: #999;">{{$t('payment.info2text')}}</p>
					</el-form-item>
						<!-- <template v-if="resource == 1">
							<el-form-item :label="$t('payment.bankName')" prop="bankName">
								<el-input v-model="ruleForm.bankName"></el-input>
							</el-form-item>
							<el-form-item :label="$t('payment.bankCode')" prop="bankCode">
								<el-input v-model="ruleForm.bankCode"></el-input>
							</el-form-item>
						</template>
						<el-form-item :label="$t('payment.bankAccountType')" prop="bankAccountType">
							<el-radio-group v-model="ruleForm.bankAccountType">
								<el-radio label="1">{{$t('payment.checkAccount')}}</el-radio>
								<el-radio label="2">{{$t('payment.thriftAccount')}}</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item :label="$t('payment.bankArea')" prop="bankArea">
							<el-input v-model="ruleForm.bankArea"></el-input>
						</el-form-item>
						<el-form-item :label="$t('payment.bankAreaCode')" prop="bankAreaCode">
							<el-input v-model="ruleForm.bankAreaCode"></el-input>
						</el-form-item>
						<el-form-item :label="$t('payment.bankAccount')" prop="bankAccount">
							<el-input v-model="ruleForm.bankAccount"></el-input>
						</el-form-item>
						<el-form-item :label="$t('payment.bankAccountName')" prop="bankAccountName">
							<el-input v-model="ruleForm.bankAccountName"></el-input>
						</el-form-item> -->
				</el-form>
			</div>
			<!-- dlocal -->
			<div v-if="dialogData.item.accountType == 10" style="width:80%">
				<el-form v-if="dialogData.item" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">	
					<el-form-item label="SecretKey: " prop="secretKey">
						<el-input v-model="ruleForm.secretKey"></el-input>
					</el-form-item>
					<el-form-item label="XLogin: " prop="xLogin">
						<el-input v-model="ruleForm.xLogin"></el-input>
					</el-form-item>
					<el-form-item label="XTransKey: " prop="xTransKey">
						<el-input v-model="ruleForm.xTransKey"></el-input>
					</el-form-item>
					<el-form-item label="ApiKey: " prop="apiKey">
						<el-input v-model="ruleForm.apiKey"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<!-- ebanx checkout-->
			<div v-if="dialogData.item.accountType == 2 || dialogData.item.accountType == 4" style="width:80%">
				<el-form v-if="dialogData.item" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">	
					<el-form-item label="SecretKey: " prop="secretKey">
						<el-input v-model="ruleForm.secretKey"></el-input>
					</el-form-item>
					<el-form-item label="PublicKey: " prop="publicKey">
						<el-input v-model="ruleForm.publicKey"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<!-- stripe -->
			<div v-if="dialogData.item.accountType == 1" style="width:80%">
				<el-form v-if="dialogData.item" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">	
					<el-form-item label="SecretKey: " prop="secretKey">
						<el-input v-model="ruleForm.secretKey"></el-input>
					</el-form-item>
					<el-form-item label="PublicKey: " prop="publicKey">
						<el-input v-model="ruleForm.publicKey"></el-input>
					</el-form-item>
					<el-form-item label="WebhookSecret: " prop="webhookSecret">
						<el-input v-model="ruleForm.webhookSecret"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<!-- paypal -->
			<div v-if="dialogData.item.accountType == 3" style="width:80%">
				<el-form v-if="dialogData.item" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">	
					<el-form-item :label="$t('payment.username')+':' " prop="username">
						<el-input v-model="ruleForm.username"></el-input>
					</el-form-item>
					<el-form-item :label="$t('payment.password')+':' " prop="password">
						<el-input v-model="ruleForm.password"></el-input>
					</el-form-item>
					<el-form-item :label="$t('payment.signature')+':' " prop="signature">
						<el-input v-model="ruleForm.signature"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<el-alert style="width:70%;margin: 30px auto 20px;" v-if="dialogData.item.accountType == 3"
				:title="$t('payment.paypalText')"
				type="warning" show-icon :closable="false">
			</el-alert>
			<el-divider></el-divider>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeDialog">{{$t('payment.cancel')}}</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')">
					{{$t('payment.confirm')}}
				</el-button>
			</div>
		</el-dialog>
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
	export default {
		props: ["dialogData"],
		data() {
			return {
				editorOption:{
					modules: {
						toolbar: {
							container: [],
						},
					},
				},
				resource: '1',
				ruleForm: {
					bankName: '',
					bankCode: '',
					bankAccountType: '',
					bankArea: '',
					bankAreaCode: '',
					bankAccount: '',
					bankAccountName: '',
					secretKey: '',
					xLogin: '',
					xTransKey: '',
					apiKey: '',
					publicKey: '',
					webhookSecret: '',
					username: '',
					password: '',
					signature: '',
					cname: '',
					info1: '',
					info2: '',
				},
				rules: {
					bankName: [{
							required: true,
							message: this.$t('payment.pleaseEnter') + ' ' + this.$t('payment.bankName'),
							trigger: 'blur'
						}
					],
					bankCode: [{
							required: true,
							message: this.$t('payment.pleaseEnter') + ' ' + this.$t('payment.bankCode'),
							trigger: 'blur'
						}
					],
					bankAccountType: [{
							required: true,
							message: this.$t('payment.pleaseSelect') + ' ' + this.$t('payment.bankAccountType'),
							trigger: 'change'
						}
					],
					bankArea: [{
							required: true,
							message: this.$t('payment.pleaseEnter') + ' ' + this.$t('payment.bankArea'),
							trigger: 'blur'
						}
					],
					bankAreaCode: [{
							required: true,
							message: this.$t('payment.pleaseEnter') + ' ' + this.$t('payment.bankAreaCode'),
							trigger: 'blur'
						}
					],
					bankAccount: [{
							required: true,
							message: this.$t('payment.pleaseEnter') + ' ' + this.$t('payment.bankAccount'),
							trigger: 'blur'
						}
					],
					bankAccountName: [{
							required: true,
							message: this.$t('payment.pleaseEnter') + ' ' + this.$t('payment.bankAccountName'),
							trigger: 'blur'
						}
					],
					secretKey: [{
							required: true,
							message: this.$t('payment.pleaseEnter') + ' secretKey',
							trigger: 'blur'
						}
					],
					xLogin: [{
							required: true,
							message: this.$t('payment.pleaseEnter') + ' xLogin',
							trigger: 'blur'
						}
					],
					xTransKey: [{
							required: true,
							message: this.$t('payment.pleaseEnter') + ' xTransKey',
							trigger: 'blur'
						}
					],
					apiKey: [{
							required: true,
							message: this.$t('payment.pleaseEnter') + ' apiKey',
							trigger: 'blur'
						}
					],
					publicKey: [{
							required: true,
							message: this.$t('payment.pleaseEnter') + ' publicKey',
							trigger: 'blur'
						}
					],
					webhookSecret: [{
							required: true,
							message: this.$t('payment.pleaseEnter') + ' webhookSecret',
							trigger: 'blur'
						}
					],
					username: [{
							required: true,
							message: this.$t('payment.pleaseEnter') + ' ' + this.$t('payment.username'),
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: this.$t('payment.pleaseEnter') + ' ' + this.$t('payment.password'),
							trigger: 'blur'
						}
					],
					signature: [{
							required: true,
							message: this.$t('payment.pleaseEnter') + ' ' + this.$t('payment.signature'),
							trigger: 'blur'
						}
					],
					cname: [{
							required: true,
							message: this.$t('payment.pleaseEnter') + ' ' + this.$t('payment.custompayment'),
							trigger: 'blur'
						}
					],
					info1: [{
							required: true,
							message: this.$t('payment.pleaseEnter') + ' ' + this.$t('payment.otherdetails'),
							trigger: 'blur'
						}
					],
					info2: [{
							required: true,
							message: this.$t('payment.pleaseEnter') + ' ' + this.$t('payment.instructions'),
							trigger: 'blur'
						}
					],
				}
			};
		},
		components: {
			quillEditor,
		},
		methods: {
			onEditorBlur() { //失去焦点事件
				document.querySelector('.ql-editor').setAttribute('data-placeholder', '');
			},
			onEditorFocus() { //获得焦点事件
				document.querySelector('.ql-editor').removeAttribute('data-placeholder', '');
			},
			closeDialog(){
				this.$emit('closeDialog');
			},
			opened(){
				if(this.dialogData.edit){
					this.ruleForm = this.dialogData.params;
				}else{
					this.ruleForm = {};
				}
			},
			submitForm(formName) {
				let type = Number(this.dialogData.item.accountType),
					params = {
						accountType: this.dialogData.item.accountType
					};
				this.$refs[formName].validate((valid) => {
					if (valid) {
						switch (type) {
							//underline
							case 12:
								params.cname = this.ruleForm.cname;
								params.info1 = this.ruleForm.info1;
								params.info2 = this.ruleForm.info2;
								if(this.dialogData.edit){
									params.id = this.dialogData.item.id;
								}
								// params.bankName = this.ruleForm.bankName;
								// params.bankCode = this.ruleForm.bankCode;
								// params.bankAccountType = this.ruleForm.bankAccountType;
								// params.bankArea = this.ruleForm.bankArea;
								// params.bankAreaCode = this.ruleForm.bankAreaCode;
								// params.bankAccount = this.ruleForm.bankAccount;
								// params.bankAccountName = this.ruleForm.bankAccountName;
								break;
							//dlocal
							case 10:
								params.secretKey = this.ruleForm.secretKey;
								params.xLogin = this.ruleForm.xLogin;
								params.xTransKey = this.ruleForm.xTransKey;
								params.apiKey = this.ruleForm.apiKey;
								break;
								//CheckOut
							case 4:
								params.secretKey = this.ruleForm.secretKey;
								params.publicKey = this.ruleForm.publicKey;
								break;
								//paypal
							case 3:
								params.username = this.ruleForm.username;
								params.password = this.ruleForm.password;
								params.signature = this.ruleForm.signature;
								break;
								//ebanx
								case 2:
								params.secretKey = this.ruleForm.secretKey;
								params.publicKey = this.ruleForm.publicKey;
									break;
								//stripe
								case 1:
								params.secretKey = this.ruleForm.secretKey;
								params.publicKey = this.ruleForm.publicKey;
								params.webhookSecret = this.ruleForm.webhookSecret;
									break;
							default:
								break;
						}
						this.$emit('BindAccountPayment',params);
					} else {
						return false;
					}
				});
			}
		}
	}
</script>
<style type="text/css">
	.underline-pay .quill-editor .ql-toolbar{
		display: none!important;
	}
	.underline-pay .quill-editor .ql-container.ql-snow {
	    border: 1px solid #ccc!important;
		min-height: 100px;
		max-height: 100px;
		overflow-y: scroll;
		background: #fff;
	}
</style>