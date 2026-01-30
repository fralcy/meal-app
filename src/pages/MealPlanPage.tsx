import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import DayCard from '@/features/meal-plan/components/DayCard';
import WeatherWidget from '@/features/meal-plan/components/WeatherWidget';
import AddMealDialog from '@/features/meal-plan/components/AddMealDialog';
import { useAppStore } from '@/store';
import { toast } from 'sonner';

export default function MealPlanPage() {
  const [weatherOpen, setWeatherOpen] = useState(false);
  const [addMealOpen, setAddMealOpen] = useState(false);
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);

  const {
    mealPlan,
    removeMealFromDay,
    clearWeek,
    generatePlan,
    addMealsToGroceries
  } = useAppStore();

  const selectedDay = mealPlan.find((d) => d.id === selectedDayId);

  const handleAddMeal = (dayId: string) => {
    setSelectedDayId(dayId);
    setAddMealOpen(true);
  };

  const handleRemoveMeal = (dayId: string, mealId: string) => {
    removeMealFromDay(dayId, mealId);
    toast.success('Meal removed');
  };

  const handleGeneratePlan = () => {
    generatePlan();
    toast.success('Meal plan generated!');
  };

  const handleClearWeek = () => {
    clearWeek();
    toast.success('Week cleared');
  };

  const handleAddToGroceries = () => {
    addMealsToGroceries();
    toast.success('Ingredients added to groceries');
  };

  return (
    <AppLayout
      title="Meal Plan"
      showMealPlanActions
      onAddToGroceries={handleAddToGroceries}
      onGeneratePlan={handleGeneratePlan}
      onShowWeather={() => setWeatherOpen(true)}
      onClearWeek={handleClearWeek}
    >
      {/* Weekly Schedule - Responsive Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {mealPlan.map((day) => (
          <DayCard
            key={day.id}
            day={day}
            onAddMeal={handleAddMeal}
            onRemoveMeal={handleRemoveMeal}
          />
        ))}
      </div>

      {/* Weather Modal */}
      <WeatherWidget
        open={weatherOpen}
        onOpenChange={setWeatherOpen}
      />

      {/* Add Meal Dialog */}
      <AddMealDialog
        open={addMealOpen}
        onOpenChange={setAddMealOpen}
        dayId={selectedDayId}
        dayName={selectedDay?.dayName || ''}
      />
    </AppLayout>
  );
}
