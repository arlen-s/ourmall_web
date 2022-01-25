<template>
  <div class="setting-page">
    <el-scrollbar class="left">
      <div class="content">
        <h1>
          <el-link icon="el-icon-arrow-left" :underline="false" @click="goBack">{{$t('storeSetting.单图')}}</el-link>
        </h1>
        <el-card :body-style="{padding: '20px 10px'}">
          <div v-loading="imgLoading" class="img-box">
            <div class="title">
              <h2>{{$t('storeSetting.图片')}}</h2>
              <p class="msg">({{$t('storeSetting.建议尺寸990px * 742px')}})</p>
            </div>
            <a v-if="!setting.img" class="upload-box" href="javascript:;" @click="openUploadImg">
              <i class="el-icon-circle-plus"></i>{{$t('storeSetting.添加图片')}}
            </a>
            <div v-else class="has-img">
              <div class="img-wrap" :style="{backgroundImage: `url(${setting.img})`}"></div>
              <div class="action">
                <el-link type="primary" @click="openUploadImg">{{$t('storeSetting.更改')}}</el-link>
                <el-link type="danger" @click="delImg">{{$t('storeSetting.删除')}}</el-link>
              </div>
            </div>
            <input type="file" id="uploadImgSing" style="display: none;" accept="image/jpeg, image/png, image/gif, image/webp" @change="Base64($event)">
          </div>
          <el-form>
            <el-form-item :label="$t('storeSetting.跳转链接')">
              <el-select size="small" v-model="setting.link">
                <el-option 
                  v-for="nav in optLinkArr"
                  :key="nav.value"
                  :label="$t(nav.label)"
                  :value="nav"
                >
                </el-option>
              </el-select>
            </el-form-item> 
            <el-form-item :label="$t('storeSetting.图片高度')">
              <el-select size="small" v-model="setting.height">
                <el-option v-for="opt in optImgSize" 
                  :key="opt.value"
                  :label="$t(opt.label)"
                  :value="opt.value"
                >
                </el-option>
              </el-select>
            </el-form-item> 
            <el-form-item :label="$t('storeSetting.标题')">
              <el-input v-model="setting.title" ></el-input>
            </el-form-item> 
            <el-form-item :label="$t('storeSetting.副标题')">
              <el-input type="textarea" :rows="2" v-model="setting.subTitle" ></el-input>
            </el-form-item> 
            <el-form-item :label="$t('storeSetting.文字大小')">
              <el-select size="small" v-model="setting.size">
                <el-option v-for="opt in optFontSize"
                  :key="opt.value"
                  :label="$t(opt.label)"
                  :value="opt.value"
                >
                </el-option>
              </el-select>
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
            <el-form-item :label="$t('storeSetting.文本颜色')">
              <el-color-picker  class="color-p"  v-model="setting.color" size="mini" ></el-color-picker>
            </el-form-item> 
            <el-form-item :label="$t('storeSetting.按钮文案')">
              <el-input v-model="setting.btnText"></el-input>
            </el-form-item> 
            <el-form-item :label="$t('storeSetting.按钮背景颜色')">
              <el-color-picker class="color-p" v-model="setting.btnBackground" size="mini"></el-color-picker>
            </el-form-item> 
            <el-form-item :label="$t('storeSetting.按钮文字颜色')">
              <!-- :popper-class="'hide-btn'" @active-change="$changeTextColor"  负优化-->
              <el-color-picker class="color-p" v-model="setting.btnColor" size="mini"></el-color-picker>
            </el-form-item>  
          </el-form>
        </el-card>
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
//demo
import demoHeader from '@/views/storeDesign/components/header'
import demoBody from '@/views/storeDesign/components/body'
import singleImgDemo from '@/assets/images/store-design/single-img-demo.png'
import demoFooter from '@/views/storeDesign/components/footer'
export default {
  data(){
    return {
      isSave: false,
      exist: false,
      imgLoading: false,
      headerMenu: [],
      setting: {
        cid: this.$route.query.cid,
        type: 'singleImg',
        img: '',
        link: 'Products',
        height: 371,
        title: ' ',
        subTitle: '',
        size: 14,
        align: 'center',
        color: '#606266',
        btnText: '',
        btnColor: '#C0C4CC',
        btnBackground: '#303133',
      },
      optLinkArr: [
		  {label: 'storeSetting.Home', value: 'home', url: 'home'},
		  {label: 'storeSetting.Products', value: 'products', url: 'productsMarketHome'},
        // {label: 'Home', value: 'home'},
        // {label: 'Products', value: 'productsMarketHome'},
        // {label: 'Wait for importlist', value: 'importList'},
      ],
      optImgSize: [
        {label: 'storeSetting.大', value: 446},
        {label: 'storeSetting.中', value: 371},
        {label: 'storeSetting.小', value: 267},
        {label: 'storeSetting.自适应', value: 0},
      ],
      optFontSize: [
        {label: 'storeSetting.大', value: 16,},
        {label: 'storeSetting.中', value: 14,},
        {label: 'storeSetting.小', value: 12,},
      ]
    }
  },
  components: {
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
          })
          this.$nextTick(()=>{
            this.$refs.rightBox.wrap.scrollTop = document.getElementById(`row${this.$route.query.cid}`).offsetTop;
          })
          if (!this.exist) {
            this.setting = {
              cid: this.$route.query.cid,
              type: 'singleImg',
              img: '',
              link: 'Products',
              height: 371,
              title: ' ',
              subTitle: '',
              size: 14,
              align: 'center',
              color: '#606266',
              btnText: '',
              btnColor: '#C0C4CC',
              btnBackground: '#303133',
            }
            this.exist = true
            this.$store.commit("addStoreComponent", this.setting);
          }
        }
      } else {
        this.$message({message: r.Message,type: "error"});
      }
    });
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
    ccc(a){
      console.log(a)
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
    changeAlign(align){
      this.setting.align = align;
    },
    delImg(){
      this.setting.img = '';
    },
    uploadImgBase64(base64, ext){
      //上传base64
      this.imgLoading = true;
      this.$apiCall('api.Comment.uploadImg', { imgUrlBase64: base64, ext}, r => {
        this.imgLoading = false;
        document.getElementById('uploadImgSing').value = '';
        if(r.ErrorCode == 9999){
          this.setting.img = r.Data.Results.imgUrl
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
      document.getElementById('uploadImgSing').click();
    },
    goBack () {
      this.$router.push({name: 'storeSettingMain'})
    },
  }
}
</script>

<style lang="scss" scoped>
// 侧边栏宽度
$leftW: 300px; 
.setting-page{
  > .left{
    width: $leftW;
    .content{
      .img-box{
        margin-bottom: 15px;
        .title{
          h2{
            color: #303133;
          }
          .msg{
            margin-bottom: 5px;
            color: #909399;
            font-size: 12px;
          }
        }
        .upload-box{
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fbfdff;
          border: 1px dashed #c0ccda;
          border-radius: 6px;
          box-sizing: border-box;
          color: #5c6ac4;
          width: 200px;
          height: 48px;
          text-decoration: none;
          cursor: pointer;
          i{
            margin-right: 10px;
          }
        }
        .upload-box:hover{
          border-color: #5c6ac4;
        }
        .has-img{
          .img-wrap{
            margin: 0 auto 5px;
            width: 200px;
            height: 146px;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            border: 1px dashed #c0ccda;
            border-radius: 6px;
            background-color: #fbfdff;
          }
          .action{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20%;
          }
        }
      }
      .el-form-item{
        margin-bottom: 10px;
        .el-button.active{
          background-color: rgb(236, 245, 255);
          border-color: #5c6ac4;
          color: #5c6ac4;
          z-index: 1;
        }
        .color-p{
          position: relative;
          top: 3px;
          left: 25px;
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