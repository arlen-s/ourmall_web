<template>
  <div class="contentpanel get-order-page" v-loading="loading">
    <div class="select-add-box">
      <div class="pagetitle" ref="pageHeader">
        <div class="left">
          <div class="title">
            <i class="el-icon-s-order"></i>
            <h2>{{$t('Place Order')}}</h2>
          </div>
        </div>
        <div class="right"></div>
      </div>
      <div class="pagebody" >
        <el-row :gutter="10" class=" mg-b-15">
          <el-col :span="24">
            <el-card shadow="always" style="margin-bottom: 10px">
              <div class="add-card-header">
                <div><router-link to="/cart"><i class="el-icon-arrow-left"></i> {{$t('back')}}</router-link></div>
                <div>
                  <el-link type="success" icon="el-icon-plus" class="mg-r-20" 
                    @click="openAddAdd()"
                  >
                    {{$t('Add New Address')}}
                  </el-link>
                  <el-link type="primary" @click="$router.push({path:'/manage-addresses'})">{{$t('Manage-Addresses')}}</el-link>
                </div>
              </div>
              <template v-if="addList.length">
                <swiper ref="mySwiper" :options="swiperOptions" class="mg-b-20">
                  <swiper-slide v-for="add in addList" :key="add.id">
                    <el-card class="add-card" :class="{default: add.isDefault == '1', active: add.id == activeAddressId}" @click.native="selectActive(add)">
                      <div class="default-tx">{{$t('Default Address')}}</div>
                      <div class="name">{{add.firstName}} {{add.lastName}}</div>
                      <el-divider></el-divider>
                      <div class="add-row tx-ellipsis1">
                        {{add.address1}}
                      </div>
                      <div class="add-row tx-ellipsis1">{{add.province}}</div>
                      <div class="add-row tx-ellipsis1">{{codeToCountry(add.country)}} ({{add.country}})</div>
                      <div class="add-row tx-ellipsis1">{{add.phone}}</div>
                      <div class="action">
                        <el-link type="primary" @click.stop="openAddAdd(add)">{{$t('Edit')}}</el-link>
                      </div>
                      <div class="active-badge">
                        <i class="el-icon-check"></i>
                      </div>
                    </el-card>
                  </swiper-slide>
                </swiper>
                <div
                  class="swiper-button swiper-button-prev"
                  :class="{ disable: !activeIndex }"
                  @click="prev"
                >
                  <i class="el-icon-arrow-left"></i>
                </div>
                <div
                  class="swiper-button swiper-button-next"
                  :class="{ disable: isEnd }"
                  @click="next"
                >
                  <i class="el-icon-arrow-right"></i>
                </div>
                <div class="swiper-scrollbar"></div>
              </template>
              <div v-else class="mg-b-20">
                <el-row :gutter="25">
                  <el-col :span="8">
                    <el-card class="add-ads-placeholder" @click.native="openAddAdd()">
                      <span>{{$t('Add New Address')}}</span>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
              <el-row v-if="activeAddressId" :gutter="10" class=" mg-b-10">
                <el-col :span="24">
                  {{$t('Address')}}: <b style="color: #909399;">{{`${activeAddObj.address1} ${activeAddObj.street} ${activeAddObj.city}`}}</b>
                </el-col>
              </el-row>
              <el-row v-if="activeAddressId" v-loading="logisticLoading" :gutter="10">
                <el-col :span="12">
                  <el-form>
                    <el-form-item
                      v-if="!logisticLoading && logisticList.length"
                      label="Shipping Method"
                      style="margin: 0;"
                    >
                      <el-select size="small" v-model="activeLogistc" class=" mg-r-15">
                        <el-option v-for="logistc in logisticList" :key="logistc.expresstype" :label="logistc.expresstype" :value="logistc.expresstype">
                          <span style="float: left">{{ logistc.expresstype }}</span>
                          <span style="float: right; color: #909399; font-size: 12px">$ {{ logistc.freight }}</span>
                        </el-option
                        >
                      </el-select>
                      <span v-if="activeLogistic" style="color: #909399">$ {{activeLogistic.freight}}</span>
                    </el-form-item>
                    <el-alert
                      v-else
                      :title="$t('There is no Shipping method to reach the current address')"
                      type="warning"
                      show-icon
                      :closable="false"
                    >
                    </el-alert>
                  </el-form>                 
                </el-col>
              </el-row>
              <el-row v-else>
                <el-col :span="8">
                  <el-alert
                    :title="$t('Please select address')"
                    type="warning"
                    show-icon
                    :closable="false"
                  >
                  </el-alert>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
        <!-- order info -->
        <el-row :gutter="10" class="order-info-wrap">
          <el-col :span="24">
            <h2>{{$t('Order Information')}}</h2>
          </el-col>
          <el-col :span="24">
            <el-card class=" mg-b-15">
              <el-table :data="skuList" style="margin-bottom: 15px;">
                <el-table-column
                  :label="$t('Product information')"
                >
                  <template slot-scope="scope">
                    <div class="product-info">
                      <a :href="`/item/${scope.row.productId}/${scope.row.name.replace(/\s+/g, '-').replace(/[^\w]/g,'_')}.html`" target="_blank" v-if="vendorId != 148982 && vendorId != 146428&& vendorId != 144875&& vendorId != 144843&& vendorId != 143779&& vendorId != 143654&& vendorId != 74">
                        <el-image
                          class="product-img"
                          :fit="'cover'"
                          :src="scope.row.propertyImage"
                          lazy
                        >
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                      </a>
                      <a :href="`/itemOld/${scope.row.productId}/${scope.row.name.replace(/\s+/g, '-').replace(/[^\w]/g,'_')}.html`" target="_blank">
                        <el-image
                          class="product-img"
                          :fit="'cover'"
                          :src="scope.row.propertyImage"
                          lazy
                        >
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                      </a>                      
                      <div class="right">
                        <a :href="`/item/${scope.row.productId}/${scope.row.name.replace(/\s+/g, '-').replace(/[^\w]/g,'_')}.html`" target="_blank" v-if="vendorId != 148982 && vendorId != 146428&& vendorId != 144875&& vendorId != 144843&& vendorId != 143779&& vendorId != 143654&& vendorId != 74">{{scope.row.name}}</a>
                         <a :href="`/itemOld/${scope.row.productId}/${scope.row.name.replace(/\s+/g, '-').replace(/[^\w]/g,'_')}.html`" target="_blank" v-else>{{scope.row.name}}</a>
                        <div class="tx-ellipsis1">{{formatAttr(scope.row.propertyValue)}}</div>
                        <div class="sku">SKU: <span>{{scope.row.sku}}</span></div>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('Price')"
                  width="140"  
                >
                  <template slot-scope="scope">
                    <span>$ {{scope.row.price}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('Quantity')"
                  width="120"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.quantity}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('Subtotal')"
                  width="150" 
                >
                  <template slot-scope="scope">
                    <span style="color: #F56C6C; font-weight: bold; font-size: 14px;">
                       $ {{Number(scope.row.subtotal).toFixed(2)}}
                    </span>
                  </template>
                </el-table-column>
              </el-table>
              <div class="total-box">
                <div class="total-row r1">
                  <span style=" margin-right: 35px;">1 Unit</span> {{$t('Product Price')}}: <span class=" mg-l-5">${{priceTotal}}</span> 
                </div>
                <div class="total-row r2">
                 {{$t('Shipping Cost')}}: <span class=" mg-l-5">{{activeLogistic ? `$ ${Number(activeLogistic.freight).toFixed(2)}` : '---'}}</span> 
                </div>
                <div class="total-row r3">
                  {{$t('Total Amount')}}: <span class=" mg-l-5">$ {{totalAmount}}</span> 
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="24">
            <div class="submit-box">
              <el-button class="submit-btn" type="primary" :loading="placeOrderLoading" @click="setPlaceOrder" id="placeOrderSubmit">
                <span id="placeOrderSubmitInner">{{$t('submit')}}</span>
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <DialogEditAdd :data="dialogEditAdd" @setAdd="setAdd"/>
  </div>
