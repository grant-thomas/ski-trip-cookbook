'use client';
import React, { useState } from 'react';
import MealCard from '../components/MealCard';
import { Trip, Meal } from '../types/objects';
import MealDetails from './MealDetails';

type TripSectionProps = {
	trip: Trip;
};

const TripSection: React.FC<TripSectionProps> = ({ trip }) => {
	const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

	return (
		<div className='mb-8 text-white'>
			{selectedMeal ? (
				<MealDetails
					meal={selectedMeal}
					onClose={() => setSelectedMeal(null)}
					trip={trip}
				/>
			) : (
				<>
					<h2 className='text-2xl font-semibold mt-4'>
						{trip.location} - {trip.year}
					</h2>
					<p>{trip.address}</p>
					<p className='text-sm mb-4'>
						{trip.startDate} - {trip.endDate}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						{trip.meals.map((meal, index) => (
							<MealCard
								key={index}
								meal={meal}
								onClick={() => setSelectedMeal(meal)}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default TripSection;
