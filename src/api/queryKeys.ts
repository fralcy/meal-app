// Query key factory for type-safe query keys
export const queryKeys = {
  // Recipes
  recipes: {
    all: ['recipes'] as const,
    list: () => [...queryKeys.recipes.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.recipes.all, 'detail', id] as const,
    byCategory: (category: string) => [...queryKeys.recipes.all, 'category', category] as const,
  },

  // Meal Plans
  mealPlan: {
    all: ['mealPlan'] as const,
    week: (startDate: string) => [...queryKeys.mealPlan.all, 'week', startDate] as const,
  },

  // Groceries
  groceries: {
    all: ['groceries'] as const,
    list: () => [...queryKeys.groceries.all, 'list'] as const,
    byCategory: (category: string) => [...queryKeys.groceries.all, 'category', category] as const,
  },

  // Weather
  weather: {
    all: ['weather'] as const,
    current: (location: string) => [...queryKeys.weather.all, 'current', location] as const,
  },
};
