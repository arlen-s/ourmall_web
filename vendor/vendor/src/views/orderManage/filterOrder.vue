<!-- 批量筛选 -->
<template>
  <div class>
    <el-dialog
      title="批量筛选"
      :visible.sync="filterData.isShowDialog"
      width="30%"
      :before-close="handleClose"
    >
      <el-row class="pd20">
        <el-col class="pm20">
          <el-radio-group v-model="radio">
            <el-radio :label="3">第三方交易号</el-radio>
            <el-radio :label="4">订单编号</el-radio>
          </el-radio-group>
        </el-col>
        <el-col>
          <!-- <textarea rows="10" cols="30" id="orderArea"> -->

          <!-- </textarea> -->
          <el-input type="textarea" :rows="6" placeholder="每行一个订单编号（支持excel复制黏贴）,一次最多支持2000个" v-model="textarea"></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: ['filterData'],
  data () {
    //这里存放数据
    return {
      radio: 3,
      textarea: '',
      param: {
        show: false
      }
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleOk () {
      // let text = document.getElementsByTagName('textarea')[0].textContent
      if (!this.textarea) {
          this.$message.error('请填写内容');
          return
      }
      let orderIdArr = this.textarea.split('\n').map((item) => {
        return item.replace(/\s+/g, "")
      }).filter((item) => { return item })

      if (this.radio === 3) {
        this.param.ok = 1
        this.param.order = orderIdArr
      } else {
        this.param.ok = 2
        this.param.order = orderIdArr
      }
      this.textarea = ''
      this.radio = 3
      this.$emit('callBackFilter', this.param)
    },
    handleClose () {
      this.textarea = ''
      this.radio = 3
      this.$emit('callBackCloseFilter', this.param)
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () { }, //生命周期 - 创建之前
  beforeMount () { }, //生命周期 - 挂载之前
  beforeUpdate () { }, //生命周期 - 更新之前
  updated () { }, //生命周期 - 更新之后
  beforeDestroy () { }, //生命周期 - 销毁之前
  destroyed () { }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>
.pd20 {
  padding: 20px;
}
.pm20 {
  padding-bottom: 20px;
}
</style>