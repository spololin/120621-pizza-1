import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";

Vue.use(Vuex);

const state = () => ({});

const actions = {
  init({ dispatch }) {
    dispatch("Builder/fetchBuilderComponents");
    dispatch("Cart/fetchMisc");
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
});
