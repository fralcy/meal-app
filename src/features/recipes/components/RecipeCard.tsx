import type { Recipe } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, ChefHat } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onViewDetail: (recipe: Recipe) => void;
}

export default function RecipeCard({ recipe, onViewDetail }: RecipeCardProps) {
  const difficultyColor = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {recipe.imageUrl && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg line-clamp-1">{recipe.name}</h3>
          <Badge variant="outline" className={difficultyColor[recipe.difficulty]}>
            {recipe.difficulty}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {recipe.description}
        </p>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.prepTime + recipe.cookTime}m</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{recipe.servings}</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="h-4 w-4" />
            <span>{recipe.category}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          variant="brand"
          className="w-full"
          onClick={() => onViewDetail(recipe)}
        >
          View Recipe
        </Button>
      </CardFooter>
    </Card>
  );
}