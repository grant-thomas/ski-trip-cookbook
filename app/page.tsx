import Navbar from '../components/Navbar';
import TripSection from '../components/TripSection';
import { db } from '../app/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import { Trip } from '../types/objects';

export default async function Home() {
	const fetchTrips = async (): Promise<Trip[]> => {
		const querySnapshot = await getDocs(collection(db, 'trips'));
		return querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...(doc.data() as Trip),
		}));
	};

	const trips = await fetchTrips();

	return (
		<div className='relative min-h-screen'>
			{/* 🔹 Background Image */}
			<div className='absolute inset-0 -z-10 opacity-20'>
				<Image
					src='/1024-Bachelor-Ridge-Living-Room.jpg'
					alt='1024 Bachelor Ridge Rd Living Room'
					layout='fill'
					objectFit='cover'
					quality={100}
				/>
			</div>

			{/* 🔹 Main Content */}
			<div className='p-4 max-w-6xl mx-auto'>
				<Navbar />
				{trips.length > 0 ? (
					trips.map((trip) => <TripSection key={trip.id} trip={trip} />)
				) : (
					<p className='text-center text-gray-600'>No trips available.</p>
				)}
			</div>
		</div>
	);
}
