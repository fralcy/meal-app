import { z } from 'zod';

// Grocery Item Schema
export const groceryItemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  quantity: z.number().min(0.1, 'Quantity must be at least 0.1').max(1000, 'Quantity is too large'),
  unit: z.string().min(1, 'Unit is required'),
  category: z.enum(['Produce', 'Dairy', 'Meat', 'Pantry', 'Frozen', 'Beverages', 'Other']),
});

export type GroceryItemFormData = z.infer<typeof groceryItemSchema>;

// Recipe Schema
export const recipeSchema = z.object({
  name: z.string().min(1, 'Recipe name is required').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500),
  prepTime: z.number().min(1, 'Prep time is required').max(480),
  cookTime: z.number().min(0).max(480),
  servings: z.number().min(1).max(50),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  category: z.string().min(1, 'Category is required'),
  ingredients: z.array(z.object({
    name: z.string().min(1),
    quantity: z.number().min(0.1),
    unit: z.string().min(1),
  })).min(1, 'At least one ingredient is required'),
  instructions: z.array(z.string().min(1)).min(1, 'At least one instruction is required'),
});

export type RecipeFormData = z.infer<typeof recipeSchema>;

// Settings Schema
export const settingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  defaultServings: z.number().min(1).max(20),
  dietaryPreferences: z.array(z.string()),
  notifications: z.boolean(),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;

// Meal Schema
export const mealSchema = z.object({
  name: z.string().min(1, 'Meal name is required'),
  recipeId: z.string().optional(),
  servings: z.number().min(1).max(50),
  mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
});

export type MealFormData = z.infer<typeof mealSchema>;
