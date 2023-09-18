import { app, firestore } from './app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore"; 

/**
 * Initialize Auth Handler
 */
export const auth = getAuth(app);

// Google Auth Provider
const provider = new GoogleAuthProvider();

/**
 * Sign in with redirect
 */
export const googleSignInRedirect = () => signInWithRedirect(auth, provider);

/**
 * Sign in with popup
 */
export const googleSignInPopup = () => signInWithPopup(auth, provider);

/**
 * Sign Out
 */
export const googleSignOut = () => signOut(auth);

// Current User Information Functions
export const getAuthUserId = () => auth.currentUser ? auth.currentUser.uid : "";
export const getAuthUserInfo = () => ({
	uid: auth.currentUser ? auth.currentUser.uid : "",
	email: auth.currentUser ? auth.currentUser.email : "",
	displayName: auth.currentUser ? auth.currentUser.displayName : "",
	photoURL: auth.currentUser ? auth.currentUser.photoURL : "",
});

/**
 * Stores the current authenticated user in firestore
 */
export const storeAuthUserAsync = () =>	setDoc(doc(firestore, "Users", getAuthUserId()), getAuthUserInfo());