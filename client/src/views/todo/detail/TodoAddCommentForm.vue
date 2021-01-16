<template>
	<form
		class="comments__form"
		@submit.prevent="addComment"
		@keydown.enter="addComment"
	>
		<div class="form__field">
			<label :for="`task-form-${todoId}`">Добавить комментарий:</label>
			<textarea
				v-model.trim="formInputComment"
				:name="`task-${todoId}-comment`"
				:id="`task-form-${todoId}`"
			></textarea>
		</div>
		<button type="submit">Добавить</button>
	</form>
</template>

<script>
export default {
	name: 'TodoAddCommentForm',
	data() {
		return {
			formInputComment: ''
		}
	},
	computed: {
		todoId() {
			return parseInt(this.$route.params.id)
		}
	},
	methods: {
		addComment() {
			this.$store.dispatch('addComment', {
				taskId: Number(this.todoId),
				text: this.formInputComment
			}).then(data => {
				this.$store.dispatch('addComment', data).then(data => {
					this.$notify({
						group: 'private',
						type: 'success',
						title: data.author,
						text: `${data.text}: ${data.msg}`
					});
				})
				this.formInputComment = ''
			})
		}
	}
}
</script>

<style lang="less" scoped>
.comments__form {
	form& {
		max-width: unset;
	}

	.form__field {
		display: flex;
		flex-direction: column;
	}
}
</style>
