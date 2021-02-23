<template lang="pug">
form
  .form__field.form__input--add-task
    label(for="add-task")
      input#add-task(
        type="text",
        :placeholder="warnTextValid"
        v-model.trim="task"
      )
      button.btn.btn--clear-field(
        type="button"
        @click="clearField"
        :class="{ 'transform-visible': isValidNewTask }"
      )
        i.icon.cross-remove
          svg(viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg")
            path(d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2")
            path(d="M 9 9.5 L 16.7 17.2" stroke-lineca="round" stroke-miterlimit="10" stroke-width="2")
            path(d="M16.7 9.5L9 17.3" stroke-lineca="round" stroke-miterlimit="10" stroke-width="2")
    button.btn.btn--add-task(
      type="submit",
      @click.prevent="addTask"
      :disabled="!isValidNewTask"
      :class="{ 'disabled': !isValidNewTask }"
    ) Добавить
  .form__field.form__input--add-task-desc(
    v-show="task.length > 3"
  )
    label.mb-0 Описание:
    textarea(
      v-model="description",
    )
    .desc-bar
      span.desc-length {{ description.length }}/{{ descLimitSymbols }}
      span.error(v-show="isValidDescLength") Достигнут лимит по количеству символов
</template>

<script>
  export default {
    data() {
      return {
        task: '',
        description: '',
        descLimitSymbols: 255,
      }
    },
    computed: {
      isValidNewTask() {
        return this.task !== ''
      },
      warnTextValid() {
        return this.task === '' ? 'Введите текст задачи' : ''
      },
      isValidDescLength() {
        return this.descLengthSymbols === this.descLimitSymbols
      },
      descLengthSymbols() {
        return this.description.length
      },
    },
    watch: {
      description(newValue, oldValue) {
        if (this.descLengthSymbols > this.descLimitSymbols) this.description = oldValue
      },
    },
    methods: {
      addTask(e) {
        if (!this.isValidNewTask) return

        this.$emit('event-new-task', {
          title: this.task,
          description: this.description,
          checked: false,
        })

        this.clearField()
      },
      clearField() {
        this.task = ''
      },
    },
  }
</script>

<style lang="less" scoped>
  .form__field {
    &.form__input--add-task {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      &-desc {
        display: flex;
        flex-direction: column;

        .desc-bar {
          display: flex;
          justify-content: space-between;
          flex-direction: row-reverse;
          margin-top: 0.3em;

          .desc-length {
            font-size: 13px;
          }

          .error {
            color: red;
            font-size: 12px;
          }
        }
      }

      .icon.cross-remove {
        height: inherit;
        width: inherit;

        svg {
          stroke: #4f4f4f;
          transition: all 0.13s;
          height: 20px;
          width: 20px;
        }

        &:hover {
          cursor: pointer;

          svg {
            stroke: #000;
            filter: drop-shadow(0 0 1px rgba(148, 147, 147, 0.4));
          }
        }
      }

      .btn {
        padding: 2px 10px;
        transition: all 0.15s;

        &--add-task {
          transition: all 0.3s ease-in 0.1s;

          &:not(.disabled) {
            background-color: #5f9ea0;
            color: #fff;
            box-shadow: 0 0 2px 1px #71a7a973, 0 0 5px 0 #0000005c;
          }

          &:focus {
            background-color: #3d8b8ec7;
            box-shadow: inset 0 0 15px 1px #0c414687;
          }
        }

        &--clear-field {
          height: 100%;
          position: absolute;
          right: 5px;
          transform: translateX(150%);
          transition: all 0.13s 0.3s;
          padding: 0;
          line-height: 0;
          border: none;
          border-radius: 0;
          font-size: 0;
          padding-block-start: 0;
          padding-block-end: 0;
          z-index: -1;

          &.transform-visible {
            transform: translateX(0);
            z-index: 0;
            outline: none;
            box-shadow: none;

            svg {
              stroke: #000;
              fill: #fff;
              border-radius: 100%;
            }

            &:focus {
              svg {
                stroke: #bd2130;
                box-shadow: 0 0 5px 1px #bd2130;
              }
            }
          }
        }
      }

      label {
        flex-grow: 1;
        margin-bottom: 0;
        overflow: hidden;
        position: relative;

        ~ .btn {
          margin-left: 10px;
        }

        input {
          width: 100%;
        }
      }
    }
  }
</style>
