import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DayPlan, Recipe, GroceryItem, Settings, Meal } from '@/types';
import { mockMealPlan, mockRecipes, mockGroceries } from '@/data/mockData';

interface AppState {
  // Meal Plan
  mealPlan: DayPlan[];
  setMealPlan: (plan: DayPlan[]) => void;
  addMealToDay: (dayId: string, meal: Meal) => void;
  removeMealFromDay: (dayId: string, mealId: string) => void;
  clearWeek: () => void;
  generatePlan: () => void;

  // Recipes
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
  toggleFavorite: (recipeId: string) => void;

  // Groceries
  groceries: GroceryItem[];
  setGroceries: (items: GroceryItem[]) => void;
  addGroceryItem: (item: Omit<GroceryItem, 'id' | 'checked'>) => void;
  toggleGroceryItem: (itemId: string) => void;
  removeGroceryItem: (itemId: string) => void;
  clearCheckedGroceries: () => void;
  addMealsToGroceries: () => void;

  // Settings
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;

  // Reset
  resetStore: () => void;
}

const defaultSettings: Settings = {
  theme: 'system',
  defaultServings: 2,
  dietaryPreferences: [],
  notifications: true,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Meal Plan State
      mealPlan: mockMealPlan,
      setMealPlan: (plan) => set({ mealPlan: plan }),

      addMealToDay: (dayId, meal) => set((state) => ({
        mealPlan: state.mealPlan.map((day) =>
          day.id === dayId
            ? { ...day, meals: [...day.meals, meal] }
            : day
        ),
      })),

      removeMealFromDay: (dayId, mealId) => set((state) => ({
        mealPlan: state.mealPlan.map((day) =>
          day.id === dayId
            ? { ...day, meals: day.meals.filter((m) => m.id !== mealId) }
            : day
        ),
      })),

      clearWeek: () => set((state) => ({
        mealPlan: state.mealPlan.map((day) => ({ ...day, meals: [] })),
      })),

      generatePlan: () => {
        const { recipes, mealPlan } = get();
        const newPlan = mealPlan.map((day) => ({
          ...day,
          meals: [
            {
              id: `meal-${Date.now()}-${Math.random()}`,
              name: recipes[Math.floor(Math.random() * recipes.length)]?.name || 'Random Meal',
              servings: 2,
              mealType: 'dinner' as const,
            },
          ],
        }));
        set({ mealPlan: newPlan });
      },

      // Recipes State
      recipes: mockRecipes,
      setRecipes: (recipes) => set({ recipes }),

      toggleFavorite: (recipeId) => set((state) => ({
        recipes: state.recipes.map((recipe) =>
          recipe.id === recipeId
            ? { ...recipe, isFavorite: !recipe.isFavorite }
            : recipe
        ),
      })),

      // Groceries State
      groceries: mockGroceries,
      setGroceries: (items) => set({ groceries: items }),

      addGroceryItem: (item) => set((state) => ({
        groceries: [
          ...state.groceries,
          {
            ...item,
            id: `gro-${Date.now()}-${Math.random()}`,
            checked: false,
          },
        ],
      })),

      toggleGroceryItem: (itemId) => set((state) => ({
        groceries: state.groceries.map((item) =>
          item.id === itemId
            ? { ...item, checked: !item.checked }
            : item
        ),
      })),

      removeGroceryItem: (itemId) => set((state) => ({
        groceries: state.groceries.filter((item) => item.id !== itemId),
      })),

      clearCheckedGroceries: () => set((state) => ({
        groceries: state.groceries.filter((item) => !item.checked),
      })),

      addMealsToGroceries: () => {
        const { mealPlan, recipes, groceries } = get();
        const newItems: GroceryItem[] = [];

        mealPlan.forEach((day) => {
          day.meals.forEach((meal) => {
            const recipe = recipes.find((r) => r.id === meal.recipeId);
            if (recipe) {
              recipe.ingredients.forEach((ing) => {
                const exists = groceries.find((g) => g.name === ing.name);
                if (!exists) {
                  newItems.push({
                    id: `gro-${Date.now()}-${Math.random()}`,
                    name: ing.name,
                    quantity: ing.quantity,
                    unit: ing.unit,
                    category: 'Other',
                    checked: false,
                  });
                }
              });
            }
          });
        });

        set({ groceries: [...groceries, ...newItems] });
      },

      // Settings State
      settings: defaultSettings,

      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings },
      })),

      // Reset Store
      resetStore: () => set({
        mealPlan: mockMealPlan,
        recipes: mockRecipes,
        groceries: mockGroceries,
        settings: defaultSettings,
      }),
    }),
    {
      name: 'meal-app-storage',
    }
  )
);
