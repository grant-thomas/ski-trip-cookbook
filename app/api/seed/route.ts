import { db } from '../../lib/firebase'; // Use absolute path
import { collection, setDoc, doc } from 'firebase/firestore';
import { trips } from '@/data/trips'; // Ensure correct import path

export async function GET() {
	try {
		for (const trip of trips) {
			const tripRef = doc(collection(db, 'trips'), trip.location);
			await setDoc(tripRef, trip);
		}
		return Response.json({ message: 'Trips added successfully!' });
	} catch (error) {
		console.error('Firestore Connection Error:', error);
		return Response.json({ error: 'Failed to add trips' }, { status: 500 });
	}
}
