<template>
  <div class="setting-page single">
    <el-scrollbar class="left">
      <!-- 左边操作栏 -->
      <div class="content">
        <h1>
          <el-link icon="el-icon-arrow-left" :underline="false" @click="goBack">{{$t('storeSetting.富文本')}}</el-link>
        </h1>
        <el-card>
          <el-form>
            <el-form-item :label="$t('storeSetting.标题')">
              <el-input v-model="setting.title" ></el-input>
            </el-form-item>
            <el-form-item :label="$t('storeSetting.内容')" v-loading="editLoading" >
              <quill-editor
                v-if="!isShowMax"
                ref="goodsEditor"
                class="rich-editor"
                v-model="setting.description"
                :options="editorOption"
                @ready="onEditorReady()"
              >
              </quill-editor>
              <input type="file" name="file"  id="uploadEditorImg"  accept="image/jpeg, image/png, image/gif" style="display: none;"
                @change="uploadEditorImgFile($event,)"
              >
            </el-form-item>
            <el-form-item :label="$t('storeSetting.文本对齐')">
              <el-button-group style="width: 100%;">
                <el-button plain size="medium"  :class="{active: setting.align == 'left'}" @click="changeAlign('left')"><i class="fa fa-align-left" aria-hidden="true"></i></el-button>
                <el-button plain size="medium" :class="{active: setting.align == 'center'}" @click="changeAlign('center')">
                  <i class="fa fa-align-justify" aria-hidden="true"></i>
                </el-button>
                <el-button plain size="medium" :class="{active: setting.align == 'right'}" @click="changeAlign('right')"><i class="fa fa-align-right" aria-hidden="true"></i></el-button>
              </el-button-group>
            </el-form-item>
            <el-form-item :label="$t('storeSetting.文字大小')">
              <el-select v-model="setting.size">
                <el-option v-for="opt in optionsSize" :key="opt.value"
                  :label="$t(opt.label)"
                  :value="opt.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('storeSetting.文字宽度')">
              <el-select v-model="setting.width">
                <el-option v-for="opt in optionsWidth" :key="opt.value"
                  :label="$t(opt.label)"
                  :value="opt.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </el-scrollbar>
    <el-scrollbar ref="rightBox" class="right">
      <!-- 右边操作栏 -->
      <div class="content">
        <demoHeader :data="$store.state.configJson.header" :headerMenu="headerMenu"/>
        <demoBody :data="setting" :header="$store.state.configJson.header"/>
        <demoFooter :setting="$store.state.configJson.footer" />
      </div>
    </el-scrollbar>
    <div class="action">
      <el-button type="danger" size="medium" @click="del">{{$t('storeSetting.删除该组件')}}</el-button>
      <el-button type="primary" size="medium" @click="save">{{$t('storeSetting.完成')}}</el-button>
    </div>
    <div v-if="isShowMax" class="max-editor">
      <quill-editor
        ref="goodsEditorMax"
        class="rich-editor-max"
        v-model="setting.description"
        :options="editorOption"
        @ready="onEditorReady('max')"
      >
      </quill-editor>
    </div>
  </div>
</template>

<script>
import hljs from 'highlight.js';
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { Quill, quillEditor } from "vue-quill-editor";
import { eeSourceBtn } from '@/components/quill.eeSourceBtn.js';
Quill.register('modules/eeSourceBtn', eeSourceBtn);
//demo
import demoHeader from '@/views/storeDesign/components/header'
import demoBody from '@/views/storeDesign/components/body'
import demoFooter from '@/views/storeDesign/components/footer'

