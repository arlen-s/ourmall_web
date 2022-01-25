<template>
  <div v-if="setting" class="setting-page">
    <el-scrollbar class="left">
      <!-- 左边操作栏 -->
      <div class="content" v-if="setting">
        <h1>
          <el-link icon="el-icon-arrow-left" :underline="false" @click="goBack">{{$t('storeSetting.商品信息')}}</el-link>
        </h1>
        <div class="change-box">
          <div class="add-product">
             <div>{{$t('storeSetting.添加商品')}}</div>
             <!-- 选择后 -->
             <div class="change-product" v-if="setting.imgUrl">
               <div class="category-name">
                 <img :src="setting.imgUrl" class="default"
                    v-if="setting.imgUrl">
                 <div class="default" v-else></div>
                 <div v-if="setting.name" class="tx-ellipsis1">{{setting.name}}</div>
               </div>
               <div class="action-but">
                 <div @click="openSelect">{{$t('storeSetting.更换')}}</div>
                 <div @click="deleteCate">{{$t('storeSetting.删除')}}</div>
               </div>
             </div>
              <!-- 选择商品 -->
             <div class="select-product" @click="openSelect" v-else>
                <i class="el-icon-plus"></i>
                <div>{{$t('storeSetting.选择商品')}}</div>
             </div>
          </div>
          <div class="change-seach">
              <span class="title">{{$t('storeSetting.显示售价')}}</span>
              <el-switch v-model="setting.displayPrice"></el-switch>
          </div> 
          <div style="margin-bottom:30px">
              <div class="title">{{$t('storeSetting.按钮文案')}}</div>
              <el-input  v-model="setting.buttonText"></el-input>
          </div>
          <div>
              <div class="title">{{$t('storeSetting.图片展示规则')}}</div>
                <el-select v-model="setting.pictureRule" :placeholder="$t('storeSetting.请选择')">
                    <el-option
                    v-for="item in rules"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
          </div>
          <div class="colorChange">
            <div class="title">{{$t('storeSetting.按钮背景颜色')}}</div>
            <el-color-picker class="color-p" v-model="setting.btnBackground" size="mini"></el-color-picker>
          </div> 
          <div class="colorChange">
            <div class="title">{{$t('storeSetting.按钮文字颜色')}}</div>
              <el-color-picker class="color-p" v-model="setting.btnColor" size="mini"></el-color-picker>
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
    <selectProduct :data="dialogProductList"/>
  </div>
</template>

<script>
import selectProduct from '../../components/dialog/DialogSelectProduct.vue';
import demoHeader from '@/views/storeDesign/components/header'
import demoBody from '@/views/storeDesign/components/body'
import demoFooter from '@/views/storeDesign/components/footer'
export default { 
  data(){
    return {
      headerMenu: [],
      dialogProductList:{
        isShow: false,
        item: null,
      },
      rules:[
        {value:'left',label:this.$t('storeSetting.居左')},
        {value:'right',label:this.$t('storeSetting.居右')}
        ],
      isSave: false,
      exist: false,
      setting: { //富文本
        cid: this.$route.query.cid,
        id:'',
        btnBackground:'#303133',
        btnColor:'#C0C4CC',
        type:'singleProduct',
        buttonText:'',//按钮文案
        pictureRule:'left',//图片位置
        displayPrice:true,//是否隐藏图片
        name:'Product title',//默认名称
        cost:'88.88',//默认价格
        imgUrl:''
      },
    }
  },
  components: {
    selectProduct,
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
            this.getItems('s');
            this.exist = true;
            this.$nextTick(()=>{
              this.$refs.rightBox.wrap.scrollTop = document.getElementById(`row${e.cid}`).offsetTop;
            })
        
          }
        })

        if (!this.exist) {
          this.setting = {
            cid: this.$route.query.cid,
            id:'',//商品id
            btnBackground:'#303133',
            btnColor:'#C0C4CC',
            type:'singleProduct',
            buttonText:'',//按钮文案
            pictureRule:'left',//图片位置
            displayPrice:true,//是否隐藏图片
            name:'Product title',//默认名称
            cost:'88.88',//默认价格
            imgUrl:'',//商品图片
          }
          this.exist = true
          this.$store.commit("addStoreComponent", this.setting);
        }

        }
      }    
    })
  },
  methods: {
    deleteCate(){
      this.setting.name='Product title';
      this.setting.cost='88.88';
      this.setting.imgUrl = '';
      this.setting.id = '';
    },
    goBack () {
      this.$router.push({name: 'storeSettingMain'})
    },
    save(){
      this.isSave = true
      if (this.exist) {
        this.$store.commit("setStoreComponent",  this.setting);
      } else {
        this.$store.commit("addStoreComponent", this.setting);
        this.exist = true
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
    openSelect(){
      this.getItems();
      this.dialogProductList.isShow = true;
      
    },
    getItems(s){
        this.loading = true;
        this.$apiCall("api.VendorShop.vendorFindProducts", {
            productId:s?this.setting.id:'',
            page: 1,
            rowsPerPage: 10,
        }, r => {
            this.loading = false;
            if (r.ErrorCode == 9999) {
              let data = r.Data.Results;
			  this.setting.product = data[0];
              if(s){
                this.setting.imgUrl = data[0].imgUrl;
                this.setting.cost = data[0].cost;
                this.setting.name = data[0].name;
              }
              this.dialogProductList.item = data.map(e => {
              e.imgUrlArr = JSON.parse(e.imgUrlJson);
              e.statusIpt = e.status == '1';
              return e
            });
            }else{
              this.$message({ message: r.Message, type: "error" });
            }
        })
    },
   
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

.setting-page{
  > .left{
    width: $leftW;
    .content{
      .colorChange{
        position: relative;
        margin-top: 30px;
        .color-p{
          position: absolute;
          top: 0;
          right: 100px;
        }
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
          margin: 14px 0 0;
          background: #F7F8FB;
          border-radius: 2px;
          border: 1px dashed #0091FF;
          i{
            color: #0091FF;
          }
        }
      }
      
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
  > .right{
    padding-left: $leftW;
  }
  > .action{
    width: $leftW;
  }  
}
</style>