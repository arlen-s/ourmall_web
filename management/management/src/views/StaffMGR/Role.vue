<template>
   <div class="contentpanel role-management-page">
     <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-unlock"></i>
          <h2>角色管理</h2>
        </div>
      </div>
      <div class="right">
        <el-button type="primary" :disabled="!isWrite" @click="openEditRole()">添加角色</el-button>
      </div>
    </div>
    <div class="pagebody" v-loading="loading">
      <el-row :gutter="15" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <el-table
              :data="items"
              stripe
              row-key="id"
              style="width: 100%"
              ref="gridTable"
            >
              <el-table-column label="员工角色" prop="name">
              </el-table-column>
              <el-table-column label="描述" prop="description">
              </el-table-column>
              <el-table-column label="员工数" prop="count" align="center">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-link type="primary" style=" margin-right: 20px;" :disabled="!isWrite" @click="openEditRole(scope.row)">
                    编辑
                  </el-link>
                  <el-link type="danger" :disabled="!isWrite" @click="delRole(scope.row, scope.$index)">删除</el-link>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <DialogEditRole :data="dialogEditRoleData" :treeData="treeData" :roleList="roleList" @saveSuccess="saveSuccess"/>
   </div>
</template>

<script>
import DialogEditRole from '@/views/StaffMGR/DialogEditRole'
export default {
  data(){
    return {
      isWrite: false, //是否可写
      loading: false,
      items: [],
      treeData: [], //权限树
      roleList: [], //所有权限
      dialogEditRoleData: {
        loading: false,
        isShow: false,
        id: '',
        form: {
          name: '',
          remark: '',
        },
        rights: [], //限制权限列表
      },
      defaultDialogEditRoleData: '{}',
    }
  },
  components: {
    DialogEditRole,
  },
  mounted(){
    this.isWrite = this.$isRole(this.$route.meta.roleWrite)
    this.defaultDialogEditRoleData = JSON.stringify(this.dialogEditRoleData);
    this.getRole();
    this.getRightArr();
  },
  methods: {
    delRole(item,i){
      this.$confirm("确定删除该角色吗?", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        confirmButtonClass: " el-button--danger",
        type: "warning",
      }).then(()=>{
        this.loading = true;
        this.$apiCall('api.Admin.roleDelete', {id: item.id}, r => {
          this.loading = false;
          if (r.ErrorCode == 9999) {
            this.items.splice(i, 1);
            this.$message({ message: '删除成功', type: "success" });
          }else{
            this.$message.error(r.Message);
          }
        })
      }).catch();
    },
    getRole() {
      this.loading = true;
      this.$apiCall("api.Admin.roleList", {}, (r) => {
        this.loading = false;
        if (r.ErrorCode == 9999) {
          this.items = r.Data.Results.map(e => e);
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      });
    },
    getRightArr() {
      this.$apiCall("api.Admin.getRights", {}, (r) => {
        if (r.ErrorCode == 9999) {
          this.treeData = [...r.Data.Results.rights];
          //员工管理子菜单的格式化 
          // let staffIndex = 1; //员工管理是第几个菜单
          // this.treeData.splice(staffIndex, 0, {
          //   key: 'MenuStaffParent',
          //   name: '员工管理',
          //   subMenu: [],
          // })
          // for(let i = 0; i < this.treeData.length; i++){
          //   if(this.treeData[i].key == 'MenuStaff' || this.treeData[i].key == 'MenuPrivilege'){
          //     this.treeData[staffIndex].subMenu.push(this.treeData[i]);
          //     this.treeData.splice(i, 1);
          //     i --;
          //   }
          // }
          this.roleList = r.Data.Results.endpoint;
        } else {
          this.$message.error(r.Message);
        }
      });
    },
    openEditRole(item){
      this.dialogEditRoleData = JSON.parse(this.defaultDialogEditRoleData)
      if(item){ //编辑
        this.dialogEditRoleData.form.name = item.name;
        this.dialogEditRoleData.form.remark = item.description || '';
        this.dialogEditRoleData.rights = item.privilege ? JSON.parse(item.privilege) : [];
        this.dialogEditRoleData.id = item.id;
      }
      this.dialogEditRoleData.isShow = true;
    },
    saveSuccess(){
      this.getRole();
    }
  }
}
</script>