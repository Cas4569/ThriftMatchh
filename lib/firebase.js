import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const missingFirebaseConfig = [
  ["NEXT_PUBLIC_FIREBASE_API_KEY", firebaseConfig.apiKey],
  ["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", firebaseConfig.authDomain],
  ["NEXT_PUBLIC_FIREBASE_PROJECT_ID", firebaseConfig.projectId],
  ["NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET", firebaseConfig.storageBucket],
  [
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    firebaseConfig.messagingSenderId,
  ],
  ["NEXT_PUBLIC_FIREBASE_APP_ID", firebaseConfig.appId],
]
  .filter(([, value]) => typeof value !== "string" || !value.trim())
  .map(([name]) => name);

if (missingFirebaseConfig.length > 0) {
  throw new Error(
    `Missing Firebase client configuration: ${missingFirebaseConfig.join(
      ", "
    )}. Add these variables to .env.local and your deployment environment.`
  );
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);