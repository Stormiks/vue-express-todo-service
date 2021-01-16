<template>
	<li>
		<strong>{{ comment.user.login }}:</strong>
		<span>{{ comment.text }}</span>
		<time>{{ convertDateCreated }}</time>
	</li>
</template>

<script>
import moment from 'moment'

export default {
	name: 'TodoComment',
	props: {
		comment: {
			type: Object
		}
	},
	computed: {
		convertDateCreated() {
			return moment(this.comment.createdAt).format('YYYY-MM-DD HH:mm')
		}
	}
}
</script>

<style lang="less" scoped>
li {
	display: flex;
	justify-content: space-between;
	margin: .2em 0;
}

strong {
	padding-right: .3em;
}

span {
	flex-grow: 1;
	padding-left: .5em;
	padding-right: .5em;
}

time {
	flex-basis: 21%;
	min-width: 140px;
	padding-left: .5em;
}
</style>
