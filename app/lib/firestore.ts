import { NextResponse } from 'next/server';
import { db } from '../lib/firebase';
import { collection, setDoc, doc, updateDoc } from 'firebase/firestore';
import { trips } from '../data/trips';
import { Trip } from 'types/objects';

export async function GET() {
	try {
		for (const trip of trips) {
			const tripRef = doc(collection(db, 'trips'), trip.location);
			await setDoc(tripRef, trip);
		}

		return NextResponse.json({ message: 'Trips added successfully!' });
	} catch (error) {
		console.error('Failed to add trips:', error);
		return NextResponse.json({ error: 'Failed to add trips' }, { status: 500 });
	}
}

/**
 * Updates an existing trip in Firestore.
 * @param tripId - The ID of the trip to update.
 * @param updatedTrip - The updated trip object.
 */
export const saveTripChanges = async (tripId: string, updatedTrip: Trip) => {
	try {
		const tripRef = doc(db, 'trips', tripId); // Reference the trip in Firestore
		await updateDoc(tripRef, updatedTrip); // Overwrite the trip with updated data
		console.log('Trip updated successfully!');
	} catch (error) {
		console.error('Error updating trip:', error);
	}
};
