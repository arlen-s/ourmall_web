<template>
  <div>
    <el-dialog v-loading="data.loading" 
      :close-on-press-escape="false"
			:close-on-click-modal="false"
      title="Pay with dLocal" :visible.sync="data.isShow" width="500px" @opened="opened">
      <el-divider></el-divider>
	  <div class="pd-x-20">
		  <div class="form">
		  	<el-form ref="ruleForm" size="small" label-width="90px" :rules="dlocalRules" :model="dlocalForm">
		  		<el-form-item label="Name" prop="name">
		  			<el-input style="width: 200px" v-model="dlocalForm.name"></el-input>
		  		</el-form-item>
				<el-form-item label="Email" prop="email">
					<el-input style="width: 200px" v-model="dlocalForm.email"></el-input>
				</el-form-item>
				<el-form-item label="Phone" prop="phone">
					<el-input style="width: 200px" v-model="dlocalForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="Country" prop="country">
					<el-select style="width: 200px" v-model="dlocalForm.country" @change="countryChange">
						<el-option :label="item.country" :value="item.countryCode" v-for="(item, index) in countryList" :key="index"></el-option>
					</el-select>
				</el-form-item>
		  		<template v-if="dlocalForm.country == 'IN'">
					<el-form-item label="City" prop="city">
						<el-input style="width: 200px" v-model="dlocalForm.city"></el-input>
					</el-form-item>
					<el-form-item label="Street" prop="street">
						<el-input style="width: 200px" v-model="dlocalForm.street"></el-input>
					</el-form-item>
					<el-form-item label="Number" prop="number">
						<el-input type="number" style="width: 200px" v-model="dlocalForm.number"></el-input>
					</el-form-item>
				</template>
				
				<el-form-item label="Document" prop="document">
					<el-input style="width: 200px" :placeholder="documentPlaceholder" v-model="dlocalForm.document"></el-input>
				</el-form-item>
		  	</el-form>
		  	<div class="payment mg-b-30">
		  		<el-radio-group v-model="dlocalForm.payway">
		  			<el-radio style="width: 150px" @change="choosePayway(item)" :label="item.id" v-for="(item, index) in paymethods" :key="index">
		  				<img :src="item.logo" alt="">
		  				{{item.name}}
		  			</el-radio>
		  		</el-radio-group>
		  	</div>
		  </div>
	  </div>
	  <el-divider></el-divider>
	  <div slot="footer" class="dialog-footer">
	  	<el-button type="primary" @click="submitDlocal">
	  		Pay
	  	</el-button>
	  </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
	props: ["data"],
	data() {
		return {
			newWindow: null,
			intervalPay: null,
			loading: false,
			countryCheck: '',
			documentPlaceholder: '',
			countryList: [],
			dlocalInstance: null,
			dlocalRules: {
				name: [
					{ required: true, message: 'Please enter name'},
				],
				email: [
					{ required: true, message: 'Please enter email'},
				],
				phone: [
					{ required: true, message: 'Please enter phone'},
				],
				country: [
					{ required: true, message: 'Please enter country'},
				],
				city: [
					{ required: true, message: 'Please enter city'},
				],
				street: [
					{ required: true, message: 'Please enter street'},
				],
				number: [
					{ required: true, message: 'Please enter number'},
				],
				document: [
					{ required: true, message: 'Please enter document'},
				],
			},
			dlocalForm: {
				name: '',
				email: '',
				phone: '',
				country: '',
				city: '',
				street: '',
				number: '',
				document: '',
				payway: ''
			},
			paymethods: [],
			payWay: {}
		}
	},
	props: ['invoiceId', 'platformType', 'data'],
	methods: {
		opened(){
			// 获取apikey
			this.$apiCall('api.AccountPayment.getPayApiKey', {
				
			}, (r) => {
				if (r.ErrorCode == 9999) {
					let apiKey = r.Data.Results.apiKey
					this.countryList = r.Data.Results.countrys
					this.dlocalInstance = dlocal(apiKey);
				}
			})
		},
		choosePayway (item) {
			this.payWay = item
			console.log(item)
		},
		countryChange() {
			this.countryList.forEach((item) => {
				if (item.countryCode == this.dlocalForm.country) {
					this.documentPlaceholder = item.document
				}
			})
			this.$apiCall('api.AccountPayment.getPayMethod', {
				
				country: this.dlocalForm.country
			}, (r) => {
				if (r.ErrorCode == 9999 && r.Data.Results.length != undefined) {
					this.paymethods = r.Data.Results
				} else {
					this.paymethods = []
					this.$elementMessage(r.Message, 'error')
				}
			})
		},
		submitDlocal() {
			let pass = true
			this.$refs['ruleForm'].validate((valid) => {
				if (!valid) {
					pass = false
				}
			});
			if (!pass) { return ; }

			if (!this.payWay.id) {
				this.$elementMessage('Pay method must be filled in', 'error')
				return;
			}
			let way = this.payWay.allowed_flows.join(',').toUpperCase()
			console.log(way.indexOf('REDIRECT'))
			if (way.indexOf('REDIRECT') > -1) {
				let params = {
					country: this.dlocalForm.country,
					methodId: this.payWay.id,
					name: this.dlocalForm.name,
					city: this.dlocalForm.city,
					street: this.dlocalForm.street,
					number: this.dlocalForm.number,
					document: this.dlocalForm.document,
					phone: this.dlocalForm.phone,
					email: this.dlocalForm.email
				}
				this.$emit("submitDlocal",params);
			}
		},
	}
}
</script>
<style lang="scss" scoped>
.payment {
		padding-left: 40px;
		div {
			img {
				width: 20px;
				height: 20px;
			}
		}
	}
</style>

