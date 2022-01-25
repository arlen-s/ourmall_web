<template>
  <div v-if="setting" class="setting-page">
    <el-scrollbar class="left">
      <!-- 左边操作栏 -->
      <div class="content">
        <h1 @click="goBack">
          <el-link icon="el-icon-arrow-left" :underline="false">{{$t('storeSetting.全站页头')}}</el-link>
        </h1>
        <el-card>
          <uploadLogo class=" mg-b-20" :logo="setting.logo" @changeLogo="changeLogo"/>
          <div class="logo-w">
            <div class="title">{{$t('storeSetting.自定义Logo宽度')}}</div>
            <div class="value">
              <el-slider :min="60" :max="400" :show-tooltip="false" v-model="setting.logoWidth"></el-slider>
              <span>{{setting.logoWidth}}px</span>
            </div>
          </div>
          
          <div class="change-color-box">
            <div v-show="!setting.isTransparent">
              <div class="row-color mg-b-10">
                <span class="title">{{$t('storeSetting.背景颜色')}}</span>
                <el-color-picker v-model="setting.backgroundColor" show-alpha></el-color-picker>
              </div>
              <div class="row-color mg-b-20">
                <span class="title">{{$t('storeSetting.文字颜色')}}</span>
                <el-color-picker v-model="setting.color" show-alpha></el-color-picker>
              </div>
            </div>
            <div class="row-color mg-b-10">
              <span class="title">{{$t('storeSetting.启用透明页头')}}</span>
              <el-switch
                v-model="setting.isTransparent"
              >
              </el-switch>
            </div>
            <p class=" mg-b-10" style="color:#909399; font-size: 12px;">{{$t('storeSetting.在顶部部分是轮播图时适用,透明页头可以直接叠加在轮播图上')}}</p>
            <div v-show="setting.isTransparent" class="row-color">
              <span class="title">{{$t('storeSetting.透明页头文字颜色')}}</span>
              <el-color-picker v-model="setting.transparentColor" show-alpha></el-color-picker>
            </div> 
          </div>
          <!-- <div class="change-nav">
            <h2>{{$t('storeSetting.添加导航菜单')}}</h2>
            <div>
              <draggable v-model="setting.menu" handle=".draggable-i">
                <div v-for="(m, index) in setting.menu" :key="m.timestamp" class="ipt-nav-box">
                  <div class="draggable-i"><i class=" iconfont icon-draggable"></i></div>
                  <el-link class="draggable-i-del" type="danger" :underline="false" icon="el-icon-delete"
                    @click="delNav(index)"
                  >
                  </el-link>
                  <div class=" mg-b-10">
                    <el-input class="ipt-name" :placeholder="$t('storeSetting.请输入菜单目录名称')" size="small" maxlength="20" v-model="m.name"></el-input>
                  </div>
                  <div class=" mg-b-10">
                    <el-select :placeholder="$t('storeSetting.请选择菜单链接')" size="small"  v-model="m.link">
                      <el-option 
                        v-for="nav in $dict.storeMenuArr"
                        :key="nav.value"
                        :label="$t(nav.label)"
                        :value="nav"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div v-if="m.link && m.link.value == '9998'">
                    <el-input :key="m.link.k" :placeholder="$t('storeSetting.请输入URL')" size="small" v-model="m.url"></el-input>
                  </div>
                </div>
              </draggable>
              <div style=" padding-left: 5px;">
                <el-button type="primary"  icon="el-icon-plus" @click="addNav">{{$t('storeSetting.添加菜单目录')}}</el-button>
              </div>
            </div>
          </div>  -->
          <div class="selectedNav">
            <h2>{{$t('storeSetting.选择导航菜单')}}</h2>
            <div>
              <el-radio-group v-model="setting.activeMenu">
                <el-radio v-for="m in $store.state.configJson.menu" :key="m.id" :label="m.id">{{ m.name }}</el-radio>
              </el-radio-group>
              <el-divider></el-divider>
              <div class="action-wrap">
                <el-link type="primary" @click="$router.push({name: 'menuSetting'})"><i class="el-icon-circle-plus"></i> {{ $t('storeSetting.创建导航菜单') }}</el-link>
              </div>
            </div>
          </div>
          <div class="change-seach">
            <span class="title">{{$t('storeSetting.展示搜索入口')}}</span>
            <el-switch v-model="setting.isVisibleSearch"></el-switch>
          </div>
        </el-card>
      </div>
    </el-scrollbar>
    <el-scrollbar class="right">
      <!-- 右边操作栏 -->
      <div class="content">
        <domeHeader :data="setting" :headerMenu="headerMenu"/>
        <demoBody :data="$store.state.configJson.sort" :header="setting"/>
        <demoFooter :setting="$store.state.configJson.footer" />
      </div>
    </el-scrollbar>
    <div class="action">
      <el-button type="primary" size="medium" @click="save">{{$t('storeSetting.完成')}}</el-button>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable' //拖拽
