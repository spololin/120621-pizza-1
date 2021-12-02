<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        v-model="pizzaParams.name"
      />
    </label>

    <BuilderPizzaView />
    <BuilderPriceCounter :pizzaParams="pizzaParams" />
  </div>
</template>

<script>
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "BuilderPizzaContent",
  components: {
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  props: {
    pizzaParams: {
      type: Object,
      required: true,
    },
  },
};
</script>
