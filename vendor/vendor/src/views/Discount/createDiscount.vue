<template>
	<div id="create">
		<el-card>
			<h2 class="breadcrum" @click="goBack"><i class="el-icon-arrow-left"></i> {{ $t('discount.创建折扣') }}</h2>
			<el-divider></el-divider>
			<el-row style="padding-left: 50px;">
				<el-form :model="countForm" :rules="rules" ref="ruleForm" size="mini" style="width: 300px;">
					<el-form-item :label="$t('discount.折扣名称')" prop="name">
						<el-input v-model="countForm.name"></el-input>
					</el-form-item>
					<el-form-item :label="$t('discount.折扣码')" prop="code">
						<a class="c-code" @click="initalCode">{{ $t('discount.生成折扣码') }}</a>
						<el-input v-model="countForm.code"></el-input>
						{{ $t('discount.客户将在结账时输入此折扣码') }}
					</el-form-item>
					<el-form-item :label="$t('discount.折扣类型')" prop="type">
						<el-radio-group v-model="countForm.type" @change="initalValidate">
							<el-radio :label="1">{{ $t('discount.百分比') }}</el-radio>
							<el-radio :label="2">{{ $t('discount.定额') }}</el-radio>
							<el-radio :label="3">{{ $t('discount.免运费') }}</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-row v-if="countForm.type == 1">
						<el-form-item :label="$t('discount.折扣内容')" prop="discount">
							<br/>
							<h2>{{ $t('discount.折扣值') }}:</h2>
							<el-input style="width: 150px;" placeholder="" v-model="countForm.discount">
								<template slot="append">%</template>
							</el-input>
						</el-form-item>
					</el-row>
					<el-row v-if="countForm.type == 2">
						<el-form-item :label="$t('discount.折扣内容')" prop="discount">
							<br/>
							<h2>{{ $t('discount.折扣金额') }}:</h2>
							<el-input style="width: 150px;" placeholder="" v-model="countForm.discount">
								 <template slot="prepend">$</template>
							</el-input>
						</el-form-item>
					</el-row>
					<el-row v-if="countForm.type == 3">
						<el-form-item :label="$t('discount.国家/地区')" prop="isCountry"><br/>
							<el-radio-group @change="countryChange" v-model="countForm.isCountry">
								<el-radio :label="1">{{ $t('discount.所有国家和地区') }}</el-radio><br/>
								<el-radio :label="2">{{ $t('discount.特定国家和地区') }}</el-radio><br/>
							</el-radio-group>
						</el-form-item>
						<el-form-item v-if="countForm.isCountry == 2"  prop="countryZips">
							<el-select v-if="lang == 'en'" @change="changeJson" multiple filterable  v-model="countForm.countryZips" :placeholder="$t('discount.请选择')">
								<el-option-group
									v-for="group in countrys"
									:key="group.labelEN"
									:label="group.labelEN">
									<el-option
										v-for="item in group.options"
										:key="item.nameEN"
										:label="item.nameEN"
										:value="item.code2">
									</el-option>
								</el-option-group>
							</el-select>
							<el-select v-else @change="changeJson" multiple filterable  v-model="countForm.countryZips" :placeholder="$t('discount.请选择')">
								<el-option-group
									v-for="group in countrys"
									:key="group.labelCN"
									:label="group.labelCN">
									<el-option
										v-for="item in group.options"
										:key="item.nameCN"
										:label="item.nameCN"
										:value="item.code2">
									</el-option>
								</el-option-group>
							</el-select>
						</el-form-item>

						<el-form-item :label="$t('discount.运费')">
							<br/>
							<el-checkbox @change="checkCountry" v-model="countForm.exceedFee">{{ $t('discount.排除超过特定金额的运费') }}</el-checkbox>
						</el-form-item>
						<el-form-item v-if="countForm.exceedFee" prop="maxAmount">
							<el-input v-model="countForm.maxAmount" style="width: 150px" type="number" placeholder="US$ 0.00"></el-input>
						</el-form-item>
					</el-row>
					<el-form-item :label="$t('discount.使用门槛')"  prop="limit">
						<br/>
						<el-radio-group v-model="countForm.limit" @change="radioInital">
							<el-radio :label="1">{{ $t('discount.无') }}</el-radio><br/>
							<el-radio :label="2">{{ $t('discount.最低购买金额') }}({{$store.state.country.symbol}}) <el-input v-model="countForm.minTotalAmount" type="number" v-if="countForm.limit == 2" class="n-input"></el-input></el-radio><br/>
							<el-radio :label="3">{{ $t('discount.最低商品数量') }} <el-input v-model="countForm.minItemCnt" type="number" v-if="countForm.limit == 3" class="n-input"></el-input></el-radio>
						</el-radio-group>
					</el-form-item>
					
					<el-form-item :label="$t('discount.适用人群')"  prop="person">
						<br/>
						<el-radio-group @change="initalCustomer" v-model="countForm.person">
							<el-radio :label="1">{{ $t('discount.所有人') }}</el-radio><br/>
							<el-radio :label="2">{{ $t('discount.特定客户') }}
							</el-radio><br/>
						</el-radio-group>
					</el-form-item>
					<el-form-item prop="cPerson" v-if="countForm.person == 2">
						<el-input type="input" :disabled="true" style="width: 200px" icon=""  v-model="countForm.cPerson">
							<template slot="prepend"><i class="el-icon-search"></i></template>
						</el-input>
						<el-button v-if="countForm.person == 2" @click="openCustomerClick">{{ $t('discount.浏览') }}</el-button>
					</el-form-item>

					<el-form-item :label="$t('discount.使用限制')">
						<br/>
						<el-checkbox @change="limitTimeChange" v-model="countForm.sumCount">{{ $t('discount.限制该折扣总共能使用的次数') }} <el-input v-if="countForm.sumCount" type="number" style="width: 200px;" class="n=input" v-model="countForm.limitTime"></el-input></el-checkbox>
						<el-checkbox v-model="countForm.onlyOne">{{ $t('discount.每位客户限使用一次') }}</el-checkbox>
					</el-form-item>
					<el-form-item :label="$t('discount.开始日期')"  prop="timeStart">
						<el-date-picker
							v-model="countForm.timeStart"
							type="datetime"
							:picker-options="startOpitons"
							value-format="timestamp"
							:placeholder="$t('discount.开始日期')">
						</el-date-picker>
					</el-form-item>
					<el-form-item :label="$t('discount.结束日期')" prop="timeEnd">
						<el-date-picker
							v-model="countForm.timeEnd"
							:picker-options="pickOption"
							:disabled="!boolEndTime"
							value-format="timestamp"
							type="datetime"
							:placeholder="$t('discount.结束日期')">
						</el-date-picker>
					</el-form-item>
				</el-form>
			</el-row>

			<div class="list">
				<h2>{{ $t('discount.折扣清单') }}</h2>
				<div>
					<ul id="glist">
						<div v-if="!countForm.name && !countForm.code && !countForm.type && !countForm.maxAmount && 
						!countForm.discount && !countForm.minTotalAmount && !countForm.minItemCnt && !countForm.person &&
						!countForm.sumCount && !countForm.onlyOne && !countForm.timeStart">
							<span>{{ $t('discount.尚未输入任何内容') }}</span><br>
						</div>
						<li class="clli" v-if="!(!countForm.name && !countForm.code && !countForm.type && !countForm.maxAmount && 
						!countForm.discount && !countForm.minTotalAmount && !countForm.minItemCnt && !countForm.person &&
						!countForm.sumCount && !countForm.onlyOne && !countForm.timeStart)">{{ $t('discount.线上销售渠道可用') }}</li>
						<li class="clli" v-if="countForm.name">{{ $t('discount.折扣名') }}: {{countForm.name}}</li>
						<li class="clli" v-if="countForm.code">{{ $t('discount.折扣码') }}: {{countForm.code}}</li>
						<li class="clli" v-if="countForm.type">{{ $t('discount.折扣类型') }}:
							<span v-if="countForm.type == 1">{{ $t('discount.百分比') }}</span>
							<span v-if="countForm.type == 2">{{ $t('discount.定额') }}</span>
							<span v-if="countForm.type == 3">{{ $t('discount.免运费') }}</span>
						</li>
						<li class="clli" v-if="countForm.maxAmount">{{ $t('discount.排除超过特定金额的运费') }}: {{countForm.maxAmount}}</li>
						<li class="clli" v-if="countForm.discount">{{ $t('discount.折扣值') }}:
							<span v-if="countForm.type == 1">{{ countForm.discount }}%</span>
							<span v-if="countForm.type == 2">$ {{ countForm.discount }}</span>
						</li>
						<li class="clli" v-if="countForm.minTotalAmount">{{ $t('discount.最低购买金额') }}({{$store.state.country.symbol}}): {{countForm.minTotalAmount}}</li>
						<li class="clli" v-if="countForm.minItemCnt">{{ $t('discount.最低购买数量') }}: {{countForm.minItemCnt}}</li>
						<li class="clli" v-if="countForm.person == 1">{{ $t('discount.适用人群') }}: {{ $t('discount.所有人') }}</li>
						<li class="clli" v-if="countForm.person == 2">{{ $t('discount.适用人群') }}: {{ countForm.cPerson }}</li>
						<li class="clli" v-if="countForm.sumCount">{{ $t('discount.折扣总共使用数量') }}: {{countForm.limitTime}}</li>
						<li class="clli" v-if="countForm.onlyOne">{{ $t('discount.限制使用一次') }}:</li>
						<li class="clli" v-if="countForm.timeStart">{{ $t('discount.生效时间') }}:{{ $moment(countForm.timeStart).format("YYYY-MM-DD HH:mm:ss") }} <span v-if="countForm.timeEnd"> - {{ $moment(countForm.timeEnd).format("YYYY-MM-DD HH:mm:ss") }}</span></li>
					</ul>
				</div>
			</div>
			<el-row style="padding-left: 50px;">
				<el-button size="mini" type="primary" @click="submit">{{ $t('discount.添加') }}</el-button>
			</el-row>
		</el-card>      

		<el-dialog
			:title="$t('discount.客户选择')"
			width="400px"
			:before-close="closeCustomer"
			:visible="customerVisible">
			<div class="country">
				<el-row class="pd-lr-30 pd-b-20">
					<el-input size="mini" style="width: 300px;" v-model="selectCustomer">
						<template slot="prepend"><i class="el-icon-search"></i></template>
					</el-input>
				</el-row>
				<el-divider></el-divider>
				<el-row class="control">
					<el-button style="float:left" size="mini" @click="toCustomer">{{ $t('discount.管理客户') }}</el-button>
					<el-link style="float:right" type="primary" icon="el-icon-refresh" @click="getCustomers">{{ $t('discount.刷新') }}</el-link>
				</el-row>
				<el-divider></el-divider>
				<el-row class="pd-lr-30 custom-title">
					<h2>{{ $t('discount.客户信息') }}</h2>
				</el-row>
				<el-divider></el-divider>
				<el-scrollbar v-loading="customerLoading">
					<el-row class="data pd-lr-30" v-if="customers.length > 0">
						<el-checkbox-group v-model="countForm.customerIds">
							<el-checkbox
								style="display:block"
								v-for="(item, index) in customers"
								:key="index"
								:label="item.id">{{ item.customerName }}</el-checkbox>
						</el-checkbox-group>
					</el-row>
					<el-row class="nodata" v-if="customers.length == 0">
						<div>
							{{ $t('discount.暂无数据') }}, <el-link @click="toCustomer" type="primary">{{ $t('discount.去添加客户') }}</el-link>
						</div>
					</el-row>
				</el-scrollbar>
				<el-row class="pd-lr-30 btn-area">
					<el-button size="mini" type="primary" @click="customerChange">{{ $t('discount.添加') }}</el-button>
				</el-row>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import countryData from '../../components/country.json'
