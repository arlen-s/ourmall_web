<template>
  <div>
    <el-popover v-if="items && items.length"
      placement="right-start"
      trigger="hover"
      width="400"
    >
      <div class="pop-sku">
        <div v-for="(sku, skuI) in items" :key="sku.id"
          :style="{borderBottom:  items.length - 1 != skuI ? '1px #EBEEF5 solid' : 'none'}"
        >
          <div class="image-wrap">
            <el-image :src="sku.imgUrl" style="min-width: 50px; width: 50px; height: 50px;"
              :fit="'contain'"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" style="color: #C0C4CC;font-size: 20px;"></i>
              </div>
            </el-image>
            <i>{{sku.quantity}}</i>
          </div>
          <div class="info">
            <div class=" mg-b-10">
              <fulfillMentStatusTag :fulfillmentStatus="sku.fulfillmentStatus"/>
            </div>
            <div class=" tx-ellipsis2" style="word-break: normal;">{{sku.name}}</div>
            <div>{{sku.propertyValue}}</div>
            <template v-if="sku.customerProperties.length">
              <div v-for="item in sku.customerProperties">
                <span style="margin-right: 5px; color: #909399;">{{item.name}}</span>
                {{item.value}}
              </div>
            </template>
            <div>
              <span style="margin-right: 5px; color: #909399;">SKU</span>
              {{sku.sku}}
            </div>
            <el-tooltip v-if="$route.name == 'WaitingForSourcing' && sku.onlyOne == 1" placement="top">
              <div slot="content">
                <el-image
                  style="width: 335px; height: 270px"
                  :src="`images/popitem-onlyone.png`"
                  :preview-src-list="['images/popitem-onlyone.png']">
                </el-image>
              </div>
              <div  style=" color:#E6A23C; font-size: 12px;" >
                Need to be allocated to vendor after this purchase order <i class="el-icon-question"></i>
              </div>
            </el-tooltip>
          </div>

        </div>
      </div>
      <span slot="reference" style=" display: inline-block; cursor: pointer;">
        <span>{{items.length}} Items</span>
        <i v-if="items.length" class="el-icon-caret-bottom"></i>
      </span>
    </el-popover>
  </div>
</template>

<script>
import fulfillMentStatusTag from './ShopifyStatus'
export default {
  props: ["items", "fulfillmentStatus"],
  components: {
    fulfillMentStatusTag,
  },
}
</script>

<style lang="scss" scoped>
.pop-sku{
  padding-top: 5px;
  max-height: 300px;
  overflow-y: auto;
  font-size: 12px;
  > div{
    display: flex;
    margin-bottom: 10px;
    padding-bottom: 10px;
    padding-right: 20px;
    .el-image{
      margin-right: 10px;
      border: 1px#E4E7ED solid;
    }
    .info{
      font-size: 13px;
    }
  }
}
.image-wrap{
  position: relative;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  > i{
    position: absolute;
    top: -5px;
    right: -4px;
    width: 22px;
    height: 16px;
    font-style: normal;
    font-size: 12px;
    color: #606266;
    background: #DCDFE6;
    text-align: center;
    border-radius: 8px;
  }
}
</style>
