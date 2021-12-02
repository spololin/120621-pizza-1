<template>
  <div class="content__result">
    <p>Итого: {{ pizzaParams.price }} ₽</p>
    <Button :disabled="!pizzaParams.validate"> Готовьте! </Button>
  </div>
</template>

<script>
import Button from "@/common/components/Button";
export default {
  name: "BuilderPriceCounter",
  components: { Button },
  props: {
    pizzaParams: {
      type: Object,
      required: true,
    },
  },
};
</script>
