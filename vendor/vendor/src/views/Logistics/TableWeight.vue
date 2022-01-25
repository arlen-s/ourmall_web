<template>
  <div>
    <template v-if="item.type == 1 || item.type == 3 || item.type == 4">
      <div v-if="Number(item.min) && Number(item.max)">
        {{ $t("transaction.重量") }}
        {{ (Number(item.min) / 1000).toFixed(3) }} -
        {{ (Number(item.max) / 1000).toFixed(3) }} kg
      </div>
      <div v-else-if="Number(item.min)">
        {{ $t("transaction.重量") }} ≥
        {{ (Number(item.min) / 1000).toFixed(3) }} kg
      </div>
      <div v-else-if="Number(item.max)">
        {{ $t("transaction.重量") }} ≤
        {{ (Number(item.max) / 1000).toFixed(3) }} kg
      </div>
      <div v-else>{{ $t("logistics.所有订单") }}</div>
    </template>
    <template v-if="item.type == 2">
      <div v-if="Number(item.min) && Number(item.max)">
        {{ $t("goodsEdit.体积重") }} {{ (item.min / 6000).toFixed(3) }} -
        {{ (item.max / 6000).toFixed(3) }} kg
      </div>
      <div v-else-if="Number(item.min)">
        {{ $t("goodsEdit.体积重") }} ≥ {{ (item.min / 6000).toFixed(3) }} kg
      </div>
      <div v-else-if="Number(item.max)">
        {{ $t("goodsEdit.体积重") }} ≤ {{ (item.max / 6000).toFixed(3) }} kg
      </div>
      <div v-else>{{ $t("logistics.所有订单") }}</div>
    </template>
  </div>
</template>

<script>
export default {
  props: ["item"],
};
</script>