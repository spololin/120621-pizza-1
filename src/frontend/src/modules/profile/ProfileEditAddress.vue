<template>
  <div class="layout__address">
    <form
      action=""
      method="post"
      class="address-form address-form--opened sheet"
      @submit.prevent="submit"
    >
      <div class="address-form__header">
        <b>Адрес №1</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <input
              v-model="editAddressForm.name"
              type="text"
              name="addr-name"
              placeholder="Введите название адреса"
              required
            >
          </label>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <label class="input">
            <span>Улица*</span>
            <input
              v-model="editAddressForm.street"
              type="text"
              name="addr-street"
              placeholder="Введите название улицы"
              required
            >
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Дом*</span>
            <input
              v-model="editAddressForm.building"
              type="text"
              name="addr-house"
              placeholder="Введите номер дома"
              required
            >
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира</span>
            <input
              v-model="editAddressForm.flat"
              type="text"
              name="addr-apartment"
              placeholder="Введите № квартиры"
            >
          </label>
        </div>
        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <input
              v-model="editAddressForm.comment"
              type="text"
              name="addr-comment"
              placeholder="Введите комментарий"
            >
          </label>
        </div>
      </div>

      <div class="address-form__buttons">
        <AppButton
          v-if="isEdit"
          class="button--transparent"
        >
          Удалить
        </AppButton>
        <AppButton>
          Сохранить
        </AppButton>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { POST_ADDRESS } from "@/store/mutation-types";

export default {
  name: "ProfileEditAddress",
  computed: {
    ...mapState("Addresses", ["editAddressForm", "isEdit"]),
  },
  methods: {
    ...mapActions("Addresses", {
      postAddress: POST_ADDRESS,
    }),
    submit() {
      this.postAddress();
    },
  },
};
</script>
