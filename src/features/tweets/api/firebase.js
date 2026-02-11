import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_TWITTER_API_KEY,
  authDomain: process.env.REACT_APP_TWITTER_AUTH_DOMAIN,
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export { serverTimestamp };
export default db;
