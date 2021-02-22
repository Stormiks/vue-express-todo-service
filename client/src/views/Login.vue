<template lang="pug">
  section
    h1 {{ $route.meta.pageTitle }}
    form.form__auth.form__login
      h3.form__title Форма входа
      .form__wrap-inner
        .form__field
          label(for="form-reg-login") Логин:
          input#form-reg-login(
            :class="{ 'error': loginError && !validLogin }",
            type="text",
            v-model.trim="login"
          )

        .form__field
          label(for="form-reg-pass") Пароль:
          input#form-reg-pass(
            :class="{ 'error': loginError && !validPassword }",
            type="password",
            v-model.trim="pass"
          )

      .form__nav
        button(type="submit", @click.prevent="logged") Войти

      .form__footer
        p
          span Нет аккаунта?
          router-link(to="/register") Регистрация
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'login',
    data() {
      return {
        login: 'Skylinker',
        pass: '123456',
        loginError: false,
      }
    },
    computed: {
      ...mapState({
        userLogin: state => state.user.profile.login,
      }),
      validPassword() {
        return this.pass.length >= 6
      },
      validLogin() {
        return this.login.length > 0
      },
      validationForm() {
        return this.validLogin && this.validPassword
      },
    },
    methods: {
      logged() {
        if (!this.validationForm) return (this.loginError = true)

        this.$store
          .dispatch('authLogin', {
            login: this.login,
            password: this.pass,
          })
          .then(ctx => {
            if (ctx.msg) {
              this.$notify({
                group: 'auth',
                type: 'success',
                title: 'Вход',
                text: `Пользователь "${ctx.login}" успешно вошел в личный кабинет!`,
              })

              if (this.userLogin) this.loginError = false

              this.$router.push({ name: 'todo', params: { userlogin: this.userLogin } })
            } else if (ctx.error) {
              this.loginError = true

              this.$notify({
                group: 'auth',
                type: 'error',
                title: 'Login',
                text: `${ctx.error}: ${ctx.trace.message}`,
              })
            }
          })
      },
    },
  }
</script>

<style lang="less" scoped>
  .error {
    border-color: red;
  }
</style>
