<template>
	<div class="signup-page">
		<div class="home-header">
			<div class="content" v-if="!needSelectShop">
				<h1></h1>
			</div>
			<div class="content d-flex" v-else>
				<div class="d-flex">
					<h1></h1>
					<span class="mg-l-20" style="font-size: 26px;font-weight: 500;">选择店铺</span>
				</div>
				<div class="d-flex">
					<!-- <span style="color:#606266;">登录后的名字</span> -->
					<el-link class="mg-l-20" type="primary" @click="logout">
						退出
					</el-link>
				</div>
			</div>
		</div>
		<div class="home-main">
			<div v-if="!needSelectShop" class="home-main-content">
				<homeAlert />
				<el-card class="box-card signup-box" v-if="isReg == '2'">
					<!-- 注册 -->
					<div class="regTitle">{{$t('signin.注册店铺')}}</div>
					<el-form ref="regForm" :model="regForm" :rules="regRules" :label-width="regStatus.labelWidth">
						<el-form-item prop="userName">
							<el-input v-model="regForm.userName" :disabled="regStatus.loading" clearable
								:placeholder="$t('signin.* 输入邮箱/手机号码（仅支持中国大陆+86）')"></el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input auto-complete="new-password" v-model="regForm.password"
								:disabled="regStatus.loading" show-password :placeholder="$t('signin.* 请输入密码')">
							</el-input>
							<p style="color: #909399; font-size: 12px; line-height: 20px;"><i
									class="el-icon-info"></i>{{$t('signin.（6-20位，需包涵英文字母和数字）')}}</p>
						</el-form-item>

						<div style="margin-top: 20px;margin-bottom: 20px;">
							<vue-simple-verify ref="verify" @success="success" :width="328"
								:tips="$t('signin.getCaptcha')"
								:successTips="`${regStatus.loading ? 'Loading...' : $t('signin.重新获取验证码', { second: regStatus.mobileSeconds })}`"
								movedColor="#5c6ac4" />
						</div>

						<el-form-item prop="token">
							<el-input v-model="regForm.token" :disabled="regStatus.loading"
								:placeholder="$t('signin.* 请输入验证码')"></el-input>
						</el-form-item>
						<el-form-item prop="shopName">
							<el-input v-model="regForm.shopName" :placeholder="$t('signin.* 请输入店铺名称')"></el-input>
							<p style="color: #909399; font-size: 12px; line-height: 20px;"><i
									class="el-icon-info"></i>{{$t('signin.（名称长度需在3~36之间，由字母或数字构成）')}}</p>
						</el-form-item>

						<div v-if="regStatus.error" class="error">
							{{regStatus.error}}
						</div>
						<div v-if="regStatus.success" class="success">{{regStatus.success}}</div>
						<div class="d-flex align-items-center justify-content-between">
							<p class=" d-flex align-items-center diy-wrapper">
								<el-checkbox v-model="regStatus.isAgree" style="margin: 0;font-size: 12px">
									{{$t('signin.agree')}} </el-checkbox>
								<el-link class=" mg-l-5" type="primary" @click="openUserAgreement">
									{{$t('signin.agreement')}}</el-link>
							</p>
						</div>
						<div class="d-flex" style="flex-direction: column; align-items: end;margin-top: 10px;">
							<el-form-item style="margin-bottom: 0">
								<el-button type="primary" :loading="regStatus.loading" style=" margin-right: 15px"
									@click="registers">{{$t('signin.complete')}}</el-button>
							</el-form-item>
						</div>
						<div class=" text-right mg-b-20" style="float:right">
							<el-link class="d-inline" @click="toSignin()" style="font-size: 12px;">
								{{$t('signin.signin')}}</el-link>
						</div>
					</el-form>
				</el-card>
				<el-card class="box-card signup-box" v-else-if="isReg == '1'">
					<!-- 登录 -->
					<div v-if="$store.state.userInfo" slot="header"
						style="line-height: 26px;font-size: 16px; color:#909399 ">
						{{$t('signin.welcome')}}<span style=" color:#606266;">{{$store.state.userInfo.name}}</span>
					</div>

					<div v-if="$store.state.userInfo">
						<el-button type="primary" size="mini" style="margin-right: 15px;" @click="goto('dashboard')">
							{{$t('signin.enter')}}</el-button>
						<a href="javascript:void(0)" style="color:#606266;" @click="logout">{{$t('signin.exit')}}</a>
					</div>
					<el-tabs v-else type="card" v-model="tabAction" @tab-click="handleTab">
						<el-tab-pane :label="$t('signin.密码登录')" name="login">
							<el-form ref="loginForm" :model="loginForm" :rules="loginRules"
								:label-width="loginStatus.labelWidth">
								<el-form-item prop="userName">
									<el-input v-model="loginForm.userName" :disabled="loginStatus.loading" clearable
										:placeholder="$t('signin.mobile')" @keyup.enter.native="focusPassword">
									</el-input>
								</el-form-item>
								<el-form-item prop="password">
									<el-input ref="iptPassword" v-model="loginForm.password"
										:disabled="loginStatus.loading" show-password :placeholder="$t('signin.pass')"
										@keyup.enter.native="login"></el-input>
								</el-form-item>
								<!-- <el-form-item prop="isSubUser" style="margin-bottom:0px">
                  <span style="font-size:12px;color:#606266">
                    <el-checkbox v-model="loginForm.isSubUser">
                      员工账号
                    </el-checkbox>
                  </span>
                </el-form-item> -->
								<div v-if="loginStatus.error" class="error">
									{{loginStatus.error}}
								</div>
							</el-form>
						</el-tab-pane>
						<!-- 验证码登录 -->
						<el-tab-pane :label="$t('signin.验证码登录')" name="codeLogin">
							<el-form ref="loginForm2" :model="loginForm" :rules="loginRules"
								:label-width="loginStatus.labelWidth">
								<el-form-item prop="userName">
									<el-input v-model="loginForm.userName" :disabled="loginStatus.loading" clearable
										:placeholder="$t('signin.mobile')" @keyup.enter.native="focusPassword">
									</el-input>
								</el-form-item>
								<el-form-item>
									<vue-simple-verify ref="verify2" @success="success('login')" :width="328"
										:tips="$t('signin.getCaptcha')"
										:successTips="`${regStatus.loading ? 'Loading...' : $t('signin.重新获取验证码', { second: regStatus.mobileSeconds })}`"
										movedColor="#5c6ac4" />
								</el-form-item>
								<el-form-item>
									<el-input v-model="loginForm.token" :placeholder="$t('signin.请输入验证码')"
										@keyup.enter.native="login"></el-input>
								</el-form-item>
								<!-- <el-form-item prop="isSubUser" style="margin-bottom:0px">
                  <span style="font-size:12px;color:#606266">
                    <el-checkbox v-model="loginForm.isSubUser">
                      员工账号
                    </el-checkbox>
                  </span>
                </el-form-item> -->
								<div v-if="regStatus.error" class="error">
									{{regStatus.error}}
								</div>
								<div v-if="regStatus.success" class="success">{{regStatus.success}}</div>
								<div v-if="loginStatus.error" class="error">
									{{loginStatus.error}}
								</div>
							</el-form>
						</el-tab-pane>
					</el-tabs>
					<div v-if="!$store.state.userInfo">
						<div style="margin-bottom: 0">
							<!-- <el-checkbox 
                v-model="isAutoSignin"
                class="mg-b-10"
                >7天内自动登录
              </el-checkbox><br> -->
							<el-button type="primary" :loading="loginStatus.loading" @click="login"
								style=" margin-right: 15px">{{$t('signin.sign')}}</el-button>
						</div>
						<div class="mg-t-10 d-flex" style="justify-content:space-between">
							<div>
								<!-- <el-checkbox 
                v-model="isAutoSignin"
                >7天内自动登录
               </el-checkbox> -->
							</div>
							<div>
								<el-link class="d-inline" style="font-size: 12px;" @click="isReg = '3'"
									:underline="false">{{$t('signin.忘记密码')}}</el-link>
									<span v-if="$root.$children[0].baseUrl != '/admin'">|</span>
								<el-link v-if="$root.$children[0].baseUrl != '/admin'" class="d-inline" style="font-size: 12px;" @click="isReg = '2'"
									:underline="false">{{$t('signin.免费注册')}}</el-link>
							</div>
						</div>

					</div>
				</el-card>
				<!-- 忘记密码 -->
				<el-card class="box-card signup-box" v-else>
					<div class="regTitle">{{$t('signin.重置登录密码')}}</div>
					<el-form ref="refFrom" :model="formValue" :rules="rules" :label-width="labelWidth">
						<el-form-item prop="userName">
							<el-input v-model="formValue.userName" :disabled="loading" clearable
								:placeholder="$t('signin.mobile')" @keyup.enter.native="focusPassword"></el-input>
						</el-form-item>
						<div style="margin-top: 20px;margin-bottom: 20px;">
							<vue-simple-verify ref="verify3" @success="success2" :width="328"
								:tips="$t('signin.getCaptcha')"
								:successTips="`${loading ? 'Loading...' : $t('signin.重新获取验证码', { second: mobileSeconds })}`"
								movedColor="#5c6ac4" />
						</div>
						<el-form-item prop="token">
							<el-input v-model="formValue.token" :disabled="loading" :placeholder="$t('signin.captcha')">
							</el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input ref="iptPassword" v-model="formValue.password" :disabled="loading" show-password
								:placeholder="$t('signin.请输入新密码')"></el-input>
						</el-form-item>
						<el-form-item prop="rePassword">
							<el-input v-model="formValue.rePassword" :disabled="loading" show-password
								:placeholder="$t('signin.请重新输入新密码')"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="handleReset">{{$t('signin.修改登录密码')}}</el-button>
						</el-form-item>
						<div class=" text-right mg-b-20" style="float:right">
							<el-link class="d-inline" @click="toSignin()" style="font-size: 12px;">{{$t('signin.返回登录')}}
							</el-link>
						</div>
						<div v-if="error" class="error">
							{{error}}
						</div>
					</el-form>
				</el-card>
			</div>
			<div class="home-main-content" v-else>
				<div class="shop-list">
					<h2>活跃店铺</h2>
					<el-card v-for="(item,index) in selectShopList" :key="index" class="mg-b-20">
						<div class="d-flex" style="cursor: pointer;justify-content: space-between;" @click="selectShopLogin(item)">
							<div>
								<h4 style="font-size: 16px;margin-bottom: 10px;font-weight: 500;">{{item.shopName}}</h4>
								<div class="d-flex">
									<span>店铺域名：{{item.firstUrl}}</span>
									<!-- <el-link type="primary" :underline="false"  @click.stop="selectShopUrl(item)">{{item.firstUrl}}</el-link> -->
								</div>
							</div>
							<div>
								<el-link type="info" icon="el-icon-arrow-right" ></el-link>
							</div>
						</div>
					</el-card>
				</div>
			</div>
			<UserAgreementDialog ref="userAgreementDialog" />
			<RetrievePasswordDialog ref="retrievePassword" />
			<Footer v-if="!needSelectShop"/>
		</div>
	</div>
