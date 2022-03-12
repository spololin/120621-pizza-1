<template>
  <div
    class="product"
    v-bind="$attrs"
  >
    <img
      src="public/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="product.name"
    >
    <div class="product__text">
      <h2>{{ product.name }}</h2>
      <ul>
        <li>{{ product.size }}, на {{ product.dough }} тесте</li>
        <li>Соус: {{ product.sauce }}</li>
        <li>Начинка: {{ product.fillings }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "AppProduct",
  props: {
    product: {
      type: Object,
      default() {
        return {
          name: "",
          size: "",
          dough: "",
          sauce: "",
          fillings: "",
        };
      },
    },
  },
};
</script>
