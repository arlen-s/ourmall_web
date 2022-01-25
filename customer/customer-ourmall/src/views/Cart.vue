<template>
  <div class="contentpanel cart-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-shopping-cart-full"></i>
          <h2>Cart</h2>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="pagebody" v-loading="loading">
      <el-row :gutter="15" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <el-row :gutter="15" style=" position: relative; top: -5px;">
              <el-col :span="24">
                <router-link to="/purchase-list" style=" margin-right: 15px"><i class=" el-icon-arrow-left"></i> back</router-link>
                <span style=" color: #909399;">All Items <b>{{this.items.length}}</b></span>
              </el-col>
            </el-row>
            <el-table ref="cartTable" :data="items" class="cart-list" @selection-change="handleSelectionChange">
              <el-table-column type="selection">

              </el-table-column>
              <!-- 商品图片 -->
              <el-table-column
                label="Check All"
                class="check-title"
                width="120"
              >
                <template slot="header">
                  <div class="check-title">Check All</div>
                </template>
                <template slot-scope="scope">
                  <a :href="`/item/${scope.row.productId}/${scope.row.name.replace(/\s+/g, '-').replace(/[^\w]/g,'_')}.html`" target="_blank">
                    <el-image
                      class="product-img"
                      @click="productClick(scope.row.productId)"
                      :fit="'cover'"
                      :src="scope.row.propertyImage"
                      lazy
                    >
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                  </a>
                </template>
              </el-table-column>
              <!-- 商品信息 -->
              <el-table-column
                label="Product"
                width="300"
              >
                <template slot-scope="scope">
                  <div class="product-info">
                    <div class="name tx-ellipsis1" @click="productClick(scope.row.productId)">
                      <a :href="`/item/${scope.row.productId}/${scope.row.name.replace(/\s+/g, '-').replace(/[^\w]/g,'_')}.html`"  target="_blank">Digital Themrmometer Hygrometer Living Ro Digital Themrmometer Hygrometer Living Ro</a>
                    </div>
                    <div class="tx-ellipsis1">{{formatAttr(scope.row.propertyValue)}}</div>
                    <div class="sku">
                      {{scope.row.sku}}
                    </div>
                  </div>
                </template> 
              </el-table-column>
              <!-- 单价 -->
              <el-table-column
                label="Price"
                width="120"
              >
                <template slot-scope="scope">
                  <div class="price">
                    $ {{scope.row.price}}
                  </div>
                </template>
              </el-table-column>
              <!-- 数量 -->
              <el-table-column
                label="Quantity"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.quantity" :min="1" :precision="0"
                    @change="(c,o)=>{updCartQty(scope.row, scope.$index, o)}"
                  ></el-input-number>
                </template>
              </el-table-column>
              <!-- 小计 -->
              <el-table-column
                label="Subtotal"
                width="120"
              >
                <template slot-scope="scope">
                  <div class="price">
                    $ {{Number(scope.row.subtotal).toFixed(2)}}
                  </div>
                </template>
              </el-table-column>
              <!-- 操作 -->
              <el-table-column
                label="Operate"
              >
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" icon="el-icon-delete"
                    @click="delCart(scope.row, scope.$index)"
                  >Delete</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="bottom-action">
      <div class="left">
        <el-checkbox :indeterminate="!!(multipleSelection.length && multipleSelection.length != items.length)" v-model="all" @change="checkAll($event)">
          Check All
        </el-checkbox>
        <el-link type="warning" :disabled="!multipleSelection.length" @click="delSelect">Delete selected items</el-link>
      </div>
      <div class="right">
        <div class="total-amount">Amount: <span>$ {{totalAmount}}</span></div>
        <div class="submit-btn-wrap">
          <el-button type="primary" :disabled="!multipleSelection.length" @click="toPlaceOrder" id="backendBulkPurchase">Bulk Purchase</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      baseURL: process.env.VUE_APP_BASEURL,
      loading: false,
      all: false,
      items: [],
      multipleSelection: [],
      changeCartTime: 0,
    }
  },
  computed: {
    isAll(){
      return this.items.length && this.multipleSelection.length == this.items.length
    },
    totalAmount(){
      let amount = 0;
      this.multipleSelection.forEach(e => {
        amount += Number(e.subtotal);
      })
      return Number(amount).toFixed(2);
    },
  },
  watch: {
    isAll(){
      this.all = this.isAll;
    }
  },
  mounted(){
    this.$Burying({
      object: '13001'
    })
    this.getCart();
  },
  methods: {
    productClick (id) {
      // 查看商品详情
      this.$Burying({
        object: '7002',
        objectId: id
      })
    },
    toPlaceOrder(){
      if (JSON.parse(localStorage.getItem('c_ourMallUserInfo')).verifyEmail == '2') {
        this.$emit('openVerify')
        return;
      }
      this.$Burying({
        object: '13007',
      })
      //下订单
      this.$router.push({name: 'placeOrder', params: {placeOrderArr: this.multipleSelection}})
    },
    checkAll(val){
      this.items.forEach(e => {
        this.$refs.cartTable.toggleRowSelection(e, val)
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delSelect(){
      //批量删除
      this.$confirm('Do you want to delete selected items?', '', {
        confirmButtonClass: " el-button--danger",
        type: "error",

      }).then(()=>{
        let stockIds = this.multipleSelection.map(e => {return e.stockId});
        this.loading = true;
        this.$apiCall('api.Cart.deleteCart', {stockIds}, r => {
        if (r.ErrorCode == "9999") {
         this.getCart();
        }else{
          this.$elementMessage(r.Message, "error");
        }
      })
        
      }).catch(()=>{})
    },
    delCart(item, index){
      item.delLoading = true;
      this.$Burying({
        object: '13004',
        objectId: item.stockId
      })
      this.$apiCall('api.Cart.deleteCart', {stockId: item.stockId}, r => {
        if (r.ErrorCode == "9999") {
          this.items.splice(index, 1)
        }else{
          this.$set(item, 'delLoading', false)
          this.$elementMessage(r.Message, "error");
        }
      })
    },
    updCartQty(item, index, oldValue){
      // 修改购物车数量
      clearTimeout(this.changeCartTime)
      this.changeCartTime = setTimeout(()=>{
        this.$Burying({
          object: "13003",
          objectId: item.stockId
        })
        this.$apiCall('api.Cart.updCartQuantity', {
          stockId: item.stockId,
          quantity: item.quantity,
        }, r => {
          if (r.ErrorCode == "9999") {
            r.Data.Results.updCart.delLoading = false;
            this.items.splice(index, 1, r.Data.Results.updCart);
            this.$nextTick(()=>{
              //改数据后任然选中
              this.$refs.cartTable.toggleRowSelection(this.items[index], true);
            })
            
          }else{
            this.$set(item, 'quantity', oldValue)
            this.$elementMessage(r.Message, "error");
          }
        })
      },500);
    },
    getCart(){
      //初始获取订单
      this.loading = true;
      this.$apiCall("api.Cart.getCartList", {}, r => {
        this.loading = false;
        if (r.ErrorCode == "9999") {
          this.items = [];
          let results = r.Data.Results;
          Object.keys(results).forEach(e => {
            results[e].delLoading = false;
            this.items.push(results[e])
          })
          //开场全选
          this.items.forEach(e => {
            this.$refs.cartTable.toggleRowSelection(e, true)
          })
        }else{
          this.$elementMessage(r.Message, "error");
        }
      })
    },
    formatAttr(attr){
      attr = attr.split("||")
      attr = attr.filter(s => {
        return s && s.trim();
      })
      let str = attr.join(',')
      return str
    }

  }
}
</script>

<style lang="scss">
.cart-list{
  margin-bottom: 50px;
  width: 100%;
  .el-table__header{
    margin: 0;
    border-top: 1px #E4E7ED solid;
  }
  thead{
    tr{
      th{
        background-color: #fdf6ec;
        overflow: initial;
        .cell{
          overflow: initial;
        }
      }
    }
    
  }
}
</style>

<style lang="scss" scoped>
.check-title{
  position: relative;
  left: -20px;
}
.product-img{
  width: 90px;
  height: 90px;
  border: 1px #DCDFE6 solid;
}
.product-info{
  .name{}
  .sku{
    color: #909399
  }
}
.price{
  font-weight: bold;
  font-size: 16px;
}
.bottom-action{
  position: fixed;
  bottom: 5px;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 235px;
  margin-right: 15px;
  padding: 0 0 0 20px;
  background-color: #fdf6ec;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  .left{
    display: flex;
    align-items: center;
    .el-checkbox{
      margin-right: 30px;
      margin-bottom: 0;
    }
  }

  .right{
    display: flex;
    align-items: center;
    .total-amount{
      margin-right: 50px;
      font-weight: bold;
      span{
        margin: 0 10px;
        color:#F56C6C;
        font-size: 24px;
      }
    }
    .submit-btn-wrap{
      button{
        border-radius: 0;
        height: 46px;
      }
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
</style>