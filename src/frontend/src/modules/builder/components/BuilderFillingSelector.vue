<template>
  <div
    v-if="buildingPizza.fillings.length"
    class="ingredients__filling"
  >
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <BuilderIngredientsItem
        v-for="filling in buildingPizza.fillings"
        :key="filling.id"
        :filling="filling"
      />
    </ul>
  </div>
</template>

<script>
import BuilderIngredientsItem from "@/modules/builder/components/BuilderIngredientsItem";
import { mapGetters } from "vuex";
export default {
  name: "BuilderIngredientsSelector",
  components: { BuilderIngredientsItem },
  computed: {
    ...mapGetters("Builder", ["buildingPizza"]),
  },
};
</script>
