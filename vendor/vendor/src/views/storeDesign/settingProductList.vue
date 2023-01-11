<template>
  <div class="setting-page">
    <el-scrollbar class="left">
      <!-- 左边操作栏 -->
      <div class="content" v-if="setting">
        <h1>
          <el-link icon="el-icon-arrow-left" :underline="false" @click="goBack">{{$t('storeSetting.商品信息')}}</el-link>
        </h1>
        <div class="change-box">
          <div class="add-product">
             <div class="d-flex" style="justify-content: space-between;">
              <span>{{$t('storeSetting.选择商品类目')}}</span> 
              <span class="manage" @click="goToCategory">{{$t('storeSetting.管理商品类目')}}</span>
              </div>
              <!-- 选择商品 -->
             <div class="select-product" @click="openSelect" v-if="setting && !setting.isOpen">
                <i class="el-icon-plus"></i>
                <div>{{$t('storeSetting.选择商品分类')}}</div>
             </div>
             <!-- 选择商品后 -->
             <div class="change-product" v-else>
               <div class="category-name">
                 <img :src="setting.categoryItem.themeUrl" class="default"
                    v-if="setting && setting.categoryItem && setting.categoryItem.themeUrl">
                 <div class="default" v-else></div>
                 <div v-if="setting && setting.categoryItem" class=" tx-ellipsis1">{{setting.categoryItem.name}}</div>
               </div>
               <div class="action-but">
                 <div @click="openSelect">{{$t('storeSetting.更换')}}</div>
                 <div @click="deleteCate">{{$t('storeSetting.删除')}}</div>
               </div>
             </div>

          </div>
          <div style="margin:30px 0">
              <div class="title">{{$t('storeSetting.标题')}}</div>
              <el-input v-model="setting.listTitle"></el-input>
          </div>
          <div>
              <div class="title">{{$t('storeSetting.展示排数')}}</div>
              <el-slider :min="Number(1)" :max="Number(4)" v-model="setting.rowNum"></el-slider>
          </div>
          <div>
              <div class="title">{{$t('storeSetting.每排展示个数')}}</div>
              <el-slider :min="Number(1)" :max="Number(6)" v-model="setting.colNum"></el-slider>
          </div>
          <!-- 对齐方式 -->
          <div>
            <div>{{$t('storeSetting.文本对齐')}}</div>
            <div class="d-flex">
              <div v-for="item in aligns" :key="item.id" 
              class="align-text" :class="{active:num == item.id}"
              @click="changeAlign(item)">
                <i :class="item.icon"></i>
              </div>
            </div>
          </div>
          <!-- more按钮文案 -->
          <div style="margin:30px 0">
              <div class="title">{{$t('storeSetting.更多按钮文案')}}</div>
              <el-input v-model="setting.moreText"></el-input>
          </div>
          <!-- 隐藏价格 -->
          <div class="change-seach">
              <span class="title">{{$t('storeSetting.显示商品价格')}}</span>
              <el-switch v-model="setting.displayPrice"></el-switch>
          </div>
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
    <el-dialog
      :title="$t('storeSetting.商品分类')"
      width="300px"
      :visible.sync="addCategoryVisible">
      <div class="dialog-area">
        <div class="search">
          <el-input @input="searchCategory" v-model="keyword" size="mini" suffix-icon="el-icon-search"></el-input>
        </div>
        <el-scrollbar>
          <div v-if="displayItems.length > 0" class="item-area">
            <template v-for="(item, index) in displayItems">
              <div :key="index">
                <div class="item-list">
                  <div class="left">
                    <el-image fit="contain" class="image" :src="item.themeUrl"></el-image>
                    <div class="name">{{ item.name }}</div>
                  </div>
                  <div>
                    <el-radio  v-model="selectedItem" :label="item"><div style="display:none">1</div></el-radio >
                  </div>
                </div>
                <el-divider></el-divider>
              </div>
            </template>
            <div style="height: 20px;"></div> 
          </div>
        </el-scrollbar>
        <div v-if="displayItems.length == 0" class="no-category">
          {{$t('storeSetting.暂无类目')}} <router-link to="/category-mgr">{{$t('storeSetting.前去添加')}}</router-link>
        </div>
        <div class="control">
          <router-link class="mg-r-20" to="/category-mgr">{{$t('storeSetting.管理商品类目')}}</router-link>
          <i class="refresh mg-r-20 el-icon-refresh" @click="getCategory"></i>
          <el-button size="small" type="primary" @click="addCategoryHandle">{{$t('storeSetting.添加')}}</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import demoHeader from '@/views/storeDesign/components/header'
