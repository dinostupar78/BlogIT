import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {getStorage} from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyCciv64BSao69ng1cLquZ5pSIFIives7pw",
    authDomain: "blogit-8c2ac.firebaseapp.com",
    projectId: "blogit-8c2ac",
    storageBucket: "blogit-8c2ac.firebasestorage.app",
    messagingSenderId: "774739887072",
    appId: "1:774739887072:web:026a50d94af7146ec06185"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app)


export { db, auth, storage, serverTimestamp };