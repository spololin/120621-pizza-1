<template>
  <div class="layout__address">
    <form
      action=""
      method="post"
      class="address-form address-form--opened sheet"
      @submit.prevent="postAddress()"
    >
      <div class="address-form__header">
        <b>{{ editAddressForm.name }}</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <AppInput
              v-model="editAddressFormName"
              placeholder="Введите название адреса"
              name="addr-name"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <label class="input">
            <span>Улица*</span>
            <AppInput
              v-model="editAddressFormStreet"
              placeholder="Введите название улицы"
              name="addr-street"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Дом*</span>
            <AppInput
              v-model="editAddressFormBuilding"
              placeholder="Введите номер дома"
              name="addr-house"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира</span>
            <AppInput
              v-model="editAddressFormFlat"
              placeholder="Введите № квартиры"
              name="addr-apartment"
              required
            />
          </label>
        </div>
        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <AppInput
              v-model="editAddressFormComment"
              placeholder="Введите комментарий"
              name="addr-comment"
            />
          </label>
        </div>
      </div>

      <div class="address-form__buttons">
        <AppButton
          v-if="isEdit"
          class="button--transparent"
          @onClick="deleteAddress()"
        >
          Удалить
        </AppButton>
        <AppButton type="submit">
          Сохранить
        </AppButton>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import {
  CHANGE_FORM_RECEIVING_VALUE,
  DELETE_ADDRESS,
  POST_ADDRESS,
} from "@/store/mutation-types";

export default {
  name: "ProfileEditAddress",
  computed: {
    ...mapState("Addresses", ["editAddressForm", "isEdit"]),
    editAddressFormName: {
      get() {
        return this.editAddressForm.name;
      },
      set(value) {
        this.changeFormReceivingValue({
          form: "editAddressForm",
          field: "name",
          value,
        });
      },
    },
    editAddressFormStreet: {
      get() {
        return this.editAddressForm.street;
      },
      set(value) {
        this.changeFormReceivingValue({
          form: "editAddressForm",
          field: "street",
          value,
        });
      },
    },
    editAddressFormBuilding: {
      get() {
        return this.editAddressForm.building;
      },
      set(value) {
        this.changeFormReceivingValue({
          form: "editAddressForm",
          field: "building",
          value,
        });
      },
    },
    editAddressFormFlat: {
      get() {
        return this.editAddressForm.flat;
      },
      set(value) {
        this.changeFormReceivingValue({
          form: "editAddressForm",
          field: "flat",
          value,
        });
      },
    },
    editAddressFormComment: {
      get() {
        return this.editAddressForm.comment;
      },
      set(value) {
        this.changeFormReceivingValue({
          form: "editAddressForm",
          field: "comment",
          value,
        });
      },
    },
  },
  methods: {
    ...mapActions("Addresses", {
      postAddress: POST_ADDRESS,
      deleteAddress: DELETE_ADDRESS,
    }),
    ...mapMutations("Addresses", {
      changeFormReceivingValue: CHANGE_FORM_RECEIVING_VALUE,
    }),
  },
};
</script>
