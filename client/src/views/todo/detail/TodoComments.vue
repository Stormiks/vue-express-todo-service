<template>
	<ul>
		<todo-comment
			v-for="comment in comments"
			:key="`task-${comment.taskId}-comment-${comment.id}`"
			:comment="comment"
		></todo-comment>
	</ul>
</template>

<script>
import TodoComment from './TodoComment'
import { mapState } from 'vuex'

export default {
	name: 'TodoComments',
	components: {
		TodoComment
	},
	computed: mapState({
		comments: state => state.taskComments.commentsTask
	})
}
</script>

<style lang="less" scoped>
ul {
	overflow-y: auto;
	padding: 1em 0;
}
</style>
