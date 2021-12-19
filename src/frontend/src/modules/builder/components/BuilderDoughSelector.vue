<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">
        Выберите тесто
      </h2>

      <div
        v-if="buildingPizza.doughs.length"
        class="sheet__content dough"
      >
        <BuilderSelectorItem
          v-for="dough in buildingPizza.doughs"
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
import { mapGetters } from "vuex";
export default {
  name: "BuilderDoughSelector",
  components: { BuilderSelectorItem },
  computed: {
    ...mapGetters("Builder", ["buildingPizza"]),
  },
};
</script>
