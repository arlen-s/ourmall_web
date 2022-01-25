<template>
  <div id="demoBody" :style="{paddingTop: ($store.state.configJson.sort.length && $store.state.configJson.sort[0].type != 'slider') || !data.header.isTransparent ? `${data.header.logoWidth}px` : ''}">
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
import demoSlider from '@/views/homePage/components/slider'
import demoRichText from '@/views/homePage/components/richText'
import demoProduct from '@/views/homePage/components/productOne'
import demoCategory from '@/views/homePage/components/categoryList'
import demoSingleimg from '@/views/homePage/components/singleImg'
import demoProductList from '@/views/homePage/components/productList'

export default {
  props: ["data",],
  components: {
    demoSlider,
    demoRichText,
    demoCategory,
    demoSingleimg,
    demoProduct,
    demoProductList
  }
}

</script>