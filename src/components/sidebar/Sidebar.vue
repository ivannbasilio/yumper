<template>
	<div class="sidebar">
		<ul>
			<li>
				<a href="javascript:void(0)" @click="lockAccountSwitch">
					<i class="gg-coffee" v-if="!account.locked"></i>
					<i class="gg-lock" v-if="account.locked" style="margin-top: -5px;"></i>
				</a>
			</li>
			<li>
				<a href="javascript:void(0)">
					<i class="gg-log-off"></i>
				</a>
			</li>
		</ul>
	</div>
</template>
<script>
import { firestore } from '../../firebase'

export default {
	name: 'Sidebar',
	data() {
		return {
			account: {},
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.loadAccount()
			this.watchAccountUpdates()
		})
	},
	computed: {
		/**
		 * Get uid from url
		 *
		 * @param {void}
		*/
		accountId() {
			return this.$router
			.currentRoute
			.query
			.uid
		}
	},
	methods: {

		/**
		 * Load user account to show data on UI
		 *
		 * @param {void}
		*/
		loadAccount() {
			firestore.collection('accounts')
			.doc(this.accountId)
			.get()
			.then(res => {
				this.isLoading = false

				if(!res.empty) {
					this.account = res.data();
				}
			})
		},

		/**
		 * When account document is updated, this functions is
		 * actioned and we change icon
		 *
		 * @param {void}
		*/
		watchAccountUpdates() {
			firestore.collection('accounts')
			.doc(this.accountId)
			.onSnapshot((doc) => {
				this.account = doc.data()
			})
		},

		/**
		 * The user can lock the account to no receiver new
		 * documents updates
		 *
		 * @param {void}
		*/
		lockAccountSwitch() {
			firestore.collection('accounts')
			.doc(this.accountId)
			.update({
				locked: !this.account.locked
			})
		},
	},
}
</script>