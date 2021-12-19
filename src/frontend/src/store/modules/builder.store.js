import { getPizzaValues } from "@/common/helpers";
import pizzaData from "@/static/pizza.json";

const pizzaBuild = {};

export default {
  namespaced: true,
  state: {
    pizzaBuild,
  },
  actions: {
    fetchBuilder({ commit }) {
      const pizzaComponents = getPizzaValues(pizzaData);
      commit("setPizzaComponents", pizzaComponents);
    },
  },
  mutations: {
    setPizzaComponents(state, pizzaComponents) {
      state.pizzaBuild = pizzaComponents;
    },
  },
  getters: {
    buildingPizza: state => state.pizzaBuild,
    selectedDough: state => state.pizzaBuild.doughs.find(({ checked }) => checked),
    selectedSize: state => state.pizzaBuild.sizes.find(({ checked }) => checked),
    selectedSauce: state => state.pizzaBuild.sauces.find(({ checked }) => checked),
    selectedFillings: state => state.pizzaBuild.fillings.filter(({ count }) => count),
    buildingPizzaName: state => state.pizzaBuild.name,
    pizzaClass: (state, { selectedDough, selectedSauce }) => {
      const basePartClass = "pizza--foundation--";
      const doughPartClass =
        selectedDough.value === "light" ? "small" : "big";
      const saucePartClass = selectedSauce.value;

      return basePartClass + doughPartClass + "-" + saucePartClass;
    },
    disabledCreatePizza: (state, { selectedFillings, buildingPizzaName }) =>
      !(selectedFillings.length && buildingPizzaName.length),
    selectedItems: (state, getters) => ({
      dough: getters.selectedDough,
      size: getters.selectedSize,
      sauce: getters.selectedSauce,
      fillings: getters.selectedFillings,
    }),
    buildingPizzaPrice: (state, { selectedItems,selectedDough, selectedSauce, selectedSize }) => {
      const fillingsPrice = selectedItems.fillings.reduce((acc, elem) => {
        const { count, price } = elem;
        return acc + count * price;
      }, 0);

      return (
        (selectedDough.price +
          selectedSauce.price +
          fillingsPrice) *
        selectedSize.multiplier
      );
    },
  },
};

