<template>
  <div class="select-pay-method">
    <a class="pay" :class="{active: payMethodAcitve == 3}" href="javascript:;" @click="selectPay(3)">
      <i class="el-icon-success"></i>
    </a>
    <a class="pay paypay" :class="{active: payMethodAcitve == 1}" href="javascript:;"  @click="selectPay(1)">
      <i class="el-icon-success"></i>                           
    </a>
    <!-- <a class="pay credit-card disabled" href="javascript:;">
      <i class="el-icon-success"></i>
      <div class="cs">Coming Soon</div>
    </a> -->
    <a class="pay credit-card" :class="{active: payMethodAcitve == 4}" href="javascript:;" @click="selectPay(4)">
      <i class="el-icon-success"></i>
    </a>
  </div>
</template>

<script>
export default {
  props: ["payMethodAcitve"],
  methods: {
    selectPay(type){
      this.$emit('selectPay', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.select-pay-method{
  display: flex;
  justify-content: center;
  .pay{
    position: relative;
    margin-right: 20px;
    border: 1px #DCDFE6 solid;
    width: 180px;
    height: 76px;
    background-image: url('./../../../public/images/pay-method.png');
    background-size: 100%;
    i{
      display: none;
      position: absolute;
      right: 5px;
      bottom: 5px;
      color: #67C23A;
      font-size: 24px;
    }
  }
  .pay:hover, .active{
    border: 2px #67C23A solid;
  }
  .paypay{
    background-position: center;
  }
  .credit-card{
    background-position: bottom;
  }
  .pay.active{
    i{
      display: block;
    }
  }
  .pay.disabled{
    position: relative;
    border: 1px #DCDFE6 solid  !important;
    .cs{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-decoration: none !important;
      text-align: center;
      font-weight: bold;
      font-size: 18px;
    }
    
  }
}
</style>