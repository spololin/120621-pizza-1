<template>
  <p class="order__address">
    Адрес доставки: {{ addressName }}
  </p>
</template>
<script>
export default {
  name: "OrderAddress",
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
  computed: {
    addressName() {
      return this.address?.name ?? "Самовывоз";
    },
  },
};
</script>
