import axios from 'axios'
import url from './apiUrl'
import store from '../store'

export default {
  /**
   * Get all tasks
   * @returns {Response|Promise}
   */
  getTasks () {
    return axios.get(url.tasksAll, {
      params: {
        userId: store.getters.id
      }
    })
  },
  /**
   * Get all tasks to active
   * @returns {Response|Promise}
   */
  getTasksToActive () {
    return axios.get(url.taskGetActive)
  },
  /**
   * Get task
   * @param {Number} [taskId]
   * @returns {Response|Promise}
   */
  getTask (taskId) {
    return axios.get(`${url.taskGet}/${taskId}`)
  },
  /**
   * Added new task
   * @param {Object} [task]
   * @returns {Response|Promise}
   */
  postTask (task) {
    return axios.post(url.taskAdd, task)
  },
  /**
   * Added new task
   * @param {Object} [task]
   * @returns {Response|Promise}
   */
  updateTask (task) {
    return axios.patch(url.taskUpdate, task)
  },
  /**
   * Delete task
   * @param {Number} [taskId]
   * @returns {Response|Promise}
   */
  deleteTask (taskId) {
    return axios.delete(`${url.taskDelete}/${store.getters.id}/${taskId}`)
  },
}
