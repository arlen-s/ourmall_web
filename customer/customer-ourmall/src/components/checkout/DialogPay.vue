<template>
  <div>
    <el-dialog
			:visible="dialogPay.isShow"
			:loading="dialogPay.loading"
			class="pay-dialog"
			:before-close="handlePayClose"
			:close-on-press-escape="false"
			:close-on-click-modal="false"
			:show-close="dialogPay.step == 1"
		>
      <div class="pay-info">
				<div v-if="dialogPay.orderNum">{{$t('Order Number')}}: <b>{{dialogPay.orderNum}}</b></div>
				<div v-if="dialogPay.amount">{{$t('Total Amount:')}} <b class=" tx-danger">{{dialogPay.amount.toFixed(2)}}{{$store.state.country.symbol}}</b></div>
			</div>
      <template v-if="dialogPay.step == 1">
				<div class="pay-platform">
					<div class="d-flex title">
						<h3>{{$t('Payment Methods')}}</h3>
						<span>{{$t('All transactions are secure and encrypted.')}}</span>
					</div>	
					<div class="platform-select">
						<div>
							<a href="javascript:;" :class="{active: dialogPay.platformType == 3}"
								@click="changePlatform(3)"
							>
								<div class="active"></div>
								<div class="active-icon"><i class="el-icon-check"></i></div>
								<div class="icon-wrap">
									<svg class="icon" aria-hidden="true" style="width: 40px; height: 40px;">
										<use xlink:href="#icon-paypal-icon"></use>
									</svg>
								</div>
								<span>PayPal</span>
							</a>
						</div>
						<div>
							<a href="javascript:;"  :class="{active: dialogPay.platformType == 4}" style="width: 310px;"
								@click="changePlatform(4)"
							>
								<div class="active"></div>
								<div class="active-icon"><i class="el-icon-check"></i></div>
								<div class="icon-wrap">
									<svg class="icon" aria-hidden="true" style="width: 40px; height: 40px;">
										<use xlink:href="#icon-bank-card"></use>
									</svg>
								</div>
								<span>{{$t('Pay with Credit Card')}}</span>
							</a>
						</div>
					</div>
					<div class="action">
						<el-button :loading="dialogPay.payLoading" type="primary" round style="width: 120px; font-size: 18px;"
							@click="orderPay"
						> Pay </el-button>
					</div>
					<div class="footer">
						<div class="ft">{{$t('We Accept')}}</div>
						<div class="fd">
							<svg class="icon" aria-hidden="true" style="width: 50px; height: 40px;">
								<use xlink:href="#icon-master"></use>
							</svg>
							<svg class="icon" aria-hidden="true" style="width: 70px; height: 40px;">
								<use xlink:href="#icon-visa"></use>
							</svg>
							<svg class="icon" aria-hidden="true" style="width: 86px; height: 40px;">
								<use xlink:href="#icon-paypal-text"></use>
							</svg>
						</div>
					</div>
				</div>
			</template>
      <template v-if="dialogPay.step == 2">
				<div class="paying"><i class=" mg-r-10 el-icon-loading"></i>{{$t('Please do not close the page during payment')}}</div>
				<div class="close-pay" @click="closePay">
					<button size="medium">{{$t('Close Pay')}}</button>
				</div>
			</template>	
			<template v-if="dialogPay.step == 3">
				<div v-if="dialogPay.msg" class="pay-success error">
					{{dialogPay.msg}}
				</div>
				<div v-else class="pay-success">
					<i class="el-icon-success"></i>
					{{$t('Your order has been successfully paid and the order amount is')}}  <span class=" tx-danger"> ${{dialogPay.amount.toFixed(2)}}</span>.
				</div>
				<div class="close-pay" @click="closePay">
					<button size="medium">{{$t('Close')}}</button>
				</div>
			</template>	
    </el-dialog>
    <checkout :data="dialogCheckOut" @payCheckOut="payCheckOut"/>
  </div>
</template>

