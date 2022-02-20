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
      <AppButton
        :disabled="!validateCart"
        @onClick="checkout"
      >
        Оформить заказ
      </AppButton>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import {
  EMPTY_RECEIVING_FORM,
  GET_ADDRESSES,
  POST_ORDER,
  RESET_BUILDER,
  RESET_CART,
} from "@/store/mutation-types";

export default {
  name: "CartFooter",
  computed: {
    ...mapGetters("Cart", ["totalCost", "validateCart"]),
  },
  methods: {
    ...mapMutations("Builder", {
      resetBuilder: RESET_BUILDER,
    }),
    ...mapMutations("Cart", {
      resetCartState: RESET_CART,
    }),
    ...mapActions("Orders", {
      postOrder: POST_ORDER,
    }),
    ...mapActions("Addresses", {
      getAddresses: GET_ADDRESSES,
    }),
    ...mapMutations("Addresses", {
      emptyReceivingForm: EMPTY_RECEIVING_FORM,
    }),
    toHome() {
      this.resetBuilder();
      this.$router.push("/");
    },
    async checkout() {
      const data = await this.postOrder();
      if (data.id) {
        this.$emit("openPopup");
        this.getAddresses();
        this.resetBuilder();
        this.resetCartState();
        this.emptyReceivingForm();
      }
    },
  },
};
</script>
