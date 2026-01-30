import { format } from 'date-fns';
import { Plus, MoreHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { DayPlan } from '@/types';
import { useAppStore } from '@/store';

interface DayCardProps {
  day: DayPlan;
  onAddMeal: (dayId: string) => void;
  onRemoveMeal: (dayId: string, mealId: string) => void;
}

export default function DayCard({ day, onAddMeal, onRemoveMeal }: DayCardProps) {
  const dateObj = new Date(day.date);
  const { recipes } = useAppStore();

  const getMealImage = (recipeId?: string) => {
    if (!recipeId) return null;
    const recipe = recipes.find((r) => r.id === recipeId);
    return recipe?.imageUrl;
  };

  return (
    <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
      {/* Card Header - Gray background */}
      <div className="flex items-center justify-between bg-[rgb(242,242,247)] px-4 py-3 dark:bg-muted">
        {/* Left: Day and Date */}
        <div className="flex items-baseline gap-2">
          <span className="text-[17px] font-semibold text-foreground">
            {day.dayName}
          </span>
          <span className="text-[17px] text-muted-foreground">
            {format(dateObj, 'MMM d')}
          </span>
        </div>

        {/* Right: Action buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="brand"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => onAddMeal(day.id)}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="brand"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {day.meals.map((meal) => (
                <DropdownMenuItem
                  key={meal.id}
                  onClick={() => onRemoveMeal(day.id, meal.id)}
                  className="text-destructive"
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove {meal.name}
                </DropdownMenuItem>
              ))}
              {day.meals.length === 0 && (
                <DropdownMenuItem disabled>No meals to remove</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Card Content - White background with dividers */}
      <div className="divide-y bg-background">
        {day.meals.length === 0 ? (
          <div className="px-4 py-6 text-center text-muted-foreground">
            No meals planned
          </div>
        ) : (
          day.meals.map((meal) => {
            const imageUrl = getMealImage(meal.recipeId);
            return (
              <div
                key={meal.id}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[rgb(242,242,247)] dark:hover:bg-muted"
              >
                {/* Meal image - 56x56 */}
                <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={meal.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xl">
                      🍽️
                    </div>
                  )}
                </div>

                {/* Meal name */}
                <span className="text-[16px] font-medium text-foreground">
                  {meal.name}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
