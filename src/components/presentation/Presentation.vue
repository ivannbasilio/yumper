<template>
	<div>
		<div class="home-wrapper">
			<div class="container">
				<div class="row hidden-sm" style="padding-top: 20px;">
					<!-- Col 1 -->
					<div class="col-1">
						<img src="../../assets/img/logo-light.png" 
						class="responsive-image"
						style="margin-left: 10px;">
					</div>
					<!-- Col 1 end -->

					<div class="col-7">
						<ul class="home-menu">
							<li>
								<a href="/">Home</a>
							</li>
							<li>
								<a href="#how-work">Como funciona</a>
							</li>
							<li>
								<a href="#benefits">Benefícios</a>
							</li>
						</ul>
					</div>

					<!-- Col 2 -->
					<div class="col-4" style="text-align: right;">
						<button @click="signIn"
									class="btn-regular btn-color__white">
									Entrar com <i class="gg-google"></i>
								</button>
					</div>
					<!-- Col 2 end -->
				</div>

				<div class="row show-sm">
					<div class="col-2-sm">
						<img src="../../assets/img/logo-light.png" 
						class="responsive-image"
						style="margin-left: 10px;">
					</div>
					<div class="col-10-sm" style="text-align: right;">
						<button style="background: transparent; color: #fff;"
							@click="toogleMobileMenu">
							<i class="gg-menu"></i>
						</button>
					</div>
				</div>

				<div class="row margin-top__64">
					<!-- Col 1 -->
					<div class="col-12 col-12-sm center">
						<div class="row">
							<div class="col-12 text text-color__white">
								<h1 class="hidden-sm">
									Receba documentos para impressão de forma prática e rápida
								</h1>
								<h2 class="show-sm">Receba documentos para impressão de forma prática e rápida</h2>
								<article class="margin-top__8 text-color__white">
									Nada de pen drive, celulares ou cabos. Sem contato.
								</article>
							</div>
						</div>
						<div class="row show-sm margin-top__32">
							<div class="col-12-sm center">
								<button class="btn-regular btn-color__accent"
								@click="signIn">
									Começar com <i class="gg-google"></i></button>
							</div>
						</div>
						<div class="row margin-top__32 hidden-sm">
							<div class="col-12 col-12-sm">
								<button class="btn-regular btn-color__accent"
								@click="signIn">
									Começar com <i class="gg-google"></i></button>
							</div>
						</div>
					</div>
					<!-- Col 1 end -->
				</div>
				<!-- Row end -->

				<div class="mobile-side-menu-wrapper show-sm" v-if="showMobileMenu">
					<div>
						<button style="margin-left: 13px; margin-top: 20px; background: transparent;"
						@click="toogleMobileMenu">
							<i class="gg-close"></i>
						</button>
					</div>
					<div class="mobile-side-menu">
						<ul>
							<li>
								<a href="#how-work-mobile">Como funciona</a>
							</li>
							<li>
								<a href="#benefits">Benefícios</a>
							</li>
							<li>
								<a href="https://www.instagram.com/yeshstudio" 
								target="_blank">@yeshstudio</a>
							</li>
						</ul>
					</div>
				</div>

			</div>
			<!-- Container end -->
		</div>

		<!-- How work wrapper -->
		<div id="how-work" class="how-work-wrapper hidden-sm">
			<div class="container">

				<!-- Row 1 -->
				<div class="row margin-top__32">
					<p class="center color__subtext">
						<span class="line line__dark"></span> É muito simples
					</p>
					<div class="center color__text">
						<h1>Como o Yumper funciona?</h1>
					</div>
				</div>
				<!-- Row 1 end -->

				<!-- Row 2 -->
				<div class="row margin-top__64">
					<div class="col-4 center">
						<div class="topic">
							1
						</div>
						<div class="topic-message color__text margin-top__16">
							Destaque seu link de usuário em algum lugar visível
						para que seus clientes possam ver facilmente
						</div>
					</div>
				
					<div class="col-4 center">
						<div class="topic">
							2
						</div>
						<div class="topic-message margin-top__16 color__text">
							Peça que seu cliente acesse seu link e selecione o arquivo
						que deseja enviar
						</div>
					</div>
			
					<div class="col-4 center">
						<div class="topic">
							3
						</div>
						<div class="topic-message margin-top__16 color__text">
							Receba o arquivo em tempo-real que seu cliente enviou na sua tela.
						Agora é só imprimir!
						</div>
					</div>
				</div>
				<!-- Row 4 end -->
			</div>
		</div>
		<!-- How work wrapper end -->

		<!-- How work wrapper MOBILE VERSION -->
		<div id="how-work-mobile" class="show-sm">
			<div class="container">

				<!-- Row 1 -->
				<div class="row margin-top__32">
					<p class="center color__subtext">
						<span class="line line__dark"></span> É muito simples
					</p>
					<div class="center color__text">
						<h1 class="hidden-sm">Como o Yumper funciona?</h1>
						<h2>Como o Yumper funciona?</h2>
					</div>
				</div>
				<!-- Row 1 end -->

				<!-- Row 2 -->
				<div class="row margin-top__32">
					<div class="col-12 center">
						<div class="topic">
							1
						</div>
						<div class="topic-message color__text margin-top__16">
							Destaque seu link de usuário em algum lugar visível
						para que seus clientes possam ver facilmente
						</div>
					</div>
				</div>
				<!-- Row 2 end -->

				<!-- Row 3 -->
				<div class="row margin-top__16">
					<div class="col-12 center">
						<div class="topic">
							2
						</div>
						<div class="topic-message margin-top__16 color__text">
							Peça que seu cliente acesse seu link e selecione o arquivo
						que deseja enviar
						</div>
					</div>
				</div>
				<!-- Row 3 end -->

				<!-- Row 4 -->
				<div class="row margin-top__16">
					<div class="col-12 center">
						<div class="topic">
							3
						</div>
						<div class="topic-message margin-top__16 color__text">
							Receba o arquivo em tempo-real que seu cliente enviou na sua tela.
						Agora é só imprimir!
						</div>
					</div>
				</div>
				<!-- Row 4 end -->
			</div>
		</div>
		<!-- How work wrapper end MOBILE VERSION -->

		<div id="benefits" class="benefits-wrapper margin-top__16">
			<div class="container">
				<!-- Row 1 -->
				<div class="row" style="padding-top: 16px;">
					<p class="center text-color__white">
						<span class="line line__white"></span> A forma mais rápida e prática
					</p>
					<div class="center text-color__white">
						<h1 class="hidden-sm">Quais os benefícios em usar o Yumper?</h1>
						<h2 class="show-sm">Quais os benefícios em usar o Yumper?</h2>
					</div>
				</div>
				<!-- Row 1 end -->

				<!-- Row 2 -->
				<div class="row margin-top__32">
					<div class="col-4 center">
						<div class="row center">
							<div style="width: 30%; height: 30%;" class="center">
							<img src="../../assets/img/ill-secure.png" class="responsive-image">
						</div>
						<div class="row">
							<h3 class="margin-top__8 text-color__white">Privacidade</h3>
							<p class="text-color__white justify">
							Seu cliente não precisa abrir Drive, One Drive ou o WhatsApp expondo dados pessoais
							</p>
						</div>
					</div>
					</div>
					<div class="col-4 center">
						<div class="row center">
							<div style="width: 30%; height: 30%;" class="center">
							<img src="../../assets/img/ill-bug.png" class="responsive-image">
						</div>
						<div class="row">
							<h3 class="margin-top__8 text-color__white">Segurança</h3>
							<p class="text-color__white justify">
								Não é necessário pen drives, evitando assim, que vírus contaminem suas máquinas
							</p>
						</div>
					</div>
					</div>
					<div class="col-4 center margin-top__32">
						<div class="row center">
							<div style="width: 30%; height: 30%;" class="center">
							<img src="../../assets/img/ill-privacy.png" class="responsive-image">
						</div>
						<div class="row">
							<h3 class="margin-top__8 text-color__white">Praticidade</h3>
							<p class="text-color__white justify">
								Seu cliente apenas acessa seu link e envia o arquivo. Pronto! O documento fica disponível em tempo-real para a impressão
							</p>
						</div>
					</div>
					</div>
				</div>
				<!-- Row 2 end -->

				<div class="row center show-sm margin-top__16">
					<button @click="signIn"
						class="btn-regular btn-color__primary">
						Entrar com <i class="gg-google"></i>
					</button>
				</div>
			</div>
		</div>
		<!-- How work wrapper end -->

		<div class="footer">
			<div class="container">
				<!-- Row -->
				<div class="row center color__white">
					Criado com ❤ por 
					<a href="https://yeshstudio.com" 
						target="_blank" 
						style="text-decoration: none;">Yesh Studio</a>
				</div>
				<!-- Row end -->
			</div>
		</div>
	</div>
