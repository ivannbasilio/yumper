import firebase from 'firebase/app'

const moment = {
	methods: {
		now() {
			return firebase.firestore.FieldValue.serverTimestamp()
		}
	}
}
export default moment