</template>

<script>
	import homeAlert from './../components/homeAlert'
	import Footer from './../components/footer'
	import UserAgreementDialog from "@/components/userAgreementDialog";
	import RetrievePasswordDialog from "@/components/RetrievePasswordDialog";

	export default {
		data() {
			const validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error(this.$t('signin.请再次输入密码')));
				} else if (value !== this.formValue.password) {
					callback(new Error(this.$t('signin.两次输入密码不一致')));
				} else {
					callback();
				}
			};
			return {
				timer: null,
				labelWidth: "0px",
				loading: false,
				formValue: {
					username: '',
					token: '',
					password: "",
					rePassword: "",
				},
				showReSend: true,
				mobileSeconds: 60, // 倒计时
				confirmSuccess: false, // 是否通过滑动验证
				error: null,
				errorT: 0,
				rules: {
					userName: [{
						required: true,
						message: this.$t('signin.enterMobile'),
						trigger: "blur"
					}, ],
					token: [{
						required: true,
						message: this.$t('signin.enterCaptcha'),
						trigger: "blur"
					}],
					password: [{
							required: true,
							message: this.$t('signin.请输入新密码'),
							trigger: "blur"
						},
						{
							min: 6,
							message: this.$t('signin.passBits'),
							trigger: "blur"
						},
						{
							pattern: /(?=.*[0-9])(?=.*[a-zA-Z]).{6,20}/,
							message: this.$t('signin.密码必须包含字母、数字和特殊字符，至少6个字符'),
							trigger: "blur",
						},
					],
					rePassword: [{
						validator: validatePass2,
						trigger: 'blur'
					}]
				},
				isReg: '1',
				isAutoSignin: false,
				tabAction: 'login',
				loginForm: {
					userName: "",
					password: "",
					token: "",
					isSubUser: false,
					time: 60,
					timer: null,
					isGetToken: false,
				},
				loginRules: {
					userName: [{
						required: true,
						message: this.$t('signin.username'),
						trigger: "blur"
					}],
					password: [{
						required: true,
						message: this.$t('signin.passwordMust'),
						trigger: "blur"
					}]
				},
				loginStatus: {
					labelWidth: "0px",
					error: "",
					errorT: 0,
					loading: false,
				},
				regForm: {
					shopName: "",
					userName: "",
					password: "",
					rePassword: "",
					token: "",
				},
				regRules: {
					userName: [{
						required: true,
						message: this.$t('signin.enterMobile'),
						trigger: "blur"
					}, ],
					password: [{
							required: true,
							message: this.$t('signin.enterPass'),
							trigger: "blur"
						},
						{
							min: 6,
							message: this.$t('signin.密码必须包含字母、数字和特殊字符，至少6个字符'),
							trigger: "blur"
						},
						{
							pattern: /(?=.*[0-9])(?=.*[a-zA-Z]).{6,20}/,
							message: this.$t('signin.密码必须包含字母、数字和特殊字符，至少6个字符'),
							trigger: "blur",
						},
					],
					token: [{
						required: true,
						message: this.$t('signin.enterCaptcha'),
						trigger: "blur"
					}],
					shopName: [{
							required: true,
							message: this.$t('signin.请输入店铺名称'),
							trigger: "blur"
						},
						{
							min: 3,
							message: this.$t('signin.店铺名称格式错误'),
							trigger: "blur"
						},
						{
							pattern: /^[A-Za-z0-9]{3,35}$/,
							message: this.$t('signin.店铺名称格式错误'),
							trigger: "blur",
						},
					],
				},
				regStatus: {
					showReSend: true,
					mobileSeconds: 60, // 倒计时
					confirmSuccess: false, // 是否通过滑动验证
					isAgree: true, // 是否同意用户协议
					labelWidth: "0px",
					loading: false,
					error: "",
					errorT: 0,
					success: "",
					successT: 0,
					dialogUserAgreementVisible: false, // 用户协议窗口
				},
				needSelectShop: false,
				selectShopList:[],
				selectShopToken:"",
			};
		},
		components: {
			RetrievePasswordDialog,
			homeAlert,
			Footer,
			UserAgreementDialog,
		},
		computed: {
			lang() {
				let l = "CN"
				if (navigator.appName == 'Netscape') {
					l = navigator.language
				} else {
					l = navigator.browserLanguage
				}

				if (l.indexOf('zh') > -1) {
					return "CN"
				} else {
					return "EN"
				}
			}
		},
		mounted() {
			this.$Burying({
				object: '1001'
			});
			// this.getCookie()
			console.log('my name is john437');
		},
		methods: {
			//设置cookie
			setCookie(c_name, c_pwd, exdays) {
				var exdate = new Date(); //获取时间
				exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
				//字符串拼接cookie
				window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
				window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
			},
			//读取cookie 
			getCookie() {
				if (document.cookie.length > 0) {
					var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
					for (var i = 0; i < arr.length; i++) {
						var arr2 = arr[i].split('='); //再次切割
						//判断查找相对应的值
						if (arr2[0] == 'userName') {
							this.loginForm.userName = arr2[1]; //保存到保存数据的地方
						} else if (arr2[0] == 'userPwd') {
							this.loginForm.password = arr2[1];
						}
					}
					this.isAutoSignin = true;
					this.login()
				}
			},
			//清除cookie
			clearCookie: function() {
				this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
			},
			//忘记密码
			success2() {
				this.confirmSuccess = true
				this.sendToken2()
			},
			dragReset() {
				this.confirmSuccess = false;
				if (this.isReg == 1) {
					this.$refs.verify2.reset()
				} else if (this.isReg == 2) {
					this.$refs.verify.reset()
				} else {
					this.$refs.verify3.reset()
				}
			},
			focusPassword() {
				this.$refs.iptPassword.$refs.input.focus();
			},
			handleReset() {
				this.$refs.refFrom.validate((valid) => {
					if (valid) {
						this.error = "";
						this.loading = true;
						this.$apiCall(
							"api.User.resetPassword", {
								mobile: this.formValue.userName,
								password: this.formValue.password,
								token: this.formValue.token,
								newPassword: this.formValue.password,
								repeatNewPassword: this.formValue.rePassword,
							},
							(r) => {
								this.loading = false;
								if (r.ErrorCode == 9999) {
									this.$message({
										message: this.$t("signin.密码重置成功"),
										type: "success"
									});
									// this.handleClose()
									// clearInterval(this.successT);
									// this.regStatus.success = this.$t('signin.successful');
									// this.regStatus.successT = setInterval(() => {
									//   this.regStatus.success = "";
									// }, 5000);
									// this.$message({ message: this.$t("signin.successful"), type: "success" });
									// this.tabAction = "login"
								} else {
									clearInterval(this.errorT);
									this.error = r.Message;
									this.errorT = setInterval(() => {
										this.error = "";
									}, 5000);
									// this.$message({ message: r.Message, type: "error" });
								}
							}
						);
					}
				});
			},
			sendToken2() { // 获取验证码
				if (this.errorT) {
					clearInterval(this.errorT);
				}
				if (!this.formValue.userName) {
					clearInterval(this.errorT);
					this.error = this.$t('signin.correctNum');
					this.errorT = setInterval(() => {
						this.error = "";
					}, 5000);
					this.dragReset();
					return;
				}
				if (!this.confirmSuccess) {
					clearInterval(this.errorT);
					this.error = this.$t('signin.slideBar');
					this.errorT = setInterval(() => {
						this.error = "";
					}, 5000);
					this.dragReset();
					return;
				}
				this.loading = true;
				this.$apiCall(
					"api.User.sendToken", {
						mobile: this.formValue.userName,
						reset: true,
						lang: this.lang
					},
					(r) => {
						this.loading = false;
						if (r.ErrorCode == 9999) {
							this.mobileSeconds = 60;
							this.showReSend = false;
							let t = setInterval(() => {
								if (this.mobileSeconds <= 1) {
									this.dragReset();
									this.showReSend = true;
									clearInterval(t);
								}
								this.mobileSeconds--;
							}, 1000);
						} else {
							this.dragReset();
							clearInterval(this.errorT);
							this.error = r.Message;
							this.errorT = setInterval(() => {
								this.error = "";
							}, 5000);
						}
					}
				);
			},
			//////////////////////////////////忘记密码end
			logout() {
				localStorage.removeItem('wantVisitPathSu');
				this.$userFailure();
			},
			openRePasswordDialog() {
				this.$refs.retrievePassword.openDialog()
			},
			handleTab() {
				this.loginStatus.error = '';
				this.$refs.loginForm.resetFields();
				this.$refs.loginForm2.resetFields();
				// this.$refs.regForm.resetFields();
			},
			success(i) {
				if (i == "login") {
					this.regForm.userName = this.loginForm.userName;
				}
				this.regStatus.confirmSuccess = true;
				this.$Burying({
					object: '2002'
				})
				this.sendToken()
			},
			openUserAgreement() {
				this.$refs.userAgreementDialog.open()
			},
			goto(name) {
				this.$router.push({
					name
				});
			},
			selectShopUrl(item){
				window.open(`//${item.firstUrl}`,"shopUrl");
			},
			selectShopLogin(item){
				localStorage.setItem('apiShopId', item.shopId);
				this.$apiCall("api.User.login", {
					username: this.loginForm.userName,
					apiShopId: item.shopId,
					token: this.selectShopToken, 
					type: 2,
				},
				r => {
					if (r.ErrorCode == 9999) {
						// alert(`Results=${JSON.stringify(r.Data.Results)}`)
						this.handleLogin(r.Data.Results);
					} else {
					
					}
				});
			},
			handleLogin(Results) {
				localStorage.setItem("apiUserToken",Results.apiUserToken);
				localStorage.setItem("apiUserId", Results.id);
				localStorage.setItem("apiSubUserId", Results.subUserId ? Results.subUserId : "");
				localStorage.setItem("userInfo",JSON.stringify(Results));
				this.$store.commit("setUserInfo", Results);
				this.$root.$children[0].getCnt();
				let reg = /^localhost:/;
				let reg2 = /^sandbox/;
				// alert(`Results=${JSON.stringify(Results)}`)
				//登录后跳转页面
				let admin = ".bcndropshippingelite.com";
				if(this.$root.$children[0].baseUrl != '/admin'){
					admin = ".bcndropshippingelite.com/admin"
				}
				if (localStorage.getItem('wantVisitPathSu')) {
					if (reg.test(window.location.host)) {
						this.$router.push({
							path: localStorage.getItem('wantVisitPathSu')
						});
					}else {
						let e;
						this.$root.$children[0].navMenu.forEach(item=>{
							if(item.path == localStorage.getItem('wantVisitPathSu')){
								e = item;
							}
						})
						if(e.role && this.$isRole(e.role) && (!e.subItem || e.subItem.some(obj => {return obj.role && this.$isRole(obj.role)}))){
							let url;
							if (reg2.test(window.location.host)) {
								url = window.location.href.replace(window.location.host,`//sandbox${this.$store.state.userInfo.shop.name}${admin}`);
							} else {
								url = window.location.href.replace(window.location.host,`//${this.$store.state.userInfo.shop.name}${admin}`);
							}
							let path = e.path.substring(1);//去掉前面的/符号
							window.location = `${url}${path}`;
						}else{
							let e = this.$root.$children[0].navMenu.find(item => {
								return item.role && this.$isRole(item.role) && (!item.subItem || item.subItem.some(obj => {return obj.role && this.$isRole(obj.role)}))
							});
							if(e){
								if (reg.test(window.location.host)) {
									this.$router.push({
										path: e.path
									});
								} else{
									let url;
									if (reg2.test(window.location.host)) {
										url = window.location.href.replace(window.location.host,`//sandbox${this.$store.state.userInfo.shop.name}${admin}`);
									} else {
										url = window.location.href.replace(window.location.host,`//${this.$store.state.userInfo.shop.name}${admin}`);
									}
									let path = e.path.substring(1);//去掉前面的/符号
									window.location = `${url}${path}`;
								}
							}else{
								alert(`没有权限，请联系管理员`)
							}
						}
					}
				} else {
					let e = this.$root.$children[0].navMenu.find(item => {
						return item.role && this.$isRole(item.role) && (!item.subItem || item.subItem.some(obj => {return obj.role && this.$isRole(obj.role)}))
					});
					if(e){
						if (reg.test(window.location.host)) {
							this.$router.push({
								path: e.path
							});
						} else{
							let url;
							if (reg2.test(window.location.host)) {
								url = window.location.href.replace(window.location.host,`//sandbox${this.$store.state.userInfo.shop.name}${admin}`);
							} else {
								url = window.location.href.replace(window.location.host,`//${this.$store.state.userInfo.shop.name}${admin}`);
							}
							let path = e.path.substring(1);//去掉前面的/符号
							window.location = `${url}${path}`;
						}
					}else{
						alert(`没有权限，请联系管理员`)
					}
					// this.$router.push({ name: "dashboard" });
				}
			}, 
			login() {
				// if(this.isAutoSignin){
				//   this.setCookie(this.loginForm.userName,this.loginForm.password,7);
				// }else {
				//  this.clearCookie()
				// }
				if (this.tabAction == "login") {
					this.$refs.loginForm.validate(valid => {
						if (valid) {
							this.loginStatus.error = '';
							this.loginStatus.loading = true;
							this.$Burying({
								object: '1002'
							})
							this.toLogin();
						}
					});
				} else {
					this.$refs.loginForm2.validate(valid => {
						if (valid) {
							this.loginStatus.error = '';
							this.loginStatus.loading = true;
							this.$Burying({
								object: '1002'
							})
							this.toLogin();
						}
					});
				}

			},
			toLogin() {
				const rid = this.$route.query.rid || '';
				this.$apiCall(
					"api.User.login", {
						// isSubUser:this.loginForm.isSubUser, //是否子账号
						username: this.loginForm.userName,
						password: this.loginForm.password,
						token: this.loginForm.token, //验证码
						type: 2,
						relationshipId: rid,
					},
					r => {
						if (r.ErrorCode == 9999) {
							this.$Burying({
								object: '1005'
							})
							if(!r.Data.Results.chooseStore){
								this.handleLogin(r.Data.Results);
							}else{
								this.needSelectShop = true;
								this.selectShopList = r.Data.Results.shops || [];
								this.selectShopToken = r.Data.Results.token;
							}
						} else {
							this.$Burying({
								object: '1006'
							})
							this.loginStatus.loading = false;
							clearInterval(this.loginStatus.errorT)
							this.loginStatus.error = r.Message;
							this.loginStatus.errorT = setInterval(() => {
								this.loginStatus.error = '';
							}, 5000)
						}
					}
				);
			},
			registers() {
				const rid = this.$route.query.rid || ''
				if (!this.regStatus.isAgree) {
					clearInterval(this.regStatus.errorT);
					this.regStatus.error = this.$t('signin.read');
					this.regStatus.errorT = setInterval(() => {
						this.regStatus.error = "";
					}, 5000);
					return;
				}
				this.$refs.regForm.validate((valid) => {
					if (valid) {
						this.regStatus.error = "";
						this.regStatus.loading = true;
						this.$Burying({
							object: '2001'
						})
						this.$apiCall(
							"api.User.register", {
								shopName: this.regForm.shopName,
								username: this.regForm.userName,
								password: this.regForm.password,
								code: this.regForm.token,
								type: 2,
								ivc: this.$route.query.ivc,
								relationshipId: rid,
								isLogin: true,
								lang: this.lang
							},
							(r) => {
								this.regStatus.loading = false;
								if (r.ErrorCode == 9999) {
									this.$Burying({
										object: '2004'
									})
									this.handleLogin(r.Data.Results)
									// clearInterval(this.successT);
									// this.regStatus.success = this.$t('signin.successful');
									// this.regStatus.successT = setInterval(() => {
									//   this.regStatus.success = "";
									// }, 5000);
									// this.$message({ message: this.$t("signin.successful"), type: "success" });
									// this.tabAction = "login"
								} else {
									this.$Burying({
										object: '2005'
									})
									clearInterval(this.regStatus.errorT);
									this.regStatus.error = r.Message;
									this.regStatus.errorT = setInterval(() => {
										this.regStatus.error = "";
									}, 5000);
									this.$message({
										message: r.Message,
										type: "error"
									});
								}
							}
						);
					}
				});
			},
			sendToken() { // 获取验证码
				clearInterval(this.timer);
				if (!this.regForm.userName) {
					clearInterval(this.regStatus.errorT);
					this.regStatus.error = this.$t('signin.correctNum');
					this.regStatus.errorT = setInterval(() => {
						this.regStatus.error = "";
					}, 5000);
					this.dragReset();
					return;
				}
				if (!this.regStatus.confirmSuccess) {
					clearInterval(this.regStatus.errorT);
					this.regStatus.error = this.$t('signin.slideBar');
					this.regStatus.errorT = setInterval(() => {
						this.regStatus.error = "";
					}, 5000);
					this.dragReset();
					return;
				}
				this.regStatus.loading = true;
				this.$apiCall(
					"api.User.sendToken", {
						mobile: this.regForm.userName,
						lang: this.lang
					},
					(r) => {
						this.regStatus.loading = false;
						if (r.ErrorCode == 9999) {
							this.regStatus.mobileSeconds = 60;
							this.regStatus.showReSend = false;
							this.timer = setInterval(() => {
								if (this.regStatus.mobileSeconds <= 1) {
									this.dragReset();
									this.regStatus.showReSend = true;
									clearInterval(this.timer);
								}
								this.regStatus.mobileSeconds--;
							}, 1000);
						} else {
							this.dragReset();
							clearInterval(this.regStatus.errorT);
							this.regStatus.error = r.Message;
							this.regStatus.errorT = setInterval(() => {
								this.regStatus.error = "";
							}, 5000);
						}
					}
				);
			},
			toSignin() {
				this.tabAction = 'login'
				this.isReg = '1';
			}
		}
	};
