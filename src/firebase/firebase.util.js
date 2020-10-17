import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBWtumPgR_cxjrxblMsk553-gqvlCMohOc",
    authDomain: "kabesashopdb.firebaseapp.com",
    databaseURL: "https://kabesashopdb.firebaseio.com",
    projectId: "kabesashopdb",
    storageBucket: "kabesashopdb.appspot.com",
    messagingSenderId: "547152760653",
    appId: "1:547152760653:web:6000e27af1b88deb21b104"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt : 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;