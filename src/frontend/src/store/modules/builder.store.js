import { getPizzaValues } from "@/common/helpers";
import pizzaData from "@/static/pizza.json";
import { MAX_COUNT_TYPE_INGREDIENT } from "@/common/constants";

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
    clickSelectorItem({ commit }, selector) {
      commit("updateSelectorItem", selector);
    },
    changeItemCounter({ commit }, filling) {
      commit("updateItemCounter", filling);
    },
    changeNamePizza({ commit }, name) {
      commit("setNamePizza", name);
    },
    dropIngredient({ commit }, filling) {
      commit("updateItemCounter", { ...filling, operation: "increase" });
    },
  },
  mutations: {
    setPizzaComponents(state, pizzaComponents) {
      state.pizzaBuild = pizzaComponents;
    },
    updateSelectorItem(state, selector) {
      state.pizzaBuild[selector.type] = state.pizzaBuild[selector.type].map((elem) => ({
        ...elem,
        checked: selector.id === elem.id,
      }));
    },
    updateItemCounter(state, filling) {
      state.pizzaBuild.fillings = state.pizzaBuild.fillings.map((elem) => {
        if (elem.id !== filling.id) return elem;

        const count =
          filling.operation === "increase" ? ++filling.count : --filling.count;

        return {
          ...elem,
          count,
          permissions: {
            decrease: count > 0,
            increase: count < MAX_COUNT_TYPE_INGREDIENT,
          },
        };
      });
    },
    setNamePizza(state, name) {
      state.pizzaBuild.name = name;
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
    pizza: (state, { selectedFillings, selectedDough, selectedSauce, selectedSize, buildingPizzaName, buildingPizzaPrice }) => ({
      selectedFillings,
      selectedDough,
      selectedSauce,
      selectedSize,
      name: buildingPizzaName,
      price: buildingPizzaPrice,
    }),
  },
};

