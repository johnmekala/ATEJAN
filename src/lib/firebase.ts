import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// AJETAN Web App Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3Cn4w08uL1XjYrjFTYTI4dUPDm6YVEjw",
  authDomain: "ajetan-c59c2.firebaseapp.com",
  databaseURL: "https://ajetan-c59c2-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "ajetan-c59c2",
  storageBucket: "ajetan-c59c2.firebasestorage.app",
  messagingSenderId: "45607877524",
  appId: "1:45607877524:web:26daa84bab8f2c3ddb6d81"
};

// Initialize Firebase (singleton pattern for SSR & Vite)
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
