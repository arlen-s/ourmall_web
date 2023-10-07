<!-- after sales -->
<template>
  <div class>
    <el-dialog
      :title="$t('after sales')"
      :visible.sync="salesData.dialogVisible"
      width="30%"
      @open="open()"
      :before-close="cancel"
    >
      <div>
        <el-form ref="form" :model="form" label-width="140px">
          <el-form-item :label="$t('交易类型')" required>
            <el-select v-model="form.dealType" :placeholder="$t('Please select')">
              <el-option :label="$t('退款')" value="1"></el-option>
              <el-option :label="$t('更换')" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('问题类型')" required>
            <el-select v-model="form.problemType" :placeholder="$t('Please select')">
              <el-option
                :label="item.label"
                v-for="item in questionList"
                :key="item.id"
                :value="item.id"
              ></el-option>
              <!-- <el-option label="Replacement" value="2"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('问题描述')">
            <el-input type="textarea" v-model="form.desc" :placeholder="$t('选填')"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">{{$t('取消')}}</el-button>
        <el-button type="primary" @click="save()">{{$t('确定')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  props: ['salesData'],
  components: {},
  data () {
    //这里存放数据
    return {
      form: {
        dealType: '',
        problemType: '',
        desc: '',
      },
      questionList: [
        { label: this.$t('修改客户相关信息'), id: 1 },
        { label: this.$t('取消订单'), id: 2 },
        { label: this.$t('无跟踪信息'), id: 3 },
        { label: this.$t('跟踪信息长时间未更新'), id: 4 },
        { label: this.$t('物品损坏'), id: 5 },
        { label: this.$t('物品丢失'), id: 6 },
        { label: this.$t('发送错误产品'), id: 7 },
        { label: this.$t('发送错误地址'), id: 8 },
        { label: this.$t('订单暂停'), id: 9 },
      ],

    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleClose () {

    },
    cancel () {
      this.form.dealType = ''
      this.form.problemType = ''
      this.form.desc = ''
      this.$emit('callBackSale')
    },
    open(){
      this.form.dealType = ''
      this.form.problemType = ''
      this.form.desc = ''
    },
    save () {
      let params = {
        accountId: this.salesData.shopifyAccountId,
        orderId: this.salesData.orderId,
        type: this.form.dealType,
        reasonType: this.form.problemType,
        description: this.form.desc
      }
      this.$emit('callBackSale')
      this.$apiCall("api.OrderRefund.afterService", params, {
      }, (r) => {
        console.log(r, '35235');
        if (r.ErrorCode == "9999") {
          //  this.$elementMessage(r.Message, "success");
          this.form.dealType = ''
          this.form.problemType = ''
          this.form.desc = ''
          this.$emit('callBackSale')
        } else {
          this.$elementMessage(r.Message, "error")
        }
      })
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
</style>