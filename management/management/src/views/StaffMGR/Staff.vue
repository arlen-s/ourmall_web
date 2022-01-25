<template>
  <div class="contentpanel staff-management-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-user"></i>
          <h2>员工管理</h2>
        </div>
      </div>
      <div class="right">
        <el-button type="primary" :disabled="!isWrite" @click="openEditStaff()">添加员工</el-button>
      </div>
    </div>
    <div class="pagebody" v-loading="loading">
      <el-row :gutter="15" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <div ref="pageFilter" class="page-filter">
              <el-form :inline="true" size="mini">
                <el-form-item label="角色：">
                  <el-select
                    style="width: 120px"
                    filterable
                    @change="filterItem"
                    v-model="filterParams.roleId"
                  >
                    <el-option label="全部" value=""></el-option>
                    <el-option
                      v-for="item in roleList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-input
                    v-model.trim="filterParams.usernameIpt"
                    placeholder="输入员工账号"
                    clearable
                    @clear="clearFilter('username')"
                    @keyup.enter.native="filterItem"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input
                    v-model.trim="filterParams.nameIpt"
                    placeholder="输入员工姓名"
                    clearable
                    style="width: 120px;"
                    @clear="clearFilter('name')"
                    @keyup.enter.native="filterItem"
                  ></el-input>
                </el-form-item>
                <el-form-item label="是否启用：">
                  <el-select v-model="filterParams.status" style="width: 100px;" @change="filterItem">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="停用" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="filterItem()">筛选</el-button>
                  <el-button type="danger" @click="clearFilter()">重置</el-button>
                </el-form-item>
              </el-form>
              <!-- 以筛选条件 -->
              <div class="mg-b-10">
                <!-- 角色tags -->
                <el-tag
                  v-if="filterParams.roleId"
                  size="small"
                  type="info"
                  closable
                  @close="clearFilter('role')"
                  class="mg-r-5"
                  >角色：<b style=" color: #5c6ac4;">{{ showRole(filterParams.roleId) }}</b>
                </el-tag>
                <!-- 账号 -->
                <el-tag
                  v-if="filterParams.username"
                  size="small"
                  type="info"
                  closable
                  @close="clearFilter('username')"
                  class="mg-r-5"
                  >账号：<b style=" color: #5c6ac4;">{{ filterParams.username }}</b>
                </el-tag>
                <!-- 姓名 -->
                <el-tag
                  v-if="filterParams.name"
                  size="small"
                  type="info"
                  closable
                  @close="clearFilter('name')"
                  class="mg-r-5"
                  >姓名：<b style=" color: #5c6ac4;">{{ filterParams.name }}</b>
                </el-tag>
                <!-- 姓名 -->
                <el-tag
                  v-if="filterParams.status"
                  size="small"
                  type="info"
                  closable
                  @close="clearFilter('status')"
                  class="mg-r-5"
                  >开启状态：<b style=" color: #5c6ac4;">{{ filterParams.status == '1' ? '启用' :  '停用'}}</b>
                </el-tag>
              </div>  
            </div>
            
            <el-table
              :data="items"
              stripe
              row-key="id"
              style="width: 100%"
              ref="staffTable"
            >
              <el-table-column label="员工账号" prop="username"> </el-table-column>
              <el-table-column label="员工姓名" prop="name"> </el-table-column>
              <el-table-column label="角色">
                <template slot-scope="scope">
                   {{ showRole(scope.row.roleId) }}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <div>
                    <el-link type="primary" :disabled="!isWrite" @click="openEditStaff(scope.row)">编辑</el-link>
                  </div>
                  <div>
                    <el-link type="primary" :disabled="!isWrite" @click="openEditPassword(scope.row)">修改密码</el-link>
                  </div>
                  <div>
                    <el-link type="danger" :disabled="!isWrite" @click="delStaff(scope.row)">删除</el-link>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="启用/停用" align="center" width="120">
                <template slot-scope="scope">
                  <el-switch :disabled="!isWrite" v-model="scope.row.statusSwitch" @change="changeStatus(scope.row)"></el-switch>
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
              :current-page="Number(page)"
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
    <DialogEditStaff :data="DialogEditStaffData" :roleList="roleList" @saveSuccess="saveSuccess"/> 
    <DialogEditStaffPassword :data="DialogEditPsdData" />
  </div>
</template>

