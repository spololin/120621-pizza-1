<template>
  <section class="footer">
    <div class="footer__more">
      <a
        class="button button--border button--arrow"
        @click.prevent="toHome"
      >
        Хочу еще одну
      </a>
    </div>
    <p class="footer__text">
      Перейти к конструктору<br>чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ totalCost }} ₽</b>
    </div>

    <div class="footer__submit">
      <button
        type="submit"
        class="button"
        @click.prevent="checkout"
      >
        Оформить заказ
      </button>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { RESET_BUILDER, RESET_PIZZA_CART } from "@/store/mutation-types";

export default {
  name: "CartFooter",
  computed: {
    ...mapGetters("Cart", ["totalCost"]),
  },
  methods: {
    ...mapMutations("Builder", {
      resetBuilder: RESET_BUILDER,
    }),
    ...mapMutations("Cart", {
      resetPizzaState: RESET_PIZZA_CART,
    }),
    toHome() {
      this.resetBuilder();
      this.$router.push("/");
    },
    checkout() {
      this.resetBuilder();
      this.resetPizzaState();
      this.$router.push("/thanks");
    },
  },
};
</script>
