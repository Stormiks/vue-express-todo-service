<template lang="pug">
  section.profile
    h1 Страница профиля
    
    .container.d-flex.flex-row
      .form-group.pr-3
        .input-group
          label Аватар:
          input(type="file", ref="imageAvatar" @change="changeAvatar")

        .input-group
          label Аватар: 
          img(:src="profile.avatar")

      .form-group.pl-3
        .input-group
          label ID: {{ profile.id }}

        .input-group
          label Логин: {{ profile.login }}

        .input-group
          label Имя: {{ profile.name }}
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
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
