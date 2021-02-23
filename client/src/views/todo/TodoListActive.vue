<template>
  <section class="task-list-active">
    <h1>Все активные задачи</h1>

    <section class="todo">
      <div class="tasks__list">
        <transition-group
          v-if="tasks.length"
          name="todo-item"
          tag="ul"
        >
          <WidgetTodoItemTask
            v-for="(task, index) in tasks"
            :key="`task-${task.id}`"
            :visible-controls-btn="false"
            :task="task"
            :index="index"
          />
        </transition-group>
        <p v-else>Список задач пуст!</p>
      </div>
    </section>
  </section>
</template>

<script>
  import { mapActions } from 'vuex'
  import WidgetTodoItemTask from './todo-widget/WidgetTodoItemTask.vue'

  export default {
    name: 'TodoListActive',
    components: { WidgetTodoItemTask },
    data() {
      return {
        tasks: []
      }
    },
    created() {
      this.fetchTaskAllActive().then(data => this.tasks = data)
    },
    methods: {
      ...mapActions(['fetchTaskAllActive'])
    },
  }
</script>

<style lang="less" scoped>
  ul {
    &.tasks__list {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    flex-grow: 1;
    padding-left: 0;
    list-style: none;

    li {
      margin-top: 7px;
      margin-bottom: 7px;
    }
  }
</style>