</template>
<script>
import firebase from 'firebase/app'
import { firestore } from '../../firebase'

export default {
	name: 'Presentation',
	data() {
		return {
			showMobileMenu: false
		}
	},
	mounted() {
		this.$nextTick(() => {
			document.title = 'Yumper | Cadastre-se grátis'
		})
	},
	methods: {
		toogleMobileMenu() {
			this.showMobileMenu = !this.showMobileMenu
		},
		/**
		 * Sign in user use Google method
		 *
		 * @param {void}
		*/
		signIn() {
			var provider = new firebase.auth.GoogleAuthProvider();

			firebase.auth()
			.signInWithPopup(provider)
			.then((result) => {
				var isNewUser = result.additionalUserInfo
					.isNewUser;

				if (isNewUser) {
					this.createAccount(result.user)
				}
				else {
					this.$router.push('/console')
				}	
			}).catch(e => {
				console.log(e)
				this.$toast.error('Não foi possível concluír o login')
			});
		},
		/**
		 * Get data when user authenticated and save profile
		 * on Firestore
		 *
		 * @param {user} user data provide by Google
		*/
		createAccount(user) {
			const account = {
				id: `@${this.sanitize(user.displayName)}`,
				name: user.displayName,
				email: user.email,
				commercial: true,
				profileImage: user.photoURL,
				emailVerified: user.emailVerified
			}

			firestore.collection('accounts')
			.doc(user.uid)
			.set(account)
			.then(() => {
				this.$router.push('/console')
			})
			.catch(e => {
				console.log(e)
				this.$toast.error('Não foi possível concluír o login')
			})
		},
		/**
		 * Set string to lower case and remove all white spaces.
		 * The timestamp variable is used to avoid conflict between
		 * similar usernames
		 *
		 * @param {str} username to set to id
		*/
		sanitize(str) {
			str = str.toLowerCase()
			str = str.replace(/ /g,'')

			var timestamp = new Date().getTime();
			return str + timestamp
		}
	}
}	
</script>