<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <AppInput
        v-model="valueName"
        name="pizza_name"
        placeholder="Введите название пиццы"
        required
      />
    </label>

    <BuilderPizzaView />
    <BuilderPriceCounter />
  </div>
</template>

<script>
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { mapState, mapMutations } from "vuex";
import { SET_NAME_PIZZA } from "@/store/mutation-types";

export default {
  name: "BuilderPizzaContent",
  components: {
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  computed: {
    ...mapState("Builder", ["builder"]),
    valueName: {
      get() {
        return this.builder.name;
      },
      set(value) {
        this.setNamePizza(value);
      },
    },
  },
  methods: {
    ...mapMutations("Builder", {
      setNamePizza: SET_NAME_PIZZA,
    }),
  },
};
</script>
