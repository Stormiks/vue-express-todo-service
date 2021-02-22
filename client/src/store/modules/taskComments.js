/* eslint-disable no-empty-pattern */
import taskComments from './../../api/taskComments'

export default {
	state: {
		commentsTask: []
	},
	mutations: {
		SET_COMMENTS_TO_OPEN_TASK(state, comments) {
			state.commentsTask = comments
		},
		PUSH_COMMENT_TO_OPEN_TASK(state, newComment) {
			state.commentsTask.push(newComment)
		}
	},
	actions: {
		fetchTaskComments({ commit }, taskId) {
			taskComments.getTaskComments(taskId).then(res => {
				if (res.data) {
					commit('SET_COMMENTS_TO_OPEN_TASK', res.data.comments)
				}
			}).catch(err => console.error(err))
		},
		async fetchTaskCommentsCount({}, taskId) {
			const res = await taskComments.getCommentCount(taskId)
			return res.data.taskCommentsCount
		},
		async addComment({ commit }, comment) {
			comment.userId = this.state.user.profile.id
			try {
				const res = await taskComments.postComment(comment)
				const commentData = res.data.comment
				commit('PUSH_COMMENT_TO_OPEN_TASK', commentData)
				return {
					msg: res.data.message,
					text: commentData.text,
					author: commentData.user.login
				}
			} catch (err) {
				return console.error(err)
			}
		}
	},
	getters: {
		countCommentsInTask(state) {
			return state.commentsTask.length
		}
	}
}
