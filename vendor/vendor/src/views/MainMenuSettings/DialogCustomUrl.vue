<template>
  <el-dialog
    :visible.sync="data.isShow"
    title="自定义链接"
    :close-on-click-modal="false"
    width="500px"
  >
    <el-divider></el-divider>
      <div class="d-body">
        <el-form :label-position="'top'" label-width="120px">
          <el-form-item label="链接地址">
            <el-input v-model="data.ipt" @keyup.enter.native="save"></el-input>
          </el-form-item>
        </el-form>  
        <div v-if="data.msg" class="error">{{data.msg}}</div>
      </div>
    <el-divider></el-divider>
    <div slot="footer" class="dialog-footer">
      <el-button @click="data.isShow = false">{{$t('goods.取消')}}</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    save(){
      this.data.msg = '';
      if(this.data.ipt){
        var v = new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i');
        if(v.test(this.data.ipt)){
          this.$set(this.data.item, 'url', this.data.ipt)
          this.data.isShow = false;
        }else{
          this.data.msg = 'Url格式错误.请填写完整。 （例：https://www.bcndropshippingelite.com）';
        }
      }else{
        this.data.msg = 'Url不能为空';
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.error{
  position: relative;
  top: -10px;
  margin: 0 20px;
  color: #F56C6C;
  font-size: 12px;
}
</style>