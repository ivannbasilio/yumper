<template>
	<div class="home">
		<keep-alive>
        <component :is="currentPage" v-bind="properties"></component>
    </keep-alive>
	</div>
</template>
<script>
import Presentation from '../presentation/Presentation'
import Share from '../share/Share'

export default {
	name: 'Home',
	props: ['accountId'],
	components: {
		Presentation,
		Share
	},
	data() {
		return {
			isActive: true,
			currentPage: Presentation
		}
	},
	created() {
		this.currentPage = !this.accountId ? Presentation : Share
	},
	computed: {
		properties() {
			return {
				id: this.accountId
			}
		}
	}
}
</script>