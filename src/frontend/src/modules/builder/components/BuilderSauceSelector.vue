<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <BuilderSelectorItem
      v-for="sauce in builder.sauces"
      :key="sauce.id"
      class="radio ingredients__input"
      :selector="sauce"
    />
  </div>
</template>

<script>
import BuilderSelectorItem from "@/modules/builder/components/BuilderSelectorItem";
import { mapState } from "vuex";

export default {
  name: "BuilderSauceSelector",
  components: { BuilderSelectorItem },
  computed: {
    ...mapState("Builder", ["builder"]),
  },
};
</script>
