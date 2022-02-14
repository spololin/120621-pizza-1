<template>
  <header class="header">
    <div class="header__logo">
      <router-link
        to="/"
        class="logo"
      >
        <img
          src="public/img/logo.svg"
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
              public/img/users/user5.webp    1x,
              public/img/users/user5@2x.webp 2x
            "
          >
          <img
            src="public/img/users/user5.jpg"
            srcset="public/img/users/user5@2x.jpg"
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
        @click.prevent="logoutUser"
      >
        <span>Выйти</span>
      </a>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { LOGOUT_USER } from "@/store/mutation-types";

export default {
  name: "AppLayoutHeader",
  computed: {
    ...mapGetters("Cart", ["totalCost"]),
    ...mapState("User", ["user"]),
  },
  methods: {
    ...mapActions("User", {
      logout: LOGOUT_USER,
    }),
    async logoutUser() {
      if (await this.logout(true)) {
        await this.$router.push("/").catch(() => {});
      }
    },
  },
};
</script>

<style></style>
