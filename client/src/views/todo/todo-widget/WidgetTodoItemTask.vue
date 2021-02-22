<template>
  <li :class="{ check: task.checked }">
    <div class="task__wrapper" :class="{ 'task__dropdown--open': expanded }">
      <label :class="`task-label-checkbox-${index}`" :for="`task-${task.id}`" @click="changeChecked">
        <input :id="`task-${task.id}`" type="checkbox" :checked="task.checked" />
      </label>
      <div class="task__title-wrapper">
        <transition-group name="bounceInRight">
          <span class="task__title" :key="`span-${index}`" v-show="!isEditTask">
            <router-link
              :to="{
                name: 'todo-detail',
                params: { id: task.id },
              }"
            >
              {{ task.title }}
            </router-link>
          </span>
          <input
            class="task__title--create"
            :ref="`inputTextCreate${this.index}`"
            :key="`input-${index}`"
            v-show="isEditTask"
            type="text"
            v-model.trim="textTask"
            @keyup.enter="createTask"
          />
        </transition-group>

        <div class="task__footer">
          <span class="task__time-add" v-if="task.createdAt">
            Создан: {{ convertDateCreated(task.createdAt) }}
          </span>
          <div class="icon-group">
            <i class="icon" v-if="task.text" @click="expanded = !expanded">
              <SvgIcon :name="'article'" :class="{ active: expanded }" />
            </i>
            <i class="icon icon__text">
              <span class="icon__count">{{ task.countComments }}</span>
              <SvgIcon :name="'comments-todo'" />
            </i>
          </div>
        </div>
      </div>
      <div class="btn__group">
        <button class="btn btn-primary btn--task-remove" type="button" @click="createTask">
          <SvgIcon :name="'pencil'" />
        </button>
        <button class="btn btn-danger btn--task-remove" type="button" @click="removeTask(index)">
          <SvgIcon :name="'basket'" />
        </button>
      </div>
    </div>
    <TransitionExpand>
      <div class="task__dropdown open" v-show="expanded">
        <div>Описание: {{ task.text }}</div>
      </div>
    </TransitionExpand>
  </li>
</template>

<script>
  import TransitionExpand from '@/components/TransitionExpand'
  import moment from 'moment'
  import SvgIcon from '@/components/SvgIcon'

  export default {
    props: {
      task: Object,
      index: Number,
      removeTask: {
        type: Function,
      },
    },
    data() {
      return {
        expanded: false,
        isEditTask: false,
        textTask: this.task.title,
        countComments: 0,
      }
    },
    components: {
      TransitionExpand,
      SvgIcon,
    },
    computed: {
      isDescription() {
        return this.task.text !== '' && this.task.text !== null
      },
    },
    watch: {
      textTask(newText) {
        if (this.isEditTask && newText !== '' && this.task.title !== newText) {
          // console.log('eventChangeTaskText', newText);
        }
      },
      isEditTask(newBoolean) {
        if (!newBoolean) {
          this.$emit('event-change-task-text', {
            index: this.index,
            title: this.textTask,
          })
        }
      },
    },
    methods: {
      convertDateCreated(date) {
        return moment(date).format('YYYY-MM-DD HH:mm')
      },
      changeChecked() {
        const checked = !this.task.checked

        this.$emit('event-change-checked', {
          index: this.index,
          checked,
        })
      },
      createTask() {
        this.isEditTask = !this.isEditTask

        this.$nextTick(() => {
          if (this.isEditTask) this.$refs[`inputTextCreate${this.index}`].focus()
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  @keyframes bounceInRight {
    from,
    60%,
    75%,
    90%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    from {
      opacity: 0;
      transform: translate3d(3000px, 0, 0) scaleX(3);
    }

    60% {
      opacity: 1;
      transform: translate3d(-25px, 0, 0) scaleX(1);
    }

    75% {
      transform: translate3d(10px, 0, 0) scaleX(0.98);
    }

    90% {
      transform: translate3d(-5px, 0, 0) scaleX(0.995);
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }

  .bounceInRight {
    animation-duration: calc(1s * 0.75);
    animation-name: bounceInRight;
  }

  .expand-enter-active,
  .expand-leave-active {
    transition-property: opacity, height;
  }

  .expand-enter,
  .expand-leave-to {
    opacity: 0;
  }

  li {
    &:hover {
      .task__title {
        color: lighten(#000, 60%) !important;
      }
    }

    &.check {
      .task__wrapper {
        color: green;
        background-color: rgba(#343a40, 28%);
      }
    }
  }

  .icon-group {
    display: flex;

    .icon {
      display: block;
      height: 20px;

      + .icon {
        margin-left: 0.3em;
      }

      &:hover {
        cursor: pointer;
      }

      &.icon__text {
        display: flex;
        align-items: center;
      }

      .icon__count {
        font-size: 1rem;
        padding-left: 0.2em;
        padding-right: 0.2em;
      }

      svg {
        vertical-align: unset;
        height: inherit;
        max-width: inherit;
      }
    }
  }

  .btn__group {
    .btn ~ .btn {
      margin-left: 5px;
    }
  }

  .task__wrapper {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    border-radius: 7px;
    box-shadow: 0 2px 3px 0 rgba(#000, 30%);
    padding: 5px 9px;
    transition: all 0.13s;
    overflow: hidden;

    &.task__dropdown--open {
      border-radius: 7px 7px 0 0;
      box-shadow: 0 0 3px 0 rgba(#000, 30%);

      svg.active {
        fill: brown;
      }
    }

    label[class^='task-label-checkbox-'] {
      display: flex;
      align-items: center;
      margin-bottom: 0;
      cursor: pointer;

      input {
        cursor: pointer;
      }

      ~ .task__title-wrapper {
        margin-left: 7px;
      }
    }

    .btn {
      &:only-of-type {
        margin-left: 5px;
      }
    }

    .btn--task-remove {
      height: 40px;
      line-height: 1;

      svg {
        fill: #e4dede;
        height: 100%;
      }
    }
  }

  .task__title-wrapper {
    display: flex;
    flex-grow: 1;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    transition: all 2s;

    ~ .btn__group {
      margin-left: 7px;
    }

    input {
      flex-grow: 1;
    }
  }

  .task__title {
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .task__footer {
    display: flex;
    align-items: center;
    margin-top: 0.2em;
  }

  .task__time-add {
    color: #000;
    font-size: 10px;
    line-height: 1;
    margin-right: 0.5em;
  }

  .task__dropdown {
    overflow: hidden;
    border-radius: 0 0 7px 7px;

    > div {
      padding: 5px 9px;
    }

    &.open {
      box-shadow: 0 2px 3px 0 rgba(#000, 30%);
    }
  }
</style>
