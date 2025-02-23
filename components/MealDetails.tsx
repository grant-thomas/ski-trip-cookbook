import React, { useState, useEffect, useRef } from 'react';
import {
	Trip,
	Meal,
	DirectionSection,
	IngredientSection,
} from '../types/objects';
import { saveTripChanges } from '../app/lib/firestore';

type MealDetailsProps = {
	meal: Meal;
	trip: Trip;
	onClose: () => void;
};

// Helper: Adjust the height of a textarea based on its scrollHeight.
const adjustTextareaHeight = (textarea: HTMLTextAreaElement | null) => {
	if (textarea) {
		textarea.style.height = 'auto';
		textarea.style.height = `${textarea.scrollHeight}px`;
	}
};

// Helper: Filter ingredient sections.
// A section is kept if at least one ingredient is non-empty or the title is non-empty.
const filterIngredientSections = (sections: IngredientSection[]) =>
	sections.filter((section) => {
		const title = section.title?.trim() || '';
		const validIngredients = section.ingredients.filter(
			(ing) => ing.trim() !== ''
		);
		return !(title === '' && validIngredients.length === 0);
	});

// Helper: Process direction sections.
// - Completely empty sections (title and steps blank) are discarded.
// - If title is blank but there are valid steps, assign default title "Directions".
const filterDirectionSections = (sections: DirectionSection[]) =>
	sections.reduce<DirectionSection[]>((acc, section) => {
		const title = section.title?.trim() || '';
		const validSteps = section.steps.filter((step) => step.trim() !== '');

		if (title === '' && validSteps.length === 0) {
			return acc;
		}
		if (title === '' && validSteps.length > 0) {
			acc.push({ ...section, title: 'Directions', steps: validSteps });
		} else {
			acc.push({ ...section, title, steps: validSteps });
		}
		return acc;
	}, []);

const MealDetails: React.FC<MealDetailsProps> = ({ meal, trip, onClose }) => {
	const [editedMeal, setEditedMeal] = useState<Meal>(meal);
	const [isEditing, setIsEditing] = useState(false);

	// Refs for dynamic textarea height adjustment.
	const ingredientsRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
	const directionsRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

	// Adjust heights when entering edit mode.
	useEffect(() => {
		if (isEditing) {
			ingredientsRefs.current.forEach(adjustTextareaHeight);
			directionsRefs.current.forEach(adjustTextareaHeight);
		}
	}, [isEditing]);

	// Adjust heights on window resize.
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

	// Save changes: filter sections and update Firestore & local state.
	const handleSaveChanges = async () => {
		const filteredIngredients = filterIngredientSections(
			editedMeal.ingredientSections
		);
		const filteredDirections = filterDirectionSections(
			editedMeal.directionSections
		);

		const finalEditedMeal: Meal = {
			...editedMeal,
			ingredientSections: filteredIngredients,
			directionSections: filteredDirections,
		};

		const updatedMeals = trip.meals.map((m) =>
			m.title === meal.title ? finalEditedMeal : m
		);
		const updatedTrip: Trip = { ...trip, meals: updatedMeals };

		try {
			await saveTripChanges(trip.location, updatedTrip);
			console.log('Trip updated successfully!');
			setEditedMeal(finalEditedMeal);
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

			{/* Ingredients Section */}
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
						<>
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
							<textarea
								ref={(el) => {
									if (el) ingredientsRefs.current[index] = el;
								}}
								className='w-full border border-gray-300 rounded p-2 text-gray-900 bg-white resize-none overflow-hidden'
								value={section.ingredients.join('\n')}
								onChange={(e) => {
									const updatedSections = [...editedMeal.ingredientSections];
									updatedSections[index].ingredients =
										e.target.value.split('\n');
									setEditedMeal({
										...editedMeal,
										ingredientSections: updatedSections,
									});
									adjustTextareaHeight(e.target);
								}}
							/>
						</>
					) : (
						section.title && (
							<>
								<h3 className='font-semibold mt-4 text-gray-800'>
									{section.title}
								</h3>
								<ul className='list-disc list-inside text-gray-800'>
									{section.ingredients.map((ingredient, i) => (
										<li key={i}>{ingredient}</li>
									))}
								</ul>
							</>
						)
					)}
				</div>
			))}
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

			{/* Directions Section */}
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
								<>
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
									<textarea
										ref={(el) => {
											if (el) directionsRefs.current[index] = el;
										}}
										className='w-full border border-gray-300 rounded p-2 text-gray-900 bg-white resize-none overflow-hidden'
										value={section.steps.join('\n')}
										onChange={(e) => {
											const newSteps = e.target.value.split('\n');
											const updatedSections = [...editedMeal.directionSections];
											updatedSections[index].steps = newSteps;
											setEditedMeal({
												...editedMeal,
												directionSections: updatedSections,
											});
											adjustTextareaHeight(e.target);
										}}
									/>
								</>
							) : (
								<>
									{section.title && (
										<h3 className='font-semibold mt-4 text-gray-800'>
											{section.title}
										</h3>
									)}
									<ol className='list-decimal list-inside text-gray-800 space-y-1'>
										{section.steps.map((step, stepIndex) => (
											<li key={stepIndex}>{step}</li>
										))}
									</ol>
								</>
							)}
						</div>
					))}
				</>
			)}
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

			{/* Save Button */}
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
