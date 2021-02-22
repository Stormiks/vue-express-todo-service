<template>
  <div class="layout layout-default">
    <header class="d-flex justify-content-between navbar">
      <HeaderLogo />
      <div class="d-flex align-items-center profile__bar">
        <HeaderUserBar />
        <HeaderUserMenu />
      </div>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <FooterAuthor />
    </footer>
  </div>
</template>

<script>
  import HeaderLogo from '@/components/HeaderLogo'
  import HeaderUserBar from '@/components/HeaderUserBar'
  import HeaderUserMenu from '@/components/HeaderUserMenu'
  import FooterAuthor from '@/components/FooterAuthor'

  export default {
    name: 'DefaultLayout',
    components: {
      HeaderLogo,
      HeaderUserBar,
      HeaderUserMenu,
      FooterAuthor,
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
