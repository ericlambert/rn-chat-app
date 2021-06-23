import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCbT_3yAVlx6tu1MNLGC_3A2FSD9MGO4W4",
    authDomain: "chat-app-6c041.firebaseapp.com",
    projectId: "chat-app-6c041",
    storageBucket: "chat-app-6c041.appspot.com",
    messagingSenderId: "713542312507",
    appId: "1:713542312507:web:1f033faab811c2fc71f21e"
  };

let app;

if (firebase.apps?.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.auth();
}

export { db, auth }
