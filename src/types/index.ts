// Meal Types
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface Meal {
  id: string;
  name: string;
  recipeId?: string;
  servings: number;
  mealType: MealType;
}

export interface DayPlan {
  id: string;
  date: string; // ISO date string
  dayName: string;
  meals: Meal[];
}

// Recipe Types
export type Difficulty = 'easy' | 'medium' | 'hard';
export type RecipeCategory = 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack';

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: Difficulty;
  category: RecipeCategory;
  ingredients: Ingredient[];
  instructions: string[];
  isFavorite: boolean;
}

// Grocery Types
export type GroceryCategory = 'Produce' | 'Dairy' | 'Meat' | 'Pantry' | 'Frozen' | 'Beverages' | 'Other';

export interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: GroceryCategory;
  checked: boolean;
}

// Weather Types (Mock)
export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  icon: string;
}

// Settings Types
export type Theme = 'light' | 'dark' | 'system';

export interface Settings {
  theme: Theme;
  defaultServings: number;
  dietaryPreferences: string[];
  notifications: boolean;
}
