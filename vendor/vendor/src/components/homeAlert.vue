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
let url = process.env.VUE_APP_BASEURL == '/' ? '':process.env.VUE_APP_BASEURL
export default {
  data() {
    return {
      alertMsg: [
        {
          id: 1,
          top: 0,
          left: 0,
          text: `<img class=" mg-r-5" src="${url}/images/emoji/disappointed-but-relieved-face_1f625.png" width="24"> ${this.$t('signin.everyDay')}`,
          font: "14px",
          arrow: "50px",
          active: true,
        },
        {
          id: 2,
          top: "110px",
          left: "90px",
          text: `${this.$t('signin.support1')}<br>${this.$t('signin.support2')} <img src="${url}/images/emoji/fearful-face_1f628.png" width="24">`,
          font: "18px",
          arrow: "80px",
          active: false,
        },
        {
          id: 3,
          top: "20px",
          left: "400px",
          text: `${this.$t('signin.hard1')} <br>${this.$t('signin.hard2')} <img src="${url}/images/emoji/dizzy-face_1f635.png" width="24">`,
          font: "14px",
          arrow: "180px",
          active: false,
        },
        {
          id: 4,
          top: "270px",
          left: "30px",
          text: `<img src="${url}/images/emoji/alarm-clock_23f0.png" width="24"> ${this.$t('signin.time')}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客户每天都要来问我发货进度！`,
          font: "14px",
          arrow: "26px",
          active: false,
        },
        {
          id: 5,
          top: "240px",
          left: "318px",
          text: `${this.$t('signin.orders1')}! <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img class=" mg-r-10" src="${url}/images/emoji/execl.png" width="24">${this.$t('signin.orders2')}`,
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