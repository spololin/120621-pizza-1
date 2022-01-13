<template>
  <div class="content__result">
    <p>Итого: {{ pizzaPrice }} ₽</p>
    <Button
      :disabled="validateBuilder"
      type="button"
      @onClick="onClick"
    >
      Готовьте!
    </Button>
  </div>
</template>

<script>
import Button from "@/common/components/AppButton";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { RESET_BUILDER } from "@/store/mutation-types";
export default {
  name: "BuilderPriceCounter",
  components: { Button },
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
