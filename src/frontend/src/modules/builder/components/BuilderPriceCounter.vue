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
    ...mapActions("Cart", ["addToCart", "setEditPizza"]),
    ...mapActions("Builder", ["resetBuildState"]),
    onClick() {
      !this.pizza.id ? this.addToCart(this.pizza) : this.setEditPizza(this.pizza);
      this.resetBuildState();
    },
  },
};
</script>
