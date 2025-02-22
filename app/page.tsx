// /pages/index.tsx or /app/page.tsx
import Navbar from '../components/Navbar';
import TripsList from '../components/TripsList';

export default function Home() {
	return (
		<div className='relative min-h-screen'>
			{/* Background Image */}
			<div className='absolute inset-0 -z-10 opacity-20'>
				<img
					src='/1024-Bachelor-Ridge-Living-Room.jpg'
					alt='1024 Bachelor Ridge Rd Living Room'
					className='w-full h-full object-cover'
				/>
			</div>

			<Navbar />
			<TripsList />
		</div>
	);
}
