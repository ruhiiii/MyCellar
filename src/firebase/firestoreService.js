import { collection, addDoc, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from './firebaseConfig';

const winesCollection = collection(db, 'wines');

export function subscribeWines(onUpdate, onError) {
    const q = query(winesCollection, orderBy('dateAdded', 'desc'));
    return onSnapshot(q, snapshot => {
        const wines = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('firestoreService.subscribeWines snapshot', wines.length, 'docs', snapshot.metadata);
        onUpdate(wines);
    }, error => {
        console.error('firestoreService.subscribeWines error', error);
        onError(error);
    });
}

export async function addWine(wine) {
    const payload = {
        ...wine,
        year: wine.year || null,
        tags: wine.tags || [],
        notes: wine.notes || '',
        dateAdded: Timestamp.fromDate(new Date()),
    };
    try {
        console.log('firestoreService.addWine payload', payload);
        console.log('firestoreService.addWine calling addDoc...');
        const docRef = await addDoc(winesCollection, payload);
        console.log('firestoreService.addWine addDoc resolved, id=', docRef.id);
        return docRef;
    } catch (err) {
        console.error('firestoreService.addWine error', err);
        throw err;
    }
}
