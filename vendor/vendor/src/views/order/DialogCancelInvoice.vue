<template>
  <el-dialog :title="$t('myinvoice.confirmToCancel')"
    :visible.sync="data.isShow"
    v-loading="data.loading"
    width="500px"
  >
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form ref="form" label-width="80px">
          <el-form-item v-if="data.item" label="订单号">
            <span style="color: #909399;">{{data.item.code}}</span>
          </el-form-item>
          <el-form-item label="作废原因">
            <el-input type="textarea" v-model="data.stopReason"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="data.isShow = false">
        {{$t('myinvoice.discard')}}
      </el-button>
      <el-button size="small" type="danger" @click="setCancel">
        {{$t('myinvoice.cancel')}}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    setCancel(){
      this.$emit('setCancel')
    }
  }

}
</script>
