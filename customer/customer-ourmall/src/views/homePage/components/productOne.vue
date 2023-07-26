<template>
    <!-- 单商品 -->
    <div class="right-box" :class="{'reverse':data.pictureRule=='right'}">
        <img :src="data.imgUrl" class="product-img" v-if="data && data.imgUrl">
        <img v-else src="../../../../public/images/productSet.png" class="product-img">
        <div class="right-action">
        <div class="product-title">
            {{data.name}}
        </div>
        <div class="product-price" v-if="data.displayPrice">
          {{$store.state.country.symbol}} {{$exchangeRate(data.cost)}}
        </div>
        <div class="add-list" :style="{color: data.btnColor, backgroundColor: data.btnBackground}" @click="import_pro(data.product)">
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
		import_pro(item) {
					this.$showLoading();
				  this.$apiCall(
				    "api.Product.addFromVendorShopProduct",
				    {
				      id: item.id,
				    },
				    (r) => {
				      if (r.ErrorCode == 9999) {
				        this.$message.success("Import Success !");
				      } else {
				        this.$message.error(r.Message);
				      }
					  this.$hideLoading();
				    }
				  );
				},
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
    width: 100%;
    margin: 80px auto;
    padding: 0 20px;
    display: flex;
    // justify-content: space-between;
    .product-img{
       width: 50%;
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
