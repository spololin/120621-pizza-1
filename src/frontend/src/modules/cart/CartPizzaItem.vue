<template>
  <li class="cart-list__item">
    <AppProduct
      class="cart-list__product"
      :product="productData"
    />

    <ItemCounter
      class="cart-list__counter"
      :value="pizza.count"
      @change="change"
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
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    productData() {
      return {
        name: this.pizza.name,
        size: this.pizza.size.name,
        dough: this.pizza.dough.value === "light" ? "тонком" : "толстом",
        sauce: this.pizza.sauce.name.toLowerCase(),
        fillings: this.pizza.fillings
          .map((filling) => filling.name.toLowerCase())
          .join(", "),
      };
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
    change(operation) {
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
