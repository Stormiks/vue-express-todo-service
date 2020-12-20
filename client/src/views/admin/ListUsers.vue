<template lang="pug">
  section.users
    h1 {{ $route.meta.pageTitle }}

    table(v-if="users.length")
      thead
        tr
          td ID
          td Login
          td Name
          td Password
          td Админ
      tbody
        tr(v-for="user in users")
          td {{ user.id }}
          td 
            router-link(:to="{ path: `/admin/users/${user.id}`, params: { id: user.id }}") {{ user.login }}
          td {{ user.name }}
          td {{ user.password }}
          td {{ user.admin ? 'Да' : 'Нет' }}
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      users: []
    }
  },
  created() {
    this.fetchUsers().then(res => this.users = res)
  },
  methods: {
    ...mapActions({
      fetchUsers: 'getAllUsers'
    })
  }
}
</script>

<style lang="less">
table {
  width: 100%;

  td {
    border: 1px solid #000;
  }

  thead {
    td {
      line-height: 1;
      padding: 5px;
    }
  }

  tbody {
    td {
      padding: 3px 5px;
    }
  }
}
</style>