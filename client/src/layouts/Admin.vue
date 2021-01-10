<template lang="pug">
  .layout.admin-layout
    router-view(name="sidebar")

    header.d-flex.justify-content-between.navbar
      router-link(to="/admin") Админ панель
    main
      router-view
</template>

<script>
export default {
	name: 'AdminLayout'
}
</script>

<style lang="less">
.sidebar {
  position: fixed;
  left: 0;
  height: 100vh;
  max-width: 300px;

  + header {
    margin-left: 300px;

    + main {
      margin-left: 300px;
    }
  }
}
</style>
