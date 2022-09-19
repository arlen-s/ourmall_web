<template>
  <div  class="contentpanel edit-menu-page">
    <!-- <div class="pagetitle" ref="pageHeader">

    </div> -->
    <div class="pagebody" v-loading="pageLoading">
      <el-card style="margin-bottom: 80px;">
        <h2 class="edit-title">{{$t('menuSetting.编辑')}}</h2>
        <el-row :gutter="15">
          <el-col :span="24" class="edit-row">
            <span class="tx-danger">*</span>
            <span class="m-label">{{$t('menuSetting.菜单名称:')}}</span>
            <el-input v-model="editItem.name" maxlength="50" show-word-limit style="width: 600px;"></el-input>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="15">
          <template v-if="hasMenuNum">
            <el-col :span="24" class="setting-msg">{{$t('menuSetting.菜单目录结构')}} <span>{{$t('menuSetting.目录名称会展示在店铺网页上。 (改变顺序可拖拽，建议重下往上拖拽)')}}</span></el-col>
            <el-col :span="24" class="tree-wrap">
              <el-tree
                ref="menuTree"
                :data="editItem.menu"
                node-key="id"
                draggable
                default-expand-all
                :expand-on-click-node="false"
                :allow-drop="allowDrop"
              >
                <div class="tree-node" slot-scope="{node, data}">
                  <div v-if="data.id != 'bottom'">
                    <div class="left"> 
                      <i class=" iconfont" 
                        :class="data.children && data.children.length ? 'icon-sub-nav' : 'icon-nav'"
                      >
                      </i>
                      <div class="name" :style="{marginRight: `25px`}">
                        <el-input v-model="data.label" style=" width: 200px;" @blur="eventIpt" @focus="eventIpt"></el-input>
                      </div>
                      <div class=" mg-r-15">
                        <el-select :placeholder="$t('menuSetting.链接页面')" v-model="data.value" @change="changeRouter(data)">
                          <el-option v-for="m in $dict.storeMenuArr" :key="m.value"
                            :label="$t(m.label)"
                            :value="m.value"
                          ></el-option>
                        </el-select>
                      </div>
                      <!-- 商品详情页 -->
                      <div v-if="data.value == 'productDetails'">
                        <template v-if="data.urlData">
                          <div class="product-box">
                            <el-image
                              style="width: 36px; height: 36px; border: 1px #DCDFE6 solid"
                              :src="data.urlData.imgUrl"
                              :fit="'contain'"
                            >
                              <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                              </div>
                            </el-image>
                            <p class="name tx-ellipsis1">
                              {{data.urlData.name}}
                            </p>
                            <el-link type="primary" @click="openSelect(data)">{{$t('menuSetting.更改商品')}}</el-link>
                          </div>
                        </template>
                        <el-link v-else type="primary" @click="openSelect(data)">{{$t('menuSetting.选择商品')}}</el-link>
                      </div>
                      <!-- 商品分类 -->
                      <div v-if="data.value == 'category'">
                        <template v-if="data.urlData">
                          <div class="product-box">
                            <el-image
                              style="width: 36px; height: 36px; border: 1px #DCDFE6 solid"
                              :src="data.urlData.themeUrl"
                              :fit="'contain'"
                            >
                              <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                              </div>
                            </el-image>
                            <p class="name tx-ellipsis1">
                              {{data.urlData.name}}
                            </p>
                            <el-link type="primary" @click="openSelectCategory(data)">{{$t('menuSetting.更改分类')}}</el-link>
                          </div>  
                        </template>
                        <el-link v-else type="primary" @click="openSelectCategory(data)">{{$t('menuSetting.选择分类')}}</el-link>
                      </div>
                      <!-- 自定义页面 -->
                      <div v-if="data.value == 'customPage'">
                        <template v-if="data.urlData">
                          <div class="product-box">
                            <p class="name tx-ellipsis1">
                              {{data.urlData.title}}
                            </p>
                            <el-link type="primary" @click="openSelectCustomPage(data)">{{$t('menuSetting.更改自定义页面')}}</el-link>
                          </div>  
                        </template>
                        <div v-else class=" d-flex">
                          <el-link class=" mg-r-15" type="primary" @click="openSelectCustomPage(data)">{{$t('menuSetting.选择自定义页面')}}</el-link>
                        </div>
                      </div>
                      <!-- 自定义URL -->
                      <div v-if="data.value == '9998'" class="c-url">
                        <template v-if="data.url">
                          <a class=" tx-ellipsis1" style=" margin-right: 15px; max-width: 280px;" :href="data.url" target="_blank">{{data.url}}</a>
                          <el-link type="primary" @click="openCustomUrl(data)">{{$t('menuSetting.更改')}}</el-link>
                        </template>
                        <el-link type="primary" @click="openCustomUrl(data)">{{$t('menuSetting.添加链接')}}</el-link>
                      </div>
                    </div>
                    <div class="right">
                      <el-link v-if="data.level < 3" type="primary" style=" margin-right: 25px;" @click="addNewNav(data)">
                        <span v-if="data.level == 1">{{$t('menuSetting.添加二级目录')}}</span>
                        <span v-if="data.level == 2">{{$t('menuSetting.添加三级目录')}}</span>
                      </el-link>
                      <el-link type="danger" @click="removeNav(node, data)">{{$t('menuSetting.删除')}}</el-link>
                    </div>
                  </div>
                </div>
              </el-tree>
            </el-col>
          </template>
          <el-col v-else :span="24">
            <div class="none-menu">
              <div class="none"></div>
              <p>{{$t('menuSetting.您还没有添加任何目录')}}</p>
              <div>
                <el-button type="primary" @click="addNewNav()">{{$t('menuSetting.添加菜单目录')}}</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-divider v-if="hasMenuNum" class="mg-t--13"></el-divider>
        <el-row v-if="hasMenuNum" :gutter="15">
          <el-col :span="24">
            <el-link icon="el-icon-plus" type="primary" @click="addNewNav()">{{$t('menuSetting.添加菜单目录')}}</el-link>
          </el-col>
        </el-row>
      </el-card>
      <div v-if="hasMenuNum" class="action-box">
        <el-card>
          <div class="action-content">
            <el-link type="danger" :disabled="editItem.id < 3 || !$isRole($route.meta.roleWrite)" @click="delMenu">{{$t('menuSetting.删除菜单')}}</el-link>
            <el-button type="primary" size="medium" :disabled="!$isRole($route.meta.roleWrite)" @click="save">{{$t('menuSetting.保存')}}</el-button>
          </div>
        </el-card>
      </div>
    </div>  
    <DialogCustomUrl :data="dialogCustomUrlData"/>
    <selectProduct :data="dialogProductList"  @selectedProduct="selectedProduct"/>
    <DialogSelectCategory ref="dialogSelectCategory" :data="dialogSelectCategoryData" @selectedCategory="selectedCategory"/>
    <DialogSelectCustomPage :data="dialogSelectCustomPageData" @selectCustomPage="selectCustomPage"/>
  </div>
