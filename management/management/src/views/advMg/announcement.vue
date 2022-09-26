<!--  -->
<template>
  <div class>
    <el-card class="box-card" style="margin-bottom:20px">
      <div>
        <el-button type="primary" @click="handleShow">发布公告</el-button>
      </div>
    </el-card>
    <el-card class="box-card" v-loading="isLoading">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="title" :label="$t('adv.公告标题')" align="center" width="180"></el-table-column>
        <el-table-column prop="status" :label="$t('adv.状态')" width="180" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">{{$t('adv.启用')}}</span>
            <span v-else>{{$t('adv.停用')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="rType" :label="$t('adv.发布对象')" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.rType == 1">{{$t('adv.供应商')}}</span>
            <span v-else>{{$t('adv.站长')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updatedAt" :label="$t('adv.创建时间')" align="center"></el-table-column>
        <el-table-column prop="address" :label="$t('adv.操作')" align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click="openEdit(scope.row)">{{$t('adv.编辑')}}</el-link>
            <br/>
            <el-link type="danger" @click="delRow(scope.row.id)">{{$t('adv.删除')}}</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <createAdv :data="dataDialog" @black="updatedList"/>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import createAdv from './createAdv.vue'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { createAdv },
  data () {
    //这里存放数据
    return {
      tableData: [],
      isLoading: false,
      dataDialog: {
        show: false,
        data: {
          id: '',
          title: '',
          content: '',
          rType: '1',
          status: '1',
        }
      }
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleShow () {
      this.dataDialog.show = true
    },
    openEdit(row){
        this.dataDialog = {
          show : true,
          data:{
            id: row.id,
            title: row.title,
            content: row.content,
            rType: row.rType,
            status: row.status,
          }
        }
    },
    delRow(id){
      this.$apiCall("api.Notice.delete", {id:id}, r => {
        this.isLoading = false
        if (r.ErrorCode == 9999) {
            this.$message.success(r.Message)
             this.getAdvList ()
        }else{
           this.$message.error(r.Message)
        }
      })
    },
    updatedList(){
      this.getAdvList()
      this.reset()
    },
  reset(){
      this.dataDialog = {
        show: false,
        data: {
          rType: '1',
          status: '1',
          content: '',
          title: '',
        }
      }
    },
    getAdvList () {
      this.isLoading = true
      this.$apiCall("api.Notice.finds", {}, r => {
        this.isLoading = false
        if (r.ErrorCode == 9999) {
          this.tableData = r.Data.Results
        }else{
           this.$message.error(r.Message)
        }
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getAdvList()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () { }, //生命周期 - 创建之前
  beforeMount () { }, //生命周期 - 挂载之前
  beforeUpdate () { }, //生命周期 - 更新之前
  updated () { }, //生命周期 - 更新之后
  beforeDestroy () { }, //生命周期 - 销毁之前
  destroyed () { }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>
</style>