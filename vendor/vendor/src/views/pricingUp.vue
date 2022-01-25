<template>
  <div class="contentpanel dashboard-page">
    <div class="pagetitle">
      <div class="left">
        <div class="title">
          <i class="el-icon-bank-card"></i>
          <h2>{{$t('package.购买套餐')}}</h2>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="pagebody">
      <el-card>
        <el-row>
          <el-col :span="24" ref="pageTabs">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane :label="$t('package.选择套餐')" name="choose"></el-tab-pane>
              <el-tab-pane :label="$t('package.店铺加购')" name="ShopPlus"></el-tab-pane>
            </el-tabs>
          </el-col>
          <template v-if="activeName == 'choose'">
            <el-col :span="24" class="pricing">
              <div class="d-flex" style="width:100%;">
                <div class="logo-name">
                  <div class="ourmall">Ourmall</div>
                  <div class="details">{{$t('package.详细功能细则')}}</div>
                </div>
                <div class="d-flex" style="flex:1;margin-left:20px">
                 <div 
                  style="margin-top:50px;width:25%;margin-left:20px"
                  v-for="(item,index) in vipArr"
                  :key="item.name">
                <div
                  class="price"
                >
                  <div class="price-free tx-center">
                    <p class="price-title">
                      {{item.name}}
                    </p>
                    <p class="price-title-two">
                      {{item.nameEn}}
                    </p>
                  <div class="cost"> 
                     <div>CN ￥</div>
                     <div><span style="font-size:48px;margin-right:10px">{{item.amount}}</span> / Year</div>
                  </div>
                  <div class="vip-detail">
                    {{details[index]}}
                  </div>
                  <template>
                    <div class="trial" v-if="index!= 0" @click="payVip(index+1)">
                      {{$t('package.购买套餐2')}}
                    </div>
                    <div v-else class="free-trial">
                     {{$t('package.免费试用')}}
                    </div>
                  </template>
                  </div>
                </div>
              </div>
                </div>
              </div>
              <div style="width:100%" class="d-flex">
                <table style="width:100%" class="tableBox">
                    <tr v-for="(item,index) in titleList" :key="item.title">
                      <td style="width:300px;font-weight:400">
                       <div>{{item.title}}</div> 
                       <div>({{item.unit}})</div> 
                      </td>
                      <template v-for="info in vipArr">
                        <td :key="info.productCnt" v-if="index == 0" style="width:20%">
                          {{info.productCnt}}
                        </td>
                        <td :key="info.subUserCnt" v-if="index == 1">
                          {{info.subUserCnt}}
                        </td>
                        <td :key="info.orderReserveDay" v-if="index == 2">
                          {{info.orderReserveDay || $t('package.不限')}}
                        </td>
                      </template>  
                    </tr>
                </table>
              </div>
            </el-col>
          </template>
          <!-- 加购 -->
          <template v-else>
            <div class="addPackage">
              <div class="add-box" v-for="item in addPackList" :key="item.id"
              @click="choosePackage(item.id)"
               :class="{chooes:num==item.id}">
                <div class="add-img">
                  <img :src="item.img" />
                </div>
                <div class="add-title">
                 {{item.name}}
                </div>
              </div>
            </div>
            
            <div class="addPackage-detail">
             <!-- Enterprise Brand Service --> 
                <div class="detail-box" v-if="num == 1">
                  <div>
                    <p>1){{$t('package.上架应用至Shopify')}}</p>
                    <p>2){{$t('package.设置店铺独有域名')}}</p> 
                  </div>
                   
                   <div class="addPackage-price">¥150000/{{$t('package.永久有效')}}</div>
                   <div class="totle">
                     <div>
                       {{$t('package.总计')}}: ¥ 150000
                     </div>
                     <div class="purchase" @click="payVip()" :class="{unable:$store.state.userInfo.vipType == '1'||$root.$children[0].vipDetail.service}">
                       {{$t('package.订购')}}
                     </div>
                   </div>
                </div>
               <!-- Buy extra emails  -->
               <div class="detail-box" v-else-if="num == 2">
                  <div>
                    <p>{{$t('package.加购包包括：电子邮件1000封')}}</p>
                    <p>{{$t('package.售价')}}：¥10.00/{{$t('package.年')}}</p> 
                  </div>
                   
                   <div class="choose-price">
                     <div>{{$t('package.购买数量')}}:</div>
                     <div style="margin:0 10px"><el-input-number v-model="addNum" :step="1000" step-strictly :min="1000"></el-input-number></div>
                     <div>{{$t('package.总计2')}}: {{addNum}}</div>
                   </div>
                   <div class="totle">
                     <div>
                       {{$t('package.总计')}}: ¥ {{addNum/100}}
                     </div>
                     <div class="purchase" @click="payVip()" :class="{unable:$store.state.userInfo.vipType == '1'}">
                       {{$t('package.订购')}}
                     </div>
                   </div>
                </div>
                <!-- The number of products on shelves -->
              <div class="detail-box" v-else-if="num == 3">
                  <div>
                    <p>{{$t('package.加购包包括：商品上架数100个')}}</p>
                    <p>{{$t('package.售价')}}：¥1000.00/{{$t('package.年')}}</p> 
                  </div>
                   
                   <div class="choose-price">
                     <div>{{$t('package.购买数量')}}:</div>
                     <div style="margin:0 10px"><el-input-number v-model="addNum" :step="100" step-strictly :min="100"></el-input-number></div>
                     <div>{{$t('package.总计2')}}: {{addNum}}</div>
                   </div>
                   <div class="totle">
                     <div>
                       {{$t('package.总计')}}: ¥ {{addNum*10}}
                     </div>
                     <div class="purchase" @click="payVip()" :class="{unable:$store.state.userInfo.vipType == '1'}">
                       {{$t('package.订购')}}
                     </div>
                   </div>
                </div>
                <!-- The number of Employee accounts -->
               <div class="detail-box" v-else-if="num == 4">
                  <div>
                    <p>{{$t('package.加购包包括：店铺员工数5个')}}</p>
                    <p>{{$t('package.售价')}}：¥10000/{{$t('package.年')}}</p>
                    <p>{{$t('package.单次购买10个以上员工账号立享8折优惠')}}</p> 
                  </div>
                   
                   <div class="choose-price">
                     <div>{{$t('package.购买数量')}}:</div>
                     <div style="margin:0 10px"><el-input-number v-model="addNum" :step="5" step-strictly :min="5"></el-input-number></div>
                     <div>{{$t('package.总计2')}}: {{addNum}}</div>
                   </div>
                   <div class="totle">
                     <div>
                       {{$t('package.总计')}}: ¥ {{addNum >10 ? addNum*2000*0.8:addNum*2000}}
                     </div>
                     <div class="purchase" @click="payVip()" :class="{unable:$store.state.userInfo.vipType == '1'}">
                       {{$t('package.订购')}}
                     </div>
                   </div>
                </div>
            </div>
          </template>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
		addNum:1000,
		num:'1',
      vipArr:[], 
      activeName: "choose",
    };
  },
  computed: {
    titleList: function() {
      return [
        {title: this.$t('package.商品上架数量'),unit:'SPU'},
        {title: this.$t('package.子账号数量'),unit:this.$t('package.个')},
        {title: this.$t('package.订单数据保留时长'),unit:this.$t('package.天')},
      ]
    },
    details : function(){
      return [
        this.$t('package.低成本体验全套Ourmall Saas系统 多重服务助力商家业务启动'),
        this.$t('package.助力初期业务的快速启动适合新手商家快速上手熟悉并操作系统'),
        this.$t('package.成熟商家首选，轻松运营，边界操作，一站式服务，强强数据支撑，祝你销量节节攀升'),
        this.$t('package.顶级至尊版，数据支撑更全面，强大的后台统计与维护，做生意放心无忧')
      ]
    },
    addPackList:function(){
      return [
        {img:require('../../public/images/package/service.png'),name:this.$t('package.企业自有品牌服务包'),id:'1'},
        {img:require('../../public/images/package/email.png'),name:this.$t('package.邮件套餐加油包'),id:'2'},
        {img:require('../../public/images/package/shelnes.png'),name:this.$t('package.商品上架数'),id:'3'},
        {img:require('../../public/images/package/account.png'),name:this.$t('package.员工数量'),id:'4'},
      ]
      },
  },

  components: {},
  mounted() {
    if(this.$route.query.serviceType){
      this.activeName = 'ShopPlus';
      this.num = this.$route.query.serviceType;
    }
    this.getVipArray();
  },
  watch: {},
  methods: {
    choosePackage(id){
      this.num = id;
      if(id == 2){
        this.addNum = 1000;
      }else if(id == 3){
        this.addNum = 100;
      }else if(id == 4){
        this.addNum = 5
      }
      
    },
    
    payVip(i){
      if(i){
        if(this.$store.state.userInfo.vipType != '1'){
          this.$message.error(this.$t('package.请联系销售进行套餐升级'));
        }else{
        this.$router.push({path:'/billDetails',query:{vipType:i}})
        }
      }else{
        if(this.$store.state.userInfo.vipType == '1'){
          this.$message.error(this.$t('package.请升级套餐,免费版不能购买加购包'));
        }else if(this.num == '1' && this.$root.$children[0].vipDetail.service){
            return
        }else{
          this.$router.push({path:'/billDetails',query:{serviceType:this.num,number:this.addNum}})
        }
      }
      
    },
    getVipArray() {
			this.$apiCall('api.Admin.getVipArray',{},r=>{
				if(r.ErrorCode == 9999){
          let obj = r.Data.Results;
          for(let k in obj){
            this.vipArr.push(obj[k]);
          }
				}
			})
			},
    handleClick() {
    },
    consult(){
      this.$root.$children[0].$refs.chatBtn.$el.style.display = "block";
      this.$root.$children[0].$refs.chatBtn.openChatWin();
    }
  },
};
</script>
<style scoped="scoped" lang="scss">
.logo-name{
  width: 180px;
  margin: 0 9px 0 45px;
  .ourmall{
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
  }
  .details{
    font-size: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #545454;
    line-height: 33px;
  }
}
.pricing {
  display: flex;
  flex-wrap: wrap;
  
}
.price {
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(168, 189, 193, 0.45);
  border-radius: 4px;   
  .price-free {
    .price-title { 
      padding-top: 47px;
      font-size: 30px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #525FB0;
    }
    .price-title-two{
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #525FB0;
      line-height: 37px;
    }
    .cost{
      color: #1D1D1D;
      display: flex;
      flex-direction: column;
      align-items: center;
      div{
        display: flex;
        align-items: center;
      }
    }
    .vip-detail{
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #555555;
    }
    .trial{
      margin: 0 auto;
      cursor: pointer;
      color: #fff;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: linear-gradient(90deg, #8091FF 0%, #7B8BF2 40%, #9CAAFF 100%);
      border-radius: 32px;
    }
    .free-trial{
      margin: 0 auto;
      color: #4E4E4E;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      height: 40px;
      text-align: center;
      line-height: 40px;
    }
  }
}
.tableBox{
  border-top: 1px solid #D6D6D6;
  cursor: pointer;
  border-collapse: collapse;
  width: 100%;
  font-family: PingFangSC-Semibold, PingFang SC;
  color: #4E4E4E;
  tr{
    td{
      font-weight: 600;
      padding: 15px;
      text-align: center;
      border-bottom: 1px solid #D6D6D6;
    }
  }
  tr:hover{
    background: #EFF7FF;
  }
}
.addPackage {
  margin-top: 80px;
  display: flex;
  justify-content: space-evenly;
  .chooes{
      box-shadow: 0px 7px 20px 2px rgba(104, 152, 218, 0.27) !important;
      border: none !important;
      .add-title {
       color: #525FB0 !important;
     }
    }
  .add-box {
    cursor: pointer;
    overflow: hidden;
    position: relative;
    padding: 0 34px;
    text-align: center;
    width: 22%;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid #D5D5D5;
    .add-img {
      margin: 35px 0 0px;
      img {
        height: 170px;
        width: 90%;
        object-fit: contain ;
      }
    }
    .add-title {
      height: 56px;
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: 600;
      color: #313131;
      line-height: 28px;
    }
    
  }
}
.addPackage-detail{
  width: 100%;
  display: flex;
  justify-content: center;
  .detail-box{
    // text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 50px;
    margin-bottom: 15px;
    p{
      font-size: 18px;
      line-height: 35px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #4A4A4A;
    }
    .addPackage-price{
      margin-top: 30px;
      margin-bottom: 50px;
      font-size: 23px;
      font-family: Helvetica-Bold, Helvetica;
      font-weight: bold;
      color: #262626;
      line-height: 28px;
    }
    .choose-price{
      margin-top: 50px;
      margin-bottom: 23px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 23px;
      font-family: Helvetica-Bold, Helvetica;
      font-weight: bold;
      color: #262626;
      
    }
    .totle{
      display: flex;
      align-items: center;
      div:first-child{
        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #4A4A4A;
        margin-right: 34px;
      }
      .purchase{
        cursor: pointer;
        width: 186px;
        height: 46px;
        text-align: center;
        line-height: 46px;
        color: #fff;
        background: #525FB0;
        border-radius: 30px;
        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
      }
    }
  }
}

