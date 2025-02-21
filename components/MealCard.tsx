import React from 'react';
import { Meal } from '../types/objects';

type MealCardProps = {
	meal: Meal;
	onClick: () => void;
};

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'short',
		day: 'numeric',
	});
};

const MealCard: React.FC<MealCardProps> = ({ meal, onClick }) => {
	return (
		<div
			className='w-64 p-3 hover:bg-blue-100 border opacity-80 border-gray-300 rounded-lg shadow-md bg-white cursor-pointer hover:shadow-lg transition'
			onClick={onClick}>
			<p className='text-sm text-gray-700'>{formatDate(meal.date)}</p>{' '}
			<h3 className='text-lg font-semibold text-gray-800'>{meal.title}</h3>
			<p className='text-gray-800 text-sm'>Chefs: {meal.cookedBy.join(', ')}</p>
		</div>
	);
};

export default MealCard;
