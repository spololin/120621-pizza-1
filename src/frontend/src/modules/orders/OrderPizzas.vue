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
      <div class="product">
        <img
          src="public/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          :alt="pizza.name"
        >
        <div class="product__text">
          <h2>{{ pizza.name }}</h2>
          <ul>
            <li>{{ pizza.size.name }}, на {{ getDough(pizza.dough) }} тесте</li>
            <li>Соус: {{ pizza.sauce.name }}</li>
            <li>Начинка: {{ getFillings(pizza.fillings) }}</li>
          </ul>
        </div>
      </div>

      <p class="order__price">
        {{ pizza.count > 1 ? pizza.count + "x" + pizza.price : pizza.price }} ₽
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
    getFillings(fillings) {
      return fillings.map(f => f.name.toLowerCase()).join(", ");
    },
    getDough(dough) {
      return dough.name.toLowerCase() === "тонкое" ? "тонком" : "толстом";
    },
  },
};
</script>
