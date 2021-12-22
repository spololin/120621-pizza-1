<template>
  <div class="content__result">
    <p>Итого: {{ buildingPizzaPrice }} ₽</p>
    <Button
      :disabled="disabledCreatePizza"
      type="button"
      @onClick="onClick"
    >
      Готовьте!
    </Button>
  </div>
</template>

<script>
import Button from "@/common/components/AppButton";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "BuilderPriceCounter",
  components: { Button },
  computed: {
    ...mapGetters("Builder", ["disabledCreatePizza", "buildingPizzaPrice", "pizza"]),
  },
  methods: {
    ...mapActions("Cart", ["addToCart"]),
    onClick() {
      this.addToCart(this.pizza);
    },
  },
};
</script>
