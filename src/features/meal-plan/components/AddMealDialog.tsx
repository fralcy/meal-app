import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mealSchema, type MealFormData } from '@/validation/schemas';
import { useAppStore } from '@/store';
import { toast } from 'sonner';

interface AddMealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dayId: string | null;
  dayName: string;
}

const MEAL_TYPES = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'snack', label: 'Snack' },
] as const;

export default function AddMealDialog({
  open,
  onOpenChange,
  dayId,
  dayName,
}: AddMealDialogProps) {
  const { recipes, addMealToDay } = useAppStore();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<MealFormData>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      name: '',
      recipeId: '',
      servings: 2,
      mealType: 'dinner',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: MealFormData) => {
    if (!dayId) return;

    addMealToDay(dayId, {
      id: `meal-${Date.now()}-${Math.random()}`,
      name: data.name,
      recipeId: data.recipeId || undefined,
      servings: data.servings,
      mealType: data.mealType,
    });

    toast.success(`Added "${data.name}" to ${dayName}`);
    reset();
    onOpenChange(false);
  };

  const handleRecipeSelect = (recipeId: string, onChange: (value: string) => void) => {
    onChange(recipeId);
    // Auto-fill name from recipe
    const recipe = recipes.find((r) => r.id === recipeId);
    if (recipe) {
      reset((prev) => ({ ...prev, name: recipe.name, recipeId }));
    }
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Meal to {dayName}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Recipe Selection (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="recipeId">Select from Recipes (Optional)</Label>
            <Controller
              name="recipeId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => handleRecipeSelect(value, field.onChange)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a recipe..." />
                  </SelectTrigger>
                  <SelectContent>
                    {recipes.map((recipe) => (
                      <SelectItem key={recipe.id} value={recipe.id}>
                        {recipe.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Meal Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Meal Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter meal name"
              {...register('name')}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Meal Type */}
          <div className="space-y-2">
            <Label htmlFor="mealType">Meal Type</Label>
            <Controller
              name="mealType"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MEAL_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Servings */}
          <div className="space-y-2">
            <Label htmlFor="servings">Servings</Label>
            <Input
              id="servings"
              type="number"
              min={1}
              max={50}
              {...register('servings', { valueAsNumber: true })}
              className={errors.servings ? 'border-destructive' : ''}
            />
            {errors.servings && (
              <p className="text-xs text-destructive">{errors.servings.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => handleClose(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="brand" className="flex-1" disabled={!isValid}>
              Add Meal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
