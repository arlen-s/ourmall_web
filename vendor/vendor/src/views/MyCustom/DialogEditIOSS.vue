<template>
  <el-dialog
    :title="`${data.id ? '编辑' : '添加'} IOSS`"
    :visible.sync="data.isShow"
    :close-on-click-modal="false"
    width="600px"
    @open="opened"
    @close="closed"
  >
    <el-divider></el-divider>
    <div class="d-body">
      <el-form :model="data.form" :rules="rules" ref="ruleForm" label-width="150px">
        <el-form-item label="描述:" prop="name" >
          <el-input v-model="data.form.name" placeholder="请输入说明"></el-input>
        </el-form-item>
        <el-form-item label="IOSS ID:" prop="iossId">
          <el-input v-model="data.form.iossId" placeholder="请输入 IOSS ID"></el-input>
        </el-form-item>
        <el-form-item label="目的地国家:" prop="countrys" required>
          <el-select v-model="data.form.countrys"
            multiple
            filterable
            default-first-option
            placeholder="请选择目的地国家"
            style="width: 412px"
          >
            <!-- disabled 选过的不能选 -->
            <el-option
              v-for="c in countryArr" :key="c.value"
              :label="c.labelCN"
              :value="c.value" 
              :disabled="linked.arr.indexOf(c.value) > -1 && data.oldCountrys.indexOf(c.value) < 0"
            >
              <span style="float: left">{{ c.labelCN}}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ c.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>  
      </el-form>
    </div>
    <el-divider></el-divider>
    <div slot="footer" class="dialog-footer">
      <el-button @click="data.isShow = false">取消</el-button>
      <el-button :loading="data.loading" type="primary" @click="save('ruleForm')">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["data",  "countryArr", "linked", "relationshipId"],
  data(){
    let checkCountrys = (rule, value, callback) => { //验证国家
      setTimeout(()=>{
        if(!value || !value.length){
          callback(new Error('至少选择一个国家地区'))
        }
        callback();
      },100);
    }
    let iossIdLen = (rule, value, callback) => { //验证ioss
      setTimeout(() => {
        if(!value || value.length < 12 || !/^[0-9A-Za-z]*$/.test(value)){ 
        callback(new Error('IOSS ID必须输入。至少12个字符的字母或数字'))
      }
      callback();
      },100);
    }
    return {
      rules:{
        name: [
          {required: true, message: '描述必须输入', trigger: 'blur'},
        ],
        iossId: [
          {required: true, message: 'IOSS ID必须输入。至少12个字符的字母或数字', trigger: 'blur'},
          {validator: iossIdLen, trigger: 'blur'},
        ],
        countrys: [
          {validator: checkCountrys, trigger: 'change'}
        ],

      },
    }
  },
  methods: {
    save(formName){
      this.data.loading = true;
      this.$refs[formName].validate((valid) => {
        if(valid){ //验证ok
          let params = {
            relationshipId: this.relationshipId,
            name: this.data.form.name,
            iossId: this.data.form.iossId,
            countrys: this.data.form.countrys.join(',')
          }
          if(this.data.id){ //修改
            params.id = this.data.id;
          }
          this.$confirm("已导入至ERP订单和已发货订单IOSS无法更改，更新IOSS会覆盖您客户订单的IOSS，请谨慎操作！", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "info",
          },).then(()=>{
            this.setSave(params)
          }).catch(()=>{
            this.data.loading = false;
          }); 
        }else{ //验证失败
          this.data.loading = false;
          return false;
        }
      })
    },
    setSave(params){
      this.$apiCall('api.User.editIoss', params, r => {
        this.data.loading = false;
        if (r.ErrorCode == '9999') {
          this.$emit('saveIOSSSuccess')
        }else{
          this.$message({message: r.Message, type: "error"});
        }
      })
    },
    opened(){
      setTimeout(()=>{
        this.$refs['ruleForm'].clearValidate(); //清除验证
      },150)
    },
    closed(){
      this.$refs['ruleForm'].clearValidate();
    }
  }
}
</script>