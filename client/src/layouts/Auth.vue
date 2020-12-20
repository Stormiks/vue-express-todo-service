<template lang="pug">
  div.layout.auth-layout
    header.d-flex.justify-content-between.navbar
      router-link(to="/") На главную
    main
      component.authorization(:is="$route.name")
</template>

<script>
import Register from './../views/Register'
import Login from './../views/Login'

export default {
  name: 'auth-layout',
  components: { Register, Login }
}
</script>

<style lang="less">
  .auth-layout {
    header {
      a {
        color: #fff;
      }
    }

    .form {
      &__title {
        color: #fff;
        background-color: #5f9ea0;
        line-height: 1.5;
        border-radius: 7px 7px 0 0;
        text-align: center;
        text-shadow: -1px 2px 4px #0000008c;
      }

      &__auth {
        padding: 10px;

        label {
          margin-bottom: 0;

          ~ input {
            margin-left: 15px;
          }
        }

        button[type="submit"] {
          display: block;
          box-shadow: 0 10px 14px -7px #539fa5;
          background: linear-gradient(to bottom, #55aeb6 5%, #548e93 100%);
          background-color: #53a1a6;
          border-radius: 4px;
          border: 1px solid #55acb4;
          cursor: pointer;
          color: #fff;
          font-size: 1rem;
          font-weight: bold;
          padding: 6px 12px;
          margin-left: auto;
          margin-right: auto;
          text-decoration: none;
          text-shadow: 0 1px 0 #5b8a3c;
          transition: all .13s;

          &:hover {
            background: linear-gradient(to bottom, #538e93 5%, #55aeb6 100%);
            background-color: #5f9ea0;
            box-shadow: inset 0 3px 10px 0 #00000059;
          }

          &:active {
            position: relative;
            top: 1px;
          }
        }
      }

      &__wrap-inner {
        margin-bottom: 1rem;
        padding-top: 10px;
        padding-bottom: 10px;
      }

      &__field {
        margin-top: 5px;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      &__nav {
        margin-top: 15px;
        margin-bottom: 15px;
      }

      &__footer {
        margin-top: 15px;

        p {
          text-align: center;

          span:only-of-type  {
            margin-right: 5px;
          }
        }
      }
    }
  }

  .authorization {
    h1 {
      text-align: center;
    }

    form {
      max-width: 50%;
      min-width: 310px;
      margin: 0 auto;
    }
  }
</style>