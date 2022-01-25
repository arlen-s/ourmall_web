<template>
  <div class="contentpanel role-management-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <!-- <i class="el-icon-s-custom"></i> -->
          <h2>角色管理</h2>
        </div>
      </div>
      <div class="right">
        <el-button type="primary" @click="addRole">添加角色</el-button>
      </div>
    </div>
    <div class="pagebody" v-loading="loading">
      <el-row :gutter="15" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <el-row :gutter="20">
              <el-col :span="24">
                <div ref="pageFilter" class="page-filter">
                  <!-- <el-form :inline="true" size="mini">
                    <el-form-item> 
                    </el-form-item>
                  </el-form> -->
                  <el-table
                    :data="items"
                    stripe
                    row-key="id"
                    style="width: 100%"
                    ref="gridTable2"
                  >
                    <el-table-column label="员工角色" prop="name">
                    </el-table-column>
                    <el-table-column label="描述" prop="remark">
                    </el-table-column>
                    <el-table-column label="员工数据" prop="subUserCnt">
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-link type="primary" @click="view(scope.row)">
                          查看
                        </el-link>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :visible="addRoleVis"
      width="50%"
      @close="closeVis"
      :title="roleDetailVis ? '角色详情':'添加角色'"
    >
      <div>
        <el-form v-loading="addLoading" class="mg-b-15" label-width="120px">
          <el-form-item label="角色名称" required>
            <el-input
              placeholder="请输入角色名称，如高级管理员，普通管理员等"
              v-model="form.name"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input
              placeholder="至多输入50个汉字"
              maxlength="50"
              v-model="form.remark"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="权限" required>
            <div style="height:280px;overflow:auto">
              <el-tree
              :key="addRoleVis"
                :default-expand-all="addRoleVis"
                ref='roleTree'
                class="mg-t-15"
                :data="treeData"
                :props="defaultProps"
                node-key="key"
                show-checkbox
                @check-change="handleCheckChange"
              >
              </el-tree>
            </div>
            
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoleVis = false">{{
          $t("mycustomer.取 消")
        }}</el-button>
        <el-button type="primary" @click="save"> 保存 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleId:'',
      roleDetailVis:false,
      treeData: [],
      defaultProps: {
        label: "name",
        children: "subMenu",
      },
      form: {
        name: "",
        remark: "",
      },
      loading: false,
      addLoading: false,
      addRoleVis: false,
      items: [],
      roleArr:[],
      roleList:[],
      checkedRole:[],
      changeRole:false,//是否选择过权限
    };
  },
  mounted() {
    this.getRole();
    this.getRightArr();
  },
  methods: {
    closeVis(){
      this.addRoleVis = false;
      this.roleId = '';
      this.form.name = '';
      this.form.remark = '';
      this.roleArr = [];
      this.checkedRole = [];
      this.$refs.roleTree.setCheckedKeys(this.checkedRole);
      this.roleDetailVis = false;
    },
    getRole() {
      this.loading = true;
      this.$apiCall("api.UserRole.findByUser", {}, (r) => {
        this.loading = false;
        if (r.ErrorCode == 9999) {
          this.items = r.Data.Results;
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      });
    },
    getRightArr() {
      this.$apiCall("api.UserRole.getSystemRights", {}, (r) => {
        if (r.ErrorCode == 9999) {
          this.treeData = r.Data.Results.rights;
          this.roleList = r.Data.Results.endpoint;
        } else {
          this.$message.error(r.Message);
        }
      });
    },
    handleCheckChange() { 
      this.changeRole = true;
      let checkList = this.$refs.roleTree.getCheckedKeys(true);
      let arr = [];
      if(checkList.length!=0){
        this.roleList.forEach(e => {
          if(checkList.indexOf(e) == -1){
            arr.push(e)
          }
        });
      }else{
        this.changeRole = false;
      }
      this.roleArr = arr;

    },
    view(item) {
      this.roleId = item.id;
      this.form.name = item.name;
      this.form.remark = item.remark;
      this.roleArr = item.rights;
      this.checkedRole = this.roleList.filter(twoItem => !this.roleArr.some(oneItem => oneItem === twoItem));
      this.roleDetailVis = true;
      this.addRoleVis = true;
      this.$nextTick(() => {
        console.log(this.$refs.roleTree);
        this.$refs.roleTree.setCheckedKeys(this.checkedRole);
      });
    },
    addRole() {
      this.addRoleVis = true;
    },
    save() {
      if(!this.form.name){
        this.$message({message: "请填写角色名称", type: "error"});
        return false;
      }
      if(!this.changeRole&& this.roleArr.length == 0){
        this.$message({message: "请选择权限", type: "error"});
        return false;
      }
      if(!this.roleDetailVis){
        this.$apiCall("api.UserRole.addUserRole",{
          name : this.form.name,
          remark : this.form.remark,
          rights:this.roleArr,
        },r =>{
          if(r.ErrorCode == 9999){
            this.getRole();
            this.addRoleVis = false;
            this.$message({message:'保存成功',type:"success"})
          }else{
            this.$message({message: r.Message, type: "error"});
          }
        })
      }else{
         this.$apiCall("api.UserRole.changeUserRole",{
          name : this.form.name,
          remark : this.form.remark,
          rights:this.roleArr,
          id:this.roleId
        },r =>{
          if(r.ErrorCode == 9999){
            this.getRole();
            this.addRoleVis = false;
            this.$message({message:'修改成功',type:"success"})
          }else{
            this.$message({message: r.Message, type: "error"});
          }
        })
      }
      
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
</style>
