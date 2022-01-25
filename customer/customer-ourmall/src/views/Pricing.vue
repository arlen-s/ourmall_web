<template>
  <div>
    <Header :title="'PRICING'" />
    <div class="header2">
      <div class="content">
        <div class="row1">Simple, Transparent Pricing</div>
        <div class="row2">mportify offers three types of plans; Basic plan, Premium plan, and Gold plan.

          Each account starts with a day trial, and your billing cycle begins after the free trial period has ended.</div>
      </div>
    </div>
    <div class="body">
      <div class="content">
        <el-row
          :gutter="0"
          class="p-row"
        >
          <el-col
            class="p-header"
            :span="6"
          >
            <div class="p-box">
              <div class="title">Importify Plans</div>
            </div>
          </el-col>
          <el-col
            class="p-header c1"
            :span="6"
          >
            <div class="p-box">
              <div class="title">Basics</div>
              <div class="sub-title">$14.95/ mo</div>
            </div>
          </el-col>
          <el-col
            class="p-header c2"
            :span="6"
          >
            <div class="p-box">
              <div class="title">Premium</div>
              <div class="sub-title">$27.95/ mo</div>
            </div>
          </el-col>
          <el-col
            class="p-header c3"
            :span="6"
          >
            <div class="p-box">
              <div class="title">Gold</div>
              <div class="sub-title">$37.95/ mo</div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="0" class="p-body">
          <el-col :span="6" class="p-td">
            Product Importer
          </el-col>
           <el-col :span="6" class="p-td">
            <i class="r"></i>
          </el-col>
           <el-col :span="6" class="p-td">
            <i class="r"></i>
          </el-col>
           <el-col :span="6" class="p-td">
            <i class="r"></i>
          </el-col>
        </el-row>
        <el-row :gutter="0" class="p-body">
          <el-col :span="6" class="p-td">
            Amazon & Aliexpress importer
          </el-col>
           <el-col :span="6" class="p-td">
            <i class="n"></i>
          </el-col>
           <el-col :span="6" class="p-td">
            <i class="r"></i>
          </el-col>
           <el-col :span="6" class="p-td">
            <i class="r"></i>
          </el-col>
        </el-row>
        <el-row :gutter="0" class="p-body">
          <el-col :span="6" class="p-td">
            Semi-automatic order fulfillment (Supported on Aliexpress, Amazon, Dhgate & Wonify)
          </el-col>
           <el-col :span="6" class="p-td">
            <i class="n"></i>
          </el-col>
           <el-col :span="6" class="p-td">
            <i class="n"></i>
          </el-col>
           <el-col :span="6" class="p-td">
            <i class="r"></i>
          </el-col>
        </el-row>
        <el-row :gutter="0" class="p-body">
          <el-col :span="6" class="p-td">
            Product Customisation
          </el-col>
           <el-col :span="6" class="p-td">
            <i class="n"></i>
          </el-col>
           <el-col :span="6" class="p-td">
            <i class="n"></i>
          </el-col>
           <el-col :span="6" class="p-td">
            <i class="r"></i>
          </el-col>
        </el-row>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./../components/PageHeader";
import Footer from "./../components/PageFooter";
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
  padding-bottom: 25px;
  background-color: #fff;
  .content {
    margin: 0 auto;
    width: 1300px;
    padding: 50px 0 15px;
    .p-row {
      display: flex;
      align-items: stretch;
      .p-header {
        padding: 25px;
        .p-box {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: center;
          text-align: center;
          .title{
            margin-bottom: 10px;
            font-weight: bold;
            font-size: 18px;
          }
          .sub-title{
            color: #fff;
            font-weight: bold;
            font-size: 16px;;
          }
        }
      }
    }
  }
}
.p-header {
  background-color: #fff;
}
.p-header.c1 {
  background-color: #3dd39f;
}
.p-header.c2 {
  background-color: #6c84ee;
}
.p-header.c3 {
  background-color: #9d50e3;
}
.p-body{
  display: flex;
  align-items: stretch;
  .p-td{
    position: relative;
    display: flex;
    align-items: center;
    padding: 20px;
    min-height: 100px;
    font-weight: bold;
    font-size: 16px;
    i{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      transform: translate(-50%, -50%);
      background-image: url('./../../public/images/home/have.png');
      background-size: contain;
    }
    i.n{
      background-image: url('./../../public/images/home/none.png');
    }
  }
  .p-td:nth-child(odd){
    background-color: #F2F6FC;
  }
}
</style>