import {
  EXPAND_ADDRESS_FORM,
  GET_ADDRESSES,
  POST_ADDRESS,
  EDIT_ADDRESS,
  DELETE_ADDRESS,
  CHANGE_ADDRESS,
  SET_PHONE_ORDER,
  SET_TYPE_RECEIVING,
  CHANGE_FORM_RECEIVING_VALUE,
} from "@/store/mutation-types";

const initialAddressForm = () => ({
  name: "",
  street: "",
  building: "",
  flat: "",
  comment: "",
});

export default {
  namespaced: true,
  state: {
    addresses: [],
    editAddressForm: initialAddressForm(),
    expandAddressForm: false,
    isEdit: false,
    typeReceiving: "myself",
    receivingForm: {
      phone: "",
      street: "",
      building: "",
      flat: "",
    },
  },
  actions: {
    async getAddresses({ commit }) {
      const data = await this.$api.addresses.query();
      commit(GET_ADDRESSES, data);
    },
    async [POST_ADDRESS]({ state, commit, rootState } ) {
      const method = state.editAddressForm.id ? "put" : "post";
      const data = await this.$api.addresses[method]({
        ...state.editAddressForm,
        userId: rootState.User.user?.id ?? null,
      });

      switch (method) {
        case "post":
          commit(POST_ADDRESS, data);
          break;
        case "put":
          commit(CHANGE_ADDRESS);
          break;
      }
    },
    async [DELETE_ADDRESS]({ state, commit }) {
      await this.$api.addresses.delete(state.editAddressForm.id);
      commit(DELETE_ADDRESS);
    },
  },
  mutations: {
    [GET_ADDRESSES](state, addresses) {
      state.addresses = addresses;
    },
    [POST_ADDRESS](state, address) {
      state.addresses.push(address);
      state.editAddressForm = initialAddressForm();
      state.expandAddressForm = false;
    },
    [EXPAND_ADDRESS_FORM](state) {
      state.isEdit = false;
      state.expandAddressForm = true;
    },
    [EDIT_ADDRESS](state, address) {
      state.editAddressForm = { ...address };
      state.isEdit = true;
      state.expandAddressForm = true;
    },
    [CHANGE_ADDRESS](state) {
      const idx = state.addresses.findIndex(a => a.id === state.editAddressForm.id);

      state.addresses = [
        ...state.addresses.slice(0, idx),
        { ...state.editAddressForm },
        ...state.addresses.slice(idx + 1),
      ];
      state.editAddressForm = initialAddressForm();
      state.expandAddressForm = false;
    },
    [DELETE_ADDRESS](state) {
      const idx = state.addresses.findIndex(a => a.id === state.editAddressForm.id);

      state.addresses = [
        ...state.addresses.slice(0, idx),
        ...state.addresses.slice(idx + 1),
      ];
      state.editAddressForm = initialAddressForm();
      state.expandAddressForm = false;
    },
    [SET_PHONE_ORDER](state, value) {
      state.receivingForm.phone = value;
    },
    [SET_TYPE_RECEIVING](state, value) {
      state.typeReceiving = value;

      if (value === "new") {
        state.receivingForm.street = "";
        state.receivingForm.building = "";
        state.receivingForm.flat = "";
      }

      if (!isNaN(+value)) {
        const address = state.addresses.find(elem => elem.id === value);

        state.receivingForm.street = address.street;
        state.receivingForm.building = address.building;
        state.receivingForm.flat = address.flat;
      }
    },
    [CHANGE_FORM_RECEIVING_VALUE](state, data) {
      state.receivingForm[data.type] = data.value;
    },
  },
  getters: {
    addressForOrder: state => {
      if (!isNaN(+state.typeReceiving)) {
        const address = state.addresses.find(elem => elem.id === state.typeReceiving);

        return {
          street: address.street,
          building: address.building,
          flat: address.flat,
        };
      }

      if (state.typeReceiving === "new") {
        return {
          street: state.receivingForm.street,
          building: state.receivingForm.building,
          flat: state.receivingForm.flat,
        };
      }

      if (state.typeReceiving === "myself") {
        return {
          street: null,
          building: null,
          flat: null,
        };
      }
    },
  },
};
