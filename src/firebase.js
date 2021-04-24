import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCfZ6i3BHBm3Xul8naKsQMq1wAG4IssvC0",
    authDomain: "disney-plus-clone-1933e.firebaseapp.com",
    projectId: "disney-plus-clone-1933e",
    storageBucket: "disney-plus-clone-1933e.appspot.com",
    messagingSenderId: "432637891681",
    appId: "1:432637891681:web:bb503f006ccd7c16b18620",
    measurementId: "G-RXSBD5E2B1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
firebase.analytics();

export { auth, provider, storage };
export default db;