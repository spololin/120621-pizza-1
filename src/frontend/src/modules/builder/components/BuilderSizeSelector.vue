<template>
  <div class="content__diameter">
    <div class="sheet" v-if="sizes.length">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <BuilderSelectorItem
          class="diameter__input"
          v-for="size in sizes"
          :key="size.id"
          :class="`diameter__input--${size.value}`"
          :selector="{ ...size, type: 'diameter' }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BuilderSelectorItem from "@/modules/builder/components/BuilderSelectorItem";
export default {
  name: "BuilderSizeSelector",
  components: { BuilderSelectorItem },
  props: {
    sizes: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style></style>
