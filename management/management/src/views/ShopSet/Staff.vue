<template>
  <div class="contentpanel staff-management-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-s-custom"></i>
          <h2>员工管理</h2>
        </div>
      </div>
      <div class="right">
        <el-button type="primary" @click="addStaff()">添加员工</el-button>
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
                    <!-- <el-form-item >
                      <el-checkbox
                        style="margin-bottom: 18px; margin-right: 10px;"
                        v-model="allCheckedData"
                        size="mini"
                        @change="allChange">
                      {{$t('products.全选')}}<span v-if="isSelectItems" style="color: #909399; font-size: 12px;">({{isSelectItems}})</span>
                    </el-checkbox>
                      <el-button
                        type="danger"
                        size="mini"
                        style="margin-bottom: 18px;"
                        @click="delItem()"
                        :disabled="!isSelectItems"
                      >{{$t('products.批量删除')}}</el-button>
                    </el-form-item> -->
                    <el-form-item label="角色">
                      <el-select
                        style="width: 120px"
                        filterable
                        @change="filterItem()"
                        v-model="filterParams.roleId"
                      >
                        <el-option label="ALL" value=""></el-option>
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
                        v-model="filterParams.nameLike"
                        placeholder="输入员工账号或姓名"
                        clearable
                        @clear="clearFilter('name')"
                        @keyup.enter.native="filterItem()"
                      ></el-input>
                    </el-form-item>
                    <!-- <el-form-item>
                      <el-input
                        v-model="filterParams.username"
                        placeholder="输入员工账号"
                        clearable
                        @keyup.enter.native="filterItem"
                      ></el-input>
                    </el-form-item> -->
                    <el-form-item>
                      <el-button type="primary" @click="filterItem()">{{
                        $t("mycustomer.filter")
                      }}</el-button>
                      <el-button type="danger" @click="clearFilter()">{{
                        $t("mycustomer.clear")
                      }}</el-button>
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
              <!-- <el-table-column type="selection" width="55">
              </el-table-column> -->
              <el-table-column label="员工账号" prop="username"> </el-table-column>
              <el-table-column label="员工姓名" prop="name"> </el-table-column>
              <el-table-column label="员工联系方式" prop="email"> </el-table-column>
              <el-table-column label="角色">
                <template slot-scope="scope">
                   {{ roleChange(scope.row.roleId)}}
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div>
                    <el-link type="primary" @click="addStaff(scope.row)">编辑</el-link>
                  </div>
                  <div>
                    <el-link type="danger" @click="delItem(scope.row)"
                      >删除</el-link
                    >
                  </div>
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
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :visible="addStaffVis"
      width="50%"
      @close="closeVis"
      :title="editStaff ? '编辑员工信息':'添加员工'"
    >
      <div>
        <el-form v-loading="addLoading" class="mg-b-15" label-width="120px">
          <template v-if="!editStaff">
          <el-form-item label="员工账号" required>
            <el-input
              placeholder="请输入员工注册时的邮箱/手机号码"
              v-model="form.username"
            >
            </el-input>
            <div style="color: #909399">
              员工使用该手机号作为帐号即可登录后台
            </div>
          </el-form-item>
          <el-form-item label="账号密码" required>
            <el-input
              placeholder="请输入员工账号的密码"
              v-model="form.password"
              show-password
              auto-complete="new-password"
            >
            </el-input>
          </el-form-item>
          </template>
          <el-form-item label="员工姓名" required>
            <el-input 
            v-model="form.name">
            </el-input>
          </el-form-item>
          <el-form-item label="员工联系方式" required>
            <el-input 
            placeholder="请输入邮箱/手机号码" 
            v-model="form.email">
            </el-input>
          </el-form-item>
          <el-form-item label="所属角色" required>
            <el-select style="width: 100%" 
            @change="filterItem()"
            filterable 
            v-model="form.roleId">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addStaffVis = false">{{
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
      staffId:'',
      multipleSelection:[],
      editStaff:false,
      isSelectItems:false,
      allCheckedData:false,
      form: {
        username: "",
        password:"",
        name: "",
        email: "",
        roleId: "",
      },
      pageSizes: [10, 20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("staffPerPage")
        ? Number(localStorage.getItem("staffPerPage"))
        : 10,
      total: 0,
      totalPage: 0,
      addLoading: false,
      addStaffVis: false,
      items: [],
      loading: false,
      filterParams: {
        roleId: "",
        nameLike: "",
        username:''
      },
      roleList: [],
    };
  },
  watch: {
    allChecked(){
      this.allCheckedData = this.allChecked
    },
    $route: "gotoPage",
  },
  mounted(){
    this.getItem();
    this.getRole()//获取角色权限列表
  },
  methods: {
    roleChange(val) {
      let role = '';
      this.roleList.forEach(e=>{
        if(val == e.id){
          role = e.name;
        }
      })
      return role;
    },
    //获取角色权限列表
    getRole(){
      this.$apiCall("api.UserRole.findByUser", {}, (r) => {
        if (r.ErrorCode == 9999) {
          this.roleList = r.Data.Results;
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      });
    },
    // handleSelectionChange(val){
    //   this.multipleSelection = val;
    //   if(this.multipleSelection){
    //     this.isSelectItems = true;
    //   }else{
    //     this.isSelectItems = false;
    //   }
    // },
    closeVis(){
      this.editStaff = false;
      this.staffId = '';
      this.form = {
        username: "",
        password:"",
        name: "",
        email: "",
        roleId: "",
      },
      this.addStaffVis = false;
    },
    delItem(item){
      // let id = '';
      // if(item){
      //   id = item.id
      // }else{
      //   let arr = [];
      //   this.multipleSelection.forEach(e=>{
      //      arr.push(e.id);
      //      id = arr.join(',') 
      //   })
      // }
      this.$confirm("确定删除该员工吗?", "Tips", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$apiCall('api.SubUser.deleteByUser',
           {
              id:item.id
           },
           (r)=>{
            if(r.ErrorCode == 9999){
              this.$message({message:'删除成功',type:"success"})
              this.getItem();
            }else{
              this.$message({message: r.Message, type: "error"});
            }
          })
        })
        .catch(() => {
          return false
        });
    },
    allChange(){
       this.items.forEach(item => {
        this.$set(item, 'checked', this.allCheckedData)
      });
    },
    toPage(val) {
      if (val != this.$route.query.page)
        this.$router.push({ query: { page: val } });
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
    getItem(){
      this.loading = true;
       this.$apiCall('api.SubUser.findByUser',{
         page: this.page,
         rowsPerPage: this.rowsPerPage,
         nameLike:this.filterParams.nameLike,
         roleId:this.filterParams.roleId,
         username:this.filterParams.username,
       },r=>{
         this.loading = false;
         if(r.ErrorCode == 9999){
           this.items = r.Data.Results;
           this.total = Number(r.Data.Pagination.totalCount);
           this.totalPage = Number(r.Data.Pagination.totalPage);
           this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
         }else{
           this.$message({message: r.Message, type: "error"});
         }
       })
    },
    filterItem() {
      //    筛选
       if (this.$route.query.page == 1) {
        this.getItem();
        } else {
          this.$router.push({ query: { page: 1 } });
        }
    },
    clearFilter(type) {
      //    清除
       if(!type){
        this.filterParams.roleId = '';
      }
        this.filterParams.nameLike = '';
      if (this.$route.query.page == 1) {
        this.getItem();
      } else {
        this.$router.push({ query: { page: 1 } });
      }
    },
    addStaff(i) {
      if(i){
        this.staffId = i.id;
        this.editStaff = true;
        this.form.name = i.name;
        this.form.email = i.email;
        this.form.roleId = i.roleId;
      }
      this.addStaffVis = true;
    },
    save() {
        let params = {};
        if(!this.editStaff){
          params = this.form;
          if(!this.form.username){
            this.$message({message: '请输入员工账号', type: "error"});
            return false;
          }
          if(!this.form.password){
            this.$message({message: '请输入员工账号的密码', type: "error"});
            return false;
          }
          if(!this.form.name){
            this.$message({message: '请输入员工姓名', type: "error"});
            return false;
          }
          if(!this.form.email){
            this.$message({message: '请输入员工联系方式', type: "error"});
            return false;
          }
          if(!this.form.roleId){
            this.$message({message: '请选择所属角色', type: "error"});
            return false;
          }
        }else{
          params = {
            ids :this.staffId,
            name:this.form.name,
            email:this.form.email,
            roleId:this.form.roleId,
          }
          if(!this.form.name){
            this.$message({message: '请输入员工姓名', type: "error"});
            return false;
          }
          if(!this.form.email){
            this.$message({message: '请输入员工联系方式', type: "error"});
            return false;
          }
          if(!this.form.roleId){
            this.$message({message: '请选择所属角色', type: "error"});
            return false;
          }
        }
        this.$apiCall(this.editStaff ? 'api.SubUser.changeByUser':'api.SubUser.insertByUser'
        ,params,r=>{
          if(r.ErrorCode == 9999){
            this.addStaffVis = false;
              this.editStaff = false;
            this.getItem();
            this.$message({message:'保存成功',type:"success"})
          }else{
            this.$message({message: r.Message, type: "error"});
          }
        })
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">

</style>
