import type { Recipe } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, Users, ChefHat, Plus } from 'lucide-react';

interface RecipeDetailProps {
  recipe: Recipe | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToGroceries: (recipe: Recipe) => void;
}

export default function RecipeDetail({
  recipe,
  open,
  onOpenChange,
  onAddToGroceries,
}: RecipeDetailProps) {
  if (!recipe) return null;

  const difficultyColor = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <ScrollArea className="max-h-[90vh]">
          {recipe.imageUrl && (
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6">
            <DialogHeader>
              <div className="flex items-start justify-between gap-2">
                <DialogTitle className="text-2xl">{recipe.name}</DialogTitle>
                <Badge variant="outline" className={difficultyColor[recipe.difficulty]}>
                  {recipe.difficulty}
                </Badge>
              </div>
              <p className="text-muted-foreground">{recipe.description}</p>
            </DialogHeader>

            <div className="flex items-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Prep: {recipe.prepTime}m</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Cook: {recipe.cookTime}m</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="flex items-center gap-1">
                <ChefHat className="h-4 w-4 text-muted-foreground" />
                <span>{recipe.category}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Ingredients</h4>
                <ul className="space-y-1">
                  {recipe.ingredients.map((ing, idx) => (
                    <li key={idx} className="text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      {ing.quantity} {ing.unit} {ing.name}
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2">Instructions</h4>
                <ol className="space-y-2">
                  {recipe.instructions.map((step, idx) => (
                    <li key={idx} className="text-sm flex gap-3">
                      <span className="font-medium text-primary">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <Separator className="my-4" />

            <Button
              variant="brand"
              className="w-full"
              onClick={() => onAddToGroceries(recipe)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Ingredients to Groceries
            </Button>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}