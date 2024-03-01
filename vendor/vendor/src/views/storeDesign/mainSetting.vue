<template>
  <div class="store-setting-main">
    <header class="main-header">
      <div class="left">
        <el-link icon="el-icon-back" style="margin-right: 246px;" @click="goback">{{$t('storeSetting.返回')}}</el-link>
        <SettingDropdownMenu />
      </div>
      <div class="right">
        <el-button size="small" icon="el-icon-view" @click="viewShop()">{{$t('storeSetting.查看店铺')}}</el-button>
        <el-button size="small" type="primary" @click="save">{{$t('storeSetting.保存')}}</el-button>
      </div>
    </header>
    <router-view :filter="filter" @StatusChange="StatusChange" class="frame-box"/>
  </div>
</template>

<script>
import SettingDropdownMenu from '@/views/storeDesign/components/settingDropdownMenu'
export default {
  data() {
    return {
      filter: 'home',
      editStatus: false
    }
  },
  components: {
    SettingDropdownMenu,
  },
  methods: {
    goback(){
      this.$router.push({name: 'storeDesign'});
    },
    viewShop(){
       window.open(`//${location.host.indexOf('sandbox') > -1 ? 'sandbox' : ''}${this.$store.state.userInfo.shop.name}.bcndropshippingelite.com`)
    },
    StatusChange (val) {
      this.editStatus = val
    },
    save () {
      this.$apiCall("api.VendorShop.setShopConfig", {
        configJson: JSON.stringify(this.$store.state.configJson)
      },(r) => {
        if (r.ErrorCode == 9999) {
          this.$elementMessage(this.$t('storeSetting.保存成功'), "success");
        } else {
          this.$message({message: r.Message,type: "error"});
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.link{
  color: #606266;
  text-decoration: none;
}
.store-setting-main{
  min-width: 1200px;
  height: 100%;
}
.main-header{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  height: 42px;
  background-color: #fff;
  border-bottom: 1px #DCDFE6 solid;
  box-shadow: 0 1px 6px #ccc;
  .left{
    display: flex;
    align-items: center;
  }
}
.frame-box{
  padding-top: 42px;
}
</style>