<template>
	<div width="800" class="custom-popover" v-show="datas.showPopover" :style="{top:`${top}px`}">
		<div class="items">
			<div v-for="(item,i) in datas.items" :key="datas.orderId + i"
				class="d-flex mg-b-15">
				<img :src="item.imgUrl" width="80" height="80" />
				<div class="mg-l-10">
					<p style="width: 600px;" class="mg-b-10">{{item.name}}</p>
					<p class="mg-b-10">
						<template v-if="item.isManage == 2">
							<span style="width: 350px;display: inline-block;color: #F56C6C;">SKU:
								{{item.vendorSku + $t('orders.tabBar5')}}</span>
						</template>
						<template v-else>
							<template v-if="item.status != 1">
								<span style="width: 350px;display: inline-block;color: #F56C6C;">SKU:
									{{item.vendorSku ? `${item.vendorSku} ${$t('orders.tabBar5')}` : `${$t('orders.null')}      ${$t('orders.anoffer')}`}}</span>
							</template>
							<template v-else>
								<span style="width: 350px;display: inline-block;">SKU:
									{{item.vendorSku || `${$t('orders.null')}      ${$t('orders.anoffer')}`}}}}</span>
							</template>
						</template>
					</p>
					<p>
						<span style="width: 200px;display: inline-block;">
							{{$t('orders.price2')}} {{datas.currency}} {{Number(item.price).toFixed(2)}}</span>
						<span style="width: 200px;display: inline-block;">
							{{$t('orders.price1')}}
							<span v-if="item.vendorSku">$ {{Number(item.vendorPrice).toFixed(2)}}</span>
							<span style="color: #F56C6C;" v-else>{{$t('orders.anoffer')}}</span>
						</span>
						<span
							style="width: 100px;display: inline-block;text-align: right;">*
							{{item.quantity}}</span>
						<span
							style="width: 100px;display: inline-block;text-align: right;">$
							{{Number(item.quantity * item.vendorPrice).toFixed(2)}}</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
			props: ["datas","top"],
			data() {
				return {
				}
			},
			
			methods: {
				
			}
		}
	</script>
</script>

<style>
	
	.custom-popover{
		width:800px;
		padding:20px;
		position: absolute;
		left: 100px;
		background: #fff;
		box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
		min-height: 300px;
		max-height: 300px;
		overflow-y: auto;
		z-index: 9999;
	}
	/* .custom-popover:hover{
		display: block;
	} */
</style>
