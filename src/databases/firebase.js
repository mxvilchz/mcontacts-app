import * as firebase from 'firebase'
import 'firebase/firestore'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyB8a0-KAXGCJGQK-kzU-asXA68k3zOI3M0',
  authDomain: 'mcontacts-5e17f.firebaseapp.com',
  projectId: 'mcontacts-5e17f',
  storageBucket: 'mcontacts-5e17f.appspot.com',
  messagingSenderId: '891068308590',
  appId: '1:891068308590:web:c990f3016f9a592bd5da7f',
  measurementId: 'G-YMZ508ZFGC'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()

export default {
  firebase,
  db
}
