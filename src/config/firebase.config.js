import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBW6iXc9J3yHuEN7X-V_c8hE5fjpuee7kA",
  authDomain: "squadly-ee4b6.firebaseapp.com",
  projectId: "squadly-ee4b6",
  storageBucket: "squadly-ee4b6.firebasestorage.app",
  messagingSenderId: "380963641693",
  appId: "1:380963641693:web:7d41c1aade91cb5752f0b4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);