<template>
  <div class="setting-page">
    <el-scrollbar class="left">
      <!-- 左边操作栏 -->
      <div class="content" key="1" v-if="!editStatus">
        <h1>{{$t('storeSetting.首页')}}</h1>
        <div v-if="filter == 'home' || filter == 'header'" class="modal-content list-component" @click="routerChange('header')">
          <div class="content-box">
            <i class="iconfont icon-draggable" style="opacity: 0;"></i>
            <i class="fa fa-header logo" aria-hidden="true"></i> 
            <div class="title">{{$t('storeSetting.页头')}}</div>
          </div>
        </div>

        <div class="mg-t-10 list-component">
          <draggable @change="dragChange" v-model="setting.sort" handle=".draggable-i">
          <template v-for="(config, index) in setting.sort">
            <div :key="index" class="draggable-i">
              <div v-if="config.type == 'slider' && filter == 'home'" class="modal-content" @click="routerChange('slider', config)">
                <div class="content-box">
                  <i class="iconfont icon-draggable"></i>
                  <i class="fa fa-picture-o logo" aria-hidden="true"></i> 
                  <div class="title">{{$t('storeSetting.轮播图')}}</div>
                  <i class="el-icon-delete delete-icon" @click.stop="deleteConfig(config)"></i>
                </div>
              </div>
              <div v-if="config.type == 'richText' && filter == 'home'" class="modal-content" @click="routerChange('richText', config)">
                <div class="content-box">
                  <i class="iconfont icon-draggable"></i>
                  <i class="fa fa-font logo" aria-hidden="true"></i> 
                  <div class="title">{{$t('storeSetting.富文本')}}</div>
                  <i class="el-icon-delete delete-icon" @click.stop="deleteConfig(config)"></i>
                </div>
              </div>
              <div v-if="config.type == 'singleImg' && filter == 'home'" class="modal-content" @click="routerChange('singleImg', config)">
                <div class="content-box">
                  <i class="iconfont icon-draggable"></i>
                  <i class="fa fa-file-image-o logo" aria-hidden="true"></i> 
                  <div class="title">{{$t('storeSetting.单图')}}</div>
                  <i class="el-icon-delete delete-icon" @click.stop="deleteConfig(config)"></i>
                </div>
              </div>
              <div v-if="config.type == 'singleProduct' && ( filter == 'home' || filter == 'product' )" class="modal-content" @click="routerChange('singleProduct', config)">
                <div class="content-box">
                  <i class="iconfont icon-draggable"></i>
                  <i class="fa fa-product-hunt logo" aria-hidden="true"></i> 
                  <div class="title">{{$t('storeSetting.单个商品')}}</div>
                  <i class="el-icon-delete delete-icon" @click.stop="deleteConfig(config)"></i>
                </div>
              </div>
              <div v-if="config.type == 'hotProduct' && ( filter == 'home' || filter == 'product' )" class="modal-content" @click="routerChange('hotProduct', config)">
                <div class="content-box">
                  <i class="iconfont icon-draggable"></i>
                  <i class="fa fa-fire logo" aria-hidden="true"></i> 
                  <div class="title">{{$t('storeSetting.热门商品列表')}}</div>
                  <i class="el-icon-delete delete-icon" @click.stop="deleteConfig(config)"></i>
                </div>
              </div>
              <div v-if="config.type == 'productCategory' && ( filter == 'home' || filter == 'product' )" class="modal-content" @click="routerChange('productCategory', config)">
                <div class="content-box">
                  <i class="iconfont icon-draggable"></i>
                  <i class="fa fa-cart-arrow-down logo" aria-hidden="true"></i> 
                  <div class="title">{{$t('storeSetting.商品类目')}}</div>
                  <i class="el-icon-delete delete-icon" @click.stop="deleteConfig(config)"></i>
                </div>
              </div>
            </div>
          </template>
          </draggable>
        </div>
        <div class="modal-content" v-if="filter == 'home' || filter == 'product'">
          <div class="content-box" style="color: #356dff" @click="editComponent">
            <i class="el-icon-plus"></i>
            <div class="title">{{$t('storeSetting.添加组件')}}</div>
          </div>
        </div>

        <div v-if="filter == 'home' || filter == 'header'" class="modal-content list-component mg-t-10" @click="routerChange('footer')">
          <div class="content-box">
            <i class="iconfont icon-draggable" style="opacity: 0;"></i>
            <i class="iconfont icon-footer logo" aria-hidden="true"></i> 
            <div class="title">{{$t('storeSetting.页脚')}}</div>
          </div>
        </div>

      </div>
      <div class="content" key="2" v-if="editStatus">
          <EditList
          @goBack="goBack"
          @routerChange="routerChange"
          :setting="setting" />
      </div>
    </el-scrollbar>
    <el-scrollbar class="right">
      <!-- 右边操作栏 -->
      <div class="content">
        <Main
          :setting="setting"
          :code="code"/>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import Main from '@/views/storeDesign/components/main'
