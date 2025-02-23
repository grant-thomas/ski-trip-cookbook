'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../app/lib/firebase';
import TripSection from './TripSection';
import { Trip } from '../types/objects';

export default function TripsList() {
	const [trips, setTrips] = useState<Trip[]>([]);

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, 'trips'), (snapshot) => {
			setTrips(
				snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Trip))
			);
		});
		return () => unsubscribe();
	}, []);

	return (
		<div className='p-4 max-w-6xl mx-auto'>
			{trips.length > 0 ? (
				trips.map((trip) => <TripSection key={trip.id} trip={trip} />)
			) : (
				<p className='text-center text-gray-300'>Loading trips...</p>
			)}
		</div>
	);
}
