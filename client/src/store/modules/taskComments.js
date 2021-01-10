import taskComments from './../../api/taskComments'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
		fetchTaskComments({ }, taskId) {
			return taskComments.getTaskComments(taskId).then(res => res.data.comments)
			.catch(err => console.error(err))
		},
		addComment({ }, comment) {
			comment.userId = this.state.user.profile.id
			return taskComments.postComment(comment).then(res => res.data)
			.catch(err => console.error(err))
		}
  },
  getters: {}
}
