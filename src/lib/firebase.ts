// src/lib/firebase.ts

import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyBCHe9_cbdZaF0yvKE2h6bIou_xJnTeidc",

  authDomain: "comicore-3c739.firebaseapp.com",

  projectId: "comicore-3c739",

  // IMPORTANT FIX
  storageBucket:
    "comicore-3c739.firebasestorage.app",

  messagingSenderId:
    "215971031683",

  appId: "1:215971031683:web:69ba71c2d6fac81d5e09b6",

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);