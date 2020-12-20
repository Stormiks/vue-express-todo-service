/**
 * Авторизован ли аутентификацию текущий пользователь
 * @param {Function} - маршрутизатор 'vue-router'
 * @param {Object} - хранилище vuex
 */
export default function guest ({ next, store }) {
  if (store.getters.auth) return next('/todo')

  return next()
}