</template>

<script>
import DialogCustomUrl from '@/views/MainMenuSettings/DialogCustomUrl'
import selectProduct from '@/components/dialog/DialogSelectProduct.vue';
import DialogSelectCategory from '@/views/MainMenuSettings/DialogSelectCategory'
import DialogSelectCustomPage from '@/views/MainMenuSettings/DialogSelectCustomPage'
export default {
  data(){
    return {
      isSave: false,
      pageLoading: false,
      editItem: {
        id: '',
        name: '',
        menu: [
            // {
            //   id: 11,
            //   label: 'Home',
            //   value: 'home',
            //   url: 'home',
            //   level: 1,
            //   sid: '',
            //   urlData: null,
            //   children: [],
            // },
            // {
            //   id:12,
            //   label: 'products',
            //   value: 'products',
            //   url: 'productsMarketHome',
            //   level: 1,
            //   sid: '',
            //   urlData: null,
            //   children: [
            //     {
            //       id: 111,
            //       label: 'product details',
            //       value: 'productDetails',
            //       url: 'productsDetilHome',
            //       sid: '123',
            //       children: [],
            //       level: 2,
            //       urlData: null,
            //     },
            //     {
            //       id: 112,
            //       label: 'custom page',
            //       value: 'customPage',
            //       url: 'customPage',
            //       sid: '124',
            //       level: 2,
            //       urlData: null,
            //       children: [
            //         {
            //           id: 1121,
            //           label: 'custom page sub',
            //           value: 'customPage',
            //           url: 'customPage',
            //           sid: '125',
            //           level: 3,
            //           urlData: null,
            //         }
            //       ]
            //     }
            //   ]
            // },
            // {
            //   id: 'bottom'
            // }
          ]
      },
      dialogCustomUrlData: {
        isShow: false,
        ipt: '',
        error: false,
        msg: '',
        item: {
          url: '',
        },
      },
      defaultDialogCustomUrlData: '{}',
      dialogProductList:{
      loading: false,
      isShow: false,
      item: null,
      menuData: null,
      },
      defaultDialogProductList: '{}',
      dialogSelectCategoryData: {
        addCategoryVisible: false,
        keyword: '', //搜索kw
        displayItems: [],
        cLoading: false,
        selectedIds: [],
        selectedItems: null,
        items: [],
        menuData: null,
      },
      defaultDialogSelectCategoryData: '{}',
      dialogSelectCustomPageData: {
        isShow: false,
        items: [],
        selected: null,
        menuData: null,
      },
      defaultDialogSelectCustomPageData: '{}',
    }
  },
  components: {
    DialogCustomUrl,
    selectProduct,
    DialogSelectCategory,
    DialogSelectCustomPage,
  },
  computed: {
    hasMenuNum(){
      let num = 0;
      this.editItem.menu.forEach(e => {
        if(e.id != 'bottom'){
          num ++
        }
      })
      return num;
    }
  },
  mounted(){
    this.defaultDialogCustomUrlData = JSON.stringify(this.dialogCustomUrlData)
    this.defaultDialogProductList = JSON.stringify(this.dialogProductList)
    this.defaultDialogSelectCategoryData = JSON.stringify(this.dialogSelectCategoryData)
    this.defaultDialogSelectCustomPageData = JSON.stringify(this.dialogSelectCustomPageData)
    this.getConfig();
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != 'menuEditor') {
      if (!this.isSave) {
        let c = confirm(this.$t('goodsEdit.当前页面还未保存，确定要离开吗?'))
        if (c) {
          next()
        } else {
          next(false)
        }
      } else {
        next()
      }
    } else {
      next();
    }
  },
  methods: {
    save(){
      if(!this.editItem.name){
        this.$message({message: '请输入菜单名称', type: "error"});
        return;
      }
      if(this.editItem.menu.length){
        let error = '';
        this.editItem.menu.some(m => {
          if(m.id != 'bottom'){
            if(!m.label){
              error = '菜单名必须填写;'
            }
            m.children.some(m2 => {
              if(!m2.label){
                error = '菜单名必须填写;'
              }
              m2.children.some(m3 => {
                if(!m3.label){
                  error = '菜单名必须填写;'
                }
                return error
              })
              return error
            })
            return error
            
          }
        })
        if(error){
          this.$message({message: error, type: "error"});
          return 
        }
      }

      let obj = JSON.parse(JSON.stringify(this.editItem))
      obj.menu.forEach((m, index) => {
        if(m.id == 'bottom')
          obj.menu.splice(index, 1)
      })

      let configJson = JSON.parse(JSON.stringify(this.$store.state.configJson))
      if(configJson.menu.findIndex(e => e.id == obj.id) > -1){ //编辑替换
        configJson.menu.splice(configJson.menu.findIndex(e => e.id == obj.id), 1)
      }
      configJson.menu.unshift(obj) //修改编辑后放第一个
      //头尾置顶
      configJson.menu.map( (e, index) => {
        if(e.id == '2'){
          configJson.menu.unshift(configJson.menu.splice(index, 1)[0])
        }
      })
      configJson.menu.map( (e, index) => {
        if(e.id == '1'){
          configJson.menu.unshift(configJson.menu.splice(index, 1)[0])
        }
      })
      this.$apiCall("api.VendorShop.setShopConfig", {configJson: JSON.stringify(configJson)}, r => {
        if (r.ErrorCode == 9999) {
          this.isSave = true;
          this.$elementMessage(this.$t('storeSetting.保存成功'), "success");
          this.$router.push({name: 'menuSetting'})
        }else{
          this.$message({message: r.Message,type: "error"});
        }
      })
    },
    delMenu(){
      this.$confirm(this.$t('menuSetting.是否要删除菜单'),"", {
        confirmButtonText: this.$t('products.删除'),
        cancelButtonText: this.$t('products.取消'),
        confirmButtonClass: "el-button--danger",
      }).then(() => {
        this.$store.commit('delMenu', this.editItem.id)
         this.$apiCall("api.VendorShop.setShopConfig", {configJson: JSON.stringify(this.$store.state.configJson)}, r => {
          if (r.ErrorCode == 9999) {
            this.isSave = true;
            this.$elementMessage(this.$t('shop.删除成功'), "success");
            this.$router.push({name: 'menuSetting'})
          }else{
            this.$message({message: r.Message,type: "error"});
          }
        })
      });
    },
    selectCustomPage(item){
      this.dialogSelectCustomPageData.menuData.urlData = item;
      this.dialogSelectCustomPageData.isShow = false;
    },
    openSelectCustomPage(menu){
      this.dialogSelectCustomPageData = JSON.parse(this.defaultDialogSelectCustomPageData)
      this.dialogSelectCustomPageData.menuData = menu;
      this.dialogSelectCustomPageData.isShow = true;
    },
    selectedCategory(item){
      this.dialogSelectCategoryData.menuData.urlData = item;
      this.dialogSelectCategoryData.addCategoryVisible = false
    },
    openSelectCategory(menu){
      this.dialogSelectCategoryData = JSON.parse(this.defaultDialogSelectCategoryData)
      this.dialogSelectCategoryData.menuData = menu;
      if(menu.urlData){
        this.dialogSelectCategoryData.selectedItems = menu.urlData;
      }
      this.dialogSelectCategoryData.addCategoryVisible = true;
      this.$refs.dialogSelectCategory.getCategory();
    },
    openCustomUrl(data){
      this.dialogCustomUrlData = JSON.parse(this.defaultDialogCustomUrlData)
      this.dialogCustomUrlData.item = data;
      this.dialogCustomUrlData.ipt = data.url;
      this.dialogCustomUrlData.isShow = true;
    },
    removeNav(node, data){ //移除 node
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    addNewNav(item){ //新增 node
      let nav = JSON.parse(JSON.stringify(this.$store.state.navDefault))
      if(item){
        // 2,3 级目录
        nav.id = new Date().getTime();
        nav.level = item.level + 1;
        item.children.push(nav)
      }else{
        //1级目录
        this.editItem.menu.splice(this.editItem.menu.findIndex(e => e.id == 'bottom'), 1)
        nav.id = new Date().getTime();
        nav.level = 1;
        this.editItem.menu.push(nav)
        this.editItem.menu.push({
          id: 'bottom'
        })
      }
    },
    changeRouter(data){
      this.urlSync(data);
      //自定义URL
      if(data.value == '9998'){
        this.openCustomUrl(data)
      }
      //商品详情
      if(data.value == 'productDetails'){
        this.openSelect(data);
      }
      //商品分类
      if(data.value == 'category'){
        this.openSelectCategory(data)
      }
      //自定义页面
      if(data.value == 'customPage'){
        this.openSelectCustomPage(data)
      }

    },
    urlSync(item){ 
      //change URL后 同步url urlData
      this.$dict.storeMenuArr.forEach(e => {
        if(e.value == item.value){
          item.url = e.url
        }
      })
      item.urlData = null;
    },
    allowDrop(dragginNode, dropNode, type){
      if(dragginNode.level === dropNode.level && dropNode.level == 1){
        return type === 'prev' || type === 'text'
      }else{
         if(dragginNode.level === dropNode.level){
           return true;
         }else{
           return false;
         }
      }
    },
    openSelect(menu){
      this.dialogProductList = JSON.parse(this.defaultDialogProductList)
      this.dialogProductList.menuData = menu;
      this.getItems();
      this.dialogProductList.isShow = true;
      
    },
    getItems(){
        this.dialogProductList.loading = true;
        this.$apiCall("api.VendorShop.vendorFindProducts", {
            page: 1,
            rowsPerPage: 10,
        }, r => {
            this.dialogProductList.loading = false;
            if (r.ErrorCode == 9999) {
              this.dialogProductList.item = r.Data.Results.products.map(e => {
              e.imgUrlArr = JSON.parse(e.imgUrlJson);
              e.statusIpt = e.status == '1';
              return e
            });
            }else{
              this.$message({ message: r.Message, type: "error" });
            }
        })
    },
    selectedProduct(item){
      this.dialogProductList.menuData.urlData = item;
    },
    getConfig(){
      this.pageLoading = true;
      this.$apiCall("api.VendorShop.getShopConfig", {}, r => {
        this.pageLoading = false;
				if (r.ErrorCode == 9999) {
					if (r.Data.Results.length !== 0) {
						this.$store.commit('getShopConfig', r.Data.Results)
            if(!r.Data.Results.menu || !r.Data.Results.menu.length){ //没有主菜单使用默认菜单
              this.$store.commit('getDefaultMenu')
            }
            //初始化
            if(this.$route.query.id){
              this.$store.state.configJson.menu.forEach(m => {
                if(m.id == this.$route.query.id){ //编辑
                  this.editItem = JSON.parse(JSON.stringify(m));
                }
              })
              if(!this.editItem.id){ //新增
                this.editItem.id = this.$route.query.id;
              }
              this.editItem.menu.push({
                id: 'bottom'
              })
            }else{
              //没有id 退回列表页面
              this.$message({message: 'error', type: "error"});
              this.isSave = true;
              this.$router.push({name: 'menuSetting'})
            }
					}
				}
			})
    },
    eventIpt(e){
      if(e.type == 'focus'){
        $('.el-tree-node').removeAttr('draggable')
      }
      if(e.type == 'blur'){
        $('.el-tree-node').attr('draggable', 'true')
      }
    },

  }
}
</script>
<style lang="scss">
.edit-menu-page{
  .el-tree-node__content{
    height: auto;
  }
}

