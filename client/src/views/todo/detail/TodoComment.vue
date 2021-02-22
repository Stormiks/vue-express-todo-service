<template>
  <li>
    <strong>{{ author.login }}:</strong>
    <span>{{ text }}</span>
    <time>{{ convertDateCreated }}</time>
  </li>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'TodoComment',
    props: {
      id: {
        type: [String, Number],
        required: true,
      },
      author: [Object],
      text: {
        type: String,
        default: '',
      },
      createdAt: {
        type: String,
        default: '',
      },
    },
    computed: {
      convertDateCreated() {
        return moment(this.createdAt).format('YYYY-MM-DD HH:mm')
      },
    },
  }
</script>

<style lang="less" scoped>
  li {
    display: flex;
    justify-content: space-between;
    margin: 0.2em 0;
  }

  strong {
    padding-right: 0.3em;
  }

  span {
    flex-grow: 1;
    padding-left: 0.5em;
    padding-right: 0.5em;
  }

  time {
    flex-basis: 21%;
    min-width: 140px;
    padding-left: 0.5em;
  }
</style>
