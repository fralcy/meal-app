import { useState } from 'react';
import type { Recipe } from '@/types';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import RecipeDetail from '@/features/recipes/components/RecipeDetail';
import { useAppStore } from '@/store';
import { toast } from 'sonner';
import { Lightbulb, ChefHat, Clock, Shuffle } from 'lucide-react';

const cookingTips = [
  'Prep all ingredients before cooking to stay organized.',
  'Let meat rest after cooking for juicier results.',
  'Taste as you cook and adjust seasoning.',
  'Use sharp knives for safer and faster cutting.',
  'Read the entire recipe before starting.',
];

export default function DiscoverPage() {
  const { recipes, addGroceryItem } = useAppStore();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  // Get random recipes for suggestions
  const getRandomRecipes = (count: number) => {
    const shuffled = [...recipes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const [suggestions, setSuggestions] = useState(() => getRandomRecipes(3));

  const handleShuffle = () => {
    setSuggestions(getRandomRecipes(3));
    setTipIndex((prev) => (prev + 1) % cookingTips.length);
  };

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

  // Get categories with counts
  const categories = recipes.reduce((acc, recipe) => {
    acc[recipe.category] = (acc[recipe.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <AppLayout title="Discover">
      <div className="space-y-4">
        {/* Cooking Tip */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              Cooking Tip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{cookingTips[tipIndex]}</p>
          </CardContent>
        </Card>

        {/* Recipe Suggestions */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <ChefHat className="h-5 w-5" />
                Recipe Suggestions
              </CardTitle>
              <Button variant="outline" size="sm" onClick={handleShuffle}>
                <Shuffle className="h-4 w-4 mr-2" />
                Shuffle
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {suggestions.map((recipe) => (
              <div
                key={recipe.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent cursor-pointer"
                onClick={() => handleViewDetail(recipe)}
              >
                <div className="flex-1">
                  <h4 className="font-medium">{recipe.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{recipe.prepTime + recipe.cookTime}m</span>
                    <span>•</span>
                    <span>{recipe.category}</span>
                  </div>
                </div>
                <Badge variant="outline">{recipe.difficulty}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Categories Overview */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.entries(categories).map(([cat, count]) => (
                <Badge key={cat} variant="secondary" className="text-sm">
                  {cat} ({count})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold">{recipes.length}</p>
              <p className="text-sm text-muted-foreground">Total Recipes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold">
                {Math.round(recipes.reduce((acc, r) => acc + r.prepTime + r.cookTime, 0) / recipes.length)}m
              </p>
              <p className="text-sm text-muted-foreground">Avg Cook Time</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <RecipeDetail
        recipe={selectedRecipe}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onAddToGroceries={handleAddToGroceries}
      />
    </AppLayout>
  );
}
