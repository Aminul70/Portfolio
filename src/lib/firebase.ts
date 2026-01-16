import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCmU_FnJNFxRmA8rZD12o0sdb_fGLhr_w0",
    authDomain: "aminul-ethos.firebaseapp.com",
    projectId: "aminul-ethos",
    storageBucket: "aminul-ethos.firebasestorage.app",
    messagingSenderId: "228492979704",
    appId: "1:228492979704:web:93bb6e70c1b1d1124efa0d",
    measurementId: "G-ZWX09FHP3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);

// Authorized emails
const AUTHORIZED_EMAILS = [
    'mdaminulislam.x70@gmail.com',
    'aminulislam004474@gmail.com',
    'aminul.ethos@gmail.com'
];

// Funny access denied messages
const DENIAL_MESSAGES = [
    "Whoa there, stranger! 🚫 This VIP lounge is invite-only!",
    "Nice try! But your email isn't on the guest list 🎭",
    "Access Denied! Did you really think that would work? 😏",
    "Nope! This admin panel has standards 💅",
    "Sorry, but you're not cool enough for this club 😎",
    "Error 403: Unauthorized Swagger Detected 🕶️"
];

// Check if email is authorized
export const isAuthorizedEmail = (email: string | null): boolean => {
    if (!email) return false;
    return AUTHORIZED_EMAILS.includes(email.toLowerCase());
};

// Get random denial message
export const getRandomDenialMessage = (): string => {
    return DENIAL_MESSAGES[Math.floor(Math.random() * DENIAL_MESSAGES.length)];
};

// Sign in with Google
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error) {
        console.error('Error signing in with Google:', error);
        throw error;
    }
};

// Sign out
export const signOutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
};
