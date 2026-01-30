import { NavLink } from 'react-router-dom';
import {
  CalendarDays,
  BookOpen,
  ShoppingCart,
  Compass,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/meal-plan', icon: CalendarDays, label: 'Meal Plan' },
  { to: '/recipes', icon: BookOpen, label: 'Recipes' },
  { to: '/groceries', icon: ShoppingCart, label: 'Groceries' },
  { to: '/discover', icon: Compass, label: 'Discover' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function BottomNavigation() {
  return (
    <nav className="sticky bottom-0 z-50 border-t bg-background">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex-1"
          >
            {({ isActive }) => (
              <div
                className={cn(
                  'flex h-14 w-full flex-col items-center justify-center gap-1',
                  isActive
                    ? 'text-brand'
                    : 'text-muted-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
