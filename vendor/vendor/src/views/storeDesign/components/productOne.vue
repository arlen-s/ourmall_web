<template>
    <!-- 单商品 -->
    <div class="right-box" :class="{'reverse':data.pictureRule=='right'}">
        <img :src="data.imgUrl" class="product-img" v-if="data && data.imgUrl">
        <img v-else src="../../../../public/images/productSet.png" class="product-img">
        <div class="right-action">
        <div class="product-title tx-ellipsis1">
            {{data.name}}
        </div>
        <div class="product-price" v-if="data.displayPrice">
            $ {{data.cost}}
        </div>
        <div class="add-list" :style="{color: data.btnColor, backgroundColor: data.btnBackground}">
            {{ data.buttonText || 'Add to list' }}
        </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['data'],
    data() {
        return {

        };
    },
    methods: {

    },
    components: {

    },
};
</script>

<style scoped lang="scss">
.reverse{
  flex-flow: row-reverse  
}
.right-box{
    width: 1200px;
    margin: 80px auto;
    display: flex;
    // justify-content: space-between;
    .product-img{
       width: 830px;
       height: 267px;
       object-fit: contain;
    }
    .right-action{
      display: flex;
      flex-direction: column;
      position: relative;
      justify-content: center;
      margin: 0 70px;
      .product-title{
        font-size: 31px;
        line-height: 42px;
        font-weight: bold;
        color: #2F2F2F;
        margin-bottom: 20px;
      }
      .product-price{
        font-size: 25px;
        color: #FB1010;
      }
      .add-list{
        margin-top: 20px;
        cursor: pointer;
        max-width: 380px;
        padding: 0 25px;
        height: 52px;
        background: #525252;
        border-radius: 4px;
        color: #fff;
        font-size: 22px;
        text-align: center;
        line-height: 52px;
      }  
    }
  }
</style>
