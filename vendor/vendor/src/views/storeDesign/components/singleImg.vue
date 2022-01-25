<template>
  <div class="single-img-row">
    <div class="box" :style="{color: data.color}">
      <div class="left" :style="{textAlign: `${data.align}`}">
        <h3 :style="{fontSize: `${data.size + 4}px`}">{{data.title || 'title'}}</h3>
        <p :style="{fontSize: `${data.size}px`}" v-html="data.subTitle ? data.subTitle.replace(/[\r|\n]/g,'<br>') : 'subhead'"></p>
        <button class="single-btn"
          :style="{color: data.btnColor, backgroundColor: data.btnBackground}"
        >{{data.btnText || 'button'}}</button>
      </div>
      <div class="right">
        <div class="img-wrap" :style="{backgroundImage: `url(${data.img ? data.img : singleImgDemo})`, height: `${data.height ? data.height : imgH}px`}"></div>
      </div>
    </div>
  </div> 
</template>

<script>
import singleImgDemo from '@/assets/images/store-design/single-img-demo.png'
export default {
  props: ['data',],
  data(){
    return {
      imgH: 371,
      singleImgDemo,
    }
  },
  watch:{
    'data.img'(){
      this.getImgH();
    }
  },
  mounted(){
    this.getImgH();
  },
  methods:{
    getImgH(){
      let img = new Image();
      img.src = this.data.img;
      img.onload = () => {
        this.imgH = img.height;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.single-img-row{
  padding: 30px 0 50px;
  .box{
    display: flex;
    align-items: center;
    margin: 0 auto;
    width: 1200px;
    .left{
      padding-right: 25px;
      width: 605px;
      h3{
        margin-bottom: 15px;
      }
      p{
        margin-bottom: 30px;
      }
      .single-btn{
        padding: 0 25px;
        border: none;
        border-radius: 6px;
        height: 52px;
        font-size: 22px;
      }
    }
    .right{
      .img-wrap{
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        width: 595px;
        height: 446px;
      }
    }
  }
}
</style>