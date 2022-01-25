<template>
  <div class="setting-page" v-loading="loading">
    <el-scrollbar class="left">
      <!-- 左边操作栏 -->
      <div class="content">
        <h1 v-if="type == 1">商品详情</h1>
        <a v-else-if="type == 2"  href="javascript:;" class="back"  @click="type = 1">
          <h1>
            <i class="el-icon-arrow-left"></i> 商品详情
          </h1>  
        </a>
        <template v-if="type == 1">
          <div  class="modal-content list-component mg-b-20" @click="routerChange('header')">
            <div class="content-box">
              <i class="iconfont icon-draggable" style="opacity: 0;"></i>
              <i class="fa fa-header logo" aria-hidden="true"></i> 
              <div class="title">{{$t('storeSetting.页头')}}</div>
            </div>
          </div>
          <div  class="modal-content list-component mg-b-20" @click="type = 2">
            <div class="content-box">
              <i class="iconfont icon-draggable" style="opacity: 0;"></i>
              <i class="fa fa-product-hunt logo" aria-hidden="true"></i> 
              <div class="title">{{$t('storeSetting.商品详情页')}}</div>
            </div>
          </div>  
          <div  class="modal-content list-component mg-b-20" @click="routerChange('footer')">
            <div class="content-box">
              <i class="iconfont icon-draggable" style="opacity: 0;"></i>
              <i class="iconfont icon-footer logo" aria-hidden="true"></i> 
              <div class="title">{{$t('storeSetting.页脚')}}</div>
            </div>
          </div>
        </template>
        <template v-else-if="type == 2">
          <el-card class=" mg-b-20">
            <div class="title">商品图样式</div>
            <div>
              <el-select v-model="detailPage.imgSize">
                <el-option v-for="opt in options" :key="opt.value"
                  :label="$t(opt.label)"
                  :value="opt.value"
                ></el-option>
              </el-select>
            </div>
          </el-card>
          <el-card>
            <div class="tags-ipt-wrap">
              <div class="title">详情页标签文案 <span v-if="detailPage.tags && detailPage.tags.length > 5" class="sub">(最多6个)</span></div>
              <div class="ipt-wrap">
                <vue-tags-input v-model="tagIpt" :tags="detailPage.tags"
                  @tags-changed="tagsChange"
                />
                <el-link type="primary" :underline="false" @click="isShowExample = !isShowExample;">
                  <i class="el-icon-plus"></i>
                </el-link>
              </div>
              <div v-show="isShowExample" class="example-wrap">
                <ul>
                  <li v-for="e in exampleList" :key="e">
                    <el-link @click="addTag(e)">{{e}}</el-link>
                  </li>
                </ul>
              </div>
            </div>
          </el-card>
        </template>
      </div>  
    </el-scrollbar>
    <el-scrollbar class="right" ref="rightBox">
      <!-- 右边操作栏 -->
      <div class="content">
        <demoHeader :data="$store.state.configJson.header" :headerMenu="$store.state.configJson.menu"/>
        <demoDetail :data="detailPage"/>
        <demoFooter :setting="$store.state.configJson.footer" />
      </div>
    </el-scrollbar>  
    <div class="action">
      <el-button type="primary" size="medium" @click="save">{{$t('storeSetting.完成')}}</el-button>
    </div>
  </div>
</template>

