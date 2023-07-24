import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    signOut,
} from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    writeBatch,
} from "firebase/firestore";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBLSuKNLRgsnm0Elj4iqHGJZAz0uSAiVzM",
    authDomain: "crown-c426c.firebaseapp.com",
    projectId: "crown-c426c",
    storageBucket: "crown-c426c.appspot.com",
    messagingSenderId: "904008860778",
    appId: "1:904008860778:web:baaead38241f10408a7613",
};

initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, "collections");
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);

    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
    return categoryMap;
};

export const creteUserDocFromAuth = async (userAuth, additionalInfo = {}) => {
    const userDocRef = doc(db, "users", userAuth.uid);
    const userSnapShot = await getDoc(userDocRef);

    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo,
            });
        } catch (err) {
            console.log("error", err.message);
        }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListner = (callback) =>
    onAuthStateChanged(auth, callback);
