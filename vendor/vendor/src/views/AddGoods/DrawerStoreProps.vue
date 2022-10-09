<template>
  <el-drawer
    :visible.sync="dataMAG.isShow"
    :title="$t('goodsEdit.添加商品规格')"
    class="drawer-add-prop"
    :before-close="beforeClose"
    size="75%"
    @open="open"
  >
    <div class="drawer-body">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="12" class="flex-r" >
            <el-form-item label="sku" required>
              <el-input v-model="dataMAG.form.sku"  :disabled="!!(dataMAG.isEdit && dataMAG.form.stockId)"></el-input>
            </el-form-item>
            <el-form-item :label="$t('goodsEdit.商品中文名')" required>
              <el-input v-model="dataMAG.form.productName" ></el-input>
            </el-form-item>            
          </el-col>
          <el-col :span="12" class="flex-r" >
            <el-form-item :label="`${$t('goodsEdit.出厂价')}($)`">
              <el-input v-model="dataMAG.form.cost" ></el-input>
            </el-form-item>
            <el-form-item :label="`${$t('goodsEdit.商品重量')}(g)`">
              <el-input v-model="dataMAG.form.weight" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="flex-r">
            <el-form-item :label="$t('goodsEdit.海关编号')">
              <el-input v-model="dataMAG.form.barCode"></el-input>
            </el-form-item>
            <el-form-item :label="$t('goodsEdit.材质')">
              <el-input v-model="dataMAG.form.material" ></el-input>
            </el-form-item>            
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('goodsEdit.预估包装重量')">
              <el-input v-model="dataMAG.form.packageWeight" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('goodsEdit.包装尺寸')">
              <div style="display: flex;">
                <div style="display: inline-block; margin-right: 20px;">
                  {{$t('goodsEdit.长')}}
                  <el-input-number
                    :min="0"
                    :controls="false"
                    :precision="1"
                    style="width: 80px;"
                    v-model="dataMAG.form.packageLength"
                  ></el-input-number>cm
                </div>
                <div style="display: inline-block; margin-right: 20px;">
                  {{$t('goodsEdit.宽')}}
                  <el-input-number
                    :min="0"
                    :controls="false"
                    :precision="1"
                    style="width: 80px;"
                    v-model="dataMAG.form.packageWidth"
                  ></el-input-number>cm
                </div>
                <div style="display: inline-block; margin-right: 20px;">
                  {{$t('goodsEdit.高')}}
                  <el-input-number
                    :min="0"
                    :controls="false"
                    :precision="1"
                    style="width: 80px;"
                    v-model="dataMAG.form.packageHeight"
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
          <el-col :span="12">
            <el-form-item :label="$t('goodsEdit.商品尺寸')">
              <div style="display: flex;">
                <div style="display: inline-block; margin-right: 20px;">
                  {{$t('goodsEdit.长')}}
                  <el-input-number
                    :min="0"
                    :controls="false"
                    :precision="1"
                    style="width: 80px;"
                    v-model="dataMAG.form.productLength"
                  ></el-input-number>cm
                </div>
                <div style="display: inline-block; margin-right: 20px;">
                  {{$t('goodsEdit.宽')}}
                  <el-input-number
                    :min="0"
                    :controls="false"
                    :precision="1"
                    style="width: 80px;"
                    v-model="dataMAG.form.productWidth"
                  ></el-input-number>cm
                </div>
                <div style="display: inline-block; margin-right: 20px;">
                  {{$t('goodsEdit.高')}}
                  <el-input-number
                    :min="0"
                    :controls="false"
                    :precision="1"
                    style="width: 80px;"
                    v-model="dataMAG.form.productHeight"
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
          <el-checkbox-group v-model="dataMAG.form.productType">
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
              <img v-if="dataMAG.form.propertyImageOriginal" :src="dataMAG.form.propertyImageOriginal" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-row>
          <el-col>
            <el-form-item :label="$t('goodsEdit.特征参数')">
              <div class="flex-feature">
             <el-switch v-model="texFlag" style="margin-right:5px">
            </el-switch>
                <el-button v-show="texFlag" type="primary" style="margin-left:5px" size="small" @click="openCreatedCustomDom">{{$t('goodsEdit.创建自定义规格分类')}}</el-button>
               <el-upload
              ref="uploadFile"
              :on-change="handleChangeOtherERPDialog"
              :before-remove="handleRemoveOtherERPDialog"
              action=""
              :file-list="dataMAG.form.attachment"
              :auto-upload="false"
              accept="image/gif,image/jpeg,image/jpg,image/png,.doc,.docx,.xls,.xlsx"
              class="upload-file"
               v-if="texFlag" 
            >
              <el-button
                ref="uploadBtn"
                style="margin-left:5px"
                size="small"         
                     
                :loading="DialogEditComment.uploadLoading"
              > <i class="el-icon-upload el-icon--right"></i>{{$t('ticket.upload')}}</el-button>
            </el-upload>
              </div>
 
            </el-form-item>              
          </el-col>
        </el-row>
      </el-form>
      <div v-if="texFlag" style="margin-top:40px">
          <el-row>
            <el-col :span="12" v-for="(custom,i) in dataMAG.form.specification" :key="i">
                  <div class="cus-box">
                    <div class="header">{{custom.name}}</div>
                     <el-table
                    :data="custom.table"
                    border
                    style="width: 100%">
                    <el-table-column
                      :label="$t('goodsEdit.操作')"
                      align="center"
                      width="180">
                      <template slot-scope="scope">
                        <el-link type="danger" @click="delColumn(i,scope.$index)">{{$t('goodsEdit.删除')}}</el-link>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="Specification"
                      align="center"
                      :label="$t('goodsEdit.规格')">
                      <template slot-scope="scope">
                            <input type="text" style="width:80%" v-model="scope.row.Specification">
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="SpecificationVal"
                      align="center"
                       :label="$t('goodsEdit.规格参数')">
                      <template slot-scope="scope">
                            <input type="text" style="width:80%" v-model="scope.row.SpecificationVal">
                      </template>
                    </el-table-column>
                  </el-table>
                  <span class="add-icon" @click="addColumn(i)">
                      <i class="el-icon-plus"></i>
                  </span>
                  
                  </div>
            </el-col>
          </el-row>
      </div>
    </div>
    <div class="drawer-footer">
      <el-button @click="dataMAG.isShow = false">{{$t('goodsEdit.取消')}}</el-button>
      <el-button type="primary" @click="setMuliProps">{{$t('goodsEdit.确定')}}</el-button>
    </div>
    <el-dialog
  :title="$t('goodsEdit.规格分类')"
  :visible.sync="customDialog"
  append-to-body
  width="30%">
  <div>
    <el-input v-model="CategoryName" style="width: 40%;margin-left:30%" :placeholder="$t('goodsEdit.请输入规格名称')"></el-input>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="customDialog = false">{{$t('goodsEdit.取消')}}</el-button>
    <el-button type="primary" @click="createFun">{{$t('goodsEdit.确定')}}</el-button>
  </span>
