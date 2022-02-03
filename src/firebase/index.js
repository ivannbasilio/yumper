import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/analytics'

// Data omitted for security reasons
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

export const app = firebase.initializeApp(firebaseConfig);
export const firestore = app.firestore();
export const storage   = app.storage();
export const auth      = app.auth();
firebase.analytics();
