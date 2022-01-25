<template>
	<div class="home-page">
		<div class="home-body" v-loading="loading">
			<div class="designHome test">
				<div style="position:relative;">
					<DHeader :data="setting && setting.header || ''" :headerMenu="headerMenu" />
					<div class="page-body-wrap ql-snow">
						<div class="body ql-editor" :style="{paddingTop: setting.header.logoWidth && setting.header.logoWidth > 120 ? `${setting.header.logoWidth}px` : '120px'}" v-html="page.content"></div>
					</div>
					<Footer :setting="$store.state.configJson && $store.state.configJson.footer || ''"/>
				</div>
			</div>
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
		data() {
			return {
				headerMenu:[],
				setting: {
					header: {}
				},
				loading: false,
				id: this.$route.params.id,
				page: {
					content: null,
					id: null,
					title: null,
					updateTime: null
				},
				code: {
					header: [],
					footer: []
				}
			}
		},
		components: {
			DHeader,
			Footer
		},
		watch: {
			'$route.params.id': {
				handler: function() {
					this.getInfo()
				},
				deep: true,
			}
		},
		created() {
			this.getInfo();
		},
		mounted() {
		},
		methods: {
			getInfo() {
				// location.host.split('.').length < 3 || 
				if ((location.host.split('.')[0].toLowerCase() == 'www' || location.host.split('.')[0].toLowerCase() ==
						'sandboxwww') || location.host.split('.')[0].toLowerCase() == 'supplier' || location.host.split(
						'.')[0].toLowerCase() == 'sandboxsupplier' && location.host.indexOf('localhost') < 0) {
					return;
				}

				this.loading = true;
				// location.host
				let url = location.host;
				if (location.host.indexOf('localhost') > -1) { //测试
					url = 'shop242.myourmall.com'
				}
				this.$apiCall('api.User.getInfoFromUrl', {
					url
				}, r => {
					if (r.ErrorCode == 9999) {
						localStorage.setItem('c_apiShopId', r.Data.Results.shopId);
						this.getItem();
					} else {
						this.loading = false;
						this.$elementMessage(r.Message, "error");
					}
				})

			},
			getItem() {
				
				this.$apiCall("api.VendorShop.getShopConfig", {}, (r) => {
					this.loading = false;
					if (r.ErrorCode == 9999) {
						if (r.Data.Results.length !== 0) {
							if(r.Data.Results.header.activeMenu){ //有启用头部菜单
								r.Data.Results.menu.forEach((item) => {
									if (item.id == r.Data.Results.header.activeMenu) {
										this.headerMenu = item
									}
								})
							}
							this.$store.commit('getStoreComponent', r.Data.Results)
							this.setting = r.Data.Results
							if (this.$route.params.id) {
								this.id = this.$route.params.id
							}
							if (this.setting.customPage) {
								this.setting.customPage.forEach((item) => {
									if (this.id == item.id) {
										this.page = item
									}
								})
							}
							localStorage.setItem("c_shopConfigJson",JSON.stringify(r.Data.Results));
						} else {
							this.setting = JSON.parse(JSON.stringify(this.$store.state.configJson))
						}
					} else {
						this.$message({
							message: r.Message,
							type: "error"
						});
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.page-body-wrap {
	width: 1200px;
	margin: auto;
}
	.home-page {
		width: 100%;
		background-color: #fff;

		.home-body {
			position: relative;
			margin: 0 auto 90px;
			// width: 1280px;
		}
	}
</style>
