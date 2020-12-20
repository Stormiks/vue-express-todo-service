/**
 * Является ли пользователь админом
 * @param {Function} - маршрутизатор 'vue-router'
 * @param {Object} - хранилище vuex
 */
export default function admin ({ next, store }) {
  if (!store.getters.admin) {
    return next('/')
  }

  return next()
}