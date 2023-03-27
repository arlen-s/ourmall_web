<!-- 发票 -->
<template>
  <div class>
    <h2 style="font-size:16px">
      <i class="el-icon-collection"></i>
      <span>
        <strong>{{$t('ticket.票类设置')}}</strong>
      </span>
    </h2>
    <el-card class="box-card" style="margin-top:20px">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="type" :label="$t('ticket.类型')" align="center" width="180">
          <template>
              <span>发票</span>
          </template>
          
        </el-table-column>
        <el-table-column prop="model" :label="$t('ticket.使用模板')" align="center" width="180">
          <span>模板一</span>
        </el-table-column>
        <el-table-column prop="logo" :label="$t('ticket.发票logo')" align="center" >
          <template slot-scope="scope">
                <el-image
      style="width: 100px; height: 100px"
      :src="scope.row.logo"
      fit="fit"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="address" align="center" :label="$t('ticket.公司地址')" ></el-table-column>
        <el-table-column prop="language" align="center"   :label="$t('ticket.语言')"></el-table-column>
        <el-table-column prop="status" align="center" :label="$t('ticket.状态')">
          <template slot-scope="scope">
            <span>{{scope.row.status == 1 ? $t('ticket.启用') : $t('ticket.停用')}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('ticket.操作')">
          <template slot-scope="scope">
            <el-link type="primary" @click="edit(scope.row)">{{$t('ticket.编辑')}}</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="$t('ticket.发票设置')" :visible.sync="dialogVisible" width="30%" @open="open()">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item :label="$t('ticket.使用模板')">
          <el-radio-group v-model="form.type">{{form.type}}
            <el-radio label="1">模板一</el-radio>
            <!-- <el-radio label="2">模板二</el-radio> -->
          </el-radio-group>
        </el-form-item>
        <el-form-item  :label="$t('ticket.公司地址')">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item :label="$t('ticket.发票logo')">
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
              <img v-if="form.logo" :src="form.logo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>

        <el-form-item :label="$t('ticket.发票语言')">
          <el-radio-group v-model="form.language">
            <el-radio label="CN">{{$t('ticket.中文')}}</el-radio>
            <el-radio label="GE">{{$t('ticket.德文')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('ticket.状态')">
          <el-select v-model="form.status" placeholder="请选择活动区域">
            <el-option :label="$t('ticket.启用')" value="1"></el-option>
            <el-option :label="$t('ticket.停用')" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('ticket.取消')}}</el-button>
        <el-button type="primary" @click="changeTicket">{{$t('ticket.确定')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //这里存放数据
    return {
      dialogVisible: false,
      form: {
        address: '',
        id: '',
        type: '',
        logo: 'https://upload.ourmall.com/user/helpDoc/3ef25cda5aae0828b8b4af13f103be62.png',
        language: 'CN',
        logoImage: [],
        status: '1',
      },
      tableData: [],
      fileBase64: '',
      imgName: '',
      nowFile: '',

    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    edit (row) {
        this.form = {
        id: row.id,
        address: row.address,
        type: '1',
        logo: row.logo,
        language: row.language,
        logoImage: row.logo? [
          {
            name: 'logo',
            url: row.logo
          }
        ] : [],
        status: row.status,
        }
        this.dialogVisible = true
    },
    open(){
console.log(this.form, 'this.form');
    },
    beforeAvatarUpload (file) {
      console.log(file)
      this.imgName = file.name
      this.nowFile = file
    },
    handleRemoveOtherERPDialog (file, fileList) {
      fileList.forEach((e, index) => {
        if (e.name == file.name) {
          this.form.logo.splice(index, 1)
        }
      })
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
          this.form.logo = r.Data.Results.imgUrl
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

    },
    getBil(){
            this.$apiCall('api.BillSet.get', {
      }, r => {
        // obj.loading = false
        if (r.ErrorCode == 9999) {
          this.tableData = r.Data.Results
         console.log(r.Data, '25415');
        } else {
          // this.form.imgUrlsList.splice(this.form.imgUrlsList.length - 1, 1)
          this.$message({
            message: r.Message,
            type: "error"
          })
        }
      })
    },
    changeTicket(){
      let params = {
        id: this.form.id,
        status: this.form.status,
        language: this.form.language,
        model: this.form.model,
        address: this.form.address,
        logo: this.form.logo
      }

      this.$apiCall('api.BillSet.change', params
      , r => {
        // obj.loading = false
        if (r.ErrorCode == 9999) {
          this.dialogVisible = false
            this.getBil()
        } else {
          // this.form.imgUrlsList.splice(this.form.imgUrlsList.length - 1, 1)
          this.$message({
            message: r.Message,
            type: "error"
          })
        }
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
this.getBil()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () { }, //生命周期 - 创建之前
  beforeMount () { }, //生命周期 - 挂载之前
  beforeUpdate () { }, //生命周期 - 更新之前
  updated () { }, //生命周期 - 更新之后
  beforeDestroy () { }, //生命周期 - 销毁之前
  destroyed () { }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped lang="scss">
.up-avatar ::v-deep .avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  line-height: 78px;
  text-align: center;
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
</style>