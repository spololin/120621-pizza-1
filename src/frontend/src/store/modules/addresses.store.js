import {
  EXPAND_ADDRESS_FORM,
  GET_ADDRESSES,
  POST_ADDRESS,
  EDIT_ADDRESS,
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
  },
  actions: {
    async [GET_ADDRESSES]({ commit }) {
      const data = await this.$api.addresses.query();
      commit(GET_ADDRESSES, data);
    },
    async [POST_ADDRESS]({ state, commit, rootState } ) {
      const data = await this.$api.addresses.post({
        ...state.editAddressForm,
        userId: rootState.User.user?.id ?? null,
      });
      if (data.id) {
        commit(POST_ADDRESS, data);
      }
    },
    // async [UPDATE_ADDRESS]({ commit }, address) {
    //   const data = await this.$api.addresses.put({ ...address });
    //   commit(UPDATE_ADDRESS, data);
    // },
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
      state.editAddressForm = address;
      state.isEdit = true;
      state.expandAddressForm = true;
    },
  },
};
