import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  senderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
};

export const app = initializeApp(firebaseConfig);

export const checkFirebaseConnection = async () => {
  try {
    await app.auth().signInAnonymously();
    console.log('Firebase connected successfully');
    return true;
  } catch (error) {
    console.error('Firebase connection error:', error);
    return false;
  }
};
