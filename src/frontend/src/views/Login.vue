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
          <AppInput
            v-model="email"
            type="email"
            name="email"
            required
            placeholder="example@mail.ru"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <appInput
            v-model="password"
            type="password"
            name="pass"
            required
            placeholder="***********"
          />
        </label>
      </div>
      <AppButton type="submit">
        Авторизоваться
      </AppButton>
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
  methods: {
    ...mapActions("User", ["login"]),
    async goLogin() {
      if (validateEmail(this.email) && this.password.trim()) {
        const loginSuccess = await this.login({
          email: this.email.trim(),
          password: this.password.trim(),
        });
        if (loginSuccess) {
          await this.$router.push("/");
        }
      }
    },
  },
};
</script>
