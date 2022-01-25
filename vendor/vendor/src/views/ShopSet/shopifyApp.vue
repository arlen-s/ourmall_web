<template>
	<div  class="contentpanel edit-goods-page">
		<div class="pagetitle" ref="pageHeader">
			<div class="left">
				<div class="title">
					<el-link type="primary" @click="goto()">{{$t('shop.返回到店铺设置')}}</el-link>
					<span style="margin: 0 20px">/</span>
					<h2>{{$t('shop.shopify 应用更换')}}</h2>
				</div>
			</div>
			<div class="right">
			</div>
		</div>
        <div class="pagebody">
			<el-card class="bind">
                <p class="mg-b-30" style="font-size:18px">{{$t('shop.请联系您对接的销售提交更换应用所需要的资料，我们会在尽快 为您提供更换应用服务；')}}</p>
                <p class="mg-b-20" style="font-size:16px">{{$t('shop.需准备资料：')}}</p>
                <p class="mg-b-10">{{$t('shop.set1')}}</p>
                <p class="mg-b-10">{{$t('shop.set2')}}</p>
                <p class="mg-b-10">{{$t('shop.set3')}}</p>
                <p class="mg-b-10">{{$t('shop.set4')}}</p>
                <p class="mg-b-10">{{$t('shop.set5')}}</p>
                <p class="mg-b-10">{{$t('shop.set6')}}</p>
                <p class="mg-b-10">{{$t('shop.set7')}}</p>
                <p class="mg-b-10">{{$t('shop.set8')}}</p>
            </el-card>
        </div>
	</div> 
</template>

<script>
	export default {
		data() {
			return { 
			};
		},
        methods: {
            goto(){
                this.$router.push('/Shop')
            },
        }
	};
</script>

<style lang="scss">
	.bind{
        color: #5e5d5d;
    }
</style>
