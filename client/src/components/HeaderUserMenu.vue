<template lang="pug">
  div.user__bar--menu.menu__list
    ul
      li(v-if="!loggedIn")
        router-link(to="/login") Войти
      li(v-else)
        a(role="button", @click.prevent="logout") Выйти
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: mapState({
      loggedIn: state => state.user.loggedIn,
    }),
    watch: {
      loggedIn(newLoggenIn) {
        if (!newLoggenIn) this.$router.push('/login')
      },
    },
    methods: {
      logout() {
        this.$store.dispatch('authLogout')
      },
    },
  }
</script>

<style lang="less">
  .menu__list ul {
    margin: 0;
    list-style: none;
    padding: 0;

    li {
      a {
        border-radius: 7px;
        border: 1px solid rgba(0, 0, 0, 0.87);
        color: #fff;
        padding: 0.2rem 1rem;
        transition: all 0.15s;

        &:hover {
          background: linear-gradient(to bottom, #42a9b3, #3c7a7f);
          text-decoration: none;
          box-shadow: 0 0 5px 0 #495057;
          border-color: rgba(0, 0, 0, 0.37);
        }
      }
    }
  }
</style>
