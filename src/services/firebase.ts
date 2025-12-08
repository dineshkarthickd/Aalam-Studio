import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBUG_Q7XyIpXFYXXBbU2kBmEokrlDpZvco",
    authDomain: "aalam-studio.firebaseapp.com",
    projectId: "aalam-studio",
    storageBucket: "aalam-studio.firebasestorage.app",
    messagingSenderId: "620122966710",
    appId: "1:620122966710:web:c0123c1436e831932db417",
    measurementId: "G-NNVMNVHWL4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
