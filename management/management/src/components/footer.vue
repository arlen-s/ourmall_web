<template>
  <div class="footer">
    <div class="left">
      <span>&copy; 2015-2020 <span class=" b-logo tx-bold"> OurMall</span></span>
    </div>
    <div>
      <!-- <a
        class=" mg-r-20"
        href="//www.beian.miit.gov.cn"
        target="_blank"
      >沪ICP备18022341号-2</a> -->
      <!-- <a
        href="//www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011202010551"
        target="_blank"
      >
        <img src="./../../public/images/gongan.png">
        沪公网安备 31011202010551号
      </a> -->
    </div>
  </div>
</template>

<style scoped>
.footer{
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  width: 1280px;
  color: #ddd;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}
.footer .left{
  display: flex;
}
.footer .left ul{
  display: flex;
  list-style: none;
  margin: 0 0 0 60px;
  padding: 0;
}
.footer .left ul li{
  margin-right: 15px;
}
.footer .left ul li a{
  color: rgb(179, 216, 255);
}
.footer a{
  color: #ddd;
}
.footer a:hover{
  text-decoration: underline;
  color: #fff;
}
.b-logo{
  color: #fff;
}
</style>