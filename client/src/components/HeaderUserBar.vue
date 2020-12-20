<template lang="pug">
  .header__user--bar.user__bar
    .header__user--profile(v-if="loggedIn")
      .user__avatar.avatar__image
        UserBarIconAvatar

      .user__login
        h4 
          router-link(:to="routeProfilePath") {{ userName }}
</template>

<script>
import UserBarIconAvatar from '@/components/UserBarIconAvatar'
import { mapState } from 'vuex'

export default {
  components: {
    UserBarIconAvatar
  },
  computed: {
    ...mapState({
      loggedIn: state => state.user.loggedIn,
      userName: state => state.user.profile.name || '',
      userId: state => state.user.profile.id
    }),
    routeProfilePath () {
      return `/profile/${this.userId}`
    }
  }
}
</script>

<style lang="less">
.header__user--profile {
  display: flex;

  h4 {
    margin: 0;
  }

  .user__login {
    display: flex;
    align-items: center;
    padding-left: .2rem;
    padding-right: .2rem;

    .h4 {
      text-align: center;

      a {
        color: #000;
      }
    }
  }

  .user__avatar {
    overflow: hidden;
    border-radius: 100%;
    height: 50px;
    width: 50px;

    img {
      height: inherit;
      width: inherit;
      border-radius: inherit;
      object-fit: cover;
    }

    svg {
      fill: #fff;
      filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, .6));
    }

    ~ .user__login {
      margin-left: .4rem;
      
      a {
        color: #000;
      }
    }
  }
}
</style>