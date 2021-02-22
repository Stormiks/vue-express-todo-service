/* eslint-disable no-empty-pattern */
import Vue from 'vue'
import taskComments from './../../api/taskComments'

export default {
	state: {
		commentsTask: {}
	},
	mutations: {
		SET_COMMENTS_TO_OPEN_TASK(state, { taskId, comments }) {
			Vue.set(state.commentsTask, taskId, comments)
		},
		PUSH_COMMENT_TO_OPEN_TASK(state, { taskId, comment }) {
			state.commentsTask[taskId].push(comment)
		}
	},
	actions: {
		fetchTaskComments({ commit }, taskId) {
			taskComments.getTaskComments(taskId).then(res => {
				if (res.data) {
					commit('SET_COMMENTS_TO_OPEN_TASK', { taskId, comments: res.data.comments })
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
				await commit('PUSH_COMMENT_TO_OPEN_TASK', { taskId: comment.taskId, comment: commentData })

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
		countCommentsInTask (state) {
			return Object.keys(state.commentsTask).length
		},
		getComments: (state => taskId => {
			// https://eslint.org/docs/rules/no-prototype-builtins
			return Object.prototype.hasOwnProperty.call(state.commentsTask, taskId) ? state.commentsTask[taskId] : []
		})
	}
}
