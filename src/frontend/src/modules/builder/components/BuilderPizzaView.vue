<template>
  <AppDrop @drop="dropFilling">
    <div class="content__constructor">
      <div
        class="pizza"
        :class="pizzaClass"
      >
        <div class="pizza__wrapper">
          <div
            v-for="filling in fillings"
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
export default {
  name: "BuilderPizzaView",
  components: { AppDrop },
  props: {
    pizzaClass: {
      type: String,
      required: true,
    },
    fillings: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
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
    dropFilling(filling) {
      this.$emit("dropFilling", filling);
    },
  },
};
</script>
