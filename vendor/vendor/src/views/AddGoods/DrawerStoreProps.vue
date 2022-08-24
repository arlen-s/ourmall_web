<template>
  <el-drawer
    :visible.sync="data.isShow"
    :title="$t('goodsEdit.添加商品规格')"
    class="drawer-add-prop"
    :before-close="beforeClose"
    size="45%"
  >
    <div class="drawer-body">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="sku" required>
              <el-input v-model="data.form.sku"  :disabled="!!(data.isEdit && data.form.stockId)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品中文名" required>
              <el-input v-model="data.form.productName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="出厂价($)">
              <el-input v-model="data.form.cost"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="重量(g)">
              <el-input v-model="data.form.weight"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="海关编号">
              <el-input v-model="data.form.barCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="材质">
              <el-input v-model="data.form.material"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('goodsEdit.包装尺寸')">
              <div style="display: flex;">
                <div style="display: inline-block; margin-right: 20px;">
                  {{$t('goodsEdit.长')}}
                  <el-input-number
                    :min="0"
                    :controls="false"
                    :precision="1"
                    style="width: 80px;"
                    v-model="data.form.packageLength"
                  ></el-input-number>cm
                </div>
                <div style="display: inline-block; margin-right: 20px;">
                  {{$t('goodsEdit.宽')}}
                  <el-input-number
                    :min="0"
                    :controls="false"
                    :precision="1"
                    style="width: 80px;"
                    v-model="data.form.packageWidth"
                  ></el-input-number>cm
                </div>
                <div style="display: inline-block; margin-right: 20px;">
                  {{$t('goodsEdit.高')}}
                  <el-input-number
                    :min="0"
                    :controls="false"
                    :precision="1"
                    style="width: 80px;"
                    v-model="data.form.packageHeight"
                  ></el-input-number>cm
                </div>
                <div style="display: inline-block; margin-right: 20px; line-height: 28px;">
                  {{$t('goodsEdit.体积:')}}
                  <b>{{bulkPage}}</b> cm
                  <span
                    style="vertical-align:super; transform: scale(0.75); display: inline-block;"
                  >3</span>
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('goodsEdit.商品尺寸')">
              <div style="display: flex;">
                <div style="display: inline-block; margin-right: 20px;">
                  {{$t('goodsEdit.长')}}
                  <el-input-number
                    :min="0"
                    :controls="false"
                    :precision="1"
                    style="width: 80px;"
                    v-model="data.form.productLength"
                  ></el-input-number>cm
                </div>
                <div style="display: inline-block; margin-right: 20px;">
                  {{$t('goodsEdit.宽')}}
                  <el-input-number
                    :min="0"
                    :controls="false"
                    :precision="1"
                    style="width: 80px;"
                    v-model="data.form.productWidth"
                  ></el-input-number>cm
                </div>
                <div style="display: inline-block; margin-right: 20px;">
                  {{$t('goodsEdit.高')}}
                  <el-input-number
                    :min="0"
                    :controls="false"
                    :precision="1"
                    style="width: 80px;"
                    v-model="data.form.productHeight"
                  ></el-input-number>cm
                </div>
                <div style="display: inline-block; margin-right: 20px; line-height: 28px;">
                  {{$t('goodsEdit.体积:')}}
                  <b>{{bulkStore}}</b> cm
                  <span
                    style="vertical-align:super; transform: scale(0.75); display: inline-block;"
                  >3</span>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$t('goodsEdit.商品属性')">
          <el-checkbox-group v-model="data.form.productType">
            <el-checkbox
              v-for="type in productTypeArr"
              :key="type.value"
              :label="type.value"
              name="type"
            >{{$t(type.label)}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :label="$t('goodsEdit.缩略图')">
          <div class="up-avatar">
            <el-upload
              ref="elupload"
              class="avatar-uploader"
              action="#"
              :http-request="httpRequest"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :on-remove="handleRemove"
            >
              <img v-if="data.form.propertyImage" :src="data.form.propertyImage" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="drawer-footer">
      <el-button @click="data.isShow = false">{{$t('goodsEdit.取消')}}</el-button>
      <el-button type="primary" @click="setMulitProps">{{$t('goodsEdit.创建多规格表格')}}</el-button>
    </div>
  </el-drawer>
</template>

<script>
import draggable from 'vuedraggable' //拖拽
import VueTagsInput from '@johmun/vue-tags-input' //tags
export default {
  data () {
    return {
      form: {
        sku: '',
        chineseName: '',
        factoryPrice: '',
        length: '',
        height: '',
        width: '',
        imgUrl: '',
        productType: [],
      },
      imgName: '',
      nowFile: '',
      imageUrl: '',
      fileBase64: '',
      tempUrl: '',
      productTypeArr: this.$dict.productTypeArr,
    }
  },
  props: ["data"],
  components: {
    draggable,
    VueTagsInput,
  },
  computed: {

    volumeWeight () { //体积重
      if (isNaN(this.bulk / this.form.vwCoefficient))
        return '---'
      return Number(this.bulk / this.form.vwCoefficient).toFixed(3)
    },
    bulkPage () { //包装体积
      if (this.data.form.packageLength && this.data.form.packageWidth && this.data.form.packageHeight) {
        return (this.data.form.packageLength * this.data.form.packageWidth * this.data.form.packageHeight).toFixed(1)
      } else {
        return
      }
    },
    bulkStore () { //商品体积
      if (this.data.form.productLength && this.data.form.productWidth && this.data.form.productHeight) {
        return (this.data.form.productLength * this.data.form.productWidth * this.data.form.productHeight).toFixed(1)
      } else {
        return
      }
    },

  },

  methods: {
    setMulitProps () {
      //重置错误红框
      setTimeout(() => {
        if (!this.data.form.sku) {
          this.$message.error("SKU必填")
          return 
        }
        if (!this.data.form.productName) {
          this.$message.error("商品中文名必填")
          return 
        }
        this.data.isShow = false
        this.$emit('callBackProps', this.data.form)
      }, 500)
    },

    beforeClose (done) {
      this.$confirm(this.$t('goodsEdit.确认关闭？  将不会保存改变。'))
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    beforeAvatarUpload (file) {
      console.log(file)
      this.imgName = file.name
      this.nowFile = file
    },
    httpRequest (data) {
      // this.imageUrl = URL.createObjectURL(data.file)
      //这是限制上传文件类型 
      const isPFX = data.file.type === 'image/jpeg' || data.file.type === 'image/jpg' || data.file.type === 'image/png'
      const isLt2M = data.file.size / 1024 / 1024 < 2
      if (!isPFX) {
        this.$message.error("上传头像图片只能是 JPG、PNG、JPEG 格式!")
      } else if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 2MB!")
      } else {
        this.getBase64(data.file).then(resBase64 => {
          this.fileBase64 = resBase64.split(',')[1]　　//直接拿到base64信息
          let ext = resBase64.match(/data:image\/(.*);base64,.*/)[1]
          console.log(this.tempUrl, 'this.tempUrl')
          this.getUploadImgUrl(this.fileBase64, ext)
        })
      }
    },
    getUploadImgUrl (imgUrlBase64, ext) {
      //图片上传接口
      this.$apiCall('api.Comment.uploadImg', {
        imgUrlBase64,
        ext
      }, r => {
        // obj.loading = false
        if (r.ErrorCode == 9999) {
          this.data.form.propertyImage = r.Data.Results.imgUrl
        } else {
          // this.form.imgUrlsList.splice(this.form.imgUrlsList.length - 1, 1)
          this.$message({
            message: r.Message,
            type: "error"
          })
        }
      })
    },
    //这个file参数 也就是文件信息，你使用 插件 时 你就可以打印出文件信息 看看嘛
    getBase64 (file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        let fileResult = ""
        reader.readAsDataURL(file)
        //开始转
        reader.onload = function () {
          fileResult = reader.result
        }
        //转 失败
        reader.onerror = function (error) {
          reject(error)
        }
        //转 结束  咱就 resolve 出去
        reader.onloadend = function () {
          resolve(fileResult)
        }
      })
    },
    handleRemove (file, fileList) {

    }

  },
}
</script>

