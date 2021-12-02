<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough" v-if="doughs.length">
        <BuilderSelectorItem
          class="dough__input"
          v-for="dough in doughs"
          :key="dough.id"
          :selector="{ ...dough, type: 'dough' }"
          :class="`dough__input--${dough.value}`"
          @clickSelectorItem="$emit('clickDoughSelector', $event)"
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
