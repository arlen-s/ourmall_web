<template>
  <el-dialog
    :visible.sync="data.isShow"
    width="600px"
    :title="data.id ? '角色详情':'添加角色'"
    :close-on-click-modal="false"
    @open="open"
  >
    <el-divider></el-divider>
    <div class="d-body">
      <el-form ref="roleForm" :model="data.form" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input
            placeholder="请输入角色名称，如高级管理员，普通管理员等"
            v-model="data.form.name"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="角色描述" style="position: relative;" prop="remark">
          <el-input type="textarea" v-model="data.form.remark" placeholder="至多输入50个字"></el-input>
          <div class="num">
            <span :class="{'tx-danger': data.form.remark.length > 50}">{{data.form.remark.length}}</span> / 50
          </div>
        </el-form-item>  
        <el-form-item label="权限">
          <div class="tree-wrap">
            <el-tree
              :key="treeKey"
              :default-expand-all="true"
              ref='roleTree'
              :data="treeData"
              :props="defaultProps"
              node-key="key"
              show-checkbox
            >
            </el-tree>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <el-divider></el-divider>
    <div slot="footer" class="dialog-footer">
      <el-button @click="data.isShow = false">取消</el-button>
      <el-button type="primary" :loading="data.loading" @click="save">保存</el-button>
    </div>  
  </el-dialog>
</template>

<script>
export default {
  props: ["data", "treeData", "roleList"],
  data(){
    let len50 = (rule, value, callback) => {
      if(value && value.length > 50){
        return callback(new Error('角色描述不能大于50字'))
      }else{
        callback();
      }
    }
    return {
      treeKey: (new Date()).valueOf(),
      defaultProps: {
        label: "name",
        children: "subMenu",
      },
      rules: {
        name: [
          {required: true, message: '角色名称必须输入', trigger: 'blur'},
        ],
        remark: [
          {validator: len50, trigger: 'blur'},
        ]
      },
    }
  },
  methods: {
    save(){
      this.data.loading = true;
      this.$refs['roleForm'].validate((valid) => {
        if(valid){ //验证成功
          let [selectedArr, rights] = [this.$refs.roleTree.getCheckedKeys(), []];
          rights = this.roleList.filter(e => selectedArr.indexOf(e) < 0)
          let params = {
            name: this.data.form.name,
            description: this.data.form.remark,
            privilege: rights,
          }
          if(this.data.id)
            params.id = this.data.id;
          this.$apiCall('api.Admin.roleAdd', params, r => {
            this.data.loading = false;
            if(r.ErrorCode == 9999){
              this.$message({message: '保存成功', type: "success"});
              this.data.isShow = false;
              this.$emit('saveSuccess')
            }else{
              this.$message({message: r.Message, type: "error"});
            }
          });
        }else{ //验证失败
          this.data.loading = false;
          return false;
        }
      })
    },
    open(){
      this.treeKey = (new Date()).valueOf();
      //筛选不选的
      let checkedArr = this.roleList.filter(e => this.data.rights.indexOf(e) < 0);
      this.$nextTick(()=>{
        if(this.data.id){ 
          this.$refs.roleTree.setCheckedKeys(checkedArr);
        }else{
          //新建默认全不选
          this.$refs.roleTree.setCheckedKeys([]);
        }
        
        this.$refs['roleForm'].clearValidate();
        document.querySelector('.tree-wrap').scrollTop = 0;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.num{
  position: absolute;
  right: 0;
  bottom: -30px;
  color: #909399;
  font-size: 12px;
}
.tree-wrap{
  padding: 7px 0;
  max-height: 300px;
  overflow-y: scroll;
}
</style>