import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Sun, Moon, Download, ShoppingCart, Wand2, Cloud, Trash2, Signal, Wifi, Battery } from 'lucide-react';

interface HeaderProps {
  title: string;
  onAddToGroceries?: () => void;
  onGeneratePlan?: () => void;
  onShowWeather?: () => void;
  onClearWeek?: () => void;
  showMealPlanActions?: boolean;
}

export default function Header({
  title,
  onAddToGroceries,
  onGeneratePlan,
  onShowWeather,
  onClearWeek,
  showMealPlanActions = false,
}: HeaderProps) {
  const [isDark, setIsDark] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);

    // Update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = (checked: boolean) => {
    setIsDark(checked);
    document.documentElement.classList.toggle('dark', checked);
    localStorage.setItem('theme', checked ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-40 bg-background">
      {/* Status Bar - Mobile style */}
      <div className="flex h-7 items-center justify-between px-4 text-xs">
        <span className="font-semibold">{currentTime}</span>
        <div className="flex items-center gap-1">
          <Signal className="h-3.5 w-3.5" />
          <Wifi className="h-3.5 w-3.5" />
          <Battery className="h-4 w-4" />
        </div>
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-between px-4 pb-3">
        {/* Left: Title */}
        <h1 className="text-[34px] font-bold leading-tight">{title}</h1>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {showMealPlanActions && (
            <>
              {/* Download button (fake) - rounded */}
              <Button variant="brand" size="icon" className="rounded-full">
                <Download className="h-5 w-5" />
              </Button>

              {/* 3-dot dropdown - rounded */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="brand" size="icon" className="rounded-full">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onAddToGroceries}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Groceries
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onGeneratePlan}>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Plan for Week
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onShowWeather}>
                    <Cloud className="h-4 w-4 mr-2" />
                    Show Weather
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onClearWeek} className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Current Week
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          {/* Theme toggle - Switch style */}
          <div className="flex items-center gap-1.5 ml-1">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <Switch
              checked={isDark}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-brand"
            />
            <Moon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
      <Separator />
    </header>
  );
}
