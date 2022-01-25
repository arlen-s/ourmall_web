<template>
  <ul class="pay-package">
    <li v-for="item in items" :key="item.id" :class="{active: item.id == vipType}" @click="choose(item)">
      <i v-show="item.id == vipType" class="el-icon-success"></i>
      <div class="num">{{item.count | toThousands}}</div>
      <div class="unit">Orders</div>
      <div class="price">
        US$ <span>{{item.price | toThousands}}</span>
      </div>
      <div class="msg">
        <div v-if="item.first">
          Extra +<b>{{item.rewards}}</b> orders for first recharge
        </div>
        <div v-else>
          US$ <b>{{item.per}}</b> per order
        </div>
      </div>
    </li> 
  </ul>
</template>

<script>
export default {
  props: ["items", "vipType"],
  filters: {
    toThousands(num) {
      var result = [ ], counter = 0;
      num = (num || 0).toString().split('');
      for (var i = num.length - 1; i >= 0; i--) {
      counter++;
      result.unshift(num[i]);
      if (!(counter % 3) && i != 0) { result.unshift(','); }
      }
      return result.join('');
    }
  },
  methods: {
    choose(item){
      this.$emit('choose', item.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-package{
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  li{
    position: relative;
    margin-right: 20px;
    margin-bottom: 10px;
    padding: 25px 0 15px;
    min-width: 155px;
    width: 155px;
    border: 1px #DCDFE6 solid;
    text-align: center;
    cursor: pointer;
    .num{
      color: #303133;
      font-weight: bold;
      font-size: 18px;
    }
    .unit{
      margin: 0 20px 15px;
      padding-bottom: 20px;
      border-bottom: 1px #EBEEF5 solid;
      color: #C0C4CC;
      font-size: 12px;
    }
    .price{
      margin-bottom: 15px;
      color: #67C23A;
      font-size: 20px;
      span{
        font-size: 24px;
      }
    }
    .msg{
      display: flex;
      align-items: center;
      padding: 10px;
      background-color: #EBEEF5;
      color: #909399;
      min-height: 72px;
      line-height: 26px;
      span{
        font-size: 18px;
      }
    }
  }
  li.active{
    .msg{
      background-color:#f6b24C;
    }
    >i{
      position: absolute;
      top: 5px;
      right: 5px;
      color: #67C23A;
      font-size: 18px;
    }
  }
  li:hover, .active{
    padding: 24px 0 14px;
    border: 2px #67C23A solid;
    .msg{
      padding: 10px 9px;
      color: #303133;
    }
  }
}
</style>