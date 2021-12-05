<template>
  <div class="ingredients__sauce" v-if="sauces.length">
    <p>Основной соус:</p>

    <BuilderSelectorItem
      class="radio ingredients__input"
      v-for="sauce in sauces"
      :key="sauce.id"
      :selector="sauce"
      @clickSelectorItem="$emit('selectSauce', $event)"
    />
  </div>
</template>

<script>
import BuilderSelectorItem from "@/modules/builder/components/BuilderSelectorItem";

export default {
  name: "BuilderSauceSelector",
  components: { BuilderSelectorItem },
  props: {
    sauces: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
