<template>
  <div class="layout__address">
    <div class="sheet address-form">
      <div class="address-form__header">
        <b>{{ address.name }}</b>
        <div class="address-form__edit">
          <button
            type="button"
            class="icon"
            @click="editAddress(address)"
          >
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>{{ `${address.street}, д. ${address.building}${address.flat ? ', кв. ' + address.flat : ''}` }}</p>
      <small>{{ address.comment }}</small>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { EDIT_ADDRESS } from "@/store/mutation-types";

export default {
  name: "ProfileAddress",
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations("Addresses", {
      editAddress: EDIT_ADDRESS,
    }),
  },
};
</script>
