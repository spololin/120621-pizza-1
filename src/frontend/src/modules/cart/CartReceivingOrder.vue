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
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
        >
      </label>

      <div
        v-if="typeReceiving > 1"
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
            >
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "CartReceivingOrder",
  data() {
    return {
      typeReceiving: 1,
      addressStreet: "",
      addressHome: "",
      addressRoom: "",
      listTypeReceiving: [
        {
          id: "1",
          name: "Заберу сам",
        },
        {
          id: "2",
          name: "Новый адрес",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("User", ["isAuth"]),
    ...mapState("User", ["addresses"]),
    listAddresses() {
      return this.listTypeReceiving.concat(this.isAuth ? this.addresses : []);
    },
  },
  watch: {
    typeReceiving(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (+newValue === 2) {
          this.addressStreet = "";
          this.addressHome = "";
          this.addressRoom = "";
        }
        if (+newValue > 2) {
          const address = this.listAddresses.find(elem => elem.id === newValue);
          this.addressStreet = address.street;
          this.addressHome = address.home;
          this.addressRoom = address.room;
        }
      }
    },
  },
};
</script>
