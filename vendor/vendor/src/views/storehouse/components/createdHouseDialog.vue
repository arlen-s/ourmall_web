<!-- 新增公告 -->
<template>
  <div class>
    <el-dialog
      :title="dialogAddData.isEdit ? $t('storehouse.修改仓库信息') : $t('storehouse.创建仓库')"
      :visible.sync="dialogAddData.isShow"
      width="40%"
      @open="open()"
      :before-close="resetForm"
    >
      <el-form ref="form" :model="dialogAddData.data" label-width="auto" :rules="rules">
        <el-form-item :label="$t('storehouse.仓库名称')" :required="true">
          <el-input v-model="dialogAddData.form.name" style="width:50%" :placeholder="$t('storehouse.请输入仓库名称') "></el-input>
        </el-form-item>
        <el-form-item :label="$t('storehouse.仓库所在国家')" :required="true">
            <el-select v-model="dialogAddData.form.nation" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
        </el-select>
        </el-form-item>
        <el-form-item :label="$t('storehouse.负责人')">
          <el-input v-model="dialogAddData.form.role" style="width:50%" :placeholder="$t('storehouse.请输入负责人姓名') "></el-input>
        </el-form-item>
        <el-form-item :label="$t('storehouse.联系电话')">
          <el-input type="number" v-model="dialogAddData.form.tel" style="width:50%" :placeholder="$t('storehouse.请输入联系电话') "></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">{{$t('storehouse.取消')}}</el-button>
        <el-button type="primary" @click="save">{{$t('storehouse.创建')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  //import引入的组件需要注入到对象中才能使用
  props: ['dialogAddData'],
  data () {
    //这里存放数据
    return {

      rules: {
        name: [
          { required: true, message: 'error', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'error', trigger: 'blur' },
        ],
      },
      options: [],
    }
  },
  components: {

  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
  },
  //方法集合
  methods: {
    save () {
      if (this.dialogAddData.form.name == '') {
        this.$message.error($t('storehouse.请填写仓库名称'))
        return false
      }
      if (this.dialogAddData.form.nation == '') {
        this.$message.error($t('storehouse.请选择国家'))
        return false
      }
      let params = {
        name: this.dialogAddData.form.name,
        countryCode: this.dialogAddData.form.nation,
        contact: this.dialogAddData.form.role,
        telephone: this.dialogAddData.form.tel,
        id: this.dialogAddData.form.id
      }
      this.$apiCall('api.Warehouse.save', params, (r) => {
        if (r.ErrorCode == 9999) {
          this.$elementMessage(r.Message, 'success')
          this.$emit('addSucc')
        }else{
          this.$elementMessage(r.Message, 'error')
        }
      })
    },
    resetForm () {
      this.$emit('addSucc')
    },
    open () {
      let params = {}
      this.$apiCall('api.CountryCode.list', params, (r) => {
        if (r.ErrorCode == 9999) {
          this.options = r.Data.Results
        }
      })
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

    // this.open()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () { }, //生命周期 - 创建之前
  beforeMount () { }, //生命周期 - 挂载之前
  beforeUpdate () { }, //生命周期 - 更新之前
  updated () { }, //生命周期 - 更新之后
  beforeDestroy () {

  },
  destroyed () { }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  >
.ql-container.ql-snow {
  height: 344px !important;
}

.ql-editor {
  height: 342px;
}

.ql-picker-label::before {
  position: relative;
  top: -8px;
}

.ql-snow .ql-color-picker .ql-picker-label svg,
.ql-snow .ql-icon-picker .ql-picker-label svg {
  position: relative;
  top: -6px;
  right: 0;
}
</style>