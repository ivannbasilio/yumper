<template>
	<div class="container">
		<Menu></Menu>

		<div class="scroll">
			<div style="position: absolute; left: 40%; top: 40%;"
				v-if="isEmpty || isFailure">
				<span class="color__text" v-if="isEmpty || !isFailure">
					Ainda não há documentos para impressão
				</span>
				<span class="color__text" v-if="!isEmpty || isFailure">
					Houve algum erro ao buscar os documentos
				</span>
			</div>
			<!-- First row -->
			<div class="row">
				<div class="col-4"  v-for="(entry, i) in files" :key="i">

					<!-- File -->
					<div class="file">
						<div class="file__header">
							<b>{{ entry.file | truncate(25) }}</b>
						</div>
						<div class="file__actions">
							<button class="btn-circle btn-color__accent"
								@click="deleteOrder(entry.id, entry.file + '.'+entry.type)">
								<i class="gg-close"></i>
							</button>
							<button class="btn-circle btn-color__primary" style="margin-left: 6px;"
								@click="printDocument(entry.link)">
								<i class="gg-printer"></i>
							</button>
						</div>
					</div>
					<!-- File end -->

				</div>
			</div>
			<!-- First row end -->
		</div>

		<Sidebar></Sidebar>
	</div>
</template>
<script>

import { firestore, storage } from '../../firebase'
import printJS from 'print-js'
import Menu from '../menu/Menu'
import Sidebar from '../sidebar/Sidebar'

export default {
	name: 'Feed',
	components: {
		Menu,
		Sidebar
	},
	data() {
		return {
			files: [],
			isLoading: true,
			isEmpty: false,
			isFailure: false
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.loadFeed();
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
		 * Load store account infos by id provides on url
		 *
		 * @param {void}
		*/
		loadFeed() {
			firestore.collection('received')
			.where('key', '==', this.accountId)
			.get()
			.then(res => {
				this.isLoading = false
				this.isEmpty = res.empty

				if (!this.isEmpty) {
					const data = res.docs

					this.files = data.map(tmp => {
						var doc    = tmp.data()
							doc.id = tmp.id

						return doc
					})
				}
			})
			.catch(() => {
				this.isLoading = false
				this.isFailure = true	
			})
		},
		/**
		 * Delete order sent by user. This function delete document
		 * on Firestore
		 *
		 * @param {documentId} document id on Firestore
		*/
		deleteReceived(documentId, fileName) {
			firestore.collection('received')
			.doc(documentId)
			.delete()
			.then(() => {
				this.deleteFile(fileName)
			})
			.catch(() => {
				this.$toast.error('O documento não foi deletado')
			})
		},
		/**
		 * Delete file sent by user. This function delete file
		 * on Firebase Storage
		 *
		 * @param {fileName} file name on Firebase Storage
		*/
		deleteFile(fileName) {
			const ref = `${this.account.storageId}/${fileName}`

			storage.child(ref)
			.delete()
			.then(() => {
				this.$toast.success('O documento foi deletado')
			})
			.catch(() => {
				this.$toast.error('O documento não foi deletado')
			})
		},
		/**
		 * Load document by link and call modal to print
		 *
		 * @param {link} link to file
		*/
		printDocument(link) {
			printJS({
				printable: link,
				modalMessage: 'Carregando documento...', 
				showModal: true
			})
		}
	}
}
</script>