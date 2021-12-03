<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <Button> Готовьте! </Button>
  </div>
</template>

<script>
import Button from "@/common/components/Button";
export default {
  name: "BuilderPriceCounter",
  components: { Button },
  props: {
    price: {
      type: Number,
      required: true,
    },
  },
};
</script>
