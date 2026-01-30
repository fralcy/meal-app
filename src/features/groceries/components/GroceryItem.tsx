import type { GroceryItem as GroceryItemType } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GroceryItemProps {
  item: GroceryItemType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function GroceryItem({ item, onToggle, onDelete }: GroceryItemProps) {
  return (
    <div className="flex items-center gap-3 py-2">
      <Checkbox
        id={item.id}
        checked={item.checked}
        onCheckedChange={() => onToggle(item.id)}
      />
      <label
        htmlFor={item.id}
        className={cn(
          'flex-1 text-sm cursor-pointer',
          item.checked && 'line-through text-muted-foreground'
        )}
      >
        {item.quantity} {item.unit} {item.name}
      </label>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-destructive"
        onClick={() => onDelete(item.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
