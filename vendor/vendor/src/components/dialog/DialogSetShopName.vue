<template>
	<el-dialog :visible.sync="data.isShow" :title="$t('shop.设置专属店名')" width="600px" :close-on-click-modal="false"
		:close-on-press-escape="false" :show-close="false">
		<el-divider></el-divider>
		<div class="d-body">
			<p class=" mg-b-20">{{$t('shop.尊敬的客户，为带来更好的服务，助力您的生意成功，现后台已进行了部分内容的改版和更新，快来设置您的专属店名，生成店铺来高效处理订单和商品吧')}}</p>
			<el-input @keyup.enter.native="save" class=" mg-b-20" :placeholder="$t('shop.* 请输入店铺名称')"
				v-model.trim="data.ipt" clearable>
				<template slot="append">.myourmall.com</template>
			</el-input>
			<!-- <p style="color: #909399; font-size: 12px;"><i
					class="el-icon-info"></i>{{$t('shop.（名称长度需在3~36之间，由字母或数字构成）')}}</p> -->
			<p style="color: #909399; font-size: 12px;"><i class="el-icon-info"></i> 域名默认为店铺名称，一经设置，域名将无法更改，店铺名称可在店铺设置中进行修改</p>		
		</div>
		<el-divider></el-divider>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="save" style="pointer-events: auto;">{{$t('shop.保 存')}}</el-button>
		</div>
	</el-dialog>

</template>


<script>
	export default {
		props: ["data"],
		data() {
			return {

			}
		},
		methods: {
			save() {
				let reExp = /^[A-Za-z0-9]{3,35}$/
				let subDomain = '';
				subDomain = window.location.host.indexOf("sandbox") >= 0 ? `sandbox${this.data.ipt}.myourmall.com`:`${this.data.ipt}.myourmall.com`;
				// console.log('必须字母和数字3-35', reExp.test(this.data.ipt));
				if (!this.data.ipt) {
					this.$message({
						message: this.$t('shop.请输入店铺名称'),
						type: "error"
					});
				} else if (!reExp.test(this.data.ipt)) {
					this.$message({
						message: this.$t('shop.店铺名称格式错误'),
						type: "error"
					});
				} else {
					this.$apiCall('api.VendorShop.changeByVendor', {
						name: this.data.ipt,
                        subDomain
					}, r => {
						if (r.ErrorCode == 9999) {
							this.$message({
								message: this.$t('shop.保存成功'),
								type: "success"
							});
							window.location = window.location.href.replace(window.location.host,`//${this.data.ipt}.myourmall.com/admin/#/jump?t=${localStorage.getItem("apiUserToken")}&u=${localStorage.getItem("apiUserId")}&p=dashboard`);
							this.data.ipt = '';
							this.data.isShow = false;
						} else {
							this.$message({
								message: r.Message,
								type: "error"
							});
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.d-body {
		padding: 15px 20px;
	}
</style>
