<template>
	<div class="designHome">
		<template v-if="code && code.header && code.header.length > 0">
			<div v-for="(item, index) in code.header" :key="index" v-html="item"></div>
		</template>
		<div style="position:relative;">
			<DHeader :data="setting && setting.header || ''"  :headerMenu="headerMenu" />
			<demoBody :data="setting" style="min-height: 120px;padding-top:180px"/>
			<Footer :setting="$store.state.configJson && $store.state.configJson.footer || ''"/>
		</div>
		<template v-if="code && code.footer && code.footer.length > 0">
			<div v-for="(item, index) in code.footer" :key="index" v-html="item"></div>
		</template>
	</div>
</template>

<script>
import DHeader from '@/views/homePage/components/header'
import Footer from '@/views/homePage/components/footer'
import demoBody from '@/views/homePage/components/body'
export default {
	props: ['setting','code'],
	components: {
		DHeader,
		Footer,
		demoBody
	},
	data() {
		return {
			headerMenu: []
		}
	},
  watch:{
	  
    'setting.header.activeMenu': {
      handler() {
        this.getMenu()
      },
      deep: true,
      immediate:true
    },
  },
  methods:{
	  
    getMenu(){
      if(this.setting.header.activeMenu){ //有启用头部
        this.setting.menu.forEach((item) => {
          if (item.id == this.setting.header.activeMenu) {
            this.headerMenu = item
          }
        })
      }
    },
  }
}
</script>

<style>

</style>