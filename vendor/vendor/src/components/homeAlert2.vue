<template>
  <div class="home-main-alert">
    <div
      v-for="alert in alertMsg"
      :key="alert.id"
      class="d-box"
      :style="{top: alert.top, left: alert.left, fontSize: alert.font,}"
    >
      <div v-html="alert.text"></div>
      <div
        class="arrow"
        :style="{left: alert.arrow}"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alertMsg: [
        {
          id: 1,
          top: 0,
          left: 0,
          text: `<img class=" mg-r-5" src="${this.$root.$children[0].baseUrl}/images/emoji/disappointed-but-relieved-face_1f625.png" width="24">每天都要手工处理Shopify站长的几千个线下订单`,
          font: "14px",
          arrow: "50px",
          active: true,
        },
        {
          id: 2,
          top: "110px",
          left: "90px",
          text: `线下订单没有系统支持<br>每次处理都要看IT小哥哥的脸色 <img src="${this.$root.$children[0].baseUrl}/images/emoji/fearful-face_1f628.png" width="24">`,
          font: "18px",
          arrow: "80px",
          active: false,
        },
        {
          id: 3,
          top: "20px",
          left: "400px",
          text: `站长给的订单文件格式五花八门, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 每次必须手工匹配，我太难了…… <img src="${this.$root.$children[0].baseUrl}/emoji/dizzy-face_1f635.png" width="24">`,
          font: "14px",
          arrow: "180px",
          active: false,
        },
        {
          id: 4,
          top: "270px",
          left: "30px",
          text: `<img src="${this.$root.$children[0].baseUrl}/images/emoji/alarm-clock_23f0.png" width="24"> 我的时间都去哪儿了？<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客户每天都要来问我发货进度！`,
          font: "14px",
          arrow: "26px",
          active: false,
        },
        {
          id: 5,
          top: "240px",
          left: "360px",
          text: `客户3000的订单发货了! <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img class=" mg-r-10" src="${this.$root.$children[0].baseUrl}/images/emoji/execl.png" width="24">还要手工整理出来发给客户……`,
          font: "18px",
          arrow: "190px",
          active: false,
        }
      ]
    };
  },
  mounted() {
    
  },
};
</script>

<style scoped>
.home-main-alert {
  position: absolute;
  width: 720px;
  height: 450px;
  top: 130px;
}
.d-box {
  position: absolute;
  padding: 15px 25px;
  background-color: #fff;
  color: #333;
  line-height: 26px;
  font-size: 18px;
  opacity: 0.7;
  box-shadow: 0 0 6px #666;
}
.d-box .arrow {
  position: absolute;
  bottom: -10px;
  display: block;
  width: 10px;
  height: 10px;
}
.d-box .arrow::before {
  position: absolute;
  border-color: transparent;
  border-style: solid;
  border-top-color: #fff;
  margin-left: -6px;
  content: "";
  border-width: 10px 10px 0;
}
.d-box img {
  position: relative;
  top: -2px;
}
.op1{
  opacity: 1;
}
</style>