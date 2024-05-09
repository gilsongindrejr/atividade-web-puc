import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCVHfzxw9giA84es7vRSM83ZiHZh7DxAc0",
  authDomain: "somativa-web-d0ba3.firebaseapp.com",
  projectId: "somativa-web-d0ba3",
  storageBucket: "somativa-web-d0ba3.appspot.com",
  messagingSenderId: "686273746519",
  appId: "1:686273746519:web:31b0a94e7d2013eb013512"
};


if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

  export default firebase;