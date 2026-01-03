import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYqv4LZb-B6SOzP8hqj_0cMczT_TgDZE0",
  authDomain: "rmsseafood.firebaseapp.com",
  projectId: "rmsseafood",
  storageBucket: "rmsseafood.firebasestorage.app",
  messagingSenderId: "1011450707744",
  appId: "1:1011450707744:web:a956025f0e7a36d5e42145"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);