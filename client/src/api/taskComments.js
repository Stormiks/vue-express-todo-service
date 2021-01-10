import axios from 'axios'
import url from './apiUrl'
// import store from '../store'

export default {
  getTaskComments(taskId) {
    return axios.get(`${url.taskComments}/${taskId}`, {
    })
	},
	postComment(comment) {
		return axios.post(url.commentAdd, {
			taskId: comment.taskId,
			userId: comment.userId,
			text: comment.text
		})
	}
}
