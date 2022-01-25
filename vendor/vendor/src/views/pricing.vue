<template>
	<div class="contentpanel dashboard-page">
		<div class="pagetitle">
			<div class="left">
				<div class="title">
					<i class="el-icon-bank-card"></i>
					<h2>{{$t('pricing.Pricing')}}</h2>
				</div>
			</div>
			<div class="right"></div>
		</div>
		<div class="pagebody">
			<el-row :gutter="15" class=" mg-b-20">
				<el-col :span="24">
					<el-row :gutter="30" class=" mg-b-20">
						<el-col :span="8">
							<div class="price">
								<div class="price-free tx-center">
									<p class="price-title">{{$t('pricing.Basic')}}</p>
									<p class="price-price" style="line-height: 27px;">{{$t('pricing.Free')}}</p>
									<template v-if="!isOverTimeBefore()">
										<div class="mg-t-30">
											<!--<el-tag type="info">当前使用版本</el-tag>-->
											<el-button>{{$t('pricing.Currentuse')}}</el-button>
										</div>
										<p class="mg-t-15" style="opacity: 0;">
											<el-link :underline="false" type="primary">主要链接</el-link>
										</p>
									</template>
									<template v-else>
										<el-button style="opacity: 0;margin-top: 20px;">{{$t('pricing.Currentuse')}}</el-button>
									</template>
								</div>
								<!--<el-divider></el-divider>-->
								<div class="price-detail" style="padding: 20px;">
									<p>
										<i class="el-icon-circle-check"></i> {{$t('pricing.unlimitedmonthly')}}
									</p>
									<p>
										<i class="el-icon-circle-check"></i> {{$t('pricing.Unlimited')}}
									</p>
									<p>
										<i class="el-icon-circle-check"></i> {{$t('pricing.Export')}}
									</p>
									<p>
										<i class="el-icon-circle-check"></i> {{$t('pricing.markorder')}}
									</p>
								</div>
							</div>
						</el-col>
						<el-col :span="15">
							<div class="price pro-price">
								<div class="price-free price-pro tx-center">
									<div class="star">
										<i class="el-icon-star-on"></i> {{$t('pricing.Recommend')}}
									</div>
									<p class="price-title">{{$t('pricing.Professional')}}</p>
									<div>
										<span class="price-price">US$ 19</span>
										<span> / {{$t('pricing.month')}}</span>
									</div>
									<template v-if="isOverTimeBefore()">
										<el-button style="margin-top: 20px;">{{$t('pricing.Currentuse')}} ({{$t('pricing.Expiration')}}： {{$moment(userInfo.overTime*1000).format('YYYY-MM-DD')}})</el-button>
										<el-button type="primary" @click="pricingOpen">{{$t('pricing.Renewal')}}</el-button>
									</template>
									<template v-else>
										<div class="mg-t-30">
											<el-button type="primary" @click="pricingOpen">{{$t('pricing.Upgrade')}}</el-button>
										</div>
										<p class="mg-t-15">
											<el-link :underline="false" type="primary" @click="pricingOpen">{{$t('pricing.havediscount')}}</el-link>
										</p>
									</template>
								</div>
								<!--<el-divider></el-divider>-->
								<div class="price-detail price-pro-detail">
									<el-row>
										<el-col :span="12" style="padding-right: 0;">
											<h4>{{$t('pricing.basicedition')}}</h4>
											<p v-for="(item,index) in carouselItemsText" :key="index" :class="activeIndex == index ? 'has-hover' : ''" @click="setActiveItem(index)">
												<i class="el-icon-circle-check"></i> {{item.title}}
											</p>
										</el-col>
										<el-col :span="12" style="background: rgba(92,106,196,.12);">
											<el-carousel @change="handleChange()" ref="pricingCarousel" direction="vertical" :interval="10000" :autoplay="autoplay" :loop="true" indicator-position="none">
												<el-carousel-item v-for="(item,index) in carouselItems" :key="index">
													<h4 class="medium">{{item.title}}</h4>
													<p>{{item.content}}</p>
													<img :src="item.img" width="100%" />
												</el-carousel-item>
											</el-carousel>
										</el-col>
									</el-row>
								</div>
							</div>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</div>
		<el-dialog v-loading="pricingDialog.loading" :visible.sync="pricingDialog.isShow"
			:width="'400px'"
			:show-close="pricingDialog.status == 1"
			:close-on-click-modal="false"
			:close-on-press-escape="false"
			append-to-body>
			<template v-if="pricingDialog.status == 1">
			<div class="tx-center dialog-content">
				<div class="grid-top">
					<i class="fa fa-diamond"></i>
				</div>
				<h4>{{$t('pricing.Professional')}}</h4>
				<div class="mg-b-20">
					<span class="price-price">
		    		US$ 19
		    	</span>
					<span> / {{$t('pricing.month')}}</span>
				</div>
				<el-divider></el-divider>
				<div class="discount">
					<div v-if="userInfo.overTime > 0" class="d-flex">
						<span style="width: 130px;text-align: right;display: inline-block;">{{$t('pricing.Expiration')}}：</span>
						<span>{{$moment(userInfo.overTime*1000).format('YYYY-MM-DD')}}</span>
					</div>
					<div class="d-flex mg-t-10">
						<span style="width: 130px;text-align: right;display: inline-block;">{{$t('pricing.Renewalmonth')}}：</span>
						<el-input-number :min="1" :step="1" step-strictly size="mini" v-model="months"  @focus.native="handleChange()"></el-input-number>
						<span style="margin-left: 10px;">个月</span>
					</div>
					<div class="d-flex mg-t-10">
						<span style="width: 130px;text-align: right;display: inline-block;">{{$t('pricing.Validto')}}：</span>
						<span>{{overTime ? $moment(overTime*1000).format('YYYY-MM-DD') : '-'}}</span>
					</div>
					<div class="d-flex mg-t-10">
						<span style="width: 130px;text-align: right;display: inline-block;">{{$t('pricing.Amount')}}：</span>
						<span class="tx-bold">US$ {{19*months}}</span></div>
					<div class="code d-flex mg-t-10">
						<span style="width: 130px;text-align: right;display: inline-block;">{{$t('pricing.Discount')}}：</span>
						<el-input size="mini" style="width: 200px;margin: 0;" v-model="code" :placeholder="$t('pricing.fillcode')" @keyup.native="getCode(2)" @keyup.enter.native="getCode(2)"></el-input>
					</div>
					<div v-if="codeFail" class="d-flex mg-t-5">
						<span style="width: 130px;text-align: right;display: inline-block;"></span>
						<p class="tx-danger mg-b-0" style="margin-bottom: 0;">{{codeFail}}</p>
					</div>
					<div class="d-flex mg-t-10">
						<span style="width: 130px;text-align: right;display: inline-block;">{{$t('pricing.afterdiscount')}}：</span>
						<span v-if="code && discount" class="tx-bold">US$
							<span v-if="months <= Number(discount.discount)">0</span>
							<span v-if="months > Number(discount.discount)">{{(months - Number(discount.discount)) * Number(discount.price)}}</span>
						</span>
						<span v-else-if="!discount" class="tx-bold">US$ {{19*months}}</span>
						<span v-else class="tx-bold">US$ {{19*months}}</span>
					</div>
				</div>
			</div>
			<el-divider></el-divider>
			<div slot="footer" class="dialog-footer d-flex justify-content-center">
				<!--<el-button @click="pricingDialog.isShow = false">我再看看</el-button>-->
				<template  v-if="code && !codeFail">
					<el-button v-if="months <= Number(discount.discount)" type="primary" @click="getCode(1)">{{$t('pricing.Upgrade')}}</el-button>
					<el-button v-else-if="(months - Number(discount.discount)) * Number(discount.price) > 0" type="primary" @click="gotoPay()">{{$t('pricing.Pay')}}</el-button>
				</template>
				<template v-else>
					<el-button type="primary" @click="gotoPay()">{{$t('pricing.Pay')}}</el-button>
				</template>
			</div>
			</template>
			<div v-else class=" mg-b-30 tx-center">支付进行中。如果遇到问题请<el-link type="primary" @click.native="resetPage">重试</el-link></div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				autoplay: true,
				carouselItems: [{
					title: this.$t('pricing.carouselTitle1'),
					content: this.$t('pricing.carouselText1'),
					img: 'images/pricing1.jpg',
				}, {
					title: this.$t('pricing.carouselTitle2'),
					content: this.$t('pricing.carouselText2'),
					img: 'images/pricing2.jpg',
				}, {
					title: this.$t('pricing.carouselTitle3'),
					content: this.$t('pricing.carouselText3'),
					img: 'images/pricing3.jpg',
				}, {
					title: this.$t('pricing.carouselTitle4'),
					content: this.$t('pricing.carouselText4'),
					img: 'images/pricing3.jpg',
				}],
				carouselItemsText: [{
					title: this.$t('pricing.carouselTitle1'),
				}, {
					title: this.$t('pricing.carouselTitle2'),
				}, {
					title: this.$t('pricing.carouselTitle3'),
				}, {
					title: this.$t('pricing.carouselTitle4'),
				}],
				activeIndex: 0,
				pricingDialog:{
					loading:false,
					isShow:false,
					status: 1,
				},
				code:"",
				codeFail:"",
				discount:0,
				months:1,
				userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : "",
				payTime: 0,
				overTime: '',
			};
		},
		components: {},
		mounted() {
			this.getOverTime();
//			let userInfo = JSON.parse(JSON.stringify(this.$store.state.userInfo));
//		    userInfo.overTime = 0;
//	        localStorage.setItem("userInfo", JSON.stringify(userInfo));
//	        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
		},
		beforeDestroy(){
			clearInterval(this.payTime)
		},
		watch: {
		  'code': {
		    handler (val, oldVal) {
		      this.code = val.toUpperCase()
		    },
		    deep: true
		  },
		  'months': {
		    handler (val, oldVal) {
					this.getOverTime()
		    	if(val.length){
			      if(isNaN(val)){
			        this.months = 1;
			      }else if(parseInt(val) < 0){
			        this.months = 1;
			      }else{
			        this.months = parseInt(Number(val));
			      }
			    }
//		      this.code = val.toUpperCase()
		    },
		    deep: true
		  },
		},
		methods: {
			getOverTime(){
				this.$apiCall("api.User.getTime",{vipCount: this.months}, r => {
					if (r.ErrorCode == 9999) {
						this.overTime = r.Data.Results.overTime;
					}else{
						this.$elementMessage(r.Message, 'error');
					}
				})
			},
			resetPage(){
				this.pricingDialog.loading = true;
				this.$apiCall("api.User.checkLoginStatus", {}, (r)=>{
					localStorage.setItem(
					"apiUserToken",
					r.Data.Results.apiUserToken
				);
				localStorage.setItem("apiUserId", r.Data.Results.id);
				localStorage.setItem(
					"userInfo",
					JSON.stringify(r.Data.Results)
				);
				location.reload();
				});
			},
			handleChange(){
				if(this.months.length){
			      if(isNaN(this.months)){
			        this.months = 1;
			      }else if(parseInt(this.months) < 0){
			        this.months = 1;
			      }else{
			        this.months = parseInt(Number(this.months));
			      }
			    }
			},
			gotoPay(){
				let newWin = window.open(undefined, "pricingToPay");
				let params = {
					isInviteCode: this.code && !this.codeFail ? this.code : '',
					vipCount: this.months,
				}
				this.pricingDialog.status = 2;
				this.$Burying({
					object: '9003'
				})
				this.$apiCall("api.User.goToPay", params, r => {
					if (r.ErrorCode == 9999) {
						newWin.location.href = r.Data.Results;
						this.payTime = setInterval(()=>{
							this.$apiCall('api.User.getPayStatus', {}, r => {
								if (r.ErrorCode == 9999) {
									let status = r.Data.Results.status;
									if(status != 1){
										clearInterval(this.payTime)
									}
									if(status == 2){
										this.pricingDialog.isShow = false;
										this.pricingDialog.status = 1;
										this.$Burying({
											object: '9004'
										})
										this.$elementMessage('支付成功', 'success');
										newWin.close();
										setTimeout(()=>{
											this.$apiCall("api.User.checkLoginStatus", {}, r => {
												localStorage.setItem(
												"apiUserToken",
												r.Data.Results.apiUserToken
											);
											localStorage.setItem("apiUserId", r.Data.Results.id);
											localStorage.setItem(
												"userInfo",
												JSON.stringify(r.Data.Results)
											);
											location.reload();
											});
										},2000)
									}else if(status == 3){
										this.pricingDialog.status = 1;
										this.$Burying({
											object: '9005'
										})
										this.$elementMessage(r.Data.Results.message, 'error');
										newWin.close();
									}
								}
							})
						},3000)
					}else{
						this.$elementMessage(r.Message, 'error');
					}
				})
			},
			getCode(type){
				let time = 500;
				let params={
					code: this.code,
				}
				if (this.timer) {
		          	clearTimeout(this.timer)
		        }
				if(type == 1){
					time = 0;
					params.isConfirm = true;
				}
		        this.timer = setTimeout(() => {
		        	this.codeFail = "";
		        	this.discount = "";
		        	this.$showLoading();
		          	this.$apiCall("api.User.getVip",params, (r) => {
		          		this.$hideLoading();
			          	if (r.ErrorCode == 9999) {
			           		this.discount = r.Data.Results;
					        if(type == 1){
					        	let userInfo = JSON.parse(
						          JSON.stringify(this.$store.state.userInfo)
						        );
						      	userInfo.overTime = Number(r.Data.Results.overTime);
						        localStorage.setItem("userInfo", JSON.stringify(userInfo));
						        this.$store.commit("setUserInfo", userInfo);

						        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
					        	this.pricingDialog.isShow = false;
										this.$elementMessage(this.$t('pricing.successUpgrade'), "success");
										this.$apiCall("api.User.checkLoginStatus", {}, r => {
											localStorage.setItem(
											"apiUserToken",
											r.Data.Results.apiUserToken
										);
										localStorage.setItem("apiUserId", r.Data.Results.id);
										localStorage.setItem(
											"userInfo",
											JSON.stringify(r.Data.Results)
										);
										location.reload();
										});

					        }else{
					        	if(this.months <= Number(this.discount.discount)){
					        		this.months = Number(this.discount.discount);
					        	}
					        }
			          	} else {
			          		this.codeFail = r.Message;
			          	}
			        });
		        }, time)
			},
			pricingOpen() {
				this.codeFail = "";
		        this.discount = "";
				this.code = "";
				this.pricingDialog.loading = false;
				this.pricingDialog.status = 1;
				this.pricingDialog.isShow = true;
//				this.$showLoading();
//				this.$apiCall("api.User.getVip",{}, (r) => {
//					this.$hideLoading();
//		          	if (r.ErrorCode == 9999) {
//		           		this.discount = r.Data.Results;
//				        this.code = "";
//						this.pricingDialog.isShow = true;
//		          	}
//		       });
			},
			isOverTimeBefore(){
				let now = this.$moment().unix();
				if (this.userInfo.overTime == 0) {
					return false;
				} else{
					return this.$moment(now).isBefore(Number(this.userInfo.overTime),'second');
				}
//				console.log(this.$moment(now).isBefore(this.userInfo.overTime,'second'))
			},
			handleChange() {
				this.activeIndex = this.$refs.pricingCarousel.activeIndex;
			},
			setActiveItem(i) {
				this.autoplay = false;
				this.$refs.pricingCarousel.setActiveItem(i);
			},
		},
	};
