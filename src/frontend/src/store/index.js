import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";

Vue.use(Vuex);

const state = () => ({});

const actions = {
  async init({ dispatch }) {
    dispatch("Builder/fetchBuilder");
    dispatch("Cart/fetchMisc");
  },
  clickButtonItemCounter({ dispatch }, counter) {
    switch (counter.type) {
      case "ingredient":
        dispatch("Builder/changeItemCounter", counter);
        break;
      default:
        break;
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

const mutations = {

};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules,
});
