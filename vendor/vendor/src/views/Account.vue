<template>
  <div class="contentpanel account-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-s-check"></i>
          <h2>权限管理</h2>
        </div>
      </div>
      <div class="right">
        <el-button type="primary" size="medium">添加账号</el-button>
      </div>
    </div>
    <div class="pagebody" v-loading="loading">
      <el-row :gutter="15" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <el-row :gutter="20">
              <el-col :span="24">
                <div ref="pageFilter" class="page-filter">
                  <el-form :inline="true" size="mini">
                    <el-form-item>
                      <el-input
                        placeholder="姓名"
                        @keyup.enter.native="filterGetItem"
                      ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-input
                        placeholder="用户名"
                        @keyup.enter.native="filterGetItem"
                      ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-select  placeholder="选择角色" style="width: 150px">
                        <el-option label="管理员" value="1"></el-option>
                        <el-option label="员工" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-select  placeholder="选择状态" style="width: 120px">
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="禁用" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="filterGetItem">查询</el-button>
                      <el-button type="danger" @click="clearFilter">重置</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
            <el-table
              :data="items"
              stripe
              row-key="id"
              style="width: 100%"
              ref="gridTable"
            >
              <el-table-column
                label="姓名"
              >
                <template slot-scope="scope">
                  马
                </template>
              </el-table-column>
              <el-table-column
                label="用户名"
              >
                <template slot-scope="scope">
                  789789789
                </template>
              </el-table-column>
              <el-table-column
                label="角色"
              >
                <template slot-scope="scope">
                  管理员
                </template>
              </el-table-column>
              <el-table-column
                label="状态"
              >
                <template slot-scope="scope">
                  <i class="s-badge"></i>启用
                </template>
              </el-table-column>
              <el-table-column
                label="添加时间"
              >
                <template slot-scope="scope">
                  2020-08-25 18:17:02
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
              >
                <template slot-scope="scope">
                  <el-link type="primary" class=" mg-r-15">编辑</el-link>
                  <el-link type="primary" class=" mg-r-15">禁用</el-link>
                  <el-link type="primary">修改密码</el-link>
                </template>
              </el-table-column>
            </el-table>   
          </el-card>
        </el-col>
      </el-row>
      <el-row v-if="items.length" :gutter="20">
        <el-col :span="24" class="d-flex justify-content-center">
          <div>
            <el-pagination
              :current-page="page"
              :background="true"
              layout="sizes, total, prev, pager, next, jumper"
              :page-sizes="pageSizes"
              :page-size="rowsPerPage"
              :total="Number(total)"
              @current-change="toPage"
              @size-change="changePageSize"
            >
            </el-pagination>
          </div>
        </el-col>    
      </el-row>
    </div>
    <DialogAddAccount :data="dialogAddData"/>
  </div>
</template>

<script>
import DialogAddAccount from '@/components/dialog/DialogAddAccount'
export default {
  data(){
    return {
      loading: false,
      filterParams: {
      },
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      pageSizes: [10, 20, 50, 100],
      rowsPerPage: localStorage.getItem("accountRowsPerPage")
        ? Number(localStorage.getItem("accountRowsPerPage"))
        : 10,
      total: 0,
      totalPage: 0,  
      items: [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6},
      ],
      dialogAddData: {
        isShow: true,
        loading: false,
      }
    }
  },
  components: {
    DialogAddAccount,
  },
  methods: {
    filterGetItem(){
    },
    clearFilter(){
    },
    getItem(){

    },
    toPage(val) {
      if (val != this.$route.query.page)
        this.$router.push({ query: { page: val } });
    },
    changePageSize(val) {
      this.rowsPerPage = val;
      localStorage.setItem("accountRowsPerPage", val);
      this.getItem();
    },
    gotoPage() {
      this.page = this.$route.query.page ? this.$route.query.page : 1;
      this.getItem();
    },
  }
}
</script>

<style lang="scss" scoped>
.s-badge{
  display: inline-block;
  margin-right: 10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #67C23A;
}
</style>