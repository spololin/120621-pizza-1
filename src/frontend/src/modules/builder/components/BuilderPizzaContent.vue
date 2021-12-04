<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
      />
    </label>

    <BuilderPizzaView :pizzaClass="pizzaClass" />
    <BuilderPriceCounter :price="price" />
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
    price: {
      type: Number,
      required: true,
    },
    pizzaClass: {
      type: String,
      required: true,
    },
  },
};
</script>
