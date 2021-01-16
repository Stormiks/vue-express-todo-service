<template>
	<section class="task-details">
		<h1>
			"{{ task.title }}"
		</h1>
		<p v-if="task.text">
			<strong>Заметка к задаче: </strong>
			{{ task.text }}
		</p>
		<div class="task__comments_wrapper" :class="{ 'wrappper_border-top': countCommentsInTask }">
			<todo-comments
				v-if="countCommentsInTask"
			></todo-comments>

			<p v-else><strong>Комментариев к задаче нету</strong></p>
			<div class="task__comments_input-box">
				<todo-add-comment-form
				></todo-add-comment-form>
			</div>
		</div>
    <router-link :to="{ name: 'todo' }">К списку задач</router-link>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import TodoComments from './detail/TodoComments'
import TodoAddCommentForm from './detail/TodoAddCommentForm'

export default {
	name: 'TodoDetail',
	props: {
		id: [String, Number]
	},
	components: {
		TodoComments,
		TodoAddCommentForm
	},
	data() {
		return {
			task: {}
		}
	},
	computed: {
		...mapGetters([
			'countCommentsInTask'
		]),
		todoDetail() {
			return this.$store.state.task.tasks.filter(t => t.id === Number(this.id))
		}
	},
	created() {
		this.$store.dispatch('fetchDetailInfoTask', Number(this.id)).then(data => {
			this.task = data
		})
	},
	mounted() {
		this.$store.dispatch('fetchTaskComments', Number(this.id))
	}
}
</script>

<style lang="less" scoped>
.task-details {
	height: 100%;
}

.task__comments {
	&_wrapper {
		padding-left: 1.5em;
		padding-right: 1.5em;
		margin-top: .7em;
		margin-bottom: .7em;

		&.wrappper_border-top {
			border-top: 1px solid #aba7a7;
		}
	}
}
</style>
