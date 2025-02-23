import React, { useState, useEffect, useRef } from 'react';
import { Trip, Meal } from '../types/objects';
import { saveTripChanges } from '../app/lib/firestore';

type MealDetailsProps = {
	meal: Meal;
	trip: Trip;
	onClose: () => void;
};

const MealDetails: React.FC<MealDetailsProps> = ({ meal, trip, onClose }) => {
	const [editedMeal, setEditedMeal] = useState<Meal>(meal);
	const [isEditing, setIsEditing] = useState(false);

	// Refs to track textareas for dynamic height adjustment
	const ingredientsRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
	const directionsRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

	// Function to adjust textarea height dynamically
	const adjustTextareaHeight = (textarea: HTMLTextAreaElement | null) => {
		if (textarea) {
			textarea.style.height = 'auto'; // Reset height
			textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height based on content
		}
	};

	// Adjust heights when entering edit mode or resizing window
	useEffect(() => {
		if (isEditing) {
			ingredientsRefs.current.forEach(adjustTextareaHeight);
			directionsRefs.current.forEach(adjustTextareaHeight);
		}
	}, [isEditing]);

	// Recalculate heights when window resizes (accounts for text wrapping)
	useEffect(() => {
		const handleResize = () => {
			if (isEditing) {
				ingredientsRefs.current.forEach(adjustTextareaHeight);
				directionsRefs.current.forEach(adjustTextareaHeight);
			}
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [isEditing]);

	// Function to save changes to Firestore
	const handleSaveChanges = async () => {
		// 🔹 Find the index of the meal inside the trip
		const updatedMeals = trip.meals.map((m) =>
			m.title === meal.title ? editedMeal : m
		);

		// 🔹 Create updated trip with new meals
		const updatedTrip: Trip = { ...trip, meals: updatedMeals };

		try {
			await saveTripChanges(trip.location, updatedTrip);
			console.log('Trip updated successfully!');
		} catch (error) {
			console.error('Error saving trip:', error);
		}

		setIsEditing(false);
	};

	return (
		<div className='p-6 mt-2 max-w-3xl mx-auto bg-white rounded-lg shadow-lg opacity-80'>
			{/* Top Section: Title & Buttons */}
			<div className='flex justify-between items-start'>
				<div>
					<h2 className='text-2xl font-bold text-gray-800'>{meal.title}</h2>
					<p className='text-gray-800 mb-2'>
						Cooked by: {meal.cookedBy.join(', ')}
					</p>
				</div>
				<div className='flex flex-col items-end gap-1'>
					<button
						className='px-4 py-2 bg-gray-600 text-white rounded leading-none whitespace-nowrap'
						onClick={onClose}>
						← Back
					</button>
					<button
						className='px-4 py-2 mb-2 bg-gray-600 text-white rounded leading-none whitespace-nowrap'
						onClick={() => setIsEditing(!isEditing)}>
						{isEditing ? 'Cancel' : 'Edit'}
					</button>
				</div>
			</div>

			{/* Ingredients Section (Show Header ONLY if More Than 1 Section) */}
			{editedMeal.ingredientSections.length > 1 && (
				<h2 className='text-xl font-semibold text-gray-800 mt-6'>
					Ingredients
				</h2>
			)}
			{editedMeal.ingredientSections.map((section, index) => (
				<div key={index} className='mb-4 rounded relative'>
					{isEditing && (
						<button
							className='absolute top-2 right-2 px-2 py-1 text-xs bg-gray-600 text-white rounded'
							onClick={() => {
								const updatedSections = editedMeal.ingredientSections.filter(
									(_, i) => i !== index
								);
								setEditedMeal({
									...editedMeal,
									ingredientSections: updatedSections,
								});
							}}>
							X
						</button>
					)}
					{isEditing ? (
						<input
							type='text'
							className='w-full border border-gray-300 rounded p-2 text-gray-900'
							placeholder='Ingredient Section Title (Optional)'
							value={section.title || ''}
							onChange={(e) => {
								const updatedSections = [...editedMeal.ingredientSections];
								updatedSections[index].title = e.target.value;
								setEditedMeal({
									...editedMeal,
									ingredientSections: updatedSections,
								});
							}}
						/>
					) : (
						section.title && (
							<h3 className='font-semibold mt-4 text-gray-800'>
								{section.title}
							</h3>
						)
					)}

					{isEditing ? (
						<textarea
							ref={(el) => {
								if (el) ingredientsRefs.current[index] = el;
							}}
							className='w-full border border-gray-300 rounded p-2 text-gray-900 bg-white resize-none overflow-hidden'
							value={section.ingredients.join('\n')}
							onChange={(e) => {
								const updatedSections = [...editedMeal.ingredientSections];
								updatedSections[index].ingredients = e.target.value.split('\n');
								setEditedMeal({
									...editedMeal,
									ingredientSections: updatedSections,
								});
								adjustTextareaHeight(e.target);
							}}
						/>
					) : (
						<ul className='list-disc list-inside text-gray-800'>
							{section.ingredients.map((ingredient, i) => (
								<li key={i}>{ingredient}</li>
							))}
						</ul>
					)}
				</div>
			))}

			{/* Add Ingredient Section Button (Restored) */}
			{isEditing && (
				<button
					className='px-4 py-2 mb-3 mr-3 bg-gray-600 text-white rounded'
					onClick={() =>
						setEditedMeal({
							...editedMeal,
							ingredientSections: [
								...editedMeal.ingredientSections,
								{ title: '', ingredients: [] },
							],
						})
					}>
					+ Add Ingredients Section
				</button>
			)}

			{/* Directions Section (Only Show If Directions Exist and More Than 1 Section) */}
			{editedMeal.directionSections.length > 0 && (
				<>
					{editedMeal.directionSections.length > 1 && (
						<h2 className='text-xl font-semibold text-gray-800 mb-2 mt-6'>
							Directions
						</h2>
					)}
					{editedMeal.directionSections.map((section, index) => (
						<div key={index} className='mb-4 rounded relative'>
							{isEditing && (
								<button
									className='absolute top-2 right-2 px-2 py-1 text-xs bg-gray-600 text-white rounded'
									onClick={() => {
										const updatedSections = editedMeal.directionSections.filter(
											(_, i) => i !== index
										);
										setEditedMeal({
											...editedMeal,
											directionSections: updatedSections,
										});
									}}>
									X
								</button>
							)}
							{isEditing ? (
								<input
									type='text'
									className='w-full border border-gray-300 rounded p-2 text-gray-900'
									placeholder='Description Section Title (Optional)'
									value={section.title || ''}
									onChange={(e) => {
										const updatedSections = [...editedMeal.directionSections];
										updatedSections[index].title = e.target.value;
										setEditedMeal({
											...editedMeal,
											directionSections: updatedSections,
										});
									}}
								/>
							) : (
								section.title && (
									<h3 className='font-semibold mt-4 text-gray-800'>
										{section.title}
									</h3>
								)
							)}

							{isEditing ? (
								<textarea
									ref={(el) => {
										if (el) directionsRefs.current[index] = el;
									}}
									className='w-full border border-gray-300 rounded p-2 text-gray-900 bg-white resize-none overflow-hidden'
									value={section.steps.join('\n')}
									onChange={(e) => {
										const updatedSections = [...editedMeal.directionSections];
										updatedSections[index].steps = e.target.value.split('\n');
										setEditedMeal({
											...editedMeal,
											directionSections: updatedSections,
										});
										adjustTextareaHeight(e.target);
									}}
								/>
							) : (
								<ol className='list-decimal list-inside text-gray-800 space-y-1'>
									{section.steps.map((step, stepIndex) => (
										<li key={stepIndex}>{step}</li>
									))}
								</ol>
							)}
						</div>
					))}
				</>
			)}

			{/* Add Direction Section Button (Restored) */}
			{isEditing && (
				<button
					className='px-4 py-2 mt-3 mb-3 mr-3 bg-gray-600 text-white rounded'
					onClick={() =>
						setEditedMeal({
							...editedMeal,
							directionSections: [
								...editedMeal.directionSections,
								{ title: '', steps: [] },
							],
						})
					}>
					+ Add Directions Section
				</button>
			)}

			{/* Save Button (Restored) */}
			{isEditing && (
				<div className='flex justify-end mt-4'>
					<button
						className='px-4 py-2 bg-blue-900 text-white rounded'
						onClick={handleSaveChanges}>
						Save Changes
					</button>
				</div>
			)}
		</div>
	);
};

export default MealDetails;
