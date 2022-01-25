<template>
	<div class="guide-wrap" v-loading="loading">
		<!--<div class="guide-img">
		</div>-->
		<a v-if="haveShownGuide" @click="guideClose" href="javascript:;" style="position: fixed;top: 50px;right: 50px;z-index: 9999;color: #fff;font-size: 20px;"><i class="el-icon-close"></i></a>
		<div>
			<div v-if="guideStep == 1 || guideStep == 2">
				<img src="./../../public/images/guide2/guide1.png" />
				<!-- <div class="alert-wrap d-flex justify-content-between">
					<div>
						<div class="is-bold">0 Shopify order(s) selected.Now you can dispatch to your vendor(s)</div>
						<div class="d-flex">
							<span style="margin-right: 10px;">Dispatch to:</span>
							<div class="d-flex align-items-center">
								<el-button class="button-new-tag" size="small">+ Choose a vendor</el-button>
							</div>
						</div>
					</div>
					<el-button class="button-new-tag" type="success" size="small">Make a purchase order</el-button>
				</div> -->
			</div>
			<div v-else-if="guideStep == 3">
				<img src="./../../public/images/guide2/guide_bg_2.png" />
			</div>
			<div v-else-if="guideStep == 4">
				<img src="./../../public/images/guide2/guide_bg_4.png" />
			</div>
		</div>
		<!-- 引导内容 -->
		<div class="mask" :class="guideStep == 5 || guideStep == 6 ? 'mask-white' : ''">
			<div class="guide guide1" v-if="guideStep == 1">
				<div class="left-menu">
					<i class="iconfont icon-shopify"></i><span>Orders</span>
				</div>
				<div class="content-over">
					<div class="content-wrap">
						<div class="guide-step guide-step1"></div>
						<div class="content-title">
							Choose the products from your Shopify orders to allocated to your vendor
						</div>
						<div style="margin-bottom: 10px; color: font-size: 14px;">
							Click the <b>Allocate to vendor</b> button on the bottom of the page.
						</div>
						<img src="./../../public/images/guide2/guide1-1.png" width="100%" style="border: 1px solid #ddd;"/>
					</div>
					<div class="content-wrap">
						<div class="guide-step guide-step2"></div>
						<div class="content-title">
							Tips: You can filter your orders here.
						</div>
						<img src="./../../public/images/guide2/guide1-3.png" width="100%" style="border: 1px solid #ddd;"/>
					</div>
				</div>
			</div>
			<!-- step02 -->
			<div class="guide guide2" v-if="guideStep == 2">
				<div class="left-menu">
					<i class="iconfont icon-shopify"></i><span>Orders</span>
				</div>
				<!-- <div class="bottom-menu">
					<div class="guide-step guide-step3"></div>
					<el-button class="button-new-tag" size="small">+ Choose a vendor</el-button>
				</div> -->
				<div class="content-over">
				<div class="content-wrap" style="top: 15px; left:40%;">
					<div class="guide-step guide-step1"></div>
					<div class="content-title">
						Choose or create a new vendor.
					</div>
					<div class="content-sub-title" style=" margin-bottom: 15px">
						You can create a new vendor or select an exist one.
					</div>
					<div class="tx-center">
						<img src="./../../public/images/guide2/guide2-1.png" width="100%" style="border: 1px solid #ddd;"/>
					</div>
				</div>
				<div class="content-wrap" style="top: 5px; left: 40%;">
					<div class="guide-step guide-step2" style=" top: 225px;"></div>
					<div class="content-title">
						Click the <b>Allocate</b> button of the page,you can also allocate items from the same SPU to the same vendor
					</div>
					<img src="./../../public/images/guide2/guide2-2.png" width="100%"/>
				</div>
				</div>
			</div>
			<!-- step3 -->
			<div class="guide guide3" v-if="guideStep == 3">
				<div class="left-menu">
					<i class="iconfont icon-shopify"></i><span>Orders</span>
				</div>
				<div class="bottom-menu" style="right: 120px; bottom: 50px;">
					<div class="guide-step guide-step3"></div>
				</div>
				<div class="guide-2-bottom">
					<div class="content">
						<div>
							<el-button size="small" type="danger">Un-allocate selected products</el-button>
						</div>
						<div class="right">
							<div>Total vendors: <span> 1</span></div>
							<div>Total orders: <span> 104</span></div>
							<el-button size="small" type="primary">Place 1 purchase orders</el-button>
						</div>
					</div>
				</div>
				<div class="content-over">
					<div class="content-wrap">
						<div class="guide-step guide-step1"></div>
						<div class="content-title">
							Create a purchase orders to your vendor.
						</div>
						<div class="content-sub-title">
							Choose the Shopify orders you want to sourcing,and click the <b>Make a purchase order</b> button of the page.
						</div>
						<div class="tx-center">
							<img src="./../../public/images/guide2/guide3-1.png"  style="border: 1px solid #ddd;"/>
						</div>
					</div>
					<div class="content-wrap">
						<div class="guide-step guide-step2"></div>
						<div class="content-title">
							After confirming the operation,The purchase orders will be created successfully.
						</div>
						<img src="./../../public/images/guide2/guide3-2.png" width="100%" style="border: 1px solid #ddd;"/>
					</div>
				</div>
			</div>
			<!-- step4 -->
			<div class="guide guide4" v-if="guideStep == 4">
				<div class="left-menu" style=" top: 185px;">
					<i class="iconfont icon-shopify"></i><span>Orders</span>
				</div>
				<div class="content-over">
				<div class="content-wrap" style=" top: 50px;">
					<div class="guide-step guide-step1"></div>
					<div class="content-title">
						Share purchase orders URL to your vendor and wait your vendor finish the invoice for you.
					</div>
					<div class="content-sub-title">
						Click the <b>Invite vendor to process</b> button on the bottom of the page.
					</div>
					<div class="tx-center">
						<img src="./../../public/images/guide2/guide4-1.png" width="100%"/>
					</div>
				</div>
				<div class="content-wrap" style=" top: 50px;">
					<div class="guide-step guide-step2"></div>
					<div class="content-title" style="margin-top: 20px;">
						You can send the purchase orders by Skype, WeChat or share by URL link.
					</div>
					<img src="./../../public/images/guide/guide2-2.png" width="100%" style="margin-bottom: 5px; border: 1px solid #ddd;"/>
					<img src="./../../public/images/guide/guide2-3.png" width="100%" style="border: 1px solid #ddd;"/>
				</div>
				</div>
			</div>
			<div class="guide guide5" v-if="guideStep == 5">
				<div class="menu-wrap5">
					<div class="bottom-menu" style="right: 211px;">
						<div class="guide-step guide-step3"></div>
						<el-button style="margin-right: 15px;" type="primary" size="medium">I have finished the payment</el-button>
					</div>
				</div>
				<div class="mask-step5">
					<img src="./../../public/images/guide2/guide5-bg.png" />
					<div style="min-height: 50px;z-index: 0;" class="page-footer mg-t-30 mg-b-10">
						<el-row style="width: 1224px;">
							<el-col :span="24">
								<div class="grid-content invoice-bottom">
									<div class="d-flex justify-content-end mg-b-10">
										<div class="">Items total (US$)  :</div>
										<div class="mg-l-5 pd-r-15">560.00</div>
									</div>
									<div class="d-flex justify-content-end">
										<div class="">Shipping costs (US$) :</div>
										<div class="mg-l-5 pd-r-15">
											0.00
										</div>
									</div>
									<el-divider></el-divider>
									<div class="d-flex justify-content-end mg-t-10 bold-input">
										<div class="tx-bold">Amount Due (US$) :</div>
										<div class="mg-l-5 pd-r-15" style="font-size: 16px;font-weight: bold;">
											0.00
										</div>
									</div>
									<div class="d-flex justify-content-end mg-t-10" style="align-items: flex-start;">
										<div class="">Payment method :</div>
										<div class="mg-l-5 pd-r-15">
											Through AliExpress proxy payment link
										</div>
									</div>
									<div class="mg-t-10 normal-input pd-r-15" style="text-align: right;">
										<el-button size="medium" type="primary">I have finished the payment</el-button>
										<el-button size="medium" type="success">Invite vendor to proess purchase order</el-button>
									</div>
								</div>
							</el-col>
						</el-row>
					</div>
				</div>
				<div class="content-over">
				<div class="content-wrap">
					<div class="guide-step guide-step1"></div>
					<div class="content-title">
						After you receive the vendor's invoice and finished the payment.
					</div>
					<div class="content-sub-title">
						Click the button <b>I have finished the payment</b> on the PO page when you finished your payment.
					</div>
					<div class="tx-center">
						<img src="./../../public/images/guide2/guide5-1.png" width="100%" style="border: 1px solid #ddd;"/>
					</div>
				</div>
				</div>
			</div>
			<div class="guide guide6" v-if="guideStep == 6">
				<div class="mask-step5">
					<img src="./../../public/images/guide2/guide5-bg.png" />
				</div>
				<div class="content-over">
				<div class="content-wrap">
					<div class="guide-step guide-step1"></div>
					<div class="content-title">
						After vendor shipped, Shopify order will be fulfilled automatically.
					</div>
					<div class="content-sub-title">
						After your vendor shipped your order, the shipping information will be sync to your Shopify store automatically.
					</div>
					<img src="./../../public/images/guide2/guide6-1.png" width="100%" style="border: 1px solid #ddd;"/>
				</div>
				</div>
			</div>
			<div class="btn-wrap">
				<el-button v-if="guideStep>1" size="samll" type="primary" @click="guideChangeStep(1)">Previous</el-button>
				<el-button :loading="loading" size="samll" type="primary" @click="guideChangeStep(2)">Next</el-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
			loading: false,
    	guideStep:1,
    	haveShownGuide: sessionStorage.getItem('c_haveShownGuide') ? sessionStorage.getItem('c_haveShownGuide') : false,
    };
  },
  components: {},
  watch: {
  },
  computed: {},
  mounted() {
  },
  beforeDestroy() {},
  methods: {
  	guideChangeStep(type){
  		if(type == 1){
  			this.guideStep--
  		}else{
  			if(this.guideStep == 6){
  				this.guideClose();
  				return;
  			}
  			this.guideStep++
  		}
  	},
  	guideClose(){
			this.loading = true;
			setTimeout(()=>{
			this.$nextTick(()=>{
				sessionStorage.setItem("c_haveShownGuide",true)
					this.$router.push({
					name: "WaitingForAllocated",
				});
			});
			},0)
			
  	}
  },
};
</script>