import uploadLogo from '@/views/storeDesign/components/uploadLogo'

//demo
import domeHeader from '@/views/storeDesign/components/header'
import demoBody from '@/views/storeDesign/components/body'
import demoFooter from '@/views/storeDesign/components/footer'

export default {
  data(){
    return {
      isSave: false,
      headerMenu: [],
      setting: { //默认页头配置
        logo: '',
        logoWidth: 60,
        backgroundColor: '#fff',
        color: '#606266',
        isTransparent: false,
        transparentColor: '#606266',
        menu: [
          
        ],
        isVisibleSearch: true,
        activeMenu: '',
      },
    }
  },
  components: {
    draggable,
    uploadLogo,
    domeHeader,
    demoBody,
    demoFooter
  },
  watch: {
    'setting.activeMenu': {
      handler() {
        if(this.setting.activeMenu){ //有启用头部菜单
          this.$store.state.configJson.menu.forEach((item) => {
            if (item.id == this.setting.activeMenu) {
              this.headerMenu = item
            }
          })
        }
      },
      deep: true,
      immediate: true
    },
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
          this.$store.commit('getShopConfig', r.Data.Results)
        }
        this.setting = JSON.parse(JSON.stringify(this.$store.state.configJson.header))
      }
    })
    
  },
  methods: {
    goBack () {
      this.$router.push({name: 'storeSettingMain'})
    },
    save(){
      this.isSave = true;
      //format
      this.setting.menu.forEach(m => {
        if(m.link.value == '9998'){
          m.link.url = m.url;
        }
      })
      this.$store.commit("setStoreHeader", this.setting);
      this.$apiCall("api.VendorShop.setShopConfig", {
        configJson: JSON.stringify(this.$store.state.configJson)
      },(r) => {
        if (r.ErrorCode == 9999) {
          this.setVonderLogo();
          this.$elementMessage(this.$t('storeSetting.保存成功'), "success");
        } else {
          this.$message({message: r.Message,type: "error"});
        }
      });
    },
    setVonderLogo(){
       this.$apiCall('api.VendorShop.changeByVendor',{
         logo: this.setting.logo || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAA3NCSVQICAjb4U/gAAAAXVBMVEX////////////////////////////////////////////////////////////y8vLl5eXZ2dnMzMy/v7+ysrKlpaWZmZmMjIx/f39ycnJmZmZZWVlMTEw/Pz8zMzMXc/8wAAAAH3RSTlMAIjNEVWZ3iJmqu8zd7v//////////////////////812x6gAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDgvMjUvMjElHVhBAAAC10lEQVRogc2a7ZaCIBCGLb9KE9PUiFXu/zIXRF1FSUSYs++fpDnxBDMDCHiepvwoTlI0KU3iyNf9rZaCeFb9XGkc2CGE923AqHt4luDfsu8Irux2puPCZJ8glJg2J3zoIrgeJhhfuxVTaw53WnwUwRUfQgQa7t5SdiCijZpxrDEXRebpKb3oMK6GXTUqu+4zwnMIrt1gtsDYpVhh7FAsMb5SrDG+UK72GAgpYuxyMnaXyrbz5VQOrpVuMU6MJdvaGGEC2wyE1qOlVYcIZc47i0vqMN8FA6HlXHl4rtVTMmdYTPWl5ol/aF1yRA+Ahsyb4sgjXJNXHIWW0BhgN5eQm7tk/1Pm3O1cwvU77x9nde8hbhkIORrjlwpcjb9z8bHY8qy7Vqp0SUFIZYuiTPeS0sYWxPci95BI5XebkFg1AsuQZ1mWc3NZ5mqrpEQVXEtI3VKm7j1U3HS8+KaUbFlXSlX5voBgVgV+s6p+8rH4xhxENqwb0oFU4vf5R3w3FItOQCSrKYT9ySf/zDvasY+foVgJiGQ1hDzHvkcfXl8+FfsHyWoK+XtsKC1nxb56yfqvIQWlWDyxOCq4RRRFv0lWUwhiHhXB2XLXsrrbvjQ4fmk1huDhz9biO0JpzRvSCohkPQhpSa8C5SxoSfXCQ7qxDqK47NOcQyTrJkQ9rAxizsyJePyIWl79qDINK5J1rVQ1QOblqP6nRd009ZQFedWXpgxZWldKTkzxL93ZIFZNWhoiyryQFBmstivM0yHHU2/tyTdY27HM7ggLKXU0STJZEhWYE6j2aiaFWtyBLFNBFtwwrw4gL0Egr3MwL6Ygr9ggmwUw2x4gGzgwW1Egm2ow24MgG50wW7Ywm88g2+gwBwIwRxsghzQwx00wB2cwR4Awh5kwx7IwB8wwR+UeyKG/B3N9wbQxxy5ieDBXSjyQyzE9xv01Hy6AC0uiOc6vXgm5v0Q26Mx1uF+/ksTeg/ksIQAAAABJRU5ErkJggg==",
       },r=>{
         if (r.ErrorCode == 9999) {
          // this.$elementMessage(this.$t('storeSetting.保存成功'), "success");
        } else {
          this.$message({message: r.Message,type: "error"});
        }
       })
    },
    delNav(index){
      this.setting.menu.splice(index, 1);
    },
    changeLogo(url){
      this.setting.logo = url;
    },
    addNav(){
      //添加菜单
      this.setting.menu.push({
        timestamp: new Date().getTime(),
        name: '',
        link: null,
        url: '',
      })
      this.$nextTick(()=>{
        let el = document.querySelectorAll('.ipt-nav-box .ipt-name input')
        el[el.length-1].focus();
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
      .change-color-box{
        margin-bottom: 20px;
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
      .change-nav{
        margin-bottom: 25px;
        h2{
          margin-bottom: 10px;
          padding: 0 10px;
          font-size: 14px;
        }
        .ipt-nav-box{
          position: relative;
          margin-bottom: 10px;
          padding: 5px 5px 5px 30px;
          background-color: #F2F6FC;
          border-radius: 4px;
          box-shadow: 0 0 3px #C0C4CC;
          .draggable-i{
            position: absolute;
            left: 5px;
            color: #909399;
            cursor: move;
          }
          .draggable-i-del{
            display: none;
            position: absolute;
            top: 30px;
            left: 5px;
          }
        }
        .ipt-nav-box:hover{
          .draggable-i-del{
            display: inline-block;
          }
        }
      }
      .change-seach{
        display: flex;
        justify-content: space-between;
        margin-bottom: 60px;
        padding: 0 10px;
        width: 160px;
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
.logo-w{
  .value{
    display: flex;
    align-items: center;
    padding: 0 10px;
    .el-slider{
      margin-right: 15px;
      width: 160px;
    }
  }
}
.selectedNav{
  margin-bottom: 15px;
  padding: 10px;
  border: 1px #DCDFE6 solid;
  border-radius: 4px;
  h2{
    margin-bottom: 10px;
  }
  .el-radio-group{
    .el-radio{
      margin-bottom: 10px;
      padding-left: 15px;
      display: block;
      /deep/ .el-radio__label{
        font-size: 12px;
      }
    }
  }
  .el-divider{
    margin: 5px 0 10px;
  }
  .action-wrap{
    display: flex;
    justify-content: center;
  }
}
</style>