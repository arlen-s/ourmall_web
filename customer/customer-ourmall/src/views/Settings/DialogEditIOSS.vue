<template>
  <el-dialog
    :title="`${data.id ? 'Edit' : 'Add'} IOSS`"
    :visible.sync="data.isShow"
    :close-on-click-modal="false"
    width="600px"
    @open="opened"
    @close="closed"
  >
    <el-divider></el-divider>
    <div class="d-body">
      <el-form :model="data.form" :rules="rules" ref="ruleForm" label-width="150px">
        <el-form-item label="Description:" prop="name" >
          <el-input v-model="data.form.name" placeholder="Please enter description"></el-input>
        </el-form-item>
        <el-form-item label="IOSS ID:" prop="iossId">
          <el-input v-model="data.form.iossId" placeholder="Please enter IOSS ID"></el-input>
        </el-form-item>
        <el-form-item label="Destination Country:" prop="countrys" required>
          <el-select v-model="data.form.countrys"
            multiple
            filterable
            default-first-option
            placeholder="Please select destination country"
            style="width: 412px"
          >
            <!-- disabled 选过的不能选 -->
            <el-option
              v-for="c in countryArr" :key="c.value"
              :label="c.label"
              :value="c.value" 
              :disabled="linked.arr.indexOf(c.value) > -1 && data.oldCountrys.indexOf(c.value) < 0"
            >
            </el-option>
          </el-select>
        </el-form-item>  
      </el-form>  
    </div>
    <el-divider></el-divider>
    <div slot="footer" class="dialog-footer">
      <el-button @click="data.isShow = false">{{$t('Cancel')}}</el-button>
      <el-button :loading="data.loading" type="primary" @click="save('ruleForm')">{{$t('Save')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["data", "countryArr", "linked"],
  data(){
    let checkCountrys = (rule, value, callback) => { //验证国家
      setTimeout(()=>{
        if(!value || !value.length){
          callback(new Error(this.$t('Please select at least 1 destination country.')))
        }
        callback();
      },100);
    }
    let iossIdLen = (rule, value, callback) => { //验证ioss
      setTimeout(() => {
        if(!value || value.length < 12 || !/^[0-9A-Za-z]*$/.test(value)){ 
        callback(new Error(this.$t('Please enter an IOSS ID with 12 alphanumeric characters.')))
      }
      callback();
      },100);
    }
    return {
      rules:{
        name: [
          {required: true, message: 'Please enter description.', trigger: 'blur'},
        ],
        iossId: [
          {required: true, message: this.$t('Please enter an IOSS ID with 12 alphanumeric characters.'), trigger: 'blur'},
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
        if(valid){
          let params = {
            name: this.data.form.name,
            iossId: this.data.form.iossId,
            countrys: this.data.form.countrys.join(',')
          }
          if(this.data.id){  //修改保存
            params.id = this.data.id;
            this.$confirm(this.$t("After saving, your IOSS will be updated to the corresponding order. Are you sure to save?"), {
              confirmButtonText: "Confirm",
              cancelButtonText: "Cancel",
              type: "info",
            },).then(()=>{
              this.setSave(params)
            }).catch(()=>{
              this.data.loading = false;
            }); 
          }else{ //新建保存
            this.setSave(params);
          }
        }else{
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
        this.$refs['ruleForm'].clearValidate();
      },150)
    },
    closed(){
      this.$refs['ruleForm'].clearValidate();
    }
  }
}
</script>