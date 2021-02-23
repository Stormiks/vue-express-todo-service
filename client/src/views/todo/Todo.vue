<template>
  <WidgetTodoForm />
</template>

<script>
  import WidgetTodoForm from './todo-widget/WidgetTodoForm'

  export default {
    name: 'Todo',
    components: {
      WidgetTodoForm,
    },
    mounted() {},
  }
</script>

<style lang="less">
  // .tasks__list {
  //   ul {
  // max-width: 40%;
  //   }
  // }
</style>
