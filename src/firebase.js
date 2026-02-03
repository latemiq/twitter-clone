import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_TWITTER_API_KEY,
  authDomain: process.env.REACT_APP_TWITTER_AUTH_DOMAIN,
  databaseURL: "https://twitter-clone-5fecf-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "twitter-clone-5fecf",
  storageBucket: "twitter-clone-5fecf.firebasestorage.app",
  messagingSenderId: "863373412960",
  appId: "1:863373412960:web:23e233bf7ea025c0ed5105",
  measurementId: "G-B0XV1RES8V"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export { serverTimestamp };
export default db;
