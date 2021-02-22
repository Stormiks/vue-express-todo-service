<template lang="pug">
  section.todo
    form.form__task(
      @submit.prevent="onAddTask"
    )
      .form__wrap-inner
        WidgetTodoFieldAddTask(
          @event-new-task="onAddTask"
        )

    .tasks__filter
      span.filter__label Фильтр:

      .filter__params
        .filter__params__input
          input(
            v-model="isFilterCompleted"
            type="checkbox"
            id="filter-cheched"
            name="filter-cheched"
          )
          label(for="filter-cheched") Выполнено {{ countCompleted }}

    .tasks__list
      transition-group(
        v-if="tasks.length"
        name="todo-item"
        tag="ul"
      )
        WidgetTodoItemTask(
          v-for="(task, index) in tasks"
          :key="`task-${task.id}`"
          :task="task"
          :index="index"
          @event-change-checked="onChangeChecked"
          @event-change-task-text="onChangeTaskText"
          :removeTask="onRemoveTask"
        )
      p(v-else) Список задач пуст!
    
    router-view
</template>

<script>
  import WidgetTodoFieldAddTask from './WidgetTodoFieldAddTask'
  import WidgetTodoItemTask from './WidgetTodoItemTask'

  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
      WidgetTodoFieldAddTask,
      WidgetTodoItemTask,
    },
    data() {
      return {
        tasks: [],
        isFilterCompleted: false,
      }
    },
    async mounted() {
      await this.fetchTasks()
      this.tasks = this.stateTasks
    },
    computed: {
      ...mapState({
        stateTasks: state => state.task.tasks,
      }),
      countCompleted() {
        return this.stateTasks.filter(t => t.checked).length
      },
    },
    watch: {
      isFilterCompleted(newBool) {
        if (newBool) this.tasks = this.stateTasks.filter(t => t.checked === newBool)
        else this.tasks = this.stateTasks
      },
    },
    methods: {
      ...mapActions({
        fetchTasks: 'fetchTaskAll',
        addTask: 'taskAdd',
        removeTask: 'taskDelete',
        changeTask: 'taskChange',
      }),
      onAddTask(event) {
        this.addTask(event).then(res => {
          this.$notify({
            group: 'private',
            type: 'success',
            title: 'Новая задача',
            text: `${res.msg} Новая задача "<b>${res.task.title}</b>" успешно добавлена`,
          })
        })
      },
      onChangeChecked(eTask) {
        this.$set(this.tasks[eTask.index], 'checked', eTask.checked)

        this.changeTask(this.tasks[eTask.index])
      },
      onRemoveTask(index) {
        this.removeTask({
          index,
          task: this.stateTasks[index],
        }).then(res => {
          if (res.error) return

          this.$notify({
            group: 'private',
            type: 'success',
            title: 'Удаление задачи',
            text: `Задача "<b>${res}</b>" успешно удалена!`,
          })
        })
      },
      saveTodo() {
        this.$store.dispatch('taskAdd', this.tasks).then(ctx => {
          console.log(ctx)
        })
      },
      onChangeTaskText(eTask) {
        if (this.tasks[eTask.index].title !== eTask.title) {
          this.$set(this.tasks[eTask.index], 'title', eTask.title)

          this.changeTask(this.tasks[eTask.index])
        }
      },
    },
  }
</script>

<style lang="less">
  .todo {
    // max-width: 45%;
    min-width: 300px;
    // margin: 0 auto;

    .form__task {
      margin-top: 2em;
      padding-bottom: 1em;
    }

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
  }

  .todo-item-enter-active,
  .todo-item-leave-active {
    transition: opacity ease 0.35s, transform ease-in-out 0.4s;
    transform-origin: left center;
  }

  /* .todo-item-leave-active below version 2.1.8 */
  .todo-item-enter,
  .todo-item-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }

  .tasks__filter {
    display: flex;
    border-radius: 7px;
    border: 1px solid #000;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .filter {
    &__label {
      border-right: 1px solid #000;
      padding: 0.2em 0.5em;
    }

    &__params {
      padding: 0.2em 0.5em;

      &__input {
        * {
          &:hover {
            cursor: pointer;
          }
        }

        input {
          + label {
            margin-left: 0.4em;
          }
        }

        label {
          margin: 0;
          user-select: none;
        }
      }
    }
  }
</style>
