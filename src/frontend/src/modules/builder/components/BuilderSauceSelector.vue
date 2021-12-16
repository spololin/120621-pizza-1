<template>
  <div
    v-if="sauces.length"
    class="ingredients__sauce"
  >
    <p>Основной соус:</p>

    <BuilderSelectorItem
      v-for="sauce in sauces"
      :key="sauce.id"
      class="radio ingredients__input"
      :selector="sauce"
      @clickSelectorItem="$emit('selectSauce', $event)"
    />
  </div>
</template>

<script>
import BuilderSelectorItem from "@/modules/builder/components/BuilderSelectorItem";

export default {
  name: "BuilderSauceSelector",
  components: { BuilderSelectorItem, },
  props: {
    sauces: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
