<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        :value="name"
        @input="$emit('changeNamePizza', $event)"
      >
    </label>

    <BuilderPizzaView
      :pizza-class="pizzaClass"
      :fillings="fillings"
      @dropFilling="dropFilling"
    />
    <BuilderPriceCounter
      :price="price"
      :fillings="fillings"
      :name="name"
    />
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
    selectedItems: {
      type: Object,
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
  computed: {
    pizzaClass() {
      const basePartClass = "pizza--foundation--";
      const doughPartClass =
        this.selectedItems.dough.value === "light" ? "small" : "big";
      const saucePartClass = this.selectedItems.sauce.value;

      return basePartClass + doughPartClass + "-" + saucePartClass;
    },
  },
  methods: {
    dropFilling(filling) {
      this.$emit("dropFilling", filling);
    },
  },
};
</script>