</style>
<style lang="scss" scoped>
.pagebody{
  position: relative;
  .action-box{
    position: fixed;
    right: 0;
    bottom: 5px;
    left: 0;
    z-index: 2;
    padding-left: 260px;
    padding-right: 15px;
    .action-content{
      display: flex;
      justify-content: space-between;
      padding: 0 25px;
    }
  }
}
.none-menu{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 0;
  .none{
    margin-bottom: 15px;
    width: 300px;
    height: 270px;
    background-image: url('./../../../public/images/v2/none-menu.png');
  }
  p{
    margin-bottom: 25px;
    color: #4e4e4e;
    line-height: 32px;
    font-size: 28px;
  }
}
.mg-t--13{
  margin-top: -13px;
}
  .edit-title{
    font-size: 16px;
  }
  .edit-row{
    display: flex;
    align-items: center;
    padding: 15px 0 0;
    .m-label{
      margin-right: 15px;
    }
  }
  .setting-msg{
    span{
      margin-left: 15px;
      color: #909399;
      font-size: 12px;
    }
  }
  .tree-node{
    display: flex;
    align-items: center;
    width: 100%;
    > div{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 50px;
      padding: 0 15px;
      .left{
        display: flex;
        align-items: center;
        > i {
          margin-right: 10px;
        }
        .name{
          
        }
        .c-url{
          display: flex;
          align-items: center;
        }
      }
      .right{
        display: flex;
        align-items: center;
      }
    }
    .product-box{
      display: flex;
      align-items: center;
      .el-image{
        margin-right: 10px;
        .image-slot .el-icon-picture-outline{
          margin: 0;
          transform: translate(-50%, -50%);
          color: #C0C4CC;
        }
      }
      p.name{
        margin-right: 15px;
        max-width: 230px;
        font-size: 12px;
      }
        
    }
  }

</style>