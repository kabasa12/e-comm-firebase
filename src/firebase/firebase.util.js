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

  export const createUserProfileDocument = async (userAuth,additionalData) => {
      if(!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`);
      const snapshot = await userRef.get();

      if(!snapshot.exists){
          const {displayName,email} = userAuth;
          const createAt = new Date();
          try {
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            });
          }catch(err) {
              console.log("error creating user ", err.message);
          }
        }
        return userRef
    }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt : 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;