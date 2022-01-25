<template>
  <div class="setting-page">
    <el-scrollbar class="left">
      <!-- 左边操作栏 -->
      <div class="content">
        <h1>
          <el-link icon="el-icon-arrow-left" :underline="false" @click="goBack">{{$t('storeSetting.轮播图')}}</el-link>
        </h1>
        <div class="images-box">
          <h2>{{$t('storeSetting.轮播图片')}} {{setting.images.length}} / 6</h2>
          <el-card v-loading="uploadLoading" shadow="hover" class="slider-img-card" :body-style="{padding: '0'}">
            <ul class="slider-img-list">
              <draggable v-model="setting.images" handle=".icon-draggable">
                <li v-for="(slider, index) in setting.images" :key="slider.id" class="slider-img-item">
                  <div class="left">
                    <i class="iconfont icon-draggable"></i>
                    <div class="img-wrap" :style="{backgroundImage: `url(${slider.src})`}"></div>
                    <div class="index">({{index + 1}})</div>
                  </div>
                  <el-link icon="el-icon-delete" :underline="false" type="danger" @click="delSliderItem(index)"></el-link>
                </li>
              </draggable>
            </ul>
            <el-link :underline="false" :disabled="setting.images.length > 5" class="add-img" @click="openUploadImg">
              <i class="el-icon-circle-plus"></i> {{$t('storeSetting.添加图片')}}
            </el-link>
            <input type="file" id="uploadSliderImg" style="display: none;" accept="image/jpeg, image/png, image/gif, image/webp" @change="Base64($event)">
          </el-card>
          <p style="padding: 0 5px; color: #909399; font-size: 12px;">建议尺寸 1920px * 720px</p>
        </div>
        <div class="setting-box">
          <h2>{{$t('storeSetting.设置')}}</h2>
          <el-card shadow="hover">
            <div class=" mg-b-15">
              <el-select size="small" v-model="setting.size">
                <el-option v-for="size in sizeArr" :key="size.value"
                  :label="$t(size.label)"
                  :value="size.value"
                >
                </el-option>
              </el-select>
            </div>
            <el-row>
              <el-col :span="8">{{$t('storeSetting.自动轮播')}}</el-col>
              <el-col :span="16" class=" tx-right">
                <el-switch v-model="setting.auto">
                </el-switch>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </div>
    </el-scrollbar>
    <el-scrollbar class="right" ref="rightBox">
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
  </div>
</template>

<script>
import draggable from 'vuedraggable' //拖拽
//demo
import demoHeader from '@/views/storeDesign/components/header'
import demoBody from '@/views/storeDesign/components/body'
import demoFooter from '@/views/storeDesign/components/footer'

//slider 默认图
import demosliderImg from '@/assets/images/store-design/slider.jpg'
export default {
  data(){
    return {
      isSave: false,
      uploadLoading: false,
			headerMenu: [],
      exist: false,
      setting: {
        cid: '',
        type: 'slider',
        images: [
        ],
        size: '1',
        auto: true,
      },
      sizeArr: this.$dict.storeSliderSizeArr,
    }
  },
  components: {
    draggable,
    demoHeader,
    demoBody,
    demoFooter,
  },
  created(){
    this.$apiCall("api.VendorShop.getShopConfig", {
    },(r) => {
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
              this.exist = true
              this.setting = JSON.parse(JSON.stringify(e));
            }
            this.$nextTick(()=>{
              this.$refs.rightBox.wrap.scrollTop = document.getElementById(`row${this.$route.query.cid}`).offsetTop;
            })
          })
          if (!this.exist) {
            this.setting = {
              cid: this.$route.query.cid,
              type: 'slider',
              images: [
              ],
              size: '1',
              auto: true,
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
    save(){
      this.isSave = true
      if (this.exist) {
        this.$store.commit("setStoreComponent",  this.setting);
      } else {
        this.$store.commit("addStoreComponent", this.setting);
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
    delSliderItem(index){
      this.setting.images.splice(index, 1)
    },
    uploadImgBase64(base64, ext){
      //上传base64
      this.uploadLoading = true;
      this.$apiCall('api.Comment.uploadImg', { imgUrlBase64: base64, ext}, r => {
        document.getElementById('uploadSliderImg').value = '';
        if(r.ErrorCode == 9999){
          let img = new Image();
          img.src = r.Data.Results.imgUrl;
          img.onload = ()=>{
            this.uploadLoading = false;
            this.setting.images.push({
              id: new Date().getTime(),
              src: r.Data.Results.imgUrl,
              width: img.width,
              height: img.height,
              })
          }
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
      document.getElementById('uploadSliderImg').click();
    },
  },
  
}
</script>

<style lang="scss" scoped>
// 侧边栏宽度
$leftW: 300px; 

.setting-page{
  > .left{
    width: $leftW;
    .content{
      .images-box{
        margin-bottom: 15px;
        h2{
          margin-bottom: 5px;
          line-height: 22px;
        }
        .slider-img-card{
          .slider-img-list{
            margin: 0;
            padding: 0;
            .slider-img-item{
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-bottom: 1px solid #DCDFE6;
              padding: 5px 15px;
              cursor: pointer;
              .left{
                display: flex;
                align-items: center;
                > i{
                  margin-right: 15px;
                  color: #C0C4CC;
                }
                > .img-wrap{
                  margin-right: 10px;
                  width: 36px;
                  height: 36px;
                  background-color: #fff;
                  background-size: cover;
                  background-position: center;
                  background-repeat: no-repeat;
                  border: 1px #DCDFE6 solid;
                  border-radius: 4px;
                }
              }
              .el-link{
                display: none;
              }
              
            }
            .slider-img-item:hover{
              background-color: #F2F6FC;
              .left{
                > i{
                  color: #606266;
                }
              }
              .el-link{
                display: inline-flex;
              }
              
            }
            .sortable-ghost{
              opacity: 0.2;
            }
          }
        }
        .add-img{
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          text-decoration: none;
          color: #5c6ac4;
          > i {
            margin-right: 5px;
          }
        }
      }
      .setting-box{
        margin-bottom: 15px;
        h2{
          margin-bottom: 5px;
          line-height: 22px;
        }
      }
    }
  }
  > .right{
    padding-left: $leftW;
  }
  > .action{
    width: $leftW;
  } 
}
</style>