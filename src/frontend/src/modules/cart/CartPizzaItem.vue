<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizza.name"
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

    <ItemCounter
      class="cart-list__counter"
      :value="pizza.count"
      @clickButton="clickButton"
    />

    <div class="cart-list__price">
      <b>{{ pizza.price * pizza.count }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button
        type="button"
        class="cart-list__edit"
        @click="changePizza"
      >
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { RESET_BUILDER } from "@/store/mutation-types";

export default {
  name: "CartPizzaItem",
  props: {
    "pizza": {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations("Builder", {
      resetBuilder: RESET_BUILDER,
    }),
    ...mapActions("Builder", ["editPizza"]),
    ...mapActions("Cart", ["changeCountPizza"]),
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
    clickButton(operation) {
      this.changeCountPizza({ ...this.pizza, operation });
    },
    changePizza() {
      this.resetBuilder();
      this.editPizza(this.pizza);
      this.$router.push("/");
    },
  },
};
</script>
