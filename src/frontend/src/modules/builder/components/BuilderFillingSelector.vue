<template>
  <div
    v-if="fillings.length"
    class="ingredients__filling"
  >
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <BuilderIngredientsItem
        v-for="filling in fillings"
        :key="filling.id"
        :filling="filling"
        @clickButtonItemCounter="clickButtonItemCounter"
      />
    </ul>
  </div>
</template>

<script>
import BuilderIngredientsItem from "@/modules/builder/components/BuilderIngredientsItem";
export default {
  name: "BuilderIngredientsSelector",
  components: { BuilderIngredientsItem, },
  props: {
    fillings: {
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
