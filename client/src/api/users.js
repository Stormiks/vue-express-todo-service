import axios from 'axios'
import url from './apiUrl'

export default {
  /**
   * Login users
   *  
   * @returns {Response|Promise}
   */
  getUsers () {
    return axios.get(url.allUsers)
  },
  /**
   * Get user
   * @param {Number} [userId]
   * @returns {Response|Promise}
   */
  getProfile (userId) {
    return axios.get(`${url.profileById}/${userId}`)
  },
  /**
   * Download avatar user
   * @param {Number} [userId]
   * @returns {Response|Promise}
   */
  postUpdateProfile (obj) {
    return axios.post(`${url.profileById}/${obj.userId}`, obj.body, {
      headers: {
        'Content-Type': 'form/multipart'
      }
    })
  },
}