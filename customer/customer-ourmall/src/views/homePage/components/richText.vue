<template>
  <div class="rich-text-wrap">
    <div class="rich-text-content" :class="`${data.align} ${data.size} ${data.width}`">
      <h2>{{data.title}}</h2>
      <div class="rich-text-body" :class="data.width" v-html="data.description"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data',],
}
</script>
<style lang="scss">
.rich-text-wrap{
  .rich-text-body.w{
    img{
      max-width: 1420px;
    }
  }
  .rich-text-body.s{
    img{
      max-width: 960px;
    }
  }
}
</style>
<style lang="scss" scoped>
.rich-text-wrap{
  padding: 50px 0;
  .rich-text-content{
    margin: 0 auto;
    width: 1420px;
    h2{
      margin-bottom: 20px;
      line-height: 32px;
      font-weight: bold;
      font-size: 32px;
    }
    .rich-text-body{
      line-height: 22px;
      font-size: 14px;
    }
  }
  .rich-text-content.left{
    text-align: left;
  }
  .rich-text-content.center{
    text-align: center;
  }
  .rich-text-content.right{
    text-align: right;
  }
  .rich-text-content.big{
    h2{
      font-size: 32px;
    }
    .rich-text-body{
      font-size: 16px;
    }
  }
  .rich-text-content.small{
    h2{
      font-size: 24px;
    }
    .rich-text-body{
      font-size: 12px;
    }
  }
  .rich-text-content.s{
    width: 1420px;
  }
}
</style>