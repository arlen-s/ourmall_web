<template>
  <el-drawer
    :title="$t('logistics.区域设置')"
    :visible.sync="data.isShow"
    class="drawer-select-country"
    @opened="opened"
    :size="'600'"
    :before-close="beforeClose"
  >
    <el-divider></el-divider>
    <div class="d-body">
      <div class="ipt-wrap">
        <el-input :placeholder="$t('logistics.请输入国家/地区名称')" clearable v-model="data.filterText" style="width: 250px;"/>
      </div>
      <el-tree
        ref="countryTree"
        :data="arr"
        show-checkbox
        highlight-current
        node-key="value"
        @check-change="changeTree"
        :filter-node-method="filterNode"
        :check-strictly="false"
        @node-click="nodeClick"
      >
        <span  class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{node.label}}</span> 
          <span v-if="data.children" style="color: #909399;">
            ( <span style=" color: #303133;">{{selectedData.num[data.id]}} </span>/{{data.children.length}})
          </span>
        </span>   
      </el-tree>
    </div>
    <div class="drawer-footer">
      <span class=" mg-r-20">{{$t('logistics.已选择')}} {{selectedData.arr.length}} {{$t('logistics.个国家/地区')}}</span>
      <el-button @click="data.isShow = false">{{$t('logistics.取消')}}</el-button>
      <el-button type="primary" :loading="data.loading" @click="setCountry">{{$t('logistics.保存')}}</el-button>
    </div>
  </el-drawer>
  
</template>

<script>
export default {
  props: ["data", "arr"],
  data(){
    return {
      selectedData: {
        num: { //各州选择的数量
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
        arr: [],
      }
    }
  },
  watch: {
    'data.filterText'(val) {
      this.$refs.countryTree.filter(val)
    }
  },
  methods: {
    nodeClick(data){
      //disabled 不能更改
      if(data.disabled)
        return;
      if(data.value){
        let checkedArr = this.$refs.countryTree.getCheckedKeys().filter(e => e);
        if(checkedArr.indexOf(data.value) > -1){ //已经有了
          checkedArr = checkedArr.filter(e => e != data.value)
        }else{
          checkedArr.push(data.value)
        }
        this.$refs.countryTree.setCheckedKeys(checkedArr);
      }      
    },
    changeTree(){ //生成辅助数据 selectedData
      let compact = arr => arr.filter(Boolean);
      this.selectedData.arr = compact(this.$refs.countryTree.getCheckedKeys());
      this.selectedData.num = {   0: 0,  1: 0, 2: 0,  3: 0,  4: 0,  5: 0,} //清空
      this.arr.forEach((e, index) => {
        e.children.forEach(c => {
          if(this.selectedData.arr.indexOf(c.value) > -1){
            this.selectedData.num[index] ++;
          }
        })
      })
    },
    filterNode(value, data){
      //树筛选
      if (!value) return true;
      return (data.label).toLowerCase().indexOf(value.toLowerCase()) !== -1;
    },
    setCountry(){
      if(!this.selectedData.arr.length){
        this.$elementMessage(this.$t('logistics.请选择国家/地区'), "error");
        return;
      }
      let params = [];
      this.selectedData.arr.forEach(code2 => {
         this.arr.forEach(z => {
          z.children.forEach(c => {
          if(c.value == code2){
              params.push({
                label: c.label,
                value: c.value,
              })
            }
           })
         })
      });
      this.$emit('setCountry', params)
    },
    opened(){
      this.$refs.countryTree.setCheckedKeys(this.data.openedArr);
      this.changeTree();
    },
    beforeClose(done){
      this.$confirm(this.$t('logistics.确认关闭？  将不会保存改变。'))
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
  }
  
}
</script>

<style lang="scss">
.drawer-select-country{
  .el-drawer{
    min-width: 600px;
    .el-drawer__header{
      border-bottom: 1px #DCDFE6 solid;
      margin-bottom: 0;
      padding-bottom: 15px;;
    }
    .el-drawer__body{
      margin-bottom: 70px;
      .el-divider--horizontal{
        margin: 0;
      }
    }
  }
  .el-tree{
    > .el-tree-node[tabindex]{
      margin-bottom: 15px;
    }
  }
  
}
</style>

<style lang="scss" scoped>
.ipt-wrap{
  margin-bottom: 15px;
  padding: 5px 15px;
}
.drawer-footer{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0 15px;
  border-top: 1px #DCDFE6 solid;
  width: 100%;
  height: 70px;
  background-color: #fff;
}
.d-body{
  padding: 0 10px 0 40px;
}  
</style>