import { useMemo } from 'react';
import type { GroceryItem as GroceryItemType } from '@/types';
import GroceryItem from './GroceryItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GroceryListProps {
  items: GroceryItemType[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function GroceryList({ items, onToggle, onDelete }: GroceryListProps) {
  const groupedItems = useMemo(() => {
    const groups: Record<string, GroceryItemType[]> = {};
    items.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [items]);

  const categories = Object.keys(groupedItems).sort();

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No items in your grocery list</p>
        <p className="text-sm">Add items using the form above</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {categories.map((category) => {
        const categoryItems = groupedItems[category];
        const checkedCount = categoryItems.filter((i) => i.checked).length;

        return (
          <Card key={category}>
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{category}</CardTitle>
                <Badge variant="secondary">
                  {checkedCount}/{categoryItems.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="py-0 pb-2">
              {categoryItems.map((item) => (
                <GroceryItem
                  key={item.id}
                  item={item}
                  onToggle={onToggle}
                  onDelete={onDelete}
                />
              ))}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
