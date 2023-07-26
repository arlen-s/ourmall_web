<template>
  <div id="sliderBox">
    <el-carousel v-if="data.images.length" ref="slider"  class="slider" :height="`${sliderHeight}px`" :key="key" :autoplay="data.auto" arrow="never" :loop="true" :interval="5000"  @change="sliderChange">
      <el-carousel-item v-for="img in data.images" :key="img.id">
        <div class="img" :style="{backgroundImage: `url(${img.src})`, height: `${sliderHeight}px`}">
        </div>
      </el-carousel-item>
    </el-carousel>  
    <div v-else style="padding: 0px 0; text-align: center; max-width: 1920px;display: flex;
    justify-content: center;">
      <img src="@/assets/images/store-design/slider.jpg"  style="width:100%"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data',],
  data(){
    return {
      key:1,
      active: 0,
    }
  },
  watch: {
    'data.images'(){
      this.key = new Date().getTime();
      // if(this.data.images.length)
      //   this.$refs.slider.setActiveItem(0)
    }
  },
  computed: {
    sliderHeight(){
      let h = 0;
      this.$dict.storeSliderSizeArr.forEach(e => {
        if(e.value == this.data.size){
          h = e.h;
        }
      });
      //自适应
      if(!h){
        if(this.data.images[this.active] && document.getElementById('demoBody')){
          h = (document.getElementById('demoBody').clientWidth / this.data.images[this.active].width) * this.data.images[this.active].height
        }else{
          h = 450
        }
      }
      return h;
    }
  },
  methods: {
    sliderChange(index){
      this.active = index;
    }
  }
}
</script>

<style lang="scss" scoped>
.slider{
  position: relative;
  z-index: 1;
  .img{
    width: 100%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>