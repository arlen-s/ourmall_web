<template>
  <el-dialog
    :visible.sync="data.isShow"
    :title="$t('goods.导入商品')"
    width="500px"
  >
    <el-divider></el-divider>
    <div class="d-body">
      <a v-if="!data.filePath" class="i-btn" href="javascript:;" @click="openUpload">
        <i class="el-icon-upload"></i>
        <p>{{$t('goods.选择文件')}}</p>
      </a>
      <div v-else class="path">
        <p class=" mg-b-20 tx-ellipsis3">{{data.filePath}}</p>
        <div class=" tx-center">
          <el-link type="danger" @click="clearFile"><i class="el-icon-delete"></i></el-link>
        </div>
      </div>
      <div class="right">
        <p class="t1">
          <span>{{$t('goods.点击下载')}}</span> <el-link type="primary" href="./file/importGood.xlsx" target="_blank">{{$t('goods.商品导入模板')}}</el-link>
        </p>
        <p class="t2">
          {{$t('goods.请按规范填写表格，仅支持xlsx格式文件')}}
        </p>
        <p class="t2" v-html="$t('goods.上传的文件不能超过 2M，只处理前 <b>99</b> 条数据。')"></p>
      </div>
    </div>
    <input type="file" id="uploadXls" style="display: none;" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      @change="fileUpload($event)"
    >
    <el-divider></el-divider>
    <div slot="footer" class="dialog-footer">
      <el-button @click="data.isShow = false">{{$t('goods.取消')}}</el-button>
      <el-button type="primary" :loading="data.loading" :disabled="!data.file" @click="apiUpload">{{$t('goods.提交')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    clearFile(){ //清空上传的
      this.data.file = null;
      this.data.filePath = '';
      document.getElementById('uploadXls').value = '';
    },
    fileUpload($event){
      this.data.file = $event.target.files[0];
      this.data.filePath = $event.target.value;
      $event.target.value = '';
    },
    apiUpload(){
      if(this.data.file.size > 2097152){
        this.$message({ message: this.$t('goods.文件不能大于10MB'), type: "error" });
        return;
      }
      if(!this.data.file){
        this.$message({ message: this.$t('goods.请上传文件'), type: "error" });
        return;
      }
      this.$set(this.data, 'loading', true)
      if ($("#ifilePro").length == 0) {
        $("body").append(
          '<iframe id="ifilePro" style="display:none"></iframe>'
        );
      }
      this.$apiCall('api.VendorShop.deliverImportProduct', { '@file': this.data.file }, r => {
        this.$set(this.data, 'loading', false)
        if (r.ErrorCode == 9999) {
          if(r.Data.Results.file){
            this.$emit('uploadSuccess', 'error')
            document.getElementById("ifilePro").src = r.Data.Results.file;
          }else{
            this.$emit('uploadSuccess')
          }
        }else{
          this.$message({ message: r.Message, type: "error" });
        }
      })
    },
    openUpload(){
      document.getElementById('uploadXls').click();
    }
  }
}
</script>

<style lang="scss" scoped>
.d-body{
  display: flex;
  padding: 20px 30px;
  .i-btn{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    width: 150px;
    height: 150px;
    border: 1px #DCDFE6 dashed;
    border-radius: 4px;
    text-decoration: none;
    color: #5c6ac4;
    i{
      margin-bottom: 5px;
      font-size: 92px;
    }
  }
  .i-btn:hover{
    border-color: #5c6ac4;
  }
  .path{
    margin-right: 15px;
    padding: 15px;
    width: 150px;
    height: 150px;
    border: 1px #DCDFE6 dashed;
    border-radius: 4px;
    font-size: 12px;

  }
  .right{
    .t1{
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      span{
        margin-right: 10px;
      }
    }
    .t2{
      line-height: 26px;
    }
  }
}
</style>