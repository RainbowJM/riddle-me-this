import { app } from './app';
import { getAuth, GoogleAuthProvider, signInWithRedirect, signOut } from 'firebase/auth';

// Initialize Auth Handler
export const auth = getAuth(app);

// Google Auth Provider
const provider = new GoogleAuthProvider();

// Sign in with redirect
export const googleSignInRedirect = () => signInWithRedirect(auth, provider);

// Sign Out
export const googleSignOut = () => signOut(auth);

// Current User Information Functions
export const getCurrentUserId = () => auth.currentUser && auth.currentUser.uid;
export const getCurrentUserInfo = () => ({
	uid: auth.currentUser && auth.currentUser.uid,
	email: auth.currentUser && auth.currentUser.email,
	displayName: auth.currentUser && auth.currentUser.displayName,
	photoURL: auth.currentUser && auth.currentUser.photoURL,
});
