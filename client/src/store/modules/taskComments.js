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
			})
			.catch(err => console.error(err))
		},
		fetchTaskCommentsCount({}, taskId) {
			return taskComments.getCommentCount(taskId).then(res => res.data.taskCommentsCount)
		},
		addComment({ commit }, comment) {
			comment.userId = this.state.user.profile.id
			return taskComments.postComment(comment).then(res => {
				const comment = res.data.comment
				commit('PUSH_COMMENT_TO_OPEN_TASK', comment)
				return {
					msg: res.data.message,
					text: comment.text,
					author: comment.user.login
				}
			})
			.catch(err => console.error(err))
		}
	},
	getters: {
		countCommentsInTask(state) {
			return state.commentsTask.length
		}
	}
}
