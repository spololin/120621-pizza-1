<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          v-model="typeReceiving"
          name="test"
          class="select"
        >
          <option
            v-for="typeAddress in listAddresses"
            :key="typeAddress.id"
            :value="typeAddress.id"
          >{{ typeAddress.name }}</option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          v-model="valuePhone"
          type="text"
          name="tel"
          required
          placeholder="+7 999-999-99-99"
        >
      </label>

      <div
        v-if="typeReceiving === 'new' || +typeReceiving"
        class="cart-form__address"
      >
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              :value="addressStreet"
              :disabled="disabledInput"
            >
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="house"
              :value="addressHome"
              :disabled="disabledInput"
            >
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="apartment"
              :value="addressRoom"
              :disabled="disabledInput"
            >
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import { SET_PHONE_ORDER } from "@/store/mutation-types";

export default {
  name: "CartReceivingOrder",
  data() {
    return {
      typeReceiving: "myself",
      addressStreet: "",
      addressHome: "",
      addressRoom: "",
      listTypeReceiving: [
        {
          id: "myself",
          name: "Заберу сам",
        },
        {
          id: "new",
          name: "Новый адрес",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("User", ["isAuth"]),
    ...mapState("Addresses", ["addresses"]),
    ...mapState("Cart", ["phone"]),
    listAddresses() {
      return this.listTypeReceiving.concat(this.isAuth ? this.addresses : []);
    },
    disabledInput() {
      return this.typeReceiving !== "new";
    },
    valuePhone: {
      get() {
        return this.phone;
      },
      set(value) {
        this.setPhoneOrder(value);
      },
    },
  },
  watch: {
    typeReceiving(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue === "new") {
          this.addressStreet = "";
          this.addressHome = "";
          this.addressRoom = "";
        }
        if (!isNaN(+newValue)) {
          const address = this.listAddresses.find(elem => elem.id === newValue);

          this.addressStreet = address.street;
          this.addressHome = address.building;
          this.addressRoom = address.flat;
        }
      }
    },
  },
  methods: {
    ...mapMutations("Cart", {
      setPhoneOrder: SET_PHONE_ORDER,
    }),
  },
};
</script>
