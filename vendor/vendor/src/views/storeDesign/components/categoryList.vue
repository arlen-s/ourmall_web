<template>
	<div class="content">
		<div class="title">
			{{ setting.title || 'Product category name' }}
			<div class="more">
				<div>{{ setting.moreText || 'More' }}</div>
				<i class="el-icon-arrow-right"></i>
			</div>
		</div>
		<div class="category" v-if="setting.categorys.length > 0">
			<template v-for="(item, index) in setting.categorys">
				<div v-if="item != '{}'" :key="index" class="items" :style="{ width: itemWidth + '%' }">
					<div class="item-inner" :style="{ paddingBottom: proportionHeight + '%' }">
						<img v-if="item.themeUrl" :style="{ 'object-fit': setting.fillWay }" :src="item.themeUrl" alt="">
						<img v-if="!item.themeUrl" :style="{ 'object-fit': setting.fillWay }" src="../../../../public/images/none-img.png" alt="">
					</div>
					<div class="title">{{ item.name }}</div>
				</div>
				<div v-else :key="index" class="items" :style="{ width: itemWidth + '%' }" style=""></div>
			</template>
		</div>


		<div class="category" v-if="setting.categorys.length == 0">
			<template v-for="(item, index) in sumCnt">
				<div v-if="item != '{}'" :key="index" class="items" :style="{ width: itemWidth + '%' }">
					<div class="item-inner" :style="{ paddingBottom: proportionHeight + '%' }">
						<img v-if="!item.themeUrl" :style="{ 'object-fit': setting.fillWay }" src="../../../../public/images/none-img.png" alt="">
					</div>
					<div class="title">Category Name</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
export default {
	props: ['setting'],
	data () {
		return {
			proportionHeight: 100
		}
	},
	computed: {
		itemWidth () {
			return 90 / this.setting.cntPerRows
		},
		sumCnt () {
			return this.setting.cntPerRows * this.setting.rows
		},
		proportion () {
			return this.setting.proportion
		}
	},
	watch: {
		sumCnt () {
			// this.getCategory()
		},
		proportion () {
			this.proportionHeight = this.setting.proportion * 100
		}
	},
	created () {
	},
	methods: {
	}
}
</script>

<style lang="scss" scoped>
.content {
	width: 1200px;
	margin: 0 auto;
	.title {
		position: relative;
		text-align: center;
		font-size: 31px;
		font-family: Helvetica-Bold, Helvetica;
		font-weight: bold;
		color: #2F2F2F;
		line-height: 37px;
		.more {
			position: absolute;
			right: 0;
			top: 0;
			bottom: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 14px;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #3C3C3C;
			line-height: 20px;
		}
	}
	.category {
		width: 100%;
		margin-top: 12px;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
		.items {
			margin-top: 43px;
			width: 30%;
			padding: 0 10px;
			.item-inner {
				border-radius: 5px;
				height: 0;
				width: 100%;
				padding-bottom: 100%;
				flex-shrink: 1;
				background: #E5E5E5;
				overflow: hidden;
				position: relative;
				img {
					position: absolute;
					bottom: 0;
					top: 0;
					left: 0;
					right: 0;
					margin: auto;
					border: 0;
					width: 100%;
					height: 100%;
				}
			}
			.title {
				margin: 32px 0 32px 0;
				font-size: 24px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 33px;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		}
	}
}
</style>