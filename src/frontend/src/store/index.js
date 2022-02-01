import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import VuexPlugins from "@/plugins/vuexPlugins";

Vue.use(Vuex);

const state = () => ({});

const actions = {
  async init({ dispatch, getters }) {
    this.$api.auth.setAuthHeader();
    await dispatch("User/getMe");

    dispatch("Builder/getBuilderComponents");
    dispatch("Cart/getMisc");

    if (getters["User/isAuth"]) {
      dispatch("Addresses/getAddresses");
    }
  },
  drop({ dispatch }, value) {
    switch (value.type) {
      case "ingredient":
        dispatch("Builder/dropIngredient", value);
        break;
      default:
        break;
    }
  },
};

const mutations = {};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules,
  plugins: [VuexPlugins],
});