import demoBody from '@/views/storeDesign/components/body'
import demoFooter from '@/views/storeDesign/components/footer'
export default {
  data(){
    return {
      selectedItem: {},
      categoryItem: {},
      headerMenu: [],
      keyword: '',
      addCategoryVisible:false,
      displayItems: [],
      dialogProductList:{
        isShow: false,
        item: null,
      },
      num:1,
      aligns:[
        {value:'left',label:'居左',id:1,icon:'iconfont icon-duiqifangshi_zuo'},
        {value:'center',label:'居中',id:3,icon:'iconfont icon-duiqifangshi_zhong'},
        {value:'right',label:'居右',id:2,icon:'iconfont icon-duiqifangshi_you'}
      ],
      isSave: false,
      exist: false,
      setting: { //富文本
        cid: this.$route.query.cid,
        type:'hotProduct',
        productItems:[],
        isOpen:false,
        listTitle:'',
        moreText:'',
        displayPrice:true,
        rowNum:3,
        colNum:3,
        textAlign:'left',
        categoryItem:{},
      },
    }
  },
  components: {
    demoHeader,
    demoBody,
    demoFooter
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
  created(){
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
              this.aligns.forEach(e=>{if(e.value==this.setting.textAlign){this.num=e.id}})
              this.selectedItem = this.setting.categoryItem;
              this.addCategoryHandle();
              this.exist = true
              this.$nextTick(()=>{
                this.$refs.rightBox.wrap.scrollTop = document.getElementById(`row${e.cid}`).offsetTop;
              })
          
            }
          })
          if (!this.exist) {
            this.setting = { //富文本
              cid: this.$route.query.cid,
              type:'hotProduct',
              productItems:[],
              isOpen:false,
              listTitle:'',
              moreText:'',
              displayPrice:true,
              rowNum:3,
              colNum:3,
              textAlign:'left',
              categoryItem:{},
            }
            this.exist = true
            this.$store.commit("addStoreComponent", this.setting);
          }
        }
      }    
    })      
  },
  methods: {
    goBack () {
      this.$router.push({name: 'storeSettingMain'})
    },
    deleteCate(){
       this.setting.categoryItem = this.selectedItem = this.categoryItem = {};
       this.setting.productItems = [];
       this.setting.isOpen = false; 
    },
    searchCategory (val) {
      let arr = []
      this.items.forEach((item) => {
        if (item.name.indexOf(val) > -1) {
          arr.push(item)
        }
      })
      this.displayItems = arr
      console.log(this.displayItems)
    },
    addCategoryHandle () {
      this.$apiCall('api.VendorShop.vendorFindProducts',{
        categoryId:this.selectedItem.id,
        status:1,
        page:1,
        rowsPerPage: 16,
      },r=>{
        if(r.ErrorCode == 9999){
          let Arr = [];
          this.setting.productItems = r.Data.Results.products;
          this.setting.productItems.forEach(e=>{
             if(e.status == 1){
               Arr.push(e)
             }
          });
          this.setting.productItems = Arr; 
		      this.setting.categoryItem = this.selectedItem;
          this.addCategoryVisible = false;
          // this.categoryItem = this.selectedItem;
          this.keyword = '',
          this.setting.isOpen = true;
        }else{
          this.$message({ message: r.Message, type: "error" });
        }
      })
    },
		getCategory () {
			this.$apiCall('api.ProductCategory.findByUser', {
				level: 1
			}, (r) => {
				if (r.ErrorCode == 9999) {
					this.items = r.Data.Results
          this.displayItems = r.Data.Results
				}
			})
		},
    addCategory () {
      this.addCategoryVisible = true
    },
    changeAlign(i){
      this.num = i.id;  
      this.setting.textAlign = i.value 
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
          this.$elementMessage('保存成功', "success");
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
    openSelect(){
      this.getCategory();
      this.addCategoryVisible = true;
    },
    goToCategory(){
      this.$router.push("/category-mgr")
    }
   
  },
}
</script>

<style lang="scss">
.setting-page{
  .el-color-picker__trigger{
    border-color: #C0C4CC;
  }
}
</style>

<style lang="scss" scoped>
// 侧边栏宽度
$leftW: 300px; 

.reverse{
  flex-flow: row-reverse
}
.setting-page{
  > .left{
    width: $leftW;
    .content{
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
      .change-box{
        width: 100%;
        background: #fff;
        padding: 22px 14px 40px;
        .title{
          margin-bottom: 5px;
        }
        .change-seach{
          display: flex;
          justify-content: space-between;
          margin: 30px 0;
        }
        .select-product{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          width: 100%;
          height: 118px;
          margin-top: 14px;
          background: #F7F8FB;
          border-radius: 2px;
          border: 1px dashed #0091FF;
          i{
            color: #0091FF;
          }
        }
        .change-product{
          margin-top: 14px;
          width: 100%;
          height: 125px;
          background: #F7F8FB;
          border-radius: 2px;
          padding: 17px 10px 8px;
          .category-name{
              display: flex;
              align-items: center;
             .default{
                margin-right: 10px;
                width: 50px;
                height: 50px;
                background: #EAEAEA;
                border-radius: 2px;
             }
          }
          .action-but{
               margin-top: 13px;
               display: flex;
               justify-content: space-between;
               div{
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  cursor: pointer;
                  width: 110px;
                  height: 36px;
                  background: #FFFFFF;
                  border-radius: 4px;
                  border: 1px solid #B8BECC;
                  color: #484F5E;
               }
             }
        }
      }
      
    }
  }
  .align-text{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: #fff;
    border-radius: 2px;
    border: 1px solid #D7DBE7;
    color:#484F5E;
    margin: 10px 10px 0 0;
    i{
      font-size: 26px;
    }
  }
  .align-text.active{
    background: #EFF7FF;
    border: 1px solid #346DFF;
    color: #346DFF;
  }
  .manage{
    font-size: 12px;
    cursor: pointer;
    color: #0091FF;
  }
  
  > .right{
    padding-left: $leftW;
  }
  > .action{
    width: $leftW;
  }  
}
.dialog-area {
    .search {
      padding: 0 20px;
    }
    .item-area {
      height: 300px;
      margin-top: 10px;
    }
    .item-list {
      padding: 5px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        justify-content: left;
        align-items: center;
        .image {
          width: 40px;
          height: 40px;
        }
        .name {
          margin-left: 10px;
          width: 130px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .no-category {
      text-align: center;
      padding: 40px 0;
    }
    .control {
      padding: 10px 20px 0 0;
      text-align: right;
      .refresh {
        cursor: pointer;
        color: #5c6ac4;
        font-size: 16px;
      }
    }
  }
</style>