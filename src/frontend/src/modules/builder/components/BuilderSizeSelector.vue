<template>
  <div class="content__diameter">
    <div
      v-if="buildingPizza.sizes.length"
      class="sheet"
    >
      <h2 class="title title--small sheet__title">
        Выберите размер
      </h2>

      <div class="sheet__content diameter">
        <BuilderSelectorItem
          v-for="size in buildingPizza.sizes"
          :key="size.id"
          class="diameter__input"
          :class="`diameter__input--${size.value}`"
          :selector="size"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BuilderSelectorItem from "@/modules/builder/components/BuilderSelectorItem";
import { mapGetters } from "vuex";
export default {
  name: "BuilderSizeSelector",
  components: { BuilderSelectorItem },
  computed: {
    ...mapGetters("Builder", ["buildingPizza"]),
  },
};
</script>

<style></style>
