<template>
	<div>
		<!-- Toolbar -->
		<div class="row margin-top__8">
			<div class="col-1 col-2-sm">
				<i class="gg-arrow-left" style="margin-left: 10px;"></i>
			</div>
			<div class="col-11 col-10-sm">
				<b>Enviar arquivo</b>
			</div>
		</div>
		<!-- Toolbar end -->

		<!-- Container -->
		<div class="container">
			<div class="user">
				<!-- Placeholder -->
				<div class="row"  v-if="isLoading">
					<div class="col-3 col-3-sm">
						<div class="placeholder-image placeholder-image__64 blink">
						</div>
					</div>
					<div class="col-9 col-6-sm">
						<div class="placeholder-title blink" style="width: 80%; height: 25px;"></div>
						<div class="placeholder-title margin-top__8 blink" style="width: 50%; height: 25px;"></div>
					</div>
					<div class="col-3 col-3-sm right blink">
						<div class="placeholder-button"></div>
					</div>
				</div>
				<!-- Placeholder end -->

				<!-- Profile -->
				<div class="row"  v-if="!isLoading && !isNotFound">
					<div class="col-3 col-3-sm">
						<div class="store__image" 
							:style="{ 'background-image' : `url(${account.profileImage})`}">
						</div>
					</div>
					<div class="col-9 col-6-sm">
						<b>{{ account.id }}</b>
						<div>{{ account.name }}</div>
					</div>
					<div class="col-3 col-3-sm right">
						<input type="file" ref="fileInput" 
							accept="application/pdf, 
							application/vnd.ms-excel, 
							application/vnd.ms-docx"
							@change="handleFile"
							hidden="true">
	
						<button class="btn-upload" @click="performFakeClick"
							v-if="!account.locked">
							<i class="gg-attachment"></i>
						</button>
					</div>
				</div>
				<!-- Profile end -->
			</div>
		</div>
		
		<!-- Divider -->
		<div class="divider"  v-if="!isLoading && !isNotFound"></div>
		<!-- Divider end -->

		<div v-if="account.locked" style="padding: 12px; margin-top: 32px; text-align: center;">
			Essa conta não está recebendo documentos no momento
		</div>

		<!-- Nof found state -->
		<div class="container" v-if="!isLoading && isNotFound">
			<div class="row">
				<div class="color__text center">
					<b>Ops... não deu certo</b>
				</div>
				<div class="color__subtitle center">
					Não conseguimos encontrar essa gráfica =/ você tem certeza que digitou 
					corretamente?
				</div>
			</div>
		</div>
		<!-- Nof found state end -->

		<!-- Container -->
		<div class="container" v-if="isFileSeleced">	
			<div class="row attachment margin-top__16">
				<div class="col-9 col-9-sm">
					<div class="attachment__info">
						<b class="color__text">
							{{ file.name | truncate(30) }} 
						</b>
						<div class="block">
							<small class="color__subtext">
								{{ formatSize(file.size) }}
							</small>
						</div>
					</div>
				</div>
				<div class="col-3 col-3-sm center">
					<div class="attachment__icon right">
						<button @click="removeAttachment">
							<i class="gg-close"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
		<!-- Container end -->

		<!-- Send button placeholder  -->
		<div class="send-wrapper" v-if="isFileSeleced">
			<button class="btn-regular btn-color__primary"
			@click="upload()">
				<span v-if="!isLoading">Enviar arquivo</span>
				<span v-if="isLoading">Enviando...</span>
			</button>
		</div>
		<!-- Send button placeholder end -->

	</div>
</template>
<script>
import firebase from 'firebase/app'
import { firestore, storage } from '../../firebase'

