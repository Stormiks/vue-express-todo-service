/* eslint-disable no-empty-pattern */

import axios from 'axios'
import authApi from './../../api/auth'
import usersApi from './../../api/users'

const timestampLoggedIn = localStorage.getItem('timestamp')

export default {
  state: {
    token: localStorage.getItem('token') || '',
    loggedIn: JSON.parse(localStorage.getItem('logged')),
    timestampLoggedIn: timestampLoggedIn !== 'undefined' ? timestampLoggedIn : '',
    profile: JSON.parse(localStorage.getItem('profile'))
  },
  mutations: {
    CHANGE_STATUS_LOGGED_IN (state, { bool, timestamp }) {
      state.loggedIn = bool
      state.timestampLoggedIn = timestamp
      localStorage.setItem('logged', bool)
      localStorage.setItem('timestamp', timestamp)
    },
    SET_TOKEN(state, token) {
      state.token = token
      axios.defaults.headers.common['Authorization'] = token
      localStorage.setItem('token', token)
    },
    SET_PROFILE_INFO (state, profileInfo) {
      state.profile = profileInfo
      localStorage.setItem('profile', JSON.stringify(profileInfo))
    },
    LOGOUT (state) {
      state.loggedIn = false
      state.profile = {}
      state.timestampLoggedIn = ''
      state.token = ''
      delete axios.defaults.headers.common
      localStorage.removeItem('token')
    }
  },
  actions: {
    getAllUsers ({ }) {
      return usersApi.getUsers().then(res => res.data).catch(err => {
        return {
          error: 'Error function "fetchAllUsers"',
          trace: err
        }
      })
    },
    authLogin ({ commit }, user) {
      return authApi.postLogin(user).then(res => {
        const ctx = res.data.user
        const token = res.data.token
        const timestamp = res.data.timestamp

        if (ctx && timestamp) {
          commit('CHANGE_STATUS_LOGGED_IN', { bool: true, timestamp })
          commit('SET_TOKEN', token)
          commit('SET_PROFILE_INFO', ctx)

          return {
            msg: res.data.msg,
            login: res.data.user.login
          }
        }

        return { error: res.data.error }
      }).catch(err => {
        return {
          error: 'Error function "authLogin"',
          trace: err
        }
      })
    },
    authRegister ({ commit }, user) {
      return authApi.postRegister(user).then(res => {
        const ctx = res.data.user
        const timestamp = res.data.timestamp
        console.log('Register',res);

        if (ctx && timestamp) {
          commit('CHANGE_STATUS_LOGGED_IN', { bool: true, timestamp })
          commit('SET_PROFILE_INFO', res.data.user)

          return {
            msg: res.data.msg,
            login: res.data.user.login
          }
        }

        return res.data
      }).catch(err => {
        return {
          error: 'Error function "authRegister"',
          trace: err
        }
      })
    },
    authLogout ({ commit }) {
      localStorage.removeItem('logged')
      localStorage.removeItem('timestamp')
      localStorage.removeItem('profile')

      commit('LOGOUT')
    },
    getProfile ({ commit, state }) {
      return usersApi.getProfile(state.profile.id).then(res => {
        return res.data.user
      }).catch(err => {
        return {
          error: 'Error function "getProfile"',
          trace: err
        }
      })
    },
    updateProfile ({ commit, state }, formData) {
      console.log(formData);
      usersApi.postUpdateProfile({
        userId: state.profile.id,
        body: formData
      }).then(res => {
        console.log('updateProfile', res);
      })
    }
  },
  getters: {
    auth (state) {
      return state.loggedIn
    },
    admin (state) {
      return state.profile.admin
    },
    id (state) {
      return state.profile.id
    }
  },
}
