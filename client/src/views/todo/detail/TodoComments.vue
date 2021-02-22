<template>
  <ul>
    <todo-comment
      v-for="comment in comments(taskId)"
      :key="`task-${comment.taskId}-comment-${comment.id}`"
      :id="comment.id"
      :author="comment.user"
      :text="comment.text"
      :created-at="comment.createdAt"
    ></todo-comment>
  </ul>
</template>

<script>
  import TodoComment from './TodoComment'
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'TodoComments',
    props: {
      taskId: {
        type: [String, Number],
        required: true,
      },
    },
    components: {
      TodoComment,
    },
    computed: {
      ...mapGetters({
        comments: 'getComments',
      }),
    },
  }
</script>

<style lang="less" scoped>
  ul {
    overflow-y: auto;
    padding: 1em 0;
  }
</style>
