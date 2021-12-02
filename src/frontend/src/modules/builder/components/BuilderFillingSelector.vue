<template>
  <div class="ingredients__filling" v-if="fillings.length">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <BuilderIngredientsItem
        v-for="filling in fillings"
        :key="filling.id"
        :filling="filling"
      />
    </ul>
  </div>
</template>

<script>
import BuilderIngredientsItem from "@/modules/builder/components/BuilderIngredientsItem";
export default {
  name: "BuilderIngredientsSelector",
  components: { BuilderIngredientsItem },
  props: {
    fillings: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
