<template lang="pug">
  div#app
    component(:is="layout")
      router-view

    notifications(position="bottom right", group="auth")
    notifications(position="bottom right", group="private")
</template>

<script>
export default {
  computed: {
    layout () {
      return this.$route.meta.layout
    }
  }
}
</script>