<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        :value="buildingPizzaName"
        @input="changeNamePizza($event.target.value)"
      >
    </label>

    <BuilderPizzaView />
    <BuilderPriceCounter />
  </div>
</template>

<script>
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { mapActions, mapGetters } from "vuex";

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
    ...mapActions("Builder", ["changeNamePizza"]),
  },
};
</script>
