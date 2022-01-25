<template>
	<div id="editList">
		<div class="back" @click="goBack">
			<el-link icon="el-icon-arrow-left" :underline="false">添加组件</el-link>
		</div>
		<h2>文字</h2>
		<div class="config">
			<div class="modal-content" @click="routerChange('richText')">
				<div class="content-box">
					<i class="iconfont icon-draggable"></i>
					<div class="title">富文本</div>
				</div>
			</div>
		</div>
		<h2>图片</h2>
		<div class="config">
			<div class="modal-content" @click="routerChange('slider')">
				<div class="content-box">
					<i class="iconfont icon-draggable"></i>
					<div class="title">轮播图</div>
				</div>
			</div>
			<div class="modal-content" @click="routerChange('singleImg')">
				<div class="content-box">
					<i class="iconfont icon-draggable"></i>
					<div class="title">单图</div>
				</div>
			</div>
		</div>
		<h2>商品</h2>
		<div class="config">
			<div class="modal-content" @click="routerChange('singleProduct')">
				<div class="content-box">
					<i class="iconfont icon-draggable"></i>
					<div class="title">单个商品</div>
				</div>
			</div>
			<div class="modal-content" @click="routerChange('hotProduct')">
				<div class="content-box">
					<i class="iconfont icon-draggable"></i>
					<div class="title">热门商品列表</div>
				</div>
			</div>
			<div class="modal-content" @click="routerChange('productCategory')">
				<div class="content-box">
					<i class="iconfont icon-draggable"></i>
					<div class="title">商品类目</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['setting'],
	methods: {
		goBack () {
			this.$emit('goBack', false)
		},
		routerChange (val) {
			this.$emit('routerChange', val)
		}
	}
}
</script>

<style lang="scss" scoped>
#editList {
	.back {
		display: flex;
		align-items: center;
		justify-content: left;
		font-weight: bold;
		cursor: pointer;
		i {
			font-size: 18px;
		}
		div {
			margin-left: 5px;
		}
	}
	h2 {
		font-size: 16px;
		font-weight: 500;
		margin: 15px 0 5px 0
	}
	.config {
		border-radius: 5px;
		overflow: hidden;
	}
	.modal-content {
		overflow: hidden;
		.content-box{
			cursor: pointer;
			position: relative;
			display: flex;
			align-items: center;
			padding: 10px 0 10px 50px;
			font-size: 16px;
			color: #aaa;
			background-color: #fff;
			border-bottom: 1px solid #eef1f7;
			.el-dropdown-link {
				font-size: 16px;
				color: #303133;
				display: flex;
				align-items: center;
			}
			div.title {
				color: #303133;
				font-size: 14px;
				margin-left: 15px;
			}
		}
		.delete-icon {
			position: absolute;
			right: 10px;
			top: 0;
			bottom: 0;
			line-height: 38px;
			font-size: 20px;
			cursor: pointer;
			color: red;
		}
	}
}
</style>