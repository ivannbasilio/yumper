const Files = {
	methods: {
		getExtension(name) {
			return name.substring(name.lastIndexOf('.') + 1);
		}
	}
}

export default Files