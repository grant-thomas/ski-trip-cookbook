export type Trip = {
	id?: string;
	location: string;
	year: number;
	address: string;
	startDate: string;
	endDate: string;
	meals: Meal[];
};

export type Meal = {
	title: string;
	date: string;
	cookedBy: string[];
	ingredientSections: IngredientSection[];
	directionSections: DirectionSection[];
	imageUrl?: string;
};

export type IngredientSection = {
	title?: string;
	ingredients: string[];
};

export type DirectionSection = {
	title?: string;
	steps: string[];
};