import EditList from '@/views/storeDesign/components/editList.vue'
import draggable from 'vuedraggable' //拖拽

export default {
  props: ['filter'],
  data(){
    return {
      setting: null,
      editStatus: false,
      code: {
        header: [],
        footer: []
      }
    }
  },
  components: {
    Main,
    draggable,
    EditList
  },
  created() {
    this.setting = JSON.parse(JSON.stringify(this.$store.state.configJson));
    this.getConfig()
  },
  methods: {
    dragChange() {
      console.log(1)
      this.$store.commit('getStoreComponent', this.setting)
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
    getConfig () {
      this.$apiCall("api.VendorShop.getShopConfig", {
      },(r) => {
        if (r.ErrorCode == 9999) {
          if (r.Data.Results.header) {
            this.$store.commit('getStoreComponent', r.Data.Results)
            this.setting = r.Data.Results
            this.handleCode(r.Data.Results.customCode)
          } else {
            this.setting = JSON.parse(JSON.stringify(this.$store.state.configJson))
          }
        } else {
          this.$message({message: r.Message,type: "error"});
        }
      });
    },
    handleCode (arr) {
      console.log(arr)
      arr.forEach((item) => {
        if (item.pages.includes('首页')) {
          if (item.position == '底部') {
            this.code.footer.push(item.desc)
          }
          if (item.position == '顶部') {
            this.code.header.push(item.desc)
          }
        }
      })
    },
    deleteConfig (config) {
      this.$store.commit('delComponent', config.cid)
      this.setting = JSON.parse(JSON.stringify(this.$store.state.configJson))
      this.$apiCall("api.VendorShop.setShopConfig", {
        configJson: JSON.stringify(this.$store.state.configJson)
      },(r) => {
        if (r.ErrorCode == 9999) {
          this.$elementMessage('删除成功', "success");
        } else {
          this.$message({message: r.Message,type: "error"});
        }
      });
    },
    goBack (val) {
      this.editStatus = false
      this.$emit('StatusChange', false)
    },
    editComponent () {
      this.editStatus = true
      this.$emit('StatusChange', true)
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

<style lang="scss">
.setting-page{
  .el-dropdown {
    margin-left: 0;
  }
  .el-color-picker__trigger{
    border-color: #C0C4CC;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form-item__label {
    line-height: 24px;
  }
  .el-divider--horizontal {
    margin: 10px 0;
  }
}
</style>

<style lang="scss" scoped>
// 侧边栏宽度
$leftW: 300px; 

.setting-page{
  .mt-20 {
    margin-top: 20px;
  }
  .action { 
    width: $leftW;
    box-sizing: border-box;
   }
  > .left{
    width: $leftW;
    .content{
      > h1{
        margin-bottom: 15px;
        color: #303133;
        font-size: 18px;
        font-weight: 600;
      }
      .change-color-box{
        margin-bottom: 20px;
        padding: 0 10px;
        .row-color{
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 160px;
          .title{
            color: #606266;
          }
        }
      }
			.ourmall-display {
        h2{
          margin: 10px 0;
          font-size: 16px;
        }
			}
			.change-width {
        h2{
          margin: 10px 0;
          font-size: 18px;
        }
			}
      .list-component {
        border-radius: 5px;
        overflow: hidden;
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
      .btn-area {
        margin-top: 20px;
        text-align: right;
      }
    }
  }
  > .right{
    padding-left: $leftW;
  }
}
</style>