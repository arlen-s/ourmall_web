<template>
  <el-dialog
    :visible.sync="data.isShow"
    :title="$t('goods.导出商品')"
    width="400px"
  >
    <el-divider></el-divider>
    <div v-if="!data.step" class="d-body">
      <h2>{{$t('goods.导出范围')}}</h2>
      <el-radio-group v-model="data.method">
        <el-radio :label="'selected'">{{$t('goods.所选商品')}}</el-radio>
        <el-radio :label="'search'">{{$t('goods.当前筛选搜索的商品')}}</el-radio>
        <el-radio :label="'all'">{{$t('goods.所有商品')}}</el-radio>
      </el-radio-group>  
    </div>
    <div v-if="data.step == 1" class="progress-body">
      <p>{{$t('goods.关闭本弹窗不影响文件生成，文件生成后将通知您')}}</p>
      <div class="progress-wrap">
        <el-progress type="circle" :percentage=" parseInt((data.process.execNum / data.process.totalNum) * 100)" :width="80" color="#535fb0"></el-progress>
      </div>
    </div>
    <div v-if="data.step == 2" class="success-body">
      <template v-if="data.process.status == 1">
        <div  class="progress-wrap">
          <el-progress type="circle" :percentage="100" :width="80" :show-text="false" color="#67C23A">          
          </el-progress>
          <i class="el-icon-check"></i>
        </div>
        <p class=" mg-b-10">{{$t('goods.文件已生成')}}</p>
        <p class=" mg-b-10">下载：<el-link type="primary" :href="data.process.uploadUrl"  target="_blank">{{data.process.uploadUrl}}</el-link></p>
        <p style="color: #909399; font-size: 12px;">{{$t('goods.下载文件只保存12小时')}}</p>
      </template>
      <template v-if="data.process.status == 2">
        <div  class="progress-wrap">
          <el-progress type="circle" :percentage="100" :width="80" :show-text="false" color="#f56c6c">          
          </el-progress>
          <i class="el-icon-close" style="color: #f56c6c"></i>
        </div>
        <p class=" mg-b-10" style="color: #f56c6c">{{$t('goods.文件生成失败，请重试')}}</p>
      </template>
    </div>
    <el-divider></el-divider>
    <div slot="footer" class="dialog-footer">
      <!-- 导出进行中 -->
      <template v-if="exportTime">
        <el-button @click="breakDown">{{$t('goods.中止')}}</el-button>
        <el-button type="primary"  @click="data.isShow = false">{{$t('goods.收起')}}</el-button>
      </template>  
      <template v-else>
        <el-button @click="data.isShow = false">{{$t('goods.取消')}}</el-button>
        <el-button v-if="!data.step" type="primary" :loading="data.loading" @click="exportProducts">{{$t('goods.确定')}}</el-button>
        <el-button v-if="data.step == 2" type="primary" @click="reset">{{$t('goods.新建导出')}}</el-button>
      </template>
      
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["data", "filterData", "exportTime"],
  methods:{
    exportProducts(){
      switch(this.data.method){
        case  'selected':
          if(this.$parent.$refs.subPage && this.$parent.$refs.subPage.checkboxArr.length){
            let params = {
              method: 'selected',
              productIds: this.$parent.$refs.subPage.checkboxArr,
            }
            this.runExport(params);
          }else{
            this.$message({ message: this.$t('goods.请选择一个商品'), type: "error" });
          }
          break;
        case  'search':
          let params1 = {
              method: 'search',
              name: this.filterData.name,
              categoryId: this.filterData.categoryId,
              status: this.$route.name == "GoodsMgrAll" ? '' : (this.$route.name == 'GoodsMgrOn' ? '1' : '2'),
              costFrom: this.filterData.costFrom,
              costTo: this.filterData.costTo,
            }
          this.runExport(params1);
          break;
        case 'all':
          let params3 = {
            method: 'all',
          }
          this.runExport(params3);
          break;
      }
    },
    runExport(params){
      this.$emit('runExport', params)
    },
    reset(){
      this.$emit('resetExport')
    },
    breakDown(){
      this.$emit('breakDown')
    }
  }
}
</script>

<style lang="scss" scoped>
.d-body{
  padding: 20px;
  h2{
    margin-bottom: 25px;
    font-weight: bold;
    font-size: 16px;
  }
  .el-radio-group{
    display: flex;
    flex-direction: column;
    .el-radio{
      margin-bottom: 15px;
    }
  }
}
.progress-body{
  padding: 20px;
  > p{
    margin-bottom: 25px;
    text-align: center;
  }
  .progress-wrap{
    display: flex;
    justify-content: center;
    padding: 15px 0;
  }
}
.success-body{
  padding: 20px;
  .progress-wrap{
    display: flex;
    justify-content: center;
    margin-bottom: 5px;
    position: relative;
    > i{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #67C23A;
      font-size: 36px;
    }
  }
  p{
    text-align: center;
  }
  
}
</style>