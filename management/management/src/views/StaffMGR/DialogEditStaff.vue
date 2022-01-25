<template>
  <el-dialog
    :visible.sync="data.isShow"
    width="600px"
    :title="data.id ? '编辑员工信息':'添加员工'"
    :close-on-click-modal="false"
    @open="open"
  >
    <el-divider></el-divider>
    <div class="d-body">
      <el-form ref="staffForm" :model="data.form" :rules="rules" label-width="120px">
        <el-form-item label="员工账号" prop="username">
          <el-input
            placeholder="请输入员工注册时的邮箱/手机号码"
            v-model="data.form.username"
          >
          </el-input>
          <p style="line-height: 26px; color: #909399; font-size: 12px;">员工使用该手机号作为账号即可登录后台</p>
        </el-form-item>
        <template v-if="!data.id">
          <el-form-item label="账号密码" prop="password">
            <el-input
              placeholder="请输入员工账号的密码"
              show-password
              auto-complete="new-password"
              v-model="data.form.password"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="重复密码" prop="repassword">
            <el-input
              placeholder="请再输入一次密码"
              show-password
              v-model="data.form.repassword"
            >
            </el-input>
          </el-form-item>
        </template>
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="data.form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属角色" prop="roleId">
          <el-select style="width: 100%" 
            filterable 
            v-model="data.form.roleId">
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
    <el-divider></el-divider>
    <div slot="footer" class="dialog-footer">
      <el-button @click="data.isShow = false"> 取消 </el-button>
      <el-button :loading="data.loading" type="primary" @click="save"> 保存 </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['data', 'roleList'],
  data(){
    let checkRePassord = (rule, value, callback) => {
      if(value != this.data.form.password){
        callback(new Error('重复密码必须和账号密码相同'))
      }else{
        callback();
      }
    }
    return {
      rules: {
        username: [
          {required: true, message: '员工账号必须输入', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '账号密码必须输入', trigger: 'blur'},
        ],
        repassword: [
          {required: true, message: '重复密码必须输入', trigger: 'blur'},
          {validator: checkRePassord, trigger: 'blur'},
        ],
        name: [
          {required: true, message: '员工姓名必须输入', trigger: 'blur'},
        ],
        roleId: [
          {required: true, message: '所属角色必须选择', trigger: 'change'},
        ],
      },
    }
  },
  methods: {
    save(){
      this.data.loading = true;
      this.$refs['staffForm'].validate((valid) => {
        if(valid){ //验证ok
          let params = {
            username: this.data.form.username,
            password: this.data.form.password,
            repassword: this.data.form.repassword,
            name: this.data.form.name,
            roleId: this.data.form.roleId,
          }
          if(this.data.id){
            params.id = this.data.id
          }
          this.$apiCall('api.Admin.addAdmin', params, r => {
            this.data.loading = false;
            if(r.ErrorCode == 9999){
              this.$message({message: '保存成功', type: "success"});
              this.data.isShow = false;
              this.$emit('saveSuccess')
            }else{
              this.$message({message: r.Message, type: "error"});
            }
          })
        }else{
          this.data.loading = false;
          return false;
        }
      });
    },
    open(){
      this.$nextTick(()=>{
        this.$refs['staffForm'].clearValidate();
      })
    }
  }
}
</script>