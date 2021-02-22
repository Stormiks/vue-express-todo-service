<template>
  <section class="users">
    <h1>
      {{ $route.meta.pageTitle }}
    </h1>

    <table v-if="users.length">
      <thead>
        <tr>
          <td>ID</td>
          <td>Login</td>
          <td>Name</td>
          <td>Password</td>
          <td>Админ</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="`${user.id}-${user.login}`">
          <td>{{ user.id }}</td>
          <td>
            <router-link
              :to="{
                path: `/admin/users/${user.id}`,
                params: { id: user.id },
              }"
            >
              {{ user.login }}
            </router-link>
          </td>
          <td>{{ user.name }}</td>
          <td>{{ user.password }}</td>
          <td>{{ user.admin ? 'Да' : 'Нет' }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        users: [],
      }
    },
    created() {
      this.fetchUsers().then(res => (this.users = res))
    },
    methods: {
      ...mapActions({
        fetchUsers: 'getAllUsers',
      }),
    },
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
