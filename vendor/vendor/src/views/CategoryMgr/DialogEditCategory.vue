<template>
  <el-dialog
    :visible.sync="data.isShow"
    :title="$t('category.商品类目')"
    width="760px"
    :close-on-click-modal="false"
  >
    <div v-loading="data.loading">
      <el-divider></el-divider>
      <div>
        <el-form ref="addCategoryForm" label-width="130px">
          <el-form-item :label="$t('category.类目名称')" required>
            <el-input :placeholder="$t('category.请输入类目名称')" style="width: 500px;" v-model="data.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('category.上级类目')">
            <el-cascader
              ref="selectCategory"
              :options="category"
              :props="{ expandTrigger: 'hover', checkStrictly: true }"
              :placeholder="$t('category.选择上级目录')"
              filterable
              clearable
              :show-all-levels="false"
              v-model="data.path"
              @change="changeCategory"
              :disabled="data.type == 'edit'"
            >
              <div slot-scope="{data}" @click="clickNode">{{ data.name }}</div>
            </el-cascader>
          </el-form-item>
          <el-form-item :label="$t('category.类目描述')" class="ipt-des">
            <el-input type="textarea" :rows="4"  v-model="data.description"></el-input> 
            <span class="length">
              <span :class="{'tx-danger': data.description && data.description.length > 200}">{{data.description && data.description.length || 0}}</span>/200
            </span>
          </el-form-item>  
          <el-form-item  :label="$t('category.类目封面')">
            <div v-if="!data.themeUrl" class="el-upload el-upload--picture-card" @click="openUploadImg">
              <i class="el-icon-plus"></i>
            </div>
            <div v-else class="img-wrap">
              <a href="javascript:;" class="del" @click="delImg">
                <i class="el-icon-delete"></i>
              </a>
              <el-image style=" width: 80px; height: 80px; border: 1px solid #ddd; background-color: #fff;"
                :src="data.themeUrl"
                :fit="'contain'"
                lazy
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <p>{{$t('category.推荐尺寸：600px * 600px, 最大1MB。')}}</p>
          </el-form-item>  
        </el-form>
        <input type="file" id="uploadImg" style="display: none;" accept="image/jpeg, image/png, image/gif" @change="Base64($event)">
      </div>
      <el-divider></el-divider>
      <div slot="footer" class="dialog-footer">
        <el-button @click="data.isShow = false">{{$t('category.取消')}}</el-button>
        <el-button type="primary" @click="setCategory">{{$t('category.保存')}}</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props:["data", "category"],
  computed: {

  },
  methods: {
    setCategory(){
      //保存分类
      if(!this.data.name){
        this.$message({ message: this.$t('category.类目名称必须填写'), type: "error" });
        return;
      }
      // if(!this.data.path.length && !this.data.themeUrl){
      //   this.$message({ message: this.$t('category.1级类目必须设置封面图片'), type: "error" });
      //   return;
      // }
      if(this.data.description && this.data.description.length > 200){
        this.$message({ message: this.$t('category.类目描述不能超过200字'), type: "error" });
        return;
      }
      this.data.loading = true;
      let apiUrl = this.data.type == 'edit' ? 'api.ProductCategory.changeByUser' : 'api.ProductCategory.addByVendor'

      this.$apiCall( apiUrl, {
        id: this.data.type == 'edit' ? this.data.id : '',
        pid: this.data.path.length ? this.data.path[this.data.path.length - 1] : '0',
        name: this.data.name,
        level: this.data.path.length + 1,
        description: this.data.description,
        themeUrl: this.data.themeUrl,
      }, r => {
        this.data.loading = false;
        if(r.ErrorCode == 9999){
          this.$emit('setCategorySuccess')
        }else{
          this.$message({ message: r.Message, type: "error" });
        }
      })
    },
    uploadImgBase64(base64, ext){
      //上传base64
      this.data.loading = true;
      this.$apiCall('api.Comment.uploadImg', { imgUrlBase64: base64, ext}, r => {
        this.data.loading = false;
        document.getElementById('uploadImg').value = '';
        if(r.ErrorCode == 9999){
          this.data.themeUrl = r.Data.Results.imgUrl;
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
    delImg(){
      //删除已上传图片
      this.data.themeUrl = '';
    },
    openUploadImg(){
      document.getElementById('uploadImg').click();
    },
    changeCategory(){
      this.$refs.selectCategory.dropDownVisible = false; //监听值发生变化就关闭它
    },
    clickNode($event){
      $event.target.parentElement.parentElement.firstElementChild.click();
    },
  }
}
</script>

<style lang="scss" scoped>
.ipt-des{
  position: relative;
  width: 500px;
  .length{
    position: absolute;
    right: -54px;
    bottom: -14px;
    color: #909399;
  }
}
.el-upload{
  position: relative;
  width: 80px;
  height: 80px;
  i{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.img-wrap{
  position: relative;
  width: 80px;
  height: 80px;
  .del{
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    z-index: 1;
    background-color: #F56C6C;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    > i{
      color: #fff;
      font-size: 12px;
    }
  }
}
 .dialog-footer {
    display: flex;
    justify-content: flex-end;
    padding: 15px 15px 0;
  }
</style>