<style>
.guide-img{
	width: 100%;
    height: 100%;
    background: url(/images/guide2/guide1.png) no-repeat center;
    position: fixed;
    background-size: contain;
}
.mask{
	position: fixed;
    background-color: rgba(0,0,0,.6);
    z-index: 12;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.mask-white{
	background-color: #f4f6f8;
}
.mask-step5{
	text-align: center;
	width: 100%;
    height: 100%;
    position: fixed;
}
.mask-step5:before{
	content: "";
	position: fixed;
    background-color: rgba(0,0,0,.6);
    z-index: 13;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.left-menu{
	position: fixed;
    top: 180px;
    left: 15px;
    font-size: 14px;
    padding: 0 20px;
    list-style: none;
    cursor: pointer;
    position: relative;
    transition: border-color .3s, background-color .3s, color .3s;
    box-sizing: border-box;
    white-space: nowrap;
    margin-bottom: 5px;
    height: 36px;
    line-height: 36px;
    border-radius: 4px;
    background-color: #fff !important;
    box-shadow: 0 1px 0 0 #5c6ac4;
    padding-left: 20px;
    color: rgb(255, 255, 255);
    width: 170px;
		display: flex;
		align-items: center;
}
.left-menu i {
    margin-right: 10px;
    color: #5c6ac4;
    font-size: 20px;
    vertical-align: middle;
}
.left-menu span {
    color: #3b3f5c;
    font-size: 13px;
}
.guide4 .left-menu{
	top: 100px;
}
.top-menu{
	position: fixed;
    top: 100px;
    right: 15px;
    padding: 10px 15px;
    background: #fff;
}
.content-wrap{
	width: 600px;
	position: relative;
	top: 100px;
	left: 50%;
	margin-left: -200px;
    padding: 30px 40px 40px;
    background-color: #fff;
    margin-bottom: 10px;
    z-index: 14;
}
.content-over{
	overflow: auto;
    height: 100%;
    position: absolute;
    width: 100%;
}
.content-title{
	margin-bottom: 20px;
    font-size: 18px;
    color: #000;
    font-weight: 700;
    line-height: 20px;
}
.content-sub-title{
	font-size: 14px;
    line-height: 16px;
    margin-bottom: 30px;
}
.btn-wrap{
	    right: 50px;
    bottom: 150px;
	position: fixed;
	z-index: 33;
}
.bottom-menu{
	position: fixed;
    bottom: 23px;
    left: 330px;
}
.guide3 .bottom-menu{
    left: auto;
    right: 30px;
    bottom: 38px;
}
.guide5 .menu-wrap5{
	position: fixed;
	left: 50%;
	margin-left: -515px;
    bottom: 0;
    z-index: 14;
    width: 1030px;
    text-align: right;
}
.guide5 .menu-wrap5 .bottom-menu{
	left: auto;
    right: -5px;
    bottom: 10px;
    position: absolute;
}
.guide .content-wrap .guide-step.guide-step1{
	position: absolute;
    background-image: url(/images/guide/guide-step.png);
    width: 200px;
    height: 80px;
    background-position: 0 0;
    left: -200px;
    top: 0;
    animation: rotate1 1s linear infinite;
}
.guide2 .content-wrap .guide-step.guide-step1{
    background-position: 0 -80px;
}
.guide3 .content-wrap .guide-step.guide-step1{
    background-position: 0 -160px;
}
.guide4 .content-wrap .guide-step.guide-step1{
    background-position: 0 -240px;
}
.guide5 .content-wrap .guide-step.guide-step1{
    background-position: 0 -320px;
}
.guide6 .content-wrap .guide-step.guide-step1{
    background-position: 0 -400px;
}
.guide .content-wrap .guide-step.guide-step2{
	position: absolute;
    background-image: url(/images/guide/guide-step.png);
    width: 200px;
    height: 80px;
    background-position: 0 -480px;
    right: -190px;
    top: 0;
    animation: rotate1 1s linear infinite;
}
.guide .guide-step.guide-step3{
	position: absolute;
    background-image: url(/images/guide/guide-step.png);
    width: 200px;
    height: 80px;
    background-position: 0 -640px;
    left: 50%;
    animation: rotate2 1s linear infinite;
    margin-left: -30px;
    top: -80px;
}
@keyframes rotate2 {
    0% {
    transform: translateY(0) ;
  }
    25% {
        transform: translateY(5px);
    }
    50% {
        transform: translateY(10px);
       
    }
    75% {
        transform: translateY(5px) ;
    }
    100% {
        transform: translateY(0) ;
    }
}
@-webkit-keyframes rotate2 {
    0% {
    transform: translateY(0) ;
  }
    25% {
        transform: translateY(5px);
    }
    50% {
        transform: translateY(10px);
       
    }
    75% {
        transform: translateY(5px) ;
    }
    100% {
        transform: translateY(0) ;
    }
}
@-moz-keyframes rotate2 {
    0% {
    transform: translateY(0) ;
  }
    25% {
        transform: translateY(5px);
    }
    50% {
        transform: translateY(10px);
       
    }
    75% {
        transform: translateY(5px) ;
    }
    100% {
        transform: translateY(0) ;
    }
}

@keyframes rotate1 {
    0% {
    	transform: translateX(0) ;
  	}
    25% {
        transform: translateX(5px);
    }
    50% {
        transform: translateX(10px);
       
    }
    75% {
        transform: translateX(5px) ;
    }
    100% {
        transform: translateX(0) ;
    }
}
@-webkit-keyframes rotate1 {
    0% {
    	transform: translateX(0) ;
  	}
    25% {
        transform: translateX(5px);
    }
    50% {
        transform: translateX(10px);
       
    }
    75% {
        transform: translateX(5px) ;
    }
    100% {
        transform: translateX(0) ;
    }
}
@-moz-keyframes rotate1 {
    0% {
    	transform: translateX(0) ;
  	}
    25% {
        transform: translateX(5px);
    }
    50% {
        transform: translateX(10px);
       
    }
    75% {
        transform: translateX(5px) ;
    }
    100% {
        transform: translateX(0) ;
    }
}

.alert-wrap {
	padding: 8px 16px;
	background-color: rgba(48, 49, 51, 0.9);
    border-radius: 4px;
    /*border-left: 5px solid rgb(103, 194, 58);*/
    /*box-shadow: rgba(33, 33, 33, 0.4) 0px 1px 4px 0px;*/
    box-shadow: 0 -2px 4px rgba(0,0,0,.1);
	position: absolute;
	bottom: 15px;
	left: 15px;
	right: 15px;
	z-index: 9;
}
.alert-wrap .is-bold {
	color: #fff;
	font-size: 16px;
	font-weight: bold;
	margin-bottom: 10px;
}
.alert-wrap .d-flex{
	color: #fff;
	font-size: 16px;
	flex-wrap: wrap;
}
.page-footer{
	position: absolute;
	bottom: 15px;
	left: 15px;
	right: 15px;
	z-index: 9;
/*	background: #fff;*/
    bottom: 0;
    margin: 0;
}
.page-footer>div{
	width: 1060px;
    margin: 0px auto;
    background: #fff;
    padding: 10px;
}
.guide-wrap .page-footer .el-divider{
	margin: 10px 0 !important;
}
.step-img{
	background: url(/images/guide/guide1-3.png) no-repeat;
	background-size:100% ;
}
</style>
<style scoped="scoped">
	.admin-page .admin-main .admin-content{
	z-index: 1;
}
</style>
<style lang="scss" scoped>
.guide-2-bottom{
	position: fixed;
	bottom: 15px;
	padding-left: 250px;
	padding-right: 45px;
	display: flex;
	align-items: center;
	width: 100%;
	.content{
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5px 20px;
		border-radius: 4px;
		background-color: rgba(0, 0, 0, .9);
		.right{
			display: flex;
			align-items: center;
			> div{
				margin-right: 40px;
				color: #909399;
				span{
					color: #fff;
				}
			}
		}
	}
}
</style>