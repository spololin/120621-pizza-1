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
      @submit.prevent="goLogin"
    >
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            ref="email"
            v-model="email"
            type="email"
            name="email"
            required
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
            required
            placeholder="***********"
          >
        </label>
      </div>
      <button
        type="submit"
        class="button"
      >
        Авторизоваться
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { validateEmail } from "@/common/helpers";

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
  }),
  mounted() {
    this.$refs.email.focus();
  },
  methods: {
    ...mapActions("User", ["login"]),
    goLogin() {
      if (validateEmail(this.email) && this.password.trim()) {
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
