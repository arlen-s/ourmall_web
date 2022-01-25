<template>
  <el-dialog
    title="自定义页面"
    width="400px"
    :visible.sync="data.isShow"
  >
    <el-divider></el-divider>
    <div class="d-body">
      <p v-if="$store.state.configJson.customPage && $store.state.configJson.customPage.length" class="title d-flex">
        <span class=" mg-r-20">选择自定义页面</span>
        <el-link type="primary" @click="$router.push({name: 'storePage'})">管理自定义页面</el-link>
      </p>
      <ul v-if="$store.state.configJson.customPage && $store.state.configJson.customPage.length" class="c-page-li">
        <li v-for="c in $store.state.configJson.customPage" :key="c.id" class=" tx-ellipsis1">
          <el-radio v-model="data.selected" :label="c">{{c.title}}</el-radio>
        </li>
      </ul>
      <div v-else class="none-data">
        <span class=" mg-r-20">没有数据</span>
        <el-button type="primary" size="mini" @click="$router.push({name: 'storePage'})">管理自定义页面</el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="data.isShow = false">{{ $t('goodsEdit.取消') }}</el-button>
      <el-button size="small" type="primary" :disabled="!data.selected" @click="selectCustomPage">{{ $t('goodsEdit.确定') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    selectCustomPage(){
      this.$emit('selectCustomPage', this.data.selected)
    },
  }
}
</script>

<style lang="scss" scoped>
.d-body{
  padding: 10px 15px;
}
.none-data{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 10px;
}
.c-page-li{
  margin: 0;
  padding: 5px;
  li{
    padding: 5px 0;
  }
}
</style>