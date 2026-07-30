import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAHKUbc7Lcx6MQgYbmdtYGznawUK-Mq6uc",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "virusconsulents.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "virusconsulents",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "virusconsulents.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "789209609788",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:789209609788:web:088e84c6e3cabaa4687539",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-BGNPEJWPVX"
};

// Initialize Firebase App (avoid duplicate initializations in SSR/Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
