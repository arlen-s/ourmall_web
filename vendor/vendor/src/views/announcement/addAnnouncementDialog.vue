<!-- 新增公告 -->
<template>
  <div class>
    <el-dialog
      :title="$t('announcement.公告')"
      :visible.sync="dialogAddData.isShow"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="dialogAddData.data" label-width="auto" :rules="rules">
        <el-form-item :label="$t('announcement.公告标题')" prop="title">
          <el-input v-model="dialogAddData.data.title"></el-input>
        </el-form-item>
        <el-form-item :label="$t('announcement.公告内容')" prop="content">
          <!-- <el-input type="textarea" size="medium" v-model="dialogAddData.data.content"></el-input> -->
          <div style="border: 1px solid #ccc;">
            <quill-editor
              ref="goodsEditor"
              style="min-height: 300px;"
              v-model="dialogAddData.data.content"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
            ></quill-editor>
            <input
              type="file"
              name="file"
              id="uploadEditorImg"
              accept="image/jpeg, image/png, image/gif"
              style="display: none;"
              multiple
              @change="uploadEditorImgFile($event,)"
            />
          </div>
        </el-form-item>
        <!-- <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">{{$t('announcement.取 消')}}</el-button>
        <el-button type="primary" @click="save('2')">{{$t('announcement.仅保存')}}</el-button>
        <el-button type="primary" @click="save('1')">{{$t('announcement.保存并发布')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  eeSourceBtn
} from '@/components/quill.eeSourceBtn.js'
Quill.register('modules/eeSourceBtn', eeSourceBtn)
import "quill/dist/quill.core.css"
import "quill/dist/quill.snow.css"
import "quill/dist/quill.bubble.css"
import {
  Quill,
  quillEditor
} from "vue-quill-editor"
export default {
  //import引入的组件需要注入到对象中才能使用
  props: ['dialogAddData'],
  data () {
    //这里存放数据
    return {
      form: {
        title: '',
        desc: '',
        description: '',
      },
      rules: {
        title: [
          { required: true, message: this.$t('announcement.请输入公告名称'), trigger: 'blur' },
          {  max: 100, message: this.$t('announcement.长度最大100字符'), trigger: 'blur' }
        ],
        content: [
          { required: true, message: this.$t('announcement.请填写公告信息'), trigger: 'blur' }
        ]
      }, editorOption: { //富文本编辑器配置
        modules: {
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
          eeSourceBtn: {},
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["blockquote", "code-block"],
              [{
                header: 1
              }, {
                header: 2
              }], // custom button values
              [{
                list: "ordered"
              }, {
                list: "bullet"
              }],
              [{
                script: "sub"
              }, {
                script: "super"
              }], // superscript/subscript
              [{
                indent: "-1"
              }, {
                indent: "+1"
              }], // outdent/indent
              [{
                direction: "rtl"
              }], // text direction
              [{
                size: ["small", false, "large", "huge"]
              }], // custom dropdown
              [{
                header: [1, 2, 3, 4, 5, 6, false]
              }],
              [{
                color: []
              }, {
                background: []
              }], // dropdown with defaults from theme
              [{
                font: []
              }],
              [{
                align: []
              }],
              ["link", "image",], // "video", "formula",
            ],
            handlers: {
              'image': value => {
                document.getElementById('uploadEditorImg').click()
              }
            }
          },
        },
        placeholder: this.$t('goodsEdit.编辑商品描述'),
      },
    }
  },
  components: {
    quillEditor
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
  },
  //方法集合
  methods: {

    handleClose () {
      this.$emit('closeDialog', false)
    },
    save (type) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let params = {
            id: this.dialogAddData.data.id || '',
            title: this.dialogAddData.data.title,
            content: this.dialogAddData.data.content,
            isShow: type
          }
          this.$apiCall('api.SiteMessage.addMsg', params, (r) => {
            if (r.ErrorCode == 9999) {
              this.tableData = r.Data.Results
              this.$message.success("success");
              this.$emit('closeDialog', false)

            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }, resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$emit('closeDialog', false)
    },
    uploadBase64 (base64) {
      let imgUrlBase64 = base64.split("base64,").pop()
      let ext = base64.match(/data:image\/(.*);base64,.*/)[1]
      let params = {
        imgUrlBase64,
        ext,
      }
      // this.loading = true;
      this.$apiCall('api.Comment.uploadImg', params, r => {
        // this.loading = false;
        if (r.ErrorCode == 9999) {
          let url = r.Data.Results.imgUrl
          // 获取到当前页面的富文本框
          let quill = this.$refs.goodsEditor.quill
          // 获取光标现在所在的位置上
          let length = quill.getSelection().index
          // quill插入我们刚刚上传成功之后的图片，arr是存在我们服务器上边的地址 
          quill.insertEmbed(length, 'image', url)
          quill.setSelection(length + 1)
        } else {
          this.$message({
            message: r.Message,
            type: "error"
          })
        }
      })
    },
    onEditorBlur () { //失去焦点事件
      document.querySelector('.ql-editor').setAttribute('data-placeholder', this.$t('goodsEdit.编辑商品描述'))
    },
    onEditorFocus () { //获得焦点事件
      document.querySelector('.ql-editor').removeAttribute('data-placeholder', '')
    },
    uploadEditorImgFile ($event) { //文本编辑器2图片   210902改成多图片上传
      //上传
      if (!$event.target.files[0].size) return
      this.fileList2($event.target)
      $event.target.value = ""
    },
    fileList2 (el) {
      let files = el.files
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 2097152) {
          this.$message({
            message: this.$t('goodsEdit.图片大小不能超过{num}MB', {
              num: 2
            }),
            type: "error"
          })
          files.splice(i, 1)
          i--
          return
        }
        let file = files[i]
        if (file.type.indexOf("image") > -1) { //是图片文件
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (e) => {
            this.uploadBase64(e.target.result)
          }
        } else {
          this.$message({
            message: this.$t('goodsEdit.不能识别此文件'),
            type: "error"
          })
        }
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () { }, //生命周期 - 创建之前
  beforeMount () { }, //生命周期 - 挂载之前
  beforeUpdate () { }, //生命周期 - 更新之前
  updated () { }, //生命周期 - 更新之后
  beforeDestroy () {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  destroyed () { }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  >
	
		.ql-container.ql-snow {
			height: 344px !important;
		}

		.ql-editor {
			height: 342px;
		}

		.ql-picker-label::before {
			position: relative;
			top: -8px;
		}

		.ql-snow .ql-color-picker .ql-picker-label svg,
		.ql-snow .ql-icon-picker .ql-picker-label svg {
			position: relative;
			top: -6px;
			right: 0;
		}
	
</style>