<template>
  <el-dialog
    :visible.sync="data.isShow"
    :title="$t('goods.修改商品类目')"
    :close-on-click-modal="false"
    width="500px"
  >
    <el-divider></el-divider>
    <div class="d-body">
      <div class="d-flex">
        <span>{{$t('goods.将所选商品类目修改为：')}} </span>
        <el-cascader
          ref="cascaderHandle"
          size="small"
          :props="{ expandTrigger: 'hover',checkStrictly: true }"
          :options="categroyArr"
          :placeholder="$t('goods.商品分类')"
          v-model="data.selected"
          @change="changeCategory"
        >
          <span slot-scope="{data}" @click="clickNode">{{ data.label }}</span>
        </el-cascader>
      </div>
    </div>
    <el-divider></el-divider>
    <div slot="footer" class="dialog-footer">
      <el-button @click="data.isShow = false">{{$t('goods.取消')}}</el-button>
      <el-button type="primary" :loading="data.loading" @click="save">{{$t('goods.保存')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["data", "categroyArr"],
  computed: {
    categoryId(){
      let id = '';
      if(this.data.selected.length){
        id = this.data.selected[this.data.selected.length - 1];
      }
      return  id;
    }
  },
  methods: {
    save(){
      if(!this.categoryId){
        this.$message({ message: this.$t('goods.请先选择商品分类'), type: "error" });
        return
      }
      this.data.loading = true;
      let params = {
        ids: this.data.ids,
        categoryId: this.categoryId
      }
      this.$apiCall('api.VendorShop.batchModifyVendorProduct', params, r => {
        this.data.loading = false;
        if (r.ErrorCode == 9999) {
          this.$message({ message: this.$t('goods.修改成功'), type: "success" });
          this.data.isShow = false;
          this.$parent.getItems();
        }else{
          this.$message({ message: r.Message, type: "error" });
        }
      })
    },
    changeCategory(){
      //选择后关闭弹层
      this.$refs.cascaderHandle.dropDownVisible = false; 
    },
    clickNode($event){
      $event.target.parentElement.parentElement.firstElementChild.click();
    },
  }
}
</script>

<style lang="scss" scoped>
.d-body{
  padding: 10px 20px;
}
</style>