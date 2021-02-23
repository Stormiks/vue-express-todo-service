<template>
  <section class="profile">
    <h1>Страница профиля</h1>

    <div class="container d-flex flex-row">
      <div class="form-group pr-3">
        <div class="input-group">
          <label>
            Аватар:
          </label>
          <input type="file" ref="imageAvatar" @change="changeAvatar">
        </div>

        <div class="input-group profile__user_avatar">
          <label>
            Аватар:
          </label>
          <img :src="profile.avatar">
        </div>
      </div>

      <div class="form-group pl-3">
        <div class="input-group">
          <label>
            ID: {{ profile.id }}
          </label>
        </div>

        <div class="input-group">
          <label>
            Логин: {{ profile.login }}
          </label>
        </div>

        <div class="input-group">
          <label>
            Имя: {{ profile.name }}
          </label>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'Profile',
    props: {
      userId: String,
    },
    data() {
      return {
        files: '',
        profile: {},
      }
    },
    computed: {
      ...mapState({
        // profile: state => state.user.profile
      }),
    },
    created() {
      this.fetchProfile().then(data => (this.profile = data))
    },
    methods: {
      ...mapActions({
        fetchProfile: 'getProfile',
        updateProfile: 'updateProfile',
      }),
      changeAvatar() {
        console.log(this.files)
        this.files = this.$refs.imageAvatar.files[0]
        let formData = new FormData()
        formData.append('image', this.files)
        this.updateProfile(formData)
      },
    },
  }
</script>

<style lang="less" scoped>
.profile {
  .profile__user_avatar {
    img {
      max-height: 300px;
      max-width: 300px;
    }
  }
}
</style>
