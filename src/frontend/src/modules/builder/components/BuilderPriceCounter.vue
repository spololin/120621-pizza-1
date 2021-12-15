<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <Button :disabled="!(fillings.length && name.length)">
      Готовьте!
    </Button>
  </div>
</template>

<script>
import Button from "@/common/components/AppButton";
export default {
  name: "BuilderPriceCounter",
  components: { Button },
  props: {
    price: {
      type: Number,
      required: true,
    },
    fillings: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
