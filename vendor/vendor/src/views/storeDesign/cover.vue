<template>
	<div class="contentpanel transaction-page">
		<div class="pagetitle" ref="pageHeader">
			<div class="left">
				<div class="title">
					<i class="el-icon-s-shop"></i>
					<h2>{{$t('storeSetting.店铺装修')}}</h2>
				</div>
			</div>
			<div class="right"></div>
		</div>
		<div class="pagebody" v-loading="loading">
			<el-row :gutter="15" class="mg-b-20">
				<el-col :span="24">
				<el-card>
					<div class="title-t d-flex">
						<div>{{$t('storeSetting.当前店铺')}}</div>
						<div>
							<el-button type="primary" size="medium" @click="goToMyStore">{{$t('storeSetting.查看店铺')}}<i
									class="el-icon-view el-icon--right"></i></el-button>
							<el-button type="primary" size="medium"  :disabled="!$isRole($route.meta.roleWrite)"  @click="goSetting">{{$t('storeSetting.店铺装修')}}
							</el-button>
						</div>
					</div>
					<div class="tip">{{$t('storeSetting.这是当前你的站长所看到的店铺样式')}}</div>
					<div class="windowBox">
						<div class="inner">
							<div v-if="setting" class="content">
								<Main :setting="setting" :code="code" />
							</div>
						</div>
					</div>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<el-backtop class="goto-top" target=".main-scroll  .el-scrollbar__wrap" :right="20" :bottom="60">
		</el-backtop>
	</div>
</template>

<script>
	import Main from '@/views/storeDesign/components/main'
	export default {
		data() {
			return {
				setting: null,
				loading: false,
				code: {
					header: [],
					footer: []
				}
			};
		},
		created() {
			this.$apiCall("api.VendorShop.getShopConfig", {}, r => {
				if (r.ErrorCode == 9999) {
					if (r.Data.Results.length !== 0) {
						this.$store.commit('getShopConfig', r.Data.Results)
						this.setting = JSON.parse(JSON.stringify(this.$store.state.configJson));
					}
				}
			})
			this.getConfig()
		},
		methods: {
			handleCode(arr) {
				console.log(arr)
				arr.forEach((item) => {
					if (item.pages.includes('首页')) {
						if (item.position == '底部') {
							this.code.footer.push(item.desc)
						}
						if (item.position == '顶部') {
							this.code.header.push(item.desc)
						}
					}
				})
			},
			goToMyStore() {
				window.open(
					`//${location.host.indexOf('sandbox') > -1 ? 'sandbox' : ''}${this.$store.state.userInfo.shop.name}.myourmall.com`
					)
			},
			goSetting() {
				this.$router.push('/store-setting')
			},
			getConfig() {
				this.$apiCall("api.VendorShop.getShopConfig", {}, (r) => {
					if (r.ErrorCode == 9999) {
						if (r.Data.Results.header) {
							this.$store.commit('getStoreComponent', r.Data.Results)
							this.setting = r.Data.Results
							this.handleCode(r.Data.Results.customCode)
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
		},
		components: {
			Main
		},
	};
</script>

<style scoped lang="scss">
.title-t{
  justify-content: space-between;
  font-size: 20px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #505FB1;
  line-height: 30px;
  margin-bottom: 10px;
  margin-left: 20px;
  }
  .tip{
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    margin-bottom: 20px;
    margin-left: 20px;
  }
   .windowBox{
     position: relative;
     width: 100%;
     height: 800px;
     background: url('../../../public/images/background.png') no-repeat center top;
     background-size: 1236px auto ;
     .inner{
          width: 1300px;
          height: 811px;
		  border-radius: 10px;
          overflow: hidden;
          position: absolute;
          left: 50%;
          transform: scale(0.7) translateX(-71.5%);
          top: -63px; 
       .content{
         background-color: #ffffff;
         width: 1300px;
       }
     }
     
   }
</style>
