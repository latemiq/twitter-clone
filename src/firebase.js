import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDhIAMZmNEP0KIG5yA_39ZLOpXaWuRA9UI",
    authDomain: "twitter-clone-3e4a9.firebaseapp.com",
    projectId: "twitter-clone-3e4a9",
    storageBucket: "twitter-clone-3e4a9.appspot.com",
    messagingSenderId: "853008712636",
    appId: "1:853008712636:web:5f16ea745c7540013b61b9",
    measurementId: "G-BPD1CSHPCL"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore();

  export default db;