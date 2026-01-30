import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import MealPlanPage from '@/pages/MealPlanPage';
import RecipesPage from '@/pages/RecipesPage';
import GroceriesPage from '@/pages/GroceriesPage';
import DiscoverPage from '@/pages/DiscoverPage';
import SettingsPage from '@/pages/SettingsPage';

function App() {
  return (
    <div id="app" className="flex min-h-screen justify-center bg-muted/30">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/meal-plan" replace />} />
          <Route path="/meal-plan" element={<MealPlanPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/groceries" element={<GroceriesPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        <Toaster position="top-center" />
      </HashRouter>
    </div>
  );
}

export default App;