<script>
import checkout from '@/components/checkout/checkout'
export default {
  props: ["dialogPay",],
  data(){
    return {
      dialogCheckOut: {
        isShow: false,
        loading: false,
        packages: null,
        orderPay: null,
        token: '',
      },
      dialogCheckOutDefault:'{}',
      payTime: 0,
      newWin: null,
    }
  },
  components: {
    checkout,
  },
  mounted(){
    this.dialogCheckOutDefault = JSON.stringify(this.dialogCheckOut);
  },
  methods: {
    payCheckOut(token){
      this.dialogCheckOut.loading = true;
      this.newWin = window.open( (this.$root.$children[0].baseUrl == '/my' ? '/my' : '') + '/blank.html', 'pay');
      this.$apiCall('api.PurchaseOrder.createPay', {
        purchaseOrderId: this.dialogPay.purchaseOrderId,
        platformType: 4,
        token
      }, r => {
        this.dialogCheckOut.loading = false;
        this.dialogCheckOut.isShow = false;
        if (r.ErrorCode == "9999" && r.Data.Results.url) {
          this.newWin.location = r.Data.Results.url;
          this.dialogPay.step = 2;
          this.payTime = setInterval(()=>{
            this.getPayStatus();
          },2000)
        }else{
          this.$elementMessage(r.ErrorCode == "9999" ? 'fail' : r.Message, 'error');
          this.newWin.close();
        }
      })
		},
    orderPay(){
      //支付弹层支付
      if(this.dialogPay.platformType == 4){
        this.dialogCheckOut = JSON.parse(this.dialogCheckOutDefault)
        this.dialogCheckOut.isShow = true;
        this.dialogCheckOut.orderPay = {
          orderNum: this.dialogPay.code,
          amount: Number(this.dialogPay.amount),
        }
        return;
      }
      this.dialogPay.payLoading = true;
      this.newWin = window.open( (this.$root.$children[0].baseUrl == '/my' ? '/my' : '') + '/blank.html', 'pay');
      this.$apiCall('api.PurchaseOrder.createPay', {
        purchaseOrderId: this.dialogPay.purchaseOrderId,
        platformType: 3,
      }, r => {
        this.dialogPay.payLoading = false;
        if (r.ErrorCode == "9999") {
          this.newWin.location = r.Data.Results.url;
          this.dialogPay.step = 2;
          this.payTime = setInterval(()=>{
            this.getPayStatus();
          },2000)
        }else{
          this.$elementMessage(r.Message, 'error');
          this.newWin.close();
        }
      })
    },
    getPayStatus(){
      //获取支付状态
      this.$apiCall('api.User.getPayStatus', {}, r => {
        if (r.ErrorCode == "9999") {
          let status = r.Data.Results.status;
          if(status != 1){
            clearInterval(this.payTime)
          }
          if(status == 2){ //支付成功
						this.$Burying({
							object: '13008'
						})
            this.dialogPay.step = 3;
            this.closePayPage();
          }else if(status == 3){
            //支付失败
            this.dialogPay.step = 3;
            this.dialogPay.msg = r.Data.Results.message;
            this.$elementMessage(r.Data.Results.message, 'error');
            this.closePayPage();
          }
        }else{
          this.dialogPay.msg = r.Message;
          this.$elementMessage(r.Message, 'error');
          clearInterval(this.payTime)
        }
      })
    },
    changePlatform(type){
			this.dialogPay.platformType = type;
    },
    closePay(){
      this.newWin.close();
      window.location.reload();
    },
    closePayPage(){ //关闭支付新开页面
      this.newWin.close();
      clearInterval(this.payTime);
    },
    handlePayClose(){
			this.dialogPay.isShow = false;
		},
  },
}
</script>

<style lang="scss" scoped>
.pay-dialog{
	.pay-info{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px 20px;
	}
	.pay-platform{
		padding-bottom: 25px;
		background-color: #F2F6FC;
		.title{
			padding: 20px;
			h3{
				margin-right: 30px;
				font-weight: bold;
				font-size: 16px;
			}
		}
		.platform-select{
			display: flex;
			align-items: center;
			margin: 10px 30px;
			padding: 25px;
			background-color: #fff;
			border: 1px #EBEEF5 solid;
			> div{
				flex: 1;
				display: flex;
				justify-content: center;
				a{
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 240px;
					height: 70px;
					border: 2px #DCDFE6 solid;
					overflow: hidden;
					.active{
						display: none;
						position: absolute;
						top: -28px;
						right: -14px;
						width: 40px;
						height: 40px;
						background-color: #E6A23C;
						transform: rotate(30deg);
					}
					.active-icon{
						display: none;
						position: absolute;
						top: -4px;
						right: 0;
						z-index: 1;
						color: #fff;
					}
					.icon-wrap{
						display: flex;
						align-items: center;
						justify-content: center;
						margin-right: 15px;
						width: 48px;
						height: 48px;
						border-radius: 50%;
						border: 1px #E4E7ED solid;
						overflow: hidden;
					}
					span{
						color: #303133;
						font-size: 24px;
					}
				}
				a:hover{
					text-decoration: none;
					border-color: #E6A23C;
				}
				a.active{
					border-color: #E6A23C;
					text-decoration: none;
					.active{
						display: block;
					}
					.active-icon{
						display: block;
					}
				}
			}
		}
	}
	.action{
		display: flex;
		justify-content: center;
		padding: 20px 0;
	}
	.footer{
		padding: 0 20px;
		.ft{
			margin-bottom: 10px;
			font-weight: bold;
			font-size: 18xp;
		}
		.fd{
			display: flex;
			align-items: center;
			padding: 0 30px;
			height: 80px;
			border: 1px #EBEEF5 solid;
			background-color: #fff;
			.icon{
				margin-right: 20px;
			}
		}
	}
	.paying{
		margin-bottom: 20px;
		padding: 20px;
		text-align: center;
		font-size: 18px;
	}
	.pay-success{
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		font-size: 16px;
		i{
			margin-right: 20px;
			color: #67C23A;
			font-size: 32px;
		}
	}
	.pay-success.error{
		color: #F56C6C;
	}
	.close-pay{
		padding: 20px;
		text-align: center;
	}
}
</style>