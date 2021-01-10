<template>
	<section class="task-details">
		<h1>
			"{{ task.title }}"
		</h1>
		<p v-if="task.text">
			<strong>Заметка к задаче: </strong>
			{{ task.text }}
		</p>
		<div class="task__comments_wrapper" :class="{ 'wrappper_border-top': comments.length }">
			<ul v-if="comments.length">
				<li v-for="comment in comments" :key="`${comment.id}-${id}`">
					{{ comment.text }}
				</li>
			</ul>
			<p v-else><strong>Комментариев к задаче нету</strong></p>
			<div class="task__comments_input-box">
				<form
					class="task__comments__form"
					@submit.prevent="addTaskComment"
					@keydown.enter="addTaskComment"
				>
					<div class="form__field">
						<label :for="`task-form-${id}`">Добавить комментарий:</label>
						<textarea
							v-model.trim="taskCommentInput"
							:name="`task-${id}-comment`"
							:id="`task-form-${id}`"
						></textarea>
					</div>
					<button type="submit">Добавить</button>
				</form>
			</div>
		</div>
    <router-link :to="{ name: 'todo' }">К списку задач</router-link>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'TodoDetail',
	props: {
		id: [String, Number]
	},
	data() {
		return {
			task: {},
			comments: [],
			taskCommentInput: ''
		}
	},
	computed: {
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
		this.$store.dispatch('fetchTaskComments', Number(this.id)).then(data => this.comments = data)
	},
	methods: {
		addTaskComment() {
			this.$store.dispatch('addComment', {
				taskId: Number(this.id),
				text: this.taskCommentInput
			}).then(data => {
				this.comments.push(data)
				this.taskCommentInput = ''
			})
		}
	}
}
</script>

<style lang="less" scoped>
.task-details {
	height: 100%;
}

.task__comments {
	&__form {
		form& {
			max-width: unset;
		}

		.form__field {
			display: flex;
			flex-direction: column;
		}
	}

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
