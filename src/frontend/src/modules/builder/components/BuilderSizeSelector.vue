<template>
  <div class="content__diameter">
    <div
      v-if="sizes.length"
      class="sheet"
    >
      <h2 class="title title--small sheet__title">
        Выберите размер
      </h2>

      <div class="sheet__content diameter">
        <BuilderSelectorItem
          v-for="size in sizes"
          :key="size.id"
          class="diameter__input"
          :class="`diameter__input--${size.value}`"
          :selector="size"
          @clickSelectorItem="$emit('selectSize', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BuilderSelectorItem from "@/modules/builder/components/BuilderSelectorItem";
export default {
  name: "BuilderSizeSelector",
  components: { BuilderSelectorItem, },
  props: {
    sizes: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style></style>