export default {
	data() {
		return {
			customerLoading: false,
			pickOption: {
				disabledDate:this.disabledDate
			},
			startOpitons: {
				disabledDate(v) {
					return v.getTime() < new Date().getTime() - 86400000
				}
			},
			rules: {
				name: [
					{ required: true, message: this.$t('discount.请输入折扣名称'), trigger: 'change' },
				],
				code: [
					{ required: true, message: this.$t('discount.请输入折扣码'), trigger: 'change' },
				],
				type: [
					{ required: true, message: this.$t('discount.请选择折扣类型'), trigger: 'change' },
				],
				discount: [
					{ required: true, message: this.$t('discount.请输入折扣值'), trigger: 'change' },
				],
				countryZips: [
					{ required: true, message: this.$t('discount.请选择指定国家'), trigger: 'change' },
				],
				isCountry: [
					{ required: true, message: this.$t('discount.请选择是否指定国家'), trigger: 'change' },
				],
				limit: [
					{ required: true, message: this.$t('discount.请选择使用门槛'), trigger: 'change' },
				],
				person: [
					{ required: true, message: this.$t('discount.请选择适用人群'), trigger: 'change' },
				],
				cPerson: [
					{ required: true, message: this.$t('discount.请选择特定客户'), trigger: 'change' },
				],
				timeStart: [
					{ required: true, message: this.$t('discount.请输入开始生效时间'), trigger: 'change' },
				],
			},
			countryZips: [],
			countForm: {
				name: '',
				code: '',
				type: 0,
				discount: '',
				exceedFee: false,
				cPerson: '',
				maxAmount: null,
				minTotalAmount: null,
				customerIds: [],
				minItemCnt: null,
				sumCount: false,
				onlyOne: false,
				limitTime: null,
				timeStart: '',
				timeEnd: '',
				countryZips: [],
				countryJson: []
			},
			customers: [],
			countryData: countryData,
			customersTemp: [],
			lang: this.$i18n.locale,
			countrys: [],
			checkProps: {
				value: 'zip',
				multiple: true,
				children: 'children',
				label: 'nameEN'
			},
			// 
			selectCustomerStr: '',
			// 弹窗筛选值
			selectCustomer: '',
			customerVisible: false,
		}
	},
	created () {
		this.initalCountry()
		this.getCustomers()
	},
	computed: {
		boolEndTime () {
			if (this.countForm.timeStart) {
				return true
			} else {
				return false
			}
		}
	},
	watch: {
		selectCustomer () {
			this.getCustomers()
		},
	},
	methods: {
		checkCountry () {
			if (this.countForm.isCountry) {
			} else {
				this.countForm.exceedFee = false
				this.$elementMessage(this.$t('discount.请选择是否指定国家'), 'info')
			}
		},
		initalCountry () {
			let options = []
			for (let key in this.countryData) {
				let en = ''
				switch (key) {
					case '亚洲':
						en = 'Asia'
						break;
					case '北美洲':
						en = 'North America'
						break;
					case '南美洲':
						en = 'South America'
						break;
					case '大洋洲':
						en = 'Oceania'
						break;
					case '非洲':
						en = 'Africa'
						break;
					default: 
						break
				}
				let data = { 
					labelCN: key,
					labelEN: en,
					options: []
				}
				for(let key2 in this.countryData[key]){
					data.options.push(this.countryData[key][key2])
				}
				options.push(data)
			}

			options.forEach((option) => {
				option.options.sort((obj1, obj2) => {
					return obj1.nameEN.localeCompare(obj2.nameEN, 'zh')
				})
			})
			this.countrys = options
		},
		dataFilter(node, val) {
      console.log('val', val, 'node', node)
      if (!!~node.text.indexOf(val) || !!~node.text.toUpperCase().indexOf(val.toUpperCase())) {
        return true
      }
    },
		toCustomer() {
			let link = this.$router.resolve({ path: '/my-custom'});
			window.open(link.href, '_blank');
		},
		changeJson (val) {
			let json = []
			val.forEach((code) => {
				json.push({ country: code })
			})
			this.countForm.countryJson = json
		},
		goBack () {
			this.$router.push({ path: '/discount' })
		},
		disabledDate (time) {
			return time.getTime() < this.countForm.timeStart
		},
		countryChange () {
			this.countForm.countryJson = []
		},
		limitTimeChange (val) {
			if (!val) {
				this.countForm.limitTime = null
			}
		},
		initalCustomer () {
			this.countForm.cPerson = ''
			this.countForm.customerIds = []
		},
		customerChange () {
			this.countForm.cPerson = ''
			this.countForm.customerIds.forEach((id) => {
				this.customersTemp.forEach((item) => {
					if (id == item.id) {
						this.countForm.cPerson += item.customerName + ','
					}
				})
			})
			this.customerVisible = false
		},
		initalValidate () {
			this.$refs['ruleForm'].clearValidate()
		},
		submit () {
			let pass = false
			this.$refs['ruleForm'].validate((valid) => {
				if (valid) {
					pass = true
				}
			});

			if (!pass) {
				console.log(222)
				return ;
			}

			this.$apiCall('api.Coupon.addAndChange', {
				name: this.countForm.name,
				type: this.countForm.type,
				code: this.countForm.code,
				timeStart: this.countForm.timeStart / 1000,
				timeEnd: this.countForm.timeEnd / 1000,
				discount: this.countForm.discount,
				maxAmount: this.countForm.maxAmount,
				minTotalAmount: this.countForm.minTotalAmount,
				minItemCnt: this.countForm.minItemCnt,
				limitTime: this.countForm.limitTime,
				onlyOne: this.countForm.onlyOne,
				customerJson: this.countForm.customerIds,
				countryJson: this.countForm.countryJson,
			}, (r) => {
				if (r.ErrorCode == 9999) {
					this.$elementMessage(this.$t('discount.折扣创建成功!您可以通过电子邮件或社交媒体与您的客户分享此折扣码。客户使用此折扣码时，即可在结账时抵扣。'), 'success')
					this.$router.push({path: '/discount'})
				}
			})
		},
		radioInital () {
			this.countForm.minTotalAmount = null
			this.countForm.minItemCnt = null
		},
		initalCode () {
			this.$apiCall('api.Coupon.getCode', {},
			(r) => {
				if (r.ErrorCode == 9999) {
					this.countForm.code = r.Data.Results
				} else {
					this.$elementMessage(r.Message, 'error')
				}
			})
		},
		getCustomers() {
			this.customers = []
			this.customerLoading = true
			this.$apiCall('api.Relationship.findByVendor', {
				name: this.selectCustomer
			},
			(r) => {
				this.customerLoading = false
				if (r.ErrorCode == 9999) {
					this.customers = r.Data.Results
					if (this.selectCustomer == '') {
						this.customersTemp = r.Data.Results
					}
				}
			})
		},
		closeCustomer () {
			this.customerVisible = false
		},
		openCustomerClick () {
			this.customerVisible = true
		},
		// getCountry () {
		// 	this.$apiCall('api.Coupon.getProvinceCity',
		// 	{}, (r) => {
		// 		if (r.ErrorCode == 9999) {
		// 			let data = r.Data.Results
		// 			for (let key in data) {
		// 				this.countrys.push(data[key])
		// 			}
		// 			this.countrys.forEach((item) => {
		// 				this.$set(item, 'children', [])
		// 				for (let key in item.province) {
		// 					let second = {
		// 						nameEN: key,
		// 						province: key,
		// 						countryCode2: item.code2,
		// 						children: []
		// 					}
		// 					item.children.push(second)
		// 				}
		// 			})

		// 			this.countrys.forEach((item) => {
		// 				for (let key in item.province) {
		// 					item.children.forEach((inner) => {
		// 						if (key == inner.nameEN) {
		// 							item.province[key].forEach((third) => {
		// 								this.$set(third, 'nameEN', third.city)
		// 								this.$set(third, 'country', item.code2)
		// 								this.$set(third, 'province', key)
		// 								inner.children.push(third)
		// 								if (!third.country) {
		// 									console.log(third)
		// 								}
		// 							})
		// 						}
		// 					})
		// 				}
		// 			})
		// 		}
		// 	})
		// }
	}
}
</script>

