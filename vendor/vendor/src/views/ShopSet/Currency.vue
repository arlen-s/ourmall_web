<template>
  <div class="contentpanel role-management-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <h2>{{$t('shop.交易币种')}}</h2>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="pagebody" v-loading="loading">
      <el-row :gutter="15" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <el-row :gutter="20">
              <el-col :span="24">
                <div class="mg-b-20" style="font-size:20px">{{$t('shop.交易币种')}}</div>
                <div class="mg-b-10">{{$t('shop.用户可以选择他们的常用货币类型来与您进行交易')}}</div>
                <div>
                  <el-select
                    @keyup.enter.native="addCurrency"
                    class="mg-r-20"
                    :placeholder="$t('shop.请选择一个币种')"
                    clearable
                    v-model="selectCurrency"
                  >
                    <el-option
                      v-for="item in currencyArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                   <el-link type="primary" :underline="false" @click="addCurrency">{{$t('shop.添加')}}</el-link>
                </div>
                <el-divider></el-divider>
                <div class="mg-b-20" style="font-size:20px">{{$t('shop.已选币种')}}</div>
                <div v-if="currencyList.length>0" class="selected-currency">
                    <div v-for="info in currencyList" :key="info.id" class="mg-b-30 d-flex">
                        <span class="mg-r-10">1 {{$store.state.country.symbol}}{{$store.state.country.shopCurrency}} = </span>
                        <el-input-number :precision="2" :min="0" :controls="false"  style="width: 120px;" v-model="info.rate"></el-input-number>
                        <span class="mg-l-5">{{$CE[info.name].code3}}</span>
                        <i class="el-icon-circle-close close" @click="delCurrency(info)"></i>
                    </div>
                </div>
                <div v-else class="none">{{$t('shop.暂无已选币种')}}</div>
                <el-divider></el-divider>
                   <el-button type="primary" @click="save">{{$t('shop.保存')}}</el-button>
              </el-col>
            </el-row>
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
      selectCurrency:'',
      loading: false,
      currencyArr: [
        {
          name: "AUD",
          id: '1',
        },
        { name: "EGP",
          id: '2' ,
        },
        {
          name: "RUB",
          id: '3',
        },
        {
          name: "COP",
          id: '4',
        },
        {
          name: "CAD",
          id: '5',
        },
        {
          name: "EUR",
          id: '6',
        },
        {
          name: "JPY",
          id: '7',
        },
        {
          name: "CNY",
          id: '8',
        },
        {
          name: "GBP",
          id: '9',
        },
        {
          name: "INR",
          id: '10',
        },
      ],
      currencyList:[],
      isAdd:true,
      isSave:true,
    };
  },
  mounted() {
    if(this.$store.state.userInfo.vendorCurrency){
      this.currencyList = this.$store.state.userInfo.vendorCurrency
    }
  },
  methods: {
      addCurrency(){
          this.isAdd = true;
          if(!this.selectCurrency){
              this.$elementMessage(this.$t('shop.请选择一个币种'), "error");
              return
          }
          if(this.currencyList&&this.currencyList.length>0){
              this.currencyList.forEach((e)=>{
                  if(e.id == this.selectCurrency){
                      this.isAdd = false;
                     this.$elementMessage(this.$t('shop.不能选择重复币种'), "error");
                  }
              })
          }
          if(this.isAdd){
             this.isRe()  
          }
      },
      delCurrency(info){
           this.$confirm(this.$t('shop.确定删除此币种?'), '', {
            confirmButtonText: this.$t('shop.确定'),
            cancelButtonText: this.$t('shop.取消'),
            type: 'warning'
            }).then(() => {
            this.currencyList.forEach((e,index)=>{
            if(e == info){
                this.currencyList.splice(index,1)
                }
            })  
            this.$message({
                type: 'success',
                message: this.$t('shop.删除成功')
            });
            }).catch(() => {
                      
            });
          
      },
      isRe(){
           this.currencyArr.forEach((i)=>{
              if(i.id == this.selectCurrency){
                  i.rate = undefined;
                  this.currencyList.push(i) 
              }
          });
      },
      //保存
      save(){
          this.isSave = true;
          //   if(!this.currencyList||this.currencyList.length == 0){
          //     this.$elementMessage('请选择币种', "error");
          //     return
          // }
          this.currencyList.forEach(e=>{
              if(!e.rate){
                  this.$elementMessage(this.$t('shop.请输入汇率'), "error");
                  this.isSave = false;
                  return
              }
          })
          if(this.isSave){
             this.loading = true;
            this.$apiCall('api.User.changeVendorConfig',{vendorCurrency:this.currencyList},r=>{
                this.loading = false;
                if(r.ErrorCode == 9999){
                    this.$root.$children[0].routerCheckLogin();
                    // this.$store.state.userInfo.vendorCurrency = this.currencyList;
                    this.$elementMessage(this.$t('shop.该货币类型已生效'), "success");
                }else{
                    this.$elementMessage(r.Message, "error");
                }
            }) 
          }
          
      }
  },
  components: {},
};
</script>

<style scoped lang="scss">
.close{
    font-size: 18px;
    color: #777;
    margin-left: 15px;
    cursor: pointer;
}
.none{
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}
.selected-currency{
    height: 300px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap; 
    >div{
        width: 30%;
    }

}
</style>