</el-dialog>
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
        texFlag: true,
        chineseName: '',
        factoryPrice: '',
        length: '',
        height: '',
        width: '',
        imgUrl: '',
        productType: [],
      },
      texFlag: true,
      titleName: '',
      DialogEditComment:{
        uploadLoading:false
      },
      setFileDialog: 
      {
      uploadLoading: false,
      loading:false,
      attach:  []
      },
      customDialog: false,
      CategoryName: '',
      imgName: '',
      nowFile: '',
      imageUrl: '',
      fileBase64: '',
      tempUrl: '',
      productTypeArr: this.$dict.productTypeArr,
      customList: []
    }
  },
  props: ["dataMAG"],
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
      if (this.dataMAG.form.packageLength && this.dataMAG.form.packageWidth && this.dataMAG.form.packageHeight) {
        return (this.dataMAG.form.packageLength * this.dataMAG.form.packageWidth * this.dataMAG.form.packageHeight).toFixed(1)
      } else {
        return
      }
    },
    bulkStore () { //商品体积
      if (this.dataMAG.form.productLength && this.dataMAG.form.productWidth && this.dataMAG.form.productHeight) {
        return (this.dataMAG.form.productLength * this.dataMAG.form.productWidth * this.dataMAG.form.productHeight).toFixed(1)
      } else {
        return
      }
    },

  },
  watch: {
    texFlag (newVal, oldVal) {
      if (newVal == true) {
            this.dataMAG.form.specificationSwitch = '1'
      } else {
            this.dataMAG.form.specificationSwitch = '2'        
      }
    }
  },
  methods: {
    openCreatedCustomDom(){//打开创建自定义dialog
        this.customDialog = true
    },
    open(){
      console.log(
        this.dataMAG.form, 'this.dataMAG.form'
      );
      this.texFlag = this.dataMAG.form.specificationSwitch == '1' ? true : false
    
    },
    addColumn(i){ // 新增行
    console.log(this.dataMAG.form.specification, 'this.dataMAG.form.Specification');
    let column = {
          Specification: '',
          SpecificationVal: '', 
      }
      this.dataMAG.form.specification[i].table.push(column)
    },
    delColumn(i,index){
         this.dataMAG.form.specification[i].table.splice(index, 1)
         if (this.dataMAG.form.specification[i].table.length == 0) {
          this.dataMAG.form.specification.splice(i,1)
         }
    },
    createFun(){
      if (this.CategoryName.length ==0) {
       this.$message.error('请填写标题') 
       return
      }
      let obj = {
      name: this.CategoryName,
      table: [
          {
            Specification: '',
            SpecificationVal: '', 
        }, 

    ]
     }
      if (this.dataMAG.form.specification == undefined) {
          this.dataMAG.form.specification = []
      }
    this.dataMAG.form.specification.push(obj)
      this.customDialog = false
      this.CategoryName = ''
      console.log(this.dataMAG.form.specification, 'this.customList');
    },
    handleChangeOtherERPDialog(file) {
      this.setFileDialog.loading = true;
      this.setFileDialog.uploadLoading = true;
      this.$apiCall(
        "api.Comment.uploadAttach",
        {
          "@file": file.raw,
        },
        (r) => {
          this.setFileDialog.loading = false;
          this.setFileDialog.uploadLoading = false;
          if (r.ErrorCode == "9999") {
            let item = {
              name: file.name,
              url:r.Data.Results.url,
              uid: file.uid
            }
            this.dataMAG.form.attachment
            this.dataMAG.form.attachment.push(item);
            console.log(this.dataMAG.form.attachment, 'this.dataMAG.form.attachment');
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    handleRemoveOtherERPDialog(file, fileList) {
      fileList.forEach((e, index) => {
        if (e.name == file.name) {
          this.dataMAG.form.attachment.splice(index, 1);
        }
      });
    },    
    setMuliProps () {
      //重置错误红框
      setTimeout(() => {
        if (!this.dataMAG.form.sku) {
          this.$message.error("SKU必填")
          return 
        }
        if (!this.dataMAG.form.productName) {
          this.$message.error("商品中文名必填")
          return 
        }
        this.dataMAG.isShow = false
        this.$emit('callBackProps', this.dataMAG.form,this.texFlag)
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
          this.dataMAG.form.propertyImageOriginal = r.Data.Results.imgUrl
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
.flex-feature ::v-deep.el-upload-list{
    position: absolute;
    top: 35px;
    left: 0;
    display: flex;
    align-items: center;
}
.flex-feature{
  display: flex;
  align-items: center;
}
.cus-box{
  width: 80%;
    .header{
    width: 100%;
    height: 40px;
    background: #7d88d0;
    text-align: center;
    line-height: 40px;
    color: #fff;
      
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
.add-icon{
  display: block;
  text-align: center;
  line-height: 30px;
  height: 30px;
  i{
    text-align: center;
    line-height: 30px;
    width: 50px;
    border: 1px solid #ccc;
    border-top: none;
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
.flex-r{
  display: flex;
}
</style>

