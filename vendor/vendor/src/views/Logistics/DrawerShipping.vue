<template>
	<el-drawer :title="`${data.form.tId ? $t('logistics.编辑') : $t('logistics.添加')}${$t('logistics.运费方案')}`" :visible.sync="data.isShow" class="drawer-shipping" size="1080px" :before-close="beforeClose" @open="open">
		<el-divider></el-divider>
		<div class="d-body">
			<el-form ref="ShoppingForm" :label-position="'top'" :model="data.form" label-width="120px">
				<el-form-item :label="$t('logistics.名称')" required>
					<el-input :placeholder="$t('logistics.请输入名称')" maxlength="30" v-model="data.form.name">
						<span slot="suffix">{{ data.form.name.length ? data.form.name.length : 0 }} / 30</span>
					</el-input>
				</el-form-item>
				<el-form-item :label="$t('logistics.别名')">
					<el-input :placeholder="$t('logistics.请输入方案别名')" maxlength="30" v-model="data.form.nameDisplay">
						<span slot="suffix">{{ data.form.nameDisplay ? data.form.nameDisplay.length : 0 }} / 30</span>
					</el-input>
				</el-form-item>
				<el-form-item :label="$t('logistics.方案说明')" style="position: relative">
					<el-input type="textarea" :rows="4" :placeholder="$t('logistics.请输入200个字以内的物流方案说明')"
						v-model="data.form.remark">
					</el-input>
					<span class="textarea-len" style="color: #909399"><span :style="{color: data.form.remark && data.form.remark.length > 200 ? '#F56C6C' : '#909399', }">{{ data.form.remark && data.form.remark.length ? data.form.remark.length : 0 }}</span>
						/ 200</span>
				</el-form-item>
				<el-form-item :label="$t('logistics.商品属性')" required>
					<el-checkbox-group v-model="data.form.productType">
						<el-checkbox v-for="(type, k) in productTypeArr" :key="k" :label="type.val" name="type"
							:value="type.val">{{ $t(type.text) }}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item :label="$t('logistics.运费设置')">
					
					<div class="" style="position: absolute;top: -40px;left: 80px;">
						<el-link class="mg-r-15" type="primary" :underline="false" @click="addSetting()">{{$t('logistics.添加一组运费设置')}}</el-link>
						
					</div>
					<template v-if="settingArr && settingArr.length">
					<div class="" v-for="(setting,index) in settingArr" :key="index">
						<el-row class="mg-t-15">
							<el-col :span="2">
							  {{$t('logistics.重量范围：')}}
							</el-col>
							<el-col :span="8">
							  <el-input v-model="setting.rangeBegin" @change="numberChange('rangeBegin',index,setting.rangeBegin)">
							      <template slot="prepend">{{$t('logistics.起始')}}</template>
								  <template slot="append">g</template>
							    </el-input>
							</el-col>
							<el-col :span="8" :offset="1">
							  <el-input v-model="setting.rangeEnd" @change="numberChange('rangeEnd',index,setting.rangeEnd)" :disabled="setting.noHeavy && setting.noHeavy.length>0">
							      <template slot="prepend">{{$t('logistics.截止')}}</template>
							  	  <template slot="append">g</template>
							    </el-input>
							</el-col>
							<template v-if="settingArr.length > 1">
								<el-col :span="2" :offset="1">
									<el-link type="primary" :underline="false" @click="deleteSetting(index)">{{$t('logistics.删除')}}</el-link>
								</el-col>
							</template>
							<template v-if="index == (settingArr.length - 1)">
								<el-col :span="2" :offset="settingArr.length > 1 ? 0 : 1">
								<el-checkbox-group v-model="setting.noHeavy">
								    <el-checkbox label="1" value="1">{{$t('logistics.不限重')}}</el-checkbox>
								  </el-checkbox-group>
									<!-- <el-checkbox v-model="setting.noHeavy">{{$t('logistics.不限重')}}</el-checkbox> -->
								</el-col>
							</template>
						</el-row>
						<el-row class="mg-t-15">
							<el-col :span="2">
							  {{$t('logistics.首重设置：')}}
							</el-col>
							<el-col :span="8">
							  <el-input v-model="setting.firstWeight">
							      <template slot="prepend">{{$t('logistics.首重')}}</template>
								  <template slot="append">g</template>
							    </el-input>
							</el-col>
							<el-col :span="8" :offset="1">
							  <el-input v-model="setting.firstPrice" @input="setting.firstPrice = oninput(setting.firstPrice)">
							      <template slot="prepend">{{$t('logistics.首重价格')}}</template>
							  	  <template slot="append">{{$store.state.country.symbol}}</template>
							    </el-input>
							</el-col>
						</el-row>
						<el-row class="mg-t-15">
							<el-col :span="2">
							  {{$t('logistics.续重设置：')}}
							</el-col>
							<el-col :span="8">
							  <el-input v-model="setting.nextWeight">
							      <template slot="prepend">{{$t('logistics.续重')}}</template>
								  <template slot="append">g</template>
							    </el-input>
							</el-col>
							<el-col :span="8" :offset="1">
							  <el-input v-model="setting.nextPrice" @input="setting.nextPrice = oninput(setting.nextPrice)">
							      <template slot="prepend">{{$t('logistics.续重价格')}}</template>
							  	  <template slot="append">{{$store.state.country.symbol}}</template>
							    </el-input>
							</el-col>
						</el-row>
						<el-row class="mg-t-15 mg-b-15">
							<el-col :span="2">
							  {{$t('logistics.挂号费：')}}
							</el-col>
							<el-col :span="8">
							  <el-input :placeholder="$t('logistics.挂号费')" v-model="setting.registrationFee">
								  <template slot="append">{{$store.state.country.symbol}}</template>
							    </el-input>
							</el-col>
						</el-row>
						<el-divider></el-divider>
					</div>
					</template>
				</el-form-item>
				<el-form-item :label="$t('logistics.其他运费设置')">
					<el-row class="mg-t-15 mg-b-15">
						<el-col :span="2">
							<span style="color: #F56C6C;">*</span>
						  {{$t('logistics.时效天数：')}}
						</el-col>
						<el-col :span="4">
						  <el-input v-model="freightObj.agingDaysBegin">
							  <template slot="append">-</template>
						    </el-input>
						</el-col>
						<el-col :span="4">
						  <el-input v-model="freightObj.agingDaysEnd">
							  <template slot="append">{{$t('logistics.天')}}</template>
						    </el-input>
						</el-col>
						<el-col :span="2" :offset="1">
						  {{$t('logistics.附加费：')}}
						</el-col>
						<el-col :span="8">
						  <el-input :placeholder="$t('logistics.附加费')" v-model="freightObj.operatingFee">
							  <template slot="append">{{$store.state.country.symbol}}</template>
						    </el-input>
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>
		</div>
		<div class="drawer-footer">
			<el-button @click="data.isShow = false">{{
        $t("logistics.取消")
      }}</el-button>
			<el-button type="primary" :loading="data.loading" @click="setShipping">{{
        $t("logistics.保存")
      }}</el-button>
		</div>
	</el-drawer>
