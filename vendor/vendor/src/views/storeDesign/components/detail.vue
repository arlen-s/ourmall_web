<template>
  <div class="detail-demo-wrap" :style="{paddingTop: `${$store.state.configJson.header.logoWidth}px`}">
    <div class="pagetitle">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/store-setting/detail' }">Products Market</el-breadcrumb-item>
        <el-breadcrumb-item>Clothing, Shoes&Accessories</el-breadcrumb-item>
        <el-breadcrumb-item>Athletic Shoes</el-breadcrumb-item>
      </el-breadcrumb>  
    </div>
    <!-- 商品详情 -->
    <el-card class="product-box">
      <div class="detailBox">
        <div class="img-view">
          <div class="show-img">
            <i class="el-icon-picture"></i>
          </div>
          <div class="list-wrap">
            <a href="javascript:;">
              <i class="el-icon-arrow-left"></i>
            </a>
            <ul>
              <li v-for="i in 3" :key="i">
                <div class="show-img-sub">
                  <i class="el-icon-picture"></i>
                </div>
              </li>
            </ul>
            <a href="javascript:;">
              <i class="el-icon-arrow-right"></i>
            </a>
          </div>
        </div>
        <div class="pro-detail">
          <div class="name">Product name</div>
          <div class="price"> $ 88.00</div>
          <div class="select-wrap">
            <!-- <el-select placeholder="Color"></el-select>
            <el-select placeholder="Size"></el-select> -->
          </div>
          <div class="attr">
            <span class="title">SKU:</span>
            <span class="val">sku111111</span>
          </div>
          <div class="attr">
            <span class="title">Weight:</span>
            <span class="val">55 g</span>
          </div>
          <!-- 觉得没用去掉了数量输入 -->
          <!-- <div class="num">
            <span class="title">Quantity:</span>
            <div class="ipt-num-wrap">
              <el-input-number value="10" size="small" style="width: 200px;"></el-input-number>
            </div>
          </div> -->
          <ul class="tags">
            <li v-for="tag in data.tags" :key="tag.text">
              <span class=" tx-danger">*</span>
              <span class="text">{{tag.text}}</span>
            </li>
          </ul>
          <div class="action">
            <el-button type="primary">Add to List</el-button>
          </div>
          <div v-if="data.imgSize == 'Tile'" class="inner-description">
            <p>Product Description content</p>
          </div>
        </div>
      </div>
      <div v-if="data.imgSize == 'Thumbnail'" class="descript">
        <el-tabs v-model="activeName">
          <el-tab-pane label="Description" name="first">
            <div class="detail-desc">
              <p>Product Description content</p>
            </div>
          </el-tab-pane>
        </el-tabs> 
      </div>
    </el-card>  
  </div>
</template>

<script>
export default {
  props: ["data"],
  data(){
    return {
      activeName: 'first',
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-demo-wrap{
  margin: 0 auto;
  max-width: 1300px;
  .product-box{
    margin-bottom: 30px;
    .detailBox{
      display: flex;
      margin-bottom: 20px;
      .img-view{
        .show-img{
          position: relative;
          width: 448px;
          height: 448px;
          border: 1px solid #ddd;
          i{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #C0C4CC;
            font-size: 256px;
          }
        }
        .list-wrap{
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          > a{
            display: flex;
            align-items: center;
            width: 20px;
            height: 54px;
            text-decoration: none;
            i{
              color: #909399;
              font-size: 22px;
            }
          }
          ul{
            display: flex;
            flex: 1;
            margin: 0;
            padding: 0 15px;
            li{
              margin-right: 10px;
              width: 54px;
              height: 54px;
              border: 1px #ddd solid;
              position: relative;
              i{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #C0C4CC;
                font-size: 32px;
              }
            }
          }
        }
      }
      .pro-detail{
        flex: 1;
        padding: 0 20px;
        .name{
          color: #252525;
          line-height: 36px;
          font-weight: 500;
          font-size: 24px;
        }
        .price{
          margin: 20px 0;
          color: #252525;
          height: 40px;
          line-height: 40px;
          font-size: 28px;
        }
        .attr{
          margin: 20px 0;
          height: 22px;
          line-height: 22px;
          font-size: 14px;
          .title{
            margin-right: 15px;
            color: #606266;
          }
          .val{
            color: #303133;
            font-weight: bold;
          }
        }
        .num{
          display: flex;
          align-items: center;
          margin-bottom: 25px;
          .title{
            margin-right: 15px;
            color: #606266;
          }
          .ipt-num-wrap{
            /deep/{
              .el-input-number__decrease, .el-input-number__increase{
                background-color: #fff;
              }
              .el-input{
                input{
                  font-weight: bold;
                }
              }
            } 
          }
        }
        .tags{
          display: flex;
          flex-wrap: wrap;
          margin: 0 0 25px 0;
          padding: 15px 0;
          li{
            margin-right: 15px;
            font-size: 12px;
            .text{
              color: #909399;
            }
          }
        }
        .action{
          margin-top: 30px;
          margin-bottom: 30px;
          .el-button{
            width: 360px;
            /deep/{
              span{
                font-size: 18px;
              }
            }
          }
        }
      }
    }
    .descript /deep/ .el-tabs__active-bar .is-top{
      width: 95px;
    }
    .descript /deep/ #tab-first{
      font-size: 20px;
    }
  }
}
</style>