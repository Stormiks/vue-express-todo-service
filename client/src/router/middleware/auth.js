/**
 * Авторизован ли в данный момент пользователь
 * @param {Function} - маршрутизатор 'vue-router'
 * @param {Object} - хранилище vuex
 */
export default function auth ({ next, store }) {
  if (!store.getters.auth) {
    return next('/login')
  }

  return next()
}
