<template>
  <div class="content__result">
    <p>Итого: {{ buildingPizzaPrice }} ₽</p>
    <Button :disabled="disabledCreatePizza">
      Готовьте!
    </Button>
  </div>
</template>

<script>
import Button from "@/common/components/AppButton";
import { mapGetters } from "vuex";
export default {
  name: "BuilderPriceCounter",
  components: { Button },
  computed: {
    ...mapGetters("Builder", ["disabledCreatePizza", "buildingPizzaPrice"]),
  },
};
</script>
