<template>
  <div>
    <el-dialog
      title="添加账户"
      :visible.sync="data.isShow"
      :width="'760px'"
    >
      <el-divider></el-divider>
      <div>
        <el-form ref="formAdd" size="small" label-width="140px">
          <el-form-item label="姓名" required>
            <el-input></el-input>
          </el-form-item>
          
          <el-form-item label="用户名" required>
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="密码" required>
            <el-input show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" required>
            <el-input show-password></el-input>
          </el-form-item>
          <el-form-item label="账号类型">
            <el-button-group>
              <el-button >管理员</el-button>
              <el-button type="primary" >员工</el-button>
            </el-button-group>
          </el-form-item>  
        </el-form>

        <el-form-item label="权限">

        </el-form-item>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["data"], 
}
</script>