</template>

<script>
	export default {
		props: ["data"],
		data() {
			return {
				productTypeArr: this.$dict.productType,
				freightObj:{
					registrationFee:"",
					operatingFee:"",
					agingDaysBegin:"",
					agingDaysEnd:""
				},
				settingArr:[{
					rangeBegin:"",
					rangeEnd:"",
					firstWeight:"",
					firstPrice:"",
					nextWeight:"",
					nextPrice:"",
					registrationFee:"",
					noHeavy:[]
				}]
			};
		},
		methods: {
			open(){
				if(this.data.isEdit){//编辑
					this.settingArr = this.data.form.priceArr;
					// this.freightObj.registrationFee = this.data.form.item.registrationFee;
					this.freightObj.operatingFee = this.data.form.item.operatingFee;
					this.freightObj.agingDaysBegin = this.data.form.item.agingDaysBegin;
					this.freightObj.agingDaysEnd = this.data.form.item.agingDaysEnd;
					if(this.settingArr.length){
						this.settingArr.forEach(item=>{
							if (!item.noHeavy || !item.noHeavy.length) {
								this.$set(item,"noHeavy",[])
							}
						})
					}
				}else{
					this.settingArr = [{
						rangeBegin:"",
						rangeEnd:"",
						firstWeight:"",
						firstPrice:"",
						nextWeight:"",
						nextPrice:"",
						registrationFee:"",
						noHeavy:[]
					}];
					// this.freightObj.registrationFee = "";
					this.freightObj.operatingFee = "";
					this.freightObj.agingDaysBegin = "";
					this.freightObj.agingDaysEnd = "";
				}
			},
			deleteSetting(index){
				this.settingArr.splice(index,1)
			},
			addSetting(){
				this.settingArr.push({
					rangeBegin:"",
					rangeEnd:"",
					firstWeight:"",
					firstPrice:"",
					nextWeight:"",
					nextPrice:"",
					noHeavy:[]
				})
			},
			numberChange (type,index,val) {
				let item = this.settingArr[index];
				if(type == 'rangeBegin'){
					if(this.settingArr.length > 1 && index > 0){
						let item2 = this.settingArr[index-1]
						if(item2 && item2.rangeEnd && (item.rangeBegin != item2.rangeEnd)){
							this.$elementMessage(this.$t("logistics.相邻的阶梯重量，当前组的起始重量必须等于前一组的截止重量"),"error");
							this.$set(item,"rangeBegin",item2.rangeEnd);
						}
					}
				}else{
					if(item.noHeavy && item.noHeavy.length){
						item.rangeEnd = "";
						return;
					}
					item.rangeEnd = Number(val)
					this.$nextTick(()=>{
					   if(item.rangeBegin > 0) {
					       if(item.rangeEnd < item.rangeBegin){
							   this.$elementMessage(this.$t("logistics.截止重量需要大于等于起始重量"),"error");
							   this.$set(item,"rangeEnd",item.rangeBegin);
						   }
					   }
					})
				}
				
			},
			oninput(num) {
			  var str = num
			  var len1 = str.substr(0, 1)
			  var len2 = str.substr(1, 1)
			  //如果第一位是0，第二位不是点，就用数字把点替换掉
			  if (str.length > 1 && len1 == 0 && len2 != ".") {
			    str = str.substr(1, 1)
			  }
			  //第一位不能是.
			  if (len1 == ".") {
			    str = ""
			  }
			  //限制只能输入一个小数点
			  if (str.indexOf(".") != -1) {
			    var str_ = str.substr(str.indexOf(".") + 1)
			    if (str_.indexOf(".") != -1) {
			      str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1)
			    }
			  }
			  //正则替换
			  str = str.replace(/[^\d^\.]+/g, '').replace(/^\D*([0-9]\d*\.?\d{0,4})?.*$/,'$1')//小数点后只能输 4 位
			  return str
			},
			setShipping() {
				if (!this.data.form.name) {
					this.$elementMessage(this.$t("logistics.名称必须输入"), "error");
					return;
				}
				if (this.data.form.remark && this.data.form.remark.length > 200) {
					this.$elementMessage(
						this.$t("logistics.方案说明长度不能超过200"),
						"error"
					);
					return;
				}
				if (!this.data.form.productType || !this.data.form.productType.length) {
					this.$elementMessage(this.$t("logistics.请选择商品属性"), "error");
					return;
				}
				if (!this.freightObj.agingDaysBegin || !this.freightObj.agingDaysEnd) {
					this.$elementMessage(this.$t("logistics.时效天数必须填写"), "error");
					return;
				}
				this.settingArr.forEach(item=>{
					if(item.noHeavy && item.noHeavy.length){
						this.$set(item,"rangeEnd","")
					}
				})
				let params = {
					id: this.data.form.id,
					name: this.data.form.name,
					nameDisplay: this.data.form.nameDisplay,
					remark: this.data.form.remark,
					productType: this.data.form.productType,
					type: this.data.form.type,
					tId: this.data.form.tId,
					min: 0,
					max: 0,
					priceArr: this.settingArr,
					// registrationFee: this.freightObj.registrationFee,
					operatingFee: this.freightObj.operatingFee,
					agingDaysBegin: this.freightObj.agingDaysBegin,
					agingDaysEnd: this.freightObj.agingDaysEnd,
				};
				this.$emit("setShipping", params);
			},
			beforeClose(done) {
				this.$confirm(this.$t("logistics.确认关闭？  将不会保存改变。"))
					.then((_) => {
						done();
					})
					.catch((_) => {});
			},
		},
	};
</script>

<style lang="scss">
	.drawer-shipping {
		.el-drawer {
			.el-drawer__header {
				border-bottom: 1px #dcdfe6 solid;
				margin-bottom: 0;
				padding-bottom: 15px;
			}

			.el-drawer__body {
				margin-bottom: 70px;

				.el-divider--horizontal {
					margin: 0;
				}
			}
		}

		.el-form-item {
			margin-bottom: 5px;
		}

		.el-form--label-top .el-form-item__label {
			padding: 0;
		}
	}
</style>

<style lang="scss" scoped>
	.drawer-footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		position: absolute;
		left: 0;
		bottom: 0;
		padding: 0 15px;
		border-top: 1px #dcdfe6 solid;
		width: 100%;
		height: 70px;
		background-color: #fff;
	}

	.d-body {
		padding: 0 10px 0 40px;

		.textarea-len {
			position: absolute;
			right: 0;
			bottom: -20px;
			max-width: 100px;
			line-height: 22px;
		}
	}
</style>
