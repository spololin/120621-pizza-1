<template>
  <label v-bind="$attrs">
    <RadioButton
      class="visually-hidden"
      :params="selector"
      @selected="updateSelectorItem(selector)"
    />
    <b v-if="selector.type === 'doughs'">{{ selector.name }}</b>
    <span>{{
      selector.type === "doughs" ? selector.description : selector.name
    }}</span>
  </label>
</template>

<script>
import RadioButton from "@/common/components/AppRadioButton";
import { mapMutations } from "vuex";
import { UPDATE_SELECTOR_ITEM } from "@/store/mutation-types";

export default {
  name: "BuilderSelectorItem",
  components: { RadioButton },
  props: {
    selector: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations("Builder", {
      updateSelectorItem: UPDATE_SELECTOR_ITEM,
    }),
  },
};
</script>
