<template lang="pug">
  section.admin
    h1 {{ $route.meta.pageTitle }}

    ul.list-group
      li.list-group-item.d-flex.justify-content-between.align-items-center
        | Количество зарегестрированных пользователей
        span.badge.badge-primary.badge-pill {{ countUsers }}

    router-link(:to="{ name: 'home' }") Вернуться на сайт
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        countUsers: '',
      }
    },
    created() {
      this.fetchUsers().then(res => (this.countUsers = res.length))
    },
    methods: {
      ...mapActions({
        fetchUsers: 'getAllUsers',
      }),
    },
  }
</script>
