import {
  EXPAND_ADDRESS_FORM,
  GET_ADDRESSES,
  POST_ADDRESS,
  EDIT_ADDRESS,
  DELETE_ADDRESS,
  SET_PHONE_ORDER,
  SET_TYPE_RECEIVING,
  CHANGE_FORM_RECEIVING_VALUE,
  EMPTY_RECEIVING_FORM,
} from "@/store/mutation-types";

const initialAddressForm = () => ({
  name: "",
  street: "",
  building: "",
  flat: "",
  comment: "",
});

const initialReceivingForm = () => ({
  phone: "",
  street: "",
  building: "",
  flat: "",
});

const initialTypeReceiving = () => "myself";

export default {
  namespaced: true,
  state: {
    addresses: [],
    editAddressForm: initialAddressForm(),
    expandAddressForm: false,
    isEdit: false,
    typeReceiving: initialTypeReceiving(),
    receivingForm: initialReceivingForm(),
  },
  actions: {
    async [GET_ADDRESSES]({ commit, rootGetters }) {
      if (rootGetters["User/isAuth"]) {
        const data = await this.$api.addresses.query();

        commit(GET_ADDRESSES, data);
      }
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
          commit("changeAddress");
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
    changeAddress(state) {
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
      state[data.form][data.field] = data.value;
    },
    [EMPTY_RECEIVING_FORM](state) {
      state.receivingForm = initialReceivingForm();
      state.typeReceiving = initialTypeReceiving();
    },
  },
  getters: {
    addressForOrder: state => {
      if (!isNaN(+state.typeReceiving)) {
        const address = state.addresses.find(elem => elem.id === state.typeReceiving);

        return {
          id: address.id,
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
        return null;
      }
    },
  },
};
