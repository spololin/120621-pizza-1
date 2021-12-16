<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">
        Выберите ингредиенты
      </h2>

      <div class="sheet__content ingredients">
        <BuilderSauceSelector
          :sauces="sauces"
          @selectSauce="$emit('selectSauce', $event)"
        />
        <BuilderFillingSelector
          :fillings="fillings"
          @clickButtonItemCounter="clickButtonItemCounter"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BuilderFillingSelector from "@/modules/builder/components/BuilderFillingSelector";
import BuilderSauceSelector from "@/modules/builder/components/BuilderSauceSelector";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    BuilderFillingSelector,
    BuilderSauceSelector,
  },
  props: {
    fillings: {
      type: Array,
      default: () => [],
    },
    sauces: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    clickButtonItemCounter: function (filling,) {
      this.$emit("clickButtonItemCounter", filling,);
    },
  },
};
</script>
