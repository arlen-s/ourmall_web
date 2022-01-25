<template>
	<div id="customer-modify">
		<el-card>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><router-link :to="{ path: '/customerMg' }" replace>客户管理</router-link></el-breadcrumb-item>
				<el-breadcrumb-item>修改套餐</el-breadcrumb-item>
			</el-breadcrumb>
			<el-divider></el-divider>
			<el-form ref="comboForm" :inline="true" :rules="rules" :model="comboObj"  size="small" label-width="150px">
				<el-row>
					<el-form-item label="当前套餐类型:">
							<template v-if="comboDetail.vipType == 1">免费版</template>
							<template v-if="comboDetail.vipType == 2">标准版</template>
							<template v-if="comboDetail.vipType == 3">专业版</template>
							<template v-if="comboDetail.vipType == 4">尊享版</template>
					</el-form-item>
					<el-form-item label="服务期至:" v-if="comboDetail.overTime == '0'" > --</el-form-item>
					<el-form-item label="服务期至:" v-else> {{ $moment(comboDetail.overTime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="付费项目:" prop="project">
						<el-radio-group @change="radioChange" v-model="comboObj.project">
							<el-radio :label="1">全部</el-radio>
							<el-radio :label="2">套餐</el-radio>
							<el-radio :label="3" v-if="comboDetail.vipType != 1">加购</el-radio>
						</el-radio-group> 
					</el-form-item>
				</el-row>
				<template v-if="comboObj.project == 1 || comboObj.project == 2">
					<el-row>
						<el-form-item label="要修改的套餐类型:" prop="vipType">
							<el-select v-model="comboObj.vipType">
								<el-option :value="2" label="标准版"></el-option>
								<el-option :value="3" label="专业版"></el-option>
								<el-option :value="4" label="尊享版"></el-option>
							</el-select>
						</el-form-item>
					</el-row>
					<el-row>
						<el-form-item label="购买时长:" prop="overTime">
							<el-select v-model="comboObj.overTime">
								<!-- <template v-if="comboObj.vipType == 2">
									<el-option v-for="(item, index) in dateSet"
										:key="index"
										:label="item.label"
										:value="item.value"></el-option>
								</template> -->
								<el-option :value="12" label="一年"></el-option>
								<el-option :value="24" label="二年"></el-option>
								<el-option :value="36" label="三年"></el-option>
							</el-select>
						</el-form-item>
					</el-row>
				</template>
				<template v-if="comboObj.project == 1 || comboObj.project == 3">
					<el-row v-for="(item, index) in comboObj.addPack" :key="index">
						<el-form-item :label="index == 0? '加购项目:': ' ' " :prop="`addPack[${index}].object`" :rules="{ required: true, message: '请选择加购项目', trigger: 'blur'}">
							<el-select v-model="item.object">
								<el-option v-if="!comboDetail.service" value="service" label="企业自由品牌服务包"></el-option>
								<el-option value="mail" label="邮件加油包"></el-option>
								<el-option value="product" label="商品上架数"></el-option>
								<el-option value="subUser" label="子账号"></el-option>
							</el-select>
						</el-form-item>
						
						<el-form-item v-if="item.object == 'mail'" :prop="`addPack[${index}].mailCnt`" :rules="{ required: true, message: '请填写邮件数量', trigger: 'blur'}">
							<el-input-number 
								style="width: 220px;"
								:min="0" 
								:step-strictly="true" 
								:step="1000"
								controls-position="right"
								placeholder="请填写需要的邮件数量"
								type="number" v-model="item.mailCnt"></el-input-number>
						</el-form-item>
						<el-form-item
							v-if="item.object == 'product'"
							:prop="`addPack[${index}].productCnt`"
							:rules="{ required: true, message: '请填写数量', trigger: 'blur'}">
							<el-input-number 
								style="width: 220px;"
								:min="0" 
								controls-position="right"
								placeholder="请填写需要的数量"
								type="number" v-model="item.productCnt"></el-input-number>
						</el-form-item>
						<el-form-item
							v-if="item.object == 'subUser'"
							:prop="`addPack[${index}].subUserCnt`"
							:rules="{ required: true, message: '请填写数量', trigger: 'blur'}">
							<el-input-number 
								style="width: 220px;"
								:min="0" 
								controls-position="right"
								placeholder="请填写需要的数量"
								type="number" v-model="item.subUserCnt"></el-input-number>
						</el-form-item>
						<el-form-item :prop="`addPack[${index}].addAmount`" :rules="{ required: true, message: '请填写加购金额', trigger: 'blur'}">
							<el-input placeholder="请填写加购金额" v-model="item.addAmount"></el-input>
						</el-form-item>
						<el-form-item v-if="item.object == 'service'">
							<div class="extra">
								<div class="header">
									<a>上架应用至Shopify</a>
									<a>设置店铺独有域名</a>
								</div>
							</div>
						</el-form-item>
						<el-form-item v-if="index > 0">
							<i class="point el-icon-remove" @click="removeAddPack(index)"></i>
						</el-form-item>
					</el-row>
				</template>
				<el-row v-if="comboObj.project == 1 || comboObj.project == 3">
					<el-form-item label=" ">
						<div class="extra">
							<div style="margin: 0 10px">
								<el-link type="primary" @click="continueAdd">继续加购</el-link>
							</div>
						</div>
					</el-form-item>
				</el-row>
				<el-row v-if="comboObj.project == 1 || comboObj.project == 2">
					<el-form-item label="套餐金额:" prop="vipAmount">
						<el-input type="number" v-model="comboObj.vipAmount"></el-input>
					</el-form-item>
				</el-row>
				<!-- <el-row v-if="comboObj.project == 1 || comboObj.project == 3">
					<el-form-item label="加购金额:" prop="addAmount">
						<el-input type="number" v-model="comboObj.addAmount"></el-input>
					</el-form-item>
				</el-row> -->
				<el-row>
					<el-form-item label="上传支付凭证:" prop="imgUrl">
							<el-input v-model="comboObj.imgUrl" style="display:none"></el-input>
							<el-upload
								action=""
								ref="upload"
								list-type="picture-card"
								:limit="1"
								:on-exceed="exceedUpload"
								:before-upload="onBeforeUpload"
								:http-request="Upload"
								:on-remove="handleRemove">
								<i class="el-icon-plus"></i>
							</el-upload>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="新套餐生效时间:" prop="suff">
						<el-radio-group v-model="comboObj.suff">
							<el-radio :label="1" border>立即生效</el-radio>
							<el-radio :label="2" border>选择生效时间</el-radio>
						</el-radio-group> 
					</el-form-item>

					<el-form-item v-if="comboObj.suff == 2" prop="date">
						<el-date-picker
							class="ml-20"
							v-model="comboObj.date"
							value-format="timestamp"
							:picker-options="pickerOptions1"
							type="date"
							placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="备注:">
						<el-input v-model="comboObj.remark" type="textarea" :row="3" style="width: 500px;"></el-input>
					</el-form-item>
				</el-row>
				<el-row style="text-align: center;">
					<el-button :loading="btnLoading" type="primary" size="small" @click="submit">提交</el-button>
					<el-button size="small" @click="goBack">取消</el-button>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>

<script>
export default {
	data () {
		return {
			pickerOptions1: {
				disabledDate(time) {
					return time.getTime() < Date.now() - 8.64e7;
				},
			},
			rules: {
				project: [
					{ required: true, message: '请选择付费项目', trigger: 'blur' }
				],
				vipType: [
					{ required: true, message: '请选择套餐类型', trigger: 'blur' }
				],
				overTime: [
					{ required: true, message: '请选择套餐时长', trigger: 'blur' }
				],
				vipAmount: [
					{ required: true, message: '请输入套餐金额', trigger: 'blur' }
				],
				addAmount: [
					{ required: true, message: '请输入加购金额', trigger: 'blur' }
				],
				suff: [
					{ required: true, message: '请选择生效时间', trigger: 'blur' }
				],
				date: [
					{ required: true, message: '请选择生效时间', trigger: 'blur' }
				],
				imgUrl: [
					{ required: true, message: '请上传支付凭证', trigger: 'blur' }
				]
			},
			comboDetail: {},
			btnLoading: false,
			dateSet: [
				{ label: '一个月', value: 1 },
				{ label: '两个月', value: 2 },
				{ label: '三个月', value: 3 },
				{ label: '四个月', value: 4 },
				{ label: '五个月', value: 5 },
				{ label: '六个月', value: 6 },
				{ label: '七个月', value: 7 },
				{ label: '八个月', value: 8 },
				{ label: '九个月', value: 9 },
				{ label: '十个月', value: 10 },
				{ label: '十一个月', value: 11 }
			],
			comboObj: {
				project: 1,
				operate: '',
				vipType: '',
				date: null,
				object: '',
				overTime: '',
				hasAdd: false,
				addPack: [
					{
						object: '',
						operate: '加购',
						detail: '',
						mailCnt: '',
						addAmount: ''
					}
				],
				vipAmount: null,
				addAmount: null,
				imgUrl: '',
				timeOpen: '',
				detail: ''
			},
			base64: '',
			ext: '',
			file: null,
			fileList: [],
			userId: ''
		}
	},
	computed: {
		extraSummary () {
			let sum = 0
			this.comboObj.addPack.forEach((item) => {
				sum += Number(item.addAmount)
			})
			return sum
		}
	},
	mounted () {
		if (this.$route.query && this.$route.query.id) {
			this.userId = this.$route.query.id
			this.getDetail()
		}
	},
	methods: {
		radioChange (val) {
			this.$refs['upload'].clearFiles()
			this.comboObj = {
				project: val,
				operate: '',
				vipType: '',
				date: null,
				object: '',
				overTime: '',
				hasAdd: false,
				addPack: [
					{
						object: '',
						operate: '加购',
						detail: '',
						mailCnt: '',
						addAmount: ''
					}
				],
				vipAmount: null,
				addAmount: null,
				imgUrl: '',
				timeOpen: '',
				detail: ''
			}
		},
		goBack () {
			this.$router.go(-1)
		},
		removeAddPack (index) {
			this.comboObj.addPack.splice(index,1)
		},
		continueAdd () {
			this.comboObj.addPack.push({
				object: '',
				operate: '加购',
				detail: '',
				mailCnt: '',
				addAmount: ''
			})
		},
		submit () {
			let pass = true
			this.$refs['comboForm'].validate((valid) => {
				if (!valid) {
					pass = false
				}
			});
			if (!pass) { return; }
			let overTime = this.$moment().add(this.comboObj.overTime, 'M').format('X')
			// 判断是否加购
			if (this.comboObj.project == 1 || this.comboObj.project == 3) { this.comboObj.hasAdd  = true }
			if (!this.comboObj.hasAdd) {
				this.comboObj.addPack = []
			}
			if (this.comboObj.project == 1 || this.comboObj.project == 2) { this.comboObj.object  = '套餐' }
			if (this.comboObj.project == 3) { this.comboObj.object  = '加购' }
			// 处理生效时间
			if (this.comboObj.suff == 1) { this.comboObj.timeOpen = 0 }
			else if (this.comboObj.suff == 2) {this.comboObj.timeOpen = Math.floor(this.comboObj.date / 1000)}
			//处理操作类型
			if (this.comboDetail.vipType == this.comboObj.vipType) { this.comboObj.operate = '续费' }
			else if (this.comboDetail.vipType < this.comboObj.vipType) { this.comboObj.operate = '升级' }
			else if (this.comboDetail.vipType > this.comboObj.vipType) { this.comboObj.operate = '降级' }

			this.btnLoading = true
			this.$apiCall('api.Admin.changeVip', {
				vipType: this.comboObj.vipType,
				operate: this.comboObj.operate,
				userId: this.userId,
				overTime: overTime,
				object: this.comboObj.object,
				timeOpen: this.comboObj.timeOpen,
				hasAdd: this.comboObj.hasAdd,
				addPack: this.comboObj.addPack,
				addAmount: this.extraSummary,
				vipAmount: this.comboObj.vipAmount,
				totalAmount: Number(this.comboObj.vipAmount) + Number(this.extraSummary),
				imgUrl: this.comboObj.imgUrl,
				remark: this.comboObj.remark 
			}, (r) => {
				if (r.ErrorCode == 9999) {
					this.btnLoading = false
					this.$elementMessage('修改套餐成功', 'success')
					this.$router.replace({ path: '/customerMg' })
				} else {
					this.btnLoading = false
					this.$elementMessage(r.Message, 'error')
				}
			})
		},
		handlePictureCardPreview () {},
		handleRemove () {},
		getDetail () {
			this.$apiCall('api.Admin.getVipDetail', {
				userId: this.userId || ''
			}, (r) => {
				if (r.ErrorCode == 9999) {
					this.comboDetail = r.Data.Results
				}
			})
		},
		handleRemove(file) {
			this.fileList.forEach((item,index) => {
				if (item.index == file.uid) {
					this.fileList.splice(index, 1)
				}
			})
			if (this.fileList.length == 0) {
				this.comboObj.imgUrl = ''
			}
		},
		exceedUpload () {
			this.$elementMessage('只能上传一张图片', 'error')
		},
		onBeforeUpload(file) {
			var _this = this
			this.file = file
			this.index = file.uid
		},
		Upload () {
			let file = this.file
			const uploadFile = (file) => {
				return new Promise(function (resolve, reject) {
					let reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = function(e) {
						// 图片base64化
						resolve(this.result)
					}
				})
			}
			uploadFile(file).then((file) => {
				let newUrl = file;
				let extArr = newUrl.match(/data:image\/(.*);base64,.*/);
				this.ext = extArr[1]
				this.base64 = newUrl.split("base64,").pop()
				this.$apiCall('api.User.uploadImgBase64', {
					imgUrlBase64: this.base64,
					ext: this.ext
				}, (res) => {
					if (res.ErrorCode == 9999) {
						this.fileList.push({ index: this.index, imgUrl: res.Data.Results.imgUrl })
						this.comboObj.imgUrl = res.Data.Results.imgUrl
					} else {
						this.$refs['upload'].clearFiles()
						this.$elementMessage(res.Message, 'error')
					}
				})
			})
		},
	}
}
</script>

<style lang="scss" scoped>
#customer-modify {
 .ml-20 {
	 margin-left: 20px;
 }
 .point {
	 cursor: pointer;
	 color: red;
 }
 .extra {
	 .header {
		 a {
			 font-size: 12px;
			 margin: 0 10px;
			 cursor: pointer;
		 }
	 }
 }
}
</style>