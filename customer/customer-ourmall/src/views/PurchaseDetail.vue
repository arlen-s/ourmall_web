<template>
  <div class="contentpanel p-d-page">
    <div class="top-breadcrumb">
       <i class="el-icon-arrow-left"></i> <a href="javascript:;" @click="$router.go(-1)">Back</a>
    </div>
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-receiving"></i>
          <h2>Order Details</h2> 
        </div>
      </div>
      <div class="right">

      </div>
    </div>
    <div class="pagebody" v-loading="loading" style="min-height: 200px;">
      <div v-if="item" class="detail-box">
        <div class="header-box">
          <span class=" mg-r-20">{{moment.unix(item.timeCreated).format("ll [at] LTS")}}</span>
          <span class=" mg-r-20" style="color: #909399;">(Sub Order NO: <b style="color: #F56C6C;">{{item.code}}</b>)</span>
          <span class="mg-r-20" style="color: #909399;">Status: <span :class="$dict.PurchaseStatus[item.status].color">{{ $dict.PurchaseStatus[item.status].text }}</span></span>
        </div>
        <div class="table-box">
          <el-row :gutter="10" class="table-header">
            <el-col :span="8">Product Information</el-col>
            <el-col :span="2">Unit Price</el-col>
            <el-col :span="2" style="justify-content: center;">Quantity</el-col>
            <el-col :span="2">Sub Total</el-col>  
            <el-col :span="4">Grand Total</el-col>
            <el-col :span="6">Address</el-col>
          </el-row>
          <el-row :gutter="10" class="table-body" v-for="(sku, si)  in item.items" :key="sku.id">
            <el-col :span="8" class=" td">
              <div class="product-info">
                <a v-if="vendorId != 148982 && vendorId != 146428&& vendorId != 144875&& vendorId != 144843&& vendorId != 143779&& vendorId != 143654&& vendorId != 74"
                  :href="`/item/${sku.product.id}/${sku.product.name
                    .replace(/\s+/g, '-')
                    .replace(/[^\w]/g, '_')}.html`"
                  target="_blank"
                >
                  <el-image
                    class="product-img"
                    :fit="'cover'"
                    :src="sku.product.imgUrl"
                    lazy
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </a>
                <a v-else
                  :href="`/itemOld/${sku.product.id}/${sku.product.name
                    .replace(/\s+/g, '-')
                    .replace(/[^\w]/g, '_')}.html`"
                  target="_blank"
                >
                  <el-image
                    class="product-img"
                    :fit="'cover'"
                    :src="sku.product.imgUrl"
                    lazy
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </a>
                <div class="right">
                 <a  v-if="vendorId != 148982 && vendorId != 146428&& vendorId != 144875&& vendorId != 144843&& vendorId != 143779&& vendorId != 143654&&  vendorId != 74"
                    class="name tx-ellipsis2"
                    :href="`/item/${
                      sku.product.id
                    }/${sku.product.name
                      .replace(/\s+/g, '-')
                      .replace(/[^\w]/g, '_')}.html`"
                    target="_blank"
                  >
                    {{ sku.product.name }}
                  </a>
                  <a v-else
                    class="name tx-ellipsis2"
                    :href="`/itemOld/${
                      sku.product.id
                    }/${sku.product.name
                      .replace(/\s+/g, '-')
                      .replace(/[^\w]/g, '_')}.html`"
                    target="_blank"
                  >
                    {{ sku.product.name }}
                  </a>
                  <div>{{formatAttr(sku.stock.propertyValue)}}</div>
                  <div class="sku" style="color: #909399">
                    SKU
                    <span style="color: #303133">{{ sku.product.sku }}</span>
                  </div>
                  <div v-if="item.status == '5' || item.status == '6'" style="color: #909399">
                    Tracking Number:  <span style="color: #303133">{{ sku.trackNumber || '---' }}</span> <span style="color: #303133">({{sku.trackCompany || '---'}})</span>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="2" class="td price">
              $ {{Number(sku.price).toFixed(2)}} <i class="el-icon-close"></i>
            </el-col>
            <el-col :span="2" class=" td" style="justify-content: center;">{{sku.oQuantity}}</el-col>
            <el-col :span="2" class=" td" >$ {{(Number(sku.price) * Number(sku.oQuantity)).toFixed(2)}}</el-col>
            <el-col :span="4" class="g-t td" :class="{last: (si+1) == item.items.length}">
              <template v-if="!si">
                <div class="t-a">
                  Total Amount: <span>$ {{Number(item.totalAmount).toFixed(2)}}</span>
                </div>
                <div>Weight: <span>0.14kg</span></div> 
                <div>Products Cost: <span>$ {{Number(item.itemAmount).toFixed(2)}}</span></div> 
                <div>Shipping: <span>$ {{Number(item.shippingAmount).toFixed(2)}}</span></div> 
              </template>
            </el-col>
            <el-col :span="6" class=" td add" :class="{last: (si+1) == item.items.length}">
              <template v-if="!si">
                <div>{{item.shippingObj.name}}</div>
                <div>{{item.shippingObj.address1}}</div>
                <div>{{item.shippingObj.street}}</div>
                <div>{{item.shippingObj.city}}</div>
                <div>{{item.shippingObj.province}}</div>
                <div>{{item.shippingObj.country}}({{item.shippingObj.country_code}})</div>
                <div>{{item.shippingObj.trackCompany}}</div>
              </template>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  data(){
    return {
      loading: false,
      item: null,
    vendorId:  localStorage.getItem('vendorId')
    }
  },
  mounted(){
    if(this.$route.query.code){
      this.getOrder(this.$route.query.code);
    }
  },
  methods: {
    getOrder(code){
      this.loading = true;
      this.$apiCall("api.PurchaseOrder.findByCustomer", {code}, r => {
        this.loading = false;
        if (r.ErrorCode == 9999) {
          this.item = {...r.Data.Results[0]}
          this.item.shippingObj = JSON.parse(this.item.shippingJson)
        }else{
          this.$message({ message: r.Message, type: "error" });
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
  },
}
</script>

<style lang="scss" scoped>
.detail-box{
  margin-bottom: 10px;
  border: 1px solid #DCDFE6;
  border-bottom: none;
  .header-box{
    display: flex;
    align-items: center;
    height: 36px;
    padding: 0 15px;
    background-color: #DCDFE6;
  }
  .table-box{
    background-color: #fff;
    .table-header{
      margin: 0 !important;
      border-bottom: 1px solid #dcdfe6;
      > .el-col{
        display: flex;
        align-items: center;
        min-height: 32px;
        font-weight: bold;
      }
    }
    .table-body{
      display: flex;
      align-items: stretch;
      margin: 0 !important;
      .td{
        display: flex;
        align-items: center;
        padding: 15px;
        border-bottom: 1px solid #dcdfe6;
        .product-info{
          display: flex;
          .product-img{
            margin-right: 15px;
            width: 70px;
            height: 70px;
          }
          .right{
            font-size: 12px;
            .name{
              margin-bottom: 5px;
            }
          }

        }
      }
      .price{
        position: relative;
        > i{
          position: absolute;
          right: 0;
        }
      }
      .td.g-t{
        flex-direction: column;
        border-left: 1px solid #dcdfe6;
        border-right: 1px solid #dcdfe6;
        border-bottom: none;
        color: #909399;
        span{
          color: #606266;
          font-weight: bold;
        }
        .t-a{
          margin-bottom: 15px;
          font-weight: bold;
          span{
            color: #F56C6C;
          }
        }
      }
      .td.g-t.last,.td.add.last{
        border-bottom: 1px solid #dcdfe6;
      } 
      .td.add{
        display: flex;
        border-bottom: none;
        flex-direction: column;
        font-size: 12px;
      }
    }
    
  }
}
</style>