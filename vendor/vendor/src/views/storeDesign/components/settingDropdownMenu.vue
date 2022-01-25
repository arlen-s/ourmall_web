<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      {{$t(activeLabel)}} <i class=" el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="m in menu" :key="m.label" :command="m.name">{{$t(m.label)}}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data(){
    return {
      menu: [
        {
          label:'storeSetting.首页',
          name: 'storeSettingMain',
        },
        {
          label:'storeSetting.商品详情页',
          name: 'storeSettingDetail',
        }
      ]
    }
  },
  computed: {
    activeLabel(){
      let label = '';
      this.menu.forEach(e => {
        if(e.name == this.$route.name)
          label = e.label;
      })
      return label || 'storeSetting.首页';
    },
  },
  methods: {
    handleCommand(command){
      this.$router.push({name: command})
    }
  }
}
</script>