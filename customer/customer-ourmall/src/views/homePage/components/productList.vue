<template>
    <div class="list-view">
        <h2 class="list-title">{{data.listTitle}}</h2>
        <div class="more-but" @click="goMore()">{{data.moreText}} <i class="el-icon-arrow-right"></i></div>
        <div class="noProduct" v-if="data.isOpen && defaultProductList.length == 0">
          <div>该分类下目前还没有商品</div>
          <!-- <el-button type="primary" @click="goToAdd">
            添加商品
          </el-button> -->
        </div>
        <div class="list" v-else>
        <div 
            v-for="(item,index) in defaultProductList" 
            :key="index" 
            class="product"
            :style="{'width':`${100/data.colNum}%`}" @click="goToDetail(item)">
            <div class="inner" v-if="index<(data.rowNum*data.colNum)">
                <div class="innerBox" :class="{
                  'col-num1':data.colNum == 1,'col-num2':data.colNum == 2,
                  'col-num3':data.colNum == 3,'col-num4':data.colNum == 4}" 
                >
                <div class="product-img">
                    <img :src="item.imgUrl">
                </div>
                </div>
                <div :style="{ 'text-align':data.textAlign}">
                <div class="product-name tx-ellipsis1">{{item.name}}</div>
                <div v-if="data.displayPrice" class="product-cost">{{$store.state.country.symbol}} {{$exchangeRate(item.cost)}}</div>
                </div>
            </div>
        </div>
        </div>
        
    </div>
</template>

<script>
export default {
    props: ['data'],
    data() {
        return {
           defaultProductData:{
            name:'Product Title',
            cost:'88.88',
            imgUrl:require("../../../../public/images/productList.png")
        },
          vendorId: localStorage.getItem('vendorId'),
        };
    },
    computed:{
    defaultProductList(){
        let Arr = [];
        if(this.data.isOpen && this.data.productItems){
          Arr = this.data.productItems
        }else{
          for(let i=0;i<(this.data.rowNum*this.data.colNum);i++){
            Arr.push(this.defaultProductData);
          }
        }
        return Arr
    },
    },
    methods: {
		goMore() {
		  this.$Burying({
		    object: '3012',
		    objectId: `${id}`
		  })
			let id = this.data.categoryItem.id;
		    let name = this.data.categoryItem.name;
		  window.open(`/category/${id}/${name.replace(/\s+/g,"-")}.html`)
		},
		goToDetail(item) {
		  this.$Burying({
		    object: '3011',
		    objectId: item.id
		  })
      if ( this.vendorId != 148982 && this.vendorId != 146428 && this.vendorId != 144875 && this.vendorId != 144843 && this.vendorId != 143779 && this.vendorId != 143654 && this.vendorId != 74) {
		  window.open(`/item/${item.id}/${item.name.replace(/\s+/g,"-").replace(/\//g,'_')}.html`)
      }else{
        		  window.open(`/itemOld/${item.id}/${item.name.replace(/\s+/g,"-").replace(/\//g,'_')}.html`)
      }

		  // this.$router.push({
		  //   path: `/item/${item.id}/${item.name.replace(/\s+/g,"-").replace(/\//g,'_')}.html`,
		  // })
		},
       goToAdd(){
        this.$router.push('/goods-mgr/all')
      }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
.list-view{
    width: 1420px;
    margin: 80px auto;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .more-but{
      position: absolute;
      right: 15px;
      top: 15px;
      font-weight: 600;
      font-family: PingFangSC-Semibold, PingFang SC;
      color: #3C3C3C;
      i{
        font-weight: 600;
        position: relative;
        color: #747474;
        top: 1px;
      }
    }
    .list-title{
      font-size: 31px;
      font-weight: bold;
      color: #2F2F2F;
      line-height: 37px;
      margin-bottom: 52px;
    }
    .list{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .product{
        padding: 0 20px;
        margin-bottom: 40px;
        width: 25%;
        .inner{
          width: 100%;
          padding-bottom: 15px;
          box-shadow: 0 1px 4px 0px rgba(33, 33, 33, 0.16);
          border-radius: 5px;
          overflow: hidden;
          .innerBox{
            position: relative;
            overflow: hidden;
          }
          .col-num1{
            padding-bottom:35%
          }
          .col-num2{
            padding-bottom:74%
          }
          .col-num3{
            padding-bottom:100%
          }
          .col-num4{
            padding-bottom:80%
          }
          .product-img{
            position: absolute;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background-color: #E5E5E5;
            > img{
              width: 100%;
              object-fit: contain;
            }
          }
          .product-name{
            font-size: 20px;
            font-weight: 400;
            color: #333333;
            line-height: 28px;
            margin: 22px 16px 13px 16px;
          }
          .product-cost{
            color: #FB1010;
            font-size: 20px;
            font-weight: 500;
            line-height: 28px;
            margin: 0 16px;
          }
        }
      }
    }
  }
  .noProduct{
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
      font-size: 30px;
      margin-top:90px;
      margin-bottom:50px
    }
  }
</style>