</script>
<style scoped="scoped" lang="scss">
	.price {
		background: #fff;
		border: 1px solid #EBEEF5;
		border-radius: 5px;
		.price-free {
			position: relative;
			padding: 20px;
			.price-title {
				margin-top: 10px;
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 30px;
			}
			.price-price {
				font-size: 24px;
				font-weight: bold;
				line-height: 24px;
			}
			.star {
				padding: 6px 12px;
				background: rgb(67, 70, 127);
				color: #fff;
				position: absolute;
				top: 20px;
				left: -15px;
				display: flex;
				align-items: center;
				i {
					font-size: 20px;
					color: #409EFF;
				}
			}
		}
		.price-detail {
			padding: 0;
			border-top: 1px solid #dcdfe6;
			p {
				padding: 10px;
				i {
					color: #67C23A;
					margin-right: 5px;
					font-size: 16px;
				}
			}
			h4 {
				font-weight: bold;
				margin-bottom: 20px;
			}
		}
		.price-pro-detail {
			p {
				cursor: pointer;
			}
			p:hover,
			p.has-hover {
				background: rgba(92, 106, 196, .12);
				i:before {
					content: "\e79c";
				}
			}
			.el-carousel__item {
				h4 {
					font-weight: bold;
					margin-bottom: 15px;
				}
				p {
					padding: 0;
					margin-bottom: 15px;
				}
				img {
					margin-bottom: 15px;
				}
			}
			.el-col {
				padding: 30px 20px;
			}
		}
	}
	.pro-price {
		border: 1px solid #5c6ac4;
	}
	.dialog-content{
		.grid-top{
			width: 50px;
	    height: 50px;
	    line-height: 50px;
	    text-align: center;
	    background-color: rgba(92,106,196,.12);
	    border-radius: 50%;
	    color: #5c6ac4;
	    font-size: 22px;
	    margin: 0 auto 30px;
		}
		h4{
			margin-top: 10px;
	    font-size: 18px;
	    font-weight: bold;
	    margin-bottom: 30px;
		}
		.price-price{
			font-size: 24px;
			font-weight: bold;
			line-height: 24px;
		}
		.discount{
			margin: 20px 0;
			p{
				margin-bottom: 15px;
			}
			.code {
				p{
					margin-bottom: 0;
				}
				.el-input{
					margin: 5px 0;
				}
			}
		}
	}
</style>
