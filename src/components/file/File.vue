<template>
	<div class="flex">
		{{ name }}
		<button v-on:click='onClickAccept()'>Click</button>
	</div>
</template>
<script>
	export default {
		name: 'File',
		props: {
			id: String,
			name: String
		},
		data() {
			return {
				msg: 'It\'s working!'
			}
		},
		methods: {
			onClickAccept() {
				this.$emit('onAccept', this.id)
			}
		}
	}
</script>