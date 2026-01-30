import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useAppStore } from '@/store';
import { toast } from 'sonner';
import { RotateCcw, User, Bell, Palette } from 'lucide-react';

export default function SettingsPage() {
  const { settings, updateSettings, resetStore } = useAppStore();

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      resetStore();
      toast.success('All data has been reset');
    }
  };

  return (
    <AppLayout title="Settings">
      <div className="space-y-4">
        {/* User Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-5 w-5" />
              Preferences
            </CardTitle>
            <CardDescription>Customize your meal planning experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="servings">Default Servings</Label>
              <Input
                id="servings"
                type="number"
                min="1"
                max="12"
                value={settings.defaultServings}
                onChange={(e) =>
                  updateSettings({ defaultServings: Number(e.target.value) || 2 })
                }
                className="w-24"
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Vegetarian Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Prioritize vegetarian recipes
                </p>
              </div>
              <Switch
                checked={settings.dietaryPreferences.includes('vegetarian')}
                onCheckedChange={(checked) => {
                  const prefs = checked
                    ? [...settings.dietaryPreferences, 'vegetarian']
                    : settings.dietaryPreferences.filter((p) => p !== 'vegetarian');
                  updateSettings({ dietaryPreferences: prefs });
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Gluten-Free Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Prioritize gluten-free recipes
                </p>
              </div>
              <Switch
                checked={settings.dietaryPreferences.includes('gluten-free')}
                onCheckedChange={(checked) => {
                  const prefs = checked
                    ? [...settings.dietaryPreferences, 'gluten-free']
                    : settings.dietaryPreferences.filter((p) => p !== 'gluten-free');
                  updateSettings({ dietaryPreferences: prefs });
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Meal Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get reminded about upcoming meals
                </p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => updateSettings({ notifications: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Use dark theme (coming soon)
                </p>
              </div>
              <Switch disabled />
            </div>
          </CardContent>
        </Card>

        {/* Reset */}
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-base text-destructive flex items-center gap-2">
              <RotateCcw className="h-5 w-5" />
              Reset Data
            </CardTitle>
            <CardDescription>
              Clear all your meal plans, grocery lists, and settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" onClick={handleReset}>
              Reset All Data
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card>
          <CardContent className="pt-4 text-center text-sm text-muted-foreground">
            <p>Meal Planner v1.0.0</p>
            <p>Built with React + TypeScript + ShadCN</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
