<!-- 创建公告 -->
<template>
  <div class>
    <el-dialog :title="$t('adv.发布公告')" width="40%" :visible.sync="data.show">
      <div>
        <el-form ref="form" :model="data.data" label-width="80px">
          <el-form-item :label="$t('adv.公告标题')" required>
            <el-input v-model="data.data.title" ></el-input>
          </el-form-item>
          <el-form-item :label="$t('adv.状态')">
            <el-radio-group v-model="data.data.status">
              <el-radio label="1"> {{$t('adv.启用')}} </el-radio>
              <el-radio label="2">{{$t('adv.停用')}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('adv.发布对象')">
            <el-radio-group v-model="data.data.rType">
              <el-radio label="1">{{$t('adv.供应商')}}</el-radio>
              <el-radio label="2">{{$t('adv.站长(分销商)')}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('adv.发布内容')">
            <div style="border: 1px solid #ccc;">
              <quill-editor
                ref="myQuillEditor"
                v-model="data.data.content"
                :options="options"
              />
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
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">  {{$t('adv.取消发布')}} </el-button>
        <el-button type="primary" @click="handleEnter">  {{$t('adv.确定发布')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import hljs from 'highlight.js'
// import "quill/dist/quill.core.css"
// import "quill/dist/quill.snow.css"
// import "quill/dist/quill.bubble.css"
// import { quillEditor } from 'vue-quill-editor'
// import { ImageExtend } from 'quill-image-resize-module';

// Quill.register('modules/ImageExtend', ImageExtend);
import hljs from 'highlight.js'
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
  components: { quillEditor },
  props: ['data'],
  data () {
    //这里存放数据 
    return {
      dialogVisible: false,
      content: '<h2>I am Example</h2>',
      options: { //富文本编辑器配置
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
        placeholder: '编辑公告描述',
      },

    }
  },
  //监听属性 类似于data概念
  computed: {
    //   editor () {
    //   return this.$refs.myQuillEditor.quill
    // }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleEnter () {   
        if (this.data.data.title == '') {
          this.$message.error( this.$t('adv.请填写标题'))
          return
        }
      let params = {
        title: this.data.data.title,
        id: this.data.data.id,
        content: this.data.data.content,
        rType:this.data.data.rType,
        status:this.data.data.status 
      }
      this.$apiCall("api.Notice.save", params, r => {
        if (r.ErrorCode == 9999) {
              this.$message.success(r.Message)
              this.data.show = false
              this.$emit('black')
          } else{
              this.$message.error(r.Message)
          }
      })
    },
    cancel(){
        this.data.show = false
        this.$emit('black')
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
          this.$message.error(`${ $t('adv.图片大小不能超过')}2MB`)
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
            message: '不能识别此文件',
            type: "error"
          })
        }
      }
    },
    uploadBase64 (base64) {
      let imgUrlBase64 = base64.split("base64,").pop()
      let ext = base64.match(/data:image\/(.*);base64,.*/)[1]
      let params = {
        imgUrlBase64,
        ext,
      }
      this.loading = true
      this.$apiCall('api.Comment.uploadImg', params, r => {
        this.loading = false
        if (r.ErrorCode == 9999) {
          let url = r.Data.Results.imgUrl
          // 获取到当前页面的富文本框
          let quill = this.$refs.myQuillEditor.quill
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
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    console.log('this is current quill instance object', this.editor)
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
<style  scoped>
</style>
<style>
.ql-container {
  height: 260px;
}
</style>