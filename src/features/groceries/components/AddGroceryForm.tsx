import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { GroceryCategory } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { groceryItemSchema, type GroceryItemFormData } from '@/validation/schemas';

const CATEGORIES: GroceryCategory[] = [
  'Produce',
  'Dairy',
  'Meat',
  'Pantry',
  'Frozen',
  'Beverages',
  'Other',
];

interface AddGroceryFormProps {
  onAdd: (item: { name: string; quantity: number; unit: string; category: GroceryCategory }) => void;
}

export default function AddGroceryForm({ onAdd }: AddGroceryFormProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<GroceryItemFormData>({
    resolver: zodResolver(groceryItemSchema),
    defaultValues: {
      name: '',
      quantity: 1,
      unit: 'pcs',
      category: 'Other',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: GroceryItemFormData) => {
    onAdd(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            placeholder="Item name"
            {...register('name')}
            className={errors.name ? 'border-destructive' : ''}
          />
        </div>
        <div className="w-20">
          <Input
            type="number"
            placeholder="Qty"
            step="0.1"
            {...register('quantity', { valueAsNumber: true })}
            className={errors.quantity ? 'border-destructive' : ''}
          />
        </div>
        <div className="w-24">
          <Input
            placeholder="Unit"
            {...register('unit')}
            className={errors.unit ? 'border-destructive' : ''}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <Button type="submit" variant="brand" disabled={!isValid}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
      {(errors.name || errors.quantity || errors.unit) && (
        <p className="text-xs text-destructive">
          {errors.name?.message || errors.quantity?.message || errors.unit?.message}
        </p>
      )}
    </form>
  );
}
