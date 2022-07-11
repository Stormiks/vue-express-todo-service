/* eslint-disable no-empty-pattern */
import tasksApi from './../../api/tasks'

export default {
  state: {
    tasks: [],
    tasksActive: [],
    navTasksPage: 0
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks
    },
    SET_TASKS_ACTIVE(state, tasks) {
      state.tasksActive = tasks
    },
    ADD_TASK(state, task) {
      state.tasks.unshift({
        id: task.id,
        title: task.title,
        text: task.text,
        checked: task.checked,
        createdAt: task.createdAt
      })
    },
    REMOVE_TASK(state, task) {
      state.tasks.splice(task, 1)
    },
		CLEAR_TASKS_CACHE(state) {
			state.tasks = []
			state.navTasksPage = 0
		}
  },
  actions: {
    taskAdd ({ commit }, task) {
      task.userId = this.state.user.profile.id

      return tasksApi.postTask(task).then(res => {
        if (res.data.msg && res.data.task) {
          commit('ADD_TASK', res.data.task)
          return res.data
        }

        return { error: `Error added task "${task.title}"` }
      }).catch(err => console.error(err))
    },
    taskDelete ({ commit }, obj) {
      return tasksApi.deleteTask(obj.task.id).then(res => {
        if (typeof res.data.task === 'number' && res.data.task !== null && res.data.msg) {
          commit('REMOVE_TASK', obj.index)

          return obj.task.title
        }

        return { error: `Error delete task "${obj.task.title}!"` }
      }).catch(err => console.error(err))
    },
    taskChange ({ }, task) {
      return tasksApi.updateTask(task).then(res => {
        console.log(res.data);

        return res.data
      }).catch(err => console.error(err))
    },
    fetchTaskAll ({ commit }) {
      return tasksApi.getTasks(this.state.user.profile.id).then(res => {
        const tasks = res.data.tasks

        if (tasks.length) {
          commit('SET_TASKS', tasks)

          return tasks
        }

        return { error: 'Error load data' }
      }).catch(err => console.error(err))
		},
    fetchTaskAllActive ({ commit }) {
      return tasksApi.getTasksToActive().then(res => {
        const tasks = res.data.tasks

        if (tasks.length) {
          commit('SET_TASKS_ACTIVE', tasks)

          return tasks
        }

        return { error: 'Error load data' }
      }).catch(err => console.error(err))
		},
		fetchDetailInfoTask({  }, taskId) {
			return tasksApi.getTask(taskId).then(res => res.data.task)
			.catch(err => console.error(err))
		},
		async clearTasks({ commit }) {
			await commit('CLEAR_TASKS_CACHE')
		}
  },
  getters: {
		getTasks: (state => id => {
			return state.tasks.filter(t => t.id === Number(id))
		})
  }
}
