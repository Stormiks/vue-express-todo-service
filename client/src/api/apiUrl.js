const baseUrlApi = '/api'
import axios from 'axios'

const token = localStorage.getItem('token')
if (token)
	axios.defaults.headers.common['Authorization'] = token

export default {
  login: `${baseUrlApi}/login`,
  register: `${baseUrlApi}/register`,
  allUsers: `${baseUrlApi}/users`,
  profileById: `${baseUrlApi}/profile`,
  logout: `${baseUrlApi}/logout`,
  taskAdd: `${baseUrlApi}/todos/add`,
  taskDelete: `${baseUrlApi}/todos/del`,
  tasksAll: `${baseUrlApi}/todos`,
  taskGet: `${baseUrlApi}/todos`,
  taskUpdate: `${baseUrlApi}/todos`,
  taskComments: `${baseUrlApi}/todos/comments`,
  commentAdd: `${baseUrlApi}/comments/add`
}