</template>

<script>
import countryArr from "@/components/country.json";
import DialogEditAdd from "@/components/addresse/DialogEditAdd"
let vm;
export default {
  data() {
    return {
      loading: false,
      countryArr: [],
      vendorId:localStorage.getItem('vendorId'),
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        scrollbar: {
          el: ".swiper-scrollbar",
        },
        on: {
          init(){
            vm.activeIndex = this.activeIndex;
            vm.isBeginning = this.isBeginning;
            vm.isEnd = this.isEnd;
          },
          slideChange(){
            vm.activeIndex = this.activeIndex;
            vm.isBeginning = this.isBeginning;
            vm.isEnd = this.isEnd;
          }

        }
        // Some Swiper option/callback...
      },
      activeIndex: 0,
      isBeginning: true,
      isEnd: true,
      dialogEditAdd: {
        isShow: false,
        loading: false,
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        country: '',
        province: '',
        city: '',
        street: '',
        company: '',
        phone: '',
        postcode: '',
        isDefault: false,
        addressId: '',
      },
      dialogEditAddDefault: '{}',
      addList: [],
      skuList: [],
      activeAddressId: '',
      logisticLoading: false,
      logisticList: [],
      activeLogistc: '',
      placeOrderLoading: false,
    };
  },
  components: {
    DialogEditAdd,
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    priceTotal(){
      let p = 0;
      this.skuList.forEach(e => {
        p += Number(e.subtotal)
      })
      return p
    },
    activeAddObj(){
      let obj = null;
      this.addList.some(e => {
        if(e.id == this.activeAddressId){
          obj = e
          return true;
        }
      })
      return obj
    },
    activeLogistic(){
      let obj = null;
      this.logisticList.some(e => {
        if(e.expresstype == this.activeLogistc){
          obj = e;
          return true;
        }
      })
      return obj
    },
    totalWeight(){
      let w = 0;
      this.skuList.forEach(e => {
        if(e.weight){
          w += Number(e.weight) * Number(e.quantity)
        }
      });
      return parseInt(w);
    },
    totalAmount(){
      //计算总价
      let p = '---';
      if(this.activeLogistic && this.skuList.length)
        p = (Number(this.priceTotal) +  Number(this.activeLogistic.freight)).toFixed(2)
      return p;  
    },
  },
  watch: {
    activeAddressId(){
      if(this.activeAddressId && this.activeAddObj){
        //获取物流方式
        this.logisticLoading = true;
        this.$apiCall('api.PurchaseOrder.getLogisticFee', {
          countryCode: this.activeAddObj.country,
          weight: this.totalWeight ? this.totalWeight : 1, //一定要传个值
        }, r => {
          this.logisticLoading = false;
          if (r.ErrorCode == "9999") {
            this.logisticList = r.Data.Results;
            // 只有一个
            // if(this.logisticList.length == 1){
            //   this.activeLogistc = this.logisticList[0].expresstype;
            // }
          }else{
            this.$elementMessage(r.Message, "error");
          }
        })
      }
    }
  },
  created(){
    vm = this;
  },
  mounted() {   
    this.dialogEditAddDefault = JSON.stringify(this.dialogEditAdd)
    //格式化国家
    Object.keys(countryArr).forEach((key) => {
      Object.keys(countryArr[key]).forEach((key2) => {
        this.countryArr.push({
          label: countryArr[key][key2].nameEN,
          value: countryArr[key][key2].code2,
        });
      });
    });
    if(this.$route.query.a == 'place'){
      this.skuList = JSON.parse(localStorage.getItem('c_cartSelectList'))
    }else{
      if(this.$route.params.placeOrderArr && this.$route.params.placeOrderArr.length){
        this.skuList = [...this.$route.params.placeOrderArr]
      }
    }
    
    this.getAddList(1);
  },
  methods: {
    setPlaceOrder(){
      //下单
      if(!this.activeAddObj){
        this.$elementMessage(this.$t('Please select a shipping address'), "error");
        return;
      }
      if(!this.activeLogistic){
        this.$elementMessage(this.$t('Please select a shipping method'), "error");
        return;
      }
      let params = {
        addressId: this.activeAddressId,
        logistic: this.activeLogistc,
        stockIds: this.skuList.map(e => {return e.stockId})
      }
      this.placeOrderLoading = true;
      this.$apiCall("api.PurchaseOrder.placeOrder", params, r =>{
        this.placeOrderLoading = false;
        if (r.ErrorCode == "9999") {
          this.$Burying({
            object: '13005',
            objectId: r.Data.Results.id
          })
          this.$router.push({name: 'purchaseList',params: {action: 'pay'}})
        }else{
          this.$elementMessage(r.Message, "error");
        }
      })
    },
    selectActive(item){
      //选择发货
      this.activeAddressId = item.id;
      this.activeLogistc = '';
    },
    getAddList(init, id){
      //获取地址列表
      this.loading = true;
      this.$apiCall('api.Address.addressList', {}, r => {
        this.loading = false;
        if (r.ErrorCode == "9999") {
          let activeDefault = null;
          this.addList = r.Data.Results;
          //默认地址总在第一个
          if(this.addList.length > 1){
            this.addList.some((e,i)=>{
              if(e.isDefault == '1'){
                activeDefault = e;
                this.addList.splice(i, 1)
                return true;
              }
            })
            if(activeDefault)
              this.addList.unshift(activeDefault)
          }
          if(this.activeAddressId == id){
            this.activeAddressId = '';
            setTimeout(()=>{
              this.activeAddressId = id;
            },500)
          }
          if(!init){
            return;
          }
          if(this.addList.length > 3){
            this.isEnd = false;
          }
          
          if(this.activeAddressId){
            return;
          }
           //选默认
          this.addList.some((e, index) => {
            if(e.isDefault == '1'){
              this.activeAddressId = e.id;
              return true;
            }
          })
        }else{
          this.$elementMessage(r.Message, "error");
        }
      })
    },
    codeToCountry(val){
      let c ='';
      this.countryArr.some(e => {
        if(e.value == val){
          c = e.label
          return true;
        }
      })
      return c;
    },
    prev() {
      this.swiper.slidePrev();
      this.isBeginning = this.swiper.isBeginning;
      this.isEnd = this.swiper.isEnd;
    },
    next() {
      this.swiper.slideNext();
      this.isBeginning = this.swiper.isBeginning;
      this.isEnd = this.swiper.isEnd;
    },
    openAddAdd(item){
      this.dialogEditAdd = JSON.parse(this.dialogEditAddDefault)
      if(item){
        //修改
        this.dialogEditAdd.firstName = item.firstName;
        this.dialogEditAdd.lastName = item.lastName;
        this.dialogEditAdd.address1 = item.address1;
        this.dialogEditAdd.address2 = item.address2;
        this.dialogEditAdd.country = item.country;
        this.dialogEditAdd.province = item.province;
        this.dialogEditAdd.city = item.city;
        this.dialogEditAdd.street = item.street;
        this.dialogEditAdd.company = item.company;
        this.dialogEditAdd.phone = item.phone;
        this.dialogEditAdd.postcode = item.postcode;
        this.dialogEditAdd.isDefault = item.isDefault == 1;
        this.dialogEditAdd.addressId = item.id;
      }
      this.dialogEditAdd.isShow = true;
    },
    setAdd(){ 
      //保存地址成功
      this.getAddList( undefined, this.dialogEditAdd.addressId);
      this.dialogEditAdd.isShow = false;
      this.$elementMessage(this.$t('save successfully'  ), "success");
    },
    formatAttr(attr){
      attr = attr.split("||")
      attr = attr.filter(s => {
        return s && s.trim();
      })
      let str = attr.join(',')
      return str
    }
  },
};
</script>
<style lang="scss">
.get-order-page{
  .el-loading-mask{
    z-index: 3 !important;
  }
}
.add-card {
  .el-card__body {
    padding: 10px 15px;
  }
}
</style>
<style lang="scss" scoped>
.select-add-box {
  position: relative;
  .add-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 36px;
  }
  .add-card {
    position: relative;
    color: #606266;
    overflow: hidden;
    cursor: pointer;
    .name {
      padding: 5px 0;
      color: #5c6ac4;
      font-weight: bold;
    }
    .el-divider {
      margin: 0 0 10px 0;
    }
    .add-row {
      margin-bottom: 5px;
      height: 18px;
      line-height: 18px;
      font-size: 12px;
    }
    .default-tx {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      background-color: #dcdfe6;
      padding: 0 5px;
      font-size: 12px;
    }
    .active-badge {
      display: none;
      position: absolute;
      right: -18px;
      bottom: -18px;
      transform: rotate(45deg);
      background-color: #5c6ac4;
      width: 36px;
      height: 36px;
      i {
        position: absolute;
        top: 10px;
        left: 0;
        color: #fff;
        transform: rotate(-45deg);
      }
    }
  }
  .add-card.default {
    border-image: repeating-linear-gradient(
        -225deg,
        red 0,
        red 10px,
        transparent 10px,
        transparent 20px,
        #58a 20px,
        #58a 30px,
        transparent 30px,
        transparent 40px
      )
      20;
    .default-tx {
      display: block;
    }
  }
  .add-card.active {
    border-image: none;
    border: 1px #5c6ac4 dashed;
    .active-badge {
      display: block;
    }
  }
  .add-card:hover {
    border-image: none;
    border: 1px #5c6ac4 dashed;
  }
}
.swiper-button {
  position: absolute;
  top: 130px;
  z-index: 1;
  color: #fff;
  background-color: #5c6ac4;
  width: 26px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
}
.swiper-button-prev {
  left: -5px;
}
.swiper-button-next {
  right: -5px;
}
.swiper-button.disable {
  background-color: #c0c4cc;
  color: #f2f6fc;
  cursor: no-drop;
}
.add-ads-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px #dcdfe6 dashed;
  min-height: 160px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  span {
    color: #909399;
  }
}
.add-ads-placeholder:hover {
  border-color: #5c6ac4;
  span {
    color: #5c6ac4;
  }
}
.order-info-wrap{
  h2{
    margin-bottom: 15px;
    color: #606266;
    font-weight: bold;
    font-size: 16px;
  }
}
.product-info{
  display: flex;
  .product-img{
    margin-right: 15px;
    width: 100px;
    height: 100px;
    border: 1px #DCDFE6 solid;
  }
}
.total-box{
  padding: 0 20px;
  .total-row{
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;
    color: #909399;
    font-size: 16px;
    span{
      color: #606266;
    }
  }
  .r3{
    margin-bottom: 0;
    color: #F56C6C;
    font-size: 18px;
    span{
      color: #F56C6C;
      font-weight: bold;
    }
  }
}
.image-slot{
  i{
    margin: 0;
    color: #C0C4CC;
    transform: translate(-50%, -50%);
    font-size: 24px;
  }
}
.submit-box{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
  > .submit-btn{
    margin-right: 15px;
    box-shadow: 0 2px 12px 0 #999;
  }
}
</style>