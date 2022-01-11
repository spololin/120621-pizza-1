<template>
  <AppDrop @drop="drop">
    <div class="content__constructor">
      <div
        class="pizza"
        :class="classPizza"
      >
        <div class="pizza__wrapper">
          <div
            v-for="filling in selectedFillings"
            :key="filling.id"
            class="pizza__filling"
            :class="classFilling(filling)"
          />
        </div>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BuilderPizzaView",
  components: { AppDrop },
  computed: {
    ...mapGetters("Builder", ["selectedFillings", "selectedDough", "selectedSauce"]),
    classPizza() {
      const basePartClass = "pizza--foundation--";
      const doughPartClass =
        this.selectedDough.value === "light" ? "small" : "big";
      const saucePartClass = this.selectedSauce.value;

      return basePartClass + doughPartClass + "-" + saucePartClass;
    },
  },
  methods: {
    ...mapActions(["drop"]),
    classFilling(filling) {
      let customClass = {};
      customClass[`pizza__filling--${filling.value}`] = true;
      switch (filling.count) {
        case 2:
          customClass["pizza__filling--second"] = true;
          break;
        case 3:
          customClass["pizza__filling--third"] = true;
          break;
        default:
          break;
      }

      return customClass;
    },
  },
};
</script>
