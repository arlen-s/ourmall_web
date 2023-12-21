<template>
	<div id="searchDetail">
		<div class="detail-bread" @click="goBack">
			<i class="el-icon-arrow-left"></i>
			<span>Details</span>
		</div>
		<el-card>
			<div class="publishDetail">
				<h1 class="detail-title">{{$t('Base Information')}}</h1>
				<el-form label-width="140px" class="demo-ruleForm">
					<el-form-item label="Picture:" prop="picture" v-if="publishDetail.imgUrlJson">
						<el-image
							class="detail-img"
							:z-index="2010"
							v-for="(item, index) in publishDetail.imgUrlJson"
							:key="index"
							fit="contain"
							:preview-src-list="publishDetail.imgUrlJson"
							:src="item">
							<div slot="error" class="image-slot">
								<i class="el-icon-picture-outline"></i>
							</div>
						</el-image>
					</el-form-item>
					<el-form-item label="Product Title:" prop="title">
						{{ publishDetail.name }}
					</el-form-item>
						<el-form-item label="The name of the third-party platform's product to be linked:" prop="title">
						{{ Object.keys(customerProduct).length != 0 ?customerProduct.name : '' }}
					</el-form-item>
					<el-form-item label="The image of the third-party platform's product to be linked:" prop="picture" v-if=" Object.keys(customerProduct).length != 0">
  <el-image
      style="width: 100px; height: 100px"
      :src="customerProduct.imgsJson? customerProduct.imgsJson[0]: ''"
      fit="cover"></el-image>
					</el-form-item>					
					<el-form-item label="Price:" prop="priceFrom">
						$ {{ publishDetail.minPrice }} - {{ publishDetail.maxPrice }}
					</el-form-item>
					<el-form-item label="Product Link:">
						<a :href="publishDetail.url" target="_blank">{{ publishDetail.url }}</a>
					</el-form-item>
					<el-form-item label="Description:">
						{{ publishDetail.description }}
					</el-form-item>
				</el-form>
			</div>
		</el-card>

		<el-card class="mg-t-20" v-if="publishDetail.status != 1">
			<div class="publishDetail">
				<h1 class="detail-title">{{$t('Platform Reply')}}</h1>
					<el-form label-width="140px" class="demo-ruleForm" v-if="publishDetail.status == '9'">
						<el-form-item label="Fail Reason:">
							{{ publishDetail.remark }}
						</el-form-item>
					</el-form>
					<el-form label-width="140px" class="demo-ruleForm" v-if="publishDetail.vendorProduct">
						<el-form-item v-if="publishDetail.status == '9'" label="Fail Reason:">
							$ {{ publishDetail.remark }}
						</el-form-item>
						<el-form-item label="Price:">
							$ {{ publishDetail.price }}
						</el-form-item>
						<el-form-item label="Product Link:" prop="title">
							<a target="_blank"  v-if="vendorId != 148982 && vendorId != 146428&& vendorId != 144875&& vendorId != 144843&& vendorId != 143779&& vendorId != 143654&& vendorId != 74" :href="`${host}/item/${publishDetail.vendorProduct.id}/${publishDetail.vendorProduct.name.replace(/\s+/g, '-').replace(/[^\w]/g,'_')}.html`">{{`${host}/item/${publishDetail.vendorProduct.id}/${publishDetail.vendorProduct.name.replace(/\s+/g, '-').replace(/[^\w]/g,'_')}.html`}}</a>
							<a target="_blank" v-else :href="`${host}/itemOld/${publishDetail.vendorProduct.id}/${publishDetail.vendorProduct.name.replace(/\s+/g, '-').replace(/[^\w]/g,'_')}.html`">{{`${host}/itemOld/${publishDetail.vendorProduct.id}/${publishDetail.vendorProduct.name.replace(/\s+/g, '-').replace(/[^\w]/g,'_')}.html`}}</a>
						</el-form-item>
						<el-form-item label="Product Description:" prop="priceFrom">
							{{ publishDetail.remark || '--' }}
						</el-form-item>
					</el-form>
			</div>
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			host: window.location.origin,
			publishDetail: {},
			customerProduct: {}
		}
	},
	mounted () {
		this.getDetail()
	},
	methods: {
		goBack () {
			this.$router.go(-1)
		},
		getDetail() {
			this.$apiCall('api.OfferProduct.getDetail', {
				id: this.$route.query.id
			}, (r) => {
				if (r.ErrorCode == 9999) {
					this.publishDetail = r.Data.Results
					this.customerProduct = r.Data.Results.customerProduct
				}
			})
		}
	}
}
</script>

<style>
#searchDetail .el-form-item{
	margin-bottom: 0;
}
#searchDetail .el-form-item__label {
	line-height: 32px;
}
#searchDetail .el-form-item__content {
	line-height: 32px;
}
</style>
<style lang="scss" scoped>
#searchDetail {
	.detail-bread {
		cursor: pointer;
		margin-bottom: 10px;
		font-size: 26px;
		i {
			color: rgb(144, 144, 146)
		}
		span {
			color: #5B6BC3;
		}
	}
	.publishDetail {
		.detail-title {
			margin-left: 10px;
			font-size: 16px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #4E4E4E;
			line-height: 22px;
		}
		.demo-ruleForm {
			margin-left: 220px;
			.detail-img {
				width: 120px;
				height: 120px;
			}
		}
	}
}
</style>