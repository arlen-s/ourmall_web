<template>
  <el-dialog title="Notice"
    :visible.sync="data.isShow"
    width="600px"
  >
    <el-divider></el-divider>
    <div class="body-wrap">
      Sorry, you can only process <b>{{$store.state.userInfo.orderNum}}</b> orders. Click Continue to get more.
    </div>
    <el-divider></el-divider>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="data.isShow = false">Discard</el-button>
      <el-button size="small" type="primary" @click="gotoRecharge">Continue</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    gotoRecharge(){
      this.data.isShow = false;
      this.$router.push({name: 'Rechareg'})
    }
  },
}

</script>

<style lang="scss" scoped>
.body-wrap{
  padding: 30px 20px;
  font-size: 16px;
}
</style>