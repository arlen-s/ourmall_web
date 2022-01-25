<template>
	<div class="designHome">
		<template v-if="code && code.header && code.header.length > 0 && this.$route.name!='storeDesign'">
			<div style="overflow:hidden" v-for="(item, index) in code.header" :key="index" v-html="item"></div>
		</template>
		<div style="position:relative;">
			<DHeader
			:data="setting.header"
			:headerMenu="headerMenu"/>
			

			<demoBody
				:data="setting"
				:header="setting.header"
			/>

			<Footer
				:setting="setting.footer"/>
		</div>
		<template v-if="code && code.footer && code.footer.length > 0 && this.$route.name!='storeDesign'">
			<div style="overflow:hidden" v-for="(item, index) in code.footer" :key="index" v-html="item"></div>
		</template>
	</div>
</template>

<script>
import DHeader from '@/views/storeDesign/components/header'
import Footer from '@/views/storeDesign/components/footer'
import demoBody from '@/views/storeDesign/components/body'
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
      immediate: true
    },
  },
  methods:{
    getMenu(){
      if(this.setting.header.activeMenu){ //有启用头部菜单
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