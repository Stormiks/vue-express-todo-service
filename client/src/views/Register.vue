<template>
  <section>
    <h1>{{ $route.meta.pageTitle }}</h1>
    <form class="form__auth form__registration">
      <h3 class="form__title">Форма регистрации</h3>
      <div class="form__wrap-inner">
        <div class="form__field">
          <label for="form-reg-login">Логин:</label>
          <input id="form-reg-login" type="text" v-model.trim="login">
        </div>

        <div class="form__field">
          <label for="form-reg-pass">Пароль:</label>
          <input id="form-reg-pass" type="password" v-model.trim="pass">
        </div>

        <div class="form__field">
          <label for="form-reg-pass2">Повторите пароль:</label>
          <input id="form-reg-pass2" type="password" v-model.trim="passConfirm">
        </div>
      </div>

      <div class="form__nav">
        <button type="submit" @click.prevent="register">Зарегестрироваться</button>
      </div>

      <div class="form__footer">
        <p>
          <span>Уже есть аккаунт?</span>
          <router-link to="/login">Войти</router-link>
        </p>
      </div>
    </form>
  </section>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Register',
    data() {
      return {
        login: '',
        pass: '',
        passConfirm: '',
      }
    },
    computed: mapState({
      userLogin: state => state.user.profile.login,
    }),
    methods: {
      register() {
        this.$store.dispatch('authRegister', {
          login: this.login,
          password: this.pass,
          passwordConfirm: this.passConfirm,
        }).then(ctx => {
          if (ctx.msg) {
            this.$notify({
              group: 'auth',
              type: 'success',
              title: 'Регистрация',
              text: `Новый пользователь "${ctx.login}" успешно зарегестировался!`,
            })

            this.$router.push({
              name: 'todo',
              params: { userlogin: this.userLogin }
            })
          } else if (ctx.error) {
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
