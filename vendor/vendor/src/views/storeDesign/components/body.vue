<template>
  <div id="demoBody" 
  :style="{paddingTop: ($store.state.configJson.sort.length && $store.state.configJson.sort[0].type != 'slider') || (h ? !h.isTransparent  : !h.isTransparent ) ? `${h.logoWidth}px` : '0'}">
    <template v-for="item in $store.state.configJson.sort" >
      <div :key="item.cid" :id="`row${item.cid}`">
        <demoSlider  v-if="item.type == 'slider'" :data="item.cid == data.cid ? data : item"/>
        <demoRichText v-if="item.type == 'richText'" :data="item.cid == data.cid ? data : item"/>
        <demoProduct v-if="item.type == 'singleProduct'" :data="item.cid == data.cid ? data : item"/>
        <demoCategory v-if="item.type == 'productCategory'" :setting="item.cid == data.cid ? data : item"/>
        <demoSingleimg v-if="item.type == 'singleImg'" :data="item.cid == data.cid ? data : item"/>
        <demoProductList v-if="item.type == 'hotProduct'" :data="item.cid == data.cid ? data : item"/>
      </div>
    </template>
  </div>
</template>

<script>
import demoSlider from '@/views/storeDesign/components/slider'
import demoRichText from '@/views/storeDesign/components/richText'
import demoProduct from '@/views/storeDesign/components/productOne'
import demoCategory from '@/views/storeDesign/components/categoryList'
import demoSingleimg from '@/views/storeDesign/components/singleImg'
import demoProductList from '@/views/storeDesign/components/productList'

export default {
  props: ["data", "header"],
  data(){
    return {
      h: this.header || this.$store.state.configJson.header
    }
  },
  components: {
    demoSlider,
    demoRichText,
    demoCategory,
    demoSingleimg,
    demoProduct,
    demoProductList
  },
  watch: {
    header: {
      handler() {
        this.h = this.header;
      },
      deep: true,
    },
  },
  mounted(){
  }
}
</script>