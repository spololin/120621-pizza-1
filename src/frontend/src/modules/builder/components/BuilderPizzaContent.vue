<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        :value="buildingPizzaName"
        @input="$emit('changeNamePizza', $event)"
      >
    </label>

    <BuilderPizzaView
      @dropFilling="dropFilling"
    />
    <BuilderPriceCounter />
  </div>
</template>

<script>
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { mapGetters } from "vuex";

export default {
  name: "BuilderPizzaContent",
  components: {
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  computed: {
    ...mapGetters("Builder", ["buildingPizzaName"]),
  },
  methods: {
    dropFilling(filling) {
      this.$emit("dropFilling", filling);
    },
  },
};
</script>
