<template>
  <el-dialog
    :visible.sync="data.isShow"
    width="600px"
    title="修改密码"
    :close-on-click-modal="false"
    @open="open"
  >
    <el-divider></el-divider>
    <div class="d-body">
      <el-form ref="psdForm" :model="data.form" :rules="rules" label-width="120px">
        <el-form-item label="新密码" prop="password">
          <el-input
            placeholder="输入要新的密码"
            show-password
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
      </el-form>
    </div>
    <el-divider></el-divider>
    <div slot="footer" class="dialog-footer">
      <el-button @click="data.isShow = false"> 取消 </el-button>
      <el-button :loading="data.loading" type="primary" @click="save"> 保存修改 </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['data'],
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
        password: [
          {required: true, message: '新密码必须输入', trigger: 'blur'},
        ],
        repassword: [
          {required: true, message: '重复密码必须输入', trigger: 'blur'},
          {validator: checkRePassord, trigger: 'blur'},
        ],
      },
    }
  },
  methods:{
    save(){
      this.data.loading = true;
      this.$refs['psdForm'].validate((valid) => {
        if(valid){ //验证ok
           let params = {
            password: this.data.form.password,
            repassword: this.data.form.repassword,
            id: this.data.id,
          }
          this.$apiCall('api.Admin.changePassword', params, r => {
            this.data.loading = false;
            if(r.ErrorCode == 9999){
              this.$message({message: '修改密码成功', type: "success"});
              this.data.isShow = false;
            }else{
              this.$message({message: r.Message, type: "error"});
            }
          });
        }else{
          this.data.loading = false;
          return false;
        }
      });
    },
    open(){
      this.$nextTick(()=>{
        this.$refs['psdForm'].clearValidate();
      })
    }
  }

}
</script>