<template>
  <div class="home-reg">
    <div class="row3">
      <el-dropdown class="select-p" @command="selectPlatform">
        <div class="el-dropdown-link d-flex">
          <i class="p-icon mg-r-5" :class="activePlatform"></i> 
          <span class=" mg-r-5">{{platformArr[activePlatform].name}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(platform, k) in platformArr" :key="k"
            :command="k"
          >
            <div class=" d-flex">
              <i class="p-icon" :class="k"></i>
              {{platform.name}}
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <template v-if="activePlatform == 'shopify'">
        <input
          type="text"
          placeholder="Store name"
          v-model="shopUrlTxt"
          @keyup.enter="gotoLogin"
        >
        <span>.myshopify.com</span>
      </template>
      <el-button
        v-if="platformArr[activePlatform].enabled"
        class="login-btn"
        :loading="loading"
        @click="gotoLogin"
      >Connect to {{$root.$children[0].pName.a}}</el-button>
      <el-button 
        v-else
        :disabled="true"
      >Coming soon
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["loading", "platformArr", "activePlatform", "shopUrl"],
  data(){
    return {
      shopUrlTxt: ''
    }
  },
  mounted(){
    this.shopUrlTxt = this.shopUrl;
  },
  watch:{
    shopUrl(){
      this.shopUrlTxt = this.shopUrl;
    }
  },
  methods: {
    selectPlatform(p){
      if(this.loading)
        return;
      this.$emit('selectPlatform', p);
    },
    gotoLogin(){
      if(this.platformArr[this.activePlatform].enabled)
        this.$emit('gotoLogin', this.shopUrlTxt)
    },
  }
}
</script>

<style lang="scss" scoped>
.home-reg {
  .row3 {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    input {
      width: 180px;
      height: 42px;
      border: 1px #ebeef5 solid;
      border-right: none;
      border-left: none;
      padding: 0 15px;
      outline: none;
    }
    input + span {
      height: 42px;
      line-height: 42px;
      border: 1px #ebeef5 solid;
      border-right: none;
      border-left: none;
      background-color: #fff;
      padding: 0 5px;
      color: #c0c4cc;
      font-size: 16px;
    }
    button {
      padding: 0 15px;
      height: 40px;
      border: none;
      background-color: #e94b26;
      color: #fff;
      border-radius: 0 4px 4px 0;
    }
    button:hover {
      background-color: #ee7557;
    }
    button.is-disabled{
      background-color:#82848a;
    }
  }
}
.select-p, .el-dropdown-menu{
  .el-dropdown-link{
    padding: 0 15px;
    height: 42px;
    border: 1px #ebeef5 solid;
    border-right: none;
    background-color: #fff;
    border-radius: 4px 0 0 4px;
    > span{
      font-weight: bold;
      font-size: 16px;
    }
  }
  .p-icon{
    width: 25px;
    height: 25px;
    background-image: url('./../../../public/images/home/platform-icon.png');
    background-size: 100%;
  }
  .p-icon.lazada{
    background-position: 0 75px;
  }
  .p-icon.shopee{
    background-position: 0 50px;
  }
  .p-icon.woo{
    background-position: 0 25px;
  }
}
</style>