<script>
//demo
import demoHeader from '@/views/storeDesign/components/header'
import demoFooter from '@/views/storeDesign/components/footer'
import demoDetail from '@/views/storeDesign/components/detail'
import VueTagsInput from '@johmun/vue-tags-input'; //tags
export default {
  data(){
    return {
      loading: false,
      type: 1,
      isSave: false,
      options: [
        {label: 'storeSetting.平铺', value: 'Tile'},
        {label: 'storeSetting.缩略图', value: 'Thumbnail'},
      ],
      tagIpt: '',
      detailPage: {
        imgSize: 'Thumbnail',
        tags: [],
      },
      isShowExample: false,
      exampleList: ['Trade safety', 'Quality Assurance', 'Convenience', 'Popular', 'Best Seller', 'Acclaimed', 'Shopify sells goods', 'Best-selling item', 'preferential', 'Most purchases', 'Infinite repo', 'Most profitable'],
    }
  },
  components: {
    demoHeader,
    demoFooter,
    demoDetail,
    VueTagsInput,
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
          //详情页初始值
          if(r.Data.Results.detailPage)
            this.detailPage = JSON.parse(JSON.stringify(r.Data.Results.detailPage));
          this.$store.commit('getShopConfig', r.Data.Results);
          
        }
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
    save(){
      this.isSave = true;
      this.$store.commit('setDetailPage', this.detailPage)
      this.loading = true;
      this.$apiCall("api.VendorShop.setShopConfig", {
        configJson: JSON.stringify(this.$store.state.configJson)
      }, r => {
        this.loading = false;
        if (r.ErrorCode == 9999) {
          this.$elementMessage(this.$t('storeSetting.保存成功'), "success");
        } else {
          this.$message({message: r.Message,type: "error"});
        }
      })

    },
    tagsChange(newTags){
      newTags = newTags.slice(0, 6)
      this.detailPage.tags = newTags.map(e => e)
    },
    addTag(tag){
      this.isShowExample = false;
      if(this.detailPage.tags && this.detailPage.tags.length > 5){
        return;
      }
	  if(!(this.detailPage.tags && this.detailPage.tags.length)){
		this.detailPage.tags = [];
	  }
	  console.log(this.detailPage.tags)
      this.detailPage.tags.push({
        text: tag,
        tiClasses: ['ti-valid'],
      })
      this.detailPage.tags = [...new Set(this.detailPage.tags)];
      //去重
      let hash = {};
      this.detailPage.tags = this.detailPage.tags.reduce((item, next) => {
        hash[next.text] ? "" : (hash[next.text] = true && item.push(next));
        return item;
      }, []);
    },
    routerChange (val, config) {
      let query = {}
      if (config) { 
        query.cid = config.cid
       } else {
         query.cid = new Date().getTime()
       }
			switch (val) {
				case 'header':
          this.$router.push({ path: '/store-setting/header'})
					break;
				case 'footer':
          this.$router.push({ path: '/store-setting/footer'})
					break;
				case 'richText':
          this.$router.push({ path: '/store-setting/richEditor', query: query})
					break;
				case 'slider':
          this.$router.push({ path: '/store-setting/slider', query: query})
					break;
				case 'singleImg':
          this.$router.push({ path: '/store-setting/singleImg', query: query})
					break;
				case 'singleProduct':
          this.$router.push({ path: '/store-setting/productOne', query: query})
					break;
				case 'hotProduct':
          this.$router.push({ path: '/store-setting/productList', query: query})
					break;
				case 'productCategory':
          this.$router.push({ path: '/store-setting/productCategory', query: query})
					break;
				default: 
					break;
			}
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
      .back{
        display: block;
        margin-bottom: 10px;
        text-decoration: none;
        color: #606266;
      }
      .back:hover{
        text-decoration: underline;
      }
      .tags-ipt-wrap{
        .title{
          margin-bottom: 10px;
          .sub{
            padding-left: 20px;
            color: #909399;
            font-size: 12px;
          }
        }
        .ipt-wrap{
          display: flex;
          .vue-tags-input{
            margin-right: 5px;
            flex: 1;
          }
          .el-link{
            height: 32px;
            /deep/ .el-icon-plus{
               font-size: 18px;
            }
          }
        }
        .example-wrap{
          ul{
            display: flex;
            flex-wrap: wrap;
            margin: 0;
            padding: 15px;
            li{
              margin-right: 20px;
              .el-link{
                cursor: copy;
                font-size: 12px;
              }
            }
          }
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
.setting-page /deep/ .ti-tag{
  background-color: #f4f4f5;
  border: 1px solid #E4E7ED;
  color: #909399;
  .ti-actions{
    position: relative;
    left: 2px;
    color: #fff;
    background-color: #C0C4CC;
    border-radius: 50%;
  }
  .ti-actions:hover{
    color: #fff;
    background-color: #909399;
  }
}

.modal-content {
  overflow: hidden;
  .content-box{
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px 0 10px 50px;
    font-size: 16px;
    background-color: #fff;
    color: #aaa;
    border-bottom: 1px solid #eef1f7;
    &:hover {
      color: #303133;
    }
    &:hover .delete-icon {
      display: block;
    }
    .logo {
      margin-left: 10px;
      color: #303133;
      font-size: 14px;
      padding: 5px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
    .el-dropdown-link {
      font-size: 16px;
      color: #303133;
      display: flex;
      align-items: center;
    }
    div.title {
      color: #303133;
      font-size: 14px;
      margin-left: 15px;
    }
  }
  .delete-icon {
    position: absolute;
    display: none;
    right: 10px;
    top: 0;
    bottom: 0;
    height: 20px;
    margin: auto;
    padding: 3px;
    font-size: 14px;
    cursor: pointer;
    color: red;
    &:hover {
      background: #eee;
    }
  }
}
</style>