<template>
  <div
    v-if="buildingPizza.sauces.length"
    class="ingredients__sauce"
  >
    <p>Основной соус:</p>

    <BuilderSelectorItem
      v-for="sauce in buildingPizza.sauces"
      :key="sauce.id"
      class="radio ingredients__input"
      :selector="sauce"
      @clickSelectorItem="$emit('selectSauce', $event)"
    />
  </div>
</template>

<script>
import BuilderSelectorItem from "@/modules/builder/components/BuilderSelectorItem";
import { mapGetters } from "vuex";

export default {
  name: "BuilderSauceSelector",
  components: { BuilderSelectorItem },
  computed: {
    ...mapGetters("Builder", ["buildingPizza"]),
  },
};
</script>
