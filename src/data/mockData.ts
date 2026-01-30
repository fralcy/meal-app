import type { DayPlan, Recipe, GroceryItem, WeatherData } from '@/types';

// Helper để tạo ngày trong tuần hiện tại
const getWeekDates = () => {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);
  
  return Array.from({ length: 5 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date;
  });
};

const weekDates = getWeekDates();

// Mock Meal Plan với sẵn một số meals
export const mockMealPlan: DayPlan[] = [
  {
    id: 'day-1',
    date: weekDates[0].toISOString(),
    dayName: 'Monday',
    meals: [
      { id: 'meal-1', name: 'Overnight Oats', recipeId: 'recipe-2', servings: 1, mealType: 'breakfast' },
      { id: 'meal-2', name: 'Grilled Chicken Salad', recipeId: 'recipe-1', servings: 2, mealType: 'lunch' },
    ],
  },
  {
    id: 'day-2',
    date: weekDates[1].toISOString(),
    dayName: 'Tuesday',
    meals: [
      { id: 'meal-3', name: 'Pasta Primavera', recipeId: 'recipe-3', servings: 2, mealType: 'dinner' },
    ],
  },
  {
    id: 'day-3',
    date: weekDates[2].toISOString(),
    dayName: 'Wednesday',
    meals: [
      { id: 'meal-4', name: 'Overnight Oats', recipeId: 'recipe-2', servings: 1, mealType: 'breakfast' },
      { id: 'meal-5', name: 'Pasta Primavera', recipeId: 'recipe-3', servings: 4, mealType: 'dinner' },
    ],
  },
  {
    id: 'day-4',
    date: weekDates[3].toISOString(),
    dayName: 'Thursday',
    meals: [
      { id: 'meal-6', name: 'Grilled Chicken Salad', recipeId: 'recipe-1', servings: 2, mealType: 'lunch' },
    ],
  },
  {
    id: 'day-5',
    date: weekDates[4].toISOString(),
    dayName: 'Friday',
    meals: [],
  },
];

// Mock Recipes
export const mockRecipes: Recipe[] = [
  {
    id: 'recipe-1',
    name: 'Grilled Chicken Salad',
    description: 'Fresh and healthy salad with grilled chicken breast',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    difficulty: 'easy',
    category: 'lunch',
    ingredients: [
      { id: 'ing-1', name: 'Chicken breast', quantity: 200, unit: 'g' },
      { id: 'ing-2', name: 'Mixed greens', quantity: 100, unit: 'g' },
      { id: 'ing-3', name: 'Cherry tomatoes', quantity: 10, unit: 'pcs' },
      { id: 'ing-4', name: 'Olive oil', quantity: 2, unit: 'tbsp' },
    ],
    instructions: [
      'Season chicken with salt and pepper',
      'Grill chicken for 6-7 minutes each side',
      'Let chicken rest, then slice',
      'Arrange greens and tomatoes on plate',
      'Top with sliced chicken and drizzle with olive oil',
    ],
    isFavorite: true,
  },
  {
    id: 'recipe-2',
    name: 'Overnight Oats',
    description: 'Easy make-ahead breakfast with oats and fruits',
    imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400',
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    difficulty: 'easy',
    category: 'breakfast',
    ingredients: [
      { id: 'ing-5', name: 'Rolled oats', quantity: 50, unit: 'g' },
      { id: 'ing-6', name: 'Milk', quantity: 150, unit: 'ml' },
      { id: 'ing-7', name: 'Honey', quantity: 1, unit: 'tbsp' },
      { id: 'ing-8', name: 'Berries', quantity: 50, unit: 'g' },
    ],
    instructions: [
      'Mix oats and milk in a jar',
      'Add honey and stir',
      'Refrigerate overnight',
      'Top with fresh berries before serving',
    ],
    isFavorite: false,
  },
  {
    id: 'recipe-3',
    name: 'Pasta Primavera',
    description: 'Colorful pasta with fresh vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    difficulty: 'medium',
    category: 'dinner',
    ingredients: [
      { id: 'ing-9', name: 'Pasta', quantity: 400, unit: 'g' },
      { id: 'ing-10', name: 'Zucchini', quantity: 1, unit: 'pcs' },
      { id: 'ing-11', name: 'Bell pepper', quantity: 1, unit: 'pcs' },
      { id: 'ing-12', name: 'Garlic', quantity: 3, unit: 'cloves' },
      { id: 'ing-13', name: 'Parmesan', quantity: 50, unit: 'g' },
    ],
    instructions: [
      'Cook pasta according to package',
      'Sauté garlic in olive oil',
      'Add chopped vegetables and cook 5 mins',
      'Toss pasta with vegetables',
      'Top with grated parmesan',
    ],
    isFavorite: true,
  },
];

// Mock Groceries
export const mockGroceries: GroceryItem[] = [
  { id: 'gro-1', name: 'Chicken breast', quantity: 500, unit: 'g', category: 'Meat', checked: false },
  { id: 'gro-2', name: 'Mixed greens', quantity: 200, unit: 'g', category: 'Produce', checked: false },
  { id: 'gro-3', name: 'Milk', quantity: 1, unit: 'L', category: 'Dairy', checked: true },
  { id: 'gro-4', name: 'Eggs', quantity: 12, unit: 'pcs', category: 'Dairy', checked: false },
  { id: 'gro-5', name: 'Bread', quantity: 1, unit: 'loaf', category: 'Pantry', checked: false },
];

// Mock Weather
export const mockWeather: WeatherData = {
  location: 'Ho Chi Minh City',
  temperature: 32,
  condition: 'Partly Cloudy',
  humidity: 75,
  icon: '⛅',
};
