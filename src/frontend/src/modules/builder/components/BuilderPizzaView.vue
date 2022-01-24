<template>
  <AppDrop @drop="drop">
    <div class="content__constructor">
      <div
        class="pizza"
        :class="classPizza"
      >
        <div class="pizza__wrapper">
          <BuilderPizzaViewIngredient
            v-for="filling in selectedFillings"
            :key="filling.id"
            :filling="filling"
          />
        </div>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import { mapActions, mapGetters } from "vuex";
import BuilderPizzaViewIngredient from "@/modules/builder/components/BuilderPizzaViewIngredient";

export default {
  name: "BuilderPizzaView",
  components: { BuilderPizzaViewIngredient, AppDrop },
  computed: {
    ...mapGetters("Builder", ["selectedFillings", "selectedDough", "selectedSauce"]),
    classPizza() {
      if (this.selectedDough && this.selectedSauce) {
        const basePartClass = "pizza--foundation--";
        const doughPartClass =
          this.selectedDough.value === "light" ? "small" : "big";
        const saucePartClass = this.selectedSauce.value;

        return basePartClass + doughPartClass + "-" + saucePartClass;
      }

      return "";
    },
  },
  methods: {
    ...mapActions(["drop"]),
  },
};
</script>
