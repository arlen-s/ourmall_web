<template>
  <el-dialog
    :title="`${data.id ? 'edit' : 'add'} IOSS`"
    :visible.sync="data.isShow"
    :close-on-click-modal="false"
    width="600px"
    @open="opened"
    @close="closed"
  >
    <el-divider></el-divider>
    <div class="d-body">
      <el-form :model="data.form" :rules="rules" ref="ruleForm" label-width="150px">
        <el-form-item label="descriptive:" prop="name" >
          <el-input v-model="data.form.name" placeholder="Please enter a description"></el-input>
        </el-form-item>
        <el-form-item label="IOSS ID:" prop="iossId">
          <el-input v-model="data.form.iossId" placeholder="Please enter IOSS ID"></el-input>
        </el-form-item>
        <el-form-item label="Destination country:" prop="countrys" required>
          <el-select v-model="data.form.countrys"
            multiple
            filterable
            default-first-option
            placeholder="Please select the country of destination"
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
      <el-button @click="data.isShow = false">cancel</el-button>
      <el-button :loading="data.loading" type="primary" @click="save('ruleForm')">save</el-button>
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
          callback(new Error('Select at least one country region'))
        }
        callback();
      },100);
    }
    let iossIdLen = (rule, value, callback) => { //验证ioss
      setTimeout(() => {
        if(!value || value.length < 12 || !/^[0-9A-Za-z]*$/.test(value)){ 
        callback(new Error('IOSS ID must be entered. Letters or numbers of at least 12 characters'))
      }
      callback();
      },100);
    }
    return {
      rules:{
        name: [
          {required: true, message: 'Description must be entered', trigger: 'blur'},
        ],
        iossId: [
          {required: true, message: 'IOSS ID must be entered. Letters or numbers of at least 12 characters', trigger: 'blur'},
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
          this.$confirm("The IOSS of orders that have been imported to ERP and shipped orders cannot be changed, updating the IOSS will overwrite the IOSS of your customer's order, so please be careful!", {
            confirmButtonText: "ok",
            cancelButtonText: "cancel",
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