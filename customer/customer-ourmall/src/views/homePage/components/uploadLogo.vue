<template>
  <div v-loading="loading" class="upload-logo">
    <div class="title">
      <h2>Logo</h2>
      <p>最大建议尺寸 200px * 200px, 图片可自适应</p>
    </div>
    <div v-if="!logo" class="upload-box">
      <a class="upload-btn" href="javascript:;" @click="openUploadImg">
        <i class="el-icon-plus"></i>添加图片
      </a>
    </div>
    <div v-else class="logo-preview">
      <div class="img-box" :style="{backgroundImage: `url(${logo})`}"></div>
      <div class="action">
        <el-link type="primary" @click="openUploadImg">更改</el-link>
        <el-link type="danger" @click="delImg">删除</el-link>
      </div>
    </div>
    <input type="file" id="uploadImg" style="display: none;" accept="image/jpeg, image/png, image/gif, image/webp" @change="Base64($event)">
  </div>
</template>

<script>
export default {
  props: ['logo',],
  data(){
    return {
      loading: false,
    }
  },
  methods: {
    delImg(){
      this.$emit('changeLogo','');
    },
    uploadImgBase64(base64, ext){
      //上传base64
      this.loading = true;
      this.$apiCall('api.Comment.uploadImg', { imgUrlBase64: base64, ext}, r => {
        this.loading = false;
        document.getElementById('uploadImg').value = '';
        if(r.ErrorCode == 9999){
          this.$emit('changeLogo', r.Data.Results.imgUrl)
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      })

    },
    Base64($event){ //获取图片，生成base64
      if($event.target.value){
        if(($event.target.files[0].size / 1024 / 1024) > 1){
          this.$message({ message: this.$t('category.上传文件不能大于1MB'), type: "error" });
          $event.target.value = '';
          return;
        }
        let reader = new FileReader(),
          img = new Image(),
          ext = "";
        reader.onload = e => {
          img.src = e.target.result;
          let extArr = e.target.result.match(/data:image\/(.*);base64,.*/);
          ext = extArr[1];
          this.uploadImgBase64(e.target.result.split(',').pop(), ext);
        }
        reader.readAsDataURL($event.target.files[0]);
      }
    },
    openUploadImg(){
      document.getElementById('uploadImg').click();
    },
  }
}
</script>

<style lang="scss" scoped>
.upload-logo{
  .title{
    margin-bottom: 15px;
    h2{
      margin-bottom: 5px;
      font-size: 14px;
    }
    p{
      color: #909399;
      font-size: 12px;
    }
  }
  .upload-box{
    display: flex;
    justify-content: center;
    .upload-btn{
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #F2F6FC;
      color: #535fb0;
      width: 210px;
      height: 60px;
      border: 1px #909399 dashed;
      border-radius: 4px;
      text-decoration: none;
      font-size: 16px;
      > i{
        margin-right: 15px;
      }
    }
    .upload-btn:hover{
      color: #909399;
      border-color: #535fb0;
    }
  }
  .logo-preview{
    .img-box{
      margin: 0 auto 10px;
      border: 1px #C0C4CC solid;
      width: 200px;
      height: 200px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      background-color: #fff;
    }
    .action{
      margin: 0 auto;
      padding: 0 25px;
      display: flex;
      justify-content: space-between;
      width: 200px;
    }
  }
  
}
</style>