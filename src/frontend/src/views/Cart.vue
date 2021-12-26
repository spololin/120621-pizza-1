<template>
  <form
    action="test.html"
    method="post"
    class="layout-form"
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">
            Корзина
          </h1>
        </div>

        <div
          v-if="!countPizzaInCart"
          class="sheet cart__empty"
        >
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul
          v-else
          class="cart-list sheet"
        >
          <CartPizzaItem
            v-for="pizza in pizzas"
            :key="pizza.id"
            :pizza="pizza"
          />
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <CartAdditionalItem
              v-for="misc in miscs"
              :key="misc.id"
              :misc="misc"
            />
          </ul>
        </div>

        <div class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select
                name="test"
                class="select"
              >
                <option value="1">Заберу сам</option>
                <option value="2">Новый адрес</option>
                <option value="3">Дом</option>
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

            <div class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input
                    type="text"
                    name="street"
                  >
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input
                    type="text"
                    name="house"
                  >
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input
                    type="text"
                    name="apartment"
                  >
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <a
          class="button button--border button--arrow"
          @click.prevent="toHome"
        >
          Хочу еще одну
        </a>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br>чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ totalCost }} ₽</b>
      </div>

      <div class="footer__submit">
        <button
          type="submit"
          class="button"
        >
          Оформить заказ
        </button>
      </div>
    </section>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CartPizzaItem from "@/modules/cart/CartPizzaItem";
import CartAdditionalItem from "@/modules/cart/CartAdditionalItem";

export default {
  name: "Cart",
  components: { CartAdditionalItem, CartPizzaItem },
  computed: {
    ...mapGetters("Cart", ["countPizzaInCart", "totalCost", "pizzas", "miscs"]),
  },
  methods: {
    ...mapActions("Builder", ["resetBuildState"]),
    toHome() {
      this.resetBuildState();
      this.$router.push("/");
    },
  },
};
</script>
