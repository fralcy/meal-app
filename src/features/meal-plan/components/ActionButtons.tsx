import { ShoppingCart, Sparkles, Cloud, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  onAddToGroceries: () => void;
  onGeneratePlan: () => void;
  onShowWeather: () => void;
  onClearWeek: () => void;
}

export default function ActionButtons({
  onAddToGroceries,
  onGeneratePlan,
  onShowWeather,
  onClearWeek,
}: ActionButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      <Button variant="outline" onClick={onAddToGroceries}>
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Groceries
      </Button>
      <Button variant="outline" onClick={onGeneratePlan}>
        <Sparkles className="mr-2 h-4 w-4" />
        Generate Plan
      </Button>
      <Button variant="outline" onClick={onShowWeather}>
        <Cloud className="mr-2 h-4 w-4" />
        Show Weather
      </Button>
      <Button variant="destructive" onClick={onClearWeek}>
        <Trash2 className="mr-2 h-4 w-4" />
        Clear Week
      </Button>
    </div>
  );
}