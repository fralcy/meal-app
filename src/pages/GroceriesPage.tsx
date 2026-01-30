import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AddGroceryForm from '@/features/groceries/components/AddGroceryForm';
import GroceryList from '@/features/groceries/components/GroceryList';
import { useAppStore } from '@/store';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

export default function GroceriesPage() {
  const { groceries, addGroceryItem, toggleGroceryItem, removeGroceryItem, clearCheckedGroceries } =
    useAppStore();

  const checkedCount = groceries.filter((i) => i.checked).length;

  const handleClearChecked = () => {
    clearCheckedGroceries();
    toast.success(`Cleared ${checkedCount} checked items`);
  };

  return (
    <AppLayout title="Groceries">
      <div className="space-y-4">
        {/* Add form */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Add Item</CardTitle>
          </CardHeader>
          <CardContent>
            <AddGroceryForm
              onAdd={(item) => {
                addGroceryItem(item);
                toast.success(`Added ${item.name}`);
              }}
            />
          </CardContent>
        </Card>

        {/* Actions */}
        {checkedCount > 0 && (
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={handleClearChecked}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear checked ({checkedCount})
            </Button>
          </div>
        )}

        {/* Grocery list */}
        <GroceryList
          items={groceries}
          onToggle={toggleGroceryItem}
          onDelete={(id) => {
            removeGroceryItem(id);
            toast.success('Item removed');
          }}
        />
      </div>
    </AppLayout>
  );
}
