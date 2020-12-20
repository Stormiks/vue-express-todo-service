const baseUrlApi = '/api'

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
  taskUpdate: `${baseUrlApi}/todos`
}