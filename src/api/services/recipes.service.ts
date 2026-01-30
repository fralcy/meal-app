import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import type { Recipe } from '@/types';
import { mockRecipes } from '@/data/mockData';

// Simulate API call delay
const fetchRecipes = async (): Promise<Recipe[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockRecipes;
};

const fetchRecipeById = async (id: string): Promise<Recipe | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockRecipes.find((r) => r.id === id);
};

const fetchRecipesByCategory = async (category: string): Promise<Recipe[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockRecipes.filter((r) => r.category === category);
};

// React Query hooks
export const useRecipes = () => {
  return useQuery({
    queryKey: queryKeys.recipes.list(),
    queryFn: fetchRecipes,
  });
};

export const useRecipe = (id: string) => {
  return useQuery({
    queryKey: queryKeys.recipes.detail(id),
    queryFn: () => fetchRecipeById(id),
    enabled: !!id,
  });
};

export const useRecipesByCategory = (category: string) => {
  return useQuery({
    queryKey: queryKeys.recipes.byCategory(category),
    queryFn: () => fetchRecipesByCategory(category),
    enabled: !!category,
  });
};
