<template lang="pug">
  section 
    h1 Task page {{ id }}

    router-link(:to="{ name: 'todo' }") К списку задач
</template>

<script>
export default {
  props: {
    id: [String, Number]
  },
  mounted(){
  }
}
</script>