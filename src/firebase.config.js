import { getMessaging } from '@firebase/messaging';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCohspPgGtY6YYrnw-lOyNdmgCJejvNzoI',
  authDomain: 'food-order-4d70e.firebaseapp.com',
  projectId: 'food-order-4d70e',
  storageBucket: 'food-order-4d70e.appspot.com',
  messagingSenderId: '347718196210',
  appId: '1:347718196210:web:06c4553f60a39bde90a96b',
  measurementId: 'G-CFT8D54KK3',
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);
const messaging = getMessaging(app);

export { app, firestore, storage, messaging };
