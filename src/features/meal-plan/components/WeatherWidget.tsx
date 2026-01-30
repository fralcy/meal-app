import { Cloud, Droplets, Wind, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWeather } from '@/api/services/weather.service';

interface WeatherWidgetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return '☀️';
    case 'partly cloudy':
      return '⛅';
    case 'cloudy':
      return '☁️';
    case 'rain':
      return '🌧️';
    case 'thunderstorm':
      return '⛈️';
    default:
      return '🌤️';
  }
};

export default function WeatherWidget({ open, onOpenChange }: WeatherWidgetProps) {
  const { data: weather, isLoading, error } = useWeather();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            Weather
          </DialogTitle>
        </DialogHeader>
        <Card>
          <CardContent className="pt-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : error ? (
              <div className="text-center py-8 text-destructive">
                Failed to load weather data
              </div>
            ) : weather ? (
              <div className="flex flex-col items-center gap-4">
                <span className="text-6xl">{getWeatherIcon(weather.condition)}</span>
                <div className="text-center">
                  <p className="text-4xl font-bold">{weather.temperature}°C</p>
                  <p className="text-muted-foreground">{weather.condition}</p>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {weather.location}
                </Badge>
                <div className="flex gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Droplets className="h-4 w-4" />
                    {weather.humidity}%
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="h-4 w-4" />
                    {weather.windSpeed} km/h
                  </span>
                </div>

                {/* 5-day forecast */}
                <div className="w-full mt-4 pt-4 border-t">
                  <p className="text-sm font-medium mb-3 text-center">5-Day Forecast</p>
                  <div className="grid grid-cols-5 gap-2 text-center text-xs">
                    {weather.forecast.map((day) => (
                      <div key={day.day} className="flex flex-col items-center gap-1">
                        <span className="font-medium">{day.day}</span>
                        <span className="text-lg">{getWeatherIcon(day.condition)}</span>
                        <span className="text-muted-foreground">
                          {day.high}°/{day.low}°
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
