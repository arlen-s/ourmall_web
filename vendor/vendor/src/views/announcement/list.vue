<!-- 公告列表 -->
<template>
  <div class="box" v-loading="loading">
    <el-row>
      <el-col class="header-box">
        <div class="coles">
          <img src="../../assets/images/store-design/trumpet.png" alt />
          <span class="tit">  {{$t('announcement.公告管理')}}</span>
        </div>
        <div class="add-box">
          <i class="el-icon-plus"></i>
          <span class="add" @click="handleAdd">{{$t('announcement.新增')}}</span>
        </div>
      </el-col>
    </el-row>
    <el-card class="box-card mg-b-20">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item :label="$t('announcement.标题')">
            <el-input v-model="formInline.title" placeholder="公告标题"></el-input>
          </el-form-item>
          <el-form-item :label="$t('announcement.状态')">
            <el-select v-model="formInline.status" :placeholder="$t('announcement.区域')">
              <el-option :label="$t('announcement.全部')" value="0"></el-option>
              <el-option :label="$t('announcement.上架')" value="1"></el-option>
              <el-option :label="$t('announcement.下架')" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('announcement.时间')">
            <el-date-picker
              v-model="formInline.timer"
              type="daterange"
              :range-separator="$t('announcement.至')"
              :start-placeholder="$t('announcement.开始日期')"
              :end-placeholder="$t('announcement.结束日期')"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleInquire">{{$t('announcement.查询')}}</el-button>
            <el-button type="danger" @click="cancel">{{$t('announcement.取 消')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" :label="$t('announcement.公告标题')" align="center"></el-table-column>
        <el-table-column prop="status" align="center" :label="$t('announcement.状态')">
          <template slot-scope="scope">{{ scope.row.isShow == '1' ? $t('announcement.上架'): $t('announcement.下架') }}</template>
        </el-table-column>
        <el-table-column prop="timeCreated" :label="$t('announcement.创建时间')" align="center"></el-table-column>
        <el-table-column prop="address" :label="$t('announcement.操作')"  align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleAdd('edit', scope.row)">{{$t('announcement.创建时间')}}</el-link>
            <span class="place"></span>
            <el-link type="danger" @click="delMsg(scope.row)">{{$t('announcement.删除')}}</el-link>
            <br />
            <el-link
              type="primary"
              v-if="scope.row.isShow == '1'"
              @click="handleSoldOut(scope.row, '2')"
            >{{$t('announcement.下架')}}</el-link>
            <el-link type="primary" v-else @click="handleSoldOut(scope.row, '1')">{{$t('announcement.上架')}}</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-row v-if="tableData.length" :gutter="20">
      <el-col :span="24" class="d-flex justify-content-center">
        <div>
          <el-pagination
            :current-page="pageGroup.page"
            :background="true"
            layout="sizes, total, prev, pager, next, jumper"
            :page-sizes="pageGroup.pageSizes"
            :page-size="pageGroup.rowsPerPage"
            :total="Number(pageGroup.totalCount)"
            @current-change="toPage"
            @size-change="changePageSize"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
    <addAnnouncementDialog :dialogAddData="dialogData" @closeDialog="changeData"></addAnnouncementDialog>
  </div>
</template>

<script>
import addAnnouncementDialog from './addAnnouncementDialog.vue'

export default {
  //import引入的组件需要注入到对象中才能使用
  components: { addAnnouncementDialog },
  data () {
    //这里存放数据
    return {
      formInline: {
        timer: '',
        status: '0',
        title: '',
      },
      loading: false,
      tableData: [],
      dialogData: {
        isShow: false,
        data: {
          title: '',
          content: '',
          id: '',
        }
      },
      pageGroup: {
        pageSizes: [10, 20, 50, 100],
        page: 1,
        rowsPerPage: 20,
        totalCount: 0,
        totalPage: 0,
      },


    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleInquire () {
      this.getList()
    },
    cancel () {
      this.formInline = {
        timer: '',
        status: '',
        title: '',
      }
      this.getList()
    },
    handleAdd (type, row) {
      this.dialogData.isShow = true
      if (type == 'edit') {
        this.dialogData.data = { ...row }
      }
    },
    getList () {
      let params = {
        titleLike: this.formInline.title,
        isShow: this.formInline.status,
        page: this.pageGroup.page,
        rowsPerPage: this.pageGroup.rowsPerPage,
        timeCreatedFrom: this.formInline.timer[0],
        timeCreatedTo: this.formInline.timer[1],
      }
      this.loading = true
      this.$apiCall('api.SiteMessage.finds', params, (r) => {
        if (r.ErrorCode == 9999) {
          this.tableData = r.Data.Results
          this.loading = false
          this.pageGroup = { ...r.Data.Pagination }
        }
      })
    },
    handleSoldOut (row, type) {

      this.$apiCall('api.SiteMessage.addMsg', { isShow: type, id: row.id }, (r) => {
        if (r.ErrorCode == 9999) {
          this.getList()

        }
      })
    },
    toPage (val) {
      this.pageGroup.page = val
      this.getList()
    },
    changePageSize (val) {
      this.pageGroup.page = rowsPerPage
      this.getList()
    },
    changeData (v) {
      this.dialogData.isShow = false
      this.dialogData.data = {
        id: '',
        title: '',
        content: '',
      }
      this.getList()
    },
    delMsg (row) {
      let ids = []
      ids[0] = row.id
      this.$apiCall('api.SiteMessage.delete', { ids: ids }, (r) => {
        if (r.ErrorCode == 9999) {
          this.getList()

        }
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getList()
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
.box {
  padding: 20px 10px 20px 40px;
}
.coles{
  display: flex;
  align-items: center;
}
.header-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.header-box img {
  width: 35px;
  height: 33px;
}
.header-box .tit {
  font-weight: 500;
  font-size: 26px;
  color: #000;
  padding-left: 10px;
}
.add-box {
  color: #66b5d9;
  line-height: 33px;
  cursor: pointer;
}
.add-box span {
  padding-left: 5px;
  font-size: 14px;
}
.add-box .add {
  padding-right: 10px;
}
.el-form-item {
  margin-bottom: 0;
}
.place {
  width: 10px;
  display: flex;
}
</style>
<style>
.el-range-separator {
  padding: 0 !important;
}
</style>