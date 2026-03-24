import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCv8AhI2seNEWwsdqd8ALayKOk0IjS-ctE",
  authDomain: "tracking-4ad37.firebaseapp.com",
  projectId: "tracking-4ad37",
  storageBucket: "tracking-4ad37.firebasestorage.app",
  messagingSenderId: "426415594630",
  appId: "1:426415594630:web:b81a3bc8d49eb9e65a4507",
  measurementId: "G-65YSNW426T"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize analytics safely if we are in browser
let analytics = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
export { app, analytics };