@media screen and (max-width: 1600px) {
  .logo-name{
    width: 120px;
    margin: 0 9px 0 24px;
    .ourmall{
      font-size: 24px;
      line-height: 33px;
    }
    .details{
      font-size: 14px;
    }
  }
  .price {
    height: 390px;
  }
  .amount{
    font-size: 36px;
    margin-right: 10px;
  }
  .price-free {
    .price-title { 
      padding-top: 35px;
      font-size: 28px;
    }
    .price-title-two{
      margin-top: 5px;
      margin-bottom: 43px;
      font-size: 20px;
    }
    .cost{
      font-size: 14px;
      margin-bottom: 42px;
      div{
        margin-bottom: 5px;
      }
    }
    .vip-detail{
      margin: 0 10px;
      font-size: 12px;
      height: 90px;
      line-height: 17px;
    }
    .trial ,.free-trial{
      width: 166px;
      font-size: 16px;
    }
  }
  .tableBox{
    margin-top: 30px;
    // margin-bottom: 70px;
    font-size: 16px;
    line-height: 20px;
  }
}
@media screen and (min-width: 1600px) {
  .logo-name{
  width: 180px;
  margin: 0 9px 0 45px;
  .ourmall{
    font-size: 36px;
    line-height: 50px;
  }
  .details{
    font-size: 24px;
  }
}
  .price {
    height: 520px;
  }
  .amount{
    font-size: 48px;
    margin-right: 10px;
  }
  .price-free {
    .price-title { 
      padding-top: 47px;
      font-size: 30px;;
    }
    .price-title-two{
      margin-top: 15px;
      margin-bottom: 50px;
      font-size: 26px;
    }
    .cost{
      font-size: 24px;
      margin-bottom: 40px;
      div{
        margin-bottom: 25px;
      }
    }
     .vip-detail{
      margin: 26px 20px;
      font-size: 18px;
      height: 120px;
      line-height: 25px;
      }
      .trial ,.free-trial{
        width: 204px;
        font-size: 18px;
      }
  }
  .tableBox{
    margin-top: 30px;
    // margin-bottom: 160px;
    font-size: 18px;
    line-height: 25px;
  }
 .unable{
   background: #ccc !important;
   cursor: not-allowed !important;
 }
}
</style>
