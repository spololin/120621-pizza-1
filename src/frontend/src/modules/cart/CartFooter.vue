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
import { mapActions, mapGetters, mapMutations } from "vuex";
import { RESET_BUILDER } from "@/store/mutation-types";

export default {
  name: "CartFooter",
  computed: {
    ...mapGetters("Cart", ["totalCost"]),
  },
  methods: {
    ...mapActions("Cart", ["sendOrder", "resetPizzaState"]),
    ...mapMutations("Builder", {
      resetBuilder: RESET_BUILDER,
    }),
    toHome() {
      this.resetBuilder();
      this.$router.push("/");
    },
    checkout() {
      this.sendOrder();
      this.resetBuilder();
      this.resetPizzaState();
      this.$router.push("/thanks");
    },
  },
};
</script>
