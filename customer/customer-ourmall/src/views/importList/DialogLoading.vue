<template>
  <el-dialog
    top="32vh"
    :show-close="false"
    :visible.sync="LoadingVisible"
    :close-on-click-modal="false"
    width="30%"
  >
    <div class="LoadingModal">
      <el-progress  type="circle"  :percentage="loadingNum" :color="colors"></el-progress>
      <div class="text">{{$t('Loading time to long, check detailed progress')}}</div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button  @click="closePush">Close</el-button>
    </span>
  </el-dialog>    
</template>

<script>
export default {
  props: ['LoadingVisible', 'loadingNum'],
  data(){
    return {
      colors: [
        {color: '#f56c6c', percentage: 20},
        {color: '#e6a23c', percentage: 40},
        {color: '#5cb87a', percentage: 60},
        {color: '#1989fa', percentage: 80},
        {color: '#6f7ad3', percentage: 100}
      ],
    }
  },
  methods: {
    closePush(){
      this.$emit('closePush');
    }
  }
}
</script>

<style lang="scss" scoped>
.LoadingModal{
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .text{
    margin: 20px 0;
  }
}
</style>