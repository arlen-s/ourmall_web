<template>
  <div class="contentpanel transaction-page">
      <div class="pagetitle" ref="pageHeader">
			<div class="left">
				<div class="title">
					<el-link type="primary" @click="goto()">{{$t('bill.返回到购买套餐')}}</el-link>
					<span style="margin: 0 20px">/</span>
					<h2>{{$t('bill.账单详情')}}</h2>
				</div>
			</div>
			<div class="right">
			</div>
		</div>
      <div class="pagebody" v-loading="loading">
          <el-row :gutter="15" class="mg-b-20">
              <el-col :span="24">
                  <!-- <h2>{{$t('bill.账单详情')}}</h2> -->
                  <el-card>
                      <p>{{$t('bill.订单信息')}}</p>
                      <el-divider></el-divider>
                      <div class="info">
                          <div class="tit">{{$t('bill.订单编号：')}}</div>
                          <div class="txt">{{data.payCode}}</div>
                      </div>
                      <div class="info">
                          <div class="tit">{{$t('bill.购买内容：')}}</div>
                          <div class="txt">{{data.tradeName}}</div>
                      </div>
                      <div class="info">
                          <div class="tit">{{$t('bill.支付方式：')}}</div>
                          <div class="txt">
                              <img src="@/assets/alipay.png" />
                          </div>
                      </div>
                      <div class="amount">
                          <div class="tit">{{$t('bill.订单金额')}}</div>
                          <div class="num">¥{{data.amount}}</div>
                      </div>
                  </el-card>
                  <el-card class="mg-t-30">
                      <div class="qrcode">
                          <!-- <img src="" /> -->
                          <iframe width=150 height=150 frameborder=0 scrolling=auto :srcdoc="data.payurl"></iframe>
                      </div>
                      <div class="tips">
                          <div class="icon">
                              <i class="iconfont icon-scan"></i>
                          </div>
                          <div class="txt">{{$t('bill.打开手机支付宝扫一扫继续付款')}}</div>
                      </div>
                  </el-card>
              </el-col>
          </el-row>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            data:{},
            interval: null
        }
    },
    mounted(){
      this.getDetail()
    },
    methods: {
      goto(){
          if(this.$route.query.serviceType){
             this.$router.push({path:'/pricingUp',query:{
             serviceType:this.$route.query.serviceType,
         }})  
          }else{
             this.$router.push({path:'/pricingUp'})  
          } 
      },
      getDetail(){
          let reg2 = /^sandbox/;
          if(this.$route.query.vipType) {
              this.loading = true;
              this.$apiCall('api.Admin.payVip',{
                  vipType:this.$route.query.vipType
              },r=>{
                  this.loading = false;
                  if (r.ErrorCode == "9999") {
                      this.data = r.Data.Results;  
                      if (reg2.test(window.location.host)) {
                        const {href} = this.$router.resolve(
                        {name: "Alipay",
                            query: {
                            htmlData: r.Data.Results.payurl
                            }
                        });
                        window.open(href, '_blank');
                      }
                      this.checkPayStatus()
                  }
              })
          }else{
              this.loading = true;
              this.$apiCall('api.Admin.payService',{
                  serviceType:this.$route.query.serviceType,
                  number:this.$route.query.number,
              },r=>{
                  this.loading = false
                  if (r.ErrorCode == "9999") {
                      this.data = r.Data.Results;  
                      if (reg2.test(window.location.host)) {
                        const {href} = this.$router.resolve(
                        {name: "Alipay",
                            query: {
                            htmlData: r.Data.Results.payurl
                            }
                        });
                        window.open(href, '_blank');
                      }
                      this.checkPayStatus()
                  } 
              }) 
          }
        //   document.forms[0].submit();
      },
      checkPayStatus() {
          this.interval = setInterval(() => {
            this.$apiCall('api.Admin.checkPayStatus', {
                code: this.data.payCode
            }, r => {
                if (r.ErrorCode == '9999') {
                    if (r.Data.Results == 2) {
                        clearInterval(this.interval);
                        this.interval = null
                        this.$elementMessage(this.$t('bill.支付成功，3秒后自动跳到首页'), "success");
                        setTimeout(() => {
                            this.$root.$children[0].getVipDetail()
                            this.$router.replace('/dashboard')
                        }, 3000);
                    }
                }
            }) 
          }, 2000);
      }
    },
    beforeDestroy() {
        clearInterval(this.interval);
        this.interval = null
    }
};
</script>

<style lang="scss" scoped>
    h2 {
		margin: 30px 0;
		font-size: 26px;
        color: rgba(91, 107, 195, 1);
	}
    p {
        font-size: 20px;
        color: rgba(0, 0, 0, 1);
        font-weight: 600;
    }
    .info {
        margin: 15px 0;
        font-size: 16px;
        display: flex;
        align-items: center;
        .tit {
            color: rgba(115, 115, 115, 1);
        }
        .txt {
            color: rgba(0, 0, 0, 1);
            img {
                height: 53px;
            }
        }
    }
    .amount {
        margin-top: -65px;
        float: right;
        font-size: 16px;
        text-align: right;
        .tit {
            color: rgba(11, 11, 11, 1);
        }
        .num {
            padding-top: 4px;
            color: rgba(255, 0, 0, 1);
        }
    }
    .qrcode {
        margin: 40px 0 24px;
        display: flex;
        justify-content: center;
        img {
            width: 200px;
            height: 200px;
        }
    }
    .tips {
        margin: auto;
        width: 160px;
        display: flex;
        align-items: center;
        .icon {
            width: 30px;
            height: 30px;
            i {
                font-size: 30px;
                line-height: 30px;
                color: rgba(254, 188, 77, 1);
            }
        }
        .txt {
            margin-left: 10px;
            width: calc(100% - 40px);
            font-size: 16px;
            color: rgba(102, 102, 102, 1);
        }
    }
</style>