export default {
	name: 'Share',
	props: ['id'],
	data() {
		return {
			store: null,
			message: "Share",
			account: {},
			formats: ['pdf'],
			isUploading: false,
			isLoading: true,
			isNotFound: false,
			isFileSeleced: false,
			files: [],
			file: {
				name: {},
				length: 0
			}
		}
	},
	mounted() {
		this.$nextTick(() => {
			document.title = 'Carregando...'
			this.loadAccounts();
		})
	},
	methods: {
		/**
		 * Load store account infos by id provides on url
		 *
		 * @param {void}
		*/
		loadAccounts() {
			firestore.collection('accounts')
			.where('id', '==', `@${this.id}`)
			.where('commercial', '==', true)
			.get()
			.then(res => {
				this.isLoading = false

				if(!res.empty) {
					const doc = res.docs[0]

					this.account     = doc.data();
					this.account.key = doc.id

					document.title = this.account.name
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
		/**
		 * Upload the image file to object and recovery
	 	 * the image url salved in Storage
		 *
		 * @param {void}
		*/
		upload() {
			this.isUploading = true

			const file = this.files[0]
			this.fileRef = `docs/${this.account.storageId}/${file.name}`

			var ref = storage.ref(this.fileRef);

			ref.put(file)
			.then(() => {
                ref.getDownloadURL()
                .then(link => {
                    this.createReceived({
                        fileName: this.getFileNameWithoutType(file),
                        link: link,
                        type: this.getFileType(file)
                    })
                })
                .catch(() => {
                    this.$toast.error('Não foi possível fazer o envio')
                    this.deleteFile()

                    this.isUploading = false
                })
            })
            .catch(() => {
                this.$toast.error('Não foi possível fazer o envio')
                this.files = []			

                this.removeAttachment()
                this.isUploading = false
            });
        },
        /**
         * Adds the item object definitely on Firestore with
         * infos that it need
         *
         * @param {data}
        */
        createReceived(data) {
            const received = {
                file: data.fileName,
                key: this.account.key,
                link: data.link,
                type: data.type,
                created: this.now()
            }

            firestore.collection('received')
            .doc()
            .set(received)
            .then(() => {
                this.$toast.success('Seu arquivo foi enviado')
                this.removeAttachment()

                this.isUploading = false
            })
            .catch(() => {
                this.deleteFile()

                this.isUploading = false
            });
        },

        /**
     	 * The send process is do in three steps: first we do upload, 
     	 * after we recover the file download link and finally build 
     	 * an object to save info in Firestore. In case of some step
     	 * failure, we must delete file on Storage.
     	 *
     	 * @param {void} 
     	*/
        deleteFile() {
            if (this.fileRef) {
               return storage.ref(this.fileRef).delete()
            }
        },
        /**
         * Handle file selected by user on window file
         *
         * @param {event}
        */
        handleFile(event) {
			this.file = event.target.files[0]
			const type = this.getFileType(this.file)

			const allowed = this.formats.find(ext => ext === type)

			if (allowed) {
				this.isFileSeleced = true

				this.docId = firestore.collection('docs').doc().id
				this.files.push(this.file)
				
				if (this.isImage) this.preview(this.file)
			}
			else {
				this.$toast.error('Esse tipo de arquivo não é permitido')
			}
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
		/**
		 * This method get bytes number from file and formats to
		 * we show on UI
		 *
		 * @param {bytes}
		*/
		formatSize(bytes) {
			const sizes = ['bytes', 'kb', 'MB', 'GB', 'TB'];

			if (bytes == 0) return '0 byte';

			const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

			return Math.round(bytes / Math.pow(1024, i), 2) + '' + sizes[i];
		},
		/**
		 * Gets the file name, divided by '.' and extract the extension
		 *
		 * @param {file}
		*/
		getFileType(file) {
			const name = file.name;
			const index = name.lastIndexOf('.');

			return name.substring(index + 1);
		},
		/**
		 * Gets the file name, divided by '.' without extension
		 *
		 * @param {file}
		*/
		getFileNameWithoutType(file) {
			const name = file.name;
			return name.split('.')
				.slice(0, -1)
				.join('.');
		},
		/**
		 * Remove file from UI and clear variablr ref
		 *
		 * @param {void}
		*/
		removeAttachment() {
			this.file = null
			this.isFileSeleced = false
		},
		/**
		 * Get timestamp setup by Firebase to register
		 * create date
		 *
		 * @param {void}
		*/
		now() {
			return firebase
			.firestore
            .FieldValue
            .serverTimestamp();
		}
    }	
}	
</script>