<template>
<!-- 
1 shopify
2 woocommerce
3 lazada
4 shopee -->
    <div class="shop">
          <el-tooltip class="item" effect="dark" v-if="items.platform == 1"
           content="Shopify" placement="left">
             <img src="./../../public/images/shop/shopify_icon.png" class="shopImg">        
          </el-tooltip>
          <el-tooltip class="item" effect="dark" v-else-if="items.platform == 2"
           content="Woocommerce" placement="left">
             <img src="./../../public/images/shop/woo_icon.png" class="shopImg">           
          </el-tooltip>
          <el-tooltip class="item" effect="dark" v-else-if="items.platform == 3" 
           content="Lazada" placement="left">
             <img src="./../../public/images/shop/lazada_icon.png" class="shopImg">            
          </el-tooltip>
          <el-tooltip class="item" effect="dark" v-else-if="items.platform == 4"
           content="Shopee" placement="left">
             <img src="./../../public/images/shop/shopee_icon.png" class="shopImg">            
          </el-tooltip>
    </div>
</template>

<script>
export default {
    props: ["items"],
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
.shop{
  display: inline-block;
}
.shopImg{
    width: 18px;
    height: 18px;
    border-radius: 3px;
    margin-right: 3px;
}
</style>
