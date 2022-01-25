<template>
  <div>
    <el-tag
      v-if="fulfillmentStatus"
      size="small"
      :type="fulfillArr[fulfillmentStatus].type"
      class="shopfiy-status"
    >
      <span
        class="-EFlq"
        :class="`bg${fulfillArr[fulfillmentStatus].r}`"
      ></span>
      {{fulfillArr[fulfillmentStatus].text}}
    </el-tag>
    <el-tag
      v-else
      size="small"
      type="warning"
    >
      <span class="-EFlq bg1"></span> Unfulfilled
    </el-tag>
  </div>
</template>

<script>
export default {
  props: ["fulfillmentStatus"],
  data(){
    return {
      fulfillArr: {
        fulfilled: { text: "Fulfilled", type: "info", r: 3 },
        unfulfilled: { text: "Unfulfilled", type: "warning", r: 1 },
        partial: { text: "Partially Fulfilled", type: "danger", r: 2 },
        refunded: { text: "Refunded", type: "info", r: 3 },
      },
    }
  }
};
</script>

<style lang="scss" scoped>
.el-tag {
  background-color: #ffea8a;
  color: #595130;
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.8rem;
  border-radius: 2rem;
  font-size: 1.3rem;
  line-height: 1.5rem;
  font-weight: normal;
  font-size: 12px !important;
  .-EFlq {
    height: 1rem;
    width: 1rem;
    margin: 0 0.4rem 0 -0.3rem;
    border: 0.2rem solid currentColor;
    border-radius: 50%;
    flex-shrink: 0;
    background: transparent;
    color: #8a6116;
  }
  .-EFlq.bg2 {
    background-color: linear-gradient(
      0deg,
      currentColor,
      currentColor 50%,
      transparent 0,
      transparent
    );
  }
  .-EFlq.bg3 {
    background-color: currentColor;
  }
}
.el-tag.el-tag--info {
  background-color: #E3E4E6;
  .-EFlq {
    color: #616266;
  }
}
.el-tag.el-tag--warning {
  border-color: #ffea8a;
  background-color: #ffea8a;
  color: #303133;
  .-EFlq {
    color: #8a6116;
  }
}
.el-tag.el-tag--danger {
  background-color: #ffc58b;
  color: #303133;
  .-EFlq {
    color: #8a6116;
  }
}
</style>