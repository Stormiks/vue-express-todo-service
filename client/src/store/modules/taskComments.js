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
		addComment({ commit }, comment) {
			comment.userId = this.state.user.profile.id
			return taskComments.postComment(comment).then(res => {
        const comment = res.data
        commit('PUSH_COMMENT_TO_OPEN_TASK', comment)
        return comment
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
