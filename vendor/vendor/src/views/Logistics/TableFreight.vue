<template>
	<div>
		<!-- <template v-if="item.type != 4">
      <template v-if="!item.firstPrice && !item.nextPrice && !item.radio">
        {{ $t("discount.免运费") }}
      </template>
      <template v-else>
        <template v-if="item.type == 1">
          <div v-if="Number(item.firstWeight) || Number(item.firstPrice)">
            {{ $t("logistics.首重") }} {{ item.firstWeight || "--" }} g,
            {{ item.firstPrice || "--" }} USD
          </div>
          <div v-if="Number(item.nextWeight) || Number(item.nextPrice)">
            {{ $t("logistics.续重") }} {{ item.nextWeight || "--" }} g,
            {{ item.nextPrice || "--" }} USD
          </div>
          <div v-if="!Number(item.firstPrice) && !Number(item.nextPrice)">
            {{ $t("discount.免运费") }}
          </div>
        </template>
        <template v-if="item.type == 2">
          {{ Number(item.radio).toFixed(4) }} USD
        </template>
        <template v-if="item.type == 3">
          {{ Number(item.firstPrice).toFixed(4) }} USD
        </template>
      </template>
    </template> -->
		<template v-if="items.length">
			<div v-for="(price, index) in items" :key="index">
				<template v-if="items.length == 1">
					<span style="font-weight: bold;">{{price.noHeavy && price.noHeavy.length ? `${price.rangeBegin <= 0 ? `${$t("logistics.不限重")}` : `${price.rangeBegin}g ${$t("logistics.以上")}`}` : `${price.rangeBegin}~${price.rangeEnd} g` }}</span>
					
					<!-- <span style="font-weight: bold;">{{price.noHeavy && price.noHeavy.length && price.rangeBegin <= 0 ? `${$t("logistics.不限重")}` : `${price.rangeBegin}g ${$t("logistics.以上")}` }}</span> -->
				</template>
				<template v-else>
					<span style="font-weight: bold;">{{index == items.length - 1 ? `${price.noHeavy && price.noHeavy.length ? `${price.rangeBegin?price.rangeBegin:0}g ${$t("logistics.以上")}` : `${price.rangeBegin}~${price.rangeEnd} g`}` : `${price.rangeBegin}~${price.rangeEnd} g` }}</span>
				</template>
				<p>
					<span>{{ $t("logistics.首重")}} {{$store.state.country.shopCurrency}}{{ price.firstPrice }}/{{price.firstWeight}}g；</span>
					<span>{{ $t("logistics.续重") }}{{$store.state.country.shopCurrency}}{{ price.nextPrice }}/{{price.nextWeight}}g；</span>
					<span>{{ $t("logistics.挂号费") }}{{$store.state.country.shopCurrency}}{{ price.registrationFee }}；</span>
					<span>{{ $t("logistics.附加费")}}{{$store.state.country.shopCurrency}}{{ item.operatingFee }}；</span>
				</p>
			</div>
		</template>
	</div>
</template>

<script>
	export default {
		props: ["item"],
		data() {
			return {
				items: []
			}
		},
		watch: {
			'item.id': {
				handler() {
					if (this.item.priceArr) {
						this.items = JSON.parse(JSON.stringify(this.item.priceArr));
						// .reverse()
					}
				},
				deep: true,
				immediate: true
			}
		},
	};
</script>
