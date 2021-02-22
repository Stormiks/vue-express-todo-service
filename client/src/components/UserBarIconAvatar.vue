<template>
  <SvgIcon v-if="!avatar" :name="'user-avatar'" />
  <img v-else :src="avatar" />
</template>

<script>
  import { mapState } from 'vuex'
  import SvgIcon from '@/components/SvgIcon'

  export default {
    components: {
      SvgIcon,
    },
    computed: {
      ...mapState({
        avatar: state => state.user.profile.avatar || '',
      }),
    },
  }
</script>

<style lang="less" scoped>
  svg {
    height: 100%;
    width: 100%;
  }
</style>
