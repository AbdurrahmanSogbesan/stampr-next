import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export let app: FirebaseApp;
const apps = getApps();
if (apps.length === 0) {
  app = initializeApp(config);
} else {
  app = apps[0];
}
//  const history = window.history;
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const storage = getStorage();

export { db, auth, provider, storage };
