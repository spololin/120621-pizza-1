import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import VuexPlugins from "@/plugins/vuexPlugins";

Vue.use(Vuex);

const state = () => ({});

const actions = {
  init({ dispatch }) {
    this.$api.auth.setAuthHeader();
    dispatch("User/getMe");
    dispatch("Builder/getBuilderComponents");
    dispatch("Addresses/getAddresses");
    dispatch("Cart/getMisc");
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

const mutations = {

};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules,
  plugins: [VuexPlugins],
});
