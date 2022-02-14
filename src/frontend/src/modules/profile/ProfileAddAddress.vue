<template>
  <div class="layout__button">
    <AppButton
      class="button--border"
      @onClick="expandAddressForm()"
    >
      Добавить новый адрес
    </AppButton>
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
