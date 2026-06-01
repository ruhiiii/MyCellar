import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDe_5YVgposdzPkEfP4DXsCYr7V2jrPkho',
    authDomain: 'my-cellar-cd6db.firebaseapp.com',
    projectId: 'my-cellar-cd6db',
    storageBucket: 'my-cellar-cd6db.firebasestorage.app',
    messagingSenderId: '652387905184',
    appId: '1:652387905184:web:f71d8ae585595768bc63c5',
    measurementId: 'G-1WBNZV63HJ',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
