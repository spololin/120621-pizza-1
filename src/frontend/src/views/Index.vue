<template>
  <main class="content">
    <form
      action="#"
      method="post"
    >
      <div class="content__wrapper">
        <h1 class="title title--big">
          Конструктор пиццы
        </h1>

        <BuilderDoughSelector
          :doughs="pizza.doughs"
          @selectDough="clickSelectorItem"
        />
        <BuilderSizeSelector
          :sizes="pizza.sizes"
          @selectSize="clickSelectorItem"
        />
        <BuilderIngredientsSelector
          :fillings="pizza.fillings"
          :sauces="pizza.sauces"
          @selectSauce="clickSelectorItem"
          @clickButtonItemCounter="clickButtonItemCounter"
        />

        <BuilderPizzaContent
          :price="totalPrice"
          :selected-items="selectedItems"
          :fillings="selectedFillings"
          :name="pizza.name"
          @changeNamePizza="$emit('inputName', $event)"
          @dropFilling="dropFilling"
        />
      </div>
    </form>
  </main>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaContent from "@/modules/builder/components/BuilderPizzaContent";

export default {
  name: "IndexView",
  components: {
    BuilderPizzaContent,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
  },
  props: {
    pizza: {
      type: Object,
      required: true,
    },
    selectedItems: {
      type: Object,
      required: true,
    },
    selectedFillings: {
      type: Array,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    clickSelectorItem: function (selector) {
      this.$emit("clickSelectorItem", selector);
    },
    clickButtonItemCounter: function (filling) {
      this.$emit("clickButtonItemCounter", filling);
    },
    dropFilling(filling) {
      this.$emit("dropFilling", filling);
    },
  },
};
</script>