export default {
  data(){
    return {
      isSave: false,
      editLoading: false,
      headerMenu: [],
      setting: {
        cid: '',
        type: 'richText',
        title: '',
        description: '',
        align: 'center',
        size: 'medium',
        width: 's' 
      },
      optionsSize: [
        {label: 'storeSetting.大', value: 'big'},
        {label: 'storeSetting.中', value: 'medium'},
        {label: 'storeSetting.小', value: 'small'},
      ],
      optionsWidth: [
        {label: 'storeSetting.标准显示', value: 's'},
        {label: 'storeSetting.宽屏显示', value: 'w'},
      ],
      editorOption: { //富文本编辑器配置
        modules: {
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
          // eeSourceBtn: {},
          toolbar:{
            container:  [
              ["bold", "italic", ], // toggled buttons
              ["link", "image", 'max'], // "video", "formula",
            ],
            handlers: {
              'image': () => {
                document.getElementById('uploadEditorImg').click();
              },
              'max': () => {
                this.isShowMax = !this.isShowMax;
              }
            }
          },
        },
        placeholder: "Use this text to share information about your brand with your customers. Describe a product, share announcements, or welcome customers to your store..",
      },
      isShowMax: false,
      exist: false
    }
  },
  components: {
    quillEditor,
    demoHeader,
    demoBody,
    demoFooter,
  },
  mounted(){
    this.$apiCall("api.VendorShop.getShopConfig", {}, r => {
      if (r.ErrorCode == 9999) {
        if(r.Data.Results.length !== 0){
          if(r.Data.Results.header.activeMenu){ //有启用头部菜单
            r.Data.Results.menu.forEach((item) => {
              if (item.id == r.Data.Results.header.activeMenu) {
                this.headerMenu = item
              }
            })
          }
          this.$store.commit('getShopConfig', r.Data.Results)
          this.$store.state.configJson.sort.forEach(e => {
            if(e.cid == this.$route.query.cid){
              this.setting = JSON.parse(JSON.stringify(e));
              this.exist = true
            }
            this.$nextTick(()=>{
              this.$refs.rightBox.wrap.scrollTop = document.getElementById(`row${this.$route.query.cid}`).offsetTop;
            })
          })
          
          if (!this.exist) {
            this.setting = { //富文本
              cid: this.$route.query.cid,
              type: 'richText',
              title: '',
              description: '',
              align: 'center',
              size: 'medium',
              width: 's' 
            }

            this.exist = true
            this.$store.commit("addStoreComponent", this.setting);
          }
        }
      }    
    })
  },
  beforeRouteLeave(to, from, next){
    if(!this.isSave){
      let c = confirm(this.$t('logistics.当前页面还未保存，确定要离开吗?'))
      if(c){
        next()
      }else{
        next(false)
      }
    }else{
      next()
    }
  },
  methods: {
    goBack () {
      this.$router.push({name: 'storeSettingMain'})
    },
    save(){
      this.isSave = true
      if (this.exist) {
        this.$store.commit("setStoreComponent",  this.setting);
      }
      
      this.$apiCall("api.VendorShop.setShopConfig", {
        configJson: JSON.stringify(this.$store.state.configJson)
      },(r) => {
        if (r.ErrorCode == 9999) {
          this.$elementMessage(this.$t('storeSetting.保存成功'), "success");
        } else {
          this.$message({message: r.Message,type: "error"});
        }
      });
    },
    del(){
      this.isSave = true
      this.$store.commit('delComponent', this.setting.cid)
      this.setting = JSON.parse(JSON.stringify(this.$store.state.configJson))
      this.$apiCall("api.VendorShop.setShopConfig", {
        configJson: JSON.stringify(this.$store.state.configJson)
      },(r) => {
        if (r.ErrorCode == 9999) {
          this.$elementMessage('删除成功', "success");
          this.$router.replace({ name: 'storeSettingMain' })
        } else {
          this.$message({message: r.Message,type: "error"});
        }
      });
    },
    onEditorReady(type){
      let i =  document.createElement("i");
      i.classList.add('el-icon-rank');
      document.querySelector(`${type == 'max' ? '.rich-editor-max' : '.rich-editor'} .ql-max`).appendChild(i)
    },
    changeAlign(align){
      this.setting.align = align;
    },
    uploadEditorImgFile($event){ //文本编辑器2图片
      //上传
      if(!$event.target.files[0].size) return;
      this.fileList2($event.target);
      $event.target.value = ""
    },
    fileList2(el){
      let file = el.files[0];
      if(file.size > 1048576){ //不能超过1mb
        this.$message({ message: this.$t('goodsEdit.图片大小不能超过1MB'), type: "error" });
        return;
      }  
      if(file.type.indexOf("image") > -1){ //是图片文件
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          let img = new Image();
          img.src = e.target.result
          img.onload = () => {
            if(img.width > 1200){
              this.$message({ message: '图片宽度不能超过1200px', type: "error" });
            }else{
              this.uploadBase64(e.target.result);
            }
          }
          
        }
      }else{
        this.$message({ message: this.$t('goodsEdit.不能识别此文件'), type: "error" });
        return;
      }
    },
    uploadBase64(base64){
      let imgUrlBase64 = base64.split("base64,").pop();
      let ext = base64.match(/data:image\/(.*);base64,.*/)[1];
      let params = {
        imgUrlBase64,
        ext,
      }
      this.editLoading = true;
      this.$apiCall('api.Comment.uploadImg', params, r => {
        this.editLoading = false;
        if(r.ErrorCode == 9999){
          let url = r.Data.Results.imgUrl;
          // 获取到当前页面的富文本框
          let quill = this.$refs.goodsEditor.quill
          // 获取光标现在所在的位置上
          let length = quill.getSelection().index;
          // quill插入我们刚刚上传成功之后的图片，arr是存在我们服务器上边的地址 
          quill.insertEmbed(length, 'image', url)
          quill.setSelection(length + 1)
        }else{
          this.$message({ message: r.Message, type: "error" });
        }
      })
    }

  } 
}
</script>

<style lang="scss">
.setting-page.single{
  .ql-container.ql-snow{
    min-height: 200px;
  }
}
</style>

<style lang="scss">
.rich-editor-max{
  .ql-max{
    background-color: rgb(198, 226, 255) !important;
    i.el-icon-rank{
      color: #5c6ac4;    
    }
  }
}
.rich-editor, .rich-editor-max{
  display: inline-block;
  width: 100%;
  .ql-toolbar.ql-snow{
    padding: 0 8px;
    .ql-formats{
      margin-right: 5px;
      .ql-max{
        i.el-icon-rank{
          font-size: 18px;
          transform: rotate(45deg);
        }
      }
    }
  }
  .ql-container.ql-snow{
    .ql-tooltip::before{
      content: "URL:" !important;
    }
    .ql-tooltip{
      left: 6px !important;
      padding: 5px;
      min-width: 200px;
      height: 70px;
      .ql-preview{
        position: relative;
        top: 7px;
      }
      .ql-action{
        position: absolute;
        right: 60px;
        top: 40px;
      }
      .ql-remove{
        position: absolute;
        top: 40px;
        right: 5px;
      }
    }
    .ql-tooltip[data-mode=link]{
      .ql-action{
        position: absolute;
        right: 10px;
        top: 40px;
      }
    }
    .ql-tooltip[data-mode=link]::before{
      content: "Link:" !important;
    }
  }
}
</style>

<style lang="scss" scoped>
// 侧边栏宽度
$leftW: 300px; 

.setting-page{
  > .left{
    width: $leftW;
    .el-button.active{
      background-color: rgb(236, 245, 255);
      border-color: #5c6ac4;
      color: #5c6ac4;
      z-index: 1;
    }
    
  }
  > .right{
    padding-left: $leftW;
  }
  > .action{
    width: $leftW;
    
  } 
}
.max-editor{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  background-color: #fff;
}
</style>