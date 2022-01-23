<template>
  <div class="sign-form">
    <router-link
      to="/"
      class="close close--white"
    >
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">
        Авторизуйтесь на сайте
      </h1>
    </div>
    <form
      action=""
      method="post"
    >
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            v-model="email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
          >
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            v-model="password"
            type="password"
            name="pass"
            placeholder="***********"
          >
        </label>
      </div>
      <button
        type="submit"
        class="button"
        @click.prevent="goLogin"
      >
        Авторизоваться
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    ...mapActions("User", ["login"]),
    goLogin() {
      if (this.email.trim() && this.password.trim()) {
        this.login({
          email: this.email.trim(),
          password: this.password.trim(),
        });
        this.$router.push("/");
      }
    },
  },
};
</script>
