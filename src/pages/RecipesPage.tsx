import { useState } from 'react';
import type { Recipe } from '@/types';
import AppLayout from '@/components/layout/AppLayout';
import RecipeList from '@/features/recipes/components/RecipeList';
import RecipeDetail from '@/features/recipes/components/RecipeDetail';
import { useAppStore } from '@/store';
import { toast } from 'sonner';

export default function RecipesPage() {
  const { recipes, addGroceryItem } = useAppStore();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleViewDetail = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setDetailOpen(true);
  };

  const handleAddToGroceries = (recipe: Recipe) => {
    recipe.ingredients.forEach((ing) => {
      addGroceryItem({
        name: ing.name,
        quantity: ing.quantity,
        unit: ing.unit,
        category: 'Other',
      });
    });
    toast.success(`Added ${recipe.ingredients.length} ingredients to groceries`);
    setDetailOpen(false);
  };

  return (
    <AppLayout title="Recipes">
      <RecipeList recipes={recipes} onViewDetail={handleViewDetail} />

      <RecipeDetail
        recipe={selectedRecipe}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onAddToGroceries={handleAddToGroceries}
      />
    </AppLayout>
  );
}