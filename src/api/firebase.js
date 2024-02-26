// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { v4 as uuid } from 'uuid';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export async function login() {
    return signInWithPopup(auth, provider)
        .catch(console.error);
}

export async function logout() {
    return signOut(auth)
        .catch(console.error);
}

export function onUserStateChange(callback) {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });

}

export async function addNewPost(post, today, imageUrl = '') {
    const id = uuid();
    set(ref(database, `post/${id}`), { ...post, id, today, image: imageUrl })
}

export async function getPost() {
    return get(ref(database, 'post')).then(snapshot => {
        if (snapshot.exists()) {
            return Object.values(snapshot.val());
        }
        return [];
    })
}