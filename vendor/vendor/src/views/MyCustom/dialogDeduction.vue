<template>
	<el-dialog :title="$t('mycustomer.扣款')" :visible.sync="data.isShow" width="700px" @open="opened">
		<el-divider></el-divider>
		<div class="d-body">
			<el-row :gutter="30" class="pd-x-20">
				<el-col :span="24">
					<el-form label-width="100px">
						<el-form-item :label="$t('mycustomer.customersName')">
							<span style="color: #303133">{{data.item.customerName ? data.item.customerName : "---"}}</span>
						</el-form-item>
						<el-form-item :label="$t('mycustomer.扣款')" required>
							<el-input v-model="dialogData.amount" placeholder="">
							</el-input>
							<span>({{ $t("mycustomer.客户Bonus余额") }}（$）: {{ data.item.bonus || 0 }})</span>
						</el-form-item>
						<el-form-item :label="$t('mycustomer.扣款说明')" required>
							<el-input v-model="dialogData.remark" placeholder="" type="textarea" :rows="3">
							</el-input>
						</el-form-item>
						<el-form-item :label="$t('mycustomer.相关单号')">
							<el-input v-model="dialogData.order" :placeholder="$t('mycustomer.请填写关联订单')">
							</el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</div>
		<el-divider></el-divider>
		<div slot="footer" class="dialog-footer">
			<el-button @click="data.isShow = false">{{$t("invoice.cancel")}}</el-button>
			<el-button type="primary" @click="saveDeduction">
				{{ $t("invoice.confirm") }}
			</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		props: ["data"],
		data() {
			return {
				dialogData:{
					amount:"",
					remark:"",
					order:"",
				}
			}
		},
		methods: {
			opened(){
				this.dialogData.amount = "";
				this.dialogData.remark = "";
				this.dialogData.order = "";
			},
			saveDeduction(){
				if(Number(this.data.item.bonus) < Number(this.dialogData.amount)){
					this.$message({message: this.$t("mycustomer.扣款金额不能大于客户bonus余额"), type: "error"});
					return;
				}
				if(!this.dialogData.amount || !this.dialogData.remark){
					this.$message({message: this.$t("mycustomer.请完善扣款明细"), type: "error"});
					return;
				}
				let params = {
					relationshipId: this.data.item.id,
					bonus: this.dialogData.amount,
					remark:this.dialogData.remark,
					paymentCode:this.dialogData.order,
				}
				this.$emit("saveDeduction",params);
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>

