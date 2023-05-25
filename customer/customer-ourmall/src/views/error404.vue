<template>
  <div :class="{ gd: $root.$children[0].baseUrl == '/my'}">
	  <template v-if="code && code.header && code.header.length > 0">
	  	<div v-for="(item, index) in code.header" :key="index" v-html="item"></div>
	  </template>
    <div class="h-404">
      <h1></h1>
    </div>
    <div class="c-404"></div>
    <div class="text">
      {{$t("The page you are looking for can't be found.")}}
    </div>
    <div class="action">
      <el-button type="primary" @click="gohome()">({{sec}}) {{$t('BACK TO HOMEPAGE')}}</el-button>
    </div>
	<template v-if="code && code.footer && code.footer.length > 0">
		<div v-for="(item, index) in code.footer" :key="index" v-html="item"></div>
	</template>
  </div>
</template>

<script>
export default {
  data(){
    return {
      sec: 10,
	  setting: null,
	  code: {
	  	header: [],
	  	footer: []
	  },
    }
  },
  created() {
  	this.setting = localStorage.getItem("c_shopConfigJson") ? JSON.parse(localStorage.getItem("c_shopConfigJson")) : null;
  	if(!this.setting || !this.setting.customCode || !this.setting.customCode.length) return;
  	this.setting.customCode.forEach((item) => {
  		if (item.pages.includes('404页面')) {
  			if (item.position == '底部') {
  				this.code.footer.push(item.desc)
  			}
  			if (item.position == '顶部') {
  				this.code.header.push(item.desc)
  			}
  		}
  	})
  },
  mounted(){
    let t = setInterval(() => {
      this.sec --;
      if(this.sec < 1){
        clearInterval(t)
        this.gohome()
      }
    },1000)
    // 404埋点
    this.$Burying({
      object: '12002'
    })
  },
  methods: {
    gohome(){
      window.location.href = '/'
    }
  }
}
</script>

<style lang="scss" scoped>
.h-404{
  margin: 0 auto 15px;
  width: 1200px;
  h1{
    width: 282px;
    height: 50px;
    background-image: url('./../../public/images/logo.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
}
.gd{
  .h-404{
    padding-top: 10px;
    h1{
      margin-bottom: 100px;
      width: 291px;
      height: 49px;
      background-image: url('./../../public/images/logo@2x.png');
    }
  }
}
.c-404{
  margin: 0 auto;
  width: 1200px;
  height: 677px;
  background-image: url('./../../public/images/404.png');
}
.gd{
  .c-404{
    margin-bottom: 20px;
    width: 443px;
    height: 239px;
    background-image: url('./../../public/images/404@2x.png');
    background-size: 100%;
  }
}
.text{
  margin-bottom: 25px;
  height: 54px;
  line-height: 54px;
  color: #5c6ac4;
  text-align: center;
  font-size: 48px;
}
.gd{
  .text{
    color: #747474;
    height: 32px;
    line-height: 32px;
    font-size: 24px;
  }
}
.action{
  margin-bottom: 30px;
  text-align: center;
}
</style>