import { Trip } from '../../types/objects';

export const trips: Trip[] = [
	{
		location: 'Beaver Creek, CO',
		year: 2025,
		address: '1024 Bachelor Ridge Rd.',
		startDate: 'Jan 31',
		endDate: 'Feb 5',
		meals: [
			{
				title: 'Chicken Tortilla Soup',
				date: 'Sunday, 2/1/25',
				cookedBy: ['Taylor', 'Benton', 'Leo'],
				ingredientSections: [
					{
						title: 'Ingredients',
						ingredients: [
							'Chicken broth',
							'Corn tortillas',
							'Spices',
							'Avocado',
						],
					},
				],
				directionSections: [],
			},
			{
				title: 'Sunday Sauce & Meatballs',
				date: 'Monday, 2/2/25',
				cookedBy: ['Marissa', 'Claudette', 'Bean'],
				ingredientSections: [
					{
						title: 'Sauce Ingredients',
						ingredients: [
							'2- 29 oz cans tomato puree',
							'2- small cans tomato paste',
							'Italian parsley',
							'Red pepper flakes',
							'1 medium yellow onion',
							'Salt/pepper',
						],
					},
					{
						title: 'Meatball Ingredients',
						ingredients: [
							'Italian style breadcrumbs',
							'¼ cup grated parmesan cheese',
							'¼ cup grated pecorino Romano cheese',
							'1 lb ground beef',
							'1-2 eggs',
							'Salt/pepper',
						],
					},
				],
				directionSections: [
					{
						title: 'Making the Sauce',
						steps: [
							'Add all puree and paste to saucepan.',
							'Rinse all cans with a little water and dump into sauce (max ¼ full each).',
							'Chop parsley and lightly dust over the top of the sauce.',
							'Add ¼ tsp salt and ¼ tsp pepper.',
							'Cook on medium until hot then drop to low for remainder.',
							'Thinly slice onion and sauté until clear, then add to the sauce.',
							'Optional: Sauté pork chops until exterior is lightly browned and then put in sauce to finish cooking.',
						],
					},
					{
						title: 'Preparing the Meatballs',
						steps: [
							'Combine all meatball ingredients and mix by hand.',
							'Form into meatballs approximately 1-1.5 inches thick.',
							'Bake at 350 degrees for 30 minutes.',
							'Place meatballs in the sauce and cook for 2-8 hours, the longer the better!',
						],
					},
				],
			},
			{
				title: 'Red Beans and Rice',
				date: 'Tuesday, 2/3/25',
				cookedBy: ['Adrienne', 'Maddy', 'Jess'],
				ingredientSections: [
					{
						title: 'Main Ingredients',
						ingredients: [
							'2 lbs dry kidney beans',
							'1/2 cup olive oil',
							'2 large onions, chopped',
							'2 green bell peppers, chopped',
							'4 stalks celery, chopped',
							'¼ cup minced garlic',
							'4 bay leaves',
							'2 tbsp dried parsley',
							'2 tsp dried thyme',
							'2 tsp Cajun seasoning',
							'1 tsp cayenne pepper',
							'1/2 tsp dried sage',
							'3 lbs smoked turkey sausage and andouille',
							'4 cups long-grain rice',
							'2 quarts chicken stock',
						],
					},
				],
				directionSections: [],
			},
			{
				title: 'Shrimp Pasta',
				date: 'Wednesday, 2/4/25',
				cookedBy: ['Haley', 'Grant', 'Clark'],
				ingredientSections: [
					{
						title: 'Pasta & Shrimp Ingredients',
						ingredients: [
							'Rigatoni pasta: 4 lbs',
							'Shrimp: 6 lbs extra large, peeled, deveined',
							'Butter: 2 sticks',
							'Heavy cream: 3 cups',
							'Parmesan cheese: 5 1/2 cups grated',
							'Fresh Garlic: 1 large head',
							'Olive oil: 1 1/2 cups',
							'White wine: 3 cups',
							'Crushed red pepper flakes: 1 tablespoon',
							'Lemons: 8',
							'Fresh basil: 3 large bunches',
							'Fresh parsley: 2 bunches',
							'Salt',
							'Black pepper',
						],
					},
					{
						title: 'Garlic Bread Ingredients',
						ingredients: [
							'French bread: 2 large loaves',
							'Butter: 1 stick unsalted',
							'Fresh Garlic: 1 large head',
						],
					},
				],
				directionSections: [
					{
						title: 'Cooking the Pasta',
						steps: [
							'Bring a large pot (or multiple pots) of salted water to a boil.',
							'Cook the rigatoni until al dente, following package instructions.',
							'Reserve 4 cups of pasta water, then drain and set aside.',
						],
					},
					{
						title: 'Sauté the Shrimp',
						steps: [
							'Heat 3/4 cup olive oil in a large skillet or Dutch oven over medium-high heat.',
							'Add shrimp in batches, season with salt and pepper, and cook until pink and opaque (about 2 minutes per side).',
							'Remove and set aside.',
						],
					},
					{
						title: 'Making the Sauce',
						steps: [
							'Melt the butter in the same skillet and add the remaining olive oil.',
							'Add minced garlic and sauté until fragrant (about 1 minute).',
							'Stir in lemon zest, lemon juice, and white wine (or chicken broth). Simmer for 3-4 minutes to reduce slightly.',
						],
					},
					{
						title: 'Final Assembly',
						steps: [
							'Reduce heat to low, stir in heavy cream, and heat through (do not boil).',
							'Gradually whisk in Parmesan cheese until smooth.',
							'If the sauce is too thick, add reserved pasta water, 1/4 cup at a time, until desired consistency is reached.',
							'Add the cooked shrimp and rigatoni to the sauce. Toss gently to coat.',
							'Stir in chopped basil and crushed red pepper flakes.',
						],
					},
				],
			},
		],
	},
];
