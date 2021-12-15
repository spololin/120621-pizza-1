<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">
        Выберите тесто
      </h2>

      <div
        v-if="doughs.length"
        class="sheet__content dough"
      >
        <BuilderSelectorItem
          v-for="dough in doughs"
          :key="dough.id"
          class="dough__input"
          :selector="dough"
          :class="`dough__input--${dough.value}`"
          @clickSelectorItem="$emit('selectDough', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BuilderSelectorItem from "@/modules/builder/components/BuilderSelectorItem";
export default {
  name: "BuilderDoughSelector",
  components: { BuilderSelectorItem },
  props: {
    doughs: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
