<!-- 仓库列表 -->
<template>
  <div class="house-box" v-loading="loading">
    <el-card class="box-card">
      <el-input
        v-model="searchVal"
        :placeholder="$t('storehouse.请输入仓库名称')"
        style="width:30%"
        @change="search"
      ></el-input>
    </el-card>
    <el-row>
      <el-col class="btn-col">
        <el-button type="primary" @click="addHouse" style="float:right">{{$t('创建仓库')}}</el-button>
      </el-col>
    </el-row>
    <el-card class="box-card">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" prop="id" :label="$t('storehouse.序号')" width="180"></el-table-column>
        <el-table-column align="center" prop="name" :label="$t('storehouse.仓库名称')" width="180"></el-table-column>
        <el-table-column align="center" prop="countryName" :label="$t('storehouse.国家')"></el-table-column>
        <el-table-column align="center" prop="contact" :label="$t('storehouse.负责人')"></el-table-column>
        <el-table-column prop="telephone" align="center" :label="$t('storehouse.联系电话')"></el-table-column>
        <el-table-column align="center" :label="$t('storehouse.状态')">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">{{$t('storehouse.启用')}}</span>
            <span v-else style="color:red">{{$t('storehouse.停用')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="stockQuantity" align="center" :label="$t('storehouse.关联库存SKU数')"></el-table-column>
        <el-table-column prop="createdAt" align="center" :label="$t('storehouse.创建时间')"></el-table-column>
        <el-table-column :label="$t('storehouse.操作')" align="center">
          <template slot-scope="scope">
            <el-link
              type="primary"
              @click="edit(scope.row)"
              style="margin-right:5px"
            >{{$t('storehouse.编辑')}}</el-link>
            <el-link
              type="danger"
              @click="deleteFun(scope.row)"
              style="margin-right:5px"
            >{{$t('storehouse.删除')}}</el-link>
            <el-link
              type="danger"
              v-if="scope.row.status== 1"
              @click="handleStatus(scope.row)"
            >{{$t('storehouse.停用')}}</el-link>
            <el-link type="primary" v-else @click="handleStatus(scope.row)">{{$t('storehouse.启用')}}</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-row class="pagination mg-t-20">
      <el-pagination
        :current-page="pagination.page"
        :background="true"
        layout="sizes, total, prev, pager, next, jumper"
        :page-sizes="pagination.pageSize"
        :page-size="pagination.rowsPerPage"
        :total="pagination.totalCount"
        @current-change="toPage"
        @size-change="changePageSize"
      ></el-pagination>
    </el-row>
    <createdHouseDialog @addSucc="getChild" :dialogAddData="dialogObj"></createdHouseDialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import createdHouseDialog from './components/createdHouseDialog'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    createdHouseDialog
  },
  data () {
    //这里存放数据
    return {
      searchVal: '',
      tableData: [],
      dialogObj: {
        isShow: false,
        isEdit: false,
        form: {
          name: '',
          nation: '',
          role: '',
          tel: '',
          id: '',
          address:''
        }
      },
      pagination: {
        totalCount: 0,
        pageSize: [10, 20, 50, 100],
        rowsPerPage: 10,
        page: 1,
      },
      loading: true,

    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getInfo () {
      let params = {
        rowsPerPage: this.pagination.rowsPerPage,
        page: this.pagination.page,
        name: this.searchVal
      }
      this.$apiCall("api.Warehouse.finds", params, (r) => {
        this.loading = false
        if (r.ErrorCode == 9999) {
          this.pagination.totalCount = Number(r.Data.Pagination.totalCount)
          this.pagination.page = r.Data.Pagination.page
          this.pagination.rowsPerPage = r.Data.Pagination.rowsPerPage
          this.tableData = r.Data.Results
        } else {
          this.$message({
            message: r.Message,
            type: "error"
          })
        }
      })
    },
    deleteFun (row) {
      if (row.stockQuantity > 0) {
                  this.$message.error({
            message: this.$t('storehouse.存在关联SKU，不能删除！')
          })
          return 
      }
      let params = { id: row.id }
      this.$apiCall("api.Warehouse.delete", params, (r) => {
        this.loading = false
        if (r.ErrorCode == 9999) {
          this.$message({
            message: r.Message,
            type: "success"
          })
          this.getInfo()
        } else {
          this.$message({
            message: r.Message,
            type: "error"
          })
        }
      })
    },
    changePageSize (val) {
      this.pagination.rowsPerPage = val
      this.getInfo()
    },
    toPage (val) {
      this.pagination.page = val
      this.getInfo()
    },
    search () {
      this.getInfo()
    },
    edit (item) {
      this.dialogObj = {
        isShow: true,
        isEdit: true,
        form: {
          name: item.name,
          nation: item.countryCode,
          nationName: item.countryName,
          role: item.contact,
          tel: item.telephone,
          id: item.id,
          address:item.address
        }
      }
    },
    addHouse () {
      this.dialogObj.isShow = true
    },
    handleStatus (row) {
      let params = { id: row.id }
      this.$apiCall("api.Warehouse.change", params, (r) => {
        this.loading = false
        if (r.ErrorCode == 9999) {
          this.$message({
            message: r.Message,
            type: "success"
          })
          this.getInfo()
        } else {
          this.$message({
            message: r.Message,
            type: "error"
          })
        }
      })
    },
    getChild () {
      this.dialogObj = {
        isShow: false,
        form: {
          name: '',
          nation: '',
          role: '',
          tel: '',
          address: '',
        }
      }
      this.getInfo()
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getInfo()
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
.house-box {
  padding-right: 30px;
}
.btn-col {
  padding: 20px;
}
.pagination {
  text-align: center;
  background: #fff;
  height: 60px;
  /* line-height: 48px; */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>