<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        alt="Капричоза"
      >
      <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <ul>
          <li>{{ getSizeAndDough(pizza) }}</li>
          <li>{{ getSauce(pizza) }}</li>
          <li>{{ getFillings(pizza) }}</li>
        </ul>
      </div>
    </div>

    <div class="counter cart-list__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        type="text"
        name="counter"
        class="counter__input"
        value="1"
      >
      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ pizza.price }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button
        type="button"
        class="cart-list__edit"
      >
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: "CartPizzaItem",
  props: {
    "pizza": {
      type: Object,
      required: true,
    },
  },
  methods: {
    getSizeAndDough(pizza) {
      return `${pizza.selectedSize.name} на ${pizza.selectedDough.value === "light" ? "тонком" : "толстом"} тесте`;
    },
    getSauce(pizza) {
      return `Соус: ${pizza.selectedSauce.name.toLowerCase()}`;
    },
    getFillings(pizza) {
      const fillings = pizza.selectedFillings.map(filling => filling.name.toLowerCase());
      return `Начинка: ${fillings.join(", ")}`;
    },
  },
};
</script>
