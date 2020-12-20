<template lang="pug">
  section
    h1 {{ $route.meta.pageTitle }}
    form.form__auth.form__registration
      h3.form__title Форма регистрации
      div.form__wrap-inner
        div.form__field
          label(for="form-reg-login") Логин:
          input#form-reg-login(type="text", v-model.trim="login")

        div.form__field
          label(for="form-reg-pass") Пароль:
          input#form-reg-pass(type="password", v-model.trim="pass")

        div.form__field
          label(for="form-reg-pass2") Повторите пароль:
          input#form-reg-pass2(type="password", v-model.trim="passConfirm")

      div.form__nav
        button(type="submit", @click.prevent="register") Зарегестрироваться

      div.form__footer
        p 
          span Уже есть аккаунт?
          router-link(to="/login") Войти
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'register',
  data () {
    return {
      login: '',
      pass: '',
      passConfirm: ''
    }
  },
  computed: mapState({
    userLogin: state => state.user.profile.login
  }),
  methods: {
    register () {
      this.$store.dispatch('authRegister', {
        login: this.login,
        password: this.pass,
        passwordConfirm: this.passConfirm
      }).then(ctx => {
        if (ctx.msg) {
          this.$notify({
            group: 'auth',
            type: 'success',
            title: 'Регистрация',
            text: `Новый пользователь "${ctx.login}" успешно зарегестировался!`
          });

          this.$router.push({ name: 'todo', params: { userlogin: this.userLogin }});
        }
      })
    }
  }
}
</script>