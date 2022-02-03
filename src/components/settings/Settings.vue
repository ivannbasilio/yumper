<template>
	<div class="container">
		<!-- Menu -->
		<Menu></Menu>
		<!-- Menu end -->

		<!-- Row -->
		<div class="row margin-top__8">
			<div class="col-5">
				<div class="image-profile-wrapper">
					<div class="circular-image circular-image__large" 
						:style="{ 'background-image' : `url(${account.profileImage})`}"
						v-if="!isUploading">
					</div>

					<div class="circular-image 
						circular-image__large 
						placeholder-image 
						blink"
						v-if="isUploading">
					</div>

					<input type="file" ref="fileInput" 
						accept="image/x-png,
						image/gif,
						image/jpeg"
						@change="handleSelectedFile"
						hidden="true">
	
					<button class="btn-circle btn-color__primary btn-circle__small"
						@click="performFakeClick">
						<i class="gg-software-upload"></i>
					</button>
				</div>
			</div>
		</div>
		<!-- Row end -->

		<!-- Row -->
		<div class="row margin-top__32">
			<div class="col-5">
				<h5>Nome de usuário</h5>
			</div>
		</div>
		<!-- Row end -->

		<!-- Row -->
		<div class="row">
			<div class="col-5">
				<input type="text" 
					placeholder="@nomedeusuario" 
					v-model="account.id"
					v-on:keyup="verifyId">
				<div v-if="messageIdExists != null">
					{{ messageIdExists }}
				</div>
			</div>
		</div>
		<!-- Row end -->

		<!-- Row -->
		<div class="row margin-top__32">
			<div class="col-5">
				<h5>Nome</h5>
			</div>
		</div>
		<!-- Row end -->

		<!-- Row -->
		<div class="row">
			<div class="col-5">
				<input type="text" 
					placeholder="Nome da gráfica"
					v-model="account.name">
			</div>
		</div>
		<!-- Row end -->

		<!-- Row -->
		<div class="row margin-top__16">
			<div class="col-5">
				<button class="btn-regular btn-color__primary"
				@click="saveChanges">Salvar</button>
			</div>
		</div>
		<!-- Row end -->

		<Sidebar></Sidebar>

	</div>
</template>
<script>
import firebase from 'firebase/app'
import { firestore, storage } from '../../firebase'
import Menu from '../menu/Menu'
import Sidebar from '../sidebar/Sidebar'

export default {
	name: 'Settings',
	components: {
		Menu,
		Sidebar
	},
	data() {
		return {
			messageIdExists: null,
			account: {
				id: null,
				name: null,
			},
			isLoading: false,
			isUploading: false
		}
	},
	mounted() {
		this.$nextTick(function () {
			this.loadAccount();
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
				else {
					this.isNotFound = true
				}
			})
			.catch(() => {
				this.isLoading = false
				this.isNotFound = true
			})
		},

		verifyId(event) {
			const id = event.target.value
				
			if (/\s/.test(id)) {
				// s
			}
			else {
				firestore.collection('accounts')
				.where('id', '==', id)
				.get()
				.then(res => {
					if (!res.empty) {
						this.messageIdExists = "Nome de usuário já está em uso"
					}
					else {
						this.messageIdExists = "Nome de usuário disponível!"
					}
				})
			}
		},
		/**
		 * Actioned by click on button to save data on form
		 *
		 * @param {void}
		*/
		saveChanges() {
			const PREFIX = '@'

			const id = this.account.id;

			if (id.charAt(0) != PREFIX) {
				this.account.id = PREFIX + id
			}
			this.setData({
				account: {
					id: this.account.id,
					name: this.account.name,
					profileImage: this.account.profileImage,
					updated: firebase.firestore.FieldValue.serverTimestamp()
				},
				successMessage: 'Seus dados foram atualizados',
				failureMessage: 'Não foi possível atualizar seus dados'
			})
		},
		/**
		 * Set data on Firebase receiving data as param 
		 *
		 * @param {data} object with account object and message
		 *               to success/failure status
		*/
		setData(data) {
			firestore.collection('accounts')
			.doc(this.accountId)
			.update(data.account)
			.then(() => {
				this.isUploading = false
				this.$toast.success(data.successMessage)
			})
			.catch(() => {
				this.isUploading = false
				this.$toast.failure(data.failureMessage)
			})
		},
		/**
		 * Upload the image file to object and recovery
	 	 * the image url salved in Storage
		 *
		 * @param {void}
		*/
		upload() {
			this.isUploading = true

			this.fileRef = `profileImage/${this.account.storageId}/${this.file.name}`

			const ref = storage.ref(this.fileRef);

			ref.put(this.file)
			.then(() => {
				ref.getDownloadURL()
				.then(url => {
					this.isUploading = false

					this.account.profileImage = url

					this.setData({
						account: {
							profileImage: this.account.profileImage,
							updated: firebase.firestore.FieldValue.serverTimestamp()
						},
						successMessage: 'Imagem de perfil atualizada',
						failureMessage: 'Não foi possível atualizar a imagem de perfil'
					})
				})
				.catch(() => {
					this.isUploading = false

					this.$toast.error('Não foi possível atualizar a imagem de perfil')
				})
            })
            .catch(err => {
                this.isUploading = false
                this.$toast.error('Não foi possível atualizar a imagem de perfil')

                this.error = err
                this.files = []			
            });
        },
		/**
         * Handle file selected by user on window file
         *
         * @param {event}
        */
        handleSelectedFile(event) {
			this.file = this.renameFile(event.target.files[0])
		
			this.upload()
		},
		/**
		 * Rename file using user's StorageID 
		 *
		 * @param {file} object received from input
		*/
		renameFile(file) {
			const slices = file.name.split('.')
			const ext    = slices[slices.length - 1]

			const metaType = 'image/' + ext;
			const newName  = this.account.storageId + '.' + ext;

			const blob = file.slice(0, file.size, metaType)
			const newFile = new File([blob], newName, {type: metaType})

			return newFile;
		},
		/**
		 * Because input type file is hidden, we performing a fake click
		 * in input when user to click in another button 
		 *
		 * @param {void}
		*/
		performFakeClick() {
			this.$refs.fileInput.click()
		},
	}
}
</script>