import Header from './Header';
import BottomNavigation from './BottomNavigation';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AppLayoutProps {
  title: string;
  children: React.ReactNode;
  showMealPlanActions?: boolean;
  onAddToGroceries?: () => void;
  onGeneratePlan?: () => void;
  onShowWeather?: () => void;
  onClearWeek?: () => void;
}

export default function AppLayout({
  title,
  children,
  showMealPlanActions = false,
  onAddToGroceries,
  onGeneratePlan,
  onShowWeather,
  onClearWeek,
}: AppLayoutProps) {
  return (
    <div className="flex min-h-screen w-full max-w-2xl flex-col bg-background shadow-xl">
      <Header
        title={title}
        showMealPlanActions={showMealPlanActions}
        onAddToGroceries={onAddToGroceries}
        onGeneratePlan={onGeneratePlan}
        onShowWeather={onShowWeather}
        onClearWeek={onClearWeek}
      />

      <ScrollArea className="flex-1">
        <main className="px-4 py-4">
          {children}
        </main>
      </ScrollArea>

      <BottomNavigation />
    </div>
  );
}
