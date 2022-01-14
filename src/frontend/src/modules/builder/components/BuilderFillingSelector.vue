<template>
  <div
    class="ingredients__filling"
  >
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <BuilderIngredientsItem
        v-for="filling in builder.fillings"
        :key="filling.id"
        :filling="filling"
      />
    </ul>
  </div>
</template>

<script>
import BuilderIngredientsItem from "@/modules/builder/components/BuilderIngredientsItem";
import { mapState } from "vuex";
export default {
  name: "BuilderIngredientsSelector",
  components: { BuilderIngredientsItem },
  computed: {
    ...mapState("Builder", ["builder"]),
  },
};
</script>
