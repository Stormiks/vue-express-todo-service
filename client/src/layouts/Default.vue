<template lang="pug">
  div.layout.layout-default
    header.d-flex.justify-content-between.navbar
      HeaderLogo
      div.d-flex.align-items-center.profile__bar
        HeaderUserBar
        HeaderUserMenu
    main
      router-view
    footer
      FooterAuthor
</template>

<script>
import HeaderLogo from '@/components/HeaderLogo'
import HeaderUserBar from '@/components/HeaderUserBar'
import HeaderUserMenu from '@/components/HeaderUserMenu'
import FooterAuthor from '@/components/FooterAuthor'

export default {
  name: 'default-layout',
  components: {
    HeaderLogo,
    HeaderUserBar,
    HeaderUserMenu,
    FooterAuthor
  },
}
</script>

<style lang="less">
  .layout-default {
    h1 {
      text-align: center;
    }

    main {
      form {
        max-width: 500px;
        margin: 0 auto;
      } 
    }
  }
</style>