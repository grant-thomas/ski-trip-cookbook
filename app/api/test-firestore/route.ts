import { NextResponse } from 'next/server';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
	try {
		const querySnapshot = await getDocs(collection(db, 'trips'));
		const trips = querySnapshot.docs.map((doc) => doc.data());
		return NextResponse.json({ trips });
	} catch (error) {
		console.error('Firestore Connection Error:', error);
		return NextResponse.json(
			{ error: 'Firestore connection failed' },
			{ status: 500 }
		);
	}
}
