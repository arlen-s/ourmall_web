<!-- 拆分订单 -->
<template>
<div class=''>
  <el-dialog
  title="order"
  :visible.sync="tranData.visible"
  width="40%"
  @open="open()"
  :before-close="handleClose">
  <div>
 <el-table
    :data="tableData"
    border
     @selection-change="handleSelectionChange"
    style="width: 100%">
        <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="date"
       :label="$t('Order Number')"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="Shop"
      width="180">
    </el-table-column>
    <el-table-column :label="$t('Created Time')" width="200">
      <template slot-scope="scope">
        <span>{{
          moment(scope.row.timeCreated).format(
            "YYYY-MM-DD HH:mm:ss"
          ) || "---"
        }}</span>
      </template>
    </el-table-column>
  </el-table>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">{{$t('取消')}}</el-button>
    <el-button type="primary" @click="save">{{$t('确定')}}</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
props: ['tranData'],
data() {
//这里存放数据
return {
dialogVisible: false,
 tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        multipleSelection: []
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
open(){
  console.log(333,this.tranData);
  this.dialogVisible = this.tranData.visible
        let params = {
        accountId: this.tranData.accountId,
        parentOrderId: this.tranData.parentOrderId,
        customerId: this.tranData.customerId,
      }
      this.$apiCall("api.OrderMerge.getList", params, {
      }, (r) => {
        console.log(r, '35235');
        if (r.ErrorCode == "9999") {

        } else {
          this.$elementMessage(r.Message, "error")
        }
      })
},
handleClose(){
    this.$emit('success');
},
handleSelectionChange(val) {
        this.multipleSelection = val;
      },
save(){
  if ( !this.multipleSelection.length ) {
     this.$elementMessage(this.$t("Please select an order first"), "error");
     return
  }
          
      this.$apiCall("api.OrderMerge.cancelMerge", {cancelList: this.multipleSelection.map(item=>{return item.id})}, {
      }, (r) => {
        console.log(r, '35235');
        if (r.ErrorCode == "9999") {
           this.$emit('success');

        } else {
          this.$elementMessage(r.Message, "error")
        }
      })
}
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>

</style>