<style lang="scss">
#create {
	.el-form-item--mini.el-form-item {
		margin-bottom: 5px;
	}
	.el-form-item--mini .el-form-item__label {
		font-size: 14px;
		font-weight: 600;
	}
}
</style>
<style lang="scss" scoped>
#create {
	.breadcrum {
		cursor: pointer;
	}
	.list {
		position: fixed;
		width: 300px;
		right: 10%;
		top: 30%;
		padding: 10px 20px;
		border: 2px solid #ccc;
		ul {
			list-style-type: decimal;
			li {
				word-break: break-all;
			}
		}
	}
	.control {
		margin: 10px 0;
		padding: 0 30px;
		width: 400px;
		overflow: hidden;
	}
	.custom-title {
		font-size: 16px;
		line-height: 2;
		background: #ccc;
	}
	.c-code {
		margin-left: 170px;
		font-size: 12px;
		color: rgb(82, 95, 176);
		cursor: pointer;
	}
	.n-input {
		width: 100px;
		margin-left: 10px;
	}
	.country {
		max-height: 520px;
		overflow: hidden;
		.data {
			height: 340px;
			overflow: scroll;
		}
		.nodata {
			height: 340px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.pd-lr-30 {
			padding: 0 30px;
		}
		.pd-b-20 {
			padding-bottom: 20px;
		}
		.btn-area {
			padding-top: 10px;
			padding-bottom: 20px;
			text-align: right;
		}
	}
}
</style>