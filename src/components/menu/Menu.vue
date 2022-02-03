<template>
	<div class="menu">
		<ul>
			<li>
				<a href="/">
					<i class="gg-file"></i> 
					Documentos
				</a>
			</li>
			<li>
				<a href="/configuracoes">
					<i class="gg-profile"></i>
					Conta
				</a>
			</li>
			<li>
				<a href="javascript:void(0)" @click="darkThemeSwitch">
					<i class="gg-moon"></i>
					<span v-if="!isDarkModeEnabled">Tema escuro</span>
					<span v-if="isDarkModeEnabled">Tema claro</span>
				</a>
			</li>
		</ul>
		<div class="menu-divider"></div>
		<ul>
			<li>
				<a href="/">
					<i class="gg-danger"></i>
					Sobre
				</a>
			</li>
		</ul>
		<div class="version">
			v0.1.4
		</div>
	</div>
</template>
<script>
import themeChanger from '../../dark-theme.js';

export default {
	name: 'Menu',
	data() {
		return {
			themeChanger: null,
			isDarkModeEnabled: false
		}
	},
	created() {
		this.themeChanger = new themeChanger();
	},
	methods: {
		darkThemeSwitch() {
			this.isDarkModeEnabled = !this.isDarkModeEnabled
			this.themeChanger._darkThemeSwitch();
		},
	},
}
</script>