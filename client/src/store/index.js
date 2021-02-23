import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import task from './modules/tasks'
import taskComments from './modules/taskComments'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    layout: 'default-layout'
  },
  mutations: {
  },
  actions: {
		clearDataSessions({ state }) {
			// console.log('clearDataSessions', state);
		}
  },
  getters: {
    layout (state) {
      return state.layout
    }
  },
  modules: {
    user,
    task,
    taskComments
  }
})