</script>
<style>
	.diy-wrapper .el-checkbox__label,
	.diy-wrapper .el-link--inner {
		font-size: 12px !important;
	}

	.home-header {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 90px;
		z-index: 1;
	}

	.home-header .content {
		display: flex;
		align-items: center;
		margin: 0 auto;
		width: 1280px;
		height: 90px;
		justify-content: space-between;
	}

	.home-header .content h1 {
		width: 250px;
		height: 32px;
		background-image: url("./../../public/images/logo.png");
		background-position: center;
		background-repeat: no-repeat;
		background-size: contain;
	}

	.home-main {
		margin: 0 auto;
		max-width: 1980px;
		min-width: 1280px;
		min-height: 500px;
		padding-top: 90px;
		height: 100%;
		background-position: 0 90px;
		background-image: url("./../../public/images/bg.jpg");
		background-size: cover;
		background-repeat: no-repeat;
		position: relative;
	}
</style>
<style scoped>
	.home-main-content {
		margin: 0 auto;
		width: 1280px;
		height: 100%;
		position: relative;
	}

	.signup-page {
		position: relative;
		height: 100%;
		min-height: 750px;
	}

	.signup-box {
		position: absolute;
		top: 120px;
		right: 10px;
		width: 370px;
	}

	.error {
		position: relative;
		top: -10px;
		color: #F56C6C;
		font-size: 12px;
	}

	.signup-page ::v-deep .el-form-item__error {
		position: absolute !important;
		top: 100% !important;
		left: 0 !important;
		margin: 0 !important;
	}

	.signup-page ::v-deep .el-form-item {
		margin-bottom: 25px;
	}

	.regTitle {
		text-align: center;
		font-size: 20px;
		color: #4E4E4E;
		margin-bottom: 15px;
	}
	.shop-list{
		height: 100%;
		background: #fff;
		padding: 30px 50px;
		overflow-y: scroll;
	}
	.shop-list h2{
		font-size: 26px;
		font-weight: 500;
		margin-bottom: 30px;
	}
</style>
