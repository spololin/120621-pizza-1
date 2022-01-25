<template>
  <div class="layout__button">
    <button
      type="button"
      class="button button--border"
      @click="expandAddressForm()"
    >
      Добавить новый адрес
    </button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { EXPAND_ADDRESS_FORM } from "@/store/mutation-types";

export default {
  name: "ProfileAddAddress",
  methods: {
    ...mapMutations("Addresses", {
      expandAddressForm: EXPAND_ADDRESS_FORM,
    }),
  },
};
</script>
