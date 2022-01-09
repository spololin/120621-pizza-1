<template>
  <header class="header">
    <div class="header__logo">
      <router-link
        to="/"
        class="logo"
      >
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        >
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">
        {{ totalCost }} ₽
      </router-link>
    </div>
    <div class="header__user">
      <router-link
        v-if="!user.id"
        to="/login"
        class="header__login"
      >
        <span>Войти</span>
      </router-link>
      <router-link
        v-else
        to="/profile"
      >
        <picture>
          <source
            type="image/webp"
            srcset="
              @/assets/img/users/user5.webp    1x,
              @/assets/img/users/user5@2x.webp 2x
            "
          >
          <img
            src="@/assets/img/users/user5.jpg"
            srcset="@/assets/img/users/user5@2x.jpg"
            :alt="user.name"
            width="32"
            height="32"
          >
        </picture>
        <span>{{ user.name }}</span>
      </router-link>
      <a
        v-if="user.id"
        class="header__logout"
        @click.prevent="logout"
      >
        <span>Выйти</span>
      </a>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "AppLayoutHeader",
  computed: {
    ...mapGetters("Cart", ["totalCost"]),
    ...mapState("User", ["user"]),
  },
  methods: {
    ...mapActions("User", ["resetUserState"]),
    logout() {
      this.resetUserState();
    },
  },
};
</script>

<style></style>
