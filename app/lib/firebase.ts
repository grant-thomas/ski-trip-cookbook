import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyACNT0xthbd4eYSkZkw50KEXGtzU-P2VGs',
	authDomain: 'ski-trip-recipes.firebaseapp.com',
	projectId: 'ski-trip-recipes',
	storageBucket: 'ski-trip-recipes.appspot.com',
	messagingSenderId: '261138126328',
	appId: '1:261138126328:web:20a3c9de08747761d0f20d',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
