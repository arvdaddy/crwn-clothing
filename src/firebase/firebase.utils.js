import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
    apiKey: "AIzaSyDwijA5_4yImGdW7CcmGfOXExoZKPr3tTA",
    authDomain: "crwn-db-f83bb.firebaseapp.com",
    projectId: "crwn-db-f83bb",
    storageBucket: "crwn-db-f83bb.appspot.com",
    messagingSenderId: "542505000958",
    appId: "1:542505000958:web:7561949edf883c5c1f2aaf",
    measurementId: "G-GVQP0SX6JZ"
  }

export const createUserProfileDocument = async(userAuth, additionalData) =>{
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({displayName,email,createdAt,...additionalData})
        }
        catch(error){
            console.log('error creating users', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth=firebase.auth();
export const firestore=firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;