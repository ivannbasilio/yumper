<template>
	<div>
	
	</div>
</template>
<script>
export default {
	name: 'Lab',
	data() {
		return {
			newName: '9ZwPLrckffJIDxFEYThVOzJX6iwP2MIy'
		}
	},
	created() {
		console.log(this.sanitize('pdf'))
	},
	methods: {
		sanitize(type) {
			var formats = ['pdf']
			const allowed = formats.find(ext => ext == type)

			if (allowed) {
				console.log('Permitted')
			}
			else {
				console.log('Not permitted')	
			}
		}
	}
}
</script>