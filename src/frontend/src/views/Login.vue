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
            v-model="name"
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
            v-model="pass"
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
    name: "",
    pass: "",
  }),
  methods: {
    ...mapActions("User", ["login"]),
    goLogin() {
      if (this.name.trim() && this.pass.trim()) {
        this.login({
          name: this.name.trim(),
          pass: this.pass.trim(),
        });
        this.$router.push("/");
      }
    },
  },
};
</script>
