<template>
	<div class="designHome">
		<div style="position:relative;">
			<DHeader :data="setting && setting.header || ''" :headerMenu="headerMenu" />
			<div class="page-body-wrap ql-snow">
				<div class="body ql-editor" :style="{paddingTop: ($store.state.configJson.sort.length && $store.state.configJson.sort[0].type != 'slider') || !setting.header.isTransparent ? `${setting.header.logoWidth}px` : ''}" v-html="page.content"></div>
			</div>
			<Footer :setting="$store.state.configJson && $store.state.configJson.footer || ''"/>
		</div>
	</div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import DHeader from '@/views/homePage/components/header'
import Footer from '@/views/homePage/components/footer'
export default {
	props: ['setting','code', 'page'],
	components: {
		DHeader,
		Footer,
	},

	data() {
		return {
			headerMenu: [],
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

<style lang="scss" scoped>
.designHome {
	.page-body-wrap {
		width: 100%;
		.body {
			width: 1420px;
			margin: 0 auto;
		}
	}
}
</style>