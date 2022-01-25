<template>
  <div class="other-login-box">
    <div class="th-login-box" v-for="(platform, k) in platformArr" :key="k">
      <el-tooltip
        v-if="k != 'woo'"
        class="item" effect="dark"
        :content="`Sign in with ${platform.name}`" 
        placement="top"
      >
        <a href="javascript:;" :class="[k,{disabled: !platform.enabled}]"
          @click="selectLogin(k)"
        >
          <i></i>
          {{platform.name}}
          <div v-if="!platform.enabled" class="cs">
            Coming soon
          </div>
        </a>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  props: ["platformArr"],
  methods: {
    selectLogin(k){
      let object = ''
      switch (k) {
        case 'lazada':
          object = '1008'
          break;
        case 'shopify':
          object = '1007'
          break;
        default:
          break
      }
      this.$Burying({
        object: object
      })
      if(this.platformArr[k].enabled){
        if(k == 'shopify'){
          this.$router.push({name: 'login', query: {platform: 'shopify'}});
        }else{
          this.$emit('selectLogin', k)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.other-login-box{
  display: flex;
  justify-content: center;
  padding: 20px 0;
  .th-login-box{
    a{
      position: relative;
      display: flex;
      align-items: center;
      margin-right: 15px;
      padding: 0 5px;
      height: 35px;
      color: #909399;
      border: 1px #E4E7ED solid;
      font-size: 12px;
      i{
        display: inline-block;
        margin-right: 5px;
        width: 25px;
        height: 25px;
        background-image: url('./../../../public/images/home/platform-icon.png');
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
    a.lazada{
      i{
        background-position: 0 -25px;
      }
    }
    a.shopee{
      i{
        background-position: 0 -50px;
      }
    }
    a.woo{
      i{
        background-position: 0 -75px;
      }
    }
    a.disabled{
      cursor: no-drop;
    }
    a:hover{
      text-decoration: none;
      color: #5c6ac4;
      border-color: #5c6ac4;
    }
    a > .cs{
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      color: #5c6ac4;
      background-color: rgba(255, 255, 255, .7);
      z-index: 1;
      text-align: center;
      line-height: 32px;
      font-weight: bold;
    }
  }
}
</style>