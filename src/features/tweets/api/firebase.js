import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const apiKey = process.env.NEXT_PUBLIC_TWITTER_API_KEY || "";
const authDomain = process.env.NEXT_PUBLIC_TWITTER_AUTH_DOMAIN || "";
const fallbackProjectId = authDomain.endsWith(".firebaseapp.com")
  ? authDomain.replace(".firebaseapp.com", "")
  : "";
const projectId = process.env.NEXT_PUBLIC_TWITTER_PROJECT_ID || fallbackProjectId;
const storageBucket =
  process.env.NEXT_PUBLIC_TWITTER_STORAGE_BUCKET ||
  (projectId ? `${projectId}.appspot.com` : "");
const messagingSenderId = process.env.NEXT_PUBLIC_TWITTER_MESSAGING_SENDER_ID || "";
const appId = process.env.NEXT_PUBLIC_TWITTER_APP_ID || "";
const measurementId = process.env.NEXT_PUBLIC_TWITTER_MEASUREMENT_ID || "";

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket: storageBucket || undefined,
  messagingSenderId: messagingSenderId || undefined,
  appId: appId || undefined,
  measurementId: measurementId || undefined,
};

const hasRequiredFirebaseConfig = Boolean(
  firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId
);

if (!hasRequiredFirebaseConfig && typeof window !== "undefined") {
  console.warn(
    "Firebase config is incomplete. Set NEXT_PUBLIC_TWITTER_API_KEY, NEXT_PUBLIC_TWITTER_AUTH_DOMAIN and NEXT_PUBLIC_TWITTER_PROJECT_ID in .env.local."
  );
}

const firebaseApp = hasRequiredFirebaseConfig
  ? (firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig))
  : null;

const db = firebaseApp ? firebaseApp.firestore() : null;
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export { serverTimestamp, hasRequiredFirebaseConfig };
export default db;
