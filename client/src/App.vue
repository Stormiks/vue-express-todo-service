<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
		</component>

    <notifications position="bottom right" group="auth" />
    <notifications position="bottom right" group="private" />
	</div>
</template>

<script>
  export default {
    computed: {
      layout() {
        return this.$route.meta.layout
      },
    },
  }
</script>
