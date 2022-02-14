<template>
  <div class="content__result">
    <p>Итого: {{ pizzaPrice }} ₽</p>
    <AppButton
      :disabled="validateBuilder"
      @onClick="onClick"
    >
      Готовьте!
    </AppButton>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { RESET_BUILDER } from "@/store/mutation-types";
export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapGetters("Builder", ["validateBuilder", "pizzaPrice"]),
  },
  methods: {
    ...mapActions("Cart", ["addToCart"]),
    ...mapMutations("Builder", {
      resetBuilder: RESET_BUILDER,
    }),
    onClick() {
      this.addToCart();
      this.resetBuilder();
    },
  },
};
</script>
