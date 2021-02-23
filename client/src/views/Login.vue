<template>
  <section>
    <h1>{{ $route.meta.pageTitle }}</h1>
    <form class="form__auth form__login" @submit.prevent.stop="logged">
      <h3 class="form__title">Форма входа</h3>
      <div class="form__wrap-inner">
        <div class="form__field">
          <label for="form-reg-login">Логин:</label>
          <input
            id="form-reg-login"
            :class="{ 'error': loginError && !validLogin }"
            type="text"
            v-model.trim="login"
          >
        </div>

        <div class="form__field">
          <label for="form-reg-pass">Пароль:</label>
          <input
            id="form-reg-pass"
            :class="{ 'error': loginError && !validPassword }"
            type="password"
            v-model.trim="pass"
          >
        </div>
      </div>

      <div class="form__nav">
        <button type="submit" @click.prevent.stop="logged">Войти</button>
      </div>

      <div class="form__footer">
        <p>
          <span>Нет аккаунта?</span>
          <router-link to="/register">Регистрация</router-link>
        </p>
      </div>
    </form>
  </section>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Login',
    data() {
      return {
        login: 'Skylinker5',
        pass: 'oloben64',
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

        this.$store.dispatch('authLogin', {
          login: this.login,
          password: this.pass,
        }).then(ctx => {
          if (ctx.msg) {
            this.$notify({
              group: 'auth',
              type: 'success',
              title: 'Вход',
              text: `Пользователь "${ctx.login}" успешно вошел в личный кабинет!`,
            })

            if (this.userLogin) this.loginError = false

            this.$router.push({
              name: 'todo',
              params: { userlogin: this.userLogin }
            })
          } else if (ctx.error) {
            this.loginError = true

            this.$notify({
              group: 'auth',
              type: 'error',
              title: ctx.header,
              text: ctx.error,
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
