<template>
  <ul
    v-if="pizzas"
    class="order__list"
  >
    <li
      v-for="pizza in pizzas"
      :key="pizza.id"
      class="order__item"
    >
      <AppProduct :product="productData(pizza)" />

      <p class="order__price">
        {{ getPizzaCost(pizza) }} ₽
      </p>
    </li>
  </ul>
</template>
<script>
export default {
  name: "OrderPizzas",
  props: {
    pizzas: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getPizzaCost(pizza) {
      return pizza.count > 1 ? pizza.count + "x" + pizza.price : pizza.price;
    },
    productData(pizza) {
      return {
        name: pizza.name,
        size: pizza.size.name,
        dough: pizza.dough.value === "light" ? "тонком" : "толстом",
        sauce: pizza.sauce.name.toLowerCase(),
        fillings: pizza.fillings
          .map((filling) => filling.name.toLowerCase())
          .join(", "),
      };
    },
  },
};
</script>
