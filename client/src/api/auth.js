import axios from 'axios'
import url from './apiUrl'

export default {
  /**
   * Login users
   * 
   * @param {Object} [data]  
   * @returns {Response|Promise}
   */
  postLogin (data) {
    return axios.post(url.login, data)
  },
  /**
   * Register users
   * 
   * @param {Object} [data]  
   * @returns {Response|Promise}
   */
  postRegister (data) {
    return axios.post(url.register, data)
  },
  /**
   * Logout users
   * 
   * @param {Object} [data]  
   * @returns {Response|Promise}
   */
  getLogout (data) {
    return axios.get(url.logout, data)
  }
}