<template>
	<el-dialog :title="$t('invoice.shippedMark')" :visible.sync="dialogMarkShipped.isShow" width="700px">
		<el-divider></el-divider>
		<div class="d-body">
			<el-row v-if="dialogMarkShipped.item" :gutter="20" class="pd-x-20">
				<el-col :span="24" style="color: #303133">
					{{ dialogMarkShipped.item.name }}
				</el-col>
				<el-col :span="24">
					<el-form label-width="160px">
						<!-- <el-form-item :label="$t('invoice.Supplier')">
							<span style="color: #303133">{{invoiceInfo.vendorName ? invoiceInfo.vendorName : "---"}}</span>
						</el-form-item> -->
						<el-form-item :label="$t('invoice.Logisticsnumber')" required>
							<el-input v-model="dialogMarkShipped.trackNumber" :placeholder="$t('invoice.Logisticsnumber')">
							</el-input>
						</el-form-item>
						<el-form-item :label="$t('invoice.Logisticscompany')" required>
							<!--:style="{width:(dialogMarkShipped.trackKey == 99?'50%':'100%')}"-->
							<el-select style="width: 100%" v-model="dialogMarkShipped.trackKey"
								:placeholder="$t('invoice.Logisticscompany')">
								<el-option v-for="item in dialogMarkShipped.shopifyCompany" :key="item.key"
									:label="item.name" :value="item.key">
								</el-option>
							</el-select>
							<el-input style="margin: 10px 0" v-if="dialogMarkShipped.trackKey == 99"
								v-model="dialogMarkShipped.trackCompany" :placeholder="$t('invoice.Logisticscompany')">
							</el-input>
						</el-form-item>
						<el-form-item v-if="dialogMarkShipped.trackKey == 99" :label="$t('invoice.Trackinglinks')">
							<el-input v-model="dialogMarkShipped.trackUrl" :placeholder="$t('invoice.Trackinglinks')">
							</el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</div>
		<el-divider></el-divider>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogMarkShipped.isShow = false">{{$t("invoice.cancel")}}</el-button>
			<el-button type="primary" :loading="dialogMarkShipped.loading" @click="saveMarkShipped">
				{{ $t("invoice.confirm") }}
			</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		props: ["dialogMarkShipped"],
		data() {
			return {
				invoiceInfo:{}
			}
		},
		methods: {
			saveMarkShipped(){
				if (!this.dialogMarkShipped.trackNumber) {
					this.$elementMessage(this.$t("invoice.logisticsnumber"), "error");
					return;
				}
				if (!this.dialogMarkShipped.trackKey) {
					this.$elementMessage(this.$t("invoice.logisticscompany"), "error");
					return;
				}
				if (
					this.dialogMarkShipped.trackKey == 99 &&
					!this.dialogMarkShipped.trackCompany
				) {
					this.$elementMessage(this.$t("invoice.logisticscompany"), "error");
					return;
				}
				// if(this.dialogMarkShipped.trackKey == 99 && !this.dialogMarkShipped.trackUrl) {
				//   this.$elementMessage(this.$t('invoice.logistics'), "error");
				//   return;
				// }
				let trackName = "";
				this.dialogMarkShipped.shopifyCompany.forEach((item) => {
					if (this.dialogMarkShipped.trackKey == item.key) {
						if (this.dialogMarkShipped.trackKey != 99) {
							trackName = item.name;
						} else {
							trackName = this.dialogMarkShipped.trackCompany;
						}
					}
				});
				this.$emit("saveMarkShipped")
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>

