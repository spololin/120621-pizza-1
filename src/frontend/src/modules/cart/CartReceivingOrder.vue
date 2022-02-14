<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          v-model="valueTypeReceiving"
          name="test"
          class="select"
        >
          <option
            v-for="typeReceiving in listReceivingTypes"
            :key="typeReceiving.id"
            :value="typeReceiving.id"
          >
            {{ typeReceiving.name }}
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <AppInput
          v-model="valuePhone"
          type="tel"
          name="tel"
          placeholder="+7 999-999-99-99"
          required
        />
      </label>

      <div
        v-if="typeReceiving === 'new' || +typeReceiving"
        class="cart-form__address"
      >
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <AppInput
              v-model="receivingFormStreet"
              name="street"
              :disabled="disabledInput"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <AppInput
              v-model="receivingFormBuilding"
              name="house"
              :disabled="disabledInput"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <AppInput
              v-model="receivingFormFlat"
              name="apartment"
              :disabled="disabledInput"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import {
  CHANGE_FORM_RECEIVING_VALUE,
  SET_PHONE_ORDER,
  SET_TYPE_RECEIVING,
} from "@/store/mutation-types";
import { receivingDefaultTypes } from "@/common/helpers";

export default {
  name: "CartReceivingOrder",
  computed: {
    ...mapGetters("User", ["isAuth"]),
    ...mapState("Addresses", ["addresses", "typeReceiving", "receivingForm"]),
    listReceivingTypes() {
      return receivingDefaultTypes().concat(this.isAuth ? this.addresses : []);
    },
    disabledInput() {
      return this.typeReceiving !== "new";
    },
    valuePhone: {
      get() {
        return this.receivingForm.phone;
      },
      set(value) {
        this.setPhoneOrder(value);
      },
    },
    valueTypeReceiving: {
      get() {
        return this.typeReceiving;
      },
      set(value) {
        this.setTypeReceiving(value);
      },
    },
    receivingFormStreet: {
      get() {
        return this.receivingForm.street;
      },
      set(value) {
        this.changeFormReceivingValue({
          form: "receivingForm",
          field: "street",
          value,
        });
      },
    },
    receivingFormBuilding: {
      get() {
        return this.receivingForm.building;
      },
      set(value) {
        this.changeFormReceivingValue({
          form: "receivingForm",
          field: "building",
          value,
        });
      },
    },
    receivingFormFlat: {
      get() {
        return this.receivingForm.flat;
      },
      set(value) {
        this.changeFormReceivingValue({
          form: "receivingForm",
          field: "flat",
          value,
        });
      },
    },
  },
  methods: {
    ...mapMutations("Addresses", {
      setPhoneOrder: SET_PHONE_ORDER,
      setTypeReceiving: SET_TYPE_RECEIVING,
      changeFormReceivingValue: CHANGE_FORM_RECEIVING_VALUE,
    }),
  },
};
</script>
