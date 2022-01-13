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
import { mapMutations } from "vuex";
import {
  CHANGE_COUNT_PIZZA,
  EDIT_PIZZA,
  RESET_BUILDER,
} from "@/store/mutation-types";

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
      editPizza: EDIT_PIZZA,
    }),
    ...mapMutations("Cart", {
      changeCountPizza: CHANGE_COUNT_PIZZA,
    }),
    getSizeAndDough(pizza) {
      return `${pizza.size.name} на ${pizza.dough.value === "light" ? "тонком" : "толстом"} тесте`;
    },
    getSauce(pizza) {
      return `Соус: ${pizza.sauce.name.toLowerCase()}`;
    },
    getFillings(pizza) {
      return `Начинка: ${pizza.fillings.map(filling => filling.name.toLowerCase()).join(", ")}`;
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