<style lang="scss">
.drawer-add-prop {
  .el-drawer {
    .el-drawer__header {
      border-bottom: 1px #dcdfe6 solid;
      margin-bottom: 0;
      padding-bottom: 15px;
    }
    .el-drawer__body {
      margin-bottom: 70px;
      .el-divider--horizontal {
        margin: 0;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.drawer-body {
  padding: 15px;
  .props-card {
    position: relative;
    margin-bottom: 10px;
    padding: 10px 0;
    background-color: #ebeef5;
    border: 1px transparent solid;
    .draggable-i {
      position: absolute;
      top: 3px;
      left: 3px;
      color: #909399;
      cursor: move;
    }
    .del {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 1;
      color: #f56c6c;
      cursor: pointer;
    }
  }
  .props-card.error {
    border-color: #f56c6c;
  }
}
.drawer-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0 15px;
  border-top: 1px #dcdfe6 solid;
  width: 100%;
  height: 70px;
  background-color: #fff;
}
.up-avatar ::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  width: 78px;
  height: 78px;
  position: relative;
  overflow: hidden;
  img {
    // width: 100%;
    height: 78px;
  }
}
.up-avatar ::v-deep .avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  line-height: 78px;
  text-align: center;
}
// .up-avatar .avatar-uploader .el-upload ::v-depp.avatar{
//       width: 100%;
//       height: 100%;
// }
</style>

