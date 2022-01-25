<template>
	<el-dialog :visible.sync="authData.isShow" :title="$t('orders.mabang')" width="800px">
		<el-divider></el-divider>
		<div class="d-body" style="margin: 20px;">
			<div>
				<div class="mg-y-20">
					<span style="margin: 0 16px;display: inline-block;">{{ $t("invoice.tokenerp") }}</span>
					<template v-if="isStaff">
						<span class="mg-r-10">
							{{authData.staffData && authData.staffData.secretKey ? authData.staffData.secretKey : "---"}}
						</span>
						<el-button v-if="authData.staffData && authData.staffData.secretKey" size="mini" type="text">
							<i class="el-icon-document-copy" v-clipboard:copy="authData.staffData.secretKey" v-clipboard:success="onCopy" v-clipboard:error="onError"></i>
						</el-button>
					</template>
					<template v-else>
						<span class="mg-r-10">{{$store.state.userInfo && $store.state.userInfo.secretKey ? $store.state.userInfo.secretKey : "---"}}</span>
						<el-button v-if="$store.state.userInfo && $store.state.userInfo.secretKey" size="mini" type="text">
							<i class="el-icon-document-copy" v-clipboard:copy="$store.state.userInfo.secretKey" v-clipboard:success="onCopy" v-clipboard:error="onError"></i>
						</el-button>
					</template>
					<el-button size="mini" type="text" style="margin-left: 30px" @click="openSecretKey">
						{{ $t("invoice.usertoken") }}
					</el-button>
				</div>
				<el-alert :title="isStaff ? $t('invoice.将员工令牌授权到马帮ERP之前') : $t('invoice.如果已经在erp授权了员工令牌')" type="warning" :closable="false"></el-alert>
				<!-- <div style="display: flex; align-items: center" class="mg-y-20">
					<span style="margin: 0 10px 0 26px">{{ $t("invoice.storename")}}</span>
					<el-autocomplete :disabled="!!invoiceInfo.timeApiGet" size="medium" class="inline-input"
						v-model="shopName" :fetch-suggestions="querySearch" :placeholder="$t('invoice.entershopname')"
						@select="handleSelect"></el-autocomplete>
				</div>
				<div class="mg-y-20" v-if="invoiceInfo.timeApiGet">
					<span style="margin: 0 10px 0 26px; opacity: 0">{{$t("invoice.storename")}}</span>
					<span class="tx-error">
						<span style="margin: 0 5px">{{ $t("invoice.ERPdownloaded") }}
						</span>{{ invoiceInfo.timeApiGet ? invoiceInfo.timeApiGet : "---" }}
					</span>
				</div> -->
				<!-- <div class="mg-y-20">
					<span style="margin: 0 10px 0 26px; opacity: 0">{{$t("invoice.storename")}}</span>
					<el-button :disabled="!!invoiceInfo.timeApiGet" size="small" icon="fa fa-save" type="primary"
						@click="confirmMoneyFn()">{{ $t("invoice.savesettings") }}
					</el-button>
				</div> -->
			</div>
		</div>
		<el-divider></el-divider>
		<div slot="footer" class="dialog-footer">
			<el-button @click="authData.isShow = false">取消</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		props: ["authData","isStaff"],
		data() {
			return {
				shopName:"",
				invoiceInfo:{}
			}
		},
		methods: {
			openSecretKey(){
				this.$emit("openSecretKey")
			},
			querySearch(queryString, cb) {
				var shopData = this.authData.shopData;
				var results = queryString ?
					shopData.filter(this.createFilter(queryString)) :
					shopData;
				// 调用 callback 返回建议列表的数据
				cb(results);
			},
			createFilter(queryString) {
				return (shop) => {
					return (
						shop.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
					);
				};
			},
			handleSelect(item) {
				this.shopName = item.value;
			},
			onCopy(e) {
				this.$elementMessage(this.$t("successfullyToClipboard"), "success");
			},
			onError(e) {
				this.$elementMessage(this.$t("failedToClipboard"), "error");
			},
			confirmMoneyFn() {
				this.tempCode = `${this.invoiceInfo.id}${Date.parse(new Date())}`;
				this.$apiCall(
					"api.Invoice.setSyncToErp", {
						invoiceId: this.invoiceInfo.id,
						shopName: this.shopName,
						tempCode: this.tempCode,
					},
					(r) => {}
				);
				this.DialogLoadingCnt.loadingCnt = 0;
				this.DialogLoadingCnt.isShow = true;
				this.getInvocieTime = setInterval(() => {
					this.$apiCall(
						"api.Invoice.checkPriceResult", {
							tempCode: this.tempCode,
							type: 4,
						},
						(r) => {
							if (r.ErrorCode == "9999") {
								let re = r.Data.Results;
								if (Number(re.count) && Number(re.total))
									this.DialogLoadingCnt.loadingCnt = re.count / re.total;
								if (re.status != 1) {
									this.tempCode = "";
									clearInterval(this.getInvocieTime);
									this.DialogLoadingCnt.isShow = false;
									if (re.status == 3) {
										//报错
										this.$elementMessage(re.message, "error");
									}
									if (re.status == 2) {
										//成功
										this.$elementMessage(this.$t("invoice.storeSet"), "success");
										this.confirmMoneyOpen = false;
										this.getData();
									}
								}
							}
						}
					);
				}, 1000);
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>