<script>
import DialogEditStaff from '@/views/StaffMGR/DialogEditStaff'
import DialogEditStaffPassword from '@/views/StaffMGR/DialogEditStaffPassword'
export default {
  data(){
    return {
      loading: false,
      isWrite: false, //是否可写
      pageSizes: [10, 20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("staffPerPage")
        ? Number(localStorage.getItem("staffPerPage"))
        : 10,
      total: 0,
      totalPage: 0,
      items: [],
      roleList: [],
      filterParams: {
        roleId: "",
        username: '',
        usernameIpt: '',
        name: '',
        nameIpt: '',
        status: '',
      },
      defaultFilterParams: '{}',
      DialogEditStaffData: {
        isShow: false,
        loading: false,
        form: {
          username: '',
          password: '',
          repassword: '',
          name: '',
          roleId: ''
        }
      },
      defaultDialogEditStaffData: '{}',
      DialogEditPsdData: {
        isShow: false,
        loading: false,
        id: '',
        form: {
          password: '',
          repassword: '',
        }
      },
      defaultDialogEditPsdData: '{}',
    }
  },
  components: {
    DialogEditStaff,
    DialogEditStaffPassword,
  },
  watch: {
    $route: "gotoPage",
  },
  mounted(){
    this.isWrite = this.$isRole(this.$route.meta.roleWrite)
    this.defaultFilterParams = JSON.stringify(this.filterParams)
    this.defaultDialogEditStaffData = JSON.stringify(this.DialogEditStaffData)
    this.defaultDialogEditPsdData = JSON.stringify(this.DialogEditPsdData)
    this.getItem();
    this.getRole();
  },
  methods: {
    openEditPassword(item){ //修改密码
      this.DialogEditPsdData = JSON.parse(this.defaultDialogEditPsdData);
      this.DialogEditPsdData.id = item.id;
      this.DialogEditPsdData.isShow = true;
    },
    changeStatus(item){ //启用停用
      this.$apiCall('api.Admin.changeStatus', {id: item.id}, r => {
        if(r.ErrorCode == 9999){
        }else{
          item.statusSwitch = !item.statusSwitch;
          this.$message({message: r.Message, type: "error"});
        }
        item.status = item.statusSwitch ? '1' : '2';
      })
    },
    delStaff(item){
      this.$confirm("确定删除该员工吗?", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        confirmButtonClass: " el-button--danger",
        type: "warning",
      })
      .then(() => {
        this.loading = true;
        this.$apiCall('api.Admin.delete', { id:item.id}, (r)=>{
          if(r.ErrorCode == 9999){
            this.$message({message:'删除成功',type:"success"})
            this.getItem();
          }else{
            this.loading = false;
            this.$message({message: r.Message, type: "error"});
          }
        })
      })
      .catch(() => {
        return false
      });
    },
    openEditStaff(item){
      this.DialogEditStaffData = JSON.parse(this.defaultDialogEditStaffData);
      if(item){
        this.DialogEditStaffData.id = item.id;
        this.DialogEditStaffData.form.name = item.name;
        this.DialogEditStaffData.form.username = item.username;
        this.DialogEditStaffData.form.roleId = item.roleId;
      }
      this.DialogEditStaffData.isShow = true;
    },
    clearFilter(type){
      if(type == 'username'){
        this.filterParams.username = this.filterParams.usernameIpt = '';
      }
      if(type == 'name'){
        this.filterParams.name = this.filterParams.nameIpt = '';
      }
      if(type == 'role'){
        this.filterParams.roleId = '';
      }
      if(type == 'status'){
        this.filterParams.status = '';
      }
      if(!type){
        this.filterParams = JSON.parse(this.defaultFilterParams)
      }
      if (this.$route.query.page == 1) {
        this.getItem();
      } else {
        this.$router.push({ query: { page: 1 } });
      }
    },
    filterItem(){
      this.filterParams.username = this.filterParams.usernameIpt;
      this.filterParams.name = this.filterParams.nameIpt;
      if (this.$route.query.page == 1) {
        this.getItem();
      } else {
        this.$router.push({ query: { page: 1 } });
      }
    },
    getItem(){
      this.loading = true;
       this.$apiCall('api.Admin.findsAdmin',{
         page: this.page,
         rowsPerPage: this.rowsPerPage,
         name:this.filterParams.name,
         roleId:this.filterParams.roleId,
         username:this.filterParams.username,
         status: this.filterParams.status,
       },r=>{
         this.loading = false;
         if(r.ErrorCode == 9999){
           this.items = r.Data.Results.map(e=>{
             e.statusSwitch = e.status == '1'
             return e;
           });
           this.total = Number(r.Data.Pagination.totalCount);
           this.totalPage = Number(r.Data.Pagination.totalPage);
           this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
         }else{
           this.$message({message: r.Message, type: "error"});
         }
       })
    },
    toPage(val) {
      if (val != this.$route.query.page){
        this.$router.push({ query: { page: val } });
      }else{
        this.getItem();
      }  
    },
    changePageSize(val) {
      this.rowsPerPage = val;
      localStorage.setItem("staffPerPage", val);
      this.getItem();
    },
    gotoPage() {
      this.page = this.$route.query.page ? this.$route.query.page : 1;
      this.getItem();
    },
    //获取角色权限列表
    getRole(){
      this.$apiCall("api.Admin.roleList", {}, (r) => {
        if (r.ErrorCode == 9999) {
          this.roleList = r.Data.Results;
        } else {
          if(r.ErrorCode != 10086) //没权限不提示
            this.$message({ message: r.Message, type: "error" });
        }
      });
    },
    showRole(val){
      let role = '';
      this.roleList.forEach(e=>{
        if(val == e.id){
          role = e.name;
        }
      })
      return role;
    },
    saveSuccess(){
      this.getItem();
    }
  }
}
</script>