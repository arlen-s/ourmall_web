<template>
  <div>
    <Header :title="'FEATURES'" />
    <div class="header2">
      <div class="content">
        <div class="row1">{{$t('Transform Your eCommerce business Into a Powerhouse')}}</div>
        <div class="row2">{{$t('Importify helps people like you to automate their dropshipping business.')}}</div>
      </div>
    </div>
    <div class="body">
      <div class="content">
        <el-row
          class="info-list"
          :gutter="50"
        >
          <el-col :span="8">
            <div class="info">
              <i class="i1"></i>
              <h3>{{$t('Product Research')}}</h3>
              <div class=" text">{{$t('Are you tired of searching the millions o products on AliExpress for potential winners?')}}{{$t('Are you tired of searching the millions o products on AliExpress for potential winners?')}}                
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="info">
              <i class="i2"></i>
              <h3>{{$t('One-click import products')}}</h3>
              <div class=" text">
                {{$t('Import products from 30+ top dropshipping vendors, Aliexpress, Alibaba, Amazon, Etsy, Dhgate, Lazada, Shopee, Banggood, Taobao, 1688, Gearbest, Walmart, and many more.')}}
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="info">
              <i class="i3"></i>
              <h3>{{$t('Pricing Rules')}}</h3>
              <div class=" text">
                {{$t('Tired of calculating your target profit margin? Create pricing rules before importing, quickly adjust prices for sales.')}}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row
          class="info-list"
          :gutter="50"
        >
          <el-col :span="8">
            <div class="info">
              <i class="i4"></i>
              <h3>{{$t('Product Customization')}}</h3>
              <div class=" text">
                {{$t('Use our chrome extension to modify the title, description, images, variants, pricing of the imported products.')}}
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="info">
              <i class="i5"></i>
              <h3>{{$t('Automate your orders')}}</h3>
              <div class=" text">
               {{$t('The Importify Chrome Extension allows you to fulfill your orders quickly by placing the customer address automatically on the checkout page.')}}
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="info">
              <i class="i6"></i>
              <h3>{{$t('Easy vendor Chang')}}e</h3>
              <div class=" text">
               {{$t('Replace your product vendor with a new vendor and connect them to your store with a click.')}}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row
          class="info-list"
          :gutter="50"
        >
          <el-col :span="8">
            <div class="info">
              <i class="i7"></i>
              <h3>{{$t('Auto Dispatch Collections')}}</h3>
              <div class=" text">
                {{$t('Auto-dispatch products to your Store collections supported on Shopify, WooCommerce, and Jumpseller.')}}
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="info">
              <i class="i8"></i>
              <h3>{{$t('Split Variants')}}</h3>
              <div class=" text">
                {{$t('Importify gives you the ability to Split variants into Separate products.')}}
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="info">
              <i class="i9"></i>
              <h3>{{$t('Connect Existing Products')}}</h3>
              <div class=" text">
                {{$t('If you have products that are already on a Shopify, Woocommerce or Jumpseller store, you can connect and manage them in Importify.')}}
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./../components/PageHeader";
import Footer from "./../components/PageFooter"
export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
.header2 {
  background-color: #e8f4fb;
  .content {
    margin: 0 auto;
    width: 1300px;
    padding: 32px 0 15px;
    .row1 {
      margin: 0 auto 25px;
      width: 490px;
      text-align: center;
      line-height: 32px;
      font-size: 26px;
    }
    .row2 {
      text-align: center;
      color: #909399;
    }
  }
}
.body {
  background: #fff;
  .content {
    margin: 0 auto;
    padding: 60px 0 25px;
    width: 1300px;
    .info-list {
      margin-bottom: 100px;
      .info{
        position: relative;
        padding: 15px;
        background: #fff;
        i{
          position: absolute;
          top: 5px;
          right: 25px;
          width: 50px;
          height: 50px;
          background-image: url('./../../public/images/home/features-icon.png');
          background-size: 100%;
          background-repeat: no-repeat;
        }
        i.i2{
          background-position: 0 -50px;
        }
        i.i3{
          background-position: 0 -100px;
        }
        i.i4{
          background-position: 0 -150px;
        }
        i.i5{
          background-position: 0 -200px;
        }
        i.i6{
          background-position: 0 -250px;
        }
        i.i7{
          background-position: 0 -300px;
        }
        i.i8{
          background-position: 0 -350px;
        }
        i.i9{
          background-position: 0 -400px;
        }
        h3{
          margin-bottom: 25px;
          font-weight: bold;
          font-size: 18px;
        }
        .text{
          line-height: 26px;
          color: #909399;
        }
      }
      .info:hover{
        box-shadow: 1px 1px 12px 2px #eee;
      }
    }
  }
}
</style>